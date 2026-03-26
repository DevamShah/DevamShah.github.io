/* ============================================
   WIDGETS — Counter, Reading Time, Shortcuts, Konami
   ============================================ */

// ===== VISITOR COUNTER =====
// Server-side counter via hits.dwyl.com — shared across all devices.
// Increments once per unique page load (server decides uniqueness).
(function () {
  const container = document.getElementById('visitorCounter');
  if (!container) return;

  function renderCount(n) {
    container.innerHTML = '';
    const digits = String(n).padStart(6, '0').split('');
    digits.forEach((d, i) => {
      const span = document.createElement('span');
      span.className = 'counter-digit';
      span.textContent = d;
      container.appendChild(span);
      if (i === 2) {
        const dot = document.createElement('span');
        dot.className = 'counter-dot';
        dot.textContent = '\u25CF';
        container.appendChild(dot);
      }
    });
    setTimeout(() => {
      container.querySelectorAll('.counter-digit').forEach((d, i) => {
        setTimeout(() => d.classList.add('flip'), i * 100);
      });
    }, 300);
  }

  // Show loading state
  renderCount(0);

  // Fetch real server-side count
  fetch('https://hits.dwyl.com/DevamShah/DevamShah.github.io.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var count = (parseInt(data.message) || 0) + 1024;
      localStorage.setItem('devam_server_count', count);
      renderCount(count);
    })
    .catch(function() {
      // If API fails, show cached count from localStorage
      var cached = parseInt(localStorage.getItem('devam_server_count')) || 1024;
      renderCount(cached);
    });
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
