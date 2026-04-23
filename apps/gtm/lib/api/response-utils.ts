import { NextRequest, NextResponse } from 'next/server';
import { AppError } from './errors';
import { ZodError } from 'zod';
import { logger } from '@/lib/logger';

export interface ApiResponse<T = any> {
    data?: T;
    error?: {
        message: string;
        code?: string;
        details?: any;
    };
}

export function successResponse<T>(data: T, status: number = 200) {
    return NextResponse.json({ data }, { status });
}

export async function validateBody<T>(request: NextRequest, schema: import('zod').ZodSchema<T>): Promise<T> {
    try {
        const body = await request.json();
        return schema.parse(body);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
        }
        throw error;
    }
}

export function errorResponse(error: unknown) {
    logger.error('API Error', { error: error instanceof Error ? error.message : String(error) });
    if (error instanceof AppError) {
        return NextResponse.json(
            {
                error: {
                    message: error.message,
                    code: error.code
                }
            },
            { status: error.statusCode }
        );
    }

    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                error: {
                    message: 'Validation failed',
                    code: 'VALIDATION_ERROR',
                    details: error.errors
                }
            },
            { status: 400 }
        );
    }

    // Don't leak internal error messages to the client
    return NextResponse.json(
        {
            error: {
                message: 'An unexpected error occurred',
                code: 'INTERNAL_SERVER_ERROR'
            }
        },
        { status: 500 }
    );
}
