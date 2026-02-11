// Simple test script to verify API functionality
const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(process.cwd(), 'data', 'admin')
const PAGE_SNIPPETS_FILE = path.join(DATA_DIR, 'page-snippets.json')
const SNIPPETS_FILE = path.join(DATA_DIR, 'snippets.json')

function testDataFiles() {
  console.log('🔍 Testing data files...')
  
  // Test snippets.json
  if (fs.existsSync(SNIPPETS_FILE)) {
    const snippetsData = JSON.parse(fs.readFileSync(SNIPPETS_FILE, 'utf8'))
    console.log(`✅ snippets.json exists with ${snippetsData.length} snippets`)
    
    // Check for enhanced format
    const bolSnippets = snippetsData.filter(s => s.type === 'bol')
    const hasEnhancedFormat = bolSnippets.some(s => 
      s.generatedHtml && s.generatedHtml.includes('bol_sitebar_v2')
    )
    console.log(`📊 Bol snippets: ${bolSnippets.length}, Enhanced format: ${hasEnhancedFormat}`)
    
    // Show first bol snippet
    const firstBol = bolSnippets[0]
    if (firstBol) {
      console.log(`🔍 First Bol snippet: ${firstBol.id} - ${firstBol.name}`)
      console.log(`📄 HTML length: ${firstBol.generatedHtml?.length || 0} chars`)
      console.log(`🔧 Contains bol_sitebar_v2: ${firstBol.generatedHtml?.includes('bol_sitebar_v2') || false}`)
    }
  } else {
    console.log('❌ snippets.json does not exist')
  }
  
  // Test page-snippets.json
  if (fs.existsSync(PAGE_SNIPPETS_FILE)) {
    const pageSnippetsData = JSON.parse(fs.readFileSync(PAGE_SNIPPETS_FILE, 'utf8'))
    const pageId = 'hygiene-bereiding_flessen-steriliseren'
    const pageSnippets = pageSnippetsData[pageId] || []
    console.log(`✅ page-snippets.json exists`)
    console.log(`📋 Page ${pageId} has ${pageSnippets.length} assigned snippets`)
    pageSnippets.forEach((ps, i) => {
      console.log(`  ${i + 1}. ${ps.snippetId} (order: ${ps.order})`)
    })
  } else {
    console.log('❌ page-snippets.json does not exist')
  }
}

function testApiLogic() {
  console.log('\n🔧 Testing API logic...')
  
  // Load data
  const pageSnippets = JSON.parse(fs.readFileSync(PAGE_SNIPPETS_FILE, 'utf8'))
  const allSnippets = JSON.parse(fs.readFileSync(SNIPPETS_FILE, 'utf8'))
  const pageId = 'hygiene-bereiding_flessen-steriliseren'
  
  const pageSnippetList = pageSnippets[pageId] || []
  
  // Get active snippets for this page, sorted by order
  const activeSnippets = pageSnippetList
    .filter(ps => ps.active)
    .map(ps => ({
      ...ps,
      snippet: allSnippets.find(s => s.id === ps.snippetId)
    }))
    .filter(ps => ps.snippet && ps.snippet.active) // Only active snippets
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(ps => ps.snippet) // Return just the snippet data
  
  console.log(`🎯 Found ${activeSnippets.length} active snippets for page`)
  
  // Convert to frontend format
  const frontendSnippets = activeSnippets.map(snippet => {
    if (snippet.type === 'bol') {
      return {
        id: snippet.id,
        name: snippet.name,
        tag: snippet.tag,
        active: snippet.active,
        type: 'bol_snippet', // Changed to show JavaScript code widget
        generatedHtml: snippet.generatedHtml, // Include the HTML for the widget
        data: {
          title: snippet.name,
          fallbackImage: 'https://via.placeholder.com/200x200?text=Product',
          productUrl: '#'
        }
      }
    }
    return snippet
  }).filter(Boolean)
  
  console.log(`📦 Frontend format: ${frontendSnippets.length} snippets`)
  frontendSnippets.forEach((snippet, i) => {
    console.log(`  ${i + 1}. ${snippet.id} - ${snippet.type} - HTML: ${snippet.generatedHtml?.length || 0} chars`)
  })
  
  return {
    success: true,
    snippets: frontendSnippets
  }
}

// Run tests
testDataFiles()
const result = testApiLogic()
console.log('\n🚀 Final API result:')
console.log(`Success: ${result.success}, Snippets: ${result.snippets.length}`)