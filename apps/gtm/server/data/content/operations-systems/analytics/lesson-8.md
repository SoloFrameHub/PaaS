---
title: "Building Dashboards in Sheets, CRM, or Metabase"
duration: "50 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 8
---

You've spent seven lessons building metrics frameworks, funnel models, and forecast calculators. Now you have a problem: **all that data lives in your head, scattered spreadsheets, and CRM notes.**

Here's what happened to Marcus, a technical founder selling dev tools:

He tracked everything. Conversion rates in one Google Sheet. MRR calculations in another. Pipeline velocity in a Notion doc. Channel attribution in his CRM. Every Friday, he spent 90 minutes copying numbers between tools, rebuilding charts, and trying to remember what changed since last week.

Then a potential investor asked: "What's your month-over-month pipeline growth?"

Marcus spent 3 hours reconstructing the answer. He missed the follow-up call.

**The lesson:** Analytics without dashboards is like code without version control. You're doing the work twice, and you can't see patterns.

This lesson fixes that. You'll build a single-page dashboard that answers your 3 core questions in under 5 minutes every Friday. No $500/month BI tools. No data engineering degree. Just Google Sheets, your CRM, or a free self-hosted Metabase instance.

By the end, you'll have a live dashboard pulling real data.

---

## The Dashboard Philosophy: One Page, Five Minutes, Zero Vanity

<InsightCard icon="📊" title="The 5-Metric Rule">
Your dashboard should have 5-7 metrics maximum. If you can't explain why a metric changes your next action, delete it.
</InsightCard>

Most founders build dashboards backwards. They start with "what data do I have?" instead of "what decisions do I need to make?"

Here's the right sequence:

<SlideNavigation>
<Slide title="Step 1: List Your Decisions">
What will you actually do differently based on metrics?

- "If MQL→SQL conversion drops below 20%, I'll revisit ICP targeting"
- "If pipeline velocity exceeds 45 days, I'll automate follow-ups"
- "If LinkedIn CAC is 2x email CAC, I'll shift time allocation"

**Action:** Write 3 decisions you make monthly based on data.
</Slide>

<Slide title="Step 2: Identify Required Metrics">
Each decision needs 1-2 metrics:

- ICP targeting decision → MQL→SQL conversion rate
- Follow-up decision → Average days per pipeline stage
- Time allocation decision → CAC by channel

**Action:** Map each decision to its metric.
</Slide>

<Slide title="Step 3: Choose the Simplest Tool">
Don't pick the tool first. Pick based on:

- **Data volume:** &lt;50 deals/month → Google Sheets. 50-500 → CRM dashboards. 500+ → Metabase.
- **Technical comfort:** Non-technical → CRM built-in. Technical → Metabase.
- **Budget:** $0 → Sheets or self-hosted Metabase. $14-50/mo → CRM dashboards.

**Action:** Based on your volume and skills, which tool fits?
</Slide>
</SlideNavigation>

<RangeSlider 
  label="How many active deals do you manage per month?" 
  min={0} 
  max={200} 
  step={10}
  lowLabel="0-20" 
  highLabel="150+" 
  persistKey="analytics-L8-deal-volume" 
/>

<ContextualNote showWhen={{ dealVolume: { max: 50 } }} variant="personalized" title="Recommendation: Start with Google Sheets">
With under 50 deals/month, manual data entry takes 10-15 minutes weekly. Sheets gives you full control, zero cost, and easy sharing. Automate later if you scale.
</ContextualNote>

<ContextualNote showWhen={{ dealVolume: { min: 51, max: 150 } }} variant="personalized" title="Recommendation: Use Your CRM's Built-In Dashboards">
At your volume, manual entry becomes a bottleneck. HubSpot, Pipedrive, and Attio all have dashboards that auto-update from your pipeline. Use those first before adding external tools.
</ContextualNote>

<ContextualNote showWhen={{ dealVolume: { min: 151 } }} variant="personalized" title="Recommendation: Consider Metabase">
At 150+ deals/month, you need automation. If you're technical, self-host Metabase (free) and connect it to your CRM database. If not, use your CRM's advanced reporting tier.
</ContextualNote>

---

## Option 1: Google Sheets Dashboard (The 80% Solution)

Google Sheets is the Swiss Army knife of solo founder analytics. It's free, familiar, and flexible. Here's how to build a complete dashboard in 60 minutes.

### The 5-Tab Structure

