---
title: "Week 1 Execution & Review"
duration: "90 min"
track: "Operations & Systems"
course: "Course 48: Capstone — Your Complete Acquisition System"
lesson: 7
---

## Week 1 Review: Launch and Calibrate

Welcome to your first sprint review. You've completed Week 1. That alone puts you in the top 10% of people who planned a sprint — most people plan and never start.

This review session has two parts:
1. **Review (30 minutes):** Document what happened, capture your numbers, identify friction points
2. **Planning (30 minutes):** Make course corrections and set Week 2 targets

Come to this session with your sprint tracker open. You need real numbers, not estimates.

<InsightCard icon="📊" title="The Review Mindset">
Week 1 is almost never perfect. Systems break. Automations fail. Sequences underperform. Calls run over. Life interrupts. None of that is failure — it is data. The review session is where you learn faster than the people who just execute without looking back.
</InsightCard>

## Part 1: Week 1 Activity Log Review

Start with the facts. What actually happened?

<TemplateBuilder title="Week 1 Activity Log" persistKey="capstone-L7-activity" sections={[{id:"planned-vs-actual",title:"Planned vs Actual",fields:[{id:"emails-planned",label:"Emails planned (from Lesson 6 sprint plan)",placeholder:"e.g., 120",type:"text"},{id:"emails-sent",label:"Emails actually sent",placeholder:"e.g., 87 — ran into deliverability issue on Day 3, paused to investigate",type:"text"},{id:"calls-planned",label:"Discovery calls planned",placeholder:"e.g., 0 (Week 1 was outreach-focused)",type:"text"},{id:"calls-held",label:"Discovery calls actually held",placeholder:"e.g., 1 — from a referral that came in unexpectedly",type:"text"},{id:"other-planned",label:"Other planned activities",placeholder:"e.g., Referral ask sequence to 10 existing clients, update proposal template",type:"text"},{id:"other-actual",label:"Other activities completed",placeholder:"e.g., Referral sequence sent to 10 clients (done). Proposal template — not done yet, pushed to Week 2.",type:"text"}]},{id:"time",title:"Time Investment",fields:[{id:"hours-planned",label:"Hours planned for sprint activities",placeholder:"e.g., 6 hours",type:"text"},{id:"hours-actual",label:"Hours actually spent",placeholder:"e.g., 5.5 hours — Friday review ran long, Saturday I skipped",type:"text"},{id:"time-surprises",label:"Where did time go differently than expected?",placeholder:"e.g., Research agent produced 40 prospects but I spent 90 min reviewing/scoring them manually. Should have tightened criteria to reduce review burden.",type:"textarea"}]}]} />

## Part 2: Baseline Metrics Capture

These are your Week 1 numbers. They become the baseline for Weeks 2-4 comparison.

<TemplateBuilder title="Week 1 Baseline Metrics" persistKey="capstone-L7-metrics" sections={[{id:"outreach-metrics",title:"Outreach Metrics",fields:[{id:"emails-sent-w1",label:"Emails sent",placeholder:"e.g., 87",type:"text"},{id:"open-rate",label:"Open rate",placeholder:"e.g., 51% (45 opened)",type:"text"},{id:"reply-rate",label:"Reply rate (all replies)",placeholder:"e.g., 3.4% (3 replies)",type:"text"},{id:"positive-reply-rate",label:"Positive reply rate",placeholder:"e.g., 2.3% (2 positive — 1 interested, 1 book a call)",type:"text"},{id:"calls-booked",label:"Discovery calls booked",placeholder:"e.g., 1 from outreach + 1 from referral = 2 total booked",type:"text"}]},{id:"pipeline-metrics",title:"Pipeline Metrics",fields:[{id:"new-deals",label:"New deals created in CRM this week",placeholder:"e.g., 2 — both from replies",type:"text"},{id:"proposals-sent",label:"Proposals sent",placeholder:"e.g., 0 — calls haven't happened yet",type:"text"},{id:"closes",label:"Deals closed",placeholder:"e.g., 0",type:"text"},{id:"pipeline-value",label:"Total pipeline value added",placeholder:"e.g., $0 formally, but 2 qualified conversations in progress",type:"text"}]},{id:"goal2-metrics",title:"Sprint Goal 2 Metrics (if applicable)",fields:[{id:"g2-activity",label:"Goal 2 activities completed",placeholder:"e.g., Referral sequence: sent to all 10 clients. 4 replied (40% open/reply rate). 1 mentioned someone who might be a fit.",type:"text"},{id:"g2-result",label:"Goal 2 results so far",placeholder:"e.g., 1 referral lead identified. Reaching out to them in Week 2.",type:"text"}]}]} />

