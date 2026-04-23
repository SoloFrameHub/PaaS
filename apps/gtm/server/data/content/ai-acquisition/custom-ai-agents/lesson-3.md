---
title: "Agent 1: Prospect Research Agent"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 3
---

# Agent 1: Prospect Research Agent

## The 15-Minute Research Problem

You're staring at a spreadsheet of 200 LinkedIn profiles you just exported. Each one needs research before you can write a personalized email. At 15 minutes per prospect, that's **50 hours of work**.

Most solo founders do one of two things:
1. Skip the research and send generic emails (2% reply rate)
2. Research 10-20 prospects and give up (burnout)

**There's a third option:** Build an AI agent that does 80% of the research in 2 minutes, then you spend 3 minutes reviewing and adding the human insight that matters.

<InsightCard icon="⚡" title="The Research Agent ROI">
At 50 prospects/week: 12.5 hours saved weekly. That's 650 hours/year — or 16 full work weeks — back in your calendar.
</InsightCard>

By the end of this lesson, you'll have a working Prospect Research Agent that:
- Pulls data from LinkedIn, Crunchbase, and Google News
- Generates a 1-page brief with pain signals and connection points
- Scores ICP fit and recommends an outreach angle
- Costs $0.01-0.02 per brief

Let's build it.

---

## What Makes a Good Research Agent?

Before we write a single line of code, let's define what "good" looks like.

<FlipCard 
  front="What's the difference between a prompt and an agent?" 
  back="A prompt is a one-shot question. An agent is a system that takes a goal, accesses tools (APIs, databases), makes decisions in a loop, and produces structured output." 
/>

### The 5 Components of a Research Agent

<SlideNavigation>
<Slide title="1. Clear Goal">
**Bad goal:** "Research this prospect"
**Good goal:** "Generate a 1-page brief with: prospect overview, company context, 3 pain signals, 2 connection points, and a recommended outreach angle. Score ICP fit 1-10."

Specificity = consistency. Vague goals produce vague outputs.
</Slide>

<Slide title="2. Data Sources">
Your agent needs access to:
- **CRM data** (name, email, company, role)
- **LinkedIn** (profile, recent posts, tenure)
- **Company data** (size, funding, tech stack)
- **News** (recent mentions, trigger events)

The more sources, the richer the brief — but also the higher the cost and complexity. Start with 2-3 sources.
</Slide>

<Slide title="3. Structured Output">
Free-form text is hard to use. Your agent should produce:
- **Markdown brief** (human-readable)
- **Structured fields** (ICP score, recommended channel, key talking points)
- **Source citations** (so you can verify facts)

This makes the output actionable, not just informative.
</Slide>

<Slide title="4. Anti-Hallucination Instructions">
LLMs will confidently make up facts if you don't stop them.

**Critical instruction:** "If you cannot find specific information, write 'Not found' rather than guessing. Include source URLs for all claims."

This single line reduces hallucination from 15% to 1-3%.
</Slide>

<Slide title="5. Quality Control">
Spot-check 10% of briefs weekly. Common failures:
- Hallucinated job titles
- Wrong company details (confused with similar name)
- Generic pain signals (not specific to this person)

**Mitigation:** Require the agent to cite sources. If it can't link to a LinkedIn post or news article, it shouldn't claim it.
</Slide>
</SlideNavigation>

<RangeSlider 
  label="How much manual research do you currently do per prospect?" 
  min={0} 
  max={30} 
  lowLabel="0 min (none)" 
  highLabel="30+ min" 
  persistKey="custom-ai-agents-L3-research-time" 
/>

---

## The Research Brief Template

Here's the exact template your agent will fill in. This is the **output format** — the structure that makes research actionable.

