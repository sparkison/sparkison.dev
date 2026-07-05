#!/usr/bin/env node
/**
 * Refreshes the hardcoded community stats across the site.
 *
 * Fetches live numbers from the GitHub and Docker Hub APIs, then rewrites the
 * text of every element carrying a data-stat attribute:
 *
 *   stars-all         total GitHub stars (sparkison + m3ue), floored to 50  → "900+"
 *   stars-suite       m3ue org GitHub stars, floored to 10                  → "890+"
 *   docker-pulls      Docker Hub pulls, compact                            → "600K+"
 *   docker-pulls-long Docker Hub pulls, long form                          → "600,000+"
 *
 * Also bumps <lastmod> in sitemap.xml when anything changed.
 *
 * Usage: node scripts/update-stats.mjs [--dry-run]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = ["index.html", "services/index.html", "m3u-suite/index.html"];
const DRY_RUN = process.argv.includes("--dry-run");

async function getJSON(url) {
  const res = await fetch(url, { headers: { "User-Agent": "sparkison.dev-stats" } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

async function githubStars(path) {
  let total = 0;
  for (let page = 1; ; page++) {
    const repos = await getJSON(`https://api.github.com/${path}/repos?per_page=100&page=${page}`);
    total += repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    if (repos.length < 100) return total;
  }
}

async function dockerPulls(repo) {
  const data = await getJSON(`https://hub.docker.com/v2/repositories/${repo}/`);
  return data.pull_count ?? 0;
}

const floorTo = (n, step) => Math.floor(n / step) * step;

function compactPulls(n) {
  if (n >= 1_000_000) return `${(floorTo(n, 100_000) / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  return `${floorTo(n, 50_000) / 1_000}K+`;
}

// ---- fetch ----------------------------------------------------------------

const [personalStars, orgStars, editorPulls, proxyPulls] = await Promise.all([
  githubStars("users/sparkison"),
  githubStars("orgs/m3ue"),
  dockerPulls("sparkison/m3u-editor"),
  dockerPulls("sparkison/m3u-proxy"),
]);

const pulls = editorPulls + proxyPulls;
const stats = {
  "stars-all": `${floorTo(personalStars + orgStars, 50)}+`,
  "stars-suite": `${floorTo(orgStars, 10)}+`,
  "docker-pulls": compactPulls(pulls),
  "docker-pulls-long": `${floorTo(pulls, 50_000).toLocaleString("en-US")}+`,
};

console.log(`GitHub stars: ${personalStars + orgStars} (personal ${personalStars}, m3ue ${orgStars})`);
console.log(`Docker pulls: ${pulls.toLocaleString("en-US")} (editor ${editorPulls.toLocaleString("en-US")}, proxy ${proxyPulls.toLocaleString("en-US")})`);
console.log("Rendered:", stats, "\n");

// ---- rewrite --------------------------------------------------------------

let anyChange = false;

for (const page of PAGES) {
  const file = join(ROOT, page);
  const before = readFileSync(file, "utf8");
  let after = before;

  for (const [key, value] of Object.entries(stats)) {
    after = after.replace(
      new RegExp(`(<(\\w+)[^>]*\\bdata-stat="${key}"[^>]*>)[^<]*(</\\2>)`, "g"),
      `$1${value}$3`
    );
  }

  if (after !== before) {
    anyChange = true;
    if (!DRY_RUN) writeFileSync(file, after);
    console.log(`${DRY_RUN ? "would update" : "updated"}  ${page}`);
  } else {
    console.log(`unchanged  ${page}`);
  }
}

if (anyChange && !DRY_RUN) {
  const sitemapFile = join(ROOT, "sitemap.xml");
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(
    sitemapFile,
    readFileSync(sitemapFile, "utf8").replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`)
  );
  console.log(`updated  sitemap.xml (lastmod → ${today})`);
}
