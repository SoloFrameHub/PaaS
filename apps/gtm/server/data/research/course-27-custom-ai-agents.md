# Course 27: Building Custom AI Sales Agents — Research Package

**Track:** AI-Powered Acquisition (Track 4)
**Duration:** 12 lessons | ~10.5 hours total
**Budget Constraint:** Self-hosted ~$50/month vs SaaS $200-400/month
**Time Constraint:** 5-7 hours/week on acquisition
**Primary Output Artifact:** Agent Spec + Prompt Library
**Core Interactions:** Agent canvas, tool-calling blocks, failure-mode simulator, multi-agent chain

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Choose between LangChain, CrewAI, AutoGen, and Claude Agent SDK for your use case | Lessons 1, 8 | Framework Decision Matrix |
| Build 5 core sales agents (research, email draft, CRM enrichment, meeting prep, post-call) | Lessons 3, 4, 5, 6, 7 | Agent Specs + Prompt Templates |
| Design data flows from LinkedIn/CSV to enrichment to AI to outreach | Lessons 2, 8, 12 | Reference Architecture Diagram |
| Compare self-hosted (VPS ~$50/month) vs SaaS ($200-400/month) architectures | Lesson 8 | Architecture Decision Guide |
| Handle PII, API keys, and compliance as a one-person operation | Lesson 10 | Security & Compliance Checklist |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + diagrams explaining the core concept
2. **Guided Build Session** — Artifact creation with AI suggestions + linters (Security Linter, Cost Linter)
3. **Simulation/Roleplay** — Where applicable (Lessons 3-7, 11)
4. **Implementation Sprint** — Course culminates in a 7-14 day execution sprint (Lesson 12)

---

## LESSON 1: Agent Frameworks: LangChain vs CrewAI vs AutoGen vs Claude SDK (55 min)

### Key Topics

1. **What Is an "AI Agent" in the Sales Context?** — An agent is an LLM-powered program that takes a goal, accesses tools (APIs, databases, web), makes decisions in a loop, and produces an output. Not just a prompt — a system with autonomy, tool use, and memory.
2. **LangChain** — The most mature agent framework. Python-first, TypeScript available. Massive ecosystem of integrations (700+ tools). LangGraph for stateful multi-step agents. Learning curve: Medium-High. Best for: complex multi-tool chains, production deployments with observability (LangSmith). Weakness: overengineered for simple agents, abstractions change frequently.
3. **CrewAI** — Multi-agent framework designed for role-based collaboration. Define "agents" with specific roles (Researcher, Writer, Reviewer) that pass work between each other. Python. Learning curve: Medium. Best for: multi-agent workflows where agents have distinct roles. Weakness: less flexible than LangChain for single-agent use cases.
4. **AutoGen (Microsoft)** — Multi-agent conversation framework. Agents "talk" to each other to solve problems. Strong for complex reasoning and human-in-the-loop patterns. Python. Learning curve: Medium-High. Best for: conversational agent patterns, research tasks. Weakness: heavier than needed for most solo founder use cases.
5. **Claude Agent SDK (Anthropic)** — Anthropic's official SDK for building agents with Claude models. Tight integration with Claude's tool-use and computer-use capabilities. Python/TypeScript. Learning curve: Low-Medium. Best for: Claude-first workflows, simple to medium complexity agents. Weakness: locked to Anthropic models (no GPT-4 fallback).
6. **The Solo Founder Framework Selection** — For most solo founders: Start with direct API calls + orchestrator (n8n/Zapier) for simple agents. Graduate to CrewAI or Claude SDK for multi-agent workflows. Use LangChain only if you need production observability or 10+ tool integrations.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| LangChain: 90K+ GitHub stars, most-used agent framework | GitHub 2026 | Largest ecosystem but high complexity |
| CrewAI: 25K+ GitHub stars, fastest-growing multi-agent framework | GitHub 2026 | Sweet spot for role-based agent teams |
| AutoGen: 35K+ GitHub stars, Microsoft-backed | GitHub 2026 | Strong but enterprise-oriented |
| Claude Agent SDK: Released 2025, rapidly adopted | Anthropic docs | Newest but tightest Claude integration |
| 70% of solo founder agent projects use direct API calls + orchestrator (no framework) | Developer surveys | Frameworks add complexity most don't need |
| Average time to build first agent: 2-4 hours with direct API, 4-8 hours with framework | Developer estimates | Simpler is faster for v1 |

### Frameworks & Models

**Framework Comparison Matrix:**

| Feature | LangChain | CrewAI | AutoGen | Claude SDK |
|---------|-----------|--------|---------|------------|
| Language | Python, TypeScript | Python | Python | Python, TypeScript |
| Learning Curve | Medium-High | Medium | Medium-High | Low-Medium |
| Multi-Agent | Yes (LangGraph) | Yes (native) | Yes (native) | Basic |
| Tool Integrations | 700+ | 50+ | 100+ | Growing |
| Observability | LangSmith (excellent) | Basic | Basic | Basic |
| Production Readiness | High | Medium | Medium | Medium |
| Solo Founder Fit | Medium | High | Low-Medium | High |
| Best For | Complex pipelines | Role-based teams | Research/reasoning | Claude-first, simple agents |

- **The Complexity Ladder**: Level 1: Direct API call + prompt (no framework). Level 2: Single agent with tools (Claude SDK or LangChain). Level 3: Multi-agent pipeline (CrewAI). Level 4: Complex stateful agents (LangGraph/AutoGen). Solo founders: start at Level 1, graduate to Level 2-3 as needed.

### Pseudocode: Simple Agent (No Framework)

```
# Level 1: Direct API Call Agent (Python pseudocode)
# This is where most solo founders should start

function prospect_research_agent(prospect_name, company):
    # Step 1: Gather context
    linkedin_data = scrape_or_import(prospect_name)  # From CSV/CRM
    company_data = fetch_company_info(company)         # Crunchbase API / web
    recent_news = search_news(company, days=30)        # Google News API

    # Step 2: Build prompt with context
    prompt = f"""
    You are a sales research assistant for a solo founder.
    Generate a 1-page prospect brief for:
    Name: {prospect_name}
    Company: {company}
    LinkedIn: {linkedin_data}
    Company Info: {company_data}
    Recent News: {recent_news}

    Output format:
    1. Prospect Overview (role, tenure, background)
    2. Company Context (size, stage, recent events)
    3. Pain Signals (based on role + company stage)
    4. Connection Points (shared interests, mutual connections)
    5. Recommended Outreach Angle
    """

    # Step 3: Call LLM
    brief = call_llm(model="claude-sonnet", prompt=prompt)

    # Step 4: Save to CRM
    save_to_crm(prospect_name, field="research_brief", value=brief)

    return brief
```

### Artifact Component

**Framework Decision Guide** — Flowchart: What's your technical level? → How many agents do you need? → What's your model preference? → Recommended framework.

### Interactive Element

**Concept Capsule Quiz:** Match agent use cases to frameworks. Identify when a simple API call is sufficient vs when a framework adds value. Classify scenarios by complexity level.

---

## LESSON 2: Orchestrators: n8n, Trigger.dev, Zapier, Make (50 min)

### Key Topics

