---
title: "Your Community Sales Playbook"
duration: "50 min"
track: "Creator Economy"
course: "Course 28: Community-Led Sales"
lesson: 8
---

# Your Community Sales Playbook

You now understand the models, the platforms, the funnels, the engagement strategies, the retention mechanics, the hybrid structures, and the pricing psychology. This final lesson synthesizes everything into a concrete, actionable playbook that you can execute over the next 90 days.

This is not theory. This is your launch plan.

---

## Step 1: Choose Your Platform (Days 1-3)

You made a preliminary platform decision in Lesson 2. Now it is time to commit. Here is the decision simplified to its essence:

**Choose Skool if:**
- You want one price, one community, minimal setup
- You are comfortable with the Skool ecosystem and its built-in discovery features
- You plan to embed course content inside the community
- You want to launch within 48 hours

**Choose Circle if:**
- You need multiple tiers or multiple products
- You want deep customization and integrations
- You are comfortable with a 1-2 week setup process
- You plan to scale beyond 500 members and need flexibility

**Choose Mighty Networks if:**
- A branded mobile app is important to your audience
- You want courses, community, events, and memberships in one platform
- You are willing to invest in a longer setup process for a "platform" feel

**Choose Discord if:**
- Your community is supplementary to products sold on other platforms
- Your audience is tech-savvy and already uses Discord
- You want zero platform costs to start

**Make the decision.** Sign up. Set up your profile and basic community structure. Do not overthink this -- you can migrate later, but you cannot launch if you do not choose.

<DecisionTree
  title="Platform Selection Decision Tree"
  persistKey="community-led-sales-L8-platform"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "What is your primary constraint right now?",
      choices: [
        { label: "Speed — I need to launch in 48 hours", nextNodeId: "speed" },
        { label: "Flexibility — I need multiple tiers and customization", nextNodeId: "flexibility" },
        { label: "Cost — I want to start with zero platform fees", nextNodeId: "cost" }
      ]
    },
    {
      id: "speed",
      content: "Do you plan to embed course content inside the community?",
      choices: [
        { label: "Yes, courses will be part of the community", nextNodeId: "skool" },
        { label: "No, community only", nextNodeId: "skool-or-circle" }
      ]
    },
    {
      id: "flexibility",
      content: "How important is a branded mobile app to your audience?",
      choices: [
        { label: "Critical — my audience expects an app", nextNodeId: "mighty" },
        { label: "Not important — web is fine", nextNodeId: "circle" }
      ]
    },
    {
      id: "cost",
      content: "Is your audience already familiar with Discord?",
      choices: [
        { label: "Yes, they use it regularly", nextNodeId: "discord" },
        { label: "No, they would need to learn it", nextNodeId: "reconsider" }
      ]
    },
    {
      id: "skool",
      content: "**Recommendation: Skool** — Fast setup, built-in courses, strong discovery features. Launch within 48 hours.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "skool-or-circle",
      content: "**Recommendation: Skool or Circle** — Both work. Choose Skool for speed, Circle for future flexibility.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "circle",
      content: "**Recommendation: Circle** — Deep customization, multiple tiers, strong integrations. Plan for 1-2 week setup.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "mighty",
      content: "**Recommendation: Mighty Networks** — Branded app, all-in-one platform. Invest in longer setup for premium feel.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "discord",
      content: "**Recommendation: Discord** — Zero platform cost, familiar to tech audiences. Best as supplement to other products.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "reconsider",
      content: "**Reconsider Discord** — If your audience isn't Discord-native, the learning curve may hurt adoption. Consider Skool for ease of use.",
      isTerminal: true,
      outcome: "neutral"
    }
  ]}
/>

---

## Step 2: Design Your Tier Structure (Days 3-7)

Based on your pricing work from Lesson 7, finalize your tiers. For most solo creators launching their first community, I recommend starting with two tiers, not three:

### Two-Tier Launch Structure:

**Free Tier (Lead Generation)**
- Open enrollment, no payment required
- General discussion space
- Weekly free content (one post, resource, or live event)
- Introductions channel
- Limited resource library (3-5 starter resources)

**Paid Tier ($67-$127/month)**
- Full discussion access with premium spaces
- Weekly group coaching or hot-seat session
- Complete resource library
- Accountability pair matching
- Course content (if applicable)
- Member-only events

**Why not three tiers at launch?** Because you do not have enough data yet to know what your members value most. Start with two tiers, observe member behavior for 90 days, then split your paid tier into two if the data supports it.

