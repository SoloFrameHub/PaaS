---
title: "Reply Routing & Workflow Automation"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 24: AI Outreach Automation"
lesson: 8
---

You've launched your sequences. Emails are going out. LinkedIn touches are landing. And then... replies start coming in.

**This is where most solo founders break their own systems.**

They check three inboxes manually. They forget to follow up on a hot lead for 48 hours. They copy-paste the same calendar link 40 times. They lose track of who said "not now" vs "never" vs "send me info."

The irony? You automated the *easy* part (sending). The *valuable* part — what happens when someone actually responds — is still manual chaos.

## The Reply Routing Problem

Here's what happens in a typical week for a solo founder running outbound at scale:

<InsightCard icon="📊" title="The Hidden Cost of Manual Reply Management">
**100 emails sent** → 8 replies (8% rate, decent)  
**3 positive** ("Tell me more")  
**2 objections** ("Not interested right now")  
**2 questions** ("What's the pricing?")  
**1 angry** ("Remove me!")

**Time spent per reply:** 5-15 minutes (checking context, crafting response, updating CRM, setting reminder)  
**Total time:** 40-120 minutes/week just on 8 replies  
**Opportunity cost:** That's 2-3 hours you could spend on *more outreach* or *actual sales calls*
</InsightCard>

Now multiply that by 4 weeks. By multiple campaigns. By multiple inboxes if you're doing proper deliverability rotation.

**The math breaks fast.**

<RangeSlider 
  label="How many hours per week do you currently spend managing replies?" 
  min={0} 
  max={20} 
  lowLabel="0 hours" 
  highLabel="20+ hours" 
  persistKey="ai-outreach-automation-L8-reply-hours" 
/>

## What "Reply Routing" Actually Means

Reply routing isn't just "inbox management." It's a **decision tree that executes automatically** based on what the prospect says and does.

<FlipCard 
  front="Reply Routing Definition" 
  back="An automated system that detects incoming replies, classifies intent, triggers appropriate actions (CRM updates, task creation, auto-responses), and routes high-value conversations to you with full context." 
/>

The components:

1. **Reply Detection** — Knowing when someone responded (across email, LinkedIn, other channels)
2. **Intent Classification** — Positive? Objection? Question? Unsubscribe? Out-of-office?
3. **Action Triggering** — What happens next based on classification
4. **Context Preservation** — Making sure you (or your AI) has full conversation history
5. **Human Escalation** — Routing the right replies to you at the right time

Let's build this system step by step.

---

## Step 1: Reply Detection Across Channels

First problem: **How do you know someone replied?**

