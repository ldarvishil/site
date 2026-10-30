/**
 * ذهن آزاد (azazmind) - Production Interactive Script
 *
 * Modules:
 * 1. Utility Helpers (Persian/Arabic digit conversion, formatting)
 * 2. Header Scroll, Compositor Progress Bar (#27) & Active Section Spy
 * 3. Accessible Mobile Navigation Drawer (Focus Trap, Escape, Scroll Lock)
 * 4. Interactive Eye-Fixation Simulator + Technique #11: Orb on Path (getPointAtLength)
 * 5. Interactive Ebbinghaus Visualizer + Technique #15: SVG Path Draw on Scroll
 * 6. Technique #2: Dotted Path with Numbered Stations (#methodology-roadmap)
 * 7. Technique #28 & #30: Scroll Reveal & Persian Count-Up (toLocaleString('fa-IR'))
 * 8. Interactive Speed Reading & Comprehension Assessment (2 Passages, Validation, Effective WPM)
 * 9. Curriculum Tabs, Search Filter, Expand-All, Deep-Linking & Accessible Accordions
 * 10. Consultation Form (Persian/Arabic Phone Normalization, Attached Test Score, WhatsApp Follow-Up)
 * 11. Smart Mobile Sticky CTA Visibility Observer
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
  const ctaBtn = document.getElementById('pain-diagnosis-cta');
  const ctaTextEl = document.getElementById('pain-diagnosis-cta-text');
  const noteInput = document.getElementById('user-note');

  if (!grid || !diagnosisBox) return;

  const cards = Array.from(grid.querySelectorAll('.pain-card'));
  const selectedPains = new Set();

  const updateDiagnosisUI = () => {
    const count = selectedPains.size;

    if (count === 0) {
      diagnosisBox.classList.remove('has-selection');
      if (badgeEl) badgeEl.textContent = 'تشخیص کارشناسی آکادمی ذهن آزاد';
      if (titleEl) {
        titleEl.textContent =
          'تقصیر شما نیست؛ در مدرسه به ما گفته‌اند «چه بخوانیم»، اما هرگز یاد نداده‌اند «چطور مطالعه کنیم»!';
      }
      if (descEl) {
        descEl.textContent =
          'وقتی با همان روش تک‌کلمه‌خوانی دوران دبستان به سراغ کتاب‌های سنگین کنکور، دانشگاه و آزمون‌های تخصصی می‌روید، طبیعی است که چشمتان خسته شود، ذهنتان بپرد و مطالب فراموش شوند. روی کارت‌های بالا کلیک کنید تا چالش‌های اصلی خود را مشخص نمایید.';
      }
      if (ctaTextEl) {
        ctaTextEl.textContent = 'مشاهده علت علمی در شبیه‌ساز چشم';
      }
      return;
    }

    diagnosisBox.classList.add('has-selection');
    const selectedLabels = Array.from(selectedPains);

    if (badgeEl) {
      badgeEl.textContent = `${toPersianDigits(count)} دغدغه و چالش مطالعه توسط شما انتخاب شد`;
    }
    if (titleEl) {
      titleEl.textContent =
        'حق دارید خسته شده باشید؛ اما هر ۶ مورد بالا با اصلاح عادت‌های چشم و سیستم مرور کاملاً قابل‌حل هستند!';
    }
    if (descEl) {
      descEl.textContent = `چالش‌های انتخابی شما: «${selectedLabels.join('، ')}». این موارد نشانه کم‌هوشی یا کم‌کاری شما نیستند؛ بلکه نتیجه طبیعی قفل شدن روی الگوی مطالعه سنتی هستند و در ۲۲ سرفصل کارگاهی «ذهن آزاد» به‌صورت ریشه‌ای برطرف می‌شوند.`;
    }
    if (ctaTextEl) {
      ctaTextEl.textContent = `مشاهده علت علمی این ${toPersianDigits(count)} چالش در شبیه‌ساز چشم`;
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
      // Don't toggle while the visitor is selecting the quote text
      const selection = window.getSelection ? String(window.getSelection()).trim() : '';
      if (selection.length > 0) return;
      toggleCard();
    });
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      if (selectedPains.size > 0 && noteInput) {
        const listStr = Array.from(selectedPains).join('، ');
        noteInput.value = `چالش‌های اصلی من در مطالعه: ${listStr}`;
        noteInput.dispatchEvent(new Event('input'));
      }
    });
  }
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
   4. EYE-FIXATION SIMULATOR + TECHNIQUE #11: ORB ON PATH (getPointAtLength)
   ========================================================================== */

