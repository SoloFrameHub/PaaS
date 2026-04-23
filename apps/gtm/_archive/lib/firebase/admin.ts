/**
 * Stub: Firebase Admin removed. Use Postgres + Lucia (see lib/auth.ts, lib/auth-lucia.ts).
 * Kept so existing imports don't break; all methods throw.
 */

const throwRemoved = () => {
  throw new Error('Firebase Admin has been removed. Use DATABASE_URL + Lucia for auth and Postgres for data.');
};

export const adminApp = null as any;
export const adminAuth = {
  verifySessionCookie: throwRemoved,
  createSessionCookie: throwRemoved,
};
export const adminDb = {
  collection: () => ({ doc: () => ({ get: throwRemoved, set: throwRemoved }), where: () => ({ get: throwRemoved }) }),
};
export const adminStorage = { bucket: () => ({ upload: throwRemoved }) };
