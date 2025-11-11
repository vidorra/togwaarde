/**
 * Automated Affiliate Link Management System
 * Automatically adds BolProductSection components to kennisbank articles
 */

const fs = require('fs')
const path = require('path')

// Article-to-products mapping based on our analysis
const ARTICLE_PRODUCT_MAPPING = {
  // HIGH PRIORITY ARTICLES
  'hygiene-bereiding/flessen-steriliseren': {
    products: [
      'Philips Avent sterilisator',
      'MAM elektrische sterilisator', 
      'Chicco sterilisator',
      'magnetron sterilisator',
      'sterilisatie zakjes',
      'baby fles tangen'
    ],
    title: 'Aanbevolen Sterilisatoren en Accessoires',
    priority: 'high',
    insertAfter: 'Inleiding'
  },
  
  'voedingstechnieken/fles-bereiden-stap-voor-stap': {
    products: [
      'baby fles maatbeker',
      'fles reinigingsborstel',
      'baby thermometer',
      'flessenwarmer',
      'formule dispenser',
      'baby handdoeken'
    ],
    title: 'Benodigdheden voor Fles Bereiding',
    priority: 'high',
    insertAfter: 'Wat heb je nodig'
  },
  
  'voedingstechnieken/verschillende-spenen-uitproberen': {
    products: [
      'Philips Avent speen',
      'MAM anti colic speen',
      'NUK baby speen',
      'Tommee Tippee speen',
      'Dr Browns speen',
      'baby speen variatie set'
    ],
    title: 'Verschillende Spenen om te Testen',
    priority: 'high',
    insertAfter: 'Waarom verschillende spenen proberen'
  },
  
  'soorten-flesvoeding/hypoallergene-flesvoeding': {
    products: [
      'Nutrilon HA',
      'Hero Baby HA',
      'Nutricia Pepti',
      'hypoallergene baby fles',
      'medische sterilisator',
      'allergie vrije speen'
    ],
    title: 'Hypoallergene Voeding en Producten',
    priority: 'high',
    insertAfter: 'Wanneer hypoallergene voeding'
  },
  
  // MEDIUM-HIGH PRIORITY
  'praktische-tips/flesvoeding-op-vakantie': {
    products: [
      'draagbare flessenwarmer',
      'reis sterilisator',
      'geïsoleerde baby tas',
      'koelbox baby',
      'reis formule container',
      'baby reis accessoires'
    ],
    title: 'Reis Essentials voor Flesvoeding',
    priority: 'medium-high',
    insertAfter: 'Voorbereiding is alles'
  },
  
  'problemen-oplossen/baby-drinkt-niet-genoeg': {
    products: [
      'baby weegschaal',
      'voedingstracker',
      'anti colic fles',
      'verschillende speen maten',
      'baby comfort fles',
      'voeding stimulatie speelgoed'
    ],
    title: 'Hulpmiddelen bij Voedingsproblemen',
    priority: 'medium-high',
    insertAfter: 'Mogelijke oorzaken'
  },
  
  'soorten-flesvoeding/anti-reflux-flesvoeding': {
    products: [
      'anti reflux flesvoeding',
      'Nutrilon AR',
      'Hero Baby AR',
      'anti reflux fles',
      'langzame flow speen',
      'baby positionering kussen'
    ],
    title: 'Anti-Reflux Producten',
    priority: 'medium-high',
    insertAfter: 'Wat is anti-reflux voeding'
  },
  
  // MEDIUM PRIORITY
  'voedingstechnieken/juiste-houding-bij-flesvoeding': {
    products: [
      'voeding kussen baby',
      'baby ondersteuning kussen',
      'spuugdoekjes',
      'comfortabele baby stoel'
    ],
    title: 'Producten voor Juiste Voedingshouding',
    priority: 'medium',
    insertAfter: 'De juiste houding'
  },
  
  'voedingstechnieken/juiste-temperatuur-controleren': {
    products: [
      'baby thermometer',
      'melk temperatuur tester',
      'digitale baby thermometer',
      'infrarood thermometer baby'
    ],
    title: 'Temperatuur Meet Apparatuur',
    priority: 'medium',
    insertAfter: 'Waarom is temperatuur belangrijk'
  },
  
  'soorten-flesvoeding/bio-organische-flesvoeding': {
    products: [
      'biologische baby voeding',
      'Holle bio voeding',
      'HiPP biologisch',
      'eco baby fles'
    ],
    title: 'Biologische Baby Voeding',
    priority: 'medium',
    insertAfter: 'Voordelen van biologisch'
  },
  
  'soorten-flesvoeding/lactosevrije-flesvoeding': {
    products: [
      'lactosevrije baby voeding',
      'Nutrilon lactosevrij',
      'lactose intolerantie voeding',
      'speciale baby formule'
    ],
    title: 'Lactosevrije Voeding Opties',
    priority: 'medium',
    insertAfter: 'Wanneer lactosevrij'
  },
  
  'hygiene-bereiding/water-koken-flesvoeding': {
    products: [
      'baby water koker',
      'water filter baby',
      'gekookt baby water',
      'water thermometer'
    ],
    title: 'Water Voorbereiding Producten',
    priority: 'medium',
    insertAfter: 'Water kwaliteit in Nederland'
  },
  
  'voedingstechnieken/overgang-naar-beker': {
    products: [
      'baby drinkbeker',
      'sippy cup',
      'anti-lek drinkbeker',
      '360 graden drinkbeker'
    ],
    title: 'Overgang naar Zelfstandig Drinken',
    priority: 'medium',
    insertAfter: 'Wanneer overstappen'
  }
}

