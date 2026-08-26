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
    { label: "m3u tv app", href: "/m3u-suite/m3u-tv/" },
    { label: "services", href: "/services/" },
    { label: "resume", href: "/resume/" },
    { label: "github", href: "https://github.com/sparkison", external: true },
    { label: "email", href: "mailto:hello@sparkison.dev" },
  ],

  // Store/release links for the m3u tv app — edit here, not in site/pages/.
  tvApp: {
    repo: "https://github.com/m3ue/m3u-tv",
    testflight: "https://testflight.apple.com/join/hqJYVsJr",
    playStore: "https://play.google.com/store/apps/details?id=dev.sparkison.tv",
    microsoftStore: "https://apps.microsoft.com/detail/9P2PBHQ4XZ1L",
    githubReleases: "https://github.com/m3ue/m3u-tv/releases",
  },

  // Kept in sync with `npm run stats` (scripts/update-stats.mjs), which
  // fetches live GitHub/Docker Hub numbers and rewrites these fields.
  stats: {
    starsAll: "900+",
    starsSuite: "900+",
    dockerPulls: "600K+",
    dockerPullsLong: "600,000+",
  },
};