Sounds obvious, but when you're running:
- 3-5 email inboxes (for deliverability rotation)
- LinkedIn messages (maybe via HeyReach or Lemlist)
- Possibly Twitter DMs or Instagram (if you're doing creator outreach)

...you need a **centralized reply detection system**, not 7 browser tabs.

### Email Reply Detection

Most outreach platforms (Instantly, Smartlead, Lemlist) have built-in reply detection. But they're not perfect.

<ExampleCard label="The False Positive Problem">
**Scenario:** You send a cold email. Prospect's out-of-office auto-reply triggers. Your platform marks it as a "reply" and stops the sequence.

**Result:** You never send the actual follow-ups. The prospect returns from vacation and never sees your emails again.

**Fix:** Configure your platform to ignore out-of-office patterns. Most tools have this setting buried in campaign settings.
</ExampleCard>

**Platform-Specific Reply Detection:**

| Platform | Reply Detection Quality | Auto-OOO Filtering | Notes |
|----------|------------------------|-------------------|-------|
| Instantly | Excellent | Yes (configurable) | Best at catching threaded replies |
| Smartlead | Excellent | Yes (default on) | Good at detecting forwarded emails |
| Lemlist | Good | Yes | Sometimes misses replies in long threads |
| La Growth Machine | Good | Yes | Multi-channel detection is solid |

<InteractiveChecklist 
  title="Reply Detection Setup Checklist" 
  persistKey="ai-outreach-automation-L8-detection-setup" 
  items={[
    "Enable out-of-office filtering in your outreach platform",
    "Test reply detection by sending yourself a test sequence",
    "Configure 'stop sequence on reply' setting (usually default)",
    "Set up reply notifications (email or Slack) for immediate awareness",
    "Create a 'Replied' tag/status in your CRM for tracking"
  ]} 
/>

### LinkedIn Reply Detection

LinkedIn is trickier because it's not email. If you're using:

- **Lemlist or La Growth Machine:** They detect LinkedIn message replies automatically and stop sequences
- **HeyReach:** Has built-in reply detection for LinkedIn messages
- **Manual LinkedIn:** You need to check daily (or use a tool like Phantombuster to export conversations)

<InsightCard icon="⚠️" title="LinkedIn Reply Detection Lag">
Most LinkedIn automation tools have a 2-24 hour detection lag. Someone might reply on LinkedIn, but your email sequence continues for another day.

**Solution:** Build in 24-hour gaps between LinkedIn and email touches to avoid this overlap.
</InsightCard>

---

## Step 2: Intent Classification (The Smart Part)

Not all replies are created equal. You need to **classify intent** so the system knows what to do next.

### The 6 Reply Categories

<SlideNavigation>
<Slide title="1. Positive Interest">
**Examples:**
- "Tell me more"
- "Can we schedule a call?"
- "What's the pricing?"
- "Send me a case study"

**Action:** High priority. Route to you immediately. Create task: "Follow up within 4 hours."
</Slide>

<Slide title="2. Soft Objection">
**Examples:**
- "Not right now, maybe in Q2"
- "We're evaluating other options"
- "Budget is tight this quarter"

**Action:** Tag as "Nurture." Add to 90-day re-engagement sequence. Don't push.
</Slide>

<Slide title="3. Hard Objection">
**Examples:**
- "Not interested"
- "We have a solution"
- "Please remove me"

**Action:** Stop sequence. Mark as "Closed - Not Interested." Optionally add to 6-month re-engagement list (unless they said "never").
</Slide>

<Slide title="4. Question">
**Examples:**
- "How does this work with [specific tool]?"
- "Do you integrate with Salesforce?"
- "What's your pricing model?"

**Action:** If FAQ-answerable, auto-respond with templated answer. If complex, route to you with suggested response.
</Slide>

<Slide title="5. Out-of-Office">
**Examples:**
- "I'm out until [date]"
- Auto-reply with vacation dates

**Action:** Pause sequence until return date + 2 days. Resume automatically.
</Slide>

<Slide title="6. Angry/Complaint">
**Examples:**
- "How did you get my email?"
- "This is spam"
- "Unsubscribe me immediately"

**Action:** Stop sequence. Mark as "Do Not Contact." If they mention spam, review your targeting and copy.
</Slide>
</SlideNavigation>

### Manual vs AI Classification

You have two options for classifying replies:

**Option A: Manual Classification** (5-10 seconds per reply)
- You read each reply and tag it yourself
- Pros: 100% accurate, you stay close to the data
- Cons: Doesn't scale past ~50 replies/week

**Option B: AI Classification** (instant, 85-95% accurate)
- Use GPT-4 or Claude to classify replies automatically
- Pros: Scales infinitely, frees your time
- Cons: Needs review for edge cases

<ComparisonBuilder
  title="Your Reply Classification Approach"
  persistKey="ai-outreach-automation-L8-classification"
  prompt="How would you classify this reply: 'Interesting, but we're locked into our current vendor until next year. Can you follow up in Q1?'"
  expertExample="Classification: Soft Objection (Timing). Action: Tag as 'Nurture - Q1 2027'. Add to re-engagement sequence starting January 15. Send calendar reminder for January 5 to prep outreach."
  criteria={[
    "Correct category (Positive, Soft Objection, Hard Objection, Question, OOO, Angry)",
    "Appropriate action (route to human, auto-respond, nurture, stop)",
    "Timeline awareness (when to re-engage)"
  ]}
/>

### AI Classification Prompt Template

If you're using Zapier, Make, or n8n to route replies through an LLM, here's a prompt that works:

```
You are a reply classifier for a B2B outreach system.

REPLY TEXT:
{reply_body}

CLASSIFY into one of these categories:
1. POSITIVE — Interested, wants more info, asks for call/demo
2. SOFT_OBJECTION — Not now, timing issue, budget issue, evaluating others
3. HARD_OBJECTION — Not interested, have solution, remove me
4. QUESTION — Asking about features, pricing, integrations
5. OOO — Out of office auto-reply
6. ANGRY — Complaint about being contacted, spam accusation

OUTPUT FORMAT (JSON):
{
  "category": "POSITIVE",
  "confidence": 0.95,
  "reasoning": "Prospect asked for pricing and mentioned a specific use case",
  "suggested_action": "Route to human for immediate follow-up"
}
```

<RangeSlider 
  label="How comfortable are you with AI classifying your replies?" 
  min={1} 
  max={10} 
  lowLabel="Not at all" 
  highLabel="Very comfortable" 
  persistKey="ai-outreach-automation-L8-ai-comfort" 
/>

---

## Step 3: Action Triggering (What Happens Next)

Once a reply is classified, the system needs to **do something**. This is where automation platforms (Zapier, Make, n8n) come in.

### The Core Workflow

```
Reply Detected (Instantly/Smartlead/Lemlist)
    ↓
Webhook sent to automation platform
    ↓
AI classifies reply (GPT-4 via API)
    ↓
Branching logic based on classification:
    ├─ POSITIVE → Create CRM task + Slack notification
    ├─ SOFT_OBJECTION → Add to nurture sequence + tag in CRM
    ├─ HARD_OBJECTION → Stop sequence + mark "Do Not Contact"
    ├─ QUESTION → Check FAQ database → Auto-respond or route to human
    ├─ OOO → Pause sequence until return date
    └─ ANGRY → Stop sequence + alert human immediately
```

### Platform-Specific Webhooks

| Platform | Webhook Support | What Data Is Sent |
|----------|----------------|-------------------|
| Instantly | Yes (native) | Reply body, sender email, campaign ID, prospect data |
| Smartlead | Yes (native) | Reply body, sender email, campaign ID, lead ID |
| Lemlist | Yes (native) | Reply body, sender email, campaign ID, enrichment data |
| La Growth Machine | Yes (native) | Reply body, sender email, multi-channel conversation history |
| HeyReach | Limited | LinkedIn message body, sender profile URL |

<ExampleCard label="Real Workflow: Positive Reply Routing">
**Trigger:** Reply detected in Instantly  
**Step 1:** Webhook → Make.com  
**Step 2:** Make sends reply to GPT-4 for classification  
**Step 3:** GPT-4 returns `{"category": "POSITIVE", "confidence": 0.92}`  
**Step 4:** Make creates task in HubSpot: "Hot lead - reply within 4 hours"  
**Step 5:** Make sends Slack message to #sales channel with reply preview  
**Step 6:** Make updates lead status to "Replied - Positive"  
**Step 7:** Make stops outreach sequence in Instantly  

**Total time:** 10 seconds (automated)  
**Manual equivalent:** 5-10 minutes (check inbox, read context, update CRM, set reminder, craft response)
</ExampleCard>

### The Auto-Response Decision

Some replies can be auto-responded to. Some can't.

<DecisionTree
  title="Should You Auto-Respond?"
  persistKey="ai-outreach-automation-L8-auto-respond"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "A prospect replies with a question about pricing. What do you do?",
      choices: [
        { label: "Auto-respond with pricing link", nextNodeId: "auto" },
        { label: "Manually respond with context", nextNodeId: "manual" }
      ]
    },
    {
      id: "auto",
      content: "You send an automated response with a pricing page link. The prospect ghosts.",
      isTerminal: true,
      outcome: "negative",
      feedback: "Auto-responses to pricing questions often feel impersonal. Better to respond manually with context: 'Pricing depends on X and Y — can we hop on a quick call to make sure I show you the right fit?'"
    },
    {
      id: "manual",
      content: "You respond within 2 hours with a personalized message. Prospect books a call.",
      isTerminal: true,
      outcome: "positive",
      feedback: "Correct. Pricing questions are buying signals. They deserve human attention."
    }
  ]}
