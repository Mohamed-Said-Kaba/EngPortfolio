/* Portfolio : Mohamed Said Kaba
 * Le contenu est dans content/*.js (textes bilingues {fr, en}). Ce fichier ne fait que l'afficher.
 * Le titre de l'onglet se change dans la balise <title> de index.html.
 */
(function () {
  'use strict';

  var FILES = ['site', 'profile', 'works', 'tools', 'videos'];
  var D = {};
  var lang = 'fr';
  var filter = 'all';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Icônes ---------- */
  var ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    pin: '<path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    github: '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.8 12.8 0 0 0-6.7 0C5.7 1 4.6 1.3 4.6 1.3a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 8.5c0 5.2 3.1 6.4 6.1 6.7A3 3 0 0 0 8.2 17.5V21"/>',
    images: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 8"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    prev: '<path d="M15 6l-6 6 6 6"/>',
    next: '<path d="M9 6l6 6-6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
    code: '<path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    beam: '<path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6"/>',
    truss: '<path d="M2 18h20M2 18 7 8l5 10 5-10 5 10M7 8h10"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'
  };
  function icon(name) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '1.8'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('class', 'ico');
    s.innerHTML = ICONS[name] || ''; return s;
  }

  /* ---------- Utilitaires ---------- */
  function pickLang() {
    try {
      var q = new URLSearchParams(location.search).get('lang'); if (q === 'fr' || q === 'en') return q;
      var s = localStorage.getItem('lang'); if (s === 'fr' || s === 'en') return s;
    } catch (e) {}
    return 'fr';
  }
  function t(v) { if (v == null) return ''; if (typeof v === 'string') return v; return v[lang] != null ? v[lang] : (v.fr || ''); }
  function list(v) { if (!v) return []; return Array.isArray(v) ? v : (v[lang] || v.fr || []); }
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) return;
      if (k === 'class') n.className = v; else if (k === 'text') n.textContent = v; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), v); else n.setAttribute(k, v);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function tags(a) { return el('div', { class: 'tags' }, (a || []).map(function (x) { return el('span', { class: 'tag', text: x }); })); }
  function head(title, lead, extra) {
    return el('div', { class: 'sec-head' }, [el('div', null, [el('h2', { text: title }), lead ? el('p', { class: 'lead', text: lead }) : null]), extra || null]);
  }
  function section(id, cls, kids) { return el('section', { id: id, class: cls || '' }, [el('div', { class: 'wrap' }, kids)]); }
  var CAT = { tool: 'cat_tool', project: 'cat_project', study: 'cat_study' };

  /* ---------- Accueil ---------- */
  function renderHero() {
    var S = D.site, P = D.profile;
    var text = el('div', null, [
      el('div', { class: 'badges' }, list(S.badges).map(function (b) { return el('span', { class: 'badge', text: b }); })),
      el('h1', null, [S.firstName + ' ', el('span', { class: 'n2', text: S.lastName })]),
      el('div', { class: 'title', text: t(S.title) }),
      el('p', { class: 'tagline', text: t(S.tagline) }),
      el('div', { class: 'btns' }, [
        el('a', { class: 'btn primary', href: '#realisations' }, [t(S.ui.seeWork), icon('arrow')]),
        el('a', { class: 'btn ghost', href: '#contact', text: t(S.ui.contact) }),
        el('a', { class: 'btn ghost hidden', id: 'cv-btn', href: '#', download: '' }, [icon('download'), t(S.ui.cv)])
      ]),
      el('div', { class: 'place' }, [icon('pin'), t(S.location)])
    ]);
    var portrait = el('div', { class: 'portrait' }, [
      el('div', { class: 'ring' }, [el('img', { src: S.photo, alt: S.firstName + ' ' + S.lastName, width: 330, height: 330 })]),
      el('div', { class: 'float f1' }, [icon('truss'), el('div', null, [el('b', { text: 'Robot · EC3 · RPS' }), lang === 'fr' ? 'Calcul de structures' : 'Structural design'])]),
      el('div', { class: 'float f2' }, [icon('code'), el('div', null, [el('b', { text: 'API · Python · VBA' }), lang === 'fr' ? 'Outils maison' : 'In-house tools'])])
    ]);
    var kpis = el('div', { class: 'kpis' }, P.kpis.map(function (k) {
      return el('div', { class: 'kpi' }, [el('b', { text: k.value, 'data-count': k.value }), el('span', { text: t(k.label) })]);
    }));
    // bandeau d'images : toutes les images des réalisations, dupliquées pour une boucle continue
    var pics = [];
    D.works.items.forEach(function (w) { (w.images || []).slice(0, 3).forEach(function (im) { pics.push({ w: w, im: im }); }); });
    var marquee = null;
    if (pics.length) {
      var track = el('div', { class: 'marquee-track' });
      pics.concat(pics).forEach(function (p, i) {
        track.appendChild(el('button', { type: 'button', 'aria-label': t(p.w.title), tabindex: i < pics.length ? '0' : '-1', onclick: function () { openWork(p.w, p.w.images.indexOf(p.im)); } },
          [el('img', { src: p.im.src, alt: '', loading: 'lazy' })]));
      });
      marquee = el('div', { class: 'marquee' }, [track]);
    }
    return el('section', { id: 'accueil', class: 'hero' }, [el('div', { class: 'wrap' }, [el('div', { class: 'hero-grid' }, [text, portrait]), kpis, marquee])]);
  }

  /* ---------- Réalisations ---------- */
  function coverOf(w) {
    var cover;
    if (w.images && w.images.length) {
      cover = el('div', { class: 'cover' }, [el('img', { src: w.images[0].src, alt: t(w.title), loading: 'lazy', class: w.coverTop ? 'top' : false })]);
      if (w.images.length > 1) cover.appendChild(el('span', { class: 'count' }, [icon('images'), String(w.images.length)]));
    } else if (w.diagram === 'toolchain') {
      cover = el('div', { class: 'cover placeholder diagram' }, [el('div', { class: 'mini-flow' }, [
        el('span', { text: 'Robot' }), el('i', { text: '→' }), el('span', { class: 'hl', text: 'REDUCED LOADS' }), el('i', { text: '→' }), el('span', { text: lang === 'fr' ? 'Module BA' : 'RC module' })
      ])]);
    } else {
      cover = el('div', { class: 'cover placeholder' }, [icon(w.cat === 'tool' ? 'code' : (w.cat === 'project' ? 'beam' : 'truss')), el('span', { class: 'soon', text: t(D.site.ui.soon) })]);
    }
    cover.appendChild(el('span', { class: 'cat', text: t(D.site.ui[CAT[w.cat]]) }));
    return cover;
  }
  function card(w) {
    return el('button', { type: 'button', class: 'card' + (w.featured ? ' featured' : ''), 'data-cat': w.cat, onclick: function () { openWork(w, 0); } }, [
      coverOf(w),
      el('div', { class: 'body' }, [
        el('div', { class: 'meta', text: [t(w.org), t(w.period)].filter(Boolean).join(' · ') }),
        el('h3', { text: t(w.title) }),
        el('p', { text: t(w.summary) }),
        tags(w.tags)
      ])
    ]);
  }
  function renderWorks() {
    var U = D.site.ui;
    var cats = ['all', 'tool', 'project', 'study'];
    var filters = el('div', { class: 'filters', role: 'group' }, cats.map(function (c) {
      return el('button', { type: 'button', 'data-f': c, 'aria-pressed': String(filter === c), text: t(c === 'all' ? U.all : U[CAT[c]]), onclick: function () { setFilter(c); } });
    }));
    var grid = el('div', { class: 'grid', id: 'works-grid' });
    fillGrid(grid);
    return section('realisations', 'alt', [head(t(U.h_work), t(U.lead_work), filters), grid]);
  }
  function fillGrid(grid) {
    grid.textContent = '';
    D.works.items.filter(function (w) { return filter === 'all' || w.cat === filter; }).forEach(function (w) {
      var c = card(w);
      if (filter !== 'all') c.classList.remove('featured');
      grid.appendChild(c);
    });
    reveal(grid.querySelectorAll('.card'));
  }
  function setFilter(c) {
    filter = c;
    document.querySelectorAll('.filters button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === c)); });
    fillGrid(document.getElementById('works-grid'));
  }

  /* ---------- Visionneuse ---------- */
  var lb = null, lbWork = null, lbIdx = 0, lastFocus = null;
  function openWork(w, idx) {
    lbWork = w; lbIdx = idx || 0; lastFocus = document.activeElement;
    var U = D.site.ui, imgs = w.images || [];
    lb.textContent = '';
    var box = el('div', { class: 'lb-box' + (imgs.length ? '' : ' no-media') });
    box.appendChild(el('button', { type: 'button', class: 'lb-close', 'aria-label': t(U.close), onclick: closeWork }, [icon('close')]));
    if (imgs.length) {
      var stage = el('div', { class: 'stage' }, [el('img', { id: 'lb-img', alt: '' })]);
      if (imgs.length > 1) {
        stage.appendChild(el('button', { type: 'button', class: 'nav-btn prev', 'aria-label': '<', onclick: function () { show(lbIdx - 1); } }, [icon('prev')]));
        stage.appendChild(el('button', { type: 'button', class: 'nav-btn next', 'aria-label': '>', onclick: function () { show(lbIdx + 1); } }, [icon('next')]));
      }
      var media = el('div', { class: 'lb-media' }, [stage, el('div', { class: 'cap', id: 'lb-cap' })]);
      if (imgs.length > 1) media.appendChild(el('div', { class: 'lb-thumbs' }, imgs.map(function (im, i) {
        return el('button', { type: 'button', 'data-i': i, onclick: function () { show(i); } }, [el('img', { src: im.src, alt: '' })]);
      })));
      box.appendChild(media);
      // balayage tactile
      var x0 = null;
      stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      stage.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(lbIdx + (dx < 0 ? 1 : -1)); x0 = null; });
    }
    box.appendChild(el('div', { class: 'lb-info' }, [
      el('div', { class: 'card-meta meta', style: 'font-size:.75rem;font-weight:600;letter-spacing:.04em;color:var(--blue);text-transform:uppercase', text: [t(w.org), t(w.period)].filter(Boolean).join(' · ') }),
      el('h3', { text: t(w.title) }),
      el('p', { text: t(w.summary) }),
      el('ul', null, list(w.points).map(function (p) { return el('li', { text: p }); })),
      tags(w.tags)
    ]));
    lb.appendChild(box);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (imgs.length) show(lbIdx);
    box.querySelector('.lb-close').focus();
  }
  function show(i) {
    var imgs = lbWork.images; lbIdx = (i + imgs.length) % imgs.length;
    var im = document.getElementById('lb-img'); im.src = imgs[lbIdx].src; im.alt = t(imgs[lbIdx].caption);
    document.getElementById('lb-cap').textContent = (lbIdx + 1) + ' / ' + imgs.length + '  ·  ' + t(imgs[lbIdx].caption);
    lb.querySelectorAll('.lb-thumbs button').forEach(function (b) { b.setAttribute('aria-current', String(+b.dataset.i === lbIdx)); });
  }
  function closeWork() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); lb.textContent = '';
    document.body.style.overflow = ''; lbWork = null; if (lastFocus) lastFocus.focus();
  }

  /* ---------- Outils ---------- */
  function renderTools() {
    var T = D.tools, U = D.site.ui, S = D.site;
    var flow = el('div', { class: 'flow' }, T.steps.map(function (s, i) {
      return el('div', { class: 'step' }, [
        el('div', { class: 'step-label' }, [el('i', { text: String(i + 1) }), t(s.label)]),
        el('div', null, s.tools.map(function (x) {
          return el('div', { class: 'tool' + (x.kind === 'source' ? '' : ' own') }, [
            el('b', { text: t(x.name) }), el('span', { text: t(x.line) }),
            x.status ? el('em', { class: 'st ' + x.status, text: t(T.status[x.status]) }) : null
          ]);
        }))
      ]);
    }));
    var pr = el('div', { class: 'principles' }, list(T.principles).map(function (p) { return el('div', null, [icon('check'), p]); }));
    var gh = el('div', { class: 'gh' }, [
      el('p', { text: lang === 'fr' ? 'Le code source de mes outils est publié progressivement sur GitHub.' : 'The source code of my tools is being published on GitHub.' }),
      el('a', { class: 'btn', href: S.contact.github, target: '_blank', rel: 'noopener' }, [icon('github'), 'GitHub'])
    ]);
    return section('outils', '', [head(t(U.h_tools), t(U.lead_tools)), flow, pr, gh]);
  }

  /* ---------- Parcours ---------- */
  function renderCareer() {
    var P = D.profile, U = D.site.ui;
    return section('parcours', 'alt', [head(t(U.h_career)), el('ol', { class: 'timeline' }, P.timeline.map(function (x) {
      return el('li', null, [el('div', { class: 'when', text: t(x.when) }), el('div', { class: 'role', text: t(x.role) }), el('div', { class: 'org', text: t(x.org) }), el('div', { class: 'line', text: t(x.line) })]);
    }))]);
  }

  /* ---------- Compétences ---------- */
  function renderSkills() {
    var P = D.profile, U = D.site.ui;
    return section('competences', '', [
      head(t(U.h_skills)),
      el('div', { class: 'skills' }, P.skills.map(function (g) { return el('div', { class: 'skill' }, [el('h3', { text: t(g.title) }), tags(g.items)]); })),
      el('h3', { class: 'sub', text: t(U.h_certs) }),
      el('div', { class: 'certs' }, P.certifications.map(function (c) { return el('div', { class: 'cert' }, [icon('award'), el('div', null, [el('b', { text: t(c.title) }), el('span', { text: t(c.meta) })])]); }))
    ]);
  }

  /* ---------- Vidéos (phase 2, masquée tant que videos.js a "enabled": false) ---------- */
  function renderVideos() {
    var V = D.videos; if (!V || !V.enabled) return null;
    var kids = [head(t(V.title), t(V.intro))];
    if (V.channelUrl) kids.push(el('a', { class: 'btn primary', href: V.channelUrl, target: '_blank', rel: 'noopener', text: lang === 'fr' ? 'Voir la chaîne' : 'Visit the channel' }));
    return section('videos', 'alt', kids);
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    var S = D.site, C = S.contact, U = S.ui;
    function link(ic, label, text, href, ext) {
      return el('a', { href: href, target: ext ? '_blank' : false, rel: ext ? 'noopener' : false }, [icon(ic), el('div', null, [el('small', { text: label }), el('span', { text: text })])]);
    }
    return section('contact', '', [el('div', { class: 'contact-card' }, [
      el('div', null, [el('h2', { text: t(U.h_contact) }), el('p', { class: 'lead', text: t(U.lead_contact) }),
        el('div', { class: 'btns' }, [
          el('a', { class: 'btn primary', href: 'mailto:' + C.email + '?subject=' + encodeURIComponent(t(U.mailSubject)) }, [t(U.writeMe), icon('arrow')]),
          el('a', { class: 'btn ghost hidden', id: 'cv-btn-2', href: '#', download: '' }, [icon('download'), t(U.cv)])
        ])]),
      el('div', { class: 'links' }, [
        link('mail', 'Email', C.email, 'mailto:' + C.email),
        link('phone', t(U.phone), C.phone, 'tel:' + C.phone.replace(/\s/g, '')),
        link('linkedin', 'LinkedIn', C.linkedinLabel, C.linkedin, true),
        link('github', 'GitHub', C.githubLabel, C.github, true),
        link('download', 'Portfolio PDF', lang === 'fr' ? 'Version imprimable' : 'Printable version', 'book.html', true)
      ])
    ])]);
  }

  /* ---------- Animations ---------- */
  var io = null;
  function reveal(nodes) {
    if (reduce || !('IntersectionObserver' in window)) return;
    if (!io) io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(nodes, function (n, i) { n.classList.add('reveal'); n.style.setProperty('--d', (i % 3) * 80 + 'ms'); io.observe(n); });
  }
  function countUp() {
    if (reduce) return;
    document.querySelectorAll('[data-count]').forEach(function (n) {
      var m = n.getAttribute('data-count').match(/^(\d+)(.*)$/); if (!m) return;
      var target = +m[1], suf = m[2], t0 = null;
      function step(ts) { if (t0 === null) t0 = ts; var p = Math.min((ts - t0) / 1200, 1); n.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); }
      n.textContent = '0' + suf; requestAnimationFrame(step);
    });
  }
  var navIO = null;
  function observeNav() {
    var links = document.querySelectorAll('.nav a');
    if (!('IntersectionObserver' in window)) return;
    if (navIO) navIO.disconnect();
    navIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); }); }); }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { navIO.observe(s); });
  }
  function checkCv() {
    var path = D.site.cv[lang] || D.site.cv.fr;
    if (location.protocol === 'file:') return;
    fetch(path, { method: 'HEAD' }).then(function (r) {
      if (!r.ok) return;
      ['cv-btn', 'cv-btn-2'].forEach(function (id) { var b = document.getElementById(id); if (b) { b.href = path; b.classList.remove('hidden'); } });
    }).catch(function () {});
  }

  /* ---------- Assemblage ---------- */
  function render() {
    document.documentElement.lang = lang;
    var S = D.site, app = document.getElementById('app');
    app.textContent = '';
    [renderHero, renderWorks, renderTools, renderCareer, renderSkills, renderVideos, renderContact].forEach(function (f) { var n = f(); if (n) app.appendChild(n); });
    var nav = document.getElementById('nav'); nav.textContent = '';
    S.nav.forEach(function (n) { nav.appendChild(el('a', { href: '#' + n.id, text: t(n.label) })); });
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    document.getElementById('footer-text').textContent = '© ' + new Date().getFullYear() + ' ' + S.firstName + ' ' + S.lastName + ' · ' + t(S.ui.footer);
    document.getElementById('footer-top').textContent = t(S.ui.top) + ' ↑';
    reveal(document.querySelectorAll('.kpi, .step, .principles div, .timeline li, .skill, .cert, .contact-card'));
    countUp(); observeNav(); checkCv();
  }
  function setLang(l) { lang = l; try { localStorage.setItem('lang', l); } catch (e) {} render(); }

  function init() {
    lang = pickLang();
    lb = document.getElementById('lightbox');
    lb.addEventListener('click', function (e) { if (e.target === lb) closeWork(); });
    document.addEventListener('keydown', function (e) {
      if (!lbWork) return;
      if (e.key === 'Escape') closeWork();
      else if (e.key === 'ArrowRight' && lbWork.images.length > 1) show(lbIdx + 1);
      else if (e.key === 'ArrowLeft' && lbWork.images.length > 1) show(lbIdx - 1);
    });
    try {
      FILES.forEach(function (f) { if (!window.SITE || !window.SITE[f]) throw new Error('content/' + f + '.js'); D[f] = window.SITE[f]; });
      render();
      if (location.hash) { var h = document.querySelector(location.hash); if (h) h.scrollIntoView(); }
    } catch (e) {
      document.getElementById('app').innerHTML = '<p class="wrap" style="padding:4rem 0">Impossible de charger le contenu (' + e.message + ').</p>';
    }
    document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });
    var burger = document.getElementById('burger'), nav = document.getElementById('nav');
    burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', String(o)); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });
    var bar = document.getElementById('top');
    function onScroll() { bar.classList.toggle('scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  init();
})();
