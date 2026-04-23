---
title: "Day 45-60 Check-In & Survey Design"
duration: "50 min"
track: "Customer Success"
course: "Course 36: Customer Onboarding"
lesson: 7
---

## The Silent Churn Window

You've done everything right. Your customer signed up, completed onboarding, hit their first milestone by Day 7. They're using your product weekly. You breathe a sigh of relief.

Then, 60 days in, they cancel.

No warning. No support ticket. No complaint. Just… gone.

This is **silent churn**, and it happens most often between Day 45 and Day 60. The initial excitement has worn off. The novelty is gone. They've either built a habit around your product — or they haven't. And if they haven't, they're quietly evaluating whether to renew.

**The brutal truth:** 68% of customers who churn do so because they feel you don't care about them. Not because your product failed. Not because a competitor was better. Because you went silent after onboarding.

The Day 45-60 check-in is your second chance to prevent churn before it happens.

<InsightCard icon="🎯" title="The Care Gap">
Most founders obsess over the first week of onboarding, then disappear. The customers who stick around aren't the ones who had the best Day 1 experience — they're the ones who felt cared for at Day 45.
</InsightCard>

---

## Why Day 45-60 Is the Second Critical Window

Let's map the emotional journey of a new customer:

<SlideNavigation>
<Slide title="Day 1-7: Excitement">
**High energy.** They just bought. They're motivated. They want this to work. Your onboarding emails get 60-80% open rates.

**Risk:** Confusion, setup friction, buyer's remorse.
</Slide>

<Slide title="Day 8-30: Habit Formation">
**Reality sets in.** The initial dopamine hit fades. They're either building a routine with your product or struggling to make it stick.

**Risk:** Shallow engagement, feature confusion, competing priorities.
</Slide>

<Slide title="Day 31-45: The Plateau">
**The honeymoon is over.** They've used your product enough to know if it's working. If they haven't seen meaningful results yet, doubt creeps in.

**Risk:** Silent frustration, comparison shopping, mental checkout.
</Slide>

<Slide title="Day 45-60: The Decision Window">
**Renewal psychology kicks in.** Even if they're on a monthly plan, they're subconsciously deciding: "Is this worth keeping?"

**Risk:** Silent churn. They don't complain — they just leave.
</Slide>
</SlideNavigation>

**The data is clear:**

- NPS detractors (scores 0-6) are **5x more likely to churn within 90 days**
- A simple "How's it going?" email at Day 45 **reduces Month 2-3 churn by 10-15%**
- Companies that act on customer feedback within 48 hours have **25% higher retention**

The Day 45-60 window is where **proactive care beats reactive support**.

<RangeSlider 
  label="How often do you check in with customers after onboarding?" 
  min={1} 
  max={10} 
  lowLabel="Never" 
  highLabel="Weekly" 
  persistKey="onboarding-L7-checkin-frequency" 
/>

---

## The 3-Question Check-In Survey

You don't need a 20-question survey. You need **3 questions that reveal everything**:

<FlipCard 
  front="Question 1: The NPS Question" 
  back="'On a scale of 0-10, how likely are you to recommend [product] to a colleague?' — This single question predicts churn risk better than any other metric." 
/>

<FlipCard 
  front="Question 2: The Improvement Question" 
  back="'What's the one thing you'd improve?' — Open text. This surfaces product gaps, onboarding friction, and unmet expectations." 
/>

<FlipCard 
  front="Question 3: The Results Question" 
  back="'What's the biggest result you've achieved so far?' — This tells you if they've hit meaningful value. If they can't answer, they're at risk." 
/>

### Why These 3 Questions Work

**Question 1 (NPS)** segments your customers into three buckets:
- **9-10 (Promoters):** Your advocates. Ask for testimonials and referrals.
- **7-8 (Passives):** Satisfied but not loyal. One competitor away from leaving.
- **0-6 (Detractors):** At-risk. Need personal outreach within 24 hours.

