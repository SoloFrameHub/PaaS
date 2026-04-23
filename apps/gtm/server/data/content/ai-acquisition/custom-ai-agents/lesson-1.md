---
title: "Agent Frameworks: LangChain vs CrewAI vs AutoGen vs Claude SDK"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 1
---

## The $40K Mistake

Sarah spent six months building a "smart SDR agent" using LangChain. She followed every tutorial, integrated 15 tools, set up LangSmith observability, and deployed to production.

Total meetings booked: **3**.

The problem? She'd built a Formula 1 car when she needed a bicycle.

Her agent had 700+ possible tool integrations, stateful conversation graphs, and production-grade error handling. But her actual need was simple: take a CSV of 50 prospects per week, research them, draft personalized emails, and save to her CRM.

A direct API call + n8n workflow would've taken 4 hours to build and cost $2/month to run.

Instead, she spent $40K in opportunity cost (6 months not selling) plus $200/month on infrastructure she didn't need.

**The central question of this lesson:** When do you need a framework, and when is a framework just expensive complexity?

<InsightCard icon="🎯" title="The Framework Paradox">
The more mature the framework, the more it can do — and the more ways it can distract you from shipping. For solo founders, the best agent is the one that runs tomorrow, not the one that's "production-ready" in six months.
</InsightCard>

---

## What Is an "AI Agent" in Sales?

Before we compare frameworks, let's define what we're actually building.

<FlipCard 
  front="AI Agent (Sales Context)" 
  back="An LLM-powered program that takes a goal, accesses tools (APIs, databases, web), makes decisions in a loop, and produces an output. Not just a prompt — a system with autonomy, tool use, and memory." 
/>

**The anatomy of a sales agent:**

1. **Trigger** — New CRM contact, scheduled time, incoming email, webhook
2. **Context Gathering** — Pull data from LinkedIn, CRM, news APIs, company websites
3. **LLM Decision** — "Based on this data, what should I do next?"
4. **Tool Execution** — Call APIs, write to databases, send emails, update CRM
5. **Loop or Terminate** — Repeat steps 3-4 until goal achieved or max iterations hit
6. **Output** — Research brief, email draft, CRM update, Slack notification

<RangeSlider 
  label="How complex are your current sales workflows?" 
  min={1} 
  max={10} 
  lowLabel="Single-step (e.g., send email)" 
  highLabel="Multi-step (research → draft → review → send)" 
  persistKey="custom-ai-agents-L1-complexity" 
/>

---

## The Complexity Ladder: Where Do You Actually Need to Be?

Most solo founders start at Level 4 when they should start at Level 1.

<SlideNavigation>
<Slide title="Level 1: Direct API Call">

**What it is:** A single LLM API call with a prompt. No framework. No orchestration. Just `call_llm(prompt)`.

**Example:**
```python
# Prospect research in 10 lines
def research_prospect(name, company):
    prompt = f"Generate a 1-page brief for {name} at {company}..."
    return openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
```

**When to use:** Single-step tasks. No tool calling. No memory needed.

**Solo founder fit:** ⭐⭐⭐⭐⭐ Start here. 80% of "agents" can be this simple.

</Slide>

<Slide title="Level 2: Single Agent with Tools">

**What it is:** One LLM that can call functions/tools (search web, query database, send email). Uses function calling or tool-use APIs.

**Example:** Prospect research agent that can search LinkedIn, fetch company data from Crunchbase, and save to CRM.

**When to use:** Multi-step tasks where the LLM needs to decide which tool to use next.

**Solo founder fit:** ⭐⭐⭐⭐ This is where Claude SDK or LangChain start to add value.

</Slide>

<Slide title="Level 3: Multi-Agent Pipeline">

**What it is:** Multiple specialized agents that pass work between each other. "Researcher" → "Writer" → "Reviewer."

**Example:** Agent 1 researches prospect → Agent 2 drafts email → Agent 3 checks for spam triggers → Agent 4 saves to CRM.

**When to use:** Complex workflows where different steps need different prompts/models/tools.

**Solo founder fit:** ⭐⭐⭐ CrewAI shines here. But ask: do you really need 4 agents, or just 4 steps in one workflow?

