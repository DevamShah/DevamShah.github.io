/* Blog Listing — fetch posts.json, render cards, filter by year */
(function () {
  'use strict';

  var grid = document.getElementById('blogGrid');
  var filterBar = document.getElementById('blogFilters');
  var countEl = document.getElementById('blogCount');
  if (!grid) return;

  var allPosts = [];
  var activeYear = 'all';

  fetch('/blog/posts.json')
    .then(function (r) { return r.json(); })
    .then(function (posts) {
      allPosts = posts;
      buildFilters(posts);
      render(posts);
    })
    .catch(function () {
      grid.innerHTML = '<p style="color:var(--text-muted);font-family:var(--mono);font-size:13px;">Unable to load posts.</p>';
    });

  function buildFilters(posts) {
    if (!filterBar) return;
    var years = [];
    posts.forEach(function (p) {
      if (years.indexOf(p.year) === -1) years.push(p.year);
    });
    years.sort(function (a, b) { return b - a; });

    var html = '<button class="blog-year-btn active" data-year="all">All</button>';
    years.forEach(function (y) {
      html += '<button class="blog-year-btn" data-year="' + y + '">' + y + '</button>';
    });
    filterBar.innerHTML = html;

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.blog-year-btn');
      if (!btn) return;
      activeYear = btn.getAttribute('data-year');
      filterBar.querySelectorAll('.blog-year-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filtered = activeYear === 'all' ? allPosts : allPosts.filter(function (p) { return String(p.year) === activeYear; });
      render(filtered);
    });
  }

  function render(posts) {
    if (countEl) countEl.textContent = posts.length + ' post' + (posts.length !== 1 ? 's' : '');

    if (posts.length === 0) {
      grid.innerHTML = '<p style="color:var(--text-muted);font-family:var(--mono);font-size:13px;">No posts yet for this year.</p>';
      return;
    }

    var html = '';
    posts.forEach(function (p) {
      var tags = '';
      if (p.tags) {
        p.tags.forEach(function (t) {
          tags += '<span class="blog-tag">' + esc(t) + '</span>';
        });
      }
      var dateStr = formatDate(p.date);
      html += '<a class="blog-card" href="' + esc(p.url) + '">' +
        '<div class="blog-card-body">' +
          '<div class="blog-meta">' +
            '<span class="blog-date">' + esc(dateStr) + '</span>' +
            '<span class="blog-category">' + esc(p.category) + '</span>' +
          '</div>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p class="blog-excerpt">' + esc(p.excerpt) + '</p>' +
          '<span class="blog-read-more">Read more</span>' +
        '</div>' +
        '<div class="blog-tags">' + tags + '</div>' +
      '</a>';
    });
    grid.innerHTML = html;
  }

  function formatDate(iso) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var parts = iso.split('-');
    return months[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
  }

  function esc(s) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
  }
})();
