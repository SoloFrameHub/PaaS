---
title: "Simple Health Score: Usage + Engagement + Business"
duration: "55 min"
track: "Customer Success"
course: "Course 37: Retention & Churn Prevention"
lesson: 2
---

You're staring at your customer list. 87 active accounts. You know *someone* is about to churn — you can feel it — but you don't know *who*.

Last month, three customers cancelled without warning. No angry emails. No support tickets. They just... stopped logging in, then quietly cancelled. You lost $450 in MRR before you even noticed.

**This is the "silent churner" problem.** And it's costing you thousands.

The solution isn't working harder or checking in with every customer weekly. The solution is a **health score** — a simple early warning system that turns "I think someone might churn" into "Customer #47's health dropped from 85 to 62 this week — call them today."

In this lesson, you'll build a health scoring system using three dimensions: Usage (40%), Engagement (30%), and Business (30%). No enterprise tools required. Just a Google Sheet, your existing data sources, and 55 minutes.

By the end, you'll have a working health score dashboard that flags at-risk customers 2-4 weeks before they churn.

---

## Why Health Scores Matter (And Why Yours Will Be Simple)

<InsightCard icon="🎯" title="The Core Problem">
Without a health score, you're flying blind. You react to cancellations instead of preventing them. With a health score, you see the warning signs 2-4 weeks early — when save rates are still 40-60%.
</InsightCard>

Here's what the data shows:

- Companies with health scores **detect at-risk customers 45% faster** than those relying on gut feel
- Usage-based signals are **2-3x more predictive** of churn than survey-based signals (NPS alone isn't enough)
- Health scores don't need to be complex: **3-5 inputs outperform 15+ input models** for SMBs

The enterprise CS platforms (Gainsight, Totango) charge $500-2,000/month for health scoring. You're going to build yours in a Google Sheet for free.

<FlipCard 
  front="Why do simple health scores work better for solo founders?" 
  back="Because you can actually maintain them. A 15-input model requires constant data pipeline maintenance. A 3-dimension model (Usage, Engagement, Business) runs on data you already have and updates weekly with minimal effort." 
/>

### The Three Questions Your Health Score Answers

Every health score exists to answer three questions:

1. **Are they using the product?** (Usage dimension — 40% weight)
2. **Are they engaged with us?** (Engagement dimension — 30% weight)
3. **Is the business relationship healthy?** (Business dimension — 30% weight)

If the answer to all three is "yes," the customer is Green (75-100 health score). If one dimension is weak, they're Yellow (50-74). If two or more are weak, they're Red (0-49).

<RangeSlider 
  label="How confident are you that you could identify your top 3 at-risk customers right now?" 
  min={1} 
  max={10} 
  lowLabel="No idea" 
  highLabel="Very confident" 
  persistKey="retention-L2-confidence" 
/>

---

## The Three-Dimension Health Score Model

Here's the framework you're going to build:

<SlideNavigation>
<Slide title="Dimension 1: Usage (40% Weight)">

**Usage is the strongest predictor of retention.** If a customer stops using your product, they will churn. Period.

The three usage signals you'll track:

| Signal | Scoring | Data Source |
|--------|---------|-------------|
| **Login frequency (last 14 days)** | 0 logins = 0<br/>1-3 = 25<br/>4-7 = 50<br/>8-10 = 75<br/>11+ = 100 | Product analytics / GA4 |
| **Core action frequency** | No actions = 0<br/>Below average = 25<br/>Average = 50<br/>Above average = 75<br/>Power user = 100 | Product database |
| **Feature breadth** | 1 feature = 25<br/>2 features = 50<br/>3+ features = 75<br/>All features = 100 | Product analytics |

**Why these three?**

- **Login frequency** catches dormancy early (before they mentally check out)
- **Core action frequency** measures if they're getting value when they do log in
- **Feature breadth** measures switching costs (customers using 3+ features churn 50-70% less)

**Your usage score** = average of these three signals.

<ExampleCard label="Real Example: SaaS Dashboard Tool">
Customer A: 15 logins (100) + 50 actions/week (75) + uses 4 features (75) = **Usage Score: 83**

Customer B: 2 logins (25) + 5 actions/week (25) + uses 1 feature (25) = **Usage Score: 25** ← RED FLAG
</ExampleCard>

</Slide>

<Slide title="Dimension 2: Engagement (30% Weight)">

**Engagement measures if they're paying attention to you.** A customer who ignores your emails, never contacts support, and skips your webinars is mentally checked out — even if they're still logging in.

The three engagement signals you'll track:

| Signal | Scoring | Data Source |
|--------|---------|-------------|
| **Email open rate (last 30 days)** | 0% = 0<br/>&lt;10% = 25<br/>10-25% = 50<br/>25-50% = 75<br/>50%+ = 100 | ESP (ConvertKit, etc.) |
| **Support interaction** | No contact ever = 50<br/>Questions asked = 75<br/>Feedback given = 100<br/>Only complaints = 25 | Support tool / email |
| **NPS score** | 0-4 = 0<br/>5-6 = 25<br/>7-8 = 50<br/>9 = 75<br/>10 = 100 | NPS survey |

**Why these three?**

- **Email open rate** is a passive engagement signal (are they even seeing your updates?)
- **Support interaction** is an active engagement signal — and counterintuitively, customers who submit tickets are **15% less likely to churn** than those who never contact you (engaged vs. disengaged)
- **NPS score** captures sentiment (though it's a lagging indicator, so weight it lowest)

**Your engagement score** = average of these three signals.

<InsightCard icon="⚠️" title="The 'No Contact Ever' Trap">
A customer who never emails support isn't necessarily happy — they might be silently frustrated. That's why "no contact ever" scores 50 (neutral), not 100. Questions and feedback score higher because they indicate engagement.
</InsightCard>

</Slide>

<Slide title="Dimension 3: Business (30% Weight)">

**Business signals measure the commercial health of the relationship.** Are they paying on time? Are they on a high-value plan? Have they been with you long enough to be sticky?

The three business signals you'll track:

| Signal | Scoring | Data Source |
|--------|---------|-------------|
| **Payment history** | Failed payments = 0<br/>Late = 25<br/>On-time = 75<br/>Annual prepaid = 100 | Stripe / billing system |
| **Plan tier** | Free = 25<br/>Basic = 50<br/>Pro = 75<br/>Enterprise = 100 | Billing system |
| **Tenure** | &lt;30 days = 25<br/>1-3 months = 50<br/>3-12 months = 75<br/>12+ months = 100 | CRM / signup date |

**Why these three?**

- **Payment history** is the ultimate leading indicator — failed payments predict churn within 7-14 days
- **Plan tier** correlates with commitment and switching costs (enterprise customers churn less)
- **Tenure** measures stickiness (customers who survive the first 90 days are 3-5x more likely to stay)

**Your business score** = average of these three signals.

</Slide>

<Slide title="Composite Health Score Calculation">

Now you combine all three dimensions with weighted averages:

**Composite Health Score** = (Usage × 0.4) + (Engagement × 0.3) + (Business × 0.3)

**Example:**

- Usage Score: 83
- Engagement Score: 60
- Business Score: 75

**Composite Health Score** = (83 × 0.4) + (60 × 0.3) + (75 × 0.3) = 33.2 + 18 + 22.5 = **73.7**

This customer is **Yellow** (50-74 range) — not urgent, but needs proactive attention.

<FlipCard 
  front="Why is Usage weighted 40% and the others 30%?" 
  back="Because usage is the strongest predictor of churn. A customer who's using the product but ignoring emails might stay. A customer who's stopped using the product will churn, even if they're paying on time." 
/>

</Slide>
</SlideNavigation>

---

## Health Zones and Action Triggers

Your composite health score maps to three zones:

<ClassifyExercise
  title="Classify These Customers by Health Zone"
  persistKey="retention-L2-classify"
  categories={[
    { id: "green", label: "Green (75-100)", color: "#10b981" },
    { id: "yellow", label: "Yellow (50-74)", color: "#f59e0b" },
    { id: "red", label: "Red (0-49)", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Health Score: 88 — High usage, high engagement, annual plan", correctCategory: "green" },
    { id: "2", content: "Health Score: 62 — Moderate usage, low email opens, on-time payments", correctCategory: "yellow" },
    { id: "3", content: "Health Score: 34 — No logins in 14 days, failed payment, NPS = 4", correctCategory: "red" },
    { id: "4", content: "Health Score: 78 — Daily logins, 3 features used, 6-month tenure", correctCategory: "green" },
    { id: "5", content: "Health Score: 51 — 2 logins this week, no support contact ever, basic plan", correctCategory: "yellow" }
  ]}
/>

### What to Do in Each Zone

| Zone | Score | Action | Cadence |
|------|-------|--------|---------|
| **Green** | 75-100 | Monitor + expansion opportunity | Monthly check |
| **Yellow** | 50-74 | Proactive outreach + feature nudges | Weekly check |
| **Red** | 0-49 | Urgent intervention: personal call + save play | Within 48 hours |

<InsightCard icon="🎯" title="The Yellow Zone Is Where You Win">
Yellow customers (50-74) have a **40-60% save rate** with intervention. Red customers (&lt;50) have only a **10-15% save rate**. Your goal is to catch customers in Yellow before they hit Red.
</InsightCard>

---

## Building Your Health Score Dashboard (Guided Build)

Now you're going to build your actual health score dashboard. You'll need:

- Google Sheets (or Excel)
- Access to your product analytics (GA4, Mixpanel, or your database)
- Access to your ESP (ConvertKit, Mailchimp, etc.)
- Access to your billing system (Stripe, Paddle, etc.)

<TemplateBuilder
  title="Your Health Score Dashboard"
  persistKey="retention-L2-dashboard"
  sections={[
    {
      id: "usage",
      title: "Usage Dimension (40%)",
      fields: [
        { id: "loginMetric", label: "How will you track logins?", placeholder: "e.g., GA4 event 'user_login' or database query", type: "text" },
        { id: "coreAction", label: "What's your core action?", placeholder: "e.g., 'created_report' or 'sent_campaign'", type: "text" },
        { id: "featureList", label: "List your trackable features (comma-separated)", placeholder: "e.g., Dashboard, Reports, Integrations, API", type: "textarea" }
      ]
    },
    {
      id: "engagement",
      title: "Engagement Dimension (30%)",
      fields: [
        { id: "emailSource", label: "Where do you get email open rates?", placeholder: "e.g., ConvertKit analytics, Mailchimp reports", type: "text" },
        { id: "supportSource", label: "Where do you track support interactions?", placeholder: "e.g., Intercom, email tags, Notion database", type: "text" },
        { id: "npsFrequency", label: "How often do you send NPS surveys?", placeholder: "e.g., Quarterly, after 30 days, never (start now!)", type: "text" }
      ]
    },
    {
      id: "business",
      title: "Business Dimension (30%)",
      fields: [
        { id: "billingSystem", label: "What billing system do you use?", placeholder: "e.g., Stripe, Paddle, Gumroad", type: "text" },
        { id: "planTiers", label: "List your plan tiers (comma-separated)", placeholder: "e.g., Free, Basic ($29), Pro ($99), Enterprise ($299)", type: "text" },
        { id: "signupDateSource", label: "Where is customer signup date stored?", placeholder: "e.g., Stripe metadata, CRM, user database", type: "text" }
      ]
    }
  ]}
/>

### Step-by-Step Dashboard Build

<ProgressiveReveal title="Build Your Dashboard (Click to Expand Each Step)" persistKey="retention-L2-reveal">
<RevealSection title="Step 1: Set Up Your Spreadsheet Structure">

Create a Google Sheet with these columns:

| Column | Description |
|--------|-------------|
| A: Customer Name | From your CRM or billing system |
| B: Email | For reference |
| C: MRR | Monthly recurring revenue |
| D: Login Count (14d) | From product analytics |
| E: Core Actions (14d) | From product database |
| F: Features Used | Count of distinct features |
| G: Usage Score | Calculated (see formula below) |
| H: Email Open Rate (30d) | From ESP |
| I: Support Interactions | Count or category |
| J: NPS Score | Latest score |
| K: Engagement Score | Calculated |
| L: Payment Status | On-time / Late / Failed |
| M: Plan Tier | Free / Basic / Pro / Enterprise |
| N: Tenure (days) | Days since signup |
| O: Business Score | Calculated |
| P: **Composite Health Score** | **(G × 0.4) + (K × 0.3) + (O × 0.3)** |
| Q: Zone | Green / Yellow / Red |

**Formula for Column P (Composite Health Score):**
```
=(G2*0.4)+(K2*0.3)+(O2*0.3)
```

**Formula for Column Q (Zone):**
```
=IF(P2>=75,"Green",IF(P2>=50,"Yellow","Red"))
```

</RevealSection>

<RevealSection title="Step 2: Populate Usage Data">

**For each customer, calculate:**

1. **Login Count (Column D):** Query your product analytics for logins in the last 14 days
   - 0 logins → 0
   - 1-3 → 25
   - 4-7 → 50
   - 8-10 → 75
   - 11+ → 100

2. **Core Actions (Column E):** Count of your core action (e.g., "reports created") in last 14 days
   - Compare to your average across all customers
   - Below 50% of average → 25
   - 50-100% of average → 50
   - 100-150% of average → 75
   - 150%+ of average → 100

3. **Features Used (Column F):** Count distinct features used in last 30 days
   - 1 feature → 25
   - 2 features → 50
   - 3+ features → 75
   - All features → 100

**Usage Score (Column G):**
```
=AVERAGE(D2,E2,F2)
```

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can automate this with a SQL query or API call. Export to CSV weekly and import into your sheet. Example SQL:

```sql
SELECT 
  user_id,
  COUNT(DISTINCT DATE(login_at)) as login_days,
  COUNT(core_action_id) as core_actions,
  COUNT(DISTINCT feature_id) as features_used
FROM events
WHERE created_at >= NOW() - INTERVAL 14 DAY
GROUP BY user_id
```
</ContextualNote>

</RevealSection>

<RevealSection title="Step 3: Populate Engagement Data">

**For each customer, calculate:**

1. **Email Open Rate (Column H):** From your ESP, get open rate for last 30 days
   - 0% → 0
   - &lt;10% → 25
   - 10-25% → 50
   - 25-50% → 75
   - 50%+ → 100

2. **Support Interactions (Column I):** Count or categorize
   - No contact ever → 50
   - Questions asked → 75
   - Feedback given → 100
   - Only complaints → 25

3. **NPS Score (Column J):** Latest NPS response
   - 0-4 → 0
   - 5-6 → 25
   - 7-8 → 50
   - 9 → 75
   - 10 → 100

**Engagement Score (Column K):**
```
=AVERAGE(H2,I2,J2)
```

</RevealSection>

<RevealSection title="Step 4: Populate Business Data">

**For each customer, calculate:**

1. **Payment Status (Column L):** From Stripe/billing system
   - Failed payments → 0
   - Late → 25
   - On-time → 75
   - Annual prepaid → 100

2. **Plan Tier (Column M):** From billing system
   - Free → 25
   - Basic → 50
   - Pro → 75
   - Enterprise → 100

3. **Tenure (Column N):** Days since signup
   - &lt;30 days → 25
   - 1-3 months → 50
   - 3-12 months → 75
   - 12+ months → 100

**Business Score (Column O):**
```
=AVERAGE(L2,M2,N2)
```

</RevealSection>

<RevealSection title="Step 5: Calculate Composite Score and Zone">

Your formulas from Step 1 will now calculate automatically:

- **Column P (Composite Health Score):** `=(G2*0.4)+(K2*0.3)+(O2*0.3)`
- **Column Q (Zone):** `=IF(P2>=75,"Green",IF(P2>=50,"Yellow","Red"))`

**Add conditional formatting:**
- Green zone (75-100): light green background
- Yellow zone (50-74): light yellow background
- Red zone (0-49): light red background

**Sort by Column P (Health Score) ascending** to see your most at-risk customers at the top.

</RevealSection>
</ProgressiveReveal>

---

## Testing Your Health Score Model

You've built the dashboard. Now you need to validate it actually predicts churn.

<SwipeDecision
  title="Healthy or At-Risk?"
  description="Swipe right for healthy customers, left for at-risk"
  optionA="At-Risk"
  optionB="Healthy"
  persistKey="retention-L2-swipe"
  cards={[
    { 
      id: "1", 
      content: "Health Score: 42 — 1 login this month, 0% email opens, failed payment", 
      correctOption: "a", 
      explanation: "Red zone (0-49). This customer needs urgent intervention within 48 hours." 
    },
    { 
      id: "2", 
      content: "Health Score: 81 — Daily logins, 4 features used, annual plan, NPS = 9", 
      correctOption: "b", 
      explanation: "Green zone (75-100). Monitor monthly and look for expansion opportunities." 
    },
    { 
      id: "3", 
      content: "Health Score: 58 — 5 logins this week, 15% email opens, on-time payments, basic plan", 
      correctOption: "a", 
      explanation: "Yellow zone (50-74). Not urgent, but needs proactive outreach this week to prevent slide to Red." 
    },
    { 
      id: "4", 
      content: "Health Score: 91 — Power user (20+ logins/week), submitted 3 feature requests, enterprise plan", 
      correctOption: "b", 
      explanation: "Green zone. This is your ideal customer — engaged, high-value, and sticky." 
    },
    { 
      id: "5", 
      content: "Health Score: 67 — Moderate usage (7 logins), no support contact ever, 2-month tenure", 
      correctOption: "a", 
      explanation: "Yellow zone. The 'no support contact ever' combined with moderate usage suggests disengagement. Reach out proactively." 
    }
  ]}
/>

### Validation Exercise: Look Backward

<ExampleCard label="Real Validation Method">
Pull your last 10 churned customers. Calculate their health scores from 30 days before they cancelled.

**If your model is working:**
- 70-80% of churned customers should have been Red (&lt;50) or Yellow (50-74) 30 days before cancellation
- 90%+ should have been Yellow or Red 14 days before cancellation

**If your model isn't working:**
- Adjust your scoring thresholds (maybe 5 logins/week is "normal" for your product, not 8)
- Add a signal you're missing (e.g., API usage for developer tools)
- Weight dimensions differently (maybe Engagement should be 40% for your business)
</ExampleCard>

<RangeSlider 
  label="How many of your last 10 churned customers would your health score have flagged as Yellow or Red 30 days before cancellation?" 
  min={0} 
  max={10} 
  lowLabel="0 customers" 
  highLabel="All 10" 
  persistKey="retention-L2-validation" 
/>

---

## Maintaining Your Health Score Dashboard

Your health score is only useful if you **update it weekly** and **act on it**.

<ScenarioSimulator
  title="Health Score Maintenance Calculator"
  persistKey="retention-L2-simulator"
  levers={[
    { id: "customers", label: "Number of customers", min: 10, max: 500, step: 10, defaultValue: 100 },
    { id: "updateFrequency", label: "Update frequency (days)", min: 1, max: 30, step: 1, defaultValue: 7 }
  ]}
  outputs={[
    { id: "timePerUpdate", label: "Time per update (minutes)", formula: "(customers * 0.5)", unit: "min", precision: 0 },
    { id: "monthlyTime", label: "Monthly time investment", formula: "((30 / updateFrequency) * (customers * 0.5))", unit: "min", precision: 0 }
  ]}
  insight="At `{customers}` customers updated every {updateFrequency} days, you'll spend ~{monthlyTime} minutes/month maintaining your health score. That's {(monthlyTime / 60).toFixed(1)} hours — a small price for preventing churn."
/>

### Weekly Health Score Review Ritual (15-30 minutes)

1. **Update the data** (10-15 min): Pull fresh data from product analytics, ESP, and billing system. Paste into your sheet.
2. **Sort by health score ascending** (1 min): See your most at-risk customers at the top.
3. **Flag action items** (5-10 min):
   - Any new Red customers? → Add to "urgent call list"
   - Any customers who dropped from Green to Yellow? → Add to "proactive outreach list"
   - Any Green customers with high MRR? → Add to "expansion opportunity list"
4. **Execute top 3 actions** (done during your weekly CS review block — Lesson 8)

<InteractiveChecklist 
  title="Your Health Score Action Items" 
  persistKey="retention-L2-actions" 
  items={[
    "Build your health score spreadsheet with the 3-dimension model",
    "Populate data for all current customers",
    "Validate the model against your last 10 churned customers",
    "Set up weekly data update process (manual or automated)",
    "Add health score review to your weekly CS ritual (Lesson 8)",
    "Flag your top 3 at-risk customers and plan interventions"
  ]} 
/>

---

## Common Health Score Mistakes (And How to Avoid Them)

<StrategyDuel
  title="Complex vs. Simple Health Scores"
  persistKey="retention-L2-duel"
  scenario="You're deciding how sophisticated to make your health score model."
  strategyA={{ 
    name: "Complex (15+ inputs)", 
    description: "Track every possible signal: login frequency, session duration, feature usage, email opens, clicks, NPS, support tickets, payment history, plan tier, tenure, referrals, API calls, integrations, team size, industry...", 
    pros: ["More comprehensive", "Feels sophisticated"], 
    cons: ["Requires constant maintenance", "Hard to debug when wrong", "Data pipeline breaks easily", "Takes 2+ hours to update"] 
  }}
  strategyB={{ 
    name: "Simple (3-5 inputs)", 
    description: "Track the 3 dimensions (Usage, Engagement, Business) with 3 signals each. Total: 9 inputs.", 
    pros: ["Easy to maintain", "Updates in 15 minutes", "Easy to debug", "Actually gets used"], 
    cons: ["Might miss edge cases", "Less precise"] 
  }}
  expertVerdict="Simple wins for solo founders. A 9-input model you update weekly beats a 15-input model you update once and abandon. You can always add complexity later."
/>

### The 5 Most Common Mistakes

1. **Mistake: Weighting all dimensions equally**
   - Fix: Usage is the strongest predictor — weight it 40% or higher

2. **Mistake: Only tracking lagging indicators (NPS, payment history)**
   - Fix: Leading indicators (login frequency, feature usage) give you 2-4 weeks of warning

3. **Mistake: Building the model but never updating it**
   - Fix: Schedule a recurring 15-minute weekly task to update the data

4. **Mistake: Tracking too many signals and burning out**
   - Fix: Start with 3 dimensions × 3 signals = 9 total inputs. Add more only if needed.

5. **Mistake: Not validating against actual churn data**
   - Fix: Every quarter, check: did your Red/Yellow customers actually churn at higher rates than Green?

---

## Summary: Your Health Score System

You now have a **simple, maintainable health score model** that:

✅ Uses 3 dimensions (Usage 40%, Engagement 30%, Business 30%)  
✅ Tracks 9 total signals (3 per dimension)  
✅ Classifies customers into Green/Yellow/Red zones  
✅ Updates weekly in 15-30 minutes  
✅ Flags at-risk customers 2-4 weeks before churn  

**Next lesson:** You'll learn how to track the 7 specific churn prediction signals that feed into your health score — and build an early warning dashboard that catches silent churners before they disappear.

<InteractiveChecklist 
  title="Before You Move to Lesson 3" 
  persistKey="retention-L2-final" 
  items={[
    "I've built my health score spreadsheet with all 3 dimensions",
    "I've populated data for at least 10 customers to test the model",
    "I've identified my top 3 at-risk customers (Yellow or Red zone)",
    "I've scheduled a weekly 15-minute health score update ritual",
    "I understand why Usage is weighted 40% (strongest predictor)",
    "I've validated the model against at least 3 past churned customers"
  ]} 
/>

---

## Quiz: Health Score Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Why is the Usage dimension weighted 40% instead of equal weighting with Engagement and Business?",
      "options": [
        "Because it's easier to track",
        "Because usage is 2-3x more predictive of churn than other signals",
        "Because customers care more about features than support",
        "Because it makes the math simpler"
      ],
      "correctAnswer": 1,
      "explanation": "Research shows usage-based signals (logins, feature adoption, core actions) are 2-3x more predictive of churn than survey-based or business signals. A customer who stops using the product will churn, even if they're paying on time."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "A customer has a health score of 58. What zone are they in and what action should you take?",
      "options": [
        "Green zone — monitor monthly",
        "Yellow zone — proactive outreach this week",
        "Red zone — urgent call within 48 hours",
        "Yellow zone — wait until they hit Red before acting"
      ],
      "correctAnswer": 1,
      "explanation": "58 is in the Yellow zone (50-74). Yellow customers have a 40-60% save rate with intervention, so you should reach out proactively this week. Don't wait for them to hit Red (&lt;50) when save rates drop to 10-15%."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "Why does 'no support contact ever' score 50 (neutral) instead of 100 (excellent) in the Engagement dimension?",
      "options": [
        "Because customers who never contact support are disengaged, not necessarily happy",
        "Because support tickets are always a good sign",
        "Because it's a bug in the scoring model",
        "Because we want to encourage more support tickets"
      ],
      "correctAnswer": 0,
      "explanation": "70% of churning customers never complain or contact support — they just stop using the product. 'No contact ever' can indicate disengagement, not satisfaction. Customers who ask questions or give feedback (score 75-100) are actively engaged."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "A complex health score model with 15+ inputs is better than a simple 9-input model for solo founders.",
      "correctAnswer": false,
      "explanation": "False. For solo founders, a simple 9-input model (3 dimensions × 3 signals) that you actually maintain weekly is far better than a complex 15+ input model that requires constant data pipeline maintenance and gets abandoned."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "How far in advance does a properly configured health score typically flag at-risk customers before they churn?",
      "options": [
        "1-3 days",
        "2-4 weeks",
        "2-3 months",
        "6-12 months"
      ],
      "correctAnswer": 1,
      "explanation": "A properly configured health score flags at-risk customers 2-4 weeks before churn. This is the optimal intervention window — early enough to save them, but not so early that you're chasing false positives."
    }
  ]
}