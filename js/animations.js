'use strict';

window.addEventListener('load', function initAnimations() {

  // Check GSAP is loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── HERO LOAD-IN ──────────────────────────────────────────────
  const heroTl = gsap.timeline({ delay: 0.3 });
  heroTl
    .from('.hero-badge', {
      opacity: 0, y: 20, duration: 0.6, ease: 'power2.out'
    })
    .from('.hero-small-line', {
      opacity: 0, y: 20, duration: 0.6, ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-headline', {
      opacity: 0, y: 40, duration: 0.8, ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-subtext', {
      opacity: 0, y: 20, duration: 0.6, ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-buttons', {
      opacity: 0, y: 20, duration: 0.6, ease: 'power2.out'
    }, '-=0.3');

  // ── PRODUCTS SECTION ──────────────────────────────────────────
  gsap.from('#parts .section-header', {
    opacity: 0, y: 60, duration: 0.8, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#parts',
      start: 'top 80%',
    }
  });

  gsap.from('.product-card', {
    opacity: 0, y: 60, duration: 0.7, ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.product-card',
      start: 'top 85%',
    }
  });

  // ── FREE SAMPLE KIT ───────────────────────────────────────────
  gsap.from('.orange-accent-line', {
    scaleY: 0, duration: 0.6, ease: 'power2.out',
    transformOrigin: 'top center',
    scrollTrigger: {
      trigger: '#sample',
      start: 'top 80%',
    }
  });

  gsap.from('.sample-kit-content .badge-pill', {
    opacity: 0, y: 30, duration: 0.6, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#sample',
      start: 'top 75%',
    }
  });

  gsap.from('.sample-kit-content h2', {
    opacity: 0, y: 50, duration: 0.8, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#sample',
      start: 'top 75%',
    }
  });

  gsap.from('.sample-kit-content p', {
    opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#sample',
      start: 'top 70%',
    }
  });

  gsap.from('.sample-kit-content .btn-primary', {
    opacity: 0, y: 30, duration: 0.6, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#sample',
      start: 'top 65%',
    }
  });

  // ── GARAGE DOORS ──────────────────────────────────────────────
  gsap.from('#doors .section-label', {
    opacity: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#doors',
      start: 'top 80%',
    }
  });

  gsap.from('#doors h2', {
    opacity: 0, y: 80, duration: 1.0, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#doors',
      start: 'top 75%',
    }
  });

  gsap.from('#doors .doors-subline', {
    opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#doors',
      start: 'top 70%',
    }
  });

  gsap.from('#doors .door-types', {
    opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#doors',
      start: 'top 65%',
    }
  });

  gsap.from('#doors .badge-pill, #doors .btn-outline', {
    opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: '#doors',
      start: 'top 60%',
    }
  });

  // ── HOW IT WORKS ──────────────────────────────────────────────
  gsap.from('#process .section-header', {
    opacity: 0, y: 60, duration: 0.8, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#process',
      start: 'top 80%',
    }
  });

  gsap.from('.process-step', {
    opacity: 0, y: 60, duration: 0.8, ease: 'power2.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.process-step',
      start: 'top 85%',
    }
  });

  gsap.from('.feature-strip .feature-item', {
    opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: '.feature-strip',
      start: 'top 85%',
    }
  });

  // ── ABOUT ─────────────────────────────────────────────────────
  gsap.from('#about .about-left', {
    opacity: 0, x: -60, duration: 0.9, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
    }
  });

  gsap.from('#about .about-right', {
    opacity: 0, x: 60, duration: 0.9, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
    }
  });

  // COUNTING STATS
  const statsEl = document.querySelector('.stats-row');
  if (statsEl) {
    ScrollTrigger.create({
      trigger: '.stats-row',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Count up 1000
        const counter = { val: 0 };
        const target = document.querySelector(
          '.stat-number[data-count="1000"]'
        );
        if (target) {
          gsap.to(counter, {
            val: 1000,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              target.textContent =
                Math.ceil(counter.val).toLocaleString() + '+';
            }
          });
        }
      }
    });
  }

  gsap.from('.mission-strip', {
    opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
    scrollTrigger: {
      trigger: '.mission-strip',
      start: 'top 85%',
    }
  });

  // ── CONTACT ───────────────────────────────────────────────────
  gsap.from('#contact .section-header', {
    opacity: 0, y: 60, duration: 0.8, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
    }
  });

  gsap.from('.form-left', {
    opacity: 0, x: -50, duration: 0.9, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#contact .forms-grid',
      start: 'top 80%',
    }
  });

  gsap.from('.form-right', {
    opacity: 0, x: 50, duration: 0.9, ease: 'power2.out',
    scrollTrigger: {
      trigger: '#contact .forms-grid',
      start: 'top 80%',
    }
  });

  // ── MARQUEE PAUSE ON HOVER ────────────────────────────────────
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  // ── STAT COUNT FOR 1000 ───────────────────────────────────────
  // Add data-count attribute to the 1000+ stat number
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(el => {
    if (el.textContent.includes('1,000') ||
        el.textContent.includes('1000')) {
      el.setAttribute('data-count', '1000');
    }
  });

});
