---
title: "Automating Onboarding with Zapier/Make/n8n"
duration: "50 min"
track: "Customer Success"
course: "Course 36: Customer Onboarding"
lesson: 8
---

# Automating Onboarding with Zapier/Make/n8n

You're 6 weeks into your new SaaS product. You have 23 active customers. Every morning starts the same way: check who signed up overnight, send a personal welcome email, check who hasn't logged in, send a nudge, check who hit their first milestone, send congratulations. By 10am, you've spent 90 minutes on onboarding emails alone.

Then a customer Slacks you: "I signed up 3 days ago and haven't heard anything. Is this thing working?"

You forgot to send their welcome email. You were in flow state building a feature.

**This is the onboarding automation breaking point.** Manual processes work until they don't. And when they break, customers notice immediately.

The good news? Five automations — taking 4-6 hours to build once — can handle 80% of your onboarding workflow forever.

<InsightCard icon="⚡" title="The Automation Paradox">
The founders who resist automation because "it feels impersonal" are the same ones who forget to email customers for 3 days. Automated care beats inconsistent personal touch every time.
</InsightCard>

## The 5 Core Onboarding Automations

Most solo founders think they need 47 Zapier workflows to automate onboarding. You need **five**. Here they are:

<FlipCard 
  front="Automation #1: Welcome Sequence Trigger" 
  back="When a customer is created in your system, start a 7-email welcome sequence in your ESP. This is the foundation — everything else builds on it." 
/>

<FlipCard 
  front="Automation #2: Milestone Celebration" 
  back="When a customer completes a core action (first project, first report, first invite), send a congratulation email within 1 hour. Behavioral triggers beat time-based drips 3:1." 
/>

<FlipCard 
  front="Automation #3: Stalled User Alert" 
  back="If no login/activity for 5 days after signup, trigger: (1) nudge email to customer, (2) Slack notification to you, (3) CRM flag. This catches 60% of silent churn before it happens." 
/>

<FlipCard 
  front="Automation #4: Day 7 First-Win Check" 
  back="7 days after signup, check: did they achieve first value? If yes → celebration email. If no → help offer email. This is the retention cliff intervention." 
/>

<FlipCard 
  front="Automation #5: Day 45 Check-In Trigger" 
  back="45 days after signup, send NPS survey + personal 'How's it going?' email from you. This catches the second churn window before renewal decisions start." 
/>

<RangeSlider 
  label="How many of these 5 automations do you currently have running?" 
  min={0} 
  max={5} 
  lowLabel="None" 
  highLabel="All 5" 
  persistKey="onboarding-L8-current-automations" 
/>

## Zapier vs Make vs n8n: Which Tool for Solo Founders?

You don't need to pick the "best" tool. You need to pick the one that fits your **technical comfort level** and **budget**.

<SlideNavigation>
<Slide title="Zapier: Easiest, Most Expensive">

**Best for:** Non-technical founders who want point-and-click simplicity.

**Pricing (2025-2026):**
- Free: 100 tasks/month (enough for ~10 customers)
- Starter: $19.99/mo for 750 tasks (enough for ~75 customers)
- Professional: $49/mo for 2,000 tasks (enough for ~200 customers)

**Pros:**
- Largest app ecosystem (7,000+ integrations)
- Visual builder, no code required
- Best documentation and community support

**Cons:**
- Most expensive per task
- Limited conditional logic on lower tiers
- Can't self-host

**Solo founder fit:** High if budget allows. This is the "just works" option.

</Slide>

<Slide title="Make (formerly Integromat): Most Flexible">

**Best for:** Founders comfortable with visual logic builders who want more power per dollar.

**Pricing (2025-2026):**
- Free: 1,000 operations/month (enough for ~100 customers)
- Core: $10.59/mo for 10,000 ops (enough for ~1,000 customers)
- Pro: $18.82/mo for 10,000 ops + premium apps

**Pros:**
- 10x cheaper than Zapier per operation
- Visual scenario builder with advanced branching
- Better error handling and debugging
- Can process arrays/loops in one automation

**Cons:**
- Steeper learning curve than Zapier
- Smaller app ecosystem (~1,500 integrations)
- Less beginner-friendly documentation

