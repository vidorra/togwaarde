import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Force dynamic route
export const dynamic = 'force-dynamic'

const DATA_DIR = path.join(process.cwd(), 'data', 'admin')
const PAGE_SNIPPETS_FILE = path.join(DATA_DIR, 'page-snippets.json')

// Simple session check
function isAuthenticated(request) {
  return true // Simplified for now
}

// Load page snippets to calculate real snippet counts
function loadPageSnippets() {
  if (!fs.existsSync(PAGE_SNIPPETS_FILE)) {
    return {}
  }
  
  try {
    const data = fs.readFileSync(PAGE_SNIPPETS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading page snippets file:', error)
    return {}
  }
}

// Production-safe pages list with dynamic snippet counts
function getKnownPages() {
  const pageSnippets = loadPageSnippets()
  
  // Static list of kennisbank pages 
  const basePages = [
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
    // New pages with affiliate widgets
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
  
  // Add dynamic snippet counts based on actual data
  return basePages.map(page => ({
    ...page,
    snippetCount: pageSnippets[page.id]?.length || 0
  }))
}

// GET - List all kennisbank pages
export async function GET(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const pages = getKnownPages()
    
    return NextResponse.json({
      success: true,
      pages
    })

  } catch (error) {
    console.error('Failed to load pages:', error)
    return NextResponse.json(
      { message: 'Failed to load pages', error: error.message },
      { status: 500 }
    )
  }
}