---
title: "Marketing Automation Basics: The Logic Engine"
duration: "50 min"
track: "Marketing Engine"
course: "Course 12: Marketing Automation & Analytics"
lesson: 4
---

# Marketing Automation Basics: The Logic Engine

As a solo founder, you are the CEO, the Head of Sales, and the Support Team.
You cannot personally follow up with every lead who downloads a checklist. You cannot manually check if every trial user has logged in.

If you try to do it manually, you will burn out.
More likely, you will just stop doing it.
This is why most solo founders fail at growth. They have the "traffic," but they don't have the "follow-up."

**Marketing Automation** is your invisible employee.
It works 24/7. It never asks for a raise. It never forgets to send an email.
At its core, automation is a simple logic engine: **"When X happens, automatically do Y."**

<InsightCard icon="🤖" title="The Real Automation Mindset">
You're not replacing yourself. You're cloning your best follow-up habits so they run while you sleep.
</InsightCard>

In this lesson, we will demystify automation (removing the "tech fear") and give you the 5 "Plug-and-Play" workflows that every solo founder needs to run a 6-figure business.

---

## 1. The Anatomy of an Automation

You do not need to be a coder to build automation. You just need to understand four Lego blocks.

<SlideNavigation>
<Slide title="Block 1: The Trigger">

### The Trigger ("When...")
The Trigger is the starting gun. It is the event that wakes the robot up.
*   **Action-Based:** "User submits the Newsletter form."
*   **Behavior-Based:** "User visits the Pricing Page 3 times."
*   **Time-Based:** "It is 9:00 AM on Tuesday."
*   **Integration-Based:** "A row was added to Google Sheets" or "A payment succeeded in Stripe."

</Slide>

<Slide title="Block 2: The Action">

### The Action ("...Do This")
The Action is the work getting done.
*   **Send:** An email, an SMS, a Slack message.
*   **Update:** Add a tag, change a lead score, move a deal stage in CRM.
*   **Create:** A task, a project, a user account.

</Slide>

<Slide title="Block 3: The Delay">

