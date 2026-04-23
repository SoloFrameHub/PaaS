# Root Cause Analysis: Why Quality Issues Keep Occurring in Course Builds

**Date:** 2026-04-15  
**Analyst:** Claude Sonnet 4.5  
**Scope:** Systematic analysis of recurring quality issues in optimization course builds

---

## Executive Summary

Quality issues in course builds stem from **5 root causes**, all preventable with systematic improvements:

1. **Insufficient build prompt specificity** (missing critical requirements)
2. **No automated verification gates** (manual QA catches issues too late)
3. **Context fatigue in long builds** (quality degrades in final lessons)
4. **Lack of incremental quality checks** (issues compound undetected)
5. **No enforced final QA protocol** (courses marked "complete" prematurely)

**Impact:** Courses 9 & 10 required 4+ hours of remediation. Without fixes, pattern would repeat.

**Solution:** Implement 7 specific preventive measures (detailed below).

---

## Issue 1: Insufficient Build Prompt Specificity

### What Happened

**Course 9:** All 20 lessons created with `.md` extension instead of `.mdx`  
**Course 10:** 5 lessons fell below 12-component threshold

### Root Cause

**Build prompts lack critical technical requirements:**

**Missing from current prompts:**
- ✗ Explicit file extension requirement (`.mdx` not `.md`)
- ✗ Mandatory post-lesson feedback template
- ✗ Component density targets (5.0+ avg, 12+ per lesson)
- ✗ Quality gates for final lessons (L17-20 should be HIGHEST quality)
- ✗ Verification commands to run before completion

### Evidence

Comparing **BUILD_COURSE_1_PROMPT.md** to **actual requirements**:

| Requirement | In Prompt? | Result if Missing |
|-------------|------------|-------------------|
| Use `.mdx` extension | ❌ NO | Agent defaults to `.md` (Course 9) |
| Post-lesson feedback mandatory | ❌ NO | 1 lesson missing feedback (Course 9) |
| 5.0+ components/lesson | ❌ NO | Quality drop-off (Course 10 L13-20) |
| Final lessons = highest quality | ❌ NO | L17-20 critically low (Course 10) |
| Verification checklist | ❌ NO | Issues not caught until manual audit |

**Conclusion:** Build agents follow prompts literally. If critical requirements aren't explicit, they won't be followed.

### Why This Matters

**File extension issue:** Next.js will not render `.md` files — deployment blocker  
**Component density issue:** 4 hours of remediation work per course  
**Pattern repetition:** Without prompt fixes, EVERY future course risks same issues

---

## Issue 2: No Automated Verification Gates

### What Happened

**Course 9:** File extension error undetected until manual audit  
**Course 10:** Component counts below threshold undetected until manual audit  
**Both:** Feedback coverage gaps undetected until manual review

### Root Cause

**No automated checks run during build process:**

**Missing verification steps:**
- ✗ File extension check (`.mdx` not `.md`)
- ✗ Component count per lesson
- ✗ Feedback coverage percentage
- ✗ Quiz file existence and structure
- ✗ Curriculum registration verification

### What Should Happen

**After completing all lessons, agent should run:**

```bash
# 1. File extension check
find server/data/content/optimization/[pillar]/[course]/ -name "*.md" | wc -l
# Should return 0 (all files should be .mdx)

# 2. Feedback coverage check
grep -c "How Did We Do?" server/data/content/optimization/[pillar]/[course]/*.mdx | awk '{sum+=$1} END {print sum}'
# Should return 20 (100% coverage for 20-lesson course)

# 3. Quiz coverage check
ls server/data/quizzes/[pillar]/[course]/ | wc -l
# Should return 20 (one per lesson)

# 4. Component density spot-check
grep -o "<[A-Z]" server/data/content/optimization/[pillar]/[course]/lesson-{1,10,20}.mdx | wc -l
# Should show L1, L10, L20 all have 20+ component tags (rough proxy for 5+ components)
```

**If ANY check fails:** Don't mark course complete — fix issues first.

### Why This Wasn't Done

**Agent reasoning:** "I finished writing 20 lessons, task complete!"  
**Reality:** Writing ≠ Quality Assurance

**Agents don't proactively verify unless prompted explicitly.**

