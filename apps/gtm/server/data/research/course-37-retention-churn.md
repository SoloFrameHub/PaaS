# Course 37: Retention & Churn Prevention — Research Package

**Track:** Customer Success (Track 6)
**Duration:** 10 lessons | ~8 hours total
**Budget Constraint:** <$200/month tool budget
**Time Constraint:** 5-7 hours/week on CS activities (shared across Courses 36-39)
**Primary Output Artifacts:** Health Scoring Matrix, Save-Playbook Scripts, Churn Post-Mortem Templates
**Core Interactions:** Minimal viable predictive model lab, save-play simulator, churn autopsy workshop

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Build a simple health score model (Usage 40% + Engagement 30% + Business 30%) | Lessons 1, 2, 10 | Health Scoring Matrix |
| Track churn prediction signals: logins, feature adoption, email engagement, payment behavior | Lesson 3 | Health Scoring Matrix |
| Benchmark against SMB SaaS norms (<3% monthly logo churn, NRR >=100%) | Lesson 4 | Churn Benchmark Dashboard |
| Wire reactivation sequences for dormant users (no login in 10 days) | Lesson 5 | Reactivation Sequence |
| Deploy feature adoption nudges that increase stickiness | Lesson 6 | Feature Adoption Playbook |
| Execute save plays: downgrades, pauses, and recovery calls | Lesson 7 | Save-Playbook Scripts |
| Maintain a weekly CS review block (2-3 hours) focused on red and high-potential accounts | Lesson 8 | Weekly CS Review Template |
| Build automation recipes that run retention without constant manual effort | Lesson 9 | Automation Recipes |
| Assemble a complete retention system in a 14-day sprint | Lesson 10 | Retention Playbook |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + diagrams explaining the core concept
2. **Guided Build Session** — Artifact creation with AI suggestions + retention linters
3. **Simulation/Roleplay** — Churn intervention scenarios (Lessons 5, 7, 8)
4. **Implementation Sprint** — Course culminates in a 14-day retention system build (Lesson 10)

---

## LESSON 1: The Economics of Retention (5-25x Cheaper Than Acquisition) (45 min)

### Key Topics

1. **The Retention Multiplier** — Acquiring a new customer costs 5-25x more than retaining an existing one; a 5% increase in retention can increase profits by 25-95%
2. **The Leaky Bucket Problem** — If you acquire 10 customers/month and churn 8, you have a growth rate of 2, not 10. Retention is the denominator of growth.
3. **Retention as a Revenue Engine** — Retained customers buy more (expansion), refer more (advocacy), and cost less (no acquisition cost). The compounding effect over 12-36 months is massive.
4. **Churn Math for Solo Founders** — At $100 ARPU and 5% monthly churn, you lose $500/month from a 100-customer base. At 3%, you lose $300. That $200/month difference compounds to $2,400/year — enough to fund your entire tool stack.
5. **The "Good Churn" Concept** — Not all churn is bad. Customers who were never a good fit, price-sensitive free-trial abusers, and customers who achieved their goal and graduated — these are natural.
6. **Retention Economics by Business Type** — SaaS: monthly/annual subscription retention. Services: contract renewal + scope expansion. Coaching: program completion + next-level enrollment.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Acquiring a new customer costs 5-25x more than retaining an existing one | Harvard Business Review / Bain & Company | The foundational retention economics stat |
| A 5% increase in customer retention increases profits by 25-95% | Bain & Company / Frederick Reichheld | The compounding effect of retention |
| 65% of a company's business comes from existing customers | Small Business Trends / Gartner | Existing customers are the majority revenue source |
| The probability of selling to an existing customer is 60-70%, vs 5-20% for a new prospect | Marketing Metrics / Invesp | Warm base converts dramatically better |
| Average SaaS monthly churn rate: 3-8% for SMB, 1-2% for enterprise | ProfitWell / Baremetrics benchmark data | SMB churn is structurally higher |
| Companies implementing behavioral prediction models report 25-40% churn reduction in 12 months | Fastenr AI CS Report / Gainsight | AI-driven prediction is powerful but even rules-based works |
| AI-based sentiment analysis + usage data improves churn prediction accuracy by ~32% | Gainsight State of AI in CS 2024 | AI improves detection speed by 45% |

### Frameworks & Models

- **The Retention Compound Calculator**: Monthly churn rate → annual retention → 3-year customer value. Example: 5% monthly churn = 46% annual retention = average customer lifetime of 20 months. 3% monthly churn = 69% annual retention = average customer lifetime of 33 months. Difference: 13 months of additional revenue per customer.
- **The Leaky Bucket Visual**: New customers flowing in the top, churned customers flowing out the bottom. The goal is to shrink the holes, not just pour more water.
- **Good Churn vs Bad Churn**: Good churn = wrong fit, graduated, or natural completion. Bad churn = product failure, support failure, onboarding failure, competitor loss. Track them separately.

