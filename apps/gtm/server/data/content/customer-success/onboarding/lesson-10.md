---
title: "Your Onboarding Playbook"
duration: "50 min"
track: "Customer Success"
course: "Course 36: Customer Onboarding"
lesson: 10
---

You've spent nine lessons building the pieces. Now it's time to assemble them into a system that runs without you babysitting every new customer.

This isn't a "someday" exercise. By the end of this lesson, you'll have a complete onboarding playbook — a living document that defines every touchpoint, automation, and intervention from signup to Day 90. You'll also walk away with a 14-day implementation sprint that turns this playbook from theory into practice.

## The Onboarding Playbook: Your Operating Manual

Think of your playbook as the instruction manual for your onboarding system. It answers three questions:

1. **What happens when?** (Timeline and triggers)
2. **Who does what?** (Automated vs. manual interventions)
3. **How do we measure success?** (Metrics and thresholds)

Most solo founders skip this step. They build email sequences and checklists but never document the *system*. Six months later, they can't remember why they set up a Day 5 nudge or what the NPS threshold should trigger.

Your playbook fixes that.

<InsightCard icon="📋" title="Why Document?">
A documented playbook lets you iterate without breaking things. When you test a new email variant or add a milestone, you know exactly what you're changing and why. Plus, if you ever hire help, this becomes their training manual.
</InsightCard>

## What Goes in Your Playbook

Your playbook has five core sections:

### 1. Onboarding Journey Map

This is your visual timeline — the 90-day path from signup to renewal decision. You built this in Lessons 2 and 3. Now you're finalizing it.

<TemplateBuilder
  title="Your 90-Day Journey Map"
  persistKey="onboarding-L10-journey"
  sections={[
    {
      id: "milestones",
      title: "Key Milestones",
      fields: [
        { id: "day1", label: "Day 1 Milestone", placeholder: "e.g., Account setup complete", type: "text" },
        { id: "day3", label: "Day 3 Milestone", placeholder: "e.g., First core action taken", type: "text" },
        { id: "day7", label: "Day 7 Milestone (First Value)", placeholder: "e.g., First report generated", type: "text" },
        { id: "day14", label: "Day 14 Milestone", placeholder: "e.g., Second use case explored", type: "text" },
        { id: "day30", label: "Day 30 Milestone (Habit)", placeholder: "e.g., 3+ logins per week", type: "text" },
        { id: "day60", label: "Day 60 Milestone (Expansion)", placeholder: "e.g., Invited team member or upgraded plan", type: "text" },
        { id: "day90", label: "Day 90 Milestone (Renewal)", placeholder: "e.g., Renewal decision or contract extension", type: "text" }
      ]
    },
    {
      id: "interventions",
      title: "Intervention Points",
      fields: [
        { id: "stalled", label: "When do you flag 'stalled'?", placeholder: "e.g., No login by Day 5", type: "text" },
        { id: "atrisk", label: "When do you flag 'at-risk'?", placeholder: "e.g., NPS 0-6 or no Day 7 milestone", type: "text" },
        { id: "advocate", label: "When do you flag 'advocate'?", placeholder: "e.g., NPS 9-10 + Day 30 milestone", type: "text" }
      ]
    }
  ]}
/>

### 2. Email & Automation Sequences

List every automated email and its trigger. This is your reference when something breaks or you want to A/B test.

<FlipCard 
  front="Example: Day 3 Nudge Email" 
  back="**Trigger:** 3 days after signup, IF Day 1 milestone NOT complete. **Subject:** 'Quick question — stuck on setup?' **Goal:** Re-engage stalled users. **CTA:** Link to 3-min setup video." 
/>

Your playbook should include:
- Welcome sequence (7 emails, Lesson 4)
- First-win celebration email (Lesson 5)
- Stalled user nudges (Lesson 5)
- Day 45 check-in (Lesson 7)
- Exit interview trigger (Lesson 7)

### 3. Onboarding Call Protocol

If you're doing calls (Lesson 6), document:
- Who gets a call? (e.g., all customers >$100/mo)
- When is it scheduled? (e.g., Day 3-5)
- What's the script? (15-minute template)
- What's the follow-up? (Day 30 check-in link)

<ExampleCard label="Call Protocol: SaaS Founder">
**Who:** All customers on Pro plan ($200/mo+)  
**When:** Day 3-5 after signup  
**Duration:** 15 minutes  
**Script:** Rapport (3 min) → Goal check (5 min) → Blocker troubleshoot (5 min) → Next step (2 min)  
**Follow-up:** Send Day 30 check-in Calendly link in post-call email
</ExampleCard>

