#!/usr/bin/env node
/**
 * Renders every page in site/pages/*.mjs through site/lib/layout.mjs and
 * writes the final static HTML to the paths GitHub Pages serves.
 *
 * Usage: node scripts/build.mjs
 */

import { createHash } from "node:crypto";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import site from "../site/data/site.mjs";
import { renderPage, renderNotFound } from "../site/lib/layout.mjs";
import home from "../site/pages/home.mjs";
import services from "../site/pages/services.mjs";
import m3uSuite from "../site/pages/m3u-suite.mjs";
import m3uTvApp from "../site/pages/m3u-tv-app.mjs";
import resume from "../site/pages/resume.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Short content hash appended as a query string to /styles.css and /main.js
// so a long, immutable Cache-Control (set at the CDN — see README) is safe:
// the URL itself changes whenever either file's content changes.
function hashOf(path) {
  return createHash("sha256").update(readFileSync(join(ROOT, path))).digest("hex").slice(0, 8);
}

const assetVersion = {
  css: hashOf("styles.css"),
  js: hashOf("main.js"),
};

const OUTPUTS = [
  ["index.html", home],
  ["services/index.html", services],
  ["m3u-suite/index.html", m3uSuite],
  ["m3u-tv/index.html", m3uTvApp],
  ["resume/index.html", resume],
];

for (const [outPath, page] of OUTPUTS) {
  const jsonLd = typeof page.jsonLd === "function" ? page.jsonLd(site) : page.jsonLd;
  const html = renderPage({ ...page, jsonLd, main: page.main(site) }, site, assetVersion);
  const fullPath = join(ROOT, outPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, html);
  console.log("built", outPath);
}

writeFileSync(join(ROOT, "404.html"), renderNotFound(site, assetVersion));
console.log("built 404.html");
console.log("asset versions:", assetVersion);
