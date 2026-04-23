# RESEARCH INTEGRATION MASTER WORKFLOW

**Project:** SoloFrameHub Customer Acquisition Academy  
**Purpose:** Integrate 30+ research files into existing course content  
**Target:** 20 production courses (0-20) + 22 future courses (21-42)  
**Priority:** Production courses first, avoiding IP violations  
**Date:** 2025-01-13

---

## OVERVIEW

This workflow systematically integrates research findings into the Customer Acquisition Academy using a three-phase sequential analysis approach designed for Claude Code / Antigravity.

### The Three Phases

```
PHASE 1: Discovery & Mapping (10-15 min)
   ↓ [Outputs: Content inventory + Research mapping]
   
PHASE 2: Gap Analysis (20-30 min)  
   ↓ [Outputs: Prioritized update recommendations]
   
PHASE 3: Diff Generation (15-25 min per course)
   ↓ [Outputs: Reviewable before/after comparisons]
   
PHASE 4: Review & Apply (Mike)
   ↓ [Mike approves changes, Claude applies via str_replace]
   
PHASE 5: Testing & Validation (Mike + Antigravity)
```

---

## PROMPT FILES

| Phase | Prompt File | Purpose | Time | Output |
|-------|-------------|---------|------|--------|
| 1 | `PROMPT-1-Content-Discovery-Mapping.md` | Find all lesson files and map to research | 10-15m | `CONTENT_INVENTORY_REPORT_2025-01-13.md` |
| 2 | `PROMPT-2-Research-Gap-Analysis.md` | Identify gaps and prioritize updates | 20-30m | `RESEARCH_GAP_ANALYSIS_2025-01-13.md` |
| 3 | `PROMPT-3-Diff-Generation-Per-Course.md` | Generate reviewable diffs per course | 15-25m | `COURSE-[X]-DIFFS-2025-01-13.md` |

**Total Estimated Time:** 
- Phase 1-2: ~45 minutes (one-time setup)
- Phase 3: 15-25 minutes × 20 courses = ~6-8 hours (spread over time)

---

## EXECUTION PLAN

### Week 1: Discovery & Critical Fixes (Jan 13-19)

**Day 1 (Monday): Phase 1 - Discovery**
```bash
# Run in Claude Code / Antigravity
1. Load PROMPT-1-Content-Discovery-Mapping.md
2. Execute discovery across codebase
3. Generate CONTENT_INVENTORY_REPORT_2025-01-13.md
4. Review output, validate findings
```

**Day 2 (Tuesday): Phase 2 - Gap Analysis**
```bash
# Run in Claude Code / Antigravity  
1. Load PROMPT-2-Research-Gap-Analysis.md
2. Execute gap analysis using inventory report
3. Generate RESEARCH_GAP_ANALYSIS_2025-01-13.md
4. Review priorities and effort estimates
```

**Day 3-4 (Wed-Thu): Phase 3 - Critical IP Fixes**
```bash
# Run in Claude Code / Antigravity
# Focus on courses with IP violations first

1. Load PROMPT-3-Diff-Generation-Per-Course.md
2. Generate diffs for Course 2 (StoryBrand violation)
3. Generate diffs for Course X (SPIN violation if exists)
4. Review and approve critical fixes
5. Apply approved changes via str_replace
6. Test updated lessons in Antigravity
```

**Day 5 (Friday): Validation & Fixes**
```bash
# Test critical updates
1. Review IP-safe content in production
2. Verify no copyright violations
3. Test AI coaching with updated content
4. Fix any issues discovered
```

---

### Week 2-3: High-Value Updates (Jan 20 - Feb 2)

**Priority Sequence (from Gap Analysis):**

1. **Course 0: Sales Psychology** (🟡 10-15h estimated)
   - High value for launch positioning
   - Sets tone for entire academy
   - Updates resistance psychology with research

2. **Course 1: ICP Builder Workshop** (🟡 14-20h estimated)
   - Core foundational course
   - Already strong, research enhances
   - Creator economy examples added

3. **Course 6: SEO/AEO** (🟡 8-12h estimated)
   - Rapidly changing field
   - 2025 updates critical
   - Zero-click search landscape

