---
title: "Building the Prospect Research Agent"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 5
---

## The 15-Minute Research Problem

You've got 200 prospects in your spreadsheet. Each one needs personalized outreach. If you spend 15 minutes per prospect doing manual research—reading their LinkedIn, checking company news, finding conversation hooks—that's **50 hours of work**.

Most solo founders skip the research. They send generic templates. Reply rates tank.

But here's what changed in 2025: **AI research agents can do 80% of that work in 60 seconds per prospect.**

Not perfectly. Not without oversight. But well enough that you can personalize at scale without burning weekends on LinkedIn stalking.

This lesson teaches you to build a prospect research agent that:
- Takes a name + company
- Returns a rich research brief in 30-60 seconds
- Costs $0.01-0.05 per prospect
- Produces 3+ conversation hooks per person

By the end, you'll have a working research agent and a prompt library you can deploy in Clay, n8n, or a simple Google Sheet.

<InsightCard icon="⚡" title="The 10x Research Multiplier">
AI research agents don't replace human judgment—they compress 15 minutes of browsing into 60 seconds of structured output. You still review. You still add the human touch. But you do it 10x faster.
</InsightCard>

---

## What a Research Agent Actually Does

A prospect research agent is an AI system that takes minimal input (name, title, company, domain) and returns a structured brief with:

1. **Company Overview** — What they do, who they serve, stage of growth
2. **Recent News** — Funding, product launches, leadership changes, press mentions
3. **Key Challenges** — Likely pain points based on industry, size, and stage
4. **Tech Stack Signals** — Technologies they use (from job postings, BuiltWith, etc.)
5. **Conversation Hooks** — 3-5 specific angles for personalized outreach
6. **Personalization Angle** — Best approach based on all the above

Here's what that looks like in practice:

<ExampleCard label="Research Brief: Sarah Chen, VP Marketing at Acme Corp">

**Input:**
- Name: Sarah Chen
- Title: VP of Marketing
- Company: Acme Corp
- Domain: acmecorp.com
- LinkedIn: linkedin.com/in/sarahchen

**AI-Generated Output (60 seconds):**

```json
{
  "company_overview": "Acme Corp is a B2B SaaS platform for supply chain analytics, serving mid-market manufacturers. 150 employees, Series A funded.",
  "recent_news": "Closed $5M Series A in January 2026 (TechCrunch). Launched new predictive analytics feature in December 2025.",
  "key_challenges": "Likely scaling marketing post-funding. Job posting for 'Demand Gen Manager' suggests they're building outbound motion. G2 reviews mention 'great product, needs better onboarding.'",
  "tech_stack_signals": "Uses HubSpot (job posting), Salesforce (LinkedIn company page), Slack (careers page). No mention of outreach automation tools.",
  "conversation_hooks": [
    "Congrats on the Series A—saw the TechCrunch piece",
    "Noticed you're hiring for demand gen; we help teams scale outbound without adding headcount",
    "Your G2 reviews are strong—customers love the analytics but mention onboarding friction"
  ],
  "personalization_angle": "Lead with funding congratulations, pivot to scaling challenge (demand gen hire), offer to help with outbound infrastructure.",
  "confidence_score": "high"
}
```

</ExampleCard>

That brief took an AI agent 60 seconds. It would take you 15-20 minutes to compile manually.

<RangeSlider 
  label="How much time do you currently spend researching each prospect before outreach?" 
  min={0} 
  max={30} 
  lowLabel="0 min (none)" 
  highLabel="30+ min" 
  persistKey="ai-lead-research-L5-research-time" 
/>

---

## The Research Agent Architecture

Here's how a research agent works under the hood:

<SlideNavigation>
<Slide title="Step 1: Input Collection">

The agent needs minimal data to start:
- **Required:** First name, last name, company name, company domain
- **Optional but helpful:** Title, LinkedIn URL, location

This data comes from your enrichment pipeline (Lesson 3-4). If you've already run waterfall enrichment, you have everything needed.