**Solo founder fit:** High if you're willing to invest 2-3 hours learning the interface. Best ROI.

</Slide>

<Slide title="n8n: Self-Hosted, Unlimited">

**Best for:** Technical founders (can deploy to a VPS) who want unlimited operations and full control.

**Pricing (2025-2026):**
- Self-hosted: Free (pay only for VPS: $5-10/mo on DigitalOcean/Railway)
- Cloud: $20/mo for 2,500 executions

**Pros:**
- Unlimited operations if self-hosted
- Open source, fully customizable
- Can run custom code in workflows
- Best for complex, high-volume automations

**Cons:**
- Requires technical setup (Docker, VPS management)
- Smaller community than Zapier/Make
- You're responsible for uptime and maintenance

**Solo founder fit:** Medium-High for technical founders. Overkill if you're under 100 customers.

</Slide>
</SlideNavigation>

<StrategyDuel
  title="Zapier vs Make for Your First Automation"
  persistKey="onboarding-L8-tool-duel"
  scenario="You have 30 customers, $150/mo tool budget, and moderate technical comfort."
  strategyA={{
    name: "Start with Zapier",
    description: "Pay $19.99/mo for simplicity and speed",
    pros: ["Set up in 30 minutes", "Extensive tutorials", "Works with everything"],
    cons: ["Higher cost long-term", "Will need to upgrade at ~75 customers"]
  }}
  strategyB={{
    name: "Start with Make",
    description: "Invest 2-3 hours learning, pay $10.59/mo",
    pros: ["10x cheaper per operation", "Won't need to upgrade until 1,000 customers", "More powerful logic"],
    cons: ["Steeper learning curve", "Fewer integrations"]
  }}
  expertVerdict="For solo founders: Start with Make. The 2-3 hour learning investment pays off within 3 months. Zapier's simplicity advantage disappears once you've built your first automation — and Make's cost advantage compounds forever."
/>

## Building Your First Automation: Welcome Sequence Trigger

Let's build Automation #1 together. This is the foundation for everything else.

**The goal:** When a new customer is created in your system (Stripe, Gumroad, your app database), automatically start a 7-email welcome sequence in your ESP.

<ProgressiveReveal title="Step-by-Step: Welcome Sequence in Make" persistKey="onboarding-L8-welcome-build">

<RevealSection title="Step 1: Choose Your Trigger">

In Make, click **Create a new scenario**.

Your trigger options:
- **Stripe:** "Watch Customers" (fires when a new customer is created)
- **Gumroad:** "Watch Sales" (fires on new purchase)
- **Webhook:** Custom trigger from your app (if you control the backend)

For this example, we'll use **Stripe → Watch Customers**.

1. Add the Stripe module
2. Connect your Stripe account
3. Set the trigger to "Created" (not "Updated")
4. Test the connection — Make will pull your most recent customer

**What you'll see:** Customer data including email, name, created timestamp.

</RevealSection>

<RevealSection title="Step 2: Filter for Paying Customers Only">

You don't want to trigger onboarding for test accounts or failed payments.

Add a **Filter** between Stripe and your next step:

**Condition:** `Status = active` AND `Email does not contain "test"`

This ensures only real, paying customers trigger the sequence.

</RevealSection>

<RevealSection title="Step 3: Add Customer to ESP">

Now connect to your email service provider. Common options:

- **ConvertKit:** "Add Subscriber to Form" or "Add Tag"
- **Customer.io:** "Create or Update Person" + "Trigger Campaign"
- **Mailchimp:** "Add/Update Subscriber" + "Add to Automation"

For ConvertKit:
1. Add the ConvertKit module
2. Choose "Add Subscriber to Form"
3. Map fields:
   - Email → `{{Stripe.email}}`
   - Name → `{{Stripe.name}}`
   - Form → Select your "Welcome Sequence" form
4. Set "Resubscribe" to "Yes" (in case they previously unsubscribed)

**What happens:** Customer is added to ConvertKit, which automatically starts your pre-built 7-email sequence.

</RevealSection>

<RevealSection title="Step 4: Log to Your CRM (Optional but Recommended)">

Add one more step: log this customer to a Google Sheet or Airtable for tracking.

**Why?** Your ESP might not store all the data you need for CS. A simple tracker gives you:
- Signup date
- Plan tier
- Onboarding status
- Last activity date

