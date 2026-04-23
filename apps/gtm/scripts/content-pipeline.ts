/**
 * Local content pipeline — runs both jobs that were previously in Trigger.dev:
 *   1. Retrofit plain-text lessons with interactive MDX components
 *   2. Create missing lessons for Tracks 4-7
 *
 * Run: OPENROUTER_API_KEY=... npx tsx scripts/content-pipeline.ts
 * Or:  npx tsx scripts/content-pipeline.ts  (reads from .env.local automatically)
 *
 * Flags:
 *   --retrofit-only   Skip content creation
 *   --create-only     Skip retrofit
 *   --course=21       Create only course 21
 */

import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

// ─── OpenRouter client ──────────────────────────────────────────────────────

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "",
    "X-Title": "Solo GTM OS - Content Pipeline",
  },
});

const MODEL = "anthropic/claude-sonnet-4-5";

async function generateContent(opts: {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const {
    systemPrompt,
    userPrompt,
    maxTokens = 8192,
    temperature = 0.3,
  } = opts;
  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: maxTokens,
    temperature,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("AI returned empty response");
  return content;
}

// ─── File I/O ───────────────────────────────────────────────────────────────

const CONTENT_ROOT = path.join(process.cwd(), "server/data/content");
const RESEARCH_ROOT = path.join(process.cwd(), "server/data/research");

function hasComponents(content: string): boolean {
  return /<[A-Z][a-zA-Z]+[\s/>]/.test(content);
}

async function readLesson(
  trackId: string,
  courseId: string,
  lessonNum: string,
): Promise<string> {
  return fs.readFile(
    path.join(CONTENT_ROOT, trackId, courseId, `lesson-${lessonNum}.md`),
    "utf-8",
  );
}

async function writeLesson(
  trackId: string,
  courseId: string,
  lessonNum: string,
  content: string,
): Promise<void> {
  const dir = path.join(CONTENT_ROOT, trackId, courseId);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, `lesson-${lessonNum}.md`),
    content,
    "utf-8",
  );
}

async function lessonExists(
  trackId: string,
  courseId: string,
  lessonNum: string,
): Promise<boolean> {
  try {
    await fs.access(
      path.join(CONTENT_ROOT, trackId, courseId, `lesson-${lessonNum}.md`),
    );
    return true;
  } catch {
    return false;
  }
}

async function readResearch(filename: string): Promise<string> {
  return fs.readFile(path.join(RESEARCH_ROOT, filename), "utf-8");
}

async function getPlainTextLessons(): Promise<
  Array<{ trackId: string; courseId: string; lessonNum: string }>
> {
  const results: Array<{
    trackId: string;
    courseId: string;
    lessonNum: string;
  }> = [];
  const tracks = await fs.readdir(CONTENT_ROOT);
  for (const trackId of tracks) {
    const trackPath = path.join(CONTENT_ROOT, trackId);
    if (!(await fs.stat(trackPath)).isDirectory()) continue;
    const courses = await fs.readdir(trackPath);
    for (const courseId of courses) {
      const coursePath = path.join(trackPath, courseId);
      if (!(await fs.stat(coursePath)).isDirectory()) continue;
      const files = await fs.readdir(coursePath);
      for (const file of files) {
        if (!file.startsWith("lesson-") || !file.endsWith(".md")) continue;
        const lessonNum = file.replace("lesson-", "").replace(".md", "");
        const content = await fs.readFile(path.join(coursePath, file), "utf-8");
        if (!hasComponents(content)) {
          results.push({ trackId, courseId, lessonNum });
        }
      }
    }
  }
  return results;
}

// ─── Concurrency helper ─────────────────────────────────────────────────────

function makeSemaphore(concurrency: number) {
  let running = 0;
  const queue: Array<() => void> = [];
  return async function <T>(fn: () => Promise<T>): Promise<T> {
    if (running >= concurrency) {
      await new Promise<void>((resolve) => queue.push(resolve));
    }
    running++;
    try {
      return await fn();
    } finally {
      running--;
      queue.shift()?.();
    }
  };
}

// ─── System prompts (from component-catalog.ts) ─────────────────────────────

