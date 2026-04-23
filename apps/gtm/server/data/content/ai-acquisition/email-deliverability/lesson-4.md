---
title: "Domain Strategy: Main + 3-5 Sending Domains"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 4
---

# Domain Strategy: Main + 3-5 Sending Domains

## The $40,000 Mistake

Sarah launched her SaaS product in January 2024. By March, she had 200 warm leads from a conference. She loaded them into her CRM and sent a personalized cold email campaign from **hello@sarahsaas.com** — her main domain.

Within 48 hours:
- Gmail flagged her domain for "unusual sending patterns"
- Her domain reputation score dropped from 95 to 32
- Customer support emails started landing in spam
- Her Stripe payment confirmation emails disappeared into the void
- She lost 3 deals worth $40K because prospects never saw her follow-ups

It took **4 months** and a complete domain migration to recover. Her customers had to whitelist a new domain. Her SEO took a hit. Her brand trust suffered.

**The lesson?** Never, ever send cold email from your main domain.

<InsightCard icon="🚨" title="The Core Rule">
Your main domain is your brand's lifeline. One spam complaint can destroy years of trust. Always separate cold outreach from your primary domain.
</InsightCard>

---

## Why Multi-Domain Architecture Matters

Think of your domain reputation like a credit score. Every email you send is a transaction. Every spam complaint, bounce, or ignore is a mark against you. 

Here's what most founders don't realize:

<FlipCard 
  front="What happens when you send 200 cold emails from your main domain?" 
  back="Even with 1% spam complaints (2 people), Gmail's algorithms flag your entire domain. Customer emails, password resets, invoices — all go to spam. Recovery takes 30-90 days." 
/>

The math is brutal:
- **200 cold emails/day** from one domain
- **1% complaint rate** = 2 complaints/day
- **Google's threshold** = 0.1% (0.2 complaints per 200 emails)
- **Result:** You're 10x over the limit on day one

<ExampleCard label="Case Study: The Domain Firewall">
Marcus runs a $50K/month coaching business. He uses:
- **marcuscoaching.com** — website, customer emails, course delivery
- **getmarcuscoaching.com** — cold outreach domain #1
- **trymarcuscoaching.com** — cold outreach domain #2
- **himarcus.com** — cold outreach domain #3

When domain #2 hit a spam trap in Month 3, only that domain's reputation dropped. His main domain stayed pristine. Customer emails kept flowing. He paused domain #2 for 60 days, rotated to domain #4, and never missed a beat.

**Cost of protection:** $36/year for 3 extra domains. **Cost of not protecting:** Potentially $50K/month in lost revenue.
</ExampleCard>

---

## The Recommended Architecture

Here's the gold-standard setup for solo founders sending 200-400 emails/day:

<SlideNavigation>
<Slide title="Domain Roles">

### 1. Main Domain (Never Touch)
**Example:** `acme.com`
- Website hosting
- Customer support emails
- Transactional emails (invoices, password resets)
- Inbound sales replies
- **Cold email volume:** 0

### 2. Sending Domains (3-5 Active)
**Examples:** `getacme.com`, `tryacme.com`, `hiacme.com`
- Cold outreach only
- 2-3 inboxes per domain
- 30-50 emails/day per inbox
- Rotated every 3-6 months

### 3. Backup/Rotation Domain (1-2)
**Example:** `useacme.com`
- Warming up while others are active
- Ready to swap in if a sending domain gets flagged
- Can rest a burned domain here for 60-90 days

</Slide>

<Slide title="Volume Distribution">

**Target:** 200-400 cold emails/day total

| Domain | Inboxes | Emails/Inbox/Day | Total/Day |
|--------|---------|------------------|-----------|
| getacme.com | 3 | 30-40 | 90-120 |
| tryacme.com | 3 | 30-40 | 90-120 |
| hiacme.com | 3 | 30-40 | 90-120 |
| useacme.com | 2 | 0 (warming) | 0 |
| **Total** | **11** | — | **270-360** |

**Headroom:** 360 capacity, target 250-300 actual sends = safety margin

</Slide>

<Slide title="Cost Breakdown">

**Domains (Annual):**
- 4 sending domains × $12/year = **$48/year**

