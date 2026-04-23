<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Prompt 7 – Building Custom AI Sales Agents

Working course title:
Building Custom AI Sales Agents as a Technical Solo Founder
Upgraded research brief:
Provide a practical, architecture-level guide to building custom AI agents for sales and customer acquisition in 2026, assuming a technical solo founder comfortable with APIs and basic infra.
Cover:
Frameworks \& platforms
LangChain, CrewAI, AutoGen, Claude Agent SDK, plus lower-code orchestrators (e.g., n8n, Trigger.dev with LLM calls) and when to use each.
Core agent use cases
Prospect research agent, email first-draft agent, CRM enrichment agent, meeting prep agent, post-call summary agent.​
For each, provide: inputs, outputs, tools, and where human review is required.
Reference architectures
High-level diagrams (to be drawn later) of:
Data flows from LinkedIn/CSV/web to enrichment to AI to outreach system.
Self-hosted vs SaaS-based setups (e.g., VPS + Coolify/n8n vs Zapier/Make + SaaS tools).
Cost of running custom agents
Typical token usage and cost ranges for different workloads (daily research, personalization batches, summarization) using mainstream LLM APIs.
Infra cost examples from your own VPS stack (~\$50/month hosting multiple apps and automations vs \$200–\$400 for SaaS equivalents).
Security, compliance, and data hygiene
Guidance on handling PII, API keys, CRM data, and logs for a one-person shop.
Dual-context agent examples
B2B: agent that preps for discovery calls with company/org context.
Creator: agent that analyzes a subscriber’s content and suggests tailored offers or nurturing paths.

A technical solo founder in 2026 should treat “AI sales agents” as **small, composable services** wired into an existing stack (CRM + email + calendar), not as a single monolithic bot that “does sales for you.”[^1][^2]

***

## Frameworks \& platforms (when to use what)

**Code-heavy / maximum control:**

- **LangChain / LangGraph** – Best when you want:
    - RAG over your own notes/CRM, lots of API integrations (600+ connectors), and fine control over memory and tools.[^3][^1]
    - Use for: prospect research agent, CRM enrichment agent, meeting prep/post‑call agents wired into your own DB.
- **AutoGen** (Microsoft) – Good for:
    - Multi‑agent workflows and tasks that involve code execution, debugging, or calling many tools in sequence.[^4][^1]
    - Use for: more complex “research + write + test + send to review” flows, especially if you’re already on Azure.

**Opinionated multi‑agent:**

- **CrewAI** – Best when:
    - You want structured, approval-heavy flows (e.g., researcher → writer → reviewer) with human checkpoints.[^4][^1]
    - Use for: outbound content generation with explicit “human approval” stages (first-draft email agent, sequence writer).

**Claude Agent SDK:**

- Anthropic’s **Claude Agent SDK** (open source) lets you build autonomous agents with built‑in tool calls (web, files, code, deployment).[^5][^6][^7]
- Particularly strong for:
    - Long‑running research agents, “deep account brief” tools, and post‑call analysis (Claude 4.x/4.5 handle long contexts and multi‑step reasoning well).[^8]

**Lower‑code orchestrators (wrap your agents):**

- **n8n / Trigger.dev / Zapier / Make**:
    - Use them as **event buses**: “new lead in CRM” → call your LangChain/Claude agent → write results back to CRM → notify you.
    - n8n/Trigger.dev are ideal if you’re comfortable deploying a worker or using a managed cloud.

**Rule of thumb:**

- Start with **one framework** (often LangChain or Claude Agent SDK) plus **one orchestrator** (n8n or Trigger.dev). Add multi‑agent frameworks (CrewAI/AutoGen) only when you can’t express a flow as “LLM + tools + a few steps.”[^9][^1][^3]

***

## Core sales agents: inputs, outputs, tools, human gate

### 1. Prospect research agent

- **Goal:** Turn a LinkedIn URL/company domain into a 1‑page brief.
- **Inputs:**
    - LinkedIn profile URL, company website, maybe last 3–5 blog posts/news items.
- **Outputs:**
    - Company summary, ICP match reasoning, 3–5 likely pains, key recent events, 2–3 conversation angles.[^2]
- **Tools:**
    - LangChain or Claude Agent SDK + HTTP fetcher + HTML/text parser + optional SERP API.[^1][^8]
- **Human review:**
    - You skim the brief for tone/accuracy and decide whether to contact and which angle to use.


### 2. Email first-draft agent

- **Goal:** Draft cold/warm outreach emails from profile + research.
- **Inputs:**
    - Prospect brief, your offer template, prior thread (if warm), ICP definition, and a library of your own past emails for style.[^2]
- **Outputs:**
    - Subject, first line anchored to a **real signal**, body that follows your outreach structure, and CTA.[^2]
- **Tools:**
    - Claude Agent SDK or LangChain with a style prompt + optional few‑shot examples.
- **Human review:**
    - Mandatory: you approve, tweak, or rewrite before sending; **no autonomous send** from this agent.


