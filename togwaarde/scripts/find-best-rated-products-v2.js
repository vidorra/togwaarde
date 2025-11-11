import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const MIN_RATING = 4.0;
const MIN_REVIEWS = 100;
const DELAY_MS = 1500; // 1.5 seconds between requests
const MAX_PRODUCTS_PER_SEARCH = 10; // Analyze up to 10 products per category
const PROGRESS_FILE = path.join(__dirname, '../md/analysis-progress.json');

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Load progress if exists
function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    }
  } catch (error) {
    console.log('No previous progress found, starting fresh');
  }
  return { analyzed: [], recommendations: [] };
}

// Save progress
function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf-8');
}

// Extract product info from Bol.com product page
async function getBolProductInfo(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9',
      }
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    // Extract product name
    const nameMatch = html.match(/<h1[^>]*class="[^"]*page-heading[^"]*"[^>]*>(.*?)<\/h1>/s) ||
                     html.match(/<h1[^>]*>(.*?)<\/h1>/s);
    const name = nameMatch ? nameMatch[1].replace(/<[^>]*>/g, '').trim() : 'Unknown';

    // Extract rating
    const ratingMatch = html.match(/rating[^>]*>[\s\S]*?(\d[,\.]\d)/i) ||
                       html.match(/(\d[,\.]\d)\s*(?:van|out of|\/)\s*5/i);
    const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : null;

    // Extract review count
    const reviewMatch = html.match(/(\d+(?:\.\d+)?)\s*(?:reviews?|beoordelingen|recensies)/i);
    const reviews = reviewMatch ? parseInt(reviewMatch[1].replace(/\./g, '')) : 0;

    // Extract price
    const priceMatch = html.match(/prijs[^>]*>[\s\S]*?€\s*(\d+(?:[.,]\d+)?)/i) ||
                      html.match(/€\s*(\d+(?:[.,]\d+)?)/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : null;

    return { name, rating, reviews, price, url };
  } catch (error) {
    return null;
  }
}

// Search Bol.com for products and get top rated ones
async function searchBolForBestRated(searchQuery) {
  try {
    // Add "baby" prefix if not already present
    const babyTerms = ['baby', 'zuigeling', 'peuter', 'kleuter'];
    const hasBabyTerm = babyTerms.some(term => searchQuery.toLowerCase().includes(term));
    const finalQuery = hasBabyTerm ? searchQuery : `baby ${searchQuery}`;

    const encodedQuery = encodeURIComponent(finalQuery);
    const searchUrl = `https://www.bol.com/nl/nl/s/?searchtext=${encodedQuery}`;

    console.log(`  🔍 Searching: "${finalQuery}"`);

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'nl-NL,nl;q=0.9'
      }
    });

    if (!response.ok) {
      console.log(`  ❌ Search failed: HTTP ${response.status}`);
      return [];
    }

    const html = await response.text();

    // Extract product URLs from search results
    const urlMatches = [...html.matchAll(/href="(\/nl\/nl\/p\/[^"]+\/\d+\/)"/g)];
    const productUrls = [...new Set(urlMatches.map(m => `https://www.bol.com${m[1]}`))].slice(0, MAX_PRODUCTS_PER_SEARCH);

    if (productUrls.length === 0) {
      console.log(`  ❌ No products found`);
      return [];
    }

    console.log(`  📦 Analyzing ${productUrls.length} products...`);

    // Fetch details for each product
    const products = [];
    for (const url of productUrls) {
      await sleep(DELAY_MS);
      const productInfo = await getBolProductInfo(url);

      if (productInfo && productInfo.rating >= MIN_RATING && productInfo.reviews >= MIN_REVIEWS) {
        products.push(productInfo);
        console.log(`    ✅ ${productInfo.name.substring(0, 60)}...`);
        console.log(`       ⭐ ${productInfo.rating} (${productInfo.reviews} reviews) €${productInfo.price}`);
      }
    }

    // Sort by rating (highest first), then by review count
    products.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

    return products;
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return [];
  }
}

