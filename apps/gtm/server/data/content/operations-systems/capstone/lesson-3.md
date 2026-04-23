---
title: "System Assembly: Outreach + Sequences + CRM"
duration: "60 min"
track: "Operations & Systems"
course: "Course 48: Capstone — Your Complete Acquisition System"
lesson: 3
---

## Assembly Workshop 2: The Outreach Engine

In Lesson 2 you updated your ICP, positioning, and channel strategy. Now you connect the middle of the system: the outreach sequences that start conversations, the CRM that tracks them, and the AI agent that automates the handoffs.

Have these ready:
- Your top-performing email and LinkedIn sequences
- Email deliverability data (if you have it — GlockApps, MailReach, or your ESP dashboard)
- Your CRM open in another tab
- Zapier/Make automation list

<InsightCard icon="⚙️" title="What You're Building Here">
A clean outreach engine: prospects flow from your research agent → into tested sequences → replies flow into CRM → CRM routes next actions back to you. Every step should be automated or have a documented human-in-the-loop gate. By the end of this lesson, that loop is verified and gaps are identified.
</InsightCard>

## Part 1: Outreach Sequence Audit

You have sequences from Courses 8, 24, and 25. Which are actually working?

<TemplateBuilder title="Sequence Performance Audit" persistKey="capstone-L3-sequences" sections={[{id:"seq1",title:"Sequence 1 (Your primary cold email sequence)",fields:[{id:"s1-name",label:"Sequence name",placeholder:"e.g., Primary B2B SaaS VP Sales cold sequence",type:"text"},{id:"s1-steps",label:"Number of steps and channels",placeholder:"e.g., 5-step: Email Day 1, Email Day 3, LinkedIn Day 5, Email Day 8, Email Day 14",type:"text"},{id:"s1-volume",label:"Total contacts run through this sequence",placeholder:"e.g., 150 contacts over 8 weeks",type:"text"},{id:"s1-open",label:"Open rate (if tracked)",placeholder:"e.g., 48% average open rate",type:"text"},{id:"s1-reply",label:"Reply rate (positive + negative combined)",placeholder:"e.g., 4.2% reply rate (6 positive, 1 unsubscribe)",type:"text"},{id:"s1-positive",label:"Positive reply rate (interested + curious + booked)",placeholder:"e.g., 2.8% positive reply rate",type:"text"},{id:"s1-verdict",label:"Keep as-is, Optimize, or Replace?",placeholder:"e.g., Optimize — Step 2 is weak (0.5% reply rate), Step 1 performing well",type:"text"}]},{id:"seq2",title:"Sequence 2",fields:[{id:"s2-name",label:"Sequence name",placeholder:"e.g., LinkedIn connection + follow-up sequence",type:"text"},{id:"s2-steps",label:"Number of steps and channels",placeholder:"e.g., 3-step LinkedIn: connect + personalized note, follow-up after accept, DM if no reply",type:"text"},{id:"s2-volume",label:"Total contacts run through this sequence",placeholder:"e.g., 60 connection requests",type:"text"},{id:"s2-reply",label:"Reply / acceptance rate",placeholder:"e.g., 40% connection acceptance, 8% reply rate post-connect",type:"text"},{id:"s2-verdict",label:"Keep as-is, Optimize, or Replace?",placeholder:"e.g., Keep — small volume but high quality conversations",type:"text"}]},{id:"improvements",title:"Top 3 Sequence Improvements",fields:[{id:"improve1",label:"Improvement 1",placeholder:"e.g., Rewrite Step 2 email — currently too long, add case study link in Step 3",type:"textarea"},{id:"improve2",label:"Improvement 2",placeholder:"e.g., Test a new subject line variant — current SL is getting 48% open but could test curiosity-based SL",type:"textarea"},{id:"improve3",label:"Improvement 3",placeholder:"e.g., Add a Day 21 breakup email — currently sequences die at Day 14, extend with a low-pressure last touch",type:"textarea"}]}]} />

