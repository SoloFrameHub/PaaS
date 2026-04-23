# Course 1: ICP Builder Workshop
## Google Antigravity Content Generation Package

**Academy:** Lead Generation & Sales Academy  
**Section:** 1 - Foundation (Market Intelligence)  
**Course Duration:** 12 lessons × 45-60 minutes = ~10-12 hours total  
**Priority:** 1 of 10 (Foundation - all other courses build on this)

---

## COURSE OVERVIEW

### Course Description
The ICP Builder Workshop transforms vague notions of "who might buy" into precise, actionable Ideal Customer Profiles. Technical founders often skip this step, believing their product will "sell itself" to anyone who sees it. This course provides the systematic framework for identifying exactly who your best customers are—the specific companies, roles, and contexts where you have the highest probability of closing deals.

### Why This Course Matters
- **Foundation for Everything:** Every subsequent sales activity (prospecting, outreach, demos, closing) depends on knowing WHO you're targeting
- **Addresses Core Pain:** 78% of startup failures cite "no market need"—often meaning they built for the wrong customer
- **Technical Founder Trap:** Engineers default to feature-selling because they haven't defined who actually needs those features
- **Platform Integration:** Directly feeds the ICP Builder component (versioned artifacts v1→v2→v3)

### Learning Outcomes
By completing this course, founders will be able to:
1. Define their Ideal Customer Profile with 12+ specific attributes
2. Distinguish between firmographic, behavioral, and psychographic targeting criteria
3. Use the "Golden Segment" methodology to identify their beachhead market
4. Create ICP v1 that can be refined through sales feedback loops
5. Generate AI-assisted persona insights using the platform's ICP Builder tool

### Prerequisites
- Have a product or service (even MVP stage)
- Access to data about at least 3-5 existing customers OR clear hypothesis about target market
- Completed platform onboarding

### Platform Integration Points
- **ICP Builder Component:** `components/founder/CustomerAvatarGenerator.tsx`
- **Versioned Artifacts System:** ICP v1 → v2 → v3 evolution
- **AI Coaching Flow:** `customerAvatarGenerator` Genkit flow
- **Pipeline State Machine:** Feeds "Prospecting" stage targeting

---

## COURSE STRUCTURE (12 Lessons)

### Lesson 1: Why Most Founders Target Wrong (And Why It Kills Sales)
**Duration:** 45 minutes  
**Teaching Mode:** Explanation (The Teaching)

**Learning Objectives:**
- Explain why "everyone could use this" is a sales-killing mindset
- Identify the three costs of poor targeting (wasted outreach, wrong feedback, diluted positioning)
- Recognize the "spray and pray" pattern in their own past behavior

**Content Outline:**
1. **Hook:** The founder who emailed 10,000 people and got 3 responses (all wrong-fit)
2. **The Targeting Paradox:** Narrowing your focus expands your results
3. **Three Hidden Costs of Poor Targeting:**
   - Wasted outreach: 95% of cold emails ignored because irrelevant
   - Wrong feedback: Building features for non-buyers
   - Diluted positioning: Generic messaging that resonates with no one
4. **Case Study:** How Dropbox initially targeted tech-savvy early adopters, not "everyone who uses files"
5. **The ICP Promise:** What changes when targeting becomes precise

**Assessment:**
- Multiple choice: Identify the targeting mistake in 3 founder scenarios
- Reflection: "Who have you been targeting, and how specific is that definition?"

**AI Coaching Integration:**
- Prompt: "Analyze my current customer description and identify where it's too vague"

---

### Lesson 2: Firmographic Targeting - The Basics That Most Skip
**Duration:** 50 minutes  
**Teaching Mode:** Explanation + Evidence

**Learning Objectives:**
- Define firmographic criteria (company size, industry, geography, tech stack)
- Explain why B2B targeting starts with company-level filters
- Create initial firmographic filters for their ICP

**Content Outline:**
1. **What Are Firmographics?** Company-level attributes that indicate fit
2. **The Six Firmographic Dimensions:**
   - Company size (employees, revenue)
   - Industry/vertical
   - Geography/region
   - Growth stage (startup, scaling, enterprise)
   - Tech stack indicators
   - Business model (B2B, B2C, marketplace)
3. **Why Firmographics Come First:** They're filterable in prospecting tools (Apollo, LinkedIn Sales Navigator)
4. **Common Mistakes:**
   - Too broad ("SMBs" = meaningless)
   - Too narrow too soon (before validation)
