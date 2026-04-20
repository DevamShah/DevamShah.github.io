/* ============================================
   TERMINAL — Hero typing animation
   ============================================ */

(function () {
  'use strict';
  var lines = document.querySelectorAll('#heroTerm .term-line');
  lines.forEach(function (line, i) {
    line.style.transition = 'opacity .3s ease, transform .3s ease';
    setTimeout(function () {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 120 + i * 100);
  });
})();
