# Content Generation - Manuscript to Course Pipeline

**File:** 09-CONTENT-GENERATION.md  
**Purpose:** Automated workflow for transforming manuscripts into structured courses  
**Dependencies:** 07-PEDAGOGICAL-PATTERNS.md, 05-AI-FLOWS-LIBRARY.md  
**Estimated Size:** 18KB

---

## Overview

This document outlines the systematic process for converting Mike's three manuscripts into production-ready course content. The pipeline combines AI-assisted extraction with human curation to maintain quality while achieving scale.

### Source Materials

**Primary Sources:**
1. **Solo Founder's AI Playbook** - 12 Frameworks for Market Leadership (360KB)
2. **The Solo Founder's AI Dominance** - 8 GTM Systems for Compounding Growth (209KB)
3. **The Solo Founder's AI Revolution** - Build Your Startup in 60 Days (362KB)

**Total Source Material:** ~931KB of strategic frameworks, case studies, and methodologies

**Target Output:** 20 courses Ã— 12-16 lessons = 240-320 comprehensive lessons

---

## Phase 1: Framework Extraction

### Step 1: AI-Assisted Framework Detection

Use Claude to systematically analyze each manuscript chapter and identify core frameworks.

**Extraction Prompt Template:**

```
Analyze this manuscript chapter and extract all strategic frameworks, methodologies, and systems.

CHAPTER TEXT:
[Insert chapter text]

OUTPUT STRUCTURE:
{
  "frameworks": [
    {
      "name": "Framework name",
      "category": "strategy|execution|marketing|sales|operations",
      "definition": "Clear, concise definition",
      "components": [
        "Component 1",
        "Component 2",
        "Component 3"
      ],
      "application_context": "When and how to use this framework",
      "prerequisites": ["What founders need before using this"],
      "expected_outcomes": ["What founders achieve by applying this"],
      "related_frameworks": ["Names of complementary frameworks"],
      "complexity_level": "beginner|intermediate|advanced"
    }
  ],
  "methodologies": [
    {
      "name": "Methodology name",
      "steps": [
        {
          "step_number": 1,
          "title": "Step title",
          "description": "What to do",
          "rationale": "Why this step matters",
          "inputs": ["What you need"],
          "outputs": ["What you produce"],
          "decision_points": ["Key choices to make"]
        }
      ]
    }
  ],
  "case_studies": [
    {
      "company": "Company name",
      "stage": "idea|pre-launch|0-10k|10k-100k|scaling",
      "industry": "Industry",
      "challenge": "Problem they faced",
      "solution": "How they applied framework",
      "results": {
        "metrics": [
          {"metric": "Revenue", "before": 0, "after": 10000, "timeframe": "6 months"}
        ]
      },
      "lessons_learned": ["Key takeaways"]
    }
  ],
  "key_insights": [
    "Novel perspective 1",
    "Counter-intuitive insight 2",
    "Common mistake to avoid 3"
  ]
}

Be thorough and precise. Extract every distinct framework and methodology.
```

**Implementation Script:**

```typescript
// scripts/extractFrameworks.ts
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function extractFrameworksFromChapter(chapterText: string): Promise<ExtractedFrameworks> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: EXTRACTION_PROMPT.replace('[Insert chapter text]', chapterText),
      },
    ],
  })

  const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
  
  // Parse JSON response
  const extracted = JSON.parse(responseText)
  
  return extracted
}

async function processManuscript(manuscriptPath: string) {
  const content = fs.readFileSync(manuscriptPath, 'utf-8')
  
  // Split by chapters (assuming markdown headers)
  const chapters = content.split(/^#{1,2}\s/gm)
  
  const allFrameworks: Framework[] = []
  const allCaseStudies: CaseStudy[] = []
  
  for (let i = 0; i < chapters.length; i++) {
    console.log(`Processing chapter ${i + 1}/${chapters.length}`)
    
    const extracted = await extractFrameworksFromChapter(chapters[i])
    
    allFrameworks.push(...extracted.frameworks)
    allCaseStudies.push(...extracted.case_studies)
    
    // Rate limiting
    await sleep(1000)
  }
  
  // Save extracted data
  fs.writeFileSync(
    'content/extracted/frameworks.json',
    JSON.stringify(allFrameworks, null, 2)
  )
  
  fs.writeFileSync(
    'content/extracted/case_studies.json',
    JSON.stringify(allCaseStudies, null, 2)
  )
  
  console.log(`Extracted ${allFrameworks.length} frameworks and ${allCaseStudies.length} case studies`)
}

// Run extraction on all three manuscripts
processManuscript('manuscripts/playbook.md')
processManuscript('manuscripts/dominance.md')
processManuscript('manuscripts/revolution.md')
```

