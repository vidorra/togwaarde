import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const MIN_RATING = 4.0;
const MIN_REVIEWS = 100;
const DELAY_MS = 2000; // 2 seconds between requests

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Extract product info from Bol.com product page
async function getBolProductInfo(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    if (!response.ok) {
      console.log(`  ❌ HTTP ${response.status} for ${url}`);
      return null;
    }

    const html = await response.text();

    // Extract product name
    const nameMatch = html.match(/<h1[^>]*class="[^"]*page-heading[^"]*"[^>]*>(.*?)<\/h1>/s) ||
                     html.match(/<h1[^>]*>(.*?)<\/h1>/s);
    const name = nameMatch ? nameMatch[1].replace(/<[^>]*>/g, '').trim() : 'Unknown';

    // Extract rating (format: "4.5" or "4,5")
    const ratingMatch = html.match(/rating[^>]*>[\s\S]*?(\d[,\.]\d)/i) ||
                       html.match(/(\d[,\.]\d)\s*(?:van|out of|\/)\s*5/i) ||
                       html.match(/stars[^>]*>[\s\S]*?(\d[,\.]\d)/i);
    const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : null;

    // Extract review count
    const reviewMatch = html.match(/(\d+(?:\.\d+)?)\s*(?:reviews?|beoordelingen|recensies)/i) ||
                       html.match(/reviews?[^>]*>[\s\S]*?(\d+)/i);
    const reviews = reviewMatch ? parseInt(reviewMatch[1].replace(/\./g, '')) : 0;

    // Extract price
    const priceMatch = html.match(/prijs-info[^>]*>[\s\S]*?€\s*(\d+(?:[.,]\d+)?)/i) ||
                      html.match(/price[^>]*>[\s\S]*?€\s*(\d+(?:[.,]\d+)?)/i) ||
                      html.match(/€\s*(\d+(?:[.,]\d+)?)/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : null;

    return {
      name,
      rating,
      reviews,
      price,
      url
    };
  } catch (error) {
    console.log(`  ❌ Error fetching ${url}: ${error.message}`);
    return null;
  }
}

// Search Bol.com for products and get top rated ones
async function searchBolForBestRated(searchQuery, maxResults = 5) {
  try {
    const encodedQuery = encodeURIComponent(searchQuery);
    const searchUrl = `https://www.bol.com/nl/nl/s/?searchtext=${encodedQuery}`;

    console.log(`  🔍 Searching Bol.com for: "${searchQuery}"`);

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    if (!response.ok) {
      console.log(`  ❌ Search failed: HTTP ${response.status}`);
      return [];
    }

    const html = await response.text();

    // Extract product URLs from search results
    const urlMatches = [...html.matchAll(/href="(\/nl\/nl\/p\/[^"]+\/\d+\/)"/g)];
    const productUrls = [...new Set(urlMatches.map(m => `https://www.bol.com${m[1]}`))].slice(0, maxResults);

    if (productUrls.length === 0) {
      console.log(`  ❌ No products found`);
      return [];
    }

    console.log(`  📦 Found ${productUrls.length} products, analyzing...`);

    // Fetch details for each product
    const products = [];
    for (const url of productUrls) {
      await sleep(DELAY_MS);
      const productInfo = await getBolProductInfo(url);
      if (productInfo && productInfo.rating >= MIN_RATING && productInfo.reviews >= MIN_REVIEWS) {
        products.push(productInfo);
        console.log(`    ✅ ${productInfo.name.substring(0, 50)}... - ⭐ ${productInfo.rating} (${productInfo.reviews} reviews) - €${productInfo.price}`);
      } else if (productInfo) {
        console.log(`    ⏭️  ${productInfo.name.substring(0, 50)}... - ⭐ ${productInfo.rating || 'N/A'} (${productInfo.reviews} reviews) - Below threshold`);
      }
    }

    // Sort by rating (highest first), then by review count
    products.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

    return products;
  } catch (error) {
    console.log(`  ❌ Search error: ${error.message}`);
    return [];
  }
}

