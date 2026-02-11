import { NextResponse } from 'next/server'
const affiliateAutomation = require('../../../lib/affiliate-automation.js')

/**
 * GET /api/affiliate-automation - Get automation status and preview
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const article = searchParams.get('article')
    const priority = searchParams.get('priority')
    
    switch (action) {
      case 'stats':
        const stats = affiliateAutomation.getStats()
        return NextResponse.json({
          success: true,
          stats
        })
        
      case 'preview':
        if (!article) {
          return NextResponse.json({
            success: false,
            error: 'Article parameter required for preview'
          }, { status: 400 })
        }
        
        const preview = affiliateAutomation.previewArticle(article)
        return NextResponse.json({
          success: true,
          preview
        })
        
      case 'list':
        // List all articles that can be processed
        const allMappings = Object.entries(require('../../../lib/affiliate-automation.js').ARTICLE_PRODUCT_MAPPING || {})
        const articles = allMappings.map(([path, config]) => ({
          path,
          title: config.title,
          priority: config.priority,
          productCount: config.products.length,
          insertAfter: config.insertAfter
        }))
        
        const filtered = priority ? 
          articles.filter(a => a.priority === priority) : 
          articles
          
        return NextResponse.json({
          success: true,
          articles: filtered,
          total: articles.length,
          filtered: filtered.length
        })
        
      default:
        return NextResponse.json({
          success: true,
          message: 'Affiliate Automation API',
          availableActions: ['stats', 'preview', 'list', 'process'],
          examples: {
            stats: '/api/affiliate-automation?action=stats',
            preview: '/api/affiliate-automation?action=preview&article=flessen-steriliseren',
            list: '/api/affiliate-automation?action=list&priority=high'
          }
        })
    }
  } catch (error) {
    console.error('Affiliate automation API error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

/**
 * POST /api/affiliate-automation - Process articles with affiliate links
 */
export async function POST(request) {
  try {
    const { action, articles, priority } = await request.json()
    
    switch (action) {
      case 'process-single':
        if (!articles || !articles.length) {
          return NextResponse.json({
            success: false,
            error: 'Articles array required'
          }, { status: 400 })
        }
        
        const results = []
        for (const articlePath of articles) {
          const config = require('../../../lib/affiliate-automation.js').ARTICLE_PRODUCT_MAPPING[articlePath]
          if (config) {
            const result = await affiliateAutomation.processArticle(articlePath, config)
            results.push({
              article: articlePath,
              ...result
            })
          }
        }
        
        return NextResponse.json({
          success: true,
          message: `Processed ${results.length} articles`,
          results,
          summary: {
            total: results.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length
          }
        })
        
      case 'process-priority':
        if (!priority) {
          return NextResponse.json({
            success: false,
            error: 'Priority parameter required (high, medium-high, medium)'
          }, { status: 400 })
        }
        
        console.log(`Starting bulk processing for priority: ${priority}`)
        const priorityResults = await affiliateAutomation.processByPriority(priority)
        
        return NextResponse.json({
          success: true,
          message: `Processed ${priorityResults.length} ${priority} priority articles`,
          results: priorityResults,
          summary: {
            total: priorityResults.length,
            successful: priorityResults.filter(r => r.success).length,
            failed: priorityResults.filter(r => !r.success).length,
            totalProducts: priorityResults
              .filter(r => r.success)
              .reduce((sum, r) => sum + (r.products || 0), 0)
          }
        })
        
      case 'process-all':
        console.log('Starting full automation processing...')
        const allResults = await affiliateAutomation.processAll()
        
        return NextResponse.json({
          success: true,
          message: `Processed all ${allResults.length} articles`,
          results: allResults,
          summary: {
            total: allResults.length,
            successful: allResults.filter(r => r.success).length,
            failed: allResults.filter(r => !r.success).length,
            totalProducts: allResults
              .filter(r => r.success)
              .reduce((sum, r) => sum + (r.products || 0), 0),
            byPriority: allResults.reduce((acc, r) => {
              if (!acc[r.priority]) acc[r.priority] = { total: 0, successful: 0 }
              acc[r.priority].total++
              if (r.success) acc[r.priority].successful++
              return acc
            }, {})
          }
        })
        
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Use: process-single, process-priority, or process-all'
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Affiliate automation processing error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}