---
title: "Building a 'Solo AI SDR Lite' System"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 26: Autonomous SDR Systems"
lesson: 10
---

# Building a 'Solo AI SDR Lite' System

You've spent nine lessons learning how AI SDR platforms work, what they cost, where they fail, and how to supervise them. Now comes the moment of truth: **should you actually use one?**

For most solo founders reading this in 2026, the answer is **no — not yet**. But that doesn't mean you can't harness AI SDR capabilities. You just need to build your own "lite" version using the DIY stack you already know, enhanced with strategic AI automation.

This final lesson is your implementation blueprint. By the end, you'll have a working "Solo AI SDR Lite" system that gives you 70-80% of the capability of a $750-5,000/month platform at $100-200/month cost.

## The Solo AI SDR Lite Architecture

Here's what we're building:

<FlipCard 
  front="What is 'Solo AI SDR Lite'?" 
  back="A DIY stack (Instantly/Smartlead + Apollo + ChatGPT + Zapier) configured to automate the low-risk, high-time-savings parts of the AI SDR pipeline while keeping humans in the loop for everything brand-critical." 
/>

The architecture has five layers, each with a specific automation level:

<SlideNavigation>
<Slide title="Layer 1: Ingestion (90% Automated)">

**What it does:** Pull prospect data from Apollo, enrich with LinkedIn/company data, verify emails, deduplicate against CRM.

**Tools:** Apollo API + Zapier + ChatGPT for enrichment prompts + NeverBounce/ZeroBounce

**Human role:** Define ICP filters once, review new list additions weekly (10 min)

**Why automate:** Zero brand risk, high time savings (saves 2-3 hours/week)

</Slide>

<Slide title="Layer 2: Research (70% Automated)">

**What it does:** For each prospect, gather: recent LinkedIn posts, company news, tech stack signals, mutual connections, trigger events.

**Tools:** Clay (if budget allows) OR ChatGPT + Perplexity + manual LinkedIn checks

**Human role:** Review AI-generated research summaries, flag hallucinations, add context notes

**Why semi-automate:** Hallucination risk exists, but research is time-intensive (saves 1-2 hours/week)

</Slide>

<Slide title="Layer 3: Sequence (50% Automated)">

**What it does:** Generate personalized first lines, assemble email variants, schedule sends across multiple domains.

**Tools:** ChatGPT for first-line generation + Instantly/Smartlead for sequencing + Sales Linter for quality checks

**Human role:** Approve every first-touch email to high-value prospects, auto-send to bottom 30% after 30 days of calibration

**Why copilot mode:** Brand voice consistency is critical (saves 1 hour/week once tuned)

</Slide>

<Slide title="Layer 4: Reply Handling (30% Automated)">

**What it does:** Classify replies (interested/objection/not interested/OOO), draft responses for common scenarios.

**Tools:** ChatGPT for classification + response drafting + Zapier for routing

**Human role:** Review and send ALL replies to interested prospects, approve objection responses, let AI handle "not interested" breakups

**Why mostly human:** Misclassification cost is too high (saves 30 min/week, prevents $500-5K losses)

</Slide>

<Slide title="Layer 5: Booking (80% Automated)">

**What it does:** Send calendar links, handle reschedules, send reminders, log meetings in CRM.

**Tools:** Calendly/Cal.com + Zapier + CRM integration

**Human role:** Confirm meeting details for high-value prospects, handle timezone confusion

**Why automate:** Low risk, high annoyance factor (saves 1 hour/week)

</Slide>
</SlideNavigation>

<InsightCard icon="🎯" title="The 70/30 Rule">
Your Solo AI SDR Lite should automate 70% of the **time** but only 30% of the **decisions**. Time savings come from eliminating grunt work. Quality comes from human judgment on every message that matters.
</InsightCard>

## Your Decision: Platform vs DIY vs Hybrid

Before we build, let's make sure you're choosing the right path.