<FlipCard 
  front="Why 5 tabs instead of 1?" 
  back="Separation of concerns. Raw data in one tab, calculations in another, dashboard in a third. This prevents accidental overwrites and makes debugging easier." 
/>

Your Sheets dashboard has 5 tabs:

1. **Raw Data** — Manual entry or Zapier imports. Never touch formulas here.
2. **Calculations** — All conversion rates, velocities, and aggregations. Reference Raw Data tab.
3. **Dashboard** — The one-page view with charts and conditional formatting.
4. **Historical** — Archive of weekly snapshots for trend analysis.
5. **Config** — Your pipeline stages, ICP definitions, and benchmark targets.

### Building the Funnel Dashboard

<TemplateBuilder
  title="Funnel Data Entry"
  persistKey="analytics-L8-funnel-template"
  sections={[
    {
      id: "stages",
      title: "Pipeline Stages",
      fields: [
        { id: "mql", label: "MQLs This Week", placeholder: "e.g., 45", type: "number" },
        { id: "sql", label: "SQLs This Week", placeholder: "e.g., 12", type: "number" },
        { id: "meeting", label: "Meetings Held", placeholder: "e.g., 8", type: "number" },
        { id: "proposal", label: "Proposals Sent", placeholder: "e.g., 5", type: "number" },
        { id: "won", label: "Deals Won", placeholder: "e.g., 2", type: "number" }
      ]
    }
  ]}
/>

Now the formulas:

```
// In Calculations tab
MQL→SQL Conversion = SQL / MQL
SQL→Meeting Conversion = Meeting / SQL
Meeting→Proposal Conversion = Proposal / Meeting
Proposal→Won Conversion = Won / Proposal
Overall MQL→Won = Won / MQL
```

**Conditional formatting rules:**

- Green: Above benchmark (MQL→SQL >25%, SQL→Meeting >50%, etc.)
- Yellow: Within 10% of benchmark
- Red: Below benchmark by >10%

<ExampleCard label="Marcus's Funnel Dashboard">
Marcus set up his Sheets dashboard in 45 minutes. Every Friday, he enters 5 numbers (MQL, SQL, Meeting, Proposal, Won). Formulas calculate conversion rates. Conditional formatting instantly shows him his bottleneck.

Week 1: MQL→SQL was red (15%). He realized his Apollo filters were too broad.

Week 4: After tightening ICP, MQL→SQL hit 28% (green). But SQL→Meeting dropped to 35% (red). His outreach messaging needed work.

**The pattern:** One glance, one bottleneck, one action.
</ExampleCard>

### Adding Charts

Google Sheets charts are underrated. Here's the 3-chart minimum:

1. **Funnel Bar Chart** — Horizontal bars showing volume at each stage, sized proportionally
2. **Conversion Rate Line Chart** — Weekly trend of your weakest conversion rate
3. **MRR Waterfall** — Stacked column showing New + Expansion - Contraction - Churn

<InsightCard icon="📈" title="Chart Design Tip">
Use the same color scheme across all charts. Green = positive, red = negative, blue = neutral. Your brain will pattern-match faster.
</InsightCard>

### Connecting Data Sources

Manual entry is fine for &lt;50 deals/month. But if you want automation:

**Zapier (Free tier: 100 tasks/month)**
- Trigger: New deal in CRM
- Action: Add row to Google Sheets
- Maps: Deal name, stage, value, source, created date

**Make.com (Free tier: 1,000 operations/month)**
- Same flow as Zapier, but more flexible filtering
- Can aggregate data before writing (e.g., weekly summaries instead of per-deal rows)

**Google Apps Script (Free, requires coding)**
- Fetch CRM data via API
- Write to Sheets
- Schedule to run daily via time-based trigger

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Skip Zapier. Write a 50-line Python script that hits your CRM API and writes to Sheets via the Google Sheets API. Run it as a daily cron job. You'll have full control and zero recurring cost.
</ContextualNote>

<InteractiveChecklist 
  title="Google Sheets Dashboard Setup" 
  persistKey="analytics-L8-sheets-checklist" 
  items={[
    "Create 5-tab structure (Raw Data, Calculations, Dashboard, Historical, Config)",
    "Define pipeline stages in Config tab",
    "Set up funnel data entry in Raw Data tab",
    "Write conversion rate formulas in Calculations tab",
    "Apply conditional formatting (green/yellow/red benchmarks)",
    "Create 3 core charts (funnel, conversion trend, MRR waterfall)",
    "Test with 2 weeks of sample data",
    "Set up Zapier/Make automation OR schedule manual entry time"
  ]} 