function initEyeFixationSimulator() {
  const simContainer = document.getElementById('eye-simulator');
  if (!simContainer) return;

  const modeBtns = Array.from(simContainer.querySelectorAll('.eye-sim-mode-btn'));
  const chunks = Array.from(simContainer.querySelectorAll('.sim-chunk'));
  const words = Array.from(simContainer.querySelectorAll('.sim-word'));
  const captionEl = document.getElementById('eye-sim-caption');
  const stopsEl = document.getElementById('sim-metric-stops');
  const wpmEl = document.getElementById('sim-metric-wpm');
  const focusEl = document.getElementById('sim-metric-focus');

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

    if (currentMode === 'chunking') {
      if (captionEl) {
        captionEl.innerHTML =
          '<strong>الگوی فعال: دریافت بسته‌ای (Chunking)</strong> — چشم به‌جای توقف روی تک‌تک ۱۳ کلمه، کل سطر را تنها در <strong>۳ مکث دیداری</strong> ثبت می‌کند و درک کلی جمله افزایش می‌یابد.';
      }
      if (stopsEl) stopsEl.textContent = '۳ توقف در سطر (کاهش خستگی چشم)';
      if (wpmEl) wpmEl.textContent = '۵۲۰ کلمه در دقیقه';
      if (focusEl) focusEl.textContent = 'ریتم پیوسته بدون فرصت پرش افکار';

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
      if (captionEl) {
        captionEl.innerHTML =
          '<strong>الگوی فعال: مطالعه سنتی (کلمه‌خوانی + برگشت نگاه)</strong> — چشم روی تک‌تک ۱۳ واژه مکث می‌کند، در میانه سطر به عقب برمی‌گردد (Regression) و سرعت به سقف گفتار باطنی محدود می‌شود.';
      }
      if (stopsEl) stopsEl.textContent = '۱۳ توقف + برگشت به عقب (خستگی زودرس)';
      if (wpmEl) wpmEl.textContent = '۱۸۰ کلمه در دقیقه';
      if (focusEl) focusEl.textContent = 'مستعد سرگردانی ذهن در مکث‌های طولانی';

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
   5. EBBINGHAUS VISUALIZER + TECHNIQUE #15: SVG PATH DRAW ON SCROLL
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

  const btns = Array.from(widget.querySelectorAll('.ebbinghaus-milestone-btn'));
  const activeLine = document.getElementById('ebbinghaus-active-line');
  const pointGood = document.getElementById('ebbinghaus-point-good');
  const pointBad = document.getElementById('ebbinghaus-point-bad');
  const timeLabel = document.getElementById('ebbinghaus-time-label');
  const valBad = document.getElementById('ebbinghaus-val-bad');
  const valGood = document.getElementById('ebbinghaus-val-good');
  const noteEl = document.getElementById('ebbinghaus-note');

  // Content-first: the comparison curves are always painted (no dash-offset trick
  // that could leave the key data invisible if the observer never fires).

  const selectMilestone = (idx) => {
    const data = EBBINGHAUS_MILESTONES[idx];
    if (!data) return;

    btns.forEach((btn, i) => {
      const isSelected = i === idx;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

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

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-milestone'));
      if (!Number.isNaN(idx)) selectMilestone(idx);
    });
  });
}

