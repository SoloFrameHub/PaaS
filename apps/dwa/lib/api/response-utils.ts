import { NextRequest, NextResponse } from 'next/server';
import { AppError } from './errors';
import { ZodError } from 'zod';

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

// Function overloads for errorResponse
export function errorResponse(message: string, status: number): NextResponse;
export function errorResponse(error: unknown): NextResponse;
export function errorResponse(errorOrMessage: unknown, status?: number): NextResponse {
    // Pattern 1: errorResponse(message, status)
    if (typeof errorOrMessage === 'string' && typeof status === 'number') {
        console.error('❌ API Error:', errorOrMessage);
        return NextResponse.json(
            {
                error: {
                    message: errorOrMessage,
                    code: 'API_ERROR'
                }
            },
            { status }
        );
    }

    // Pattern 2: errorResponse(error)
    const error = errorOrMessage;
    console.error('❌ API Error:', error);
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

    if (error instanceof Error) {
        // Log full error server-side but return generic message to client
        console.error('Internal error details:', error.message, error.stack);
        return NextResponse.json(
            {
                error: {
                    message: 'An internal error occurred',
                    code: 'INTERNAL_SERVER_ERROR'
                }
            },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            error: {
                message: 'An unexpected error occurred',
                code: 'UNKNOWN_ERROR'
            }
        },
        { status: 500 }
    );
}
