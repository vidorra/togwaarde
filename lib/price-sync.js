import { eq } from 'drizzle-orm'
import { db } from './db/connection.js'
import { snippets } from './db/schema.js'
import { fetchPrice } from './price-fetcher.js'

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

// Markers op bol.com-pagina's van verwijderde/uitverkochte producten
const UNAVAILABLE_MARKERS = /niet (meer )?(leverbaar|beschikbaar)|artikel bestaat niet|pagina niet gevonden|niet gevonden/i

/**
 * Controleert of een bol.com-product nog bestaat. Bol haalt regelmatig
 * producten offline; een kaart naar een 404 kost vertrouwen en kliks.
 * Alleen voor bol.com-urls (Amazon blokkeert dit soort checks agressief).
 *
 * @returns {Promise<{available: boolean, reason?: string}>}
 */
async function checkBolAvailability(url) {
  if (!/bol\.com/i.test(url)) {
    return { available: true }
  }
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': BROWSER_UA, 'Accept-Language': 'nl-NL,nl' },
      redirect: 'follow'
    })
    if (res.status === 404 || res.status === 410) {
      return { available: false, reason: `HTTP ${res.status}` }
    }
    if (!res.ok) {
      // 403/429/5xx: bol weert ons of heeft storing; NIET deactiveren
      return { available: true, reason: `onbepaald (HTTP ${res.status})` }
    }
    const html = await res.text()
    if (UNAVAILABLE_MARKERS.test(html)) {
      return { available: false, reason: 'pagina meldt niet leverbaar' }
    }
    return { available: true }
  } catch {
    // Netwerkfout: niet deactiveren op basis van één mislukte poging
    return { available: true, reason: 'check mislukt' }
  }
}

/**
 * Database-based prijssync voor affiliate-snippets.
 *
 * Voor alle actieve snippets van één website:
 * 1. check of het bol.com-product nog bestaat; zo niet -> snippet wordt
 *    automatisch op inactief gezet (verdwijnt van de site) en gerapporteerd
 * 2. haal de actuele prijs op (server-side) en schrijf die terug in de
 *    database, inclusief priceLastUpdated
 *
 * Zo tonen de productkaarten altijd een verse prijs zonder third-party
 * scripts op de bezoeker (zie cookieless-analytics-plan.md).
 * Wordt gebruikt door /api/cron/sync-prices (nachtelijke GitHub Action).
 */
export async function syncPricesForWebsite(website) {
  const rows = await db
    .select()
    .from(snippets)
    .where(eq(snippets.website, website))

  const active = rows.filter((s) => s.active && s.url)

  let successCount = 0
  let errorCount = 0
  const deactivated = []
  const errors = []

  for (let i = 0; i < active.length; i++) {
    const snippet = active[i]
    try {
      // Stap 1: bestaat het product nog?
      const availability = await checkBolAvailability(snippet.url)
      if (!availability.available) {
        await db
          .update(snippets)
          .set({ active: false, updatedAt: new Date() })
          .where(eq(snippets.id, snippet.id))
        deactivated.push(`"${snippet.name}" (${availability.reason})`)
        continue
      }

      // Stap 2: prijs verversen
      const priceData = await fetchPrice(snippet.url, snippet.type, snippet)

      if (priceData && (priceData.price || priceData.originalPrice)) {
        await db
          .update(snippets)
          .set({
            price: priceData.price ?? snippet.price,
            originalPrice: priceData.originalPrice ?? snippet.originalPrice,
            currency: priceData.currency || 'EUR',
            priceLastUpdated: new Date(),
            updatedAt: new Date()
          })
          .where(eq(snippets.id, snippet.id))
        successCount++
      } else {
        errors.push(`Geen prijsdata voor "${snippet.name}"`)
        errorCount++
      }
    } catch (error) {
      errors.push(`Fout bij "${snippet.name}": ${error.message}`)
      errorCount++
    }

    // Rustig aan richting bol/amazon: 3s tussen producten
    if (i < active.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }

  return {
    website,
    total: active.length,
    successful: successCount,
    deactivated,
    errors: errorCount,
    errorDetails: errors
  }
}