## Part 3: System Friction Analysis

Something broke or slowed you down this week. Identifying it clearly is the most valuable part of this review.

<ProgressiveReveal title="Common Week 1 Friction Points" persistKey="capstone-L7-friction-guide">
<RevealSection title="Infrastructure Friction">

**Symptoms:** Lower than expected email volume, deliverability issues, automation failures

**Common causes:**
- Email warm-up not complete — inboxes at lower capacity than expected
- Zapier/Make automation misconfigured — replies not flowing to CRM
- Research agent output quality lower than expected — too many prospects to manually review
- Sequence tool (Instantly, Smartlead) settings incorrect — emails sending at wrong time

**Fix approach:** Spend 90 minutes in Week 2 fixing the specific failure point, not the entire system. Isolate, diagnose, fix.

</RevealSection>
<RevealSection title="Execution Friction">

**Symptoms:** Planned hours not used, activities delayed or skipped, fatigue

**Common causes:**
- Time blocks weren't actually protected — meetings invaded sprint time
- Research takes longer than estimated — prospect review is manual and slow
- Personalization is taking 10 minutes per email instead of 3 — AI agent needs better prompts
- Emotional resistance — starting cold outreach feels uncomfortable

**Fix approach:** Time blocks need external protection (close email, turn off Slack). AI personalization prompts need refinement. Emotional resistance usually fades after the first 10 emails are sent.

</RevealSection>
<RevealSection title="Messaging Friction">

**Symptoms:** Open rates okay, reply rates below 3%

**Common causes:**
- Subject line isn't matching the first line — disconnect creates confusion
- First line (personalization) is too generic or too complimentary
- CTA is too big — asking for 30-minute call instead of 10-minute check-in
- Value proposition isn't landing — need to test a different angle

**Fix approach:** A/B test subject lines first (biggest lever). Then test first lines. Finally test CTA. Change one variable at a time.

</RevealSection>
</ProgressiveReveal>

<TemplateBuilder title="Week 1 Friction Report" persistKey="capstone-L7-friction" sections={[{id:"friction",title:"Friction Points",fields:[{id:"friction1",label:"Friction Point 1 (specific description)",placeholder:"e.g., Email deliverability: open rates dropped to 18% on Day 4. Investigated: one domain got flagged. Paused that domain, shifted volume to other 2 inboxes.",type:"textarea"},{id:"friction2",label:"Friction Point 2",placeholder:"e.g., Research agent review: agent output 45 prospects but 30% didn't match my ICP on closer inspection. Tightening ICP criteria in agent prompt.",type:"textarea"},{id:"friction3",label:"Friction Point 3 (if any)",placeholder:"e.g., Time blocks: Tuesday time block got eaten by a client call that ran 45 minutes over. Need to put a hard stop on client calls during sprint blocks.",type:"textarea"}]},{id:"surprises",title:"Positive Surprises",fields:[{id:"positive",label:"What went better than expected?",placeholder:"e.g., The referral ask sequence got a 40% reply rate — much higher than my cold outreach. Referral strategy is producing faster than expected. Want to expand it in Week 2.",type:"textarea"}]}]} />

## Part 4: Course Corrections for Week 2

Based on Week 1 data, make specific adjustments. The rule: small tweaks, not wholesale changes.

<DecisionTree title="Week 1 Diagnosis: What to Adjust" persistKey="capstone-L7-diagnosis" startNodeId="start" nodes={[{id:"start",content:"What is your biggest Week 1 problem?",choices:[{label:"Volume too low — sent far fewer emails than planned",nextNodeId:"volume"},{label:"Replies too low — sent target volume but &lt;2% reply rate",nextNodeId:"replies"},{label:"Replies coming but no calls booked",nextNodeId:"calls"},{label:"On track — hit targets within 20%",nextNodeId:"ontrack"}]},{id:"volume",content:"Volume problem: The root cause is almost always time (protected time blocks were invaded), infrastructure (deliverability cap or tool issue), or process (personalization taking too long). Identify which one and fix only that. Don't change your messaging or ICP yet — you don't have enough data.",isTerminal:true,outcome:"neutral"},{id:"replies",content:"Messaging problem: 2%+ emails opened but &lt;2% replied. Test 1 new subject line with a different angle (curiosity vs direct benefit vs social proof). Test 1 new first line approach (trigger event vs specific observation vs challenge). Run each variant to 30 contacts minimum before drawing conclusions.",isTerminal:true,outcome:"neutral"},{id:"calls",content:"CTA problem: Replies coming but not converting to calls. Read the actual reply language. Are people interested but want more info first? Shorten your follow-up, make the ask smaller ('15-minute check-in' instead of '30-minute call'). Add a specific calendar link in your first follow-up.",isTerminal:true,outcome:"neutral"},{id:"ontrack",content:"On track! Week 2 focus: Maintain the activities that are working, run a controlled A/B test to improve the weaker metric (usually reply rate → positive reply rate conversion), and start building pipeline if you have any replies in progress.",isTerminal:true,outcome:"positive"}]} />