/>

---

## Option 2: CRM Built-In Dashboards (The Integrated Solution)

If you're already using HubSpot, Pipedrive, Attio, or Close, you have dashboards built in. Use them first before adding external tools.

### HubSpot Free Dashboards (5 Custom Reports)

HubSpot Free gives you 5 custom dashboards. Here's how to use them:

<SlideNavigation>
<Slide title="Dashboard 1: Funnel Overview">
**Reports to add:**
- Deal count by stage (bar chart)
- Conversion rates between stages (table)
- Overall pipeline value (single stat)

**Filters:** Date range = Last 30 days, Deal type = New Business

**Refresh:** Auto-updates as deals move
</Slide>

<Slide title="Dashboard 2: Pipeline Velocity">
**Reports to add:**
- Average time in each stage (table)
- Deals exceeding 2x average stage duration (list)
- Total sales cycle length trend (line chart)

**Filters:** Only deals created in last 90 days

**Action trigger:** Any deal >2x average gets a manual review
</Slide>

<Slide title="Dashboard 3: Revenue Tracking">
**Reports to add:**
- MRR by month (column chart)
- New vs Expansion vs Churned MRR (stacked column)
- NRR calculation (custom formula report)

**Filters:** Subscription deals only

**Refresh:** First of each month
</Slide>

<Slide title="Dashboard 4: Channel Attribution">
**Reports to add:**
- Deals won by original source (pie chart)
- Revenue by original source (bar chart)
- Conversion rate by source (table)

**Filters:** Won deals only, last 90 days

**Insight:** Which channel has the highest win rate, not just volume?
</Slide>

<Slide title="Dashboard 5: Weekly Snapshot">
**Reports to add:**
- Deals created this week (single stat)
- Meetings held this week (single stat)
- Proposals sent this week (single stat)
- Deals won this week (single stat)
- Week-over-week % change (sparklines)

**Use case:** Your Friday review dashboard
</Slide>
</SlideNavigation>

<ExampleCard label="Sarah's HubSpot Setup">
Sarah, a coaching business founder, used all 5 HubSpot Free dashboards:

1. Funnel Overview → Pinned to browser tab, checks daily
2. Pipeline Velocity → Reviews every Monday to identify stalled deals
3. Revenue Tracking → Reviews first Friday of each month
4. Channel Attribution → Reviews monthly to adjust time allocation
5. Weekly Snapshot → Her Friday review dashboard

**Time investment:** 2 hours to set up all 5. Now spends 5 minutes/week updating.

**Result:** Identified that LinkedIn-sourced leads closed at 3x the rate of cold email, despite lower volume. Shifted 60% of outreach time to LinkedIn. Revenue up 40% in 90 days.
</ExampleCard>

### Pipedrive Insights (All Plans)

Pipedrive includes Insights dashboards on all plans ($14+/mo). Key features:

- **Pre-built reports:** Funnel conversion, deals won/lost, revenue forecast, activity tracking
- **Custom reports:** Drag-and-drop builder, no SQL required
- **Goals tracking:** Set monthly targets (e.g., 10 deals won, $50K revenue), dashboard shows progress
- **Scheduled emails:** Auto-send dashboard snapshot every Friday

**Setup time:** 30 minutes for a complete dashboard.

**Best for:** Founders who want plug-and-play with minimal configuration.

### Attio Flexible Views

Attio's strength is custom views. You can create:

- **List views:** Deals grouped by stage with custom columns (age, value, next action)
- **Board views:** Kanban-style pipeline with deal cards
- **Chart views:** Funnel, revenue trend, velocity metrics

**Unique feature:** Attio's "Computed fields" let you write formulas directly in the CRM (e.g., "Days since last contact" or "Deal velocity score").

**Best for:** Technical founders who want CRM + lightweight BI in one tool.

<ComparisonBuilder
  title="Your CRM Dashboard Plan"
  persistKey="analytics-L8-crm-plan"
  prompt="Describe your current CRM and what dashboards you need"
  expertExample="I use HubSpot Free. I need: (1) Weekly funnel snapshot, (2) Pipeline velocity by stage, (3) MRR waterfall. I'll use 3 of my 5 custom dashboards and refresh them every Friday."
  criteria={[
    "Specifies which CRM",
    "Lists 3-5 specific reports needed",
    "Defines refresh cadence"
  ]}
