const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'og-image.svg');
const pngPath = path.join(__dirname, 'public', 'og-image.png');

if (!fs.existsSync(svgPath)) {
  console.error(`SVG file not found: ${svgPath}`);
  process.exit(1);
}

sharp(svgPath)
  .resize(1200, 630, {
    fit: 'contain',
    background: { r: 8, g: 8, b: 8, alpha: 1 }
  })
  .png()
  .toFile(pngPath, (err, info) => {
    if (err) {
      console.error('Error converting SVG to PNG:', err);
      process.exit(1);
    }
    console.log(`✓ Converted og-image.svg to og-image.png (${info.size} bytes)`);
  });
