# Lesson Creation & QC Protocol for Next.js Academy

This protocol adapts the original QC checklist for the SoloFrameHub v2 (Next.js 16 + TypeScript) architecture.

---

## 📁 File Locations (Next.js Structure)

| Content Type | Location |
|-------------|----------|
| **Lesson Markdown** | `server/data/content/<track>/<course-id>/lesson-X.md` |
| **Quiz JSON** | `server/data/quizzes/<track>/<course-id>/lesson-X.json` |
| **Curriculum Data** | `soloframehub-v2/lib/data/curriculum.ts` |
| **Quiz Service** | `soloframehub-v2/lib/services/quizService.ts` |

---

## 🎯 Content Requirements

### Minimum Standards Per Lesson

1. **Word Count**: 1000-1200 words minimum
2. **Structure** (all required):
   - Hook (Problem/Question that resonates with founder pain)
   - Core Concept (Why before How)
   - Methodology/Framework (Step-by-step, actionable)
   - Real Case Study (Specific names, metrics - NOT hypothetical)
   - Practice Exercise (Clear instructions + Expected output)
   - Summary (Key takeaways)

3. **Dual Context Examples**: Every example must work for BOTH:
   - B2B SaaS founders
   - Creator/Coach founders

4. **Tone Requirements**:
   - Technical founder friendly
   - No guru fluff ("unlock your potential", "game-changer")
   - No emojis in headers
   - Practitioner voice ("this is what I learned")

---

## 📝 Quiz JSON Schema

```json
{
  "lessonId": "1",
  "courseId": "course-slug",
  "sectionId": "track-id",
  "title": "Lesson Title Quiz",
  "passingScore": 70,
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Question text?",
      "options": [
        { "id": "a", "text": "Option A" },
        { "id": "b", "text": "Option B" },
        { "id": "c", "text": "Option C" },
        { "id": "d", "text": "Option D" }
      ],
      "correctAnswer": "b",
      "explanation": "Why this is correct..."
    },
    {
      "id": "r1",
      "type": "reflection",
      "question": "Open-ended reflection prompt...",
      "minLength": 100,
      "promptForAI": "Evaluation criteria for AI feedback..."
    }
  ]
}
```

### Quiz Rules
- **5 Multiple Choice** questions per quiz
- **1 Reflection** question per quiz (AI-evaluated)
- Type MUST be `multiple-choice` (NOT `single_choice`)
- All MC questions need `correctAnswer` and `explanation`
- Reflection needs `minLength` and `promptForAI`

---

## ✅ Pre-Publish Checklist

### 1. Content Compliance
- [ ] Follows course prompt package structure from `docs/course-creation-context-and-prompts/`
- [ ] 1000+ words of teaching content
- [ ] Hook, Core Concept, Framework, Case Study, Exercise, Summary present
- [ ] Dual examples (B2B + Creator)
- [ ] No AI-sounding language
- [ ] Markdown starts with `##` (H2), not `#` (H1)

### 2. Quiz Validation
- [ ] Quiz JSON is valid (use `JSON.parse()` test)
- [ ] Wrapped in object with `questions` array (NOT bare array)
- [ ] 5 MC + 1 Reflection question
- [ ] All `type` values are `multiple-choice` (not `single_choice`)
- [ ] `promptForAI` field present on reflection questions
- [ ] Quiz file path matches: `server/data/quizzes/<track>/<course>/lesson-X.json`

### 3. Curriculum Registration
- [ ] Course exists in `lib/data/curriculum.ts`
- [ ] Lesson listed in course's `lessons` array
- [ ] Lesson `id` matches filename number

### 4. Browser Verification
- [ ] Navigate to `/academy/<course-id>/<lesson-id>`
- [ ] Lesson content renders without errors
- [ ] Quiz section appears below content
- [ ] All MC options render correctly
- [ ] Submit quiz with all correct answers → Score 100%
- [ ] Submit with reflection → AI feedback appears (not fallback message)
- [ ] "Next Step" button navigates correctly

---

## 🔧 Common Failure Modes

### Quiz Not Loading
**Symptom**: "No quiz available for this lesson"
**Causes**:
1. Quiz JSON is bare array `[...]` instead of `{ "questions": [...] }`
2. File path mismatch (wrong track/course folder)
3. `lessonId` in JSON doesn't match URL

### Fallback AI Feedback
**Symptom**: "Great reflection! Keep refining your approach..."
**Causes**:
1. Missing `promptForAI` field in quiz JSON
2. Field named `aiPrompt` instead of `promptForAI`
3. GenKit model error (check server logs)

### Duplicate H1 Headers
**Symptom**: Two lesson titles on page
**Cause**: Markdown starts with `# Lesson Title`
**Fix**: Start markdown with `##` or plain text

### New Course/Lesson Not Loading (404)
**Symptom**: Page returns 404 even though files exist and are registered in `curriculum.ts`.
**Causes**:
1. Next.js (especially with Turbopack) has not updated the `generateStaticParams` cache.
2. `curriculum.ts` metadata changes weren't picked up by the routing layer.
**Fix**: Restart the dev server (`npm run dev`).

---

## 🚀 Lesson Creation Workflow

### Step 1: Create Lesson Markdown
```bash
# Location
server/data/content/<track>/<course-id>/lesson-X.md
```

### Step 2: Create Quiz JSON
```bash
# Location
server/data/quizzes/<track>/<course-id>/lesson-X.json
```

### Step 3: Register in Curriculum
```typescript
// In lib/data/curriculum.ts, add to course lessons array:
{ id: 'X', title: 'Lesson Title', duration: '50 min' }
```

### Step 4: Browser Test
```bash
# Navigate to:
http://localhost:3000/academy/<course-id>/X
```

### Step 5: Submit for Review
- [ ] All checklist items verified
- [ ] Screenshots of working quiz captured
- [ ] Ready for next lesson

---

## 📊 Track-to-Folder Mapping

| Track | Folder Name |
|-------|-------------|
| TRACK 1: Foundations | `foundations` |
| TRACK 2: Marketing Engine | `marketing-engine` |
| TRACK 3: Sales Methodology | `sales-methodology` |
| TRACK 4: Customer Success | `customer-success` |
| TRACK 5: Operations & Systems | `operations-systems` |

---

## 🎓 AI Coach Integration Points

Each lesson should include opportunities for:
1. **AI Reflection Feedback** - Via quiz reflection questions
2. **AI Coaching Prompts** - Suggested prompts in lesson content
3. **Personalized Examples** - Using founder's 3D context (category, industry, personas)

---

## 📚 Reference Materials

| Resource | Location |
|----------|----------|
| Course Prompt Packages | `docs/course-creation-context-and-prompts/` |
| Original QC Checklist | `docs/QC_CHECKLIST.md` |
| Existing Lesson Examples | `server/data/content/foundations/sales-psychology/` |
| Quiz Examples | `server/data/quizzes/foundations/icp-builder/` |
