---
title: "ICP-Fit Scoring Agent (1-10 Model)"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 6
---

You've enriched 400 leads. Email addresses verified. Company data pulled. Tech stacks mapped.

Now what?

**You can't manually review 400 prospects.** You don't have time. And even if you did, your gut-feel scoring would be inconsistent — prospect #47 gets a "maybe" on Monday morning, but the same profile gets a "no" on Friday afternoon when you're tired.

This is where most solo founders fail. They treat every lead the same. Send the same sequence to everyone. Wonder why reply rates are 2% instead of 12%.

**The fix:** An AI scoring agent that evaluates every prospect in 3 seconds, assigns a 1-10 score, and routes them to the right action.

In this lesson, you'll build that agent.

---

## The Scoring Problem (And Why Humans Fail at It)

Let's run a quick test.

<RangeSlider 
  label="How long does it take you to manually score a prospect right now?" 
  min={0} 
  max={10} 
  lowLabel="0 min (I don't score)" 
  highLabel="10+ min" 
  persistKey="ai-lead-research-L6-manual-time" 
/>

If you answered anything above 2 minutes, you're spending too much time. If you answered 0, you're wasting money on bad leads.

**The data is brutal:**
- Manual scoring takes 2-5 minutes per lead (Practitioner estimates)
- Only 25% of marketing leads are actually sales-ready (Gleanster Research)
- Companies with lead scoring convert 20-30% more leads (Forrester/HubSpot)
- AI-based scoring is 40-60% more accurate than rule-based systems for small datasets (HubSpot/Salesforce)

**Translation:** You're either spending hours scoring leads manually, or you're treating a VP at a recently-funded SaaS company the same as an intern at a bootstrapped agency.

<InsightCard icon="🎯" title="The Real Cost">
If you send 100 emails to unscored leads at 3% reply rate, you get 3 conversations. If you score first and only email the top 40 at 12% reply rate, you get 5 conversations — in 60% less time.
</InsightCard>

---

## The FIT + SIGNAL + FRICTION Model (Refresher)

You learned this framework in Course 21, Lesson 4. Now you're going to automate it.

<FlipCard 
  front="FIT (0-4 points)" 
  back="Does this prospect match your ICP? Industry, title, company size, tech stack. The closer the match, the higher the score." 
/>

<FlipCard 
  front="SIGNAL (0-4 points)" 
  back="Is there a buying trigger right now? Job change, funding, hiring, tech adoption. Signals indicate timing and intent." 
/>

<FlipCard 
  front="FRICTION (0 to -2 points)" 
  back="Are there deal-killers? Enterprise sales cycles, committee buying, regulated industries. Friction subtracts from the total." 
/>

**Total Score = FIT + SIGNAL - FRICTION** (clamped to 1-10)

Let's see if you remember how this works.

<ClassifyExercise
  title="Score These Prospects"
  persistKey="ai-lead-research-L6-classify"
  categories={[
    { id: "high", label: "8-10 (Tier A)", color: "#10b981" },
    { id: "medium", label: "5-7 (Tier B)", color: "#f59e0b" },
    { id: "low", label: "1-4 (Tier C)", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "VP Marketing at 200-person SaaS company, raised $10M Series A 3 months ago, hiring 2 SDRs", 
      correctCategory: "high" 
    },
    { 
      id: "2", 
      content: "Marketing Coordinator at 5,000-person enterprise, no recent changes, 9-month sales cycle", 
      correctCategory: "low" 
    },
    { 
      id: "3", 
      content: "Director of Sales at 80-person agency, changed jobs 60 days ago, uses HubSpot", 
      correctCategory: "high" 
    },
    { 
      id: "4", 
      content: "Founder at 12-person startup, no funding, bootstrapped, active on LinkedIn", 
      correctCategory: "medium" 
    }
  ]}
/>

Good. Now let's build the agent that does this automatically.

---

## Building Your Scoring Agent (Step-by-Step)

You're going to create a scoring agent that takes enriched prospect data and outputs a structured score with reasoning.

**The agent needs three things:**
1. **Your ICP criteria** (what defines FIT for you)
2. **Signal definitions** (what buying triggers matter)
3. **Friction flags** (what makes deals hard)

Let's start with FIT.

