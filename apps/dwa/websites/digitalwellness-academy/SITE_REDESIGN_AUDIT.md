# Digital Wellness Academy — Site Redesign Audit & Strategy

**Date**: April 22, 2026  
**Purpose**: Redesign Digital Wellness Academy as a focused vertical product site, removing platform/architecture content that belongs on the SV Tech parent company site.

---

## Executive Summary

**Current Problem**:  
The Digital Wellness Academy site is caught between being a vertical product site (licensable digital wellness courses) and a platform architecture showcase. This dilutes the product value proposition and confuses buyers.

**Core Issues**:
1. **Category confusion**: Mixed signals between "mental health education platform," "digital wellness academy," "HIPAA-compliant infrastructure," and "peak performance optimization"
2. **Audience dilution**: Trying to serve clinics, enterprises, universities, investors, and technical evaluators with equal weight
3. **Platform leakage**: Pages like "Architecture," "Framework," and "Marketing Flywheel" belong on the SV Tech parent site, not a vertical product site
4. **Clinical overweight**: Heavy HIPAA/provider/distress-classifier focus overwhelms wellness/optimization buyers (employers, platforms)
5. **Certification ghost**: Despite clarity that this is NOT a certification site, the "Academy" branding and course-heavy language create that expectation

**Recommended Fix**:  
Reposition Digital Wellness Academy as **"Licensable Digital Wellness Experiences for Patients, Employees & Members"** — a white-label content/product solution that organizations deploy under their brand to drive engagement, outcomes, and revenue.

**Three-Sentence Pitch** (what the homepage should communicate in 10 seconds):
- Digital Wellness Academy offers licensable digital wellness courses and experiences for stress, sleep, focus, burnout, and human optimization.
- Clinics use it for patient support between sessions. Employers use it as a high-engagement alternative to EAPs. Platforms use it as turnkey wellness content.
- Deploy under your brand, with subscription revenue, analytics, and enterprise-grade privacy built in.

---

## 1. Key Messaging Shifts

### Before → After

| **Before** | **After** |
|------------|-----------|
| "Mental health education platform for practices" | "Licensable digital wellness experiences for patients, employees & members" |
| "HIPAA-compliant infrastructure" (homepage hero) | "Enterprise-grade privacy & security" (trust layer, not hero) |
| "AI distress classifier, DistilBERT, 95% sensitivity" | "Real-time safety monitoring" (details → trust section or SV Tech site) |
| "Adaptive learning models trained on longitudinal patient data" | "Personalized learning paths based on goals and progress" (no ML jargon for buyers) |
| "592 lessons, 43 courses, 217 therapeutic + 375 optimization" | "Comprehensive course library for mental health support and human optimization" (specifics → Course Library page) |
| "Practice licensing with revenue share model" | "Flexible licensing: white-label, revenue-share, or SaaS subscription" |
| "Provider coordination, patient roster, crisis alerts" | "Optional provider coordination for clinical deployments" (not default framing) |
| "Architecture," "Framework," "Marketing Flywheel" pages | Move to SV Tech site → "Powered by SV Tech" footer callout |

### Tone Shifts

| **Before** | **After** |
|------------|-----------|
| Technical, ML-forward, research-heavy | Outcome-focused, reassuring, evidence-aware |
| Clinical urgency ("crisis detection," "distress classifier") | Wellness-forward with clinical backstop |
| Platform-first ("look at our infrastructure") | Product-first ("here's what you license and deploy") |
| Assume buyer knows mental health tech landscape | Educate buyer on use cases and deployment models |

---

## 2. Recommended Sitemap

### **Keep on Digital Wellness Academy Site** (Vertical Product)

**Primary Navigation**:
```
Solutions ▼
  - For Clinics & Practitioners
  - For Employers & Benefits
  - For Platforms & Networks
  - (Remove: For Universities → merge into Employers or Platforms)
  - (Remove: For Investors → move to SV Tech site)

Product ▼
  - Course Library
  - How It Works
  - Licensing & Pricing
  - Security & Privacy

Resources ▼
  - FAQ
  - Case Studies (future)
  - Documentation (future)

[Book a Demo] [Sign In]
```

**Pages to Keep** (with redesign):
- **Homepage** — product overview, audience segmentation, use cases
- **For Clinics & Practitioners** — patient support, session bridge, revenue model
- **For Employers & Benefits** — EAP alternative, employee engagement, burnout prevention
- **For Platforms & Networks** — white-label wellness layer for digital health platforms
- **Course Library** — browsable course catalog with filters (clinical, optimization, topic)
- **How It Works** — user journey, admin tools, deployment options (simplified, no ML)
- **Licensing & Pricing** — pricing tiers, deployment models, revenue share
- **Security & Privacy** — HIPAA/SOC2-ready, zero-knowledge, audit logging (trust layer)
- **FAQ** — buyer objection handling, technical basics
- **Contact / Book a Demo** — lead capture

**Pages to Remove/Relocate**:

| **Page** | **Action** | **Reason** |
|----------|-----------|------------|
| `architecture.html` | Move to SV Tech site | Platform engineering detail, not product feature |
| `framework.html` | Move to SV Tech site | Meta-narrative about platform thinking |
| `marketing-flywheel.html` | Move to SV Tech site | Strategic model, not product feature |
| `treatment-integration.html` | Merge into "For Clinics" page | Narrow clinical audience, not standalone |
| `custom-content.html` | Merge into "Licensing & Pricing" | Customization is a pricing tier, not a page |
| `for-universities.html` | Merge into "For Employers" | Same buyer (benefits/wellness director), rename "Schools & Organizations" |
| `for-investors.html` | Move to SV Tech site | Investor relations belong on parent company site |
| `courses-learner.html` | Remove (redirect to app) | Product site, not learner app |

---

## 3. Homepage Rewrite

### **Hero Section**

**Before**:
> "Give your patients and employees on-demand support for stress, sleep, burnout, and mental performance."

**After**:

```html
<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900">
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
        <div class="inline-block px-4 py-2 bg-blue-500/20 rounded-full text-blue-200 text-sm font-medium mb-6">
            Licensable Digital Wellness Experiences
        </div>
        <h1 class="h1 font-playfair-display text-white mb-6 max-w-4xl mx-auto">
            Support your patients, employees, and members with structured digital wellness courses
        </h1>
        <p class="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8">
            A comprehensive course library for stress, sleep, anxiety, burnout, focus, and human optimization. Deploy under your brand. Drive engagement, outcomes, and revenue. Enterprise-grade privacy built in.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="./contact.html" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Book a Demo →
            </a>
            <a href="./courses.html" class="inline-flex items-center bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-lg font-medium transition">
                Browse Course Library
            </a>
        </div>
        <p class="text-sm text-slate-300">
            Trusted by clinics, employers, and wellness platforms
        </p>
    </div>
</section>
```

**Key Changes**:
- Remove "592 lessons, 43 courses, 217 therapeutic + 375 optimization" → moves to Course Library page
- Remove pills showing specific conditions → too clinical for homepage hero
- Add "Deploy under your brand" → clarifies white-label model
- Soften "patients and employees" to "patients, employees, and members" → includes platforms/networks
- "Enterprise-grade privacy" instead of "HIPAA-compliant infrastructure" → less clinical

---

### **Audience Segmentation Band**

**Before**: "Built For" section with 3 cards (providers, enterprises, universities)

**After**: Expand to 3 use cases with clearer value props

```html
<!-- Who Uses This -->
<section class="bg-white py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
            <h2 class="h3 text-gray-900 mb-4">Who licenses Digital Wellness Academy</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                Organizations that want to offer structured digital wellness support without building it themselves
            </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
            
            <!-- Clinics & Practitioners -->
            <a href="./for-providers.html" class="group p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
                <h3 class="font-bold text-gray-900 mb-2">Clinics & Practitioners</h3>
                <p class="text-gray-600 mb-4">
                    Extend patient care between sessions with structured courses for anxiety, depression, sleep, and stress. Add a subscription revenue stream and reduce no-shows.
                </p>
                <span class="inline-flex items-center text-blue-600 font-medium group-hover:underline">
                    See how clinics use this →
                </span>
            </a>

            <!-- Employers & Benefits -->
            <a href="./for-enterprises.html" class="group p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <h3 class="font-bold text-gray-900 mb-2">Employers & Benefits</h3>
                <p class="text-gray-600 mb-4">
                    Give employees a high-engagement alternative to traditional EAPs. Peak-performance framing (focus, resilience, sleep) drives 10-20x higher utilization than crisis-labeled programs.
                </p>
                <span class="inline-flex items-center text-blue-600 font-medium group-hover:underline">
                    See employer use cases →
                </span>
            </a>

            <!-- Platforms & Networks -->
            <a href="./for-platforms.html" class="group p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <h3 class="font-bold text-gray-900 mb-2">Platforms & Networks</h3>
                <p class="text-gray-600 mb-4">
                    White-label a complete wellness layer for your digital health platform, provider network, or member portal. Turnkey content, user management, and analytics included.
                </p>
                <span class="inline-flex items-center text-blue-600 font-medium group-hover:underline">
                    See platform integrations →
                </span>
            </a>

        </div>
    </div>
</section>
```

**Key Changes**:
- Removed "For Universities" from homepage cards → merge with employers
- Removed "For Investors" → not a product buyer
- Added "Platforms & Networks" → critical B2B2C channel
- Simplified copy: focus on outcomes (revenue, utilization, engagement) not features (AI, HIPAA, adaptive learning)

---

### **What You Get When You License**

**New section** (replaces current "Platform Architecture" technical section):

```html
<!-- What's Included -->
<section class="bg-slate-50 py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
            <h2 class="h2 text-gray-900 mb-4">What's included when you license</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                A complete digital wellness solution. Deploy under your brand in days, not months.
            </p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
            
            <!-- Comprehensive Course Library -->
            <div class="bg-white p-8 rounded-xl shadow-sm">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Comprehensive Course Library</h3>
                <p class="text-gray-600 mb-4">
                    40+ evidence-based courses covering anxiety, depression, sleep, digital burnout, focus, resilience, and human optimization. Interactive lessons with quizzes, exercises, and tracking tools.
                </p>
                <a href="./courses.html" class="text-blue-600 font-medium hover:underline">Browse the full catalog →</a>
            </div>

            <!-- White-Label Deployment -->
            <div class="bg-white p-8 rounded-xl shadow-sm">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">White-Label Deployment</h3>
                <p class="text-gray-600 mb-4">
                    Deploy under your brand with custom colors, logo, domain, and messaging. Looks like you built it. No "powered by" branding required (though available if preferred).
                </p>
                <a href="./pricing.html" class="text-blue-600 font-medium hover:underline">See customization options →</a>
            </div>

            <!-- User Management & Analytics -->
            <div class="bg-white p-8 rounded-xl shadow-sm">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">User Management & Analytics</h3>
                <p class="text-gray-600 mb-4">
                    Admin dashboard for managing users, tracking progress, monitoring engagement, and measuring outcomes. Export reports for stakeholders or integrate with your existing analytics.
                </p>
                <a href="./how-it-works.html" class="text-blue-600 font-medium hover:underline">See admin tools →</a>
            </div>

            <!-- Enterprise Privacy & Security -->
            <div class="bg-white p-8 rounded-xl shadow-sm">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Enterprise Privacy & Security</h3>
                <p class="text-gray-600 mb-4">
                    HIPAA-ready infrastructure, SOC 2 compliance in progress, audit logging, encryption in transit and at rest. Real-time safety monitoring with optional provider alerts for clinical deployments.
                </p>
                <a href="./security.html" class="text-blue-600 font-medium hover:underline">See security details →</a>
            </div>

        </div>
    </div>
</section>
```

**Key Changes**:
- Replaced "Platform Architecture" section (technical, ML-heavy) with "What's Included" (product features)
- Moved HIPAA/security from hero to "Enterprise Privacy" card
- Emphasized white-label, not just licensing
- No mention of DistilBERT, adaptive learning, 592 lessons → cleaner product framing

