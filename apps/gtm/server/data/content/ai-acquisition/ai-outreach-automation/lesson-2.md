---
title: "Instantly & Smartlead Deep Dive"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 24: AI Outreach Automation"
lesson: 2
---

You've narrowed the field. The 200+ cold email tools have been filtered down to two serious contenders: **Instantly.ai** and **Smartlead.ai**.

Both promise unlimited email accounts. Both include warmup. Both cost roughly the same. So why does every founder forum debate them like it's Coke vs. Pepsi?

Here's the truth: **For 90% of solo founders, Instantly wins.** But that remaining 10% — the ones building custom workflows, white-labeling, or integrating deeply with their tech stack — will find Smartlead's API superiority worth the slightly steeper learning curve.

This lesson is your side-by-side comparison. By the end, you'll know which platform fits your specific use case, how to set it up correctly, and how to avoid the configuration mistakes that tank deliverability before you send your first email.

---

## The Platform Philosophy Split

Before we dive into features, understand the **design philosophy** difference:

<FlipCard 
  front="Instantly's Philosophy" 
  back="Built for speed and simplicity. The interface assumes you want to launch campaigns fast, test aggressively, and scale without touching code. Best for founders who want results, not infrastructure projects." 
/>

<FlipCard 
  front="Smartlead's Philosophy" 
  back="Built for control and customization. The platform assumes you'll eventually want API access, custom webhooks, and white-label capabilities. Best for technical founders building systems, not just running campaigns." 
/>

<InsightCard icon="🎯" title="The Real Deciding Factor">
If you can't articulate a specific technical need (API integration, white-label, custom webhook routing), **choose Instantly**. It's $2/month cheaper, has better A/B testing, and a cleaner interface. Smartlead's advantages only matter if you're building custom workflows.
</InsightCard>

---

## Instantly.ai: The Feature Breakdown

Let's start with the market leader. Instantly grew from 0 to 100K+ users in 24 months by nailing the solo founder use case.

### Pricing Tiers (2025-2026)

<SlideNavigation>
<Slide title="Growth Plan — $37/mo">

**What You Get:**
- Unlimited email accounts (connect as many as you want)
- 5,000 active contacts per month
- 5,000 emails sent per month
- Unlimited warmup (built-in, always running)
- Unlimited campaigns
- A/B testing (up to 26 variants per step)
- AI Writer (basic copy generation)
- Lead Finder (1,000 B2B leads/month from built-in database)
- Standard analytics (opens, replies, clicks, bounces)

**Who It's For:**
Solo founders sending 150-250 emails/day across 3-5 inboxes. This is the sweet spot for most people in this course.

**Limitation:**
The 5K email/month cap means you max out at ~170 emails/day if you send 6 days/week. For higher volume, you need Hypergrowth.

</Slide>

<Slide title="Hypergrowth Plan — $97/mo">

**What You Get:**
- Everything in Growth, plus:
- 25,000 active contacts per month
- 100,000 emails sent per month
- Priority support
- Advanced analytics

**Who It's For:**
Founders scaling past 500 emails/day or managing multiple client campaigns. Overkill for most solo founders in months 1-6.

**When to Upgrade:**
When you consistently hit the 5K/month limit for 2+ months and have validated that outreach is your primary acquisition channel.

</Slide>

<Slide title="Hidden Costs (There Aren't Many)">

**What's NOT Included:**
- Email accounts themselves (you bring your own Google Workspace or Microsoft 365 accounts — budget $6-12/inbox/month)
- Domain registration (budget $12-15/year per domain)
- Email enrichment/verification (if you need more than Lead Finder — budget $30-50/month for tools like ZeroBounce or NeverBounce)

**Total Real Cost for Growth Plan:**
- Instantly: $37/mo
- 3 email accounts: $18-36/mo
- 2 domains: $2-3/mo (amortized)
- **Total: $57-76/month**

Still well under the $200/month budget.

</Slide>
</SlideNavigation>

### Instantly's Killer Features

<ExampleCard label="Feature Spotlight: A/B Testing">

Instantly lets you test **up to 26 variants** of any email step. This is absurdly powerful.

