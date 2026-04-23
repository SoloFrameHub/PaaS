---
title: "The One-Page Personal Acquisition System"
duration: "55 min"
track: "Operations & Systems"
course: "Course 44: The Sales Playbook"
lesson: 7
---

## The Forcing Function

You've spent six lessons building situation-specific playbooks. You've answered the 5 core questions, chosen your situation (zero, B2B SaaS, coach/consultant, creator, or scaling), and populated templates with specific answers.

Now comes the real test: can you fit your entire acquisition system onto one page?

This isn't a simplification exercise. It's a clarity test. The one-page constraint forces you to eliminate everything that's aspirational but not actionable, everything that's vague but sounds strategic, everything you added to feel thorough but that you'll never actually execute.

If it doesn't fit on one page, you lack clarity.

This sounds harsh. It's meant to be.

<InsightCard icon="📄" title="The One-Page Principle">
Companies with a one-page strategy document execute 3x faster than those with 20-page strategy documents. Not because the one-pagers have less information — but because the constraint forces prioritization. Everything on the page earned its place. Nothing is filler.
</InsightCard>

## Why One Page Works

Research on written goals shows they're **42% more likely to be achieved** than unwritten ones. The one-page system amplifies this effect through three mechanisms:

<SlideNavigation>
<Slide title="Mechanism 1: Commitment via Constraint">

When you're forced to choose *one* primary channel instead of three, you've made a real decision. When you're forced to name *one* ICP in a single sentence, you've achieved clarity you didn't have before. The one-page constraint generates real commitments by making real decisions unavoidable.

A 15-page strategy can hold contradictions — "we'll focus on outbound AND build inbound AND nurture referrals AND create content." One page can't. You're forced to pick.

</Slide>
<Slide title="Mechanism 2: Daily Visibility">

A document you can read in 60 seconds is a document you'll actually read. You can tape it to the wall and glance at it before your first activity each day. It becomes a constant reminder of what you chose to prioritize.

A 15-page strategy lives in a folder. A one-page system lives on your wall, in your daily practice.

</Slide>
<Slide title="Mechanism 3: Communication Speed">

Your one-page system is something you can show an advisor, accountability partner, or future hire in 60 seconds. They can give you focused feedback, point out gaps, or validate your approach without having to read a novel.

The best feedback on your acquisition strategy comes from people who understand it quickly. One page enables that.

</Slide>
</SlideNavigation>

## The One-Page Layout

The one-page system has a specific layout, designed so every section is visible at a glance:

<InsightCard icon="🗂️" title="The One-Page Anatomy">
**Top section:** Version number + date (accountability)

**WHO bar:** Your ICP in one sentence (clarity)

**Three columns:**
- Left — HOW: Your primary + secondary channel with tools and volumes
- Center — WHAT: Your core message (problem, transformation, proof, CTA) in 3-4 sentences
- Right — MEASURED: 3 leading metrics with weekly targets + 2 lagging metrics with monthly targets

**Bottom bar:** COMMITMENT — daily and weekly activities with specific numbers + 90-day total targets

Everything visible at once. No scrolling. No page turns.
</InsightCard>

## Build Your One-Page System

This is the most important template in the entire course. Take your time. Every word should be specific, measurable, and honest.