---

### **How It Works** (Simplified)

**New section**:

```html
<!-- How It Works -->
<section class="bg-white py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
            <h2 class="h2 text-gray-900 mb-4">How it works</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                From licensing to deployment in 3 steps
            </p>
        </div>
        <div class="grid md:grid-cols-3 gap-12">
            
            <!-- Step 1: Choose Your Model -->
            <div class="text-center">
                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Choose Your Model</h3>
                <p class="text-gray-600">
                    Select licensing tier: white-label SaaS, revenue-share, or full customization. Configure branding, domain, and course selection.
                </p>
            </div>

            <!-- Step 2: Onboard Your Users -->
            <div class="text-center">
                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Onboard Your Users</h3>
                <p class="text-gray-600">
                    Invite patients, employees, or members. Personalized onboarding recommends courses based on their goals, symptoms, and preferences.
                </p>
            </div>

            <!-- Step 3: Track & Optimize -->
            <div class="text-center">
                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Track & Optimize</h3>
                <p class="text-gray-600">
                    Monitor engagement, completion rates, and outcomes through your admin dashboard. For clinical deployments, optional provider portal included.
                </p>
            </div>

        </div>
        <div class="text-center mt-12">
            <a href="./how-it-works.html" class="inline-flex items-center text-blue-600 font-medium hover:underline">
                See the full deployment process →
            </a>
        </div>
    </div>
</section>
```

**Key Changes**:
- Removed 5-step detailed user journey (too learner-focused, not buyer-focused)
- Removed "9-step personalized onboarding with 30+ data points" → too technical
- Removed "Dashboard with up to 5 recommended courses" → learner detail, not buyer value prop
- Simplified to 3 buyer-focused steps: license, deploy, track

---

### **Why Organizations License This**

**New section** (replaces "Practice Licensing" section):

```html
<!-- Why License This -->
<section class="bg-slate-900 text-white py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
            <h2 class="h2 text-white mb-4">Why organizations license Digital Wellness Academy</h2>
            <p class="text-xl text-slate-300 max-w-3xl mx-auto">
                Build vs. buy: building a digital wellness platform takes 12-18 months and $500K-$2M. Licensing takes days and costs a fraction.
            </p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
            
            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 class="text-xl font-bold mb-3">Deploy in days, not years</h3>
                <p class="text-slate-300">
                    No engineering required. Preconfigured courses, user management, analytics, and safety monitoring. White-label branding in 48 hours.
                </p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 class="text-xl font-bold mb-3">Subscription revenue from day one</h3>
                <p class="text-slate-300">
                    For clinics and platforms: license includes payment infrastructure. Patients/members pay $15-$30/month. You keep 60-70% depending on tier.
                </p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 class="text-xl font-bold mb-3">Content marketing engine included</h3>
                <p class="text-slate-300">
                    Every course generates blog posts, email sequences, and social snippets for patient/employee acquisition. Licensed content = owned content.
                </p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 class="text-xl font-bold mb-3">Evidence-based, trauma-informed content</h3>
                <p class="text-slate-300">
                    All courses grounded in CBT, ACT, DBT, and resilience research. Interactive exercises, not passive videos. Designed for sustained behavior change.
                </p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 class="text-xl font-bold mb-3">Enterprise-grade privacy & compliance</h3>
                <p class="text-slate-300">
                    HIPAA-ready for clinical deployments. SOC 2 Type II in progress. Zero-knowledge architecture for sensitive data. Audit logging and encryption standard.
                </p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 class="text-xl font-bold mb-3">Network effects without CAC</h3>
                <p class="text-slate-300">
                    You promote to your patients/employees/members. We provide the platform. Every licensee strengthens the product through usage data and feedback loops.
                </p>
            </div>

        </div>
    </div>
</section>
```

**Key Changes**:
- Removed "Practice Licensing" narrow framing → "Why organizations license"
- Removed technical ML language ("adaptive learning models trained on longitudinal patient data")
- Added "Content marketing engine" → atomization value prop
- Added "Deploy in days, not years" → build vs. buy
- Kept revenue share but simplified ("60-70%" not "e.g., 70/30 split")

---

### **Powered By** (Trust Layer)

**New minimal section** (replaces current technical platform showcase):

```html
<!-- Powered By -->
<section class="bg-white border-t border-gray-200 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center">
            <p class="text-sm text-gray-500 uppercase tracking-wider mb-6">Powered By</p>
            <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                <div class="text-center">
                    <a href="https://svtech.services" class="text-lg font-bold text-gray-900 hover:text-blue-600">
                        SV Tech Consulting Services
                    </a>
                    <p class="text-sm text-gray-600 mt-1">Platform Architecture & AI Infrastructure</p>
                </div>
                <div class="hidden md:block w-px h-12 bg-gray-300"></div>
                <div class="text-center">
                    <p class="text-sm text-gray-600">
                        <a href="https://svtech.services/platform" class="text-blue-600 hover:underline">Learn about our platform technology →</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Key Changes**:
- Removed deep technical architecture details from product homepage
- Simple "Powered By SV Tech" callout with link to parent site
- Moves platform narrative to parent site where it belongs

---

### **CTA Section**

**Before**: "Request Demo + Pricing"

**After**: Stronger conversion focus

```html
<!-- Final CTA -->
<section class="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="h2 text-white mb-6">Ready to offer digital wellness under your brand?</h2>
        <p class="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Book a 30-minute demo to see the platform, explore the course library, and discuss licensing options for your organization.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="./contact.html" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition">
                Book a Demo →
            </a>
            <a href="./pricing.html" class="inline-flex items-center bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-medium text-lg transition">
                See Pricing
            </a>
        </div>
        <p class="text-sm text-slate-400 mt-6">
            No credit card required. White-label demo available for qualified prospects.
        </p>
    </div>
