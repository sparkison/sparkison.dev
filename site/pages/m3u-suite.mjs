export default {
  path: "/m3u-suite/",
  active: "suite",
  ogType: "website",
  title: "The m3u Suite — Open Source, Self-Hosted IPTV Tools | Shaun Parkison",
  ogTitle: "The m3u Suite — Open Source, Self-Hosted IPTV Tools",
  description: "The m3u suite is a set of free, open source, self-hosted IPTV tools: m3u editor for playlist and EPG management, m3u proxy for hardware-accelerated stream delivery, and m3u tv for Android TV and Apple TV. Deploy with Docker.",
  ogDescription: "m3u editor for playlists &amp; EPG, m3u proxy for hardware-accelerated stream delivery, m3u tv for Android TV &amp; Apple TV. Free, open source, Docker-ready.",
  ogImageAlt: "The m3u suite by Shaun Parkison — editor, proxy, and tv",
  jsonLd: {"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://sparkison.dev/m3u-suite/#webpage","url":"https://sparkison.dev/m3u-suite/","name":"The m3u Suite — Open Source, Self-Hosted IPTV Tools","isPartOf":{"@id":"https://sparkison.dev/#website"},"author":{"@id":"https://sparkison.dev/#person"},"inLanguage":"en-US"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://sparkison.dev/"},{"@type":"ListItem","position":2,"name":"m3u suite","item":"https://sparkison.dev/m3u-suite/"}]},{"@type":"ItemList","@id":"https://sparkison.dev/m3u-suite/#list","name":"The m3u suite","description":"Open source, self-hosted IPTV tools by Shaun Parkison.","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://github.com/sparkison/m3u-editor#app"}},{"@type":"ListItem","position":2,"item":{"@id":"https://github.com/sparkison/m3u-proxy#app"}},{"@type":"ListItem","position":3,"item":{"@id":"https://github.com/m3ue/m3u-tv#app"}}]},{"@type":"SoftwareApplication","@id":"https://github.com/sparkison/m3u-editor#app","name":"m3u editor","url":"https://github.com/sparkison/m3u-editor","applicationCategory":"MultimediaApplication","operatingSystem":"Docker, Linux","description":"A full-featured, self-hosted IPTV playlist editor with EPG management, Xtream API output, .strm file sync, and post-processing automation.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"author":{"@id":"https://sparkison.dev/#person"},"softwareHelp":{"@type":"CreativeWork","url":"https://m3ue.sparkison.dev/"}},{"@type":"SoftwareApplication","@id":"https://github.com/sparkison/m3u-proxy#app","name":"m3u proxy","url":"https://github.com/sparkison/m3u-proxy","applicationCategory":"MultimediaApplication","operatingSystem":"Docker, Linux","description":"A high-performance IPTV streaming proxy with failover support, comprehensive API management, and hardware-accelerated transcoding via FFmpeg.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"author":{"@id":"https://sparkison.dev/#person"}},{"@type":"SoftwareApplication","@id":"https://github.com/m3ue/m3u-tv#app","name":"m3u tv","url":"https://github.com/m3ue/m3u-tv","applicationCategory":"MultimediaApplication","operatingSystem":"Android TV, Apple TV, iOS, Android","description":"A cross-platform TV front-end player for m3u editor, bringing your library to Android TV, Apple TV, and mobile devices.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"author":{"@id":"https://sparkison.dev/#person"}},{"@type":"FAQPage","@id":"https://sparkison.dev/m3u-suite/#faq","mainEntity":[{"@type":"Question","name":"What is m3u editor?","acceptedAnswer":{"@type":"Answer","text":"m3u editor is a free, self-hosted IPTV playlist manager. It imports m3u, m3u8, m3u+ playlists and Xtream codes APIs, manages EPG data from XMLTV files, URLs, or Schedules Direct, outputs an Xtream-compatible API, syncs .strm files for media servers, and automates post-processing with scripts, webhooks, and email — features comparable to xteve or threadfin, and more."}},{"@type":"Question","name":"Is the m3u suite free?","acceptedAnswer":{"@type":"Answer","text":"Yes. All three applications — m3u editor, m3u proxy, and m3u tv — are open source and free to use. Source code, releases, and issue trackers are on GitHub."}},{"@type":"Question","name":"How do I install the m3u suite?","acceptedAnswer":{"@type":"Answer","text":"m3u editor and m3u proxy deploy with Docker. Run m3u editor as a single container to start, or run separate m3u editor, m3u proxy, and Redis containers for more control and hardware-accelerated transcoding. Step-by-step guides are at m3ue.sparkison.dev."}},{"@type":"Question","name":"What platforms does m3u tv support?","acceptedAnswer":{"@type":"Answer","text":"m3u tv is built with Flutter and runs on Android TV, Apple TV, and mobile devices. It connects to your m3u editor server with secure credential storage."}}]}]},
  main: (data) => `
<!-- ============ PAGE HERO ============ -->
    <section class="page-hero container">
      <ol class="breadcrumb mono">
        <li><a href="/">home</a></li>
        <li aria-current="page">m3u suite</li>
      </ol>
      <p class="eyebrow mono reveal">// open source · self-hosted · docker-ready</p>
      <h1 class="reveal">
        Your streams,<br>
        <span class="gradient-text">your server, your rules.</span>
      </h1>
      <p class="lede reveal">
        The m3u suite is a family of free, open source IPTV tools — curate playlists
        and EPG data, deliver streams with hardware acceleration, and watch it all
        from the couch.
      </p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="https://m3ue.sparkison.dev/" target="_blank" rel="noopener">Read the docs ↗</a>
        <a class="btn btn-ghost" href="https://github.com/sparkison/m3u-editor" target="_blank" rel="noopener">Star on GitHub ↗</a>
      </div>
      <dl class="hero-stats reveal">
        <div><dt class="mono" data-stat="stars-suite">${data.stats.starsSuite}</dt><dd>GitHub stars across the suite</dd></div>
        <div><dt class="mono" data-stat="docker-pulls">${data.stats.dockerPulls}</dt><dd>Docker pulls</dd></div>
        <div><dt class="mono">100%</dt><dd>open source &amp; free</dd></div>
      </dl>
    </section>

    <!-- ============ THE APPS ============ -->
    <section class="section container" id="apps">
      <p class="eyebrow mono reveal">// the apps</p>
      <h2 class="reveal">Three tools, <span class="gradient-text">one pipeline</span></h2>

      <div class="cards">
        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="M160-320q-17 0-28.5-11.5T120-360q0-17 11.5-28.5T160-400h240q17 0 28.5 11.5T440-360q0 17-11.5 28.5T400-320H160Zm0-160q-17 0-28.5-11.5T120-520q0-17 11.5-28.5T160-560h400q17 0 28.5 11.5T600-520q0 17-11.5 28.5T560-480H160Zm0-160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h400q17 0 28.5 11.5T600-680q0 17-11.5 28.5T560-640H160Zm494 423q-8 0-15-2.5t-13-8.5l-86-86q-11-11-11.5-27.5T540-370q11-11 27.5-11.5T596-371l58 57 141-141q12-12 28.5-11.5T852-454q11 12 11.5 28T852-398L682-228q-6 6-13 8.5t-15 2.5Z"/></svg></span>
            <span class="chip-row"><span class="chip">Laravel</span><span class="chip">PHP</span></span>
          </div>
          <h3><a href="https://github.com/sparkison/m3u-editor" target="_blank" rel="noopener">m3u editor</a></h3>
          <p>The control center — import, curate, and serve your playlists.</p>
          <ul class="feature-list">
            <li>Works with m3u, m3u8, m3u+ &amp; Xtream codes APIs</li>
            <li>EPG from XMLTV files, URLs, or Schedules Direct</li>
            <li>Xtream API output for any client</li>
            <li><code>.strm</code> file sync for media servers</li>
            <li>Post-processing: scripts, webhooks, email</li>
          </ul>
          <p class="card-links mono">
            <a href="https://github.com/sparkison/m3u-editor" target="_blank" rel="noopener">source ↗</a>
            <a href="https://m3ue.sparkison.dev/" target="_blank" rel="noopener">docs ↗</a>
          </p>
        </article>

        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="m233-280 76 76q12 12 11.5 28T308-148q-12 11-28 11.5T252-148L108-292q-6-6-8.5-13T97-320q0-8 2.5-15t8.5-13l144-144q11-11 27.5-11t28.5 11q12 12 12 28.5T308-435l-75 75h567q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280H233Zm494-320H160q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680h567l-76-76q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l144 144q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L708-468q-11 11-27.5 11T652-468q-12-12-12-28.5t12-28.5l75-75Z"/></svg></span>
            <span class="chip-row"><span class="chip">Python</span><span class="chip">FFmpeg</span></span>
          </div>
          <h3><a href="https://github.com/sparkison/m3u-proxy" target="_blank" rel="noopener">m3u proxy</a></h3>
          <p>The delivery layer — restream or transcode, at speed.</p>
          <ul class="feature-list">
            <li>High-performance stream proxying</li>
            <li>Automatic failover between sources</li>
            <li>GPU-accelerated transcoding via FFmpeg</li>
            <li>Direct proxy mode when transcoding isn't needed</li>
            <li>Comprehensive management API</li>
          </ul>
          <p class="card-links mono">
            <a href="https://github.com/sparkison/m3u-proxy" target="_blank" rel="noopener">source ↗</a>
            <a href="https://m3ue.sparkison.dev/docs/deployment/m3u-proxy-integration/" target="_blank" rel="noopener">integration ↗</a>
          </p>
        </article>

        <article class="card reveal">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true"><svg fill="currentColor" viewBox="0 -960 960 960"><path d="m442-380 166-106q18-12 18-34t-18-34L442-660q-20-13-41-2t-21 35v214q0 24 21 35t41-2ZM160-200q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v40q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160v-40H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg></span>
            <span class="chip-row"><span class="chip">Flutter</span><span class="chip">Dart</span></span>
          </div>
          <h3><a href="https://github.com/m3ue/m3u-tv" target="_blank" rel="noopener">m3u tv</a></h3>
          <p>The living-room front end — your library on every screen.</p>
          <ul class="feature-list">
            <li>Native-feeling player for Android TV &amp; Apple TV</li>
            <li>Mobile support from the same codebase</li>
            <li>Connects straight to your m3u editor server</li>
            <li>Secure credential storage</li>
          </ul>
          <p class="card-links mono">
            <a href="https://github.com/m3ue/m3u-tv" target="_blank" rel="noopener">source ↗</a>
          </p>
        </article>
      </div>
    </section>

    <!-- ============ ARCHITECTURE ============ -->
    <section class="section container" id="architecture">
      <p class="eyebrow mono reveal">// how it fits together</p>
      <h2 class="reveal">From playlist to <span class="gradient-text">picture</span></h2>
      <ol class="step-list">
        <li class="reveal">
          <div>
            <h3>Curate in m3u editor</h3>
            <p>
              Import playlists and EPG sources, organize channels and series, and expose
              a clean Xtream-compatible API — one container to start, or split services
              for more control.
            </p>
          </div>
        </li>
        <li class="reveal">
          <div>
            <h3>Deliver through m3u proxy</h3>
            <p>
              Pair the editor with m3u proxy (plus Redis) for restreaming, failover, and
              hardware-accelerated transcoding when clients need a different format.
            </p>
          </div>
        </li>
        <li class="reveal">
          <div>
            <h3>Watch with m3u tv — or anything else</h3>
            <p>
              Use the suite's own TV app, or point any Xtream-compatible client at your
              server. Your setup, your choice.
            </p>
          </div>
        </li>
      </ol>

      <div class="beyond reveal">
        <h3 class="beyond-title">Get started in minutes</h3>
        <p>
          Everything ships as Docker images with step-by-step guides at
          <a href="https://m3ue.sparkison.dev/" target="_blank" rel="noopener">m3ue.sparkison.dev</a>.
          Questions or feature ideas? The
          <a href="https://github.com/sparkison/m3u-editor/issues" target="_blank" rel="noopener">issue tracker</a>
          is active and answered.
        </p>
      </div>
    </section>

    <!-- ============ FAQ ============ -->
    <section class="section container" id="faq">
      <p class="eyebrow mono reveal">// faq</p>
      <h2 class="reveal">Suite <span class="gradient-text">questions</span></h2>
      <div class="faq-list">
        <details class="faq-item reveal">
          <summary>What is m3u editor?</summary>
          <p>
            A free, self-hosted IPTV playlist manager. It imports m3u, m3u8, m3u+
            playlists and Xtream codes APIs, manages EPG data from XMLTV files, URLs, or
            Schedules Direct, outputs an Xtream-compatible API, syncs <code>.strm</code>
            files for media servers, and automates post-processing with scripts,
            webhooks, and email — features comparable to xteve or threadfin, and more.
          </p>
        </details>
        <details class="faq-item reveal">
          <summary>Is the m3u suite free?</summary>
          <p>
            Yes. All three applications — m3u editor, m3u proxy, and m3u tv — are open
            source and free to use. Source code, releases, and issue trackers are on
            <a href="https://github.com/sparkison" target="_blank" rel="noopener">GitHub</a>.
          </p>
        </details>
        <details class="faq-item reveal">
          <summary>How do I install it?</summary>
          <p>
            With Docker. Run m3u editor as a single container to start, or run separate
            m3u editor, m3u proxy, and Redis containers for more control and
            hardware-accelerated transcoding. Step-by-step guides live at
            <a href="https://m3ue.sparkison.dev/" target="_blank" rel="noopener">m3ue.sparkison.dev</a>.
          </p>
        </details>
        <details class="faq-item reveal">
          <summary>What platforms does m3u tv support?</summary>
          <p>
            m3u tv is built with Flutter and runs on Android TV, Apple TV, and mobile
            devices. It connects to your m3u editor server with secure credential storage.
          </p>
        </details>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section class="section container contact" id="contact">
      <p class="eyebrow mono reveal">// built by</p>
      <h2 class="reveal">Made by <span class="gradient-text">Shaun Parkison</span></h2>
      <p class="section-lede reveal">
        I build the m3u suite in the open — and I bring the same end-to-end approach
        to client and team work.
      </p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="/services/">Work with me</a>
        <a class="btn btn-ghost" href="/">More about me</a>
      </div>
    </section>
`,
};
