import type { ArtifactType } from "@/lib/data/artifact-map";

export type WorkshopStepType =
  | "show-current"
  | "teach-framework"
  | "guided-edit"
  | "ai-review"
  | "save-artifact";

export interface WorkshopStep {
  id: string;
  type: WorkshopStepType;
  title: string;
  instruction: string;
  /** Prompt template for AI steps. Use {{placeholders}} for profile data. */
  promptTemplate?: string;
  /** For guided-edit steps: field the user edits */
  editField?: string;
  editPlaceholder?: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  assessmentDimension: string;
  frameworkRef: string;
  estimatedMinutes: number;
  steps: WorkshopStep[];
  /** Artifact type to create/update on completion */
  outputArtifact?: ArtifactType;
  /** Source to re-audit after completion */
  triggerReaudit?: "website" | "linkedin" | "documents";
}

// ── Workshop Definitions ──

export const WORKSHOPS: Workshop[] = [
  {
    id: "icp-clarity",
    title: "Define Your Ideal Customer",
    description:
      "Use the ICP Framework to identify who you can help, who will pay, and who is a joy to work with.",
    assessmentDimension: "icpClarity",
    frameworkRef: "ICP Framework",
    estimatedMinutes: 25,
    outputArtifact: "icpDocument",
    steps: [
      {
        id: "show-current",
        type: "show-current",
        title: "Your Current ICP State",
        instruction:
          "Here is what we know about your target customer from your assessment and any existing ICP artifact. Review this before we refine it.",
      },
      {
        id: "teach-framework",
        type: "teach-framework",
        title: "The ICP Framework",
        instruction:
          "Your ICP is the intersection of three circles: people you CAN help (capability), people who WILL pay (willingness), and people who are a JOY to work with (fit). Most founders pick too broad an audience. We are going to get specific.",
        promptTemplate: `The founder's business is: {{businessName}} ({{businessModel}}, {{stage}} stage).
Their elevator pitch: {{elevatorPitch}}
Their current target audience: {{targetAudience}}

Teach them the ICP Framework in 3-4 paragraphs. Use their specific business context. End with 3 questions they should answer in the next step:
1. Who have you helped most successfully in the past? (capability circle)
2. Who paid the fastest and with the least friction? (willingness circle)
3. Who did you enjoy working with most? (joy circle)`,
      },
      {
        id: "draft-icp",
        type: "guided-edit",
        title: "Draft Your ICP Summary",
        instruction:
          "Based on the framework above, write a one-paragraph description of your ideal customer. Be specific about their role, company size, industry, and the pain they feel.",
        editField: "icpSummary",
        editPlaceholder:
          "My ideal customer is a [role] at a [company type] who struggles with [specific pain]...",
      },
      {
        id: "ai-review",
        type: "ai-review",
        title: "Coach Review",
        instruction:
          "Your AI coach will review your ICP draft and suggest improvements.",
        promptTemplate: `The founder drafted this ICP summary:
"{{userDraft}}"

Their business: {{businessName}} ({{businessModel}})
Assessment ICP Clarity score: {{icpClarity}}%

Review their ICP draft. Check for:
1. Specificity - is the target narrow enough to guide outreach?
2. Pain clarity - is the customer's pain specific and urgent?
3. Qualification signals - could you identify this person in a LinkedIn search?

Give 2-3 specific improvement suggestions. Be direct, not generic.`,
      },
      {
        id: "save",
        type: "save-artifact",
        title: "Save to Your Playbook",
        instruction:
          "Your ICP Document will be saved to your playbook. You can refine it anytime from Course 1.",
      },
    ],
  },
  {
    id: "positioning-rewrite",
    title: "Craft Your Positioning Statement",
    description:
      "Use the Prescription Frame to articulate your solution as a diagnosis-based prescription.",
    assessmentDimension: "positioningStrength",
    frameworkRef: "Prescription Frame",
    estimatedMinutes: 20,
    outputArtifact: "positioningStatement",
    steps: [
      {
        id: "show-current",
        type: "show-current",
        title: "Your Current Positioning",
        instruction:
          "Here is what your website and LinkedIn currently say about what you do. Notice any contradictions or vagueness.",
      },
      {
        id: "teach-framework",
        type: "teach-framework",
        title: "The Prescription Frame",
        instruction:
          '"Prescription before diagnosis is malpractice." Your positioning should feel like a doctor saying "based on what I see, here is what I recommend" -- not a salesperson pitching features.',
        promptTemplate: `The founder's business: {{businessName}} ({{businessModel}})
Their current value proposition: {{valueProposition}}
Their website messaging: {{websiteIcpSummary}}
Their positioning score: {{positioningStrength}}%

Teach the Prescription Frame in 3-4 paragraphs using their specific context. The frame has 4 parts:
1. Recap the diagnosis (what problem you identified)
2. Present solution connected to THEIR words
3. Establish the outcome (what changes)
4. Name the price and propose next steps

End with the positioning statement template:
"For [target customer] who [need], [product] is [category] that [key benefit]. Unlike [competitors], we [differentiator]."`,
      },
      {
        id: "draft-positioning",
        type: "guided-edit",
        title: "Write Your Positioning Statement",
        instruction:
          'Fill in the template: "For [target customer] who [need], [your product] is [category] that [key benefit]. Unlike [competitors], we [differentiator]."',
        editField: "positioningStatement",
        editPlaceholder:
          "For [target customer] who [need], [your product] is [category] that [key benefit]. Unlike [competitors], we [differentiator].",
      },
      {
        id: "ai-review",
        type: "ai-review",
        title: "Coach Review",
        instruction: "Your AI coach will review your positioning statement.",
        promptTemplate: `The founder wrote this positioning statement:
"{{userDraft}}"

Their ICP: {{icpSummary}}
Their business: {{businessName}} ({{businessModel}})

Review for:
1. Clarity - could a stranger understand what they do in one read?
2. Differentiation - does "unlike [competitors]" actually differentiate?
3. ICP alignment - does the target customer match their ICP?

Give 2-3 specific improvements.`,
      },
      {
        id: "save",
        type: "save-artifact",
        title: "Save to Your Playbook",
        instruction:
          "Your Positioning Statement will be saved to your playbook.",
      },
    ],
  },
  {
    id: "linkedin-overhaul",
    title: "Fix Your LinkedIn Messaging",
    description:
      "Align your LinkedIn profile with your ICP and Positioning Statement using Outreach Tactics.",
    assessmentDimension: "messagingConsistency",
    frameworkRef: "Outreach Tactics",
    estimatedMinutes: 20,
    triggerReaudit: "linkedin",
    steps: [
      {
        id: "show-current",
        type: "show-current",
        title: "Your LinkedIn Audit Results",
        instruction:
          "Here is what our source audit found about your LinkedIn profile. Notice the gap between what you say there and what your ICP/Positioning say.",
      },
      {
        id: "teach-framework",
        type: "teach-framework",
        title: "LinkedIn as a Landing Page",
        instruction:
          'Your LinkedIn profile is not a resume. It is a landing page for your ICP. Every word should answer: "What does this do for ME as your ideal customer?"',
        promptTemplate: `The founder's LinkedIn audit: {{linkedinAnalysis}}
Their ICP: {{icpSummary}}
Their positioning: {{positioningStatement}}
Their messaging score: {{messagingConsistency}}%

Teach them how to rewrite their LinkedIn as a landing page for their ICP. Cover:
1. Headline: lead with what you do for them, not your title
2. About: open with their pain, then your credibility, then your solution
3. Featured: link to your best proof (case study, free resource, product)

Write specific draft suggestions for their headline and first 2 sentences of their About section.`,
      },
      {
        id: "draft-headline",
        type: "guided-edit",
        title: "Rewrite Your LinkedIn Headline",
        instruction:
          "Write a headline that leads with what you do for your ICP, not your job title. Max 220 characters.",
        editField: "linkedinHeadline",
        editPlaceholder: "I help [ICP] achieve [outcome] through [method]...",
      },
      {
        id: "ai-review",
        type: "ai-review",
        title: "Coach Review",
        instruction: "Your AI coach will review your LinkedIn headline draft.",
        promptTemplate: `The founder wrote this LinkedIn headline:
"{{userDraft}}"

Their ICP: {{icpSummary}}
Their positioning statement: {{positioningStatement}}

Review for:
1. ICP targeting - would their ideal customer click through?
2. Value clarity - is it obvious what they offer?
3. Credibility signals - does it hint at proof?

Give 2-3 specific improvements. Keep it under 220 characters.`,
      },
      {
        id: "copy-instructions",
        type: "save-artifact",
        title: "Copy to LinkedIn",
        instruction:
          "Copy the headline above and paste it into your LinkedIn profile. After updating, you can re-run your assessment to see your messaging score improve.",
      },
    ],
  },
  {
    id: "channel-selection",
    title: "Choose Your Acquisition Channel",
    description:
      "Use Playbook Selection and the Zero-to-Ten Sprint to pick ONE channel and build an operational cadence.",
    assessmentDimension: "channelReadiness",
    frameworkRef: "Zero-to-Ten Sprint",
    estimatedMinutes: 20,
    outputArtifact: "acquisitionPath",
    steps: [
      {
        id: "show-current",
        type: "show-current",
        title: "Your Channel Readiness",
        instruction:
          "Here is your current channel readiness assessment. Most founders spread thin across too many channels. We are picking ONE.",
      },
      {
        id: "teach-framework",
        type: "teach-framework",
        title: "The Zero-to-Ten Sprint",
        instruction:
          "The Zero-to-Ten Sprint is a 12-week operational cadence to acquire your first 10 customers. It works because it forces focus on a single channel.",
        promptTemplate: `The founder's business: {{businessName}} ({{businessModel}}, {{stage}} stage)
Their ICP: {{icpSummary}}
Their current channels: {{channels}}
Their channel readiness score: {{channelReadiness}}%

Teach the Playbook Selection + Zero-to-Ten Sprint in 3-4 paragraphs. Help them choose between:
- Outbound (cold email, LinkedIn DMs) - best if ICP is clearly identifiable on LinkedIn
- Inbound (content, SEO) - best if ICP searches for solutions
- Hybrid - best if they have some existing content and need to supplement

Based on their ICP and business model, recommend ONE primary channel and explain why.`,
      },
      {
        id: "draft-path",
        type: "guided-edit",
        title: "Choose Your Path",
        instruction:
          "Write your primary acquisition path (inbound, outbound, or hybrid) and the 1-2 specific channels you will use.",
        editField: "acquisitionPath",
        editPlaceholder:
          "Primary path: [inbound/outbound/hybrid]. Channels: [e.g., LinkedIn outreach + cold email]",
      },
      {
        id: "ai-review",
        type: "ai-review",
        title: "Coach Review",
        instruction: "Your AI coach will validate your channel selection.",
        promptTemplate: `The founder chose this acquisition path:
"{{userDraft}}"

Their business: {{businessName}} ({{businessModel}}, {{stage}})
Their ICP: {{icpSummary}}

Review for:
1. ICP fit - can they actually reach their ICP through this channel?
2. Resource fit - can a solo founder execute this in 5-7 hrs/week?
3. Focus - did they pick too many channels? (Max 2 for solo founders)

Give specific feedback.`,
      },
      {
        id: "save",
        type: "save-artifact",
        title: "Save to Your Playbook",
        instruction:
          "Your Acquisition Path will be saved. Next, take Course 3 to build out your 12-week sprint plan.",
      },
    ],
  },
  {
    id: "discovery-script",
    title: "Build Your Discovery Script",
    description:
      "Use Diagnostic Discovery and MVQ to create a structured discovery call playbook.",
    assessmentDimension: "salesProcessMaturity",
    frameworkRef: "Diagnostic Discovery + MVQ",
    estimatedMinutes: 30,
    outputArtifact: "discoveryPlaybook",
    steps: [
      {
        id: "show-current",
        type: "show-current",
        title: "Your Sales Process State",
        instruction:
          "Here is your current sales process maturity score. Most technical founders have no structured approach to discovery calls.",
      },
      {
        id: "teach-framework",
        type: "teach-framework",
        title: "Diagnostic Discovery + MVQ",
        instruction:
          "Discovery calls are diagnosis, not interrogation. MVQ (Pain, Impact, Decision) replaces the 6-pillar enterprise MEDDIC with 3 pillars a solo founder can actually use.",
        promptTemplate: `The founder's business: {{businessName}} ({{businessModel}})
Their ICP: {{icpSummary}}
Their sales process score: {{salesProcessMaturity}}%
Their DISC type: {{discPrimary}}

Teach Diagnostic Discovery + MVQ in 4-5 paragraphs:

1. The 30-Minute Discovery Structure:
   - Minutes 1-3: Set the frame ("I'd like to understand your situation...")
   - Minutes 3-15: Situation and Problem questions
   - Minutes 15-20: Quantify the impact (MVQ Impact pillar)
   - Minutes 20-25: Solution fit
   - Minutes 25-30: Next steps

2. MVQ Framework:
   - Pain: "What specific problem are you trying to solve?"
   - Impact: "What happens if you don't solve this in the next 6 months?"
   - Decision: "If we find a fit, what does your decision process look like?"

3. The 70/30 rule: prospect talks 70%, you talk 30%

Adapt the teaching to their DISC type. End with 3 specific discovery questions they should draft for their ICP.`,
      },
      {
        id: "draft-questions",
        type: "guided-edit",
        title: "Draft Your Discovery Questions",
        instruction:
          "Write 5-7 discovery questions organized by MVQ pillar: Pain (2-3 questions), Impact (1-2 questions), Decision (1-2 questions).",
        editField: "discoveryQuestions",
        editPlaceholder:
          "PAIN:\n1. What specific challenge brought you to look for [solution type]?\n2. ...\n\nIMPACT:\n1. What happens if this doesn't get solved in the next 6 months?\n\nDECISION:\n1. If we find a fit, what does your evaluation process look like?",
      },
      {
        id: "ai-review",
        type: "ai-review",
        title: "Coach Review",
        instruction: "Your AI coach will review your discovery questions.",
        promptTemplate: `The founder drafted these discovery questions:
"{{userDraft}}"

Their ICP: {{icpSummary}}
Their business: {{businessName}} ({{businessModel}})

Review for:
1. MVQ coverage - do questions cover Pain, Impact, and Decision?
2. Open-ended - are questions open enough to get real answers?
3. ICP-specific - are questions tailored to their specific ICP's world?
4. 70/30 rule - will these questions keep the prospect talking?

Give specific rewording suggestions for any weak questions.`,
      },
      {
        id: "save",
        type: "save-artifact",
        title: "Save to Your Playbook",
        instruction:
          "Your Discovery Playbook will be saved. Practice these questions with the AI Roleplay simulator to build confidence before your first real call.",
      },
    ],
  },

  // ── 30-Minute Sprint Workshops (Quick Wins) ──

  {
    id: "sprint-cold-email",
    title: "30-Min Sprint: First Cold Email Sequence",
    description:
      "Write and send your first 3-email cold outreach sequence in 30 minutes. No templates — AI-coached drafts based on your ICP.",
    assessmentDimension: "channelReadiness",
    frameworkRef: "PAS + AIDA Frameworks",
    estimatedMinutes: 30,
    steps: [
      {
        id: "show-current",
        type: "show-current",
        title: "Your Starting Point",
        instruction:
          "Here is your ICP and positioning. We will use these to write cold emails that feel personal, not spammy.",
      },
      {
        id: "teach-framework",
        type: "teach-framework",
        title: "The 3-Email Sequence",
        instruction:
          "You need exactly 3 emails: (1) PAS — Problem, Agitate, Solve. Lead with their pain. (2) Value — share a relevant insight or case study. (3) Breakup — last chance, low pressure. Each email should be under 100 words.",
        promptTemplate: `The founder's business: {{businessName}} ({{businessModel}})
Their ICP: {{icpSummary}}
Their positioning: {{positioningStatement}}

Write a complete 3-email cold outreach sequence for their ICP. Each email should be:
- Under 100 words
- Personalized to their specific ICP role/pain
- Have a clear CTA (reply, book a call, etc.)

Email 1 (Day 1): PAS framework — open with their specific pain
Email 2 (Day 3): Value — share an insight relevant to their industry
Email 3 (Day 7): Breakup — "If this isn't a priority, no worries"

Format each email with Subject line and Body.`,
      },
      {
        id: "draft-sequence",
        type: "guided-edit",
        title: "Customize Your Sequence",
        instruction:
          "Take the AI-generated sequence above and customize it with your voice, real details, and specific proof points.",
        editField: "coldEmailSequence",
        editPlaceholder:
          "EMAIL 1 (Day 1):\nSubject: ...\nBody: ...\n\nEMAIL 2 (Day 3):\nSubject: ...\nBody: ...\n\nEMAIL 3 (Day 7):\nSubject: ...\nBody: ...",
      },
      {
        id: "ai-review",
        type: "ai-review",
        title: "Coach Review",
        instruction:
          "Your AI coach will review your email sequence for deliverability, personalization, and conversion.",
        promptTemplate: `The founder wrote this cold email sequence:
"{{userDraft}}"

Their ICP: {{icpSummary}}

Review for:
1. Length — each email under 100 words?
2. Personalization — does it reference their ICP's specific world?
3. CTA clarity — is the ask obvious and low-friction?
4. Spam triggers — any words that will hurt deliverability?

Give 2-3 specific improvements.`,
      },
      {
        id: "save",
        type: "save-artifact",
        title: "Save & Send",
        instruction:
          "Your cold email sequence is ready. Copy these into your email tool (Apollo, Lemlist, or even Gmail) and start sending today.",
      },
    ],
  },
  {
    id: "sprint-linkedin-profile",
    title: "30-Min Sprint: Sales-Ready LinkedIn Profile",
    description:
      "Transform your LinkedIn from a resume into a sales machine in 30 minutes. Headline, About, and Featured sections.",
    assessmentDimension: "messagingConsistency",
    frameworkRef: "LinkedIn as Landing Page",
    estimatedMinutes: 30,
    steps: [
      {
        id: "show-current",
        type: "show-current",
        title: "Your LinkedIn Audit",
        instruction:
          "Here is what your LinkedIn currently communicates. Notice: does it speak to your ICP or to a recruiter?",
      },
      {
        id: "teach-framework",
        type: "teach-framework",
        title: "The 3-Section Rewrite",
        instruction:
          "Your LinkedIn has 3 high-impact sections: Headline (first impression), About (your pitch), Featured (your proof). We will rewrite all three in the next 20 minutes.",
        promptTemplate: `The founder's LinkedIn analysis: {{linkedinAnalysis}}
Their ICP: {{icpSummary}}
Their positioning: {{positioningStatement}}
Their business: {{businessName}}

Generate a complete LinkedIn profile rewrite with:

1. HEADLINE (max 220 chars): Lead with what you do FOR your ICP, not your job title.
   Format: "I help [ICP] [achieve outcome] | [credibility signal]"

2. ABOUT (max 2600 chars, but aim for 4-6 short paragraphs):
   - Para 1: Hook — state their pain in their words
   - Para 2: Your approach — what you do differently
   - Para 3: Proof — numbers, clients, or results
   - Para 4: CTA — what should they do next?

3. FEATURED section suggestions: What 3 items should they pin?

Write the actual copy, not instructions.`,
      },
      {
        id: "draft-profile",
        type: "guided-edit",
        title: "Customize Your Profile",
        instruction:
          "Take the AI draft and make it yours. Add real numbers, real client names (with permission), and your authentic voice.",
        editField: "linkedinProfile",
        editPlaceholder:
          "HEADLINE:\n...\n\nABOUT:\n...\n\nFEATURED:\n1. ...\n2. ...\n3. ...",
      },
      {
        id: "ai-review",
        type: "ai-review",
        title: "Final Check",
        instruction: "Quick review before you publish.",
        promptTemplate: `The founder wrote this LinkedIn profile:
"{{userDraft}}"

Their ICP: {{icpSummary}}

Quick check:
1. Would their ICP click "Connect" after reading this?
2. Is the headline under 220 characters?
3. Does the About section have a clear CTA?
Give 1-2 final tweaks.`,
      },
      {
        id: "save",
        type: "save-artifact",
        title: "Copy to LinkedIn",
        instruction:
          "Copy each section and paste it into your LinkedIn profile. After updating, re-run your assessment to see your messaging score improve.",
      },
    ],
  },
  {
    id: "sprint-sales-script",
    title: "30-Min Sprint: Your First Sales Script",
    description:
      "Build a structured discovery call script you can use on your very next sales conversation. No winging it.",
    assessmentDimension: "salesProcessMaturity",
    frameworkRef: "MVQ Discovery",
    estimatedMinutes: 30,
    steps: [
      {
        id: "show-current",
        type: "show-current",
        title: "Your Sales Process Today",
        instruction:
          "Here is your current sales process maturity. If your score is below 50%, you are likely winging every call. Let us fix that.",
      },
      {
        id: "teach-framework",
        type: "teach-framework",
        title: "The 30-Minute Call Structure",
        instruction:
          "Every sales call follows the same 5-phase structure: Frame (2 min) → Pain (10 min) → Impact (5 min) → Fit (8 min) → Next Steps (5 min). The key: you talk 30%, they talk 70%.",
        promptTemplate: `The founder's business: {{businessName}} ({{businessModel}})
Their ICP: {{icpSummary}}
Their DISC type: {{discPrimary}}
Their sales process score: {{salesProcessMaturity}}%

Write a complete 30-minute discovery call script tailored to their ICP. Include:

PHASE 1 — FRAME (2 min):
"Thanks for making time. I'd love to understand [specific to their ICP]..."

PHASE 2 — PAIN DISCOVERY (10 min):
3 open-ended questions about their ICP's specific challenges

PHASE 3 — IMPACT (5 min):
2 questions that quantify the cost of not solving the problem

PHASE 4 — FIT CHECK (8 min):
How to present your solution connected to the pain they described

PHASE 5 — NEXT STEPS (5 min):
How to close for the next meeting or proposal

Adapt tone for their DISC type ({{discPrimary}}).`,
      },
      {
        id: "draft-script",
        type: "guided-edit",
        title: "Customize Your Script",
        instruction:
          "Personalize the script with your voice. Replace any generic phrases with language your ICP actually uses.",
        editField: "salesScript",
        editPlaceholder:
          'FRAME:\n"Thanks for making time today..."\n\nPAIN QUESTIONS:\n1. ...\n2. ...\n3. ...\n\nIMPACT QUESTIONS:\n1. ...\n2. ...\n\nFIT PRESENTATION:\n"Based on what you shared..."\n\nNEXT STEPS:\n"If this makes sense, the next step would be..."',
      },
      {
        id: "ai-review",
        type: "ai-review",
        title: "Coach Review",
        instruction: "Your AI coach will review your call script.",
        promptTemplate: `The founder wrote this discovery call script:
"{{userDraft}}"

Their ICP: {{icpSummary}}
Their DISC type: {{discPrimary}}

Review for:
1. 70/30 rule — will the prospect talk most?
2. Pain depth — do questions get to real business impact?
3. Natural flow — does it feel conversational, not interrogative?
4. DISC adaptation — does the tone match their selling style?

Give 2-3 specific improvements.`,
      },
      {
        id: "save",
        type: "save-artifact",
        title: "Save & Practice",
        instruction:
          "Your sales script is saved. Now practice it with the AI Roleplay simulator before your next real call.",
      },
    ],
  },
];

// ── Lookup helpers ──

const WORKSHOP_MAP = new Map<string, Workshop>();
for (const w of WORKSHOPS) {
  WORKSHOP_MAP.set(w.id, w);
}

export function getWorkshop(id: string): Workshop | undefined {
  return WORKSHOP_MAP.get(id);
}

export function getWorkshopByDimension(
  dimension: string,
): Workshop | undefined {
  return WORKSHOPS.find((w) => w.assessmentDimension === dimension);
}

export function getAllWorkshops(): Workshop[] {
  return WORKSHOPS;
}
