---
title: "How AI SDR Platforms Actually Work"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 26: Autonomous SDR Systems"
lesson: 1
---

You're about to spend $750-5,000 per month on an AI SDR platform. Or maybe you're wondering if you should.

Here's what actually happens when you click "Start Campaign":

Sarah, a SaaS founder, signed up for an AI SDR platform in January 2026. The demo was impressive — the AI found prospects, wrote personalized emails, handled replies, and booked meetings. "Set it and forget it," the sales rep said.

Week 1: The AI sent 500 emails. 47 bounced. 3 people replied asking to be removed. 1 person replied: "Did you even read my LinkedIn? I don't work there anymore."

Week 2: Sarah spent 12 hours re-configuring the ICP, rewriting prompts, and adding exclusion rules.

Week 3: The AI booked a meeting. The prospect showed up confused: "I thought I was talking to a human SDR?"

Month 2: Sarah finally got the system tuned. 8 meetings booked. 2 deals in pipeline. But she's spending 45 minutes every morning reviewing the AI's planned sends.

**The question isn't whether AI SDR platforms work. They do — for the right context.**

The question is: **Do you understand what you're actually buying?**

---

## The AI SDR Pipeline: Five Stages That Determine Success

Every AI SDR platform — whether it's 11x, Artisan, AiSDR, or Salesforge — follows the same basic architecture. Understanding these five stages is the difference between "set it and forget it" fantasy and "supervised automation" reality.

<SlideNavigation>
<Slide title="Stage 1: Ingestion">

**What happens:** You feed the AI your Ideal Customer Profile (ICP) and data sources.

**The AI needs:**
- Job titles, company size, industry, tech stack
- Geographic constraints
- Trigger events (funding, hiring, product launches)
- Exclusion rules (competitors, existing customers, blacklist)

**What can go wrong:**
- Vague ICP → AI targets everyone → spam
- Missing exclusions → AI emails your existing customers
- Wrong data source → AI scrapes outdated LinkedIn profiles

<InsightCard icon="🎯" title="The Garbage In, Garbage Out Rule">
AI SDR platforms amplify your targeting. If your ICP is "small businesses," the AI will find 10 million of them. If your ICP is "B2B SaaS founders doing $10K-50K MRR in fintech," the AI will find 200-500 highly relevant prospects.
</InsightCard>

**Solo founder reality:** You need a proven ICP before turning on an AI SDR. If you're still figuring out who to target, start with manual outreach (Course 21).

</Slide>

<Slide title="Stage 2: Research">

**What happens:** The AI enriches each prospect with context for personalization.

**Data sources:**
- LinkedIn activity (posts, comments, job changes)
- Company news (funding, product launches, hiring)
- Tech stack (from BuiltWith, Datanyze, or similar)
- Trigger events (recent website changes, conference attendance)

**What can go wrong:**
- **Hallucinated personalization:** AI invents facts ("I saw you spoke at [conference you never attended]")
- **Stale data:** AI references a job the prospect left 6 months ago
- **Irrelevant context:** AI mentions a LinkedIn post that has nothing to do with your offer

<ExampleCard label="Real Example: The Hallucination That Cost a Deal">
An AI SDR sent: "Congrats on the Series B!" to a founder whose company had actually shut down 3 months earlier. The founder replied: "Do you even know who you're emailing?"

The AI had scraped an old Crunchbase entry and didn't verify recency.
</ExampleCard>

**Solo founder reality:** You MUST review AI-generated personalization for high-value prospects. The 30 seconds it takes to verify a fact is cheaper than the reputational damage of a hallucination.

</Slide>

<Slide title="Stage 3: Sequence">

**What happens:** The AI generates a multi-step email cadence with personalized messaging.

**Typical sequence:**
- Email 1: Personalized opener + value prop
- Email 2 (3 days later): Different angle + social proof
- Email 3 (4 days later): Breakup email or final value add

