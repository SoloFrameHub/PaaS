/**
 * AI flows for structured tasks (ICP validation, assessments, roleplay, etc.).
 * Routes through OpenRouter, direct OpenAI, or Anthropic Claude based on
 * the AI_PROVIDER env var (auto-detected from available API keys).
 */

import OpenAI from "openai";
import { z } from "zod";
import { getCache, setCache } from "@/lib/redis";
import { PERSONAS } from "@/lib/data/personas";
import {
  buildRoleplaySystemPrompt,
  buildCoachingPrompt,
} from "@/lib/services/roleplayPromptBuilder";
import type { RoleplayContext } from "@/types/roleplay";
import type { FounderProfile } from "@/types/profile";
import { logger } from "@/lib/logger";
import { aiClient, anthropicClient, getProvider } from "@/lib/ai/client";
import { resolveModel, logTokenUsage, type AITask } from "@/lib/ai/models";

async function chatJsonAnthropic<T>(params: {
  task: AITask;
  system?: string;
  prompt: string;
  schema: z.ZodType<T>;
  temperature?: number;
  maxTokens?: number;
}): Promise<T> {
  const {
    task,
    system,
    prompt,
    schema,
    temperature = 0.5,
    maxTokens = 2000,
  } = params;
  const model = resolveModel(task);

  const jsonInstruction =
    "\n\nRespond ONLY with valid JSON. No markdown, no code fences, no explanation outside the JSON object.";

  const response = await anthropicClient.messages.create({
    model,
    max_tokens: maxTokens,
    temperature,
    ...(system
      ? { system: system + jsonInstruction }
      : { system: jsonInstruction }),
    messages: [{ role: "user", content: prompt }],
  });

  logTokenUsage(task, model, response.usage);

  const textBlock = response.content.find((b) => b.type === "text");
  const content = textBlock?.text;
  if (!content) throw new Error("AI returned no content");
  let parsed: unknown;
  try {
    // Strip markdown code fences if present
    const cleaned = content
      .replace(/^```(?:json)?\s*\n?/i, "")
      .replace(/\n?```\s*$/i, "")
      .trim();
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`AI returned malformed JSON: ${content.slice(0, 200)}`);
  }
  return schema.parse(parsed);
}

async function chatTextAnthropic(params: {
  task: AITask;
  system: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const { task, system, prompt, temperature = 0.8, maxTokens = 500 } = params;
  const model = resolveModel(task);

  const response = await anthropicClient.messages.create({
    model,
    max_tokens: maxTokens,
    temperature,
    system,
    messages: [{ role: "user", content: prompt }],
  });

  logTokenUsage(task, model, response.usage);

  const textBlock = response.content.find((b) => b.type === "text");
  const content = textBlock?.text;
  if (content == null) throw new Error("AI returned no content");
  return content.trim();
}

async function chatJson<T>(params: {
  task: AITask;
  system?: string;
  prompt: string;
  schema: z.ZodType<T>;
  temperature?: number;
  maxTokens?: number;
}): Promise<T> {
  if (getProvider() === "anthropic") return chatJsonAnthropic(params);

  const {
    task,
    system,
    prompt,
    schema,
    temperature = 0.5,
    maxTokens = 2000,
  } = params;

  const messages: OpenAI.ChatCompletionMessageParam[] = [];
  if (system) messages.push({ role: "system", content: system });
  messages.push({ role: "user", content: prompt });

  const model = resolveModel(task);
  const completion = await aiClient.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
  });

  logTokenUsage(task, model, completion.usage ?? undefined);

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("AI returned no content");
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error(`AI returned malformed JSON: ${content.slice(0, 200)}`);
  }
  return schema.parse(parsed);
}

async function chatText(params: {
  task: AITask;
  system: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  if (getProvider() === "anthropic") return chatTextAnthropic(params);

  const { task, system, prompt, temperature = 0.8, maxTokens = 500 } = params;

  const model = resolveModel(task);
  const completion = await aiClient.chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
    temperature,
    max_tokens: maxTokens,
  });

  logTokenUsage(task, model, completion.usage ?? undefined);

  const content = completion.choices[0]?.message?.content;
  if (content == null) throw new Error("AI returned no content");
  return content.trim();
}

// --- ICP Validation ---
const ICPValidationOutput = z.object({
  score: z.number(),
  feedback: z.array(
    z.object({
      personaName: z.string(),
      role: z.string(),
      avatar: z.enum(["D", "I", "S", "C"]),
      comments: z.array(z.string()),
    }),
  ),
  generalAdvice: z.string(),
});

export type ICPValidationOutput = z.infer<typeof ICPValidationOutput>;

