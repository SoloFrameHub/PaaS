---
title: "Time Management: CS in 5-7 Hours/Week"
duration: "45 min"
track: "Customer Success"
course: "Course 36: Customer Onboarding"
lesson: 9
---

## The 3am Support Ticket

It's 3:17am. Your phone buzzes. A customer can't log in. You groggily send a password reset link, then lie awake for 45 minutes thinking about all the other customers who might be stuck right now.

By morning, you've answered 4 more questions. By noon, you've spent 90 minutes on a single onboarding call that should have taken 15. By 5pm, you realize you haven't touched acquisition work all day.

**This is the solo founder CS trap**: You care deeply about customer success, so you make yourself available 24/7. But availability without boundaries doesn't scale. It burns you out and ironically makes you *less* effective at helping customers succeed.

The solution isn't caring less. It's **designing a CS system that delivers exceptional outcomes in 5-7 hours per week**.

<InsightCard icon="⏰" title="The Time Budget Reality">
Solo founders have roughly 25-30 productive hours per week after meetings, admin, and life. If CS consumes more than 20-25% of that (5-7 hours), acquisition and product work suffer. The business stalls.
</InsightCard>

---

## The Weekly CS Time Budget

Most solo founders spend 8-15 hours per week on reactive customer support without systems. That's **30-50% of productive time** just keeping customers afloat.

Here's the target allocation for a sustainable 5-7 hour CS week:

| Activity | Weekly Time | % of CS Budget | What It Covers |
|----------|-------------|----------------|----------------|
| **Onboarding** | 1-2 hours | 30% | New customer welcome, stalled user intervention, first-value nudges |
| **Retention** | 2-3 hours | 40% | At-risk outreach, check-in emails, NPS review, churn prevention |
| **Expansion** | 1-2 hours | 30% | Upsell conversations, feature adoption, renewal prep |
| **Total** | 5-7 hours | 100% | Everything else gets automated or deflected |

<RangeSlider 
  label="How many hours per week do you currently spend on CS activities?" 
  min={0} 
  max={20} 
  lowLabel="0 hrs" 
  highLabel="20+ hrs" 
  persistKey="onboarding-L9-current-hours" 
/>

**The brutal truth**: If you're spending more than 7 hours/week on CS and have fewer than 100 customers, you don't have a volume problem. You have a **systems problem**.

---

## The Three CS Time Blocks

Instead of reacting to support requests all day, batch all CS work into **three focused blocks per week**. This is the single most effective time management shift for solo founders.

<SlideNavigation>
<Slide title="Block 1: Monday Morning Scan (90 min)">

**When:** Monday, 9:00-10:30am (or first thing your work week)

**What you do:**
1. **New Signups Review (10 min)** — Check signups from the last 48 hours. Any high-value customers who need a personal welcome email?
2. **Stalled Onboarding Triage (20 min)** — Review automation flags for users who haven't hit first value. Send intervention emails to top 3-5.
3. **Support Ticket Triage (15 min)** — Categorize tickets: (a) Can be answered by docs → send link, (b) Needs personal response → batch for later, (c) Urgent blocker → handle now.
4. **NPS Detractor Outreach (20 min)** — Any 0-6 NPS scores from the last week? Personal email to each within 24 hours.
5. **Weekly CS Plan (15 min)** — Identify top 3 CS priorities for the week. Schedule them into Blocks 2 and 3.
6. **Buffer (10 min)** — Catch overflow or urgent items.

**Output:** Triage complete, top priorities identified, urgent fires handled.

</Slide>

<Slide title="Block 2: Wednesday Execution (90 min)">

**When:** Wednesday, 2:00-3:30pm (mid-week momentum)

**What you do:**
1. **Onboarding Calls (45 min)** — 3x 15-minute calls with new customers (batched via Calendly). Use the script from Lesson 6.
2. **Check-In Emails (20 min)** — Send Day 45 personal emails to customers approaching renewal window. Use template, personalize 1-2 sentences.
3. **Feature Adoption Nudges (15 min)** — Review usage data. Send "Have you tried X?" emails to customers stuck on basic features.
4. **Buffer (10 min)** — Overflow or follow-ups.

**Output:** High-touch activities complete, relationships strengthened.

</Slide>

<Slide title="Block 3: Friday Review & Expansion (60-90 min)">

**When:** Friday, 4:00-5:30pm (end-of-week wrap)

