---
title: "Reference Architecture: Self-Hosted vs SaaS"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 8
---

# Reference Architecture: Self-Hosted vs SaaS

## The $3,000 Question

You've built your first three agents. They work. Prospect research runs every morning. Email drafts queue up for review. Your CRM stays enriched.

Then you check your credit card statement.

**$287 this month.** Zapier Professional ($49). Make Pro ($18). Apollo credits ($50). Clearbit ($99). Claude API ($71).

You do the math: **$3,444 per year** to run agents that save you maybe 8 hours a week.

Is there a better way?

<InsightCard icon="💰" title="The Architecture Decision">
Most solo founders overpay for SaaS orchestrators when self-hosted options cost 80-90% less. But self-hosting isn't free — it costs technical complexity, maintenance time, and mental overhead.
</InsightCard>

This lesson maps the **complete cost and complexity landscape** of running AI sales agents. You'll build a decision framework, see real architectures from both paths, and calculate your true total cost of ownership.

By the end, you'll know exactly which architecture fits your technical level, budget, and risk tolerance.

---

## The Two Paths

Every AI agent system sits on one of two foundations:

### Path A: SaaS Stack
- **Orchestrator**: Zapier ($20-49/mo) or Make ($10-18/mo)
- **Enrichment**: Apollo/Clearbit APIs (pay-per-use or subscription)
- **LLM**: OpenAI/Anthropic API (pay-per-token)
- **Storage**: CRM (HubSpot/Pipedrive/Attio)
- **Monitoring**: Built into each SaaS tool

**Total monthly cost**: $200-400 for 50-200 prospects/week

### Path B: Self-Hosted Stack
- **Orchestrator**: n8n self-hosted on Railway/Render ($5-10/mo)
- **Enrichment**: Same APIs (Apollo free tier + scrapers)
- **LLM**: Same APIs (OpenAI/Anthropic)
- **Storage**: PostgreSQL on same VPS (included)
- **Monitoring**: Uptime Robot (free) + custom logs

**Total monthly cost**: $50-100 for 50-200 prospects/week

<FlipCard 
  front="Why the 4-5x price difference?" 
  back="SaaS tools charge for convenience, support, and UI. Self-hosted eliminates those margins but adds technical debt: you're the sysadmin, the debugger, and the upgrade manager." 
/>

<RangeSlider 
  label="How comfortable are you with command-line deployment and debugging?" 
  min={1} 
  max={10} 
  lowLabel="Never touched it" 
  highLabel="I deploy apps weekly" 
  persistKey="custom-ai-agents-L8-technical-comfort" 
/>

---

## Cost Breakdown: The Real Numbers

Let's price out both architectures for a **typical solo founder workload**:
- 50 new prospects/week (200/month)
- 5 active agents (research, email draft, enrichment, meeting prep, post-call)
- 10,000 LLM API calls/month (~$30-50 in tokens)

### SaaS Stack Pricing

<ScenarioSimulator
  title="SaaS Stack Cost Calculator"
  persistKey="custom-ai-agents-L8-saas-cost"
  levers={[
    { id: "prospects", label: "Prospects per month", min: 50, max: 500, step: 50, defaultValue: 200 },
    { id: "zapierTier", label: "Zapier tier (tasks/mo)", min: 750, max: 50000, step: 1000, defaultValue: 2000 },
    { id: "enrichmentAPI", label: "Enrichment API spend", min: 0, max: 200, step: 25, defaultValue: 50 }
  ]}
  outputs={[
    { id: "zapierCost", label: "Zapier", formula: "zapierTier <= 750 ? 20 : (zapierTier <= 2000 ? 49 : 69)", unit: "$", precision: 0 },
    { id: "llmCost", label: "LLM APIs (Claude/GPT)", formula: "(prospects * 0.15)", unit: "$", precision: 0 },
    { id: "enrichment", label: "Enrichment APIs", formula: "enrichmentAPI", unit: "$", precision: 0 },
    { id: "total", label: "Total Monthly", formula: "zapierCost + llmCost + enrichment", unit: "$", precision: 0 }
  ]}
  insight="At `{prospects}` prospects/month, you're spending ~$`{total}`/mo. Annual cost: ${total * 12}."
/>

**Typical SaaS monthly costs:**
- Zapier Professional (2K tasks): **$49**
- Make Pro (10K ops): **$18** (if using instead of Zapier)
- Apollo credits (200 emails): **$50**
- Clearbit Enrichment: **$99** (optional)
- LLM API (Claude Sonnet): **$30-50**
- CRM (HubSpot Starter): **$20** (or free tier)

