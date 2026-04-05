'use strict';

document.addEventListener('DOMContentLoaded', function() {

  // Add fade-up class to animatable elements
  const fadeUpTargets = [
    '.product-card',
    '.process-step',
    '.feature-item',
    '.stat-item',
    '.mission-strip',
    '#parts .section-header',
    '#sample .sample-kit-content',
    '#process .section-header',
    '#contact .section-header',
    '.contact-info-bar',
  ];

  fadeUpTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fade-up');
    });
  });

  // Add fade-left/right to about columns
  const aboutLeft = document.querySelector('.about-left');
  const aboutRight = document.querySelector('.about-right');
  if (aboutLeft) aboutLeft.classList.add('fade-left');
  if (aboutRight) aboutRight.classList.add('fade-right');

  const formLeft = document.querySelector('.form-left');
  const formRight = document.querySelector('.form-right');
  if (formLeft) formLeft.classList.add('fade-left');
  if (formRight) formRight.classList.add('fade-right');

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all animated elements
  document.querySelectorAll(
    '.fade-up, .fade-left, .fade-right'
  ).forEach(el => observer.observe(el));

  // Counting stat for 1,000+
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        let start = 0;
        const end = 1000;
        const duration = 2000;
        const step = (end / duration) * 16;

        const timer = setInterval(() => {
          start += step;
          if (start >= end) {
            el.textContent = '1,000+';
            clearInterval(timer);
          } else {
            el.textContent = Math.ceil(start).toLocaleString() + '+';
          }
        }, 16);

        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => {
    if (el.textContent.includes('1,000') ||
        el.textContent.includes('1000')) {
      countObserver.observe(el);
    }
  });

  // Hero entrance animation on load
  const heroElements = [
    '.hero-badge',
    '.hero-small-line',
    '.hero-headline',
    '.hero-subtext',
    '.hero-buttons'
  ];

  heroElements.forEach((selector, index) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.transitionDelay = (index * 0.15) + 's';

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + (index * 150));
    }
  });

});