1. **Why Orchestrators Matter for Solo Founders** — Most agents don't need a framework. They need a trigger (new CRM record, incoming email, scheduled time) → a workflow (API calls, LLM prompts, data transforms) → an output (CRM update, email draft, Slack notification). Orchestrators provide this without code.
2. **n8n** — Open-source workflow automation. Self-hosted (free) or cloud ($24/mo starter). 400+ integrations. AI nodes for LLM calls built-in. Visual workflow builder. Best for: technical founders who want full control, unlimited workflows, and AI agent chains. Self-hosting on a VPS costs $5-10/mo.
3. **Trigger.dev** — Open-source background job framework. Self-hosted (free) or cloud (free tier: 50K runs/mo). Code-first (TypeScript). Best for: developers who want code-based agents with reliable execution, retries, and scheduling. Less visual than n8n.
4. **Zapier** — The most popular no-code automation. Cloud-only. Pricing: Free (5 zaps) / $20/mo (Starter: 750 tasks) / $49/mo (Professional: 2K tasks). AI actions available. Best for: non-technical founders, simple 2-3 step workflows. Weakness: expensive at scale, limited AI capabilities.
5. **Make (formerly Integromat)** — Visual automation platform. Cloud-only. Pricing: Free (1K ops) / $10/mo (Core: 10K ops) / $18/mo (Pro). More complex workflows than Zapier at lower cost. Best for: visual thinkers, moderate complexity. Weakness: learning curve steeper than Zapier.
6. **The Orchestrator Selection Matrix** — Budget <$10/mo → n8n self-hosted (free). Non-technical + budget $20-50 → Zapier or Make. Technical + want visual → n8n cloud ($24/mo). Developer + want code → Trigger.dev (free tier).

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| n8n: 50K+ GitHub stars, fastest-growing open-source automation | GitHub 2026 | The developer's choice |
| Zapier: 6M+ users, most integrations (7,000+) | Zapier 2026 | Largest ecosystem but most expensive |
| Make: 500K+ users, 2-5x cheaper than Zapier for equivalent workflows | Make pricing comparison | Best value for cloud-based |
| Trigger.dev: 10K+ GitHub stars, TypeScript-native | GitHub 2026 | Ideal for Next.js / Node.js developers |
| n8n self-hosted on Railway: $5-7/mo for unlimited workflows | Railway pricing | The cheapest full-featured option |
| Average solo founder uses 3-5 automations for agent workflows | Developer surveys | You don't need enterprise scale |

### Frameworks & Models

**Orchestrator Comparison Matrix:**

| Feature | n8n (Self-hosted) | n8n (Cloud) | Trigger.dev | Zapier | Make |
|---------|-------------------|-------------|-------------|--------|------|
| Pricing | Free | $24/mo | Free tier | $20-49/mo | $10-18/mo |
| Workflow Limit | Unlimited | Unlimited | 50K runs/mo (free) | 750-2K tasks/mo | 10K ops/mo |
| AI/LLM Nodes | Yes (built-in) | Yes | Via code | Yes (limited) | Yes (limited) |
| Self-Hostable | Yes | N/A | Yes | No | No |
| Visual Builder | Yes | Yes | No (code) | Yes | Yes |
| Integrations | 400+ | 400+ | Via npm packages | 7,000+ | 1,500+ |
| Complexity Ceiling | Very High | Very High | Very High | Medium | High |
| Solo Founder Fit | High (technical) | High | High (developers) | High (non-technical) | High |

### Pseudocode: n8n Agent Workflow

```
# n8n Workflow: Prospect Research Agent
# Trigger → Enrich → LLM → Output

[Trigger: New CRM Contact Added]
    ↓
[HTTP Request: Fetch LinkedIn data via API]
    ↓
[HTTP Request: Fetch company data from Crunchbase/Clearbit]
    ↓
[AI Agent Node: Claude Sonnet]
    System prompt: "You are a prospect research agent..."
    Input: {linkedin_data, company_data, icp_criteria}
    Output: {research_brief, icp_score, recommended_angle}
    ↓
[IF Node: ICP Score >= 7]
    YES → [CRM Update: Add brief + score + tag "High Priority"]
           → [Slack Notification: "New high-fit prospect: {name}"]
    NO  → [CRM Update: Add brief + score + tag "Low Priority"]
    ↓
[End]
```

### Artifact Component

**Orchestrator Selection Guide + First Workflow Template** — Decision flowchart for choosing orchestrator, plus a ready-to-import n8n/Zapier/Make template for the Prospect Research Agent.

### Interactive Element

**Guided Build:** Student selects their orchestrator preference. AI generates a workflow diagram for their first agent (Prospect Research). Student configures trigger, data sources, LLM prompt, and output destinations.

---

## LESSON 3: Agent 1: Prospect Research Agent (55 min)

### Key Topics

1. **Agent Purpose** — Automatically generate a 1-page prospect brief when a new contact is added to the CRM. Saves 15-30 min of manual research per prospect.
2. **Input Sources** — (A) CRM contact record (name, email, company, role), (B) LinkedIn profile data (manual paste or Evaboot export), (C) Company website (scraped "About" page), (D) Crunchbase (funding, employee count, stage), (E) Google News (recent mentions, last 30 days)
3. **The Research Prompt Template** — Structured prompt that produces consistent 5-section briefs: Overview, Company Context, Pain Signals, Connection Points, Outreach Angle. Anti-hallucination instruction: "If you cannot find specific information, state 'Not found' rather than guessing."
4. **Output Format** — Markdown brief stored as CRM note. Structured fields: ICP fit score (1-10), recommended channel (email/LinkedIn/phone), recommended message angle, key talking points (3 bullets).
5. **Quality Control** — Spot-check 10% of briefs weekly. Common failures: hallucinated job titles, wrong company details, generic pain signals. Mitigation: include source URLs in prompt, require citations.
6. **B2B vs Creator Context** — B2B: research company size, tech stack, recent funding, hiring signals. Creator: research audience size, content topics, monetization model, community platforms, recent launches.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| AI-generated prospect briefs save 70-80% of manual research time | Practitioner data | 2-3 min vs 15-30 min per prospect |
| Hallucination rate for prospect research: 5-15% without anti-hallucination prompts, 1-3% with | LLM evaluation studies | The anti-hallucination instruction is critical |
| Prospect briefs improve reply rates by 20-40% vs no-research outreach | Sales engagement studies | The research shows in the personalization |
| Average cost per brief: $0.02-0.05 (Claude Sonnet) or $0.05-0.15 (GPT-4o) | Token pricing calculations | Negligible per-prospect cost |

### Frameworks & Models

- **The Research Brief Template**:

```
## Prospect Brief: {name}
Generated: {date} | ICP Score: {score}/10

### 1. Prospect Overview
- Role: {title} at {company} ({tenure})
- Background: {education, previous roles, expertise areas}
- LinkedIn: {follower count, posting frequency, content topics}

### 2. Company Context
- Size: {employees} | Stage: {seed/series A/growth/enterprise}
- Funding: {last round, amount, date}
- Tech Stack: {relevant technologies}
- Recent News: {last 30 days, with source URLs}

### 3. Pain Signals
- {signal 1 based on role + company stage}
- {signal 2 based on recent activity}
- {signal 3 based on industry trends}

### 4. Connection Points
- Mutual connections: {if available}
- Shared interests: {from LinkedIn activity}
- Common background: {education, past companies, geography}

### 5. Recommended Outreach Angle
- Channel: {email / LinkedIn / phone}
- Hook: {specific reference to trigger event or content}
- Value prop: {specific to their pain signals}
- CTA: {recommended ask}
```

### Pseudocode: Prospect Research Agent

