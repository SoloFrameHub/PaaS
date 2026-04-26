import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { getDb, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { generateVerificationCode, sendVerificationCode } from '@/lib/email/resend';
import { logger } from '@/lib/logger';

export async function POST() {
  const session = await getServerSession();
  if (!session?.uid) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // D-2/D-8: resend-code only reads/updates `user` (RLS-excluded). No tenant-
  // scoped row is touched, so the raw pool is the correct shape.
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'Database not available' }, { status: 503 });

  const users = await db.select().from(schema.user).where(eq(schema.user.id, session.uid)).limit(1);
  const user = users[0];
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (user.emailVerified) {
    return NextResponse.json({ ok: true, message: 'Already verified' });
  }

  // Rate limit: don't allow resend if code was sent less than 60 seconds ago
  if (user.emailVerificationExpiresAt) {
    const codeSentAt = new Date(user.emailVerificationExpiresAt.getTime() - 15 * 60 * 1000);
    const secondsSinceSent = (Date.now() - codeSentAt.getTime()) / 1000;
    if (secondsSinceSent < 60) {
      return NextResponse.json(
        { error: `Please wait ${Math.ceil(60 - secondsSinceSent)} seconds before requesting a new code` },
        { status: 429 },
      );
    }
  }

  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db
    .update(schema.user)
    .set({ emailVerificationCode: code, emailVerificationExpiresAt: expiresAt })
    .where(eq(schema.user.id, session.uid));

  try {
    await sendVerificationCode(user.email, code);
  } catch (err) {
    logger.error('[resend-code] Failed to send verification email', { error: err });
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
