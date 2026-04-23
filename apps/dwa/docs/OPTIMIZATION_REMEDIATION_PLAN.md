# Optimization School Remediation Plan
**Created:** 2026-04-15  
**Estimated Duration:** 4-5 weeks  
**Priority:** CRITICAL (blocks competitive moat & practice licensing launch)

---

## Overview

This plan systematically upgrades the first 3 optimization courses from **D- to A- grade** by adding missing interactivity, assessment infrastructure, feedback systems, and UI polish to match therapeutic school standards.

**Current State:** 43% therapeutic parity, 0% feedback collection, 67% quiz coverage  
**Target State:** 100% therapeutic parity, 100% feedback collection, 100% quiz coverage

---

## Phase 1: Critical Fixes (Week 1)
**Blockers for Launch — Must Complete First**

### Task 1.1: Build 20 Quizzes for Course 3 (Digital Wellness)
**Priority:** CRITICAL  
**Estimated Time:** 12-15 hours  
**Owner:** Content + Dev

**Action Items:**
1. Create directory: `/server/data/quizzes/optimization-school/digital-wellness/`
2. Use Course 1/2 quiz JSON structure as template:
   ```json
   {
     "questions": [
       {
         "id": "q1",
         "type": "multiple-choice",
         "question": "Which evidence grade best describes nighttime screen use → sleep harm?",
         "options": [
           { "id": "a", "text": "WEAK (contested)", "correct": false },
           { "id": "b", "text": "MODERATE (mixed evidence)", "correct": false },
           { "id": "c", "text": "STRONG (well-established)", "correct": true },
           { "id": "d", "text": "INSUFFICIENT (no data)", "correct": false }
         ],
         "explanation": "The circadian biology of blue light → melatonin suppression is STRONG evidence."
       },
       {
         "id": "q2",
         "type": "reflection",
         "question": "What's one digital habit you'll change based on this lesson?",
         "minLength": 50
       }
     ]
   }
   ```
3. Create 20 quiz files: `lesson-1.json` through `lesson-20.json`
4. 5 questions per lesson (3 multiple-choice, 2 reflection)
5. Focus on evidence-grading questions (STRONG vs. MODERATE vs. OVERSTATED)
6. Test quiz loading in development environment

**Acceptance Criteria:**
- [ ] 20 quiz JSON files created and validated
- [ ] Quizzes load correctly in lesson pages
- [ ] Pass/fail logic works (70% threshold)
- [ ] Quiz responses save to database

---

### Task 1.2: Add Post-Lesson Feedback to ALL 60 Lessons
**Priority:** CRITICAL (Analytics Moat)  
**Estimated Time:** 8-10 hours  
**Owner:** Content

**Standard Feedback Template:**
```markdown
---

## How Did We Do?

Your feedback helps us improve this course for future learners.

<Checkin type="scale" question="How helpful was this lesson?" low="Not helpful" high="Very helpful" persistKey="lesson-feedback-helpfulness" />

<Checkin type="reflect" question="What's one thing you'll apply from this lesson? (Optional but valuable for your learning)" persistKey="lesson-feedback-application" />

---
```

**Placement:** After "Key Takeaways" section, before "Resources & Next Steps"

**Action Items:**
1. Add feedback section to all 20 lessons in Movement for Mental Performance
2. Add feedback section to all 20 lessons in Workplace Mental Health
3. Add feedback section to all 20 lessons in Digital Wellness
4. Test data persistence (ensure responses save to database)
5. Update Lesson Interactivity Playbook with feedback pattern

**Acceptance Criteria:**
- [ ] 60/60 lessons include post-lesson feedback
- [ ] Feedback responses persist to database
- [ ] Feedback data accessible via Metabase (Phase 4)
- [ ] Consistent placement and formatting across all lessons

---

### Task 1.3: Fix UI Spacing & Formatting Issues
**Priority:** HIGH  
**Estimated Time:** 6-8 hours  
**Owner:** Content

