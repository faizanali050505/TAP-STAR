/* ============================================
   TAPSTAR — Main JavaScript
   Ultra-Smooth Interactions, Tilt & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  // ─── Instant Cinematic Page Reveal ───
  requestAnimationFrame(() => {
    body.classList.add('page-loaded');
  });

  // ─── Navbar Scroll Glassmorphism ───
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Glass effect on scroll
    if (scrollY > 30) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // ─── Mobile Hamburger Menu ───
  const hamburger = document.querySelector('.nav-hamburger');
  const menuOverlay = document.querySelector('.nav-menu-overlay');

  if (hamburger && menuOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      menuOverlay.classList.toggle('is-open');

      if (menuOverlay.classList.contains('is-open')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    const menuLinks = menuOverlay.querySelectorAll('.nav-menu-link');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        menuOverlay.classList.remove('is-open');
        body.style.overflow = '';
      });
    });
  }

  // ─── High-End Scroll Reveal Observer ───
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Smooth Anchor Scrolling ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── Smooth Counter Animation ───
  const counters = document.querySelectorAll('[data-counter]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        let current = 0;
        const stepTime = 16;
        const totalDuration = 1200;
        const totalSteps = totalDuration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current) + suffix;
        }, stepTime);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => counterObserver.observe(el));

  // ─── 3D Interactive Card Tilt (Desktop) ───
  const heroSection = document.querySelector('.hero');
  const heroCardWrap = document.querySelector('.hero-image-wrap');

  if (heroSection && heroCardWrap && window.matchMedia('(hover: hover)').matches) {
    let ticking = false;

    heroSection.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = heroSection.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          heroCardWrap.style.transform = `perspective(1000px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateZ(10px)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      heroCardWrap.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
      heroCardWrap.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    heroSection.addEventListener('mouseenter', () => {
      heroCardWrap.style.transition = 'transform 0.1s ease-out';
    });
  }

  // ─── Product Cards 3D Micro-Tilt ───
  const productCards = document.querySelectorAll('.product-card');
  if (window.matchMedia('(hover: hover)').matches) {
    productCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ─── Fake QR Pattern Generator with Deterministic Finder Eyes ───
  const qrGrid = document.querySelector('.scanme-qr-inner');
  if (qrGrid) {
    const size = 11;
    const pattern = [];

    for (let i = 0; i < size * size; i++) {
      const row = Math.floor(i / size);
      const col = i % size;

      // Corner squares (standard QR finder patterns)
      const isTopLeft = (row < 3 && col < 3);
      const isTopRight = (row < 3 && col >= size - 3);
      const isBottomLeft = (row >= size - 3 && col < 3);

      const isCornerBorder = (
        (row === 0 || row === 2) && col < 3 ||
        (row < 3) && (col === 0 || col === 2) ||
        (row === 0 || row === 2) && col >= size - 3 ||
        (row < 3) && (col === size - 1 || col === size - 3) ||
        (row === size - 1 || row === size - 3) && col < 3 ||
        (row >= size - 3) && (col === 0 || col === 2)
      );

      const isCornerCenter = (
        (row === 1 && col === 1) ||
        (row === 1 && col === size - 2) ||
        (row === size - 2 && col === 1)
      );

      if (isCornerBorder || isCornerCenter) {
        pattern.push(true);
      } else if (isTopLeft || isTopRight || isBottomLeft) {
        pattern.push(false);
      } else {
        const hash = (row * 7 + col * 13 + row * col) % 5;
        pattern.push(hash < 2);
      }
    }

    qrGrid.innerHTML = '';
    pattern.forEach(filled => {
      const span = document.createElement('span');
      if (!filled) span.classList.add('empty');
      qrGrid.appendChild(span);
    });
  }

  // ─── Star Ratings ───
  document.querySelectorAll('.stars').forEach(el => {
    const count = parseInt(el.getAttribute('data-stars') || '5', 10);
    el.innerHTML = '★'.repeat(count);
  });

  // ─── Dynamic Footer Year ───
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ─── Marquee Seamless Loop ───
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const items = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = items + items;
  }

  console.log('⭐ TapStar — Tap. Scan. Grow. (Elevated & Fast)');
});
