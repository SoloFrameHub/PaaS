import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
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

  const db = getDb();
  if (!db) {
    return NextResponse.json({ ok: false });
  }

  await db.insert(bookReadingEvent).values({
    id: `bre_${crypto.randomUUID()}`,
    userId: user.userId,
    chapterId,
    eventType,
  });

  return NextResponse.json({ ok: true });
});
