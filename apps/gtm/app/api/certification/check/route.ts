/**
 * POST /api/certification/check
 *
 * Checks if the authenticated user meets certification eligibility.
 * If eligible and not yet certified, issues the badge and stores the cert.
 * Safe to call after every course completion (idempotent).
 *
 * Body (optional): { locale: "en" | "es" }
 */

import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { certificationService } from "@/lib/services/certificationService";

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const body = await request.json().catch(() => ({}));
  const locale = body.locale === "es" ? "es" : "en";

  const result = await certificationService.checkAndAward(userId, locale);
  return successResponse(result);
});

/**
 * GET /api/certification/check
 *
 * Returns current eligibility status without awarding.
 */
export const GET = withAuth(async (_request: NextRequest, { userId }) => {
  const { profileCoreService } =
    await import("@/lib/services/profileCoreService");
  const profile = await profileCoreService.getProfile(userId);
  if (!profile) {
    return successResponse({ eligible: false, cert: null });
  }

  const completedCourses = profile.progress?.completedCourses ?? [];
  const roleplayAvgScore = profile.progress?.roleplayStats?.avgScore ?? 0;
  const eligibility = certificationService.checkEligibility(
    completedCourses,
    roleplayAvgScore,
  );

  return successResponse({
    ...eligibility,
    cert: profile.progress?.certificationEarned ?? null,
  });
});