const COMPONENT_CATALOG = `
### FlipCard — Click to reveal (frameworks, definitions)
\`\`\`
<FlipCard front="The Trust Paradox" back="As AI outreach volume increases to near-zero cost, verified human trust becomes the scarcest and most valuable asset." />
\`\`\`

### InsightCard — Key callout
\`\`\`
<InsightCard icon="🎯" title="The Real Problem">
Outreach works fine. Targeting "everyone" is what failed.
</InsightCard>
\`\`\`

### ExampleCard — Case study
\`\`\`
<ExampleCard label="Case Study: The $40K Pivot">
Sarah spent 6 months building for the wrong audience...
</ExampleCard>
\`\`\`

### RangeSlider — Self-assessment scale
\`\`\`
<RangeSlider label="How confident are you in your positioning?" min={1} max={10} lowLabel="Not at all" highLabel="Very confident" persistKey="positioning-L3-confidence" />
\`\`\`

### SlideNavigation + Slide — Multi-part content
\`\`\`
<SlideNavigation>
<Slide title="Step 1: Research">
Content for step 1...
</Slide>
<Slide title="Step 2: Draft">
Content for step 2...
</Slide>
</SlideNavigation>
\`\`\`

### InteractiveChecklist — Persistent action items
\`\`\`
<InteractiveChecklist title="Your Action Items" persistKey="sales-psych-L1-actions" items={["Review your last 10 outreach messages", "Identify your top 3 segments", "Draft a niche-specific value prop"]} />
\`\`\`

### TemplateBuilder — Fill-in framework exercises
\`\`\`
<TemplateBuilder
  title="Your Value Proposition"
  persistKey="positioning-L2-uvp"
  sections={[
    {
      id: "target",
      title: "Target Customer",
      fields: [
        { id: "role", label: "Job Title / Role", placeholder: "e.g., VP of Marketing", type: "text" },
        { id: "pain", label: "Primary Pain Point", placeholder: "e.g., Can't attribute revenue to content", type: "textarea" }
      ]
    }
  ]}
/>
\`\`\`

### ComparisonBuilder — Build yours next to an expert example
\`\`\`
<ComparisonBuilder
  title="Positioning Statement"
  persistKey="positioning-L4-compare"
  prompt="Write your positioning statement"
  expertExample="For mid-market SaaS companies struggling with churn, DataPulse provides automated health scoring."
  criteria={["Specific target audience", "Clear pain point", "Measurable outcome"]}
/>
\`\`\`

### ClassifyExercise — Categorization/sorting
\`\`\`
<ClassifyExercise
  title="Classify These Leads"
  persistKey="list-building-L2-classify"
  categories={[
    { id: "hot", label: "Hot Lead", color: "#ef4444" },
    { id: "warm", label: "Warm Lead", color: "#f59e0b" },
    { id: "cold", label: "Cold Lead", color: "#3b82f6" }
  ]}
  items={[
    { id: "1", content: "Downloaded whitepaper AND visited pricing", correctCategory: "hot" },
    { id: "2", content: "Liked a LinkedIn post", correctCategory: "cold" }
  ]}
/>
\`\`\`

### RewriteExercise — Transform bad → good
\`\`\`
<RewriteExercise
  title="Rewrite This Generic Outreach"
  persistKey="cold-email-L3-rewrite"
  original="Hi, I wanted to reach out about our platform."
  hint="Make it specific to a single ICP segment"
  expertRewrite="Hi [Name], I noticed your agency posts monthly reports manually — our tool automates that."
  criteria={["Names a specific audience", "References a concrete pain", "Includes measurable benefit"]}
/>
\`\`\`

### SwipeDecision — Binary judgment (right/wrong, good/bad)
\`\`\`
<SwipeDecision
  title="Good ICP or Bad ICP?"
  description="Swipe right for well-defined ICPs, left for too-broad ones"
  optionA="Too Broad"
  optionB="Well-Defined"
  persistKey="icp-L2-swipe"
  cards={[
    { id: "1", content: "Small business owners", correctOption: "a", explanation: "Too vague" },
    { id: "2", content: "B2B SaaS founders doing $10K-50K MRR", correctOption: "b", explanation: "Specific and actionable" }
  ]}
/>
\`\`\`

### DecisionTree — Branching scenario
\`\`\`
<DecisionTree
  title="Choose Your Path"
  persistKey="choose-path-L1-tree"
  startNodeId="start"
  nodes={[
    { id: "start", content: "Your prospect hasn't replied. What do you do?", choices: [
      { label: "Send a follow-up with new value", nextNodeId: "followup" },
      { label: "Try a different channel", nextNodeId: "channel" }
    ]},
    { id: "followup", content: "They reply asking for a call.", isTerminal: true, outcome: "positive" },
    { id: "channel", content: "You connect on LinkedIn instead.", isTerminal: true, outcome: "positive" }
  ]}
/>
\`\`\`

### PredictionGate — Predict before case study reveal
\`\`\`
<PredictionGate
  question="What happened to Founder X's domain reputation?"
  persistKey="cold-email-L1-predict"
  type="choice"
  choices={[
    { id: "a", text: "Recovered in a week" },
    { id: "b", text: "Permanently damaged" },
    { id: "c", text: "Took 3-6 months" }
  ]}
  correctId="c"
>
The domain took **4 months** to recover.
</PredictionGate>
\`\`\`

### ProgressiveReveal + RevealSection — Gated sections
\`\`\`
<ProgressiveReveal title="The 5-Step Framework" persistKey="discovery-L1-reveal">
<RevealSection title="Step 1: Situation Questions">
Start by understanding their current state...
</RevealSection>
<RevealSection title="Step 2: Problem Questions">
Dig into specific pain points...
</RevealSection>
</ProgressiveReveal>
\`\`\`

### TimedChallenge — Speed exercise
\`\`\`
<TimedChallenge
  title="Spot the Weak Positioning"
  persistKey="positioning-L5-timed"
  timeLimit={60}
  items={[
    { id: "1", prompt: "We help businesses grow faster", correctAnswer: "weak", explanation: "No specific audience" },
    { id: "2", prompt: "We help DTC brands reduce CAC by 30%", correctAnswer: "strong", explanation: "Specific and measurable" }
  ]}
/>
\`\`\`

### ConceptReframe — Explain-like-I'm-X
\`\`\`
<ConceptReframe
  concept="Positioning"
  defaultLens="technical-founder"
  lenses={[
    { id: "technical-founder", label: "Technical Founder", explanation: "Positioning is like choosing which API to optimize first — you pick the one with highest-value traffic." },
    { id: "coach", label: "Coach", explanation: "Positioning is like choosing which transformation to promise — pick the specific change your method delivers best." },
    { id: "creator", label: "Creator", explanation: "Positioning is like choosing your content niche — pick the topic where your unique experience gives authority." }
  ]}
/>
\`\`\`

### ContextualNote — Profile-aware callout
\`\`\`
<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Your data skills are an asset here — use SQL/API skills to build better lists than manual prospectors.
</ContextualNote>
\`\`\`

### MiniRoleplay — Inline practice conversation
\`\`\`
<MiniRoleplay
  scenario="A prospect says: 'We already have a solution.'"
  role="You are the founder responding"
  persistKey="objections-L2-roleplay"
  modelResponse="That makes sense. Does your current solution handle [specific pain]? Most clients switched because that gap cost them [impact]."
/>
\`\`\`

### LinterFeedback — Score content against rubric
\`\`\`
<LinterFeedback
  title="Sales Linter: Score Your Email"
  persistKey="cold-email-L4-linter"
  inputLabel="Paste your cold email draft"
  rules={[
    { id: "personalization", label: "Personalization", description: "References something specific", keywords: ["noticed", "saw that"], antiKeywords: ["Dear Sir"] },
    { id: "cta", label: "Clear CTA", description: "Ends with a specific ask", keywords: ["15 minutes", "quick call"] }
  ]}
/>
\`\`\`

### ScenarioSimulator — Adjustable levers with live output
\`\`\`
<ScenarioSimulator
  title="Outreach ROI Calculator"
  persistKey="strategy-L1-simulator"
  levers={[
    { id: "emails", label: "Emails per week", min: 10, max: 200, step: 10, defaultValue: 50 },
    { id: "replyRate", label: "Reply rate (%)", min: 1, max: 20, step: 1, defaultValue: 5 }
  ]}
  outputs={[
    { id: "meetings", label: "Meetings per month", formula: "(emails * 4 * (replyRate / 100) * 0.25)", unit: "", precision: 1 }
  ]}
  insight="At {meetings} meetings/month with 20% close rate, that's roughly {meetings * 0.2} new customers monthly."
/>
\`\`\`

### StrategyDuel — Compare two approaches
\`\`\`
<StrategyDuel
  title="Broad vs. Niche Targeting"
  persistKey="icp-L1-duel"
  scenario="You have 100 hours of sales time this month."
  strategyA={{ name: "Broad", description: "Target all SMBs", pros: ["Larger market"], cons: ["Generic messaging", "Low conversion"] }}
  strategyB={{ name: "Niche", description: "Target 200 agencies with 10-50 employees", pros: ["Higher conversion", "Word-of-mouth"], cons: ["Smaller initial market"] }}
  expertVerdict="Niche wins for solo founders. 5% on 200 targeted beats 0.1% on 10,000 generic."
/>
\`\`\`
`;

const RETROFIT_SYSTEM_PROMPT = `You are an expert instructional designer retrofitting lesson markdown files with interactive MDX components. Your job is to enhance existing plain-text lessons by adding 4-8 interactive components that make the content engaging and hands-on.

## RULES
1. PRESERVE all existing content — headings, paragraphs, lists, existing components. You are ADDING components, not replacing text.
2. Target 4-8 component additions per lesson — enough to make it interactive, not overwhelming.
3. Use REAL content from the lesson for component props — extract frameworks, examples, and exercises from what's already written. Do NOT use placeholder text.
4. persistKey format: {courseId}-L{lessonNum}-{shortname} (e.g., sales-psych-L1-reframe)
5. Don't touch quiz JSON blocks at the bottom of lessons (\`\`\`json blocks with "quizId").
6. Place components WHERE they naturally fit in the content flow — after a concept, as practice for a framework, as a self-check.
7. Return the COMPLETE file content (frontmatter + all content + quiz if present).
8. Do NOT add markdown code fences around the output. Return raw markdown/MDX only.

## CONTENT PATTERN → COMPONENT MAPPING
- Numbered lists of 3+ distinct concepts → SlideNavigation + Slide
- Before/after or good/bad examples → SwipeDecision or RewriteExercise
- Self-assessment moments → RangeSlider with persistKey
- Key definitions or frameworks → FlipCard or ConceptReframe
- Action items or checklists at end → InteractiveChecklist
- Existing \`- [ ]\` checkbox lists → Convert to InteractiveChecklist
- Case studies with outcomes → PredictionGate before the outcome reveal
- Fill-in frameworks or templates → TemplateBuilder
- Build-and-compare exercises → ComparisonBuilder
- Sorting/categorization content → ClassifyExercise
- Branching decisions → DecisionTree
- Timed practice → TimedChallenge
- Roleplay/conversation practice → MiniRoleplay
- Content evaluation → LinterFeedback
- Data with adjustable variables → ScenarioSimulator
- Two competing approaches → StrategyDuel

## COMPONENT CATALOG
${COMPONENT_CATALOG}`;

