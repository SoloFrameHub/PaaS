# Build System Migration Guide

Complete step-by-step guide to migrate SoloFrameHub to modern build system.

**Goal:** 77 → 92-97/100 PageSpeed score

---

## Overview

### What's Changing

**Before (Current):**
```
/ (everything is production)
├── index.html (109KB, not minified)
├── *.html (10 pages)
├── tailwind_theme/tailwind.css (65KB unpurged)
├── Inline JavaScript in every HTML
├── Google Fonts from CDN
└── Iconify from CDN
```

**After (Modern Build):**
```
/src (source code)
├── js/main.js (extracted JavaScript)
├── css/
│   ├── tailwind-input.css (Tailwind directives)
│   └── fonts.css (self-hosted fonts)

/ (root - HTML files)
├── *.html (updated to reference /src files)

/dist (production build - what gets deployed)
├── index.html (minified)
├── assets/
│   ├── css/main-[hash].css (8KB purged)
│   ├── js/main-[hash].js (5KB bundled)
│   ├── fonts/*.woff2
│   └── images/*.webp
```

---

## Phase 1: Setup (30 minutes)

### 1.1 Install Build System

```bash
# Run the setup script
./scripts/setup_build_system.sh
```

This installs:
- ✅ Vite (build tool)
- ✅ Tailwind CSS with purging
- ✅ PostCSS with cssnano
- ✅ Compression plugins
- ✅ Image optimization tools

---

### 1.2 Download Self-Hosted Fonts

**Why:** Remove Google Fonts CDN dependency (-8 to -12 points)

1. Visit https://gwfh.mranftl.com/fonts

2. Download **Inter** (Latin, Regular/Medium/SemiBold):
   - Weights: 400, 500, 600
   - Format: WOFF2 only
   - Download → Extract to `assets/fonts/`

3. Download **Newsreader** (Latin, Regular/SemiBold):
   - Weights: 400, 600
   - Format: WOFF2
   - Download → Extract to `assets/fonts/`

4. Download **Geist** (if available) OR use Inter fallback:
   - Weights: 400, 500, 600
   - Format: WOFF2
   - Download → Extract to `assets/fonts/`

**Expected files in `assets/fonts/`:**
```
inter-v12-latin-regular.woff2    (Inter 400)
inter-v12-latin-500.woff2        (Inter 500)
inter-v12-latin-600.woff2        (Inter 600)
newsreader-v19-latin-regular.woff2
newsreader-v19-latin-600.woff2
geist-v1-latin-regular.woff2
geist-v1-latin-500.woff2
geist-v1-latin-600.woff2
```

---

## Phase 2: HTML Updates (1-2 hours)

You need to update all 10 HTML files. I'll show you the changes for `index.html` - repeat for all pages.

### 2.1 Update `<head>` Section

**Find and REMOVE:**
```html
<!-- REMOVE: Google Fonts CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet">

<!-- REMOVE: Iconify CDN -->
<script src="https://code.iconify.design/3/3.1.0/iconify.min.js" defer></script>

<!-- REMOVE: Inline styles -->
<style>
body { font-family: 'Inter', sans-serif; }
.font-serif-custom { font-family: 'Newsreader', serif; }
/* ... rest of inline CSS ... */
</style>

<!-- REMOVE: Old Tailwind reference -->
<link rel="preload" href="tailwind_theme/tailwind.css" as="style">
<link href="tailwind_theme/tailwind.css" rel="stylesheet" type="text/css">
```

**ADD Instead:**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#020408">

    <!-- Title, description, etc. (keep as-is) -->

    <!-- PRELOAD CRITICAL FONTS -->
    <link rel="preload" href="/assets/fonts/inter-v12-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/assets/fonts/newsreader-v19-latin-regular.woff2" as="font" type="font/woff2" crossorigin>

    <!-- SELF-HOSTED FONTS -->
    <link rel="stylesheet" href="/src/css/fonts.css">

    <!-- TAILWIND CSS (will be processed by Vite) -->
    <link rel="stylesheet" href="/src/css/tailwind-input.css">

    <!-- PRELOAD LCP IMAGE (change per page) -->
    <link rel="preload" as="image" href="/assets/images/hero-image.webp" fetchpriority="high">

    <!-- Structured data, etc. (keep as-is) -->
