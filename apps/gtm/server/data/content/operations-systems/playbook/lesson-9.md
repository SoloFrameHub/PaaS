---
title: "Quarterly Review & Playbook Updates"
duration: "45 min"
track: "Operations & Systems"
course: "Course 44: The Sales Playbook"
lesson: 9
---

## The Strategy Graveyard

Most sales strategies die not because they were wrong, but because they were never reviewed.

A founder commits to a 90-day outbound plan in January. By March, they've been executing — but the market has shifted, their messaging has gotten stale, their ICP has been refined by data, and their reply rates have drifted down. But they haven't reviewed anything. They're still running the January playbook in March.

Meanwhile, a different founder committed to the same plan in January. By Day 30, she reviewed her input metrics and caught a messaging issue early. By Day 60, she had data showing her primary channel was working but her secondary was wasting time. By Day 90, she had a v2.0 playbook based on 90 days of real-world data instead of 90-day-old assumptions.

The quarterly review is what separates a living playbook from a strategy graveyard.

<InsightCard icon="🔄" title="The Living Playbook Principle">
Your playbook is never done. Version it like software. v1.0 → v1.1 (30-day refinements) → v2.0 (90-day strategic update). The best playbook is not the most sophisticated one — it's the one you're actually using, updating, and executing against right now.
</InsightCard>

## The Premature Pivot Trap

Before learning the review process, understand the most dangerous mistake the review can cause: pivoting too early.

<PredictionGate
  question="How long should you run a consistent acquisition strategy before evaluating whether to pivot it?"
  persistKey="playbook-L9-predict"
  type="choice"
  choices={[
    { id: "a", text: "2-3 weeks — you should see early signals quickly" },
    { id: "b", text: "30 days — one month is enough data" },
    { id: "c", text: "60+ days of consistent execution" },
    { id: "d", text: "6+ months — strategy takes time" }
  ]}
  correctId="c"
>
The 60-day minimum is the critical threshold. Cold email takes 2-4 weeks to show results. LinkedIn content takes 6-8 weeks. Referral systems take 8-12 weeks. Most channels have a "ramp period" where results lag activity — founders who pivot at Week 3 or 4 are abandoning strategies just before they would have worked. 70% of founders who pivot do so prematurely, before 60 days. The rule: 60 days of consistent execution before evaluating whether to change strategy.
</PredictionGate>

<InsightCard icon="⏱️" title="Channel Maturity Timelines">
**Cold email:** 2-4 weeks to see reply patterns, 6-8 weeks to see pipeline patterns

**LinkedIn content:** 4-6 weeks for engagement patterns, 8-12 weeks for lead generation patterns

**Content/SEO:** 8-12 weeks minimum for ranking, 12-16 weeks for consistent traffic

**Referral programs:** 4-6 weeks to establish, 8-12 weeks to see results

**Communities:** 4-8 weeks to establish presence, 8-16 weeks for consistent leads

If you're pivoting before these windows, you're not pivoting based on data — you're pivoting based on impatience.
</InsightCard>

## The Three Checkpoints

<SlideNavigation>
<Slide title="Day 30 Review: The Input Check">

**What you're evaluating:** Your behavior, not your results. At Day 30, it's too early to evaluate outcomes. You're evaluating whether you're executing at the commitment level you promised.

**Key questions:**
1. Did I hit my daily activity commitments on at least 80% of days?
2. Did I send (or create) the volume I committed to?
3. What got in the way? Was it avoidable?
4. Is my commitment realistic given my actual schedule?

**What a pass looks like:** You executed your commitment on 80%+ of days. Leading metrics may not be at target yet — that's okay at Day 30.

**What a fail looks like:** You're executing on fewer than 60% of your commitment days. This is a behavior problem, not a strategy problem. Fix the schedule, remove the distractions, adjust the commitment size — before changing the strategy.

**Version action:** Update to v1.1 only if you're changing your daily schedule or commitment levels. Do NOT change strategy at Day 30.

</Slide>
<Slide title="Day 60 Review: The Output Check">

**What you're evaluating:** Whether consistent activity is producing the leading indicators you projected.

**Key questions:**
1. Are my leading metrics at or trending toward target? (reply rates, meetings, applications)
2. Are there any leading metrics that are significantly underperforming (>30% below target for 4+ weeks)?
3. Have I received any consistent market feedback about my message, ICP, or channel?
4. Is there one variable I could change that would meaningfully improve results?

**What a pass looks like:** Leading metrics are within 70-100% of target and improving week over week. Stay the course with minor refinements.

**What a fail looks like:** Leading metrics are below 50% of target for 4+ consecutive weeks AND your activity levels are at commitment. This suggests a strategy problem, not a behavior problem.

**One-variable rule:** If you need to change something, change exactly ONE variable. Message, channel, or ICP — not more than one simultaneously.