**Example Use Case:**
You're testing subject lines for a SaaS outreach campaign. You create 5 variants:

1. "Quick question about [company]'s outbound"
2. "Noticed [company] on G2"
3. "[First name], thought you'd find this useful"
4. "Re: [recent company news]"
5. "15 minutes to discuss [pain point]?"

Instantly splits your list evenly, sends each variant to 20% of recipients, tracks open and reply rates, and shows you the winner after 100 sends.

**Why This Matters:**
Most platforms limit you to 2-3 variants. Instantly's 26-variant limit means you can test aggressively without switching tools or exporting data to spreadsheets.

</ExampleCard>

<InsightCard icon="🔥" title="The Lead Finder Advantage">
Instantly includes a B2B lead database (1,000 leads/month on Growth plan). It's not as comprehensive as Apollo or ZoomInfo, but for solo founders, it's often enough to get started without paying for a separate data provider. Search by job title, company size, industry, location — export directly into campaigns.
</InsightCard>

### Instantly Setup Walkthrough

<TemplateBuilder
  title="Your Instantly Configuration Checklist"
  persistKey="ai-outreach-automation-L2-instantly-setup"
  sections={[
    {
      id: "account",
      title: "1. Account Setup",
      fields: [
        { 
          id: "plan", 
          label: "Which plan are you starting with?", 
          type: "select",
          options: ["Growth ($37/mo)", "Hypergrowth ($97/mo)", "Still deciding"],
          placeholder: "Select plan"
        },
        { 
          id: "inboxes", 
          label: "How many email accounts will you connect initially?", 
          type: "number",
          placeholder: "Recommended: 3-5 for Growth plan"
        }
      ]
    },
    {
      id: "domains",
      title: "2. Domain & Inbox Strategy",
      fields: [
        { 
          id: "primary-domain", 
          label: "Your primary business domain", 
          type: "text",
          placeholder: "e.g., yourstartup.com"
        },
        { 
          id: "outreach-domains", 
          label: "Outreach domains you'll purchase", 
          type: "textarea",
          placeholder: "e.g., getyourstartup.com, tryyourstartup.com (list 2-3)"
        },
        {
          id: "inbox-naming",
          label: "Inbox naming convention",
          type: "text",
          placeholder: "e.g., sarah@, hello@, team@ (avoid 'sales@' or 'noreply@')"
        }
      ]
    },
    {
      id: "warmup",
      title: "3. Warmup Settings",
      fields: [
        {
          id: "warmup-duration",
          label: "How many days will you warm up before sending?",
          type: "number",
          placeholder: "Recommended: 14-21 days for new domains"
        },
        {
          id: "daily-limit-week1",
          label: "Daily send limit — Week 1",
          type: "number",
          placeholder: "Recommended: 10-15 per inbox"
        },
        {
          id: "daily-limit-week2",
          label: "Daily send limit — Week 2",
          type: "number",
          placeholder: "Recommended: 20-30 per inbox"
        }
      ]
    }
  ]}
/>

---

## Smartlead.ai: The Technical Founder's Choice

Smartlead launched as an "Instantly alternative for developers." The interface is slightly more complex, but the API and webhook capabilities are significantly better.

### Pricing Tiers (2025-2026)

<SlideNavigation>
<Slide title="Basic Plan — $39/mo">

**What You Get:**
- Unlimited email accounts
- 2,000 active leads per campaign cycle
- 6,000 emails sent per month
- Unlimited warmup (SmartDelivery system)
- Unlimited campaigns
- Full API access (this is the big differentiator)
- Webhooks for reply detection, bounce handling, etc.
- SpinTax + AI variables
- CSV, API, and Zapier import
- Per-inbox analytics (sender health scoring)

**Who It's For:**
Technical founders who want to build custom workflows, integrate with their CRM via API, or eventually white-label the platform.

**Limitation:**
The 2K active leads limit is tighter than Instantly's 5K contacts, but the 6K emails/month is slightly higher.

</Slide>

<Slide title="Pro Plan — $94/mo">

**What You Get:**
- Everything in Basic, plus:
- 30,000 active leads
- Unlimited emails sent per month
- Advanced sender health analytics
- Priority support
- White-label options

