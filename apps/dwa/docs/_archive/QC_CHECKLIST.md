# Lesson Quality Control (QC) Checklist

This checklist must be used to verify every lesson before it is marked as "Complete".

## 1. Content Compliance
- [ ] **Prompt Alignment**: Does the lesson content strictly follow the `docs/course-creation-context-and-prompts/` structure?
- [ ] **Components Present**:
  - [ ] **Word Count**: Minimum 1000-1200 words.
  - [ ] Hook (Problem/Question)
  - [ ] Core Concept Explanation (Why before How)
  - [ ] Methodology/Framework (Step-by-step)
  - [ ] Real Case Study (Specific names/metrics, not hypothetical)
  - [ ] Practice Exercise (Clear instructions + Output)
  - [ ] Summary
- [ ] **Tone Check**: Technical founder friendly? No guru fluff? No emojis in headers?

## 2. Platform Integration
- [ ] **AI Coaching**: Does the lesson include specific prompts for the AI Coach?
- [ ] **Tools**: Does it reference the correct sidebar tools (e.g., ICP Builder, Execution Workspace)?
- [ ] **Sidebar Tools**: Are the referenced tools actually available/functional in the UI?

## 3. Assessment & Interactive Elements
- [ ] **Quiz Requirements**:
  - [ ] Exactly **5 Multiple Choice Questions** per quiz.
  - [ ] **Type Check**: Question `type` MUST be `multiple-choice` (NOT `single_choice`).
  - [ ] **Correct JSON Structure**: `{ "questions": [ {...}, {...} ] }` NOT `[ {...}, {...} ]`
  - [ ] **NO Reflection Questions** in the quiz (use Execution Workspace for open-ended work).
  - [ ] All MC questions have correct answers and explanations defined in JSON.
  - [ ] **Test Quiz Loads**: Navigate to lesson page and verify quiz renders without "Quiz not available" error.
- [ ] **Execution Workspace**:
  - [ ] Is the "Student Ideas" textarea prompt relevant to the lesson?
  - [ ] Does the "Analyze Strategy" button work?

## 4. Technical Validation
- [ ] **File Location**: `server/data/content/<section>/<course>/lesson-X.md`
- [ ] **Quiz Location**: `server/data/quizzes/<section>/<course>/lesson-X.json`
- [ ] **Images**: Are any referenced images existing in `/public/assets`?
- [ ] **Links**: Do all internal links point to valid routes?
- [ ] **AI Context Safety**: Verify AI does not hallucinate outside frameworks (e.g., BANT in Firmographics).
- [ ] **Visibility Check**:
  - [ ] Does "Custom Learning Plan" appear if score < 80%?
  - [ ] Does "Input Feedback" work for the lesson example?

## 4.5 Schema & Structure Validation
- [ ] **Quiz JSON Schema**: 
  - [ ] Quiz files MUST be Objects with `questions` array: `{ "questions": [...] }`
  - [ ] NOT a direct array: `[...]` (causes `data.questions.map` crash in `quizService.js`)
  - [ ] Verify structure matches expectation: `quizService.js` Line 115 expects `quizData.questions.map()`
  
- [ ] **Markdown Heading Collision**:
  - [ ] NO `# Lesson X:` or `# Course Title` as first line in `.md` files
  - [ ] EJS template (`views/dashboard/lesson.ejs`) already renders `<h1><%= lesson.title %></h1>`
  - [ ] Start Markdown content with `##` (H2) or plain text to avoid duplicate H1s
  
- [ ] **File Path Verification**:
  - [ ] Test file exists: `npm run validate:quizzes` before marking lesson "Complete"
  - [ ] Verify quiz loads in browser before marking lesson "Complete"
  - [ ] Check server logs (`npm run dev` terminal) for any load errors

## 5. Review Protocol
- [ ] **Self-Correction**: If the AI Learning Path isn't triggering, check the quiz score logic (<80%).
- [ ] **Completeness**: No "TODO" or placeholder text allowed in final content.
- [ ] **Example Quality**: The "Collapsible Example" in Execution Workspace must be high-quality enough to receive positive/constructive feedback from the "Fair" AI mode.
- [ ] **End-to-End Test**: Load the lesson in browser, complete quiz, verify all interactive elements work.

---

## Common Failure Modes (Learn from Past Errors)

### JSON Structure Crash
**Symptom**: "Quiz not available" message in browser  
**Cause**: Quiz JSON file is array `[...]` instead of object `{ "questions": [...] }`  
**Fix**: Wrap questions array in object structure  

### Duplicate Heading Visual Bug
**Symptom**: Two "Lesson X" titles appear on page  
**Cause**: Markdown starts with `# Lesson X:` + EJS template renders `<h1>`  
**Fix**: Remove H1 from Markdown, start with H2 or plain text  

### Empty Terminal Output
**Symptom**: Can't see server errors in running process  
**Cause**: Terminal buffer issue or timing of log reading  
**Fix**: Write test script to validate files before server start, or restart server to force logs