/* ==========================================================================
   6. TECHNIQUE #2: DOTTED PATH WITH NUMBERED STATIONS (#methodology-roadmap)
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
   7. TECHNIQUE #28 & #30: REVEAL ON SCROLL & PERSIAN COUNT-UP
   ========================================================================== */

function initScrollRevealAndCountUp() {
  if (!('IntersectionObserver' in window)) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Technique #30: Persian Count Up (toLocaleString('fa-IR'))
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
      '#pain-points .card, #courses .course-card, #outcomes .outcome-card, #audience .card, #methodology .method-card, #social-proof .testimonial-card, #scientific-basis .citation-card, #articles .article-card'
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

/* ==========================================================================
   8. INTERACTIVE SPEED READING & COMPREHENSION ASSESSMENT
   ========================================================================== */

const PASSAGES_DATA = {
  cognitive: {
    id: 'cognitive',
    wordCount: 171,
    text: 'مغز انسان ساختاری شگفت‌انگیز برای دریافت و پردازش الگوهای بصری دارد، اما اکثر افراد در سیستم سنتی به گونه‌ای آموزش دیده‌اند که کلمات را تک‌به‌تک و همراه با صدایی خاموش در ذهن خود زمزمه می‌کنند. این پدیده که در علم عصب‌شناسی و زبان‌شناسی به «گفتار باطنی» یا Subvocalization معروف است، گلوگاه اصلی محدودیت سرعت مطالعه در بیش از ۹۰ درصد افراد جامعه به شمار می‌رود؛ زیرا سرعت ادای ذهنی کلمات معمولاً از مرز ۲۰۰ تا ۲۵۰ کلمه در دقیقه فراتر نمی‌رود. در متدولوژی نوین تندخوانی، تمرینات هدفمند به فرد می‌آموزند که چشم‌ها به جای توقف مکرر بر روی تک‌تک حروف، بسته‌های معنایی یا کلمات را به صورت تصویری ثبت کنند و پیام مستقیماً به قشر بینایی مغز منتقل شود. در این شیوه، نه تنها درک مطلب کاهش نمی‌یابد، بلکه به دلیل کاهش چشمگیر پرش افکار و حفظ ریتم یکنواخت تمرکز، میزان یادگیری عمیق در سطح استاندارد ۷۵ تا ۸۵ درصد تثبیت می‌گردد. همچنین استفاده از ساختار مرورهای زمان‌بندی‌شده ابینگهاوس، اطلاعات خوانده‌شده را از حافظه کوتاه‌مدت به بایگانی بلندمدت مغز منتقل می‌سازد.',
    questions: [
      {
        title: '۱. طبق متن، مهم‌ترین عامل و گلوگاه محدودکننده سرعت مطالعه در سیستم سنتی چیست؟',
        options: {
          a: 'ضعف بینایی و عدم تمرینات ورزشی چشم',
          b: 'گفتار باطنی (Subvocalization) و تلفظ صوتی کلمات در ذهن',
          c: 'پیچیدگی گرامری و ساختار جملات فارسی'
        },
        correct: 'b'
      },
      {
        title: '۲. در روش تندخوانی علمی، اطلاعات متن مستقیماً به کدام بخش مغز منتقل می‌شود؟',
        options: {
          a: 'قشر بینایی مغز به صورت دریافت تصویری و بسته‌ای',
          b: 'مرکز پردازش شنوایی جهت بازشنوایی درونی کلمات',
          c: 'حافظه حرکتی و مراکز گفتاری'
        },
        correct: 'a'
      },
      {
        title: '۳. بر اساس متن، درصد استاندارد درک مطلب پس از اجرای صحیح تکنیک‌ها در چه محدوده‌ای تثبیت می‌شود؟',
        options: {
          a: 'زیر ۴۰ درصد',
          b: '۵۰ تا ۶۰ درصد',
          c: '۷۵ تا ۸۵ درصد'
        },
        correct: 'c'
      }
    ]
  },
  memory: {
    id: 'memory',
    wordCount: 178,
    text: 'حافظه انسان یک انبار ایستا برای انباشتن اطلاعات نیست، بلکه شبکه‌ای پویا از ارتباطات عصبی است که بر پایه معنا، تصویر و تکرار هدفمند شکل می‌گیرد. هرمان ابینگهاوس، دانشمند برجسته روان‌شناسی تجربی، با آزمایش‌های دقیق نشان داد که مغز انسان بدون مرور اصولی، بیش از هفتاد درصد اطلاعات جدید را ظرف چهل‌وهشت ساعت نخست پس از یادگیری از دست می‌دهد؛ پدیده‌ای که در علم شناختی با نام «منحنی فراموشی» شناخته می‌شود. دلیل اصلی این فراموشی سریع، ضعف ذاتی مغز شما نیست؛ بلکه شیوه نادرست ورود اطلاعات به حافظه کوتاه‌مدت است. زمانی که مطالب را صرفاً به شکل خطی، یکنواخت و بدون درگیر کردن نیمکره راست مغز می‌خوانید، هیچ قلاب تداعی‌کننده‌ای برای بازیابی مجدد آن اطلاعات در قشر مغز ایجاد نمی‌شود. برای تبدیل اطلاعات از حافظه کوتاه‌مدت به حافظه بلندمدت پایدار، استفاده از دو تکنیک مکمل ضروری است: نخست، سازماندهی بصری مطالب در قالب «نقشه‌های ذهنی» که کل ساختار یک فصل را در یک صفحه خلاصه می‌کند؛ و دوم، اجرای چرخه «مرور با فاصله زمانی مشخص» در بازه‌های بیست‌وچهار ساعت، یک هفته و یک ماه پس از مطالعه اولیه.',
    questions: [
      {
        title: '۱. طبق یافته‌های ابینگهاوس، بدون مرور اصولی چه بخشی از اطلاعات ظرف ۴۸ ساعت اول فراموش می‌شود؟',
        options: {
          a: 'کمتر از بیست درصد اطلاعات جدید',
          b: 'بیش از هفتاد درصد اطلاعات جدید',
          c: 'تمامی اطلاعات بلافاصله پس از بستن کتاب پاک می‌شوند'
        },
        correct: 'b'
      },
      {
        title: '۲. بر اساس متن، دلیل اصلی فراموشی سریع مطالب پس از مطالعه خطی چیست؟',
        options: {
          a: 'عدم درگیری نیمکره راست مغز و نبود قلاب‌های تصویری و تداعی‌کننده',
          b: 'کاهش قند خون در زمان مطالعه',
          c: 'بلندخوانی متن با صدای رسا'
        },
        correct: 'a'
      },
      {
        title: '۳. کدام دو تکنیک مکمل برای انتقال پایدار مطالب به حافظه بلندمدت معرفی شده‌اند؟',
        options: {
          a: 'رونویسی خط‌به‌خط کتاب و مطالعه در شب امتحان',
          b: 'ترسیم نقشه ذهنی (Mind Map) و اجرای مرور با فاصله زمانی مشخص',
          c: 'حفظ طوطی‌وار جملات بدون خلاصه‌برداری'
        },
        correct: 'b'
      }
    ]
  }
};

let latestSpeedTestResult = null;

function initSpeedReadingTest() {
  const stepIntro = document.getElementById('speed-test-step-intro');
  const stepRead = document.getElementById('speed-test-step-read');
  const stepQuiz = document.getElementById('speed-test-step-quiz');
  const stepResults = document.getElementById('speed-test-step-results');

  if (!stepIntro || !stepRead || !stepQuiz || !stepResults) return;

  const passageBtns = Array.from(document.querySelectorAll('.passage-select-btn'));
  const startBtn = document.getElementById('speed-test-start-btn');
  const finishReadBtn = document.getElementById('speed-test-finish-read-btn');
  const forceQuizBtn = document.getElementById('speed-test-force-quiz-btn');
  const fastWarning = document.getElementById('speed-test-fast-warning');
  const submitQuizBtn = document.getElementById('speed-test-submit-quiz-btn');
  const restartBtn = document.getElementById('speed-test-restart-btn');
  const applyBtn = document.getElementById('speed-test-apply-btn');

  const timerValEl = document.getElementById('speed-test-timer-val');
  const passageContainer = document.getElementById('speed-test-passage');
  const fontSizeBtns = Array.from(document.querySelectorAll('.font-size-btn'));
  const quizErrorBanner = document.getElementById('quiz-error-banner');

  const resWpmEl = document.getElementById('res-wpm-val');
  const resEwpmEl = document.getElementById('res-ewpm-val');
  const resCompEl = document.getElementById('res-comp-val');
  const resRatingEl = document.getElementById('res-rating-val');
  const resAnalysisEl = document.getElementById('res-analysis-text');

  let currentPassageKey = 'cognitive';
  let timerInterval = null;
  let startTimeMs = 0;
  let elapsedSeconds = 0;

  const showStep = (targetStep) => {
    [stepIntro, stepRead, stepQuiz, stepResults].forEach((step) => {
      if (step === targetStep) {
        step.classList.add('is-active');
      } else {
        step.classList.remove('is-active');
      }
    });
  };

  const renderPassageAndQuestions = (key) => {
    const data = PASSAGES_DATA[key] || PASSAGES_DATA.cognitive;
    if (passageContainer) {
      passageContainer.textContent = data.text;
    }

    data.questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const titleEl = document.getElementById(`q${qNum}-title`);
      const optA = document.getElementById(`q${qNum}-opt-a`);
      const optB = document.getElementById(`q${qNum}-opt-b`);
      const optC = document.getElementById(`q${qNum}-opt-c`);

      if (titleEl) titleEl.textContent = q.title;
      if (optA) optA.textContent = q.options.a;
      if (optB) optB.textContent = q.options.b;
      if (optC) optC.textContent = q.options.c;
    });
  };

  passageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-passage');
      if (!key || !PASSAGES_DATA[key]) return;
      currentPassageKey = key;

      passageBtns.forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });

      renderPassageAndQuestions(currentPassageKey);
    });
  });

  fontSizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const size = btn.getAttribute('data-size');
      fontSizeBtns.forEach((b) => b.classList.toggle('is-active', b === btn));

      if (passageContainer) {
        passageContainer.classList.toggle('font-lg', size === 'lg');
      }
    });
  });

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  const startReading = () => {
    renderPassageAndQuestions(currentPassageKey);
    if (fastWarning) fastWarning.classList.remove('is-visible');
    if (quizErrorBanner) quizErrorBanner.classList.remove('is-visible');

    stepQuiz.querySelectorAll('input[type="radio"]').forEach((r) => {
      r.checked = false;
    });
    stepQuiz.querySelectorAll('.question-block').forEach((block) => {
      block.classList.remove('has-error');
    });

    elapsedSeconds = 0;
    startTimeMs = Date.now();
    if (timerValEl) timerValEl.textContent = formatPersianTime(0);

    showStep(stepRead);

    stopTimer();
    timerInterval = setInterval(() => {
      elapsedSeconds = Math.max(1, Math.round((Date.now() - startTimeMs) / 1000));
      if (timerValEl) {
        timerValEl.textContent = formatPersianTime(elapsedSeconds);
      }
    }, 500);
  };

  const proceedToQuiz = () => {
    stopTimer();
    elapsedSeconds = Math.max(8, Math.round((Date.now() - startTimeMs) / 1000));
    showStep(stepQuiz);
    const firstRadio = stepQuiz.querySelector('input[type="radio"]');
    if (firstRadio) firstRadio.focus();
  };

  if (startBtn) startBtn.addEventListener('click', startReading);

  if (finishReadBtn) {
    finishReadBtn.addEventListener('click', () => {
      const currentSec = Math.round((Date.now() - startTimeMs) / 1000);
      if (currentSec < 10) {
        if (fastWarning) {
          fastWarning.classList.add('is-visible');
          fastWarning.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }
      proceedToQuiz();
    });
  }

  if (forceQuizBtn) forceQuizBtn.addEventListener('click', proceedToQuiz);

  stepQuiz.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const block = radio.closest('.question-block');
      if (block) block.classList.remove('has-error');
      const allAnswered = ['st-q1', 'st-q2', 'st-q3'].every((name) =>
        Boolean(stepQuiz.querySelector(`input[name="${name}"]:checked`))
      );
      if (allAnswered && quizErrorBanner) {
        quizErrorBanner.classList.remove('is-visible');
      }
    });
  });

  if (submitQuizBtn) {
    submitQuizBtn.addEventListener('click', () => {
      const data = PASSAGES_DATA[currentPassageKey] || PASSAGES_DATA.cognitive;
      let hasUnanswered = false;

      [1, 2, 3].forEach((qIdx) => {
        const selected = stepQuiz.querySelector(`input[name="st-q${qIdx}"]:checked`);
        const block = stepQuiz.querySelector(`.question-block[data-question-index="${qIdx}"]`);
        if (!selected) {
          hasUnanswered = true;
          if (block) block.classList.add('has-error');
        } else if (block) {
          block.classList.remove('has-error');
        }
      });

      if (hasUnanswered) {
        if (quizErrorBanner) {
          quizErrorBanner.classList.add('is-visible');
          quizErrorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }

      if (quizErrorBanner) quizErrorBanner.classList.remove('is-visible');

      let correctCount = 0;
      data.questions.forEach((q, idx) => {
        const selected = stepQuiz.querySelector(`input[name="st-q${idx + 1}"]:checked`);
        if (selected && selected.value === q.correct) {
          correctCount += 1;
        }
      });

      const minutes = Math.max(8, elapsedSeconds) / 60;
      const actualWordCount = data.text.trim().split(/\s+/).length || data.wordCount;
      // Genuine WPM calculation: words / minutes or totalWords / (elapsedSeconds / 60)
      const totalWords = actualWordCount;
      const rawWpm = Math.min(950, Math.max(60, Math.round(totalWords / (elapsedSeconds / 60))));
      const comprehensionPct = Math.round((correctCount / data.questions.length) * 100);
      const effectiveWpm = Math.round(rawWpm * (comprehensionPct / 100));

      let ratingLabel = '';
      let analysisText = '';
      let recommendedCourse = 'دوره جامع تندخوانی و تقویت حافظه (۲۲ سرفصل) - آمادگی کنکور و آزمون‌های تخصصی';

      if (comprehensionPct < 50) {
        ratingLabel = 'نیاز به تقویت تمرکز';
        analysisText = `سرعت ظاهری خوانش شما ${toPersianDigits(rawWpm)} کلمه در دقیقه بود، اما با توجه به پاسخ صحیح به ${toPersianDigits(correctCount)} سؤال از ۳ سؤال (${toPersianDigits(comprehensionPct)}٪ درک مطلب)، سرعت مؤثر شما ${toPersianDigits(effectiveWpm)} کلمه در دقیقه محاسبه شد. این الگو نشان می‌دهد در حین مطالعه دچار پرش توجه می‌شوید. پیشنهاد می‌کنیم در دوره جامع ۲۲ سرفصلی، تمرکز ویژه‌ای بر سرفصل‌های فاز دوم (مدیریت تمرکز و تخلیه ذهن) و فاز چهارم (نقشه ذهنی) داشته باشید.`;
        recommendedCourse = 'دوره جامع تندخوانی و تقویت حافظه (۲۲ سرفصل) - تمرکز عمیق و خلاصه‌سازی با Mind Map';
      } else if (rawWpm < 180) {
        ratingLabel = 'کلمه‌خوانی سنتی';
        analysisText = `سرعت مطالعه شما ${toPersianDigits(rawWpm)} کلمه در دقیقه با درک مطلب ${toPersianDigits(comprehensionPct)}٪ است. دقت شما خوب است، اما عادت «گفتار باطنی» و مکث روی تک‌تک واژه‌ها سرعت شما را محدود کرده است. با تمرینات فاز اول دوره جامع (گسترش میدان دید، جداول شولت و خط‌بری دیداری) می‌توانید سرعت خود را بدون افت درک مطلب ۲ تا ۳ برابر ارتقا دهید.`;
        recommendedCourse = 'دوره جامع تندخوانی و تقویت حافظه (۲۲ سرفصل) - رشد فردی و کتاب‌خوانی عمومی';
      } else if (rawWpm <= 260) {
        ratingLabel = 'میانگین استاندارد';
        analysisText = `سرعت خام شما ${toPersianDigits(rawWpm)} کلمه در دقیقه و سرعت مؤثر شما ${toPersianDigits(effectiveWpm)} کلمه در دقیقه (${toPersianDigits(comprehensionPct)}٪ درک مطلب) است. شما پایه مطالعاتی مناسبی دارید و آماده ورود به تکنیک‌های عبارت‌خوانی (Chunking)، کاخ حافظه و سیستم مرور ابینگهاوس در دوره جامع هستید تا سرعت مطالعه خود را به بالای ۵۰۰ کلمه در دقیقه برسانید.`;
        recommendedCourse = 'دوره جامع تندخوانی و تقویت حافظه (۲۲ سرفصل) - آمادگی کنکور و آزمون‌های تخصصی';
      } else {
        ratingLabel = 'مستعد تندخوانی پیشرفته';
        analysisText = `تبریک! سرعت خوانش شما ${toPersianDigits(rawWpm)} کلمه در دقیقه با درک مطلب ${toPersianDigits(comprehensionPct)}٪ (سرعت مؤثر: ${toPersianDigits(effectiveWpm)} کلمه در دقیقه) است. شما سرعت پردازش دیداری بالایی دارید و با یادگیری تکنیک‌های پیش‌خوانی، نقشه ذهنی (Mind Map) و کاخ حافظه در فاز ۳ و ۴ دوره جامع می‌توانید منابع حجیم آزمونی و دانشگاهی را در کوتاه‌ترین زمان تثبیت کنید.`;
        recommendedCourse = 'دوره جامع تندخوانی و تقویت حافظه (۲۲ سرفصل) - مطالعه سریع مقالات و کتب دانشگاهی';
      }

      if (resWpmEl) resWpmEl.textContent = toPersianDigits(rawWpm);
      if (resEwpmEl) resEwpmEl.textContent = toPersianDigits(effectiveWpm);
      if (resCompEl) resCompEl.textContent = `${toPersianDigits(comprehensionPct)}٪`;
      if (resRatingEl) resRatingEl.textContent = ratingLabel;
      if (resAnalysisEl) resAnalysisEl.textContent = analysisText;

      latestSpeedTestResult = {
        rawWpm,
        effectiveWpm,
        comprehensionPct,
        ratingLabel,
        recommendedCourse
      };

      showStep(stepResults);
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      stopTimer();
      showStep(stepIntro);
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      if (latestSpeedTestResult) {
        attachSpeedTestToConsultationForm(latestSpeedTestResult);
      }
    });
  }
}

