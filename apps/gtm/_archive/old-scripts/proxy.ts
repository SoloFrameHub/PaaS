import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isRateLimited, AI_RATE_LIMIT, GENERAL_RATE_LIMIT } from './lib/security';

/**
 * Add security headers to a response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

    // Content Security Policy (No Firebase/Google Cloud - using OpenAI, Postgres, S3)
    const csp = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; frame-src 'self'; connect-src 'self' https://api.openai.com https://fonts.gstatic.com;";
    response.headers.set('Content-Security-Policy', csp);

    return response;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get('session')?.value;

    // 1. CSRF Protection for Mutations (POST, PUT, DELETE, PATCH)
    const mutations = ['POST', 'PUT', 'DELETE', 'PATCH'];
    if (mutations.includes(request.method) && pathname.startsWith('/api/')) {
        const origin = request.headers.get('origin');
        const referer = request.headers.get('referer');
        const host = request.headers.get('host');

        // Normalize URLs by removing trailing slashes for comparison
        const appUrl = (process.env.NEXT_PUBLIC_APP_URL || `http://${host}`).replace(/\/$/, '');
        const normalizedOrigin = origin?.replace(/\/$/, '');
        const isSameOrigin = normalizedOrigin ? normalizedOrigin === appUrl : (referer && referer.startsWith(appUrl));

        if (process.env.NODE_ENV === 'production' && !isSameOrigin) {
            return new NextResponse(
                JSON.stringify({ error: 'CSRF Protection: Invalid origin' }),
                { status: 403, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    // 2. Auth Protection for sensitive UI routes
    const protectedPaths = ['/dashboard', '/onboarding/business', '/onboarding/context', '/onboarding/questionnaire', '/onboarding/analyzing', '/profile'];
    const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path));

    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    // 3. Rate Limiting for API routes
    if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

        const isAiEndpoint = pathname.includes('/api/ai/') || pathname.includes('/api/onboarding/analyze');
        const config = isAiEndpoint ? AI_RATE_LIMIT : GENERAL_RATE_LIMIT;

        const { limited, remaining, reset } = await isRateLimited(ip, config);

        if (limited) {
            return new NextResponse(
                JSON.stringify({ error: 'Too many requests', retryAfter: reset }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RateLimit-Limit': config.limit.toString(),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': reset.toString()
                    }
                }
            );
        }

        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Limit', config.limit.toString());
        response.headers.set('X-RateLimit-Remaining', remaining.toString());
        response.headers.set('X-RateLimit-Reset', reset.toString());

        return addSecurityHeaders(response);
    }

    // Fallback for UI routes
    const publicPaths = ['/signin', '/signup', '/reset-password'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    const isHomePage = pathname === '/';

    if (!sessionCookie && !isPublicPath && !isHomePage && !pathname.startsWith('/api') && !pathname.includes('.')) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return addSecurityHeaders(NextResponse.next());
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