// Extract product category from name
function extractProductCategory(productName) {
  const name = productName.toLowerCase();

  // Map of specific product types to search terms
  const categoryMap = {
    'drinkbeker': 'drinkbeker',
    'oefenbeker': 'drinkbeker',
    'sterilisator': 'fles sterilisator',
    'flessenwarmer': 'flessenwarmer',
    'borstkolf': 'borstkolf',
    'kolfsysteem': 'borstkolf',
    'babyfles': 'babyfles',
    'fles': 'babyfles',
    'speen': 'fles speen',
    'thermometer': 'baby thermometer',
    'babymonitor': 'babymonitor',
    'voedingskussen': 'voedingskussen',
    'slabbetje': 'slabbetje',
    'babybadje': 'babybadje',
    'luieremmer': 'luieremmer',
    'boxkleed': 'boxkleed'
  };

  // Check for specific categories
  for (const [keyword, searchTerm] of Object.entries(categoryMap)) {
    if (name.includes(keyword)) {
      return searchTerm;
    }
  }

  // Default: use product name
  return productName.split(/[-\s]+/).slice(0, 2).join(' ');
}

// Main function
async function analyzeBestProducts() {
  const mdPath = path.join(__dirname, '../md/linked-affiliate-articles.md');
  const content = fs.readFileSync(mdPath, 'utf-8');

  // Load previous progress
  const progress = loadProgress();
  const analyzedSet = new Set(progress.analyzed || []);

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
      if (productName && currentArticle && !analyzedSet.has(productName)) {
        products.push({
          name: productName,
          article: currentArticle,
          category: extractProductCategory(productName)
        });
      }
    }
  }

  console.log(`📊 Found ${products.length} new products to analyze`);
  console.log(`✅ Already analyzed: ${analyzedSet.size} products\n`);

  // Analyze each product
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] ${product.name}`);
    console.log(`  📂 Category: ${product.category}`);
    console.log(`  📄 Article: ${product.article}`);

    // Search for best alternatives
    const alternatives = await searchBolForBestRated(product.category);

    if (alternatives.length > 0) {
      const best = alternatives[0];
      progress.recommendations.push({
        original: product,
        recommended: best,
        alternatives: alternatives.slice(1, 3)
      });

      console.log(`\n  🏆 TOP: ${best.name.substring(0, 70)}...`);
      console.log(`     ⭐ ${best.rating} (${best.reviews} reviews) €${best.price}`);
    } else {
      console.log(`\n  ⚠️  No products meeting criteria`);
    }

    // Mark as analyzed
    progress.analyzed.push(product.name);
    saveProgress(progress);

    // Rate limiting
    await sleep(DELAY_MS);
  }

  // Generate final report
  generateReport(progress.recommendations);

  console.log(`\n\n✅ Analysis complete!`);
  console.log(`📊 Total analyzed: ${progress.analyzed.length}`);
  console.log(`🏆 Recommendations: ${progress.recommendations.length}`);
}

// Generate markdown report
function generateReport(recommendations) {
  const reportPath = path.join(__dirname, '../md/best-rated-products-report.md');

  let report = `# Best Rated Product Recommendations\n\n`;
  report += `**Analysis Date:** ${new Date().toLocaleDateString('nl-NL')}\n`;
  report += `**Criteria:** Minimum ${MIN_RATING}⭐, at least ${MIN_REVIEWS} reviews\n`;
  report += `**Total Recommendations:** ${recommendations.length}\n\n`;
  report += `---\n\n`;

  // Group by article
  const byArticle = {};
  for (const rec of recommendations) {
    const article = rec.original.article;
    if (!byArticle[article]) byArticle[article] = [];
    byArticle[article].push(rec);
  }

  for (const [article, recs] of Object.entries(byArticle)) {
    report += `## ${article}\n\n`;

    for (const rec of recs) {
      report += `### ${rec.original.name}\n\n`;
      report += `**Search Category:** ${rec.original.category}\n\n`;

      const r = rec.recommended;
      report += `#### 🏆 Top Pick\n`;
      report += `**${r.name}**\n\n`;
      report += `- ⭐ **${r.rating} / 5.0** (${r.reviews} reviews)\n`;
      report += `- 💰 **€${r.price}**\n`;
      report += `- 🔗 [Bekijk op Bol.com](${r.url})\n\n`;

      if (rec.alternatives && rec.alternatives.length > 0) {
        report += `**Alternatieven:**\n\n`;
        rec.alternatives.forEach((alt, idx) => {
          report += `${idx + 1}. ${alt.name}\n`;
          report += `   - ⭐ ${alt.rating}/5 (${alt.reviews} reviews) - €${alt.price}\n`;
          report += `   - [Bekijk](${alt.url})\n\n`;
        });
      }

      report += `\n`;
    }

    report += `---\n\n`;
  }

  fs.writeFileSync(reportPath, report, 'utf-8');
  console.log(`\n📄 Report saved: md/best-rated-products-report.md`);
}

// Run the analysis
analyzeBestProducts().catch(console.error);
