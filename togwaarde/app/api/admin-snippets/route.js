import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Force dynamic route - Fresh deployment fix after disk space issue
export const dynamic = 'force-dynamic'

const DATA_DIR = path.join(process.cwd(), 'data', 'admin')
const SNIPPETS_FILE = path.join(DATA_DIR, 'snippets.json')

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  // Don't create empty file here - let loadSnippets() handle default data
}

// Simple session check
function isAuthenticated(request) {
  // For now, we'll skip server-side session validation 
  // and rely on client-side session management
  // In production, you'd want proper server-side session handling
  return true
}

// Load snippets from file with error handling
function loadSnippets() {
  try {
    ensureDataDir()
    if (!fs.existsSync(SNIPPETS_FILE)) {
      console.log('Snippets file does not exist, creating with default data')
      // Initialize with default snippets if file doesn't exist
      const defaultSnippets = [
        {
          "id": "philips-avent-sterilisator",
          "name": "Philips Avent Flessterilisator",
          "type": "bol",
          "url": "https://www.bol.com/nl/nl/p/philips-avent-flessterilisator-damp-droger/9300000062682298/",
          "tag": "Aanbevolen",
          "generatedHtml": "<div style=\"text-align: center\"><a href=\"https://www.bol.com/nl/nl/p/philips-avent-flessterilisator-damp-droger/9300000062682298/\" target=\"_blank\" rel=\"nofollow\"><img src=\"https://media.s-bol.com/NKX9XZWN3RGL/0RNmv15/550x707.jpg\" alt=\"Philips Avent Flessterilisator Damp & Droger\" width=\"300\" height=\"auto\" style=\"border-radius: 8px;\"></a><br><strong>Philips Avent Flessterilisator Damp & Droger</strong></div>",
          "active": true,
          "createdAt": "2025-09-29T13:07:58.390Z",
          "updatedAt": "2025-09-29T13:07:58.391Z"
        },
        {
          "id": "mam-sterilisator",
          "name": "MAM Sterilisator",
          "type": "bol",
          "url": "https://www.bol.com/nl/nl/p/mam-sterilisator-grijs-bpa-vrij/9300000050911914/",
          "tag": "Beste prijs/kwaliteit",
          "generatedHtml": "<div style=\"text-align: center\"><a href=\"https://www.bol.com/nl/nl/p/mam-sterilisator-grijs-bpa-vrij/9300000050911914/\" target=\"_blank\" rel=\"nofollow\"><img src=\"https://media.s-bol.com/N7353O6nX5Bm/pgx9EzV/550x698.jpg\" alt=\"MAM Sterilisator Grijs BPA-vrij\" width=\"300\" height=\"auto\" style=\"border-radius: 8px;\"></a><br><strong>MAM Sterilisator Grijs BPA-vrij</strong></div>",
          "active": true,
          "createdAt": "2025-09-29T13:07:58.391Z",
          "updatedAt": "2025-09-29T13:07:58.391Z"
        },
        {
          "id": "chicco-sterilisator",
          "name": "Chicco 3-in-1 Sterilisator",
          "type": "bol",
          "url": "https://www.bol.com/nl/nl/p/chicco-3-in-1-sterilisator-sterilnatural/9300000013318604/",
          "tag": null,
          "generatedHtml": "<div style=\"text-align: center\"><a href=\"https://www.bol.com/nl/nl/p/chicco-3-in-1-sterilisator-sterilnatural/9300000013318604/\" target=\"_blank\" rel=\"nofollow\"><img src=\"https://media.s-bol.com/g4ZkAnyvBWwG/BgPjL0N/550x645.jpg\" alt=\"Chicco 3 In 1 Sterilisator Sterilnatural\" width=\"300\" height=\"auto\" style=\"border-radius: 8px;\"></a><br><strong>Chicco 3 In 1 Sterilisator Sterilnatural</strong></div>",
          "active": true,
          "createdAt": "2025-09-29T13:07:58.391Z",
          "updatedAt": "2025-09-29T13:07:58.391Z"
        },
        {
          "id": "lifejxwen-sterilizer",
          "name": "LIFEJXWEN 5-in-1 Electric Sterilizer",
          "type": "amazon",
          "url": "https://www.amazon.nl/-/en/dp/B0FN47MMXK?tag=flesvoedingca-21",
          "shortUrl": "https://amzn.to/example",
          "tag": "Budget",
          "generatedHtml": "<div style=\"text-align: center\"><a href=\"https://www.amazon.nl/-/en/dp/B0FN47MMXK?tag=flesvoedingca-21\" target=\"_blank\" rel=\"nofollow\" align=\"center\"><img src=\"https://m.media-amazon.com/images/I/517904cDV3L._AC_SL1500_.jpg\" class=\"cg-img-1\" alt=\"LIFEJXWEN 5-in-1 Electric Sterilizer for Baby Bottles, Sterilizing, Drying, Auto-Sterilizing & Drying, Warming Food, Keeping Bottles Warm, Capacity 8 Bottles, 24 Hours Germination Protection\" width=\"300\" height=\"auto\"></a></div>",
          "active": true,
          "createdAt": "2025-09-29T13:07:58.391Z",
          "updatedAt": "2025-09-29T13:07:58.391Z"
        },
        {
          "id": "microwave-sterilizer-bags",
          "name": "Medela Magnetron Sterilisatiezakken",
          "type": "bol",
          "url": "https://www.bol.com/nl/nl/p/medela-quick-clean-magnetronzakken-5-stuks/9200000027648944/",
          "tag": "Onderweg",
          "generatedHtml": "<div style=\"text-align: center\"><a href=\"https://www.bol.com/nl/nl/p/medela-quick-clean-magnetronzakken-5-stuks/9200000027648944/\" target=\"_blank\" rel=\"nofollow\"><img src=\"https://media.s-bol.com/W6W9N8Q9m1J1/PDNnlLr/550x550.jpg\" alt=\"Medela Quick Clean Magnetronzakken\" width=\"300\" height=\"auto\" style=\"border-radius: 8px;\"></a><br><strong>Medela Quick Clean Magnetronzakken</strong></div>",
          "active": true,
          "createdAt": "2025-09-30T05:00:00.000Z",
          "updatedAt": "2025-09-30T05:00:00.000Z"
        },
        {
          "id": "sterilizing-tablets",
          "name": "Milton Sterilisatie Tabletten",
          "type": "bol",
          "url": "https://www.bol.com/nl/nl/p/milton-steriliseertabletten-28-stuks/9200000020075414/",
          "tag": "Chemisch",
          "generatedHtml": "<div style=\"text-align: center\"><a href=\"https://www.bol.com/nl/nl/p/milton-steriliseertabletten-28-stuks/9200000020075414/\" target=\"_blank\" rel=\"nofollow\"><img src=\"https://media.s-bol.com/pBnAOk7xvqmY/YlP2J6/550x733.jpg\" alt=\"Milton Steriliseertabletten\" width=\"300\" height=\"auto\" style=\"border-radius: 8px;\"></a><br><strong>Milton Steriliseertabletten</strong></div>",
          "active": true,
          "createdAt": "2025-09-30T05:00:00.000Z",
          "updatedAt": "2025-09-30T05:00:00.000Z"
        },
        {
          "id": "bottle-brush",
          "name": "Philips Avent Flessenborstel Set",
          "type": "bol",
          "url": "https://www.bol.com/nl/nl/p/philips-avent-flessenborstel-set/9200000009372844/",
          "tag": "Accessoire",
          "generatedHtml": "<div style=\"text-align: center\"><a href=\"https://www.bol.com/nl/nl/p/philips-avent-flessenborstel-set/9200000009372844/\" target=\"_blank\" rel=\"nofollow\"><img src=\"https://media.s-bol.com/71Jx52yE3r6E/550x550.jpg\" alt=\"Philips Avent Flessenborstel Set\" width=\"300\" height=\"auto\" style=\"border-radius: 8px;\"></a><br><strong>Philips Avent Flessenborstel Set</strong></div>",
          "active": true,
          "createdAt": "2025-09-30T05:00:00.000Z",
          "updatedAt": "2025-09-30T05:00:00.000Z"
        },
        {
          "id": "premium-sterilizer-dryer",
          "name": "Philips Avent 4-in-1 Sterilisator & Droger",
          "type": "bol",
          "url": "https://www.bol.com/nl/nl/p/philips-avent-4-in-1-elektrische-stoomsterilisator-en-droger/9300000082123414/",
          "tag": "Premium",
          "generatedHtml": "<div style=\"text-align: center\"><a href=\"https://www.bol.com/nl/nl/p/philips-avent-4-in-1-elektrische-stoomsterilisator-en-droger/9300000082123414/\" target=\"_blank\" rel=\"nofollow\"><img src=\"https://media.s-bol.com/mq9vPQNZ01Jr/YP6Qo8r/550x593.jpg\" alt=\"Philips Avent 4-in-1 Elektrische Stoomsterilisator en Droger\" width=\"300\" height=\"auto\" style=\"border-radius: 8px;\"></a><br><strong>Philips Avent 4-in-1 Elektrische Stoomsterilisator en Droger</strong></div>",
          "active": true,
          "createdAt": "2025-09-30T05:00:00.000Z",
          "updatedAt": "2025-09-30T05:00:00.000Z"
        }
      ]
      fs.writeFileSync(SNIPPETS_FILE, JSON.stringify(defaultSnippets, null, 2))
      return defaultSnippets
    }
    console.log(`📖 Loading snippets from file: ${SNIPPETS_FILE}`)
    const data = fs.readFileSync(SNIPPETS_FILE, 'utf8')
    const parsed = JSON.parse(data)
    console.log(`📊 Loaded ${parsed.length} snippets from file`)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Error loading snippets:', error)
    return []
  }
}

