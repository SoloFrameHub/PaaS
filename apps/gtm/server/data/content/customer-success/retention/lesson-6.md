---
title: "Feature Adoption Nudges"
duration: "45 min"
track: "Customer Success"
course: "Course 37: Retention & Churn Prevention"
lesson: 6
---

# Feature Adoption Nudges

## The $2,400 Feature Nobody Knew Existed

Sarah ran a project management tool for creative agencies. She'd spent three months building a "Client Portal" feature that let agencies share project updates with their clients—eliminating the endless "what's the status?" emails that plagued her users.

She launched it with a banner announcement. 200 customers saw it. 12 clicked. 3 actually used it.

Six months later, she was reviewing churn data and noticed something shocking: **every single customer who used the Client Portal feature was still paying. Zero churn.** Meanwhile, customers who only used the basic task management? 8% monthly churn.

She did the math: if she could get just 50 more customers to adopt Client Portal, she'd retain an extra $2,400/month in MRR. That's $28,800/year. From a feature that already existed.

The problem wasn't the feature. It was that **nobody knew it existed, why it mattered, or when to use it.**

This lesson is about fixing that gap—systematically.

---

## Why Feature Adoption = Retention Insurance

<InsightCard icon="🔒" title="The Switching Cost Multiplier">
A customer using 1 feature can switch to a competitor in 10 minutes. A customer using 3+ features has workflows, data, and habits locked in. Switching cost goes from zero to "this would take me a week to recreate."
</InsightCard>

Here's the retention data that matters:

<FlipCard 
  front="Single-Feature Users" 
  back="Churn at 2-3x the rate of multi-feature users. They see your product as a commodity—easily replaceable." 
/>

<FlipCard 
  front="3+ Feature Users" 
  back="Churn 50-70% less. They've integrated your product into multiple workflows. Switching means retraining their team." 
/>

The brutal truth: **60% of SaaG features go completely unused by the average customer.** Not because the features are bad—because customers don't know they exist, don't understand the value, or never hit the moment where they'd naturally discover them.

Your job isn't to build more features. It's to **get customers using the features that already create stickiness.**

<RangeSlider 
  label="What % of your features does the average customer actually use?" 
  min={10} 
  max={100} 
  lowLabel="10% (most unused)" 
  highLabel="100% (all features)" 
  persistKey="retention-L6-feature-usage" 
/>

---

## The Feature Adoption Funnel (And Where It Breaks)

Most features die at **Awareness**—customers don't know the feature exists. The ones that survive Awareness often die at **Trial**—customers know it exists but never actually try it.

Here's the full funnel:

<SlideNavigation>
<Slide title="Stage 1: Awareness">

**The Problem:** Your customer has no idea the feature exists.

**Why It Happens:**
- Buried in settings or a submenu
- Launched with a single email that 40% of customers never opened
- No in-app discovery mechanism

**The Fix:** Multi-channel awareness nudges at the right moment.

</Slide>

<Slide title="Stage 2: Trial">

**The Problem:** Customer knows it exists but hasn't tried it.

**Why It Happens:**
- Unclear value proposition ("What does this actually do for me?")
- Perceived complexity ("This looks hard to set up")
- No triggering moment ("I don't need this right now")

**The Fix:** Contextual nudges tied to user behavior + low-friction trial.

</Slide>

<Slide title="Stage 3: Adoption">

**The Problem:** Customer tried it once, never came back.

**Why It Happens:**
- Didn't see immediate value
- Friction in the workflow
- Forgot it existed after the first use

**The Fix:** Habit-building nudges + visible value reinforcement.

</Slide>

<Slide title="Stage 4: Habitual Use">

**The Problem:** Customer uses it occasionally, not consistently.

**Why It Happens:**
- Not integrated into daily workflow
- Competing with existing tools/habits
- No reminder system

**The Fix:** Workflow integration + usage-triggered encouragement.

