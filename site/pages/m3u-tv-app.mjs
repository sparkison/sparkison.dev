import shots from "../data/tv-app-shots.mjs";
import { renderDeviceCarousel } from "../lib/device-mock.mjs";

export default {
  path: "/m3u-suite/m3u-tv/",
  active: "app",
  ogType: "website",
  title: "M3U TV — Watch Your IPTV Library on Any Screen | Shaun Parkison",
  ogTitle: "M3U TV — Watch Your IPTV Library on Any Screen",
  description: "M3U TV is the cross-platform client for the m3u suite — Live TV with a full EPG, movies and series with Trakt sync, and AIOStreams support. Free on iOS, Apple TV, Android, Android TV, macOS, Linux, and Windows.",
  ogDescription: "Live TV with a full EPG, movies and series with Trakt sync, and AIOStreams support. Free on iOS, Apple TV, Android, Android TV, macOS, Linux, and Windows.",
  ogImageAlt: "M3U TV — the m3u suite's cross-platform app for Live TV, movies, and series",
  jsonLd: (data) => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sparkison.dev/m3u-suite/m3u-tv/#webpage",
        "url": "https://sparkison.dev/m3u-suite/m3u-tv/",
        "name": "M3U TV — Watch Your IPTV Library on Any Screen",
        "isPartOf": { "@id": "https://sparkison.dev/#website" },
        "author": { "@id": "https://sparkison.dev/#person" },
        "inLanguage": "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sparkison.dev/" },
          { "@type": "ListItem", "position": 2, "name": "m3u suite", "item": "https://sparkison.dev/m3u-suite/" },
          { "@type": "ListItem", "position": 3, "name": "M3U TV", "item": "https://sparkison.dev/m3u-suite/m3u-tv/" },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://github.com/m3ue/m3u-tv#app",
        "name": "M3U TV",
        "url": "https://sparkison.dev/m3u-suite/m3u-tv/",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "iOS, tvOS, Android, Android TV, macOS, Linux, Windows",
        "description": "Cross-platform client for the m3u suite — Live TV with EPG, movies and series with Trakt sync, and AIOStreams support.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@id": "https://sparkison.dev/#person" },
        "downloadUrl": [data.tvApp.testflight, data.tvApp.playStore, data.tvApp.githubReleases],
        "screenshot": [...shots.desktop, ...shots.tv].map((s) => `https://sparkison.dev/m3u-suite/m3u-tv/img/${s.file}`),
      },
      {
        "@type": "FAQPage",
        "@id": "https://sparkison.dev/m3u-suite/m3u-tv/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is M3U TV free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. M3U TV is free and open source. It's built with Flutter and available on iOS, Apple TV, Android, Android TV, macOS, Linux, and Windows.",
            },
          },
          {
            "@type": "Question",
            "name": "What do I need to use M3U TV?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A running m3u editor server. Point the app at your server's URL and credentials and your Live TV, movies, and series library loads directly into the app.",
            },
          },
          {
            "@type": "Question",
            "name": "What platforms does M3U TV support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "iOS, Apple TV, and macOS via TestFlight beta, Android and Android TV via Google Play, and Linux and Windows builds via GitHub Releases.",
            },
          },
          {
            "@type": "Question",
            "name": "What is AIOStreams support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "M3U TV can connect to an AIOStreams-compatible source alongside your Xtream library, surfacing continue watching, favorites, and popular titles from that source in the same interface.",
            },
          },
          {
            "@type": "Question",
            "name": "Does M3U TV track watch progress?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Continue watching is tracked locally, and M3U TV can optionally sync playback to Trakt so your watch history follows you across devices.",
            },
          },
        ],
      },
    ],
  }),
  main: (data) => `
<!-- ============ PAGE HERO ============ -->
    <section class="page-hero container">
      <ol class="breadcrumb mono">
        <li><a href="/">home</a></li>
        <li><a href="/m3u-suite/">m3u suite</a></li>
        <li aria-current="page">m3u tv</li>
      </ol>
      <p class="eyebrow mono reveal">// the m3u suite · cross-platform client</p>
      <h1 class="reveal">
        Your library,<br>
        <span class="gradient-text">everywhere you watch.</span>
      </h1>
      <p class="lede reveal">
        M3U TV is the living-room front end for the m3u suite — Live TV with a full
        EPG, movies and series with Trakt sync, and AIOStreams support, all wrapped in
        a native-feeling app for every screen you own.
      </p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="${data.tvApp.testflight}" target="_blank" rel="noopener">Join the Apple beta ↗</a>
        <a class="btn btn-primary" href="${data.tvApp.playStore}" target="_blank" rel="noopener">Get it on Google Play ↗</a>
        <a class="btn btn-ghost" href="${data.tvApp.githubReleases}" target="_blank" rel="noopener">Download from GitHub ↗</a>
      </div>
      <dl class="hero-stats reveal">
        <div><dt class="mono">7</dt><dd>platforms, one app</dd></div>
        <div><dt class="mono">5</dt><dd>languages supported</dd></div>
        <div><dt class="mono">100%</dt><dd>free &amp; open source</dd></div>
      </dl>
    </section>

    <!-- ============ DOWNLOAD ============ -->
    <section class="section container" id="download">
      <p class="eyebrow mono reveal">// get it</p>
      <h2 class="reveal">Available <span class="gradient-text">everywhere</span></h2>
      <p class="section-lede reveal">
        Free and open source. Pick your platform below.
      </p>
      <div class="download-cards">
        <div class="download-card reveal">
          <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-200v120h400v-120H280Zm200 100q17 0 28.5-11.5T520-180q0-17-11.5-28.5T480-220q-17 0-28.5 11.5T440-180q0 17 11.5 28.5T480-140ZM280-320h400v-400H280v400Zm0-480h400v-40H280v40Zm0 560v120-120Zm0-560v-40 40Z"/></svg></span>
          <h3>iOS, Apple TV &amp; macOS</h3>
          <p>Public beta via TestFlight</p>
          <a class="btn btn-primary" href="${data.tvApp.testflight}" target="_blank" rel="noopener">Join the beta ↗</a>
        </div>
        <div class="download-card reveal">
          <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="M40-240q9-107 65.5-197T256-580l-74-128q-6-9-3-19t13-15q8-5 18-2t16 12l74 128q86-36 180-36t180 36l74-128q6-9 16-12t18 2q10 5 13 15t-3 19l-74 128q94 53 150.5 143T920-240H40Zm240-110q21 0 35.5-14.5T330-400q0-21-14.5-35.5T280-450q-21 0-35.5 14.5T230-400q0 21 14.5 35.5T280-350Zm400 0q21 0 35.5-14.5T730-400q0-21-14.5-35.5T680-450q-21 0-35.5 14.5T630-400q0 21 14.5 35.5T680-350Z"/></svg></span>
          <h3>Android &amp; Android TV</h3>
          <p>Available now on Google Play</p>
          <a class="btn btn-primary" href="${data.tvApp.playStore}" target="_blank" rel="noopener">Get it on Google Play ↗</a>
        </div>
        <div class="download-card reveal">
          <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="M80-120q-17 0-28.5-11.5T40-160q0-17 11.5-28.5T80-200h800q17 0 28.5 11.5T920-160q0 17-11.5 28.5T880-120H80Zm80-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z"/></svg></span>
          <h3>Linux &amp; Windows</h3>
          <p>Desktop builds via GitHub Releases</p>
          <a class="btn btn-primary" href="${data.tvApp.githubReleases}" target="_blank" rel="noopener">Download from GitHub ↗</a>
        </div>
      </div>
    </section>

    <!-- ============ SCREENSHOTS ============ -->
    <section class="section container" id="screenshots">
      <p class="eyebrow mono reveal">// see it in action</p>
      <h2 class="reveal">On every <span class="gradient-text">screen</span></h2>
      <p class="section-lede reveal">Drag, swipe, or just watch — each preview cycles through the app on its own.</p>
      <div class="devices-row">
        <div class="device-col reveal">
          <p class="device-label">On your laptop</p>
          ${renderDeviceCarousel({ id: "hero-laptop", kind: "laptop", shots: shots.desktop })}
        </div>
        <div class="device-col reveal">
          <p class="device-label">In your pocket</p>
          ${renderDeviceCarousel({ id: "mobile-shots", kind: "phone", shots: shots.mobile })}
        </div>
      </div>
      <div class="devices-row">
        <div class="device-col reveal">
          <p class="device-label">On your TV</p>
          ${renderDeviceCarousel({ id: "tv-shots", kind: "tv", shots: shots.tv })}
        </div>
      </div>
    </section>

    <!-- ============ FEATURES ============ -->
    <section class="section container" id="features">
      <p class="eyebrow mono reveal">// what's inside</p>
      <h2 class="reveal">Built for <span class="gradient-text">watching</span></h2>
      <div class="cards">
        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="m442-380 166-106q18-12 18-34t-18-34L442-660q-20-13-41-2t-21 35v214q0 24 21 35t41-2ZM160-200q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v40q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160v-40H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg></span>
          </div>
          <h3>Live TV &amp; full EPG</h3>
          <p>
            Browse channels by category, search live, favorite the ones you watch
            most, and see what's on next before you switch.
          </p>
        </article>
        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="m160-800 65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h80l65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h80l65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg></span>
          </div>
          <h3>Movies &amp; series library</h3>
          <p>
            Rich detail pages with cast, synopsis, and ratings; season-by-season
            episode browsing; resume exactly where you left off.
          </p>
        </article>
        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z"/></svg></span>
          </div>
          <h3>AIOStreams support</h3>
          <p>
            Connect an AIOStreams source alongside your Xtream library for extra
            continue-watching, favorites, and popular-title rows.
          </p>
        </article>
        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="m233-280 76 76q12 12 11.5 28T308-148q-12 11-28 11.5T252-148L108-292q-6-6-8.5-13T97-320q0-8 2.5-15t8.5-13l144-144q11-11 27.5-11t28.5 11q12 12 12 28.5T308-435l-75 75h567q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280H233Zm494-320H160q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680h567l-76-76q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l144 144q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L708-468q-11 11-27.5 11T652-468q-12-12-12-28.5t12-28.5l75-75Z"/></svg></span>
          </div>
          <h3>Trakt sync</h3>
          <p>
            Optionally scrobble to Trakt so your watch history follows you across
            every device, not just the one you're holding.
          </p>
        </article>
        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="M160-320q-17 0-28.5-11.5T120-360q0-17 11.5-28.5T160-400h240q17 0 28.5 11.5T440-360q0 17-11.5 28.5T400-320H160Zm0-160q-17 0-28.5-11.5T120-520q0-17 11.5-28.5T160-560h400q17 0 28.5 11.5T600-520q0 17-11.5 28.5T560-480H160Zm0-160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h400q17 0 28.5 11.5T600-680q0 17-11.5 28.5T560-640H160Zm494 423q-8 0-15-2.5t-13-8.5l-86-86q-11-11-11.5-27.5T540-370q11-11 27.5-11.5T596-371l58 57 141-141q12-12 28.5-11.5T852-454q11 12 11.5 28T852-398L682-228q-6 6-13 8.5t-15 2.5Z"/></svg></span>
          </div>
          <h3>One app, seven platforms</h3>
          <p>
            iOS, Apple TV, Android, Android TV, macOS, Linux, and Windows — the same
            native-feeling experience everywhere, built from one Flutter codebase.
          </p>
        </article>
        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="m603-202-34 97q-4 11-14 18t-22 7q-20 0-32.5-16.5T496-133l152-402q5-11 15-18t22-7h30q12 0 22 7t15 18l152 403q8 19-4 35.5T868-80q-13 0-22.5-7T831-106l-34-96H603ZM362-401 188-228q-11 11-27.5 11.5T132-228q-11-11-11-28t11-28l174-174q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H80q-17 0-28.5-11.5T40-760q0-17 11.5-28.5T80-800h240v-40q0-17 11.5-28.5T360-880q17 0 28.5 11.5T400-840v40h240q17 0 28.5 11.5T680-760q0 17-11.5 28.5T640-720h-76q-21 72-63 148t-83 116l96 98-30 82-122-125Zm266 129h144l-72-204-72 204Z"/></svg></span>
          </div>
          <h3>Multi-language, secure by default</h3>
          <p>
            Localized in English, German, Spanish, French, and Simplified Chinese,
            with credentials stored securely on-device.
          </p>
        </article>
      </div>
    </section>

    <!-- ============ FAQ ============ -->
    <section class="section container" id="faq">
      <p class="eyebrow mono reveal">// faq</p>
      <h2 class="reveal">App <span class="gradient-text">questions</span></h2>
      <div class="faq-list">
        <details class="faq-item reveal">
          <summary>Is M3U TV free?</summary>
          <p>
            Yes. M3U TV is free and open source, built with Flutter and available on
            iOS, Apple TV, Android, Android TV, macOS, Linux, and Windows.
          </p>
        </details>
        <details class="faq-item reveal">
          <summary>What do I need to use it?</summary>
          <p>
            A running <a href="/m3u-suite/">m3u editor</a> server. Point the app at your server's URL and
            credentials and your Live TV, movies, and series library loads right in.
          </p>
        </details>
        <details class="faq-item reveal">
          <summary>What platforms are supported?</summary>
          <p>
            iOS, Apple TV, and macOS via TestFlight beta, Android and Android TV via
            Google Play, and Linux and Windows via
            <a href="${data.tvApp.githubReleases}" target="_blank" rel="noopener">GitHub Releases</a>.
          </p>
        </details>
        <details class="faq-item reveal">
          <summary>What is AIOStreams support?</summary>
          <p>
            M3U TV can connect to an AIOStreams-compatible source alongside your
            Xtream library, surfacing continue watching, favorites, and popular
            titles from that source in the same interface.
          </p>
        </details>
        <details class="faq-item reveal">
          <summary>Does it track my watch progress?</summary>
          <p>
            Continue watching is tracked locally, and M3U TV can optionally sync
            playback to Trakt so your watch history follows you across devices.
          </p>
        </details>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section class="section container contact" id="contact">
      <p class="eyebrow mono reveal">// part of the suite</p>
      <h2 class="reveal">Built alongside <span class="gradient-text">m3u editor &amp; m3u proxy</span></h2>
      <p class="section-lede reveal">
        M3U TV is the client layer of the m3u suite — see how all three pieces fit
        together, or dig into the source.
      </p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="/m3u-suite/">Explore the m3u suite</a>
        <a class="btn btn-ghost" href="${data.tvApp.repo}" target="_blank" rel="noopener">Source on GitHub ↗</a>
      </div>
    </section>
`,
};