<StrategyDuel
  title="AI SDR Platform vs Solo AI SDR Lite"
  persistKey="autonomous-sdr-L10-duel"
  scenario="You're a solo founder doing $15K MRR, spending 6 hours/week on outreach, booking 6-8 meetings/month."
  strategyA={{
    name: "AI SDR Platform (AiSDR)",
    description: "Pay $750/mo for full AI SDR with reply handling and built-in supervision",
    pros: [
      "Reply classification and drafting included",
      "Multi-channel coordination (email + LinkedIn)",
      "Faster setup (platform handles infrastructure)",
      "Built-in analytics and reporting"
    ],
    cons: [
      "$750/mo = 6-7x more expensive than DIY",
      "Still requires 2-3 hours/week supervision",
      "Vendor lock-in risk (young company)",
      "Generic AI voice (doesn't sound like you)"
    ]
  }}
  strategyB={{
    name: "Solo AI SDR Lite (DIY)",
    description: "Build with Instantly + Apollo + ChatGPT + Zapier for $150/mo",
    pros: [
      "$150/mo = 5x cheaper",
      "Full control over voice and logic",
      "No vendor risk (you own the stack)",
      "Can start small and scale gradually"
    ],
    cons: [
      "Requires 10-15 hours initial setup",
      "More manual supervision (3-4 hours/week)",
      "No built-in reply classification",
      "You're responsible for all troubleshooting"
    ]
  }}
  expertVerdict="For solo founders under $50K MRR: DIY wins. The cost savings ($7,200/year) fund other growth experiments. You'll spend an extra hour/week on supervision, but you'll learn the system deeply and avoid vendor risk. Switch to a platform only when you're consistently maxing out your DIY capacity (200+ sends/day, 15+ meetings/month)."
/>

Still not sure? Use this decision framework:

<RangeSlider
  label="How many qualified meetings are you booking per month right now?"
  min={0}
  max={20}
  step={1}
  lowLabel="0-5"
  highLabel="15-20"
  persistKey="autonomous-sdr-L10-meetings"
/>

<RangeSlider
  label="What's your current monthly revenue (MRR)?"
  min={0}
  max={100}
  step={5}
  lowLabel="$0-10K"
  highLabel="$80-100K"
  persistKey="autonomous-sdr-L10-mrr"
/>

<RangeSlider
  label="How many hours per week can you dedicate to outreach (including supervision)?"
  min={0}
  max={15}
  step={1}
  lowLabel="0-3 hours"
  highLabel="12-15 hours"
  persistKey="autonomous-sdr-L10-time"
/>

<ContextualNote showWhen={{ meetings: [0, 8] }} variant="personalized" title="Recommendation: Start with DIY">
You're booking fewer than 8 meetings/month. An AI SDR platform won't magically 3x that — you need to nail your ICP and messaging first. Build the Solo AI SDR Lite system, run it for 90 days, then reassess.
</ContextualNote>

<ContextualNote showWhen={{ meetings: [12, 20], mrr: [50, 100] }} variant="personalized" title="Recommendation: Consider a Platform">
You're at scale (12+ meetings/month, $50K+ MRR). An AI SDR platform like AiSDR or Salesforge could save you 3-5 hours/week. The $750/mo cost is justified by your time value. But start with a monthly contract — don't lock in annually.
</ContextualNote>

## Building Your Solo AI SDR Lite: The 7-Day Sprint

Let's build this system in one week. Each day has a specific focus and a 60-90 minute time budget.

<ProgressiveReveal title="7-Day Build Sprint" persistKey="autonomous-sdr-L10-sprint">

<RevealSection title="Day 1: Infrastructure Audit & Setup (90 min)">

**Goal:** Ensure your email infrastructure can handle AI-assisted sending.

**Tasks:**

1. **Domain health check** — Run your sending domains through mail-tester.com. Score must be 8/10+. If not, fix SPF/DKIM/DMARC records.
2. **Warmup status** — If domains are &lt;30 days old, they need 2-4 more weeks of warmup before AI-assisted volume. Don't skip this.
3. **Tool stack confirmation** — You need: Instantly or Smartlead ($37-39/mo), Apollo ($49-99/mo), ChatGPT Plus ($20/mo), Zapier or Make ($7-20/mo), email verification ($4/mo).
4. **CRM integration** — Connect Instantly/Smartlead to your CRM (HubSpot, Pipedrive, Notion). Test that new leads sync correctly.

**Deliverable:** Checklist of infrastructure readiness. All green = proceed. Any red = fix before Day 2.

<InteractiveChecklist
  title="Day 1 Checklist"
  persistKey="autonomous-sdr-L10-day1"
  items={[
    "Sending domains score 8/10+ on mail-tester.com",
    "Domains are 30+ days old OR in active warmup",
    "Instantly/Smartlead account active and connected to CRM",
    "Apollo account active with API access",
    "ChatGPT Plus subscription active",
    "Zapier/Make account set up",
    "Email verification tool configured (NeverBounce/ZeroBounce)"
  ]}