**Example Input JSON:**
```json
{
  "first_name": "Sarah",
  "last_name": "Chen",
  "title": "VP of Marketing",
  "company": "Acme Corp",
  "domain": "acmecorp.com",
  "linkedin_url": "linkedin.com/in/sarahchen"
}
```

</Slide>

<Slide title="Step 2: Data Gathering">

The agent pulls information from multiple sources:

**Primary Sources:**
- Company website (homepage, about page, blog)
- Recent Google News results for the company
- LinkedIn company page (if available)
- Crunchbase (funding data)
- BuiltWith or similar (tech stack)
- G2/Capterra reviews (customer feedback)

**In Clay:** Use HTTP enrichment columns to fetch website content, Google News API, Crunchbase API.

**In n8n:** Use HTTP Request nodes to scrape pages, API nodes for structured data.

**In Custom Scripts:** Use libraries like `requests` (Python) or `axios` (Node.js) to fetch data.

</Slide>

<Slide title="Step 3: AI Processing">

The agent sends all gathered data to an LLM (GPT-4, Claude, etc.) with a structured prompt:

**System Prompt Pattern:**
```
You are a B2B prospect research agent. Given raw data about a person 
and their company, produce a structured research brief.

RULES:
- Only include facts you can verify from the provided data
- If information is missing, write "Not found"
- Never invent or guess
- Focus on sales-relevant insights
- Keep output under 200 words

OUTPUT FORMAT: [JSON schema]
```

The LLM processes the data and returns structured JSON.

</Slide>

<Slide title="Step 4: Quality Control">

Before using the output, apply quality checks:

**Anti-Hallucination Checks:**
- Does the company overview match the website?
- Are news items dated and verifiable?
- Do conversation hooks reference real events?

**Confidence Scoring:**
- High confidence: 3+ verified data points
- Medium confidence: 1-2 verified data points
- Low confidence: Mostly inferred or generic

**Human Review Threshold:**
- Tier A prospects (score 8-10): Always human-review
- Tier B prospects (score 5-7): Spot-check 10%
- Tier C prospects (score 1-4): Auto-approve

</Slide>

<Slide title="Step 5: Output & Storage">

The agent outputs structured JSON that feeds into your personalization system (Course 24).

**Storage Options:**
- Clay: Store in enrichment table columns
- Google Sheets: Write to new columns
- CRM: Push to custom fields in HubSpot/Salesforce
- JSON file: Export for batch processing

The research brief becomes the input for AI-generated first lines, icebreakers, and value props.

</Slide>
</SlideNavigation>

---

## Building Your First Research Agent (Clay)

Clay makes this easiest for non-technical founders. Here's the step-by-step:

<TemplateBuilder
  title="Clay Research Agent Configuration"
  persistKey="ai-lead-research-L5-clay-config"
  sections={[
    {
      id: "inputs",
      title: "Input Columns",
      fields: [
        { id: "name_col", label: "First Name Column", placeholder: "e.g., First Name", type: "text" },
        { id: "company_col", label: "Company Column", placeholder: "e.g., Company", type: "text" },
        { id: "domain_col", label: "Domain Column", placeholder: "e.g., Domain", type: "text" },
        { id: "linkedin_col", label: "LinkedIn URL Column (optional)", placeholder: "e.g., LinkedIn URL", type: "text" }
      ]
    },
    {
      id: "data_sources",
      title: "Data Sources to Fetch",
      fields: [
        { id: "website", label: "Fetch company website?", type: "checkbox" },
        { id: "news", label: "Fetch recent news?", type: "checkbox" },
        { id: "crunchbase", label: "Fetch Crunchbase data?", type: "checkbox" },
        { id: "builtwith", label: "Fetch tech stack?", type: "checkbox" }
      ]
    },
    {
      id: "ai_config",
      title: "AI Model Configuration",
      fields: [
        { id: "model", label: "Model", placeholder: "gpt-4o or claude-3-5-sonnet", type: "text" },
        { id: "max_tokens", label: "Max Output Tokens", placeholder: "500", type: "text" },
        { id: "temperature", label: "Temperature (0-1)", placeholder: "0.3", type: "text" }
      ]
    }
  ]}
