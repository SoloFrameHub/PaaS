---
title: "Week 2 Execution & Review"
duration: "90 min"
track: "Operations & Systems"
course: "Course 48: Capstone — Your Complete Acquisition System"
lesson: 8
---

## Week 2 Review: Optimize and Iterate

Week 2 is where the sprint gets real. You've fixed the obvious infrastructure problems, your sequences are running, and you have baseline data to work with. Now you optimize.

The Week 2 mindset: **don't change what's working, fix what isn't, and start building pipeline.**

By the end of this review, you should have at least one conversation in active progress — a reply thread, a call scheduled, or a proposal in draft.

<InsightCard icon="🔬" title="The Optimization Mindset">
Week 2 is about running controlled experiments. You identified what to test in Week 1 — now you're running those tests with enough volume to draw conclusions. The key word is 'controlled': change one variable at a time. If you change your subject line AND your first line AND your CTA simultaneously, you won't know what caused any improvement or decline.
</InsightCard>

## Part 1: Week 2 Activity Log

<TemplateBuilder title="Week 2 Activity Log" persistKey="capstone-L8-activity" sections={[{id:"volume",title:"Volume and Activity",fields:[{id:"emails-w2",label:"Emails sent Week 2",placeholder:"e.g., 105",type:"text"},{id:"linkedin-w2",label:"LinkedIn activities (if applicable)",placeholder:"e.g., 20 connection requests, 12 accepted, 3 DMs sent",type:"text"},{id:"calls-booked-w2",label:"Discovery calls booked this week",placeholder:"e.g., 2 booked — both from email replies",type:"text"},{id:"calls-held-w2",label:"Discovery calls held this week",placeholder:"e.g., 1 held (from Week 1 booking) — strong call, proposal to follow",type:"text"},{id:"proposals-w2",label:"Proposals sent",placeholder:"e.g., 1 sent 48 hours after discovery call",type:"text"},{id:"goal2-w2",label:"Goal 2 activities",placeholder:"e.g., Followed up with 3 referral non-responders. 1 new referral conversation started.",type:"text"}]},{id:"time",title:"Time",fields:[{id:"hours-w2",label:"Hours invested Week 2",placeholder:"e.g., 6.5 hours — slightly over plan but the discovery call prep was worth it",type:"text"},{id:"efficiency",label:"Did you get more efficient vs Week 1? How?",placeholder:"e.g., Yes — research agent prompt tightened, now reviewing 15 prospects instead of 40. Saves 45 min/week.",type:"textarea"}]}]} />

## Part 2: Week 1 vs Week 2 Comparison

This is the heart of the Week 2 review. You have two weeks of data. What moved?

<TemplateBuilder title="Week 1 vs Week 2 Metrics" persistKey="capstone-L8-comparison" sections={[{id:"comparison",title:"Metric Comparison",fields:[{id:"emails-compare",label:"Emails sent: Week 1 → Week 2 → Change",placeholder:"e.g., 87 → 105 → +21%. Volume is increasing.",type:"text"},{id:"open-compare",label:"Open rate: Week 1 → Week 2 → Change",placeholder:"e.g., 51% → 48% → -3%. Slight decline, acceptable. New subject line variant getting 52% open rate.",type:"text"},{id:"reply-compare",label:"Reply rate: Week 1 → Week 2 → Change",placeholder:"e.g., 3.4% → 4.1% → +0.7%. New subject line test showing improvement.",type:"text"},{id:"pos-reply-compare",label:"Positive reply rate: Week 1 → Week 2 → Change",placeholder:"e.g., 2.3% → 2.8% → +0.5%. Marginal improvement.",type:"text"},{id:"calls-compare",label:"Calls booked (cumulative): Week 1 → Week 2 total",placeholder:"e.g., 1 (W1) + 2 (W2) = 3 total booked, 1 held",type:"text"}]},{id:"interpretation",title:"What the Data Means",fields:[{id:"winning",label:"What's winning (improving metric + why you think it is)",placeholder:"e.g., Reply rate improving — new subject line variant 'Q2 pipeline question for [Name]' outperforming 'Quick question about [Company]' by 1.3 percentage points",type:"textarea"},{id:"lagging",label:"What's lagging (flat or declining metric)",placeholder:"e.g., Positive reply to call conversion — 3 positive replies but only 2 calls booked. Some people are interested but not booking. Need to shorten CTA friction.",type:"textarea"}]}]} />

## Part 3: A/B Test Analysis

<InsightCard icon="🧪" title="Minimum Sample Size for Reliable Results">
Before drawing conclusions from an A/B test, you need at minimum 30 contacts per variant. With 50 per variant you get a more reliable signal. With fewer than 30, any difference you see could be random noise.

If you started a test in Week 1, you may have enough data now. If not, Week 2 is when you run the tests and Week 3 is when you implement the winners.
</InsightCard>

