import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db/connection.js'
import { snippets } from '../../../../lib/db/schema.js'
import { eq, and } from 'drizzle-orm'
import { autoMigrate } from '../../../../lib/db/auto-migrate.js'
import { rateLimitMiddleware } from '../../../../lib/rate-limiter'
import { verifyAdminAndGetWebsite } from '../../../../lib/jwt-utils.js'

// Force dynamic route
export const dynamic = 'force-dynamic'

// GET - List all snippets from database for current website
export async function GET(request) {
  try {
    // Check rate limit for admin API
    const rateLimit = await rateLimitMiddleware(request, 'adminApi')
    if (rateLimit.limited) {
      return NextResponse.json(rateLimit.response, { status: 429, headers: rateLimit.headers })
    }

    console.log('📥 GET /api/admin/snippets - Starting request')

    const { website } = verifyAdminAndGetWebsite(request)
    console.log(`✅ Admin verified for website: ${website}`)

    // Run auto-migration on first call
    console.log('🔄 Running auto-migration...')
    await autoMigrate()
    console.log('✅ Auto-migration completed')

    console.log(`📊 Fetching snippets for website: ${website}`)
    // Filter snippets by website from JWT
    const websiteSnippets = await db
      .select()
      .from(snippets)
      .where(eq(snippets.website, website))
    console.log(`✅ Found ${websiteSnippets.length} snippets for ${website}`)

    return NextResponse.json({
      success: true,
      snippets: websiteSnippets,
      website: website
    })

  } catch (error) {
    console.error('❌ Failed to load snippets:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      {
        message: 'Unauthorized or failed to load snippets',
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: error.message.includes('token') ? 401 : 500 }
    )
  }
}

// Helper function to detect if snippet is a Bol.com JavaScript snippet
function isBolComScript(code) {
  if (!code) return false
  return code.includes('bol_sitebar_v2') || code.includes('partner.bol.com')
}

// Helper function to extract product data from Bol.com snippet
function extractBolData(snippet) {
  try {
    const productIdMatch = snippet.match(/"productId":"([^"]+)"/)
    const linkNameMatch = snippet.match(/"linkName":"([^"]+)"/)
    const siteIdMatch = snippet.match(/"siteId":"([^"]+)"/)

    return {
      productId: productIdMatch ? productIdMatch[1] : null,
      productName: linkNameMatch ? decodeURIComponent(linkNameMatch[1]) : null,
      siteId: siteIdMatch ? siteIdMatch[1] : null
    }
  } catch (error) {
    console.error('Error extracting Bol.com data:', error)
    return { productId: null, productName: null, siteId: null }
  }
}

