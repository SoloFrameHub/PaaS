import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { getDb, hasDatabase, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

/**
 * GET /api/profile/score-history
 * Returns the user's assessment snapshot history (most recent first).
 */
export const GET = withAuth(async (_request, user) => {
  if (!hasDatabase()) {
    return NextResponse.json({ data: [] });
  }

  const db = getDb()!;

  const snapshots = await db
    .select()
    .from(schema.assessmentSnapshot)
    .where(eq(schema.assessmentSnapshot.userId, user.userId))
    .orderBy(desc(schema.assessmentSnapshot.createdAt))
    .limit(20);

  return NextResponse.json({ data: snapshots });
});