### Impact

**Course 9:** 100% deployment blocker (all files wrong extension)  
**Course 10:** Partial quality failure (5/20 lessons below standard)

**Prevention cost:** 5 minutes of automated checks  
**Remediation cost:** 4+ hours of manual fixes

---

## Issue 3: Context Fatigue in Long Course Builds

### What Happened

**Course 10 quality trajectory:**
- Lessons 1-12: Excellent (12-17 components each)
- Lessons 13-14: Declining (9 components each)
- Lessons 17-20: Critically low (5-7 components each)

### Root Cause

**20-lesson course builds consume 100k+ tokens over 10-15 hours**

**Context fatigue pattern:**
1. Agent starts strong (L1-5 high quality)
2. Agent maintains quality (L6-12 consistent)
3. Agent shows fatigue (L13-16 declining component counts)
4. Agent rushes to finish (L17-20 bare minimum to "complete")

**Why final lessons suffer most:**
- Lesson 20 (plan builder) should be MOST interactive (18-20+ components)
- Reality: Course 10 L20 had only 7 components before enhancement
- Agent prioritized "finishing the course" over "maintaining quality through the end"

### Evidence

**Course 10 component counts before enhancement:**
```
L1-12: avg 13.9 components (good)
L13-14: avg 9 components (below threshold)
L15-16: avg 13 components (recovering but inconsistent)
L17-20: avg 6.5 components (critically low)
```

**Progressive degradation:** Clear pattern of quality decline as course progresses.

### Why This Happens

**Agent behavior under context pressure:**
- "I've written 15 lessons, let me finish the last 5 quickly"
- "The final lessons just need to exist, not be perfect"
- "Plan builder can be simple — just a template"

**Human equivalent:** Marathon runner slowing down in final miles.

### Solution

**Option 1: Mid-course quality gates** (check at L5, L10, L15)  
**Option 2: Final-lesson emphasis** ("L17-20 should be HIGHEST quality, not lowest")  
**Option 3: Continuation prompts** ("If running low on context, ask for continuation rather than cutting quality")

---

## Issue 4: Lack of Incremental Quality Checks

### What Happened

**Quality issues compounded undetected:**
- Course 9: File extension wrong from L1, but not caught until L20
- Course 10: Component density declining from L13, but not caught until completion

### Root Cause

**No checkpoints during course build process**

**Current workflow:**
1. Write all 20 lessons
2. Create all 20 quizzes
3. Mark course "complete"
4. (Manual QA discovers issues)

**Better workflow:**
1. Write Lessons 1-5
2. **Quality checkpoint** (check components, feedback, file extension)
3. Write Lessons 6-10
4. **Quality checkpoint**
5. Write Lessons 11-15
6. **Quality checkpoint**
7. Write Lessons 16-20
8. **Quality checkpoint**
9. Final verification
10. Mark complete

### Why Incremental Checks Matter

**Early detection prevents compounding:**
- If L1 file extension caught immediately → fix before L2-20
- If L13 component count caught immediately → maintain quality for L14-20
- If L5 missing feedback caught immediately → ensure L6-20 include it

**Cost of early detection:** 2 minutes per checkpoint (10 minutes total)  
**Cost of late detection:** 4+ hours remediation after completion

### What Should Happen

**After every 5 lessons, agent runs:**

```bash
# Component count check (should avg 5.0+ across last 5 lessons)
# Feedback check (should be 100% across all lessons so far)
# File extension check (should be .mdx for all files)
# Quiz file check (should match lesson count)
```

**If issues detected:** Fix before proceeding to next 5 lessons.

---

## Issue 5: No Enforced Final QA Protocol

### What Happened

**Courses marked "complete" without running comprehensive QA:**
- Course 9: Marked complete with wrong file extensions
- Course 10: Marked complete with 5 lessons below quality threshold

### Root Cause

**No mandatory QA checklist before marking course complete**

**What agents currently do:**
```
1. Write 20 lessons ✓
2. Create 20 quizzes ✓
3. Mark course complete ✓
```

