'use client'
import { useEffect, useState } from 'react'
import { getProductsByCategory, getProductsByIds } from './affiliate-products.js'
import { trackEvent } from '../lib/analytics'
import { filterOpTog } from '../lib/togVolgorde.js'

// Affiliate-klik loggen: analytics-event (GA4/Umami) + anonieme beacon naar
// de gedeelde click_events tabel zodat /admin/stats kliks per snippet toont.
function trackAffiliateClick(snippetId) {
  trackEvent('affiliate_click', { snippet_id: snippetId, widget: 'affiliate_widget' })
  try {
    const body = JSON.stringify({ snippetId, widget: 'affiliate_widget', page: location.pathname })
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/track-click', body)
    } else {
      fetch('/api/track-click', { method: 'POST', body, keepalive: true }).catch(() => {})
    }
  } catch { /* tracking mag nooit de klik blokkeren */ }
}

// Prijsweergave: DB-prijzen zijn soms "24.99" en soms "€ 24,99"; toon altijd
// met euroteken zonder dubbel teken.
function fmtPrice(price) {
  const s = String(price).trim()
  return s.includes('€') ? s : `€ ${s}`
}

const PLACEHOLDER_IMG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA4MEgxMjBWMTIwSDgwVjgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNOTYgMTA0TDEwNCAxMTJMMTIwIDk2IiBzdHJva2U9IiM2QjczODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='

// Eén kaart voor bol en Amazon: foto, naam, prijs uit onze eigen database en
// een link via het partnerprogramma. Geen script van bol, dus elke klik loopt
// via onze eigen <a> en wordt meegeteld (ook op mobiel).
function ProductCard({ product }) {
  const isAmazon = String(product.type || '').includes('amazon')
  const shop = isAmazon ? 'Amazon' : 'bol.com'
  const href = (isAmazon ? product.data?.url : product.data?.productUrl) || product.url || '#'
  const image = product.data?.imageUrl || product.data?.fallbackImage || PLACEHOLDER_IMG
  const name = product.name || product.data?.title || product.data?.alt || ''

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col w-full">
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener"
        onClick={() => trackAffiliateClick(product.id)}
        className="text-center flex flex-col flex-grow hover:opacity-90 transition-opacity"
      >
        <div className="mb-3">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="mx-auto rounded-lg max-w-full h-auto"
            style={{ maxHeight: '200px' }}
            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMG }}
          />
        </div>
        <h4 className="font-medium text-primary text-sm mb-2 line-clamp-2 min-h-[40px] flex items-center justify-center">
          {name}
        </h4>
        {product.price && (
          <div className="mb-2">
            <span className="text-lg font-bold text-gray-900">{fmtPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="ml-2 text-sm text-gray-500 line-through">{fmtPrice(product.originalPrice)}</span>
            )}
            {product.priceLastUpdated && (
              <div className="text-[10px] text-gray-400 mt-0.5">
                Prijs van {new Date(product.priceLastUpdated).toLocaleDateString('nl-NL')}, actuele prijs op {shop}
              </div>
            )}
          </div>
        )}
        <div className="mt-auto">
          <span
            className={`text-white px-3 py-2 rounded-lg text-sm font-medium inline-block ${isAmazon ? '' : 'bg-primary'}`}
            style={isAmazon ? { backgroundColor: '#FF9900' } : undefined}
          >
            Bekijk op {shop} →
          </span>
        </div>
      </a>
    </div>
  )
}

/**
 * Affiliate-producten (bol.com en Amazon) als eigen kaarten.
 * @param {string} props.pageId - pagina-id voor snippets uit de admin (voorkeur)
 * @param {string} props.category - categorie voor de statische terugval
 * @param {Array<string>} props.productIds - specifieke producten voor de statische terugval
 * @param {string} props.title - kop van de sectie
 * @param {number} props.maxProducts - maximum (alleen bij statische terugval)
 * @param {string} props.filterTag - TOG-waarde om op te filteren, bv. "2.5"
 * @param {boolean} props.hideIndex - nummering verbergen
 */
export default function AffiliateProductWidget({
  pageId = null,
  category = null,
  productIds = null,
  title = 'Aanbevolen producten',
  maxProducts = null,
  filterTag = null,
  hideIndex = false
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function loadProducts() {
      setLoading(true)

      if (pageId) {
        try {
          const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('API timeout')), 15000)
          )
          const response = await Promise.race([
            fetch(`/api/affiliates/page/${pageId}/?v=${Date.now()}`),
            timeout
          ])
          if (response.ok) {
            const data = await response.json()
            if (data.success && data.snippets?.length > 0) {
              if (!cancelled) {
                setProducts(data.snippets)
                setLoading(false)
              }
              return
            }
          }
        } catch (error) {
          console.warn('AffiliateProductWidget: admin-snippets niet geladen', error.message)
        }
      }

      const staticProducts = productIds
        ? getProductsByIds(productIds)
        : getProductsByCategory(category)
      if (!cancelled) {
        setProducts(staticProducts)
        setLoading(false)
      }
    }

    loadProducts()
    return () => { cancelled = true }
  }, [pageId, category, productIds])

  // Optioneel filteren op TOG (bv. "3.5"). Leest de tag als bereik, dus
  // "TOG 2.5 tot 3.5" telt mee bij 2.5 én 3.5. Past er niets, dan alles
  // met de dichtstbijzijnde TOG eerst, zodat de sectie nooit leeg is.
  const filterTog = filterTag ? parseFloat(String(filterTag).replace(',', '.')) : NaN
  const base = Number.isFinite(filterTog) ? filterOpTog(products, filterTog) : products
  const displayProducts = pageId ? base : (maxProducts ? base.slice(0, maxProducts) : base)

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
        <div className="text-center py-8">
          <p className="text-gray-600">Productaanbevelingen laden...</p>
        </div>
      </div>
    )
  }

  // Geen producten: niets tonen (geen lege doos of admin-melding voor bezoekers)
  if (displayProducts.length === 0) return null

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <a href="/affiliate-disclaimer" className="text-xs text-gray-500 hover:text-primary underline decoration-dotted underline-offset-2">Gesponsorde links</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product, index) => {
          const isAmazon = String(product.type || '').includes('amazon')
          // Alleen het eerste deel van de tag tonen ("0.5 TOG, slaapzak" -> "0.5 TOG")
          const tag = product.tag ? String(product.tag).split(',')[0].trim() : ''
          return (
            <div key={product.id} className="relative flex">
              {tag && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">{tag}</span>
                </div>
              )}

              {!hideIndex && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="bg-gray-800 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                </div>
              )}

              <div className={`absolute right-2 z-10 ${!hideIndex ? 'top-10' : 'top-2'}`}>
                <img
                  src={isAmazon ? '/amazon.png' : '/bol.jpg'}
                  alt={isAmazon ? 'Amazon' : 'bol.com'}
                  className="h-8 w-auto max-w-[90px] object-contain rounded bg-white p-1 shadow-sm"
                />
              </div>

              <ProductCard product={product} />
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Als partner van bol.com en Amazon verdienen we mogelijk een commissie bij aankopen via deze links. Prijzen kunnen afwijken; zie onze <a href="/affiliate-disclaimer" className="underline hover:text-primary">affiliate-disclaimer</a>.
          Dit heeft geen invloed op de prijs voor jou.
        </p>
      </div>
    </div>
  )
}