**What you do:**
1. **At-Risk Customer Outreach (30 min)** — Any customers flagged by automation as low-engagement or approaching churn? Personal outreach.
2. **Expansion Conversations (20 min)** — Identify 2-3 customers ready for upsell/add-on. Send expansion offer or schedule call.
3. **Weekly CS Metrics Review (15 min)** — Check: new signups, TTFV, NPS, churn rate, support ticket volume. Note trends.
4. **Next Week Prep (10 min)** — Flag anything that needs attention Monday. Clear your CS inbox mentally.
5. **Buffer (15 min)** — Catch-up or early finish.

**Output:** Week closed out, expansion pipeline moving, metrics reviewed.

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Set Up Your CS Time Blocks" 
  persistKey="onboarding-L9-time-blocks" 
  items={[
    "Block out 90 minutes on Monday for CS Morning Scan",
    "Block out 90 minutes on Wednesday for Execution Block",
    "Block out 60-90 minutes on Friday for Review & Expansion",
    "Add 'CS Block — Do Not Schedule' to your calendar",
    "Set Slack/email to 'Do Not Disturb' during blocks"
  ]} 
/>

---

## The 30-Minute Morning Scan (Deep Dive)

The Monday Morning Scan is your **CS command center**. It's where you triage the entire week in 90 minutes. Here's the exact workflow:

### Step 1: New Signups (10 minutes)

**Tool:** Your CRM, Stripe dashboard, or signup notification Slack channel

**Process:**
1. Pull list of signups from last 48 hours
2. Sort by plan tier (highest ARPU first)
3. For top 20% by revenue:
   - Send personal welcome email (template + 1-2 custom sentences)
   - Flag for onboarding call if >$200/mo ARPU
4. For remaining 80%:
   - Confirm automated welcome sequence triggered
   - Move on

**Time saved:** Automation handles 80%, you personalize the 20% that matters most.

### Step 2: Stalled Onboarding Triage (20 minutes)

**Tool:** Your automation dashboard (Zapier, Make, or manual spreadsheet)

**Process:**
1. Review "stalled user" flags (no login in 5 days, or no first-value milestone hit by Day 7)
2. Sort by: (a) Plan tier, (b) Days since signup
3. Top 3-5 stalled users:
   - Send personalized "Need help?" email
   - Offer specific next step (not generic "let us know")
4. Remaining stalled users:
   - Automated nudge email already sent
   - Flag for follow-up next week if still stalled

**Decision tree:**

<DecisionTree
  title="Stalled User Intervention"
  persistKey="onboarding-L9-stalled-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "User hasn't logged in for 5 days. What do you do?",
      choices: [
        { label: "Send automated re-engagement email", nextNodeId: "automated" },
        { label: "Send personal 'Need help?' email", nextNodeId: "personal" },
        { label: "Wait another 3 days", nextNodeId: "wait" }
      ]
    },
    {
      id: "automated",
      content: "Good for &lt;$100/mo users. But if they're >$200/mo, you should personalize.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "personal",
      content: "Correct for high-value users. 15-25% respond and re-engage.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "wait",
      content: "By Day 10 with no login, recovery rate drops to &lt;5%. Act now.",
      isTerminal: true,
      outcome: "negative"
    }
  ]}
/>

### Step 3: Support Ticket Triage (15 minutes)

**Tool:** Email, Intercom, or support ticket system

**Process:**
1. Categorize each ticket:
   - **Tier 1 (Doc-able):** "How do I reset my password?" → Send link to docs, close ticket
   - **Tier 2 (Batch-able):** "Can you explain feature X?" → Add to batch response list, handle in Block 2
   - **Tier 3 (Urgent):** "I can't access my account" → Handle immediately
2. Respond to all Tier 1 tickets (5 min)
3. Flag Tier 2 for Wednesday block
4. Handle Tier 3 now (if any)

**Goal:** 60-70% of tickets resolved in &lt;2 minutes via docs or templates.

<ExampleCard label="Real Example: The FAQ Deflection">
Sarah, a course creator, was spending 6 hours/week answering the same 10 questions via email. She built a 15-question FAQ page with Loom video walkthroughs for each.

**Result:** Support volume dropped 65%. Time spent on support: 2 hours/week. She now spends the saved 4 hours on content creation and acquisition.
</ExampleCard>

### Step 4: NPS Detractor Outreach (20 minutes)

**Tool:** Typeform, Delighted, or Google Forms responses