**Total: $167-236/month** (without Clearbit) or **$266-335/month** (with Clearbit)

### Self-Hosted Stack Pricing

<ScenarioSimulator
  title="Self-Hosted Stack Cost Calculator"
  persistKey="custom-ai-agents-L8-selfhost-cost"
  levers={[
    { id: "prospects", label: "Prospects per month", min: 50, max: 500, step: 50, defaultValue: 200 },
    { id: "vpsSize", label: "VPS size (GB RAM)", min: 1, max: 4, step: 1, defaultValue: 2 },
    { id: "enrichmentAPI", label: "Enrichment API spend", min: 0, max: 200, step: 25, defaultValue: 25 }
  ]}
  outputs={[
    { id: "vpsCost", label: "VPS (Railway/Render)", formula: "vpsSize <= 1 ? 5 : (vpsSize <= 2 ? 7 : 10)", unit: "$", precision: 0 },
    { id: "llmCost", label: "LLM APIs", formula: "(prospects * 0.15)", unit: "$", precision: 0 },
    { id: "enrichment", label: "Enrichment APIs", formula: "enrichmentAPI", unit: "$", precision: 0 },
    { id: "total", label: "Total Monthly", formula: "vpsCost + llmCost + enrichment", unit: "$", precision: 0 }
  ]}
  insight="At `{prospects}` prospects/month on a {vpsSize}GB VPS, you're spending ~$`{total}`/mo. Annual cost: ${total * 12}. Savings vs SaaS: ~${(200 - total) * 12}/year."
/>

**Typical self-hosted monthly costs:**
- Railway/Render VPS (2GB): **$7**
- n8n (self-hosted, unlimited): **$0**
- Apollo free tier (10K/mo): **$0**
- LLM API (same as SaaS): **$30-50**
- PostgreSQL (on VPS): **$0**
- Domain + SSL (Cloudflare): **$1**

**Total: $38-58/month**

<InsightCard icon="📊" title="The 5-Year Math">
SaaS: $200/mo × 60 months = **$12,000**  
Self-hosted: $50/mo × 60 months = **$3,000**  
**Savings: $9,000** — enough to hire a VA for 180 hours or run paid ads for 3 months.
</InsightCard>

---

## The Hidden Costs

Price tags don't tell the whole story. Let's map the **non-monetary costs**:

### SaaS Hidden Costs

1. **Vendor Lock-In** — Your workflows live in Zapier's proprietary format. Migrating to n8n means rebuilding from scratch.
2. **Task/Op Limits** — Hit your Zapier task limit mid-month? Pay $20 overage or pause agents until next billing cycle.
3. **Integration Gaps** — Zapier has 7,000 integrations, but if your niche CRM isn't one, you're stuck with webhooks and custom code anyway.
4. **Price Creep** — Zapier raised prices 15% in 2024. Make raised 20% in 2025. Your $200/mo stack becomes $250/mo without warning.

### Self-Hosted Hidden Costs

1. **Setup Time** — Deploying n8n on Railway: 2-4 hours first time (following a guide). SaaS: 15 minutes.
2. **Maintenance** — n8n updates every 2-4 weeks. You need to click "Deploy" and test. 10-20 min/month.
3. **Debugging** — When a workflow breaks, SaaS has support chat. Self-hosted has GitHub issues and Discord. Expect 30-60 min/month troubleshooting.
4. **Mental Overhead** — You're responsible for uptime, backups, security patches. Some founders find this energizing. Others find it draining.
5. **Opportunity Cost** — 3-5 hours/month on DevOps = 3-5 fewer hours on sales. At $100/hour value, that's $300-500/month in lost productivity.

<ComparisonBuilder
  title="Your Hidden Cost Assessment"
  persistKey="custom-ai-agents-L8-hidden-costs"
  prompt="List your top 3 concerns about self-hosting (e.g., 'I'll break something and lose data')"
  expertExample="1. Uptime anxiety — what if Railway goes down during a campaign? 2. Security — am I exposing API keys? 3. Time sink — I'll spend weekends debugging instead of selling."
  criteria={[
    "Specific to your context (not generic)",
    "Quantifiable if possible (hours, dollars, stress level)",
    "Honest about your technical comfort zone"
  ]}
/>

---

## Reference Architecture A: SaaS Stack

Here's a **production-grade SaaS architecture** used by 100+ solo founders:

