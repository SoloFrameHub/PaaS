import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { pipelineService } from "@/lib/services/pipelineService";
import { updateDealSchema } from "@/lib/validations/pipeline";

export const PUT = withAuth(
  async (request: NextRequest, { userId }, context) => {
    const { id } = await context.params;
    const data = await validateBody(request, updateDealSchema);
    await pipelineService.updateDeal(userId, id, data);
    return successResponse({ updated: true });
  },
);

export const DELETE = withAuth(
  async (_request: NextRequest, { userId }, context) => {
    const { id } = await context.params;
    await pipelineService.deleteDeal(userId, id);
    return successResponse({ deleted: true });
  },
);
