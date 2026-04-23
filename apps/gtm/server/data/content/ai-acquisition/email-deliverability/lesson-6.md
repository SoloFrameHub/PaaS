---
title: "Warmup Timelines & Safe Volume Ramps"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 6
---

# Warmup Timelines & Safe Volume Ramps

## The $12,000 Mistake

Sarah bought 5 sending domains, configured DNS perfectly, and launched 300 cold emails on Day 1.

By Day 3, her inbox placement was 12%. By Day 7, Google Postmaster showed a red "Bad" reputation score. By Day 14, she was rebuilding from scratch with new domains.

**Total cost:** $90 in domains + $216 in wasted Google Workspace fees + 2 weeks of lost time = roughly $12,000 in opportunity cost for a founder billing $200/hour.

**The mistake?** She skipped warmup entirely.

<InsightCard icon="🔥" title="The Warmup Paradox">
New email inboxes are like new bank accounts. You can't walk in on Day 1 and withdraw $10,000. You need to make deposits first. Warmup is those deposits — building reputation before making asks.
</InsightCard>

In this lesson, you'll build a complete 30-day warmup protocol that takes you from 0 to 30-50 cold emails per day per inbox — safely, predictably, and without burning domains.

---

## Why Warmup Is Non-Negotiable

Here's what Gmail sees when you create a new inbox and immediately send 50 cold emails:

- **Zero sending history** — No data on whether you're a legitimate sender
- **Unknown IP reputation** — Your sending IP has never touched their network
- **Sudden volume spike** — 0 to 50 in one day looks like a compromised account
- **No engagement history** — No opens, replies, or positive signals

Gmail's filter has two choices: let you through and risk letting spam in, or block you and risk a false positive.

**Guess which way they lean?**

<FlipCard 
  front="What percentage of new inboxes land in spam without warmup?" 
  back="58-73% according to Validity's 2025 Sender Score study. Your perfect DNS records don't matter if you have zero reputation." 
/>

### The Reputation Bank Account

Think of email reputation like a bank account:

- **Deposits:** Opens, replies, moves from spam to inbox, low bounce rates
- **Withdrawals:** Spam complaints, bounces, ignores, high send volume
- **Balance:** Your sender reputation score (0-100 in Google Postmaster)

A new inbox starts at **zero balance**. You can't make withdrawals (send cold email) until you've made deposits (warmup sends with high engagement).

<RangeSlider 
  label="How many days of warmup do you think you need before sending cold email?" 
  min={0} 
  max={60} 
  lowLabel="0 days" 
  highLabel="60 days" 
  persistKey="email-deliverability-L6-warmup-guess" 
/>

**The answer:** Minimum 14 days. Recommended 21-28 days. Conservative 30 days.

---

## The 4-Week Warmup Protocol

Here's the exact schedule that takes you from 5 emails/day to 30-50/day per inbox without triggering spam filters.

### Week 1: Foundation (Days 1-7)

**Goal:** Establish basic sending history with minimal volume

| Day | Warmup Emails | Cold Emails | Total | Notes |
|-----|---------------|-------------|-------|-------|
| 1 | 5 | 0 | 5 | Warmup only |
| 2 | 5 | 0 | 5 | Monitor inbox placement |
| 3 | 7 | 0 | 7 | First small increase |
| 4 | 7 | 0 | 7 | Hold steady |
| 5 | 10 | 0 | 10 | Second increase |
| 6 | 10 | 0 | 10 | Weekend (optional: pause) |
| 7 | 10 | 0 | 10 | End of week checkpoint |

**What's happening:** Your warmup tool (MailReach, Instantly, etc.) is sending emails to a network of real inboxes that automatically open, reply, and mark as important. This simulates legitimate email activity.

<ExampleCard label="Week 1 Warmup Email Example">
**From:** sarah@getacme.com  
**To:** warmup-partner-inbox@mailreach.co  
**Subject:** Quick question about your content strategy

Hi Alex,

I've been following your work on B2B content distribution and wanted to ask: what's your take on the shift toward short-form video for LinkedIn?

I'm seeing mixed results with my clients and curious if you've noticed any patterns.

Best,  
Sarah

---

**Auto-Reply (from warmup network):**