</Slide>

<Slide title="Level 4: Stateful Conversational Agents">

**What it is:** Agents that maintain conversation history, adapt based on previous interactions, and handle complex branching logic.

**Example:** An agent that conducts a multi-turn discovery call, remembers what the prospect said, and adjusts questions dynamically.

**When to use:** Interactive, conversational use cases. Human-in-the-loop scenarios.

**Solo founder fit:** ⭐⭐ AutoGen or LangGraph. Rarely needed for solo founder sales automation.

</Slide>
</SlideNavigation>

<ExampleCard label="Reality Check: Sarah's Mistake">
Sarah built a Level 4 agent (LangGraph with stateful conversation memory and 15 tool integrations) for a Level 1 problem (generate research briefs from CSV data).

Her agent could handle complex multi-turn conversations and adapt to unexpected inputs. But her actual workflow was: CSV → research → save to CRM. No conversation. No branching. No state.

A 10-line Python script would've worked.
</ExampleCard>

<ClassifyExercise
  title="Classify These Use Cases by Complexity Level"
  persistKey="custom-ai-agents-L1-classify"
  categories={[
    { id: "level1", label: "Level 1: Direct API", color: "#10b981" },
    { id: "level2", label: "Level 2: Single Agent + Tools", color: "#f59e0b" },
    { id: "level3", label: "Level 3: Multi-Agent", color: "#ef4444" },
    { id: "level4", label: "Level 4: Stateful/Conversational", color: "#8b5cf6" }
  ]}
  items={[
    { id: "1", content: "Generate a cold email from a prospect's LinkedIn profile", correctCategory: "level1" },
    { id: "2", content: "Research a prospect by searching LinkedIn, Crunchbase, and Google News, then draft an email", correctCategory: "level2" },
    { id: "3", content: "Research → Draft → Lint for spam → Save to CRM, with different agents for each step", correctCategory: "level3" },
    { id: "4", content: "Conduct a multi-turn discovery call where the agent asks follow-up questions based on answers", correctCategory: "level4" },
    { id: "5", content: "Enrich 100 CRM contacts with company size and funding data", correctCategory: "level1" },
    { id: "6", content: "Monitor a prospect's LinkedIn activity and send a DM when they post about a relevant topic", correctCategory: "level2" }
  ]}
/>

---

## Framework Comparison: The Solo Founder Lens

Now let's compare the four major frameworks through the lens of **what solo founders actually need**.

<InsightCard icon="💡" title="The Solo Founder Framework Criteria">
1. **Time to first working agent:** Can you ship in hours, not weeks?
2. **Cost at 50-200 prospects/week:** What's the monthly bill?
3. **Debugging complexity:** When it breaks, can you fix it yourself?
4. **Lock-in risk:** Can you switch models or migrate to a different framework?
5. **Overkill factor:** Are you paying (in complexity) for features you'll never use?
</InsightCard>

### LangChain: The Swiss Army Knife

**What it is:** The most mature agent framework. 700+ tool integrations. LangGraph for stateful agents. LangSmith for observability.

**Strengths:**
- Largest ecosystem — if a tool exists, LangChain probably has an integration
- Production-grade observability with LangSmith (trace every LLM call, debug failures)
- Active community, extensive docs, frequent updates

**Weaknesses:**
- **High complexity** — abstractions on abstractions. The "simple" example is 50 lines.
- **Frequent breaking changes** — LangChain v0.1 → v0.2 broke most tutorials
- **Overkill for simple agents** — You're importing a library that can orchestrate 20-agent swarms when you just need to call one API

<FlipCard 
  front="When to Use LangChain" 
  back="You need 10+ tool integrations, production observability, or you're building a product (not just automating your own sales). For solo founders: probably not your first choice." 
/>

**Time to first agent:** 4-8 hours (learning curve)  
**Cost:** Free (framework) + LangSmith $39/mo (optional observability)  
**Solo founder fit:** ⭐⭐ (powerful but heavy)

---

### CrewAI: The Role-Based Team

**What it is:** Multi-agent framework where you define agents with specific roles (Researcher, Writer, Reviewer) that collaborate to complete tasks.