/>

**Clay Setup Steps:**

1. **Add HTTP Enrichment Column** for company website
   - URL: `https://{{domain}}`
   - Extract: Full page HTML or just meta description

2. **Add Google News Enrichment** (if available in Clay integrations)
   - Query: `{{company}} news`
   - Date range: Last 6 months

3. **Add Crunchbase Enrichment** (if you have API access)
   - Input: Company domain
   - Output: Funding, employee count, description

4. **Add AI Research Column**
   - Type: "Use AI"
   - Model: GPT-4o or Claude 3.5 Sonnet
   - Prompt: [See next section]
   - Input columns: All data from steps 1-3
   - Output: JSON parsed into separate columns

5. **Parse JSON Output** into individual columns
   - `company_overview`
   - `recent_news`
   - `conversation_hooks` (array)
   - `personalization_angle`
   - `confidence_score`

<InsightCard icon="💰" title="Clay Credit Cost">
A full research agent workflow in Clay uses 2-5 credits per prospect:
- 1 credit for HTTP enrichment (website)
- 1 credit for news/Crunchbase (if used)
- 1-2 credits for AI processing
- Total: ~$0.14-0.35 per prospect at Clay's pricing
</InsightCard>

---

## The Research Agent Prompt (Copy-Paste Ready)

Here's a production-ready prompt you can use in Clay, n8n, or any LLM API:

```
You are a B2B prospect research agent. Given information about a person 
and their company, produce a research brief for sales outreach.

INPUT DATA:
- Name: {{first_name}} {{last_name}}
- Title: {{title}}
- Company: {{company}}
- Domain: {{domain}}
- Website Content: {{website_html}}
- Recent News: {{news_results}}
- Funding Data: {{crunchbase_data}}
- Tech Stack: {{builtwith_data}}

RULES:
1. Only include facts you can verify from the provided data
2. If you cannot find information for a field, write "Not found"
3. Never invent, guess, or hallucinate information
4. Focus on information useful for a sales conversation
5. Keep the brief under 200 words total
6. Provide 3-5 specific conversation hooks, not generic statements

OUTPUT FORMAT (JSON):
{
  "company_overview": "1-2 sentences about what the company does and who they serve",
  "recent_news": "Most recent notable event (funding, launch, hire, press mention) with date",
  "key_challenges": "Likely pain points based on company stage, industry, and available data",
  "tech_stack_signals": "Technologies they use or are likely to use based on job postings or BuiltWith",
  "conversation_hooks": [
    "Specific hook 1 (reference real event or data point)",
    "Specific hook 2",
    "Specific hook 3"
  ],
  "personalization_angle": "Best approach for outreach based on all research",
  "confidence_score": "high/medium/low based on data quality"
}

CONFIDENCE SCORING:
- High: 3+ verified data points (news, funding, tech stack, job postings)
- Medium: 1-2 verified data points
- Low: Only generic/inferred information

Begin research:
```

<FlipCard 
  front="Why 'Never invent or hallucinate' matters" 
  back="LLMs will confidently make up plausible-sounding facts if not constrained. One fake funding round or invented product launch destroys your credibility. Always include anti-hallucination instructions." 
/>

---

## Building in n8n (Budget Alternative)

If you're on a tight budget or want more control, build the research agent in n8n:

<SlideNavigation>
<Slide title="n8n Workflow Overview">

**Nodes:**
1. **Trigger:** Webhook or Google Sheets row added
2. **HTTP Request:** Fetch company website
3. **HTTP Request:** Google News search
4. **HTTP Request:** Crunchbase API (optional)
5. **OpenAI/Claude Node:** Process all data with research prompt
6. **Google Sheets Node:** Write output back to sheet

**Cost:** API calls only (~$0.02-0.05 per prospect)

**Time to build:** 2-3 hours for first workflow

</Slide>

<Slide title="Node 1: Trigger">

