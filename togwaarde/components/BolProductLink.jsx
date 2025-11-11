'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Star, Euro, ShoppingCart } from 'lucide-react'
// Note: We use API routes to access Bol.com API server-side for security

/**
 * Single product link component
 * @param {Object} product - Product data with affiliate link
 * @param {string} variant - Display variant: 'inline', 'card', or 'minimal'
 */
export function BolProductCard({ product, variant = 'card' }) {
  if (!product) return null

  const formatPrice = (price) => {
    if (!price) return null
    return `€${(price / 100).toFixed(2)}`
  }

  const renderStars = (rating) => {
    if (!rating) return null
    const stars = Math.round(rating)
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">({rating})</span>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <Link
        href={product.affiliateLink}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover font-medium group transition-colors"
      >
        <span>{product.title}</span>
        <div className="flex items-center space-x-1 text-xs">
          <span className="bg-orange-100 text-primary/80 px-2 py-0.5 rounded-full">bol.com</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </Link>
    )
  }

  if (variant === 'inline') {
    return (
      <Link
        href={product.affiliateLink}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group"
      >
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-background transition-colors">
          {product.imageUrl && (
            <div className="flex-shrink-0">
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 group-hover:text-primary/80 transition-colors line-clamp-2">
              {product.title}
            </h4>
            <div className="flex items-center justify-between mt-1">
              {product.price && (
                <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
              )}
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-orange-100 text-primary/80 px-2 py-1 rounded-full font-medium">
                  bol.com
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary/80 transition-colors" />
              </div>
            </div>
            {product.rating && (
              <div className="mt-1">{renderStars(product.rating)}</div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Default 'card' variant
  return (
    <Link
      href={product.affiliateLink}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group"
    >
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-orange-300 hover:shadow-md transition-all">
        {product.imageUrl && (
          <div className="aspect-square mb-3 relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 group-hover:text-primary/80 transition-colors line-clamp-2">
            {product.title}
          </h4>
          
          {product.summary && (
            <p className="text-sm text-gray-600 line-clamp-3">{product.summary}</p>
          )}
          
          <div className="flex items-center justify-between">
            {product.price && (
              <span className="text-lg font-semibold text-primary">{formatPrice(product.price)}</span>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-orange-100 text-primary/80 px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                <ShoppingCart className="w-3 h-3" />
                <span>bol.com</span>
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary/80 transition-colors" />
            </div>
          </div>
          
          {product.rating && (
            <div className="pt-2 border-t border-gray-100">
              {renderStars(product.rating)}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

/**
 * Product recommendations section for kennisbank articles
 * @param {Object} props - Component props
 * @param {Array<string>} props.productNames - Array of product names to search for
 * @param {string} props.title - Section title
 * @param {string} props.variant - Display variant: 'card', 'inline', or 'minimal'
 * @param {number} props.maxProducts - Maximum number of products to display
 */
export default function BolProductSection({ 
  productNames = [], 
  title = "Aanbevolen Producten",
  variant = 'card',
  maxProducts = 6
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (productNames.length === 0) return

    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Use API route to fetch products server-side for security
        const response = await fetch('/api/bol-feed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'kennisbank-products',
            productNames: productNames.slice(0, maxProducts)
          })
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        if (data.success && data.products) {
          setProducts(data.products)
        } else {
          throw new Error(data.error || 'Failed to fetch products')
        }
      } catch (err) {
        console.error('Error fetching Bol.com products:', err)
        setError('Producten konden niet worden geladen')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [productNames, maxProducts])

  if (productNames.length === 0) return null
  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-48 mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || products.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <ShoppingCart className="w-4 h-4" />
            <span>Gesponsorde links</span>
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          </div>
          <p className="text-gray-600 mb-2">Geen productaanbevelingen beschikbaar</p>
          <p className="text-sm text-gray-500">
            Productaanbevelingen zijn momenteel niet beschikbaar. Probeer het later opnieuw.
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 flex items-center">
            <ExternalLink className="w-3 h-3 mr-1" />
            Als partner van bol.com verdienen we mogelijk een commissie bij aankopen via deze links.
            Dit heeft geen invloed op de prijs voor u.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <ShoppingCart className="w-4 h-4" />
          <span>Gesponsorde links</span>
        </div>
      </div>
      
      <div className={`grid gap-4 ${
        variant === 'card' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
      }`}>
        {products.map((product) => (
          <BolProductCard 
            key={product.id} 
            product={product} 
            variant={variant}
          />
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 flex items-center">
          <ExternalLink className="w-3 h-3 mr-1" />
          Als partner van bol.com verdienen we mogelijk een commissie bij aankopen via deze links.
          Dit heeft geen invloed op de prijs voor u.
        </p>
      </div>
    </div>
  )
}

/**
 * Simple inline product mention component
 * @param {Object} props - Component props  
 * @param {string} props.productName - Product name to search for
 * @param {string} props.children - Display text (optional, defaults to productName)
 */
export function BolProductMention({ productName, children }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!productName) return

    const fetchProduct = async () => {
      setLoading(true)
      try {
        // Use API route to fetch products server-side for security
        const response = await fetch('/api/bol-feed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'kennisbank-products',
            productNames: [productName]
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.products && data.products.length > 0) {
            setProduct(data.products[0])
          }
        }
      } catch (error) {
        console.error('Error fetching product mention:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productName])

  if (loading) {
    return <span className="text-primary">{children || productName}</span>
  }

  if (!product) {
    return <span>{children || productName}</span>
  }

  return <BolProductCard product={product} variant="minimal" />
}