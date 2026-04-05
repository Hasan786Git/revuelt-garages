'use strict';

window.addEventListener('load', function() {

  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('GSAP loaded:', gsap.version);

  // ── HERO ENTRANCE ──────────────────────────────────────────
  const heroTl = gsap.timeline({ delay: 0.2 });

  heroTl.fromTo('.hero-badge',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
  )
  .fromTo('.hero-small-line',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
    '-=0.3'
  )
  .fromTo('.hero-headline',
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.4'
  )
  .fromTo('.hero-buttons',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.3'
  );

  // ── PRODUCTS ───────────────────────────────────────────────
  gsap.fromTo('.product-card',
    { opacity: 0, y: 80 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#parts',
        start: 'top 75%',
      }
    }
  );

  // ── SAMPLE KIT ─────────────────────────────────────────────
  gsap.fromTo('#sample .sample-kit-content > *',
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#sample',
        start: 'top 70%',
      }
    }
  );

  // ── GARAGE DOORS ───────────────────────────────────────────
  gsap.fromTo('#doors h2',
    { opacity: 0, y: 100, skewY: 3 },
    {
      opacity: 1, y: 0, skewY: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '#doors',
        start: 'top 70%',
      }
    }
  );

  gsap.fromTo('#doors .doors-subline',
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#doors',
        start: 'top 65%',
      }
    }
  );

  gsap.fromTo('#doors .door-types, #doors .badge-pill, #doors .btn-outline',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#doors',
        start: 'top 60%',
      }
    }
  );

  // ── HOW IT WORKS ───────────────────────────────────────────
  gsap.fromTo('.process-step',
    { opacity: 0, y: 80 },
    {
      opacity: 1, y: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#process',
        start: 'top 75%',
      }
    }
  );

  gsap.fromTo('.feature-item',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.feature-strip',
        start: 'top 85%',
      }
    }
  );

  // ── ABOUT ──────────────────────────────────────────────────
  gsap.fromTo('.about-left',
    { opacity: 0, x: -80 },
    {
      opacity: 1, x: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
      }
    }
  );

  gsap.fromTo('.about-right',
    { opacity: 0, x: 80 },
    {
      opacity: 1, x: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
      }
    }
  );

  // COUNT UP STAT
  ScrollTrigger.create({
    trigger: '.stats-row',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const el = document.querySelector(
        '.stat-number[data-count="1000"]'
      );
      if (!el) return;
      gsap.to({ val: 0 }, {
        val: 1000,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: function() {
          el.textContent =
            Math.ceil(this.targets()[0].val).toLocaleString() + '+';
        }
      });
    }
  });

  gsap.fromTo('.mission-strip',
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.mission-strip',
        start: 'top 85%',
      }
    }
  );

  // ── CONTACT ────────────────────────────────────────────────
  gsap.fromTo('.form-left',
    { opacity: 0, x: -80 },
    {
      opacity: 1, x: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
      }
    }
  );

  gsap.fromTo('.form-right',
    { opacity: 0, x: 80 },
    {
      opacity: 1, x: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
      }
    }
  );

  // Refresh ScrollTrigger after everything loads
  ScrollTrigger.refresh();

});
