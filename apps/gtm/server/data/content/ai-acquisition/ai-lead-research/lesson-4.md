---
title: "The 5-Step Pipeline: Discover → Enrich → Score → Personalize → Send"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 4
---

## The $40K Mistake That Taught Me Pipeline Architecture

Meet Alex, a technical founder who spent 6 months building an AI-powered lead enrichment system. Beautiful code. Elegant architecture. One problem: **it enriched the wrong people**.

Alex's system would:
1. Scrape LinkedIn for "startup founders"
2. Enrich every single one with 50+ data points
3. Score them all as "high-intent"
4. Send personalized outreach to 500 people per week

The result? 0.3% reply rate. $4,000 in enrichment costs. And a permanently damaged domain reputation.

**What went wrong?** Alex built stages 2, 3, 4, and 5 of the pipeline... but skipped stage 1 entirely. No discovery criteria. No ICP filter. Just "more data = better results."

The fix took 2 weeks: Add a proper discovery stage with tight ICP filters. Suddenly, the same enrichment system produced 8% reply rates and 12 qualified meetings in the first month.

**The lesson:** Pipeline architecture isn't about having all five stages. It's about having them **in the right order, with the right data flowing between them**.

Today, you're building that architecture.

---

## The Five Stages (And Why Order Matters)

<FlipCard 
  front="Why can't I just enrich everyone and filter later?" 
  back="Because enrichment costs money and time. Enriching 10,000 bad-fit prospects costs the same as enriching 500 perfect-fit ones — but only the second group converts." 
/>

Think of your pipeline like a manufacturing assembly line. Each stage adds value, but **only if the input is worth processing**.

Here's what happens at each stage:

### Stage 1: Discover
**Input:** Your ICP criteria (from Course 21)  
**Output:** Raw prospect list (names, companies, titles)  
**Tools:** Apollo search, Sales Navigator, community mining, event attendees  
**Quality gate:** Does this person match our ICP? If no, stop here.

### Stage 2: Enrich
**Input:** Raw prospect list  
**Output:** Enriched profiles (email, phone, company data, tech stack, signals)  
**Tools:** Waterfall enrichment (Apollo → Hunter → Snov → Clay)  
**Quality gate:** Did we find a verified email? If no, mark for manual research or discard.

### Stage 3: Score
**Input:** Enriched profiles  
**Output:** 1-10 fit score + priority tier (A/B/C)  
**Tools:** AI scoring agent (Lesson 6)  
**Quality gate:** Score ≥5? If no, move to nurture or disqualify.

### Stage 4: Personalize
**Input:** Scored leads (Tier A + B only)  
**Output:** Personalized first lines, value props, conversation hooks  
**Tools:** AI research agent (Lesson 5) + personalization prompts  
**Quality gate:** Do we have 2+ personalization hooks? If no, use template variant.

### Stage 5: Send
**Input:** Personalized leads  
**Output:** Sequenced outreach across email, LinkedIn, calls  
**Tools:** Instantly, Smartlead, or manual sequences  
**Quality gate:** Deliverability check passed? If no, fix infrastructure first.

<InsightCard icon="⚡" title="The Pipeline Multiplier Effect">
Each stage improves conversion by 20-50%. But they compound. A 30% improvement at each stage = 3.7x total improvement by stage 5.
</InsightCard>

---

## The Data Flow: JSON as Your Common Language

Here's the reality of 2026 acquisition tech: **every tool speaks a different language**. Apollo exports CSV. Clay outputs JSON. Your CRM wants XML. Your outreach tool needs a specific CSV format.

The solution? **Design your own data schema and translate at the edges**.

