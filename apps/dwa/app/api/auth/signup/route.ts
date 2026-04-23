import { NextRequest, NextResponse } from 'next/server';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { getLucia } from '@/lib/auth-lucia';
import { getDb, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { isRateLimited, AUTH_RATE_LIMIT } from '@/lib/security';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Auth not configured (no database)' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { limited, remaining, reset } = await isRateLimited(ip, AUTH_RATE_LIMIT, 'auth:signup');
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
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!password || password.length < 12) {
    return NextResponse.json({ error: 'Invalid password (min 12 characters)' }, { status: 400 });
  }

  const db = getDb();
  if (!db) return NextResponse.json({ error: 'Database not available' }, { status: 503 });

  try {
    const existing = await db.select().from(schema.user).where(eq(schema.user.email, email)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already used' }, { status: 400 });
    }

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateIdFromEntropySize(10);
    await db.insert(schema.user).values({
      id: userId,
      email,
      hashedPassword: passwordHash,
    });

    const lucia = getLucia();
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const res = NextResponse.json({ ok: true, redirect: '/onboarding/welcome', userId });
    res.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return res;
  } catch (err) {
    logger.error('Signup error', {
      email,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: 'Sign up failed. Please try again.' }, { status: 500 });
  }
}