Hey Sarah,

Great question! I've actually seen...

*[This conversation continues with 2-3 back-and-forth replies, all automated, all building positive engagement signals]*
</ExampleCard>

<InsightCard icon="⚠️" title="Week 1 Red Flag">
If your inbox placement drops below 80% in Week 1, **pause immediately**. Check your DNS records, verify DKIM is passing, and ensure your warmup tool is configured correctly. Don't proceed to Week 2 until placement recovers.
</InsightCard>

### Week 2: Testing (Days 8-14)

**Goal:** Introduce minimal cold email volume while maintaining warmup

| Day | Warmup Emails | Cold Emails | Total | Notes |
|-----|---------------|-------------|-------|-------|
| 8 | 12 | 3 | 15 | First cold sends |
| 9 | 12 | 3 | 15 | Monitor closely |
| 10 | 15 | 5 | 20 | Increase both |
| 11 | 15 | 5 | 20 | Hold steady |
| 12 | 18 | 5 | 23 | Warmup increase |
| 13 | 18 | 5 | 23 | Weekend check |
| 14 | 20 | 5 | 25 | Week 2 checkpoint |

**What's happening:** You're testing whether your cold email content, targeting, and sending patterns trigger spam filters. The 3:1 ratio of warmup to cold keeps your positive engagement signals high.

<PredictionGate
  question="After sending 5 cold emails/day for 3 days in Week 2, your inbox placement drops from 95% to 78%. What should you do?"
  persistKey="email-deliverability-L6-week2-predict"
  type="choice"
  choices={[
    { id: "a", text: "Pause cold sends, continue warmup only for 3-5 days" },
    { id: "b", text: "Reduce cold to 2/day and monitor" },
    { id: "c", text: "Switch to a different sending domain" }
  ]}
  correctId="a"
>
**Correct answer: A — Pause cold sends, continue warmup only for 3-5 days**

A drop from 95% to 78% means something in your cold email triggered filters (content, targeting, or sending pattern). Continuing to send will only dig the hole deeper.

**Recovery protocol:**
1. Pause all cold sends immediately
2. Continue warmup at current volume (18-20/day)
3. Audit your cold email content with mail-tester.com
4. Check Google Postmaster for spam complaint rate
5. After 3-5 days of stable 90%+ placement, resume cold at 2/day
6. Increase slowly: 2 → 3 → 5 over the next week

**What NOT to do:** Switching domains doesn't fix the underlying issue. You'll just burn through domains faster.
</PredictionGate>

### Week 3: Scaling (Days 15-21)

**Goal:** Increase cold volume while maintaining high engagement

| Day | Warmup Emails | Cold Emails | Total | Notes |
|-----|---------------|-------------|-------|-------|
| 15 | 20 | 8 | 28 | Resume scaling |
| 16 | 20 | 10 | 30 | Monitor placement |
| 17 | 22 | 12 | 34 | Both increase |
| 18 | 22 | 15 | 37 | Cold at 50% of warmup |
| 19 | 25 | 15 | 40 | Warmup increase |
| 20 | 25 | 18 | 43 | Weekend check |
| 21 | 25 | 20 | 45 | Week 3 checkpoint |

**What's happening:** You're approaching the 2:1 ratio of warmup to cold. This is the sustainable long-term balance for most solo founders.

<SlideNavigation>
<Slide title="Week 3 Monitoring Checklist">

Check these metrics **daily** during Week 3:

**Google Postmaster Tools:**
- Domain reputation: Should be "High" (green)
- IP reputation: Should be "High" (green)
- Spam rate: Should be &lt;0.1%

**GlockApps or MailReach:**
- Inbox placement: Target 90%+ (85% minimum)
- Spam placement: &lt;10%
- Missing/blocked: &lt;5%

**Campaign Metrics:**
- Bounce rate: &lt;2%
- Reply rate: >3% (including negative replies)
- Spam complaint rate: &lt;0.05%

**Action thresholds:**
- Placement 85-90%: Monitor closely, don't increase volume
- Placement 75-85%: Pause cold, continue warmup
- Placement &lt;75%: Full stop, investigate immediately

</Slide>

<Slide title="Common Week 3 Issues">