const CREATE_LESSON_SYSTEM_PROMPT = `You are an expert instructional designer creating lessons for an AI-native customer acquisition academy. Each lesson must be interactive from the start — no plain text walls.

## LESSON STRUCTURE
Every lesson follows this pattern:
1. **Frontmatter** (YAML) — title, duration, track, course, lesson number
2. **Opening Hook** — A story, scenario, or provocative question that grabs attention
3. **Core Sections** (3-6 sections) — Each teaching a specific concept with embedded interactive components
4. **Summary/Action Items** — InteractiveChecklist at the end
5. **Quiz** (optional) — JSON block at the bottom

## RULES
1. Write engaging, direct prose. Address the reader as "you." Use concrete examples.
2. Include 5-10 interactive components per lesson, baked into the flow.
3. Every section should have at least one interactive element.
4. Use the course research package for accurate data, statistics, and frameworks.
5. persistKey format: {courseId}-L{lessonNum}-{shortname}
6. Write in markdown with inline JSX component tags (MDX format).
7. Do NOT wrap output in code fences. Return raw markdown/MDX.
8. Frontmatter format:
\`\`\`
---
title: "Lesson Title Here"
duration: "45 min"
track: "Track Name"
course: "Course N: Course Title"
lesson: 1
---
\`\`\`

## CONTENT GUIDELINES
- Target solo founders (technical, coach/consultant, and content creator types)
- Budget-conscious ($100-200/month tool spend)
- Time-constrained (5-7 hours/week on acquisition)
- Practical over theoretical — every concept needs an exercise
- Reference real tools and current (2025-2026) data
- Use the 4 Building Blocks pattern where applicable:
  1. Concept Capsule (explain the core idea)
  2. Guided Build Session (create an artifact)
  3. Simulation/Roleplay (practice in context)
  4. Implementation Sprint (real-world execution)

## COMPONENT CATALOG
${COMPONENT_CATALOG}`;

// ─── Course definitions (from batch-create-course.ts) ───────────────────────

interface LessonSpec {
  id: string;
  title: string;
  duration: string;
}
interface CourseSpec {
  courseNumber: number;
  courseId: string;
  courseTitle: string;
  trackId: string;
  trackTitle: string;
  outcomes: string[];
  lessons: LessonSpec[];
}

const RESEARCH_FILES: Record<number, string> = {
  21: "course-21-ai-acquisition-strategy.md",
  22: "course-22-email-deliverability.md",
  23: "course-23-ai-lead-research.md",
  24: "course-24-ai-outreach-automation.md",
  25: "course-25-linkedin-ai.md",
  26: "course-26-autonomous-sdr.md",
  27: "course-27-custom-ai-agents.md",
  36: "course-36-customer-onboarding.md",
  37: "course-37-retention-churn.md",
  38: "course-38-expansion-upsell.md",
  39: "course-39-customer-advocacy.md",
  40: "course-40-crm-setup.md",
  41: "course-41-sales-analytics.md",
  42: "course-42-sales-automation.md",
  43: "course-43-outsourcing-vas.md",
  44: "course-44-sales-playbook.md",
  45: "course-45-scaling-first-hire.md",
  46: "course-46-sales-legal.md",
  47: "course-47-sales-finance.md",
  48: "course-48-capstone.md",
};

