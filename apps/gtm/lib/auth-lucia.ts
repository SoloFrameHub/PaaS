/**
 * Lucia auth (Postgres). Used only when DATABASE_URL is set.
 *
 * Lucia boilerplate lives in @platform/identity; this file wires GTM's
 * user-attribute shape into the shared factory.
 */

import type { Lucia } from 'lucia';
import {
  createLuciaInstance,
  memoizeLucia,
  type PlatformAuthUser,
} from '@platform/identity';
import { getDb, schema } from '@/lib/db';

type GtmAttributes = {
  email: string;
  hashedPassword: string;
  emailVerified: boolean;
};

declare module 'lucia' {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: GtmAttributes;
  }
}

export type AuthUser = PlatformAuthUser & { emailVerified: boolean };

export const getLucia = memoizeLucia(() => {
  const db = getDb();
  if (!db) throw new Error('Lucia requires DATABASE_URL');
  return createLuciaInstance<GtmAttributes, AuthUser>({
    db,
    userTable: schema.user,
    sessionTable: schema.session,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    projectUserAttributes: (attrs) => ({
      email: attrs.email,
      emailVerified: attrs.emailVerified,
    }),
  });
});
