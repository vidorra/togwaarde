/**
 * Affiliate Product Database (static fallback)
 *
 * The live affiliate products come from the admin database via
 * /api/affiliates/page/[pageId]. This file is only the LAST-RESORT static
 * fallback for AffiliateProductWidget. The old fallback data was flesvoeding
 * fork leftover (sterilisatoren); togwaarde has no static fallback products,
 * so the widget shows its clean empty state when the database has none.
 */

export const affiliateProducts = {
  slaapzakken: [
    // Managed via the admin dashboard; intentionally no static fallback here.
  ]
}

// Helper function to get products by category and optional tag filter
export function getProductsByCategory(category, tagFilter = null) {
  const products = affiliateProducts[category] || []

  if (tagFilter) {
    return products.filter(product => product.tag === tagFilter)
  }

  return products
}

// Helper function to get specific products by IDs
export function getProductsByIds(productIds) {
  const allProducts = Object.values(affiliateProducts).flat()
  return productIds.map(id => allProducts.find(product => product.id === id)).filter(Boolean)
}

export default affiliateProducts
