---
title: "The Weekly CS Review Block"
duration: "45 min"
track: "Customer Success"
course: "Course 37: Retention & Churn Prevention"
lesson: 8
---

You've built a health score model. You've wired up churn signals. You've written save-play scripts.

Now comes the hard part: **actually using them.**

Most solo founders build retention systems and then... forget to check them. The health score dashboard sits untouched. Reactivation emails never get sent. Red accounts slip through the cracks.

The difference between a retention system that works and one that collects dust? **A weekly ritual.**

This lesson teaches you to carve out 2-3 hours every week — a non-negotiable CS Review Block — where you systematically review health, prioritize interventions, and execute the actions that actually prevent churn.

<InsightCard icon="⏰" title="The Compound Effect of Consistency">
A solo founder who reviews customer health weekly catches at-risk accounts 45% faster than one who checks "when they remember." That speed difference translates to 25% lower churn over 12 months.
</InsightCard>

## The Problem: Reactive CS Doesn't Scale

Here's what reactive customer success looks like:

- Customer emails to cancel → you scramble to save them
- Payment fails → you notice 3 days later when Stripe sends an alert
- Usage drops 70% → you don't notice until they've already mentally checked out
- Expansion opportunity → you miss it because you're firefighting churn

**Reactive CS is exhausting.** You're always behind, always stressed, always losing customers you could have saved.

The alternative? **Proactive CS with a weekly review ritual.**

<FlipCard 
  front="What is Proactive CS?" 
  back="Proactive CS means you spot problems before the customer tells you. You intervene during the Yellow zone (salvageable) instead of waiting for Red (crisis). You create expansion opportunities instead of waiting for customers to ask." 
/>

## The Weekly CS Review Block: Your 2-3 Hour Ritual

Here's the structure that works for solo founders managing 20-200 customers:

<SlideNavigation>
<Slide title="Step 1: Health Score Review (30 min)">

**What you're doing:** Scanning your health score dashboard for zone changes.

**Questions to answer:**
- Who moved from Green to Yellow this week?
- Who moved from Yellow to Red?
- Are there any patterns? (e.g., all Yellow accounts are on the Basic plan)

**Output:** A flagged accounts list with 3 categories:
1. **Urgent (Red)** — Act within 48 hours
2. **Watch (Yellow)** — Proactive outreach this week
3. **Expand (Green + signals)** — Upsell opportunity

<ExampleCard label="Real Example: The Pattern Sarah Found">
Sarah noticed 4 customers dropped from Green to Yellow in the same week. All 4 were on her Basic plan and had been customers for 6+ months.

The pattern? They'd outgrown the Basic plan but didn't know Pro existed. She sent a "You're ready to level up" email to all 4. Three upgraded. One stayed Basic but re-engaged.

**The lesson:** Health score reviews reveal patterns that individual account checks miss.
</ExampleCard>

**Tool:** Your health score spreadsheet or dashboard (from Lesson 2).

</Slide>

<Slide title="Step 2: Reactivation Queue (30 min)">

**What you're doing:** Reviewing dormant users (no login in 7-14 days) and sending reactivation nudges.

**Questions to answer:**
- Who crossed the 7-day inactivity threshold this week?
- Who's at 14 days (second nudge)?
- Who's at 21 days (final nudge or escalation)?

**Output:** Reactivation emails sent (from your Lesson 5 sequence).

**Execution:**
- &lt;50 customers: Personal emails from you
- 50-200 customers: Automated sequence with personal tone
- High-value accounts ($200+/mo): Personal video message or call

<InsightCard icon="📧" title="The Reactivation Window">
Days 7-14 of inactivity = 25-35% reactivation rate. Days 21+ = &lt;10% reactivation rate. Speed matters.
</InsightCard>

**Tool:** Product analytics (GA4, Mixpanel) or manual login tracking.

</Slide>

<Slide title="Step 3: Expansion Pipeline (30 min)">

**What you're doing:** Reviewing Green accounts for upsell signals.

**Signals to look for:**
- Usage approaching plan limits (e.g., 80% of seat capacity)
- High engagement (NPS 9-10, frequent logins, using 3+ features)
- Tenure milestones (3 months, 6 months, 12 months)
- Business growth signals (hired new team members, launched new product)

**Output:** Expansion outreach list with personalized upsell angles.