### Artifact Component

**Retention Economics Dashboard** — Spreadsheet template calculating current churn rate, churn cost, retention improvement scenarios, and payback period for retention investments.

### Interactive Element

**KPI Simulator:** Students input customer count, ARPU, and churn rate. System shows: monthly revenue loss, annual impact, 3-year projection, and the impact of reducing churn by 1-2 percentage points.

---

## LESSON 2: Simple Health Score: Usage + Engagement + Business (55 min)

### Key Topics

1. **Why Health Scores Matter** — A health score turns "I think this customer might churn" into "This customer's health dropped from 85 to 62 this week — investigate." It's an early warning system.
2. **The Three-Dimension Model** — Usage (40% weight) + Engagement (30% weight) + Business (30% weight) = Composite Health Score (0-100)
3. **Usage Signals (40%)** — Login frequency, feature usage breadth, core action frequency, time in product. The strongest predictor of retention.
4. **Engagement Signals (30%)** — Email open rate, support ticket submissions (engagement, not just complaints), webinar/event attendance, community participation, NPS score.
5. **Business Signals (30%)** — Payment on time, plan tier, contract length, expansion history, referral activity.
6. **Scoring Methodology** — Each dimension scored 0-100, then weighted. Green (75-100), Yellow (50-74), Red (0-49). Focus attention on Yellow (salvageable) and Red (urgent).

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Companies with health scores detect at-risk customers 45% faster | Gainsight / Totango CS benchmarks |
| Usage-based signals are 2-3x more predictive of churn than survey-based signals | ProfitWell / Mixpanel data |
| Health scores don't need to be complex: 3-5 inputs outperform 15+ input models for SMBs | CS research / Gainsight small business data |
| Customers in "Yellow" zone have 40-60% save rate with intervention vs 10-15% save rate for "Red" | CS benchmark data |
| Solo founders with health scores spend 30% less time on CS because they focus on the right accounts | Productivity studies |

### Frameworks & Models

- **The Three-Dimension Health Score Model**:

  **Usage (40% weight):**
  | Signal | Scoring | Data Source |
  |--------|---------|-------------|
  | Login frequency (last 14 days) | 0 logins = 0, 1-3 = 25, 4-7 = 50, 8-10 = 75, 11+ = 100 | Product analytics / GA4 |
  | Core action frequency | No actions = 0, below average = 25, average = 50, above average = 75, power user = 100 | Product database |
  | Feature breadth | 1 feature = 25, 2 features = 50, 3+ features = 75, all features = 100 | Product analytics |

  **Engagement (30% weight):**
  | Signal | Scoring | Data Source |
  |--------|---------|-------------|
  | Email open rate (last 30 days) | 0% = 0, <10% = 25, 10-25% = 50, 25-50% = 75, 50%+ = 100 | ESP |
  | Support interaction | No contact ever = 50 (neutral), questions asked = 75, feedback given = 100, only complaints = 25 | Support tool |
  | NPS score | 0-4 = 0, 5-6 = 25, 7-8 = 50, 9 = 75, 10 = 100 | NPS survey |

  **Business (30% weight):**
  | Signal | Scoring | Data Source |
  |--------|---------|-------------|
  | Payment history | Failed payments = 0, late = 25, on-time = 75, annual prepaid = 100 | Billing system |
  | Plan tier | Free = 25, basic = 50, pro = 75, enterprise = 100 | Billing system |
  | Tenure | <30 days = 25, 1-3 months = 50, 3-12 months = 75, 12+ months = 100 | CRM |

- **Health Zone Actions**:
  | Zone | Score | Action | Cadence |
  |------|-------|--------|---------|
  | Green | 75-100 | Monitor + expansion opportunity | Monthly check |
  | Yellow | 50-74 | Proactive outreach + feature nudges | Weekly check |
  | Red | 0-49 | Urgent intervention: personal call + save play | Within 48 hours |

### Tools to Reference

| Tool | Function | Pricing | Solo Fit |
|------|----------|---------|----------|
| Baremetrics | MRR analytics + churn tracking | $50/mo (MRR <$10K) | High |
| ChartMogul | Revenue analytics + cohort analysis | $100/mo (MRR <$10K) | Medium |
| ProfitWell (Paddle) | Revenue analytics | Free (basic) | High |
| **Simple alternative** | Google Sheets health score tracker + Zapier data feeds | Free-$20/mo | High — recommended starting point |

### Artifact Component

**Health Scoring Matrix** — Complete spreadsheet template with the three-dimension model, scoring rubrics, zone classifications, and action triggers.

### Interactive Element

**Guided Build:** AI helps the student define their specific health signals for each dimension, set scoring thresholds based on their product, and generate a Google Sheets health score template.

---

