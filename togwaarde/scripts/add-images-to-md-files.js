import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DELAY_MS = 2000; // 2 seconds between requests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Extract image URL from Bol.com page
async function getBolImageUrl(url) {
  try {
    console.log(`  🔍 Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    if (!response.ok) {
      console.log(`  ❌ HTTP ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Method 1: Look for image-zoom-modal__zoom-modal-img class
    const modalImageRegex = /<img[^>]*class="[^"]*image-zoom-modal__zoom-modal-img[^"]*"[^>]*src="([^"]+)"/i;
    const modalMatch = html.match(modalImageRegex);

    if (modalMatch && modalMatch[1]) {
      console.log(`  ✅ Found image: ${modalMatch[1]}`);
      return modalMatch[1];
    }

    // Method 2: Look for og:image meta tag
    const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (ogImageMatch && ogImageMatch[1]) {
      console.log(`  ✅ Found og:image: ${ogImageMatch[1]}`);
      return ogImageMatch[1];
    }

    // Method 3: Look for any media.s-bol.com images with large dimensions
    const largeImageRegex = /https:\/\/media\.s-bol\.com\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/\d+x\d+\.jpg/g;
    const allImages = html.match(largeImageRegex) || [];

    // Filter for large images (at least 400x400)
    const largeImages = allImages.filter(img => {
      const match = img.match(/(\d+)x(\d+)\.jpg/);
      if (match) {
        const width = parseInt(match[1]);
        const height = parseInt(match[2]);
        return width >= 400 && height >= 400;
      }
      return false;
    });

    if (largeImages.length > 0) {
      // Get the largest image
      const largest = largeImages.sort((a, b) => {
        const aMatch = a.match(/(\d+)x(\d+)\.jpg/);
        const bMatch = b.match(/(\d+)x(\d+)\.jpg/);
        const aSize = parseInt(aMatch[1]) * parseInt(aMatch[2]);
        const bSize = parseInt(bMatch[1]) * parseInt(bMatch[2]);
        return bSize - aSize;
      })[0];

      console.log(`  ✅ Found large image: ${largest}`);
      return largest;
    }

    console.log(`  ⚠️  No suitable image found`);
    return null;

  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return null;
  }
}

// Process best-rated-products-report.md
async function processBestRatedReport() {
  const inputPath = path.join(__dirname, '../md/best-rated-products-report.md');
  const outputPath = path.join(__dirname, '../md/best-rated-products-report-v2.md');

  console.log('📄 Processing best-rated-products-report.md...\n');

  const content = fs.readFileSync(inputPath, 'utf-8');
  const lines = content.split('\n');
  const newLines = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    newLines.push(line);

    // Look for Bol.com URLs in the format: [Bekijk op Bol.com](URL)
    const bolMatch = line.match(/\[Bekijk op Bol\.com\]\((https:\/\/www\.bol\.com\/[^)]+)\)/);

    if (bolMatch) {
      const bolUrl = bolMatch[1];
      console.log(`\n🔗 Found Bol.com URL: ${bolUrl}`);

      // Check if next line is already an image
      const nextLine = lines[i + 1];
      if (nextLine && nextLine.includes('![Product Image]')) {
        console.log('  ⏭️  Image already exists, skipping');
        i++;
        continue;
      }

      // Fetch image
      const imageUrl = await getBolImageUrl(bolUrl);

      if (imageUrl) {
        // Add image markdown after the link
        newLines.push(`  ![Product Image](${imageUrl})`);
        newLines.push(''); // Add blank line
      }

      // Rate limiting
      await sleep(DELAY_MS);
    }

    i++;
  }

  fs.writeFileSync(outputPath, newLines.join('\n'), 'utf-8');
  console.log(`\n✅ Saved to: ${outputPath}`);
}

// Process linked-affiliate-articles.md
async function processLinkedAffiliateArticles() {
  const inputPath = path.join(__dirname, '../md/linked-affiliate-articles.md');
  const outputPath = path.join(__dirname, '../md/linked-affiliate-articles-v2.md');

  console.log('\n\n📄 Processing linked-affiliate-articles.md...\n');

  const content = fs.readFileSync(inputPath, 'utf-8');
  const lines = content.split('\n');
  const newLines = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    newLines.push(line);

    // Look for Bol.com URLs in the format: - (bol.com) URL
    const bolMatch = line.match(/- \(bol\.com\) (https:\/\/www\.bol\.com\/[^\s]+)/);

    if (bolMatch) {
      const bolUrl = bolMatch[1];
      console.log(`\n🔗 Found Bol.com URL: ${bolUrl}`);

      // Check if next line is already an image
      const nextLine = lines[i + 1];
      if (nextLine && nextLine.includes('![Product Image]')) {
        console.log('  ⏭️  Image already exists, skipping');
        i++;
        continue;
      }

      // Fetch image
      const imageUrl = await getBolImageUrl(bolUrl);

      if (imageUrl) {
        // Add image markdown after the link with proper indentation
        newLines.push(`  ![Product Image](${imageUrl})`);
      }

      // Rate limiting
      await sleep(DELAY_MS);
    }

    i++;
  }

  fs.writeFileSync(outputPath, newLines.join('\n'), 'utf-8');
  console.log(`\n✅ Saved to: ${outputPath}`);
}

// Main function
async function main() {
  console.log('🚀 Starting image extraction for MD files...\n');
  console.log('=' .repeat(80));

  try {
    // Process both files
    await processBestRatedReport();
    await processLinkedAffiliateArticles();

    console.log('\n' + '='.repeat(80));
    console.log('✅ All done!');
    console.log('\nGenerated files:');
    console.log('  - md/best-rated-products-report-v2.md');
    console.log('  - md/linked-affiliate-articles-v2.md');

  } catch (error) {
    console.error('\n❌ Error:', error);
    console.error(error.stack);
  }
}

// Run
main();