```
┌─────────────────────────────────────────────────────────────┐
│                      TRIGGER LAYER                          │
│  • Zapier: New CRM contact, calendar event, email received  │
│  • Make: Scheduled runs (daily enrichment, weekly cleanup)  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                      │
│  • Zapier workflows (5-15 steps per agent)                  │
│  • Make scenarios (parallel enrichment waterfalls)          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
│  • Apollo API (email + company enrichment)                  │
│  • Clearbit API (fallback enrichment)                       │
│  • Google Sheets (temp storage for review queues)           │
│  • CRM (HubSpot/Pipedrive) — source of truth                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       AI LAYER                              │
│  • OpenAI API (GPT-4o for drafts, GPT-4o-mini for scoring) │
│  • Anthropic API (Claude Sonnet for research)               │
│  • Zapier AI Actions (built-in LLM steps)                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      OUTPUT LAYER                           │
│  • CRM updates (research briefs, ICP scores, draft emails)  │
│  • Slack notifications (high-priority leads, errors)        │
│  • Email (meeting prep docs 30 min before calls)            │
└─────────────────────────────────────────────────────────────┘
```

### Example: Prospect Research Agent (SaaS)

**Zapier Workflow:**
1. **Trigger**: New contact added to HubSpot
2. **Apollo Enrichment**: Lookup email + company data
3. **Clearbit Enrichment** (if Apollo fails): Fallback company data
4. **Google News Search**: Fetch recent mentions (via SerpAPI)
5. **OpenAI GPT-4o**: Generate research brief (prompt includes all enriched data)
6. **HubSpot Update**: Save brief to contact notes + set ICP score field
7. **Filter**: If ICP score >= 8 → Slack notification
8. **End**

**Zapier task count**: 7-8 tasks per prospect (counts every step)

At 200 prospects/month: **1,400-1,600 tasks/month** → requires Professional plan ($49/mo for 2K tasks)

<ExampleCard label="Real Cost Example: Sarah's SaaS Stack">
Sarah runs 4 agents (research, email draft, enrichment, meeting prep) for 150 prospects/month.

**Monthly costs:**
- Zapier Professional: $49
- Apollo credits (150 emails): $37.50
- Claude API: $28
- HubSpot Starter: $20
- SerpAPI (news search): $50

**Total: $184.50/month**

She tried Make instead of Zapier and saved $31/mo (Make Pro at $18 vs Zapier at $49), bringing her total to **$153.50/month**.

After 6 months, she hit Zapier's 2K task limit twice and paid $40 in overages. Switched to Make permanently.
</ExampleCard>

### Pros of SaaS Stack

<InteractiveChecklist 
  title="SaaS Stack Advantages" 
  persistKey="custom-ai-agents-L8-saas-pros" 
  items={[
    "Zero DevOps — no servers, no deployments, no SSH",
    "Built-in monitoring — see every workflow run, retry failures with one click",
    "Fast setup — first agent running in 30-60 minutes",
    "Support channels — Zapier/Make have chat support and extensive docs",
    "Automatic updates — new integrations and features appear without action",
    "Compliance handled — SOC 2, GDPR covered by vendor"
  ]} 
/>

### Cons of SaaS Stack

<InteractiveChecklist 
  title="SaaS Stack Disadvantages" 
  persistKey="custom-ai-agents-L8-saas-cons" 
  items={[
    "4-5x more expensive at scale (200+ prospects/month)",
    "Task/op limits create artificial constraints on growth",
    "Vendor lock-in — workflows not portable between platforms",
    "Price increases — no control over future pricing",
    "Integration gaps — if your tool isn't supported, you're stuck",
    "Data residency — your prospect data lives on vendor servers"
  ]} 
/>

---

## Reference Architecture B: Self-Hosted Stack

Here's a **production-grade self-hosted architecture** used by technical founders:

```
┌─────────────────────────────────────────────────────────────┐
│                      TRIGGER LAYER                          │
│  • n8n Webhooks (CRM sends POST on new contact)             │
│  • n8n Cron (scheduled: 0 8 * * * for daily enrichment)     │
│  • n8n Email Trigger (IMAP monitor for replies)             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                      │
│  • n8n workflows (unlimited, self-hosted on Railway)        │
│  • PostgreSQL (workflow state, execution logs)              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
│  • Apollo API (free tier: 10K/mo)                           │
│  • Hunter.io (free tier: 25/mo, paid $49/mo for 500)        │
│  • PostgreSQL (contact cache, enrichment results)           │
│  • CRM API (HubSpot/Pipedrive/Attio via webhooks)           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       AI LAYER                              │
│  • OpenAI API (same as SaaS)                                │
│  • Anthropic API (same as SaaS)                             │
│  • n8n AI Agent node (built-in LangChain integration)       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      OUTPUT LAYER                           │
│  • CRM API updates (via n8n HTTP Request nodes)             │
│  • Slack webhook (notifications)                            │
│  • SMTP (send meeting prep emails via n8n Email node)       │
└─────────────────────────────────────────────────────────────┘
```

