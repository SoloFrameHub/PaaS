import { NextRequest } from 'next/server';
import { timingSafeEqual } from 'crypto';

const ADMIN_SECRET = process.env.ADMIN_API_SECRET;

/**
 * Timing-safe admin secret check.
 * Extracts Bearer token from Authorization header and compares against ADMIN_API_SECRET.
 */
export function checkAdminSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '') || '';
  if (!ADMIN_SECRET || !token) return false;
  if (token.length !== ADMIN_SECRET.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(ADMIN_SECRET));
}
