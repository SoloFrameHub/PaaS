# Course Migration Guide: Old Structure → Revised Structure

## Customer Acquisition Academy Course Reorganization

**Purpose:** Migrate existing course prompt packages to the revised 33-course structure  
**Date:** December 26, 2024

---

## NEW COURSES TO CREATE (Gaps in Sequence)
After migration, these courses need new prompt packages:
| New # | Course Title                                 | Priority | Notes                                   |
|-------|----------------------------------------------|----------|-----------------------------------------|
| **0** | Sales Psychology                             | ✅ DONE  | **Already implemented – no placeholder needed** |
| 2     | Positioning & Value Proposition              | HIGH     | Completes Foundations track             |
| 3     | Choose Your Acquisition Path                 | HIGH     | Critical for path filtering             |
| 5     | Technical Content Engine                     | MEDIUM   | First Marketing course                  |
| 6     | SEO & Answer Engine Optimization             | MEDIUM   | Use AEO research doc                    |
| 7     | LinkedIn Growth Engine                       | MEDIUM   | Use LinkedIn research doc                |
| 9     | Community-Based Lead Generation              | MEDIUM   | Use community research doc               |
| 10    | Email Nurture & Newsletter                   | MEDIUM   | –                                       |
| 11    | Social Proof & Referral Systems              | MEDIUM   | Combines old 9+10 concepts              |
| 12    | Marketing Automation & Analytics             | MEDIUM   | –                                       |
| 16    | Demo Architecture                            | HIGH     | Bridges discovery→objections            |
| 18    | Proposals, Pricing & Negotiation             | HIGH     | –                                       |
| 19    | Closing & Next Steps                         | HIGH     | –                                       |
| 20    | Sales Pipeline Management                    | MEDIUM   | –                                       |
| 21‑24 | Customer Success Track                       | LOW      | Post‑launch                             |
| 25‑29 | Systems Track                                | LOW      | Post‑launch                             |
What this does

Marks Course 0 as DONE – no placeholder creation needed.
Keeps the rest of the table unchanged, preserving the workflow for the remaining new courses.


## MIGRATION MAP

| Old # | Old Title | Old File | New # | New Track | Action Required |
|-------|-----------|----------|-------|-----------|-----------------|
| 1 | ICP Builder Workshop | `Course_1_-_ICP_Builder_Workshop.md` | **1** | Foundations | ✅ KEEP - Minor updates only |
| 2 | Understanding DISC Buyer Personas | `Course_3__Understanding_DISC_Buyer_Personas.md` | **13** | Sales | 🔄 MOVE + UPDATE |
| 3 | Discovery Framework BANT/MEDDIC | `Course_2_-_Discovery_Framework__BANT_-_MEDDIC.md` | **14** | Sales | 🔄 MOVE + UPDATE |
| 4 | List Building Systems & Tools | `Course_4_-_List_Building.md` | **4** | Foundations | ✅ KEEP - Minor updates only |
| 5 | Cold Email Mastery | `Course_5__Cold_Email_Mastery.md` | **8** | Marketing | 🔄 MOVE + UPDATE |
| 6 | Objection Handling Database | `Course_6__Objection_Handling_Database.md` | **17** | Sales | 🔄 MOVE + UPDATE |
| 7 | Discovery Call Simulations | `Course_7__Discovery_Call_Simulations.md` | **15** | Sales | 🔄 MOVE + UPDATE |

---