/>

</RevealSection>

<RevealSection title="Day 2: ICP-to-Filter Translation (60 min)">

**Goal:** Turn your ICP into Apollo filters that AI can use to pull prospect lists.

**Tasks:**

1. **Review your ICP** — From Course 1, Lesson 3. If you don't have one, STOP. Go back and build it. You cannot automate targeting without a target.
2. **Translate to Apollo filters** — Use ChatGPT to convert ICP prose into Apollo search criteria (job titles, company size, industry, tech stack, location, recent funding).
3. **Test the filter** — Run it in Apollo. Does it return 500-2,000 prospects? If &lt;500, broaden slightly. If >5,000, narrow.
4. **Save as a reusable search** — Apollo lets you save searches. Name it clearly: "ICP-Primary-2026-Q2"

**Deliverable:** One saved Apollo search that returns your ICP prospects.

<TemplateBuilder
  title="ICP-to-Apollo Filter Translator"
  persistKey="autonomous-sdr-L10-apollo"
  sections={[
    {
      id: "icp",
      title: "Your ICP (Paste from Course 1)",
      fields: [
        { id: "description", label: "ICP Description", placeholder: "e.g., B2B SaaS founders doing $10-50K MRR, 1-5 employees, using HubSpot", type: "textarea" }
      ]
    },
    {
      id: "filters",
      title: "Apollo Filters (AI-Generated)",
      fields: [
        { id: "titles", label: "Job Titles", placeholder: "e.g., Founder, CEO, Co-Founder", type: "text" },
        { id: "companySize", label: "Company Size", placeholder: "e.g., 1-10 employees", type: "text" },
        { id: "industry", label: "Industry", placeholder: "e.g., Computer Software, SaaS", type: "text" },
        { id: "techStack", label: "Tech Stack (if applicable)", placeholder: "e.g., HubSpot, Stripe", type: "text" },
        { id: "location", label: "Location", placeholder: "e.g., United States, Remote", type: "text" },
        { id: "other", label: "Other Signals", placeholder: "e.g., Recent funding, hiring, posted on LinkedIn", type: "textarea" }
      ]
    }
  ]}
/>

</RevealSection>

<RevealSection title="Day 3: Research Automation Setup (90 min)">

**Goal:** Build a Zapier workflow that enriches each new Apollo lead with AI-generated research.

**Tasks:**

1. **Create a Zapier workflow** — Trigger: New lead added to Apollo list. Action 1: Pull LinkedIn profile URL. Action 2: Send to ChatGPT with prompt: "Summarize this person's recent activity and identify one relevant pain point for [your product]." Action 3: Store summary in CRM custom field.
2. **Test with 5 leads** — Manually add 5 prospects to your Apollo list. Verify that research summaries appear in your CRM within 2-3 minutes.
3. **Review for hallucinations** — Check each summary. Did ChatGPT invent facts? If yes, refine your prompt to say: "Only use information from the LinkedIn profile. If you can't find something, say 'Not available.'"
4. **Set a daily limit** — Configure Zapier to process max 50 leads/day. This prevents runaway costs and gives you time to review.

**Deliverable:** Working Zapier automation that enriches leads with AI research.

<ExampleCard label="Sample ChatGPT Research Prompt">
**Prompt:**

"You are a sales research assistant. I will give you a LinkedIn profile URL. Your job is to:

1. Summarize their current role and company in one sentence.
2. Identify their most recent LinkedIn post or activity (if available).
3. Suggest one specific pain point they might have that relates to [YOUR PRODUCT CATEGORY].

Rules:
- Only use information from the LinkedIn profile. Do not invent facts.
- If information is not available, write 'Not available.'
- Keep the summary under 100 words.

LinkedIn URL: [PROFILE_URL]"

**Sample Output:**

"John Smith is the founder of a 5-person marketing agency in Austin, TX. His most recent post discussed the challenge of tracking ROI across multiple client campaigns. Potential pain point: Manual reporting is time-consuming and error-prone, limiting his ability to scale client accounts."
</ExampleCard>

</RevealSection>

<RevealSection title="Day 4: First-Line Generation System (90 min)">

