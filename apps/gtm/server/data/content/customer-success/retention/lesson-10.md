---
title: "Your Retention Playbook"
duration: "50 min"
track: "Customer Success"
course: "Course 37: Retention & Churn Prevention"
lesson: 10
---

You've spent nine lessons learning the mechanics of retention: health scores, churn signals, reactivation sequences, save plays, feature nudges. Now it's time to assemble them into a **living system** that runs without you micromanaging every at-risk account.

This lesson is your **14-day implementation sprint**. By the end, you'll have a complete retention playbook — documented, automated where possible, and ready to run on a weekly 2-3 hour maintenance schedule.

<InsightCard icon="🎯" title="The Retention System Promise">
A solo founder with 50-200 customers can reduce churn by 25-40% in 90 days with a system that requires 2-3 hours per week, not 20.
</InsightCard>

## The Problem with "Reactive Retention"

Most solo founders do retention like this:

- Customer cancels → scramble to save them
- Usage drops → notice it 3 weeks later when they cancel
- Support ticket comes in → answer it, then forget about the customer
- Expansion opportunity → miss it because you're firefighting churn

**Result:** 5-8% monthly churn, constant firefighting, zero expansion revenue.

The alternative is a **proactive retention system** that:

1. **Detects risk early** (health scores + signal tracking)
2. **Intervenes automatically** (reactivation sequences, feature nudges)
3. **Escalates strategically** (save plays for high-value accounts)
4. **Learns continuously** (monthly retrospectives, playbook updates)

<FlipCard 
  front="The Retention Paradox" 
  back="The less time you spend on retention, the better your retention gets — because systems scale, panic doesn't." 
/>

## Your 14-Day Retention System Build

Here's the sprint structure:

<SlideNavigation>
<Slide title="Days 1-3: Foundation">

**Goal:** Set up your health scoring infrastructure and baseline metrics.

### Day 1: Health Score Setup
- Build your health scoring spreadsheet (Usage 40% + Engagement 30% + Business 30%)
- Connect data sources: GA4 for logins, ESP for email engagement, Stripe for payments
- Score your current customer base and classify into Green/Yellow/Red zones

### Day 2: Churn Signal Tracking
- Set up your 7-signal tracker (login frequency, feature usage, email engagement, support tickets, payment behavior, NPS, expansion)
- Configure alerts: Zapier or Make.com to flag when signals cross red thresholds
- Baseline your current churn rate and NRR

### Day 3: Benchmark Analysis
- Compare your metrics to SMB SaaS benchmarks (&lt;3% monthly churn, NRR ≥100%)
- Run a cohort analysis: which signup months have the best/worst retention?
- Identify your "churn cliff" — the point where most customers drop off

<InteractiveChecklist 
  title="Days 1-3 Checklist" 
  persistKey="retention-L10-foundation"
  items={[
    "Health scoring spreadsheet built and populated",
    "7 churn signals tracked with red thresholds defined",
    "Current churn rate and NRR calculated",
    "Cohort analysis completed",
    "Benchmark comparison documented"
  ]} 
/>

</Slide>

<Slide title="Days 4-7: Automation">

**Goal:** Wire up your automated intervention sequences.

### Day 4: Reactivation Sequence
- Write your 3-email reactivation sequence (Day 7, Day 14, Day 21 of inactivity)
- Set up automation in your ESP (ConvertKit, Mailchimp, Customer.io)
- Configure trigger: "No login in 7 days" → send Email 1

