// Resize and re-encode the photographs the site actually loads.
//
// Every target width below is roughly twice the largest size that image is ever
// displayed at, which keeps it sharp on retina screens without shipping a
// camera-sized file. Quality is kept high (85, mozjpeg) because these are the
// portfolio pieces. sharp drops EXIF by default, so camera and location
// metadata comes off at the same time.
//
// Run with: node scripts/optimize-images.mjs

import path from "node:path";
import { readFile, writeFile, stat } from "node:fs/promises";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..", "public");

const targets = [
  // Full-bleed 16:9 section images on the homepage
  { file: "genoa-set-cafe.jpeg", width: 2400, note: "homepage, Foundry section" },
  { file: "genoa-monitor.jpeg", width: 2400, note: "homepage, proof section" },
  { file: "genoa-wrap.jpeg", width: 2400, note: "homepage, proof section" },
  // Founder portrait, displayed about 320px wide
  { file: "founder-portrait.jpeg", width: 900, note: "homepage, founder note" },
  // Workshop teacher photo, displayed at most 720px wide
  { file: "DSC00239.jpeg", width: 1600, note: "workshop page, teacher" },
  // Expedition leads, displayed at most 280px wide
  { file: "images/expedition/headshots/jonathan-whittaker.jpeg", width: 800, note: "expedition, lead" },
  { file: "images/expedition/headshots/amoghavarsha.jpeg", width: 800, note: "expedition, lead" },
  // Expedition body images
  { file: "images/expedition/karnataka/karnataka-minivet-coffee.jpg", width: 1400, note: "expedition, overview" },
  { file: "images/expedition/peru/peru-jonathan-teaching.jpeg", width: 1600, note: "expedition, leads" },
  { file: "images/expedition/peru/peru-jonathan-filming.jpeg", width: 1200, note: "expedition, phases grid" },
  { file: "images/expedition/peru/peru-cohort-forest.jpeg", width: 1200, note: "expedition, phases grid" },
  { file: "images/expedition/peru/peru-student-rocky-terrain.jpeg", width: 1400, note: "expedition, what you leave with" },
  // Expedition hero is already efficient at 1920 wide and 192KB, so it is left alone
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
let before = 0;
let after = 0;

for (const target of targets) {
  const file = path.join(root, target.file);
  const original = await readFile(file);
  const meta = await sharp(original).metadata();

  const optimized = await sharp(original)
    .resize({ width: Math.min(target.width, meta.width), withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();

  // Keep whichever is smaller, so re-running this never inflates a file
  if (optimized.length >= original.length) {
    console.log(`  skip  ${target.file} (already smaller than a re-encode)`);
    before += original.length;
    after += original.length;
    continue;
  }

  await writeFile(file, optimized);
  const out = await sharp(file).metadata();
  before += original.length;
  after += optimized.length;
  console.log(
    `  ok    ${target.file}\n` +
      `        ${meta.width}x${meta.height} ${kb(original.length)} -> ${out.width}x${out.height} ${kb(optimized.length)}` +
      `  (${Math.round((1 - optimized.length / original.length) * 100)}% smaller, ${target.note})`,
  );
}

console.log(`\n  total: ${kb(before)} -> ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`);
