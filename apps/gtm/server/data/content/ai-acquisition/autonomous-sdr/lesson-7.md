---
title: "Supervision Patterns: Daily Queue + Kill Switches"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 26: Autonomous SDR Systems"
lesson: 7
---

# Supervision Patterns: Daily Queue + Kill Switches

## The 3 AM Wake-Up Call

It's 3:17 AM. Your phone buzzes. Slack notification. Then another. Then five more in rapid succession.

Your AI SDR just sent 147 emails to your entire prospect list with a hallucinated personalization line claiming they all "recently posted about switching from Salesforce to HubSpot" — except none of them did. The AI misread a training example as live data.

By morning, you have 23 spam complaints, 4 angry LinkedIn DMs, and your primary sending domain is flagged by Google. Three months of deliverability work destroyed in 90 minutes while you slept.

**This is why supervision patterns exist.**

The promise of "autonomous" AI SDRs is seductive: set it and forget it, wake up to booked meetings. The reality? AI SDRs are **semi-autonomous at best** — they need human supervision the way a junior SDR needs a manager. The difference is the junior SDR won't accidentally email 500 people at 2 AM with the wrong message.

In this lesson, you'll build the supervision infrastructure that prevents disasters while keeping the time investment under 15 minutes per day.

---

## The Supervision Reality Check

<InsightCard icon="⚠️" title="The Uncomfortable Truth">
If you're not willing to spend 15 minutes per day reviewing your AI SDR's work, you're not ready to run one. The time savings come from automation of research and drafting — not from eliminating human judgment.
</InsightCard>

Let's establish baseline expectations:

<RangeSlider 
  label="How much daily time are you willing to invest in AI SDR supervision?" 
  min={0} 
  max={60} 
  lowLabel="0 min (full autopilot)" 
  highLabel="60 min (full review)" 
  persistKey="autonomous-sdr-L7-time-commitment" 
/>

**If you selected less than 10 minutes:** You're in the danger zone. Expect brand damage incidents within 30 days.

**If you selected 10-20 minutes:** This is the sweet spot for solo founders. Enough to catch critical errors, not so much it negates the automation benefit.

**If you selected 20+ minutes:** You might be over-supervising. Consider whether a DIY stack (where you control every send) would be simpler.

<FlipCard 
  front="What does 'supervision' actually mean?" 
  back="Daily review of planned sends, reply classifications, and anomaly detection. Weekly calibration of prompts, sequences, and performance metrics. Immediate response to escalations and kill switch triggers." 
/>

---

## The Daily Review Queue: Your 15-Minute Protocol

Every morning, before your AI SDR sends a single email, you review **the queue**. This is non-negotiable.

### Priority Order (Most Critical First)

<SlideNavigation>
<Slide title="1. Reply Queue (5 minutes)">

**Why this comes first:** Misclassified replies are the highest-risk failure mode. An "interested" prospect classified as "not interested" gets a breakup email instead of a meeting invite. A spam complaint classified as "objection" gets a rebuttal instead of immediate removal.

**What you're looking for:**
- Any reply containing: "interested," "call," "meeting," "pricing," "demo"
- Any reply containing: "remove," "unsubscribe," "stop," "spam"
- Any reply that's longer than 2 sentences (likely needs human nuance)
- Any reply from a prospect with deal size > $5K

**Action:** Approve AI's classification OR override and handle manually.

<ExampleCard label="Real Example: The $40K Save">
AI classified this reply as "not interested": *"This looks interesting but we're locked into our current solution until Q3. Can you follow up in June?"*

The AI was about to send a breakup email. Human review caught it, marked it as "warm — follow up June 1st," and that prospect became a $40K annual contract.
</ExampleCard>

</Slide>

<Slide title="2. First Touches to High-Value Prospects (5 minutes)">

**Why this matters:** First impressions are permanent. A hallucinated personalization line or off-brand tone in a first email destroys trust before you've built any.

**What you're reviewing:**
- Any first-touch email to prospects with:
  - Company size > 100 employees
  - Estimated deal size > $10K
  - Warm intro or referral source
  - Industry you're trying to break into

**What you're checking:**
- Personalization is **factual** (not hallucinated)
- Tone matches your brand voice
- Value prop is specific to their segment
- CTA is appropriate for relationship stage

**The FASP Test** (from Course 21):
- **(F)actual?** — Can you verify this claim?
- **(A)ctually relevant?** — Does it matter to their business?
- **(S)pecific to this person?** — Or could it apply to anyone?
- **(P)roud if they knew?** — Would you be comfortable explaining how you found this?