5. **Case Study:** How a dev tool company discovered "Series A SaaS companies" was 10x better than "tech companies"

**Practice Exercise:**
- Complete firmographic grid for your product
- Use AI coach to identify gaps in your firmographic definition

**Platform Tool:** ICP Builder - Section 1 (Company Demographics)

---

### Lesson 3: Finding Your "Golden Segment" - The Beachhead Strategy
**Duration:** 60 minutes  
**Teaching Mode:** Explanation + Practice

**Learning Objectives:**
- Define "golden segment" as the intersection of pain intensity, accessibility, and right-to-win
- Apply the Golden Segment Matrix to evaluate 3-5 potential segments
- Select a beachhead market for focused execution

**Content Outline:**
1. **The Golden Segment Concept:** Not your biggest market—your best first market
2. **Three Criteria for Golden Segments:**
   - **Pain Intensity:** How urgently do they need this solved? (1-10 scale)
   - **Accessibility:** Can you actually reach them? (1-10 scale)
   - **Right-to-Win:** Why would they buy from YOU vs. alternatives? (1-10 scale)
3. **The Golden Segment Matrix:** Scoring methodology
4. **Case Study (from MAGNET Framework):** Tom Chen discovered "2-5 person remote agencies using Figma" was his golden segment—not "creative agencies"
5. **The Beachhead Principle:** Dominate one segment before expanding

**Practice Exercise:**
- List 5 potential segments
- Score each on Pain/Accessibility/Right-to-Win
- Identify your golden segment with AI coaching validation

**Assessment:**
- Submit Golden Segment Matrix with reasoning for top selection

---

### Lesson 4: Buyer Personas vs. Company Profiles - Getting Both Right
**Duration:** 50 minutes  
**Teaching Mode:** Explanation

**Learning Objectives:**
- Distinguish between company-level ICP and individual buyer personas
- Identify the 3-5 personas typically involved in B2B purchase decisions
- Map the buying committee for their product

**Content Outline:**
1. **Two Levels of Targeting:**
   - ICP = Which COMPANIES to target
   - Buyer Persona = Which PEOPLE within those companies
2. **The B2B Buying Committee:**
   - Economic Buyer (controls budget)
   - Technical Evaluator (assesses capabilities)
   - User Buyer (will actually use it)
   - Champion (advocates internally)
   - Blocker (raises objections)
3. **Persona Depth Progression:**
   - Basic: Title, department, seniority
   - Intermediate: Goals, challenges, success metrics
   - Advanced: Psychographics, communication style, political dynamics
4. **Solo Founder Reality:** You probably enter through one persona and need to navigate to others

**Visual Framework:** The Buying Committee Map (who influences, who decides, who blocks)

**Platform Tool:** ICP Builder - Section 2 (Professional Demographics)

---

### Lesson 5: Psychographic Targeting - Getting Inside Your Buyer's Head
**Duration:** 55 minutes  
**Teaching Mode:** Explanation + Evidence

**Learning Objectives:**
- Define psychographic criteria (goals, fears, values, priorities)
- Explain why psychographics predict buying behavior better than demographics
- Add psychographic layer to their ICP

**Content Outline:**
1. **Beyond Demographics:** Two CTOs with identical titles can have opposite buying behaviors
2. **Psychographic Dimensions:**
   - Strategic priorities (growth vs. efficiency vs. risk mitigation)
   - Decision-making style (data-driven vs. intuition vs. consensus)
   - Risk tolerance (early adopter vs. wait-and-see)
   - Values (innovation vs. stability vs. cost control)
3. **The "Burning Platform" Test:** What makes them desperate enough to change?
4. **Case Study:** Why "innovative CTOs at growth-stage companies" is more useful than "CTOs at Series B startups"
5. **Source Research:** Where to discover psychographic patterns (interviews, reviews, forum discussions)

**Practice Exercise:**
- Add psychographic criteria to your ICP
- Identify the "burning platform" trigger for your golden segment

**AI Coaching Integration:**
- Prompt: "Based on my ICP, generate likely psychographic patterns for my target buyer"

---

### Lesson 6: Behavioral Signals - Finding Ready-to-Buy Indicators
**Duration:** 50 minutes  
**Teaching Mode:** Explanation + Practice

**Learning Objectives:**
- Define behavioral signals that indicate buying readiness
- Identify 5-10 trigger events for their market
- Build a trigger event monitoring system

