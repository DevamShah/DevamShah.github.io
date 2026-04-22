/* WIDGETS — Shortcuts, Konami */
(function () {
  'use strict';

  var shortcutsModal = document.getElementById('shortcutsModal');

  // Section shortcut map — K shortcuts (Alt+letter for non-ambiguous activation)
  var map = {
    h: '#hero',
    a: '#ai-security-leader',
    e: '#ai-security-expertise',
    c: '#ai-security-experience',
    p: '#ai-security-projects',
    b: '#ai-security-blog',
    k: '#ai-security-contact'
  };

  document.addEventListener('keydown', function (e) {
    var tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    var key = e.key.toLowerCase();
    if (key === '?' && shortcutsModal) {
      var isOpen = shortcutsModal.classList.toggle('open');
      shortcutsModal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      return;
    }
    // ESC closing handled globally in app.js
    if (shortcutsModal && shortcutsModal.classList.contains('open')) return;
    if (map[key]) {
      var el = document.querySelector(map[key]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }
    }
  });

  // Konami
  var code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  var pos = 0;
  document.addEventListener('keydown', function (e) {
    if (e.code === code[pos]) {
      pos++;
      if (pos === code.length) { document.body.classList.toggle('hacker-mode'); pos = 0; }
    } else { pos = 0; }
  });
})();