**Issues to Fix:**
1. **Excessive blank lines:** Reduce multi-line gaps to single blank lines
2. **Inconsistent divider usage:** Standardize `---` with 1 blank line before/after
3. **Redundant headings:** Remove or consolidate duplicate section headers
4. **Inconsistent component spacing:** Ensure 1 blank line before/after all components

**Action Items:**
1. Run automated spacing cleanup script (if available) OR manual pass
2. Review all 60 lessons for:
   - Max 1 blank line between paragraphs
   - Max 1 blank line before/after components
   - Max 1 blank line before/after `---` dividers
   - No trailing whitespace
3. Fix heading hierarchy issues (e.g., redundant "Explained" headings)
4. Ensure consistent Callout formatting

**Script (Optional — Manual if Needed):**
```bash
# Remove multiple consecutive blank lines
for file in server/data/content/optimization/**/*.md; do
  sed -i '' '/^$/N;/^\n$/d' "$file"
done
```

**Acceptance Criteria:**
- [ ] No lesson has >2 consecutive blank lines
- [ ] All `---` dividers have consistent spacing
- [ ] No redundant or confusing headings
- [ ] Professional visual appearance in rendered lessons

---

## Phase 2: Interactivity Uplift (Weeks 2-3)
**High-Value Engagement Features**

### Task 2.1: Add BodyMap to Movement Course (4 Instances)
**Priority:** HIGH  
**Estimated Time:** 6-8 hours  
**Owner:** Content

**Target Lessons:**
1. **Lesson 1 (Science):** "Where do you feel the effects of exercise in your body?"
2. **Lesson 6 (Personal Assessment):** "Map your current physical tension, energy, or discomfort"
3. **Lesson 10 (Yoga):** "During or after yoga, where do you notice sensation, relaxation, or awareness?"
4. **Lesson 20 (Action Plan):** "Track where you feel strength, energy, or changes after 4 weeks of movement"

**Implementation Example:**
```markdown
## Interactive: Map Your Exercise Experience

<BodyMap 
  title="Where Do You Feel Exercise in Your Body?"
  prompt="Click the areas where you typically experience sensations during or after movement (energy, tension, fatigue, strength, or awareness). This helps you build interoceptive awareness."
  persistKey="movement-body-experience"
/>
```

**Acceptance Criteria:**
- [ ] 4 BodyMap instances added to Movement course
- [ ] Clear prompts guide users (what to map and why)
- [ ] Data persists to database
- [ ] BodyMap component renders correctly (test in dev)

---

### Task 2.2: Add 20+ InteractiveScenarios Across All Courses
**Priority:** HIGH  
**Estimated Time:** 15-20 hours  
**Owner:** Content

**Target Distribution:**
- Movement for Mental Performance: 7 scenarios (1 every ~3 lessons)
- Workplace Mental Health: 7 scenarios
- Digital Wellness: 6 scenarios
- **Total:** 20 new scenarios

**Scenario Template:**
```markdown
<InteractiveScenario 
  title="Scenario: You're Exhausted Before Your Workout"
  description="You planned to walk for 30 minutes after work, but you're completely drained. What do you do?"
>

<Choice 
  label="A: Skip it — you're too tired and exercise won't help anyway" 
  feedback="This is common, but remember: action often generates energy. The evidence shows that starting with just 3-5 minutes usually leads to completing the session. Consider trying the '3-minute rule' before deciding." 
  type="avoidant" 
/>

<Choice 
  label="B: Push through and do the full 30 minutes no matter what" 
  feedback="This is well-intentioned but can backfire. Forced intensity when exhausted increases injury risk and reduces adherence. It's better to start small and adjust based on how you feel." 
  type="mixed" 
/>

<Choice 
  label="C: Start with 3 minutes and allow yourself to stop if it's unbearable" 
  feedback="Excellent approach. This is the '3-minute rule' — commit to starting, then reassess. Research shows that ~80% of people who start continue once they're moving. You're working with your psychology, not against it." 
  type="healthy" 
/>

<Choice 
  label="D: Do a gentler version — 10-minute slow walk instead of 30" 
  feedback="Great modification. Adjusting intensity based on your current state is a hallmark of sustainable practice. Even 10 minutes produces measurable mental health benefits, and it builds self-efficacy." 
  type="healthy" 
/>

</InteractiveScenario>
```