Now rate the single most important fix to make before your sprint:

<RangeSlider label="How confident are you in your best sequence's ability to book calls at the volume you need?" min={1} max={10} lowLabel="Not at all — needs a full rewrite" highLabel="Very confident — ready to scale" persistKey="capstone-L3-sequence-confidence" />

## Part 2: Deliverability Health Check

Before scaling any sequence, verify your email infrastructure is healthy. A deliverability problem at scale becomes a catastrophe.

<InteractiveChecklist title="Deliverability Health Check" persistKey="capstone-L3-deliverability" items={["Sending domains are aged 30+ days before use","SPF, DKIM, and DMARC records are set on all sending domains","Email warming is complete (50+ emails/day capacity per inbox)","Google Postmaster or Mailtrap showing 'High' domain reputation","No sending domain is currently blacklisted (check MXToolbox)","Daily send volume is under 40 emails per inbox per day","Bounce rate is under 3% on recent campaigns","Unsubscribe rate is under 0.3% on recent campaigns"]} />

<ExampleCard label="The Deliverability Disaster That Could Have Been Avoided">
James was getting consistent 4.5% reply rates on his cold email sequence. He decided to 10x volume for his sprint: from 30 emails/day to 300/day on the same domain.

By Day 5, his open rates had dropped to 8%. His emails were landing in spam.

Recovery took 3 weeks. The sprint window was half over.

The fix: he should have added 2 new warmed sending domains and spread volume across 10 inboxes at 30 emails/day each. Same total volume, no deliverability damage.

Lesson: volume scales horizontally (more domains/inboxes), not vertically (more sends per domain).
</ExampleCard>

## Part 3: CRM Pipeline Health Check

Your CRM is the heartbeat of the system. If it's stale or misconfigured, every downstream process breaks.

<TemplateBuilder title="CRM Pipeline Audit" persistKey="capstone-L3-crm-audit" sections={[{id:"pipeline-health",title:"Pipeline Health",fields:[{id:"total-deals",label:"Total active deals in pipeline",placeholder:"e.g., 12 deals across 4 stages",type:"text"},{id:"oldest-deal",label:"Oldest deal (last activity date)",placeholder:"e.g., Deal #3 — last activity 45 days ago, should probably be closed lost",type:"text"},{id:"ghost-deals",label:"Ghost deals (no activity in 21+ days) — count and describe",placeholder:"e.g., 3 ghost deals — one is truly dead, two need a follow-up email this week",type:"textarea"},{id:"stages",label:"Current pipeline stages — are they still accurate?",placeholder:"e.g., Stages: Prospect → Reply → Call Booked → Discovery → Proposal → Closed Won/Lost. Still accurate.",type:"textarea"}]},{id:"hygiene",title:"Data Quality",fields:[{id:"missing-fields",label:"Contacts with missing required fields",placeholder:"e.g., 40% of contacts missing ICP Fit Score field — need to score retroactively",type:"text"},{id:"notes-quality",label:"Note quality assessment — are notes actionable or vague?",placeholder:"e.g., Most notes are just timestamps. Need to add context (what was discussed, what's the next step, why they haven't replied)",type:"textarea"},{id:"automation-gaps",label:"Manual steps that should be automated",placeholder:"e.g., When a reply comes in, I manually create a deal. Should be auto-created via Zapier.",type:"textarea"}]},{id:"actions",title:"Cleanup Actions",fields:[{id:"close-lost",label:"Deals to close as Lost (list them)",placeholder:"e.g., Acme Corp (45 days no response after 3 follow-ups), TechCo (told me to check back in 6 months)",type:"textarea"},{id:"immediate-followups",label:"Deals needing immediate follow-up this week",placeholder:"e.g., DataFlow Inc — sent proposal 8 days ago, no response. Call tomorrow.",type:"textarea"}]}]} />

## Part 4: Outreach → CRM Data Flow Mapping

