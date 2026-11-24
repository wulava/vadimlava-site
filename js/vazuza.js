(function () {
  'use strict';
  var box = document.getElementById('lightbox');
  if (!box) return;
  var img = box.querySelector('img');
  var closeBtn = box.querySelector('.vz-lightbox__close');

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    if (typeof box.showModal === 'function') box.showModal();
  }
  function close() {
    if (box.open) box.close();
    img.removeAttribute('src');
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-full]');
    if (!btn) return;
    e.preventDefault();
    var pic = btn.querySelector('img');
    open(btn.getAttribute('data-full'), pic ? pic.getAttribute('alt') : '');
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.open) close();
  });
})();