**Scenario Ideas by Course:**

**Movement Course:**
1. "You feel exhausted before your workout — what do you do?" (L2)
2. "Your friend criticizes your exercise routine as 'not intense enough' — how do you respond?" (L8)
3. "You've missed 3 days in a row and feel discouraged — what's your next move?" (L16)
4. "You experience knee pain during running — what's your response?" (L4)
5. "You're choosing between group fitness class vs. solo workout — how do you decide?" (L12)
6. "You want to exercise but it's raining/cold/dark — what do you do?" (L15)
7. "You're 10 days into a new routine and motivation is fading — what now?" (L16)

**Workplace Course:**
1. "Your manager adds 3 urgent tasks Friday at 4 PM — how do you respond?" (L11)
2. "A colleague dismisses your boundary-setting as 'not being a team player' — what do you say?" (L15)
3. "You're working 60 hours/week with no recognition — do you speak up or look for a new job?" (L6)
4. "Your supervisor micromanages every task — how do you address it?" (L8)
5. "You're burned out but need the income — what's your strategy?" (L3)
6. "A coworker consistently takes credit for your work — what do you do?" (L9)
7. "You're asked to work through lunch daily — how do you respond?" (L11)

**Digital Wellness Course:**
1. "You're doomscrolling at 11 PM and can't stop — what's your next move?" (L10)
2. "Your phone notifications are constant during dinner — do you check them?" (L7)
3. "You compare yourself to Instagram posts and feel inadequate — what do you do?" (L9)
4. "Your child is glued to screens and refusing outdoor play — how do you respond?" (L15)
5. "You habitually check work email at midnight — is this a problem?" (L13)
6. "Your partner complains you're always on your phone — how do you react?" (L17)

**Acceptance Criteria:**
- [ ] 20 scenarios added across 60 lessons
- [ ] 4 choices per scenario (mix of avoidant, mixed, healthy)
- [ ] Evidence-based feedback for each choice
- [ ] Scenarios test application of lesson concepts

---

### Task 2.3: Add 30+ FlipCards for Myth-Busting
**Priority:** MEDIUM-HIGH  
**Estimated Time:** 10-12 hours  
**Owner:** Content

**Target Distribution:**
- Movement: 12 flip cards
- Workplace: 10 flip cards
- Digital Wellness: 8 flip cards
- **Total:** 30 new flip cards

**FlipCard Template:**
```markdown
<FlipCard 
  front="Myth: Exercise must be intense to help depression" 
  back="Fact: The 2024 BMJ meta-analysis found that walking, yoga, and moderate aerobic exercise produced STRONG effects for depression (SMD = -0.62 to -0.97). Intensity is NOT the key variable — consistency is. Gentle, sustainable movement is often more effective than intense, sporadic workouts." 
  frontIcon="❌"
/>
```

**Myth Ideas by Course:**

**Movement Course (12 myths):**
1. "Exercise must be intense to help depression"
2. "You need 60+ minutes to see mental health benefits"
3. "Cardio is the only type of exercise that helps mood"
4. "If you're not sore, you didn't work hard enough"
5. "Exercise can replace therapy for severe depression"
6. "You should exercise every day for mental health"
7. "Outdoor exercise is always better than indoor"
8. "Yoga is just stretching — it doesn't count as real exercise"
9. "HIIT is the best exercise for everyone"
10. "If you stop exercising, all benefits disappear immediately"
11. "Exercise only helps if you enjoy it"
12. "You need a gym membership to exercise effectively"

