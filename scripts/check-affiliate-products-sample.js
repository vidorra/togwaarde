/**
 * Sample script to check a few affiliate products
 * This is a demo - run check-affiliate-products.js for full scan
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../md/affiliate-articles.md');
const outputFile = path.join(__dirname, '../md/linked-affiliate-articles-sample.md');

// Limit to first 3 articles for demo
const MAX_ARTICLES = 3;

async function searchBolCom(productName) {
  try {
    const searchQuery = encodeURIComponent(productName);
    const searchUrl = `https://www.bol.com/nl/nl/s/?searchtext=${searchQuery}`;

    console.log(`🔍 Searching bol.com for: ${productName}`);

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'nl-NL,nl;q=0.9'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ HTTP ${response.status}`);
      return null;
    }

    const html = await response.text();
    const productUrlMatch = html.match(/href="(\/nl\/nl\/p\/[^"]+\/\d+\/)"/);

    if (productUrlMatch) {
      const productUrl = `https://www.bol.com${productUrlMatch[1]}`;
      console.log(`✅ Found: ${productUrl}`);
      return productUrl;
    }

    console.log(`❌ Not found`);
    return null;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

async function searchAmazonNl(productName) {
  try {
    const searchQuery = encodeURIComponent(productName);
    const searchUrl = `https://www.amazon.nl/s?k=${searchQuery}`;

    console.log(`🔍 Searching amazon.nl for: ${productName}`);

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'nl-NL,nl;q=0.9'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ HTTP ${response.status}`);
      return null;
    }

    const html = await response.text();
    const productUrlMatch = html.match(/href="(\/[^"]*\/dp\/[A-Z0-9]{10}[^"]*)"/);

    if (productUrlMatch) {
      const productUrl = `https://www.amazon.nl${productUrlMatch[1].split('?')[0]}`;
      console.log(`✅ Found: ${productUrl}`);
      return productUrl;
    }

    console.log(`❌ Not found`);
    return null;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

function parseAffiliateArticles(content) {
  const lines = content.split('\n');
  const articles = [];
  let currentArticle = null;

  for (const line of lines) {
    const headerMatch = line.match(/^##\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (headerMatch) {
      if (currentArticle) {
        articles.push(currentArticle);
      }
      currentArticle = {
        title: headerMatch[1],
        url: headerMatch[2],
        products: []
      };
      continue;
    }

    const productMatch = line.match(/^-\s+([^(]+)\(([^)]+)\)/);
    if (productMatch && currentArticle) {
      const productName = productMatch[1].trim();
      const websites = productMatch[2].split(',').map(w => w.trim());

      currentArticle.products.push({
        name: productName,
        websites: websites
      });
    }
  }

  if (currentArticle) {
    articles.push(currentArticle);
  }

  return articles;
}

async function processProducts() {
  console.log('📖 Reading affiliate articles file...\n');
  const content = fs.readFileSync(inputFile, 'utf-8');

  const articles = parseAffiliateArticles(content);
  const sampleArticles = articles.slice(0, MAX_ARTICLES);

  console.log(`✅ Processing first ${MAX_ARTICLES} articles (of ${articles.length} total)\n`);

  let outputContent = `# Affiliate Product-aanbevelingen met productlinks (Sample - ${MAX_ARTICLES} artikelen)\n\n`;
  outputContent += `_Dit is een voorbeeld van de eerste ${MAX_ARTICLES} artikelen. Run check-affiliate-products.js voor alle ${articles.length} artikelen._\n\n`;

  for (const article of sampleArticles) {
    console.log(`\n📄 ${article.title}`);
    outputContent += `## [${article.title}](${article.url})\n`;

    for (const product of article.products) {
      console.log(`\n  🛍️ ${product.name}`);
      outputContent += `- ${product.name}\n`;

      for (const website of product.websites) {
        if (website === 'bol.com') {
          const url = await searchBolCom(product.name);
          outputContent += url ? `  - (bol.com) ${url}\n` : `  - (bol.com) ❌ Niet gevonden\n`;
          await new Promise(resolve => setTimeout(resolve, 1500));
        } else if (website === 'amazon.nl') {
          const url = await searchAmazonNl(product.name);
          outputContent += url ? `  - (amazon.nl) ${url}\n` : `  - (amazon.nl) ❌ Niet gevonden\n`;
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
    }

    outputContent += '\n';
  }

  fs.writeFileSync(outputFile, outputContent, 'utf-8');
  console.log(`\n\n✅ Done! Results written to: ${path.basename(outputFile)}`);
  console.log(`\nTo process all ${articles.length} articles, run: node scripts/check-affiliate-products.js`);
}

processProducts().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