**Email Hosting (Monthly):**
- 11 inboxes × $7.20/month (Google Workspace) = **$79.20/month**
- Or 11 inboxes × $6/month (Microsoft 365) = **$66/month**

**Total Infrastructure Cost:**
- **~$80-90/month** for complete sending infrastructure
- **~$1,000/year** all-in

Compare to the cost of burning your main domain: **Priceless.**

</Slide>
</SlideNavigation>

<RangeSlider 
  label="How many cold emails are you currently sending per day?" 
  min={0} 
  max={500} 
  step={50}
  lowLabel="0" 
  highLabel="500+" 
  persistKey="email-deliverability-L4-volume" 
/>

---

## Domain Naming Strategy

Your sending domains need to look legitimate. Here's what works:

### ✅ Good Domain Patterns

<ClassifyExercise
  title="Classify These Domain Names"
  persistKey="email-deliverability-L4-classify"
  categories={[
    { id: "good", label: "Legitimate", color: "#10b981" },
    { id: "suspicious", label: "Suspicious", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "getacme.com", correctCategory: "good" },
    { id: "2", content: "acme-offers.com", correctCategory: "suspicious" },
    { id: "3", content: "tryacme.com", correctCategory: "good" },
    { id: "4", content: "acme.xyz", correctCategory: "suspicious" },
    { id: "5", content: "hiacme.com", correctCategory: "good" },
    { id: "6", content: "acme123.com", correctCategory: "suspicious" },
    { id: "7", content: "useacme.com", correctCategory: "good" },
    { id: "8", content: "acme.io", correctCategory: "suspicious" }
  ]}
/>

### Naming Rules

1. **Use .com only** — .io, .xyz, .co trigger spam filters
2. **Add a prefix, not a suffix** — `getacme.com` > `acmesales.com`
3. **Keep it pronounceable** — If you can't say it out loud, don't use it
4. **Avoid numbers and hyphens** — `acme-2.com` screams "spam domain"
5. **Match your brand** — Should feel like a legitimate variation

<FlipCard 
  front="Why does 'getacme.com' work better than 'acme.io'?" 
  back=".com domains have the highest trust score with email filters. .io/.xyz are associated with temporary/throwaway domains. Plus, 'get' is a common SaaS prefix that feels legitimate." 
/>

---

## Domain Age and Reputation

New domains are like new credit cards — they have no history, so ISPs treat them with suspicion.

### The Domain Aging Timeline

<ProgressiveReveal title="Domain Reputation Lifecycle" persistKey="email-deliverability-L4-reveal">
<RevealSection title="Days 1-14: Infant Domain">

**Status:** Zero reputation, maximum scrutiny

**What's happening:**
- DNS records propagating globally
- ISPs building initial sender profile
- No historical data to judge you by

**What you should do:**
- Set up all DNS records (SPF, DKIM, DMARC)
- Create a basic landing page (even one page helps)
- Redirect to your main domain
- **Send zero cold emails**

**Why wait?** Sending from a brand-new domain is like asking for a $50K loan with no credit history. You'll get rejected.

</RevealSection>

<RevealSection title="Days 15-30: Warmup Phase">

**Status:** Building initial reputation

**What's happening:**
- ISPs watching your sending patterns
- Engagement rates being tracked
- Complaint rates being monitored

**What you should do:**
- Start warmup at 5 emails/day
- Use warmup tools (MailReach, Instantly)
- Gradually increase to 20-30/day
- Monitor inbox placement daily

**Red flags:**
- Inbox placement below 80%
- Any spam complaints
- Bounce rate above 2%

</RevealSection>

<RevealSection title="Days 31-60: Established Domain">

**Status:** Moderate reputation, normal scrutiny

**What's happening:**
- Reputation score stabilizing
- ISPs have enough data to judge you
- Patterns established

**What you should do:**
- Reach cruise speed (30-50/day per inbox)
- Keep warmup running in background
- Monitor weekly instead of daily
- Maintain &lt;0.05% complaint rate

**You can now:**
- Send at target volume
- Run A/B tests
- Scale gradually

</RevealSection>

<RevealSection title="Days 61+: Mature Domain">

**Status:** Established reputation (good or bad)

**What's happening:**
- Reputation is sticky (hard to change quickly)
- Historical patterns matter more than recent ones
- Recovery from incidents takes 30-90 days