</head>
```

---

### 2.2 Update End of `<body>`

**Find and REMOVE:**
```html
<!-- REMOVE: All inline JavaScript -->
<script defer>
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu handling
    const menuButton = document.getElementById('menu-button');
    // ... 200+ lines of code ...
});
</script>
```

**ADD Instead:**
```html
    <!-- EXTRACTED JAVASCRIPT (Vite will bundle this) -->
    <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

---

### 2.3 Replace Iconify Icons with Inline SVG

**Find patterns like:**
```html
<span class="iconify" data-icon="lucide:chevron-down" data-width="16"></span>
```

**Replace with inline SVG:**
```html
<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
</svg>
```

**Common icons to replace:**
- `lucide:chevron-down` → Chevron down arrow
- `lucide:menu` → Hamburger menu
- `lucide:x` → Close X
- `lucide:arrow-right` → Right arrow
- `lucide:check` → Checkmark

I can create an icon sprite sheet if you prefer (see Phase 5).

---

### 2.4 Add Image Dimensions

**Find images without dimensions:**
```html
<img src="assets/images/hero.webp" alt="..." loading="lazy">
```

**Add width and height:**
```html
<img src="assets/images/hero.webp" alt="..." width="1200" height="600" loading="lazy" decoding="async">
```

**For hero/LCP images:**
```html
<img src="assets/images/hero.webp" alt="..." width="1200" height="600" loading="eager" fetchpriority="high">
```

---

## Phase 3: Test Development Build (15 minutes)

### 3.1 Start Dev Server

```bash
npm run dev
```

This starts Vite dev server at http://localhost:8888

**Check:**
- ✅ Page loads without errors
- ✅ Fonts render correctly
- ✅ Mobile menu works
- ✅ All styles applied
- ✅ No console errors

---

### 3.2 Fix Any Issues

**Common issues:**

**Fonts not loading:**
- Check `assets/fonts/` has all .woff2 files
- Verify paths in `src/css/fonts.css` match actual filenames

**Styles missing:**
- Check Tailwind classes in HTML match config
- Verify `src/css/tailwind-input.css` exists

**JavaScript errors:**
- Check `src/js/main.js` syntax
- Verify element IDs referenced in JS exist in HTML

---

## Phase 4: Create Production Build (15 minutes)

### 4.1 Build for Production

```bash
npm run build
```

This creates `/dist` folder with:
- ✅ Minified HTML (50-70% smaller)
- ✅ Purged CSS (~8KB instead of 65KB)
- ✅ Bundled JavaScript (~5KB)
- ✅ Optimized assets
- ✅ Cache-busted filenames (e.g., `main-a3f9b2c1.js`)

---

### 4.2 Preview Production Build

```bash
npm run preview
```

Opens http://localhost:4173 to test the built version.

**Check:**
- ✅ All pages load
- ✅ Assets load from `/dist/assets/`
- ✅ Fonts render correctly
- ✅ Images optimized
- ✅ No 404 errors

---

### 4.3 Test PageSpeed Score

Go to: https://pagespeed.web.dev/

Test: http://localhost:4173

**Expected Results:**
- **Mobile:** 92-97/100 (up from 77)
- **Desktop:** 95-100/100
- **LCP:** <2.5s
- **CLS:** <0.1
- **FID:** <100ms

---

## Phase 5: SVG Icon Sprite (Optional, High Impact)

Instead of inline SVG in every HTML file, create a sprite sheet.

### 5.1 Create Sprite File

Create `assets/icons/sprite.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <!-- Chevron Down -->
  <symbol id="icon-chevron-down" viewBox="0 0 24 24">
    <path d="m6 9 6 6 6-6" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </symbol>

  <!-- Menu -->
  <symbol id="icon-menu" viewBox="0 0 24 24">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </symbol>

  <!-- Close X -->
  <symbol id="icon-x" viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </symbol>

  <!-- Arrow Right -->
  <symbol id="icon-arrow-right" viewBox="0 0 24 24">
    <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </symbol>

  <!-- Check -->
  <symbol id="icon-check" viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </symbol>

  <!-- Users -->
  <symbol id="icon-users" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </symbol>

  <!-- Add more icons as needed -->
</svg>
```

