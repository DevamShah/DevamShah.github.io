/* COUNTERS — Metric scramble + easeOutExpo */
(function () {
  'use strict';

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounters() {
    var els = document.querySelectorAll('.metric-val');
    els.forEach(function (el, idx) {
      var target = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || '';
      var labelEl = el.closest('.metric');
      var label = labelEl ? labelEl.querySelector('.metric-label') : null;
      var stagger = idx * 100;
      var scrambleDuration = 150;
      var countDuration = 800;
      var suffixDelay = 40;

      el.classList.add('counting');
      el.textContent = '0';

      var scrambleStart = performance.now() + stagger;
      function scramble(now) {
        if (now < scrambleStart) { requestAnimationFrame(scramble); return; }
        if (now - scrambleStart < scrambleDuration) {
          el.textContent = Math.floor(Math.random() * target * 1.5) + 1;
          requestAnimationFrame(scramble);
        } else {
          startCountUp();
        }
      }

      function startCountUp() {
        var countStart = performance.now();
        function countUp(now) {
          var t = Math.min((now - countStart) / countDuration, 1);
          el.textContent = Math.round(easeOutExpo(t) * target);
          if (t < 1) requestAnimationFrame(countUp);
          else { el.textContent = target; typeSuffix(); }
        }
        requestAnimationFrame(countUp);
      }

      function typeSuffix() {
        if (!suffix) { finish(); return; }
        var chars = suffix.split('');
        var i = 0;
        function typeNext() {
          if (i < chars.length) {
            el.textContent = target + chars.slice(0, i + 1).join('');
            i++;
            setTimeout(typeNext, suffixDelay);
          } else {
            finish();
          }
        }
        setTimeout(typeNext, 80);
      }

      function finish() {
        el.classList.remove('counting');
        if (label) label.classList.add('show');
      }

      requestAnimationFrame(scramble);
    });
  }

  var metricsEl = document.querySelector('.hero-metrics');
  if (!metricsEl) return;
  var counterObs = new IntersectionObserver(function (e) {
    e.forEach(function (x) {
      if (x.isIntersecting) { animateCounters(); counterObs.unobserve(x.target); }
    });
  }, { threshold: 0.3 });
  counterObs.observe(metricsEl);
})();