<TemplateBuilder
  title="My Personal Acquisition System v1.0"
  persistKey="playbook-L7-template"
  sections={[
    {
      id: "header",
      title: "Header",
      fields: [
        { id: "version", label: "Version", placeholder: "v1.0", type: "text" },
        { id: "date", label: "Date Created", placeholder: "Today's date", type: "text" },
        { id: "situation", label: "Situation Playbook", placeholder: "Which situation best describes you: Starting from Zero / B2B SaaS / Coach-Consultant / Creator / Scaling", type: "text" }
      ]
    },
    {
      id: "who",
      title: "WHO — My Ideal Customer (1 sentence)",
      fields: [
        { id: "statement", label: "ICP Statement", placeholder: "[Job title] at [company type, size, stage] experiencing [specific pain/problem] who has [budget signal or buying trigger].", type: "textarea" }
      ]
    },
    {
      id: "how",
      title: "HOW — My Acquisition Channels",
      fields: [
        { id: "primary", label: "Primary Channel (70% of effort)", placeholder: "e.g., Cold email via Apollo: 50 personalized emails per week to [ICP filter] using [tool]. Expected reply rate: 6-8%.", type: "textarea" },
        { id: "secondary", label: "Secondary Channel (30% of effort)", placeholder: "e.g., LinkedIn: 3 posts per week (problem + case study + insight) + 10 personalized DMs to engaged followers.", type: "textarea" },
        { id: "tools", label: "Tools ($X/month)", placeholder: "List each tool and cost. Total should fit your budget.", type: "text" }
      ]
    },
    {
      id: "what",
      title: "WHAT — My Core Message (3-4 sentences total)",
      fields: [
        { id: "problem", label: "Problem (1 sentence)", placeholder: "Most [ICP] struggle with [specific problem] — [consequence in their words].", type: "text" },
        { id: "transformation", label: "Transformation Promise (1 sentence)", placeholder: "[Company/You] helps [ICP] [specific outcome] in [timeframe] without [objection].", type: "text" },
        { id: "proof", label: "Primary Proof Point (1 sentence)", placeholder: "[Client/type of client] achieved [specific metric] in [timeframe].", type: "text" },
        { id: "cta", label: "Call to Action (1 sentence)", placeholder: "e.g., 'Worth a 15-minute call?' or 'Apply for a strategy session' or 'Download [lead magnet]'", type: "text" }
      ]
    },
    {
      id: "measured",
      title: "MEASURED — My Metrics",
      fields: [
        { id: "leading1", label: "Leading Metric 1 (weekly target)", placeholder: "e.g., Cold emails sent: 50/week", type: "text" },
        { id: "leading2", label: "Leading Metric 2 (weekly target)", placeholder: "e.g., Email reply rate: 6%+ / LinkedIn DM replies: 3+/week", type: "text" },
        { id: "leading3", label: "Leading Metric 3 (weekly target)", placeholder: "e.g., Discovery meetings booked: 3+/week", type: "text" },
        { id: "lagging1", label: "Lagging Metric 1 (monthly target)", placeholder: "e.g., New customers: 2/month", type: "text" },
        { id: "lagging2", label: "Lagging Metric 2 (monthly target)", placeholder: "e.g., New MRR: $5K/month by month 3", type: "text" }
      ]
    },
    {
      id: "commitment",
      title: "COMMITMENT — My 90-Day Promise",
      fields: [
        { id: "daily", label: "Daily Activity (weekdays)", placeholder: "e.g., 45 min on cold email: research 5 prospects, send 10 personalized emails. No exceptions Monday-Friday.", type: "text" },
        { id: "weekly", label: "Weekly Activity", placeholder: "e.g., Monday: build 50-prospect list. Wednesday: review reply rates + adjust subject lines. Thursday: hold all discovery calls (minimum 2).", type: "text" },
        { id: "target90", label: "90-Day Total Targets", placeholder: "e.g., 1,800 cold emails sent, 144 replies, 72 discovery calls held, 10 new customers signed, $15K MRR added.", type: "textarea" }
      ]
    }
  ]}
/>

## The Lamination Test

Now read back what you've written. Apply the lamination test to each section:

*"If I printed this page, laminated it, and taped it to my wall — would any section make me wince?"*

A wince indicates: vagueness, dishonesty about your commitment, aspirations mistaken for plans, or specificity you haven't earned yet.

