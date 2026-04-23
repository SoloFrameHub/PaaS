# PROMPT 1: COURSE CONTENT DISCOVERY & MAPPING

**Purpose:** Scan the SoloFrameHub codebase to identify all existing lesson files, map them to research findings, and generate a comprehensive content inventory.

**Target Tool:** Claude Code / Antigravity  
**Expected Output:** Markdown report with file locations, content summaries, and research mapping  
**Estimated Time:** 10-15 minutes

---

## CONTEXT

You are working on the **SoloFrameHub Customer Acquisition Academy**, which has:
- **42 total courses** across 6 tracks (updated from 36)
- **~20 courses in production** with existing lesson content
- **~22 courses** as future placeholders
- **~30 research files** covering 14 research areas
- **Existing content:** ~35 lesson files totaling ~16,000 words across 3 complete courses

The goal is to integrate research findings into existing lessons while avoiding IP/copyright violations.

---

## YOUR TASK

### Phase 1: Discover All Lesson Content Files

**Search these directories:**
```
/content/lessons/
/src/content/
/lessons/
/courses/
/data/lessons/
```

**Identify files matching these patterns:**
- `*.md` (Markdown lesson files)
- `*lesson*.js` / `*lesson*.ts` (TypeScript/JavaScript lesson data)
- Course prompt packages: `Course_*_*.md`
- Lesson manifests or indexes

**For each file found, capture:**
1. File path
2. File size (KB)
3. Course number and name
4. Lesson number and title
5. Primary topics covered
6. Word count (estimate)
7. Last modified date

**Output Format:**
```markdown
## Production Lesson Files Inventory

### Course 0: Solo Founder Sales Psychology (8 lessons)
- **Status:** [Complete/Partial/Placeholder]
- **Location:** `/path/to/files/`
- **Total Words:** ~X,XXX

| Lesson | File | Topics | Words | Modified |
|--------|------|--------|-------|----------|
| 1 | lesson-01-brain-sabotage.md | cognitive bias, negativity bias | 1,200 | 2024-12-20 |
| 2 | ... | ... | ... | ... |

[Repeat for all courses 0-20]
```

---

### Phase 2: Map Lesson Topics to Research Files

**Research files are located in `/mnt/project/` with these patterns:**
- `Research_*.md` (14+ research reports)
- `*_research.md`
- Research sections in book chapters: `01-chapter-01.md` through `16-chapter-16.md`
- IP audit: `IP-audit-and-updated-research-prompts.md`

**Create a mapping table:**

```markdown
## Lesson-to-Research Mapping

| Course | Lesson | Primary Topics | Relevant Research Files |
|--------|--------|----------------|-------------------------|
| 0 | 1 | cognitive bias, sales resistance | `Research_the_psychology_of_why_solo_founders__both.md`, `01-chapter-01.md` (Intro) |
| 1 | 3 | ICP, psychographics | `customer-acquisition-book-research.md`, `02-chapter-02.md` |
| 2 | 5 | DISC personalities | `Research_DISC_behavioral_assessment_applications_f.md` |
| 3 | 7 | BANT, MEDDIC | `Research_discovery_and_qualification_frameworks_fo.md` |
| ... | ... | ... | ... |
```

---

### Phase 3: Identify Content Gaps

**For courses 0-20, identify:**
1. **Complete courses** - All lessons exist with substantial content (1000+ words/lesson)
2. **Partial courses** - Some lessons exist, others are placeholders
3. **Placeholder courses** - Listed in curriculum but no content files found
4. **Orphaned files** - Content files that don't match current curriculum structure

