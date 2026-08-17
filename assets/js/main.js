/* HIMALAYA — site behaviour
   No dependencies. Every feature degrades gracefully if its markup is absent. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sticky header ---------------------------------------------------- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile nav ------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---- background video -------------------------------------------------- */
  /* Ships with no src so we can decide whether it is worth the bytes. */
  var heroVideo = document.querySelector('[data-hero-video]');
  if (heroVideo) {
    var conn = navigator.connection || {};
    /* Only genuinely slow links opt out. This used to include 3g, but phones
       on ordinary cellular report effectiveType "3g" all the time, which meant
       the video silently never loaded on mobile. */
    var slowLink = /^(slow-2g|2g)$/.test(conn.effectiveType || '');
    var small = window.matchMedia('(max-width: 900px)').matches;

    if (!reduceMotion && conn.saveData !== true && !slowLink) {
      var reveal = function () { heroVideo.classList.add('is-ready'); };

      var startVideo = function () {
        /* Reveal on whichever event arrives first. Relying on canplay alone
           left the video playing behind opacity:0 on iOS, which looks exactly
           like the video failing to start. */
        ['loadeddata', 'canplay', 'canplaythrough', 'playing'].forEach(function (ev) {
          heroVideo.addEventListener(ev, reveal, { once: true });
        });
        // last resort: if it has frames, show it regardless of which events fired
        setTimeout(function () { if (heroVideo.readyState >= 2) reveal(); }, 2500);

        var url = heroVideo.getAttribute(small ? 'data-mp4-sm' : 'data-mp4');
        if (url) {
          var source = document.createElement('source');
          source.src = url;
          source.type = 'video/mp4';
          heroVideo.appendChild(source);
          heroVideo.load();
        }

        var tryPlay = function () {
          var played = heroVideo.play();
          if (played && typeof played.catch === 'function') played.catch(function () {});
        };
        tryPlay();

        /* iOS refuses autoplay outright in Low Power Mode, and occasionally
           until the page has been touched. Retry once on the first interaction
           rather than leaving a frozen poster. */
        ['touchstart', 'click'].forEach(function (ev) {
          document.addEventListener(ev, function once() {
            document.removeEventListener(ev, once);
            if (heroVideo.paused) tryPlay();
          }, { passive: true });
        });
      };
      if (document.readyState === 'complete') startVideo();
      else window.addEventListener('load', startVideo, { once: true });
    }

    // Do not animate a hero nobody is looking at.
    document.addEventListener('visibilitychange', function () {
      if (!heroVideo.currentSrc) return;
      if (document.hidden) {
        heroVideo.pause();
      } else {
        var r = heroVideo.play();
        if (r && typeof r.catch === 'function') r.catch(function () {});
      }
    });
  }

  /* ---- scroll reveal ---------------------------------------------------- */
  /* A plain IntersectionObserver is not enough here: a fast flick, an anchor
     jump, or a restored scroll position can carry an element from below the
     fold to above it without the observer ever seeing it intersect, and it
     then stays invisible forever. So we drive reveals from an rAF-throttled
     sweep that reveals anything at or above the trigger line. */
  var revealables = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));

  var runCount = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (reduceMotion) { el.textContent = String(target); return; }
    var duration = 1600;
    var started = null;
    var tick = function (ts) {
      if (started === null) started = ts;
      var p = Math.min((ts - started) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);          // ease-out cubic
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (reduceMotion) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
    counters.forEach(runCount);
  } else {
    var queued = false;
    var sweep = function () {
      queued = false;
      var trigger = window.innerHeight * 0.92;

      revealables = revealables.filter(function (el) {
        if (el.getBoundingClientRect().top >= trigger) return true;
        el.classList.add('is-in');
        return false;
      });

      counters = counters.filter(function (el) {
        if (el.getBoundingClientRect().top >= window.innerHeight * 0.85) return true;
        runCount(el);
        return false;
      });
    };
    var schedule = function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    };

    sweep();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
  }

  /* ---- testimonial rotator ---------------------------------------------- */
  var quotesWrap = document.querySelector('.quotes');
  if (quotesWrap) {
    var quotes = Array.prototype.slice.call(quotesWrap.querySelectorAll('.quote'));
    var dotsWrap = document.querySelector('.quote-dots');
    var index = 0;
    var timer = null;

    if (quotes.length > 1 && dotsWrap) {
      quotes.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
        dot.addEventListener('click', function () { show(i); restart(); });
        dotsWrap.appendChild(dot);
      });
    }

    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function show(i) {
      index = i;
      quotes.forEach(function (q, n) { q.classList.toggle('is-active', n === i); });
      dots.forEach(function (d, n) { d.classList.toggle('is-active', n === i); });
    }

    function restart() {
      if (timer) clearInterval(timer);
      if (quotes.length > 1 && !reduceMotion) {
        timer = setInterval(function () { show((index + 1) % quotes.length); }, 6500);
      }
    }

    show(0);
    restart();

    quotesWrap.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    quotesWrap.addEventListener('mouseleave', restart);
  }

  /* ---- contact / booking form ------------------------------------------- */
  /* Front-end validation only. Point the <form action> at your form handler
     (Formspree, Netlify Forms, Basin) to actually receive submissions. */
  var form = document.querySelector('[data-validate]');
  if (form) {
    var success = document.querySelector('.form__success');

    var setError = function (field, message) {
      field.classList.add('has-error');
      var slot = field.querySelector('.field__error');
      if (slot) slot.textContent = message;
    };
    var clearError = function (field) {
      field.classList.remove('has-error');
    };

    form.addEventListener('submit', function (e) {
      var valid = true;

      form.querySelectorAll('.field').forEach(function (field) {
        var input = field.querySelector('input, select, textarea');
        if (!input || !input.required) return;

        clearError(field);
        var value = (input.value || '').trim();

        if (!value) {
          setError(field, 'This field is required.');
          valid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          setError(field, 'Please enter a valid email address.');
          valid = false;
        } else if (input.type === 'tel' && value.replace(/\D/g, '').length < 10) {
          setError(field, 'Please enter a full phone number.');
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
        var firstBad = form.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstBad) firstBad.focus();
        return;
      }

      // No backend wired up yet — show a confirmation instead of navigating away.
      if (!form.getAttribute('action')) {
        e.preventDefault();
        form.style.display = 'none';
        if (success) {
          success.classList.add('is-visible');
          success.setAttribute('tabindex', '-1');
          success.focus();
        }
      }
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field && field.classList.contains('has-error')) clearError(field);
    });
  }


  /* ---- intro curtain ------------------------------------------------------ */
  var curtain = document.querySelector('.curtain');
  if (curtain && !reduceMotion) {
    document.body.classList.add('is-loading');
    var lift = function () {
      curtain.classList.add('is-lifted');
      document.body.classList.remove('is-loading');
      // let the hero headline play once the curtain is clear
      document.querySelectorAll('.split-text').forEach(function (el) {
        el.classList.add('is-in');
      });
    };
    // lift on load, but never hold the page hostage if something stalls
    var lifted = false;
    var liftOnce = function () { if (!lifted) { lifted = true; lift(); } };
    window.addEventListener('load', function () { setTimeout(liftOnce, 900); });
    setTimeout(liftOnce, 3000);
  } else if (curtain) {
    curtain.remove();
    document.body.classList.remove('is-loading');
    document.querySelectorAll('.split-text').forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  /* ---- split a headline into per-word masks -------------------------------- */
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var html = el.innerHTML.split('<br>').map(function (line) {
      return line.trim().split(/\s+/).map(function (w) {
        return '<span class="word"><span>' + w + '</span></span>';
      }).join(' ');
    }).join('<br>');
    el.innerHTML = html;
    el.classList.add('split-text');
    // stagger each word slightly
    el.querySelectorAll('.word > span').forEach(function (sp, i) {
      sp.style.transitionDelay = (0.06 * i) + 's';
    });
  });

  /* Parallax removed: the backdrop is position:fixed, which already
     gives the parallax effect for free. */

  /* ---- gallery lightbox ---------------------------------------------------- */
  var strip = document.querySelector('.strip');
  var lightbox = document.querySelector('.lightbox');
  if (strip && lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lastFocus = null;

    var openLb = function (src, alt) {
      lastFocus = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || '';
      lightbox.classList.add('is-open');
      lightbox.querySelector('.lightbox__close').focus();
    };
    var closeLb = function () {
      lightbox.classList.remove('is-open');
      if (lastFocus) lastFocus.focus();
    };

    strip.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var img = btn.querySelector('img');
      openLb(img.getAttribute('data-full') || img.src, img.alt);
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.closest('.lightbox__close')) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLb();
    });
  }

  /* ---- current year in footer ------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
