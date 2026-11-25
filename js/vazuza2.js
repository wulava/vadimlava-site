(function () {
  'use strict';

  function perView(track, slides) {
    if (!slides.length) return 1;
    var tw = track.clientWidth;
    var sw = slides[0].getBoundingClientRect().width;
    if (sw <= 0) return 1;
    return Math.max(1, Math.round(tw / sw));
  }

  function slideLeft(track, slide) {
    var tr = track.getBoundingClientRect();
    var sr = slide.getBoundingClientRect();
    return sr.left - tr.left + track.scrollLeft;
  }

  function currentIndex(track, slides) {
    var x = track.scrollLeft;
    var best = 0;
    var bestDist = Infinity;
    for (var i = 0; i < slides.length; i++) {
      var d = Math.abs(slideLeft(track, slides[i]) - x);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  }

  function initSlider(root) {
    var track = root.querySelector('.vz2-slider__track');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.vz2-slider__slide'));
    var prev = root.querySelector('.vz2-slider__arrow--prev');
    var next = root.querySelector('.vz2-slider__arrow--next');
    var dotsBox = root.querySelector('.vz2-slider__dots');
    if (!track || !slides.length) return;

    var dots = [];
    if (dotsBox) {
      dotsBox.innerHTML = '';
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'vz2-slider__dot';
        b.setAttribute('aria-label', 'Слайд ' + (i + 1));
        b.addEventListener('click', function () { go(i); });
        dotsBox.appendChild(b);
        dots.push(b);
      });
    }

    function maxIndex() {
      return Math.max(0, slides.length - perView(track, slides));
    }

    function go(i, instant) {
      i = Math.max(0, Math.min(i, maxIndex()));
      var left = slideLeft(track, slides[i]);
      if (instant) {
        var prevBehavior = track.style.scrollBehavior;
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = left;
        track.style.scrollBehavior = prevBehavior;
      } else {
        track.scrollTo({ left: left, behavior: 'smooth' });
      }
      update();
    }

    function update() {
      var i = currentIndex(track, slides);
      var max = maxIndex();
      if (prev) prev.disabled = i <= 0;
      if (next) next.disabled = i >= max;
      dots.forEach(function (d, n) {
        var on = n === i;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-current', on ? 'true' : 'false');
      });
    }

    if (prev) prev.addEventListener('click', function () { go(currentIndex(track, slides) - 1); });
    if (next) next.addEventListener('click', function () { go(currentIndex(track, slides) + 1); });

    track.addEventListener('scroll', function () {
      if (track._vz2raf) return;
      track._vz2raf = requestAnimationFrame(function () {
        track._vz2raf = 0;
        update();
      });
    }, { passive: true });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(currentIndex(track, slides) - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(currentIndex(track, slides) + 1); }
      if (e.key === 'Home') { e.preventDefault(); go(0); }
      if (e.key === 'End') { e.preventDefault(); go(maxIndex()); }
    });

    window.addEventListener('resize', function () { update(); });
    update();
  }

  document.querySelectorAll('[data-vz2-slider]').forEach(initSlider);
})();

(function () {
  'use strict';
  var box = document.getElementById('zapis');
  var toggle = document.getElementById('signupToggle');
  if (!box || !toggle) return;

  var panel = document.getElementById('signup-contacts');
  var inner = box.querySelector('.vz2-signup__panel-inner');

  function setOpen(open) {
    box.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!panel || !inner) return;
    if (open) {
      panel.style.maxHeight = inner.scrollHeight + 'px';
    } else {
      panel.style.maxHeight = inner.scrollHeight + 'px';
      panel.offsetHeight;
      panel.style.maxHeight = '0px';
    }
  }

  function isOpen() {
    return box.classList.contains('is-open');
  }

  function afterScroll(fn) {
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      fn();
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', finish, { once: true });
    } else {
      var last = window.pageYOffset;
      var still = 0;
      var id = setInterval(function () {
        if (window.pageYOffset === last) {
          still++;
          if (still >= 4) { clearInterval(id); finish(); }
        } else {
          still = 0;
          last = window.pageYOffset;
        }
      }, 50);
      setTimeout(function () { clearInterval(id); finish(); }, 1200);
    }
    setTimeout(finish, 1400);
  }

  function scrollToSignup() {
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    setOpen(!isOpen());
  });

  document.querySelectorAll('.js-open-signup').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var already = isOpen();
      scrollToSignup();
      afterScroll(function () {
        if (!already) setOpen(true);
        else setOpen(true);
      });
    });
  });

  if (location.hash === '#zapis' || location.hash === '#signup-contacts') {
    setOpen(true);
  }
})();