**Process:**
1. Review NPS responses from last 7 days
2. Any 0-6 scores? → **Personal email within 24 hours**
3. Template: "Hi [Name], I saw your feedback. I'm sorry we fell short. Can you tell me more about [specific issue they mentioned]? I'd like to make this right."
4. If they respond → troubleshoot live or schedule call
5. If they don't respond → flag for follow-up in 3 days

**Why this matters:** 68% of customers leave because they feel the company doesn't care. A personal response to a detractor can recover 15-25% of at-risk customers.

### Step 5: Weekly CS Plan (15 minutes)

**Tool:** Notion, Google Doc, or paper notepad

**Process:**
1. Review metrics: signups, TTFV, NPS, churn, support volume
2. Identify top 3 CS priorities for the week:
   - Example: "5 stalled users need intervention," "2 high-value customers approaching renewal," "Support ticket volume spiked — need new FAQ entry"
3. Assign each priority to Block 2 or Block 3
4. Write down your "CS win condition" for the week (e.g., "Get 3 stalled users to first value")

<TemplateBuilder
  title="Your Weekly CS Plan"
  persistKey="onboarding-L9-weekly-plan"
  sections={[
    {
      id: "metrics",
      title: "This Week's Metrics",
      fields: [
        { id: "signups", label: "New signups", placeholder: "e.g., 12", type: "text" },
        { id: "ttfv", label: "Avg TTFV (hours)", placeholder: "e.g., 18", type: "text" },
        { id: "nps", label: "NPS score", placeholder: "e.g., 42", type: "text" },
        { id: "churn", label: "Churn count", placeholder: "e.g., 2", type: "text" }
      ]
    },
    {
      id: "priorities",
      title: "Top 3 CS Priorities",
      fields: [
        { id: "p1", label: "Priority 1", placeholder: "e.g., Intervene with 5 stalled users", type: "text" },
        { id: "p2", label: "Priority 2", placeholder: "e.g., Outreach to 2 at-risk renewals", type: "text" },
        { id: "p3", label: "Priority 3", placeholder: "e.g., Build FAQ for top support question", type: "text" }
      ]
    },
    {
      id: "win",
      title: "CS Win Condition",
      fields: [
        { id: "goal", label: "What does success look like this week?", placeholder: "e.g., 3 stalled users hit first value", type: "textarea" }
      ]
    }
  ]}
/>

---

## Deflecting Low-Value Support

The fastest way to reclaim CS time is to **stop answering the same questions manually**.

### The 60/70 Rule

**60-70% of support questions can be answered by self-service resources** (FAQ, docs, video walkthroughs). Your job is to build those resources once, then point people to them.

<FlipCard 
  front="What's the ROI of building a FAQ?" 
  back="If you answer the same question 5 times at 10 min each, that's 50 min. A 15-min Loom video + FAQ entry saves 35 min the first week, then 50 min every week after. 10x ROI in month 1." 
/>

### The Support Deflection Stack (Budget: $0-30/mo)

| Tool | Function | Pricing | Solo Fit |
|------|----------|---------|----------|
| **Notion** | Knowledge base + FAQ | Free | High — recommended |
| **Loom** | Video walkthroughs | Free (25 videos) / $8/mo | High |
| **Tango** | Auto-generate step-by-step guides with screenshots | Free (unlimited) | High |
| **Intercom** | In-app help widget + articles | $39/mo | Medium |
| **HelpScout Docs** | Customer-facing knowledge base | Free (Beacon only) | High |

### The 3-Step Deflection Build

1. **Identify your top 10 support questions** — Review last 30 days of tickets/emails. What gets asked repeatedly?
2. **Create a resource for each** — Loom video (3-5 min) or Tango guide (step-by-step screenshots). Host in Notion or HelpScout.
3. **Template your responses** — "Great question! Here's a quick walkthrough: [link]. Let me know if you need anything else."

<InteractiveChecklist 
  title="Build Your Support Deflection System" 
  persistKey="onboarding-L9-deflection" 
  items={[
    "Review last 30 days of support questions",
    "Identify top 10 most-asked questions",
    "Create Loom or Tango guide for each",
    "Build a simple FAQ page in Notion or Google Doc",
    "Create email templates linking to each resource",
    "Add FAQ link to email signature and automated responses"
  ]} 
/>

<ExampleCard label="Case Study: The 4-Hour Support Week">
Jake runs a $15K/mo SaaS with 80 customers. He was spending 10 hours/week on support, mostly answering "How do I connect X?" and "Where's the export button?"

