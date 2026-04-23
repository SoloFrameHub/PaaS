---
title: "Token Economics & Running Costs"
duration: "45 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 9
---

You've built 5 agents. They work. Your prospect research agent runs every time a new contact hits your CRM. Your email drafter spits out 3 variants per prospect. Your meeting prep agent fires 30 minutes before every call.

Then you check your OpenAI bill.

**$847.32.**

For one month.

You're processing 200 prospects a week. That's 800 research briefs, 2,400 email drafts, 40 meeting prep docs, plus CRM enrichment and post-call summaries. At $0.50-1.00 per research brief with GPT-4o, the math gets ugly fast.

This is the moment most solo founders realize: **AI agents aren't free to run.** And if you're not careful, they can cost more than the revenue they generate.

This lesson is about the economics nobody talks about in the "build an AI agent in 10 minutes" tutorials. We're going to calculate your true running costs, optimize your token spend, and design a cost structure that scales with revenue — not against it.

---

## The Token Economics Reality Check

<InsightCard icon="💸" title="The Hidden Cost">
Most solo founders underestimate AI running costs by 3-5x in their first month. A $200/month budget assumption becomes $600-1,000 when agents run at production volume.
</InsightCard>

Here's what actually drives costs:

**1. Input Token Volume** — Every time you call an LLM, you pay for the context you send. A prospect research agent might send:
- 500 tokens of prospect data (LinkedIn, company info)
- 800 tokens of instructions and templates
- 300 tokens of ICP criteria and examples
- **Total: ~1,600 input tokens per call**

**2. Output Token Volume** — You also pay for what the model generates:
- Research brief: ~800 tokens
- Email drafts (3 variants): ~900 tokens total
- Meeting prep doc: ~1,200 tokens
- **These add up fast**

**3. Model Choice** — The pricing spread is massive:

<FlipCard 
  front="GPT-4o vs Claude Haiku" 
  back="GPT-4o: $5/1M input, $15/1M output. Claude Haiku: $0.25/1M input, $1.25/1M output. That's a 20x difference for similar quality on structured tasks." 
/>

**4. Call Frequency** — How often do your agents run?
- Research agent: once per new contact
- Email drafter: 3-5 times per prospect (sequence)
- CRM enrichment: weekly refresh for active contacts
- Meeting prep: once per scheduled call

Let's calculate your real costs.

---

## Calculate Your Monthly Token Spend

<ScenarioSimulator
  title="AI Agent Cost Calculator"
  persistKey="custom-ai-agents-L9-cost-calc"
  levers={[
    { id: "newContacts", label: "New contacts per week", min: 10, max: 500, step: 10, defaultValue: 50 },
    { id: "emailsPerContact", label: "Email drafts per contact", min: 1, max: 10, step: 1, defaultValue: 5 },
    { id: "meetingsPerWeek", label: "Meetings per week", min: 1, max: 30, step: 1, defaultValue: 5 },
    { id: "model", label: "Primary model", options: [
      { value: "gpt4o", label: "GPT-4o", inputCost: 5, outputCost: 15 },
      { value: "gpt4omini", label: "GPT-4o-mini", inputCost: 0.15, outputCost: 0.6 },
      { value: "sonnet", label: "Claude Sonnet 4", inputCost: 3, outputCost: 15 },
      { value: "haiku", label: "Claude Haiku", inputCost: 0.25, outputCost: 1.25 }
    ], defaultValue: "gpt4o" }
  ]}
  outputs={[
    { 
      id: "researchCost", 
      label: "Research agent (monthly)", 
      formula: "(newContacts * 4) * (1600 * model.inputCost + 800 * model.outputCost) / 1000000", 
      unit: "$", 
      precision: 2 
    },
    { 
      id: "emailCost", 
      label: "Email drafter (monthly)", 
      formula: "(newContacts * 4 * emailsPerContact) * (1500 * model.inputCost + 300 * model.outputCost) / 1000000", 
      unit: "$", 
      precision: 2 
    },
    { 
      id: "meetingCost", 
      label: "Meeting prep (monthly)", 
      formula: "(meetingsPerWeek * 4) * (2000 * model.inputCost + 1200 * model.outputCost) / 1000000", 
      unit: "$", 
      precision: 2 
    },
    { 
      id: "totalCost", 
      label: "Total monthly cost", 
      formula: "researchCost + emailCost + meetingCost", 
      unit: "$", 
      precision: 2 
    }
  ]}
  insight="At {newContacts} contacts/week with `{model.label}`, you're spending ${totalCost}/month. If each contact converts at 2% to a $5K deal, you need {(totalCost / (newContacts * 4 * 0.02 * 5000) * 100).toFixed(1)}% of revenue on AI costs."