---

### Step 2: Framework Structuring & Validation

After extraction, validate and structure frameworks for course development.

**Validation Schema:**

```typescript
import { z } from 'zod'

const FrameworkSchema = z.object({
  id: z.string(),
  name: z.string().min(5).max(100),
  category: z.enum(['strategy', 'execution', 'marketing', 'sales', 'operations']),
  definition: z.string().min(100).max(500),
  components: z.array(z.string()).min(2).max(10),
  application_context: z.string().min(100),
  prerequisites: z.array(z.string()),
  expected_outcomes: z.array(z.string()).min(1),
  related_frameworks: z.array(z.string()),
  complexity_level: z.enum(['beginner', 'intermediate', 'advanced']),
  
  // Course mapping
  target_course: z.string().optional(),
  competencies: z.array(z.string()), // SC1-SC12
  
  // Quality scores (AI-generated)
  relevance_score: z.number().min(0).max(100),
  clarity_score: z.number().min(0).max(100),
  actionability_score: z.number().min(0).max(100),
})

type Framework = z.infer<typeof FrameworkSchema>
```

**Quality Validation:**

```typescript
async function validateFramework(framework: Framework): Promise<ValidationResult> {
  // Check completeness
  const completeness = calculateCompleteness(framework)
  
  // AI-assisted quality check
  const qualityPrompt = `
Rate this framework on three dimensions (0-100):
1. Relevance: Is this useful for bootstrapped founders?
2. Clarity: Is the definition clear and well-explained?
3. Actionability: Can founders immediately apply this?

Framework:
${JSON.stringify(framework, null, 2)}

Respond with JSON: {"relevance": X, "clarity": Y, "actionability": Z, "issues": ["issue1", "issue2"]}
`

  const quality = await getAIQualityScores(qualityPrompt)
  
  return {
    is_valid: completeness > 80 && quality.relevance > 70 && quality.clarity > 70,
    completeness,
    quality,
    issues: quality.issues,
  }
}
```

---

### Step 3: Competency Mapping

Map each framework to the 12 Core Startup Competencies (SC1-SC12).

**Competency Definitions:**

