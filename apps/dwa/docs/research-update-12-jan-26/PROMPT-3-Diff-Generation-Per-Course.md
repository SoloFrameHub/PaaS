# PROMPT 3: DIFF GENERATION (PER COURSE)

**Purpose:** Generate side-by-side before/after comparisons for lesson updates, with research citations and IP-safe alternatives clearly marked.

**Target Tool:** Claude Code / Antigravity  
**Prerequisites:** Complete PROMPT 1 & 2 (Discovery + Gap Analysis) first  
**Expected Output:** Reviewable diff files per course with specific change recommendations  
**Estimated Time:** 15-25 minutes per course

---

## CONTEXT

You have completed:
- **CONTENT_INVENTORY_REPORT_2025-01-13.md** - All lesson files mapped
- **RESEARCH_GAP_ANALYSIS_2025-01-13.md** - Gaps identified and prioritized

Now you need to generate **specific, reviewable diffs** for each lesson that needs updating, so Mike can approve changes before they're applied.

---

## YOUR TASK

### Phase 1: Select Target Course

**Choose ONE course to generate diffs for.** Start with highest priority courses from Gap Analysis.

**Recommended Sequence:**
1. Course 2 (Position & Value Prop) - Has IP violations (StoryBrand)
2. Course 0 (Sales Psychology) - High value, moderate updates
3. Course 1 (ICP Builder) - High value, moderate updates
4. Course 6 (SEO/AEO) - Rapidly changing field
5. Course 7 (LinkedIn) - 2025 updates available

**For this prompt execution, specify which course:**
```markdown
## Target Course: Course [X] - [Course Name]

**Rationale:** [Why this course is priority]
**Total Lessons:** X
**Lessons Requiring Updates:** X
- Deep: X lessons
- Moderate: X lessons
- Light: X lessons
```

---

### Phase 2: Generate Lesson Diffs

**For EACH lesson requiring updates in the target course:**

#### Diff Format: Side-by-Side Comparison

```markdown
## Lesson [X]: [Lesson Title]

**Update Priority:** [🔴 Deep / 🟡 Moderate / 🟢 Light]  
**Estimated Effort:** [X hours]  
**Research Sources:** [List research files used]  
**IP Compliance:** [✅ Safe / ⚠️ Needs Review / 🚫 Must Replace]

---

### CHANGE SUMMARY

**What's Changing:**
1. [Brief description of change 1]
2. [Brief description of change 2]
3. ...

**Why These Changes:**
- [Research finding that motivates change]
- [IP compliance requirement]
- [Updated statistics/examples]

**New Content Word Count:** +XXX words (or -XXX if reducing)

---

### SECTION 1: [Section Name, e.g., "Introduction"]

#### BEFORE (Current Content)
```
[Exact current text from lesson file]
[Keep formatting intact]
[Include enough context to understand what's being changed]
```

#### AFTER (Proposed Update)
```
[Updated text with research integrated]
[Show new statistics, frameworks, examples]
[Mark research citations with [^1], [^2] notation]
[Flag IP-safe alternatives with ✅]
```

#### RATIONALE
- **Research Citation:** [^1] Research finding from [filename.md] shows [insight]
- **IP Compliance:** Replaced [proprietary framework] with [public domain alternative] ✅
- **Update Type:** [New statistic / New framework / Expanded explanation / Case study addition]

---

### SECTION 2: [Next Section Name]

[Repeat same format]

---

### RESEARCH CITATIONS FOR THIS LESSON

[^1]: `Research_filename.md` - [Specific insight or statistic]
[^2]: `02-chapter-02.md` (Book Ch. 2) - [Relevant content]
[^3]: `IP-audit-and-updated-research-prompts.md` - [IP guidance]

---
```

---

### Phase 3: Handle IP Violations

**For lessons with 🚫 IP violations:**

Show complete replacement, not just modification:

```markdown
## Lesson [X]: [Original Title] → [New Title if changed]

**⚠️ IP VIOLATION DETECTED**

**Proprietary Framework:** [Name of trademarked/copyrighted framework]  
**Owner:** [Company/Individual]  
**Issue:** [Specific IP concern - teaching methodology, reproducing copyrighted materials, etc.]

---

### COMPLETE REPLACEMENT REQUIRED

**Strategy:** [Explain the replacement approach]
- Replace [proprietary] with [public domain alternative]
- Maintain same learning objectives
- Preserve pedagogical flow

---

#### BEFORE (Current - DO NOT USE)
```
[Show the problematic content for reference]
[Mark clearly as "DO NOT USE"]
```

#### AFTER (IP-Safe Replacement)
```
[Complete new lesson section using public domain concepts]
[Achieve same teaching goals without IP violation]
[Mark with ✅ IP SAFE badges]
```

#### MAPPING: How Concepts Transfer

| Proprietary Concept | Public Domain Replacement | Source |
|---------------------|---------------------------|--------|
| [Concept 1] | [Alternative 1] | [Research file] |
| [Concept 2] | [Alternative 2] | [Research file] |

#### LEARNING OBJECTIVES (Unchanged)
- [LO 1 - maintained despite framework change]
- [LO 2 - maintained despite framework change]

---

### LEGAL DISCLAIMER ADDITION

**Add to lesson footer:**
```markdown
---
**Framework Attribution Notice:** This lesson teaches publicly available concepts 
inspired by industry research. For information about [Proprietary Framework Name], 
consult [Owner]'s official materials. Our teaching approach uses original frameworks 
developed by SoloFrameHub.
```
---
```

---

### Phase 4: Track Additions & Deletions

**For each lesson, provide metrics:**

```markdown
## Lesson [X] Update Metrics

### Content Changes
- **Lines Added:** +XX
- **Lines Deleted:** -XX
- **Net Change:** +/-XX lines
- **Word Count:** Was XXX words → Now YYY words (+/-ZZZ)

### Structural Changes
- [ ] New section added: [Section name]
- [ ] Section removed: [Section name]
- [ ] Section reordered: [Description]
- [ ] Examples updated: [Count]
- [ ] Statistics refreshed: [Count]

### Research Integration
- **Research Files Referenced:** X
- **New Citations Added:** X
- **Frameworks Introduced:** [List]
- **Case Studies Added:** [List]

### IP Compliance
- **Proprietary Frameworks Removed:** X
- **Attributions Added:** X
- **Disclaimers Added:** X
- **Legal Review Required:** [Yes/No]
```

---

### Phase 5: Generate Course-Level Summary

**After all lesson diffs are generated:**

```markdown
# COURSE [X] UPDATE SUMMARY

## Overview
- **Course Name:** [Name]
- **Total Lessons:** X
- **Lessons Updated:** X
- **Total New Content:** +X,XXX words
- **Estimated Integration Time:** XX-XX hours

## Priority Breakdown
- 🔴 Deep Updates: X lessons
- 🟡 Moderate Updates: X lessons
- 🟢 Light Updates: X lessons
- ✅ No Updates: X lessons

## IP Compliance Status
- 🚫 Violations Resolved: X
- ⚠️ Attributions Added: X
- ✅ Fully Compliant: [Yes/No]

## Research Integration
**Research Files Used:**
1. `Research_filename_1.md` - Applied to Lessons X, Y, Z
2. `Research_filename_2.md` - Applied to Lessons A, B
3. ...

## Next Steps for Mike

### ✅ READY TO APPLY (Low Risk)
These updates can be applied immediately:
- Lesson X: [Brief description] (🟢 Light, 1h)
- Lesson Y: [Brief description] (🟢 Light, 1h)

### 🔍 REVIEW RECOMMENDED (Moderate Risk)
These updates should be reviewed before applying:
- Lesson X: [Brief description] (🟡 Moderate, 3h)
- Lesson Y: [Brief description] (🟡 Moderate, 2h)

### ⚠️ CAREFUL REVIEW REQUIRED (High Risk)
These updates involve IP replacements or major rewrites:
- Lesson X: [Brief description] (🔴 Deep, 6h) - IP violation fix
- Lesson Y: [Brief description] (🔴 Deep, 5h) - Major framework change

## Approval Checklist

Before applying these updates, verify:
- [ ] All IP violations properly addressed
- [ ] Research citations are accurate
- [ ] New statistics have sources
- [ ] Examples are relevant to target audience (solo founders)
- [ ] Tone matches SoloFrameHub voice (practitioner, humble)
- [ ] No AI-sounding language ("game-changer," "unleash," etc.)
- [ ] Bootstrap constraints maintained (no expensive tools)
- [ ] Formatting consistent with existing lessons
```

---

## EXECUTION INSTRUCTIONS

**Step 1: Load Prerequisites**
```bash
view /mnt/user-data/outputs/CONTENT_INVENTORY_REPORT_2025-01-13.md
view /mnt/user-data/outputs/RESEARCH_GAP_ANALYSIS_2025-01-13.md
```

**Step 2: Select Target Course**
Based on Gap Analysis prioritization, choose one course to process

**Step 3: For Each Lesson Requiring Update**
1. Load current lesson file
2. Load relevant research files
3. Generate before/after diff
4. Add research citations
5. Flag IP issues
6. Calculate metrics

**Step 4: Create Course Summary**
Aggregate all lesson diffs with approval recommendations

**Step 5: Save Output**

---

## OUTPUT FILES

For each course processed, generate:

```
COURSE-[X]-DIFFS-2025-01-13.md
```

**File Structure:**
```markdown
# COURSE [X] UPDATE DIFFS: [Course Name]
## Generated: 2025-01-13

[Course-level summary]

---

## LESSON DIFFS

### Lesson 1: [Title]
[Complete diff as specified above]

### Lesson 2: [Title]
[Complete diff as specified above]

[Continue for all lessons]

---

## COURSE UPDATE SUMMARY
[As specified in Phase 5]

---

## APPENDIX: RESEARCH FILES USED
[Full list with file paths]
```

---

## DIFF FORMAT STANDARDS

**Use these conventions consistently:**

### For Additions
```diff
+ This is new content added
+ It appears with a + symbol at line start
+ Research citations marked with [^1]
```

### For Deletions
```diff
- This is content being removed
- It appears with a - symbol at line start
```

### For Modifications
```diff
- This is the old version
+ This is the new version replacing it
```

### For Context (Unchanged)
```
This content stays the same
It helps show where changes are happening
Include 2-3 lines of context above and below changes
```

### For Research Citations
```markdown
New content integrates research findings[^1] and updated statistics[^2].

[^1]: Research_filename.md (Section: Key Finding)
[^2]: 03-chapter-03.md (Case Study: Company X)
```

### For IP Compliance
```markdown
✅ IP SAFE: Public domain framework (DISC, 1928)
⚠️ IP REVIEW: Requires attribution (April Dunford)
🚫 IP VIOLATION: Replace proprietary framework (StoryBrand®)
```

---

## QUALITY STANDARDS

**Every diff must include:**
1. ✅ Clear before/after comparison
2. ✅ Specific research citations
3. ✅ IP compliance status
4. ✅ Rationale for changes
5. ✅ Effort estimate
6. ✅ Word count metrics
7. ✅ Approval recommendation

**Writing Quality:**
- Use Mike's practitioner voice (humble, experience-based)
- Avoid AI-sounding phrases
- Include concrete examples
- Maintain bootstrap philosophy
- Technical founder perspective

**Research Integration:**
- Every new statistic needs a source
- Every new framework needs research backing
- Prefer primary sources over aggregators
- Recent research (2024-2025) over older

---

## SUCCESS CRITERIA

✅ Complete diffs generated for target course  
✅ All IP violations addressed with safe alternatives  
✅ Research properly cited with file references  
✅ Before/after clearly distinguishable  
✅ Metrics calculated for each lesson  
✅ Approval recommendations provided  
✅ Ready for Mike's review and implementation

---

## NOTES FOR CLAUDE CODE

- **Process ONE COURSE at a time** - Don't try to do all courses in one run
- Use `view` tool to read current lesson files
- Use `view` tool to reference research files
- Be precise with diffs - show exact line-level changes
- Include sufficient context (2-3 lines) around changes
- Mark IP issues prominently
- Provide realistic effort estimates
- Generate output that Mike can review and approve section-by-section

**Estimated tokens:** ~50K-100K per course (depends on update complexity)  
**Estimated time:** 15-25 minutes per course

---

## ITERATIVE USAGE

**After completing Course X, repeat for next priority course:**

1. ✅ Course 2 (IP violations)
2. ✅ Course 0 (Sales Psychology)
3. ✅ Course 1 (ICP Builder)
4. ✅ Course 6 (SEO/AEO)
5. ✅ Course 7 (LinkedIn)
6. ... continue based on Gap Analysis priority

**Track progress:**
```markdown
## Diff Generation Progress

- [✅] Course 2: Position & Value Prop (2025-01-13) - 6 lessons updated
- [✅] Course 0: Sales Psychology (2025-01-14) - 8 lessons updated
- [ ] Course 1: ICP Builder (pending)
- [ ] Course 6: SEO/AEO (pending)
...
```

---

## NEXT STEP AFTER DIFFS

Once Mike approves a course's diffs, use the standard `str_replace` tool to apply changes:

```bash
# Example: Apply approved change to lesson file
str_replace \
  --description="Update Course 0, Lesson 1: Add avoidance patterns and updated stats" \
  --path="/path/to/lesson-01.md" \
  --old_str="[exact old text from BEFORE section]" \
  --new_str="[exact new text from AFTER section]"
```

**Mike can then test in Antigravity and verify updates work correctly.**
