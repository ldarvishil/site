/**
 * ذهن آزاد (azazmind) - Interactive Application Script
 *
 * Modules:
 * 1. Utility Helpers (Persian/Arabic digit conversion, formatting)
 * 2. Header Scroll, Progress Bar & Active Section Spy
 * 3. Accessible Mobile Navigation Drawer (Focus Trap, Escape, Scroll Lock)
 * 4. Interactive Eye-Fixation Simulator & Visual Pacer
 * 5. Interactive Ebbinghaus Forgetting Curve Visualizer
 * 6. Learning Roadmap Interactive Stations
 * 7. Scroll Reveal & Persian Count-Up
 * 8. Interactive Speed Reading & Comprehension Assessment
 * 9. Curriculum Tabs, Search Filter, Expand-All & Accessible Accordions
 * 10. Consultation Form & WhatsApp Follow-Up
 * 11. Smart Mobile Sticky CTA Visibility Observer
 * 12. Blog Hub Interactive Category Filter
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndScrollSpy();
  initMobileNavigation();
  initPainPointsMirror();
  initEyeFixationSimulator();
  initEbbinghausVisualizer();
  initStationsRoadmap();
  initScrollRevealAndCountUp();
  initSpeedReadingTest();
  initCurriculumAndAccordions();
  initConsultationForm();
  initMobileStickyBarObserver();
  initBlogCategoryFilter();
});

/* ==========================================================================
   1B. INTERACTIVE PAIN POINTS & EMPATHY MIRROR
   ========================================================================== */

function initPainPointsMirror() {
  const grid = document.getElementById('pain-points-grid');
  const diagnosisBox = document.getElementById('pain-diagnosis-box');
  const badgeEl = document.getElementById('pain-diagnosis-badge');
  const titleEl = document.getElementById('pain-diagnosis-title');
  const descEl = document.getElementById('pain-diagnosis-desc');
  const noteInput = document.getElementById('user-note');

  if (!grid || !diagnosisBox) return;

  const cards = Array.from(grid.querySelectorAll('.pain-card'));
  const selectedPains = new Set();

  const hintEl = diagnosisBox.querySelector('.pain-diagnosis-box__hint');

  const updateDiagnosisUI = () => {
    const count = selectedPains.size;

    if (count === 0) {
      diagnosisBox.classList.remove('has-selection');
      if (badgeEl) badgeEl.textContent = 'تشخیص کارشناسی و علمی آکادمی ذهن آزاد';
      if (hintEl) hintEl.textContent = 'برای شخصی‌سازی، روی کارت‌های بالا کلیک کنید';
      if (titleEl) {
        titleEl.textContent =
          'تقصیر شما نیست؛ در مدرسه و دانشگاه به ما گفته‌اند «چه کتاب‌هایی بخوانیم»، اما هرگز آموزش نداده‌اند «چطور مطالعه کنیم»!';
      }
      if (descEl) {
        descEl.textContent =
          'وقتی با همان روش تک‌کلمه‌خوانی و روخوانی خطیِ دوران ابتدایی به سراغ منابع سنگین کنکور، دروس دانشگاهی و کتاب‌های تخصصی می‌روید، کاملاً طبیعی است که چشمتان خسته شود، تمرکزتان به هم بریزد و مطالب در حافظه نماند. خبر خوب این است که تندخوانی، تمرکز و حافظه «استعداد ذاتی» نیستند؛ بلکه مهارت‌های فنی و اکتسابی هستند که در کارگاه عملی «ذهن آزاد» گام‌به‌گام در سیستم مطالعه شما نهادینه می‌شوند.';
      }
      if (noteInput) {
        const remainingLines = noteInput.value
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l && !l.startsWith('چالش‌های اصلی من در مطالعه:'));
        noteInput.value = remainingLines.join('\n');
        noteInput.dispatchEvent(new Event('input'));
      }
      return;
    }

    diagnosisBox.classList.add('has-selection');
    const selectedLabels = Array.from(selectedPains);

    if (badgeEl) {
      badgeEl.textContent = `${toPersianDigits(count)} چالش مطالعه توسط شما انتخاب شد`;
    }
    if (hintEl) {
      hintEl.textContent = 'در فرم مشاوره پایین صفحه نیز به‌طور خودکار ثبت شد';
    }
    if (titleEl) {
      titleEl.textContent =
        'حق دارید خسته شده باشید؛ اما تمام موارد انتخاب‌شده با اصلاح عادت‌های حرکت چشم و سیستم کدگذاری حافظه کاملاً قابل‌حل هستند!';
    }
    if (descEl) {
      descEl.textContent = `چالش‌های انتخابی شما: «${selectedLabels.join('، ')}». این موارد نشانه کم‌هوشی یا کم‌کاری شما نیستند؛ بلکه نتیجه طبیعی قفل شدن روی الگوی مطالعه سنتی هستند و در ۴ فاز عملی و ۲۲ سرفصل کارگاهی «ذهن آزاد» زیر نظر استاد فاطمه آزادخواه به‌صورت ریشه‌ای برطرف می‌شوند.`;
    }
    if (noteInput) {
      const painLine = `چالش‌های اصلی من در مطالعه: ${selectedLabels.join('، ')}`;
      const existingLines = noteInput.value
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('چالش‌های اصلی من در مطالعه:'));
      noteInput.value = [...existingLines, painLine].join('\n');
      noteInput.dispatchEvent(new Event('input'));
    }
  };

  cards.forEach((card) => {
    const btn = card.querySelector('.pain-select-btn');
    const iconSpan = card.querySelector('.pain-select-btn__icon');
    const textSpan = card.querySelector('.pain-select-btn__text');
    const label = card.getAttribute('data-pain-label') || '';

    const toggleCard = () => {
      const isNowSelected = !card.classList.contains('is-selected');
      card.classList.toggle('is-selected', isNowSelected);

      if (btn) btn.setAttribute('aria-pressed', isNowSelected ? 'true' : 'false');
      if (iconSpan) iconSpan.textContent = isNowSelected ? '✓' : '+';
      if (textSpan) textSpan.textContent = isNowSelected ? 'تجربه روزمره من' : 'این مشکل من است';

      if (isNowSelected && label) {
        selectedPains.add(label);
      } else {
        selectedPains.delete(label);
      }

      updateDiagnosisUI();
    };

    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const selection = window.getSelection ? String(window.getSelection()).trim() : '';
      if (selection.length > 0) return;
      toggleCard();
    });
  });
}

/* ==========================================================================
   1. UTILITY HELPERS
   ========================================================================== */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts English or Arabic digits in a string/number to Persian digits
 */
function toPersianDigits(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)])
    .replace(/[٠-٩]/g, (d) => PERSIAN_DIGITS[d.charCodeAt(0) - 1632]);
}

/**
 * Normalizes Persian (۰-۹) and Arabic (٠-٩) digits to standard ASCII (0-9)
 */
function toEnglishDigits(value) {
  if (!value) return '';
  return String(value)
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

/**
 * Formats seconds into MM:SS with Persian digits
 */
function formatPersianTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const paddedMins = String(mins).padStart(2, '0');
  const paddedSecs = String(secs).padStart(2, '0');
  return toPersianDigits(`${paddedMins}:${paddedSecs}`);
}

/* ==========================================================================
   2. HEADER SCROLL, COMPOSITOR PROGRESS BAR (#27) & ACTIVE SECTION SPY
   ========================================================================== */

function initHeaderAndScrollSpy() {
  const header = document.getElementById('site-header');
  const progressBar = document.getElementById('scroll-progress');
  const navLinks = Array.from(document.querySelectorAll('.site-nav__link'));

  const trackedSections = navLinks
    .map((link) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return null;
      const section = document.querySelector(href);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  let ticking = false;

  const updateScrollState = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (header) {
      if (scrollY > 24) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    }

    if (trackedSections.length > 0) {
      const triggerOffset = scrollY + 160;
      let activeItem = null;

      for (const item of trackedSections) {
        const top = item.section.offsetTop;
        const height = item.section.offsetHeight;
        if (triggerOffset >= top && triggerOffset < top + height) {
          activeItem = item;
          break;
        }
      }

      navLinks.forEach((link) => {
        if (activeItem && link === activeItem.link) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'location');
        } else if (link.getAttribute('aria-current') !== 'page') {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        }
      });
    }

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateScrollState();
}

/* ==========================================================================
   3. ACCESSIBLE MOBILE NAVIGATION DRAWER
   ========================================================================== */

