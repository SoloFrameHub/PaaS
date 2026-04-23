---
title: "Automation Recipes for Retention"
duration: "50 min"
track: "Customer Success"
course: "Course 37: Retention & Churn Prevention"
lesson: 9
---

You're staring at your customer list on a Sunday evening. Three accounts just went from Green to Yellow health scores. Two haven't logged in for 12 days. One just downgraded. And you're thinking: *"I can't manually babysit 80 customers every week. There has to be a better way."*

There is. It's called **automation recipes** — small, repeatable workflows that run retention plays without you touching every account. Not "set it and forget it" autopilot. More like "set it and steer" — automation handles the repetitive work, you handle the high-stakes interventions.

By the end of this lesson, you'll have 5-7 automation recipes that run your retention system while you sleep.

---

## The Automation Paradox

Here's the tension: retention is deeply personal (customers want to feel seen), but it's also repetitive (the same patterns happen over and over). The solution isn't choosing between automation and personalization — it's **automating the detection and first response, then personalizing the intervention**.

<FlipCard 
  front="The Retention Automation Rule" 
  back="Automate the monitoring and first touch. Personalize the save play. A robot can detect a health score drop. Only you can run the recovery call." 
/>

Think of it like a hospital triage system. Sensors monitor vitals 24/7 (automation). When something goes critical, a human doctor intervenes (you). You're not replacing yourself — you're giving yourself superpowers.

<InsightCard icon="⚡" title="The Solo Founder Reality">
You have 2-3 hours per week for CS. Without automation, that time goes to *finding* problems. With automation, it goes to *solving* them.
</InsightCard>

---

## Recipe 1: The Dormancy Detector

**Trigger:** Customer hasn't logged in for 7 days  
**Action:** Send reactivation email #1 (gentle nudge)  
**Escalation:** If no login by Day 14 → Email #2 (value reminder). If no login by Day 21 → Flag for personal outreach.

### How to Build It

<SlideNavigation>
<Slide title="Step 1: Set Up the Trigger">

**Tools needed:** Product analytics (GA4, Mixpanel, or simple database query) + Email automation (ConvertKit, Customer.io, or Zapier)

**The logic:**
```
IF last_login_date < (today - 7 days)
AND reactivation_email_1_sent = false
THEN send reactivation_email_1
```

**No-code version:** Zapier filter watching your user database or GA4 event stream. When `last_login` is older than 7 days, trigger email.

**Budget option:** Weekly manual export from your database → filter in Google Sheets → bulk upload to email tool.

</Slide>

<Slide title="Step 2: Write the Email Sequence">

**Email 1 (Day 7-10):**
```
Subject: Quick check-in

Hi [Name],

I noticed you haven't been in [Product] for about a week. Everything okay?

If you're stuck on something or just got busy, no worries — I'm here to help.

[Your Name]
Founder, [Product]
```

**Email 2 (Day 14):**
```
Subject: You're missing [specific value]

Hi [Name],

Since you last logged in, [recent update or feature].

Here's what you could be doing with [Product]:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

Want a quick walkthrough? Just reply.

[Your Name]
```

**Email 3 (Day 21):**
```
Subject: Can I help?

Hi [Name],

I want to make sure [Product] is still working for you.

If something isn't right, I'd love to fix it. If your needs have changed, let's talk about options (including a pause if you just need time).

[Your Name]
```

</Slide>

<Slide title="Step 3: Set Escalation Rules">

**If customer replies to any email:** Flag for personal follow-up (respond within 24 hours).

**If customer logs in after Email 1 or 2:** Stop sequence, mark as "reactivated," send success confirmation.

**If no response after Email 3 AND account value >$200/mo:** Add to "personal outreach" queue for founder call.

**If no response after Email 3 AND account value &lt;$200/mo:** Send final "pause offer" email, then accept natural churn if no response.

</Slide>
</SlideNavigation>