**Who It's For:**
Agencies or founders running multiple client campaigns. Not necessary for solo founders in the first 6 months.

</Slide>

<Slide title="Hidden Costs">

**What's NOT Included:**
- Email accounts (same as Instantly — $6-12/inbox/month)
- Domains ($12-15/year each)
- Enrichment tools (if needed beyond manual research)

**Total Real Cost for Basic Plan:**
- Smartlead: $39/mo
- 3 email accounts: $18-36/mo
- 2 domains: $2-3/mo
- **Total: $59-78/month**

Roughly the same as Instantly Growth.

</Slide>
</SlideNavigation>

### Smartlead's Killer Features

<ExampleCard label="Feature Spotlight: API & Webhooks">

Smartlead's API is **significantly better** than Instantly's. Here's what that means in practice:

**Use Case 1: CRM Integration**
You want every reply to automatically create a task in your CRM (Pipedrive, HubSpot, Attio, etc.). With Smartlead, you set up a webhook that fires when a reply is detected, then use Zapier or Make to route it to your CRM.

**Use Case 2: Custom Lead Scoring**
You're enriching leads with Clay, scoring them based on tech stack + recent funding + job changes, then only importing leads with scores >70 into Smartlead. The API makes this seamless.

**Use Case 3: White-Label**
You're building a service where you run outreach for clients. Smartlead's white-label option lets you rebrand the platform and charge clients directly.

**Why This Matters:**
If you're a technical founder who thinks in terms of "systems" and "workflows," Smartlead's API will save you hours of manual work. If you're not building custom integrations, this advantage is irrelevant.

</ExampleCard>

<InsightCard icon="📊" title="SmartDelivery Analytics">
Smartlead provides **per-inbox health scoring** that's more granular than Instantly's. You can see which specific inboxes are getting flagged, which domains have reputation issues, and adjust your sending strategy accordingly. This is overkill for most solo founders, but invaluable if you're managing 10+ inboxes.
</InsightCard>

---

## Head-to-Head Comparison

Let's settle this once and for all.

<ComparisonBuilder
  title="Instantly vs Smartlead: Your Decision"
  persistKey="ai-outreach-automation-L2-platform-choice"
  prompt="Based on your use case, which platform is the better fit?"
  expertExample="For most solo founders, Instantly wins on ease of use, A/B testing, and the built-in Lead Finder. Choose Smartlead only if you need API integrations or plan to white-label."
  criteria={[
    "Specific technical needs (API, webhooks, white-label)",
    "Comfort level with slightly more complex UX",
    "Plan to build custom workflows or integrations"
  ]}
/>

### Feature Matrix

<ClassifyExercise
  title="Which Platform Has This Feature?"
  persistKey="ai-outreach-automation-L2-feature-classify"
  categories={[
    { id: "instantly", label: "Instantly Only", color: "#3b82f6" },
    { id: "smartlead", label: "Smartlead Only", color: "#8b5cf6" },
    { id: "both", label: "Both Platforms", color: "#10b981" }
  ]}
  items={[
    { id: "1", content: "Unlimited email accounts", correctCategory: "both" },
    { id: "2", content: "Built-in B2B lead database", correctCategory: "instantly" },
    { id: "3", content: "Up to 26 A/B test variants", correctCategory: "instantly" },
    { id: "4", content: "Full API access on base plan", correctCategory: "smartlead" },
    { id: "5", content: "White-label options", correctCategory: "smartlead" },
    { id: "6", content: "Unlimited warmup included", correctCategory: "both" },
    { id: "7", content: "Per-inbox health scoring", correctCategory: "smartlead" },
    { id: "8", content: "Webhooks for reply detection", correctCategory: "smartlead" }
  ]}
/>

### Pricing Comparison