function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const drawerContent = drawer ? drawer.querySelector('.mobile-drawer__content') : null;

  if (!toggleBtn || !drawer || !overlay) return;

  const drawerLinks = drawer.querySelectorAll('a[href]');
  let lastFocusedElement = null;

  const getFocusableElements = () =>
    Array.from(
      drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

  const openDrawer = () => {
    lastFocusedElement = document.activeElement;
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    document.documentElement.classList.add('drawer-open');

    setTimeout(() => {
      if (!drawer.classList.contains('is-open')) return;
      // Focus the dialog itself (announced by screen readers) instead of the
      // close icon, so pointer users don't see a heavy focus ring on open.
      if (drawerContent) {
        drawerContent.focus({ preventScroll: true });
      } else if (closeBtn) {
        closeBtn.focus();
      }
    }, 50);
  };

  const closeDrawer = () => {
    if (!drawer.classList.contains('is-open')) return;
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    document.documentElement.classList.remove('drawer-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (!drawer.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (drawerContent && document.activeElement === drawerContent) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
        return;
      }

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   4. EYE-FIXATION SIMULATOR & VISUAL PACER
   ========================================================================== */

function initEyeFixationSimulator() {
  const simContainer = document.getElementById('eye-simulator');
  if (!simContainer) return;

  const modeBtns = Array.from(simContainer.querySelectorAll('.eye-sim-mode-btn'));
  const chunks = Array.from(simContainer.querySelectorAll('.sim-chunk'));
  const words = Array.from(simContainer.querySelectorAll('.sim-word'));
  const captionEl = document.getElementById('eye-sim-caption');
  const liveStatusEl = document.getElementById('eye-sim-live-status');
  const stopsEl = document.getElementById('sim-metric-stops');
  const stopsTagEl = document.getElementById('sim-metric-stops-tag');
  const stopsSubEl = document.getElementById('sim-metric-stops-sub');
  const wpmEl = document.getElementById('sim-metric-wpm');
  const wpmTagEl = document.getElementById('sim-metric-wpm-tag');
  const wpmSubEl = document.getElementById('sim-metric-wpm-sub');
  const focusEl = document.getElementById('sim-metric-focus');
  const focusTagEl = document.getElementById('sim-metric-focus-tag');
  const focusSubEl = document.getElementById('sim-metric-focus-sub');

  // Technique #11: Orb on SVG Path elements
  const pacerSvg = document.getElementById('eye-sim-pacer-svg');
  const pacerPath = document.getElementById('eye-sim-pacer-path');
  const orb = document.getElementById('eye-sim-orb');
  const orbHalo = document.getElementById('eye-sim-orb-halo');

  let currentMode = 'chunking';
  let simTimer = null;
  let stepIndex = 0;
  let isOnScreen = false;
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Pause the animation loop when the simulator leaves the viewport
  // (saves battery / main-thread work on long mobile reading sessions).
  const stopSimulation = () => {
    if (simTimer) {
      clearInterval(simTimer);
      simTimer = null;
    }
  };

  // Traditional mode includes a regression (backtracking from word 4 back to word 2) across all 13 words (0..12)
  const traditionalSequence = [0, 1, 2, 3, 4, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // Normalized progress ratios (0 -> 1 from right to left along the SVG path)
  const chunkingRatios = [0.15, 0.5, 0.85];

  const moveOrbAlongPath = (progressRatio, isTraditional, targetEl = null) => {
    if (!pacerPath || !orb || !orbHalo || typeof pacerPath.getTotalLength !== 'function') return;
    try {
      let effectiveRatio = progressRatio;
      if (targetEl && pacerSvg) {
        const svgRect = pacerSvg.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        if (svgRect.width > 40 && targetRect.width > 0) {
          const targetCenterX = targetRect.left + targetRect.width / 2;
          // Path starts on the right (x=590) and goes to the left (x=30)
          const ratioFromRight = 1 - (targetCenterX - svgRect.left) / svgRect.width;
          effectiveRatio = Math.max(0.04, Math.min(0.96, ratioFromRight));
        }
      }

      const totalLen = pacerPath.getTotalLength();
      const point = pacerPath.getPointAtLength(Math.max(0, Math.min(1, effectiveRatio)) * totalLen);
      orb.setAttribute('cx', point.x.toFixed(1));
      orb.setAttribute('cy', point.y.toFixed(1));
      orbHalo.setAttribute('cx', point.x.toFixed(1));
      orbHalo.setAttribute('cy', point.y.toFixed(1));

      if (isTraditional) {
        orb.setAttribute('fill', '#b45309');
        orbHalo.setAttribute('fill', 'rgba(180, 83, 9, 0.2)');
      } else {
        orb.setAttribute('fill', '#047857');
        orbHalo.setAttribute('fill', 'rgba(4, 120, 87, 0.18)');
      }
    } catch {
      // Fallback if SVG is hidden
    }
  };

  const clearHighlights = () => {
    chunks.forEach((c) => c.classList.remove('is-focused'));
    words.forEach((w) => w.classList.remove('is-focused'));
  };

  const runSimulationCycle = () => {
    stopSimulation();
    clearHighlights();
    stepIndex = 0;
    const shouldAnimate = isOnScreen && !reduceMotionQuery.matches;

    simContainer.setAttribute('data-active-mode', currentMode);

    if (currentMode === 'chunking') {
      if (liveStatusEl) {
        liveStatusEl.textContent = 'الگوی فعال: دریافت ۳ عبارتی (بدون برگشت نگاه)';
      }
      if (captionEl) {
        captionEl.innerHTML =
          '<strong>الگوی فعال: دریافت بسته‌ای (Chunking)</strong> — چشم به‌جای توقف فرسایشی روی تک‌تک ۱۳ کلمه، کل سطر را تنها در <strong>۳ مکث دیداری هدفمند</strong> ثبت می‌کند؛ در نتیجه خستگی عضلات چشم به حداقل می‌رسد و مغز معنای کامل جمله را یکجا دریافت می‌کند.';
      }
      if (stopsEl) stopsEl.textContent = '۳ توقف دیداری در کل سطر';
      if (stopsTagEl) stopsTagEl.textContent = '۷۵٪ فشار کمتر';
      if (stopsSubEl) stopsSubEl.textContent = 'حذف توقف‌های اضافی و جلوگیری از سوزش و خواب‌آلودگی چشم';

      if (wpmEl) wpmEl.textContent = '۴۸۰ تا ۵۵۰ کلمه در دقیقه';
      if (wpmTagEl) wpmTagEl.textContent = '۲.۸ برابر سریع‌تر';
      if (wpmSubEl) wpmSubEl.textContent = 'عبور از سد گفتار باطنی و اتمام به‌موقع منابع درسی و آزمونی';

      if (focusEl) focusEl.textContent = 'ریتم پیوسته بدون فرصت پرش فکر';
      if (focusTagEl) focusTagEl.textContent = 'تمرکز قفل‌شده';
      if (focusSubEl) focusSubEl.textContent = 'پر شدن ظرفیت پردازش مغز با عبارات معنادار و درک عمیق‌تر متن';

      if (chunks.length > 0) {
        chunks[0].classList.add('is-focused');
        moveOrbAlongPath(chunkingRatios[0], false, chunks[0]);
      }

      if (shouldAnimate) {
        simTimer = setInterval(() => {
          clearHighlights();
          stepIndex = (stepIndex + 1) % chunks.length;
          const activeChunk = chunks[stepIndex];
          if (activeChunk) activeChunk.classList.add('is-focused');
          moveOrbAlongPath(chunkingRatios[stepIndex] || 0.5, false, activeChunk);
        }, 950);
      }
    } else {
      if (liveStatusEl) {
        liveStatusEl.textContent = 'الگوی فعال: تک‌کلمه‌خوانی سنتی + برگشت چشم (Regression)';
      }
      if (captionEl) {
        captionEl.innerHTML =
          '<strong>الگوی فعال: مطالعه سنتی (کلمه‌خوانی + برگشت نگاه)</strong> — چشم روی تک‌تک ۱۳ واژه مکث می‌کند، در میانه سطر به عقب برمی‌گردد (Regression) و سرعت مطالعه به سقف سرعت گفتار باطنی محدود می‌شود.';
      }
      if (stopsEl) stopsEl.textContent = '۱۳ توقف + برگشت مکرر به عقب';
      if (stopsTagEl) stopsTagEl.textContent = 'خستگی زودرس';
      if (stopsSubEl) stopsSubEl.textContent = 'فشار سنگین به عضلات حرکتی چشم و سنگینی پلک در کمتر از ۳۰ دقیقه';

      if (wpmEl) wpmEl.textContent = '۱۵۰ تا ۱۸۰ کلمه در دقیقه';
      if (wpmTagEl) wpmTagEl.textContent = 'قفل روی گفتار باطنی';
      if (wpmSubEl) wpmSubEl.textContent = 'کندی شدید پیشروی در کتاب‌ها و عقب ماندن از بودجه‌بندی برنامه';

      if (focusEl) focusEl.textContent = 'مستعد سرگردانی ذهن و پرش افکار';
      if (focusTagEl) focusTagEl.textContent = 'تمرکز شکننده';
      if (focusSubEl) focusSubEl.textContent = 'ایجاد فضای خالی در مغز به دلیل کندی چشم و قطع شدن زنجیره معنا';

      if (words.length > 0) {
        words[0].classList.add('is-focused');
        moveOrbAlongPath(0.05, true, words[0]);
      }

      if (shouldAnimate) {
        simTimer = setInterval(() => {
          clearHighlights();
          stepIndex = (stepIndex + 1) % traditionalSequence.length;
          const wordIdx = traditionalSequence[stepIndex];
          const activeWord = words[wordIdx];
          if (activeWord) activeWord.classList.add('is-focused');
          const ratio = 0.05 + (wordIdx / Math.max(1, words.length - 1)) * 0.9;
          moveOrbAlongPath(ratio, true, activeWord);
        }, 520);
      }
    }
  };

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-sim-mode');
      if (!mode || mode === currentMode) return;
      currentMode = mode;

      modeBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('is-active', isCurrent);
        b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });

      runSimulationCycle();
    });
  });

  // Render the initial state, then only animate while visible & motion is allowed
  runSimulationCycle();

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isOnScreen = entry.isIntersecting;
          if (isOnScreen) {
            runSimulationCycle();
          } else {
            stopSimulation();
          }
        });
      },
      { threshold: 0.15 }
    );
    visibilityObserver.observe(simContainer);
  } else {
    isOnScreen = true;
    runSimulationCycle();
  }

  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', () => {
      if (isOnScreen) runSimulationCycle();
    });
  }

  window.addEventListener('pagehide', stopSimulation);
}


/* ==========================================================================
   5. EBBINGHAUS FORGETTING CURVE VISUALIZER
   ========================================================================== */

const EBBINGHAUS_MILESTONES = [
  {
    x: 166,
    yGood: 28,
    yBad: 108,
    timeLabel: 'وضعیت حافظه: ۲۰ دقیقه پس از پایان مطالعه',
    valBad: '۵۸٪ ماندگاری (۴۲٪ فراموشی اولیه)',
    valGood: '۹۵٪ تثبیت با مرور اول (۳ دقیقه)',
    note: 'اقدام عملی در این نقطه: بلافاصله پس از اتمام یک بخش، کتاب را ببندید و ۳ دقیقه کلیدواژه‌های اصلی را روی نقشه ذهنی (Mind Map) مرور کنید.'
  },
  {
    x: 276,
    yGood: 28,
    yBad: 150,
    timeLabel: 'وضعیت حافظه: ۲۴ ساعت پس از مطالعه',
    valBad: '۳۰٪ ماندگاری (۷۰٪ فراموشی)',
    valGood: '۹۰٪ بازیابی با مرور دوم (۵ دقیقه)',
    note: 'اقدام عملی در این نقطه: فردای روز مطالعه، به جای بازخوانی کل فصل، فقط ۵ دقیقه به شاخه‌های نقشه ذهنی نگاه کنید و کلیدواژه‌ها را بازیابی نمایید.'
  },
  {
    x: 382,
    yGood: 28,
    yBad: 170,
    timeLabel: 'وضعیت حافظه: ۷ روز پس از مطالعه',
    valBad: '۲۰٪ ماندگاری (۸۰٪ فراموشی)',
    valGood: '۸۸٪ تثبیت با مرور سوم (۳ دقیقه)',
    note: 'اقدام عملی در این نقطه: در پایان هفته، یک مرور تصویری ۳ دقیقه‌ای روی نقشه ذهنی انجام دهید تا اطلاعات وارد حافظه بلندمدت شوند.'
  },
  {
    x: 480,
    yGood: 44,
    yBad: 180,
    timeLabel: 'وضعیت حافظه: ۳۰ روز پس از مطالعه (تثبیت بلندمدت)',
    valBad: 'کمتر از ۱۵٪ ماندگاری (نیاز به مطالعه مجدد از صفر)',
    valGood: '۸۵٪+ ماندگاری پایدار در حافظه بلندمدت',
    note: 'اقدام عملی در این نقطه: با اجرای ۳ مرور کوتاه قبلی، اکنون در شب امتحان تنها با ۲ دقیقه نگاه به نقشه ذهنی، کل فصل در ذهنتان زنده می‌شود.'
  }
];