<SwipeDecision
  title="One-Page System Audit"
  description="For each example answer, decide: does it pass the lamination test or does it need a rewrite?"
  optionA="Fails — Too Vague or Aspirational"
  optionB="Passes — Specific and Honest"
  persistKey="playbook-L7-swipe"
  cards={[
    { id: "1", content: "WHO: 'Founders and entrepreneurs who want to grow their business'", correctOption: "a", explanation: "This describes almost everyone with a business. No title, no company type, no size, no specific pain. Rewrite with: [specific title] at [specific company type/size] experiencing [specific quantified pain]." },
    { id: "2", content: "WHO: 'Head of Sales at B2B SaaS companies with 20-100 employees, $1M-$10M ARR, struggling to hit 80%+ quota attainment across their team'", correctOption: "b", explanation: "Specific title, specific company type, specific size range with both headcount and revenue, specific measurable pain. You could find 200 people who fit this description on LinkedIn right now." },
    { id: "3", content: "HOW Primary Channel: 'Cold email and LinkedIn and content and referrals and maybe some paid ads'", correctOption: "a", explanation: "This is a list of channels, not a channel strategy. Listing everything avoids the commitment of choosing. Pick one primary with specific weekly volumes." },
    { id: "4", content: "COMMITMENT Daily: 'Work on sales activities every day and stay consistent'", correctOption: "a", explanation: "'Stay consistent' is not a commitment. It's a hope. A commitment has a specific activity + a specific quantity + a specific time block. Rewrite: 'Send 10 personalized cold emails between 8-9am Monday through Friday.'" },
    { id: "5", content: "COMMITMENT Daily: 'Send 3 personalized Dream 25 outreach messages before 10am, Monday through Friday. No exceptions.'", correctOption: "b", explanation: "Specific activity (personalized Dream 25 messages), specific quantity (3), specific time window (before 10am), specific days (Monday-Friday), explicit commitment ('no exceptions'). This is a real commitment." },
    { id: "6", content: "MEASURED Lagging: '10x my revenue in 90 days'", correctOption: "a", explanation: "This is a goal, not a metric. And it's likely unrealistic, which means it will demoralize you. Real lagging metrics: 'Add $8K MRR in 90 days (from current $12K to $20K target).' Specific, time-bound, grounded in your pipeline math." }
  ]}
/>

## Versioning Your System

Your one-page system is not a finished document — it's version 1.0 of a living system.

<FlipCard
  front="v1.0 → v1.1: 30-Day Update"
  back="After 30 days of execution, you have data. Did your reply rates match your targets? Are your leading metrics improving? Minor adjustments: a better subject line, a refined ICP, updated weekly targets based on what's realistic. v1.1 is data-informed, not gut-informed."
/>

<FlipCard
  front="v1.1 → v1.2: 60-Day Update"
  back="After 60 days, you know if your primary channel is working. If leading indicators are improving, persist and refine (v1.2). If leading indicators are flat or negative, this might warrant a pivot — but consult Lesson 9 before making that call."
/>

<FlipCard
  front="v1.x → v2.0: 90-Day Major Update"
  back="After 90 days, you have 3 monthly data points. v2.0 represents a significant strategic update: possibly a new primary channel, a refined ICP based on who actually converted, updated commitment levels based on what's sustainable, and new targets based on proven performance."
/>

<TemplateBuilder
  title="Version History Log"
  persistKey="playbook-L7-version"
  sections={[
    {
      id: "v10",
      title: "v1.0 — Initial Version",
      fields: [
        { id: "date", label: "Date", placeholder: "Today's date", type: "text" },
        { id: "rationale", label: "Why I Built It This Way", placeholder: "What assumptions are you making? What's your hypothesis for why this channel + ICP combination will work?", type: "textarea" }
      ]
    },
    {
      id: "v11",
      title: "v1.1 — 30-Day Review (fill in after Day 30)",
      fields: [
        { id: "date11", label: "Date", placeholder: "Leave blank — fill in on Day 30", type: "text" },
        { id: "changes", label: "What Changed and Why", placeholder: "What data prompted this update? What stayed the same?", type: "textarea" }
      ]
    },
    {
      id: "v20",
      title: "v2.0 — 90-Day Major Review (fill in after Day 90)",
      fields: [
        { id: "date20", label: "Date", placeholder: "Leave blank — fill in on Day 90", type: "text" },
        { id: "pivots", label: "Major Changes and Strategic Rationale", placeholder: "What did you learn? What pivots did you make? What worked better than expected?", type: "textarea" }
      ]
    }
  ]}