4. **Course 7: LinkedIn** (🟡 6-10h estimated)
   - Trust Pincer strategy
   - PAIPS content formula
   - 2025 algorithm updates

5. **Course 8: Cold Email** (🟢 4-6h estimated)
   - Compliance updates
   - Deliverability tactics
   - Light refresh

**Workflow per course:**
```bash
# For each course above:
1. Generate diffs using Prompt 3
2. Mike reviews COURSE-[X]-DIFFS file
3. Mike approves changes (mark ✅ or request revisions)
4. Claude applies approved changes
5. Mike tests in Antigravity
6. Move to next course
```

---

### Week 4: Light Refreshes & Future Courses (Feb 3-9)

**Remaining Updates:**
- All 🟢 Light updates across courses 0-20
- Quick wins: statistics updates, example additions
- Total: ~15-20 hours estimated

**Future Course Planning:**
- Review courses 21-42 outline
- Determine which need immediate content creation
- Apply same workflow when ready to build

---

## DETAILED WORKFLOW PER PHASE

### PHASE 1: Discovery & Mapping (One-Time)

**Goal:** Understand what content exists and how it maps to research

**Steps:**
1. **Launch Claude Code** with PROMPT-1-Content-Discovery-Mapping.md
2. **Let Claude scan** the entire codebase for lesson files
3. **Review the inventory report:**
   - Which courses have complete content?
   - Which are placeholders?
   - Which research files apply to which lessons?
4. **Validate findings** - Spot-check 3-5 files to ensure accuracy
5. **Save report** for use in Phase 2

**Success Criteria:**
- ✅ All lesson files discovered
- ✅ Research mapping complete
- ✅ No orphaned content
- ✅ Clear picture of what exists

**Common Issues:**
- Files in unexpected locations → Add search paths
- Inconsistent naming → Note for standardization
- Missing content → Flag for future development

---

### PHASE 2: Gap Analysis (One-Time)

**Goal:** Identify exactly what needs updating and prioritize the work

**Steps:**
1. **Launch Claude Code** with PROMPT-2-Research-Gap-Analysis.md
2. **Ensure Phase 1 report is loaded** (CONTENT_INVENTORY_REPORT)
3. **Let Claude analyze** each lesson against research files
4. **Review the gap report:**
   - How many Deep/Moderate/Light updates?
   - What's the total estimated effort?
   - Which courses should go first?
   - Any IP violations flagged?
5. **Adjust priorities** based on business needs (launch timeline, etc.)
6. **Create execution plan** for Phase 3

**Success Criteria:**
- ✅ Every production lesson classified (Deep/Moderate/Light/None)
- ✅ IP violations identified
- ✅ Effort estimates realistic
- ✅ Prioritization sequence clear

**Decision Point:**
**If total effort is 60-80 hours:**
- ✅ Proceed with phased approach (Weeks 1-4 plan above)

**If total effort is 100+ hours:**
- 🔍 Consider reducing scope
- 🔍 Defer some courses to post-launch
- 🔍 Focus only on IP-critical and high-value updates

---

### PHASE 3: Diff Generation (Per Course, Iterative)

**Goal:** Create reviewable before/after comparisons for one course at a time

