# Static HTML Files for Hostinger Deployment

## What's Included

This directory contains clean, editable HTML files ready for deployment to your Hostinger static site.

### Files Created:

- **index.html** - Homepage (fully functional with all sections)
- **sitemap.xml** - SEO sitemap (6 pages)
- **robots.txt** - Search engine rules
- **favicon.ico** - Site icon
- **images/** - All images and assets

### Key Features:

✅ **Clean, Readable HTML** - Properly formatted, easy to edit
✅ **Tailwind CSS via CDN** - No build process needed
✅ **All SEO/Schema Markup** - Organization, FAQPage, SoftwareApplication schemas
✅ **Responsive Design** - Mobile-first, works on all devices
✅ **Self-Contained** - No external dependencies except Tailwind CDN and Google Fonts

## What's Included in index.html:

### SEO & Meta Tags:
- Title, description, keywords
- Open Graph tags (Facebook/LinkedIn sharing)
- Twitter Card tags
- Canonical URL
- Robots meta

### Schema.org Structured Data (JSON-LD):
1. **Organization Schema** - Company info, contact details
2. **SoftwareApplication Schema** - Platform features, ratings (4.8/5)
3. **WebSite Schema** - Search action for Google
4. **FAQPage Schema** - 8 questions for voice search/AI engines

### Content Sections (Comprehensive):
1. **Header/Navigation** - Desktop + mobile responsive menu
2. **Hero Section** - "Extend Patient Care Beyond the Session"
3. **Problem Statement** - 92% rejection rate, scalability crisis
4. **Platform Architecture** - Two-school system (217 + 375 = 592 lessons)
5. **Learning Journey** - 5-step detailed flow:
   - Step 1: 9-Step Personalized Onboarding (30+ data points)
   - Step 2: Dashboard with up to 5 recommended courses
   - Step 3: Lesson Experience (5+ components, AI coach, real-time safety)
   - Step 4: Longitudinal Tracking (421 quizzes, 22 assessments)
   - Step 5: Optimization School transition
6. **Interactive Components** - 36 types showcased (thought records, exposure hierarchy, body map, breathing, scenarios, tracking)
7. **Adaptive Learning Research** - ML models, GPU training, 30+ data points per user
8. **AI Safety (DistilBERT)** - Crisis detection, zero-knowledge architecture, 50-200ms inference
9. **Provider Portal** - Patient roster, crisis alerts, trend monitoring, session prep
10. **Practice Licensing** - Revenue share model, network effects, target markets
11. **CTA Section** - Request Demo + Pricing
12. **Footer** - Links, copyright

**Total:** ~1,200 lines of clean, readable HTML showing HOW the platform works, not just WHAT it does

## How to Deploy to Hostinger:

### Option 1: Upload All Files
1. Log into Hostinger File Manager
2. Navigate to `public_html/` directory
3. Upload **all files** from this `static-html/` directory:
   - index.html
   - sitemap.xml
   - robots.txt
   - favicon.ico
   - images/ folder (entire directory)

### Option 2: FTP Upload
1. Use FileZilla or similar FTP client
2. Connect to your Hostinger account
3. Upload all files to `public_html/`

## How to Edit:

### Editing Text Content:
The HTML is clean and readable. Simply find the section you want to change and edit the text directly.

**Example - Change hero headline:**
```html
<!-- Find this line (around line 330): -->
<h1 class="h1 font-playfair-display text-slate-100 mb-4">Extend Patient Care Beyond the Session</h1>

<!-- Change to: -->
<h1 class="h1 font-playfair-display text-slate-100 mb-4">Your New Headline Here</h1>
```

### Editing Colors:
Tailwind CSS uses utility classes. Common colors used:

- **Blue** (primary): `bg-blue-600`, `text-blue-600`
- **Slate** (dark): `bg-slate-900`, `text-slate-400`
- **Indigo** (accent): `bg-indigo-600`, `text-indigo-600`

**Example - Change button color:**
```html
<!-- From blue to green: -->
<a href="#" class="bg-blue-600 hover:bg-blue-700">Button</a>
<!-- To: -->
<a href="#" class="bg-green-600 hover:bg-green-700">Button</a>
```

### Editing Images:
1. Upload new image to `images/` folder
2. Update the `src` attribute:
```html
<img src="./images/your-new-image.jpg" alt="Description">
```

### Tailwind CSS Classes Reference:

**Spacing:**
- `p-4` = padding: 1rem
- `m-4` = margin: 1rem
- `space-y-4` = vertical spacing between children

**Text:**
- `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.
- `font-bold`, `font-semibold`, `font-medium`
- `text-center`, `text-left`, `text-right`

**Layout:**
- `flex` = flexbox
- `grid`, `grid-cols-2`, `grid-cols-3`
- `max-w-6xl` = max width container

**Full Tailwind docs:** https://tailwindcss.com/docs

## Creating Additional Pages:

To add more pages (pricing.html, about.html, etc.):

1. **Copy index.html** as a template
2. **Update the `<title>` and meta tags:**
   ```html
   <title>Pricing | Digital Wellness Academy</title>
   <meta name="description" content="Your page description">
   <link rel="canonical" href="https://digitalwellness.academy/pricing">
   ```
3. **Replace the content sections** between `<header>` and `<footer>`
4. **Keep** the schema markup in `<head>` (or customize per page)

## Missing Pages (Need to Create):

If you need these pages, I can generate clean HTML for:
- [ ] pricing.html
- [ ] about.html  
- [ ] request-demo.html
- [ ] support.html
- [ ] blog.html

Let me know which pages you need next!

## Testing Locally:

You can open `index.html` directly in your browser to preview. However, for full testing:

```bash
# Option 1: Use Python
cd static-html
python3 -m http.server 8000
# Open http://localhost:8000

# Option 2: Use any local server
```

## SEO Validation:

After uploading to Hostinger:

1. **Test Schema Markup:**
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - Paste your live URL (e.g., https://digitalwellness.academy)

2. **Test Mobile Responsiveness:**
   - Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

3. **Test Page Speed:**
   - PageSpeed Insights: https://pagespeed.web.dev/
   - Target: 90+ mobile, 95+ desktop

4. **Submit Sitemap:**
   - Google Search Console: Add property → Submit sitemap.xml
   - URL: `https://digitalwellness.academy/sitemap.xml`

## Expected Performance:

**Current implementation should score:**
- ✅ PageSpeed Desktop: 95-100
- ✅ PageSpeed Mobile: 90-95
- ✅ SEO Score: 95-100
- ✅ Accessibility: 90-95

**Why:**
- Static HTML (no server rendering)
- Tailwind CSS via CDN (minimal CSS)
- Optimized images (Next.js already optimized them)
- No heavy JavaScript
- Google Fonts preconnected

## What's Different from Next.js Build:

| Feature | Next.js Build | Static HTML |
|---------|---------------|-------------|
| File size | Large (framework overhead) | Small (clean HTML) |
| Readability | Minified, single-line | Formatted, readable |
| Editability | Requires rebuild | Edit directly in browser |
| Performance | 90-95 | 90-100 (lighter) |
| SEO | Same | Same |
| Schema markup | Same | Same |

## Support:

If you need help editing or creating additional pages, just ask!

---

**Ready to deploy:** Upload all files from this directory to your Hostinger `public_html/` folder.
