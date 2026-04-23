---
title: "Inbox Rotation & Sending Limits (&lt;500/day)"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 7
---

# Inbox Rotation & Sending Limits (&lt;500/day)

## The $12,000 Mistake

Meet David. Technical founder. Built a solid SaaS product. Spent 3 weeks warming up 12 inboxes across 4 domains. Everything looked perfect: SPF green, DKIM passing, DMARC at `p=quarantine`.

Then he made one decision that cost him $12,000 in lost opportunity and 6 weeks of recovery time.

He sent 200 emails from a single inbox in one day.

"But the limit is 500/day!" he protested when his domain reputation tanked. "I was well under the limit!"

Technically correct. Practically catastrophic.

Google's official limit is 500 emails per day per Google Workspace user. But that limit was designed for **transactional email and internal communication**, not cold outreach. When you send 200 cold emails from one inbox in a single day, you trigger every spam heuristic Google has:

- Sudden volume spike (yesterday: 35, today: 200)
- Low engagement rate (cold email averages 1-5% reply rate)
- High similarity between messages (templates)
- Concentrated sending pattern (all within 3 hours)

Within 48 hours, David's inbox placement dropped from 92% to 23%. His domain reputation score went from "high" to "medium/low." His carefully warmed infrastructure was burning.

The fix? He had to rest that entire domain for 60 days, spin up new domains, and start warmup from scratch. Total cost: 4 new domains ($48), 12 new Google Workspace accounts for 2 months ($173), 2 months of MailReach warmup ($600), plus 6 weeks of lost outreach capacity (~$12,000 in pipeline value for his $50K ACV product).

**The lesson:** Official limits and safe limits are completely different animals in cold email.

This lesson teaches you the real rules.

---

## The Real Limits: What the Platforms Won't Tell You

<InsightCard icon="🎯" title="The Core Principle">
Email providers publish **technical limits** (what the system allows). But deliverability requires staying well under **behavioral limits** (what the system trusts).
</InsightCard>

### Official vs. Safe Limits

| Provider | Official Daily Limit | Safe Cold Email Limit | Why the Gap? |
|----------|---------------------|----------------------|--------------|
| Google Workspace | 500/day per user | 30-50/day | Cold email = low engagement, triggers spam filters |
| Microsoft 365 | 10,000/day per user | 30-50/day | Outlook's aggressive filtering penalizes volume |
| Outlook.com (free) | 300/day | 20-30/day | Free accounts have stricter reputation thresholds |
| Yahoo Mail | 500/day | 25-40/day | Shared reputation data with Google |

The gap exists because **cold email behaves differently than normal email**:

- **Normal email**: High reply rates (20-80%), known contacts, varied content, natural timing
- **Cold email**: Low reply rates (1-5%), unknown contacts, templated content, batch sending

When you send 200 cold emails from one inbox, the math looks like this to Gmail's filters:

- 200 sends × 2% reply rate = 4 replies
- 196 emails with no engagement
- 196 "ignored" signals in one day
- Pattern match: **spam**

<RangeSlider 
  label="How many cold emails per day do you currently send from a single inbox?" 
  min={0} 
  max={200} 
  step={10}
  lowLabel="0" 
  highLabel="200+" 
  persistKey="email-deliverability-L7-current-volume" 
/>

If you answered above 50, you're in the danger zone. Let's fix that.

---

## The Rotation Architecture: Spreading the Load

The solution isn't "send less." It's "send smarter."

Instead of 200 emails from 1 inbox, you send:
- 30 emails from inbox A
- 30 emails from inbox B
- 30 emails from inbox C
- 30 emails from inbox D
- 30 emails from inbox E
- 30 emails from inbox F

Same 180 total emails. Completely different risk profile.

### Why Rotation Works

<FlipCard 
  front="The Volume Dilution Effect" 
  back="Spreading sends across multiple inboxes keeps each inbox's daily volume in the 'normal human behavior' range, avoiding spam heuristics while maintaining total throughput." 
/>

Each inbox now sends 30/day, which looks like:
- A busy salesperson following up with prospects
- Natural variation in timing (8am-2pm spread)
- Realistic reply rate (1-2 replies per inbox = 3-7% rate)
- No sudden spikes

**The math that matters:**