<TemplateBuilder
  title="Expansion Outreach Template"
  persistKey="retention-L8-expansion"
  sections={[
    {
      id: "signal",
      title: "Upsell Signal",
      fields: [
        { id: "customer", label: "Customer Name", placeholder: "e.g., Acme Corp", type: "text" },
        { id: "signal", label: "What signal did you notice?", placeholder: "e.g., Using 9 of 10 seats", type: "textarea" },
        { id: "value", label: "What value does upgrading unlock?", placeholder: "e.g., Unlimited seats + priority support", type: "textarea" }
      ]
    },
    {
      id: "pitch",
      title: "Outreach Message",
      fields: [
        { id: "subject", label: "Email Subject", placeholder: "e.g., Ready to add more team members?", type: "text" },
        { id: "body", label: "Email Body", placeholder: "Hi [Name], I noticed you're using 9 of your 10 seats...", type: "textarea" }
      ]
    }
  ]}
/>

**Tool:** Your billing system (Stripe, Paddle) + health score dashboard.

</Slide>

<Slide title="Step 4: Feedback Review (30 min)">

**What you're doing:** Reviewing NPS responses, support tickets, and exit surveys for patterns and action items.

**Questions to answer:**
- What are customers praising? (Double down on this)
- What are customers complaining about? (Fix or communicate timeline)
- Are there feature requests appearing multiple times? (Prioritize)
- What did churned customers say in exit surveys? (Prevent future churn)

**Output:** Action items from feedback (e.g., "Add X feature to roadmap," "Improve onboarding for Y use case," "Write help doc for Z").

<ExampleCard label="Case Study: The Exit Survey Pattern">
Tom reviewed exit surveys and noticed 60% of churned customers said: "I stopped using it because I forgot about it."

**His fix:** Added a weekly digest email showing each customer their usage stats and wins. Churn dropped 18% in 2 months.

**The lesson:** Exit surveys tell you what to fix for future customers.
</ExampleCard>

**Tool:** NPS tool (Delighted, Typeform), support system (Intercom, Help Scout), exit survey (Google Form).

</Slide>

<Slide title="Step 5: Execute Top 3 Actions (30 min)">

**What you're doing:** Actually doing the work — calls, emails, fixes.

**The "Top 3" Rule:** Each weekly review should produce a maximum of 3 high-impact action items that you execute **this week.**

Why only 3? Because more than 3 means you're spreading too thin. Better to execute 3 perfectly than attempt 10 and complete 2.

**How to choose your Top 3:**
1. **Urgency x Value Matrix** (see next section)
2. Pick the 3 actions in the top-right quadrant (high urgency + high value)
3. Defer or automate everything else

**Example Top 3:**
1. Call the $500/mo customer who dropped to Red (high urgency + high value)
2. Send expansion pitch to the $200/mo customer at 80% seat capacity (medium urgency + high value)
3. Fix the onboarding bug that 3 customers mentioned this week (medium urgency + medium value, but prevents future churn)

</Slide>

<Slide title="Step 6: Document Patterns (30 min)">

**What you're doing:** Keeping a running CS log of patterns, interventions, and outcomes.

**Why this matters:** Your CS log becomes your institutional knowledge. When you eventually hire a CS person, this log trains them 50% faster.

**What to log:**
- **Patterns noticed:** "All Yellow accounts this week were Basic plan users who'd been customers 6+ months"
- **Interventions tried:** "Sent 'level up' email to 4 Yellow accounts"
- **Outcomes:** "3 upgraded to Pro, 1 re-engaged on Basic"
- **Learnings:** "Proactive upgrade nudges work better than waiting for customers to ask"

**Tool:** Notion, Google Doc, or a simple spreadsheet.

<InteractiveChecklist 
  title="Your CS Log Template" 
  persistKey="retention-L8-log" 
  items={[
    "Create a CS log document (Notion, Google Doc, or spreadsheet)",
    "Add sections: Patterns, Interventions, Outcomes, Learnings",
    "After each weekly review, spend 10 minutes documenting what you noticed",
    "Once per month, review your log for meta-patterns"
  ]} 
/>

</Slide>
</SlideNavigation>

## Prioritization: The Urgency x Value Matrix

You can't do everything. The 2x2 matrix helps you focus on what matters most.

