/* site.js — 文档页的入场与手感。
   内容默认可见；只有本文件在运行时才加 .is-in，因此脚本失败时页面依然完整。 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal(nodes, base) {
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var n = 0;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = ((n++ % 6) * 70 + (base || 0)) + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    nodes.forEach(function (el) { io.observe(el); });
  }

  /* 抬头先落，然后图版，最后每张要点卡片依次跟上。
     拆成多次调用，让错峰从各自的分组内重新起算，而不是整页一个队列。 */
  reveal(document.querySelectorAll('.doc-header'), 0);
  reveal(document.querySelectorAll('.header'), 0);
  reveal(document.querySelectorAll('.site-nav'), 0);
  reveal(document.querySelectorAll('.diagram-container'), 120);
  reveal(document.querySelectorAll('.cards .card'), 60);
  reveal(document.querySelectorAll('.doc h2'), 40);
  reveal(document.querySelectorAll('.grid > *'), 60);
  reveal(document.querySelectorAll('.panel'), 60);
})();