```
# Agent 1: Prospect Research Agent
# Trigger: New contact added to CRM

function research_agent(contact):
    # Step 1: Data collection (parallel where possible)
    linkedin = get_linkedin_data(contact.name, contact.company)
    company = get_company_data(contact.company)  # Crunchbase/Clearbit
    news = search_news(contact.company, days=30)
    icp = load_icp_criteria()  # From Course 1 artifact

    # Step 2: Build research prompt
    prompt = RESEARCH_BRIEF_TEMPLATE.format(
        name=contact.name,
        title=contact.title,
        company=contact.company,
        linkedin_data=linkedin,
        company_data=company,
        news=news,
        icp_criteria=icp,
        anti_hallucination="If information is unavailable, write 'Not found'."
    )

    # Step 3: Generate brief
    brief = call_llm(
        model="claude-sonnet-4",
        prompt=prompt,
        max_tokens=1000,
        temperature=0.3  # Low temperature for factual accuracy
    )

    # Step 4: Extract structured fields
    score = extract_icp_score(brief)
    channel = extract_recommended_channel(brief)
    angle = extract_outreach_angle(brief)

    # Step 5: Save to CRM
    crm.update_contact(contact.id, {
        "research_brief": brief,
        "icp_score": score,
        "recommended_channel": channel,
        "outreach_angle": angle,
        "research_date": today()
    })

    # Step 6: Notify if high-priority
    if score >= 8:
        notify_slack(f"High-fit prospect: {contact.name} ({score}/10)")

    return brief
```

### Token Economics

| Model | Input Tokens (~) | Output Tokens (~) | Cost/Brief |
|-------|------------------|-------------------|-----------|
| Claude Sonnet 4 | ~2,000 | ~800 | ~$0.01-0.02 |
| Claude Haiku | ~2,000 | ~800 | ~$0.001 |
| GPT-4o | ~2,000 | ~800 | ~$0.02-0.03 |
| GPT-4o-mini | ~2,000 | ~800 | ~$0.001 |

At 50 briefs/week: $0.50-1.50/week with Sonnet, $0.05/week with Haiku.

### Artifact Component

**Prospect Research Agent Spec** — Complete specification: trigger, inputs, prompt template, output format, CRM mapping, quality control checklist, cost estimate.

### Interactive Element

**Agent Canvas:** Student defines: agent goal, allowed data sources, context memory fields, output format, and quality thresholds. AI validates against accuracy and anti-hallucination checklist. Student tests with 3 real prospect profiles.

---

## LESSON 4: Agent 2: Email First-Draft Agent (55 min)

### Key Topics

1. **Agent Purpose** — Generate personalized cold email drafts based on prospect research briefs. Produces 3 variants (different hooks/angles) for human review. Saves 5-10 min per email at 80-90% quality of hand-written.
2. **Input Sources** — (A) Prospect research brief (from Agent 1), (B) Email template library (PAS, AIDA, Question-led from Course 8), (C) Voice guide (from Course 25), (D) Offer/value proposition (from Course 2), (E) Sequence position (first touch, follow-up 1, follow-up 2, breakup)
3. **The Draft Prompt Architecture** — [Context: prospect brief] + [Template: PAS/AIDA] + [Voice: your style guide] + [Constraints: max 125 words, no links in first email, one CTA] + [Anti-hallucination: reference only facts from the brief]
4. **The 3-Variant Approach** — Each draft uses a different angle: (A) Pain-focused (reference their specific challenge), (B) Trigger-focused (reference their recent event), (C) Value-focused (lead with a relevant insight/data point). Human picks the best one.
5. **Quality Linting** — Sales Linter checks: (1) Word count <125, (2) No jargon, (3) One clear CTA, (4) Personalization references are factual, (5) Subject line <50 characters, (6) No spam trigger words.
6. **Sequence Integration** — Draft emails for the full sequence: First touch → Follow-up 1 (3 days) → Follow-up 2 (5 days) → Value bump (7 days) → Breakup (10 days). Each step adapts tone and angle.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| AI-drafted emails edited by human: 5-15% reply rate at 50-250/day | Course 21 benchmarks | Comparable to fully hand-written |
| AI-drafted, unedited emails: 3-7% reply rate | Industry data | The human edit adds 2-8 percentage points |
| Optimal cold email length: 50-125 words | Lavender / Gong research | Shorter = higher reply rate |
| 3-variant testing improves reply rate by 15-25% vs single-variant | A/B testing studies | More options = better selection |
| Average cost per email draft (3 variants): $0.01-0.03 | Token pricing | Negligible cost |

### Frameworks & Models

- **The PAS Email Template (AI-adapted):**

```
Subject: {specific reference to their situation}

Hi {first_name},

{Pain: 1 sentence referencing a specific challenge from their brief}

{Agitate: 1 sentence on the cost/impact of not solving it}

{Solution: 1 sentence on how you help — outcome, not features}

{CTA: 1 specific, low-friction ask}

{Signature}
```

- **The FASP Quality Gate** (from Course 21): Every AI-drafted email must pass: (F)actual — all references verified. (A)ctually relevant — not a stretch. (S)pecific to this person — not applicable to anyone. (P)roud if they knew how you found it.

### Pseudocode: Email Draft Agent

```
# Agent 2: Email First-Draft Agent
# Trigger: Prospect research brief completed (Agent 1 output)

function email_draft_agent(contact, research_brief, sequence_position="first_touch"):
    # Step 1: Load context
    voice_guide = load_voice_guide()
    offer = load_value_proposition()
    templates = load_email_templates()  # PAS, AIDA, Question

    # Step 2: Select templates based on sequence position
    if sequence_position == "first_touch":
        angles = ["pain_focused", "trigger_focused", "value_focused"]
    elif sequence_position in ["follow_up_1", "follow_up_2"]:
        angles = ["different_angle", "social_proof", "question"]
    elif sequence_position == "breakup":
        angles = ["graceful_close"]

    # Step 3: Generate variants
    drafts = []
    for angle in angles:
        prompt = f"""
        Write a cold email for a solo founder.

        PROSPECT BRIEF:
        {research_brief}

        ANGLE: {angle}
        TEMPLATE: {templates[sequence_position]}
        VOICE GUIDE: {voice_guide}
        VALUE PROPOSITION: {offer}

        CONSTRAINTS:
        - Maximum 125 words (body only)
        - One CTA only (question or soft ask)
        - No links in first email
        - Reference ONLY facts from the prospect brief
        - If a fact is uncertain, don't reference it
        - Subject line: under 50 characters, lowercase, specific
        - Tone: {voice_guide.tone}

        OUTPUT:
        Subject: ...
        Body: ...
        """

        draft = call_llm(
            model="claude-sonnet-4",
            prompt=prompt,
            max_tokens=300,
            temperature=0.7  # Slightly higher for creative variation
        )
        drafts.append({"angle": angle, "draft": draft})

    # Step 4: Lint each draft
    for draft in drafts:
        draft["lint_results"] = sales_linter(draft["draft"])
        # Check: word count, jargon, CTA count, spam words, personalization

    # Step 5: Save to review queue
    crm.update_contact(contact.id, {
        "email_drafts": drafts,
        "draft_status": "pending_review",
        "sequence_position": sequence_position
    })

    notify_review_queue(f"3 email drafts ready for {contact.name}")
    return drafts
```

### Token Economics

| Model | Input Tokens (~) | Output Tokens (~) | Cost/3 Variants |
|-------|------------------|-------------------|----------------|
| Claude Sonnet 4 | ~1,500 per variant | ~300 per variant | ~$0.02-0.03 |
| Claude Haiku | ~1,500 per variant | ~300 per variant | ~$0.002 |
| GPT-4o | ~1,500 per variant | ~300 per variant | ~$0.03-0.05 |
| GPT-4o-mini | ~1,500 per variant | ~300 per variant | ~$0.002 |

At 50 prospects/week (3 variants each): $1.00-1.50/week with Sonnet.

### Artifact Component

**Email Draft Agent Spec** — Complete specification: trigger (Agent 1 output), inputs, prompt template per sequence position, 3-variant generation logic, Sales Linter rules, output format, CRM mapping.

### Interactive Element

**Personalization Sandbox:** Student uploads 5 prospect briefs. Agent generates 15 email drafts (3 per prospect). Sales Linter scores each. Student reviews, edits, and selects best variants. System tracks edit distance to measure AI accuracy.

