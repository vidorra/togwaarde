import { NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken'
import { db } from '../../../../../../lib/db/connection.js'
import { snippets, pageSnippets } from '../../../../../../lib/db/schema.js'
import { eq, and, count } from 'drizzle-orm'

// Force dynamic route
export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

// Verify admin token
function verifyAdmin(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid token')
  }
  
  const token = authHeader.substring(7)
  const decoded = jwt.verify(token, JWT_SECRET)
  
  if (!decoded.admin) {
    throw new Error('Invalid token')
  }
  
  return decoded
}

// GET - Get snippets for a specific page from database
export async function GET(request, { params }) {
  try {
    verifyAdmin(request)
    
    const pageId = params.pageId
    
    // Get page snippets with joined snippet data
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
      .where(eq(pageSnippets.pageId, pageId))
      .orderBy(pageSnippets.order)
    
    // Filter out orphaned references (where snippet was deleted)
    const enrichedSnippets = pageSnippetsList.filter(ps => ps.snippet)
    
    return NextResponse.json({
      success: true,
      snippets: enrichedSnippets
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
    verifyAdmin(request)

    const pageId = params.pageId
    const body = await request.json()
    const { snippetId, order } = body

    console.log(`📌 POST request to add snippet to page:`, { pageId, snippetId, order, body })
    
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
    verifyAdmin(request)
    
    const pageId = params.pageId
    const { searchParams } = new URL(request.url)
    const snippetId = searchParams.get('snippetId')
    
    if (!snippetId) {
      return NextResponse.json(
        { message: 'Snippet ID is required' },
        { status: 400 }
      )
    }
    
    const [deletedPageSnippet] = await db
      .delete(pageSnippets)
      .where(and(
        eq(pageSnippets.pageId, pageId),
        eq(pageSnippets.snippetId, snippetId)
      ))
      .returning()
    
    if (!deletedPageSnippet) {
      return NextResponse.json(
        { message: 'Page snippet relationship not found' },
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