/>

---

## Option 3: Metabase (The Technical Founder's BI Tool)

Metabase is open-source business intelligence. It's free if you self-host, or $85/mo for cloud (10 users).

**When to use Metabase:**
- You have 150+ deals/month and manual entry is painful
- You're technical and comfortable with databases
- You want to combine CRM data with other sources (Stripe, Google Analytics, product usage)

### Self-Hosting Metabase (Free)

<SlideNavigation>
<Slide title="Step 1: Spin Up a VPS">
**Providers:**
- DigitalOcean: $6/mo droplet (1GB RAM)
- Hetzner: €4.5/mo VPS
- Linode: $5/mo Nanode

**OS:** Ubuntu 22.04 LTS

**Time:** 5 minutes
</Slide>

<Slide title="Step 2: Install Metabase">
**Via Docker (recommended):**

```bash
docker run -d -p 3000:3000 \
  -v ~/metabase-data:/metabase-data \
  -e "MB_DB_FILE=/metabase-data/metabase.db" \
  --name metabase metabase/metabase
```

**Access:** http://your-server-ip:3000

**Time:** 10 minutes
</Slide>

<Slide title="Step 3: Connect Your Database">
Metabase connects to:
- PostgreSQL (HubSpot, Attio if you export)
- MySQL (Close CRM)
- Google Sheets (via CSV export + scheduled import)
- Stripe (via API)

**Setup:** Add database connection in Metabase admin panel.

**Time:** 15 minutes
</Slide>

<Slide title="Step 4: Build Your First Dashboard">
Metabase auto-generates suggested questions:
- "How many deals were created this month?"
- "What's the average deal value by source?"
- "Show me revenue trend over time"

Click a suggestion → Metabase writes the SQL → You see a chart.

**Customization:** Drag-and-drop filters, chart types, and groupings.

**Time:** 20 minutes for a 5-chart dashboard
</Slide>
</SlideNavigation>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Metabase's killer feature: **SQL mode**. You can write custom queries and save them as reusable "questions." Example:

```sql
SELECT 
  DATE_TRUNC('week', created_at) AS week,
  source,
  COUNT(*) AS deals,
  AVG(value) AS avg_value,
  COUNT(*) FILTER (WHERE stage = 'won') AS wins,
  COUNT(*) FILTER (WHERE stage = 'won')::float / COUNT(*) AS win_rate
FROM deals
WHERE created_at > NOW() - INTERVAL '90 days'
GROUP BY week, source
ORDER BY week DESC;
```

This gives you weekly deal volume, average value, and win rate by source. Save it as a "question," add it to a dashboard, and it auto-refreshes.
</ContextualNote>

### Metabase Dashboard Examples

**Funnel Dashboard:**
- Bar chart: Deal count by stage
- Table: Conversion rates between stages
- Line chart: Weekly funnel volume trend

**Velocity Dashboard:**
- Table: Average days per stage
- List: Deals exceeding 2x average duration
- Line chart: Total cycle length trend

**Revenue Dashboard:**
- Column chart: MRR by month
- Stacked column: New/Expansion/Churned MRR
- Single stat: Current MRR and MoM % change

**Channel Attribution Dashboard:**
- Pie chart: Deals won by source
- Bar chart: Revenue by source
- Table: Win rate and CAC by source

<ExampleCard label="Jake's Metabase Setup">
Jake, a dev tools founder, self-hosted Metabase on a $6/mo DigitalOcean droplet. He connected it to his PostgreSQL database (exported weekly from HubSpot via API script).

**Dashboards built:**
1. Weekly funnel snapshot (5 charts)
2. Pipeline velocity by source (3 charts)
3. MRR waterfall with churn cohorts (4 charts)
4. Channel ROI calculator (2 charts + custom SQL)

**Time investment:** 4 hours initial setup, 0 hours/week maintenance (auto-refreshes).

**Result:** Discovered that GitHub-sourced leads had 60% win rate vs 15% for cold email. Shifted all outreach to GitHub issue engagement. Closed 8 deals in 30 days.
</ExampleCard>

<InteractiveChecklist 
  title="Metabase Setup (Technical Founders)" 
  persistKey="analytics-L8-metabase-checklist" 
  items={[
    "Provision a $5-6/mo VPS (DigitalOcean, Hetzner, Linode)",
    "Install Metabase via Docker",
    "Connect to your CRM database (or set up scheduled CSV imports)",
    "Explore auto-generated questions",
    "Build funnel dashboard (3-5 charts)",
    "Build velocity dashboard (3-5 charts)",
    "Build revenue dashboard (3-5 charts)",
    "Set up email delivery of dashboard snapshot every Friday"
  ]} 