</Slide>
</SlideNavigation>

<ExampleCard label="Case Study: The 3-Feature Threshold">
A B2B analytics tool tracked retention by feature usage. Customers who used only the dashboard: 7% monthly churn. Customers who used dashboard + reports: 4% churn. Customers who used dashboard + reports + integrations: **1.5% churn**.

The company shifted their entire onboarding to push users toward those 3 features within the first 14 days. Churn dropped from 6% to 3.2% in 6 months.
</ExampleCard>

---

## Identifying Your "Sticky Features"

Not all features are created equal. Some features, when adopted, dramatically reduce churn. Others are nice-to-haves that don't move the retention needle.

Your first job: **figure out which features actually create stickiness.**

### The Sticky Feature Analysis

<TemplateBuilder
  title="Sticky Feature Identifier"
  persistKey="retention-L6-sticky-features"
  sections={[
    {
      id: "feature-list",
      title: "Feature Inventory",
      fields: [
        { 
          id: "feature1", 
          label: "Feature 1 Name", 
          placeholder: "e.g., Client Portal", 
          type: "text" 
        },
        { 
          id: "feature1-adoption", 
          label: "Estimated % of customers using it", 
          placeholder: "e.g., 15%", 
          type: "text" 
        },
        { 
          id: "feature2", 
          label: "Feature 2 Name", 
          placeholder: "e.g., Automated Reports", 
          type: "text" 
        },
        { 
          id: "feature2-adoption", 
          label: "Estimated % of customers using it", 
          placeholder: "e.g., 40%", 
          type: "text" 
        },
        { 
          id: "feature3", 
          label: "Feature 3 Name", 
          placeholder: "e.g., Slack Integration", 
          type: "text" 
        },
        { 
          id: "feature3-adoption", 
          label: "Estimated % of customers using it", 
          placeholder: "e.g., 8%", 
          type: "text" 
        }
      ]
    },
    {
      id: "hypothesis",
      title: "Stickiness Hypothesis",
      fields: [
        { 
          id: "sticky-feature", 
          label: "Which feature do you think creates the most stickiness?", 
          placeholder: "e.g., Client Portal—because it involves their clients, creating external dependency", 
          type: "textarea" 
        },
        { 
          id: "validation-plan", 
          label: "How will you validate this?", 
          placeholder: "e.g., Compare churn rate of users who adopted this feature vs. those who didn't", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

### The Quick Validation Method (No Analytics Tool Required)

If you don't have fancy product analytics, here's the manual version:

1. **Export your customer list** with MRR and signup date
2. **Tag each customer** with which features they use (check your database or ask your support team)
3. **Segment into two groups**: customers who churned in the last 90 days vs. customers still active after 6+ months
4. **Compare feature usage** between the two groups

The features that show up way more often in the "still active" group? Those are your sticky features.

<InsightCard icon="📊" title="The 2x Rule">
If a feature is used by 60% of retained customers but only 20% of churned customers, that's a 3x difference—a strong stickiness signal. Prioritize nudging everyone toward that feature.
</InsightCard>

---

## The Drip Feature Introduction Strategy

Here's what **doesn't** work: throwing all your features at a customer on Day 1.

Here's what **does** work: introducing features progressively, tied to customer readiness and context.

### The 30-Day Drip Schedule

<SlideNavigation>
<Slide title="Day 1-3: Core Feature Only">

**Goal:** Get the customer to their first win with the absolute core feature.

**Why:** Cognitive load. If you show them 10 features, they'll use zero. If you show them 1, they'll master it.

**Example Nudge:** "Welcome! Let's get your first [core action] done in the next 5 minutes."

</Slide>

<Slide title="Day 7: Second Feature Introduction">

**Goal:** Introduce a complementary feature that builds on the core workflow.

**Trigger:** Customer has completed 3+ core actions.

**Example Nudge:** "You've created 5 projects—nice! Did you know you can automate status updates with our Reports feature? Here's how →"

</Slide>

<Slide title="Day 14: Third Feature Introduction">

**Goal:** Introduce a feature that solves a pain point they've likely encountered by now.

**Trigger:** Customer has used the product 5+ times.

**Example Nudge:** "We noticed you're manually updating clients. Our Client Portal lets them check status themselves—saves you 2 hours/week. Want to try it?"

</Slide>

<Slide title="Day 30: Power Features">

**Goal:** Introduce advanced features for engaged users.

**Trigger:** Customer is in the top 30% of usage.

**Example Nudge:** "You're a power user! Here are 3 advanced features most customers don't discover until month 3: [list]. Which one would help you most?"

</Slide>

<Slide title="Day 60+: Expansion Features">

**Goal:** Introduce features that tie to upsells or integrations.

**Trigger:** Customer has adopted 3+ features and is in "Green" health zone.

**Example Nudge:** "You're getting great results with [product]. Ready to level up? Our [premium feature] helps customers like you [specific outcome]."

</Slide>
</SlideNavigation>

<InsightCard icon="⏱️" title="The 1-Per-Week Rule">
Never introduce more than 1 new feature per week via email. More than that creates "feature fatigue"—customers tune out and miss everything.
</InsightCard>

---

## Nudge Types: In-App vs. Email vs. Contextual

Different nudge channels work for different adoption stages.

### Channel Effectiveness by Stage

<ClassifyExercise
  title="Match the Nudge to the Stage"
  persistKey="retention-L6-nudge-matching"
  categories={[
    { id: "awareness", label: "Best for Awareness", color: "#3b82f6" },
    { id: "trial", label: "Best for Trial", color: "#f59e0b" },
    { id: "adoption", label: "Best for Adoption", color: "#10b981" }
  ]}
  items={[
    { 
      id: "1", 
      content: "In-app tooltip that appears when user hovers over a menu item", 
      correctCategory: "awareness",
      explanation: "Tooltips create passive awareness without interrupting workflow"
    },
    { 
      id: "2", 
      content: "Email with 'Try this feature in 2 minutes' video walkthrough", 
      correctCategory: "trial",
      explanation: "Email gives space to explain value and reduce perceived complexity"
    },
    { 
      id: "3", 
      content: "Usage-triggered message: 'You just did X—did you know Y makes it 3x faster?'", 
      correctCategory: "trial",
      explanation: "Contextual nudges catch users at the perfect moment of need"
    },
    { 
      id: "4", 
      content: "Weekly digest showing 'You saved 4 hours this week using [feature]'", 
      correctCategory: "adoption",
      explanation: "Visible value reinforcement builds habits"
    },
    { 
      id: "5", 
      content: "Feature spotlight in monthly newsletter", 
      correctCategory: "awareness",
      explanation: "Broad reach, low friction, good for discovery"
    }
  ]}
/>

### The 3 Nudge Formats That Work

**1. The "You're Already Doing X" Nudge**

Best for: Trial stage
Channel: In-app or email
Example: "We noticed you're manually exporting reports every week. Our Scheduled Reports feature does this automatically—want to set it up?"

**Why it works:** Ties the new feature to an existing pain point they're actively experiencing.

**2. The "Pro Tip" Nudge**

Best for: Awareness → Trial
Channel: Email
Example: "Pro tip: 80% of our power users enable [feature] within their first month. Here's why →"

**Why it works:** Social proof + curiosity + low-pressure invitation.

**3. The "Milestone Unlock" Nudge**

Best for: Adoption stage
Channel: In-app celebration
Example: "🎉 You've completed 10 projects! You've unlocked access to our Advanced Analytics dashboard. Check it out →"

**Why it works:** Gamification + reward feeling + natural progression.

<ComparisonBuilder
  title="Write Your Feature Nudge"
  persistKey="retention-L6-nudge-draft"
  prompt="Pick one of your sticky features and write a 'You're Already Doing X' nudge email (2-3 sentences)"
  expertExample="Subject: Save 2 hours/week on client updates

Hi [Name],

I noticed you've been manually updating clients on project status—we've all been there! Our Client Portal feature lets clients check progress themselves, which saves our users about 2 hours per week.

Want to try it? I can set it up for you in 5 minutes: [link]"
  criteria={[
    "References a specific pain point the customer is experiencing",
    "Quantifies the benefit (time saved, effort reduced)",
    "Low-friction CTA (quick setup, trial, or demo)"
  ]}
/>

---

## Usage-Triggered Nudges: The 3x Adoption Multiplier

The most effective nudges aren't scheduled—they're **triggered by user behavior.**

### The Trigger → Nudge Logic

<TemplateBuilder
  title="Usage-Triggered Nudge Builder"
  persistKey="retention-L6-trigger-nudges"
  sections={[
    {
      id: "trigger1",
      title: "Trigger 1",
      fields: [
        { 
          id: "behavior", 
          label: "User behavior that triggers the nudge", 
          placeholder: "e.g., User manually exports a report for the 3rd time", 
          type: "text" 
        },
        { 
          id: "feature", 
          label: "Feature to introduce", 
          placeholder: "e.g., Scheduled Reports", 
          type: "text" 
        },
        { 
          id: "nudge-copy", 
          label: "Nudge message", 
          placeholder: "e.g., 'Looks like you export reports often! Want to automate this?'", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "trigger2",
      title: "Trigger 2",
      fields: [
        { 
          id: "behavior", 
          label: "User behavior that triggers the nudge", 
          placeholder: "e.g., User invites their 3rd team member", 
          type: "text" 
        },
        { 
          id: "feature", 
          label: "Feature to introduce", 
          placeholder: "e.g., Team Permissions", 
          type: "text" 
        },
        { 
          id: "nudge-copy", 
          label: "Nudge message", 
          placeholder: "e.g., 'Your team is growing! Set custom permissions to control who sees what.'", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

### Common Trigger Patterns

| User Behavior | Feature to Introduce | Why It Works |
|---------------|---------------------|--------------|
| Completes core action 5+ times | Automation feature | They've proven they do this regularly—automation is obvious value |
| Invites 2+ team members | Collaboration features | Team size signals need for coordination tools |
| Manually does something 3+ times | Feature that automates it | Repetition = pain point |
| Reaches a usage milestone | Advanced/premium feature | Engagement signals readiness for complexity |
| Exports data | Integration or API access | They're trying to use data elsewhere—make it easier |

<InsightCard icon="🎯" title="The 3x Rule">
Usage-triggered nudges have 3x the adoption rate of untriggered suggestions. Why? Because you're catching the customer at the exact moment they need the feature.
</InsightCard>

---

## The Feature Adoption Dashboard (What to Track)

You don't need Mixpanel or Amplitude. A simple spreadsheet tracking 4 metrics per feature is enough.

### The 4 Metrics That Matter

<SlideNavigation>
<Slide title="Metric 1: Awareness %">

**What it measures:** % of customers who know the feature exists

**How to track:** Survey ("Did you know we have [feature]?") or proxy metric (clicked on feature in menu, opened feature page)

**Good target:** 70%+ for core features, 40%+ for advanced features

</Slide>

<Slide title="Metric 2: Trial %">

**What it measures:** % of aware customers who tried the feature at least once

**How to track:** Event tracking (feature used at least 1 time)

**Good target:** 40%+ for core features, 20%+ for advanced features

</Slide>

<Slide title="Metric 3: Adoption %">

**What it measures:** % of trial users who use the feature regularly (3+ times)

**How to track:** Event tracking (feature used 3+ times in 30 days)

**Good target:** 50%+ for sticky features

</Slide>

<Slide title="Metric 4: Stickiness Score">

**What it measures:** Churn rate difference between users who adopt this feature vs. those who don't

**How to track:** Cohort analysis (churn rate of adopters vs. non-adopters)

**Good target:** 2x+ difference (e.g., 2% churn for adopters vs. 5% for non-adopters)

</Slide>
</SlideNavigation>

### The Simple Tracking Template

| Feature | Awareness % | Trial % | Adoption % | Stickiness Score | Priority |
|---------|------------|---------|------------|-----------------|----------|
| Client Portal | 40% | 20% | 15% | High (1.5% churn vs 6%) | **Nudge awareness** |
| Scheduled Reports | 70% | 50% | 30% | Medium (4% vs 6%) | Nudge trial → adoption |
| Slack Integration | 60% | 30% | 10% | Low (5% vs 6%) | Investigate: is it useful? |
| Advanced Analytics | 30% | 15% | 10% | High (2% vs 6%) | **Nudge awareness** |

**Priority logic:**
- High stickiness + low awareness = **nudge awareness hard**
- High awareness + low trial = **reduce friction, clarify value**
- High trial + low adoption = **improve onboarding or feature UX**
- Low stickiness = **don't invest in nudges; investigate if feature is valuable**

<ScenarioSimulator
  title="Feature Adoption ROI Calculator"
  persistKey="retention-L6-roi-simulator"
  levers={[
    { 
      id: "customers", 
      label: "Total customers", 
      min: 50, 
      max: 500, 
      step: 10, 
      defaultValue: 200 
    },
    { 
      id: "currentAdoption", 
      label: "Current feature adoption %", 
      min: 5, 
      max: 50, 
      step: 5, 
      defaultValue: 15 
    },
    { 
      id: "targetAdoption", 
      label: "Target feature adoption %", 
      min: 10, 
      max: 80, 
      step: 5, 
      defaultValue: 40 
    },
    { 
      id: "churnReduction", 
      label: "Churn reduction for adopters (percentage points)", 
      min: 1, 
      max: 10, 
      step: 1, 
      defaultValue: 4 
    },
    { 
      id: "arpu", 
      label: "ARPU ($)", 
      min: 20, 
      max: 500, 
      step: 10, 
      defaultValue: 100 
    }
  ]}
  outputs={[
    { 
      id: "newAdopters", 
      label: "New adopters", 
      formula: "customers * ((targetAdoption - currentAdoption) / 100)", 
      unit: " customers", 
      precision: 0 
    },
    { 
      id: "monthlyMRRSaved", 
      label: "Monthly MRR saved", 
      formula: "(customers * ((targetAdoption - currentAdoption) / 100)) * arpu * (churnReduction / 100)", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "annualImpact", 
      label: "Annual impact", 
      formula: "(customers * ((targetAdoption - currentAdoption) / 100)) * arpu * (churnReduction / 100) * 12", 
      unit: "$", 
      precision: 0 
    }
  ]}
  insight="Getting {newAdopters} more customers to adopt this feature would save ${monthlyMRRSaved}/month in prevented churn—that's ${annualImpact}/year."
/>

---

## Building Your 30-Day Feature Adoption Campaign

Let's put it all together into a concrete 30-day execution plan.

<TemplateBuilder
  title="Your Feature Adoption Campaign"
  persistKey="retention-L6-campaign-plan"
  sections={[
    {
      id: "feature-selection",
      title: "Step 1: Choose Your Feature",
      fields: [
        { 
          id: "feature-name", 
          label: "Feature name", 
          placeholder: "e.g., Client Portal", 
          type: "text" 
        },
        { 
          id: "why-sticky", 
          label: "Why is this feature sticky?", 
          placeholder: "e.g., Creates external dependency (clients use it), reduces manual work", 
          type: "textarea" 
        },
        { 
          id: "current-adoption", 
          label: "Current adoption rate", 
          placeholder: "e.g., 15%", 
          type: "text" 
        },
        { 
          id: "target-adoption", 
          label: "30-day adoption target", 
          placeholder: "e.g., 35%", 
          type: "text" 
        }
      ]
    },
    {
      id: "awareness-nudges",
      title: "Step 2: Awareness Nudges (Week 1-2)",
      fields: [
        { 
          id: "email-subject", 
          label: "Feature spotlight email subject line", 
          placeholder: "e.g., 'The feature 80% of power users enable'", 
          type: "text" 
        },
        { 
          id: "email-body", 
          label: "Email body (2-3 sentences + CTA)", 
          placeholder: "Explain value, show social proof, link to demo", 
          type: "textarea" 
        },
        { 
          id: "inapp-tooltip", 
          label: "In-app tooltip copy", 
          placeholder: "e.g., 'New: Let clients check project status themselves'", 
          type: "text" 
        }
      ]
    },
    {
      id: "trial-nudges",
      title: "Step 3: Trial Nudges (Week 2-3)",
      fields: [
        { 
          id: "trigger-behavior", 
          label: "What user behavior triggers the trial nudge?", 
          placeholder: "e.g., User manually updates a client for the 3rd time", 
          type: "text" 
        },
        { 
          id: "trigger-message", 
          label: "Triggered nudge message", 
          placeholder: "e.g., 'Looks like you update clients often! Want to automate this?'", 
          type: "textarea" 
        },
        { 
          id: "setup-help", 
          label: "How will you reduce setup friction?", 
          placeholder: "e.g., 2-minute video walkthrough, offer to set it up for them", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "adoption-nudges",
      title: "Step 4: Adoption Nudges (Week 3-4)",
      fields: [
        { 
          id: "value-reinforcement", 
          label: "How will you show visible value?", 
          placeholder: "e.g., Weekly email: 'You saved 3 hours this week using Client Portal'", 
          type: "textarea" 
        },
        { 
          id: "habit-building", 
          label: "What habit-building mechanism will you use?", 
          placeholder: "e.g., Daily digest showing client activity, gamification milestone", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## Common Feature Adoption Mistakes (And How to Avoid Them)

<SwipeDecision
  title="Good Nudge or Bad Nudge?"
  description="Swipe right for effective nudges, left for ineffective ones"
  optionA="Bad Nudge"
  optionB="Good Nudge"
  persistKey="retention-L6-nudge-quality"
  cards={[
    { 
      id: "1", 
      content: "Subject: Check out our new feature!\n\nBody: We just launched [feature]. Click here to learn more.", 
      correctOption: "a",
      explanation: "Too vague. No value proposition, no context, no reason to care. Open rate: ~5%."
    },
    { 
      id: "2", 
      content: "Subject: Save 2 hours/week on client updates\n\nBody: I noticed you manually update clients often. Our Client Portal automates this—clients check status themselves. Want to try it?", 
      correctOption: "b",
      explanation: "Specific pain point, quantified benefit, low-friction CTA. Open rate: ~30%."
    },
    { 
      id: "3", 
      content: "In-app modal that blocks the entire screen: 'Try our 15 new features!'", 
      correctOption: "a",
      explanation: "Interrupts workflow, overwhelming, creates feature fatigue. Adoption rate: &lt;5%."
    },
    { 
      id: "4", 
      content: "You just exported a report for the 3rd time. [Tooltip appears] 'Want to automate this? Set up Scheduled Reports →'", 
      correctOption: "b",
      explanation: "Contextual, triggered by behavior, solves immediate pain. Adoption rate: ~25%."
    },
    { 
      id: "5", 
      content: "Monthly newsletter with 10 feature updates buried in paragraph 5", 
      correctOption: "a",
      explanation: "Lost in noise, no prioritization, no clear CTA. Adoption rate: &lt;2%."
    }
  ]}
/>

### The 5 Deadly Sins of Feature Nudges

1. **The Feature Dump** — Introducing 5+ features at once. Result: customer tries zero.
2. **The Jargon Trap** — "Enable our ML-powered predictive analytics dashboard!" Translation: nobody knows what that means.
3. **The Interruption Bomb** — Full-screen modals that block workflow. Result: customer closes it and never sees it again.
4. **The Timing Fail** — Introducing advanced features to brand-new customers. Result: overwhelm and churn.
5. **The Invisible Nudge** — Burying feature announcements in a monthly newsletter. Result: 2% read rate.

---

## Your Feature Adoption Action Plan

<InteractiveChecklist 
  title="30-Day Feature Adoption Sprint" 
  persistKey="retention-L6-action-items" 
  items={[
    "Identify your top 3 sticky features (highest churn reduction for adopters)",
    "Build a feature adoption tracking spreadsheet (Awareness %, Trial %, Adoption %, Stickiness Score)",
    "Choose 1 feature to focus on for the next 30 days",
    "Write 3 nudge emails: Awareness (Week 1), Trial (Week 2), Adoption (Week 3)",
    "Set up 2 usage-triggered nudges (in-app or email) tied to customer behavior",
    "Create a 2-minute feature demo video or walkthrough",
    "Schedule weekly review: track adoption %, adjust nudges based on response",
    "Measure results at Day 30: adoption rate increase, churn impact, MRR saved"
  ]} 
/>

---

## What's Next

You've built your feature adoption system. Next lesson: **Save Plays—Downgrades, Pauses, and Recovery Calls.** When a customer signals intent to cancel, you have 3 options that are all better than losing them completely. We'll build the scripts, decision trees, and automation that turn cancellation requests into retention wins.

---

```json
{
  "quiz": {
    "title": "Feature Adoption Mastery Check",
    "questions": [
      {
        "id": "q1",
        "question": "A customer using 3+ features churns at what rate compared to single-feature users?",
        "options": [
          "10-20% less",
          "30-40% less",
          "50-70% less",
          "Same rate"
        ],
        "correctAnswer": 2,
        "explanation": "Multi-feature users churn 50-70% less because they've integrated your product into multiple workflows, creating high switching costs."
      },
      {
        "id": "q2",
        "question": "What % of SaaS features go completely unused by the average customer?",
        "options": [
          "20%",
          "40%",
          "60%",
          "80%"
        ],
        "correctAnswer": 2,
        "explanation": "60% of SaaS features go unused—not because they're bad, but because customers don't know they exist or understand their value."
      },
      {
        "id": "q3",
        "question": "When should you introduce advanced features to a new customer?",
        "options": [
          "Day 1 (show everything upfront)",
          "Day 7 (after core feature mastery)",
          "Day 30 (after they're engaged)",
          "Never (let them discover on their own)"
        ],
        "correctAnswer": 2,
        "explanation": "Day 30+ is optimal for advanced features. Introduce them after the customer has adopted 2-3 core features and proven engagement."
      },
      {
        "id": "q4",
        "question": "Usage-triggered nudges have what adoption rate compared to untriggered nudges?",
        "options": [
          "Same rate",
          "1.5x higher",
          "3x higher",
          "10x higher"
        ],
        "correctAnswer": 2,
        "explanation": "Usage-triggered nudges have 3x the adoption rate because they catch customers at the exact moment they need the feature."
      },
      {
        "id": "q5",
        "question": "Your feature has high stickiness (2% churn for adopters vs 6% for non-adopters) but only 20% awareness. What's your priority?",
        "options": [
          "Improve the feature UX",
          "Nudge awareness hard",
          "Focus on a different feature",
          "Wait for organic discovery"
        ],
        "correctAnswer": 1,
        "explanation": "High stickiness + low awareness = massive opportunity. Nudge awareness aggressively—every new adopter dramatically reduces churn."
      }
    ]
  }
}