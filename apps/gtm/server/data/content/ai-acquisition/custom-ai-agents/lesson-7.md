---
title: "Agent 5: Post-Call Summary Agent"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 7
---

## The $40K Mistake You Can't Afford to Make

Sarah closed a $40K deal in March. By July, the client churned. When asked why, she couldn't remember the specifics of their original pain points, the promises she'd made, or the success metrics they'd agreed on. Her CRM notes said: "Good call. Moving forward."

The client's exit interview revealed they felt "misaligned from day one" — Sarah had promised features her product didn't prioritize, and the onboarding team had no context about what the client actually needed.

**The cost:** $40K in lost revenue, 6 months of wasted effort, and a damaged reputation in a tight-knit industry.

**The root cause:** No systematic call documentation. Just vibes and vague notes.

<InsightCard icon="🎯" title="The Real Problem">
Your memory is terrible. Your CRM is only as good as what you put in it. And typing detailed notes while maintaining rapport on a call is impossible.
</InsightCard>

This is where **Agent 5: Post-Call Summary Agent** becomes non-negotiable. It turns messy call transcripts into structured, actionable CRM records — automatically.

---

## What This Agent Does (And Why It's Your Highest-ROI Agent)

The Post-Call Summary Agent takes a raw call transcript (from Zoom, Google Meet, or Gong) and generates:

1. **Executive Summary** — 2-3 sentences capturing the call's outcome
2. **Key Pain Points** — Structured list of challenges discussed, with direct quotes
3. **Commitments Made** — What you promised, what they promised, with deadlines
4. **Next Steps** — Specific actions for both parties
5. **Deal Stage Assessment** — Recommended CRM stage update based on conversation signals
6. **Red Flags** — Budget concerns, timeline mismatches, competing solutions mentioned
7. **Talking Points for Next Call** — What to follow up on, what to avoid

**Time saved:** 10-15 minutes of manual note-taking per call.

**Quality improvement:** 80-90% capture rate vs 30-40% with manual notes.

**Business impact:** Higher close rates (you remember what matters), faster onboarding (handoff context is complete), lower churn (you deliver what you promised).

<RangeSlider 
  label="How often do you review your call notes before the next conversation?" 
  min={1} 
  max={10} 
  lowLabel="Never" 
  highLabel="Always" 
  persistKey="custom-ai-agents-L7-review-frequency" 
/>

---

## The Transcript-to-Summary Pipeline

Here's how the agent works:

<SlideNavigation>
<Slide title="Step 1: Capture the Transcript">

**Transcript Sources:**
- **Zoom:** Auto-transcription (free with paid accounts), exports as .vtt or .txt
- **Google Meet:** Transcription available (Workspace accounts), exports as Google Doc
- **Gong/Chorus:** Automatic transcription + conversation intelligence ($$$ but worth it for sales teams)
- **Otter.ai:** Real-time transcription, integrates with Zoom/Meet, free tier: 600 min/month
- **Manual:** Upload audio to Whisper API (OpenAI) for $0.006/minute

**Trigger Options:**
- **Automatic:** Zapier/n8n watches for new Zoom recordings → downloads transcript → triggers agent
- **Manual:** You paste transcript into a form after the call
- **Scheduled:** Agent runs nightly, processes all transcripts from the day

<ExampleCard label="Sarah's Setup">
Sarah uses Zoom's auto-transcription (included in her $15/mo Pro plan). She has an n8n workflow that watches her Zoom cloud recordings folder. When a new recording appears, n8n downloads the transcript and triggers the Post-Call Summary Agent. The summary is in her CRM within 5 minutes of the call ending.
</ExampleCard>

</Slide>

<Slide title="Step 2: Clean and Structure the Transcript">

Raw transcripts are messy:
- Speaker labels are often wrong ("Speaker 1" vs "Sarah")
- Filler words ("um," "uh," "like") clutter the text
- Timestamps break up sentences
- Cross-talk creates garbled sections

