import { NextResponse } from 'next/server'
import bolProductFeed from '../../../lib/bol-product-feed.js'

/**
 * GET /api/bol-feed - Get product feed status and statistics
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    switch (action) {
      case 'stats':
        const stats = bolProductFeed.getStats()
        return NextResponse.json({
          success: true,
          stats
        })

      case 'test':
        // Test credentials and connection
        try {
          const hasCredentials = bolProductFeed.hasCredentials()
          
          // Get server's public IP address
          let serverIP = 'Unknown'
          try {
            const ipResponse = await fetch('https://api.ipify.org?format=json', {
              signal: AbortSignal.timeout(5000)
            })
            const ipData = await ipResponse.json()
            serverIP = ipData.ip
          } catch (ipError) {
            console.warn('Could not determine server IP:', ipError.message)
          }
          
          const testResult = {
            hasCredentials,
            username: process.env.BOL_PRODUCT_FEED_USERNAME ? 'configured' : 'missing',
            password: process.env.BOL_PRODUCT_FEED_PASSWORD ? 'configured' : 'missing',
            feedUrl: 'https://publicfeeds.bol.com/products',
            serverIP: serverIP
          }
          
          if (hasCredentials) {
            // Try multiple diagnostic tests
            const tests = []
            
            // Test 1: DNS Resolution
            try {
              const dnsTest = await fetch('https://publicfeeds.bol.com/', {
                method: 'HEAD',
                signal: AbortSignal.timeout(5000)
              })
              tests.push({
                name: 'DNS Resolution',
                success: true,
                status: dnsTest.status,
                message: 'Can resolve publicfeeds.bol.com'
              })
            } catch (dnsError) {
              tests.push({
                name: 'DNS Resolution',
                success: false,
                error: dnsError.message,
                message: 'Cannot resolve or connect to publicfeeds.bol.com'
              })
            }
            
            // Test 2: Main Feed URL with Auth
            try {
              const auth = Buffer.from(`${process.env.BOL_PRODUCT_FEED_USERNAME}:${process.env.BOL_PRODUCT_FEED_PASSWORD}`).toString('base64')
              const testResponse = await fetch('https://publicfeeds.bol.com/products', {
                method: 'HEAD',
                headers: {
                  'Authorization': `Basic ${auth}`,
                  'User-Agent': 'FlesvoedingCalculator/1.0 (https://flesvoedingcalculator.nl)'
                },
                signal: AbortSignal.timeout(10000)
              })
              
              tests.push({
                name: 'Authenticated Request',
                success: testResponse.ok,
                status: testResponse.status,
                statusText: testResponse.statusText,
                headers: Object.fromEntries(testResponse.headers.entries()),
                message: testResponse.ok ? 'Authentication successful' : 'Authentication failed'
              })
              
            } catch (authError) {
              tests.push({
                name: 'Authenticated Request',
                success: false,
                error: authError.message,
                errorType: authError.name,
                message: 'Network or SSL error during authentication'
              })
            }
            
            // Test 3: Alternative User Agent
            try {
              const auth = Buffer.from(`${process.env.BOL_PRODUCT_FEED_USERNAME}:${process.env.BOL_PRODUCT_FEED_PASSWORD}`).toString('base64')
              const altResponse = await fetch('https://publicfeeds.bol.com/products', {
                method: 'HEAD',
                headers: {
                  'Authorization': `Basic ${auth}`,
                  'User-Agent': 'Mozilla/5.0 (compatible; ProductFeedBot/1.0)'
                },
                signal: AbortSignal.timeout(10000)
              })
              
              tests.push({
                name: 'Alternative User Agent',
                success: altResponse.ok,
                status: altResponse.status,
                message: altResponse.ok ? 'Alternative User-Agent works' : 'User-Agent not the issue'
              })
              
            } catch (altError) {
              tests.push({
                name: 'Alternative User Agent',
                success: false,
                error: altError.message,
                message: 'Same network error with different User-Agent'
              })
            }
            
            testResult.diagnosticTests = tests
            testResult.connectionTest = {
              success: tests.some(test => test.success),
              overallStatus: tests.some(test => test.success) ? 'Some tests passed' : 'All tests failed',
              recommendation: tests.some(test => test.success) 
                ? 'Network connection possible, check authentication'
                : 'Network connectivity issue - contact hosting provider'
            }
          }
          
          return NextResponse.json({
            success: true,
            test: testResult
          })
        } catch (error) {
          return NextResponse.json({
            success: false,
            error: error.message
          }, { status: 500 })
        }
        
      case 'search':
        const query = searchParams.get('query')
        const limit = parseInt(searchParams.get('limit')) || 10
        
        if (!query) {
          return NextResponse.json({
            success: false,
            error: 'Query parameter is required for search'
          }, { status: 400 })
        }
        
        const results = await bolProductFeed.searchLocalProducts(query, { limit })
        return NextResponse.json({
          success: true,
          query,
          results: results.length,
          products: results
        })
        
      default:
        return NextResponse.json({
          success: true,
          message: 'Bol.com Product Feed API',
          availableActions: ['stats', 'search'],
          examples: {
            stats: '/api/bol-feed?action=stats',
            search: '/api/bol-feed?action=search&query=nutrilon&limit=5'
          }
        })
    }
  } catch (error) {
    console.error('Product feed API error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

/**
 * POST /api/bol-feed - Update product feed (download and process)
 */
export async function POST(request) {
  try {
    const { action, productNames } = await request.json()
    
    switch (action) {
      case 'update':
        console.log('Starting product feed update...')
        const result = await bolProductFeed.updateFeed()
        
        return NextResponse.json({
          success: result.success,
          message: result.success ? 'Product feed updated successfully' : 'Feed update failed',
          error: result.error || null,
          timestamp: new Date().toISOString()
        })
      
      case 'kennisbank-products':
        // Import server-side bol-api functions
        const { getKennisbankProductLinks } = await import('../../../lib/bol-api')
        
        if (!productNames || !Array.isArray(productNames)) {
          return NextResponse.json({
            success: false,
            error: 'productNames array is required'
          }, { status: 400 })
        }
        
        try {
          const products = await getKennisbankProductLinks(productNames)
          return NextResponse.json({
            success: true,
            products
          })
        } catch (error) {
          console.error('Error fetching kennisbank products:', error)
          return NextResponse.json({
            success: false,
            error: error.message
          }, { status: 500 })
        }
        
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Use "update" to refresh the product feed or "kennisbank-products" to fetch products.'
        }, { status: 400 })
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}