### 3. CRM enrichment agent

- **Goal:** Fill missing ICP fields and score leads.
- **Inputs:**
    - CRM record (name, company, role, URL, email) + your written ICP and scoring rubric.[^2]
- **Outputs:**
    - Normalized fields (industry, size, tech stack, persona), 1–10 fit score, tags (e.g., “bootstrapped SaaS,” “YouTube creator with cohort course”).[^2]
- **Tools:**
    - n8n/Trigger.dev webhook → LangChain/Claude Agent → external enrichment APIs (Clearbit/PDL/Ocean/Hunter/etc.) → CRM API.[^10][^11][^12]
- **Human review:**
    - Spot‑check scores on new segments; adjust rubric or prompts as you see misclassifications.


### 4. Meeting prep agent

- **Goal:** Prep for discovery/enrollment calls.
- **Inputs:**
    - Prospect record, last emails, their site/LinkedIn, and any pre‑call questionnaire answers.[^2]
- **Outputs:**
    - 1‑page call brief:
        - Who they are, current state, likely urgencies, suggested questions, potential landmines, and a mini agenda.[^13][^2]
- **Tools:**
    - Claude/LangChain with your **MVQ/ICP frameworks** embedded as instructions, optional DISC‑style guess.[^14]
- **Human review:**
    - You choose which questions to ask and how to adapt on the call.


### 5. Post‑call summary agent

- **Goal:** Turn raw transcript into usable notes and follow‑ups.
- **Inputs:**
    - Otter/Fathom/Zoom transcript + calendar event meta + your deal stage definitions.[^2]
- **Outputs:**
    - Clean summary, pain/impact/decision notes, objections, next steps, email follow‑up draft, and updated opportunity fields.[^13][^2]
- **Tools:**
    - LangChain/Claude Agent SDK + transcript import + CRM API.
- **Human review:**
    - You check summary for errors, tweak follow‑up email, and confirm stage/amount changes.

***

## Reference architectures (high‑level flows)

### A. Data flow: LinkedIn/CSV/web → enrichment → AI → outreach

1. **Ingestion**
    - Sources: Sales Navigator (manual export or Kanbox), CSV uploads, website forms, events.[^2]
    - Stored in: Postgres/Notion/Airtable or directly in your CRM.
2. **Enrichment**
    - n8n pipeline:
        - For each new record: call Clay/Apollo/Ocean/Hunter/Dropcontact APIs for emails + firmographics + social links.[^11][^12][^15][^16]
        - Store enriched data back to DB/CRM.
3. **AI scoring + research**
    - Event “record enriched” → LangChain/Claude agent:
        - Compute ICP score (1–10) and tags.[^2]
        - Optionally run prospect research to produce a 1‑page brief for high‑scorers.
4. **AI drafting**
    - For ICP≥7 records, call email first‑draft agent for a suggested email or DM.[^2]
5. **Human gate + send**
    - You review drafts in a simple UI (internal tool, CRM widget, or even a Google Sheet) and approve/modify before pushing to:
        - Outbound sequencer (Instantly/Smartlead/Lemlist/Apollo), or
        - Manual send via Gmail/Outlook for top‑tier leads.[^2]

### B. Self‑hosted vs SaaS orchestration

**Self‑hosted (VPS + Coolify/n8n/custom app):**

- Stack:
    - VPS (e.g., Hetzner/DO/Linode), ~2–4GB RAM + storage.
    - Coolify/Docker for deployments.
    - n8n for workflows, Postgres for data, and a small FastAPI/Next app as your UI.
- Cost:
    - ~**\$30–\$60/month** covers n8n, 1–2 internal apps, and light DB use when tuned well.[^17]

**SaaS‑based (Zapier/Make + SaaS tools):**

- Stack:
    - Zapier/Make for orchestration, hosted LangChain/agent services, Airtable/Notion, CRM SaaS.
- Cost:
    - Realistic solo founder spend for “serious” use tends to land around **\$200–\$400/month** once you include volume limits, extra zaps/scenarios, and premium features.[^17][^2]

**Trade‑off:**

- Self‑hosted = cheaper per unit at the cost of your time and needing to monitor infra.
- SaaS = faster to ship, better UX out of the box, but recurring spend climbs quickly if you run high‑volume research/personalization.

***

## Cost of running agents (LLM + infra)

**LLM token economics (2025–2026):**

- GPT‑5‑class models: around **\$1.25 per 1M input** and **\$12 per 1M output tokens**.[^18][^10]
- Gemini 2.5 Pro, Claude Sonnet 4.x, and Grok‑style mid‑tier models are in a similar or slightly lower band for many workloads.[^19][^10]

**Rough solo‑founder agent costs (per month):**

- Prospect research:
    - 1,000 leads/month × ~8k tokens/lead (fetch + reasoning) ≈ 8M tokens.
    - Ballpark: **\$15–\$40/month** depending on model and whether you compress responses.[^10]
