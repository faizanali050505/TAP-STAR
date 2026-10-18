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

  // ─── Navbar Scroll Glassmorphism & Floating WhatsApp Reveal ───
  const nav = document.querySelector('.nav');
  const heroSection = document.querySelector('.hero');
  const floatingWhatsapp = document.querySelector('.floating-whatsapp');

  const handleScrollEffects = () => {
    const scrollY = window.scrollY;

    // Glass effect on navbar
    if (scrollY > 25) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    // Floating WhatsApp button: hidden in Hero, visible after scrolling past Hero
    if (floatingWhatsapp) {
      const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : -1;
      if (heroBottom <= 120) {
        floatingWhatsapp.classList.add('is-visible');
      } else {
        floatingWhatsapp.classList.remove('is-visible');
      }
    }
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects();

  // ─── Mobile Hamburger Menu ───
  const hamburger = document.querySelector('.nav-hamburger');
  const menuOverlay = document.querySelector('.nav-menu-overlay');

  if (hamburger && menuOverlay) {
    const closeMenu = () => {
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      menuOverlay.classList.remove('is-open');
      body.style.overflow = '';
    };

    const openMenu = () => {
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      menuOverlay.classList.add('is-open');
      body.style.overflow = 'hidden';
    };

    hamburger.addEventListener('click', () => {
      if (menuOverlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on link click
    const menuLinks = menuOverlay.querySelectorAll('.nav-menu-link');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on clicking backdrop
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) {
        closeMenu();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOverlay.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Reset overflow if resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991 && menuOverlay.classList.contains('is-open')) {
        closeMenu();
      }
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
      
      if (targetId === '#' || targetId === '#hero') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navOffset = nav ? (nav.getBoundingClientRect().height + 24) : 70;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navOffset;
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
  }, { threshold: 0.15 });

  counters.forEach(el => counterObserver.observe(el));

  // ─── 3D Interactive Card Tilt (Desktop) ───
  const heroCardWrap = document.querySelector('.hero-image-wrap');

  if (heroSection && heroCardWrap && window.matchMedia('(hover: hover)').matches) {
    let ticking = false;

    // Reset animation-fill-mode interference once page entrance completes
    heroCardWrap.addEventListener('animationend', () => {
      heroCardWrap.style.animation = 'none';
    }, { once: true });

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
      let tiltTicking = false;

      card.addEventListener('mousemove', (e) => {
        if (!tiltTicking) {
          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
            tiltTicking = false;
          });
          tiltTicking = true;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
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

  // ─── Trusted Marquee Seamless Loop ───
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const items = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = items + items;
  }

  // ─── Testimonials Marquee Seamless Loop ───
  const reviewTracks = document.querySelectorAll('.marquee-track-reviews');
  reviewTracks.forEach(track => {
    const items = track.innerHTML;
    track.innerHTML = items + items;
  });

  // ─── Products Carousel Logic (Accurate Offset, Responsive & Touch Swipe) ───
  const track = document.getElementById('products-track');
  const btnPrev = document.getElementById('prod-prev');
  const btnNext = document.getElementById('prod-next');

  if (track && btnPrev && btnNext) {
    let currentIndex = 0;
    const items = track.children;
    const totalItems = items.length;
    
    const getItemsToShow = () => {
      if (window.matchMedia('(max-width: 640px)').matches) return 1;
      if (window.matchMedia('(max-width: 1024px)').matches) return 2;
      return 3;
    };

    const updateCarousel = () => {
      const itemsToShow = getItemsToShow();
      const maxIndex = Math.max(0, totalItems - itemsToShow);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      if (items.length > 0) {
        const cardWidth = items[0].getBoundingClientRect().width;
        const computedGap = parseFloat(window.getComputedStyle(track).gap) || 24;
        const shift = currentIndex * (cardWidth + computedGap);
        track.style.transform = `translateX(-${shift}px)`;
      }

      btnPrev.disabled = currentIndex === 0;
      btnNext.disabled = currentIndex >= maxIndex;
      btnPrev.style.opacity = currentIndex === 0 ? '0.35' : '1';
      btnNext.style.opacity = currentIndex >= maxIndex ? '0.35' : '1';
      btnPrev.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
      btnNext.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    };

    btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    btnNext.addEventListener('click', () => {
      const itemsToShow = getItemsToShow();
      const maxIndex = Math.max(0, totalItems - itemsToShow);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Touch Swipe support for Mobile
    let touchStartX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      isSwiping = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;
      const itemsToShow = getItemsToShow();
      const maxIndex = Math.max(0, totalItems - itemsToShow);

      if (Math.abs(diffX) > 40) {
        if (diffX > 0 && currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
        } else if (diffX < 0 && currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      }
    }, { passive: true });

    // Responsive update on resize
    const handleResize = () => {
      const itemsToShow = getItemsToShow();
      Array.from(items).forEach(item => {
        if (itemsToShow === 1) {
          item.style.flex = '0 0 100%';
        } else if (itemsToShow === 2) {
          item.style.flex = '0 0 calc(50% - 0.75rem)';
        } else {
          item.style.flex = '0 0 calc(33.333% - 1rem)';
        }
      });
      updateCarousel();
    };

    window.addEventListener('resize', handleResize);
    // Initial call to set sizes
    handleResize();
  }

  console.log('⭐ TapStar — Tap. Scan. Grow. (Elevated & Fast)');
});
