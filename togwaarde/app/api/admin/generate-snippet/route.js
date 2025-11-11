import { NextResponse } from 'next/server'
import { fetchPrice, generatePriceHtml } from '../../../../lib/price-fetcher.js'

// Force dynamic route
export const dynamic = 'force-dynamic'

// Simple session check - matches other admin endpoints
function isAuthenticated(request) {
  // For now, we'll skip server-side session validation 
  // and rely on client-side session management
  // In production, you'd want proper server-side session handling
  return true
}

// Extract Amazon ASIN from various URL formats
function extractAmazonASIN(url) {
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/i,      // /dp/B0FN47MMXK
    /\/product\/([A-Z0-9]{10})/i,  // /product/B0FN47MMXK
    /\/gp\/product\/([A-Z0-9]{10})/i, // /gp/product/B0FN47MMXK
    /asin=([A-Z0-9]{10})/i,        // asin=B0FN47MMXK
    /\/([A-Z0-9]{10})\?/i,         // /B0FN47MMXK?
    /\/([A-Z0-9]{10})$/i           // /B0FN47MMXK
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  
  return null
}

// Follow redirects to get final URL
async function followRedirects(shortUrl, maxRedirects = 5) {
  let currentUrl = shortUrl
  let redirectCount = 0
  
  while (redirectCount < maxRedirects) {
    try {
      const response = await fetch(currentUrl, { 
        method: 'HEAD', 
        redirect: 'manual' 
      })
      
      if (response.status >= 300 && response.status < 400) {
        const locationHeader = response.headers.get('location')
        if (locationHeader) {
          currentUrl = locationHeader
          redirectCount++
          continue
        }
      }
      
      break
    } catch (error) {
      break
    }
  }
  
  return currentUrl
}

// Fetch Amazon product details by scraping the page
async function fetchAmazonProductDetails(asin, finalUrl) {
  try {
    console.log('Fetching Amazon product details for ASIN:', asin)
    
    // Try to fetch the Amazon page
    const response = await fetch(finalUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9,nl;q=0.8'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const html = await response.text()
    
    // Extract title
    let title = `Amazon Product ${asin}`
    const titlePatterns = [
      /<span[^>]*id="productTitle"[^>]*>([^<]+)<\/span>/i,
      /<title[^>]*>([^:]+)/i
    ]
    
    for (const pattern of titlePatterns) {
      const match = html.match(pattern)
      if (match) {
        title = match[1].trim().replace(/\s+/g, ' ')
        break
      }
    }
    
    // Extract image URL
    let imageUrl = `https://m.media-amazon.com/images/I/${asin}._AC_SL1500_.jpg`
    const imagePatterns = [
      /"hiRes":"([^"]*images\/I\/[^"]*\.jpg[^"]*)"/i,
      /"large":"([^"]*images\/I\/[^"]*\.jpg[^"]*)"/i,
      /src="([^"]*images\/I\/[^"]*\.jpg[^"]*)"/i
    ]
    
    for (const pattern of imagePatterns) {
      const match = html.match(pattern)
      if (match) {
        imageUrl = match[1].replace(/\\u002F/g, '/')
        break
      }
    }
    
    console.log('Extracted Amazon data:', { title, imageUrl })
    
    return {
      title: title,
      imageUrl: imageUrl,
      description: `Amazon product: ${title}`
    }
    
  } catch (error) {
    console.error('Failed to fetch Amazon product details:', error)
    
    // Return fallback data
    return {
      title: `Amazon Product ${asin}`,
      imageUrl: `https://m.media-amazon.com/images/I/${asin}._AC_SL1500_.jpg`,
      description: `Amazon product with ASIN: ${asin}`
    }
  }
}

// Generate HTML snippet for Amazon product
function generateAmazonSnippet(productData, affiliateUrl, priceData = null, width = 300) {
  const { title, imageUrl } = productData
  const priceHtml = priceData ? generatePriceHtml(priceData.price, priceData.originalPrice) : ''
  
  return `<div style="text-align: center"><a href="${affiliateUrl}" target="_blank" rel="nofollow" align="center"><img src="${imageUrl}" class="cg-img-1" alt="${title}" width="${width}" height="auto"></a>${priceHtml}</div>`
}

