# Course 41: Sales Analytics & BI — Research Package

**Track:** Operations & Systems (Track 7)
**Duration:** 10 lessons | ~8 hours total
**Budget Constraint:** $0-50/month dashboard tools (free tiers preferred)
**Time Constraint:** 5-7 hours/week on acquisition
**Primary Output Artifact:** Dashboards + Forecast Model Templates
**Core Interactions:** Dashboard builder, KPI simulator, forecast calculator, metrics review coach

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Answer the 3 key questions: Is acquisition working? Are customers staying? Where should I focus? | Lesson 1, 10 | Metrics Philosophy Map |
| Build a funnel dashboard (Leads → Meetings → Proposals → Wins with conversion %) | Lesson 2 | Funnel Dashboard |
| Track pipeline velocity (average days between stages) | Lesson 3 | Velocity Tracker |
| Implement commit vs upside forecasting to neutralize founder optimism | Lesson 4 | Forecast Model |
| Define CAC/LTV/payback targets (1-3 months bootstrapped, 6-9 months funded) | Lesson 5 | Unit Economics Calculator |
| Track MRR segmented by new, expansion, and churned revenue | Lesson 6 | MRR Waterfall Dashboard |
| Attribute wins to acquisition channels | Lesson 7 | Channel Attribution Tracker |
| Build dashboards using free or low-cost tools | Lesson 8 | Dashboard Templates |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + diagrams explaining the core metric or framework
2. **Guided Build Session** — Dashboard and template creation with AI suggestions + linters
3. **Simulation/Roleplay** — Where applicable (Lessons 4, 7, 9)
4. **Implementation Sprint** — Course culminates in a weekly metrics review ritual (Lesson 10)

---

## LESSON 1: The 3 Questions Your Metrics Must Answer (45 min)

### Key Topics

1. **Question 1: Is Acquisition Working?** — Leading indicators: outreach volume, reply rate, meetings booked. Lagging indicators: deals won, revenue, CAC. Solo founders must track leading indicators because lagging indicators arrive too late to course-correct.
2. **Question 2: Are Customers Staying?** — Monthly logo churn rate, net revenue retention (NRR), expansion revenue. Healthy SMB SaaS: <3% monthly logo churn, NRR ≥100%.
3. **Question 3: Where Should I Focus?** — Channel attribution (which source produces the most wins?), pipeline stage bottleneck (where do deals stall?), time allocation vs results (ROI per hour spent).
4. **The Anti-Vanity Metrics Principle** — Track only metrics that change decisions. Followers, page views, and email open rates are vanity unless they directly correlate to pipeline.
5. **The 5-Metric Starter Dashboard** — (1) Prospects added/week, (2) Meetings booked/week, (3) Pipeline value, (4) Win rate, (5) Revenue (MRR or cash collected).
6. **Metrics Cadence** — Daily: check inbox + CRM tasks. Weekly: 5-metric review (30 min). Monthly: unit economics + channel review (60 min). Quarterly: strategic pivot analysis.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Only 25% of marketing leads are sales-ready | Gleanster Research | Measuring volume without qualification is vanity |
| Lead scoring increases sales productivity by 20-30% | Forrester / HubSpot | Metrics-driven focus beats spray-and-pray |
| 50%+ of sales time wasted on unqualified prospects without data | InsideSales.com | Analytics tells you where to stop wasting time |
| Companies with formal sales analytics grow 5-15% faster | Aberdeen Group | Even basic tracking creates advantage |

### Frameworks & Models

- **The 3-Question Framework**: Every dashboard element must answer one of: (1) Is acquisition working? (2) Are customers staying? (3) Where should I focus? If a metric doesn't answer one of these, remove it.
- **Leading vs Lagging Indicator Map**: Leading (actionable this week): outreach volume, reply rate, meetings booked, proposals sent. Lagging (result of past actions): revenue, churn, LTV.

### Artifact Component

**Metrics Philosophy Map** — One-page document mapping the 3 questions to specific metrics, with data sources and review cadence.

### Interactive Element

**Concept Capsule Quiz:** Classify metrics as leading vs lagging; identify vanity metrics from a list; match metrics to the 3 core questions.

---

## LESSON 2: Funnel Dashboard: Leads → Meetings → Proposals → Wins (55 min)

### Key Topics