### Example: Prospect Research Agent (Self-Hosted)

**n8n Workflow:**
1. **Webhook Trigger**: HubSpot sends POST on new contact
2. **HTTP Request**: Apollo API lookup (email + company)
3. **IF Node**: If Apollo returned data → skip to step 5
4. **HTTP Request**: Hunter.io fallback (email only)
5. **HTTP Request**: SerpAPI for recent news (company name)
6. **AI Agent Node**: Claude Sonnet generates research brief
7. **HTTP Request**: POST to HubSpot API (update contact notes + ICP score)
8. **IF Node**: If ICP score >= 8 → Slack webhook notification
9. **PostgreSQL**: Log execution (timestamp, prospect ID, tokens used, cost)

**n8n execution count**: Unlimited (self-hosted)

At 200 prospects/month: **$0 orchestration cost** (only LLM + enrichment APIs)

<ExampleCard label="Real Cost Example: Marcus's Self-Hosted Stack">
Marcus (technical founder, comfortable with Docker) runs 5 agents for 200 prospects/month.

**One-time setup:**
- Railway account signup: 5 min
- n8n deployment (Railway template): 20 min
- PostgreSQL setup (included in Railway): 5 min
- Webhook configuration (HubSpot → n8n): 15 min
- First workflow build: 90 min

**Total setup time: ~2.5 hours**

**Monthly costs:**
- Railway VPS (2GB, n8n + PostgreSQL): $7
- Apollo free tier: $0 (under 10K/mo limit)
- Hunter.io (occasional fallback): $5 (pay-as-you-go)
- Claude API: $32
- Domain (n8n.yourdomain.com): $1

**Total: $45/month**

**Maintenance time:** 15-20 min/month (n8n updates, checking logs)

Marcus saves **$155/month** vs his previous Zapier setup. Over 12 months: **$1,860 saved**.

He uses the savings to run LinkedIn ads.
</ExampleCard>

### Pros of Self-Hosted Stack

<InteractiveChecklist 
  title="Self-Hosted Stack Advantages" 
  persistKey="custom-ai-agents-L8-selfhost-pros" 
  items={[
    "80-90% cheaper at scale (200+ prospects/month)",
    "No artificial limits — run unlimited workflows and executions",
    "Full data control — your prospect data stays on your infrastructure",
    "Portable — export workflows as JSON, migrate to any n8n instance",
    "Customizable — write custom nodes, integrate any API",
    "Future-proof — no vendor price increases or feature removals"
  ]} 
/>

### Cons of Self-Hosted Stack

<InteractiveChecklist 
  title="Self-Hosted Stack Disadvantages" 
  persistKey="custom-ai-agents-L8-selfhost-cons" 
  items={[
    "Requires technical comfort (command line, environment variables, debugging)",
    "Setup time: 2-4 hours vs 15 minutes for SaaS",
    "Maintenance burden: 15-30 min/month for updates and monitoring",
    "No official support — rely on community (Discord, GitHub issues)",
    "Uptime responsibility — if Railway goes down, your agents stop",
    "Security responsibility — you manage API keys, database backups, SSL"
  ]} 
/>

---

## The Decision Framework

Use this **5-factor framework** to choose your architecture:

<StrategyDuel
  title="SaaS vs Self-Hosted: Which Fits You?"
  persistKey="custom-ai-agents-L8-architecture-duel"
  scenario="You're ready to deploy your first 3 agents (research, email draft, enrichment) for 150-200 prospects/month."
  strategyA={{
    name: "SaaS Stack (Zapier/Make)",
    description: "Pay $150-200/mo for zero DevOps and instant setup",
    pros: [
      "Running in 30 minutes",
      "No technical knowledge required",
      "Built-in monitoring and support",
      "Automatic updates and new integrations"
    ],
    cons: [
      "$1,800-2,400/year ongoing cost",
      "Task limits constrain growth",
      "Vendor lock-in (hard to migrate)",
      "No control over future pricing"
    ]
  }}
  strategyB={{
    name: "Self-Hosted Stack (n8n on Railway)",
    description: "Pay $40-60/mo but invest 3-5 hours in setup and maintenance",
    pros: [
      "$480-720/year ongoing cost (save $1,320-1,680/year)",
      "Unlimited workflows and executions",
      "Full data control and portability",
      "No vendor price increases"
    ],
    cons: [
      "2-4 hour initial setup",
      "15-30 min/month maintenance",
      "Requires basic DevOps comfort",
      "Community support only (no chat)"
    ]
  }}
  expertVerdict="If you're non-technical or value time over money: SaaS. If you're technical or running >150 prospects/month: self-hosted saves $1,500+/year with minimal overhead."