### 4. Metrics Dashboard

Define your North Star onboarding metrics and thresholds:

<RangeSlider 
  label="What's your target Time-to-First-Value (TTFV)?" 
  min={1} 
  max={14} 
  lowLabel="1 day" 
  highLabel="14 days" 
  persistKey="onboarding-L10-ttfv" 
/>

Your playbook should track:
- **TTFV** (Time-to-First-Value): Target < 24 hours for SaaS, < 7 days for services
- **Day 7 Activation Rate**: % of customers who hit first-value milestone by Day 7
- **Day 30 Retention**: % still active at Day 30
- **Day 90 Retention**: % still active at Day 90
- **NPS at Day 45**: Average score from check-in survey

<InsightCard icon="📊" title="The One Metric That Matters">
If you only track one thing, make it **Day 7 Activation Rate**. Customers who hit first value in the first week have 85%+ 60-day retention. Everything else is downstream.
</InsightCard>

### 5. Escalation & Exception Handling

What happens when things go wrong?

- **Stalled user (no login by Day 5):** Automated nudge email + Slack notification to founder
- **At-risk customer (NPS 0-6):** Personal outreach within 24 hours
- **Angry customer (support ticket with negative sentiment):** Escalate to founder immediately
- **Churn request:** Send exit interview + personal "can we fix this?" email