</section>
```

**Key Changes**:
- More specific CTA ("Book a 30-minute demo to see the platform...")
- "No credit card required. White-label demo available" → trust builder
- Larger buttons, stronger conversion focus

---

## 4. Page-by-Page Outlines & Sample Copy

### **For Clinics & Practitioners**

**Hero**:
> **Extend patient care between sessions with structured digital wellness courses**
> 
> Give your patients on-demand support for anxiety, depression, sleep, and stress. Add a subscription revenue stream. Reduce no-shows. Build a content marketing engine.

**Sections**:
1. **The Problem**: 50-minute sessions once a week aren't enough. Patients need daily skills practice, but most don't follow through without structure.
2. **The Solution**: License a complete course library your patients access 24/7. Courses for anxiety, depression, sleep, stress, digital burnout. Interactive exercises, progress tracking, optional provider coordination.
3. **Revenue Model**: Patients pay $15-$30/month. You keep 60-70% depending on tier. 100 patients = $18K-$36K annual recurring revenue (at 70% share).
4. **Marketing Engine**: Every course generates blog posts, email sequences, patient education handouts. Use licensed content to attract new patients.
5. **Provider Portal** (optional): Patient roster, progress tracking, session prep summaries, crisis alerts for high-distress patients.
6. **How It Works**: Choose courses → Brand the platform → Invite patients → Track outcomes
7. **Pricing**: Start at $X/month (SaaS tier) or revenue-share model (no upfront cost)
8. **FAQ**: HIPAA compliance, BAA, patient data ownership, cancellation policy
9. **CTA**: Book a demo for clinicians

**SEO**:
- **Title**: "Digital Wellness Courses for Mental Health Practices | Patient Support Between Sessions"
- **H1**: "Extend patient care between sessions with structured digital wellness courses"
- **Target keywords**: mental health practice software, patient engagement tools, between-session support, therapy homework platform, practice revenue streams
- **Internal links**: Course Library (anxiety courses, depression courses), Security & Privacy (HIPAA), Pricing

---

### **For Employers & Benefits**

**Hero**:
> **High-engagement wellness your employees actually use**
> 
> Traditional EAPs post 2-5% utilization. Peak-performance framing (focus, sleep, resilience) drives 10-20x higher engagement. Give your workforce digital wellness that feels like growth, not crisis intervention.

**Sections**:
1. **Why EAPs Underperform**: Crisis-labeled programs have stigma. High-performers won't dial a hotline labeled "if you need help." They will engage with courses labeled "optimize focus," "build resilience," "master sleep."
2. **The Digital Wellness Academy Difference**: 
   - **Optimization School**: Focus, deep work, resilience, sleep, digital balance, purpose
   - **Clinical Backstop**: Anxiety, depression, stress courses available when employees need escalation
   - **White-label deployment**: Branded for your company, integrated with benefits portal
3. **Use Cases**:
   - Burnout prevention programs
   - Manager resilience training
   - New hire onboarding (stress management, time management)
   - Return-to-work support (chronic stress, sleep issues)
   - Benefits differentiation for talent acquisition
4. **ROI**: Reduce absenteeism, improve retention, differentiate benefits. Engagement rates 10-20x higher than traditional EAPs.
5. **Deployment Options**: 
   - **Enterprise license**: Flat fee for unlimited users
   - **Per-seat pricing**: Pay for active users
   - **Benefits integration**: SSO with your HRIS/benefits platform
6. **How It Works**: Demo → Configure → Launch → Track engagement
7. **Pricing**: Enterprise tier starts at $X/year for up to 500 employees
8. **FAQ**: Integration with existing benefits, measurement/reporting, employee privacy, manager access
9. **CTA**: Request employer demo

**SEO**:
- **Title**: "Digital Wellness Platform for Employers | High-Engagement EAP Alternative"
- **H1**: "High-engagement wellness your employees actually use"
- **Target keywords**: employee wellness platform, EAP alternative, corporate mental health, burnout prevention program, employee benefits technology
- **Internal links**: Course Library (optimization courses), How It Works, Pricing

---

### **For Platforms & Networks**

**Hero**:
> **White-label a complete wellness layer for your platform**
> 
> Digital health platforms, provider networks, and member portals: add structured digital wellness content without building it. Turnkey courses, user management, and analytics. Deploy in days.

**Sections**:
1. **The Problem**: Your platform needs wellness content, but building 40+ courses with interactive exercises, safety monitoring, and analytics takes 12-18 months and $500K-$2M.
2. **The Solution**: License Digital Wellness Academy as a white-label layer. Comprehensive course library for mental health support and human optimization. Fully branded, integrated via API or SSO.
3. **What You Get**:
   - 40+ courses (anxiety, depression, sleep, burnout, focus, resilience, optimization)
   - User management & personalized onboarding
   - Admin dashboard & analytics API
   - Real-time safety monitoring (optional provider alerts)
   - White-label branding (your colors, logo, domain)
4. **Use Cases**:
   - **Digital health platforms**: Add wellness layer to complement telehealth
   - **Provider networks**: Offer between-visit support for patients
   - **Employer platforms**: Enhance benefits portal with wellness content
   - **Health plans**: Population health management tool
5. **Integration Options**:
   - **API**: RESTful API for user provisioning, course assignment, progress tracking
   - **SSO**: Integrate with your auth system (SAML, OAuth)
   - **Webhooks**: Real-time events for engagement tracking
   - **Embeddable**: iframe or web component for seamless UX
6. **Revenue Models**:
   - **White-label SaaS**: You manage billing, pay us per user
   - **Revenue share**: We manage billing, split revenue
   - **Full licensing**: One-time fee + annual maintenance
7. **How It Works**: API demo → Integration planning → White-label configuration → Launch
8. **Pricing**: Platform tier starts at $X/year + $Y per active user
9. **FAQ**: API documentation, SLA, data residency, customization limits
10. **CTA**: Request platform demo

**SEO**:
- **Title**: "White-Label Digital Wellness Platform | API for Wellness Content"
- **H1**: "White-label a complete wellness layer for your platform"
- **Target keywords**: white-label wellness platform, digital health API, wellness content licensing, mental health platform integration
- **Internal links**: Course Library, Security & Privacy (API security), Pricing

---

### **Course Library**

**Hero**:
> **Comprehensive course library for mental health support and human optimization**
> 
> 40+ evidence-based courses covering anxiety, depression, sleep, burnout, focus, resilience, and peak performance. Interactive lessons with quizzes, exercises, and tracking tools.

**Sections**:
1. **Filters**: 
   - By Category: Clinical Support | Human Optimization
   - By Topic: Anxiety, Depression, Sleep, Stress, Focus, Resilience, Social, Purpose
   - By Length: Quick Start (5-10 lessons) | Deep Dive (15-25 lessons)
2. **Clinical Support Courses** (grid view):
   - Anxiety Fundamentals
   - Panic Disorder & Agoraphobia
   - Social Anxiety
   - Generalized Anxiety
   - Depression & Mood
   - Sleep & Insomnia
   - Digital Burnout & Screen Fatigue
   - Stress Management
   - (etc.)
3. **Human Optimization Courses** (grid view):
   - Movement for Mental Performance
   - Sleep Optimization
   - Nutrition & Energy
   - Digital Balance
   - Focus & Deep Work
   - Emotional Resilience
   - Purpose & Meaning
   - (etc.)
4. **Course Detail Pages** (linked from grid):
   - Course overview (2-3 sentences)
   - What you'll learn (5-7 bullets)
   - Interactive components included (thought records, breathing exercises, etc.)
   - Lesson count
   - Estimated time commitment
   - Evidence base (CBT, ACT, DBT, etc.)
   - Sample lesson preview
5. **CTA**: Book a demo to see full course content

**SEO**:
- **Title**: "Digital Wellness Course Library | 40+ Courses for Mental Health & Optimization"
- **H1**: "Comprehensive course library for mental health support and human optimization"
- **Target keywords**: mental health courses, anxiety course, depression course, sleep course, resilience training, focus training
- **Internal links**: For Clinics, For Employers, For Platforms, Pricing

---

### **How It Works**

**Hero**:
> **From licensing to deployment in 3 steps**
> 
> See how organizations deploy Digital Wellness Academy under their brand. No engineering required. Go live in days.

**Sections**:
1. **Step 1: Choose Your Licensing Model**
   - White-label SaaS (you manage billing)
   - Revenue-share (we manage billing, you promote)
   - Full customization (one-time fee + annual maintenance)
2. **Step 2: Configure Your Deployment**
   - Select courses for your audience
   - Customize branding (colors, logo, domain)
   - Integrate with your systems (SSO, API, webhooks)
   - Set up admin users and permissions
3. **Step 3: Onboard & Launch**
   - Invite users (patients, employees, members)
   - Personalized onboarding recommends courses based on goals
   - Users complete lessons, track progress, receive certificates
4. **Step 4: Track & Optimize** (optional section for admin tools)
   - Monitor engagement through admin dashboard
   - Export reports for stakeholders
   - Adjust course offerings based on usage data
   - Optional: Enable provider portal for clinical deployments
5. **For Clinical Deployments** (collapsible section):
   - Provider portal: patient roster, progress tracking, crisis alerts
   - Real-time safety monitoring with provider notifications
   - BAA and HIPAA compliance included
6. **Integration Options** (for platforms):
   - API documentation
   - SSO setup (SAML, OAuth)
   - Webhooks for real-time events
   - Embeddable components
7. **CTA**: Book a demo to see the admin dashboard

**SEO**:
- **Title**: "How It Works | Deploy Digital Wellness Academy in Days"
- **H1**: "From licensing to deployment in 3 steps"
- **Target keywords**: digital wellness deployment, white-label setup, license wellness platform
- **Internal links**: Pricing, Course Library, Security & Privacy

---

### **Licensing & Pricing**

**Hero**:
> **Flexible licensing for organizations of all sizes**
> 
> White-label SaaS, revenue-share, or full customization. Choose the model that fits your business.

**Sections**:
1. **Pricing Tiers**:

   **Starter** (for small clinics, coaches)
   - Up to 50 users
   - Core course library (20 courses)
   - Basic branding (logo, colors)
   - Email support
   - $X/month or 60% revenue share

   **Professional** (for group practices, small employers)
   - Up to 250 users
   - Full course library (40+ courses)
   - Custom domain
   - SSO integration
   - Priority support
   - $Y/month or 70% revenue share

   **Enterprise** (for platforms, large employers)
   - Unlimited users
   - Full course library + custom content
   - White-label (no "powered by")
   - API access + webhooks
   - Dedicated account manager
   - Custom pricing (starts at $Z/year)

2. **Revenue-Share Model** (for clinics and platforms):
   - No upfront cost
   - We manage billing infrastructure
   - You keep 60-70% of subscription revenue
   - Patients/members pay $15-$30/month
   - Example: 100 patients at $20/month × 70% = $1,400/month = $16,800/year

3. **Add-Ons**:
   - Custom content creation: $X per course
   - Provider portal (for clinical deployments): +$Y/month
   - Advanced analytics & reporting: +$Z/month
   - Dedicated onboarding & training: $W one-time

4. **FAQ**:
   - What's included in each tier?
   - Can I upgrade later?
   - What's the cancellation policy?
   - Do I own the content?
   - Can I export user data?

5. **CTA**: Book a call to discuss pricing

**SEO**:
- **Title**: "Pricing | Digital Wellness Academy Licensing & Revenue Models"
- **H1**: "Flexible licensing for organizations of all sizes"
- **Target keywords**: digital wellness pricing, license wellness platform, revenue share model
- **Internal links**: How It Works, For Clinics, For Employers, For Platforms

---

### **Security & Privacy**

**Hero**:
> **Enterprise-grade privacy and security**
> 
> HIPAA-ready infrastructure. SOC 2 Type II in progress. Zero-knowledge architecture for sensitive data.

**Sections**:
1. **Compliance & Certifications**:
   - HIPAA-ready (BAA available for clinical deployments)
   - SOC 2 Type II (in progress, expected Q3 2026)
   - GDPR-compliant data handling
   - CCPA-compliant (California residents)

2. **Data Security**:
   - Encryption in transit (TLS 1.3)
   - Encryption at rest (AES-256)
   - Zero-knowledge architecture for journal entries and assessments (text never stored, only analyzed)
   - Audit logging for all admin actions
   - Role-based access control (RBAC)

3. **Infrastructure**:
   - Hosted on Google Cloud Platform (BAA-compliant)
   - Multi-region redundancy
   - Automated backups (daily, 30-day retention)
   - 99.9% uptime SLA (Enterprise tier)

4. **Safety Monitoring**:
   - Real-time distress detection for crisis situations
   - 988 hotline integration for immediate support
   - Optional provider alerts for clinical deployments
   - Anonymized analysis (no personally identifiable text stored)

5. **Data Ownership & Portability**:
   - You own your user data
   - Export user data at any time (CSV, JSON)
   - Delete data on request (GDPR "right to be forgotten")
   - 30-day post-cancellation data retention (then permanently deleted)

6. **For Healthcare Organizations**:
   - Business Associate Agreement (BAA) available
   - HIPAA compliance checklist
   - Provider access controls
   - Patient consent management
   - Audit trail for PHI access

7. **FAQ**:
   - Where is data stored?
   - Who has access to user data?
   - How is safety monitoring implemented?
   - Can I run this on my own infrastructure?

8. **CTA**: Request security documentation (for enterprise buyers)

**SEO**:
- **Title**: "Security & Privacy | HIPAA-Ready Digital Wellness Platform"
- **H1**: "Enterprise-grade privacy and security"
- **Target keywords**: HIPAA-compliant wellness platform, SOC 2 mental health, secure patient data, healthcare data security
- **Internal links**: For Clinics (BAA), For Employers (employee privacy), Pricing (Enterprise tier)

---

### **FAQ**

**Categories**:
1. **General**:
   - What is Digital Wellness Academy?
   - Who is this for?
   - What's the difference between clinical and optimization courses?
   - Can I see a demo before committing?

2. **Licensing & Pricing**:
   - What licensing models are available?
   - How does revenue-share work?
   - Can I upgrade or downgrade later?
   - What's included in each tier?
   - Do I need a long-term contract?

3. **Deployment & Integration**:
   - How long does deployment take?
   - What technical requirements are there?
   - Do you offer SSO integration?
   - Can I integrate via API?
   - Can I embed this in my existing platform?

4. **Content & Customization**:
   - How many courses are included?
   - Can I customize the course library?
   - Can you create custom content for my organization?
   - Can I add my own content?
   - Do I get to white-label everything?

5. **Privacy & Security**:
   - Is this HIPAA-compliant?
   - Where is data stored?
   - Who owns the user data?
   - How does safety monitoring work?
   - Can I get a BAA?

6. **User Management**:
   - How do I invite users?
   - Can I assign specific courses to specific users?
   - Can users choose their own courses?
   - What analytics do I get?
   - Can I export user data?

7. **For Clinics**:
   - How does the provider portal work?
   - Do I get notified if a patient is in crisis?
   - Can I see my patients' progress?
   - How do patients pay?

8. **For Employers**:
   - How is this different from an EAP?
   - What's the typical engagement rate?
   - Can managers see employee data?
   - How do I measure ROI?

9. **For Platforms**:
   - What does the API look like?
   - Can I fully white-label this?
   - What's the SLA?
   - Can I run this on my own infrastructure?

**SEO**:
- **Title**: "FAQ | Digital Wellness Academy Licensing & Deployment"
- **H1**: "Frequently Asked Questions"
- **Target keywords**: digital wellness FAQ, licensing questions, HIPAA compliance FAQ
- **Internal links**: All core pages (Pricing, Security, How It Works, Course Library)

---

## 5. Content Relocation Map

### **Move to SV Tech Parent Site**

| **Page** | **Current Location** | **New Location** | **Reason** |
|----------|---------------------|------------------|-----------|
| `architecture.html` | Digital Wellness Academy | SV Tech → Platform | Technical architecture is platform-level detail, not product feature |
| `framework.html` | Digital Wellness Academy | SV Tech → Platform | Meta-narrative about platform thinking, not product page |
| `marketing-flywheel.html` | Digital Wellness Academy | SV Tech → Platform | Strategic model, not product feature |
| `for-investors.html` | Digital Wellness Academy | SV Tech → Investors | Investor relations belong on parent company site |
| Deep ML/AI sections | Homepage | SV Tech → Platform → AI Infrastructure | "DistilBERT," "adaptive learning models," "30+ data points" → platform tech showcase |

### **Merge/Consolidate on Digital Wellness Academy Site**

| **Page** | **Action** | **Reason** |
|----------|-----------|------------|
| `treatment-integration.html` | Merge into "For Clinics" | Narrow clinical audience, not standalone value |
| `custom-content.html` | Merge into "Licensing & Pricing" | Customization is a pricing tier, not a separate page |
| `for-universities.html` | Merge into "For Employers" as "Schools & Organizations" | Same buyer persona (benefits/wellness director) |
| `courses-learner.html` | Remove (redirect to app) | Product site, not learner-facing UI |

### **New Pages to Create on SV Tech Site**

1. **Platform Architecture** (relocated from DWA)
   - Two-school isolation (clinical vs. optimization)
   - HIPAA-compliant infrastructure (Google Cloud, BAA, audit logging)
   - DistilBERT safety classifier (50-200ms inference, 95% sensitivity)
   - Adaptive learning models (30+ data points, GPU training pipeline)
   - Provider coordination system
   - Analytics & rapid iteration moat

2. **AI Infrastructure** (relocated from DWA)
   - ML model inventory: DistilBERT distress classifier, course recommendation engine, adaptive learning models
   - Training pipeline: Metabase → data export → GPU training → model deployment
   - Safety monitoring: real-time inference, crisis detection, provider alerts
   - Future: RAG for AI coach, voice interaction, learning analytics

3. **Platform Strategy** (relocated from DWA)
   - Core → Verticals → Licensed model
   - Digital Wellness Academy as first vertical
   - SoloFrameHub as second vertical
   - Marketing flywheel: content → courses → atomization → acquisition
   - Network effects: 10 practices × 200 patients = 2,000 users without CAC

---

## 6. Recommended Navigation Structure

### **Digital Wellness Academy Site**

**Desktop Navigation**:
```
[Logo] Digital Wellness Academy