### Day 5: Feature Adoption Nudges
- Identify your 3 sticky features (the ones retained customers use that churned ones don't)
- Create drip introduction schedule: Day 1 core feature, Day 7 second feature, Day 14 third feature
- Write feature spotlight emails and in-app tooltips

### Day 6: Save Play Automation
- Build your cancellation flow: (1) Ask why, (2) Offer save play, (3) Downgrade/pause option, (4) Exit survey
- Write save play scripts for each cancellation reason (price → downgrade, not using → pause, competitor → recovery call)
- Set up Zapier alert for high-value cancellation attempts ($200+/mo) → notify you for personal call

### Day 7: Test Run
- Manually trigger each automation with test accounts
- Verify emails send, alerts fire, and escalations route correctly
- Fix any broken connections or missing data

<InteractiveChecklist 
  title="Days 4-7 Checklist" 
  persistKey="retention-L10-automation"
  items={[
    "3-email reactivation sequence live",
    "Feature adoption drip schedule configured",
    "Cancellation flow with save plays implemented",
    "High-value cancellation alerts set up",
    "All automations tested end-to-end"
  ]} 
/>

</Slide>

<Slide title="Days 8-10: Playbook Documentation">

**Goal:** Document your retention system so it's repeatable and trainable.

### Day 8: Health Score Playbook
- Document your health score model: signals, weights, thresholds, zone definitions
- Write action protocols for each zone:
  - Green (75-100): Monthly check + expansion opportunity scan
  - Yellow (50-74): Weekly check + proactive outreach + feature nudges
  - Red (0-49): Urgent intervention within 48 hours + personal call if high-value

### Day 9: Save Play Scripts
- Compile all your save play scripts into a single document:
  - Downgrade pitch (for price objections)
  - Pause offer (for "too busy" or budget cuts)
  - Recovery call script (for high-value at-risk accounts)
  - Cancellation flow decision tree
- Add real examples from your first week of testing

### Day 10: Weekly CS Review Template
- Create your 2-3 hour weekly review agenda:
  - 0:00-0:30: Health score review
  - 0:30-1:00: Reactivation queue
  - 1:00-1:30: Expansion pipeline
  - 1:30-2:00: Feedback review
  - 2:00-2:30: Execute Top 3 actions
  - 2:30-3:00: Document patterns
- Set recurring calendar block

<InteractiveChecklist 
  title="Days 8-10 Checklist" 
  persistKey="retention-L10-playbook"
  items={[
    "Health score playbook documented",
    "Save play scripts compiled",
    "Weekly CS review template created",
    "Calendar block scheduled",
    "Playbook shared with any team members or future hires"
  ]} 
/>

</Slide>

<Slide title="Days 11-14: Live Execution">

**Goal:** Run your first full week of the retention system.

### Day 11: First Weekly Review
- Run your first 2-3 hour weekly CS review following the template
- Flag accounts that moved zones (Green → Yellow, Yellow → Red)
- Send reactivation emails to dormant users
- Identify expansion opportunities in Green accounts

### Day 12: Execute Top 3 Actions
- From your weekly review, pick the 3 highest-impact actions:
  - Example: Call 2 high-value Red accounts, send feature nudge to 5 Yellow accounts, reach out to 1 expansion opportunity
- Execute them. Document outcomes.

### Day 13: Monitor Automation
- Check that automated sequences are firing correctly
- Review any responses to reactivation emails or feature nudges
- Adjust timing or copy if open rates are low (&lt;20%)

### Day 14: First Retrospective
- Review your first week of data:
  - How many accounts moved zones?
  - What was the reactivation email response rate?
  - Did any save plays work?
  - What patterns emerged?
- Update your playbook based on what you learned

<InteractiveChecklist 
  title="Days 11-14 Checklist" 
  persistKey="retention-L10-execution"
  items={[
    "First weekly CS review completed",
    "Top 3 actions executed and documented",
    "Automation health check completed",
    "First retrospective conducted",
    "Playbook updated with Week 1 learnings"
  ]} 
/>

</Slide>
</SlideNavigation>

## Building Your Retention Playbook Document

Your retention playbook is the **single source of truth** for how you manage customer health. It should be a living document (Google Doc, Notion page) that you update monthly.

<TemplateBuilder
  title="Your Retention Playbook Structure"
  persistKey="retention-L10-playbook-builder"
  sections={[
    {
      id: "health-model",
      title: "Health Score Model",
      fields: [
        { 
          id: "usage-signals", 
          label: "Usage Signals (40% weight)", 
          placeholder: "e.g., Login frequency (last 14 days), Core action frequency, Feature breadth", 
          type: "textarea" 
        },
        { 
          id: "engagement-signals", 
          label: "Engagement Signals (30% weight)", 
          placeholder: "e.g., Email open rate, Support interaction, NPS score", 
          type: "textarea" 
        },
        { 
          id: "business-signals", 
          label: "Business Signals (30% weight)", 
          placeholder: "e.g., Payment history, Plan tier, Tenure", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "zone-actions",
      title: "Zone Action Protocols",
      fields: [
        { 
          id: "green-protocol", 
          label: "Green Zone (75-100) Actions", 
          placeholder: "e.g., Monthly check-in, Expansion opportunity scan, NPS survey quarterly", 
          type: "textarea" 
        },
        { 
          id: "yellow-protocol", 
          label: "Yellow Zone (50-74) Actions", 
          placeholder: "e.g., Weekly health check, Proactive outreach, Feature adoption nudges", 
          type: "textarea" 
        },
        { 
          id: "red-protocol", 
          label: "Red Zone (0-49) Actions", 
          placeholder: "e.g., Urgent intervention within 48 hours, Personal call if $200+/mo, Save play deployment", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "automation",
      title: "Automated Sequences",
      fields: [
        { 
          id: "reactivation", 
          label: "Reactivation Sequence Triggers", 
          placeholder: "e.g., No login in 7 days → Email 1, No login in 14 days → Email 2", 
          type: "textarea" 
        },
        { 
          id: "feature-nudges", 
          label: "Feature Adoption Nudge Schedule", 
          placeholder: "e.g., Day 1: Core feature, Day 7: Second feature, Day 14: Third feature", 
          type: "textarea" 
        },
        { 
          id: "save-plays", 
          label: "Save Play Automation Rules", 
          placeholder: "e.g., Cancellation intent + price reason → Downgrade offer, High-value cancel → Alert for personal call", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "weekly-review",
      title: "Weekly CS Review Agenda",
      fields: [
        { 
          id: "review-steps", 
          label: "Review Steps (2-3 hours)", 
          placeholder: "e.g., 0:00-0:30 Health score scan, 0:30-1:00 Reactivation queue, 1:00-1:30 Expansion pipeline", 
          type: "textarea" 
        },
        { 
          id: "top-3-criteria", 
          label: "Top 3 Action Selection Criteria", 
          placeholder: "e.g., Highest urgency + highest value = priority 1, Yellow zone high-value = priority 2", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

## The Weekly CS Review in Action

Let's walk through what a real weekly review looks like.

<ExampleCard label="Case Study: Sarah's First Weekly Review">

**Context:** Sarah runs a $15K MRR SaaS tool for content creators. She has 150 customers at $100/mo average. She just finished her 14-day retention system build.

**Week 1 Review (2.5 hours):**

**0:00-0:30 — Health Score Scan**
- 12 accounts moved from Green to Yellow (usage dropped 30%+)
- 3 accounts moved from Yellow to Red (no logins in 14+ days)
- 2 accounts moved from Yellow to Green (re-engaged after feature nudge)

**0:30-1:00 — Reactivation Queue**
- 18 accounts with no login in 7-10 days → automated Email 1 already sent
- 7 accounts with no login in 14 days → automated Email 2 already sent
- 3 accounts with no login in 21 days → automated Email 3 already sent
- **Action:** Manually check responses to reactivation emails. 4 replied asking for help. Add to Top 3.

**1:00-1:30 — Expansion Pipeline**
- 8 Green accounts using all features + high engagement → potential upsell candidates
- 2 accounts on Basic plan with usage patterns matching Pro users → send upgrade offer
- **Action:** Draft 2 personalized upgrade emails. Add to Top 3.

**1:30-2:00 — Feedback Review**
- 3 NPS responses: 2 promoters (9-10), 1 detractor (4)
- Detractor reason: "Missing integration with [tool]"
- Support tickets: 5 this week, all resolved, no patterns
- **Action:** Reply to detractor with feature roadmap update. Add to Top 3.

**2:00-2:30 — Execute Top 3**
1. Reply to 4 reactivation email responses with personalized help offers
2. Send 2 upgrade emails to expansion candidates
3. Reply to NPS detractor with roadmap update

**2:30-3:00 — Document Patterns**
- **Pattern noticed:** Accounts that don't use Feature B within first 14 days have 3x higher churn. Add Feature B to Day 7 nudge sequence.
- **Save play success:** 1 of 3 Red accounts responded to reactivation Email 3 and re-engaged. 33% recovery rate.
- **Expansion win:** 1 of 2 upgrade emails converted immediately. $50 MRR expansion.

**Outcome:** Sarah spent 2.5 hours and recovered 1 churning account, expanded 1 account, and identified a new feature adoption pattern. Projected impact: -$100 churn prevented, +$50 expansion = $150 MRR saved/gained in one week.

</ExampleCard>

<RangeSlider 
  label="How confident are you in running a weekly CS review like Sarah's?" 
  min={1} 
  max={10} 
  lowLabel="Not confident" 
  highLabel="Very confident" 
  persistKey="retention-L10-review-confidence" 
/>

## Automation Recipes: Set It and (Mostly) Forget It

The goal is to automate 70-80% of retention work so your weekly review focuses on the 20% that needs human judgment.

<ClassifyExercise
  title="Automate or Manual?"
  persistKey="retention-L10-classify"
  categories={[
    { id: "automate", label: "Automate", color: "#10b981" },
    { id: "manual", label: "Manual (Human Touch)", color: "#3b82f6" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Send reactivation Email 1 to users with no login in 7 days", 
      correctCategory: "automate",
      explanation: "This is a high-volume, low-touch action. Automate it." 
    },
    { 
      id: "2", 
      content: "Call a $500/mo customer who just moved to Red zone", 
      correctCategory: "manual",
      explanation: "High-value accounts need personal attention." 
    },
    { 
      id: "3", 
      content: "Send feature spotlight email to users who completed onboarding", 
      correctCategory: "automate",
      explanation: "This is a drip sequence. Automate it." 
    },
    { 
      id: "4", 
      content: "Respond to a customer who replied to reactivation email asking for help", 
      correctCategory: "manual",
      explanation: "They're engaging. Personal response builds trust." 
    },
    { 
      id: "5", 
      content: "Flag accounts that drop from Green to Yellow in health score", 
      correctCategory: "automate",
      explanation: "Automated alert. You decide what to do with the flag." 
    },
    { 
      id: "6", 
      content: "Offer a downgrade to a customer who says 'too expensive' in cancellation flow", 
      correctCategory: "automate",
      explanation: "Automated save play. If they accept, great. If not, escalate to manual." 
    }
  ]}
/>

Here are the **5 core automation recipes** every solo founder should set up:

<ProgressiveReveal title="The 5 Core Retention Automations" persistKey="retention-L10-automations">

<RevealSection title="1. Reactivation Sequence (No Login in 7+ Days)">

**Trigger:** User hasn't logged in for 7 days

**Automation:**
- Day 7: Send Email 1 ("Quick check-in")
- Day 14: Send Email 2 ("You're missing [value]")
- Day 21: Send Email 3 ("Can I help?")
- If no response to Email 3 + account is high-value ($200+/mo) → Alert you for personal call

**Tools:** ConvertKit/Mailchimp + Zapier + Google Sheets health score tracker

**Expected Outcome:** 25-35% open rate, 5-10% re-engagement rate

</RevealSection>

<RevealSection title="2. Feature Adoption Drip (Days 1, 7, 14, 30)">

**Trigger:** User completes onboarding (or signs up)

**Automation:**
- Day 1: Welcome email + core feature tutorial
- Day 7: Feature spotlight email for second feature + in-app tooltip
- Day 14: Feature spotlight email for third feature + in-app tooltip
- Day 30: "Power user" email introducing advanced features

**Tools:** Customer.io/Intercom + product analytics event triggers

**Expected Outcome:** 30-40% feature adoption increase for drip-introduced features

</RevealSection>

<RevealSection title="3. Health Score Alerts (Zone Changes)">

**Trigger:** Account moves from Green to Yellow or Yellow to Red

**Automation:**
- Green → Yellow: Add to weekly review queue (no immediate action)
- Yellow → Red: Send Slack/email alert + flag for immediate review
- Yellow → Red + high-value ($200+/mo): Send urgent alert + schedule call

**Tools:** Zapier + Google Sheets health score tracker + Slack

**Expected Outcome:** Detect at-risk accounts 2-4 weeks earlier than manual monitoring

</RevealSection>

<RevealSection title="4. Cancellation Flow Save Plays">

**Trigger:** User clicks "Cancel subscription"

**Automation:**
- Step 1: Ask why (radio buttons: price, not using, missing feature, competitor, budget, other)
- Step 2: Based on reason, offer contextual save play:
  - Price → Downgrade offer or annual discount
  - Not using → Pause offer (30-60 days)
  - Missing feature → Feature roadmap + timeline
  - Competitor → Flag for recovery call
  - Budget → Pause offer
- Step 3: If still cancelling → Exit survey + "door is open" email

**Tools:** Stripe cancellation flow + Typeform/Google Forms + Zapier

**Expected Outcome:** 20-40% save rate (downgrade + pause combined)

</RevealSection>

<RevealSection title="5. Expansion Opportunity Alerts">

**Trigger:** Green zone account shows expansion signals (high usage, all features adopted, long tenure)

**Automation:**
- Weekly scan: Identify Green accounts with usage patterns matching higher plan tier
- Alert you with: Account name, current plan, suggested upgrade, usage data
- You decide: Send personalized upgrade email or wait

**Tools:** Google Sheets health score tracker + Zapier + usage data from product analytics

**Expected Outcome:** 10-20% upgrade conversion rate for well-timed offers

</RevealSection>

</ProgressiveReveal>

## Monthly Retrospective: Learning from Your Data

Every month, spend 30-60 minutes reviewing your retention system performance and updating your playbook.

<TemplateBuilder
  title="Monthly Retention Retrospective"
  persistKey="retention-L10-retrospective"
  sections={[
    {
      id: "metrics",
      title: "Key Metrics Review",
      fields: [
        { 
          id: "churn-rate", 
          label: "Monthly Churn Rate (This Month vs Last Month)", 
          placeholder: "e.g., 5.2% → 4.1% (21% improvement)", 
          type: "text" 
        },
        { 
          id: "nrr", 
          label: "Net Revenue Retention (This Month)", 
          placeholder: "e.g., 98% (target: 100%+)", 
          type: "text" 
        },
        { 
          id: "reactivation-rate", 
          label: "Reactivation Sequence Success Rate", 
          placeholder: "e.g., 8% of dormant users re-engaged", 
          type: "text" 
        },
        { 
          id: "save-rate", 
          label: "Save Play Success Rate", 
          placeholder: "e.g., 35% of cancellation attempts saved (downgrade + pause)", 
          type: "text" 
        }
      ]
    },
    {
      id: "patterns",
      title: "Patterns Noticed",
      fields: [
        { 
          id: "churn-reasons", 
          label: "Top 3 Churn Reasons This Month", 
          placeholder: "e.g., 1. Not using it (40%), 2. Too expensive (25%), 3. Missing feature (20%)", 
          type: "textarea" 
        },
        { 
          id: "cohort-insights", 
          label: "Cohort Analysis Insights", 
          placeholder: "e.g., March cohort has 15% better retention than January — onboarding improvements working", 
          type: "textarea" 
        },
        { 
          id: "feature-adoption", 
          label: "Feature Adoption Patterns", 
          placeholder: "e.g., Users who adopt Feature B in first 14 days have 3x lower churn", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "actions",
      title: "Playbook Updates",
      fields: [
        { 
          id: "what-worked", 
          label: "What Worked (Keep Doing)", 
          placeholder: "e.g., Personal calls to high-value Red accounts saved 50% of them", 
          type: "textarea" 
        },
        { 
          id: "what-didnt", 
          label: "What Didn't Work (Stop or Change)", 
          placeholder: "e.g., Generic reactivation Email 2 had &lt;10% open rate — needs more personalization", 
          type: "textarea" 
        },
        { 
          id: "experiments", 
          label: "Next Month's Experiments", 
          placeholder: "e.g., Test pause offer vs downgrade offer for 'too expensive' cancellations", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

## The Retention System Maturity Model

Your retention system will evolve over time. Here's what "good" looks like at each stage:

<SlideNavigation>
<Slide title="Stage 1: Reactive (Where You Started)">

**Characteristics:**
- No health scoring
- Churn discovered when customer cancels
- No reactivation sequences
- No save plays
- 5-8% monthly churn

**Time Investment:** 5-10 hours/week firefighting

</Slide>

<Slide title="Stage 2: Basic System (After 14-Day Sprint)">

**Characteristics:**
- Health score model in place
- Automated reactivation sequences running
- Basic save plays (downgrade/pause offers)
- Weekly CS review block scheduled
- 4-6% monthly churn

**Time Investment:** 2-3 hours/week on weekly review + ad-hoc interventions

</Slide>

<Slide title="Stage 3: Optimized System (3-6 Months In)">

**Characteristics:**
- Health score refined based on data
- Feature adoption nudges increase stickiness
- Save plays customized by segment
- Monthly retrospectives drive continuous improvement
- 3-4% monthly churn, NRR approaching 100%

**Time Investment:** 2-3 hours/week on weekly review, minimal firefighting

</Slide>

<Slide title="Stage 4: Predictive System (6-12 Months In)">

**Characteristics:**
- Churn prediction 4-6 weeks in advance
- Expansion playbook integrated with retention
- Customer success becomes a revenue driver (NRR >100%)
- Playbook documented well enough to train a CS hire
- &lt;3% monthly churn, NRR 105-110%

**Time Investment:** 2-3 hours/week on strategic review, system runs itself

</Slide>
</SlideNavigation>

<RangeSlider 
  label="What stage is your retention system at right now?" 
  min={1} 
  max={4} 
  lowLabel="Stage 1 (Reactive)" 
  highLabel="Stage 4 (Predictive)" 
  persistKey="retention-L10-maturity" 
/>

## Common Pitfalls and How to Avoid Them

<ProgressiveReveal title="The 5 Retention System Failure Modes" persistKey="retention-L10-pitfalls">

<RevealSection title="1. Over-Automating (The 'Set It and Forget It' Trap)">

**Symptom:** You build all the automations, then never check if they're working. Reactivation emails go to spam, save plays fail silently, health scores drift out of sync.

**Fix:** Monthly automation health check. Test each sequence, review deliverability, check alert triggers. Automation needs maintenance.

</RevealSection>

<RevealSection title="2. Analysis Paralysis (The 'Perfect Health Score' Trap)">

**Symptom:** You spend weeks tweaking your health score model, adding more signals, adjusting weights. You never actually use it to intervene.

**Fix:** Start with the simple 3-dimension model (Usage 40% + Engagement 30% + Business 30%). Run it for a month. Refine based on real outcomes, not theory.

</RevealSection>

<RevealSection title="3. Ignoring Yellow Zone (The 'Red Alert Only' Trap)">

**Symptom:** You only act on Red zone accounts (urgent churn risk). Yellow zone accounts drift into Red before you notice.

**Fix:** Yellow zone is where you have the highest save rate (40-60%). Proactive outreach to Yellow accounts prevents them from becoming Red.

</RevealSection>

<RevealSection title="4. Generic Save Plays (The 'One Size Fits All' Trap)">

**Symptom:** You offer the same downgrade or pause to every cancellation, regardless of reason. Save rate stays low.

**Fix:** Contextual save plays based on cancellation reason. Price objection → downgrade. Not using it → pause + reactivation support. Competitor → recovery call.

</RevealSection>

<RevealSection title="5. No Retrospectives (The 'Groundhog Day' Trap)">

**Symptom:** You run the same playbook month after month without learning from data. Churn stays flat.

**Fix:** Monthly retrospective. What worked? What didn't? What experiments should you run next month? Update playbook based on evidence.

</RevealSection>

</ProgressiveReveal>

## Your Final Implementation Sprint

You've built the foundation. Now execute.

<InteractiveChecklist 
  title="Your 14-Day Retention System Sprint" 
  persistKey="retention-L10-final-sprint"
  items={[
    "Days 1-3: Health score setup, churn signal tracking, benchmark analysis",
    "Days 4-7: Reactivation sequence, feature nudges, save plays, automation testing",
    "Days 8-10: Playbook documentation, weekly review template, calendar block scheduled",
    "Days 11-14: First weekly review, Top 3 execution, automation monitoring, first retrospective",
    "Month 2: Run weekly reviews consistently, track metrics, conduct first monthly retrospective",
    "Month 3: Refine playbook based on data, optimize save plays, reduce churn by 25%+"
  ]} 
/>

## The Retention Mindset Shift

The biggest shift isn't tactical — it's mental.

**Before:** "I'll deal with churn when it happens."

**After:** "I prevent churn before it happens."

**Before:** "Retention is about saving customers who want to leave."

**After:** "Retention is about making customers successful so they never want to leave."

**Before:** "I don't have time for retention — I'm too busy acquiring new customers."

**After:** "Retention is my highest-leverage growth activity. A 2% churn reduction is worth more than a 10% acquisition increase."

<ConceptReframe
  concept="Retention"
  defaultLens="technical-founder"
  lenses={[
    { 
      id: "technical-founder", 
      label: "Technical Founder", 
      explanation: "Retention is like optimizing your database queries. You could keep throwing more servers at the problem (acquisition), or you could fix the inefficiency (churn). Fixing churn compounds forever." 
    },
    { 
      id: "coach", 
      label: "Coach", 
      explanation: "Retention is like client transformation. You don't just deliver the program and hope they succeed. You check in, adjust the plan, celebrate wins, and support through obstacles. That's what keeps them enrolled and referring." 
    },
    { 
      id: "creator", 
      label: "Creator", 
      explanation: "Retention is like building a loyal audience. You don't just post and disappear. You engage, respond, create what they ask for, and show up consistently. That's what turns followers into superfans." 
    }
  ]}
/>

## What Success Looks Like in 90 Days

If you execute this playbook consistently for 90 days, here's what you should see:

<ScenarioSimulator
  title="Your 90-Day Retention Projection"
  persistKey="retention-L10-projection"
  levers={[
    { id: "currentChurn", label: "Current Monthly Churn (%)", min: 3, max: 10, step: 0.5, defaultValue: 5 },
    { id: "customers", label: "Current Customer Count", min: 20, max: 500, step: 10, defaultValue: 100 },
    { id: "arpu", label: "Average Revenue Per User ($)", min: 50, max: 500, step: 10, defaultValue: 100 }
  ]}
  outputs={[
    { 
      id: "currentChurnMRR", 
      label: "Current Monthly Churn Loss", 
      formula: "(customers * arpu * (currentChurn / 100))", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "targetChurn", 
      label: "Target Churn (25% reduction)", 
      formula: "(currentChurn * 0.75)", 
      unit: "%", 
      precision: 1 
    },
    { 
      id: "targetChurnMRR", 
      label: "Target Monthly Churn Loss", 
      formula: "(customers * arpu * (targetChurn / 100))", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "monthlySavings", 
      label: "Monthly MRR Saved", 
      formula: "(currentChurnMRR - targetChurnMRR)", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "annualImpact", 
      label: "Annual MRR Impact", 
      formula: "(monthlySavings * 12)", 
      unit: "$", 
      precision: 0 
    }
  ]}
  insight="At {targetChurn}% monthly churn, you save ${monthlySavings}/month or ${annualImpact}/year. That's enough to fund your entire tool stack and then some."
/>

## Your Retention Playbook Checklist

Before you close this lesson, make sure you have:

<InteractiveChecklist 
  title="Retention Playbook Completion Checklist" 
  persistKey="retention-L10-completion"
  items={[
    "Health scoring model built and documented",
    "7 churn signals tracked with red thresholds",
    "Reactivation sequence (3 emails) live and tested",
    "Feature adoption drip schedule configured",
    "Cancellation flow with save plays implemented",
    "Weekly CS review template created and calendar block scheduled",
    "Playbook document created (Google Doc/Notion) with all protocols",
    "First weekly review completed",
    "First monthly retrospective scheduled",
    "Automation health check scheduled (monthly recurring)"
  ]} 
/>

## The Compound Effect of Retention

Here's the truth about retention that most founders miss:

**Acquisition is linear. Retention is exponential.**

If you acquire 10 new customers per month at 5% churn:
- Month 1: 10 customers
- Month 6: 47 customers (not 60 — you lost 13 to churn)
- Month 12: 77 customers (not 120 — you lost 43 to churn)

If you acquire 10 new customers per month at 3% churn:
- Month 1: 10 customers
- Month 6: 54 customers (7 more than 5% churn)
- Month 12: 96 customers (19 more than 5% churn)

**That 2% churn reduction is worth 19 customers in 12 months.** At $100 ARPU, that's $1,900 MRR you didn't have to acquire.

And it compounds every month after that.

<InsightCard icon="💡" title="The Retention Multiplier">
A 2% reduction in monthly churn is worth 10-20% more revenue in 12 months without acquiring a single new customer. That's the power of retention.
</InsightCard>

## What's Next

You've built your retention playbook. Now you need to **execute it consistently** for 90 days.

**Week 1:** Run your first weekly CS review. Execute your Top 3 actions. Document what you learn.

**Week 2-4:** Keep running weekly reviews. Monitor automation. Adjust based on early data.

**Month 2:** Conduct your first monthly retrospective. Update your playbook. Celebrate wins.

**Month 3:** By now, retention should feel like a system, not a scramble. Churn should be trending down. NRR should be approaching 100%.

**Month 4+:** You're in optimization mode. Refine save plays, test new feature nudges, expand into proactive expansion plays.

And when you're ready to scale beyond solo founder capacity, your documented playbook becomes the training manual for your first CS hire.

---

**Congratulations.** You've completed Course 37: Retention & Churn Prevention.

You now have:
- A health scoring model that detects risk early
- Automated sequences that intervene proactively
- Save plays that recover at-risk accounts
- A weekly review system that runs on 2-3 hours/week
- A playbook that compounds value every month

**The next step:** Execute your 14-day sprint. Build the system. Run it for 90 days. Watch your churn drop and your NRR rise.

Retention isn't sexy. But it's the highest-leverage growth activity you can do as a solo founder.

Now go prevent some churn. 🚀