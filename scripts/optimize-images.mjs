// Generates responsive WebP renditions from assets/EDITED PHOTOS into public/images.
// Original files are never modified; output keeps the original base filename.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'assets/EDITED PHOTOS';
const OUT = 'public/images';
const WIDTHS = [640, 1200, 2000];
const manifest = {};

fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f)).sort();

for (const file of files) {
  const base = path.parse(file).name;
  const input = sharp(path.join(SRC, file)).rotate();
  const full = await input.clone().metadata();
  const rotated = (full.orientation ?? 1) >= 5;
  const w = rotated ? full.height : full.width;
  const h = rotated ? full.width : full.height;
  manifest[base] = { width: w, height: h, widths: WIDTHS.filter((x) => x <= w) };
  for (const width of manifest[base].widths) {
    const dest = path.join(OUT, `${base}-${width}.webp`);
    if (fs.existsSync(dest)) continue;
    await input.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(dest);
  }
}

// Open Graph image (1200x630) from the hero photo.
await sharp(path.join(SRC, 'DSC03410.jpg')).rotate().resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 80, mozjpeg: true }).toFile('public/og-image.jpg');

fs.writeFileSync('src/data/imageManifest.json', JSON.stringify(manifest, null, 2));
console.log(`Optimised ${files.length} images`);
