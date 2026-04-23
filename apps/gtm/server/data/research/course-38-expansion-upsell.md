# Course 38: Expansion & Upsell — Research Package

**Track:** Customer Success (Track 6)
**Duration:** 8 lessons | ~6.5 hours total
**Budget Constraint:** <$200/month tool budget
**Time Constraint:** 5-7 hours/week on CS activities (shared across Courses 36-39)
**Primary Output Artifacts:** Expansion Triggers, Upsell Sequences, Pricing Scenarios
**Core Interactions:** "Next best action" agent, expansion trigger simulator, pricing scenario workshop

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Understand NRR as the growth engine and target >=100% for SMB | Lessons 1, 8 | Expansion Playbook |
| Identify usage-based expansion triggers for SaaS products | Lesson 2 | Expansion Triggers |
| Identify outcome-based expansion triggers for services/coaching | Lesson 3 | Expansion Triggers |
| Structure seat expansion, done-for-you, and upgraded retainer pitches | Lessons 4, 5, 6 | Upsell Sequences |
| Price expansion without alienating existing customers | Lesson 7 | Pricing Scenarios |
| Track expansion revenue contribution and NRR monthly | Lesson 8 | Expansion Dashboard |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + diagrams explaining the core concept
2. **Guided Build Session** — Artifact creation with AI suggestions + expansion linters
3. **Simulation/Roleplay** — Upsell conversations (Lessons 4, 5, 6, 7)
4. **Implementation Sprint** — Course culminates in a 7-day expansion system build (Lesson 8)

---

## LESSON 1: Expansion as a Growth Engine (NRR > 100%) (45 min)

### Key Topics

1. **NRR Is the Silent Growth Engine** — Net Revenue Retention above 100% means your existing customer base grows even if you stop acquiring new customers. Best SaaS companies run at 120-130% NRR; the SMB solo-founder target is >=100%.
2. **The Expansion Revenue Equation** — Total Growth = New MRR + Expansion MRR - Churned MRR - Contraction MRR. For healthy businesses, expansion should be 20-30% of total growth.
3. **Why Expansion Beats Acquisition** — Expansion costs 5-10x less than new acquisition; the customer already trusts you, already has budget allocated, already knows your product.
4. **The Three Expansion Motions** — Upsell (higher plan/tier), Cross-sell (additional product/service), Seat/volume expansion (more of the same).
5. **The Expansion Mindset Shift** — Moving from "be grateful they're paying" to "look for opportunities to deliver more value and capture more revenue." This is NOT about extracting more money — it's about serving deeper.
6. **Expansion by Business Type** — SaaS: tier upgrades, seat expansion, add-on features. Services: scope expansion, premium support, retainer upgrade. Coaching: next-level program, VIP access, 1:1 upgrade from group.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Best-in-class SaaS NRR: 120-130% | Bessemer Venture Partners / KeyBanc | Enterprise; SMB target is >=100% |
| Expansion revenue should be 20-30% of total growth for healthy SaaS | OpenView Partners / SaaS benchmarks | Healthy mix between new and expansion |
| Average expansion revenue per account: 10-20% annually for SMB SaaS | ProfitWell / Baremetrics | Expansion is gradual, not explosive |
| Expansion revenue costs 5-10x less to generate than new customer revenue | Gainsight / Bain & Company | No acquisition cost, just delivery cost |
| Companies with NRR >100% grow 2-3x faster than those with NRR <100% even with similar acquisition rates | SaaS Capital / KeyBanc data | NRR is the compounding multiplier |
| Only 35% of SMB SaaS companies actively track and manage expansion revenue | ProfitWell survey | Massive opportunity for those who do |
| Upsell probability to existing customer: 60-70% vs 5-20% for new prospect | Marketing Metrics / Invesp | The base is the best pipeline |

### Frameworks & Models

- **The NRR Growth Model**:
  - NRR = (Starting MRR + Expansion - Contraction - Churn) / Starting MRR × 100
  - Example: $50K starting MRR + $8K expansion - $2K contraction - $3K churn = $53K → NRR = 106%
  - At 106% NRR, existing base grows 6% monthly just from expansion, compounding to ~100% annual growth from existing customers alone.