const COURSES_TO_CREATE: CourseSpec[] = [
  {
    courseNumber: 21,
    courseId: "ai-acquisition-strategy",
    courseTitle: "Course 21: AI Acquisition Strategy",
    trackId: "ai-acquisition",
    trackTitle: "AI-Powered Acquisition",
    outcomes: [
      "Map the AI acquisition stack: discovery → enrichment → scoring → personalization → send",
      "Build a solo-founder lead scoring model (1-10) using fit + signal + friction",
      "Define automate vs human boundary using the Automation Failure Matrix",
      "Design a 5-7 hour/week AI-assisted acquisition rhythm",
      "Compare junior SDR cost (~$4-6K/month) vs AI stack cost (~$100-200/month)",
    ],
    lessons: [
      {
        id: "1",
        title: "The 2026 AI Acquisition Landscape",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Prospecting & List Building with AI + Data Tools",
        duration: "55 min",
      },
      {
        id: "3",
        title: "Enrichment Workflows: From Raw Data to Scored Leads",
        duration: "55 min",
      },
      {
        id: "4",
        title: "Your Lead Scoring Model (1-10 Fit + Signal + Friction)",
        duration: "50 min",
      },
      {
        id: "5",
        title: "AI Personalization Engines: First Lines That Convert",
        duration: "55 min",
      },
      {
        id: "6",
        title: "The Automation Failure Matrix: What to Never Automate",
        duration: "50 min",
      },
      {
        id: "7",
        title: "Your AI Acquisition Weekly Rhythm",
        duration: "50 min",
      },
      {
        id: "8",
        title: "Measuring What Matters: KPIs for AI-Assisted Sales",
        duration: "50 min",
      },
      {
        id: "9",
        title: "Economics: AI Stack vs Junior SDR",
        duration: "45 min",
      },
      {
        id: "10",
        title: "Your AI Acquisition Strategy Blueprint",
        duration: "55 min",
      },
    ],
  },
  {
    courseNumber: 22,
    courseId: "email-deliverability",
    courseTitle: "Course 22: Email Deliverability & Infrastructure",
    trackId: "ai-acquisition",
    trackTitle: "AI-Powered Acquisition",
    outcomes: [
      "Set up SPF, DKIM, and DMARC correctly for cold outreach domains",
      "Design a multi-domain strategy (main + 3-5 sending domains)",
      "Execute a 30-day inbox warmup plan with safe volume ramps",
      "Monitor and troubleshoot deliverability issues using GlockApps/MailReach",
      "Build incident response playbooks for when domains hit spam",
    ],
    lessons: [
      {
        id: "1",
        title: "What Changed: 2025-2026 Bulk Sender Rules",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Gmail & Yahoo Requirements (SPF/DKIM/DMARC)",
        duration: "55 min",
      },
      {
        id: "3",
        title: "Microsoft Outlook: Why It's Harsher",
        duration: "50 min",
      },
      {
        id: "4",
        title: "Domain Strategy: Main + 3-5 Sending Domains",
        duration: "55 min",
      },
      {
        id: "5",
        title: "DNS Setup Checklist (Step by Step)",
        duration: "50 min",
      },
      {
        id: "6",
        title: "Warmup Timelines & Safe Volume Ramps",
        duration: "50 min",
      },
      {
        id: "7",
        title: "Inbox Rotation & Sending Limits (<500/day)",
        duration: "55 min",
      },
      {
        id: "8",
        title: "Content Patterns That Trigger Filters in 2026",
        duration: "50 min",
      },
      {
        id: "9",
        title: "Monitoring & Troubleshooting (GlockApps, MailReach)",
        duration: "50 min",
      },
      {
        id: "10",
        title: "Incident Playbook: When a Domain Hits Spam",
        duration: "50 min",
      },
      { id: "11", title: "B2B vs Creator Infra Templates", duration: "50 min" },
      { id: "12", title: "Your Deliverability Checklist", duration: "45 min" },
    ],
  },
  {
    courseNumber: 23,
    courseId: "ai-lead-research",
    courseTitle: "Course 23: AI Lead Research & Enrichment",
    trackId: "ai-acquisition",
    trackTitle: "AI-Powered Acquisition",
    outcomes: [
      "Build a Discover → Enrich → Score → Personalize → Send pipeline",
      "Use waterfall enrichment (Clay/Apollo) to maximize email coverage at minimal cost",
      "Deploy AI agents for prospect research, ICP scoring, and segment tagging",
      "Apply the same workflow to both B2B and creator ICPs with different enrichment fields",
      "Choose between buy (Clay/Apollo) vs build (n8n + APIs) based on your stage",
    ],
    lessons: [
      {
        id: "1",
        title: "The Enrichment Stack Landscape (Clay, Apollo, Hunter, Snov)",
        duration: "55 min",
      },
      {
        id: "2",
        title: "LinkedIn-Native vs Off-Platform Enrichment (ToS-Safe)",
        duration: "50 min",
      },
      {
        id: "3",
        title: "Waterfall Enrichment: 30% → 80% Coverage",
        duration: "55 min",
      },
      {
        id: "4",
        title:
          "The 5-Step Pipeline: Discover → Enrich → Score → Personalize → Send",
        duration: "55 min",
      },
      {
        id: "5",
        title: "Building the Prospect Research Agent",
        duration: "55 min",
      },
      {
        id: "6",
        title: "ICP-Fit Scoring Agent (1-10 Model)",
        duration: "50 min",
      },
      { id: "7", title: "Segment Tagging Agent", duration: "45 min" },
      {
        id: "8",
        title: "B2B Enrichment Fields vs Creator Enrichment Fields",
        duration: "50 min",
      },
      {
        id: "9",
        title: "Build vs Buy: DIY Stack (n8n + APIs) vs Clay/Apollo",
        duration: "55 min",
      },
      { id: "10", title: "Your Enrichment Playbook", duration: "50 min" },
    ],
  },
  {
    courseNumber: 24,
    courseId: "ai-outreach-automation",
    courseTitle: "Course 24: AI Outreach Automation",
    trackId: "ai-acquisition",
    trackTitle: "AI-Powered Acquisition",
    outcomes: [
      "Compare and select from Instantly, Smartlead, Lemlist, La Growth Machine, and HeyReach",
      "Build multi-channel sequences (email + LinkedIn + voice note)",
      "Run AI vs hand-written A/B tests with statistical rigor",
      "Wire reply detection → CRM updates → tasks via Zapier/Make/n8n",
      "Assemble a complete outreach stack under $200/month",
    ],
    lessons: [
      {
        id: "1",
        title: "The 2026 Outreach Platform Landscape",
        duration: "50 min",
      },
      { id: "2", title: "Instantly & Smartlead Deep Dive", duration: "55 min" },
      {
        id: "3",
        title: "Lemlist & Multi-Channel Tools (LGM, HeyReach)",
        duration: "55 min",
      },
      {
        id: "4",
        title: "Multi-Channel Sequence Design (B2B Framing)",
        duration: "55 min",
      },
      {
        id: "5",
        title: "Multi-Channel Sequence Design (Creator Framing)",
        duration: "50 min",
      },
      {
        id: "6",
        title: "AI Personalization: In-Tool vs External LLMs",
        duration: "50 min",
      },
      {
        id: "7",
        title: "A/B Testing AI Copy vs Hand-Written Baselines",
        duration: "50 min",
      },
      {
        id: "8",
        title: "Reply Routing & Workflow Automation",
        duration: "50 min",
      },
      { id: "9", title: "The 'Never Automate' Rules", duration: "45 min" },
      {
        id: "10",
        title: "Reference Stack 1: Lean Email-First (~$120/month)",
        duration: "50 min",
      },
      {
        id: "11",
        title: "Reference Stack 2: Multi-Channel (~$170/month)",
        duration: "50 min",
      },
      { id: "12", title: "Your Outreach Stack Blueprint", duration: "50 min" },
    ],
  },
  {
    courseNumber: 25,
    courseId: "linkedin-ai",
    courseTitle: "Course 25: LinkedIn AI Applications",
    trackId: "ai-acquisition",
    trackTitle: "AI-Powered Acquisition",
    outcomes: [
      "Understand LinkedIn's 2026 automation policies and enforcement patterns",
      "Use AI for content drafting while preserving authentic voice",
      "Distinguish safe AI engagement from ban-worthy automation",
      "Execute the Bootstrapped Sales Navigator + AI Workflow",
      "Deploy voice notes and Loom videos as high-converting outreach touches",
    ],
    lessons: [
      {
        id: "1",
        title: "LinkedIn's 2026 Automation Policy (What's Banned vs Tolerated)",
        duration: "45 min",
      },
      {
        id: "2",
        title: "AI Content Creation: Drafting Posts & Carousels",
        duration: "55 min",
      },
      {
        id: "3",
        title: "Repurposing Long-Form Content to LinkedIn with AI",
        duration: "50 min",
      },
      {
        id: "4",
        title: "Safe AI Engagement (Comment Helpers, Summarizers)",
        duration: "50 min",
      },
      {
        id: "5",
        title: "Tool Safety Table: Safe vs Caution vs Risky",
        duration: "45 min",
      },
      {
        id: "6",
        title: "Sales Navigator + AI: The Bootstrapped Workflow",
        duration: "55 min",
      },
      {
        id: "7",
        title: "AI-Generated 1-Page Prospect Briefs",
        duration: "50 min",
      },
      {
        id: "8",
        title: "Voice Notes & Loom Videos as Outreach Touches",
        duration: "50 min",
      },
      {
        id: "9",
        title: "B2B vs Creator LinkedIn Strategies",
        duration: "50 min",
      },
      { id: "10", title: "Your LinkedIn AI Playbook", duration: "50 min" },
    ],
  },
  {
    courseNumber: 26,
    courseId: "autonomous-sdr",
    courseTitle: "Course 26: Autonomous SDR Systems",
    trackId: "ai-acquisition",
    trackTitle: "AI-Powered Acquisition",
    outcomes: [
      "Understand how AI SDR platforms work (ingestion → research → sequence → reply → book)",
      "Compare autopilot vs copilot modes and when each is appropriate",
      "Evaluate pricing economics ($400-5K/month AI SDR vs $100-160/month DIY stack)",
      "Implement human-in-the-loop supervision patterns for AI SDRs",
      "Know when to use an AI SDR platform vs a simpler Instantly/Smartlead stack",
    ],
    lessons: [
      {
        id: "1",
        title: "How AI SDR Platforms Actually Work",
        duration: "50 min",
      },
      { id: "2", title: "Autopilot vs Copilot Modes", duration: "45 min" },
      {
        id: "3",
        title: "Platform Deep Dive: 11x, Artisan, AiSDR, Salesforge",
        duration: "55 min",
      },
      {
        id: "4",
        title: "Pricing & Economics for Solo Founders",
        duration: "50 min",
      },
      {
        id: "5",
        title: "Results: What Solo Founders Actually See",
        duration: "50 min",
      },
      {
        id: "6",
        title: "Failure Modes: Off-Brand, Hallucinations, Spam",
        duration: "55 min",
      },
      {
        id: "7",
        title: "Supervision Patterns: Daily Queue + Kill Switches",
        duration: "50 min",
      },
      {
        id: "8",
        title: "The Automation Failure Matrix for AI SDRs",
        duration: "50 min",
      },
      {
        id: "9",
        title: "Fit Analysis: When to Use AI SDR vs DIY Stack",
        duration: "55 min",
      },
      {
        id: "10",
        title: "Building a 'Solo AI SDR Lite' System",
        duration: "55 min",
      },
    ],
  },
  {
    courseNumber: 27,
    courseId: "custom-ai-agents",
    courseTitle: "Course 27: Building Custom AI Sales Agents",
    trackId: "ai-acquisition",
    trackTitle: "AI-Powered Acquisition",
    outcomes: [
      "Choose between LangChain, CrewAI, AutoGen, and Claude Agent SDK for your use case",
      "Build 5 core sales agents (research, email draft, CRM enrichment, meeting prep, post-call)",
      "Design data flows from LinkedIn/CSV to enrichment to AI to outreach",
      "Compare self-hosted (VPS ~$50/month) vs SaaS ($200-400/month) architectures",
      "Handle PII, API keys, and compliance as a one-person operation",
    ],
    lessons: [
      {
        id: "1",
        title: "Agent Frameworks: LangChain vs CrewAI vs AutoGen vs Claude SDK",
        duration: "55 min",
      },
      {
        id: "2",
        title: "Orchestrators: n8n, Trigger.dev, Zapier, Make",
        duration: "50 min",
      },
      {
        id: "3",
        title: "Agent 1: Prospect Research Agent",
        duration: "55 min",
      },
      {
        id: "4",
        title: "Agent 2: Email First-Draft Agent",
        duration: "55 min",
      },
      { id: "5", title: "Agent 3: CRM Enrichment Agent", duration: "50 min" },
      { id: "6", title: "Agent 4: Meeting Prep Agent", duration: "50 min" },
      {
        id: "7",
        title: "Agent 5: Post-Call Summary Agent",
        duration: "50 min",
      },
      {
        id: "8",
        title: "Reference Architecture: Self-Hosted vs SaaS",
        duration: "55 min",
      },
      { id: "9", title: "Token Economics & Running Costs", duration: "45 min" },
      {
        id: "10",
        title: "Security, PII, and Compliance for Solo Ops",
        duration: "45 min",
      },
      {
        id: "11",
        title: "Dual-Context: B2B Discovery Prep vs Creator Nurture Agent",
        duration: "50 min",
      },
      {
        id: "12",
        title: "Your Custom Agent Stack Blueprint",
        duration: "55 min",
      },
    ],
  },
  {
    courseNumber: 36,
    courseId: "onboarding",
    courseTitle: "Course 36: Customer Onboarding",
    trackId: "customer-success",
    trackTitle: "Customer Success",
    outcomes: [
      "Build milestone-based onboarding paths for SaaS and service businesses",
      "Design welcome sequences that cut first-month churn (from ~38% to ~10%)",
      "Structure onboarding calls for tiny customer counts",
      "Create in-app checklists and email sequences tied to activation milestones",
      "Integrate CS into a 5-7 hour/week rhythm without burnout",
    ],
    lessons: [
      {
        id: "1",
        title: "Why Onboarding Is Where Churn Happens",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Product-Led SaaS: 90-Day Milestone Map",
        duration: "55 min",
      },
      {
        id: "3",
        title: "Services/Coaching: 90-Day Delivery Rhythm",
        duration: "55 min",
      },
      {
        id: "4",
        title: "Welcome Sequences & In-App Checklists",
        duration: "50 min",
      },
      { id: "5", title: "The 'First Win' Email at Day 7", duration: "45 min" },
      {
        id: "6",
        title: "Onboarding Calls for Small Customer Counts",
        duration: "50 min",
      },
      {
        id: "7",
        title: "Day 45-60 Check-In & Survey Design",
        duration: "50 min",
      },
      {
        id: "8",
        title: "Automating Onboarding with Zapier/Make/n8n",
        duration: "50 min",
      },
      {
        id: "9",
        title: "Time Management: CS in 5-7 Hours/Week",
        duration: "45 min",
      },
      { id: "10", title: "Your Onboarding Playbook", duration: "50 min" },
    ],
  },
  {
    courseNumber: 37,
    courseId: "retention",
    courseTitle: "Course 37: Retention & Churn Prevention",
    trackId: "customer-success",
    trackTitle: "Customer Success",
    outcomes: [
      "Build a simple health score model (Usage 40% + Engagement 30% + Business 30%)",
      "Track churn prediction signals: logins, feature adoption, email engagement, payment behavior",
      "Benchmark against SMB SaaS norms (<3% monthly logo churn, NRR ≥100%)",
      "Wire reactivation sequences, feature nudges, and save plays via automation",
      "Maintain a weekly CS review block (2-3 hours) focused on red and high-potential accounts",
    ],
    lessons: [
      {
        id: "1",
        title: "The Economics of Retention (5-25x Cheaper Than Acquisition)",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Simple Health Score: Usage + Engagement + Business",
        duration: "55 min",
      },
      {
        id: "3",
        title: "Churn Prediction Signals You Can Actually Track",
        duration: "50 min",
      },
      {
        id: "4",
        title: "SMB Churn Benchmarks & NRR Targets",
        duration: "45 min",
      },
      {
        id: "5",
        title: "Reactivation Sequences (No Login in 10 Days)",
        duration: "50 min",
      },
      { id: "6", title: "Feature Adoption Nudges", duration: "45 min" },
      {
        id: "7",
        title: "'Save' Plays: Downgrades, Pauses, and Recovery Calls",
        duration: "50 min",
      },
      { id: "8", title: "The Weekly CS Review Block", duration: "45 min" },
      {
        id: "9",
        title: "Automation Recipes for Retention",
        duration: "50 min",
      },
      { id: "10", title: "Your Retention Playbook", duration: "50 min" },
    ],
  },
  {
    courseNumber: 38,
    courseId: "expansion",
    courseTitle: "Course 38: Expansion & Upsell",
    trackId: "customer-success",
    trackTitle: "Customer Success",
    outcomes: [
      "Identify usage-based and role-based expansion triggers",
      "Time upsell conversations around outcome milestones",
      "Structure seat expansion, done-for-you, and upgraded retainer pitches",
      "Track Net Revenue Retention and expansion contribution to growth",
    ],
    lessons: [
      {
        id: "1",
        title: "Expansion as a Growth Engine (NRR > 100%)",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Usage-Based Expansion Triggers (SaaS)",
        duration: "50 min",
      },
      {
        id: "3",
        title: "Outcome-Based Expansion Triggers (Services/Coaching)",
        duration: "50 min",
      },
      {
        id: "4",
        title: "Seat & License Expansion Playbook",
        duration: "45 min",
      },
      {
        id: "5",
        title: "Done-for-You & Consulting Upsell Paths",
        duration: "50 min",
      },
      { id: "6", title: "Upgraded Retainer Conversations", duration: "45 min" },
      {
        id: "7",
        title: "Pricing Expansion Without Alienating Customers",
        duration: "50 min",
      },
      { id: "8", title: "Your Expansion Playbook", duration: "45 min" },
    ],
  },
  {
    courseNumber: 39,
    courseId: "advocacy",
    courseTitle: "Course 39: Customer Advocacy",
    trackId: "customer-success",
    trackTitle: "Customer Success",
    outcomes: [
      "Collect testimonials systematically within the first 30-60 days",
      "Write mini case studies with the Challenge-Solution-Results framework",
      "Design a lightweight referral loop that runs on autopilot",
      "Time advocacy asks to coincide with customer success milestones",
    ],
    lessons: [
      {
        id: "1",
        title: "Why Advocacy Beats Advertising for Solo Founders",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Testimonial Collection System (2-3 Question Form)",
        duration: "50 min",
      },
      {
        id: "3",
        title: "Mini Case Studies: Challenge → Solution → Results",
        duration: "50 min",
      },
      { id: "4", title: "Video Testimonials on a Budget", duration: "45 min" },
      {
        id: "5",
        title: "Referral Loop Design ('Know 1-2 People?')",
        duration: "50 min",
      },
      {
        id: "6",
        title: "Timing Advocacy Asks to Success Milestones",
        duration: "45 min",
      },
      { id: "7", title: "Building a Social Proof Library", duration: "45 min" },
      { id: "8", title: "Your Advocacy Playbook", duration: "45 min" },
    ],
  },
  {
    courseNumber: 40,
    courseId: "crm-setup",
    courseTitle: "Course 40: Advanced CRM Setup",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Compare HubSpot Free, Attio, Folk, Close, and Pipedrive for solo use",
      "Configure universal pipeline stages (Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost)",
      "Set up email logging, deal tracking, and contact enrichment",
      "Choose the right CRM by sales motion (volume B2B vs relationship/creator)",
    ],
    lessons: [
      {
        id: "1",
        title: "CRM Philosophy: System of Action, Not Just a Database",
        duration: "45 min",
      },
      {
        id: "2",
        title: "HubSpot Free & Attio: Comparison for Solo Founders",
        duration: "55 min",
      },
      {
        id: "3",
        title: "Folk & Close: Relationship vs Volume CRMs",
        duration: "55 min",
      },
      { id: "4", title: "Universal Pipeline Stages Setup", duration: "50 min" },
      {
        id: "5",
        title: "Email Logging & Contact Enrichment",
        duration: "45 min",
      },
      { id: "6", title: "Deal Tracking & Custom Fields", duration: "50 min" },
      { id: "7", title: "CRM Hygiene: Keeping Data Clean", duration: "45 min" },
      {
        id: "8",
        title: "Choosing by Sales Motion (B2B vs Creator)",
        duration: "45 min",
      },
      {
        id: "9",
        title: "Migration: Moving Between CRMs Without Losing Data",
        duration: "45 min",
      },
      { id: "10", title: "Your CRM Setup Checklist", duration: "45 min" },
    ],
  },
  {
    courseNumber: 41,
    courseId: "analytics",
    courseTitle: "Course 41: Sales Analytics & BI",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Build a funnel dashboard (Leads → Meetings → Proposals → Wins with conversion %)",
      "Track pipeline velocity (days between stages)",
      "Implement binary commit/upside forecasting to neutralize founder optimism",
      "Define CAC payback targets (1-3 months bootstrapped, 6-9 months with runway)",
    ],
    lessons: [
      {
        id: "1",
        title: "The 3 Questions Your Metrics Must Answer",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Funnel Dashboard: Leads → Meetings → Proposals → Wins",
        duration: "55 min",
      },
      {
        id: "3",
        title: "Pipeline Velocity: Average Days Between Stages",
        duration: "50 min",
      },
      { id: "4", title: "Commit vs Upside Forecasting", duration: "50 min" },
      {
        id: "5",
        title: "CAC, LTV, and Payback Period for Bootstrapped Founders",
        duration: "55 min",
      },
      {
        id: "6",
        title: "Revenue Tracking: New vs Expansion vs Churned MRR",
        duration: "50 min",
      },
      {
        id: "7",
        title: "Channel Attribution: Which Source Drives Wins?",
        duration: "50 min",
      },
      {
        id: "8",
        title: "Building Dashboards in Sheets, CRM, or Metabase",
        duration: "50 min",
      },
      { id: "9", title: "Weekly Metrics Review Ritual", duration: "45 min" },
      { id: "10", title: "Your Analytics Playbook", duration: "45 min" },
    ],
  },
  {
    courseNumber: 42,
    courseId: "automation",
    courseTitle: "Course 42: Sales Automation",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Compare Zapier vs Make vs n8n vs Trigger.dev for solo founder use",
      "Build the 5 core automations: Lead Catcher, Meeting Logger, Follow-Up Reminder, Contract Chaser, Notifications",
      "Wire reply detection → CRM updates → tasks",
      "Keep total automation spend under $100/month",
    ],
    lessons: [
      {
        id: "1",
        title: "Automation Tools: Zapier vs Make vs n8n vs Trigger.dev",
        duration: "50 min",
      },
      {
        id: "2",
        title: "Automation 1: Lead Catcher (Form → CRM → Notify)",
        duration: "50 min",
      },
      {
        id: "3",
        title: "Automation 2: Meeting Logger (Call → CRM → Follow-Up)",
        duration: "50 min",
      },
      {
        id: "4",
        title: "Automation 3: Follow-Up Reminder (Day 3/7/14 Chain)",
        duration: "50 min",
      },
      {
        id: "5",
        title: "Automation 4: Contract & Invoice Chaser",
        duration: "45 min",
      },
      {
        id: "6",
        title: "Automation 5: Deal Notifications (Slack/Email Alerts)",
        duration: "45 min",
      },
      {
        id: "7",
        title: "Wiring Reply Detection → CRM → Tasks",
        duration: "50 min",
      },
      {
        id: "8",
        title: "Budget Optimization: Staying Under $100/Month",
        duration: "45 min",
      },
      { id: "9", title: "Debugging Broken Automations", duration: "45 min" },
      {
        id: "10",
        title: "Your Automation Stack Blueprint",
        duration: "45 min",
      },
    ],
  },
  {
    courseNumber: 43,
    courseId: "outsourcing",
    courseTitle: "Course 43: Outsourcing & VAs",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Identify the threshold for hiring help (>40-50 active opps or >5 hours/week admin)",
      "Write delegation SOPs for inbox triage, CRM updates, and prospect research",
      "Decide between VA support vs part-time SDR based on your stage",
      "Manage a VA effectively without micromanagement",
    ],
    lessons: [
      {
        id: "1",
        title: "When Pipeline Load Justifies a VA",
        duration: "45 min",
      },
      {
        id: "2",
        title: "VA vs Part-Time SDR: Which First?",
        duration: "50 min",
      },
      {
        id: "3",
        title: "SOP 1: Inbox Triage (Lead/Customer/Admin/Noise)",
        duration: "50 min",
      },
      {
        id: "4",
        title: "SOP 2: CRM Updates (Stage, Amount, Next Steps)",
        duration: "45 min",
      },
      { id: "5", title: "SOP 3: Prospect Research Tasks", duration: "50 min" },
      {
        id: "6",
        title: "Hiring, Onboarding, and Managing a VA",
        duration: "50 min",
      },
      { id: "7", title: "Tools for VA Collaboration", duration: "45 min" },
      { id: "8", title: "Your Delegation Playbook", duration: "45 min" },
    ],
  },
  {
    courseNumber: 44,
    courseId: "playbook",
    courseTitle: "Course 44: The Sales Playbook",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Answer the 5 core questions: Who? How? What message? How measured? What commitment?",
      "Build situation-specific playbooks (Starting from Zero, B2B SaaS, Coach/Consultant, Creator, Scaling)",
      "Create a one-page personal acquisition system",
      "Design a 90-day commitment contract with specific activity metrics",
    ],
    lessons: [
      {
        id: "1",
        title: "The 5 Core Questions Every Playbook Answers",
        duration: "50 min",
      },
      {
        id: "2",
        title: "Playbook: Starting from Zero (0 Customers)",
        duration: "55 min",
      },
      { id: "3", title: "Playbook: B2B SaaS Founder", duration: "55 min" },
      { id: "4", title: "Playbook: Coach/Consultant", duration: "50 min" },
      { id: "5", title: "Playbook: Creator with Audience", duration: "50 min" },
      {
        id: "6",
        title: "Playbook: Scaling from 50 to 500 Customers",
        duration: "55 min",
      },
      {
        id: "7",
        title: "The One-Page Personal Acquisition System",
        duration: "55 min",
      },
      { id: "8", title: "The 90-Day Commitment Contract", duration: "50 min" },
      {
        id: "9",
        title: "Quarterly Review & Playbook Updates",
        duration: "45 min",
      },
      { id: "10", title: "Your Complete Sales Playbook", duration: "55 min" },
    ],
  },
  {
    courseNumber: 45,
    courseId: "scale",
    courseTitle: "Course 45: Scaling to First Sales Hire",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Know when it's time to hire (>$30K MRR or >50 active opps)",
      "Choose between SDR, AE, fractional, or VA as first hire",
      "Write a job description, run interviews, and evaluate candidates",
      "Onboard and ramp a new sales hire in 30-60 days",
    ],
    lessons: [
      { id: "1", title: "The Hire Timing Decision Tree", duration: "45 min" },
      {
        id: "2",
        title: "SDR vs AE vs Fractional vs VA: First Hire Matrix",
        duration: "55 min",
      },
      { id: "3", title: "Writing the Job Description", duration: "50 min" },
      {
        id: "4",
        title: "Interview Framework for Sales Roles",
        duration: "55 min",
      },
      {
        id: "5",
        title: "Compensation: Base + Variable Models",
        duration: "50 min",
      },
      { id: "6", title: "The 30-Day Onboarding Playbook", duration: "50 min" },
      { id: "7", title: "Ramp Expectations: Month 1-3", duration: "45 min" },
      { id: "8", title: "Managing Your First Sales Rep", duration: "50 min" },
      {
        id: "9",
        title: "When the First Hire Doesn't Work Out",
        duration: "45 min",
      },
      { id: "10", title: "Your Hiring Playbook", duration: "45 min" },
    ],
  },
  {
    courseNumber: 46,
    courseId: "legal",
    courseTitle: "Course 46: Sales Legal & Contracts",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Know which contract template to use: MSA, SOW, SaaS Terms, or simple engagement letter",
      "Customize scope, payment terms, IP, and termination clauses",
      "Set up e-signature workflows (DocuSign, SignWell)",
      "Know when to involve legal counsel vs handle it yourself",
    ],
    lessons: [
      {
        id: "1",
        title: "Contract Types: MSA, SOW, SaaS Terms, Engagement Letters",
        duration: "50 min",
      },
      {
        id: "2",
        title: "What to Customize: Scope, Payment, IP, Termination",
        duration: "55 min",
      },
      {
        id: "3",
        title: "Payment Terms: Net 7/14/30 and Late Fees",
        duration: "45 min",
      },
      {
        id: "4",
        title: "E-Signature Workflows and Contract Management",
        duration: "45 min",
      },
      { id: "5", title: "Redlines: What to Push Back On", duration: "50 min" },
      { id: "6", title: "When to Involve Legal Counsel", duration: "40 min" },
      { id: "7", title: "Your Contract Templates Library", duration: "45 min" },
    ],
  },
  {
    courseNumber: 47,
    courseId: "finance",
    courseTitle: "Course 47: Sales Finance & Tax",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Set up standardized invoicing with automated reminders (7/14/30 days overdue)",
      "Track MRR: new vs expansion vs churned revenue",
      "Calculate and target CAC payback period (1-3 months bootstrapped)",
      "Understand basic sales tax, VAT, and revenue recognition for solo businesses",
    ],
    lessons: [
      {
        id: "1",
        title: "Invoicing Systems: Stripe, Chargebee, PayPal",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Automated Collections & Overdue Reminders",
        duration: "45 min",
      },
      {
        id: "3",
        title: "Revenue Tracking: New, Expansion, and Churned MRR",
        duration: "50 min",
      },
      {
        id: "4",
        title: "CAC Payback: Bootstrapped vs VC Benchmarks",
        duration: "50 min",
      },
      {
        id: "5",
        title: "Cash Flow Management for Lumpy Revenue",
        duration: "45 min",
      },
      {
        id: "6",
        title: "Sales Tax, VAT, and Compliance Basics",
        duration: "45 min",
      },
      { id: "7", title: "Your Finance Dashboard", duration: "45 min" },
    ],
  },
  {
    courseNumber: 48,
    courseId: "capstone",
    courseTitle: "Course 48: Capstone — Your Complete Acquisition System",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Assemble all playbooks, templates, and systems from Tracks 1-7 into one living document",
      "Execute a 30-day acquisition sprint with real targets and accountability",
      "Present your acquisition system for peer and AI review",
      "Earn your Customer Acquisition Academy certification",
    ],
    lessons: [
      {
        id: "1",
        title: "Capstone Overview: What You'll Build",
        duration: "30 min",
      },
      {
        id: "2",
        title: "System Assembly: ICP + Positioning + Channel",
        duration: "60 min",
      },
      {
        id: "3",
        title: "System Assembly: Outreach + Sequences + CRM",
        duration: "60 min",
      },
      {
        id: "4",
        title: "System Assembly: Discovery + Proposals + Closing",
        duration: "60 min",
      },
      {
        id: "5",
        title: "System Assembly: Retention + Expansion + Advocacy",
        duration: "55 min",
      },
      {
        id: "6",
        title: "The 30-Day Sprint: Planning Your Targets",
        duration: "50 min",
      },
      { id: "7", title: "Week 1 Execution & Review", duration: "90 min" },
      { id: "8", title: "Week 2 Execution & Review", duration: "90 min" },
      { id: "9", title: "Week 3 Execution & Review", duration: "90 min" },
      { id: "10", title: "Week 4 Execution & Review", duration: "90 min" },
      { id: "11", title: "Final System Documentation", duration: "60 min" },
      {
        id: "12",
        title: "Certification Presentation & Review",
        duration: "60 min",
      },
    ],
  },
];