export async function openaiIcpValidation(input: {
  industry: string;
  companySize: string;
  jobTitles: string;
  painPoints: string;
  businessContext?: string;
}): Promise<ICPValidationOutput> {
  const cacheKey = `icp-validation:${JSON.stringify(input)}`;
  const cached = await getCache<ICPValidationOutput>(cacheKey);
  if (cached) return cached;

  const prompt = `
Act as a board of skeptical buyer personas evaluating a startup's Ideal Customer Profile (ICP).

BUSINESS CONTEXT:
${input.businessContext || "Not provided."}

ICP DATA BEING EVALUATED:
- Industry: ${input.industry}
- Company Size: ${input.companySize}
- Job Titles: ${input.jobTitles}
- Pain Points: ${input.painPoints}

PERSONAS TO CONSIDER:
${PERSONAS.map((p) => `- ${p.name} (${p.role}): ${p.personality.traits.join(", ")}. Hidden Agenda: ${p.hiddenAgenda}`).join("\n")}

TASK:
1. Score the ICP (0-100) based on specificity and market fit.
2. Choose 3-4 personas to provide 1-2 critical, honest comments.
3. For each comment, identify their DISC type (D, I, S, or C).
4. Provide a general piece of strategic advice.

Be brutally honest. If pain points are generic (e.g., "save time"), call them out.

Respond ONLY with valid JSON:
{ "score": number, "feedback": [ { "personaName": string, "role": string, "avatar": "D"|"I"|"S"|"C", "comments": [string] } ], "generalAdvice": string }
`;

  const result = await chatJson({
    task: "icp-validation",
    prompt,
    schema: ICPValidationOutput,
    temperature: 0.7,
    maxTokens: 1000,
  });
  await setCache(cacheKey, result, 86400);
  return result;
}

