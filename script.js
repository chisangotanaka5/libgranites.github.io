/* LibStone — site behaviour. Shared by index.html and services.html.
   Every block checks that its elements exist, so one page never breaks another. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG — edit contact details here (one place for the whole site)
     whatsappNumber: digits only, with country code, no "+", spaces or brackets
     ------------------------------------------------------------------ */
  var CONFIG = {
    whatsappNumber: '263771075797',
    contact: { phone: '+263 771 075 797', email: 'info@libstone.co.zw' },
    messages: {
      general: 'Hello LibStone, I would like to enquire about your granite products.',
      export: 'Hello LibStone, I am interested in an export enquiry for LibStone granite products.',
      projects: 'Hello LibStone, I would like to see more of your completed granite projects.',
      residential: 'Hello LibStone, I would like to enquire about a residential granite project.',
      commercial: 'Hello LibStone, I would like to enquire about a commercial granite project.',
      architectural: 'Hello LibStone, I would like to enquire about architectural granite fabrication.',
      memorial: 'Hello LibStone, I would like to enquire about a memorial/tombstone project.'
    }
  };

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- WhatsApp links ---------- */
  var waBase = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=';
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var type = a.getAttribute('data-wa') || 'general';
    a.href = waBase + encodeURIComponent(CONFIG.messages[type] || CONFIG.messages.general);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  /* ---------- Phone / email links ---------- */
  var phoneDigits = CONFIG.contact.phone.replace(/[^\d+]/g, '');
  var phoneIsReal = /\d{7,}/.test(phoneDigits) && !/X/i.test(CONFIG.contact.phone);
  document.querySelectorAll('[data-contact]').forEach(function (el) {
    var kind = el.getAttribute('data-contact');
    if (kind === 'email') {
      el.textContent = CONFIG.contact.email;
      if (el.tagName === 'A') el.href = 'mailto:' + CONFIG.contact.email;
    } else if (kind === 'phone') {
      el.textContent = CONFIG.contact.phone;
      if (el.tagName === 'A' && phoneIsReal) el.href = 'tel:' + phoneDigits;
    }
  });
  if (/^2630+$/.test(CONFIG.whatsappNumber) || !phoneIsReal) {
    if (window.console) console.warn('LibStone: placeholder phone / WhatsApp number still in script.js CONFIG — replace before launch.');
  }

  /* ---------- Header state (readable over light sections) ---------- */
  var header = document.querySelector('.site-header');
  function headerState() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('menuBtn');
  var menu = $('mobileMenu');
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && menu.classList.contains('open')) setMenu(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('main > section:not(.hero):not(.inner-hero), .service-card, .project-grid article, .process-steps > div')
      .forEach(function (x) { x.classList.add('reveal'); io.observe(x); });
  }

  /* ---------- Hero: workshop -> finished-stone morph on scroll ---------- */
  var hero = $('hero');
  var finish = document.querySelector('.hero-finish');
  var workshop = document.querySelector('.hero-workshop');
  var progress = $('heroProgress');
  function heroMorph() {
    if (!hero || !finish || !workshop) return;
    var rect = hero.getBoundingClientRect();
    var range = Math.max(1, hero.offsetHeight - window.innerHeight);
    //var range = Math.max(1, hero.offsetHeight * 0.7);
    var p = Math.min(1, Math.max(0, -rect.top / range));
    finish.style.opacity = (p * 0.92).toFixed(3);
    workshop.style.transform = 'scale(' + (1 - p * 0.055).toFixed(4) + ')';
    finish.style.transform = 'scale(' + (1.035 - p * 0.035).toFixed(4) + ')';
    if (progress) progress.style.transform = 'scaleX(' + p.toFixed(3) + ')';
  }

  /* ---------- One rAF-throttled scroll handler ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { headerState(); heroMorph(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', heroMorph);
  headerState();
  heroMorph();

  /* ---------- Product carousel (index page only) ---------- */
  var track = $('thumbs');
  if (!track) return;

  var products = [
    { title: 'Kitchen countertops & sinks', label: 'KITCHEN SINK & COUNTERTOP', meta: 'Residential · Black Granite',
      desc: 'Durable, elegant and timeless. Granite surfaces designed to bring beauty and functionality to kitchens, with a range of finishes and edge profiles.',
      img: 'assets/images/product-kitchen.jpg', alt: 'Black granite kitchen countertop with sink cut-out', more: 'services.html#residential' },
    { title: 'Reception desks & counters', label: 'COMMERCIAL RECEPTION DESK', meta: 'Commercial · Black Granite',
      desc: 'Confident, durable surfaces for offices, hospitality spaces, reception areas and high-use commercial environments.',
      img: 'assets/images/product-commercial.jpg', alt: 'Black granite reception desk', more: 'services.html#commercial' },
    { title: 'Stairs & architectural stonework', label: 'GRANITE STAIRCASE', meta: 'Architectural · Black Granite',
      desc: 'Precision-fabricated steps, feature elements and architectural stonework designed around the character of each project.',
      img: 'assets/images/product-stairs.jpg', alt: 'Black granite staircase', more: 'services.html#architectural' },
    { title: 'Tombstones & memorials', label: 'CUSTOM MEMORIAL', meta: 'Memorial · Black Granite',
      desc: 'Thoughtfully fabricated memorial pieces, monuments and plaques with custom dimensions, finishes and details.',
      img: 'assets/images/product-memorial.jpg', alt: 'Black granite memorial headstone', more: 'services.html#memorial' },
    { title: 'Cladding & feature surfaces', label: 'ARCHITECTURAL CLADDING', meta: 'Architectural · Black Granite',
      desc: 'Bold stone surfaces for façades, feature walls, flooring and exterior applications.',
      img: 'assets/images/product-cladding.jpg', alt: 'Black granite wall cladding', more: 'services.html#architectural' }
  ];

  var current = 0, timer = null, paused = false;
  var mainImg = $('product-img');
  var counter = $('counter');
  var windowEl = track.parentElement;

  products.forEach(function (p, i) {
    var t = document.createElement('button');
    t.type = 'button';
    t.className = 'thumb';
    t.setAttribute('aria-label', 'Show ' + p.title);
    var im = document.createElement('img');
    im.src = p.img; im.alt = ''; im.loading = 'lazy'; im.decoding = 'async';
    t.appendChild(im);
    t.addEventListener('click', function () { setProduct(i); restart(); });
    track.appendChild(t);
  });

  function centerThumb() {
    var active = track.children[current];
    if (!active) return;
    var view = windowEl.clientWidth;
    var x = active.offsetLeft + active.offsetWidth / 2 - view / 2;
    var max = Math.max(0, track.scrollWidth - view);
    track.style.transform = 'translateX(' + (-Math.max(0, Math.min(x, max))) + 'px)';
  }

  function preload(i) {
    var n = products[(i + products.length) % products.length];
    var im = new Image(); im.src = n.img;
  }

  function setProduct(i) {
    current = (i + products.length) % products.length;
    var p = products[current];
    Array.prototype.forEach.call(track.children, function (x, n) {
      x.classList.toggle('active', n === current);
      if (n === current) x.setAttribute('aria-current', 'true'); else x.removeAttribute('aria-current');
    });
    $('product-title').textContent = p.title;
    $('product-desc').textContent = p.desc;
    $('product-label').textContent = p.label;
    $('product-meta').textContent = p.meta;
    $('product-more').href = p.more;
    if (counter) counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(products.length).padStart(2, '0');
    if (mainImg) {
      mainImg.classList.remove('is-changing');
      void mainImg.offsetWidth;
      mainImg.src = p.img;
      mainImg.alt = p.alt;
      if (!reduceMotion) mainImg.classList.add('is-changing');
    }
    centerThumb();
    preload(current + 1);
  }

  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() {
    stop();
    if (reduceMotion || paused || document.hidden) return;
    timer = setInterval(function () { setProduct(current + 1); }, 6500);
  }

  $('prev').addEventListener('click', function () { setProduct(current - 1); restart(); });
  $('next').addEventListener('click', function () { setProduct(current + 1); restart(); });

  /* Pause autoplay while the visitor is interacting or the tab is hidden */
  var section = $('products');
  if (section) {
    section.addEventListener('mouseenter', function () { paused = true; stop(); });
    section.addEventListener('mouseleave', function () { paused = false; restart(); });
    section.addEventListener('focusin', function () { paused = true; stop(); });
    section.addEventListener('focusout', function () { paused = false; restart(); });
  }
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else restart(); });

  /* Swipe on the main image (touch devices) */
  var visual = $('product-image');
  if (visual) {
    var sx = 0, sy = 0, tracking = false;
    visual.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
    }, { passive: true });
    visual.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        setProduct(current + (dx < 0 ? 1 : -1));
        restart();
      }
    }, { passive: true });
  }

  /* Arrow keys while focus is inside the carousel controls */
  var controls = document.querySelector('.carousel-controls');
  [controls, windowEl].forEach(function (el) {
    if (!el) return;
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { setProduct(current - 1); restart(); }
      if (e.key === 'ArrowRight') { setProduct(current + 1); restart(); }
    });
  });

  window.addEventListener('resize', centerThumb);
  window.addEventListener('load', centerThumb);
  setProduct(0);
  restart();
})();
