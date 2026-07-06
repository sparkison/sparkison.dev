#!/usr/bin/env node
/**
 * Refreshes the live community stats (GitHub stars, Docker pulls) in
 * site/data/site.mjs, then rebuilds every page so the new numbers show
 * up everywhere they're referenced.
 *
 *   starsAll         total GitHub stars (sparkison + m3ue), floored to 50  → "900+"
 *   starsSuite       m3ue org GitHub stars, floored to 10                  → "890+"
 *   dockerPulls      Docker Hub pulls, compact                             → "600K+"
 *   dockerPullsLong  Docker Hub pulls, long form                           → "600,000+"
 *
 * Also bumps <lastmod> in sitemap.xml when anything changed.
 *
 * Usage: node scripts/update-stats.mjs [--dry-run]
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = join(ROOT, "site/data/site.mjs");
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
  starsAll: `${floorTo(personalStars + orgStars, 50)}+`,
  starsSuite: `${floorTo(orgStars, 10)}+`,
  dockerPulls: compactPulls(pulls),
  dockerPullsLong: `${floorTo(pulls, 50_000).toLocaleString("en-US")}+`,
};

console.log(`GitHub stars: ${personalStars + orgStars} (personal ${personalStars}, m3ue ${orgStars})`);
console.log(`Docker pulls: ${pulls.toLocaleString("en-US")} (editor ${editorPulls.toLocaleString("en-US")}, proxy ${proxyPulls.toLocaleString("en-US")})`);
console.log("Rendered:", stats, "\n");

// ---- rewrite site/data/site.mjs --------------------------------------------

const before = readFileSync(DATA_FILE, "utf8");
let after = before;
for (const [key, value] of Object.entries(stats)) {
  after = after.replace(new RegExp(`(${key}:\\s*")[^"]*(")`), `$1${value}$2`);
}

const changed = after !== before;

if (changed) {
  if (!DRY_RUN) writeFileSync(DATA_FILE, after);
  console.log(`${DRY_RUN ? "would update" : "updated"}  site/data/site.mjs`);
} else {
  console.log("unchanged  site/data/site.mjs");
}

if (changed && !DRY_RUN) {
  execFileSync("node", [join(ROOT, "scripts/build.mjs")], { stdio: "inherit" });

  const sitemapFile = join(ROOT, "sitemap.xml");
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(
    sitemapFile,
    readFileSync(sitemapFile, "utf8").replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`)
  );
  console.log(`updated  sitemap.xml (lastmod → ${today})`);
}
