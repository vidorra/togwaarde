#!/usr/bin/env node

/**
 * Test script to scrape Bol.com product images
 * Usage: node scripts/test-bol-scraper.js
 */

const testUrl = 'https://www.bol.com/nl/nl/p/3-in-1-sterilisator-sterilnatural/9300000013318604/'

async function scrapeBolImage(url) {
  console.log('🔍 Testing Bol.com image scraper')
  console.log('📍 Target URL:', url)
  console.log('')

  try {
    console.log('⏳ Fetching page...')
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    })

    console.log('📊 Response status:', response.status)
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()))
    console.log('')

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const html = await response.text()
    console.log('✅ Page fetched successfully')
    console.log('📏 HTML length:', html.length, 'characters')
    console.log('')

    // Look for the image-zoom-modal__zoom-modal-img class
    console.log('🔍 Searching for image-zoom-modal__zoom-modal-img class...')
    const modalImageRegex = /<img[^>]*class="[^"]*image-zoom-modal__zoom-modal-img[^"]*"[^>]*>/gi
    const modalMatches = html.match(modalImageRegex)

    if (modalMatches) {
      console.log('✅ Found', modalMatches.length, 'image(s) with image-zoom-modal__zoom-modal-img class')

      modalMatches.forEach((match, index) => {
        console.log(`\n🖼️  Image ${index + 1}:`)
        console.log('   Full tag:', match.substring(0, 200) + '...')

        // Extract src
        const srcMatch = match.match(/src="([^"]+)"/)
        if (srcMatch) {
          console.log('   ✅ src:', srcMatch[1])
        }

        // Extract data-src
        const dataSrcMatch = match.match(/data-src="([^"]+)"/)
        if (dataSrcMatch) {
          console.log('   ✅ data-src:', dataSrcMatch[1])
        }

        // Extract srcset
        const srcsetMatch = match.match(/srcset="([^"]+)"/)
        if (srcsetMatch) {
          console.log('   ✅ srcset:', srcsetMatch[1])
        }
      })
    } else {
      console.log('❌ No images found with image-zoom-modal__zoom-modal-img class')
    }

    console.log('\n🔍 Searching for any media.s-bol.com images...')
    const allImageRegex = /https:\/\/media\.s-bol\.com\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/\d+x\d+\.jpg/g
    const allImages = [...new Set(html.match(allImageRegex) || [])]

    if (allImages.length > 0) {
      console.log('✅ Found', allImages.length, 'unique image URL(s):')
      allImages.forEach((img, index) => {
        console.log(`   ${index + 1}. ${img}`)
      })
    } else {
      console.log('❌ No media.s-bol.com images found')
    }

    console.log('\n🔍 Searching for structured data (JSON-LD)...')
    const jsonLdRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs
    const jsonLdMatches = html.match(jsonLdRegex)

    if (jsonLdMatches) {
      console.log('✅ Found', jsonLdMatches.length, 'JSON-LD block(s)')
      jsonLdMatches.forEach((match, index) => {
        try {
          const jsonContent = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '')
          const data = JSON.parse(jsonContent)

          if (data.image) {
            console.log(`   JSON-LD ${index + 1} - image:`, data.image)
          }
        } catch (e) {
          // Skip invalid JSON
        }
      })
    }

    console.log('\n🔍 Searching for product image in meta tags...')
    const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/)
    if (ogImageMatch) {
      console.log('✅ og:image:', ogImageMatch[1])
    }

    const twitterImageMatch = html.match(/<meta name="twitter:image" content="([^"]+)"/)
    if (twitterImageMatch) {
      console.log('✅ twitter:image:', twitterImageMatch[1])
    }

    console.log('\n' + '='.repeat(80))
    console.log('🎯 EXPECTED RESULT: https://media.s-bol.com/g4ZkAnyvBWwG/BgPjL0N/550x645.jpg')
    console.log('='.repeat(80))

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error('Stack:', error.stack)
  }
}

// Run the test
scrapeBolImage(testUrl)
