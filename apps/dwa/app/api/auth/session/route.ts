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
    user: { uid: session.uid, email: session.email, role: session.role ?? 'user' },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { idToken, uid, email } = body;
    const cookieStore = await cookies();
    const expiresIn = 60 * 60 * 24 * 5; // 5 days in seconds

    if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true' && idToken === 'mock-token') {
      // Block mock auth in production OR when a real database is present (Finding 7).
      // Both checks are needed: NODE_ENV catches misconfigured deploys without DATABASE_URL,
      // and DATABASE_URL catches local prod-like testing with real backends.
      if (process.env.NODE_ENV === 'production' || process.env.DATABASE_URL) {
        logger.error('SECURITY: Mock session attempted in production or with real database');
        return errorResponse(new Error('Security Configuration Error'));
      }
      const mockSession = JSON.stringify({
        uid: uid || 'mock-user-123',
        email: email || 'mock@example.com',
        role: body.role ?? 'user',
        mock: true,
      });
      // Mock auth is blocked in production (above), so secure is always false here
      cookieStore.set('session', mockSession, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: false,
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
  cookieStore.delete('session');
  return successResponse({ success: true });
}
