import { NextRequest, NextResponse } from "next/server";
import { profileService } from "@/lib/services/profileService";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { logger } from "@/lib/logger";
import { isRateLimited, AI_RATE_LIMIT } from "@/lib/security";
import { getWorkshop } from "@/lib/data/workshops";
import { aiClient, anthropicClient, getProvider } from "@/lib/ai/client";
import { resolveModel, logTokenUsage } from "@/lib/ai/models";
import { z } from "zod";

const workshopStepSchema = z.object({
  workshopId: z.string().min(1),
  stepId: z.string().min(1),
  /** User's draft text for guided-edit and ai-review steps */
  userDraft: z.string().optional(),
});

/**
 * AI-guided workshop step endpoint.
 * Generates framework teaching, draft reviews, and coaching for each workshop step.
 */
export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const { limited } = await isRateLimited(userId, AI_RATE_LIMIT, "ai:workshop");
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  const { workshopId, stepId, userDraft } = await validateBody(
    request,
    workshopStepSchema,
  );

  const workshop = getWorkshop(workshopId);
  if (!workshop) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }

  const step = workshop.steps.find((s) => s.id === stepId);
  if (!step) {
    return NextResponse.json(
      { error: "Workshop step not found" },
      { status: 404 },
    );
  }

  if (!step.promptTemplate) {
    return NextResponse.json(
      { error: "This step does not require AI generation" },
      { status: 400 },
    );
  }

  const profile = await profileService.getProfile(userId);
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Build template variables from profile
  const vars: Record<string, string> = {
    businessName: profile.businessName || "your business",
    businessModel: profile.businessModel || "B2B",
    stage: profile.stage || "early",
    elevatorPitch: profile.elevatorPitch || "not provided",
    targetAudience: profile.targetAudience || "not specified",
    icpSummary: profile.inferred?.icpSummary || "not yet defined",
    valueProposition: profile.inferred?.valueProposition || "not yet defined",
    positioningStatement: profile.artifacts?.positioningStatement?.content
      ? typeof profile.artifacts.positioningStatement.content === "string"
        ? profile.artifacts.positioningStatement.content
        : JSON.stringify(profile.artifacts.positioningStatement.content)
      : "not yet created",
    websiteIcpSummary: profile.inferred?.icpSummary || "not analyzed",
    linkedinAnalysis: profile.inferred?.linkedinAnalysis
      ? JSON.stringify(profile.inferred.linkedinAnalysis).slice(0, 500)
      : "not analyzed",
    channels: profile.questionnaire?.channels?.join(", ") || "none selected",
    discPrimary: profile.questionnaire?.disc_profile?.primary || "unknown",
    userDraft: userDraft || "",
    // Assessment scores
    icpClarity: String(profile.assessment?.scores?.icpClarity ?? "N/A"),
    positioningStrength: String(
      profile.assessment?.scores?.positioningStrength ?? "N/A",
    ),
    messagingConsistency: String(
      profile.assessment?.scores?.messagingConsistency ?? "N/A",
    ),
    channelReadiness: String(
      profile.assessment?.scores?.channelReadiness ?? "N/A",
    ),
    salesProcessMaturity: String(
      profile.assessment?.scores?.salesProcessMaturity ?? "N/A",
    ),
  };

  // Replace {{placeholders}} in the prompt template
  let prompt = step.promptTemplate;
  for (const [key, value] of Object.entries(vars)) {
    prompt = prompt.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
  }

  try {
    const model = resolveModel("coaching");
    const systemMsg = `You are the SoloFrameHub Sales Coach running a guided workshop: "${workshop.title}". You are teaching the ${workshop.frameworkRef} framework. Be specific to the founder's business -- never give generic advice. Use their actual profile data.`;
    let content: string | null | undefined;

    if (getProvider() === "anthropic") {
      const response = await anthropicClient.messages.create({
        model,
        max_tokens: 1200,
        temperature: 0.7,
        system: systemMsg,
        messages: [{ role: "user", content: prompt }],
      });
      logTokenUsage("workshop", model, response.usage);
      const textBlock = response.content.find((b) => b.type === "text");
      content = textBlock?.text;
    } else {
      const completion = await aiClient.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemMsg },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      });
      logTokenUsage("workshop", model, completion.usage ?? undefined);
      content = completion.choices[0]?.message?.content;
    }

    if (!content) {
      throw new Error("AI returned no content");
    }

    return successResponse({ content, stepId, workshopId });
  } catch (error) {
    logger.error("Workshop AI step failed", {
      error: error instanceof Error ? error.message : String(error),
      userId,
      workshopId,
      stepId,
    });
    return NextResponse.json(
      { error: "AI service temporarily unavailable. Please try again." },
      { status: 503 },
    );
  }
});