**Output:**
```markdown
## Content Gap Analysis

### Complete Courses (Ready for Research Integration)
- Course 1: ICP Builder Workshop (12 lessons, ~5,400 words)
- Course 3: Discovery Framework (14 lessons, ~6,000 words)
- Course X: Demo Architecture (9 lessons, ~4,500 words)

**Total Complete:** X courses, XX lessons, ~XX,XXX words

### Partial Courses (Need Completion Before Integration)
- Course X: [Name] - X of Y lessons complete
  - Missing: Lessons X, Y, Z

### Placeholder Courses (Future Development)
- Course X: [Name] - No content files found
- Course Y: [Name] - Only outline exists

### Orphaned Content (Needs Reconciliation)
- File: `/path/to/orphan.md` - Doesn't match current curriculum
```

---

### Phase 4: IP Risk Flagging

**Cross-reference lessons against the IP audit findings:**

Reference: `/mnt/project/IP-audit-and-updated-research-prompts.md`

**Flag any lessons that:**
1. Teach proprietary frameworks (SPIN®, StoryBrand®, Challenger Sale®, Sandler®)
2. Use trademarked terminology without attribution
3. Reproduce copyrighted materials
4. Need IP disclaimers (legal, financial, tax advice)

**Output:**
```markdown
## IP Risk Flags

### 🔴 HIGH RISK - Immediate Attention Required
- Course X, Lesson Y: "StoryBrand Messaging Framework"
  - **Issue:** Teaching proprietary SB7 framework
  - **Action:** Replace with generic storytelling principles

### 🟡 MODERATE RISK - Review Recommended  
- Course X, Lesson Y: References SPIN Selling
  - **Issue:** Mentions SPIN by name
  - **Action:** Reframe as "consultative questioning techniques"

### 🟢 LOW RISK - Safe to Proceed
- Course X: All content uses public domain frameworks
```

---

### Phase 5: Generate Summary Report

**Create a final summary with:**
1. Total lesson files discovered
2. Word count by course and total
3. Research coverage map
4. Content readiness score (% complete)
5. IP risk assessment summary
6. Recommended prioritization for integration

---

## EXECUTION INSTRUCTIONS

**Step 1:** Start by searching for lesson content files
```bash
find /path/to/codebase -name "*.md" -path "*lesson*"
find /path/to/codebase -name "*course*.md"
find /path/to/codebase -name "*curriculum*.js"
```

**Step 2:** For each file found, read and analyze:
- Extract course/lesson identifiers
- Count words
- Identify main topics
- Note last modified date

**Step 3:** Search for research files:
```bash
find /mnt/project -name "Research_*.md"
find /mnt/project -name "*-chapter-*.md"
```

**Step 4:** Create the mapping table by matching topics

**Step 5:** Cross-reference with IP audit file

**Step 6:** Generate the comprehensive report

---

## OUTPUT FILE

Save the complete report as:
```
CONTENT_INVENTORY_REPORT_2025-01-13.md
```

**Include these sections:**
1. Executive Summary
2. Production Lesson Files Inventory (Courses 0-20)
3. Lesson-to-Research Mapping
4. Content Gap Analysis
5. IP Risk Flags
6. Research Coverage Matrix
7. Recommended Prioritization

---

## SUCCESS CRITERIA

✅ All lesson files discovered and catalogued  
✅ Research files mapped to relevant lessons  
✅ IP risks identified and flagged  
✅ Content gaps clearly documented  
✅ Prioritization recommendations provided  
✅ Report ready for Phase 2 (Gap Analysis)

---

## NOTES FOR CLAUDE CODE

- Use `view` tool to read file contents
- Use `bash_tool` to search for files
- Create comprehensive markdown tables
- Be thorough - this report drives all subsequent work
- If you find conflicting information (e.g., curriculum says 12 lessons but only 10 files exist), flag it clearly

**Estimated tokens:** ~50K-75K for full discovery and mapping
**Estimated time:** 10-15 minutes with thorough search

---

## NEXT STEP

After completing this discovery phase, the output will feed into:
- **PROMPT 2: Research Gap Analysis** (identifies what needs updating)
- **PROMPT 3: Diff Generation** (creates before/after comparisons)