1. **The SaaS Conversion Funnel** — Visualize each stage as a horizontal bar chart or table. MQL → SQL → Meeting → Proposal → Won. Track volume AND conversion % at each stage.
2. **SaaS Funnel Benchmarks** — MQL→SQL: 20-30%. SQL→Meeting: 40-60%. Meeting→Proposal: 30-50%. Proposal→Won: 20-40%. Overall MQL→Won: 2-8%.
3. **Building the Funnel Dashboard** — Data source: your CRM (Course 40). Pull deal counts by stage. Calculate conversion rates between adjacent stages. Track weekly and monthly trends.
4. **Identifying Bottlenecks** — If MQL→SQL is low: ICP targeting problem. If SQL→Meeting is low: messaging/outreach problem. If Meeting→Proposal: discovery/demo problem. If Proposal→Won: pricing/closing problem.
5. **Cohort Analysis** — Track funnel metrics by lead source cohort (outbound vs inbound vs referral). Different channels have radically different conversion profiles.
6. **The Weekly Funnel Snapshot** — Every Friday, capture: total at each stage, conversion rates, stage-over-stage trend, biggest bottleneck.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| MQL→SQL conversion: 20-30% (B2B SaaS average) | Implisit / Salesforce | Below 20% = ICP or scoring issue |
| SQL→Meeting conversion: 40-60% | Industry benchmarks | Below 40% = messaging or follow-up gap |
| Meeting→Proposal conversion: 30-50% | Industry benchmarks | Below 30% = discovery or demo weakness |
| Proposal→Won conversion: 20-40% | Industry benchmarks | Below 20% = pricing or closing issue |
| Overall MQL→Won: 2-8% across B2B SaaS | Forrester / HubSpot | Solo founders should target 5%+ with tighter ICP |
| Top-performing teams measure funnel weekly, not monthly | SalesHacker | Weekly cadence catches bottlenecks faster |

### Frameworks & Models

- **Funnel Benchmark Table:**

| Stage Transition | Below Average | Average | Above Average |
|-----------------|---------------|---------|---------------|
| MQL → SQL | <15% | 20-30% | >35% |
| SQL → Meeting | <30% | 40-60% | >65% |
| Meeting → Proposal | <25% | 30-50% | >55% |
| Proposal → Won | <15% | 20-40% | >45% |

- **Bottleneck Diagnosis Tree**: Low conversion at stage X → Root cause options → Prescriptive actions (mapped to specific academy courses).

### Artifact Component

**Funnel Dashboard Template** — Spreadsheet or CRM report template with stage volumes, conversion rates, weekly trends, and benchmark comparisons.

### Interactive Element

**Guided Build:** Student connects CRM data to funnel template. AI calculates conversion rates and identifies the #1 bottleneck with a recommended action.

---

## LESSON 3: Pipeline Velocity: Average Days Between Stages (50 min)

### Key Topics

1. **Pipeline Velocity Formula** — Velocity = (Number of Opportunities × Win Rate × Average Deal Size) / Average Sales Cycle Length. This is the single most important compound metric.
2. **Stage Duration Tracking** — Measure average days in each stage. Identify which stage has the longest dwell time. That's your velocity bottleneck.
3. **Stage Duration Benchmarks** — Lead→Contacted: <2 days. Contacted→Engaged: 3-7 days. Engaged→Meeting: 5-10 days. Meeting→Proposal: 3-7 days. Proposal→Won: 5-14 days. Total: 20-45 days (SMB).
4. **Speed-to-Lead** — Responding within 5 minutes = 100x more likely to connect. Within 1 hour = 7x. After 24 hours = nearly dead. Automate the first response.
5. **Velocity Improvement Levers** — Increase win rate (better qualification). Increase deal size (upsell/packaging). Decrease cycle length (faster follow-up, better discovery). Each 10% improvement in any lever compounds.
6. **The Velocity Dashboard** — Weekly tracking of: average days per stage, total cycle length trend, deals exceeding 2x average cycle, velocity by channel.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average B2B SMB sales cycle: 30-45 days | Gartner | Enterprise: 84-180 days. Solo founders target SMB. |
| Responding within 5 minutes: 100x more likely to connect | InsideSales.com | Speed is the #1 velocity lever |
| 10% improvement in win rate, deal size, or cycle length each = 33% velocity improvement | Pipeline velocity math | Compound effect of small improvements |
| 78% of deals go to the first responder | Harvard Business Review | Velocity = competitive advantage |
| Average proposal-to-close time: 5-14 days for SMB, 30-90 for enterprise | HubSpot | Longer than this = stalled deal |