**What you should do:**
- Maintain consistent sending patterns
- Keep complaint rate below 0.05%
- Rotate domains every 6-12 months
- Rest domains proactively before they burn

**Warning signs:**
- Gradual decline in open rates
- Increasing spam folder placement
- Rising bounce rates

</RevealSection>
</ProgressiveReveal>

<InsightCard icon="⏰" title="The 14-Day Rule">
Never send cold email from a domain younger than 14 days. The reputation cost of rushing is 10x the time saved.
</InsightCard>

---

## Domain Forwarding and Branding

Your sending domains should feel like legitimate extensions of your brand, not random aliases.

### The Landing Page Strategy

Every sending domain should have:

1. **A redirect to your main site** — `getacme.com` → `acme.com`
2. **OR a simple landing page** with:
   - Your logo
   - One-sentence value prop
   - Link to main site
   - Privacy policy link
   - Unsubscribe link

<ExampleCard label="Example: Minimal Landing Page">

```html
<!-- getacme.com/index.html -->
<html>
<head>
  <title>Acme - Sales Automation for B2B Teams</title>
</head>
<body style="font-family: Arial; text-align: center; padding: 50px;">
  <img src="logo.png" width="200">
  <h1>Sales Automation for B2B Teams</h1>
  <p>Learn more at <a href="https://acme.com">acme.com</a></p>
  <p><a href="https://acme.com/privacy">Privacy Policy</a> | 
     <a href="mailto:hello@acme.com?subject=Unsubscribe">Unsubscribe</a></p>
</body>
</html>
```

**Why this works:**
- Looks legitimate to spam filters (real content, not parked domain)
- Builds brand consistency
- Provides required unsubscribe link
- Takes 10 minutes to set up

</ExampleCard>

### Email Signature Consistency

Your email signature should reference your **main domain**, not the sending domain:

```
Sarah Chen
Founder, Acme
acme.com  ← Main domain
LinkedIn: linkedin.com/in/sarahchen
```

**Not:**
```
Sarah Chen
Founder, Acme
getacme.com  ← Looks suspicious
```

<TemplateBuilder
  title="Your Domain Architecture Plan"
  persistKey="email-deliverability-L4-template"
  sections={[
    {
      id: "main",
      title: "Main Domain",
      fields: [
        { id: "domain", label: "Main Domain", placeholder: "e.g., acme.com", type: "text" },
        { id: "purpose", label: "Used For", placeholder: "e.g., Website, customer emails, support", type: "textarea" }
      ]
    },
    {
      id: "sending1",
      title: "Sending Domain #1",
      fields: [
        { id: "name", label: "Domain Name", placeholder: "e.g., getacme.com", type: "text" },
        { id: "inboxes", label: "Number of Inboxes", placeholder: "e.g., 3", type: "number" },
        { id: "volume", label: "Target Daily Volume", placeholder: "e.g., 90-120", type: "text" }
      ]
    },
    {
      id: "sending2",
      title: "Sending Domain #2",
      fields: [
        { id: "name", label: "Domain Name", placeholder: "e.g., tryacme.com", type: "text" },
        { id: "inboxes", label: "Number of Inboxes", placeholder: "e.g., 3", type: "number" },
        { id: "volume", label: "Target Daily Volume", placeholder: "e.g., 90-120", type: "text" }
      ]
    },
    {
      id: "sending3",
      title: "Sending Domain #3",
      fields: [
        { id: "name", label: "Domain Name", placeholder: "e.g., hiacme.com", type: "text" },
        { id: "inboxes", label: "Number of Inboxes", placeholder: "e.g., 3", type: "number" },
        { id: "volume", label: "Target Daily Volume", placeholder: "e.g., 90-120", type: "text" }
      ]
    },
    {
      id: "backup",
      title: "Backup/Rotation Domain",
      fields: [
        { id: "name", label: "Domain Name", placeholder: "e.g., useacme.com", type: "text" },
        { id: "status", label: "Current Status", placeholder: "e.g., Warming up, Ready, Resting", type: "text" }
      ]
    },
    {
      id: "costs",
      title: "Cost Estimate",
      fields: [
        { id: "domains", label: "Total Domains", placeholder: "e.g., 4", type: "number" },
        { id: "inboxes-total", label: "Total Inboxes", placeholder: "e.g., 11", type: "number" },
        { id: "monthly", label: "Estimated Monthly Cost", placeholder: "e.g., $85", type: "text" }
      ]
    }
  ]}
