# PROMPT 2: RESEARCH GAP ANALYSIS

**Purpose:** Compare existing lesson content against research findings to identify outdated information, missing insights, and determine update priority (Moderate vs Deep).

**Target Tool:** Claude Code / Antigravity  
**Prerequisites:** Complete PROMPT 1 (Content Discovery) first  
**Expected Output:** Prioritized update recommendations with specific gaps identified  
**Estimated Time:** 20-30 minutes

---

## CONTEXT

You have completed the Content Discovery phase and now have:
- **CONTENT_INVENTORY_REPORT_2025-01-13.md** - All lesson files mapped
- **~30 research files** with updated findings
- **IP audit results** flagging proprietary frameworks to avoid

Now you need to analyze WHAT needs updating and HOW MUCH work each update requires.

---

## YOUR TASK

### Phase 1: Load Research Findings

**Read and summarize key findings from each research area:**

1. **Sales Psychology** (`Research_the_psychology_of_why_solo_founders__both.md`)
   - Key insights about cognitive biases
   - Updated statistics on founder sales resistance
   - New frameworks or models

2. **DISC Applications** (`Research_DISC_behavioral_assessment_applications_f.md`)
   - Validation studies
   - Rapid identification methods
   - Modern applications

3. **Discovery Frameworks** (`Research_discovery_and_qualification_frameworks_fo.md`)
   - BANT/MEDDIC updates
   - New qualification methodologies
   - Industry best practices

4. **SEO/AEO** (`Research_the_shift_from_traditional_SEO_to_Answer.md`)
   - Zero-click search landscape
   - AI Overview optimization
   - Answer engine strategies

5. **LinkedIn Strategy** (`Research_LinkedIn_as_a_customer_acquisition_channe.md`)
   - 2025 algorithm changes
   - Content format effectiveness
   - Trust Pincer strategy

6. **Cold Email** (`Research_outreach_strategies_for_solo_founders___i.md`)
   - Deliverability best practices
   - Compliance updates (CAN-SPAM, GDPR)
   - Personalization at scale

7. **Community-Led Growth** (`Research_community-led_growth_and_social_proof_str.md`)
   - 80/20 community rule
   - Reddit/HN strategies
   - CLG vs PLG comparison

8. **CRM/Sales Ops** (`Research_CRM_and_sales_operations_for_solo_founder.md`)
   - Bootstrap-friendly CRM options
   - Pipeline management systems
   - Automation workflows

9. **Customer Success** (`Research_customer_success_and_retention_strategies.md`)
   - Retention frameworks
   - Expansion strategies
   - Churn prevention

10. **Pricing Psychology** (`Research_pricing_psychology_and_objection_handling.md`)
    - Value-based pricing
    - Objection handling frameworks
    - Negotiation tactics

11. **Sales Sustainability** (`Research_sales_sustainability_and_founder_mental_h.md`)
    - Mental health considerations
    - Sustainable sales rhythms
    - Burnout prevention

12. **Metrics** (`Research_sales_and_customer_acquisition_metrics_fo.md`)
    - Bootstrap-relevant KPIs
    - Vanity vs actionable metrics
    - Dashboard design

13. **AI/Automation** (`AI___Automation_for_Customer_Acquisition__Solo_Fou.md`)
    - AI use cases for solo founders
    - Automation best practices
    - Human-AI balance

14. **VC vs Bootstrap** (`Research_the_differences_between_bootstrap_and_VC-.md`)
    - Funding path implications
    - Sales motion differences
    - Growth trajectory comparisons

**Output Format:**
```markdown
## Research Findings Summary

### 1. Sales Psychology (Course 0)
**Key Insights:**
- Negativity bias amplifies rejection 3-5x (new statistic)
- "Procrastibuilding" vs "Content Treadmill" avoidance patterns identified
- Reframe from "extraction" to "diagnosis" shown to reduce resistance

**New Frameworks:**
- The Sustainable Sales Rhythm framework
- The Direct Question Protocol

**Updated Statistics:**
- 68% of technical founders experience imposter syndrome (was 50%)
- Average 2.3 years before first consistent sales outreach (new finding)

**IP Considerations:**
- All public domain concepts ✅
```

