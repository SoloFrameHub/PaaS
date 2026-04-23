# Course 36: Customer Onboarding — Research Package

**Track:** Customer Success (Track 6)
**Duration:** 10 lessons | ~8 hours total
**Budget Constraint:** <$200/month tool budget
**Time Constraint:** 5-7 hours/week on CS activities (total across Courses 36-39)
**Primary Output Artifacts:** Journey Map, First-Value Checklist, Onboarding Email Flows
**Core Interactions:** AI health-score design lab, stalled onboarding detector, journey mapping wizard

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Build milestone-based onboarding paths for SaaS and service businesses | Lessons 1, 2, 3, 10 | Journey Map |
| Design welcome sequences that cut first-month churn (from ~38% to ~10%) | Lessons 4, 5 | Onboarding Email Flows |
| Structure onboarding calls for tiny customer counts (<50 customers) | Lesson 6 | First-Value Checklist |
| Create in-app checklists and email sequences tied to activation milestones | Lessons 4, 5, 7 | First-Value Checklist |
| Automate onboarding workflows using Zapier/Make/n8n without a CS team | Lesson 8 | Automation Recipes |
| Integrate CS into a 5-7 hour/week rhythm without burnout | Lessons 9, 10 | Weekly CS Rhythm |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + diagrams explaining the core concept
2. **Guided Build Session** — Artifact creation with AI suggestions + onboarding linters
3. **Simulation/Roleplay** — Stalled onboarding scenarios (Lessons 5, 6, 7)
4. **Implementation Sprint** — Course culminates in a 14-day onboarding system build (Lesson 10)

---

## LESSON 1: Why Onboarding Is Where Churn Happens (45 min)

### Key Topics

1. **The First 90 Days Window** — 40-60% of all churn happens in the first 90 days; onboarding is churn prevention, not just a nice-to-have
2. **The "Aha Moment" Race** — The faster a customer reaches their first meaningful outcome, the lower the churn risk; most SaaS products have a 7-14 day window before engagement drops permanently
3. **Onboarding vs Setup** — Setup is technical configuration; onboarding is the full journey from purchase to first meaningful value. Most solo founders only do setup.
4. **The Solo Founder Onboarding Challenge** — No dedicated CS team, limited hours, need to balance onboarding with acquisition and product work
5. **Time-to-First-Value (TTFV)** — The single most important onboarding metric; measure it, then systematically reduce it
6. **The Onboarding Economics** — Every $1 invested in onboarding saves $5-10 in churn recovery and reacquisition cost

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| 40-60% of SaaS churn happens in the first 90 days | Totango / Gainsight / ProfitWell | The onboarding period is the highest-risk window |
| 55% of customers return a product if they don't understand how to use it | WalkMe | Applies to SaaS: confusion = cancellation |
| Companies with structured onboarding improve customer retention by 16% | Wyzowl | Structure beats ad hoc every time |
| TTFV under 24 hours correlates with 75%+ 90-day retention | Product-led growth benchmarks | Speed to first value is the #1 predictor |
| 86% of customers say they'd be more loyal to a company that invests in onboarding content | Wyzowl State of Customer Onboarding | Customers notice when you care about their success |
| Acquiring a new customer costs 5-25x more than retaining an existing one | Harvard Business Review / Bain | The economic case for onboarding investment |
| Welcome emails get 4x more opens and 5x more clicks than standard marketing emails | Invesp / Experian | The highest-engagement window in the customer lifecycle |

### Frameworks & Models