### Frameworks & Models

- **Pipeline Velocity Formula**: V = (N × W × D) / L where N = number of opportunities, W = win rate, D = average deal size, L = average cycle length in days.
- **Stage Duration Target Table**:

| Stage | Target Duration | Action if Exceeded |
|-------|----------------|-------------------|
| Lead → Contacted | < 2 days | Automate first outreach |
| Contacted → Engaged | 3-7 days | Improve messaging/follow-up |
| Engaged → Meeting | 5-10 days | Improve CTA / scheduling |
| Meeting → Proposal | 3-7 days | Send proposals within 24 hours |
| Proposal → Won | 5-14 days | Improve closing process |

### Artifact Component

**Pipeline Velocity Tracker** — Dashboard tracking days-in-stage, total cycle length, and velocity metric with trend lines.

### Interactive Element

**KPI Simulator:** Adjust win rate, deal size, cycle length, and opportunities. See real-time impact on monthly revenue velocity.

---

## LESSON 4: Commit vs Upside Forecasting (50 min)

### Key Topics

1. **Why Founders Over-Forecast** — Optimism bias: founders weight verbal interest as commitment. Every deal in pipeline feels like it's going to close. The result: chronic revenue shortfalls.
2. **Binary Commit/Upside Model** — Commit: deals you'd bet your rent on (verbal yes + timeline + budget confirmed). Upside: everything else that's possible. Forecast = Commit + (Upside × 30%).
3. **Stage-Weighted Forecasting** — Assign probability by stage: Lead (5%), Contacted (10%), Engaged (20%), Meeting (40%), Proposal (60%), Verbal Yes (80%). Forecast = sum of (deal value × stage probability).
4. **The "Would I Bet $1,000?" Test** — For each deal in your commit forecast: would you personally bet $1,000 that it closes this month? If not, it's upside, not commit.
5. **Forecast Review Cadence** — Weekly: update deal stages and probabilities. Monthly: compare forecast vs actual. Quarterly: calibrate your stage probabilities based on real data.
6. **Forecast Accuracy Tracking** — Track forecast vs actual monthly. Target: within 20% accuracy. If consistently over-forecasting, lower stage probabilities. If under-forecasting, raise them.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average forecast accuracy: 47% across all sales organizations | Gartner | Most forecasts are coin flips |
| Solo founders over-forecast by 40-60% on average | Anecdotal / coaching data | Optimism bias is extreme without team calibration |
| 60% of pipeline deals are already dead | CSO Insights | Dead deals inflating forecasts |
| Commit forecasting improves accuracy to 70-80% | SalesHacker | Binary classification forces rigor |
| SDR quota attainment: ~60% | Bridge Group | Even professionals over-forecast |

### Frameworks & Models

- **Stage-Weighted Probability Table:**

| Stage | Default Probability | Adjusted After 90 Days |
|-------|-------------------|----------------------|
| Lead | 5% | Calibrate from your data |
| Contacted | 10% | Calibrate from your data |
| Engaged | 20% | Calibrate from your data |
| Meeting Held | 40% | Calibrate from your data |
| Proposal Sent | 60% | Calibrate from your data |
| Verbal Yes | 80% | Calibrate from your data |

- **Commit vs Upside Categories:**
  - **Commit**: Champion confirmed, budget approved, timeline set, verbal yes received, no blockers identified
  - **Upside**: Interest shown, discovery complete, no timeline or budget confirmation, OR any deal with unresolved objections

### Artifact Component

**Forecast Model Template** — Spreadsheet with stage-weighted and commit/upside forecast views, monthly actuals tracking, and accuracy calibration.

### Interactive Element

**Simulation:** Student reviews 10 sample deals with descriptions. Must classify each as Commit or Upside and assign stage probabilities. AI reveals actual outcomes and scores forecast accuracy.

---

## LESSON 5: CAC, LTV, and Payback Period for Bootstrapped Founders (55 min)

### Key Topics

