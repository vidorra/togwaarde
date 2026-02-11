#!/usr/bin/env node

// Load environment variables FIRST before any other imports
import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'
import { db, checkDatabaseConnection, closeDatabaseConnection } from '../lib/db/connection.js'
import { snippets, pageSnippets, pages } from '../lib/db/schema.js'

const DATA_DIR = path.join(process.cwd(), 'data', 'admin')
const SNIPPETS_FILE = path.join(DATA_DIR, 'snippets.json')
const PAGE_SNIPPETS_FILE = path.join(DATA_DIR, 'page-snippets.json')

// Known pages from admin-pages route
const KNOWN_PAGES = [
  { 
    id: 'hygiene-bereiding_flessen-steriliseren', 
    title: 'Flessen Steriliseren', 
    path: '/kennisbank/hygiene-bereiding/flessen-steriliseren', 
    category: 'hygiene-bereiding'
  },
  { 
    id: 'basis-flesvoeding_flesvoeding-vs-borstvoeding', 
    title: 'Flesvoeding vs Borstvoeding', 
    path: '/kennisbank/basis-flesvoeding/flesvoeding-vs-borstvoeding', 
    category: 'basis-flesvoeding'
  },
  { 
    id: 'voedingstechnieken_overstappen-van-borst-naar-fles', 
    title: 'Overstappen van Borst naar Fles', 
    path: '/kennisbank/voedingstechnieken/overstappen-van-borst-naar-fles', 
    category: 'voedingstechnieken'
  },
  { 
    id: 'basis-flesvoeding_eerste-keer-flesvoeding-geven', 
    title: 'Eerste Keer Flesvoeding Geven', 
    path: '/kennisbank/basis-flesvoeding/eerste-keer-flesvoeding-geven', 
    category: 'basis-flesvoeding'
  },
  { 
    id: 'hygiene-bereiding_juiste-temperatuur-controleren', 
    title: 'Juiste Temperatuur Controleren', 
    path: '/kennisbank/hygiene-bereiding/juiste-temperatuur-controleren', 
    category: 'hygiene-bereiding'
  },
  { 
    id: 'soorten-flesvoeding_bio-organische-flesvoeding', 
    title: 'Bio en Organische Flesvoeding', 
    path: '/kennisbank/soorten-flesvoeding/bio-organische-flesvoeding', 
    category: 'soorten-flesvoeding'
  },
  { 
    id: 'basis-flesvoeding_flesvoeding-bij-premature-babys', 
    title: 'Flesvoeding bij Premature Baby\'s', 
    path: '/kennisbank/basis-flesvoeding/flesvoeding-bij-premature-babys', 
    category: 'basis-flesvoeding'
  },
  { 
    id: 'soorten-flesvoeding_hypoallergene-flesvoeding', 
    title: 'Hypoallergene Flesvoeding', 
    path: '/kennisbank/soorten-flesvoeding/hypoallergene-flesvoeding', 
    category: 'soorten-flesvoeding'
  },
  { 
    id: 'soorten-flesvoeding_lactosevrije-flesvoeding', 
    title: 'Lactosevrije Flesvoeding', 
    path: '/kennisbank/soorten-flesvoeding/lactosevrije-flesvoeding', 
    category: 'soorten-flesvoeding'
  },
  { 
    id: 'soorten-flesvoeding_anti-reflux-flesvoeding', 
    title: 'Anti-Reflux Flesvoeding', 
    path: '/kennisbank/soorten-flesvoeding/anti-reflux-flesvoeding', 
    category: 'soorten-flesvoeding'
  },
  { 
    id: 'voedingstechnieken_overgang-naar-beker', 
    title: 'Overgang naar Beker', 
    path: '/kennisbank/voedingstechnieken/overgang-naar-beker', 
    category: 'voedingstechnieken'
  },
  { 
    id: 'voedingstechnieken_baby-leren-zelf-drinken', 
    title: 'Baby Leren Zelf Drinken', 
    path: '/kennisbank/voedingstechnieken/baby-leren-zelf-drinken', 
    category: 'voedingstechnieken'
  },
  { 
    id: 'problemen-oplossen_diarree-en-flesvoeding', 
    title: 'Diarree en Flesvoeding', 
    path: '/kennisbank/problemen-oplossen/diarree-en-flesvoeding', 
    category: 'problemen-oplossen'
  },
  { 
    id: 'problemen-oplossen_allergische-reacties-flesvoeding', 
    title: 'Allergische Reacties Flesvoeding', 
    path: '/kennisbank/problemen-oplossen/allergische-reacties-flesvoeding', 
    category: 'problemen-oplossen'
  },
  { 
    id: 'hygiene-bereiding_flesvoeding-bewaren', 
    title: 'Flesvoeding Bewaren', 
    path: '/kennisbank/hygiene-bereiding/flesvoeding-bewaren', 
    category: 'hygiene-bereiding'
  },
  { 
    id: 'praktische-tips_geld-besparen-flesvoeding', 
    title: 'Geld Besparen Flesvoeding', 
    path: '/kennisbank/praktische-tips/geld-besparen-flesvoeding', 
    category: 'praktische-tips'
  },
  { 
    id: 'hygiene-bereiding_veilig-verwarmen-flesvoeding', 
    title: 'Veilig Verwarmen Flesvoeding', 
    path: '/kennisbank/hygiene-bereiding/veilig-verwarmen-flesvoeding', 
    category: 'hygiene-bereiding'
  },
  { 
    id: 'praktische-tips_flesvoeding-op-vakantie', 
    title: 'Flesvoeding op Vakantie', 
    path: '/kennisbank/praktische-tips/flesvoeding-op-vakantie', 
    category: 'praktische-tips'
  },
  { 
    id: 'praktische-tips_flesvoeding-en-slapen', 
    title: 'Flesvoeding en Slapen', 
    path: '/kennisbank/praktische-tips/flesvoeding-en-slapen', 
    category: 'praktische-tips'
  }
]

