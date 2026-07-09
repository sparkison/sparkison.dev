// sparkison.dev — progressive enhancement only; the site works without JS.

// Scroll-reveal
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.documentElement.classList.add("no-observer");
}

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Rotating hero phrases
const rotator = document.querySelector(".rotate-words");
if (rotator && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  try {
    const phrases = JSON.parse(rotator.dataset.phrases);
    let i = 0;
    setInterval(() => {
      rotator.classList.add("is-swapping");
      setTimeout(() => {
        i = (i + 1) % phrases.length;
        rotator.textContent = phrases[i];
        rotator.classList.remove("is-swapping");
      }, 350);
    }, 3800);
  } catch {
    // malformed data-phrases: leave the static text alone
  }
}

// Print button (resume page)
document.getElementById("print-resume")?.addEventListener("click", () => window.print());

// Device screenshot carousels (m3u tv page)
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".mock[data-carousel]").forEach((mock) => {
  const track = mock.querySelector(".mock-track");
  const realSlides = Array.from(track.children);
  if (realSlides.length <= 1) return;

  const realCount = realSlides.length;

  // Clone the first/last slide onto the opposite ends so every interaction
  // mode (arrows, autoplay, drag/swipe) can scroll straight past the "edge"
  // into a visually-identical clone, then get silently repositioned onto the
  // real slide once the scroll settles — that's what makes it loop instead
  // of snapping back or hitting a hard stop.
  const firstClone = realSlides[0].cloneNode(true);
  const lastClone = realSlides[realCount - 1].cloneNode(true);
  for (const clone of [firstClone, lastClone]) {
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("tabindex", "-1");
  }
  track.insertBefore(lastClone, realSlides[0]);
  track.appendChild(firstClone);

  const slides = Array.from(track.children); // [lastClone, ...real, firstClone]
  const dots = Array.from(mock.querySelectorAll(".mock-dot"));
  const prevBtn = mock.querySelector(".mock-arrow.prev");
  const nextBtn = mock.querySelector(".mock-arrow.next");

  let current = 1; // index into `slides`; 1..realCount are the real slides
  let autoplayTimer = null;

  function realIndexOf(pos) {
    if (pos <= 0) return realCount - 1;
    if (pos >= realCount + 1) return 0;
    return pos - 1;
  }

  function updateDots() {
    const real = realIndexOf(current);
    dots.forEach((d, i) => d.classList.toggle("is-active", i === real));
  }

  function goTo(pos, smooth = true) {
    current = pos;
    if (smooth) {
      // Scroll only the track itself — never scrollIntoView, which can
      // still nudge the page's vertical scroll even with block:"nearest".
      track.scrollTo({ left: slides[current].offsetLeft, behavior: "smooth" });
    } else {
      track.scrollLeft = slides[current].offsetLeft;
    }
    updateDots();
  }

  // Once scrolling has been idle for a moment — whether that scroll came
  // from an arrow/dot click, autoplay, or a manual drag/swipe — snap off a
  // clone onto its real counterpart. Same landing position either way, so
  // the reset is invisible. Restoring scroll-snap here too (rather than the
  // instant mouseup restores) means it comes back only once we're already
  // sitting exactly on a slide, so re-enabling it can't cut the drag-release
  // animation short by force-snapping mid-flight.
  function settleOnClone() {
    track.style.scrollSnapType = "";
    if (current === 0) goTo(realCount, false);
    else if (current === realCount + 1) goTo(1, false);
  }

  function closestSlideIndex() {
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let closest = current;
    let closestDist = Infinity;
    slides.forEach((slide, i) => {
      const r = slide.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  }

  function syncFromScroll() {
    const closest = closestSlideIndex();
    if (closest !== current) {
      current = closest;
      updateDots();
    }
  }

  function pauseAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function scheduleAutoplay() {
    if (reduceMotion) return;
    pauseAutoplay();
    autoplayTimer = setInterval(() => goTo(current + 1), 4200);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i + 1);
      scheduleAutoplay();
    });
  });

  prevBtn?.addEventListener("click", () => {
    goTo(current - 1);
    scheduleAutoplay();
  });
  nextBtn?.addEventListener("click", () => {
    goTo(current + 1);
    scheduleAutoplay();
  });

  let scrollRAF;
  let settleTimer;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(scrollRAF);
    scrollRAF = requestAnimationFrame(syncFromScroll);

    clearTimeout(settleTimer);
    settleTimer = setTimeout(settleOnClone, 120);
  });

  // Mouse drag-to-scroll (touch swipe already works natively via overflow-x + scroll-snap)
  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.pageX;
    startScroll = track.scrollLeft;
    // CSS scroll-snap fights a manually-assigned scrollLeft — with snap left
    // on, the track barely appears to move under the cursor before jumping
    // to the nearest slide. Turn snap off for the drag itself so it tracks
    // the mouse 1:1, then explicitly animate to the nearest slide on
    // release using the same smooth scrollTo the arrows/dots/autoplay use.
    track.style.scrollSnapType = "none";
    pauseAutoplay();
  });
  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    // Snap stays off through this animation — settleOnClone() (fired once
    // scrolling actually goes idle) is what turns it back on, so it can't
    // race the transition and cut it short.
    goTo(closestSlideIndex());
    scheduleAutoplay();
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    track.scrollLeft = startScroll - (e.pageX - startX);
  });

  mock.addEventListener("mouseenter", pauseAutoplay);
  mock.addEventListener("mouseleave", scheduleAutoplay);
  mock.addEventListener("touchstart", pauseAutoplay, { passive: true });
  mock.addEventListener("touchend", scheduleAutoplay);

  goTo(1, false);
  scheduleAutoplay();
});

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
