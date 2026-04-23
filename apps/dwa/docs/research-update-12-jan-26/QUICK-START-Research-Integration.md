# QUICK START: Research Integration

**Goal:** Integrate 30+ research files into Customer Acquisition Academy lessons  
**Method:** 3-phase sequential workflow via Claude Code/Antigravity  
**Timeline:** 4 weeks (60-90 hours total)  
**Start Date:** 2025-01-13

---

## 🚀 START HERE (Next 5 Minutes)

### Step 1: Verify Prerequisites
```bash
# Check these exist:
✅ Claude Code or Antigravity access
✅ Project files in /mnt/project/ (30+ research files)
✅ Git repository for version control
✅ 4 prompt files downloaded:
   - RESEARCH-INTEGRATION-MASTER-WORKFLOW.md (this system)
   - PROMPT-1-Content-Discovery-Mapping.md
   - PROMPT-2-Research-Gap-Analysis.md  
   - PROMPT-3-Diff-Generation-Per-Course.md
```

### Step 2: Launch Claude Code
Open your coding environment with Claude assistance

### Step 3: Run First Prompt
Copy and paste **PROMPT-1-Content-Discovery-Mapping.md** into Claude Code

**What it does:**
- Scans codebase for all lesson files
- Maps lessons to research files
- Identifies content gaps and IP risks
- Generates inventory report

**Time:** 10-15 minutes  
**Output:** `CONTENT_INVENTORY_REPORT_2025-01-13.md`

---

## 📋 TODAY'S CHECKLIST (45 Minutes Total)

### ☐ Phase 1: Discovery (15 min)
```markdown
1. [ ] Run PROMPT-1 in Claude Code
2. [ ] Wait for CONTENT_INVENTORY_REPORT
3. [ ] Spot-check 3-5 files to verify accuracy
4. [ ] Save report for next phase
```

### ☐ Phase 2: Gap Analysis (30 min)
```markdown
1. [ ] Run PROMPT-2 in Claude Code  
2. [ ] Wait for RESEARCH_GAP_ANALYSIS_2025-01-13.md
3. [ ] Review priorities:
   - How many IP violations? (CRITICAL)
   - Which courses need Deep updates?
   - Total effort estimate reasonable?
4. [ ] Decide on execution sequence
```

**STOP POINT:** Review both reports before proceeding to Phase 3

---

## 📊 EXPECTED OUTCOMES (After Today)