```typescript
const COMPETENCIES = {
  SC1: {
    name: 'Market Validation & Problem-Solution Fit',
    description: 'Systematic customer discovery and validation',
    keywords: ['validation', 'customer discovery', 'problem interview', 'MVP'],
  },
  SC2: {
    name: 'Solo Founder GTM Strategy & Execution',
    description: 'Go-to-market planning and channel strategy',
    keywords: ['GTM', 'launch', 'channels', 'positioning'],
  },
  SC3: {
    name: 'Bootstrap Financial Management & Unit Economics',
    description: 'Sustainable financial modeling and metrics',
    keywords: ['unit economics', 'LTV', 'CAC', 'burn rate', 'profitability'],
  },
  SC4: {
    name: 'AI-Augmented Product Development',
    description: 'Lean product development with AI assistance',
    keywords: ['product', 'development', 'AI tools', 'prototyping'],
  },
  SC5: {
    name: 'Lean Operations & Process Automation',
    description: 'Operational efficiency and automation',
    keywords: ['operations', 'automation', 'efficiency', 'processes'],
  },
  SC6: {
    name: 'Customer Acquisition Without Paid Ads',
    description: 'Organic and community-driven growth',
    keywords: ['acquisition', 'content', 'SEO', 'community', 'organic'],
  },
  SC7: {
    name: 'Retention & Expansion Revenue Models',
    description: 'Customer success and revenue expansion',
    keywords: ['retention', 'churn', 'expansion', 'upsell', 'NRR'],
  },
  SC8: {
    name: 'Solo Founder Mental Resilience & Time Management',
    description: 'Sustainable founder psychology and productivity',
    keywords: ['burnout', 'time management', 'mental health', 'focus'],
  },
  SC9: {
    name: 'Building in Public & Community-Led Growth',
    description: 'Transparent building and community engagement',
    keywords: ['community', 'transparency', 'building in public'],
  },
  SC10: {
    name: 'Strategic Partnership Development',
    description: 'Value-aligned partnerships and collaborations',
    keywords: ['partnerships', 'collaboration', 'alliances'],
  },
  SC11: {
    name: 'Data-Driven Decision Making',
    description: 'Analytics and metrics-informed strategy',
    keywords: ['analytics', 'metrics', 'data', 'KPIs'],
  },
  SC12: {
    name: 'Exit Strategy & Lifestyle Business Design',
    description: 'Long-term optionality and business design',
    keywords: ['exit', 'acquisition', 'lifestyle business', 'succession'],
  },
}

function mapFrameworkToCompetencies(framework: Framework): string[] {
  const matched: string[] = []
  
  // Keyword-based matching
  const frameworkText = [
    framework.name,
    framework.definition,
    framework.application_context,
    ...framework.components,
  ].join(' ').toLowerCase()
  
  for (const [competencyId, competency] of Object.entries(COMPETENCIES)) {
    const score = competency.keywords.filter(keyword =>
      frameworkText.includes(keyword.toLowerCase())
    ).length
    
    if (score >= 2) {
      matched.push(competencyId)
    }
  }
  
  // AI-assisted validation for ambiguous cases
  if (matched.length === 0) {
    return await getAICompetencyMapping(framework)
  }
  
  return matched
}
```

---

## Phase 2: Lesson Generation

### Step 1: Generate Lesson Outlines

For each framework, create a complete lesson outline following pedagogical patterns.

**Lesson Generation Prompt:**

```
@07-PEDAGOGICAL-PATTERNS.md Reference lesson template structure

Generate a complete lesson plan for teaching this framework to bootstrapped founders.

FRAMEWORK:
Name: ${framework.name}
Definition: ${framework.definition}
Components: ${framework.components.join(', ')}
Application Context: ${framework.application_context}

TARGET AUDIENCE:
- Stage: ${targetStage}
- Prior knowledge: ${prerequisites}
- Learning goals: ${learningGoals}

GENERATE:

1. LEARNING OBJECTIVES (3-5 specific, measurable objectives)
Format: "By the end of this lesson, you will be able to..."

2. INTRODUCTION (5 minutes)
- Hook: Compelling problem or question
- Context: Why this matters now
- Roadmap: What we'll cover

3. CONCEPT EXPLANATION (15-20 minutes)
- Core concept definition (200-300 words)
- Theoretical foundation (300-400 words)
- Strategic context: when to use, when not to (200-300 words)
- Visual framework description (for designer to create diagram)

4. METHODOLOGY (20-25 minutes)
- Step-by-step process (5-8 steps)
- For each step:
  * Action to take
  * Why it matters
  * Inputs needed
  * Expected outputs
  * Quality criteria
  * Common decision points

5. CASE STUDY (15-20 minutes)
- Company profile
- Challenge faced
- Framework application
- Results achieved
- Key takeaways

6. PRACTICE EXERCISE (20-30 minutes)
- Clear task description
- Starter questions (5-8)
- Evaluation rubric
- AI coaching integration points

7. SUMMARY & NEXT STEPS (5 minutes)
- Key takeaways (3-5 bullets)
- Connection to next lesson
- Additional resources
- Reflection questions

Total estimated time: 90-120 minutes

Generate complete, detailed content for all sections. Write in clear, encouraging tone. Include specific examples relevant to bootstrapped founders.
```

**Implementation:**