<ScenarioSimulator
  title="Total Monthly Cost Calculator"
  persistKey="ai-outreach-automation-L2-cost-simulator"
  levers={[
    { id: "platform", label: "Platform", type: "select", options: ["Instantly Growth ($37)", "Instantly Hypergrowth ($97)", "Smartlead Basic ($39)", "Smartlead Pro ($94)"], defaultValue: "Instantly Growth ($37)" },
    { id: "inboxes", label: "Number of email accounts", min: 1, max: 10, step: 1, defaultValue: 3 },
    { id: "inbox-cost", label: "Cost per inbox/month", min: 6, max: 15, step: 1, defaultValue: 10 },
    { id: "domains", label: "Number of domains", min: 1, max: 5, step: 1, defaultValue: 2 }
  ]}
  outputs={[
    { id: "platform-cost", label: "Platform cost", formula: "platform === 'Instantly Growth ($37)' ? 37 : platform === 'Instantly Hypergrowth ($97)' ? 97 : platform === 'Smartlead Basic ($39)' ? 39 : 94", unit: "$", precision: 0 },
    { id: "inbox-total", label: "Email accounts total", formula: "inboxes * inbox-cost", unit: "$", precision: 0 },
    { id: "domain-total", label: "Domains total (annual ÷ 12)", formula: "domains * 1.25", unit: "$", precision: 2 },
    { id: "monthly-total", label: "Total monthly cost", formula: "(platform === 'Instantly Growth ($37)' ? 37 : platform === 'Instantly Hypergrowth ($97)' ? 97 : platform === 'Smartlead Basic ($39)' ? 39 : 94) + (inboxes * inbox-cost) + (domains * 1.25)", unit: "$", precision: 2 }
  ]}
  insight="Your total monthly outreach infrastructure cost is ${monthly-total}. This leaves ${200 - monthly-total} in your $200/month budget for enrichment tools, LinkedIn automation, or other channels."
/>

---

## The Setup Sequence (Both Platforms)

Regardless of which platform you choose, the setup sequence is nearly identical. Here's the step-by-step process that ensures you don't tank your deliverability on day one.

<ProgressiveReveal title="The 8-Step Setup Sequence" persistKey="ai-outreach-automation-L2-setup-reveal">

<RevealSection title="Step 1: Purchase Domains (Day 0)">

**What to Do:**
Buy 2-3 domains similar to your primary domain. Use Namecheap, Google Domains, or Cloudflare.

**Naming Convention:**
- Primary domain: `yourstartup.com`
- Outreach domains: `getyourstartup.com`, `tryyourstartup.com`, `joinyourstartup.com`

**Why:**
You never send cold email from your primary domain. If an outreach domain gets flagged, your main business email stays clean.

**Cost:**
$12-15/year per domain = ~$1.25/month per domain.

</RevealSection>

<RevealSection title="Step 2: Set Up Email Accounts (Day 0-1)">

**What to Do:**
Create 3-5 email accounts on your outreach domains using Google Workspace or Microsoft 365.

**Naming Convention:**
Use human-sounding names, not generic sales addresses:
- ✅ `sarah@getyourstartup.com`
- ✅ `hello@tryyourstartup.com`
- ✅ `team@joinyourstartup.com`
- ❌ `sales@getyourstartup.com`
- ❌ `noreply@tryyourstartup.com`

**Why:**
Generic sales addresses have lower deliverability. Human names perform better.

**Cost:**
$6-12/month per inbox (Google Workspace Business Starter is $6/user/month; Microsoft 365 Business Basic is $6/user/month).

</RevealSection>

<RevealSection title="Step 3: Configure DNS Records (Day 1)">

**What to Do:**
Set up SPF, DKIM, and DMARC records for each domain. Both Instantly and Smartlead provide step-by-step instructions.

**Why:**
These records authenticate your emails and prove you're not a spammer. Without them, your emails go straight to spam.

**How:**
1. Log into your domain registrar (Namecheap, Google Domains, etc.)
2. Navigate to DNS settings
3. Copy the SPF, DKIM, and DMARC records from Instantly/Smartlead
4. Paste them into your DNS records
5. Wait 24-48 hours for propagation

**Verification:**
Use MXToolbox.com to verify your records are set up correctly.

</RevealSection>

<RevealSection title="Step 4: Connect Inboxes to Platform (Day 2)">

**What to Do:**
Connect your email accounts to Instantly or Smartlead using OAuth (Google/Microsoft login) or SMTP.