/>

<ExampleCard label="Real Numbers: Sarah's Agency">
Sarah runs a content agency. She processes 80 new contacts/week, sends 5-email sequences, and has 8 meetings/week.

**Initial setup (GPT-4o for everything):**
- Research: $64/month
- Email drafts: $240/month  
- Meeting prep: $19/month
- **Total: $323/month**

**After optimization (Haiku for research/email, Sonnet for meetings):**
- Research: $3.20/month
- Email drafts: $12/month
- Meeting prep: $14/month
- **Total: $29.20/month**

She saved $294/month (91%) by switching models for structured tasks.
</ExampleCard>

---

## The Model Selection Matrix

Not all tasks need GPT-4o. Here's how to match models to agent types:

<ClassifyExercise
  title="Which Model for Which Agent?"
  persistKey="custom-ai-agents-L9-model-match"
  categories={[
    { id: "haiku", label: "Claude Haiku ($)", color: "#10b981" },
    { id: "sonnet", label: "Claude Sonnet ($$)", color: "#f59e0b" },
    { id: "gpt4o", label: "GPT-4o ($$$)", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Prospect research brief (structured output, factual)", 
      correctCategory: "haiku",
      explanation: "Haiku handles structured data extraction perfectly at 1/20th the cost"
    },
    { 
      id: "2", 
      content: "Email first draft (needs voice, creativity)", 
      correctCategory: "sonnet",
      explanation: "Sonnet balances quality and cost for creative writing tasks"
    },
    { 
      id: "3", 
      content: "Meeting prep (complex reasoning, strategic)", 
      correctCategory: "sonnet",
      explanation: "Sonnet's reasoning is worth the extra cost for high-stakes prep"
    },
    { 
      id: "4", 
      content: "CRM field extraction (name, title, company)", 
      correctCategory: "haiku",
      explanation: "Pure data extraction — Haiku is perfect"
    },
    { 
      id: "5", 
      content: "Post-call summary with action items", 
      correctCategory: "sonnet",
      explanation: "Requires nuance and context — Sonnet justified"
    },
    { 
      id: "6", 
      content: "Email subject line A/B test generation", 
      correctCategory: "haiku",
      explanation: "Simple creative task — Haiku can handle it"
    }
  ]}
/>

### The Decision Framework

**Use Claude Haiku when:**
- Output is structured (JSON, markdown with clear sections)
- Task is factual extraction or classification
- You can validate output with simple rules
- Volume is high (100+ calls/day)

**Use Claude Sonnet when:**
- Output requires voice/tone matching
- Task involves reasoning or strategy
- Quality directly impacts revenue (emails, meeting prep)
- Volume is moderate (10-100 calls/day)

**Use GPT-4o when:**
- You need absolute best quality
- Task is complex multi-step reasoning
- Cost is negligible compared to deal value
- Volume is low (&lt;10 calls/day)

<InsightCard icon="🎯" title="The 80/20 Rule">
80% of your agent calls can use Haiku or mini models. Reserve Sonnet/GPT-4o for the 20% that directly touch prospects or require strategic thinking.
</InsightCard>

---

## Token Optimization Techniques

Beyond model selection, here are 6 ways to cut token costs without sacrificing quality:

### 1. Prompt Compression

**Before (1,847 tokens):**
```
You are a sales research assistant for a solo founder building a B2B SaaS product.
Your job is to analyze prospect data and generate a comprehensive research brief.

The prospect's information is as follows:
Name: John Smith
Title: VP of Marketing
Company: Acme Corp
LinkedIn: [full profile dump: 800 tokens]
Company data: [full Crunchbase dump: 600 tokens]

Please generate a research brief that includes:
1. An overview of the prospect including their role, tenure, and background
2. Company context including size, stage, funding, and recent news
3. Pain signals based on their role and company stage
4. Connection points like mutual connections or shared interests
5. A recommended outreach angle with specific messaging suggestions
```

**After (891 tokens):**
```
Generate prospect brief:

PROSPECT:
- John Smith, VP Marketing, Acme Corp
- LinkedIn: [key points only: 200 tokens]
- Company: [filtered data: 150 tokens]

OUTPUT (markdown):
1. Overview (role, tenure, background)
2. Company (size, stage, funding, news)
3. Pain signals (role + stage based)
4. Connections (mutual, shared)
5. Outreach angle (specific hook + CTA)
```

**Savings: 956 tokens (52%) per call**

<TemplateBuilder
  title="Compress Your Research Prompt"
  persistKey="custom-ai-agents-L9-compress"
  sections={[
    {
      id: "original",
      title: "Your Current Prompt",
      fields: [
        { 
          id: "prompt", 
          label: "Paste your full prompt", 
          placeholder: "You are a sales research assistant...", 
          type: "textarea",
          rows: 8
        }
      ]
    },
    {
      id: "compressed",
      title: "Compressed Version",
      fields: [
        { 
          id: "compressed", 
          label: "AI-suggested compression", 
          placeholder: "AI will suggest a compressed version...", 
          type: "textarea",
          rows: 8,
          aiSuggestion: true
        },
        {
          id: "savings",
          label: "Estimated token savings",
          placeholder: "~500 tokens (40%)",
          type: "text",
          readonly: true
        }
      ]
    }
  ]}
/>

### 2. Context Caching (Claude Only)

Claude's prompt caching lets you cache static context (templates, examples, ICP criteria) and reuse it across calls. You pay full price once, then 90% less for cached tokens.

**Example:**
- First call: 1,600 input tokens → $0.0048 (Sonnet)
- Subsequent calls: 200 new tokens + 1,400 cached → $0.0006 + $0.00042 = $0.00102
- **Savings: 79% per call after the first**

**What to cache:**
- Email templates (PAS, AIDA frameworks)
- ICP criteria and examples
- Voice guide and style rules
- Company background (for meeting prep)

<FlipCard 
  front="When Does Caching Pay Off?" 
  back="Break-even: ~10 calls with the same cached context. If you're running 50+ research briefs/day with the same ICP template, caching saves $50-100/month." 
/>

### 3. Batch Processing

Instead of calling the LLM once per prospect, batch 5-10 prospects into a single call.

**Single-call approach:**
- 50 prospects × 1,600 tokens input = 80,000 tokens
- 50 prospects × 800 tokens output = 40,000 tokens
- **Cost (Sonnet): $0.24 + $0.60 = $0.84**

**Batch approach:**
- 1 call × 8,000 tokens input (10 prospects + template) = 8,000 tokens
- 1 call × 8,000 tokens output (10 briefs) = 8,000 tokens
- 5 batches × ($0.024 + $0.12) = $0.72
- **Savings: 14%**

Plus: batching reduces API latency overhead.

### 4. Output Length Limits

Force the model to be concise with `max_tokens` and explicit length constraints.

**Before:**
```
Generate a prospect research brief.
```
→ Model outputs 1,200 tokens (verbose)

**After:**
```
Generate a prospect research brief. Maximum 600 tokens. Be concise.
```
→ Model outputs 650 tokens

**Savings: 550 tokens (46%) per call**