// ─── Progress tracker ───────────────────────────────────────────────────────

class Progress {
  private done = 0;
  private failed = 0;
  private skipped = 0;
  constructor(
    private total: number,
    private label: string,
  ) {}

  tick(status: "ok" | "skip" | "fail", detail: string) {
    if (status === "ok") this.done++;
    else if (status === "skip") this.skipped++;
    else this.failed++;
    const pct = Math.round(
      ((this.done + this.skipped + this.failed) / this.total) * 100,
    );
    const icon = status === "ok" ? "✓" : status === "skip" ? "–" : "✗";
    console.log(
      `[${this.label}] ${icon} ${detail} (${pct}% | ${this.done}✓ ${this.skipped}– ${this.failed}✗ / ${this.total})`,
    );
  }

  summary() {
    console.log(
      `\n[${this.label}] Done: ${this.done} created, ${this.skipped} skipped, ${this.failed} failed`,
    );
  }
}

// ─── Retrofit job ───────────────────────────────────────────────────────────

async function runRetrofit() {
  console.log("\n=== RETROFIT: Finding plain-text lessons ===");
  const lessons = await getPlainTextLessons();
  // Skip new tracks — they already have components baked in
  const toRetrofit = lessons.filter(
    (l) =>
      !["ai-acquisition", "customer-success", "operations-systems"].includes(
        l.trackId,
      ),
  );

  if (toRetrofit.length === 0) {
    console.log("[Retrofit] No plain-text lessons found — all done!");
    return;
  }

  console.log(
    `[Retrofit] Found ${toRetrofit.length} plain-text lessons to process`,
  );
  const progress = new Progress(toRetrofit.length, "Retrofit");
  const sem = makeSemaphore(3); // 3 concurrent AI calls
  let attempts: Record<string, number> = {};

  await Promise.all(
    toRetrofit.map(({ trackId, courseId, lessonNum }) =>
      sem(async () => {
        const key = `${courseId}/lesson-${lessonNum}`;
        const maxAttempts = 3;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            const original = await readLesson(trackId, courseId, lessonNum);
            // Double-check in case another process added components
            if (hasComponents(original)) {
              progress.tick("skip", `${key} (already interactive)`);
              return;
            }

            const enhanced = await generateContent({
              systemPrompt: RETROFIT_SYSTEM_PROMPT,
              userPrompt: `Enhance this lesson with 4-8 interactive MDX components. The course ID is "${courseId}" and this is lesson ${lessonNum}. Use these for persistKey prefixes.

IMPORTANT: Return the COMPLETE file content including frontmatter. Do NOT wrap in code fences.

Here is the lesson content:

${original}`,
              maxTokens: 12000,
              temperature: 0.3,
            });

            const clean = enhanced
              .replace(/^```(?:markdown|mdx)?\n?/, "")
              .replace(/\n?```$/, "")
              .trim();

            if (!hasComponents(clean))
              throw new Error("No components in response");
            if (!clean.startsWith("---"))
              throw new Error("Missing frontmatter");

            await writeLesson(trackId, courseId, lessonNum, clean);
            progress.tick("ok", key);
            return;
          } catch (err: any) {
            if (attempt === maxAttempts) {
              progress.tick("fail", `${key} — ${err.message}`);
            } else {
              await new Promise((r) => setTimeout(r, 5000 * attempt));
            }
          }
        }
      }),
    ),
  );

  progress.summary();
}

