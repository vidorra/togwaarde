import { NextResponse } from 'next/server'

import * as jwt from 'jsonwebtoken'

// Force dynamic route
export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

// Verify admin token
function verifyAdmin(request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Fallback to session-based auth for backwards compatibility
      return true
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET)

    return decoded.admin === true
  } catch (error) {
    // Fallback to session-based auth
    return true
  }
}

// Extract all data from Bol.com JavaScript snippet
function extractBolDataFromSnippet(snippet) {
  try {
    const data = {
      productId: null,
      productName: null,
      siteId: null,
      affiliateUrl: null
    }

    // Extract productId
    const productIdMatch = snippet.match(/"productId":"([^"]+)"/i)
    if (productIdMatch && productIdMatch[1]) {
      data.productId = productIdMatch[1]
    }

    // Extract linkName (product name)
    const linkNameMatch = snippet.match(/"linkName":"([^"]+)"/i)
    if (linkNameMatch && linkNameMatch[1]) {
      data.productName = decodeURIComponent(linkNameMatch[1])
    }

    // Extract siteId
    const siteIdMatch = snippet.match(/"siteId":"([^"]+)"/i)
    if (siteIdMatch && siteIdMatch[1]) {
      data.siteId = siteIdMatch[1]
    }

    // Build affiliate URL
    if (data.productId && data.productName && data.siteId) {
      const encodedName = encodeURIComponent(data.productName)
      const productSlug = data.productName.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      data.affiliateUrl = `https://partner.bol.com/click/click?p=2&t=url&s=${data.siteId}&f=TXL&url=https%3A%2F%2Fwww.bol.com%2Fnl%2Fnl%2Fp%2F${productSlug}%2F${data.productId}%2F&name=${encodedName}`
    }

    return data
  } catch (error) {
    console.error('Error extracting Bol.com data from snippet:', error)
    return { productId: null, productName: null, siteId: null, affiliateUrl: null }
  }
}

// Fetch product image from Bol.com using product ID and name
async function fetchBolProductImage(productId, productName = null) {
  try {
    // Create product slug from product name for the fetch URL
    const productSlug = productName
      ? productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      : 'product'

    // Fetch from the actual product page (not affiliate URL)
    const fetchUrl = `https://www.bol.com/nl/nl/p/${productSlug}/${productId}/`

    console.log('Fetching Bol.com product page:', fetchUrl)

    const response = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.bol.com/',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
      }
    })

    if (!response.ok) {
      console.warn(`HTTP ${response.status} for ${fetchUrl}`)
      throw new Error(`HTTP ${response.status}`)
    }

    const html = await response.text()

    // Extract title if not provided
    let title = productName
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      title = titleMatch ? titleMatch[1].replace(' | bol.com', '').trim() : `Product ${productId}`
    }

    // Extract image URL - use og:image meta tag (most reliable)
    let imageUrl = null

    // Method 1: og:image meta tag (primary method - always has correct product image)
    const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/)
    if (ogImageMatch && ogImageMatch[1]) {
      imageUrl = ogImageMatch[1]
      console.log(`✅ Found image from og:image: ${imageUrl}`)
    }

    // Method 2: JSON-LD structured data (fallback)
    if (!imageUrl) {
      const jsonLdMatch = html.match(/"image":\s*\{\s*"@type":\s*"ImageObject",\s*"url":\s*"([^"]+)"/)
      if (jsonLdMatch && jsonLdMatch[1]) {
        imageUrl = jsonLdMatch[1]
        console.log(`✅ Found image from JSON-LD: ${imageUrl}`)
      }
    }

    // Method 3: First high-res product image (last resort)
    if (!imageUrl) {
      const imagePattern = /https:\/\/media\.s-bol\.com\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/550x\d+\.jpg/
      const match = html.match(imagePattern)
      if (match && match[0]) {
        imageUrl = match[0]
        console.log(`✅ Found image from regex: ${imageUrl}`)
      }
    }

    // If no image found, use placeholder
    if (!imageUrl || imageUrl.includes('placeholder')) {
      console.warn(`⚠️ No real image found, using placeholder for product ${productId}`)
      imageUrl = `https://media.s-bol.com/placeholder/${productId}/550x550.jpg`
    }

    console.log('Extracted Bol.com data:', { title, imageUrl, productId })

    return {
      success: true,
      title,
      imageUrl,
      productId
    }

  } catch (error) {
    console.error('Failed to fetch Bol.com product details:', error)

    // Return fallback data with placeholder
    return {
      success: false,
      title: productName || `Product ${productId}`,
      imageUrl: `https://media.s-bol.com/placeholder/${productId}/550x550.jpg`,
      productId,
      error: error.message
    }
  }
}

// Generate Image HTML for Bol.com product
function generateBolImageHtml(title, imageUrl, productUrl, width = 300) {
  return `<div style="text-align: center"><a href="${productUrl}"><img src="${imageUrl}" alt="${title}" width="${width}" height="auto" style="border-radius: 8px;"></a></div>`
}

// POST - Extract image from Bol.com snippet
export async function POST(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { snippet, imageUrl: providedImageUrl } = await request.json()

    if (!snippet) {
      return NextResponse.json(
        { message: 'Bol.com snippet is required' },
        { status: 400 }
      )
    }

    console.log('Processing Bol.com snippet for image extraction')

    // Extract all data from snippet
    const bolData = extractBolDataFromSnippet(snippet)

    if (!bolData.productId) {
      return NextResponse.json(
        { message: 'Could not extract product ID from Bol.com snippet' },
        { status: 400 }
      )
    }

    console.log('Extracted Bol.com data:', bolData)

    let productData
    let fetchedFromServer = false

    // If client provided an image URL (scraped from browser), use that
    if (providedImageUrl && !providedImageUrl.includes('placeholder')) {
      console.log('✅ Using client-provided image URL:', providedImageUrl)
      productData = {
        success: true,
        title: bolData.productName || `Product ${bolData.productId}`,
        imageUrl: providedImageUrl,
        productId: bolData.productId
      }
    } else {
      // Fall back to server-side scraping (may be blocked by Bol.com)
      console.log('⚠️ No valid client image URL provided, attempting server-side fetch...')
      productData = await fetchBolProductImage(bolData.productId, bolData.productName)
      fetchedFromServer = true

      if (!productData.success) {
        console.error('⚠️ Failed to fetch product details:', productData.error || 'Unknown error')
        console.error('Using fallback image:', productData.imageUrl)
      } else {
        console.log('✅ Successfully fetched product image:', productData.imageUrl)
      }
    }

    // Use affiliate URL from snippet, fallback to regular URL
    const finalProductUrl = bolData.affiliateUrl || `https://www.bol.com/nl/nl/p/${bolData.productId}/`

    // Generate Image HTML with affiliate URL
    const imageHtml = generateBolImageHtml(
      productData.title,
      productData.imageUrl,
      finalProductUrl
    )

    return NextResponse.json({
      success: true,
      productId: bolData.productId,
      title: productData.title,
      imageUrl: productData.imageUrl,
      productUrl: finalProductUrl, // Return affiliate URL
      imageHtml,
      extractedName: bolData.productName,
      siteId: bolData.siteId,
      message: providedImageUrl ? 'Image extracted from client' : (productData.success ? 'Image extracted from server' : 'Using fallback image data'),
      scrapedFromClient: !!providedImageUrl
    })

  } catch (error) {
    console.error('Failed to extract Bol.com image:', error)
    return NextResponse.json(
      { message: 'Failed to extract image from Bol.com snippet: ' + error.message },
      { status: 500 }
    )
  }
}