**Goal:** Create a repeatable process for AI to generate personalized first lines that pass the Sales Linter.

**Tasks:**

1. **Build a first-line prompt template** — Use ChatGPT to draft first lines based on research summaries. Template: "Based on this research: [SUMMARY], write a personalized first line for a cold email. The line should reference a specific detail and connect it to [YOUR VALUE PROP]. Keep it under 20 words."
2. **Generate 10 first lines** — Use your Day 3 research summaries. Generate first lines for 10 prospects.
3. **Run through Sales Linter** — Score each first line on: (1) Specific to this person? (2) References real information? (3) Connects to value prop? (4) Under 20 words?
4. **Iterate on prompt** — If &lt;7/10 pass the linter, refine your ChatGPT prompt. Add examples of good vs bad first lines.
5. **Save as a reusable workflow** — Store your final prompt in a doc. This is your "First-Line Generator SOP."

**Deliverable:** 10 AI-generated first lines that score 8/10+ on Sales Linter.

<LinterFeedback
  title="Sales Linter: First-Line Scorer"
  persistKey="autonomous-sdr-L10-linter"
  inputLabel="Paste your AI-generated first line"
  rules={[
    {
      id: "specific",
      label: "Specific to this person",
      description: "References their role, company, or recent activity",
      keywords: ["noticed", "saw that", "read your post", "your company"],
      antiKeywords: ["businesses like yours", "companies in your industry"]
    },
    {
      id: "factual",
      label: "Factually accurate",
      description: "No hallucinated details or assumptions",
      keywords: [],
      antiKeywords: ["I assume", "I imagine", "probably"]
    },
    {
      id: "value",
      label: "Connects to value prop",
      description: "Links their situation to your solution",
      keywords: ["help", "solve", "reduce", "increase", "automate"],
      antiKeywords: []
    },
    {
      id: "length",
      label: "Concise (under 20 words)",
      description: "Short enough to read in 3 seconds",
      keywords: [],
      antiKeywords: []
    }
  ]}
/>

</RevealSection>

<RevealSection title="Day 5: Sequence Assembly & Safety Guardrails (90 min)">

**Goal:** Build your first AI-assisted sequence in Instantly/Smartlead with human approval gates.

**Tasks:**

1. **Create a 4-step sequence** — Step 1: Personalized first-touch (AI-generated first line + your standard pitch). Step 2: Value-add follow-up (share resource). Step 3: Soft breakup. Step 4: Final breakup.
2. **Configure send delays** — 3 days between steps. Never send on weekends. Send between 8am-5pm in prospect's timezone.
3. **Set daily send limits** — Start with 50 sends/day total across all sequences. Increase by 10/day each week if deliverability stays clean.
4. **Add safety guardrails** — Instantly/Smartlead settings: (1) Stop sequence if prospect replies. (2) Stop sequence if email bounces. (3) Stop sequence if prospect unsubscribes. (4) Never send to the same person twice (global suppression list).
5. **Test with 10 prospects** — Add 10 low-value prospects to the sequence. Review each email before it sends (copilot mode). Verify guardrails work.

**Deliverable:** One working sequence with safety guardrails active.

<InsightCard icon="⚠️" title="The 50/Day Rule">
Solo founders should NEVER send more than 150 emails/day total, even with perfect infrastructure. Start at 50/day. The marginal benefit of 200/day is not worth the deliverability risk or supervision burden.
</InsightCard>

</RevealSection>

<RevealSection title="Day 6: Reply Classification & Routing (60 min)">

**Goal:** Set up a system to classify replies and route them to the right action.

**Tasks:**

1. **Create a reply classification Zap** — Trigger: New reply in Instantly/Smartlead. Action 1: Send reply text to ChatGPT with prompt: "Classify this reply as: INTERESTED / OBJECTION / NOT_INTERESTED / OOO / CONFUSED / ANGRY. Explain why in one sentence."
2. **Set up routing rules** — Based on classification: INTERESTED → Slack notification + CRM task for founder. OBJECTION → Draft response, hold for review. NOT_INTERESTED → Send graceful close (auto). OOO → Reschedule for 2 weeks. CONFUSED → Escalate to founder. ANGRY → PAUSE all sends to this person + escalate.
3. **Test with sample replies** — Create 6 test replies (one for each category). Verify that routing works correctly.
4. **Build a daily review queue** — Every morning, check: (1) INTERESTED replies (respond within 2 hours), (2) OBJECTION drafts (approve/edit), (3) ANGRY escalations (handle immediately).

