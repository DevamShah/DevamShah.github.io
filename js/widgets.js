/* ============================================
   WIDGETS — Counter, Reading Time, Shortcuts, Konami
   ============================================ */

// ===== VISITOR COUNTER =====
(function () {
  const BASE = 1024;
  const KEY = 'devam_visitor_count';
  const VISIT_KEY = 'devam_visited';
  let count = parseInt(localStorage.getItem(KEY)) || BASE;
  if (!sessionStorage.getItem(VISIT_KEY)) {
    count++;
    localStorage.setItem(KEY, count);
    sessionStorage.setItem(VISIT_KEY, '1');
  }
  const container = document.getElementById('visitorCounter');

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
  }

  renderCount(count);
  setTimeout(() => {
    container.querySelectorAll('.counter-digit').forEach((d, i) => {
      setTimeout(() => d.classList.add('flip'), i * 100);
    });
  }, 500);

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
