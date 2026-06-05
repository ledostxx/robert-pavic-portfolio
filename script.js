document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-triggered reveal animations ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── Navbar scroll state ──
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  }, { passive: true });

  // ── Mobile nav toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Active nav link highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Skill bar animation ──
  const skillItems = document.querySelectorAll('.skill-item');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const level = item.dataset.level || 75;
        item.style.setProperty('--level', level + '%');
        item.classList.add('animated');
        skillObserver.unobserve(item);
      }
    });
  }, { threshold: 0.3 });

  skillItems.forEach(el => skillObserver.observe(el));

  // ── Smooth image loading ──
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
      img.addEventListener('error', () => img.classList.add('loaded'));
    }
  });

  // ── Parallax on hero gradient ──
  const heroGradient = document.querySelector('.hero-gradient');
  if (heroGradient && window.innerWidth > 900) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroGradient.style.transform = `translateY(${y * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ── Gallery drag-to-scroll ──
  document.querySelectorAll('.gallery-scroll').forEach(gallery => {
    let isDown = false;
    let startX, scrollLeft;

    gallery.addEventListener('mousedown', e => {
      isDown = true;
      gallery.style.cursor = 'grabbing';
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
      isDown = false;
      gallery.style.cursor = 'grab';
    });

    gallery.addEventListener('mouseup', () => {
      isDown = false;
      gallery.style.cursor = 'grab';
    });

    gallery.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      gallery.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });

    gallery.style.cursor = 'grab';
  });

  // ── Click-to-zoom on plans and photos ──
  document.querySelectorAll('.plan-img, .photo-gallery img').forEach(img => {
    img.addEventListener('click', () => {
      img.classList.toggle('zoomed');
      document.body.style.overflow = img.classList.contains('zoomed') ? 'hidden' : '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const zoomed = document.querySelector('.zoomed');
      if (zoomed) {
        zoomed.classList.remove('zoomed');
        document.body.style.overflow = '';
      }
    }
  });

});