The most important integration in your system: how does a reply become a pipeline deal with zero manual work?

<TemplateBuilder title="Outreach → CRM Data Flow" persistKey="capstone-L3-dataflow" sections={[{id:"current-flow",title:"Current Flow (Map Every Step)",fields:[{id:"step1",label:"Step 1: Prospect enters sequence",placeholder:"e.g., CSV upload to Instantly after manual review from Apollo agent output",type:"textarea"},{id:"step2",label:"Step 2: Reply detection",placeholder:"e.g., Instantly detects positive reply, flags in dashboard",type:"textarea"},{id:"step3",label:"Step 3: Reply → CRM",placeholder:"e.g., Zapier automation: Instantly reply webhook → creates deal in HubSpot at 'Reply' stage with contact info",type:"textarea"},{id:"step4",label:"Step 4: Task creation",placeholder:"e.g., HubSpot automation: new deal at 'Reply' stage → creates task 'Respond within 24 hours' assigned to me",type:"textarea"},{id:"step5",label:"Step 5: Meeting booked",placeholder:"e.g., After I respond, prospect clicks Calendly link → Calendly → Zapier → updates HubSpot deal to 'Call Booked'",type:"textarea"}]},{id:"gaps",title:"Gaps to Fix",fields:[{id:"broken",label:"Steps that are broken or missing",placeholder:"e.g., LinkedIn DM replies are not auto-logged. I have to manually copy them into HubSpot notes.",type:"textarea"},{id:"sprint-fixes",label:"Which gaps to fix before the sprint starts",placeholder:"e.g., Fix 1: LinkedIn DM logging (research Zapier + LinkedIn integration). Fix 2: Auto-create deals from all reply types, not just positive.",type:"textarea"}]}]} />

## Part 5: AI Outreach Agent Configuration

Your AI outreach agent from Course 27 should be handling personalization at scale. Check its status:

<SlideNavigation>
<Slide title="What the Agent Should Do">

The outreach agent's job:

1. **Input:** Scored prospect list from research agent (name, title, company, ICP score, trigger events)
2. **Process:** For each prospect, generate a personalized first line referencing their specific context
3. **Output:** Draft email sequence Step 1 with personalized first line inserted
4. **Gate:** Human reviews and approves batch before sending
5. **Feed:** Approved batches load directly into sequence tool (Instantly, Smartlead, etc.)

If your agent isn't doing all five steps, identify which step is missing.

</Slide>
<Slide title="Quality Test">

Run this test on your outreach agent:

1. Give it 5 prospect profiles from your ICP
2. Review the 5 personalized first lines it generates
3. Score each on a 1-5 scale: would this line make YOU reply if you received it?
4. Average score of 4+ = agent is working. Average of 3 or below = prompt needs refinement.

Weak first lines usually fail because: they're too complimentary ("I loved your LinkedIn post on..."), too generic ("I noticed you're in [industry]..."), or they mention something the prospect doesn't care about.

Strong first lines reference: a specific metric the company just published, a trigger event (new hire, funding, product launch), or a pain that's visible in public data.

</Slide>
<Slide title="Sprint Volume Planning">

Based on your deliverability audit and sequence performance, calculate your sprint targets:

- Sending inboxes available: ___ × 30 emails/day max = ___ emails/day capacity
- 5 sending days/week × ___ emails/day = ___ emails/week
- Target reply rate: ___% based on sequence performance
- Expected weekly replies: ___
- Expected weekly positive replies: ___
- Expected weekly calls booked: ___

These numbers become your Week 1 sprint targets in Lesson 6.

</Slide>
</SlideNavigation>