<TemplateBuilder
  title="Prospect Research Brief Template"
  persistKey="custom-ai-agents-L3-template"
  sections={[
    {
      id: "overview",
      title: "1. Prospect Overview",
      fields: [
        { id: "role", label: "Role & Tenure", placeholder: "e.g., VP of Marketing at Acme Corp (2 years)", type: "text" },
        { id: "background", label: "Background", placeholder: "e.g., Previously at BigCo, MBA from State U", type: "textarea" },
        { id: "linkedin", label: "LinkedIn Activity", placeholder: "e.g., Posts 2-3x/week about content marketing, 5K followers", type: "textarea" }
      ]
    },
    {
      id: "company",
      title: "2. Company Context",
      fields: [
        { id: "size", label: "Company Size & Stage", placeholder: "e.g., 150 employees, Series B ($20M raised)", type: "text" },
        { id: "tech", label: "Tech Stack (if available)", placeholder: "e.g., HubSpot, Salesforce, Segment", type: "text" },
        { id: "news", label: "Recent News", placeholder: "e.g., Launched new product line last month (TechCrunch)", type: "textarea" }
      ]
    },
    {
      id: "signals",
      title: "3. Pain Signals",
      fields: [
        { id: "signal1", label: "Signal 1", placeholder: "e.g., Hiring 3 SDRs (LinkedIn Jobs) — likely scaling outbound", type: "textarea" },
        { id: "signal2", label: "Signal 2", placeholder: "e.g., Posted about attribution challenges (LinkedIn)", type: "textarea" },
        { id: "signal3", label: "Signal 3", placeholder: "e.g., Using 5+ martech tools (BuiltWith) — integration pain", type: "textarea" }
      ]
    },
    {
      id: "connection",
      title: "4. Connection Points",
      fields: [
        { id: "mutual", label: "Mutual Connections", placeholder: "e.g., Connected to Sarah J. (former colleague)", type: "text" },
        { id: "shared", label: "Shared Interests", placeholder: "e.g., Both post about AI in marketing", type: "text" }
      ]
    },
    {
      id: "outreach",
      title: "5. Recommended Outreach",
      fields: [
        { id: "channel", label: "Channel", placeholder: "e.g., LinkedIn DM (active poster)", type: "text" },
        { id: "hook", label: "Hook", placeholder: "e.g., Reference their post about attribution", type: "textarea" },
        { id: "angle", label: "Value Angle", placeholder: "e.g., Show how we solve attribution for similar companies", type: "textarea" }
      ]
    }
  ]}
/>

**Pro tip:** Save this template. You'll use it as the **system prompt** for your agent in the next section.

---

## Building the Agent: Step-by-Step

Now let's turn that template into a working agent. We'll use **n8n** (the orchestrator from Lesson 2) and **Claude Sonnet** (the LLM).

<ExampleCard label="Why n8n + Claude?">
**n8n** gives you a visual workflow builder with 400+ integrations. **Claude Sonnet** is the best balance of quality and cost for research tasks ($0.01-0.02/brief vs $0.05-0.15 for GPT-4o).

You could also use Zapier + GPT-4o, or Trigger.dev + any LLM. The pattern is the same.
</ExampleCard>

### Step 1: Set Up the Trigger

Your agent needs to know **when** to run. Two options:

<ComparisonBuilder
  title="Event-Driven vs. Scheduled Trigger"
  persistKey="custom-ai-agents-L3-trigger"
  prompt="Which trigger pattern fits your workflow?"
  expertExample="Event-driven: New contact added to CRM → agent runs immediately. Scheduled: Every Monday at 9am, agent processes all contacts added in the last 7 days."
  criteria={[
    "Do you add contacts in batches or one-by-one?",
    "Do you need instant research or can it wait?",
    "How many contacts/week do you add?"
  ]}
/>

**For most solo founders:** Event-driven is better. You add a contact, the agent runs, and 2 minutes later you have a brief.

**n8n setup:**
1. Trigger node: "Webhook" (if your CRM can send webhooks) or "CRM Watch" (polls for new contacts)
2. Input: Contact name, email, company, role

### Step 2: Gather Data (Parallel Where Possible)

Your agent needs to pull data from multiple sources. The more you can run **in parallel**, the faster your agent.

```
[Trigger: New Contact]
    ↓
[Split into 3 parallel branches]
    ↓
Branch A: LinkedIn data (Evaboot CSV or manual paste)
Branch B: Company data (Crunchbase API or Clearbit)
Branch C: Recent news (Google News API or SerpAPI)
    ↓
[Merge branches]
    ↓
[Pass all data to LLM]
```

<InsightCard icon="🔧" title="The Free-Tier Stack">
- **LinkedIn:** Manual paste or Evaboot export ($0)
- **Company data:** Crunchbase free tier (3 lookups/day) or Apollo.io (10K/month free)
- **News:** SerpAPI ($50/month for 5K searches) or Google News RSS (free but manual)

Total cost: $0-50/month depending on volume.
</InsightCard>