async function migrateData() {
  console.log('🔄 Starting data migration from JSON to PostgreSQL...')
  
  try {
    // Check database connection
    const isConnected = await checkDatabaseConnection()
    if (!isConnected) {
      process.exit(1)
    }

    // 1. Migrate pages data
    console.log('📄 Migrating pages...')
    await db.insert(pages).values(KNOWN_PAGES).onConflictDoNothing()
    console.log(`✅ Migrated ${KNOWN_PAGES.length} pages`)

    // 2. Migrate snippets data
    if (fs.existsSync(SNIPPETS_FILE)) {
      console.log('🔗 Migrating snippets...')
      const snippetsData = JSON.parse(fs.readFileSync(SNIPPETS_FILE, 'utf8'))
      
      const snippetsToInsert = snippetsData.map(snippet => ({
        id: snippet.id,
        name: snippet.name,
        type: snippet.type,
        url: snippet.url || snippet.fallbackUrl || '',
        tag: snippet.tag || null,
        // Handle both old and new snippet formats
        generatedHtml: snippet.generatedHtml ||
                      (snippet.imageHtml && snippet.bolScript ?
                        `${snippet.imageHtml}\n${snippet.bolScript}` :
                        snippet.imageHtml || snippet.bolScript || null),
        imageHtml: snippet.imageHtml || null,
        bolScript: snippet.bolScript || null,
        imageUrl: snippet.imageUrl || snippet.extractedImageUrl || null,
        price: null, // Not tracked in JSON files
        originalPrice: null, // Not tracked in JSON files
        currency: 'EUR',
        priceLastUpdated: null,
        active: snippet.active ?? true,
        createdAt: new Date(snippet.createdAt),
        updatedAt: new Date(snippet.updatedAt)
      }))

      await db.insert(snippets).values(snippetsToInsert).onConflictDoNothing()
      console.log(`✅ Migrated ${snippetsToInsert.length} snippets`)
    }

    // 3. Migrate page-snippets relationships
    if (fs.existsSync(PAGE_SNIPPETS_FILE)) {
      console.log('🔗 Migrating page-snippet relationships...')
      const pageSnippetsData = JSON.parse(fs.readFileSync(PAGE_SNIPPETS_FILE, 'utf8'))
      
      const relationshipsToInsert = []
      for (const [pageId, assignments] of Object.entries(pageSnippetsData)) {
        for (const assignment of assignments) {
          relationshipsToInsert.push({
            id: assignment.id,
            pageId: assignment.pageId,
            snippetId: assignment.snippetId,
            order: assignment.order,
            active: assignment.active ?? true,
            createdAt: new Date(assignment.createdAt)
          })
        }
      }

      if (relationshipsToInsert.length > 0) {
        await db.insert(pageSnippets).values(relationshipsToInsert).onConflictDoNothing()
        console.log(`✅ Migrated ${relationshipsToInsert.length} page-snippet relationships`)
      }
    }

    console.log('🎉 Data migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Data migration failed:', error.message)
    process.exit(1)
  } finally {
    await closeDatabaseConnection()
  }
}

migrateData()