**What can go wrong:**
- **Off-brand voice:** AI sounds like a corporate robot, not you
- **Too aggressive:** 7 emails in 10 days = spam
- **Generic fallback:** When personalization fails, AI sends bland templates

<FlipCard 
  front="The AI Voice Problem" 
  back="AI SDRs are trained on millions of sales emails. They default to 'professional corporate' voice. Your voice — whether it's technical, conversational, or provocative — requires explicit training and review." 
/>

**Solo founder reality:** Expect to spend 2-4 weeks tuning the AI's voice. You'll rewrite prompts, add examples of your best emails, and set guardrails for tone.

</Slide>

<Slide title="Stage 4: Reply Handling">

**What happens:** The AI classifies incoming replies and responds accordingly.

**Reply types:**
- **Positive/interested:** "Tell me more" → AI drafts a response or escalates to you
- **Objection:** "Too expensive" → AI sends objection handling
- **Not interested:** "Not a fit" → AI sends graceful close
- **Out of office:** Auto-reply → AI reschedules
- **Angry/complaint:** "Stop emailing me" → AI removes and flags

**What can go wrong:**
- **Misclassification:** AI thinks "I'm interested but not until Q3" means "not interested" → sends breakup email → lost deal
- **Tone-deaf responses:** AI sends a rebuttal to someone who's genuinely angry
- **Missed escalations:** AI handles a pricing question that should go to you

<InsightCard icon="⚠️" title="The 5-20% Misclassification Rate">
Even the best AI SDR platforms misclassify 5-20% of replies. At 100 replies/month, that's 5-20 conversations handled incorrectly. For a solo founder, one mishandled warm lead can cost $500-5,000 in lost pipeline.
</InsightCard>

**Solo founder reality:** ALWAYS review replies from interested prospects before the AI responds. Set up escalation rules so positive replies come to you, not the AI.

</Slide>

<Slide title="Stage 5: Booking">

**What happens:** The AI schedules meetings and hands off to you.

**Integration points:**
- Calendar (Calendly, Google Calendar, HubSpot)
- CRM (HubSpot, Salesforce, Pipedrive)
- Notification (Slack, email)

**What can go wrong:**
- **Double-booking:** AI doesn't sync calendar in real-time
- **Wrong meeting type:** AI books a demo when prospect wanted a quick call
- **No context handoff:** You show up to the meeting with zero background

**Solo founder reality:** This is the LOWEST-RISK stage to automate. Once a prospect says "yes to a meeting," calendar automation is safe and high-value.

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Your Pre-Launch Checklist" 
  persistKey="autonomous-sdr-L1-prelaunch"
  items={[
    "I have a proven ICP (tested with at least 50 manual outreach attempts)",
    "I have 3+ months of outreach data showing what messaging works",
    "I have email infrastructure ready (domains, warmup, DNS config)",
    "I can invest 30-60 minutes per day reviewing AI output",
    "I have escalation rules defined for reply types",
    "I have kill switches configured before launch"
  ]}
/>

---

## What "Autonomous" Actually Means in 2026

The term "autonomous SDR" is marketing. Here's the reality spectrum:

<RangeSlider 
  label="Where does your AI SDR sit on the autonomy spectrum?" 
  min={1} 
  max={5} 
  lowLabel="AI Assists (Copilot)" 
  highLabel="AI Runs (Autopilot)" 
  persistKey="autonomous-sdr-L1-spectrum"
  marks={[
    { value: 1, label: "Level 1: AI drafts, human sends every email" },
    { value: 2, label: "Level 2: AI sends to bottom 50%, human reviews top 50%" },
    { value: 3, label: "Level 3: AI sends to bottom 70%, human reviews top 30%" },
    { value: 4, label: "Level 4: AI sends all, human reviews daily queue" },
    { value: 5, label: "Level 5: AI runs end-to-end, human reviews weekly summary" }
  ]}
/>

**The truth about 2026 AI SDR platforms:**
- Most operate at **Level 2-3** out of the box
- They CAN run at Level 4-5, but **shouldn't for solo founders**
- The "autonomous" part is aspirational, not actual