</Slide>

<Slide title="3. Active Sequence Follow-Ups (3 minutes)">

**Why this matters:** Follow-ups to engaged prospects need context awareness. The AI might not remember that Step 2 got a reply, or that you had a call scheduled.

**What you're checking:**
- No follow-ups to prospects who already replied (should be in reply queue)
- No follow-ups to prospects with scheduled meetings
- Timing makes sense (not sending Step 3 before Step 2 delivered)
- Message acknowledges previous context if applicable

**Quick scan:** If the prospect name looks familiar, open their full thread before approving.

</Slide>

<Slide title="4. Anomaly Scan (2 minutes)">

**The Red Dashboard** — 5 metrics that should trigger immediate investigation:

<InteractiveChecklist 
  title="Daily Anomaly Checklist" 
  persistKey="autonomous-sdr-L7-anomaly-check" 
  items={[
    "Bounce rate < 5% (if higher, pause and investigate)",
    "Complaint rate < 0.05% (if higher, kill switch immediately)",
    "Send volume within 20% of normal (sudden spikes = potential blast error)",
    "Reply rate within expected range (sudden drop = deliverability issue)",
    "No repeated personalization patterns (sign of template error)"
  ]} 
/>

**If any metric is red:** Pause sends, investigate root cause, fix before resuming.

</Slide>
</SlideNavigation>

<InsightCard icon="⏱️" title="The 15-Minute Commitment">
This daily review takes 15 minutes because you're **not reading every email** — you're scanning for exceptions. The AI handles the 80% of routine sends. You focus on the 20% that carry risk.
</InsightCard>

---

## Kill Switches: Your Emergency Stop System

A kill switch is exactly what it sounds like: an immediate pause button that stops the AI SDR from sending anything until you manually resume.

**You need kill switches configured BEFORE launch, not after an incident.**

### The Kill Switch Hierarchy

<ClassifyExercise
  title="Match the Situation to the Kill Switch Level"
  persistKey="autonomous-sdr-L7-kill-switch-classify"
  categories={[
    { id: "tactical", label: "Tactical (Pause One Campaign)", color: "#f59e0b" },
    { id: "strategic", label: "Strategic (Pause All Sends)", color: "#ef4444" },
    { id: "nuclear", label: "Nuclear (Pause + Disconnect Domains)", color: "#991b1b" }
  ]}
  items={[
    { 
      id: "1", 
      content: "You notice one campaign has a 12% bounce rate (others are normal)", 
      correctCategory: "tactical",
      explanation: "Isolated to one campaign — pause it, investigate the list quality, fix and resume. Other campaigns can continue."
    },
    { 
      id: "2", 
      content: "You get 3 spam complaints in 10 minutes across different campaigns", 
      correctCategory: "strategic",
      explanation: "Pattern across campaigns suggests systemic issue (deliverability, content, or targeting). Pause everything until you identify root cause."
    },
    { 
      id: "3", 
      content: "Google sends a 'bulk sender violation' warning and your open rates drop to 2%", 
      correctCategory: "nuclear",
      explanation: "Domain reputation is compromised. Pause all sends AND disconnect sending domains to prevent further damage. This requires infrastructure rebuild."
    },
    { 
      id: "4", 
      content: "AI sends an email with a hallucinated fact to 50 prospects before you catch it", 
      correctCategory: "strategic",
      explanation: "Pause all sends. Review AI prompt configuration. Send manual apology to affected prospects. Resume only after fixing prompt."
    },
    { 
      id: "5", 
      content: "One prospect replies angrily about receiving a follow-up after unsubscribing", 
      correctCategory: "tactical",
      explanation: "Isolated incident. Pause that specific sequence, verify unsubscribe was processed, apologize to prospect, fix the suppression list."
    }
  ]}
/>

### How to Configure Kill Switches

Most AI SDR platforms have built-in pause functions, but they're often buried in settings. **You need one-click access.**