/>

**Auto-Response Safe Zones:**
- Out-of-office acknowledgment ("Thanks for the heads up, I'll follow up when you're back")
- Unsubscribe confirmation ("You're removed, sorry to bother you")
- FAQ answers that don't require context (e.g., "Do you integrate with Slack?" → "Yes, here's the doc")

**Manual Response Required:**
- Positive interest (always respond personally)
- Objections (need to understand context)
- Complex questions (pricing, implementation, custom needs)

---

## Step 4: CRM Integration (Context Preservation)

Every reply should update your CRM automatically. Otherwise, you're back to manual data entry.

### What to Update

<TemplateBuilder
  title="CRM Update Schema"
  persistKey="ai-outreach-automation-L8-crm-schema"
  sections={[
    {
      id: "contact",
      title: "Contact Record Updates",
      fields: [
        { id: "status", label: "Lead Status", placeholder: "e.g., Replied - Positive", type: "text" },
        { id: "lastReply", label: "Last Reply Date", placeholder: "Auto-populated", type: "text" },
        { id: "replyCategory", label: "Reply Category", placeholder: "e.g., POSITIVE, SOFT_OBJECTION", type: "text" }
      ]
    },
    {
      id: "activity",
      title: "Activity Log Entry",
      fields: [
        { id: "activityType", label: "Activity Type", placeholder: "e.g., Email Reply", type: "text" },
        { id: "replyBody", label: "Reply Body", placeholder: "Full text of reply", type: "textarea" },
        { id: "sentiment", label: "Sentiment", placeholder: "e.g., Positive, Neutral, Negative", type: "text" }
      ]
    },
    {
      id: "task",
      title: "Task Creation (if needed)",
      fields: [
        { id: "taskTitle", label: "Task Title", placeholder: "e.g., Follow up on pricing question", type: "text" },
        { id: "dueDate", label: "Due Date", placeholder: "e.g., Today + 4 hours", type: "text" },
        { id: "priority", label: "Priority", placeholder: "e.g., High, Medium, Low", type: "text" }
      ]
    }
  ]}