## LESSON 3: Churn Prediction Signals You Can Actually Track (50 min)

### Key Topics

1. **Leading vs Lagging Indicators** — Churn is a lagging indicator (it already happened). Prediction requires leading indicators: declining usage, missed milestones, reduced engagement.
2. **The 7 Solo-Founder-Trackable Churn Signals** — Login frequency decline, feature usage drop, email engagement decline, support ticket spike, payment failure, NPS drop, lack of expansion
3. **Signal Decay Patterns** — Churn rarely happens overnight. The typical pattern: Weeks 1-2: usage drops 30%. Weeks 3-4: email engagement drops. Weeks 5-6: no logins. Week 7-8: cancellation.
4. **The "Silent Churner" Problem** — 70% of churned customers never complain or contact support. They just stop logging in and eventually cancel. Detection requires proactive monitoring.
5. **Data Collection Without Enterprise Tools** — You don't need Gainsight or Totango. Track logins with GA4 events, email engagement with your ESP, payments with Stripe, and NPS with a simple survey.
6. **Building Your Early Warning Dashboard** — A single Google Sheet or Notion database that aggregates the 5 most important signals, updated weekly

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| 70% of churning customers give no verbal warning — they just stop using the product | Totango / CS research |
| Usage decline is visible 2-4 weeks before cancellation in 80% of cases | Product analytics studies / Mixpanel |
| Failed payment recovery: 30-50% with automated dunning, 50-70% with dunning + personal outreach | ProfitWell / Baremetrics |
| Customers who submit support tickets are 15% LESS likely to churn than those who never contact support (engaged vs disengaged) | Zendesk / Intercom data |
| A 50% drop in login frequency over 2 weeks is the single strongest churn predictor for SMB SaaS | Product-led growth research |

### Frameworks & Models

- **The 7 Churn Signals (Solo Founder Edition)**:
  | # | Signal | Data Source | Red Threshold | Tracking Method |
  |---|--------|-------------|---------------|----------------|
  | 1 | Login frequency | GA4 / product DB | Down 50% over 2 weeks | Weekly GA4 report |
  | 2 | Core feature usage | Product analytics | Zero core actions in 7 days | Event tracking |
  | 3 | Email open rate | ESP (ConvertKit, etc.) | Dropped below 10% for 3+ emails | ESP reports |
  | 4 | Support tickets | Helpdesk / email | Complaint spike OR zero contact for 60 days | Manual tracking |
  | 5 | Payment behavior | Stripe | Failed payment not recovered in 3 days | Stripe alerts |
  | 6 | NPS score | Survey tool | Score dropped from 7+ to <6 | Quarterly survey |
  | 7 | Expansion/upgrade | Billing system | No plan change or seat add in 12+ months | CRM note |

- **Signal Decay Timeline**: Day 0: Normal usage. Day 7-14: Usage drops 30-50% (early warning). Day 14-30: Email engagement drops (mid warning). Day 30-45: No logins (critical). Day 45-60: Cancellation request.

### Artifact Component

**Churn Signal Tracker** — Template for monitoring all 7 signals with red/yellow/green thresholds, data sources, and intervention triggers.

### Interactive Element

**Simulation:** AI presents 5 customer profiles with different signal patterns. Student must identify which customers are at risk, rank them by urgency, and select the appropriate intervention. System reveals actual churn outcomes.

---

## LESSON 4: SMB Churn Benchmarks & NRR Targets (45 min)

### Key Topics

1. **What "Good" Looks Like for SMB SaaS** — Monthly logo churn <3%, monthly revenue churn <2%, Net Revenue Retention (NRR) >=100%
2. **Logo Churn vs Revenue Churn** — Logo churn counts customers lost. Revenue churn counts dollars lost. If you lose 5 small customers but upsell 2 large ones, logo churn is bad but revenue churn might be fine.
3. **Net Revenue Retention (NRR)** — (Starting MRR + Expansion - Contraction - Churn) / Starting MRR. NRR >100% means you grow even without new customers. Best SaaS >120%, SMB target >=100%.
4. **Cohort Analysis** — Track retention by signup month to identify if churn is improving or worsening over time. If March cohort retains better than January cohort, your onboarding improvements are working.
5. **Benchmark Reality for Solo Founders** — Don't compare to VC-backed companies with CS teams. Solo founder benchmarks: 5-8% monthly churn is normal starting point; goal is to reduce to 3-4% within 6 months of implementing this course.
6. **The "Break-Even Churn Rate"** — Calculate: New MRR / Total MRR = maximum sustainable monthly churn. If you add $2K/month and have $40K MRR, your break-even churn is 5%. Below that, you grow. Above that, you shrink.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Median monthly logo churn for SMB SaaS: 3-7% | ProfitWell / Baremetrics benchmark reports |
| Best-in-class SMB SaaS monthly churn: <3% | ProfitWell |
| Median NRR for SMB SaaS: 90-100% | KeyBanc Capital Markets SaaS Survey |
| Best-in-class NRR (all SaaS): 120-130% | Enterprise SaaS benchmarks / Bessemer |
| SMB-focused SaaS NRR target: >=100% | Practical SMB benchmark |
| Annual churn rates by ARPU: <$100/mo ARPU = 4-8% monthly, $100-500/mo = 2-5%, $500+/mo = 1-3% | ProfitWell segmented data |
| Solo founders who track NRR monthly make 40% better expansion decisions | CS productivity research |