// ─── Create job ─────────────────────────────────────────────────────────────

async function runCreate(filterCourseNumber?: number) {
  console.log("\n=== CREATE: Building new lessons for Tracks 4-7 ===");

  const courses = filterCourseNumber
    ? COURSES_TO_CREATE.filter((c) => c.courseNumber === filterCourseNumber)
    : COURSES_TO_CREATE;

  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  console.log(
    `[Create] ${courses.length} courses, ${totalLessons} lessons total`,
  );

  // Read blueprint once
  let blueprint = "";
  try {
    blueprint = await readResearch("design-blueprint-tracks-4-7.md");
  } catch {
    console.warn("[Create] No design blueprint found");
  }

  const progress = new Progress(totalLessons, "Create");
  const sem = makeSemaphore(3); // 3 concurrent per course

  // Process courses in parallel (3 at a time), lessons within each course also parallelized
  const courseSem = makeSemaphore(3);

  await Promise.all(
    courses.map((course) =>
      courseSem(async () => {
        console.log(`\n[Create] Starting: ${course.courseTitle}`);

        // Read research once per course
        let research = "";
        const researchFile = RESEARCH_FILES[course.courseNumber];
        if (researchFile) {
          try {
            research = await readResearch(researchFile);
          } catch {
            console.warn(
              `[Create] No research for course ${course.courseNumber}`,
            );
          }
        }

        await Promise.all(
          course.lessons.map((lesson) =>
            sem(async () => {
              const key = `${course.courseId}/lesson-${lesson.id}`;

              // Skip if exists
              if (
                await lessonExists(course.trackId, course.courseId, lesson.id)
              ) {
                progress.tick("skip", `${key} (exists)`);
                return;
              }

              const maxAttempts = 3;
              for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                  const userPrompt = `Create lesson ${lesson.id} of ${course.lessons.length} for this course.

## Lesson Details
- **Title:** ${lesson.title}
- **Duration:** ${lesson.duration}
- **Course:** ${course.courseTitle} (Course ${course.courseNumber})
- **Track:** ${course.trackTitle}
- **Course ID (for persistKey):** ${course.courseId}

## Course Outcomes (this lesson should contribute to these)
${course.outcomes.map((o) => `- ${o}`).join("\n")}

## Research Package
${research ? research.slice(0, 30000) : "No research package available. Use your knowledge of the topic to create comprehensive, accurate content."}

## Design Blueprint
${blueprint ? blueprint.slice(0, 5000) : "Follow the 4 Building Blocks pattern: Concept Capsule → Guided Build → Simulation/Roleplay → Implementation Sprint."}

Generate the complete lesson file with frontmatter, engaging content, and 5-10 interactive components baked in. The frontmatter should use:
- title: "${lesson.title}"
- duration: "${lesson.duration}"
- track: "${course.trackTitle}"
- course: "${course.courseTitle}"
- lesson: ${lesson.id}`;

                  const content = await generateContent({
                    systemPrompt: CREATE_LESSON_SYSTEM_PROMPT,
                    userPrompt,
                    maxTokens: 16384,
                    temperature: 0.4,
                  });

                  const clean = content
                    .replace(/^```(?:markdown|mdx)?\n?/, "")
                    .replace(/\n?```$/, "")
                    .trim();

                  if (!hasComponents(clean))
                    throw new Error("No components in response");
                  if (!clean.startsWith("---"))
                    throw new Error("Missing frontmatter");

                  await writeLesson(
                    course.trackId,
                    course.courseId,
                    lesson.id,
                    clean,
                  );
                  progress.tick("ok", key);
                  return;
                } catch (err: any) {
                  if (attempt === maxAttempts) {
                    progress.tick("fail", `${key} — ${err.message}`);
                  } else {
                    await new Promise((r) => setTimeout(r, 5000 * attempt));
                  }
                }
              }
            }),
          ),
        );
      }),
    ),
  );

  progress.summary();
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const retrofitOnly = args.includes("--retrofit-only");
  const createOnly = args.includes("--create-only");
  const courseArg = args.find((a) => a.startsWith("--course="));
  const courseNumber = courseArg
    ? parseInt(courseArg.split("=")[1])
    : undefined;

  if (!process.env.OPENROUTER_API_KEY) {
    console.error("ERROR: OPENROUTER_API_KEY not set");
    process.exit(1);
  }

  console.log(`Starting content pipeline at ${new Date().toISOString()}`);
  console.log(`Model: ${MODEL}`);

  if (!createOnly) {
    await runRetrofit();
  }

  if (!retrofitOnly) {
    await runCreate(courseNumber);
  }

  console.log(`\nPipeline complete at ${new Date().toISOString()}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