- Email drafts:
    - 1,000 drafts × ~2k tokens each total (input+output) ≈ 2M tokens → **low‑teens \$** per month.
- Summarization (calls, content):
    - 40 calls × 10k tokens input each ≈ 0.4M tokens; newsletters/podcasts similar order of magnitude → **\$5–15/month**.

**Infra:**

- VPS hosting your agents/orchestrator: ~**\$50/month** can comfortably run several apps and workflows if you’re frugal.[^17]
- SaaS equivalents:
    - A mix of Zapier/Make, hosted LLM providers, and specialty tools easily reaches **\$200–\$400/month** once you add volume and extra seats.[^10][^2]

***

## Security, compliance, and data hygiene (solo version)

- **PII scope:**
    - Avoid sending full CRM dumps; send only what’s needed (first name, role, domain, public URLs, and relevant notes) to LLMs.
- **API keys:**
    - Store in environment variables or secret managers (Docker secrets, Coolify secrets, n8n credentials), never in code or repos.
- **Logs:**
    - Log prompts/responses only when necessary for debugging.
    - Mask emails/phone numbers or truncate content in persistent logs; keep detailed logs in short‑retention stores.
- **CRM data:**
    - Treat your CRM as **source of truth**, not the LLM. Agents read/write through a strict API layer with validation (no direct SQL writes from the model).
- **Compliance mindset:**
    - Add a simple “AI processing” note to your privacy policy.
    - Don’t send sensitive call content to 3rd‑party APIs if you’ve promised confidentiality without explicit consent.

***

## Dual-context agent examples

### B2B discovery‑prep agent

- **Input:**
    - Company URL, LinkedIn profile of buyer, recent news/job postings, CRM notes.[^2]
- **Output:**
    - Company overview, ICP fit assessment, tech stack guesses, key stakeholders, recent triggers (funding, new hires), suggested discovery questions aligned to your MVQ/Pain‑Impact‑Decision framework.[^13][^2]
- **Usage:**
    - Runs automatically before each discovery call; you read the brief and adjust.


### Creator/coach nurturing agent

- **Input:**
    - Subscriber email, social profiles, last 10 pieces of content they engaged with, forms/surveys, past purchases.
- **Output:**
    - Persona classification (“early‑stage creator with 1:1 coaching,” “course buyer who hasn’t launched”), their key topics, and **nurture suggestions**:
        - Next best piece of content.
        - Offer pathways (e.g., “webinar → cohort,” “free audit → DFY retainer”).
- **Usage:**
    - Triggers when a subscriber crosses a threshold (e.g., downloads 2 resources + attends a webinar), feeding into your email system as tags and recommended next sequence.

If you want, I can turn this into a concrete “minimal agent stack blueprint” with specific technologies (e.g., LangChain + n8n + Postgres) and a checklist you can drop straight into the course.
<span style="display:none">[^20][^21][^22][^23]</span>

<div align="center">⁂</div>

[^1]: https://sparkco.ai/blog/langchain-vs-crewai-vs-autogen-2025-deep-dive-comparison

[^2]: 07-chapter-07.md

[^3]: https://muoro.io/blog/langchain-vs-crewai

[^4]: https://www.instinctools.com/blog/autogen-vs-langchain-vs-crewai/

[^5]: https://www.opensourceforu.com/2025/10/anthropic-releases-open-source-claude-agent-sdk-alongside-claude-sonnet-4-5-breakthrough/

[^6]: https://www.deeplearning.ai/the-batch/anthropic-launches-claude-sonnet-4-5-and-claude-agent-sdk-overhauls-claude-code-for-developers/

[^7]: https://fastmcp.me/blog/anthropic-launches-claude-agent-sdk-now-everyone-can-build-ai-agents

[^8]: https://www.datacamp.com/tutorial/how-to-use-claude-agent-sdk

[^9]: https://www.nexaforge.dev/blog/news/ai-agent-frameworks-langchain-autogen-crewai-comparison

[^10]: https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025

[^11]: https://fullenrich.com/content/ocean-io-pricing

[^12]: https://www.g2.com/products/dropcontact/pricing

[^13]: 04-chapter-04.md

[^14]: APPENDIX-FRAMEWORK-INDEX.md

[^15]: https://fullenrich.com/content/clay-pricing

[^16]: https://persana.ai/blogs/apollo-io-pricing

[^17]: 00a-introduction.md

[^18]: https://intuitionlabs.ai/pdfs/llm-api-pricing-comparison-2025-openai-gemini-claude.pdf

[^19]: https://www.cloudidr.com/blog/llm-pricing-comparison-2026

[^20]: https://destinovaailabs.com/blog/best-architectures-to-build-agentic-ai-comparing-langchain-autogen-crewai-and-more/

[^21]: https://www.linkedin.com/pulse/langchain-vs-autogen-crewai-which-agent-framework-fits-uday-alney-xphmc

[^22]: https://www.youtube.com/watch?v=SU5rPALw1os

[^23]: https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen

