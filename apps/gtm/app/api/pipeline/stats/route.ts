import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { pipelineService } from "@/lib/services/pipelineService";

export const GET = withAuth(async (_request: NextRequest, { userId }) => {
  const stats = await pipelineService.getPipelineStats(userId);
  return successResponse(stats);
});