---

## LESSON 5: Agent 3: CRM Enrichment Agent (50 min)

### Key Topics

1. **Agent Purpose** — Automatically keep CRM records enriched and up-to-date. When a new contact is added or a trigger event occurs, the agent fills in missing fields, updates changed information, and flags stale records.
2. **Enrichment Fields** — Company: employee count, funding stage, tech stack, industry, website. Contact: title verification, LinkedIn URL, email verification status, phone, time zone. Activity: last LinkedIn post date, job tenure, recent company news.
3. **Data Sources** — Apollo API (free tier: 10K records/mo), Clearbit/Clay APIs (paid), Google search (free), Crunchbase (free tier), LinkedIn (manual/Evaboot).
4. **The Waterfall Enrichment Pattern** — Try Source A → if missing, try Source B → if missing, try Source C. Maximize coverage while minimizing API costs. Apollo catches 60-70% of emails; add Hunter for 10-15% more; add Snov for 5% more.
5. **Scheduled vs Event-Driven Enrichment** — Event-driven: runs when a new contact is added (instant). Scheduled: runs weekly to refresh stale records (older than 90 days) and verify emails.
6. **B2B vs Creator Enrichment Fields** — B2B: company size, funding, tech stack, decision-maker map. Creator: audience size, content frequency, monetization model, community platforms, email list size (estimated).

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| CRM data decays at 2-3% per month | NeverBounce / data quality studies | Without enrichment, 25-36% of records stale in 12 months |
| Waterfall enrichment increases email coverage from 60% to 80-85% | Clay documentation | Multi-source is essential |
| Apollo free tier: 10K records/month, 5 mobile credits | Apollo.io 2025 | Generous free tier for solo founders |
| Enriched CRM records lead to 20-30% higher reply rates | Sales engagement studies | More data = better personalization |
| Average CRM enrichment agent saves 3-5 hours/week of manual data entry | Practitioner estimates | One of the highest-ROI agents to build |

### Pseudocode: CRM Enrichment Agent

```
# Agent 3: CRM Enrichment Agent
# Trigger: New contact added OR weekly scheduled run

function enrichment_agent(contact, mode="new_contact"):
    enriched = {}

    # Step 1: Waterfall email verification
    if not contact.email_verified:
        verified = verify_email(contact.email)  # MillionVerifier API
        enriched["email_verified"] = verified
        enriched["email_status"] = "valid" if verified else "invalid"

    # Step 2: Company enrichment
    if not contact.company_size or mode == "refresh":
        company_data = None
        # Waterfall: Apollo → Clearbit → Google
        company_data = apollo_company_lookup(contact.company)
        if not company_data:
            company_data = clearbit_company_lookup(contact.domain)
        if not company_data:
            company_data = google_search_company(contact.company)

        if company_data:
            enriched["company_size"] = company_data.employees
            enriched["funding_stage"] = company_data.funding
            enriched["industry"] = company_data.industry
            enriched["tech_stack"] = company_data.technologies

    # Step 3: Contact enrichment
    if not contact.linkedin_url:
        linkedin_url = find_linkedin(contact.name, contact.company)
        enriched["linkedin_url"] = linkedin_url

    if not contact.phone and need_phone(contact):
        phone = apollo_phone_lookup(contact.email)
        enriched["phone"] = phone

    # Step 4: Activity enrichment (if LinkedIn available)
    if contact.linkedin_url:
        activity = get_linkedin_activity(contact.linkedin_url)
        enriched["last_post_date"] = activity.last_post
        enriched["content_topics"] = activity.topics
        enriched["posting_frequency"] = activity.frequency

    # Step 5: Timezone detection
    if not contact.timezone:
        enriched["timezone"] = detect_timezone(contact.location or contact.company_hq)

    # Step 6: Staleness flag
    enriched["last_enriched"] = today()
    enriched["next_refresh"] = today() + 90  # days

    # Step 7: Update CRM
    crm.update_contact(contact.id, enriched)

    # Step 8: Flag issues
    if enriched.get("email_status") == "invalid":
        crm.tag_contact(contact.id, "invalid_email")
        notify_slack(f"Invalid email: {contact.name} — needs replacement")

    return enriched
```

### Token Economics

This agent is primarily API-call driven (not LLM-intensive). Costs are dominated by enrichment APIs:

| Service | Cost | Volume (Solo Founder) |
|---------|------|----------------------|
| Apollo (email + company) | Free tier: 10K/mo | Sufficient for most |
| MillionVerifier | ~$0.003/email | $0.75/week at 250/week |
| Clearbit (fallback) | $99/mo (Starter) | Only if Apollo insufficient |
| Hunter.io (fallback) | Free (25/mo) / $49/mo | Secondary email source |

### Artifact Component

**CRM Enrichment Agent Spec** — Complete specification: trigger logic (event + scheduled), waterfall sequence, field mapping, API connections, staleness thresholds, error handling.

### Interactive Element

**Guided Build:** Student maps their CRM fields to enrichment sources. AI generates the waterfall sequence optimized for their budget. Student configures the n8n/Zapier workflow with the generated spec.

---

## LESSON 6: Agent 4: Meeting Prep Agent (50 min)

### Key Topics

1. **Agent Purpose** — 30 minutes before a scheduled meeting, automatically generate a 1-page prep document: prospect brief refresh, talking points, questions to ask, objections to prepare for, relevant case studies.
2. **Input Sources** — (A) CRM record (research brief, deal stage, past interactions), (B) Calendar event (attendee names, meeting type), (C) Email thread (last 3-5 exchanges), (D) Fresh data (check for new LinkedIn posts, news since last research).
3. **The Prep Document Template** — (1) Quick Refresh (key facts from brief), (2) Meeting Objective (what you want to achieve), (3) Talking Points (3-5, tied to their pain signals), (4) Questions to Ask (5-7, discovery-focused), (5) Objection Prep (top 2-3 likely objections with responses), (6) Relevant Proof (case study or testimonial to share).
4. **Timing and Delivery** — Trigger: 30 min before calendar event. Delivered to: Slack DM, email, or CRM dashboard. Solo founders report reading the prep doc during their pre-meeting walk/coffee.
5. **DISC Personality Prep** — If DISC type is known (from Course 13), include communication style notes: pace, detail level, decision-making style, objection handling approach.
6. **Post-Meeting Update** — After the meeting, the agent prompts for notes and updates the CRM record with meeting outcome, next steps, and updated deal stage.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Sales reps who prepare for calls close at 2x the rate of unprepared reps | Gong research | Preparation is the #1 predictor of meeting success |
| Average solo founder spends 10-20 min preparing for each sales call | Practitioner surveys | The agent reduces this to 2-3 min of review |
| AI-generated meeting prep docs are rated "useful" or "very useful" by 85% of users | Internal product testing | High satisfaction when tuned to ICP |
| Including DISC-adapted talking points improves rapport scores by 30% | Course 13 data / roleplay assessments | Personality awareness matters |

### Pseudocode: Meeting Prep Agent