/>

---

## Dashboard Design Principles (Universal)

Regardless of tool, these principles apply:

### 1. One Page, No Scrolling

<InsightCard icon="🎯" title="The Glance Test">
If you can't understand your dashboard in 10 seconds, it's too complex. Simplify until you can.
</InsightCard>

Your dashboard should fit on one screen. No scrolling. No tabs. Everything visible at once.

**Why?** Pattern recognition requires seeing all metrics simultaneously. If you have to scroll, you miss correlations.

**How?** Limit to 5-7 metrics. Use small multiples (same chart type, different data). Remove legends and labels where obvious.

### 2. Conditional Formatting (Traffic Lights)

Use color to encode meaning:

- **Green:** Above target or benchmark
- **Yellow:** Within 10% of target
- **Red:** Below target by >10%

Your brain processes color faster than numbers. You should see "3 reds, 2 greens" before you read the actual values.

<FlipCard 
  front="Why not use more colors?" 
  back="More than 3 colors creates cognitive load. Red/yellow/green is universal and requires zero learning. Stick with it." 
/>

### 3. Trends Over Snapshots

Every metric should show:
- **Current value** (this week)
- **Trend** (last 4-8 weeks)
- **Benchmark** (your target or industry average)

**Example:** Don't just show "MQL→SQL: 22%". Show "MQL→SQL: 22% (↑ from 18% last week, target 25%)".

Sparklines (tiny line charts) are perfect for this. Google Sheets has them built in.

### 4. The "So What?" Label

Every chart needs a one-sentence interpretation:

- "Pipeline velocity increased 15% → Follow-up automation is working"
- "LinkedIn CAC is 3x email CAC → Shift time to email"
- "Proposal→Won rate dropped to 15% → Revisit pricing or demo"

Don't make yourself re-interpret every week. Write the interpretation once, update the data.

<TemplateBuilder
  title="Dashboard Metric Card"
  persistKey="analytics-L8-metric-card"
  sections={[
    {
      id: "metric",
      title: "Metric Definition",
      fields: [
        { id: "name", label: "Metric Name", placeholder: "e.g., MQL→SQL Conversion", type: "text" },
        { id: "current", label: "Current Value", placeholder: "e.g., 22%", type: "text" },
        { id: "trend", label: "Trend (last 4 weeks)", placeholder: "e.g., 18% → 20% → 21% → 22%", type: "text" },
        { id: "target", label: "Target / Benchmark", placeholder: "e.g., 25%", type: "text" },
        { id: "interpretation", label: "So What?", placeholder: "e.g., Improving but still below target. Need tighter ICP filters.", type: "textarea" }
      ]
    }
  ]}
/>

### 5. Update Cadence Discipline

**Weekly metrics:** Update every Friday at the same time. Block 30 minutes on your calendar. Non-negotiable.

**Monthly metrics:** First Friday of each month, add 30 minutes for unit economics and channel review.

**Quarterly metrics:** First Friday of Q2, Q3, Q4, Q1 — add 60 minutes for strategic review.

**Why the discipline?** Consistency builds pattern recognition. After 8-12 weeks, you'll start seeing trends you'd never notice with sporadic updates.

<RangeSlider 
  label="How confident are you that you'll update your dashboard weekly?" 
  min={1} 
  max={10} 
  lowLabel="Not confident" 
  highLabel="Very confident" 
  persistKey="analytics-L8-update-confidence" 
/>

<ContextualNote showWhen={{ updateConfidence: { max: 6 } }} variant="warning" title="Low Confidence Alert">
If you're not confident you'll update weekly, automate it. Use Zapier, Make, or a script to pull data automatically. Manual dashboards only work if you have the discipline. If not, invest 2 hours in automation now to save 10 hours of inconsistency later.
</ContextualNote>

---

## Connecting Multiple Data Sources

Most solo founders need to combine:
- CRM data (deals, pipeline, activities)
- Stripe data (MRR, churn, expansion)
- Marketing data (traffic, leads, conversions)
- Time tracking (hours per channel)

Here's how to centralize it:

### The Google Sheets Hub-and-Spoke Model