function attachSpeedTestToConsultationForm(result) {
  const badge = document.getElementById('consultation-test-badge');
  const summaryText = document.getElementById('consultation-test-summary-text');
  const courseSelect = document.getElementById('course-select');
  const userNameInput = document.getElementById('user-name');

  if (badge && summaryText) {
    summaryText.textContent = ` سرعت خام: ${toPersianDigits(result.rawWpm)} کلمه/دقیقه | درک مطلب: ${toPersianDigits(result.comprehensionPct)}٪ (سرعت مؤثر: ${toPersianDigits(result.effectiveWpm)} WPM)`;
    badge.classList.add('is-visible');
  }

  if (courseSelect) {
    if (result.recommendedCourse) {
      courseSelect.value = result.recommendedCourse;
    }
    courseSelect.dispatchEvent(new Event('change'));
  }

  setTimeout(() => {
    if (userNameInput) userNameInput.focus({ preventScroll: true });
  }, 450);
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

  const testBadge = document.getElementById('consultation-test-badge');
  const clearTestBtn = document.getElementById('clear-attached-test-btn');

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
    if (leadData.speedTest) {
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
    const draftData = {
      name: nameInput.value.trim(),
      phone: phoneInput ? phoneInput.value.trim() : '',
      course: courseSelect.value,
      note: noteInput ? noteInput.value.trim() : '',
      speedTest: latestSpeedTestResult || null
    };
    const msg = buildWhatsappMessage(draftData);
    directWhatsappQuickLink.setAttribute(
      'href',
      `https://wa.me/989121205560?text=${encodeURIComponent(msg)}`
    );
  };

  if (clearTestBtn && testBadge) {
    clearTestBtn.addEventListener('click', () => {
      latestSpeedTestResult = null;
      testBadge.classList.remove('is-visible');
      syncDirectQuickLink();
    });
  }

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
    if (!phoneInput) return true;
    const rawValue = phoneInput.value.trim();
    // Phone is optional in direct-message composer; validate only if user entered something
    if (!rawValue) {
      phoneInput.classList.remove('form-input--error');
      phoneInput.setAttribute('aria-invalid', 'false');
      if (phoneError) phoneError.classList.remove('is-visible');
      return true;
    }
    const normalized = toEnglishDigits(rawValue).replace(/[\s\-()]/g, '');
    const iranMobileRegex = /^(\+98|0098|98|0)?9\d{9}$/;

    if (!iranMobileRegex.test(normalized)) {
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

  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('form-input--error')) validateName();
    syncDirectQuickLink();
  });

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (phoneInput.classList.contains('form-input--error')) validatePhone();
      syncDirectQuickLink();
    });
  }

  courseSelect.addEventListener('change', syncDirectQuickLink);
  if (noteInput) noteInput.addEventListener('input', syncDirectQuickLink);

  const renderSuccessView = (leadData) => {
    form.setAttribute('hidden', 'hidden');
    if (successState) {
      successState.classList.add('is-active');
    }

    latestFormattedMessage = buildWhatsappMessage(leadData);
    const encodedMsg = encodeURIComponent(latestFormattedMessage);
    const waUrl = `https://wa.me/989121205560?text=${encodedMsg}`;

    if (whatsappBtn) {
      whatsappBtn.setAttribute('href', waUrl);
    }
    if (directWhatsappQuickLink) {
      directWhatsappQuickLink.setAttribute('href', waUrl);
    }

    if (successSummary) {
      let text = `${leadData.name} عزیز، متن پیام مشاوره شما برای «${leadData.course}» آماده شد.`;
      if (leadData.speedTest) {
        text += ` کارنامه تست سرعت مطالعه شما (${toPersianDigits(leadData.speedTest.rawWpm)} کلمه/دقیقه با درک ${toPersianDigits(leadData.speedTest.comprehensionPct)}٪) نیز در متن پیام درج گردیده است.`;
      }
      text += ' اکنون روی دکمه زیر کلیک کنید تا گفت‌وگوی مستقیم واتساپ با فاطمه آزادخواه باز شود، یا متن را کپی نمایید.';
      successSummary.textContent = text;
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

    if (submitBtn) submitBtn.disabled = true;
    if (submitBtnText) submitBtnText.textContent = 'در حال آماده‌سازی پیام...';

    try {
      localStorage.setItem(STORAGE_KEY_LEAD, JSON.stringify(leadData));
    } catch {
      // Ignore storage quota errors
    }

    if (submitBtn) submitBtn.disabled = false;
    if (submitBtnText) submitBtnText.textContent = 'آماده‌سازی و ارسال مستقیم پیام در واتساپ';

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


