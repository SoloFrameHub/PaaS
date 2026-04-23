import { NextResponse } from 'next/server';
import { getLucia } from '@/lib/auth-lucia';
import { cookies } from 'next/headers';

export async function POST() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: true });
  }
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value ?? null;
  if (sessionId) {
    try {
      const lucia = getLucia();
      await lucia.invalidateSession(sessionId);
    } catch {
      // Always clear the cookie even if DB session invalidation fails
    }
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('session', '', { maxAge: 0, path: '/' });
  return res;
}
