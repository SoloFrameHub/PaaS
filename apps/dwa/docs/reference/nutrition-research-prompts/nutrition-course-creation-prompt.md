<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# now revisit the original promts and ensure, or modify, that they are appropriate for these 4 resultant research docs

Perfect! Let me revise the **Development Prompts for Claude Code** to align with the 4 research documents you'll generate from Perplexity.

***

## **REVISED: Development Prompts for Claude Code (Section V)**

### **Prerequisites**

Before generating any content, you must have completed research documents for each course:

- `research-doc-course-1-gut-brain-foundations.md`
- `research-doc-course-2-dietary-patterns.md`
- `research-doc-course-3-precision-nutrition.md`
- `research-doc-course-4-food-mood-mastery.md`

***

### **Prompt 1: Generate Lesson Markdown Files**

```
Generate a complete lesson markdown file for:

Course: [course-id]
Lesson Number: [1-12]
Title: [from specifications]

RESEARCH SOURCE: Use research-doc-course-[X]-[course-name].md as your evidence base.

Requirements:
1. Follow YAML frontmatter schema exactly (see Section III)
2. Include all required lesson components:
   - Introduction (150-200 words)
   - Main content sections (3-4 major sections)
   - 2 embedded Research Briefs (using template below)
   - Practical Application section
   - Reflection Questions (2-3)
   - Quiz callout
   - AI coach integration suggestion
   - Next lesson teaser

3. RESEARCH BRIEFS: Include exactly 2 research briefs within the lesson content using this format:

---
## Research Brief: [Topic from Research Doc]

**Study**: [Institution/Journal, Year] • Sample: [N=X] • Design: [Type]

**Finding**: [Key result with statistics from research doc]

**Context**: [How this fits existing evidence, limitations]

**Practical Application**: [Evidence-based takeaway]

**Evidence Quality**: ⭐⭐⭐⭐ [Rating from research doc]

*Source: Research Document, [Topic Section]*
---

4. CITATIONS: 
   - Pull all statistics, sample sizes, and findings directly from the research document
   - Use plain language for 8th-9th grade reading level
   - Acknowledge study limitations where noted in research doc
   - Include evidence quality ratings from research doc

5. TONE:
   - Trauma-informed, accessible to informed adults
   - Include real data (percentages, correlations, effect sizes)
   - No oversimplification or diet culture language
   - Respectful of reader intelligence
   - Acknowledge uncertainty where appropriate

6. LENGTH: 1,500-2,500 words total

7. SAFETY:
   - Include ED disclaimer if lesson discusses food tracking/elimination
   - Add crisis resources if discussing severe symptoms
   - Privacy statement for any tracking tools

Reference these sources for content:
- Section IV lesson specifications (key topics, learning objectives, interactive components)
- Research document for this course (all evidence and citations)

Output as properly formatted markdown with complete YAML frontmatter.
```


***

### **Prompt 2: Generate Assessment JSON Files**

```
Generate a complete assessment JSON file for:

Assessment ID: [from lesson specifications]
Course: [course-id]
Title: [assessment title]
Type: likert | frequency | yes-no

RESEARCH SOURCE: Use research-doc-course-[X]-[course-name].md to inform scoring interpretation and recommendations.

Requirements:
1. Follow assessment schema exactly (see Section III.B)

2. QUESTIONS: Create 8-15 questions covering the assessment domain
   - Use evidence from research doc to inform question content
   - Ensure questions align with course learning objectives

3. SCORING INTERPRETATION:
   - Create 3-4 score ranges (low/moderate/high)
   - Reference specific research findings in interpretation text
   - Example: "Research shows Mediterranean diet adherence correlates with reduced anxiety (r = -0.202). Your score suggests..."

4. RECOMMENDATIONS:
   - Each score range needs 3-4 actionable recommendations
   - Base recommendations on evidence from research document
   - Be specific and practical

5. EVIDENCE BASE:
   - Include evidenceBase section with 2-3 key studies from research doc
   - Cite specific findings that support this assessment

6. DISCLAIMERS:
   - "This tool is educational only, not diagnostic"
   - "Based on research showing [specific finding from research doc]"
   - Privacy note about data storage

Output as valid JSON with proper structure and no syntax errors.
```