1. **Customer Acquisition Cost (CAC)** — Total acquisition spend (tools + ads + time valued at hourly rate) / number of new customers acquired. Include your time. A "free" channel that costs 20 hours/week at $100/hr = $8,000/month CAC.
2. **Lifetime Value (LTV)** — Average revenue per customer per month × average customer lifespan in months. For subscriptions: ARPU / monthly churn rate. For project-based: average project value × repeat purchase rate.
3. **LTV:CAC Ratio** — Healthy: 3:1 or higher. Breakeven: 1:1 (you're spending as much to acquire as you'll ever earn). SaaS benchmark: 3-5x.
4. **Payback Period** — Months to recover CAC from a customer's revenue. Bootstrapped target: 1-3 months (you need cash flow). Funded target: 6-9 months (you have runway). VC-backed can tolerate 12-18 months.
5. **Calculating CAC by Channel** — Track acquisition spend per channel. Compare CAC across outbound email, LinkedIn, content, referrals, paid ads. Kill channels with CAC > LTV.
6. **The Solo Founder Time-Adjusted CAC** — Your time is your biggest cost. Track hours per channel per month. Apply your effective hourly rate. This reveals the true cost of "free" channels.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| SaaS LTV:CAC benchmark: 3:1 to 5:1 | OpenView / Bessemer | Below 3:1 = unprofitable growth |
| Bootstrapped CAC payback target: 1-3 months | Baremetrics / Profitwell | Cash flow is king without runway |
| Funded CAC payback target: 6-9 months | SaaS Capital | Acceptable with 12+ months runway |
| VC-backed tolerance: 12-18 months payback | Bessemer | Only with $5M+ raised |
| Average SMB SaaS ARPU: $50-200/month | Baremetrics | Higher ARPU = faster payback |
| Average SMB SaaS monthly churn: 3-7% | Profitwell | Implies average lifetime of 14-33 months |
| Content marketing CAC: 60% lower than outbound over 12 months | DemandMetric | But 6-12 month lag before results |
| Referral CAC: typically 30-50% of outbound CAC | Influitive | Lowest-cost channel when available |

### Frameworks & Models

- **Unit Economics Calculator:**
  - CAC = (Tool costs + Ad spend + Time × Hourly Rate) / New Customers
  - LTV = ARPU / Monthly Churn Rate (for subscriptions)
  - Payback = CAC / Monthly Revenue Per Customer
  - LTV:CAC Ratio = LTV / CAC

- **Payback Period Targets:**

| Funding Stage | Target Payback | Rationale |
|--------------|---------------|-----------|
| Bootstrapped / Pre-Revenue | 1-3 months | Cash flow survival |
| Small raise ($100K-500K) | 3-6 months | Limited runway |
| Seed ($500K-2M) | 6-9 months | Growth mode |
| Series A+ ($2M+) | 9-18 months | Scale mode |

### Artifact Component

**Unit Economics Calculator** — Template that calculates CAC, LTV, payback period, and LTV:CAC ratio by channel with time-adjusted costs.

### Interactive Element

**KPI Simulator:** Input ARPU, churn rate, acquisition spend, hours, and hourly rate. See real-time LTV, CAC, payback, and LTV:CAC. Adjust levers to hit targets.

---

## LESSON 6: Revenue Tracking: New vs Expansion vs Churned MRR (50 min)

### Key Topics

1. **MRR Components** — New MRR (first-time customers), Expansion MRR (upgrades, add-ons, seat additions), Contraction MRR (downgrades), Churned MRR (cancellations). Net New MRR = New + Expansion - Contraction - Churned.
2. **The MRR Waterfall Chart** — Visual: start with last month's MRR → add New → add Expansion → subtract Contraction → subtract Churn → end with this month's MRR. This is the single most important SaaS chart.
3. **Net Revenue Retention (NRR)** — (Starting MRR + Expansion - Contraction - Churn) / Starting MRR × 100. Target: ≥100% (meaning existing customers grow enough to offset churn). Top SaaS: 110-130%.
4. **Tracking for Non-SaaS** — For services/coaching: Track monthly recurring retainer revenue the same way. For project-based: track rolling 3-month average revenue and pipeline coverage ratio (3x pipeline to hit target).
5. **Revenue Quality Indicators** — Concentration risk: if one customer is >20% of revenue, you're fragile. Revenue mix: recurring vs one-time. Payment reliability: on-time vs late vs overdue.
6. **Monthly Revenue Review** — First of each month: calculate MRR waterfall, NRR, concentration risk, and 90-day trend. Takes 30 minutes once set up.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Median NRR for SMB SaaS: 90-100% | Profitwell / OpenView | Top quartile: 110%+ |
| Best-in-class NRR: 120-130%+ | Bessemer Cloud Index | Usually driven by usage-based pricing |
| $1 of expansion revenue costs 60% less than $1 of new revenue | Profitwell | Expansion is the cheapest growth |
| Average SMB SaaS monthly logo churn: 3-7% | Profitwell | 5% monthly = 46% annual |
| Single-customer concentration >25% is high risk | Startup finance best practices | Diversify revenue sources |