### 5.2 Include Sprite in HTML

At the top of `<body>`:

```html
<body>
    <!-- Icon Sprite (invisible) -->
    <svg style="display:none">
        <use href="/assets/icons/sprite.svg"></use>
    </svg>

    <!-- Rest of page -->
</body>
```

### 5.3 Use Icons

```html
<!-- Instead of Iconify -->
<svg class="w-4 h-4"><use href="/assets/icons/sprite.svg#icon-chevron-down"/></svg>

<!-- Bigger icon -->
<svg class="w-8 h-8"><use href="/assets/icons/sprite.svg#icon-menu"/></svg>
```

**Impact:** Removes 50KB+ Iconify dependency (+3-5 points)

---

## Phase 6: Image Optimization (High Impact)

### 6.1 Convert Images to WebP/AVIF

```bash
# Install image tools
npm install --save-dev sharp

# Create conversion script
```

Or use online tools:
- https://squoosh.app/ (Google's image optimizer)
- https://cloudconvert.com/

**Convert all PNG/JPG to WebP:**
- Quality: 80-85
- Expected size reduction: 50-70%

---

### 6.2 Create Responsive Images

For hero/large images, create multiple sizes:

```
hero.webp        (original, 1600w)
hero-1200.webp   (1200w)
hero-800.webp    (800w)
hero-480.webp    (480w)
```

### 6.3 Update HTML with Picture Element

```html
<picture>
  <source srcset="/assets/images/hero-480.webp 480w,
                  /assets/images/hero-800.webp 800w,
                  /assets/images/hero-1200.webp 1200w,
                  /assets/images/hero.webp 1600w"
          sizes="(max-width: 768px) 100vw, 1200px"
          type="image/webp">
  <img src="/assets/images/hero.jpg" alt="Hero" width="1600" height="800" loading="eager" fetchpriority="high">
</picture>
```

**Impact:** +5-10 points

---

## Phase 7: Deploy to Production

### 7.1 Build Production Assets

```bash
# Clean previous build
npm run clean

# Create fresh production build
npm run build
```

### 7.2 Upload `dist/` Folder

Upload ONLY the `/dist` folder contents to your web server:

```
dist/
├── index.html
├── solo-founders-lead-gen-sales-academy.html
├── ... (all 10 HTML files)
├── assets/
│   ├── css/
│   │   └── main-a3f9b2c1.css (purged, minified)
│   ├── js/
│   │   └── main-f7d8e4b2.js (bundled, minified)
│   ├── fonts/
│   │   └── *.woff2
│   └── images/
│       └── *.webp
├── sitemap.xml
└── robots.txt
```

**DO NOT upload:**
- ❌ `/src` folder
- ❌ `/node_modules`
- ❌ `/_pgbackup`
- ❌ `package.json`, `vite.config.js`, etc.

### 7.3 Configure Server Cache Headers

If using Apache, create `.htaccess` in `dist/`:

```apache
# Cache static assets for 1 year
<FilesMatch "\.(css|js|jpg|jpeg|png|webp|avif|gif|svg|woff|woff2|ttf|eot)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

# Cache HTML for 1 hour (revalidate)
<FilesMatch "\.html$">
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Serve pre-compressed files if available
<IfModule mod_headers.c>
  <FilesMatch "\.br$">
    Header set Content-Encoding br
  </FilesMatch>
  <FilesMatch "\.gz$">
    Header set Content-Encoding gzip
  </FilesMatch>
</IfModule>
```

If using Cloudflare or Nginx, similar cache headers apply.

---

## Phase 8: Verify & Test

### 8.1 Test Live Site

Visit: https://soloframehub.com

Check:
- ✅ All pages load
- ✅ Fonts render
- ✅ Mobile menu works
- ✅ Images load
- ✅ No console errors

### 8.2 Run PageSpeed Insights

https://pagespeed.web.dev/analysis?url=https://soloframehub.com

