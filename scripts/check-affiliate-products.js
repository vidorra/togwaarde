/**
 * Script to check if affiliate products exist on mentioned websites
 * and create a new markdown file with actual product URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the affiliate articles file
const inputFile = path.join(__dirname, '../md/affiliate-articles.md');
const outputFile = path.join(__dirname, '../md/linked-affiliate-articles.md');

// Function to search for a product on bol.com
async function searchBolCom(productName) {
  try {
    const searchQuery = encodeURIComponent(productName);
    const searchUrl = `https://www.bol.com/nl/nl/s/?searchtext=${searchQuery}`;

    console.log(`🔍 Searching bol.com for: ${productName}`);

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Failed to search bol.com: HTTP ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Extract first product URL from search results
    const productUrlMatch = html.match(/href="(\/nl\/nl\/p\/[^"]+\/\d+\/)"/);

    if (productUrlMatch) {
      const productUrl = `https://www.bol.com${productUrlMatch[1]}`;
      console.log(`✅ Found on bol.com: ${productUrl}`);
      return productUrl;
    }

    console.log(`❌ Not found on bol.com: ${productName}`);
    return null;
  } catch (error) {
    console.error(`Error searching bol.com for ${productName}:`, error.message);
    return null;
  }
}

// Function to search for a product on amazon.nl
async function searchAmazonNl(productName) {
  try {
    const searchQuery = encodeURIComponent(productName);
    const searchUrl = `https://www.amazon.nl/s?k=${searchQuery}`;

    console.log(`🔍 Searching amazon.nl for: ${productName}`);

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Failed to search amazon.nl: HTTP ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Extract first product URL from search results
    const productUrlMatch = html.match(/href="(\/[^"]*\/dp\/[A-Z0-9]{10}[^"]*)"/);

    if (productUrlMatch) {
      const productUrl = `https://www.amazon.nl${productUrlMatch[1].split('?')[0]}`;
      console.log(`✅ Found on amazon.nl: ${productUrl}`);
      return productUrl;
    }

    console.log(`❌ Not found on amazon.nl: ${productName}`);
    return null;
  } catch (error) {
    console.error(`Error searching amazon.nl for ${productName}:`, error.message);
    return null;
  }
}

// Parse the markdown file and extract products
function parseAffiliateArticles(content) {
  const lines = content.split('\n');
  const articles = [];
  let currentArticle = null;

  for (const line of lines) {
    // Check for article header (## [Title](URL))
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

    // Check for product line (- Product Name (website1, website2))
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

// Main function to process all products
async function processProducts() {
  console.log('📖 Reading affiliate articles file...');
  const content = fs.readFileSync(inputFile, 'utf-8');

  console.log('📝 Parsing products...');
  const articles = parseAffiliateArticles(content);

  console.log(`\n✅ Found ${articles.length} articles with products\n`);

  let outputContent = '# Affiliate Product-aanbevelingen met productlinks (FlesvoedingCalculator.nl)\n\n';

  // Process each article
  for (const article of articles) {
    console.log(`\n📄 Processing article: ${article.title}`);
    outputContent += `## [${article.title}](${article.url})\n`;

    // Process each product
    for (const product of article.products) {
      console.log(`\n  🛍️ Product: ${product.name}`);
      outputContent += `- ${product.name}\n`;

      // Check each website
      for (const website of product.websites) {
        if (website === 'bol.com') {
          const url = await searchBolCom(product.name);
          if (url) {
            outputContent += `  - (bol.com) ${url}\n`;
          } else {
            outputContent += `  - (bol.com) ❌ Niet gevonden\n`;
          }
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else if (website === 'amazon.nl') {
          const url = await searchAmazonNl(product.name);
          if (url) {
            outputContent += `  - (amazon.nl) ${url}\n`;
          } else {
            outputContent += `  - (amazon.nl) ❌ Niet gevonden\n`;
          }
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }

    outputContent += '\n';
  }

  // Write output file
  console.log(`\n\n💾 Writing results to ${outputFile}...`);
  fs.writeFileSync(outputFile, outputContent, 'utf-8');

  console.log('✅ Done! Check linked-affiliate-articles.md for results.');
}

// Run the script
processProducts().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
