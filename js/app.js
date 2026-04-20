/* APP — Init, Scroll, Nav, Mobile Menu */
(function () {
  'use strict';

  var scrollProg = document.getElementById('scrollProgress');
  var hdr = document.getElementById('siteHeader');
  var btt = document.getElementById('backToTop');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollProg) scrollProg.style.width = h > 0 ? (y / h * 100) + '%' : '0%';
      if (hdr) hdr.classList.toggle('scrolled', y > 60);
      if (btt) btt.classList.toggle('show', y > 600);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var revealEls = document.querySelectorAll('.reveal,.stagger,.decrypt-reveal');
  var revealObs = new IntersectionObserver(function (e) {
    e.forEach(function (x) { if (x.isIntersecting) x.target.classList.add('vis'); });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (e) { revealObs.observe(e); });

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a[data-section]');
  var navObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (a) { a.classList.remove('active'); });
        var active = document.querySelector('nav a[data-section="' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' });
  sections.forEach(function (s) { navObs.observe(s); });

  // F-008: Guard smooth-scroll against bare "#" and invalid selectors
  // F-004: Move focus after scrolling so skip-link actually works (WCAG 2.4.1)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      var t;
      try { t = document.querySelector(href); } catch (err) { return; }
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
      t.focus({ preventScroll: true });
    });
  });

  document.querySelectorAll('.exp-tile, .proj-card, .cred-block, .tl-entry').forEach(function (el) {
    el.addEventListener('click', function () {
      var cls = el.className.split(' ').filter(function (c) { return /^(exp-tile|proj-card|cred-block|tl-entry)$/.test(c); })[0];
      var wasActive = el.classList.contains('active');
      document.querySelectorAll('.' + cls).forEach(function (x) { x.classList.remove('active'); });
      if (!wasActive) el.classList.add('active');
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
    });
  });

  // F-005 + F-006: Keyboard-operable lightbox with ESC close + focus return
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var lastTrigger = null;

  function openLightbox(item) {
    if (!lightbox || !lightboxImg) return;
    var img = item.querySelector('img');
    lightboxImg.src = img ? img.src : '';
    lightboxImg.alt = (img && img.alt) || item.dataset.caption || '';
    if (lightboxCaption) lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lastTrigger = item;
    if (lightboxClose) lightboxClose.focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  document.querySelectorAll('.photo-grid-item').forEach(function (item) {
    if (!item.hasAttribute('role')) item.setAttribute('role', 'button');
    if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
    item.addEventListener('click', function () { openLightbox(item); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item); }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target !== lightboxImg) closeLightbox();
    });
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  // Global ESC: closes lightbox + any open modal (F-006)
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (lightbox && lightbox.classList.contains('open')) { closeLightbox(); return; }
    var openModal = document.querySelector('.modal.open, [role="dialog"].open');
    if (openModal) {
      openModal.classList.remove('open');
      openModal.setAttribute('aria-hidden', 'true');
    }
  });

  if (btt) btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  console.log(
    '%cDr. Devam R Shah — CISO & AI Security Leader\n%cdevamshah91@gmail.com · linkedin.com/in/thedevam/',
    'color:#eab84e;font-weight:bold;font-size:13px;',
    'color:#9da3b8;font-size:12px;'
  );
})();