/>

### CRM Platform Integrations

| CRM | Native Integration | Zapier/Make Support | Best For |
|-----|-------------------|---------------------|----------|
| HubSpot | Instantly, Smartlead, Lemlist | Excellent | Mid-market, feature-rich |
| Pipedrive | Instantly, Lemlist | Excellent | Solo founders, simple |
| Salesforce | Smartlead, Lemlist | Excellent | Enterprise (overkill for solo) |
| Attio | Limited | Good via API | Modern, relationship-focused |
| Airtable | None native | Excellent | DIY CRM builders |
| Notion | None native | Good via API | All-in-one workspace users |

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
If you're comfortable with APIs, consider building a custom CRM sync using n8n (self-hosted, free) instead of Zapier ($30-70/mo). You'll have more control and lower costs at scale.
</ContextualNote>

---

## Step 5: Human Escalation (Routing the Right Replies)

Not every reply needs your immediate attention. But some do.

### The Escalation Matrix

<ClassifyExercise
  title="Classify These Replies by Urgency"
  persistKey="ai-outreach-automation-L8-urgency"
  categories={[
    { id: "immediate", label: "Immediate (respond in &lt;4 hours)", color: "#ef4444" },
    { id: "today", label: "Today (respond by EOD)", color: "#f59e0b" },
    { id: "thisWeek", label: "This Week (respond in 2-3 days)", color: "#3b82f6" },
    { id: "automated", label: "Automated (no human needed)", color: "#10b981" }
  ]}
  items={[
    { id: "1", content: "\"Can we schedule a demo for this Friday?\"", correctCategory: "immediate" },
    { id: "2", content: "\"Not interested right now, maybe next quarter\"", correctCategory: "automated" },
    { id: "3", content: "\"What's your pricing for 50 users?\"", correctCategory: "today" },
    { id: "4", content: "\"I'm out of office until next Monday\"", correctCategory: "automated" },
    { id: "5", content: "\"This looks interesting, can you send more info?\"", correctCategory: "today" },
    { id: "6", content: "\"Remove me from your list immediately\"", correctCategory: "automated" },
    { id: "7", content: "\"We're evaluating 3 vendors, can you send a proposal?\"", correctCategory: "immediate" },
    { id: "8", content: "\"How does this integrate with Salesforce?\"", correctCategory: "thisWeek" }
  ]}