/>

### Factor 1: Technical Comfort

<RangeSlider 
  label="Rate your technical comfort level" 
  min={1} 
  max={10} 
  lowLabel="I avoid the terminal" 
  highLabel="I deploy apps regularly" 
  persistKey="custom-ai-agents-L8-technical-level" 
/>

**Decision rule:**
- **1-4**: Start with SaaS (Zapier or Make). Revisit self-hosted in 6-12 months if costs become painful.
- **5-7**: Try self-hosted with a guide (Railway + n8n template). Budget 4 hours for setup. Fall back to SaaS if stuck.
- **8-10**: Self-hosted is a no-brainer. You'll have it running in 90 minutes and save $1,500+/year.

### Factor 2: Budget Sensitivity

<RangeSlider 
  label="How budget-sensitive are you?" 
  min={1} 
  max={10} 
  lowLabel="I'll pay for convenience" 
  highLabel="Every $50/mo matters" 
  persistKey="custom-ai-agents-L8-budget-sensitivity" 
/>

**Decision rule:**
- **1-4**: SaaS. Your time is worth more than the $150/mo savings.
- **5-7**: Calculate your break-even. If you value your time at $100/hr, self-hosted saves $1,500/year but costs 5 hours/year maintenance = $500 opportunity cost. Net savings: $1,000/year. Worth it?
- **8-10**: Self-hosted. The $1,500+/year savings funds other growth initiatives (ads, tools, VA).

### Factor 3: Scale Trajectory

<RangeSlider 
  label="How many prospects will you process in 6 months?" 
  min={50} 
  max={1000} 
  lowLabel="50-100/month" 
  highLabel="500-1000/month" 
  persistKey="custom-ai-agents-L8-scale-trajectory" 
/>

**Decision rule:**
- **50-150/month**: SaaS is fine. Zapier Starter ($20/mo) or Make Core ($10/mo) handles this volume.
- **150-300/month**: SaaS starts getting expensive (Zapier Professional at $49/mo). Self-hosted saves $30-40/mo.
- **300+/month**: Self-hosted is essential. Zapier Team ($69-99/mo) vs n8n ($7/mo VPS) = $62-92/mo savings.

### Factor 4: Data Sensitivity

<RangeSlider 
  label="How sensitive is your prospect data?" 
  min={1} 
  max={10} 
  lowLabel="Public info only" 
  highLabel="Highly confidential" 
  persistKey="custom-ai-agents-L8-data-sensitivity" 
/>

**Decision rule:**
- **1-5**: SaaS is fine. Zapier/Make are SOC 2 compliant.
- **6-8**: Check SaaS vendor's data residency and subprocessor policies. If you're in EU and need GDPR compliance, verify data stays in EU.
- **9-10**: Self-hosted. Full control over data location, encryption, and access logs.

### Factor 5: Maintenance Tolerance

<RangeSlider 
  label="How much monthly maintenance can you tolerate?" 
  min={0} 
  max={60} 
  lowLabel="Zero minutes" 
  highLabel="60+ minutes" 
  persistKey="custom-ai-agents-L8-maintenance-tolerance" 
/>

**Decision rule:**
- **0-15 min/month**: SaaS. You want zero DevOps overhead.
- **15-30 min/month**: Self-hosted is viable. n8n updates take 10-15 min/month. Log checks add 5-10 min.
- **30+ min/month**: Self-hosted is easy. You can even add custom monitoring, backups, and advanced workflows.

---

## Hybrid Architecture: The Best of Both

Some solo founders run a **hybrid stack**:

- **SaaS for prototyping**: Build and test new agents in Zapier (fast iteration, easy debugging)
- **Self-hosted for production**: Once an agent is stable, migrate it to n8n (lower cost, unlimited runs)

**Example workflow:**
1. Build "Prospect Research Agent" in Zapier (2 hours)
2. Test with 20 prospects, refine prompt and logic (1 week)
3. Export workflow logic, rebuild in n8n (1 hour)
4. Run in production on n8n (unlimited, $0 orchestration cost)

This approach **minimizes risk** (test in SaaS) while **maximizing savings** (run in self-hosted).

<InsightCard icon="🔄" title="The Migration Path">
Most technical founders start SaaS, hit the cost wall at 200-300 prospects/month, then migrate to self-hosted. The migration takes 3-6 hours (rebuilding 3-5 workflows in n8n) and pays for itself in 1-2 months of savings.
</InsightCard>

---