<ClassifyExercise
  title="Prioritize These CS Actions"
  persistKey="retention-L8-prioritize"
  categories={[
    { id: "urgent-high", label: "Urgent + High Value (Do First)", color: "#ef4444" },
    { id: "urgent-low", label: "Urgent + Low Value (Automate)", color: "#f59e0b" },
    { id: "not-urgent-high", label: "Not Urgent + High Value (Schedule)", color: "#3b82f6" },
    { id: "not-urgent-low", label: "Not Urgent + Low Value (Defer)", color: "#6b7280" }
  ]}
  items={[
    { id: "1", content: "$500/mo customer dropped to Red zone (health score 35)", correctCategory: "urgent-high" },
    { id: "2", content: "$50/mo customer at 10 days of inactivity", correctCategory: "urgent-low" },
    { id: "3", content: "$300/mo Green customer using 9 of 10 seats", correctCategory: "not-urgent-high" },
    { id: "4", content: "$40/mo customer requested a minor feature", correctCategory: "not-urgent-low" },
    { id: "5", content: "$200/mo customer's payment failed 3 days ago", correctCategory: "urgent-high" },
    { id: "6", content: "$80/mo customer gave NPS score of 9", correctCategory: "not-urgent-high" }
  ]}
/>

**The Matrix:**

|  | **High Value ($200+/mo)** | **Low Value (&lt;$200/mo)** |
|---|---|---|
| **High Urgency (Red zone, payment failure, 21+ days inactive)** | **Do First** — Personal call/email within 48 hours | **Automate** — Automated save sequence |
| **Low Urgency (Yellow zone, expansion signal, positive feedback)** | **Schedule** — Add to this week's Top 3 | **Defer** — Add to backlog, revisit next month |

## The Monthly CS Retrospective

Once per month, spend 30 minutes reviewing your CS metrics and adjusting your playbook.

<ProgressiveReveal title="Monthly Retrospective Checklist" persistKey="retention-L8-retro">
<RevealSection title="1. Review Churn Numbers">

**Questions:**
- What was this month's logo churn rate?
- What was this month's revenue churn rate?
- What was this month's NRR?
- How do these compare to last month? To 3 months ago?

**Action:** If churn is trending up, dig into exit surveys and health score patterns to find the root cause.

</RevealSection>

<RevealSection title="2. Review Health Score Trends">

**Questions:**
- What % of customers are in each zone (Green, Yellow, Red)?
- Is the Yellow zone growing or shrinking?
- Are there cohort patterns? (e.g., customers who signed up in January churn faster than those who signed up in March)

**Action:** If Yellow is growing, your onboarding or product-market fit needs work.

</RevealSection>

<RevealSection title="3. Review Save Play Success Rates">

**Questions:**
- How many customers did you attempt to save this month?
- How many did you successfully save?
- Which save plays worked best? (downgrade, pause, recovery call)

**Action:** Double down on the save plays with the highest success rates. Retire or revise the ones that don't work.

</RevealSection>

<RevealSection title="4. Review Expansion Wins">

**Questions:**
- How many customers upgraded this month?
- What was the total expansion MRR?
- What signals preceded the upgrades?

**Action:** Systematize the signals that predict expansion (e.g., "customers who use 3+ features and hit 80% of plan limits upgrade 60% of the time").

</RevealSection>

<RevealSection title="5. Adjust Your Playbook">

**Questions:**
- What worked this month that you should do more of?
- What didn't work that you should stop or change?
- What new patterns did you notice?

**Action:** Update your CS playbook (reactivation sequences, save scripts, expansion pitches) based on what you learned.

</RevealSection>
</ProgressiveReveal>

## Building Your Weekly CS Review Habit

Knowing the structure is one thing. Actually doing it every week is another.

Here's how to make the Weekly CS Review Block a non-negotiable habit:

### 1. Block the Time

**Pick a specific day and time.** Most solo founders choose:
- **Monday morning** (9-11am) — Start the week with CS clarity
- **Friday afternoon** (2-5pm) — End the week by setting up next week's actions

**Add it to your calendar as a recurring event.** Treat it like a customer meeting — non-negotiable.

<RangeSlider 
  label="How confident are you that you'll actually do this weekly?" 
  min={1} 
  max={10} 
  lowLabel="Not confident" 
  highLabel="Very confident" 
  persistKey="retention-L8-confidence" 
/>

### 2. Prepare Your Tools

**Before your first CS Review Block, set up:**
- Health score dashboard (spreadsheet or tool)
- Reactivation email templates (from Lesson 5)
- Expansion outreach templates (from this lesson)
- CS log document (Notion, Google Doc, spreadsheet)

**During the review, you should be executing, not building.**

### 3. Use a Checklist

**Print or bookmark this checklist:**