### 5. Structured Output (JSON Mode)

Use JSON mode or structured output to eliminate formatting tokens.

**Before (markdown):**
```
## Prospect Brief: John Smith

**Role:** VP of Marketing at Acme Corp
**Tenure:** 2.5 years
**Background:** Previously at...
```
→ ~800 tokens with formatting

**After (JSON):**
```json
{
  "name": "John Smith",
  "role": "VP of Marketing",
  "company": "Acme Corp",
  "tenure": "2.5 years",
  "background": "Previously at..."
}
```
→ ~600 tokens

**Savings: 200 tokens (25%) per call**

### 6. Lazy Loading Context

Don't send data the model doesn't need. Use conditional logic to include context only when relevant.

**Example: Email drafter**
- If `sequence_position == "first_touch"` → include full research brief
- If `sequence_position == "follow_up_2"` → include only pain signals + previous email
- If `sequence_position == "breakup"` → include only name + company

**Savings: 40-60% on follow-up emails**

<InteractiveChecklist 
  title="Token Optimization Checklist" 
  persistKey="custom-ai-agents-L9-optimize"
  items={[
    "Compress prompts: remove verbose instructions, use bullet points",
    "Enable prompt caching for static context (Claude)",
    "Batch similar requests into single API calls",
    "Set max_tokens limits on all outputs",
    "Use JSON mode for structured data extraction",
    "Lazy load context: only send what's needed per call",
    "Switch to Haiku/mini models for 80% of tasks",
    "Test output quality after each optimization"
  ]} 
/>

---

## Cost Monitoring & Alerts

You can't optimize what you don't measure. Set up cost tracking **before** you scale.

### 1. API Usage Dashboards

**OpenAI:**
- Dashboard: platform.openai.com/usage
- Shows: daily spend, tokens per model, requests per endpoint
- Alerts: set monthly budget limits ($50, $100, $200)

**Anthropic:**
- Dashboard: console.anthropic.com/settings/billing
- Shows: daily spend, cached vs non-cached tokens
- Alerts: email notifications at 50%, 80%, 100% of budget

**Best practice:** Check weekly, not monthly. Catch runaway costs early.

### 2. Per-Agent Cost Tracking

Tag each API call with metadata to track cost per agent:

```python
# Example: OpenAI with metadata
response = openai.chat.completions.create(
    model="gpt-4o-mini",
    messages=[...],
    metadata={
        "agent": "research",
        "contact_id": "12345",
        "cost_center": "acquisition"
    }
)

# Log to your analytics
log_cost(
    agent="research",
    input_tokens=response.usage.prompt_tokens,
    output_tokens=response.usage.completion_tokens,
    cost=calculate_cost(response.usage, model="gpt-4o-mini")
)
```

This lets you answer:
- Which agent is most expensive?
- What's the cost per converted customer?
- Are costs growing faster than revenue?

### 3. Cost-Per-Outcome Metrics

The only cost that matters is **cost per desired outcome**.