// Save snippets to file
function saveSnippets(snippets) {
  try {
    ensureDataDir()
    console.log(`💾 Saving ${snippets.length} snippets to file: ${SNIPPETS_FILE}`)
    fs.writeFileSync(SNIPPETS_FILE, JSON.stringify(snippets, null, 2))
    console.log('✅ File saved successfully')
  } catch (error) {
    console.error('❌ Error saving snippets file:', error)
    throw error
  }
}

// GET - List all snippets with timeout protection
export async function GET(request) {
  try {
    // Quick auth check (no expensive operations)
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const url = new URL(request.url)
    const activeOnly = url.searchParams.get('active') === 'true'
    
    // Load snippets with timeout protection
    const startTime = Date.now()
    let snippets = loadSnippets()
    const loadTime = Date.now() - startTime
    
    if (loadTime > 5000) {
      console.warn(`Snippets loading took ${loadTime}ms - this is too slow for production`)
    }
    
    if (activeOnly) {
      snippets = snippets.filter(snippet => snippet.active)
    }
    
    return NextResponse.json({
      success: true,
      snippets,
      loadTime: loadTime
    })

  } catch (error) {
    console.error('Failed to load snippets:', error)
    return NextResponse.json(
      { message: 'Failed to load snippets', error: error.message },
      { status: 500 }
    )
  }
}