## NEW COURSES TO CREATE (Gaps in Sequence)
After migration, these courses need new prompt packages:
| New # | Course Title                                 | Priority | Notes                                   |
|-------|----------------------------------------------|----------|-----------------------------------------|
| **0** | Sales Psychology                             | ✅ DONE  | **Already implemented – no placeholder needed** |
| 2     | Positioning & Value Proposition              | HIGH     | Completes Foundations track             |
| 3     | Choose Your Acquisition Path                 | HIGH     | Critical for path filtering             |
| 5     | Technical Content Engine                     | MEDIUM   | First Marketing course                  |
| 6     | SEO & Answer Engine Optimization             | MEDIUM   | Use AEO research doc                    |
| 7     | LinkedIn Growth Engine                       | MEDIUM   | Use LinkedIn research doc                |
| 9     | Community-Based Lead Generation              | MEDIUM   | Use community research doc               |
| 10    | Email Nurture & Newsletter                   | MEDIUM   | –                                       |
| 11    | Social Proof & Referral Systems              | MEDIUM   | Combines old 9+10 concepts              |
| 12    | Marketing Automation & Analytics             | MEDIUM   | –                                       |
| 16    | Demo Architecture                            | HIGH     | Bridges discovery→objections            |
| 18    | Proposals, Pricing & Negotiation             | HIGH     | –                                       |
| 19    | Closing & Next Steps                         | HIGH     | –                                       |
| 20    | Sales Pipeline Management                    | MEDIUM   | –                                       |
| 21‑24 | Customer Success Track                       | LOW      | Post‑launch                             |
| 25‑29 | Systems Track                                | LOW      | Post‑launch                             |


## DETAILED MIGRATION INSTRUCTIONS

### Course 1: ICP Builder Workshop
**Old Position:** Course 1 → **New Position:** Course 1  
**Action:** KEEP IN PLACE

**Updates Required:**
1. Update header metadata:
```markdown
# Course 1: ICP Builder Workshop
**Track:** Foundations (Track 1)
**Position:** 1 of 33
**Prerequisites:** Course 0 (Sales Psychology) recommended
```

2. Update "Next Course" references:
   - OLD: "Continue to Course 2: DISC Buyer Personas"
   - NEW: "Continue to Course 2: Positioning & Value Proposition"

3. Add connection to Course 0:
   - In Lesson 1, add reference: "If you haven't completed Course 0 (Sales Psychology), consider reviewing it first—especially if you find yourself avoiding ICP research conversations."

4. Update learning path context:
   - Add note that ICP feeds into Course 3 (Choose Your Path) for playbook selection

**No structural changes to lessons required.**

---

### Course 2: DISC Buyer Personas  
**Old Position:** Course 2 → **New Position:** Course 13  
**Action:** MOVE TO SALES TRACK

**Updates Required:**

1. Update header metadata:
```markdown
# Course 13: Understanding DISC Buyer Personas
**Track:** Sales Methodology (Track 3)
**Position:** 13 of 33
**Prerequisites:** Courses 1-12 (Foundations + Marketing Engine)
```

2. Update course summary context:
   - OLD context: "Foundation for all subsequent roleplay"
   - NEW context: "Now that you have leads from your marketing engine, DISC helps you convert them. This course teaches rapid personality identification so your discovery calls and demos resonate with each buyer type."

3. Update prerequisite references:
   - Remove: "This is foundational for Courses 3+"
   - Add: "You've built your ICP (Course 1), your marketing channels are generating conversations (Courses 5-12), now you need to adapt your communication to each prospect's style."

4. Update "Next Course" references:
   - OLD: "Continue to Course 3: Discovery Framework"
   - NEW: "Continue to Course 14: Discovery Framework - BANT/MEDDIC"

5. Update lesson cross-references:
   - Lesson 7 "Adapting Discovery for Each Type" → Add: "You'll practice this extensively in Course 15 (Discovery Simulations)"
   - Lesson 8 "Adapting Demos for Each Type" → Add: "Course 16 (Demo Architecture) builds on these principles"
   - Lesson 9 "Adapting Objection Handling" → Add: "Course 17 (Objection Handling) provides the LARA framework for each DISC type"

6. Reduce lesson count from 12 to 10:
   - MERGE Lesson 7 (Adapting Discovery) + Lesson 8 (Adapting Demos) → Single lesson "DISC in Sales Conversations"
   - MERGE Lesson 10 (Selling to C-Types) + Lesson 11 (AI Roleplay) → "Practice: DISC Roleplay Sessions"
   - This aligns with new outline's 10-lesson structure