| Configuration | Total Daily Volume | Risk Level | Inbox Placement |
|--------------|-------------------|------------|-----------------|
| 1 inbox × 200/day | 200 | 🔴 Critical | 20-40% |
| 4 inboxes × 50/day | 200 | 🟡 Moderate | 60-75% |
| 7 inboxes × 30/day | 210 | 🟢 Safe | 85-95% |
| 12 inboxes × 30/day | 360 | 🟢 Safe | 85-95% |

<ExampleCard label="Case Study: The Rotation Recovery">
After David's domain burned, he rebuilt with rotation from day one:

- **Old setup**: 1 domain, 3 inboxes, 200/day concentrated
- **New setup**: 4 domains, 12 inboxes, 30/day per inbox
- **Result**: 360/day capacity at 89% inbox placement vs. 200/day at 23%

His pipeline recovered in 45 days. He now sends **80% more volume** with **4x better deliverability**.

Cost difference: $90/month (the price of proper infrastructure).
</ExampleCard>

---

## Configuring Rotation in Your Sending Platform

Modern cold email platforms (Instantly, Smartlead, Lemlist) handle rotation automatically. But you need to configure it correctly.

### Instantly.ai Configuration

<SlideNavigation>
<Slide title="Step 1: Add Your Inboxes">
1. Go to **Settings → Email Accounts**
2. Connect all sending inboxes (12 recommended for 300-400/day target)
3. Verify each inbox shows "Connected" with green checkmark
4. Enable warmup for each inbox (keep running indefinitely)

**Pro tip:** Label inboxes by domain for easy tracking:
- `getacme-inbox1@getacme.com`
- `getacme-inbox2@getacme.com`
- `tryacme-inbox1@tryacme.com`
</Slide>

<Slide title="Step 2: Set Per-Inbox Limits">
1. Click each inbox → **Advanced Settings**
2. Set **Daily Email Limit**: 30-50 (start at 30)
3. Set **Delay Between Emails**: 90-300 seconds
4. Enable **Smart Sending** (spreads across business hours)
5. Set **Sending Window**: 8am-2pm recipient timezone

**Why these numbers:**
- 30-50/day = safe zone for cold email
- 90-300 second delays = mimics human sending
- 8am-2pm = highest engagement window
</Slide>

<Slide title="Step 3: Configure Campaign Rotation">
1. Create campaign → **Settings → Sending Schedule**
2. Select **all inboxes** for this campaign
3. Choose rotation method: **Round Robin** (recommended)
4. Set **Max sends per inbox per day**: 30
5. Enable **Timezone Detection** for recipient local time

**Round Robin vs. Smart Rotation:**
- **Round Robin**: Sends evenly across all inboxes (predictable, safe)
- **Smart Rotation**: Prioritizes inboxes with best reputation (advanced, requires monitoring)

Start with Round Robin. Switch to Smart after 60 days of data.
</Slide>

<Slide title="Step 4: Monitor and Adjust">
1. Check **Analytics → Inbox Health** daily during first 2 weeks
2. Look for:
   - Inbox placement % (target: >85%)
   - Spam rate (target: &lt;0.1%)
   - Bounce rate (target: &lt;2%)
3. If any inbox drops below 80% placement:
   - Reduce that inbox's daily limit by 20%
   - Increase warmup volume
   - Check for content issues

**Red flag triggers:**
- Placement drops >10% in 24 hours → pause that inbox immediately
- Spam rate >0.1% → pause entire domain, investigate
- Bounce rate >5% → list quality issue, not rotation issue
</Slide>
</SlideNavigation>

### Smartlead Configuration

Smartlead's approach is similar but with different terminology:

1. **Email Accounts** → Add all inboxes
2. **Warmup Settings** → Enable for all accounts, set to "Aggressive" mode
3. **Campaign Settings** → Select all accounts, set "Max emails per account" to 30-50
4. **Sending Schedule** → Enable "Smart Sending" with business hours only
5. **Rotation Method** → Choose "Evenly Distributed"

