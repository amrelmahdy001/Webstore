/* ═══════════════════════════════════════════════════════════
   FLOATING NAV — Entry Animation + Interaction Engine
   (Ready for dynamic injection / fetch)
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const E_BOUNCE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  const E_SNAP   = 'cubic-bezier(0.23, 1, 0.32, 1)';

  // العناصر الأساسية (هتكون موجودة بعد الحقن)
  const getEl = (id) => document.getElementById(id);
  const nav      = getEl('navbar');
  const navLeft  = getEl('navLeft');
  const navEnd   = getEl('navEnd');
  const navHam   = getEl('navHam');
  const mobMenu  = getEl('mobMenu');
  const nlItems  = ['nl0', 'nl1', 'nl2', 'nl3'].map(id => getEl(id));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * init() – تشغّل كل حاجة بعد ما الـ DOM يكون جاهز
   */
  function init() {
    if (!nav) {
      console.warn('Navbar: #navbar not found, maybe not injected yet.');
      return;
    }
    console.log('✅ Navbar init started');

    reducedMotion ? skipAnimation() : runAnimation();
    setupDropdowns();
    setupMobile();
  }

  /**
   * شغّل init مباشرةً لو الصفحة خلاص اتحملت،
   * أو استنى حدث DOMContentLoaded لو لسه بتتحمل.
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // الصفحة متحمّلة (أو بنحقن بعد التحميل) → نفذ فوراً
    init();
  }

  /* ── Animation ── */
  function skipAnimation () {
    Object.assign(nav.style, {
      top: 'var(--nav-top)',
      width: 'var(--nav-w)',
      height: 'var(--nav-h)',
      borderRadius: 'var(--nav-r)',
      opacity: '1',
      overflow: 'visible'
    });
    revealAll(true);
  }

  function runAnimation () {
    setTimeout(() => {
      nav.style.transition = `top 0.52s ${E_BOUNCE}, opacity 0.28s ease`;
      nav.style.top     = 'var(--nav-top)';
      nav.style.opacity = '1';
    }, 280);

    setTimeout(() => {
      nav.style.transition =
        `width 0.43s ${E_SNAP}, height 0.43s ${E_SNAP}, border-radius 0.43s ${E_SNAP}`;
      nav.style.width        = 'var(--nav-w)';
      nav.style.height       = 'var(--nav-h)';
      nav.style.borderRadius = 'var(--nav-r)';
    }, 820);

    setTimeout(() => {
      nav.style.overflow   = 'visible';
      nav.style.transition = '';
    }, 1280);

    revealAll(false);
  }

  function revealAll (instant) {
    const base    = instant ? 0 : 1120;
    const easing  = `opacity 0.36s ${E_SNAP}, transform 0.36s ${E_SNAP}`;
    const easingQ = `opacity 0.30s ${E_SNAP}, transform 0.30s ${E_SNAP}`;

    if (navLeft) {
      setTimeout(() => {
        navLeft.style.transition = easing;
        navLeft.style.opacity    = '1';
        navLeft.style.transform  = 'translateX(0)';
      }, base);
    }

    nlItems.forEach((item, i) => {
      if (!item) return;
      const btn = item.querySelector('.navbar__link');
      if (!btn) return;
      setTimeout(() => {
        btn.style.transition = easingQ;
        btn.style.opacity    = '1';
        btn.style.transform  = 'translateY(0) scale(1)';
      }, base + 55 + i * 72);
    });

    if (navEnd) {
      setTimeout(() => {
        navEnd.style.transition = easing;
        navEnd.style.opacity    = '1';
        navEnd.style.transform  = 'translateX(0)';
      }, base + 55 + nlItems.length * 72 + 28);
    }
  }

  /* ── Desktop dropdowns ── */
  function setupDropdowns () {
    if (!nav) return;
    document.querySelectorAll('.navbar__item').forEach(item => {
      const drop = item.querySelector('.navbar__dropdown');
      if (!drop) return;

      const btn = item.querySelector('button.navbar__link');
      let leaveTimer;

      const open = () => {
        clearTimeout(leaveTimer);
        closeAll();
        item.classList.add('navbar__item--open');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      };

      const close = () => {
        item.classList.remove('navbar__item--open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      };

      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', () => {
        leaveTimer = setTimeout(close, 100);
      });

      if (btn) {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          item.classList.contains('navbar__item--open') ? close() : open();
        });

        btn.addEventListener('keydown', e => {
          if (e.key === 'Escape')    { close(); btn.focus(); }
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!item.classList.contains('navbar__item--open')) open();
            requestAnimationFrame(() => firstFocusable(drop)?.focus());
          }
        });
      }

      drop.addEventListener('keydown', e => {
        const links = [...drop.querySelectorAll('a[role="menuitem"]')];
        const idx   = links.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); links[(idx + 1) % links.length]?.focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); links[(idx - 1 + links.length) % links.length]?.focus(); }
        if (e.key === 'Home')      { e.preventDefault(); links[0]?.focus(); }
        if (e.key === 'End')       { e.preventDefault(); links[links.length - 1]?.focus(); }
        if (e.key === 'Escape')    { close(); btn?.focus(); }
        if (e.key === 'Tab')       { setTimeout(close, 0); }
      });
    });

    document.addEventListener('click', closeAll);
    nav.addEventListener('click', e => e.stopPropagation());
  }

  function closeAll () {
    document.querySelectorAll('.navbar__item--open').forEach(item => {
      item.classList.remove('navbar__item--open');
      const btn = item.querySelector('button.navbar__link');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function firstFocusable (el) {
    return el.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
  }

  /* ── Mobile menu ── */
  function setupMobile () {
    if (!navHam || !mobMenu) return;

    navHam.addEventListener('click', e => {
      e.stopPropagation();
      const opening = !mobMenu.classList.contains('mobile-menu--open');
      mobMenu.classList.toggle('mobile-menu--open', opening);
      navHam.setAttribute('aria-expanded', String(opening));
      navHam.classList.toggle('navbar__hamburger--active', opening);
      if (opening) setTimeout(() => firstFocusable(mobMenu)?.focus(), 80);
    });

    document.addEventListener('click', e => {
      if (!mobMenu.contains(e.target) && !navHam.contains(e.target)) closeMobile();
    });
    mobMenu.addEventListener('click', e => e.stopPropagation());

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobMenu.classList.contains('mobile-menu--open')) {
        closeMobile();
        navHam.focus();
      }
    });

    document.querySelectorAll('[data-mob]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target  = document.getElementById(btn.dataset.mob);
        if (!target) return;
        const opening = !target.classList.contains('mobile-menu__sub--open');

        document.querySelectorAll('.mobile-menu__sub--open').forEach(s => s.classList.remove('mobile-menu__sub--open'));
        document.querySelectorAll('[data-mob]').forEach(b => b.setAttribute('aria-expanded', 'false'));

        if (opening) {
          target.classList.add('mobile-menu__sub--open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function closeMobile () {
    if (!mobMenu || !navHam) return;
    mobMenu.classList.remove('mobile-menu--open');
    navHam.setAttribute('aria-expanded', 'false');
    navHam.classList.remove('navbar__hamburger--active');
  }

})();