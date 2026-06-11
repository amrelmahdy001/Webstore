(function () {
  'use strict';

  // ========== إعدادات السرعة ==========
  const DUR_RAISE = 500;
  const DUR_FLIP = 450;
  const DUR_EXPAND = 400;
  const DUR_CONTRACT = 400;
  const DUR_FADE = 400;

  // ========== منحنيات الحركة ==========
  const SPRING_LIGHT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const EASE_IN = 'cubic-bezier(0.55, 0, 0.90, 0.45)';
  const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

  // ========== قوائم الكلمات ==========
  const ACCEL_WORDS = [
  'brand', 'design', 'portfolio', 'business', 'startup',
  'app', 'product', 'identity', 'experience', 'story',
  'vision', 'craft', 'studio', 'creative', 'dynamic',
  'modern', 'unique', 'powerful', 'elegant', 'story' ,'website'
];
  const LOOP_WORDS = ['brand', 'portfolio', 'market','business', 'startup', 'product'];

  let wordCyclerInterval = null;

  // ========== دوال مساعدة عامة ==========
  function raiseUpTo(el, finalY, duration, delay) {
    finalY = finalY ?? 0;
    duration = duration ?? DUR_RAISE;
    delay = delay ?? 0;
    return el.animate(
      [
        { opacity: 0, transform: `translateY(${finalY + 80}px)` },
        { opacity: 1, transform: `translateY(${finalY}px)` }
      ],
      { duration, delay, easing: SPRING_LIGHT, fill: 'both' }
    );
  }

  // دالة WAAPI لتبديل الكلمة بمرونة
  function animateWordChange(el, newWord, durationOut, durationIn, easingOut = EASE_IN, easingIn = EASE_OUT) {
    if (!el) return;
    if (el.textContent === newWord) return;
    
    const exitAnim = el.animate(
      [
        { opacity: 1, transform: 'translateY(0) scale(1)' },
        { opacity: 0, transform: 'translateY(-20px) scale(0.92)' }
      ],
      { duration: durationOut, easing: easingOut, fill: 'forwards' }
    );
    
    exitAnim.onfinish = () => {
      el.textContent = newWord;
      el.animate(
        [
          { opacity: 0, transform: 'translateY(20px) scale(0.96)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' }
        ],
        { duration: durationIn, easing: easingIn, fill: 'forwards' }
      );
    };
  }

  // التسارع حتى "website" ثم الدورة البطيئة
  // قائمة الكلمات للتسارع (20 كلمة)


function startAcceleratedThenLoop(wordElement) {
  let currentIndex = 0;
  let currentDelay = 380; // فاصل أولي (ms) – يسمح بقراءة أول 3 كلمات
  const minDelay = 40; // أقل فاصل (سرعة جنونية)
  const step = 28; // مقدار التناقص لكل خطوة (يصل إلى minDelay بعد ~12 خطوة)
  let isAccelerating = true;
  let timerId = null;
  
  function next() {
    if (!isAccelerating) return;
    currentIndex++;
    if (currentIndex >= ACCEL_WORDS.length) {
      isAccelerating = false;
      
      // بعد أن تصبح "website" مرئية (دون تأخير إضافي)
startNormalLoopWAAPI(wordElement);
      return;
    }
    const nextWord = ACCEL_WORDS[currentIndex];
    // مدة الأنيميشن تتناسب مع التأخير، بحد أدنى لتبقى سلسة
    const outDur = Math.max(60, currentDelay * 0.4);
    const inDur = Math.max(90, currentDelay * 0.55);
    animateWordChange(wordElement, nextWord, outDur, inDur, EASE_IN, EASE_OUT);
    
    // تحديث الفاصل للتغيير التالي
    currentDelay = Math.max(minDelay, currentDelay - step);
    timerId = setTimeout(next, currentDelay);
  }
  
  // بدء التغييرات بعد تأخير بسيط (200ms) لإعطاء فرصة لرؤية "brand"
  setTimeout(next, 200);
}

  // الدورة البطيئة الطبيعية (كل 3 ثوان)
  function startNormalLoopWAAPI(wordElement) {
    if (wordCyclerInterval) clearInterval(wordCyclerInterval);
    let currentIndex = 0;
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % LOOP_WORDS.length;
      animateWordChange(wordElement, LOOP_WORDS[nextIndex], 300, 460, EASE_IN, EASE_OUT);
      currentIndex = nextIndex;
      wordCyclerInterval = setInterval(() => {
        const next = (currentIndex + 1) % LOOP_WORDS.length;
        animateWordChange(wordElement, LOOP_WORDS[next], 300, 460, EASE_IN, EASE_OUT);
        currentIndex = next;
      }, 3000);
    }, 3000);
  }

  // ========== FLIP للتوسيط الأفقي ==========
  function flipCentreX(el, mutation) {
    const first = el.getBoundingClientRect().left;
    mutation();
    const last = el.getBoundingClientRect().left;
    const dx = first - last;
    if (Math.abs(dx) < 0.5) return;
    el.animate(
      [{ transform: `translateX(${dx}px)` }, { transform: 'translateX(0)' }],
      { duration: DUR_FLIP, easing: SPRING, fill: 'both' }
    );
  }

  // ========== التسلسل الرئيسي ==========
  function startAnimation() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const show = (sel) => {
        const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
        if (el) el.style.cssText += ';opacity:1;transform:none;display:;visibility:visible';
      };
      ['#wordLets','#wordTake','#wordYour','#lineDynamic','#lineThird',
       '.hero__badge','.hero__description','.hero__cta-group'].forEach(show);
      const dw = document.getElementById('dynamicWord');
      if (dw) dw.textContent = 'website';
      return;
    }

    const letsEl = document.getElementById('wordLets');
    const takeEl = document.getElementById('wordTake');
    const yourEl = document.getElementById('wordYour');
    const lineFirst = document.getElementById('lineFirst');
    const lineDynamic = document.getElementById('lineDynamic');
    const dynamicWordEl = document.getElementById('dynamicWord');
    const lineThird = document.getElementById('lineThird');
    const revealCoverEl = document.getElementById('revealCover');
    const revealTextEl = document.getElementById('revealText');

    if (!letsEl || !lineFirst) {
      console.error('[hero] العناصر الأساسية غير موجودة');
      return;
    }

    // الحالة الأولية
    takeEl.style.display = 'none';
    yourEl.style.display = 'none';
    lineDynamic.style.opacity = '0';
    lineDynamic.style.transform = 'translateY(100px)';
    lineThird.style.display = 'inline-block';
    lineThird.style.visibility = 'hidden';
    lineThird.style.opacity = '0';
    if (revealTextEl) revealTextEl.style.opacity = '0';
    ['.hero__badge', '.hero__description', '.hero__cta-group'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.opacity = '0';
    });

    // ===== 0.0s : "let's" =====
    raiseUpTo(letsEl, 0, DUR_RAISE, 0);

    // ===== 0.8s : "take" + توسيط =====
    setTimeout(() => {
      flipCentreX(letsEl, () => { takeEl.style.display = ''; });
      raiseUpTo(takeEl, 0, DUR_RAISE, 0);
    }, 800);

    // ===== 1.6s : "your" + توسيط =====
    setTimeout(() => {
      const letsFirst = letsEl.getBoundingClientRect().left;
      const takeFirst = takeEl.getBoundingClientRect().left;
      yourEl.style.display = '';
      const letsLast = letsEl.getBoundingClientRect().left;
      const takeLast = takeEl.getBoundingClientRect().left;
      [
        { el: letsEl, dx: letsFirst - letsLast },
        { el: takeEl, dx: takeFirst - takeLast }
      ].forEach(({ el, dx }) => {
        if (Math.abs(dx) > 0.5) {
          el.animate(
            [{ transform: `translateX(${dx}px)` }, { transform: 'translateX(0)' }],
            { duration: DUR_FLIP, easing: SPRING, fill: 'both' }
          );
        }
      });
      raiseUpTo(yourEl, 0, DUR_RAISE, 0);
    }, 1600);

    // ===== 2.4s : ظهور السطر الديناميكي وبدء التسارع =====
    setTimeout(() => {
      dynamicWordEl.textContent = 'brand';
      raiseUpTo(lineDynamic, 0, DUR_RAISE, 0).onfinish = () => {
        startAcceleratedThenLoop(dynamicWordEl);
      };
    }, 2400);

    // ===== 5.0s : حركة المستطيل =====
    setTimeout(() => {
      lineThird.style.visibility = 'visible';
      lineThird.style.opacity = '1';
      requestAnimationFrame(() => {
        const thirdWidth = lineThird.offsetWidth;
        const thirdHeight = lineThird.offsetHeight;
        if (thirdWidth === 0 || thirdHeight === 0) return;
        revealCoverEl.style.width = `${thirdWidth}px`;
        revealCoverEl.style.height = `${thirdHeight}px`;
        revealCoverEl.style.transformOrigin = 'left center';
        revealCoverEl.style.transform = 'scaleX(0)';
        const expandAnim = revealCoverEl.animate(
          [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
          { duration: DUR_EXPAND, easing: EASE_OUT, fill: 'both' }
        );
        expandAnim.onfinish = () => {
          if (revealTextEl) revealTextEl.style.opacity = '1';
          setTimeout(() => {
            revealCoverEl.style.transform = 'scaleX(1)';
            expandAnim.cancel();
            revealCoverEl.style.transformOrigin = 'right center';
            const contractAnim = revealCoverEl.animate(
              [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }],
              { duration: DUR_CONTRACT, easing: EASE_IN, fill: 'both' }
            );
            contractAnim.onfinish = () => {
              revealCoverEl.style.display = 'none';
              revealCoverEl.style.width = '';
              revealCoverEl.style.height = '';
            };
          }, 80);
        };
      });
    }, 5500);

    // ===== 6.0s : العناصر الداعمة =====
    ['.hero__badge', '.hero__description', '.hero__cta-group'].forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (!el) return;
      setTimeout(() => {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: DUR_FADE, easing: EASE_OUT, fill: 'both' }
        );
      }, 6000 + i * 120);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAnimation);
  } else {
    startAnimation();
  }
})();