import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "public", "images", "expedition");

// Each entry: file path (relative to root), and a function that computes
// the sharp `extract` region given the image's metadata.
const jobs = [
  {
    file: "karnataka/karnataka-frog.jpg",
    label: "karnataka-frog (8% off left, 12% off bottom)",
    region: (w, h) => {
      const left = Math.round(w * 0.08);
      const bottomCut = Math.round(h * 0.12);
      return { left, top: 0, width: w - left, height: h - bottomCut };
    },
  },
  {
    file: "karnataka/karnataka-leopard.jpg",
    label: "karnataka-leopard (10% off bottom)",
    region: (w, h) => {
      const bottomCut = Math.round(h * 0.10);
      return { left: 0, top: 0, width: w, height: h - bottomCut };
    },
  },
  {
    file: "karnataka/karnataka-landscape-monsoon.jpg",
    label: "karnataka-landscape-monsoon (10% off bottom)",
    region: (w, h) => {
      const bottomCut = Math.round(h * 0.10);
      return { left: 0, top: 0, width: w, height: h - bottomCut };
    },
  },
  {
    file: "karnataka/karnataka-macaque.jpg",
    label: "karnataka-macaque (10% off bottom)",
    region: (w, h) => {
      const bottomCut = Math.round(h * 0.10);
      return { left: 0, top: 0, width: w, height: h - bottomCut };
    },
  },
  {
    file: "karnataka/karnataka-minivet-coffee.jpg",
    label: "karnataka-minivet-coffee (10% off bottom)",
    region: (w, h) => {
      const bottomCut = Math.round(h * 0.10);
      return { left: 0, top: 0, width: w, height: h - bottomCut };
    },
  },
  {
    file: "headshots/amoghavarsha.jpeg",
    label: "amoghavarsha headshot (8% off right)",
    region: (w, h) => {
      const rightCut = Math.round(w * 0.08);
      return { left: 0, top: 0, width: w - rightCut, height: h };
    },
  },
];

for (const job of jobs) {
  const filePath = path.join(root, job.file);
  const original = await fs.readFile(filePath);
  const meta = await sharp(original).metadata();
  const { width, height } = meta;
  const region = job.region(width, height);

  let pipeline = sharp(original).extract(region);

  // Re-encode to match the file's extension (some "jpg" files in this
  // project are actually PNG-encoded under the hood — normalize to JPEG
  // for .jpg/.jpeg paths so the bytes match the extension).
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: 90 });
  } else if (ext === ".png") {
    pipeline = pipeline.png();
  }

  const buffer = await pipeline.toBuffer();
  await fs.writeFile(filePath, buffer);

  console.log(
    `${job.label}: ${width}x${height} -> ${region.width}x${region.height} ` +
      `(left=${region.left}, top=${region.top}) -> ${job.file}`
  );
}

console.log("Done.");