<TemplateBuilder
  title="Your Two-Tier Structure"
  persistKey="community-led-sales-L8-tiers"
  sections={[
    {
      id: "free",
      title: "Free Tier (Lead Generation)",
      fields: [
        { id: "name", label: "Tier Name", placeholder: "e.g., Community Member, Insider, Starter", type: "text" },
        { id: "access", label: "What spaces/channels do they access?", placeholder: "e.g., General discussion, introductions, weekly free content", type: "textarea" },
        { id: "value", label: "Key value proposition for free members", placeholder: "e.g., Weekly expert tips, peer support, starter resource library", type: "textarea" }
      ]
    },
    {
      id: "paid",
      title: "Paid Tier",
      fields: [
        { id: "name", label: "Tier Name", placeholder: "e.g., Pro Member, Inner Circle, VIP", type: "text" },
        { id: "price", label: "Monthly Price", placeholder: "e.g., $97", type: "text" },
        { id: "access", label: "What additional access do they get?", placeholder: "e.g., Premium channels, weekly coaching, full resource library, accountability matching", type: "textarea" },
        { id: "unique", label: "What makes this tier worth the price?", placeholder: "e.g., Direct access to me, proven frameworks, member-only events", type: "textarea" }
      ]
    }
  ]}
/>

---

## Step 3: Create Your Core Content (Days 7-21)

Before you invite a single member, prepare the foundational content that makes the community feel alive and valuable from day one. No one wants to join an empty room.

### The Content Minimum Viable Product (MVP):

**1. Welcome and orientation post.** A pinned post that explains what the community is, who it is for, what the rules are, and how to get the most out of it. This is the first thing every new member reads.

**2. Five foundational resources.** Templates, frameworks, or guides that deliver immediate value. These should be specific to your niche and genuinely useful on their own.

**3. Three discussion seed posts.** Posts that invite members to share their situations, ask questions, or engage with a prompt. These model the kind of conversation you want to see.

**4. An introductions prompt.** A template for new members to introduce themselves: name, what they do, what they are working on, and what they need help with.

**5. A content calendar for the first 30 days.** Plan your posts, events, and resources for the first month so you are not scrambling day-to-day.

### Sample 30-Day Content Calendar:

| Week | Monday | Wednesday | Friday |
|------|--------|-----------|--------|
| 1 | Welcome post + introductions | Resource drop: [Template #1] | Discussion: "What is your biggest challenge right now?" |
| 2 | Weekly wins thread | Live AMA (30 min) | Resource drop: [Template #2] |
| 3 | Member spotlight (beta member) | Discussion: "Share your progress" | Resource drop: [Template #3] |
| 4 | Weekly wins thread | Live workshop (45 min) | Month-in-review + ask for feedback |

You do not need daily content. Three quality posts per week is sufficient to keep a community active, especially early on.

<InteractiveChecklist
  title="Content MVP Checklist"
  persistKey="community-led-sales-L8-content"
  items={[
    "Welcome and orientation post drafted (explains purpose, rules, how to get value)",
    "5 foundational resources created (templates, frameworks, or guides)",
    "3 discussion seed posts written (prompts that invite member engagement)",
    "Introductions template created (name, role, current project, what you need help with)",
    "30-day content calendar planned (3 posts per week minimum)"
  ]}
/>

---

## Step 4: Build Your First 100 Members (Days 21-60)

The first 100 members are the hardest to get and the most important. They set the culture, generate the first testimonials, and determine whether the community reaches critical mass.

### The Seeding Strategy:

**Tier 1: Your warm network (Members 1-25)**

These are people who already know, like, and trust you. They might be email subscribers, social media followers, past customers, or professional contacts. They join because of their relationship with you, not because the community has proven itself.

**How to reach them:**
- Personal email or DM to your top 50 contacts: "I am launching a community for [audience]. I would love for you to be a founding member. Here is what it includes... Founding members get [benefit/discount]."
- Announce to your email list with a clear, specific invitation
- Post on your primary social platform with a direct call to action

**Target:** 25 founding members in the first two weeks

**Tier 2: Your extended audience (Members 25-75)**

These are people who know your work but have not interacted with you directly. They follow you on social media, subscribe to your newsletter, or have consumed your free content.

**How to reach them:**
- Social media content series about the community topic (not about the community itself). Demonstrate your expertise, then mention the community as a resource.
- Guest appearances on podcasts, YouTube channels, or newsletters in your niche. Offer genuine value and mention the community as a next step.
- A free challenge or workshop that attracts your target audience and naturally leads to the community.

**Target:** 50 additional members over the next 3-4 weeks

**Tier 3: New audience (Members 75-100)**

These are people who have never heard of you before. Reaching them requires visibility strategies.

**How to reach them:**
- Platform-native discovery (Skool's marketplace, Circle's directory)
- Cross-promotions with complementary creators ("I will promote your product to my community if you promote mine to yours")
- Paid advertising (start small -- $10-20/day on Meta or YouTube targeting your ICP)
- SEO-optimized free content that ranks for terms your audience searches

**Target:** 25 additional members, reaching your first 100

<ProgressiveReveal title="The First 100 Members Strategy" persistKey="community-led-sales-L8-100members">
<RevealSection title="Tier 1: Warm Network (Members 1-25)">

**Who they are:** People who already know, like, and trust you — email subscribers, social followers, past customers, professional contacts.

**Outreach template:**

"Hey [Name],

I'm launching a community for [specific audience] who want to [specific outcome]. Given your work in [their area], I thought you'd be a perfect founding member.

Here's what's included:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

Founding members get [discount/bonus] and help shape the community direction.

Interested? I'd love to have you."

**Timeline:** First 2 weeks
**Target:** 25 members

</RevealSection>

<RevealSection title="Tier 2: Extended Audience (Members 25-75)">

**Who they are:** People who know your work but haven't interacted directly — social followers, newsletter subscribers, content consumers.

**Strategies:**
1. **Content series:** Post 5-7 pieces of high-value content on the community topic (not about the community). Demonstrate expertise, then mention community as next step.
2. **Guest appearances:** Podcast interviews, YouTube collaborations, newsletter features. Deliver value first, mention community second.
3. **Free challenge:** 5-day email challenge or live workshop that naturally leads to community membership.

**Timeline:** Weeks 3-6
**Target:** 50 additional members

</RevealSection>

<RevealSection title="Tier 3: New Audience (Members 75-100)">

**Who they are:** People who have never heard of you. Requires visibility and discovery strategies.

**Strategies:**
1. **Platform discovery:** Optimize for Skool marketplace or Circle directory (clear positioning, strong offer, social proof)
2. **Cross-promotions:** Partner with complementary creators for mutual promotion
3. **Paid ads:** Start small ($10-20/day) on Meta or YouTube targeting your ICP
4. **SEO content:** Write content that ranks for terms your audience searches

**Timeline:** Weeks 7-9
**Target:** 25 additional members (total: 100)

</RevealSection>
</ProgressiveReveal>

---

## Step 5: The First 30 Days After Launch

The first 30 days determine whether your community becomes self-sustaining or fizzles out. Your job during this period is intensive facilitation.

### Week 1: Onboarding and Activation

- Welcome every new member personally (by name, referencing their introduction)
- Post your content calendar content on schedule
- Respond to every comment and question within 4 hours
- Match the first accountability pairs
- Host your first live event (even if only 5 people attend)

### Week 2: Engagement Patterns

- Launch your first Weekly Wins thread
- Feature your first member spotlight
- Share your first premium resource
- Begin tracking engagement metrics (who is posting, who is lurking)
- Send a personal check-in to anyone who has not posted yet

### Week 3: Social Proof and Momentum

- Share the first member wins and breakthroughs
- Post a "community snapshot" -- how many members, how many discussions, what topics are trending
- Host your second live event with a guest or a different format
- Identify your top 5 most engaged members and invite them to be "community champions"

### Week 4: Feedback and Iteration

- Send a brief survey to all members: "What do you love? What is missing? What should we do more of?"
- Review your engagement metrics against your targets
- Adjust your content calendar based on what generated the most engagement
- Announce the next month's content and events (create anticipation)

<SlideNavigation>
<Slide title="Week 1: Onboarding and Activation">

**Your focus:** Make every new member feel seen and welcomed.

**Daily actions:**
- Welcome each new member by name within 2 hours of joining
- Reference something specific from their introduction
- Post scheduled content from your calendar (no skipping)
- Respond to every comment and question within 4 hours
- Match first accountability pairs based on goals/experience

**Key event:** Host your first live session (even if only 5 people attend — quality over quantity)

**Success metric:** 80%+ of new members post an introduction

</Slide>

<Slide title="Week 2: Engagement Patterns">

**Your focus:** Establish recurring rituals that create habit loops.

**Key launches:**
- **Weekly Wins thread:** "Share one win from this week, no matter how small"
- **Member spotlight:** Feature one member's story, challenge, or breakthrough
- **Premium resource drop:** Deliver your first high-value template or framework

**Tracking begins:**
- Who is posting vs. lurking?
- Which content types get the most engagement?
- Who hasn't posted yet? (Send personal check-in DM)

**Success metric:** 15%+ of members post at least once this week

</Slide>

<Slide title="Week 3: Social Proof and Momentum">

**Your focus:** Showcase early wins and build visible momentum.

**Content to create:**
- Share member wins and breakthroughs (with permission)
- Post a "community snapshot": member count, discussion topics, trending questions
- Host second live event with different format or guest expert
- Identify top 5 most engaged members → invite to be "community champions"

**Why this matters:** New members need to see that others are getting results. Social proof accelerates engagement.

**Success metric:** 3+ member testimonials or success stories collected

</Slide>

<Slide title="Week 4: Feedback and Iteration">

**Your focus:** Learn what's working and adjust course.

**Survey your members:**
- What do you love about the community so far?
- What's missing or could be better?
- What should we do more of? Less of?

**Review your data:**
- Engagement rate vs. target (15%+ daily active)
- Content performance (which posts got most interaction)
- Churn (anyone cancel? Why?)

**Announce next month:**
- Share upcoming content and events
- Incorporate member feedback into plans
- Create anticipation for what's coming

**Success metric:** 60%+ survey response rate, clear action items for Month 2

</Slide>
</SlideNavigation>

---

## Step 6: The 90-Day Community Launch Timeline

Here is the complete timeline from decision to 100 members:

### Phase 1: Foundation (Days 1-21)
- Day 1-3: Choose platform, set up community structure
- Day 3-7: Design tiers, set pricing, configure payments
- Day 7-14: Create core content MVP (welcome post, 5 resources, discussion seeds)
- Day 14-21: Beta test with 5-10 trusted contacts, gather feedback, adjust

### Phase 2: Founding Launch (Days 21-45)
- Day 21-28: Open founding member enrollment to warm network (goal: 25 members)
- Day 28-35: Expand to extended audience via email, social, guest appearances
- Day 35-45: Host first live events, establish engagement rituals, build momentum

### Phase 3: Growth (Days 45-90)
- Day 45-60: Reach 50 members, launch first challenge or sprint
- Day 60-75: Begin cross-promotions and organic content strategy
- Day 75-90: Reach 100 members, collect testimonials, prepare for price increase

### Key Milestones to Track:

| Day | Milestone | Target |
|-----|-----------|--------|
| 7 | Platform set up and configured | Complete |
| 21 | Content MVP created, beta tested | 5-10 beta members |
| 30 | Founding launch complete | 25+ members |
| 45 | Engagement rituals established | 15%+ daily active rate |
| 60 | First testimonials collected | 3+ member success stories |
| 75 | Organic growth engine working | 5+ new members/week |
| 90 | Community is self-sustaining | 100+ members, 3% or lower monthly churn |

---

## The Community P&L at 90 Days

Let us project the economics of your community at the 90-day mark:

**Revenue (100 members at $97/month):**
- Monthly recurring revenue: $9,700
- Annual run rate: $116,400

**Costs:**
- Platform: $99/month (Skool) or $99-$219/month (Circle)
- Stripe processing (2.9% + $0.30): approximately $310/month
- Your time: 15-20 hours/week (the primary cost)
- Optional: community manager ($500-$1,000/month part-time at this stage, if needed)

**Net margin:** 85-95% (your main investment is time)

**Key question at 90 days:** Is the community growing organically? If you are adding 5+ members per week through referrals, organic content, and platform discovery, the business is working. If you are still relying on manual outreach for every new member, revisit your value proposition and engagement strategy.

<ScenarioSimulator
  title="90-Day Community Economics Calculator"
  persistKey="community-led-sales-L8-economics"
  levers={[
    { id: "members", label: "Total Members", min: 25, max: 200, step: 5, defaultValue: 100 },
    { id: "price", label: "Monthly Price ($)", min: 47, max: 197, step: 10, defaultValue: 97 },
    { id: "churn", label: "Monthly Churn (%)", min: 1, max: 15, step: 1, defaultValue: 3 }
  ]}
  outputs={[
    { id: "mrr", label: "Monthly Recurring Revenue", formula: "members * price", unit: "$", precision: 0 },
    { id: "arr", label: "Annual Run Rate", formula: "members * price * 12", unit: "$", precision: 0 },
    { id: "churnLoss", label: "Monthly Churn Loss", formula: "members * (churn / 100) * price", unit: "$", precision: 0 },
    { id: "netMargin", label: "Net Margin (after platform + Stripe)", formula: "(members * price) - 99 - (members * price * 0.029)", unit: "$", precision: 0 }
  ]}
  insight="At {members} members and ${price}/month with {churn}% churn, you need to add {Math.ceil(members * (churn / 100))} new members monthly just to maintain current MRR. To grow, you need {Math.ceil(members * (churn / 100)) + 5}+ new members per month."
/>

---

## The Decision Tree for What Comes Next

At the 90-day mark, you face a fork:

**If your community is thriving (100+ members, &lt;4% churn, growing organically):**
- Introduce your third tier (premium/inner circle)
- Raise prices for new members (grandfather existing)
- Hire a part-time community manager to free up your time
- Begin developing hybrid course content to increase LTV

**If your community is struggling (fewer than 50 members, >7% churn, growth stalled):**
- Survey existing members to understand the value gap
- Revisit your positioning: who exactly is this for and what specific outcome does it deliver?
- Increase your engagement investment: more live events, more personal interaction
- Consider whether the community model is right for your audience (some audiences prefer 1-on-1 or cohort-based models)

**If you are somewhere in between (50-100 members, 4-7% churn, slow growth):**
- Double down on the engagement rituals from Lesson 4
- Launch a 5-day challenge to reactivate lurkers and attract new members
- Ask your most engaged members what would make them enthusiastically refer others
- Test a different pricing structure (add annual option, adjust tiers)

<StrategyDuel
  title="90-Day Decision: Scale vs. Fix"
  persistKey="community-led-sales-L8-decision"
  scenario="You've reached 90 days. Your community has 75 members, 5% monthly churn, and growth has slowed to 2-3 new members per week (down from 5-7)."
  strategyA={{
    name: "Scale Strategy",
    description: "Add third tier, raise prices, invest in ads and cross-promotions",
    pros: ["Increase revenue per member", "Attract higher-intent members", "Create upgrade path"],
    cons: ["May alienate existing members", "Requires more content/delivery", "Higher expectations to manage"]
  }}
  strategyB={{
    name: "Fix Strategy",
    description: "Survey members, increase engagement, reactivate lurkers before scaling",
    pros: ["Understand value gaps before investing more", "Improve retention first", "Build stronger foundation"],
    cons: ["Slower revenue growth", "Requires more founder time", "May miss market timing"]
  }}
  expertVerdict="Fix first, then scale. At 5% churn, you're losing 3-4 members monthly. Adding a third tier won't solve retention. Survey your members, identify the engagement gap, and get churn below 3% before scaling. A healthy 75-member community beats a leaky 150-member one."
/>

---

## Your Pre-Launch Checklist

Before you close this lesson, confirm that you have:

<InteractiveChecklist
  title="Pre-Launch Checklist"
  persistKey="community-led-sales-L8-prelaunch"
  items={[
    "Platform selected and account created",
    "Tier structure designed with clear pricing",
    "Founding member offer defined (spots, discount, terms)",
    "Content MVP outlined (welcome post, 5 resources, 3 discussion seeds, introductions template)",
    "30-day content calendar drafted",
    "First 50 people identified for founding member outreach (name them specifically)",
    "Launch date set (within 21 days of completing this lesson)",
    "Success metrics defined (members, churn, engagement rate, revenue)",
    "90-day milestone targets written down and visible"
  ]}
/>

---

## Final Thought

Building a community is not a marketing tactic. It is a commitment to serving a group of people over time. The creators who succeed with community-led sales are not the ones with the best funnels or the most sophisticated gamification. They are the ones who genuinely care about their members' outcomes and show up consistently to facilitate progress.

The playbook gives you the structure. Your authentic investment in your members' success gives it life.

Start today. Launch in three weeks. Build to 100 members in 90 days. Then do it all again at a higher level.

<RangeSlider
  label="How ready do you feel to launch your community in the next 21 days?"
  min={1}
  max={10}
  lowLabel="Not ready at all"
  highLabel="Ready to launch now"
  persistKey="community-led-sales-L8-readiness"
/>

---

## Action Items

<InteractiveChecklist
  title="Your Next Steps"
  persistKey="community-led-sales-L8-actions"
  items={[
    "Complete the pre-launch checklist above — every item should be done before you launch",
    "Set your launch date and put it on your calendar (tell someone to make it real)",
    "Draft your founding member outreach message (the personal email/DM for your first 50 prospects)",
    "Build your 90-day tracking dashboard (simple spreadsheet: members, churn, revenue, engagement weekly)",
    "Identify your first 3 community champions (who in your network would be ideal founding members?)",
    "Schedule your first live event (even if it's just a 30-minute AMA)",
    "Write your welcome post and introductions template"
  ]}
/>

---

**Course Complete.** You now have the strategy, tactics, and playbook to build a community-led sales engine. The next step is execution.