/**
 * Migration script to populate admin system with existing affiliate data
 * Run with: node scripts/migrate-affiliate-data.js
 */

import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data', 'admin')
const SNIPPETS_FILE = path.join(DATA_DIR, 'snippets.json')
const PAGE_SNIPPETS_FILE = path.join(DATA_DIR, 'page-snippets.json')

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// Existing static affiliate data
const staticAffiliateData = {
  sterilisatoren: [
    {
      id: 'philips-avent-sterilisator',
      name: 'Philips Avent Flessterilisator',
      tag: 'Aanbevolen',
      type: 'bol_iframe',
      data: {
        iframeUrl: 'https://partner.bol.com/click/click?p=2&t=iframe&s=1472968&f=TXL&url=https%3A//www.bol.com/nl/nl/p/philips-avent-flessterilisator-damp-droger-9300000062682298/&name=Philips%20Avent%20Flessterilisator',
        productUrl: "https://www.bol.com/nl/nl/p/philips-avent-flessterilisator-damp-droger/9300000062682298/",
        productId: "9300000062682298",
        title: "Philips Avent Flessterilisator Damp & Droger",
        fallbackImage: "https://media.s-bol.com/NKX9XZWN3RGL/0RNmv15/550x707.jpg"
      }
    },
    {
      id: 'mam-sterilisator',
      name: 'MAM Sterilisator',
      tag: 'Beste prijs/kwaliteit',
      type: 'bol_iframe',
      data: {
        iframeUrl: 'https://partner.bol.com/click/click?p=2&t=iframe&s=1472968&f=TXL&url=https%3A//www.bol.com/nl/nl/p/mam-sterilisator-grijs-bpa-vrij-9300000050911914/&name=MAM%20Sterilisator',
        productUrl: "https://www.bol.com/nl/nl/p/mam-sterilisator-grijs-bpa-vrij/9300000050911914/",
        productId: "9300000050911914",
        title: "MAM Sterilisator Grijs BPA-vrij",
        fallbackImage: "https://media.s-bol.com/N7353O6nX5Bm/pgx9EzV/550x698.jpg"
      }
    },
    {
      id: 'chicco-sterilisator',
      name: 'Chicco 3-in-1 Sterilisator',
      tag: null,
      type: 'bol_iframe',
      data: {
        iframeUrl: 'https://partner.bol.com/click/click?p=2&t=iframe&s=1472968&f=TXL&url=https%3A//www.bol.com/nl/nl/p/chicco-3-in-1-sterilisator-sterilnatural-9300000013318604/&name=Chicco%20Sterilisator',
        productUrl: "https://www.bol.com/nl/nl/p/chicco-3-in-1-sterilisator-sterilnatural/9300000013318604/",
        productId: "9300000013318604",
        title: "Chicco 3 In 1 Sterilisator Sterilnatural",
        fallbackImage: "https://media.s-bol.com/g4ZkAnyvBWwG/BgPjL0N/550x645.jpg"
      }
    },
    {
      id: 'lifejxwen-sterilizer',
      name: 'LIFEJXWEN 5-in-1 Electric Sterilizer',
      tag: 'Budget',
      type: 'amazon_image',
      data: {
        url: "https://www.amazon.nl/-/en/dp/B0FN47MMXK?tag=flesvoedingca-21",
        imageUrl: "https://m.media-amazon.com/images/I/517904cDV3L._AC_SL1500_.jpg",
        alt: "LIFEJXWEN 5-in-1 Electric Sterilizer for Baby Bottles, Sterilizing, Drying, Auto-Sterilizing & Drying, Warming Food, Keeping Bottles Warm, Capacity 8 Bottles, 24 Hours Germination Protection",
        width: 300
      }
    }
  ]
}

// Generate HTML snippets for admin system
function generateHtmlSnippet(product) {
  if (product.type === 'bol_iframe') {
    return `<div style="text-align: center"><a href="${product.data.productUrl}" target="_blank" rel="nofollow"><img src="${product.data.fallbackImage}" alt="${product.data.title}" width="300" height="auto" style="border-radius: 8px;"></a><br><strong>${product.data.title}</strong></div>`
  } else if (product.type === 'amazon_image') {
    return `<div style="text-align: center"><a href="${product.data.url}" target="_blank" rel="nofollow" align="center"><img src="${product.data.imageUrl}" class="cg-img-1" alt="${product.data.alt}" width="${product.data.width}" height="auto"></a></div>`
  }
  return ''
}

// Migrate data
function migrateData() {
  console.log('🔄 Starting affiliate data migration...')
  
  ensureDataDir()
  
  // Convert static data to admin format
  const adminSnippets = []
  let snippetId = 1
  
  for (const [category, products] of Object.entries(staticAffiliateData)) {
    for (const product of products) {
      const adminSnippet = {
        id: product.id,
        name: product.name,
        type: product.type === 'bol_iframe' ? 'bol' : 'amazon',
        url: product.type === 'bol_iframe' ? product.data.productUrl : product.data.url,
        tag: product.tag,
        generatedHtml: generateHtmlSnippet(product),
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      adminSnippets.push(adminSnippet)
      snippetId++
    }
  }
  
  // Save snippets
  fs.writeFileSync(SNIPPETS_FILE, JSON.stringify(adminSnippets, null, 2))
  console.log(`✅ Created ${adminSnippets.length} snippets in admin system`)
  
  // Create page assignments
  const pageSnippets = {
    'hygiene-bereiding_flessen-steriliseren': adminSnippets.map((snippet, index) => ({
      id: `ps_${Date.now()}_${index}`,
      pageId: 'hygiene-bereiding_flessen-steriliseren',
      snippetId: snippet.id,
      order: index,
      active: true,
      createdAt: new Date().toISOString()
    }))
  }
  
  // Save page assignments
  fs.writeFileSync(PAGE_SNIPPETS_FILE, JSON.stringify(pageSnippets, null, 2))
  console.log(`✅ Created page assignments for flessen-steriliseren page`)
  
  console.log('🎉 Migration completed successfully!')
  console.log('You can now manage these affiliates in the admin panel at /admin')
}

// Run migration
migrateData()