---

### Phase 2: Content Gap Analysis (Per Course)

**For each course with existing content (from Prompt 1 inventory):**

Compare lesson content against research findings to identify:

1. **Outdated Information** - Statistics, tools, tactics that have changed
2. **Missing Insights** - New frameworks or concepts not covered
3. **IP Violations** - Use of proprietary frameworks that need replacement
4. **Research Depth** - Areas where research is deeper than current content
5. **Practical Examples** - Where new case studies would add value

**Output Format:**
```markdown
## Course-by-Course Gap Analysis

### Course 0: Solo Founder Sales Psychology

#### Lesson 1: Why Your Brain Sabotages Sales
**Current Content Summary:**
- Covers cognitive biases and negativity bias
- ~1,200 words
- Last updated: 2024-12-20

**Research Gaps Identified:**
1. **OUTDATED:** Uses 50% imposter syndrome stat, research shows 68%
2. **MISSING:** Doesn't cover "Procrastibuilding" vs "Content Treadmill" patterns
3. **DEPTH:** Brief mention of amygdala; research has deeper neuroscience explanation
4. **EXAMPLES:** No case studies; research includes Pieter Levels, Justin Welsh examples

**IP Risk:** ✅ None - all public domain concepts

**Update Priority:** 🟡 MODERATE
**Estimated Effort:** 2-3 hours to integrate new statistics and frameworks

**Recommended Changes:**
- Update imposter syndrome statistic (68% not 50%)
- Add 300-word section on avoidance patterns
- Expand neuroscience explanation using research (500 words)
- Add 2 brief case study boxes (Justin Welsh, technical founder example)
- Total new content: ~800 words

---

#### Lesson 2: The Math Your Brain Gets Wrong About Rejection
**Current Content Summary:**
- Explains loss aversion and probability miscalculation
- ~1,100 words
- Last updated: 2024-12-18

**Research Gaps Identified:**
1. **OUTDATED:** Generic loss aversion; research quantifies 3-5x amplification
2. **MISSING:** No mention of sustainable sales rhythm framework
3. **DEPTH:** Could expand with more concrete examples from research

**IP Risk:** ✅ None

**Update Priority:** 🟢 LIGHT
**Estimated Effort:** 1-2 hours for statistics update and examples

**Recommended Changes:**
- Update loss aversion stat with 3-5x amplification factor
- Add sustainable rhythm sidebar (200 words)
- Refresh 1-2 examples with research-backed scenarios

[Continue for all lessons in Course 0]

---

### Course 1: ICP Builder Workshop

#### Lesson 1: Why Most Founders Target Wrong
**Current Content:** ~1,100 words on targeting mistakes

**Research Gaps:**
- Research has more recent "targeting failure" statistics
- Missing "Golden Segment" beachhead concept from updated research
- Could add creator economy examples

**IP Risk:** ✅ None

**Update Priority:** 🟡 MODERATE  
**Effort:** 2-3 hours

[Continue for all courses...]
```

---

### Phase 3: Prioritization Matrix

**Classify each lesson into update categories:**

#### 🔴 DEEP UPDATES REQUIRED (Major Rewrite)
**Criteria:**
- 50%+ of content needs updating
- Core framework has changed
- IP violation requires replacement methodology
- Research findings fundamentally change approach

**Example:**
```markdown
### Course 2, Lesson 5: "StoryBrand Messaging Framework"
**Issue:** Teaching proprietary SB7 framework (IP violation)
**Research Alternative:** Story-based messaging using Hero's Journey (public domain)
**Scope:** Complete lesson rewrite required
**Estimated Effort:** 4-6 hours
**Priority:** 🔴 HIGH (legal risk)
```