Add a **Google Sheets** module:
1. Choose "Add a Row"
2. Map fields:
   - Email → `{{Stripe.email}}`
   - Name → `{{Stripe.name}}`
   - Signup Date → `{{Stripe.created}}`
   - Plan → `{{Stripe.plan.nickname}}`
   - Status → "Onboarding Started"

</RevealSection>

<RevealSection title="Step 5: Test End-to-End">

Before activating:

1. Click "Run once" in Make
2. Create a test customer in Stripe (use your own email with `+test` suffix)
3. Watch the automation run
4. Verify:
   - Email arrives in ConvertKit
   - Welcome sequence starts
   - Row appears in Google Sheet

**Common issues:**
- Email doesn't arrive → Check ConvertKit form automation is active
- Wrong data mapping → Click on each module to see what data is available
- Automation doesn't trigger → Check Stripe webhook is connected

</RevealSection>

<RevealSection title="Step 6: Activate and Monitor">

Once tested:
1. Click "Activate scenario" (toggle in top-right)
2. Set schedule to "Immediately" (real-time trigger)
3. Monitor for 48 hours — check the execution log for errors

**Pro tip:** Set up error notifications. In Make settings, add your email to "Send notifications on errors." You'll get alerted if the automation breaks.

</RevealSection>

</ProgressiveReveal>

<InteractiveChecklist 
  title="Welcome Sequence Automation Checklist" 
  persistKey="onboarding-L8-welcome-checklist" 
  items={[
    "Connected Stripe (or payment processor) to Make/Zapier",
    "Added filter for paying customers only",
    "Mapped customer data to ESP (ConvertKit/Customer.io/Mailchimp)",
    "Set up tracking sheet (Google Sheets/Airtable)",
    "Tested with a real signup",
    "Activated automation and enabled error notifications"
  ]} 
/>

## Automation #2: Milestone Celebration (Behavioral Trigger)

This is where automation gets powerful. Instead of time-based emails ("Day 3 email"), you trigger based on **what the customer does**.

**Example milestones:**
- SaaS: Created first project, invited first team member, ran first report
- Course: Completed first module, posted first implementation
- Service: Submitted first deliverable, attended first call

<ExampleCard label="Case Study: The 1-Hour Celebration Email">

**Product:** Project management SaaS for agencies

**Milestone:** Customer creates their first project

**Before automation:** Founder manually checked new projects daily, sent congratulations emails in batches. Average delay: 18 hours. Engagement: 12% click-through.

**After automation:** Webhook fires when project is created → Make sends congratulation email within 5 minutes. Engagement: 34% click-through.

**Why it worked:** Immediate positive reinforcement. The customer is still in the product when the email arrives. They click the "Next step" link and complete a second action.

**ROI:** 2 hours to build, saves 30 minutes/week, 3x engagement increase.

</ExampleCard>

### How to Build a Milestone Trigger

**Option 1: Webhook from Your App (Best)**

If you control your backend:
1. Add a webhook call when the milestone event happens
2. POST to Make/Zapier with customer email + milestone name
3. Automation sends the appropriate email

**Option 2: Database Polling (Fallback)**

If you can't add webhooks:
1. Make/Zapier checks your database every 15 minutes
2. Looks for new records in "projects" table (or equivalent)
3. Sends email for any new records since last check

**Option 3: Zapier App Integration**

Some apps have native integrations:
- **Memberstack:** Triggers on "Member Updated Custom Field"
- **Airtable:** Triggers on "New Record in View"
- **Webflow:** Triggers on "Form Submission"

