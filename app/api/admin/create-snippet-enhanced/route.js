import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db/connection.js'
import { snippets } from '../../../../lib/db/schema.js'

// Force dynamic route
export const dynamic = 'force-dynamic'

// Simple session check
function isAuthenticated(request) {
  return true // For demo purposes, same as other admin endpoints
}

// Detect if input is a Bol.com script snippet
function isBolComScript(input) {
  return input.includes('bol_sitebar_v2') && 
         input.includes('partner.bol.com') && 
         input.includes('<script')
}

// Extract product data from Bol.com script
function extractBolComData(snippet) {
  try {
    // Extract product ID - simpler pattern that handles escaped quotes
    const productIdMatch = snippet.match(/productId\\":\\"([^"\\]+)\\"/i)
    const productId = productIdMatch ? productIdMatch[1] : null

    // Extract link name - simpler pattern that handles escaped quotes
    const linkNameMatch = snippet.match(/linkName\\":\\"([^"\\]+)\\"/i)
    const linkName = linkNameMatch ? linkNameMatch[1] : null

    // Extract site ID - simpler pattern that handles escaped quotes
    const siteIdMatch = snippet.match(/siteId\\":\\"([^"\\]+)\\"/i)
    const siteId = siteIdMatch ? siteIdMatch[1] : null

    // Extract base URL - simpler pattern that handles escaped quotes
    const baseUrlMatch = snippet.match(/baseUrl\\":\\"([^"\\]+)\\"/i)
    const baseUrl = baseUrlMatch ? baseUrlMatch[1] : null

    return {
      productId,
      linkName,
      siteId,
      baseUrl
    }
  } catch (error) {
    console.error('Error extracting Bol.com data:', error)
    return null
  }
}

// Build Bol.com click URL
function buildBolComClickUrl(data) {
  const { productId, linkName, siteId } = data
  if (!productId || !linkName || !siteId) return null

  const encodedUrl = encodeURIComponent(`https://www.bol.com/nl/nl/p/${linkName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${productId}/`)
  const encodedName = encodeURIComponent(linkName)
  
  return `https://partner.bol.com/click/click?p=2&t=url&s=${siteId}&f=TXL&url=${encodedUrl}&name=${encodedName}`
}

// Fetch product image from Bol.com
async function fetchBolComImage(productId, productName) {
  try {
    // Convert product name to URL slug format
    const productSlug = productName ? 
      productName.toLowerCase()
        .replace(/[^a-z0-9\s\-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
      : 'product'
    
    const productUrl = `https://www.bol.com/nl/nl/p/${productSlug}/${productId}/`
    
    console.log('Fetching Bol.com product page:', productUrl)
    
    const response = await fetch(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const html = await response.text()
    
    // Extract title if not provided
    let title = productName
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      title = titleMatch ? titleMatch[1].replace(' | bol.com', '').trim() : `Product ${productId}`
    }
    
    // Extract image URL using specific Bol.com structure
    let imageUrl = `https://media.s-bol.com/placeholder/${productId}/550x550.jpg`
    
    // Try to extract from the main product image container
    const containerPatterns = [
      // Look for any media.s-bol.com URL within the current item container (flexible pattern)
      /<div[^>]*class="[^"]*container-item__current[^"]*js_current_item[^"]*"[^>]*>[\s\S]{0,2000}?(media\.s-bol\.com\/[A-Za-z0-9]+\/(?:5[0-9][0-9]|[6-9][0-9][0-9]|[1-9][0-9]{3,})x[0-9]+\.jpg)/i,
      // Alternative: look for the pattern in any container-item__current
      /<div[^>]*container-item__current[^>]*>[\s\S]{0,1500}?(media\.s-bol\.com\/[A-Za-z0-9]+\/(?:5[0-9][0-9]|[6-9][0-9][0-9]|[1-9][0-9]{3,})x[0-9]+\.jpg)/i,
      // Even more flexible: just find any large image near js_current_item
      /js_current_item[\s\S]{0,1000}?(media\.s-bol\.com\/[A-Za-z0-9]+\/(?:5[0-9][0-9]|[6-9][0-9][0-9]|[1-9][0-9]{3,})x[0-9]+\.jpg)/i
    ]
    
    for (const pattern of containerPatterns) {
      const match = html.match(pattern)
      if (match && match[1]) {
        // Ensure we have a full URL
        imageUrl = match[1].startsWith('https://') ? match[1] : `https://${match[1]}`
        console.log(`✅ Found product image using container pattern: ${imageUrl}`)
        break
      }
    }
    
    // If container patterns didn't work, try general patterns
    if (imageUrl.includes('placeholder')) {
      const generalPatterns = [
        // Modern Bol.com image patterns (direct URLs)
        /(?:https:\/\/)?media\.s-bol\.com\/[A-Za-z0-9]+\/(?:5[0-9][0-9]|[6-9][0-9][0-9]|[1-9][0-9]{3,})x[0-9]+\.jpg/g,
        // Quoted image patterns
        /"(https:\/\/media\.s-bol\.com\/[^"]*\/(?:5[0-9][0-9]|[6-9][0-9][0-9]|[1-9][0-9]{3,})x[0-9]+\.jpg)"/g
      ]
      
      for (const pattern of generalPatterns) {
        const matches = [...html.matchAll(pattern)]
        if (matches.length > 0) {
          // Find the largest image (highest resolution)
          let bestImage = null
          let maxRes = 0
          
          for (const match of matches) {
            // Handle patterns with or without capture groups
            const img = match[1] || match[0]
            
            // Ensure we have a full URL
            const fullImg = img.startsWith('https://') ? img : `https://${img}`
            
            // Extract resolution from URL like .../550x806.jpg
            const resMatch = fullImg.match(/\/(\d+)x(\d+)\.jpg/)
            if (resMatch) {
              const res = parseInt(resMatch[1]) * parseInt(resMatch[2])
              if (res > maxRes && res >= 250000) { // Only consider images 500x500 or larger
                maxRes = res
                bestImage = fullImg
              }
            }
          }
          
          if (bestImage) {
            imageUrl = bestImage
            console.log(`✅ Found product image using general pattern: ${imageUrl}`)
            break
          }
        }
      }
    }
    
    console.log('Extracted Bol.com data:', { title, imageUrl, productId })
    
    return {
      success: true,
      title,
      imageUrl,
      productId,
      productUrl
    }
    
  } catch (error) {
    console.error('Failed to fetch Bol.com product details:', error)
    
    // Return fallback data
    return {
      success: false,
      title: productName || `Product ${productId}`,
      imageUrl: `https://media.s-bol.com/placeholder/${productId}/550x550.jpg`,
      productId,
      productUrl: `https://www.bol.com/nl/nl/p/${productId}/`,
      error: error.message
    }
  }
}

// Generate Image HTML
function generateImageHtml(title, imageUrl, productUrl) {
  return `<img src="${imageUrl}" alt="${title}" class="product-image mx-auto rounded-lg" style="max-width: 300px; height: auto;" />`
}

// POST - Create snippet with enhanced field separation
export async function POST(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { input, name, tag, type } = await request.json()
    
    if (!input) {
      return NextResponse.json(
        { message: 'Input is required' },
        { status: 400 }
      )
    }
    
    console.log('Processing input for enhanced snippet creation')
    
    // Check if input is a Bol.com script
    if (isBolComScript(input)) {
      console.log('🔍 Detected Bol.com script - processing with field separation')
      
      // Extract data from script
      const bolData = extractBolComData(input)
      
      if (!bolData || !bolData.productId) {
        return NextResponse.json(
          { message: 'Could not extract product data from Bol.com script' },
          { status: 400 }
        )
      }
      
      console.log('📋 Extracted Bol.com data:', bolData)
      
      // Fetch product image and details
      const productDetails = await fetchBolComImage(bolData.productId, bolData.linkName)
      
      // Build click URL
      const clickUrl = buildBolComClickUrl(bolData)
      
      // Generate separated fields
      const imageHtml = generateImageHtml(
        productDetails.title, 
        productDetails.imageUrl, 
        productDetails.productUrl
      )
      
      const bolScript = input.trim() // Keep the original script
      
      const finalName = name || productDetails.title || bolData.linkName
      const finalTag = tag || null
      
      // Create the new snippet with proper field separation using database
      const newSnippet = {
        id: `bol-${bolData.productId}-${Date.now()}`,
        name: finalName,
        type: 'bol_snippet',
        url: clickUrl || productDetails.productUrl || '',
        tag: finalTag,
        // Store the combined HTML in generatedHtml for compatibility
        generatedHtml: `${imageHtml}\n${bolScript}`,
        price: null,
        originalPrice: null,
        currency: 'EUR',
        priceLastUpdated: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const [insertedSnippet] = await db.insert(snippets).values(newSnippet).returning()
      
      return NextResponse.json({
        success: true,
        message: 'Bol.com snippet created with proper field separation',
        snippet: insertedSnippet,
        extractedData: {
          productId: bolData.productId,
          productName: productDetails.title,
          imageUrl: productDetails.imageUrl,
          clickUrl: clickUrl,
          fieldsPopulated: {
            imageHtml: 'Contains fetched product image',
            bolScript: 'Contains Bol.com JavaScript snippet',
            fallbackUrl: 'Contains generated click URL'
          }
        }
      })
      
    } else {
      // Handle non-Bol.com input (regular URL or other content)
      return NextResponse.json(
        { message: 'Enhanced snippet creation currently supports Bol.com scripts only. Use regular snippet creation for other types.' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Failed to create enhanced snippet:', error)
    return NextResponse.json(
      { message: 'Failed to create snippet: ' + error.message },
      { status: 500 }
    )
  }
}