### Frameworks & Models

- **MRR Waterfall Template:**

| Component | This Month | Last Month | Delta |
|-----------|-----------|-----------|-------|
| Starting MRR | $X | $Y | |
| + New MRR | $A | | |
| + Expansion MRR | $B | | |
| - Contraction MRR | $C | | |
| - Churned MRR | $D | | |
| = Ending MRR | $Z | | +/- % |
| NRR | % | | |

### Artifact Component

**MRR Waterfall Dashboard** — Template tracking all MRR components with monthly trend, NRR calculation, and concentration analysis.

### Interactive Element

**Guided Build:** Student inputs their actual revenue data. AI calculates MRR waterfall, NRR, and flags any concerning trends (rising churn, concentration risk).

---

## LESSON 7: Channel Attribution: Which Source Drives Wins? (50 min)

### Key Topics

1. **Why Attribution Matters for Solo Founders** — You have limited time and budget. Attribution tells you which channels deserve more investment and which to kill. Without it, you're guessing.
2. **First-Touch vs Last-Touch Attribution** — First-touch: which channel first brought the lead (acquisition credit). Last-touch: which touchpoint preceded the close (conversion credit). Solo founders should use first-touch for acquisition decisions.
3. **Simple Attribution Setup** — Add a "Lead Source" field to every CRM contact (required, not optional). Categories: Outbound Email, LinkedIn, Content/Inbound, Referral, Community, Paid Ads, Event, Other.
4. **Multi-Touch Reality** — Most deals involve 3-7 touchpoints across channels. A lead might find you via content, engage via LinkedIn, and close via email. First-touch attribution is imperfect but good enough for solo founders.
5. **Channel ROI Calculation** — Revenue from channel / (Cost of channel + Time spent × hourly rate). Compare across channels monthly. Double down on the highest-ROI channel.
6. **Attribution Pitfalls** — "Dark social" (referrals that look like direct traffic), content that influenced but wasn't the first touch, LinkedIn engagement that preceded an inbound form submission.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| B2B buyers interact with 3-7 touchpoints before purchasing | Gartner | Multi-touch is the reality |
| 61% of B2B deals involve some form of word-of-mouth | Demand Gen Report | Dark social is real |
| Referral-sourced deals close at 3-5x the rate of cold outbound | Influitive | Channel quality varies wildly |
| LinkedIn-sourced deals have 2x higher average deal size in B2B | LinkedIn Marketing Solutions | Channel affects deal size, not just volume |
| Content-sourced leads have 6x higher close rates than outbound | DemandMetric | But 6-12 month attribution lag |

### Frameworks & Models

- **Channel Attribution Matrix:**

| Channel | Typical Volume | Typical Close Rate | Typical CAC | Best For |
|---------|---------------|-------------------|-------------|----------|
| Outbound Email | High | 2-5% | Medium | Volume, predictability |
| LinkedIn | Medium | 5-15% | Medium (time-heavy) | Relationship, B2B |
| Content/Inbound | Low→High | 10-20% | Low (long-term) | Authority, compounding |
| Referral | Low | 30-50% | Very Low | Highest quality |
| Community | Low-Medium | 10-25% | Low (time-heavy) | Trust, niche markets |
| Paid Ads | Medium-High | 1-3% | High | Scale, testing |

### Artifact Component

**Channel Attribution Tracker** — CRM report template tracking lead source → meetings → wins → revenue by channel, with channel ROI calculation.

### Interactive Element

**Simulation:** Student reviews 15 deal histories with multi-touch journeys. Must assign first-touch attribution and calculate per-channel ROI. AI reveals optimal allocation.

---

## LESSON 8: Building Dashboards in Sheets, CRM, or Metabase (50 min)

### Key Topics