<TemplateBuilder
  title="Your Lead Data Schema"
  persistKey="ai-lead-research-L4-schema"
  sections={[
    {
      id: "core",
      title: "Core Identity Fields",
      fields: [
        { id: "firstName", label: "First Name", placeholder: "Sarah", type: "text" },
        { id: "lastName", label: "Last Name", placeholder: "Chen", type: "text" },
        { id: "email", label: "Email", placeholder: "sarah@acme.com", type: "text" },
        { id: "company", label: "Company Name", placeholder: "Acme Corp", type: "text" }
      ]
    },
    {
      id: "enrichment",
      title: "Enrichment Fields (from Stage 2)",
      fields: [
        { id: "title", label: "Job Title", placeholder: "VP of Marketing", type: "text" },
        { id: "companySize", label: "Company Size", placeholder: "50-200", type: "text" },
        { id: "industry", label: "Industry", placeholder: "B2B SaaS", type: "text" },
        { id: "techStack", label: "Tech Stack (comma-separated)", placeholder: "HubSpot, Salesforce, Slack", type: "text" }
      ]
    },
    {
      id: "scoring",
      title: "Scoring Fields (from Stage 3)",
      fields: [
        { id: "fitScore", label: "ICP Fit Score (1-10)", placeholder: "8", type: "number" },
        { id: "priorityTier", label: "Priority Tier", placeholder: "A", type: "text" }
      ]
    },
    {
      id: "personalization",
      title: "Personalization Fields (from Stage 4)",
      fields: [
        { id: "firstLine", label: "Personalized First Line", placeholder: "Saw Acme just closed your Series A...", type: "textarea" },
        { id: "conversationHook", label: "Primary Conversation Hook", placeholder: "Recent funding announcement", type: "text" }
      ]
    }
  ]}
/>

**Why this matters:** When you control the schema, you can swap tools without rebuilding your entire pipeline. Apollo gets too expensive? Switch to Hunter. Clay changes pricing? Build your own n8n workflow. The data structure stays the same.

<ExampleCard label="Real Schema: B2B SaaS Founder">
```json
{
  "id": "lead_001",
  "first_name": "Sarah",
  "last_name": "Chen",
  "email": "sarah@acme.com",
  "email_verified": true,
  "phone": "+1-555-0123",
  "title": "VP of Marketing",
  "company": "Acme Corp",
  "company_domain": "acme.com",
  "company_size": "50-200",
  "industry": "B2B SaaS",
  "tech_stack": ["HubSpot", "Salesforce", "Slack"],
  "location": "San Francisco, CA",
  "linkedin_url": "linkedin.com/in/sarahchen",
  "recent_funding": true,
  "funding_amount": "$5M Series A",
  "job_changed_90d": false,
  "icp_fit_score": 8,
  "signal_score": 3,
  "friction_score": -1,
  "total_score": 10,
  "priority_tier": "A",
  "first_line": "Saw Acme just closed your Series A — congrats on the $5M...",
  "conversation_hook": "Series A funding + HubSpot migration",
  "enrichment_source": "clay_waterfall",
  "enriched_at": "2026-02-24T10:30:00Z",
  "personalized_at": "2026-02-24T10:35:00Z"
}
```
</ExampleCard>

---

## Stage 1: Discovery (Finding the Right 500)

Most founders get this backwards. They think: "I'll enrich a huge list, then filter for quality."

**Wrong.** Enrichment costs money. Filtering costs nothing.

<RangeSlider 
  label="How many prospects do you want to enrich per month?" 
  min={100} 
  max={5000} 
  step={100}
  lowLabel="100" 
  highLabel="5,000" 
  persistKey="ai-lead-research-L4-volume" 
/>

Here's the math:
- **100-500/month:** Perfect for solo founders. Allows deep personalization. Cost: $50-150/month.
- **500-1,500/month:** Good for small teams or high-volume plays. Cost: $150-400/month.
- **1,500-5,000/month:** Requires automation + budget. Cost: $400-1,200/month.

**Discovery sources ranked by quality:**

