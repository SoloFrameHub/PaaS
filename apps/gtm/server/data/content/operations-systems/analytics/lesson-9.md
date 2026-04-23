---
title: "Weekly Metrics Review Ritual"
duration: "45 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 9
---

## The Friday That Changed Everything

It's 4:47 PM on a Friday. You're exhausted. Your inbox has 47 unread messages. You've been "busy" all week — demos, emails, Slack, support tickets, content creation. But if someone asked you right now: "How many deals moved forward this week?" you'd have to open your CRM and count.

This was Jake's reality for 8 months. He was a solo founder running a $12K MRR dev tools SaaS. He worked 60-hour weeks. He felt productive. But his MRR grew only $800 in those 8 months.

Then his advisor asked him one question: **"What did you learn about your pipeline this week?"**

Jake had no answer. He had data — a CRM full of it — but no insights. No patterns. No decisions.

His advisor gave him homework: **"Every Friday at 4 PM, spend 30 minutes reviewing 5 metrics. Same time, same metrics, same order. Do this for 8 weeks, then we'll talk."**

Jake thought it was too simple to matter. But he committed.

By week 4, he noticed LinkedIn-sourced leads closed 3x faster than cold email leads. By week 6, he saw that deals with 2+ meetings closed at 5x the rate of single-meeting deals. By week 8, he'd killed two low-ROI channels and doubled down on LinkedIn + multi-meeting discovery.

His MRR grew $4,200 in the next 8 weeks. Same hours worked. Different focus.

**The difference?** A 30-minute weekly ritual that turned data into decisions.

---

## Why Most Founders Never Review Their Metrics

<InsightCard icon="🎯" title="The Busy Founder Paradox">
You're too busy executing to review whether your execution is working. So you keep executing the wrong things, which keeps you busy, which prevents you from reviewing. The cycle continues until you run out of runway or burn out.
</InsightCard>

Here's what happens without a metrics review ritual:

1. **Recency Bias** — You remember the last deal you closed and assume that channel/approach is working. You forget the 12 deals that died quietly.
2. **Optimism Inflation** — Every deal in your pipeline feels like it's going to close. You forecast $30K this month. You close $8K. Repeat monthly.
3. **Channel Blindness** — You spend 10 hours/week on content because you "like it," even though it's produced zero pipeline in 6 months. Meanwhile, your 2 hours/week on LinkedIn generated 4 meetings.
4. **Bottleneck Ignorance** — Your MQL→SQL conversion is 8% (industry average: 25%). You don't know this, so you keep adding more MQLs, wondering why meetings aren't increasing.

<FlipCard 
  front="What percentage of sales leaders say they lack the right dashboards?" 
  back="76% (Salesforce, 2024). Even big teams with analysts get this wrong. Solo founders need rituals, not complexity." 
/>

The solution isn't more data. It's **a consistent ritual that forces pattern recognition**.

---

## The 30-Minute Friday Review Framework