**Deliverable:** Reply classification Zap + daily review queue in CRM.

<ClassifyExercise
  title="Reply Classification Practice"
  persistKey="autonomous-sdr-L10-classify"
  categories={[
    { id: "interested", label: "Interested", color: "#10b981" },
    { id: "objection", label: "Objection", color: "#f59e0b" },
    { id: "not-interested", label: "Not Interested", color: "#ef4444" },
    { id: "ooo", label: "Out of Office", color: "#6366f1" },
    { id: "confused", label: "Confused", color: "#8b5cf6" },
    { id: "angry", label: "Angry/Complaint", color: "#dc2626" }
  ]}
  items={[
    { id: "1", content: "Thanks for reaching out. Can we schedule a call next week?", correctCategory: "interested" },
    { id: "2", content: "We already have a solution for this.", correctCategory: "objection" },
    { id: "3", content: "Not interested, please remove me.", correctCategory: "not-interested" },
    { id: "4", content: "I'm out of the office until March 15th.", correctCategory: "ooo" },
    { id: "5", content: "I don't understand what you're offering. Can you clarify?", correctCategory: "confused" },
    { id: "6", content: "Stop spamming me. I'm reporting this.", correctCategory: "angry" },
    { id: "7", content: "Interesting timing — we're evaluating options now. What's your pricing?", correctCategory: "interested" },
    { id: "8", content: "We don't have budget for this right now.", correctCategory: "objection" }
  ]}
/>

</RevealSection>

<RevealSection title="Day 7: Launch & Daily Supervision Ritual (60 min)">

**Goal:** Launch your Solo AI SDR Lite system and establish your daily supervision routine.

**Tasks:**

1. **Final pre-launch checklist** — Review: Infrastructure ready? ICP filter tested? Research automation working? First-line generator tuned? Sequence built with guardrails? Reply routing configured?
2. **Add first 50 prospects** — Pull from your Apollo saved search. Let the research automation enrich them overnight.
3. **Review enriched data** — Next morning, check research summaries for hallucinations. Flag any bad data.
4. **Approve first 10 emails** — Review AI-generated first lines. Edit as needed. Approve for send.
5. **Set your daily supervision ritual** — Every morning, 15 minutes: (1) Check reply queue (5 min). (2) Review today's planned sends (5 min). (3) Scan deliverability metrics (3 min). (4) Approve/edit/reject (2 min).
6. **Schedule weekly calibration** — Every Friday, 30 minutes: Review reply rates, classification accuracy, deliverability, and adjust prompts/filters as needed.

**Deliverable:** System is live. First 10 emails sent. Daily supervision ritual established.

<InteractiveChecklist
  title="Day 7 Launch Checklist"
  persistKey="autonomous-sdr-L10-launch"
  items={[
    "Infrastructure audit complete (all green)",
    "Apollo ICP filter saved and tested",
    "Research automation working (tested with 5 leads)",
    "First-line generator tuned (8/10+ linter score)",
    "Sequence built with safety guardrails",
    "Reply classification and routing configured",
    "First 50 prospects added and enriched",
    "First 10 emails reviewed and approved",
    "Daily 15-minute supervision block scheduled",
    "Weekly 30-minute calibration session scheduled"
  ]}
/>

</RevealSection>

</ProgressiveReveal>

## Measuring Success: Your 90-Day Benchmarks

You've built the system. Now, how do you know if it's working?

