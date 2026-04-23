---
title: "B2B vs Creator Infra Templates"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 11
---

# B2B vs Creator Infra Templates

## The Infrastructure Mistake That Cost $4,800

Meet Jordan, a technical founder selling dev tools to engineering teams. After 10 weeks of careful warmup, Jordan had a beautiful setup: 4 sending domains, 12 inboxes, perfect DNS records, and a 92% inbox placement rate.

Then Jordan launched a creator side hustle — a paid newsletter for indie hackers. Same infrastructure. Same domains. Same inboxes.

Within 72 hours:
- Inbox placement dropped to 34%
- Google Postmaster score went from "High" to "Low"
- Microsoft SNDS turned red
- All four sending domains were soft-blocked

The recovery took 8 weeks, required purchasing 4 new domains, and cost $4,800 in lost pipeline (B2B deals that went cold during the blackout).

**What went wrong?**

Jordan mixed B2B cold outreach infrastructure with creator broadcast infrastructure. These are fundamentally different use cases with incompatible requirements.

<InsightCard icon="⚠️" title="The Core Problem">
B2B cold outreach = 200-400 highly personalized sends/day to verified business emails. Creator broadcasts = 5,000-50,000 sends to self-opted subscribers. Same tools, opposite strategies. Mixing them destroys both.
</InsightCard>

In this lesson, you'll learn:
- Why B2B and creator infrastructure must be completely separate
- The exact template for each use case (domains, inboxes, tools, volume)
- How to run both without cross-contamination
- When you can (rarely) share infrastructure safely

---

## Why B2B and Creator Infra Are Incompatible

Let's start with the fundamental differences:

<FlipCard 
  front="B2B Cold Outreach Model" 
  back="200-400 sends/day across 12 inboxes. Each email is 1:1 personalized. Recipients didn't opt in. Success = 5-10% reply rate. Reputation built on engagement quality." 
/>

<FlipCard 
  front="Creator Broadcast Model" 
  back="5,000-50,000 sends/day from 1-2 inboxes. Same content to all recipients. Recipients explicitly opted in. Success = 20-40% open rate. Reputation built on low complaint rate." 
/>

### The Technical Differences

| Dimension | B2B Cold Outreach | Creator Broadcasts |
|-----------|-------------------|-------------------|
| **Daily Volume** | 200-400 total | 5,000-50,000+ |
| **Personalization** | 100% (every email unique) | 0% (same content to all) |
| **Opt-In Status** | No (cold prospecting) | Yes (explicit subscription) |
| **Inbox Count** | 10-15 (distributed) | 1-2 (centralized) |
| **Domain Strategy** | 3-5 sending domains | 1 dedicated domain |
| **ESP Type** | Instantly, Smartlead, Lemlist | ConvertKit, Beehiiv, Substack |
| **Complaint Threshold** | &lt;0.1% (strict) | &lt;0.1% (strict, but easier to maintain) |
| **Engagement Metric** | Reply rate (5-10%) | Open rate (20-40%) |
| **Warmup Period** | 4 weeks per inbox | 2-4 weeks for domain |
| **Google Bulk Sender Rules** | Usually exempt (&lt;5,000/day) | Fully subject to rules |

<RangeSlider 
  label="What percentage of your revenue comes from creator activities (newsletters, courses, communities)?" 
  min={0} 
  max={100} 
  lowLabel="0% (pure B2B)" 
  highLabel="100% (pure creator)" 
  persistKey="email-deliverability-L11-creator-split" 
/>

<ContextualNote showWhen={{ creatorSplit: { min: 20 } }} variant="personalized" title="You Need Dual Infrastructure">
With 20%+ revenue from creator activities, you need completely separate infrastructure. The templates below will show you exactly how to set this up without doubling your costs.
</ContextualNote>

---

## What Happens When You Mix Them

Let's walk through the failure cascade that hit Jordan:

<SlideNavigation>
<Slide title="Day 1: The Launch">

Jordan sends the first newsletter issue to 8,000 subscribers using the same Instantly account and sending domains used for B2B cold outreach.

**What the ISPs see:**
- Sudden 20x volume spike (from 400/day to 8,000/day)
- Identical content to thousands of recipients (broadcast pattern)
- Sending from domains with B2B cold outreach history
- Mixed engagement signals (B2B = high reply, creator = high open but low reply)