```
# Agent 4: Meeting Prep Agent
# Trigger: 30 minutes before calendar event with external attendee

function meeting_prep_agent(calendar_event):
    # Step 1: Identify attendees
    attendees = get_external_attendees(calendar_event)

    for attendee in attendees:
        contact = crm.find_contact(attendee.email)
        if not contact:
            continue  # Or create new contact + run research agent

        # Step 2: Refresh data
        brief = contact.research_brief
        recent_activity = check_recent_activity(contact, since=contact.last_enriched)
        email_history = get_email_thread(contact.email, last_n=5)
        deal_info = crm.get_deal(contact.id)

        # Step 3: Generate prep doc
        prompt = f"""
        Generate a meeting prep document for a solo founder.

        MEETING: {calendar_event.title}
        TIME: {calendar_event.time}
        TYPE: {calendar_event.type or "Discovery/Follow-up"}

        PROSPECT BRIEF:
        {brief}

        RECENT ACTIVITY (since last research):
        {recent_activity}

        EMAIL HISTORY:
        {email_history}

        DEAL STATUS:
        Stage: {deal_info.stage}
        Value: {deal_info.value}
        Notes: {deal_info.notes}

        DISC TYPE: {contact.disc_type or "Unknown"}

        OUTPUT FORMAT:
        1. Quick Refresh (3 bullet key facts)
        2. Meeting Objective (1 sentence goal)
        3. Talking Points (3-5 tied to their pain)
        4. Questions to Ask (5-7 discovery questions)
        5. Objection Prep (top 2-3 with LARA responses)
        6. Relevant Proof (1 case study or testimonial)
        7. DISC Communication Notes (if type known)
        """

        prep_doc = call_llm(
            model="claude-sonnet-4",
            prompt=prompt,
            max_tokens=1200,
            temperature=0.3
        )

        # Step 4: Deliver
        send_slack_dm(prep_doc, channel="meeting-prep")
        crm.update_contact(contact.id, {"last_prep": today()})

    return prep_doc
```

### Token Economics

| Model | Input Tokens (~) | Output Tokens (~) | Cost/Prep Doc |
|-------|------------------|-------------------|-------------|
| Claude Sonnet 4 | ~3,000 | ~1,000 | ~$0.02-0.04 |
| Claude Haiku | ~3,000 | ~1,000 | ~$0.002 |
| GPT-4o | ~3,000 | ~1,000 | ~$0.04-0.06 |

At 10 meetings/week: $0.20-0.40/week with Sonnet. Negligible.

### Artifact Component

**Meeting Prep Agent Spec** — Complete specification: calendar trigger configuration, data sources, prep doc template, DISC integration, delivery method, post-meeting update flow.

### Interactive Element

**Failure-Mode Simulator:** AI generates a meeting prep doc with deliberately planted errors (wrong company facts, inappropriate questions, mismatched DISC advice). Student must identify the errors and correct them before "entering the meeting."

---

## LESSON 7: Agent 5: Post-Call Summary Agent (50 min)

### Key Topics

1. **Agent Purpose** — After a sales call, automatically generate a structured summary from notes (typed, voice-transcribed, or pasted). Updates CRM with: summary, action items, next steps, deal stage recommendation, follow-up draft.
2. **Input Sources** — (A) Call transcript (from Fathom, Otter.ai, or manual notes), (B) CRM record (current deal stage, history), (C) Meeting prep doc (from Agent 4 — what was the objective?).
3. **The Summary Template** — (1) Meeting Outcome (1 sentence), (2) Key Discussion Points (3-5 bullets), (3) Pain Points Confirmed/Discovered, (4) Objections Raised + Responses, (5) Action Items (who does what by when), (6) Next Steps + Timeline, (7) Deal Stage Recommendation (advance/hold/disqualify), (8) Follow-Up Draft (email confirming next steps).
4. **Voice-to-Text Integration** — Use Fathom (free for solo), Otter.ai ($16.99/mo), or native phone recording + Whisper API transcription. Agent runs on the transcript.
5. **CRM Auto-Update** — Agent writes summary to CRM notes, updates deal stage (with human confirmation), creates follow-up task, and queues the follow-up email draft for review.
6. **Learning Loop** — Over time, the agent learns which questions produced the best outcomes, which objection responses worked, and which next steps led to progression. Quarterly review of agent accuracy.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Sales reps spend 4.5 hours/week on CRM data entry | Salesforce research | The highest-friction post-call activity |
| Solo founders who update CRM within 1 hour of a call have 25% higher close rates | CRM usage studies | The summary agent enables immediate updates |
| AI-generated call summaries are 90%+ accurate when given quality transcripts | LLM evaluation studies | Transcript quality is the bottleneck |
| Fathom: free AI meeting recorder with auto-summary | Fathom pricing 2026 | The easiest free integration |
| Follow-up emails sent within 24 hours of a call: 2x more effective | Sales follow-up studies | The agent ensures speed |

### Pseudocode: Post-Call Summary Agent

```
# Agent 5: Post-Call Summary Agent
# Trigger: Call ended (Fathom webhook / manual trigger)

function post_call_agent(call_data):
    # Step 1: Get transcript
    if call_data.source == "fathom":
        transcript = fathom_api.get_transcript(call_data.meeting_id)
    elif call_data.source == "manual_notes":
        transcript = call_data.notes
    elif call_data.source == "audio":
        transcript = whisper_transcribe(call_data.audio_file)

    # Step 2: Load context
    contact = crm.find_contact(call_data.attendee_email)
    deal = crm.get_deal(contact.id)
    prep_doc = contact.last_prep_doc
    icp = load_icp_criteria()

    # Step 3: Generate summary
    prompt = f"""
    Generate a post-call summary for a solo founder.

    CALL TRANSCRIPT:
    {transcript}

    PRE-CALL OBJECTIVE:
    {prep_doc.meeting_objective if prep_doc else "Not available"}

    CURRENT DEAL:
    Stage: {deal.stage} | Value: {deal.value}

    OUTPUT FORMAT:
    1. Meeting Outcome (1 sentence: positive/neutral/negative)
    2. Key Discussion Points (3-5 bullets)
    3. Pain Points Confirmed/Discovered
    4. Objections Raised (with your responses)
    5. Action Items:
       - [You]: {action} by {date}
       - [Prospect]: {action} by {date}
    6. Next Steps: {what, when, who initiates}
    7. Deal Stage Recommendation: {advance to X / hold / disqualify}
       Confidence: {high/medium/low}
       Rationale: {1 sentence}
    8. Follow-Up Email Draft:
       Subject: ...
       Body: ... (confirm next steps, deliver any promised assets)
    """

    summary = call_llm(
        model="claude-sonnet-4",
        prompt=prompt,
        max_tokens=1500,
        temperature=0.3
    )

    # Step 4: Parse structured output
    parsed = parse_summary(summary)

    # Step 5: Update CRM
    crm.add_note(contact.id, summary)
    crm.update_deal(deal.id, {
        "stage_recommendation": parsed.stage_recommendation,
        "next_step": parsed.next_steps,
        "next_step_date": parsed.next_date
    })

    # Step 6: Create tasks
    for action in parsed.action_items:
        if action.owner == "you":
            crm.create_task(contact.id, action.description, action.due_date)

    # Step 7: Queue follow-up email
    crm.queue_email_draft(contact.id, parsed.follow_up_email)
    notify_slack(f"Post-call summary ready: {contact.name} — {parsed.outcome}")

    return summary
```

### Token Economics

| Model | Input Tokens (~) | Output Tokens (~) | Cost/Summary |
|-------|------------------|-------------------|-------------|
| Claude Sonnet 4 | ~5,000 (transcript heavy) | ~1,200 | ~$0.04-0.06 |
| Claude Haiku | ~5,000 | ~1,200 | ~$0.004 |
| GPT-4o | ~5,000 | ~1,200 | ~$0.06-0.08 |

At 10 calls/week: $0.40-0.60/week with Sonnet. Negligible.

### Artifact Component

**Post-Call Summary Agent Spec** — Complete specification: transcript sources, prompt template, CRM mapping, task creation logic, follow-up email template, deal stage recommendation criteria.

### Interactive Element

**Multi-Agent Chain Test:** Student connects Agents 1 → 4 → 5 in sequence: Research → Meeting Prep → Post-Call Summary. AI simulates a prospect and a call transcript. Student reviews the full chain output for accuracy and coherence.

---

## LESSON 8: Reference Architecture: Self-Hosted vs SaaS (55 min)