```typescript
async function generateLesson(framework: Framework): Promise<Lesson> {
  const prompt = LESSON_GENERATION_PROMPT
    .replace('${framework.name}', framework.name)
    .replace('${framework.definition}', framework.definition)
    // ... other replacements

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  })

  const lessonContent = extractContent(message)
  
  // Parse structured content
  const lesson = parseLessonContent(lessonContent)
  
  // Validate against quality standards
  const validation = await validateLesson(lesson)
  
  if (!validation.is_valid) {
    console.warn(`Lesson validation failed: ${validation.issues.join(', ')}`)
    // Regenerate or flag for manual review
  }
  
  return lesson
}
```

---

### Step 2: Generate Supporting Content

Create additional materials to enhance the lesson.

**A. Visual Framework Diagrams**

```typescript
// Generate Mermaid diagram code from framework structure
function generateFrameworkDiagram(framework: Framework): string {
  const nodes = framework.components.map((comp, idx) => `    ${comp}[${comp}]`)
  
  const mermaidCode = `
graph TD
    Start[Framework: ${framework.name}]
    ${nodes.join('\n')}
    
    Start --> ${framework.components[0]}
    ${generateConnections(framework.components)}
    
    style Start fill:#3b82f6,color:#fff
`

  return mermaidCode
}
```

**B. Exercise Rubrics**

```typescript
function generateExerciseRubric(framework: Framework): EvaluationRubric {
  return {
    dimensions: [
      {
        name: 'Specificity',
        description: 'Concrete details vs. vague generalizations',
        levels: {
          90: 'Named entities, quantified claims, specific examples',
          70: 'Mostly specific with some generalizations',
          50: 'Mix of specific and vague',
          30: 'Mostly vague generalizations',
        },
      },
      {
        name: 'Evidence-Based Reasoning',
        description: 'Claims backed by data or logic',
        levels: {
          90: 'Every claim supported by data, research, or customer feedback',
          70: 'Most claims with logical inference',
          50: 'Some evidence with many assumptions',
          30: 'Mostly unsupported assertions',
        },
      },
      {
        name: 'Strategic Depth',
        description: 'Multi-level analysis and second-order thinking',
        levels: {
          90: 'Considers 2nd/3rd order effects, trade-offs, and long-term implications',
          70: 'Good analysis with some deeper insights',
          50: 'Surface-level thinking with limited depth',
          30: 'Shallow, tactical-only thinking',
        },
      },
      {
        name: 'Framework Application',
        description: 'Proper use of framework components',
        levels: {
          90: 'All components used correctly with clear connections',
          70: 'Most components used appropriately',
          50: 'Partial framework application',
          30: 'Framework not properly applied',
        },
      },
    ],
  }
}
```

**C. AI Coaching Prompts**

```typescript
// Generate coaching prompts for each lesson section
function generateCoachingPrompts(lesson: Lesson): CoachingPrompts {
  return {
    introduction_guidance: `
You're helping a founder understand ${lesson.title}.
Start by asking: "${lesson.starter_question}"
Guide them to articulate their current understanding before teaching the framework.
    `,
    
    framework_application: `
The founder is applying the ${lesson.framework_name} to their business.
Ask probing questions:
- What specific challenge are you solving?
- How does each component apply to your situation?
- What trade-offs are you considering?
Push for specificity and evidence-based reasoning.
    `,
    
    exercise_coaching: `
The founder is working on: ${lesson.exercise.prompt}
Provide progressive guidance:
1. If stuck: Give hints, don't solve for them
2. If superficial: Challenge with "why" and "how"
3. If on track: Encourage depth and consideration of edge cases
Evaluate using the rubric and provide specific, actionable feedback.
    `,
  }
}
```

---

### Step 3: Case Study Curation

Select and refine case studies from manuscripts or create new ones.

**Selection Criteria:**