1. **Google Sheets as Free Dashboard** — Good enough for 80% of solo founders. Manual data entry (15 min/week) or Zapier/Make import. Charts, conditional formatting, and formulas. Shareable and versioned.
2. **CRM Built-In Reporting** — HubSpot: good free dashboards (5 custom reports). Pipedrive: Insights dashboards on all plans. Attio: flexible views and charts. Close: built-in pipeline reports.
3. **Metabase (Free Self-Hosted)** — Open-source BI tool. Connects to any database. Auto-generates dashboards. Free self-hosted on a $5/mo VPS. Best for technical founders with a database.
4. **Dashboard Design Principles** — One page, 5-7 metrics max, updated weekly. Use conditional color coding (red/yellow/green). Place the most important metric in the top-left. No vanity metrics.
5. **Connecting Data Sources** — CRM → Sheets via Zapier ($0-20/mo). CRM → Metabase via API/database. Manual entry is fine if you have <50 deals/month.
6. **Dashboard Templates** — Provide pre-built templates for each tool: Google Sheets funnel + velocity + MRR dashboard, HubSpot report configurations, Metabase query templates.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Google Sheets: free, 10M cells per spreadsheet | Google | More than enough for solo founder analytics |
| Metabase: free self-hosted, $85/mo cloud (10 users) | Metabase pricing 2025-2026 | Best free BI for technical founders |
| HubSpot Free: 5 custom dashboards | HubSpot 2025-2026 | Sufficient for 5-metric starter dashboard |
| Pipedrive: Insights dashboards on all plans ($14+/mo) | Pipedrive 2025-2026 | Built-in, no extra tools needed |
| 76% of sales leaders say they don't have the right dashboards | Salesforce | Even big teams get this wrong |

### Tools to Reference

| Tool | Type | Price | Best For |
|------|------|-------|----------|
| Google Sheets | Spreadsheet | Free | Manual tracking, <50 deals/month |
| HubSpot Dashboards | CRM Built-In | Free (5 dashboards) | If already using HubSpot |
| Pipedrive Insights | CRM Built-In | Included ($14+/mo) | If already using Pipedrive |
| Metabase | Self-Hosted BI | Free (self-hosted) | Technical founders with database |
| Geckoboard | Dashboard | $49/mo | Real-time TV dashboard (optional) |
| Klipfolio | Dashboard | $90/mo | Multi-source dashboards (optional) |

### Artifact Component

**Dashboard Templates** — Pre-built templates for Google Sheets (funnel, velocity, MRR, attribution) and CRM report configurations.

### Interactive Element

**Guided Build:** Student selects their tool (Sheets, CRM, or Metabase). AI generates a dashboard template pre-configured with their pipeline stages and metrics from previous lessons.

---

## LESSON 9: Weekly Metrics Review Ritual (45 min)

### Key Topics

1. **The 30-Minute Friday Review** — Every Friday at a fixed time. Same agenda, same order, same dashboard. Consistency builds pattern recognition.
2. **The Review Agenda** — (1) Funnel snapshot: volume and conversion at each stage (5 min). (2) Velocity check: any deals exceeding 2x average stage duration? (5 min). (3) Forecast update: move deals between commit/upside (5 min). (4) Channel check: which source produced the most meetings this week? (5 min). (5) Action items: 3 specific actions for next week (10 min).
3. **Pattern Recognition** — After 4-8 weeks of consistent reviews, you'll start seeing patterns: "LinkedIn leads close faster," "proposals sent on Mondays close more," "deals with 2+ meetings close at 3x the rate."
4. **The "So What?" Test** — For every metric: so what? What will you do differently? If the answer is "nothing," stop tracking it.
5. **Monthly Deep Dive** — First Friday of each month: add unit economics review (CAC, LTV, payback), MRR waterfall, and channel ROI. Takes 60 minutes instead of 30.
6. **Accountability Mechanisms** — Share your weekly metrics with an accountability partner, mentor, or community. The act of reporting creates discipline.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Teams with weekly pipeline reviews have 15-20% higher win rates | CSO Insights | Consistency beats complexity |
| It takes 4-8 weeks of data to identify meaningful patterns | Statistical practice | Don't make decisions on 1-2 weeks of data |
| Sales reps who review metrics weekly outperform those who don't by 20-30% | Salesforce | Applies to solo founders too |
| Written accountability increases goal achievement by 42% | Dominican University study | Share your metrics with someone |

### Frameworks & Models

- **The 30-Minute Friday Review:**