### Key Topics

1. **Self-Hosted Architecture** — Run agents on your own VPS. Tools: Railway ($5/mo), Render ($7/mo), DigitalOcean ($6/mo), or Vercel (free tier for serverless). Code: Python/Node.js agents + n8n for orchestration. Database: Supabase (free tier) or SQLite. Total: ~$20-50/mo.
2. **SaaS Architecture** — Use cloud platforms for everything. Zapier/Make for orchestration ($10-50/mo), hosted LLM APIs (OpenAI/Anthropic), cloud CRM (HubSpot Free), Airtable for data ($20/mo). Total: ~$100-200/mo. No server management.
3. **Hybrid Architecture (Recommended)** — Orchestration: n8n cloud ($24/mo) or Zapier ($20/mo). LLM APIs: Anthropic/OpenAI (pay-per-use). CRM: HubSpot Free. Hosting: Only for custom code (Railway $5/mo). Total: ~$50-100/mo.
4. **Architecture Comparison** — Self-hosted: cheapest, full control, requires DevOps knowledge. SaaS: easiest, most expensive, vendor lock-in. Hybrid: best balance for most solo founders.
5. **Hosting Platform Deep Dives** — Railway: easiest deployment from GitHub, $5/mo hobby plan. Render: similar to Railway, $7/mo starter. DigitalOcean: cheapest for always-on, $6/mo droplet. Vercel: free tier excellent for serverless/cron agents.
6. **Data Flow Architecture** — CRM (source of truth) → Orchestrator (triggers + routing) → Agents (processing) → LLM APIs (intelligence) → CRM (output). Every agent reads from and writes to the CRM.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Railway hobby plan: $5/mo, 8GB RAM, 8 vCPU | Railway pricing 2026 | Sufficient for 5 agents |
| Render starter: $7/mo per service | Render pricing 2026 | Slightly more expensive, similar capability |
| DigitalOcean basic droplet: $6/mo, 1GB RAM | DigitalOcean pricing 2026 | Cheapest always-on option |
| Vercel hobby: free, 100GB bandwidth, serverless functions | Vercel pricing 2026 | Free for cron-triggered agents |
| n8n cloud: $24/mo starter, unlimited workflows | n8n pricing 2026 | Best value cloud orchestrator |
| Average solo founder agent infrastructure cost: $30-75/mo | Developer surveys | Well within budget constraints |

### Frameworks & Models

**Architecture Comparison Matrix:**

| Feature | Self-Hosted | SaaS | Hybrid (Recommended) |
|---------|-----------|------|---------------------|
| Monthly Cost | $20-50 | $100-200 | $50-100 |
| Setup Complexity | High | Low | Medium |
| Maintenance | You manage updates/uptime | Vendor manages | Split |
| Control | Full | Limited | Good |
| Scalability | Manual scaling | Auto-scale | Good enough |
| Vendor Lock-in | None | High | Medium |
| DevOps Required | Yes | No | Minimal |
| Solo Founder Fit | Technical founders | Non-technical | Most founders |

**Reference Architecture (Hybrid):**

```
┌─────────────────────────────────────────────┐
│                  CRM (HubSpot Free)          │
│         Source of truth for all data         │
└─────────┬──────────────────────┬────────────┘
          │ Webhook/API          │ Write back
          ▼                      │
┌─────────────────────┐         │
│   Orchestrator       │         │
│   (n8n Cloud $24/mo) │         │
│                      │         │
│  Triggers:           │         │
│  - New contact       │         │
│  - Calendar event    │         │
│  - Scheduled (daily) │         │
│  - Webhook (Fathom)  │         │
└──┬──┬──┬──┬──┬──────┘         │
   │  │  │  │  │                │
   ▼  ▼  ▼  ▼  ▼                │
┌──────────────────────────┐    │
│     Agent Functions       │    │
│  (Railway $5/mo or        │    │
│   Vercel Free)            │    │
│                           │    │
│  Agent 1: Research        │────┘
│  Agent 2: Email Draft     │
│  Agent 3: CRM Enrichment  │
│  Agent 4: Meeting Prep    │
│  Agent 5: Post-Call       │
└──────────┬───────────────┘
           │ API Calls
           ▼
┌──────────────────────────┐
│     LLM APIs              │
│  Claude Sonnet: ~$3/1M in │
│  Claude Haiku: ~$0.25/1M  │
│  GPT-4o: ~$5/1M input     │
│  GPT-4o-mini: ~$0.15/1M   │
└──────────────────────────┘
```

### Artifact Component

**Architecture Decision Guide** — Flowchart: Technical comfort → Budget → Volume → Recommended architecture (Self-hosted / SaaS / Hybrid) with specific tool selections and cost estimates.

### Interactive Element

**Guided Build:** Student selects their architecture preference. AI generates a complete infrastructure diagram with specific tools, costs, and setup steps. Student can adjust components and see cost/complexity tradeoffs.

---

## LESSON 9: Token Economics & Running Costs (45 min)

### Key Topics

1. **Understanding Token Pricing** — Input tokens (what you send to the model) vs output tokens (what the model generates). Pricing varies 10-100x between models. Choose model by task complexity, not by default.
2. **Model Pricing Comparison (2026)**:
   - GPT-4o: ~$5/1M input, ~$15/1M output
   - GPT-4o-mini: ~$0.15/1M input, ~$0.60/1M output
   - Claude Sonnet 4: ~$3/1M input, ~$15/1M output
   - Claude Haiku: ~$0.25/1M input, ~$1.25/1M output
   - Llama 3 (self-hosted): ~$0 marginal (VPS cost only)
3. **Model Selection by Agent Task** — Research briefs: Sonnet/GPT-4o (need quality). Email drafts: Sonnet/GPT-4o (need creativity + accuracy). CRM enrichment: Haiku/GPT-4o-mini (simple extraction). Meeting prep: Sonnet/GPT-4o (need nuance). Post-call summary: Sonnet/GPT-4o (need accuracy).
4. **Monthly Cost Projections** — For 50 prospects/week, 10 meetings/week, 10 calls/week: Total LLM cost: $5-15/month with Sonnet, $0.50-1.50/month with Haiku. The LLM cost is the cheapest part of the stack.
5. **Cost Optimization Strategies** — (A) Use Haiku/mini for simple tasks, Sonnet/GPT-4o only for quality-sensitive tasks. (B) Cache common enrichment data to avoid redundant calls. (C) Batch prompts where possible. (D) Monitor token usage with dashboard.
6. **The "Model Cascade" Pattern** — Start with Haiku/mini. If confidence is low, escalate to Sonnet/GPT-4o. Saves 60-70% on LLM costs while maintaining quality where it matters.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Claude Sonnet 4 input: ~$3/1M tokens | Anthropic pricing 2026 | The workhorse model for quality tasks |
| Claude Haiku input: ~$0.25/1M tokens | Anthropic pricing 2026 | 12x cheaper — use for simple tasks |
| GPT-4o input: ~$5/1M tokens | OpenAI pricing 2026 | Comparable quality to Sonnet |
| GPT-4o-mini input: ~$0.15/1M tokens | OpenAI pricing 2026 | Cheapest option for simple extraction |
| Average solo founder agent LLM spend: $5-20/month | Developer surveys | LLM costs are rarely the bottleneck |
| The model cascade pattern saves 60-70% on LLM costs | Engineering benchmarks | Start cheap, escalate when needed |

### Frameworks & Models

**Monthly Cost Projection (50 prospects/week, 10 meetings/week):**