```typescript
interface CaseStudyQuality {
  relevance: number         // 0-100: Matches target audience
  replicability: number     // 0-100: Founders can copy this
  outcome_measurability: number // 0-100: Clear metrics
  stage_appropriateness: number // 0-100: Right stage
  authenticity: number      // 0-100: Real vs. aspirational
  
  bias_check: {
    survivorship_bias: boolean
    selection_bias: boolean
    recency_bias: boolean
  }
}

function evaluateCaseStudy(caseStudy: CaseStudy): CaseStudyQuality {
  return {
    relevance: scoreRelevance(caseStudy),
    replicability: scoreReplicability(caseStudy),
    outcome_measurability: hasQuantifiedMetrics(caseStudy) ? 90 : 30,
    stage_appropriateness: matchesTargetStage(caseStudy) ? 90 : 20,
    authenticity: checkAuthenticity(caseStudy),
    
    bias_check: {
      survivorship_bias: isOnlySuccessStory(caseStudy),
      selection_bias: isFromLimitedSample(caseStudy),
      recency_bias: isOnlyRecent(caseStudy),
    },
  }
}
```

**Case Study Enhancement:**

```typescript
async function enhanceCaseStudy(caseStudy: RawCaseStudy): Promise<CompleteCaseStudy> {
  // Fill in missing details with AI assistance
  const enhancementPrompt = `
Enhance this case study with realistic details:

CASE STUDY:
${JSON.stringify(caseStudy, null, 2)}

ADD:
1. Specific execution tactics (how they actually did it)
2. Timeline details (how long each phase took)
3. Challenges encountered (what went wrong)
4. Resource constraints (budget, time, team size)
5. Unexpected outcomes (what surprised them)

Keep it realistic and replicable for bootstrapped founders.
`

  const enhanced = await getAIEnhancement(enhancementPrompt)
  
  return {
    ...caseStudy,
    ...enhanced,
    reviewed: false, // Flag for human review
  }
}
```

---

## Phase 3: Assessment Creation

### Multiple Choice Questions

```typescript
async function generateAssessmentQuestions(lesson: Lesson): Promise<Question[]> {
  const prompt = `
Generate 5 assessment questions for this lesson:

LESSON: ${lesson.title}
OBJECTIVES: ${lesson.objectives.join(', ')}
KEY CONCEPTS: ${lesson.key_concepts.join(', ')}

REQUIREMENTS:
- 2 questions testing conceptual understanding (beginner)
- 2 questions testing application (intermediate)
- 1 question testing strategic thinking (advanced)

