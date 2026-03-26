/* ============================================
   WIDGETS — Counter, Reading Time, Shortcuts, Konami
   ============================================ */

// ===== VISITOR COUNTER =====
// Uses multiple free counter APIs with fallback chain.
// Each unique page load increments the shared counter.
(function () {
  const container = document.getElementById('visitorCounter');
  const FALLBACK_BASE = 1024;

  function renderCount(n) {
    const digits = String(n).padStart(6, '0').split('');
    container.innerHTML = '';
    digits.forEach((d, i) => {
      const span = document.createElement('span');
      span.className = 'counter-digit';
      span.textContent = d;
      span.style.animationDelay = (i * 0.08) + 's';
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

  // Attempt 1: CountAPI
  function tryCountAPI() {
    return fetch('https://api.countapi.xyz/hit/devamshah.github.io/visits')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => data.value);
  }

  // Attempt 2: Plausible pageviews (if configured)
  // Falls through to local if not available

  // Fallback: localStorage with per-session increment
  function localFallback() {
    const KEY = 'devam_visit_count';
    const SESSION = 'devam_session_counted';
    let count = parseInt(localStorage.getItem(KEY)) || FALLBACK_BASE;
    if (!sessionStorage.getItem(SESSION)) {
      count++;
      localStorage.setItem(KEY, count);
      sessionStorage.setItem(SESSION, '1');
    }
    return count;
  }

  // Try APIs, fall back gracefully
  tryCountAPI()
    .then(val => renderCount(val))
    .catch(() => renderCount(localFallback()));
})();

// ===== READING TIME =====
(function () {
  const text = document.body.innerText;
  const words = text.split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  document.getElementById('readingTime').textContent = `~ ${mins} min read`;
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