**Workplace Course (10 myths):**
1. "Burnout is about personal resilience, not job design"
2. "If you just manage your time better, workload won't be a problem"
3. "Stress is inevitable in high-paying jobs"
4. "Setting boundaries means you're not committed"
5. "Everyone else is handling this fine — it's just you"
6. "Mindfulness can solve structural workplace problems"
7. "If you're burned out, you should just quit"
8. "Asking for help is a sign of weakness"
9. "Your manager is responsible for your career advancement"
10. "Work-life balance is only for people without ambition"

**Digital Wellness Course (8 myths):**
1. "Screen addiction is a real clinical diagnosis"
2. "All screen time is equally harmful"
3. "Social media directly causes depression and anxiety"
4. "A digital detox will reset your mental health"
5. "Passive use is always worse than active use"
6. "You need to quit social media entirely to be mentally healthy"
7. "Technology is destroying teen mental health (as the PRIMARY cause)"
8. "There's a magic 2-hour daily screen time limit backed by science"

**Acceptance Criteria:**
- [ ] 30 flip cards added across 60 lessons
- [ ] Each myth paired with evidence-based fact
- [ ] Citations included in "back" content
- [ ] Visual icon on "front" (❌ or 🤔)

---

### Task 2.4: Increase Checkin Density by 50%
**Priority:** MEDIUM  
**Estimated Time:** 8-10 hours  
**Owner:** Content

**Current State:** ~60 Checkin instances across 60 lessons (1 per lesson avg)  
**Target State:** ~90 Checkin instances (1.5 per lesson avg)

**Add Scale-Type Checkins:**
```markdown
<Checkin type="scale" question="How confident do you feel applying this concept?" low="Not confident" high="Very confident" />

<Checkin type="scale" question="How relevant is this to your current situation?" low="Not relevant" high="Highly relevant" />

<Checkin type="scale" question="How motivated do you feel to try this strategy?" low="Not motivated" high="Very motivated" />
```

**Placement Strategy:**
- Add 1 scale Checkin mid-lesson (after key concept)
- Keep 1 reflect Checkin at end (application question)
- **Total:** 2 Checkins per lesson minimum

**Action Items:**
1. Audit all 60 lessons for Checkin count
2. Add 1 scale-type Checkin to lessons with only 1 Checkin
3. Ensure variety (confidence, relevance, motivation, self-assessment)
4. Test data persistence

**Acceptance Criteria:**
- [ ] 90+ Checkin instances across 60 lessons
- [ ] Mix of scale + reflect types
- [ ] Clear, specific questions
- [ ] All responses persist to database

---

## Phase 3: Polish & Consistency (Week 4)
**Professional Quality Standard**

### Task 3.1: Standardize Heading Hierarchy
**Priority:** MEDIUM  
**Estimated Time:** 4-6 hours  
**Owner:** Content

**Action Items:**
1. Audit all 60 lessons for heading structure
2. Fix redundant headings (e.g., "Model Explained" immediately after "The Model")
3. Ensure consistent hierarchy:
   - `##` for major sections
   - `###` for subsections
   - No `####` unless truly needed
4. Add subsection headings to break up large text blocks (>600 words)

**Example Fix:**
```markdown
BEFORE:
## The JD-R Model: Two Pathways to Two Outcomes
(content)
---
## The Dual-Process Pathway Explained

AFTER:
## The JD-R Model: Two Pathways to Two Outcomes

### The Dual-Process Mechanism
```

**Acceptance Criteria:**
- [ ] No redundant headings
- [ ] Consistent `##` / `###` usage
- [ ] Large sections broken into digestible subsections
- [ ] Clear visual hierarchy in rendered lessons

---

### Task 3.2: Add Safety Callouts Where Missing
**Priority:** MEDIUM-HIGH  
**Estimated Time:** 4-6 hours  
**Owner:** Content + Clinical Review