Solutions ▼
  - For Clinics & Practitioners
  - For Employers & Benefits
  - For Platforms & Networks

Product ▼
  - Course Library
  - How It Works
  - Licensing & Pricing
  - Security & Privacy

Resources ▼
  - FAQ
  - Documentation (future)
  - Case Studies (future)

[Sign In] [Book a Demo]
```

**Mobile Navigation** (hamburger menu):
```
Solutions
  - For Clinics & Practitioners
  - For Employers & Benefits
  - For Platforms & Networks

Product
  - Course Library
  - How It Works
  - Licensing & Pricing
  - Security & Privacy

Resources
  - FAQ

Sign In
Book a Demo
```

**Footer**:
```
Product                    Solutions                  Resources              Company
- Course Library          - For Clinics              - FAQ                  - About
- How It Works            - For Employers            - Documentation        - Contact
- Licensing & Pricing     - For Platforms            - Case Studies         - Careers (future)
- Security & Privacy                                                        - Powered by SV Tech →

Legal                     Connect
- Privacy Policy          - Email: [email]
- Terms of Service        - Twitter
- BAA (HIPAA)             - LinkedIn

© 2026 Digital Wellness Academy. A product of SV Tech Consulting Services LLC.
```

---

## 7. SEO Strategy — Page-by-Page

### **Homepage**

**Target Keywords** (primary):
- licensable digital wellness platform
- white-label wellness courses
- digital wellness for clinics
- employee wellness platform

**Title Tag** (60 chars):
> License Digital Wellness Courses | Digital Wellness Academy

**Meta Description** (160 chars):
> Licensable digital wellness courses for clinics, employers, and platforms. 40+ courses for anxiety, stress, sleep, focus, and resilience. Deploy under your brand.

**H1**:
> Support your patients, employees, and members with structured digital wellness courses

**Internal Linking**:
- Link to all 3 "For" pages from audience cards
- Link to Course Library from hero CTA
- Link to Pricing from "Why License" section
- Link to Security from "Enterprise Privacy" card
- Link to SV Tech site from "Powered By" footer

**Schema Markup**:
- Organization (company info)
- SoftwareApplication (product features)
- FAQPage (top 8 questions)
- WebSite (search action)

---

### **For Clinics & Practitioners**

**Target Keywords**:
- mental health practice software
- patient engagement tools
- between-session support
- therapy homework platform
- practice revenue streams

**Title Tag**:
> Digital Wellness for Mental Health Practices | Patient Support

**H1**:
> Extend patient care between sessions with structured digital wellness courses

**Internal Linking**:
- Link to Course Library (anxiety, depression, sleep courses)
- Link to Security & Privacy (HIPAA, BAA)
- Link to Pricing (revenue-share model)
- Link to How It Works (provider portal)

---

### **For Employers & Benefits**

**Target Keywords**:
- employee wellness platform
- EAP alternative
- corporate mental health
- burnout prevention program
- employee benefits technology

**Title Tag**:
> Digital Wellness for Employers | High-Engagement EAP Alternative

**H1**:
> High-engagement wellness your employees actually use

**Internal Linking**:
- Link to Course Library (optimization courses)
- Link to How It Works (benefits integration)
- Link to Pricing (enterprise tier)
- Link to Security & Privacy (employee privacy)

---

### **For Platforms & Networks**

**Target Keywords**:
- white-label wellness platform
- digital health API
- wellness content licensing
- mental health platform integration

**Title Tag**:
> White-Label Digital Wellness Platform | API for Wellness Content

**H1**:
> White-label a complete wellness layer for your platform

**Internal Linking**:
- Link to Course Library (full catalog)
- Link to Security & Privacy (API security)
- Link to Pricing (platform tier)
- Link to How It Works (API documentation)

---

### **Course Library**

**Target Keywords**:
- mental health courses
- anxiety course
- depression course
- sleep course
- resilience training
- focus training

**Title Tag**:
> Course Library | 40+ Digital Wellness Courses

**H1**:
> Comprehensive course library for mental health support and human optimization

**Internal Linking**:
- Link to For Clinics (clinical courses)
- Link to For Employers (optimization courses)
- Link to Pricing (full catalog in Professional+ tiers)
- Link to individual course detail pages (when built)

**Schema Markup**:
- ItemList (list of courses)
- Course (individual course schema on detail pages)

---

### **How It Works**

**Target Keywords**:
- digital wellness deployment
- white-label setup
- license wellness platform

**Title Tag**:
> How It Works | Deploy Digital Wellness Academy in Days

**H1**:
> From licensing to deployment in 3 steps

**Internal Linking**:
- Link to Pricing (licensing models)
- Link to Course Library (course selection)
- Link to Security & Privacy (HIPAA for clinical)
- Link to For Platforms (API integration)

---

### **Licensing & Pricing**

**Target Keywords**:
- digital wellness pricing
- license wellness platform
- revenue share model
- white-label pricing

**Title Tag**:
> Pricing | Digital Wellness Academy Licensing & Revenue Models

**H1**:
> Flexible licensing for organizations of all sizes

**Internal Linking**:
- Link to How It Works (deployment process)
- Link to For Clinics (revenue-share model)
- Link to For Employers (enterprise tier)
- Link to For Platforms (API access)
- Link to Security & Privacy (Enterprise SLA)

**Schema Markup**:
- Offer (pricing tiers)

---

### **Security & Privacy**

**Target Keywords**:
- HIPAA-compliant wellness platform
- SOC 2 mental health
- secure patient data
- healthcare data security

**Title Tag**:
> Security & Privacy | HIPAA-Ready Digital Wellness Platform

**H1**:
> Enterprise-grade privacy and security

**Internal Linking**:
- Link to For Clinics (BAA)
- Link to For Employers (employee privacy)
- Link to Pricing (Enterprise SLA)
- Link to How It Works (infrastructure)

---

### **FAQ**

**Target Keywords**:
- digital wellness FAQ
- licensing questions
- HIPAA compliance FAQ

**Title Tag**:
> FAQ | Digital Wellness Academy Licensing & Deployment

**H1**:
> Frequently Asked Questions

**Internal Linking**:
- Link to all core pages (Pricing, Security, How It Works, Course Library)
- Link to For Clinics (provider portal questions)
- Link to For Employers (EAP comparison questions)
- Link to For Platforms (API questions)

**Schema Markup**:
- FAQPage (all questions)

---

## 8. Key Risks & Mitigations

### **Risk 1: "Academy" Branding = Certification Confusion**

**Mitigation**:
- Hero copy emphasizes "licensable digital wellness experiences" (not "academy courses")
- No mention of "certification," "accreditation," or "CME/CE credits" on homepage
- FAQ addresses: "Is this a certification program?" → "No, this is a course library for patient/employee support."

### **Risk 2: Too Clinical for Wellness Buyers (Employers, Platforms)**

**Mitigation**:
- Homepage leads with "stress, sleep, anxiety, burnout, focus, resilience" (universal language)
- HIPAA/provider coordination moved to trust layer, not hero
- "For Employers" page emphasizes peak-performance framing, not clinical
- "For Platforms" page emphasizes white-label/API, not clinical

### **Risk 3: Too Generic for Clinical Buyers (Practices)**

**Mitigation**:
- "For Clinics" page front-loads provider portal, BAA, patient coordination
- Security & Privacy page showcases HIPAA compliance, safety monitoring
- Course Library clearly separates "Clinical Support" from "Optimization"

### **Risk 4: Platform Detail Dilutes Product**

**Mitigation**:
- Remove Architecture, Framework, Marketing Flywheel pages → SV Tech site
- Add minimal "Powered By SV Tech" footer callout with link
- FAQ addresses technical questions ("How does safety monitoring work?") without ML jargon

### **Risk 5: Mixed Audience = Weak Conversion**

**Mitigation**:
- Strong audience segmentation on homepage (3 cards: Clinics, Employers, Platforms)
- Dedicated landing pages for each audience with tailored copy
- Separate CTAs: "Book a Demo for Clinicians" vs. "Request Employer Demo" vs. "Request Platform Demo"

---

## 9. Next Steps

### **Phase 1: Homepage Rewrite** (Priority 1)
- [ ] Rewrite hero section (remove lesson counts, technical detail)
- [ ] Rewrite audience cards (Clinics, Employers, Platforms)
- [ ] Replace "Platform Architecture" section with "What's Included"
- [ ] Replace "Learning Journey" section with "How It Works" (3 steps)
- [ ] Replace "Practice Licensing" section with "Why License This"
- [ ] Add "Powered By SV Tech" footer callout
- [ ] Update navigation (remove Architecture, Framework, Marketing Flywheel)

### **Phase 2: Audience Pages** (Priority 2)
- [ ] Rewrite "For Clinics & Practitioners"
- [ ] Rewrite "For Employers & Benefits"
- [ ] Create "For Platforms & Networks" (new page)
- [ ] Merge "For Universities" into "For Employers"
- [ ] Remove "For Investors" (relocate to SV Tech site)

### **Phase 3: Product Pages** (Priority 3)
- [ ] Rewrite "Course Library" (add filters, browsable grid)
- [ ] Rewrite "How It Works" (simplify to 3 steps)
- [ ] Rewrite "Pricing" (clear tiers, revenue-share model)
- [ ] Rewrite "Security & Privacy" (move HIPAA to trust layer)
- [ ] Create "FAQ" (comprehensive buyer objection handling)

### **Phase 4: Content Relocation** (Priority 4)
- [ ] Move `architecture.html` to SV Tech site
- [ ] Move `framework.html` to SV Tech site
- [ ] Move `marketing-flywheel.html` to SV Tech site
- [ ] Move `for-investors.html` to SV Tech site
- [ ] Merge `treatment-integration.html` into "For Clinics"
- [ ] Merge `custom-content.html` into "Pricing"
- [ ] Remove `courses-learner.html` (redirect to app)

### **Phase 5: SV Tech Site Setup** (Priority 5)
- [ ] Create SV Tech homepage (parent company + platform narrative)
- [ ] Create "Platform Architecture" page (relocated from DWA)
- [ ] Create "AI Infrastructure" page (relocated from DWA)
- [ ] Create "Platform Strategy" page (relocated from DWA)
- [ ] Create "Investors" page (relocated from DWA)

---

## 10. Success Metrics

**Pre-Launch**:
- Homepage time-on-page > 2 minutes (deep engagement)
- Bounce rate < 40% (clear value prop)
- Demo request conversion rate > 3% (strong CTA)

**Post-Launch** (3 months):
- Organic search traffic up 50%+ (SEO improvements)
- "Book a Demo" conversions up 30%+ (clearer audience targeting)
- Qualified leads (clinics, employers, platforms) up 40%+ (better segmentation)

**Qualitative**:
- "I immediately understood what this is" (category clarity)
- "I know which page is for me" (audience segmentation)
- "I can explain this to my boss" (product simplicity)

---

## Conclusion

**The Core Issue**: Digital Wellness Academy is a vertical product site trying to do too much — serving as both a product showcase AND a platform architecture showcase. This dilutes the value proposition and confuses buyers.

**The Fix**: Reposition Digital Wellness Academy as **"Licensable Digital Wellness Experiences for Patients, Employees & Members"** — a white-label content/product solution that organizations deploy under their brand. Move all platform/architecture/strategic narrative to the SV Tech parent site.

**The Result**: A focused, conversion-optimized vertical product site that speaks clearly to three buyer personas (clinics, employers, platforms) and drives demo requests. Platform credibility comes from a minimal "Powered By SV Tech" callout, not 10 pages of technical detail.

**Next Move**: Start with Phase 1 (Homepage Rewrite). Ship it. Measure. Iterate.