**What he built:**
- 12-question FAQ page in Notion
- 8 Loom videos (3-5 min each) embedded in FAQ
- Email template: "Thanks for reaching out! I made a quick video on this: [link]"

**Result:**
- Support volume dropped 70%
- Time on support: 3-4 hours/week
- Customer satisfaction *increased* (they liked the video walkthroughs better than text explanations)
- Saved time went to acquisition → 15% MRR growth in 2 months
</ExampleCard>

---

## Triage by Impact: The CS Priority Matrix

Not all CS activities have equal ROI. When time is scarce, **focus on the highest-impact activities first**.

### The CS Impact Matrix

<SlideNavigation>
<Slide title="High Impact, High Urgency">

**Activities:**
- Stalled high-value customer (>$200/mo) intervention
- NPS detractor outreach (0-6 score)
- At-risk customer approaching churn
- Urgent blocker preventing customer from using product

**Time allocation:** Handle immediately or in next CS block

**Why it matters:** These are revenue-protection activities. A single saved $500/mo customer pays for 10 hours of CS work.

</Slide>

<Slide title="High Impact, Low Urgency">

**Activities:**
- Building FAQ/knowledge base
- Onboarding automation improvements
- Expansion conversations with happy customers
- Creating Loom walkthroughs for common questions

**Time allocation:** Schedule in Block 3 (Friday) or as a monthly project

**Why it matters:** These are force-multipliers. One-time investment, ongoing time savings.

</Slide>

<Slide title="Low Impact, High Urgency">

**Activities:**
- One-off support questions that could be answered by docs
- Feature requests from low-ARPU customers
- "Nice-to-have" product tweaks

**Time allocation:** Deflect to docs, batch for later, or politely decline

**Why it matters:** These feel urgent but don't move the needle. Protect your time.

</Slide>

<Slide title="Low Impact, Low Urgency">

**Activities:**
- Perfecting email templates
- Over-optimizing onboarding flows before you have data
- Responding to every customer question within 5 minutes

**Time allocation:** Don't do these. Seriously.

**Why it matters:** Solo founders often hide in low-impact work because it feels productive. It's not.

</Slide>
</SlideNavigation>

<ClassifyExercise
  title="Classify These CS Activities"
  persistKey="onboarding-L9-classify"
  categories={[
    { id: "high-urgent", label: "High Impact, High Urgency", color: "#ef4444" },
    { id: "high-not", label: "High Impact, Low Urgency", color: "#f59e0b" },
    { id: "low-urgent", label: "Low Impact, High Urgency", color: "#3b82f6" },
    { id: "low-not", label: "Low Impact, Low Urgency", color: "#6b7280" }
  ]}
  items={[
    { 
      id: "1", 
      content: "A $500/mo customer hasn't logged in for 10 days", 
      correctCategory: "high-urgent",
      explanation: "High-value customer at risk of churn. Immediate intervention needed."
    },
    { 
      id: "2", 
      content: "Building a Loom video for 'How to export data' (asked 8 times this month)", 
      correctCategory: "high-not",
      explanation: "High ROI (saves future time) but not urgent. Schedule for Friday block."
    },
    { 
      id: "3", 
      content: "A $29/mo customer asks 'Can you add dark mode?'", 
      correctCategory: "low-urgent",
      explanation: "Feels urgent (customer waiting) but low impact. Politely add to feature backlog."
    },
    { 
      id: "4", 
      content: "Rewriting your welcome email for the 5th time", 
      correctCategory: "low-not",
      explanation: "Low impact, not urgent. You're procrastinating. Stop."
    },
    { 
      id: "5", 
      content: "A customer gave you a 3 NPS score with feedback: 'Too complicated'", 
      correctCategory: "high-urgent",
      explanation: "Detractor feedback is a leading indicator of churn. Respond within 24 hours."
    },
    { 
      id: "6", 
      content: "Setting up Zapier automation to flag stalled users", 
      correctCategory: "high-not",
      explanation: "High ROI (saves weekly time) but not urgent. Schedule as a project."
    }
  ]}
/>

---

## When to Say "Not Now"

The hardest CS skill for solo founders: **delaying or declining low-impact requests**.

You care about your customers. You want to help everyone immediately. But saying yes to everything means saying no to the work that grows your business.

### The "Not Now" Decision Framework

