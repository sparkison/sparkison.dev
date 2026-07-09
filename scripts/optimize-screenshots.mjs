#!/usr/bin/env node
/**
 * Resizes + converts the raw m3u tv app screenshots (dropped in
 * screenshots/tv-app-screenshots/ as full-resolution PNGs) into lightweight
 * WebP files under m3u-tv/img/, which is what the showcase page actually
 * serves.
 *
 * To feature a new screenshot: drop the PNG in screenshots/tv-app-screenshots/,
 * add an entry to SHOTS below, then run this script.
 *
 * Usage: node scripts/optimize-screenshots.mjs
 * Requires: cwebp (macOS: `brew install webp`)
 */

import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "screenshots/tv-app-screenshots");
const OUT_DIR = join(ROOT, "m3u-tv/img");

const SHOTS = [
  { src: "desktop-home.png", out: "home.webp", width: 1600 },
  { src: "desktop-epg.png", out: "epg.webp", width: 1600 },
  { src: "desktop-movie-details.png", out: "movie-details.webp", width: 1600 },
  { src: "desktop-series.png", out: "series.webp", width: 1600 },
  { src: "desktop-aio-streams.png", out: "aio-streams.webp", width: 1600 },
  { src: "mobile-home.png", out: "mobile-home.webp", width: 700 },
];

mkdirSync(OUT_DIR, { recursive: true });

for (const { src, out, width } of SHOTS) {
  const srcPath = join(SRC_DIR, src);
  const outPath = join(OUT_DIR, out);
  execFileSync("cwebp", ["-q", "82", "-resize", String(width), "0", srcPath, "-o", outPath], {
    stdio: ["ignore", "ignore", "inherit"],
  });
  console.log("wrote", `m3u-tv/img/${out}`);
}
