---
title: "Segment Tagging Agent"
duration: "45 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 7
---

## The $12K Mistake

Meet Alex, a technical founder who built a beautiful AI-powered enrichment pipeline. Every lead got scored 1-10. Every email was personalized. The infrastructure was perfect.

But his reply rate was stuck at 4%.

The problem? **He was sending the same message to VPs at 50-person startups and 5,000-person enterprises.** Same pitch. Same case study. Same call-to-action.

His scoring agent knew they were different (one scored 8, one scored 6). But his outreach system treated all "qualified" leads identically.

After three months of mediocre results, Alex added one component to his pipeline: **a segment tagging agent**. It took 90 minutes to build.

Within two weeks, his reply rate jumped to 11%. Same leads. Same volume. Different messages for different contexts.

The segment tagging agent asked one question his scoring agent couldn't answer: *"What specific version of our message will resonate with THIS person in THIS situation?"*

<InsightCard icon="🎯" title="The Segmentation Gap">
Scoring tells you WHO to contact. Segmentation tells you HOW to contact them. Most founders build the first and skip the second — then wonder why personalization doesn't work.
</InsightCard>

---

## What Segment Tagging Actually Does

Your scoring agent (Lesson 6) outputs a number: 1-10. That's useful for prioritization.

But when it's time to write an email, you need answers to different questions:

- Is this person a **budget holder** or an **influencer**?
- Are they in **evaluation mode** or **status quo mode**?
- Do they care more about **speed** or **cost savings**?
- Should I lead with a **case study**, a **data point**, or a **mutual connection**?
- What's their **primary pain point** among the 5 we solve?

**Segment tagging** means assigning categorical labels to each prospect based on enriched data and AI analysis. These tags drive message variants, sequence selection, and follow-up strategy.

<FlipCard 
  front="Segment vs. Score" 
  back="Score = priority rank (1-10). Segment = context category (Enterprise Buyer, Early Adopter, Budget-Conscious, etc.). You need both." 
/>

### The Segment Tag Schema

A well-designed segment tagging system assigns 3-5 tags per prospect:

```json
{
  "id": "lead_042",
  "name": "Sarah Chen",
  "icp_fit_score": 8,
  "segment_tags": {
    "company_stage": "growth_stage",
    "buyer_role": "economic_buyer",
    "pain_priority": "attribution_gap",
    "urgency_level": "active_evaluation",
    "message_angle": "roi_case_study"
  }
}
```

Each tag unlocks a different message variant, case study, or sequence path.

<RangeSlider 
  label="How many distinct message variants do you currently use?" 
  min={1} 
  max={10} 
  lowLabel="One message for all" 
  highLabel="10+ variants" 
  persistKey="ai-lead-research-L7-variants" 
/>

---

## The 5 Core Segment Dimensions

Most B2B segment tagging systems use 5 dimensions. You don't need all 5 for every ICP, but these cover 90% of use cases.

<SlideNavigation>
<Slide title="1. Company Stage">

**What it means:** Where the company is in its lifecycle — startup, growth, scale, enterprise.

**Why it matters:** A 15-person startup cares about speed and scrappiness. A 500-person company cares about compliance and integration.

**How to tag it:**
- Employee count (Apollo/LinkedIn)
- Funding stage (Crunchbase)
- Revenue estimate (ZoomInfo/Apollo)

**Example tags:**
- `early_stage` (1-20 employees, pre-seed/seed)
- `growth_stage` (20-200 employees, Series A-B)
- `scale_stage` (200-1000 employees, Series C+)
- `enterprise` (1000+ employees, public or late-stage)

**Message impact:**
- Early stage → "Set up in 15 minutes, no IT required"
- Enterprise → "SOC 2 compliant, integrates with Okta and Salesforce"

</Slide>

<Slide title="2. Buyer Role">

**What it means:** Is this person the decision-maker, influencer, or end-user?

**Why it matters:** Economic buyers care about ROI. Champions care about solving their team's pain. End-users care about ease of use.

**How to tag it:**
- Job title analysis (VP/Director = economic buyer, Manager = influencer)
- Seniority level (C-suite, VP, Director, Manager, IC)
- Department (Sales, Marketing, Ops, Engineering)

