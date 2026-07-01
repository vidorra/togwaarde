'use client'
import { useEffect, useRef, useState } from 'react'
import { getProductsByCategory, getProductsByIds } from './affiliate-products.js'
import '../styles/bol-widget.css'

/**
 * Component that properly executes Bol.com scripts
 * React's dangerouslySetInnerHTML doesn't execute <script> tags by default,
 * so we need to manually inject and execute them
 */
function BolScriptWidget({ product }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !product.generatedHtml) return

    // Extract and execute scripts from HTML
    const scriptContainer = containerRef.current.querySelector('.bol-widget-content')
    if (!scriptContainer) return

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = product.generatedHtml

    // Find all script tags
    const scripts = tempDiv.querySelectorAll('script')

    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script')

      // Copy attributes
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value)
      })

      // Copy inline script content or src
      if (oldScript.src) {
        newScript.src = oldScript.src
      } else {
        newScript.textContent = oldScript.textContent
      }

      // Append to container to execute
      scriptContainer.appendChild(newScript)
    })

    console.log(`✅ Bol.com scripts executed for product: ${product.id}`)
  }, [product.generatedHtml, product.id])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col w-full" ref={containerRef}>
      <div className="text-center space-y-4 flex flex-col flex-grow" data-product-id={product.id}>
        {/* 1. Product Image (from backend) */}
        <div className="mb-3">
          <img
            src={product.data?.fallbackImage || 'https://media.s-bol.com/NKX9XZWN3RGL/0RNmv15/550x707.jpg'}
            alt={product.name || product.data?.title}
            className="mx-auto rounded-lg max-w-full h-auto"
            style={{ maxHeight: '200px' }}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA4MEgxMjBWMTIwSDgwVjgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNOTYgMTA0TDEwNCAxMTJMMTIwIDk2IiBzdHJva2U9IiM2QjczODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
              e.target.style.display = 'block'
            }}
          />
        </div>

        {/* 2. Product Title */}
        <h4 className="font-medium text-primary text-sm">
          {product.name || product.data?.title}
        </h4>

        {/* 3. Bol.com Script Execution Container */}
        <div className="bol-widget-content">
          {/* Scripts will be injected here by useEffect */}
        </div>

        {/* 4. Button */}
        <div className="mt-auto">
          <a
            href={product.url || product.data?.productUrl || '#'}
            target="_blank"
            rel="nofollow noopener"
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors inline-block"
          >
            Bekijk op bol.com →
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Renders real Bol.com widgets and Amazon affiliate links
 * @param {Object} props
 * @param {string} props.pageId - Page ID to load admin-managed snippets (preferred)
 * @param {string} props.category - Product category (sterilisatoren, babyflessen, etc.) - fallback
 * @param {Array<string>} props.productIds - Specific product IDs to show - fallback
 * @param {string} props.title - Section title
 * @param {number} props.maxProducts - Maximum number of products to show (only for static fallback)
 */