**Expected Results:**
- **Mobile:** 92-97/100 ✅
- **Desktop:** 95-100/100 ✅

**Improvements achieved:**
- ✅ Tailwind CSS: 65KB → 8KB (-87%)
- ✅ JavaScript: Inline → 5KB bundled (cached)
- ✅ Fonts: Google CDN → Self-hosted (-3 requests)
- ✅ Icons: Iconify CDN → Inline SVG (-50KB)
- ✅ Images: Optimized WebP (-50-70%)
- ✅ Total page size: ~50% reduction

---

## Maintenance Workflow

### Making Changes

**1. Edit source files:**
```
- HTML files in root /
- JavaScript in /src/js/
- CSS in /src/css/
```

**2. Test locally:**
```bash
npm run dev
```

**3. Build for production:**
```bash
npm run build
```

**4. Deploy `/dist` folder**

### Adding New Pages

1. Create HTML file in root
2. Add to `vite.config.js` input section:
```javascript
input: {
  // ... existing entries
  newPage: resolve(__dirname, 'new-page.html')
}
```
3. Build and deploy

---

## Troubleshooting

### Build Fails

**Error: Cannot find module 'vite'**
```bash
npm install
```

**Error: PostCSS plugin error**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Fonts Not Loading

- Check `assets/fonts/` has .woff2 files
- Verify paths in `src/css/fonts.css`
- Check browser console for 404 errors
- Ensure fonts preloaded in `<head>`

### Tailwind Classes Not Working

- Run `npm run build` to regenerate CSS
- Check class names match Tailwind documentation
- Verify `tailwind.config.js` content paths include your HTML

### Images Too Large

- Convert to WebP (use Squoosh or sharp)
- Create responsive sizes (480w, 800w, 1200w)
- Use `<picture>` element with `srcset`

---

## Rollback Plan

If something goes wrong:

1. **Keep old site as backup:**
```bash
mv dist dist-backup
```

2. **Restore original:**
```bash
# Copy current production files to dist/
cp *.html dist/
cp -r assets dist/
cp -r tailwind_theme dist/
```

3. **Deploy backup**

---

## Summary Checklist

### Setup Phase
- [  ] Run `./scripts/setup_build_system.sh`
- [  ] Download self-hosted fonts to `assets/fonts/`
- [  ] Verify all dependencies installed

### HTML Updates (Repeat for all 10 pages)
- [  ] Remove Google Fonts CDN
- [  ] Add self-hosted fonts
- [  ] Remove Iconify CDN
- [  ] Replace with inline SVG or sprite
- [  ] Remove inline `<style>` and `<script>`
- [  ] Add `<script type="module" src="/src/js/main.js">`
- [  ] Add `<link rel="stylesheet" href="/src/css/tailwind-input.css">`
- [  ] Add image width/height attributes
- [  ] Preload LCP image per page

### Testing
- [  ] Test dev server (`npm run dev`)
- [  ] Fix any console errors
- [  ] Test all pages and functionality
- [  ] Build production (`npm run build`)
- [  ] Preview production (`npm run preview`)
- [  ] Test PageSpeed score locally

### Deployment
- [  ] Upload `/dist` folder to server
- [  ] Configure cache headers
- [  ] Test live site
- [  ] Run PageSpeed Insights
- [  ] Verify 90+ score achieved

---

## Expected Results

### Before
- PageSpeed Mobile: **77/100**
- Tailwind CSS: 65KB
- Total JS: Inline in every page
- Fonts: Google CDN
- Icons: Iconify CDN (50KB)
- Build process: None

### After
- PageSpeed Mobile: **92-97/100** ✅
- Tailwind CSS: ~8KB (-87%)
- Total JS: ~5KB bundled
- Fonts: Self-hosted
- Icons: Inline SVG or sprite
- Build process: Vite with optimization

**Total Score Gain: +15 to +20 points**

---

Need help? Refer to:
- [website-optimization-analysis.md](website-optimization-analysis.md) - Detailed analysis
- [OPTIMIZATION-SUMMARY.md](OPTIMIZATION-SUMMARY.md) - Quick reference
- Vite docs: https://vitejs.dev/
- Tailwind docs: https://tailwindcss.com/docs/
