/**
 * Lucia auth (Postgres). Used only when DATABASE_URL is set.
 */

import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { getDb, schema } from '@/lib/db';
import { logger } from '@/lib/logger';

declare module 'lucia' {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: { email: string; hashed_password: string; role: string };
  }
}

// Derive secure flag from configured app URL protocol (not NODE_ENV alone)
// so HTTP deployments (e.g. sslip.io) get non-secure cookies that browsers accept.
const useSecureCookies = process.env.NODE_ENV === 'production' && (process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') ?? true);

function createLucia() {
  const db = getDb();
  if (!db) throw new Error('Lucia requires DATABASE_URL');
  const adapter = new DrizzlePostgreSQLAdapter(db, schema.session, schema.user);
  return new Lucia(adapter, {
    sessionCookie: {
      name: 'session',
      expires: false,
      attributes: { secure: useSecureCookies, sameSite: 'lax' },
    },
    getUserAttributes(attrs) {
      return { email: attrs.email, role: attrs.role ?? 'user' };
    },
  });
}

let lucia: Lucia | null = null;

export function getLucia(): Lucia {
  if (!lucia) {
    try {
      lucia = createLucia();
    } catch (err) {
      logger.error('Failed to initialise Lucia', {
        error: err instanceof Error ? err.message : String(err),
      });
      throw err; // re-throw so caller's try/catch handles it
    }
  }
  return lucia;
}

export type AuthUser = { id: string; email: string; role: string };
