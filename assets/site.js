// Mobile menu, "info" folder toggle, and the photo-gallery lightbox.
(function () {
  // mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.hidden;
      mobileNav.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  // "info" folder: expands in the mobile menu; on desktop it opens on hover/focus
  document.querySelectorAll('.mobile-nav .folder-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true'));
    });
  });

  // lightbox for [data-lightbox] galleries
  var gallery = document.querySelector('[data-lightbox]');
  if (!gallery) return;
  var links = Array.prototype.slice.call(gallery.querySelectorAll('a'));
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Photo viewer');
  box.innerHTML =
    '<img alt="">' +
    '<button type="button" class="lb-close" aria-label="Close">×</button>' +
    '<button type="button" class="lb-prev" aria-label="Previous photo">‹</button>' +
    '<button type="button" class="lb-next" aria-label="Next photo">›</button>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(box);
  var img = box.querySelector('img');
  var count = box.querySelector('.lb-count');
  var index = 0, lastFocus = null;

  function show(i) {
    index = (i + links.length) % links.length;
    img.src = links[index].getAttribute('href');
    count.textContent = (index + 1) + ' / ' + links.length;
    [-1, 1].forEach(function (d) { // preload neighbours
      new Image().src = links[(index + d + links.length) % links.length].getAttribute('href');
    });
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.hidden = true;
    img.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
  });
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  img.addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
  var startX = null;
  box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
