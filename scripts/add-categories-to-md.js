import fs from 'fs';

// Category mapping based on product name keywords
const categoryKeywords = {
  'drinkbeker': ['drinkbeker', 'oefenbeker', 'trainer cup', 'sippee', 'tuitbeker'],
  'babyfles': ['babyfles', 'fles', 'bottle', 'flessenset', 'starterset', 'anti-colic', 'natural flow'],
  'flessenwarmer': ['flessenwarmer', 'bottle warmer', 'warmer', 'flessenbereider'],
  'sterilisator': ['sterilisator', 'sterilizer', 'magnetron sterilisator'],
  'borstkolf': ['borstkolf', 'kolfapparaat', 'kolf', 'breast pump', 'handsfree', 'elektrische kolf'],
  'voedingskussen': ['voedingskussen', 'boppy', 'feeding pillow'],
  'speen': ['speen', 'fopspeen', 'flessenspeen', 'nipple', 'teat'],
  'thermometer': ['thermometer', 'temperatuur'],
  'nachtlampje': ['nachtlampje', 'night light', 'lamp'],
  'weegschaal': ['weegschaal', 'scale', 'baby scale'],
  'waterkoker': ['waterkoker', 'kettle'],
  'verzorging': ['zoogkompressen', 'borstkompressen', 'verzorging', 'care'],
  'melkpoeder': ['nutrilon', 'hero baby', 'melkpoeder', 'zuigelingenvoeding', 'opvolgmelk', 'startvoeding', 'hypoallergeen', 'nenatal'],
  'accessoires': ['flessenborstel', 'borstel', 'bewaarzakjes', 'moedermelk', 'reistas', 'tepelmaat']
};

function detectCategory(productName) {
  const nameLower = productName.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (nameLower.includes(keyword)) {
        return category;
      }
    }
  }

  return null; // No category detected
}

function addCategoriesToMD(inputFile, outputFile) {
  console.log(`\n📖 Reading ${inputFile}...`);
  const content = fs.readFileSync(inputFile, 'utf-8');
  const lines = content.split('\n');

  let outputLines = [];
  let productsProcessed = 0;
  let categoriesAdded = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    outputLines.push(line);

    // Check if this line is a product name (starts with "- " or "**" and contains product info)
    if ((line.startsWith('- ') || line.startsWith('**')) &&
        !line.includes('![Product Image]') &&
        !line.includes('http') &&
        !line.includes('⭐') &&
        !line.includes('💰') &&
        !line.includes('🔗') &&
        !line.includes('Search Category:') &&
        !line.includes('Top Pick') &&
        !line.includes('Alternatieven:') &&
        line.trim().length > 5) {

      productsProcessed++;

      // Extract product name
      let productName = line.trim();
      productName = productName.replace(/^-\s*/, ''); // Remove leading "- "
      productName = productName.replace(/^\*\*/, '').replace(/\*\*$/, ''); // Remove ** markers

      // Detect category
      const category = detectCategory(productName);

      if (category) {
        outputLines.push(`  - **Category:** ${category}`);
        categoriesAdded++;
        console.log(`✅ ${productName.substring(0, 50)}... → ${category}`);
      } else {
        console.log(`⚠️  No category detected for: ${productName.substring(0, 50)}...`);
      }
    }
  }

  // Write output
  const outputContent = outputLines.join('\n');
  fs.writeFileSync(outputFile, outputContent, 'utf-8');

  console.log(`\n✅ Processed ${productsProcessed} products`);
  console.log(`✅ Added ${categoriesAdded} categories`);
  console.log(`📝 Output saved to: ${outputFile}`);
}

// Process both v2 MD files
console.log('🚀 Adding categories to MD files...\n');

addCategoriesToMD(
  'md/best-rated-products-report-v2.md',
  'md/best-rated-products-report-v3.md'
);

addCategoriesToMD(
  'md/linked-affiliate-articles-v2.md',
  'md/linked-affiliate-articles-v3.md'
);

console.log('\n✨ Done! Created v3 versions with categories.');
