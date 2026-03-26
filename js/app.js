/* ============================================
   APP — Init, Scroll, Nav, Mobile Menu
   ============================================ */

// Consolidated scroll handler (single listener, rAF-throttled)
const scrollProg = document.getElementById('scrollProgress');
const hdr = document.getElementById('siteHeader');
const btt = document.getElementById('backToTop');
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollProg.style.width = h > 0 ? (y / h * 100) + '%' : '0%';
    hdr.classList.toggle('scrolled', y > 60);
    btt.classList.toggle('show', y > 600);
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal on scroll (includes decrypt-reveal)
const revealEls = document.querySelectorAll('.reveal,.stagger,.decrypt-reveal');
const revealObs = new IntersectionObserver(e => {
  e.forEach(x => { if (x.isIntersecting) x.target.classList.add('vis'); });
}, { threshold: .06, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(e => revealObs.observe(e));

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[data-section]');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`nav a[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' });
sections.forEach(s => navObs.observe(s));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// Expertise tiles
document.querySelectorAll('.exp-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const wasActive = tile.classList.contains('active');
    document.querySelectorAll('.exp-tile').forEach(t => t.classList.remove('active'));
    if (!wasActive) tile.classList.add('active');
  });
  tile.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tile.click();
    }
  });
});

// Project cards — click to highlight
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => {
    const wasActive = card.classList.contains('active');
    document.querySelectorAll('.proj-card').forEach(c => c.classList.remove('active'));
    if (!wasActive) card.classList.add('active');
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });
});

// Credential blocks — click to highlight
document.querySelectorAll('.cred-block').forEach(block => {
  block.addEventListener('click', () => {
    const wasActive = block.classList.contains('active');
    document.querySelectorAll('.cred-block').forEach(b => b.classList.remove('active'));
    if (!wasActive) block.classList.add('active');
  });
  block.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); block.click(); }
  });
});

// Timeline entries — click to highlight
document.querySelectorAll('.tl-entry').forEach(entry => {
  entry.addEventListener('click', () => {
    const wasActive = entry.classList.contains('active');
    document.querySelectorAll('.tl-entry').forEach(e => e.classList.remove('active'));
    if (!wasActive) entry.classList.add('active');
  });
  entry.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); entry.click(); }
  });
});


// Dynamic footer year
(function() {
  const footerP = document.querySelector('footer p');
  if (footerP) {
    footerP.innerHTML = footerP.innerHTML.replace(/\d{4}/, new Date().getFullYear());
  }
})();

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
document.querySelectorAll('.photo-grid-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.querySelector('img').src;
    lightboxImg.alt = item.querySelector('img').alt || item.dataset.caption || '';
    lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('open');
  });
});
lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) lightbox.classList.remove('open');
});
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));

// Back to top (scroll handled in consolidated listener)
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Console easter egg for developers
console.log(
  '%c\n  ██████  ██   ██ ██ ███████ ██      ██████  \n' +
  '  ██   ██ ██   ██ ██ ██      ██      ██   ██ \n' +
  '  ██████  ███████ ██ █████   ██      ██   ██ \n' +
  '  ██      ██   ██ ██ ██      ██      ██   ██ \n' +
  '  ██      ██   ██ ██ ███████ ███████ ██████  \n',
  'color: #eab84e; font-family: monospace; font-size: 10px;'
);
console.log(
  '%cYou found the hidden layer. %cI\'d expect nothing less from someone who checks the console.\n\n' +
  '%cLet\'s talk: %cdevamshah91@gmail.com%c | %clinkedin.com/in/thedevam/',
  'color: #9da3b8; font-size: 13px;',
  'color: #e8e4df; font-size: 13px;',
  'color: #9da3b8; font-size: 12px;',
  'color: #eab84e; font-size: 12px; font-weight: bold;',
  'color: #566080; font-size: 12px;',
  'color: #eab84e; font-size: 12px; font-weight: bold;'
);