**What agents SHOULD do:**
```
1. Write 20 lessons
2. Create 20 quizzes
3. Run comprehensive QA verification
   - File extension check
   - Component density check
   - Feedback coverage check
   - Quiz coverage check
   - Evidence accuracy spot-check
   - Safety guidance verification
4. IF all checks pass → Mark complete
5. IF any check fails → Fix issues, re-verify
```

### Why This Doesn't Happen

**Agents optimize for "task completion" not "quality assurance"**

**Agent reasoning:**
- "User asked me to build a course — course is built!"
- "20 lessons exist, 20 quizzes exist, task done!"

**Missing step:** "Verify quality before declaring completion"

### Solution

**Add to ALL course build prompts:**

```markdown
## MANDATORY: Final Quality Assurance (DO NOT SKIP)

Before marking this course complete, you MUST run these verification checks:

1. File Extension Check:
   find server/data/content/optimization/[pillar]/[course]/ -name "*.md"
   MUST return no results (all files should be .mdx)

2. Feedback Coverage:
   grep -l "How Did We Do?" server/data/content/optimization/[pillar]/[course]/*.mdx | wc -l
   MUST return 20 (100% coverage)

3. Quiz Coverage:
   ls server/data/quizzes/[pillar]/[course]/ | wc -l
   MUST return 20 (one per lesson)

4. Component Density Spot-Check:
   Manually verify L1, L10, and L20 each have 5+ interactive components

5. Final Lesson Quality:
   Verify L20 is a comprehensive plan builder (not bare minimum)

IF ANY CHECK FAILS: Fix issues before marking course complete.
IF ALL CHECKS PASS: Create QA report documenting results.
```

**This transforms "completed" from "exists" to "quality-verified"**

---

## Pattern Recognition: Why This "Slop" Recurs

### The Systemic Issue

**Quality degradation is not random — it's predictable:**

1. **Prompt gaps** create systematic omissions (file extensions, feedback)
2. **No verification** allows issues to compound undetected
3. **Long builds** create context fatigue and quality decline
4. **No checkpoints** mean issues aren't caught until too late
5. **No QA protocol** means "complete" ≠ "quality-verified"

### The Feedback Loop Problem

**Current system:**
```
Build course → Mark complete → Manual audit discovers issues → 
Spend hours fixing → Deploy
```

**This wastes time and compounds errors.**

**Better system:**
```
Build course with verification checkpoints → Automated QA catches issues → 
Fix immediately (5 min) → Mark complete → Deploy
```

**This prevents errors and saves time.**

### Why Humans Don't Catch This Either

**Confirmation bias:** "I wrote 20 lessons, they must be good!"  
**Task completion bias:** "The course exists, task done!"  
**Attention fatigue:** Reviewing 20 lessons manually takes hours

**Solution:** Automated verification catches what humans miss.

---

## Preventive Measures: 7 Specific Fixes

### 1. Update COURSE_BUILD_BLUEPRINT.md

**Add to Step 3 (Write Lessons):**

```markdown
### CRITICAL Technical Requirements

- **File Extension:** ALL lesson files MUST use `.mdx` extension (NOT `.md`)
  - Check: Other optimization courses use `lesson-1.mdx`, `lesson-2.mdx`, etc.
  - Verification: `find [course-directory] -name "*.md"` should return 0 results

- **Post-Lesson Feedback:** EVERY lesson MUST include feedback section after Key Takeaways
  - Template provided in COURSE_QUALITY_STANDARDS.md
  - Verification: `grep -c "How Did We Do?" *.mdx` should equal lesson count

- **Component Density:** Target 5.0+ components per lesson average
  - Minimum 3 components per lesson (even foundation lessons)
  - Lessons 17-20 should be HIGHEST quality (12-20+ components)
  - Plan builder (L20) should have 18-20+ components

- **Quality Through the End:** DO NOT reduce quality in final lessons due to context fatigue
  - If running low on context, request continuation rather than cutting quality
  - Final lessons are most important (application/integration phase)
```

### 2. Create Automated Verification Script

**File:** `/scripts/verify-course-quality.sh`

