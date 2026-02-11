/**
 * Bol.com Product Feed API Integration
 * Downloads and processes the complete Bol.com product catalog for better product matching
 * Documentation: https://api.bol.com/marketing/docs/product-feed/download-product-feed.html
 */

// Server-side imports - only available in Node.js environment
const fs = require('fs')
const path = require('path')
const { pipeline } = require('stream/promises')
const csv = require('csv-parser')
const { createGunzip } = require('zlib')

class BolProductFeed {
  constructor() {
    this.username = process.env.BOL_PRODUCT_FEED_USERNAME
    this.password = process.env.BOL_PRODUCT_FEED_PASSWORD
    this.feedUrl = 'https://publicfeeds.bol.com/products'
    this.cacheDir = path.join(process.cwd(), 'cache', 'bol-products')
    this.feedFile = path.join(this.cacheDir, 'products.csv.gz')
    this.processedFile = path.join(this.cacheDir, 'products-processed.json')
    this.lastUpdateFile = path.join(this.cacheDir, 'last-update.json')
    
    // Categories relevant to baby feeding
    this.relevantCategories = [
      'Baby & Peuter',
      'Babyvoeding',
      'Flesvoeding', 
      'Borstvoeding',
      'Baby verzorging',
      'Baby accessoires',
      'Spenen & Flessen',
      'Sterilisatoren',
      'Voedingssets'
    ]
    
    this.ensureCacheDir()
  }

