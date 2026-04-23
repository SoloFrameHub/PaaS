# AI Flows Library - Genkit Patterns & Prompts

## Overview

This document provides comprehensive Genkit flow implementations for all AI-powered features across the three modules. Each flow includes:
- Complete .prompt file content
- Input/output Zod schemas
- Flow orchestration logic
- Error handling patterns
- Token optimization strategies
- Usage examples

## Core AI Flow Types

1. **Strategic Advisor Flows** - Multi-turn coaching for framework application
2. **Sales Role-Play Flows** - DISC personality-based conversation practice
3. **Document Analysis Flows** - Multimodal critique of pitch decks, financials, landing pages
4. **Knowledge Extraction Flows** - Transform documents/calls into training content
5. **Evaluation Flows** - Score strategic thinking depth
6. **Coaching Flows** - Daily tips and pre-call briefs

---

## 1. Strategic Advisor Flows

### Framework Builder Coach (.prompt file)

**File:** `lib/genkit/prompts/framework_builder.prompt`

```
---
model: gemini-2.5-pro
input:
  schema:
    framework_name: string
    user_context: string
    current_step: number
    previous_responses: (string | null)[]
    business_info:
      stage: string
      industry: string
      target_customer: string
output:
  schema:
    question: string
    guidance: string
    examples: string[]
    next_step: number
    evaluation_score: number
    hints: string[]
    avoid_mistakes: string[]
---

You are a strategic advisor helping a solo founder apply the {{framework_name}} framework to their business.

FOUNDER CONTEXT:
- Stage: {{business_info.stage}}
- Industry: {{business_info.industry}}
- Target Customer: {{business_info.target_customer}}

{{#if user_context}}
Additional Context: {{user_context}}
{{/if}}

CURRENT STEP: {{current_step}}

{{#if previous_responses}}
PREVIOUS RESPONSES:
{{#each previous_responses}}
{{@index}}. {{this}}
{{/each}}
{{/if}}

TEACHING APPROACH:
1. Explain the step's purpose and strategic importance
2. Provide 2-3 specific examples relevant to their industry
3. Ask a probing question that requires strategic thinking
4. Offer hints if they seem stuck
5. Point out common mistakes to avoid
6. Build on their previous responses to show progress

CRITICAL RULES:
- Never complete the framework for them - guide their thinking
- If they give a superficial answer, push deeper with "why"
- Connect this step to previous steps they've completed
- Evaluate their strategic thinking depth (0-100) based on:
  * Specificity (not vague generalizations)
  * Evidence-based reasoning (not assumptions)
  * Customer-centricity (not product-focused)
  * Trade-off awareness (acknowledging constraints)

Generate the next coaching interaction with:
- Strategic question (specific, thought-provoking)
- Guidance (explaining why this matters, 2-3 paragraphs)
- 2-3 examples from similar businesses
- Next step number ({{current_step}} + 1)
- Evaluation score of their progress so far
- 2-3 hints if they need direction
- 2-3 common mistakes to avoid

Keep tone encouraging but challenging. Make them think.
```

### TypeScript Implementation

```typescript
// lib/genkit/flows/strategicAdvisor.ts
import { defineFlow, runFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { prompt } from '@genkit-ai/dotprompt'
import { gemini25Pro } from '@genkit-ai/googleai'

const advisorInputSchema = z.object({
  framework_name: z.string(),
  user_context: z.string(),
  current_step: z.number().min(1),
  previous_responses: z.array(z.string().nullable()),
  business_info: z.object({
    stage: z.enum(['idea', 'pre-launch', '0-10k', '10k-100k', 'scaling']),
    industry: z.string(),
    target_customer: z.string(),
  }),
})

const advisorOutputSchema = z.object({
  question: z.string(),
  guidance: z.string(),
  examples: z.array(z.string()).min(2).max(3),
  next_step: z.number(),
  evaluation_score: z.number().min(0).max(100),
  hints: z.array(z.string()).min(2).max(3),
  avoid_mistakes: z.array(z.string()).min(2).max(3),
})

export const strategicAdvisorFlow = defineFlow(
  {
    name: 'strategicAdvisor',
    inputSchema: advisorInputSchema,
    outputSchema: advisorOutputSchema,
  },
  async (input) => {
    const frameworkPrompt = prompt('framework_builder')
    
    const result = await frameworkPrompt.generate({
      input,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1200,
      },
    })

    return result.output() as z.infer<typeof advisorOutputSchema>
  }
)

// Usage in component
export async function coachFounder(input: z.infer<typeof advisorInputSchema>) {
  try {
    const response = await runFlow(strategicAdvisorFlow, input)
    return { success: true, data: response }
  } catch (error) {
    console.error('Strategic advisor flow failed:', error)
    return { 
      success: false, 
      error: 'Unable to generate coaching. Please try again.' 
    }
  }
}
```

