# Digital Wellness Academy — Comprehensive Platform Specification

## Executive Summary

The Digital Wellness Academy is a custom-built, HIPAA-aware mental health education platform owned by Real Psychiatric Services. Built on Next.js 16, React 19, TypeScript, PostgreSQL with Drizzle ORM, and Redis, it is deployed on a Hostinger VPS via Dokploy with a planned migration to Google Cloud Platform. The platform's core competitive advantage is that it is fully proprietary — no per-seat platform fees, no third-party LMS constraints, and complete ownership of the product, data, and roadmap.[^1][^2]

This specification covers the complete feature set across five capability layers: the public/patient-facing product, the provider clinical layer, the group therapy system, the B2B/enterprise layer, and the underlying infrastructure. It is organized for direct implementation on the existing stack.

***

## 1. Platform Architecture Overview

### 1.1 Tech Stack (Current)

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5.7 |
| Styling | Tailwind CSS v4 + Framer Motion |
| Database | PostgreSQL via Drizzle ORM |
| Caching | Redis |
| Storage | S3/MinIO |
| Auth | Lucia Auth |
| Email | Resend |
| Deployment | Hostinger VPS + Dokploy |
| Payments | Polar (disabled during testing) |

### 1.2 Target Architecture (Post-GCP Migration)

When licensing to other psychiatric practices, each practice gets an isolated Google Cloud environment. The recommended approach is a **shared-schema multi-tenant model** using PostgreSQL Row-Level Security (RLS), which provides tenant data isolation at the database level rather than through application-layer logic. Every table that stores tenant data carries a `tenant_id` column with an RLS policy enforcing that queries only return rows matching the active session's tenant context.[^3][^4][^5][^6][^2]

