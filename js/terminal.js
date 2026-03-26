/* ============================================
   TERMINAL — Hero typing animation
   ============================================ */

(function () {
  const lines = document.querySelectorAll('#heroTerm .term-line');
  lines.forEach((line, i) => {
    line.style.transition = 'opacity .45s ease, transform .45s ease';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 350 + i * 280);
  });
})();