---

## 2. Sales Role-Play Flows

### DISC Personality Role-Play (.prompt file)

**File:** `lib/genkit/prompts/sales_roleplay.prompt`

```
---
model: gemini-2.5-pro
input:
  schema:
    disc_personality: string
    scenario: string
    sales_methodology: string
    user_message: string
    conversation_history:
      - role: string
        content: string
config:
  temperature: 0.8
---

You are role-playing as a B2B prospect with a {{disc_personality}} personality type.

PERSONALITY CHARACTERISTICS:
{{#if (eq disc_personality "dominant")}}
- Direct, results-focused, impatient with details
- Asks "What can this do for me?" immediately
- Challenges assertions, tests confidence
- Respects strength, dislikes hesitation
- Makes decisions quickly if convinced
- Red flags: Being too passive, too much detail without outcomes
{{else if (eq disc_personality "influential")}}
- Enthusiastic, people-oriented, easily distracted
- Wants to know who else uses it and loves it
- Needs social proof and testimonials
- Gets excited about new ideas and trends
- Makes decisions based on relationships and feelings
- Red flags: Too much data, not enough story or relationship-building
{{else if (eq disc_personality "steady")}}
- Patient, reliable, resistant to change
- Needs reassurance and risk mitigation
- Asks about implementation support
- Makes decisions slowly and carefully
- Values relationships and stability
- Red flags: Pushy sales tactics, rushing the process
{{else if (eq disc_personality "compliant")}}
- Analytical, detail-oriented, risk-averse
- Asks specific technical questions
- Needs data, case studies, and proof
- Fears making the wrong decision
- Makes decisions based on thorough analysis
- Red flags: Vague claims, lack of specifics, skipping details
{{/if}}

SCENARIO: {{scenario}}

CONVERSATION SO FAR:
{{#each conversation_history}}
{{role}}: {{content}}
{{/each}}

SALESPERSON (using {{sales_methodology}}): {{user_message}}

TASK: Respond as this {{disc_personality}} prospect would.

RULES:
1. Stay completely in character with the personality type
2. React realistically to their approach and methodology
3. Raise objections this personality type would raise
4. Give subtle buying signals if they handle you well
5. Push back if they violate your personality's preferences
6. Keep responses 2-4 sentences (real prospects don't monologue)
7. If they're doing well, warm up gradually
8. If they're struggling, get more resistant

Remember: Real prospects don't make it easy. Test their skills.
```

### TypeScript Implementation with Streaming

