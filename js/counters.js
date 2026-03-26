/* ============================================
   COUNTERS — Metric scramble + easeOutExpo
   Number counts up first, then suffix types in
   ============================================ */

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCounters() {
  const els = document.querySelectorAll('.metric-val');
  els.forEach((el, idx) => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const label = el.closest('.metric').querySelector('.metric-label');
    const stagger = idx * 250;
    const scrambleDuration = 400;
    const countDuration = 1800;
    const suffixDelay = 120; // ms per suffix character

    el.classList.add('counting');
    el.textContent = '0';

    // Phase 1: Scramble — random numbers only (no suffix)
    const scrambleStart = performance.now() + stagger;
    function scramble(now) {
      if (now < scrambleStart) { requestAnimationFrame(scramble); return; }
      const elapsed = now - scrambleStart;
      if (elapsed < scrambleDuration) {
        el.textContent = Math.floor(Math.random() * target * 1.5) + 1;
        requestAnimationFrame(scramble);
      } else {
        startCountUp();
      }
    }

    // Phase 2: Smooth count-up (number only)
    function startCountUp() {
      const countStart = performance.now();
      function countUp(now) {
        const t = Math.min((now - countStart) / countDuration, 1);
        const eased = easeOutExpo(t);
        el.textContent = Math.round(eased * target);
        if (t < 1) {
          requestAnimationFrame(countUp);
        } else {
          el.textContent = target;
          typeSuffix();
        }
      }
      requestAnimationFrame(countUp);
    }

    // Phase 3: Type suffix one character at a time
    function typeSuffix() {
      if (!suffix) {
        finish();
        return;
      }
      const chars = suffix.split('');
      let i = 0;
      function typeNext() {
        if (i < chars.length) {
          el.textContent = target + chars.slice(0, i + 1).join('');
          i++;
          setTimeout(typeNext, suffixDelay);
        } else {
          finish();
        }
      }
      setTimeout(typeNext, 80); // small pause before suffix starts
    }

    // Phase 4: Done — remove glow, reveal label
    function finish() {
      el.classList.remove('counting');
      if (label) label.classList.add('show');
    }

    requestAnimationFrame(scramble);
  });
}

const metricsEl = document.querySelector('.hero-metrics');
const counterObs = new IntersectionObserver(e => {
  e.forEach(x => {
    if (x.isIntersecting) { animateCounters(); counterObs.unobserve(x.target); }
  });
}, { threshold: .3 });
counterObs.observe(metricsEl);