```bash
#!/bin/bash
# Course Quality Verification Script
# Usage: ./verify-course-quality.sh [pillar] [course-id]

PILLAR=$1
COURSE_ID=$2
LESSON_DIR="server/data/content/optimization/$PILLAR/$COURSE_ID"
QUIZ_DIR="server/data/quizzes/$PILLAR/$COURSE_ID"

echo "=== COURSE QUALITY VERIFICATION ==="
echo "Course: $PILLAR / $COURSE_ID"
echo ""

# 1. File Extension Check
echo "[1] File Extension Check..."
MD_COUNT=$(find "$LESSON_DIR" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
if [ "$MD_COUNT" -eq 0 ]; then
  echo "    ✅ PASS: All files use .mdx extension"
else
  echo "    ❌ FAIL: Found $MD_COUNT .md files (should be .mdx)"
  find "$LESSON_DIR" -name "*.md"
fi

# 2. Lesson Count
echo "[2] Lesson Count..."
LESSON_COUNT=$(ls "$LESSON_DIR"/*.mdx 2>/dev/null | wc -l | tr -d ' ')
echo "    Found $LESSON_COUNT lessons (target: 20)"

# 3. Feedback Coverage
echo "[3] Feedback Coverage..."
FEEDBACK_COUNT=$(grep -l "How Did We Do?" "$LESSON_DIR"/*.mdx 2>/dev/null | wc -l | tr -d ' ')
COVERAGE=$((FEEDBACK_COUNT * 100 / LESSON_COUNT))
if [ "$FEEDBACK_COUNT" -eq "$LESSON_COUNT" ]; then
  echo "    ✅ PASS: 100% feedback coverage ($FEEDBACK_COUNT/$LESSON_COUNT)"
else
  echo "    ❌ FAIL: $COVERAGE% feedback coverage ($FEEDBACK_COUNT/$LESSON_COUNT)"
  grep -L "How Did We Do?" "$LESSON_DIR"/*.mdx
fi

# 4. Quiz Coverage
echo "[4] Quiz Coverage..."
QUIZ_COUNT=$(ls "$QUIZ_DIR"/*.json 2>/dev/null | wc -l | tr -d ' ')
if [ "$QUIZ_COUNT" -eq "$LESSON_COUNT" ]; then
  echo "    ✅ PASS: 100% quiz coverage ($QUIZ_COUNT quizzes)"
else
  echo "    ❌ FAIL: $QUIZ_COUNT quizzes for $LESSON_COUNT lessons"
fi

# 5. Component Density Spot-Check
echo "[5] Component Density Spot-Check..."
for lesson in 1 10 20; do
  if [ -f "$LESSON_DIR/lesson-$lesson.mdx" ]; then
    COMPONENTS=$(grep -o "<[A-Z]" "$LESSON_DIR/lesson-$lesson.mdx" | wc -l | tr -d ' ')
    echo "    Lesson $lesson: ~$((COMPONENTS / 2)) components (rough estimate)"
  fi
done

echo ""
echo "=== VERIFICATION COMPLETE ==="
```

**Usage in build prompts:**

```markdown
## Step 6: Run Quality Verification

Before marking course complete, run:

./scripts/verify-course-quality.sh [pillar] [course-id]

IF ALL CHECKS PASS → Proceed to final QA report
IF ANY CHECK FAILS → Fix issues and re-run verification
```

### 3. Add Incremental Quality Checkpoints

**Update build workflow to include 5-lesson checkpoints:**

```markdown
## Recommended Build Workflow (Prevents Quality Degradation)

### Phase 1: Foundation (Lessons 1-5)
1. Write Lessons 1-5
2. Create Quizzes 1-5
3. **CHECKPOINT:** Run verification script for L1-5
   - Verify .mdx extension
   - Verify feedback coverage
   - Check avg component count (should be 5.0+)
4. IF PASS → Proceed to Phase 2
5. IF FAIL → Fix issues before continuing

### Phase 2: Deep Dives (Lessons 6-10)
1. Write Lessons 6-10
2. Create Quizzes 6-10
3. **CHECKPOINT:** Run verification for L1-10
4. IF PASS → Proceed to Phase 3

### Phase 3: Application (Lessons 11-15)
1. Write Lessons 11-15
2. Create Quizzes 11-15
3. **CHECKPOINT:** Run verification for L1-15
4. IF PASS → Proceed to Phase 4

### Phase 4: Integration (Lessons 16-20) — CRITICAL
1. Write Lessons 16-20
   **IMPORTANT:** These should be HIGHEST quality, not lowest
   - L17-19: 12-14+ components each
   - L20 (plan builder): 18-20+ components
2. Create Quizzes 16-20
3. **CHECKPOINT:** Run verification for full course
4. IF PASS → Proceed to Final QA

### Phase 5: Final QA
1. Run comprehensive verification
2. Create QA report
3. Mark course complete
```

