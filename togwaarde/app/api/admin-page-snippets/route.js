import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Force dynamic route
export const dynamic = 'force-dynamic'

const DATA_DIR = path.join(process.cwd(), 'data', 'admin')
const PAGE_SNIPPETS_FILE = path.join(DATA_DIR, 'page-snippets.json')

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  // Don't create empty file here - let loadPageSnippets() handle default data
}

// Simple session check
function isAuthenticated(request) {
  // For now, we'll skip server-side session validation 
  // and rely on client-side session management
  // In production, you'd want proper server-side session handling
  return true
}

// Load page snippets from file with error handling
function loadPageSnippets() {
  try {
    ensureDataDir()
    if (!fs.existsSync(PAGE_SNIPPETS_FILE)) {
      console.log('Page snippets file does not exist, creating with default data')
      // Initialize with default page-snippet mappings
      const defaultPageSnippets = {
        "hygiene-bereiding_flessen-steriliseren": [
          {
            "id": "ps_1759151278392_0",
            "pageId": "hygiene-bereiding_flessen-steriliseren",
            "snippetId": "philips-avent-sterilisator",
            "order": 0,
            "active": true,
            "createdAt": "2025-09-29T13:07:58.392Z"
          },
          {
            "id": "ps_1759151278392_1",
            "pageId": "hygiene-bereiding_flessen-steriliseren",
            "snippetId": "mam-sterilisator",
            "order": 1,
            "active": true,
            "createdAt": "2025-09-29T13:07:58.392Z"
          },
          {
            "id": "ps_1759151278392_2",
            "pageId": "hygiene-bereiding_flessen-steriliseren",
            "snippetId": "chicco-sterilisator",
            "order": 2,
            "active": true,
            "createdAt": "2025-09-29T13:07:58.392Z"
          },
          {
            "id": "ps_1759151278392_3",
            "pageId": "hygiene-bereiding_flessen-steriliseren",
            "snippetId": "lifejxwen-sterilizer",
            "order": 3,
            "active": true,
            "createdAt": "2025-09-29T13:07:58.392Z"
          }
        ]
      }
      
      fs.writeFileSync(PAGE_SNIPPETS_FILE, JSON.stringify(defaultPageSnippets, null, 2))
      return defaultPageSnippets
    }
    const data = fs.readFileSync(PAGE_SNIPPETS_FILE, 'utf8')
    const parsed = JSON.parse(data)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch (error) {
    console.error('Error loading page snippets:', error)
    return {}
  }
}

// Save page snippets to file
function savePageSnippets(pageSnippets) {
  ensureDataDir()
  fs.writeFileSync(PAGE_SNIPPETS_FILE, JSON.stringify(pageSnippets, null, 2))
}

// Load snippets to enhance page assignments
function loadSnippets() {
  const SNIPPETS_FILE = path.join(DATA_DIR, 'snippets.json')
  if (!fs.existsSync(SNIPPETS_FILE)) {
    return []
  }
  
  try {
    const data = fs.readFileSync(SNIPPETS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading snippets file:', error)
    return []
  }
}

// GET - Get page snippet assignments
export async function GET(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const url = new URL(request.url)
    const pageId = url.searchParams.get('pageId')
    
    const pageSnippets = loadPageSnippets()
    const allSnippets = loadSnippets()
    
    if (pageId) {
      // Return assignments for specific page
      const pageAssignments = pageSnippets[pageId] || []
      
      // Enhance with snippet details
      const enhancedAssignments = pageAssignments.map(assignment => {
        const snippet = allSnippets.find(s => s.id === assignment.snippetId)
        return {
          ...assignment,
          snippet: snippet || null
        }
      }).filter(assignment => assignment.snippet) // Only include if snippet exists
      
      return NextResponse.json({
        success: true,
        pageId,
        assignments: enhancedAssignments
      })
    } else {
      // Return all page assignments
      return NextResponse.json({
        success: true,
        pageAssignments: pageSnippets
      })
    }

  } catch (error) {
    console.error('Failed to load page snippet assignments:', error)
    return NextResponse.json(
      { message: 'Failed to load page assignments', error: error.message },
      { status: 500 }
    )
  }
}

// POST - Assign snippet to page
export async function POST(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { pageId, snippetId } = await request.json()
    
    if (!pageId || !snippetId) {
      return NextResponse.json(
        { message: 'pageId and snippetId are required' },
        { status: 400 }
      )
    }
    
    const pageSnippets = loadPageSnippets()
    
    if (!pageSnippets[pageId]) {
      pageSnippets[pageId] = []
    }
    
    // Check if snippet is already assigned to this page
    const existingIndex = pageSnippets[pageId].findIndex(ps => ps.snippetId === snippetId)
    if (existingIndex !== -1) {
      return NextResponse.json(
        { message: 'Snippet is already assigned to this page' },
        { status: 400 }
      )
    }
    
    const newPageSnippet = {
      id: `ps_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pageId,
      snippetId,
      order: pageSnippets[pageId].length,
      active: true,
      createdAt: new Date().toISOString()
    }
    
    pageSnippets[pageId].push(newPageSnippet)
    savePageSnippets(pageSnippets)
    
    console.log(`Assigned snippet ${snippetId} to page ${pageId}`)
    
    return NextResponse.json({
      success: true,
      pageSnippet: newPageSnippet
    })

  } catch (error) {
    console.error('Failed to assign snippet to page:', error)
    return NextResponse.json(
      { message: 'Failed to assign snippet to page', error: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Unassign snippet from page
export async function DELETE(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { pageId, snippetId } = await request.json()
    
    if (!pageId || !snippetId) {
      return NextResponse.json(
        { message: 'pageId and snippetId are required' },
        { status: 400 }
      )
    }
    
    const pageSnippets = loadPageSnippets()
    
    if (!pageSnippets[pageId]) {
      return NextResponse.json(
        { message: 'Page not found' },
        { status: 404 }
      )
    }
    
    // Find and remove the snippet from the page
    const initialLength = pageSnippets[pageId].length
    pageSnippets[pageId] = pageSnippets[pageId].filter(ps => ps.snippetId !== snippetId)
    
    if (pageSnippets[pageId].length === initialLength) {
      return NextResponse.json(
        { message: 'Snippet not found on this page' },
        { status: 404 }
      )
    }
    
    // Reorder remaining snippets
    pageSnippets[pageId].forEach((ps, index) => {
      ps.order = index
    })
    
    savePageSnippets(pageSnippets)
    
    console.log(`Unassigned snippet ${snippetId} from page ${pageId}`)
    
    return NextResponse.json({
      success: true,
      message: 'Snippet unassigned successfully'
    })

  } catch (error) {
    console.error('Failed to unassign snippet from page:', error)
    return NextResponse.json(
      { message: 'Failed to unassign snippet from page', error: error.message },
      { status: 500 }
    )
  }
}