**File Rename:** `Course_13_DISC_Buyer_Personas.md`

---

### Course 3: Discovery Framework - BANT/MEDDIC
**Old Position:** Course 3 → **New Position:** Course 14  
**Action:** MOVE TO SALES TRACK

**Updates Required:**

1. Update header metadata:
```markdown
# Course 14: Discovery Framework - BANT/MEDDIC
**Track:** Sales Methodology (Track 3)
**Position:** 14 of 33
**Prerequisites:** Course 13 (DISC Buyer Personas)
```

2. Update course positioning:
   - OLD: "Requires DISC knowledge for roleplay exercises"
   - NEW: "You've learned to identify DISC types (Course 13). Now apply that knowledge to structured discovery conversations using BANT and MEDDIC frameworks."

3. Update "Next Course" references:
   - OLD: "Continue to Course 4: List Building"
   - NEW: "Continue to Course 15: Discovery Call Simulations for intensive practice"

4. Reduce lesson count from 14 to 12:
   - MERGE Lesson 11 (Discovery Call Structure) + Lesson 12 (Scaling for Deal Size) → "Discovery Call Structure & Scaling"
   - KEEP Lesson 13 (AI Roleplay) but note it's a preview—Course 15 provides deep practice
   - This aligns with new outline's 12-lesson structure

5. Update DISC references throughout:
   - Add to Lesson 1: "Remember your DISC training from Course 13—D-types want faster discovery, C-types want more detail"
   - Update Lesson 13 (Roleplay): "This is practice mode. Course 15 provides 10 full lessons of simulation with different DISC personalities and resistance levels."

6. Add connection to marketing context:
   - New intro paragraph: "Your marketing engine (Courses 5-12) is generating leads. Discovery determines which of those leads become customers. This is where deals are won or lost."

**File Rename:** `Course_14_Discovery_Framework_BANT_MEDDIC.md`

---

### Course 4: List Building & Prospecting Infrastructure
**Old Position:** Course 4 → **New Position:** Course 4  
**Action:** KEEP IN PLACE

**Updates Required:**

1. Update header metadata:
```markdown
# Course 4: List Building & Prospecting Infrastructure
**Track:** Foundations (Track 1)
**Position:** 4 of 33
**Prerequisites:** Course 3 (Choose Your Acquisition Path)
```

2. Update course title (minor):
   - OLD: "List Building Systems & Tools"
   - NEW: "List Building & Prospecting Infrastructure"

3. Update context for new position:
   - Add: "You've defined your ICP (Course 1), positioned your offer (Course 2), and selected your acquisition path (Course 3). Now build the infrastructure to find and reach those prospects."

4. Update "Next Course" references:
   - OLD: "Continue to Course 5: Cold Email Mastery"
   - NEW: "Continue to Course 5: Technical Content Engine (or jump to Course 8: Cold Email if outbound is your primary path)"

5. Add path-specific guidance:
   - "If Course 3 identified you as primarily outbound-focused, prioritize Courses 4 and 8. If content/inbound is your path, Course 4 remains important but Courses 5-7 may be higher priority."

**File Rename:** `Course_04_List_Building_Prospecting_Infrastructure.md` (add leading zero for sorting)

---

### Course 5: Cold Email Mastery
**Old Position:** Course 5 → **New Position:** Course 8  
**Action:** MOVE TO MARKETING TRACK

**Updates Required:**

1. Update header metadata:
```markdown
# Course 8: Cold Email Mastery
**Track:** Marketing Engine (Track 2)
**Position:** 8 of 33
**Prerequisites:** Course 4 (List Building), Course 7 (LinkedIn) recommended
```

2. Update course positioning:
   - OLD: Followed List Building directly
   - NEW: Part of Marketing Engine, positioned after LinkedIn (complementary outbound channels)

