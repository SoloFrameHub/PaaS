# Digital Wellness Academy — Site Redesign

**Date**: April 22, 2026  
**Status**: Audit complete, homepage redesigned, awaiting Phase 1 implementation

---

## Files in This Directory

### 1. **SITE_REDESIGN_AUDIT.md**
Complete strategy document with:
- Executive summary of current problems
- Key messaging shifts (before → after)
- Recommended sitemap
- Full homepage rewrite with annotated sections
- Page-by-page outlines for all core pages
- Content relocation map (what moves to SV Tech site)
- SEO strategy per page
- Navigation structure
- Implementation phases
- Risk mitigations

**Purpose**: Master reference for redesigning Digital Wellness Academy as a focused vertical product site (not platform showcase)

### 2. **index-REDESIGN.html**
Fully rewritten homepage implementing the audit recommendations:
- Product-focused hero (removed technical ML/AI detail)
- Clear audience segmentation (Clinics, Employers, Platforms)
- "What's Included" section (replaced platform architecture)
- 3-step "How It Works" (simplified from 5-step user journey)
- "Why License This" section (build vs. buy framing)
- Minimal "Powered By SV Tech" footer callout
- Updated navigation (removed Architecture, Framework, Marketing Flywheel)

**Purpose**: Drop-in replacement for current homepage at `/Volumes/ext-data/github/digitalwellness-academy-site/site/index.html`

---

## Quick Summary

**Core Issue**: Digital Wellness Academy site is caught between being a vertical product site and a platform architecture showcase. This dilutes the value proposition.

**Fix**: Reposition as "Licensable Digital Wellness Experiences for Patients, Employees & Members" — a white-label content/product solution. Move all platform/architecture content to SV Tech parent site.

**Key Changes**:
- Hero: "Deploy under your brand. Drive engagement, outcomes, revenue." (not "592 lessons, HIPAA-compliant infrastructure")
- Remove: Architecture, Framework, Marketing Flywheel pages → move to SV Tech
- Simplify: No ML jargon (DistilBERT, adaptive learning) in hero — move to trust layer
- Audience: 3 clear segments (Clinics, Employers, Platforms) with tailored landing pages

---

## Implementation Phases

### **Phase 1: Homepage Rewrite** (Priority 1)
- [ ] Replace `site/index.html` with `index-REDESIGN.html`
- [ ] Test in browser
- [ ] Verify all links work
- [ ] Update navigation across all pages

### **Phase 2: Audience Pages** (Priority 2)
- [ ] Rewrite "For Clinics & Practitioners"
- [ ] Rewrite "For Employers & Benefits"
- [ ] Create "For Platforms & Networks" (new page)
- [ ] Merge "For Universities" into "For Employers"

### **Phase 3: Product Pages** (Priority 3)
- [ ] Rewrite "Course Library"
- [ ] Rewrite "How It Works"
- [ ] Rewrite "Licensing & Pricing"
- [ ] Rewrite "Security & Privacy"
- [ ] Create "FAQ"

### **Phase 4: Content Relocation** (Priority 4)
- [ ] Move `architecture.html` to SV Tech site
- [ ] Move `framework.html` to SV Tech site
- [ ] Move `marketing-flywheel.html` to SV Tech site
- [ ] Move `for-investors.html` to SV Tech site
- [ ] Remove/merge `treatment-integration.html`, `custom-content.html`, `courses-learner.html`

---

## Success Metrics

**Pre-Launch**:
- Homepage time-on-page > 2 minutes
- Bounce rate < 40%
- Demo conversion > 3%

**Post-Launch** (3 months):
- Organic traffic +50%
- Demo conversions +30%
- Qualified leads +40%

---

## Next Steps

1. **Review** SITE_REDESIGN_AUDIT.md for full strategy
2. **Test** index-REDESIGN.html in browser
3. **Decide**: Ship Phase 1 (homepage) first, or wait for full site rewrite?
4. **Coordinate** with SV Tech site setup (for relocated platform content)
5. **Measure** engagement post-launch

---

## Related Documents

- **Source repo**: `/Volumes/ext-data/github/digitalwellness-academy-site/`
- **Production domain**: `digitalwellness.academy`
- **App domain**: `education.digitalwellness.academy`
- **Parent company site**: SV Tech Consulting Services (in development)
