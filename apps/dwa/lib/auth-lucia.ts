/**
 * Lucia auth (Postgres). Used only when DATABASE_URL is set.
 *
 * Lucia boilerplate lives in @platform/identity; this file wires DWA's
 * user-attribute shape into the shared factory.
 */

import type { Lucia } from 'lucia';
import {
  createLuciaInstance,
  memoizeLucia,
  type PlatformAuthUser,
} from '@platform/identity';
import { getDb, schema } from '@/lib/db';
import { logger } from '@/lib/logger';

type DwaAttributes = {
  email: string;
  hashed_password: string;
  role: string;
};

declare module 'lucia' {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: DwaAttributes;
  }
}

export type AuthUser = PlatformAuthUser & { role: string };

export const getLucia = memoizeLucia(() => {
  const db = getDb();
  if (!db) throw new Error('Lucia requires DATABASE_URL');
  try {
    return createLuciaInstance<DwaAttributes, AuthUser>({
      db,
      userTable: schema.user,
      sessionTable: schema.session,
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
      projectUserAttributes: (attrs) => ({
        email: attrs.email,
        role: attrs.role ?? 'user',
      }),
    });
  } catch (err) {
    logger.error('Failed to initialise Lucia', {
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
});