class AffiliateAutomation {
  constructor() {
    this.kennisbankPath = path.join(process.cwd(), 'app', 'kennisbank')
  }

  /**
   * Generate BolProductSection component code
   */
  generateProductSection(config) {
    const productsArray = config.products.map(p => `    '${p}'`).join(',\n')
    
    return `
          {/* Affiliate Product Recommendations - Auto-generated */}
          <BolProductSection
            productNames={[
${productsArray}
            ]}
            title="${config.title}"
            variant="card"
            maxProducts={${config.products.length}}
          />`
  }

  /**
   * Check if article already has BolProductSection
   */
  hasAffiliateSection(content) {
    return content.includes('BolProductSection') || 
           content.includes('import BolProductSection')
  }

  /**
   * Add import statement if not present
   */
  addImportStatement(content, articlePath) {
    if (content.includes('import BolProductSection')) {
      return content
    }

    // Calculate the correct relative path based on directory depth
    const depth = articlePath.split('/').length
    const relativePath = '../'.repeat(depth + 2) + 'components/BolProductLink'

    // Find the last import statement
    const lines = content.split('\n')
    let lastImportIndex = -1
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIndex = i
      }
    }
    
    if (lastImportIndex !== -1) {
      lines.splice(lastImportIndex + 1, 0, 
        `import BolProductSection from '${relativePath}'`
      )
    }
    
    return lines.join('\n')
  }

  /**
   * Find insertion point in article content
   */
  findInsertionPoint(content, insertAfter) {
    const lines = content.split('\n')
    
    // Look for section headers that match insertAfter
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase()
      if (line.includes(`<h2`) && line.includes(insertAfter.toLowerCase())) {
        // Find the end of this section (next h2 or end of content)
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].includes('</section>') || 
              lines[j].includes('<section') ||
              lines[j].includes('<h2')) {
            return j
          }
        }
      }
    }
    
    // Fallback: insert before the last section
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('<section') || lines[i].includes('</div>')) {
        return i
      }
    }
    
    return lines.length - 10 // Safe fallback
  }

  /**
   * Process a single article file
   */
  async processArticle(articlePath, config) {
    try {
      const fullPath = path.join(this.kennisbankPath, articlePath, 'page.jsx')
      
      if (!fs.existsSync(fullPath)) {
        return { success: false, error: `File not found: ${fullPath}` }
      }

      let content = fs.readFileSync(fullPath, 'utf8')
      
      // Check if already has affiliate section
      if (this.hasAffiliateSection(content)) {
        return { success: false, error: 'Article already has affiliate section' }
      }

      // Add import statement
      content = this.addImportStatement(content, articlePath)

      // Generate product section
      const productSection = this.generateProductSection(config)

      // Find insertion point
      const lines = content.split('\n')
      const insertIndex = this.findInsertionPoint(content, config.insertAfter)

      // Insert the product section
      lines.splice(insertIndex, 0, productSection)

      // Write back to file
      const updatedContent = lines.join('\n')
      fs.writeFileSync(fullPath, updatedContent, 'utf8')

      return { 
        success: true, 
        message: `Added ${config.products.length} products to ${articlePath}`,
        products: config.products.length
      }

    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Process multiple articles by priority
   */
  async processByPriority(priority = 'high') {
    const results = []
    
    for (const [articlePath, config] of Object.entries(ARTICLE_PRODUCT_MAPPING)) {
      if (config.priority === priority) {
        const result = await this.processArticle(articlePath, config)
        results.push({
          article: articlePath,
          ...result
        })
      }
    }
    
    return results
  }

  /**
   * Process all articles
   */
  async processAll() {
    const results = []
    
    for (const [articlePath, config] of Object.entries(ARTICLE_PRODUCT_MAPPING)) {
      const result = await this.processArticle(articlePath, config)
      results.push({
        article: articlePath,
        priority: config.priority,
        ...result
      })
    }
    
    return results
  }

  /**
   * Get processing statistics
   */
  getStats() {
    const stats = {
      total: Object.keys(ARTICLE_PRODUCT_MAPPING).length,
      byPriority: {},
      totalProducts: 0
    }

    for (const config of Object.values(ARTICLE_PRODUCT_MAPPING)) {
      if (!stats.byPriority[config.priority]) {
        stats.byPriority[config.priority] = 0
      }
      stats.byPriority[config.priority]++
      stats.totalProducts += config.products.length
    }

    return stats
  }

  /**
   * Preview what would be added to an article
   */
  previewArticle(articlePath) {
    const config = ARTICLE_PRODUCT_MAPPING[articlePath]
    if (!config) {
      return { error: 'Article not found in mapping' }
    }

    return {
      article: articlePath,
      priority: config.priority,
      title: config.title,
      products: config.products,
      insertAfter: config.insertAfter,
      code: this.generateProductSection(config)
    }
  }
}

const affiliateAutomation = new AffiliateAutomation()
affiliateAutomation.ARTICLE_PRODUCT_MAPPING = ARTICLE_PRODUCT_MAPPING

module.exports = affiliateAutomation