#### 🟡 MODERATE UPDATES REQUIRED (Significant Enhancement)
**Criteria:**
- 20-50% content needs updating
- Add new frameworks or sections
- Update multiple statistics
- Expand with research-backed examples
- No IP issues, but substantial gaps

**Example:**
```markdown
### Course 0, Lesson 1: "Why Your Brain Sabotages Sales"
**Gap:** Missing avoidance patterns, outdated stats, thin neuroscience
**Update:** Add 800 words of research-backed content
**Estimated Effort:** 2-3 hours
**Priority:** 🟡 MEDIUM
```

#### 🟢 LIGHT UPDATES REQUIRED (Minor Refresh)
**Criteria:**
- <20% content needs updating
- Update 1-2 statistics
- Add 1-2 examples
- Minor clarifications
- No structural changes

**Example:**
```markdown
### Course 1, Lesson 4: "Buyer Personas"
**Gap:** Creator economy examples missing
**Update:** Add 2 persona examples (200 words)
**Estimated Effort:** 30-60 minutes
**Priority:** 🟢 LOW
```

#### ✅ NO UPDATES NEEDED
**Criteria:**
- Content aligns with research
- No IP issues
- Statistics are current
- Examples are relevant

---

### Phase 4: IP Compliance Check

**For each lesson, verify against IP audit:**

Reference: `/mnt/project/IP-audit-and-updated-research-prompts.md`

**Create IP Replacement Matrix:**

```markdown
## IP Compliance Replacements Required

### 🚫 MUST REPLACE (Proprietary Frameworks)

| Course | Lesson | Current | Issue | Replacement | Effort |
|--------|--------|---------|-------|-------------|--------|
| 2 | 5 | StoryBrand SB7 | Trademarked methodology | Story-based messaging (Hero's Journey) | 4-6h |
| 3 | X | SPIN Selling | Registered trademark | Consultative Discovery Questions | 3-4h |
| X | X | Sandler System | Proprietary franchise | [Avoid entirely] | N/A |

### ⚠️ NEEDS ATTRIBUTION (Can Reference, Not Teach)

| Course | Lesson | Framework | Owner | Fix | Effort |
|--------|--------|-----------|-------|-----|--------|
| 2 | 2 | April Dunford Positioning | Author | Add attribution, use public concepts only | 1h |
| 6 | 3 | Challenger Sale | Gartner | Reference only, don't teach methodology | 1h |

### ✅ PUBLIC DOMAIN (Safe to Teach)

- DISC (Marston, 1928) - All caps version
- BANT (IBM origin) - Industry standard
- MEDDIC/MEDDPICC (PTC origin) - Industry standard  
- AIDA, PAS, FAB - Public domain copywriting
- AARRR (Pirate Metrics) - Community concept
```

---

### Phase 5: Effort Estimation & Prioritization

**Calculate total update workload:**

```markdown
## Update Workload Summary

### By Priority
- 🔴 DEEP: X lessons × 4-6 hours = XX-XX hours
- 🟡 MODERATE: X lessons × 2-3 hours = XX-XX hours  
- 🟢 LIGHT: X lessons × 0.5-1 hour = XX-XX hours
- ✅ NO UPDATE: X lessons × 0 hours = 0 hours

**TOTAL ESTIMATED EFFORT:** XX-XX hours

### By Course (Courses 0-20 only)
| Course | Lessons | Deep | Moderate | Light | None | Total Effort |
|--------|---------|------|----------|-------|------|--------------|
| 0 | 8 | 0 | 3 | 4 | 1 | 10-15h |
| 1 | 12 | 0 | 5 | 6 | 1 | 14-20h |
| 2 | 10 | 2 | 4 | 3 | 1 | 18-26h |
| ... | ... | ... | ... | ... | ... | ... |

### Recommended Sequence (Production Priority)

**Phase A: Critical IP Fixes (Week 1)**
- Course 2, Lesson 5: StoryBrand replacement (🔴 4-6h)
- Course 3, Lesson X: SPIN replacement (🔴 3-4h)
- Total: 7-10 hours

**Phase B: High-Value Moderate Updates (Week 2-3)**
- Course 0: Psychology updates (🟡 10-15h)
- Course 1: ICP enhancements (🟡 14-20h)
- Course 6: SEO/AEO refresh (🟡 8-12h)
- Total: 32-47 hours

**Phase C: Light Refreshes (Week 4)**
- All 🟢 LIGHT updates across courses 0-20
- Total: 15-20 hours

**GRAND TOTAL:** 54-77 hours for all production course updates
```