<TemplateBuilder
  title="Milestone Celebration Email Template"
  persistKey="onboarding-L8-milestone-email"
  sections={[
    {
      id: "subject",
      title: "Subject Line",
      fields: [
        { 
          id: "subject", 
          label: "Subject", 
          placeholder: "e.g., You just created your first project! 🎉", 
          type: "text" 
        }
      ]
    },
    {
      id: "body",
      title: "Email Body",
      fields: [
        { 
          id: "greeting", 
          label: "Greeting", 
          placeholder: "e.g., Hey [Name],", 
          type: "text" 
        },
        { 
          id: "celebration", 
          label: "Celebration (1-2 sentences)", 
          placeholder: "e.g., Congrats on creating your first project in [Product]! This is the moment most customers realize how much time they're about to save.", 
          type: "textarea" 
        },
        { 
          id: "why-it-matters", 
          label: "Why This Milestone Matters", 
          placeholder: "e.g., Projects are the foundation of everything in [Product]. Now you can add tasks, invite team members, and track progress in one place.", 
          type: "textarea" 
        },
        { 
          id: "next-step", 
          label: "Next Step (Specific CTA)", 
          placeholder: "e.g., Your next step: Add 3 tasks to your project. Here's a 2-minute video showing how: [link]", 
          type: "textarea" 
        },
        { 
          id: "signature", 
          label: "Signature", 
          placeholder: "e.g., [Your Name], Founder of [Product]", 
          type: "text" 
        }
      ]
    }
  ]}
/>

## Automation #3: The Stalled Onboarding Detector

This is the automation that saves customers before they churn.

**The problem:** 60% of new customers never return after their first session. They sign up, look around, get confused or distracted, and disappear.

**The solution:** Detect stalled onboarding within 5 days and intervene.

### How to Detect "Stalled"

You need to track **3 signals**:

<ClassifyExercise
  title="Classify These Customers: Stalled or On Track?"
  persistKey="onboarding-L8-stalled-classify"
  categories={[
    { id: "stalled", label: "Stalled (Needs Intervention)", color: "#ef4444" },
    { id: "on-track", label: "On Track", color: "#10b981" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Signed up 6 days ago. Last login: Day 1. No core actions completed.", 
      correctCategory: "stalled" 
    },
    { 
      id: "2", 
      content: "Signed up 3 days ago. Logged in Days 1, 2, 3. Completed first milestone on Day 2.", 
      correctCategory: "on-track" 
    },
    { 
      id: "3", 
      content: "Signed up 4 days ago. Logged in Day 1 and Day 4. No core actions, but opened 2 support emails.", 
      correctCategory: "stalled" 
    },
    { 
      id: "4", 
      content: "Signed up 7 days ago. Last login: Day 5. Completed first milestone but hasn't returned since.", 
      correctCategory: "stalled" 
    },
    { 
      id: "5", 
      content: "Signed up 2 days ago. No logins yet, but replied to welcome email asking a question.", 
      correctCategory: "on-track" 
    }
  ]}
/>

### Building the Stalled User Automation

**Step 1: Define "Stalled" Logic**

In Make/Zapier, create a filter:

```
IF:
  - Days since signup >= 5
  - Last login date < 5 days ago
  - Core action completed = No
THEN: Trigger stalled intervention
```

**Step 2: Set Up the Trigger**

**Option A: Daily Batch Check (Easier)**
- Schedule: Every day at 9am
- Action: Query your database/CRM for customers matching "stalled" criteria
- For each match: Send email + Slack notification

**Option B: Real-Time Check (Better)**
- Trigger: Customer record updated (login timestamp changes)
- Filter: If last login was >5 days ago AND no core action
- Action: Send email + Slack notification

**Step 3: Multi-Channel Intervention**

When a customer is flagged as stalled, trigger **3 actions**:

1. **Email to customer:** "We noticed you haven't tried [core feature] yet. Need help getting started?"
2. **Slack notification to you:** "🚨 Stalled user: [Name] ([Email]) — signed up [X] days ago, no activity since Day 1"
3. **CRM flag:** Add tag "Stalled - Day 5" for tracking

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">

You can build a more sophisticated stalled detector using SQL queries or API calls. Example logic:

```sql
SELECT email, name, created_at, last_login_at
FROM customers
WHERE created_at < NOW() - INTERVAL '5 days'
  AND last_login_at < NOW() - INTERVAL '5 days'
  AND (SELECT COUNT(*) FROM events WHERE user_id = customers.id AND event_name = 'first_value_milestone') = 0
```

Pipe this into Make/Zapier via webhook for daily batch processing.

</ContextualNote>