### Frameworks & Models

- **The Solo Founder Churn Benchmark Table**:
  | Metric | Starting Point (Normal) | Good (6-month target) | Great (12-month target) |
  |--------|------------------------|----------------------|------------------------|
  | Monthly logo churn | 5-8% | 3-5% | <3% |
  | Monthly revenue churn | 4-6% | 2-4% | <2% |
  | NRR | 85-95% | 95-100% | 100%+ |
  | TTFV | 3-7 days | 1-3 days | <24 hours |
  | First-month churn | 20-40% | 10-20% | <10% |

- **NRR Calculation Template**:
  - Starting MRR: $X
  - Plus Expansion MRR: +$Y (upgrades, seat adds, upsells)
  - Minus Contraction MRR: -$Z (downgrades)
  - Minus Churned MRR: -$W (cancellations)
  - NRR = (X + Y - Z - W) / X × 100

- **Cohort Analysis Template**: Rows = signup month, Columns = month 1, 2, 3... 12 retention %. Look for the "retention cliff" (where the biggest drop happens) and the "steady state" (where retention flattens).

### Artifact Component

**Churn Benchmark Dashboard** — Spreadsheet with NRR calculator, cohort analysis template, and benchmark comparison table.

### Interactive Element

**KPI Simulator:** Students input current MRR, customer count, and churn data. System calculates NRR, break-even churn rate, and shows projection at current trajectory vs improved trajectory.

---

## LESSON 5: Reactivation Sequences (No Login in 10 Days) (50 min)

### Key Topics

1. **The Reactivation Window** — Days 7-14 of inactivity is the optimal intervention window. Before Day 7, it might be normal. After Day 21, the customer has mentally checked out and recovery rate drops below 10%.
2. **The 3-Email Reactivation Sequence** — Email 1 (Day 7-10): Gentle nudge — "We noticed you haven't logged in." Email 2 (Day 14): Value reminder — "Here's what you're missing." Email 3 (Day 21): Direct ask — "Is everything okay? Can we help?"
3. **The "What Changed?" Question** — Most dormancy isn't about your product. It's about the customer's life: got busy, priorities shifted, forgot, had a bad experience they didn't tell you about.
4. **Personalized vs Automated Reactivation** — For <50 customers: personal email from founder. For 50-200: automated sequence with personal tone. For 200+: fully automated with escalation to personal for high-value.
5. **The "Snooze" Offer** — For customers who respond to reactivation with "I'm just busy right now": offer a 30-60 day pause instead of cancellation. Pause recovery rate: 60-70% vs cancellation recovery rate: 5-15%.
6. **Win-Back Sequences** — For customers who already cancelled: Day 7 post-cancel check-in, Day 30 "what's new" update, Day 90 re-engagement offer. Win-back rate: 10-20% within 90 days.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Reactivation emails sent within 7-14 days of dormancy have 25-35% open rates | Customer.io / Intercom data |
| After 21 days of inactivity, reactivation success rate drops below 10% | Product analytics / retention benchmarks |
| Pause option reduces cancellations by 15-30% | Subscription business data / ProfitWell |
| Win-back campaigns recover 10-20% of churned customers within 90 days | Baremetrics / ChurnBuster data |
| Personal reactivation emails from the founder get 3x the response rate of automated ones | CS benchmark studies |
| 60-70% of paused customers reactivate vs 5-15% of cancelled customers | ProfitWell Retain data |

### Frameworks & Models

- **The 3-Email Reactivation Sequence**:
  | Email | Timing | Subject Line | Body Approach |
  |-------|--------|-------------|---------------|
  | 1 | Day 7-10 of inactivity | "Quick check-in" | Friendly, no pressure: "I noticed you haven't been in [product] lately. Everything okay?" |
  | 2 | Day 14 of inactivity | "You're missing [specific value]" | Value-focused: "Since you last logged in, we've [new feature/update]. Here's what you could be doing with [product]." |
  | 3 | Day 21 of inactivity | "Can I help?" | Direct: "I want to make sure [product] is still working for you. If something isn't right, I'd love to fix it. If your needs have changed, let's talk about options." |

- **Escalation Protocol**:
  - Reactivation emails failed (no response to all 3) + customer is high-value ($200+/mo) → Personal phone call or video message
  - Reactivation emails failed + customer is low-value (<$200/mo) → One final email with pause offer → accept natural churn if no response

