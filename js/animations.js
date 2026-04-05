'use strict';

window.addEventListener('load', function() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Simple fade-up on all animatable elements
  const elements = document.querySelectorAll(
    '.product-card, .process-step, ' +
    '.feature-item, .stat-item, .mission-strip'
  );

  elements.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Hero load-in
  const heroItems = document.querySelectorAll(
    '.hero-badge, .hero-small-line, ' +
    '.hero-headline, .hero-subtext, .hero-buttons'
  );
  gsap.fromTo(heroItems,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8,
      stagger: 0.15, ease: 'power2.out', delay: 0.3 }
  );

});