**Strengths:**
- **Intuitive mental model** — "I need a researcher and a writer" maps directly to code
- **Built for multi-agent workflows** — passing context between agents is native
- **Simpler than LangChain** for multi-step pipelines

**Weaknesses:**
- **Less flexible for single-agent use cases** — if you just need one agent, CrewAI adds unnecessary structure
- **Smaller ecosystem** — fewer pre-built integrations than LangChain
- **Still relatively new** — less battle-tested than LangChain

<FlipCard 
  front="When to Use CrewAI" 
  back="You have a clear multi-agent workflow (research → draft → review) and want role-based separation. Great for Level 3 complexity. Overkill for Level 1-2." 
/>

**Time to first agent:** 3-6 hours  
**Cost:** Free (open source)  
**Solo founder fit:** ⭐⭐⭐ (good for multi-agent, but ask if you need multi-agent)

---

### AutoGen: The Conversational Swarm

**What it is:** Microsoft's multi-agent framework where agents "talk" to each other to solve problems. Designed for complex reasoning and human-in-the-loop workflows.

**Strengths:**
- **Powerful for research/reasoning tasks** — agents debate and refine answers
- **Human-in-the-loop patterns** — built-in support for "ask the human" decision points
- **Strong for complex, non-deterministic problems**

**Weaknesses:**
- **Heavyweight** — even simple agents require significant setup
- **Enterprise-oriented** — designed for teams, not solo founders
- **Overkill for sales automation** — you're building a conversational swarm when you just need to draft emails

<FlipCard 
  front="When to Use AutoGen" 
  back="You're solving complex research problems or need agents to debate/refine outputs. For solo founder sales automation: almost never the right choice." 
/>

**Time to first agent:** 6-10 hours  
**Cost:** Free (open source)  
**Solo founder fit:** ⭐ (powerful but not designed for your use case)

---

### Claude Agent SDK: The Anthropic-First Path

**What it is:** Anthropic's official SDK for building agents with Claude models. Tight integration with Claude's tool-use and computer-use capabilities.

**Strengths:**
- **Lowest learning curve** — if you can call the Claude API, you can build an agent
- **Best-in-class tool calling** — Claude Sonnet 4 has the most reliable function calling
- **Simple, clean abstractions** — no framework bloat
- **Official support** — maintained by Anthropic, won't break with model updates

**Weaknesses:**
- **Locked to Claude** — can't easily switch to GPT-4 or other models
- **Smaller ecosystem** — fewer pre-built integrations than LangChain
- **Newer** — less community content and examples

<FlipCard 
  front="When to Use Claude SDK" 
  back="You're building Claude-first agents (which you should be — Claude Sonnet 4 is the best sales agent model). You want simplicity over flexibility. Perfect for Level 1-2 complexity." 
/>

**Time to first agent:** 2-4 hours  
**Cost:** Free (SDK) + Claude API costs (~$0.01-0.05 per agent run)  
**Solo founder fit:** ⭐⭐⭐⭐⭐ (the sweet spot for most solo founders)

---

## The Framework Decision Matrix

<StrategyDuel
  title="Framework Selection: The Solo Founder Reality"
  persistKey="custom-ai-agents-L1-duel"
  scenario="You want to build a prospect research agent that runs 50 times per week."
  strategyA={{ 
    name: "LangChain + LangGraph", 
    description: "Full framework with observability and 700+ integrations", 
    pros: ["Production-grade observability", "Massive ecosystem", "Can scale to complex multi-agent"], 
    cons: ["4-8 hour learning curve", "Overkill for simple agents", "Frequent breaking changes", "$39/mo for LangSmith"] 
  }}
  strategyB={{ 
    name: "Claude SDK + n8n", 
    description: "Direct Claude API calls orchestrated by n8n workflow", 
    pros: ["2-4 hour time to first agent", "Simple, debuggable", "No framework lock-in", "Free (just API costs)"], 
    cons: ["No built-in observability", "Manual integration work", "Claude-only (but that's fine)"] 
  }}
  expertVerdict="For solo founders: Strategy B wins 90% of the time. You don't need LangChain's power until you're running 10+ agents in production. Start simple, graduate to frameworks only when you hit their limits."