### Artifact Component

**Reactivation Sequence** — Complete 3-email template with subject lines, body copy, and timing rules, plus escalation protocol and pause offer script.

### Interactive Element

**Roleplay:** AI plays a dormant customer who responds to the reactivation email with various reasons (too busy, frustrated with product, found alternative, forgot about it). Student practices the conversation and steers toward either re-engagement, pause, or graceful offboarding.

---

## LESSON 6: Feature Adoption Nudges (45 min)

### Key Topics

1. **Feature Adoption as Retention** — Customers who use 3+ features churn 50-70% less than customers who use only 1 feature. Feature breadth creates switching costs and value realization.
2. **The Feature Adoption Funnel** — Awareness → Trial → Adoption → Habitual Use. Most features stall at "Awareness" because customers don't know they exist.
3. **Nudge Types** — In-app tooltips, email spotlights, usage-triggered suggestions ("You're doing X — did you know Y makes it faster?"), milestone-based feature introductions
4. **The Drip Feature Introduction** — Don't overwhelm on Day 1. Introduce features progressively: Day 1 = core feature. Day 7 = second feature. Day 14 = third feature. Day 30 = power features.
5. **"Sticky Features" Identification** — Analyze retained vs churned customers: which features do retained customers use that churned ones don't? Those are your sticky features. Nudge everyone toward them.
6. **Feature Nudge Cadence** — Max 1 feature nudge per week via email. Max 1 in-app tooltip per session. More than that creates "feature fatigue."

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Customers using 3+ features have 50-70% lower churn than single-feature users | Product analytics benchmarks / Amplitude |
| 60% of SaaS features go unused by the average customer | Pendo feature adoption data |
| Feature spotlight emails get 30-40% higher CTR than generic newsletters | Customer.io / Intercom data |
| Usage-triggered nudges ("you just did X, try Y") have 3x the adoption rate of untriggered suggestions | Product-led growth research |
| The optimal new feature introduction cadence: 1 per week for the first month | Userpilot / Chameleon data |

### Frameworks & Models

- **The Feature Adoption Matrix**:
  | Feature | Awareness % | Trial % | Adoption % | Stickiness Score | Priority |
  |---------|------------|---------|------------|-----------------|----------|
  | Core feature A | 95% | 80% | 70% | High | Maintain |
  | Feature B | 60% | 30% | 15% | Medium | Nudge awareness |
  | Feature C | 40% | 20% | 10% | High (when used) | Nudge awareness + trial |
  | Feature D | 80% | 50% | 5% | Low | Investigate: is it useful? |

- **Drip Feature Introduction Schedule**:
  | Timing | Feature | Nudge Method |
  |--------|---------|-------------|
  | Day 1 | Core feature (onboarding) | In-app checklist + welcome email |
  | Day 7 | Second feature | Email spotlight + in-app tooltip |
  | Day 14 | Third feature | Email "pro tip" + contextual in-app |
  | Day 30 | Power features | "You're ready for advanced features" email |
  | Day 60 | Integration/expansion features | "Level up" email |

### Artifact Component

**Feature Adoption Playbook** — Feature adoption matrix for the student's product, drip introduction schedule, and nudge email/in-app templates.

### Interactive Element

**Guided Build:** AI helps the student inventory their features, estimate adoption rates, identify sticky features, and design a drip introduction schedule with nudge templates.

---

## LESSON 7: "Save" Plays: Downgrades, Pauses, and Recovery Calls (50 min)

### Key Topics

1. **The Save Play Philosophy** — When a customer signals intent to cancel, you have 3 options: save (fix the issue), downgrade (reduce plan to match reduced need), or pause (buy time). All three are better than losing them completely.
2. **Downgrade as Save** — A customer paying $50/mo is infinitely more valuable than a churned customer paying $0. Offering a downgrade path retains 20-40% of would-be cancellations.
3. **The Pause Offer** — "Instead of cancelling, would you like to pause for 30-60 days? Your data stays intact and you can restart anytime." Pause recovery rate: 60-70%.
4. **The Recovery Call** — For high-value customers ($200+/mo): a 10-15 minute call within 24 hours of cancellation signal. "I saw you're thinking of leaving — can I understand what happened?"
5. **The Cancellation Flow** — Don't make it easy AND don't make it hard. Best practice: (1) Ask why (1-click reason), (2) Offer save play based on reason, (3) If still cancelling, offer downgrade/pause, (4) Confirm with exit survey.
6. **Post-Churn Recovery** — Some customers need to leave and come back. The exit experience matters: friendly, professional, door-open. 15-20% of gracefully offboarded customers return within 12 months.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Downgrade offers retain 20-40% of would-be cancellations | ProfitWell / Baremetrics |
| Pause offers retain 15-30% of cancellation-intent customers | Subscription business benchmarks |
| Recovery calls (within 24 hours) save 30-50% of at-risk high-value accounts | CS benchmark studies |
| Companies with a structured cancellation flow retain 10-15% more customers than those with a "click to cancel" button | ProfitWell Retain |
| Gracefully offboarded customers return at 15-20% rate within 12 months vs 3-5% for poorly offboarded | Win-back campaign data |
| The #1 reason for SaaS cancellation: "I stopped using it" (not price, not competitor) | ProfitWell / Baremetrics churn surveys |