Ask yourself:
1. **Is this blocking the customer from getting value?** If yes → handle now. If no → batch or deflect.
2. **Is this customer high-value (>$200/mo)?** If yes → prioritize. If no → automate or deflect.
3. **Will this save me time in the future?** If yes → schedule as a project. If no → decline or delay.

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches">
You're trained to be present and responsive. But 24/7 availability doesn't serve your clients — it burns you out and makes you less effective. Boundaries are part of professional coaching.

Set office hours for client questions (e.g., "I respond to emails Tuesday and Thursday"). Clients respect this more than you think.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Creators">
Your audience expects instant responses because social media trained them that way. But you're not a social media manager — you're building a business.

Batch your DM/comment responses into 2-3 blocks per week. Your real fans will wait. The ones who demand instant replies aren't your customers anyway.
</ContextualNote>

### The "Not Now" Email Templates

**For low-priority feature requests:**
> "Thanks for the suggestion! I'm tracking feature requests in [Notion/Trello/etc]. I'll add this to the backlog and let you know if it makes the roadmap."

**For one-off support questions answered in docs:**
> "Great question! I made a quick walkthrough here: [link]. Let me know if that doesn't solve it."

**For low-ARPU customers asking for custom work:**
> "I appreciate the request, but I'm focused on [core product/service] right now. If this becomes a common need, I'll consider adding it. In the meantime, here's a workaround: [suggestion]."

**For customers asking for immediate responses outside your CS blocks:**
> "Thanks for reaching out! I batch support responses on [Monday/Wednesday/Friday] to give everyone my full attention. I'll get back to you by [day]. If this is urgent and blocking you, let me know and I'll prioritize."

<MiniRoleplay
  scenario="A $49/mo customer emails: 'Can you hop on a call to walk me through the setup? I'm confused.'"
  role="You are the founder responding"
  persistKey="onboarding-L9-roleplay"
  modelResponse="Thanks for reaching out! I made a step-by-step video walkthrough here: [link]. It covers the full setup in 5 minutes. If you're still stuck after watching, let me know which specific step is confusing and I'll help troubleshoot."
/>

---

## The Weekly CS Review (15 minutes)

Every Friday, spend 15 minutes reviewing your CS metrics and planning for next week. This is your **CS feedback loop**.

### What to Track

| Metric | What It Tells You | Target |
|--------|-------------------|--------|
| **New signups** | Acquisition health | Trend up |
| **TTFV (Time-to-First-Value)** | Onboarding effectiveness | &lt;24 hours (SaaS), &lt;7 days (services) |
| **NPS score** | Customer satisfaction | >40 (good), >60 (great) |
| **Churn count** | Retention health | &lt;5% monthly |
| **Support ticket volume** | Deflection effectiveness | Trend down as FAQ grows |
| **Stalled user count** | Onboarding friction | &lt;10% of active users |

### The 3 Questions to Ask Every Week

1. **What's working?** — Which onboarding intervention or automation had the best outcome this week?
2. **What's breaking?** — Where are customers getting stuck? What question got asked 3+ times?
3. **What's the one thing to improve next week?** — Pick ONE thing. Build it. Don't try to fix everything.

<TemplateBuilder
  title="Your Weekly CS Review"
  persistKey="onboarding-L9-review"
  sections={[
    {
      id: "metrics",
      title: "This Week's Metrics",
      fields: [
        { id: "signups", label: "New signups", placeholder: "e.g., 12", type: "text" },
        { id: "ttfv", label: "Avg TTFV", placeholder: "e.g., 18 hours", type: "text" },
        { id: "nps", label: "NPS score", placeholder: "e.g., 42", type: "text" },
        { id: "churn", label: "Churn count", placeholder: "e.g., 2", type: "text" },
        { id: "support", label: "Support tickets", placeholder: "e.g., 15", type: "text" }
      ]
    },
    {
      id: "reflection",
      title: "Weekly Reflection",
      fields: [
        { id: "working", label: "What's working?", placeholder: "e.g., Stalled user emails got 3 re-engagements", type: "textarea" },
        { id: "breaking", label: "What's breaking?", placeholder: "e.g., 5 customers asked about export feature", type: "textarea" },
        { id: "improve", label: "One thing to improve next week", placeholder: "e.g., Build Loom video for export walkthrough", type: "textarea" }
      ]
    }
  ]}
/>

---

## The CS Burnout Warning Signs

Solo founders are at high risk for CS burnout because **you care too much and have no team to share the load**.

Watch for these warning signs:

<FlipCard 
  front="Warning Sign #1" 
  back="You check support tickets first thing in the morning and last thing at night. You're in reactive mode 24/7." 