**Hub:** One master Google Sheet with tabs for each data source.

**Spokes:** Zapier/Make automations pulling from each tool into the hub.

**Example flow:**
1. HubSpot deal won → Zapier → Add row to "CRM Deals" tab
2. Stripe subscription created → Zapier → Add row to "Revenue" tab
3. Google Analytics goal completed → Zapier → Add row to "Marketing" tab
4. Toggl time entry → Zapier → Add row to "Time Tracking" tab

**Dashboard tab:** References all other tabs with `VLOOKUP`, `SUMIF`, and `QUERY` formulas.

**Cost:** Free if &lt;100 Zaps/month. $20/mo for 750 Zaps.

### The Metabase Multi-Database Model

Metabase can connect to multiple databases simultaneously:

- PostgreSQL (CRM export)
- MySQL (product database)
- Google Sheets (manual data via CSV import)

You can then write SQL queries that join across databases:

```sql
SELECT 
  crm.source,
  COUNT(crm.deal_id) AS deals,
  SUM(stripe.mrr) AS total_mrr,
  AVG(product.usage_score) AS avg_usage
FROM crm_deals crm
LEFT JOIN stripe_subscriptions stripe ON crm.customer_id = stripe.customer_id
LEFT JOIN product_usage product ON crm.customer_id = product.user_id
WHERE crm.created_at > NOW() - INTERVAL '90 days'
GROUP BY crm.source;
```

This gives you deals, revenue, and product usage by acquisition channel in one query.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
If you're comfortable with SQL, Metabase's multi-database queries are a superpower. You can answer questions like "Which acquisition channel produces customers with the highest product engagement?" in 5 minutes.

Non-technical founders: stick with the Google Sheets hub model. It's simpler and good enough.
</ContextualNote>

---

## Dashboard Maintenance and Evolution

Your dashboard isn't static. It evolves as your business grows.

### Month 1-3: The Starter Dashboard

**Metrics:**
1. Prospects added/week
2. Meetings booked/week
3. Pipeline value
4. Win rate
5. Revenue (MRR or cash collected)

**Why these?** They answer the 3 core questions with minimal complexity.

**Update frequency:** Weekly, 15 minutes.

### Month 4-6: Add Velocity and Attribution

**New metrics:**
6. Average days per pipeline stage
7. Deals by source (channel attribution)

**Why now?** You have 12-24 weeks of data. Trends are visible. You can identify bottlenecks and optimize channels.

**Update frequency:** Weekly, 20 minutes.

### Month 7-12: Add Unit Economics

**New metrics:**
8. CAC by channel
9. LTV by cohort
10. Payback period

**Why now?** You have enough customers to calculate meaningful LTV. You can make ROI-based channel decisions.

**Update frequency:** Weekly for CAC, monthly for LTV.

### Year 2+: Add Predictive Metrics

**New metrics:**
11. Pipeline coverage ratio (pipeline value / monthly target × 3)
12. Churn risk score (product usage + payment history)
13. Expansion opportunity score (usage growth + feature requests)

**Why now?** You're optimizing, not just surviving. Predictive metrics help you act before problems hit.

**Update frequency:** Monthly.

<StrategyDuel
  title="Dashboard Complexity: Start Simple vs. Build Complete"
  persistKey="analytics-L8-complexity-duel"
  scenario="You're setting up your first dashboard. Do you start with 5 metrics or build the full 13-metric system now?"
  strategyA={{ 
    name: "Start Simple (5 metrics)", 
    description: "Build the starter dashboard, use it for 90 days, then add metrics as needed", 
    pros: ["Faster setup (1 hour vs 4 hours)", "Easier to maintain", "Builds discipline before complexity"], 
    cons: ["Missing advanced insights early", "Might need to rebuild later"] 
  }}
  strategyB={{ 
    name: "Build Complete (13 metrics)", 
    description: "Build the full dashboard now with all metrics, even if some are empty initially", 
    pros: ["No rebuilding later", "Future-proof", "Captures data from day 1"], 
    cons: ["4-hour setup", "Overwhelming to maintain", "Vanity metrics creep in"] 
  }}
  expertVerdict="Start simple wins for solo founders. You don't have the data to make advanced metrics meaningful yet. Build the 5-metric starter, use it religiously for 90 days, then add 2-3 metrics based on what questions you're asking. Complexity without discipline is worse than simplicity with consistency."
/>

---

## Your Dashboard Build Session