<InteractiveChecklist 
  title="Weekly CS Review Block Checklist" 
  persistKey="retention-L8-checklist" 
  items={[
    "Health Score Review: Flag Red, Yellow, and expansion-ready accounts (30 min)",
    "Reactivation Queue: Send nudges to dormant users (30 min)",
    "Expansion Pipeline: Identify and reach out to upsell opportunities (30 min)",
    "Feedback Review: Scan NPS, support tickets, exit surveys for patterns (30 min)",
    "Execute Top 3: Complete the 3 highest-priority actions (30 min)",
    "Document Patterns: Update CS log with this week's learnings (30 min)"
  ]} 
/>

### 4. Track Your Streak

**Gamify it:** Track how many consecutive weeks you complete the CS Review Block.

**Why this works:** Streaks create momentum. After 4 weeks, it becomes automatic. After 12 weeks, it's a habit.

<TimedChallenge
  title="Quick Prioritization Drill"
  persistKey="retention-L8-drill"
  timeLimit={90}
  items={[
    { id: "1", prompt: "Customer A: $600/mo, health score dropped from 85 to 55, no login in 12 days", correctAnswer: "urgent", explanation: "High value + Yellow zone + inactivity = urgent intervention" },
    { id: "2", prompt: "Customer B: $80/mo, health score 90, using 8 of 10 seats", correctAnswer: "schedule", explanation: "Low urgency but good expansion signal — add to this week's Top 3" },
    { id: "3", prompt: "Customer C: $40/mo, health score 45, no login in 25 days", correctAnswer: "automate", explanation: "Low value + Red zone = automated save sequence, not personal outreach" },
    { id: "4", prompt: "Customer D: $300/mo, payment failed yesterday", correctAnswer: "urgent", explanation: "High value + payment failure = immediate dunning + personal follow-up" },
    { id: "5", prompt: "Customer E: $100/mo, NPS score 9, tenure 6 months", correctAnswer: "schedule", explanation: "Positive signal + medium value = expansion opportunity, not urgent" }
  ]}
/>

## Real-World CS Review Block Examples

Let's see what this looks like in practice.

<ExampleCard label="Sarah's CS Review Block (SaaS, 80 customers)">

**Monday, 9:00-11:30am**

**9:00-9:30 — Health Score Review:**
- 3 customers dropped to Yellow (health score 50-74)
- 1 customer dropped to Red (health score 35)
- 5 customers in Green with expansion signals (using 80%+ of plan limits)

**9:30-10:00 — Reactivation Queue:**
- 4 customers at 7-10 days of inactivity → sent Email 1 of reactivation sequence
- 2 customers at 14 days → sent Email 2
- 1 customer at 21 days → escalated to personal video message (high-value account)

**10:00-10:30 — Expansion Pipeline:**
- Sent "Ready to level up?" email to 3 customers using 80%+ of seats
- Scheduled call with 1 customer who replied asking about Pro plan

**10:30-11:00 — Feedback Review:**
- Reviewed 2 NPS responses (both 9s) → added to testimonial bank
- Reviewed 3 exit surveys → noticed pattern: "Forgot to use it" (added weekly digest email to roadmap)

**11:00-11:30 — Execute Top 3:**
1. Called the Red customer ($400/mo) → discovered they were frustrated with a bug → fixed it, customer stayed
2. Sent expansion pitch to $300/mo customer at 9 of 10 seats → they upgraded to unlimited plan
3. Updated onboarding email to emphasize weekly digest (prevents "forgot to use it" churn)

**11:30-12:00 — Document Patterns:**
- Logged: "Yellow customers this week were all 6+ month tenure on Basic plan — need proactive upgrade nudges"
- Logged: "Red customer save via bug fix — need faster support response SLA"

</ExampleCard>

<ExampleCard label="Tom's CS Review Block (Coaching, 35 clients)">

**Friday, 2:00-4:30pm**

**2:00-2:30 — Health Score Review:**
- 2 clients dropped to Yellow (missed 2 consecutive sessions)
- 1 client in Red (no contact in 3 weeks)
- 3 clients in Green with expansion signals (completed program, asking about next level)

**2:30-3:00 — Reactivation Queue:**
- Sent "I noticed you missed our last session" text to 2 Yellow clients
- Called Red client → left voicemail + sent email with pause offer

**3:00-3:30 — Expansion Pipeline:**
- Sent "Ready for the advanced program?" email to 3 Green clients
- 1 replied yes → scheduled enrollment call