/>

<FlipCard 
  front="Warning Sign #2" 
  back="You feel guilty when you don't respond to a customer within 1 hour. You've internalized that your availability = your value." 
/>

<FlipCard 
  front="Warning Sign #3" 
  back="You're spending more time on CS than acquisition or product work. The business isn't growing because you're too busy supporting existing customers." 
/>

<FlipCard 
  front="Warning Sign #4" 
  back="You dread onboarding calls or support emails. What used to energize you now drains you." 
/>

<FlipCard 
  front="Warning Sign #5" 
  back="You've stopped building systems because 'it's faster to just do it myself.' You're trapped in a cycle of manual work." 
/>

**If you recognize 2+ of these signs, you need to implement the time blocks and deflection systems in this lesson immediately.**

---

## Putting It All Together: Your 5-7 Hour CS Week

Here's what a sustainable CS week looks like for a solo founder with 20-80 customers:

### Monday (90 min)
- 9:00-10:30am: CS Morning Scan
  - New signups review
  - Stalled user triage
  - Support ticket triage
  - NPS detractor outreach
  - Weekly plan

### Wednesday (90 min)
- 2:00-3:30pm: CS Execution Block
  - 3x 15-min onboarding calls
  - Day 45 check-in emails
  - Feature adoption nudges

### Friday (60-90 min)
- 4:00-5:30pm: CS Review & Expansion
  - At-risk customer outreach
  - Expansion conversations
  - Weekly metrics review
  - Next week prep

### Total: 4-5 hours of scheduled CS work

**Plus:** 1-2 hours buffer for urgent items that arise mid-week

**Equals:** 5-7 hours total CS time

<ScenarioSimulator
  title="CS Time Budget Calculator"
  persistKey="onboarding-L9-simulator"
  levers={[
    { id: "customers", label: "Active customers", min: 10, max: 200, step: 10, defaultValue: 50 },
    { id: "arpu", label: "Average revenue per customer ($/mo)", min: 20, max: 500, step: 20, defaultValue: 100 },
    { id: "deflection", label: "Support deflection rate (%)", min: 0, max: 80, step: 10, defaultValue: 60 }
  ]}
  outputs={[
    { 
      id: "supportHours", 
      label: "Weekly support hours", 
      formula: "(customers * 0.1 * (1 - deflection / 100))", 
      unit: " hrs", 
      precision: 1 
    },
    { 
      id: "onboardingHours", 
      label: "Weekly onboarding hours", 
      formula: "(customers * 0.02)", 
      unit: " hrs", 
      precision: 1 
    },
    { 
      id: "totalCS", 
      label: "Total CS hours", 
      formula: "(supportHours + onboardingHours + 1.5)", 
      unit: " hrs", 
      precision: 1 
    }
  ]}
  insight="At {totalCS} hours/week, CS is consuming {(totalCS / 30 * 100).toFixed(0)}% of your productive time. Target: &lt;25% (7.5 hours). If you're over, focus on deflection and automation."
/>

---

## Summary: The 5-7 Hour CS System

**The core principles:**

1. **Batch CS work into 3 focused blocks per week** — Monday scan, Wednesday execution, Friday review
2. **Deflect 60-70% of support via FAQ and Loom videos** — Build once, save time forever
3. **Triage by impact** — High-value customers and at-risk situations first, everything else batched or deflected
4. **Say "not now" to low-impact requests** — Protect your time for acquisition and product work
5. **Review metrics weekly** — Track what's working, fix what's breaking, improve one thing at a time

**The outcome:** Exceptional customer success in 5-7 hours per week, without burnout, with time left for growth.

<InteractiveChecklist 
  title="Your CS Time Management Action Items" 
  persistKey="onboarding-L9-actions" 
  items={[
    "Block out your 3 weekly CS time blocks in your calendar",
    "Build a 10-question FAQ page with Loom videos",
    "Create email templates for common support questions",
    "Set up your Weekly CS Review template",
    "Identify your top 3 CS priorities for next week",
    "Set Slack/email to 'Do Not Disturb' during CS blocks",
    "Calculate your current CS time spend and compare to 5-7 hour target",
    "Build your first support deflection resource (Loom or Tango guide)"
  ]} 
/>

---

**Next lesson:** We'll bring everything together in a 14-day onboarding system build sprint. You'll create your complete onboarding infrastructure — from welcome sequence to Day 90 renewal prep — in two weeks.