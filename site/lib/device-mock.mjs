/**
 * Renders a device-frame carousel (laptop, phone, or tv) around a list of
 * screenshots from site/data/tv-app-shots.mjs. Scrolling is native
 * (overflow-x + scroll-snap) so touch swipe works for free; main.js adds
 * autoplay, dot/arrow navigation, and mouse drag-to-scroll on top.
 */

const CHEVRON_LEFT = '<svg fill="currentColor" viewBox="0 -960 960 960"><path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"/></svg>';
const CHEVRON_RIGHT = '<svg fill="currentColor" viewBox="0 -960 960 960"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>';

const EXTRA_BY_KIND = {
  laptop: '<div class="mock-base"></div>',
  tv: '<div class="mock-stand"><div class="mock-stand-neck"></div><div class="mock-stand-foot"></div></div>',
  phone: '<div class="mock-notch"></div>',
};

export function renderDeviceCarousel({ id, kind, shots }) {
  if (!shots?.length) return "";

  const slides = shots
    .map(
      (s, i) =>
        `<img class="mock-slide" src="/m3u-tv/img/${s.file}" width="${s.width}" height="${s.height}" alt="${s.alt}" loading="${i === 0 ? "eager" : "lazy"}">`
    )
    .join("\n            ");

  const dots = shots
    .map((_, i) => `<button class="mock-dot" aria-label="Show screenshot ${i + 1} of ${shots.length}"></button>`)
    .join("\n          ");

  const extra = EXTRA_BY_KIND[kind] ?? "";

  return `<div class="mock mock-${kind}" id="${id}" data-carousel>
        ${kind === "phone" ? extra : ""}
        <div class="mock-screen">
          <div class="mock-track" tabindex="0" role="group" aria-label="${id} screenshots">
            ${slides}
          </div>
          <button class="mock-arrow prev" aria-label="Previous screenshot">${CHEVRON_LEFT}</button>
          <button class="mock-arrow next" aria-label="Next screenshot">${CHEVRON_RIGHT}</button>
        </div>
        ${kind !== "phone" ? extra : ""}
        <div class="mock-dots">
          ${dots}
        </div>
      </div>`;
}
