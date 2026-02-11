# Bol.com API Setup Guide

This guide explains how to set up the Bol.com Partner API integration for product recommendations in kennisbank articles.

## 🔐 Environment Variables Setup

### CapRover Configuration

Add these environment variables to your CapRover app:

1. **Go to your CapRover dashboard**
2. **Navigate to Apps → Your App → App Configs → Environment Variables**
3. **Add the following variables:**

```
BOL_API_CLIENT_ID=8c2d47c1-3b50-4dcb-9167-d656a785bcaf
BOL_API_CLIENT_SECRET=dA7u6Z+S+m?LgFN)cFygE6K3zMY84KdsreweAAT0DOB3bfoB2vsGE?ViDtWycQrP
BOL_PRODUCT_FEED_USERNAME=53f32149-2ddd-4974-a4da-8e26c6b98db5
BOL_PRODUCT_FEED_PASSWORD=j!Wk3Y=3XB{Rv#Nm
```

### Security Notes

- ⚠️ **NEVER commit these values to Git**
- ✅ These credentials are safely stored in CapRover environment
- ✅ The `.env.example` file shows the structure without real values
- ✅ API calls are made server-side only (not exposed to client)

## 📦 Bol.com Product Feed (Enhanced Search)

### What is the Product Feed?

The Bol.com Product Feed is a comprehensive CSV file containing the entire Bol.com catalog. This provides several advantages:

- **Faster Search**: Local database search instead of API calls
- **Better Matching**: Full text search across all product fields
- **Offline Capability**: Works even when API is down
- **Enhanced Filtering**: Custom relevance scoring for baby products
- **Cost Effective**: Reduces API call limits

### Product Feed Features

- **Daily Updates**: Automatic feed refresh with latest products and prices
- **Baby Product Focus**: Filtered for ~20,000+ baby-related products
- **Smart Scoring**: Relevance algorithm prioritizes feeding products
- **Local Caching**: Fast search without network requests
- **Admin Interface**: Easy management via `/admin` page

### Admin Interface

Visit `/admin` to:
- View product feed statistics
- Update feed manually
- Search local product database
- Monitor cache status

## 📦 Bol.com Partner Program Setup

### Prerequisites

1. **Register with Bol.com Partner Program:**
   - Go to https://partnerprogramma.bol.com/
   - Create an account and apply for partnership
   - Wait for approval (usually 1-3 business days)

2. **Create API Application:**
   - Login to Partner Dashboard
   - Navigate to "API" section
   - Create new API application
   - Note down Client ID and Client Secret

### API Credentials Information

- **Client ID:** `8c2d47c1-3b50-4dcb-9167-d656a785bcaf`
- **Client Secret:** `dA7u6Z+S+m?LgFN)cFygE6K3zMY84KdsreweAAT0DOB3bfoB2vsGE?ViDtWycQrP`
- **API Base URL:** `https://api.bol.com`
- **Partner Link Base:** `https://partner.bol.com/click/click`

## 🚀 Usage in Kennisbank Articles

### Method 1: Product Recommendations Section

Add this to any kennisbank article:

```jsx
import BolProductSection from '../../../components/BolProductLink'

// In your article component
<BolProductSection
  productNames={[
    'Nutrilon startvoeding',
    'MAM anti-colic fles',
    'Avent sterilisator',
    'Baby fles warmer'
  ]}
  title="Aanbevolen Producten"
  variant="card"
  maxProducts={4}
/>
```

### Method 2: Inline Product Mentions

For mentioning products within text:

```jsx
import { BolProductMention } from '../../../components/BolProductLink'

// In your article text
<p>
  De <BolProductMention productName="Nutrilon startvoeding">Nutrilon startvoeding</BolProductMention> 
  is een populaire keuze voor ouders.
</p>
```

### Method 3: Direct API Usage

For custom implementations:

```jsx
import { getKennisbankProductLinks, searchBabyProducts } from '../../../lib/bol-api'

// Search for specific products
const products = await getKennisbankProductLinks(['Nutrilon', 'MAM fles'])

// Search in baby category
const babyProducts = await searchBabyProducts('startvoeding')
```

## 📊 Component Variants

### Card Variant (Default)
- Full product cards with images
- Best for dedicated product sections
- Shows price, rating, and description

### Inline Variant
- Horizontal layout
- Good for sidebar recommendations
- Compact but informative

### Minimal Variant
- Just product name with bol.com tag
- Perfect for inline text mentions
- Non-intrusive design

