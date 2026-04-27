import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import { createDemoUser } from '@/lib/utils/demo-accounts';
import { logger } from '@/lib/logger';

const createDemoUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  organization: z.string().min(2),
  role: z.string().min(2),
  organizationType: z.enum(['practice', 'employer', 'platform', 'university', 'other']),
  phone: z.string().optional(),
  message: z.string().optional(),
  demoExpiryDays: z.number().optional(),
});

/**
 * POST /api/admin/create-demo-user
 *
 * Internal API endpoint for n8n workflow to create demo accounts
 * Requires N8N_API_KEY for authentication
 *
 * Returns: { success: true, userId, email, password, expiresAt }
 */
export async function POST(request: NextRequest) {
  try {
    // B-029: when N8N_API_KEY is unset, the previous compare built
    // "Bearer undefined" as the expected value — any client sending that
    // literal string authenticated. Now we fail closed and use a
    // timing-safe equal over equal-length buffers.
    const apiKey = process.env.N8N_API_KEY;
    const authHeader = request.headers.get('authorization');
    const presented =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.slice('Bearer '.length)
        : '';

    const unauthorized = (): NextResponse => {
      logger.warn('Unauthorized demo user creation attempt', {
        ip: request.headers.get('x-forwarded-for'),
        authHeader: authHeader ? 'present' : 'missing',
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    };

    if (!apiKey || !presented || presented.length !== apiKey.length) {
      return unauthorized();
    }
    if (
      !timingSafeEqual(Buffer.from(presented), Buffer.from(apiKey))
    ) {
      return unauthorized();
    }

    // Validate input
    const body = await request.json();
    const validatedData = createDemoUserSchema.parse(body);

    // Create demo user
    const result = await createDemoUser(validatedData);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to create demo user' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      userId: result.userId,
      email: result.email,
      password: result.password,
      expiresAt: result.expiresAt,
    });
  } catch (error: any) {
    logger.error('Create demo user API error', {
      error: error instanceof Error ? error.message : String(error),
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