**Version action:** Update to v1.1 or v1.2 based on what you're changing. Document the change and the rationale.

</Slide>
<Slide title="Day 90 Review: The Strategy Check">

**What you're evaluating:** Whether this strategy, executed consistently for 90 days, produced enough signal to justify continuation, refinement, or a strategic pivot.

**Key questions:**
1. Are lagging metrics (customers, revenue) on track with projections?
2. What have I learned about my ICP that I didn't know 90 days ago?
3. What worked better than expected? What worked worse?
4. Does my current strategy have clear ROI, or is it unclear?
5. What would v2.0 look like based on 90 days of real data?

**What a pass looks like:** Clear trajectory toward your lagging metric targets. You know which channels work, which message resonates, and which ICP is buying. You're refining, not pivoting.

**What a fail looks like:** After 90 days of consistent execution, zero or near-zero positive signals. Fundamental mismatch between your assumptions and reality. Time for a strategic pivot — to a new channel, new message, or new ICP.

**Version action:** Full v2.0 update based on everything you learned. Treat v2.0 like a new contract: sign it, share it, execute it.

</Slide>
</SlideNavigation>

## The Pivot vs. Persist Decision Framework

When your Day 60 or Day 90 review suggests something isn't working, use this framework to decide what to change:

<DecisionTree
  title="Pivot or Persist Decision"
  persistKey="playbook-L9-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Day 60 review: your leading metrics are significantly below target. What do you check first?",
      choices: [
        { label: "Are you actually executing at commitment level (80%+ days)?", nextNodeId: "execution" }
      ]
    },
    {
      id: "execution",
      content: "Have you been executing your commitment on 80%+ of days?",
      choices: [
        { label: "No — my execution has been inconsistent", nextNodeId: "behavior" },
        { label: "Yes — I've been consistent", nextNodeId: "data" }
      ]
    },
    {
      id: "behavior",
      content: "❌ Don't pivot yet. Your strategy hasn't failed — your execution has failed. Fix the execution problem first (schedule, distractions, accountability). You can't evaluate a strategy you haven't truly run. Return to this decision tree after 30 more days of consistent execution.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "data",
      content: "You've been consistent. What are your leading indicators showing?",
      choices: [
        { label: "Leading indicators are improving (even slowly)", nextNodeId: "persist" },
        { label: "Leading indicators are flat or declining for 4+ weeks", nextNodeId: "signal" }
      ]
    },
    {
      id: "persist",
      content: "✅ Persist. Even slow improvement is the signal to continue. Channels have ramp periods. If things are directionally correct, stay the course for another 30 days and then reassess.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "signal",
      content: "Flat/declining indicators after 60 days of consistent execution. Have you received ANY positive signal (replies, meetings, interest — even if not converting)?",
      choices: [
        { label: "Yes — some interest, some replies, just not converting", nextNodeId: "pivotmessage" },
        { label: "No — zero positive signals after 60+ days", nextNodeId: "pivoticp" }
      ]
    },
    {
      id: "pivotmessage",
      content: "✅ Pivot the MESSAGE. You're reaching the right people (some interest exists) but something about your angle, proof point, or CTA isn't converting. Change ONLY the message — keep the ICP and channel. Test a new angle, a different proof point, or a different CTA for 30 more days.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "pivoticp",
      content: "⚠️ Zero signals after 60 days suggests a fundamental ICP or channel mismatch. Before pivoting ICP, try ONE thing: change the channel (same message to same ICP, different delivery). If still nothing after 30 days, then pivot the ICP. Never change both simultaneously.",
      isTerminal: true,
      outcome: "neutral"
    }
  ]}
/>

## The One-Variable Pivot Rule

If you decide to change something, change exactly one variable:

<StrategyDuel
  title="Multi-Variable vs. Single-Variable Pivots"
  persistKey="playbook-L9-duel"
  scenario="Your cold email campaign has a 2% reply rate after 60 days of consistent execution. You believe something is wrong. You're considering your options."
  strategyA={{
    name: "Everything Pivot",
    description: "Switch from cold email to LinkedIn, change your ICP from CTOs to VP of Sales, and rewrite your entire message at the same time",
    pros: ["Feels decisive", "Maximum surface area of change", "Might randomly hit on what works"],
    cons: ["You learn nothing — you don't know which change made the difference", "You're betting on luck rather than building knowledge", "If it works, you can't replicate it. If it fails, you're back to zero."]
  }}
  strategyB={{
    name: "One-Variable Pivot",
    description: "Keep LinkedIn engagement and ICP the same. Test only a new message angle for 4 weeks — specifically, change from a product-led message to a problem-led message.",
    pros: ["If reply rate improves, you know the message was the issue", "If it doesn't improve, you have clean data to try the next variable", "Builds systematic knowledge about your market", "Learnings apply to future campaigns"],
    cons: ["Slower to find 'the answer'", "Requires patience", "Might take 2-3 sequential tests to find the issue"]
  }}
  expertVerdict="The one-variable pivot always wins for learning velocity. Changing everything simultaneously is how founders spend 12 months making changes and still not knowing what works. The single-variable approach takes slightly longer per experiment but produces compounding knowledge — each test makes the next test smarter. After 3 sequential single-variable tests, you have a working formula. After 3 multi-variable experiments, you have noise."
