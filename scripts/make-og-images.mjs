// Build the 1200x630 preview images that Open Graph and Twitter cards use when
// a link to the site is pasted into a message, a post, or a chat.
//
// Each one is cropped from a photograph already on the relevant page. The site
// image gets the same black and white treatment the homepage applies in CSS, so
// a shared link looks like the site it points at.
//
// Run with: node scripts/make-og-images.mjs

import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..", "public");
const outDir = path.join(root, "og");

const cards = [
  {
    from: "genoa-wrap.jpeg",
    to: "faloe.jpg",
    grayscale: true,
    note: "site default: on set in Genoa",
  },
  {
    from: "images/expedition/karnataka/karnataka-landscape-monsoon.jpg",
    to: "expedition-001.jpg",
    grayscale: false,
    note: "Expedition 001: the Western Ghats",
  },
  {
    from: "DSC00239.jpeg",
    to: "beyond-do-it-again.jpg",
    grayscale: false,
    note: "Beyond Do It Again workshop",
  },
];

await mkdir(outDir, { recursive: true });

for (const card of cards) {
  let pipeline = sharp(path.join(root, card.from)).resize({
    width: 1200,
    height: 630,
    fit: "cover",
    position: "centre",
  });

  if (card.grayscale) {
    pipeline = pipeline.grayscale();
  }

  const buffer = await pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  await writeFile(path.join(outDir, card.to), buffer);
  console.log(`  og/${card.to}  1200x630  ${Math.round(buffer.length / 1024)} KB  (${card.note})`);
}
