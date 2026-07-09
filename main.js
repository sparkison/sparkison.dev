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
  const slides = Array.from(track.children);
  if (slides.length <= 1) return;

  const dots = Array.from(mock.querySelectorAll(".mock-dot"));
  const prevBtn = mock.querySelector(".mock-arrow.prev");
  const nextBtn = mock.querySelector(".mock-arrow.next");

  let current = 0;
  let autoplayTimer = null;

  function setActive(index) {
    current = (index + slides.length) % slides.length;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
  }

  function goTo(index) {
    setActive(index);
    // Scroll only the track itself — never scrollIntoView, which can still
    // nudge the page's vertical scroll even with block:"nearest".
    track.scrollTo({ left: slides[current].offsetLeft, behavior: "smooth" });
  }

  function syncFromScroll() {
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let closestDist = Infinity;
    slides.forEach((slide, i) => {
      const r = slide.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    if (closest !== current) setActive(closest);
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
      goTo(i);
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
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(scrollRAF);
    scrollRAF = requestAnimationFrame(syncFromScroll);
  });

  // Mouse drag-to-scroll (touch swipe already works natively via overflow-x + scroll-snap)
  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.pageX;
    startScroll = track.scrollLeft;
    pauseAutoplay();
  });
  window.addEventListener("mouseup", () => {
    if (dragging) scheduleAutoplay();
    dragging = false;
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    track.scrollLeft = startScroll - (e.pageX - startX);
  });

  mock.addEventListener("mouseenter", pauseAutoplay);
  mock.addEventListener("mouseleave", scheduleAutoplay);
  mock.addEventListener("touchstart", pauseAutoplay, { passive: true });
  mock.addEventListener("touchend", scheduleAutoplay);

  setActive(0);
  scheduleAutoplay();
});

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