**Webhook Trigger:**
```json
{
  "first_name": "Sarah",
  "last_name": "Chen",
  "title": "VP of Marketing",
  "company": "Acme Corp",
  "domain": "acmecorp.com"
}
```

Or **Google Sheets Trigger:** New row added to "Prospects" sheet

</Slide>

<Slide title="Node 2: Fetch Website">

**HTTP Request Node:**
- Method: GET
- URL: `https://{{$json.domain}}`
- Response: Full HTML or extract `<meta name="description">`

**Error Handling:** If website fails to load, set `website_content = "Not available"`

</Slide>

<Slide title="Node 3: Fetch News">

**HTTP Request Node (Google News):**
- URL: `https://news.google.com/rss/search?q={{$json.company}}`
- Parse RSS feed
- Extract: Top 3 headlines + dates

**Alternative:** Use NewsAPI.org ($0 for 100 requests/day)

</Slide>

<Slide title="Node 4: AI Processing">

**OpenAI Node (or Claude via HTTP):**
- Model: `gpt-4o` or `claude-3-5-sonnet-20241022`
- System Prompt: [Research agent prompt from above]
- User Message: Inject all gathered data
- Max Tokens: 500
- Temperature: 0.3 (lower = more factual)

**Output:** JSON string

</Slide>

<Slide title="Node 5: Parse & Store">

**Function Node:** Parse JSON string into object

**Google Sheets Node:**
- Operation: Update row
- Write parsed fields to columns:
  - `company_overview`
  - `recent_news`
  - `conversation_hook_1`
  - `conversation_hook_2`
  - `conversation_hook_3`
  - `personalization_angle`
  - `confidence_score`

</Slide>
</SlideNavigation>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can build this in Python with `requests` + `openai` library in ~100 lines of code. Store results in PostgreSQL or Airtable. Total cost: API usage only. Build time: 1-2 hours.
</ContextualNote>

---

## Quality Control: The Trust-But-Verify Protocol

AI research agents are fast but not perfect. Here's how to catch hallucinations and low-quality output:

### The 10% Spot-Check Rule

For every 100 prospects researched:
1. Manually review 10 research briefs (random sample)
2. Verify each fact against source data
3. Count hallucinations (invented facts)
4. If hallucination rate >10%, rewrite prompt with stricter rules
5. If hallucination rate &lt;5%, approve for production

<InteractiveChecklist 
  title="Research Quality Checklist (Review 10 Briefs)" 
  persistKey="ai-lead-research-L5-quality-check" 
  items={[
    "Company overview matches website/LinkedIn description",
    "Recent news items are dated and verifiable via Google",
    "Conversation hooks reference real events (not generic)",
    "Tech stack claims match job postings or BuiltWith data",
    "No invented funding rounds or product launches",
    "Confidence score matches data quality (high = 3+ sources)",
    "Personalization angle is specific, not template-like",
    "No placeholder text like '[Company Name]' in output",
    "Hallucination rate &lt;10% across sample",
    "Output is actionable for outreach (not just facts)"
  ]} 
/>

### Red Flags to Watch For

<ClassifyExercise
  title="Classify These Research Outputs"
  persistKey="ai-lead-research-L5-classify"
  categories={[
    { id: "good", label: "High Quality", color: "#10b981" },
    { id: "medium", label: "Needs Review", color: "#f59e0b" },
    { id: "bad", label: "Hallucination Risk", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Recent news: Acme Corp closed $5M Series A in January 2026 (TechCrunch)", 
      correctCategory: "good",
      explanation: "Specific, dated, citable source" 
    },
    { 
      id: "2", 
      content: "Recent news: The company is growing rapidly and expanding", 
      correctCategory: "bad",
      explanation: "Generic, no source, likely hallucinated" 
    },
    { 
      id: "3", 
      content: "Tech stack: Uses HubSpot (mentioned in job posting for Marketing Ops role)", 
      correctCategory: "good",
      explanation: "Verifiable signal from job posting" 
    },
    { 
      id: "4", 
      content: "Tech stack: Likely uses Salesforce, Marketo, and Outreach.io", 
      correctCategory: "medium",
      explanation: "Inferred, not verified—needs human check" 
    },
    { 
      id: "5", 
      content: "Key challenges: Struggling with customer retention and churn", 
      correctCategory: "bad",
      explanation: "No evidence provided—pure speculation" 
    },
    { 
      id: "6", 
      content: "Key challenges: G2 reviews mention 'great product, needs better onboarding'", 
      correctCategory: "good",
      explanation: "Specific, verifiable from G2" 
    }
  ]}