<ClassifyExercise
  title="Classify These Discovery Sources"
  persistKey="ai-lead-research-L4-sources"
  categories={[
    { id: "high", label: "High Quality (tight ICP match)", color: "#10b981" },
    { id: "medium", label: "Medium Quality (needs filtering)", color: "#f59e0b" },
    { id: "low", label: "Low Quality (too broad)", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Sales Navigator search with 5+ filters (title, company size, industry, location, tech stack)", correctCategory: "high" },
    { id: "2", content: "Apollo search with 3 filters (title, industry, company size)", correctCategory: "medium" },
    { id: "3", content: "LinkedIn post engagement (people who liked your content)", correctCategory: "medium" },
    { id: "4", content: "Purchased email list from a broker", correctCategory: "low" },
    { id: "5", content: "Event attendee list from a niche conference", correctCategory: "high" },
    { id: "6", content: "Scraped 'startup founders' from Crunchbase", correctCategory: "low" },
    { id: "7", content: "Community members who answered a specific question", correctCategory: "high" },
    { id: "8", content: "Google search for 'VP Marketing SaaS company'", correctCategory: "low" }
  ]}
/>

**The discovery quality hierarchy:**
1. **Tier 1 (Best):** Warm intros, event attendees, community members who engaged with your content
2. **Tier 2 (Good):** Sales Nav with 5+ filters, Apollo with ICP scoring, G2 reviewer lists
3. **Tier 3 (Acceptable):** Broad Apollo/LinkedIn searches with manual filtering
4. **Tier 4 (Avoid):** Purchased lists, scraped data, "spray and pray" databases

<InsightCard icon="🎯" title="The 80/20 Discovery Rule">
Spend 80% of your time on Tier 1-2 sources. They'll produce 80% of your meetings. Tier 3 is filler. Never use Tier 4.
</InsightCard>

---

## Stage 2: Enrichment (The Waterfall You Built in Lesson 3)

You already learned waterfall enrichment. Now you're plugging it into the pipeline.

**Key decision point:** Do you enrich everyone from discovery, or filter first?

<SwipeDecision
  title="Enrich Now or Filter First?"
  description="Swipe right to enrich immediately, left to filter first"
  optionA="Filter First"
  optionB="Enrich Now"
  persistKey="ai-lead-research-L4-enrich-timing"
  cards={[
    { 
      id: "1", 
      content: "You have 5,000 raw leads from a broad Apollo search. Budget: $200/month.", 
      correctOption: "a", 
      explanation: "Filter to 500 high-fit leads first. Enriching 5,000 would cost $350-700." 
    },
    { 
      id: "2", 
      content: "You have 200 leads from a niche conference. All match your ICP.", 
      correctOption: "b", 
      explanation: "Enrich immediately. They're pre-qualified. Enrichment cost: ~$70-140." 
    },
    { 
      id: "3", 
      content: "You scraped 10,000 'founders' from LinkedIn. No other filters.", 
      correctOption: "a", 
      explanation: "Filter to &lt;1,000 using title, company size, industry. Then enrich." 
    },
    { 
      id: "4", 
      content: "You have 50 warm intros from your network.", 
      correctOption: "b", 
      explanation: "Enrich all 50. Warm intros are gold. Cost: ~$17-35." 
    }
  ]}
/>

**Enrichment stage output checklist:**
- ✅ Verified email (90%+ deliverability)
- ✅ Job title and company
- ✅ Company size and industry
- ✅ At least 1 signal field (tech stack, funding, job change, hiring)
- ✅ LinkedIn URL (for manual research if needed)

**What to do with failed enrichments:**
- No email found → Move to "manual research" queue or discard
- Email found but unverified → Run through MillionVerifier before sending
- Missing company data → Flag for manual lookup (takes 2 minutes)

---

## Stage 3: Scoring (Separating the 8s from the 3s)

This is where most founders waste the most time. They treat every lead equally.

**The reality:** A score-8 lead is worth 10x more attention than a score-3 lead. But you won't know which is which without scoring.

<ScenarioSimulator
  title="Pipeline Math: How Scoring Changes Everything"
  persistKey="ai-lead-research-L4-scoring-math"
  levers={[
    { id: "totalLeads", label: "Total enriched leads", min: 100, max: 1000, step: 50, defaultValue: 500 },
    { id: "tierAPercent", label: "% scoring 8-10 (Tier A)", min: 5, max: 30, step: 5, defaultValue: 15 },
    { id: "tierBPercent", label: "% scoring 5-7 (Tier B)", min: 30, max: 60, step: 5, defaultValue: 45 }
  ]}
  outputs={[
    { id: "tierA", label: "Tier A leads (manual outreach)", formula: "totalLeads * (tierAPercent / 100)", unit: "", precision: 0 },
    { id: "tierB", label: "Tier B leads (automated sequence)", formula: "totalLeads * (tierBPercent / 100)", unit: "", precision: 0 },
    { id: "tierC", label: "Tier C leads (nurture or discard)", formula: "totalLeads - (totalLeads * (tierAPercent / 100)) - (totalLeads * (tierBPercent / 100))", unit: "", precision: 0 }
  ]}
  insight="With {tierA} Tier A leads getting 30% reply rates and {tierB} Tier B leads getting 8% reply rates, you're looking at ~{tierA * 0.3 + tierB * 0.08} total replies per month."
/>

**Scoring criteria (from Lesson 6 preview):**

**FIT (0-4 points):**
- +1 if industry matches your ICP
- +1 if title matches (decision-maker or influencer)
- +1 if company size matches
- +1 if tech stack includes relevant tools

**SIGNAL (0-4 points):**
- +1 if changed jobs in past 90 days
- +1 if company raised funding in past 6 months
- +1 if company is hiring for relevant roles
- +1 if recently engaged with competitor or relevant content

**FRICTION (0 to -2 points):**
- -1 if enterprise sales cycle (6+ months)
- -1 if committee buying (3+ stakeholders)

**Total score = FIT + SIGNAL - FRICTION (clamped to 1-10)**

<ProgressiveReveal title="The Scoring Agent Prompt (Preview)" persistKey="ai-lead-research-L4-scoring-reveal">
<RevealSection title="System Prompt Template">
```
You are a lead scoring agent for [YOUR COMPANY]. Score each prospect 1-10 based on three dimensions:

FIT (0-4 points):
+1 if industry matches: [YOUR INDUSTRIES]
+1 if title matches: [YOUR TITLES]
+1 if company size matches: [YOUR SIZE RANGE]
+1 if tech stack includes: [YOUR TECH SIGNALS]

SIGNAL (0-4 points):
+1 if changed jobs in past 90 days
+1 if company raised funding in past 6 months
+1 if company is hiring for [RELEVANT ROLES]
+1 if recently engaged with [RELEVANT CONTENT/COMPETITORS]

FRICTION (0 to -2 points):
-1 if enterprise sales cycle (>6 months typical)
-1 if committee buying (>3 stakeholders)

TOTAL = FIT + SIGNAL - FRICTION (clamp to 1-10)

OUTPUT FORMAT:
{
  "fit_score": 3,
  "signal_score": 2,
  "friction_score": -1,
  "total_score": 4,
  "priority_tier": "B",
  "reasoning": "Strong fit on industry and title, recent funding signal, but committee buying adds friction."
}

TIER THRESHOLDS:
8-10 = Tier A (immediate personal outreach)
5-7 = Tier B (automated sequence)
1-4 = Tier C (nurture or disqualify)
```
</RevealSection>

<RevealSection title="How to Use This in Clay">
1. Add an "AI" column type
2. Paste the system prompt above (customized for your ICP)
3. Reference enrichment columns as input: `{{title}}`, `{{company_size}}`, `{{tech_stack}}`
4. Set output to parse JSON
5. Run on entire table — scores 500 leads in ~2 minutes
</RevealSection>

<RevealSection title="How to Use This in n8n">
1. Add an "OpenAI" or "Anthropic" node
2. Set system message to the prompt above
3. Set user message to: "Score this lead: [JSON of enriched data]"
4. Parse JSON response
5. Write scores back to your spreadsheet or CRM
</RevealSection>
</ProgressiveReveal>

---

## Stage 4: Personalization (Turning Data into Conversation)

You have a scored lead. Now what?

**The personalization hierarchy:**

<ComparisonBuilder
  title="Write a Personalized First Line"
  persistKey="ai-lead-research-L4-personalization"
  prompt="Write a personalized first line for this prospect: Sarah Chen, VP of Marketing at Acme Corp (B2B SaaS, 50-200 employees, just raised $5M Series A, uses HubSpot)"
  expertExample="Saw Acme just closed your Series A — congrats on the $5M. Most VPs I talk to in your position are rethinking their MarTech stack post-funding. Curious if you're evaluating new tools for the next stage?"
  criteria={[
    "References a specific, recent event (funding)",
    "Connects event to likely pain point (MarTech evaluation)",
    "Ends with a low-friction question",
    "Avoids generic phrases like 'I wanted to reach out'"
  ]}
/>

**Personalization sources (ranked by impact):**

1. **Tier 1 (Highest Impact):** Recent funding, job change, company launch, award/recognition
2. **Tier 2 (High Impact):** LinkedIn post/comment, recent hire, new product launch
3. **Tier 3 (Medium Impact):** Tech stack match, mutual connection, shared interest
4. **Tier 4 (Low Impact):** Company description, industry trend, generic compliment

**The AI research agent workflow (from Lesson 5):**

```
Input: Enriched lead JSON
↓
AI Research Agent:
- Scrape company website
- Check recent LinkedIn posts
- Search news for company name
- Identify 3+ conversation hooks
↓
Output: Research brief with personalization angles
↓
AI Personalization Agent:
- Generate 3 first-line variants
- Score each for specificity and relevance
- Select best variant
↓
Output: Personalized first line + conversation hook
```

<MiniRoleplay
  scenario="You're personalizing outreach to a VP of Sales who just posted on LinkedIn about struggling with pipeline visibility."
  role="Write your first line"
  persistKey="ai-lead-research-L4-roleplay"
  modelResponse="Saw your post about pipeline visibility challenges — that's the #1 complaint I hear from VPs at your stage. Most solve it by [specific approach]. Would a 10-minute call to compare notes be useful?"
/>

---

## Stage 5: Send (Sequencing and Multi-Channel)

You've discovered, enriched, scored, and personalized. Now you send.

**But not all at once.**

<SlideNavigation>
<Slide title="Tier A: Manual, High-Touch">
**Volume:** 50-100/month  
**Approach:** Founder sends personally  
**Channels:** Email + LinkedIn DM + (optional) call  
**Sequence:**
- Day 1: Email with deep personalization
- Day 3: LinkedIn connection request (if not connected)
- Day 5: LinkedIn DM referencing email
- Day 8: Follow-up email with new value
- Day 12: Call attempt (if phone number available)

**Expected reply rate:** 20-40%
</Slide>

<Slide title="Tier B: Automated, Personalized">
**Volume:** 200-400/month  
**Approach:** Automated sequence with AI personalization  
**Channels:** Email primary, LinkedIn secondary  
**Sequence:**
- Day 1: Email with AI-generated first line
- Day 4: Follow-up email (different angle)
- Day 7: LinkedIn connection (if not connected)
- Day 10: Final email (breakup or value-add)

**Expected reply rate:** 8-15%
</Slide>

<Slide title="Tier C: Nurture or Disqualify">
**Volume:** 100-200/month  
**Approach:** Add to newsletter or discard  
**Channels:** Email newsletter only  
**Sequence:**
- Add to weekly newsletter
- Re-score quarterly (signals may change)
- If score improves to 5+, move to Tier B

**Expected reply rate:** 1-3%
</Slide>
</SlideNavigation>

**Multi-channel sequencing rules:**
- ✅ Email first, always (least intrusive)
- ✅ LinkedIn connection within 3-7 days (if relevant)
- ✅ LinkedIn DM only after connection accepted
- ❌ Never call without email first (unless warm intro)
- ❌ Never send more than 1 message per channel per week

<InsightCard icon="📊" title="The Compound Effect of Proper Sequencing">
Single email to 500 people = 15-25 replies (3-5% rate).  
5-step sequence to 500 people = 75-125 replies (15-25% rate).  
Same effort. 5x results.
</InsightCard>

---

## Putting It All Together: Your Pipeline Blueprint

Time to design your complete pipeline.

<TemplateBuilder
  title="Your 5-Step Pipeline Blueprint"
  persistKey="ai-lead-research-L4-blueprint"
  sections={[
    {
      id: "discovery",
      title: "Stage 1: Discovery",
      fields: [
        { id: "source", label: "Primary discovery source", placeholder: "Sales Navigator search", type: "text" },
        { id: "filters", label: "ICP filters applied", placeholder: "Title: VP/Director, Company size: 50-500, Industry: B2B SaaS", type: "textarea" },
        { id: "volume", label: "Target volume per month", placeholder: "500", type: "number" }
      ]
    },
    {
      id: "enrichment",
      title: "Stage 2: Enrichment",
      fields: [
        { id: "tool", label: "Primary enrichment tool", placeholder: "Clay waterfall", type: "text" },
        { id: "sources", label: "Waterfall sources (in order)", placeholder: "Apollo → Hunter → Snov.io", type: "text" },
        { id: "budget", label: "Monthly enrichment budget", placeholder: "$150", type: "text" }
      ]
    },
    {
      id: "scoring",
      title: "Stage 3: Scoring",
      fields: [
        { id: "fitCriteria", label: "Fit criteria (3-5 items)", placeholder: "Industry match, title match, company size, tech stack", type: "textarea" },
        { id: "signals", label: "Key signals to detect", placeholder: "Job change, funding, hiring, tech adoption", type: "textarea" },
        { id: "tierAThreshold", label: "Tier A threshold (score)", placeholder: "8", type: "number" }
      ]
    },
    {
      id: "personalization",
      title: "Stage 4: Personalization",
      fields: [
        { id: "researchDepth", label: "Research depth for Tier A", placeholder: "Full AI research + manual review", type: "text" },
        { id: "researchDepthB", label: "Research depth for Tier B", placeholder: "AI research only", type: "text" },
        { id: "hookSources", label: "Top 3 personalization sources", placeholder: "Recent funding, LinkedIn posts, tech stack", type: "textarea" }
      ]
    },
    {
      id: "send",
      title: "Stage 5: Send",
      fields: [
        { id: "tierASequence", label: "Tier A sequence (manual or automated?)", placeholder: "Manual, 5-touch sequence", type: "text" },
        { id: "tierBSequence", label: "Tier B sequence", placeholder: "Automated, 4-touch sequence", type: "text" },
        { id: "channels", label: "Channels used", placeholder: "Email + LinkedIn", type: "text" }
      ]
    }
  ]}
/>

**Pipeline health metrics to track:**

| Metric | Target | What It Tells You |
|--------|--------|-------------------|
| Discovery → Enrichment conversion | 80%+ | Are your discovery filters tight enough? |
| Enrichment → Verified email | 70%+ | Is your waterfall working? |
| Tier A % of total | 10-20% | Are you finding enough high-fit leads? |
| Tier A reply rate | 20-40% | Is your personalization working? |
| Tier B reply rate | 8-15% | Is your ICP scoring accurate? |
| Cost per qualified meeting | &lt;$50 | Is your pipeline efficient? |

---

## The Build vs. Buy Decision (Clay vs. n8n vs. Manual)

You have three options for building this pipeline:

<StrategyDuel
  title="Clay vs. n8n vs. Manual Spreadsheets"
  persistKey="ai-lead-research-L4-build-buy"
  scenario="You want to process 500 leads per month through the full 5-step pipeline."
  strategyA={{ 
    name: "Clay (Buy)", 
    description: "Use Clay's built-in waterfall, AI columns, and integrations", 
    pros: ["Fastest setup (2-3 hours)", "75+ data sources built-in", "AI research + scoring in one platform", "Great for non-technical founders"], 
    cons: ["$149-349/month", "Credit-based pricing can be unpredictable", "Less customization than code"] 
  }}
  strategyB={{ 
    name: "n8n (Build)", 
    description: "Build custom workflows with n8n + APIs", 
    pros: ["$0-20/month (self-hosted or cloud starter)", "Full control over logic", "Can integrate any API", "One-time setup, no per-lead costs"], 
    cons: ["Requires technical skills", "10-20 hours initial setup", "Must maintain workflows yourself"] 
  }}
  strategyC={{
    name: "Manual (Spreadsheets)",
    description: "Google Sheets + manual enrichment + ChatGPT for scoring",
    pros: ["$0/month (just tool subscriptions)", "Complete control", "Learn every step deeply"],
    cons: ["30-60 minutes per 100 leads", "Error-prone", "Doesn't scale past 200-300/month"]
  }}
  expertVerdict="For solo founders: Start manual for your first 100 leads to learn the process. Then choose Clay if you value time over money, or n8n if you're technical and want to optimize costs. Never stay manual past 300 leads/month — the time cost kills you."
/>

**When to choose each:**

- **Clay:** You're non-technical, budget is $150-350/month, you want to move fast
- **n8n:** You're technical, budget is &lt;$100/month, you want full control
- **Manual:** You're learning, processing &lt;200 leads/month, budget is &lt;$50/month

---

## Your Action Items

<InteractiveChecklist 
  title="Build Your Pipeline This Week" 
  persistKey="ai-lead-research-L4-actions" 
  items={[
    "Define your discovery source and ICP filters (use Sales Navigator or Apollo)",
    "Set up your waterfall enrichment (Clay or manual Apollo → Hunter → Snov)",
    "Create your lead data schema (use the template builder above)",
    "Write your scoring criteria (fit, signal, friction) and test on 10 past leads",
    "Design your Tier A and Tier B sequences (5-touch and 4-touch)",
    "Process your first 50 leads through the full pipeline and measure conversion at each stage",
    "Calculate your cost-per-qualified-meeting and optimize the most expensive stage"
  ]} 
/>

---

## What's Next

You now have the architecture. But architecture without execution is just a diagram.

**Next lesson:** You're building the Prospect Research Agent — the AI that turns raw company names into rich, personalized research briefs in 60 seconds.

**Lesson 6:** You're building the ICP Scoring Agent — the AI that scores 500 leads in 2 minutes with 85%+ accuracy.

**By Lesson 10:** You'll have a fully automated pipeline processing 500+ leads per month, with AI doing 90% of the work and you focusing on the 10% that matters — talking to Tier A prospects.

The pipeline is your system. The agents are your team. Let's build both.