You will know:
- ✅ Exactly which lesson files exist (and which don't)
- ✅ Which lessons need updates (Deep/Moderate/Light)
- ✅ Which lessons have IP violations (MUST FIX FIRST)
- ✅ Total estimated effort (likely 60-90 hours)
- ✅ Recommended sequence for updates

---

## 🎯 THIS WEEK (10-15 Hours)

### Priority 1: Fix IP Violations 🔴
**Timeline:** Days 1-2 (7-10 hours)

**Likely Culprits (Based on IP Audit):**
- Course 2, Lesson: "StoryBrand Messaging Framework"
- Any lesson teaching SPIN® Selling methodology
- Any Sandler System references

**Action:**
1. Run PROMPT-3 for courses with IP violations
2. Review generated diffs
3. Apply IP-safe replacements
4. Test immediately
5. Mark as ✅ CRITICAL FIXED

### Priority 2: High-Value Course Updates 🟡  
**Timeline:** Days 3-5 (3-5 hours)

Start with **Course 0: Sales Psychology**
- High impact for launch positioning
- Sets tone for entire academy
- Moderate updates (~3-5 hours)

**Action:**
1. Run PROMPT-3 for Course 0
2. Review COURSE-0-DIFFS-2025-01-13.md
3. Approve changes
4. Apply via str_replace
5. Test in Antigravity
6. Mark as ✅ COMPLETE

---

## 🗓️ 4-WEEK ROADMAP

### Week 1 (Jan 13-19): IP Fixes + Discovery
- **Mon:** Run Phase 1 & 2 (setup)
- **Tue-Wed:** Fix IP violations (Course 2, etc.)
- **Thu-Fri:** Update Course 0 (Sales Psychology)
- **Hours:** 10-15

### Week 2 (Jan 20-26): Core Courses
- **Mon-Tue:** Course 1 (ICP Builder)
- **Wed-Thu:** Course 6 (SEO/AEO)
- **Fri:** Course 7 (LinkedIn)
- **Hours:** 20-30

### Week 3 (Jan 27-Feb 2): Remaining Updates
- **Mon-Tue:** Course 8 (Cold Email)
- **Wed-Thu:** Courses 3, 4, 5
- **Fri:** Courses 9, 10, 11
- **Hours:** 18-28

### Week 4 (Feb 3-9): Light Refreshes + Testing
- **Mon-Wed:** All remaining 🟢 Light updates
- **Thu-Fri:** Final testing and validation
- **Hours:** 15-20

**TOTAL:** 63-93 hours over 4 weeks (~16-23 hours/week)

---

## 🛠️ TOOLS YOU'LL USE

### Claude Code / Antigravity
**For:**
- Running all 3 prompts
- Generating diffs
- Applying changes via str_replace

### Git
**For:**
- Version control
- Rollback if needed
- Tracking changes

### Markdown Editor (VS Code)
**For:**
- Reviewing diff files
- Approving/rejecting changes
- Making notes

---

## 📝 TEMPLATE: Daily Progress Note

Copy this each day:

```markdown
## Research Integration Update: [Date]

### Completed Today
- [ ] Prompt: [Which prompt run]
- [ ] Course: [Which course updated]
- [ ] Lessons: [How many updated]
- [ ] Testing: [Issues found/fixed]

### Hours Invested
- Diff Generation: X hours
- Review & Approve: X hours
- Apply Changes: X hours
- Testing: X hours
**Total:** X hours

### Issues Encountered
- [Issue 1]: [Resolution]
- [Issue 2]: [Resolution]

### Tomorrow's Plan
- [ ] [Next course to update]
- [ ] [Testing activities]

### Week Progress
- Courses Complete: X/20
- Total Hours: XX/93
- On Track: [Yes/No/Need to Adjust]
```

---

## ⚠️ CRITICAL REMINDERS

### IP Compliance (Non-Negotiable)
```
🚫 NEVER teach these proprietary frameworks:
   - StoryBrand® SB7 Framework
   - SPIN® Selling methodology
   - Sandler® Selling System
   - Challenger Sale® (Gartner)

✅ SAFE to teach (public domain):
   - DISC (Marston, 1928)
   - BANT, MEDDIC, MEDDPICC
   - AIDA, PAS, FAB (copywriting)
   - Hero's Journey (Joseph Campbell)

⚠️ CAN REFERENCE (with attribution):
   - April Dunford's positioning concepts
   - Justin Welsh's PAIPS framework
```

### Mike's Voice Guidelines
```
✅ DO use:
   - "In my experience..." 
   - "What I learned..."
   - Humble practitioner perspective
   - Concrete examples

❌ DON'T use:
   - "Game-changer"
   - "Unleash"
   - "Revolutionary"
   - AI-sounding flourishes
   - Excessive bullet points
```

### Bootstrap Philosophy
```
✅ Recommend:
   - $0-150/month tools
   - Time-efficient strategies
   - Solo founder appropriate
   - Systematic frameworks

❌ Avoid:
   - Enterprise tools (>$500/mo)
   - Team-dependent tactics
   - VC-funded approaches
   - Personality over process
```

---

## 🆘 IF SOMETHING GOES WRONG

### Issue: Diff doesn't match Mike's voice
**Solution:**
1. Regenerate that specific lesson
2. Include voice guidelines in prompt
3. Review against strong existing lessons
4. Manual edit if needed

### Issue: Research citation can't be found
**Solution:**
1. Search all `/mnt/project/Research_*.md` files
2. Check book chapters (01-chapter-*.md)
3. Verify research actually exists
4. Flag for Mike if missing

### Issue: Uncertain about IP status
**Solution:**
1. Check IP audit file first
2. If still uncertain, DON'T USE
3. Find public domain alternative
4. Add attribution if borderline

### Issue: Updated lesson breaks platform
**Solution:**
1. Revert change immediately
2. Test in isolation
3. Check AI flow integrations
4. Regenerate diff with platform context

### Issue: Behind schedule
**Solution:**
1. Focus on IP-critical first (non-negotiable)
2. Defer 🟢 Light updates to post-launch
3. Prioritize courses 0-10 (core content)
4. Parallel work: diff while testing

---

## 📈 SUCCESS METRICS

You'll know you're succeeding when:

- ✅ **Week 1:** All IP violations resolved (most critical)
- ✅ **Week 2:** Courses 0, 1 updated and tested (foundation)
- ✅ **Week 3:** Courses 6, 7, 8 updated (high-value)
- ✅ **Week 4:** All production courses updated (complete)

**Final State:**
- 20 production courses integrated with research
- 0 IP violations
- 100% research citations accurate
- Platform tests passing
- Ready for Jan 21, 2026 launch

---

## 🎬 YOUR NEXT ACTION (RIGHT NOW)

```bash
# Copy this, paste into Claude Code:

I need to run Phase 1: Content Discovery & Mapping
for the SoloFrameHub Customer Acquisition Academy.

Please read the prompt file:
/mnt/user-data/outputs/PROMPT-1-Content-Discovery-Mapping.md

Then execute the discovery phase to identify all
lesson files and map them to research findings.

Target: 20 production courses (0-20)
Output: CONTENT_INVENTORY_REPORT_2025-01-13.md
```

**Then sit back and let Claude scan your codebase!**

---

## 📚 REFERENCE LINKS

- **Master Workflow:** `RESEARCH-INTEGRATION-MASTER-WORKFLOW.md`
- **Prompt 1:** `PROMPT-1-Content-Discovery-Mapping.md`
- **Prompt 2:** `PROMPT-2-Research-Gap-Analysis.md`
- **Prompt 3:** `PROMPT-3-Diff-Generation-Per-Course.md`
- **IP Audit:** `/mnt/project/IP-audit-and-updated-research-prompts.md`
- **Course Outline:** `/mnt/project/Customer_Acquisition_Academy_Complete_Outline.md`

---

**Version:** 1.0  
**Last Updated:** 2025-01-13  
**Status:** Ready to Execute  
**First Action:** Run PROMPT-1 in Claude Code NOW
