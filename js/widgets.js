/* ============================================
   WIDGETS — Counter, Reading Time, Shortcuts, Konami
   ============================================ */

// ===== VISITOR COUNTER =====
// Server-side tracking via hits.dwyl.com (hidden image — bypasses CORS).
// Display uses fetch with no-cors mode to trigger hit + localStorage for display.
// Increments only on hard refresh (navigation, not soft refresh via cache).
(function () {
  var container = document.getElementById('visitorCounter');
  if (!container) return;
  var BASE = 1024;
  var KEY = 'devam_hit_count';
  var LAST_NAV = 'devam_last_nav_type';

  function renderCount(n) {
    container.innerHTML = '';
    var digits = String(n).padStart(6, '0').split('');
    digits.forEach(function(d, i) {
      var span = document.createElement('span');
      span.className = 'counter-digit';
      span.textContent = d;
      container.appendChild(span);
      if (i === 2) {
        var dot = document.createElement('span');
        dot.className = 'counter-dot';
        dot.textContent = '\u25CF';
        container.appendChild(dot);
      }
    });
    setTimeout(function() {
      var allDigits = container.querySelectorAll('.counter-digit');
      for (var i = 0; i < allDigits.length; i++) {
        (function(idx) {
          setTimeout(function() { allDigits[idx].classList.add('flip'); }, idx * 100);
        })(i);
      }
    }, 300);
  }

  // Detect if this is a hard refresh / new navigation (not soft refresh / back-forward cache)
  var isHardLoad = true;
  if (window.performance && window.performance.navigation) {
    // type 0 = navigate, 1 = reload, 2 = back/forward
    isHardLoad = (window.performance.navigation.type <= 1);
  }
  if (window.performance && window.performance.getEntriesByType) {
    var navEntry = window.performance.getEntriesByType('navigation')[0];
    if (navEntry) {
      // 'navigate' = new visit, 'reload' = hard refresh — both count
      // 'back_forward' = browser cache — don't count
      isHardLoad = (navEntry.type === 'navigate' || navEntry.type === 'reload');
    }
  }

  var count = parseInt(localStorage.getItem(KEY)) || BASE;

  if (isHardLoad) {
    count++;
    localStorage.setItem(KEY, count);

    // Also ping server-side counter (fire and forget — image always works)
    var img = new Image();
    img.src = 'https://hits.dwyl.com/DevamShah/DevamShah.github.io.svg?' + Date.now();
  }

  renderCount(count);
})();

// ===== READING TIME =====
(function () {
  const el = document.getElementById('readingTime');
  if (!el) return;
  const text = document.body.innerText;
  const words = text.split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  el.textContent = `~ ${mins} min read`;
})();

// ===== KEYBOARD SHORTCUTS =====
const shortcutsModal = document.getElementById('shortcutsModal');

document.addEventListener('keydown', e => {
  // Ignore when typing in inputs or when modifier keys are held (Ctrl+C, Cmd+V, etc.)
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const key = e.key.toLowerCase();
  if (key === '?') { shortcutsModal.classList.toggle('open'); return; }
  if (shortcutsModal.classList.contains('open')) { if (key === 'escape') shortcutsModal.classList.remove('open'); return; }
  if (key === 'escape') { document.getElementById('lightbox').classList.remove('open'); return; }
  const map = { h: '#hero', a: '#about', e: '#expertise', c: '#career', p: '#projects', k: '#contact' };
  if (map[key]) {
    const el = document.querySelector(map[key]);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
});

// ===== KONAMI CODE =====
(function () {
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.code === code[pos]) {
      pos++;
      if (pos === code.length) {
        document.body.classList.toggle('hacker-mode');
        pos = 0;
      }
    } else { pos = 0; }
  });
})();
