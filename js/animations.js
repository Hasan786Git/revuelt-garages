/* =============================================================
   REVUELT GARAGES — animations.js
   GSAP + ScrollTrigger entrance animations.
   Runs after main.js and GSAP CDN scripts are loaded.
   ============================================================= */

'use strict';

/* Wait for GSAP to be available (loaded via defer CDN tags) */
window.addEventListener('load', function initAnimations() {
  // Guard: if GSAP or ScrollTrigger aren't loaded, bail silently
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Revuelt: GSAP not loaded — skipping animations.');
    // Ensure all animated elements are visible even without GSAP
    document.querySelectorAll(
      '.process-step, .parts-card, .about-stat__num, .fade-up, .stagger-children > *, .parts-card'
    ).forEach(el => {
      el.style.opacity  = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  /* -----------------------------------------------------------
     Shared defaults for ScrollTrigger
  ----------------------------------------------------------- */
  const ST_DEFAULTS = {
    start:   'top 85%',  // trigger when element top is 85% down viewport
    end:     'top 40%',
    toggleActions: 'play none none none',
  };

  /* -----------------------------------------------------------
     Helper: fade-up a set of elements with optional stagger
  ----------------------------------------------------------- */
  function fadeUp(targets, opts = {}) {
    if (!document.querySelectorAll(targets).length) return;
    gsap.to(targets, {
      opacity:  1,
      y:        0,
      duration: opts.duration ?? 0.75,
      ease:     opts.ease ?? 'power3.out',
      stagger:  opts.stagger ?? 0,
      scrollTrigger: {
        trigger: opts.trigger ?? targets,
        ...ST_DEFAULTS,
        ...opts.scrollTrigger,
      },
    });
  }

  /* -----------------------------------------------------------
     1. HERO — animate on page load (no ScrollTrigger needed)
  ----------------------------------------------------------- */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.section--hero .section__label', { opacity: 0, y: 20, duration: 0.6 }, 0.3)
    .from('.hero__badge',              { opacity: 0, y: 16, duration: 0.5 }, 0.5)
    .from('.hero__heading-small',      { opacity: 0, y: 20, duration: 0.6 }, 0.65)
    .from('.hero__heading',            { opacity: 0, y: 48, duration: 0.9 }, 0.72)
    .from('.hero__actions .btn', {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.12,
    }, 1.05)
    .from('.scroll-indicator',         { opacity: 0, duration: 0.5 }, 1.35);

  /* -----------------------------------------------------------
     2. SECTION LABELS (all except hero)
  ----------------------------------------------------------- */
  document.querySelectorAll('.section:not(.section--hero) .section__label').forEach((el) => {
    gsap.from(el, {
      opacity:  0,
      x:        -20,
      duration: 0.5,
      ease:     'power2.out',
      scrollTrigger: { trigger: el, ...ST_DEFAULTS },
    });
  });

  /* -----------------------------------------------------------
     3. SECTION HEADINGS
  ----------------------------------------------------------- */
  document.querySelectorAll('.section:not(.section--hero) .section__heading').forEach((el) => {
    gsap.from(el, {
      opacity:  0,
      y:        48,
      duration: 0.85,
      ease:     'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  /* -----------------------------------------------------------
     4. SECTION BODY TEXT
  ----------------------------------------------------------- */
  document.querySelectorAll('.section__body').forEach((el) => {
    gsap.from(el, {
      opacity:  0,
      y:        28,
      duration: 0.7,
      ease:     'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  /* -----------------------------------------------------------
     5. PARTS CARDS — fade-up with 0.1s stagger
     Initial opacity/transform set in CSS on .parts-card
  ----------------------------------------------------------- */
  if (document.querySelector('.parts-card')) {
    gsap.to('.parts-card', {
      opacity:   1,
      y:         0,
      duration:  0.65,
      ease:      'power3.out',
      stagger:   0.1,
      scrollTrigger: {
        trigger: '.parts-grid',
        start:   'top 82%',
      },
    });
  }

  /* -----------------------------------------------------------
     6. PROCESS STEPS — staggered slide-in from left
  ----------------------------------------------------------- */
  if (document.querySelector('.process-step')) {
    gsap.to('.process-step', {
      opacity:   1,
      x:         0,
      duration:  0.65,
      ease:      'power3.out',
      stagger:   0.15,
      scrollTrigger: {
        trigger: '.process-steps',
        start:   'top 80%',
      },
    });
  }

  /* -----------------------------------------------------------
     7. ABOUT STATS — pop in with slight scale
  ----------------------------------------------------------- */
  if (document.querySelector('.about-stat__num')) {
    gsap.to('.about-stat__num', {
      opacity:  1,
      y:        0,
      duration: 0.6,
      ease:     'back.out(1.4)',
      stagger:  0.1,
      scrollTrigger: {
        trigger: '.about-stats',
        start:   'top 85%',
      },
    });
  }

  /* -----------------------------------------------------------
     8. DOORS SECTION — cinematic scroll entrance
     Elements animate in sequence: headline → subline → types → badge → cta
  ----------------------------------------------------------- */
  if (document.querySelector('.doors-section')) {
    const doorsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.doors-section',
        start:   'top 75%',
      },
    });

    doorsTl
      /* Labels fade in first, quickly */
      .from('.doors-labels', {
        opacity:  0,
        x:        -24,
        duration: 0.45,
        ease:     'power2.out',
      })
      /* Headline slides up dramatically */
      .to('.doors-heading', {
        opacity:   1,
        y:         0,
        duration:  0.85,
        ease:      'power3.out',
      }, '-=0.1')
      /* Subline follows 0.2s behind */
      .to('.doors-subline', {
        opacity:   1,
        y:         0,
        duration:  0.7,
        ease:      'power3.out',
      }, '-=0.65')
      /* Door types strip */
      .to('.doors-types', {
        opacity:   1,
        y:         0,
        duration:  0.55,
        ease:      'power2.out',
      }, '-=0.45')
      /* Badge pops in */
      .to('.doors-badge', {
        opacity:   1,
        y:         0,
        duration:  0.4,
        ease:      'back.out(1.4)',
      }, '-=0.2')
      /* CTA last */
      .to('.doors-cta', {
        opacity:   1,
        y:         0,
        duration:  0.4,
        ease:      'power2.out',
      }, '-=0.1');
  }

  /* -----------------------------------------------------------
     9. CONTACT DETAILS — slide up with stagger
  ----------------------------------------------------------- */
  if (document.querySelector('.contact-detail')) {
    gsap.from('.contact-detail', {
      opacity:  0,
      y:        20,
      duration: 0.55,
      ease:     'power2.out',
      stagger:  0.1,
      scrollTrigger: {
        trigger: '.contact-details',
        start:   'top 85%',
      },
    });
  }

  /* -----------------------------------------------------------
     10. SAMPLE SECTION — sequential fade-ups
     Initial states are set in CSS on each element.
  ----------------------------------------------------------- */
  if (document.querySelector('.sample-section')) {
    const sampleTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sample-section',
        start:   'top 78%',
      },
    });

    sampleTl
      .to('.sample-accent', {
        opacity:   1,
        scaleY:    1,
        duration:  0.5,
        ease:      'power2.out',
      })
      .to('.sample-badge', {
        opacity:   1,
        y:         0,
        duration:  0.45,
        ease:      'power2.out',
      }, '-=0.1')
      .to('.sample-heading', {
        opacity:   1,
        y:         0,
        duration:  0.7,
        ease:      'power3.out',
      }, '-=0.1')
      .to('.sample-body', {
        opacity:   1,
        y:         0,
        duration:  0.6,
        ease:      'power2.out',
      }, '-=0.2')
      .to('.sample-btn', {
        opacity:   1,
        y:         0,
        duration:  0.5,
        ease:      'power2.out',
      }, '-=0.15')
      .to('.sample-fine', {
        opacity:   1,
        duration:  0.4,
        ease:      'power1.out',
      }, '-=0.1');
  }

  /* -----------------------------------------------------------
     11. CONTACT FORM — fade up as a unit
  ----------------------------------------------------------- */
  if (document.querySelector('.contact-form')) {
    gsap.from('.contact-form', {
      opacity:  0,
      y:        32,
      duration: 0.75,
      ease:     'power3.out',
      scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
    });
  }
});