| Agent | Runs/Week | Model | Tokens/Run | Weekly Cost | Monthly Cost |
|-------|----------|-------|-----------|------------|-------------|
| Research (Agent 1) | 50 | Sonnet | ~2,800 | $0.65 | $2.60 |
| Email Draft (Agent 2) | 50 × 3 variants | Sonnet | ~1,800 | $1.30 | $5.20 |
| CRM Enrichment (Agent 3) | 50 | Haiku | ~1,000 | $0.02 | $0.08 |
| Meeting Prep (Agent 4) | 10 | Sonnet | ~4,000 | $0.18 | $0.72 |
| Post-Call Summary (Agent 5) | 10 | Sonnet | ~6,200 | $0.30 | $1.20 |
| **Total LLM Cost** | | | | **$2.45** | **$9.80** |

**Total Monthly Stack Cost (Hybrid Architecture):**

| Component | Cost |
|-----------|------|
| LLM APIs (Anthropic/OpenAI) | $10-20 |
| Orchestrator (n8n Cloud) | $24 |
| Hosting (Railway) | $5 |
| CRM (HubSpot Free) | $0 |
| Email verification (MillionVerifier) | $3-4 |
| Enrichment APIs (Apollo Free) | $0 |
| **Total** | **$42-53/mo** |

### Artifact Component

**Token Economics Calculator** — Spreadsheet template: input weekly volume per agent, select model per agent → output monthly LLM cost + total stack cost.

### Interactive Element

**Cost Simulator:** Student adjusts: prospects/week, meetings/week, model selection per agent. System calculates monthly LLM cost and total infrastructure cost. Shows cost comparison with AI SDR platforms (from Course 26).

---

## LESSON 10: Security, PII, and Compliance for Solo Ops (45 min)

### Key Topics

1. **PII in the Agent Pipeline** — Your agents process names, emails, phone numbers, company data, LinkedIn profiles, call transcripts. This is Personally Identifiable Information (PII) subject to GDPR, CCPA, and other regulations.
2. **API Key Security** — Never hardcode API keys in source code. Use environment variables (.env files), secrets managers (Railway/Render built-in), or Vercel environment variables. Rotate keys quarterly.
3. **Data Storage Security** — CRM is your primary data store (HubSpot handles compliance). For custom databases: encrypt at rest, use SSL/TLS for connections, restrict access to your IP only. Never store PII in plain text files.
4. **GDPR Compliance for Solo Founders** — Lawful basis for processing B2B contact data: "legitimate interest" (most common for B2B outreach). Requirements: (A) Privacy policy on your website, (B) Easy opt-out/unsubscribe, (C) Data deletion on request, (D) Don't process data beyond your stated purpose.
5. **CAN-SPAM Compliance** — Required: (A) Accurate "From" header, (B) Clear subject line, (C) Physical mailing address, (D) Unsubscribe mechanism, (E) Honor opt-outs within 10 days. Your agents must include these in every email.
6. **The "Solo Founder Compliance Minimum"** — You don't need a DPO or DPIA. You need: privacy policy, consent/opt-out mechanisms, secure API key storage, encrypted data transit, and a process for deletion requests. 2-3 hours of setup, then minimal maintenance.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| GDPR fines in 2025: 4.5B euros total | GDPR Enforcement Tracker | Even small businesses can be fined |
| CAN-SPAM violations: up to $51,744 per email | FTC | The penalty is per message, not per campaign |
| 73% of data breaches involve compromised credentials | Verizon DBIR 2025 | API key security is not optional |
| 95% of API key leaks happen through GitHub repositories | GitGuardian 2025 | Never commit .env files |
| Solo founders with a documented security process report 0 incidents vs 15% incident rate for those without | Developer surveys | The process prevents the problem |

### Frameworks & Models

- **The Solo Founder Security Checklist**:
  1. API keys in environment variables (never in code)
  2. .env file in .gitignore (never committed)
  3. API key rotation every 90 days
  4. HTTPS for all API calls
  5. CRM handles primary data storage (not custom DBs)
  6. Privacy policy on website
  7. Unsubscribe link in every outbound email
  8. Data deletion process documented
  9. Backup API keys stored in password manager (not notes/docs)
  10. Monthly 5-minute security review

- **The PII Handling Decision Tree**: Does the agent process PII? YES → Is it stored in the CRM? YES → CRM handles compliance. NO → Encrypt and delete after processing. Does the agent send the PII to a third-party API? YES → Check their DPA (Data Processing Agreement). NO → Proceed.

### Artifact Component

**Security & Compliance Checklist** — 10-point checklist with setup instructions for API key management, PII handling, GDPR/CAN-SPAM compliance, and incident response.

### Interactive Element

**Security Audit Exercise:** AI presents a sample agent codebase with 5 deliberately planted security issues (hardcoded API key, PII in logs, missing unsubscribe, HTTP instead of HTTPS, .env committed to git). Student must identify and fix all 5.

---

## LESSON 11: Dual-Context: B2B Discovery Prep vs Creator Nurture Agent (50 min)

### Key Topics

1. **B2B Discovery Prep Agent** — Variation of Agents 1 + 4 optimized for B2B sales conversations. Focus on: company pain points, budget indicators, decision-making structure, competitive landscape, ROI potential.
2. **Creator Nurture Agent** — Variation optimized for creator/coach audience engagement. Focus on: content engagement history, community participation, purchase history, audience segment, nurture stage.
3. **B2B Agent Prompt Adjustments** — Emphasis on: company metrics (ARR, employee count, funding), technology stack, organizational pain, competitive displacement opportunities, economic buyer identification.
4. **Creator Agent Prompt Adjustments** — Emphasis on: audience growth trajectory, content resonance (which posts they engaged with), community activity, price sensitivity signals, transformation-readiness indicators.
5. **Shared Infrastructure, Different Prompts** — The 5 agents use the same architecture. Only the prompts, data sources, and output formats change between B2B and Creator contexts. This is a prompt library problem, not an architecture problem.
6. **Hybrid Context** — For founders who sell to both B2B and Creator audiences: tag contacts by context in CRM, route to context-specific prompts automatically.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| B2B sales cycle: 30-90 days average for SMB | Sales benchmark reports | Agents need to track over longer timeframes |
| Creator sales cycle: 7-30 days (impulse to considered) | Creator economy data | Shorter cycle, different nurture cadence |
| B2B decision involves 2-5 stakeholders for SMB | Gartner | Agent needs to map the buying committee |
| Creator purchase is 80% individual decision | Creator economy benchmarks | Agent focuses on individual readiness signals |
| Same agent architecture, different prompts: 90% code reuse | Developer estimates | The context switch is a prompt library change |

### Frameworks & Models

**B2B vs Creator Agent Prompt Differences:**

| Agent | B2B Context | Creator Context |
|-------|-----------|----------------|
| Research (Agent 1) | Company size, funding, tech stack, hiring | Audience size, content topics, monetization model |
| Email Draft (Agent 2) | Pain → Solution → ROI | Story → Transformation → Invitation |
| CRM Enrichment (Agent 3) | Company data, decision-maker map | Social metrics, engagement history |
| Meeting Prep (Agent 4) | BANT qualification, competitive intel | Transformation readiness, objection prep |
| Post-Call (Agent 5) | Deal stage, action items, ROI justification | Enrollment readiness, follow-up nurture |

### Pseudocode: Context Router

```
# Context Router: Automatically selects B2B or Creator prompts

function route_to_context(contact):
    context = contact.context_tag  # "b2b" or "creator" in CRM

    if not context:
        # Auto-detect from data
        if contact.company_size and contact.company_size > 1:
            context = "b2b"
        elif contact.audience_size or contact.content_platform:
            context = "creator"
        else:
            context = "b2b"  # Default

    # Load context-specific prompt library
    prompts = load_prompt_library(context)

    return prompts

# Usage in any agent:
prompts = route_to_context(contact)
brief = call_llm(model="claude-sonnet-4", prompt=prompts.research_prompt.format(...))
```