```typescript
// lib/genkit/flows/salesRoleplay.ts
import { defineFlow, streamFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { prompt } from '@genkit-ai/dotprompt'

const roleplayInputSchema = z.object({
  disc_personality: z.enum(['dominant', 'influential', 'steady', 'compliant']),
  scenario: z.string(),
  sales_methodology: z.enum(['SPIN', 'MEDDIC', 'CHALLENGER']),
  user_message: z.string(),
  conversation_history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })),
})

const roleplayMetricsSchema = z.object({
  talk_time_ratio: z.number(),
  questions_asked: z.number(),
  objections_handled: z.number(),
  methodology_adherence: z.number().min(0).max(100),
  overall_score: z.number().min(0).max(100),
})

export const salesRoleplayFlow = defineFlow(
  {
    name: 'salesRoleplay',
    inputSchema: roleplayInputSchema,
    streamSchema: z.string(),
  },
  async (input, { streamCallback }) => {
    const roleplayPrompt = prompt('sales_roleplay')
    
    let fullResponse = ''
    
    const result = await roleplayPrompt.generateStream({
      input,
      config: {
        temperature: 0.8,
        maxOutputTokens: 400,
      },
    })

    for await (const chunk of result.stream) {
      fullResponse += chunk.text
      streamCallback(chunk.text)
    }

    return fullResponse
  }
)

// Separate flow for performance evaluation
export const evaluateRoleplayFlow = defineFlow(
  {
    name: 'evaluateRoleplay',
    inputSchema: z.object({
      conversation_history: roleplayInputSchema.shape.conversation_history,
      sales_methodology: roleplayInputSchema.shape.sales_methodology,
    }),
    outputSchema: roleplayMetricsSchema,
  },
  async (input) => {
    const evaluationPrompt = `Analyze this sales conversation and provide metrics:

CONVERSATION:
${input.conversation_history.map(m => `${m.role}: ${m.content}`).join('\n')}

METHODOLOGY: ${input.sales_methodology}

Evaluate:
1. Talk time ratio (prospect talk time Ã· total) - target 60%+
2. Number of questions asked by salesperson
3. Number of objections raised and handled
4. Methodology adherence (0-100) - did they follow ${input.sales_methodology}?
5. Overall performance score (0-100)

Provide scores as JSON.`

    const result = await gemini25Pro.generate({
      prompt: evaluationPrompt,
      config: {
        temperature: 0.2, // Lower for analytical tasks
        maxOutputTokens: 300,
      },
      output: {
        schema: roleplayMetricsSchema,
      },
    })

    return result.output()
  }
)
```

---

## 3. Document Analysis Flows

### Pitch Deck Analyzer (.prompt file)

**File:** `lib/genkit/prompts/pitch_deck_analyzer.prompt`

```
---
model: gemini-2.5-pro
input:
  schema:
    images: string[]
    founder_context: string?
    deck_type: string
output:
  schema:
    overall_score: number
    slide_by_slide:
      - slide_number: number
        title: string
        strengths: string[]
        issues: string[]
        recommendations: string[]
        score: number
    structural_analysis:
      narrative_flow: number
      visual_design: number
      data_credibility: number
      call_to_action: number
    critical_feedback:
      - category: string
        issue: string
        impact: string
        fix: string
        priority: string
    strategic_recommendations: string[]
---

You are a venture capital analyst reviewing this pitch deck.

{{#if founder_context}}
FOUNDER CONTEXT: {{founder_context}}
{{/if}}

DECK TYPE: {{deck_type}} (seed, series-a, or bootstrap)

ANALYSIS FRAMEWORK:
1. **Problem-Solution Clarity** (Slide 2-3)
   - Is the problem urgent and painful?
   - Is the solution clearly different?
   - Is market sizing realistic?

2. **Business Model Validation** (Slide 6-7)
   - Unit economics clarity
   - Path to profitability
   - Realistic assumptions

3. **Competitive Positioning** (Slide 8)
   - Clear differentiation
   - Defensible moat
   - Not just "we execute better"

4. **Go-to-Market Strategy** (Slide 9-10)
   - Specific, actionable plan
   - Customer acquisition channels validated
   - CAC/LTV math present

5. **Team Credibility** (Slide 11)
   - Domain expertise
   - Execution track record
   - Skills match the challenge

6. **Financial Projections** (Slide 12-13)
   - Conservative revenue model
   - Reasonable growth rates
   - Clear use of funds

7. **Visual Design & Storytelling**
   - One message per slide
   - Data visualization quality
   - Narrative flow

EVALUATION CRITERIA:
- Overall Score: 0-100 (weighted average of all factors)
- Slide-by-Slide: Each slide gets 0-100 with specific feedback
- Structural Analysis: Four dimensions (0-100 each)
- Critical Feedback: 3-5 high-priority issues with fixes
- Strategic Recommendations: 3-5 strategic improvements

Be brutally honest but constructive. Focus on what matters to investors.

Provide:
1. Overall score (0-100)
2. Detailed slide-by-slide analysis
3. Structural scores
4. 3-5 critical issues with specific fixes
5. 3-5 strategic recommendations
```

### TypeScript Implementation (Multimodal)

```typescript
// lib/genkit/flows/documentAnalysis.ts
import { defineFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { prompt } from '@genkit-ai/dotprompt'

const pitchDeckInputSchema = z.object({
  images: z.array(z.string()), // base64 encoded
  founder_context: z.string().optional(),
  deck_type: z.enum(['seed', 'series-a', 'bootstrap']),
})

const slideAnalysisSchema = z.object({
  slide_number: z.number(),
  title: z.string(),
  strengths: z.array(z.string()),
  issues: z.array(z.string()),
  recommendations: z.array(z.string()),
  score: z.number().min(0).max(100),
})

const pitchDeckOutputSchema = z.object({
  overall_score: z.number().min(0).max(100),
  slide_by_slide: z.array(slideAnalysisSchema),
  structural_analysis: z.object({
    narrative_flow: z.number().min(0).max(100),
    visual_design: z.number().min(0).max(100),
    data_credibility: z.number().min(0).max(100),
    call_to_action: z.number().min(0).max(100),
  }),
  critical_feedback: z.array(z.object({
    category: z.string(),
    issue: z.string(),
    impact: z.string(),
    fix: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
  strategic_recommendations: z.array(z.string()),
})

export const analyzePitchDeckFlow = defineFlow(
  {
    name: 'analyzePitchDeck',
    inputSchema: pitchDeckInputSchema,
    outputSchema: pitchDeckOutputSchema,
  },
  async (input) => {
    const deckPrompt = prompt('pitch_deck_analyzer')
    
    const result = await deckPrompt.generate({
      input: {
        ...input,
        images: input.images, // Already base64
      },
      media: input.images.map(img => ({
        contentType: 'image/png',
        data: img,
      })),
      config: {
        temperature: 0.3,
        maxOutputTokens: 3000,
      },
    })

    return result.output() as z.infer<typeof pitchDeckOutputSchema>
  }
)

// Similar flows for financial model and landing page analysis
export const analyzeFinancialModelFlow = defineFlow(/* ... */)
export const analyzeLandingPageFlow = defineFlow(/* ... */)
```

---

## 4. Knowledge Extraction Flows

### Extract Sales Knowledge from Calls (.prompt file)

**File:** `lib/genkit/prompts/knowledge_extractor.prompt`

```
---
model: gemini-2.5-pro
input:
  schema:
    content_type: string
    raw_content: string
    metadata:
      source: string
      date: string
      participants: string[]?
output:
  schema:
    training_lessons:
      - title: string
        description: string
        lesson_type: string
        key_takeaways: string[]
        transcript_excerpt: string?
        timestamp: string?
    objection_handling:
      - objection: string
        response: string
        outcome: string
        effectiveness_score: number
    winning_patterns:
      - pattern_name: string
        description: string
        when_to_use: string
        example: string
    competitor_intelligence:
      - competitor: string
        mention_context: string
        our_differentiation: string
---

You are extracting valuable sales knowledge from {{content_type}}.

SOURCE: {{metadata.source}}
DATE: {{metadata.date}}
{{#if metadata.participants}}
PARTICIPANTS: {{metadata.participants}}
{{/if}}

CONTENT TO ANALYZE:
{{raw_content}}

EXTRACTION TASKS:

1. **Training Lessons** - Identify 3-5 micro-lessons suitable for sales training
   - Each lesson should be 2-3 minutes of content
   - Focus on replicable techniques
   - Include specific examples from the content
   - Rate relevance (1-10)

2. **Objection Handling** - Extract objections raised and how they were handled
   - What was the objection?
   - How was it addressed?
   - What was the outcome?
   - Effectiveness score (0-100)

3. **Winning Patterns** - Identify successful techniques
   - What worked well?
   - Why did it work?
   - When should this be used?
   - Concrete example

4. **Competitor Intelligence** - Note competitor mentions
   - Which competitor was mentioned?
   - In what context?
   - How were we differentiated?

QUALITY CRITERIA:
- Be specific, not generic
- Include actual quotes/examples
- Focus on actionable insights
- Organize for easy retrieval
- Tag with relevant metadata

Format output as structured JSON for storage in RAG system.
```

### TypeScript Implementation

```typescript
// lib/genkit/flows/knowledgeExtraction.ts
import { defineFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { prompt } from '@genkit-ai/dotprompt'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

const extractionInputSchema = z.object({
  content_type: z.enum(['call_transcript', 'email_thread', 'pitch_deck', 'proposal', 'meeting_notes']),
  raw_content: z.string(),
  metadata: z.object({
    source: z.string(),
    date: z.string(),
    participants: z.array(z.string()).optional(),
  }),
})

const trainingLessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  lesson_type: z.enum(['technique', 'objection', 'discovery', 'closing']),
  key_takeaways: z.array(z.string()),
  transcript_excerpt: z.string().optional(),
  timestamp: z.string().optional(),
})

const objectionHandlingSchema = z.object({
  objection: z.string(),
  response: z.string(),
  outcome: z.string(),
  effectiveness_score: z.number().min(0).max(100),
})

const winningPatternSchema = z.object({
  pattern_name: z.string(),
  description: z.string(),
  when_to_use: z.string(),
  example: z.string(),
})

const competitorIntelSchema = z.object({
  competitor: z.string(),
  mention_context: z.string(),
  our_differentiation: z.string(),
})

const extractionOutputSchema = z.object({
  training_lessons: z.array(trainingLessonSchema),
  objection_handling: z.array(objectionHandlingSchema),
  winning_patterns: z.array(winningPatternSchema),
  competitor_intelligence: z.array(competitorIntelSchema),
})

export const extractKnowledgeFlow = defineFlow(
  {
    name: 'extractKnowledge',
    inputSchema: extractionInputSchema,
    outputSchema: extractionOutputSchema,
  },
  async (input) => {
    const extractPrompt = prompt('knowledge_extractor')
    
    const result = await extractPrompt.generate({
      input,
      config: {
        temperature: 0.3,
        maxOutputTokens: 2000,
      },
    })

    const extracted = result.output() as z.infer<typeof extractionOutputSchema>
    
    // Store in Firestore knowledge base
    await addDoc(collection(db, 'knowledgeStore'), {
      content_type: input.content_type,
      source: input.metadata.source,
      extracted_at: new Date(),
      training_lessons_count: extracted.training_lessons.length,
      objections_count: extracted.objection_handling.length,
      patterns_count: extracted.winning_patterns.length,
      competitors_mentioned: extracted.competitor_intelligence.map(c => c.competitor),
      ...extracted,
    })

    return extracted
  }
)
```

---

## 5. Evaluation Flows

### Strategic Thinking Evaluator (.prompt file)

**File:** `lib/genkit/prompts/evaluation.prompt`

```
---
model: gemini-2.5-pro
input:
  schema:
    exercise_prompt: string
    user_response: string
    framework_name: string
    evaluation_rubric:
      specificity_weight: number
      evidence_weight: number
      depth_weight: number
      creativity_weight: number
output:
  schema:
    overall_score: number
    dimension_scores:
      specificity: number
      evidence_based: number
      strategic_depth: number
      creativity: number
    strengths: string[]
    weaknesses: string[]
    improvement_suggestions: string[]
    exemplar_response: string
---

You are evaluating strategic thinking quality for a solo founder learning {{framework_name}}.

EXERCISE PROMPT:
{{exercise_prompt}}

USER'S RESPONSE:
{{user_response}}

EVALUATION RUBRIC:
- Specificity ({{evaluation_rubric.specificity_weight}}%): Concrete details vs. vague generalizations
- Evidence-Based ({{evaluation_rubric.evidence_weight}}%): Data/research vs. assumptions
- Strategic Depth ({{evaluation_rubric.depth_weight}}%): Multi-level thinking vs. surface-level
- Creativity ({{evaluation_rubric.creativity_weight}}%): Novel insights vs. obvious answers

SCORING GUIDELINES:

**Specificity (0-100)**:
- 90-100: Precise numbers, names, dates, specific customer quotes
- 70-89: Clear details with some vagueness
- 50-69: Mix of specific and generic
- 30-49: Mostly generic statements
- 0-29: Entirely vague and abstract

**Evidence-Based (0-100)**:
- 90-100: Multiple data sources, customer research, competitive analysis
- 70-89: Some research cited, logical reasoning
- 50-69: Assumptions stated as facts, minimal research
- 30-49: Pure speculation, no validation
- 0-29: Contradicts known facts

**Strategic Depth (0-100)**:
- 90-100: Multi-stakeholder analysis, trade-offs explicit, second-order effects
- 70-89: Considers multiple factors, acknowledges complexity
- 50-69: Single-dimensional thinking with some context
- 30-49: Simplistic view, missing key considerations
- 0-29: Fundamentally misunderstands the strategic context

**Creativity (0-100)**:
- 90-100: Unique insights, connects disparate concepts, challenges assumptions
- 70-89: Fresh perspective on common problem
- 50-69: Competent but conventional thinking
- 30-49: Rehashes obvious points
- 0-29: ClichÃ©s and platitudes

TASK:
1. Score each dimension (0-100)
2. Calculate weighted overall score
3. List 2-3 specific strengths
4. List 2-3 specific weaknesses with examples from their response
5. Provide 2-3 actionable improvement suggestions
6. Generate an exemplar response showing what a 90+ response would look like

Be constructively critical. Push them to think deeper.
```

### TypeScript Implementation

```typescript
// lib/genkit/flows/evaluation.ts
import { defineFlow } from '@genkit-ai/core'
import { z } from 'zod'
import { prompt } from '@genkit-ai/dotprompt'

const evaluationInputSchema = z.object({
  exercise_prompt: z.string(),
  user_response: z.string(),
  framework_name: z.string(),
  evaluation_rubric: z.object({
    specificity_weight: z.number(),
    evidence_weight: z.number(),
    depth_weight: z.number(),
    creativity_weight: z.number(),
  }),
})

const evaluationOutputSchema = z.object({
  overall_score: z.number().min(0).max(100),
  dimension_scores: z.object({
    specificity: z.number().min(0).max(100),
    evidence_based: z.number().min(0).max(100),
    strategic_depth: z.number().min(0).max(100),
    creativity: z.number().min(0).max(100),
  }),
  strengths: z.array(z.string()).min(2).max(3),
  weaknesses: z.array(z.string()).min(2).max(3),
  improvement_suggestions: z.array(z.string()).min(2).max(3),
  exemplar_response: z.string(),
})

export const evaluateStrategicThinkingFlow = defineFlow(
  {
    name: 'evaluateStrategicThinking',
    inputSchema: evaluationInputSchema,
    outputSchema: evaluationOutputSchema,
  },
  async (input) => {
    const evalPrompt = prompt('evaluation')
    
    const result = await evalPrompt.generate({
      input,
      config: {
        temperature: 0.2, // Low temperature for consistent grading
        maxOutputTokens: 1500,
      },
    })

    return result.output() as z.infer<typeof evaluationOutputSchema>
  }
)
```

---

## 6. Daily Coaching Flows

### Personalized Daily Tip (.prompt file)

**File:** `lib/genkit/prompts/daily_coaching.prompt`