/>

## The Quarterly Playbook Review Document

<TemplateBuilder
  title="Quarterly Review Document"
  persistKey="playbook-L9-template"
  sections={[
    {
      id: "day30",
      title: "Day 30 Review — Input Check",
      fields: [
        { id: "execrate", label: "Execution Rate", placeholder: "What % of your committed days did you actually execute? (days executed / days committed × 100)", type: "text" },
        { id: "blockers", label: "What Got in the Way?", placeholder: "List the top 2-3 reasons you missed commitment days. Be specific and honest.", type: "textarea" },
        { id: "adjustment", label: "Commitment Adjustment (if any)", placeholder: "Are you adjusting your daily commitment volume based on realistic scheduling? If yes, what and why?", type: "textarea" },
        { id: "v11changes", label: "v1.1 Changes (if any)", placeholder: "Schedule changes only at Day 30. What are you changing in v1.1?", type: "text" }
      ]
    },
    {
      id: "day60",
      title: "Day 60 Review — Output Check",
      fields: [
        { id: "leadingactual", label: "Leading Metrics: Target vs. Actual", placeholder: "For each leading metric, write: Target [X], Actual [Y], Trend: [improving/flat/declining]", type: "textarea" },
        { id: "signal", label: "Market Signal Received", placeholder: "What are prospects telling you? What objections come up? What language are they using about their problem?", type: "textarea" },
        { id: "onevariable", label: "One Variable to Change (if needed)", placeholder: "If leading metrics are below 50% of target for 4+ weeks: what ONE variable are you changing? Message, channel, or ICP — pick one.", type: "text" },
        { id: "v12changes", label: "v1.2 Changes (if any)", placeholder: "Document the change and your hypothesis for why it will improve results.", type: "textarea" }
      ]
    },
    {
      id: "day90",
      title: "Day 90 Review — Strategy Check",
      fields: [
        { id: "laggingactual", label: "Lagging Metrics: Target vs. Actual", placeholder: "New customers: target [X], actual [Y]. Revenue: target $[X], actual $[Y]. CAC: $[actual].", type: "textarea" },
        { id: "learned", label: "Top 3 Things I Learned About My Market", placeholder: "What do you know now that you didn't know 90 days ago? About your ICP, your message, your channel, your sales process.", type: "textarea" },
        { id: "worked", label: "What Worked Better Than Expected", placeholder: "Specific activities, messages, or approaches that outperformed your projections.", type: "text" },
        { id: "didntwork", label: "What Worked Worse Than Expected", placeholder: "Specific activities, messages, or approaches that underperformed your projections.", type: "text" },
        { id: "v20", label: "v2.0 Strategic Updates", placeholder: "What's changing in v2.0 of your one-page system? New ICP, new primary channel, new message, new metrics? Document all changes and the data behind each decision.", type: "textarea" }
      ]
    }
  ]}
/>

## The Decision Log

Every time you make a strategic decision — to persist, to change the message, to pivot a channel, to adjust your ICP — log it with your reasoning.

The decision log becomes invaluable over time. When you're evaluating your acquisition system a year from now, you'll be able to see not just *what* you tried, but *why* you tried it and what you learned. Founders with decision logs make 40% better strategic choices over 12 months than those who operate from memory.

<TemplateBuilder
  title="Strategic Decision Log"
  persistKey="playbook-L9-decisionlog"
  sections={[
    {
      id: "decision1",
      title: "Decision Entry 1 (your first major strategic decision)",
      fields: [
        { id: "date1", label: "Date", placeholder: "When you made the decision", type: "text" },
        { id: "what1", label: "Decision Made", placeholder: "e.g., 'Pivoted from cold email to LinkedIn content as primary channel'", type: "text" },
        { id: "data1", label: "Data Behind the Decision", placeholder: "e.g., 'Cold email: 2.1% reply rate after 63 days. LinkedIn DMs (tested 2 weeks): 18% reply rate. LinkedIn producing 3x the meetings per hour spent.'", type: "textarea" },
        { id: "hypothesis1", label: "Hypothesis for the New Approach", placeholder: "e.g., 'LinkedIn is a better channel for my ICP because they are active on the platform and respond to warm connection requests. Hypothesis: DM reply rate will sustain at 12%+ and produce 3+ meetings/week.'", type: "textarea" }
      ]
    },
    {
      id: "decision2",
      title: "Decision Entry 2 (fill as they occur)",
      fields: [
        { id: "date2", label: "Date", placeholder: "When you made the decision", type: "text" },
        { id: "what2", label: "Decision Made", placeholder: "Describe the change", type: "text" },
        { id: "data2", label: "Data Behind the Decision", placeholder: "What metrics or signal drove this decision?", type: "textarea" },
        { id: "hypothesis2", label: "Hypothesis for the New Approach", placeholder: "What do you expect to happen and why?", type: "textarea" }
      ]
    }
  ]}
