---
title: "Your Advocacy Playbook"
duration: "45 min"
track: "Customer Success"
course: "Course 39: Customer Advocacy"
lesson: 8
---

You've spent seven lessons building the pieces. Now it's time to assemble them into a system that runs itself.

Most founders treat advocacy like a side project — something they remember to do when they're not firefighting. That's why most advocacy programs die after the first three testimonials.

The founders who win? They build advocacy into the customer journey like it's a feature of the product itself. Testimonials arrive on schedule. Referrals flow without begging. Case studies write themselves because the data is already tracked.

This lesson is your implementation blueprint. By the end, you'll have a complete advocacy playbook that runs on autopilot — collecting proof, deploying it across every surface, and generating new customers while you sleep.

---

## The Advocacy System Architecture

<InsightCard icon="🏗️" title="The Three-Layer System">
**Layer 1: Trigger Detection** — Automated alerts when customers hit advocacy-ready milestones  
**Layer 2: Human Touch** — Personal asks from you (the founder) at exactly the right moment  
**Layer 3: Deployment Engine** — Proof automatically surfaces on your website, emails, and proposals
</InsightCard>

Most founders only build Layer 2 (the ask). That's why it feels like constant manual work.

The system works when all three layers talk to each other:

<FlipCard 
  front="What makes advocacy scalable?" 
  back="Automation detects the moment. You make the personal ask. The system deploys the proof everywhere without you touching it again." 
/>

Let's build each layer.

---

## Layer 1: Automated Milestone Triggers

Your CRM or product analytics already tracks customer behavior. You just need to flag the advocacy-ready moments.

<TemplateBuilder
  title="Your Advocacy Trigger Map"
  persistKey="advocacy-L8-triggers"
  sections={[
    {
      id: "day30",
      title: "Day 30: First Value Achieved",
      fields: [
        { id: "milestone", label: "What milestone signals 'first value'?", placeholder: "e.g., First report generated, first campaign sent, first invoice paid", type: "text" },
        { id: "trigger", label: "How will you detect this?", placeholder: "e.g., Zapier watches Stripe for first payment, product webhook fires on first export", type: "text" },
        { id: "ask", label: "What advocacy ask fits here?", placeholder: "e.g., Written testimonial (3-question form)", type: "text" }
      ]
    },
    {
      id: "day60",
      title: "Day 60: Habit Formed",
      fields: [
        { id: "milestone", label: "What signals regular usage?", placeholder: "e.g., Logged in 15+ times, used core feature 10+ times", type: "text" },
        { id: "trigger", label: "Detection method?", placeholder: "e.g., Product analytics threshold alert", type: "text" },
        { id: "ask", label: "Advocacy ask?", placeholder: "e.g., Online review (G2, Capterra, Google)", type: "text" }
      ]
    },
    {
      id: "day90",
      title: "Day 90: Measurable Results",
      fields: [
        { id: "milestone", label: "What result can you measure?", placeholder: "e.g., Revenue increased 20%, time saved 5 hours/week, churn reduced 3%", type: "text" },
        { id: "trigger", label: "How do you track this?", placeholder: "e.g., Quarterly review meeting, customer self-reports in survey", type: "text" },
        { id: "ask", label: "Advocacy ask?", placeholder: "e.g., Mini case study + referral ask", type: "text" }
      ]
    },
    {
      id: "renewal",
      title: "Renewal/Expansion",
      fields: [
        { id: "milestone", label: "Renewal or upgrade event?", placeholder: "e.g., Annual renewal, plan upgrade, seat expansion", type: "text" },
        { id: "trigger", label: "Detection?", placeholder: "e.g., Stripe webhook, manual CRM flag", type: "text" },
        { id: "ask", label: "Advocacy ask?", placeholder: "e.g., Referral ask (know 1-2 people?)", type: "text" }
      ]
    }
  ]}
/>

