'use client';

/**
 * Stub: Firebase client removed. Use /api/auth/signin, /api/auth/signup, GET /api/auth/session.
 * Kept so existing imports don't break; auth/db/storage are no-ops or throw.
 */

const stub = () => {
  throw new Error('Firebase client has been removed. Use /api/auth/signin and /api/auth/session.');
};

export const app = {};
export const auth = {
  signOut: stub,
  onAuthStateChanged: (_: unknown, cb: (u: null) => void) => {
    cb(null);
    return () => {};
  },
} as any;
export const db = {};
export const storage = {};
