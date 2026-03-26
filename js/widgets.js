/* ============================================
   WIDGETS — Counter, Reading Time, Shortcuts, Konami
   ============================================ */

// ===== VISITOR COUNTER =====
// Increments on EVERY page load (not unique — total hits).
// Uses localStorage as persistent store. Each refresh = +1.
(function () {
  const container = document.getElementById('visitorCounter');
  const KEY = 'devam_total_hits';
  const BASE = 1024;

  // Increment on every single page load
  let count = parseInt(localStorage.getItem(KEY)) || BASE;
  count++;
  localStorage.setItem(KEY, count);

  // Render the flip counter
  const digits = String(count).padStart(6, '0').split('');
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

  // Flip animation on load
  setTimeout(() => {
    container.querySelectorAll('.counter-digit').forEach((d, i) => {
      setTimeout(() => d.classList.add('flip'), i * 100);
    });
  }, 300);
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