**Recommendation:**
Use OAuth if possible — it's more secure and less likely to trigger authentication errors.

**Why:**
The platform needs access to send emails on your behalf and monitor replies.

</RevealSection>

<RevealSection title="Step 5: Enable Warmup (Day 2)">

**What to Do:**
Turn on warmup for all connected inboxes. Set warmup to "aggressive" or "normal" (not "conservative" — that's too slow).

**What Warmup Does:**
The platform sends emails between your inboxes and a network of other users' inboxes, gradually increasing volume. This builds sender reputation.

**Duration:**
Run warmup for **14-21 days** before sending any cold emails. New domains need time to build trust.

**Daily Warmup Volume:**
- Week 1: 10-20 warmup emails/day per inbox
- Week 2: 20-40 warmup emails/day per inbox
- Week 3+: 40-60 warmup emails/day per inbox

</RevealSection>

<RevealSection title="Step 6: Set Daily Send Limits (Day 2)">

**What to Do:**
Configure daily send limits for each inbox. Start conservatively.

**Recommended Limits:**
- **New domains (0-30 days old):** 20-30 emails/day per inbox
- **Warmed domains (30-60 days old):** 40-50 emails/day per inbox
- **Mature domains (60+ days old):** 50-80 emails/day per inbox

**Why:**
Sending too much too fast triggers spam filters. Ramp up gradually.

**Formula:**
If you have 3 inboxes and send 30/day each, that's 90 emails/day total = 630/week = ~2,500/month. This fits comfortably within Instantly Growth's 5K/month limit.

</RevealSection>

<RevealSection title="Step 7: Import Test Contacts (Day 16-18)">

**What to Do:**
After 14+ days of warmup, import a small test list (50-100 contacts). Send a simple, non-salesy email to verify deliverability.

**Test Email Example:**
```
Subject: Quick question

Hi {first_name},

I'm reaching out to a few {job_title}s in the {industry} space 
to ask: what's your biggest challenge with [relevant topic] 
right now?

No pitch — genuinely curious.

{signature}
```

**What to Monitor:**
- Open rate (should be 40-60% for a warm test)
- Bounce rate (should be &lt;2%)
- Spam complaints (should be 0%)

**If Results Are Poor:**
Wait another week of warmup. Check DNS records. Verify inbox authentication.

</RevealSection>

<RevealSection title="Step 8: Launch First Campaign (Day 21+)">

**What to Do:**
Import your real prospect list. Create your first campaign. Start at 25% of your daily limit and scale up over 2 weeks.

**Scaling Schedule:**
- Week 1: 25% of daily limit (e.g., 7-8 emails/day per inbox)
- Week 2: 50% of daily limit (15 emails/day per inbox)
- Week 3: 75% of daily limit (22-23 emails/day per inbox)
- Week 4+: 100% of daily limit (30 emails/day per inbox)

**Why:**
Gradual scaling prevents sudden spikes that trigger spam filters.

</RevealSection>

</ProgressiveReveal>

---

## Common Setup Mistakes (And How to Avoid Them)

<SwipeDecision
  title="Good Setup or Bad Setup?"
  description="Swipe right for correct configurations, left for mistakes that will tank your deliverability"
  optionA="Bad Setup"
  optionB="Good Setup"
  persistKey="ai-outreach-automation-L2-setup-swipe"
  cards={[
    { 
      id: "1", 
      content: "Sending cold emails from sales@yourstartup.com (your primary domain)", 
      correctOption: "a", 
      explanation: "Never send cold email from your primary domain. If it gets flagged, your entire business email infrastructure is compromised. Always use separate outreach domains." 
    },
    { 
      id: "2", 
      content: "Purchasing getyourstartup.com and tryyourstartup.com as outreach domains", 
      correctOption: "b", 
      explanation: "Correct. These domains are similar enough to your brand to be recognizable, but separate enough to protect your primary domain." 
    },
    { 
      id: "3", 
      content: "Skipping DNS setup and connecting inboxes directly", 
      correctOption: "a", 
      explanation: "Without SPF, DKIM, and DMARC records, your emails will land in spam. DNS authentication is non-negotiable." 
    },
    { 
      id: "4", 
      content: "Running warmup for 14 days before sending any cold emails", 
      correctOption: "b", 
      explanation: "Correct. New domains need time to build sender reputation. 14-21 days is the minimum." 
    },
    { 
      id: "5", 
      content: "Sending 100 emails/day per inbox on day 1", 
      correctOption: "a", 
      explanation: "This will get you flagged immediately. Start at 20-30/day and ramp up gradually over 2-3 weeks." 
    },
    { 
      id: "6", 
      content: "Using sarah@getyourstartup.com instead of sales@getyourstartup.com", 
      correctOption: "b", 
      explanation: "Human names perform better than generic sales addresses. Deliverability and reply rates are both higher." 
    },
    {
      id: "7",
      content: "Connecting 10 inboxes to Instantly Growth plan and sending 500 emails/day total",
      correctOption: "a",
      explanation: "Instantly Growth caps at 5K emails/month = ~170/day. You'd hit the limit in 10 days. Either reduce volume or upgrade to Hypergrowth."
    },
    {
      id: "8",
      content: "Testing deliverability with a 50-person list before launching the full campaign",
      correctOption: "b",
      explanation: "Smart. Always test with a small list first to verify open rates, bounce rates, and spam complaints before scaling."
    }
  ]}
/>

---

## Migration: Switching Between Platforms

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
If you're considering Smartlead purely for API access, make sure you have a **specific integration in mind**. "I might need it later" is not a good reason to choose a slightly harder UX. Build the integration first in Zapier/Make, then migrate to API if you hit rate limits or need more control.
</ContextualNote>

**When to Switch:**
- You chose Instantly but now need API integrations → Migrate to Smartlead
- You chose Smartlead but find the UX frustrating and don't use the API → Migrate to Instantly
- You're scaling past 500 emails/day and need better analytics → Consider Smartlead Pro

**Migration Cost:**
- Time: 4-8 hours to export data, reconfigure campaigns, reconnect inboxes
- Deliverability disruption: 1-2 weeks (warmup needs to restart on the new platform)
- Risk: Medium (you'll lose historical analytics and A/B test data)

**How to Migrate:**
1. Export all contacts and campaign data from Platform A
2. Set up Platform B with the same domains and inboxes
3. Restart warmup (even if inboxes were already warmed)
4. Import contacts and recreate campaigns
5. Run a small test before launching full volume

<InsightCard icon="⚠️" title="Migration Reality Check">
Platform switching is painful. Most founders who switch regret not choosing correctly the first time. Spend an extra hour on the decision now to avoid 8 hours of migration work later.
</InsightCard>

---

## Your Platform Decision

Time to commit. Use this decision tree to make your final choice.

<DecisionTree
  title="Instantly or Smartlead?"
  persistKey="ai-outreach-automation-L2-decision-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Do you have a specific technical need (API integration, white-label, custom webhooks)?", 
      choices: [
        { label: "Yes, I need API/webhooks for a specific integration", nextNodeId: "api-yes" },
        { label: "No, I just want to send cold emails", nextNodeId: "api-no" },
        { label: "Maybe in the future, but not right now", nextNodeId: "api-maybe" }
      ]
    },
    { 
      id: "api-yes", 
      content: "Can you articulate exactly what you'll build with the API?", 
      choices: [
        { label: "Yes, I have a specific integration in mind", nextNodeId: "smartlead" },
        { label: "No, I just think I might need it", nextNodeId: "api-maybe" }
      ]
    },
    {
      id: "api-no",
      content: "Do you want built-in B2B lead data (1,000 leads/month)?",
      choices: [
        { label: "Yes, that would save me time", nextNodeId: "instantly" },
        { label: "No, I already have a lead source", nextNodeId: "ab-test" }
      ]
    },
    {
      id: "api-maybe",
      content: "Are you comfortable with a slightly more complex UX in exchange for future flexibility?",
      choices: [
        { label: "Yes, I'm technical and like control", nextNodeId: "smartlead" },
        { label: "No, I want simplicity now", nextNodeId: "instantly" }
      ]
    },
    {
      id: "ab-test",
      content: "Do you plan to run aggressive A/B tests (10+ variants)?",
      choices: [
        { label: "Yes, testing is core to my strategy", nextNodeId: "instantly" },
        { label: "No, I'll test 2-3 variants max", nextNodeId: "either" }
      ]
    },
    {
      id: "instantly",
      content: "**Recommendation: Instantly Growth ($37/mo)**\n\nBest for: Solo founders who want simplicity, built-in lead data, and powerful A/B testing. Start here unless you have a specific reason to choose Smartlead.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "smartlead",
      content: "**Recommendation: Smartlead Basic ($39/mo)**\n\nBest for: Technical founders building custom integrations, agencies white-labeling, or founders who need granular per-inbox analytics.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "either",
      content: "**Either platform works for you.**\n\nFlip a coin or go with Instantly for the slightly cleaner UX and $2/month savings. Both will serve you well.",
      isTerminal: true,
      outcome: "neutral"
    }
  ]}