/>

## Sharing Your System

One of the most powerful things you can do with your one-page system: share it with someone who will hold you accountable.

<InsightCard icon="🤝" title="The Accountability Multiplier">
Accountability partners increase goal achievement by 65% (ASTD research). Sharing your one-page system with a peer creates a specific commitment — not to yourself (easy to rationalize away) but to someone else who will ask "how did those 50 cold emails go this week?"
</InsightCard>

<MiniRoleplay
  scenario="You're sharing your one-page system with an accountability partner for the first time. They ask: 'What are you committing to for the next 90 days, and how will I know if you're executing?'"
  role="You (explaining your one-page system)"
  persistKey="playbook-L7-roleplay"
  modelResponse="For the next 90 days, I'm committing to [daily activity with specific number] every weekday. My primary channel is [channel], targeting [ICP]. The metric I'll report to you every [weekly/biweekly] is [leading metric with target]. If I'm hitting [leading metric target] by Week 4, we'll know the system is running. If I'm below [leading metric target] for 3 weeks in a row, I want you to ask me why and push back on my excuses. The only acceptable reason for missing the commitment is [specific exception, e.g., a family emergency] — everything else is a choice I'm making to not do the work."
/>

## The Clarity Reflection

Before finalizing your one-page system, answer these three questions:

<ComparisonBuilder
  title="The Clarity Reflection"
  persistKey="playbook-L7-compare"
  prompt="Write your answer to: 'If I execute this system perfectly for 90 days, here is exactly what will happen and why I believe it'"
  expertExample="If I execute this system perfectly for 90 days:

I will send 900 cold emails (10/day × 5 days × 18 weeks) to [ICP description]. At my projected 7% reply rate, that's 63 replies. At my 50% meeting conversion rate, that's 32 discovery calls. At my 20% close rate, that's 6 new customers. At my $8K ACV, that's $48K in new ARR.

I believe this because: (1) My current reply rate from 50 test emails was 8%, suggesting the message resonates. (2) My discovery call conversion has been 55% from my network outreach. (3) My close rate from the 4 deals I've done is 25%. These are my own data points, not industry averages.

My biggest risk: I don't execute consistently. The math only works if I send 10 emails every weekday. That's my focus."
  criteria={["States specific numbers, not ranges", "Derives from pipeline math, not wishful thinking", "References your own data where possible", "Identifies the most important risk to execution", "Ends with a single focus for the 90 days"]}
/>

<InteractiveChecklist
  title="Your Action Items Before Lesson 8"
  persistKey="playbook-L7-actions"
  items={[
    "Complete the One-Page System template above — every field filled with specific answers",
    "Run every answer through the Lamination Test — rewrite anything that makes you wince",
    "Start your Version History Log with v1.0 and your initial assumptions",
    "Identify your accountability partner and share your one-page system with them this week",
    "Schedule your Day 30 and Day 60 review dates on your calendar right now",
    "Print or screenshot your completed one-page system and put it somewhere you'll see it daily",
    "Write your Clarity Reflection — what will happen if you execute perfectly for 90 days?"
  ]}
/>

## What's Next

In **Lesson 8**, your one-page system becomes a formal commitment. You'll build the 90-Day Commitment Contract — a document with specific activity commitments, a "Will NOT Do" list, accountability mechanisms, and review checkpoints.

The contract formalizes the promise. The one-page system clarifies what you're promising. Together, they form the behavioral backbone of your acquisition system.