// POST - Create new snippet with production-safe error handling
export async function POST(request) {
  try {
    // Simple auth check for creating snippets
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const snippetData = await request.json()
    
    // Validate required fields
    if (!snippetData.name || !snippetData.type) {
      return NextResponse.json(
        { message: 'Name and type are required' },
        { status: 400 }
      )
    }
    
    const snippets = loadSnippets()
    
    const newSnippet = {
      id: snippetData.id || `${snippetData.type}-${Date.now()}`,
      name: snippetData.name,
      type: snippetData.type,
      url: snippetData.url || '',
      shortUrl: snippetData.shortUrl || '',
      imageUrl: snippetData.imageUrl || null, // Add imageUrl field
      tag: snippetData.tag || null,
      generatedHtml: snippetData.generatedHtml || '',
      codeSnippet: snippetData.codeSnippet || '',
      price: snippetData.price || null,
      originalPrice: snippetData.originalPrice || null,
      currency: snippetData.currency || 'EUR',
      priceLastUpdated: snippetData.price ? new Date().toISOString() : null,
      active: snippetData.active ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    snippets.push(newSnippet)
    saveSnippets(snippets)
    
    console.log('Created new snippet:', newSnippet.id)
    
    return NextResponse.json({
      success: true,
      snippet: newSnippet
    })

  } catch (error) {
    console.error('Failed to create snippet:', error)
    return NextResponse.json(
      { message: 'Failed to create snippet', error: error.message },
      { status: 500 }
    )
  }
}

// PUT - Update existing snippet
export async function PUT(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const updateData = await request.json()
    
    if (!updateData.id) {
      return NextResponse.json(
        { message: 'Snippet ID is required' },
        { status: 400 }
      )
    }
    
    const snippets = loadSnippets()
    const snippetIndex = snippets.findIndex(s => s.id === updateData.id)
    
    if (snippetIndex === -1) {
      return NextResponse.json(
        { message: 'Snippet not found' },
        { status: 404 }
      )
    }
    
    // Update the snippet with new data
    const updatedSnippet = {
      ...snippets[snippetIndex],
      ...updateData,
      // Update priceLastUpdated if price fields are being updated
      priceLastUpdated: (updateData.price || updateData.originalPrice) ? new Date().toISOString() : snippets[snippetIndex].priceLastUpdated,
      updatedAt: new Date().toISOString()
    }
    
    snippets[snippetIndex] = updatedSnippet
    saveSnippets(snippets)
    
    console.log('Updated snippet:', updatedSnippet.id)
    
    return NextResponse.json({
      success: true,
      snippet: updatedSnippet
    })

  } catch (error) {
    console.error('Failed to update snippet:', error)
    return NextResponse.json(
      { message: 'Failed to update snippet', error: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Delete snippet
export async function DELETE(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { id } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { message: 'Snippet ID is required' },
        { status: 400 }
      )
    }
    
    const snippets = loadSnippets()
    const snippetIndex = snippets.findIndex(s => s.id === id)
    
    if (snippetIndex === -1) {
      return NextResponse.json(
        { message: 'Snippet not found' },
        { status: 404 }
      )
    }
    
    // Remove the snippet
    const deletedSnippet = snippets.splice(snippetIndex, 1)[0]
    console.log('Before save - snippets count:', snippets.length)
    console.log('Deleting snippet:', deletedSnippet.id)
    
    saveSnippets(snippets)
    
    // Verify the file was updated by reading it back
    const verifySnippets = loadSnippets()
    console.log('After save - snippets count:', verifySnippets.length)
    const stillExists = verifySnippets.find(s => s.id === deletedSnippet.id)
    if (stillExists) {
      console.error('🚨 DELETION FAILED: Snippet still exists after save!')
      return NextResponse.json(
        { message: 'Failed to delete snippet - still exists after save' },
        { status: 500 }
      )
    }
    
    console.log('✅ Snippet successfully deleted:', deletedSnippet.id)
    
    return NextResponse.json({
      success: true,
      message: 'Snippet deleted successfully',
      snippet: deletedSnippet
    })

  } catch (error) {
    console.error('Failed to delete snippet:', error)
    return NextResponse.json(
      { message: 'Failed to delete snippet', error: error.message },
      { status: 500 }
    )
  }
}