### Frameworks & Models

- **Save Play Decision Tree**:
  - Customer signals cancellation intent →
    - Reason = price → Offer downgrade or annual discount (10-20%)
    - Reason = not using it → Offer reactivation support or pause
    - Reason = missing feature → Log feature request + offer timeline if available
    - Reason = competitor → Recovery call: understand what competitor offers + match if possible
    - Reason = budget cut → Offer pause (30-60 days) or downgrade
    - Reason = achieved goal → Celebrate + offer next-level product + graceful exit

- **Recovery Call Script (10-15 min)**:
  1. "Thank you for being a customer. I noticed [cancellation signal]. I wanted to check in personally." (2 min)
  2. "Can you help me understand what's not working?" — listen without defending (3-4 min)
  3. "Based on what you've shared, here's what I can offer: [save play]" (2-3 min)
  4. If saved: confirm next steps and schedule follow-up (2 min)
  5. If not saved: "I understand. The door is always open. I'll make sure your exit is smooth." (2 min)

- **The Cancellation Flow (4 Steps)**:
  | Step | Action | UI Element |
  |------|--------|-----------|
  | 1 | Ask why | Radio buttons: price, not using, missing feature, competitor, budget, other |
  | 2 | Offer contextual save | Based on reason: downgrade, pause, feature timeline, discount |
  | 3 | If still cancelling | Confirm + offer feedback opportunity |
  | 4 | Post-cancel | Exit survey + "door is open" email |

### Artifact Component

**Save-Playbook Scripts** — Complete scripts for each save play scenario (downgrade pitch, pause offer, recovery call, cancellation flow), with decision tree and escalation rules.

### Interactive Element

**Roleplay:** AI plays customers in 5 different cancellation scenarios (too expensive, not using it, found competitor, budget cut, achieved goal). Student practices the save play conversation. System scores for empathy, save-play effectiveness, and appropriate escalation.

---

## LESSON 8: The Weekly CS Review Block (45 min)

### Key Topics

1. **The 2-3 Hour Weekly Ritual** — A structured weekly block dedicated to reviewing customer health, prioritizing interventions, and executing the most impactful CS actions
2. **The Review Agenda** — (1) Health score review: who moved from Green to Yellow or Yellow to Red? (2) Reactivation queue: who needs a nudge? (3) Expansion pipeline: who's ready for upsell? (4) Feedback review: any NPS/survey responses to act on?
3. **Prioritization: The 2x2 Matrix** — Urgency (risk level) x Value (account revenue). High urgency + high value = act first. Low urgency + low value = automate or defer.
4. **The "Top 3" Rule** — Each weekly review should produce a maximum of 3 action items that you execute that week. More than 3 means you're spreading too thin.
5. **Documenting Insights** — Keep a running CS log (Notion, Google Doc) of: patterns noticed, interventions tried, outcomes. This becomes your institutional knowledge.
6. **Monthly CS Retrospective** — Once per month, spend 30 minutes reviewing: churn numbers, health score trends, save play success rates, expansion wins. Adjust playbook based on data.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Solo founders with a weekly CS review block have 25% lower churn than those doing reactive-only CS | Founder survey data / CS benchmarks |
| Structured review rituals increase proactive interventions by 3-5x | CS productivity research |
| The "Top 3" constraint increases execution rate from ~30% (long to-do lists) to ~80% | Productivity research / Getting Things Done methodology |
| Monthly retrospectives improve CS playbook effectiveness by 15-20% per quarter | Continuous improvement research |
| Solo founders who document CS patterns can train a CS hire 50% faster when they eventually hire | Founder scaling data |

### Frameworks & Models

- **The Weekly CS Review Agenda (2-3 hours)**:
  | Time | Activity | Output |
  |------|----------|--------|
  | 0:00-0:30 | Health score review: scan dashboard for zone changes | Flagged accounts list |
  | 0:30-1:00 | Reactivation queue: review dormant users, send nudges | Reactivation emails sent |
  | 1:00-1:30 | Expansion pipeline: review Green accounts for upsell signals | Expansion outreach list |
  | 1:30-2:00 | Feedback review: NPS responses, support patterns, exit surveys | Action items from feedback |
  | 2:00-2:30 | Execute Top 3 actions (calls, emails, fixes) | Top 3 completed |
  | 2:30-3:00 | Document patterns + update CS log | CS log updated |

