import { task } from "@trigger.dev/sdk/v3";
import { createLesson } from "./create-lesson";

/**
 * Course definition for batch creation.
 * Mirrors the structure from lib/data/curriculum.ts.
 */
interface CourseSpec {
  courseNumber: number;
  courseId: string;
  courseTitle: string;
  trackId: string;
  trackTitle: string;
  outcomes: string[];
  lessons: Array<{
    id: string;
    title: string;
    duration: string;
  }>;
}

/**
 * All courses that need content created (Tracks 4, 6, 7).
 * Track 5 (Creator) already has content.
 */
const COURSES_TO_CREATE: CourseSpec[] = [
  // ─── Track 4: AI-Powered Acquisition ──────────────────
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
      { id: "1", title: "The 2026 AI Acquisition Landscape", duration: "45 min" },
      { id: "2", title: "Prospecting & List Building with AI + Data Tools", duration: "55 min" },
      { id: "3", title: "Enrichment Workflows: From Raw Data to Scored Leads", duration: "55 min" },
      { id: "4", title: "Your Lead Scoring Model (1-10 Fit + Signal + Friction)", duration: "50 min" },
      { id: "5", title: "AI Personalization Engines: First Lines That Convert", duration: "55 min" },
      { id: "6", title: "The Automation Failure Matrix: What to Never Automate", duration: "50 min" },
      { id: "7", title: "Your AI Acquisition Weekly Rhythm", duration: "50 min" },
      { id: "8", title: "Measuring What Matters: KPIs for AI-Assisted Sales", duration: "50 min" },
      { id: "9", title: "Economics: AI Stack vs Junior SDR", duration: "45 min" },
      { id: "10", title: "Your AI Acquisition Strategy Blueprint", duration: "55 min" },
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
      { id: "1", title: "What Changed: 2025-2026 Bulk Sender Rules", duration: "45 min" },
      { id: "2", title: "Gmail & Yahoo Requirements (SPF/DKIM/DMARC)", duration: "55 min" },
      { id: "3", title: "Microsoft Outlook: Why It's Harsher", duration: "50 min" },
      { id: "4", title: "Domain Strategy: Main + 3-5 Sending Domains", duration: "55 min" },
      { id: "5", title: "DNS Setup Checklist (Step by Step)", duration: "50 min" },
      { id: "6", title: "Warmup Timelines & Safe Volume Ramps", duration: "50 min" },
      { id: "7", title: "Inbox Rotation & Sending Limits (<500/day)", duration: "55 min" },
      { id: "8", title: "Content Patterns That Trigger Filters in 2026", duration: "50 min" },
      { id: "9", title: "Monitoring & Troubleshooting (GlockApps, MailReach)", duration: "50 min" },
      { id: "10", title: "Incident Playbook: When a Domain Hits Spam", duration: "50 min" },
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
      { id: "1", title: "The Enrichment Stack Landscape (Clay, Apollo, Hunter, Snov)", duration: "55 min" },
      { id: "2", title: "LinkedIn-Native vs Off-Platform Enrichment (ToS-Safe)", duration: "50 min" },
      { id: "3", title: "Waterfall Enrichment: 30% → 80% Coverage", duration: "55 min" },
      { id: "4", title: "The 5-Step Pipeline: Discover → Enrich → Score → Personalize → Send", duration: "55 min" },
      { id: "5", title: "Building the Prospect Research Agent", duration: "55 min" },
      { id: "6", title: "ICP-Fit Scoring Agent (1-10 Model)", duration: "50 min" },
      { id: "7", title: "Segment Tagging Agent", duration: "45 min" },
      { id: "8", title: "B2B Enrichment Fields vs Creator Enrichment Fields", duration: "50 min" },
      { id: "9", title: "Build vs Buy: DIY Stack (n8n + APIs) vs Clay/Apollo", duration: "55 min" },
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
      { id: "1", title: "The 2026 Outreach Platform Landscape", duration: "50 min" },
      { id: "2", title: "Instantly & Smartlead Deep Dive", duration: "55 min" },
      { id: "3", title: "Lemlist & Multi-Channel Tools (LGM, HeyReach)", duration: "55 min" },
      { id: "4", title: "Multi-Channel Sequence Design (B2B Framing)", duration: "55 min" },
      { id: "5", title: "Multi-Channel Sequence Design (Creator Framing)", duration: "50 min" },
      { id: "6", title: "AI Personalization: In-Tool vs External LLMs", duration: "50 min" },
      { id: "7", title: "A/B Testing AI Copy vs Hand-Written Baselines", duration: "50 min" },
      { id: "8", title: "Reply Routing & Workflow Automation", duration: "50 min" },
      { id: "9", title: "The 'Never Automate' Rules", duration: "45 min" },
      { id: "10", title: "Reference Stack 1: Lean Email-First (~$120/month)", duration: "50 min" },
      { id: "11", title: "Reference Stack 2: Multi-Channel (~$170/month)", duration: "50 min" },
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
      { id: "1", title: "LinkedIn's 2026 Automation Policy (What's Banned vs Tolerated)", duration: "45 min" },
      { id: "2", title: "AI Content Creation: Drafting Posts & Carousels", duration: "55 min" },
      { id: "3", title: "Repurposing Long-Form Content to LinkedIn with AI", duration: "50 min" },
      { id: "4", title: "Safe AI Engagement (Comment Helpers, Summarizers)", duration: "50 min" },
      { id: "5", title: "Tool Safety Table: Safe vs Caution vs Risky", duration: "45 min" },
      { id: "6", title: "Sales Navigator + AI: The Bootstrapped Workflow", duration: "55 min" },
      { id: "7", title: "AI-Generated 1-Page Prospect Briefs", duration: "50 min" },
      { id: "8", title: "Voice Notes & Loom Videos as Outreach Touches", duration: "50 min" },
      { id: "9", title: "B2B vs Creator LinkedIn Strategies", duration: "50 min" },
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
      { id: "1", title: "How AI SDR Platforms Actually Work", duration: "50 min" },
      { id: "2", title: "Autopilot vs Copilot Modes", duration: "45 min" },
      { id: "3", title: "Platform Deep Dive: 11x, Artisan, AiSDR, Salesforge", duration: "55 min" },
      { id: "4", title: "Pricing & Economics for Solo Founders", duration: "50 min" },
      { id: "5", title: "Results: What Solo Founders Actually See", duration: "50 min" },
      { id: "6", title: "Failure Modes: Off-Brand, Hallucinations, Spam", duration: "55 min" },
      { id: "7", title: "Supervision Patterns: Daily Queue + Kill Switches", duration: "50 min" },
      { id: "8", title: "The Automation Failure Matrix for AI SDRs", duration: "50 min" },
      { id: "9", title: "Fit Analysis: When to Use AI SDR vs DIY Stack", duration: "55 min" },
      { id: "10", title: "Building a 'Solo AI SDR Lite' System", duration: "55 min" },
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
      { id: "1", title: "Agent Frameworks: LangChain vs CrewAI vs AutoGen vs Claude SDK", duration: "55 min" },
      { id: "2", title: "Orchestrators: n8n, Trigger.dev, Zapier, Make", duration: "50 min" },
      { id: "3", title: "Agent 1: Prospect Research Agent", duration: "55 min" },
      { id: "4", title: "Agent 2: Email First-Draft Agent", duration: "55 min" },
      { id: "5", title: "Agent 3: CRM Enrichment Agent", duration: "50 min" },
      { id: "6", title: "Agent 4: Meeting Prep Agent", duration: "50 min" },
      { id: "7", title: "Agent 5: Post-Call Summary Agent", duration: "50 min" },
      { id: "8", title: "Reference Architecture: Self-Hosted vs SaaS", duration: "55 min" },
      { id: "9", title: "Token Economics & Running Costs", duration: "45 min" },
      { id: "10", title: "Security, PII, and Compliance for Solo Ops", duration: "45 min" },
      { id: "11", title: "Dual-Context: B2B Discovery Prep vs Creator Nurture Agent", duration: "50 min" },
      { id: "12", title: "Your Custom Agent Stack Blueprint", duration: "55 min" },
    ],
  },

  // ─── Track 6: Customer Success ────────────────────────
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
      { id: "1", title: "Why Onboarding Is Where Churn Happens", duration: "45 min" },
      { id: "2", title: "Product-Led SaaS: 90-Day Milestone Map", duration: "55 min" },
      { id: "3", title: "Services/Coaching: 90-Day Delivery Rhythm", duration: "55 min" },
      { id: "4", title: "Welcome Sequences & In-App Checklists", duration: "50 min" },
      { id: "5", title: "The 'First Win' Email at Day 7", duration: "45 min" },
      { id: "6", title: "Onboarding Calls for Small Customer Counts", duration: "50 min" },
      { id: "7", title: "Day 45-60 Check-In & Survey Design", duration: "50 min" },
      { id: "8", title: "Automating Onboarding with Zapier/Make/n8n", duration: "50 min" },
      { id: "9", title: "Time Management: CS in 5-7 Hours/Week", duration: "45 min" },
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
      { id: "1", title: "The Economics of Retention (5-25x Cheaper Than Acquisition)", duration: "45 min" },
      { id: "2", title: "Simple Health Score: Usage + Engagement + Business", duration: "55 min" },
      { id: "3", title: "Churn Prediction Signals You Can Actually Track", duration: "50 min" },
      { id: "4", title: "SMB Churn Benchmarks & NRR Targets", duration: "45 min" },
      { id: "5", title: "Reactivation Sequences (No Login in 10 Days)", duration: "50 min" },
      { id: "6", title: "Feature Adoption Nudges", duration: "45 min" },
      { id: "7", title: "'Save' Plays: Downgrades, Pauses, and Recovery Calls", duration: "50 min" },
      { id: "8", title: "The Weekly CS Review Block", duration: "45 min" },
      { id: "9", title: "Automation Recipes for Retention", duration: "50 min" },
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
      { id: "1", title: "Expansion as a Growth Engine (NRR > 100%)", duration: "45 min" },
      { id: "2", title: "Usage-Based Expansion Triggers (SaaS)", duration: "50 min" },
      { id: "3", title: "Outcome-Based Expansion Triggers (Services/Coaching)", duration: "50 min" },
      { id: "4", title: "Seat & License Expansion Playbook", duration: "45 min" },
      { id: "5", title: "Done-for-You & Consulting Upsell Paths", duration: "50 min" },
      { id: "6", title: "Upgraded Retainer Conversations", duration: "45 min" },
      { id: "7", title: "Pricing Expansion Without Alienating Customers", duration: "50 min" },
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
      { id: "1", title: "Why Advocacy Beats Advertising for Solo Founders", duration: "45 min" },
      { id: "2", title: "Testimonial Collection System (2-3 Question Form)", duration: "50 min" },
      { id: "3", title: "Mini Case Studies: Challenge → Solution → Results", duration: "50 min" },
      { id: "4", title: "Video Testimonials on a Budget", duration: "45 min" },
      { id: "5", title: "Referral Loop Design ('Know 1-2 People?')", duration: "50 min" },
      { id: "6", title: "Timing Advocacy Asks to Success Milestones", duration: "45 min" },
      { id: "7", title: "Building a Social Proof Library", duration: "45 min" },
      { id: "8", title: "Your Advocacy Playbook", duration: "45 min" },
    ],
  },

  // ─── Track 7: Operations & Systems ────────────────────
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
      { id: "1", title: "CRM Philosophy: System of Action, Not Just a Database", duration: "45 min" },
      { id: "2", title: "HubSpot Free & Attio: Comparison for Solo Founders", duration: "55 min" },
      { id: "3", title: "Folk & Close: Relationship vs Volume CRMs", duration: "55 min" },
      { id: "4", title: "Universal Pipeline Stages Setup", duration: "50 min" },
      { id: "5", title: "Email Logging & Contact Enrichment", duration: "45 min" },
      { id: "6", title: "Deal Tracking & Custom Fields", duration: "50 min" },
      { id: "7", title: "CRM Hygiene: Keeping Data Clean", duration: "45 min" },
      { id: "8", title: "Choosing by Sales Motion (B2B vs Creator)", duration: "45 min" },
      { id: "9", title: "Migration: Moving Between CRMs Without Losing Data", duration: "45 min" },
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
      { id: "1", title: "The 3 Questions Your Metrics Must Answer", duration: "45 min" },
      { id: "2", title: "Funnel Dashboard: Leads → Meetings → Proposals → Wins", duration: "55 min" },
      { id: "3", title: "Pipeline Velocity: Average Days Between Stages", duration: "50 min" },
      { id: "4", title: "Commit vs Upside Forecasting", duration: "50 min" },
      { id: "5", title: "CAC, LTV, and Payback Period for Bootstrapped Founders", duration: "55 min" },
      { id: "6", title: "Revenue Tracking: New vs Expansion vs Churned MRR", duration: "50 min" },
      { id: "7", title: "Channel Attribution: Which Source Drives Wins?", duration: "50 min" },
      { id: "8", title: "Building Dashboards in Sheets, CRM, or Metabase", duration: "50 min" },
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
      { id: "1", title: "Automation Tools: Zapier vs Make vs n8n vs Trigger.dev", duration: "50 min" },
      { id: "2", title: "Automation 1: Lead Catcher (Form → CRM → Notify)", duration: "50 min" },
      { id: "3", title: "Automation 2: Meeting Logger (Call → CRM → Follow-Up)", duration: "50 min" },
      { id: "4", title: "Automation 3: Follow-Up Reminder (Day 3/7/14 Chain)", duration: "50 min" },
      { id: "5", title: "Automation 4: Contract & Invoice Chaser", duration: "45 min" },
      { id: "6", title: "Automation 5: Deal Notifications (Slack/Email Alerts)", duration: "45 min" },
      { id: "7", title: "Wiring Reply Detection → CRM → Tasks", duration: "50 min" },
      { id: "8", title: "Budget Optimization: Staying Under $100/Month", duration: "45 min" },
      { id: "9", title: "Debugging Broken Automations", duration: "45 min" },
      { id: "10", title: "Your Automation Stack Blueprint", duration: "45 min" },
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
      { id: "1", title: "When Pipeline Load Justifies a VA", duration: "45 min" },
      { id: "2", title: "VA vs Part-Time SDR: Which First?", duration: "50 min" },
      { id: "3", title: "SOP 1: Inbox Triage (Lead/Customer/Admin/Noise)", duration: "50 min" },
      { id: "4", title: "SOP 2: CRM Updates (Stage, Amount, Next Steps)", duration: "45 min" },
      { id: "5", title: "SOP 3: Prospect Research Tasks", duration: "50 min" },
      { id: "6", title: "Hiring, Onboarding, and Managing a VA", duration: "50 min" },
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
      { id: "1", title: "The 5 Core Questions Every Playbook Answers", duration: "50 min" },
      { id: "2", title: "Playbook: Starting from Zero (0 Customers)", duration: "55 min" },
      { id: "3", title: "Playbook: B2B SaaS Founder", duration: "55 min" },
      { id: "4", title: "Playbook: Coach/Consultant", duration: "50 min" },
      { id: "5", title: "Playbook: Creator with Audience", duration: "50 min" },
      { id: "6", title: "Playbook: Scaling from 50 to 500 Customers", duration: "55 min" },
      { id: "7", title: "The One-Page Personal Acquisition System", duration: "55 min" },
      { id: "8", title: "The 90-Day Commitment Contract", duration: "50 min" },
      { id: "9", title: "Quarterly Review & Playbook Updates", duration: "45 min" },
      { id: "10", title: "Your Complete Sales Playbook", duration: "55 min" },
    ],
  },
  {
    courseNumber: 45,
    courseId: "first-sales-hire",
    courseTitle: "Course 45: Scaling & First Sales Hire",
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
      { id: "2", title: "SDR vs AE vs Fractional vs VA: First Hire Matrix", duration: "55 min" },
      { id: "3", title: "Writing the Job Description", duration: "50 min" },
      { id: "4", title: "Interview Framework for Sales Roles", duration: "55 min" },
      { id: "5", title: "Compensation: Base + Variable Models", duration: "50 min" },
      { id: "6", title: "The 30-Day Onboarding Playbook", duration: "50 min" },
      { id: "7", title: "Ramp Expectations: Month 1-3", duration: "45 min" },
      { id: "8", title: "Managing Your First Sales Rep", duration: "50 min" },
      { id: "9", title: "When the First Hire Doesn't Work Out", duration: "45 min" },
      { id: "10", title: "Your Hiring Playbook", duration: "45 min" },
    ],
  },
  {
    courseNumber: 46,
    courseId: "sales-legal",
    courseTitle: "Course 46: Sales Legal & Compliance",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Draft basic terms of service and service agreements",
      "Understand CAN-SPAM, GDPR, and CCPA requirements for outreach",
      "Create proposal and contract templates",
      "Handle disputes and refund requests professionally",
    ],
    lessons: [
      { id: "1", title: "Legal Foundations for Solo Founder Sales", duration: "45 min" },
      { id: "2", title: "CAN-SPAM & Cold Email Compliance", duration: "50 min" },
      { id: "3", title: "GDPR & CCPA: What Solo Founders Must Know", duration: "55 min" },
      { id: "4", title: "Service Agreement Templates", duration: "50 min" },
      { id: "5", title: "Proposal & SOW Templates", duration: "45 min" },
      { id: "6", title: "Payment Terms & Invoice Best Practices", duration: "45 min" },
      { id: "7", title: "Handling Disputes & Refund Requests", duration: "45 min" },
      { id: "8", title: "Your Legal Checklist", duration: "40 min" },
    ],
  },
  {
    courseNumber: 47,
    courseId: "sales-finance",
    courseTitle: "Course 47: Sales Finance & Unit Economics",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Calculate true CAC including time cost",
      "Build LTV models for SaaS and services",
      "Design pricing with margin targets in mind",
      "Create financial forecasts from pipeline data",
    ],
    lessons: [
      { id: "1", title: "Unit Economics for Solo Founders", duration: "50 min" },
      { id: "2", title: "True CAC: Including Your Time", duration: "55 min" },
      { id: "3", title: "LTV Models: SaaS vs Services vs Creator", duration: "55 min" },
      { id: "4", title: "The CAC:LTV Ratio Health Check", duration: "45 min" },
      { id: "5", title: "Pricing Strategy & Margin Targets", duration: "50 min" },
      { id: "6", title: "Revenue Forecasting from Pipeline", duration: "50 min" },
      { id: "7", title: "Cash Flow Planning for Sales-Led Growth", duration: "50 min" },
      { id: "8", title: "Your Financial Dashboard", duration: "45 min" },
    ],
  },
  {
    courseNumber: 48,
    courseId: "capstone",
    courseTitle: "Course 48: Capstone — Your Complete Acquisition System",
    trackId: "operations-systems",
    trackTitle: "Operations & Systems",
    outcomes: [
      "Integrate learnings from all tracks into a cohesive system",
      "Build a 90-day execution plan with weekly milestones",
      "Present your acquisition system for peer review",
      "Launch your system and measure results",
    ],
    lessons: [
      { id: "1", title: "The Integration Challenge: From 48 Courses to 1 System", duration: "50 min" },
      { id: "2", title: "System Architecture: Your Acquisition Machine", duration: "55 min" },
      { id: "3", title: "The 90-Day Sprint Plan", duration: "55 min" },
      { id: "4", title: "Week 1-4: Foundation & First Outreach", duration: "50 min" },
      { id: "5", title: "Week 5-8: Optimization & Scaling", duration: "50 min" },
      { id: "6", title: "Week 9-12: Automation & Handoff", duration: "50 min" },
      { id: "7", title: "Peer Review Workshop", duration: "55 min" },
      { id: "8", title: "Launch Day: Going Live", duration: "45 min" },
      { id: "9", title: "Post-Launch: First 30 Days Review", duration: "50 min" },
      { id: "10", title: "Your Acquisition System Blueprint", duration: "55 min" },
    ],
  },
];

