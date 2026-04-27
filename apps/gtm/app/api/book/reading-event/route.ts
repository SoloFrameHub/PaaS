import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { bookReadingEvent } from '@/lib/db/schema';
import crypto from 'crypto';

export const POST = withAuth(async (request: NextRequest, user) => {
  const { chapterId, eventType } = await request.json();

  if (!chapterId || !eventType) {
    return NextResponse.json(
      { error: 'chapterId and eventType required' },
      { status: 400 }
    );
  }

  if (!['opened', 'completed'].includes(eventType)) {
    return NextResponse.json(
      { error: 'eventType must be "opened" or "completed"' },
      { status: 400 }
    );
  }

  const ctx = await requireTenantContext(request, { userId: user.userId });

  await withTenantApp(ctx, async (tx) =>
    tx.insert(bookReadingEvent).values({
      id: `bre_${crypto.randomUUID()}`,
      userId: user.userId,
      chapterId,
      eventType,
    }),
  );

  return NextResponse.json({ ok: true });
});
