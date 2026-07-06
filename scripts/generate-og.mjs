#!/usr/bin/env node
/**
 * Regenerates the social-share image from site/data/site.mjs.
 *
 * Writes og/og.svg (kept in the repo so it's always editable — this is
 * the file that was missing before, which is why the PNG couldn't be
 * regenerated) and rasterizes it to og.png at 1200x630 via rsvg-convert.
 *
 * Usage: node scripts/generate-og.mjs
 * Requires: rsvg-convert (macOS: `brew install librsvg`)
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import site from "../site/data/site.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { name, domain, ogCard } = site;
const domainLabel = domain.replace(/^https?:\/\//, "");

function chipsSvg(chips) {
  let x = 96;
  const parts = [];
  for (const chip of chips) {
    const width = chip.length * 11.5 + 40;
    parts.push(`<rect x="${x}" y="486" width="${width}" height="46" rx="23" fill="none" stroke="#94b4dc" stroke-opacity="0.25"/>`);
    parts.push(`<text x="${x + width / 2}" y="516" text-anchor="middle" font-family="Menlo, monospace" font-size="22" fill="#94a3b8">${chip}</text>`);
    x += width + 14;
  }
  return parts.join("\n  ");
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2dd4bf"/>
      <stop offset="0.55" stop-color="#60a5fa"/>
      <stop offset="1" stop-color="#a78bfa"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.85" cy="0.05" r="0.7">
      <stop offset="0" stop-color="#2dd4bf" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#2dd4bf" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.05" cy="0.95" r="0.7">
      <stop offset="0" stop-color="#60a5fa" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#60a5fa" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="#94b4dc" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#070b12"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- play mark (Material Symbols play_arrow, filled) -->
  <rect x="96" y="96" width="88" height="88" rx="20" fill="none" stroke="url(#g)" stroke-width="4"/>
  <g transform="translate(93 183.2) scale(0.09)">
    <path fill="url(#g)" d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"/>
  </g>

  <!-- text -->
  <text x="96" y="286" font-family="Menlo, monospace" font-size="26" fill="#2dd4bf">${ogCard.eyebrow}</text>
  <text x="92" y="368" font-family="Helvetica Neue, Arial, sans-serif" font-size="72" font-weight="700" fill="#e7eef7" letter-spacing="-2">${name}</text>
  <text x="94" y="432" font-family="Helvetica Neue, Arial, sans-serif" font-size="36" font-weight="500" fill="#94a3b8">${ogCard.subtitle}</text>

  <!-- chips -->
  ${chipsSvg(ogCard.chips)}

  <text x="1104" y="560" text-anchor="end" font-family="Menlo, monospace" font-size="26" fill="#60a5fa">${domainLabel}</text>
</svg>
`;

const ogDir = join(ROOT, "og");
const svgPath = join(ogDir, "og.svg");
const pngPath = join(ROOT, "og.png");

mkdirSync(ogDir, { recursive: true });
writeFileSync(svgPath, svg);
console.log("wrote", "og/og.svg");

try {
  execFileSync("rsvg-convert", ["-w", "1200", "-h", "630", svgPath, "-o", pngPath]);
  console.log("wrote", "og.png");
} catch (err) {
  console.error("\nCouldn't run rsvg-convert. Install it and re-run this script:");
  console.error("  macOS:  brew install librsvg");
  console.error("  Ubuntu: apt-get install librsvg2-bin");
  console.error(`\nOr convert og/og.svg to a 1200x630 PNG with any tool and save it as og.png.`);
  process.exitCode = 1;
}
