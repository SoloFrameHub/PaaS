---
title: "System Assembly: ICP + Positioning + Channel"
duration: "60 min"
track: "Operations & Systems"
course: "Course 48: Capstone — Your Complete Acquisition System"
lesson: 2
---

## Assembly Workshop 1: The Front of the Funnel

This lesson is a workshop. You are not learning new material — you are reviewing what you built in Tracks 1-4, updating it with real data, and connecting the pieces into a coherent front-of-funnel system.

Have these open before you start:
- Your ICP document from Course 1
- Your positioning statement from Course 2
- Whatever channel data you have (even rough estimates work)
- Your CRM or prospecting records

The goal by the end of this lesson: your ICP, positioning, and channel strategy are updated with real information from actual sales activity and connected to each other.

<InsightCard icon="🔍" title="Why This Matters">
Most founders build their ICP before they have any customer data. You've been selling since Course 3. Your first draft was a hypothesis. This lesson is where hypothesis meets evidence. The updates you make here cascade through your entire system.
</InsightCard>

## Part 1: ICP Review and Refinement

Pull up your original ICP document. Read it. Then answer the most important question in this lesson:

**How does your original ICP compare to the customers you've actually talked to, proposed to, or closed?**

<ComparisonBuilder title="ICP: Original vs Reality" persistKey="capstone-L2-icp-compare" prompt="Compare your original ICP hypothesis with what you've learned from real sales conversations. Where did your assumptions prove correct? Where were you wrong? Be specific." expertExample="Original ICP: Marketing directors at B2B SaaS companies with 10-50 employees. Reality: My best conversations have been with VP of Sales at companies 50-200 employees — the marketing director rarely had budget authority. My original ICP was too junior. I need to raise my targeting criteria." criteria={["Firmographic accuracy (company size, industry, geography)", "Role accuracy (title, seniority, budget authority)", "Pain point accuracy (the problem they actually care about)", "Timing accuracy (when they're actually in buying mode)", "At least 1 insight derived from a real conversation"]} />

Now update your ICP document:

<TemplateBuilder title="ICP Document v2" persistKey="capstone-L2-icp-v2" sections={[{id:"firmographic",title:"Firmographic Profile",fields:[{id:"company-size",label:"Company size (employees)",placeholder:"e.g., 50-200 employees (updated from original 10-50 based on closed deal data)",type:"text"},{id:"industry",label:"Industry/verticals",placeholder:"e.g., B2B SaaS, professional services — excluding e-commerce (poor conversion)",type:"text"},{id:"stage",label:"Company stage",placeholder:"e.g., Series A or beyond, or bootstrapped with $500K+ ARR",type:"text"},{id:"geography",label:"Geography",placeholder:"e.g., US + Canada only — international deals take 3x longer to close",type:"text"}]},{id:"role",title:"Decision Maker Profile",fields:[{id:"title",label:"Primary buyer title",placeholder:"e.g., VP of Sales, Head of Growth (not Marketing Manager — too junior)",type:"text"},{id:"authority",label:"Budget authority",placeholder:"e.g., $5K-$50K discretionary budget without board approval",type:"text"},{id:"motivations",label:"Primary motivations (updated from real conversations)",placeholder:"e.g., Hitting Q2 pipe targets, justifying headcount, proving ROI to board",type:"textarea"},{id:"fears",label:"Primary fears (updated from real objections you've heard)",placeholder:"e.g., Wasting budget on another vendor that doesn't deliver, losing credibility internally",type:"textarea"}]},{id:"signals",title:"Buying Signals (Behavioral ICP)",fields:[{id:"trigger-events",label:"Trigger events that indicate buying intent",placeholder:"e.g., New VP of Sales hired, missed Q1 quota, competitor just raised funding",type:"textarea"},{id:"tech-stack",label:"Technology signals (tools they use that indicate fit)",placeholder:"e.g., HubSpot + Outreach + Gong = likely good fit; Salesforce alone = probably too enterprise for us",type:"textarea"},{id:"disqualifiers",label:"Disqualifiers — who NOT to target (learned from bad conversations)",placeholder:"e.g., Early-stage pre-revenue, consumer-focused businesses, industries with long legal cycles",type:"textarea"}]},{id:"economic",title:"Economic Profile",fields:[{id:"aov",label:"Target average order value",placeholder:"e.g., $3,000-$15,000 initial engagement",type:"text"},{id:"ltv",label:"Target lifetime value",placeholder:"e.g., $18,000-$40,000 over 12-18 months",type:"text"},{id:"budget-cycle",label:"Budget cycle timing",placeholder:"e.g., Q4 planning = best time to start conversations for Q1 budget",type:"text"}]}]} />

## Part 2: Positioning Audit

Your positioning statement from Course 2 needs to pass a simple test: can someone who has never heard of you, in your target market, read it and immediately understand the value?

<ExampleCard label="The Stranger Test">
Marcus had positioned his sales consulting firm as: "Revenue acceleration for growth-stage B2B companies through strategic pipeline optimization."

He tested it at a networking event. Three people nodded politely. One said, "So you do consulting?"

He rewrote it as: "I help Series A B2B SaaS founders book 10-15 qualified discovery calls per month using cold email — without hiring an SDR."

The next person he said it to responded: "Wait, how? We need that."

The difference: specificity about who, what outcome, and what they avoid.
</ExampleCard>

Test your positioning using the stranger test framework:

<TemplateBuilder title="Positioning Statement v2" persistKey="capstone-L2-positioning" sections={[{id:"current",title:"Current vs Updated",fields:[{id:"original",label:"Your original positioning statement",placeholder:"Paste it here exactly as you wrote it",type:"textarea"},{id:"stranger-test",label:"Result of the stranger test (did strangers understand it?)",placeholder:"e.g., Tested on 2 people — both said 'so you do marketing?' indicating the language is too vague",type:"textarea"}]},{id:"updated",title:"Updated Positioning",fields:[{id:"for-who",label:"For [specific ICP]",placeholder:"e.g., For Series A B2B SaaS founders with a team of 5-20",type:"text"},{id:"who-are",label:"Who [describe their situation/pain]",placeholder:"e.g., Who are struggling to build predictable pipeline without hiring a full sales team",type:"text"},{id:"we-provide",label:"We provide [specific outcome]",placeholder:"e.g., We provide a done-with-you cold outreach system that books 10-15 qualified calls/month",type:"text"},{id:"unlike",label:"Unlike [alternative/status quo]",placeholder:"e.g., Unlike hiring an SDR (expensive, slow) or buying leads (low quality)",type:"text"},{id:"because",label:"Because [unique mechanism or proof]",placeholder:"e.g., Because we combine AI research, tested sequences, and your founder authority to get reply rates 3-5x industry average",type:"text"},{id:"one-line",label:"Your final one-sentence positioning (distilled from above)",placeholder:"e.g., I help Series A SaaS founders book 10-15 discovery calls/month through cold outreach — without hiring an SDR.",type:"textarea"}]}]} />

## Part 3: Channel Performance Review

Since Course 3, you've been running channels. Now it's time to rank them by what actually happened — not what you expected.

<InsightCard icon="📊" title="The Brutal Channel Audit">
Most founders spread effort across 4-5 channels and get mediocre results in all of them. The founders who scale do the opposite: they find 1-2 channels that work and go deep. This audit tells you which ones to bet on.
</InsightCard>

Rate and rank every channel you've tested:

<TemplateBuilder title="Channel Performance Ranker" persistKey="capstone-L2-channels" sections={[{id:"channel1",title:"Channel 1",fields:[{id:"c1-name",label:"Channel name",placeholder:"e.g., Cold email",type:"text"},{id:"c1-time",label:"Hours invested (estimate)",placeholder:"e.g., ~8 hours/week for 6 weeks = 48 hours total",type:"text"},{id:"c1-leads",label:"Conversations generated",placeholder:"e.g., 12 reply conversations",type:"text"},{id:"c1-deals",label:"Deals or opportunities from this channel",placeholder:"e.g., 3 proposals sent, 1 closed",type:"text"},{id:"c1-verdict",label:"Keep, Double Down, or Kill?",placeholder:"e.g., Keep — getting 3-4% reply rate with room to scale",type:"text"}]},{id:"channel2",title:"Channel 2",fields:[{id:"c2-name",label:"Channel name",placeholder:"e.g., LinkedIn outreach",type:"text"},{id:"c2-time",label:"Hours invested (estimate)",placeholder:"e.g., ~3 hours/week for 6 weeks = 18 hours total",type:"text"},{id:"c2-leads",label:"Conversations generated",placeholder:"e.g., 6 conversations",type:"text"},{id:"c2-deals",label:"Deals or opportunities from this channel",placeholder:"e.g., 1 proposal sent, 0 closed",type:"text"},{id:"c2-verdict",label:"Keep, Double Down, or Kill?",placeholder:"e.g., Kill — low volume, slow pace, 18 hours for 1 proposal is not scalable for me",type:"text"}]},{id:"channel3",title:"Channel 3",fields:[{id:"c3-name",label:"Channel name",placeholder:"e.g., Referrals / warm intros",type:"text"},{id:"c3-time",label:"Hours invested (estimate)",placeholder:"e.g., Passive — maybe 2 hours total making asks",type:"text"},{id:"c3-leads",label:"Conversations generated",placeholder:"e.g., 4 conversations",type:"text"},{id:"c3-deals",label:"Deals or opportunities from this channel",placeholder:"e.g., 2 closed — both from warm intros",type:"text"},{id:"c3-verdict",label:"Keep, Double Down, or Kill?",placeholder:"e.g., Double Down — highest conversion rate, lowest time. Need a systematic referral ask process.",type:"text"}]},{id:"priority",title:"Channel Priority for Sprint",fields:[{id:"sprint-channel-1",label:"Primary sprint channel (highest ROI based on above)",placeholder:"e.g., Cold email — scalable, 3-4% reply rate, proof of concept established",type:"textarea"},{id:"sprint-channel-2",label:"Secondary sprint channel",placeholder:"e.g., Referral asks — systematize what's already working",type:"textarea"},{id:"kill-list",label:"Channels you're officially killing for now",placeholder:"e.g., LinkedIn outreach (too slow), content marketing (too long payback period)",type:"textarea"}]}]} />

## Part 4: Acquisition Funnel Integrity Check

Now trace the path a prospect takes from first touch to closed deal. Where are the bottlenecks?

<DecisionTree title="Funnel Integrity Diagnostic" persistKey="capstone-L2-funnel-check" startNodeId="start" nodes={[{id:"start",content:"Where is the biggest drop-off in your acquisition funnel?",choices:[{label:"Getting prospects to reply / engage",nextNodeId:"awareness"},{label:"Converting conversations to discovery calls",nextNodeId:"consideration"},{label:"Converting calls to proposals",nextNodeId:"proposal"},{label:"Converting proposals to closes",nextNodeId:"close"}]},{id:"awareness",content:"Top-of-funnel problem. The issue is either: (1) wrong ICP targeting — you're reaching people who aren't a fit, (2) weak first-line / personalization — your message doesn't resonate, or (3) volume is too low — you need to send more. Lesson 2 assembly should fix (1). Your sprint plan should address (2) and (3) with A/B testing.",isTerminal:true,outcome:"neutral"},{id:"consideration",content:"Middle-of-funnel problem. Replies are coming but not converting to calls. This is usually a weak call-to-action, asking for too much too soon (30-min call vs 10-min check-in), or a scheduling friction issue (no Calendly link). Review your Courses 8 and 24 sequences for the follow-up steps.",isTerminal:true,outcome:"neutral"},{id:"proposal",content:"Discovery-to-proposal problem. You're booking calls but not progressing to proposals. Most likely causes: (1) not qualifying well enough on the call — you're running discovery with non-buyers, (2) your offer isn't clear, (3) you're waiting too long to send the proposal. Review Course 14 discovery framework.",isTerminal:true,outcome:"neutral"},{id:"close",content:"Proposal-to-close problem. You're sending proposals but not getting signatures. Common causes: (1) proposals are too vague on ROI, (2) you're not following up aggressively enough, (3) deals go to procurement/legal and die there, (4) price is too high relative to perceived value. Review Courses 18 and 19.",isTerminal:true,outcome:"neutral"}]} />

## Part 5: AI Research Agent Checkpoint

Your AI research agent from Courses 23-27 should be finding and scoring prospects matching your updated ICP. Check its configuration:

<InteractiveChecklist title="AI Research Agent Health Check" persistKey="capstone-L2-agent-check" items={["ICP criteria are updated in the agent prompt/configuration to reflect v2 ICP","Agent is sourcing prospects from the right platforms (Apollo, LinkedIn, etc.)","Enrichment pipeline is pulling company size, tech stack, and trigger events","Scoring rubric matches your current ICP qualification criteria","Output is flowing directly into your CRM (not just a spreadsheet)","Agent is producing 20+ qualified, scored prospects per run","You've reviewed the last agent run and the quality looks right"]} />

If the agent isn't configured or is using your original ICP criteria, note that as a sprint priority:

<TemplateBuilder title="AI Agent Update Plan" persistKey="capstone-L2-agent-plan" sections={[{id:"agent-status",title:"Current Agent Status",fields:[{id:"status",label:"Research agent status",placeholder:"e.g., Configured but using v1 ICP criteria — needs update to v2",type:"text"},{id:"gaps",label:"What needs to change",placeholder:"e.g., Update company size filter (10-50 → 50-200), add trigger event filter for new VP of Sales hires",type:"textarea"},{id:"sprint-action",label:"Specific action for sprint Week 1",placeholder:"e.g., Update agent prompt with new ICP criteria and run a test batch of 50 prospects",type:"text"}]}]} />

## Part 6: Integration Checkpoint

Before you move to Lesson 3, confirm your acquisition front-end is connected:

<TemplateBuilder title="Integration Checkpoint: Acquisition System" persistKey="capstone-L2-integration" sections={[{id:"icp-to-channel",title:"ICP → Channel Connection",fields:[{id:"icp-channel-fit",label:"How does your updated ICP match your primary channel?",placeholder:"e.g., ICP is VP of Sales at 50-200 employee SaaS companies — they are on LinkedIn and respond to cold email. Channel fit is strong.",type:"textarea"}]},{id:"channel-to-crm",title:"Channel → CRM Connection",fields:[{id:"crm-flow",label:"How do channel replies flow into your CRM?",placeholder:"e.g., Email replies trigger a Zapier workflow that creates a deal in HubSpot at 'Reply Received' stage",type:"textarea"},{id:"crm-gaps",label:"Any gaps in this flow?",placeholder:"e.g., LinkedIn DM replies aren't auto-logged — I'm manually copying them. Need to fix.",type:"text"}]},{id:"agent-to-outreach",title:"Research Agent → Outreach Connection",fields:[{id:"agent-outreach",label:"How do agent-scored prospects get into your outreach sequences?",placeholder:"e.g., Agent exports to CSV, I review and approve, then bulk import to Instantly sequence",type:"textarea"},{id:"automation-gaps",label:"Steps that are still manual and should be automated",placeholder:"e.g., The review-and-approve step — I should set up a human-in-the-loop gate with automatic batch loading",type:"text"}]}]} />

## System Assembly Summary

<InsightCard icon="✅" title="What You've Completed in Lesson 2">
You now have an updated, evidence-based acquisition front-end:

- ICP Document v2 — updated with real customer data
- Positioning Statement v2 — tested against the stranger test
- Channel Priority List — ranked by actual performance, not theory
- Funnel integrity diagnosis — you know where your biggest bottleneck is
- AI Research Agent — status checked and update plan ready
- Integration gaps identified — mapped to sprint Week 1 actions
</InsightCard>

<StrategyDuel title="Sprint Focus: Acquisition Volume vs Acquisition Quality" persistKey="capstone-L2-duel" scenario="You have 5-7 hours per week for acquisition. For your 30-day sprint, do you optimize for volume (reach more people) or quality (reach fewer but better-fit people with higher personalization)?" strategyA={{name:"Volume Focus",description:"Send 200+ outreach per week. Accept lower personalization in exchange for more at-bats. A/B test fast. Use AI to personalize at scale.",pros:["More data faster","More deals in pipeline","Identifies what works quickly"],cons:["Higher risk of spam flags","Lower reply rates per message","May reach wrong-fit prospects"]}} strategyB={{name:"Quality Focus",description:"Send 30-50 highly researched, deeply personalized messages per week. Each prospect gets a first line referencing something specific about them.",pros:["Higher reply rates","Better conversation quality","Lower unsubscribe/spam risk"],cons:["Slower pipeline build","Harder to run A/B tests","More time per message"]}} expertVerdict="Neither is universally right. If your ICP is narrow (under 500 addressable prospects), go quality. If you have thousands in your ICP and your reply rates are below 3%, go volume. Most early-stage founders should start with 50-100 outreach/week and optimize for quality — then scale volume once the messaging is proven." />

<InteractiveChecklist title="Lesson 2 Completion Checklist" persistKey="capstone-L2-actions" items={["ICP Document v2 completed in the TemplateBuilder above","Positioning Statement v2 written and passes the stranger test","Channel Performance Ranker completed — primary sprint channel identified","Funnel integrity check done — biggest bottleneck documented","AI Research Agent status assessed — update plan created if needed","Integration gaps identified and added to sprint planning notes","All completed templates saved (they auto-save in the browser)"]} />