- **Account Prioritization Matrix**:
  |  | High Value ($200+/mo) | Low Value (<$200/mo) |
  |--|----------------------|---------------------|
  | **High Risk (Red/Yellow)** | Priority 1: Personal outreach this week | Priority 3: Automated intervention |
  | **Low Risk (Green)** | Priority 2: Expansion conversation | Priority 4: Monitor, no action |

### Artifact Component

**Weekly CS Review Template** — Notion/Google Docs template with the review agenda, account prioritization matrix, Top 3 action tracker, and CS log format.

### Interactive Element

**Simulation:** AI presents a dashboard with 20 customer health scores, recent changes, and signals. Student must triage, prioritize using the 2x2 matrix, and select their Top 3 actions. System reveals outcomes for different prioritization choices.

---

## LESSON 9: Automation Recipes for Retention (50 min)

### Key Topics

1. **The 5 Core Retention Automations** — (1) Dormancy alert, (2) Failed payment recovery (dunning), (3) Health score change notification, (4) Feature adoption nudge, (5) NPS follow-up routing
2. **Dormancy Alert Automation** — Trigger: no login in 7 days. Action: send reactivation email 1 + Slack/email alert to founder. If no login by Day 14: send email 2. Day 21: send email 3 + flag in CRM.
3. **Failed Payment Recovery (Dunning)** — Trigger: Stripe payment fails. Action: Day 0: automatic retry. Day 1: email "payment failed, please update card." Day 3: second email. Day 7: personal email from founder. Day 14: final notice before pause/cancellation.
4. **Health Score Change Notification** — Trigger: customer drops from Green to Yellow or Yellow to Red. Action: Slack notification + CRM flag + add to weekly review queue.
5. **NPS Follow-Up Routing** — Trigger: NPS survey submitted. Action: Score 9-10 → send testimonial request. Score 7-8 → send "what would make it a 10?" Score 0-6 → alert founder for personal outreach.
6. **Building Without Enterprise Tools** — All automations buildable with Zapier/Make/n8n + your ESP + Stripe + Google Sheets

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Automated dunning recovers 30-50% of failed payments without human intervention | ProfitWell Retain / ChurnBuster |
| Adding a personal email at Day 7 of dunning increases recovery by an additional 15-20% | Baremetrics data |
| Automated dormancy alerts reduce time-to-intervention from 30+ days to 7 days | CS automation benchmarks |
| NPS-triggered follow-ups increase testimonial collection by 40% and detractor recovery by 25% | Customer feedback platforms |
| Solo founders with 5 core retention automations save 4-6 hours/week vs manual monitoring | Automation ROI studies |

### Frameworks & Models

- **The 5 Core Retention Automations**:
  | # | Automation | Trigger | Action Chain | Tools |
  |---|-----------|---------|-------------|-------|
  | 1 | Dormancy alert | No login 7 days | Reactivation email 1 → Day 14: email 2 → Day 21: email 3 + founder alert | Zapier + ESP + Slack |
  | 2 | Failed payment | Stripe payment_intent.payment_failed | Day 0: retry → Day 1: email → Day 3: email → Day 7: founder email → Day 14: final | Stripe + Zapier + ESP |
  | 3 | Health score change | Score drops below threshold | Slack alert + CRM flag + add to review queue | Zapier + Google Sheets + Slack |
  | 4 | Feature nudge | User completes action A but hasn't tried B (after 7 days) | Email: "You're using A — try B for even better results" | Zapier + ESP |
  | 5 | NPS routing | NPS survey submitted | 9-10: testimonial ask → 7-8: "make it 10" email → 0-6: founder alert | Zapier + ESP + Slack |

- **Automation Budget Guide**:
  | Stack | Monthly Cost | Automation Capacity |
  |-------|-------------|-------------------|
  | Zapier Starter + ESP | $50-70/mo | 750 Zapier tasks + unlimited ESP sends |
  | Make Pro + ESP | $40-60/mo | 10K Make ops + unlimited ESP sends |
  | n8n self-hosted + ESP | $35-45/mo | Unlimited automations + ESP sends |

### Tools to Reference

| Tool | Function | Pricing | Solo Fit |
|------|----------|---------|----------|
| Baremetrics | MRR tracking + dunning insights | $50/mo (MRR <$10K) | High |
| ChartMogul | Revenue analytics + cohort analysis | $100/mo | Medium |
| ProfitWell / Paddle | Revenue analytics + Retain (dunning) | Free (basic) / Retain pricing varies | High |
| ChurnBuster | Dedicated failed payment recovery | $100/mo | Medium (powerful but pricey for solo) |
| **Simple alternative** | Stripe dunning emails + Zapier + Google Sheets health scores | $20-50/mo | High — recommended starting point |