Time to build. Choose your tool and follow the guided build.

<SlideNavigation>
<Slide title="Build Option 1: Google Sheets">
**Time:** 60 minutes

**Steps:**
1. Copy the [Starter Dashboard Template](#) (link to template)
2. Customize pipeline stages in Config tab
3. Enter 2 weeks of sample data in Raw Data tab
4. Verify formulas calculate correctly in Calculations tab
5. Review Dashboard tab — all charts should populate
6. Set up conditional formatting (green/yellow/red)
7. Schedule Friday calendar block for weekly updates

**Deliverable:** Live dashboard with 2 weeks of data
</Slide>

<Slide title="Build Option 2: HubSpot Dashboards">
**Time:** 45 minutes

**Steps:**
1. Go to Reports → Dashboards → Create Dashboard
2. Add "Deals by Stage" report (bar chart)
3. Add "Conversion Rates" report (table with custom formulas)
4. Add "Pipeline Value" report (single stat)
5. Add "Deals Won This Week" report (single stat)
6. Add "Week-over-Week Change" report (sparkline)
7. Pin dashboard to browser tab

**Deliverable:** Live HubSpot dashboard auto-updating from CRM
</Slide>

<Slide title="Build Option 3: Pipedrive Insights">
**Time:** 30 minutes

**Steps:**
1. Go to Insights → Create Dashboard
2. Add pre-built "Conversion Funnel" report
3. Add pre-built "Deals Won vs Lost" report
4. Add custom "Revenue Trend" report (drag-and-drop builder)
5. Add custom "Deals by Source" report
6. Set up weekly email delivery (Settings → Schedule)

**Deliverable:** Live Pipedrive dashboard with weekly email snapshot
</Slide>

<Slide title="Build Option 4: Metabase (Technical)">
**Time:** 2 hours (includes server setup)

**Steps:**
1. Provision VPS and install Metabase (30 min)
2. Connect to CRM database or set up CSV import (20 min)
3. Explore auto-generated questions (10 min)
4. Create "Funnel Overview" dashboard (20 min)
5. Create "Pipeline Velocity" dashboard (20 min)
6. Create "Revenue Tracking" dashboard (20 min)
7. Set up email delivery of dashboard snapshot

**Deliverable:** Self-hosted Metabase with 3 dashboards
</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Your Dashboard Action Plan" 
  persistKey="analytics-L8-action-plan" 
  items={[
    "Choose your tool (Sheets, HubSpot, Pipedrive, or Metabase)",
    "Complete the guided build for your chosen tool",
    "Enter 2 weeks of real or sample data",
    "Verify all calculations and charts work correctly",
    "Set up conditional formatting (green/yellow/red benchmarks)",
    "Schedule Friday calendar block for weekly updates",
    "Share dashboard link with accountability partner or mentor",
    "Conduct first Friday review using the dashboard"
  ]} 
/>

---

## Common Dashboard Mistakes (and How to Fix Them)

### Mistake 1: Too Many Metrics

**Symptom:** Your dashboard has 15+ metrics. You spend 60 minutes updating it. You don't know where to look first.

**Fix:** Apply the "So What?" test. For each metric, ask: "If this changes, what will I do differently?" If the answer is "nothing" or "I don't know," delete it.

**Target:** 5-7 metrics maximum.

### Mistake 2: No Benchmarks

**Symptom:** You see "MQL→SQL: 18%" but don't know if that's good or bad.

**Fix:** Add benchmark columns. Use industry averages from Lesson 2 or set your own targets based on 90-day goals.

**Example:** MQL→SQL target = 25%. Current = 18%. Gap = -7%. Action = Tighten ICP filters.

### Mistake 3: Stale Data

**Symptom:** You update your dashboard sporadically. Last update was 3 weeks ago. You've lost trust in the numbers.

**Fix:** Automate data entry (Zapier/Make) OR block 30 minutes every Friday (non-negotiable calendar event). Treat it like a customer meeting.

**Accountability:** Share your dashboard with someone who will ask "Did you update it this week?"

### Mistake 4: Vanity Metrics Creep

**Symptom:** Your dashboard shows email open rates, LinkedIn followers, and website traffic. None of these change your actions.

**Fix:** Remove any metric that doesn't directly correlate to pipeline or revenue. Open rates don't matter if reply rates are low. Followers don't matter if they're not your ICP.

**Test:** Cover the metric. Does your decision-making change? If not, delete it.

### Mistake 5: No Historical Tracking

**Symptom:** You only see this week's numbers. You can't identify trends or measure improvement.

**Fix:** Add a "Historical" tab (Google Sheets) or enable trend charts (CRM dashboards). Archive weekly snapshots. After 8-12 weeks, you'll see patterns.

**Example:** "MQL→SQL has improved 5% every month for 3 months. The ICP tightening is working."

<LinterFeedback
  title="Dashboard Linter: Score Your Setup"
  persistKey="analytics-L8-dashboard-linter"
  inputLabel="Describe your current dashboard (or paste a screenshot description)"
  rules={[
    { 
      id: "metric-count", 
      label: "Metric Count", 
      description: "5-7 metrics (not 15+)", 
      keywords: ["5 metrics", "6 metrics", "7 metrics"], 
      antiKeywords: ["15 metrics", "20 metrics", "too many"] 
    },
    { 
      id: "benchmarks", 
      label: "Benchmarks Present", 
      description: "Each metric has a target or benchmark", 
      keywords: ["target", "benchmark", "goal"], 
      antiKeywords: ["no targets", "no benchmarks"] 
    },
    { 
      id: "update-cadence", 
      label: "Update Cadence", 
      description: "Weekly update schedule defined", 
      keywords: ["weekly", "every Friday", "scheduled"], 
      antiKeywords: ["whenever", "sporadic", "no schedule"] 
    },
    { 
      id: "conditional-formatting", 
      label: "Conditional Formatting", 
      description: "Red/yellow/green color coding", 
      keywords: ["red", "green", "yellow", "color"], 
      antiKeywords: ["no colors", "black and white"] 
    },
    { 
      id: "historical-tracking", 
      label: "Historical Tracking", 
      description: "Trend data for last 4-8 weeks", 
      keywords: ["trend", "historical", "last 8 weeks"], 
      antiKeywords: ["snapshot only", "no history"] 
    }
  ]}
/>

---

## Integration with Your Weekly Review (Lesson 9 Preview)

Your dashboard is the foundation for your weekly metrics review ritual (Lesson 9). Here's how they connect:

**Friday 3:00 PM (30 minutes):**

1. **Update dashboard** (5 min) — Enter this week's data or verify auto-import worked
2. **Funnel snapshot** (5 min) — Review volume and conversion at each stage
3. **Velocity check** (5 min) — Identify deals stuck >2x average stage duration
4. **Forecast update** (5 min) — Move deals between commit/upside based on new info
5. **Channel check** (5 min) — Which source produced the most meetings this week?
6. **Action items** (5 min) — Write 3 specific actions for next week based on dashboard insights

**Your dashboard makes this possible.** Without it, you'd spend 60 minutes reconstructing numbers from memory and CRM notes.

<InsightCard icon="🎯" title="The Compounding Effect">
Week 1: Dashboard setup feels like overhead.

Week 4: You start seeing patterns.

Week 12: You've made 3 data-driven pivots that increased win rate 15%.

Week 24: Your dashboard has paid for itself 10x in avoided wasted time.

Consistency compounds. Build the dashboard. Use it every week. Trust the process.
</InsightCard>

---

## Summary: Your Dashboard Checklist

<InteractiveChecklist 
  title="Dashboard Build Complete" 
  persistKey="analytics-L8-summary-checklist" 
  items={[
    "Chose dashboard tool based on deal volume and technical comfort",
    "Built 5-metric starter dashboard (prospects, meetings, pipeline, win rate, revenue)",
    "Added conditional formatting (green/yellow/red benchmarks)",
    "Created 3 core charts (funnel, conversion trend, revenue)",
    "Set up data source connection (manual entry, Zapier, or API)",
    "Defined update cadence (weekly Friday 3pm)",
    "Shared dashboard with accountability partner",
    "Scheduled first Friday review for next week",
    "Documented 'So What?' interpretations for each metric",
    "Archived this week's snapshot for historical tracking"
  ]} 
/>

**Next Lesson:** You'll use this dashboard to conduct your first weekly metrics review. You'll learn the 30-minute Friday ritual that turns data into decisions.

**Action for This Week:**
1. Build your dashboard (60-120 minutes depending on tool)
2. Enter 2 weeks of data (real or sample)
3. Verify all formulas and charts work
4. Block Friday 3:00-3:30 PM on your calendar for next 12 weeks
5. Share dashboard link with one person who will hold you accountable

Your dashboard is now live. Use it.