<TemplateBuilder title="Week 2 Course Corrections" persistKey="capstone-L7-corrections" sections={[{id:"changes",title:"Specific Changes for Week 2",fields:[{id:"keep",label:"What to keep doing (working well)",placeholder:"e.g., Monday and Tuesday morning email sends — highest reply rate on those days. Referral ask sequence — keep following up with non-responders.",type:"textarea"},{id:"change1",label:"Change 1 (specific and small)",placeholder:"e.g., Rewrite Step 1 email subject line. Current: 'Quick question about [Company]' — too generic. Testing: '[Trigger event] — quick thought' for the next 30 contacts.",type:"textarea"},{id:"change2",label:"Change 2 (specific and small)",placeholder:"e.g., Tighten research agent ICP prompt: add company size filter (50-200 employees only) and trigger event filter (VP of Sales hired in last 90 days).",type:"textarea"},{id:"stop",label:"What to stop doing (not working, not worth the time)",placeholder:"e.g., LinkedIn DM outreach — 15 connection requests, 4 accepted, 0 replied. Pausing for now, focus on email where I'm getting data.",type:"textarea"}]}]} />

## Part 5: Emotional Check-In

This is not optional. Sprint burnout is real and it kills execution quality in Weeks 3-4.

<RangeSlider label="Energy and motivation level after Week 1" min={1} max={10} lowLabel="Exhausted and discouraged" highLabel="Energized and momentum" persistKey="capstone-L7-energy" />

<RangeSlider label="Confidence in hitting your sprint targets" min={1} max={10} lowLabel="Targets feel unrealistic" highLabel="Targets feel achievable with effort" persistKey="capstone-L7-confidence" />

If you rated energy below 5: **That's normal for Week 1.** The launch week is the hardest because you're building new habits while fixing new problems. Week 2 will have fewer surprises.

If confidence is below 5: **Revisit your targets.** Unrealistic targets kill sprints faster than any other factor. A 20% adjustment to a target you can actually hit is worth more than an aspirational target you abandon.

## Part 6: Week 2 Targets

<TemplateBuilder title="Week 2 Daily Targets" persistKey="capstone-L7-w2-targets" sections={[{id:"targets",title:"Week 2 Commitments",fields:[{id:"w2-outreach",label:"Outreach volume target for Week 2",placeholder:"e.g., 100 emails (adjusted down from 120 until deliverability issue is resolved)",type:"text"},{id:"w2-calls",label:"Discovery call target for Week 2",placeholder:"e.g., 2 calls — 1 already booked from Week 1, 1 more to book from replies",type:"text"},{id:"w2-focus",label:"Week 2 primary focus (the one thing that matters most)",placeholder:"e.g., Reply rate improvement — testing new subject line variant on 30 contacts, new first line on 30 contacts",type:"textarea"},{id:"w2-goal2",label:"Goal 2 activities for Week 2",placeholder:"e.g., Follow up with 3 non-responders from referral sequence. Meet with 1 referral lead who replied.",type:"text"}]}]} />

<InsightCard icon="💪" title="Week 1 Done — You're a Sprint Runner Now">
The most valuable thing Week 1 gives you is not results — it's data. You now know your real reply rate, your real deliverability capacity, how long personalization actually takes, and where the friction is. Most founders who started the same week with the same plan are doing something different: they're not tracking, not reviewing, and not adjusting. You are.

That discipline is what separates founders who generate predictable pipeline from founders who get lucky sometimes. Keep going.
</InsightCard>

<InteractiveChecklist title="Week 1 Review Completion Checklist" persistKey="capstone-L7-actions" items={["Week 1 activity log completed with real numbers (not estimates)","Baseline metrics captured in the tracker above","Sprint tracker spreadsheet updated with Week 1 totals","Top 3 friction points identified and root causes diagnosed","At least 1 course correction for Week 2 is specific and actionable","Week 2 targets set (adjusted from original plan if needed)","Energy and confidence rated honestly — if below 5, flag for attention","Evidence captured: screenshot of sprint tracker, sent email count, or CRM pipeline snapshot"]} />