/>

### Notification Routing

Where should urgent replies go?

**Option A: Email Notifications**
- Pros: Simple, no new tool
- Cons: Easy to miss in a busy inbox

**Option B: Slack Notifications**
- Pros: Hard to miss, can @mention yourself
- Cons: Requires Slack workspace

**Option C: SMS Notifications** (via Zapier SMS or Twilio)
- Pros: Impossible to miss
- Cons: Can get annoying, costs $0.01-0.05 per SMS

**Option D: Dedicated "Reply Inbox"**
- Pros: All replies in one place, clean separation
- Cons: Another inbox to check

<RangeSlider 
  label="How quickly do you currently respond to positive replies?" 
  min={1} 
  max={48} 
  lowLabel="Within 1 hour" 
  highLabel="48+ hours" 
  persistKey="ai-outreach-automation-L8-response-time" 
/>

<InsightCard icon="⏱️" title="Response Time Impact on Close Rates">
**Harvard Business Review study (2011, still relevant):**
- Respond within 5 minutes → 21x more likely to qualify the lead
- Respond within 1 hour → 7x more likely
- Respond after 24 hours → 60% less likely to connect

**For solo founders:** Aim for &lt;4 hours on positive replies. Use automation to buy yourself time on everything else.
</InsightCard>

---

## Step 6: The Complete Stack (Under $200/Month)

Let's put it all together. Here's a realistic reply routing stack for a solo founder.

### Stack Option A: Instantly + Zapier + HubSpot (Free Tier)

| Component | Tool | Cost | Function |
|-----------|------|------|----------|
| Outreach platform | Instantly Growth | $37/mo | Send sequences, detect replies |
| Automation | Zapier Starter | $30/mo | Webhook routing, AI classification |
| AI classification | OpenAI API (GPT-4o-mini) | ~$5/mo | Classify 500 replies/month |
| CRM | HubSpot Free | $0 | Store contacts, tasks, activity |
| Notifications | Slack Free | $0 | Alert on hot replies |
| **Total** | | **$72/mo** | Full reply routing |

### Stack Option B: Smartlead + Make + Pipedrive

| Component | Tool | Cost | Function |
|-----------|------|------|----------|
| Outreach platform | Smartlead Basic | $39/mo | Send sequences, detect replies |
| Automation | Make.com Free | $0 (1K ops/mo) | Webhook routing, AI classification |
| AI classification | Anthropic API (Claude Haiku) | ~$3/mo | Classify 500 replies/month |
| CRM | Pipedrive Essential | $14/mo | Store contacts, tasks, activity |
| Notifications | Email | $0 | Alert on hot replies |
| **Total** | | **$56/mo** | Budget reply routing |

### Stack Option C: Lemlist + n8n (Self-Hosted) + Airtable

| Component | Tool | Cost | Function |
|-----------|------|------|----------|
| Outreach platform | Lemlist Email Pro | $59/mo | Send sequences, detect replies |
| Automation | n8n (self-hosted) | $0 (or $20/mo cloud) | Webhook routing, AI classification |
| AI classification | OpenAI API (GPT-4o-mini) | ~$5/mo | Classify 500 replies/month |
| CRM | Airtable Free | $0 | Store contacts, tasks, activity |
| Notifications | Slack Free | $0 | Alert on hot replies |
| **Total** | | **$64/mo** | DIY reply routing |

