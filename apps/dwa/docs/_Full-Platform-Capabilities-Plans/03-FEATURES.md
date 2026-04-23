# Features & User Flows

**Depth: [SOLID]** — All major features documented with routes and capabilities. Needs deepening: exact onboarding UI flow, settings page details, specific dashboard widget implementations.

---

## Layout Hierarchy

```
app/layout.tsx (root: Inter font, providers, error boundary, dark mode)
├── (marketing)/layout.tsx — Public: simple nav + footer with 988 crisis line
├── (auth)/ — Login/signup/reset (uses root layout)
├── (onboarding)/layout.tsx — OnboardingProvider context wrapper
├── (default)/layout.tsx — Authenticated: Sidebar + Header + FlyoutChat
│   ├── dashboard/
│   ├── academy/
│   ├── coach/
│   ├── community/
│   ├── resources/
│   ├── settings/
│   └── optimization/
├── (provider)/layout.tsx — Provider: role check + ProviderSidebar
│   ├── provider/dashboard
│   ├── provider/patients
│   ├── provider/alerts
│   ├── provider/resources
│   └── provider/profile
├── (admin)/layout.tsx — Admin: role check
│   └── admin/providers
├── (double-sidebar)/layout.tsx — Two sidebars for community profile/messaging
└── (alternative)/ — Component library, utility pages
```

---

## Landing Page (`/`)

Public marketing page with:
- **Hero:** Gradient headline, animated background blobs, stats (courses/lessons/tracks/"100% Evidence-Based"), CTAs
- **Features section:** 4 columns (Structured Courses, AI Wellness Coach, Interactive Exercises, Private & Safe)
- **Wellness tracks:** 5 color-coded track cards with course counts
- **Course catalog:** Cards with thumbnails, tier badges, track badges, metadata
- **Testimonial section**
- **FAQ:** 6 Q&A pairs (replacement for therapy? free? private? topics? crisis? duration?)
- **Final CTA:** Dark card with gradient glow
- **Footer:** Copyright + 988 crisis line

---

## Onboarding (9-step flow)

Route: `/(onboarding)/onboarding/`

