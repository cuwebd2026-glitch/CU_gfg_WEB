const fs = require('fs');
const content = fs.readFileSync('client/src/data/content.ts', 'utf-8');
const regex = /title:\s*['"]([^'"]+)['"][^]*?image:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[1] + ' => ' + match[2]);
}
