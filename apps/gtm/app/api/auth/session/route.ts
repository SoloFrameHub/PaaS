export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logger } from '@/lib/logger';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { getServerSession } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json({
    user: { uid: session.uid, email: session.email, emailVerified: session.emailVerified },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { idToken, uid, email } = body;
    const cookieStore = await cookies();
    const expiresIn = 60 * 60 * 24 * 5; // 5 days in seconds

    if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true' && idToken === 'mock-token') {
      if (process.env.NODE_ENV === 'production') {
        logger.error('SECURITY: Mock session attempted in production');
        return errorResponse(new Error('Security Configuration Error'));
      }
      const mockUserId = uid || 'mock-user-123';
      const mockEmail = email || 'mock@example.com';

      // Ensure a user row exists in the DB so profile FK constraints are satisfied
      if (process.env.DATABASE_URL) {
        try {
          const { getDb, schema } = await import('@/lib/db');
          const db = getDb();
          if (db) {
            await db.insert(schema.user).values({
              id: mockUserId,
              email: mockEmail,
              hashedPassword: 'mock-not-used',
              emailVerified: true,
            }).onConflictDoNothing();
          }
        } catch (e) {
          logger.warn('Mock session: failed to ensure user row', { error: e });
        }
      }

      const mockSession = JSON.stringify({
        uid: mockUserId,
        email: mockEmail,
        emailVerified: true,
        mock: true,
      });
      cookieStore.set('session', mockSession, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === 'production',
        path: '/',
        sameSite: 'lax',
      });
      return successResponse({ success: true });
    }

    if (process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Use POST /api/auth/signin with email and password' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Auth not configured' }, { status: 400 });
  } catch (error: unknown) {
    logger.error('Session creation error', { error });
    return errorResponse(error instanceof Error ? error : new Error('Unauthorized'));
  }
}

export async function DELETE() {
  const cookieStore = await cookies();

  // Invalidate Lucia database session if using real auth (not mock)
  if (process.env.DATABASE_URL && process.env.NEXT_PUBLIC_MOCK_AUTH !== 'true') {
    try {
      const { getLucia } = await import('@/lib/auth-lucia');
      const lucia = getLucia();
      const sessionId = cookieStore.get(lucia.sessionCookieName)?.value;
      if (sessionId) {
        await lucia.invalidateSession(sessionId);
      }
    } catch (e) {
      logger.warn('Failed to invalidate Lucia session on logout', { error: e });
    }
  }

  cookieStore.delete('session');
  return successResponse({ success: true });
}