**Pre-processing steps:**
1. Remove timestamps and filler words
2. Fix speaker labels (you vs prospect)
3. Merge fragmented sentences
4. Flag sections with [inaudible] or [crosstalk]

**Why this matters:** A clean transcript produces a 30-40% better summary. The LLM can focus on content, not parsing noise.

```python
# Pseudocode: Transcript Cleaning
def clean_transcript(raw_transcript):
    # Remove timestamps
    cleaned = remove_timestamps(raw_transcript)
    
    # Remove filler words
    fillers = ["um", "uh", "like", "you know", "sort of"]
    cleaned = remove_words(cleaned, fillers)
    
    # Fix speaker labels
    cleaned = replace_speaker_labels(cleaned, {
        "Speaker 1": "You",
        "Speaker 2": prospect_name
    })
    
    # Merge fragmented sentences
    cleaned = merge_fragments(cleaned)
    
    return cleaned
```

</Slide>

<Slide title="Step 3: Generate the Summary">

This is where the LLM does the heavy lifting. The prompt structure:

```
You are a sales assistant for a solo founder.
Generate a structured call summary from this transcript.

TRANSCRIPT:
{cleaned_transcript}

PROSPECT CONTEXT:
Name: {prospect_name}
Company: {company}
Deal Stage: {current_stage}
ICP Score: {icp_score}

OUTPUT FORMAT:
## Executive Summary
[2-3 sentences: what happened, what's the outcome]

## Key Pain Points
- [Pain 1 with direct quote]
- [Pain 2 with direct quote]
- [Pain 3 with direct quote]

## Commitments Made
### You Committed:
- [Action 1 with deadline]
- [Action 2 with deadline]

### They Committed:
- [Action 1 with deadline]
- [Action 2 with deadline]

## Next Steps
1. [Specific action for you]
2. [Specific action for them]
3. [Follow-up timing]

## Deal Stage Assessment
Current: {current_stage}
Recommended: [stage] because [reason based on conversation signals]

## Red Flags
- [Flag 1 if any]
- [Flag 2 if any]

## Talking Points for Next Call
- [Topic 1 to revisit]
- [Topic 2 to explore]
- [Topic 3 to avoid]

RULES:
- Use direct quotes for pain points (verbatim from transcript)
- Be specific with deadlines and actions
- Flag budget/timeline/competition mentions explicitly
- If information is missing, write "Not discussed"
- Recommend stage changes only if conversation signals are clear
```

</Slide>

<Slide title="Step 4: Save to CRM">

The summary is structured data. Map it to CRM fields:

| Summary Section | CRM Field | Type |
|----------------|-----------|------|
| Executive Summary | Call Notes | Long text |
| Key Pain Points | Pain Points | Multi-select tags |
| Commitments Made | Tasks | Task list (with due dates) |
| Next Steps | Next Action | Single-line text |
| Deal Stage Assessment | Stage | Picklist |
| Red Flags | Alerts | Tags |
| Talking Points | Call Prep Notes | Long text |

**Bonus:** Create tasks automatically from commitments. If the summary says "You committed: Send pricing by Friday," the agent creates a CRM task: "Send pricing to [prospect]" with due date = this Friday.

</Slide>

<Slide title="Step 5: Human Review (Optional but Recommended)">

