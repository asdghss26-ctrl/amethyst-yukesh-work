/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

function analyzeDetails(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const match = html.match(/window\.__LIGHTHOUSE_JSON__ = (\{.*?\});<\/script>/);
  if (!match) return;
  const data = JSON.parse(match[1]);
  
  console.log(`\n--- Details for ${filePath.includes('mobile') ? 'MOBILE' : 'DESKTOP'} ---`);
  
  const auditsToCheck = ['color-contrast', 'button-name', 'heading-order', 'unsized-images'];
  
  for (const auditId of auditsToCheck) {
    const audit = data.audits[auditId];
    if (audit && audit.details && audit.details.items && audit.details.items.length > 0) {
      console.log(`\n[${auditId}]`);
      audit.details.items.forEach(item => {
        if (item.node) {
          console.log(`  - Selector: ${item.node.selector}`);
          console.log(`    Snippet: ${item.node.snippet}`);
        } else {
          console.log(`  - URL: ${item.url || 'N/A'}`);
        }
      });
    }
  }
}

analyzeDetails('G:\\github\\amethyst rough 1\\report folder\\www.amethystskinclinic-chennai.com report mobile.html');
analyzeDetails('G:\\github\\amethyst rough 1\\report folder\\www.amethystskinclinic-chennai.com report desktop.html');