<TemplateBuilder
  title="Your Kill Switch Configuration"
  persistKey="autonomous-sdr-L7-kill-switch-config"
  sections={[
    {
      id: "tactical",
      title: "Tactical Kill Switch (Campaign-Level)",
      fields: [
        { 
          id: "trigger", 
          label: "What triggers this level?", 
          placeholder: "e.g., Bounce rate > 8% in one campaign, 2+ complaints from one segment", 
          type: "textarea" 
        },
        { 
          id: "action", 
          label: "Immediate action steps", 
          placeholder: "1. Pause campaign in platform\n2. Export affected list\n3. Investigate data quality\n4. Fix and resume", 
          type: "textarea" 
        },
        { 
          id: "access", 
          label: "How to access (URL or steps)", 
          placeholder: "e.g., Platform → Campaigns → [Campaign Name] → Pause button", 
          type: "text" 
        }
      ]
    },
    {
      id: "strategic",
      title: "Strategic Kill Switch (All Sends)",
      fields: [
        { 
          id: "trigger", 
          label: "What triggers this level?", 
          placeholder: "e.g., 3+ spam complaints in 1 hour, hallucination detected, reply rate drops 50%+", 
          type: "textarea" 
        },
        { 
          id: "action", 
          label: "Immediate action steps", 
          placeholder: "1. Pause all campaigns\n2. Review last 24hr of sends\n3. Identify root cause\n4. Fix before resuming", 
          type: "textarea" 
        },
        { 
          id: "access", 
          label: "How to access (URL or steps)", 
          placeholder: "e.g., Platform → Settings → Global Pause toggle", 
          type: "text" 
        }
      ]
    },
    {
      id: "nuclear",
      title: "Nuclear Kill Switch (Pause + Disconnect)",
      fields: [
        { 
          id: "trigger", 
          label: "What triggers this level?", 
          placeholder: "e.g., Domain blacklisted, Google bulk sender warning, open rate < 3% for 48 hours", 
          type: "textarea" 
        },
        { 
          id: "action", 
          label: "Immediate action steps", 
          placeholder: "1. Pause all sends\n2. Disconnect sending domains from platform\n3. Contact deliverability expert\n4. Plan domain recovery or replacement", 
          type: "textarea" 
        },
        { 
          id: "access", 
          label: "How to access (URL or steps)", 
          placeholder: "e.g., Platform → Integrations → Email → Disconnect; DNS → Remove SPF/DKIM records", 
          type: "text" 
        }
      ]
    }
  ]}
/>

<InsightCard icon="🔴" title="The Nuclear Option Is Not Theoretical">
In 2025, a solo founder using an AI SDR platform had their primary domain blacklisted after the AI sent 800+ emails in 2 hours due to a rate-limiting bug. Recovery took 4 months and required a new domain. The nuclear kill switch would have limited damage to 50 emails instead of 800.
</InsightCard>

---

## Exception Escalation Rules: What Gets Your Attention

Not every reply needs your attention. Not every send needs review. The key is defining **escalation rules** that route the right things to you and let the AI handle the routine.

### The Exception Escalation Matrix

<ComparisonBuilder
  title="Build Your Escalation Rules"
  persistKey="autonomous-sdr-L7-escalation-rules"
  prompt="For each reply type below, decide: Should this escalate to you, or can the AI handle it?"
  expertExample="**Positive/Interested Reply:** ALWAYS escalate — too valuable to risk AI mishandling.
**Objection (timing):** Escalate if deal size > $5K, otherwise AI handles with standard objection sequence.
**Not Interested (polite):** AI handles — send graceful breakup email.
**Spam Complaint:** ESCALATE + PAUSE — immediate removal + investigate why they complained."
  criteria={[
    "Protects high-value opportunities",
    "Prevents brand damage",
    "Doesn't over-escalate routine replies"
  ]}
/>

### Standard Escalation Matrix (Customize for Your Business)

| Reply Type | AI SDR Action | Escalate to Human? | Why? |
|-----------|--------------|-------------------|------|
| **Positive / interested** | Draft reply, HOLD for review | ✅ YES — always | Too valuable to risk mishandling |
| **Meeting request** | Send calendar link | ✅ YES — confirm first | Verify timing and prep |
| **Question about product/pricing** | Draft response, HOLD | ✅ YES — always | Requires accuracy and context |
| **Objection (timing)** | Send objection handling | ✅ If deal > $5K | High-value needs human touch |
| **Objection (budget)** | Send objection handling | ✅ If deal > $5K | May need custom pricing |
| **Not interested (polite)** | Send graceful close | ❌ No — AI handles | Low risk, standard response |
| **Unsubscribe request** | Remove immediately | ❌ No — auto-process | Legal requirement, no judgment needed |
| **Angry / complaint** | PAUSE all sends to this person | ✅ YES — immediately | Brand damage risk |
| **Confused / unclear** | Draft clarification, HOLD | ✅ YES | Requires human interpretation |
| **Auto-reply / OOO** | Log and reschedule | ❌ No — AI handles | Routine, no action needed |