<ExampleCard label="Real Trigger Setup: SaaS Founder">
**Day 30 Trigger:** Zapier watches Stripe → First payment received → Slack alert → Founder sends personal testimonial request within 24 hours  
**Day 90 Trigger:** Product analytics → Customer exported 10+ reports → CRM flag → Founder schedules case study interview  
**Renewal Trigger:** Stripe webhook → Annual renewal processed → Auto-add to referral ask list → Founder sends personal thank-you + referral request
</ExampleCard>

The key: **Automate the detection, keep the ask personal.**

<RangeSlider 
  label="How automated are your advocacy triggers right now?" 
  min={1} 
  max={10} 
  lowLabel="100% manual" 
  highLabel="Fully automated" 
  persistKey="advocacy-L8-automation" 
/>

---

## Layer 2: The Personal Ask Library

You've built the triggers. Now you need the exact words to use when the alert fires.

<InsightCard icon="✉️" title="The Founder Voice Advantage">
Automated templates get 8-12% response rates. Personal emails from the founder get 35-50%. The difference? They can tell it's actually you.
</InsightCard>

Here are your four core ask templates. Copy, personalize, send.

<SlideNavigation>
<Slide title="Day 30: Testimonial Ask">

**Subject:** Quick favor? (2 min)

**Body:**

Hey [Name],

Congrats on [specific milestone — first report, first campaign, first payment]! 

I'd love to share your story with others who are facing the same challenge you were when we started. Would you mind answering 3 quick questions? Takes about 2 minutes:

[Link to 3-question form]

No pressure at all — and I'll send you the edited version for your approval before publishing anything.

Thanks for being an amazing [customer/client]!

[Your name]

---

