---
title: "System Assembly: Retention + Expansion + Advocacy"
duration: "55 min"
track: "Operations & Systems"
course: "Course 48: Capstone — Your Complete Acquisition System"
lesson: 5
---

## Assembly Workshop 4: Closing the Loop

You've assembled the acquisition front-end (Lesson 2), the outreach engine (Lesson 3), and the conversion system (Lesson 4). This lesson closes the loop.

A customer who stays is worth 5x more than a new customer. A customer who expands is worth 10x. A customer who refers a friend who becomes a customer — that's the compounding machine that makes the entire system multi-million dollar.

Have these ready:
- Your onboarding playbook (Course 36)
- Your health scoring model (Course 37)
- Your expansion trigger list (Course 38)
- Your advocacy playbook (Course 39)
- Any actual customer data you have (churn events, expansion conversations, referrals)

<InsightCard icon="🔄" title="The Loop That Compounds">
Acquisition → Conversion → Retention → Advocacy → Acquisition. Every customer you keep reduces the acquisition burden. Every referral they generate lowers your cost per customer. Every testimonial they provide improves your conversion rate. The retention system doesn't just reduce churn — it funds and accelerates everything upstream.
</InsightCard>

## Part 1: Onboarding System Review

The first 30 days of a customer relationship determine whether they stay for 12. Bad onboarding is the most common cause of preventable churn.

<RangeSlider label="How confident are you in your current onboarding experience?" min={1} max={10} lowLabel="Disorganized — customers are confused" highLabel="Smooth — customers hit value in days not weeks" persistKey="capstone-L5-onboarding-confidence" />

<TemplateBuilder title="Onboarding Journey Review" persistKey="capstone-L5-onboarding" sections={[{id:"milestones",title:"Milestone Map",fields:[{id:"milestone1",label:"Day 1 — What does the customer receive and do?",placeholder:"e.g., Welcome email with login, onboarding call scheduled, questionnaire to complete. First value: they feel organized and excited.",type:"textarea"},{id:"milestone2",label:"Day 7 — What's the first value milestone?",placeholder:"e.g., Onboarding call completed, their ICP defined in the system, first sequence drafted and reviewed. First tangible output.",type:"textarea"},{id:"milestone3",label:"Day 30 — What does success look like?",placeholder:"e.g., First 100 outreach sent, 3+ replies, 1 call booked. They can see the system is working.",type:"textarea"},{id:"milestone4",label:"Day 90 — What's the retention milestone?",placeholder:"e.g., 12+ calls booked, 2+ proposals sent, first deal closed or in negotiation. ROI is visible.",type:"textarea"}]},{id:"reality",title:"Reality Check",fields:[{id:"actual-time",label:"What is your actual time-to-first-value?",placeholder:"e.g., Supposed to be Day 7. Reality: Day 14-21 for most customers because the onboarding call takes 2-3 reschedules.",type:"text"},{id:"dropout-point",label:"Where do customers disengage or get stuck?",placeholder:"e.g., After the first onboarding call, the next 2 weeks feel undefined. They don't know what to do and I'm not proactively reaching out.",type:"textarea"},{id:"improvements",label:"Top 2 onboarding improvements before the sprint",placeholder:"e.g., (1) Add a Day 3 check-in email with 3 specific actions for this week. (2) Create a client-facing onboarding tracker so they can see their progress.",type:"textarea"}]}]} />

<ExampleCard label="The Onboarding That Saved 40% of Churn">
David was losing 3-4 customers per quarter in months 2-3. Exit interviews revealed the same pattern: they felt like they'd been handed off after the sale and weren't getting proactive support.