<ScenarioSimulator
  title="Solo AI SDR Lite ROI Calculator"
  persistKey="autonomous-sdr-L10-roi"
  levers={[
    { id: "sends", label: "Daily sends", min: 20, max: 150, step: 10, defaultValue: 50 },
    { id: "replyRate", label: "Reply rate (%)", min: 1, max: 15, step: 0.5, defaultValue: 5 },
    { id: "positiveRate", label: "Positive reply rate (% of replies)", min: 10, max: 50, step: 5, defaultValue: 25 },
    { id: "meetingRate", label: "Meeting booking rate (% of positive)", min: 30, max: 70, step: 5, defaultValue: 50 },
    { id: "closeRate", label: "Close rate (%)", min: 10, max: 40, step: 5, defaultValue: 20 },
    { id: "dealSize", label: "Average deal size ($)", min: 1000, max: 50000, step: 1000, defaultValue: 10000 }
  ]}
  outputs={[
    { id: "replies", label: "Replies/month", formula: "(sends * 22 * (replyRate / 100))", unit: "", precision: 0 },
    { id: "positive", label: "Positive replies/month", formula: "(sends * 22 * (replyRate / 100) * (positiveRate / 100))", unit: "", precision: 0 },
    { id: "meetings", label: "Meetings/month", formula: "(sends * 22 * (replyRate / 100) * (positiveRate / 100) * (meetingRate / 100))", unit: "", precision: 1 },
    { id: "deals", label: "Deals closed/month", formula: "(sends * 22 * (replyRate / 100) * (positiveRate / 100) * (meetingRate / 100) * (closeRate / 100))", unit: "", precision: 1 },
    { id: "revenue", label: "Monthly revenue", formula: "(sends * 22 * (replyRate / 100) * (positiveRate / 100) * (meetingRate / 100) * (closeRate / 100) * dealSize)", unit: "$", precision: 0 }
  ]}
  insight="At `{meetings}` meetings/month and a {closeRate}% close rate, you're generating $`{revenue}`/month in new revenue. Your Solo AI SDR Lite costs ~$150/mo, so your ROI is {(revenue / 150).toFixed(0)}x. If meetings < 8/month after 90 days, revisit your ICP and messaging."
/>

Here are your 90-day benchmarks:

| Metric | Month 1 (Calibration) | Month 2 (Optimization) | Month 3 (Steady State) |
|--------|----------------------|----------------------|----------------------|
| Daily sends | 30-50 | 50-80 | 80-120 |
| Reply rate | 3-6% | 4-7% | 5-8% |
| Positive reply rate | 15-25% of replies | 20-30% of replies | 25-35% of replies |
| Meetings booked | 3-6 | 6-10 | 8-15 |
| Cost per meeting | $25-50 | $15-25 | $10-20 |
| Founder time/week | 4-5 hours | 3-4 hours | 2-3 hours |

<InsightCard icon="📊" title="The 8-Meeting Threshold">
If you're not booking at least 8 meetings/month by Month 3, the problem is NOT your automation. It's your ICP, your offer, or your messaging. Go back to Courses 1-3 before adding more AI.
</InsightCard>

## When to Upgrade to a Full AI SDR Platform

You've built your Solo AI SDR Lite. It's working. You're booking 10-15 meetings/month. When should you consider upgrading to a $750-5,000/month AI SDR platform?