### Artifact Component

**Retention Automation Recipes** — Step-by-step build guides for all 5 automations with tool-specific instructions for Zapier, Make, and n8n.

### Interactive Element

**Guided Build:** AI walks the student through building their first retention automation (Dormancy Alert) step-by-step using their chosen automation platform.

---

## LESSON 10: Your Retention Playbook (50 min)

### Key Topics

1. **Assembling the Complete Retention System** — Health scores + churn signals + benchmarks + reactivation + feature nudges + save plays + weekly review + automations = one cohesive system
2. **The One-Page Retention Summary** — A single page showing: health score model, churn benchmarks, intervention triggers, save play scripts, and automation status
3. **Measuring Retention Success** — 5 metrics: monthly logo churn, monthly revenue churn, NRR, reactivation success rate, save play success rate
4. **The 14-Day Implementation Sprint** — Build and launch the retention system
5. **Churn Post-Mortem Process** — For every churned customer (or at least every high-value one): document why they left, what you could have done differently, and what to change
6. **Connecting to Expansion (Course 38)** — Retention feeds expansion: healthy customers (Green) are expansion candidates. The health score is the expansion signal.

### Frameworks & Models

- **The 14-Day Implementation Sprint**:
  | Day | Activity | Output |
  |-----|----------|--------|
  | 1-2 | Define health score model (3 dimensions, scoring rubrics) | Health scoring matrix complete |
  | 3-4 | Set up churn signal tracking (7 signals in Google Sheets) | Signal tracker active |
  | 5 | Calculate current churn benchmarks and NRR | Benchmark baseline established |
  | 6-7 | Build reactivation sequence (3 emails) | Reactivation emails in ESP |
  | 8 | Map feature adoption and create nudge schedule | Feature adoption playbook |
  | 9-10 | Write save play scripts (downgrade, pause, recovery call) | Save-playbook scripts complete |
  | 11 | Set up 5 core retention automations | Automations live |
  | 12 | Build weekly CS review template | Review template ready |
  | 13 | Create churn post-mortem template | Template ready |
  | 14 | Run first weekly CS review with new system | System live |

- **5-Metric Retention Dashboard**:
  1. Monthly Logo Churn Rate (target: <3%)
  2. Monthly Revenue Churn Rate (target: <2%)
  3. Net Revenue Retention (target: >=100%)
  4. Reactivation Success Rate (target: 20-30%)
  5. Save Play Success Rate (target: 30-40%)

- **Churn Post-Mortem Template**:
  | Field | Content |
  |-------|---------|
  | Customer | [Name, plan, tenure] |
  | Churn date | [Date] |
  | MRR lost | [$X] |
  | Stated reason | [From exit survey / cancellation flow] |
  | Root cause analysis | [What really happened?] |
  | Health score at churn | [Score and trend] |
  | Warning signs missed | [What signals did we miss or ignore?] |
  | What we'd do differently | [Specific process change] |
  | Action item | [One concrete change to prevent similar churn] |

### Artifact Component

**Your Retention Playbook** (Primary Course Artifact) — Compiles all lesson artifacts: health scoring matrix, churn signal tracker, benchmark dashboard, reactivation sequences, feature adoption playbook, save-playbook scripts, weekly CS review template, automation recipes, and churn post-mortem templates.

### Interactive Element

**Implementation Sprint Launcher:** AI generates a personalized 14-day sprint calendar. Daily check-ins with AI coach. Day 7 mid-sprint review and Day 14 completion review with initial health score calculation for all active customers.

---

## TOOL PRICING TIERS

### Tier 1: Free / Minimal ($0-30/mo)
ProfitWell Free (basic revenue analytics), Google Sheets (health scores), Stripe built-in dunning, Tally (NPS surveys), Notion (CS log)

### Tier 2: Essential ($50-100/mo)
Baremetrics ($50/mo) + Zapier Starter ($19.99/mo) + ESP ($29/mo)

### Tier 3: Growth ($150-250/mo)
Baremetrics ($50/mo) + ChartMogul ($100/mo) + Zapier Professional ($49/mo) + ESP ($29/mo)

### Always-Free Tools
ProfitWell Free, Google Sheets, Google Forms, Tally, Notion, Stripe built-in dunning

---

## ALL ARTIFACTS CREATED

1. Retention Economics Dashboard (L1)
2. Health Scoring Matrix (L2)
3. Churn Signal Tracker (L3)
4. Churn Benchmark Dashboard (L4)
5. Reactivation Sequence (L5)
6. Feature Adoption Playbook (L6)
7. Save-Playbook Scripts (L7)
8. Weekly CS Review Template (L8)
9. Retention Automation Recipes (L9)
10. Your Retention Playbook (L10) — compiles all above

**Completion Badge:** "Retention Strategist" — 200 XP