**Action Items:**
1. Audit all 60 lessons for clinical implications
2. Add warning callouts where appropriate:
   - **Movement Course:** When exercise is NOT sufficient (severe depression, suicidality, trauma triggers)
   - **Workplace Course:** When to seek professional help (harassment, severe burnout, suicidality)
   - **Digital Wellness Course:** When compulsive use crosses into clinical territory (functional impairment)
3. Use consistent safety callout format:

```markdown
<Callout type="warning" title="When to Seek Professional Help">

This lesson provides evidence-based education about [topic]. **It is not a substitute for professional assessment or treatment.**

Seek help NOW if you experience:
- [Red flag 1]
- [Red flag 2]
- [Red flag 3]

**Crisis resources:**
- **988 Suicide & Crisis Lifeline**: Call or text 988 (US)
- **Crisis Text Line**: Text HOME to 741741 (US)
- **International**: [findahelpline.com](https://findahelpline.com)

</Callout>
```

**Lessons Requiring Safety Callouts:**
- Movement: L1, L2 (depression), L3 (anxiety), L4 (PTSD), L6 (assessment), L20 (action plan)
- Workplace: L3 (burnout), L4 (burnout vs. depression), L9 (harassment), L17 (moral injury), L20 (escalation)
- Digital Wellness: L8 (social media & mental health), L11 (cyberbullying), L12 (problematic use), L20 (action plan)

**Acceptance Criteria:**
- [ ] All clinically-relevant lessons include safety callouts
- [ ] Consistent formatting and placement
- [ ] Crisis resources included
- [ ] Clear distinction between education and treatment

---

### Task 3.3: Remove/Fix Inline QuizQuestion Components
**Priority:** MEDIUM  
**Estimated Time:** 6-8 hours  
**Owner:** Dev + Content

**Issue:** 100 inline `<QuizQuestion>` components exist, but their data persistence and integration are unclear.

**Options:**
1. **Option A (Recommended):** Replace with `<Checkin type="reflect">` for consistency
2. **Option B:** Move to end-of-lesson quiz JSON files
3. **Option C:** Build proper QuizQuestion component and register in MDX

**Action Items:**
1. Audit all 100 QuizQuestion instances
2. Categorize by type:
   - Multiple-choice → move to quiz JSON
   - Reflection → convert to Checkin
   - Knowledge check → move to quiz JSON
3. Replace or migrate all 100 instances
4. Test data persistence

**Acceptance Criteria:**
- [ ] No orphaned QuizQuestion components
- [ ] All interactive elements use standardized components
- [ ] Data persistence confirmed for all interactions
- [ ] Consistent user experience across all lessons

---

## Phase 4: Analytics Instrumentation (Week 5)
**Revenue-Critical for Practice Licensing**

### Task 4.1: Connect Feedback to Metabase
**Priority:** HIGH  
**Estimated Time:** 8-10 hours  
**Owner:** Dev + Data

**Action Items:**
1. Verify post-lesson feedback data is saving to database
2. Create Metabase dashboard: "Lesson Helpfulness Scores"
3. Build reports:
   - Average helpfulness by lesson (1-10 scale)
   - Lessons with lowest scores (improvement targets)
   - Lessons with highest scores (content marketplace candidates)
   - Completion rate by lesson
   - Dropout points (where users stop progressing)
4. Add filters: course, track, date range
5. Share dashboard with stakeholders

**Acceptance Criteria:**
- [ ] Feedback data flows to Metabase
- [ ] Dashboard shows real-time lesson scores
- [ ] Actionable insights visible (which lessons to improve)
- [ ] Accessible to practice licensing decision-makers

---

### Task 4.2: Add Engagement Event Tracking
**Priority:** MEDIUM-HIGH  
**Estimated Time:** 10-12 hours  
**Owner:** Dev