**Steps:**
1. **Select target course** from Gap Analysis priorities
2. **Launch Claude Code** with PROMPT-3-Diff-Generation-Per-Course.md
3. **Specify which course** to process
4. **Let Claude generate diffs** for all lessons in that course
5. **Review the COURSE-[X]-DIFFS file:**
   - Do before/after sections make sense?
   - Are research citations accurate?
   - Are IP replacements appropriate?
   - Is the tone correct (Mike's voice)?
6. **Approve, revise, or reject** each lesson diff
7. **Mark approved changes** with ✅ in the diff file

**Success Criteria (Per Course):**
- ✅ All lesson diffs generated
- ✅ Research properly cited
- ✅ IP compliance verified
- ✅ Mike has reviewed and approved
- ✅ Ready for Phase 4 (Apply Changes)

**Iterative Process:**
```
Course 2 (IP-critical) → Review → Apply → Test
   ↓
Course 0 (High-value) → Review → Apply → Test
   ↓
Course 1 (High-value) → Review → Apply → Test
   ↓
... continue based on priority
```

---

### PHASE 4: Review & Apply (Mike-Led)

**Goal:** Apply approved changes to actual lesson files

**Mike's Workflow:**
1. **Review COURSE-[X]-DIFFS file** carefully
2. **For each approved lesson:**
   ```bash
   # Copy exact text from AFTER section in diff
   # Use str_replace tool in Claude Code
   
   str_replace \
     --description="Course 0, Lesson 1: Add avoidance patterns research" \
     --path="/path/to/course-0/lesson-01-brain-sabotage.md" \
     --old_str="[exact text from BEFORE section]" \
     --new_str="[exact text from AFTER section]"
   ```
3. **Verify file was updated** correctly
4. **Commit changes** to version control
5. **Move to next lesson**

**Tips:**
- Apply changes one lesson at a time
- Test after every 3-5 lesson updates
- Keep diff file open for reference
- Mark completed lessons with ✅ in diff file

**If issues arise:**
- Revert the change
- Request revision from Claude
- Regenerate that specific lesson diff

---

### PHASE 5: Testing & Validation (Mike + Antigravity)

**Goal:** Ensure updated content works correctly in production platform

**Testing Checklist (Per Course):**
```markdown
## Course [X] Testing

### Content Rendering
- [ ] All lessons load without errors
- [ ] Markdown renders correctly
- [ ] Images/diagrams display properly
- [ ] Links work (internal and external)
- [ ] Research citations formatted correctly

### Platform Integration  
- [ ] AI coaching prompts reference updated content
- [ ] Framework tools still work (ICP Builder, etc.)
- [ ] Quizzes/assessments updated if needed
- [ ] Progress tracking works
- [ ] XP points awarded correctly

### Content Quality
- [ ] Tone matches Mike's voice (not AI-generic)
- [ ] Examples relevant to solo founders
- [ ] No expensive tool recommendations
- [ ] Bootstrap philosophy maintained
- [ ] Technical founder perspective clear

### IP Compliance (Critical)
- [ ] No proprietary frameworks taught
- [ ] Proper attributions where required
- [ ] Disclaimers added (legal, financial, tax)
- [ ] No copyright violations

### Research Integration
- [ ] Statistics are accurate and sourced
- [ ] New frameworks properly introduced
- [ ] Case studies feel authentic
- [ ] Research citations don't break flow

### User Experience
- [ ] Reading level appropriate (8-10th grade)
- [ ] Lesson length reasonable (45-60 min)
- [ ] Practice exercises actionable
- [ ] Learning objectives achieved
```

**Testing Frequency:**
- After every 3-5 lesson updates
- After completing each full course
- Before marking course as "production ready"

**Issue Tracking:**
```markdown
## Issues Found During Testing

### Course 0, Lesson 3
- **Issue:** AI coaching prompt references old framework
- **Fix:** Update prompt in AI flows configuration
- **Status:** ✅ Fixed

### Course 1, Lesson 7  
- **Issue:** Broken link to research source
- **Fix:** Update URL to archived version
- **Status:** ✅ Fixed
```

---

## PROGRESS TRACKING

### Master Checklist

**Phase 1: Discovery (One-Time)**
- [ ] Run PROMPT-1-Content-Discovery-Mapping.md
- [ ] Review CONTENT_INVENTORY_REPORT_2025-01-13.md
- [ ] Validate findings with spot checks
- [ ] ✅ Phase 1 Complete

**Phase 2: Gap Analysis (One-Time)**
- [ ] Run PROMPT-2-Research-Gap-Analysis.md  
- [ ] Review RESEARCH_GAP_ANALYSIS_2025-01-13.md
- [ ] Adjust priorities based on timeline
- [ ] Create execution sequence
- [ ] ✅ Phase 2 Complete

**Phase 3-5: Per-Course Updates (Iterative)**

| Course | Priority | Diffs | Review | Apply | Test | Status |
|--------|----------|-------|--------|-------|------|--------|
| 2 | 🔴 Critical (IP) | [ ] | [ ] | [ ] | [ ] | Pending |
| 0 | 🟡 High-Value | [ ] | [ ] | [ ] | [ ] | Pending |
| 1 | 🟡 High-Value | [ ] | [ ] | [ ] | [ ] | Pending |
| 6 | 🟡 High-Value | [ ] | [ ] | [ ] | [ ] | Pending |
| 7 | 🟡 High-Value | [ ] | [ ] | [ ] | [ ] | Pending |
| 8 | 🟢 Light | [ ] | [ ] | [ ] | [ ] | Pending |
| 3 | 🟢 Light | [ ] | [ ] | [ ] | [ ] | Pending |
| 4 | 🟢 Light | [ ] | [ ] | [ ] | [ ] | Pending |
| ... | ... | ... | ... | ... | ... | ... |

**Update this table as you progress through courses.**

---

## EFFORT ESTIMATION

Based on Gap Analysis, expect:

```markdown
## Estimated Total Effort (20 Production Courses)

### By Priority
- 🔴 Critical IP Fixes: 7-10 hours (Week 1)
- 🟡 High-Value Updates: 38-57 hours (Weeks 2-3)
- 🟢 Light Refreshes: 15-20 hours (Week 4)

**TOTAL:** 60-87 hours

### By Activity
- Phase 1: Discovery: ~15 minutes (one-time)
- Phase 2: Gap Analysis: ~30 minutes (one-time)
- Phase 3: Diff Generation: ~6-8 hours (20 courses × 15-25 min)
- Phase 4: Review & Apply: ~25-35 hours (manual work)
- Phase 5: Testing: ~20-30 hours (validation)

### By Week (Recommended Pace)
- Week 1 (Jan 13-19): IP fixes + setup (10-15h)
- Week 2 (Jan 20-26): Course 0, 1 updates (20-30h)
- Week 3 (Jan 27-Feb 2): Course 6, 7, 8 updates (18-28h)
- Week 4 (Feb 3-9): Light refreshes + final testing (15-20h)

**TOTAL: 63-93 hours over 4 weeks**
```

**Sustainability Note:** This is ~16-23 hours/week, sustainable alongside other launch prep activities.

---

## SUCCESS METRICS

### Content Quality Metrics
- ✅ 100% of IP violations resolved
- ✅ 100% of research citations accurate
- ✅ 95%+ of updated content maintains Mike's voice
- ✅ 100% of lessons pass platform integration testing
- ✅ 0 copyright/trademark violations

### Business Impact Metrics
- ✅ Course completion rates maintained or improved
- ✅ User satisfaction with updated content (survey post-launch)
- ✅ AI coaching quality improved with updated context
- ✅ Launch timeline met (Jan 21, 2026)

### Process Metrics
- ✅ Actual effort vs estimated within 20%
- ✅ No major rework required
- ✅ Testing issues <5% of updates
- ✅ Mike's review/approve cycle <24 hours per course

---

## RISK MITIGATION

### Risk 1: Content Doesn't Match Mike's Voice
**Mitigation:**
- Use voice guidelines in diff generation
- Mike reviews all diffs before applying
- Spot-check AI-sounding phrases
- Rewrite if needed

### Risk 2: IP Violations Missed
**Mitigation:**
- IP audit file referenced in every phase
- Flag any uncertain frameworks for review
- Legal disclaimer added where needed
- Conservative approach (when in doubt, don't use)

### Risk 3: Research Citations Inaccurate
**Mitigation:**
- Direct quotes from research files only
- Link to source files in citations
- Mike spot-checks 10-20% of citations
- Corrections made immediately if found

### Risk 4: Updates Break Platform Features
**Mitigation:**
- Test after every 3-5 lesson updates
- Keep previous version in git
- Easy rollback if issues found
- Systematic testing checklist used

### Risk 5: Effort Exceeds Timeline
**Mitigation:**
- Start with highest priority (IP fixes)
- Can defer light refreshes to post-launch
- Focus on courses 0-10 first (core content)
- Parallel work: diff generation while testing

---

## COMMUNICATION PLAN

### Internal (Mike + AI Assistants)

**Daily Standups (Async):**
```markdown
## Update: [Date]
- **Completed Today:** [Course X diffs generated, Course Y applied]
- **Testing Results:** [Issues found, fixes applied]
- **Tomorrow's Plan:** [Course Z diffs, testing Course Y]
- **Blockers:** [None / Issue with research file X]
```

**Weekly Summaries:**
```markdown
## Week [X] Summary: [Date Range]
- **Courses Updated:** X/20 complete
- **Hours Invested:** XX hours (on track / behind / ahead)
- **Issues Resolved:** X issues
- **Next Week Focus:** [Priority courses]
```

### External (If Relevant)

**For Beta Testers:**
- "We're enhancing course content with latest research"
- "Updates rolling out over next 2-3 weeks"
- "Your feedback has shaped these improvements"

**For Launch Marketing:**
- "Research-backed curriculum" positioning
- "Updated for 2025 market conditions"
- Highlight specific research integrations (SEO/AEO, LinkedIn, etc.)

---

## TOOLS & RESOURCES

### Required Tools
- **Claude Code / Antigravity:** Primary execution environment
- **Git:** Version control for all changes
- **Markdown Editor:** For reviewing diffs (VS Code recommended)
- **Project Files:** All 30+ research files in `/mnt/project/`

### Reference Documents
- `Customer_Acquisition_Academy_Complete_Outline.md` - Course structure
- `IP-audit-and-updated-research-prompts.md` - IP compliance guidance
- `customer-acquisition-book-research.md` - Competitive positioning
- All `Research_*.md` files - Updated findings

### Templates & Standards
- `07-PEDAGOGICAL-PATTERNS.md` - Lesson structure
- `09-CONTENT-GENERATION.md` - Content creation guidelines
- Voice guidelines (Mike's practitioner tone)
- Research citation format

---

## GETTING STARTED

### Right Now (5 minutes)
1. ✅ Read this master workflow document
2. ✅ Ensure you have access to Claude Code / Antigravity
3. ✅ Verify all research files are in `/mnt/project/`
4. ✅ Open PROMPT-1-Content-Discovery-Mapping.md

### Today (30-45 minutes)
1. Run Phase 1: Discovery
2. Review inventory report
3. Run Phase 2: Gap Analysis  
4. Review prioritization

### This Week (10-15 hours)
1. Generate diffs for Course 2 (IP-critical)
2. Review and approve critical fixes
3. Apply changes to Course 2
4. Test updated Course 2
5. Mark Course 2 as ✅ Complete

### Next 3 Weeks (50-75 hours)
1. Work through priority courses (0, 1, 6, 7)
2. Apply light refreshes to remaining courses
3. Complete testing for all updates
4. Prepare for January 21 launch

---

## SUPPORT & QUESTIONS

**If you encounter issues:**

1. **Technical Issues (Claude Code):**
   - Check prompt syntax
   - Verify file paths
   - Review error messages
   - Try breaking task into smaller steps

2. **Content Issues (Voice, Tone):**
   - Reference voice guidelines
   - Compare to existing strong lessons
   - Ask Mike for examples
   - Regenerate with better prompts

3. **IP Issues (Uncertain Framework):**
   - Check IP audit file first
   - When in doubt, don't use
   - Consider public domain alternatives
   - Add attribution if unsure

4. **Research Issues (Can't Find Source):**
   - Search project files
   - Check book chapters
   - Look for related research files
   - Flag for Mike if truly missing

**Document all issues and resolutions** for future reference.

---

## NEXT ACTIONS

✅ **NOW:** Run PROMPT-1-Content-Discovery-Mapping.md  
⏭️ **NEXT:** Review inventory report, run PROMPT-2  
📋 **THEN:** Generate diffs for Course 2 (IP-critical)  
🚀 **GOAL:** All 20 production courses updated by Feb 9, 2025

---

**Last Updated:** 2025-01-13  
**Version:** 1.0  
**Owner:** Mike Sullivan  
**Status:** Ready to Execute