***

### **Prompt 3: Generate Checklist JSON Files**

```
Generate a complete checklist JSON file for:

Checklist ID: [from lesson specifications]
Course: [course-id]
Title: [checklist title]
Category: nutrition | sleep | anxiety | depression

RESEARCH SOURCE: Use research-doc-course-[X]-[course-name].md to inform checklist items and evidence notes.

Requirements:
1. Follow checklist schema exactly (see Section III.B)

2. ITEMS: Include 6-12 actionable items
   - Each item should be directly supported by research in the doc
   - Progressive difficulty (easier items first)

3. FOR EACH ITEM:
   - text: Clear, actionable statement
   - helpText: Brief how-to or context
   - evidenceNote: Cite specific research from doc
   - Example: "Research shows fermented foods increase beneficial gut bacteria, which produce mood-supporting SCFAs (Study: [X], 2025)"

4. COMPLETION MESSAGE: Reference research benefits
   - Example: "Great work! Studies show people who consistently include these practices report 15-20% improvement in [relevant outcome]"

5. FREQUENCY: Specify daily/weekly/as-needed based on research protocols

6. PRIVACY NOTE: Data storage explanation

Output as valid JSON with proper structure.
```


***

### **Prompt 4: Generate Quiz JSON Files**

```
Generate a quiz JSON file for:

Course: [course-id]
Lesson: lesson-[number]

RESEARCH SOURCE: Use research-doc-course-[X]-[course-name].md for question content and explanations.

Requirements:
1. Follow quiz schema exactly (see Section III.B)

2. QUESTIONS: Create 5-7 questions covering lesson learning objectives
   - Mix question types (multiple-choice, true-false)
   - Test understanding and application, not just recall
   - At least 2 questions should reference specific research findings

3. EXPLANATIONS: 
   - Each correct answer needs explanation with research citation
   - Reference specific studies from research doc
   - Example: "Correct! A 2025 meta-analysis found 22% increased depression risk with high UPF intake (HR: 1.22, 95% CI 1.16-1.28)"

4. WRONG ANSWER EXPLANATIONS:
   - Explain why incorrect options are wrong
   - Reference research where helpful
   - Example: "Not quite. While [incorrect concept], research actually shows [correct finding from research doc]"

5. SETTINGS:
   - passingScore: 70
   - allowRetakes: true
   - Include appropriate feedback messages

6. DIFFICULTY MIX:
   - 2-3 easier recall questions
   - 2-3 application/analysis questions
   - 1-2 questions requiring interpretation of research

Output as valid JSON with proper structure.
```


***

### **Prompt 5: Generate Tracking Log JSON Files**

```
Generate a tracking log JSON file for:

Log ID: [from lesson specifications]
Course: [course-id]
Purpose: [what patterns it tracks]

RESEARCH SOURCE: Use research-doc-course-[X]-[course-name].md to inform metrics and insights.

Requirements:
1. Follow tracking log schema exactly (see Section III.B)

2. METRICS: Include 3-6 relevant metrics based on research
   - Example: If research shows blood sugar affects mood, include glucose tracking metric
   - Mix metric types (scales, numbers, text, boolean, select)

3. FOR EACH METRIC:
   - Clear label and type
   - helpText explaining what to track and why (reference research)
   - Appropriate scale ranges based on validated instruments when applicable

4. TRACKING PERIOD: 
   - Specify daily/weekly based on research protocols
   - recommendedDuration based on how long patterns emerge (from research)
   - Example: "Research suggests 2-week tracking reveals patterns"

5. INSIGHTS GENERATED:
   - List 3-5 insights users can expect to discover
   - Base on research findings about correlations/patterns
   - Example: "Correlation between fiber intake and mood scores" (if research doc supports)

6. PRIVACY NOTE: Data storage and usage explanation

Output as valid JSON with proper structure.
```