| Step | Route | What's Collected |
|------|-------|-----------------|
| 1 | `/welcome` | Introduction, orientation |
| 2 | `/about-you` | Name, display name, demographics |
| 3 | `/safety` | Crisis screening (suicidal/self-harm intent, plan, dangerous concerns) |
| 4 | `/symptoms` | Primary symptoms array with severity + duration + isPrimary flag |
| 5 | `/your-experience` | Coping strategies, therapy history, triggers, worst time of day |
| 6 | `/assessment` | GAD-7 + PHQ-9 screening (clinical scales) |
| 7 | `/in-your-words` | Free-form reflection (user's own words for AI personalization) |
| 8 | `/goals` | Wellness goals (19 options), learning style, time commitment |
| 9 | Complete | Profile finalized, course recommendations generated |

**Post-onboarding:** Adaptive course recommendations based on symptom profile + assessment scores. Profile stored as JSONB with 30+ fields.

---

## Dashboard (`/(default)/dashboard`)

- **Progress summary:** Courses completed / total, XP earned
- **Recommended courses:** Max 3, based on assessment profile
- **Wellness dimension scores** (if assessments taken)
- **Full curriculum** organized by track with course cards
- **Course cards show:** Completion status, lesson progress (X/Y), tier badges, evidence badges, clinical caveat badges, "In Progress" / "Matched for You" labels
- **Wellness alerts:** Clinical flags, reassessment prompts, inactivity notices, stagnation detection

**Sub-route:** `/dashboard/analytics` — detailed analytics with charts (mood trends, progress over time)

---

## Academy (`/(default)/academy`)

### Course Catalog (`/academy`)
- All courses across 5 therapeutic tracks + optimization school
- Filterable, shows recommended courses prominently

### Course Overview (`/academy/[courseId]`)
- Course intro: title, description, learning outcomes, evidence badge, clinical framework
- Lesson list with progress indicators
- "Start Course" / "Continue Learning" / "Review Course" CTA

### Lesson Viewer (`/academy/[courseId]/[lessonId]`)
- **Two-column layout:**
  - Left: Sticky navigation (course chapters/lessons, progress indicators)
  - Right: MDX content with embedded interactive components
- **MDX components available in lessons:** (36 total)
  - Clinical: `ThoughtRecord`, `ExposureHierarchyBuilder`, `ExposureLog`, `ExposurePlanWorksheet`, `BodyMap`, `GuidedGrounding`
  - Assessment: `LessonQuiz`, `LikertAssessment`, `TrackingLog`, `Checklist`, `Checkin`
  - Engagement: `InteractiveBreathingExercise`, `MindfulnessTimer`, `CopingStrategyRanker`
  - Learning: `InteractiveScenario` + `Choice`, `ScenarioCard`, `FlipCard`, `StepByStep` + `Step`
  - Diagrams: `CBTTriangleDiagram`, `BoxBreathingDiagram`, `ThoughtFlowDiagram`
  - Layout: `EnhancedAccordion` + `AccordionItem`, `SlideNavigation` + `Slide`, `Callout`, `InsightGrid` + `InsightItem`, `ToolkitCard`
  - Progress: `EngagementSummary`, `LessonFeedback`, `CompleteButton`
- **Post-lesson:** Completion button, next lesson navigation, next course suggestion (if final)

### Course Completion (`/academy/[courseId]/complete`)
- Celebration page (confetti animation via canvas-confetti)

### My Path (`/academy/my-path`)
- Personalized learning path based on profile + assessments

### Optimization School (`/(default)/optimization/[courseId]`)
- Separate route for optimization courses (Five Pillars)
- Same lesson rendering infrastructure

---

## AI Wellness Coach (`/(default)/coach`)

- Full-height chat interface (`CoachingChat` client component)
- Also available as flyout widget on every page (`FlyoutChat`)
- User profile serialized for context (displayName, symptoms)
- See [04-AI-ML-SYSTEMS.md](04-AI-ML-SYSTEMS.md) for full technical details

---

## Community (`/(default)/community`)

### Forum (`/community/forum`)
- Flarum integration with JSON:API normalization
- Sort by: popular, newest, top
- Filter by tags/categories
- Search functionality
- Bookmark toggle
- AI moderation pre-screens posts (risk levels 0-3)
- Topic routing: needs-provider vs. community-handles vs. informational

### Create Post (`/community/forum/post`)
- Title (5-200 chars), content (10-10k), tags (1-5)
- AI moderation on submit — blocks if riskLevel >= 2

### Discussion Thread (`/community/forum/post/[id]`)
- Original post + replies
- Like/unlike posts
- Bookmark discussion

### Other Community Pages
- `/community/feed` — Activity feed
- `/community/meetups` — Virtual/local meetup coordination
- `/community/meetups/post` — Create meetup
- `/community/users-tabs` — User directory (tab view)
- `/community/users-tiles` — User directory (tile view)

---

## Provider Portal (`/(provider)/provider`)

### Access Control
- Checks role === 'provider' or 'admin'
- Checks `verificationStatus`:
  - Not provider -> redirects to `/provider-signup`
  - Pending/manual review -> `/provider-pending`
  - Rejected -> `/provider-rejected`
  - Stale session -> `/provider-pending?reauth=1`

### Provider Dashboard (`/provider/dashboard`)
- Patient overview, alert summary, assignment status

### Patient Roster (`/provider/patients`)
- All linked patients with status (active/discharged)
- Display names are provider-assigned aliases (HIPAA)

### Patient Profile (`/provider/patients/[patientId]`)
- Mood trends (charts)
- Completed courses, current progress
- Assignment history
- Private clinical notes

### Alerts (`/provider/alerts`)
- Real-time distress events from patient activity
- 50 unresolved + 20 resolved alerts displayed
- Resolve button with timestamp
- Linked to patient, shows distress level + context

### Resources (`/provider/resources`)
- RAG-powered search over course library + clinical assessments
- Natural language queries
- Source attribution (links to originating course/lesson)

### Provider Profile (`/provider/profile`)
- Edit credentials, specialty, license info
- View verification status

### Session Prep (`GET /api/provider/session-prep/[patientId]`)
- AI-generated brief from:
  - Recent distress alerts
  - Completed courses + pending assignments
  - Latest mood/anxiety/sleep metrics
  - Provider notes
- Returns 5-8 actionable bullet points

### Provider Signup Flow
1. `/provider-signup` — registration form (name, credentials, specialty, license #, NPI)
2. NPI auto-verified via NPPES API (`/lib/services/npiService.ts`)
3. Admin reviews at `/(admin)/admin/providers`
4. Status: pending -> verified / manual_review / rejected
5. Provider redirected based on status

### Invite System
- Provider generates alphanumeric invite code
- Code has expiration
- Patient enters code to link to provider
- Usage tracked (who used, when)

---

## Settings (`/(default)/settings`)

| Route | Purpose |
|-------|---------|
| `/settings/account` | Profile info, email, password |
| `/settings/billing` | Subscription management (Polar.sh) |
| `/settings/plans` | Available plans/pricing |
| `/settings/notifications` | Alert preferences |
| `/settings/feedback` | Send platform feedback |
| `/settings/apps` | Connected integrations |

---

## Resources (`/(default)/resources`)

- `/resources` — Health resources hub
- `/resources/crisis` — 988 Crisis Line, emergency resources, safety information

---

## Daily Check-ins & Tracking

### Mood Entry
- Rating: mood, anxiety, sleep quality, energy (each 1-10)
- Contextual: triggers (array), coping techniques used (array)
- Free-form notes
- Stored in `moodEntry` table

### Sleep Tracking (CBT-I specific)
- Inputs: bed time, out-of-bed time, sleep onset latency (SOL), WASO
- **Derived metrics:**
  - Time in bed (TIB) = outOfBedTime - bedTime
  - Total sleep time (TST) = TIB - SOL - WASO
  - Sleep efficiency (%) = (TST / TIB) x 100

### Wellness Scoring
- 5 dimensions: anxietyManagement, moodStability, sleepQuality, stressResilience, nutritionAwareness
- Each dimension scored 0-100 from:
  - Assessment scores (inverted — low symptoms = high wellness)
  - Engagement scores (soft-capped at 50 points = 100)
- Composite wellness score on dashboard

### Wellness Alerts
| Alert | Trigger | Priority |
|-------|---------|----------|
| Clinical flag | PHQ-9 elevated + 7+ days inactive | 0 (never suppressed) |
| Reassess | 14+ days since assessment + 3+ lessons completed | 2 |
| Inactivity (gentle) | 5-13 days inactive | 3 |
| Inactivity (warm) | 14+ days inactive | 3 |
| Stagnation | Score plateau detected | 4 |

---

## Error Handling

Error boundaries at multiple levels:
- `/app/error.tsx` — root
- `/app/global-error.tsx` — critical (renders own `<html>`)
- `/app/(auth)/error.tsx`
- `/app/(default)/error.tsx`
- `/app/(default)/dashboard/error.tsx`
- `/app/(default)/academy/[courseId]/error.tsx`
- `/app/(default)/community/forum/post/[id]/error.tsx`
- `/app/(onboarding)/error.tsx`

Not-found: `/app/not-found.tsx` with 404 illustration (light/dark variants)