**Example tags:**
- `economic_buyer` (VP+, budget authority)
- `champion` (Director/Manager, internal advocate)
- `end_user` (IC, daily tool user)
- `technical_gatekeeper` (Engineering/IT, evaluates security/integration)

**Message impact:**
- Economic buyer → "Customers see 30% reduction in CAC within 90 days"
- Champion → "Your team will save 10 hours/week on manual reporting"
- Technical gatekeeper → "REST API, webhooks, and SSO out of the box"

</Slide>

<Slide title="3. Pain Priority">

**What it means:** Which of your product's value props matters most to this specific prospect?

**Why it matters:** You solve 5 problems. They only care about 1-2 right now. Lead with the right one.

**How to tag it:**
- Job posting analysis (hiring for roles related to specific pain)
- Tech stack signals (missing tools that indicate gaps)
- LinkedIn activity (posts/comments about specific challenges)
- Industry norms (e.g., agencies always care about client reporting)

**Example tags (for a marketing analytics tool):**
- `attribution_gap` (can't tie revenue to channels)
- `reporting_overhead` (manual report creation)
- `data_silos` (disconnected tools)
- `executive_visibility` (CEO wants dashboards)

**Message impact:**
- Attribution gap → "See which channels drive revenue, not just clicks"
- Reporting overhead → "Automate client reports — save 15 hours/week"

</Slide>

<Slide title="4. Urgency Level">

**What it means:** How soon do they need to solve this problem?

**Why it matters:** Active buyers need a demo this week. Passive researchers need nurture content for 3 months.

**How to tag it:**
- Job change signals (new role = new budget = urgency)
- Funding signals (just raised = buying mode)
- Hiring signals (scaling team = need tools now)
- Tech evaluation signals (G2 reviews, competitor comparisons)
- Seasonal triggers (end of quarter, new fiscal year)

**Example tags:**
- `active_evaluation` (comparing vendors now)
- `problem_aware` (knows they have the problem, not shopping yet)
- `status_quo` (no active pain, needs education)

**Message impact:**
- Active evaluation → "Book a demo this week — we can onboard by month-end"
- Problem aware → "Here's how 3 companies like yours solved [pain]"
- Status quo → "Did you know [surprising stat about their industry]?"

</Slide>

<Slide title="5. Message Angle">

**What it means:** What type of opening will resonate best — case study, data point, mutual connection, news hook, etc.?

**Why it matters:** Some prospects respond to social proof. Others want hard numbers. Others need a personal connection first.

**How to tag it:**
- Personality signals (LinkedIn activity style — data-driven vs. storytelling)
- Industry norms (finance = numbers, creative = case studies)
- Seniority (C-suite = peer references, IC = how-to content)

**Example tags:**
- `roi_case_study` (lead with "Company X saved $Y")
- `data_driven` (lead with "73% of companies like yours...")
- `mutual_connection` (lead with "John Smith suggested I reach out")
- `news_hook` (lead with recent funding/hire/launch)
- `problem_agitation` (lead with "Are you still doing [manual process]?")

**Message impact:**
- ROI case study → "Acme Corp reduced churn by 40% in 6 months using..."
- Data driven → "Companies in your segment see 3.2x ROI on average..."
- Mutual connection → "Sarah Chen mentioned you're evaluating solutions for..."

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Segment Dimensions for Your ICP" 
  persistKey="ai-lead-research-L7-dimensions" 
  items={[
    "Identify which of the 5 dimensions matter most for your ICP",
    "Define 2-4 tags per dimension (don't over-segment)",
    "Map each tag to a specific message variant or case study",
    "Test: Can you write a different first line for each tag combination?"
  ]} 
/>

---

## Building the Segment Tagging Agent

Now that you know *what* to tag, let's build the agent that does it automatically.

### The Tagging Agent System Prompt

```
You are a B2B lead segmentation agent for [COMPANY_NAME].

Given enriched prospect data, assign segment tags across 5 dimensions:
1. Company Stage
2. Buyer Role
3. Pain Priority
4. Urgency Level
5. Message Angle

RULES:
- Only assign tags based on data provided — never guess
- If insufficient data for a dimension, tag as "unknown"
- Explain your reasoning for each tag in 1 sentence
- Output valid JSON only

INPUT DATA:
- Name, title, company, company_size, industry
- Tech stack (array)
- Recent funding (bool + amount)
- Job changed in 90 days (bool)
- LinkedIn recent activity (string)
- Hiring for roles (array)

OUTPUT FORMAT:
{
  "company_stage": "growth_stage",
  "company_stage_reason": "50-200 employees, Series A funded",
  "buyer_role": "economic_buyer",
  "buyer_role_reason": "VP of Marketing has budget authority",
  "pain_priority": "attribution_gap",
  "pain_priority_reason": "Uses Google Analytics but not attribution tool",
  "urgency_level": "problem_aware",
  "urgency_level_reason": "No recent funding or hiring signals",
  "message_angle": "roi_case_study",
  "message_angle_reason": "VP-level buyer responds to peer proof",
  "confidence": "high"
}

TAG OPTIONS:
[Company Stage]: early_stage, growth_stage, scale_stage, enterprise, unknown
[Buyer Role]: economic_buyer, champion, end_user, technical_gatekeeper, unknown
[Pain Priority]: [YOUR_PRODUCT_SPECIFIC_PAINS]
[Urgency Level]: active_evaluation, problem_aware, status_quo, unknown
[Message Angle]: roi_case_study, data_driven, mutual_connection, news_hook, problem_agitation, unknown
```

<ExampleCard label="Real Tagging Agent Output">

**Input:**
```json
{
  "name": "Sarah Chen",
  "title": "VP of Marketing",
  "company": "Acme Corp",
  "company_size": "120",
  "industry": "B2B SaaS",
  "tech_stack": ["HubSpot", "Google Analytics", "Salesforce"],
  "recent_funding": true,
  "funding_amount": "$8M Series A",
  "job_changed_90d": false,
  "linkedin_activity": "Posted about struggling with multi-touch attribution",
  "hiring_for": ["Marketing Analyst", "Demand Gen Manager"]
}
```

**Agent Output:**
```json
{
  "company_stage": "growth_stage",
  "company_stage_reason": "120 employees, Series A funded",
  "buyer_role": "economic_buyer",
  "buyer_role_reason": "VP of Marketing has budget authority for marketing tools",
  "pain_priority": "attribution_gap",
  "pain_priority_reason": "LinkedIn post about multi-touch attribution + no attribution tool in stack",
  "urgency_level": "active_evaluation",
  "urgency_level_reason": "Recent funding + hiring for analytics roles = buying mode",
  "message_angle": "roi_case_study",
  "message_angle_reason": "VP-level buyer, B2B SaaS industry responds to peer proof",
  "confidence": "high"
}
```

**Resulting first line:**
"Hi Sarah — saw Acme just closed your Series A (congrats!). Most B2B SaaS VPs we work with struggle with multi-touch attribution after scaling past $5M ARR. One customer in your space (similar size, HubSpot + Salesforce stack) cut their CAC by 28% in 90 days once they could see which channels actually drove revenue. Worth a 15-minute conversation?"

</ExampleCard>

### Where to Build It

<ComparisonBuilder
  title="Clay vs. n8n for Segment Tagging"
  persistKey="ai-lead-research-L7-compare"
  prompt="Which platform will you use for your segment tagging agent?"
  expertExample="For most solo founders, Clay is faster to set up (30 min vs 2 hours). But if you're already using n8n for other workflows, add tagging there to keep everything in one place."
  criteria={[
    "Setup time (Clay = 30 min, n8n = 2 hrs)",
    "Cost (Clay = included in credits, n8n = API costs only)",
    "Flexibility (n8n wins for custom logic)",
    "Ease of maintenance (Clay wins for non-technical)"
  ]}
/>

**Clay Implementation:**
1. Add enriched leads to Clay table
2. Add "AI Column" → paste tagging agent prompt
3. Map input columns (title, company_size, tech_stack, etc.)
4. Run on entire table (costs ~1-2 credits per lead)
5. Parse JSON output into individual tag columns
6. Export tagged leads to CRM or outreach tool

**n8n Implementation:**
1. Trigger: New enriched lead in Google Sheet or webhook
2. HTTP Request Node: Call OpenAI/Claude API with tagging prompt
3. Function Node: Parse JSON response
4. Set Node: Write tags back to sheet or CRM
5. Cost: ~$0.01-0.03 per lead (API only)

<TemplateBuilder
  title="Your Segment Tagging Agent Prompt"
  persistKey="ai-lead-research-L7-prompt"
  sections={[
    {
      id: "company",
      title: "Your Company Context",
      fields: [
        { id: "name", label: "Company Name", placeholder: "Acme Analytics", type: "text" },
        { id: "product", label: "Product Description (1 sentence)", placeholder: "Marketing attribution platform for B2B SaaS", type: "textarea" }
      ]
    },
    {
      id: "pains",
      title: "Pain Priorities (Your Product Solves)",
      fields: [
        { id: "pain1", label: "Pain 1", placeholder: "attribution_gap", type: "text" },
        { id: "pain2", label: "Pain 2", placeholder: "reporting_overhead", type: "text" },
        { id: "pain3", label: "Pain 3", placeholder: "data_silos", type: "text" }
      ]
    },
    {
      id: "dimensions",
      title: "Active Dimensions (Check all that apply)",
      fields: [
        { id: "company_stage", label: "Company Stage", type: "checkbox" },
        { id: "buyer_role", label: "Buyer Role", type: "checkbox" },
        { id: "pain_priority", label: "Pain Priority", type: "checkbox" },
        { id: "urgency_level", label: "Urgency Level", type: "checkbox" },
        { id: "message_angle", label: "Message Angle", type: "checkbox" }
      ]
    }
  ]}
/>

---

## Segment-to-Message Mapping

Tags are useless without corresponding message variants. For every tag combination, you need a specific first line, value prop, and call-to-action.

### The Mapping Matrix

| Company Stage | Buyer Role | Pain Priority | First Line Example |
|--------------|-----------|--------------|-------------------|
| growth_stage | economic_buyer | attribution_gap | "Most B2B SaaS VPs struggle with attribution after $5M ARR..." |
| early_stage | champion | reporting_overhead | "Your team is probably spending 10+ hours/week on manual reports..." |
| enterprise | technical_gatekeeper | data_silos | "Integrates with Salesforce, HubSpot, and Marketo out of the box..." |
| scale_stage | economic_buyer | executive_visibility | "Your CEO can see real-time pipeline health in 2 clicks..." |

**The rule:** Every tag combination that appears in >5% of your leads needs a dedicated message variant.

<ClassifyExercise
  title="Match Tags to Message Variants"
  persistKey="ai-lead-research-L7-classify"
  categories={[
    { id: "roi", label: "ROI-Focused", color: "#10b981" },
    { id: "speed", label: "Speed-Focused", color: "#3b82f6" },
    { id: "ease", label: "Ease-of-Use", color: "#f59e0b" }
  ]}
  items={[
    { id: "1", content: "economic_buyer + growth_stage + attribution_gap", correctCategory: "roi" },
    { id: "2", content: "champion + early_stage + reporting_overhead", correctCategory: "speed" },
    { id: "3", content: "end_user + scale_stage + data_silos", correctCategory: "ease" },
    { id: "4", content: "economic_buyer + enterprise + executive_visibility", correctCategory: "roi" },
    { id: "5", content: "technical_gatekeeper + growth_stage + data_silos", correctCategory: "ease" }
  ]}
/>

### Building the Message Variant Library

Once you have tags, build a library of message variants. Each variant includes:

1. **First line** (personalized hook)
2. **Value prop** (1-2 sentences)
3. **Social proof** (case study or stat)
4. **CTA** (specific ask)

**Example for `growth_stage + economic_buyer + attribution_gap`:**

```
First Line: "Hi [Name] — most B2B SaaS VPs we work with hit a wall around $5M ARR when they can't tie revenue to specific channels."

Value Prop: "[Product] shows you exactly which campaigns, content, and touchpoints drive pipeline — not just clicks or MQLs."

Social Proof: "One customer in your space (120 employees, HubSpot + Salesforce stack) cut CAC by 28% in 90 days once they could see true attribution."

CTA: "Worth a 15-minute conversation to see if we can do the same for Acme?"
```

<RewriteExercise
  title="Write a Segment-Specific First Line"
  persistKey="ai-lead-research-L7-rewrite"
  original="Hi, I wanted to reach out about our marketing analytics platform."
  hint="Use these tags: growth_stage + champion + reporting_overhead"
  expertRewrite="Hi [Name] — noticed you're hiring for a Marketing Analyst role. Most demand gen managers at your stage spend 10+ hours/week building manual reports for leadership. [Product] automates that entirely — one customer saved 15 hours/week and reallocated that time to campaign optimization."
  criteria={[
    "References specific segment tags (stage, role, pain)",
    "Includes concrete benefit (time saved, efficiency gain)",
    "Ends with clear CTA or next step"
  ]}
/>

---

## Calibration: Testing Your Tags

Like the scoring agent (Lesson 6), your tagging agent needs calibration. Run it on 20-30 known prospects and check:

1. **Are tags accurate?** Does `economic_buyer` actually map to VPs with budget authority?
2. **Are tags actionable?** Can you write a different message for each tag?
3. **Are tags distributed?** If 90% of leads get the same tag, you're not segmenting — you're labeling.

<TimedChallenge
  title="Spot the Bad Segment Tag"
  persistKey="ai-lead-research-L7-timed"
  timeLimit={90}
  items={[
    { 
      id: "1", 
      prompt: "Tag: 'interested_buyer' — Reason: 'Visited pricing page'", 
      correctAnswer: "bad", 
      explanation: "Too vague. 'Active evaluation' or 'problem aware' is more actionable." 
    },
    { 
      id: "2", 
      prompt: "Tag: 'growth_stage' — Reason: '50-200 employees, Series A'", 
      correctAnswer: "good", 
      explanation: "Specific, data-backed, and actionable." 
    },
    { 
      id: "3", 
      prompt: "Tag: 'high_value' — Reason: 'Looks like a good fit'", 
      correctAnswer: "bad", 
      explanation: "Subjective and not tied to data. Use 'economic_buyer' or 'enterprise' instead." 
    },
    { 
      id: "4", 
      prompt: "Tag: 'attribution_gap' — Reason: 'No attribution tool in tech stack + LinkedIn post about multi-touch'", 
      correctAnswer: "good", 
      explanation: "Specific pain, backed by signals." 
    }
  ]}
/>

### The Calibration Checklist

<InteractiveChecklist 
  title="Segment Tagging Calibration" 
  persistKey="ai-lead-research-L7-calibration" 
  items={[
    "Run tagging agent on 30 enriched leads",
    "Manually review 10 outputs — are tags accurate?",
    "Check tag distribution — is any tag >70% of leads?",
    "Write 1 message variant per common tag combination",
    "Test: Send 10 emails with segment-specific variants",
    "Compare reply rates to generic baseline",
    "Adjust prompt if accuracy &lt;80% or reply rate doesn't improve"
  ]} 
/>

---

## Segment Tags in Action: The Full Pipeline

Here's how segment tagging fits into your complete enrichment pipeline (from Lesson 4):

```
DISCOVER
├── Apollo Search → raw_leads.json (500 leads)
│
ENRICH (Waterfall)
├── Clay/Apollo/Hunter → enriched_leads.json (400 leads, 80% coverage)
│   ├── email (verified)
│   ├── company_size, industry, tech_stack
│   ├── recent_funding, job_changed_90d
│
SCORE (ICP Fit Agent — Lesson 6)
├── AI Scoring → scored_leads.json
│   ├── fit_score (0-4)
│   ├── signal_score (0-4)
│   ├── total_score (1-10)
│   ├── priority_tier (A/B/C)
│   Result: 120 Tier A, 160 Tier B, 120 Tier C
│
TAG (Segment Tagging Agent — THIS LESSON)
├── AI Tagging → tagged_leads.json (280 Tier A+B only)
│   ├── company_stage
│   ├── buyer_role
│   ├── pain_priority
│   ├── urgency_level
│   ├── message_angle
│   Result: 8-12 distinct segment combinations
│
PERSONALIZE (Course 24)
├── Message Variant Selector → personalized_leads.json
│   ├── first_line (segment-specific)
│   ├── value_prop_variant
│   ├── case_study_match
│   ├── cta
│
SEND
├── Instantly/Smartlead → sequences by segment
│   ├── Segment A: "ROI Case Study" sequence
│   ├── Segment B: "Speed to Value" sequence
│   ├── Segment C: "Ease of Use" sequence
```

**The result:** Instead of one generic message to 280 leads, you send 8-12 segment-specific messages — each resonating with a specific context.

<ScenarioSimulator
  title="Segment Tagging ROI Calculator"
  persistKey="ai-lead-research-L7-simulator"
  levers={[
    { id: "leads", label: "Qualified leads per month", min: 50, max: 500, step: 50, defaultValue: 200 },
    { id: "genericReply", label: "Generic message reply rate (%)", min: 2, max: 10, step: 1, defaultValue: 5 },
    { id: "segmentedReply", label: "Segmented message reply rate (%)", min: 5, max: 20, step: 1, defaultValue: 12 }
  ]}
  outputs={[
    { id: "genericReplies", label: "Replies with generic messaging", formula: "(leads * (genericReply / 100))", unit: "", precision: 0 },
    { id: "segmentedReplies", label: "Replies with segmented messaging", formula: "(leads * (segmentedReply / 100))", unit: "", precision: 0 },
    { id: "lift", label: "Reply lift from segmentation", formula: "(segmentedReplies - genericReplies)", unit: "", precision: 0 }
  ]}
  insight="At {segmentedReply}% reply rate vs {genericReply}%, you get `{lift}` more replies per month — that's {lift * 0.25} extra meetings if 25% of replies convert."
/>

---

## Common Segment Tagging Mistakes

<ProgressiveReveal title="5 Mistakes to Avoid" persistKey="ai-lead-research-L7-mistakes">

<RevealSection title="Mistake 1: Over-Segmentation">

**The problem:** Creating 50 segment tags with 200 possible combinations.

**Why it fails:** You can't write 200 message variants. You can't test 200 variants. You can't maintain 200 variants.

**The fix:** Start with 2-3 dimensions and 2-4 tags per dimension. That's 8-16 combinations max. Expand only when you have data proving a new segment needs a different message.

</RevealSection>

<RevealSection title="Mistake 2: Tagging Without Message Variants">

**The problem:** Building a perfect tagging agent, then sending the same message to everyone anyway.

**Why it fails:** Tags are useless if they don't change behavior. If you can't write a different first line for a tag, don't create the tag.

**The fix:** For every tag you create, write the corresponding message variant FIRST. If you can't, the tag isn't actionable.

</RevealSection>

<RevealSection title="Mistake 3: Subjective Tags">

**The problem:** Tags like "high_value," "interested," "good_fit" that rely on gut feel, not data.

**Why it fails:** AI can't reliably assign subjective tags. Humans disagree on subjective tags. Subjective tags don't scale.

**The fix:** Every tag must be tied to observable data: job title, company size, tech stack, funding, LinkedIn activity, etc.

</RevealSection>

<RevealSection title="Mistake 4: Ignoring Tag Distribution">

**The problem:** 80% of leads get tagged `growth_stage + economic_buyer + attribution_gap`.

**Why it fails:** If most leads get the same tag, you're not segmenting — you're just labeling your ICP.

**The fix:** Check tag distribution after calibration. If any single tag combination is >50% of leads, your segments are too broad. Refine.

</RevealSection>

<RevealSection title="Mistake 5: Not Testing Reply Rates by Segment">

**The problem:** Assuming segmented messages work better without measuring.

**Why it fails:** Some segments might not respond differently. Some message variants might underperform generic.

**The fix:** Track reply rates by segment tag. After 50 sends per segment, compare. Double down on high-performing segments, revise or merge low-performing ones.

</RevealSection>

</ProgressiveReveal>

---

## Implementation Sprint: Build Your Tagging Agent

You've learned the theory. Now build it.

<InteractiveChecklist 
  title="7-Day Segment Tagging Sprint" 
  persistKey="ai-lead-research-L7-sprint" 
  items={[
    "Day 1: Choose 2-3 segment dimensions that matter for your ICP",
    "Day 2: Define 2-4 tags per dimension (8-16 total combinations)",
    "Day 3: Write the tagging agent system prompt with your tags",
    "Day 4: Set up tagging in Clay or n8n and run on 30 test leads",
    "Day 5: Review outputs — adjust prompt if accuracy &lt;80%",
    "Day 6: Write 1 message variant per common tag combination",
    "Day 7: Send 50 segmented emails and track reply rates by tag"
  ]} 
/>

### Your Tagging Agent Checklist

Before you ship your tagging agent to production, verify:

- [ ] System prompt includes all 5 dimensions (or justifies why you're skipping some)
- [ ] Tag options are data-backed, not subjective
- [ ] Output format is valid JSON with reasoning per tag
- [ ] Agent tested on 30 leads with >80% accuracy
- [ ] Every common tag combination has a corresponding message variant
- [ ] Tag distribution is balanced (no single tag >50% of leads)
- [ ] Reply rate tracking is set up by segment tag

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can build more sophisticated tagging logic with custom code. But start simple. Most founders over-engineer segmentation before they have enough data to know which segments matter. Ship the basic agent first, then add complexity based on reply rate data.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Your segments might look different: "corporate_client vs solopreneur," "certification_seeker vs transformation_buyer," "DIY vs done-for-you." The same principles apply — just adapt the dimensions to your service offering.
</ContextualNote>

---

## Summary: From Scores to Segments

You now have two AI agents working together:

1. **Scoring Agent (Lesson 6):** Ranks leads 1-10 based on ICP fit and buying signals
2. **Segment Tagging Agent (This Lesson):** Categorizes leads into message-relevant segments

**Scoring** tells you WHO to contact and WHEN.  
**Segmentation** tells you HOW to contact them.

The combination is powerful:
- High score (8-10) + high-urgency segment → Immediate personal outreach
- High score (8-10) + low-urgency segment → Nurture sequence with segment-specific content
- Medium score (5-7) + high-urgency segment → Automated sequence with segment-specific first line
- Medium score (5-7) + low-urgency segment → Newsletter + retargeting

**Next lesson:** You'll build the personalization agent that takes segment tags and generates custom first lines, value props, and icebreakers at scale.

But first, ship your tagging agent. 30 leads. 3 segments. 3 message variants. Measure reply rates.

The data will tell you if segmentation works for your ICP. And if it does, you'll never send a generic message again.

---

## Quiz: Segment Tagging Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What's the primary difference between a scoring agent and a segment tagging agent?",
      "options": [
        "Scoring is for prioritization, tagging is for message customization",
        "Scoring is automated, tagging is manual",
        "Scoring uses AI, tagging uses rules",
        "Scoring is for B2B, tagging is for B2C"
      ],
      "correctAnswer": 0,
      "explanation": "Scoring ranks leads by priority (1-10). Tagging categorizes them by context to drive different messages."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Which segment dimension is MOST important for determining message tone and complexity?",
      "options": [
        "Company Stage",
        "Buyer Role",
        "Pain Priority",
        "Urgency Level"
      ],
      "correctAnswer": 1,
      "explanation": "Buyer Role determines WHO you're talking to — economic buyers need ROI, champions need team benefits, end-users need ease of use."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "You have 200 qualified leads. Your tagging agent assigns 180 of them to 'growth_stage + economic_buyer'. What's the problem?",
      "options": [
        "Your ICP is too narrow",
        "Your segments are too broad — you're not really segmenting",
        "Your tagging agent is broken",
        "This is normal and fine"
      ],
      "correctAnswer": 1,
      "explanation": "If 90% of leads get the same tag, you're labeling your ICP, not segmenting. Refine your dimensions to create more actionable distinctions."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "Which of these is a BAD segment tag?",
      "options": [
        "'attribution_gap' — based on missing tech stack tool + LinkedIn post",
        "'high_value' — based on 'looks like a good fit'",
        "'active_evaluation' — based on recent funding + hiring signals",
        "'economic_buyer' — based on VP title + budget authority"
      ],
      "correctAnswer": 1,
      "explanation": "'High_value' is subjective and not tied to observable data. Good tags are data-backed and actionable."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "How many message variants should you write for 3 dimensions with 3 tags each (27 possible combinations)?",
      "options": [
        "27 — one for every combination",
        "9 — one for each tag",
        "3-5 — only for the most common combinations",
        "1 — segmentation doesn't require different messages"
      ],
      "correctAnswer": 2,
      "explanation": "Start with 3-5 variants for the most common tag combinations (those appearing in >10% of leads). Don't over-engineer before you have data."
    }
  ]
}