```sql
-- Every tenant-scoped table
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON courses
  USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

Redis cache keys are namespaced per tenant (`tenant:{id}:*`), and S3/Cloud Storage paths are prefixed per tenant to ensure storage isolation. This architecture is cost-effective and scalable to 100+ practice tenants while each practice can independently sign a Business Associate Agreement (BAA) with Google Cloud.[^7][^2]

### 1.3 User Roles

| Role | Description |
|---|---|
| `anonymous` | Public visitor, no account required |
| `learner` | Registered public user (free or paid tier) |
| `patient` | Enrolled by a provider, access to Care Plan |
| `provider` | Licensed therapist or psychiatrist with their own portal |
| `practice_admin` | Manages a practice's provider roster and settings |
| `platform_admin` | Real Psychiatric Services team super-admin |

***

## 2. Public & Patient-Facing Product

### 2.1 Course Library

The course library is the core consumer-facing product. It houses evidence-based courses organized by clinical topic. Initial courses include OCD, Bipolar Disorder, Anger Management, and Burnout, with expansion planned across the 20-topic curriculum. Each course is structured with discrete lessons, estimated time-to-complete, and visible learning objectives.[^8]

**Course structure per lesson:**
- Lesson video (2–5 minute practitioner-recorded clip)[^9]
- Psychoeducation text module with accessible, plain-language clinical content
- Interactive activity (CBT worksheet, DBT skill practice, reflection prompt, or scenario)
- Self-assessment embedded within or at the end of the lesson
- Completion check-in with a brief "what stood out to you?" prompt

### 2.2 Self-Assessment System

Standardized clinical screening tools are embedded throughout the platform as educational instruments — not diagnostic tools. The two primary instruments are the PHQ-9 (9-item depression severity scale, scored 0–27) and the GAD-7 (7-item anxiety scale, scored 0–21), both widely used and validated across clinical settings.[^10]

**Implementation rules:**
- Users see their score with general educational interpretation of score ranges[^11]
- The platform explicitly states that scores are not diagnoses and encourages professional consultation
- PHQ-9 Item 9 (suicidal ideation) — any score ≥ 2 immediately surfaces the crisis resource module[^10]
- Scores are stored over time, giving users a longitudinal view of their own trends
- Providers (if assigned) see assessment scores in their patient dashboard

Additional assessments available as course-contextual tools: PCL-5 (PTSD), MDQ (Bipolar screening), AUDIT (alcohol use), and custom topic-specific reflection scales.[^12]

### 2.3 Interactive Learning Features

Interactive learning features substantially improve therapeutic retention compared to passive content consumption.[^13][^14]

- **Branching scenarios** — "What would you do?" situational exercises tied to CBT/DBT concepts
- **Reflection journals** — Private, encrypted written entries tied to specific lessons; users own their entries and can share with providers optionally
- **Skill-practice exercises** — Guided step-by-step walkthroughs of CBT techniques (thought records, behavioral activation logs, exposure hierarchies) and DBT skills (TIPP, DEAR MAN, distress tolerance)
- **Progress badges** — Visual acknowledgment of module and course completions
- **Completion certificates** — Auto-generated, branded PDF certificates issued on full course completion; used for personal records or to share with employers

### 2.4 User Dashboard ("My Learning")

The patient-facing dashboard surfaces all active learning, assigned content, and personal progress in one place.[^15]

- Active courses with percentage completion
- **My Care Plan tab** — visible only to patients with an assigned provider; shows provider-assigned content
- Assessment history with trend charts
- Saved reflections and journal entries
- Notification center (email + in-app via Resend integration)[^1]
- Crisis resources — permanently accessible link in sidebar regardless of page context[^12]

### 2.5 Subscription Tiers

| Tier | Price | Access |
|---|---|---|
| Free | $0 | First lesson of every course, crisis resources, select free tools |
| Standard | $39/mo | Full course library, assessments, reflection journals |
| Professional | $69/mo | Standard + provider-assigned content + group cohort access |
| Premium | $99/mo | Professional + CEU-eligible content + advanced progress reporting |

These tiers align with the five-year revenue model projecting $37.5M total revenue by Year 5.[^16]

***

## 3. Provider Portal (Clinical Layer)

This layer transforms the platform from a standalone education site into an integrated clinical support tool. Telehealth platforms with patient education integration demonstrably improve patient health literacy and support behavioral change. Provider adoption is the primary pathway to B2B revenue and clinical differentiation.[^17][^18]

### 3.1 Provider Account & Onboarding

- Providers register with license verification (state, license type: LPC, LMFT, LCSW, MD, DO, NP)[^19]
- Practice association — provider is linked to one or more `practice` entities
- Profile: specialties, modalities (CBT, DBT, EMDR, etc.), languages, accepting new patients toggle
- Onboarding tutorial: 3-step guided tour of assignment engine and patient dashboard

### 3.2 Provider Dashboard

The provider dashboard gives therapists a consolidated view of their patient panel's engagement with the platform.[^15]

**Dashboard panels:**
- **Patient Panel** — all active patients with last-activity timestamp, current course, and alert flags
- **Assignment Queue** — draft and active course/lesson assignments
- **Assessment Feed** — recent PHQ-9/GAD-7 completions from patients, with score trends
- **Alerts** — patients who have not engaged in 7+ days; patients who triggered a crisis flag
- **Group Cohorts** — active group programs the provider is facilitating
- **Analytics** — aggregate (de-identified) completion rates, average assessment scores over time

### 3.3 Assignment Engine

The assignment engine is the core workflow that connects providers to individual patients.[^18]

**How it works:**
1. Provider selects a patient from their panel
2. Provider browses the course library and selects a course, module, or individual lesson
3. Provider optionally sets a due date, adds a personal note to the patient, and marks it as required or optional
4. Assignment appears in the patient's **My Care Plan** section upon their next login
5. Patient receives an email notification via Resend with a direct link to the assigned content

**Provider visibility:**
- Real-time completion status per patient (not started / in progress / completed)
- Self-assessment responses and scores (with patient consent captured on enrollment)
- Reflection journal entries shared by the patient (opt-in, patient-controlled)
- Time spent per lesson (aggregate, not granular session logs)
- Auto-generated session prep brief: a 3–5 bullet summary of patient activity and assessment changes since last provider review

### 3.4 Session Prep Brief

Before each therapy session, the provider can generate a one-page summary of the patient's platform activity. This includes: last assessment scores vs. previous scores, lessons completed since last session, reflection prompts the patient engaged with, and any distress flags triggered. This bridges the platform's educational content directly into clinical sessions — a key differentiator over general education sites.[^18]

### 3.5 Provider Notifications & Alerts

- Email + in-app alert when a patient completes an assigned lesson
- Alert when a patient's PHQ-9 or GAD-7 score increases significantly (configurable threshold, default: +5 points)
- Crisis alert when a patient triggers the PHQ-9 Item 9 distress flag[^10]
- Inactivity nudge when a patient has not engaged with assigned content in 7 days

***

## 4. Group Therapy System

Research consistently shows that online group therapy is as effective as in-person group therapy for depression, anxiety, and PTSD, with studies reporting higher attendance rates for virtual groups compared to traditional in-person formats.[^20][^21]

### 4.1 Cohort Creation

Providers create a **cohort** — a named group program linked to a specific course or module sequence.

**Cohort settings:**
- Name (e.g., "DBT Skills Group — Spring 2026")
- Course selection (the shared curriculum the group will work through)
- Start date, session cadence (weekly, biweekly), and projected end date
- Maximum enrollment cap
- Group type: open (anyone can join via link) or closed (invite-only)
- Session format: fully online (async + live), hybrid (online course + in-person sessions), or provider-led live (platform hosts curriculum only)

### 4.2 Group Enrollment

- Providers generate a unique enrollment code or shareable link per cohort
- Patients join via code or direct link; provider approves or auto-approves enrollment
- Enrolled members see the cohort on their dashboard under **My Groups**
- Each member's progress is tracked individually but visible in aggregate to the provider

### 4.3 Shared Progress Timeline

All cohort members move through the same content on a shared schedule. The timeline view shows:
- Where the group is currently in the curriculum (e.g., "Week 3 of 8: Distress Tolerance")
- Individual completion indicators (anonymized to members, visible to provider)
- Upcoming milestone dates
- Provider-posted group announcements

### 4.4 Discussion & Community Features

Secure, HIPAA-compliant asynchronous discussion tied to specific lessons:[^22]
- Provider posts a structured discussion prompt (e.g., "Share one situation this week where you used TIPP")
- Members respond in writing; responses visible to the group or provider-only (configurable)
- Provider can reply to individual responses or post a group summary
- All content stored with tenant_id scoping and encrypted at rest[^23]

### 4.5 Facilitator Guide

Each course includes a downloadable **Facilitator Guide** — a structured PDF companion for providers running live or hybrid sessions alongside the online content. The guide includes:
- Session-by-session agenda tied to the online lesson curriculum
- Discussion question bank
- Suggested in-session activities
- Handouts mirroring the platform's digital worksheets
- Clinical tips for group facilitation of each topic

### 4.6 Live Session Integration

For providers who run live group sessions alongside the platform curriculum, the cohort page includes a **Live Session Hub**:
- Scheduled session calendar with timezone handling
- Pre-session checklist for providers and participants
- Post-session summary form (provider fills in notes; not stored as clinical record)
- Optional videoconference link field (providers embed their HIPAA-compliant video link — Doxy.me, Zoom for Healthcare, etc.)[^24][^25]

***

## 5. Safety & Crisis System

A safe mental health platform requires layered crisis detection and response that operates at all times, regardless of what content the user is engaging with.[^26][^12]

### 5.1 Always-Visible Crisis Resources

The crisis resource module is permanently accessible via a fixed sidebar element on every page. It displays:
- 988 Suicide & Crisis Lifeline (call or text)
- Crisis Text Line (text HOME to 741741)
- Local emergency services prompt
- Link to the user's assigned provider contact (if applicable)

This element cannot be hidden or collapsed by any user action.

### 5.2 Distress Detection in Assessments

The PHQ-9 Item 9 screens explicitly for suicidal ideation. Any score of 2 or higher on this item ("Several days" or more) triggers an immediate interstitial modal that:[^10]
- Acknowledges the user with non-alarming, trauma-informed language
- Displays crisis resources prominently
- Prompts the user to reach out to their provider or call 988
- Logs the event (anonymously, without PHI) for provider alert if the user has an assigned provider

The platform does not display AI-interpreted diagnoses at any time. All assessment results are presented with general educational framing and a recommendation to discuss results with a licensed professional.[^11]

### 5.3 Reflection Journal Safety Monitoring

If journal or reflection entries contain language associated with crisis risk (e.g., expressions of hopelessness, self-harm ideation), the platform surfaces a gentle check-in prompt and crisis resources. This follows the clinical safety classifier principles validated in research. The platform does not use AI to diagnose risk from text — it uses pattern-matched keyword triggers reviewed and configured by the licensed clinical team at Real Psychiatric Services.[^27]

### 5.4 Safety Planning Module

A dedicated **Safety Planning** lesson module is available to all users. Inspired by the Stanley-Brown Safety Planning Intervention (SPI), it guides users through creating a personal safety plan with:[^26]
- Personal warning signs
- Internal coping strategies
- Social contacts to reach out to
- Professional contacts (their assigned provider, crisis lines)
- Reasons for living / personal values anchor

The plan is stored in the user's account and can be shared with their assigned provider.

***

## 6. Credentialing & Certification

### 6.1 User Completion Certificates

Auto-generated branded PDF certificates are issued when a user completes a full course. Certificates include: user's display name, course title, date of completion, course hours, and Real Psychiatric Services branding. These are appropriate for employer wellness programs, personal records, or documentation of self-directed learning.

### 6.2 CEU/CPD Certification for Providers

Continuing education is a mandatory ongoing requirement for all licensed mental health professionals — LPCs, LMFTs, LCSWs, and others must complete a set number of CEUs per license renewal cycle. CEU-eligible courses on the platform open a direct B2B revenue channel where providers pay for access.[^28][^19]

**Path to CEU approval:**
1. Apply to one or more approving bodies — primary targets are **NBCC ACEP** (counselors), **ASWB ACE** (social workers), and **APA CESA** (psychologists)[^29]
2. Each course must have clearly stated learning objectives, pre/post assessments, and documented instructional hours
3. 2025–2026 approving bodies are scrutinizing learning objective alignment and course structure rigor — "close enough" no longer passes audit[^29]
4. Each approved course generates a CEU certificate with provider name, license number, course name, credit hours, and approving body reference

### 6.3 CEU Tracking Dashboard (Provider)

Providers have a dedicated **My CEUs** tab showing:
- Completed CEU-eligible courses with certificates
- Total accumulated hours by credential type
- Renewal deadline tracking (state-configurable)
- Certificate download/share

***

## 7. B2B & Practice Licensing

### 7.1 Employer Wellness Packages

Companies purchase bulk seat access for employee mental health education. This channel targets HR departments and benefits managers.[^30]

**Pricing model options:**
- **PEPM (Per Employee Per Month)** — flat monthly fee per covered employee; industry standard for predictable budgeting[^31][^32]
- **Utilization-based** — employer pays per active user per month; lower upfront cost, variable total[^30]
- **Outcomes-based** — fee tied to demonstrated engagement and assessment improvement metrics; emerging premium model[^33]

EAP research shows an estimated ROI of $2.30–$4.00 per dollar spent on employee mental health support programs. This data point is the anchor for employer sales conversations.[^34]

**Employer portal features:**
- Admin dashboard showing aggregate (de-identified) engagement rates and assessment trends
- Bulk user provisioning via CSV upload or SSO integration
- Custom branded login page with employer logo
- Usage reports for benefits team

### 7.2 Practice Licensing

Psychiatric and therapy practices license the platform to use with their own patient population. This is the highest-value revenue tier, structured as a $5,500 license fee plus a 60/40 revenue split.[^16]

**What each licensed practice gets:**
- Isolated tenant environment in PostgreSQL (RLS-enforced) with their own branding[^4]
- Practice admin account to manage their provider roster
- All provider portal features for their clinicians
- White-label capability: practice name and logo replace Real Psychiatric Services branding on the patient-facing UI
- BAA execution with the underlying cloud infrastructure provider (Google Cloud)[^2]
- Dedicated onboarding and training session

### 7.3 White-Label Delivery

The platform's UI is configurable per tenant to display:
- Practice logo and color scheme
- Custom domain (e.g., `learn.examplepsychiatry.com` → platform served under practice's domain)
- Practice-specific contact information and crisis resource customization (local crisis lines)
- Custom course bundles — practice admins can select which courses from the library to surface to their patients

***

## 8. HIPAA Compliance & Data Architecture

### 8.1 Data Classification

| Data Type | Classification | Storage Treatment |
|---|---|---|
| User email, name | PII | Encrypted at rest (AES-256), access-controlled |
| Assessment scores | PHI if provider-linked | Encrypted, audit-logged, tenant-scoped |
| Journal/reflection entries | PHI if provider-linked | Encrypted at rest and in transit |
| Course progress | Non-PHI | Standard encrypted storage |
| Anonymous session data | Non-PII | Standard analytics |

### 8.2 Technical Safeguards

Following HIPAA Security Rule technical safeguard requirements:[^35][^23]

- **Encryption at rest:** AES-256 for all database fields containing PII/PHI; encrypted S3/Cloud Storage volumes
- **Encryption in transit:** TLS 1.2+ enforced on all API endpoints and web traffic
- **Authentication:** Multi-Factor Authentication (MFA) required for provider and practice admin accounts; recommended for all users
- **Audit logging:** Tamper-proof, timestamped logs of every read/write operation on PHI-classified records; retained per HIPAA requirement (minimum 6 years)[^23]
- **Access controls:** Role-based access enforced at both application layer and database layer (RLS policies)
- **Session management:** Short-lived JWT tokens; automatic session expiration on inactivity

### 8.3 Administrative Safeguards

- All platform administrators complete HIPAA training annually
- Documented incident response plan for potential data breaches
- Vendor BAAs executed with: Google Cloud (post-migration), Resend (email), any third-party analytics tools
- Minimum necessary access principle: providers can only access their own assigned patients' data

### 8.4 Privacy-First User Design

The platform is designed for anonymous or minimal-PII use by default:[^1]
- Public learners are never required to provide real name; display name only
- Freemium access requires only email
- No third-party ad trackers or behavioral analytics SDKs that transmit user data externally
- Cookie consent and privacy policy displayed on first visit
- Users can delete their account and all associated data at any time (GDPR/CCPA alignment)

***

## 9. Trauma-Informed UX Design Standards

All patient-facing UI must conform to trauma-informed design principles established by SAMHSA and the Trauma-Informed Design Society, which research confirms improves usability and trust for all users — not only those with trauma histories.[^36][^37][^38]

### 9.1 Core Design Principles

| Principle | Implementation |
|---|---|
| **Safety & predictability** | Consistent layouts, no unexpected pop-ups, predictable navigation, content warnings before difficult material[^36] |
| **Trust & transparency** | Plain-language privacy explanations, visible data usage policies, no dark patterns[^36] |
| **Choice & control** | Users choose notification preferences, content pacing, and sharing with provider[^36] |
| **Empowerment & agency** | Progress is framed positively; no shame-based language; users can skip content[^36] |
| **Peer support** | Group cohort features designed to foster connection, not comparison[^36] |
| **Cultural sensitivity** | Inclusive language audit on all content; representation in practitioner videos[^36] |

### 9.2 Language & Tone Standards

- No clinical jargon without plain-language explanation
- No fear-based or urgency-driven copy in course content or notifications
- Error messages use warm, non-blaming language (e.g., "Something didn't save — let's try again" not "Invalid input")
- Crisis prompts are calm, not alarming — prioritize connection over urgency
- All practitioner video introductions follow a normalizing, hopeful framing ("This is treatable. You're not alone.")

### 9.3 Accessibility Requirements

- WCAG 2.1 AA compliance minimum across all pages
- Screen reader compatibility (semantic HTML, ARIA labels where needed)
- High-contrast mode toggle available in user settings
- All videos include captions (auto-generated + human-reviewed)
- Font size adjustable via standard browser zoom (no fixed-pixel font sizes)
- Keyboard navigation complete for all interactive elements

***

## 10. Notifications & Engagement System

### 10.1 Email Infrastructure

Resend is already integrated in the stack. Email sequences are organized by trigger type:[^1]

| Trigger | Email Type | Timing |
|---|---|---|
| New user registration | Welcome + onboarding sequence | Immediate + Day 3 + Day 7 |
| Course assignment (patient) | Assignment notification with direct link | Immediate |
| Assignment not started | Gentle nudge | 3 days after assignment |
| Lesson completed | Acknowledgment + next lesson prompt | Immediate |
| Course completed | Completion certificate delivery | Immediate |
| Assessment score change | Provider alert | Immediate (provider only) |
| Inactivity | Re-engagement | 7 days, 14 days |
| Crisis flag triggered | Provider alert | Immediate (provider only) |
| CEU certificate earned | Certificate delivery | Immediate (provider) |

### 10.2 In-App Notifications

A persistent notification bell in the header surfaces: new assignments from a provider, group cohort announcements, assessment reminders, and system messages. Notifications are stored in the database with read/unread state per user.

### 10.3 Provider Communication (Non-Clinical)

Providers can send **platform messages** to patients — brief, non-clinical notes like "Great work completing the OCD module this week." These are not a clinical messaging service (no therapy conducted via the platform) and are clearly framed as educational encouragement only. All messages stored with audit log.

***

## 11. Analytics & Reporting

### 11.1 User Analytics (Platform Admin)

- Active users by day/week/month with cohort breakdowns (free vs. paid, patient vs. independent learner)
- Course completion rates by title
- Average assessment scores over time (aggregate, de-identified)
- Revenue metrics by tier and channel
- Churn analysis and re-engagement campaign performance

### 11.2 Provider Analytics

- Patient engagement summary (completions, assessment trends, last active)
- Group cohort aggregate progress
- CEU hours accumulated across provider roster (practice admin view)

### 11.3 Employer/B2B Reporting

- Monthly report auto-generated per employer account: active users, content engagement, aggregate wellness metrics (de-identified)
- Downloadable CSV or PDF for HR reporting

***

## 12. Build Priority & Phasing

### Phase 1 — Complete Core Product (Weeks 1–4)

- Activate Polar payment integration for subscription tiers[^1]
- Complete Resend email sequences (welcome, assignment, nudge, completion)
- PHQ-9 and GAD-7 self-assessment modules with scoring and trend charts
- Crisis resource module permanently visible on all pages
- Completion certificate PDF generation

### Phase 2 — Provider Portal (Weeks 5–10)

- Provider account type + license verification flow
- Patient panel dashboard
- Assignment engine (assign course/lesson to patient, track completion)
- Session prep brief generator
- Assessment alert system (provider notified of significant score changes)

### Phase 3 — Group Therapy System (Weeks 11–16)

- Cohort creation and enrollment
- Shared progress timeline UI
- Asynchronous discussion module
- Facilitator guide PDF generation per course
- Live session hub (schedule + video link integration)

### Phase 4 — B2B & Licensing (Weeks 17–24)

- Multi-tenant RLS implementation in PostgreSQL[^5][^4]
- Practice admin portal (manage providers, branding, course selection)
- Employer portal (bulk provisioning, aggregate reporting)
- White-label domain routing
- GCP migration with per-tenant environment isolation[^2]

### Phase 5 — CEU Credentialing & Growth (Weeks 25–32)

- NBCC ACEP and ASWB ACE CEU application and approval process[^29]
- CEU tracking dashboard for providers
- Outcomes-based employer reporting module
- Advanced analytics for platform admin

***

## 13. Revenue Model Reference

The five-year financial model projects the following:[^16]

| Year | Revenue | Subscribers | Notes |
|---|---|---|---|
| 1 | $1.9M | ~11,000 | D2C subscriptions + initial B2B |
| 2 | $5.8M | ~19,000 | Practice licensing ramp-up |
| 3 | $13.3M | ~29,000 | Employer EAP channel active |
| 4 | $24.2M | ~37,000 | CEU channel + white-label expansion |
| 5 | $37.5M | ~46,000 | Full multi-tenant GCP architecture |

The 60/40 revenue split with Real Psychiatric Services on licensed practice revenue, plus the $5,500 per-practice licensing fee, creates a recurring B2B revenue foundation that compounds as the provider network grows.[^16]

***

## 14. Out-of-Scope (Intentional Constraints)

To maintain platform safety, legal clarity, and operational focus, the following are explicitly out of scope:

- **Teletherapy/video therapy sessions conducted on the platform** — the platform facilitates education and coordination; actual therapy sessions use the provider's own HIPAA-compliant video tools[^24]
- **AI-generated clinical diagnoses or treatment recommendations** — all AI features are limited to content routing, engagement nudges, and safety flagging; clinical interpretation is always human[^11]
- **Prescription management or e-prescribing** — out of scope for an education platform
- **Insurance billing or claims management** — practices use their existing EHR/billing systems
- **EHR integration (Phase 1–4)** — potential future Phase 6 feature; not in initial build scope

---

## References

1. [Platform Analysis: mental-health-education.soloframehub.com
Tech Stack
LayerTechnology
Framework
Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5.7
Styling
Tailwind CSS v4 + Framer Motion animations
Database
PostgreSQL via Drizzle ORM (ty...

...istic positioning: Competitor to Brightside, Headspace for Work, or Calm — but with significantly more structured educational content and a lower price point. The clinical methodology and AI guardrails are a genuine differentiator worth leading with.](https://www.perplexity.ai/search/21f1812f-12b4-447b-8ded-d7b45d39e6a5) - Here's the full go-to-market and commercialization report — it covers everything from immediate reve...

2. [here's an updated analysis of where the platform stands right not.  The payments and commercialization are intentionally omited during testing:
Platform Analysis: mental-health-education.soloframehub.com
Tech Stack
LayerTechnology
Framework
Next.js 1...

...hostinger vps with dokploy, my thought is to move it to google cloud when licensing to other psych practices where additional therapeutic features including integrated practice models, with hipaa compliance as each practice can sign a baa with google](https://www.perplexity.ai/search/df7530aa-b1f0-4051-aa70-2b1b9bcfb0ae) - Answer skipped.

3. [How to Design Shared Infrastructure Multi-Tenancy with ...](https://oneuptime.com/blog/post/2026-02-17-how-to-design-shared-infrastructure-multi-tenancy-with-tenant-isolation-on-gcp/view) - The database is where tenant isolation matters most. There are three common approaches, and I will c...

4. [Multi-Tenant PostgreSQL: RLS for Strict Data Isolation (B2B SaaS)](https://www.wellally.tech/blog/postgres-multi-tenant-database-row-level-security) - Row-Level Security Moves Protection to the Database: RLS policies enforce data isolation at the data...

5. [How to Secure Multi-Tenant Data with Row-Level ... - OneUptime](https://oneuptime.com/blog/post/2026-01-25-row-level-security-postgresql/view) - Learn how to implement row-level security (RLS) in PostgreSQL to isolate tenant data in multi-tenant...

6. [How to Implement PostgreSQL Row Level Security for Multi-Tenant ...](https://www.techbuddies.io/2026/01/01/how-to-implement-postgresql-row-level-security-for-multi-tenant-saas/) - Introduction: Why Row Level Security Matters for Multi-Tenant SaaS When I build a multi-tenant SaaS,...

7. [Data Isolation in Multi-Tenant Software as a Service (SaaS)](https://redis.io/blog/data-isolation-multi-tenant-saas/) - Learn how to implement data isolation in multi-tenant SaaS environments. Explore database-per-tenant...

8. [I have this platform near completion and would like to refacture a copy of it to the modern mental health education platform. what are your thoughts, and what are the top 20 courses to start with](https://www.perplexity.ai/search/b5e5fac0-4e45-41ef-a422-7fbfb03dffd0) - Your SoloFrameHub platform is EXCELLENT for refactoring into a modern mental health education platfo...

9. [I want to create a digital hub for realpsychiatricservices.com focusing on physical and mental wellbeing. The main platform will be LearnWorld and primarily multimedia course based, offering ebook, lessons, 2-5 minute videos with practitioners, self ...

...the practice and to digital plaform and for paid content. This would be offered to patients at a discount, and the publi  without boundries. Evaluate this idea and make recommendations for creating the platfrom from a content and marketing standpoint](https://www.perplexity.ai/search/2d9ae4da-8078-42e9-9e73-338cc1c6f074) - The digital health market is experiencing unprecedented growth, with the U.S. telemedicine market ex...

10. [Patient Health Questionnaire and General Anxiety Disorder ...](https://pabau.com/templates/patient-health-questionnaire-and-general-anxiety-disorder-phq-9-and-gad7-template/) - Download a free PHQ-9 and GAD-7 template for depression and anxiety screening. Includes scoring inst...

11. [How We Build Safe AI for a Mental Health App: Ya Tut Case Study](https://keytotech.com/blog/build-safe-ai-assistant-in-mental-health-app) - Clinical Integration: Where AI ends and humans begin. Ya Tut includes validated clinical screening t...

12. [21+ Mental Health App Features for 2026](https://www.tactionsoft.com/blog/mental-health-app-features/) - Expert insights on AI tools, RPM monitoring, EHR integration, and crisis management ... Validated as...

13. [The Fundamentals of CBT: An Interactive Online Course (MGH ...](https://lms.mghcme.org/FundamentalsResident) - This interactive online course provides an orientation and overview of cognitive-behavioral therapy ...

14. [CBT Training for Professionals - Beck Institute](https://beckinstitute.org/training/training-for-professionals/) - This interactive, on-demand, multimedia course teaches evidence-based cognitive and behavioral strat...

15. [9 Must-Have Features in a Telehealth Platform](https://blog.medicai.io/en/9-must-have-features-in-a-telehealth-platform/) - 1. User-Friendly Patient Dashboard · Access to their case files · EHRs · Prescription information · ...

16. [I just uploaded several docs to the space files and I want to create a succession doc similar to the soloframehub example but for the mental health platform so it requires research, and financial projections. I was paid a $5500 license fee by realpsy...

...free month for them, friends and family, I have an email campaign strategery that can generate 5k plus small busiess leads per month, and a newsletter campaign strategy as well as the rich seo aeo we can generate on course pages and free lesson pages](https://www.perplexity.ai/search/1d6ff4ed-f95a-41a1-bce7-90f3f87e9d38) - Perfect! I've created a comprehensive 108-page succession planning document for the Real Psychiatric...

17. [The Design Blueprint for a Large-Scale Telehealth Platform](https://pmc.ncbi.nlm.nih.gov/articles/PMC8754604/) - de R Poonsuph · 2022 · Citado por 36 — This design blueprint covers the digital healthcare ecosystem...

18. [The Ultimate Guide to Patient Education with Telehealth & ...](https://www.healthrecoverysolutions.com/the-ultimate-guide-to-patient-education-with-telehealth-and-rpm) - Read this guide to get a better understanding of how telehealth and remote patient monitoring (RPM) ...

19. [A Comprehensive Guide to Free CEUs for Mental Health ...](https://www.blueprint.ai/blog/a-comprehensive-guide-to-free-ceus-for-mental-health-counselors-professional-growth) - Discover top resources for free CEUs to enhance your professional growth as a mental health counselo...

20. [Building a Virtual Group Therapy Platform: A Step-by-Step Guide](https://www.syscreations.ca/blog/virtual-group-therapy-platform/) - Build a secure & user-friendly virtual group therapy platform with this step-by-step guide covering ...

21. [Online Group Psychotherapy: A Systematic Review - PMC - NIH](https://pmc.ncbi.nlm.nih.gov/articles/PMC11579155/) - de K Andrews · 2024 · Citado por 25 — A systematic review was conducted to collate what is currently...

22. [Getting Started with Group Therapy Online: Tools & Tips - Alehra](https://alehra.com/getting-started-with-group-therapy-online-tools-tips/) - Manage scheduling smartly — Use built-in tools to automate invites and reminders. Engage participant...

23. [HIPAA Compliance Checklist for Saas Apps | USA Guide](https://www.hakunamatatatech.com/our-resources/blog/compliance-and-regulatory-considerations-for-healthcare-mobile-apps) - Key requirements include secure data storage and transmission (encryption), user authentication, aud...

24. [HIPAA Compliant Telehealth Softwares | Behavioral Health ...](https://www.bhcoe.org/2020/03/hipaa-compliant-telehealth-softwares/) - In response to COVID-19, BHCOE has compiled a list of HIPAA-compliant telehealth tools to support be...

25. [Therapy Group Practice Website Development](https://mentalhealthitsolutions.com/blog/therapy-group-practice-website-development/) - Struggling with a confusing, outdated group practice website? Discover how to build a secure, scalab...

26. [Automated Safety Plan Scoring in Outpatient Mental Health ...](https://mental.jmir.org/2026/1/e79010) - de HK Donnelly · 2026 — The Safety Planning Intervention (SPI) produces a plan to help manage patien...

27. [MindGuard: Open-source mental health AI safety](https://swordhealth.com/newsroom/introducing-mindguard) - MindGuard: Sword's open-source safety framework that helps AI distinguish therapeutic disclosure fro...

28. [Online Learning For Mental Health Professionals To Earn ...](https://elearningindustry.com/the-future-of-online-learning-for-mental-health-professionals-accessing-continuing-education-units-ceus) - Online learning has transformed continuing education for mental health professionals, providing the ...

29. [Become a CEU Provider for Mental Health in 2026](https://www.mrisser.com/how-to-become-ceu-provider-mental-health) - Learn how therapists can become approved CEU providers in 2026. Step-by-step guidance on ASWB, NBCC,...

30. [Mental Health Pricing Models for Startups and Modern ...](https://complicated.life/blog/mental-health-pricing-models-for-startups-and-modern-workplaces/) - Discover the pros and cons of the 3 most common mental health pricing models for startups and scale-...

31. [Evaluating mental health solution pricing models](https://organizations.headspace.com/blog/evaluating-mental-health-solution-pricing-models) - This blog will guide you through the process of evaluating mental health solution pricing models, fo...

32. [How Much Does EAP Cost to Employers?](https://meditopia.com/en/forwork/articles/how-much-does-eap-cost-to-employers) - Discover the EAP cost breakdown, including the cost per employee and EAP services cost. Learn about ...

33. [How an outcomes-based EAP pricing model aligns ...](https://www.springhealth.com/blog/outcomes-based-eap-pricing-model-solution-incentives) - Explore EAP pricing models and see how outcomes-based approaches align vendor incentives with employ...

34. [Understanding the Cost of Employee Assistance Programs ...](https://sonder.io/resources/blog/cost-of-employee-assistance-programs/) - While prices for EAP services vary, the estimated ROI for mental health support programs is $2.30 – ...

35. [HIPAA Compliance for SaaS](https://www.hipaajournal.com/hipaa-compliance-for-saas/) - HIPAA compliance for SaaS consists of ensuring the software product or service complies with all app...

36. [Trauma-informed design for UX content](https://uxcontent.com/a-guide-to-trauma-informed-content-design/) - Trauma-informed design is the ability for designers to ensure no user is unnecessarily put in a posi...

37. [How Trauma-Informed Design Can Improve User Experiences for All ...](https://www.thisisgain.com/post/how-trauma-informed-design-can-improve-user-experiences-for-all-audiences?from=bunnyfoot) - Trauma-informed design and research prioritises safety, empathy, and empowerment when creating exper...

38. [A scoping review of trauma-informed care principles applied in ...](https://journals.sagepub.com/doi/10.1177/20552076251360925) - The thoughtful design of digital technology using TI principles can support many fields, including h...