**Immediate red flags:**
- Google: "This sender just changed behavior dramatically"
- Microsoft: "Volume spike + broadcast pattern = potential spam"
- Yahoo: "Domain reputation doesn't match new sending pattern"

</Slide>

<Slide title="Day 2: The Complaint Spike">

Out of 8,000 sends:
- 6,400 delivered (80% — already lower than the 95% B2B rate)
- 1,280 opened (20% open rate — normal for newsletters)
- 16 spam complaints (0.2% complaint rate)

**Why 0.2% is catastrophic:**
- B2B infrastructure was optimized for &lt;0.05% complaints
- 0.2% is 4x the safe threshold
- Google/Yahoo/Microsoft all flag the sending domains

**The cascade begins:**
- Google Postmaster score drops from "High" to "Medium"
- Microsoft SNDS shows yellow (caution)
- Next B2B sends start hitting spam (collateral damage)

</Slide>

<Slide title="Day 3: The Blacklist">

Jordan sends newsletter issue #2 (weekly cadence) + continues B2B outreach.

**What happens:**
- Newsletter: 45% inbox placement (down from 80%)
- B2B cold emails: 34% inbox placement (down from 92%)
- Microsoft SNDS turns red (blocked)
- Spamhaus lists one sending IP

**The death spiral:**
- Lower inbox placement → lower engagement → worse reputation → even lower placement
- B2B prospects never see emails → deals go cold
- Newsletter subscribers don't see issues → unsubscribe rate spikes

</Slide>

<Slide title="Week 2: The Recovery Attempt">

Jordan pauses all sending, tries to recover:

**Actions taken:**
- Stopped all cold outreach
- Moved newsletter to ConvertKit (correct move, but too late)
- Submitted delisting requests to Spamhaus
- Increased warmup volume on B2B inboxes

**Results:**
- Spamhaus delisting: 7 days
- Google Postmaster recovery: 4 weeks
- Microsoft SNDS recovery: 6 weeks
- Lost B2B pipeline: $4,800 (deals that went cold)

**The lesson:**
Prevention costs $0. Recovery costs weeks + thousands in lost revenue.

</Slide>
</SlideNavigation>

<ExampleCard label="Case Study: The Right Way">
Sarah runs a B2B SaaS ($15K MRR) and a paid newsletter (2,000 subscribers, $10K MRR). She uses:

**B2B Infrastructure:**
- 3 sending domains (getsarahco.com, trysarahco.com, hisarahco.com)
- 9 inboxes across those domains
- Instantly.ai for sequencing
- 250-300 B2B sends/day
- 8-10% reply rate, &lt;0.03% complaints

**Creator Infrastructure:**
- 1 dedicated domain (newsletter.sarahco.com)
- ConvertKit for sending
- 2,000 subscribers, weekly sends
- 35% open rate, &lt;0.05% complaints

**Result:** Both systems run flawlessly for 18 months. Zero cross-contamination. Total cost: $140/mo (B2B: $90, Creator: $50).
</ExampleCard>

---

## Template 1: Pure B2B Infrastructure

Use this template if you're 100% B2B cold outreach with no creator activities.

### Domain Architecture

<TemplateBuilder
  title="B2B Domain Setup"
  persistKey="email-deliverability-L11-b2b-domains"
  sections={[
    {
      id: "main",
      title: "Main Domain",
      fields: [
        { id: "domain", label: "Main Domain", placeholder: "e.g., acme.com", type: "text" },
        { id: "purpose", label: "Purpose", value: "Website, inbound email, replies", type: "readonly" }
      ]
    },
    {
      id: "sending",
      title: "Sending Domains",
      fields: [
        { id: "domain1", label: "Sending Domain 1", placeholder: "e.g., getacme.com", type: "text" },
        { id: "domain2", label: "Sending Domain 2", placeholder: "e.g., tryacme.com", type: "text" },
        { id: "domain3", label: "Sending Domain 3", placeholder: "e.g., hiacme.com", type: "text" },
        { id: "backup", label: "Backup Domain", placeholder: "e.g., useacme.com", type: "text" }
      ]
    },
    {
      id: "inboxes",
      title: "Inbox Allocation",
      fields: [
        { id: "perDomain", label: "Inboxes per sending domain", value: "3", type: "number" },
        { id: "total", label: "Total sending inboxes", value: "9-12", type: "readonly" },
        { id: "naming", label: "Naming pattern", placeholder: "e.g., alex@, sam@, jordan@", type: "text" }
      ]
    }
  ]}
/>