## Security and Compliance Considerations

Both architectures require **security hygiene**:

### API Key Management

**SaaS:**
- Zapier/Make store API keys encrypted at rest
- Access controlled via account login (2FA recommended)
- Risk: If your Zapier account is compromised, attacker has all your API keys

**Self-hosted:**
- n8n stores credentials encrypted in PostgreSQL
- Environment variables for sensitive keys (Railway secrets)
- Risk: If your VPS is compromised, attacker has database access

**Best practice (both):**
- Use separate API keys for each service (don't reuse)
- Rotate keys every 90 days
- Enable IP whitelisting where available (Apollo, CRM APIs)
- Monitor API usage for anomalies

### Data Retention

**SaaS:**
- Zapier retains execution logs for 7-30 days (depending on plan)
- Make retains logs for 30 days
- Prospect data passes through vendor servers (encrypted in transit)

**Self-hosted:**
- You control retention (PostgreSQL logs can be kept indefinitely or purged)
- Prospect data stays on your VPS (never touches vendor servers except LLM APIs)

**Best practice (both):**
- Delete prospect data from logs after 90 days (GDPR compliance)
- Anonymize logs (remove emails, names) before long-term storage
- Document data flows for GDPR/CCPA requests

### Compliance Checklist

<InteractiveChecklist 
  title="Security & Compliance Checklist (Both Architectures)" 
  persistKey="custom-ai-agents-L8-compliance" 
  items={[
    "API keys stored encrypted (not in plaintext code)",
    "2FA enabled on all accounts (Zapier, Make, Railway, CRM)",
    "IP whitelisting enabled where possible",
    "Execution logs purged after 90 days",
    "Data processing agreement (DPA) signed with LLM provider (OpenAI/Anthropic)",
    "Prospect consent documented (opt-in for email outreach)",
    "Backup strategy in place (CRM exports weekly, n8n workflow JSON exports monthly)",
    "Incident response plan (what to do if API keys leak)"
  ]} 
/>

---

## Migration Guide: SaaS → Self-Hosted

If you're currently on SaaS and want to migrate, here's the **step-by-step path**:

### Phase 1: Preparation (Week 1)

<InteractiveChecklist 
  title="Migration Prep Checklist" 
  persistKey="custom-ai-agents-L8-migration-prep" 
  items={[
    "Export all Zapier/Make workflows as documentation (screenshots + descriptions)",
    "List all API integrations and confirm they have REST APIs (for n8n HTTP nodes)",
    "Sign up for Railway (free tier to start)",
    "Deploy n8n using Railway template (1-click deploy)",
    "Configure custom domain (n8n.yourdomain.com) and SSL"
  ]} 
/>

### Phase 2: Rebuild (Week 2)

<InteractiveChecklist 
  title="Workflow Rebuild Checklist" 
  persistKey="custom-ai-agents-L8-migration-rebuild" 
  items={[
    "Rebuild Agent 1 (Prospect Research) in n8n, test with 5 prospects",
    "Rebuild Agent 2 (Email Draft) in n8n, test with 5 prospects",
    "Rebuild Agent 3 (CRM Enrichment) in n8n, test with 10 contacts",
    "Configure PostgreSQL logging (execution history, token usage)",
    "Set up Slack webhook for error notifications"
  ]} 
/>

### Phase 3: Parallel Run (Week 3)

<InteractiveChecklist 
  title="Parallel Run Checklist" 
  persistKey="custom-ai-agents-L8-migration-parallel" 
  items={[
    "Run both SaaS and self-hosted agents on same prospects (compare outputs)",
    "Verify n8n outputs match Zapier outputs (briefs, drafts, enrichment)",
    "Monitor n8n execution logs for errors (fix any failures)",
    "Measure n8n performance (execution time, reliability)",
    "Calculate actual cost savings (VPS + APIs vs SaaS)"
  ]} 
/>

### Phase 4: Cutover (Week 4)

<InteractiveChecklist 
  title="Cutover Checklist" 
  persistKey="custom-ai-agents-L8-migration-cutover" 
  items={[
    "Disable Zapier/Make workflows (pause, don't delete yet)",
    "Route all CRM webhooks to n8n",
    "Monitor n8n for 48 hours (ensure no missed triggers)",
    "Delete Zapier/Make workflows (after 7-day safety window)",
    "Downgrade Zapier/Make plan (or cancel)"
  ]} 
/>

**Total migration time**: 10-15 hours over 4 weeks (2-4 hours/week)

**Payback period**: 1-2 months of cost savings

---

## Your Architecture Decision

Let's synthesize your inputs into a **personalized recommendation**:

<TemplateBuilder
  title="Your Architecture Decision Framework"
  persistKey="custom-ai-agents-L8-decision"
  sections={[
    {
      id: "context",
      title: "Your Context",
      fields: [
        { id: "technical", label: "Technical comfort (1-10)", placeholder: "From earlier slider", type: "number" },
        { id: "budget", label: "Budget sensitivity (1-10)", placeholder: "From earlier slider", type: "number" },
        { id: "scale", label: "Prospects/month (current + 6-month projection)", placeholder: "e.g., 150 now, 300 in 6 months", type: "text" },
        { id: "time", label: "Maintenance tolerance (min/month)", placeholder: "e.g., 20 minutes", type: "number" }
      ]
    },
    {
      id: "decision",
      title: "Your Decision",
      fields: [
        { id: "architecture", label: "Chosen architecture", placeholder: "SaaS / Self-hosted / Hybrid", type: "text" },
        { id: "rationale", label: "Why this choice fits your context", placeholder: "e.g., I'm technical (8/10) and budget-sensitive (9/10), so self-hosted saves $1,500/year with minimal overhead", type: "textarea" },
        { id: "timeline", label: "Implementation timeline", placeholder: "e.g., Week 1: Deploy n8n. Week 2: Rebuild agents. Week 3: Test. Week 4: Cutover.", type: "textarea" }
      ]
    },
    {
      id: "risks",
      title: "Risk Mitigation",
      fields: [
        { id: "risk1", label: "Top risk", placeholder: "e.g., I break something during migration", type: "text" },
        { id: "mitigation1", label: "Mitigation plan", placeholder: "e.g., Run parallel for 2 weeks, keep Zapier as backup", type: "text" },
        { id: "risk2", label: "Second risk", placeholder: "e.g., n8n goes down and I miss leads", type: "text" },
        { id: "mitigation2", label: "Mitigation plan", placeholder: "e.g., Set up Uptime Robot alerts, have CRM webhook fallback", type: "text" }
      ]
    }
  ]}
/>

---

## Real-World Architecture Examples

Let's see how **3 different founder types** chose their architectures:

<SlideNavigation>
<Slide title="Technical Founder: Self-Hosted">

**Profile**: Marcus, SaaS founder, technical background (ex-engineer)

**Context**:
- 250 prospects/month
- Technical comfort: 9/10
- Budget sensitivity: 8/10 (bootstrapped)
- Maintenance tolerance: 30 min/month

**Architecture**: Self-hosted (n8n on Railway)

**Stack**:
- n8n (self-hosted): $7/mo
- PostgreSQL (on Railway): included
- Apollo free tier: $0
- Claude API: $35/mo
- **Total: $42/mo**

**Previous SaaS cost**: $220/mo (Zapier Pro + Apollo credits)

**Annual savings**: $2,136

**Setup time**: 3 hours (Railway deploy + 3 workflows)

**Maintenance**: 20 min/month (n8n updates, log checks)

**Marcus's take**: "I spent one Saturday afternoon setting this up and now save $2K/year. That's 40 hours of VA time or 2 months of LinkedIn ads. No-brainer."

</Slide>

<Slide title="Non-Technical Founder: SaaS">

**Profile**: Lisa, coaching business, non-technical

**Context**:
- 100 prospects/month
- Technical comfort: 3/10
- Budget sensitivity: 5/10 (profitable, values time)
- Maintenance tolerance: 0 min/month

**Architecture**: SaaS (Make)

**Stack**:
- Make Pro: $18/mo
- Apollo credits: $25/mo
- Claude API: $18/mo
- **Total: $61/mo**

**Why not self-hosted?**: "I tried following a Railway guide and got stuck on environment variables. Wasted 2 hours. Make took 30 minutes and just works."

**Lisa's take**: "I'd rather spend those 2 hours on sales calls. The $40/mo savings isn't worth the stress."

</Slide>

<Slide title="Hybrid Founder: Best of Both">

**Profile**: David, content creator turned SaaS founder, moderate technical skills

**Context**:
- 180 prospects/month
- Technical comfort: 6/10
- Budget sensitivity: 7/10
- Maintenance tolerance: 15 min/month

**Architecture**: Hybrid (Zapier for prototyping, n8n for production)

**Stack**:
- Zapier Starter (for testing new agents): $20/mo
- n8n on Railway (for stable agents): $7/mo
- Apollo free tier: $0
- Claude API: $28/mo
- **Total: $55/mo**

**Workflow**:
1. Build new agent in Zapier (fast iteration)
2. Test for 1-2 weeks
3. Migrate to n8n once stable
4. Keep Zapier for ad-hoc experiments

**David's take**: "I get the speed of SaaS for testing and the cost savings of self-hosted for production. Best of both worlds."

</Slide>
</SlideNavigation>

---

## Action Items: Choose Your Path

<InteractiveChecklist 
  title="Your Next Steps" 
  persistKey="custom-ai-agents-L8-actions" 
  items={[
    "Complete the Architecture Decision Framework (above) — document your choice",
    "If SaaS: Sign up for Make or Zapier, deploy your first agent by end of week",
    "If Self-hosted: Sign up for Railway, deploy n8n using 1-click template (30 min)",
    "If Hybrid: Sign up for both, build first agent in SaaS, plan migration timeline",
    "Calculate your 12-month cost projection (use the calculators above)",
    "Set a calendar reminder to review architecture in 6 months (reassess as you scale)",
    "Join the n8n Discord or Zapier community (get help when stuck)"
  ]} 
/>

---

## Quiz: Architecture Mastery

```json
{
  "questions": [
    {
      "id": "cost-comparison",
      "type": "multiple-choice",
      "question": "You're processing 250 prospects/month with 5 active agents. What's the approximate monthly cost difference between SaaS (Zapier Pro) and self-hosted (n8n on Railway)?",
      "options": [
        "SaaS is $50-75/mo cheaper",
        "Self-hosted is $50-75/mo cheaper",
        "Self-hosted is $150-200/mo cheaper",
        "They cost about the same"
      ],
      "correctAnswer": 2,
      "explanation": "SaaS (Zapier Pro + APIs) runs ~$200-250/mo. Self-hosted (Railway + APIs) runs ~$50-60/mo. Savings: $150-190/mo."
    },
    {
      "id": "technical-threshold",
      "type": "multiple-choice",
      "question": "What's the minimum technical comfort level (1-10) where self-hosted becomes viable?",
      "options": [
        "1-2 (anyone can do it)",
        "3-4 (basic computer skills)",
        "5-6 (comfortable with guides and troubleshooting)",
        "8-10 (only experienced developers)"
      ],
      "correctAnswer": 2,
      "explanation": "With good guides (Railway 1-click deploy), comfort level 5-6 is sufficient. You need to follow instructions, paste environment variables, and debug basic errors."
    },
    {
      "id": "migration-time",
      "type": "multiple-choice",
      "question": "How long does a typical SaaS → self-hosted migration take for 3-5 agents?",
      "options": [
        "2-4 hours (one session)",
        "10-15 hours (over 2-4 weeks)",
        "40+ hours (full-time for a week)",
        "It's not possible to migrate"
      ],
      "correctAnswer": 1,
      "explanation": "Rebuilding 3-5 workflows in n8n takes 10-15 hours spread over 2-4 weeks (prep, rebuild, test, cutover). Payback in 1-2 months of savings."
    },
    {
      "id": "hybrid-use-case",
      "type": "multiple-choice",
      "question": "When does a hybrid architecture (SaaS + self-hosted) make the most sense?",
      "options": [
        "Never — pick one and stick with it",
        "When you want to prototype fast in SaaS, then migrate stable agents to self-hosted",
        "When you're non-technical and need a backup",
        "When you have unlimited budget"
      ],
      "correctAnswer": 1,
      "explanation": "Hybrid works well for iterative founders: build and test in SaaS (fast), migrate to self-hosted once stable (cheap). Combines speed and savings."
    },
    {
      "id": "data-control",
      "type": "true-false",
      "question": "True or False: With self-hosted n8n, your prospect data never leaves your infrastructure (except when calling LLM APIs).",
      "correctAnswer": true,
      "explanation": "True. Self-hosted n8n runs on your VPS. Data only leaves when you call external APIs (LLMs, enrichment). SaaS passes data through vendor servers."
    },
    {
      "id": "maintenance-reality",
      "type": "multiple-choice",
      "question": "What's the realistic monthly maintenance time for self-hosted n8n?",
      "options": [
        "0 minutes (set and forget)",
        "5-10 minutes (quick log checks)",
        "15-30 minutes (updates + monitoring)",
        "2+ hours (constant troubleshooting)"
      ],
      "correctAnswer": 2,
      "explanation": "Realistic: 15-30 min/month. n8n updates take 10-15 min. Log checks and monitoring add 5-10 min. Troubleshooting is rare if workflows are stable."
    }
  ]
}
```

---

**Next Lesson Preview**: In Lesson 9, you'll build **Agent 4: Meeting Prep Agent** — the system that generates a 1-page prep doc 30 minutes before every sales call, pulling fresh data and talking points so you never walk into a meeting cold.