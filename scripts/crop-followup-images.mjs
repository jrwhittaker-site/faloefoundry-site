import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");

// FIX 1 — Amoghavarsha headshot: remove an additional 6% from the LEFT
// edge of the current (already right-cropped) file.
{
  const file = path.join(root, "public/images/expedition/headshots/amoghavarsha.jpeg");
  const original = await fs.readFile(file);
  const { width, height } = await sharp(original).metadata();
  const left = Math.round(width * 0.06);
  const region = { left, top: 0, width: width - left, height };
  const buffer = await sharp(original).extract(region).jpeg({ quality: 90 }).toBuffer();
  await fs.writeFile(file, buffer);
  console.log(`amoghavarsha: ${width}x${height} -> ${region.width}x${region.height} (left=${left})`);
}

// FIX 2 — Karnataka frog: re-crop from the original (pre-crop) source,
// 5% off the left edge and 5% off the bottom.
{
  const file = path.join(root, "public/images/expedition/karnataka/karnataka-frog.jpg");
  const original = execSync("git show ca5ee8c:public/images/expedition/karnataka/karnataka-frog.jpg", {
    cwd: root,
    maxBuffer: 1024 * 1024 * 50,
  });
  const { width, height } = await sharp(original).metadata();
  const left = Math.round(width * 0.05);
  const bottomCut = Math.round(height * 0.05);
  const region = { left, top: 0, width: width - left, height: height - bottomCut };
  const buffer = await sharp(original).extract(region).jpeg({ quality: 90 }).toBuffer();
  await fs.writeFile(file, buffer);
  console.log(`karnataka-frog: ${width}x${height} -> ${region.width}x${region.height} (left=${left}, bottomCut=${bottomCut})`);
}

console.log("Done.");