<DecisionTree
  title="Should You Upgrade to an AI SDR Platform?"
  persistKey="autonomous-sdr-L10-upgrade"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Are you consistently booking 12+ meetings/month with your DIY system?",
      choices: [
        { label: "Yes", nextNodeId: "volume" },
        { label: "No", nextNodeId: "stay-diy" }
      ]
    },
    {
      id: "stay-diy",
      content: "Stay with your DIY system. Focus on improving ICP targeting and messaging before adding cost.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "volume",
      content: "Are you sending 150+ emails/day and hitting infrastructure limits?",
      choices: [
        { label: "Yes", nextNodeId: "mrr" },
        { label: "No", nextNodeId: "stay-diy-2" }
      ]
    },
    {
      id: "stay-diy-2",
      content: "You have capacity headroom. Scale your DIY system to 150/day before considering a platform.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "mrr",
      content: "Is your MRR above $50K?",
      choices: [
        { label: "Yes", nextNodeId: "time" },
        { label: "No", nextNodeId: "wait" }
      ]
    },
    {
      id: "wait",
      content: "Wait until you hit $50K MRR. The $750-2,000/mo platform cost is hard to justify below that.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "time",
      content: "Are you spending 5+ hours/week on outreach supervision and wishing you had that time back?",
      choices: [
        { label: "Yes", nextNodeId: "consider" },
        { label: "No", nextNodeId: "stay-diy-3" }
      ]
    },
    {
      id: "stay-diy-3",
      content: "Your time investment is reasonable. Stick with DIY and bank the savings.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "consider",
      content: "You're a good candidate for an AI SDR platform. Start with AiSDR or Salesforge on a monthly contract. Run it parallel to your DIY system for 30 days, then compare results.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

**The upgrade checklist:**

<InteractiveChecklist
  title="AI SDR Platform Readiness Checklist"
  persistKey="autonomous-sdr-L10-platform-ready"
  items={[
    "Consistently booking 12+ meetings/month with DIY system",
    "Sending 150+ emails/day and hitting capacity limits",
    "MRR is $50K+ (platform cost is &lt;2% of revenue)",
    "Spending 5+ hours/week on outreach supervision",
    "Have 90+ days of outreach data to inform platform setup",
    "Willing to invest 20-40 hours in platform onboarding",
    "Comfortable with monthly (not annual) contract to test",
    "Have identified 2-3 platform options to compare"
  ]}
/>

If you check 6/8 boxes, you're ready. If &lt;6, stay with your DIY system and revisit in 90 days.

## Avoiding the 5 Fatal Mistakes

Before you launch, review these failure modes one more time. They account for 80% of Solo AI SDR Lite failures.

<SwipeDecision
  title="Fatal Mistake or Safe Practice?"
  description="Swipe right for safe practices, left for fatal mistakes"
  optionA="Fatal Mistake"
  optionB="Safe Practice"
  persistKey="autonomous-sdr-L10-mistakes"
  cards={[
    {
      id: "1",
      content: "Sending 200 emails/day in week 1 to 'test the system'",
      correctOption: "a",
      explanation: "Fatal. This will burn your domain reputation. Start at 50/day, increase by 10/day each week."
    },
    {
      id: "2",
      content: "Reviewing every first-touch email for the first 30 days",
      correctOption: "b",
      explanation: "Safe. Copilot mode prevents brand damage while you calibrate the system."
    },
    {
      id: "3",
      content: "Letting AI auto-reply to 'interested' prospects to save time",
      correctOption: "a",
      explanation: "Fatal. Misclassification or wrong tone on a warm prospect = lost deal worth $5K-50K."
    },
    {
      id: "4",
      content: "Using ChatGPT to draft replies, then reviewing before sending",
      correctOption: "b",
      explanation: "Safe. AI assists, human approves. This is the copilot pattern."
    },
    {
      id: "5",
      content: "Skipping email verification to save $4/month",
      correctOption: "a",
      explanation: "Fatal. Bounces kill deliverability. $4/mo is the cheapest insurance you'll ever buy."
    },
    {
      id: "6",
      content: "Running your Apollo filter and getting 50,000 results",
      correctOption: "a",
      explanation: "Fatal. Your ICP is too broad. Narrow to 500-2,000 prospects max."
    },
    {
      id: "7",
      content: "Setting up kill switches before launching any automation",
      correctOption: "b",
      explanation: "Safe. You'll need them when (not if) something goes wrong."
    },
    {
      id: "8",
      content: "Signing an annual contract with an AI SDR platform to get a discount",
      correctOption: "a",
      explanation: "Fatal. 40% of AI SDR startups pivot or shut down. Monthly contracts only."
    }
  ]}
/>

## Your Final Implementation Checklist

You're ready to launch. Here's your complete pre-flight checklist:

<InteractiveChecklist
  title="Solo AI SDR Lite Launch Checklist"
  persistKey="autonomous-sdr-L10-final"
  items={[
    "Email infrastructure audit complete (8/10+ on mail-tester)",
    "Domains are 30+ days old OR actively warming",
    "ICP translated to Apollo filters (500-2,000 results)",
    "Research automation tested and working (no hallucinations)",
    "First-line generator tuned (8/10+ Sales Linter score)",
    "4-step sequence built with safety guardrails",
    "Daily send limit set to 50 (will increase gradually)",
    "Reply classification Zap configured and tested",
    "Daily 15-minute supervision block scheduled",
    "Weekly 30-minute calibration session scheduled",
    "Kill switches configured (pause campaign, pause all sends)",
    "CRM integration working (leads sync correctly)",
    "First 50 prospects added and enriched",
    "First 10 emails reviewed and approved for send",
    "90-day benchmark targets documented",
    "Failure mode playbook reviewed and accessible"
  ]}
/>

## What's Next: Your 90-Day Roadmap

**Weeks 1-4: Calibration Phase**
- Send 30-50 emails/day
- Review every first-touch email (copilot mode)
- Track reply rate, positive reply rate, deliverability
- Iterate on first-line prompts and research automation
- Target: 3-6 meetings booked

**Weeks 5-8: Optimization Phase**
- Increase to 50-80 emails/day
- Move bottom 30% of prospects to selective autopilot
- Refine reply classification accuracy
- A/B test 2 sequence variants
- Target: 6-10 meetings booked

**Weeks 9-12: Scaling Phase**
- Increase to 80-120 emails/day
- Expand autopilot to bottom 50% of prospects
- Add a second ICP segment if first is working
- Document what's working in your playbook
- Target: 8-15 meetings booked

**Month 4+: Steady State**
- Maintain 100-150 emails/day
- 70% autopilot, 30% human review
- 2-3 hours/week supervision time
- 10-15 meetings/month consistently
- Evaluate: upgrade to platform OR hire human SDR OR scale DIY further

<InsightCard icon="🎯" title="The Real Win">
The goal isn't to build the fanciest AI SDR system. It's to book 10-15 qualified meetings/month at &lt;$20/meeting cost while spending &lt;3 hours/week on supervision. If your Solo AI SDR Lite hits that, you've won. Everything else is optimization.
</InsightCard>

## Course Wrap-Up: What You've Learned

Over 10 lessons, you've gone from "What is an AI SDR?" to "I have a working AI-assisted outreach system."

Here's what you now know that 95% of solo founders don't:

<FlipCard front="Lesson 1" back="How AI SDR platforms work: the 5-stage pipeline (Ingestion → Research → Sequence → Reply → Book)" />

<FlipCard front="Lesson 2" back="Autopilot vs copilot modes — and why solo founders should ALWAYS start copilot" />

<FlipCard front="Lesson 3" back="Platform comparison: 11x, Artisan, AiSDR, Salesforge — and why most solo founders don't need them yet" />

<FlipCard front="Lesson 4" back="The economics: DIY stack ($150/mo) vs AI SDR platforms ($750-5,000/mo) vs human SDR ($5K+/mo)" />

<FlipCard front="Lesson 5" back="Realistic expectations: 8-15 meetings/month is the target, not 50" />

<FlipCard front="Lesson 6" back="The 6 failure modes: off-brand, hallucinations, spam, misclassification, LinkedIn bans, compliance violations" />

<FlipCard front="Lesson 7" back="Supervision patterns: daily 15-min review, weekly calibration, kill switches, exception escalation" />

<FlipCard front="Lesson 8" back="The Automation Failure Matrix applied to AI SDRs: what to automate, what to gate, what to keep human" />

<FlipCard front="Lesson 9" back="When to use a platform vs DIY: the decision framework based on volume, MRR, and time value" />

<FlipCard front="Lesson 10" back="How to build a Solo AI SDR Lite system in 7 days that delivers 70-80% of platform capability at 10-20% of the cost" />

You're now equipped to make an informed decision: platform, DIY, or hybrid. And you have a working system to launch this week.

## Your Next Steps

1. **Complete the 7-Day Build Sprint** — Block 60-90 minutes each day this week. By Day 7, your system is live.
2. **Run for 90 days** — Don't judge results before Month 3. The first 60 days are calibration.
3. **Track your benchmarks** — Meetings/month, cost/meeting, founder time/week. If you hit 8+ meetings by Month 3, you're winning.
4. **Revisit the upgrade decision** — After 90 days, use the decision tree to evaluate if a platform makes sense.
5. **Join the community** — Share your results, ask questions, learn from other solo founders running similar systems.

<InteractiveChecklist
  title="Your Post-Course Action Items"
  persistKey="autonomous-sdr-L10-actions"
  items={[
    "Schedule 7 days for the build sprint (60-90 min/day)",
    "Complete Day 1: Infrastructure audit",
    "Complete Day 2: ICP-to-Apollo filter translation",
    "Complete Day 3: Research automation setup",
    "Complete Day 4: First-line generation system",
    "Complete Day 5: Sequence assembly with guardrails",
    "Complete Day 6: Reply classification and routing",
    "Complete Day 7: Launch and establish daily supervision ritual",
    "Set 90-day calendar reminder to evaluate results",
    "Bookmark this lesson as your implementation reference"
  ]}
/>

---

**Congratulations.** You've completed Course 26: Autonomous SDR Systems. You now understand how AI SDRs work, what they cost, where they fail, and how to build your own system that delivers results without breaking the bank or your brand.

The future of solo founder outreach isn't full autopilot. It's **intelligent copilot** — AI handling the grunt work, humans making the decisions that matter.

You're ready to build that future. Start your 7-day sprint tomorrow.