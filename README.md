# sparkison.dev

Personal portfolio for **Shaun Parkison** — full stack developer and creator of the
[m3u suite](https://github.com/sparkison/m3u-editor) (m3u editor, m3u proxy, m3u tv).

## Stack

A tiny build step over otherwise hand-written HTML/CSS/JS — no frameworks, no
bundler, and zero npm dependencies (Node's built-in ESM + `fetch` do everything).
The output is plain static HTML that deploys anywhere, including GitHub Pages.

## How editing works

**The files GitHub Pages serves (`index.html`, `services/index.html`, etc.) are
generated — don't hand-edit them.** Edit the source instead, then rebuild:

| Editing this... | ...changes |
| --- | --- |
| `site/data/site.mjs` | Anything site-wide: name, email, nav links, footer links, social URLs, stats |
| `site/pages/*.mjs` | One page's title, meta description, JSON-LD, and body content |
| `site/lib/layout.mjs` | The shared shell: `<head>` boilerplate, header/nav, footer |
| `styles.css`, `main.js` | Styling and behavior — these are hand-written, not generated |

After editing, regenerate the HTML:

```sh
npm run build
```

This reads `site/data/` + `site/pages/` through `site/lib/layout.mjs` and writes
`index.html`, `services/index.html`, `m3u-suite/index.html`, `resume/index.html`,
and `404.html`. Commit the generated files alongside your source changes — Pages
serves whatever's committed, so the build output has to be part of the commit.

Why this instead of hand-editing 5 near-duplicate files: changing the nav, the
footer, the contact email, or a stat used to mean finding and fixing the same
string in every file. Now it's one edit in `site/data/site.mjs` + `npm run build`.

## Structure

| Path | Purpose |
| --- | --- |
| `site/data/site.mjs` | Central site data (source of truth for shared content) |
| `site/pages/*.mjs` | Per-page meta + JSON-LD + body content (source) |
| `site/lib/layout.mjs` | Shared page shell renderer (source) |
| `scripts/build.mjs` | Renders source → the HTML files below |
| `scripts/update-stats.mjs` | Fetches live GitHub/Docker stats into `site.mjs`, then rebuilds |
| `scripts/generate-og.mjs` | Rebuilds `og/og.svg` + `og.png` from `site.mjs` |
| `index.html`, `services/`, `m3u-suite/`, `resume/`, `404.html` | **Generated** — deployed output |
| `styles.css` | All styling (dark theme, custom properties, responsive) — hand-written |
| `main.js` | Progressive enhancement: scroll-reveal, mobile nav, footer year — hand-written |
| `og/og.svg` | Source for the social-share image (edit + `npm run og`, not `og.png` directly) |
| `fonts/` | Self-hosted Space Grotesk + JetBrains Mono (variable, woff2, no CDN) |
| `robots.txt` / `sitemap.xml` / `llms.txt` | Crawler + answer-engine directives |
| `site.webmanifest` / `favicon.svg` / `apple-touch-icon.png` / `og.png` | Icons & social share image |
| `CNAME` | Custom domain for GitHub Pages |

## Local preview

Any static file server works:

```sh
npx serve .
# or
python3 -m http.server 8080
```

## Keeping stats fresh

```sh
npm run stats            # fetch live numbers, update site.mjs, rebuild
npm run stats -- --dry-run   # preview without writing
```

No API tokens needed — it hits the public GitHub and Docker Hub APIs, rounds
numbers down (911 → "900+"), writes them into `site/data/site.mjs`, rebuilds all
pages, and bumps `sitemap.xml`'s `lastmod` if anything changed.

## Regenerating the social-share image

```sh
npm run og
```

Requires `rsvg-convert` (`brew install librsvg` on macOS, `apt-get install
librsvg2-bin` on Linux). Edit `site/data/site.mjs`'s `ogCard` field (or
`og/og.svg` directly for layout changes) and re-run to update `og.png`.

## Cache lifetime (Cloudflare)

GitHub Pages doesn't support custom response headers, so if a Lighthouse/PageSpeed
report flags "long cache lifetime" for `/fonts/*`, `/styles.css`, `/main.js`, etc.,
fix it in Cloudflare instead (works because the zone is proxied — confirmed by
Cloudflare's email-obfuscation script appearing on the page):

**Cloudflare dashboard → Caching → Cache Rules → Create rule**

| Field | Value |
| --- | --- |
| Rule name | Long cache for static assets |
| When incoming requests match | `URI Path` ends with `.woff2`, `.css`, `.js`, `.svg`, `.png`, `.webmanifest` (or match `URI Path` starts with `/fonts/`) |
| Then | Cache eligibility: Eligible for cache; Edge TTL: 1 year; Browser TTL: 1 year |

This is safe for `/fonts/*` (the files never change) and for `styles.css`/`main.js`
specifically *because* `npm run build` appends a content hash as a query string
(`/styles.css?v=30292a7a`) — the URL changes automatically whenever either file's
content changes, so a 1-year cache never serves stale CSS/JS after a deploy. Leave
HTML pages and `og.png`/`favicon.svg`/`apple-touch-icon.png` off this rule (or on a
short TTL) since those aren't cache-busted — after editing any of those, purge
cache for the specific URL in Cloudflare (Caching → Configuration → Custom Purge).

## Deploying

Static output, deployable to GitHub Pages, Cloudflare Pages, Netlify, or Vercel.
For GitHub Pages: Settings → Pages → Deploy from branch → `master` / `(root)`.
`CNAME` already points it at `sparkison.dev`

If the domain ever changes: update `domain` in `site/data/site.mjs`, `CNAME`,
`robots.txt`, and `sitemap.xml`, then `npm run build`.

## SEO checklist (already wired up)

- Unique title / meta description / canonical per page
- Open Graph + Twitter card with 1200×630 `og.png` (`og:type=profile` on home)
- JSON-LD: `Person`, `WebSite`, `ProfilePage`, `FAQPage`, `Service`,
  `BreadcrumbList`, and `SoftwareApplication` for each m3u app
- `robots.txt` + `sitemap.xml` (bump `lastmod` on meaningful content changes) + `llms.txt`
- On-page FAQ sections mirroring the `FAQPage` schema (AEO: quotable answers)
- Internal links between home ↔ services ↔ m3u-suite
- Semantic HTML, single `h1`, skip link, `prefers-reduced-motion` support