### Volume Targets

| Metric | Target | Notes |
|--------|--------|-------|
| **Total daily sends** | 200-400 | Across all inboxes |
| **Per inbox limit** | 30-50/day | Safe cold email limit |
| **Sending window** | 8am-2pm recipient TZ | Business hours only |
| **Weekend volume** | 0 or 50% | Lower engagement risk |
| **Warmup period** | 4 weeks | Per inbox, staggered start |

### Tool Stack

<ComparisonBuilder
  title="Your B2B Tool Stack"
  persistKey="email-deliverability-L11-b2b-stack"
  prompt="List the tools you're using or plan to use"
  expertExample="Instantly.ai ($37/mo) + MailReach warmup ($25/mo × 12 inboxes = $300/mo during warmup, $75/mo maintenance) + Google Workspace ($7.20/mo × 12 = $86/mo) + GlockApps ($59/mo for monitoring)"
  criteria={["Sending platform specified", "Warmup tool included", "Email hosting chosen", "Monitoring tool listed"]}
/>

### DNS Configuration (Per Sending Domain)

```
; MX Records (Google Workspace)
@ MX 1 aspmx.l.google.com.
@ MX 5 alt1.aspmx.l.google.com.
@ MX 5 alt2.aspmx.l.google.com.
@ MX 10 alt3.aspmx.l.google.com.
@ MX 10 alt4.aspmx.l.google.com.

; SPF Record
@ TXT "v=spf1 include:_spf.google.com include:_spf.instantly.ai ~all"

; DKIM Record (from Google Admin + Instantly)
google._domainkey TXT "v=DKIM1; k=rsa; p=[YOUR_KEY]"
instantly._domainkey TXT "v=DKIM1; k=rsa; p=[INSTANTLY_KEY]"

; DMARC Record
_dmarc TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=100"

; Redirect to main site
@ A [Your hosting IP or Cloudflare]
www CNAME yourdomain.com
```

### Monthly Cost Breakdown

| Item | Quantity | Unit Cost | Total |
|------|----------|-----------|-------|
| Sending domains | 4 | $12/year | $4/mo |
| Google Workspace | 12 inboxes | $7.20/mo | $86/mo |
| Instantly.ai | 1 account | $37/mo | $37/mo |
| MailReach (maintenance) | 3 inboxes | $25/mo | $75/mo |
| GlockApps | 1 account | $59/mo | $59/mo |
| **Total** | | | **~$261/mo** |

<InsightCard icon="💡" title="Cost Optimization">
After warmup (week 5+), reduce MailReach to 3 inboxes for spot-checking instead of all 12. Drops monthly cost to ~$186/mo.
</InsightCard>

---

## Template 2: Pure Creator Infrastructure

Use this template if you're 100% creator (newsletter, course emails, community broadcasts) with no B2B cold outreach.

### Domain Architecture

<TemplateBuilder
  title="Creator Domain Setup"
  persistKey="email-deliverability-L11-creator-domains"
  sections={[
    {
      id: "main",
      title: "Main Domain",
      fields: [
        { id: "domain", label: "Main Domain", placeholder: "e.g., sarahsmith.com", type: "text" },
        { id: "purpose", label: "Purpose", value: "Website, personal brand, inbound", type: "readonly" }
      ]
    },
    {
      id: "sending",
      title: "Sending Domain",
      fields: [
        { id: "newsletter", label: "Newsletter Domain", placeholder: "e.g., newsletter.sarahsmith.com or mail.sarahsmith.com", type: "text" },
        { id: "why", label: "Why separate?", value: "Isolates broadcast reputation from personal brand", type: "readonly" }
      ]
    },
    {
      id: "inboxes",
      title: "Inbox Strategy",
      fields: [
        { id: "count", label: "Sending inboxes needed", value: "1-2", type: "readonly" },
        { id: "naming", label: "From name", placeholder: "e.g., Sarah Smith, The Weekly Brief", type: "text" }
      ]
    }
  ]}
/>

### Volume Targets

| Metric | Target | Notes |
|--------|--------|-------|
| **List size** | 500-50,000+ | Opt-in subscribers only |
| **Send frequency** | 1-3x/week | Consistency > volume |
| **Bulk sender threshold** | >5,000/day | Triggers Google/Yahoo requirements |
| **Complaint rate target** | &lt;0.1% | Easier with opt-in lists |
| **Warmup period** | 2-4 weeks | Faster than B2B (opt-in helps) |

