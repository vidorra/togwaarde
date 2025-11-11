#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Function to recursively find all .jsx files
function findJsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsxFiles(filePath, fileList);
    } else if (file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to update bullet points in a file
function updateBulletPoints(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  // Pattern 1: Simple bullet point in li
  const pattern1 = /<li>•\s*([^<]+)<\/li>/g;
  if (pattern1.test(content)) {
    content = content.replace(pattern1, (match, text) => {
      updated = true;
      return `<li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>${text.trim()}</span>
                </li>`;
    });
  }
  
  // Pattern 2: Bullet point with HTML content
  const pattern2 = /<li>•\s*(<[^>]+>[^<]*<\/[^>]+>)/g;
  if (pattern2.test(content)) {
    content = content.replace(pattern2, (match, htmlContent) => {
      updated = true;
      return `<li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>${htmlContent}</span>
                </li>`;
    });
  }
  
  // Pattern 3: Bullet point with complex HTML (bold, links, etc)
  const pattern3 = /<li>•\s*(.+?)<\/li>/gs;
  content = content.replace(pattern3, (match, innerContent) => {
    // Skip if already converted
    if (innerContent.includes('flex items-center space-x-2')) {
      return match;
    }
    updated = true;
    return `<li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>${innerContent.trim()}</span>
              </li>`;
  });
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
    return true;
  }
  
  return false;
}

// Main execution
const appDir = path.join(__dirname, 'app');
const jsxFiles = findJsxFiles(appDir);

console.log(`Found ${jsxFiles.length} JSX files`);

let updatedCount = 0;
jsxFiles.forEach(file => {
  if (updateBulletPoints(file)) {
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} files with standardized list indicators`);