<DecisionTree
  title="Escalation Decision Tree"
  persistKey="onboarding-L10-escalation"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Customer hasn't logged in by Day 5. What do you do?", 
      choices: [
        { label: "Send automated nudge email", nextNodeId: "nudge" },
        { label: "Personal outreach from founder", nextNodeId: "personal" }
      ]
    },
    { 
      id: "nudge", 
      content: "Nudge sent. They log in but don't complete Day 7 milestone. Next step?", 
      choices: [
        { label: "Send 'one more step' email", nextNodeId: "onestep" },
        { label: "Schedule personal call", nextNodeId: "call" }
      ]
    },
    { 
      id: "personal", 
      content: "You send a personal email. They reply: 'Too busy right now.' What do you do?", 
      choices: [
        { label: "Offer to pause account", nextNodeId: "pause" },
        { label: "Offer async Loom walkthrough", nextNodeId: "loom" }
      ]
    },
    { 
      id: "onestep", 
      content: "They complete the milestone! You've recovered them.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "call", 
      content: "Call scheduled. You troubleshoot live and they activate.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "pause", 
      content: "Account paused. You follow up in 30 days.", 
      isTerminal: true, 
      outcome: "neutral" 
    },
    { 
      id: "loom", 
      content: "They watch the Loom and activate. Crisis averted.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

## Building Your Playbook: The Template

Here's the structure. Fill it in as you go.

<TemplateBuilder
  title="Your Onboarding Playbook"
  persistKey="onboarding-L10-playbook"
  sections={[
    {
      id: "overview",
      title: "1. Overview",
      fields: [
        { id: "business", label: "Business Type", placeholder: "SaaS / Service / Coaching / Course", type: "text" },
        { id: "ttfv", label: "Target TTFV", placeholder: "e.g., 24 hours", type: "text" },
        { id: "customerCount", label: "Current Customer Count", placeholder: "e.g., 35", type: "text" },
        { id: "arpu", label: "Average Revenue Per User (ARPU)", placeholder: "e.g., $150/mo", type: "text" }
      ]
    },
    {
      id: "journey",
      title: "2. 90-Day Journey Map",
      fields: [
        { id: "milestones", label: "Key Milestones (Day 1, 3, 7, 14, 30, 60, 90)", placeholder: "List each milestone and its definition", type: "textarea" }
      ]
    },
    {
      id: "automation",
      title: "3. Email & Automation Sequences",
      fields: [
        { id: "welcome", label: "Welcome Sequence (7 emails)", placeholder: "List subject lines and triggers", type: "textarea" },
        { id: "firstwin", label: "First-Win Email", placeholder: "Trigger + template", type: "textarea" },
        { id: "stalled", label: "Stalled User Nudges", placeholder: "Trigger + template", type: "textarea" },
        { id: "checkin", label: "Day 45 Check-In", placeholder: "Survey link + personal email", type: "textarea" }
      ]
    },
    {
      id: "calls",
      title: "4. Onboarding Call Protocol",
      fields: [
        { id: "callCriteria", label: "Who gets a call?", placeholder: "e.g., All customers >$100/mo", type: "text" },
        { id: "callTiming", label: "When is it scheduled?", placeholder: "e.g., Day 3-5", type: "text" },
        { id: "callScript", label: "15-Minute Call Script", placeholder: "Paste or link to script", type: "textarea" }
      ]
    },
    {
      id: "metrics",
      title: "5. Metrics Dashboard",
      fields: [
        { id: "ttfvTarget", label: "TTFV Target", placeholder: "e.g., &lt;24 hours", type: "text" },
        { id: "day7Target", label: "Day 7 Activation Rate Target", placeholder: "e.g., 70%", type: "text" },
        { id: "day30Target", label: "Day 30 Retention Target", placeholder: "e.g., 85%", type: "text" },
        { id: "npsTarget", label: "Day 45 NPS Target", placeholder: "e.g., 40+", type: "text" }
      ]
    },
    {
      id: "escalation",
      title: "6. Escalation & Exception Handling",
      fields: [
        { id: "stalledProtocol", label: "Stalled User Protocol", placeholder: "e.g., Automated nudge + Slack alert", type: "textarea" },
        { id: "atriskProtocol", label: "At-Risk Customer Protocol", placeholder: "e.g., Personal outreach within 24 hours", type: "textarea" },
        { id: "churnProtocol", label: "Churn Request Protocol", placeholder: "e.g., Exit interview + personal email", type: "textarea" }
      ]
    }
  ]}
/>

## The 14-Day Implementation Sprint

You've built the playbook. Now you need to *implement* it.

This sprint is your execution plan. Each day has a single focus. No multitasking. No "I'll get to it later."

<SlideNavigation>
<Slide title="Day 1-2: Audit & Baseline">
**Goal:** Understand your current state.

**Tasks:**
- Export your customer list
- Calculate current TTFV (average days from signup to first value)
- Calculate Day 7 activation rate (% who hit first value by Day 7)
- Calculate Day 30 and Day 90 retention
- Document your current onboarding process (what emails exist? what's manual?)

**Output:** Baseline metrics + gap analysis
</Slide>

<Slide title="Day 3-4: Build Welcome Sequence">
**Goal:** Get the 7-email welcome sequence live.

**Tasks:**
- Write all 7 emails (use Lesson 4 templates)
- Set up email sequence in your ESP (ConvertKit, Customer.io, Mailchimp)
- Test the sequence by signing up as a test customer
- Verify timing and triggers

**Output:** Live welcome sequence
</Slide>

<Slide title="Day 5-6: Set Up Milestone Tracking">
**Goal:** Define and track your activation milestones.

**Tasks:**
- Define your Day 1, 3, 7, 14, 30, 60, 90 milestones
- Set up event tracking (if SaaS) or manual tracking (if service/coaching)
- Create a simple Google Sheet or Notion database to log milestone completion
- Test: manually trigger a milestone and verify it logs correctly

**Output:** Milestone tracking system
</Slide>

<Slide title="Day 7-8: Build Stalled User Detection">
**Goal:** Catch stalled users before they ghost.

**Tasks:**
- Set up a Zapier/Make automation: IF no login in 5 days → send nudge email + Slack notification
- Write the "stalled user" nudge email (use Lesson 5 template)
- Test the automation with a dummy account

**Output:** Stalled user automation live
</Slide>

<Slide title="Day 9-10: Build Day 45 Check-In">
**Goal:** Get feedback before churn happens.

**Tasks:**
- Create your 3-question NPS survey (Typeform, Tally, or Google Forms)
- Write the Day 45 personal email (use Lesson 7 template)
- Set up automation: 45 days after signup → send survey + personal email
- Define NPS response protocol (9-10 = testimonial ask, 0-6 = personal outreach)

**Output:** Day 45 check-in system live
</Slide>

<Slide title="Day 11-12: Onboarding Call Setup (if applicable)">
**Goal:** Schedule and script your onboarding calls.

**Tasks:**
- Set up Calendly with 2 weekly blocks (e.g., Tuesday/Thursday 10-11am)
- Write your 15-minute call script (use Lesson 6 template)
- Add Calendly link to Day 3 email for qualifying customers
- Do a practice call with a friend or existing customer

**Output:** Call system live (or skipped if not applicable)
</Slide>

<Slide title="Day 13: Metrics Dashboard">
**Goal:** Build your onboarding dashboard.

**Tasks:**
- Create a Google Sheet or Notion page with your 5 core metrics (TTFV, Day 7 activation, Day 30 retention, Day 90 retention, NPS)
- Set up weekly tracking (every Monday, update the numbers)
- Define your targets for each metric

**Output:** Live metrics dashboard
</Slide>

<Slide title="Day 14: Playbook Finalization & Review">
**Goal:** Document everything and commit to weekly review.

**Tasks:**
- Fill in your complete playbook template (use the TemplateBuilder above)
- Schedule a recurring 30-minute weekly review (Friday afternoon) to check metrics and adjust
- Celebrate: you now have a real onboarding system

**Output:** Complete onboarding playbook + weekly review cadence
</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Your 14-Day Sprint Checklist" 
  persistKey="onboarding-L10-sprint" 
  items={[
    "Day 1-2: Audit current onboarding & calculate baseline metrics",
    "Day 3-4: Build and test 7-email welcome sequence",
    "Day 5-6: Set up milestone tracking system",
    "Day 7-8: Build stalled user detection automation",
    "Day 9-10: Build Day 45 NPS check-in system",
    "Day 11-12: Set up onboarding call system (if applicable)",
    "Day 13: Build metrics dashboard",
    "Day 14: Finalize playbook and schedule weekly review"
  ]} 
/>

## The Weekly CS Rhythm (Post-Sprint)

Once your sprint is done, you shift into maintenance mode. Here's your ongoing rhythm:

**Monday (30 min):**
- Morning scan: new signups, stalled users, NPS responses, support tickets
- Triage: flag top 3 items needing action this week

**Wednesday (90 min):**
- Onboarding calls (if applicable)
- Personal outreach to at-risk customers (NPS 0-6)
- Check-in emails to high-value customers

**Friday (60 min):**
- Update metrics dashboard
- Review week's onboarding performance
- Adjust one thing (e.g., test new email subject line, tweak Day 7 milestone)

**Total weekly time:** 3-4 hours for onboarding (leaves 2-3 hours for retention and expansion work in Courses 37-39)

<ScenarioSimulator
  title="Weekly CS Time Allocation"
  persistKey="onboarding-L10-time"
  levers={[
    { id: "newSignups", label: "New signups per week", min: 1, max: 20, step: 1, defaultValue: 5 },
    { id: "callsEnabled", label: "Onboarding calls enabled? (1=yes, 0=no)", min: 0, max: 1, step: 1, defaultValue: 1 }
  ]}
  outputs={[
    { id: "scanTime", label: "Morning scan time (min)", formula: "30", unit: "min", precision: 0 },
    { id: "callTime", label: "Call time (min)", formula: "callsEnabled * newSignups * 15", unit: "min", precision: 0 },
    { id: "outreachTime", label: "At-risk outreach (min)", formula: "newSignups * 5", unit: "min", precision: 0 },
    { id: "reviewTime", label: "Weekly review (min)", formula: "60", unit: "min", precision: 0 },
    { id: "totalTime", label: "Total weekly CS time", formula: "scanTime + callTime + outreachTime + reviewTime", unit: "min", precision: 0 }
  ]}
  insight="At {newSignups} signups/week with calls {callsEnabled === 1 ? 'enabled' : 'disabled'}, you'll spend ~{(totalTime / 60).toFixed(1)} hours/week on CS. Target: 5-7 hours total across all CS activities."
/>

## Common Playbook Mistakes (And How to Avoid Them)

### Mistake 1: Building for 1,000 customers when you have 10

**Fix:** Start simple. A Google Sheet + 7 emails + 1 Zapier automation is enough for your first 50 customers. Don't build enterprise CS infrastructure on Day 1.

### Mistake 2: Automating everything, including exceptions

**Fix:** Automate the repeatable (welcome emails, milestone nudges, surveys). Keep human touch for exceptions (at-risk customers, angry support tickets, expansion conversations).

### Mistake 3: Setting it and forgetting it

**Fix:** Your playbook is a living document. Review it weekly. Adjust one thing every week based on data. Onboarding is never "done."

<FlipCard 
  front="The Playbook Paradox" 
  back="The more you document your onboarding system, the less time you spend managing it. The playbook creates freedom, not rigidity." 
/>

### Mistake 4: Measuring vanity metrics

**Fix:** Don't track "email open rates" or "number of onboarding calls completed." Track outcomes: TTFV, Day 7 activation rate, Day 90 retention. Those predict revenue.

### Mistake 5: Treating all customers the same

**Fix:** Segment your onboarding. High-value customers (>$200/mo) get calls. Self-serve customers (&lt;$50/mo) get automation only. Don't waste time on low-ROI activities.

## Your Playbook in Action: A Case Study

**Sarah runs a SaaS tool for content creators ($99/mo).**

Before her playbook:
- TTFV: 9 days
- Day 7 activation: 35%
- Day 90 retention: 52%
- Weekly CS time: 12 hours (reactive support hell)

After her 14-day sprint:
- TTFV: 2 days (down from 9)
- Day 7 activation: 78% (up from 35%)
- Day 90 retention: 87% (up from 52%)
- Weekly CS time: 4 hours (batched and proactive)

**What changed?**
1. She defined "first value" as "published first AI-assisted post" (previously undefined)
2. She built a 3-step in-app checklist that 78% of users completed in 48 hours
3. She automated stalled user detection (no login by Day 3 → nudge email + Slack alert)
4. She added a Day 45 NPS survey that caught at-risk customers before they churned
5. She documented everything in a playbook and reviewed it every Friday

**The result:** She cut churn by 40% and freed up 8 hours/week for acquisition work.

<ExampleCard label="Sarah's Playbook: The One Change That Mattered Most">
"The biggest win wasn't the emails or the automations. It was **defining first value**. Once I knew exactly what action predicted retention, I could design everything around getting users to that moment as fast as possible. TTFV dropped from 9 days to 2 days, and retention jumped 35 points."
</ExampleCard>

## Final Check: Is Your Playbook Ready?

Use this checklist to verify your playbook is complete:

<InteractiveChecklist 
  title="Playbook Readiness Checklist" 
  persistKey="onboarding-L10-readiness" 
  items={[
    "I've defined my Day 1, 3, 7, 14, 30, 60, 90 milestones",
    "I've built a 7-email welcome sequence with triggers",
    "I've set up stalled user detection (no login by Day 5)",
    "I've created a Day 45 NPS check-in system",
    "I've defined my onboarding call protocol (or decided to skip calls)",
    "I've built a metrics dashboard tracking TTFV, Day 7 activation, Day 30/90 retention, and NPS",
    "I've documented my escalation protocols (stalled, at-risk, churn)",
    "I've scheduled a weekly 30-minute review to check metrics and adjust",
    "I've completed my 14-day implementation sprint",
    "I've tested the entire system end-to-end with a dummy account"
  ]} 
/>

If you checked all 10, you're ready. If not, go back and finish the gaps.

## What Happens Next

You've built your onboarding system. Now you maintain it.

**Week 1-4:** Watch your metrics. Expect some bugs. Fix them. Adjust email timing. Tweak milestone definitions.

**Month 2-3:** Start optimizing. A/B test subject lines. Try different Day 7 nudges. Experiment with call timing.

**Month 4+:** Your system is humming. TTFV is stable. Retention is climbing. You're spending 3-4 hours/week on onboarding instead of 12.

**The next frontier:** Retention and expansion (Courses 37-39). Once customers are onboarded, how do you keep them? How do you grow their accounts? That's where the real revenue multiplier lives.

But first, finish your sprint. Build your playbook. Make onboarding a system, not a scramble.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Your instinct is to over-engineer this. Resist. Start with Google Sheets + basic email automation. You can build custom dashboards and event pipelines later. Right now, speed to implementation beats architectural perfection.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Your playbook will be more relationship-heavy than SaaS founders'. That's fine. Document your kickoff call script, your working agreement template, and your check-in cadence. The structure creates space for better client relationships, not worse ones.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Creators">
Your onboarding is about content delivery + community activation. Define "first value" as "completed first module" or "posted first intro in community." Your playbook should include welcome emails, content drip schedule, and community engagement prompts.
</ContextualNote>

## Your Action Items

<InteractiveChecklist 
  title="Post-Lesson Action Items" 
  persistKey="onboarding-L10-actions" 
  items={[
    "Complete your Onboarding Playbook template (all 6 sections)",
    "Start your 14-day implementation sprint TODAY (Day 1: audit & baseline)",
    "Block 3 recurring weekly time slots: Monday scan (30 min), Wednesday calls/outreach (90 min), Friday review (60 min)",
    "Set a calendar reminder for Day 14: 'Finalize playbook and celebrate'",
    "Share your playbook with one accountability partner or mentor for feedback"
  ]} 
/>

---

**You've reached the end of Course 36: Customer Onboarding.**

You now have:
- A 90-day milestone map
- A 7-email welcome sequence
- Stalled user detection
- A Day 45 NPS check-in system
- An onboarding call protocol (if applicable)
- A metrics dashboard
- A complete playbook
- A 14-day implementation sprint

**Next up:** Course 37 (Retention & Churn Prevention) — where you'll learn to keep the customers you just onboarded.

But first: execute your sprint. Build your system. Turn onboarding from chaos into a machine.

You've got this.