/>

## The Signals Worth Trusting

Not all feedback is equal. Learn to distinguish signal from noise:

<SwipeDecision
  title="Signal vs. Noise in Acquisition Data"
  description="When evaluating your acquisition performance, which signals are worth acting on?"
  optionA="Noise — Don't Act on This"
  optionB="Signal — Worth Analyzing"
  persistKey="playbook-L9-swipe"
  cards={[
    { id: "1", content: "One prospect said 'your pricing is too high' in a single email reply", correctOption: "a", explanation: "One prospect's opinion is anecdote, not data. Wait until 5+ prospects say the same thing in the same way before adjusting pricing." },
    { id: "2", content: "8 out of 12 discovery calls over 6 weeks cited 'we already have a solution for this' as their reason for not moving forward", correctOption: "b", explanation: "A consistent objection appearing in 65%+ of calls is a market signal. Either your ICP has already solved this problem, or your messaging isn't differentiating from existing solutions. Worth adjusting." },
    { id: "3", content: "Your reply rate dropped from 7% to 5% in one week", correctOption: "a", explanation: "One week of data is a blip. Look at rolling 4-week averages, not single-week dips. Email deliverability, day-of-week variance, and sample size all affect single-week numbers." },
    { id: "4", content: "Your reply rate declined from 7% to 4% over a consistent 5-week trend", correctOption: "b", explanation: "A 5-week declining trend is a signal. Something changed: your messaging became stale, your target list quality degraded, or your domain reputation shifted. Worth investigating and adjusting." },
    { id: "5", content: "A friend told you cold email is dead and you should switch to video outreach", correctOption: "a", explanation: "Anecdotal industry commentary is not data about YOUR acquisition system. What matters is your reply rate. If it's above 5%, cold email is working for you regardless of what any article says." },
    { id: "6", content: "Three different ICPs you spoke with all described the problem differently than your messaging assumes", correctOption: "b", explanation: "Consistent market feedback that your problem framing doesn't match how buyers describe the problem is a significant signal. Your message might be technically accurate but emotionally disconnected. Worth a messaging test." }
  ]}
/>

## The Persistence Commitment

Before you finish this lesson, make one final commitment: to give your strategy the full 60-90 days it needs before evaluating it.

<MiniRoleplay
  scenario="It's Week 4 of your 90-day commitment. You've had 3 weeks of cold email with a 4% reply rate (your target is 7%). Your accountability partner asks: 'Are you thinking about switching to LinkedIn instead?'"
  role="You (practicing the right mindset)"
  persistKey="playbook-L9-roleplay"
  modelResponse="No — not yet. Here's my thinking: I've been at this for 4 weeks, which is too early to evaluate the strategy. Cold email has a ramp period. My reply rate is 4%, which is below my 7% target — but I've only been running this for a month, and I haven't tested any subject line or message variations yet. My plan: Run two A/B tests over the next 4 weeks — one testing subject lines, one testing my opening line. I'll re-evaluate at Day 60 with 8 weeks of data. If I'm still at 4% after testing, THEN we'll talk about pivoting. But right now, I need to separate 'this isn't working' from 'this hasn't had enough time to work.'"
/>

<InteractiveChecklist
  title="Your Action Items for This Week"
  persistKey="playbook-L9-actions"
  items={[
    "Schedule all three review dates (Day 30, Day 60, Day 90) as calendar events right now",
    "Start your Strategic Decision Log — even if you haven't made any decisions yet, set up the template",
    "Review your channel's maturity timeline: how long before you should expect to see results?",
    "Identify your leading metric targets and the minimum threshold below which you'll take corrective action",
    "Share the Pivot vs. Persist Decision Framework with your accountability partner so they can help you apply it",
    "Commit explicitly to NOT pivoting before 60 days of consistent execution"
  ]}
/>

## What's Next

In **Lesson 10**, you'll compile everything — your one-page system, your commitment contract, your decision log, and your situation-specific playbook — into your Complete Sales Playbook. You'll also kick off the 14-Day Execution Sprint that gets your playbook into motion immediately.

By the end of Lesson 10, your playbook won't be a document you completed. It will be a system you're running.
