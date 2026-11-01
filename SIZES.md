# SIZES & DIMENSIONS REFERENCE GUIDE (راهنمای جامع سایزها، ابعاد و تایپوگرافی پروژه ذهن آزاد)

این سند حاصل بررسی و آنالیز **خط‌به‌خط تمامی فایل‌های پروژه** (`/css/style.css`، `/css/blog.css`، `/index.html`، `/404.html`، `/blog/*.html`، `/js/script.js`، `/js/three-scenes.js`، `/assets/images/*.svg` و `/site.webmanifest`) است و تمامی اندازه‌ها، فونت‌سایزها، ارتفاع خطوط، وزن فونت‌ها، فاصله‌ها (Padding / Margin / Gap)، عرض و ارتفاع‌ها، شعاع گوشه‌ها (Border Radius)، ضخامت کادرها، نقاط شکست (Breakpoints) و ابعاد گرافیکی/세‌بعدی را به صورت دسته‌بندی‌شده و منظم پوشش می‌دهد.

---

## فهرست بخش‌ها (Table of Contents)

1. [پایه تایپوگرافی و متغیرهای فونت سراسری (Root Typography & Font Scale Tokens)](#1-root-typography--font-scale-tokens)
2. [سیستم تایپوگرافی واکنش‌گرا در موبایل (Mobile-First Responsive Type Scale: 320px–430px)](#2-mobile-first-responsive-type-scale-320px430px)
3. [ارتفاع خط، وزن فونت و فاصله حروف (Line-Height, Font-Weight & Letter-Spacing)](#3-line-height-font-weight--letter-spacing)
4. [مقیاس فاصله‌گذاری، کانتینرها و لایه‌بندی (Spacing Scale, Containers, Radii, Borders & Z-Index)](#4-spacing-scale-containers-radii-borders--z-index)
5. [سایز آیکون‌ها، لوگوها، آواتارها و اهداف لمسی (Icons, Logos, Avatars & Touch Targets)](#5-icons-logos-avatars--touch-targets)
6. [نقاط شکست واکنش‌گرا (Media Query Breakpoints)](#6-media-query-breakpoints)
7. [جدول کامل سایزهای کامپوننت‌ها و بخش‌ها در `/css/style.css` (خط‌به‌خط)](#7-component--section-sizes-in-cssstylecss)
   - 7.1. پایه، اسکرول و دسترس‌پذیری (Base, Scrollbar & Accessibility)
   - 7.2. تایپوگرافی عمومی و تیتر بخش‌ها (Headings & Section Headers)
   - 7.3. دکمه‌ها، نشان‌ها و کارت‌های عمومی (Buttons, Badges & Cards)
   - 7.4. بخش دغدغه‌ها و چالش‌های مطالعه (Pain Points Section)
   - 7.5. هدر سایت و منوی کشویی موبایل (Site Header & Mobile Drawer)
   - 7.6. بخش هیرو و کارت دوره جامع (Hero Section & Master Course Card)
   - 7.7. بخش دستاوردهای دوره (Outcomes Grid)
   - 7.8. بخش ۲۲ سرفصل دوره و تب‌های ۴ فاز (Curriculum Tabs & 22 Topics)
   - 7.9. بخش آزمون آنلاین سرعت مطالعه (Speed Test Engine & `.rs-*` Workspace)
   - 7.10. بخش معرفی مدرس (Instructor Section)
   - 7.11. بخش روش آموزش و چرخه کارگاهی (Methodology & Cycle Steps)
   - 7.12. بخش نظرات دانش‌پذیران و باکس اعتماد (Testimonials & Trust Box)
   - 7.13. بخش مبانی علمی و جدول مقایسه (Scientific Basis & Benchmark Table)
   - 7.14. بخش پرسش‌های متداول (FAQ Accordion)
   - 7.15. بخش فرم مشاوره تخصصی (Consultation Form)
   - 7.16. فوتر سایت، نوار چسبان موبایل و صفحه ۴۰۴ (Footer, Mobile Sticky Bar & 404)
   - 7.17. شبیه‌ساز حرکت چشم، نمودار ابینگهاوس، کارت‌های وبلاگ و مسیر ۳ مرحله‌ای (Interactive Widgets & Blog Cards)
   - 7.18. تغییرات سایز در مدیا کوئری‌های موبایل و دسکتاپ (`/css/style.css`)
8. [جدول کامل سایزهای وبلاگ و مقالات در `/css/blog.css` (خط‌به‌خط)](#8-blog--article-sizes-in-cssblogcss)
9. [ابعاد تصاویر، تگ‌های HTML، فایل‌های SVG و مانیفست (`HTML`, `SVG`, `Webmanifest`)](#9-html-attributes-svg-dimensions--webmanifest)
10. [ابعاد و اندازه‌های پویا در جاوااسکریپت (`/js/script.js` و `/js/three-scenes.js`)](#10-javascript-dynamic-sizes-canvas-charts-reader--threejs-3d)

---

## 1. Root Typography & Font Scale Tokens
**منبع:** `/css/style.css` (خطوط 1 تا 115 و 190 تا 205)

| نام متغیر / سلکتور (Token / Selector) | مقدار (Value) | معادل پیکسلی (Pixel Equivalent) | کاربرد (Usage) |
| :--- | :--- | :--- | :--- |
| `@font-face` (`Vazirmatn`) | `font-weight: 100 900` | — | فونت وریبل وزیرمتن (`Vazirmatn-Variable.woff2`) |
| `html` (`font-size`) | `16px` | `16px` (`1rem`) | سایز پایه کل سند در دسکتاپ و موبایل |
| `html` (`scroll-padding-top`) | `84px` (دسکتاپ) / `76px` (`<=767px`) | `84px` / `76px` | فاصله اسکرول لنگرهای داخلی از بالای صفحه |
| `html` (`scroll-padding-bottom`) | `80px` | `80px` | فاصله اسکرول از پایین صفحه |
| `--font-size-2xs` | `0.8125rem` | `13px` | ریزترین متون کمکی، برچسب‌های ثانویه و متادیتا |
| `--font-size-xs` | `0.875rem` | `14px` | زیرنویس‌ها، بج‌ها، برچسب‌های جدول و متون فرعی |
| `--font-size-sm` | `0.9375rem` | `15px` | متون دکمه‌های کوچک، لینک‌های ناوبری و توضیحات کارت |
| `--font-size-base` | `1rem` | `16px` | متن اصلی بدنه (`body`) و ورودی‌های فرم |
| `--font-size-md` | `1.0625rem` | `17px` | لیدها، عناوین کارت‌ها و سوالات متداول |
| `--font-size-lg` | `clamp(1.125rem, 1.5vw, 1.25rem)` | `18px` تا `20px` | زیرعنوان‌های مهم، عناوین کارت‌های بزرگ |
| `--font-size-xl` | `clamp(1.35rem, 2.2vw, 1.625rem)` | `21.6px` تا `26px` | عناوین میانی، اعداد شاخص و تیترهای فرعی |
| `--font-size-2xl` | `clamp(1.5rem, 2.8vw, 2rem)` | `24px` تا `32px` | تیترهای `h2` بخش‌ها و آمارهای برجسته |
| `--font-size-3xl` | `clamp(1.75rem, 3.5vw, 2.5rem)` | `28px` تا `40px` | تیترهای بزرگ هیرو و بنرهای اصلی |
| `--font-size-4xl` | `clamp(2rem, 4vw, 2.875rem)` | `32px` تا `46px` | بزرگ‌ترین مقیاس تایپوگرافی نمایشی (صفحه ۴۰۴ و آمار) |

---

## 2. Mobile-First Responsive Type Scale (320px–430px)
**منبع:** `/css/style.css` (خطوط 53 تا 83 و 6596 تا 6609)

| نام متغیر (Token) | مقدار استاندارد موبایل (`320px–430px`) | بازه پیکسلی استاندارد | مقدار در گوشی‌های خیلی کوچک (`<=359px`) | کاربرد (Element / Role) |
| :--- | :--- | :--- | :--- | :--- |
| `--font-h1` | `clamp(1.625rem, 1.25rem + 1.5vw, 1.875rem)` | `26px` ← `30px` | `clamp(1.625rem, 8vw, 1.75rem)` (`26px–28px`) | عنوان اصلی صفحه (`H1`) در موبایل |
| `--font-h2` | `clamp(1.4375rem, 1.2rem + 0.9vw, 1.625rem)` | `23px` ← `26px` | `clamp(1.4375rem, 6.8vw, 1.5rem)` (`23px–24px`) | عنوان بخش‌های اصلی (`H2`) در موبایل |
| `--font-h3` | `clamp(1.25rem, 1.1rem + 0.6vw, 1.375rem)` | `20px` ← `22px` | `1.25rem` (`20px`) | زیربخش‌های مهم (`H3`) در موبایل |
| `--font-h4` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)` | `18px` ← `20px` | `1.125rem` (`18px`) | عنوان کارت یا باکس (`H4`) در موبایل |
| `--font-h5` | `clamp(1rem, 0.95rem + 0.3vw, 1.125rem)` | `16px` ← `18px` | `1rem` (`16px`) | ریزعنوان (`H5`) در موبایل |
| `--font-h6` | `clamp(0.9375rem, 0.9rem + 0.25vw, 1rem)` | `15px` ← `16px` | `0.9375rem` (`15px`) | برچسب سطح عنوان (`H6`) در موبایل |
| `--font-body` | `1rem` | `16px` | `1rem` (`16px`) | متن اصلی پاراگراف‌ها (`Body Primary`) |
| `--font-body-secondary` | `clamp(0.875rem, 0.82rem + 0.25vw, 0.9375rem)` | `14px` ← `15px` | `14px–15px` | متن توضیحی فرعی (`Body Secondary`) |
| `--font-card-body` | `clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)` | `15px` ← `16px` | `15px–16px` | متن داخل کارت‌ها (`Card Body`) |
| `--font-button` | `clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)` | `15px` ← `16px` | `15px–16px` | متن دکمه‌ها (`Button / CTA`) |
| `--font-label` | `clamp(0.875rem, 0.84rem + 0.2vw, 0.9375rem)` | `14px` ← `15px` | `14px–15px` | لیبل فیلدهای فرم (`Form Label`) |
| `--font-input` | `1rem` | `16px` | `1rem` (`16px`) | متن داخل اینپوت (جلوگیری از زوم خودکار iOS) |
| `--font-helper` | `clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem)` | `13px` ← `14px` | `13px–14px` | متن راهنما یا خطای فرم (`Helper / Error`) |
| `--font-caption` | `clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)` | `12px` ← `13px` | `12px–13px` | کپشن، متادیتا، تاریخ و بج (`Caption / Badge`) |
| `--font-navigation` | `clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)` | `15px` ← `16px` | `15px–16px` | آیتم‌های منو و ناوبری (`Navigation`) |
| `--font-footer` | `clamp(0.8125rem, 0.78rem + 0.2vw, 0.875rem)` | `13px` ← `14px` | `13px–14px` | متن فوتر (`Footer Text`) |

---

## 3. Line-Height, Font-Weight & Letter-Spacing
**منبع:** `/css/style.css` (خطوط 85 تا 115 و 255 تا 320)

### 3.1. متغیرهای ارتفاع خط (Line-Height Tokens)
| نام متغیر (Token) | مقدار (Value) | کاربرد (Usage) |
| :--- | :--- | :--- |
| `--line-heading` | `1.4` | ارتفاع خط استاندارد تیترهای فارسی در موبایل و دسکتاپ |
| `--line-body` | `1.8` | ارتفاع خط استاندارد متون بدنه فارسی |
| `--line-ui` | `1.5` | ارتفاع خط المان‌های رابط کاربری، فرم‌ها و دکمه‌ها |
| `--line-height-tight` | `1.35` | تیترهای بزرگ (`H1`, `H2`, `.hero__title`, `.post-title`) |
| `--line-height-snug` | `1.45` | زیرعنوان‌ها (`H3`, `H4`, عناوین کارت‌ها) |
| `--line-height-normal` | `1.6` | متون کوتاه رابط کاربری، جدول‌ها و لیست‌ها |
| `--line-height-relaxed` | `1.8` | پاراگراف‌های بدنه اصلی (`body`, `p`) |
| `--line-height-loose` | `2` | متون آموزشی بلند، متن آزمون سرعت مطالعه و بدنه مقالات وبلاگ |

### 3.2. متغیرهای وزن فونت (Font-Weight Tokens)
| نام متغیر (Token) | مقدار عددی (Weight) | کاربرد (Usage) |
| :--- | :--- | :--- |
| `--font-weight-regular` | `400` | متن بدنه، توضیحات و ورودی‌ها |
| `--font-weight-medium` | `500` | لینک‌های منو، برچسب‌ها و متون نیمه‌تأکیدی |
| `--font-weight-semibold` | `600` | زیرعنوان‌ها، دکمه‌های فرعی، بج‌ها و تب‌ها |
| `--font-weight-bold` | `700` | تیترهای اصلی، دکمه‌های اصلی و اعداد مهم |
| `--font-weight-extrabold` | `800` | تیترهای هیرو، اعداد شاخص آماری و امتیازات آزمون |
| `900` (مستقیم در CSS) | `900` | در استایل‌های داخلی بخش آزمون سرعت مطالعه (`.rs-*`) |

### 3.3. فاصله حروف (Letter-Spacing)
| سلکتور / وضعیت | مقدار (Value) | توضیح |
| :--- | :--- | :--- |
| کل متن فارسی (`body`, `h1–h6`) | `0` (`normal`) | طبق استاندارد خط فارسی برای جلوگیری از گسستگی حروف |
| `.curriculum-topic-card__code` | `0.02em` | کد انگلیسی/عددی سرفصل‌ها |
| `.rs-step-counter-en` | `0.05em` | شمارنده انگلیسی مراحل آزمون (مخفی) |

---

## 4. Spacing Scale, Containers, Radii, Borders & Z-Index
**منبع:** `/css/style.css` (خطوط 132 تا 188 و 324 تا 383)

### 4.1. مقیاس فاصله‌گذاری (Spacing Scale `--space-*`)
| متغیر (Token) | مقدار `rem` | معادل پیکسلی (`px`) |
| :--- | :--- | :--- |
| `--space-1` | `0.25rem` | `4px` |
| `--space-2` | `0.5rem` | `8px` |
| `--space-3` | `0.75rem` | `12px` |
| `--space-4` | `1rem` | `16px` |
| `--space-5` | `1.25rem` | `20px` |
| `--space-6` | `1.5rem` | `24px` |
| `--space-8` | `2rem` | `32px` |
| `--space-10` | `2.5rem` | `40px` |
| `--space-12` | `3rem` | `48px` |
| `--space-16` | `4rem` | `64px` |
| `--space-20` | `5rem` | `80px` |
| `--space-24` | `6rem` | `96px` |

### 4.2. ابعاد کانتینرها و بخش‌ها (Containers & Section Padding)
| متغیر / کلاس (Selector / Token) | دسکتاپ و پایه (Base / Desktop) | موبایل (`<=767px`) | دسکتاپ عریض (`>=1024px` / `>=1440px`) |
| :--- | :--- | :--- | :--- |
| `--container-max-width` | `1200px` | `100%` | `1240px` (در `>=1440px`) |
| `--container-narrow-width` | `780px` | `100%` | `780px` |
| `--container-gutter` | `clamp(1rem, 3vw, 2rem)` (`16px–32px`) | `16px` (`--space-4`) | تا `32px` |
| `.post-container` (وبلاگ) | `max-width: 740px` | `padding-inline: 16px` | `padding: 32px 20px 80px` |
| `.section` (`padding-block`) | `clamp(3.25rem, 6vw, 5.5rem)` (`52px–88px`) | `clamp(2.5rem, 7vw, 3.5rem)` (`40px–56px`) | `clamp(4.5rem, 7vw, 6.5rem)` (`72px–104px` در `>=1024px`) |
| `.section--compact` (`padding-block`) | `clamp(2.25rem, 4vw, 3.5rem)` (`36px–56px`) | — | — |
| `p` (`max-width`) | `68ch` | `100%` | `68ch` |

### 4.3. شعاع گوشه‌ها (Border Radius Tokens `--radius-*`)
> تمام گوشه‌های تیز در سراسر پروژه حذف شده و با مقادیر نرم زیر جایگزین شده‌اند:

| متغیر (Token) | مقدار (`rem` / `px`) | کاربرد نمونه |
| :--- | :--- | :--- |
| `--radius-xs` | `0.5rem` (`8px`) | دکمه‌های کوچک درون خطی، اسکرول‌بار، تگ‌های کوچک |
| `--radius-sm` | `0.625rem` (`10px`) | بج‌های کوچک، دکمه‌های کنترل فونت، فیلدهای کوچک |
| `--radius-md` | `0.75rem` (`12px`) | اینپوت‌ها، دکمه‌ها، باکس‌های هشدار و آیتم‌های لیست |
| `--radius-lg` | `1rem` (`16px`) | کارت‌های عمومی، آکاردئون سوالات متداول، جدول‌ها |
| `--radius-xl` | `1.375rem` (`22px`) | کارت‌های بخش‌ها، پنل‌های تعاملی، باکس‌های وبلاگ |
| `--radius-2xl` | `1.625rem` (`26px`) | کارت دوره جامع، باکس فرم مشاوره، کانتینر آزمون سرعت مطالعه |
| `--radius-full` | `9999px` | آواتارهای دایره‌ای، قرص‌های فیلتر (Pills)، بج‌های کپسولی |

### 4.4. سایه‌ها و ضخامت کادرها (Shadows, Borders & Outlines)
| متغیر / ویژگی | مقدار دقیق |
| :--- | :--- |
| `--shadow-xs` | `0 1px 2px 0 rgba(15, 23, 42, 0.04)` |
| `--shadow-sm` | `0 2px 6px -1px rgba(15, 23, 42, 0.06), 0 1px 3px -1px rgba(15, 23, 42, 0.04)` |
| `--shadow-md` | `0 8px 20px -4px rgba(15, 23, 42, 0.07), 0 4px 8px -2px rgba(15, 23, 42, 0.04)` |
| `--shadow-lg` | `0 16px 32px -6px rgba(15, 23, 42, 0.09), 0 6px 12px -3px rgba(15, 23, 42, 0.05)` |
| `--shadow-xl` | `0 24px 48px -12px rgba(15, 23, 42, 0.14)` |
| `--shadow-emerald` | `0 8px 20px -4px rgba(4, 120, 87, 0.28)` |
| `--shadow-focus` | `0 0 0 3px rgba(4, 120, 87, 0.25)` |
| `:focus-visible` | `outline: 2px solid var(--color-primary); outline-offset: 2px` |
| ضخامت کادرهای استاندارد | `1px solid` (کارت‌ها و جداول)، `1.5px solid` (اینپوت‌ها و گزینه‌های آزمون)، `2px solid` (دکمه‌های Outline و کارت دوره جامع)، `4px solid` (نوار کناری باکس نکته کلیدی و خطا) |

### 4.5. مقیاس لایه‌بندی (Z-Index Scale)
| متغیر / کلاس | مقدار | کاربرد |
| :--- | :--- | :--- |
| `--z-base` | `1` | لایه پایه کارت‌ها و محتوای داخلی |
| `--z-sticky` | `100` | المان‌های چسبان میانی |
| `--z-header` | `200` | هدر اصلی سایت (`.site-header`) و نوار چسبان موبایل (`190`) |
| `.scroll-progress-bar` | `calc(var(--z-header) + 10)` = `210` | نوار پیشرفت مطالعه در بالاترین نقطه صفحه (`height: 3px`) |
| `--z-modal-backdrop` | `300` | پس‌زمینه تیره دراور موبایل |
| `--z-modal` | `400` | محتوای منوی کشویی موبایل (`.mobile-drawer`) |
| `--z-toast` | `500` | لینک پرش دسترس‌پذیری (`.skip-link`) و اعلان‌ها |

---

## 5. Icons, Logos, Avatars & Touch Targets
**منبع:** `/css/style.css` (خطوط 117 تا 130، 904 تا 930، 6545 تا 6610)

### 5.1. متغیرهای پایه آیکون، آواتار و هدف لمسی
| متغیر (Token) | مقدار (`px`) | کاربرد |
| :--- | :--- | :--- |
| `--icon-xs` | `16px` | آیکون‌های کوچک داخل بج‌ها و متادیتا |
| `--icon-sm` | `20px` | آیکون‌های دکمه‌ها و لیست‌ها |
| `--icon-md` | `24px` | آیکون‌های استاندارد کارت‌ها و هدر |
| `--icon-lg` | `32px` | آیکون‌های بخش دغدغه‌ها و مراحل |
| `--icon-xl` | `40px` | آیکون‌های بزرگ کانتینردار |
| `--touch-target` | `48px` | حداقل ارتفاع و عرض استاندارد لمسی در موبایل (`48x48px`) |
| `--avatar-sm` | `40px` | آواتار کوچک (متای مقاله در موبایل) |
| `--avatar-md` | `48px` | آواتار متوسط (کارت نظرات دانش‌پذیران: `46px–48px`) |
| `--avatar-lg` | `80px` | آواتار بزرگ (هیرو در موبایل و باکس نویسنده در انتهای مقالات) |
| `--header-height` | `60px` (موبایل) / `68px` (`>=1024px`) | ارتفاع هدر سایت |
| `--mobile-cta-height` | `64px` | ارتفاع نوار چسبان پایین موبایل |

### 5.2. جدول کامل سایز لوگو در تمام نمایشگرها (`Logo Sizing Matrix`)
| محل قرارگیری لوگو | سلکتور CSS / ویژگی HTML | عرض (`width`) | ارتفاع (`height`) | توضیحات |
| :--- | :--- | :--- | :--- | :--- |
| **هدر سایت (موبایل پایه)** | `--logo-mobile-width` | `clamp(100px, 30vw, 132px)` | `auto` (`max-height: 40px`) | متغیر پایه عرض لوگو در موبایل |
| **هدر سایت (`390px–430px`)** | `.site-header .site-brand-logo` | `clamp(120px, 30.5vw, 132px)` | `auto` | گوشی‌های بزرگ (iPhone 14/15/16 Pro Max) |
| **هدر سایت (`375px–389px`)** | `.site-header .site-brand-logo` | `clamp(115px, 31vw, 125px)` | `auto` | گوشی‌های استاندارد (iPhone SE/13/14) |
| **هدر سایت (`360px–374px`)** | `.site-header .site-brand-logo` | `clamp(110px, 31vw, 120px)` | `auto` | گوشی‌های اندرویدی رایج |
| **هدر سایت (`<=359px`)** | `.site-header .site-brand-logo` | `clamp(100px, 31.5vw, 112px)` | `auto` | گوشی‌های کوچک (`320px`) |
| **هدر سایت (تبلت و دسکتاپ `>=768px`)** | `.site-header .site-brand-logo` | `auto` | `44px` (`max-height: 44px`) | بزرگ‌نمایی متوازن در دسکتاپ |
| **هدر سایت (HTML Attribute)** | `<img class="site-brand-logo">` | `width="93"` | `height="40"` | نسبت ابعاد ذاتی فایل SVG (`260:112`) |
| **منوی موبایل (Mobile Drawer)** | `.mobile-drawer__header .site-brand-logo` | `auto` (HTML: `84`) | `38px` (HTML: `36`) | لوگوی داخل هدر منوی کشویی موبایل |
| **فوتر سایت (Site Footer)** | `.site-footer-logo` | `auto` (HTML: `112`) | `46px` (HTML: `48`) | لوگوی سفید فوتر (`logo-white.svg`) |
| **فایل‌های SVG لوگو** | `logo-dark.svg` / `logo-white.svg` | `viewBox="0 0 260 112"` | — | ابعاد بوم برداری اصلی لوگو |

---

## 6. Media Query Breakpoints
**منبع:** `/css/style.css` و `/css/blog.css`

| نوع نقطه شکست (Breakpoint) | عبارت مدیا کوئری (Media Query) | کاربرد اصلی |
| :--- | :--- | :--- |
| **موبایل خیلی کوچک (Small Phone)** | `@media (max-width: 359px)` | کاهش ظریف تیترهای `H1–H6`، لوگو (`100px–112px`) و پدینگ‌ها برای عرض `320px` |
| **موبایل رده ۳۶۰ تا ۳۷۴** | `@media (min-width: 360px) and (max-width: 374px)` | تنظیم عرض لوگوی هدر (`110px–120px`) |
| **موبایل رده ۳۷۵ تا ۳۸۹** | `@media (min-width: 375px) and (max-width: 389px)` | تنظیم عرض لوگوی هدر (`115px–125px`) |
| **موبایل رده ۳۹۰ تا ۴۳۰** | `@media (min-width: 390px) and (max-width: 430px)` | تنظیم عرض لوگوی هدر (`120px–132px`) |
| **موبایل کوچک (`<=480px`)** | `@media (max-width: 480px)` | تک‌ستونه شدن گریدهای ۲ ستونه کوچک، تنظیم کنترل‌های آزمون سرعت و شبیه‌ساز چشم |
| **تبلت کوچک به بالا (`>=480px`)** | `@media (min-width: 480px)` | ۲ ستونه شدن آمارهای مدرس و لیست دستاوردهای دوره |
| **زیر تبلت (`<=639px`)** | `@media (max-width: 639px)` | مخفی شدن دکمه مشاوره در هدر (انتقال به نوار پایین و منوی موبایل)، تمام‌عرض شدن دکمه‌ها |
| **تبلت عمودی به بالا (`>=640px`)** | `@media (min-width: 640px)` | ۲ ستونه شدن دغدغه‌ها، دستاوردها، سرفصل‌ها، چرخه کارگاهی، نظرات، فرم مشاوره و کارت‌های وبلاگ |
| **موبایل و فبلت (`<=767px`)** | `@media (max-width: 767px)` | اعمال کامل سیستم تایپوگرافی واکنش‌گرای موبایل، اهداف لمسی `48px`، فاصله‌ها و کارت‌های موبایل |
| **تبلت و دسکتاپ (`>=768px`)** | `@media (min-width: 768px)` | ارتفاع لوگوی هدر `44px`، ۳ ستونه شدن دغدغه‌ها، ۲ ستونه شدن فوتر و پنل‌های تعاملی |
| **زیر دسکتاپ (`<=820px` / `<=860px`)** | `@media (max-width: 820px)` / `(max-width: 860px)` | تک‌ستونه شدن بخش‌های داخلی آزمون سرعت مطالعه (`.rs-*`) و گرید ۳ ستونه وبلاگ |
| **دسکتاپ استاندارد (`>=1024px`)** | `@media (min-width: 1024px)` | نمایش منوی افقی دسکتاپ، مخفی شدن همبرگر و نوار چسبان موبایل، گرید ۲ ستونه هیرو و مدرس، ۳ ستونه شدن دستاوردها و نظرات، ۴ ستونه شدن چرخه کارگاهی |
| **دسکتاپ عریض (`>=1440px`)** | `@media (min-width: 1440px)` | افزایش `--container-max-width` به `1240px` |

---

## 7. Component & Section Sizes in `/css/style.css`

### 7.1. پایه، اسکرول و دسترس‌پذیری (Lines 190–254 & 6616–6644)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.scroll-progress-bar` | `height: 3px`, `width: 0%` (متغیر با اسکرول تا `100%`), `z-index: 210` |
| `::-webkit-scrollbar` | `width: 8px`, `height: 8px`, `border-radius: 8px` (`--radius-xs`) |
| `.skip-link` | `top: -100px` (`top: 16px` در `:focus`), `right: 16px`, `padding: 12px 20px`, `font-size: 15px` (`--font-size-sm`), `font-weight: 700`, `border-radius: 12px` |
| `.sr-only` | `width: 1px`, `height: 1px`, `margin: -1px`, `padding: 0` |

### 7.2. تایپوگرافی عمومی و تیتر بخش‌ها (Lines 255–457)
| سلکتور (Selector) | دسکتاپ (Desktop) | موبایل (`<=767px`) |
| :--- | :--- | :--- |
| `h1, .h1` | `font-size: clamp(1.75rem, 3.5vw, 2.5rem)` (`28px–40px`), `line-height: 1.35`, `font-weight: 700` | `font-size: var(--font-h1)` (`26px–30px`), `line-height: 1.4` |
| `h2, .h2` | `font-size: clamp(1.5rem, 2.8vw, 2rem)` (`24px–32px`), `line-height: 1.35`, `font-weight: 700` | `font-size: var(--font-h2)` (`23px–26px`), `line-height: 1.4` |
| `h3, .h3` | `font-size: clamp(1.35rem, 2.2vw, 1.625rem)` (`21.6px–26px`), `line-height: 1.45`, `font-weight: 700` | `font-size: var(--font-h3)` (`20px–22px`), `line-height: 1.4` |
| `h4, .h4` | `font-size: clamp(1.125rem, 1.5vw, 1.25rem)` (`18px–20px`), `line-height: 1.45`, `font-weight: 700` | `font-size: var(--font-h4)` (`18px–20px`), `line-height: 1.45` |
| `h5, .h5` | `font-size: 1rem` (`16px`) / `1.0625rem`, `font-weight: 600` | `font-size: var(--font-h5)` (`16px–18px`), `line-height: 1.45` |
| `h6, .h6` | `font-size: 0.9375rem` (`15px`), `font-weight: 600` | `font-size: var(--font-h6)` (`15px–16px`), `line-height: 1.45` |
| `.section-header` | `max-width: 680px`, `margin-bottom: clamp(2rem, 4vw, 3.25rem)` (`32px–52px`) | `margin-bottom: 24px` (`--space-6`) |
| `.section-eyebrow` | `gap: 8px`, `font-size: 14px` (`--font-size-xs`), `font-weight: 700`, `margin-bottom: 12px`, خط کنار `width: 20px`, `height: 2px` | `font-size: var(--font-caption)` (`12px–13px`), `line-height: 1.5` |
| `.section-title` | `font-size: clamp(1.5rem, 2.8vw, 2rem)` (`24px–32px`), `margin-bottom: 16px` | `font-size: var(--font-h2)` (`23px–26px`), `margin-bottom: 10px` |
| `.section-subtitle` | `font-size: 17px` (`--font-size-md`), `line-height: 1.8` | `font-size: var(--font-body-secondary)` (`14px–15px`), `line-height: 1.75` |

### 7.3. دکمه‌ها، نشان‌ها و کارت‌های عمومی (Lines 459–618)
| سلکتور (Selector) | ابعاد و فاصله‌ها (Dimensions & Spacing) | تایپوگرافی و شعاع (Font & Radius) |
| :--- | :--- | :--- |
| `.btn` (دکمه استاندارد) | `min-height: 48px`, `padding: 12px 24px`, `gap: 8px`, `border-width: 1.5px` | `font-size: 16px` (موبایل: `15px–16px`), `font-weight: 700`, `line-height: 1.4`, `border-radius: 12px` (`--radius-md`) |
| `.btn--lg` (دکمه بزرگ) | `min-height: 54px` (موبایل: `48px`), `padding: 16px 32px` (موبایل: `12px 20px`) | `font-size: 17px` (موبایل: `15px–16px`), `border-radius: 16px` (`--radius-lg`) |
| `.btn--sm` (دکمه کوچک) | `min-height: 40px` (در هدر موبایل: `38px`), `padding: 8px 16px` | `font-size: 14px` (`0.875rem`), `border-radius: 12px` |
| `.btn--full` | `width: 100%` | — |
| `.badge` | `gap: 8px`, `padding: 6px 14px`, `border: 1px solid` | `font-size: 13px` (موبایل: `12px–13px`), `font-weight: 600`, `border-radius: 9999px` |
| `.badge__dot` | `width: 8px`, `height: 8px` | `border-radius: 50%` |
| `.card` | `padding: clamp(1.25rem, 2.5vw, 1.75rem)` (`20px–28px`) (موبایل: `20px`), `border: 1px solid` | `border-radius: 16px` (`--radius-lg`) |

### 7.4. بخش دغدغه‌ها و چالش‌های مطالعه (Pain Points — Lines 620–733)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.pain-points-grid` | `gap: 20px` (موبایل: `14px`)؛ ۱ ستون (موبایل) ← ۲ ستون (`>=640px`) ← ۳ ستون (`>=768px`, `gap: 24px`) |
| `.pain-card` | `padding: 24px` (موبایل: `18px`), `gap: 12px`, `border-radius: 16px`, نوار بالای کارت `height: 3px` |
| `.pain-card__icon` | دسکتاپ: `width: 48px`, `height: 48px`, `border-radius: 12px` (SVG داخلی: `24x24px`)؛ موبایل: `width: 40px`, `height: 40px` (SVG: `20x20px`) |
| `.pain-card__title` | دسکتاپ: `font-size: 17px` (`--font-size-md`), `font-weight: 700`؛ موبایل: `font-size: var(--font-h4)` (`18px–20px`) |
| `.pain-card__desc` | دسکتاپ: `font-size: 15px` (`--font-size-sm`), `line-height: 1.8`؛ موبایل: `font-size: var(--font-card-body)` (`15px–16px`), `line-height: 1.75` |
| `.pain-solution-bridge` | `margin-top: 32px`, `padding: 16px 24px` (موبایل: `16px`), `gap: 16px`, `border-radius: 16px`, `font-size: 15px` |

### 7.5. هدر سایت و منوی کشویی موبایل (Site Header & Mobile Drawer — Lines 735–977 & 6645–6708)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.site-header` | `height: var(--header-height)` (`60px` در موبایل، `68px` در `>=1024px`), `z-index: 200`, `border-bottom: 1px solid` |
| `.site-header__inner` | `height: 100%`, `gap: 16px` (`--space-4`) |
| `.site-nav__list` | نمایش در `>=1024px` با `gap: 4px` (`--space-1`) |
| `.site-nav__link` | `padding: 8px 16px`, `font-size: 15px` (`--font-size-sm`), `font-weight: 500`, `border-radius: 10px`, خط زیرین فعال `height: 2px`, `inset-inline: 16px` |
| `.mobile-toggle` | `width: 44px` (در `<=767px`: `width: 48px`, `height: 48px`), `gap: 5px`, `padding: 8px`, `border-radius: 10px` |
| `.mobile-toggle__bar` | `width: 20px`, `height: 2px`, جابه‌جایی در حالت باز: `translateY(7px)` / `translateY(-7px)` |
| `.mobile-drawer__content` | `width: min(300px, 84vw)`, `height: 100%`, `padding: 14px 18px` (`<=767px`: `12px 16px`), `gap: 8px` (`<=767px`: `6px`) |
| `.mobile-drawer__header` | `padding-bottom: 10px` (`<=767px`: `8px`), `border-bottom: 1px solid` |
| `.mobile-drawer__header .site-brand-logo` | `height: 38px`, `max-height: 38px`, `width: auto` |
| `.drawer-close-btn` | `width: 32px`, `height: 32px`, `border: none`, `font-size: 20px` (`1.25rem`), بدون کادر |
| `.mobile-drawer__links` | `gap: 2px` (`<=767px`: `1px`) |
| `.mobile-drawer__link` | `padding: 7px 8px` (`<=767px`: `6px 8px`, `min-height: 36px`), `font-size: 13.5px` (`0.84375rem`) (`<=767px`: `13px` / `0.8125rem`), `font-weight: 600`, `line-height: 1.35`, `border-radius: 10px` |
| `.mobile-drawer__footer` | `padding-top: 8px` (`<=767px`: `6px`)؛ دکمه داخل فوتر دراور: `min-height: 38px`, `padding: 6px 12px`, `font-size: 13px` (`0.8125rem`) |

### 7.6. بخش هیرو و کارت دوره جامع (Hero & Master Course Card — Lines 979–1445)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.hero` | دسکتاپ: `padding-top: clamp(2rem, 4vw, 3.5rem)` (`32px–56px`), `padding-bottom: clamp(3rem, 6vw, 5rem)` (`48px–80px`)؛ موبایل: `padding-top: 20px`, `padding-bottom: 36px` |
| `.hero__grid` | `gap: 32px` (موبایل: `24px`)؛ در `>=1024px`: `grid-template-columns: 1.15fr 0.85fr`, `gap: 48px` |
| `.hero__badge-row` | `gap: 12px`, `margin-bottom: 20px` |
| `.hero__title` | دسکتاپ: `font-size: clamp(1.85rem, 3.6vw, 2.75rem)` (`29.6px–44px`), `line-height: 1.35`, `font-weight: 800`, `margin-bottom: 20px`؛ موبایل: `font-size: var(--font-h1)` (`26px–30px`), `line-height: 1.4`, `margin-bottom: 12px` |
| `.hero__subtitle` | دسکتاپ: `font-size: clamp(1rem, 1.4vw, 1.15rem)` (`16px–18.4px`), `line-height: 1.8`, `margin-bottom: 24px`, `max-width: 60ch`؛ موبایل: `font-size: 16px`, `margin-bottom: 20px` |
| `.hero__trust-pills` | `gap: 8px` (`12px` در دسکتاپ), `margin-bottom: 32px` |
| `.trust-pill` | `gap: 8px`, `padding: 8px 14px` (موبایل: `6px 10px`), `font-size: 13px` (موبایل: `12px–13px`), `font-weight: 600`, `border-radius: 12px`؛ آیکون: `width: 16px`, `height: 16px` |
| `.hero__cta-group` | `gap: 12px` (موبایل: `10px`), `margin-bottom: 24px` |
| `.hero__Guarantee-note` | `gap: 8px`, `font-size: 14px` (موبایل: `13px–14px`) |
| `.hero-visual-stack` | `gap: 16px` |
| `.hero-stage-card` | `border-radius: 22px` (`--radius-xl`), `min-height: 260px` (`300px` در `>=1024px`) |
| `.hero-stage-card__overlay` | `top: 12px`, `right: 12px`, `left: 12px`, `gap: 8px` |
| `.stage-chip` | `gap: 6px`, `padding: 6px 12px`, `font-size: 13px`, `font-weight: 600`, `border-radius: 9999px` |
| `.hero-instructor-card` | `padding: 20px` (موبایل: `16px`), `border-radius: 22px` |
| `.hero-instructor-card__header` | `gap: 16px`, `margin-bottom: 16px` |
| `.hero-instructor-card__avatar` | دسکتاپ: `width: 72px`, `height: 72px`؛ موبایل: `width: 80px`, `height: 80px` (`--avatar-lg`), `border-radius: 16px`, `border: 2px solid` |
| `.hero-instructor-card__name` | `font-size: 18px–20px` (`--font-size-lg`), `font-weight: 800` |
| `.hero-instructor-card__role` | `font-size: 14px` (`--font-size-xs`), `font-weight: 600` |
| `.hero-stats-grid` | `grid-template-columns: repeat(3, 1fr)`, `gap: 8px` (موبایل: `6px`), `padding-top: 16px` |
| `.hero-stat-item` | `padding: 10px 8px` (موبایل: `8px 4px`), `border-radius: 12px` |
| `.hero-stat-item__value` | `font-size: 18px–20px` (موبایل: `18px`), `font-weight: 800`, `line-height: 1.2` |
| `.hero-stat-item__label` | `font-size: 13px` (موبایل: `12px–13px`), `margin-top: 4px` |
| `.master-course-card` | `border: 2px solid`, `border-radius: 26px` (`--radius-2xl`) (موبایل: `22px`) |
| `.master-course-card__banner` | `padding: 16px 24px`, `gap: 12px`, عنوان بنر: `font-size: 15px`, `font-weight: 700` |
| `.master-course-card__badge` | `padding: 4px 12px`, `font-size: 13px`, `font-weight: 700`, `border-radius: 9999px` |
| `.master-course-card__body` | `padding: clamp(1.5rem, 3vw, 2.5rem)` (`24px–40px`) (موبایل: `18px`), `gap: 32px` (`>=1024px`: `grid-template-columns: 1.2fr 0.8fr`, `gap: 40px`) |
| `.master-course-card__title` | دسکتاپ: `font-size: clamp(1.35rem, 2.2vw, 1.75rem)` (`21.6px–28px`), `font-weight: 800`؛ موبایل: `font-size: var(--font-h3)` (`20px–22px`) |
| `.master-course-card__desc` | `font-size: 16px`, `line-height: 1.8`, `margin-bottom: 24px` |
| `.course-pillars-list` | `gap: 12px` (`>=480px`: ۲ ستون), `margin-bottom: 24px` |
| `.course-pillar-item` | `gap: 12px`, `padding: 12px 16px` (موبایل: `10px 12px`), `border-radius: 12px`؛ آیکون: `width: 22px`, `height: 22px`؛ متن: `font-size: 15px`, `font-weight: 600` |
| `.master-course-card__aside` | `padding: 24px` (موبایل: `18px`), `border-radius: 22px`, `gap: 20px` |
| `.course-Audience-tag` | `padding: 8px 12px`, `font-size: 14px`, `border-radius: 10px` |

### 7.7. بخش دستاوردهای دوره (Outcomes Grid — Lines 1447–1501)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.outcomes-grid` | `gap: 20px`؛ ۱ ستون (موبایل) ← ۲ ستون (`>=640px`) ← ۳ ستون (`>=1024px`) |
| `.outcome-card` | `padding: 24px` (موبایل: `18px`), `gap: 12px`, `border-radius: 16px` |
| `.outcome-card__num` | `width: 36px`, `height: 36px`, `border-radius: 10px`, `font-size: 15px`, `font-weight: 800` |
| `.outcome-card__title` | دسکتاپ: `font-size: 17px` (`--font-size-md`), `font-weight: 700`؛ موبایل: `font-size: var(--font-h4)` (`18px–20px`) |
| `.outcome-card__desc` | دسکتاپ: `font-size: 15px`, `line-height: 1.8`؛ موبایل: `font-size: var(--font-card-body)` (`15px–16px`), `line-height: 1.75` |

### 7.8. بخش ۲۲ سرفصل دوره و تب‌های ۴ فاز (Curriculum — Lines 1503–1672)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.curriculum-tabs` | `gap: 8px`, `margin-bottom: 24px`, `padding-bottom: 8px` |
| `.curriculum-tab-btn` | `min-height: 46px` (موبایل: `48px`), `padding: 12px 20px` (موبایل: `10px 14px`), `gap: 8px`, `font-size: 15px`, `font-weight: 700`, `border-radius: 16px`, `border: 1.5px solid` |
| `.curriculum-tab-btn__count` | `padding: 2px 8px`, `font-size: 13px`, `border-radius: 9999px` |
| `.curriculum-phase-header` | `padding: 20px 24px` (موبایل: `16px`), `margin-bottom: 20px`, `border-radius: 16px`, `gap: 16px` |
| `.curriculum-phase-header__title` | `font-size: 18px–20px` (`--font-size-lg`), `font-weight: 800` |
| `.curriculum-phase-header__goal` | `font-size: 15px`, `margin-top: 4px` |
| `.curriculum-topics-grid` | `gap: 16px` (`>=640px`: ۲ ستون) |
| `.curriculum-topic-card` | `padding: 20px` (موبایل: `16px`), `gap: 16px`, `border-radius: 16px` |
| `.curriculum-topic-card__num` | `width: 40px`, `height: 40px`, `border-radius: 12px`, `font-size: 15px`, `font-weight: 800` |
| `.curriculum-topic-card__title` | دسکتاپ: `font-size: 16px`, `font-weight: 700`؛ موبایل: `font-size: var(--font-h4)` (`18px–20px`) |
| `.curriculum-topic-card__desc` | `font-size: 14px` (موبایل: `15px–16px`), `line-height: 1.8` |
| `.curriculum-topic-card__code` | `font-size: 13px`, `font-weight: 600`, `letter-spacing: 0.02em` |
| `.curriculum-summary-bar` | `margin-top: 32px`, `padding: 20px 24px`, `border-radius: 16px`, `gap: 16px` |

### 7.9. بخش آزمون آنلاین سرعت مطالعه (Speed Test & `.rs-*` Workspace — Lines 1674–2190 & 4892–6015)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `#speed-test .container` | `max-width: 100%`, `width: 100%` |
| `.speed-test-shell`, `.rs-workspace` | `width: 100%`, `max-width: 100%` |
| `.rs-app-shell` | `width: 100%`, `max-width: 100%`, `gap: 16px` |
| `.rs-card` | `border-radius: 20px` (`<=820px`: `16px`), `border: 1px solid` |
| `.rs-view-pad` | دسکتاپ: `padding: 34px 36px`؛ تبلت (`<=820px`): `22px 18px`؛ موبایل (`<=767px`): `18px 14px`؛ موبایل کوچک (`<=480px`): `18px 14px` |
| `.rs-intro-hero` | `max-width: 780px`, `padding: 8px 0` |
| `.rs-intro-title` | دسکتاپ: `font-size: clamp(1.45rem, 2.5vw, 1.95rem)` (`23.2px–31.2px`), `font-weight: 900`, `margin-bottom: 12px`؛ موبایل: `font-size: var(--font-h3)` (`20px–22px`) |
| `.rs-intro-lead` | دسکتاپ: `font-size: 15.2px` (`0.95rem`), `line-height: 1.95`, `margin-bottom: 28px`؛ موبایل: `font-size: var(--font-body-secondary)` (`14px–15px`) |
| `.rs-protocol-grid` | `grid-template-columns: repeat(2, 1fr)` (`<=820px`: `1fr`), `gap: 16px`, `margin-bottom: 28px` |
| `.rs-protocol-box` | `padding: 20px`, `border-radius: 16px` |
| `.rs-protocol-box__head` | `gap: 10px`, `margin-bottom: 8px`, `font-size: 15.2px` (`0.95rem`), `font-weight: 800` |
| `.rs-protocol-num` | `width: 28px`, `height: 28px`, `border-radius: 10px` (`--radius-sm`), `font-size: 13.6px` (`0.85rem`), `font-weight: 900` |
| `.rs-protocol-box p` | `font-size: 13.44px` (`0.84rem`), `line-height: 1.8` |
| `.rs-intro-actions-row` | `gap: 14px` (`<=480px`: `flex-direction: column`) |
| `.rs-btn` | `gap: 10px`, `padding: 13px 26px`, `border-radius: 12px`, `font-size: 15.2px` (`0.95rem`), `font-weight: 800` |
| `.rs-btn-sm` | `padding: 8px 14px`, `font-size: 13.12px` (`0.82rem`), `border-radius: 10px`, `font-weight: 700` |
| `.rs-stage-bar` | `padding: 16px 26px` (`<=480px`: `12px 14px`), `gap: 12px` |
| `.rs-breadcrumb` | `gap: 8px`, `font-size: 13.12px` (`0.82rem`), `font-weight: 700`؛ نقطه مرحله: `width: 8px`, `height: 8px` |
| `.rs-reader-controls` | `padding: 16px 26px` (`<=480px`: `12px 14px`), `gap: 16px` |
| `.rs-stage-badge` | `padding: 5px 12px`, `border-radius: 10px`, `font-size: 12.48px` (`0.78rem`), `font-weight: 800` |
| `.rs-stage-heading` | `font-size: 16.8px` (`1.05rem`), `font-weight: 800` |
| `.rs-timer-pill` | `gap: 8px`, `padding: 7px 14px`, `border-radius: 10px`, `font-size: 15.2px` (`0.95rem`), `font-weight: 800`؛ نقطه زنده: `width: 8px`, `height: 8px` |
| `.rs-tool-btn` | `padding: 6px 11px`, `border-radius: 10px`, `font-size: 12.48px` (`0.78rem`), `font-weight: 700` |
| `.rs-prep-banner` | `margin: 18px 26px 0` (`<=480px`: `14px 14px 0`), `padding: 14px 18px`, `border-radius: 12px`, `gap: 14px`, `font-size: 13.76px` (`0.86rem`), `line-height: 1.75` |
| `.rs-canvas-wrap` | `margin: 18px 26px 24px` (`<=820px`: `14px 16px 18px`), `border-radius: 16px`, `min-height: 290px` |
| `.rs-text-content` | دسکتاپ: `padding: 32px 36px`, `font-size: 17px` (`1.0625rem`, قابل تغییر با دکمه‌های `A+`/`A-` بین `14px` تا `22px`), `line-height: 2.25`؛ تبلت (`<=820px`): `padding: 22px 18px`, `line-height: 2.05`؛ موبایل (`<=767px`): `font-size: 16px`, `line-height: 1.95`, `padding: 16px` |
| `.rs-guide-line` | `height: 38px` (`border-bottom: 2px solid`) |
| `.rs-canvas-veil` | `gap: 16px`, `padding: 28px`, متن راهنما: `max-width: 440px`, `font-size: 14.72px` (`0.92rem`), `line-height: 1.8` |
| `.rs-reader-footer` | `padding: 18px 26px` (`<=820px`: `16px 18px`), `gap: 16px`, راهنما: `font-size: 13.44px` (`0.84rem`) |
| `.rs-quiz-head` | `margin-bottom: 24px`, `padding-bottom: 16px`, عنوان: `font-size: 18.4px` (`1.15rem`), زیرعنوان: `13.6px` (`0.85rem`), شمارنده: `padding: 6px 14px`, `font-size: 13.12px` (`0.82rem`) |
| `.rs-q-list` | `gap: 18px`, `margin-bottom: 26px` |
| `.rs-q-block` | `padding: 22px 24px` (`<=480px`: `16px 14px`), `border-radius: 16px` |
| `.rs-q-meta` | `margin-bottom: 10px`, شماره سوال: `font-size: 12.48px` (`0.78rem`), تگ نوع سوال: `padding: 3px 10px`, `font-size: 11.84px` (`0.74rem`) |
| `.rs-q-title` | `font-size: 15.68px` (`0.98rem`), `font-weight: 800`, `margin-bottom: 14px`, `line-height: 1.7` |
| `.rs-opt-grid` | `gap: 10px` (سوالات ۲ گزینه‌ای: `grid-template-columns: repeat(2, 1fr)`، در `<=820px`: `1fr`) |
| `.rs-opt-item` | `gap: 12px`, `padding: 12px 16px` (`<=767px`: `min-height: 48px`, `padding: 10px 14px`), `border: 1.5px solid`, `border-radius: 12px`, `font-size: 14.4px` (`0.9rem`) (`<=767px`: `15px`) |
| `.rs-opt-radio` | `width: 18px`, `height: 18px`, `border: 2px solid` (نقطه داخلی در حالت انتخاب: `width: 8px`, `height: 8px`) |
| `.rs-kpi-grid` | `grid-template-columns: repeat(4, 1fr)` (`<=820px`: `repeat(2, 1fr)`, `<=480px`: `1fr`), `gap: 14px`, `margin-bottom: 22px` |
| `.rs-kpi-card` | `padding: 20px 16px`, `border-radius: 16px` |
| `.rs-kpi-label` | `font-size: 12.48px` (`0.78rem`), `font-weight: 700`, `margin-bottom: 8px` |
| `.rs-kpi-val` | `font-size: 32px` (`2rem`) (`<=767px`: `clamp(1.5rem, 6vw, 1.875rem)` / `24px–30px`), `font-weight: 900`, `line-height: 1.15`, `margin-bottom: 6px` |
| `.rs-kpi-unit` | `font-size: 12px` (`0.75rem`), `font-weight: 600` |
| `.rs-tier-tag` | `margin-top: 6px`, `padding: 3px 10px`, `border-radius: 10px`, `font-size: 11.84px` (`0.74rem`), `font-weight: 800` |
| `.rs-Scale-box` | `padding: 18px 22px`, `border-radius: 16px`, `margin-bottom: 22px`؛ نوار: `height: 10px`؛ نشانگر: `top: -5px`, `width: 20px`, `height: 20px`, `border: 3px solid` |
| `.rs-Scale-ticks` | `margin-top: 10px`, `font-size: 11.84px` (`0.74rem`), `font-weight: 600` |
| `.rs-analysis-grid` | `grid-template-columns: 1fr 1fr` (`<=820px`: `1fr`), `gap: 16px`, `margin-bottom: 24px` |
| `.rs-panel` | `padding: 20px 22px`, `border-radius: 16px`؛ عنوان پنل: `font-size: 15.2px` (`0.95rem`), `font-weight: 800`, `margin-bottom: 12px` |
| `.rs-diagnostic-text` | `font-size: 13.92px` (`0.87rem`), `line-height: 1.9` |
| `.rs-compare-row` | `padding: 9px 0`, `font-size: 13.44px` (`0.84rem`) |
| `.rs-review-item` | `padding: 14px 16px`, `border-radius: 12px`, `font-size: 13.6px` (`0.85rem`), `line-height: 1.7` |
| `.rs-chart-box` | `padding: 18px`, `border-radius: 16px`, `margin-bottom: 22px`؛ بوم نمودار (`#progressChart`): `width: 100%`, `height: 240px` (`<=480px`: `200px`) |
| `.rs-table` | `min-width: 540px`, `font-size: 13.28px` (`0.83rem`), سلول‌ها: `padding: 11px 12px` |
| `.rs-modal-backdrop` | `padding: 20px`, `z-index: 300`؛ `.rs-modal`: `max-width: 680px`, `max-height: 90vh`, `padding: 28px` (`<=480px`: `18px 14px`), `border-radius: 20px` |

### 7.10. بخش معرفی مدرس (Instructor Section — Lines 2192–2331)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.instructor-layout` | `gap: 32px` (`>=1024px`: `grid-template-columns: 0.85fr 1.15fr`, `gap: 48px`) |
| `.instructor-profile-card` | `padding: 24px`, `border-radius: 26px` (`--radius-2xl`) |
| `.instructor-photo-frame` | `width: 100%`, `max-width: 320px` (`<=767px`: `max-width: 260px`), `aspect-ratio: 1 / 1`, `border-radius: 22px`, `margin-bottom: 20px` (تصویر HTML: `width="280" height="280"`) |
| `.instructor-photo-badge` | `bottom: 12px`, `right: 12px`, `left: 12px`, `padding: 10px 14px`, `border-radius: 12px`, `font-size: 13px`, `font-weight: 700` |
| `.instructor-metrics-grid` | `grid-template-columns: repeat(2, 1fr)`, `gap: 12px` |
| `.instructor-metric-box` | `padding: 12px` (موبایل: `12px 8px`), `border-radius: 12px`؛ عدد: `font-size: 21.6px–26px` (`--font-size-xl`), `font-weight: 800`؛ برچسب: `font-size: 13px` |
| `.instructor-bio__name` | دسکتاپ: `font-size: clamp(1.5rem, 2.8vw, 2rem)` (`24px–32px`), `font-weight: 800`؛ موبایل: `font-size: var(--font-h2)` (`23px–26px`) |
| `.instructor-bio__role` | `font-size: 17px` (`--font-size-md`), `font-weight: 600`, `margin-bottom: 20px` |
| `.instructor-bio__text` | `font-size: 16px`, `line-height: 1.8`, `margin-bottom: 24px` |
| `.credentials-list` | `gap: 12px`, `margin-bottom: 32px` |
| `.credential-item` | `gap: 12px`, `padding: 12px 16px` (موبایل: `12px`), `border-radius: 12px`, `font-size: 15px`, `font-weight: 500`؛ آیکون: `width: 22px`, `height: 22px` |

### 7.11. بخش روش آموزش و چرخه کارگاهی (Methodology & Cycle Steps — Lines 2333–2434)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.cycle-grid` | `gap: 20px`؛ ۱ ستون (موبایل) ← ۲ ستون (`>=640px`) ← ۴ ستون (`>=1024px`) |
| `.cycle-step-card` | `padding: 24px` (موبایل: `18px`), `border-radius: 22px` (`--radius-xl`), `gap: 12px` |
| `.cycle-step-card__badge` | `padding: 4px 12px`, `font-size: 13px`, `font-weight: 700`, `border-radius: 9999px` |
| `.cycle-step-card__title` | دسکتاپ: `font-size: 18px–20px` (`--font-size-lg`), `font-weight: 800`؛ موبایل: `font-size: var(--font-h4)` (`18px–20px`) |
| `.cycle-step-card__desc` | `font-size: 15px` (موبایل: `15px–16px`), `line-height: 1.8` |
| `.Format-comparison-banner` | `margin-top: 32px`, `padding: 24px`, `border-radius: 22px`, `gap: 24px` (`>=768px`: ۲ ستون) |

### 7.12. بخش نظرات دانش‌پذیران و باکس اعتماد (Testimonials & Trust Box — Lines 2436–2607)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.testimonials-grid` | `gap: 24px`؛ ۱ ستون (موبایل) ← ۲ ستون (`>=640px`) ← ۳ ستون (`>=1024px`) |
| `.testimonial-card` | `padding: 24px` (موبایل: `18px`), `border-radius: 22px` (`--radius-xl`), `gap: 16px` |
| `.testimonial-card__quote` | `font-size: 15px` (موبایل: `15px–16px`), `line-height: 1.8` |
| `.testimonial-card__author` | `gap: 12px`, `padding-top: 12px` |
| `.testimonial-card__avatar` | `width: 44px`, `height: 44px`, `border-radius: 9999px`, `font-size: 15px`, `font-weight: 700` |
| `.testimonial-card__name` | `font-size: 15px`, `font-weight: 700` |
| `.testimonial-card__role` | `font-size: 13px` (موبایل: `12px–13px`) |
| `.trust-box` | `padding: clamp(1.5rem, 3.5vw, 2.75rem)` (`24px–44px`), `border-radius: 26px` (`--radius-2xl`) |
| `.trust-columns` | `gap: 24px` (`>=768px`: ۲ ستون) |
| `.trust-col` | `padding: 24px`, `border-radius: 16px`؛ عنوان ستون: `font-size: 18px–20px`, `margin-bottom: 16px`؛ آیتم لیست: `gap: 12px`, `font-size: 15px` |
| `.guarantee-strip` | `margin-top: 24px`, `padding: 20px 24px`, `border-radius: 16px`, `gap: 16px`؛ آیکون: `width: 44px`, `height: 44px` |

### 7.13. بخش مبانی علمی و جدول مقایسه (Scientific Basis & Benchmark Table — Lines 2609–2720)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.benchmark-table-wrapper` | `border-radius: 22px` (`--radius-xl`), `border: 1px solid` |
| `.benchmark-table` | `min-width: 600px` (`<=767px`: `min-width: 500px`), `width: 100%` |
| `.benchmark-table th, .benchmark-table td` | دسکتاپ: `padding: 16px 20px`, `font-size: 15px`؛ موبایل (`<=767px`): `padding: 10px 12px`, `font-size: 14px–15px`, `line-height: 1.5` |
| `.science-pillars-grid` | `gap: 20px`, `margin-top: 32px` (`>=768px`: ۲ ستون) |
| `.science-card` | `padding: 24px` (موبایل: `18px`), `border-radius: 16px`, `gap: 8px`؛ عنوان: `font-size: 17px`؛ متن: `15px` |

### 7.14. بخش پرسش‌های متداول (FAQ Accordion — Lines 2722–2802)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.faq-list` | `max-width: 780px` (`--container-narrow-width`), `gap: 12px` |
| `.faq-item` | `border-radius: 16px` (`--radius-lg`), `border: 1px solid` |
| `.faq-trigger` | `padding: 20px 24px` (موبایل: `min-height: 52px`, `padding: 14px 16px`), `gap: 16px`, `font-size: 17px` (موبایل: `16px–18px`), `font-weight: 700` |
| `.faq-trigger__icon` | `width: 28px`, `height: 28px`, `border-radius: 9999px` |
| `.faq-content__inner` | `padding: 0 24px 20px` (موبایل: `0 16px 16px`), `font-size: 15px`, `line-height: 1.8` |

### 7.15. بخش فرم مشاوره تخصصی (Consultation Form — Lines 2804–3026 & 6233–6259)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.consultation-layout` | `gap: 32px` (`>=1024px`: `grid-template-columns: 0.9fr 1.1fr`, `gap: 48px`) |
| `.consultation-layout--single` | `max-width: 680px`, `margin-inline: auto` |
| `.consultation-form-card` | `padding: clamp(1.5rem, 3vw, 2.5rem)` (`24px–40px`) (موبایل: `20px 16px`), `border-radius: 26px` (`--radius-2xl`) (موبایل: `22px`) |
| `.consultation-form-card__title` | دسکتاپ: `font-size: 21.6px–26px` (`--font-size-xl`), `font-weight: 800`, `margin-bottom: 8px`؛ موبایل: `font-size: var(--font-h3)` (`20px–22px`) |
| `.consultation-form-card__subtitle` | `font-size: 15px`, `margin-bottom: 24px` |
| `.form-grid` | `gap: 20px` (`>=640px`: ۲ ستون برای ردیف نام و شماره تماس) |
| `.form-group` | `gap: 8px` |
| `.form-label` | دسکتاپ: `font-size: 15px`, `font-weight: 700`؛ موبایل: `font-size: var(--font-label)` (`14px–15px`), `line-height: 1.5` |
| `.form-input, .form-select, .form-textarea` | `min-height: 48px`, `padding: 12px 16px`, `font-size: 16px` (`1rem`), `line-height: 1.5`, `border: 1.5px solid`, `border-radius: 12px` (`--radius-md`) |
| `.form-select` | `background-size: 16px`, `padding-left: 40px` |
| `.form-textarea` | `min-height: 100px` |
| `.form-error` | `font-size: 13px` (موبایل: `13px–14px`), `font-weight: 600` |
| `.form-success-panel` | `padding: 24px`, `border-radius: 16px`؛ آیکون: `width: 56px`, `height: 56px`, `margin-bottom: 16px` |

### 7.16. فوتر سایت، نوار چسبان موبایل و صفحه ۴۰۴ (Lines 3028–3230 & 6352–6407)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.site-footer` | `padding-top: 64px` (`--space-16`), `padding-bottom: calc(48px + 64px)` در موبایل (`padding-bottom: 48px` در `>=1024px`) |
| `.site-footer__container` | `gap: 32px` (`>=768px`: `1.2fr 1.8fr`، `>=1024px`: `1.3fr 1.7fr`, `gap: 48px`), `padding-bottom: 36px` |
| `.site-footer__brand` | `max-width: 38ch`, لوگو: `height: 46px`, `width: auto` |
| `.site-footer__about` | `font-size: 15px` (موبایل: `13px–14px`), `line-height: 1.8`, `margin-bottom: 20px` |
| `.site-footer__nav` | `grid-template-columns: repeat(2, 1fr)` (`<=480px`: `1fr`), `gap: 32px` (`<=767px`: `24px`) |
| `.footer-col__title` | `font-size: 16px`, `font-weight: 700`, `margin-bottom: 16px` |
| `.footer-col__list` | `gap: 10px` |
| `.footer-col__list a` | `font-size: 14px` (موبایل: `13px–14px`), `line-height: 1.7`, `padding-block: 3px` |
| `.site-footer__bottom-inner` | `padding-top: 24px`, `gap: 12px`, `font-size: 13px` (موبایل: `12px–13px`) |
| `.mobile-sticky-bar` | ارتفاع کلی نوار: `padding: 10px 16px` + `safe-area-inset-bottom`, `z-index: 190` (مخفی در `>=1024px`) |
| `.mobile-sticky-bar__inner` | `gap: 12px`, `max-width: 540px`؛ دکمه‌های داخل نوار: `min-height: 46px`, `padding: 8px 12px`, `font-size: 14px` (`<=359px`: `13.5px`) |
| `.error-page` (`404.html`) | `min-height: 80vh`, `padding: 48px 16px`؛ کارت: `max-width: 520px`, `padding: 40px`؛ کد ۴۰۴: `font-size: 32px–46px` (`--font-size-4xl`), `font-weight: 800` |

### 7.17. شبیه‌ساز حرکت چشم، نمودار ابینگهاوس، کارت‌های وبلاگ و مسیر ۳ مرحله‌ای (Lines 3231–4890 & 6018–6350)
| سلکتور (Selector) | ویژگی‌های سایز و اندازه (Size Properties) |
| :--- | :--- |
| `.eye-sim-box` | `margin-top: 32px`, `padding: 24px` (موبایل: `16px 14px`), `border-radius: 22px` |
| `.eye-sim-mode-btn` | `padding: 8px 16px` (`<=480px`: `8px 10px`, `font-size: 13px`), `font-size: 14px`, `font-weight: 700`, `border-radius: 10px` |
| `.eye-sim-viewport` | `padding: 24px` (`<=480px`: `16px`), `border-radius: 16px`, `margin-bottom: 16px`, `min-height: 110px` |
| `.eye-sim-words` | `gap: 12px`, `font-size: 18px–20px` (`<=480px`: `16px`), `font-weight: 600`, `line-height: 2` |
| `.eye-sim-word` | `padding: 4px 10px`, `border-radius: 10px` |
| `.eye-sim-metrics` | `grid-template-columns: repeat(3, 1fr)` (`<=480px`: `1fr`), `gap: 12px` |
| `.eye-sim-metric` | `padding: 12px`, `border-radius: 12px`؛ مقدار: `font-size: 17px`, `font-weight: 800` |
| `.ebbinghaus-card` | `margin-top: 32px`, `padding: clamp(1.25rem, 3vw, 2.25rem)` (`20px–36px`) (موبایل: `16px 14px`), `border-radius: 22px` |
| `.ebbinghaus-toggle-btn` | `min-height: 40px` (موبایل: `44px`), `padding: 8px 16px`, `font-size: 14px`, `font-weight: 700`, `border-radius: 10px` |
| `.ebbinghaus-chart-stage` | `padding: 16px` (`<=480px`: `10px 8px`), `border-radius: 16px`؛ SVG: `max-height: 240px` (`viewBox="0 0 520 218"`) |
| `.ebbinghaus-stat-pill` | `padding: 12px 16px`, `border-radius: 12px`؛ مقدار: `font-size: 18px–20px`, `font-weight: 800` |
| `.blog-grid` | `gap: 20px`؛ ۱ ستون (موبایل) ← ۲ ستون (`>=640px`) ← ۳ ستون (`>=1024px`, `gap: 24px`) ← ۴ ستون در صفحه اصلی در صورت ۴ کارت (`>=1200px`) |
| `.blog-card` | `border-radius: 22px` (`--radius-xl`) (موبایل: `16px`), `border: 1px solid` |
| `.blog-card__media` | `aspect-ratio: 16 / 9` (`width="640" height="300"` در HTML) |
| `.blog-card__badge` | `top: 12px`, `right: 12px`, `padding: 4px 12px`, `font-size: 13px` (موبایل: `12px–13px`), `font-weight: 700`, `border-radius: 10px` |
| `.blog-card__body` | `padding: 20px` (موبایل: `16px`), `gap: 8px` |
| `.blog-card__meta` | `font-size: 13px` (موبایل: `12px–13px`), `font-weight: 600` |
| `.blog-card__title` | دسکتاپ: `font-size: 17px` (`--font-size-md`), `font-weight: 800`, `line-height: 1.45`؛ موبایل: `font-size: var(--font-h4)` (`18px–20px`) |
| `.blog-card__excerpt` | دسکتاپ: `font-size: 14px`, `line-height: 1.8`؛ موبایل: `font-size: var(--font-card-body)` (`15px–16px`), `line-height: 1.75` |
| `.blog-card__footer` | `padding-top: 12px`, `font-size: 14px`, `font-weight: 700` |
| `.three-stage-card` | `border-radius: 22px`, `min-height: 280px` (`320px` در دسکتاپ, `220px` در موبایل `<=767px`) |
| `.journey-step-card` | `padding: 20px 18px` (موبایل: `18px`), `border-radius: 16px`؛ عدد مرحله: `width: 36px`, `height: 36px`, `font-size: 16px` |

---

## 8. Blog & Article Sizes in `/css/blog.css`
**منبع:** `/css/blog.css` (خطوط 1 تا 932)

| سلکتور (Selector) | دسکتاپ (Desktop) | موبایل (`<=767px` / `<=860px`) |
| :--- | :--- | :--- |
| `.breadcrumb` | `padding: 16px 0`, `margin-bottom: 12px` | `padding: 10px 0`, `margin-bottom: 6px` |
| `.breadcrumb__list` | `gap: 8px`, `font-size: 13px` (`--font-size-2xs`), `font-weight: 500` | `font-size: var(--font-caption)` (`12px–13px`) |
| `.breadcrumb__current` | `font-weight: 700`, `max-width: 280px` | `max-width: 210px` |
| `.blog-hub-hero` | `padding: 28px 0 36px`, `border-bottom: 1px solid` | `padding: 20px 0 24px` |
| `.blog-hub-hero__inner` | `max-width: 760px` | — |
| `.blog-hub-hero__title` | `font-size: clamp(1.65rem, 3.2vw, 2.35rem)` (`26.4px–37.6px`), `font-weight: 800`, `line-height: 1.35`, `margin-bottom: 20px` | `font-size: var(--font-h1)` (`26px–30px`), `line-height: 1.4`, `margin-bottom: 16px` |
| `.category-filter-pills` | `gap: 8px`, `margin-top: 24px` | `gap: 6px`, `margin-top: 16px` |
| `.category-pill` | `padding: 8px 16px`, `font-size: 14px` (`--font-size-xs`), `font-weight: 700`, `border-radius: 12px`, `border: 1.5px solid` | `min-height: 42px`, `padding: 8px 14px`, `font-size: 14px–15px` |
| `.blog-hub-section` | `padding: 48px 0 64px` | `padding: 32px 0 48px` |
| `.blog-hub-grid` | `grid-template-columns: repeat(3, 1fr)` (۳ پست در هر ردیف), `gap: 24px` | در `<=860px`: `repeat(2, 1fr)`؛ در `<=640px`: `1fr`, `gap: 18px` |
| `.blog-hub-grid .blog-card__media` | `aspect-ratio: 16 / 9`, `max-height: 220px` | `max-height: 200px` |
| `.blog-hub-grid .blog-card__body` | `padding: 24px` (`--space-6`) | `padding: 18px` |
| `.blog-hub-grid .blog-card__title` | `font-size: 18px–20px` (`--font-size-lg`), `line-height: 1.45` | `font-size: var(--font-h4)` (`18px–20px`) |
| `.post-container` | `max-width: 740px`, `padding: 24px 16px 64px` (`>=768px`: `padding: 32px 20px 80px`) | `padding: 16px 16px 56px` |
| `.post-header` | `margin-bottom: 28px`, `padding-bottom: 24px` | `margin-bottom: 20px`, `padding-bottom: 16px` |
| `.post-badge` | `padding: 5px 14px`, `font-size: 13px`, `font-weight: 700`, `border-radius: 10px`, `margin-bottom: 14px` | `font-size: 12px–13px` |
| `.post-title` | `font-size: clamp(1.5rem, 3vw, 2.15rem)` (`24px–34.4px`), `font-weight: 800`, `line-height: 1.4`, `margin-bottom: 18px` | `font-size: var(--font-h1)` (`26px–30px`), `line-height: 1.4`, `margin-bottom: 14px` |
| `.post-meta-row` | `gap: 12px 16px`, `font-size: 13px` (`--font-size-2xs`), `font-weight: 600` | `gap: 8px 12px`, `font-size: 12px–13px` |
| `.post-meta-row__avatar` | `width: 36px`, `height: 36px`, `border-radius: 9999px` | `width: 40px`, `height: 40px` (`--avatar-sm`) |
| `.post-meta-row__tag` | `gap: 5px`, `padding: 3px 10px`, `font-size: 12px` (`0.75rem`), `font-weight: 700`, `border-radius: 10px` | — |
| `.takeaway-card` | `padding: 20px 24px`, `border-radius: 16px`, `border-right: 4px solid`, `margin-bottom: 28px` | `padding: 16px`, `margin-bottom: 22px` |
| `.takeaway-card__header` | `gap: 8px`, `font-size: 14px`, `font-weight: 800`, `margin-bottom: 8px` | `font-size: 14px–15px` |
| `.takeaway-card__text` | `font-size: 15px` (`--font-size-sm`), `line-height: 1.85`, `font-weight: 500` | `font-size: 15px–16px`, `line-height: 1.8` |
| `.post-infographic` | `margin: 0 0 28px 0`, `border-radius: 22px` (`--radius-xl`) | `border-radius: 16px`, `margin-bottom: 22px` |
| `.post-infographic__inner` | `padding: 16px` (`>=640px`: `24px`) | `padding: 12px` |
| `.post-infographic__img` | `max-height: 320px`, `border-radius: 12px` (HTML: `width="640" height="300"`) | — |
| `.post-diagram-grid` | `grid-template-columns: 1fr` (`>=640px`: `repeat(2, 1fr)`), `gap: 12px`, `padding: 0 16px 16px` (`>=640px`: `0 24px 20px`) | `padding: 0 12px 12px`, `gap: 10px` |
| `.post-diagram-card` | `padding: 14px 16px`, `border-radius: 12px`, `gap: 4px` | `padding: 12px 14px` |
| `.post-diagram-card__tag` | `font-size: 12px` (`0.75rem`), `font-weight: 800` | — |
| `.post-diagram-card__title` | `font-size: 14px` (`--font-size-xs`), `font-weight: 800` | `font-size: 15px–16px` |
| `.post-diagram-card__desc` | `font-size: 13px` (`--font-size-2xs`), `line-height: 1.6` | `font-size: 13px–14px` |
| `.post-infographic__caption` | `padding: 12px 20px`, `font-size: 13px`, `border-top: 1px solid` | `padding: 10px 14px`, `font-size: 12px–13px` |
| `.toc-box` | `padding: 20px 24px`, `border-radius: 16px`, `margin-bottom: 32px` | `padding: 16px`, `margin-bottom: 24px` |
| `.toc-box__header` | `gap: 8px`, `font-size: 15px`, `font-weight: 800`, `margin-bottom: 12px` | `font-size: 16px` |
| `.toc-box__list` | `gap: 8px`, نقطه قبل از لینک: `width: 6px`, `height: 6px` | `gap: 6px` |
| `.toc-box__link` | `gap: 8px`, `font-size: 14px`, `font-weight: 600`, `padding: 4px 0` | `font-size: 14px–15px`, `min-height: 36px` |
| `.post-body` | `font-size: 16px` (`--font-size-base`), `line-height: 2` (`--line-height-loose`) | `font-size: 16px`, `line-height: 1.85` |
| `.post-section` | `margin-bottom: 36px` | `margin-bottom: 28px` |
| `.post-section__title` (`h2`) | `font-size: clamp(1.25rem, 2.2vw, 1.5rem)` (`20px–24px`), `font-weight: 800`, `line-height: 1.45`, `margin-bottom: 14px`, `padding-bottom: 10px` | `font-size: var(--font-h2)` (`23px–26px`), `line-height: 1.4` |
| `.post-body p` | `margin-bottom: 16px`, `max-width: 68ch` | `margin-bottom: 14px`, `max-width: 100%` |
| `.protocol-step-card` | `padding: 18px 20px`, `border-radius: 16px`, `margin-bottom: 14px` | `padding: 14px 16px` |
| `.protocol-step-card__header` | `gap: 12px`, `margin-bottom: 8px` | `gap: 10px` |
| `.protocol-step-card__num` | `width: 30px`, `height: 30px`, `border-radius: 10px`, `font-size: 14px`, `font-weight: 800` | — |
| `.protocol-step-card__title` | `font-size: 16px`, `font-weight: 800` | `font-size: var(--font-h3)` (`20px–22px`) |
| `.protocol-step-card__desc` | `font-size: 15px`, `line-height: 1.85` | `font-size: 15px–16px`, `line-height: 1.75` |
| `.pitfall-box` | `padding: 16px 20px`, `border-radius: 12px`, `border-right: 4px solid`, `margin-bottom: 12px` | `padding: 14px 16px` |
| `.pitfall-box__title` | `gap: 8px`, `font-size: 15px`, `font-weight: 800`, `margin-bottom: 4px` | `font-size: 16px` |
| `.pitfall-box__desc` | `font-size: 14px`, `line-height: 1.8` | `font-size: 14px–15px` |
| `.schedule-table-wrapper` | `border-radius: 16px`, `margin: 20px 0 28px` | — |
| `.schedule-table` | `min-width: 480px`, `font-size: 14px`؛ سلول‌ها: `padding: 12px 16px` | `min-width: 440px`, سلول‌ها: `padding: 10px 12px` |
| `.post-course-card` | `padding: 24px 28px`, `border-radius: 22px`, `margin: 40px 0 32px`, `gap: 20px` | `padding: 20px 18px`, `border-radius: 16px`, `margin: 28px 0 24px` |
| `.post-course-card__kicker` | `font-size: 13px`, `font-weight: 700`, `margin-bottom: 6px` | `font-size: 12px–13px` |
| `.post-course-card__title` | `font-size: 18px–20px` (`--font-size-lg`), `font-weight: 800`, `margin-bottom: 8px` | `font-size: var(--font-h3)` (`20px–22px`) |
| `.post-course-card__desc` | `font-size: 14px`, `line-height: 1.8` | `font-size: 14px–15px` |
| `.author-bio-card` | `gap: 20px`, `padding: 24px`, `border-radius: 22px`, `margin-bottom: 40px` | `padding: 18px 16px`, `border-radius: 16px`, `gap: 12px` |
| `.author-bio-card__avatar` | `width: 80px`, `height: 80px`, `border-radius: 9999px`, `border: 2px solid` | `width: 80px`, `height: 80px` (`--avatar-lg`) |
| `.author-bio-card__name` | `font-size: 17px` (`--font-size-md`), `font-weight: 800` | `font-size: var(--font-h4)` (`18px–20px`) |
| `.author-bio-card__title` | `font-size: 13px`, `font-weight: 700`, `margin-bottom: 8px` | `font-size: 12px–13px` |
| `.author-bio-card__desc` | `font-size: 14px`, `line-height: 1.8` | `font-size: 14px–15px` |
| `.related-posts` | `padding-top: 32px`, `border-top: 1px solid` | `padding-top: 24px` |
| `.related-posts__title` | `font-size: 18px–20px` (`--font-size-lg`), `font-weight: 800`, `margin-bottom: 20px` | `font-size: var(--font-h3)` (`20px–22px`), `margin-bottom: 16px` |
| `.related-posts__grid` | `grid-template-columns: 1fr` (`>=640px`: `repeat(3, 1fr)`), `gap: 16px` | `gap: 14px` |
| `.related-posts__grid .blog-card__title` | `font-size: 15px` (`--font-size-sm`), `line-height: 1.5` | `font-size: var(--font-h4)` (`18px–20px`) |

---

## 9. HTML Attributes, SVG Dimensions & Webmanifest
**منبع:** `/index.html`، `/404.html`، `/blog/*.html`، `/assets/images/*.svg`، `/site.webmanifest`

### 9.1. ابعاد تصاویر و متاتگ‌ها در فایل‌های HTML
| فایل و المان (File & Element) | ویژگی `width` | ویژگی `height` | نسبت ابعاد / توضیحات |
| :--- | :--- | :--- | :--- |
| `og:image:width` / `og:image:height` (`index.html`) | `1200` | `630` | ابعاد استاندارد تصویر Open Graph شبکه‌های اجتماعی |
| لوگوی هدر (`.site-brand-logo`) در تمام صفحات | `93` | `40` | نسبت `2.325:1` |
| لوگوی داخل منوی موبایل (`.mobile-drawer__header img`) | `84` | `36` | نسبت `2.33:1` |
| لوگوی فوتر (`.site-footer-logo`) در تمام صفحات | `112` | `48` | نسبت `2.33:1` |
| آواتار مدرس در کارت هیرو (`.hero-instructor-card__avatar`) | `72` | `72` | نسبت `1:1` (`instructor_fatemeh_azadkhah.webp`) |
| عکس اصلی مدرس در بخش معرفی مدرس (`.instructor-photo`) | `280` | `280` | نسبت `1:1` (`instructor_fatemeh_azadkhah.webp`) |
| تصاویر کارت‌های وبلاگ و اینفوگرافیک مقالات (`.blog-card__img`, `.post-infographic__img`) | `640` | `300` | در HTML؛ فایل‌های SVG دارای `viewBox="0 0 800 450"` (`16:9`) هستند |
| آواتار کوچک نویسنده در هدر مقالات (`.post-meta-row__avatar`) | `36` | `36` | نسبت `1:1` (در موبایل با CSS به `40x40px` می‌رسد) |
| آواتار نویسنده در باکس بیوگرافی انتهای مقالات (`.author-bio-card__avatar`) | `80` | `80` | نسبت `1:1` |
| آیکون‌های SVG درون‌خطی در HTML | `14`، `16`، `18`، `20`، `22`، `24` | هم‌اندازه با عرض | تماماً دارای `viewBox="0 0 24 24"` |
| نمودار SVG تعاملی ابینگهاوس (`#ebbinghaus-svg` در `index.html`) | `viewBox="0 0 520 218"` | — | شبکه خطوط افقی در `y = 30, 75, 120, 165`، محور افقی از `x = 48` تا `495` |

### 9.2. ابعاد فایل‌های گرافیکی برداری (`/assets/images/*.svg`) و `/site.webmanifest`
| فایل (File Path) | `viewBox` / `sizes` | جزئیات ابعاد داخلی |
| :--- | :--- | :--- |
| `/assets/images/logo-dark.svg` | `viewBox="0 0 260 112"` | مسیرهای برداری تایپوگرافی دوزبانه `AzadMind / ذهن آزاد` |
| `/assets/images/logo-white.svg` | `viewBox="0 0 260 112"` | نسخه سفید مخصوص فوتر تیره |
| `/assets/images/article-subvocalization.svg` | `viewBox="0 0 800 450"`, `width="100%"`, `height="100%"` | پس‌زمینه `800x450` با `rx="16"`، شبکه `32x32`، پنل چپ `270x260` (`rx="12"`)، پنل راست `290x300` (`rx="14"`)، بلوک‌های مکث چشمی `70x30` (`rx="6"`) |
| `/assets/images/article-ebbinghaus-schedule.svg` | `viewBox="0 0 800 450"`, `width="100%"`, `height="100%"` | پس‌زمینه `800x450` (`rx="16"`)، کارت نمودار `660x330` (`rx="16"`)، نقاط مرور با شعاع `r="6"` و `r="9"`، قرص‌های زمان‌بندی `64x14` (`rx="7"`) |
| `/assets/images/article-mindmap-rules.svg` | `viewBox="0 0 800 450"`, `width="100%"`, `height="100%"` | پس‌زمینه `800x450` (`rx="16"`)، کارت بوم `650x330` (`rx="18"`)، هسته مرکزی `r="48"` و `r="36"`، گره‌های شاخه اول `r="14"` با ضخامت خط `5px`، گره‌های فرعی `r="8"` با ضخامت خط `3px` |
| `/assets/images/article-pomodoro-focus.svg` | `viewBox="0 0 800 450"`, `width="100%"`, `height="100%"` | پس‌زمینه `800x450` (`rx="16"`)، پنل چپ تایمر `r="118"` و `r="92"` (`stroke-width="14"`)، پنل راست انرژی `310x250` (`rx="16"`)، ۴ بلوک تمرکز `50x68` (`rx="8"`) |
| `/site.webmanifest` | آیکون‌ها: `sizes: "any"`, `"192x192"`, `"512x512"` | پیکربندی PWA با `display: "standalone"` |

---

## 10. JavaScript Dynamic Sizes (Canvas, Charts, Reader & Three.js 3D)

### 10.1. اندازه‌های پویا در `/js/script.js`
| بخش / قابلیت در `script.js` | متغیر / ویژگی | مقدار دقیق | توضیح |
| :--- | :--- | :--- | :--- |
| **نوار پیشرفت اسکرول و هدر** | `scrollY > 20` | `20px` | آستانه اضافه شدن کلاس `.is-scrolled` به هدر |
| **خط‌بر دیداری آزمون سرعت** | `guideLine.style.top` | `${y - 19}px` | مرکز کردن خط‌بر `38px` روی مختصات ماوس در بوم متن |
| **تنظیم سایز فونت آزمون سرعت** | `readerFontSize` | پیش‌فرض: `17px` | بازه مجاز: حداقل `14px` تا حداکثر `22px` با گام تغییر `1.5px` (`changeFontSize(±1)`) |
| **مقیاس سرعت مؤثر (Effective WPM)** | `pct` (`#scaleMarker`) | `Math.min(98, Math.max(2, (effectiveWpm / 600) * 100))` | درصد موقعیت افقی نشانگر سرعت مؤثر روی نوار `0` تا `600+ WPM` |
| **بوم نمودار پیشرفت (`#progressChart`)** | `W`, `H`, `dpr` | `W = Math.max(rect.width \|\| 640, 300)`, `H = 220`, `dpr = Math.min(devicePixelRatio, 2)` | ابعاد منطقی بوم نمودار تاریخچه آزمون‌ها |
| **حاشیه‌های داخلی نمودار (`pad`)** | `pad` | `{ top: 42, right: 34, bottom: 48, left: 54 }` | فاصله‌های داخلی بوم نمودار پیشرفت (برحسب پیکسل) |
| **تایپوگرافی و خطوط داخل بوم نمودار** | `ctx.font` / `lineWidth` | محور Y: `500 11px Vazirmatn`؛ برچسب X: `600 11px Vazirmatn`؛ اعداد بالای نقاط: `700 11px Vazirmatn`؛ راهنما (Legend): `700 12px Vazirmatn`؛ پیام خالی: `600 14px Vazirmatn` | خطوط منحنی با `lineWidth = 2.5` و دایره‌های نقاط با شعاع `4.5px` |
| **شبیه‌ساز حرکت چشم (`initEyeSimulator`)** | `traditional` vs `trained` | سنتی: `chunkSize = 1`، `interval = 340ms`، سرعت `۱۸۰ کلمه/دقیقه`، `۱۲ توقف` | تندخوانی: `chunkSize = 3`، `interval = 420ms`، سرعت `۵۲۰ کلمه/دقیقه`، `۴ توقف` |
| **نمودار تعاملی ابینگهاوس (`initEbbinghausVisualizer`)** | مختصات SVG (`520x218`) | ایستگاه‌های مرور در `x = 166, 276, 382, 480`؛ بدون مرور: ماندگاری `۲۰٪` (`۶ ساعت بازخوانی`)؛ با ۴ مرور: ماندگاری `۹۲٪` (`۲۰ دقیقه مرور`) | تغییر پویا با کلیک روی دکمه‌های تغییر وضعیت |

### 10.2. ابعاد صحنه‌های سه‌بعدی WebGL در `/js/three-scenes.js`
| صحنه / کانوس (Scene / Canvas) | دوربین و رندرر (Camera & Renderer) | ابعاد هندسه‌ها و بافت‌ها (Geometries & Canvas Textures) |
| :--- | :--- | :--- |
| **تنظیمات عمومی رندررها** | `pixelRatio = Math.min(window.devicePixelRatio, 2)` (در موبایل یا حالت کم‌مصرف: حداکثر `1.25` یا `1.5`)؛ سایه‌ها: `shadowMap.width = 1024`, `shadowMap.height = 1024` | تغییر اندازه خودکار با `ResizeObserver` بر اساس `clientWidth` و `clientHeight` کانتینر |
| **بافت‌های متنی دوبعدی در صحنه سه‌بعدی** | `createPersianPageTexture`: بوم `256x256` پیکسل (`border-radius: 18px`, کادر `6px`) | `createFloatingTagSprite`: بوم `512x160` پیکسل (`font: 700 32px Vazirmatn`, مقیاس اسپرایت `1.75 x 0.55`) |
| **۱. صحنه هیرو (`#hero-three-canvas`)** | `PerspectiveCamera(36, w/h, 0.1, 100)`, موقعیت `(0, 1.35, 6.2)` | پایه کتاب: `BoxGeometry(3.2, 0.14, 2.2)`؛ صفحات چپ و راست: `BoxGeometry(1.48, 0.08, 2.05)`؛ عطف کتاب: `CylinderGeometry(0.12, 0.12, 2.06, 16)`؛ صفحات پرنده: `PlaneGeometry(1.25, 1.75)`؛ حلقه نورانی: `TorusGeometry(2.05, 0.018, 16, 100)`؛ گوی تمرکز: `OctahedronGeometry(0.32, 2)` |
| **۲. صحنه سرفصل‌ها (`#curriculum-three-canvas`)** | `PerspectiveCamera(36, w/h, 0.1, 100)`, موقعیت `(0, 0.8, 6.8)` | ۴ حلقه مداری: `TorusGeometry` با شعاع‌های `1.25, 1.65, 2.05, 2.45` و ضخامت `0.015`؛ ۲۲ گره سرفصل: `SphereGeometry(0.11, 20, 20)`؛ هسته مرکزی: `IcosahedronGeometry(0.52, 2)` و پوسته سیمی `IcosahedronGeometry(0.68, 1)` |
| **۳. صحنه آزمون سرعت (`#speedtest-three-canvas`)** | `PerspectiveCamera(36, w/h, 0.1, 100)`, موقعیت `(0, 0.6, 6.4)` | قوس سرعت‌سنج: `TorusGeometry(1.85, 0.07, 16, 80, Math.PI)`؛ تیک‌های مدرج: `BoxGeometry(0.03, 0.16, 0.03)` در شعاع `1.6`؛ عقربه: مخروط `ConeGeometry(0.06, 1.45, 16)` و مرکز `CylinderGeometry(0.18, 0.18, 0.14, 24)` |
| **۴. صحنه چرخه کارگاهی (`#methodology-three-canvas`)** | `PerspectiveCamera(36, w/h, 0.1, 100)`, موقعیت `(0, 1.4, 6.6)` | حلقه اتصال: `TorusGeometry(1.75, 0.03, 16, 100)`؛ ۴ ایستگاه: پایه `CylinderGeometry(0.46, 0.52, 0.16, 28)` + هندسه‌های اختصاصی (`BoxGeometry(0.48, 0.36, 0.08)`, `TorusGeometry(0.28, 0.035)`, `OctahedronGeometry(0.3, 1)`, `ConeGeometry(0.28, 0.48, 4)`) |
| **۵. صحنه مبانی علمی (`#science-three-canvas`)** | `PerspectiveCamera(36, w/h, 0.1, 100)`, موقعیت `(0, 0.4, 6.8)` | ۲۰ گره سیناپسی در دو نیمکره: `SphereGeometry(0.095, 16, 16)`؛ پالس‌های نوری متحرک: `SphereGeometry(0.045, 12, 12)`؛ حلقه استوایی: `TorusGeometry(2.15, 0.012, 12, 90)` |