### Tool Stack

| Tool | Function | Pricing | When to Use |
|------|----------|---------|-------------|
| **ConvertKit** | Newsletter ESP | $25/mo (0-1K), $41/mo (1K-3K) | Best for &lt;10K subscribers |
| **Beehiiv** | Newsletter + monetization | Free (0-2.5K), $49/mo (2.5K-10K) | Best for growth + ads |
| **Substack** | Newsletter + paid subs | Free (10% of paid revenue) | Best for paid newsletters |
| **Kit (ConvertKit)** | Course emails + automations | $25-100/mo | Best for course creators |
| **MailerLite** | Budget ESP | Free (0-1K), $10/mo (1K-2.5K) | Best for tight budgets |

<DecisionTree
  title="Choose Your Creator ESP"
  persistKey="email-deliverability-L11-esp-choice"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "What's your primary creator revenue model?",
      choices: [
        { label: "Free newsletter (building audience)", nextNodeId: "free" },
        { label: "Paid newsletter subscriptions", nextNodeId: "paid" },
        { label: "Course/product emails", nextNodeId: "course" }
      ]
    },
    {
      id: "free",
      content: "Current list size?",
      choices: [
        { label: "Under 2,500", nextNodeId: "beehiiv-free" },
        { label: "2,500-10,000", nextNodeId: "convertkit" }
      ]
    },
    {
      id: "paid",
      content: "Do you want platform to handle payments?",
      choices: [
        { label: "Yes, all-in-one", nextNodeId: "substack" },
        { label: "No, I'll use Stripe", nextNodeId: "convertkit" }
      ]
    },
    {
      id: "course",
      content: "Beehiiv (free tier) if &lt;2.5K subscribers. ConvertKit if you need advanced automations.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "beehiiv-free",
      content: "Beehiiv free tier (0-2.5K subscribers). Upgrade to $49/mo at 2.5K.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "convertkit",
      content: "ConvertKit ($25-41/mo). Best deliverability, powerful automations.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "substack",
      content: "Substack (free, 10% of paid revenue). Easiest for paid newsletters.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

### DNS Configuration (Newsletter Domain)

```
; MX Records (ConvertKit example)
@ MX 10 mx1.convertkit.com.
@ MX 20 mx2.convertkit.com.

; SPF Record
@ TXT "v=spf1 include:_spf.convertkit.com ~all"

; DKIM Record (from ConvertKit dashboard)
ck._domainkey TXT "v=DKIM1; k=rsa; p=[CONVERTKIT_KEY]"

; DMARC Record
_dmarc TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=100"

; Custom tracking domain (optional)
track CNAME track.convertkit.com.
```

### Monthly Cost Breakdown (Example: 3,000 Subscribers)

| Item | Quantity | Unit Cost | Total |
|------|----------|-----------|-------|
| Newsletter domain | 1 | $12/year | $1/mo |
| ConvertKit | 3K subscribers | $41/mo | $41/mo |
| GlockApps (optional) | 1 account | $59/mo | $59/mo |
| **Total** | | | **~$42-101/mo** |

<InsightCard icon="🎯" title="Creator Cost Advantage">
Creator infrastructure is 60-75% cheaper than B2B because you need fewer domains, fewer inboxes, and no multi-inbox warmup tools.
</InsightCard>

---

## Template 3: Dual Infrastructure (B2B + Creator)

Use this template if you run both B2B cold outreach AND creator activities (the most common scenario for solo founders).

### The Golden Rule: Complete Separation

<FlipCard 
  front="Why You Must Separate" 
  back="B2B and creator use different sending patterns, different ESPs, different domains, and different reputation signals. Mixing them creates conflicting signals that destroy both." 
/>

### Domain Architecture (Dual Setup)

| Domain Type | Purpose | Example | DNS/ESP |
|-------------|---------|---------|---------|
| **Main Domain** | Website, personal brand | acme.com | Website hosting |
| **B2B Sending 1** | Cold outreach A | getacme.com | Google Workspace + Instantly |
| **B2B Sending 2** | Cold outreach B | tryacme.com | Google Workspace + Instantly |
| **B2B Sending 3** | Cold outreach C | hiacme.com | Google Workspace + Instantly |
| **Creator Domain** | Newsletter/broadcasts | newsletter.acme.com | ConvertKit/Beehiiv |

**Total domains needed:** 5 (1 main + 3 B2B + 1 creator)

### Inbox Architecture

<TemplateBuilder
  title="Dual Infrastructure Inbox Map"
  persistKey="email-deliverability-L11-dual-inboxes"
  sections={[
    {
      id: "b2b",
      title: "B2B Inboxes",
      fields: [
        { id: "domain1", label: "Domain 1 inboxes", placeholder: "e.g., alex@, sam@, jordan@", type: "text" },
        { id: "domain2", label: "Domain 2 inboxes", placeholder: "e.g., chris@, taylor@, morgan@", type: "text" },
        { id: "domain3", label: "Domain 3 inboxes", placeholder: "e.g., casey@, riley@, avery@", type: "text" },
        { id: "total", label: "Total B2B inboxes", value: "9", type: "readonly" }
      ]
    },
    {
      id: "creator",
      title: "Creator Inboxes",
      fields: [
        { id: "newsletter", label: "Newsletter inbox", placeholder: "e.g., hello@newsletter.acme.com", type: "text" },
        { id: "total", label: "Total creator inboxes", value: "1", type: "readonly" }
      ]
    }
  ]}
/>

### Tool Stack (Dual Setup)

| Category | B2B Tools | Creator Tools | Why Separate |
|----------|-----------|---------------|--------------|
| **Sending Platform** | Instantly.ai | ConvertKit | Different sending patterns |
| **Email Hosting** | Google Workspace (9 inboxes) | ConvertKit (managed) | Different volume needs |
| **Warmup** | MailReach (3 inboxes) | Not needed (opt-in) | B2B needs warmup, creator doesn't |
| **Monitoring** | GlockApps | Built into ConvertKit | Different metrics matter |

### Volume Separation

| Activity | Daily Volume | Weekly Volume | Infrastructure |
|----------|--------------|---------------|----------------|
| **B2B Cold Outreach** | 200-400 | 1,000-2,000 | 3 domains, 9 inboxes, Instantly |
| **Creator Newsletter** | 0 (1-3x/week) | 5,000-20,000 | 1 domain, 1 inbox, ConvertKit |
| **Total** | 200-400/day avg | 6,000-22,000/week | Completely isolated |

<InsightCard icon="⚠️" title="Never Cross the Streams">
Do not send B2B emails through ConvertKit. Do not send newsletters through Instantly. Do not share domains. Do not share inboxes. Treat them as two completely separate businesses.
</InsightCard>

### Monthly Cost Breakdown (Dual Setup)

| Item | Quantity | Unit Cost | Total |
|------|----------|-----------|-------|
| **B2B Infrastructure** | | | |
| Sending domains | 3 | $12/year | $3/mo |
| Google Workspace | 9 inboxes | $7.20/mo | $65/mo |
| Instantly.ai | 1 account | $37/mo | $37/mo |
| MailReach | 3 inboxes | $25/mo | $75/mo |
| **Creator Infrastructure** | | | |
| Newsletter domain | 1 | $12/year | $1/mo |
| ConvertKit | 3K subs | $41/mo | $41/mo |
| **Shared** | | | |
| GlockApps | 1 account | $59/mo | $59/mo |
| **Total** | | | **~$281/mo** |

<RangeSlider 
  label="How much would you pay per month for infrastructure that protects both B2B and creator revenue streams?" 
  min={0} 
  max={500} 
  lowLabel="$0" 
  highLabel="$500+" 
  persistKey="email-deliverability-L11-budget" 
/>

---

## When You Can (Rarely) Share Infrastructure

There are exactly **two scenarios** where you can safely share infrastructure:

### Scenario 1: Transactional + B2B

**What it is:** Transactional emails (password resets, receipts, notifications) sent from the same domain as B2B cold outreach.

**Why it works:** Transactional emails have extremely high engagement (80%+ open rates) and near-zero complaints. They boost domain reputation.

**How to do it safely:**
- Use a dedicated inbox for transactional (e.g., `noreply@getacme.com`)
- Keep transactional volume under 50/day
- Use a transactional ESP (Postmark, SendGrid) with proper tagging
- Monitor complaint rates obsessively

**Example:**
```
Domain: getacme.com
- alex@getacme.com → B2B cold outreach (30/day)
- sam@getacme.com → B2B cold outreach (30/day)
- noreply@getacme.com → Transactional (20/day)
Total: 80/day, mixed use case, works fine
```

### Scenario 2: Warm Outreach + Small Newsletter

**What it is:** Sending to a small (&lt;500 subscriber) newsletter list of people you've personally interacted with, using the same infrastructure as warm B2B outreach.

**Why it works:** Small, highly engaged lists with personal connection behave like warm outreach, not broadcasts.

**How to do it safely:**
- List must be &lt;500 subscribers
- Every subscriber must have replied to you personally at some point
- Send frequency: max 1x/week
- Use the same personalization as B2B (first name, context)
- Monitor complaint rate obsessively

**Example:**
```
Domain: tryacme.com
- jordan@tryacme.com → Warm B2B follow-ups (20/day)
- jordan@tryacme.com → Weekly newsletter to 300 engaged subscribers (1x/week)
Total: 20/day + 300/week, works because list is tiny and engaged
```

<SwipeDecision
  title="Safe to Share or Separate?"
  description="Swipe right if you can safely share infrastructure, left if you must separate"
  optionA="Must Separate"
  optionB="Safe to Share"
  persistKey="email-deliverability-L11-swipe"
  cards={[
    {
      id: "1",
      content: "B2B cold outreach (300/day) + newsletter to 5,000 subscribers (2x/week)",
      correctOption: "a",
      explanation: "5,000 subscribers = bulk sender rules. Must separate completely."
    },
    {
      id: "2",
      content: "B2B cold outreach (200/day) + transactional emails (30/day password resets)",
      correctOption: "b",
      explanation: "Transactional boosts reputation. Safe to share if monitored."
    },
    {
      id: "3",
      content: "Warm B2B follow-ups (50/day) + newsletter to 200 highly engaged subscribers (1x/week)",
      correctOption: "b",
      explanation: "Tiny, engaged list behaves like warm outreach. Safe if monitored."
    },
    {
      id: "4",
      content: "B2B cold outreach (400/day) + course launch emails to 2,000 students (daily for 7 days)",
      correctOption: "a",
      explanation: "Course launch = broadcast pattern. Will destroy B2B reputation."
    }
  ]}
/>

---

## Migration Strategies: Moving from Mixed to Separated

If you're currently running mixed infrastructure (like Jordan in the opening story), here's how to migrate safely:

<ProgressiveReveal title="The 4-Week Migration Plan" persistKey="email-deliverability-L11-migration">

<RevealSection title="Week 1: Audit and Plan">

**Actions:**
1. List all current sending domains and their purposes
2. Identify which emails are B2B cold vs creator broadcasts
3. Calculate current daily volumes for each type
4. Purchase new domains (if needed) and set up DNS
5. Choose creator ESP (ConvertKit, Beehiiv, etc.)

**Deliverables:**
- Complete domain map (current + future state)
- Tool selection decisions
- DNS records prepared (don't publish yet)

**Cost:** ~$50 (new domains + first month ESP)

</RevealSection>

<RevealSection title="Week 2: Set Up Creator Infrastructure">

**Actions:**
1. Publish DNS records for new creator domain
2. Set up ConvertKit/Beehiiv account
3. Import subscriber list to new ESP
4. Configure double opt-in for new subscribers
5. Send test emails to yourself and check placement
6. Start 2-week warmup (if needed)

**Deliverables:**
- Creator domain fully configured
- Subscriber list migrated
- First test send completed

**Risk:** Don't send to full list yet — warmup first

</RevealSection>

<RevealSection title="Week 3: Pause B2B, Migrate Creator">

**Actions:**
1. Pause all B2B cold outreach (let domains rest)
2. Send first real newsletter from new creator domain
3. Monitor inbox placement, complaint rate, engagement
4. Adjust send frequency if placement is low
5. Continue B2B domain warmup (maintenance mode)

**Deliverables:**
- First creator send from new infrastructure
- B2B domains resting and recovering

**Metric to watch:** Inbox placement should be >85% by end of week

</RevealSection>

<RevealSection title="Week 4: Resume B2B, Monitor Both">

**Actions:**
1. Resume B2B cold outreach at 50% volume
2. Monitor B2B inbox placement (should recover to 80%+)
3. Continue creator sends on new infrastructure
4. Set up separate monitoring dashboards (GlockApps for B2B, ConvertKit analytics for creator)
5. Document your dual infrastructure setup

**Deliverables:**
- Both systems running independently
- Monitoring in place for both
- Recovery confirmed (B2B placement back to baseline)

**Success criteria:** B2B placement >80%, creator placement >85%, zero cross-contamination

</RevealSection>

</ProgressiveReveal>

<ExampleCard label="Migration Case Study: Alex's Recovery">
Alex mixed B2B and creator for 6 months. Inbox placement dropped to 42% for both. Here's the recovery:

**Week 1:** Purchased 1 new creator domain ($12), set up Beehiiv free tier, migrated 1,800 subscribers.

**Week 2:** Paused all B2B sending. Sent first newsletter from new domain. Placement: 78% (good for new domain).

**Week 3:** B2B domains rested. Creator placement improved to 88%. Complaint rate: 0.04%.

**Week 4:** Resumed B2B at 50% volume. Placement recovered to 76% (from 42%). Continued ramping.

**Week 8:** B2B placement back to 89%. Creator placement stable at 91%. Total cost: $12 (domain) + $0 (Beehiiv free tier). Saved business.
</ExampleCard>

---

## Monitoring Strategy for Dual Infrastructure

You need separate monitoring for each system because the metrics that matter are different:

### B2B Monitoring Dashboard

<InteractiveChecklist 
  title="B2B Daily Checks" 
  persistKey="email-deliverability-L11-b2b-checks" 
  items={[
    "Google Postmaster score (should be 'High' or 'Medium')",
    "Microsoft SNDS status (should be 'Green')",
    "GlockApps inbox placement (target >85%)",
    "Reply rate (target 5-10%)",
    "Complaint rate (target &lt;0.05%)",
    "Bounce rate (target &lt;2%)"
  ]} 
/>

**Tools:**
- Google Postmaster Tools (free)
- Microsoft SNDS (free)
- GlockApps ($59/mo)
- Instantly.ai analytics (included)

**Red flags:**
- Postmaster score drops to "Low"
- SNDS turns yellow or red
- Inbox placement &lt;70%
- Complaint rate >0.1%

**Action:** Pause sending immediately, investigate, rest domain 7-14 days.

### Creator Monitoring Dashboard

<InteractiveChecklist 
  title="Creator Weekly Checks" 
  persistKey="email-deliverability-L11-creator-checks" 
  items={[
    "Open rate (target 20-40%)",
    "Click rate (target 2-5%)",
    "Unsubscribe rate (target &lt;0.5%)",
    "Complaint rate (target &lt;0.1%)",
    "List growth rate (net new subscribers)",
    "Engagement trend (improving or declining?)"
  ]} 
/>

**Tools:**
- ConvertKit/Beehiiv analytics (included)
- Google Postmaster (if >5K sends/day)
- GlockApps (optional, $59/mo)

**Red flags:**
- Open rate &lt;15%
- Unsubscribe rate >1%
- Complaint rate >0.1%
- Declining engagement trend

**Action:** Audit content quality, send frequency, list hygiene. Clean inactive subscribers.

---

## Cost Comparison: Shared vs Separated

Let's look at the real numbers:

<ScenarioSimulator
  title="Infrastructure Cost Calculator"
  persistKey="email-deliverability-L11-cost-sim"
  levers={[
    { id: "b2bInboxes", label: "B2B inboxes", min: 0, max: 15, step: 1, defaultValue: 9 },
    { id: "creatorSubs", label: "Creator subscribers", min: 0, max: 10000, step: 500, defaultValue: 3000 },
    { id: "separated", label: "Separated infrastructure?", min: 0, max: 1, step: 1, defaultValue: 1 }
  ]}
  outputs={[
    { 
      id: "monthlyCost", 
      label: "Monthly cost", 
      formula: "separated === 1 ? (b2bInboxes * 7.2 + 37 + 75 + (creatorSubs <= 1000 ? 25 : creatorSubs <= 3000 ? 41 : 66) + 59) : (b2bInboxes * 7.2 + 37 + 75 + 59)", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "riskLevel", 
      label: "Reputation risk", 
      formula: "separated === 1 ? 10 : 85", 
      unit: "%", 
      precision: 0 
    }
  ]}
  insight="At {monthlyCost}/mo with {riskLevel}% reputation risk. Separated infrastructure costs ~$40/mo more but reduces risk by 75%."
/>

**The Math:**
- **Shared infrastructure:** $240/mo, 85% risk of reputation damage
- **Separated infrastructure:** $281/mo, 10% risk of reputation damage
- **Extra cost:** $41/mo
- **Risk reduction:** 75%
- **ROI:** One avoided reputation incident (like Jordan's $4,800 loss) pays for 10 years of separation

<InsightCard icon="💰" title="The Real Cost">
Separated infrastructure costs $40-50/mo more. One reputation incident costs $2,000-5,000 in lost revenue + 4-8 weeks recovery time. Separation is the cheapest insurance you'll ever buy.
</InsightCard>

---

## Your Infrastructure Blueprint

Now it's time to design your setup:

<TemplateBuilder
  title="My Infrastructure Blueprint"
  persistKey="email-deliverability-L11-blueprint"
  sections={[
    {
      id: "profile",
      title: "Your Profile",
      fields: [
        { id: "b2bRevenue", label: "B2B revenue (monthly)", placeholder: "e.g., $5,000", type: "text" },
        { id: "creatorRevenue", label: "Creator revenue (monthly)", placeholder: "e.g., $2,000", type: "text" },
        { id: "b2bVolume", label: "B2B sends per day", placeholder: "e.g., 300", type: "number" },
        { id: "creatorSubs", label: "Creator subscribers", placeholder: "e.g., 3,000", type: "number" }
      ]
    },
    {
      id: "decision",
      title: "Infrastructure Decision",
      fields: [
        { id: "setup", label: "Which setup do you need?", placeholder: "Pure B2B / Pure Creator / Dual", type: "text" },
        { id: "reasoning", label: "Why?", placeholder: "Explain your reasoning", type: "textarea" }
      ]
    },
    {
      id: "domains",
      title: "Domain Plan",
      fields: [
        { id: "main", label: "Main domain", placeholder: "e.g., acme.com", type: "text" },
        { id: "b2b1", label: "B2B domain 1", placeholder: "e.g., getacme.com", type: "text" },
        { id: "b2b2", label: "B2B domain 2", placeholder: "e.g., tryacme.com", type: "text" },
        { id: "b2b3", label: "B2B domain 3", placeholder: "e.g., hiacme.com", type: "text" },
        { id: "creator", label: "Creator domain", placeholder: "e.g., newsletter.acme.com", type: "text" }
      ]
    },
    {
      id: "tools",
      title: "Tool Stack",
      fields: [
        { id: "b2bESP", label: "B2B sending platform", placeholder: "e.g., Instantly.ai", type: "text" },
        { id: "creatorESP", label: "Creator ESP", placeholder: "e.g., ConvertKit", type: "text" },
        { id: "warmup", label: "Warmup tool", placeholder: "e.g., MailReach", type: "text" },
        { id: "monitoring", label: "Monitoring tool", placeholder: "e.g., GlockApps", type: "text" }
      ]
    },
    {
      id: "budget",
      title: "Budget",
      fields: [
        { id: "monthly", label: "Estimated monthly cost", placeholder: "e.g., $281", type: "text" },
        { id: "acceptable", label: "Is this within budget?", placeholder: "Yes / No / Need to optimize", type: "text" }
      ]
    }
  ]}
/>

---

## Summary: The Separation Imperative

<InteractiveChecklist 
  title="Key Takeaways" 
  persistKey="email-deliverability-L11-summary" 
  items={[
    "B2B cold outreach and creator broadcasts are fundamentally incompatible",
    "Mixing them creates conflicting signals that destroy both reputations",
    "Separated infrastructure costs $40-50/mo more but reduces risk by 75%",
    "Use Template 1 (pure B2B), Template 2 (pure creator), or Template 3 (dual)",
    "Never send B2B through creator ESP or creator through B2B ESP",
    "Monitor each system separately with different metrics",
    "One reputation incident costs 10x more than separation",
    "Migration takes 4 weeks but saves your business"
  ]} 
/>

## Next Steps

<InteractiveChecklist 
  title="Your Action Items" 
  persistKey="email-deliverability-L11-actions" 
  items={[
    "Audit your current setup: Are you mixing B2B and creator?",
    "Choose your template: Pure B2B, Pure Creator, or Dual",
    "Purchase any missing domains (if dual setup)",
    "Set up DNS records for new domains",
    "Choose and configure creator ESP (if applicable)",
    "Create your infrastructure blueprint using the template above",
    "If migrating: Follow the 4-week migration plan",
    "Set up monitoring dashboards for each system",
    "Document your setup for future reference"
  ]} 
/>

**Next Lesson:** Course Capstone — Building Your Complete Deliverability Playbook (Lesson 12)

You'll combine everything from this course into a single operational playbook: DNS templates, warmup schedules, monitoring dashboards, incident response procedures, and your custom infrastructure blueprint.