**Content Outline:**
1. **Timing Matters More Than Fit:** A perfect-fit company with no trigger won't buy
2. **Types of Trigger Events:**
   - Hiring signals (posted job for role your product replaces)
   - Funding events (Series A = budget unlocked)
   - Technology changes (migrating platforms, adding tools)
   - Organizational changes (new leadership, restructuring)
   - Competitive moves (competitor launched similar solution)
   - Pain signals (public complaints, negative reviews)
3. **Tools for Trigger Monitoring:**
   - LinkedIn Sales Navigator alerts
   - Google Alerts
   - Crunchbase/PitchBook funding alerts
   - Job board monitoring (Indeed, LinkedIn Jobs)
4. **Case Study:** How monitoring "Hired Head of RevOps" led to 3x reply rates for a sales tool

**Practice Exercise:**
- List 10 trigger events for your golden segment
- Set up 3 monitoring alerts using free tools

---

### Lesson 7: The ICP Document - Creating Your Targeting Bible
**Duration:** 60 minutes  
**Teaching Mode:** Practice (The Application)

**Learning Objectives:**
- Synthesize all ICP components into a single document
- Create ICP v1 using the platform's ICP Builder tool
- Establish baseline for iterative refinement

**Content Outline:**
1. **The ICP Document Structure:**
   - Summary statement (one paragraph)
   - Firmographic criteria (table)
   - Buyer personas (2-3 detailed profiles)
   - Psychographic indicators
   - Behavioral triggers
   - Disqualification criteria (who to AVOID)
2. **ICP Quality Checklist:**
   - Specific enough to filter prospects?
   - Findable in prospecting tools?
   - Small enough to dominate?
   - Large enough to build a business?
3. **Versioning Philosophy:** ICP v1 is a hypothesis—expect refinement

**Platform Exercise:**
- Complete full ICP Builder workflow
- Generate AI-enhanced persona insights
- Export ICP v1 document

**Assessment:**
- Submit ICP v1 for AI evaluation and feedback

---

### Lesson 8: Validating Your ICP - Before You Waste 1000 Emails
**Duration:** 55 minutes  
**Teaching Mode:** Explanation + Practice

**Learning Objectives:**
- Apply the DISCOVER framework's synthetic validation to ICP testing
- Use AI personas to stress-test ICP assumptions
- Identify ICP weaknesses before live prospecting

**Content Outline:**
1. **The Validation Imperative:** Your ICP is a hypothesis until proven
2. **Synthetic Validation Method (from DISCOVER Framework):**
   - Create 5-10 AI personas matching your ICP
   - Test your value proposition against each
   - Identify objections and resonance patterns
3. **Human Validation Signals:**
   - Response rates to outreach (>5% = good signal)
   - Quality of conversations (right problems discussed?)
   - Conversion to next stage
4. **ICP Refinement Triggers:**
   - <3% response rate = revisit targeting
   - Wrong objections = wrong segment
   - "Not the right person" = wrong persona

**Practice Exercise:**
- Create 3 synthetic personas matching your ICP
- Run AI roleplay to test your pitch against each
- Document objections and resonance patterns

---

### Lesson 9: Negative ICP - Who NOT to Sell To
**Duration:** 45 minutes  
**Teaching Mode:** Explanation + Evidence

**Learning Objectives:**
- Define disqualification criteria for their market
- Identify "time-waster" patterns from common sales experiences
- Create explicit exclusion filters

**Content Outline:**
1. **The Cost of Wrong-Fit Customers:**
   - High support burden
   - Churn and refund requests
   - Negative reviews from mismatched expectations
   - Opportunity cost of your time
