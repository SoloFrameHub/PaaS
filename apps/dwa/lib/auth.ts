/**
 * Server auth: Lucia (Postgres) when DATABASE_URL is set, else mock session cookie.
 * No Firebase.
 */

import { cookies } from 'next/headers';
import { cache } from 'react';
import { getLucia, type AuthUser } from '@/lib/auth-lucia';
import { logger } from './logger';

export interface SessionUser {
  uid: string;
  email?: string;
  role?: string; // 'user' | 'provider' | 'admin'
  [key: string]: unknown;
}

async function getLuciaSession(): Promise<SessionUser | null> {
  const lucia = getLucia();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  if (!session || !user) return null;
  return {
    uid: user.id,
    email: (user as AuthUser).email,
    role: (user as AuthUser).role ?? 'user',
  };
}

async function getMockSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie || !sessionCookie.startsWith('{')) return null;
  try {
    const parsed = JSON.parse(sessionCookie) as SessionUser;
    return parsed?.uid ? parsed : null;
  } catch {
    return null;
  }
}

export const getServerSession = cache(async (): Promise<SessionUser | null> => {
  // Always call cookies() so Next.js opts into dynamic rendering for any page
  // that checks auth. Without this, pages get statically prerendered at build
  // time (when DATABASE_URL isn't set) and the redirect-to-signin response is
  // cached permanently.
  await cookies();

  try {
    if (process.env.DATABASE_URL) {
      return await getLuciaSession();
    }
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true') {
      // Security: Block mock auth in production (Finding 20)
      // Check NODE_ENV for all production environments (Dokploy, Vercel, etc.)
      if (process.env.NODE_ENV === 'production') {
        logger.error('CRITICAL SECURITY VIOLATION: Mock auth enabled in production', {
          NODE_ENV: process.env.NODE_ENV,
          VERCEL_ENV: process.env.VERCEL_ENV,
        });
        throw new Error('Mock auth cannot be enabled in production');
      }
      return await getMockSession();
    }
    return null;
  } catch (error) {
    logger.error('Session verification failed', { error });
    return null;
  }
});

export async function getCurrentUser() {
  return getServerSession();
}

export async function getAuthContext() {
  const user = await getCurrentUser();
  if (!user) return { user: null, profile: null };
  const { profileService } = await import('@/lib/services/profileService');
  const profile = await profileService.getProfile(user.uid);
  return { user, profile };
}

export async function getUserProfile() {
  const { profile } = await getAuthContext();
  return profile;
}