***

### **Prompt 6: Generate Thought Record JSON Files**

```
Generate a thought record JSON file for:

Thought Record ID: [from lesson specifications]
Course: [course-id]
Purpose: [what cognitive work it supports]

RESEARCH SOURCE: Use research-doc-course-[X]-[course-name].md context for examples and guidance.

Requirements:
1. Follow thought record schema exactly (see Section III.B)

2. COLUMNS: Create 4-6 columns for CBT-style cognitive work
   - Standard columns: Situation, Automatic Thoughts, Evidence For, Evidence Against, Balanced Thought
   - Nutrition-specific additions: Food/Eating Context, Physical Sensations, Mood Rating

3. FOR EACH COLUMN:
   - Clear label and prompt question
   - Helpful placeholder example relevant to nutritional psychiatry
   - helpText with guidance for completion
   - Reference research context where appropriate

4. EXAMPLES: Use realistic scenarios:
   - Food-mood connections
   - Guilt/shame around eating (trauma-informed)
   - Nutrition goal barriers
   - Research interpretation (fact vs. interpretation)

5. THERAPEUTIC APPROACH: Label as "CBT" or "CBT + Nutritional Awareness"

6. PRIVACY NOTE: "Your entries are private and encrypted"

Output as valid JSON with proper structure.
```


***

### **Prompt 7: Generate Course Research Package**

```
Generate a comprehensive research package document for:

Course: [course-id]

SOURCE: Compile from research-doc-course-[X]-[course-name].md

Requirements:
1. Create markdown file: `server/data/research-packages/nutritional-psychiatry/[course-id]/annotated-bibliography.md`

2. STRUCTURE:
   - Introduction (what this package contains, how to use)
   - Landmark Studies section (5-7 most important studies)
   - Organized by topic sections (match lesson topics)
   - By research design (Meta-analyses, RCTs, Cohort, Mechanistic)
   - By condition if applicable (Depression, Anxiety, etc.)
   - Research gaps & future directions
   - How to interpret this research (guide for users)

3. FOR EACH STUDY in annotated bibliography:
   - Full citation
   - Study design and sample size
   - Key findings with statistics
   - Strengths and limitations
   - Clinical/practical applications
   - Evidence quality rating (⭐⭐⭐⭐⭐ to ⭐⭐)

4. TONE: 
   - Informed adult audience
   - Include actual data and statistics
   - Explain statistical concepts (HR, CI, p-values) without dumbing down
   - Acknowledge limitations transparently

5. LENGTH: 15-25 studies per course research package

6. INCLUDE USER GUIDE:
   - How to read study designs
   - Understanding statistics section
   - Evidence quality rating system explanation
   - When to be cautious vs. confident in applying research

Output as formatted markdown document ready for user download.
```


***

## **Updated Workflow**

### **Step 1: Gather Research** (You do this)

Run 4 Perplexity searches with the research prompts → Save as 4 research documents

### **Step 2: Generate Content** (Claude Code does this)

Use Prompts 1-7 above, which now reference the research documents

### **Step 3: Quality Check**

- Verify all statistics match research documents
- Confirm evidence quality ratings are accurate
- Check that practical applications align with research findings
- Ensure limitations are acknowledged


### **Step 4: Generate Research Packages**

Use Prompt 7 to create downloadable research packages from the Perplexity research docs

***

## **Key Changes from Original Prompts**

✅ **Added**: Reference to research documents as primary source
✅ **Added**: Instructions to cite specific studies from research docs
✅ **Added**: Evidence quality ratings must match research
✅ **Added**: Prompt 7 for generating research packages
✅ **Modified**: All prompts now pull statistics/findings from research docs
✅ **Modified**: Practical applications must align with research evidence
✅ **Enhanced**: Examples show how to integrate research into content

***

**Result**: Your content generation process is now tightly integrated with your research gathering. The 4 Perplexity research documents become the authoritative source that Claude Code references when generating all 119 files (39 lessons + 80 interactive components).

