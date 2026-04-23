---
title: "Product-Led SaaS: 90-Day Milestone Map"
duration: "55 min"
track: "Customer Success"
course: "Course 36: Customer Onboarding"
lesson: 2
---

## The $40K Mistake That Taught Me Everything About Milestones

Sarah launched her project management SaaS in January. By March, she had 120 signups. By May, she had 8 paying customers.

The math didn't add up. She had a 93% churn rate.

When she finally interviewed churned users, the pattern was brutal: "I signed up, clicked around for 10 minutes, got confused, and forgot about it."

They never created a project. They never invited a team member. They never experienced the core value proposition: automated status reports that saved 5 hours/week.

Sarah had built onboarding emails. She had tutorial videos. She had a knowledge base.

But she had never defined **what success looked like in the first 7 days**.

She spent the next month mapping every action her 8 retained customers took in their first 90 days. She found the pattern: they all created their first project within 48 hours, invited at least one team member by day 5, and generated their first automated report by day 7.

Those three milestones became her onboarding system.

Six months later, her trial-to-paid conversion went from 7% to 52%.

**This lesson is about building your milestone map** — the specific, measurable actions that predict whether a customer will stay or churn.

---

## The Milestone vs. Feature Trap

Most founders confuse **feature adoption** with **value realization**.

<FlipCard 
  front="What's the difference between a feature and a milestone?" 
  back="A feature is something your product does. A milestone is something your customer achieves. Features are about you. Milestones are about them." 
/>

Here's the trap: you build onboarding that teaches features ("Here's how to use the dashboard!" "Check out our integrations!") when you should be guiding toward **outcomes** ("Create your first automated report in 3 minutes").

<InsightCard icon="🎯" title="The Retention-Predicting Question">
Don't ask "Did they use Feature X?" Ask "Did they achieve Outcome Y that makes them need us tomorrow?"
</InsightCard>

Let's diagnose where you are right now:

<RangeSlider 
  label="How clearly can you describe what 'success in the first week' looks like for your customers?" 
  min={1} 
  max={10} 
  lowLabel="No idea" 
  highLabel="Crystal clear" 
  persistKey="onboarding-L2-clarity" 
/>

If you scored below 7, you're not alone. Most solo founders can't answer this question without guessing.

**By the end of this lesson, you'll have a specific, measurable answer.**

---

## The SaaS Journey: Six Stages from Signup to Renewal

Every SaaS customer moves through the same journey. The speed and success rate vary wildly based on your onboarding system.

<SlideNavigation>
<Slide title="Stage 1: Signup">

**What happens:** Customer creates an account, confirms email, lands on your dashboard for the first time.

**The risk:** 40-60% of signups never return after their first session.

**Your job:** Get them to take **one meaningful action** before they close the tab.

**Time window:** 0-15 minutes

**Example milestone:** "Account setup complete" — profile filled, workspace named, first integration connected.

</Slide>

<Slide title="Stage 2: Setup">

**What happens:** Customer configures your product to fit their context — connects tools, imports data, customizes settings.

**The risk:** If setup takes >30 minutes, 70% abandon.

**Your job:** Make setup feel like progress, not homework.

**Time window:** Day 1

**Example milestone:** "First data source connected" or "Team workspace created"

</Slide>

<Slide title="Stage 3: First Use">

**What happens:** Customer attempts the core action your product was built for.

**The risk:** If they don't understand how to do it, they'll never try again.

**Your job:** Guide them to this action with a checklist, tooltip, or 90-second video.

**Time window:** Day 1-3

**Example milestone:** "First project created" or "First report generated"

</Slide>

<Slide title="Stage 4: First Value">

**What happens:** Customer experiences a tangible outcome that justifies the purchase decision.

**The risk:** This is the retention cliff. If they don't hit this by Day 7, churn probability jumps to 80%+.

**Your job:** Celebrate this moment. Make it feel like a win.

**Time window:** Day 3-7

**Example milestone:** "First automated workflow saved 2 hours" or "First client report sent"

</Slide>

<Slide title="Stage 5: Habit Formation">

**What happens:** Customer returns 3+ times in a week and integrates your product into their routine.

