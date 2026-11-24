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