- **The Three Expansion Motions**:
  | Motion | SaaS Example | Services Example | Coaching Example |
  |--------|-------------|-----------------|-----------------|
  | Upsell (higher tier) | Basic → Pro plan | Monthly retainer → quarterly strategy + execution | Group program → 1:1 coaching |
  | Cross-sell (new product) | Core product → add-on module | Web dev → SEO services | Course → mastermind community |
  | Volume expansion | 5 seats → 15 seats | 10 hours/mo → 20 hours/mo | 1 team member → 3 team members |

### Artifact Component

**Expansion Revenue Model** — Spreadsheet calculating current NRR, expansion contribution, and 12-month projection at different expansion rates.

### Interactive Element

**KPI Simulator:** Students input current MRR, expansion MRR, contraction, and churn. System shows NRR, 12-month projection, and the impact of increasing expansion by 5, 10, or 20%.

---

## LESSON 2: Usage-Based Expansion Triggers (SaaS) (50 min)

### Key Topics

1. **Usage Triggers Defined** — Specific product usage patterns that indicate a customer is ready for (and would benefit from) an upgrade. These are objective signals, not guesswork.
2. **The 5 SaaS Usage Triggers** — (1) Approaching plan limits (80%+ usage of seats/storage/API calls), (2) Power feature discovery (using advanced features not included in current plan), (3) Multi-team usage (multiple departments using the product), (4) Integration expansion (connecting more tools), (5) Frequent usage spikes (consistently hitting peak usage windows)
3. **Trigger Detection for Solo Founders** — You don't need Gainsight. Track plan limit usage via your billing system, feature usage via product analytics, and integration count via your database.
4. **The 80% Rule** — When a customer hits 80% of a plan limit (seats, storage, API calls), it's the ideal time to initiate the expansion conversation: before they hit the wall, not after.
5. **Automated Trigger Notifications** — Zapier/Make automation: when usage crosses threshold → Slack alert to founder + email to customer with upgrade path and benefits.
6. **Timing the Outreach** — Trigger fires → wait 24-48 hours (don't be creepy-fast) → send contextual email → follow up if no response in 5 days.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Customers at 80%+ of plan limits convert to higher plans at 40-60% rate when proactively approached | SaaS expansion benchmarks |
| Usage-based triggers outperform time-based triggers by 3x for expansion conversations | Product-led growth data |
| The average SaaS customer who upgrades does so within 60-90 days of hitting a usage trigger | Billing analytics data |
| Proactive upgrade conversations convert 2-3x better than reactive ones (customer hitting the wall and complaining) | CS research |
| 70% of expansion conversations fail because they happen too late (after frustration) or too early (before need) | Gainsight / Totango |

### Frameworks & Models

- **The 5 SaaS Usage Triggers**:
  | # | Trigger | Detection Method | Threshold | Outreach Template |
  |---|---------|-----------------|-----------|------------------|
  | 1 | Plan limit approach | Billing system / API | 80% of seats/storage/calls | "You're using X of Y — here's how to unlock more" |
  | 2 | Power feature discovery | Product analytics | User tries gated feature 3+ times | "You've been exploring [feature] — here's how to access it fully" |
  | 3 | Multi-team usage | Login analytics | 3+ unique departments/roles | "Your team is growing on [product] — here's how to manage that" |
  | 4 | Integration expansion | Database / API logs | 3+ integrations connected | "You're building a stack around [product] — Pro gives you unlimited integrations" |
  | 5 | Usage spikes | Analytics | Consistently hitting 90%+ of usage limits | "You're a power user — let me make sure your plan keeps up" |

- **Usage Trigger Outreach Cadence**:
  | Day | Action |
  |-----|--------|
  | Day 0 | Trigger fires → Slack alert to founder |
  | Day 1-2 | Send contextual email: "I noticed you're [trigger]. Here's how [upgrade] helps." |
  | Day 7 | If no response: follow-up email with case study of customer who upgraded |
  | Day 14 | If no response: brief personal note: "Just checking — want to make sure you have what you need" |
  | Day 30 | If still no response: stop outreach, re-trigger if new threshold hit |

### Artifact Component

**SaaS Expansion Triggers** — Complete trigger definitions, detection methods, thresholds, and outreach templates for the 5 usage-based triggers.

### Interactive Element

**Guided Build:** AI helps the student define their specific usage triggers based on their product's features, plan limits, and usage patterns. Generates personalized outreach templates for each trigger.

---

## LESSON 3: Outcome-Based Expansion Triggers (Services/Coaching) (50 min)

### Key Topics

1. **Outcome Triggers vs Usage Triggers** — For services and coaching, expansion signals come from client outcomes, not product usage. "They achieved X, which means they're ready for Y."
2. **The 5 Outcome-Based Triggers** — (1) First success milestone achieved ("Your first 10 customers acquired" → ready for retention system), (2) Goal completion (original scope achieved → what's next?), (3) Business growth signal (revenue increase, team expansion), (4) New challenge emergence (solved one problem, now have a new one), (5) Time-based milestone (3 months in, 6 months in, annual review)
3. **The "What's Next?" Conversation** — The most natural expansion conversation: "Congratulations on [result]. Now that you've achieved that, what's the next challenge? I might be able to help with that too."
4. **Retainer Expansion for Services** — From project-based to retainer: "Instead of hiring me project-by-project, a monthly retainer gives you [benefits] at [better effective rate]."
5. **Program Laddering for Coaching** — Group program → 1:1 coaching → VIP day → annual retainer. Each level unlocked by achievement in the previous level.
6. **Avoiding the "Upsell Trap"** — Expansion must be genuinely value-additive. If the customer doesn't need it, don't sell it. Trust > short-term revenue.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Service businesses that upsell at outcome milestones convert 45-60% vs 15-25% for time-based upsells | Service business benchmarks |
| Coaching clients who complete a program purchase the next program at 30-50% rate when offered at completion | Coaching industry data |
| The "What's Next?" question generates 3x more expansion revenue than waiting for clients to ask | CS best practices |
| Retainer conversions increase average client lifetime value by 3-5x vs project-based engagements | Service business economics |
| 65% of service clients who achieve their initial goal have additional needs they haven't articulated | Client research / RainGroup |

### Frameworks & Models

- **The 5 Outcome-Based Triggers**:
  | # | Trigger | Signal | Conversation Opener |
  |---|---------|--------|-------------------|
  | 1 | First success milestone | Client reports a quantifiable win | "Congratulations on [result]! Now that [milestone] is achieved, most clients find they need [next step]. Would that be helpful?" |
  | 2 | Goal completion | Original scope delivered | "We've accomplished everything we set out to do. What's the biggest challenge you're facing now?" |
  | 3 | Business growth | Revenue increase, hiring, new product | "I noticed your team has grown from 5 to 12 — the systems we built may need upgrading. Want to talk about what's next?" |
  | 4 | New challenge | Client mentions a new problem in conversation | "That's actually something I help with. Want me to put together a proposal?" |
  | 5 | Time milestone | 90 days, 6 months, annual review | "It's been 6 months — let's do a review of what we've achieved and plan the next phase." |

- **The Services Expansion Ladder**:
  | Level | Offering | Price Range | Trigger to Next Level |
  |-------|----------|-------------|---------------------|
  | 1 | Single project | $2K-10K | Project completion + client satisfaction |
  | 2 | Monthly retainer | $2K-5K/mo | Client needs ongoing support after project |
  | 3 | Premium retainer | $5K-15K/mo | Scope expands beyond initial retainer |
  | 4 | Strategic advisor | $15K-25K/mo | Client relies on you for major decisions |

### Artifact Component

**Services/Coaching Expansion Triggers** — Trigger definitions, conversation scripts, and ladder framework personalized to the student's service/coaching business.

### Interactive Element

**Roleplay:** AI plays a coaching client who just completed their 3-month program and achieved their initial goal. Student practices the "What's Next?" conversation and pitches the next level. System scores for natural timing, value articulation, and pressure-free approach.

---

## LESSON 4: Seat & License Expansion Playbook (45 min)

### Key Topics

1. **Seat Expansion as the Easiest Growth** — Adding seats/users is the lowest-friction expansion because the customer already values the product; they just need more access
2. **The Champion-Led Expansion** — Your existing user is the internal champion. Give them the language and justification to pitch adding seats to their team/boss.
3. **The Team Expansion Email** — Trigger: customer has 1 seat but mentions "my team" or "my colleague." Template: "Sounds like your team could benefit too. Here's what team plans look like."
4. **Volume Pricing for Expansion** — Offer a modest discount for bulk seats (10-15% for 5+ seats) to incentivize team-wide adoption without gutting per-seat economics
5. **The "Invite a Colleague" Feature** — In-product: "Invite a team member" button. Each successful invite = seat expansion + product stickiness through shared workflows.
6. **When Seat Expansion Signals Upsell** — 5+ seats usually means the customer is ready for a team/enterprise plan with admin features, shared workspaces, and team analytics.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Seat expansion accounts for 40-60% of all SaaS expansion revenue | OpenView Partners |
| Customers with 3+ seats have 50% lower churn than single-seat customers | Product analytics benchmarks |
| Champion-led expansion (user pitches internally) converts at 60-70% | CS benchmark data |
| "Invite a colleague" in-product prompts convert 5-10% of active users | Product-led growth data |
| Modest bulk pricing (10-15% discount for 5+ seats) increases team adoption by 25-30% | Pricing research |

### Frameworks & Models

- **The Seat Expansion Playbook**:
  | Signal | Trigger | Action | Template |
  |--------|---------|--------|----------|
  | Single user mentions team | Chat/email mention of "my team" or "colleague" | Send team expansion email | "Happy to hear others are interested! Here's how team plans work: [link]" |
  | User hits 80% of seat limit | Billing threshold | Proactive expansion email | "Your team is growing! Add seats now and keep everyone productive." |
  | Second person signs up from same domain | Signup analytics | Team plan recommendation | "I noticed [colleague] also signed up. A team plan would save you both 15%." |
  | User requests shared features | Support ticket | Upgrade path conversation | "Great question — shared workspaces are included in our Team plan." |

- **Volume Pricing Tiers**:
  | Seats | Per-Seat Price | Discount |
  |-------|---------------|---------|
  | 1-2 | Full price | 0% |
  | 3-5 | 10% off | 10% |
  | 6-10 | 15% off | 15% |
  | 11+ | Custom quote | 15-25% |

### Artifact Component

**Seat Expansion Playbook** — Signal-to-action map, team plan pricing framework, champion enablement materials, and outreach templates.

### Interactive Element

**Simulation:** AI presents 4 customer scenarios with different seat expansion signals. Student selects the right trigger, timing, and outreach approach. System reveals conversion outcomes.

---

## LESSON 5: Done-for-You & Consulting Upsell Paths (50 min)

### Key Topics

1. **The DFY Premium** — Customers who lack time to implement will pay 3-10x more for done-for-you service vs self-serve. This is the highest-margin expansion path for solo founders.
2. **SaaS → DFY Upsell** — "You have the tool but need help implementing it. For $X/month, I'll set up and manage it for you." Common in marketing SaaS, analytics tools, CRM systems.
3. **Coaching → DFY Upsell** — "You've learned the framework. For clients who want me to execute it for them, here's my done-for-you package."
4. **The Capacity Constraint** — DFY doesn't scale infinitely. As a solo founder, cap DFY clients at 3-5 simultaneously. Use DFY revenue to fund product development or team hire.
5. **Productized Consulting** — Package consulting into standardized deliverables with fixed scope and price: "Website Audit + Action Plan: $2,500" vs open-ended hourly consulting.
6. **The "Graduation" Path** — Best DFY customers eventually graduate to self-serve (or hire their own team). Build this expectation in from the start so it's not a surprise.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Done-for-you services command 3-10x the price of self-serve for the same outcome | Service pricing benchmarks |
| 20-30% of SaaS customers express interest in implementation services when asked | SaaS survey data |
| Productized consulting has 30-40% higher close rates than custom proposals | Service business data |
| Solo founders offering DFY alongside SaaS average 40-60% higher revenue per customer | Founder revenue data |
| The optimal DFY client load for a solo founder: 3-5 simultaneous clients | Time management research |

### Frameworks & Models

- **The DFY Upsell Matrix**:
  | Customer Type | Self-Serve Product | DFY Offering | Price Multiple |
  |--------------|-------------------|-------------|---------------|
  | SaaS customer | $50-200/mo | Setup + management | 3-5x ($150-1,000/mo) |
  | Course student | $500-2,000 course | Implementation coaching | 3-5x ($1,500-10,000) |
  | Group coaching | $200-500/mo | 1:1 DFY | 5-10x ($1,000-5,000/mo) |

- **Productized Consulting Package Template**:
  - **Name**: [Descriptive outcome name]
  - **Scope**: [3-5 specific deliverables]
  - **Timeline**: [X weeks]
  - **Price**: [Fixed, not hourly]
  - **What's included**: [Deliverables + meetings + revisions]
  - **What's NOT included**: [Clear boundaries]

### Artifact Component

**DFY/Consulting Upsell Playbook** — Upsell trigger map, productized consulting package templates, and pricing framework.

### Interactive Element

**Roleplay:** AI plays a SaaS customer who says "I love the product but I don't have time to set it up properly." Student practices pitching the DFY offering. System scores for value articulation, scope clarity, and pricing confidence.

---

## LESSON 6: Upgraded Retainer Conversations (45 min)

### Key Topics

1. **When to Upgrade a Retainer** — Signals: scope creep beyond original agreement, client requesting more hours, client's business has grown significantly, you're delivering results that justify higher investment
2. **The Retainer Review Conversation** — A scheduled (not surprise) conversation at a natural milestone (90 days, 6 months, annual): "Let's review what we've accomplished and discuss what's next."
3. **Framing the Upgrade** — Never: "I need to charge you more." Always: "Based on the results we've achieved and where your business is heading, here's how we can deliver even more value."
4. **The Three Upgrade Structures** — (1) More hours/deliverables at current rate, (2) Same hours at a higher rate (rate increase), (3) New scope/deliverables added to existing retainer.
5. **Rate Increases for Existing Clients** — Annual rate increases of 5-15% are standard. Give 60 days notice. Frame against market rates: "My standard rate for new clients is $X. As a long-term client, your rate is $Y."
6. **When NOT to Upgrade** — If the client isn't getting sufficient value from the current retainer, don't upgrade — fix the value delivery first. Upgrading an underperforming engagement will accelerate churn.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| Service businesses that conduct quarterly reviews upsell at 2x the rate of those that don't | Service business benchmarks |
| Annual rate increases of 5-15% are accepted by 80-90% of satisfied clients | Pricing research / freelancer surveys |
| Clients who experience scope creep without a retainer upgrade are 40% more likely to churn | Service retention data |
| Retainer upgrades based on demonstrated results convert at 60-75% | CS benchmark data |
| The optimal notice period for rate increases: 60 days | Client relationship best practices |

### Frameworks & Models

- **The Retainer Review Conversation Script**:
  1. "Let's look at what we've accomplished: [review results and wins]" (5 min)
  2. "Here's what I see for the next phase: [opportunities and challenges]" (5 min)
  3. "To deliver [next-level outcomes], here's what I recommend: [upgraded scope/rate]" (5 min)
  4. "This would look like [specific deliverables] at [new price]. The ROI based on our results so far would be [calculation]." (5 min)
  5. "What do you think? Should I put together a formal proposal?" (5 min)

- **Rate Increase Communication Template**:
  - Subject: "2026 Engagement Update"
  - Body: "As we approach [milestone], I want to share an update on our engagement. Starting [date, 60+ days away], my rate will adjust from $X to $Y per [hour/month]. This reflects [results delivered, market rates, expanded capabilities]. Your current rate has been below my standard rate of $Z for new clients. I'm committed to continuing to deliver [value]. Let me know if you'd like to discuss."

### Artifact Component

**Retainer Upgrade Playbook** — Review conversation script, rate increase communication template, and three upgrade structure options.

### Interactive Element

**Roleplay:** AI plays a long-term retainer client during the quarterly review conversation. Student practices presenting results, framing the upgrade, and handling pushback. System scores for confidence, value framing, and relationship preservation.

---

## LESSON 7: Pricing Expansion Without Alienating Customers (50 min)

### Key Topics

1. **The Grandfather Dilemma** — When you raise prices, do existing customers keep old pricing? Options: (1) Grandfather all existing (generous but limits revenue), (2) Grandfather for 6-12 months then transition (balanced), (3) Transition all immediately (aggressive, risky).
2. **The Value-First Price Increase** — Always pair a price increase with new value: "We're adding [features/services]. The new plan is $X, up from $Y."
3. **Transparent Communication** — Tell customers WHY: "Our costs have increased," "We've added significant new features," "We need to maintain the quality you depend on." Honesty builds trust.
4. **The Tier Introduction Strategy** — Instead of raising prices on existing plans, introduce a new higher tier and position the upgrade path as optional: "Your current plan stays the same. We've also introduced a Pro tier with [new features]."
5. **Win-Back for Price-Sensitive Churners** — Offer a temporary discount or loyalty pricing to customers who threaten to leave over pricing: 10-20% discount for annual commitment.
6. **Price Increase Math** — A 20% price increase that causes 5% of customers to leave results in a NET 14% revenue increase. The math almost always favors moderate price increases.

### Data Points & Statistics

| Statistic | Source |
|-----------|--------|
| A 10% price increase typically causes 2-5% customer loss, resulting in net revenue growth of 5-8% | ProfitWell / pricing research |
| Companies that communicate price increases transparently retain 85-90% of customers | Pricing psychology studies |
| Value-paired price increases (new features + higher price) are accepted 75% of the time | SaaS pricing benchmarks |
| Introducing a new tier (vs raising existing prices) reduces churn from price increases by 40-60% | Pricing strategy research |
| 60-day advance notice on price increases reduces negative response by 30% vs 30-day notice | Customer communication studies |
| Annual commitment discounts (10-20% off) convert 25-35% of monthly customers and improve retention | ProfitWell data |

### Frameworks & Models

- **The Price Increase Decision Framework**:
  | Scenario | Recommended Approach | Risk Level |
  |----------|---------------------|-----------|
  | New features justify increase | Value-paired increase + 60-day notice | Low |
  | Costs increased, no new features | Transparent communication + grandfathering period | Medium |
  | Pricing was too low from the start | Introduce new tier + grandfather old plan for 6-12 months | Low |
  | Competitor raised prices too | Market-rate adjustment communication | Low |
  | Significant increase (>25%) | Phase over 2 increases, 6 months apart | High if done at once |

- **Price Increase Communication Template**:
  - Subject: "Updates to [Product] Pricing — Effective [Date]"
  - Body structure: (1) Lead with value delivered and new features/improvements, (2) Explain the change and effective date, (3) Explain the reason honestly, (4) Offer alternatives (annual discount, grandfather period, transition plan), (5) Thank them for being a customer, (6) Offer to discuss personally.

- **Price Increase Revenue Calculator**:
  - Current MRR: $X
  - Price increase: Y%
  - Expected churn from increase: Z%
  - New MRR: X × (1 + Y%) × (1 - Z%)
  - Net change: New MRR - Current MRR

### Artifact Component

**Pricing Expansion Scenarios** — Price increase decision framework, communication templates, revenue impact calculator, and tier introduction playbook.

### Interactive Element

**Simulation:** Students model 3 pricing scenarios: small increase (10%), new tier introduction, and significant increase (25%). System shows projected revenue impact, churn estimates, and recommended communication approach for each.

---

## LESSON 8: Your Expansion Playbook (45 min)

### Key Topics

1. **Assembling the Complete Expansion System** — NRR model + usage triggers + outcome triggers + seat expansion + DFY/consulting + retainer upgrades + pricing strategy = one cohesive expansion system
2. **The One-Page Expansion Summary** — Triggers, conversation scripts, pricing scenarios, and tracking metrics on a single reference page
3. **Measuring Expansion Success** — 4 metrics: NRR, expansion MRR as % of total growth, expansion conversion rate (triggers → closed upsell), average expansion revenue per account
4. **The 7-Day Implementation Sprint** — Build and launch the expansion system
5. **The Monthly Expansion Review** — Add to the weekly CS review: 15 minutes reviewing Green health score accounts for expansion signals
6. **Connecting to Advocacy (Course 39)** — Successfully expanded customers are the best advocacy candidates: they've voted with their wallet twice

### Frameworks & Models

- **The 7-Day Implementation Sprint**:
  | Day | Activity | Output |
  |-----|----------|--------|
  | 1 | Calculate current NRR and expansion baseline | NRR baseline established |
  | 2 | Define 3-5 expansion triggers (usage-based or outcome-based) | Trigger definitions complete |
  | 3 | Write expansion outreach templates for each trigger | Templates in ESP |
  | 4 | Set up expansion trigger automations | Automations active |
  | 5 | Create pricing expansion scenarios and communication templates | Pricing scenarios documented |
  | 6 | Review all Green health score accounts for immediate expansion opportunities | Expansion pipeline populated |
  | 7 | Execute first 3 expansion conversations | System live, first results |

- **4-Metric Expansion Dashboard**:
  1. Net Revenue Retention (target: >=100%)
  2. Expansion MRR as % of Total Growth (target: 20-30%)
  3. Expansion Conversion Rate: triggers → closed upsell (target: 30-50%)
  4. Average Expansion Revenue Per Account Per Year (target: 10-20% of initial contract value)

- **The "Next Best Action" Framework (Adapted for Solo Founders)**:
  For each Green account, ask: (1) Is there a usage trigger active? → Send upgrade email. (2) Has an outcome milestone been achieved? → Schedule "What's next?" call. (3) Is a renewal approaching? → Prepare ROI review + expansion pitch. (4) None of the above? → Monitor, no action.

### Artifact Component

**Your Expansion Playbook** (Primary Course Artifact) — Compiles all lesson artifacts: expansion revenue model, usage and outcome triggers, seat expansion playbook, DFY/consulting upsell playbook, retainer upgrade playbook, pricing scenarios, and dashboard.

### Interactive Element

**Implementation Sprint Launcher:** AI generates a personalized 7-day sprint calendar. Daily check-ins with AI coach. Day 4 mid-sprint review and Day 7 completion review with initial NRR calculation and expansion pipeline.

---

## TOOL PRICING TIERS

### Tier 1: Free / Minimal ($0-30/mo)
ProfitWell Free (NRR tracking), Google Sheets (expansion tracker), Stripe (billing analytics), Notion (playbook documentation)

### Tier 2: Essential ($50-100/mo)
Baremetrics ($50/mo, MRR + expansion analytics) + Zapier Starter ($19.99/mo) + ESP ($29/mo)

### Tier 3: Growth ($150-250/mo)
Baremetrics ($50/mo) + ChartMogul ($100/mo) + Zapier Professional ($49/mo)

### Always-Free Tools
ProfitWell Free, Google Sheets, Stripe built-in analytics, Notion, Tally (survey forms)

---

## ALL ARTIFACTS CREATED

1. Expansion Revenue Model (L1)
2. SaaS Expansion Triggers (L2)
3. Services/Coaching Expansion Triggers (L3)
4. Seat Expansion Playbook (L4)
5. DFY/Consulting Upsell Playbook (L5)
6. Retainer Upgrade Playbook (L6)
7. Pricing Expansion Scenarios (L7)
8. Your Expansion Playbook (L8) — compiles all above

**Completion Badge:** "Expansion Strategist" — 200 XP