<LinterFeedback
  title="Stalled User Email Linter"
  persistKey="onboarding-L8-stalled-linter"
  inputLabel="Paste your 'stalled user' email draft"
  rules={[
    { 
      id: "empathy", 
      label: "Empathy", 
      description: "Acknowledges the customer's situation without blame", 
      keywords: ["noticed", "haven't had a chance", "getting started can be tricky"], 
      antiKeywords: ["you forgot", "you haven't", "inactive"] 
    },
    { 
      id: "specific-help", 
      label: "Specific Help Offer", 
      description: "Offers concrete assistance, not generic 'let us know'", 
      keywords: ["15-minute call", "walk you through", "here's a video"], 
      antiKeywords: ["if you need help", "feel free to reach out"] 
    },
    { 
      id: "low-friction-cta", 
      label: "Low-Friction CTA", 
      description: "Makes the next step extremely easy", 
      keywords: ["click here", "reply to this email", "one click"], 
      antiKeywords: ["schedule a call", "fill out this form"] 
    }
  ]}
/>

## Automation #4: Day 7 First-Win Check (Conditional Logic)

This automation has **two paths** depending on whether the customer achieved first value.

### The Decision Tree

```
Day 7 after signup
  ↓
Did customer complete first-value milestone?
  ↓
YES → Send celebration email + next-step nudge
  ↓
NO → Send help offer email + link to quick-start guide
```

### How to Build Conditional Logic in Make

Make handles this beautifully with **Routers**.

**Step 1: Trigger**
- Schedule: Daily at 10am
- Action: Get all customers where `signup_date = 7 days ago`

**Step 2: Add Router**
- Router splits the flow into 2 paths

**Step 3: Path A (First Value Achieved)**
- Filter: `first_value_milestone = true`
- Action: Send "Congrats on your first win!" email
- Email includes: Next milestone suggestion

**Step 4: Path B (No First Value Yet)**
- Filter: `first_value_milestone = false`
- Action: Send "Need help getting started?" email
- Email includes: Link to 3-minute walkthrough video + offer for 15-min call

<DecisionTree
  title="Choose Your Day 7 Response"
  persistKey="onboarding-L8-day7-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Customer signed up 7 days ago. What's their status?", 
      choices: [
        { label: "Completed first-value milestone", nextNodeId: "celebrate" },
        { label: "Logged in but no milestone", nextNodeId: "nudge" },
        { label: "No logins since Day 1", nextNodeId: "rescue" }
      ]
    },
    { 
      id: "celebrate", 
      content: "Send: 'You just hit your first milestone! Here's what to try next: [second use case].' Result: 68% open rate, 34% click-through.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "nudge", 
      content: "Send: 'You're so close! Here's a 2-minute video showing how to [complete milestone].' Result: 45% open rate, 22% complete milestone within 48 hours.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "rescue", 
      content: "Send: 'We noticed you haven't logged in since Day 1. Want a quick walkthrough call?' Result: 28% open rate, 12% book call, 60% of those who book become active users.", 
      isTerminal: true, 
      outcome: "neutral" 
    }
  ]}
/>

## Automation #5: Day 45 Check-In Trigger

The final core automation: the mid-lifecycle check-in.

**Why Day 45?**
- Initial excitement has worn off
- Habits may not have formed yet
- Renewal decisions are approaching (for monthly plans)
- This is where **silent churn** starts

### What to Send

Two things:
1. **NPS Survey** (3 questions, 2 minutes to complete)
2. **Personal email from you** (genuine, human, asking "How's it going?")

### Building the Day 45 Automation

**Step 1: Trigger**
- Schedule: Daily at 9am
- Action: Get all customers where `signup_date = 45 days ago`

**Step 2: Send NPS Survey**
- Tool: Typeform, Tally, or Google Forms
- Questions:
  1. "On a scale of 0-10, how likely are you to recommend [Product] to a colleague?"
  2. "What's the one thing you'd improve?"
  3. "What's the biggest result you've achieved so far?"

**Step 3: Send Personal Email**
- From: Your personal email (not noreply@)
- Subject: "Quick check-in — how's [Product] working for you?"
- Body: 3-4 sentences, genuinely asking for feedback

**Step 4: Route NPS Responses**

Add a second automation triggered by survey completion:

```
IF NPS score = 9-10 (Promoter)
  → Send thank-you email + ask for testimonial

IF NPS score = 7-8 (Passive)
  → Send thank-you + ask "What would make this a 10?"

IF NPS score = 0-6 (Detractor)
  → Slack notification to you + personal outreach within 24 hours
```