**n8n setup:**
1. HTTP Request node (A): Fetch LinkedIn data from your CSV/CRM field
2. HTTP Request node (B): Call Crunchbase or Apollo API with company name
3. HTTP Request node (C): Call SerpAPI with `{company name} news` query, last 30 days
4. Merge node: Combine all 3 outputs into one JSON object

### Step 3: Build the Research Prompt

This is where the magic happens. You're going to give Claude:
- The template (from earlier)
- All the data you just gathered
- Anti-hallucination instructions
- Your ICP criteria (so it can score fit)

<TemplateBuilder
  title="Research Agent System Prompt"
  persistKey="custom-ai-agents-L3-prompt"
  sections={[
    {
      id: "role",
      title: "Agent Role",
      fields: [
        { id: "role_desc", label: "Role Description", placeholder: "You are a sales research assistant for a solo founder building [your product/service].", type: "textarea" }
      ]
    },
    {
      id: "task",
      title: "Task Definition",
      fields: [
        { id: "task_desc", label: "Task", placeholder: "Generate a 1-page prospect brief for the contact below. Use the provided data sources. Follow the exact template structure.", type: "textarea" }
      ]
    },
    {
      id: "constraints",
      title: "Constraints & Anti-Hallucination",
      fields: [
        { id: "constraints_list", label: "Constraints", placeholder: "- If information is unavailable, write 'Not found' rather than guessing\n- Include source URLs for all factual claims\n- Pain signals must be specific to this person's role and company stage\n- Connection points must be verifiable (LinkedIn activity, mutual connections)", type: "textarea" }
      ]
    },
    {
      id: "icp",
      title: "ICP Scoring Criteria",
      fields: [
        { id: "icp_criteria", label: "ICP Criteria (from Course 1)", placeholder: "Score 1-10 based on:\n- Company size: 50-500 employees (10 pts if in range)\n- Role: VP/Director level (10 pts if yes)\n- Tech stack: Uses HubSpot or Salesforce (10 pts if yes)\n- Recent trigger: Hiring, funding, or product launch (10 pts if yes)", type: "textarea" }
      ]
    }
  ]}
/>

**Full prompt structure:**

```
SYSTEM PROMPT:
{Your role description}

TASK:
{Task definition}

PROSPECT DATA:
Name: {name}
Email: {email}
Company: {company}
Role: {role}

LINKEDIN DATA:
{linkedin_json}

COMPANY DATA:
{company_json}

RECENT NEWS:
{news_json}

ICP CRITERIA:
{icp_criteria}

CONSTRAINTS:
{constraints_list}

OUTPUT TEMPLATE:
## Prospect Brief: {name}
Generated: {date} | ICP Score: __/10

### 1. Prospect Overview
- Role: ...
- Background: ...
- LinkedIn: ...

### 2. Company Context
- Size: ... | Stage: ...
- Tech Stack: ...
- Recent News: ...

### 3. Pain Signals
- Signal 1: ...
- Signal 2: ...
- Signal 3: ...

### 4. Connection Points
- Mutual connections: ...
- Shared interests: ...

### 5. Recommended Outreach Angle
- Channel: ...
- Hook: ...
- Value prop: ...
- CTA: ...
```

**n8n setup:**
1. AI Agent node: Claude Sonnet 4
2. System prompt: Paste the full prompt above
3. Max tokens: 1000
4. Temperature: 0.3 (low = more factual, less creative)

### Step 4: Extract Structured Fields

The LLM will return a markdown brief. You also need **structured data** for your CRM (ICP score, recommended channel, etc.).

Two options:
1. **Regex extraction** (fast but brittle): Parse the markdown for `ICP Score: 8/10` and extract the number
2. **Second LLM call** (slower but reliable): Ask Claude to output JSON with `{icp_score: 8, channel: "LinkedIn", angle: "..."}`

**Recommended:** Use JSON output from the start. Modify the prompt to say:

```
OUTPUT FORMAT:
Return a JSON object with:
{
  "brief_markdown": "...",
  "icp_score": 8,
  "recommended_channel": "LinkedIn",
  "outreach_angle": "Reference their post about attribution",
  "key_talking_points": ["Point 1", "Point 2", "Point 3"]
}
```

**n8n setup:**
1. Code node (JavaScript): Parse the JSON response
2. Extract fields: `icp_score`, `recommended_channel`, `outreach_angle`, `key_talking_points`