function initEbbinghausVisualizer() {
  const widget = document.getElementById('ebbinghaus-widget');
  if (!widget) return;

  const svg = document.getElementById('ebbinghaus-svg') || widget.querySelector('.ebbinghaus-svg');
  const scrollWrap = widget.querySelector('.ebbinghaus-chart-scroll');
  const chips = Array.from(widget.querySelectorAll('.ebbinghaus-summary-chip[data-milestone]'));
  const axisLabels = Array.from(widget.querySelectorAll('[data-axis-milestone]'));
  const activeLine = document.getElementById('ebbinghaus-active-line');
  const pointGood = document.getElementById('ebbinghaus-point-good');
  const pointBad = document.getElementById('ebbinghaus-point-bad');
  const timeLabel = document.getElementById('ebbinghaus-time-label');
  const valBad = document.getElementById('ebbinghaus-val-bad');
  const valGood = document.getElementById('ebbinghaus-val-good');
  const noteEl = document.getElementById('ebbinghaus-note');

  let currentIdx = 1;

  const selectMilestone = (idx) => {
    const data = EBBINGHAUS_MILESTONES[idx];
    if (!data) return;
    currentIdx = idx;

    chips.forEach((chip) => {
      const chipIdx = Number(chip.getAttribute('data-milestone'));
      chip.classList.toggle('is-active', chipIdx === idx);
    });

    axisLabels.forEach((lbl) => {
      const lblIdx = Number(lbl.getAttribute('data-axis-milestone'));
      lbl.setAttribute('fill', lblIdx === idx ? '#b45309' : '#0f172a');
    });

    if (scrollWrap) {
      scrollWrap.setAttribute('aria-valuenow', String(idx));
      scrollWrap.setAttribute('aria-valuetext', data.timeLabel);
    }

    if (activeLine) {
      activeLine.setAttribute('x1', String(data.x));
      activeLine.setAttribute('x2', String(data.x));
    }
    if (pointGood) {
      pointGood.setAttribute('cx', String(data.x));
      pointGood.setAttribute('cy', String(data.yGood));
    }
    if (pointBad) {
      pointBad.setAttribute('cx', String(data.x));
      pointBad.setAttribute('cy', String(data.yBad));
    }
    if (timeLabel) timeLabel.textContent = data.timeLabel;
    if (valBad) valBad.textContent = data.valBad;
    if (valGood) valGood.textContent = data.valGood;
    if (noteEl) {
      noteEl.innerHTML = `<strong>${data.note.split(':')[0]}:</strong>${data.note.slice(data.note.indexOf(':') + 1)}`;
    }
  };

  const getNearestMilestoneFromClientX = (clientX) => {
    if (!svg) return currentIdx;
    const rect = svg.getBoundingClientRect();
    if (!rect.width) return currentIdx;
    const svgX = ((clientX - rect.left) / rect.width) * 520;
    let nearestIdx = 0;
    let minDist = Infinity;
    EBBINGHAUS_MILESTONES.forEach((m, idx) => {
      const dist = Math.abs(svgX - m.x);
      if (dist < minDist) {
        minDist = dist;
        nearestIdx = idx;
      }
    });
    return nearestIdx;
  };

  if (svg) {
    let isPointerDown = false;

    const updateFromClientX = (clientX) => {
      const nextIdx = getNearestMilestoneFromClientX(clientX);
      if (nextIdx !== currentIdx) {
        selectMilestone(nextIdx);
      }
    };

    svg.addEventListener('pointerdown', (e) => {
      isPointerDown = true;
      updateFromClientX(e.clientX);
    });

    svg.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse' || isPointerDown) {
        updateFromClientX(e.clientX);
      }
    });

    window.addEventListener('pointerup', () => {
      isPointerDown = false;
    });

    svg.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches && e.touches[0]) {
          updateFromClientX(e.touches[0].clientX);
        }
      },
      { passive: true }
    );

    svg.addEventListener(
      'touchmove',
      (e) => {
        if (e.touches && e.touches[0]) {
          updateFromClientX(e.touches[0].clientX);
        }
      },
      { passive: true }
    );

    svg.addEventListener('click', (e) => {
      updateFromClientX(e.clientX);
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const idx = Number(chip.getAttribute('data-milestone'));
      if (!Number.isNaN(idx)) selectMilestone(idx);
    });
  });

  if (scrollWrap) {
    scrollWrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        selectMilestone(Math.min(EBBINGHAUS_MILESTONES.length - 1, currentIdx + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        selectMilestone(Math.max(0, currentIdx - 1));
      }
    });
  }

  selectMilestone(currentIdx);
}

/* ==========================================================================
   6. LEARNING ROADMAP INTERACTIVE STATIONS
   ========================================================================== */

function initStationsRoadmap() {
  const roadmap = document.getElementById('methodology-roadmap');
  const activePath = document.getElementById('stations-active-path');
  if (!roadmap) return;

  const stationNodes = Array.from(roadmap.querySelectorAll('.station-node'));
  const stationCards = Array.from(roadmap.querySelectorAll('[data-station-card]'));

  let totalPathLen = 0;
  if (activePath && typeof activePath.getTotalLength === 'function') {
    try {
      totalPathLen = activePath.getTotalLength();
      activePath.style.strokeDasharray = `${totalPathLen}`;
      activePath.style.strokeDashoffset = `${totalPathLen}`;
    } catch {
      totalPathLen = 0;
    }
  }

  const highlightStation = (stationNumber) => {
    stationNodes.forEach((node) => {
      const num = Number(node.getAttribute('data-station'));
      node.classList.toggle('is-active', num === stationNumber);
    });
    stationCards.forEach((card) => {
      const num = Number(card.getAttribute('data-station-card'));
      card.classList.toggle('is-station-active', num === stationNumber);
    });

    if (activePath && totalPathLen > 0) {
      const progressRatio = stationNumber === 1 ? 0.15 : stationNumber === 2 ? 0.52 : 0;
      activePath.style.strokeDashoffset = `${totalPathLen * progressRatio}`;
    }
  };

  stationCards.forEach((card) => {
    const num = Number(card.getAttribute('data-station-card'));
    card.addEventListener('mouseenter', () => highlightStation(num));
    card.addEventListener('click', () => highlightStation(num));
  });

  if ('IntersectionObserver' in window && activePath && totalPathLen > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activePath.style.strokeDashoffset = '0';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(roadmap);
  }
}

/* ==========================================================================
   7. REVEAL ON SCROLL & PERSIAN COUNT-UP
   ========================================================================== */