2. **Common Disqualification Signals:**
   - Budget misalignment (too small, wrong budget holder)
   - Use case mismatch (solving a problem you don't address)
   - Timeline mismatch (need it yesterday, can't wait for implementation)
   - Culture mismatch (values conflict with your approach)
3. **The "Hell No" List:** Explicit criteria for immediate disqualification
4. **Case Study:** The founder who doubled close rate by walking away faster

**Practice Exercise:**
- Create your "Hell No" list with 5-10 disqualification criteria
- Add to ICP document as Section 6

---

### Lesson 10: ICP for Different Sales Motions
**Duration:** 50 minutes  
**Teaching Mode:** Explanation

**Learning Objectives:**
- Adapt ICP criteria for outbound vs. inbound vs. partner channels
- Recognize that different channels may target different ICPs
- Create channel-specific ICP variants

**Content Outline:**
1. **One Product, Multiple ICPs:** Different acquisition channels attract different buyers
2. **Outbound ICP:**
   - Must be findable (company name, contact info accessible)
   - Must have trigger events you can monitor
   - Higher emphasis on firmographics and triggers
3. **Inbound ICP:**
   - Self-selects based on content/SEO
   - Higher emphasis on psychographics and pain points
   - May include broader segments
4. **Partner/Referral ICP:**
   - Must be describable to referral sources
   - Focus on outcomes achieved, not company attributes
5. **When to Specialize:** Start with one channel's ICP, expand as you scale

**Practice Exercise:**
- Identify your primary acquisition channel
- Adapt ICP for that channel's requirements

---

### Lesson 11: ICP Evolution - From v1 to v3 and Beyond
**Duration:** 50 minutes  
**Teaching Mode:** Explanation + Evidence

**Learning Objectives:**
- Explain the ICP evolution process through sales feedback
- Identify signals that indicate ICP refinement is needed
- Plan the v1→v2→v3 progression

**Content Outline:**
1. **The Versioning Mindset:**
   - v1: Initial hypothesis (educated guess)
   - v2: Refined after 20-30 sales conversations
   - v3: Validated through closed deals and churn analysis
2. **Feedback Sources for ICP Refinement:**
   - Won deals: What did they have in common?
   - Lost deals: Why didn't they buy?
   - Churned customers: What was the mismatch?
   - Best customers: What makes them best?
3. **ICP Refinement Triggers:**
   - 3+ months since last update
   - Significant change in win rate
   - New competitor or market shift
   - Expanding to new segment
4. **Case Study (from Homepage):** ICP v1 (basic firmographics) → ICP v3 (psychographic depth with success metrics)

**Platform Integration:**
- Using version history in ICP Builder
- Comparing v1 vs. v2 differences
- Documenting refinement rationale

---

### Lesson 12: Putting It All Together - Your Complete ICP System
**Duration:** 60 minutes  
**Teaching Mode:** Evaluation + Summary

**Learning Objectives:**
- Complete final ICP document with all components
- Create ICP-based prospecting criteria for next course
- Establish ICP review cadence

**Content Outline:**
1. **ICP Document Final Review:**
   - All sections complete?
   - Quality checklist passed?
   - Disqualification criteria included?
2. **Connecting ICP to Next Steps:**
   - How ICP feeds List Building (Course 4)
   - How ICP informs Cold Email personalization (Course 5)
   - How ICP guides Discovery questions (Course 2)
3. **ICP Maintenance Rhythm:**
   - Weekly: Note refinement signals from conversations
   - Monthly: Review and update if signals warrant
   - Quarterly: Full ICP audit against closed deals
4. **Your ICP Success Metrics:**
   - Outreach response rate (target: >5%)
   - Conversation quality score (right problems discussed)
   - Pipeline conversion rate by segment

**Final Assessment:**
- Submit complete ICP v1 document
- AI evaluation against quality rubric
- Peer review option (accountability pod)

**Course Completion Badge:** "ICP Architect" - 150 XP

---

## PLATFORM FEATURES TO LEVERAGE

### ICP Builder Component
```typescript
// Integration points for this course
- Demographics section (Lesson 2)
- Professional section (Lesson 4)  
- Psychographics section (Lesson 5)
- Behavioral signals section (Lesson 6)
- AI-generated insights (Lessons 5, 8)
- Version history (Lesson 11)
- Export functionality (Lesson 7, 12)
```

### AI Coaching Prompts
For each lesson, integrate these AI coaching touchpoints:
1. "Analyze my ICP and identify gaps"
2. "Generate synthetic personas matching my ICP"
3. "Stress-test my value proposition against this ICP"
4. "Suggest refinements based on this sales feedback"

### Gamification Elements
- **Points:** 10 XP per lesson completion, 25 XP per exercise submission
- **Badges:** "ICP Architect" (course completion), "Golden Segment Master" (Lesson 3 exercise)
- **Milestones:** ICP v1 Created, ICP Validated, ICP Refined

---

## CONTENT GENERATION PROMPTS FOR ANTIGRAVITY

### Lesson Content Generation Prompt
```
You are creating educational content for the SoloFrameHub Lead Generation & Sales Academy.

TARGET AUDIENCE: Technical founders and solo entrepreneurs who:
- Have products but struggle with sales
- Default to feature-selling because they haven't defined their ICP
- Need systematic frameworks over personality-based sales advice
- Are bootstrap-funded (anti-VC philosophy)

PEDAGOGICAL REQUIREMENTS:
- 70% teaching (explanation, theory, frameworks)
- 20% practice (exercises, application)
- 10% engagement (examples, case studies)
- Teaching-first: explain WHY before HOW
- Framework-driven: provide systematic approaches, not tactics
- Real examples: use specific case studies, not hypotheticals

TONE:
- Expert educator, not guru
- Humble practitioner: "this is what I've learned"
- Direct, no fluff
- Technical-founder friendly (process over personality)

LESSON: [Insert lesson number and title]

LEARNING OBJECTIVES:
[Insert from course structure above]

Generate complete lesson content including:
1. Hook (compelling problem or question)
2. Core concept explanation (400-600 words)
3. Methodology/framework with steps
4. Case study or real example
5. Practice exercise with clear instructions
6. Assessment questions (2 MC, 1 reflection)
7. AI coaching integration points
8. Summary and connection to next lesson

FORMAT: Markdown with clear headers. No emojis. No excessive bullet points in explanatory sections.
```

### Case Study Generation Prompt
```
Generate a realistic case study for the ICP Builder Workshop course.

REQUIREMENTS:
- Solo founder or small team (2-5 people)
- B2B SaaS, dev tools, or professional services
- Bootstrap or minimal funding context
- Specific metrics (before/after)
- Timeline (weeks/months, not years)
- Mistakes made and corrected
- Replicable for other founders

STRUCTURE:
1. Founder profile (background, product, stage)
2. Initial targeting approach (vague/broad)
3. The problem that emerged (low response, wrong customers)
4. Discovery process (how they identified the issue)
5. ICP refinement steps (specific changes made)
6. Results with metrics (response rate, conversion, revenue)
7. Key lessons (3-5 transferable insights)

Avoid: Hype language, overnight success, unrealistic metrics, large company examples.
```

### Exercise Generation Prompt
```
Generate a hands-on exercise for [Lesson X: Title].

REQUIREMENTS:
- Can be completed in 15-30 minutes
- Uses either the founder's real business OR a provided scenario
- Has clear step-by-step instructions
- Includes quality criteria / self-assessment checklist
- Integrates with platform tool (ICP Builder)
- Offers AI coaching touchpoint

STRUCTURE:
1. Exercise objective (what they'll produce)
2. Context/scenario (if not using their own business)
3. Step-by-step instructions (5-8 steps)
4. Quality checklist (5-7 criteria to self-assess)
5. AI coaching prompt (what to ask the AI coach)
6. Submission format (what to save/export)

Keep instructions precise and actionable. Technical founders prefer clarity over inspiration.
```

---

## CONTEXT FILES FOR ANTIGRAVITY

When generating content, load these context files:
1. `/mnt/project/07-PEDAGOGICAL-PATTERNS.md` - Lesson structure templates
2. `/mnt/project/06-INTERACTIVE-COMPONENTS.md` - ICP Builder component specs (Customer Avatar Generator)
3. `/mnt/project/Solo_Founder_s_Al_Playbook_-_12_Frameworks_for_Market_Leadership.md` - DISCOVER and MAGNET frameworks (Chapters 4-6)
4. `/mnt/project/Lead_Generation___Sales_Academy_Marketing_Description.md` - Course positioning
5. `/mnt/project/SOLOFRAMEHUB.COM_HOMEPAGE_-_COMPLETE_VERSION.md` - Versioned artifacts explanation

---

## QUALITY CHECKLIST

Before finalizing each lesson, verify:
- [ ] Explanation-first: Teaches WHY before HOW
- [ ] Framework-driven: Provides systematic approach
- [ ] Technical-founder friendly: Process over personality
- [ ] Real examples: Specific, not hypothetical
- [ ] Platform integration: References ICP Builder tool
- [ ] Assessment included: MC + reflection
- [ ] AI coaching touchpoint: Clear prompt for AI assistance
- [ ] Connects to next lesson: Clear progression
- [ ] No fluff: Every paragraph serves a purpose
- [ ] Correct branding: SoloFrameHub, not AI Startup LaunchPad

---

**END OF COURSE 1 PROMPT PACKAGE**