<TemplateBuilder title="AI Outreach Agent Status" persistKey="capstone-L3-agent" sections={[{id:"agent-config",title:"Agent Configuration",fields:[{id:"agent-status",label:"Current agent status",placeholder:"e.g., Configured in Claude Projects, running on manual trigger",type:"text"},{id:"first-line-quality",label:"First-line quality score (1-5 from test above)",placeholder:"e.g., 3.8/5 — decent but tends to over-compliment. Updating prompt to focus on specific trigger events.",type:"text"},{id:"sprint-volume",label:"Planned weekly outreach volume for sprint",placeholder:"e.g., 150 emails/week across 3 inboxes (50/day each)",type:"text"},{id:"agent-improvements",label:"Agent prompt improvements needed before sprint",placeholder:"e.g., Add instruction to always reference a trigger event. Remove 'I loved your post on X' template.",type:"textarea"}]}]} />

## Part 6: Integration Verification

<InteractiveChecklist title="Outreach System Integration Checklist" persistKey="capstone-L3-integration" items={["Email sequences are updated with real A/B test learnings","All sending domains have passed deliverability check","CRM pipeline has been cleaned (ghost deals closed, stages verified)","Outreach → CRM automation is working end-to-end","AI outreach agent is producing quality personalized first lines","Sprint volume is calculated based on real infrastructure capacity","Top 3 sequence improvements are documented and scheduled for Week 1 sprint"]} />

<ExampleCard label="Case Study: The System That Scaled">
Before the capstone, Priya had 4 sequences running with 47 contacts across all of them. She was getting 2 replies per week.

During system assembly, she discovered:
- Her best sequence (Step 1 only) had a 6.2% reply rate
- The follow-up steps had never been sent — Instantly wasn't configured properly
- Her CRM had 11 ghost deals she'd forgotten to close
- Her research agent was using her v1 ICP criteria (targeting companies of 10-50 employees when her closed deals were all 100-300 employees)

After assembly:
- Fixed the sequence automation (all 5 steps now send)
- Updated research agent with v2 ICP
- Cleaned CRM (11 deals closed, 3 moved forward)
- Sprint Week 1: 120 outreach, 8 replies (6.7% rate), 3 calls booked

The numbers didn't change because she worked harder. They changed because the system was actually working correctly.
</ExampleCard>

## Part 7: Outreach System Summary

<TemplateBuilder title="Outreach System: Assembled State" persistKey="capstone-L3-summary" sections={[{id:"assembled",title:"What Is Now Assembled",fields:[{id:"top-sequences",label:"Your top 1-2 sequences (names and verdict)",placeholder:"e.g., Primary B2B cold email (optimize Step 2), LinkedIn DM sequence (keep as-is)",type:"textarea"},{id:"crm-status",label:"CRM pipeline status post-cleanup",placeholder:"e.g., 9 active deals across 4 stages. 3 ghost deals closed. All deals have next-action tasks.",type:"textarea"},{id:"agent-status-final",label:"AI outreach agent status",placeholder:"e.g., Running with updated prompt. Generating 20 first-line drafts per batch. Human review before send.",type:"textarea"}]},{id:"sprint-readiness",title:"Sprint Readiness",fields:[{id:"ready-to-send",label:"Are you ready to start Week 1 outreach immediately after sprint planning (Lesson 6)?",placeholder:"e.g., Yes — sequences are loaded, infrastructure is verified, agent is ready. Just need to finalize sprint targets.",type:"text"},{id:"week1-priority",label:"Your single most important outreach action in Week 1",placeholder:"e.g., Run the updated research agent with v2 ICP criteria, review 50 prospects, load 30 approved into Step 1 of primary sequence",type:"textarea"}]}]} />

<InteractiveChecklist title="Lesson 3 Completion Checklist" persistKey="capstone-L3-actions" items={["Sequence performance audit completed — top sequences identified","Deliverability health check passed (or issues documented for sprint Week 1)","CRM pipeline cleaned — ghost deals closed, all active deals have next-action tasks","Outreach → CRM data flow mapped — gaps identified","AI outreach agent status assessed — improvements documented","Sprint outreach volume calculated based on real infrastructure","System Assembly Summary completed above"]} />
