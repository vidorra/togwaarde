/**
 * Affiliate Product Database
 * Real Bol.com widgets and Amazon links organized by category
 * Each product can have optional tags like "Budget", "Aanbevolen", etc.
 */

export const affiliateProducts = {
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
      tag: null, // No tag
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
  ],

  babyflessen: [
    // Add baby bottle products here later
  ],

  spenen: [
    // Add speen/nipple products here later
  ],

  voedingsaccessoires: [
    // Add feeding accessories here later
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