## 🎛️ Product Feed Management

### API Endpoints

**Get Feed Statistics:**
```bash
GET /api/bol-feed?action=stats
```

**Search Local Products:**
```bash
GET /api/bol-feed?action=search&query=nutrilon&limit=10
```

**Update Product Feed:**
```bash
POST /api/bol-feed
Content-Type: application/json
{
  "action": "update"
}
```

### Automated Updates

The system automatically:
- Checks for updates daily
- Downloads ~500MB compressed feed
- Processes ~20,000 baby products
- Updates local cache in `/cache/bol-products/`

### Search Enhancement

Product searches now use a **hybrid approach**:

1. **Primary**: Local feed search (fast, comprehensive)
2. **Fallback**: Live API search (if local fails)
3. **Best of Both**: Maximum product coverage

### Cache Management

- **Location**: `/cache/bol-products/`
- **Files**: 
  - `products.csv.gz` - Raw feed
  - `products-processed.json` - Filtered products
  - `last-update.json` - Update metadata
- **Size**: ~50MB processed cache
- **Refresh**: Daily automatic + manual via admin

## 🔧 Component Props

### BolProductSection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `productNames` | `string[]` | `[]` | Array of product names to search for |
| `title` | `string` | `"Aanbevolen Producten"` | Section title |
| `variant` | `'card' \| 'inline' \| 'minimal'` | `'card'` | Display variant |
| `maxProducts` | `number` | `6` | Maximum products to display |

### BolProductMention Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `productName` | `string` | Yes | Product name to search for |
| `children` | `ReactNode` | No | Custom display text |

## 🎯 SEO & Affiliate Compliance

### Link Attributes
All product links include proper attributes:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer sponsored"` - SEO and security compliance
- Proper affiliate disclosure text

### Disclosure Requirements
- All product sections show "Gesponsorde links" label
- Footer disclaimer about affiliate commissions
- Transparent about partnership with Bol.com

## 📈 Analytics & Tracking

### Built-in Tracking
- Product clicks are automatically tracked
- Affiliate link generation includes tracking parameters
- Revenue attribution through Bol.com Partner Dashboard

### Custom Tracking (Optional)
Add Google Analytics events:

```jsx
// Track product clicks
const trackProductClick = (productName, productId) => {
  gtag('event', 'bol_product_click', {
    'product_name': productName,
    'product_id': productId,
    'affiliate': 'bol.com'
  })
}
```

## 🛠️ Testing & Development

### Local Testing
1. Copy `.env.example` to `.env.local`
2. Add your API credentials
3. Test with `npm run dev`

### API Rate Limits
- Bol.com API: 1000 requests/hour
- Automatic token refresh every 24 hours
- Graceful error handling for rate limits

### Error Handling
- Failed API calls don't break page rendering
- Products gracefully fall back to text-only
- Console warnings for debugging

## 🔄 Deployment Checklist

- [ ] Environment variables set in CapRover
- [ ] API credentials tested and working
- [ ] Product recommendations added to relevant articles
- [ ] Affiliate disclosures in place
- [ ] Links tested in production environment

## 📚 Best Practices

### Product Selection
- Choose products relevant to article content
- Use specific product names for better matching
- Limit to 3-6 products per article section

### Content Integration
- Place product sections at natural points in articles
- Don't overwhelm articles with too many affiliate links
- Maintain focus on valuable content first

### Performance
- Product data is cached for 1 hour
- Images are optimized with Next.js Image component
- Lazy loading prevents initial page slowdown

## 🆘 Troubleshooting

### Common Issues

**"API credentials not configured" error:**
- Check environment variables are set in CapRover
- Ensure no typos in variable names
- Restart application after adding variables

**No products found:**
- Check product names are spelled correctly
- Try broader search terms (e.g., "flesvoeding" instead of specific brand)
- Verify Bol.com has the product in stock

**Images not loading:**
- Bol.com images are served from external domain
- Add `images.bol.com` to Next.js config if needed
- Images fall back gracefully if unavailable

### Debug Mode
Enable debug logging:

```javascript
// In bol-api.js, uncomment debug lines
console.log('Bol.com API Request:', url, params)
console.log('Bol.com API Response:', data)
```

## 📞 Support

- **Bol.com Partner Support:** https://partnerprogramma.bol.com/help
- **API Documentation:** https://api.bol.com/marketing/docs/catalog-api/
- **Technical Issues:** Check console logs and API response codes