**Action Items:**
1. Instrument analytics events for:
   - Interactive component interactions:
     - `scenario-choice-clicked`
     - `flip-card-flipped`
     - `body-map-region-selected`
     - `accordion-item-opened`
     - `slide-navigated`
   - Quiz events:
     - `quiz-started`
     - `quiz-passed`
     - `quiz-failed`
     - `quiz-retried`
   - Lesson events:
     - `lesson-started`
     - `lesson-completed`
     - `lesson-time-spent` (duration)
2. Send events to analytics backend (Metabase or custom)
3. Build Metabase report: "Engagement Heatmap"
   - Which components get the most interaction?
   - Which lessons have highest engagement?
   - Where do users spend the most time?

**Acceptance Criteria:**
- [ ] All key interactions fire analytics events
- [ ] Events tracked in Metabase
- [ ] Engagement heatmap report built
- [ ] Data informs content iteration decisions

---

## Timeline & Resource Allocation

| Phase | Duration | Owner | Effort (hours) |
|-------|----------|-------|----------------|
| **Phase 1: Critical Fixes** | 5-7 days | Content (80%), Dev (20%) | 26-33 hours |
| **Phase 2: Interactivity** | 10-14 days | Content (90%), Dev (10%) | 39-50 hours |
| **Phase 3: Polish** | 5-7 days | Content (80%), Clinical (20%) | 14-20 hours |
| **Phase 4: Analytics** | 5-7 days | Dev (80%), Data (20%) | 18-22 hours |
| **TOTAL** | 25-35 days | Mixed | 97-125 hours |

**Team Composition:**
- **Content Lead:** 1 FTE (80 hours)
- **Developer:** 1 FTE (40 hours)
- **Clinical Reviewer:** 0.2 FTE (8 hours)
- **Data Analyst:** 0.1 FTE (5 hours)

---

## Risk Mitigation

### Risk 1: Timeline Overrun
**Mitigation:** Prioritize Phase 1 & 2 (critical + interactivity). Phase 3 & 4 can be parallelized or delayed.

### Risk 2: Component Development Blockers
**Mitigation:** All components (BodyMap, InteractiveScenario, FlipCard) already exist and are tested in therapeutic courses. This is content work, not dev work.

### Risk 3: Content Quality Drops Due to Speed
**Mitigation:** Use therapeutic course lessons as templates. Adapt, don't create from scratch.

### Risk 4: Analytics Integration Delays
**Mitigation:** Phase 4 is independent of user-facing content. Can launch courses before analytics is fully instrumented.

---

## Success Criteria

### **Definition of Done:**
✅ **Phase 1 Complete:**
- 60/60 lessons have quizzes
- 60/60 lessons have post-lesson feedback
- 0 UI spacing/formatting issues

✅ **Phase 2 Complete:**
- 4 BodyMap instances in Movement course
- 20+ InteractiveScenarios across all courses
- 30+ FlipCards across all courses
- 90+ Checkin prompts (50% increase)

✅ **Phase 3 Complete:**
- Standardized heading hierarchy
- Safety callouts in all clinically-relevant lessons
- No inline QuizQuestion orphans

✅ **Phase 4 Complete:**
- Lesson feedback flows to Metabase
- Engagement events tracked and visualized
- "Top-Performing Lessons" report built

### **User-Facing Outcome:**
- Optimization courses feel **as engaging** as therapeutic courses
- Post-lesson feedback gives users **agency and voice**
- Quiz coverage is **complete** (100%)
- UI is **professional and consistent**
- Practice licensing prospects see **real-time improvement data**

---

## Next Steps

1. **Approve this plan** (stakeholder sign-off)
2. **Assign owners** (Content Lead, Dev Lead, Clinical Reviewer)
3. **Kick off Phase 1** (this week)
4. **Daily stand-ups** during Phases 1-2 (critical path)
5. **Weekly reviews** during Phases 3-4
6. **Final QA pass** before launch (test all 60 lessons in production)

**Target Launch Date:** End of Week 5 (4-5 weeks from today)