<TemplateBuilder
  title="Your Rotation Configuration"
  persistKey="email-deliverability-L7-rotation-config"
  sections={[
    {
      id: "infrastructure",
      title: "Infrastructure Setup",
      fields: [
        { id: "domains", label: "Number of sending domains", placeholder: "e.g., 4", type: "number" },
        { id: "inboxes", label: "Total inboxes across all domains", placeholder: "e.g., 12", type: "number" },
        { id: "target-volume", label: "Target daily volume", placeholder: "e.g., 300", type: "number" }
      ]
    },
    {
      id: "per-inbox",
      title: "Per-Inbox Settings",
      fields: [
        { id: "daily-limit", label: "Max emails per inbox per day", placeholder: "30-50", type: "number" },
        { id: "delay", label: "Delay between emails (seconds)", placeholder: "90-300", type: "number" },
        { id: "window", label: "Sending window", placeholder: "8am-2pm recipient TZ", type: "text" }
      ]
    },
    {
      id: "rotation",
      title: "Rotation Logic",
      fields: [
        { id: "method", label: "Rotation method", placeholder: "Round Robin or Smart", type: "text" },
        { id: "weekend", label: "Weekend sending", placeholder: "Off or 50% volume", type: "text" }
      ]
    }
  ]}
/>

---

## The 70% Rule: Never Max Out Your Capacity

Here's a mistake even experienced operators make: running inboxes at 100% of their safe limit.

If your safe limit is 50/day per inbox, and you send exactly 50/day, you have **zero margin for error**:

- Warmup emails don't count toward your cold limit, but they do count toward ISP volume tracking
- Reply threads generate additional sends (your replies back)
- Occasional manual sends (testing, one-offs) add to the total
- Volume spikes trigger filters even if you're "under the limit"

<InsightCard icon="📊" title="The 70% Rule">
Never run an inbox above 70% of its safe daily limit. If your safe limit is 50/day, target 35/day for cold email. The 30% buffer absorbs variance and prevents accidental spikes.
</InsightCard>

### Calculating Your True Capacity

Let's work through a real example:

**Your setup:**
- 4 sending domains
- 3 inboxes per domain = 12 total inboxes
- Safe limit: 50/day per inbox
- 70% rule applied: 35/day per inbox

**Capacity calculation:**

| Component | Volume |
|-----------|--------|
| 12 inboxes × 35/day | 420/day theoretical |
| Minus 15% warmup overhead | -63/day |
| Minus 10% reply thread overhead | -42/day |
| **Net cold email capacity** | **315/day** |

**Recommended target:** 250-300/day actual sends

This gives you:
- Headroom for volume variance
- Room for manual sends and testing
- Buffer for reply threads
- Safety margin if one domain needs to rest

<ScenarioSimulator
  title="Rotation Capacity Calculator"
  persistKey="email-deliverability-L7-capacity-calc"
  levers={[
    { id: "inboxes", label: "Total inboxes", min: 3, max: 20, step: 1, defaultValue: 12 },
    { id: "perInboxLimit", label: "Per-inbox daily limit", min: 20, max: 50, step: 5, defaultValue: 35 },
    { id: "warmupOverhead", label: "Warmup overhead (%)", min: 10, max: 25, step: 5, defaultValue: 15 }
  ]}
  outputs={[
    { id: "theoretical", label: "Theoretical capacity", formula: "(inboxes * perInboxLimit)", unit: " emails/day", precision: 0 },
    { id: "net", label: "Net cold email capacity", formula: "(inboxes * perInboxLimit * (1 - warmupOverhead/100) * 0.9)", unit: " emails/day", precision: 0 }
  ]}
  insight="With `{inboxes}` inboxes at {perInboxLimit}/day each, your safe daily target is `{net}` cold emails. Stay 20% below this for maximum deliverability."
/>

---

## Sending Windows: When to Send (and When Not To)

Volume matters. Timing matters more.

### The B2B Sending Window

<FlipCard 
  front="Why 8am-2pm Recipient Time?" 
  back="B2B decision-makers check email most actively in the morning (8-11am) and after lunch (1-2pm). Sending outside this window reduces engagement, which damages sender reputation." 
/>

**Engagement data by send time:**

| Send Time (Recipient TZ) | Open Rate | Reply Rate | Inbox Placement |
|-------------------------|-----------|------------|-----------------|
| 6am-8am | 12% | 1.2% | 75% |
| 8am-11am | 23% | 3.1% | 89% |
| 11am-1pm | 18% | 2.4% | 84% |
| 1pm-2pm | 21% | 2.8% | 87% |
| 2pm-5pm | 15% | 1.8% | 78% |
| After 5pm | 8% | 0.9% | 68% |