| Segment | Duration | Questions |
|---------|----------|-----------|
| Funnel Snapshot | 5 min | How many at each stage? What are conversion rates? |
| Velocity Check | 5 min | Any deals stuck >2x average? What's the next action? |
| Forecast Update | 5 min | Commit total? Upside total? Any changes? |
| Channel Check | 5 min | Which source produced the most meetings? |
| Action Items | 10 min | 3 specific actions for next week |

### Artifact Component

**Weekly Metrics Review Template** — Standardized review agenda with questions, dashboard screenshots, and action item tracker.

### Interactive Element

**Simulation:** Student receives 4 weeks of sample pipeline data. Must conduct a Friday review for each week, identify trends, and propose actions. AI coach provides feedback on pattern recognition quality.

---

## LESSON 10: Your Analytics Playbook (45 min)

### Key Topics

1. **The Complete Analytics Stack Review** — Walk through all 9 lessons' artifacts and verify completeness
2. **The 7-Day Analytics Sprint** — Day 1: Set up dashboard tool (Sheets/CRM/Metabase). Day 2: Build funnel dashboard. Day 3: Add velocity tracking. Day 4: Configure forecast model. Day 5: Calculate unit economics. Day 6: Set up MRR waterfall and attribution. Day 7: Conduct first Friday review.
3. **Integration with CRM** — Your Course 40 CRM is the data source. Dashboards should pull from CRM, not duplicate data. One source of truth.
4. **Handoff to Course 42** — Analytics reveals bottlenecks. Automation (Course 42) fixes them. Analytics → identify problem → automate solution → measure improvement.
5. **Continuous Improvement Cycle** — Measure → Identify bottleneck → Hypothesis → Test → Measure again. 90-day improvement targets: improve the weakest conversion rate by 10%.
6. **The AI Analytics Future** — Preview: AI that answers "Why did we lose 3 deals this week?" from your CRM data. Requires the AI-ready schema from Course 40.

### Frameworks & Models

**7-Day Analytics Sprint:**

| Day | Activity | Output |
|-----|----------|--------|
| 1 | Choose and configure dashboard tool | Dashboard tool live |
| 2 | Build funnel dashboard (stages + conversion rates) | Funnel dashboard |
| 3 | Add pipeline velocity tracking | Velocity tracker |
| 4 | Configure commit/upside forecast model | Forecast model |
| 5 | Calculate CAC, LTV, payback by channel | Unit economics model |
| 6 | Set up MRR waterfall and channel attribution | Revenue tracking |
| 7 | Conduct first Friday review using full dashboard | Review completed |

### Artifact Component

**Complete Analytics Playbook** (Primary Course Artifact) — Compiles all lesson artifacts: Metrics Philosophy Map, Funnel Dashboard, Velocity Tracker, Forecast Model, Unit Economics Calculator, MRR Waterfall, Channel Attribution, Dashboard Templates, Weekly Review Template.

### Interactive Element

**Implementation Sprint Launcher:** AI generates personalized 7-day sprint calendar. Daily check-ins verify setup progress. Day 7: first complete Friday review scored by AI.

---

## TOOL PRICING SUMMARY

### Dashboard Tools

| Tool | Price | Best For |
|------|-------|----------|
| Google Sheets | Free | Manual tracking, universal |
| HubSpot Dashboards | Free (5 custom) | HubSpot CRM users |
| Pipedrive Insights | Included ($14+/mo) | Pipedrive CRM users |
| Metabase (self-hosted) | Free | Technical founders with database |
| Metabase Cloud | $85/mo | Non-technical who want BI |

### Always-Free Analytics
Google Sheets, HubSpot Free dashboards, Google Analytics 4, Google Search Console

---

## ALL ARTIFACTS CREATED

1. Metrics Philosophy Map (L1)
2. Funnel Dashboard Template (L2)
3. Pipeline Velocity Tracker (L3)
4. Forecast Model Template — commit/upside + stage-weighted (L4)
5. Unit Economics Calculator — CAC, LTV, payback, LTV:CAC (L5)
6. MRR Waterfall Dashboard (L6)
7. Channel Attribution Tracker (L7)
8. Dashboard Templates — Sheets, CRM, Metabase (L8)
9. Weekly Metrics Review Template (L9)
10. Complete Analytics Playbook (L10) — compiles all above

**Completion Badge:** "Analytics Architect" — 200 XP
