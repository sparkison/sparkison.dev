/**
 * Shared page shell: <head> boilerplate, header/nav, footer, closing
 * script tag. Every page in site/pages/*.mjs provides its own <title>,
 * meta description, JSON-LD graph, and <main> content; this file is the
 * one place that renders the chrome around them.
 */

const PLAY_ARROW = '<svg fill="currentColor" viewBox="0 -960 960 960"><path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"/></svg>';

const GITHUB_ICON = `<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`;

function renderNav(data, activeKey) {
  const items = data.nav
    .map((item) => {
      let href;
      if (item.key === "work") href = activeKey === "home" ? "#work" : "/#work";
      else if (item.key === "contact") href = "#contact";
      else href = item.href;
      const current = item.key === activeKey ? ' aria-current="page"' : "";
      return `<li><a href="${href}"${current}>${item.label}</a></li>`;
    })
    .join("\n        ");

  return `<ul class="nav-links" id="nav-links">
        ${items}
        <li>
          <a class="nav-cta" href="${data.github}" target="_blank" rel="noopener">
            ${GITHUB_ICON}
            GitHub
          </a>
        </li>
      </ul>`;
}

function renderFooter(data) {
  const links = data.footerLinks
    .map((l) => {
      const attrs = l.external ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${l.href}"${attrs}>${l.label}</a>`;
    })
    .join("\n        ");

  return `<footer class="site-footer">
    <div class="container footer-inner">
      <p class="mono">© <span id="year">2026</span> ${data.name}</p>
      <nav class="footer-links mono" aria-label="Footer">
        ${links}
      </nav>
      <p class="mono footer-note">Hand-built. No frameworks, no trackers, just HTML &amp; CSS.</p>
    </div>
  </footer>`;
}

function renderHead(page, data, assetVersion) {
  const url = `${data.domain}${page.path}`;
  const cssHref = assetVersion ? `/styles.css?v=${assetVersion.css}` : "/styles.css";
  const ogImage = page.ogImage ?? data.ogImage;
  const ogImageAlt = page.ogImageAlt ?? data.ogImageAlt;

  const profileTags =
    page.ogType === "profile"
      ? `\n  <meta property="profile:first_name" content="Shaun">
  <meta property="profile:last_name" content="Parkison">
  <meta property="profile:username" content="sparkison">`
      : "";

  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Primary SEO -->
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="author" content="${data.name}">
  <meta name="robots" content="${page.robots ?? "index, follow, max-image-preview:large"}">
  <link rel="canonical" href="${url}">
  <meta name="theme-color" content="${data.themeColor}">

  <!-- Open Graph -->
  <meta property="og:type" content="${page.ogType ?? "website"}">${profileTags}
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="${data.siteName}">
  <meta property="og:title" content="${page.ogTitle ?? page.title}">
  <meta property="og:description" content="${page.ogDescription ?? page.description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${ogImageAlt}">
  <meta property="og:locale" content="en_US">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.ogTitle ?? page.title}">
  <meta name="twitter:description" content="${page.ogDescription ?? page.description}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Icons -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Fonts (self-hosted, no CDN) -->
  <link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin>

  <link rel="stylesheet" href="${cssHref}">
${page.jsonLd ? `\n  <!-- Structured data -->\n  <script type="application/ld+json">\n${JSON.stringify(page.jsonLd, null, 2)}\n  </script>\n` : ""}</head>`;
}

export function renderNotFound(data, assetVersion) {
  const cssHref = assetVersion ? `/styles.css?v=${assetVersion.css}` : "/styles.css";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 — Page not found · ${data.siteName}</title>
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="${data.themeColor}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${cssHref}">
</head>
<body>
  <div class="bg" aria-hidden="true">
    <div class="bg-grid"></div>
    <div class="bg-glow bg-glow-1"></div>
  </div>
  <main class="hero container hero-tall">
    <p class="eyebrow mono">// HTTP 404 — signal lost</p>
    <h1>Channel <span class="gradient-text">not found.</span></h1>
    <p class="lede">This page doesn't exist — maybe it never did, maybe the playlist changed.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="/">Back to the homepage</a>
    </div>
  </main>
</body>
</html>
`;
}

export function renderPage(page, data, assetVersion) {
  const head = renderHead(page, data, assetVersion);
  const nav = renderNav(data, page.active);
  const footer = renderFooter(data);
  const mainAttrs = page.mainClass ? ` class="${page.mainClass}"` : "";
  const brandHref = page.active === "home" ? "#top" : "/";
  const jsSrc = assetVersion ? `/main.js?v=${assetVersion.js}` : "/main.js";

  return `<!doctype html>
<html lang="en">
${head}
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <div class="bg" aria-hidden="true">
    <div class="bg-grid"></div>
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>
  </div>

  <header class="site-header">
    <nav class="nav container" aria-label="Primary">
      <a class="brand" href="${brandHref}" aria-label="${data.siteName} — home">
        <span class="brand-mark" aria-hidden="true">${PLAY_ARROW}</span>${data.brandShort}<span class="brand-tld">${data.brandTld}</span>
      </a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle menu">
        <span></span><span></span>
      </button>
      ${nav}
    </nav>
  </header>

  <main id="main"${mainAttrs}>
${page.main}
  </main>

  ${footer}

  <script src="${jsSrc}" defer></script>
</body>
</html>
`;
}