<TemplateBuilder title="A/B Test Results" persistKey="capstone-L8-ab" sections={[{id:"test1",title:"Test 1: Subject Line",fields:[{id:"sl-a",label:"Variant A — subject line + contacts sent",placeholder:"e.g., 'Quick question about [Company]' — 45 contacts",type:"text"},{id:"sl-a-results",label:"Variant A results",placeholder:"e.g., 51% open rate, 3.1% reply rate",type:"text"},{id:"sl-b",label:"Variant B — subject line + contacts sent",placeholder:"e.g., 'Q2 pipeline — quick thought for [Name]' — 38 contacts",type:"text"},{id:"sl-b-results",label:"Variant B results",placeholder:"e.g., 54% open rate, 4.4% reply rate",type:"text"},{id:"sl-winner",label:"Winner and decision",placeholder:"e.g., Variant B wins on reply rate. Implementing as default. Will A/B test first line next.",type:"text"}]},{id:"test2",title:"Test 2: First Line / Personalization (if running)",fields:[{id:"fl-a",label:"Variant A — first line approach",placeholder:"e.g., Compliment-based: 'Saw your post on scaling outbound last week — great point about quality over quantity.'",type:"text"},{id:"fl-a-results",label:"Variant A reply rate",placeholder:"e.g., 2.8% reply rate",type:"text"},{id:"fl-b",label:"Variant B — first line approach",placeholder:"e.g., Trigger-event based: 'Noticed [Company] just added two enterprise AEs — timing seems right to talk about pipeline.'",type:"text"},{id:"fl-b-results",label:"Variant B reply rate",placeholder:"e.g., 4.9% reply rate",type:"text"},{id:"fl-winner",label:"Winner and decision",placeholder:"e.g., Trigger-event approach wins clearly. Compliment approach feels more personal but converts less. Implementing trigger-event as default.",type:"text"}]}]} />

## Part 4: Conversion Funnel Analysis

With two weeks of data, you can start to see the full funnel. Where is the biggest drop-off?

<TemplateBuilder title="2-Week Funnel Analysis" persistKey="capstone-L8-funnel" sections={[{id:"funnel-data",title:"Funnel Numbers (Cumulative 2 Weeks)",fields:[{id:"contacted",label:"Total prospects contacted",placeholder:"e.g., 192 total (87 W1 + 105 W2)",type:"text"},{id:"replied",label:"Total replies received",placeholder:"e.g., 11 total (3.4% + 4.1% = blended 3.7%)",type:"text"},{id:"positive",label:"Positive replies",placeholder:"e.g., 7 positive (2.3% + 2.8% blended 2.5%)",type:"text"},{id:"calls-booked-total",label:"Discovery calls booked",placeholder:"e.g., 3 calls booked (from 7 positive replies = 43% conversion)",type:"text"},{id:"calls-held-total",label:"Discovery calls held",placeholder:"e.g., 1 call held so far",type:"text"},{id:"proposals-total",label:"Proposals sent",placeholder:"e.g., 1 proposal sent",type:"text"},{id:"closes-total",label:"Deals closed",placeholder:"e.g., 0 — too early in funnel cycle",type:"text"}]},{id:"bottleneck",title:"Bottleneck Identification",fields:[{id:"biggest-drop",label:"Where is the biggest percentage drop in your funnel?",placeholder:"e.g., Positive reply → call booked: 7 positive but 3 calls booked (43%). I should be converting 60%+. Gap: people are replying interested but then going quiet when I send calendar link.",type:"textarea"},{id:"fix",label:"Specific fix for this bottleneck",placeholder:"e.g., Instead of sending calendar link immediately, respond with 2-3 specific time slots ('Are you free Tuesday at 2pm or Wednesday at 10am EST?'). Removes the friction of them having to click and pick a time.",type:"textarea"}]}]} />

## Part 5: Pipeline Status Check

By Week 2, your CRM should have active deals with next-action dates. Let's review them.

<TemplateBuilder title="Pipeline Status" persistKey="capstone-L8-pipeline" sections={[{id:"active-deals",title:"Active Deals",fields:[{id:"deal1",label:"Deal 1 — company, stage, last activity, next action",placeholder:"e.g., Acme Corp — Discovery held, proposal pending. Last activity: discovery call 3 days ago. Next action: send proposal by tomorrow.",type:"textarea"},{id:"deal2",label:"Deal 2 — company, stage, last activity, next action",placeholder:"e.g., TechFlow — Call scheduled for Thursday. Last activity: email reply 2 days ago. Next action: prep discovery agenda.",type:"textarea"},{id:"deal3",label:"Deal 3 — company, stage, last activity, next action",placeholder:"e.g., GrowthCo — Warm referral, reached out via email. Last activity: sent intro email. Next action: follow up if no reply by Friday.",type:"textarea"}]},{id:"pipeline-health",title:"Pipeline Health",fields:[{id:"total-pipeline",label:"Total pipeline value (if quantifiable)",placeholder:"e.g., $12,000 in active opportunities — 1 proposal at $6K, 2 conversations that could become $3K each",type:"text"},{id:"expected-closes",label:"Expected closes by end of sprint (Day 30)",placeholder:"e.g., Acme Corp proposal ($6K) — 60% confidence they close within 10 days. GrowthCo — early stage, maybe close in sprint if call goes well.",type:"textarea"}]}]} />