/**
 * Batch orchestrator: creates all lessons for a specific course or all courses.
 *
 * Payload:
 * - courseNumber: specific course (e.g., 21) — or omit for ALL courses
 */
export const batchCreateCourse = task({
  id: "batch-create-course",
  run: async (payload?: { courseNumber?: number }) => {
    let courses = COURSES_TO_CREATE;

    if (payload?.courseNumber) {
      courses = courses.filter((c) => c.courseNumber === payload.courseNumber);
      if (courses.length === 0) {
        return {
          status: "error",
          message: `Course ${payload.courseNumber} not found in creation list`,
        };
      }
    }

    console.log(
      `Creating content for ${courses.length} courses (${courses.reduce((sum, c) => sum + c.lessons.length, 0)} total lessons)`
    );

    const allResults: Array<{
      course: string;
      lesson: string;
      ok: boolean;
      output?: any;
      error?: string;
    }> = [];

    // Process courses sequentially (lessons within each course build on each other)
    for (const course of courses) {
      console.log(
        `\nStarting ${course.courseTitle} (${course.lessons.length} lessons)`
      );

      // Trigger all lessons for this course (queue handles concurrency of 1)
      const results = await createLesson.batchTriggerAndWait(
        course.lessons.map((lesson) => ({
          payload: {
            courseNumber: course.courseNumber,
            courseId: course.courseId,
            courseTitle: course.courseTitle,
            trackId: course.trackId,
            trackTitle: course.trackTitle,
            lessonNum: lesson.id,
            lessonTitle: lesson.title,
            lessonDuration: lesson.duration,
            courseOutcomes: course.outcomes,
            totalLessonsInCourse: course.lessons.length,
          },
        }))
      );

      const runs = results.runs;
      for (let i = 0; i < runs.length; i++) {
        const r = runs[i];
        allResults.push({
          course: course.courseTitle,
          lesson: `lesson-${course.lessons[i].id}`,
          ok: r.ok,
          output: r.ok ? r.output : undefined,
          error: !r.ok ? String(r.error) : undefined,
        });
      }
    }

    const succeeded = allResults.filter((r) => r.ok).length;
    const failed = allResults.filter((r) => !r.ok).length;

    console.log(
      `\nBatch create complete: ${succeeded} succeeded, ${failed} failed out of ${allResults.length} total`
    );

    return {
      status: "complete",
      total: allResults.length,
      succeeded,
      failed,
      results: allResults,
    };
  },
});
