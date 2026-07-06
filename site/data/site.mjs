/**
 * Central site data. Edit this file to change anything that appears on
 * more than one page — name, contact info, nav, footer, social links,
 * or the live community stats. Run `npm run build` afterward.
 */
export default {
  name: "Shaun Parkison",
  domain: "https://sparkison.dev",
  siteName: "sparkison.dev",
  brandShort: "sparkison",
  brandTld: ".dev",
  themeColor: "#070b12",

  email: "hello@sparkison.dev",
  location: "Fort Collins, CO",
  github: "https://github.com/sparkison",
  githubOrg: "https://github.com/m3ue",
  linkedin: "https://www.linkedin.com/in/shaun-parkison-254a2218/",

  ogImage: "https://sparkison.dev/og.png",
  ogImageAlt: "Shaun Parkison — full stack developer, creator of the m3u suite",

  // Drives scripts/generate-og.mjs — edit and re-run `npm run og` to
  // regenerate og.png without touching the SVG by hand.
  ogCard: {
    eyebrow: "// full stack developer · fort collins, co",
    subtitle: "Creator of the m3u suite — editor · proxy · tv",
    chips: ["Laravel", "Python", "Flutter", "React"],
  },

  // "work" only exists as an in-page anchor on the homepage; every other
  // page links back to it. "contact" is an in-page anchor on every page.
  nav: [
    { key: "work", label: "Work" },
    { key: "suite", label: "m3u suite", href: "/m3u-suite/" },
    { key: "services", label: "Services", href: "/services/" },
    { key: "resume", label: "Resume", href: "/resume/" },
    { key: "contact", label: "Contact" },
  ],

  footerLinks: [
    { label: "m3u suite", href: "/m3u-suite/" },
    { label: "services", href: "/services/" },
    { label: "resume", href: "/resume/" },
    { label: "github", href: "https://github.com/sparkison", external: true },
    { label: "email", href: "mailto:hello@sparkison.dev" },
  ],

  // Kept in sync with `npm run stats` (scripts/update-stats.mjs), which
  // fetches live GitHub/Docker Hub numbers and rewrites these fields.
  stats: {
    starsAll: "900+",
    starsSuite: "890+",
    dockerPulls: "600K+",
    dockerPullsLong: "600,000+",
  },
};
