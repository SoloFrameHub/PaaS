import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { schema } from "@/lib/db";
import { requireTenantContext } from "@platform/tenancy";
import { withTenantApp } from "@/lib/db/with-tenant";
import { eq, desc } from "drizzle-orm";

/**
 * GET /api/profile/score-history
 * Returns the user's assessment snapshot history (most recent first).
 */
export const GET = withAuth(async (request, user) => {
  const ctx = await requireTenantContext(request, { userId: user.userId });

  const snapshots = await withTenantApp(ctx, async (tx) =>
    tx
      .select()
      .from(schema.assessmentSnapshot)
      .where(eq(schema.assessmentSnapshot.userId, user.userId))
      .orderBy(desc(schema.assessmentSnapshot.createdAt))
      .limit(20),
  );

  return NextResponse.json({ data: snapshots });
});