**Issue 1: Placement drops on weekends**

**Cause:** Lower engagement rates on weekends trigger filters

**Fix:** Reduce weekend volume by 50% or pause entirely

---

**Issue 2: One domain performs worse than others**

**Cause:** Domain-specific reputation issue (possibly a spam trap hit)

**Fix:** Rest that domain for 7 days, redistribute volume to other domains

---

**Issue 3: Sudden spike in bounces**

**Cause:** Bad data in your lead list (old emails, typos, spam traps)

**Fix:** 
1. Pause that campaign immediately
2. Run list through NeverBounce or ZeroBounce
3. Remove all bounces and risky emails
4. Resume at 50% volume

</Slide>

<Slide title="Week 3 Content Audit">

By Week 3, you have enough data to optimize your cold email content. Run this audit:

**Subject Line Analysis:**
- Which subjects have >25% open rates? (Keep)
- Which subjects have &lt;15% open rates? (Rewrite)
- Are you using personalization tokens correctly?

**First Line Analysis:**
- Are you leading with value or asking for time?
- Is your personalization specific or generic?
- Does your first line pass the "so what?" test?

**CTA Analysis:**
- Are you asking for 15 minutes or "a quick call"? (Be specific)
- Is your CTA in the first 3 lines or buried at the end?
- Are you giving an easy out (unsubscribe link)?

**Use the Sales Linter (from Course 24) to score each element 0-100**

</Slide>
</SlideNavigation>

### Week 4: Cruise Altitude (Days 22-28)

**Goal:** Reach sustainable sending volume with ongoing warmup maintenance

| Day | Warmup Emails | Cold Emails | Total | Notes |
|-----|---------------|-------------|-------|-------|
| 22 | 25 | 22 | 47 | Approaching 1:1 |
| 23 | 25 | 25 | 50 | Equal volume |
| 24 | 25 | 28 | 53 | Cold exceeds warmup |
| 25 | 25 | 30 | 55 | Target volume reached |
| 26 | 20 | 30 | 50 | Reduce warmup slightly |
| 27 | 20 | 30 | 50 | Weekend check |
| 28 | 20 | 30 | 50 | Cruise altitude |

**What's happening:** You've reached sustainable sending volume. From Day 29 onward, maintain 15-20 warmup emails/day indefinitely as "reputation maintenance."

<InsightCard icon="🎯" title="The Maintenance Warmup Rule">
Never turn off warmup completely. Even after 6 months of perfect sending, keep 15-20 warmup emails/day running. Think of it as paying rent on your inbox reputation.

**Cost:** $25/month per inbox (MailReach) or included in Instantly/Smartlead.

**Benefit:** Insurance against reputation decay. One spam complaint won't tank your domain if you have ongoing positive signals.
</InsightCard>

---

## Warmup Tools: What Actually Works

You have three options for automating warmup:

### Option 1: Dedicated Warmup Tools

<ComparisonBuilder
  title="MailReach vs Warmbox"
  persistKey="email-deliverability-L6-warmup-tools"
  prompt="Which warmup tool fits your setup?"
  expertExample="For 12 inboxes: MailReach at $25/inbox = $300/mo during warmup. After 30 days, reduce to 3-5 inboxes for maintenance = $75-125/mo ongoing."
  criteria={["Cost per inbox", "Network size (more = better)", "Monitoring included", "Ease of setup"]}
/>

| Tool | Cost/Inbox | Network Size | Monitoring | Best For |
|------|-----------|--------------|------------|----------|
| **MailReach** | $25/mo | 20,000+ | Yes (placement tests) | Most reliable, best monitoring |
| **Warmbox** | $19/mo | 10,000+ | Basic | Budget-conscious |
| **Folderly** | $40/mo | 15,000+ | Advanced | Enterprise (overkill for solo) |

### Option 2: Built-In Warmup (Instantly/Smartlead)

If you're already using Instantly or Smartlead for cold email, their built-in warmup is **included** in your subscription:

- **Instantly:** Unlimited inboxes, included in $37/mo Growth plan
- **Smartlead:** Unlimited inboxes, included in $39/mo Basic plan

**Pros:**
- No additional cost
- Integrated with your sending platform
- Automatic warmup/cold balance