<TemplateBuilder
  title="Define Your FIT Criteria"
  persistKey="ai-lead-research-L6-fit"
  sections={[
    {
      id: "industry",
      title: "Industry Match (+1 point)",
      fields: [
        { 
          id: "industries", 
          label: "Target Industries", 
          placeholder: "e.g., B2B SaaS, Fintech, MarTech", 
          type: "text" 
        }
      ]
    },
    {
      id: "title",
      title: "Title Match (+1 point)",
      fields: [
        { 
          id: "titles", 
          label: "Target Titles", 
          placeholder: "e.g., VP/Director/Head of Marketing, Sales, Growth", 
          type: "text" 
        }
      ]
    },
    {
      id: "size",
      title: "Company Size Match (+1 point)",
      fields: [
        { 
          id: "size_range", 
          label: "Employee Range", 
          placeholder: "e.g., 50-500 employees", 
          type: "text" 
        }
      ]
    },
    {
      id: "tech",
      title: "Tech Stack Match (+1 point)",
      fields: [
        { 
          id: "tech_stack", 
          label: "Key Technologies", 
          placeholder: "e.g., HubSpot, Salesforce, Outreach", 
          type: "text" 
        }
      ]
    }
  ]}
/>

Now SIGNAL criteria.

<TemplateBuilder
  title="Define Your SIGNAL Triggers"
  persistKey="ai-lead-research-L6-signal"
  sections={[
    {
      id: "job_change",
      title: "Job Change (+1 point)",
      fields: [
        { 
          id: "job_change_window", 
          label: "Time Window", 
          placeholder: "e.g., Past 90 days", 
          type: "text" 
        }
      ]
    },
    {
      id: "funding",
      title: "Recent Funding (+1 point)",
      fields: [
        { 
          id: "funding_window", 
          label: "Time Window", 
          placeholder: "e.g., Past 6 months", 
          type: "text" 
        }
      ]
    },
    {
      id: "hiring",
      title: "Hiring for Relevant Roles (+1 point)",
      fields: [
        { 
          id: "hiring_roles", 
          label: "Target Roles", 
          placeholder: "e.g., Sales, Marketing, Growth", 
          type: "text" 
        }
      ]
    },
    {
      id: "engagement",
      title: "Recent Engagement (+1 point)",
      fields: [
        { 
          id: "engagement_types", 
          label: "Engagement Signals", 
          placeholder: "e.g., Downloaded content, evaluated competitor, posted about pain point", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

And FRICTION flags.

<TemplateBuilder
  title="Define Your FRICTION Flags"
  persistKey="ai-lead-research-L6-friction"
  sections={[
    {
      id: "sales_cycle",
      title: "Long Sales Cycle (-1 point)",
      fields: [
        { 
          id: "cycle_length", 
          label: "What qualifies as 'long'?", 
          placeholder: "e.g., >6 months typical", 
          type: "text" 
        }
      ]
    },
    {
      id: "committee",
      title: "Committee Buying (-1 point)",
      fields: [
        { 
          id: "stakeholder_count", 
          label: "Stakeholder Threshold", 
          placeholder: "e.g., >3 stakeholders required", 
          type: "text" 
        }
      ]
    }
  ]}
/>

Perfect. Now let's turn this into a scoring agent prompt.

---

## The Scoring Agent Prompt (Your Production Template)

Here's the system prompt that powers your scoring agent. This is what you'll paste into Clay, n8n, or a custom API workflow.

```
You are a lead scoring agent for [YOUR COMPANY]. Score each prospect 1-10
based on three dimensions:

FIT (0-4 points):
+1 if industry matches: [YOUR INDUSTRIES FROM ABOVE]
+1 if title matches: [YOUR TITLES FROM ABOVE]
+1 if company size matches: [YOUR SIZE RANGE FROM ABOVE]
+1 if tech stack includes: [YOUR TECH STACK FROM ABOVE]

SIGNAL (0-4 points):
+1 if changed jobs in past [YOUR JOB CHANGE WINDOW]
+1 if company raised funding in past [YOUR FUNDING WINDOW]
+1 if company is hiring for [YOUR HIRING ROLES]
+1 if recently engaged with [YOUR ENGAGEMENT TYPES]

FRICTION (0 to -2 points):
-1 if enterprise sales cycle ([YOUR CYCLE LENGTH])
-1 if committee buying ([YOUR STAKEHOLDER COUNT])

TOTAL = FIT + SIGNAL - FRICTION (clamp to 1-10)

OUTPUT FORMAT (JSON):
{
  "fit_score": 3,
  "fit_reasons": ["industry match", "title match", "size match"],
  "signal_score": 2,
  "signal_reasons": ["job change", "recent funding"],
  "friction_score": -1,
  "friction_reasons": ["committee buying"],
  "total_score": 4,
  "priority_tier": "B",
  "recommended_action": "Automated sequence",
  "confidence": "high"
}

TIER THRESHOLDS:
8-10 = Tier A (immediate personal outreach)
5-7 = Tier B (automated sequence)
1-4 = Tier C (nurture or disqualify)

RULES:
- Only score based on data provided
- If data is missing for a criterion, score 0 for that criterion
- Never guess or invent data
- Confidence = "high" if 80%+ of fields present, "medium" if 50-79%, "low" if <50%
```

<InsightCard icon="⚙️" title="Why JSON Output?">
Structured JSON means you can parse the score, tier, and reasoning automatically. No manual copy-paste. The agent's output becomes the input for your next pipeline stage (personalization).
</InsightCard>

---

## Implementing the Agent (Clay vs. n8n vs. Spreadsheet)

You have three implementation paths. Choose based on your budget and technical comfort.

<SlideNavigation>
<Slide title="Option 1: Clay AI Column">

**Best for:** Non-technical founders with budget for Clay ($149/mo+)

**Setup:**
1. Add "AI Column" to your enriched leads table
2. Paste the scoring prompt above
3. Map input columns: First Name, Last Name, Company, Title, Industry, Company Size, Tech Stack, Job Changed (bool), Recent Funding (bool), Hiring (bool)
4. Choose model: GPT-4o or Claude 3.5 Sonnet
5. Run on all rows

**Cost:** ~1-2 Clay credits per score = ~$0.07-0.14 per lead

**Speed:** 500 leads scored in ~5 minutes

**Output:** JSON parsed into individual columns (fit_score, signal_score, total_score, tier)

</Slide>

<Slide title="Option 2: n8n Workflow">

**Best for:** Technical founders or those with time to learn automation

**Setup:**
1. Create new n8n workflow
2. Trigger: Google Sheets "New Row" or Webhook
3. Add "OpenAI" or "Anthropic" node
4. Paste scoring prompt in system message
5. Map enriched lead data to user message as JSON
6. Parse JSON response
7. Write scores back to Google Sheets or CRM

**Cost:** API calls only (~$0.01-0.03 per score)

**Speed:** 500 leads scored in ~10 minutes (API rate limits)

**Output:** Scores written to spreadsheet or CRM

**Bonus:** You own the workflow; no vendor lock-in

</Slide>

<Slide title="Option 3: Google Sheets + Apps Script">

**Best for:** Budget-conscious founders comfortable with light scripting

**Setup:**
1. Create Google Sheet with enriched leads
2. Add Apps Script function that calls ChatGPT API
3. Loop through rows, send data to API, write scores back
4. Run manually or on a trigger

**Cost:** ChatGPT API only (~$0.01-0.03 per score)

**Speed:** 500 leads scored in ~15-20 minutes (slower due to Apps Script limits)

**Output:** Scores in adjacent columns

**Limitation:** Slower than Clay/n8n; manual trigger required

</Slide>
</SlideNavigation>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
If you're comfortable with Python or Node.js, skip the no-code tools. Build a simple script that reads a CSV, calls the OpenAI/Anthropic API, and writes scores back. You'll save $150/mo on Clay and have full control.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches/Consultants">
Clay is worth the investment here. You're selling high-ticket services — the time saved on manual scoring pays for itself in one client conversation. Focus on the strategy, not the plumbing.
</ContextualNote>

---

## Calibration: Making Sure Your Agent Works

Your scoring agent is only as good as its criteria. If it scores bad leads high and good leads low, it's worse than no scoring at all.

**The calibration process:**

<ProgressiveReveal title="4-Step Calibration Protocol" persistKey="ai-lead-research-L6-calibration">
<RevealSection title="Step 1: Gather Historical Data">

Pull 20 past prospects:
- 10 that **converted** (became customers)
- 10 that **didn't convert** (rejected, ghosted, or bad fit)

Make sure you have enriched data for all 20 (industry, title, size, tech stack, signals).

</RevealSection>

<RevealSection title="Step 2: Run the Scoring Agent">

Feed all 20 prospects through your scoring agent. Record the scores.

**What you're looking for:**
- Did the 10 converters score higher on average than the 10 non-converters?
- Are there any converters scoring &lt;5? (False negatives)
- Are there any non-converters scoring >7? (False positives)

</RevealSection>

<RevealSection title="Step 3: Adjust Weights and Criteria">

If accuracy is &lt;70%, adjust:
- **Fit criteria too broad?** Tighten industry or title definitions
- **Signal criteria too weak?** Add more weight to job changes or funding
- **Friction criteria missing?** Add flags for deal-killers you've experienced

**Example adjustment:**
- Original: "+1 if company size 10-1,000 employees"
- Revised: "+1 if company size 50-500 employees" (tighter range)

</RevealSection>

<RevealSection title="Step 4: Re-Score and Validate">

Run the adjusted agent on the same 20 prospects. Compare scores.

**Target accuracy:** 80%+ (16 out of 20 scored correctly)

If you hit 80%, save this as your production prompt. If not, repeat Step 3.

**Pro tip:** Re-calibrate monthly with new conversion data. Your ICP evolves; your scoring should too.

</RevealSection>
</ProgressiveReveal>

Let's practice calibration with a simulation.

<TimedChallenge
  title="Calibration Challenge: Spot the Mis-Scores"
  persistKey="ai-lead-research-L6-calibration-challenge"
  timeLimit={90}
  items={[
    { 
      id: "1", 
      prompt: "Prospect: VP Sales at 300-person SaaS, raised $15M, hiring 3 SDRs. Score: 9. Outcome: Converted. Correct?", 
      correctAnswer: "correct", 
      explanation: "High fit + strong signals = accurate high score." 
    },
    { 
      id: "2", 
      prompt: "Prospect: Marketing Intern at 10-person startup, no funding, no signals. Score: 7. Outcome: Ghosted. Correct?", 
      correctAnswer: "incorrect", 
      explanation: "False positive. Intern + tiny company + no signals should score 2-3, not 7. Criteria too loose." 
    },
    { 
      id: "3", 
      prompt: "Prospect: Director Marketing at 150-person agency, changed jobs 45 days ago. Score: 6. Outcome: Converted. Correct?", 
      correctAnswer: "incorrect", 
      explanation: "False negative. Job change + mid-market agency should score 8+. Signal weight too low." 
    },
    { 
      id: "4", 
      prompt: "Prospect: VP Ops at 5,000-person enterprise, 12-month sales cycle, 5 stakeholders. Score: 3. Outcome: Rejected. Correct?", 
      correctAnswer: "correct", 
      explanation: "High friction correctly penalized. Enterprise + committee = low score." 
    }
  ]}
/>

---

## Action Thresholds: What to Do With Each Tier

Scoring is useless if you don't act on it. Here's what to do with each tier.

<FlipCard 
  front="Tier A (8-10): Hot Leads" 
  back="Personal outreach within 24 hours. Founder calls or highly customized emails. Manual review required. ~10-20% of your list." 
/>

<FlipCard 
  front="Tier B (5-7): Warm Leads" 
  back="Automated 5-7 step sequence with AI personalization. No manual review. ~40-50% of your list." 
/>

<FlipCard 
  front="Tier C (1-4): Cold/Nurture" 
  back="Add to newsletter nurture or disqualify. Don't waste time on active outreach. ~30-40% of your list." 
/>

**The math:**
- 400 enriched leads
- 60 Tier A (15%) → 60 personal emails → 12% reply rate = 7 conversations
- 180 Tier B (45%) → automated sequence → 6% reply rate = 11 conversations
- 160 Tier C (40%) → nurture or discard

**Total:** 18 conversations from 240 outreach touches (A+B), instead of 12 conversations from 400 generic emails.

<InsightCard icon="📊" title="The Tier Distribution Rule">
If >25% of your leads are Tier A, your criteria are too loose. If &lt;10% are Tier A, your criteria are too strict or your list quality is poor. Aim for 10-20% Tier A.
</InsightCard>

---

## Real-World Example: Sarah's SaaS Scoring Agent

<ExampleCard label="Case Study: The $40K Scoring Fix">

**Background:** Sarah sells a marketing attribution tool to B2B SaaS companies. She was sending 200 cold emails/week to anyone with "marketing" in their title. Reply rate: 2.5%. Meetings: 1-2/week.

**The Problem:** She was treating a CMO at a Series B company the same as a Marketing Coordinator at a 10-person startup.

**The Fix:** Built a scoring agent with these criteria:

**FIT:**
- Industry: B2B SaaS (+1)
- Title: VP/Director/Head of Marketing (+1)
- Company size: 50-500 employees (+1)
- Tech stack: HubSpot OR Salesforce (+1)

**SIGNAL:**
- Raised funding in past 6 months (+1)
- Hiring for marketing roles (+1)
- Changed jobs in past 90 days (+1)
- Posted about attribution challenges (+1)

**FRICTION:**
- Enterprise (>500 employees) (-1)
- Regulated industry (healthcare, finance) (-1)

**Results after 30 days:**
- 200 leads enriched and scored
- 35 Tier A (17.5%) → personal outreach → 14% reply rate = 5 conversations
- 90 Tier B (45%) → automated sequence → 7% reply rate = 6 conversations
- 75 Tier C (37.5%) → disqualified

**Total:** 11 conversations from 125 outreach touches (vs. 5 from 200 before)

**Revenue impact:** 3 new customers in 60 days = $40K ARR

**Time saved:** 6 hours/week (no more manual prospect review)

</ExampleCard>

---

## Building Your Scoring Agent (Hands-On)

Time to build yours. Use the criteria you defined earlier.

<ComparisonBuilder
  title="Your Scoring Agent Prompt"
  persistKey="ai-lead-research-L6-prompt-builder"
  prompt="Write your complete scoring agent system prompt using the FIT + SIGNAL + FRICTION model"
  expertExample="You are a lead scoring agent for Acme Marketing Tools. Score each prospect 1-10 based on three dimensions:

FIT (0-4 points):
+1 if industry matches: B2B SaaS, Fintech, MarTech
+1 if title matches: VP/Director/Head of Marketing, Growth, Revenue
+1 if company size matches: 50-500 employees
+1 if tech stack includes: HubSpot OR Salesforce OR Marketo

SIGNAL (0-4 points):
+1 if changed jobs in past 90 days
+1 if company raised funding in past 6 months
+1 if company is hiring for marketing or sales roles
+1 if recently posted about attribution or ROI challenges

FRICTION (0 to -2 points):
-1 if enterprise sales cycle (>6 months typical)
-1 if committee buying (>3 stakeholders required)

TOTAL = FIT + SIGNAL - FRICTION (clamp to 1-10)

OUTPUT FORMAT (JSON):
{
  &quot;fit_score&quot;: 3,
  &quot;fit_reasons&quot;: [&quot;industry match&quot;, &quot;title match&quot;, &quot;size match&quot;],
  &quot;signal_score&quot;: 2,
  &quot;signal_reasons&quot;: [&quot;job change&quot;, &quot;recent funding&quot;],
  &quot;friction_score&quot;: -1,
  &quot;friction_reasons&quot;: [&quot;committee buying&quot;],
  &quot;total_score&quot;: 4,
  &quot;priority_tier&quot;: &quot;B&quot;,
  &quot;recommended_action&quot;: &quot;Automated sequence&quot;,
  &quot;confidence&quot;: &quot;high&quot;
}

TIER THRESHOLDS:
8-10 = Tier A (immediate personal outreach)
5-7 = Tier B (automated sequence)
1-4 = Tier C (nurture or disqualify)"
  criteria={[
    "Includes all 4 FIT criteria with specific values",
    "Includes all 4 SIGNAL criteria with time windows",
    "Includes at least 2 FRICTION flags",
    "Specifies JSON output format",
    "Defines tier thresholds and actions"
  ]}
/>

---

## Common Scoring Mistakes (And How to Avoid Them)

<StrategyDuel
  title="Scoring Approach Duel"
  persistKey="ai-lead-research-L6-duel"
  scenario="You have 300 enriched leads. How do you score them?"
  strategyA={{ 
    name: "Score Everyone the Same", 
    description: "Send the same sequence to all 300 leads", 
    pros: ["Simple", "Fast to set up"], 
    cons: ["Wastes time on bad leads", "Misses high-intent prospects", "Low reply rate"] 
  }}
  strategyB={{ 
    name: "AI Scoring + Tiered Outreach", 
    description: "Score all 300, tier into A/B/C, customize approach per tier", 
    pros: ["Higher reply rates", "Better time allocation", "Measurable improvement"], 
    cons: ["Requires setup", "Needs calibration"] 
  }}
  expertVerdict="Strategy B wins every time. The setup cost is 2-3 hours. The ROI is 2-3x more conversations. No contest."
/>

**Mistake #1: Scoring without calibration**
- **Problem:** Your criteria don't match reality
- **Fix:** Run calibration on 20 historical prospects before going live

**Mistake #2: Too many criteria**
- **Problem:** Scoring becomes too complex; agent gets confused
- **Fix:** Stick to 4 FIT + 4 SIGNAL + 2 FRICTION max

**Mistake #3: Ignoring confidence scores**
- **Problem:** You trust low-confidence scores equally with high-confidence
- **Fix:** Only auto-route Tier B/C if confidence = "high"; manually review "medium" or "low"

**Mistake #4: Not re-calibrating**
- **Problem:** Your ICP evolves; your scoring doesn't
- **Fix:** Re-calibrate monthly with actual conversion data

**Mistake #5: Scoring without acting**
- **Problem:** You score leads but don't change your outreach approach
- **Fix:** Define clear actions for each tier (see Action Thresholds above)

---

## Your Scoring Agent Checklist

<InteractiveChecklist 
  title="Scoring Agent Implementation Checklist" 
  persistKey="ai-lead-research-L6-checklist" 
  items={[
    "Define FIT criteria (4 max)",
    "Define SIGNAL triggers (4 max)",
    "Define FRICTION flags (2 max)",
    "Write scoring agent system prompt",
    "Choose implementation path (Clay/n8n/Spreadsheet)",
    "Set up scoring workflow in chosen tool",
    "Run calibration on 20 historical prospects",
    "Adjust criteria if accuracy &lt;80%",
    "Define action thresholds for Tier A/B/C",
    "Score first batch of 50-100 leads",
    "Review scores manually (spot-check 10%)",
    "Deploy to production pipeline",
    "Schedule monthly re-calibration"
  ]} 
/>

---

## What's Next

You now have a scoring agent that evaluates every prospect in 3 seconds and routes them to the right action.

**Next lesson:** You'll build the **Personalization Agent** that takes your Tier A and B leads and generates custom first lines, icebreakers, and value props in seconds.

**The pipeline so far:**
1. ✅ Discover (Apollo, Sales Nav)
2. ✅ Enrich (Waterfall)
3. ✅ Score (This lesson)
4. ⏭️ Personalize (Next lesson)
5. ⏭️ Send (Lesson 8)

You're 60% of the way to a fully automated, AI-powered acquisition system.

---

## Quick Quiz: Test Your Scoring Knowledge

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "A prospect scores 9 on FIT but 0 on SIGNAL and -1 on FRICTION. What's their total score?",
      "options": [
        "9",
        "8",
        "10",
        "7"
      ],
      "correctIndex": 1,
      "explanation": "9 (FIT) + 0 (SIGNAL) - 1 (FRICTION) = 8. Scores are clamped to 1-10."
    },
    {
      "id": "q2",
      "question": "What's the #1 strongest buying signal according to LinkedIn data?",
      "options": [
        "Recent funding",
        "Job change in past 90 days",
        "Hiring for relevant roles",
        "Posted about pain point"
      ],
      "correctIndex": 1,
      "explanation": "Job changes make prospects 3x more likely to buy within 90 days (LinkedIn Sales Solutions data)."
    },
    {
      "id": "q3",
      "question": "If 40% of your leads are scoring Tier A (8-10), what's the problem?",
      "options": [
        "Your list quality is amazing",
        "Your criteria are too loose",
        "Your scoring agent is broken",
        "Nothing — that's ideal"
      ],
      "correctIndex": 1,
      "explanation": "Aim for 10-20% Tier A. If >25% are Tier A, your criteria are too loose and you're not filtering effectively."
    },
    {
      "id": "q4",
      "question": "How often should you re-calibrate your scoring agent?",
      "options": [
        "Never — set it and forget it",
        "Weekly",
        "Monthly",
        "Yearly"
      ],
      "correctIndex": 2,
      "explanation": "Monthly re-calibration with actual conversion data keeps your scoring accurate as your ICP evolves."
    },
    {
      "id": "q5",
      "question": "What should you do with Tier C (1-4) leads?",
      "options": [
        "Send them the same sequence as Tier A",
        "Add to newsletter nurture or disqualify",
        "Call them immediately",
        "Score them again next week"
      ],
      "correctIndex": 1,
      "explanation": "Tier C leads are low-fit or high-friction. Don't waste active outreach time — nurture or discard."
    }
  ]
}