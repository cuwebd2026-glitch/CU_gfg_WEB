import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '../public/gallery');
const THUMBNAILS_DIR = path.join(GALLERY_DIR, 'thumbnails');

async function generateThumbnails() {
  try {
    if (!fs.existsSync(GALLERY_DIR)) {
      console.error(`Gallery directory not found at: ${GALLERY_DIR}`);
      process.exit(1);
    }

    if (!fs.existsSync(THUMBNAILS_DIR)) {
      fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
      console.log(`Created thumbnails directory: ${THUMBNAILS_DIR}`);
    }

    const files = fs.readdirSync(GALLERY_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      const isFile = fs.statSync(path.join(GALLERY_DIR, file)).isFile();
      return isFile && ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to process.`);

    for (const file of imageFiles) {
      const inputPath = path.join(GALLERY_DIR, file);
      const outputFilename = `${path.parse(file).name}.webp`;
      const outputPath = path.join(THUMBNAILS_DIR, outputFilename);

      console.log(`Processing: ${file} -> ${outputFilename}`);
      
      await sharp(inputPath)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savedPercent = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
      
      console.log(`  Saved: ${(inputStats.size / 1024).toFixed(1)} KB -> ${(outputStats.size / 1024).toFixed(1)} KB (${savedPercent}% smaller)`);
    }

    console.log('Thumbnail generation completed successfully!');
  } catch (error) {
    console.error('Error generating thumbnails:', error);
    process.exit(1);
  }
}

generateThumbnails();