/>

---

## Action Items: Your Next Steps

<InteractiveChecklist 
  title="Platform Setup Checklist" 
  persistKey="ai-outreach-automation-L2-actions" 
  items={[
    "Make final platform decision (Instantly or Smartlead)",
    "Purchase 2-3 outreach domains (e.g., getyourstartup.com)",
    "Create 3-5 email accounts on outreach domains (Google Workspace or Microsoft 365)",
    "Configure DNS records (SPF, DKIM, DMARC) for all domains",
    "Connect email accounts to chosen platform",
    "Enable warmup for all inboxes (set to 'normal' or 'aggressive')",
    "Set daily send limits (start at 20-30/day per inbox)",
    "Wait 14-21 days for warmup before sending cold emails",
    "Import 50-person test list and send test campaign",
    "Monitor open rate, bounce rate, and spam complaints"
  ]} 
/>

---

## Knowledge Check

```json
{
  "quizTitle": "Instantly vs Smartlead Mastery",
  "questions": [
    {
      "id": "q1",
      "question": "What is the primary advantage of Smartlead over Instantly?",
      "options": [
        "Cheaper pricing",
        "Better A/B testing",
        "Superior API and webhook capabilities",
        "Built-in B2B lead database"
      ],
      "correctAnswer": 2,
      "explanation": "Smartlead's API and webhook capabilities are significantly better than Instantly's. This matters for technical founders building custom integrations, but is irrelevant for most solo founders."
    },
    {
      "id": "q2",
      "question": "What is the recommended warmup duration for new domains before sending cold emails?",
      "options": [
        "3-5 days",
        "7-10 days",
        "14-21 days",
        "30+ days"
      ],
      "correctAnswer": 2,
      "explanation": "New domains need 14-21 days of warmup to build sender reputation. Sending cold emails before this will result in poor deliverability."
    },
    {
      "id": "q3",
      "question": "Which email address has the best deliverability?",
      "options": [
        "sales@yourstartup.com",
        "noreply@yourstartup.com",
        "sarah@getyourstartup.com",
        "info@yourstartup.com"
      ],
      "correctAnswer": 2,
      "explanation": "Human names on separate outreach domains perform best. Generic addresses like 'sales@' or 'noreply@' have lower deliverability. Never send cold email from your primary domain."
    },
    {
      "id": "q4",
      "question": "You have 3 email accounts and want to send 90 emails/day total. What daily limit should you set per inbox?",
      "options": [
        "10 emails/day per inbox",
        "20 emails/day per inbox",
        "30 emails/day per inbox",
        "50 emails/day per inbox"
      ],
      "correctAnswer": 2,
      "explanation": "90 emails/day ÷ 3 inboxes = 30 emails/day per inbox. This is a safe limit for warmed domains (30-60 days old)."
    },
    {
      "id": "q5",
      "question": "What is the total monthly cost for Instantly Growth + 3 email accounts + 2 domains?",
      "options": [
        "$37-45",
        "$57-76",
        "$97-120",
        "$150-200"
      ],
      "correctAnswer": 1,
      "explanation": "Instantly Growth ($37) + 3 email accounts ($18-36) + 2 domains ($2-3) = $57-76/month total."
    }
  ]
}