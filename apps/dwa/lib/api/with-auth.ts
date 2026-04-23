import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { UnauthorizedError } from './errors';
import { errorResponse } from './response-utils';
import { logger } from '@/lib/logger';
import { withRequestContext } from '@/lib/request-context';

export interface UserContext {
    userId: string;
    email: string;
    role: string;
}

export type AuthenticatedHandler = (
    request: NextRequest,
    user: UserContext,
    context: any
) => Promise<NextResponse> | NextResponse;

/**
 * CSRF Protection Helper
 * Validates Origin header for non-GET requests to prevent cross-site request forgery
 */
function validateOrigin(request: NextRequest): boolean {
    // Only check non-GET requests (GET is read-only and safe)
    if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') {
        return true;
    }

    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    // If no origin header, allow (same-origin requests from older browsers)
    if (!origin) {
        return true;
    }

    // Extract hostname from origin (remove protocol and port)
    const originHost = origin.replace(/^https?:\/\//, '').split(':')[0];
    const requestHost = host?.split(':')[0];

    // Allow if origins match
    if (originHost === requestHost) {
        return true;
    }

    // Block mismatched origins
    logger.warn('CSRF: Origin mismatch detected', {
        origin,
        host,
        method: request.method,
        path: request.nextUrl.pathname,
    });
    return false;
}

export function withAuth(handler: AuthenticatedHandler) {
    return async (request: NextRequest, context: any) => {
        try {
            // CSRF Protection: Validate origin for state-changing operations
            if (!validateOrigin(request)) {
                return NextResponse.json(
                    { error: 'Invalid request origin' },
                    { status: 403 }
                );
            }

            const session = await getServerSession();
            if (!session?.uid) {
                throw new UnauthorizedError('No session');
            }

            // Set up request context for distributed tracing (Finding 11)
            const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
            const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                       request.headers.get('x-real-ip') ||
                       'unknown';

            return await withRequestContext({
                requestId,
                userId: session.uid,
                ip,
                userAgent: request.headers.get('user-agent') || undefined,
                path: request.nextUrl.pathname,
            }, () => handler(request, {
                userId: session.uid,
                email: session.email || 'user@example.com',
                role: session.role ?? 'user',
            }, context));
        } catch (error) {
            return errorResponse(error);
        }
    };
}

/** Requires role === 'admin'. Returns 403 otherwise. */
export function withAdminAuth(handler: AuthenticatedHandler) {
    return async (request: NextRequest, context: any) => {
        try {
            // CSRF Protection
            if (!validateOrigin(request)) {
                return NextResponse.json(
                    { error: 'Invalid request origin' },
                    { status: 403 }
                );
            }

            const session = await getServerSession();
            if (!session?.uid) {
                throw new UnauthorizedError('No session');
            }
            const role = session.role ?? 'user';
            if (role !== 'admin') {
                return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
            }

            // Set up request context for distributed tracing (Finding 11)
            const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
            const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                       request.headers.get('x-real-ip') ||
                       'unknown';

            return await withRequestContext({
                requestId,
                userId: session.uid,
                ip,
                userAgent: request.headers.get('user-agent') || undefined,
                path: request.nextUrl.pathname,
            }, () => handler(request, {
                userId: session.uid,
                email: session.email || 'admin@example.com',
                role,
            }, context));
        } catch (error) {
            return errorResponse(error);
        }
    };
}

/** Requires role === 'provider' (or 'admin'). Returns 403 otherwise. */
export function withProviderAuth(handler: AuthenticatedHandler) {
    return async (request: NextRequest, context: any) => {
        try {
            // CSRF Protection
            if (!validateOrigin(request)) {
                return NextResponse.json(
                    { error: 'Invalid request origin' },
                    { status: 403 }
                );
            }

            const session = await getServerSession();
            if (!session?.uid) {
                throw new UnauthorizedError('No session');
            }
            const role = session.role ?? 'user';
            if (role !== 'provider' && role !== 'admin') {
                return NextResponse.json({ error: 'Provider access required' }, { status: 403 });
            }
            return await handler(request, {
                userId: session.uid,
                email: session.email || 'provider@example.com',
                role,
            }, context);
        } catch (error) {
            return errorResponse(error);
        }
    };
}
