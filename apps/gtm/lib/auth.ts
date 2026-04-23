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
  emailVerified?: boolean;
  [key: string]: unknown;
}

async function getLuciaSession(cookieStore: Awaited<ReturnType<typeof cookies>>): Promise<SessionUser | null> {
  const lucia = getLucia();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  if (!session || !user) return null;
  return {
    uid: user.id,
    email: (user as AuthUser).email,
    emailVerified: (user as AuthUser).emailVerified,
  };
}

async function getMockSession(cookieStore: Awaited<ReturnType<typeof cookies>>): Promise<SessionUser | null> {
  const raw = cookieStore.get('session')?.value;
  if (!raw) return null;
  try {
    // Handle both raw JSON and URL-encoded cookie values
    const decoded = raw.startsWith('{') ? raw : decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as SessionUser;
    if (!parsed?.uid) return null;
    // Mock sessions are always considered email-verified
    parsed.emailVerified = true;
    return parsed;
  } catch {
    return null;
  }
}

export const getServerSession = cache(async (): Promise<SessionUser | null> => {
  // Always call cookies() so Next.js treats pages using auth as dynamic
  // (prevents static prerendering at build time when DATABASE_URL isn't set)
  const cookieStore = await cookies();
  try {
    // Mock auth takes priority — allows testing even when DATABASE_URL is set
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true') {
      return await getMockSession(cookieStore);
    }
    if (process.env.DATABASE_URL) {
      return await getLuciaSession(cookieStore);
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

export async function getSubscriptionStatus(userId: string): Promise<string | null> {
  // Open access mode: bypass subscription checks entirely
  if (process.env.OPEN_ACCESS === 'true') {
    return 'active';
  }

  try {
    const { getDb } = await import('@/lib/db');
    const { subscription } = await import('@/lib/db/schema');
    const { eq } = await import('drizzle-orm');
    const db = getDb();
    if (!db) return null;
    const rows = await db
      .select({ status: subscription.status })
      .from(subscription)
      .where(eq(subscription.userId, userId))
      .limit(1);
    return rows[0]?.status ?? null;
  } catch {
    return null;
  }
}
