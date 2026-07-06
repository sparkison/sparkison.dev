#!/usr/bin/env node
/**
 * Renders every page in site/pages/*.mjs through site/lib/layout.mjs and
 * writes the final static HTML to the paths GitHub Pages serves.
 *
 * Usage: node scripts/build.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import site from "../site/data/site.mjs";
import { renderPage, renderNotFound } from "../site/lib/layout.mjs";
import home from "../site/pages/home.mjs";
import services from "../site/pages/services.mjs";
import m3uSuite from "../site/pages/m3u-suite.mjs";
import resume from "../site/pages/resume.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const OUTPUTS = [
  ["index.html", home],
  ["services/index.html", services],
  ["m3u-suite/index.html", m3uSuite],
  ["resume/index.html", resume],
];

for (const [outPath, page] of OUTPUTS) {
  const html = renderPage({ ...page, main: page.main(site) }, site);
  const fullPath = join(ROOT, outPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, html);
  console.log("built", outPath);
}

writeFileSync(join(ROOT, "404.html"), renderNotFound(site));
console.log("built 404.html");