// --- Assessment Generator ---
const AssessmentOutput = z.object({
  overallReadiness: z.number().min(0).max(100),
  scores: z.object({
    icpClarity: z.number().min(0).max(100),
    positioningStrength: z.number().min(0).max(100),
    messagingConsistency: z.number().min(0).max(100),
    channelReadiness: z.number().min(0).max(100),
    salesProcessMaturity: z.number().min(0).max(100),
  }),
  scoreReasoning: z.object({
    icpClarity: z.string(),
    positioningStrength: z.string(),
    messagingConsistency: z.string(),
    channelReadiness: z.string(),
    salesProcessMaturity: z.string(),
  }),
  quickWins: z
    .array(
      z.object({
        category: z.string(),
        title: z.string(),
        description: z.string(),
        impact: z.enum(["high", "medium", "low"]),
        addressedInCourse: z.number().optional(),
        actionableStep: z.string(),
        actionType: z
          .enum(["course", "artifact", "workshop", "coach-session", "roleplay"])
          .optional(),
        actionTarget: z
          .object({
            courseNumber: z.number().optional(),
            artifactType: z.string().optional(),
            workshopId: z.string().optional(),
            roleplayConfig: z
              .object({
                discType: z.string(),
                scenarioType: z.string(),
              })
              .optional(),
          })
          .optional(),
        frameworkRef: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
  criticalGaps: z
    .array(
      z.object({
        category: z.string(),
        title: z.string(),
        description: z.string(),
        impact: z.enum(["high", "medium", "low"]),
        addressedInCourse: z.number().optional(),
        actionableStep: z.string(),
        actionType: z
          .enum(["course", "artifact", "workshop", "coach-session", "roleplay"])
          .optional(),
        actionTarget: z
          .object({
            courseNumber: z.number().optional(),
            artifactType: z.string().optional(),
            workshopId: z.string().optional(),
            roleplayConfig: z
              .object({
                discType: z.string(),
                scenarioType: z.string(),
              })
              .optional(),
          })
          .optional(),
        frameworkRef: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
  recommendedPath: z.enum(["inbound", "outbound", "hybrid"]),
  recommendedStartCourse: z.number().optional().default(1),
  journeyMap: z
    .array(
      z.object({
        phase: z.string(),
        courses: z.array(z.number()),
        estimatedWeeks: z.number(),
      }),
    )
    .optional()
    .default([]),
  personalizedInsight: z
    .string()
    .optional()
    .default("Your profile has been analyzed."),
  sourceAudits: z
    .array(
      z.object({
        source: z.enum(["website", "linkedin", "documents"]),
        title: z.string(),
        critique: z.string(),
        recommendations: z.array(z.string()),
      }),
    )
    .optional()
    .default([]),
});

export type Assessment = z.infer<typeof AssessmentOutput>;

export async function openaiAssessment(
  profile: Partial<FounderProfile>,
): Promise<Assessment> {
  const q = profile.questionnaire || ({} as Record<string, unknown>);
  const inf = profile.inferred || ({} as Record<string, unknown>);

  const prompt = `You are a senior B2B growth strategist conducting a founder readiness audit. You have been given REAL data about this founder—use it. Every claim you make must reference something specific from their profile, questionnaire answers, website analysis, or uploaded documents. Never give generic advice.

FOUNDER SNAPSHOT:
- Business: ${profile.businessName} (${profile.businessModel || "model unknown"})
- Stage: ${profile.stage || "unknown"}
- Industry: ${q.industry || "Not specified"}
- Deal size: ${q.deal_size || "Not specified"}
- Revenue: ${q.revenue_range || "Not disclosed"}
- Customer count: ${q.customer_count || "Not disclosed"}
- Sales journey: ${q.sales_journey || "Not described"}
- Founder type: ${q.founder_description || "Not categorized"}
- Self-identified barriers: ${JSON.stringify(q.barriers || [])}
- DISC profile: ${q.disc_profile ? `Primary ${(q.disc_profile as { primary: string }).primary}${(q.disc_profile as { secondary?: string }).secondary ? ", Secondary " + (q.disc_profile as { secondary?: string }).secondary : ""}` : "Not assessed"}
- Preferred channels: ${JSON.stringify(q.channels || [])}
- Time commitment: ${q.time_commitment || "Not specified"}
- Learning style: ${q.learning_style || "Not specified"}
- 90-day goal: ${q.success_90_days || "Not specified"}
- Urgency: ${q.urgency || "Not specified"}
${q.creator_offer_type ? `- Creator offer: ${q.creator_offer_type}, price point: ${q.creator_price_point || "?"}, acquisition: ${JSON.stringify(q.creator_acquisition || [])}` : ""}

STATED POSITIONING:
- Goal: ${profile.primaryGoal || "Not stated"}
- Challenge: ${profile.biggestChallenge || "Not stated"}
- Elevator pitch: ${profile.elevatorPitch || "None"}
- Target audience: ${profile.targetAudience || "None"}

ANALYZED DATA SOURCES:
1. ICP (from website/docs): ${inf.icpSummary || "Not analyzed"}
2. Value proposition: ${inf.valueProposition || "Not extracted"}
3. Competitive positioning: ${inf.competitivePositioning || "Not extracted"}
4. Pricing structure: ${inf.pricingStructure || "Not found"}
5. LinkedIn analysis: ${JSON.stringify(inf.linkedinAnalysis || "Not analyzed")}
6. Document signals (RAG): ${JSON.stringify((inf as { ragSignals?: unknown }).ragSignals || "No documents uploaded")}

SCORING RULES — be specific in every "scoreReasoning":
- icpClarity: Does the founder know WHO they sell to? Reference their target_roles, industry, deal_size, and whether their ICP summary is precise ("VP of Engineering at 50-200 person SaaS companies") or vague ("business owners"). If they uploaded docs, did the docs confirm or contradict their stated ICP?
- positioningStrength: Is their value prop differentiated? Reference their elevator pitch and website analysis. Flag if they describe features instead of outcomes, or if positioning is indistinguishable from competitors.
- messagingConsistency: Do their website, LinkedIn, pitch, and uploaded docs tell the same story? Call out specific contradictions (e.g., "website says 'enterprise-grade' but pitch targets SMBs").
- channelReadiness: Based on their preferred channels (${JSON.stringify(q.channels || [])}), deal_size (${q.deal_size}), and industry (${q.industry}): are they choosing channels that match their buyer? A founder selling enterprise deals via social media alone is a red flag.
- salesProcessMaturity: Reference sales_journey ("${q.sales_journey}"), revenue_range, customer_count, and barriers. A founder with 0 customers who self-identifies as "${q.founder_description}" with barriers ${JSON.stringify(q.barriers || [])} needs a different assessment than one with paying customers and a defined process.

QUICK WINS vs CRITICAL GAPS:
- quickWins: 2-3 things they can fix THIS WEEK that would improve their acquisition. Each "actionableStep" must be a concrete task (e.g., "Rewrite your LinkedIn headline from '${profile.elevatorPitch?.split(" ").slice(0, 5).join(" ") || "..."}...' to lead with the outcome for ${q.industry || "your"} buyers").
- criticalGaps: 2-3 structural problems. Reference specific data (e.g., "Your deal size is ${q.deal_size} but you have no outbound channel — ${q.deal_size === "enterprise" || q.deal_size === "mid_market" ? "enterprise deals almost never come from inbound alone" : "even SMB sales benefit from targeted outreach"}").

ACTION ROUTING — for EVERY quickWin and criticalGap, include these fields:
- "actionType": what they should DO first. One of: "course" (take a course), "artifact" (build/update an artifact), "workshop" (guided AI workshop), "coach-session" (talk to AI coach about this), "roleplay" (practice a sales scenario).
- "actionTarget": where to send them. Include relevant fields:
  - "courseNumber": the course number (0-48)
  - "artifactType": the artifact to build (one of: "icpDocument", "positioningStatement", "valuePropositionCanvas", "acquisitionPath", "listBuildingCriteria", "emailSequences", "discoveryPlaybook", "objectionLibrary", "personalPlaybook")
  - "workshopId": for guided workshops (one of: "icp-clarity", "positioning-rewrite", "linkedin-overhaul", "website-hero-fix", "channel-selection", "discovery-script")
  - "roleplayConfig": for roleplay practice, include { "discType": "D"|"I"|"S"|"C", "scenarioType": "discovery"|"objection"|"closing" }
- "frameworkRef": which book framework applies. Use these exact references:
  - "ICP Framework" — for targeting/customer clarity issues
  - "MVQ Framework" — for qualification issues (Pain, Impact, Decision)
  - "DISC Selling" — for communication style / buyer persona issues
  - "Prescription Frame" — for positioning/presentation issues
  - "Diagnostic Discovery" — for discovery call / sales process issues
  - "Zero-to-Ten Sprint" — for founders with 0 customers who need a structured launch plan
  - "Proof Ladder" — for social proof / credibility issues
  - "Retention Flywheel" — for customer retention / referral issues
  - "Value Anchoring" — for pricing / proposal issues

FRAMEWORK-TO-DIMENSION MAPPING (use this to inform actionType and frameworkRef):
- icpClarity issues → frameworkRef: "ICP Framework", actionType: "artifact", artifactType: "icpDocument", courseNumber: 1
- positioningStrength issues → frameworkRef: "Prescription Frame", actionType: "artifact", artifactType: "positioningStatement", courseNumber: 2
- messagingConsistency issues → frameworkRef: "Prescription Frame", actionType: "workshop", workshopId: "linkedin-overhaul" or "website-hero-fix"
- channelReadiness issues → frameworkRef: "Zero-to-Ten Sprint", actionType: "artifact", artifactType: "acquisitionPath", courseNumber: 3
- salesProcessMaturity issues → frameworkRef: "Diagnostic Discovery" + "MVQ Framework", actionType: "roleplay" or "artifact" (discoveryPlaybook), courseNumber: 14

PATH RECOMMENDATION:
- "inbound" ONLY IF: they have content/SEO assets, deal_size is transactional/smb, AND they have channel infrastructure.
- "outbound" ONLY IF: deal_size is mid_market/enterprise OR they have zero inbound infrastructure.
- "hybrid" ONLY IF: they demonstrably have both inbound assets AND outbound capability.
- State WHY based on their specific deal_size, channels, and stage.

CURRICULUM REFERENCE (use these exact course numbers):
Track: Foundations (0-4)
  0: Sales Psychology | 1: ICP Builder | 2: Positioning & Value Prop | 3: Choose Your Acquisition Path | 4: List Building & Prospecting
Track: Marketing Engine (5-12) — INBOUND path
  5: Technical Content Engine | 6: SEO & Answer Engine | 7: LinkedIn Growth | 8: Cold Email Mastery | 9: Community-Based Leads | 10: Email Nurture & Newsletter | 11: Social Proof & Referrals | 12: Marketing Automation & Analytics
Track: Sales Methodology (13-20) — OUTBOUND path
  13: DISC Buyer Personas | 14: Discovery Framework BANT/MEDDIC | 15: Discovery Call Simulations | 16: Demo Architecture | 17: Objection Handling | 18: Proposals, Pricing & Negotiation | 19: Closing & Next Steps | 20: Sales Pipeline Management
Track: AI Acquisition (21-27) — ADVANCED, requires foundations
  21: AI Acquisition Strategy | 22: Email Deliverability | 23: AI Lead Research | 24: AI Outreach Automation | 25: LinkedIn AI Applications | 26: Autonomous SDR Systems | 27: Custom AI Sales Agents
Track: Creator Economy (28-35) — for creator/community founders
  28: Creator Sales Mindset | 29: Audience to Buyer Conversion | 30: Webinar & Challenge Funnels | 31: Creator Sales Conversations | 32: DM Selling & Social Commerce | 33: Creator Metrics | 34: Scaling Creator Sales | 35: Community-Led Sales
Track: Customer Success (36-39) — post-sale retention
  36: Customer Onboarding | 37: Retention & Churn Prevention | 38: Expansion & Upsell | 39: Customer Advocacy
Track: Operations & Systems (40-48) — scaling infrastructure
  40: Advanced CRM | 41: Sales Analytics & BI | 42: Sales Automation | 43: Outsourcing & VAs | 44: The Sales Playbook | 45: First Sales Hire | 46: Sales Legal & Contracts | 47: Sales Finance & Tax | 48: Multi-Million Dollar Capstone

JOURNEY MAP RULES — build a personalized 3-5 phase learning path:
Phase 1 ("Foundation & Quick Wins"): ALWAYS start with Course 0. Include courses that address their criticalGaps (use the addressedInCourse numbers). If they have ICP issues (icpClarity < 50), include Course 1. If positioning is weak (positioningStrength < 50), include Course 2. Always end Phase 1 with Course 3 (path selection). estimatedWeeks: 2-4 based on time_commitment.
Phase 2 ("Core Path"): Based on recommendedPath:
  - "inbound": Courses 5-7 (content, SEO, LinkedIn) as the core, then 8-10 based on their channels.
  - "outbound": Courses 13-15 (DISC, discovery, call sims) as the core, then 16-19 based on their sales maturity.
  - "hybrid": Mix the first 2-3 courses from BOTH tracks (e.g., 5, 7, 13, 14).
  Include Course 4 (list building) early if they have no prospect infrastructure.
  If founder_description mentions "creator" or channels include social/community, include relevant Creator Economy courses (28-35) instead of or alongside the standard path.
  estimatedWeeks: 4-8 based on time_commitment and number of courses.
Phase 3 ("Advanced Skills"): Include remaining courses from their primary path track, plus any quickWin courses not yet included. If they're technical or mentioned AI interest, include AI Acquisition courses (21-24). estimatedWeeks: 4-6.
Phase 4 ("Scale & Optimize"): Customer Success courses (36-39) if they have customers. Operations courses (40-44) if stage is growth/scaling. Capstone (48) for advanced founders. Only include this phase if relevant to their stage. estimatedWeeks: 4-8.
IMPORTANT: Do NOT include every course — only include courses relevant to THIS founder's situation, gaps, and goals. A typical journey map should have 12-20 courses total across 3-4 phases. Adjust estimatedWeeks based on time_commitment: "minimal" = longer estimates, "full_time" = shorter estimates. Each phase should have 3-6 courses.

PERSONALIZED INSIGHT:
Write 2-3 sentences that a founder would screenshot and share. Reference their specific DISC type, founder_description, and the tension between their stated goal and current reality. Be direct but encouraging.

Return valid JSON using EXACTLY these camelCase keys:
{
  "overallReadiness": number,
  "scores": { "icpClarity": number, "positioningStrength": number, "messagingConsistency": number, "channelReadiness": number, "salesProcessMaturity": number },
  "scoreReasoning": { "icpClarity": string, "positioningStrength": string, "messagingConsistency": string, "channelReadiness": string, "salesProcessMaturity": string },
  "quickWins": [{ "category": string, "title": string, "description": string, "impact": "high"|"medium"|"low", "addressedInCourse": number, "actionableStep": string, "actionType": "course"|"artifact"|"workshop"|"coach-session"|"roleplay", "actionTarget": { "courseNumber?": number, "artifactType?": string, "workshopId?": string, "roleplayConfig?": { "discType": string, "scenarioType": string } }, "frameworkRef": string }],
  "criticalGaps": [{ "category": string, "title": string, "description": string, "impact": "high"|"medium"|"low", "addressedInCourse": number, "actionableStep": string, "actionType": "course"|"artifact"|"workshop"|"coach-session"|"roleplay", "actionTarget": { "courseNumber?": number, "artifactType?": string, "workshopId?": string, "roleplayConfig?": { "discType": string, "scenarioType": string } }, "frameworkRef": string }],
  "recommendedPath": "inbound"|"outbound"|"hybrid",
  "recommendedStartCourse": number,
  "journeyMap": [{ "phase": string, "courses": number[], "estimatedWeeks": number }],
  "personalizedInsight": string,
  "sourceAudits": [{ "source": "website"|"linkedin"|"documents", "title": string, "critique": string, "recommendations": string[] }]
}`;

  const raw = await chatJson({
    task: "assessment",
    prompt,
    schema: AssessmentOutput,
    temperature: 0.4,
    maxTokens: 5000,
  });
  return {
    ...raw,
    quickWins: raw.quickWins ?? [],
    criticalGaps: raw.criticalGaps ?? [],
    sourceAudits: raw.sourceAudits ?? [],
    recommendedStartCourse: raw.recommendedStartCourse ?? 1,
    journeyMap: raw.journeyMap ?? [],
    personalizedInsight: raw.personalizedInsight ?? "",
  };
}

// --- Roleplay reply (prospect response) ---
export async function openaiRoleplayReply(
  context: RoleplayContext,
  conversationHistory: { role: "user" | "assistant"; content: string }[],
  userMessage: string,
): Promise<string> {
  const systemPrompt = buildRoleplaySystemPrompt(context);
  const recentHistory = conversationHistory.slice(-20);
  const historyText = recentHistory
    .map((m) => `${m.role === "user" ? "SELLER" : "PROSPECT"}: ${m.content}`)
    .join("\n");
  const prompt = `${historyText}\nSELLER: ${userMessage.replace(/[\n\r]/g, " ").trim()}\nPROSPECT:`;
  return chatText({
    task: "roleplay",
    system: systemPrompt,
    prompt,
    temperature: 0.8,
    maxTokens: 500,
  });
}

// --- Roleplay evaluation ---
const RoleplayEvalOutput = z.object({
  score: z.number().min(1).max(10),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  coachingMessage: z.string(),
});

export type RoleplayEvalOutput = z.infer<typeof RoleplayEvalOutput>;

export async function openaiRoleplayEval(
  context: RoleplayContext,
  conversationHistory: { role: string; content: string }[],
): Promise<RoleplayEvalOutput> {
  const coachingPrompt = buildCoachingPrompt(context, conversationHistory);
  const prompt = `Review the conversation above and provide a structured evaluation in JSON format.
Return ONLY valid JSON: { "score": number 1-10, "strengths": string[], "improvements": string[], "coachingMessage": string }`;
  return chatJson({
    task: "roleplay-eval",
    system: coachingPrompt,
    prompt,
    schema: RoleplayEvalOutput,
    temperature: 0.4,
    maxTokens: 800,
  });
}

// --- Website analysis ---
const WebsiteAnalysisOutput = z.object({
  icpSummary: z.string().nullable(),
  valueProposition: z.string().nullable(),
  competitivePositioning: z.string().nullable(),
  pricingStructure: z.string().nullable(),
  industryVertical: z.string().nullable(),
  commonObjections: z.array(z.string()),
  typicalUseCases: z.array(z.string()),
  competitorMentions: z.array(z.string()),
  confidence: z.object({
    icpClarity: z.number().min(0).max(100),
    positioningStrength: z.number().min(0).max(100),
    messagingConsistency: z.number().min(0).max(100),
    valueArticulation: z.number().min(0).max(100),
  }),
});

export type WebsiteAnalysisOutput = z.infer<typeof WebsiteAnalysisOutput>;

function emptyWebsiteAnalysis(): WebsiteAnalysisOutput {
  return {
    icpSummary: null,
    valueProposition: null,
    competitivePositioning: null,
    pricingStructure: null,
    industryVertical: null,
    commonObjections: [],
    typicalUseCases: [],
    competitorMentions: [],
    confidence: {
      icpClarity: 0,
      positioningStrength: 0,
      messagingConsistency: 0,
      valueArticulation: 0,
    },
  };
}

export async function openaiWebsiteAnalysis(input: {
  url: string;
  businessModel: string;
  stage: string;
  websiteText: string;
}): Promise<WebsiteAnalysisOutput> {
  if (!input.websiteText || input.websiteText.length < 100)
    return emptyWebsiteAnalysis();
  const prompt = `You are a B2B marketing analyst examining a ${input.businessModel} company's website.

WEBSITE CONTENT:
${input.websiteText.slice(0, 50000)}

BUSINESS CONTEXT:
- Business Model: ${input.businessModel}
- Stage: ${input.stage}

TASK: Extract customer acquisition intelligence. Return JSON with: icpSummary, valueProposition, competitivePositioning, pricingStructure, industryVertical, commonObjections, typicalUseCases, competitorMentions, confidence (icpClarity, positioningStrength, messagingConsistency, valueArticulation as 0-100 numbers).`;
  try {
    return await chatJson({
      task: "website-analysis",
      prompt,
      schema: WebsiteAnalysisOutput,
      temperature: 0.3,
      maxTokens: 2000,
    });
  } catch (e) {
    logger.error("Website analysis error", { url: input.url, error: e });
    return emptyWebsiteAnalysis();
  }
}

// --- LinkedIn analysis ---
const LinkedinAnalysisOutput = z.object({
  professionalBio: z.string().nullable(),
  experienceHighlights: z.array(z.string()),
  skills: z.array(z.string()),
  authorityIndicators: z.array(z.string()),
  perceivedExpertise: z.string().nullable(),
  audienceFit: z.string().nullable(),
  confidence: z.number().min(0).max(100),
});

export type LinkedinAnalysisOutput = z.infer<typeof LinkedinAnalysisOutput>;

function emptyLinkedinAnalysis(): LinkedinAnalysisOutput {
  return {
    professionalBio: null,
    experienceHighlights: [],
    skills: [],
    authorityIndicators: [],
    perceivedExpertise: null,
    audienceFit: null,
    confidence: 0,
  };
}

export async function openaiLinkedinAnalysis(input: {
  url: string;
  businessModel: string;
  title: string;
  description: string;
  rawSnippet: string;
  /** User-pasted LinkedIn About/Experience text — takes priority over scraped data */
  pastedText?: string;
}): Promise<LinkedinAnalysisOutput> {
  const hasPastedText = input.pastedText && input.pastedText.trim().length > 20;
  const hasScrapedData = !!(input.title || input.description);

  if (!hasPastedText && !hasScrapedData) return emptyLinkedinAnalysis();

  const contentSection = hasPastedText
    ? `USER-PROVIDED LINKEDIN CONTENT (self-pasted, high confidence):
${input.pastedText!.slice(0, 8000)}

${
  hasScrapedData
    ? `SCRAPED META TAGS (supplementary):
Title: ${input.title}
Description: ${input.description}`
    : ""
}`
    : `SCRAPED LINKEDIN DATA:
Title: ${input.title}
Description: ${input.description}
Raw Snippet: ${input.rawSnippet.slice(0, 5000)}`;

  const prompt = `Analyze this LinkedIn profile content for a ${input.businessModel} founder.

${contentSection}

Extract: professionalBio, experienceHighlights, skills, authorityIndicators, perceivedExpertise, audienceFit, confidence (0-100).
${hasPastedText ? "The user pasted this directly, so confidence should be moderate-high (60-90)." : "If content is login wall or generic, return nulls and confidence 0."}
Return ONLY valid JSON.`;
  try {
    return await chatJson({
      task: "linkedin-analysis",
      prompt,
      schema: LinkedinAnalysisOutput,
      temperature: 0.3,
      maxTokens: 1000,
    });
  } catch (e) {
    logger.warn("LinkedIn analysis error", { error: e });
    return emptyLinkedinAnalysis();
  }
}

// --- RAG indexer (document analysis) ---
const DocumentSummarySchema = z.object({
  documentId: z.string(),
  fileName: z.string(),
  summary: z.string(),
  keySignals: z.array(z.string()),
  relevantTo: z.array(z.string()),
});

const RagIndexOutput = z.object({
  aggregatedInsights: z.string(),
  icpSignals: z.array(z.string()),
  valuePropSignals: z.array(z.string()),
  competitiveSignals: z.array(z.string()),
  documentSummaries: z.array(DocumentSummarySchema).optional().default([]),
  confidence: z.number(),
  docContext: z.string().optional(),
});

export type RagIndexOutput = z.infer<typeof RagIndexOutput>;

export async function openaiRagIndexer(input: {
  documents: { id: string; name: string; content: string }[];
  businessModel?: string;
}): Promise<RagIndexOutput> {
  const combined = input.documents
    .map((d) => `--- DOCUMENT: ${d.name} (ID: ${d.id}) ---\n${d.content}`)
    .join("\n\n");
  if (!combined.trim()) {
    return {
      aggregatedInsights: "No readable text content found in documents.",
      icpSignals: [],
      valuePropSignals: [],
      competitiveSignals: [],
      documentSummaries: [],
      confidence: 0,
      docContext: "",
    };
  }
  const maxLen = 500000;
  const content =
    combined.length > maxLen
      ? combined.slice(0, maxLen) + "\n...[TRUNCATED]"
      : combined;
  const persistenceContext = content.slice(0, 100000);

  const docList = input.documents
    .map((d) => `- "${d.name}" (ID: ${d.id})`)
    .join("\n");

  const prompt = `You are an expert GTM strategist. Analyze these documents uploaded by a solo founder.

COMBINED CONTEXT:
${content}

DOCUMENTS TO SUMMARIZE INDIVIDUALLY:
${docList}

TASK: Extract strategic signals for Customer Acquisition: ICP clarity, Value Proposition, Competitive Positioning.
Return JSON with:
- aggregatedInsights (string): Synthesized overview across all documents
- icpSignals (string[]): Key ICP themes found
- valuePropSignals (string[]): Key value proposition themes found
- competitiveSignals (string[]): Key competitive positioning themes found
- documentSummaries (array): For EACH document, provide:
  - documentId: The document ID
  - fileName: The document name
  - summary: 2-3 sentence summary of what this specific document contains
  - keySignals: Top 3-5 signals extracted from THIS document specifically
  - relevantTo: Array of categories this doc is relevant to (e.g. "icp", "value-prop", "competitive", "pricing", "process", "case-study")
- confidence (number 0-100)

If empty or irrelevant, return "Insufficient Data" and confidence 0.`;
  try {
    const result = await chatJson({
      task: "rag-extraction",
      prompt,
      schema: RagIndexOutput.omit({ docContext: true }),
      temperature: 0.1,
      maxTokens: 3000,
    });
    return {
      ...result,
      documentSummaries: result.documentSummaries ?? [],
      docContext: persistenceContext,
    };
  } catch (e) {
    logger.error("RAG indexer error", { error: e });
    return {
      aggregatedInsights: "Analysis processing error.",
      icpSignals: [],
      valuePropSignals: [],
      competitiveSignals: [],
      documentSummaries: [],
      confidence: 0,
      docContext: persistenceContext,
    };
  }
}

// --- Quiz reflection (for quizService) ---
const QuizReflectionOutput = z.object({
  feedback: z.string(),
  suggestions: z.array(z.string()),
  score: z.number().min(0).max(100),
});

export type QuizReflectionOutput = z.infer<typeof QuizReflectionOutput>;

export async function openaiQuizReflection(input: {
  reflection: string;
  aiPrompt: string;
  founderContext?: {
    founderCategory?: string;
    industry?: string;
    targetRoles?: string[];
    painPoints?: string[];
    ragSignals?: unknown;
  };
}): Promise<QuizReflectionOutput> {
  const { reflection, aiPrompt, founderContext } = input;
  const systemPrompt = `You are an ELITE SALES COACH. Review the student's reflection.

FOUNDER CONTEXT: Category ${founderContext?.founderCategory || "B2B/SaaS"}, Industry ${founderContext?.industry || "Technology"}, Target roles ${founderContext?.targetRoles?.join(", ") || "Not defined"}, Pains ${founderContext?.painPoints?.join(", ") || "Exploring"}.

EXERCISE: ${aiPrompt || "Evaluate depth and specificity."}

Give SPECIFIC coaching: quote their words, identify gaps, challenge assumptions, suggest 2-3 actionable steps. Score 0-100. Return JSON only: { "feedback": string, "suggestions": string[], "score": number }.`;

  const prompt = `Student Reflection: <<<${reflection}>>>\nRespond with JSON only.`;
  return chatJson({
    task: "quiz-reflection",
    system: systemPrompt,
    prompt,
    schema: QuizReflectionOutput,
    temperature: 0.7,
    maxTokens: 500,
  });
}

// --- Mini-assessment (progress checkpoint) ---
const MiniAssessmentOutput = z.object({
  updatedScores: z.object({
    icpClarity: z.number().min(0).max(100),
    positioningStrength: z.number().min(0).max(100),
    messagingConsistency: z.number().min(0).max(100),
    channelReadiness: z.number().min(0).max(100),
    salesProcessMaturity: z.number().min(0).max(100),
  }),
  overallReadiness: z.number().min(0).max(100),
  completedQuickWins: z.array(z.string()),
  newQuickWins: z
    .array(
      z.object({
        category: z.string(),
        title: z.string(),
        description: z.string(),
        impact: z.enum(["high", "medium", "low"]),
        actionableStep: z.string(),
      }),
    )
    .optional()
    .default([]),
  progressInsight: z.string(),
  recommendedNextCourse: z.number().optional(),
  skipSuggestions: z
    .array(
      z.object({
        courseNumber: z.number(),
        reason: z.string(),
      }),
    )
    .optional()
    .default([]),
});

export type MiniAssessmentOutput = z.infer<typeof MiniAssessmentOutput>;

export async function openaiMiniAssessment(input: {
  originalAssessment: {
    overallReadiness: number;
    scores: Record<string, number>;
    quickWins: { category: string; title: string; description: string }[];
    criticalGaps: { category: string; title: string; description: string }[];
    recommendedPath: string;
  };
  completedCourses: number[];
  totalLessonsCompleted: number;
  quizScores?: Record<string, number>;
  founderContext: {
    businessModel?: string;
    stage?: string;
    industry?: string;
    founderDescription?: string;
    discPrimary?: string;
    learningStyle?: string;
  };
}): Promise<MiniAssessmentOutput> {
  const {
    originalAssessment,
    completedCourses,
    totalLessonsCompleted,
    quizScores,
    founderContext,
  } = input;

  const prompt = `You are a learning path optimizer for a customer acquisition academy. A founder has progressed through some courses and you need to re-evaluate their readiness.

ORIGINAL ASSESSMENT:
- Overall Readiness: ${originalAssessment.overallReadiness}/100
- Scores: ${JSON.stringify(originalAssessment.scores)}
- Quick Wins: ${JSON.stringify(originalAssessment.quickWins)}
- Critical Gaps: ${JSON.stringify(originalAssessment.criticalGaps)}
- Path: ${originalAssessment.recommendedPath}

PROGRESS:
- Completed courses: ${completedCourses.join(", ") || "None yet"}
- Total lessons completed: ${totalLessonsCompleted}
${quizScores ? `- Quiz performance: ${JSON.stringify(quizScores)}` : ""}

FOUNDER CONTEXT:
- Business model: ${founderContext.businessModel || "Unknown"}
- Stage: ${founderContext.stage || "Unknown"}
- Industry: ${founderContext.industry || "Unknown"}
- Type: ${founderContext.founderDescription || "Unknown"}
- DISC: ${founderContext.discPrimary || "Not assessed"}
- Learning style: ${founderContext.learningStyle || "adaptive"}

COURSE MAP:
- Course 0: Sales Psychology (mindset)
- Course 1: ICP Builder (targeting)
- Course 2: Positioning & Messaging
- Course 3: Value Prop Canvas
- Course 4: Acquisition Path Selection
- Course 5-11: Marketing channels (LinkedIn, Cold Email, Content, etc.)
- Course 12-19: Sales methodology (Discovery, Demos, Objections, Closing, etc.)

TASK:
1. Re-score all 5 dimensions based on what the completed courses should have improved. Be realistic—completing a course improves knowledge but not necessarily execution.
2. Identify which original quick wins have been addressed by completed courses (list their titles in completedQuickWins).
3. Suggest 1-2 NEW quick wins based on current progress.
4. Write a 2-sentence progressInsight that acknowledges growth and motivates the next phase.
5. If their quiz scores or progress suggest they can skip any upcoming courses, list those in skipSuggestions with reasoning.
6. Recommend the next course number they should focus on.

Return valid JSON: { "updatedScores": {...}, "overallReadiness": number, "completedQuickWins": string[], "newQuickWins": [...], "progressInsight": string, "recommendedNextCourse": number, "skipSuggestions": [...] }`;

  const result = await chatJson({
    task: "mini-assessment",
    prompt,
    schema: MiniAssessmentOutput,
    temperature: 0.4,
    maxTokens: 1500,
  });
  return {
    ...result,
    newQuickWins: result.newQuickWins ?? [],
    skipSuggestions: result.skipSuggestions ?? [],
  };
}