**Why this works:**
- Specific milestone reference (shows you're paying attention)
- Low friction (2 minutes, 3 questions)
- Approval step (removes fear of misrepresentation)
- Personal tone (not a template)

</Slide>

<Slide title="Day 60: Review Ask">

**Subject:** One more quick favor?

**Body:**

Hey [Name],

You've been using [product] for about 2 months now, and I'm hoping you'd be willing to leave a quick review on [G2 / Capterra / Google].

It takes about 3 minutes and helps other [coaches/founders/agencies] discover us.

Here's the link: [review platform link]

If you're not comfortable with that, no worries at all — I totally understand.

Thanks!

[Your name]

---

**Why this works:**
- Acknowledges the ask is a favor
- Specific time estimate (3 minutes)
- Easy out (no pressure)
- Helps others like them (social motivation)

</Slide>

<Slide title="Day 90: Case Study + Referral Ask">

**Subject:** Your results are incredible

**Body:**

Hey [Name],

I was just looking at your numbers — [specific result: 40% revenue increase, 5 hours/week saved, 3% churn reduction]. That's exactly the kind of outcome I built [product] to deliver.

Would you be open to a quick 15-minute call where I ask you about your experience? I'd love to turn it into a short case study (with your approval before publishing, of course).

Also — since you're getting such great results, do you know 1-2 people who might benefit similarly? Happy to offer them [incentive: 10% off first 3 months, $50 credit, etc.] if you make an intro.

Let me know!

[Your name]

---

**Why this works:**
- Leads with their success (not your need)
- Two asks, but both tied to their results
- Approval step for case study
- Specific referral ask (1-2 people, not "tell everyone")

</Slide>

<Slide title="Renewal: Referral Ask">

**Subject:** Thank you (and one question)

**Body:**

Hey [Name],

Thanks for renewing! It means a lot that [product] is still delivering value after [X months/years].

Quick question: do you know 1-2 people who might benefit from what we've built? I'm happy to offer them [incentive] if you make an intro.

No pressure — just thought I'd ask since you've had such a great experience.

Thanks again!

[Your name]

---

**Why this works:**
- Gratitude first (not transactional)
- Ties ask to their positive experience
- Specific (1-2 people)
- Easy out (no pressure)

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Personalize Your Ask Templates" 
  persistKey="advocacy-L8-templates" 
  items={[
    "Replace [product] with your actual product name",
    "Replace [specific milestone] with real customer data points",
    "Replace [incentive] with your actual referral offer (or remove if no incentive)",
    "Add these templates to your CRM or email tool",
    "Test send each template to yourself to check tone"
  ]} 
/>

---

## Layer 3: The Deployment Engine

You've collected the proof. Now it needs to work for you everywhere.

<InsightCard icon="🚀" title="The Deployment Rule">
Every piece of proof should appear in at least 3 places. If it's only on your testimonials page, you're wasting 80% of its value.
</InsightCard>

Here's where each proof type goes:

<ClassifyExercise
  title="Match Proof to Surface"
  persistKey="advocacy-L8-classify"
  categories={[
    { id: "homepage", label: "Homepage", color: "#3b82f6" },
    { id: "email", label: "Sales Email", color: "#10b981" },
    { id: "proposal", label: "Proposal", color: "#f59e0b" },
    { id: "social", label: "LinkedIn/Social", color: "#8b5cf6" }
  ]}
  items={[
    { id: "1", content: "3-sentence written testimonial", correctCategory: "homepage" },
    { id: "2", content: "Mini case study (200-400 words)", correctCategory: "proposal" },
    { id: "3", content: "Video testimonial (30-90 seconds)", correctCategory: "homepage" },
    { id: "4", content: "Customer logo", correctCategory: "homepage" },
    { id: "5", content: "One-sentence result quote", correctCategory: "email" },
    { id: "6", content: "Challenge→Solution→Results story", correctCategory: "social" },
    { id: "7", content: "G2 review screenshot", correctCategory: "proposal" }
  ]}
/>

### Your Deployment Checklist

Every time you collect new proof, run this checklist:

<InteractiveChecklist 
  title="Proof Deployment Checklist" 
  persistKey="advocacy-L8-deploy" 
  items={[
    "Add to website testimonials page",
    "Add best quote to homepage hero section",
    "Add to Social Proof Library (organized by industry/use case)",
    "Create 1-2 LinkedIn posts featuring the story",
    "Add relevant case study to proposal template",
    "Add one-sentence quote to email signature",
    "Update sales email sequences with new proof",
    "Share in Slack/team channel (if you have a team)",
    "Tag in CRM for future reference"
  ]} 
/>

<ExampleCard label="Deployment in Action">
**New testimonial collected:** "Before [product], I spent 8 hours/week on manual reports. Now it's automated and takes 10 minutes. Saved me 30+ hours/month." — Sarah, Marketing Director

**Deployed to:**
1. Homepage: "Saved me 30+ hours/month" — Sarah, Marketing Director
2. Email sequence: "Our customers save an average of 30 hours/month on reporting."
3. LinkedIn post: Story format — "Sarah used to spend 8 hours/week on manual reports. Here's how she automated it..."
4. Proposal: Mini case study in "Results" section
5. Email signature: "Join 100+ marketers saving 30+ hours/month"
</ExampleCard>

---

## The 30-Day Advocacy Sprint

You've built the system. Now let's turn it on.

<InsightCard icon="⚡" title="The Sprint Goal">
In the next 30 days, you will collect 5-10 new pieces of proof and deploy them across every customer-facing surface. This is not a "someday" project. This is your primary acquisition activity for the next month.
</InsightCard>

<ProgressiveReveal title="Your 30-Day Sprint Plan" persistKey="advocacy-L8-sprint">

<RevealSection title="Week 1: Trigger Setup">

**Days 1-2: Audit your customer data**
- List every customer who's achieved a measurable result in the last 90 days
- Identify which advocacy milestone they've hit (Day 30, 60, 90, renewal)
- Flag 10 customers for immediate outreach

**Days 3-4: Build your triggers**
- Set up Zapier/webhook alerts for Day 30, 60, 90 milestones
- Create CRM flags for advocacy-ready customers
- Test one trigger end-to-end (simulate milestone → alert fires → you receive notification)

**Days 5-7: Personalize your ask templates**
- Customize the 4 core templates with your product/service details
- Add them to your email tool or CRM
- Send 3 testimonial requests to Day 30 customers

**Target:** 3 testimonial requests sent, 1-2 responses received

</RevealSection>

<RevealSection title="Week 2: Collection Blitz">

**Days 8-10: Testimonial collection**
- Send 5 more testimonial requests (Day 30-60 customers)
- Follow up with anyone who hasn't responded from Week 1
- Edit and get approval for any testimonials received

**Days 11-12: Review requests**
- Send 3-5 review requests to Day 60+ customers
- Provide direct links to G2, Capterra, or Google
- Follow up 3 days later if no response

**Days 13-14: Case study outreach**
- Identify 2 customers with strong measurable results
- Send case study interview request
- Schedule 15-minute calls for Week 3

**Target:** 5-8 written testimonials collected, 2-3 reviews posted, 2 case study interviews scheduled

</RevealSection>

<RevealSection title="Week 3: Case Studies + Referrals">

**Days 15-17: Case study interviews**
- Conduct 2 case study interviews (15 minutes each)
- Use the 3-question format: Challenge, Solution, Results
- Record with permission (Zoom or Loom)

**Days 18-19: Case study writing**
- Draft 2 mini case studies (200-400 words each)
- Send to customers for approval
- Edit based on feedback

**Days 20-21: Referral asks**
- Send referral requests to 5 customers who've renewed or expanded
- Use the "know 1-2 people?" template
- Offer to write the intro email for them

**Target:** 2 case studies approved, 2-3 referral intros made

</RevealSection>

<RevealSection title="Week 4: Deployment + Automation">

**Days 22-24: Deploy proof everywhere**
- Add all new testimonials to website
- Update homepage with best quotes
- Add case studies to proposal template
- Create 3-5 LinkedIn posts from new proof

**Days 25-26: Update email sequences**
- Add new proof to sales email sequences
- Update email signature with latest metric
- Test send sequences to yourself

**Days 27-28: Automate ongoing collection**
- Finalize Zapier/webhook triggers
- Set calendar reminders for manual asks (if needed)
- Document your advocacy playbook for future reference

**Days 29-30: Measure + iterate**
- Count total proof collected (target: 8-12 pieces)
- Measure deployment coverage (proof should be in 5+ places)
- Identify gaps and plan next sprint

**Target:** All proof deployed, automation running, playbook documented

</RevealSection>

</ProgressiveReveal>

<RangeSlider 
  label="How confident are you in executing this 30-day sprint?" 
  min={1} 
  max={10} 
  lowLabel="Need more clarity" 
  highLabel="Ready to start tomorrow" 
  persistKey="advocacy-L8-confidence" 
/>

---

## The Advocacy Metrics Dashboard

You can't improve what you don't measure. Here are the 6 metrics that matter:

<ScenarioSimulator
  title="Advocacy ROI Calculator"
  persistKey="advocacy-L8-roi"
  levers={[
    { id: "customers", label: "Total active customers", min: 10, max: 500, step: 10, defaultValue: 50 },
    { id: "askRate", label: "% asked for advocacy each month", min: 5, max: 50, step: 5, defaultValue: 20 },
    { id: "responseRate", label: "Response rate (%)", min: 10, max: 70, step: 5, defaultValue: 40 }
  ]}
  outputs={[
    { id: "monthly", label: "New proof pieces per month", formula: "(customers * (askRate / 100) * (responseRate / 100))", unit: "", precision: 1 },
    { id: "quarterly", label: "Proof pieces per quarter", formula: "(customers * (askRate / 100) * (responseRate / 100) * 3)", unit: "", precision: 0 }
  ]}
  insight="At `{monthly}` pieces/month, you'll have `{quarterly}` new testimonials, case studies, or referrals every quarter. That's enough to refresh your entire website and sales materials 2-3x per year."
/>

### Your Advocacy Scorecard

Track these monthly:

1. **Advocacy Asks Sent** — How many customers did you ask for testimonials, reviews, case studies, or referrals?
2. **Response Rate** — What % responded positively?
3. **Proof Collected** — How many new pieces (testimonials, case studies, reviews, referrals)?
4. **Deployment Coverage** — How many surfaces is each piece deployed to? (Target: 3+)
5. **Referral Conversion** — Of referrals made, how many became customers?
6. **Proof Freshness** — What % of deployed proof is less than 6 months old?

<ExampleCard label="Scorecard Example: Month 3">
- **Asks Sent:** 12 (8 testimonial, 2 case study, 2 referral)
- **Response Rate:** 50% (6 responses)
- **Proof Collected:** 5 testimonials, 1 case study, 2 referral intros
- **Deployment Coverage:** 4.2 surfaces per piece (homepage, email, proposal, LinkedIn)
- **Referral Conversion:** 1 of 2 referrals became a customer (50%)
- **Proof Freshness:** 80% of deployed proof is &lt;6 months old
</ExampleCard>

---

## Common Advocacy Failure Modes (And How to Avoid Them)

<StrategyDuel
  title="The Advocacy Trap"
  persistKey="advocacy-L8-trap"
  scenario="You've collected 10 great testimonials. What do you do?"
  strategyA={{ 
    name: "Hoard them", 
    description: "Save them for a big website redesign in 6 months", 
    pros: ["Everything launches at once", "Feels more 'complete'"], 
    cons: ["Zero ROI for 6 months", "Proof gets stale", "You forget to deploy"] 
  }}
  strategyB={{ 
    name: "Deploy immediately", 
    description: "Add them to your site, emails, and proposals this week", 
    pros: ["Immediate conversion lift", "Proof stays fresh", "Momentum builds"], 
    cons: ["Feels 'messy' or incomplete"] 
  }}
  expertVerdict="Deploy immediately wins every time. A single testimonial on your homepage today is worth more than 10 testimonials sitting in a Google Doc for 6 months. Ship proof as you collect it."
/>

### The 5 Advocacy Killers

<FlipCard front="Killer #1: Waiting for 'enough' proof" back="You don't need 50 testimonials. You need 3 good ones deployed everywhere. Start with what you have." />

<FlipCard front="Killer #2: Asking everyone at once" back="Batch asks feel spammy and get ignored. Ask 3-5 customers per week, timed to their milestones." />

<FlipCard front="Killer #3: Generic ask templates" back="'We'd love a testimonial' gets 10% response. 'Congrats on [specific result]! Mind sharing your story?' gets 40%." />

<FlipCard front="Killer #4: No approval step" back="Customers fear misrepresentation. Always send edited version for approval before publishing." />

<FlipCard front="Killer #5: Collecting but not deploying" back="Proof in a folder = $0 value. Proof on your homepage, in emails, and in proposals = measurable revenue lift." />

---

## Your Advocacy Playbook (Final Artifact)

You've built the pieces across 8 lessons. Now assemble them into one document you can reference forever.

<TemplateBuilder
  title="Your Complete Advocacy Playbook"
  persistKey="advocacy-L8-playbook"
  sections={[
    {
      id: "triggers",
      title: "Advocacy Triggers",
      fields: [
        { id: "day30", label: "Day 30 trigger + ask", placeholder: "Milestone: First value achieved | Ask: Written testimonial", type: "textarea" },
        { id: "day60", label: "Day 60 trigger + ask", placeholder: "Milestone: Habit formed | Ask: Online review", type: "textarea" },
        { id: "day90", label: "Day 90 trigger + ask", placeholder: "Milestone: Measurable results | Ask: Case study + referral", type: "textarea" },
        { id: "renewal", label: "Renewal trigger + ask", placeholder: "Milestone: Renewal/expansion | Ask: Referral", type: "textarea" }
      ]
    },
    {
      id: "templates",
      title: "Ask Templates",
      fields: [
        { id: "testimonial", label: "Testimonial request email", placeholder: "Subject: Quick favor? (2 min) | Body: Hey [Name]...", type: "textarea" },
        { id: "review", label: "Review request email", placeholder: "Subject: One more quick favor? | Body: Hey [Name]...", type: "textarea" },
        { id: "casestudy", label: "Case study request email", placeholder: "Subject: Your results are incredible | Body: Hey [Name]...", type: "textarea" },
        { id: "referral", label: "Referral request email", placeholder: "Subject: Thank you (and one question) | Body: Hey [Name]...", type: "textarea" }
      ]
    },
    {
      id: "deployment",
      title: "Deployment Checklist",
      fields: [
        { id: "surfaces", label: "List all surfaces where proof will be deployed", placeholder: "Homepage, sales emails, proposals, LinkedIn, email signature, etc.", type: "textarea" },
        { id: "process", label: "Deployment process (step-by-step)", placeholder: "1. Collect proof | 2. Edit + get approval | 3. Add to website | 4. Update email sequences | 5. Create LinkedIn post | etc.", type: "textarea" }
      ]
    },
    {
      id: "metrics",
      title: "Advocacy Metrics",
      fields: [
        { id: "targets", label: "Monthly targets", placeholder: "Asks sent: 10 | Response rate: 40% | Proof collected: 4 pieces | Deployment coverage: 3+ surfaces", type: "textarea" },
        { id: "tracking", label: "How will you track these?", placeholder: "Google Sheet, CRM dashboard, monthly review meeting, etc.", type: "text" }
      ]
    },
    {
      id: "sprint",
      title: "30-Day Sprint Plan",
      fields: [
        { id: "week1", label: "Week 1 actions", placeholder: "Audit customers, set up triggers, send 3 testimonial requests", type: "textarea" },
        { id: "week2", label: "Week 2 actions", placeholder: "Collection blitz: 5-8 testimonials, 2-3 reviews, 2 case study interviews scheduled", type: "textarea" },
        { id: "week3", label: "Week 3 actions", placeholder: "Conduct interviews, write case studies, send referral asks", type: "textarea" },
        { id: "week4", label: "Week 4 actions", placeholder: "Deploy all proof, automate triggers, measure results", type: "textarea" }
      ]
    }
  ]}
/>

---

## Your Final Action Items

<InteractiveChecklist 
  title="Launch Your Advocacy System" 
  persistKey="advocacy-L8-final" 
  items={[
    "Complete your Advocacy Trigger Map (Day 30, 60, 90, renewal)",
    "Personalize all 4 ask templates with your product/service details",
    "Set up at least one automated trigger (Zapier, webhook, or CRM alert)",
    "Identify 10 customers ready for immediate advocacy asks",
    "Send your first 3 testimonial requests this week",
    "Create your Social Proof Library structure (folder, spreadsheet, or tool)",
    "Add deployment checklist to your workflow (every new proof → 3+ surfaces)",
    "Schedule your 30-day advocacy sprint start date",
    "Set up monthly advocacy metrics tracking (scorecard or dashboard)",
    "Document your complete playbook in one place (Google Doc, Notion, or CRM)"
  ]} 
/>

---

## What Happens Next

You've built a complete advocacy system. Here's what changes:

**Week 1:** You send your first batch of asks. 2-3 customers respond with testimonials. You feel the momentum.

**Week 2:** You deploy those testimonials on your homepage. A prospect mentions seeing them during a sales call. You realize it's working.

**Week 3:** A customer makes a referral intro. That referral becomes a customer. You just acquired a customer for $0.

**Week 4:** You have 8-10 new pieces of proof. Your website feels more credible. Your emails get higher reply rates. Your proposals close faster.

**Month 2:** The triggers run automatically. Testimonials arrive without you asking. Referrals become a predictable channel.

**Month 3:** You have more proof than you can deploy. You start being selective — only the best stories make it to the homepage. You've built a machine.

This is the advocacy flywheel in motion. Every customer success creates more proof. Every piece of proof attracts better customers. Every better customer creates stronger proof.

You're not begging for testimonials anymore. You're managing an abundance of advocacy.

---

<InsightCard icon="🎯" title="The Real Win">
Advocacy isn't a marketing tactic. It's proof that you're building something people actually want. When customers volunteer to tell your story, you've crossed the threshold from "product" to "movement."
</InsightCard>

Now go build your playbook. Start your 30-day sprint. And watch what happens when your customers become your best salespeople.

---

## Course Completion Quiz

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the optimal timing window for asking for advocacy after a customer success milestone?",
      "options": [
        "Within 1 week",
        "Within 48-72 hours",
        "Within 2 weeks",
        "Anytime within the first month"
      ],
      "correctAnswer": 1,
      "explanation": "The advocacy window is 48-72 hours after a measurable success. After that, the emotional high fades and response rates drop 50%."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "What is the #1 reason most advocacy programs fail?",
      "options": [
        "Customers don't want to help",
        "The asks are too complicated",
        "Founders don't ask at all",
        "The incentives aren't strong enough"
      ],
      "correctAnswer": 2,
      "explanation": "83% of satisfied customers are willing to refer, but only 29% do — because nobody asked them. The ask gap is the killer."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "How many surfaces should each piece of proof be deployed to (minimum)?",
      "options": [
        "1 (just the testimonials page)",
        "2 (website + email)",
        "3+ (website, email, proposal, social, etc.)",
        "5+ (everywhere possible)"
      ],
      "correctAnswer": 2,
      "explanation": "Every piece of proof should appear in at least 3 places. If it's only on your testimonials page, you're wasting 80% of its value."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What is the correct advocacy ask sequence for a new customer?",
      "options": [
        "Referral → Testimonial → Case study → Review",
        "Testimonial → Review → Case study → Referral",
        "Case study → Testimonial → Referral → Review",
        "Review → Referral → Testimonial → Case study"
      ],
      "correctAnswer": 1,
      "explanation": "The optimal advocacy journey: testimonial first (lowest friction), then review, then case study, then referral. Each step builds on the previous."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "What should you do with a testimonial before publishing it?",
      "options": [
        "Publish immediately as-is",
        "Edit for grammar, then publish without asking",
        "Edit for clarity, send for approval, then publish",
        "Rewrite completely to sound more professional"
      ],
      "correctAnswer": 2,
      "explanation": "The correct flow: edit for grammar and clarity → send edited version for approval → customer approves → publish. The approval step prevents surprises and builds trust."
    },
    {
      "id": "q6",
      "type": "true-false",
      "question": "True or False: Personal emails from the founder get 3x the response rate of automated advocacy request templates.",
      "correctAnswer": true,
      "explanation": "True. Automated templates get 8-12% response rates. Personal emails from the founder get 35-50%. Customers can tell the difference."
    },
    {
      "id": "q7",
      "type": "multiple-choice",
      "question": "What is the most effective referral ask phrasing?",
      "options": [
        "Tell all your friends about us!",
        "Do you know anyone who might benefit?",
        "Do you know 1-2 people who might benefit?",
        "Please refer as many people as possible"
      ],
      "correctAnswer": 2,
      "explanation": "The specific ask 'Do you know 1-2 people?' converts 40% better than vague asks like 'Tell everyone.' Specificity reduces cognitive load."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "What are the three layers of a scalable advocacy system?",
      "options": [
        "Ask, Collect, Deploy",
        "Trigger Detection, Human Touch, Deployment Engine",
        "Testimonials, Case Studies, Referrals",
        "Automation, Templates, Metrics"
      ],
      "correctAnswer": 1,
      "explanation": "Layer 1: Trigger Detection (automated alerts). Layer 2: Human Touch (personal asks). Layer 3: Deployment Engine (proof surfaces everywhere automatically)."
    },
    {
      "id": "q9",
      "type": "true-false",
      "question": "True or False: You should wait until you have 20+ testimonials before deploying any of them to your website.",
      "correctAnswer": false,
      "explanation": "False. Deploy proof as you collect it. A single testimonial on your homepage today is worth more than 10 testimonials sitting in a folder for 6 months. Ship immediately."
    },
    {
      "id": "q10",
      "type": "multiple-choice",
      "question": "What is the target response rate for advocacy asks sent to customers at the right milestone?",
      "options": [
        "10-20%",
        "25-35%",
        "40-60%",
        "70-80%"
      ],
      "correctAnswer": 2,
      "explanation": "When timed correctly (within 48 hours of a success milestone) and personalized, advocacy asks get 40-60% response rates. Generic or poorly timed asks get 10-20%."
    }
  ]
}