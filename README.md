# sparkison.dev

Personal portfolio for **Shaun Parkison** — full stack developer and creator of the
[m3u suite](https://github.com/sparkison/m3u-editor) (m3u editor, m3u proxy, m3u tv).

## Stack

Zero-build static site: hand-written HTML, CSS, and a few lines of vanilla JS.
No frameworks, no bundler, no dependencies — clone it and open `index.html`.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | The whole site: content, meta tags, Open Graph, JSON-LD structured data |
| `styles.css` | All styling (dark theme, custom properties, responsive) |
| `main.js` | Progressive enhancement: scroll-reveal, mobile nav, footer year |
| `404.html` | Not-found page |
| `robots.txt` / `sitemap.xml` | Crawler directives + sitemap |
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

- Title / meta description / canonical
- Open Graph + Twitter card with 1200×630 `og.png`
- JSON-LD: `Person`, `WebSite`, `WebPage`, and `SoftwareApplication` for each m3u app
- `robots.txt` + `sitemap.xml` (bump `lastmod` on meaningful content changes)
- Semantic HTML, single `h1`, skip link, `prefers-reduced-motion` support
