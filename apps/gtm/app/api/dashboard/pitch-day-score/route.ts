import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { computePitchDayScore } from "@/lib/services/pitchDayScoreService";

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const locale = request.nextUrl.searchParams.get("locale") || "en";
  const score = await computePitchDayScore(userId, locale);
  return successResponse(score);
});