  /**
   * Ensure cache directory exists
   */
  ensureCacheDir() {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true })
    }
  }

  /**
   * Check if credentials are configured
   */
  hasCredentials() {
    return !!(this.username && this.password)
  }

  /**
   * Check if product feed needs updating (daily refresh)
   */
  needsUpdate() {
    try {
      if (!fs.existsSync(this.lastUpdateFile)) {
        return true
      }
      
      const lastUpdate = JSON.parse(fs.readFileSync(this.lastUpdateFile, 'utf8'))
      const daysSinceUpdate = (Date.now() - lastUpdate.timestamp) / (1000 * 60 * 60 * 24)
      
      return daysSinceUpdate >= 1 // Update daily
    } catch (error) {
      console.error('Error checking update status:', error)
      return true
    }
  }

  /**
   * Download the product feed from Bol.com
   */
  async downloadFeed() {
    if (!this.hasCredentials()) {
      const errorMsg = 'Bol.com Product Feed credentials not configured. Set BOL_PRODUCT_FEED_USERNAME and BOL_PRODUCT_FEED_PASSWORD environment variables.'
      console.error('Credentials check failed:', {
        hasUsername: !!this.username,
        hasPassword: !!this.password,
        usernameLength: this.username ? this.username.length : 0
      })
      throw new Error(errorMsg)
    }

    try {
      console.log('Starting Bol.com product feed download...')
      console.log('Feed URL:', this.feedUrl)
      console.log('Cache directory:', this.cacheDir)
      console.log('Credentials configured:', this.hasCredentials())
      
      const auth = Buffer.from(`${this.username}:${this.password}`).toString('base64')
      
      console.log('Making request to Bol.com feed...')
      const response = await fetch(this.feedUrl, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'User-Agent': 'FlesvoedingCalculator/1.0 (https://flesvoedingcalculator.nl)',
          'Accept': 'application/gzip, */*',
          'Accept-Encoding': 'gzip, deflate'
        },
        // Add timeout and signal for better error handling
        signal: AbortSignal.timeout(300000) // 5 minute timeout
      })

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unable to read error response')
        console.error('Feed download HTTP error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText.substring(0, 500)
        })
        throw new Error(`Product feed download failed: ${response.status} - ${response.statusText}. Body: ${errorText.substring(0, 200)}`)
      }

      const contentLength = response.headers.get('content-length')
      console.log('Starting file download, size:', contentLength ? `${Math.round(contentLength / 1024 / 1024)}MB` : 'unknown')

      // Ensure directory exists
      this.ensureCacheDir()

      // Save the compressed feed file
      const fileStream = fs.createWriteStream(this.feedFile)
      await pipeline(response.body, fileStream)
      
      // Check file was created and has content
      const stats = fs.statSync(this.feedFile)
      console.log('Product feed downloaded successfully:', {
        filePath: this.feedFile,
        fileSize: `${Math.round(stats.size / 1024 / 1024)}MB`,
        created: stats.birthtime
      })
      
      // Update timestamp
      const updateData = {
        timestamp: Date.now(),
        downloadDate: new Date().toISOString(),
        fileSize: stats.size,
        success: true
      }
      fs.writeFileSync(this.lastUpdateFile, JSON.stringify(updateData, null, 2))
      
      return true
    } catch (error) {
      console.error('Product feed download error details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        cause: error.cause,
        stack: error.stack?.split('\n').slice(0, 5)
      })
      
      // Save error info
      try {
        const errorData = {
          timestamp: Date.now(),
          downloadDate: new Date().toISOString(),
          error: error.message,
          errorType: error.name,
          success: false
        }
        fs.writeFileSync(this.lastUpdateFile, JSON.stringify(errorData, null, 2))
      } catch (writeError) {
        console.error('Failed to write error log:', writeError.message)
      }
      
      throw error
    }
  }

  /**
   * Process and filter the product feed for baby-related products
   */
  async processFeed() {
    if (!fs.existsSync(this.feedFile)) {
      throw new Error('Product feed file not found. Download feed first.')
    }

    try {
      console.log('Processing Bol.com product feed...')
      
      const products = []
      const babyProducts = []
      
      // Create readable stream with gzip decompression
      const feedStream = fs.createReadStream(this.feedFile)
        .pipe(createGunzip())
        .pipe(csv({
          separator: '\t', // Tab-separated values
          headers: [
            'id',
            'title',
            'subtitle',
            'description',
            'brand',
            'category',
            'subcategory',
            'price',
            'list_price',
            'availability',
            'condition',
            'rating',
            'reviews_count',
            'image_url',
            'product_url',
            'ean',
            'model',
            'color',
            'material',
            'size',
            'weight',
            'dimensions',
            'age_recommendation',
            'gender_target',
            'delivery_period',
            'delivery_costs',
            'stock_level'
          ]
        }))

      // Process each product
      feedStream.on('data', (row) => {
        try {
          // Filter for baby/feeding related products
          const category = (row.category || '').toLowerCase()
          const subcategory = (row.subcategory || '').toLowerCase()
          const title = (row.title || '').toLowerCase()
          
          const isBabyRelated = this.relevantCategories.some(cat => 
            category.includes(cat.toLowerCase()) || 
            subcategory.includes(cat.toLowerCase()) ||
            title.includes('baby') ||
            title.includes('fles') ||
            title.includes('voeding') ||
            title.includes('melk') ||
            title.includes('zuigeling') ||
            title.includes('peuter') ||
            title.includes('speen') ||
            title.includes('sterilisator')
          )

          if (isBabyRelated) {
            const processedProduct = {
              id: row.id,
              title: row.title,
              subtitle: row.subtitle,
              description: row.description?.substring(0, 500), // Limit description length
              brand: row.brand,
              category: row.category,
              subcategory: row.subcategory,
              price: parseFloat(row.price) || null,
              listPrice: parseFloat(row.list_price) || null,
              rating: parseFloat(row.rating) || null,
              reviewsCount: parseInt(row.reviews_count) || 0,
              imageUrl: row.image_url,
              availability: row.availability,
              condition: row.condition,
              ageRecommendation: row.age_recommendation,
              deliveryPeriod: row.delivery_period,
              // Create search keywords for better matching
              searchKeywords: this.createSearchKeywords(row),
              // Calculate relevance score for baby feeding
              relevanceScore: this.calculateRelevanceScore(row)
            }
            
            babyProducts.push(processedProduct)
          }
        } catch (error) {
          console.error('Error processing product row:', error)
        }
      })

      // Wait for processing to complete
      await new Promise((resolve, reject) => {
        feedStream.on('end', resolve)
        feedStream.on('error', reject)
      })

      // Sort by relevance score
      babyProducts.sort((a, b) => b.relevanceScore - a.relevanceScore)
      
      // Save processed products
      fs.writeFileSync(this.processedFile, JSON.stringify({
        products: babyProducts,
        processedAt: new Date().toISOString(),
        totalProducts: babyProducts.length
      }, null, 2))
      
      console.log(`Processed ${babyProducts.length} baby-related products`)
      return babyProducts
      
    } catch (error) {
      console.error('Product feed processing error:', error)
      throw error
    }
  }

  /**
   * Create search keywords for better product matching
   */
  createSearchKeywords(product) {
    const keywords = []
    
    // Add title words
    if (product.title) {
      keywords.push(...product.title.toLowerCase().split(/\s+/))
    }
    
    // Add brand
    if (product.brand) {
      keywords.push(product.brand.toLowerCase())
    }
    
    // Add category terms
    if (product.category) {
      keywords.push(...product.category.toLowerCase().split(/\s+/))
    }
    
    if (product.subcategory) {
      keywords.push(...product.subcategory.toLowerCase().split(/\s+/))
    }
    
    // Remove duplicates and short words
    return [...new Set(keywords)]
      .filter(keyword => keyword.length > 2)
      .slice(0, 20) // Limit to 20 keywords
  }

  /**
   * Calculate relevance score for baby feeding products
   */
  calculateRelevanceScore(product) {
    let score = 0
    const title = (product.title || '').toLowerCase()
    const category = (product.category || '').toLowerCase()
    
    // High priority terms
    const highPriorityTerms = [
      'flesvoeding', 'startvoeding', 'opvolgmelk', 'nutrilon', 'aptamil',
      'babyfles', 'anti-colic', 'sterilisator', 'flessenwarmer'
    ]
    
    // Medium priority terms  
    const mediumPriorityTerms = [
      'baby', 'zuigeling', 'speen', 'voeding', 'melk', 'fles'
    ]
    
    // Score based on title matches
    highPriorityTerms.forEach(term => {
      if (title.includes(term)) score += 10
    })
    
    mediumPriorityTerms.forEach(term => {
      if (title.includes(term)) score += 5
    })
    
    // Score based on category
    if (category.includes('baby')) score += 8
    if (category.includes('voeding')) score += 6
    
    // Rating boost
    const rating = parseFloat(product.rating) || 0
    if (rating > 4.0) score += 3
    else if (rating > 3.5) score += 1
    
    // Review count boost
    const reviewCount = parseInt(product.reviews_count) || 0
    if (reviewCount > 100) score += 2
    else if (reviewCount > 50) score += 1
    
    return score
  }

  /**
   * Search products in the local feed cache
   */
  async searchLocalProducts(query, options = {}) {
    const { limit = 10, minRelevanceScore = 5, category = null } = options
    
    try {
      if (!fs.existsSync(this.processedFile)) {
        console.warn('No processed product feed found. Download and process feed first.')
        return []
      }
      
      const feedData = JSON.parse(fs.readFileSync(this.processedFile, 'utf8'))
      const products = feedData.products || []
      
      const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2)
      
      const matches = products.filter(product => {
        // Relevance score filter
        if (product.relevanceScore < minRelevanceScore) return false
        
        // Category filter
        if (category && !product.category.toLowerCase().includes(category.toLowerCase())) {
          return false
        }
        
        // Search term matching
        return searchTerms.some(term => 
          product.searchKeywords.some(keyword => keyword.includes(term)) ||
          product.title.toLowerCase().includes(term)
        )
      })
      
      // Score matches based on search relevance
      const scoredMatches = matches.map(product => {
        let searchScore = 0
        
        searchTerms.forEach(term => {
          if (product.title.toLowerCase().includes(term)) searchScore += 3
          if (product.brand?.toLowerCase().includes(term)) searchScore += 2
          if (product.searchKeywords.some(keyword => keyword.includes(term))) searchScore += 1
        })
        
        return {
          ...product,
          searchScore: searchScore + product.relevanceScore
        }
      })
      
      // Sort by combined score and return limited results
      return scoredMatches
        .sort((a, b) => b.searchScore - a.searchScore)
        .slice(0, limit)
        
    } catch (error) {
      console.error('Local product search error:', error)
      return []
    }
  }

  /**
   * Get product statistics
   */
  getStats() {
    try {
      if (!fs.existsSync(this.processedFile)) {
        return { error: 'No processed feed found' }
      }
      
      const feedData = JSON.parse(fs.readFileSync(this.processedFile, 'utf8'))
      const lastUpdate = fs.existsSync(this.lastUpdateFile) 
        ? JSON.parse(fs.readFileSync(this.lastUpdateFile, 'utf8'))
        : null
      
      return {
        totalProducts: feedData.totalProducts || 0,
        processedAt: feedData.processedAt,
        lastDownload: lastUpdate?.downloadDate,
        cacheSize: this.getCacheSize(),
        needsUpdate: this.needsUpdate()
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  /**
   * Get cache directory size
   */
  getCacheSize() {
    try {
      const files = fs.readdirSync(this.cacheDir)
      let totalSize = 0
      
      files.forEach(file => {
        const filePath = path.join(this.cacheDir, file)
        const stats = fs.statSync(filePath)
        totalSize += stats.size
      })
      
      return `${(totalSize / 1024 / 1024).toFixed(2)} MB`
    } catch (error) {
      return 'Unknown'
    }
  }

  /**
   * Update product feed (download and process)
   */
  async updateFeed() {
    try {
      await this.downloadFeed()
      await this.processFeed()
      return { success: true, message: 'Product feed updated successfully' }
    } catch (error) {
      console.error('Feed update error:', error)
      return { success: false, error: error.message }
    }
  }
}

// Export singleton instance - SERVER SIDE ONLY
const bolProductFeed = new BolProductFeed()
export default bolProductFeed