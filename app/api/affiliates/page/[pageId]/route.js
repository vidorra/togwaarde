import { NextResponse } from 'next/server'
import { db } from '../../../../../lib/db/connection.js'
import { snippets, pageSnippets, pages } from '../../../../../lib/db/schema.js'
import { eq, and } from 'drizzle-orm'
import { sorteerOpTog } from '../../../../../lib/togVolgorde.js'

// Force dynamic route - prevent caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Detect website from request hostname
 * Maps domains to website identifiers
 */
function detectWebsiteFromHostname(request) {
  const host = request.headers.get('host') || 'localhost'

  // Extract domain from host (remove port if present)
  const domain = host.split(':')[0].toLowerCase()

  // Map domains to website identifiers
  if (domain.includes('togwaarde')) {
    return 'togwaarde'
  }
  // Default to flesvoedingcalculator for any other domain
  // This includes localhost, flesvoedingcalculator.nl, and any development domains
  return 'flesvoedingcalculator'
}

// GET - Get affiliate snippets for a specific page from database
export async function GET(request, { params }) {
  // Force cache clear with headers
  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }

  try {
    const { pageId } = await params
    // CRITICAL: Detect website from hostname to filter results
    const website = detectWebsiteFromHostname(request)

    // Inherit-resolutie: standaard toont een pagina de website-Default
    // (pageId 'default'). Heeft de pagina expliciet inherit_default=false, dan
    // toont hij z'n eigen toewijzingen. Ontbrekende rij => inherit (true).
    // Zo erft bv. 'reverse-slaapzakken' de aan "Standaard" gekoppelde snippets.
    let inheritDefault = true
    if (pageId !== 'default') {
      const pageRow = await db
        .select({ inheritDefault: pages.inheritDefault })
        .from(pages)
        .where(and(eq(pages.id, pageId), eq(pages.website, website)))
        .limit(1)
      if (pageRow.length > 0) {
        inheritDefault = pageRow[0].inheritDefault
      }
    }
    const effectivePageId = inheritDefault ? 'default' : pageId

    // Load from database - filtered by website
    const pageSnippetsList = await db
      .select({
        id: pageSnippets.id,
        pageId: pageSnippets.pageId,
        snippetId: pageSnippets.snippetId,
        order: pageSnippets.order,
        active: pageSnippets.active,
        createdAt: pageSnippets.createdAt,
        snippet: snippets
      })
      .from(pageSnippets)
      .leftJoin(snippets, eq(pageSnippets.snippetId, snippets.id))
      // CRITICAL: Filter by both effective pageId and website
      .where(and(eq(pageSnippets.pageId, effectivePageId), eq(pageSnippets.website, website)))
      .orderBy(pageSnippets.order)

    // Filter out orphaned references and inactive snippets, daarna op TOG:
    // wat bij het seizoen (of het vaste seizoen van de pagina) past bovenaan.
    const activeSnippets = sorteerOpTog(
      pageSnippetsList
        .filter(ps => ps.snippet && ps.snippet.active && ps.active)
        .map(ps => ps.snippet),
      pageId
    )
    
    // Convert admin format to frontend format
    const frontendSnippets = activeSnippets.map(snippet => {
      if (snippet.type === 'amazon') {
        // For Amazon products
        const html = snippet.generatedHtml || (snippet.imageHtml && snippet.bolScript ? `${snippet.imageHtml}\n${snippet.bolScript}` : snippet.imageHtml || '')
        return {
          id: snippet.id,
          name: snippet.name,
          tag: snippet.tag,
          active: snippet.active,
          price: snippet.price,
          originalPrice: snippet.originalPrice,
          currency: snippet.currency,
          priceLastUpdated: snippet.priceLastUpdated,
          type: 'amazon_image', // Convert to frontend format
          data: {
            url: extractAffiliateUrl(html) || snippet.url,
            imageUrl: snippet.imageUrl || extractImageUrl(html),
            alt: snippet.name,
            width: 300
          }
        }
      } else if (String(snippet.type || '').startsWith('bol')) {
        // Bol als eigen kaart (foto, naam, prijs, link): geen script van bol,
        // zodat elke klik via onze eigen link loopt en meegeteld wordt.
        return {
          id: snippet.id,
          name: snippet.name,
          tag: snippet.tag,
          active: snippet.active,
          price: snippet.price,
          originalPrice: snippet.originalPrice,
          currency: snippet.currency,
          priceLastUpdated: snippet.priceLastUpdated,
          type: 'bol_card',
          data: {
            title: snippet.name,
            imageUrl: snippet.imageUrl
              || extractImgSrc(snippet.imageHtml || '')
              || extractImgSrc(snippet.generatedHtml || ''),
            productUrl: bolPartnerUrl(snippet)
          }
        }
      }

      return null
    }).filter(Boolean)
    
    return NextResponse.json({
      success: true,
      snippets: frontendSnippets
    }, { headers })

  } catch (error) {
    console.error('Failed to load page affiliates:', error)
    return NextResponse.json(
      { success: false, snippets: [] },
      { status: 200, headers } // Return 200 with empty array to prevent frontend errors
    )
  }
}

// Helper function to extract affiliate URL from HTML
function extractAffiliateUrl(html) {
  const match = html.match(/href=["'](.*?)["']/i)
  return match ? match[1] : null
}

// Helper function to extract image URL from HTML  
function extractImageUrl(html) {
  const match = html.match(/src=["'](.*?)["']/i)
  return match ? match[1] : null
}

// src van de eerste <img> (niet van een <script>)
function extractImgSrc(html) {
  const match = String(html).match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

// Bol-partnerlink voor de kaart. Staat er al een partner.bol.com-link in de
// snippet, dan die. Anders bouwen we hem uit siteId + productId in het
// opgeslagen bol-script, zodat de klik altijd via het partnerprogramma loopt.
const BOL_SITE_ID = '1472968'
function bolPartnerUrl(snippet) {
  const url = snippet.url || ''
  if (url.includes('partner.bol.com')) return url

  const script = `${snippet.bolScript || ''}\n${snippet.generatedHtml || ''}`
  const siteId = script.match(/"siteId"\s*:\s*"(\d+)"/)?.[1] || BOL_SITE_ID
  const productId = script.match(/"productId"\s*:\s*"(\d+)"/)?.[1]
    || url.match(/\/p\/[^/]*\/(\d{8,})/)?.[1]
  const linkName = script.match(/"linkName"\s*:\s*"([^"]*)"/)?.[1]

  const target = /bol\.com\/nl\/[a-z]{2}\/p\//.test(url)
    ? url
    : productId ? `https://www.bol.com/nl/nl/p/-/${productId}/` : null
  if (!target) return url || '#'

  const params = new URLSearchParams({ p: '2', t: 'url', s: siteId, f: 'TXL', url: target })
  let name = snippet.name || ''
  if (linkName) { try { name = decodeURIComponent(linkName) } catch { /* rauwe naam */ } }
  if (name) params.set('name', name)
  return `https://partner.bol.com/click/click?${params.toString()}`
}