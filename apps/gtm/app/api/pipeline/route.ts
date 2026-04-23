import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { pipelineService } from "@/lib/services/pipelineService";
import {
  createDealSchema,
  pipelineQuerySchema,
} from "@/lib/validations/pipeline";

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const url = new URL(request.url);
  const grouped = url.searchParams.get("grouped") === "true";

  if (grouped) {
    const dealsByStage = await pipelineService.getDealsByStage(userId);
    return successResponse(dealsByStage);
  }

  const filters = pipelineQuerySchema.parse({
    stage: url.searchParams.get("stage") || undefined,
    limit: url.searchParams.get("limit") || undefined,
  });
  const deals = await pipelineService.getUserDeals(userId, filters);
  return successResponse(deals);
});

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const data = await validateBody(request, createDealSchema);
  const result = await pipelineService.createDeal(userId, data);
  return successResponse(result, 201);
});