export default function AffiliateProductWidget({
  pageId = null,
  category = null,
  productIds = null,
  title = "Aanbevolen Producten",
  maxProducts = null,
  filterTag = null,
  hideIndex = false
}) {
  const containerRef = useRef(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load products from admin system or fallback to static data
  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      
      if (pageId) {
        // Load from admin system with timeout
        try {
          console.log(`🔍 AffiliateProductWidget: Loading admin data for pageId: ${pageId}`)
          
          // Create very long timeout (15 seconds) for production reliability
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('API timeout')), 15000)
          )
          
          // Add cache-busting for production deployment propagation
          const timestamp = Date.now()
          const apiUrl = `/api/affiliates/page/${pageId}/?v=${timestamp}`
          console.log(`🔍 AffiliateProductWidget: Fetching from: ${apiUrl}`)
          const fetchPromise = fetch(apiUrl)
          
          const response = await Promise.race([fetchPromise, timeoutPromise])
          console.log(`🔍 AffiliateProductWidget: API response status: ${response.status} for ${apiUrl}`)
          
          if (response.ok) {
            const data = await response.json()
            console.log(`🔍 AffiliateProductWidget: API response data:`, data)
            
            if (data.success && data.snippets && data.snippets.length > 0) {
              console.log(`✅ AffiliateProductWidget: Successfully loaded ${data.snippets.length} admin snippets`)
              console.log(`🔍 All loaded products:`, data.snippets.map(p => `${p.id} (${p.name}) - ${p.type} - active: ${p.active}`))
              
              // CRITICAL: Force load success even if response seems delayed
              console.log(`🚀 PRODUCTION DEBUG: Setting products array and loading=false immediately`)
              setProducts(data.snippets)
              setLoading(false)
              
              // Additional debug for production
              if (typeof window !== 'undefined') {
                window.AFFILIATE_DEBUG = {
                  pageId,
                  apiUrl,
                  loadedSnippets: data.snippets.length,
                  timestamp: new Date().toISOString()
                }
                console.log(`🔧 PRODUCTION DEBUG: Set window.AFFILIATE_DEBUG`, window.AFFILIATE_DEBUG)
              }
              return
            } else {
              console.warn(`⚠️ AffiliateProductWidget: Admin API returned no snippets. Data:`, data)
              console.warn(`⚠️ PRODUCTION DEBUG: Falling back to static data due to API response structure`)
            }
          } else {
            console.warn(`⚠️ AffiliateProductWidget: API request failed with status: ${response.status}`)
            console.warn(`⚠️ PRODUCTION DEBUG: HTTP error - falling back to static data`)
          }
        } catch (error) {
          console.error('❌ AffiliateProductWidget: Failed to load admin snippets, falling back to static data:', error.message)
          console.error('❌ PRODUCTION DEBUG: Error details:', {
            errorMessage: error.message,
            errorType: error.constructor.name,
            pageId,
            apiUrl: `/api/affiliates/page/${pageId}/?v=${Date.now()}`,
            timestamp: new Date().toISOString()
          })
          
          // Set debug info on error too
          if (typeof window !== 'undefined') {
            window.AFFILIATE_ERROR = {
              pageId,
              error: error.message,
              timestamp: new Date().toISOString()
            }
          }
        }
      }
      
      // Fallback to static data
      console.log(`📦 AffiliateProductWidget: Falling back to static data. Category: ${category}, ProductIds: ${productIds}`)
      const staticProducts = productIds 
        ? getProductsByIds(productIds)
        : getProductsByCategory(category)
      
      console.log(`📦 AffiliateProductWidget: Static products loaded: ${staticProducts.length}`)
      console.log(`📦 AffiliateProductWidget: Static product details:`, staticProducts.map(s => ({id: s.id, name: s.name, type: s.type})))
      setProducts(staticProducts)
      setLoading(false)
      console.log(`🏁 AffiliateProductWidget: Component loading complete. Final state - Loading: false, Products: ${staticProducts.length}`)
    }
    
    loadProducts()
  }, [pageId, category, productIds])
  
  // Debug log for deployment verification - v7 admin system integration
  useEffect(() => {
    if (typeof window !== 'undefined' && products.length > 0 && !loading) {
      const source = pageId ? `page "${pageId}"` : `category "${category}"`
      console.log(`🛍️ AffiliateProductWidget loaded ${products.length} products from ${source} - admin integration v5`)
    }
  }, [products, loading, pageId, category])

  // Optionally filter by a TOG tag (e.g. "2.5"). Matches the recommended TOG
  // against the snippet's tag. If nothing matches, fall back to all products so
  // the section is never empty.
  const matchesTag = (p) => {
    if (!filterTag) return true
    const m = String(p.tag || '').replace(',', '.').match(/\d+(\.\d+)?/)
    if (!m) return false
    return Math.abs(parseFloat(m[0]) - parseFloat(filterTag)) < 0.01
  }
  const tagFiltered = filterTag ? products.filter(matchesTag) : products
  const base = (filterTag && tagFiltered.length === 0) ? products : tagFiltered

  // For admin-managed pages, show all products. For static fallback, limit if specified
  const displayProducts = pageId ? base : (maxProducts ? base.slice(0, maxProducts) : base)
  
  // Debug: Log the transition from products to displayProducts
  if (products.length !== displayProducts.length) {
    console.log(`⚠️ Product count changed: ${products.length} → ${displayProducts.length}`)
    console.log(`📦 Original products:`, products.map(p => p.id))
    console.log(`📋 Display products:`, displayProducts.map(p => p.id))
  }

  // Simplified widget setup - no complex hide/show logic needed
  useEffect(() => {
    console.log(`🔍 AffiliateProductWidget: Rendering ${displayProducts.length} products with simplified structure`)
  }, [displayProducts])

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
        <div className="text-center py-8">
          <p className="text-gray-600">Laden van productaanbevelingen...</p>
        </div>
      </div>
    )
  }
  
  if (displayProducts.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
        <div className="text-center py-8">
          <p className="text-gray-600">Geen productaanbevelingen beschikbaar</p>
          {pageId && (
            <p className="text-gray-500 text-sm mt-2">
              Voeg producten toe via het admin paneel
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6" ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Gesponsorde links</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product, index) => (
          <div key={product.id} className="relative flex">
            {/* Product tag (Budget, Aanbevolen, etc.) */}
            {product.tag && (
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                  {product.tag}
                </span>
              </div>
            )}
            
            {/* Product counter */}
            {!hideIndex && (
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-gray-800 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
              </div>
            )}

            {/* Bol.com Iframe Widget */}
            {product.type === 'bol_iframe' && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col w-full">
                <div className="text-center flex flex-col flex-grow">
                  <a 
                    href={product.data.productUrl}
                    target="_blank"
                    rel="nofollow noopener"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <div className="mb-3">
                      <img
                        src={product.data.fallbackImage}
                        alt={product.data.title}
                        className="mx-auto rounded-lg max-w-full h-auto"
                        style={{ maxHeight: '200px' }}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA4MEgxMjBWMTIwSDgwVjgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNOTYgMTA0TDEwNCAxMTJMMTIwIDk2IiBzdHJva2U9IiM2QjczODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
                          e.target.style.display = 'block'
                        }}
                      />
                    </div>
                    <h4 className="font-medium text-primary text-sm mb-2 line-clamp-2 min-h-[40px] flex items-center justify-center">
                      {product.data.title}
                    </h4>
                    <div className="mt-auto">
                      <div className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors inline-block">
                        Bekijk op bol.com →
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )}
            
            {/* Bol.com Script Widget - With Script Execution */}
            {(product.type === 'bol_snippet' || product.type === 'bol_script') && (
              <BolScriptWidget
                product={product}
                key={product.id}
              />
            )}
            
            {/* Amazon Affiliate Image */}
            {product.type === 'amazon_image' && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col w-full">
                <div className="text-center flex flex-col flex-grow">
                  <a
                    href={product.data.url}
                    target="_blank"
                    rel="nofollow noopener"
                    className="block hover:opacity-90 transition-opacity flex flex-col flex-grow"
                  >
                    <div className="mb-3">
                      <img
                        src={product.data.imageUrl}
                        alt={product.data.alt}
                        className="mx-auto rounded-lg max-w-full h-auto"
                        style={{ maxHeight: '200px' }}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA4MEgxMjBWMTIwSDgwVjgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNOTYgMTA0TDEwNCAxMTJMMTIwIDk2IiBzdHJva2U9IiM2QjczODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
                          e.target.style.display = 'block'
                        }}
                      />
                    </div>
                    <h4 className="font-medium text-primary text-sm mb-2 line-clamp-2 min-h-[40px] flex items-center justify-center">
                      {product.name}
                    </h4>
                    {/* Price display */}
                    {product.price && (
                      <div className="my-2">
                        <span className="text-lg font-bold text-gray-900">€{product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">€{product.originalPrice}</span>
                        )}
                      </div>
                    )}
                    <div className="mt-auto">
                      <div className="text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-block" style={{ backgroundColor: '#FF9900' }}>
                        Bekijk op Amazon →
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Als partner van bol.com en Amazon verdienen we mogelijk een commissie bij aankopen via deze links.
          Dit heeft geen invloed op de prijs voor u.
        </p>
      </div>
    </div>
  )
}