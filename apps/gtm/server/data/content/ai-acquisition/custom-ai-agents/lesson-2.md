---
title: "Orchestrators: n8n, Trigger.dev, Zapier, Make"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 2
---

# The $5 vs $500 Decision

Sarah, a technical founder, spent three weeks building a custom Python script to automate prospect research. It worked beautifully — for exactly 12 prospects before breaking when LinkedIn changed their HTML structure.

Meanwhile, her non-technical co-founder set up the same workflow in Zapier in 45 minutes. It cost $20/month and never broke.

Who made the better choice?

**Neither.** Sarah should have used n8n (self-hosted, $5/month, visual builder, won't break). Her co-founder should have used Make (same visual interface, half the Zapier cost).

The orchestrator you choose determines whether your AI agents cost $5/month or $500/month, whether they take 2 hours or 2 weeks to build, and whether they run reliably or break every time an API changes.

This lesson is your decision framework.

---

## Why Orchestrators Are the Secret Weapon

Most solo founders think "AI agent" means writing code. It doesn't.

**An AI agent is:**
- A trigger (new CRM contact, incoming email, scheduled time)
- A workflow (API calls, LLM prompts, data transforms)
- An output (CRM update, email draft, Slack notification)

Orchestrators provide this **without writing code** (or with minimal code if you want control).

<InsightCard icon="🎯" title="The Real Problem">
You don't need a framework like LangChain for most sales agents. You need a reliable way to chain: trigger → enrich → AI → output. That's what orchestrators do.
</InsightCard>

<RangeSlider 
  label="How comfortable are you with visual workflow builders?" 
  min={1} 
  max={10} 
  lowLabel="Never used one" 
  highLabel="I live in them" 
  persistKey="custom-ai-agents-L2-workflow-comfort" 
/>

---

## The Four Orchestrators (And When to Use Each)

<SlideNavigation>
<Slide title="n8n: The Developer's Choice">

### n8n (Self-Hosted or Cloud)

**What it is:** Open-source workflow automation with 400+ integrations and built-in AI nodes.

**Pricing:**
- Self-hosted: **Free** (host on Railway/Render for $5-10/month)
- Cloud: **$24/month** (unlimited workflows)

**Best for:** Technical founders who want full control, unlimited workflows, and AI agent chains.

**Why it wins for solo founders:**
- Visual builder (no code required)
- AI/LLM nodes built-in (Claude, GPT-4, Gemini)
- Self-hosting = unlimited workflows for $5-10/month
- 400+ integrations (CRM, email, LinkedIn, enrichment APIs)
- Code nodes available when you need custom logic

**Example workflow:** New CRM contact → Apollo enrichment → Claude research brief → CRM update → Slack notification.

**Weakness:** Self-hosting requires basic DevOps knowledge (but Railway makes it 1-click).

<ExampleCard label="Real Cost Breakdown">
**Sarah's n8n Setup (Self-Hosted on Railway):**
- Railway hosting: $7/month
- Workflows: 5 active agents (research, email draft, enrichment, meeting prep, post-call)
- Monthly runs: ~1,000 (50 prospects/week × 4 agents each)
- Total cost: **$7/month** + API costs (Apollo free tier, Claude ~$15/month)

**Total: $22/month for unlimited agents.**
</ExampleCard>

</Slide>

<Slide title="Trigger.dev: The Code-First Option">

### Trigger.dev (Self-Hosted or Cloud)

**What it is:** Open-source background job framework for developers. TypeScript-native.

**Pricing:**
- Self-hosted: **Free**
- Cloud: **Free tier** (50K runs/month), then $20/month

**Best for:** Developers who want code-based agents with reliable execution, retries, and scheduling.

**Why it wins for developers:**
- Write agents in TypeScript (Next.js/Node.js native)
- Built-in retries, error handling, and observability
- Version control your agents (Git-based)
- No visual builder = full control

**Example workflow:**
```typescript
// Trigger.dev job: Prospect research agent
export const researchAgent = task({
  id: "prospect-research",
  run: async (payload: { contactId: string }) => {
    const contact = await crm.getContact(payload.contactId);
    const linkedin = await apollo.enrich(contact.email);
    const brief = await claude.generate({
      prompt: RESEARCH_PROMPT,
      context: { contact, linkedin }
    });
    await crm.updateContact(contact.id, { brief });
  }
});
```

**Weakness:** Less visual than n8n/Zapier. Requires TypeScript knowledge.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
If you're already building in Next.js or Node.js, Trigger.dev is your fastest path. Your agents live in your codebase, version-controlled and testable.
</ContextualNote>

</Slide>

<Slide title="Zapier: The Non-Technical Default">

### Zapier (Cloud Only)

**What it is:** The most popular no-code automation platform. 7,000+ integrations.

**Pricing:**
- Free: 5 Zaps (workflows)
- Starter: **$20/month** (750 tasks)
- Professional: **$49/month** (2,000 tasks)

**Best for:** Non-technical founders, simple 2-3 step workflows.

**Why it's popular:**
- Easiest to learn (30-minute onboarding)
- Largest integration library (7,000+ apps)
- AI actions available (ChatGPT, Claude)
- No technical knowledge required

**Example workflow:** New Typeform response → ChatGPT research → Google Sheets → Gmail draft.

**Weakness:** **Expensive at scale.** 750 tasks/month = ~37 prospects/week (if each prospect triggers 5 steps). You'll hit limits fast.

<InsightCard icon="💰" title="The Zapier Tax">
At 50 prospects/week with 5-step workflows, you need 1,000 tasks/month. That's $49/month on Professional. n8n self-hosted does unlimited for $7/month.
</InsightCard>

</Slide>

<Slide title="Make: The Visual Power User">

### Make (formerly Integromat) (Cloud Only)

**What it is:** Visual automation platform with more complexity than Zapier at lower cost.

**Pricing:**
- Free: 1,000 operations/month
- Core: **$10/month** (10,000 operations)
- Pro: **$18/month** (10,000 operations + advanced features)

**Best for:** Visual thinkers who need moderate complexity at lower cost than Zapier.

**Why it's the value pick:**
- 2-5x cheaper than Zapier for equivalent workflows
- More powerful (branching, error handling, data transforms)
- 1,500+ integrations
- Visual router for complex logic

**Example workflow:** New CRM contact → (if company size > 50) → Clearbit enrichment → (else) → Apollo enrichment → Claude brief → CRM update.

**Weakness:** Steeper learning curve than Zapier. Interface can feel overwhelming at first.

<ExampleCard label="Cost Comparison: Make vs Zapier">
**Scenario:** 50 prospects/week, 5-step workflow = 1,000 operations/month

- **Zapier Professional:** $49/month (2,000 tasks)
- **Make Core:** $10/month (10,000 operations)

**Savings: $39/month = $468/year**
</ExampleCard>

</Slide>
</SlideNavigation>

---

## The Orchestrator Selection Matrix

<ComparisonBuilder
  title="Choose Your Orchestrator"
  persistKey="custom-ai-agents-L2-orchestrator-choice"
  prompt="Based on your technical level and budget, which orchestrator fits best?"
  expertExample="Technical founder, $10/month budget, wants unlimited workflows → n8n self-hosted on Railway ($7/month)"
  criteria={[
    "Technical comfort level (1-10)",
    "Monthly budget for automation ($0-100)",
    "Workflow complexity (simple 2-step vs multi-branch)",
    "Need for code customization (yes/no)"
  ]}
/>

Here's the decision tree:

**Budget < $10/month:**
- Technical → **n8n self-hosted** (free + $5-10 hosting)
- Non-technical → **Make free tier** (1K ops) or **Zapier free** (5 Zaps)

**Budget $10-30/month:**
- Technical → **n8n cloud** ($24/month, unlimited)
- Non-technical → **Make Core** ($10/month, 10K ops)

**Budget $30-50/month:**
- Technical → **n8n cloud** or **Trigger.dev cloud**
- Non-technical → **Zapier Starter** ($20/month) or **Make Pro** ($18/month)

**Developer who wants code:**
- **Trigger.dev** (free tier, TypeScript-native)

<FlipCard 
  front="The Hidden Cost of 'Free'" 
  back="Zapier's free tier (5 Zaps) seems generous until you realize each agent needs 3-5 Zaps (trigger, enrichment, AI, output, notification). You'll hit the limit with 1-2 agents." 
/>

---

## Building Your First Agent Workflow (n8n Example)

Let's build the **Prospect Research Agent** from Lesson 3 in n8n. This workflow runs when a new contact is added to your CRM.

<TemplateBuilder
  title="n8n Workflow: Prospect Research Agent"
  persistKey="custom-ai-agents-L2-n8n-workflow"
  sections={[
    {
      id: "trigger",
      title: "1. Trigger",
      fields: [
        { id: "trigger-type", label: "Trigger Type", placeholder: "Webhook, CRM new contact, manual", type: "text" },
        { id: "trigger-source", label: "Data Source", placeholder: "e.g., HubSpot, Pipedrive, Airtable", type: "text" }
      ]
    },
    {
      id: "enrich",
      title: "2. Enrichment",
      fields: [
        { id: "enrich-api", label: "Enrichment API", placeholder: "e.g., Apollo, Clearbit, Hunter", type: "text" },
        { id: "enrich-fields", label: "Fields to Enrich", placeholder: "e.g., company size, LinkedIn URL, tech stack", type: "textarea" }
      ]
    },
    {
      id: "ai",
      title: "3. AI Research",
      fields: [
        { id: "ai-model", label: "LLM Model", placeholder: "e.g., Claude Sonnet 4, GPT-4o", type: "text" },
        { id: "ai-prompt", label: "Research Prompt Template", placeholder: "Paste your prompt from Lesson 3", type: "textarea" }
      ]
    },
    {
      id: "output",
      title: "4. Output",
      fields: [
        { id: "output-crm", label: "CRM Field to Update", placeholder: "e.g., 'Research Brief' custom field", type: "text" },
        { id: "output-notify", label: "Notification Channel", placeholder: "e.g., Slack, email, none", type: "text" }
      ]
    }
  ]}
/>

### The n8n Workflow (Visual Representation)

```
[Trigger: CRM Webhook]
  ↓
[HTTP Request: Apollo API]
  Input: contact.email
  Output: company_size, linkedin_url, tech_stack
  ↓
[HTTP Request: Google News API]
  Input: contact.company
  Output: recent_news (last 30 days)
  ↓
[AI Agent Node: Claude Sonnet 4]
  System Prompt: "You are a prospect research agent..."
  Input: {contact, apollo_data, news}
  Output: {research_brief, icp_score, recommended_angle}
  ↓
[IF Node: ICP Score >= 7]
  YES → [CRM Update: Add brief + tag "High Priority"]
         → [Slack Notification: "New high-fit prospect"]
  NO  → [CRM Update: Add brief + tag "Low Priority"]
  ↓
[End]
```

<InsightCard icon="🔧" title="The Power of Visual Workflows">
This 6-node workflow replaces 50+ lines of Python code. No error handling to write, no API retry logic, no logging infrastructure. n8n handles it all.
</InsightCard>

---

## Workflow Design Patterns (For All Orchestrators)

Every sales agent workflow follows one of these patterns:

### Pattern 1: Linear Pipeline
**Trigger → Enrich → AI → Output**

Use for: Research agents, email drafters, meeting prep.

Example: New contact → Apollo enrichment → Claude brief → CRM update.

### Pattern 2: Conditional Branch
**Trigger → Enrich → IF/ELSE → Different AI Paths → Output**

Use for: ICP scoring, lead routing, sequence selection.

Example: New contact → Apollo → IF company_size > 50 → Enterprise sequence, ELSE → SMB sequence.

### Pattern 3: Parallel Enrichment
**Trigger → [Apollo + Clearbit + News] in parallel → Merge → AI → Output**

Use for: Maximum data coverage, speed optimization.

Example: New contact → (Apollo, Clearbit, Google News run simultaneously) → Merge results → Claude brief.

### Pattern 4: Human-in-the-Loop
**Trigger → AI Draft → Slack Approval → IF Approved → Send, ELSE → Discard**

Use for: Email sending, LinkedIn outreach, anything requiring human judgment.

Example: Research complete → Claude email draft → Slack review → Approve/Edit → Send.

<ClassifyExercise
  title="Match the Agent to the Pattern"
  persistKey="custom-ai-agents-L2-pattern-match"
  categories={[
    { id: "linear", label: "Linear Pipeline", color: "#3b82f6" },
    { id: "conditional", label: "Conditional Branch", color: "#f59e0b" },
    { id: "parallel", label: "Parallel Enrichment", color: "#10b981" },
    { id: "hitl", label: "Human-in-the-Loop", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Prospect research agent (new contact → enrich → brief → CRM)", correctCategory: "linear" },
    { id: "2", content: "Email sender (draft → human review → approve → send)", correctCategory: "hitl" },
    { id: "3", content: "Lead router (new lead → score → IF high → sales, ELSE → nurture)", correctCategory: "conditional" },
    { id: "4", content: "Enrichment agent (contact → Apollo + Clearbit + LinkedIn → merge → CRM)", correctCategory: "parallel" }
  ]}
/>

---

## Cost Modeling: What Will Your Agents Actually Cost?

Let's model the **5 core agents** from this course running for a solo founder doing 50 prospects/week.

<ScenarioSimulator
  title="Agent Cost Calculator"
  persistKey="custom-ai-agents-L2-cost-simulator"
  levers={[
    { id: "prospects", label: "Prospects per week", min: 10, max: 200, step: 10, defaultValue: 50 },
    { id: "orchestrator", label: "Orchestrator choice", options: ["n8n self-hosted ($7)", "n8n cloud ($24)", "Make ($10)", "Zapier ($49)"], defaultValue: "n8n self-hosted ($7)" }
  ]}
  outputs={[
    { id: "monthly-runs", label: "Monthly workflow runs", formula: "prospects * 4 * 5", unit: "", precision: 0 },
    { id: "orchestrator-cost", label: "Orchestrator cost", formula: "orchestrator === 'n8n self-hosted ($7)' ? 7 : orchestrator === 'n8n cloud ($24)' ? 24 : orchestrator === 'Make ($10)' ? 10 : 49", unit: "$", precision: 0 },
    { id: "llm-cost", label: "LLM cost (Claude Sonnet)", formula: "(prospects * 4 * 5 * 0.02)", unit: "$", precision: 2 },
    { id: "total-cost", label: "Total monthly cost", formula: "orchestrator-cost + llm-cost", unit: "$", precision: 2 }
  ]}
  insight="At `{prospects}` prospects/week, your 5 agents cost **${total-cost}/month**. That's **${total-cost / (prospects * 4)}/prospect** — far cheaper than a VA or SDR."
/>

**Cost Breakdown (50 prospects/week, n8n self-hosted):**
- Orchestrator (n8n on Railway): **$7/month**
- LLM calls (Claude Sonnet, 5 agents × 50 prospects × 4 weeks): **~$20/month**
- Enrichment APIs (Apollo free tier): **$0/month**
- **Total: $27/month** for 200 prospects/month fully automated.

Compare to:
- VA doing manual research: **$400-800/month** (10-20 hours/week at $10-20/hour)
- SDR tool (Outreach, SalesLoft): **$100-150/month/seat**

<FlipCard 
  front="The 10x Cost Advantage" 
  back="AI agents cost $27/month. A VA costs $400-800/month. An SDR tool costs $100-150/month. Agents are 10-30x cheaper and run 24/7." 
/>

---

## Security & Compliance Considerations

Orchestrators handle sensitive data (emails, CRM records, API keys). Here's how to stay safe:

### 1. API Key Management
- **Never hardcode API keys** in workflows
- Use environment variables (n8n credentials vault, Zapier/Make secret storage)
- Rotate keys every 90 days
- Use separate keys for dev/prod

### 2. Data Retention
- **Don't log PII** in workflow execution logs
- Set retention limits (n8n: 30 days, Zapier: 14 days)
- GDPR compliance: delete prospect data on request

### 3. Access Control
- **Limit who can edit workflows** (solo founder = you only, but plan for future team)
- Use 2FA on orchestrator accounts
- Audit workflow changes monthly

### 4. Error Handling
- **Never expose API keys in error messages**
- Set up failure notifications (Slack, email)
- Build retry logic for transient failures (API rate limits, timeouts)

<LinterFeedback
  title="Workflow Security Linter"
  persistKey="custom-ai-agents-L2-security-linter"
  inputLabel="Paste your workflow description or screenshot URL"
  rules={[
    { id: "api-keys", label: "API Keys in Credentials Vault", description: "No hardcoded keys in workflow", keywords: ["credentials", "vault", "env var"], antiKeywords: ["sk-", "api_key ="] },
    { id: "pii-logging", label: "PII Logging Disabled", description: "Execution logs don't store emails/names", keywords: ["log disabled", "redacted"], antiKeywords: ["log all", "debug mode"] },
    { id: "error-handling", label: "Error Handling Present", description: "Workflow has retry logic and failure notifications", keywords: ["retry", "on error", "catch"], antiKeywords: [] }
  ]}
/>

---

## Common Orchestrator Mistakes (And How to Avoid Them)

### Mistake 1: Over-Engineering the First Workflow
**What founders do:** Build a 15-node workflow with parallel branches, error handling, and fallback logic on day 1.

**What to do instead:** Start with a 3-node linear workflow (trigger → AI → output). Add complexity only when needed.

### Mistake 2: Not Testing with Real Data
**What founders do:** Build the workflow with fake test data, deploy to production, then discover their CRM fields don't match.

**What to do instead:** Test with 5-10 real prospects in a staging CRM before going live.

### Mistake 3: Ignoring Rate Limits
**What founders do:** Run 200 prospects through Apollo enrichment in 5 minutes, hit rate limits, workflow breaks.

**What to do instead:** Add delays between API calls (n8n: "Wait" node, Zapier: "Delay" action). Batch process (10 prospects/hour instead of 200 at once).

### Mistake 4: No Human Review for High-Stakes Actions
**What founders do:** Auto-send AI-drafted emails without review. One hallucinated fact ruins credibility.

**What to do instead:** Use human-in-the-loop for email sending, LinkedIn outreach, and anything customer-facing.

<SwipeDecision
  title="Good Workflow or Bad Workflow?"
  description="Swipe right for well-designed workflows, left for risky ones"
  optionA="Risky"
  optionB="Well-Designed"
  persistKey="custom-ai-agents-L2-workflow-swipe"
  cards={[
    { id: "1", content: "Auto-send 50 AI-drafted cold emails without human review", correctOption: "a", explanation: "High risk of hallucinations or tone issues. Always review first batch." },
    { id: "2", content: "Auto-generate research briefs, save to CRM, notify in Slack for review", correctOption: "b", explanation: "Low-risk action (CRM update) + human notification for high-stakes follow-up." },
    { id: "3", content: "Run 200 Apollo enrichments in parallel with no rate limit handling", correctOption: "a", explanation: "Will hit rate limits and break. Add delays or batch processing." },
    { id: "4", content: "Linear workflow: New contact → Apollo → Claude brief → CRM update", correctOption: "b", explanation: "Simple, reliable, low-risk. Perfect first workflow." }
  ]}
/>

---

## Your First Workflow: Guided Build

Let's build the **Prospect Research Agent** in your chosen orchestrator.

<ProgressiveReveal title="Step-by-Step Workflow Build" persistKey="custom-ai-agents-L2-build-reveal">
<RevealSection title="Step 1: Choose Your Orchestrator">

Based on your earlier selection, pick your tool:
- **n8n self-hosted:** Sign up for Railway, deploy n8n (1-click template)
- **n8n cloud:** Sign up at n8n.io, start free trial
- **Trigger.dev:** Sign up at trigger.dev, create new project
- **Make:** Sign up at make.com, start free tier
- **Zapier:** Sign up at zapier.com, start free tier

**Action:** Create your account and log in.

</RevealSection>

<RevealSection title="Step 2: Set Up Your Trigger">

**For n8n/Make/Zapier:**
- Add a "Webhook" trigger (for CRM integrations) OR
- Add a "CRM New Contact" trigger (if your CRM is supported)

**For Trigger.dev:**
```typescript
export const researchAgent = task({
  id: "prospect-research",
  trigger: eventTrigger({
    name: "crm.contact.created"
  }),
  run: async (payload) => { /* ... */ }
});
```

**Action:** Configure your trigger to fire when a new contact is added to your CRM.

</RevealSection>

<RevealSection title="Step 3: Add Enrichment Step">

**For n8n/Make/Zapier:**
- Add an "HTTP Request" node/action
- Configure Apollo API call:
  - Method: POST
  - URL: `https://api.apollo.io/v1/people/match`
  - Headers: `Api-Key: YOUR_APOLLO_KEY`
  - Body: `{ "email": "{{trigger.email}}" }`

**For Trigger.dev:**
```typescript
const enrichment = await apollo.enrich({
  email: payload.contact.email
});
```

**Action:** Test the enrichment step with a real email address.

</RevealSection>

<RevealSection title="Step 4: Add AI Research Step">

**For n8n:**
- Add an "OpenAI" or "Anthropic" node
- Select model: Claude Sonnet 4
- Paste your research prompt from Lesson 3
- Map enrichment data into prompt variables

**For Make/Zapier:**
- Add "ChatGPT" or "Claude" action
- Configure prompt with enrichment data

**For Trigger.dev:**
```typescript
const brief = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  messages: [{
    role: "user",
    content: RESEARCH_PROMPT.replace("{data}", JSON.stringify(enrichment))
  }]
});
```

**Action:** Test the AI step with enrichment data from Step 3.

</RevealSection>

<RevealSection title="Step 5: Add CRM Update Step">

**For n8n/Make/Zapier:**
- Add your CRM action (HubSpot, Pipedrive, Airtable, etc.)
- Select "Update Contact"
- Map AI output to CRM field (e.g., "Research Brief" custom field)

**For Trigger.dev:**
```typescript
await crm.updateContact(payload.contact.id, {
  researchBrief: brief.content[0].text,
  icpScore: extractScore(brief.content[0].text)
});
```

**Action:** Test the full workflow end-to-end with a real contact.

</RevealSection>

<RevealSection title="Step 6: Add Notification (Optional)">

**For n8n/Make/Zapier:**
- Add a "Slack" or "Email" action
- Configure message: "New research brief for `{contact.name}`"

**For Trigger.dev:**
```typescript
await slack.postMessage({
  channel: "#sales",
  text: `New research brief for ${payload.contact.name}`
});
```

**Action:** Test the notification.

</RevealSection>
</ProgressiveReveal>

---

## Orchestrator Comparison: Side-by-Side

<StrategyDuel
  title="n8n Self-Hosted vs Zapier"
  persistKey="custom-ai-agents-L2-orchestrator-duel"
  scenario="You're a technical founder with 5 agents to build and a $50/month budget."
  strategyA={{ 
    name: "n8n Self-Hosted", 
    description: "Deploy n8n on Railway ($7/month), build all 5 agents visually", 
    pros: ["Unlimited workflows", "Full control", "Cheapest option ($7/month)", "AI nodes built-in"], 
    cons: ["Requires basic DevOps", "Self-managed updates", "No phone support"] 
  }}
  strategyB={{ 
    name: "Zapier Professional", 
    description: "Use Zapier for all 5 agents ($49/month for 2K tasks)", 
    pros: ["Easiest to learn", "Largest integration library", "Managed service"], 
    cons: ["Expensive ($49/month)", "Task limits (2K/month = ~50 prospects/week)", "Less powerful than n8n"] 
  }}
  expertVerdict="n8n self-hosted wins for technical founders. $7/month vs $49/month, unlimited workflows, and more powerful. Zapier is only better if you're non-technical and need hand-holding."
/>

---

## Summary: Your Orchestrator Decision

<InteractiveChecklist 
  title="Your Action Items" 
  persistKey="custom-ai-agents-L2-actions" 
  items={[
    "Choose your orchestrator based on technical level and budget (use the comparison matrix)",
    "Sign up for your chosen tool and create your first workflow (Prospect Research Agent)",
    "Test the workflow with 5 real prospects from your CRM",
    "Set up error notifications (Slack or email) for workflow failures",
    "Document your workflow (screenshot or export JSON) for future reference",
    "Calculate your monthly cost (orchestrator + LLM + APIs) using the cost simulator"
  ]} 
/>

---

## Quiz: Orchestrator Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "You're a non-technical founder with a $20/month budget. Which orchestrator should you choose?",
      "options": [
        "n8n self-hosted (requires DevOps knowledge)",
        "Trigger.dev (requires TypeScript)",
        "Make Core ($10/month, visual builder)",
        "Zapier Professional ($49/month)"
      ],
      "correctAnswer": 2,
      "explanation": "Make Core ($10/month) is the best fit: visual builder (no code), affordable, and more powerful than Zapier. n8n requires technical skills, Trigger.dev requires coding, and Zapier is too expensive."
    },
    {
      "id": "q2",
      "question": "What workflow pattern should you use for an agent that enriches contacts from multiple APIs (Apollo, Clearbit, LinkedIn) simultaneously?",
      "options": [
        "Linear Pipeline",
        "Conditional Branch",
        "Parallel Enrichment",
        "Human-in-the-Loop"
      ],
      "correctAnswer": 2,
      "explanation": "Parallel Enrichment runs multiple API calls simultaneously, then merges results. This is faster and maximizes data coverage compared to sequential (linear) enrichment."
    },
    {
      "id": "q3",
      "question": "You're building an email-sending agent. Which workflow pattern is essential?",
      "options": [
        "Linear Pipeline (trigger → AI → send)",
        "Parallel Enrichment (multiple data sources)",
        "Human-in-the-Loop (AI draft → human review → send)",
        "Conditional Branch (IF/ELSE logic)"
      ],
      "correctAnswer": 2,
      "explanation": "Human-in-the-Loop is critical for email sending. AI can hallucinate or make tone mistakes. Always review before sending customer-facing messages."
    },
    {
      "id": "q4",
      "question": "At 50 prospects/week with 5 agents, how many workflow runs per month?",
      "options": [
        "250 (50 × 5)",
        "1,000 (50 × 4 weeks × 5 agents)",
        "200 (50 × 4 weeks)",
        "500 (50 × 10)"
      ],
      "correctAnswer": 1,
      "explanation": "50 prospects/week × 4 weeks = 200 prospects/month. Each prospect triggers 5 agents = 200 × 5 = 1,000 runs/month."
    },
    {
      "id": "q5",
      "question": "What's the #1 security mistake solo founders make with orchestrators?",
      "options": [
        "Not using 2FA",
        "Hardcoding API keys in workflows",
        "Not setting up error notifications",
        "Using free tiers"
      ],
      "correctAnswer": 1,
      "explanation": "Hardcoding API keys in workflows is the most dangerous mistake. If someone gains access to your orchestrator, they have your keys. Always use credentials vaults or environment variables."
    }
  ]
}