For each question:
1. Question text (clear, unambiguous)
2. 4 options (1 correct, 3 plausible wrong answers)
3. Explanation for correct answer (why it's right)
4. Explanations for wrong answers (why they're wrong)
5. Difficulty level
6. Competency tested (SC1-SC12)

Format as JSON array.
`

  const questions = await generateQuestions(prompt)
  
  // Validate question quality
  return questions.filter(q => validateQuestion(q))
}
```

---

## Phase 4: Bulk Deployment

### Content Pipeline

```typescript
// scripts/deployContent.ts

async function deployCoursesToFirestore() {
  console.log('Starting content deployment...')
  
  // Load all generated content
  const frameworks = loadFrameworks()
  const lessons = loadLessons()
  const assessments = loadAssessments()
  
  // Group into courses
  const courses = groupIntoCourses(lessons)
  
  // Deploy to Firestore
  for (const course of courses) {
    console.log(`Deploying course: ${course.title}`)
    
    // Create course document
    await setDoc(doc(db, 'courses', course.id), {
      title: course.title,
      description: course.description,
      module: course.module,
      track: course.track,
      competencies: course.competencies,
      published: false, // Manual review before publishing
      lesson_count: course.lessons.length,
      estimated_hours: calculateEstimatedHours(course),
      created_at: new Date(),
      updated_at: new Date(),
    })
    
    // Create lesson documents
    for (const lesson of course.lessons) {
      await setDoc(
        doc(db, 'courses', course.id, 'lessons', lesson.id),
        lesson
      )
    }
    
    // Create assessment documents
    for (const assessment of course.assessments) {
      await setDoc(
        doc(db, 'courses', course.id, 'assessments', assessment.id),
        assessment
      )
    }
  }
  
  console.log('Deployment complete!')
}
```

---

## Phase 5: Content Quality Assurance

### Automated Quality Checks

```typescript
interface ContentQualityReport {
  lesson_id: string
  scores: {
    completeness: number      // All sections present
    readability: number       // Flesch-Kincaid grade level
    depth: number             // Theoretical richness
    actionability: number     // Practical applicability
    example_quality: number   // Example relevance and clarity
  }
  issues: string[]
  recommendations: string[]
}

async function auditContent(lesson: Lesson): Promise<ContentQualityReport> {
  // Automated checks
  const completeness = checkCompleteness(lesson)
  const readability = calculateReadability(lesson.content)
  
  // AI-assisted quality evaluation
  const aiEvaluation = await evaluateContentQuality(lesson)
  
  return {
    lesson_id: lesson.id,
    scores: {
      completeness,
      readability,
      depth: aiEvaluation.depth,
      actionability: aiEvaluation.actionability,
      example_quality: aiEvaluation.example_quality,
    },
    issues: identifyIssues(lesson, aiEvaluation),
    recommendations: generateRecommendations(aiEvaluation),
  }
}
```

### Human Review Checklist

```markdown
# Content Review Checklist

## Pedagogical Soundness
- [ ] Learning objectives are specific and measurable
- [ ] Explanation flows logically from simple to complex
- [ ] Examples are relevant and diverse
- [ ] Exercises test understanding, not just recall

## Technical Accuracy
- [ ] All frameworks correctly explained
- [ ] Case study metrics are realistic
- [ ] No outdated tactics or tools referenced
- [ ] Links and resources are current

## Accessibility
- [ ] Reading level appropriate (Flesch-Kincaid 8-10th grade)
- [ ] Visual elements have alt text descriptions
- [ ] No ableist language or assumptions
- [ ] Color not used as sole indicator

## Brand Consistency
- [ ] Tone matches brand voice (encouraging but rigorous)
- [ ] Terminology consistent across lessons
- [ ] Visual frameworks follow design system
- [ ] No contradictions with other course content

## Legal Compliance
- [ ] No copyrighted material reproduced
- [ ] Case studies have proper attribution
- [ ] External resources properly cited
- [ ] No trademark violations
```

---

## Content Update Workflow

### Versioning Strategy

```typescript
interface CourseVersion {
  version: string           // semver: major.minor.patch
  changes: string[]         // Changelog
  updated_at: Date
  updated_by: string
  content_hash: string      // For change detection
  previous_version: string | null
}

async function updateCourse(courseId: string, updates: Partial<Course>) {
  const currentVersion = await getCurrentVersion(courseId)
  
  // Determine version bump
  const newVersion = determineVersionBump(currentVersion, updates)
  
  // Create new version
  await setDoc(doc(db, 'courses', courseId, 'versions', newVersion.version), {
    ...currentVersion,
    ...updates,
    version: newVersion.version,
    changes: newVersion.changes,
    updated_at: new Date(),
  })
  
  // Update main course document
  await updateDoc(doc(db, 'courses', courseId), {
    ...updates,
    version: newVersion.version,
    updated_at: new Date(),
  })
  
  // Notify enrolled users if major/minor change
  if (isMajorOrMinorUpdate(newVersion)) {
    await notifyEnrolledUsers(courseId, newVersion)
  }
}
```

---

## Performance Metrics

### Track content generation efficiency:

```typescript
interface ContentMetrics {
  frameworks_extracted: number
  lessons_generated: number
  case_studies_created: number
  
  generation_time: {
    avg_per_framework: number     // minutes
    avg_per_lesson: number         // minutes
    avg_per_case_study: number     // minutes
  }
  
  quality_scores: {
    avg_ai_quality_score: number   // 0-100
    human_approval_rate: number    // 0-100
    revision_cycles: number
  }
  
  cost_efficiency: {
    ai_token_cost_per_lesson: number  // USD
    human_hours_per_lesson: number
    total_cost_per_lesson: number     // USD
  }
}
```

---

This comprehensive content generation pipeline enables systematic transformation of manuscript knowledge into production-ready educational content while maintaining quality, consistency, and pedagogical soundness throughout the process.