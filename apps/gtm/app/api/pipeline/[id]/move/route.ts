import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { pipelineService } from "@/lib/services/pipelineService";
import { moveDealSchema } from "@/lib/validations/pipeline";

export const POST = withAuth(
  async (request: NextRequest, { userId }, context) => {
    const { id } = await context.params;
    const { stage, lossReason } = await validateBody(request, moveDealSchema);
    await pipelineService.moveDealToStage(userId, id, stage, lossReason);
    return successResponse({ moved: true, stage });
  },
);