/>

---

## Domain Retirement and Rotation

Even healthy domains need rest. Here's when and how to rotate:

### The Domain Health Traffic Light

<SwipeDecision
  title="Domain Health Check"
  description="Swipe right for healthy domains, left for domains that need rest"
  optionA="Needs Rest"
  optionB="Healthy"
  persistKey="email-deliverability-L4-swipe"
  cards={[
    { 
      id: "1", 
      content: "Complaint rate: 0.03%, Open rate: 22%, Inbox placement: 85%", 
      correctOption: "b", 
      explanation: "All metrics healthy. Keep sending." 
    },
    { 
      id: "2", 
      content: "Complaint rate: 0.12%, Open rate: 18%, Inbox placement: 72%", 
      correctOption: "a", 
      explanation: "Complaint rate above 0.1% threshold. Pause immediately." 
    },
    { 
      id: "3", 
      content: "Complaint rate: 0.05%, Open rate: 15%, Inbox placement: 68%", 
      correctOption: "a", 
      explanation: "Inbox placement below 70% is a red flag. Rest for 30 days." 
    },
    { 
      id: "4", 
      content: "Complaint rate: 0.02%, Open rate: 25%, Inbox placement: 90%", 
      correctOption: "b", 
      explanation: "Excellent metrics. This domain is performing well." 
    },
    { 
      id: "5", 
      content: "Complaint rate: 0.08%, Open rate: 20%, Inbox placement: 78%", 
      correctOption: "a", 
      explanation: "Complaint rate approaching danger zone. Reduce volume or rest." 
    }
  ]}
/>

### When to Rest a Domain

**Immediate rest (stop sending today):**
- Complaint rate above 0.1%
- Inbox placement below 60%
- Blacklist appearance (check MXToolbox)
- Sudden drop in open rates (>30% decline)

**Proactive rest (planned rotation):**
- After 6-12 months of continuous sending
- When complaint rate trends upward (even if below 0.1%)
- Before launching a new campaign to a different ICP
- When you want to test a new messaging angle

### The Rest and Recovery Protocol