**Question 2 (Improvement)** gives you your product roadmap. When 15 customers say "I wish it integrated with X," you know what to build next.

**Question 3 (Results)** is the retention predictor. If they can articulate a win, they're staying. If they say "I'm still figuring it out" at Day 45, they're churning.

<ExampleCard label="Real Survey Response: The Warning Sign">
**NPS:** 5  
**Improvement:** "I wish it was easier to understand what to do first."  
**Result:** "I haven't really used it much yet."

**Translation:** This customer is 7 days from canceling. They're confused, haven't hit value, and are already mentally checked out.

**Action:** Personal email from founder within 24 hours offering a 15-minute walkthrough.
</ExampleCard>

<TemplateBuilder
  title="Your 3-Question Survey"
  persistKey="onboarding-L7-survey"
  sections={[
    {
      id: "nps",
      title: "Question 1: NPS",
      fields: [
        { 
          id: "nps-text", 
          label: "NPS Question Text", 
          placeholder: "On a scale of 0-10, how likely are you to recommend [Your Product] to a colleague?", 
          type: "text" 
        }
      ]
    },
    {
      id: "improvement",
      title: "Question 2: Improvement",
      fields: [
        { 
          id: "improvement-text", 
          label: "Improvement Question Text", 
          placeholder: "What's the one thing you'd improve about [Your Product]?", 
          type: "text" 
        }
      ]
    },
    {
      id: "results",
      title: "Question 3: Results",
      fields: [
        { 
          id: "results-text", 
          label: "Results Question Text", 
          placeholder: "What's the biggest result you've achieved with [Your Product] so far?", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## Reading the Survey Results: The NPS Response Protocol

You send the survey. Responses start coming in. Now what?

**The mistake most founders make:** They read the responses, feel good about the 9s and 10s, wince at the 3s and 4s, and… do nothing.

**The right move:** Treat NPS scores as a triage system.

<ClassifyExercise
  title="Classify These NPS Responses"
  persistKey="onboarding-L7-nps-classify"
  categories={[
    { id: "promoter", label: "Promoter (9-10)", color: "#10b981" },
    { id: "passive", label: "Passive (7-8)", color: "#f59e0b" },
    { id: "detractor", label: "Detractor (0-6)", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Score: 9 | 'Love it! Saves me 3 hours a week.'", 
      correctCategory: "promoter" 
    },
    { 
      id: "2", 
      content: "Score: 7 | 'It's fine. Does what I need.'", 
      correctCategory: "passive" 
    },
    { 
      id: "3", 
      content: "Score: 4 | 'Still trying to figure out how to use it.'", 
      correctCategory: "detractor" 
    },
    { 
      id: "4", 
      content: "Score: 10 | 'Already recommended to 2 colleagues!'", 
      correctCategory: "promoter" 
    },
    { 
      id: "5", 
      content: "Score: 6 | 'It's okay, but missing some features I need.'", 
      correctCategory: "detractor" 
    }
  ]}
/>

### The Response Protocol

| NPS Score | Classification | Action | Timeline |
|-----------|---------------|--------|----------|
| **9-10** | Promoter | Thank them + ask for testimonial + referral request | Within 48 hours |
| **7-8** | Passive | Thank them + ask "What would make this a 10 for you?" | Within 72 hours |
| **0-6** | Detractor | **Personal outreach within 24 hours** + problem resolution | Immediate |

**The Detractor Protocol is critical.** Here's the template:

<ComparisonBuilder
  title="Detractor Response Email"
  persistKey="onboarding-L7-detractor-email"
  prompt="Write your response to a detractor (NPS 0-6)"
  expertExample="Hi [Name],

I saw your feedback and wanted to reach out personally. A score of [X] tells me we're not delivering the value you expected, and I want to fix that.

You mentioned [specific issue from their feedback]. Here's what I can do:

[Specific solution or offer — e.g., 'I'd love to jump on a 15-minute call to walk you through [feature]' or 'I can set up [integration] for you manually this week.']

Would [specific time] work for a quick call?

Thanks for being honest with me.

[Your name]"
  criteria={[
    "Acknowledges the score directly",
    "References their specific feedback",
    "Offers a concrete solution",
    "Includes a specific ask (call, action, etc.)"
  ]}
/>

**Why this works:**

- **Speed matters.** Responding within 24 hours shows you care.
- **Personalization matters.** Generic "sorry to hear that" emails don't work.
- **Action matters.** Don't just apologize — offer a fix.

<InsightCard icon="💡" title="The Detractor Recovery Rate">
15-25% of detractors who receive personal outreach within 24 hours stay and become passives or promoters. That's a 15-25% churn reduction from one email.
</InsightCard>

---

## The Day 45 Personal Email

The survey is one touchpoint. But there's a second, equally powerful intervention: **the personal email from the founder**.

This isn't automated. This isn't templated. This is you, the founder, writing a genuine check-in email to every customer at Day 45.

**The format:**

<TemplateBuilder
  title="Day 45 Personal Email"
  persistKey="onboarding-L7-personal-email"
  sections={[
    {
      id: "opening",
      title: "Opening Line",
      fields: [
        { 
          id: "greeting", 
          label: "Personal Greeting", 
          placeholder: "Hi [Name], you've been with us for about 6 weeks now...", 
          type: "text" 
        }
      ]
    },
    {
      id: "question",
      title: "The Check-In Question",
      fields: [
        { 
          id: "question-text", 
          label: "How's it going?", 
          placeholder: "How's [product] working for you? Are you getting the results you hoped for?", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "offer",
      title: "The Help Offer",
      fields: [
        { 
          id: "offer-text", 
          label: "Offer to Help", 
          placeholder: "If there's anything I can do to make this more valuable for you, just reply to this email. I read every response.", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "signature",
      title: "Signature",
      fields: [
        { 
          id: "sign-off", 
          label: "Sign-Off", 
          placeholder: "Thanks for being a customer.\n\n[Your name]\nFounder, [Company]", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

**Why this email works:**

1. **It's from you, not "The Team."** Use your personal name in the from line.
2. **It's short.** 3-4 sentences max.
3. **It's genuine.** No sales pitch. No upsell. Just: "How's it going?"
4. **It invites a reply.** And when they reply, you learn what's working and what's not.

<ExampleCard label="Real Response to Day 45 Email">
**Founder's email:** "Hi Sarah, you've been with us for 6 weeks. How's it going? Anything I can do to help?"

**Sarah's reply:** "Honestly, I've been stuck trying to figure out how to connect it to my CRM. I know it's supposed to work, but I can't find the instructions."

**Outcome:** Founder sends a 2-minute Loom video. Sarah connects the integration. She stays for 18 months and refers 3 customers.

**ROI of one email:** $12,000+ in retained + referred revenue.
</ExampleCard>

<RangeSlider 
  label="How comfortable are you sending personal check-in emails?" 
  min={1} 
  max={10} 
  lowLabel="Feels awkward" 
  highLabel="I do this already" 
  persistKey="onboarding-L7-personal-comfort" 
/>

---

## Exit Interviews: Learning from Churned Customers

Not everyone will stay. That's okay. But when someone cancels, **you need to know why**.

The exit interview is a 2-3 question form sent immediately on cancellation:

<TemplateBuilder
  title="Exit Interview Survey"
  persistKey="onboarding-L7-exit-survey"
  sections={[
    {
      id: "reason",
      title: "Question 1: Primary Reason",
      fields: [
        { 
          id: "reason-text", 
          label: "Why are you canceling?", 
          placeholder: "What was the primary reason for canceling? (Open text)", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "improvement",
      title: "Question 2: What Could We Have Done?",
      fields: [
        { 
          id: "improvement-text", 
          label: "What could we have done differently?", 
          placeholder: "What could we have done differently to keep you as a customer?", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "return",
      title: "Question 3: Would You Return?",
      fields: [
        { 
          id: "return-text", 
          label: "Would you consider returning?", 
          placeholder: "If we addressed [issue], would you consider returning in the future?", 
          type: "text" 
        }
      ]
    }
  ]}
/>

### Reading Exit Interview Data

**Response rates:**
- Email survey: 15-25%
- In-app survey (triggered on cancel): 35-50%

**What to look for:**

<SwipeDecision
  title="Actionable Churn Reason or Natural Churn?"
  description="Swipe right for churn reasons you can fix, left for natural churn"
  optionA="Natural Churn"
  optionB="Actionable"
  persistKey="onboarding-L7-churn-swipe"
  cards={[
    { 
      id: "1", 
      content: "'I went out of business.'", 
      correctOption: "a", 
      explanation: "Nothing you could have done. Natural churn." 
    },
    { 
      id: "2", 
      content: "'I couldn't figure out how to use it.'", 
      correctOption: "b", 
      explanation: "Onboarding gap. You can fix this." 
    },
    { 
      id: "3", 
      content: "'It didn't integrate with my CRM.'", 
      correctOption: "b", 
      explanation: "Product gap. Roadmap priority." 
    },
    { 
      id: "4", 
      content: "'I found a cheaper alternative.'", 
      correctOption: "a", 
      explanation: "Price-sensitive customer. Hard to prevent." 
    },
    { 
      id: "5", 
      content: "'I never got the results I was hoping for.'", 
      correctOption: "b", 
      explanation: "Expectation mismatch or onboarding failure. Fixable." 
    }
  ]}
/>

**Categorize feedback into:**

1. **Product issues** — Missing features, bugs, performance problems
2. **Onboarding gaps** — Confusion, lack of guidance, setup friction
3. **Expectation mismatches** — They thought it did X, but it does Y
4. **Natural churn** — Out of business, budget cuts, role change

**The weekly review:** Every Friday, review exit interviews. Look for patterns. If 3+ people mention the same issue, it's a priority fix.

---

## Turning Check-In Insights Into Action

You've sent the Day 45 survey. You've sent the personal email. You've collected exit interview data. Now what?

**The mistake:** Collecting feedback and doing nothing with it.

**The right move:** Weekly review + action plan.

<InteractiveChecklist 
  title="Weekly Check-In Review Process" 
  persistKey="onboarding-L7-review-checklist" 
  items={[
    "Review all NPS responses from the past week",
    "Respond to all detractors (0-6) within 24 hours",
    "Thank promoters (9-10) and ask for testimonials",
    "Follow up with passives (7-8) — ask what would make it a 10",
    "Review exit interview responses — categorize by type",
    "Identify patterns: Are 3+ people mentioning the same issue?",
    "Add top 3 issues to product roadmap or onboarding fixes",
    "Update onboarding emails/checklists based on feedback"
  ]} 
/>

### The 48-Hour Action Rule

**Companies that act on customer feedback within 48 hours have 25% higher retention.**

Here's what "action" looks like:

<DecisionTree
  title="Detractor Response Decision Tree"
  persistKey="onboarding-L7-detractor-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "You receive an NPS score of 4. The feedback says: 'I can't figure out how to connect my CRM.' What do you do?", 
      choices: [
        { label: "Send a help doc link", nextNodeId: "doc" },
        { label: "Offer a 15-minute call to walk them through it", nextNodeId: "call" },
        { label: "Add it to the roadmap and move on", nextNodeId: "roadmap" }
      ]
    },
    { 
      id: "doc", 
      content: "They don't respond. They cancel 2 weeks later.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "call", 
      content: "They accept the call. You walk them through the integration. They stay for 12 months.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "roadmap", 
      content: "They cancel before you build the feature.", 
      isTerminal: true, 
      outcome: "negative" 
    }
  ]}
/>

**The lesson:** Speed + personal touch beats perfection.

---

## Tools for Day 45-60 Check-Ins

You don't need expensive software. Here's the budget-friendly stack:

| Tool | Function | Pricing | Solo Fit |
|------|----------|---------|----------|
| **Typeform** | Survey design | Free (10 responses/mo) / $25/mo | High |
| **Tally** | Free form builder | Free (unlimited) | High |
| **Google Forms** | Basic surveys | Free | High |
| **Delighted** | NPS surveys | Free (250 surveys/mo) | High |
| **Zapier** | Auto-notify on low NPS | $19.99/mo (Starter) | High |

**Recommended stack for solo founders:**

1. **Google Forms** for the 3-question survey (free)
2. **Zapier** to send you a Slack notification when someone scores 0-6 (so you can respond within 24 hours)
3. **Your email client** for personal Day 45 emails (no tool needed)

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can build a simple NPS tracker in Airtable or Notion with Zapier webhooks. Trigger: New response → Filter: Score < 7 → Action: Slack notification. Takes 15 minutes to set up.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches">
Your Day 45 check-in is a natural coaching touchpoint. Frame it as: "We're halfway through your first 90 days. Let's assess progress and adjust the plan." This feels less like a survey and more like coaching.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Creators">
Your Day 45 email can double as content research. Ask: "What's the biggest challenge you're facing right now?" Their answers become your next YouTube video or newsletter topic.
</ContextualNote>

---

## Summary: Your Day 45-60 System

Here's what you're building:

<ProgressiveReveal title="The Complete Day 45-60 System" persistKey="onboarding-L7-system-reveal">
<RevealSection title="Step 1: The 3-Question Survey (Day 45)">
Send to all customers at Day 45:
1. NPS question
2. "What would you improve?"
3. "What's your biggest result so far?"

Tool: Google Forms or Typeform
</RevealSection>

<RevealSection title="Step 2: The Personal Email (Day 45)">
Send from your personal email:
- "You've been with us for 6 weeks. How's it going?"
- Invite a reply
- No sales pitch

Tool: Your email client
</RevealSection>

<RevealSection title="Step 3: The Response Protocol (Within 24-48 Hours)">
- **Promoters (9-10):** Thank + ask for testimonial
- **Passives (7-8):** Thank + ask what would make it a 10
- **Detractors (0-6):** Personal outreach + problem resolution

Tool: Your email client + Zapier notification
</RevealSection>

<RevealSection title="Step 4: Exit Interviews (On Cancellation)">
Send 2-3 question survey:
- Why are you canceling?
- What could we have done differently?
- Would you consider returning?

Tool: Google Forms triggered on cancel event
</RevealSection>

<RevealSection title="Step 5: Weekly Review (Every Friday)">
- Review all NPS responses
- Respond to detractors
- Categorize exit interview feedback
- Identify patterns → update onboarding

Tool: Spreadsheet or Notion
</RevealSection>
</ProgressiveReveal>

<InteractiveChecklist 
  title="Your Day 45-60 Implementation Checklist" 
  persistKey="onboarding-L7-implementation" 
  items={[
    "Create your 3-question survey in Google Forms or Typeform",
    "Set up Zapier to notify you when NPS < 7",
    "Write your Day 45 personal email template",
    "Create your exit interview survey",
    "Set up a weekly review reminder (Friday, 30 minutes)",
    "Draft your detractor response email template",
    "Test the survey flow with a test customer",
    "Schedule your first batch of Day 45 emails"
  ]} 
/>

---

## What's Next

You've built the Day 45-60 check-in system. You're catching silent churn before it happens. You're learning from detractors and celebrating with promoters.

**Next lesson:** We'll automate this entire system using Zapier, Make, or n8n — so the surveys send themselves, the notifications fire automatically, and you only spend 30 minutes a week on manual responses.

**The goal:** A check-in system that runs itself, but still feels personal.