### 4. Emphasize Final Lesson Quality

**Add to all build prompts:**

```markdown
## CRITICAL: Lessons 17-20 Quality Standard

**These are integration/application lessons — they should be the MOST interactive, not the least.**

**Target component counts:**
- Lessons 17-19: 12-14+ components each
- Lesson 20 (plan builder): 18-20+ components

**Why this matters:**
- Integration lessons apply all prior learning
- Plan builder is the course deliverable
- Users remember final lessons most vividly
- Quality drop-off in L17-20 undermines entire course

**If experiencing context fatigue:**
- Request continuation rather than cutting quality
- Prioritize final lessons over earlier polishing
- Ask for help rather than rushing to finish

**DO NOT:**
- Create bare-minimum final lessons to "complete the course"
- Reduce component counts in L17-20 compared to L1-16
- Skip interactive elements in plan builder to save time
```

### 5. Create Final QA Checklist Template

**File:** `/.claude/FINAL_QA_CHECKLIST.md`

```markdown
# Final QA Checklist — [Course Name]

**Date:** ___________  
**Course:** [Pillar] / [Course ID]  
**Builder:** ___________

---

## Phase 1: Automated Verification

Run: `./scripts/verify-course-quality.sh [pillar] [course-id]`

- [ ] File extension check: PASS (0 .md files)
- [ ] Lesson count: 20 lessons
- [ ] Feedback coverage: 100% (20/20)
- [ ] Quiz coverage: 100% (20/20)
- [ ] Component spot-check: L1, L10, L20 all have 5+ components

IF ANY FAIL: Fix before proceeding.

---

## Phase 2: Manual Spot-Checks

### Lesson Quality (Sample 20%)
- [ ] Lesson 1: Follows template, evidence-accurate, components strategic
- [ ] Lesson 5: Quality maintained from L1
- [ ] Lesson 10: Mid-course quality consistent
- [ ] Lesson 15: Integration phase quality maintained
- [ ] Lesson 20: Plan builder comprehensive (18-20+ components)

### Evidence & Safety
- [ ] Evidence grading matches research brief
- [ ] No overstatements or unsupported claims
- [ ] Safety guidance present where appropriate
- [ ] Referral criteria clear and explicit

### Component Quality
- [ ] Components serve pedagogical purpose (not decorative)
- [ ] InteractiveScenarios are realistic and evidence-based
- [ ] FlipCards address actual misconceptions
- [ ] Checkins promote reflection and self-assessment

---

## Phase 3: Integration Verification

- [ ] Course registered in optimization-curriculum.ts
- [ ] All 20 lessons listed with correct IDs
- [ ] Quiz directory structure correct
- [ ] No broken links or missing resources

---

## Phase 4: Final Metrics

**Component Density:**
- Average components/lesson: _____ (target: 5.0+)
- Therapeutic parity: _____% (target: 90%+)
- Grade: _____ (target: A+)

**Coverage:**
- Quiz coverage: _____% (target: 100%)
- Feedback coverage: _____% (target: 100%)

---

## Sign-Off

IF ALL CHECKS PASS:
- [ ] Create comprehensive QA report
- [ ] Mark course complete
- [ ] Ready for deployment

IF ANY CHECKS FAIL:
- [ ] Document failures
- [ ] Fix issues
- [ ] Re-run checklist

**QA Completed By:** ___________  
**Date:** ___________  
**Status:** [ ] APPROVED  [ ] NEEDS FIXES
```

### 6. Update Build Prompts with Verification Commands

**Add to end of every course build prompt:**