<DecisionTree
  title="Domain Recovery Decision Tree"
  persistKey="email-deliverability-L4-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Your domain's inbox placement dropped to 65%. What's your first step?", 
      choices: [
        { label: "Immediately stop all sending", nextNodeId: "stop" },
        { label: "Reduce volume by 50%", nextNodeId: "reduce" },
        { label: "Check for blacklist", nextNodeId: "blacklist" }
      ]
    },
    { 
      id: "stop", 
      content: "Good. You've stopped sending. Next?", 
      choices: [
        { label: "Check Google Postmaster and SNDS", nextNodeId: "monitor" },
        { label: "Wait 7 days and resume", nextNodeId: "wait-bad" }
      ]
    },
    { 
      id: "reduce", 
      content: "Reducing volume helps, but 65% placement means something is seriously wrong. You should stop entirely.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "blacklist", 
      content: "Checking blacklists is smart, but you should stop sending first to prevent further damage.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "monitor", 
      content: "You check Postmaster. Reputation score is 'Low'. Spam rate is 0.15%. What now?", 
      choices: [
        { label: "Rest domain for 60 days", nextNodeId: "rest-60" },
        { label: "Rest domain for 30 days", nextNodeId: "rest-30" },
        { label: "Switch to backup domain immediately", nextNodeId: "switch" }
      ]
    },
    { 
      id: "wait-bad", 
      content: "7 days isn't enough for reputation recovery. You resume sending and get flagged again immediately.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "rest-60", 
      content: "Correct. 60 days gives the domain time to recover. You switch to your backup domain and continue sending.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "rest-30", 
      content: "30 days might work for minor issues, but 0.15% spam rate needs 60+ days. You risk re-burning the domain.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "switch", 
      content: "Yes! Switch to your backup domain immediately. Let the damaged domain rest for 60-90 days.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

### The Rotation Calendar

**Proactive rotation strategy:**

| Month | Domain 1 | Domain 2 | Domain 3 | Domain 4 |
|-------|----------|----------|----------|----------|
| 1-3 | Sending | Sending | Sending | Warming |
| 4-6 | Sending | Sending | Resting | Sending |
| 7-9 | Sending | Resting | Sending | Sending |
| 10-12 | Resting | Sending | Sending | Sending |

**Benefits:**
- Always have 3 active domains
- Each domain gets 3 months rest per year
- Backup domain always ready
- Prevents reputation fatigue

---

## The Complete Setup Checklist

<InteractiveChecklist 
  title="Multi-Domain Infrastructure Checklist" 
  persistKey="email-deliverability-L4-checklist" 
  items={[
    "Identify 4-5 domain name variations (get-, try-, hi-, use-)",
    "Purchase domains (.com only) via Namecheap or Cloudflare",
    "Set up Google Workspace or Microsoft 365 for each domain",
    "Create 2-3 inboxes per sending domain",
    "Configure SPF, DKIM, and DMARC for each domain (Lesson 2)",
    "Set up domain redirects or landing pages",
    "Wait 14+ days before sending from new domains",
    "Start warmup protocol (Lesson 6) for all inboxes",
    "Set up monitoring (Google Postmaster, SNDS, GlockApps)",
    "Create rotation calendar (which domains active when)",
    "Document your domain architecture in your Infra Blueprint",
    "Set up centralized reply inbox (HubSpot or shared Gmail)",
    "Configure backup domain and keep it warming"
  ]} 
/>

---

## Cost-Benefit Analysis

Let's do the math on whether multi-domain infrastructure is worth it:

<ScenarioSimulator
  title="Domain Strategy ROI Calculator"
  persistKey="email-deliverability-L4-simulator"
  levers={[
    { id: "domains", label: "Number of sending domains", min: 1, max: 5, step: 1, defaultValue: 3 },
    { id: "inboxes", label: "Inboxes per domain", min: 1, max: 5, step: 1, defaultValue: 3 },
    { id: "emailsPerInbox", label: "Emails per inbox/day", min: 10, max: 50, step: 5, defaultValue: 30 }
  ]}
  outputs={[
    { id: "totalInboxes", label: "Total inboxes", formula: "domains * inboxes", unit: "", precision: 0 },
    { id: "dailyCapacity", label: "Daily email capacity", formula: "domains * inboxes * emailsPerInbox", unit: "emails", precision: 0 },
    { id: "monthlyCost", label: "Monthly infrastructure cost", formula: "(domains * 1) + (domains * inboxes * 7.20)", unit: "$", precision: 2 },
    { id: "annualCost", label: "Annual infrastructure cost", formula: "((domains * 1) + (domains * inboxes * 7.20)) * 12", unit: "$", precision: 2 }
  ]}
  insight="With `{domains}` domains and {totalInboxes} inboxes, you can safely send {dailyCapacity} emails/day. Annual cost: ${annualCost}. Compare this to the cost of burning your main domain (potentially $10K-100K+ in lost revenue)."
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Think of domains like microservices. Your main domain is your production API — you never test experimental code there. Sending domains are your staging environments. If one breaks, you swap it out without touching production.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Your main domain is your reputation. Every client email, every course delivery, every payment confirmation flows through it. Sending cold outreach from your main domain is like using your personal phone number for cold calling — one spam complaint and your entire business communication is compromised.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Content Creators">
Your main domain is your media brand. Newsletter subscribers, course students, affiliate partners — they all trust emails from that domain. Mixing cold outreach with your content delivery is like posting ads in your Instagram stories without labeling them. It erodes trust fast.
</ContextualNote>

---

## Common Mistakes to Avoid

<StrategyDuel
  title="Single Domain vs. Multi-Domain"
  persistKey="email-deliverability-L4-duel"
  scenario="You're launching cold outreach for the first time. You have $100/month budget."
  strategyA={{ 
    name: "Single Domain Strategy", 
    description: "Send all cold email from main domain to save money", 
    pros: ["Lower cost ($7.20/month for one inbox)", "Simpler to manage", "Fewer DNS records to configure"], 
    cons: ["One spam complaint can destroy your brand", "No backup if domain gets flagged", "Can't scale beyond 50 emails/day safely", "Recovery takes 30-90 days", "Risk to customer communications"] 
  }}
  strategyB={{ 
    name: "Multi-Domain Strategy", 
    description: "Set up 3 sending domains + main domain", 
    pros: ["Main domain protected", "Can scale to 300+ emails/day", "Backup domains ready", "Isolated risk", "Professional infrastructure"], 
    cons: ["Higher cost (~$85/month)", "More complex setup", "More DNS records to manage"] 
  }}
  expertVerdict="Multi-domain wins every time. The $85/month cost is insurance against a $10K-100K+ disaster. Solo founders who skip this step almost always regret it within 3-6 months. The single biggest deliverability mistake is sending cold email from your main domain."
/>

### The Top 5 Domain Strategy Mistakes

1. **Sending cold email from your main domain** — We've covered this. Don't do it.

2. **Using .io or .xyz domains for cold outreach** — Spam filters flag these extensions heavily. Stick to .com.

3. **Not waiting 14 days before sending** — New domains have zero reputation. Rushing = instant spam folder.

4. **Running too many inboxes per domain** — More than 3-4 inboxes per domain looks suspicious. Spread across more domains instead.

5. **Not having a backup domain ready** — When a domain gets flagged, you need to switch immediately. No backup = lost sending days.

<MiniRoleplay
  scenario="A prospect replies: 'Why are you emailing me from getacme.com instead of acme.com? Is this a scam?'"
  role="You are the founder responding"
  persistKey="email-deliverability-L4-roleplay"
  modelResponse="Great question! We use getacme.com for outbound outreach to keep our main domain (acme.com) focused on customer communications. It's a common practice for email deliverability. You can verify we're legitimate by visiting acme.com — same team, same company. Happy to continue the conversation from our main domain if you prefer."
/>

---

## Your Domain Strategy Blueprint

You now have everything you need to build a bulletproof domain architecture. Here's your implementation plan:

<InteractiveChecklist 
  title="7-Day Domain Setup Sprint" 
  persistKey="email-deliverability-L4-sprint" 
  items={[
    "Day 1: Brainstorm 5 domain name variations, check availability",
    "Day 1: Purchase 4 domains (.com only) via Namecheap/Cloudflare",
    "Day 2: Set up Google Workspace or Microsoft 365 for each domain",
    "Day 2: Create 2-3 inboxes per sending domain (9-12 total)",
    "Day 3: Configure DNS records (SPF, DKIM, DMARC) for all domains",
    "Day 3: Set up domain redirects or simple landing pages",
    "Day 4: Verify all DNS records with MXToolbox",
    "Day 4: Set up Google Postmaster and Microsoft SNDS monitoring",
    "Day 5: Create centralized reply inbox (HubSpot or shared Gmail)",
    "Day 5: Document your domain architecture in a spreadsheet",
    "Day 6: Set up warmup tools (MailReach or Instantly) for all inboxes",
    "Day 7: Start warmup protocol at 5 emails/day per inbox",
    "Day 7: Create rotation calendar for next 12 months"
  ]} 
/>

### Next Steps

In **Lesson 5**, we'll walk through the complete DNS setup checklist step-by-step, with exact records to copy-paste for each domain.

In **Lesson 6**, we'll build your 30-day warmup plan to take your inboxes from 5/day to 30-50/day safely.

But first, complete your domain architecture plan using the template above. This is the foundation of your entire email infrastructure.

---

## Quiz: Domain Strategy Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the primary reason for never sending cold email from your main domain?",
      "options": [
        "It's more expensive",
        "One spam complaint can destroy your brand's email reputation",
        "It's harder to track metrics",
        "ISPs block main domains automatically"
      ],
      "correctAnswer": 1,
      "explanation": "Your main domain handles all customer communications, support emails, and transactional messages. One spam complaint from cold outreach can flag your entire domain, causing legitimate emails to land in spam. Recovery takes 30-90 days and can cost tens of thousands in lost revenue."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "How many sending domains should a solo founder targeting 200-400 emails/day use?",
      "options": [
        "1 (just the main domain)",
        "2 (main + 1 sending)",
        "3-5 (main + 3-5 sending)",
        "10+ (maximum redundancy)"
      ],
      "correctAnswer": 2,
      "explanation": "3-5 sending domains (plus your main domain) provides the right balance of redundancy, scalability, and manageability. This allows you to rotate domains, have backups ready, and scale to 300-400+ emails/day safely."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "What domain extension should you use for cold outreach domains?",
      "options": [
        ".io (modern and tech-focused)",
        ".xyz (cheap and available)",
        ".com (highest trust score)",
        ".co (short and memorable)"
      ],
      "correctAnswer": 2,
      "explanation": ".com domains have the highest trust score with email filters. .io, .xyz, and other alternative extensions are associated with temporary/throwaway domains and trigger spam filters more aggressively."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "How long should you wait before sending cold emails from a brand-new domain?",
      "options": [
        "0 days (start immediately)",
        "3-5 days (minimal wait)",
        "14+ days (recommended minimum)",
        "90 days (maximum safety)"
      ],
      "correctAnswer": 2,
      "explanation": "New domains need minimum 14 days to age before sending cold emails. This allows DNS records to propagate globally and gives ISPs time to build an initial sender profile. Sending from a domain younger than 14 days significantly increases spam placement risk."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "When should you immediately stop sending from a domain?",
      "options": [
        "When open rates drop by 10%",
        "When complaint rate exceeds 0.1%",
        "When you've been sending for 6 months",
        "When you get your first unsubscribe"
      ],
      "correctAnswer": 1,
      "explanation": "A complaint rate above 0.1% is Google and Yahoo's danger threshold. At 0.3%, they begin blocking your domain entirely. If you hit 0.1%, stop sending immediately, investigate the cause, and rest the domain for 60-90 days."
    },
    {
      "id": "q6",
      "type": "multiple-choice",
      "question": "What's the recommended maximum number of inboxes per sending domain?",
      "options": [
        "1 inbox (one domain, one inbox)",
        "2-3 inboxes (recommended)",
        "5-10 inboxes (maximize volume)",
        "Unlimited (no restrictions)"
      ],
      "correctAnswer": 1,
      "explanation": "2-3 inboxes per domain is the sweet spot. More than 3-4 inboxes per domain starts to look suspicious to ISPs and increases the risk of the entire domain being flagged if one inbox has issues."
    },
    {
      "id": "q7",
      "type": "true-false",
      "question": "True or False: You should use your main domain in your email signature even when sending from a sending domain.",
      "options": ["True", "False"],
      "correctAnswer": 0,
      "explanation": "True. Your email signature should always reference your main domain (e.g., acme.com), not the sending domain (e.g., getacme.com). This builds brand consistency and legitimacy. The sending domain is just infrastructure — your brand is your main domain."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "What should you do with a sending domain that has been flagged for spam?",
      "options": [
        "Delete it immediately and buy a new one",
        "Reduce sending volume by 50% and continue",
        "Rest it for 60-90 days while using a backup domain",
        "Switch to a different email provider"
      ],
      "correctAnswer": 2,
      "explanation": "Rest the flagged domain for 60-90 days to allow reputation recovery. Switch to your backup domain immediately to continue sending. Never delete a domain — you can recover it with time. Reducing volume doesn't fix reputation damage."
    },
    {
      "id": "q9",
      "type": "multiple-choice",
      "question": "What's the estimated monthly cost for a complete multi-domain infrastructure (4 domains, 11 inboxes)?",
      "options": [
        "$20-30/month",
        "$50-60/month",
        "$80-90/month",
        "$150-200/month"
      ],
      "correctAnswer": 2,
      "explanation": "4 domains × $1/month = $4. 11 inboxes × $7.20/month (Google Workspace) = $79.20. Total: ~$83/month. This is the insurance cost to protect your main domain and scale safely to 300-400 emails/day."
    },
    {
      "id": "q10",
      "type": "multiple-choice",
      "question": "Which domain naming pattern is most legitimate for cold outreach?",
      "options": [
        "acme-sales.com",
        "acme123.com",
        "getacme.com",
        "acme.xyz"
      ],
      "correctAnswer": 2,
      "explanation": "getacme.com follows the best practice of adding a prefix (get-, try-, hi-, use-) to your brand name with a .com extension. This looks like a legitimate brand variation. Hyphens, numbers, and alternative extensions (.xyz) trigger spam filters."
    }
  ]
}