<TemplateBuilder
  title="Your Weekly Review Agenda"
  persistKey="analytics-L9-agenda"
  sections={[
    {
      id: "setup",
      title: "Setup (One-Time)",
      fields: [
        { 
          id: "time", 
          label: "Fixed Review Time", 
          placeholder: "e.g., Every Friday at 4:00 PM", 
          type: "text" 
        },
        { 
          id: "location", 
          label: "Review Location", 
          placeholder: "e.g., Coffee shop, home office, park bench", 
          type: "text" 
        },
        { 
          id: "dashboard", 
          label: "Dashboard URL", 
          placeholder: "Link to your Google Sheet, CRM dashboard, or Metabase", 
          type: "text" 
        }
      ]
    },
    {
      id: "agenda",
      title: "The 5-Part Agenda (30 Minutes)",
      fields: [
        { 
          id: "part1", 
          label: "Part 1: Funnel Snapshot (5 min)", 
          placeholder: "How many deals at each stage? What are conversion rates?", 
          type: "textarea" 
        },
        { 
          id: "part2", 
          label: "Part 2: Velocity Check (5 min)", 
          placeholder: "Any deals stuck >2x average stage duration? What's blocking them?", 
          type: "textarea" 
        },
        { 
          id: "part3", 
          label: "Part 3: Forecast Update (5 min)", 
          placeholder: "Commit total? Upside total? Any deals moving between categories?", 
          type: "textarea" 
        },
        { 
          id: "part4", 
          label: "Part 4: Channel Check (5 min)", 
          placeholder: "Which source produced the most meetings this week?", 
          type: "textarea" 
        },
        { 
          id: "part5", 
          label: "Part 5: Action Items (10 min)", 
          placeholder: "3 specific actions for next week based on what you learned", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

### The Rules

1. **Same time, every week.** No exceptions. Treat it like a customer meeting.
2. **Same order, every time.** Your brain will start pattern-matching automatically after 4-6 weeks.
3. **No decisions in the first 3 weeks.** Just observe. Write down what you notice. Don't change anything yet.
4. **The "So What?" test.** For every metric: "So what? What will I do differently?" If the answer is "nothing," stop tracking it.

<ExampleCard label="Jake's Week 4 Review Notes">
**Funnel Snapshot:** 12 MQLs → 3 SQLs (25%) → 2 meetings (67%) → 1 proposal (50%) → 0 wins (0%)

**Velocity Check:** 2 deals stuck in "Proposal Sent" for 18 days (avg is 7 days). Both are $5K+ deals. Need to follow up.

**Forecast:** Commit = $0. Upside = $10K (those 2 stuck proposals). Realistic forecast = $3K (30% of upside).

**Channel Check:** LinkedIn: 2 meetings. Cold email: 0 meetings. Content: 0 meetings.

**So What?** LinkedIn is 100% of my meetings. I'm spending 10 hours/week on content and 2 hours/week on LinkedIn. That's backwards. **Action:** Flip it. 8 hours LinkedIn, 2 hours content.
</ExampleCard>

---

## Part 1: Funnel Snapshot (5 Minutes)

Open your funnel dashboard (from Lesson 2). Answer these questions:

<InteractiveChecklist 
  title="Funnel Snapshot Questions" 
  persistKey="analytics-L9-funnel-questions" 
  items={[
    "How many deals at each stage right now?",
    "What are the conversion rates between stages?",
    "Which conversion rate is below benchmark?",
    "Did any conversion rate improve or decline vs. last week?"
  ]} 
/>

### What You're Looking For

- **Volume trends** — Are you adding enough top-of-funnel? If MQLs are flat or declining, you have an acquisition problem, not a closing problem.
- **Conversion anomalies** — If SQL→Meeting suddenly dropped from 50% to 20%, something broke (messaging? follow-up cadence? ICP drift?).
- **Stage accumulation** — If you have 15 deals in "Proposal Sent" and only 2 in "Meeting Scheduled," you have a closing problem, not a pipeline problem.

<RangeSlider 
  label="How confident are you in your current funnel conversion rates?" 
  min={1} 
  max={10} 
  lowLabel="No idea" 
  highLabel="Very confident" 
  persistKey="analytics-L9-funnel-confidence" 
/>

<InsightCard icon="📊" title="The 4-Week Pattern Rule">
Don't make decisions based on 1 week of data. You need 4 weeks minimum to see patterns. Week 1 might be an outlier. Week 4 confirms a trend.
</InsightCard>

---

## Part 2: Velocity Check (5 Minutes)

Open your velocity tracker (from Lesson 3). Answer these questions:

<InteractiveChecklist 
  title="Velocity Check Questions" 
  persistKey="analytics-L9-velocity-questions" 
  items={[
    "What's the average days-in-stage for each stage?",
    "Are any deals stuck >2x the average for their stage?",
    "What's blocking those stuck deals?",
    "What's the next action to unstick them?"
  ]} 
/>

### The 2x Rule

If a deal has been in a stage for **more than 2x the average**, it's either:
- **Dead** (they ghosted, lost budget, went with a competitor)
- **Blocked** (waiting on legal, budget approval, technical review)
- **Neglected** (you forgot to follow up)

Your job: **identify which, then act**.

<DecisionTree
  title="Stuck Deal Diagnosis"
  persistKey="analytics-L9-stuck-deal-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Deal stuck >2x average. Last contact was >7 days ago. What do you do?", 
      choices: [
        { label: "Send a breakup email", nextNodeId: "breakup" },
        { label: "Call them directly", nextNodeId: "call" },
        { label: "Move to 'Dead' and move on", nextNodeId: "dead" }
      ]
    },
    { 
      id: "breakup", 
      content: "You send: 'Hey [Name], I haven't heard back. Should I assume this isn't a priority right now?' They reply: 'Sorry, got buried. Let's talk next week.' You schedule a call.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "call", 
      content: "You call. Voicemail. You leave a message. No callback. You follow up via email. Still nothing. After 2 weeks, you mark it 'Dead.'", 
      isTerminal: true, 
      outcome: "neutral" 
    },
    { 
      id: "dead", 
      content: "You move it to 'Dead' and focus on active deals. Two weeks later, they email: 'Hey, ready to move forward.' You revive the deal.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

<ExampleCard label="Sarah's Velocity Insight (Week 6)">
Sarah noticed 4 deals stuck in "Proposal Sent" for 14+ days (average was 7 days). She reviewed each:

- **Deal 1:** Sent proposal, no follow-up. She sent a breakup email. They replied same day and scheduled a call.
- **Deal 2:** Waiting on legal review. She asked for a timeline. They said 2 weeks. She set a reminder.
- **Deal 3:** Ghosted. She called. Went to competitor. She marked it "Lost" and moved on.
- **Deal 4:** Budget frozen. She marked it "Dead" but added to nurture list.

**Action:** She created a rule: "If proposal sent >10 days ago, send breakup email." This became part of her Friday ritual.
</ExampleCard>

---

## Part 3: Forecast Update (5 Minutes)

Open your forecast model (from Lesson 4). Answer these questions:

<InteractiveChecklist 
  title="Forecast Update Questions" 
  persistKey="analytics-L9-forecast-questions" 
  items={[
    "What's your Commit forecast total?",
    "What's your Upside forecast total?",
    "Did any deals move from Upside to Commit (or vice versa)?",
    "What's your realistic forecast (Commit + 30% of Upside)?"
  ]} 
/>

### The Weekly Forecast Discipline

Every Friday, review each deal in your pipeline and ask:

**"Would I bet $1,000 of my own money that this deal closes this month?"**

- **Yes** → Commit
- **No** → Upside

This forces honesty. Founders are pathologically optimistic. The $1,000 test neutralizes it.

<ComparisonBuilder
  title="Classify Your Deals: Commit vs. Upside"
  persistKey="analytics-L9-forecast-classify"
  prompt="List your top 5 deals and classify each as Commit or Upside. Explain why."
  expertExample="Deal 1: Acme Corp - $10K. Commit. Verbal yes received, contract sent, timeline confirmed (closes in 7 days). Deal 2: Beta Inc - $5K. Upside. Interest shown, demo done, but no budget confirmation or timeline."
  criteria={[
    "Commit deals have verbal yes + timeline + budget confirmed",
    "Upside deals lack at least one of those three",
    "Realistic forecast = Commit + (Upside × 30%)"
  ]}
/>

<InsightCard icon="🎯" title="Forecast Accuracy Tracking">
After 4-8 weeks, compare your forecast to actual closed revenue. If you're consistently over-forecasting by >30%, lower your Upside multiplier from 30% to 20% or 10%. If you're under-forecasting, raise it to 40%. Calibrate to your reality.
</InsightCard>

---

## Part 4: Channel Check (5 Minutes)

Open your channel attribution tracker (from Lesson 7). Answer these questions:

<InteractiveChecklist 
  title="Channel Check Questions" 
  persistKey="analytics-L9-channel-questions" 
  items={[
    "Which channel produced the most meetings this week?",
    "Which channel produced the most wins this month?",
    "What's the ROI per hour spent on each channel?",
    "Should I kill, maintain, or double down on any channel?"
  ]} 
/>

### The Channel ROI Formula

**ROI per hour = Revenue from channel / (Cost + Time × Hourly Rate)**

Example:
- **LinkedIn:** 4 meetings this month → 1 win → $5K revenue. Time spent: 8 hours/week × 4 weeks = 32 hours. Cost: $0. Hourly rate: $100. ROI = $5,000 / (0 + 3,200) = **$1.56 per dollar spent**.
- **Cold Email:** 2 meetings this month → 0 wins → $0 revenue. Time spent: 4 hours/week × 4 weeks = 16 hours. Cost: $50 (tools). ROI = $0 / (50 + 1,600) = **$0 per dollar spent**.

**Decision:** Kill cold email. Double down on LinkedIn.

<ScenarioSimulator
  title="Channel ROI Calculator"
  persistKey="analytics-L9-channel-roi"
  levers={[
    { id: "meetings", label: "Meetings from channel", min: 0, max: 20, step: 1, defaultValue: 4 },
    { id: "closeRate", label: "Close rate (%)", min: 0, max: 50, step: 5, defaultValue: 25 },
    { id: "dealSize", label: "Average deal size ($)", min: 1000, max: 50000, step: 1000, defaultValue: 5000 },
    { id: "hours", label: "Hours spent/month", min: 0, max: 80, step: 4, defaultValue: 32 },
    { id: "cost", label: "Tool cost/month ($)", min: 0, max: 500, step: 50, defaultValue: 0 },
    { id: "hourlyRate", label: "Your hourly rate ($)", min: 50, max: 300, step: 25, defaultValue: 100 }
  ]}
  outputs={[
    { id: "revenue", label: "Revenue from channel", formula: "(meetings * (closeRate / 100) * dealSize)", unit: "$", precision: 0 },
    { id: "totalCost", label: "Total cost (time + tools)", formula: "(hours * hourlyRate) + cost", unit: "$", precision: 0 },
    { id: "roi", label: "ROI per dollar spent", formula: "(meetings * (closeRate / 100) * dealSize) / ((hours * hourlyRate) + cost)", unit: "", precision: 2 }
  ]}
  insight="At `{roi}` ROI, this channel returns $`{roi}` for every $1 spent. Channels with ROI >1.5 deserve more investment. Channels with ROI &lt;0.5 should be killed or fixed."
/>

<ExampleCard label="Mike's Channel Kill Decision (Week 8)">
Mike tracked 3 channels for 8 weeks:

| Channel | Meetings | Wins | Revenue | Hours | Cost | ROI |
|---------|----------|------|---------|-------|------|-----|
| LinkedIn | 12 | 3 | $15K | 64 | $0 | $2.34 |
| Cold Email | 6 | 0 | $0 | 32 | $200 | $0 |
| Content | 2 | 1 | $5K | 80 | $0 | $0.63 |

**Decision:** Kill cold email (zero ROI). Maintain content (positive ROI but slow). Double down on LinkedIn (highest ROI). He shifted from 8 hours/week content + 8 hours/week LinkedIn to 4 hours/week content + 12 hours/week LinkedIn.

**Result:** Meetings increased from 3/week to 5/week within 4 weeks.
</ExampleCard>

---

## Part 5: Action Items (10 Minutes)

This is where insights become execution. Based on Parts 1-4, identify **3 specific actions for next week**.

<TemplateBuilder
  title="Your Weekly Action Items"
  persistKey="analytics-L9-actions"
  sections={[
    {
      id: "actions",
      title: "3 Actions for Next Week",
      fields: [
        { 
          id: "action1", 
          label: "Action 1 (Based on Funnel, Velocity, Forecast, or Channel)", 
          placeholder: "e.g., Send breakup emails to 3 stuck deals in Proposal stage", 
          type: "textarea" 
        },
        { 
          id: "action2", 
          label: "Action 2", 
          placeholder: "e.g., Spend 12 hours on LinkedIn (up from 8) and 4 on content (down from 8)", 
          type: "textarea" 
        },
        { 
          id: "action3", 
          label: "Action 3", 
          placeholder: "e.g., Test a new LinkedIn DM opener with 10 prospects", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "evidence",
      title: "Evidence Commitment",
      fields: [
        { 
          id: "evidence", 
          label: "How will you prove you did these actions next Friday?", 
          placeholder: "e.g., Screenshot of sent emails, CRM activity log, time tracking data", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

### The Action Item Rules

1. **Specific, not vague.** "Improve conversion" is vague. "Send breakup emails to 3 stuck deals" is specific.
2. **Measurable.** You should be able to prove you did it next Friday.
3. **Based on data.** Every action should trace back to something you noticed in Parts 1-4.
4. **Max 3 actions.** More than 3 = you won't do any of them.

<InsightCard icon="🎯" title="The Accountability Hack">
Share your 3 action items with someone every Friday. An accountability partner, a mentor, a founder community. The act of reporting creates discipline. Jake texted his 3 actions to his advisor every Friday. That simple act increased his follow-through rate from 40% to 85%.
</InsightCard>

---

## The Monthly Deep Dive (First Friday of Each Month)

Once a month, extend your Friday review from 30 minutes to 60 minutes. Add these sections:

<ProgressiveReveal title="Monthly Deep Dive Sections" persistKey="analytics-L9-monthly-reveal">

<RevealSection title="1. Unit Economics Review (10 min)">
Pull up your unit economics calculator (Lesson 5). Answer:

- What's my CAC by channel this month?
- What's my LTV (ARPU / churn rate)?
- What's my LTV:CAC ratio?
- What's my payback period?
- Are any of these trending in the wrong direction?

**Action:** If CAC is rising or LTV is falling, investigate why. If payback period is >3 months (bootstrapped) or >9 months (funded), you have a problem.
</RevealSection>

<RevealSection title="2. MRR Waterfall Review (10 min)">
Pull up your MRR waterfall (Lesson 6). Answer:

- How much New MRR did I add?
- How much Expansion MRR?
- How much Churned MRR?
- What's my Net Revenue Retention (NRR)?
- Is NRR trending up or down?

**Action:** If NRR &lt;100%, you're shrinking. Investigate churn causes. If NRR >110%, you're expanding well — double down on what's driving expansion.
</RevealSection>

<RevealSection title="3. Channel Deep Dive (10 min)">
Pull up your channel attribution tracker (Lesson 7). Answer:

- Which channel has the highest close rate?
- Which channel has the lowest CAC?
- Which channel has the fastest velocity (shortest sales cycle)?
- Are there any channels I should kill or double down on?

**Action:** Kill channels with ROI &lt;0.5. Double down on channels with ROI >1.5.
</RevealSection>

</ProgressiveReveal>

---

## Pattern Recognition: What to Look for After 4-8 Weeks

After 4-8 weeks of consistent Friday reviews, you'll start seeing patterns. Here's what to watch for:

<ClassifyExercise
  title="Classify These Patterns: Actionable or Noise?"
  persistKey="analytics-L9-patterns"
  categories={[
    { id: "actionable", label: "Actionable Pattern", color: "#10b981" },
    { id: "noise", label: "Random Noise", color: "#6b7280" }
  ]}
  items={[
    { 
      id: "1", 
      content: "LinkedIn-sourced deals close in 18 days on average. Cold email deals take 42 days.", 
      correctCategory: "actionable",
      explanation: "This is a velocity pattern. Action: prioritize LinkedIn over cold email."
    },
    { 
      id: "2", 
      content: "You closed 2 deals on Tuesday and 1 on Thursday this week.", 
      correctCategory: "noise",
      explanation: "One week of day-of-week data is noise. Need 8+ weeks to see a pattern."
    },
    { 
      id: "3", 
      content: "Deals with 2+ meetings close at 5x the rate of single-meeting deals (tracked over 6 weeks).", 
      correctCategory: "actionable",
      explanation: "This is a conversion pattern. Action: push for second meetings in discovery."
    },
    { 
      id: "4", 
      content: "Your SQL→Meeting conversion dropped from 50% to 20% over 4 weeks.", 
      correctCategory: "actionable",
      explanation: "This is a bottleneck. Action: investigate messaging, follow-up, or ICP drift."
    },
    { 
      id: "5", 
      content: "You had a great week with 5 meetings. Last week you had 2.", 
      correctCategory: "noise",
      explanation: "Week-to-week variance is normal. Look at 4-week rolling averages."
    }
  ]}
/>

### The 4 Patterns That Matter Most

1. **Channel velocity differences** — Some channels close faster. Prioritize them.
2. **Multi-touch conversion lift** — Deals with more touchpoints close at higher rates. Engineer more touchpoints.
3. **Stage bottlenecks** — One stage has consistently low conversion. Fix that stage.
4. **Time-to-contact correlation** — Faster response times correlate with higher close rates. Automate first response.

---

## The Accountability Mechanism

Metrics reviews only work if you actually do them. Here's how to make it stick:

<StrategyDuel
  title="Solo Review vs. Accountability Partner"
  persistKey="analytics-L9-accountability-duel"
  scenario="You want to make your Friday review ritual stick. Which approach is more effective?"
  strategyA={{ 
    name: "Solo Review", 
    description: "Review metrics alone every Friday. No external accountability.", 
    pros: ["No scheduling required", "Total privacy", "Flexible timing"], 
    cons: ["Easy to skip", "No external perspective", "No commitment pressure"] 
  }}
  strategyB={{ 
    name: "Accountability Partner", 
    description: "Text or email your 3 action items to someone every Friday. They check in next Friday.", 
    pros: ["Commitment pressure", "External perspective", "85% follow-through rate"], 
    cons: ["Requires finding a partner", "Scheduling coordination"] 
  }}
  expertVerdict="Accountability partner wins. A Dominican University study found that written accountability increases goal achievement by 42%. Jake's follow-through went from 40% (solo) to 85% (texting his advisor). Find a founder peer, mentor, or community and commit to weekly check-ins."
/>

### How to Find an Accountability Partner

1. **Founder communities** — YC Startup School, Indie Hackers, MicroConf Slack, Trends.vc
2. **Peer founders** — Reach out to 3 founders at similar stage. Propose weekly metric swaps.
3. **Mentors/advisors** — If you have one, ask them to receive your weekly metrics.
4. **Paid accountability** — Services like Focusmate or Coach.me (optional, $10-50/month)

<InteractiveChecklist 
  title="Accountability Setup Checklist" 
  persistKey="analytics-L9-accountability-setup" 
  items={[
    "Identify 1-3 potential accountability partners",
    "Reach out with a specific proposal: 'Can we swap weekly metrics every Friday?'",
    "Set a recurring calendar event for Friday reviews",
    "Create a shared doc or Slack channel for weekly updates",
    "Commit to 8 weeks minimum before evaluating effectiveness"
  ]} 
/>

---

## Common Mistakes (And How to Avoid Them)

<FlipCard 
  front="Mistake 1: Reviewing metrics only when things feel bad" 
  back="This creates panic-driven decisions. Review every Friday, good weeks and bad weeks. Consistency reveals patterns that panic obscures." 
/>

<FlipCard 
  front="Mistake 2: Tracking too many metrics" 
  back="More metrics = more noise. Stick to the 5-metric starter dashboard: Prospects added, Meetings booked, Pipeline value, Win rate, Revenue. Add metrics only when you have a specific decision to make." 
/>

<FlipCard 
  front="Mistake 3: Making decisions on 1-2 weeks of data" 
  back="Week-to-week variance is normal. You need 4 weeks minimum to see patterns. Observe for 3 weeks, then act in week 4." 
/>

<FlipCard 
  front="Mistake 4: Reviewing metrics but not taking action" 
  back="Metrics without action items are vanity. Every Friday review must end with 3 specific actions for next week. If you can't identify 3 actions, your metrics aren't answering the right questions." 
/>

<FlipCard 
  front="Mistake 5: Skipping reviews when you're 'too busy'" 
  back="The busier you are, the more you need the review. Jake's busiest weeks were when he needed metrics most — they revealed he was busy on the wrong things." 
/>

---

## Your First 8-Week Metrics Review Sprint

Here's your implementation plan:

<SlideNavigation>

<Slide title="Week 1: Setup">
**Goal:** Establish the ritual, don't make decisions yet.

- [ ] Choose your fixed review time (e.g., Friday 4 PM)
- [ ] Open your dashboard (from Lesson 8)
- [ ] Complete your first review using the 5-part agenda
- [ ] Write down 3 observations (not actions)
- [ ] Text your observations to an accountability partner

**Time:** 30 minutes
</Slide>

<Slide title="Weeks 2-3: Observe">
**Goal:** Build the habit, collect baseline data.

- [ ] Repeat the Friday review at the same time
- [ ] Track your 5 core metrics
- [ ] Write down patterns you notice
- [ ] Don't change anything yet — just observe

**Time:** 30 minutes/week
</Slide>

<Slide title="Week 4: First Actions">
**Goal:** Identify your #1 bottleneck and take action.

- [ ] Review 4 weeks of data
- [ ] Identify your biggest bottleneck (funnel stage, channel, velocity)
- [ ] Define 3 specific actions to address it
- [ ] Share actions with accountability partner
- [ ] Execute actions in Week 5

**Time:** 45 minutes (extended review)
</Slide>

<Slide title="Weeks 5-7: Iterate">
**Goal:** Execute, measure, adjust.

- [ ] Continue Friday reviews
- [ ] Track whether your Week 4 actions improved metrics
- [ ] Adjust actions based on results
- [ ] Add 1-2 new experiments per week

**Time:** 30 minutes/week
</Slide>

<Slide title="Week 8: First Monthly Deep Dive">
**Goal:** Comprehensive review + calibration.

- [ ] Complete the 60-minute monthly deep dive
- [ ] Review unit economics, MRR waterfall, channel ROI
- [ ] Calibrate your forecast probabilities based on 8 weeks of data
- [ ] Identify 1-2 strategic shifts for next 8 weeks
- [ ] Share results with accountability partner

**Time:** 60 minutes
</Slide>

</SlideNavigation>

---

## Real Founder Results: 8 Weeks of Friday Reviews

<ExampleCard label="Case Study: Emma's Channel Pivot">
**Context:** Emma ran a $8K MRR coaching business. She spent 12 hours/week creating content, 4 hours/week on LinkedIn, 2 hours/week on email outreach.

**Week 1-3 Observations:**
- Content: 0 meetings
- LinkedIn: 3 meetings
- Email: 1 meeting

**Week 4 Action:** Flip time allocation. 8 hours LinkedIn, 4 hours content, 2 hours email.

**Week 5-8 Results:**
- LinkedIn: 6 meetings/week (up from 1/week)
- Content: 1 meeting/week (same as before, but in 1/3 the time)
- Email: 0 meetings (killed it)

**Outcome:** MRR grew from $8K to $14K in 8 weeks. Same total hours worked. Different focus.
</ExampleCard>

<ExampleCard label="Case Study: David's Velocity Fix">
**Context:** David ran a $15K MRR dev tools SaaS. His average sales cycle was 52 days (industry benchmark: 30-45 days).

**Week 1-3 Observations:**
- Deals stuck in "Proposal Sent" for 21 days on average (benchmark: 7 days)
- No systematic follow-up after proposal sent

**Week 4 Action:** Create a proposal follow-up sequence: Day 2 (check-in), Day 5 (case study), Day 10 (breakup email).

**Week 5-8 Results:**
- Average proposal-to-close time dropped from 21 days to 9 days
- Close rate increased from 20% to 35%
- Sales cycle dropped from 52 days to 38 days

**Outcome:** Pipeline velocity increased 37%. Same number of deals, faster closes, more revenue.
</ExampleCard>

---

## Your Weekly Review Template (Copy This)

Here's a template you can copy into a Google Doc or Notion page:

```
# Weekly Metrics Review — [Date]

## Part 1: Funnel Snapshot (5 min)
- MQLs: [X]
- SQLs: [X] (conversion: X%)
- Meetings: [X] (conversion: X%)
- Proposals: [X] (conversion: X%)
- Wins: [X] (conversion: X%)
- **Observation:** [What stands out?]

## Part 2: Velocity Check (5 min)
- Average days per stage: [X]
- Deals stuck >2x average: [X]
- **Action needed:** [What will I do to unstick them?]

## Part 3: Forecast Update (5 min)
- Commit: $[X]
- Upside: $[X]
- Realistic forecast: $[X] (Commit + 30% of Upside)
- **Changes:** [Any deals moved between Commit/Upside?]

## Part 4: Channel Check (5 min)
- LinkedIn: [X] meetings
- Cold Email: [X] meetings
- Content: [X] meetings
- Referral: [X] meetings
- **Highest ROI channel:** [X]

## Part 5: Action Items (10 min)
1. [Action 1]
2. [Action 2]
3. [Action 3]

**Evidence commitment:** [How will I prove I did these next Friday?]

---

**Shared with:** [Accountability partner name]
**Next review:** [Date/time]
```

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can automate parts of this review. Build a script that pulls data from your CRM API and auto-generates the funnel snapshot, velocity check, and forecast sections. Then you just review the output and write action items. This reduces review time from 30 minutes to 15 minutes.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches/Consultants">
Your "pipeline" might be discovery calls, proposals, and retainer agreements instead of MQLs/SQLs. The framework is the same — just adapt the stage names. Track: Leads → Discovery Calls → Proposals → Retainers.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Creators">
Your "funnel" might be audience → email list → product launch → sales. Track: New followers, Email signups, Launch attendees, Sales. The Friday review ritual still applies — just with creator-specific metrics.
</ContextualNote>

---

## Summary: The Friday Review Ritual

<InteractiveChecklist 
  title="Your Weekly Review Ritual Checklist" 
  persistKey="analytics-L9-summary" 
  items={[
    "Set a fixed review time (same time every Friday)",
    "Complete the 5-part agenda: Funnel, Velocity, Forecast, Channel, Actions",
    "Identify 3 specific actions for next week",
    "Share your actions with an accountability partner",
    "Execute actions during the week",
    "Repeat next Friday (no exceptions)",
    "After 4 weeks, make your first data-driven decision",
    "After 8 weeks, complete your first monthly deep dive"
  ]} 
/>

**The Bottom Line:** Metrics without a review ritual are vanity. A 30-minute Friday review turns data into decisions, decisions into actions, and actions into revenue growth.

Jake went from $800 MRR growth in 8 months (no review ritual) to $4,200 MRR growth in 8 weeks (with review ritual). Same hours worked. Different focus.

**Your turn.** Set your first Friday review for this week. Right now. Add it to your calendar. Then show up and do it.

---

## Next Lesson Preview

In Lesson 10, you'll build your complete **Analytics Playbook** — a 7-day sprint to implement everything from Lessons 1-9. You'll set up your dashboard, run your first Friday review, and create a 90-day metrics improvement plan.

But first: **schedule your first Friday review**. Pick a time. Add it to your calendar. Tell someone you're doing it.

The ritual starts now.