**3:30-4:00 — Feedback Review:**
- Reviewed session notes from this week → noticed 4 clients struggling with the same concept (added bonus training video)
- Reviewed exit survey from churned client → they achieved their goal and graduated (good churn)

**4:00-4:30 — Execute Top 3:**
1. Called Yellow client who replied to reactivation text → rescheduled missed sessions
2. Sent enrollment pitch to expansion-ready client
3. Recorded bonus training video on the concept 4 clients struggled with

**4:30-5:00 — Document Patterns:**
- Logged: "Clients who miss 2 sessions in a row have 60% churn risk — need automated 'miss 1 session' nudge"
- Logged: "Expansion pitch works best after program completion + positive feedback"

</ExampleCard>

## Common Mistakes (and How to Avoid Them)

<SwipeDecision
  title="CS Review Block: Good Practice or Bad Practice?"
  description="Swipe right for good practices, left for bad practices"
  optionA="Bad Practice"
  optionB="Good Practice"
  persistKey="retention-L8-swipe"
  cards={[
    { id: "1", content: "Spending 3 hours reviewing every customer's health score in detail", correctOption: "a", explanation: "Too slow. Focus on zone changes (Green→Yellow, Yellow→Red) and expansion signals." },
    { id: "2", content: "Picking 3 high-impact actions and executing them this week", correctOption: "b", explanation: "The 'Top 3' rule ensures you actually execute instead of creating endless to-do lists." },
    { id: "3", content: "Skipping the CS Review Block when you're busy with new customer acquisition", correctOption: "a", explanation: "Retention compounds. Skipping CS reviews costs you more long-term than missing a few acquisition hours." },
    { id: "4", content: "Documenting patterns and learnings in a CS log after each review", correctOption: "b", explanation: "Your CS log becomes institutional knowledge and trains future hires." },
    { id: "5", content: "Trying to save every Red customer, even low-value ones", correctOption: "a", explanation: "Use the Urgency x Value matrix. Automate low-value saves, focus personal effort on high-value." },
    { id: "6", content: "Reviewing NPS and exit survey feedback for patterns", correctOption: "b", explanation: "Feedback reveals systemic issues you can fix for all future customers." }
  ]}
/>

## Your First CS Review Block (This Week)

Let's make this real. You're going to schedule and execute your first CS Review Block this week.

<TemplateBuilder
  title="My First CS Review Block Plan"
  persistKey="retention-L8-plan"
  sections={[
    {
      id: "schedule",
      title: "Schedule",
      fields: [
        { id: "day", label: "What day will you do your CS Review Block?", placeholder: "e.g., Monday", type: "text" },
        { id: "time", label: "What time?", placeholder: "e.g., 9:00am-11:30am", type: "text" },
        { id: "recurring", label: "How will you make it recurring?", placeholder: "e.g., Calendar event, reminder, accountability partner", type: "textarea" }
      ]
    },
    {
      id: "tools",
      title: "Tools Setup",
      fields: [
        { id: "health", label: "Where is your health score dashboard?", placeholder: "e.g., Google Sheets, Baremetrics, manual tracking", type: "text" },
        { id: "reactivation", label: "Where are your reactivation email templates?", placeholder: "e.g., ConvertKit, Gmail drafts, Notion", type: "text" },
        { id: "log", label: "Where will you keep your CS log?", placeholder: "e.g., Notion, Google Doc, spreadsheet", type: "text" }
      ]
    },
    {
      id: "commitment",
      title: "Commitment",
      fields: [
        { id: "why", label: "Why does this matter to you?", placeholder: "e.g., I'm losing $500/mo to preventable churn", type: "textarea" },
        { id: "accountability", label: "How will you hold yourself accountable?", placeholder: "e.g., Share streak with accountability partner, track in habit app", type: "textarea" }
      ]
    }
  ]}
/>

## Summary: The Retention Ritual That Compounds

The Weekly CS Review Block isn't glamorous. It's not a hack. It's not a tool.

It's a **discipline.**

But it's the discipline that separates solo founders with 3% monthly churn from those with 8% monthly churn. Over 12 months, that 5-point difference is the difference between growth and stagnation.

**The compound effect:**
- Week 1: You catch 1 at-risk customer before they churn
- Week 4: You've caught 4 customers + identified 2 expansion opportunities
- Week 12: You've saved $2,000 in MRR + added $1,500 in expansion MRR
- Week 24: Your churn rate has dropped from 6% to 4%, your NRR is above 100%, and you have a CS playbook that runs on autopilot