<RangeSlider 
  label="What's your deal size threshold for escalating objections?" 
  min={1000} 
  max={50000} 
  step={1000}
  lowLabel="$1K" 
  highLabel="$50K" 
  persistKey="autonomous-sdr-L7-deal-threshold" 
/>

**Why this matters:** If your average deal is $2K, escalating every objection above $5K means you review ~20% of objections. If your average deal is $20K, you might escalate everything above $10K (50% of objections). Calibrate to your economics.

---

## The Weekly Calibration Session: 30 Minutes to Stay on Track

Daily review catches tactical errors. Weekly calibration fixes **systemic drift**.

AI SDRs don't stay tuned — they drift. Prompts that worked in Week 1 produce generic output by Week 4. Reply classifications that were 95% accurate drop to 80% as edge cases accumulate. Send volume creeps up. Personalization gets lazy.

**Every Friday (or Monday), spend 30 minutes on calibration.**

<SlideNavigation>
<Slide title="Calibration Step 1: Performance Review (10 min)">

Pull the weekly metrics:

<InteractiveChecklist 
  title="Weekly Metrics to Review" 
  persistKey="autonomous-sdr-L7-weekly-metrics" 
  items={[
    "Total sends (by campaign)",
    "Bounce rate (should be < 3%)",
    "Reply rate (positive, negative, neutral)",
    "Meeting booking rate (from positive replies)",
    "Complaint rate (should be < 0.05%)",
    "Reply classification accuracy (spot-check 10 random replies)"
  ]} 
/>

**What you're looking for:**
- **Trends:** Is reply rate declining? Is bounce rate creeping up?
- **Outliers:** Did one campaign perform 3x better than others? Why?
- **Drift:** Are personalization quality scores dropping week-over-week?

</Slide>

<Slide title="Calibration Step 2: Prompt Tuning (10 min)">

Review 5-10 AI-generated emails from the past week. Ask:

1. **Does this still sound like me?** (Brand voice drift)
2. **Is the personalization still specific?** (Generic drift)
3. **Are we repeating the same patterns?** (Template fatigue)