<InteractiveChecklist 
  title="Your Reply Routing Implementation Checklist" 
  persistKey="ai-outreach-automation-L8-implementation" 
  items={[
    "Choose your automation platform (Zapier, Make, or n8n)",
    "Set up webhook from outreach platform to automation tool",
    "Create AI classification workflow (GPT-4 or Claude)",
    "Build CRM update logic (contact status, activity log, task creation)",
    "Configure notification routing (Slack, email, or SMS)",
    "Test with 5-10 sample replies to validate workflow",
    "Set up monitoring (how many replies classified per day, accuracy check)",
    "Create a weekly review process (spot-check AI classifications)"
  ]} 
/>

---

## Common Pitfalls (And How to Avoid Them)

### Pitfall 1: Over-Automation

<ExampleCard label="The Ghost Responder">
**Mistake:** Auto-responding to every reply with templated messages.

**What happened:** Prospect asks a nuanced question. Gets a generic auto-response. Feels ignored. Ghosts.

**Fix:** Auto-respond only to clear-cut cases (OOO, unsubscribe, simple FAQs). Route everything else to human review.
</ExampleCard>

### Pitfall 2: Under-Monitoring

<ExampleCard label="The Broken Webhook">
**Mistake:** Set up reply routing once, never checked it again.

**What happened:** Webhook broke after platform update. 3 weeks of replies went unrouted. Lost 12 hot leads.

**Fix:** Weekly monitoring. Check: (1) How many replies detected? (2) How many classified? (3) Any errors in automation logs?
</ExampleCard>

### Pitfall 3: Classification Drift

<ExampleCard label="The Optimistic AI">
**Mistake:** AI started classifying soft objections as positive interest.

**What happened:** Founder wasted time following up on "not interested" replies because AI tagged them as "POSITIVE."

**Fix:** Monthly review of 20-30 random classifications. Retrain prompt if accuracy drops below 90%.
</ExampleCard>

<LinterFeedback
  title="Reply Routing Health Check"
  persistKey="ai-outreach-automation-L8-health"
  inputLabel="Describe your current reply management process"
  rules={[
    { 
      id: "centralized", 
      label: "Centralized Detection", 
      description: "All replies detected in one place", 
      keywords: ["webhook", "automation", "centralized"], 
      antiKeywords: ["manually check", "multiple inboxes"] 
    },
    { 
      id: "classified", 
      label: "Intent Classification", 
      description: "Replies are categorized by intent", 
      keywords: ["classify", "categorize", "AI", "tag"], 
      antiKeywords: ["read each one", "manually sort"] 
    },
    { 
      id: "crm-sync", 
      label: "CRM Sync", 
      description: "Replies update CRM automatically", 
      keywords: ["CRM", "update", "sync", "automatic"], 
      antiKeywords: ["manually enter", "copy-paste"] 
    },
    { 
      id: "escalation", 
      label: "Smart Escalation", 
      description: "Hot replies routed to you immediately", 
      keywords: ["notification", "alert", "Slack", "urgent"], 
      antiKeywords: ["check daily", "batch process"] 
    }
  ]}
/>

---

## Advanced: Multi-Channel Reply Routing

If you're running multi-channel sequences (email + LinkedIn), reply routing gets more complex.

### The Multi-Channel Challenge

**Problem:** Prospect replies on LinkedIn. Your email sequence continues. They get annoyed.

**Solution:** Cross-channel reply detection.

<ScenarioSimulator
  title="Multi-Channel Reply Impact"
  persistKey="ai-outreach-automation-L8-multichannel"
  levers={[
    { id: "emailReplies", label: "Email replies per week", min: 0, max: 50, step: 5, defaultValue: 20 },
    { id: "linkedinReplies", label: "LinkedIn replies per week", min: 0, max: 30, step: 5, defaultValue: 10 },
    { id: "detectionLag", label: "Detection lag (hours)", min: 0, max: 48, step: 6, defaultValue: 12 }
  ]}
  outputs={[
    { 
      id: "overlap", 
      label: "Overlapping touches", 
      formula: "(linkedinReplies * (detectionLag / 24))", 
      unit: "per week", 
      precision: 1 
    }
  ]}
  insight="At `{overlap}` overlapping touches per week, you're annoying {overlap * 4} prospects per month. Reduce detection lag to &lt;6 hours or add 24-hour gaps between channels."
