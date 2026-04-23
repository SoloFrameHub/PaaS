/**
 * Next.js Edge Middleware
 *
 * Finding 11: Injects request ID for distributed tracing and log correlation.
 *
 * Runs before every request to inject headers and set up request context.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { randomUUID } from 'crypto';

export function middleware(request: NextRequest) {
  // Generate or extract request ID
  const requestId = request.headers.get('x-request-id') || randomUUID();

  // Clone response to add headers
  const response = NextResponse.next();

  // Add request ID to response headers for client-side correlation
  response.headers.set('x-request-id', requestId);

  // Add request ID to request headers so API routes can access it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  // Return response with modified headers
  return response;
}

// Run middleware on all routes except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