// POST - Create new snippet in database with proper field separation
export async function POST(request) {
  try {
    // Check rate limit for admin API
    const rateLimit = await rateLimitMiddleware(request, 'adminApi')
    if (rateLimit.limited) {
      return NextResponse.json(rateLimit.response, { status: 429, headers: rateLimit.headers })
    }

    const { website } = verifyAdminAndGetWebsite(request)

    const snippetData = await request.json()

    // Determine if this is a Bol.com snippet and extract data
    const isBolSnippet = snippetData.type === 'bol' && isBolComScript(snippetData.codeSnippet || snippetData.bolScript)
    let imageHtml = snippetData.imageHtml || snippetData.generatedHtml || null
    let bolScript = null
    let imageUrl = snippetData.imageUrl || null
    let productUrl = snippetData.url || ''
    let productName = snippetData.name || ''

    // If a Bol.com JavaScript snippet is provided
    if (isBolSnippet) {
      bolScript = snippetData.codeSnippet || snippetData.bolScript
      const bolData = extractBolData(bolScript)

      // Use extracted product name if name not provided
      if (!productName && bolData.productName) {
        productName = bolData.productName
      }

      // Build product URL if not provided
      if (!productUrl && bolData.productId) {
        const linkName = encodeURIComponent(bolData.productName || 'product')
        productUrl = `https://partner.bol.com/click/click?p=2&t=url&s=${bolData.siteId || '1472968'}&f=TXL&url=https%3A%2F%2Fwww.bol.com%2Fnl%2Fnl%2Fp%2F${linkName}%2F${bolData.productId}%2F&name=${linkName}`
      }

      // Note: Image extraction should be done via separate API call to /api/admin/extract-bol-image
      // imageHtml will be empty initially if not provided
    }

    if (!productName) {
      return NextResponse.json(
        { message: 'Product name is required' },
        { status: 400 }
      )
    }

    const newSnippet = {
      id: snippetData.id || `snippet-${Date.now()}`,
      name: productName,
      type: snippetData.type,
      url: productUrl,
      tag: snippetData.tag || null,
      // Separate fields for proper data structure
      imageHtml: imageHtml,
      bolScript: bolScript,
      imageUrl: imageUrl,
      generatedHtml: imageHtml || null, // Keep for backwards compatibility
      price: snippetData.price || null,
      originalPrice: snippetData.originalPrice || null,
      currency: snippetData.currency || 'EUR',
      priceLastUpdated: snippetData.price ? new Date() : null,
      website: website, // CRITICAL: Force snippet to belong to current website
      active: snippetData.active ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const [insertedSnippet] = await db.insert(snippets).values(newSnippet).returning()

    console.log('✅ Created snippet:', insertedSnippet.id, '- Type:', insertedSnippet.type, '- Website:', website)

    return NextResponse.json({
      success: true,
      snippet: insertedSnippet
    })

  } catch (error) {
    console.error('Failed to create snippet:', error)
    return NextResponse.json(
      { message: 'Unauthorized or failed to create snippet', error: error.message },
      { status: error.message.includes('token') ? 401 : 500 }
    )
  }
}

// PUT - Update existing snippet in database
export async function PUT(request) {
  try {
    // Check rate limit for admin API
    const rateLimit = await rateLimitMiddleware(request, 'adminApi')
    if (rateLimit.limited) {
      return NextResponse.json(rateLimit.response, { status: 429, headers: rateLimit.headers })
    }

    const { website } = verifyAdminAndGetWebsite(request)

    const snippetData = await request.json()
    const { id, ...updateData } = snippetData

    if (!id) {
      return NextResponse.json(
        { message: 'Snippet ID is required' },
        { status: 400 }
      )
    }

    // Remove website from updateData if present - can't change website of existing snippet
    delete updateData.website

    const [updatedSnippet] = await db
      .update(snippets)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      // CRITICAL: Filter by both ID and website - can only update snippets for current website
      .where(and(eq(snippets.id, id), eq(snippets.website, website)))
      .returning()

    if (!updatedSnippet) {
      return NextResponse.json(
        { message: 'Snippet not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      snippet: updatedSnippet
    })

  } catch (error) {
    console.error('Failed to update snippet:', error)
    return NextResponse.json(
      { message: 'Unauthorized or failed to update snippet' },
      { status: error.message.includes('token') ? 401 : 500 }
    )
  }
}

// DELETE - Remove snippet from database
export async function DELETE(request) {
  try {
    // Check rate limit for admin API
    const rateLimit = await rateLimitMiddleware(request, 'adminApi')
    if (rateLimit.limited) {
      return NextResponse.json(rateLimit.response, { status: 429, headers: rateLimit.headers })
    }

    const { website } = verifyAdminAndGetWebsite(request)

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Snippet ID is required' },
        { status: 400 }
      )
    }

    const [deletedSnippet] = await db
      .delete(snippets)
      // CRITICAL: Filter by both ID and website - can only delete snippets for current website
      .where(and(eq(snippets.id, id), eq(snippets.website, website)))
      .returning()

    if (!deletedSnippet) {
      return NextResponse.json(
        { message: 'Snippet not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Snippet deleted successfully',
      snippet: deletedSnippet
    })

  } catch (error) {
    console.error('Failed to delete snippet:', error)
    return NextResponse.json(
      { message: 'Unauthorized or failed to delete snippet' },
      { status: error.message.includes('token') ? 401 : 500 }
    )
  }
}