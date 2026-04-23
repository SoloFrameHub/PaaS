/**
 * Lucia auth (Postgres). Used only when DATABASE_URL is set.
 */

import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { getDb, schema } from '@/lib/db';

declare module 'lucia' {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: { email: string; hashedPassword: string; emailVerified: boolean };
  }
}

function createLucia() {
  const db = getDb();
  if (!db) throw new Error('Lucia requires DATABASE_URL');
  const adapter = new DrizzlePostgreSQLAdapter(db, schema.session, schema.user);
  return new Lucia(adapter, {
    sessionCookie: {
      name: 'session',
      expires: false,
      attributes: { secure: process.env.NODE_ENV === 'production', sameSite: 'lax' },
    },
    getUserAttributes(attrs) {
      return { email: attrs.email, emailVerified: attrs.emailVerified };
    },
  });
}

let lucia: Lucia | null = null;

export function getLucia(): Lucia {
  if (!lucia) lucia = createLucia();
  return lucia;
}

export type AuthUser = { id: string; email: string; emailVerified: boolean };
