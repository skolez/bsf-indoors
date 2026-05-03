#!/usr/bin/env node
/**
 * Generate web-optimized derivatives of source photos.
 *
 * Reads originals from src/images/setup/, writes:
 *   src/images/setup/web/<name>-1600.jpg   (~1600w, ~80% quality)
 *   src/images/setup/thumb/<name>-480.jpg  (~480w, ~75% quality)
 *
 * Run: node scripts/optimize-images.js
 *
 * Idempotent — overwrites existing outputs.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.resolve(__dirname, '..', 'src', 'images', 'setup');
const WEB = path.join(SRC, 'web');
const THUMB = path.join(SRC, 'thumb');

if (!fs.existsSync(WEB)) fs.mkdirSync(WEB, { recursive: true });
if (!fs.existsSync(THUMB)) fs.mkdirSync(THUMB, { recursive: true });

const originals = fs
  .readdirSync(SRC)
  .filter((f) => /\.(jpe?g|png)$/i.test(f) && fs.statSync(path.join(SRC, f)).isFile());

(async () => {
  for (const file of originals) {
    const base = file.replace(/\.[^.]+$/, '');
    const inputPath = path.join(SRC, file);
    const webOut = path.join(WEB, `${base}-1600.jpg`);
    const thumbOut = path.join(THUMB, `${base}-480.jpg`);

    const buf = fs.readFileSync(inputPath);
    const img = sharp(buf, { failOn: 'none' }).rotate(); // auto-orient via EXIF

    await img
      .clone()
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(webOut);

    await img
      .clone()
      .resize({ width: 480, withoutEnlargement: true })
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(thumbOut);

    const wkb = Math.round(fs.statSync(webOut).size / 1024);
    const tkb = Math.round(fs.statSync(thumbOut).size / 1024);
    console.log(`${file}: web ${wkb}KB, thumb ${tkb}KB`);
  }
  console.log(`\nDone. ${originals.length} images optimized.`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
