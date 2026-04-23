import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { UnauthorizedError } from './errors';
import { errorResponse } from './response-utils';

export interface UserContext {
    userId: string;
    email: string;
}

export type AuthenticatedHandler = (
    request: NextRequest,
    user: UserContext,
    context: any
) => Promise<NextResponse> | NextResponse;

export function withAuth(handler: AuthenticatedHandler) {
    return async (request: NextRequest, context: any) => {
        try {
            const session = await getServerSession();
            if (!session?.uid) {
                throw new UnauthorizedError('No session');
            }
            return await handler(request, {
                userId: session.uid,
                email: session.email || '',
            }, context);
        } catch (error) {
            return errorResponse(error);
        }
    };
}