## Part 6: Mid-Sprint Assessment

You're halfway through the sprint. Are you on track?

<RangeSlider label="Confidence of hitting your primary sprint target by Day 30" min={1} max={10} lowLabel="Significantly behind — targets need adjustment" highLabel="On track — continuing current approach" persistKey="capstone-L8-midpoint-confidence" />

<StrategyDuel title="Mid-Sprint Decision: Stay the Course vs Pivot" persistKey="capstone-L8-duel" scenario="You're 14 days in. Your outreach is getting 4.1% reply rate (your target was 4%+). But only 1 discovery call has been held, and you have 2 booked for Week 3. Your original target was 5 discovery calls by Day 30. You're behind on calls but your pipeline is building." strategyA={{name:"Stay the Course",description:"Keep current approach. Pipeline is building, just slower than expected. Week 3 and 4 have more calls scheduled. Trust the system.",pros:["Avoids overreaction to early-stage data","Reply rate is at target — pipeline will follow","Changing strategy mid-sprint adds confusion"],cons:["May not hit 5-call target","Could be too passive if there's a real problem"]}} strategyB={{name:"Tactical Adjustment",description:"Keep the outreach approach but add 10 targeted LinkedIn DMs per week to prospects who opened but didn't reply. Small supplement, not a strategy change.",pros:["Addresses call volume gap without disrupting what's working","Low time cost (30 min/week)","LinkedIn touch can tip fence-sitters"],cons:["Splits focus slightly","Too many variables if you were also A/B testing"]}} expertVerdict="Mid-sprint, 'stay the course' is almost always right if your leading indicators (reply rate) are on target. Your call pipeline is building — it just has a 2-3 week lag from outreach to held call. The mistake most founders make is pivoting strategy every 7 days based on lagging indicators. Trust the leading metrics. Only adjust if reply rate drops below target for 2+ consecutive weeks." />

## Part 7: Week 3 Focus — Scale What Works

<TemplateBuilder title="Week 3 Plan" persistKey="capstone-L8-w3-plan" sections={[{id:"scale",title:"What to Scale",fields:[{id:"scale-what",label:"What specifically are you doubling down on in Week 3?",placeholder:"e.g., Scaling email volume from 105/week to 140/week using the winning subject line variant. Adding trigger-event first lines to all new outreach.",type:"textarea"},{id:"scale-how",label:"How are you scaling it (specific mechanism)?",placeholder:"e.g., Research agent running Monday and Thursday (vs just Monday). Adding one more sending inbox to capacity. Same sequences, more volume.",type:"textarea"}]},{id:"cut",title:"What to Cut",fields:[{id:"cut-what",label:"What are you cutting or de-prioritizing in Week 3?",placeholder:"e.g., LinkedIn DM outreach — 30 hours of effort across W1-W2 for zero results. Not scaling it further. Staying focused on email.",type:"textarea"}]},{id:"w3-targets",title:"Week 3 Targets",fields:[{id:"w3-outreach",label:"Outreach volume target",placeholder:"e.g., 140 emails/week",type:"text"},{id:"w3-calls",label:"Discovery calls target",placeholder:"e.g., 3 calls — 2 already booked, 1 more to book",type:"text"},{id:"w3-proposals",label:"Proposals target",placeholder:"e.g., 2 proposals sent by end of Week 3",type:"text"}]}]} />

<InsightCard icon="📈" title="The Week 2 Insight That Always Surprises People">
The biggest Week 2 realization for most sprint runners is not about tactics — it's about volume. They discover that getting 4 calls per month requires 120+ outreach emails (not 40), and that reply lag is 5-10 days (not 2-3). The math is always more demanding than the estimate.

If you're behind on calls, the fix is almost always more outreach volume, not better messaging. You need enough attempts to get enough replies to get enough calls. Don't optimize the message before you've solved the volume.
</InsightCard>

<InteractiveChecklist title="Week 2 Review Completion Checklist" persistKey="capstone-L8-actions" items={["Week 2 activity log completed with real numbers","Week 1 vs Week 2 comparison table filled in","A/B test results analyzed — winning variant identified and implemented","2-week funnel analysis completed — biggest bottleneck documented","Pipeline status updated in CRM and reviewed above","Mid-sprint confidence rated — targets adjusted if significantly off track","Week 3 plan defined — what to scale, what to cut, specific targets set","Evidence captured: screenshot of metrics, CRM pipeline view, or winning email variant"]} />