```
---
model: gemini-2.5-flash
input:
  schema:
    user_id: string
    recent_activity:
      courses_in_progress: string[]
      last_milestone: string?
      current_challenges: string[]
    business_stage: string
    preferences:
      focus_areas: string[]
      coaching_style: string
output:
  schema:
    tip_title: string
    tip_content: string
    action_item: string
    related_course: string?
    motivation: string
---

Generate a personalized daily coaching tip for this founder.

USER CONTEXT:
- Business Stage: {{business_stage}}
- Courses in Progress: {{recent_activity.courses_in_progress}}
{{#if recent_activity.last_milestone}}
- Recent Milestone: {{recent_activity.last_milestone}}
{{/if}}
- Current Challenges: {{recent_activity.current_challenges}}
- Focus Areas: {{preferences.focus_areas}}
- Coaching Style: {{preferences.coaching_style}}

GUIDELINES:
1. Make it actionable (something they can do today)
2. Connect to their current learning or challenges
3. Keep it brief (2-3 paragraphs)
4. End with motivation
5. Link to relevant course if applicable

COACHING STYLES:
- "direct": No-nonsense, tactical advice
- "encouraging": Supportive, motivational
- "analytical": Data-driven, logical
- "creative": Innovative, unconventional

Generate:
- Tip title (engaging, 5-7 words)
- Tip content (2-3 paragraphs, 150-200 words)
- One specific action item
- Related course (if applicable)
- Motivational closing (1 sentence)
```

---

## Token Optimization Strategies

### 1. Conversation Summarization

```typescript
// lib/genkit/optimization.ts
export async function summarizeConversation(
  messages: Array<{ role: string; content: string }>
): Promise<Array<{ role: string; content: string }>> {
  if (messages.length < 10) return messages

  const recentMessages = messages.slice(-3)
  const olderMessages = messages.slice(0, -3)

  const summaryPrompt = `Summarize this conversation in 3-4 sentences, focusing on key decisions and context:
  
${olderMessages.map(m => `${m.role}: ${m.content}`).join('\n')}`

  const summary = await gemini25Pro.generate({
    prompt: summaryPrompt,
    config: {
      temperature: 0,
      maxOutputTokens: 200,
    },
  })

  return [
    { role: 'system', content: `Previous conversation: ${summary.text}` },
    ...recentMessages,
  ]
}
```

### 2. Response Caching

```typescript
// Cache common framework explanations
const FRAMEWORK_CACHE = new Map<string, { content: string; timestamp: number }>()
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

export async function getCachedFrameworkExplanation(
  frameworkName: string
): Promise<string> {
  const cached = FRAMEWORK_CACHE.get(frameworkName)
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.content
  }

  const explanation = await gemini25Pro.generate({
    prompt: `Explain the ${frameworkName} framework in 200 words`,
    config: {
      temperature: 0, // Deterministic for caching
      maxOutputTokens: 300,
    },
  })

  FRAMEWORK_CACHE.set(frameworkName, {
    content: explanation.text,
    timestamp: Date.now(),
  })

  return explanation.text
}
```

### 3. Batch Processing

```typescript
// Process multiple evaluations in parallel
export async function batchEvaluateExercises(
  exercises: Array<{ prompt: string; response: string }>
) {
  const evaluations = await Promise.all(
    exercises.map(ex => 
      evaluateStrategicThinkingFlow({
        exercise_prompt: ex.prompt,
        user_response: ex.response,
        framework_name: 'Business Model Canvas',
        evaluation_rubric: {
          specificity_weight: 25,
          evidence_weight: 25,
          depth_weight: 30,
          creativity_weight: 20,
        },
      })
    )
  )

  return evaluations
}
```

---

## Error Handling Patterns

```typescript
// Comprehensive error handling for AI flows
export async function safeRunFlow<T>(
  flow: () => Promise<T>,
  fallback: T
): Promise<{ success: boolean; data: T; error?: string }> {
  try {
    const data = await flow()
    return { success: true, data }
  } catch (error) {
    console.error('AI flow error:', error)
    
    // Categorize errors
    if (error.message.includes('quota')) {
      return {
        success: false,
        data: fallback,
        error: 'AI service temporarily at capacity. Please try again in a moment.',
      }
    }
    
    if (error.message.includes('timeout')) {
      return {
        success: false,
        data: fallback,
        error: 'Request took too long. Please try a shorter input.',
      }
    }
    
    return {
      success: false,
      data: fallback,
      error: 'An unexpected error occurred. Our team has been notified.',
    }
  }
}
```

---

This AI Flows Library provides production-ready implementations for all core AI features with proper error handling, token optimization, and structured outputs.