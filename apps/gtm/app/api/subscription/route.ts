import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { subscription } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const GET = withAuth(async (request, user) => {
  const ctx = await requireTenantContext(request, { userId: user.userId });

  const rows = await withTenantApp(ctx, async (tx) =>
    tx
      .select()
      .from(subscription)
      .where(eq(subscription.userId, user.userId))
      .limit(1),
  );

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
