import { NextRequest, NextResponse } from 'next/server';
import { hash } from '@node-rs/argon2';
import { getDb, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { timingSafeEqual } from 'crypto';
import { getLucia } from '@/lib/auth-lucia';
import { isRateLimited, AUTH_RATE_LIMIT, getClientIp } from '@/lib/security';

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 503 });
  }

  const ip = getClientIp(request);
  const { limited } = await isRateLimited(ip, AUTH_RATE_LIMIT, 'auth:reset-confirm');
  if (limited) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const code = typeof body.code === 'string' ? body.code.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!code || code.length !== 6) {
    return NextResponse.json({ error: 'Please enter a 6-digit code' }, { status: 400 });
  }
  if (!password || password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  const db = getDb();
  if (!db) return NextResponse.json({ error: 'Database not available' }, { status: 503 });

  const users = await db.select().from(schema.user).where(eq(schema.user.email, email)).limit(1);
  const user = users[0];
  if (!user) {
    return NextResponse.json({ error: 'Invalid code. Please try again.' }, { status: 400 });
  }

  if (!user.passwordResetCode || !user.passwordResetExpiresAt) {
    return NextResponse.json({ error: 'No reset code found. Please request a new one.' }, { status: 400 });
  }

  if (new Date() > user.passwordResetExpiresAt) {
    return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 400 });
  }

  const codeBuffer = Buffer.from(code);
  const storedBuffer = Buffer.from(user.passwordResetCode);
  if (codeBuffer.length !== storedBuffer.length || !timingSafeEqual(codeBuffer, storedBuffer)) {
    return NextResponse.json({ error: 'Invalid code. Please try again.' }, { status: 400 });
  }

  // Hash the new password
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  // Update password and clear reset code
  await db
    .update(schema.user)
    .set({
      hashedPassword: passwordHash,
      passwordResetCode: null,
      passwordResetExpiresAt: null,
    })
    .where(eq(schema.user.id, user.id));

  // Invalidate all existing sessions for security
  const lucia = getLucia();
  await lucia.invalidateUserSessions(user.id);

  return NextResponse.json({ ok: true });
}
