import { NextRequest, NextResponse } from 'next/server';
import { getDb, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { generateVerificationCode, sendPasswordResetCode } from '@/lib/email/resend';
import { isRateLimited, AUTH_RATE_LIMIT, getClientIp } from '@/lib/security';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 503 });
  }

  const ip = getClientIp(request);
  const { limited } = await isRateLimited(ip, AUTH_RATE_LIMIT, 'auth:reset');
  if (limited) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
  }

  const db = getDb();
  if (!db) return NextResponse.json({ error: 'Database not available' }, { status: 503 });

  // Always return success to prevent user enumeration
  const successMsg = { ok: true, message: 'If an account exists with that email, a reset code has been sent.' };

  const users = await db.select().from(schema.user).where(eq(schema.user.email, email)).limit(1);
  const user = users[0];
  if (!user) {
    return NextResponse.json(successMsg);
  }

  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await db
    .update(schema.user)
    .set({
      passwordResetCode: code,
      passwordResetExpiresAt: expiresAt,
    })
    .where(eq(schema.user.id, user.id));

  try {
    await sendPasswordResetCode(email, code);
  } catch (err) {
    logger.error('Failed to send password reset email', { err, email });
  }

  return NextResponse.json(successMsg);
}