/>

<ConceptReframe
  concept="Agent Frameworks"
  defaultLens="technical-founder"
  lenses={[
    { 
      id: "technical-founder", 
      label: "Technical Founder", 
      explanation: "Think of frameworks like web frameworks (Rails, Django, Next.js). You don't need Rails to build a landing page — you need it when you're building a complex app with auth, database, background jobs, etc. Same with agent frameworks: start with vanilla API calls, graduate to frameworks when complexity demands it." 
    },
    { 
      id: "coach", 
      label: "Coach/Consultant", 
      explanation: "Frameworks are like business systems. You don't need a CRM with pipeline automation and forecasting when you have 5 clients — a spreadsheet works fine. But at 50 clients, you need the system. Same with agents: start manual (direct API), systematize when volume demands it." 
    },
    { 
      id: "creator", 
      label: "Content Creator", 
      explanation: "Frameworks are like video editing software. You don't need Premiere Pro to make YouTube videos — you can start with iMovie or even your phone. But when you're editing 10 videos/week with complex effects, you upgrade. Same with agents: start simple, upgrade when you're shipping agents weekly." 
    }
  ]}
/>

---

## The Solo Founder Framework Selection Guide

Here's the decision tree for choosing your framework:

<DecisionTree
  title="Which Framework Should You Use?"
  persistKey="custom-ai-agents-L1-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "How many agents are you building in the next 3 months?", 
      choices: [
        { label: "1-2 agents", nextNodeId: "simple" },
        { label: "3-5 agents", nextNodeId: "medium" },
        { label: "6+ agents or building a product", nextNodeId: "complex" }
      ]
    },
    { 
      id: "simple", 
      content: "Do you need multi-agent collaboration (agents passing work to each other)?", 
      choices: [
        { label: "No, just single-step or simple workflows", nextNodeId: "direct-api" },
        { label: "Yes, multi-step pipelines", nextNodeId: "orchestrator" }
      ]
    },
    { 
      id: "direct-api", 
      content: "✅ Use Direct API Calls (no framework). Orchestrate with n8n or Zapier if needed. This is 80% of solo founder use cases.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "orchestrator", 
      content: "Are you comfortable writing code, or do you prefer visual builders?", 
      choices: [
        { label: "Visual builder preferred", nextNodeId: "n8n" },
        { label: "Code-first", nextNodeId: "claude-sdk" }
      ]
    },
    { 
      id: "n8n", 
      content: "✅ Use n8n (visual workflow builder) + direct Claude API calls. No framework needed.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "claude-sdk", 
      content: "✅ Use Claude Agent SDK. Simple, clean, and perfect for 1-5 agents.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "medium", 
      content: "Do you need role-based agent collaboration (Researcher → Writer → Reviewer)?", 
      choices: [
        { label: "Yes, clear role separation", nextNodeId: "crewai" },
        { label: "No, just sequential steps", nextNodeId: "claude-sdk-medium" }
      ]
    },
    { 
      id: "crewai", 
      content: "✅ Use CrewAI. Built for multi-agent role-based workflows.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "claude-sdk-medium", 
      content: "✅ Use Claude SDK or n8n. You don't need a framework yet.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "complex", 
      content: "Do you need production observability (trace every LLM call, debug failures, monitor costs)?", 
      choices: [
        { label: "Yes, this is a product or high-volume operation", nextNodeId: "langchain" },
        { label: "No, just building for myself", nextNodeId: "crewai-complex" }
      ]
    },
    { 
      id: "langchain", 
      content: "✅ Use LangChain + LangSmith. You're at the complexity level where the framework pays for itself.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "crewai-complex", 
      content: "✅ Use CrewAI or Claude SDK. Start simple, graduate to LangChain only if you hit limits.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

---

## The "No Framework" Approach: Direct API + Orchestrator

Let's build a real prospect research agent with **zero framework** — just direct API calls orchestrated by n8n.

<ExampleCard label="Real Example: Prospect Research Agent (No Framework)">

**Goal:** When a new contact is added to CRM, generate a 1-page research brief.

**Architecture:**
1. **Trigger:** CRM webhook (new contact added)
2. **Data gathering:** Fetch LinkedIn data (Evaboot export), company data (Clearbit API), recent news (Google News API)
3. **LLM call:** Claude Sonnet 4 API with research prompt
4. **Output:** Save brief to CRM, notify Slack

**Implementation:** n8n workflow (visual, no code)

**Cost:** $0.01-0.02 per prospect (just Claude API)

**Time to build:** 2-3 hours

**Lines of code:** 0 (it's a visual workflow)

</ExampleCard>

Here's the same agent as a Python script (if you prefer code):

```python
# prospect_research_agent.py
# No framework — just direct API calls

import anthropic
import requests

def research_prospect(name, company, linkedin_url):
    # Step 1: Gather data
    linkedin_data = fetch_linkedin(linkedin_url)  # Your data source
    company_data = fetch_company(company)          # Clearbit API
    news = fetch_news(company)                     # Google News API
    
    # Step 2: Build prompt
    prompt = f"""You are a sales research assistant.
    Generate a 1-page prospect brief for:
    
    Name: {name}
    Company: {company}
    LinkedIn: {linkedin_data}
    Company Info: {company_data}
    Recent News: {news}
    
    Output format:
    1. Prospect Overview (role, tenure, background)
    2. Company Context (size, stage, recent events)
    3. Pain Signals (based on role + company stage)
    4. Connection Points (shared interests, mutual connections)
    5. Recommended Outreach Angle
    
    If information is unavailable, write "Not found" rather than guessing.
    """
    
    # Step 3: Call Claude
    client = anthropic.Anthropic(api_key="your-key")
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        temperature=0.3,
        messages=[{"role": "user", "content": prompt}]
    )
    
    brief = response.content[0].text
    
    # Step 4: Save to CRM
    save_to_crm(name, brief)
    
    return brief

# That's it. No framework. 30 lines of code.
```

<InsightCard icon="🚀" title="The 80/20 Rule for Solo Founders">
80% of your agent needs can be met with direct API calls + an orchestrator (n8n/Zapier). The remaining 20% might need a framework — but start simple and graduate only when you hit real limits.
</InsightCard>

---

## When to Graduate to a Framework

You'll know it's time to use a framework when you experience these pain points:

<ProgressiveReveal title="Framework Graduation Signals" persistKey="custom-ai-agents-L1-reveal">

<RevealSection title="Signal 1: You're Building 5+ Agents">
When you have 5+ agents in production, you start needing:
- Shared prompt templates
- Centralized logging
- Consistent error handling
- Reusable tool integrations

**Framework that helps:** LangChain or CrewAI

</RevealSection>

<RevealSection title="Signal 2: You Need Complex Multi-Agent Workflows">
When agents need to pass context to each other, make decisions about which agent to call next, or collaborate on a task.

**Example:** Research agent → finds 3 pain signals → calls 3 different email-drafting agents (one per pain signal) → review agent picks the best draft.

**Framework that helps:** CrewAI (role-based) or LangGraph (stateful)

</RevealSection>

<RevealSection title="Signal 3: You're Debugging Agent Failures Weekly">
When you can't figure out why an agent failed without extensive logging and tracing.

**Framework that helps:** LangChain + LangSmith (observability)

</RevealSection>

<RevealSection title="Signal 4: You're Building a Product (Not Just Automating Your Own Sales)">
When you're selling agent-powered software to others, you need production-grade reliability, observability, and scalability.

**Framework that helps:** LangChain (most mature) or AutoGen (if conversational)

</RevealSection>

<RevealSection title="Signal 5: You're Switching Models Frequently">
When you need to A/B test GPT-4 vs Claude vs Gemini, and want to swap models without rewriting code.

**Framework that helps:** LangChain (model-agnostic abstractions)

</RevealSection>

</ProgressiveReveal>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You're probably tempted to start with LangChain because it's "the right way" to build agents. Resist. Your engineering instinct to build scalable systems is a liability here — you need to ship fast, not build for scale you don't have yet. Start with direct API calls. Graduate to frameworks only when you feel the pain.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches/Consultants">
Think of frameworks like hiring a VA vs doing it yourself. You don't hire a VA to send 5 emails/week — you do it yourself. But at 50 emails/week, you hire help. Same with frameworks: start doing it yourself (direct API), hire the framework (LangChain/CrewAI) only when volume demands it.
</ContextualNote>

---

## Cost Comparison: Framework vs No-Framework

Let's compare the total cost of ownership for a simple 3-agent system (research, email draft, CRM enrichment) running 50 prospects/week.

<ScenarioSimulator
  title="Agent Cost Calculator: Framework vs No-Framework"
  persistKey="custom-ai-agents-L1-simulator"
  levers={[
    { id: "prospects", label: "Prospects per week", min: 10, max: 500, step: 10, defaultValue: 50 },
    { id: "agents", label: "Number of agents", min: 1, max: 10, step: 1, defaultValue: 3 }
  ]}
  outputs={[
    { 
      id: "noframework", 
      label: "No-Framework Cost (Claude API + n8n)", 
      formula: "(prospects * agents * 0.02) + 0", 
      unit: "$/month", 
      precision: 2 
    },
    { 
      id: "langchain", 
      label: "LangChain + LangSmith Cost", 
      formula: "(prospects * agents * 0.02) + 39", 
      unit: "$/month", 
      precision: 2 
    },
    { 
      id: "crewai", 
      label: "CrewAI Cost (open source)", 
      formula: "(prospects * agents * 0.02) + 0", 
      unit: "$/month", 
      precision: 2 
    }
  ]}
  insight="At `{prospects}` prospects/week with `{agents}` agents, no-framework costs $`{noframework}`/month vs LangChain at $`{langchain}`/month. The $39 LangSmith fee only makes sense if you're debugging failures weekly or building a product."
/>

**Key insight:** For solo founders running &lt;200 prospects/week, the framework cost (LangSmith observability) is often higher than the API cost. Start without it.

---

## Your Framework Decision

Now it's your turn to choose.

<TemplateBuilder
  title="Your Framework Selection"
  persistKey="custom-ai-agents-L1-framework"
  sections={[
    {
      id: "context",
      title: "Your Context",
      fields: [
        { 
          id: "agents", 
          label: "How many agents do you plan to build in the next 3 months?", 
          placeholder: "e.g., 3 agents: research, email draft, meeting prep", 
          type: "text" 
        },
        { 
          id: "volume", 
          label: "How many prospects/week will you process?", 
          placeholder: "e.g., 50-100 prospects/week", 
          type: "text" 
        },
        { 
          id: "technical", 
          label: "Are you comfortable writing code? (yes/no/prefer visual)", 
          placeholder: "e.g., yes, but prefer visual for speed", 
          type: "text" 
        },
        { 
          id: "complexity", 
          label: "Do you need multi-agent collaboration? (yes/no)", 
          placeholder: "e.g., no, just sequential steps", 
          type: "text" 
        }
      ]
    },
    {
      id: "decision",
      title: "Your Framework Choice",
      fields: [
        { 
          id: "framework", 
          label: "Based on your answers, which framework will you start with?", 
          placeholder: "e.g., Direct API + n8n (no framework)", 
          type: "text" 
        },
        { 
          id: "reasoning", 
          label: "Why is this the right choice for you?", 
          placeholder: "e.g., I'm building 2-3 simple agents, want to ship fast, and don't need observability yet", 
          type: "textarea" 
        },
        { 
          id: "graduation", 
          label: "What would trigger you to graduate to a more complex framework?", 
          placeholder: "e.g., If I'm building 5+ agents or debugging failures weekly", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## Summary: The Solo Founder Framework Philosophy

<InsightCard icon="🎯" title="The Core Principle">
**Frameworks are for scale, not for starting.** Start with the simplest thing that works (direct API + orchestrator). Graduate to frameworks only when you feel the pain of not having them.
</InsightCard>

**The framework ladder for solo founders:**

1. **0-2 agents:** Direct API calls + n8n/Zapier (no framework)
2. **3-5 agents:** Claude SDK or CrewAI (if multi-agent)
3. **6+ agents or product:** LangChain + LangSmith (observability matters)

**Framework comparison summary:**

| Framework | Best For | Solo Founder Fit | When to Use |
|-----------|----------|------------------|-------------|
| **None (Direct API)** | 1-2 simple agents | ⭐⭐⭐⭐⭐ | Start here. 80% of use cases. |
| **Claude SDK** | 1-5 agents, Claude-first | ⭐⭐⭐⭐⭐ | Simple tool-calling agents |
| **CrewAI** | Multi-agent role-based workflows | ⭐⭐⭐ | Clear role separation needed |
| **LangChain** | 6+ agents, production observability | ⭐⭐ | Building a product or high-volume |
| **AutoGen** | Complex reasoning, conversational | ⭐ | Rarely needed for sales automation |

<InteractiveChecklist 
  title="Your Action Items" 
  persistKey="custom-ai-agents-L1-actions" 
  items={[
    "Complete the Framework Selection template above",
    "If choosing 'no framework': Set up n8n (cloud trial or self-hosted) and connect to Claude API",
    "If choosing Claude SDK: Install the SDK and run the 'Hello World' example from Anthropic docs",
    "If choosing CrewAI: Install CrewAI and run the basic multi-agent example",
    "Sketch your first agent on paper: trigger → data sources → LLM prompt → output",
    "Estimate cost: [prospects/week] × [agents] × $0.02 = monthly API cost"
  ]} 
/>

---

## Quiz: Test Your Framework Knowledge

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "You're building a single agent that researches prospects and drafts emails. It will run 50 times/week. Which framework should you start with?",
      "options": [
        "LangChain + LangSmith for production observability",
        "CrewAI for multi-agent collaboration",
        "Direct Claude API calls + n8n orchestrator",
        "AutoGen for conversational reasoning"
      ],
      "correctIndex": 2,
      "explanation": "This is a simple, single-agent use case with low volume. Direct API + orchestrator is the fastest path to shipping. LangChain is overkill, CrewAI is for multi-agent, AutoGen is for conversational."
    },
    {
      "id": "q2",
      "question": "When does it make sense to pay $39/month for LangSmith observability?",
      "options": [
        "When you're building your first agent",
        "When you're running 50 prospects/week",
        "When you're debugging agent failures weekly or building a product",
        "Never — observability is unnecessary for solo founders"
      ],
      "correctIndex": 2,
      "explanation": "LangSmith is valuable when you need to trace and debug complex agent failures, or when you're building a product for others. For simple agents at low volume, it's overkill."
    },
    {
      "id": "q3",
      "question": "You need to build a workflow where Agent 1 researches, Agent 2 drafts, and Agent 3 reviews. Which framework is best suited?",
      "options": [
        "Direct API calls (no framework)",
        "Claude SDK",
        "CrewAI",
        "AutoGen"
      ],
      "correctIndex": 2,
      "explanation": "CrewAI is designed for role-based multi-agent workflows. This is exactly its use case. Direct API could work but requires more orchestration logic. Claude SDK is single-agent focused."
    },
    {
      "id": "q4",
      "question": "What's the main weakness of starting with LangChain for your first agent?",
      "options": [
        "It's too expensive",
        "It doesn't support Claude models",
        "The learning curve delays shipping",
        "It can't handle multi-agent workflows"
      ],
      "correctIndex": 2,
      "explanation": "LangChain's main cost for solo founders is time — the 4-8 hour learning curve delays shipping. For simple agents, direct API calls get you to production in 2-3 hours."
    },
    {
      "id": "q5",
      "question": "True or False: Most solo founder agent use cases (80%) can be solved with direct API calls + an orchestrator, no framework needed.",
      "options": [
        "True",
        "False"
      ],
      "correctIndex": 0,
      "explanation": "True. The vast majority of solo founder agents are simple: trigger → data gathering → LLM call → output. This doesn't require a framework. Frameworks add value at higher complexity (5+ agents, multi-agent collaboration, production observability)."
    }
  ]
}
```

---

**Next Lesson Preview:** In Lesson 2, we'll dive into orchestrators (n8n, Trigger.dev, Zapier, Make) and build your first agent workflow — the Prospect Research Agent — with zero framework code.