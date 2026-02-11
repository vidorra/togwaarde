// Quick debug script to test Bol.com image extraction
const fetch = require('node-fetch');

async function debugBolImage() {
  try {
    const productUrl = 'https://www.bol.com/nl/nl/p/medela-quick-clean-magnetronzakken-5-stuks/9200000027648944/';
    
    console.log('Fetching:', productUrl);
    
    const response = await fetch(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    
    // Check for container-item classes
    const containerMatches = html.match(/container-item.*?container-item__current.*?js_current_item/i);
    console.log('Container classes found:', !!containerMatches);
    
    if (containerMatches) {
      console.log('Container match:', containerMatches[0].substring(0, 100) + '...');
    }
    
    // Check for all media.s-bol.com images
    const allImages = html.match(/media\.s-bol\.com\/[^"'\s]+\.jpg/g);
    console.log('All images found:', allImages ? allImages.slice(0, 10) : 'None');
    
    // Check for large images (500px+)
    const largeImages = html.match(/media\.s-bol\.com\/[^"'\s]+\/[5-9][0-9][0-9]x[0-9]+\.jpg/g);
    console.log('Large images found:', largeImages ? largeImages.slice(0, 5) : 'None');
    
    // Look for the specific pattern you mentioned
    const specificPattern = /<div[^>]*class="[^"]*container-item[^"]*"[\s\S]*?img[^>]+src="([^"]*media\.s-bol\.com[^"]*\.jpg)"/i;
    const specificMatch = html.match(specificPattern);
    console.log('Specific pattern match:', specificMatch ? specificMatch[1] : 'No match');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugBolImage();