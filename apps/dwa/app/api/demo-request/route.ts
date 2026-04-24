import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isRateLimited, getClientIp } from '@/lib/security'
import { logger } from '@/lib/logger'

// Strict per-IP rate limit — this is a public unauthenticated form, so
// spammers will find it. (slice 01 fix.)
const DEMO_RATE_LIMIT = { limit: 3, windowMs: 60 * 60 * 1000 }; // 3/hour

const demoRequestSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(200),
  email: z.string().email('Invalid email address').max(320),
  organization: z.string().min(2, 'Organization name required').max(200),
  role: z.string().min(2, 'Role required').max(120),
  organizationType: z.enum(['practice', 'employer', 'platform', 'university', 'other']),
  phone: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
})

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { limited, remaining, reset } = await isRateLimited(ip, DEMO_RATE_LIMIT, 'demo-request');
  if (limited) {
    return NextResponse.json(
      { error: 'Too many demo requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(DEMO_RATE_LIMIT.limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      },
    );
  }

  try {
    const body = await request.json()
    const validatedData = demoRequestSchema.parse(body)

    if (!process.env.N8N_URL || !process.env.N8N_API_KEY) {
      logger.error('demo_request_misconfigured', { hasUrl: !!process.env.N8N_URL, hasKey: !!process.env.N8N_API_KEY });
      return NextResponse.json(
        { error: 'Demo request service temporarily unavailable.' },
        { status: 503 },
      );
    }

    // Trigger n8n workflow via webhook
    const n8nWebhookUrl = `${process.env.N8N_URL}/webhook/demo-request`

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY}`,
      },
      body: JSON.stringify({
        ...validatedData,
        requestedAt: new Date().toISOString(),
        source: 'digitalwellness.academy',
      }),
    })

    if (!response.ok) {
      logger.error('demo_request_n8n_failed', { status: response.status })
      throw new Error('Failed to process demo request')
    }

    // Don't echo the n8n response body back — it could carry
    // implementation details. Just confirm success.
    await response.json().catch(() => undefined)

    return NextResponse.json({
      success: true,
      message: 'Demo account created successfully! Check your email for login credentials.',
    })
  } catch (error: unknown) {
    logger.error('demo_request_error', {
      error: error instanceof Error ? error.message : String(error),
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.flatten() },
        { status: 400 }
      )
    }

    // Don't surface raw error messages to callers — leaks internals.
    return NextResponse.json(
      { error: 'Failed to process demo request' },
      { status: 500 }
    )
  }
}