**Cons:**
- Smaller warmup networks than dedicated tools
- Less granular monitoring
- Can't use if you switch platforms

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
If you're comfortable with APIs, you can build a basic warmup system using:

1. **Mailgun/SendGrid API** for sending
2. **Zapier/Make** for automation
3. **A network of 5-10 inboxes** you control (friends, team, test accounts)

**Effort:** 8-12 hours to build + ongoing maintenance  
**Cost:** ~$50/mo in API fees  
**Reliability:** 60-70% as effective as MailReach

**Verdict:** Only worth it if you enjoy the technical challenge. Otherwise, pay for MailReach.
</ContextualNote>

### Option 3: Manual Warmup Supplements

Even with automated warmup, these manual actions boost reputation:

<InteractiveChecklist 
  title="Manual Warmup Boosters (Week 1-2)" 
  persistKey="email-deliverability-L6-manual-warmup" 
  items={[
    "Subscribe to 5-10 newsletters in your industry (opens + engagement)",
    "Reply to 3-5 legitimate emails per day from your new inbox",
    "Join 2-3 email lists (conferences, communities) and engage",
    "Send 5-10 emails to friends/colleagues asking them to reply",
    "Add your new email to your email signature and use it for real outreach",
    "Connect your inbox to Slack/tools that send notification emails (activity signals)"
  ]} 
/>

---

## Multi-Inbox Warmup Strategy

You're not warming up one inbox. You're warming up **12-15 inboxes across 4-5 domains** simultaneously.

Here's how to orchestrate that without losing your mind:

### Staggered Start Schedule

Don't start all inboxes on the same day. Stagger by domain:

<TemplateBuilder
  title="Multi-Domain Warmup Schedule"
  persistKey="email-deliverability-L6-stagger"
  sections={[
    {
      id: "domain1",
      title: "Domain 1: getacme.com",
      fields: [
        { id: "start", label: "Start Date", placeholder: "e.g., Jan 1", type: "date" },
        { id: "inboxes", label: "Number of Inboxes", placeholder: "e.g., 3", type: "number" },
        { id: "tool", label: "Warmup Tool", placeholder: "e.g., MailReach", type: "text" }
      ]
    },
    {
      id: "domain2",
      title: "Domain 2: tryacme.com",
      fields: [
        { id: "start", label: "Start Date", placeholder: "e.g., Jan 8 (1 week after Domain 1)", type: "date" },
        { id: "inboxes", label: "Number of Inboxes", placeholder: "e.g., 3", type: "number" },
        { id: "tool", label: "Warmup Tool", placeholder: "e.g., Instantly built-in", type: "text" }
      ]
    },
    {
      id: "domain3",
      title: "Domain 3: hiacme.com",
      fields: [
        { id: "start", label: "Start Date", placeholder: "e.g., Jan 15 (2 weeks after Domain 1)", type: "date" },
        { id: "inboxes", label: "Number of Inboxes", placeholder: "e.g., 3", type: "number" },
        { id: "tool", label: "Warmup Tool", placeholder: "e.g., MailReach", type: "text" }
      ]
    }
  ]}
/>

**Why stagger?**

1. **Reduces cognitive load** — You're only monitoring 3 inboxes at a time during critical Week 1-2
2. **Spreads financial cost** — $75/week instead of $300 upfront
3. **Allows learning** — Mistakes on Domain 1 don't affect Domains 2-3
4. **Maintains sending capacity** — Domain 1 reaches cruise altitude while Domain 3 is still warming

### Total System Ramp

Here's what your total daily sending looks like across all domains:

<ScenarioSimulator
  title="Multi-Domain Warmup Calculator"
  persistKey="email-deliverability-L6-calculator"
  levers={[
    { id: "domains", label: "Number of domains", min: 1, max: 5, step: 1, defaultValue: 4 },
    { id: "inboxesPerDomain", label: "Inboxes per domain", min: 2, max: 5, step: 1, defaultValue: 3 },
    { id: "weekNumber", label: "Week of warmup", min: 1, max: 4, step: 1, defaultValue: 1 }
  ]}
  outputs={[
    { 
      id: "totalInboxes", 
      label: "Total inboxes", 
      formula: "domains * inboxesPerDomain", 
      unit: "", 
      precision: 0 
    },
    { 
      id: "coldPerDay", 
      label: "Total cold emails/day", 
      formula: "weekNumber === 1 ? 0 : weekNumber === 2 ? totalInboxes * 5 : weekNumber === 3 ? totalInboxes * 15 : totalInboxes * 30", 
      unit: "", 
      precision: 0 
    },
    { 
      id: "warmupPerDay", 
      label: "Total warmup emails/day", 
      formula: "weekNumber === 1 ? totalInboxes * 10 : weekNumber === 2 ? totalInboxes * 18 : weekNumber === 3 ? totalInboxes * 25 : totalInboxes * 20", 
      unit: "", 
      precision: 0 
    }
  ]}
  insight="At Week {weekNumber}, you're sending {coldPerDay} cold emails/day across {totalInboxes} inboxes. Your warmup maintenance is {warmupPerDay} emails/day. Total system load: {coldPerDay + warmupPerDay} emails/day."
/>

---

## Monitoring During Warmup

You can't fix what you don't measure. Here's your daily monitoring routine:

### Daily Checks (5 minutes/day)

<InteractiveChecklist 
  title="Daily Warmup Monitoring Routine" 
  persistKey="email-deliverability-L6-daily-checks" 
  items={[
    "Check GlockApps or MailReach inbox placement (target: 90%+)",
    "Review Google Postmaster domain reputation (target: High/green)",
    "Scan for bounce rate spikes (threshold: >2% = investigate)",
    "Check spam complaint rate in warmup tool (threshold: >0.1% = pause)",
    "Verify warmup emails are sending (check sent folder)",
    "Look for any error messages in sending platform"
  ]} 
/>

### Weekly Deep Dive (20 minutes/week)

Every Sunday (or your chosen day), run this analysis:

<ProgressiveReveal title="Weekly Warmup Health Report" persistKey="email-deliverability-L6-weekly">
<RevealSection title="Step 1: Inbox Placement Trends">

**Pull data from GlockApps or MailReach:**

| Domain | Week 1 Avg | Week 2 Avg | Week 3 Avg | Trend |
|--------|-----------|-----------|-----------|-------|
| getacme.com | 92% | 94% | 95% | ✅ Improving |
| tryacme.com | 88% | 85% | 82% | ⚠️ Declining |
| hiacme.com | 91% | 93% | 94% | ✅ Stable |

**Action:** Investigate tryacme.com — check for content issues, spam trap hits, or DNS problems.

</RevealSection>

<RevealSection title="Step 2: Engagement Metrics">

**From your sending platform (Instantly/Smartlead):**

- **Open rate:** Target 40-60% (warmup) / 20-35% (cold)
- **Reply rate:** Target 30-50% (warmup) / 3-8% (cold)
- **Click rate:** Target 10-20% (warmup) / 2-5% (cold)

**Red flags:**
- Open rate &lt;30% on warmup = warmup tool issue
- Reply rate &lt;20% on warmup = warmup network problem
- Open rate &lt;15% on cold = content or targeting issue

</RevealSection>

<RevealSection title="Step 3: Reputation Scores">

**Google Postmaster Tools (per domain):**

- Domain reputation: High (green) = good, Medium (yellow) = caution, Low/Bad (red) = crisis
- IP reputation: High (green) = good, Medium (yellow) = caution, Low/Bad (red) = crisis
- Spam rate: &lt;0.1% = excellent, 0.1-0.3% = acceptable, >0.3% = danger zone

**Microsoft SNDS (if sending to Outlook):**

- Green = good
- Yellow = caution (reduce volume)
- Red = blocked (pause immediately)

</RevealSection>

<RevealSection title="Step 4: Volume Compliance">

**Check that you're staying within safe limits:**

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Max per inbox/day | 50 | 35 | ✅ |
| Total cold/day | 400 | 280 | ✅ |
| Warmup:Cold ratio | 1:1 minimum | 1.2:1 | ✅ |
| Bounce rate | &lt;2% | 1.3% | ✅ |
| Complaint rate | &lt;0.1% | 0.04% | ✅ |

