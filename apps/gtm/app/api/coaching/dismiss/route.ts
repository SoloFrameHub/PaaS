import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { schema } from "@/lib/db";
import { requireTenantContext } from "@platform/tenancy";
import { withTenantApp } from "@/lib/db/with-tenant";
import { z } from "zod";

const dismissSchema = z.object({
  nudgeId: z.string().min(1),
});

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const { nudgeId } = await validateBody(request, dismissSchema);

  const ctx = await requireTenantContext(request, { userId });

  const id = crypto.randomUUID();
  await withTenantApp(ctx, async (tx) =>
    tx
      .insert(schema.userComponentState)
      .values({
        id,
        userId,
        componentType: "coaching_nudge",
        persistKey: nudgeId,
        state: { dismissedAt: new Date().toISOString() },
      })
      .onConflictDoUpdate({
        target: [
          schema.userComponentState.userId,
          schema.userComponentState.componentType,
          schema.userComponentState.persistKey,
        ],
        set: {
          state: { dismissedAt: new Date().toISOString() },
          updatedAt: new Date(),
        },
      }),
  );

  return successResponse({ dismissed: true });
});
