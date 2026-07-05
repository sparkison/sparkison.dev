# sparkison.dev

Personal portfolio for **Shaun Parkison** — full stack developer and creator of the
[m3u suite](https://github.com/sparkison/m3u-editor) (m3u editor, m3u proxy, m3u tv).

## Stack

Zero-build static site: hand-written HTML, CSS, and a few lines of vanilla JS.
No frameworks, no bundler, no dependencies — clone it and open `index.html`.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Homepage: hero, m3u suite showcase, stack, about, FAQ, contact |
| `services/index.html` | Landing page for hiring companies & clients ("hire a full stack developer") |
| `m3u-suite/index.html` | Landing page for the m3u suite (features, architecture, install FAQ) |
| `styles.css` | All styling (dark theme, custom properties, responsive) |
| `main.js` | Progressive enhancement: scroll-reveal, mobile nav, footer year |
| `404.html` | Not-found page |
| `robots.txt` / `sitemap.xml` / `llms.txt` | Crawler + answer-engine directives |
| `site.webmanifest` / `favicon.svg` / `apple-touch-icon.png` / `og.png` | Icons & social share image |

## Local preview

Any static file server works:

```sh
npx serve .
# or
python3 -m http.server 8080
```

## Deploying

Deployable as-is to GitHub Pages, Cloudflare Pages, Netlify, or Vercel — no build
step needed. If the domain ever changes, update the canonical URL, Open Graph URLs,
JSON-LD `@id`s, `robots.txt`, and `sitemap.xml`.

## SEO checklist (already wired up)

- Unique title / meta description / canonical per page
- Open Graph + Twitter card with 1200×630 `og.png` (`og:type=profile` on home)
- JSON-LD: `Person`, `WebSite`, `ProfilePage`, `FAQPage`, `Service`,
  `BreadcrumbList`, and `SoftwareApplication` for each m3u app
- `robots.txt` + `sitemap.xml` (bump `lastmod` on meaningful content changes) + `llms.txt`
- On-page FAQ sections mirroring the `FAQPage` schema (AEO: quotable answers)
- Internal links between home ↔ services ↔ m3u-suite
- Semantic HTML, single `h1`, skip link, `prefers-reduced-motion` support