**The risk:** Shallow engagement — they use it once/week instead of daily.

**Your job:** Introduce a second use case or workflow to deepen engagement.

**Time window:** Day 14-30

**Example milestone:** "Used product 10+ times" or "Explored second feature set"

</Slide>

<Slide title="Stage 6: Expansion">

**What happens:** Customer adds team members, upgrades plan, or expands usage.

**The risk:** They plateau at basic usage and never see the full value.

**Your job:** Show them what's possible at the next tier.

**Time window:** Day 60-90

**Example milestone:** "Invited 3+ team members" or "Hit usage limit on current plan"

</Slide>
</SlideNavigation>

Now let's map **your** product to this journey.

---

## Building Your 90-Day Milestone Map

This is where theory becomes practice. You're going to define 5-7 specific milestones that predict retention for your SaaS product.

<TemplateBuilder
  title="Your SaaS Milestone Map"
  persistKey="onboarding-L2-milestones"
  sections={[
    {
      id: "day1",
      title: "Day 1: Setup Complete",
      fields: [
        { 
          id: "setup-action", 
          label: "What's the ONE action that means 'setup is done'?", 
          placeholder: "e.g., Connected Stripe account, Imported first 100 contacts, Created workspace", 
          type: "text" 
        },
        { 
          id: "setup-why", 
          label: "Why does this matter for retention?", 
          placeholder: "e.g., Can't generate reports without data", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "day3",
      title: "Day 3: First Core Action",
      fields: [
        { 
          id: "core-action", 
          label: "What's the core action your product was built for?", 
          placeholder: "e.g., Created first project, Sent first campaign, Ran first analysis", 
          type: "text" 
        },
        { 
          id: "core-trigger", 
          label: "How will you know when they've done it? (What event/data point?)", 
          placeholder: "e.g., 'project_created' event in analytics", 
          type: "text" 
        }
      ]
    },
    {
      id: "day7",
      title: "Day 7: First Value Outcome",
      fields: [
        { 
          id: "value-outcome", 
          label: "What tangible result proves your product works?", 
          placeholder: "e.g., Generated first automated report, Saved 2 hours on manual work, Got first lead", 
          type: "text" 
        },
        { 
          id: "value-metric", 
          label: "How will you measure this? (What's the success metric?)", 
          placeholder: "e.g., Report generated AND downloaded, Time saved > 1 hour", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "day14",
      title: "Day 14: Second Use Case",
      fields: [
        { 
          id: "second-usecase", 
          label: "What's the second workflow or feature that deepens engagement?", 
          placeholder: "e.g., Set up automation, Invited team member, Explored integrations", 
          type: "text" 
        }
      ]
    },
    {
      id: "day30",
      title: "Day 30: Habit Established",
      fields: [
        { 
          id: "habit-metric", 
          label: "What usage pattern indicates they've made this a habit?", 
          placeholder: "e.g., Logged in 10+ times, Created 5+ projects, Sent 3+ reports", 
          type: "text" 
        }
      ]
    },
    {
      id: "day60",
      title: "Day 60: Expansion Signal",
      fields: [
        { 
          id: "expansion-action", 
          label: "What action indicates they're ready to expand usage?", 
          placeholder: "e.g., Hit seat limit, Requested enterprise feature, Invited 5+ users", 
          type: "text" 
        }
      ]
    }
  ]}
/>

**What you just built:** A retention prediction model. Every customer who hits these milestones has an 80%+ chance of staying past 90 days.

---

## The "Magic Number" — Finding Your Retention-Predicting Action

Slack discovered that teams who sent 2,000 messages had a 93% retention rate.

Dropbox found that users who put at least one file in one folder on one device were far more likely to become long-term customers.

These are "magic numbers" — the specific threshold where engagement predicts retention.

**You need to find yours.**

<ExampleCard label="Case Study: The 3-Project Threshold">

Marcus ran a freelance project management tool. He analyzed his retained vs. churned customers and found:

- Customers who created 1 project: 22% retention
- Customers who created 2 projects: 41% retention  
- Customers who created 3+ projects: 78% retention

His magic number was **3 projects created in the first 14 days**.

He rebuilt his entire onboarding system around one goal: get every new user to create 3 projects by Day 14.

He added:
- An in-app checklist: "Create your first 3 projects"
- Email nudges at Day 3, 7, and 10 if they hadn't hit 3 yet
- A celebration email when they hit project #3

Result: Trial-to-paid conversion jumped from 18% to 47% in 8 weeks.

</ExampleCard>

Here's how to find your magic number:

<InteractiveChecklist 
  title="Magic Number Discovery Process" 
  persistKey="onboarding-L2-magic-number" 
  items={[
    "Export a list of customers who stayed >90 days (retained cohort)",
    "Export a list of customers who churned in first 90 days (churned cohort)",
    "For each cohort, track: logins, core actions, feature usage in first 30 days",
    "Look for the action where retained customers have 2-3x higher frequency than churned",
    "Find the threshold: 'X actions in Y days predicts retention'",
    "Test: Does this threshold hold across multiple cohorts?",
    "Build onboarding to drive every customer toward this threshold"
  ]} 
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">

You can automate this analysis with SQL or Python:

```sql
SELECT 
  user_id,
  COUNT(core_action) as action_count,
  CASE WHEN churned_at IS NULL THEN 'retained' ELSE 'churned' END as cohort
FROM users
WHERE created_at > DATE_SUB(NOW(), INTERVAL 6 MONTHS)
GROUP BY user_id, cohort
```

Look for the action_count threshold where retained % jumps significantly.

</ContextualNote>

---

## Milestone-Triggered Interventions: The Email Sequence Architecture

Now that you have milestones, you need **interventions** — automated emails triggered when customers hit (or miss) each milestone.

<ComparisonBuilder
  title="Milestone Email: First Value Achieved"
  persistKey="onboarding-L2-email-compare"
  prompt="Write the email you'd send when a customer achieves their first value outcome (Day 7 milestone)"
  expertExample="Subject: You just saved 2 hours 🎉

Hi [Name],

I noticed you generated your first automated report this morning — congrats!

That report used to take your team 2+ hours to build manually. Now it's 3 clicks.

Here's what to do next: set up a weekly schedule so this report lands in your inbox every Monday at 9am. Takes 60 seconds → [Link to scheduling guide]

Most customers who automate their first report end up creating 3-4 more within the next two weeks. Each one saves time you can spend on actual strategy instead of spreadsheet wrangling.

Let me know if you hit any snags.

— Sarah"
  criteria={[
    "Celebrates the specific achievement",
    "Quantifies the value (time saved, outcome achieved)",
    "Provides a clear, actionable next step",
    "Sets expectation for what's possible next",
    "Personal tone (from founder, not 'the team')"
  ]}
/>

**The pattern:** Celebrate → Quantify → Guide → Expand

Every milestone email should follow this structure.

---

## The Stalled Onboarding Detector

Not every customer hits milestones on schedule. Some stall at Day 3. Others ghost after signup.

You need a **detection system** that flags at-risk customers before they churn silently.

<ClassifyExercise
  title="Classify These Onboarding Scenarios"
  persistKey="onboarding-L2-classify"
  categories={[
    { id: "on-track", label: "On Track", color: "#10b981" },
    { id: "stalled", label: "Stalled (Needs Nudge)", color: "#f59e0b" },
    { id: "at-risk", label: "At Risk (Needs Personal Outreach)", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Day 5: Logged in 3 times, created 2 projects, hasn't generated a report yet", 
      correctCategory: "on-track",
      explanation: "Active engagement, just hasn't hit Day 7 milestone yet. Send a nudge email with report tutorial."
    },
    { 
      id: "2", 
      content: "Day 8: Signed up, confirmed email, never logged in again", 
      correctCategory: "at-risk",
      explanation: "Zero engagement after signup. Needs personal outreach: 'I noticed you haven't logged in yet — need help getting started?'"
    },
    { 
      id: "3", 
      content: "Day 4: Logged in once on Day 1, completed setup, hasn't returned", 
      correctCategory: "stalled",
      explanation: "Completed setup but didn't take core action. Send 'Did you try X yet?' nudge with direct link."
    },
    { 
      id: "4", 
      content: "Day 10: Created 1 project, logged in 8 times, generated 3 reports", 
      correctCategory: "on-track",
      explanation: "Exceeded Day 7 milestone. Send celebration email + introduce second use case."
    },
    { 
      id: "5", 
      content: "Day 6: Logged in daily, clicked around, hasn't created anything", 
      correctCategory: "stalled",
      explanation: "High engagement but no progress. Likely confused. Send help offer: 'I see you've been exploring — want a quick walkthrough?'"
    },
    {
      id: "6",
      content: "Day 14: Hit all milestones through Day 7, hasn't logged in since Day 9",
      correctCategory: "stalled",
      explanation: "Strong start, then dropped off. Send re-engagement: 'You were doing great — what happened?'"
    }
  ]}
/>

**The detection rules:**

| Scenario | Trigger | Intervention |
|----------|---------|-------------|
| No login by Day 3 | 3 days after signup, zero sessions | Personal email: "Need help getting started?" |
| Setup incomplete by Day 2 | 2 days after signup, setup milestone not hit | Nudge email: "Finish setup in 3 minutes" + link |
| No core action by Day 5 | 5 days after signup, core action not taken | Help offer: "Want a quick walkthrough?" |
| No first value by Day 8 | 8 days after signup, Day 7 milestone missed | Personal outreach: "What's blocking you?" |
| Engagement drop after Day 7 | Hit Day 7 milestone, then 4+ days no login | Re-engagement: "You were doing great — miss you!" |

---

## Segmenting Onboarding by Plan Tier

Not all customers need the same onboarding intensity.

<StrategyDuel
  title="Free Trial vs. Paid Customer Onboarding"
  persistKey="onboarding-L2-duel"
  scenario="You have 50 new signups this week: 40 free trials, 10 paid customers. You have 3 hours for onboarding work."
  strategyA={{ 
    name: "Equal Treatment", 
    description: "Send the same email sequence and in-app checklist to everyone", 
    pros: ["Simpler to manage", "Consistent experience"], 
    cons: ["Wastes time on low-intent free users", "Doesn't prioritize high-value customers"] 
  }}
  strategyB={{ 
    name: "Tiered Onboarding", 
    description: "Automate free trial onboarding, do personal outreach for paid customers", 
    pros: ["Focuses founder time on revenue", "Higher ROI per hour"], 
    cons: ["More complex to set up", "Free users get less attention"] 
  }}
  expertVerdict="Tiered wins for solo founders. Your time is the constraint. Automate the many, personalize the few. Free trials get email sequence + in-app checklist. Paid customers get that PLUS a personal welcome email and Day 3 check-in call."
/>

**The tiering model:**

| Tier | ARPU | Onboarding Approach | Founder Time/Customer |
|------|------|---------------------|----------------------|
| Free trial | $0 | Automated email sequence + in-app checklist | 0 minutes |
| Self-serve paid (&lt;$50/mo) | $20-50 | Automated sequence + stalled user alerts | 5 minutes (if stalled) |
| Mid-tier ($50-200/mo) | $100 | Automated + personal welcome email + Day 7 check-in | 15 minutes |
| High-tier (>$200/mo) | $300+ | Automated + personal welcome + Day 3 call + weekly check-ins | 45 minutes |

<RangeSlider 
  label="What's your average revenue per user (ARPU) per month?" 
  min={0} 
  max={500} 
  step={10}
  lowLabel="$0" 
  highLabel="$500+" 
  persistKey="onboarding-L2-arpu" 
/>

Based on your ARPU, you should be spending:
- **&lt;$50/mo:** 0-5 minutes per customer (automate everything)
- **$50-200/mo:** 10-20 minutes per customer (automate + selective personal touch)
- **>$200/mo:** 30-60 minutes per customer (high-touch onboarding)

---

## The In-App Checklist: Your Onboarding North Star

Email sequences are great. But the highest-converting onboarding intervention is **an in-app checklist** visible on the dashboard.

<InsightCard icon="✅" title="The Checklist Effect">

Users who complete an onboarding checklist are 3x more likely to become long-term customers. Why? Because checklists create a sense of progress and give users a clear path to value.

</InsightCard>

Here's how to design yours:

**The 3-5 Item Rule:** Your checklist should have 3-5 items max. Each item = one milestone from your 90-day map.

**The First Item Should Take &lt;3 Minutes:** If the first item is hard, 60% won't start.

**Each Item Should Link Directly to the Action:** Not "Learn about projects" → "Create your first project" with a button that opens the project creation modal.

<TemplateBuilder
  title="Your In-App Onboarding Checklist"
  persistKey="onboarding-L2-checklist"
  sections={[
    {
      id: "checklist",
      title: "Checklist Items (3-5 max)",
      fields: [
        { 
          id: "item1", 
          label: "Item 1 (Easiest, &lt;3 min)", 
          placeholder: "e.g., ✓ Complete your profile", 
          type: "text" 
        },
        { 
          id: "item1-link", 
          label: "Where does this link to?", 
          placeholder: "e.g., Profile settings page", 
          type: "text" 
        },
        { 
          id: "item2", 
          label: "Item 2 (Core action)", 
          placeholder: "e.g., ✓ Create your first project", 
          type: "text" 
        },
        { 
          id: "item2-link", 
          label: "Where does this link to?", 
          placeholder: "e.g., 'New Project' button", 
          type: "text" 
        },
        { 
          id: "item3", 
          label: "Item 3 (First value)", 
          placeholder: "e.g., ✓ Generate your first automated report", 
          type: "text" 
        },
        { 
          id: "item3-link", 
          label: "Where does this link to?", 
          placeholder: "e.g., Reports page with 'Generate Report' CTA", 
          type: "text" 
        },
        { 
          id: "item4", 
          label: "Item 4 (Optional: Second use case)", 
          placeholder: "e.g., ✓ Invite a team member", 
          type: "text" 
        },
        { 
          id: "item5", 
          label: "Item 5 (Optional: Expansion)", 
          placeholder: "e.g., ✓ Set up your first automation", 
          type: "text" 
        }
      ]
    },
    {
      id: "celebration",
      title: "Completion Celebration",
      fields: [
        { 
          id: "celebration-message", 
          label: "What happens when they complete the checklist?", 
          placeholder: "e.g., Confetti animation + 'You're all set! Here's what to explore next...'", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

**Technical implementation options:**

| Approach | Complexity | Cost | Solo Fit |
|----------|-----------|------|----------|
| Custom HTML/CSS checklist in your app | Medium | Free | High (if you're technical) |
| UserGuiding | Low | $89/mo | High |
| Appcues | Low | $249/mo | Medium (expensive) |
| Notion embed (for low-code products) | Low | Free | Medium (hacky but works) |

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">

You can build a simple checklist with React in ~2 hours:

```jsx
const OnboardingChecklist = () => {
  const [completed, setCompleted] = useState({
    profile: false,
    firstProject: false,
    firstReport: false
  });

  return (
    <div className="checklist">
      <h3>Get Started in 3 Steps</h3>
      <ChecklistItem 
        done={completed.profile} 
        label="Complete your profile"
        onClick={() => navigate('/settings')}
      />
      {/* ... */}
    </div>
  );
};
```

Store completion state in your database and trigger celebration when all items are checked.

</ContextualNote>

---

## Measuring Success: The 3 Onboarding Metrics That Matter

You've built your milestone map. You've designed your checklist. Now: how do you know if it's working?

Track these three metrics:

### 1. Time-to-First-Value (TTFV)

**Definition:** Median time from signup to Day 7 milestone (first value outcome)

**Target:** &lt;24 hours for self-serve SaaS, &lt;7 days for high-touch

**How to measure:** 
```
TTFV = MEDIAN(first_value_timestamp - signup_timestamp)
```

**Why it matters:** Every hour you reduce TTFV, retention improves by ~2-5%.

### 2. Milestone Completion Rate

**Definition:** % of customers who hit each milestone by the target day

**Target:** 
- Day 1 (Setup): 70%+
- Day 7 (First Value): 50%+
- Day 30 (Habit): 30%+

**How to measure:** Track each milestone as an event, calculate % of cohort who triggered it

**Why it matters:** This tells you where customers are getting stuck

### 3. 90-Day Retention by Milestone

**Definition:** Retention rate for customers who hit vs. missed each milestone

**Target:** 2-3x higher retention for milestone-completers

**How to measure:** Cohort analysis comparing retained % for milestone-hit vs. milestone-missed groups

**Why it matters:** Validates that your milestones actually predict retention

<ScenarioSimulator
  title="Onboarding Metrics Simulator"
  persistKey="onboarding-L2-simulator"
  levers={[
    { id: "signups", label: "New signups/month", min: 10, max: 500, step: 10, defaultValue: 100 },
    { id: "ttfv", label: "TTFV (hours)", min: 1, max: 168, step: 1, defaultValue: 48 },
    { id: "milestoneRate", label: "Day 7 milestone completion (%)", min: 10, max: 90, step: 5, defaultValue: 40 }
  ]}
  outputs={[
    { 
      id: "retained", 
      label: "Customers retained at 90 days", 
      formula: "signups * (milestoneRate / 100) * 0.8 + signups * (1 - milestoneRate / 100) * 0.15", 
      unit: "", 
      precision: 0 
    },
    { 
      id: "churnCost", 
      label: "Monthly churn cost (at $100 ARPU)", 
      formula: "signups * (1 - ((milestoneRate / 100) * 0.8 + (1 - milestoneRate / 100) * 0.15)) * 100", 
      unit: "$", 
      precision: 0 
    }
  ]}
  insight="At {milestoneRate}% Day 7 completion, you're retaining ~`{retained}` customers/month. Improving milestone completion by 10% would save ${churnCost * 0.1}/month in churn."
/>

**The optimization loop:**

1. Measure current TTFV and milestone completion rates
2. Identify the biggest drop-off point (e.g., 70% hit Day 1, only 30% hit Day 7)
3. Add intervention at that point (email nudge, in-app tooltip, personal outreach)
4. Re-measure after 2 weeks
5. Repeat

---

## Your 14-Day Implementation Sprint

You've learned the framework. Now it's time to build.

<InteractiveChecklist 
  title="Your Milestone Map Implementation Sprint" 
  persistKey="onboarding-L2-sprint" 
  items={[
    "Week 1, Day 1-2: Analyze retained vs. churned customers to find your magic number",
    "Week 1, Day 3-4: Define your 5-7 milestones using the template from this lesson",
    "Week 1, Day 5-7: Build your in-app onboarding checklist (or set up UserGuiding)",
    "Week 2, Day 1-3: Write your milestone-triggered email sequence (7 emails)",
    "Week 2, Day 4-5: Set up stalled user detection (Zapier + email alerts)",
    "Week 2, Day 6: Launch to new signups and measure baseline metrics",
    "Week 2, Day 7: Review first week of data and identify biggest drop-off point"
  ]} 
/>

**What you'll have in 14 days:**
- A milestone map that predicts retention
- An in-app checklist that guides customers to first value
- An automated email sequence triggered by milestone completion/failure
- A stalled user detection system that flags at-risk customers
- Baseline metrics (TTFV, milestone completion rates, 90-day retention)

---

## Common Mistakes (And How to Avoid Them)

<SwipeDecision
  title="Good Milestone or Bad Milestone?"
  description="Swipe right for retention-predicting milestones, left for vanity metrics"
  optionA="Vanity Metric"
  optionB="Real Milestone"
  persistKey="onboarding-L2-swipe"
  cards={[
    { 
      id: "1", 
      content: "User watched the tutorial video", 
      correctOption: "a", 
      explanation: "Watching ≠ doing. This doesn't predict retention. Better: 'User completed the action shown in the tutorial.'" 
    },
    { 
      id: "2", 
      content: "User created their first automated report", 
      correctOption: "b", 
      explanation: "This is a concrete outcome that delivers value. Retention-predicting." 
    },
    { 
      id: "3", 
      content: "User logged in 5 times", 
      correctOption: "a", 
      explanation: "Logins without outcomes = confusion, not engagement. Better: 'User completed 3 core actions.'" 
    },
    { 
      id: "4", 
      content: "User invited 2 team members who both logged in", 
      correctOption: "b", 
      explanation: "Team adoption = stickiness. This predicts retention." 
    },
    { 
      id: "5", 
      content: "User clicked on 10 different features", 
      correctOption: "a", 
      explanation: "Exploration without completion = lost. Better: 'User completed workflow in 2 different features.'" 
    },
    {
      id: "6",
      content: "User hit their usage limit on the free plan",
      correctOption: "b",
      explanation: "This signals value realization and expansion readiness. Strong retention predictor."
    }
  ]}
/>

**The biggest mistake:** Confusing activity with progress. Logins, clicks, and pageviews don't predict retention. **Outcomes do.**

---

## Next Lesson Preview

You've built your SaaS milestone map. In Lesson 3, we'll tackle the **services and coaching version** — how to structure a 90-day delivery rhythm when the product IS the relationship.

You'll learn:
- The kickoff call framework that sets expectations and prevents scope creep
- How to design a "working agreement" that reduces churn by 35%
- The weekly/biweekly session cadence that maximizes results without burning you out
- How to handle the mid-point review (Day 45) that predicts renewal decisions

**Before the next lesson:** Complete your milestone map using the templates in this lesson. You'll need it for the service/coaching comparison exercise.

---

## Quiz: Test Your Milestone Mapping Skills

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What's the primary difference between a feature and a milestone?",
      "options": [
        "Features are technical, milestones are business outcomes",
        "Features are what your product does, milestones are what your customer achieves",
        "Features are for developers, milestones are for customers",
        "Features are measurable, milestones are subjective"
      ],
      "correctAnswer": 1,
      "explanation": "Milestones focus on customer outcomes, not product capabilities. 'Generated first report' (milestone) vs 'Has a reporting feature' (feature)."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "According to the lesson, what % of SaaS churn happens in the first 90 days?",
      "options": [
        "20-30%",
        "40-60%",
        "70-80%",
        "90%+"
      ],
      "correctAnswer": 1,
      "explanation": "40-60% of all SaaS churn happens in the first 90 days, making onboarding the highest-leverage retention investment."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "What's the target Time-to-First-Value (TTFV) for self-serve SaaS products?",
      "options": [
        "Under 1 hour",
        "Under 24 hours",
        "Under 7 days",
        "Under 30 days"
      ],
      "correctAnswer": 1,
      "explanation": "Self-serve SaaS should target TTFV under 24 hours. Every hour you reduce TTFV improves retention by 2-5%."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "A customer signed up 8 days ago, completed setup on Day 1, but hasn't logged in since. How should you classify them?",
      "options": [
        "On track",
        "Stalled (needs nudge)",
        "At risk (needs personal outreach)",
        "Churned"
      ],
      "correctAnswer": 2,
      "explanation": "Zero engagement after initial setup by Day 8 = at risk. This requires personal outreach, not just an automated nudge."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "What's the optimal length for an in-app onboarding checklist?",
      "options": [
        "1-2 items",
        "3-5 items",
        "7-10 items",
        "As many as needed to cover all features"
      ],
      "correctAnswer": 1,
      "explanation": "3-5 items max. More than that overwhelms users and reduces completion rates. Focus on milestones, not features."
    },
    {
      "id": "q6",
      "type": "true-false",
      "question": "True or False: Free trial users and paid customers should receive identical onboarding experiences.",
      "correctAnswer": false,
      "explanation": "False. Tiered onboarding is more efficient for solo founders. Automate free trials, add personal touch for paid customers based on ARPU."
    },
    {
      "id": "q7",
      "type": "multiple-choice",
      "question": "According to the lesson, users who complete an onboarding checklist are how much more likely to become long-term customers?",
      "options": [
        "1.5x",
        "2x",
        "3x",
        "5x"
      ],
      "correctAnswer": 2,
      "explanation": "3x more likely. Checklists create a sense of progress and give users a clear path to value."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "What's the 'magic number' concept in SaaS onboarding?",
      "options": [
        "The number of features a user must try",
        "The number of days until first payment",
        "A specific action threshold that predicts retention",
        "The number of support tickets before churn"
      ],
      "correctAnswer": 2,
      "explanation": "The magic number is a retention-predicting action threshold (e.g., Slack's 2,000 messages, or 3 projects created in 14 days)."
    }
  ]
}