import { NextRequest } from "next/server";
import { profileService } from "@/lib/services/profileService";
import {
  openaiWebsiteAnalysis,
  openaiLinkedinAnalysis,
  openaiAssessment,
} from "@/lib/ai/openai-flows";
import { fetchWebsiteText, fetchLinkedinSnippet } from "@/lib/ai/fetch-helpers";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { Assessment } from "@/types/profile";
import { logger } from "@/lib/logger";
import { isRateLimited } from "@/lib/security";
import { NextResponse } from "next/server";

const REASSESS_RATE_LIMIT = { limit: 3, windowMs: 3600000 }; // 3 per hour

/**
 * On-demand re-assessment endpoint.
 * Re-runs source audits (website, LinkedIn) and generates a fresh assessment.
 * The previous assessment is automatically snapshotted by saveAssessment().
 */
export const POST = withAuth(async (request: NextRequest, { userId }) => {
  // Rate limit to prevent abuse (AI calls are expensive)
  const { limited } = await isRateLimited(
    userId,
    REASSESS_RATE_LIMIT,
    "reassess",
  );
  if (limited) {
    return NextResponse.json(
      {
        error:
          "Re-assessment is limited to 3 times per hour. Please try again later.",
      },
      { status: 429 },
    );
  }

  const requestId = Math.random().toString(36).substring(7);
  logger.info("On-demand reassessment requested", { requestId, userId });

  const profile = await profileService.getProfile(userId);
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  if (!profile.assessment) {
    return NextResponse.json(
      { error: "No initial assessment found. Complete onboarding first." },
      { status: 400 },
    );
  }

  try {
    // Re-run source audits to pick up any changes
    // 1. Website re-audit
    if (profile.websiteUrl) {
      try {
        const websiteText = await fetchWebsiteText(profile.websiteUrl);
        if (websiteText.length >= 100) {
          const analysis = await openaiWebsiteAnalysis({
            url: profile.websiteUrl,
            businessModel: profile.businessModel || "other",
            stage: (profile.stage || "idea") as string,
            websiteText,
          });
          if (analysis) {
            await profileService.saveInferredContext(userId, analysis);
          }
        }
      } catch (err) {
        logger.error("Re-audit website failed (non-blocking)", { err, userId });
      }
    }

    // 2. LinkedIn re-audit
    if (profile.linkedinUrl) {
      try {
        const snippet = await fetchLinkedinSnippet(profile.linkedinUrl);
        const linkedinAbout = (profile as any).linkedinAbout || "";
        const analysis = await openaiLinkedinAnalysis({
          url: profile.linkedinUrl,
          businessModel: profile.businessModel || "other",
          ...snippet,
          pastedText: linkedinAbout,
        });
        if (analysis && analysis.confidence > 0) {
          await profileService.saveLinkedinAnalysis(userId, analysis);
        }
      } catch (err) {
        logger.error("Re-audit LinkedIn failed (non-blocking)", {
          err,
          userId,
        });
      }
    }

    // 3. Re-read profile with updated audit data
    const freshProfile = await profileService.getProfile(userId);
    if (!freshProfile) {
      throw new Error("Profile disappeared during re-assessment");
    }

    // 4. Generate fresh assessment (saveAssessment snapshots the old one automatically)
    // Wrap in 60s timeout to prevent hanging if AI provider is slow
    const assessment = await Promise.race([
      openaiAssessment(
        profileService.getSafeContext(freshProfile, {
          highFidelity: true,
        }) as unknown as Partial<typeof freshProfile>,
      ),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Assessment timed out after 60s")),
          60_000,
        ),
      ),
    ]);

    if (assessment) {
      await profileService.saveAssessment(userId, assessment);
      logger.info("On-demand reassessment completed", {
        requestId,
        userId,
        newReadiness: assessment.overallReadiness,
      });
      return successResponse({ assessment, reassessed: true });
    } else {
      throw new Error("Assessment generation returned empty result");
    }
  } catch (error) {
    logger.error("On-demand reassessment failed", { requestId, error, userId });
    return NextResponse.json(
      { error: "Re-assessment failed. Please try again in a few minutes." },
      { status: 500 },
    );
  }
});
