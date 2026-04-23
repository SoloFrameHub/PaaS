---
title: "Agent 2: Email First-Draft Agent"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 4
---

You've just built your first agent — the Prospect Research Agent that turns raw contact data into actionable intelligence. Now comes the moment of truth: **turning that research into outreach that actually gets replies.**

Here's the problem most solo founders hit: You've got 50 prospect briefs sitting in your CRM. Each one took your research agent 2 minutes to generate. Beautiful. But now you need to write 50 personalized cold emails. At 10 minutes per email (if you're fast), that's 8+ hours of writing.

**The Email First-Draft Agent solves this.**

It reads your prospect briefs, applies your voice and templates, and generates 3 email variants per prospect in under 30 seconds. You review, edit lightly (5-15% changes), and send. Total time: 2-3 minutes per prospect instead of 10.

<InsightCard icon="⚡" title="The 80/20 Rule of AI Email Drafting">
AI gets you to 80-90% quality in 30 seconds. The human edit — fixing one awkward phrase, sharpening the CTA, adding a personal touch — adds the final 10-20% that makes the difference between 3% and 8% reply rates.
</InsightCard>

But here's what most people get wrong: they treat AI like a magic button. "Write me a cold email." The output is generic garbage. **The secret is in the prompt architecture** — feeding the AI your research brief, your voice guide, your proven templates, and strict constraints that prevent hallucination and spam.

By the end of this lesson, you'll have a working Email First-Draft Agent that:
- Generates 3 variants per prospect (pain-focused, trigger-focused, value-focused)
- Passes your Sales Linter (word count, personalization depth, CTA clarity)
- Adapts to sequence position (first touch vs follow-up vs breakup)
- Costs $0.01-0.03 per prospect (3 variants)

Let's build it.

---

## The Anatomy of an AI Email Draft

Before we build the agent, you need to understand what makes an AI-drafted email *work* versus what makes it spam.

<FlipCard 
  front="The FASP Quality Gate" 
  back="Every AI-drafted email must pass 4 tests: (F)actual — all references verified. (A)ctually relevant — not a stretch. (S)pecific to this person — not applicable to anyone. (P)roud if they knew how you found it." 
/>

Here's a real example. Same prospect (VP of Marketing at a Series B SaaS company), two AI-drafted emails:

<ComparisonBuilder
  title="Generic AI vs. Research-Driven AI"
  persistKey="custom-ai-agents-L4-fasp-compare"
  prompt="Which email passes the FASP test?"
  expertExample="Subject: your content attribution gap

Hi Sarah,

Saw your post about struggling to tie content to pipeline. Most VPs hit this around Series B when the board starts asking for content ROI.

We built a dashboard that connects HubSpot + GA4 + your CMS to show which posts drive qualified leads. Happy to share a 2-min demo if useful.

Worth 15 min Tuesday?"
  criteria={[
    "References something specific (LinkedIn post)",
    "Names a concrete pain (content attribution)",
    "Ties pain to their stage (Series B, board pressure)",
    "Offers specific value (dashboard connecting 3 tools)",
    "Low-friction CTA (15 min, specific day)"
  ]}
/>

The first email (paste yours in the builder above) probably sounds like this:

> "Hi Sarah, I help marketing leaders drive ROI with our platform. We've worked with companies like yours to improve performance. Would you be open to a quick call?"

**Why it fails FASP:**
- **(F)actual**: No specific reference to verify
- **(A)ctually relevant**: "Companies like yours" is vague
- **(S)pecific**: Applicable to any VP of Marketing
- **(P)roud**: Nothing impressive about how you found her

The second email passes because it references a real LinkedIn post (Factual), ties it to a Series B pain point (Actually relevant), names her specific tech stack gap (Specific), and shows you did homework (Proud).

<RangeSlider 
  label="How often do your current cold emails pass the FASP test?" 
  min={0} 
  max={10} 
  lowLabel="Never" 
  highLabel="Always" 
  persistKey="custom-ai-agents-L4-fasp-self" 
/>

The difference between these two emails is **prompt architecture**. The first came from "Write a cold email to a VP of Marketing." The second came from a structured prompt with:
1. The prospect research brief (with the LinkedIn post reference)
2. A voice guide (conversational, no jargon)
3. A template (PAS: Pain → Agitate → Solution)
4. Constraints (max 125 words, one CTA, no links)
5. Anti-hallucination instructions ("reference only facts from the brief")

Let's build that prompt.

---

## The Email Draft Prompt Architecture

Your Email First-Draft Agent needs 5 inputs to generate quality drafts:

<SlideNavigation>
<Slide title="Input 1: Prospect Research Brief">

This is the output from Agent 1 (Lesson 3). It contains:
- Prospect overview (role, tenure, background)
- Company context (size, stage, recent news)
- Pain signals (based on role + company stage)
- Connection points (mutual connections, shared interests)
- Recommended outreach angle

**Why it matters:** This is your source of truth. Every personalization reference in the email must come from this brief. If the brief says "Sarah posted about content attribution challenges," the email can reference that. If it doesn't, the AI shouldn't invent it.

<ExampleCard label="Sample Brief Excerpt">
**Prospect:** Sarah Chen, VP of Marketing at DataPulse (Series B, 120 employees)

**Pain Signals:**
- Recent LinkedIn post (3 days ago): "Struggling to show the board which content drives pipeline"
- Company just raised Series B ($15M) — board likely asking for marketing ROI proof
- Tech stack: HubSpot + GA4, but no content attribution layer

**Recommended Angle:** Offer a quick demo of content-to-pipeline dashboard
</ExampleCard>

</Slide>

<Slide title="Input 2: Email Template Library">

You're not starting from scratch. You're adapting proven templates. The three most effective for cold outreach:

**PAS (Pain-Agitate-Solution):**
```
Subject: {specific reference to their situation}

Hi {first_name},

{Pain: 1 sentence referencing a specific challenge}

{Agitate: 1 sentence on the cost/impact of not solving it}

{Solution: 1 sentence on how you help — outcome, not features}

{CTA: 1 specific, low-friction ask}
```

**AIDA (Attention-Interest-Desire-Action):**
```
Subject: {curiosity hook}

{Attention: surprising stat or question}

{Interest: why this matters to them specifically}

{Desire: what changes if they solve this}

{Action: one clear next step}
```

**Question-Led:**
```
Subject: quick question about {their pain}

Hi {first_name},

{Question: specific to their situation}

{Context: why you're asking — your relevant experience}

{Value: what you can share if they're interested}

{CTA: yes/no or 15-min offer}
```

Your agent will generate one variant per template, giving you 3 options to choose from.

</Slide>

<Slide title="Input 3: Voice Guide">

This is your writing style codified. Without it, AI defaults to corporate-speak. With it, emails sound like you.

<TemplateBuilder
  title="Your Email Voice Guide"
  persistKey="custom-ai-agents-L4-voice"
  sections={[
    {
      id: "tone",
      title: "Tone & Style",
      fields: [
        { 
          id: "tone", 
          label: "Overall Tone", 
          placeholder: "e.g., Conversational, direct, no fluff", 
          type: "text" 
        },
        { 
          id: "avoid", 
          label: "Words/Phrases to Avoid", 
          placeholder: "e.g., 'synergy,' 'circle back,' 'touch base'", 
          type: "textarea" 
        },
        { 
          id: "signature", 
          label: "Signature Phrases", 
          placeholder: "e.g., 'Worth 15 min?' instead of 'Let me know'", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "structure",
      title: "Structure Preferences",
      fields: [
        { 
          id: "length", 
          label: "Max Word Count", 
          placeholder: "e.g., 125 words", 
          type: "number" 
        },
        { 
          id: "paragraphs", 
          label: "Paragraph Style", 
          placeholder: "e.g., 1-2 sentences max per paragraph", 
          type: "text" 
        },
        { 
          id: "cta_style", 
          label: "CTA Style", 
          placeholder: "e.g., Always a question, never a statement", 
          type: "text" 
        }
      ]
    }
  ]}
/>

**Example Voice Guide:**
- Tone: Conversational, like texting a colleague. No corporate jargon.
- Avoid: "I wanted to reach out," "circle back," "synergy," "solutions"
- Signature phrases: "Worth 15 min?" "Quick question:" "Saw your post about..."
- Length: 50-125 words max
- Paragraphs: 1-2 sentences each, lots of white space
- CTA: Always a question, always specific (day/time or yes/no)

</Slide>

<Slide title="Input 4: Value Proposition">

This is your offer/positioning from Course 2. The AI needs to know *what you do* and *for whom* to craft relevant solutions.

**Example:**
"We help B2B SaaS companies at Series A-B ($1M-10M ARR) reduce CAC by 20-40% through AI-powered lead scoring and personalized outreach automation. Typical client sees ROI in 60 days."

The AI uses this to:
- Frame the solution in outcome terms (not features)
- Match the offer to the prospect's stage (Series B → board pressure → ROI proof)
- Avoid overpromising (if your offer is lead scoring, don't promise "10x revenue")

</Slide>

<Slide title="Input 5: Sequence Position">

A first-touch email is different from a follow-up is different from a breakup email. Your agent needs to know where this email sits in the sequence.

**Sequence positions:**
1. **First touch** — Introduce yourself, reference research, offer value
2. **Follow-up 1** (3 days later) — Different angle, add social proof or insight
3. **Follow-up 2** (5 days later) — Question-led, focus on their pain
4. **Value bump** (7 days later) — Share a resource (guide, case study, tool)
5. **Breakup** (10 days later) — Graceful close, leave door open

Each position has different tone, length, and CTA expectations. The agent adapts.

<ClassifyExercise
  title="Classify These Email Snippets by Sequence Position"
  persistKey="custom-ai-agents-L4-sequence-classify"
  categories={[
    { id: "first", label: "First Touch", color: "#3b82f6" },
    { id: "followup", label: "Follow-up", color: "#f59e0b" },
    { id: "breakup", label: "Breakup", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Saw your post about content attribution — most Series B VPs hit this when the board starts asking for ROI.", 
      correctCategory: "first" 
    },
    { 
      id: "2", 
      content: "I know you're busy, so I'll keep this short: still struggling with that attribution gap?", 
      correctCategory: "followup" 
    },
    { 
      id: "3", 
      content: "Sounds like the timing isn't right. If things change, here's a 2-min demo you can watch async.", 
      correctCategory: "breakup" 
    },
    { 
      id: "4", 
      content: "Quick question: does your current setup connect HubSpot + GA4 + your CMS for content-to-pipeline tracking?", 
      correctCategory: "followup" 
    }
  ]}
/>

</Slide>
</SlideNavigation>

Now that you understand the 5 inputs, let's build the prompt that combines them.

---

## Building the Draft Prompt

Here's the full prompt template your agent will use. This is the "brain" of the Email First-Draft Agent.

```
You are an AI email drafting assistant for a solo founder.

PROSPECT RESEARCH BRIEF:
{research_brief}

EMAIL TEMPLATE:
{template}  # PAS, AIDA, or Question-Led

VOICE GUIDE:
{voice_guide}

VALUE PROPOSITION:
{value_proposition}

SEQUENCE POSITION:
{sequence_position}  # first_touch, follow_up_1, follow_up_2, value_bump, breakup

CONSTRAINTS:
- Maximum 125 words (body only, excluding subject line)
- One CTA only (question or soft ask)
- No links in first-touch emails (links allowed in follow-ups)
- Reference ONLY facts from the prospect brief — if uncertain, don't reference it
- Subject line: under 50 characters, lowercase, specific to this prospect
- Tone: {voice_guide.tone}
- Avoid these words/phrases: {voice_guide.avoid}

ANTI-HALLUCINATION INSTRUCTION:
If a fact is not explicitly stated in the prospect brief, do not invent it. Use only verified information. If you cannot find a specific detail, write a more general but still relevant hook.

OUTPUT FORMAT:
Subject: ...
Body: ...

Now generate the email.
```

<InsightCard icon="🎯" title="Why This Prompt Works">
It's **structured** (clear sections), **constrained** (word count, CTA rules), **grounded** (references only brief facts), and **voice-aware** (applies your style guide). This is the difference between "write me an email" (garbage) and "here's everything you need to write a great email" (80-90% quality).
</InsightCard>

Let's test it.

---

## The 3-Variant Generation Strategy

Your agent doesn't generate one email. It generates **3 variants** using different angles:

1. **Pain-Focused** — Leads with their specific challenge (from the brief)
2. **Trigger-Focused** — References a recent event (LinkedIn post, funding round, hire)
3. **Value-Focused** — Leads with a relevant insight or data point

Why 3 variants? Because you don't know which angle will resonate until you test. And having 3 options lets you pick the best one for each prospect.

<SwipeDecision
  title="Pain vs. Trigger vs. Value: Which Angle Fits?"
  description="Swipe to match each prospect scenario to the best email angle"
  optionA="Wrong Angle"
  optionB="Right Angle"
  persistKey="custom-ai-agents-L4-angle-swipe"
  cards={[
    { 
      id: "1", 
      content: "Prospect just posted on LinkedIn about struggling with churn. Use: Pain-Focused", 
      correctOption: "b", 
      explanation: "The LinkedIn post is a fresh trigger, but the pain (churn) is the core issue. Pain-focused works best here." 
    },
    { 
      id: "2", 
      content: "Prospect's company just raised Series B. Use: Trigger-Focused", 
      correctOption: "b", 
      explanation: "Funding rounds create urgency (board expectations, new budgets). Trigger-focused capitalizes on timing." 
    },
    { 
      id: "3", 
      content: "Prospect is a VP of Sales at a company with no recent news. Use: Value-Focused", 
      correctOption: "b", 
      explanation: "No trigger, no fresh pain signal. Lead with an insight or stat that's relevant to their role." 
    },
    { 
      id: "4", 
      content: "Prospect just hired 3 SDRs (LinkedIn update). Use: Pain-Focused", 
      correctOption: "a", 
      explanation: "The hire is the trigger. Trigger-focused ('Saw you're scaling your SDR team...') is stronger than generic pain." 
    }
  ]}
/>

Here's how the agent generates all 3:

```python
# Pseudocode: 3-Variant Generation

angles = ["pain_focused", "trigger_focused", "value_focused"]
templates = ["PAS", "AIDA", "Question"]

drafts = []
for i, angle in enumerate(angles):
    prompt = BASE_PROMPT.format(
        research_brief=brief,
        template=templates[i],  # Rotate templates for variety
        voice_guide=voice,
        value_proposition=offer,
        sequence_position=position,
        angle=angle  # Instruct the AI which angle to emphasize
    )
    
    draft = call_llm(
        model="claude-sonnet-4",
        prompt=prompt,
        max_tokens=300,
        temperature=0.7  # Slightly higher for creative variation
    )
    
    drafts.append({"angle": angle, "template": templates[i], "draft": draft})

return drafts
```

Now you've got 3 emails. But are they any good? That's where the Sales Linter comes in.

---

## The Sales Linter: Quality Control for AI Drafts

The Sales Linter is a set of automated checks that score each draft against your quality criteria. It catches:
- **Word count violations** (over 125 words)
- **Jargon** (words from your avoid list)
- **Weak CTAs** (vague asks like "let me know" instead of "worth 15 min Tuesday?")
- **Missing personalization** (no reference to the prospect's specific situation)
- **Spam trigger words** ("free," "guarantee," "limited time")
- **Subject line issues** (over 50 characters, all caps, exclamation marks)

<LinterFeedback
  title="Sales Linter: Score Your Draft"
  persistKey="custom-ai-agents-L4-linter"
  inputLabel="Paste an AI-drafted email (subject + body)"
  rules={[
    { 
      id: "length", 
      label: "Word Count", 
      description: "Body is 50-125 words", 
      keywords: [], 
      antiKeywords: [],
      checkType: "wordCount",
      min: 50,
      max: 125
    },
    { 
      id: "personalization", 
      label: "Personalization", 
      description: "References something specific about the prospect", 
      keywords: ["noticed", "saw that", "your post", "your company", "recent"], 
      antiKeywords: ["Dear Sir", "To whom it may concern"] 
    },
    { 
      id: "cta", 
      label: "Clear CTA", 
      description: "Ends with a specific ask (question or time-bound offer)", 
      keywords: ["15 minutes", "Tuesday", "quick call", "worth", "interested?"], 
      antiKeywords: ["let me know", "reach out", "circle back"] 
    },
    { 
      id: "jargon", 
      label: "No Jargon", 
      description: "Avoids corporate buzzwords", 
      keywords: [], 
      antiKeywords: ["synergy", "leverage", "solutions", "ecosystem", "touch base", "circle back"] 
    },
    { 
      id: "spam", 
      label: "No Spam Words", 
      description: "Avoids spam trigger words", 
      keywords: [], 
      antiKeywords: ["free", "guarantee", "limited time", "act now", "click here", "100%"] 
    },
    { 
      id: "subject", 
      label: "Subject Line", 
      description: "Under 50 characters, lowercase, specific", 
      keywords: [], 
      antiKeywords: ["!!!", "FREE", "URGENT"],
      checkType: "subjectLine",
      maxLength: 50
    }
  ]}
/>

**How it works in the agent:**

```python
def sales_linter(draft):
    issues = []
    score = 100
    
    # Extract subject and body
    subject = extract_subject(draft)
    body = extract_body(draft)
    
    # Check 1: Word count
    word_count = len(body.split())
    if word_count > 125:
        issues.append(f"Body is {word_count} words (max 125)")
        score -= 20
    
    # Check 2: Personalization
    personalization_keywords = ["noticed", "saw", "your post", "recent"]
    if not any(kw in body.lower() for kw in personalization_keywords):
        issues.append("No specific personalization detected")
        score -= 30
    
    # Check 3: CTA clarity
    cta_keywords = ["15 min", "Tuesday", "worth", "interested?"]
    if not any(kw in body.lower() for kw in cta_keywords):
        issues.append("Weak or missing CTA")
        score -= 20
    
    # Check 4: Jargon
    jargon = ["synergy", "leverage", "solutions", "circle back"]
    found_jargon = [j for j in jargon if j in body.lower()]
    if found_jargon:
        issues.append(f"Jargon detected: {', '.join(found_jargon)}")
        score -= 10 * len(found_jargon)
    
    # Check 5: Spam words
    spam_words = ["free", "guarantee", "limited time", "click here"]
    found_spam = [s for s in spam_words if s in body.lower()]
    if found_spam:
        issues.append(f"Spam words detected: {', '.join(found_spam)}")
        score -= 15 * len(found_spam)
    
    # Check 6: Subject line
    if len(subject) > 50:
        issues.append(f"Subject line is {len(subject)} chars (max 50)")
        score -= 10
    
    return {"score": max(0, score), "issues": issues}
```

Any draft scoring below 70 gets flagged for manual review. Scores 70-85 are "good enough to edit." Scores 85+ are "send with minimal changes."

---

## Sequence Adaptation: First Touch vs Follow-Up vs Breakup

Your agent needs to adapt tone and content based on where the email sits in the sequence. Here's how:

<ProgressiveReveal title="Sequence-Specific Prompt Adjustments" persistKey="custom-ai-agents-L4-sequence-reveal">
<RevealSection title="First Touch">

**Goal:** Introduce yourself, establish relevance, offer value

**Tone:** Professional but warm, curious

**Structure:**
- Subject: Reference something specific (their post, company news, role)
- Opening: 1 sentence acknowledging what you noticed
- Body: 2-3 sentences on why this matters + how you help
- CTA: Low-friction ask (15 min, quick question, yes/no)

**Constraints:**
- No links (deliverability risk)
- Max 100 words
- Must pass FASP test

**Example:**
```
Subject: your content attribution gap

Hi Sarah,

Saw your post about struggling to show the board which content drives pipeline. Most Series B VPs hit this when marketing budgets come under scrutiny.

We built a dashboard that connects HubSpot + GA4 + your CMS to show which posts drive qualified leads. Takes 15 min to set up.

Worth a quick demo Tuesday?
```

</RevealSection>

<RevealSection title="Follow-Up 1 (3 days later)">

**Goal:** Re-engage with a different angle, add credibility

**Tone:** Slightly more direct, assume they're busy

**Structure:**
- Subject: Different hook (question or insight)
- Opening: Acknowledge the first email briefly
- Body: New angle (social proof, case study, or question)
- CTA: Same low-friction ask or easier (async demo link)

**Constraints:**
- Can include links now
- Max 125 words
- Don't repeat the first email's angle

**Example:**
```
Subject: quick question about your tech stack

Hi Sarah,

I know you're swamped, so I'll keep this short.

Does your current setup connect HubSpot + GA4 + your CMS for content-to-pipeline tracking? Most teams we work with have these tools but no attribution layer.

Here's a 2-min demo you can watch async: [link]

If it's not relevant, no worries — just let me know.
```

</RevealSection>

<RevealSection title="Follow-Up 2 (5 days later)">

**Goal:** Surface a pain point with a question

**Tone:** Conversational, helpful

**Structure:**
- Subject: Direct question
- Opening: Acknowledge silence, pivot to value
- Body: Ask a diagnostic question that surfaces their pain
- CTA: Yes/no or share a resource

**Constraints:**
- Max 100 words
- Question must be specific to their role/stage

**Example:**
```
Subject: how do you track content ROI?

Hi Sarah,

I haven't heard back, so I'm guessing the timing isn't right or I missed the mark.

Before I close the loop: how do you currently show the board which content drives pipeline? Most Series B marketing teams either use a manual spreadsheet or just... don't.

If you've solved this, I'd love to hear how. If not, happy to share what we've seen work.
```

</RevealSection>

<RevealSection title="Breakup (10 days later)">

**Goal:** Graceful exit, leave door open

**Tone:** Friendly, no pressure

**Structure:**
- Subject: Acknowledge you're closing the loop
- Opening: Assume they're not interested, that's okay
- Body: Offer a final resource or insight
- CTA: None, or "reply if things change"

**Constraints:**
- Max 75 words
- No hard ask
- Positive tone

**Example:**
```
Subject: closing the loop

Hi Sarah,

Sounds like this isn't a priority right now — totally understand.

If things change and you want to see how other Series B teams are solving content attribution, here's a guide we put together: [link]

Either way, good luck with the board meetings.
```

</RevealSection>
</ProgressiveReveal>

The agent uses the `sequence_position` input to select the right tone, structure, and constraints for each email.

---

## Building the Agent: Step-by-Step

Now let's put it all together. You're going to build the Email First-Draft Agent in your orchestrator (n8n, Zapier, Make, or Trigger.dev).

<TemplateBuilder
  title="Email First-Draft Agent Specification"
  persistKey="custom-ai-agents-L4-agent-spec"
  sections={[
    {
      id: "trigger",
      title: "Trigger Configuration",
      fields: [
        { 
          id: "trigger_type", 
          label: "Trigger Type", 
          placeholder: "e.g., CRM contact updated (research brief added)", 
          type: "text" 
        },
        { 
          id: "trigger_filter", 
          label: "Filter Condition", 
          placeholder: "e.g., research_brief is not empty AND email_drafts is empty", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "inputs",
      title: "Input Data Sources",
      fields: [
        { 
          id: "research_brief", 
          label: "Research Brief Source", 
          placeholder: "e.g., CRM field: contact.research_brief", 
          type: "text" 
        },
        { 
          id: "voice_guide", 
          label: "Voice Guide Location", 
          placeholder: "e.g., Airtable table: Voice_Guide, record ID: rec123", 
          type: "text" 
        },
        { 
          id: "value_prop", 
          label: "Value Proposition Source", 
          placeholder: "e.g., CRM settings field or hardcoded in workflow", 
          type: "text" 
        },
        { 
          id: "sequence_position", 
          label: "Sequence Position Logic", 
          placeholder: "e.g., If contact.emails_sent = 0, then 'first_touch'", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "generation",
      title: "Draft Generation Settings",
      fields: [
        { 
          id: "model", 
          label: "LLM Model", 
          placeholder: "e.g., claude-sonnet-4, gpt-4o", 
          type: "text" 
        },
        { 
          id: "temperature", 
          label: "Temperature", 
          placeholder: "e.g., 0.7 (higher = more creative)", 
          type: "number" 
        },
        { 
          id: "max_tokens", 
          label: "Max Tokens per Draft", 
          placeholder: "e.g., 300", 
          type: "number" 
        },
        { 
          id: "variants", 
          label: "Number of Variants", 
          placeholder: "e.g., 3 (pain, trigger, value)", 
          type: "number" 
        }
      ]
    },
    {
      id: "linting",
      title: "Sales Linter Configuration",
      fields: [
        { 
          id: "min_score", 
          label: "Minimum Passing Score", 
          placeholder: "e.g., 70 (out of 100)", 
          type: "number" 
        },
        { 
          id: "auto_reject", 
          label: "Auto-Reject Below Score", 
          placeholder: "e.g., 50 (regenerate if below this)", 
          type: "number" 
        },
        { 
          id: "jargon_list", 
          label: "Jargon Words to Flag", 
          placeholder: "e.g., synergy, leverage, solutions", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "output",
      title: "Output Destination",
      fields: [
        { 
          id: "crm_field", 
          label: "CRM Field for Drafts", 
          placeholder: "e.g., contact.email_drafts (JSON array)", 
          type: "text" 
        },
        { 
          id: "notification", 
          label: "Notification Channel", 
          placeholder: "e.g., Slack DM, email, CRM task", 
          type: "text" 
        },
        { 
          id: "review_queue", 
          label: "Review Queue Setup", 
          placeholder: "e.g., Airtable view filtered by draft_status = 'pending_review'", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

**Workflow Steps (n8n example):**

1. **Trigger:** CRM contact updated → filter for `research_brief` added and `email_drafts` empty
2. **Fetch Inputs:** Get research brief, voice guide, value prop, determine sequence position
3. **Generate Variant 1 (Pain-Focused):** Call LLM with PAS template + pain angle
4. **Generate Variant 2 (Trigger-Focused):** Call LLM with AIDA template + trigger angle
5. **Generate Variant 3 (Value-Focused):** Call LLM with Question template + value angle
6. **Lint All 3 Drafts:** Run Sales Linter on each, calculate scores
7. **Filter:** If any draft scores &lt;50, regenerate it with adjusted prompt
8. **Save to CRM:** Store all 3 drafts as JSON array in `contact.email_drafts`
9. **Notify:** Send Slack message: "3 email drafts ready for [Name]"
10. **End**

<InsightCard icon="💡" title="Pro Tip: The Regeneration Loop">
If a draft scores below 50, don't just save it. Regenerate with a modified prompt: "Previous attempt was too generic. Focus more on [specific pain from brief]." This catches 80% of low-quality outputs before they reach you.
</InsightCard>

---

## Testing Your Agent: The Personalization Sandbox

Before you unleash this agent on your real prospects, you need to test it. The Personalization Sandbox lets you upload 5 prospect briefs, generate 15 email drafts (3 per prospect), and score them.

<InteractiveChecklist 
  title="Agent Testing Checklist" 
  persistKey="custom-ai-agents-L4-testing" 
  items={[
    "Upload 5 diverse prospect briefs (different roles, industries, stages)",
    "Generate 3 email variants per prospect (15 total)",
    "Run Sales Linter on all 15 drafts",
    "Manually review the top-scoring draft for each prospect",
    "Edit each draft (track % of text changed)",
    "Calculate average Linter score and average edit distance",
    "If average score &lt;75 or edit distance >20%, adjust prompt and retest"
  ]} 
/>

**What to look for:**

- **Linter scores:** Average should be 75+. If below, your prompt needs tighter constraints.
- **Edit distance:** You should change &lt;20% of the text. If you're rewriting 50%, the AI isn't learning your voice.
- **FASP compliance:** Every draft should pass Factual, Actually relevant, Specific, Proud. If not, strengthen the anti-hallucination instruction.
- **Variant diversity:** The 3 variants should feel meaningfully different, not just rephrased. If they're too similar, adjust the angle instructions.

<RewriteExercise
  title="Rewrite This AI Draft"
  persistKey="custom-ai-agents-L4-rewrite"
  original="Hi Sarah, I wanted to reach out because I saw your company is growing. We help marketing teams improve their performance. Would you be open to a quick call to discuss how we can help you achieve your goals?"
  hint="Use the prospect brief: Sarah posted about content attribution challenges 3 days ago. She's VP of Marketing at a Series B SaaS company."
  expertRewrite="Subject: your content attribution gap\n\nHi Sarah,\n\nSaw your post about struggling to show the board which content drives pipeline. Most Series B VPs hit this when budgets come under scrutiny.\n\nWe built a dashboard that connects HubSpot + GA4 + your CMS to show which posts drive qualified leads. Takes 15 min to set up.\n\nWorth a quick demo Tuesday?"
  criteria={[
    "References the LinkedIn post (specific trigger)",
    "Names the pain (content attribution)",
    "Ties to her stage (Series B, board pressure)",
    "Offers concrete value (dashboard, 3 tools)",
    "Specific CTA (15 min, Tuesday)"
  ]}
/>

---

## Token Economics: What This Agent Costs

Let's break down the cost per prospect (3 email variants):

| Model | Input Tokens (~) | Output Tokens (~) | Cost per Variant | Cost for 3 Variants |
|-------|------------------|-------------------|------------------|---------------------|
| Claude Sonnet 4 | ~1,500 | ~300 | ~$0.008 | ~$0.024 |
| Claude Haiku | ~1,500 | ~300 | ~$0.0007 | ~$0.002 |
| GPT-4o | ~1,500 | ~300 | ~$0.012 | ~$0.036 |
| GPT-4o-mini | ~1,500 | ~300 | ~$0.0007 | ~$0.002 |

**At 50 prospects/week:**
- Claude Sonnet 4: $1.20/week = **$5/month**
- Claude Haiku: $0.10/week = **$0.40/month**
- GPT-4o: $1.80/week = **$7.50/month**
- GPT-4o-mini: $0.10/week = **$0.40/month**

**Recommendation:** Start with Claude Sonnet 4 or GPT-4o for quality. Once your prompt is dialed in, switch to Haiku or GPT-4o-mini to cut costs by 90%.

<ScenarioSimulator
  title="Email Draft Agent ROI Calculator"
  persistKey="custom-ai-agents-L4-roi"
  levers={[
    { id: "prospects", label: "Prospects per week", min: 10, max: 200, step: 10, defaultValue: 50 },
    { id: "model", label: "Model cost per 3 variants", min: 0.002, max: 0.05, step: 0.001, defaultValue: 0.024 },
    { id: "time_saved", label: "Minutes saved per prospect", min: 5, max: 15, step: 1, defaultValue: 8 }
  ]}
  outputs={[
    { id: "cost_month", label: "Monthly AI cost", formula: "(prospects * 4.33 * model)", unit: "$", precision: 2 },
    { id: "time_saved_month", label: "Hours saved per month", formula: "(prospects * 4.33 * time_saved / 60)", unit: "hrs", precision: 1 }
  ]}
  insight="At `{time_saved_month}` hours saved per month, that's roughly {time_saved_month * 2} more prospects you can research and reach out to — or `{time_saved_month}` hours back for product/sales calls."
/>

---

## Common Failure Modes (and How to Fix Them)

Even with a well-designed prompt, AI drafts can fail. Here are the 5 most common issues and their fixes:

<ProgressiveReveal title="Email Draft Failure Modes" persistKey="custom-ai-agents-L4-failures">
<RevealSection title="Failure 1: Generic Personalization">

**Symptom:** "I noticed your company is growing" or "I saw you're hiring" — vague references that could apply to anyone.

**Root cause:** The research brief lacks specific details, or the prompt doesn't emphasize specificity.

**Fix:**
1. Strengthen the research brief (Agent 1) to include more concrete signals
2. Add to the prompt: "Reference a specific LinkedIn post, company announcement, or hiring event. Do not use generic phrases like 'I noticed your company is growing.'"
3. Add to Sales Linter: Flag phrases like "I noticed," "I saw," "your company" without a specific follow-up

</RevealSection>

<RevealSection title="Failure 2: Hallucinated Facts">

**Symptom:** "Congrats on the Series B!" when they raised Series A. Or "Saw your post about X" when they never posted about X.

**Root cause:** The AI is filling in gaps with plausible-sounding but false information.

**Fix:**
1. Strengthen anti-hallucination instruction: "If a fact is not explicitly stated in the prospect brief, do not reference it. Write 'Not found' in your draft notes if you lack specific information."
2. Add a verification step: After generating the draft, run a second LLM call: "Review this email. Are all factual claims verifiable from the prospect brief? Flag any that are not."
3. Human spot-check: Review 10% of drafts weekly for hallucinations. If you find >2%, adjust the prompt.

</RevealSection>

<RevealSection title="Failure 3: Too Long">

**Symptom:** Drafts are 150-200 words instead of 50-125.

**Root cause:** The AI is being thorough instead of concise.

**Fix:**
1. Make the word count constraint more prominent: Move it to the top of the constraints section and bold it.
2. Add a penalty: "If the draft exceeds 125 words, you have failed the task. Rewrite to be under 125 words."
3. Use a two-pass approach: First pass generates the draft. Second pass: "Edit this email to be under 125 words without losing the core message."

</RevealSection>

<RevealSection title="Failure 4: Weak or Missing CTA">

**Symptom:** Emails end with "Let me know if you're interested" or "Feel free to reach out" instead of a specific ask.

**Root cause:** The AI defaults to passive, polite language.

**Fix:**
1. Add CTA examples to the prompt: "Good CTAs: 'Worth 15 min Tuesday?' 'Quick question: does your current setup handle X?' Bad CTAs: 'Let me know,' 'Feel free to reach out.'"
2. Add to Sales Linter: Flag emails without a question mark or specific time/day reference in the last 2 sentences.
3. Include a CTA library in the prompt: "Choose one of these CTAs: [list of 5-7 proven CTAs from your templates]"

</RevealSection>

<RevealSection title="Failure 5: Wrong Tone for Sequence Position">

**Symptom:** A breakup email sounds like a first touch, or a follow-up is too aggressive.

**Root cause:** The sequence position instruction isn't clear enough.

**Fix:**
1. Add tone descriptors to each sequence position: "First touch: warm, curious. Follow-up 1: direct, helpful. Breakup: friendly, no pressure."
2. Include example emails for each position in the prompt (few-shot learning).
3. Add a tone check: After generating the draft, run a second LLM call: "Does this email match the tone for a [sequence_position] email? If not, suggest edits."

</RevealSection>
</ProgressiveReveal>

---

## Integrating with Your Outreach Workflow

Your Email First-Draft Agent doesn't work in isolation. It's part of a larger workflow:

**The Full Sequence:**
1. **Agent 1 (Research):** Generates prospect brief → saves to CRM
2. **Agent 2 (Email Draft):** Generates 3 email variants → saves to CRM review queue
3. **Human Review:** You pick the best variant, edit lightly (5-15%), approve
4. **Outreach Tool:** Approved email loads into Lemlist/Instantly/Smartlead sequence
5. **Follow-Up Logic:** If no reply in 3 days, Agent 2 generates follow-up variants
6. **Repeat** through the 5-step sequence (first touch → follow-up 1 → follow-up 2 → value bump → breakup)

<MiniRoleplay
  scenario="You've generated 3 email variants for a prospect. Variant 1 scored 85 (pain-focused), Variant 2 scored 78 (trigger-focused), Variant 3 scored 72 (value-focused). Which do you choose and why?"
  role="You are the solo founder reviewing drafts"
  persistKey="custom-ai-agents-L4-roleplay"
  modelResponse="I'd choose Variant 1 (pain-focused, score 85). Here's why: Pain-focused emails have the highest reply rates because they hit an active problem. The 85 score means it passed all linter checks with minimal issues. I'd still read it to make sure the pain reference is accurate and the CTA feels natural, but it's likely ready to send with &lt;10% edits."
/>

**Review Queue Setup:**

Most solo founders use one of these:
- **Airtable view:** Filter for `draft_status = 'pending_review'`, sorted by ICP score (high-fit prospects first)
- **CRM dashboard:** Custom view showing contacts with `email_drafts` populated but `email_sent` = false
- **Slack notifications:** Daily digest at 9am: "5 email drafts ready for review"

**Time budget:** With 3 variants per prospect and a 2-3 minute review per prospect, you can process 20-30 prospects/hour. That's 50 prospects in 2 hours vs 8+ hours writing from scratch.

---

## Your Implementation Sprint

You've learned the theory. Now build it.

<InteractiveChecklist 
  title="Email First-Draft Agent Build Sprint" 
  persistKey="custom-ai-agents-L4-sprint" 
  items={[
    "Day 1: Complete your Voice Guide (tone, avoid words, signature phrases, structure)",
    "Day 2: Set up the agent workflow in n8n/Zapier/Make (trigger, inputs, LLM calls, linting, output)",
    "Day 3: Test with 5 prospect briefs, generate 15 drafts, score with Sales Linter",
    "Day 4: Review and edit all 15 drafts, calculate average Linter score and edit distance",
    "Day 5: Adjust prompt based on failure modes, regenerate the 5 lowest-scoring drafts",
    "Day 6: Connect to your CRM and outreach tool, set up review queue",
    "Day 7: Run the agent on 10 real prospects, send the top-scoring emails, track reply rates"
  ]} 
/>

**Success metrics:**
- **Linter score:** Average 75+ (out of 100)
- **Edit distance:** &lt;20% of text changed during review
- **Time saved:** 5-10 minutes per prospect (vs writing from scratch)
- **Reply rate:** Within 1-2 percentage points of your hand-written emails

If you hit these metrics, your agent is production-ready. If not, iterate on the prompt and retest.

---

## What You've Built

You now have an Email First-Draft Agent that:
- Reads prospect research briefs (from Agent 1)
- Generates 3 personalized email variants (pain, trigger, value angles)
- Adapts tone and structure to sequence position (first touch → breakup)
- Passes quality checks via Sales Linter (word count, personalization, CTA, jargon, spam)
- Saves drafts to your CRM review queue
- Costs $0.01-0.03 per prospect (3 variants)
- Saves 5-10 minutes per prospect

**Next up:** Agent 3 (CRM Enrichment) — keeping your prospect data fresh and complete so Agents 1 and 2 have better inputs to work with.

But first, test your agent. Upload 5 real prospect briefs. Generate 15 drafts. Score them. Edit them. Send them. Track replies.

**The AI does the first 80%. You add the final 20% that makes it human.**