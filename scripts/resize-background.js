const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const input = path.join(__dirname, '..', 'public', 'images', 'background.webp');
    const output = path.join(__dirname, '..', 'public', 'images', 'background.small.webp');

    if (!fs.existsSync(input)) {
      console.error('Input background image not found:', input);
      process.exit(1);
    }

    // Resize to max width 1200 while preserving aspect ratio, reduce quality
    await sharp(input)
      .resize({ width: 1200 })
      .webp({ quality: 60 })
      .toFile(output);

    console.log('Created', output);
  } catch (err) {
    console.error('Error resizing background:', err);
    process.exit(1);
  }
})();
