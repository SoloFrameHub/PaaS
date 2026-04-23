import { NextRequest, NextResponse } from 'next/server';
import { getLucia } from '@/lib/auth-lucia';
import { getDb, schema } from '@/lib/db';
import { verify } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';
import { isRateLimited, AUTH_RATE_LIMIT } from '@/lib/security';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Auth not configured (no database)' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { limited, remaining, reset } = await isRateLimited(ip, AUTH_RATE_LIMIT, 'auth:signin');
  if (limited) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(AUTH_RATE_LIMIT.limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      }
    );
  }

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!password || password.length < 12) {
    return NextResponse.json({ error: 'Invalid password (min 12 characters)' }, { status: 400 });
  }

  const db = getDb();
  if (!db) return NextResponse.json({ error: 'Database not available' }, { status: 503 });

  try {
    const users = await db.select().from(schema.user).where(eq(schema.user.email, email)).limit(1);
    const user = users[0];
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Reject soft-deleted accounts (Finding 9: 30-day grace period)
    if (user.deletedAt) {
      const deletedDate = new Date(user.deletedAt);
      const purgeDate = new Date(deletedDate);
      purgeDate.setDate(purgeDate.getDate() + 30);

      logger.warn('signin_attempt_deleted_account', { userId: user.id, email, deletedAt: user.deletedAt });

      return NextResponse.json({
        error: 'Account is scheduled for deletion',
        deletedAt: user.deletedAt,
        purgeAfter: purgeDate.toISOString(),
        message: 'Your account deletion is in progress. To cancel and restore access, contact support or use the cancellation link from your deletion confirmation email.',
      }, { status: 403 });
    }

    const valid = await verify(user.hashedPassword, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const lucia = getLucia();
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const res = NextResponse.json({ ok: true, redirect: '/dashboard' });
    res.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return res;
  } catch (err) {
    logger.error('Signin error', {
      email,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: 'Sign in failed. Please try again.' }, { status: 500 });
  }
}
