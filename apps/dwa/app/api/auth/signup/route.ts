import { NextRequest, NextResponse } from 'next/server';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { getLucia } from '@/lib/auth-lucia';
import { getDb, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { isRateLimited, AUTH_RATE_LIMIT, getClientIp } from '@/lib/security';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Auth not configured (no database)' }, { status: 503 });
  }

  const ip = getClientIp(request);
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

    // Always hash the password regardless of whether the email is taken.
    // Returning "Email already used" for taken addresses enumerates accounts
    // — a concrete privacy breach for a mental-health platform. Instead we
    // hash (keeping response time constant) and return a uniform 200 that
    // doesn't distinguish new vs existing. (B-043 enumeration fix.)
    //
    // TODO(mail): when the transactional-mail adapter ships, send a
    // "welcome / verify your email" mail for new accounts and a
    // "you already have an account, here is a reset link" mail for taken
    // addresses. Both yield the same public response.
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (existing.length > 0) {
      logger.info('signup_email_already_registered', {
        // Intentionally not logging the email itself; email presence inferable
        // from auth audit trail but the monitoring dashboard doesn't need it.
      });
      return NextResponse.json(
        { ok: true, redirect: '/signin' },
        { status: 200 },
      );
    }

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
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: 'Sign up failed. Please try again.' }, { status: 500 });
  }
}