**The ritual:**
1. Block 2-3 hours every week (same day, same time)
2. Follow the 6-step agenda (health review → reactivation → expansion → feedback → Top 3 → document)
3. Use the Urgency x Value matrix to prioritize
4. Execute your Top 3 actions this week
5. Track your streak

<InteractiveChecklist 
  title="Your CS Review Block Action Items" 
  persistKey="retention-L8-actions" 
  items={[
    "Schedule your first CS Review Block (day + time) and add it to your calendar",
    "Set up your CS Review tools (health dashboard, reactivation templates, CS log)",
    "Complete your first CS Review Block this week using the 6-step checklist",
    "Document your learnings in your CS log",
    "Commit to a 4-week streak (track it visibly)"
  ]} 
/>

Next lesson: **Building Automation Recipes That Run Retention Without You** — how to wire up the CS Review Block insights into automated workflows that save you hours while preventing churn.

---

## Quiz

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "What is the primary benefit of a weekly CS Review Block?",
      "options": [
        "It makes you look busy",
        "It catches at-risk customers 45% faster than reactive CS",
        "It replaces the need for a health score model",
        "It eliminates all churn"
      ],
      "correctAnswer": 1,
      "explanation": "Solo founders with a weekly CS review block detect at-risk customers 45% faster, which translates to 25% lower churn over 12 months."
    },
    {
      "id": "q2",
      "question": "What is the 'Top 3' rule?",
      "options": [
        "Focus on your top 3 highest-paying customers only",
        "Each weekly review should produce a maximum of 3 action items that you execute this week",
        "Review only the top 3 health score zones",
        "Send 3 reactivation emails per week"
      ],
      "correctAnswer": 1,
      "explanation": "The 'Top 3' rule ensures you actually execute high-impact actions instead of creating endless to-do lists. Execution rate jumps from ~30% to ~80%."
    },
    {
      "id": "q3",
      "question": "In the Urgency x Value matrix, what should you do with actions that are 'Urgent + Low Value'?",
      "options": [
        "Do them first",
        "Defer them to next month",
        "Automate them",
        "Ignore them completely"
      ],
      "correctAnswer": 2,
      "explanation": "Urgent + Low Value actions (like a $50/mo customer at 10 days inactive) should be handled by automated sequences, not personal outreach."
    },
    {
      "id": "q4",
      "question": "How long should a solo founder's Weekly CS Review Block be?",
      "options": [
        "30 minutes",
        "1 hour",
        "2-3 hours",
        "5+ hours"
      ],
      "correctAnswer": 2,
      "explanation": "The optimal CS Review Block is 2-3 hours: 30 min per step (health review, reactivation, expansion, feedback, Top 3 execution, documentation)."
    },
    {
      "id": "q5",
      "question": "What is the purpose of the monthly CS retrospective?",
      "options": [
        "To review churn metrics and adjust your playbook based on what's working",
        "To fire low-value customers",
        "To celebrate wins only",
        "To plan next month's product roadmap"
      ],
      "correctAnswer": 0,
      "explanation": "The monthly retrospective reviews churn numbers, health trends, save play success rates, and expansion wins to continuously improve your CS playbook."
    },
    {
      "id": "q6",
      "question": "Which of these is a 'Yellow zone' action during the health score review?",
      "options": [
        "Monitor monthly + look for expansion opportunities",
        "Urgent intervention within 48 hours",
        "Proactive outreach + feature nudges this week",
        "Accept natural churn"
      ],
      "correctAnswer": 2,
      "explanation": "Yellow zone (health score 50-74) requires proactive outreach and feature nudges this week. It's the salvageable zone with 40-60% save rates."
    },
    {
      "id": "q7",
      "question": "What percentage of churning customers give no verbal warning before canceling?",
      "options": [
        "30%",
        "50%",
        "70%",
        "90%"
      ],
      "correctAnswer": 2,
      "explanation": "70% of churning customers never complain or contact support — they just stop logging in and eventually cancel. This is why proactive monitoring is critical."
    },
    {
      "id": "q8",
      "question": "What is the primary purpose of the CS log?",
      "options": [
        "To track time spent on CS activities",
        "To document patterns, interventions, and outcomes for institutional knowledge",
        "To create reports for investors",
        "To replace your CRM"
      ],
      "correctAnswer": 1,
      "explanation": "The CS log captures patterns, interventions, and learnings. It becomes institutional knowledge and trains future CS hires 50% faster."
    }
  ]
}