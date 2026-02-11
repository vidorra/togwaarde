import { NextResponse } from 'next/server'
import { db } from '../../../../../../lib/db/connection.js'
import { snippets, pageSnippets, pages } from '../../../../../../lib/db/schema.js'
import { eq, and, count } from 'drizzle-orm'
import { rateLimitMiddleware } from '../../../../../../lib/rate-limiter'
import { verifyAdminAndGetWebsite } from '../../../../../../lib/jwt-utils.js'

// Force dynamic route
export const dynamic = 'force-dynamic'

// GET - Get snippets for a specific page from database
export async function GET(request, { params }) {
  try {
    // Check rate limit for admin API
    const rateLimit = await rateLimitMiddleware(request, 'adminApi')
    if (rateLimit.limited) {
      return NextResponse.json(rateLimit.response, { status: 429, headers: rateLimit.headers })
    }

    const { website } = verifyAdminAndGetWebsite(request)
    const pageId = params.pageId

    // CRITICAL: First verify that the page belongs to the current website
    const page = await db
      .select()
      .from(pages)
      .where(and(eq(pages.id, pageId), eq(pages.website, website)))
      .limit(1)

    if (page.length === 0) {
      return NextResponse.json(
        { message: 'Page not found or access denied' },
        { status: 404 }
      )
    }

    // Get page snippets with joined snippet data - filtered by website
    const pageSnippetsList = await db
      .select({
        id: pageSnippets.id,
        pageId: pageSnippets.pageId,
        snippetId: pageSnippets.snippetId,
        order: pageSnippets.order,
        active: pageSnippets.active,
        createdAt: pageSnippets.createdAt,
        snippet: snippets
      })
      .from(pageSnippets)
      .leftJoin(snippets, eq(pageSnippets.snippetId, snippets.id))
      // CRITICAL: Only return snippets for current website
      .where(and(eq(pageSnippets.pageId, pageId), eq(pageSnippets.website, website)))
      .orderBy(pageSnippets.order)

    // Filter out orphaned references (where snippet was deleted)
    const enrichedSnippets = pageSnippetsList.filter(ps => ps.snippet)

    return NextResponse.json({
      success: true,
      snippets: enrichedSnippets,
      website: website
    })

  } catch (error) {
    console.error('Failed to load page snippets:', error)
    return NextResponse.json(
      { message: 'Unauthorized or failed to load page snippets' },
      { status: error.message.includes('token') ? 401 : 500 }
    )
  }
}

// POST - Add snippet to page in database
export async function POST(request, { params }) {
  try {
    // Check rate limit for admin API
    const rateLimit = await rateLimitMiddleware(request, 'adminApi')
    if (rateLimit.limited) {
      return NextResponse.json(rateLimit.response, { status: 429, headers: rateLimit.headers })
    }

    const { website } = verifyAdminAndGetWebsite(request)

    const pageId = params.pageId
    const body = await request.json()
    const { snippetId, order } = body

    console.log(`📌 POST request to add snippet to page:`, { pageId, snippetId, order, website })

    // CRITICAL: Verify page belongs to current website
    const page = await db
      .select()
      .from(pages)
      .where(and(eq(pages.id, pageId), eq(pages.website, website)))
      .limit(1)

    if (page.length === 0) {
      return NextResponse.json(
        { message: 'Page not found or access denied' },
        { status: 404 }
      )
    }

    // CRITICAL: Verify snippet belongs to current website
    const snippet = await db
      .select()
      .from(snippets)
      .where(and(eq(snippets.id, snippetId), eq(snippets.website, website)))
      .limit(1)

    if (snippet.length === 0) {
      return NextResponse.json(
        { message: 'Snippet not found or access denied' },
        { status: 404 }
      )
    }

    // Check if snippet is already on this page
    const existingPageSnippet = await db
      .select()
      .from(pageSnippets)
      .where(and(
        eq(pageSnippets.pageId, pageId),
        eq(pageSnippets.snippetId, snippetId)
      ))
      .limit(1)

    if (existingPageSnippet.length > 0) {
      console.log(`⚠️  Snippet ${snippetId} already exists on page ${pageId}`)
      return NextResponse.json(
        {
          message: 'Snippet is already on this page',
          error: 'SNIPPET_ALREADY_EXISTS',
          snippetId,
          pageId
        },
        { status: 400 }
      )
    }

    // Get current count for default order
    const currentCount = await db
      .select({ count: count() })
      .from(pageSnippets)
      .where(eq(pageSnippets.pageId, pageId))

    const newPageSnippet = {
      id: `ps-${Date.now()}`,
      pageId,
      snippetId,
      order: order ?? Number(currentCount[0]?.count || 0),
      website: website, // CRITICAL: Force assignment to belong to current website
      active: true,
      createdAt: new Date()
    }

    const [insertedPageSnippet] = await db
      .insert(pageSnippets)
      .values(newPageSnippet)
      .returning()

    return NextResponse.json({
      success: true,
      pageSnippet: insertedPageSnippet
    })

  } catch (error) {
    console.error('Failed to add snippet to page:', error)
    return NextResponse.json(
      { message: 'Unauthorized or failed to add snippet to page' },
      { status: error.message.includes('token') ? 401 : 500 }
    )
  }
}

// DELETE - Remove snippet from page in database
export async function DELETE(request, { params }) {
  try {
    // Check rate limit for admin API
    const rateLimit = await rateLimitMiddleware(request, 'adminApi')
    if (rateLimit.limited) {
      return NextResponse.json(rateLimit.response, { status: 429, headers: rateLimit.headers })
    }

    const { website } = verifyAdminAndGetWebsite(request)

    const pageId = params.pageId
    const { searchParams } = new URL(request.url)
    const snippetId = searchParams.get('snippetId')

    if (!snippetId) {
      return NextResponse.json(
        { message: 'Snippet ID is required' },
        { status: 400 }
      )
    }

    // CRITICAL: Only delete page-snippet relationships for current website
    const [deletedPageSnippet] = await db
      .delete(pageSnippets)
      .where(and(
        eq(pageSnippets.pageId, pageId),
        eq(pageSnippets.snippetId, snippetId),
        eq(pageSnippets.website, website)
      ))
      .returning()

    if (!deletedPageSnippet) {
      return NextResponse.json(
        { message: 'Page snippet relationship not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Snippet removed from page successfully',
      pageSnippet: deletedPageSnippet
    })

  } catch (error) {
    console.error('Failed to remove snippet from page:', error)
    return NextResponse.json(
      { message: 'Unauthorized or failed to remove snippet from page' },
      { status: error.message.includes('token') ? 401 : 500 }
    )
  }
}