### The Delay ("...Wait")
Automation that happens instantly feels robotic. Delays make it feel human.
*   "Wait 2 days."
*   "Wait until Monday at 8 AM." (Don't email people on Saturday night).

</Slide>

<Slide title="Block 4: The Condition">

### The Condition ("...If")
This is the brain. It lets you treat different people differently.
*   **The Filter:** "Only proceed IF the user is a 'VIP'."
*   **The Branch:**
    *   *Path A (Clicked):* Send "Sales Pitch."
    *   *Path B (Didn't Click):* Send "Reminder."

</Slide>
</SlideNavigation>

<RangeSlider 
  label="How comfortable are you with automation concepts right now?" 
  min={1} 
  max={10} 
  lowLabel="Total beginner" 
  highLabel="Ready to build" 
  persistKey="course-12-marketing-automation-analytics-L4-comfort" 
/>

---

## 2. The "Big 5" Solopreneur Workflows

Stop trying to build complex "Spiderwebs." You only need these 5 workflows to scale.

### Workflow 1: The "Immediate Value" Handshake (Welcome)
**The Goal:** Indoctrination. Turn a stranger into a friend.
*   **Trigger:** Form Submission (Lead Magnet).
*   **Step 1:** Apply Tag: `Source: Lead Magnet`.
*   **Step 2:** Send Email 1 (Asset Delivery). **Subject:** "Here is your PDF."
*   **Step 3:** Wait 1 Day.
*   **Step 4:** Send Email 2 (The Backstory). **Subject:** "Why I built this..."
*   **Step 5:** Wait 2 Days.
*   **Step 6:** Send Email 3 (Case Study). **Subject:** "How John used this..."

### Workflow 2: The "Trial Nurse" (Onboarding)
**The Goal:** Activation. Get the new user to the "Aha Moment" before they churn.
*   **Trigger:** New Account Created (Stripe/App).
*   **Step 1:** Wait 2 Days.
*   **Step 2 (Condition):** Check App Data. Has user [Uploaded a File]?
    *   *Yes:* Do nothing (They are active).
    *   *No:* Send Email: "Need help uploading?" with a loom video.
*   **Step 3:** Wait 5 Days.
*   **Step 4 (Condition):** Has user [upgraded]?
    *   *No:* Send "Trial Ending Soon" offer.

### Workflow 3: The "Hot Lead" Detector (Sales Alert)
**The Goal:** Intervention. Stop the robot, start the human.
*   **Trigger:** User visits "Pricing Page" OR "Book a Demo" Page.
*   **Condition:** Lead Score > 50 (They are engaged).
*   **Action:** Send Slack/Email to Founder: *"HOT LEAD: [Name] is looking at pricing. Email them now."*
*   **Why:** A personal email sent 5 minutes after a pricing visit closes at 40%. A generic email closes at 2%.

### Workflow 4: The "Zombie Cleaner" (List Hygiene)
**The Goal:** Deliverability. Protect your sender reputation.
*   **Trigger:** User has not opened an email in 90 days.
*   **Step 1:** Send Email: "Are you still there? (Click to stay)."
*   **Step 2:** Wait 7 Days.
*   **Step 3 (Condition):** Did they click?
    *   *Yes:* Reset status to Active.
    *   *No:* Unsubscribe and Delete.
*   **Results:** Your open rates go up, and Google stops sending you to spam.

### Workflow 5: The "Happy Customer" Loop (Referral)
**The Goal:** Virality.
*   **Trigger:** NPS Score is 9 or 10 (or Purchase Complete + 30 Days).
*   **Step 1:** Wait 1 Hour (Don't be weirdly fast).
*   **Step 2:** Send Email: "Glad you like it! Quick question..."
*   **Step 3:** Ask for a Review (G2/Capterra) or a Referral.
*   **Step 4:** If they do it, spark a Zapier automation to send them a $50 gift card.

<ClassifyExercise
  title="Match the Workflow to the Goal"
  persistKey="course-12-marketing-automation-analytics-L4-classify"
  categories={[
    { id: "indoctrination", label: "Indoctrination", color: "#3b82f6" },
    { id: "activation", label: "Activation", color: "#10b981" },
    { id: "intervention", label: "Intervention", color: "#f59e0b" },
    { id: "hygiene", label: "List Hygiene", color: "#8b5cf6" },
    { id: "virality", label: "Virality", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Send welcome sequence after lead magnet download", correctCategory: "indoctrination" },
    { id: "2", content: "Alert founder when prospect visits pricing page 3 times", correctCategory: "intervention" },
    { id: "3", content: "Remove subscribers who haven't opened in 90 days", correctCategory: "hygiene" },
    { id: "4", content: "Check if trial user has uploaded their first file", correctCategory: "activation" },
    { id: "5", content: "Ask happy customers for referrals after 30 days", correctCategory: "virality" },
    { id: "6", content: "Send onboarding tips to new trial users", correctCategory: "activation" }
  ]}
/>

---

## 3. Tool Selection: Where does the Brain live?

You have 3 options for where to build these minds.

**Option A: The ESP Brain (Kit/ConvertKit, ActiveCampaign)**
*   *Best For:* Creators, Coaches, Newsletter writers.
*   *Pros:* Easy visual builder.
*   *Cons:* Can't see "inside" your SaaS app easily.

**Option B: The CRM Brain (HubSpot, Pipedrive)**
*   *Best For:* High-Ticket Sales, Agency owners.
*   *Pros:* Great for managing 1:1 deal stages.
*   *Cons:* Expensive. Email builder is usually ugly.

**Option C: The "Glue" Brain (Zapier/Make)**
*   *Best For:* Connecting disparate tools.
*   *Example:* "When Typeform is filled -> Create Trello Card -> Send Slack -> Add to Mailchimp."
*   *Warning:* Don't build *logic* in Zapier if you can avoid it. It gets messy and expensive. Use Zapier to *move data*, use your ESP to *run logic*.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Your instinct will be to build custom automation in code. Resist this for 90% of workflows. Use no-code tools for speed, reserve custom code only for unique competitive advantages (e.g., proprietary lead scoring algorithms).
</ContextualNote>

---

## 4. Conditional Logic: The Secret Weapon

The biggest mistake founders make is sending every email to everyone.
This trains people to ignore you.
**Conditional Logic** allows you to be specific.

**Example: The Interest Tagging System**
In your "Welcome Email," you ask: *"What are you most interested in?"*
*   [ ] SEO
*   [ ] Paid Ads
*   [ ] Social Media

**The Logic:**
*   IF they click "SEO" -> Apply Tag `Interest: SEO`.
*   Future Newsletter: "New SEO Course" -> ONLY send to `Interest: SEO` tag.

**Result:** Your open rates double because the content is relevant.

<FlipCard 
  front="Why does segmented email outperform broadcast?" 
  back="Because relevance beats reach. A 40% open rate on 200 targeted subscribers generates more revenue than 5% on 2,000 generic subscribers. Conditional logic lets you be relevant at scale." 
/>

---

## 5. Dual Context Examples

### Scenario A: B2B SaaS ("RepoGuard")
**Workflow:** The Expired Trial Recovery.
*   **Trigger:** Trial Expired (Status = Churned).
*   **Delay:** Wait 30 Days. (Let them miss the tool).
*   **Action:** Send "Changes" Email: *"Since you left, we added [Feature X] and [Feature Y]. Want to peek?"*
*   **Condition:** IF they click -> Extend Trial by 7 Days automatically.

### Scenario B: Creator/Coach ("The Fitness System")
**Workflow:** The "Abandon Cart" Rescue.
*   **Trigger:** User visited Checkout Page but did NOT buy.
*   **Delay:** Wait 2 Hours.
*   **Action:** Send Email: *"Did the connection drop? I saw you were checking out the Course. I saved your spot."*
*   **Delay:** Wait 24 Hours.
*   **Action:** Send "Objection Killer" Email: *"Here is why [Price] is cheaper than a gym membership."*

<DecisionTree
  title="Build Your First Workflow"
  persistKey="course-12-marketing-automation-analytics-L4-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "What's your primary business model?", 
      choices: [
        { label: "B2B SaaS with free trial", nextNodeId: "saas" },
        { label: "Creator/Coach with digital products", nextNodeId: "creator" }
      ]
    },
    { 
      id: "saas", 
      content: "Start with the 'Trial Nurse' workflow. Focus on activation (getting users to their first value moment).", 
      choices: [
        { label: "What if they don't activate?", nextNodeId: "saas-inactive" }
      ]
    },
    { 
      id: "saas-inactive", 
      content: "Add a conditional branch: IF no activity after 3 days, send a Loom video walkthrough. IF still no activity after 7 days, trigger a personal outreach from you.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "creator", 
      content: "Start with the 'Immediate Value Handshake' (welcome sequence). Build trust before pitching.", 
      choices: [
        { label: "When should I pitch my paid product?", nextNodeId: "creator-pitch" }
      ]
    },
    { 
      id: "creator-pitch", 
      content: "Email 3-5 in your welcome sequence. By then, they've consumed your free value and understand your expertise. Use a soft pitch: 'If you want to go deeper, here's how I can help.'", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

---

## 6. Summary Checklist

<InteractiveChecklist 
  title="Your Automation Setup Checklist" 
  persistKey="course-12-marketing-automation-analytics-L4-actions" 
  items={[
    "Define the Trigger: Be specific. Is it a click or a form fill?",
    "Map the Flow: Draw it on paper (circles and arrows) before you open the software",
    "Check the Exit: How does someone leave the workflow? (e.g., If they buy, stop pitching)",
    "Test the Delays: Are you sending 5 emails in 1 hour by accident?",
    "Human Override: Do you have a 'Sales Alert' set up for high-intent leads?",
    "Set up your first 'Big 5' workflow this week"
  ]} 
/>

---

## 7. Practice Exercise: Paper Automation

Take a blank sheet of paper.
Draw your **"Welcome Sequence"** using standard flowchart symbols.

1.  **Circle:** Start (Trigger).
2.  **Rectangle:** Action (Email).
3.  **Diamond:** Decision (If/Then).
4.  **Lines:** The path.

**Scenario:**
*   User joins list.
*   Send PDF.
*   IF they click PDF, wait 2 days, then send "Advanced Tip."
*   IF they don't click PDF, wait 1 day, send "Reminder."

Draw it. This simple exercise saves you hours of frustration in the software.

<TemplateBuilder
  title="Your Welcome Sequence Blueprint"
  persistKey="course-12-marketing-automation-analytics-L4-blueprint"
  sections={[
    {
      id: "trigger",
      title: "Trigger Event",
      fields: [
        { id: "event", label: "What action starts this workflow?", placeholder: "e.g., User downloads lead magnet", type: "text" }
      ]
    },
    {
      id: "email1",
      title: "Email 1: Immediate Delivery",
      fields: [
        { id: "subject1", label: "Subject Line", placeholder: "e.g., Here's your [Asset Name]", type: "text" },
        { id: "goal1", label: "Primary Goal", placeholder: "e.g., Deliver value, set expectations", type: "text" }
      ]
    },
    {
      id: "condition",
      title: "Conditional Branch",
      fields: [
        { id: "behavior", label: "What behavior triggers the branch?", placeholder: "e.g., Clicked link in Email 1", type: "text" },
        { id: "pathA", label: "Path A (Engaged)", placeholder: "e.g., Send advanced content", type: "text" },
        { id: "pathB", label: "Path B (Not Engaged)", placeholder: "e.g., Send reminder or re-engagement", type: "text" }
      ]
    },
    {
      id: "timing",
      title: "Timing & Delays",
      fields: [
        { id: "delay1", label: "Delay before Email 2", placeholder: "e.g., 2 days", type: "text" },
        { id: "delay2", label: "Delay before Email 3", placeholder: "e.g., 3 days", type: "text" }
      ]
    }
  ]}
/>

---

## Quiz: Automation Logic

```json
{
  "quizId": "automation-basics",
  "title": "The Logic Engine Quiz",
  "questions": [
    {
      "id": "aut1",
      "type": "multiple-choice",
      "text": "What is the 'Trigger' in an automation workflow?",
      "options": [
        { "id": "a", "text": "The email you send." },
        { "id": "b", "text": "The event that starts the workflow (e.g., tag added, form submitted)." },
        { "id": "c", "text": "The unsubscribe link." },
        { "id": "d", "text": "The delay timer." }
      ],
      "correctAnswer": "b",
      "explanation": "Every automation needs a starting line. Without a trigger, the robot sleeps forever."
    },
    {
      "id": "aut2",
      "type": "multiple-choice",
      "text": "Why do we use 'Delays' between emails?",
      "options": [
        { "id": "a", "text": "To save server costs." },
        { "id": "b", "text": "To make the communication feel human and avoid overwhelming the user." },
        { "id": "c", "text": "To trick the spam filter." },
        { "id": "d", "text": "We shouldn't; faster is better." }
      ],
      "correctAnswer": "b",
      "explanation": "Rapid-fire emails signal 'Bot' or 'Spammer.' Respectful pacing builds relationships."
    },
    {
      "id": "aut3",
      "type": "true-false",
      "text": "True or False: The 'Zombie Cleaner' workflow deletes subscribers who haven't opened emails in 90 days to improve deliverability.",
      "correctAnswer": "true",
      "explanation": "True. Sending to people who don't open hurts your reputation with Gmail. Pruning the list is healthy."
    },
    {
      "id": "aut4",
      "type": "multiple-choice",
      "text": "What is 'Conditional Logic' (If/Then)?",
      "options": [
        { "id": "a", "text": "A coding language." },
        { "id": "b", "text": "A way to branch the workflow based on user behavior (e.g., IF they clicked, do X; IF NOT, do Y)." },
        { "id": "c", "text": "A philosophical concept." },
        { "id": "d", "text": "A type of email template." }
      ],
      "correctAnswer": "b",
      "explanation": "Conditions allow personalization at scale. You treat interested people differently than disinterested people."
    },
    {
      "id": "aut5",
      "type": "multiple-choice",
      "text": "Which worksflow sends an alert to the Founder when a lead visits the Pricing page?",
      "options": [
        { "id": "a", "text": "The Welcome Sequence." },
        { "id": "b", "text": "The Hot Lead Detector." },
        { "id": "c", "text": "The Newsletter." },
        { "id": "d", "text": "The Zombie Cleaner." }
      ],
      "correctAnswer": "b",
      "explanation": "This is a 'Intervention' workflow. It uses automation to wake up the human for a high-value manual touch."
    }
  ]
}
```

**Next Lesson:** [Minimum Viable Marketing Stack](/marketing-engine/course-12-marketing-automation-analytics/lesson-5)