His fix was a simple 30-day onboarding sequence:
- Day 1: Welcome email + 90-minute kickoff call invite
- Day 3: "Your first week checklist" email (3 concrete actions)
- Day 7: Check-in DM: "How did [specific action] go?"
- Day 14: Progress review email (show what they've accomplished)
- Day 21: "Month 1 wins" celebration + set Month 2 goals
- Day 30: Month 1 results review call

Churn in months 2-3 dropped from 32% to 11%. Same service, same price. Different experience.
</ExampleCard>

## Part 2: Health Scoring Model Review

Your health score predicts which customers are at risk of churning — before they tell you they're leaving.

<SlideNavigation>
<Slide title="What Makes a Good Health Score">

A useful health score tracks signals that are:
1. **Observable** — you can measure them without asking the customer
2. **Leading indicators** — they change before churn behavior, not after
3. **Actionable** — a change in score triggers a specific action

Examples of good signals: login frequency, product usage depth, response rate to your check-ins, milestone completion rate, NPS (if you collect it), number of stakeholders engaged.

Examples of bad signals: "gut feel about the relationship," how much you like them, how often they reply to general emails.

</Slide>
<Slide title="The 3-Color Model">

Most founders find a simple 3-color model is sufficient:

**Green (Healthy):** 3+ of your key signals are positive. No immediate action needed. Standard check-in at regular cadence.

**Yellow (At Risk):** 1-2 key signals have turned negative. Proactive reach-out within 48 hours. Goal: understand what changed and get back on track.

**Red (Critical):** 3+ signals are negative or customer has expressed dissatisfaction. Escalation: founder-to-founder call. Intervention plan within 7 days.

</Slide>
<Slide title="Calibration Check">

A health scoring model is useful only if it has predicted real events. Ask yourself:

- Did your model flag any customers as yellow or red before they churned? (If yes, it's working)
- Did it miss any churns — customers you thought were green who left? (Those are false negatives — add the signals you missed)
- Did it over-alert — flagging customers who were fine? (Those are false positives — recalibrate thresholds)

</Slide>
</SlideNavigation>

<TemplateBuilder title="Health Scoring Model v2" persistKey="capstone-L5-health" sections={[{id:"signals",title:"Health Signals",fields:[{id:"signal1",label:"Signal 1: Name + Green/Yellow/Red thresholds",placeholder:"e.g., Weekly engagement rate. Green: >60% of weekly touchpoints responded. Yellow: 30-60%. Red: &lt;30% or 2+ unanswered check-ins.",type:"textarea"},{id:"signal2",label:"Signal 2: Name + Green/Yellow/Red thresholds",placeholder:"e.g., Milestone completion rate. Green: On track (completed milestone within 7 days of target). Yellow: 1-2 weeks behind. Red: 3+ weeks behind or milestone skipped.",type:"textarea"},{id:"signal3",label:"Signal 3: Name + Green/Yellow/Red thresholds",placeholder:"e.g., Proactive communication. Green: Customer reaches out with questions/updates. Yellow: Only responds when I reach out. Red: Not responding to my outreach.",type:"textarea"}]},{id:"calibration",title:"Calibration",fields:[{id:"predicted-churn",label:"Did your model predict any churns before they happened?",placeholder:"e.g., Yes — Client X was Yellow for 3 weeks before they cancelled. I intervened but too late. Should have acted when they first went Yellow.",type:"textarea"},{id:"missed-churns",label:"Any churns the model missed (green customer who left)?",placeholder:"e.g., Client Y churned with no warning. Looking back: they stopped asking questions in Week 6. Should add 'question frequency' as a signal.",type:"textarea"},{id:"actions",label:"Standard action protocol per color",placeholder:"e.g., Green: monthly check-in + quarterly business review. Yellow: founder call within 48 hours + new 30-day success plan. Red: escalation to founder + partner check-in within 7 days.",type:"textarea"}]}]} />

## Part 3: Expansion System Review

Your best leads are already paying you. Expansion — upsells, cross-sells, and scope increases — should be systematic, not opportunistic.

<TemplateBuilder title="Expansion Trigger Library" persistKey="capstone-L5-expansion" sections={[{id:"triggers",title:"Expansion Triggers",fields:[{id:"trigger1",label:"Trigger 1: Event + What it signals + Your expansion move",placeholder:"e.g., Customer hits their 90-day milestone (first deal closed). Signal: the system is working and they now see ROI. Move: introduce the 'Scale' package that includes 3x outreach volume and dedicated outreach manager.",type:"textarea"},{id:"trigger2",label:"Trigger 2: Event + What it signals + Your expansion move",placeholder:"e.g., Customer mentions hiring or team growth in check-in. Signal: capacity expanding = budget expanding. Move: 'Would it make sense to onboard [new hire] into the system? We have a team add-on for that.'",type:"textarea"},{id:"trigger3",label:"Trigger 3: Event + What it signals + Your expansion move",placeholder:"e.g., Customer asks for referrals or a case study. Signal: they're happy enough to invest more attention. Move: 'Before I connect you with [person], can we spend 20 minutes on your Q3 plan? I want to make sure they see you at your best.'",type:"textarea"}]},{id:"expansion-metrics",title:"Expansion Performance",fields:[{id:"nrr",label:"Net Revenue Retention (NRR) — what % of last year's revenue did you keep + grow?",placeholder:"e.g., NRR: 115% — I retained 90% of customers and grew existing accounts by 25% on average. Target: 120%+",type:"text"},{id:"expansion-rate",label:"Expansion rate — what % of customers expanded their engagement?",placeholder:"e.g., 40% of 12-month+ customers have expanded. Want to get to 60%.",type:"text"},{id:"expansion-gap",label:"Why aren't more customers expanding? (your honest assessment)",placeholder:"e.g., I never proactively offer expansion — I wait for customers to ask. Need to build trigger-based expansion asks into the onboarding cadence.",type:"textarea"}]}]} />

## Part 4: Advocacy System Review

<InsightCard icon="🌟" title="The Referral Math">
If you have 10 customers and each refers 1 new customer per year, your acquisition system gets 10 free, pre-qualified leads. At a 50% close rate from referrals, that's 5 new customers — from zero outreach. If those 5 also each refer 1, you now have a compounding machine that supplements your outbound. Advocacy is not a nice-to-have. It is a system.
</InsightCard>

<TemplateBuilder title="Advocacy System Review" persistKey="capstone-L5-advocacy" sections={[{id:"testimonials",title:"Testimonials",fields:[{id:"testimonial-count",label:"Number of testimonials collected (total)",placeholder:"e.g., 4 written testimonials, 1 video testimonial",type:"text"},{id:"testimonial-quality",label:"Are they specific and outcome-focused? (general vs specific)",placeholder:"e.g., 2 are specific ('booked 8 calls in first 30 days'). 2 are vague ('great to work with'). Need to update the vague ones to include specific outcomes.",type:"textarea"},{id:"testimonial-ask",label:"How are you currently asking for testimonials?",placeholder:"e.g., I ask at the end of the 90-day review call. Works about 60% of the time when I remember to ask.",type:"text"},{id:"testimonial-gap",label:"What needs to improve in your testimonial collection?",placeholder:"e.g., Systematize the ask — automate a 90-day email with a simple Google Form. Currently relying on me remembering.",type:"textarea"}]},{id:"referrals",title:"Referral System",fields:[{id:"referral-count",label:"Referrals received (last 6 months)",placeholder:"e.g., 3 referrals, 2 became clients",type:"text"},{id:"referral-ask",label:"How do you currently ask for referrals?",placeholder:"e.g., Ad hoc — only when I happen to think of it. Zero systematization.",type:"text"},{id:"referral-trigger",label:"When in the customer journey do you make a referral ask?",placeholder:"e.g., Currently: never proactively. Should: at Day 30 (first milestone), Day 90 (ROI visible), and at renewal.",type:"textarea"},{id:"referral-incentive",label:"Do you offer any referral incentive?",placeholder:"e.g., No formal incentive. Some founders have offered 1-month credit for a closed referral — considering this.",type:"text"}]},{id:"social-proof",title:"Social Proof Library",fields:[{id:"proof-library",label:"What social proof assets do you have?",placeholder:"e.g., 4 written testimonials (in Google Doc), 2 case study PDFs, 1 LinkedIn recommendation. All scattered in different places.",type:"textarea"},{id:"proof-usage",label:"Where do you use social proof in your sales process?",placeholder:"e.g., Proposal page 3. LinkedIn header. Sometimes on discovery call if relevant story comes up.",type:"text"},{id:"proof-gap",label:"Where should you be using social proof but aren't?",placeholder:"e.g., Email sequence Step 3 should include a case study. My LinkedIn featured section is empty. Website testimonials page doesn't exist.",type:"textarea"}]}]} />

## Part 5: AI CS/Retention Agent Status

Your CS/Retention agent from Course 27 automates health monitoring and surfaces expansion opportunities.

<InteractiveChecklist title="AI CS/Retention Agent Check" persistKey="capstone-L5-agent" items={["Agent is monitoring health signals from CRM data (not requiring manual input)","Agent flags Yellow customers within 48 hours of signal change","Agent surfaces expansion opportunities based on defined triggers","Agent drafts re-engagement emails for Red accounts for founder review","Agent generates talking points for quarterly business reviews","Agent prompts advocacy asks at defined milestone dates","Agent outputs are reviewed weekly (not set and forgotten)"]} />

## Part 6: The Complete System Loop

Now map the full loop. This is the artifact that proves your system is connected:

<TemplateBuilder title="Complete System Loop Map" persistKey="capstone-L5-loop" sections={[{id:"loop",title:"Acquisition → Advocacy Loop",fields:[{id:"acquisition-to-conversion",label:"Step 1: How does acquisition feed conversion? (tool + trigger)",placeholder:"e.g., Research agent exports scored prospects → human review → approved prospects loaded into Instantly sequences → positive replies auto-create HubSpot deals → I respond and book discovery calls",type:"textarea"},{id:"conversion-to-retention",label:"Step 2: How does conversion feed retention? (tool + trigger)",placeholder:"e.g., Signed contract in PandaDoc → Zapier → creates client record in HubSpot → triggers 30-day onboarding email sequence in ActiveCampaign → adds client to Slack workspace",type:"textarea"},{id:"retention-to-expansion",label:"Step 3: How does retention feed expansion? (tool + trigger)",placeholder:"e.g., HubSpot health score drops to Yellow → AI agent flags → I get Slack notification → reach out within 48 hours. Day 90 milestone reached → AI agent triggers expansion conversation prompt.",type:"textarea"},{id:"expansion-to-advocacy",label:"Step 4: How does expansion feed advocacy? (tool + trigger)",placeholder:"e.g., Client expands or renews → I send handwritten thank you + testimonial request email → testimonial collected → added to social proof library and proposals",type:"textarea"},{id:"advocacy-to-acquisition",label:"Step 5: How does advocacy feed back to acquisition? (closing the loop)",placeholder:"e.g., Referral received → added to ICP-qualified lead pool → direct outreach from me with shared context → booked discovery call (higher close rate than cold outreach)",type:"textarea"}]},{id:"broken-links",title:"Broken Links",fields:[{id:"weakest-link",label:"The weakest connection in the loop (where does it break?)",placeholder:"e.g., The weakest link is expansion → advocacy. I have no systematic process to convert happy expanded customers into referral sources. It happens ad hoc.",type:"textarea"},{id:"sprint-fix",label:"Sprint action to strengthen the weakest link",placeholder:"e.g., Sprint Week 1: document and implement a Day 90 + renewal referral ask email sequence for all existing clients.",type:"textarea"}]}]} />

## System Assembly: Complete

You have now assembled all four system areas. Here is your assembled system at a glance:

<ProgressiveReveal title="Your Assembled System Summary" persistKey="capstone-L5-summary">
<RevealSection title="Acquisition System (Lesson 2)">

- ICP Document v2: Updated with real customer data
- Positioning Statement v2: Tested and refined
- Channel Priority List: Ranked by actual performance
- AI Research Agent: Updated with v2 ICP criteria
- Funnel bottleneck: Identified and sprint-targeted

</RevealSection>
<RevealSection title="Outreach + CRM System (Lesson 3)">

- Top sequences: Audited with real performance data
- Deliverability: Verified (or issues flagged)
- CRM pipeline: Cleaned and current
- Outreach → CRM automation: Mapped and gaps documented
- AI Outreach Agent: Updated, sprint volume calculated

</RevealSection>
<RevealSection title="Conversion System (Lesson 4)">

- Discovery framework v2: Real questions documented
- DISC adaptation: Real examples captured
- Objection database: Updated with new real objections
- Proposal template v2: Refined from win/loss analysis
- Conversion metrics dashboard: 5 key numbers populated

</RevealSection>
<RevealSection title="Retention + Advocacy System (Lesson 5)">

- Onboarding journey: Reality-checked and improved
- Health scoring model v2: Calibrated with real churn data
- Expansion trigger library: Documented with specific actions
- Advocacy system: Testimonial + referral process mapped
- Complete system loop: Connected end-to-end

</RevealSection>
</ProgressiveReveal>

<InsightCard icon="🚀" title="You Are Ready to Sprint">
Most founders who finish the assembly phase are surprised by what they discover: the system they've built is better than they thought, but connected less well than they realized. The gaps you've documented across Lessons 2-5 are the exact things your sprint will address.

In Lesson 6, you'll turn those gaps into a focused 30-day plan with specific daily targets and weekly milestones.
</InsightCard>

<InteractiveChecklist title="Lesson 5 Completion Checklist" persistKey="capstone-L5-actions" items={["Onboarding journey reviewed — time-to-first-value and dropout point documented","Health scoring model v2 calibrated with real churn events","Expansion trigger library documented with 3+ triggers","Advocacy system reviewed — testimonial and referral gaps identified","AI CS/Retention agent status checked","Complete system loop mapped end-to-end","Weakest link identified with sprint action plan","Ready to move to Lesson 6: Sprint Planning"]} />