// Extract product ID from Bol.com URL
function extractBolProductId(url) {
  const patterns = [
    /\/p\/[^\/]+\/([0-9]+)\//i,     // /p/product-name/9300000062682298/
    /\/([0-9]{10,})\/$/i,           // /9300000062682298/
    /\/([0-9]{10,})\?/i,            // /9300000062682298?
    /\/([0-9]{10,})$/i              // /9300000062682298
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  
  return null
}

// Generate HTML snippet for Bol.com product
function generateBolSnippet(title, imageUrl, productUrl, priceData = null, width = 300) {
  const priceHtml = priceData ? generatePriceHtml(priceData.price, priceData.originalPrice) : ''
  
  // Extract product ID from URL for the code snippet
  const productId = extractBolProductId(productUrl)
  
  // Generate Bol.com JavaScript code snippet
  const uniqueId = `bol_${Date.now()}`
  const codeSnippet = `<script type="text/javascript">var bol_sitebar_v2={"id":"${uniqueId}", "baseUrl":"partner.bol.com","productId":"${productId}","familyId":"","siteId":"1472968","target":true,"rating":true,"price":true,"deliveryDescription":true,"button":false,"linkName":"${encodeURIComponent(title)}","linkSubId":""};</script><script type="text/javascript" src="https://partner.bol.com/promotion/static/js/partnerProductlinkV2.js" id="${uniqueId}"></script>`
  
  // Generate the new format with full code snippet after title
  return `<div class="bg-white rounded-xl border border-gray-200 p-4">
    <div class="text-center">
      <a href="${productUrl}" target="_blank" rel="nofollow noopener" class="block hover:opacity-90 transition-opacity">
        <div class="mb-3">
          <img src="${imageUrl}" alt="${title}" class="mx-auto rounded-lg max-w-full h-auto" style="max-height: 200px;">
        </div>
        <h4 class="font-medium text-primary text-sm mb-2 line-clamp-2 min-h-[40px] flex items-center">${title}</h4>
        <div class="mt-2 mb-3 p-3 bg-gray-100 rounded-lg text-left">
          <h5 class="text-xs font-medium text-gray-700 mb-2">Bol.com Code Snippet:</h5>
          <code class="text-xs text-gray-600 break-all block">${codeSnippet}</code>
        </div>
        ${priceHtml}
        <div class="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors inline-block">Bekijk op bol.com →</div>
      </a>
    </div>
  </div>`
}

// POST - Generate snippet from URL
export async function POST(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { url, type } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { message: 'URL is required' },
        { status: 400 }
      )
    }
    
    if (type === 'amazon') {
      try {
        // Follow redirects to get the final Amazon URL
        const finalUrl = await followRedirects(url)
        console.log('Final URL after redirects:', finalUrl)
        
        // Extract ASIN from the final URL
        const asin = extractAmazonASIN(finalUrl)
        
        if (!asin) {
          return NextResponse.json(
            { message: 'Could not extract ASIN from Amazon URL' },
            { status: 400 }
          )
        }
        
        console.log('Extracted ASIN:', asin)
        
        // Build the affiliate URL
        const affiliateTag = 'flesvoedingca-21'
        const affiliateUrl = `https://www.amazon.nl/-/en/dp/${asin}?tag=${affiliateTag}`
        
        // Fetch product details by scraping
        const productData = await fetchAmazonProductDetails(asin, finalUrl)
        
        // Fetch price information
        let priceData = null
        try {
          priceData = await fetchPrice(finalUrl, 'amazon')
          console.log('🛒 Amazon price fetched:', priceData)
        } catch (priceError) {
          console.warn('⚠️ Could not fetch Amazon price:', priceError.message)
        }
        
        if (!productData) {
          // Fallback with basic data
          const fallbackData = {
            title: `Amazon Product ${asin}`,
            imageUrl: `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.L.jpg`
          }
          const html = generateAmazonSnippet(fallbackData, affiliateUrl, priceData)
          
          return NextResponse.json({
            success: true,
            html,
            productName: fallbackData.title,
            imageUrl: fallbackData.imageUrl,
            asin,
            affiliateUrl,
            price: priceData?.price,
            originalPrice: priceData?.originalPrice,
            currency: priceData?.currency
          })
        }
        
        // Generate the HTML snippet
        const html = generateAmazonSnippet(productData, affiliateUrl, priceData)
        
        return NextResponse.json({
          success: true,
          html,
          productName: productData.title,
          imageUrl: productData.imageUrl,
          asin,
          affiliateUrl,
          price: priceData?.price,
          originalPrice: priceData?.originalPrice,
          currency: priceData?.currency
        })
        
      } catch (error) {
        console.error('Error processing Amazon URL:', error)
        return NextResponse.json(
          { message: 'Failed to process Amazon URL: ' + error.message },
          { status: 500 }
        )
      }
    }
    
    if (type === 'bol') {
      try {
        // Extract product ID from Bol.com URL
        const productId = extractBolProductId(url)
        
        if (!productId) {
          return NextResponse.json(
            { message: 'Could not extract product ID from Bol.com URL' },
            { status: 400 }
          )
        }
        
        console.log('Extracted Bol.com Product ID:', productId)
        
        // Fetch price information
        let priceData = null
        try {
          priceData = await fetchPrice(url, 'bol')
          console.log('🛒 Bol.com price fetched:', priceData)
        } catch (priceError) {
          console.warn('⚠️ Could not fetch Bol.com price:', priceError.message)
        }
        
        // Try to fetch the page to extract title and image
        try {
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          })
          
          if (response.ok) {
            const html = await response.text()
            
            // Extract title
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
            let title = titleMatch ? titleMatch[1].replace(' | bol.com', '').trim() : `Product ${productId}`
            
            // Extract image URL
            let imageUrl = `https://media.s-bol.com/placeholder/${productId}/550x550.jpg`
            const imgMatches = html.match(/<img[^>]+src="([^"]*media\.s-bol\.com[^"]*)"[^>]*>/gi)
            if (imgMatches && imgMatches.length > 0) {
              const imgMatch = imgMatches[0].match(/src="([^"]+)"/i)
              if (imgMatch) {
                imageUrl = imgMatch[1]
              }
            }
            
            const html_snippet = generateBolSnippet(title, imageUrl, url, priceData)
            
            return NextResponse.json({
              success: true,
              html: html_snippet,
              productName: title,
              productId,
              productUrl: url,
              imageUrl,
              price: priceData?.price,
              originalPrice: priceData?.originalPrice,
              currency: priceData?.currency
            })
          }
        } catch (fetchError) {
          console.log('Could not fetch Bol.com page, using fallback data')
        }
        
        // Fallback with basic data
        const fallbackTitle = `Bol.com Product ${productId}`
        const fallbackImage = `https://media.s-bol.com/placeholder/${productId}/550x550.jpg`
        const html_snippet = generateBolSnippet(fallbackTitle, fallbackImage, url, priceData)
        
        return NextResponse.json({
          success: true,
          html: html_snippet,
          productName: fallbackTitle,
          productId,
          productUrl: url,
          imageUrl: fallbackImage,
          price: priceData?.price,
          originalPrice: priceData?.originalPrice,
          currency: priceData?.currency
        })
        
      } catch (error) {
        console.error('Error processing Bol.com URL:', error)
        return NextResponse.json(
          { message: 'Failed to process Bol.com URL: ' + error.message },
          { status: 500 }
        )
      }
    }
    
    // For other types
    return NextResponse.json(
      { message: `URL generation for ${type} not implemented yet` },
      { status: 501 }
    )

  } catch (error) {
    console.error('Failed to generate snippet:', error)
    return NextResponse.json(
      { message: 'Unauthorized or failed to generate snippet' },
      { status: error.message.includes('token') ? 401 : 500 }
    )
  }
}