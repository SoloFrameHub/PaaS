import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { outreachService } from "@/lib/services/outreachService";

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const url = new URL(request.url);
  const days = parseInt(url.searchParams.get("days") || "7", 10);
  const stats = await outreachService.getOutreachStats(userId, days);
  return successResponse(stats);
});
