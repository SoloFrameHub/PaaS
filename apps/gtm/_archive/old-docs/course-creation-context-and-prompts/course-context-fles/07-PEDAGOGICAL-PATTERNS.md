# 07-PEDAGOGICAL-PATTERNS.md
## Teaching Methodology & Content Structure Patterns

**File Size:** ~25KB  
**Purpose:** Codify teaching-first methodology into reusable patterns for course creation  
**Dependencies:** Startup Academy Project Prompt, Mike's 3 manuscripts

---

## TABLE OF CONTENTS

1. [Core Teaching Philosophy](#core-teaching-philosophy)
2. [The Five Teaching Modes](#the-five-teaching-modes)
3. [Lesson Structure Templates](#lesson-structure-templates)
4. [Content Generation Workflow](#content-generation-workflow)
5. [Assessment Design Patterns](#assessment-design-patterns)
6. [Founder Mindset Mini-Trainings](#founder-mindset-mini-trainings)
7. [Content Quality Metrics](#content-quality-metrics)

---

## Core Teaching Philosophy

### Foundational Principles

**1. Explanation Before Application**
- Teach the "why" and "how" deeply before asking founders to "do"
- Build mental models before expecting execution
- Strategic understanding precedes tactical implementation

**2. Frameworks Over Tactics**
- Build systematic thinking capacity, not quick fixes
- Teach systems that founders can adapt to their unique situations
- Mental models outlast specific tactics

**3. Analysis Over Reaction**
- Develop thoughtful decision-making capacity
- Encourage strategic consideration before action
- Cultivate patience in strategic planning

**4. Strategic Depth Over Speed**
- Quality of thinking matters more than rapid execution
- Deep understanding creates sustainable competitive advantage
- Founders who think strategically make better tactical decisions

### Content Distribution (70/20/10 Rule)

- **70% Teaching** - Comprehensive explanatory content
- **20% Practice** - Guided exercises and framework application
- **10% Engagement** - Gamification, community, motivation

This differs from typical course platforms that prioritize engagement over substance.

---

## The Five Teaching Modes

### Mode 1: Explanation (The Teaching)

**Purpose:** Build comprehensive understanding before application

**Pattern Structure:**
```markdown
## Concept Introduction
- What is this framework/system?
- Why does it matter for solo founders?
- When should you use it?

## Theoretical Foundation
- Underlying principles and logic
- Research or evidence supporting the approach
- Connection to broader business strategy

## Strategic Context
- When to apply this framework
- When NOT to apply it (important!)
- Prerequisites and readiness signals
- Common situations where it excels

## Visual Framework Maps
- System diagram showing all components
- Relationships between elements
- Information flows
- Decision points

## Step-by-Step Methodology
1. Detailed breakdown of each step
2. What to do and why you're doing it
3. Expected outputs from each step
4. Quality criteria for each step

## Common Mistakes
- What founders typically get wrong
- Why these mistakes happen
- How to avoid them
- Red flags indicating you're off track

## Expert Commentary
- Insights from Mike's manuscripts
- Real-world observations
- Nuanced considerations
- Advanced applications
```

**Quality Criteria:**
- Depth score: Does it explain WHY comprehensively?
- Clarity score: Can a beginner understand it?
- Actionability score: Is the path forward clear?
- Completeness score: Are all key aspects covered?

**AI Generation Template:**
```
---
model: gemini-2.5-pro
input:
  schema:
    framework_name: string
    framework_components: array<string>
    target_audience: string
    manuscript_excerpts: string
output:
  schema:
    concept_introduction: string
    theoretical_foundation: string
    strategic_context: string
    methodology_steps: array<object>
    common_mistakes: array<object>
    expert_commentary: string
---

Generate comprehensive explanatory content for the {{framework_name}} framework.

TARGET AUDIENCE: {{target_audience}}
FRAMEWORK COMPONENTS: {{framework_components}}

SOURCE MATERIAL:
{{manuscript_excerpts}}

REQUIREMENTS:
1. Explanation-before-application: Build understanding deeply before suggesting action
2. Strategic context: Explain when to use and when to avoid
3. Practical methodology: Step-by-step process with clear rationale
4. Common pitfalls: What founders get wrong and how to avoid it
5. Expert insights: Draw from the manuscript excerpts provided

OUTPUT STRUCTURE:
- Concept introduction (200-300 words)
- Theoretical foundation (300-400 words)
- Strategic context (200-250 words)
- Methodology (6-10 steps, each with explanation)
- Common mistakes (5-7 mistakes with explanations)
- Expert commentary (250-300 words)

TONE: Professional educator with deep practitioner experience. Avoid hype, focus on strategic truth.
```

---

### Mode 2: Evidence (The Proof)

**Purpose:** Show frameworks in action through real case studies

**Case Study Pattern:**
```markdown
## Company Profile
- Company name and industry
- Stage when framework applied (idea, pre-launch, 0-10K MRR, etc.)
- Team size (emphasize if solo founder or small team)
- Initial challenge or situation

## Challenge Description
- Specific problem they faced
- Why traditional approaches wouldn't work
- Constraints (budget, time, skills)
- Stakes (what would happen if they didn't solve this)

## Framework Application
- Which framework they used
- How they adapted it to their situation
- Step-by-step execution
- Key decisions at each step
- Resources required

## Execution Details
- Timeline (how long did it take?)
- Specific tactics and tools used
- Obstacles encountered
- How they overcame blockers
- Iterations and adjustments

## Results and Metrics
- Quantified outcomes (revenue, customers, growth rate)
- Before/after comparisons
- Time to achieve results
- Resource investment vs return
- Unexpected positive outcomes

## Lessons Learned
- What worked better than expected
- What didn't work as planned
- Key insights gained
- What they'd do differently
- Advice for others

## Transferable Insights
- Which aspects apply universally
- What's unique to their situation
- How to adapt for different contexts
- Prerequisites for replication
```

**Case Study Selection Criteria:**

âœ… **Include:**
- Bootstrapped, profitable companies (no VC-funded unicorns)
- Solo founders or teams < 10 people
- Clear before/after metrics
- Replicable strategies
- Recent examples (last 3-5 years)
- Diverse industries

âŒ **Avoid:**
- VC-funded success stories
- Viral luck stories
- Survivorship bias examples
- Tactics that worked once but aren't repeatable
- Overly industry-specific cases

**AI Case Study Generation:**
```
Given this business outcome:
- Company: {{company_name}}
- Framework used: {{framework_name}}
- Result: {{outcome_description}}

Generate a detailed case study following the pattern:
1. Profile (who they are, what they build)
2. Challenge (specific problem, why it mattered)
3. Application (how they used the framework)
4. Execution (what they actually did, step-by-step)
5. Results (quantified outcomes with timeline)
6. Lessons (key takeaways)
7. Transferability (how others can apply this)

Emphasize:
- Specific tactics, not vague advice
- Resource constraints and how they overcame them
- Timeline realism (not overnight success)
- Mistakes and course corrections
- Replicability for other founders

AVOID:
- Hype language
- Survivorship bias
- Attributing success solely to the framework
- Unrealistic expectations
```

---

### Mode 3: Practice (The Application)

**Purpose:** Provide structured exercises to apply frameworks

**Strategic Exercise Pattern:**
```markdown
## Exercise Overview
- Framework being practiced
- Learning objective
- Estimated time (15-60 minutes)
- Required materials/resources

## Context Setting
- Scenario description OR use your own business
- Key constraints or parameters
- Success criteria

## Starter Questions
Questions designed to activate thinking:
1. "Before applying the framework, what's your intuitive approach?"
2. "What's the core problem you're trying to solve?"
3. "What information do you need to gather first?"

## Step-by-Step Application
### Step 1: [Component Name]
- What to do
- Why this step matters
- Expected output
- Quality check questions

### Step 2: [Next Component]
[Repeat pattern]

## AI Coaching Available
"Click 'Get AI Help' at any step for:
- Clarifying questions
- Examples from similar situations
- Alternative approaches to consider
- Validation of your thinking"

## Self-Assessment Questions
After completing the exercise:
1. "Does your output pass the [specific quality test]?"
2. "Have you considered [key factor often overlooked]?"
3. "How would this change if [variable changed]?"

## Submit for Evaluation
- AI will score your strategic thinking depth
- Receive detailed feedback
- See exemplar responses
- Earn competency points
```

**Exercise Types:**

1. **Framework Completion Exercises**
   - Fill in Business Model Canvas
   - Complete GTM Strategy template
   - Build Unit Economics model

2. **Scenario Analysis Exercises**
   - Given situation, apply framework to solve
   - Multiple valid approaches
   - Emphasis on reasoning quality

3. **Strategy Critique Exercises**
   - Analyze a provided strategy
   - Identify strengths and weaknesses
   - Propose improvements
   - Defend your analysis

4. **Decision Simulation Exercises**
   - Multi-stage decision scenario
   - Each choice affects next options
   - No single right answer
   - Evaluated on decision-making process

5. **Peer Review Exercises**
   - Review another founder's framework
   - Provide constructive feedback
   - Receive feedback on your feedback
   - Community learning

---

### Mode 4: Interactive Application (The AI Coaching)

**Purpose:** Guide founders through applying frameworks to their specific situation

**Multi-Turn Coaching Pattern:**

**Phase 1: Understand Context (2-3 turns)**
```
AI: "Tell me about your business and what you're trying to achieve with [framework]."

Founder: [Describes situation]

AI: "Thanks for sharing. A few clarifying questions:
1. [Specific question about their market]
2. [Specific question about their constraints]
3. [Specific question about their goal]"

Founder: [Answers]

AI: "Great. Based on what you've shared, I think [framework] is well-suited because [specific reason]. Let's walk through it step by step."
```

**Phase 2: Guided Exploration (4-6 turns)**
```
AI: "Let's start with [first component]. In your situation, this means thinking about [specific application].

What comes to mind when you consider [specific question]?"

Founder: [Initial thoughts]

AI: "That's a good starting point. Let me push your thinking a bit:
- Have you considered [alternative perspective]?
- What if [challenging assumption]?
- How does this connect to [previous component]?"

Founder: [Refined thinking]

AI: "Excellent. You're now thinking about [insight you've reached]. Let's capture that and move to [next component]."
```

**Phase 3: Challenge and Validate (2-3 turns)**
```
AI: "You've developed [summary of their framework application]. Let me play devil's advocate:
- What's the biggest risk in this approach?
- What assumptions are you making that might not hold?
- What's your plan B if [key assumption] proves wrong?"

Founder: [Addresses challenges]

AI: "Strong reasoning. Your framework is now more robust because you've considered [key considerations]. One more thought: [advanced insight]."
```

**Phase 4: Summarize and Next Actions (1 turn)**
```
AI: "Let's recap what you've created:
[Summary of their completed framework]

Strengths of your approach:
- [Specific strength 1]
- [Specific strength 2]

Areas to refine further:
- [Specific area 1]
- [Specific area 2]

Recommended next steps:
1. [Specific action]
2. [Specific action]
3. [Specific action]

Would you like to dive deeper into any section, or shall we move to [next framework]?"
```

**AI Coaching Principles:**

1. **Socratic Questioning** - Ask don't tell
2. **Progressive Disclosure** - Reveal complexity gradually
3. **Context-Aware** - Remember previous conversations
4. **Constructively Critical** - Challenge assumptions kindly
5. **Specific Over Generic** - Avoid platitudes
6. **Connect to Prior Learning** - Reference previous frameworks

**Genkit Prompt Pattern:**
```
---
model: gemini-2.5-pro
input:
  schema:
    framework_name: string
    current_step: string
    user_input: string
    conversation_history: array
    founder_context: object
---

You are a strategic advisor helping {{founder_context.name}} apply the {{framework_name}} framework.

CURRENT STEP: {{current_step}}
THEIR LATEST INPUT: {{user_input}}

COACHING APPROACH:
1. Acknowledge what they've shared specifically
2. Ask 1-2 probing questions to deepen thinking
3. Provide 1-2 relevant examples if helpful
4. Challenge one assumption constructively
5. Suggest next step in their reasoning process

CONVERSATION SO FAR:
{{#each conversation_history}}
{{role}}: {{content}}
{{/each}}

FOUNDER CONTEXT:
- Business: {{founder_context.business_description}}
- Stage: {{founder_context.stage}}
- Goals: {{founder_context.goals}}

Respond as a thoughtful strategic advisor. Be specific, be challenging, be supportive.
```

---

### Mode 5: Evaluation (The Assessment)

**Purpose:** Measure understanding and strategic thinking quality

**Assessment Types:**

**1. Knowledge Check Questions (Conceptual Understanding)**
```markdown
## Multiple Choice (4 options, 1 correct)
Question: "When is the Business Model Canvas most useful?"

A) After you've achieved product-market fit and need to scale
B) During initial business model design and validation âœ“
C) Only when seeking VC funding
D) After generating first revenue

Explanation: The BMC is most powerful during early-stage business model design because it helps you systematically think through all interdependent aspects of your business model before committing significant resources.
```

**2. Scenario-Based Questions (Application Knowledge)**
```markdown
## Scenario Analysis
Scenario: "SaaS startup, 3 months post-launch, 50 users, $500 MRR, 10% monthly churn. Founder considering paid ads to accelerate growth."

Question: "Using unit economics thinking, what should the founder calculate before spending on ads?"

Evaluation criteria:
- Mentions LTV calculation (20 points)
- Mentions CAC budget (20 points)
- Mentions LTV:CAC ratio target (20 points)
- Mentions profitability timeline (20 points)
- Mentions churn impact on LTV (20 points)

Exemplar answer: "First, calculate LTV: if average customer pays $10/month and churns at 10%/month, average lifetime is 10 months, so LTV = $100. With that LTV, max CAC should be $33 (to hit 3:1 LTV:CAC ratio). Since current MRR is only $500, spending on ads likely leads to cash flow issues before profitability. Better to fix churn first (10% is too high), then invest in paid acquisition."
```

**3. Open-Ended Questions (Strategic Thinking Depth)**
```markdown
## Strategic Analysis
Prompt: "You've completed your Business Model Canvas for a B2B SaaS product. Your CAC is $500 and LTV is $1200 (2.4:1 ratio). Analyze your business model's health and propose one high-impact improvement."

AI Evaluation Rubric:
- **Depth (0-100)**: Does answer demonstrate multi-level thinking?
- **Evidence-Based (0-100)**: Uses specific numbers/logic vs vague statements?
- **Strategic (0-100)**: Connects to broader business goals vs tactical fixes?
- **Creativity (0-100)**: Proposes non-obvious insights?

Scoring Algorithm:
1. Parse response for key concepts (CAC, LTV, unit economics, business model)
2. Evaluate reasoning depth (surface-level, intermediate, advanced)
3. Check for specific calculations or logic
4. Assess originality of proposed improvement
5. Generate detailed feedback with scores

Output format:
{
  "depth_score": 85,
  "evidence_score": 90,
  "strategic_score": 75,
  "creativity_score": 80,
  "overall_score": 82,
  "feedback": "Strong analysis that correctly identifies the LTV:CAC ratio is below the 3:1 target. Your suggestion to improve customer retention is strategically sound because it addresses LTV (the numerator) which has compounding effects. Consider also analyzing which customer segments have highest LTV to focus acquisition there. One area to develop: specific tactics to improve retention - what's causing churn?",
  "strengths": [
    "Correct identification of LTV:CAC gap",
    "Strategic focus on retention over acquisition",
    "Understands compounding impact of retention"
  ],
  "growth_areas": [
    "More specific retention tactics needed",
    "Could segment analysis further",
    "Consider CAC reduction strategies too"
  ]
}
```

**AI Evaluation Prompt:**
```
---
model: gemini-2.5-pro
input:
  schema:
    question_prompt: string
    user_response: string
    evaluation_rubric: object
output:
  schema:
    depth_score: number
    evidence_score: number
    strategic_score: number
    creativity_score: number
    overall_score: number
    detailed_feedback: string
    strengths: array<string>
    growth_areas: array<string>
---

Evaluate this response to a strategic thinking exercise.

EXERCISE PROMPT:
{{question_prompt}}

USER RESPONSE:
{{user_response}}

EVALUATION RUBRIC:
{{evaluation_rubric}}

Assess the response on:
1. **Depth** - Surface-level vs. multi-layered analysis
2. **Evidence** - Vague claims vs. specific reasoning with numbers/logic
3. **Strategic Thinking** - Tactical fixes vs. systemic improvements
4. **Creativity** - Obvious suggestions vs. non-obvious insights

For each dimension, score 0-100 and provide specific feedback.

CRITICAL: Be constructively critical. Most responses should score 60-80 (good but room for growth). Reserve 90+ for exceptional strategic thinking.

Return structured feedback that helps the founder improve.
```

---

## Lesson Structure Templates

### Standard Lesson Template (45-60 minutes)

```markdown
# Lesson Title

## At a Glance
- **Duration:** 45-60 minutes
- **Difficulty:** Beginner / Intermediate / Advanced
- **Competencies:** SC1, SC2 (reference 12 Core Startup Competencies)
- **Prerequisites:** Link to previous lessons if applicable

## Learning Objectives
By the end of this lesson, you will be able to:
1. [Specific, measurable objective using Bloom's taxonomy action verb]
2. [Second objective]
3. [Third objective]

---

## Section 1: Introduction (5 minutes)

### Hook
[Compelling problem statement or intriguing question that makes the topic relevant]

Example: "Most founders waste 6-12 months building the wrong product because they skip this one validation step..."

### Context
[Why this lesson matters now, how it fits in the bigger picture]

### Roadmap
[What we'll cover in this lesson - brief overview of sections]

---

## Section 2: Concept Explanation (15-20 minutes)

### Core Concept Definition
[Clear, jargon-free explanation of what this is]

### Theoretical Foundation
[Why this works - underlying principles, research, or logic]

### Visual Framework Diagram
[Embedded diagram, chart, or system map]
*Description for designer: [Detailed specifications for visual]*

### Real-World Examples (3-5)
**Example 1: [Company Name]**
- Situation: [Brief context]
- Application: [How they used this concept]
- Outcome: [Result]

[Repeat for examples 2-5]

### Common Misconceptions
**Misconception 1:** "[Common wrong belief]"
**Reality:** "[Correct understanding and why misconception exists]"

[Repeat for 3-5 misconceptions]

---

## Section 3: Methodology (20-25 minutes)

### Step-by-Step Process

#### Step 1: [Action Verb] [Component]
**What to do:** [Clear instructions]
**Why it matters:** [Rationale]
**Expected output:** [What you should have after this step]
**Quality check:** [How to know you did it right]

[Repeat for 6-10 steps]

### Decision Points and Trade-offs
[Key decisions to make, with pros/cons of each option]

### Tool Recommendations
- **Tool 1:** [Name, purpose, when to use]
- **Tool 2:** [Name, purpose, when to use]

### Templates and Resources
- [Link to downloadable template]
- [Link to additional resource]

---

## Section 4: Case Study Analysis (15-20 minutes)

### Company Profile
[Background on the company used in this deep-dive case]

### Challenge Description
[Specific problem they faced that this lesson's framework helps solve]

### Framework Application
[Detailed walkthrough of how they applied the concepts from this lesson]

### Results and Outcomes
[Quantified results with timeline]

### Key Takeaways
1. [Lesson learned]
2. [Lesson learned]
3. [Lesson learned]

### Discussion Prompts
[Questions for community discussion or personal reflection]

---

## Section 5: Practice Exercise (20-30 minutes)

### Exercise Instructions
[Clear description of the task]

### Option 1: Use Your Business
[Instructions for applying to their actual business]

### Option 2: Practice Scenario
[Hypothetical scenario if they don't have a business yet]

### AI Coaching Available
"Need help? Click 'Get AI Coaching' for:
- Clarifying questions
- Examples from similar situations
- Validation of your approach"

### Self-Assessment Checklist
Before submitting, ask yourself:
- [ ] [Quality check 1]
- [ ] [Quality check 2]
- [ ] [Quality check 3]

### Submit for Evaluation
[Submit button triggers AI evaluation flow]

---

## Section 6: Summary & Next Steps (5 minutes)

### Key Takeaways Recap
1. [Main point 1]
2. [Main point 2]
3. [Main point 3]

### Connection to Next Lesson
[How this lesson sets up the next one]

### Additional Resources
- **Reading:** [Link to article/book chapter]
- **Video:** [Link to supplementary video]
- **Tool:** [Link to recommended tool]
- **Community:** [Link to discussion thread]

### Reflection Questions
1. [Question to deepen thinking]
2. [Question to connect to their situation]
3. [Question to plan next actions]

---

## Quiz (5 minutes)

### Question 1: [Multiple Choice]
[Question text]
A) [Option]
B) [Option]
C) [Option]
D) [Option]

**Correct:** B
**Explanation:** [Why B is correct and others are wrong]

[4-5 total quiz questions]

---

## Community Discussion
[Prompt a question for forum discussion]

Example: "Share your Business Model Canvas in the comments. Which block was hardest to define? Let's help each other think through it."

---

## Downloadable Resources
- [ ] [Template name].pdf
- [ ] [Worksheet name].docx
- [ ] [Checklist name].pdf
- [ ] [Framework diagram].png
```

---

## Content Generation Workflow

### From Framework to Complete Lesson (30-minute process)

**Step 1: Framework Extraction (5 min)**
```
Input: Section from Mike's manuscript describing a framework

AI Prompt: "Extract the core components of this framework:
- Framework name
- Main components (3-7 elements)
- Relationships between components
- Application context (when to use)
- Expected outcomes

Output as structured JSON."

Output:
{
  "framework_name": "LEADER Framework",
  "components": [
    "Listen for pain points",
    "Explore current situation",
    "Advocate for change",
    "Demonstrate value",
    "Earn commitment",
    "Reinforce decision"
  ],
  "relationships": "Sequential process with feedback loops",
  "context": "Discovery conversations with prospects",
  "outcomes": "Qualified leads with clear next steps"
}
```

**Step 2: Learning Objectives Generation (3 min)**
```
AI Prompt: "Given this framework: {{framework_json}}

Generate 3-5 learning objectives using Bloom's taxonomy.
Format: By the end of this lesson, you will be able to [action verb] [specific skill/knowledge].

Use action verbs: Analyze, Apply, Evaluate, Create, Compare, Design, Implement

Ensure objectives are:
- Specific (not vague)
- Measurable (can be assessed)
- Achievable (realistic for lesson duration)
- Relevant (aligned with competencies)
- Time-bound (within lesson scope)"

Output:
1. Apply the LEADER Framework to conduct effective discovery conversations
2. Analyze prospect responses to identify genuine pain points vs. surface-level complaints
3. Evaluate your discovery process using the LEADER quality checklist
```

**Step 3: Content Development (12 min)**
```
AI Prompt (Long-form generation):

"Generate comprehensive lesson content for: {{framework_name}}

SECTIONS TO GENERATE:
1. Introduction (5 min)
   - Hook: Compelling problem statement
   - Context: Why this matters for solo founders
   - Roadmap: What we'll cover

2. Concept Explanation (15-20 min)
   - Definition of the framework
   - Theoretical foundation (why it works)
   - Visual framework description (for designer)
   - 3-5 real-world examples
   - 3-5 common misconceptions

3. Methodology (20-25 min)
   - Step-by-step process (one section per component)
   - Decision points and trade-offs
   - Tool recommendations
   - Templates needed

4. Case Study (15-20 min)
   - Company profile
   - Challenge they faced
   - How they applied the framework
   - Results with metrics
   - Key takeaways

5. Practice Exercise (20-30 min)
   - Exercise instructions
   - Quality checklist
   - AI coaching prompts

6. Summary (5 min)
   - Key takeaways
   - Connection to next lesson
   - Resources

SOURCE MATERIAL:
{{manuscript_excerpt}}

AUDIENCE: Solo founders, pre-revenue to $10K MRR

TONE: Expert educator with deep practitioner experience. Avoid hype. Be specific and actionable.

CONSTRAINTS:
- 3000-4000 words total
- Include 3-5 specific examples
- At least one detailed case study
- Practical, immediately applicable
- Avoid theoretical without application"
```

**Step 4: Exercise Design (5 min)**
```
AI Prompt: "Design a strategic exercise for {{framework_name}}

REQUIREMENTS:
- Practice applying the framework to a realistic scenario OR the founder's actual business
- Include step-by-step instructions
- Provide quality assessment criteria
- Offer AI coaching touchpoints
- Create self-assessment checklist

Format as a structured exercise with clear sections:
1. Exercise Overview
2. Instructions (step-by-step)
3. AI Coaching Prompts
4. Self-Assessment Questions
5. Submission for Evaluation"
```

**Step 5: Assessment Creation (5 min)**
```
AI Prompt: "Generate 5 assessment questions for {{framework_name}}:

DISTRIBUTION:
- 2 multiple choice (conceptual understanding)
- 2 scenario-based (application)
- 1 open-ended (strategic thinking depth)

For each question:
- Question text
- Correct answer with explanation
- Common wrong answers with why they're wrong
- Difficulty level (beginner/intermediate/advanced)
- Competency mapping (SC1-SC12)"
```

---

## Assessment Design Patterns

### Rubric for Strategic Thinking Evaluation

```typescript
interface StrategicThinkingRubric {
  dimensions: {
    depth: {
      weight: 0.25
      criteria: {
        surface_level: {
          score: 0-40
          description: "Restates obvious points, no analysis"
          indicators: ["States facts without insight", "No exploration of implications"]
        }
        intermediate: {
          score: 41-70
          description: "Shows some analysis, connects concepts"
          indicators: ["Identifies relationships", "Considers alternatives"]
        }
        advanced: {
          score: 71-100
          description: "Multi-layered analysis, systemic thinking"
          indicators: ["Examines underlying causes", "Considers second-order effects"]
        }
      }
    }
    evidence_based: {
      weight: 0.25
      criteria: {
        vague: {
          score: 0-40
          description: "Generic statements, no specifics"
          indicators: ["Should/could without how", "No numbers or logic"]
        }
        supported: {
          score: 41-70
          description: "Uses some specific reasoning"
          indicators: ["References data", "Logical progression"]
        }
        rigorous: {
          score: 71-100
          description: "Data-driven with clear logic"
          indicators: ["Quantified reasoning", "Tested assumptions"]
        }
      }
    }
    strategic: {
      weight: 0.30
      criteria: {
        tactical: {
          score: 0-40
          description: "Focuses on quick fixes"
          indicators: ["Short-term only", "Isolated actions"]
        }
        integrated: {
          score: 41-70
          description: "Connects to business goals"
          indicators: ["Medium-term thinking", "Cross-functional"]
        }
        systemic: {
          score: 71-100
          description: "Addresses root causes, long-term"
          indicators: ["Systemic improvements", "Sustainable advantage"]
        }
      }
    }
    creativity: {
      weight: 0.20
      criteria: {
        obvious: {
          score: 0-40
          description: "Standard textbook answers"
          indicators: ["Generic advice", "No originality"]
        }
        thoughtful: {
          score: 41-70
          description: "Shows independent thinking"
          indicators: ["Adapts frameworks", "Context-aware"]
        }
        innovative: {
          score: 71-100
          description: "Non-obvious insights"
          indicators: ["Novel connections", "Creative solutions"]
        }
      }
    }
  }
}
```

**Automated Scoring Algorithm:**
```typescript
async function scoreStrategicThinking(
  response: string,
  rubric: StrategicThinkingRubric
): Promise<EvaluationResult> {
  // 1. Analyze response with Gemini 2.5 Pro
  const analysis = await runFlow('strategicThinkingEvaluator', {
    response,
    rubric,
  })

  // 2. Calculate weighted score
  const scores = {
    depth: analysis.depth_score * rubric.dimensions.depth.weight,
    evidence: analysis.evidence_score * rubric.dimensions.evidence_based.weight,
    strategic: analysis.strategic_score * rubric.dimensions.strategic.weight,
    creativity: analysis.creativity_score * rubric.dimensions.creativity.weight,
  }

  const overall_score = Object.values(scores).reduce((sum, s) => sum + s, 0)

  // 3. Generate detailed feedback
  const feedback = await generateFeedback(analysis, scores)

  // 4. Award competency points
  await awardCompetencyPoints(userId, competencyId, overall_score)

  return {
    overall_score,
    dimension_scores: scores,
    feedback,
    strengths: analysis.strengths,
    growth_areas: analysis.growth_areas,
  }
}
```

---

## Founder Mindset Mini-Trainings

### Structure (5 minutes per course)

Every course includes a 5-minute mental health/mindset module addressing common founder challenges.

**Topics:**
1. Loneliness and isolation
2. Decision fatigue
3. Impostor syndrome
4. Burnout prevention
5. Handling rejection
6. Managing uncertainty
7. Work-life integration
8. Perfectionism
9. Comparison trap
10. Celebrating small wins

**Template:**
```markdown
# Founder Mindset: [Topic]

## Why This Matters (1 minute)
[Research on how this affects founders]
[Impact on business outcomes]
[Why solo founders especially struggle with this]

## The Challenge Explained (1.5 minutes)
[Psychology behind why this happens]
[Common symptoms and warning signs]
[How it manifests in day-to-day work]

## Framework: [Mental Model Name] (1.5 minutes)
[Practical framework for handling it]
[Step-by-step approach]
[Daily practices]

## Quick Exercise (1 minute)
[Reflective prompt or journaling exercise]
Example: "Write down three decisions you're currently facing. Which ones actually need to be made this week? Which can wait?"

## Resources (30 seconds)
- [Link to deeper content]
- [Community support forum]
- [Professional help if needed]
```

---

## Content Quality Metrics

### Quantitative Metrics

**Completion Rates:**
- Target: 40%+ lesson completion
- 60%+ for exercises submission
- 70%+ for short quizzes

**Engagement Metrics:**
- Average time on lesson: 45-60 minutes
- AI coaching usage: 30%+ of students
- Community discussion participation: 20%+

**Performance Metrics:**
- Average quiz score: 75%+
- Strategic thinking exercise score: 70%+
- Improvement over time: +10 points across course

### Qualitative Metrics

**Founder Testimonials:**
- "This lesson changed how I think about [topic]"
- "I applied this framework immediately and [result]"
- "Best explanation of [concept] I've found"

**Business Outcomes:**
- Used framework to make real decision
- Generated revenue from applying learning
- Saved time/money by avoiding mistake
- Built something new with confidence

**Community Quality:**
- Substantive discussions (not just "great post!")
- Founders helping each other
- Real work being shared and critiqued

---

## Teaching Effectiveness Checklist

For each lesson, validate:

- [ ] **Explanation-First:** Does it teach deeply before asking to apply?
- [ ] **Strategic Depth:** Does it build mental models, not just tactics?
- [ ] **Evidence-Based:** Are there 3+ real examples?
- [ ] **Application Clear:** Can a founder immediately apply this?
- [ ] **Assessment Rigorous:** Does evaluation test actual understanding?
- [ ] **Resources Complete:** Are all templates/tools provided?
- [ ] **Visual Aids:** Are frameworks visualized clearly?
- [ ] **Progressive:** Does it build on previous lessons?
- [ ] **Accessible:** Can a beginner understand it?
- [ ] **Actionable:** Are next steps crystal clear?

---

**Total Teaching Patterns Documented:** 5 modes, 20+ templates  
**Estimated Content Creation Time:** 30 minutes per lesson with AI assistance  
**Quality Standard:** 70% teaching, 20% practice, 10% engagement  

**Related Documentation:**
- @09-CONTENT-GENERATION.md - Automated lesson generation
- @05-AI-FLOWS-LIBRARY.md - Evaluation flow specifications
- @06-INTERACTIVE-COMPONENTS.md - Interactive exercise UI