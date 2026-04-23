import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { outreachService } from "@/lib/services/outreachService";
import { updateOutreachSchema } from "@/lib/validations/outreach";

export const PUT = withAuth(
  async (request: NextRequest, { userId }, context) => {
    const { id } = await context.params;
    const data = await validateBody(request, updateOutreachSchema);
    await outreachService.updateOutreachLog(userId, id, data);
    return successResponse({ updated: true });
  },
);

export const DELETE = withAuth(
  async (_request: NextRequest, { userId }, context) => {
    const { id } = await context.params;
    await outreachService.deleteOutreachLog(userId, id);
    return successResponse({ deleted: true });
  },
);