- **The Onboarding Maturity Model**: Level 1 (None — "thanks for signing up" email only), Level 2 (Setup — technical getting-started guide), Level 3 (Milestone — guided journey to first value), Level 4 (Adaptive — AI-driven personalized path). Solo founders should target Level 3.
- **The 90-Day Risk Curve**: Day 1-7 = highest risk (confusion, buyer's remorse). Day 8-30 = habit formation window. Day 31-60 = value realization. Day 61-90 = commitment decision. Interventions should cluster in Day 1-7 and Day 45-60.
- **TTFV Formula**: Time-to-First-Value = Time from purchase to first meaningful outcome. Target: SaaS < 24 hours, Services < 7 days, Courses < 48 hours.

### Artifact Component

**Onboarding Risk Assessment** — Audit of current onboarding process mapped to the Maturity Model with gap identification and TTFV baseline measurement.

### Interactive Element

**Concept Capsule Quiz:** Classify onboarding vs setup activities; identify highest-risk churn windows; calculate TTFV for sample businesses.

**Guided Build:** AI wizard asks about business type, current onboarding process, and TTFV. Generates a maturity assessment with specific gaps to address in subsequent lessons.

---

## LESSON 2: Product-Led SaaS: 90-Day Milestone Map (55 min)

### Key Topics

1. **The SaaS Onboarding Journey** — Sign-up → Setup → First Use → First Value → Habit → Expansion
2. **Milestone Definition** — Concrete, measurable actions that predict retention (e.g., "created first project," "invited a team member," "ran first report")
3. **The "Magic Number" Concept** — Most successful SaaS products have a retention-predicting action threshold (e.g., Slack: 2,000 messages, Dropbox: 1 file in 1 folder). Find yours.
4. **90-Day Milestone Map for SaaS** — Day 1: Account setup complete. Day 3: First core action. Day 7: First value outcome. Day 14: Second use case. Day 30: Habit established. Day 60: Feature expansion. Day 90: Renewal/commitment decision.
5. **Segmenting Onboarding by Plan Tier** — Free trial vs paid users need different onboarding intensity
6. **Self-Serve vs Guided Onboarding** — When to let users figure it out (< $50/mo products) vs when to hand-hold ($200+/mo products)

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Users who complete onboarding checklist in first 3 days have 80%+ 90-day retention | Appcues benchmark data |
| Average SaaS free trial to paid conversion: 3-5% (no card) / 50-60% (card required) | Totango / ProfitWell |
| Products with in-app onboarding see 2-3x higher feature adoption | Userpilot / Chameleon data |
| Day 1 engagement is the strongest predictor of 90-day retention | Mixpanel / Amplitude product analytics |
| SaaS products with 5+ activation milestones have 35% higher retention than those with 1-2 | Product-led growth research |

### Frameworks & Models

- **The SaaS 90-Day Milestone Map**:
  | Window | Milestone | Intervention | Risk If Missed |
  |--------|-----------|-------------|----------------|
  | Day 1 | Account setup complete | Welcome email + in-app checklist | 60% won't return if setup incomplete Day 1 |
  | Day 3 | First core action taken | Nudge email: "Did you try X?" | High churn risk |
  | Day 7 | First value outcome achieved | "Congrats on your first win" email | Critical — this is the retention cliff |
  | Day 14 | Second use case explored | Feature spotlight email | Stalling risk |
  | Day 30 | Habit established (3+ logins/week) | Usage summary + tip | Shallow engagement |
  | Day 60 | Feature expansion or seat add | Check-in email + expansion prompt | Plateauing risk |
  | Day 90 | Renewal decision | ROI summary + renewal nudge | Churn |

- **Activation Metric Discovery Process**: Look at retained customers vs churned customers. What actions did retained customers take in the first 7 days that churned customers did not? That's your activation metric.

### Tools to Reference

| Tool | Function | Pricing | Solo Fit |
|------|----------|---------|----------|
| Userpilot | In-app onboarding flows | $249/mo (Growth) | Medium — possibly too expensive for solo |
| UserGuiding | In-app checklists + tours | $89/mo (Basic) | High |
| Appcues | In-app onboarding | $249/mo (Essentials) | Medium — possibly too expensive for solo |
| Chameleon | In-app tours + tooltips | $279/mo (Startup) | Medium |
| **Simple alternative** | Custom HTML checklist + email sequence | Free-$20/mo | High — recommended starting point |

### Artifact Component

**SaaS 90-Day Milestone Map** — Personalized milestone timeline with specific actions, email triggers, and at-risk indicators for the student's SaaS product.

### Interactive Element

**Guided Build:** AI helps define 5-7 activation milestones based on the student's product, maps them to the 90-day timeline, and generates trigger logic for each milestone.

---

## LESSON 3: Services/Coaching: 90-Day Delivery Rhythm (55 min)

### Key Topics

1. **The Services Onboarding Difference** — Services/coaching onboarding is more relationship-intensive; the product IS the relationship, so onboarding IS delivery
2. **The Kickoff Call Framework** — 30-45 minute structured call covering: goals, expectations, timeline, communication preferences, first assignment
3. **90-Day Delivery Rhythm for Services** — Week 1: Kickoff + intake questionnaire. Week 2-4: First deliverable/session cycle. Month 2: Mid-point review. Month 3: Results review + renewal/upsell conversation.
4. **90-Day Delivery Rhythm for Coaching** — Week 1: Intake assessment + goal setting. Week 2-4: Weekly sessions + accountability. Month 2: Progress check + curriculum adjustment. Month 3: Celebration + next-level offer.
5. **Managing Expectations** — The #1 cause of service/coaching churn is mismatched expectations, not poor delivery; set expectations explicitly in writing during onboarding
6. **The "Working Agreement" Document** — One-page document covering: scope, communication channels, response times, meeting cadence, what success looks like, escalation process

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| 68% of service business churn stems from mismatched expectations, not poor quality | Client satisfaction surveys / RainGroup |
| Structured kickoff calls reduce first-90-day churn by 35% | Service business benchmarks |
| Coaching clients who complete an intake assessment have 2x higher completion rates | ICF coaching research |
| Clients who receive a "working agreement" document are 40% less likely to scope-creep | Professional services data |
| The optimal coaching cadence for solo founders: weekly for first month, biweekly thereafter | Coaching industry best practices |

### Frameworks & Models

- **The Kickoff Call Template (30-45 min)**:
  1. Rapport + context (5 min)
  2. Goals and desired outcomes (10 min)
  3. Communication preferences and availability (5 min)
  4. Scope and expectations review (10 min)
  5. First assignment / next step (5 min)
  6. Questions (5 min)

- **Services 90-Day Rhythm**:
  | Week | Activity | Output |
  |------|----------|--------|
  | 1 | Kickoff call + intake form | Working agreement signed |
  | 2-4 | First deliverable cycle | Initial deliverable + feedback |
  | 5-8 | Iterative delivery | 2-3 more deliverables + adjustments |
  | 9-10 | Mid-point review call | Progress assessment + course correction |
  | 11-12 | Final delivery + results review | Results documentation + renewal conversation |

### Artifact Component

**Services/Coaching 90-Day Rhythm** — Template with kickoff call script, working agreement, session cadence, and milestone check-in schedule.

### Interactive Element

**Roleplay:** AI plays a new coaching client in the kickoff call. Student practices setting expectations, defining scope, and establishing the working agreement. System flags missed elements.

---

## LESSON 4: Welcome Sequences & In-App Checklists (50 min)

### Key Topics

1. **The Welcome Sequence Architecture** — 5-7 emails over 14 days that guide new customers from purchase to first value
2. **Email 1: The Welcome Email (Day 0)** — Sent within 5 minutes of purchase. Confirms purchase, sets expectations, provides first step. This email gets 60-80% open rates.
3. **Email 2: Quick Start Guide (Day 1)** — The one thing they should do first. Link to a 3-minute video walkthrough or step-by-step checklist.
4. **Email 3: First Win Nudge (Day 3)** — "Have you tried X yet?" with a direct link to the highest-value action.
5. **In-App Checklists** — 3-5 item onboarding checklist visible on dashboard; each item links to the action. Completion drives a "celebration" moment.
6. **The "From" Line Strategy** — Onboarding emails from the founder (personal name) not the company; 20-30% higher open rates.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Welcome emails get 50-86% open rates vs 20-25% for regular emails | Invesp / Campaign Monitor |
| Welcome sequences that guide to first value cut first-month churn from ~38% to ~10% | Customer success benchmarks / Lincoln Murphy |
| In-app checklists increase feature adoption by 150-200% | Userpilot / Appcues data |
| Emails from personal names get 20-30% higher open rates than company names | HubSpot / Mailchimp A/B data |
| Users who complete an onboarding checklist are 3x more likely to become long-term customers | Product-led growth benchmarks |
| The optimal welcome sequence length: 5-7 emails over 14 days | Customer.io / Intercom data |

### Frameworks & Models

- **The 7-Email Welcome Sequence**:
  | Email | Timing | Subject | Goal |
  |-------|--------|---------|------|
  | 1 | Day 0 (immediate) | "Welcome! Here's your first step" | Confirm + first action |
  | 2 | Day 1 | "The one thing to do first" | Quick start guide |
  | 3 | Day 3 | "Did you try [core feature] yet?" | First win nudge |
  | 4 | Day 5 | "Here's what [customer name] achieved in week 1" | Social proof + motivation |
  | 5 | Day 7 | "Your first week — how's it going?" | Check-in + support offer |
  | 6 | Day 10 | "Unlock [advanced feature] — here's how" | Feature expansion |
  | 7 | Day 14 | "Your 2-week progress report" | Engagement summary + next steps |

- **In-App Checklist Design (3-5 items)**:
  - [ ] Complete your profile
  - [ ] [Core action 1: the thing that delivers first value]
  - [ ] [Core action 2: the thing that creates habit]
  - [ ] Invite a team member / share with someone
  - [ ] Explore [second use case]

### Tools to Reference

| Tool | Function | Pricing | Solo Fit |
|------|----------|---------|----------|
| Customer.io | Behavioral email sequences | $100/mo (Essentials) | High |
| Intercom | In-app messaging + email | $39/mo (Starter) | High |
| ConvertKit | Email sequences (simpler) | $29/mo | High (for creators) |
| Mailchimp | Email sequences | Free (500 contacts) / $13/mo | High |
| **Simple alternative** | Email sequences in your ESP + Notion/Google Docs checklist | $0-30/mo | High — recommended starting point |

### Artifact Component

**Onboarding Email Flow** — Complete 7-email welcome sequence with subject lines, body templates, and send timing, personalized to the student's business.

### Interactive Element

**Guided Build:** AI generates a draft 7-email welcome sequence based on the student's product. Student reviews and edits with the AI providing deliverability and engagement linting.

---

## LESSON 5: The "First Win" Email at Day 7 (45 min)

### Key Topics

1. **Why Day 7 Is Critical** — The 7-day mark is the retention cliff for most SaaS and course products; engagement either locks in or drops off permanently
2. **The First Win Celebration** — An email triggered when the customer achieves their first meaningful outcome; combines congratulation with a nudge toward the next step
3. **Behavioral Triggers vs Time-Based Triggers** — Time-based ("Day 7 email") is the fallback; behavioral ("completed first project" email) is far more effective but requires event tracking
4. **Writing the First Win Email** — Short, celebratory, forward-looking. Template: "You just [achievement]. Here's why that matters. Here's what to do next."
5. **The "Stalled Onboarding" Email** — If the customer hasn't achieved first value by Day 7, send a different email: "We noticed you haven't tried X yet. Need help?"
6. **Segmenting Onboarders** — At least 2 segments: "on track" (hit milestones) and "stalled" (missed milestones). Different interventions for each.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Customers who hit a "first win" within 7 days have 85%+ 60-day retention | Product analytics benchmarks |
| Behavioral-triggered emails get 3-5x higher engagement than time-based drips | Customer.io / Intercom data |
| 60% of new SaaS users never return after their first session if they don't hit a milestone | Mixpanel / Amplitude studies |
| Stalled onboarding detection + intervention recovers 15-25% of at-risk users | Gainsight / Totango CS data |
| Congratulatory/celebration emails have 2x the click-through rate of instructional emails | Email marketing benchmarks |

### Frameworks & Models

- **The Day 7 Decision Tree**:
  - IF customer hit first value → Send celebration + next step email
  - IF customer used product but didn't hit value → Send "one more step" nudge
  - IF customer hasn't logged in since Day 1 → Send "we miss you" + direct help offer
  - IF customer hasn't logged in at all → Send "getting started" re-engagement + consider personal outreach

- **Stalled Onboarding Detector**: Track 3 signals: (1) Login frequency, (2) Core action completion, (3) Support ticket/question. If all 3 are zero by Day 5, flag as stalled.

### Artifact Component

**First-Value Checklist** — Definition of "first value" for the student's business, behavioral triggers, and email templates for each Day 7 scenario.

### Interactive Element

**Simulation:** AI presents 5 customer onboarding scenarios with different engagement levels. Student categorizes each as "on track," "stalled," or "at risk" and selects the right intervention. System reveals outcomes.

---

## LESSON 6: Onboarding Calls for Small Customer Counts (50 min)

### Key Topics

1. **When to Do Onboarding Calls** — Under 50 active customers AND average revenue >$100/mo/customer, personal onboarding calls are feasible and high-ROI
2. **The 15-Minute Onboarding Call** — Not a 45-minute demo; a focused 15-minute check-in at Day 3-5 covering: "What's your goal? Did you hit your first milestone? What's blocking you?"
3. **Scheduling at Scale** — Batch onboarding calls into 2 blocks per week (e.g., Tuesday and Thursday 10-11am); use Calendly with availability windows
4. **The Call Template** — 3 minutes: rapport + context. 5 minutes: goal confirmation + milestone check. 5 minutes: troubleshoot blocker. 2 minutes: next step + set Day 30 check-in.
5. **When to Stop Doing Calls** — Above ~50 active customers OR when TTFV is consistently < 48 hours without calls; transition to automated + exception-based calls
6. **The "High-Touch for High-Value" Rule** — Keep calls for top-tier customers even at scale; automate for self-serve tier

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Customers who receive a personal onboarding call have 68% higher 90-day retention | CS benchmark studies |
| 15-minute calls are 90% as effective as 45-minute calls for onboarding | Efficiency studies / Gainsight |
| Batch scheduling (vs ad-hoc) reduces founder context-switching cost by 40% | Time management research |
| The sweet spot for call-based onboarding: 10-50 customers at $100+/mo | Solo founder CS data |
| Personal calls at scale past 50 customers cost >10 hours/week — unsustainable for solo founders | Time budget analysis |

### Frameworks & Models

- **The 15-Minute Onboarding Call Script**:
  - 0:00-3:00 — "Great to meet you! Tell me what made you sign up."
  - 3:00-8:00 — "Your main goal is [X]. Have you been able to [first milestone] yet?"
  - 8:00-13:00 — "What's been the biggest friction point so far?" → troubleshoot live or provide resource
  - 13:00-15:00 — "Here's what I'd recommend next: [specific action]. Let's check in at Day 30 — I'll send you a link."

- **The Onboarding Call Decision Matrix**:
  | Customer Count | ARPU | Recommendation |
  |---------------|------|----------------|
  | <10 | Any | Call every customer |
  | 10-50 | >$100/mo | Call every customer |
  | 10-50 | <$100/mo | Call top 20% by plan + automate rest |
  | 50-200 | >$200/mo | Call top 20% + automate rest |
  | 50-200 | <$200/mo | Automate all + exception-based calls |
  | 200+ | Any | Automate all + hire CS or use exception-based |

### Tools to Reference

| Tool | Function | Pricing | Solo Fit |
|------|----------|---------|----------|
| Calendly | Scheduling onboarding calls | Free (1 event type) / $10/mo | High |
| SavvyCal | Scheduling with priorities | $12/mo | High |
| Loom | Async video onboarding | Free (25 videos) / $15/mo | High |
| Zoom | Live onboarding calls | Free (40 min) / $13.33/mo | High |
| Google Meet | Live calls | Free (with Google Workspace) | High |

### Artifact Component

**Onboarding Call Script & Scheduling System** — The 15-minute call template, Calendly configuration guide, and decision matrix for when to offer calls.

### Interactive Element

**Roleplay:** AI plays a new customer on an onboarding call. Student practices the 15-minute script. System scores for: empathy, efficiency, goal identification, and next-step clarity.

---

## LESSON 7: Day 45-60 Check-In & Survey Design (50 min)

### Key Topics

1. **Why Day 45-60 Is the Second Critical Window** — Initial excitement has worn off, habits may not have formed, renewal decisions are approaching. This is where silent churn starts.
2. **The 3-Question Check-In Survey** — (1) "On a scale of 1-10, how likely are you to recommend us?" (NPS), (2) "What's the one thing you'd change?", (3) "What's the biggest result you've achieved so far?"
3. **Reading the Survey Results** — NPS 9-10: advocate candidate. NPS 7-8: satisfied but not loyal. NPS 0-6: at-risk, needs personal outreach.
4. **The Day 45 Personal Email** — A genuine, personal email from the founder: "You've been with us for 6 weeks. How's it going? Anything I can do to help?"
5. **Exit Interviews for Churned Customers** — 2-3 question form sent on cancellation: "What was the primary reason?" "What could we have done differently?" "Would you consider returning?"
6. **Turning Check-In Insights Into Action** — Weekly review of survey responses, categorizing feedback into: product issues, onboarding gaps, expectation mismatches, and natural churn

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| 68% of customers leave because they feel the company doesn't care about them | Rockefeller Corporation / CX studies |
| NPS detractors (0-6) are 5x more likely to churn within 90 days | Bain & Company |
| A simple "How's it going?" email at Day 45 reduces Month 2-3 churn by 10-15% | CS benchmark studies |
| Exit interview response rates: 15-25% (email survey), 35-50% (in-app survey) | SurveyMonkey / Typeform data |
| Companies that act on customer feedback within 48 hours have 25% higher retention | Qualtrics / CustomerGauge |

### Frameworks & Models

- **The 3-Question Check-In Survey**:
  1. "On a scale of 0-10, how likely are you to recommend [product] to a colleague?" (NPS)
  2. "What's the one thing you'd improve?" (Open text, 1 field)
  3. "What's the biggest result you've achieved so far?" (Open text, 1 field)

- **NPS Response Protocol**:
  | NPS Score | Classification | Action |
  |-----------|---------------|--------|
  | 9-10 | Promoter | Thank + ask for testimonial + referral ask |
  | 7-8 | Passive | Thank + ask what would make it a 10 |
  | 0-6 | Detractor | Personal outreach within 24 hours + problem resolution |

### Tools to Reference

| Tool | Function | Pricing | Solo Fit |
|------|----------|---------|----------|
| Typeform | Survey design | Free (10 responses/mo) / $25/mo | High |
| Tally | Free form builder | Free (unlimited) | High |
| Google Forms | Basic surveys | Free | High |
| Delighted | NPS surveys | Free (250 surveys/mo) | High |
| **Simple alternative** | Google Form + Zapier notification on low NPS | Free | High — recommended |

### Artifact Component

**Day 45-60 Check-In System** — Survey template, NPS response protocol, personal email template, and exit interview form.

### Interactive Element

**Guided Build:** AI generates a personalized 3-question survey, the Day 45 personal email, and the exit interview form. Student reviews and adjusts.

---

## LESSON 8: Automating Onboarding with Zapier/Make/n8n (50 min)

### Key Topics

1. **The 5 Core Onboarding Automations** — (1) Welcome sequence trigger, (2) Milestone detection + email, (3) Stalled user alert, (4) Day 7 first-win check, (5) Day 45 check-in trigger
2. **Zapier vs Make vs n8n for Onboarding** — Zapier: easiest, $19.99/mo for 750 tasks. Make: most flexible, $10.59/mo for 10K ops. n8n: self-hosted, free but technical.
3. **Event-Based Triggers** — Setting up webhook triggers from your product/app to fire automations when customers complete milestones
4. **The "Stalled Onboarding Detector" Automation** — If no login/activity in 5 days after signup, trigger: (1) nudge email, (2) Slack notification to founder, (3) CRM flag
5. **Building Without Code** — For non-technical founders: email sequences in your ESP + Google Sheets activity tracker + Zapier connections
6. **The 80/20 of Onboarding Automation** — Automate the repeatable (emails, reminders, flags); keep human touch for exceptions (stalled high-value customers, at-risk accounts)

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Solo founders who automate onboarding save 3-5 hours/week vs manual process | Time tracking studies |
| Automated milestone emails sent within 1 hour of the event get 60% higher engagement | Customer.io data |
| The average solo founder needs 5-7 automations to cover 80% of onboarding workflow | Zapier / Make benchmark data |
| Zapier free tier: 100 tasks/month; Make free tier: 1,000 ops/month; n8n self-hosted: unlimited | Platform pricing (2025-2026) |
| Automation setup time: 4-8 hours one-time; saves 3-5 hours/week ongoing | ROI calculation |

### Frameworks & Models

- **The 5 Core Onboarding Automations**:
  | # | Automation | Trigger | Action | Tool |
  |---|-----------|---------|--------|------|
  | 1 | Welcome sequence | New customer created | Start email sequence | ESP (ConvertKit, Customer.io) |
  | 2 | Milestone celebration | Customer completes core action | Send congratulation email | Zapier → ESP |
  | 3 | Stalled user alert | No login in 5 days | Slack notification + nudge email | Zapier → Slack + ESP |
  | 4 | Day 7 first-win check | 7 days after signup | Conditional: achieved win → congrats; no win → help offer | Zapier → ESP (branching) |
  | 5 | Day 45 check-in | 45 days after signup | Send NPS survey + personal email | Zapier → Typeform + ESP |

- **Automation Budget Guide**:
  | Stack | Monthly Cost | Complexity |
  |-------|-------------|-----------|
  | ESP only (ConvertKit/Mailchimp) | $0-29/mo | Low |
  | ESP + Zapier Starter | $29-49/mo | Medium |
  | ESP + Make Pro | $29-40/mo | Medium |
  | ESP + n8n self-hosted | $29 + VPS $5-10/mo | High (but cheapest) |

### Artifact Component

**Onboarding Automation Recipes** — Step-by-step Zapier/Make recipes for all 5 core automations with screenshots and configuration details.

### Interactive Element

**Guided Build:** AI walks the student through building their first onboarding automation (Welcome sequence trigger) step-by-step, with the student's actual tools.

---

## LESSON 9: Time Management: CS in 5-7 Hours/Week (45 min)

### Key Topics

1. **The CS Time Budget** — Solo founders have 5-7 hours/week for ALL customer success activities (onboarding, support, retention, expansion); onboarding should take 1-2 hours/week
2. **The Weekly CS Block** — Batch all CS work into 2-3 focused blocks per week instead of reactive, interrupt-driven support
3. **Triage by Impact** — Highest ROI CS activities: (1) Stalled onboarding intervention, (2) At-risk customer outreach, (3) Expansion conversations. Lowest ROI: one-off support questions that could be answered by docs.
4. **The "30-Minute Morning Scan"** — Check: new signups, stalled users, NPS responses, support tickets. Triage. Act on top 3 items only.
5. **Deflecting Low-Value Support** — Build a FAQ/knowledge base to handle 60-70% of support questions without your time; use Loom videos for common walkthroughs
6. **When to Say "Not Now"** — The hardest skill for solo founders: delaying non-urgent CS tasks to protect acquisition and product time

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Solo founders report spending 8-15 hours/week on reactive support without systems | Founder survey data |
| A knowledge base deflects 60-70% of support questions | Zendesk / Intercom benchmark |
| Batched work is 30-40% more efficient than context-switching between tasks | Cal Newport "Deep Work" / productivity research |
| The optimal CS time allocation for solo founders: 30% onboarding, 40% retention, 30% expansion | CS best practices adapted for solo context |
| Founders who time-block CS work report 25% less burnout | Founder wellbeing studies |

### Frameworks & Models

- **Weekly CS Time Budget (5-7 hours)**:
  | Block | Day | Duration | Activities |
  |-------|-----|----------|-----------|
  | CS Block 1 | Monday | 90 min | Morning scan + stalled onboarding intervention + support triage |
  | CS Block 2 | Wednesday | 90 min | Onboarding calls + check-in emails + NPS review |
  | CS Block 3 | Friday | 60-90 min | At-risk outreach + expansion conversations + weekly CS review |
  | **Total** | | **4-5 hrs** | Leaves 1-2 hours buffer for urgent items |

- **The 30-Minute Morning Scan**:
  1. New signups in last 24 hours (2 min) — any need personal welcome?
  2. Stalled users flagged by automation (5 min) — any need intervention?
  3. NPS responses (3 min) — any detractors need outreach?
  4. Support tickets (5 min) — any urgent? Rest can wait for CS block.
  5. Decide top 3 actions for today's CS block (5 min)

### Artifact Component

**Weekly CS Rhythm** — Time-blocked calendar template with specific activities, tools, and expected outputs for each block.

### Interactive Element

**KPI Simulator:** Students input current hours spent on CS activities. System analyzes efficiency and suggests reallocation based on the 30/40/30 framework, projecting time savings.

---

## LESSON 10: Your Onboarding Playbook (50 min)

### Key Topics

1. **Assembling the Complete Onboarding System** — Combining the 90-day milestone map, welcome sequence, first-value checklist, onboarding calls, check-in system, and automations into one cohesive playbook
2. **The One-Page Onboarding Summary** — A single page that any future CS hire could use to onboard customers: milestones, emails, calls, automation triggers
3. **Measuring Onboarding Success** — 5 metrics: TTFV (time-to-first-value), Day 7 activation rate, Day 30 retention rate, NPS at Day 45, first-month churn rate
4. **The 14-Day Implementation Sprint** — Step-by-step plan to build and launch the onboarding system
5. **Iterating the Onboarding** — Review onboarding metrics monthly; interview 2-3 recently onboarded customers quarterly
6. **Connecting to Retention (Course 37)** — Onboarding handoff: once a customer is "activated," they move into the retention system

### Frameworks & Models

- **The 14-Day Implementation Sprint**:
  | Day | Activity | Output |
  |-----|----------|--------|
  | 1-2 | Define milestones and TTFV | Milestone map complete |
  | 3-4 | Write welcome email sequence (7 emails) | Drafts in ESP |
  | 5 | Build in-app checklist or getting-started page | Checklist live |
  | 6-7 | Set up onboarding automations (5 core) | Automations active |
  | 8 | Create Day 45 survey and check-in email | Survey live |
  | 9-10 | Build knowledge base / FAQ (top 10 questions) | FAQ published |
  | 11 | Configure onboarding call scheduling | Calendly configured |
  | 12-13 | Test full onboarding flow end-to-end | Test complete |
  | 14 | Launch + monitor first 5 customers through new system | System live |

- **5-Metric Onboarding Dashboard**:
  1. Time-to-First-Value (target: SaaS < 24 hours, Services < 7 days)
  2. Day 7 Activation Rate (target: 70%+)
  3. Day 30 Retention Rate (target: 85%+)
  4. Day 45 NPS (target: 40+)
  5. First-Month Churn Rate (target: < 10%)

### Artifact Component

**Your Onboarding Playbook** (Primary Course Artifact) — Compiles all lesson artifacts into a complete onboarding system document: milestone map, email flows, call scripts, automation recipes, survey templates, and time management rhythm.

### Interactive Element

**Implementation Sprint Launcher:** AI generates a personalized 14-day sprint calendar based on the student's business type and current systems. Daily check-ins with AI coach. Day 7 mid-sprint review and Day 14 completion review.

---

## TOOL PRICING TIERS

### Tier 1: Free / Minimal ($0-30/mo)
Mailchimp Free (500 contacts), Google Forms (surveys), Calendly Free, Loom Free, Notion (knowledge base), Google Sheets (activity tracker)

### Tier 2: Essential ($50-100/mo)
ConvertKit ($29/mo) or Customer.io ($100/mo) + Zapier Starter ($19.99/mo) + Calendly ($10/mo)

### Tier 3: Growth ($150-250/mo)
Customer.io ($100/mo) + UserGuiding ($89/mo) + Zapier Professional ($49/mo) + Calendly ($10/mo)

### Always-Free Tools
Google Forms, Tally, Google Sheets, Loom Free, Notion Free, tawk.to (live chat), Calendly Free

---

## ALL ARTIFACTS CREATED

1. Onboarding Risk Assessment (L1)
2. SaaS 90-Day Milestone Map (L2)
3. Services/Coaching 90-Day Rhythm (L3)
4. Onboarding Email Flow (L4)
5. First-Value Checklist (L5)
6. Onboarding Call Script & Scheduling System (L6)
7. Day 45-60 Check-In System (L7)
8. Onboarding Automation Recipes (L8)
9. Weekly CS Rhythm (L9)
10. Your Onboarding Playbook (L10) — compiles all above

**Completion Badge:** "Onboarding Architect" — 200 XP