### Artifact Component

**Dual-Context Prompt Library** — Complete prompt set for all 5 agents in both B2B and Creator contexts (10 prompts total), with context routing logic.

### Interactive Element

**Strategy Duel:** Same prospect data, two agent contexts (B2B vs Creator). Student sees both outputs side by side, evaluates which is more appropriate, and identifies where the AI made context-inappropriate choices.

---

## LESSON 12: Your Custom Agent Stack Blueprint (55 min)

### Key Topics

1. **Complete System Architecture** — All 11 lessons integrated into one coherent agent system
2. **Agent Spec + Prompt Library** (Primary Artifact Assembly) — 5 agents with full specs, prompt templates, architecture diagrams, and deployment configurations
3. **Implementation Sprint (7-14 Days)** — Day-by-day build plan
4. **Performance Dashboard** — 5 metrics to track weekly
5. **90-Day Calibration Plan** — Monthly review cadence, prompt iteration, cost optimization

### Frameworks & Models

**Implementation Sprint (7-14 Days):**

| Day | Activity | Output |
|-----|----------|--------|
| 1 | Set up infrastructure: n8n + Railway/Vercel + API keys | Infrastructure ready |
| 2 | Build Agent 3 (CRM Enrichment) — simplest, fastest ROI | First agent live |
| 3 | Build Agent 1 (Prospect Research) — highest standalone value | Research agent live |
| 4 | Build Agent 2 (Email Draft) — connects to Agent 1 output | Email draft agent live |
| 5 | Test Agents 1-3 chain with 10 real prospects | End-to-end pipeline verified |
| 6 | Build Agent 4 (Meeting Prep) — calendar integration | Meeting prep agent live |
| 7 | Build Agent 5 (Post-Call Summary) — transcript integration | Post-call agent live |
| 8-10 | Test full 5-agent chain with real data, fix bugs | Full system operational |
| 11-14 | Run in production, monitor, iterate on prompts | First week of data |

**5-Metric Agent Dashboard:**
1. Briefs Generated/Week (target: 25-50)
2. Email Drafts Generated/Week (target: 25-50 × 3 variants)
3. Meeting Prep Docs/Week (target: 5-10)
4. Post-Call Summaries/Week (target: 5-10)
5. Total Monthly LLM + Infra Cost (target: <$50 self-hosted, <$100 hybrid)

**Pipeline Math (Agent-Powered):**
50 prospects researched/week → 50 email drafts generated → 35-40 sent (after human review) → 2-5 positive replies → 1-3 meetings booked. Plus: 10 meetings prepped/week → 10 summaries generated → follow-ups sent within 1 hour. Total founder time: 3-5 hours/week (review + calls), down from 15-20 hours without agents.

**90-Day Calibration Plan:**

| Month | Focus | Action |
|-------|-------|--------|
| Month 1 | Accuracy | Review 100% of agent output, fix prompt issues, tune anti-hallucination |
| Month 2 | Efficiency | Implement model cascade (Haiku for simple, Sonnet for complex), optimize token usage |
| Month 3 | Expansion | Add context routing (B2B/Creator), connect new data sources, reduce review to 50% |

### Artifact Component

**Custom Agent Stack Blueprint** (Primary Course Artifact) compiling all 12 lesson artifacts:
1. Framework Decision Guide (L1)
2. Orchestrator Selection Guide + First Workflow Template (L2)
3. Prospect Research Agent Spec (L3)
4. Email Draft Agent Spec (L4)
5. CRM Enrichment Agent Spec (L5)
6. Meeting Prep Agent Spec (L6)
7. Post-Call Summary Agent Spec (L7)
8. Architecture Decision Guide (L8)
9. Token Economics Calculator (L9)
10. Security & Compliance Checklist (L10)
11. Dual-Context Prompt Library (L11)
12. Custom Agent Stack Blueprint (L12) — compiles all above

### Interactive Element

**Implementation Sprint Launcher:** AI generates a personalized 14-day sprint calendar based on student's technical level, infrastructure choice, and agent priorities. Daily check-ins with progress tracking. Day 7 and Day 14 reviews with performance analysis and prompt iteration recommendations.

**Multi-Agent Chain Final Test:** Student connects all 5 agents. AI simulates: new prospect added → research brief generated → email drafted → meeting prep created → post-call summary generated. Student reviews full chain output for accuracy, coherence, and quality.

---

## TOKEN ECONOMICS SUMMARY

### Per-Agent Cost (Weekly, 50 prospects + 10 meetings)

| Agent | Model | Weekly Cost |
|-------|-------|------------|
| Prospect Research | Claude Sonnet 4 | $0.65 |
| Email Draft (3 variants) | Claude Sonnet 4 | $1.30 |
| CRM Enrichment | Claude Haiku | $0.02 |
| Meeting Prep | Claude Sonnet 4 | $0.18 |
| Post-Call Summary | Claude Sonnet 4 | $0.30 |
| **Total LLM** | | **$2.45/week = ~$10/month** |

### With Model Cascade Optimization (Haiku first, Sonnet for top 30%)

| Agent | Primary Model | Cascade Model | Weekly Cost |
|-------|--------------|--------------|------------|
| Prospect Research | Haiku | Sonnet (top 30%) | $0.21 |
| Email Draft | Haiku | Sonnet (top 30%) | $0.42 |
| CRM Enrichment | Haiku | N/A | $0.02 |
| Meeting Prep | Sonnet | N/A | $0.18 |
| Post-Call Summary | Sonnet | N/A | $0.30 |
| **Total LLM** | | | **$1.13/week = ~$4.50/month** |

---

## INFRASTRUCTURE PRICING TIERS

### Tier 1: Budget Self-Hosted (~$30/mo)
Railway Hobby ($5) + n8n Self-Hosted on Railway ($0) + LLM APIs (~$10) + HubSpot Free ($0) + Apollo Free ($0) + MillionVerifier (~$4) + Supabase Free ($0) = ~$19-30/mo

### Tier 2: Hybrid Recommended (~$60/mo)
n8n Cloud ($24) + Railway ($5) + LLM APIs (~$10-15) + HubSpot Free ($0) + Apollo Free ($0) + MillionVerifier (~$4) = ~$43-48/mo + optional Apollo Basic ($49) = ~$92-97/mo

### Tier 3: SaaS Comfort (~$150/mo)
Zapier Professional ($49) + LLM APIs (~$15) + HubSpot Free ($0) + Apollo Basic ($49) + Airtable Plus ($20) + MillionVerifier (~$4) = ~$137-150/mo

### Hosting Options Comparison

| Platform | Monthly Cost | Best For |
|----------|-------------|----------|
| Railway | $5/mo (Hobby) | Easiest deployment from GitHub |
| Render | $7/mo (Starter) | Good alternative to Railway |
| DigitalOcean | $6/mo (Basic Droplet) | Cheapest always-on VPS |
| Vercel | Free (Hobby) | Serverless/cron agents, Next.js projects |
| Fly.io | $0-5/mo (Free tier) | Global edge deployment |

---

## ALL ARTIFACTS CREATED

1. Framework Decision Guide (L1)
2. Orchestrator Selection Guide + First Workflow Template (L2)
3. Prospect Research Agent Spec (L3)
4. Email Draft Agent Spec (L4)
5. CRM Enrichment Agent Spec (L5)
6. Meeting Prep Agent Spec (L6)
7. Post-Call Summary Agent Spec (L7)
8. Architecture Decision Guide (L8)
9. Token Economics Calculator (L9)
10. Security & Compliance Checklist (L10)
11. Dual-Context Prompt Library (L11)
12. Custom Agent Stack Blueprint (L12) — compiles all above

**Completion Badge:** "AI Agent Architect" — 250 XP
