import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { outreachService } from "@/lib/services/outreachService";
import {
  createOutreachSchema,
  outreachQuerySchema,
} from "@/lib/validations/outreach";

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const url = new URL(request.url);
  const filters = outreachQuerySchema.parse({
    from: url.searchParams.get("from") || undefined,
    to: url.searchParams.get("to") || undefined,
    channel: url.searchParams.get("channel") || undefined,
    limit: url.searchParams.get("limit") || undefined,
  });

  const logs = await outreachService.getUserOutreachLogs(userId, filters);
  return successResponse(logs);
});

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const data = await validateBody(request, createOutreachSchema);
  const result = await outreachService.createOutreachLog(userId, data);
  return successResponse(result, 201);
});