**Why this matters for deliverability:**

When you send at 3am recipient time:
- Almost no one opens immediately
- Email sits unread for 5+ hours
- ISPs see "low engagement" signal
- Future emails more likely to hit spam

When you send at 9am recipient time:
- Higher chance of immediate open
- Faster reply if interested
- ISPs see "high engagement" signal
- Future emails more likely to hit inbox

### Configuring Timezone Detection

Most platforms handle this automatically, but verify your settings:

**Instantly:**
1. Campaign Settings → Sending Schedule
2. Enable "Timezone Detection"
3. Set window: 8am-2pm
4. System sends each email at 8am-2pm in the recipient's detected timezone

**Smartlead:**
1. Campaign → Advanced Settings
2. Enable "Smart Sending"
3. Set "Preferred Hours": 8:00-14:00
4. Enable "Timezone Optimization"

**Manual timezone handling (if your platform doesn't auto-detect):**
1. Segment your list by timezone (use Clay or Apollo to enrich)
2. Create separate campaigns per timezone
3. Schedule each campaign for 8am-2pm in that timezone

<ClassifyExercise
  title="Classify These Sending Scenarios"
  persistKey="email-deliverability-L7-timing-classify"
  categories={[
    { id: "safe", label: "Safe", color: "#10b981" },
    { id: "risky", label: "Risky", color: "#f59e0b" },
    { id: "dangerous", label: "Dangerous", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Send 30 emails between 9am-11am recipient time, round-robin across 6 inboxes", correctCategory: "safe" },
    { id: "2", content: "Send 50 emails at exactly 8:00am from one inbox", correctCategory: "risky" },
    { id: "3", content: "Send 200 emails between 2am-4am recipient time", correctCategory: "dangerous" },
    { id: "4", content: "Send 25 emails spread across 8am-2pm, 5 inboxes, with 120-second delays", correctCategory: "safe" },
    { id: "5", content: "Send all 300 daily emails in the first hour (8-9am)", correctCategory: "dangerous" },
    { id: "6", content: "Send 40 emails on Saturday morning", correctCategory: "risky" }
  ]}
/>

---

## Weekend and Holiday Patterns

Should you send on weekends? It depends on your ICP.

### Weekend Sending: The Data

| Audience Type | Weekend Open Rate vs. Weekday | Recommendation |
|--------------|------------------------------|----------------|
| B2B SaaS (corporate) | -45% | Pause weekends |
| B2B SaaS (SMB/founder) | -15% | 50% volume OK |
| Agencies/consultants | -20% | 50% volume OK |
| E-commerce/DTC | +10% | Full volume OK |
| Solopreneurs/creators | -5% | Full volume OK |

**Why the difference?**

Corporate employees don't check work email on weekends. Founders and solopreneurs do.

If your ICP is "VP of Marketing at 500+ person companies," pause on weekends. If your ICP is "solo consultant doing $200K/year," weekends are fine.

### Holiday Sending

**Major holidays to skip entirely:**
- New Year's Day
- Memorial Day
- Independence Day (US)
- Labor Day
- Thanksgiving (+ day after)
- Christmas Eve through New Year's Day

**Minor holidays (reduce to 50% volume):**
- MLK Day
- Presidents' Day
- Good Friday
- Juneteenth
- Veterans Day

**Why skip holidays?**

1. **Low engagement** → damages sender reputation
2. **Out-of-office replies** → count as bounces if not handled
3. **Negative brand perception** → "They're spamming me on Christmas"

### Configuring Weekend/Holiday Rules

**Instantly:**
1. Campaign Settings → Sending Schedule
2. Uncheck Saturday and Sunday (or set to 50% volume)
3. Add holiday dates to "Pause Dates" list

**Smartlead:**
1. Campaign → Schedule
2. Disable weekend sending or set "Weekend Volume" to 50%
3. Use "Blackout Dates" for holidays

**Manual tracking:**
- Keep a Google Calendar of US holidays
- Set reminders 3 days before to pause campaigns
- Resume day after holiday

<InteractiveChecklist 
  title="Weekend/Holiday Configuration" 
  persistKey="email-deliverability-L7-weekend-config" 
  items={[
    "Determine if your ICP checks email on weekends",
    "Configure platform to pause or reduce weekend volume",
    "Add 2025-2026 major holidays to blackout dates",
    "Set calendar reminders for holiday pauses",
    "Test one weekend send to measure engagement drop"
  ]} 
/>

---

## Reply Management: Centralized vs. Distributed

When you're sending from 12 inboxes across 4 domains, where do replies go?

### The Two Architectures

**Option A: Distributed (replies stay in sending inbox)**
- Each inbox receives its own replies
- You check 12 inboxes daily
- Pro: Simpler setup
- Con: Easy to miss replies, slower response time

**Option B: Centralized (all replies forward to one inbox)**
- All sending inboxes forward to one central inbox (e.g., `replies@yourmain.com`)
- You check one inbox
- Pro: Faster response time, nothing missed
- Con: Requires forwarding setup

**Recommendation:** Centralized, always.

### Setting Up Centralized Reply Management

<SlideNavigation>
<Slide title="Step 1: Create Central Reply Inbox">
1. Use your main domain: `replies@acme.com`
2. Or use a shared inbox in HubSpot/Gmail
3. Give yourself (and any team members) access
4. Set up mobile notifications for new emails
</Slide>

<Slide title="Step 2: Configure Forwarding">
For each sending inbox:

**In Gmail:**
1. Settings → Forwarding and POP/IMAP
2. Add forwarding address: `replies@acme.com`
3. Verify forwarding
4. Choose "Keep Gmail's copy in Inbox" (for backup)

**In Instantly/Smartlead:**
1. Email Accounts → Select inbox
2. Enable "Forward Replies"
3. Enter: `replies@acme.com`
4. Test with a manual reply
</Slide>

<Slide title="Step 3: Set Up Auto-Labeling">
In your central inbox (Gmail):

1. Create labels by domain:
   - `getacme-replies`
   - `tryacme-replies`
   - `hiacme-replies`

2. Create filters:
   - If from: `*@getacme.com` → Apply label `getacme-replies`
   - If from: `*@tryacme.com` → Apply label `tryacme-replies`

3. Create labels by intent:
   - `interested` (manual or AI-categorized)
   - `not-interested`
   - `out-of-office`
   - `unsubscribe`
</Slide>

<Slide title="Step 4: AI Categorization (Optional)">
Use Zapier or Make.com to auto-categorize:

1. Trigger: New email in `replies@acme.com`
2. Action: Send to OpenAI with prompt:
   ```
   Categorize this reply as:
   - Interested (wants to talk, asks questions, requests info)
   - Not Interested (no thanks, not now, unsubscribe)
   - Out of Office (auto-reply)
   - Bounce (delivery failure)
   
   Reply: [email body]
   ```
3. Action: Apply Gmail label based on category
4. Action: If "Interested" → Send Slack notification

**Cost:** ~$10/month for 1,000 categorizations
</Slide>
</SlideNavigation>

### Reply Speed SLA

<InsightCard icon="⚡" title="The 1-Hour Rule">
Interested replies answered within 1 hour convert 3x better than replies answered after 24 hours. Set up mobile notifications and treat interested replies like inbound sales calls.
</InsightCard>

**Recommended SLA:**

| Reply Type | Response Time | Who Handles |
|-----------|---------------|-------------|
| Interested | &lt;1 hour | Founder (you) |
| Question/Clarification | &lt;4 hours | Founder or AI draft |
| Not Interested | &lt;24 hours | AI template |
| Out of Office | No response | Auto-archive |
| Unsubscribe | Immediate | Automated |

---

## The Rotation Calendar: Continuous Domain Health

Even with perfect rotation, domains need rest. Here's how to build a rotation calendar that keeps your infrastructure healthy long-term.

### The 4-Week Rotation Cycle

**Week 1-3:** All domains active
- Domain A: 3 inboxes × 30/day = 90/day
- Domain B: 3 inboxes × 30/day = 90/day
- Domain C: 3 inboxes × 30/day = 90/day
- Domain D: 3 inboxes × 30/day = 90/day
- **Total: 360/day**

**Week 4:** Rotate one domain to rest
- Domain A: **RESTING** (warmup only, no cold sends)
- Domain B: 3 inboxes × 35/day = 105/day
- Domain C: 3 inboxes × 35/day = 105/day
- Domain D: 3 inboxes × 35/day = 105/day
- **Total: 315/day**

**Week 5-7:** Domain A returns, Domain B rests
**Week 8:** Domain B returns, Domain C rests
**And so on...**

### Why Rest Domains?

Even with perfect sending behavior, reputation slowly degrades from:
- Accumulated "ignore" signals (emails that get no engagement)
- Spam complaints (even 0.05% adds up over time)
- Content fatigue (ISPs notice repeated patterns)

Resting a domain for 1 week every 4 weeks:
- Lets reputation scores reset
- Clears temporary flags
- Prevents long-term degradation

**During rest period:**
- Keep warmup running (15-20/day)
- Send zero cold emails
- Monitor inbox placement (should improve)
- Check Google Postmaster score (should stabilize or increase)

<TemplateBuilder
  title="Your Rotation Calendar"
  persistKey="email-deliverability-L7-rotation-calendar"
  sections={[
    {
      id: "week1",
      title: "Week 1-3 (All Active)",
      fields: [
        { id: "domainA", label: "Domain A daily volume", placeholder: "e.g., 90", type: "number" },
        { id: "domainB", label: "Domain B daily volume", placeholder: "e.g., 90", type: "number" },
        { id: "domainC", label: "Domain C daily volume", placeholder: "e.g., 90", type: "number" },
        { id: "domainD", label: "Domain D daily volume", placeholder: "e.g., 90", type: "number" }
      ]
    },
    {
      id: "week4",
      title: "Week 4 (One Resting)",
      fields: [
        { id: "restingDomain", label: "Which domain rests first?", placeholder: "e.g., Domain A", type: "text" },
        { id: "compensationVolume", label: "Increase per active domain", placeholder: "e.g., +5/day per inbox", type: "text" }
      ]
    },
    {
      id: "monitoring",
      title: "Rest Period Monitoring",
      fields: [
        { id: "checkFrequency", label: "How often to check Postmaster", placeholder: "e.g., Daily", type: "text" },
        { id: "returnCriteria", label: "Criteria to return to active", placeholder: "e.g., Placement >85%", type: "text" }
      ]
    }
  ]}
/>

---

## Monitoring: The Daily Inbox Health Check

Rotation only works if you monitor it. Here's your daily routine.

### The 5-Minute Daily Check

**Every morning before sending:**

1. **Check Google Postmaster Tools** (2 min)
   - Domain reputation: Should be "High" or "Medium"
   - IP reputation: Should be "High"
   - Spam rate: Should be &lt;0.1%
   - If any metric is "Low" or "Bad" → pause that domain immediately

2. **Check Instantly/Smartlead Analytics** (2 min)
   - Inbox placement % per domain (target: >85%)
   - Bounce rate per domain (target: &lt;2%)
   - Spam rate per domain (target: &lt;0.1%)
   - If any domain drops >10% in 24 hours → investigate

3. **Check Reply Inbox** (1 min)
   - Any interested replies? → Respond within 1 hour
   - Any spam complaints? → Pause that domain, investigate
   - Any bounces? → Clean list, check DNS

### The Weekly Deep Dive

**Every Monday (15 min):**

1. **Export last 7 days of data** from your sending platform
2. **Calculate per-domain metrics:**
   - Sends, opens, replies, bounces, spam complaints
   - Inbox placement %
   - Engagement rate (opens + replies / sends)
3. **Compare to baseline:**
   - Is any domain trending down?
   - Is any inbox underperforming?
4. **Adjust rotation:**
   - Reduce volume on struggling domains
   - Increase warmup on struggling inboxes
   - Consider resting a domain early if needed

### Red Flags That Require Immediate Action

<FlipCard 
  front="When to Hit the Pause Button" 
  back="Pause a domain immediately if: inbox placement drops below 70%, spam rate exceeds 0.1%, bounce rate exceeds 5%, or Google Postmaster shows 'Low' or 'Bad' reputation." 
/>

**Immediate pause triggers:**

| Metric | Threshold | Action |
|--------|-----------|--------|
| Inbox placement | &lt;70% | Pause domain, investigate content + list quality |
| Spam rate | >0.1% | Pause domain, review unsubscribe process |
| Bounce rate | >5% | Pause domain, clean list, check DNS |
| Postmaster reputation | "Low" or "Bad" | Pause domain, rest 30-60 days |
| Sudden open rate drop | >50% drop in 24h | Pause domain, check for blacklist |

**Investigation checklist when you pause:**

<InteractiveChecklist 
  title="Domain Pause Investigation" 
  persistKey="email-deliverability-L7-pause-investigation" 
  items={[
    "Check MXToolbox for blacklist status",
    "Verify SPF/DKIM/DMARC still passing",
    "Review last 50 emails sent for content issues",
    "Check list source for spam traps or bad data",
    "Verify unsubscribe link is working",
    "Check Google Postmaster for specific issues",
    "Review Microsoft SNDS (if Outlook recipients)",
    "Test inbox placement with GlockApps",
    "Decide: rest 30 days or abandon domain"
  ]} 
/>

---

## Advanced: Smart Rotation Based on Reputation

Once you have 60+ days of data, you can move from round-robin to smart rotation.

### What Is Smart Rotation?

Instead of sending evenly across all inboxes, the system prioritizes inboxes with the best current reputation.

**Example:**
- Inbox A: 92% placement → gets 40/day
- Inbox B: 88% placement → gets 35/day
- Inbox C: 79% placement → gets 20/day (reduced)
- Inbox D: 95% placement → gets 45/day (increased)

**Why this works:**
- High-reputation inboxes "carry" the overall campaign
- Struggling inboxes get time to recover with lower volume
- Total volume stays the same, but deliverability improves

### Configuring Smart Rotation

**Instantly:**
1. Campaign Settings → Advanced
2. Enable "Smart Sending"
3. Set "Reputation Threshold": 85%
4. System automatically reduces volume for inboxes below threshold

**Smartlead:**
1. Campaign → Sending Settings
2. Choose "Smart Rotation" instead of "Evenly Distributed"
3. Set "Min Reputation Score": 85
4. System prioritizes high-reputation accounts

**Manual smart rotation:**
1. Export weekly inbox placement data
2. Categorize inboxes: Excellent (>90%), Good (85-90%), Fair (75-85%), Poor (&lt;75%)
3. Adjust daily limits:
   - Excellent: 45-50/day
   - Good: 35-40/day
   - Fair: 20-25/day
   - Poor: Warmup only, no cold sends

<StrategyDuel
  title="Round Robin vs. Smart Rotation"
  persistKey="email-deliverability-L7-rotation-duel"
  scenario="You have 12 inboxes with varying reputation scores. Which rotation strategy should you use?"
  strategyA={{
    name: "Round Robin",
    description: "Send evenly across all 12 inboxes, 30/day each",
    pros: ["Simple to configure", "Predictable volume", "No monitoring required"],
    cons: ["Struggling inboxes drag down overall deliverability", "No optimization over time"]
  }}
  strategyB={{
    name: "Smart Rotation",
    description: "Prioritize high-reputation inboxes, reduce volume on struggling ones",
    pros: ["Higher overall inbox placement", "Struggling inboxes get recovery time", "Optimizes automatically"],
    cons: ["Requires 60+ days of data", "More complex to configure", "Needs weekly monitoring"]
  }}
  expertVerdict="Start with Round Robin for the first 60 days to establish baseline. Then switch to Smart Rotation once you have reputation data. Smart Rotation typically improves inbox placement by 5-10% vs. round robin."
/>

---

## Putting It All Together: Your Rotation Blueprint

Let's build your complete rotation system.

### Your Infrastructure

<TemplateBuilder
  title="Complete Rotation Blueprint"
  persistKey="email-deliverability-L7-complete-blueprint"
  sections={[
    {
      id: "infrastructure",
      title: "Infrastructure",
      fields: [
        { id: "domains", label: "Number of sending domains", placeholder: "4", type: "number" },
        { id: "inboxesPerDomain", label: "Inboxes per domain", placeholder: "3", type: "number" },
        { id: "totalInboxes", label: "Total inboxes (calculated)", placeholder: "12", type: "number", disabled: true }
      ]
    },
    {
      id: "volume",
      title: "Volume Targets",
      fields: [
        { id: "perInboxDaily", label: "Per-inbox daily limit", placeholder: "30-35", type: "text" },
        { id: "totalDaily", label: "Total daily capacity", placeholder: "360-420", type: "text" },
        { id: "targetDaily", label: "Actual daily target (70% rule)", placeholder: "250-300", type: "text" }
      ]
    },
    {
      id: "timing",
      title: "Timing & Schedule",
      fields: [
        { id: "sendWindow", label: "Sending window", placeholder: "8am-2pm recipient TZ", type: "text" },
        { id: "delay", label: "Delay between emails", placeholder: "90-300 seconds", type: "text" },
        { id: "weekends", label: "Weekend sending", placeholder: "Pause or 50% volume", type: "text" }
      ]
    },
    {
      id: "rotation",
      title: "Rotation Strategy",
      fields: [
        { id: "method", label: "Rotation method", placeholder: "Round Robin (first 60 days)", type: "text" },
        { id: "restSchedule", label: "Rest schedule", placeholder: "1 domain every 4 weeks", type: "text" },
        { id: "monitoring", label: "Monitoring frequency", placeholder: "Daily 5-min check", type: "text" }
      ]
    },
    {
      id: "replies",
      title: "Reply Management",
      fields: [
        { id: "centralInbox", label: "Central reply inbox", placeholder: "replies@yourdomain.com", type: "text" },
        { id: "sla", label: "Interested reply SLA", placeholder: "&lt;1 hour", type: "text" },
        { id: "categorization", label: "AI categorization", placeholder: "Yes/No", type: "text" }
      ]
    }
  ]}
/>

### Implementation Checklist

<InteractiveChecklist 
  title="Rotation System Setup" 
  persistKey="email-deliverability-L7-implementation" 
  items={[
    "Calculate your total inbox capacity (# inboxes × per-inbox limit)",
    "Apply 70% rule to determine safe daily target",
    "Configure per-inbox limits in your sending platform (30-50/day)",
    "Set delay between emails (90-300 seconds)",
    "Configure sending window (8am-2pm recipient TZ)",
    "Enable timezone detection",
    "Disable or reduce weekend sending",
    "Add major holidays to blackout dates",
    "Set up centralized reply forwarding",
    "Configure auto-labeling by domain and intent",
    "Set up mobile notifications for interested replies",
    "Create 4-week rotation calendar (1 domain rests each cycle)",
    "Set up daily monitoring routine (Google Postmaster + platform analytics)",
    "Define red-flag thresholds for immediate pause",
    "Test rotation with 3-day trial at 50% volume",
    "Monitor closely for first 2 weeks, adjust as needed"
  ]} 
/>

---

## Summary: The Rules That Actually Matter

Forget the official limits. Here's what actually keeps you in the inbox:

1. **30-50 cold emails per inbox per day** — Not 200. Not 100. 30-50.

2. **Rotate across 10-15 inboxes minimum** — Spreading 300/day across 12 inboxes = safe. Sending 300/day from 3 inboxes = disaster.

3. **Apply the 70% rule** — If your safe limit is 50/day, target 35/day. Margin prevents spikes.

4. **Send 8am-2pm recipient time only** — Engagement drives reputation. Off-hours = low engagement = spam.

5. **Rest one domain every 4 weeks** — Continuous rotation prevents long-term degradation.

6. **Monitor daily, adjust weekly** — 5 minutes every morning. 15 minutes every Monday. Non-negotiable.

7. **Pause immediately at red flags** — Inbox placement &lt;70%, spam rate >0.1%, Postmaster "Low" = stop now, investigate, rest 30-60 days.

The math is simple: **Better to send 300/day at 90% inbox placement than 500/day at 40% placement.**

300 × 0.90 = 270 emails in inbox
500 × 0.40 = 200 emails in inbox

Rotation isn't about sending less. It's about **landing more**.

---

## Next Lesson Preview

You've built the rotation system. Now you need to know **what** to send through it.

**Lesson 8: Content That Passes Spam Filters** covers:
- The 15 spam trigger words that actually matter in 2025-2026
- Image-to-text ratios and HTML complexity limits
- Link density rules (spoiler: 1 link maximum for cold email)
- Personalization tokens that help vs. hurt deliverability
- A/B testing content for inbox placement, not just reply rate

You'll build a **Content Safety Linter** that scores your email drafts for spam risk before you send.

See you there.