// Extract product category from name (e.g., "drinkbeker", "sterilisator")
function extractProductCategory(productName) {
  const name = productName.toLowerCase();

  // Common product categories
  const categories = [
    'drinkbeker', 'oefenbeker', 'beker',
    'sterilisator',
    'flessenwarmer',
    'afkolfsysteem', 'borstkolf',
    'fles', 'babyfles',
    'speen',
    'thermometer',
    'babymonitor',
    'luieremmer',
    'boxkleed',
    'kruikje'
  ];

  for (const category of categories) {
    if (name.includes(category)) {
      return category;
    }
  }

  // If no specific category found, use first 2-3 words
  return productName.split(/[-\s]+/).slice(0, 2).join(' ');
}

// Main function
async function analyzeBestProducts() {
  const mdPath = path.join(__dirname, '../md/linked-affiliate-articles.md');
  const content = fs.readFileSync(mdPath, 'utf-8');

  // Parse products from markdown
  const lines = content.split('\n');
  const products = [];
  let currentArticle = null;

  for (const line of lines) {
    if (line.startsWith('## [')) {
      const match = line.match(/## \[(.*?)\]/);
      currentArticle = match ? match[1] : null;
    } else if (line.startsWith('- ') && !line.includes('(bol.com)') && !line.includes('(amazon.nl)')) {
      const productName = line.replace(/^- /, '').trim();
      if (productName && currentArticle) {
        products.push({
          name: productName,
          article: currentArticle,
          category: extractProductCategory(productName)
        });
      }
    }
  }

  console.log(`📊 Found ${products.length} products to analyze\n`);

  // Analyze each product
  const recommendations = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] Analyzing: ${product.name}`);
    console.log(`  Category: ${product.category}`);
    console.log(`  Article: ${product.article}`);

    // Search for best alternatives
    const alternatives = await searchBolForBestRated(product.category, 5);

    if (alternatives.length > 0) {
      const best = alternatives[0];
      recommendations.push({
        original: product,
        recommended: best,
        alternatives: alternatives.slice(1, 3) // Top 2 alternatives
      });

      console.log(`\n  🏆 RECOMMENDED: ${best.name}`);
      console.log(`     ⭐ ${best.rating} stars (${best.reviews} reviews)`);
      console.log(`     💰 €${best.price}`);
      console.log(`     🔗 ${best.url}`);
    } else {
      console.log(`\n  ⚠️  No products found meeting criteria (≥${MIN_RATING} stars, ≥${MIN_REVIEWS} reviews)`);
    }

    // Rate limiting
    await sleep(DELAY_MS);
  }

  // Generate report
  const reportPath = path.join(__dirname, '../md/best-rated-products-report.md');
  let report = `# Best Rated Product Recommendations\n\n`;
  report += `**Analysis Date:** ${new Date().toLocaleDateString('nl-NL')}\n`;
  report += `**Criteria:** Minimum ${MIN_RATING} stars, at least ${MIN_REVIEWS} reviews\n\n`;
  report += `---\n\n`;

  for (const rec of recommendations) {
    report += `## ${rec.original.name}\n\n`;
    report += `**Original Article:** ${rec.original.article}\n`;
    report += `**Category:** ${rec.original.category}\n\n`;
    report += `### 🏆 Top Recommendation\n\n`;
    report += `**${rec.recommended.name}**\n`;
    report += `- ⭐ Rating: ${rec.recommended.rating} / 5.0\n`;
    report += `- 📝 Reviews: ${rec.recommended.reviews}\n`;
    report += `- 💰 Price: €${rec.recommended.price}\n`;
    report += `- 🔗 [View on Bol.com](${rec.recommended.url})\n\n`;

    if (rec.alternatives.length > 0) {
      report += `### Alternatives\n\n`;
      rec.alternatives.forEach((alt, idx) => {
        report += `${idx + 1}. **${alt.name}**\n`;
        report += `   - ⭐ ${alt.rating} / 5.0 (${alt.reviews} reviews)\n`;
        report += `   - 💰 €${alt.price}\n`;
        report += `   - 🔗 [View on Bol.com](${alt.url})\n\n`;
      });
    }

    report += `---\n\n`;
  }

  fs.writeFileSync(reportPath, report, 'utf-8');

  console.log(`\n\n✅ Analysis complete!`);
  console.log(`📄 Report saved to: ${reportPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Products analyzed: ${products.length}`);
  console.log(`   - Recommendations found: ${recommendations.length}`);
  console.log(`   - Products below criteria: ${products.length - recommendations.length}`);
}

// Run the analysis
analyzeBestProducts().catch(console.error);