<SwipeDecision
  title="NPS Response: Right Action or Wrong Action?"
  description="Swipe right for correct response, left for incorrect"
  optionA="Wrong Response"
  optionB="Right Response"
  persistKey="onboarding-L8-nps-swipe"
  cards={[
    { 
      id: "1", 
      content: "Customer gives NPS 3. You send: 'Thanks for your feedback! We'll take it into consideration.'", 
      correctOption: "a", 
      explanation: "Too passive. NPS 0-6 requires personal outreach within 24 hours to understand and resolve the issue." 
    },
    { 
      id: "2", 
      content: "Customer gives NPS 9. You send: 'Thanks! Would you mind sharing your experience in a quick testimonial?'", 
      correctOption: "b", 
      explanation: "Perfect. Promoters are your best source of testimonials and referrals. Ask while the positive feeling is fresh." 
    },
    { 
      id: "3", 
      content: "Customer gives NPS 7. You send: 'Glad you're enjoying [Product]! Let us know if you need anything.'", 
      correctOption: "a", 
      explanation: "Missed opportunity. NPS 7-8 are 'passives' — ask what would make it a 10. This is your upgrade path." 
    },
    { 
      id: "4", 
      content: "Customer gives NPS 5. You reply personally within 12 hours: 'I saw your score — can we hop on a 15-min call to understand what's not working?'", 
      correctOption: "b", 
      explanation: "Exactly right. Detractors need immediate, personal attention. Many can be saved with a single conversation." 
    }
  ]}
/>

## The 80/20 of Onboarding Automation

You now have the 5 core automations. But here's the critical principle:

**Automate the repeatable. Keep human touch for exceptions.**

<InsightCard icon="🎯" title="The Automation Rule">
If you do it the same way for every customer, automate it. If it requires judgment or personalization, keep it human.
</InsightCard>

### What to Automate (80%)
- Welcome sequence trigger
- Milestone celebration emails
- Stalled user detection + first nudge
- Day 7 first-win check
- Day 45 NPS survey
- Renewal reminders
- Feature announcement emails

### What to Keep Human (20%)
- Personal outreach to NPS detractors (0-6 scores)
- Onboarding calls for high-value customers (>$200/mo)
- Custom troubleshooting for complex issues
- Expansion conversations (upsell/cross-sell)
- Churn prevention for at-risk accounts

<ScenarioSimulator
  title="Onboarding Time Savings Calculator"
  persistKey="onboarding-L8-time-simulator"
  levers={[
    { id: "customers", label: "Active customers", min: 10, max: 200, step: 10, defaultValue: 50 },
    { id: "manualMinutes", label: "Minutes per manual onboarding task", min: 5, max: 30, step: 5, defaultValue: 15 },
    { id: "automationPercent", label: "% of tasks automated", min: 0, max: 100, step: 10, defaultValue: 80 }
  ]}
  outputs={[
    { 
      id: "weeklyHours", 
      label: "Weekly hours saved", 
      formula: "(customers * manualMinutes * (automationPercent / 100)) / 60", 
      unit: "hrs", 
      precision: 1 
    },
    { 
      id: "monthlyHours", 
      label: "Monthly hours saved", 
      formula: "(customers * manualMinutes * (automationPercent / 100)) / 60 * 4", 
      unit: "hrs", 
      precision: 0 
    }
  ]}
  insight="At {weeklyHours} hours saved per week, you're reclaiming {monthlyHours} hours per month for product work or acquisition. That's the equivalent of hiring a part-time CS person."
/>

## Common Automation Mistakes (and How to Avoid Them)

<ExampleCard label="Mistake #1: Over-Automating Too Early">

**The mistake:** Founder with 8 customers builds 15 Zapier workflows covering every edge case.

**Why it fails:** Premature optimization. With 8 customers, you should be doing onboarding manually to learn what works. Automate once you've done it manually 20+ times.

**The fix:** Start with Automation #1 (welcome sequence) only. Add automations 2-5 once you hit 25-30 customers.

</ExampleCard>

<ExampleCard label="Mistake #2: No Error Monitoring">