**Common fixes:**
- Add negative examples to prompts ("Don't say X, say Y instead")
- Refresh personalization data sources (new trigger events, recent posts)
- Rotate value prop angles (if you've been leading with ROI for 4 weeks, try risk reduction)

<ExampleCard label="Real Prompt Drift Example">
**Week 1 Output:** *"I noticed your team posted about scaling content production — most agencies hit a wall at 50 pieces/month without workflow automation."*

**Week 4 Output (same prompt):** *"I saw you're focused on content. We help with that."*

**The Fix:** Added to prompt: *"Always reference a specific number, metric, or recent event. Never use vague phrases like 'focused on' or 'help with.'"*
</ExampleCard>

</Slide>

<Slide title="Calibration Step 3: Exclusion List Update (5 min)">

Your AI SDR should maintain an **exclusion list** of:
- Unsubscribes (automatic)
- Competitors (manual)
- Past customers (manual)
- Prospects you've personally spoken to (manual)
- Industries/segments you're no longer targeting (manual)

**Weekly task:** Add any new exclusions from the past 7 days.

**Why this matters:** Without regular updates, the AI will re-contact people you've already disqualified, creating awkward "didn't you already email me?" moments.

</Slide>

<Slide title="Calibration Step 4: Sequence Adjustments (5 min)">

Review active sequences:
- Are follow-up intervals still appropriate? (Maybe 3 days is too aggressive, move to 5)
- Are we sending too many steps? (Maybe 7-step sequences should be 5)
- Are breakup emails working? (If yes, keep; if no, revise or remove)

**The data to check:**
- Reply rate by sequence step (if Step 4+ gets 0 replies, cut it)
- Unsubscribe rate by step (if Step 5 has 3x more unsubs than Step 2, it's too pushy)

</Slide>
</SlideNavigation>

<InsightCard icon="📊" title="Why Weekly Calibration Matters">
Solo founders who skip weekly calibration report 40% more brand damage incidents and 25% lower reply rates by Month 3. The AI doesn't self-correct — you have to tune it.
</InsightCard>

---

## Simulation: Triage the Inbox

You're about to see 15 AI SDR outputs from the past 24 hours. Your job: **Triage each one.**

- ✅ **Approve** — AI's action is correct, let it proceed
- ✏️ **Edit** — AI's action needs modification before proceeding
- 🚨 **Escalate** — This needs human handling, don't let AI touch it
- 🛑 **Kill Switch** — This is a systemic problem, pause everything

<MiniRoleplay
  scenario="**Reply from prospect:** 'This looks interesting but we just signed a 2-year contract with your competitor. Can you check back in 18 months?'

**AI Classification:** Not interested (send breakup email)

**What do you do?**"
  role="You are the founder reviewing this classification"
  persistKey="autonomous-sdr-L7-roleplay-1"
  modelResponse="**ESCALATE + EDIT.** This is not 'not interested' — this is 'interested but timing is wrong.' Override classification to 'Warm — Follow up [18 months from now].' Add to CRM with reminder. Do NOT send breakup email. This prospect just told you exactly when to re-engage."
/>

<MiniRoleplay
  scenario="**AI-generated first email:** 'Hi [Name], I noticed your company recently raised a Series B and is hiring aggressively. Most fast-growing startups struggle with [pain point].'

**Prospect company:** Bootstrapped, 8 employees, no recent funding.

**What do you do?**"
  role="You are reviewing this email before it sends"
  persistKey="autonomous-sdr-L7-roleplay-2"
  modelResponse="**KILL SWITCH (Tactical).** This is a hallucinated personalization — the AI invented the Series B claim. Pause this campaign immediately. Review the data source feeding the AI. Check if other emails in this batch have similar hallucinations. Fix the prompt to require factual verification before sending. Do NOT send this email."
/>

<MiniRoleplay
  scenario="**Dashboard alert:** Bounce rate spiked to 18% in the past 2 hours (normal is 2-3%). Affects one campaign targeting 'VP of Marketing at SaaS companies 50-200 employees.'

**What do you do?**"
  role="You are responding to this anomaly"
  persistKey="autonomous-sdr-L7-roleplay-3"
  modelResponse="**KILL SWITCH (Tactical).** Pause this campaign immediately. Export the list and check data quality — likely the email verification failed or the list source is bad. Investigate: Are these real emails? Are they role-based (info@, sales@) which bounce more? Fix the list, re-verify emails, then resume. High bounce rate will damage domain reputation if it continues."
/>

---

## Your Supervision Playbook: Build It Now

You've learned the theory. Now build the artifact you'll actually use every day.

<TemplateBuilder
  title="AI SDR Daily Supervision Checklist"
  persistKey="autonomous-sdr-L7-daily-checklist"
  sections={[
    {
      id: "morning",
      title: "Morning Review (15 minutes)",
      fields: [
        { 
          id: "replies", 
          label: "Reply Queue Review (5 min)", 
          placeholder: "1. Check for 'interested' keywords\n2. Verify AI classification\n3. Escalate high-value replies\n4. Approve routine 'not interested' responses", 
          type: "textarea" 
        },
        { 
          id: "first-touch", 
          label: "High-Value First Touches (5 min)", 
          placeholder: "1. Filter for deal size > $X\n2. Run FASP test on personalization\n3. Check brand voice\n4. Approve or edit", 
          type: "textarea" 
        },
        { 
          id: "sequences", 
          label: "Active Sequence Check (3 min)", 
          placeholder: "1. Verify no follow-ups to replied prospects\n2. Check timing makes sense\n3. Approve routine follow-ups", 
          type: "textarea" 
        },
        { 
          id: "anomalies", 
          label: "Red Dashboard Scan (2 min)", 
          placeholder: "1. Bounce rate < 5%?\n2. Complaint rate < 0.05%?\n3. Send volume normal?\n4. Reply rate normal?\n5. No repeated errors?", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "friday",
      title: "Friday Calibration (30 minutes)",
      fields: [
        { 
          id: "metrics", 
          label: "Weekly Metrics Review (10 min)", 
          placeholder: "1. Pull sends, bounces, replies, meetings\n2. Compare to last week\n3. Identify trends (up/down/flat)\n4. Flag outliers", 
          type: "textarea" 
        },
        { 
          id: "prompts", 
          label: "Prompt Quality Check (10 min)", 
          placeholder: "1. Review 5-10 recent AI emails\n2. Check for voice drift\n3. Check for generic personalization\n4. Update prompts with negative examples", 
          type: "textarea" 
        },
        { 
          id: "exclusions", 
          label: "Exclusion List Update (5 min)", 
          placeholder: "1. Add new unsubscribes\n2. Add disqualified prospects\n3. Add past customers\n4. Verify list is syncing to AI SDR", 
          type: "textarea" 
        },
        { 
          id: "sequences", 
          label: "Sequence Tuning (5 min)", 
          placeholder: "1. Check reply rate by step\n2. Adjust intervals if needed\n3. Cut low-performing steps\n4. Test new breakup email variants", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## The Supervision Time Budget Reality Check

Let's do the math on what supervision actually costs you:

<ScenarioSimulator
  title="Supervision Time vs. Value Calculator"
  persistKey="autonomous-sdr-L7-time-calculator"
  levers={[
    { id: "dailyMin", label: "Daily review time (minutes)", min: 5, max: 60, step: 5, defaultValue: 15 },
    { id: "weeklyMin", label: "Weekly calibration time (minutes)", min: 0, max: 120, step: 15, defaultValue: 30 },
    { id: "hourlyRate", label: "Your hourly rate ($)", min: 50, max: 500, step: 50, defaultValue: 150 },
    { id: "meetingsPerMonth", label: "Meetings booked per month", min: 2, max: 30, step: 2, defaultValue: 10 },
    { id: "dealSize", label: "Average deal size ($)", min: 1000, max: 100000, step: 1000, defaultValue: 10000 },
    { id: "closeRate", label: "Close rate (%)", min: 5, max: 50, step: 5, defaultValue: 20 }
  ]}
  outputs={[
    { 
      id: "monthlyTime", 
      label: "Monthly supervision time (hours)", 
      formula: "((dailyMin * 30) + (weeklyMin * 4)) / 60", 
      unit: "hrs", 
      precision: 1 
    },
    { 
      id: "timeCost", 
      label: "Monthly time cost", 
      formula: "(((dailyMin * 30) + (weeklyMin * 4)) / 60) * hourlyRate", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "revenue", 
      label: "Monthly revenue generated", 
      formula: "meetingsPerMonth * (closeRate / 100) * dealSize", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "roi", 
      label: "ROI (revenue / time cost)", 
      formula: "(meetingsPerMonth * (closeRate / 100) * dealSize) / ((((dailyMin * 30) + (weeklyMin * 4)) / 60) * hourlyRate)", 
      unit: "x", 
      precision: 1 
    }
  ]}
  insight="At {monthlyTime} hours/month of supervision, you're investing ${timeCost} of your time. If that generates $`{revenue}` in revenue, your ROI is `{roi}`x. If ROI < 3x, consider whether the AI SDR is worth it vs. a simpler DIY stack."
/>

**The benchmark:** If your supervision ROI is below 3x, you're spending too much time relative to output. Either:
1. Reduce supervision time (move more to autopilot — risky)
2. Improve AI SDR performance (better prompts, better lists)
3. Switch to a DIY stack where you control every send (simpler, less supervision needed)

---

## Summary: The Non-Negotiables

<InteractiveChecklist 
  title="Your AI SDR Supervision Commitments" 
  persistKey="autonomous-sdr-L7-commitments" 
  items={[
    "I will spend 15 minutes every morning reviewing the daily queue (replies, high-value sends, anomalies)",
    "I have configured kill switches at 3 levels (tactical, strategic, nuclear) and know how to access them in under 30 seconds",
    "I have defined escalation rules for every reply type and will not let AI handle high-value or angry replies",
    "I will spend 30 minutes every Friday on calibration (metrics, prompts, exclusions, sequences)",
    "I will track the Red Dashboard metrics daily and pause immediately if any threshold is breached",
    "I understand that 'autonomous' does not mean 'unsupervised' — the AI is a junior SDR, not a replacement for judgment"
  ]} 
/>

**The reality:** If you can't commit to these 6 items, you're not ready for an AI SDR platform. A DIY stack (Instantly + Apollo + ChatGPT) will serve you better because you'll naturally review every send as you build it.

**The upside:** If you DO commit to these patterns, you'll catch 90%+ of errors before they reach prospects, maintain brand trust, and get the time savings AI SDRs promise without the disasters they can cause.

---

## What's Next

In **Lesson 8**, we'll apply the **Automation Failure Matrix** specifically to AI SDRs — a 2x2 framework that tells you exactly which tasks to automate, which to gate with human review, which to keep fully human, and which to eliminate entirely.

You'll classify every AI SDR function (email drafting, reply handling, LinkedIn DMs, prospect research, sequence timing) into the matrix and build your **Automation Decision Tree** — the artifact that prevents you from automating the wrong things.