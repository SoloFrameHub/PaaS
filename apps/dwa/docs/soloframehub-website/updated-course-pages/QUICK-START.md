# Quick Start - Modern Build System

Get started with the new build system in 10 minutes.

---

## Step 1: Install Dependencies (2 minutes)

```bash
./scripts/setup_build_system.sh
```

This installs all build tools and creates the necessary structure.

---

## Step 2: Download Fonts (5 minutes)

Visit https://gwfh.mranftl.com/fonts and download:

**Inter** (weights 400, 500, 600):
1. Select "Inter"
2. Select "latin" charsets
3. Select weights: Regular (400), Medium (500), SemiBold (600)
4. Download WOFF2
5. Extract to `assets/fonts/`

**Newsreader** (weights 400, 600):
1. Select "Newsreader"
2. Select "latin" charsets
3. Select weights: Regular (400), SemiBold (600)
4. Download WOFF2
5. Extract to `assets/fonts/`

**Geist** (weights 400, 500, 600):
- If not available, skip (will fall back to Inter)

---

## Step 3: Update One HTML File (Template)

Update `index.html` first as a template, then repeat for other pages.

### In `<head>`, replace:

**OLD:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet">
<script src="https://code.iconify.design/3/3.1.0/iconify.min.js" defer></script>
<style>body { font-family: 'Inter', sans-serif; }...</style>
<link href="tailwind_theme/tailwind.css" rel="stylesheet">
```

**NEW:**
```html
<link rel="preload" href="/assets/fonts/inter-v12-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/src/css/fonts.css">
<link rel="stylesheet" href="/src/css/tailwind-input.css">
<link rel="preload" as="image" href="/assets/images/hero.webp" fetchpriority="high">
```

### At end of `<body>`, replace:

**OLD:**
```html
<script defer>
document.addEventListener('DOMContentLoaded', function() {
    // ... 200+ lines ...
});
</script>
```

**NEW:**
```html
<script type="module" src="/src/js/main.js"></script>
```

---

## Step 4: Test (2 minutes)

```bash
npm run dev
```

Open http://localhost:8888

✅ Check page loads
✅ Check fonts render
✅ Check mobile menu works
✅ Check no console errors

---

## Step 5: Build for Production (1 minute)

```bash
npm run build
```

This creates `/dist` folder with optimized files.

Preview:
```bash
npm run preview
```

---

## Step 6: Deploy

Upload **ONLY** the `/dist` folder contents to your server.

**DO NOT upload:**
- ❌ `node_modules/`
- ❌ `src/`
- ❌ `_pgbackup/`
- ❌ Config files

---

## What You Get

### Before
- PageSpeed: **77/100**
- Tailwind: 65KB
- Fonts: Google CDN
- Icons: Iconify CDN
- JavaScript: Inline

### After
- PageSpeed: **92-97/100** ✅
- Tailwind: ~8KB
- Fonts: Self-hosted
- Icons: Inline SVG
- JavaScript: 5KB bundled

---

## Need More Details?

📖 Full guide: [BUILD-SYSTEM-MIGRATION.md](BUILD-SYSTEM-MIGRATION.md)
📊 Analysis: [website-optimization-analysis.md](website-optimization-analysis.md)
📋 Summary: [OPTIMIZATION-SUMMARY.md](OPTIMIZATION-SUMMARY.md)