/>

---

## The Research Agent Prompt Library

Different ICPs need different research angles. Here are 5 ready-to-use prompts:

<ProgressiveReveal title="5 Research Agent Prompts" persistKey="ai-lead-research-L5-prompts">

<RevealSection title="1. General B2B SaaS">

```
You are researching a B2B SaaS prospect. Focus on:
- Company stage (startup, growth, enterprise)
- Recent funding or growth signals
- Tech stack (especially sales/marketing tools)
- Hiring activity (sales, marketing, customer success roles)
- Customer feedback (G2, Capterra reviews)

Conversation hooks should reference:
- Funding announcements
- Product launches
- Hiring for relevant roles
- Pain points mentioned in reviews
- Competitive moves

Output: [Standard JSON schema]
```

</RevealSection>

<RevealSection title="2. Services/Consulting Firms">

```
You are researching a services/consulting firm prospect. Focus on:
- Client types and industries served
- Team size and growth trajectory
- Thought leadership (blog posts, webinars, speaking)
- Recent case studies or client wins
- Operational challenges (scaling, delivery, sales)

Conversation hooks should reference:
- Recent content they published
- Client wins or case studies
- Industry trends they're writing about
- Operational pain points (manual processes, scaling)

Output: [Standard JSON schema]
```

</RevealSection>

<RevealSection title="3. Creator/Coach ICPs">

```
You are researching a creator or coach. Focus on:
- Content platform (YouTube, podcast, newsletter, course)
- Audience size and engagement
- Monetization model (ads, sponsorships, courses, coaching)
- Recent content themes
- Growth trajectory (subscriber growth, new launches)

Conversation hooks should reference:
- Specific recent content (episode, post, video)
- Audience growth milestones
- New product launches (course, community, coaching)
- Pain points mentioned in content (scaling, automation, monetization)

Output: [Standard JSON schema]
```

</RevealSection>

<RevealSection title="4. Enterprise Prospects">

```
You are researching an enterprise prospect. Focus on:
- Company size and structure (divisions, geographies)
- Recent strategic initiatives (M&A, digital transformation)
- Technology modernization efforts
- Regulatory or compliance pressures
- Executive leadership changes

Conversation hooks should reference:
- Strategic initiatives from earnings calls or press releases
- Technology investments (from job postings or news)
- Leadership changes (new CTO, CMO, etc.)
- Industry-specific challenges (regulation, competition)

Output: [Standard JSON schema]
```

</RevealSection>

<RevealSection title="5. High-Velocity SMB">

```
You are researching a small business prospect. Focus on:
- Business model and revenue streams
- Local vs. national presence
- Online presence (website quality, social media activity)
- Recent changes (new location, rebrand, expansion)
- Operational pain points (manual processes, scaling challenges)

Conversation hooks should reference:
- Recent business changes (new location, rebrand)
- Social media activity or local news mentions
- Website quality issues (slow, outdated, poor mobile)
- Operational inefficiencies visible from job postings

Output: [Standard JSON schema]
```

</RevealSection>

</ProgressiveReveal>

---

## Hands-On: Build Your Research Agent

Time to build. Choose your path:

<DecisionTree
  title="Choose Your Build Path"
  persistKey="ai-lead-research-L5-build-path"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Which tool will you use to build your research agent?", 
      choices: [
        { label: "Clay (easiest, higher cost)", nextNodeId: "clay" },
        { label: "n8n (more control, lower cost)", nextNodeId: "n8n" },
        { label: "Custom code (Python/Node.js)", nextNodeId: "code" }
      ]
    },
    { 
      id: "clay", 
      content: "Great choice for speed. Follow the Clay setup steps above. Your next action: Add an AI Research column to your enrichment table.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "n8n", 
      content: "Smart for budget-conscious builders. Follow the n8n workflow steps above. Your next action: Create a new workflow and add the webhook trigger.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "code", 
      content: "Maximum flexibility. Use the research agent prompt with OpenAI or Claude API. Your next action: Set up API credentials and write the data-fetching logic.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

### Research Race Challenge

Let's test your agent with a real scenario:

<TimedChallenge
  title="Research Race: 3 Prospects in 5 Minutes"
  persistKey="ai-lead-research-L5-race"
  timeLimit={300}
  items={[
    { 
      id: "1", 
      prompt: "Research: John Smith, CTO at TechFlow Inc (techflow.io). Find 2 conversation hooks.", 
      correctAnswer: "hooks_found",
      explanation: "Good hooks: recent funding, tech stack changes, hiring activity, product launches" 
    },
    { 
      id: "2", 
      prompt: "Research: Maria Garcia, VP Sales at CloudScale (cloudscale.com). Identify their key challenge.", 
      correctAnswer: "challenge_identified",
      explanation: "Look for: G2 reviews, job postings, recent content, competitive positioning" 
    },
    { 
      id: "3", 
      prompt: "Research: Alex Chen, Founder at StartupX (startupx.io). Find their personalization angle.", 
      correctAnswer: "angle_found",
      explanation: "Best angles: recent launch, funding, hiring, content themes, growth milestones" 
    }
  ]}
/>

---

## Cost & Volume Planning

Let's calculate what your research agent will cost at different volumes:

<ScenarioSimulator
  title="Research Agent Cost Calculator"
  persistKey="ai-lead-research-L5-cost-calc"
  levers={[
    { id: "prospects", label: "Prospects per month", min: 50, max: 1000, step: 50, defaultValue: 200 },
    { id: "platform", label: "Platform", options: ["Clay ($0.35/prospect)", "n8n + API ($0.03/prospect)", "Custom code ($0.02/prospect)"], defaultValue: "Clay ($0.35/prospect)" }
  ]}
  outputs={[
    { 
      id: "monthly_cost", 
      label: "Monthly research cost", 
      formula: "platform === 'Clay ($0.35/prospect)' ? prospects * 0.35 : platform === 'n8n + API ($0.03/prospect)' ? prospects * 0.03 : prospects * 0.02", 
      unit: "$", 
      precision: 2 
    },
    { 
      id: "time_saved", 
      label: "Hours saved vs. manual", 
      formula: "(prospects * 15) / 60", 
      unit: " hours", 
      precision: 1 
    }
  ]}
  insight="At `{prospects}` prospects/month, you save `{time_saved}` hours of manual research. That's {time_saved / 40} weeks of full-time work compressed into minutes."
/>

<InsightCard icon="📊" title="The Research ROI">
If your time is worth $100/hour, and the agent saves you 15 minutes per prospect, that's $25 of value per prospect. At 200 prospects/month, that's $5,000 in time saved—for a tool cost of $70-200/month.
</InsightCard>

---

## Common Pitfalls & How to Avoid Them

### Pitfall 1: Over-Relying on AI Without Verification

**The Problem:** AI generates plausible-sounding facts that aren't true. You send outreach referencing a fake funding round. Credibility destroyed.

**The Fix:** Always spot-check 10% of output. For Tier A prospects, human-review every brief.

### Pitfall 2: Generic Conversation Hooks

**The Problem:** AI returns hooks like "I see you're in the SaaS space" or "Your company is growing fast"—useless for personalization.

**The Fix:** Add to your prompt: "Conversation hooks must reference specific, verifiable events or data points. No generic statements."

### Pitfall 3: Ignoring Confidence Scores

**The Problem:** You treat all research briefs equally. Low-confidence briefs (based on minimal data) get sent as if they're high-quality.

**The Fix:** Only use high-confidence briefs for Tier A outreach. Medium-confidence for Tier B. Low-confidence gets template personalization only.

### Pitfall 4: Not Updating Prompts Based on Results

**The Problem:** Your first prompt version isn't perfect. But you never iterate. Quality stays mediocre.

**The Fix:** Run the calibration loop monthly. Compare research quality to actual reply rates. Adjust prompts based on what works.

<MiniRoleplay
  scenario="A prospect replies: 'You mentioned we raised a Series B. We didn't. Where did you get that?'"
  role="You are the founder responding to this embarrassing error"
  persistKey="ai-lead-research-L5-roleplay"
  modelResponse="You're absolutely right—I apologize for the error. I'm refining my research process and that slipped through. I'd still love to connect about [actual pain point]. Would you be open to a quick call?"
/>

---

## Integration with Your Pipeline

Your research agent doesn't work in isolation. It's **Step 2.5** in your enrichment pipeline:

```
DISCOVER → ENRICH → **RESEARCH** → SCORE → PERSONALIZE → SEND
```

**Data Flow:**
1. Discover prospects (Apollo, Sales Nav)
2. Enrich with waterfall (email, phone, company data)
3. **Research with AI agent** (this lesson)
4. Score ICP fit (Lesson 6)
5. Personalize outreach (Course 24)
6. Send sequences (Course 24)

The research brief becomes the **input for personalization**. Your AI-generated first lines, icebreakers, and value props pull from the conversation hooks and personalization angles.

<FlipCard 
  front="Why research comes AFTER enrichment" 
  back="You need basic data (name, title, company, domain) before you can research. Enrichment fills those gaps. Research adds the qualitative layer on top." 
/>

---

## Your Action Items

<InteractiveChecklist 
  title="Build Your Research Agent This Week" 
  persistKey="ai-lead-research-L5-actions" 
  items={[
    "Choose your platform: Clay, n8n, or custom code",
    "Copy the research agent prompt and customize for your ICP",
    "Set up data sources: website fetch, news search, Crunchbase (optional)",
    "Configure AI model: GPT-4o or Claude 3.5 Sonnet",
    "Test on 10 prospects and review output quality",
    "Run the 10% spot-check protocol and calculate hallucination rate",
    "Adjust prompt if hallucination rate >10%",
    "Integrate research output into your enrichment pipeline",
    "Calculate cost per prospect and monthly budget impact",
    "Document your workflow in a simple SOP (1-page)"
  ]} 
/>

---

## What's Next

You now have a research agent that turns names into rich, personalized briefs in 60 seconds.

**Next lesson (Lesson 6):** You'll build the **ICP Fit Scoring Agent**—an AI system that takes your enriched + researched data and outputs a 1-10 score with priority tiers (A/B/C). This determines who gets manual outreach, who gets automated sequences, and who gets disqualified.

The research brief you just built feeds directly into the scoring agent. Together, they form the intelligence layer of your acquisition pipeline.

---

## Quick Knowledge Check

<PredictionGate
  question="You run your research agent on 100 prospects. It returns high-confidence briefs for 60, medium for 30, low for 10. What should you do with the low-confidence briefs?"
  persistKey="ai-lead-research-L5-predict"
  type="choice"
  choices={[
    { id: "a", text: "Send them anyway—AI is usually right" },
    { id: "b", text: "Use template personalization instead of AI-generated hooks" },
    { id: "c", text: "Manually research those 10 prospects" },
    { id: "d", text: "Disqualify them from outreach" }
  ]}
  correctId="b"
>

**Correct answer: B—Use template personalization instead of AI-generated hooks.**

Low-confidence briefs mean the AI didn't have enough data to generate quality hooks. Don't disqualify the prospects (they might still be good fits), but don't risk sending personalization based on weak data. Fall back to template-based outreach for those 10.

For Tier A prospects, you'd manually research. For Tier B/C, templates are fine.

</PredictionGate>