/>

### Cross-Channel Routing Architecture

```
Reply Detected (any channel)
    ↓
Identify prospect across all channels (email match or LinkedIn URL)
    ↓
Stop ALL active sequences for this prospect (email, LinkedIn, Twitter)
    ↓
Update CRM with reply channel + body
    ↓
Route to human with full multi-channel conversation history
```

**Tools that support this:**
- **Lemlist:** Native multi-channel reply detection
- **La Growth Machine:** Best-in-class cross-channel orchestration
- **Custom via Make/n8n:** Build your own with prospect ID matching

---

## Your Action Plan

<InteractiveChecklist 
  title="This Week: Build Your Reply Routing System" 
  persistKey="ai-outreach-automation-L8-action-plan" 
  items={[
    "Day 1: Choose your automation platform (Zapier, Make, or n8n)",
    "Day 2: Set up webhook from outreach tool → automation platform",
    "Day 3: Build AI classification workflow (test with 10 sample replies)",
    "Day 4: Configure CRM sync (contact updates + task creation)",
    "Day 5: Set up notification routing (Slack or email)",
    "Day 6: Run end-to-end test with 5 real replies",
    "Day 7: Monitor for 24 hours, fix any issues, document your workflow"
  ]} 
/>

## Quiz: Reply Routing Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "A prospect replies: 'Not interested right now, maybe next quarter.' What's the correct classification and action?",
      "options": [
        "POSITIVE — Route to human immediately",
        "SOFT_OBJECTION — Tag as nurture, add to 90-day re-engagement",
        "HARD_OBJECTION — Mark as 'Do Not Contact'",
        "QUESTION — Auto-respond with FAQ"
      ],
      "correctIndex": 1,
      "explanation": "This is a soft objection (timing issue, not a hard no). Tag for nurture and re-engage in 90 days. Don't push now."
    },
    {
      "id": "q2",
      "question": "Your AI classification accuracy drops from 95% to 78% over 2 months. What's the most likely cause?",
      "options": [
        "Your prompt needs retraining with new examples",
        "The AI model was updated and changed behavior",
        "Your reply volume increased and the AI can't handle it",
        "Nothing — 78% is still good enough"
      ],
      "correctIndex": 0,
      "explanation": "Classification drift happens when your prospect language changes but your prompt doesn't. Retrain with recent examples to restore accuracy."
    },
    {
      "id": "q3",
      "question": "You're running email + LinkedIn sequences. A prospect replies on LinkedIn. What should happen to the email sequence?",
      "options": [
        "Continue the email sequence — they're separate channels",
        "Stop the email sequence immediately",
        "Pause the email sequence for 7 days, then resume",
        "Send one more email acknowledging their LinkedIn reply"
      ],
      "correctIndex": 1,
      "explanation": "Stop all sequences immediately when someone replies on any channel. Continuing feels spammy and wastes touches."
    },
    {
      "id": "q4",
      "question": "What's the maximum acceptable response time for a 'POSITIVE' classified reply?",
      "options": [
        "Within 1 hour",
        "Within 4 hours",
        "Within 24 hours",
        "Within 48 hours"
      ],
      "correctIndex": 1,
      "explanation": "Aim for <4 hours on positive replies. Research shows response time dramatically impacts qualification rates. Within 1 hour is ideal but unrealistic for solo founders."
    },
    {
      "id": "q5",
      "question": "Which reply type is SAFE to auto-respond to?",
      "options": [
        "Pricing questions",
        "Out-of-office auto-replies",
        "Objections about timing",
        "Requests for case studies"
      ],
      "correctIndex": 1,
      "explanation": "Out-of-office is the only truly safe auto-response. Everything else benefits from human context and personalization."
    }
  ]
}
```

---

**Next Lesson:** We'll tackle the compliance and deliverability monitoring side — how to make sure your reply routing system doesn't accidentally violate CAN-SPAM, GDPR, or get your domains blacklisted.