<InsightCard icon="🔍" title="The Solo Founder Rule">
Start at Level 1 (full copilot). Graduate to Level 2 after 30 days of supervised operation. Never go above Level 3 as a solo founder. Your brand reputation is not worth the time savings.
</InsightCard>

### What You Can Safely Automate (Level 1-2)

<ClassifyExercise
  title="Classify These AI SDR Tasks"
  persistKey="autonomous-sdr-L1-classify"
  categories={[
    { id: "safe", label: "Safe to Automate", color: "#10b981" },
    { id: "gate", label: "Automate + Human Gate", color: "#f59e0b" },
    { id: "human", label: "Keep Human", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Email verification and bounce processing", correctCategory: "safe" },
    { id: "2", content: "First-touch email to a cold prospect", correctCategory: "gate" },
    { id: "3", content: "Reply to an interested prospect asking for pricing", correctCategory: "human" },
    { id: "4", content: "CRM field updates (lead source, last contact date)", correctCategory: "safe" },
    { id: "5", content: "Follow-up email #2 in a sequence", correctCategory: "gate" },
    { id: "6", content: "LinkedIn DM to a warm connection", correctCategory: "human" },
    { id: "7", content: "Meeting scheduling after prospect says 'yes'", correctCategory: "safe" },
    { id: "8", content: "Objection handling for 'too expensive'", correctCategory: "gate" },
    { id: "9", content: "Complaint handling ('stop emailing me')", correctCategory: "human" },
    { id: "10", content: "Daily analytics reporting", correctCategory: "safe" }
  ]}
/>

---

## The Market Landscape: 110+ Companies, Most Will Fail

Here's what you need to know about the AI SDR market in 2026:

<FlipCard 
  front="How many AI SDR companies exist?" 
  back="110+ as of early 2026. Most founded in 2023-2024. This is the 'Cambrian explosion' phase — expect 40-60% to shut down or pivot by 2027." 
/>

### The Four Categories of AI SDR Platforms

<SlideNavigation>
<Slide title="Category A: Full-Stack AI SDR">

**Examples:** 11x (Alice), Artisan (Ava)

**What they do:** Replace the entire SDR function. AI finds prospects, researches, writes emails, handles replies, books meetings.

**Pricing:** $2,000-5,000/month

**Built-in database:** Yes (300M+ contacts)

**Solo founder fit:** **LOW** — Built for teams with $100K+ ARR per SDR seat. Overkill for solo founders doing 50-150 contacts/day.

<ExampleCard label="When Full-Stack Makes Sense">
You're a B2B SaaS company doing $500K+ ARR, hiring your first sales team, and need to ramp 3-5 SDRs simultaneously. The AI SDR becomes "SDR #1" while you hire humans.

For a solo founder doing $50K-200K ARR? You're paying for capabilities you don't need.
</ExampleCard>

</Slide>

<Slide title="Category B: AI-Enhanced Sequencer">

**Examples:** AiSDR, Salesforge

**What they do:** Bolt AI onto existing email workflows. Focus on personalization, reply handling, and sequence optimization.

**Pricing:** $40-750/month

**Built-in database:** No (bring your own from Apollo, LinkedIn, etc.)

**Solo founder fit:** **MEDIUM-HIGH** — More affordable, integrates with your existing stack.

**The trade-off:** You still need to build lists manually (or use Apollo/Clay). The AI enhances your workflow but doesn't replace it.

</Slide>

<Slide title="Category C: AI Copilot">

**Examples:** Clay + Instantly combo, Smartlead + ChatGPT

**What they do:** AI assists at each step, but you drive. AI drafts emails, suggests personalization, scores leads. You approve and send.

**Pricing:** $100-200/month (DIY stack)

**Built-in database:** No (you build with Apollo, LinkedIn, scraping)

**Solo founder fit:** **HIGH** — Maximum control, minimum cost, proven results.

**The trade-off:** More manual work. You're the orchestrator, not the AI.

</Slide>

<Slide title="Category D: Vertical-Specific AI SDR">

**Examples:** Regie.ai (enterprise), Exceed.ai (inbound qualification)

**What they do:** AI SDR built for a specific use case or industry.

**Pricing:** Varies ($500-3,000/month)

**Solo founder fit:** **LOW-MEDIUM** — Only if you're in the exact vertical they serve.

</Slide>
</SlideNavigation>

<ComparisonBuilder
  title="Which Category Fits Your Context?"
  persistKey="autonomous-sdr-L1-category"
  prompt="Describe your current situation: MRR, outreach volume, budget, and biggest pain point"
  expertExample="$80K ARR, 50-100 contacts/week, $150/mo budget, biggest pain is personalization at scale → Recommendation: Category C (AI Copilot with Clay + Instantly)"
  criteria={[
    "Budget aligns with pricing tier",
    "Volume matches platform capacity",
    "Pain point addressed by category strengths",
    "Risk tolerance matches autonomy level"
  ]}
/>

---

## The Technology Under the Hood

You don't need to be a machine learning engineer to use AI SDR platforms. But you DO need to understand what's happening behind the scenes — because when things break, you need to know why.

### The AI Stack (Simplified)

<ProgressiveReveal title="The 5 Technologies Powering AI SDRs" persistKey="autonomous-sdr-L1-tech">

<RevealSection title="1. Large Language Models (LLMs)">

**What they do:** Generate personalized email copy, classify replies, handle objections.

**Which models:** GPT-4 (OpenAI), Claude (Anthropic), Gemini (Google). Most platforms use GPT-4 as of 2026.

**Why it matters:** LLMs are probabilistic, not deterministic. Same input can produce different outputs. This is why you get variation in AI-generated emails — and why hallucinations happen.

<FlipCard 
  front="Why does the AI sometimes make things up?" 
  back="LLMs are trained to predict the next word, not verify facts. When the model doesn't have data, it fills gaps with plausible-sounding text. This is why 'I saw you spoke at [conference]' can be invented if the AI doesn't have real event data." 
/>

</RevealSection>

<RevealSection title="2. Enrichment APIs">

**What they do:** Pull prospect data (job title, company, tech stack, recent activity).

**Common providers:** Apollo, Clearbit, ZoomInfo, LinkedIn Sales Navigator API, BuiltWith.

**Why it matters:** The quality of your personalization depends on the quality of your data. Stale data = bad personalization. Missing data = generic emails.

**Solo founder trap:** Enrichment APIs cost $50-200/month on top of the AI SDR platform. Budget accordingly.

</RevealSection>

<RevealSection title="3. Email Infrastructure">

**What they do:** Send emails without getting marked as spam.

**Components:** Dedicated sending domains, DKIM/SPF/DMARC authentication, IP warmup, bounce handling.

**Why it matters:** AI SDR platforms can send 1,000+ emails/day. If your infrastructure isn't configured correctly, Google/Yahoo will block your domain within days.

<InsightCard icon="🚨" title="The 0.3% Spam Rate Threshold">
Google and Yahoo require spam complaint rates below 0.1%. At 0.3%, your domain gets blocked. At 1,000 emails/day, that's 3 complaints = blocked. One angry prospect clicking "Report Spam" can burn your entire infrastructure.
</InsightCard>

**Solo founder reality:** You need 2-3 sending domains, properly warmed up, BEFORE launching an AI SDR. This takes 2-4 weeks. (Covered in Course 22: Email Deliverability.)

</RevealSection>

<RevealSection title="4. Reply Classification (NLP)">

**What they do:** Analyze incoming emails and categorize them (interested, objection, not interested, out of office, angry).

**How it works:** Natural Language Processing models trained on millions of sales emails. They look for keywords, sentiment, and intent.

**Why it matters:** Misclassification = wrong response. "I'm interested but not until Q3" classified as "not interested" → AI sends breakup email → lost deal.

**Accuracy rates:** 80-95% depending on platform. That means 5-20% error rate.

**Solo founder reality:** Always review positive replies before the AI responds. The 30 seconds it takes to verify classification is cheaper than losing a warm lead.

</RevealSection>

<RevealSection title="5. CRM Integration">

**What they do:** Sync prospect data, activity, and meeting bookings with your CRM (HubSpot, Salesforce, Pipedrive).

**Why it matters:** Without CRM integration, you're flying blind. You don't know which prospects are in active sequences, which replied, which booked meetings.

**Solo founder trap:** CRM integrations break. A lot. Budget 1-2 hours/month troubleshooting sync issues.

</RevealSection>

</ProgressiveReveal>

---

## The Solo Founder Context: Why You're Different

AI SDR platforms were designed for **sales teams at $1M+ ARR companies**. You're a solo founder doing $50K-500K ARR. Your needs are fundamentally different:

<SwipeDecision
  title="AI SDR Platform or DIY Stack?"
  description="Swipe right if the scenario fits an AI SDR platform, left if DIY stack is better"
  optionA="DIY Stack"
  optionB="AI SDR Platform"
  persistKey="autonomous-sdr-L1-swipe"
  cards={[
    { 
      id: "1", 
      content: "You're doing 50-100 outreach emails per week", 
      correctOption: "a", 
      explanation: "At this volume, a DIY stack (Instantly + Apollo + ChatGPT) gives you 80% of the capability at 10% of the cost. AI SDR platforms are overkill." 
    },
    { 
      id: "2", 
      content: "You're doing 500+ outreach emails per day across 3 ICPs", 
      correctOption: "b", 
      explanation: "At this volume, an AI SDR platform's automation and reply handling justify the cost. DIY becomes unmanageable." 
    },
    { 
      id: "3", 
      content: "Your average deal size is $2K-5K", 
      correctOption: "a", 
      explanation: "At this deal size, the cost-per-meeting from an AI SDR platform ($50-200) doesn't justify the expense. DIY stack keeps cost-per-meeting at $15-45." 
    },
    { 
      id: "4", 
      content: "Your average deal size is $25K-100K", 
      correctOption: "b", 
      explanation: "At this deal size, the higher cost-per-meeting is justified by pipeline value. One extra meeting per month pays for the platform." 
    },
    { 
      id: "5", 
      content: "You're still figuring out your ICP and messaging", 
      correctOption: "a", 
      explanation: "AI SDR platforms amplify what works. If you don't know what works yet, start with manual outreach or a simple DIY stack. Don't automate uncertainty." 
    },
    { 
      id: "6", 
      content: "You have a proven playbook with 3+ months of data", 
      correctOption: "b", 
      explanation: "If you know what works, an AI SDR platform can scale it. But only if you have the data to configure it correctly." 
    },
    { 
      id: "7", 
      content: "You have $100-200/month for tools", 
      correctOption: "a", 
      explanation: "AI SDR platforms start at $400-750/month. At this budget, DIY stack is your only option." 
    },
    { 
      id: "8", 
      content: "You have $1,000+/month for tools and want to save 10+ hours/week", 
      correctOption: "b", 
      explanation: "If your time is worth $100+/hr and you're spending 10+ hours/week on outreach, an AI SDR platform can pay for itself in time savings." 
    }
  ]}
/>

### The Solo Founder Readiness Scorecard

Before you even CONSIDER an AI SDR platform, answer these questions:

<TemplateBuilder
  title="AI SDR Readiness Assessment"
  persistKey="autonomous-sdr-L1-readiness"
  sections={[
    {
      id: "icp",
      title: "ICP Validation",
      fields: [
        { 
          id: "manual-attempts", 
          label: "How many manual outreach attempts have you made to this ICP?", 
          placeholder: "e.g., 50-100", 
          type: "text",
          hint: "Need at least 50 to validate messaging"
        },
        { 
          id: "reply-rate", 
          label: "What's your current reply rate?", 
          placeholder: "e.g., 5-8%", 
          type: "text",
          hint: "Need at least 3% to justify automation"
        },
        { 
          id: "meeting-rate", 
          label: "What % of positive replies turn into meetings?", 
          placeholder: "e.g., 40-60%", 
          type: "text",
          hint: "Need at least 30% to justify automation"
        }
      ]
    },
    {
      id: "infrastructure",
      title: "Email Infrastructure",
      fields: [
        { 
          id: "domains", 
          label: "How many sending domains do you have?", 
          placeholder: "e.g., 2-3", 
          type: "text",
          hint: "Need at least 2, warmed up for 2-4 weeks"
        },
        { 
          id: "dns-config", 
          label: "Do you have DKIM, SPF, and DMARC configured?", 
          placeholder: "Yes/No", 
          type: "text",
          hint: "If no, start with Course 22 first"
        }
      ]
    },
    {
      id: "time",
      title: "Time Investment",
      fields: [
        { 
          id: "daily-time", 
          label: "Can you invest 30-60 min/day reviewing AI output?", 
          placeholder: "Yes/No", 
          type: "text",
          hint: "This is non-negotiable for the first 60 days"
        },
        { 
          id: "setup-time", 
          label: "Can you invest 20-40 hours in setup and tuning?", 
          placeholder: "Yes/No", 
          type: "text",
          hint: "AI SDR platforms are NOT plug-and-play"
        }
      ]
    },
    {
      id: "budget",
      title: "Budget Reality Check",
      fields: [
        { 
          id: "platform-budget", 
          label: "Monthly budget for AI SDR platform", 
          placeholder: "e.g., $750", 
          type: "text"
        },
        { 
          id: "data-budget", 
          label: "Monthly budget for data/enrichment (Apollo, etc.)", 
          placeholder: "e.g., $99", 
          type: "text"
        },
        { 
          id: "total-budget", 
          label: "Total monthly tool budget", 
          placeholder: "e.g., $849", 
          type: "text",
          hint: "Platform + data + email infra + CRM"
        }
      ]
    }
  ]}
/>

**Scoring:**
- **ICP Validation:** If you haven't done 50+ manual attempts, STOP. Start with Course 21 (AI Acquisition Strategy) or Course 24 (AI Outreach Automation) using a DIY stack.
- **Infrastructure:** If you don't have 2+ warmed domains with DNS configured, STOP. Start with Course 22 (Email Deliverability).
- **Time Investment:** If you can't commit 30-60 min/day for 60 days, STOP. AI SDR platforms require supervision. No exceptions.
- **Budget:** If your total budget is &lt;$400/month, stick with DIY stack. If $400-750, consider Salesforge or AiSDR. If $750+, evaluate AiSDR or Artisan.

---

## What Happens Next

You now understand the five-stage AI SDR pipeline, the autonomy spectrum, the market landscape, and the solo founder context.

**In the next lesson**, we'll dive deep into **Autopilot vs Copilot modes** — when to use each, how to graduate from full supervision to selective automation, and the kill switches you need BEFORE you launch.

**In Lesson 3**, we'll do a platform-by-platform deep dive: 11x, Artisan, AiSDR, and Salesforge — feature comparison, pricing economics, and solo founder fit analysis.

**In Lesson 4**, we'll run the numbers: AI SDR platform vs DIY stack vs human SDR — total cost of ownership, cost per meeting, and ROI breakeven.

But first, let's make sure you're clear on what you just learned:

<InteractiveChecklist 
  title="Lesson 1 Action Items" 
  persistKey="autonomous-sdr-L1-actions"
  items={[
    "Complete the AI SDR Readiness Assessment above",
    "If readiness score is LOW, bookmark this course and start with Course 21 or 22 first",
    "If readiness score is MEDIUM-HIGH, continue to Lesson 2",
    "Research 2-3 AI SDR platforms in your budget range (use the category framework)",
    "Join 1-2 AI SDR communities (Reddit r/sales, AI SDR Slack groups) to hear real user experiences",
    "Set a calendar reminder to review this lesson again in 30 days after you've gathered more data"
  ]}
/>

---

## Knowledge Check

```json
{
  "quizTitle": "AI SDR Fundamentals Check",
  "questions": [
    {
      "id": "q1",
      "question": "What are the five stages of the AI SDR pipeline?",
      "options": [
        "Research, Write, Send, Track, Close",
        "Ingestion, Research, Sequence, Reply, Book",
        "Target, Personalize, Automate, Respond, Convert",
        "Find, Enrich, Email, Classify, Schedule"
      ],
      "correctAnswer": 1,
      "explanation": "The five stages are: (1) Ingestion (ICP + data), (2) Research (enrichment), (3) Sequence (email cadence), (4) Reply (classification + response), (5) Book (meeting scheduling)."
    },
    {
      "id": "q2",
      "question": "What is the typical misclassification rate for AI reply handling?",
      "options": [
        "0-2% (near perfect)",
        "5-20% (significant error rate)",
        "30-40% (unreliable)",
        "50%+ (unusable)"
      ],
      "correctAnswer": 1,
      "explanation": "Even the best AI SDR platforms misclassify 5-20% of replies. At 100 replies/month, that's 5-20 conversations handled incorrectly — which is why human review of positive replies is critical."
    },
    {
      "id": "q3",
      "question": "What is the recommended autonomy level for solo founders starting with an AI SDR?",
      "options": [
        "Level 5 (full autopilot, weekly review)",
        "Level 3-4 (mostly autopilot, daily review)",
        "Level 1-2 (copilot mode, human approves most sends)",
        "Level 0 (AI drafts only, human sends everything)"
      ],
      "correctAnswer": 2,
      "explanation": "Solo founders should start at Level 1 (full copilot) and graduate to Level 2 after 30 days. Never go above Level 3. Your brand reputation is not worth the time savings of full autopilot."
    },
    {
      "id": "q4",
      "question": "Which AI SDR platform category is MOST suitable for solo founders on a $100-200/month budget?",
      "options": [
        "Category A: Full-Stack AI SDR (11x, Artisan)",
        "Category B: AI-Enhanced Sequencer (AiSDR, Salesforge)",
        "Category C: AI Copilot (DIY stack with Clay + Instantly)",
        "Category D: Vertical-Specific AI SDR"
      ],
      "correctAnswer": 2,
      "explanation": "At $100-200/month budget, Category C (DIY stack) is the only viable option. Full-stack platforms start at $2,000+/month. Salesforge ($40-160) is the bridge between DIY and full AI SDR."
    },
    {
      "id": "q5",
      "question": "What is the MINIMUM number of manual outreach attempts you should complete before considering an AI SDR platform?",
      "options": [
        "10-20 (just to test the waters)",
        "50-100 (proven ICP and messaging)",
        "200-500 (extensive validation)",
        "1,000+ (only after scaling manually)"
      ],
      "correctAnswer": 1,
      "explanation": "You need at least 50 manual attempts to validate your ICP and messaging. AI SDR platforms amplify what works — if you don't know what works yet, you'll just automate failure at scale."
    },
    {
      "id": "q6",
      "question": "What is the Google/Yahoo spam complaint rate threshold that will get your domain blocked?",
      "options": [
        "0.1% (1 complaint per 1,000 emails)",
        "0.3% (3 complaints per 1,000 emails)",
        "1% (10 complaints per 1,000 emails)",
        "5% (50 complaints per 1,000 emails)"
      ],
      "correctAnswer": 1,
      "explanation": "Google and Yahoo require spam rates below 0.1%. At 0.3%, your domain gets blocked. At 1,000 emails/day, that's just 3 complaints. This is why email infrastructure and deliverability are critical BEFORE launching an AI SDR."
    }
  ]
}