### Step 5: Save to CRM and Notify

Final step: Update your CRM and notify yourself if it's a high-priority prospect.

**n8n setup:**
1. CRM Update node (Airtable, Notion, or your CRM's API):
   - Field: `research_brief` → `{brief_markdown}`
   - Field: `icp_score` → `{icp_score}`
   - Field: `recommended_channel` → `{recommended_channel}`
   - Field: `outreach_angle` → `{outreach_angle}`
   - Field: `research_date` → `{today()}`
2. IF node: `icp_score >= 8`
   - YES → Slack notification: "High-fit prospect: `{name}` (`{icp_score}`/10)"
   - NO → (do nothing)

---

## Testing Your Agent

You've built the workflow. Now let's test it with real data.

<InteractiveChecklist 
  title="Agent Testing Checklist" 
  persistKey="custom-ai-agents-L3-testing" 
  items={[
    "Test with 3 real prospects from your CRM",
    "Verify all data sources return results (LinkedIn, company, news)",
    "Check that ICP scores match your manual assessment",
    "Confirm pain signals are specific (not generic)",
    "Verify source URLs are included and accurate",
    "Test the 'Not found' fallback (use a prospect with minimal data)",
    "Check CRM fields update correctly",
    "Confirm Slack notification triggers for high-fit prospects"
  ]} 
/>

### Common Failures and Fixes

<ClassifyExercise
  title="Classify These Agent Failures"
  persistKey="custom-ai-agents-L3-failures"
  categories={[
    { id: "data", label: "Data Source Issue", color: "#ef4444" },
    { id: "prompt", label: "Prompt Issue", color: "#f59e0b" },
    { id: "integration", label: "Integration Issue", color: "#3b82f6" }
  ]}
  items={[
    { id: "1", content: "Agent says 'VP of Marketing' but LinkedIn shows 'Marketing Manager'", correctCategory: "data" },
    { id: "2", content: "Pain signals are generic ('needs to grow faster')", correctCategory: "prompt" },
    { id: "3", content: "CRM field 'icp_score' is blank after agent runs", correctCategory: "integration" },
    { id: "4", content: "Agent invents a recent funding round that didn't happen", correctCategory: "prompt" },
    { id: "5", content: "News section is always empty", correctCategory: "data" }
  ]}
/>

**Fixes:**
- **Data source issue:** Check API credentials, rate limits, and response format. Add error handling.
- **Prompt issue:** Add more specific constraints. Example: "Pain signals must reference a specific LinkedIn post, job posting, or news article."
- **Integration issue:** Check field mapping in your CRM update node. Verify the JSON path is correct.

---

## The Token Economics

Let's talk cost. Every time your agent runs, you're paying for:
1. **API calls** (LinkedIn, Crunchbase, news)
2. **LLM tokens** (input + output)

<ScenarioSimulator
  title="Research Agent Cost Calculator"
  persistKey="custom-ai-agents-L3-cost"
  levers={[
    { id: "prospects", label: "Prospects per week", min: 10, max: 500, step: 10, defaultValue: 50 },
    { id: "model", label: "Model", options: [
      { value: "sonnet", label: "Claude Sonnet ($0.015/brief)" },
      { value: "haiku", label: "Claude Haiku ($0.001/brief)" },
      { value: "gpt4o", label: "GPT-4o ($0.025/brief)" }
    ], defaultValue: "sonnet" }
  ]}
  outputs={[
    { id: "weekly", label: "Weekly LLM cost", formula: "prospects * (model === 'sonnet' ? 0.015 : model === 'haiku' ? 0.001 : 0.025)", unit: "$", precision: 2 },
    { id: "monthly", label: "Monthly LLM cost", formula: "weekly * 4.3", unit: "$", precision: 2 },
    { id: "yearly", label: "Yearly LLM cost", formula: "monthly * 12", unit: "$", precision: 2 }
  ]}
  insight="At `{prospects}` prospects/week with `{model}`, you're spending $`{monthly}`/month on LLM calls. Add ~$10-50/month for API calls (Crunchbase, news). Total: ${monthly + 30}/month."
/>

**Key insight:** Even at 200 prospects/week with Claude Sonnet, you're spending **$12-15/month** on LLM costs. This is negligible compared to the 50+ hours/month you're saving.

---

## B2B vs. Creator Context

The research agent works for both B2B and creator businesses, but the **data sources** and **pain signals** differ.

<ConceptReframe
  concept="Prospect Research Agent"
  defaultLens="technical-founder"
  lenses={[
    { 
      id: "technical-founder", 
      label: "B2B SaaS Founder", 
      explanation: "Research company size, tech stack, recent funding, hiring signals. Pain signals: scaling challenges, integration pain, compliance needs. Data sources: Crunchbase, BuiltWith, LinkedIn Jobs." 
    },
    { 
      id: "coach", 
      label: "Coach/Consultant", 
      explanation: "Research client's business model, team size, revenue stage, recent launches. Pain signals: capacity constraints, client acquisition challenges, pricing/positioning. Data sources: LinkedIn, website, podcast appearances." 
    },
    { 
      id: "creator", 
      label: "Content Creator", 
      explanation: "Research audience size, content frequency, monetization model, community platforms. Pain signals: audience growth plateau, monetization gaps, content consistency. Data sources: Social Blade, YouTube Analytics (if shared), Patreon/Substack public data." 
    }
  ]}
/>

**Creator-specific fields to add:**
- Audience size (YouTube subs, email list estimate, Twitter followers)
- Content frequency (posts/week, video uploads/month)
- Monetization model (ads, sponsorships, courses, memberships)
- Community platforms (Discord, Slack, Circle)
- Recent launches (new course, product, community)

---

## Your Turn: Build the Agent

You've seen the blueprint. Now it's time to build your own.

<ProgressiveReveal title="Agent Build Sprint (45 minutes)" persistKey="custom-ai-agents-L3-sprint">
<RevealSection title="Step 1: Choose Your Stack (5 min)">
**Decision:**
- Orchestrator: n8n (self-hosted or cloud) vs. Zapier vs. Make
- LLM: Claude Sonnet vs. Haiku vs. GPT-4o
- Data sources: LinkedIn (manual/Evaboot), Crunchbase (free tier), SerpAPI (news)

**Action:** Sign up for accounts if needed. Get API keys.
</RevealSection>

<RevealSection title="Step 2: Set Up the Workflow (10 min)">
**Action:**
1. Create a new workflow in your orchestrator
2. Add trigger (webhook or CRM watch)
3. Add 3 HTTP Request nodes (LinkedIn, company, news) in parallel
4. Add Merge node
5. Test with 1 prospect — verify data returns correctly
</RevealSection>

<RevealSection title="Step 3: Build the Prompt (15 min)">
**Action:**
1. Copy the Research Agent System Prompt template (from earlier)
2. Fill in your ICP criteria (from Course 1)
3. Add your role description and constraints
4. Add AI Agent node (Claude or GPT)
5. Paste the full prompt
6. Set max tokens: 1000, temperature: 0.3
7. Test with 1 prospect — review the output
</RevealSection>

<RevealSection title="Step 4: Extract and Save (10 min)">
**Action:**
1. Modify prompt to output JSON (brief + structured fields)
2. Add Code node to parse JSON
3. Add CRM Update node
4. Map fields: `research_brief`, `icp_score`, `recommended_channel`, `outreach_angle`
5. Test with 1 prospect — verify CRM updates
</RevealSection>

<RevealSection title="Step 5: Add Notifications (5 min)">
**Action:**
1. Add IF node: `icp_score >= 8`
2. Add Slack/email notification for high-fit prospects
3. Test with a high-fit and low-fit prospect
4. Confirm notifications work correctly
</RevealSection>
</ProgressiveReveal>

---

## Quality Control: The 10% Spot-Check Rule

Your agent is live. But how do you know it's working well?

**The rule:** Spot-check 10% of briefs weekly. Look for:
1. **Hallucinations** (facts that aren't in the source data)
2. **Generic pain signals** (could apply to anyone)
3. **Wrong company details** (confused with similar name)
4. **Missing citations** (claims without source URLs)

<LinterFeedback
  title="Research Brief Linter"
  persistKey="custom-ai-agents-L3-linter"
  inputLabel="Paste a research brief from your agent"
  rules={[
    { 
      id: "citations", 
      label: "Source Citations", 
      description: "All factual claims include source URLs", 
      keywords: ["linkedin.com", "crunchbase.com", "techcrunch.com", "source:"], 
      antiKeywords: [] 
    },
    { 
      id: "specificity", 
      label: "Specific Pain Signals", 
      description: "Pain signals reference specific events, posts, or data points", 
      keywords: ["posted about", "hiring for", "launched", "announced"], 
      antiKeywords: ["needs to grow", "wants to scale", "looking to improve"] 
    },
    { 
      id: "icp_score", 
      label: "ICP Score Present", 
      description: "Brief includes an ICP score (1-10)", 
      keywords: ["ICP Score:", "/10"], 
      antiKeywords: [] 
    },
    { 
      id: "not_found", 
      label: "Honest Gaps", 
      description: "Uses 'Not found' when data is unavailable", 
      keywords: ["Not found", "Not available", "Unable to verify"], 
      antiKeywords: [] 
    }
  ]}
/>

**If you find issues:**
- **Hallucinations:** Strengthen the anti-hallucination instruction. Add: "Do not infer or assume. Only state facts you can cite."
- **Generic signals:** Add examples of good vs. bad pain signals to the prompt.
- **Wrong details:** Check your data source API responses. Is the company name exact match?

---

## Next Steps: From Research to Outreach

You now have a working Prospect Research Agent. Every new contact gets a 1-page brief in 2 minutes.

**What's next?**

In **Lesson 4**, you'll build **Agent 2: Email First-Draft Agent**. It will:
- Take the research brief as input
- Generate 3 personalized email variants (different hooks/angles)
- Run them through the Sales Linter (from Course 21)
- Save drafts to your CRM for human review

**The handoff:** Agent 1 (research) → Agent 2 (email draft) → You (review + send).

<InteractiveChecklist 
  title="Before Lesson 4: Action Items" 
  persistKey="custom-ai-agents-L3-actions" 
  items={[
    "Build your Prospect Research Agent workflow (45 min sprint above)",
    "Test with 5 real prospects from your CRM",
    "Spot-check all 5 briefs for hallucinations and specificity",
    "Calculate your weekly cost (use the calculator above)",
    "Save your best brief as a reference example",
    "Document any failures or edge cases you encounter"
  ]} 
/>

---

## Lesson 3 Quiz

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What's the primary purpose of the anti-hallucination instruction in your research prompt?",
      "options": [
        "To make the agent run faster",
        "To reduce costs by using fewer tokens",
        "To prevent the LLM from inventing facts when data is unavailable",
        "To improve the writing quality of the brief"
      ],
      "correctAnswer": 2,
      "explanation": "The anti-hallucination instruction ('If information is unavailable, write Not found rather than guessing') prevents the LLM from confidently making up facts. This reduces hallucination from 15% to 1-3%."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Why should you run data collection (LinkedIn, company, news) in parallel rather than sequentially?",
      "options": [
        "It's easier to debug",
        "It reduces total execution time",
        "It costs less",
        "It improves data quality"
      ],
      "correctAnswer": 1,
      "explanation": "Parallel execution means all 3 API calls happen at the same time, reducing total wait time from 6 seconds (2+2+2 sequential) to 2 seconds (all at once). This makes your agent 3x faster."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "At 50 prospects/week using Claude Sonnet ($0.015/brief), what's your approximate monthly LLM cost?",
      "options": [
        "$3-4",
        "$10-12",
        "$25-30",
        "$50-60"
      ],
      "correctAnswer": 0,
      "explanation": "50 prospects/week × $0.015/brief = $0.75/week. $0.75 × 4.3 weeks = ~$3.22/month. Even at high volume, LLM costs are negligible compared to time saved."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What's the recommended temperature setting for a research agent?",
      "options": [
        "0.0 (deterministic)",
        "0.3 (low creativity)",
        "0.7 (balanced)",
        "1.0 (high creativity)"
      ],
      "correctAnswer": 1,
      "explanation": "Temperature 0.3 is low enough to prioritize factual accuracy over creativity, but not so low that outputs become robotic. Research needs consistency and precision, not creative variation."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "What should you do if your agent consistently produces generic pain signals like 'needs to grow faster'?",
      "options": [
        "Switch to a more expensive LLM model",
        "Increase the temperature setting",
        "Add specific examples of good vs. bad pain signals to the prompt",
        "Reduce the max token limit"
      ],
      "correctAnswer": 2,
      "explanation": "Generic outputs are a prompt problem, not a model problem. Adding examples of specific pain signals (e.g., 'Posted about attribution challenges on LinkedIn') teaches the agent what good looks like."
    }
  ]
}