<TemplateBuilder
  title="Your Dormancy Detector Recipe"
  persistKey="retention-L9-dormancy"
  sections={[
    {
      id: "trigger",
      title: "Trigger Definition",
      fields: [
        { id: "days", label: "Days of inactivity before Email 1", placeholder: "7", type: "number" },
        { id: "source", label: "Data source for last login", placeholder: "e.g., GA4, product database", type: "text" }
      ]
    },
    {
      id: "email1",
      title: "Email 1 (Gentle Nudge)",
      fields: [
        { id: "subject", label: "Subject line", placeholder: "Quick check-in", type: "text" },
        { id: "body", label: "Email body", placeholder: "Hi [Name], I noticed...", type: "textarea" }
      ]
    },
    {
      id: "escalation",
      title: "Escalation Rules",
      fields: [
        { id: "highvalue", label: "High-value threshold (for personal outreach)", placeholder: "$200/mo", type: "text" },
        { id: "action", label: "Action for high-value non-responders", placeholder: "Add to call queue", type: "text" }
      ]
    }
  ]}
/>

---

## Recipe 2: The Feature Adoption Nudge

**Trigger:** Customer has been active for 14+ days but only uses 1 feature  
**Action:** Send feature spotlight email introducing Feature #2  
**Escalation:** If they adopt Feature #2 → introduce Feature #3 after 7 days. If no adoption after 14 days → in-app tooltip.

### The Logic

Customers who use 3+ features churn 50-70% less. But most customers don't explore on their own. You need to **progressively introduce features** based on usage milestones.

<ExampleCard label="Case Study: The Drip Feature Introduction">
SaaS founder Sarah had 8 features but most customers only used the core one (document creation). She built a feature adoption sequence:

- **Day 14:** Email introducing templates (Feature #2)
- **Day 21:** Email introducing collaboration (Feature #3)
- **Day 30:** Email introducing integrations (Feature #4)

Result: Feature breadth increased from 1.2 features/customer to 2.8 features/customer. Churn dropped from 6% to 3.5% monthly.
</ExampleCard>

### How to Build It

<SlideNavigation>
<Slide title="Step 1: Map Your Features">

List all features in your product. For each, answer:
1. What's the adoption rate? (% of customers who've used it)
2. Is it a "sticky" feature? (Do customers who use it churn less?)
3. What's the prerequisite? (Do they need to master Feature A before Feature B makes sense?)

**Example:**
| Feature | Adoption Rate | Sticky? | Prerequisite |
|---------|---------------|---------|--------------|
| Core action (create doc) | 95% | High | None |
| Templates | 30% | High | Core action |
| Collaboration | 20% | Very high | Core action |
| Integrations | 10% | Medium | Templates + Collaboration |

</Slide>

<Slide title="Step 2: Build the Drip Schedule">

**The pattern:**
- Day 1-7: Focus on core feature mastery (onboarding)
- Day 14: Introduce Feature #2 (highest-value, lowest-friction)
- Day 21: Introduce Feature #3 (if they adopted #2)
- Day 30: Introduce Feature #4 (power user features)

**Trigger logic:**
```
IF days_since_signup >= 14
AND feature_2_used = false
AND core_feature_used >= 3 times
THEN send feature_2_spotlight_email
```

</Slide>

<Slide title="Step 3: Write the Spotlight Email">

**Template:**
```
Subject: [Feature Name] will save you [time/effort]

Hi [Name],

I noticed you've been [core action] in [Product] — nice work!

Here's something that'll make it even faster: [Feature #2].

[Feature #2] lets you [specific benefit]. Here's how it works:
[2-3 sentence explanation or GIF]

Want to try it? [CTA button or link]

[Your Name]
```

**Key:** Tie the new feature to something they're already doing. "You're creating docs manually — templates automate that."

</Slide>
</SlideNavigation>

<ComparisonBuilder
  title="Your Feature Spotlight Email"
  persistKey="retention-L9-feature-email"
  prompt="Write a feature spotlight email for your product"
  expertExample="Subject: Templates will save you 10 minutes per doc\n\nHi Sarah,\n\nI noticed you've created 5 docs in DocFlow this week — awesome!\n\nHere's something that'll speed that up: Templates.\n\nInstead of starting from scratch every time, you can save your most-used formats as templates and reuse them with one click.\n\nTry it: [Link to templates]\n\n— Alex"
  criteria={[
    "References specific user behavior (e.g., 'created 5 docs')",
    "Explains the feature benefit in 1-2 sentences",
    "Includes a clear CTA (link or button)",
    "Ties new feature to existing workflow"
  ]}
/>

---

## Recipe 3: The Payment Recovery Flow

**Trigger:** Payment fails  
**Action:** Automated dunning sequence (3 emails over 7 days) + retry logic  
**Escalation:** If payment still fails after 7 days AND account value >$200/mo → personal outreach

### The Reality of Failed Payments

30-50% of failed payments are **not intentional cancellations**. They're expired cards, insufficient funds, or bank declines. With automated recovery, you can save 50-70% of these customers.

<InsightCard icon="💳" title="The Payment Recovery Window">
You have 7-10 days to recover a failed payment before the customer mentally checks out. After that, recovery rate drops below 15%.
</InsightCard>

### How to Build It

Most payment processors (Stripe, Paddle) have built-in dunning. But you can layer on top:

<SlideNavigation>
<Slide title="Step 1: Enable Smart Retries">

**Stripe:** Enable Smart Retries in dashboard (automatically retries failed payments at optimal times)

**Paddle:** Dunning is automatic, but you can customize email timing

**Manual alternative:** Zapier watches for `payment.failed` webhook → triggers email sequence

</Slide>

<Slide title="Step 2: Build the Email Sequence">

**Email 1 (Immediately after failure):**
```
Subject: Payment issue with your [Product] account

Hi [Name],

We tried to process your payment for [Product] but it didn't go through.

This usually happens when a card expires or there's a temporary bank issue.

Update your payment method here: [Link]

[Your Name]
```

**Email 2 (Day 3):**
```
Subject: Your [Product] account will pause in 4 days

Hi [Name],

Just a heads-up: we still haven't been able to process your payment.

Your account will pause on [Date] unless you update your payment info.

Update here: [Link]

Need help? Just reply.

[Your Name]
```

**Email 3 (Day 7):**
```
Subject: Last chance to keep your [Product] account active

Hi [Name],

Your [Product] account will pause today unless we can process payment.

If you're having trouble, let me know — we can work something out (downgrade, pause, etc.).

Update payment: [Link]

[Your Name]
```

</Slide>

<Slide title="Step 3: Set Escalation Rules">

**If payment succeeds at any point:** Stop sequence, send "thank you" confirmation.

**If payment still fails after Day 7 AND account value >$200/mo:** Add to "personal outreach" queue. Call or email: "I noticed your payment didn't go through. Is everything okay? Can we help?"

**If payment still fails after Day 7 AND account value &lt;$200/mo:** Pause account, send final "we'll hold your data for 30 days" email.

</Slide>
</SlideNavigation>

<RangeSlider 
  label="What % of your failed payments do you currently recover?" 
  min={0} 
  max={100} 
  lowLabel="0%" 
  highLabel="100%" 
  persistKey="retention-L9-recovery-rate" 
/>

**Benchmark:** With automated dunning, you should recover 50-70%. If you're below 30%, your emails are too aggressive or your retry timing is off.

---

## Recipe 4: The Expansion Signal Detector

**Trigger:** Customer hits usage threshold (e.g., 80% of plan limit) OR uses 3+ features consistently  
**Action:** Flag for expansion outreach  
**Escalation:** Send upgrade suggestion email → if no response in 7 days, add to "expansion call" queue

### The Expansion Opportunity

Your best expansion candidates aren't randomly distributed. They're customers who:
1. Hit usage limits (need more capacity)
2. Use multiple features (high engagement)
3. Have been customers for 3+ months (proven value)
4. Have good payment history (low risk)

<ExampleCard label="Case Study: The Automatic Upsell">
SaaS founder Mike had a $50/mo plan with a 10-project limit. He built an automation:

**Trigger:** Customer creates their 8th project (80% of limit)

**Action:** Email saying "You're crushing it! You're at 8/10 projects. Want to upgrade to unlimited for $99/mo?"

**Result:** 35% of customers who hit the trigger upgraded within 14 days. That's $1,715/mo in expansion revenue from a single automation.
</ExampleCard>

### How to Build It

<TemplateBuilder
  title="Your Expansion Signal Recipe"
  persistKey="retention-L9-expansion"
  sections={[
    {
      id: "signals",
      title: "Expansion Signals",
      fields: [
        { id: "usage", label: "Usage threshold (% of plan limit)", placeholder: "80%", type: "number" },
        { id: "features", label: "Feature breadth threshold", placeholder: "3+ features", type: "text" },
        { id: "tenure", label: "Minimum customer tenure", placeholder: "90 days", type: "number" }
      ]
    },
    {
      id: "email",
      title: "Expansion Email",
      fields: [
        { id: "subject", label: "Subject line", placeholder: "You're ready for [higher plan]", type: "text" },
        { id: "body", label: "Email body", placeholder: "Hi [Name], I noticed you're at 8/10 projects...", type: "textarea" }
      ]
    },
    {
      id: "escalation",
      title: "Escalation",
      fields: [
        { id: "noresponse", label: "Action if no response in 7 days", placeholder: "Add to expansion call queue", type: "text" }
      ]
    }
  ]}
/>

**The email template:**
```
Subject: You're ready for [higher plan]

Hi [Name],

I noticed you're at [X/Y limit] on your [current plan]. You're clearly getting value from [Product] — awesome!

Here's the thing: you're about to hit your limit. Instead of slowing down, want to upgrade to [higher plan]?

[Higher plan] gives you:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

Upgrade here: [Link]

Or if you want to chat about it, just reply.

[Your Name]
```

---

## Recipe 5: The Health Score Alert

**Trigger:** Customer's health score drops from Green (75-100) to Yellow (50-74) or Yellow to Red (0-49)  
**Action:** Alert you via Slack/email + flag for review  
**Escalation:** Yellow → weekly monitoring. Red → immediate personal outreach.

### The Early Warning System

This is the **meta-automation** that powers everything else. Your health score (from Lesson 2) should automatically alert you when customers move between zones.

<FlipCard 
  front="Why Health Score Alerts Matter" 
  back="Without alerts, you only notice churn when it's too late (cancellation request). With alerts, you catch the decline 2-4 weeks early when save rate is 40-60% instead of 10-15%." 
/>

### How to Build It

<SlideNavigation>
<Slide title="Option 1: Spreadsheet + Zapier">

**Setup:**
1. Your health score lives in Google Sheets (updated weekly via manual export or Zapier data feeds)
2. Zapier watches the "Health Zone" column
3. When a customer moves from Green → Yellow or Yellow → Red, Zapier sends you a Slack message or email

**Zapier recipe:**
```
Trigger: Google Sheets row updated
Filter: "Health Zone" changed from "Green" to "Yellow" OR "Yellow" to "Red"
Action: Send Slack message to #customer-health channel
```

</Slide>

<Slide title="Option 2: Baremetrics / ChartMogul Alerts">

If you use Baremetrics or ChartMogul for revenue analytics, they have built-in "customer health" alerts based on MRR changes, usage drops, and engagement declines.

**Setup:**
1. Define your alert thresholds (e.g., "MRR down 20% in 30 days")
2. Connect to Slack or email
3. Alerts fire automatically

**Cost:** $50-100/mo (worth it if you have 50+ customers)

</Slide>

<Slide title="Option 3: Custom Dashboard (Advanced)">

If you're technical, build a simple dashboard that:
1. Pulls data from your product database (logins, feature usage)
2. Pulls data from your ESP (email engagement)
3. Pulls data from Stripe (payment behavior)
4. Calculates health score
5. Sends alerts via webhook to Slack

**Tools:** Retool, Zapier Tables, or custom Python script

</Slide>
</SlideNavigation>

<RangeSlider 
  label="How quickly do you currently notice when a customer's health declines?" 
  min={1} 
  max={30} 
  lowLabel="Same day" 
  highLabel="30+ days" 
  persistKey="retention-L9-detection-speed" 
/>

**Target:** You should notice within 7 days. Faster is better, but diminishing returns after daily checks (too noisy).

---

## Recipe 6: The Feedback Loop Automation

**Trigger:** Customer submits NPS survey, exit survey, or support ticket  
**Action:** Route to appropriate queue (expansion, save, feature request) + auto-tag sentiment  
**Escalation:** NPS 0-6 → immediate founder outreach. NPS 9-10 → expansion queue.

### Why This Matters

Feedback is a goldmine, but only if you act on it. Most solo founders collect NPS scores and then... do nothing. This automation ensures every piece of feedback gets routed to the right action.

<InsightCard icon="📊" title="The NPS Action Matrix">
- **NPS 0-6 (Detractors):** Immediate save play — call within 24 hours
- **NPS 7-8 (Passives):** Feature adoption nudge — they like it but aren't wowed
- **NPS 9-10 (Promoters):** Expansion opportunity + referral ask
</InsightCard>

### How to Build It

**Step 1:** Use a simple NPS tool (Delighted, Typeform, or built into your product)

**Step 2:** Zapier watches for new NPS responses

**Step 3:** Based on score, Zapier:
- NPS 0-6 → Adds to "urgent save" list in your CRM + sends you a Slack alert
- NPS 7-8 → Adds to "feature adoption" email sequence
- NPS 9-10 → Adds to "expansion + referral" email sequence

**Step 4:** You respond personally to all 0-6 scores within 24 hours

<ComparisonBuilder
  title="Your NPS Follow-Up Email (for Detractors)"
  persistKey="retention-L9-nps-detractor"
  prompt="Write a follow-up email for an NPS detractor (score 0-6)"
  expertExample="Subject: I saw your feedback\n\nHi [Name],\n\nI noticed you gave [Product] a [score]/10. That's not where we want to be.\n\nCan you help me understand what's not working? I'd love to fix it.\n\nWant to jump on a quick call this week? Or just reply with what's frustrating you.\n\n— [Your Name]"
  criteria={[
    "Acknowledges the low score without being defensive",
    "Asks for specific feedback",
    "Offers a call or easy reply option",
    "Signed by the founder (personal touch)"
  ]}
/>

---

## Recipe 7: The Churn Post-Mortem Automation

**Trigger:** Customer cancels  
**Action:** Send exit survey + schedule post-mortem review  
**Escalation:** High-value cancellations (>$200/mo) → founder calls within 48 hours

### The Exit Experience Matters

15-20% of gracefully offboarded customers return within 12 months. But only if you:
1. Make the exit smooth (no guilt trips, no dark patterns)
2. Ask why they left (exit survey)
3. Leave the door open ("We'd love to have you back")

<ExampleCard label="Case Study: The Win-Back Email">
SaaS founder Lisa lost a $300/mo customer. She sent a graceful exit email:

"Hi [Name], I saw you cancelled. No hard feelings — I hope [Product] helped while you used it. If you ever want to come back, the door's open. And if you have 2 minutes, I'd love to know what we could've done better: [exit survey link]."

The customer replied with feedback. Lisa fixed the issue (missing integration). 4 months later, the customer returned and upgraded to $500/mo.
</ExampleCard>

### How to Build It

**Step 1:** Cancellation triggers exit survey (Typeform, Google Form, or built into your app)

**Step 2:** Survey asks:
1. Why did you cancel? (radio buttons: price, not using it, missing feature, competitor, budget, other)
2. What could we have done better? (open text)
3. Would you consider coming back if we fixed [issue]? (yes/no)

**Step 3:** Zapier routes responses:
- "Missing feature" → Add to feature request backlog
- "Competitor" → Add to competitive analysis list
- "Would consider coming back" → Add to 90-day win-back sequence

**Step 4:** For high-value cancellations, you call within 48 hours (not to save, but to learn)

<TemplateBuilder
  title="Your Exit Survey"
  persistKey="retention-L9-exit-survey"
  sections={[
    {
      id: "question1",
      title: "Question 1: Why did you cancel?",
      fields: [
        { id: "options", label: "Answer options (comma-separated)", placeholder: "Too expensive, Not using it, Missing feature, Found competitor, Budget cut, Achieved goal, Other", type: "textarea" }
      ]
    },
    {
      id: "question2",
      title: "Question 2: What could we improve?",
      fields: [
        { id: "prompt", label: "Question text", placeholder: "What could we have done better?", type: "text" }
      ]
    },
    {
      id: "question3",
      title: "Question 3: Would you come back?",
      fields: [
        { id: "prompt", label: "Question text", placeholder: "If we fixed [issue], would you consider coming back?", type: "text" }
      ]
    }
  ]}
/>

---

## Putting It All Together: Your Automation Stack

You don't need to build all 7 recipes at once. Start with the **3 highest-impact automations** for your business:

<InteractiveChecklist 
  title="Your Automation Priority List" 
  persistKey="retention-L9-priorities" 
  items={[
    "Recipe 1: Dormancy Detector (catches 40-60% of preventable churn)",
    "Recipe 3: Payment Recovery Flow (recovers 50-70% of failed payments)",
    "Recipe 5: Health Score Alert (early warning system for all other recipes)",
    "Recipe 2: Feature Adoption Nudge (increases stickiness)",
    "Recipe 4: Expansion Signal Detector (drives NRR growth)",
    "Recipe 6: Feedback Loop Automation (routes NPS/surveys to action)",
    "Recipe 7: Churn Post-Mortem Automation (improves product + enables win-back)"
  ]} 
/>

### The Tool Stack (Budget: &lt;$100/mo)

| Tool | Function | Cost | Recipe Coverage |
|------|----------|------|----------------|
| **Zapier** | Connects everything | $20-30/mo | All recipes |
| **Google Sheets** | Health score tracker | Free | Recipe 5 |
| **ConvertKit / Customer.io** | Email automation | $29-50/mo | Recipes 1, 2, 4, 6, 7 |
| **Stripe** | Payment processing + dunning | Free (built-in) | Recipe 3 |
| **Typeform / Google Forms** | Surveys | Free-$25/mo | Recipes 6, 7 |
| **Slack** | Alerts | Free | Recipe 5 |

**Total:** $50-100/mo for a complete automation stack.

---

## The Human-in-the-Loop Principle

Here's the critical rule: **Automation handles detection and first response. You handle high-stakes interventions.**

<FlipCard 
  front="When to Automate vs When to Personalize" 
  back="Automate: Monitoring, first-touch emails, data routing, low-value accounts. Personalize: Recovery calls, high-value save plays, expansion conversations, detractor follow-ups." 
/>

Think of it like this:

| Scenario | Automation | You |
|----------|-----------|-----|
| Customer hasn't logged in for 7 days | ✅ Send Email 1 | |
| Customer still hasn't logged in after 3 emails | | ✅ Personal call (if high-value) |
| Payment fails | ✅ Send dunning sequence + retry | |
| Payment still fails after 7 days | | ✅ Personal outreach (if high-value) |
| Customer hits 80% of plan limit | ✅ Send upgrade email | |
| Customer doesn't respond to upgrade email | | ✅ Expansion call |
| Health score drops to Yellow | ✅ Alert you | ✅ Review + decide action |
| Health score drops to Red | ✅ Alert you | ✅ Immediate personal outreach |

---

## Your 14-Day Automation Sprint

Ready to build your retention automation system? Here's the sprint:

<ProgressiveReveal title="14-Day Automation Build Sprint" persistKey="retention-L9-sprint">

<RevealSection title="Days 1-2: Set Up Infrastructure">

**Tasks:**
- [ ] Sign up for Zapier (if not already)
- [ ] Connect your product database, ESP, and Stripe to Zapier
- [ ] Set up Google Sheets health score tracker (from Lesson 2)
- [ ] Test data flow: can Zapier pull login data? Email engagement? Payment status?

**Output:** Working data connections

</RevealSection>

<RevealSection title="Days 3-5: Build Recipe 1 (Dormancy Detector)">

**Tasks:**
- [ ] Define dormancy threshold (7 days? 10 days?)
- [ ] Write 3-email reactivation sequence
- [ ] Build Zapier automation: detect dormancy → send Email 1
- [ ] Set up Email 2 and Email 3 triggers (Day 14, Day 21)
- [ ] Test with a fake customer record

**Output:** Live dormancy detector

</RevealSection>

<RevealSection title="Days 6-7: Build Recipe 3 (Payment Recovery)">

**Tasks:**
- [ ] Enable Stripe Smart Retries (or Paddle dunning)
- [ ] Write 3-email dunning sequence
- [ ] Build Zapier automation: payment fails → send Email 1
- [ ] Set up Email 2 and Email 3 triggers
- [ ] Test with a test payment failure

**Output:** Live payment recovery flow

</RevealSection>

<RevealSection title="Days 8-10: Build Recipe 5 (Health Score Alert)">

**Tasks:**
- [ ] Set up weekly health score calculation (manual or automated)
- [ ] Build Zapier automation: health zone changes → Slack alert
- [ ] Define escalation rules (Yellow = weekly check, Red = immediate outreach)
- [ ] Test with a fake health score drop

**Output:** Live health score alert system

</RevealSection>

<RevealSection title="Days 11-12: Build Recipe 2 (Feature Adoption Nudge)">

**Tasks:**
- [ ] Map your features + adoption rates
- [ ] Define drip introduction schedule (Day 14, Day 21, Day 30)
- [ ] Write feature spotlight emails
- [ ] Build Zapier automation: tenure + usage → send feature email
- [ ] Test with a fake customer record

**Output:** Live feature adoption sequence

</RevealSection>

<RevealSection title="Days 13-14: Test & Monitor">

**Tasks:**
- [ ] Run all automations with test data
- [ ] Monitor for 48 hours: are triggers firing correctly?
- [ ] Fix any bugs or timing issues
- [ ] Document your automation stack (what's automated, what's manual)

**Output:** Fully operational retention automation system

</RevealSection>

</ProgressiveReveal>

---

## Common Automation Mistakes (and How to Avoid Them)

<ClassifyExercise
  title="Automation Red Flags"
  persistKey="retention-L9-classify"
  categories={[
    { id: "good", label: "Good Automation", color: "#10b981" },
    { id: "bad", label: "Bad Automation", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Sending 5 reactivation emails in 7 days", 
      correctCategory: "bad",
      explanation: "Too aggressive. Customers will unsubscribe or mark as spam. Stick to 3 emails over 21 days."
    },
    { 
      id: "2", 
      content: "Alerting yourself when health score drops to Yellow", 
      correctCategory: "good",
      explanation: "Early warning = higher save rate. Yellow is the optimal intervention window."
    },
    { 
      id: "3", 
      content: "Automating high-value ($500+/mo) cancellation responses", 
      correctCategory: "bad",
      explanation: "High-value accounts deserve personal attention. Automate detection, personalize response."
    },
    { 
      id: "4", 
      content: "Sending feature spotlight emails to customers who haven't mastered the core feature", 
      correctCategory: "bad",
      explanation: "They'll be overwhelmed. Wait until they've used the core feature 3+ times."
    },
    { 
      id: "5", 
      content: "Automatically retrying failed payments 3 times over 7 days", 
      correctCategory: "good",
      explanation: "Standard dunning practice. Most payment processors do this automatically."
    },
    { 
      id: "6", 
      content: "Routing NPS detractors (0-6) to your immediate attention", 
      correctCategory: "good",
      explanation: "Detractors are at-risk. Personal follow-up within 24 hours can save 30-50%."
    }
  ]}
/>

---

## Your Automation Checklist

Before you finish this lesson, make sure you can answer "yes" to these:

<InteractiveChecklist 
  title="Automation Readiness Checklist" 
  persistKey="retention-L9-readiness" 
  items={[
    "I know which 3 automation recipes are highest-priority for my business",
    "I have the tools needed (Zapier, ESP, health score tracker)",
    "I've written at least one reactivation email sequence",
    "I understand the difference between automating detection vs automating response",
    "I have escalation rules for when automation should hand off to me",
    "I've set up at least one test automation and verified it works",
    "I have a plan for the 14-day automation sprint"
  ]} 
/>

---

## What's Next

In **Lesson 10**, you'll assemble everything from this course into a **complete retention system** — a 14-day sprint that takes you from reactive churn firefighting to proactive retention machine.

You'll build:
- Your health scoring dashboard (live and updating)
- Your full automation stack (7 recipes running)
- Your weekly CS review ritual (2-3 hours, focused on the right accounts)
- Your retention playbook (documented so you can eventually hand it off)

But before that, take 30 minutes right now to build your first automation recipe. Pick one:

<DecisionTree
  title="Which Recipe Should You Build First?"
  persistKey="retention-L9-first-recipe"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "What's your biggest retention problem right now?", 
      choices: [
        { label: "Customers go dormant and I don't notice until they cancel", nextNodeId: "dormancy" },
        { label: "Failed payments are killing my MRR", nextNodeId: "payment" },
        { label: "I don't know which customers are at-risk", nextNodeId: "health" }
      ]
    },
    { 
      id: "dormancy", 
      content: "Build Recipe 1: Dormancy Detector. Start with the 3-email reactivation sequence. You'll catch 40-60% of preventable churn.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "payment", 
      content: "Build Recipe 3: Payment Recovery Flow. Enable Stripe Smart Retries + write the 3-email dunning sequence. You'll recover 50-70% of failed payments.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "health", 
      content: "Build Recipe 5: Health Score Alert. Set up weekly health score calculation + Slack alerts. You'll detect problems 2-4 weeks earlier.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

Now go build it. See you in Lesson 10 for the final sprint.