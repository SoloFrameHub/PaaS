import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { subscription } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const GET = withAuth(async (_request, user) => {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ subscription: null });
  }

  const rows = await db
    .select()
    .from(subscription)
    .where(eq(subscription.userId, user.userId))
    .limit(1);

  const sub = rows[0] ?? null;

  return NextResponse.json({
    subscription: sub
      ? {
          status: sub.status,
          productId: sub.polarProductId,
          currentPeriodEnd: sub.currentPeriodEnd,
        }
      : null,
  });
});