<ScenarioSimulator
  title="Cost-Per-Outcome Calculator"
  persistKey="custom-ai-agents-L9-cpo"
  levers={[
    { id: "monthlyCost", label: "Monthly AI cost", min: 10, max: 1000, step: 10, defaultValue: 100 },
    { id: "newContacts", label: "Contacts processed/month", min: 50, max: 2000, step: 50, defaultValue: 200 },
    { id: "replyRate", label: "Reply rate (%)", min: 1, max: 20, step: 1, defaultValue: 5 },
    { id: "meetingRate", label: "Reply → meeting (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
    { id: "closeRate", label: "Meeting → close (%)", min: 5, max: 30, step: 5, defaultValue: 15 },
    { id: "dealValue", label: "Average deal value", min: 500, max: 50000, step: 500, defaultValue: 5000 }
  ]}
  outputs={[
    { 
      id: "replies", 
      label: "Replies/month", 
      formula: "newContacts * (replyRate / 100)", 
      unit: "", 
      precision: 0 
    },
    { 
      id: "meetings", 
      label: "Meetings/month", 
      formula: "replies * (meetingRate / 100)", 
      unit: "", 
      precision: 0 
    },
    { 
      id: "deals", 
      label: "Deals closed/month", 
      formula: "meetings * (closeRate / 100)", 
      unit: "", 
      precision: 1 
    },
    { 
      id: "revenue", 
      label: "Revenue/month", 
      formula: "deals * dealValue", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "costPerDeal", 
      label: "AI cost per deal", 
      formula: "monthlyCost / deals", 
      unit: "$", 
      precision: 2 
    },
    { 
      id: "costAsPercent", 
      label: "AI cost as % of revenue", 
      formula: "(monthlyCost / revenue) * 100", 
      unit: "%", 
      precision: 2 
    }
  ]}
  insight="At ${monthlyCost}/month, you're spending ${costPerDeal} per deal ({costAsPercent}% of revenue). Industry benchmark: 2-5% of revenue on acquisition tools."
/>

**Healthy benchmarks:**
- Cost per reply: $0.50-2.00
- Cost per meeting: $5-20
- Cost per deal: 2-5% of deal value
- AI costs as % of revenue: &lt;5%

If your costs exceed these, optimize or raise prices.

---

## The Self-Hosted vs SaaS Economics

You have two paths for running agents at scale:

### Path 1: SaaS (Zapier/n8n Cloud/Make)

**Costs:**
- Orchestrator: $20-50/month (Zapier/Make) or $24/month (n8n cloud)
- LLM API: $50-300/month (depends on volume + model)
- Enrichment APIs: $0-100/month (Apollo free tier or paid)
- **Total: $70-450/month**

**Pros:**
- Zero infrastructure management
- Built-in monitoring and logs
- Easy to scale
- No DevOps skills required

**Cons:**
- Higher per-execution costs
- Limited customization
- Vendor lock-in
- Costs scale linearly with volume

### Path 2: Self-Hosted (VPS + Open Source)

**Costs:**
- VPS: $5-20/month (Railway, Render, DigitalOcean)
- LLM API: $50-300/month (same as SaaS)
- Enrichment APIs: $0-100/month (same as SaaS)
- **Total: $55-420/month**

**Pros:**
- Lower per-execution costs at scale
- Full control and customization
- No vendor lock-in
- Costs don't scale with volume (fixed VPS)

**Cons:**
- Requires DevOps skills (Docker, deployment, monitoring)
- You manage uptime and errors
- Initial setup time: 4-8 hours

<StrategyDuel
  title="SaaS vs Self-Hosted for AI Agents"
  persistKey="custom-ai-agents-L9-duel"
  scenario="You're running 200 contacts/week through 5 agents. Which architecture?"
  strategyA={{ 
    name: "SaaS (n8n Cloud + APIs)", 
    description: "Use n8n cloud ($24/mo) + LLM APIs. No infrastructure management.", 
    pros: [
      "Zero DevOps required",
      "Built-in monitoring",
      "Easy to start"
    ], 
    cons: [
      "Higher cost at scale",
      "Limited customization",
      "Vendor dependency"
    ] 
  }}
  strategyB={{ 
    name: "Self-Hosted (VPS + n8n)", 
    description: "Deploy n8n on Railway ($7/mo) + LLM APIs. Full control.", 
    pros: [
      "Lower cost at scale",
      "Full customization",
      "No vendor lock-in"
    ], 
    cons: [
      "Requires DevOps skills",
      "You manage uptime",
      "8-hour initial setup"
    ] 
  }}
  expertVerdict="SaaS for first 3 months or if non-technical. Self-hosted once you hit 500+ contacts/week or need custom logic. Break-even: ~1,000 agent executions/month."
/>

### Break-Even Analysis

**SaaS costs:**
- n8n cloud: $24/month (unlimited workflows)
- Per-execution cost: $0 (included)

**Self-hosted costs:**
- Railway VPS: $7/month
- Per-execution cost: $0 (you pay for compute, not executions)

**Break-even:** Immediate if you're technical. If you value your DevOps time at $50/hour and setup takes 8 hours, break-even is at month 24 ($400 setup cost / $17/month savings).

**Recommendation:** Start SaaS, migrate to self-hosted when you hit 1,000+ executions/month or need custom features.

---

## Cost Optimization Playbook

Here's your step-by-step plan to cut AI costs by 50-80% without sacrificing quality:

<SlideNavigation>
<Slide title="Week 1: Measure">

**Goal: Establish baseline costs**

1. Enable usage tracking on OpenAI/Anthropic dashboards
2. Tag all API calls with agent metadata
3. Run agents for 1 week at normal volume
4. Calculate:
   - Total spend
   - Cost per agent
   - Cost per outcome (reply, meeting, deal)
5. Identify the top 3 most expensive agents

**Deliverable:** Cost baseline spreadsheet

</Slide>

<Slide title="Week 2: Model Swap">

**Goal: Switch 80% of calls to cheaper models**

1. Identify agents doing structured tasks (research, enrichment, classification)
2. Test Haiku/GPT-4o-mini on 10 sample calls
3. Compare output quality (use Sales Linter)
4. If quality is acceptable (>90% as good), switch model
5. Monitor for 3 days, revert if issues

**Expected savings: 60-80%**

</Slide>

<Slide title="Week 3: Prompt Compression">

**Goal: Cut input tokens by 40%**

1. Export your top 3 most-used prompts
2. Remove verbose instructions
3. Use bullet points instead of paragraphs
4. Test compressed versions on 10 samples
5. Deploy if output quality holds

**Expected savings: 30-50% on input tokens**

</Slide>

<Slide title="Week 4: Caching + Batching">

**Goal: Optimize for volume**

1. Enable prompt caching for static context (Claude only)
2. Batch similar requests (5-10 per call)
3. Set max_tokens limits on all outputs
4. Use JSON mode for structured data

**Expected savings: 20-40% additional**

</Slide>

<Slide title="Week 5: Monitor + Iterate">

**Goal: Sustain optimizations**

1. Set up weekly cost review (15 min)
2. Set budget alerts at 80% of target
3. A/B test new optimizations (1 per week)
4. Document what works in your runbook

**Outcome: Predictable, optimized costs**

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Your Cost Optimization Sprint" 
  persistKey="custom-ai-agents-L9-sprint"
  items={[
    "Week 1: Set up cost tracking and establish baseline",
    "Week 2: Switch 80% of agents to Haiku/mini models",
    "Week 3: Compress prompts and cut input tokens by 40%",
    "Week 4: Enable caching and batching for high-volume agents",
    "Week 5: Set up monitoring and weekly review process",
    "Calculate new cost-per-outcome metrics",
    "Document optimizations in agent runbook"
  ]} 
/>

---

## Real-World Cost Structures

Let's look at 3 solo founder profiles and their optimized cost structures:

<ExampleCard label="Profile 1: Technical Founder (B2B SaaS)">

**Volume:**
- 150 new contacts/week
- 5-email sequences
- 6 meetings/week

**Agent Stack:**
- Research: Haiku
- Email drafts: Sonnet (first touch), Haiku (follow-ups)
- Meeting prep: Sonnet
- CRM enrichment: Haiku
- Post-call: Sonnet

**Monthly Costs:**
- LLM API: $42/month
- n8n cloud: $24/month
- Apollo (free tier): $0
- **Total: $66/month**

**Outcomes:**
- 30 replies/month
- 6 meetings/month
- 1.2 deals/month
- **Cost per deal: $55 (1.1% of $5K ACV)**

</ExampleCard>

<ExampleCard label="Profile 2: Coach/Consultant">

**Volume:**
- 80 new contacts/week
- 3-email sequences
- 10 meetings/week

**Agent Stack:**
- Research: Haiku
- Email drafts: Sonnet
- Meeting prep: Sonnet
- Post-call: Haiku

**Monthly Costs:**
- LLM API: $28/month
- Zapier: $20/month
- **Total: $48/month**

**Outcomes:**
- 16 replies/month
- 10 meetings/month
- 2 deals/month
- **Cost per deal: $24 (0.8% of $3K package)**

</ExampleCard>

<ExampleCard label="Profile 3: Content Creator (Course Sales)">

**Volume:**
- 200 new subscribers/week (from lead magnet)
- 5-email nurture sequence
- 4 sales calls/week

**Agent Stack:**
- Subscriber research: Haiku (batch mode)
- Email personalization: Haiku
- Call prep: Sonnet

**Monthly Costs:**
- LLM API: $18/month
- Make: $10/month
- **Total: $28/month**

**Outcomes:**
- 40 replies/month
- 4 calls/month
- 1.6 course sales/month
- **Cost per sale: $17.50 (1.75% of $997 course)**

</ExampleCard>

**Pattern:** Optimized solo founder AI costs run 0.8-2% of revenue. If you're above 5%, you're overpaying.

---

## The Cost Ceiling Strategy

Here's how to ensure AI costs never spiral out of control:

### 1. Set Hard Budget Limits

**OpenAI/Anthropic:** Set monthly budget caps in dashboard
- Soft limit: 80% of budget → email alert
- Hard limit: 100% of budget → API calls rejected

**Example:**
- Target: $100/month
- Soft limit: $80 (alert to Slack)
- Hard limit: $100 (stop all non-critical agents)

### 2. Tiered Agent Priority

Not all agents are equally critical. Assign priority levels:

**Tier 1 (Critical):** Always run, even if over budget
- Meeting prep (revenue-critical)
- Post-call summary (CRM hygiene)

**Tier 2 (Important):** Run unless 90% of budget used
- Prospect research
- Email first draft

**Tier 3 (Nice-to-have):** Pause if 80% of budget used
- CRM enrichment refresh
- LinkedIn post generation

**Implementation:**
```python
def should_run_agent(agent_tier, budget_used_percent):
    if agent_tier == 1:
        return True  # Always run
    elif agent_tier == 2:
        return budget_used_percent < 90
    elif agent_tier == 3:
        return budget_used_percent < 80
    return False
```

### 3. Cost-Per-Outcome Gates

Set maximum acceptable cost per outcome. If exceeded, pause and investigate.

**Example gates:**
- Cost per research brief: &lt;$0.05
- Cost per email draft: &lt;$0.02
- Cost per meeting prep: &lt;$0.15

**If exceeded:** Check for:
- Model drift (are you accidentally using GPT-4o instead of Haiku?)
- Prompt bloat (did someone add verbose instructions?)
- Volume spike (did you import a huge list?)

### 4. Weekly Cost Review Ritual

**Every Monday, 15 minutes:**
1. Check total spend vs budget (on track?)
2. Review cost per agent (any spikes?)
3. Check cost per outcome (still efficient?)
4. Identify 1 optimization to test this week

**Outcome:** Costs stay predictable and optimized.

<TimedChallenge
  title="Spot the Cost Problem"
  persistKey="custom-ai-agents-L9-timed"
  timeLimit={90}
  items={[
    { 
      id: "1", 
      prompt: "Your research agent cost jumped from $0.02 to $0.18 per brief. What's the likely cause?", 
      correctAnswer: "model-swap",
      options: ["Volume spike", "Model accidentally changed to GPT-4o", "Prompt got longer", "API pricing changed"],
      explanation: "18 cents is GPT-4o pricing. Check your model config — someone probably changed it."
    },
    { 
      id: "2", 
      prompt: "Your email drafter is using 2,400 input tokens per call (was 1,200). What happened?", 
      correctAnswer: "context-bloat",
      options: ["Model changed", "Context bloat (someone added examples)", "Batching broke", "Caching disabled"],
      explanation: "Doubled input tokens = someone added context (examples, templates, verbose instructions)."
    },
    { 
      id: "3", 
      prompt: "Your monthly bill is $400 but you budgeted $100. You process 200 contacts/week. What's wrong?", 
      correctAnswer: "no-optimization",
      options: ["Volume too high", "Using expensive models for everything", "API pricing changed", "Batching not enabled"],
      explanation: "200/week should cost $50-100 optimized. You're using GPT-4o for everything. Switch to Haiku."
    }
  ]}
/>

---

## Summary: Your Cost Optimization Checklist

You've learned how to calculate, monitor, and optimize AI agent running costs. Here's your action plan:

<InteractiveChecklist 
  title="Token Economics Mastery" 
  persistKey="custom-ai-agents-L9-summary"
  items={[
    "Calculate your baseline monthly cost using the simulator",
    "Switch 80% of agents to Haiku or GPT-4o-mini",
    "Compress your top 3 prompts (40% token reduction)",
    "Enable prompt caching for static context (Claude)",
    "Set up cost tracking with agent-level metadata",
    "Configure budget alerts at 80% and 100%",
    "Assign priority tiers to all agents",
    "Set cost-per-outcome gates (research, email, meeting)",
    "Schedule weekly 15-min cost review",
    "Document optimizations in your agent runbook",
    "Test one new optimization per week"
  ]} 
/>

**Next lesson:** We'll tackle security, PII handling, and compliance — how to run AI agents safely as a one-person operation without a legal team.

---

## Quiz: Token Economics

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "You're processing 200 prospects/week with a research agent. Each call uses 1,600 input tokens and 800 output tokens. Using Claude Sonnet 4 ($3/1M input, $15/1M output), what's your monthly cost?",
      "options": [
        "$3.84",
        "$14.40",
        "$38.40",
        "$144.00"
      ],
      "correctIndex": 1,
      "explanation": "200/week × 4 weeks = 800 calls. (800 × 1,600 × $3 + 800 × 800 × $15) / 1,000,000 = $14.40/month."
    },
    {
      "id": "q2",
      "question": "Which agent should use Claude Haiku instead of Sonnet?",
      "options": [
        "Meeting prep (requires strategic reasoning)",
        "Email first draft (needs voice matching)",
        "CRM enrichment (structured data extraction)",
        "Post-call summary (nuanced action items)"
      ],
      "correctIndex": 2,
      "explanation": "CRM enrichment is pure structured data extraction — perfect for Haiku at 1/12th the cost of Sonnet."
    },
    {
      "id": "q3",
      "question": "Your AI costs are $200/month and you close 4 deals/month at $5K each. What's your AI cost as % of revenue?",
      "options": [
        "1%",
        "4%",
        "10%",
        "20%"
      ],
      "correctIndex": 0,
      "explanation": "$200 / ($5,000 × 4) = $200 / $20,000 = 1%. Healthy benchmark is &lt;5%."
    },
    {
      "id": "q4",
      "question": "Prompt caching (Claude) saves 90% on cached tokens. You have a 1,400-token template used in 100 calls/day. What's the monthly savings vs no caching?",
      "options": [
        "$1.26",
        "$12.60",
        "$126.00",
        "$378.00"
      ],
      "correctIndex": 2,
      "explanation": "Without caching: 100 × 30 × 1,400 × $3/1M = $126. With caching: first call $0.0042, then 2,999 calls × $0.00042 = $1.26. Savings: $126 - $1.26 = ~$126/month."
    },
    {
      "id": "q5",
      "question": "When should you migrate from SaaS (n8n cloud) to self-hosted (VPS)?",
      "options": [
        "Immediately — always cheaper",
        "When you hit 1,000+ agent executions/month",
        "Never — SaaS is always better",
        "Only if you're a DevOps expert"
      ],
      "correctIndex": 1,
      "explanation": "Break-even is around 1,000 executions/month or when you need custom features. Below that, SaaS simplicity wins."
    }
  ]
}