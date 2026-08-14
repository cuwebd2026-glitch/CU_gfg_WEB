const fs = require('fs');
const content = fs.readFileSync('client/src/data/content.ts', 'utf-8');
const imageRegex = /image:\s*['"](\/[^'"]+)['"]|src:\s*['"](\/[^'"]+)['"]/g;
let match;
const missing = [];
while ((match = imageRegex.exec(content)) !== null) {
  const imgPath = match[1] || match[2];
  if (!fs.existsSync('client/public' + imgPath)) {
    missing.push(imgPath);
  }
}
console.log('Missing Images:', Array.from(new Set(missing)));