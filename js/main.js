/* =============================================================
   REVUELT GARAGES — main.js
   Custom cursor, active nav, mobile hamburger menu
   ============================================================= */

'use strict';

/* -------------------------------------------------------------
   0. HERO VIDEO BOOMERANG
   Plays forward, then scrubs backward frame-by-frame (~30fps),
   then plays forward again — continuously.
------------------------------------------------------------- */
/* -------------------------------------------------------------
   0. HERO VIDEO — HLS adaptive streaming via HLS.js
   Safari natively supports HLS; all other browsers use HLS.js.
------------------------------------------------------------- */
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource('https://stream.mux.com/5AkNgyFGc5WEQFPmjDqFKTmQI6oLEpxV8LNB8OzD2B00.m3u8');
    hls.attachMedia(heroVideo);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      heroVideo.play().catch(() => {});
    });
  } else if (heroVideo.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari — native HLS support
    heroVideo.src = 'https://stream.mux.com/5AkNgyFGc5WEQFPmjDqFKTmQI6oLEpxV8LNB8OzD2B00.m3u8';
    heroVideo.play().catch(() => {});
  }
}


/* -------------------------------------------------------------
   1. CUSTOM CURSOR
   - Dot: snaps to exact mouse position each frame
   - Ring: lerps (linear interpolates) toward mouse for lag effect
------------------------------------------------------------- */
(function initCursor() {
  // Only run on pointer-capable devices (not touch)
  const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isHoverCapable) return;

  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Current mouse position (updated on mousemove)
  let mouseX = -100;
  let mouseY = -100;

  // Ring's lagging position (interpolated each RAF)
  let ringX = -100;
  let ringY = -100;

  // Lerp factor — lower = more lag (0.08–0.14 feels natural)
  const LERP = 0.1;

  /** Update mouse coords on every move */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /** RAF loop: move dot instantly, lerp ring */
  function tickCursor() {
    // Dot snaps
    dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;

    // Ring lerps
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

    requestAnimationFrame(tickCursor);
  }
  requestAnimationFrame(tickCursor);

  /** Expand cursor on interactive elements */
  const interactiveSelectors = 'a, button, input, textarea, select, label, [role="button"]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.add('cursor-expanded');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.remove('cursor-expanded');
    }
  });

  /** Hide cursor when leaving window */
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();


/* -------------------------------------------------------------
   2. ACTIVE NAV LINK HIGHLIGHTING
   Uses IntersectionObserver to track which section is in view.
   Updates nav links with `.active` class accordingly.
------------------------------------------------------------- */
(function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav__link');
  if (!navLinks.length) return;

  // Build a map of section ID → nav link for fast lookup
  const linkMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap.set(href.slice(1), link);
    }
  });

  // Track the currently visible section ID
  let activeSectionId = null;

  const setActive = (id) => {
    if (id === activeSectionId) return;
    activeSectionId = id;

    navLinks.forEach((link) => link.classList.remove('active'));
    const activeLink = linkMap.get(id);
    if (activeLink) activeLink.classList.add('active');
  };

  // Observe each section
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      // Trigger when the section crosses the vertical center of the viewport
      rootMargin: '-40% 0px -40% 0px',
      threshold:  0,
    }
  );

  sections.forEach((section) => observer.observe(section));
})();


/* -------------------------------------------------------------
   3. NAV SCROLL STATE
   Adds `.scrolled` class to nav after user scrolls down,
   which darkens the background for readability.
------------------------------------------------------------- */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 40; // px

  const update = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update(); // run once on load
})();


/* -------------------------------------------------------------
   4. MOBILE HAMBURGER MENU
   Toggles `.open` on the mobile menu drawer and updates
   the hamburger button's aria-expanded state.
------------------------------------------------------------- */
(function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  const open = () => {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.removeAttribute('aria-hidden');
    // Prevent body scroll while menu is open
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const toggle = () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  };

  hamburger.addEventListener('click', toggle);

  // Close menu when a link inside it is clicked
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
    link.addEventListener('click', close);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      close();
      hamburger.focus();
    }
  });

  // Close menu if viewport grows past mobile breakpoint
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) close();
  });
})();


/* -------------------------------------------------------------
   5. FOOTER YEAR
   Auto-updates the copyright year so it never goes stale.
------------------------------------------------------------- */
(function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