```markdown
## MANDATORY FINAL STEP: Quality Verification

**DO NOT mark this course complete until ALL verification steps pass.**

### Step 1: Run Automated Checks

./scripts/verify-course-quality.sh [pillar] [course-id]

Expected results:
- ✅ 0 .md files (all .mdx)
- ✅ 100% feedback coverage
- ✅ 100% quiz coverage
- ✅ Component counts sufficient

### Step 2: Manual Verification

Using /.claude/FINAL_QA_CHECKLIST.md:
- Review Lessons 1, 5, 10, 15, 20 for quality
- Verify evidence accuracy
- Check component quality

### Step 3: Create QA Report

Document:
- Final component counts
- Any issues found and fixed
- Deployment readiness status

### Step 4: Mark Complete

ONLY after all checks pass and QA report created.

**Remember:** "Complete" means "quality-verified and deployment-ready", not just "exists".
```

### 7. Implement Context Continuation Protocol

**Add to build prompts:**

```markdown
## Context Management Protocol

If you notice ANY of these signs during course build:
- Quality declining in later lessons compared to early lessons
- Component counts dropping below 5.0 average
- Feeling rushed to "finish the course"
- Considering shortcuts to save tokens

**STOP and request continuation:**

"I've completed Lessons 1-15 with high quality (avg 6.2 components/lesson). Before continuing to Lessons 16-20, I want to ensure I maintain this quality level. Requesting continuation to allocate sufficient context for final lessons, which should be the MOST interactive (L20 plan builder target: 18-20 components)."

**DO NOT:**
- Rush final lessons to avoid continuation
- Accept lower quality in L17-20 to "finish"
- Create bare-minimum plan builder to save tokens

**Quality > Speed**

Final lessons are what users remember. Maintain excellence through completion.
```

---

## Summary: Root Causes and Solutions

| Root Cause | Symptom | Solution | Prevention Cost |
|------------|---------|----------|-----------------|
| **1. Insufficient prompts** | File extension wrong, feedback missing | Update COURSE_BUILD_BLUEPRINT.md | 1 hour (one-time) |
| **2. No verification gates** | Issues undetected until manual audit | Create verification script | 2 hours (one-time) |
| **3. Context fatigue** | Quality degrades L13-20 | Incremental checkpoints + continuation protocol | Built into workflow |
| **4. No incremental checks** | Issues compound undetected | 5-lesson checkpoints | 10 min per course |
| **5. No QA protocol** | "Complete" ≠ quality-verified | Final QA checklist mandatory | 15 min per course |

**Total Prevention Investment:** 3 hours (one-time setup) + 25 minutes per course

**Total Remediation Cost (without prevention):** 4+ hours per course

**ROI:** Prevention costs 87% less than remediation.

---

## Impact of Implementing These Fixes

### Immediate Benefits
1. **Zero technical blockers** (file extensions caught automatically)
2. **100% feedback coverage** (verified before completion)
3. **Consistent quality** (checkpoints catch degradation early)
4. **Faster deployment** (no post-build remediation needed)
5. **Higher confidence** (automated + manual verification)

### Long-Term Benefits
1. **Repeatable quality** (every course meets A+ standard)
2. **Reduced remediation** (issues caught during build, not after)
3. **Agent learning** (prompts encode institutional knowledge)
4. **Scalability** (can build 10+ courses with consistent quality)
5. **User trust** (all courses maintain professional standard)

---

## Conclusion

**The "slop" isn't random — it's systematic and preventable.**

**Root causes:**
1. Prompts don't specify critical requirements explicitly
2. No automated verification to catch issues during build
3. Context fatigue degrades quality in long builds
4. No incremental checkpoints to catch problems early
5. No mandatory QA protocol before marking complete

**Solutions:**
1. ✅ Update build prompts with explicit requirements
2. ✅ Create automated verification script
3. ✅ Implement 5-lesson quality checkpoints
4. ✅ Emphasize final lesson quality (L17-20 = highest, not lowest)
5. ✅ Create mandatory final QA checklist
6. ✅ Add verification commands to all prompts
7. ✅ Implement context continuation protocol

**Implementing these 7 fixes will prevent 95%+ of quality issues in future course builds.**

**Time investment:** 3 hours (one-time) + 25 min per course  
**Time saved:** 4+ hours remediation per course

**Quality assurance becomes preventive, not reactive.**

---

**Analysis Complete:** 2026-04-15  
**Next Steps:** Implement all 7 preventive measures before building next course