**The mistake:** Automation breaks (API key expires, integration changes), founder doesn't notice for 2 weeks. 14 customers never received welcome emails.

**Why it fails:** Silent failures. Customers assume you don't care.

**The fix:** 
1. Enable error notifications in Make/Zapier (email you on failure)
2. Set up a weekly "automation health check" — manually verify 2-3 recent customers received emails
3. Add a fallback: if automation fails, log to a "Manual Follow-Up" sheet

</ExampleCard>

<ExampleCard label="Mistake #3: Forgetting the Human Touch">

**The mistake:** Every email is automated. Customers feel like they're talking to a bot.

**Why it fails:** Automation without personalization = spam. Even automated emails should feel personal.

**The fix:**
1. Use merge tags: `Hi {{first_name}}` not "Hi there"
2. Reference specific actions: "I saw you created your first project" not "Thanks for using our product"
3. Sign emails with your name and photo
4. Add a P.S. inviting replies: "P.S. Hit reply if you have questions — I read every email."

</ExampleCard>

<TimedChallenge
  title="Spot the Automation Red Flag"
  persistKey="onboarding-L8-red-flags"
  timeLimit={90}
  items={[
    { 
      id: "1", 
      prompt: "Email subject: 'Action Required: Complete Your Setup' sent on Day 1", 
      correctAnswer: "red-flag", 
      explanation: "Too aggressive. Day 1 should be welcoming, not demanding. Save 'action required' language for Day 5+ stalled users." 
    },
    { 
      id: "2", 
      prompt: "Automation sends 3 emails in the first 24 hours", 
      correctAnswer: "red-flag", 
      explanation: "Email fatigue. Spread onboarding emails over 7-14 days, not 24 hours." 
    },
    { 
      id: "3", 
      prompt: "Welcome email from 'noreply@company.com'", 
      correctAnswer: "red-flag", 
      explanation: "Signals 'we don't want to hear from you.' Use a real email address (founder@, hello@, or your personal email)." 
    },
    { 
      id: "4", 
      prompt: "Milestone celebration email sent within 5 minutes of action", 
      correctAnswer: "good", 
      explanation: "Perfect. Immediate positive reinforcement while the customer is still engaged." 
    },
    { 
      id: "5", 
      prompt: "Day 7 email asks 'How can we help?' with no specific context", 
      correctAnswer: "red-flag", 
      explanation: "Too generic. Reference their specific progress: 'I noticed you created a project but haven't added tasks yet. Here's how...'" 
    }
  ]}
/>

## Your Automation Build Sprint

Time to build. Here's your 4-hour implementation plan:

<InteractiveChecklist 
  title="Onboarding Automation Build Sprint" 
  persistKey="onboarding-L8-build-sprint" 
  items={[
    "Hour 1: Set up Make/Zapier account and connect your core tools (payment processor, ESP, CRM)",
    "Hour 2: Build Automation #1 (Welcome Sequence Trigger) and test with a real signup",
    "Hour 3: Build Automation #3 (Stalled User Detector) and test with a backdated customer record",
    "Hour 4: Build Automation #4 (Day 7 First-Win Check) with conditional logic and test both paths",
    "Bonus (if time): Build Automation #2 (Milestone Celebration) for your #1 activation milestone",
    "Final step: Enable error notifications and set a calendar reminder for weekly health checks"
  ]} 
/>

## What's Next

You've automated the core onboarding workflow. In the next lesson, we'll zoom out and build your **Weekly CS Rhythm** — the 5-7 hour/week system that keeps customers successful without burning you out.

But first, go build those automations. The 4-6 hours you invest this week will save you 3-5 hours every week forever.

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Creators">

Your onboarding automation is slightly different. Instead of "first project created," your milestones are "first module completed" or "first implementation posted." 

Key automation for courses:
1. Welcome sequence (same as SaaS)
2. Module completion celebration (triggered by LMS webhook)
3. Stalled learner detector (no progress in 7 days → nudge email)
4. Day 14 check-in (instead of Day 45 — courses have shorter engagement windows)
5. Completion celebration + next course offer

Tools: Most course platforms (Teachable, Kajabi, Thinkific) have Zapier integrations for module completion events.

</ContextualNote>

---

**Next Lesson:** Time Management — CS in 5-7 Hours/Week