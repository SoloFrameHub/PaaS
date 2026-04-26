import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { getDb, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { timingSafeEqual } from 'crypto';
import { isRateLimited, AUTH_RATE_LIMIT } from '@/lib/security';

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.uid) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { limited } = await isRateLimited(session.uid, AUTH_RATE_LIMIT, 'auth:verify');
  if (limited) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const code = typeof body.code === 'string' ? body.code.trim() : '';
  if (!code || code.length !== 6) {
    return NextResponse.json({ error: 'Please enter a 6-digit code' }, { status: 400 });
  }

  // D-2/D-8: verify-email only reads/updates `user` (RLS-excluded). No tenant-
  // scoped row is touched, so the raw pool is the correct shape.
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'Database not available' }, { status: 503 });

  const users = await db.select().from(schema.user).where(eq(schema.user.id, session.uid)).limit(1);
  const user = users[0];
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (user.emailVerified) {
    return NextResponse.json({ ok: true, redirect: '/onboarding/welcome' });
  }

  if (!user.emailVerificationCode || !user.emailVerificationExpiresAt) {
    return NextResponse.json({ error: 'No verification code found. Please request a new one.' }, { status: 400 });
  }

  if (new Date() > user.emailVerificationExpiresAt) {
    return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 400 });
  }

  const codeBuffer = Buffer.from(code);
  const storedBuffer = Buffer.from(user.emailVerificationCode);
  if (codeBuffer.length !== storedBuffer.length || !timingSafeEqual(codeBuffer, storedBuffer)) {
    return NextResponse.json({ error: 'Invalid code. Please try again.' }, { status: 400 });
  }

  await db
    .update(schema.user)
    .set({
      emailVerified: true,
      emailVerificationCode: null,
      emailVerificationExpiresAt: null,
    })
    .where(eq(schema.user.id, session.uid));

  return NextResponse.json({ ok: true, redirect: '/onboarding/welcome' });
}