AI summaries are 80-90% accurate. The 10-20% errors are usually:
- Misattributed quotes (prospect said it, summary attributes to you)
- Hallucinated commitments (AI infers a promise that wasn't explicit)
- Missed nuance (sarcasm, hesitation, tone)

**The review workflow:**
1. Agent generates summary and saves as "Draft" in CRM
2. You get a Slack notification: "Call summary ready for [prospect]"
3. You review, edit if needed, click "Approve"
4. Summary moves to "Final" and tasks are created

**Time cost:** 2-3 minutes of review vs 10-15 minutes of manual note-taking.

<InsightCard icon="⚡" title="The 80/20 Rule">
The agent does 80% of the work in 30 seconds. You do the final 20% (review + edit) in 2 minutes. Total time: 2.5 minutes vs 15 minutes manual. That's an 83% time savings.
</InsightCard>

</Slide>
</SlideNavigation>

---

## Building Your Post-Call Summary Agent

Let's build this step-by-step.

<TemplateBuilder
  title="Post-Call Summary Agent Spec"
  persistKey="custom-ai-agents-L7-spec"
  sections={[
    {
      id: "trigger",
      title: "1. Trigger Configuration",
      fields: [
        { 
          id: "source", 
          label: "Transcript Source", 
          placeholder: "e.g., Zoom auto-transcription", 
          type: "text" 
        },
        { 
          id: "trigger-type", 
          label: "Trigger Type", 
          placeholder: "e.g., Automatic (n8n watches Zoom folder) or Manual (paste transcript)", 
          type: "text" 
        },
        { 
          id: "timing", 
          label: "When to Run", 
          placeholder: "e.g., Immediately after call ends or Nightly batch at 11pm", 
          type: "text" 
        }
      ]
    },
    {
      id: "inputs",
      title: "2. Input Data",
      fields: [
        { 
          id: "transcript", 
          label: "Transcript Format", 
          placeholder: "e.g., .vtt from Zoom, .txt from Otter, or pasted text", 
          type: "text" 
        },
        { 
          id: "context", 
          label: "CRM Context to Include", 
          placeholder: "e.g., Prospect name, company, current deal stage, ICP score, last interaction date", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "processing",
      title: "3. Processing Steps",
      fields: [
        { 
          id: "cleaning", 
          label: "Transcript Cleaning Rules", 
          placeholder: "e.g., Remove timestamps, remove filler words (um, uh, like), fix speaker labels", 
          type: "textarea" 
        },
        { 
          id: "model", 
          label: "LLM Model", 
          placeholder: "e.g., Claude Sonnet 4 (best quality) or GPT-4o (faster)", 
          type: "text" 
        },
        { 
          id: "max-tokens", 
          label: "Max Output Tokens", 
          placeholder: "e.g., 1500 (covers most calls)", 
          type: "text" 
        }
      ]
    },
    {
      id: "outputs",
      title: "4. Output Mapping",
      fields: [
        { 
          id: "crm-fields", 
          label: "CRM Fields to Update", 
          placeholder: "e.g., Call Notes, Pain Points (tags), Next Action, Deal Stage, Tasks", 
          type: "textarea" 
        },
        { 
          id: "notifications", 
          label: "Notification Preferences", 
          placeholder: "e.g., Slack DM with summary link, Email with full summary, CRM dashboard alert", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "quality",
      title: "5. Quality Control",
      fields: [
        { 
          id: "review-required", 
          label: "Require Human Review?", 
          placeholder: "e.g., Yes (summaries saved as Draft) or No (auto-approve)", 
          type: "text" 
        },
        { 
          id: "quality-checks", 
          label: "Automated Quality Checks", 
          placeholder: "e.g., Flag if no pain points found, Flag if no commitments made, Flag if deal stage unchanged", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## The Prompt Template (Copy-Paste Ready)

Here's the production-ready prompt template for your Post-Call Summary Agent:

```markdown
You are a sales assistant for a solo founder.
Generate a structured call summary from this sales call transcript.

TRANSCRIPT:
{cleaned_transcript}

PROSPECT CONTEXT:
- Name: {prospect_name}
- Company: {company}
- Current Deal Stage: {current_stage}
- ICP Score: {icp_score}/10
- Last Interaction: {last_interaction_date}

OUTPUT FORMAT (use exactly this structure):

## Executive Summary
[2-3 sentences: what happened on this call, what's the outcome, what's next]

## Key Pain Points Discussed
- [Pain point 1 with direct quote from transcript]
- [Pain point 2 with direct quote from transcript]
- [Pain point 3 with direct quote from transcript]
[If no pain points discussed, write: "No specific pain points discussed"]

## Commitments Made

### You Committed To:
- [Action 1 with deadline if mentioned]
- [Action 2 with deadline if mentioned]
[If no commitments, write: "No commitments made"]

### They Committed To:
- [Action 1 with deadline if mentioned]
- [Action 2 with deadline if mentioned]
[If no commitments, write: "No commitments made"]

## Next Steps
1. [Specific action for you with timing]
2. [Specific action for them with timing]
3. [Follow-up timing and method]

## Deal Stage Assessment
- Current Stage: {current_stage}
- Recommended Stage: [stage name]
- Reason: [1-2 sentences based on conversation signals: budget discussed, timeline confirmed, decision-maker identified, etc.]
[If no stage change recommended, write: "No change recommended"]

## Red Flags
- [Budget concern if mentioned]
- [Timeline mismatch if mentioned]
- [Competing solution if mentioned]
- [Decision-maker uncertainty if mentioned]
[If no red flags, write: "No red flags identified"]

## Talking Points for Next Call
- [Topic 1 to revisit or explore deeper]
- [Topic 2 to follow up on]
- [Topic 3 to avoid based on their reactions]

CRITICAL RULES:
1. Use ONLY information from the transcript — do not infer or assume
2. For pain points, use direct quotes (verbatim from transcript)
3. For commitments, be specific about what and when
4. If information is missing or unclear, write "Not discussed" or "Unclear from transcript"
5. Flag any mentions of budget, timeline, competition, or decision-making process explicitly
6. Recommend stage changes ONLY if there are clear signals (e.g., they asked for pricing = move to Proposal stage)
```

<FlipCard 
  front="Why Direct Quotes for Pain Points?" 
  back="Direct quotes are evidence. When you follow up, you can say 'You mentioned that manual reporting takes 10 hours/week' — that's powerful. Paraphrased pain points lose specificity and credibility." 
/>

---

## Token Economics and Cost

Let's calculate the cost per call summary.

**Typical Call Transcript:**
- 30-minute call = ~4,500 words = ~6,000 tokens (input)
- Summary output = ~1,000 tokens

**Cost per Summary:**

| Model | Input Cost | Output Cost | Total/Summary |
|-------|-----------|-------------|---------------|
| Claude Sonnet 4 | ~$0.018 | ~$0.015 | **~$0.033** |
| Claude Haiku | ~$0.0015 | ~$0.00125 | **~$0.00275** |
| GPT-4o | ~$0.03 | ~$0.06 | **~$0.09** |
| GPT-4o-mini | ~$0.0009 | ~$0.0006 | **~$0.0015** |

**At 10 calls/week:**
- Claude Sonnet 4: **$0.33/week** or **$17/year**
- Claude Haiku: **$0.03/week** or **$1.50/year**
- GPT-4o: **$0.90/week** or **$47/year**
- GPT-4o-mini: **$0.015/week** or **$0.78/year**

<InsightCard icon="💰" title="Cost Reality Check">
Even with the most expensive model (GPT-4o), you're spending $47/year to save 520 hours of manual note-taking (10 min × 52 weeks × 10 calls). That's $0.09 per hour saved. Absurdly good ROI.
</InsightCard>

**Recommendation:** Start with Claude Sonnet 4 for quality. If you're doing 50+ calls/week, switch to Haiku to save costs (quality drop is minimal for this use case).

---

## The n8n Workflow (Visual Blueprint)

Here's how to build this in n8n:

```
[Trigger: Webhook from Zoom] 
  ↓
[HTTP Request: Download Transcript from Zoom API]
  ↓
[Code Node: Clean Transcript]
  - Remove timestamps
  - Remove filler words
  - Fix speaker labels
  ↓
[HTTP Request: Fetch CRM Context]
  - Get prospect name, company, deal stage, ICP score
  ↓
[AI Agent Node: Claude Sonnet 4]
  - System prompt: [Post-Call Summary Template]
  - Input: {cleaned_transcript, crm_context}
  - Output: {summary_json}
  ↓
[Code Node: Parse Summary into Fields]
  - Extract: executive_summary, pain_points, commitments, next_steps, stage_recommendation, red_flags
  ↓
[IF Node: Review Required?]
  YES → [CRM Update: Save as Draft]
         → [Slack Notification: "Summary ready for review: {prospect_name}"]
  NO  → [CRM Update: Save as Final]
         → [Create Tasks from Commitments]
         → [Update Deal Stage if Recommended]
  ↓
[End]
```

<ExampleCard label="Sarah's Workflow in Action">
Sarah has a 45-minute discovery call with a prospect at 2pm. By 2:50pm:

1. Zoom auto-transcription finishes
2. n8n downloads the transcript
3. Agent cleans it and generates summary
4. Summary appears in her CRM as a Draft
5. Slack pings her: "Call summary ready for John at Acme Corp"
6. She reviews during her 3pm coffee break (2 minutes)
7. Clicks "Approve"
8. CRM creates tasks: "Send pricing by Friday" and "Schedule demo for next Tuesday"
9. Deal stage updates from "Discovery" to "Proposal"

Total time spent: 2 minutes. Quality: better than her manual notes ever were.
</ExampleCard>

---

## Quality Control: The Summary Linter

Not all summaries are created equal. Build a **Summary Linter** to catch common issues:

<LinterFeedback
  title="Summary Quality Linter"
  persistKey="custom-ai-agents-L7-linter"
  inputLabel="Paste your AI-generated call summary"
  rules={[
    { 
      id: "pain-quotes", 
      label: "Pain Points Have Direct Quotes", 
      description: "Each pain point should include a verbatim quote from the transcript", 
      keywords: ["\"", "'"], 
      antiKeywords: [] 
    },
    { 
      id: "commitments-specific", 
      label: "Commitments Are Specific", 
      description: "Commitments should include what and when (e.g., 'Send pricing by Friday')", 
      keywords: ["by", "before", "on", "deadline"], 
      antiKeywords: ["soon", "later", "eventually"] 
    },
    { 
      id: "next-steps-actionable", 
      label: "Next Steps Are Actionable", 
      description: "Each next step should be a concrete action, not a vague intention", 
      keywords: ["send", "schedule", "review", "prepare", "follow up"], 
      antiKeywords: ["think about", "consider", "maybe"] 
    },
    { 
      id: "stage-reasoning", 
      label: "Stage Change Has Clear Reasoning", 
      description: "If a stage change is recommended, the reason should reference specific conversation signals", 
      keywords: ["because", "based on", "they mentioned", "they asked"], 
      antiKeywords: [] 
    },
    { 
      id: "red-flags-explicit", 
      label: "Red Flags Are Explicit", 
      description: "Budget, timeline, competition, or decision-maker concerns should be called out clearly", 
      keywords: ["budget", "timeline", "competitor", "decision", "approval"], 
      antiKeywords: [] 
    }
  ]}
/>

**How to use the linter:**
1. Agent generates summary
2. Linter scores it (0-100%)
3. If score < 70%, flag for human review
4. If score >= 70%, auto-approve (or still review if you prefer)

---

## Common Failure Modes (And How to Fix Them)

Even well-designed agents fail. Here are the top 5 failure modes for Post-Call Summary Agents:

<ClassifyExercise
  title="Classify These Summary Failures"
  persistKey="custom-ai-agents-L7-failures"
  categories={[
    { id: "hallucination", label: "Hallucination", color: "#ef4444" },
    { id: "misattribution", label: "Misattribution", color: "#f59e0b" },
    { id: "missing-context", label: "Missing Context", color: "#3b82f6" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Summary says 'They committed to a decision by end of month' but transcript shows they said 'We'll try to decide by end of month'", 
      correctCategory: "hallucination" 
    },
    { 
      id: "2", 
      content: "Summary attributes a pain point to the prospect, but it was actually you describing a common challenge", 
      correctCategory: "misattribution" 
    },
    { 
      id: "3", 
      content: "Summary recommends moving to Proposal stage, but doesn't mention that they haven't confirmed budget yet", 
      correctCategory: "missing-context" 
    },
    { 
      id: "4", 
      content: "Summary says 'They use Salesforce' but transcript shows they said 'We're evaluating Salesforce'", 
      correctCategory: "hallucination" 
    },
    { 
      id: "5", 
      content: "Summary lists a red flag about timeline, but the concern was actually raised by you, not them", 
      correctCategory: "misattribution" 
    }
  ]}
/>

**Fixes:**

| Failure Mode | Fix |
|--------------|-----|
| **Hallucination** | Add to prompt: "Do not infer commitments. Only include explicit statements. If uncertain, write 'Unclear from transcript.'" |
| **Misattribution** | Improve speaker label cleaning. Add to prompt: "Clearly distinguish between what you said and what the prospect said." |
| **Missing Context** | Include more CRM context in the prompt (e.g., "Budget not yet confirmed" as a field). Add to prompt: "Flag any missing information needed for stage progression." |
| **Generic Summaries** | Add to prompt: "Use specific details and direct quotes. Avoid generic statements like 'They're interested.'" |
| **Wrong Stage Recommendation** | Add a stage-change rubric to the prompt: "Only recommend stage change if: (1) Budget discussed, (2) Timeline confirmed, (3) Decision-maker identified." |

---

## B2B vs Creator Context: What Changes?

The core agent structure is the same, but the summary sections adapt:

### B2B Focus:
- **Pain Points:** Operational inefficiencies, revenue leaks, compliance risks
- **Commitments:** Demos, trials, pricing proposals, technical evaluations
- **Red Flags:** Budget approval process, competing vendors, technical requirements
- **Talking Points:** ROI calculations, case studies, integration requirements

### Creator/Coach Focus:
- **Pain Points:** Audience growth plateaus, monetization challenges, time constraints
- **Commitments:** Content collaborations, course enrollments, coaching packages
- **Red Flags:** Budget concerns (personal vs business), time availability, competing programs
- **Talking Points:** Success stories, community fit, implementation support

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Creators">
Your "calls" might be discovery sessions for coaching clients or strategy calls for course students. The agent works the same way — it just focuses on transformation goals instead of business pain points.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches">
Use this agent for client intake calls. The summary becomes your coaching plan foundation — their stated goals, obstacles, and commitments form your session roadmap.
</ContextualNote>

---

## Testing Your Agent: The 3-Call Challenge

Before you trust this agent with real prospects, test it with 3 past calls:

<InteractiveChecklist 
  title="Agent Testing Checklist" 
  persistKey="custom-ai-agents-L7-testing" 
  items={[
    "Find transcripts from 3 past calls (or record 3 test calls with a colleague)",
    "Run each transcript through your agent",
    "Compare AI summary to your manual notes (or memory of the call)",
    "Check: Are pain points accurate? Are commitments correct? Are red flags caught?",
    "Calculate accuracy: What % of key details did the agent capture?",
    "Identify failure modes: What did it miss? What did it hallucinate?",
    "Refine your prompt based on failures",
    "Re-test with the same 3 transcripts",
    "If accuracy >= 80%, deploy to production",
    "If accuracy < 80%, iterate on prompt and re-test"
  ]} 
/>

**Success criteria:** 80%+ accuracy on key details (pain points, commitments, next steps). You should feel confident using the summary without re-listening to the call.

---

## Integration with Agents 1-4: The Full Pipeline

Your Post-Call Summary Agent doesn't work in isolation. It's part of a 5-agent pipeline:

```
Agent 1: Prospect Research
  ↓ (generates research brief)
Agent 2: Email First-Draft
  ↓ (sends personalized outreach)
[Prospect replies, call scheduled]
  ↓
Agent 4: Meeting Prep
  ↓ (generates prep doc 30 min before call)
[You have the call]
  ↓
Agent 5: Post-Call Summary ← YOU ARE HERE
  ↓ (generates summary, updates CRM, creates tasks)
[Follow-up sequence begins]
  ↓
Agent 2: Email First-Draft (follow-up variant)
```

**The data flow:**
- Agent 1's research brief → feeds into Agent 4's prep doc
- Agent 4's prep doc → reminds you of key talking points during the call
- Agent 5's summary → feeds into Agent 2's follow-up email drafts
- Agent 5's summary → feeds into Agent 3's CRM enrichment (updates deal stage, adds tags)

<InsightCard icon="🔗" title="The Compound Effect">
Each agent makes the next one better. Agent 1's research makes Agent 4's prep more relevant. Agent 5's summary makes Agent 2's follow-ups more personalized. The whole system gets smarter with every interaction.
</InsightCard>

---

## Your Implementation Sprint

You've built the spec. Now build the agent.

<InteractiveChecklist 
  title="7-Day Implementation Sprint" 
  persistKey="custom-ai-agents-L7-sprint" 
  items={[
    "Day 1: Set up transcript source (Zoom auto-transcription or Otter.ai)",
    "Day 2: Build the n8n/Zapier workflow (trigger → download → clean → LLM → CRM)",
    "Day 3: Configure the prompt template with your CRM context fields",
    "Day 4: Test with 3 past call transcripts, measure accuracy",
    "Day 5: Refine prompt based on test results, re-test",
    "Day 6: Set up CRM field mapping and task creation logic",
    "Day 7: Deploy to production, run on your next 3 calls, review summaries",
    "Week 2: Spot-check 10% of summaries, track time saved, iterate on prompt"
  ]} 
/>

**Success metric:** By end of Week 2, you should be saving 10+ minutes per call and capturing 80%+ of key details automatically.

---

## Summary: Why This Agent Is Non-Negotiable

Let's recap why the Post-Call Summary Agent is your highest-ROI agent:

<FlipCard 
  front="Time Savings" 
  back="10-15 minutes per call. At 10 calls/week, that's 100-150 minutes/week = 86-130 hours/year saved." 
/>

<FlipCard 
  front="Quality Improvement" 
  back="80-90% capture rate vs 30-40% with manual notes. You remember what matters, deliver what you promised, and close more deals." 
/>

<FlipCard 
  front="Cost" 
  back="$17-47/year (depending on model). Less than a single lunch meeting. Absurd ROI." 
/>

<FlipCard 
  front="Churn Prevention" 
  back="When you have a complete record of what you promised, you can deliver on it. Lower churn = higher LTV." 
/>

<FlipCard 
  front="Handoff Quality" 
  back="If you hire a CSM or onboarding specialist, they get complete context. No 'Sarah promised what?' moments." 
/>

**The bottom line:** This agent pays for itself after 2-3 calls. Everything after that is pure profit (time and quality).

---

## Next Lesson Preview

You've now built 5 core sales agents:
1. ✅ Prospect Research Agent
2. ✅ Email First-Draft Agent
3. ✅ CRM Enrichment Agent
4. ✅ Meeting Prep Agent
5. ✅ Post-Call Summary Agent

In **Lesson 8: Multi-Agent Orchestration & Data Flows**, we'll connect these agents into a unified system. You'll learn:
- How to design data flows between agents (research → draft → prep → summary)
- When to use sequential vs parallel agent execution
- How to handle agent failures and retries
- How to monitor and debug multi-agent pipelines
- Self-hosted vs SaaS architecture decisions

See you there.