---

### Phase 6: Research Coverage Matrix

**Show which research files apply to which courses:**

```markdown
## Research → Course Application Matrix

| Research File | Applies To | Key Insights | Update Priority |
|---------------|------------|--------------|-----------------|
| Sales Psychology | Course 0 (all), Course 21 | Cognitive biases, resistance | 🟡 |
| DISC Behavioral | Course 2, 15 | Personality selling | 🟢 |
| Discovery Frameworks | Course 3, 14 | BANT/MEDDIC | 🟡 |
| SEO/AEO Shift | Course 6 | Zero-click, AI Overviews | 🟡 |
| LinkedIn Strategy | Course 7 | Trust Pincer, PAIPS | 🟡 |
| Cold Email | Course 8 | Deliverability, compliance | 🟢 |
| Community-Led | Course 9 | 80/20 rule, CLG | 🟢 |
| CRM/Sales Ops | Course 4, 20, 33 | Pipeline, CRM tools | 🟡 |
| Customer Success | Course 29-32 | Retention, expansion | 🟡 |
| Pricing/Objections | Course 17 | Value pricing, objection db | 🟡 |
| Sales Sustainability | Course 0, 12 | Mental health, rhythm | 🟡 |
| Metrics | Course 8, 34 | KPIs, dashboards | 🟢 |
| AI/Automation | Course 35 | AI use cases | 🟢 |
| VC vs Bootstrap | Course 0, 3 | Funding implications | 🟢 |
```

---

## EXECUTION INSTRUCTIONS

**Step 1:** Read all research files and create summaries
```bash
view /mnt/project/Research_*.md
view /mnt/project/*research*.md
view /mnt/project/01-chapter-01.md
# ... etc for all research files
```

**Step 2:** For each course with content (from Prompt 1 inventory):
- Read existing lesson files
- Compare against relevant research
- Identify gaps and outdated info
- Check IP compliance

**Step 3:** Classify each lesson update as Deep/Moderate/Light/None

**Step 4:** Calculate total effort and create prioritization sequence

**Step 5:** Generate comprehensive gap analysis report

---

## OUTPUT FILE

Save the complete report as:
```
RESEARCH_GAP_ANALYSIS_2025-01-13.md
```

**Include these sections:**
1. Executive Summary (total gaps, effort estimate)
2. Research Findings Summary
3. Course-by-Course Gap Analysis
4. Prioritization Matrix (Deep/Moderate/Light/None)
5. IP Compliance Replacements Required
6. Update Workload Summary & Sequencing
7. Research Coverage Matrix
8. Recommendations for Next Steps

---

## SUCCESS CRITERIA

✅ Every lesson with content analyzed against research  
✅ Gaps classified by severity (Deep/Moderate/Light)  
✅ IP violations flagged with replacement recommendations  
✅ Total effort estimated  
✅ Update sequence prioritized  
✅ Report ready for Phase 3 (Diff Generation)

---

## NOTES FOR CLAUDE CODE

- Be thorough but concise - focus on actionable gaps
- Quantify changes where possible (e.g., "add 800 words")
- Flag IP issues immediately
- Provide realistic effort estimates
- Prioritize production courses (0-20) over future courses (21-41)
- Include specific research file references for each finding

**Estimated tokens:** ~100K-150K for complete gap analysis  
**Estimated time:** 20-30 minutes with thorough research comparison

---

## NEXT STEP

After completing this gap analysis, the output will feed into:
- **PROMPT 3: Diff Generation** (creates before/after lesson updates for review)