3. Update "Previous/Next Course" references:
   - Previous: "You've built your LinkedIn presence (Course 7). Cold email is your second outbound channel."
   - Next: "Continue to Course 9: Community-Based Lead Generation"

4. Reduce lesson count from 14 to 12:
   - MERGE Lesson 2 (PAS Framework) + Lesson 3 (AIDA Framework) → "Cold Email Frameworks: PAS and AIDA"
   - MERGE Lesson 9 (Personalization at Scale) + Lesson 10 (Sales Linter) → "Personalization & AI-Assisted Optimization"
   - This aligns with new outline's 12-lesson structure

5. Add marketing context:
   - New intro: "Cold email complements your content (Courses 5-6) and LinkedIn (Course 7) efforts. While those channels build inbound, cold email lets you proactively reach prospects who match your ICP but haven't discovered you yet."

6. Connect to later sales courses:
   - Add to closing lesson: "When cold emails generate replies, you'll use DISC (Course 13) and Discovery (Course 14) to convert conversations to opportunities."

**File Rename:** `Course_08_Cold_Email_Mastery.md`

---

### Course 6: Objection Handling Database
**Old Position:** Course 6 → **New Position:** Course 17  
**Action:** MOVE TO SALES TRACK

**Updates Required:**

1. Update header metadata:
```markdown
# Course 17: Objection Handling Database
**Track:** Sales Methodology (Track 3)
**Position:** 17 of 33
**Prerequisites:** Course 16 (Demo Architecture)
```

2. Update course positioning:
   - OLD: Followed Cold Email (outreach context)
   - NEW: Follows Demo Architecture (handling objections during/after demos)

3. Update "Previous/Next Course" references:
   - Previous: "You've learned to structure demos (Course 16). Now prepare for the objections that arise during and after those demos."
   - Next: "Continue to Course 18: Proposals, Pricing & Negotiation"

4. Reduce lesson count from 12 to 10:
   - MERGE Lesson 6 (Authority Objections) + Lesson 7 (Need Objections) → "Authority & Need Objections"
   - MERGE Lesson 10 (Building Database) + Lesson 12 (Playbook) → "Your Objection Database & Playbook"
   - This aligns with new outline's 10-lesson structure

5. Add DISC integration:
   - Update Lesson 3 (LARA Framework): "Remember DISC from Course 13—a D-type needs a fast LARA response, a C-type needs data-backed responses"
   - Each objection type lesson should note DISC variations

6. Connect to closing:
   - Add to final lesson: "Handling objections well sets up Course 18 (Proposals) and Course 19 (Closing). Objections resolved = deal momentum maintained."

**File Rename:** `Course_17_Objection_Handling_Database.md`

---

### Course 7: Discovery Call Simulations
**Old Position:** Course 7 → **New Position:** Course 15  
**Action:** MOVE TO SALES TRACK

**Updates Required:**

1. Update header metadata:
```markdown
# Course 15: Discovery Call Simulations
**Track:** Sales Methodology (Track 3)
**Position:** 15 of 33
**Prerequisites:** Course 14 (Discovery Framework)
```

2. Update course positioning:
   - OLD: "Applies everything from Courses 2 (DISC) and 3 (Discovery Framework)"
   - NEW: "Applies DISC (Course 13) and Discovery Framework (Course 14) in intensive practice sessions"

3. Update "Previous/Next Course" references:
   - Previous: "You've learned DISC (Course 13) and the discovery frameworks (Course 14). Now practice until it's muscle memory."
   - Next: "Continue to Course 16: Demo Architecture—turning qualified discoveries into compelling demonstrations."

4. Update lesson references:
   - All references to "Course 2" → "Course 13"
   - All references to "Course 3" → "Course 14"

5. No structural changes needed - 10 lessons matches new outline

**File Rename:** `Course_15_Discovery_Call_Simulations.md`

---

## CROSS-REFERENCE UPDATE CHECKLIST

After migrating individual files, search and replace these patterns across ALL course files:

| Find | Replace With |
|------|--------------|
| "Course 2: DISC" or "Course 2 (DISC)" | "Course 13: DISC Buyer Personas" |
| "Course 3: Discovery" | "Course 14: Discovery Framework" |
| "Course 4: List Building" | "Course 4: List Building & Prospecting" |
| "Course 5: Cold Email" | "Course 8: Cold Email Mastery" |
| "Course 6: Objection" | "Course 17: Objection Handling" |
| "Course 7: Simulations" | "Course 15: Discovery Simulations" |
| "36 courses" | "33 courses" |
| "Track 1: Targeting Foundations" | "Track 1: Foundations" |
| "Track 3: Outreach" | "Track 2: Marketing Engine" |
| "Track 4: Sales Execution" | "Track 3: Sales Methodology" |

---

## NEW COURSES TO CREATE (Gaps in Sequence)

After migration, these courses need new prompt packages:

| New # | Course Title | Priority | Notes |
|-------|--------------|----------|-------|
| 0 | Sales Psychology | ✅ DONE | Created this session |
| 2 | Positioning & Value Proposition | HIGH | Completes Foundations track |
| 3 | Choose Your Acquisition Path | HIGH | Critical for path filtering |
| 5 | Technical Content Engine | MEDIUM | First Marketing course |
| 6 | SEO & Answer Engine Optimization | MEDIUM | Use AEO research doc |
| 7 | LinkedIn Growth Engine | MEDIUM | Use LinkedIn research doc |
| 9 | Community-Based Lead Generation | MEDIUM | Use community research doc |
| 10 | Email Nurture & Newsletter | MEDIUM | |
| 11 | Social Proof & Referral Systems | MEDIUM | Combines old 9+10 concepts |
| 12 | Marketing Automation & Analytics | MEDIUM | |
| 16 | Demo Architecture | HIGH | Bridges discovery→objections |
| 18 | Proposals, Pricing & Negotiation | HIGH | |
| 19 | Closing & Next Steps | HIGH | |
| 20 | Sales Pipeline Management | MEDIUM | |
| 21-24 | Customer Success Track | LOW | Post-launch |
| 25-29 | Systems Track | LOW | Post-launch |

---

## FILE NAMING CONVENTION

Use this pattern for all course files:
```
Course_XX_Title_With_Underscores.md
```

Examples:
- `Course_00_Sales_Psychology.md`
- `Course_01_ICP_Builder_Workshop.md`
- `Course_08_Cold_Email_Mastery.md`
- `Course_13_DISC_Buyer_Personas.md`

Leading zeros ensure proper sorting (01, 02... not 1, 10, 11, 2).

---

## VALIDATION CHECKLIST

Before finalizing migration, verify:

- [ ] All course numbers updated in headers
- [ ] All track assignments correct
- [ ] All prerequisite references updated
- [ ] All "Next Course" links correct
- [ ] All cross-references to other courses updated
- [ ] Lesson counts match new outline
- [ ] File names follow convention
- [ ] No orphaned references to old structure

---

## MIGRATION SEQUENCE

Execute in this order to minimize broken references:

1. **Create placeholder files** for new courses (2, 3, 5-7, 9-12, 16, 18-29)
2. **Migrate Course 1** (minor updates)
3. **Migrate Course 4** (minor updates)  
4. **Migrate Course 5 → 8** (move + update)
5. **Migrate Course 2 → 13** (move + update)
6. **Migrate Course 3 → 14** (move + update)
7. **Migrate Course 7 → 15** (move + update)
8. **Migrate Course 6 → 17** (move + update)
9. **Run cross-reference search/replace**
10. **Validate all links**

---

## SUMMARY

| Category | Count |
|----------|-------|
| Courses staying in place | 2 (Courses 1, 4) |
| Courses moving position | 5 (old 2→13, 3→14, 5→8, 6→17, 7→15) |
| New courses to create | 22 |
| **Total in revised structure** | **33** |