</RevealSection>
</ProgressiveReveal>

---

## Warmup Red Flags and Recovery

Even with perfect execution, things can go wrong. Here's how to recognize and fix issues:

### Red Flag 1: Inbox Placement Drops Below 80%

<DecisionTree
  title="Inbox Placement Recovery Protocol"
  persistKey="email-deliverability-L6-placement-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Your inbox placement drops from 92% to 76% over 3 days. What's your first move?", 
      choices: [
        { label: "Pause all cold sends immediately", nextNodeId: "pause" },
        { label: "Reduce volume by 50%", nextNodeId: "reduce" },
        { label: "Switch to a different domain", nextNodeId: "switch" }
      ]
    },
    { 
      id: "pause", 
      content: "Good call. You pause cold sends but continue warmup. Next step?", 
      choices: [
        { label: "Check Google Postmaster for spam complaints", nextNodeId: "postmaster" },
        { label: "Run emails through mail-tester.com", nextNodeId: "mailtester" }
      ]
    },
    { 
      id: "reduce", 
      content: "Reducing volume helps but doesn't address root cause. Placement stabilizes at 78%. You should have paused entirely.", 
      isTerminal: true, 
      outcome: "neutral" 
    },
    { 
      id: "switch", 
      content: "Switching domains wastes the domain and doesn't fix the underlying issue. You'll burn through domains quickly.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "postmaster", 
      content: "Postmaster shows 0.15% spam complaint rate (above 0.1% target). The issue is content or targeting.", 
      choices: [
        { label: "Audit cold email content for spam triggers", nextNodeId: "audit" },
        { label: "Review lead list quality", nextNodeId: "list" }
      ]
    },
    { 
      id: "mailtester", 
      content: "Mail-tester gives you a 6.8/10 score. Flags: missing unsubscribe link, too many links, spammy subject line.", 
      choices: [
        { label: "Fix flagged issues and retest", nextNodeId: "fix" }
      ]
    },
    { 
      id: "audit", 
      content: "You find: 4 links per email (too many), no personalization in 30% of sends, generic subject lines. You rewrite templates.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "list", 
      content: "You discover 15% of your list is old data (2+ years). You clean the list and remove bounces. Placement recovers to 88% within 5 days.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "fix", 
      content: "After fixes, mail-tester score improves to 9.2/10. You resume sending at 50% volume. Placement recovers to 91% within a week.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

### Red Flag 2: Sudden Bounce Rate Spike

**Symptom:** Bounce rate jumps from 1% to 8% overnight

**Causes:**
1. Bad data in lead list (typos, old emails, spam traps)
2. Sending to role-based emails (info@, sales@, admin@)
3. Domain blacklisted (rare but possible)

**Recovery protocol:**

<InteractiveChecklist 
  title="Bounce Rate Spike Recovery" 
  persistKey="email-deliverability-L6-bounce-recovery" 
  items={[
    "Pause campaign immediately (don't send to more bad emails)",
    "Export all bounced emails from last 7 days",
    "Categorize bounces: hard bounce (doesn't exist) vs soft bounce (full inbox)",
    "Run remaining list through NeverBounce or ZeroBounce ($0.008/email)",
    "Remove all hard bounces and 'risky' emails from list",
    "Check MXToolbox for domain blacklisting (unlikely but check)",
    "Resume at 50% volume with cleaned list",
    "Monitor bounce rate for 3 days before returning to full volume"
  ]} 
/>

### Red Flag 3: Google Postmaster Shows "Bad" Reputation

**Symptom:** Domain reputation drops from "High" (green) to "Bad" (red)

**This is a crisis.** You have 24-48 hours to fix it before permanent damage.

**Emergency protocol:**

1. **Stop all sending immediately** (warmup + cold)
2. **Check spam complaint rate** — If >0.3%, you hit a spam trap or sent to a bad list
3. **Audit last 7 days of sends** — Look for patterns (specific campaign, specific list, specific content)
4. **Submit to Google's Email Sender Guidelines** — Acknowledge the issue, explain corrective action
5. **Rest domain for 14-30 days** — No sends at all
6. **Restart warmup from Day 1** — Treat it as a new domain

<InsightCard icon="🚨" title="The 'Bad' Reputation Reality">
If Google Postmaster shows "Bad" reputation, your domain is effectively burned for 30-90 days. You can recover, but it takes time and perfect behavior.

**Prevention is 100x easier than recovery.**

This is why you have 4-5 domains. If one goes bad, you have backups.
</InsightCard>

---

## Your 30-Day Warmup Plan

Let's build your complete warmup schedule based on your specific setup.

<TemplateBuilder
  title="Your Custom 30-Day Warmup Plan"
  persistKey="email-deliverability-L6-custom-plan"
  sections={[
    {
      id: "setup",
      title: "Your Setup",
      fields: [
        { id: "domains", label: "Number of sending domains", placeholder: "e.g., 4", type: "number" },
        { id: "inboxes", label: "Inboxes per domain", placeholder: "e.g., 3", type: "number" },
        { id: "tool", label: "Warmup tool", placeholder: "e.g., MailReach, Instantly, Warmbox", type: "text" },
        { id: "startDate", label: "Start date for Domain 1", placeholder: "e.g., Jan 1, 2025", type: "date" }
      ]
    },
    {
      id: "targets",
      title: "Volume Targets",
      fields: [
        { id: "week1", label: "Week 1 target (warmup only)", placeholder: "e.g., 10/day per inbox", type: "number" },
        { id: "week2", label: "Week 2 target (warmup + cold)", placeholder: "e.g., 20/day per inbox", type: "number" },
        { id: "week3", label: "Week 3 target", placeholder: "e.g., 35/day per inbox", type: "number" },
        { id: "week4", label: "Week 4 target (cruise)", placeholder: "e.g., 50/day per inbox", type: "number" }
      ]
    },
    {
      id: "monitoring",
      title: "Monitoring Plan",
      fields: [
        { id: "dailyCheck", label: "Daily check time", placeholder: "e.g., 9am", type: "text" },
        { id: "weeklyReview", label: "Weekly review day", placeholder: "e.g., Sunday", type: "text" },
        { id: "alertThreshold", label: "Placement alert threshold", placeholder: "e.g., 85%", type: "number" }
      ]
    }
  ]}
/>

---

## Summary: Your Warmup Checklist

<InteractiveChecklist 
  title="30-Day Warmup Execution Checklist" 
  persistKey="email-deliverability-L6-summary" 
  items={[
    "Set up warmup tool (MailReach, Instantly, or Warmbox) for all inboxes",
    "Configure warmup settings: 30-50% reply rate, professional content",
    "Start Domain 1 inboxes at 5 emails/day (warmup only)",
    "Monitor daily: inbox placement, bounce rate, spam complaints",
    "Week 2: Introduce 3-5 cold emails/day while maintaining warmup",
    "Week 3: Scale to 15-20 cold emails/day if placement holds above 85%",
    "Week 4: Reach 30-50 cold emails/day with 15-20 warmup maintenance",
    "Stagger Domain 2 start by 7 days, Domain 3 by 14 days",
    "Set up Google Postmaster and Microsoft SNDS monitoring",
    "Create weekly review routine (20 min every Sunday)",
    "Build recovery playbook for placement drops, bounce spikes, reputation issues",
    "Never turn off warmup completely — maintain 15-20/day indefinitely"
  ]} 
/>

---

## What's Next

In **Lesson 7: Inbox Rotation & Sending Limits**, you'll learn how to orchestrate 12-15 inboxes sending 200-400 emails/day without triggering bulk sender flags.

You'll build:
- Inbox rotation logic (round-robin vs smart rotation)
- Per-inbox volume caps (30-50/day max)
- Sending window optimization (8am-2pm recipient time)
- Reply management architecture (centralized vs distributed)

**Before Lesson 7, complete this:**

<InteractiveChecklist 
  title="Pre-Lesson 7 Prep" 
  persistKey="email-deliverability-L6-prep-L7" 
  items={[
    "Start warmup on at least one domain (3 inboxes minimum)",
    "Set up daily monitoring routine (5 min/day)",
    "Document your warmup schedule in a spreadsheet or project management tool",
    "Join the SoloFrameHub community and share your warmup progress"
  ]} 
/>