function initScrollRevealAndCountUp() {
  if (!('IntersectionObserver' in window)) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Persian Count Up
  const countElements = Array.from(document.querySelectorAll('[data-count-target]'));
  if (countElements.length > 0 && !prefersReducedMotion) {
    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          obs.unobserve(el);

          const targetVal = Number(el.getAttribute('data-count-target'));
          const prefix = el.getAttribute('data-count-prefix') || '';
          const suffix = el.getAttribute('data-count-suffix') || '';
          if (Number.isNaN(targetVal) || targetVal <= 0) return;

          const durationMs = 1100;
          const startTime = performance.now();

          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.max(1, Math.round(eased * targetVal));
            el.textContent = `${prefix}${currentVal.toLocaleString('fa-IR')}${suffix}`;

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );

    countElements.forEach((el) => countObserver.observe(el));
  }

  // Technique #28: Reveal on Scroll for below-the-fold cards
  if (prefersReducedMotion) return;

  const revealTargets = Array.from(
    document.querySelectorAll(
      '#pain-points .card, #courses .course-card, #outcomes .outcome-card, #audience .card, #methodology .method-card, #social-proof .testimonial-card, #scientific-basis .citation-card, #blog .citation-card, #articles .article-card'
    )
  );

  revealTargets.forEach((el, index) => {
    el.classList.add('reveal-item');
    el.style.transitionDelay = `${(index % 3) * 65}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

/*/* ==========================================================================
   8. INTERACTIVE SPEED READING & COMPREHENSION ASSESSMENT (TWO-PHASE RS)
   ========================================================================== */

const SCAN_TEXT_BANK = [
  {
    id: 'scan_1',
    title: 'شگفتی‌های ناشناخته زیست‌شناسی اعماق اقیانوس‌ها',
    text: 'ژرفای اقیانوس‌ها یکی از کم‌شناخته‌شده‌ترین و اسرارآمیزترین زیست‌بوم‌های کره زمین محسوب می‌شود. در ژرفای بیش از دو هزار متری، جایی که نور خورشید توان نفوذ ندارد و تاریکی مطلق حکم‌فرماست، جاندارانی با سازگاری‌های زیستی خارق‌العاده حیات یافته‌اند. فشار خردکننده آب در این لایه‌ها صدها برابر فشار هوا در سطح زمین است، با این حال ساختار انعطاف‌پذیر بافت‌ها و پروتئین‌های سلولی ویژه، از متلاشی شدن این موجودات جلوگیری می‌کند. یکی از جذاب‌ترین سازوکارهای تکاملی در این قلمرو تاریک، پدیده تولید نور زیستی یا بیولومینسانس است. بسیاری از ماهیان مرکب، چترهای دریایی و شکارچیان ترسناک اعماق، از اندام‌های نورافشان خود نه تنها برای فریب طعمه‌ها بلکه به منظور جفت‌یابی و اعلام خطر به هم‌نوعان استفاده می‌کنند. علاوه بر این، در پیرامون دهانه‌های گرمابی زیردریایی، جریان‌های غنی از گوگرد و متان باعث شکل‌گیری زنجیره‌های غذایی مستقل از نور خورشید شده‌اند. در این سامانه‌ها باکتری‌های شیمیوسنتزکننده جایگزین گیاهان شده و مواد شیمیایی را به قندهای زیستی تبدیل می‌نمایند. دانشمندان بر این باورند که درک سازوکار بقای زیست در چنین شرایط سهمگین، می‌تواند کلید کشف نشانه‌های حیات احتمالی در اقمار یخ‌زده منظومه شمسی نظیر انسلادوس باشد.'
  },
  {
    id: 'scan_2',
    title: 'پدیدارشناسی معماری بومی در اقلیم‌های کویری',
    text: 'معماری سنتی مناطق گرم و خشک ایران از شاهکارهای خردورزی انسان در سازگاری با طبیعت خشن و کم‌باران به شمار می‌رود. در ساخت این سازه‌ها، استادکاران کهن بدون دسترسی به ابزارهای مکانیکی مدرن و سوخت‌های فسیلی، سامانه‌های خنک‌کننده طبیعی خارق‌العاده‌ای ابداع نمودند. برجسته‌ترین نماد این تدبیر مهندسی، بادگیرها هستند. بادگیرها با هدایت نسیم‌های ملایم مرتفع به درون اتاق‌ها و عبور دادن آن از روی حوضچه‌های سرداب، کورانی خنک و مطبوع از طریق سرمایش تبخیری پدید می‌آوردند. همچنین دیوارهای قطور ساخته‌شده از خشت خام و کاهگل، با ظرفیت گرمایی شگفت‌انگیز خود مانع نفوذ حرارت داغ روز به داخل خانه می‌شدند و در سرمای خشک شبانگاه، این گرمای ذخیره‌شده را به آرامی به فضای داخلی بازمی‌تاباندند. کوچه‌های سرپوشیده و پیچ‌درپیچ که با نام ساباط شناخته می‌شوند، نه‌تنها از رهگذران در برابر تابش سوزان آفتاب ظهر محافظت می‌کردند، بلکه باعث شکستن تندبادهای شن و کاهش گردوغبار در بافت شهری می‌شدند. این الگوهای معماری هم‌اکنون به عنوان مرجعی الهام‌بخش در طراحی ساختمان‌های پایدار، دوستدار محیط زیست و کم‌مصرف در دانشگاه‌های معتبر جهان مورد پژوهش گسترده قرار دارند.'
  }
];

const COMPREHENSION_TEXT_BANK = [
  {
    id: 'comp_1',
    title: 'روان‌شناسی تصمیم‌گیری و خطاهای شناختی ذهن',
    text: 'ذهن انسان با وجود پیشرفت‌های شگرف فکری، در فرایند قضاوت و تصمیم‌گیری تحت تاثیر خطاهای شناختی نظام‌مند قرار دارد. بر اساس نظریه دوگانه اندیشیدن، انسان دارای دو سامانه پردازشی است؛ سامانه نخست که شهودی، خودکار و با سرعت فوق‌العاده عمل می‌کند و سامانه دوم که منطقی، کند، تحلیلی و نیازمند صرف انرژی ذهنی فراوان است. بسیاری از لغزش‌های تصمیم‌گیری زمانی رخ می‌دهند که سامانه نخست به جای سامانه دوم فرماندهی اندیشه را به دست می‌گیرد. یکی از شناخته‌شده‌ترین این دام‌ها، «خطای تایید» است؛ گرایشی ناخودآگاه که در آن فرد صرفاً به جستجو و پذیرش شواهدی می‌پردازد که باورهای پیشین او را تایید کنند و اطلاعات متناقض را به سادگی نادیده می‌گیرد. خطای دیگر «لنگراندازی» نام دارد که طی آن، نخستین عدد یا اطلاعی که ذهن دریافت می‌کند مبنای تخمین‌های بعدی قرار می‌گیرد، حتی اگر آن داده کاملاً بی‌ربط باشد. همچنین «خطای هزینه غرق‌شده» باعث می‌شود افراد به سرمایه‌گذاری روی پروژه‌های ناموفق کاری یا روابط فرسایشی ادامه دهند صرفاً به دلیل منابع مالی یا زمانی که در گذشته برای آن فدا کرده‌اند. شناخت این خطاهای پنهان گامی حیاتی در بهبود مدیریت فردی و تصمیم‌گیری‌های کلان سازمانی به شمار می‌رود.',
    questions: [
      {
        type: 'multiple_choice',
        question: 'بر اساس متن، ویژگی اصلی «سامانه نخست» در مدل دوگانه اندیشیدن چیست؟',
        options: ['کند، تحلیلی و با تمرکز بالا', 'خودکار، شهودی و بسیار سریع', 'مبتنی بر منطق ریاضی و بدون خطا', 'وابسته به صرف انرژی ذهنی زیاد'],
        correctAnswer: 1
      },
      {
        type: 'fill_in_the_blank',
        question: 'گرایش ناخودآگاه به پذیرش شواهدی که فقط باورهای پیشین فرد را تایید می‌کند، خطای [...] نام دارد.',
        options: ['لنگراندازی', 'هزینه غرق‌شده', 'تایید', 'دسترس‌پذیری'],
        correctAnswer: 2
      },
      {
        type: 'true_false',
        question: 'در پدیده «خطای لنگراندازی»، ذهن همواره نخستین داده ورودی را مبنای محاسبات بعدی قرار می‌دهد.',
        options: ['صحیح است', 'غلط است'],
        correctAnswer: 0
      },
      {
        type: 'multiple_choice',
        question: 'علت اصلی تداوم سرمایه‌گذاری در پروژه‌های شکست‌خورده بر اثر خطای هزینه غرق‌شده چیست؟',
        options: ['اطمینان قطعی از سودآوری آینده', 'عدم دسترسی به منابع جدید مالی', 'حسرت و تعصب روی منابع و زمانِ ازدست‌رفته گذشته', 'توصیه‌های تحلیلگران و مشاوران'],
        correctAnswer: 2
      },
      {
        type: 'true_false',
        question: 'سامانه دوم اندیشیدن بدون هیچ‌گونه نیاز به صرف انرژی شناختی و به شکل خودکار عمل می‌کند.',
        options: ['صحیح است', 'غلط است'],
        correctAnswer: 1
      },
      {
        type: 'fill_in_the_blank',
        question: 'بسیاری از اشتباهات قضاوت زمانی رخ می‌دهد که سامانه نخست به جای سامانه [...] هدایت ذهن را به عهده می‌گیرد.',
        options: ['دوم (تحلیلی)', 'هیجانی', 'خودکار', 'ناخودآگاه'],
        correctAnswer: 0
      },
      {
        type: 'multiple_choice',
        question: 'هدف نهایی نویسنده از تشریح خطاهای شناختی چیست؟',
        options: ['اثبات ناکارآمدی ساختار مغز انسان', 'ترویج تصمیم‌گیری صرفاً با حدس‌های شهودی', 'ارتقای کیفیت تصمیم‌گیری‌های فردی و مدیریتی با شناخت تله‌های ذهن', 'جایگزینی کامل هوش مصنوعی با مدیران'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'comp_2',
    title: 'انقلاب ریززیواگان (میکروبیوم) و سلامت جامع نگر انسان',
    text: 'در دهه‌های گذشته پزشکی نوین میکروب‌ها را صرفاً عوامل بیماری‌زا می‌پنداشت، اما کشف ژرفای میکروبیوم دستگاه گوارش این دیدگاه را دگرگون کرد. بدن انسان میزبان تریلیون‌ها باکتری، قارچ و ویروس مفید است که وزن کل آن‌ها گاه به بیش از دو کیلوگرم می‌رسد. این همزیستان میکروبی نه‌تنها در هضم فیبرهای پیچیده غذایی و سنتز ویتامین‌های حیاتی مانند ویتامین کا و ب۱۲ نقشی کلیدی ایفا می‌کنند، بلکه با ترشح مواد شیمیایی مستقیماً بر سیستم ایمنی و واکنش‌های التهابی نظارت دارند. ارتباط میان روده و مغز که به محور روده-مغز مشهور است، یکی از هیجان‌انگیزترین عرصه‌های دانش معاصر است. جالب اینکه حدود نود درصد از انتقال‌دهنده عصبی سروتونین که تنظیم‌کننده خلق‌وخو و احساس شادی است، در لوله گوارش و تحت تاثیر فعالیت این باکتری‌ها تولید می‌شود. رژیم‌های غذایی غنی از مواد فرآوری‌شده، استرس مزمن و مصرف بی‌رویه آنتی‌بیوتیک‌ها، این تعادل زیستی ظریف را برهم می‌زند؛ اختلالی که به نام دیس‌بیوزیس شناخته شده و با افسردگی، چاقی و بیماری‌های خودایمنی مرتبط دانسته می‌شود. بنابراین تغذیه متنوع با فیبرهای پروبیوتیک، ضامن شادابی روانی و جسمانی است.',
    questions: [
      {
        type: 'multiple_choice',
        question: 'دیدگاه جدید علم پزشکی در مقایسه با گذشته درباره میکروب‌های بدن چیست؟',
        options: ['همه میکروب‌ها باید با آنتی‌بیوتیک از بین بروند', 'میکروب‌های مفید نقش اساسی در حفظ سلامت و ایمنی بدن دارند', 'میکروب‌ها نقشی در تولید ویتامین‌ها ندارند', 'میکروبیوم تنها در شرایط بیماری ایجاد می‌شود'],
        correctAnswer: 1
      },
      {
        type: 'fill_in_the_blank',
        question: 'حدود نود درصد از انتقال‌دهنده عصبی [...] که مسئول تنظیم خلق‌وخو و شادی است در روده ساخته می‌شود.',
        options: ['دوپامین', 'آدرنالین', 'سروتونین', 'ملاتونین'],
        correctAnswer: 2
      },
      {
        type: 'true_false',
        question: 'باکتری‌های روده قادرند در سنتز ویتامین‌های حیاتی نظیر ویتامین K نقش مستقیم داشته باشند.',
        options: ['صحیح است', 'غلط است'],
        correctAnswer: 0
      },
      {
        type: 'fill_in_the_blank',
        question: 'برهم‌خوردن تعادل ظریف میکروبی روده به اصطلاح پزشکی [...] نامیده می‌شود.',
        options: ['دیس‌بیوزیس', 'شیمیوسنتز', 'بیولومینسانس', 'هومئوستازی'],
        correctAnswer: 0
      },
      {
        type: 'multiple_choice',
        question: 'کدام عامل از عوامل آسیب‌رسان به تنوع باکتری‌های سودمند روده در متن شمرده شده است؟',
        options: ['مصرف غذاهای حاوی فیبر گیاهی', 'ورزش مداوم و خواب کافی', 'مصرف بی‌رویه آنتی‌بیوتیک و غذاهای فرآوری‌شده', 'نوشیدن آب تصفیه شده'],
        correctAnswer: 2
      },
      {
        type: 'true_false',
        question: 'طبق متن، هیچ‌گونه ارتباط شیمیایی یا عصبی مستقیمی میان دستگاه گوارش و مغز وجود ندارد.',
        options: ['صحیح است', 'غلط است'],
        correctAnswer: 1
      },
      {
        type: 'multiple_choice',
        question: 'میکروبیوم دستگاه گوارش چگونه بر روی چاقی و خلق‌وخوی انسان تاثیر می‌گذارد؟',
        options: ['از طریق تنظیم سوخت‌وساز، ترشح سروتونین و ارتباط محور روده-مغز', 'تنها با ایجاد سیری کاذب در ساعات شب', 'با تخریب کامل اسیدهای آمینه ضروری', 'با تغییر رنگ پوست'],
        correctAnswer: 0
      }
    ]
  }
];

let latestSpeedTestResult = null;

class ReadingSpeedTest {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.scanTextBank = options.scanTextBank || SCAN_TEXT_BANK;
    this.comprehensionTextBank = options.comprehensionTextBank || COMPREHENSION_TEXT_BANK;
    this.onComplete = options.onComplete || null;

    this.state = 'intro';
    this.readerFontSize = 17;
    this.guideRulerActive = false;

    this.scanData = null;
    this.scanStartTime = 0;
    this.scanElapsedSeconds = 0;
    this.scanWordCount = 0;
    this.scanWpm = 0;

    this.deepData = null;
    this.deepStartTime = 0;
    this.deepElapsedSeconds = 0;
    this.deepWordCount = 0;
    this.deepWpm = 0;
    this.activeQuestions = [];
    this.userAnswers = {};

    this.timerInterval = null;

    if (this.container) {
      this.bindAntiCheatMethods();
      this.render();
    }
  }

  static countFarsiWords(text) {
    if (!text || typeof text !== 'string') return 0;
    const cleanText = text
      .replace(/[\u200C\u200B]/g, ' ')
      .replace(/[.,،؛:!؟?()\[\]{}"'\-_/\\«»]/g, ' ')
      .trim();
    return cleanText.split(/\s+/).filter((word) => word.length > 0).length;
  }

  static getProficiencyLevel(wpm) {
    if (wpm < 200) {
      return {
        level: 'کندخوان',
        badge: 'نیاز به تقویت تمرکز و کاهش مکث',
        recommendedCourse: 'رشد فردی و کتاب‌خوانی عمومی'
      };
    }
    if (wpm >= 200 && wpm <= 300) {
      return {
        level: 'متوسط (طبیعی)',
        badge: 'نزدیک به میانگین جامعه دانشگاهی',
        recommendedCourse: 'آمادگی کنکور و آزمون‌های تخصصی'
      };
    }
    if (wpm > 300 && wpm <= 400) {
      return {
        level: 'خواننده ماهر',
        badge: 'تسلط عالی بر گروه‌بندی کلمات',
        recommendedCourse: 'مطالعه سریع مقالات و کتب دانشگاهی'
      };
    }
    return {
      level: 'تندخوان پیشرفته',
      badge: 'توانایی بالا در پردازش ادراکی هم‌زمان',
      recommendedCourse: 'تمرکز عمیق و خلاصه‌سازی با Mind Map'
    };
  }

  scrollToContainer() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo({ top: Math.max(0, rect.top + scrollTop - 90), behavior: 'smooth' });
  }

  startScanTest() {
    const randScan = this.scanTextBank[Math.floor(Math.random() * this.scanTextBank.length)];
    this.scanData = randScan;
    this.scanWordCount = ReadingSpeedTest.countFarsiWords(randScan.text);

    this.state = 'reading_scan';
    this.scanStartTime = performance.now();
    this.render();
    this.scrollToContainer();
    this.startTimer('scanLiveTimer', this.scanStartTime);
    this.attachReaderTools('scanContentBox', 'scanRuler');
    this.enableAntiCheat();
  }

  finishScanTest() {
    const endTime = performance.now();
    this.scanElapsedSeconds = Math.max(1, (endTime - this.scanStartTime) / 1000);
    this.scanWpm = Math.round((this.scanWordCount / this.scanElapsedSeconds) * 60);
    this.stopTimer();
    this.disableAntiCheat();

    this.state = 'scan_done';
    this.render();
    this.scrollToContainer();
  }

  startDeepReading() {
    const randDeep =
      this.comprehensionTextBank[Math.floor(Math.random() * this.comprehensionTextBank.length)];
    this.deepData = randDeep;
    this.deepWordCount = ReadingSpeedTest.countFarsiWords(randDeep.text);

    this.activeQuestions = [...randDeep.questions].sort(() => Math.random() - 0.5);
    this.userAnswers = {};

    this.state = 'reading_deep';
    this.deepStartTime = performance.now();
    this.render();
    this.scrollToContainer();
    this.startTimer('deepLiveTimer', this.deepStartTime);
    this.attachReaderTools('deepContentBox', 'deepRuler');
    this.enableAntiCheat();
  }

  finishDeepReading() {
    const endTime = performance.now();
    this.deepElapsedSeconds = Math.max(1, (endTime - this.deepStartTime) / 1000);
    this.deepWpm = Math.round((this.deepWordCount / this.deepElapsedSeconds) * 60);
    this.stopTimer();
    this.disableAntiCheat();

    this.state = 'quiz';
    this.render();
    this.scrollToContainer();
  }

  startTimer(timerElementId, startTimestamp) {
    this.stopTimer();
    const timerDisplay = this.container.querySelector(`#${timerElementId}`);
    this.timerInterval = setInterval(() => {
      if (!timerDisplay) return;
      const elapsed = (performance.now() - startTimestamp) / 1000;
      const mins = Math.floor(elapsed / 60)
        .toString()
        .padStart(2, '0');
      const secs = Math.floor(elapsed % 60)
        .toString()
        .padStart(2, '0');
      timerDisplay.textContent = toPersianDigits(`${mins}:${secs}`);
    }, 200);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  attachReaderTools(boxId, rulerId) {
    const box = this.container.querySelector(`#${boxId}`);
    const ruler = this.container.querySelector(`#${rulerId}`);
    const surface = box ? box.closest('.rs-reading-surface') : null;
    if (!box || !ruler) return;

    const updateRulerPos = (clientY) => {
      if (!this.guideRulerActive || !surface) return;
      const rect = surface.getBoundingClientRect();
      const topPos = clientY - rect.top - 19;
      ruler.style.top = `${Math.max(0, Math.min(topPos, surface.clientHeight - 38))}px`;
    };

    if (surface) {
      surface.addEventListener('mousemove', (e) => updateRulerPos(e.clientY));
      surface.addEventListener(
        'touchmove',
        (e) => {
          if (e.touches && e.touches[0]) {
            updateRulerPos(e.touches[0].clientY);
          }
        },
        { passive: true }
      );
    }

    const btnIncrease = this.container.querySelector('#btnFontIncrease');
    const btnDecrease = this.container.querySelector('#btnFontDecrease');
    const btnToggleRuler = this.container.querySelector('#btnToggleRuler');

    if (btnIncrease) {
      btnIncrease.addEventListener('click', () => {
        if (this.readerFontSize < 22) {
          this.readerFontSize += 1.5;
          box.style.fontSize = `${this.readerFontSize}px`;
        }
      });
    }

    if (btnDecrease) {
      btnDecrease.addEventListener('click', () => {
        if (this.readerFontSize > 13) {
          this.readerFontSize -= 1.5;
          box.style.fontSize = `${this.readerFontSize}px`;
        }
      });
    }

    if (btnToggleRuler) {
      if (this.guideRulerActive) {
        ruler.style.display = 'block';
        btnToggleRuler.classList.add('is-active');
      }
      btnToggleRuler.addEventListener('click', () => {
        this.guideRulerActive = !this.guideRulerActive;
        ruler.style.display = this.guideRulerActive ? 'block' : 'none';
        btnToggleRuler.classList.toggle('is-active', this.guideRulerActive);
      });
    }
  }

  selectAnswer(qIndex, optionIndex) {
    this.userAnswers[qIndex] = optionIndex;
    this.checkQuizCompleteness();
  }

  checkQuizCompleteness() {
    const answeredCount = Object.keys(this.userAnswers).length;
    const total = this.activeQuestions.length;
    const btn = this.container.querySelector('#btnSubmitQuiz');
    const progressBadge = this.container.querySelector('#quizProgressBadge');

    if (progressBadge) {
      progressBadge.textContent = `${toPersianDigits(answeredCount)} از ${toPersianDigits(total)} پاسخ داده شده`;
    }

    if (btn) {
      if (answeredCount === total) {
        btn.removeAttribute('disabled');
        btn.classList.remove('is-disabled');
      } else {
        btn.setAttribute('disabled', 'true');
        btn.classList.add('is-disabled');
      }
    }
  }

  evaluateQuiz() {
    let correctCount = 0;
    const totalQuestions = this.activeQuestions.length;

    this.activeQuestions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const comprehensionPercent = Math.round((correctCount / totalQuestions) * 100);
    const effectiveSpeed = Math.round(this.deepWpm * (comprehensionPercent / 100));
    const levelInfo = ReadingSpeedTest.getProficiencyLevel(effectiveSpeed);

    const finalResult = {
      date: new Date().toLocaleDateString('fa-IR'),
      timestamp: Date.now(),
      scanWpm: this.scanWpm,
      deepWpm: this.deepWpm,
      comprehensionPercent,
      effectiveSpeed,
      level: levelInfo.level,
      badge: levelInfo.badge,
      recommendedCourse: levelInfo.recommendedCourse,
      correctCount,
      totalQuestions,
      scanWordCount: this.scanWordCount,
      deepWordCount: this.deepWordCount
    };

    latestSpeedTestResult = {
      rawWpm: finalResult.scanWpm,
      effectiveWpm: finalResult.effectiveSpeed,
      comprehensionPct: finalResult.comprehensionPercent,
      ratingLabel: finalResult.level,
      recommendedCourse: finalResult.recommendedCourse
    };

    this.saveHistory(finalResult);

    if (this.onComplete && typeof this.onComplete === 'function') {
      this.onComplete(finalResult);
    }

    this.finalResult = finalResult;
    this.state = 'result';
    this.render();
    this.scrollToContainer();
  }

  saveHistory(result) {
    try {
      const existing = JSON.parse(localStorage.getItem('reading_speed_history') || '[]');
      const itemToSave = {
        date: result.date,
        timestamp: result.timestamp,
        wordCount: result.deepWordCount,
        rawWpm: result.scanWpm,
        comprehensionPercent: result.comprehensionPercent,
        effectiveSpeed: result.effectiveSpeed,
        level: result.level
      };
      existing.push(itemToSave);
      localStorage.setItem('reading_speed_history', JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }
  }

  bindAntiCheatMethods() {
    this.onPreventAction = (e) => {
      if (this.state === 'reading_scan' || this.state === 'reading_deep') {
        e.preventDefault();
      }
    };
  }

  enableAntiCheat() {
    const el = this.container;
    el.classList.add('prevent-cheat');
    el.addEventListener('copy', this.onPreventAction);
    el.addEventListener('cut', this.onPreventAction);
    el.addEventListener('contextmenu', this.onPreventAction);
  }

  disableAntiCheat() {
    const el = this.container;
    el.classList.remove('prevent-cheat');
    el.removeEventListener('copy', this.onPreventAction);
    el.removeEventListener('cut', this.onPreventAction);
    el.removeEventListener('contextmenu', this.onPreventAction);
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';
    switch (this.state) {
      case 'intro':
        this.renderIntro();
        break;
      case 'reading_scan':
        this.renderReadingScan();
        break;
      case 'scan_done':
        this.renderScanDone();
        break;
      case 'reading_deep':
        this.renderReadingDeep();
        break;
      case 'quiz':
        this.renderQuiz();
        break;
      case 'result':
        this.renderResult();
        break;
    }
  }

  renderStepHeader(stepNumber) {
    return `
      <div class="rs-step-header">
        <div class="rs-step-header__steps">
          <span class="rs-step-dot ${stepNumber === 1 ? 'rs-step-dot--active' : ''}"></span>
          <span class="${stepNumber === 1 ? 'rs-step-label--active' : ''}">۱. پایش چشمی</span>
          <span class="rs-step-sep">/</span>
          <span class="rs-step-dot ${stepNumber === 2 ? 'rs-step-dot--active' : ''}"></span>
          <span class="${stepNumber === 2 ? 'rs-step-label--active' : ''}">۲. مطالعه تحلیلی</span>
          <span class="rs-step-sep">/</span>
          <span class="rs-step-dot ${stepNumber === 3 ? 'rs-step-dot--active' : ''}"></span>
          <span class="${stepNumber === 3 ? 'rs-step-label--active' : ''}">۳. ارزیابی درک مطلب</span>
        </div>
      </div>
    `;
  }

  renderIntro() {
    const historySection = document.getElementById('historySection');
    const isHistoryOpen = historySection && !historySection.hasAttribute('hidden');
    this.container.innerHTML = `
      <div class="rs-intro">
        <div class="rs-intro__inner">
          <h2 class="rs-intro__title" id="speed-test-section-title">سنجش تفکیکی مهارت خواندن</h2>
          <p class="rs-intro__desc">
            در فرایند مطالعه حرفه‌ای، دو معیار متمایز وجود دارد: <strong>سرعت اسکن فیزیکی چشم</strong> و <strong>سرعت جذب معنایی اطلاعات</strong>. این سامانه با دو متن هم‌تراز و استاندارد، فاصله بین این دو شاخص را برای شما ترسیم می‌کند.
          </p>

          <div class="rs-process-grid">
            <div class="rs-process-card">
              <div class="rs-process-card__head">
                <span class="rs-process-card__num rs-process-card__num--dark">۱</span>
                <span>اسکن خطی بدون توقف (بدون درک)</span>
              </div>
              <p class="rs-process-card__desc">
                متن اول را صرفاً با چشمان خود از ابتدا تا انتها با نهایت شتاب دنبال کنید. از این بخش هیچ سوالی پرسیده نمی‌شود.
              </p>
            </div>

            <div class="rs-process-card">
              <div class="rs-process-card__head">
                <span class="rs-process-card__num rs-process-card__num--blue">۲</span>
                <span>مطالعه ادراکی و پرسش‌نامه (با درک)</span>
              </div>
              <p class="rs-process-card__desc">
                متن دوم هم‌تراز با متن اول است اما محتوا را دقیق بخوانید تا بلافاصله به پرسش‌های مفهومی پاسخ دهید.
              </p>
            </div>
          </div>

          <div class="rs-intro__actions">
            <button type="button" id="btnStartPhase1" class="rs-btn rs-btn--primary">
              <span>شروع مرحله اول (اسکن خطوط)</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>

            <button type="button" id="toggleHistoryBtn" class="rs-btn rs-btn--soft ${isHistoryOpen ? 'is-active' : ''}" aria-expanded="${isHistoryOpen ? 'true' : 'false'}" aria-controls="historySection">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <span>سوابق و نمودار</span>
            </button>
          </div>
        </div>
      </div>
    `;
    this.container.querySelector('#btnStartPhase1').addEventListener('click', () => this.startScanTest());
  }

  renderReadingScan() {
    this.container.innerHTML = `
      ${this.renderStepHeader(1)}
      <div class="rs-stage-body">
        <div class="rs-reader-topbar">
          <div>
            <span class="rs-reader-kicker">آزمون اسکن چشمی</span>
            <h3 class="rs-reader-title">${this.scanData.title}</h3>
          </div>

          <div class="rs-reader-controls">
            <div class="rs-font-group">
              <button type="button" id="btnFontDecrease" class="rs-font-btn" title="کوچک‌تر">A-</button>
              <button type="button" id="btnFontIncrease" class="rs-font-btn rs-font-btn--bold" title="بزرگ‌تر">A+</button>
            </div>

            <button type="button" id="btnToggleRuler" class="rs-ruler-btn" title="خط‌کش راهنما">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/></svg>
              <span>خط‌کش کمکی</span>
            </button>

            <div class="rs-timer-pill">
              <span class="rs-timer-dot"></span>
              <span id="scanLiveTimer">۰۰:۰۰</span>
            </div>
          </div>
        </div>

        <div class="rs-reading-surface">
          <div id="scanRuler" class="guide-ruler"></div>
          <div id="scanContentBox" class="reader-text" style="font-size: ${this.readerFontSize}px;">
            ${this.scanData.text}
          </div>
        </div>

        <div class="rs-stage-footer">
          <div class="rs-stage-meta">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>حجم متن: ${toPersianDigits(this.scanWordCount)} کلمه | کپی‌رایت و کپی محتوا در طول ارزیابی غیرفعال است</span>
          </div>
          <button type="button" id="btnFinishScan" class="rs-btn rs-btn--primary">
            <span>پایان مطالعه متن اول</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        </div>
      </div>
    `;
    this.container.querySelector('#btnFinishScan').addEventListener('click', () => this.finishScanTest());
  }

  renderScanDone() {
    this.container.innerHTML = `
      <div class="rs-interstitial">
        <div class="rs-interstitial__icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
        </div>
        <h3 class="rs-interstitial__title">سرعت اسکن چشمی ثبت شد</h3>
        <p class="rs-interstitial__metric">
          سرعت خام اسکن: <strong>${toPersianDigits(this.scanWpm)} کلمه در دقیقه</strong>
        </p>

        <div class="rs-interstitial__box">
          <div class="rs-interstitial__box-title">دستورالعمل مرحله دوم:</div>
          در این مرحله، متنی با حجم و درجه سختی یکسان مطالعه خواهید کرد. تفاوت در این است که بلافاصله پس از اتمام، پرسش‌های درک مطلب آغاز خواهد شد. بنابراین ریتم مطالعه را برای دریافت و فهم دقیق جملات تنظیم کنید.
        </div>

        <button type="button" id="btnStartPhase2" class="rs-btn rs-btn--primary">
          <span>ورود به مرحله دوم (مطالعه تحلیلی)</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
      </div>
    `;
    this.container.querySelector('#btnStartPhase2').addEventListener('click', () => this.startDeepReading());
  }

  renderReadingDeep() {
    this.container.innerHTML = `
      ${this.renderStepHeader(2)}
      <div class="rs-stage-body">
        <div class="rs-reader-topbar">
          <div>
            <span class="rs-reader-kicker rs-reader-kicker--blue">مطالعه تحلیلی و معنادار</span>
            <h3 class="rs-reader-title">${this.deepData.title}</h3>
          </div>

          <div class="rs-reader-controls">
            <div class="rs-font-group">
              <button type="button" id="btnFontDecrease" class="rs-font-btn" title="کوچک‌تر">A-</button>
              <button type="button" id="btnFontIncrease" class="rs-font-btn rs-font-btn--bold" title="بزرگ‌تر">A+</button>
            </div>

            <button type="button" id="btnToggleRuler" class="rs-ruler-btn" title="خط‌کش راهنما">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/></svg>
              <span>خط‌کش کمکی</span>
            </button>

            <div class="rs-timer-pill rs-timer-pill--blue">
              <span class="rs-timer-dot rs-timer-dot--blue"></span>
              <span id="deepLiveTimer">۰۰:۰۰</span>
            </div>
          </div>
        </div>

        <div class="rs-reading-surface">
          <div id="deepRuler" class="guide-ruler"></div>
          <div id="deepContentBox" class="reader-text" style="font-size: ${this.readerFontSize}px;">
            ${this.deepData.text}
          </div>
        </div>

        <div class="rs-stage-footer">
          <div class="rs-stage-meta">
            <span>به محض فشردن کلید، متن پنهان شده و پرسش‌نامه فعال خواهد شد.</span>
          </div>
          <button type="button" id="btnFinishDeep" class="rs-btn rs-btn--blue">
            <span>اتمام مطالعه و شروع پرسش‌ها</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </button>
        </div>
      </div>
    `;
    this.container.querySelector('#btnFinishDeep').addEventListener('click', () => this.finishDeepReading());
  }

  renderQuiz() {
    const questionsHtml = this.activeQuestions
      .map((q, qIndex) => {
        let typeBadge = 'انتخاب چندگزینه‌ای';
        if (q.type === 'fill_in_the_blank') {
          typeBadge = 'تکمیل جای خالی';
        } else if (q.type === 'true_false') {
          typeBadge = 'صحیح / غلط';
        }

        const optionsHtml = q.options
          .map(
            (opt, optIndex) => `
              <label class="rs-option-label">
                <input type="radio" name="question_${qIndex}" value="${optIndex}" class="rs-option-input" ${this.userAnswers[qIndex] === optIndex ? 'checked' : ''} />
                <span class="rs-option-text">${opt}</span>
              </label>
            `
          )
          .join('');

        return `
          <div class="rs-question-card">
            <div class="rs-question-card__meta">
              <span class="rs-question-card__num">سوال شماره ${toPersianDigits(qIndex + 1)}</span>
              <span class="rs-question-card__type">${typeBadge}</span>
            </div>
            <h4 class="rs-question-card__title">${q.question}</h4>
            <div class="rs-options-grid ${q.type === 'true_false' ? 'rs-options-grid--two' : ''}">
              ${optionsHtml}
            </div>
          </div>
        `;
      })
      .join('');

    this.container.innerHTML = `
      ${this.renderStepHeader(3)}
      <div class="rs-stage-body">
        <div class="rs-quiz-header">
          <div>
            <h3 class="rs-reader-title">پرسش‌های ارزیابی ادراکی</h3>
            <p class="rs-topbar__subtitle">پاسخ‌های خود را با دقت انتخاب کنید (بدون محدودیت زمانی)</p>
          </div>
          <span id="quizProgressBadge" class="rs-quiz-progress-badge">
            ۰ از ${toPersianDigits(this.activeQuestions.length)} پاسخ داده شده
          </span>
        </div>

        <div class="rs-quiz-list">
          ${questionsHtml}
        </div>

        <div class="rs-stage-footer" style="justify-content: flex-end;">
          <button type="button" id="btnSubmitQuiz" class="rs-btn rs-btn--primary is-disabled" disabled>
            <span>محاسبه شاخص و صدور کارنامه</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        </div>
      </div>
    `;

    this.activeQuestions.forEach((_, qIndex) => {
      const radios = this.container.querySelectorAll(`input[name="question_${qIndex}"]`);
      radios.forEach((radio) => {
        radio.addEventListener('change', (e) => {
          this.selectAnswer(qIndex, parseInt(e.target.value, 10));
        });
      });
    });

    this.container.querySelector('#btnSubmitQuiz').addEventListener('click', () => this.evaluateQuiz());
  }

  renderResult() {
    const res = this.finalResult;
    const dropPercent = Math.max(0, Math.round(((res.scanWpm - res.deepWpm) / res.scanWpm) * 100));
    const historySection = document.getElementById('historySection');
    const isHistoryOpen = historySection && !historySection.hasAttribute('hidden');

    this.container.innerHTML = `
      <div class="rs-stage-body">
        <div class="rs-result-header">
          <div>
            <span class="rs-reader-kicker">گزارش سنجش مهارت خوانش</span>
            <h3 class="rs-reader-title">کارنامه تفکیکی عملکرد مطالعه</h3>
          </div>
          <div class="rs-result-meta">
            <div>تاریخ آزمون: <strong>${res.date}</strong></div>
            <div>صحت پاسخ‌ها: <strong>${toPersianDigits(res.correctCount)} از ${toPersianDigits(res.totalQuestions)}</strong></div>
          </div>
        </div>

        <div class="rs-metrics-grid">
          <div class="rs-metric-card">
            <div class="rs-metric-card__label">سرعت اسکن بدون درک</div>
            <div class="rs-metric-card__value">${toPersianDigits(res.scanWpm)}</div>
            <div class="rs-metric-card__sub">کلمه در دقیقه (WPM چشمی)</div>
          </div>

          <div class="rs-metric-card">
            <div class="rs-metric-card__label">میزان درک مطلب</div>
            <div class="rs-metric-card__value">${toPersianDigits(res.comprehensionPercent)}٪</div>
            <div class="rs-metric-card__sub">شاخص درک تحلیلی سوالات</div>
          </div>

          <div class="rs-metric-card rs-metric-card--featured">
            <div class="rs-metric-card__label">سرعت مطالعه با درک (مؤثر)</div>
            <div class="rs-metric-card__value">${toPersianDigits(res.effectiveSpeed)}</div>
            <div class="rs-metric-card__sub" dir="ltr">Effective Reading Speed</div>
          </div>
        </div>

        <div class="rs-analysis-box">
          <div class="rs-analysis-box__head">
            <span>ارزیابی سطح: ${res.level}</span>
            <span class="rs-analysis-box__badge">${res.badge}</span>
          </div>
          <p class="rs-analysis-box__text">
            سرعت حرکت چشمی شما در فاز اسکن <strong>${toPersianDigits(res.scanWpm)}</strong> کلمه در دقیقه بوده و هنگام درک عمیق به <strong>${toPersianDigits(res.deepWpm)}</strong> کاهش یافته است. افت <strong>${toPersianDigits(dropPercent)}٪</strong> در سرعت فیزیکی، نشان‌دهنده درگیری بهینه فرآیندهای شناختی در هنگام تحلیل متن است.
          </p>
        </div>

        <div class="rs-scale-card">
          <div class="rs-scale-card__head">مقیاس بین‌المللی سرعت مطالعه مؤثر</div>
          <div class="rs-scale-grid">
            <div class="rs-scale-cell ${res.effectiveSpeed < 200 ? 'is-current' : ''}">
              <div class="rs-scale-cell__label">کندخوان</div>
              <div class="rs-scale-cell__val">&lt; ۲۰۰</div>
            </div>
            <div class="rs-scale-cell ${res.effectiveSpeed >= 200 && res.effectiveSpeed <= 300 ? 'is-current' : ''}">
              <div class="rs-scale-cell__label">متوسط</div>
              <div class="rs-scale-cell__val">۲۰۰ تا ۳۰۰</div>
            </div>
            <div class="rs-scale-cell ${res.effectiveSpeed > 300 && res.effectiveSpeed <= 400 ? 'is-current' : ''}">
              <div class="rs-scale-cell__label">ماهر</div>
              <div class="rs-scale-cell__val">۳۰۰ تا ۴۰۰</div>
            </div>
            <div class="rs-scale-cell ${res.effectiveSpeed > 400 ? 'is-current' : ''}">
              <div class="rs-scale-cell__label">پیشرفته</div>
              <div class="rs-scale-cell__val">&gt; ۴۰۰</div>
            </div>
          </div>
        </div>

        <div class="rs-result-actions">
          <button type="button" id="btnRestartApp" class="rs-btn rs-btn--primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
            <span>شروع مجدد آزمون با متون تصادفی</span>
          </button>
          <button type="button" id="toggleHistoryBtn" class="rs-btn rs-btn--soft ${isHistoryOpen ? 'is-active' : ''}" aria-expanded="${isHistoryOpen ? 'true' : 'false'}" aria-controls="historySection">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <span>سوابق و نمودار</span>
          </button>
          <a href="#consultation" id="btnAttachToConsult" class="rs-btn rs-btn--outline">
            <span>ارسال کارنامه برای دریافت مشاوره</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </a>
        </div>
      </div>
    `;

    this.container.querySelector('#btnRestartApp').addEventListener('click', () => {
      this.state = 'intro';
      this.render();
    });

    const attachBtn = this.container.querySelector('#btnAttachToConsult');
    if (attachBtn) {
      attachBtn.addEventListener('click', () => {
        if (latestSpeedTestResult) {
          attachSpeedTestToConsultationForm(latestSpeedTestResult);
        }
      });
    }
  }
}

function renderProgressChart(history) {
  const canvas = document.getElementById('progressChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  const width = Math.max(300, rect.width || 640);
  const height = Math.max(220, rect.height || 260);

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const fontFamily = "'Vazirmatn', sans-serif";
  const padTop = 42;
  const padBottom = 34;
  const padLeft = 48;
  const padRight = 54;
  const plotW = Math.max(60, width - padLeft - padRight);
  const plotH = Math.max(60, height - padTop - padBottom);

  // Legend at top
  const legendItems = [
    { label: 'سرعت اسکن چشمی (WPM)', color: '#64748b', dashed: false },
    { label: 'سرعت مؤثر با درک', color: '#0f172a', dashed: false },
    { label: 'درصد درک مطلب', color: '#2563eb', dashed: true }
  ];
  ctx.font = `500 11px ${fontFamily}`;
  ctx.textBaseline = 'middle';
  let legendX = width - padRight;
  legendItems.forEach((item) => {
    const textW = ctx.measureText(item.label).width;
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'right';
    ctx.fillText(item.label, legendX, 16);
    const lineStart = legendX - textW - 22;
    const lineEnd = legendX - textW - 6;
    ctx.save();
    ctx.strokeStyle = item.color;
    ctx.lineWidth = 2;
    if (item.dashed) ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(lineStart, 16);
    ctx.lineTo(lineEnd, 16);
    ctx.stroke();
    ctx.restore();
    legendX = lineStart - 16;
  });

  // Compute Y scales
  const maxWpmRaw = history.reduce(
    (max, item) => Math.max(max, item.rawWpm || 0, item.effectiveSpeed || 0),
    400
  );
  const yMaxWpm = Math.ceil(maxWpmRaw / 100) * 100;

  // Grid lines & Axes labels
  const steps = 4;
  ctx.font = `500 10px ${fontFamily}`;
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    const y = padTop + plotH - ratio * plotH;

    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();

    // Right Axis: WPM
    const wpmVal = Math.round(ratio * yMaxWpm);
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'left';
    ctx.fillText(toPersianDigits(wpmVal), width - padRight + 8, y);

    // Left Axis: Comprehension %
    const compVal = Math.round(ratio * 100);
    ctx.fillStyle = '#2563eb';
    ctx.textAlign = 'right';
    ctx.fillText(`${toPersianDigits(compVal)}٪`, padLeft - 8, y);
  }

  if (history.length === 0) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = `500 12px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText('پس از تکمیل اولین آزمون، نمودار روند پیشرفت شما در این بخش ترسیم می‌شود.', width / 2, padTop + plotH / 2);
    return;
  }

  const count = history.length;
  const getX = (index) =>
    count === 1 ? padLeft + plotW / 2 : padLeft + (index / (count - 1)) * plotW;
  const getYWpm = (val) => padTop + plotH - Math.min(1, Math.max(0, val / yMaxWpm)) * plotH;
  const getYComp = (val) => padTop + plotH - Math.min(1, Math.max(0, val / 100)) * plotH;

  // X Axis labels
  ctx.fillStyle = '#64748b';
  ctx.font = `500 10px ${fontFamily}`;
  ctx.textAlign = 'center';
  history.forEach((_, idx) => {
    const x = getX(idx);
    ctx.fillText(`تست ${toPersianDigits(idx + 1)}`, x, height - 12);
  });

  const drawSeries = (points, color, lineWidth, dashed, radius) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    if (dashed) ctx.setLineDash([4, 4]);
    ctx.beginPath();
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();
    ctx.restore();

    points.forEach((pt) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const rawPoints = history.map((item, idx) => ({
    x: getX(idx),
    y: getYWpm(item.rawWpm || 0)
  }));
  const effectivePoints = history.map((item, idx) => ({
    x: getX(idx),
    y: getYWpm(item.effectiveSpeed || 0)
  }));
  const compPoints = history.map((item, idx) => ({
    x: getX(idx),
    y: getYComp(item.comprehensionPercent || 0)
  }));

  drawSeries(rawPoints, '#64748b', 1.6, false, 3);
  drawSeries(effectivePoints, '#0f172a', 2.3, false, 4);
  drawSeries(compPoints, '#2563eb', 1.6, true, 2.5);
}

function updateHistoryUI() {
  const tableBody = document.getElementById('historyTableBody');
  if (!tableBody) return;

  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('reading_speed_history') || '[]');
  } catch {
    history = [];
  }

  tableBody.innerHTML = '';

  if (history.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="rs-table__empty">سابقه‌ای تا این لحظه ثبت نشده است.</td>
      </tr>
    `;
  } else {
    [...history].reverse().forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.date || '-'}</td>
        <td>${toPersianDigits(item.wordCount || 0)}</td>
        <td><strong>${toPersianDigits(item.rawWpm || 0)}</strong></td>
        <td>${toPersianDigits(item.comprehensionPercent || 0)}٪</td>
        <td><strong>${toPersianDigits(item.effectiveSpeed || 0)}</strong></td>
        <td><span class="rs-level-pill">${item.level || '-'}</span></td>
      `;
      tableBody.appendChild(tr);
    });
  }

  renderProgressChart(history);
}

function initSpeedReadingTest() {
  const container = document.getElementById('readingAppContainer');
  if (!container) return;

  new ReadingSpeedTest('readingAppContainer', {
    scanTextBank: SCAN_TEXT_BANK,
    comprehensionTextBank: COMPREHENSION_TEXT_BANK,
    onComplete: () => {
      updateHistoryUI();
      if (latestSpeedTestResult) {
        attachSpeedTestToConsultationForm(latestSpeedTestResult, false);
      }
    }
  });

  const workspace = document.getElementById('speed-test-workspace');
  const historySection = document.getElementById('historySection');

  if (workspace && historySection) {
    workspace.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('#toggleHistoryBtn');
      if (!toggleBtn) return;

      const isHidden = historySection.hasAttribute('hidden');
      if (isHidden) {
        historySection.removeAttribute('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.classList.add('is-active');
        updateHistoryUI();
        historySection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        historySection.setAttribute('hidden', 'hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.classList.remove('is-active');
      }
    });
  }

  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      try {
        localStorage.removeItem('reading_speed_history');
      } catch {
        // Ignore storage errors
      }
      updateHistoryUI();
    });
  }

  window.addEventListener('resize', () => {
    if (historySection && !historySection.hasAttribute('hidden')) {
      updateHistoryUI();
    }
  });

  updateHistoryUI();
}

function attachSpeedTestToConsultationForm(result, focusInput = true) {
  const noteInput = document.getElementById('user-note');
  const courseSelect = document.getElementById('course-select');
  const userNameInput = document.getElementById('user-name');

  if (noteInput) {
    const testResultLine = `نتیجه آزمون سرعت شما: سرعت اسکن: ${toPersianDigits(result.rawWpm)} کلمه/دقیقه | درک مطلب: ${toPersianDigits(result.comprehensionPct)}٪ (سرعت مؤثر: ${toPersianDigits(result.effectiveWpm)} WPM)`;
    const existingLines = noteInput.value
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('نتیجه آزمون سرعت'));
    noteInput.value = [testResultLine, ...existingLines].join('\n');
    noteInput.dispatchEvent(new Event('input'));
  }

  if (courseSelect) {
    if (result.recommendedCourse) {
      courseSelect.value = result.recommendedCourse;
    }
    courseSelect.dispatchEvent(new Event('change'));
  }

  if (focusInput) {
    setTimeout(() => {
      if (userNameInput) userNameInput.focus({ preventScroll: true });
    }, 450);
  }
}

/* ==========================================================================
   9. CURRICULUM TABS, SEARCH, EXPAND-ALL, DEEP-LINKING & ACCORDIONS
   ========================================================================== */

function toggleAccordionItem(item, forceOpen) {
  const trigger = item.querySelector('.accordion-trigger');
  const content = item.querySelector('.accordion-content');
  if (!trigger || !content) return;

  const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !item.classList.contains('is-open');

  if (isOpen) {
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    content.removeAttribute('hidden');
    content.style.maxHeight = `${content.scrollHeight + 32}px`;
  } else {
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = '0px';
    content.setAttribute('hidden', 'hidden');
  }
}

function initCurriculumAndAccordions() {
  const allAccordionItems = Array.from(document.querySelectorAll('.accordion-item'));
  allAccordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      toggleAccordionItem(item);
    });
  });

  // Re-measure open panels after rotation / resize / late font swap so the
  // text is never clipped by a stale max-height.
  const syncOpenPanels = () => {
    document.querySelectorAll('.accordion-item.is-open .accordion-content').forEach((content) => {
      // Skip panels that are currently display:none (hidden tab) — measuring
      // them would return 0 and clip their content when the tab is shown.
      if (!content.hasAttribute('hidden') && content.offsetParent !== null) {
        content.style.maxHeight = `${content.scrollHeight + 32}px`;
      }
    });
  };
  let resizeFrame = null;
  window.addEventListener('resize', () => {
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(syncOpenPanels);
  });
  window.addEventListener('orientationchange', syncOpenPanels);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncOpenPanels).catch(() => {});
  }

  const tabBtns = Array.from(document.querySelectorAll('.tabs-nav .tab-btn'));
  const tabPanels = Array.from(document.querySelectorAll('#curriculum .tab-panel'));
  const searchInput = document.getElementById('curriculum-search');
  const toggleAllBtn = document.getElementById('curriculum-toggle-all-btn');
  const tabsNavWrap = document.getElementById('curriculum-tabs-nav-wrap');
  const emptyState = document.getElementById('curriculum-empty-state');
  const curriculumItems = Array.from(document.querySelectorAll('#curriculum .accordion-item'));

  if (tabBtns.length === 0 || tabPanels.length === 0) return;

  let activeTabId = 'tab-phase1';
  let isAllExpanded = false;

  const activateTab = (targetPanelId, focusTab = false) => {
    activeTabId = targetPanelId;

    tabBtns.forEach((btn) => {
      const controls = btn.getAttribute('aria-controls');
      const isSelected = controls === targetPanelId;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      btn.setAttribute('tabindex', isSelected ? '0' : '-1');
      if (isSelected && focusTab) btn.focus();
    });

    tabPanels.forEach((panel) => {
      const isTarget = panel.id === targetPanelId;
      if (isTarget) {
        panel.classList.add('is-active');
        panel.removeAttribute('hidden');
      } else {
        panel.classList.remove('is-active');
        panel.setAttribute('hidden', 'hidden');
      }
    });

    window.requestAnimationFrame(syncOpenPanels);
  };

  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      if (targetId) activateTab(targetId, false);
    });

    btn.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowLeft') {
        targetIndex = (index + 1) % tabBtns.length;
      } else if (e.key === 'ArrowRight') {
        targetIndex = (index - 1 + tabBtns.length) % tabBtns.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabBtns.length - 1;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        const nextBtn = tabBtns[targetIndex];
        const targetId = nextBtn.getAttribute('aria-controls');
        if (targetId) activateTab(targetId, true);
      }
    });
  });

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      isAllExpanded = !isAllExpanded;
      toggleAllBtn.setAttribute('data-expanded', isAllExpanded ? 'true' : 'false');
      toggleAllBtn.setAttribute('aria-expanded', isAllExpanded ? 'true' : 'false');

      if (isAllExpanded) {
        if (tabsNavWrap) tabsNavWrap.setAttribute('hidden', 'hidden');
        tabPanels.forEach((panel) => {
          panel.classList.add('is-active');
          panel.removeAttribute('hidden');
        });
        curriculumItems.forEach((item) => toggleAccordionItem(item, true));
        toggleAllBtn.innerHTML = '<span>بازگشت به نمایش تب‌بندی‌شده</span>';
      } else {
        if (tabsNavWrap) tabsNavWrap.removeAttribute('hidden');
        curriculumItems.forEach((item, idx) => toggleAccordionItem(item, idx === 0));
        activateTab(activeTabId, false);
        toggleAllBtn.innerHTML = '<span>نمایش یکجای تمام ۲۲ سرفصل</span>';
      }
    });
  }

  const clearBtn = document.getElementById('curriculum-search-clear');
  let preSearchOpenItemIds = null;

  if (searchInput) {
    // Normalize Persian/Arabic variants + digits so "17", "۱۷" and "ي" all match
    const normalizeSearchText = (value) =>
      toEnglishDigits(String(value || ''))
        .toLowerCase()
        .replace(/[\u200c\u200e\u200f\u0640]/g, ' ')
        .replace(/[يى]/g, 'ی')
        .replace(/ك/g, 'ک')
        .replace(/[أإآ]/g, 'ا')
        .replace(/\s+/g, ' ')
        .trim();

    const restoreCurriculumState = () => {
      if (clearBtn) clearBtn.setAttribute('hidden', 'hidden');
      if (emptyState) emptyState.classList.remove('is-visible');

      if (isAllExpanded) {
        if (tabsNavWrap) tabsNavWrap.setAttribute('hidden', 'hidden');
        tabPanels.forEach((panel) => {
          panel.classList.add('is-active');
          panel.removeAttribute('hidden');
        });
        curriculumItems.forEach((item) => {
          item.removeAttribute('hidden');
          toggleAccordionItem(item, true);
        });
      } else {
        if (tabsNavWrap) tabsNavWrap.removeAttribute('hidden');
        activateTab(activeTabId, false);

        curriculumItems.forEach((item) => {
          item.removeAttribute('hidden');
          const shouldBeOpen = preSearchOpenItemIds
            ? preSearchOpenItemIds.has(item.id)
            : item.id === 'topic-1';
          toggleAccordionItem(item, shouldBeOpen);
        });

        // Ensure active tab has at least its first topic open if none were preserved
        const activePanel = document.getElementById(activeTabId);
        if (activePanel && !activePanel.querySelector('.accordion-item.is-open')) {
          const firstInPanel = activePanel.querySelector('.accordion-item');
          if (firstInPanel) toggleAccordionItem(firstInPanel, true);
        }
      }

      preSearchOpenItemIds = null;
      window.requestAnimationFrame(syncOpenPanels);
    };

    const handleSearchInput = () => {
      const rawVal = searchInput.value;
      const query = normalizeSearchText(rawVal);

      if (clearBtn) {
        if (rawVal.trim().length > 0) {
          clearBtn.removeAttribute('hidden');
        } else {
          clearBtn.setAttribute('hidden', 'hidden');
        }
      }

      if (!query) {
        restoreCurriculumState();
        return;
      }

      // Snapshot open items at the moment search query begins
      if (!preSearchOpenItemIds) {
        preSearchOpenItemIds = new Set(
          curriculumItems
            .filter((item) => item.classList.contains('is-open'))
            .map((item) => item.id)
        );
      }

      if (tabsNavWrap) tabsNavWrap.setAttribute('hidden', 'hidden');

      let totalMatches = 0;

      tabPanels.forEach((panel) => {
        const panelItems = Array.from(panel.querySelectorAll('.accordion-item'));
        let panelMatches = 0;

        panelItems.forEach((item) => {
          const topic = item;
          const text = normalizeSearchText(item.textContent);
          if (text.includes(query)) {
            topic.removeAttribute('hidden');
            topic.hidden = false;
            toggleAccordionItem(item, true);
            panelMatches += 1;
            totalMatches += 1;
          } else {
            topic.setAttribute('hidden', 'hidden');
            topic.hidden = true;
            toggleAccordionItem(item, false);
          }
        });

        if (panelMatches > 0) {
          panel.classList.add('is-active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('is-active');
          panel.setAttribute('hidden', 'hidden');
        }
      });

      if (emptyState) {
        emptyState.classList.toggle('is-visible', totalMatches === 0);
      }

      // Re-measure after panels were revealed (items were expanded while hidden)
      window.requestAnimationFrame(syncOpenPanels);
    };

    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('search', handleSearchInput);
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchInput.value) {
        searchInput.value = '';
        restoreCurriculumState();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        restoreCurriculumState();
        searchInput.focus();
      });
    }
  }

  const deepLinks = document.querySelectorAll('[data-open-curriculum-tab]');
  deepLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetTab = link.getAttribute('data-open-curriculum-tab');
      const targetTopicId = link.getAttribute('data-open-topic');

      if (!targetTab) return;
      e.preventDefault();

      if (searchInput && searchInput.value.trim() !== '') {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
      }

      if (!isAllExpanded) {
        activateTab(targetTab, false);
      }

      if (targetTopicId) {
        const topicEl = document.getElementById(targetTopicId);
        if (topicEl) {
          toggleAccordionItem(topicEl, true);
          setTimeout(() => {
            topicEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
          return;
        }
      }

      const curriculumSection = document.getElementById('curriculum');
      if (curriculumSection) {
        curriculumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const handleHashDeepLink = () => {
    const hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (!hash) return;

    if (hash.startsWith('tab-phase')) {
      if (!isAllExpanded) {
        activateTab(hash, false);
      }
      return;
    }

    if (hash.startsWith('topic-')) {
      const topicEl = document.getElementById(hash);
      if (!topicEl) return;
      const parentPanel = topicEl.closest('.tab-panel');
      if (parentPanel && !isAllExpanded) {
        activateTab(parentPanel.id, false);
      }
      toggleAccordionItem(topicEl, true);
      setTimeout(() => {
        topicEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
    }
  };

  handleHashDeepLink();
  window.addEventListener('hashchange', handleHashDeepLink);
}

/* ==========================================================================
   10. CONSULTATION FORM VALIDATION, PERSISTENCE & WHATSAPP FOLLOW-UP
   ========================================================================== */

const STORAGE_KEY_LEAD = 'azazmind_consultation_lead_v2';

function initConsultationForm() {
  const form = document.getElementById('lead-form');
  const nameInput = document.getElementById('user-name');
  const phoneInput = document.getElementById('user-phone');
  const courseSelect = document.getElementById('course-select');
  const noteInput = document.getElementById('user-note');

  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const submitBtn = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');

  const successState = document.getElementById('form-success-state');
  const successSummary = document.getElementById('form-success-summary');
  const whatsappBtn = document.getElementById('whatsapp-followup-btn');
  const directWhatsappQuickLink = document.getElementById('direct-whatsapp-quick-link');
  const copyMsgBtn = document.getElementById('copy-consult-msg-btn');
  const resetFormBtn = document.getElementById('reset-form-btn');

  if (!form || !nameInput || !courseSelect) return;

  let latestFormattedMessage = '';

  const buildWhatsappMessage = (leadData) => {
    const lines = [
      `سلام وقت بخیر خانم آزادخواه، من «${leadData.name || 'متقاضی مشاوره'}» هستم.`,
      `متقاضی دریافت مشاوره رایگان و تعیین سطح برای «${leadData.course}» هستم.`
    ];
    if (leadData.phone) {
      lines.push(`شماره تماس من: ${toPersianDigits(leadData.phone)}`);
    }
    if (leadData.speedTest && (!leadData.note || !leadData.note.includes('نتیجه آزمون سرعت'))) {
      lines.push(
        `نتیجه تست سرعت مطالعه من در سایت: ${toPersianDigits(leadData.speedTest.rawWpm)} کلمه در دقیقه | درک مطلب: ${toPersianDigits(leadData.speedTest.comprehensionPct)}٪ (سرعت مؤثر: ${toPersianDigits(leadData.speedTest.effectiveWpm)} WPM)`
      );
    }
    if (leadData.note) {
      lines.push(`توضیحات و چالش‌های مطالعه: ${leadData.note}`);
    }
    return lines.join('\n');
  };

  const syncDirectQuickLink = () => {
    if (!directWhatsappQuickLink) return;
    directWhatsappQuickLink.setAttribute(
      'href',
      'https://rubika.ir/tondkhanyazad59'
    );
  };

  const validateName = () => {
    const val = nameInput.value.trim();
    if (val.length < 3) {
      nameInput.classList.add('form-input--error');
      nameInput.setAttribute('aria-invalid', 'true');
      if (nameError) nameError.classList.add('is-visible');
      return false;
    }
    nameInput.classList.remove('form-input--error');
    nameInput.setAttribute('aria-invalid', 'false');
    if (nameError) nameError.classList.remove('is-visible');
    return true;
  };

  const validatePhone = () => {
    if (!phoneInput) return false;
    const rawValue = phoneInput.value.trim();
    const normalized = toEnglishDigits(rawValue).replace(/[\s\-()]/g, '');
    const iranMobileRegex = /^(\+98|0098|98|0)?9\d{9}$/;

    if (!rawValue || !iranMobileRegex.test(normalized)) {
      phoneInput.classList.add('form-input--error');
      phoneInput.setAttribute('aria-invalid', 'true');
      if (phoneError) phoneError.classList.add('is-visible');
      return false;
    }
    phoneInput.classList.remove('form-input--error');
    phoneInput.setAttribute('aria-invalid', 'false');
    if (phoneError) phoneError.classList.remove('is-visible');
    return true;
  };

  const resetSubmitButtonLabel = () => {
    if (submitBtnText && submitBtnText.textContent !== 'آماده ارسال پیام') {
      submitBtnText.textContent = 'آماده ارسال پیام';
    }
  };

  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('form-input--error')) validateName();
    resetSubmitButtonLabel();
    syncDirectQuickLink();
  });

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (phoneInput.classList.contains('form-input--error')) validatePhone();
      resetSubmitButtonLabel();
      syncDirectQuickLink();
    });
  }

  courseSelect.addEventListener('change', () => {
    resetSubmitButtonLabel();
    syncDirectQuickLink();
  });
  if (noteInput) {
    noteInput.addEventListener('input', () => {
      resetSubmitButtonLabel();
      syncDirectQuickLink();
    });
  }

  const renderSuccessView = (leadData) => {
    latestFormattedMessage = buildWhatsappMessage(leadData);
    const rubikaUrl = 'https://rubika.ir/tondkhanyazad59';

    if (whatsappBtn) {
      whatsappBtn.setAttribute('href', rubikaUrl);
    }
    if (directWhatsappQuickLink) {
      directWhatsappQuickLink.setAttribute('href', rubikaUrl);
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(latestFormattedMessage).catch(() => {});
    }

    if (submitBtnText) {
      submitBtnText.textContent = 'پیام ارسال شد';
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();

    if (!isNameValid) {
      nameInput.focus();
      return;
    }
    if (!isPhoneValid && phoneInput) {
      phoneInput.focus();
      return;
    }

    const rawPhone = phoneInput ? phoneInput.value.trim() : '';
    let formattedPhone = '';
    if (rawPhone) {
      const normalizedPhone = toEnglishDigits(rawPhone)
        .replace(/[\s\-()]/g, '')
        .replace(/^(\+98|0098|98)/, '0');
      formattedPhone = normalizedPhone.startsWith('0') ? normalizedPhone : `0${normalizedPhone}`;
    }

    const leadData = {
      name: nameInput.value.trim(),
      phone: formattedPhone,
      course: courseSelect.value,
      note: noteInput ? noteInput.value.trim() : '',
      speedTest: latestSpeedTestResult || null,
      submittedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY_LEAD, JSON.stringify(leadData));
    } catch {
      // Ignore storage quota errors
    }

    renderSuccessView(leadData);
  });

  if (copyMsgBtn) {
    copyMsgBtn.addEventListener('click', () => {
      if (!latestFormattedMessage) return;
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(latestFormattedMessage).then(() => {
          const originalText = copyMsgBtn.textContent;
          copyMsgBtn.textContent = 'متن پیام کپی شد ✓';
          setTimeout(() => {
            copyMsgBtn.textContent = originalText;
          }, 2200);
        });
      }
    });
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      try {
        localStorage.removeItem(STORAGE_KEY_LEAD);
      } catch {
        // Ignore storage errors
      }
      form.reset();
      if (successState) successState.classList.remove('is-active');
      form.removeAttribute('hidden');
      syncDirectQuickLink();
      nameInput.focus();
    });
  }
}

/* ==========================================================================
   11. SMART MOBILE STICKY CTA VISIBILITY OBSERVER
   ========================================================================== */

function initMobileStickyBarObserver() {
  const stickyBar = document.getElementById('mobile-sticky-bar');
  const heroSection = document.getElementById('hero');
  const consultationSection = document.getElementById('consultation');
  const footerSection = document.getElementById('site-footer');

  if (!stickyBar || !('IntersectionObserver' in window)) return;

  const visibleTargets = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleTargets.add(entry.target);
        } else {
          visibleTargets.delete(entry.target);
        }
      });

      if (visibleTargets.size > 0) {
        stickyBar.classList.add('is-hidden');
      } else {
        stickyBar.classList.remove('is-hidden');
      }
    },
    {
      threshold: 0.1
    }
  );

  if (heroSection) observer.observe(heroSection);
  if (consultationSection) observer.observe(consultationSection);
  if (footerSection) observer.observe(footerSection);
}

/* ==========================================================================
   12. BLOG HUB INTERACTIVE CATEGORY FILTER
   ========================================================================== */

function initBlogCategoryFilter() {
  const filterBtns = Array.from(document.querySelectorAll('.category-filter-pills .filter-pill'));
  const blogCards = Array.from(document.querySelectorAll('#articles-grid .blog-card'));

  if (filterBtns.length === 0 || blogCards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const cat = btn.getAttribute('data-filter');
      if (!cat) return;
      e.preventDefault();

      filterBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('is-active', isCurrent);
        if (isCurrent) {
          b.setAttribute('aria-current', 'true');
        } else {
          b.removeAttribute('aria-current');
        }
      });

      blogCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category') || '';
        const shouldShow = cat === 'all' || cardCat === cat;
        if (shouldShow) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', 'hidden');
        }
      });
    });
  });
}



