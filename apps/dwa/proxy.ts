import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { resolveTenantSlugFromHost } from '@platform/tenancy/middleware';

const TENANT_ROOT_DOMAINS = (process.env.TENANT_ROOT_DOMAINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

/**
 * Next.js Middleware — runs in Edge Runtime.
 *
 * IMPORTANT: Only use Web-API-compatible code here. Node.js modules
 * (ioredis, pg, fs, etc.) will crash the Edge Runtime. Rate limiting
 * is handled inside each route handler (Node.js runtime) instead.
 */

/**
 * Add security headers to a response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
    const isProd = process.env.NODE_ENV === 'production';

    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

    // HSTS only in production — Chrome caches it permanently and breaks localhost
    if (isProd) {
        response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }

    // Finding 11: CSP removed from proxy — next.config.js is the single source of truth
    // Duplicate CSP definitions caused divergence (frame-src, connect-src, script-src, etc.)

    return response;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const requestId = request.headers.get('x-request-id') || crypto.randomUUID();

    // Marketing lives at digitalwellness.academy (tidy-next, already deployed).
    // Send unauthenticated visitors there; `dwa.soloframehub.com` is the
    // app, not a marketing site. /signin, /signup etc. stay reachable — only
    // the bare `/` redirects out.
    if (pathname === '/' && request.method === 'GET') {
        const hasSession = request.cookies.has('session');
        if (!hasSession) {
            return NextResponse.redirect('https://digitalwellness.academy/', 307);
        }
    }

    // 1. CSRF Protection for Mutations (POST, PUT, DELETE, PATCH)
    const mutations = ['POST', 'PUT', 'DELETE', 'PATCH'];
    if (mutations.includes(request.method) && pathname.startsWith('/api/')) {
        const origin = request.headers.get('origin');
        const referer = request.headers.get('referer');
        const host = request.headers.get('host');

        // Compare hostnames only — avoids http/https mismatch when x-forwarded-proto
        // is not forwarded by the reverse proxy (Dokploy/Traefik).
        // Strip port from the host header too so localhost:3111 matches localhost.
        const getHostname = (url: string) => { try { return new URL(url).hostname; } catch { return null; } };
        const originHost = origin ? getHostname(origin) : null;
        const refererHost = referer ? getHostname(referer) : null;
        const hostName = host ? host.split(':')[0] : null;
        const isSameOrigin = (originHost && originHost === hostName) || (!originHost && refererHost === hostName);

        if (process.env.NODE_ENV === 'production' && !isSameOrigin) {
            return new NextResponse(
                JSON.stringify({ error: 'CSRF Protection: Invalid origin' }),
                {
                    status: 403,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-request-id': requestId,
                    },
                },
            );
        }
    }

    // 2. Auth redirects — only for routes that don't handle their own auth.
    //    Pages like /academy, /coach, /community already call getAuthContext()
    //    and redirect themselves, so the proxy should NOT duplicate that.

    // Propagate x-request-id to downstream handlers and client for log correlation.
    // Must pass headers via `request` option or downstream route handlers won't see them.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-request-id', requestId);

    // Tenant slug from host header. Node-runtime API routes complete the
    // resolution with a DB lookup; middleware stays Edge-safe (pure regex).
    const tenantSlug = resolveTenantSlugFromHost(request.headers.get('host'), {
        rootDomains: TENANT_ROOT_DOMAINS,
    });
    if (tenantSlug) requestHeaders.set('x-tenant-slug', tenantSlug);

    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set('x-request-id', requestId);
    if (tenantSlug) response.headers.set('x-tenant-slug', tenantSlug);
    return addSecurityHeaders(response);
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
