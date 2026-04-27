/**
 * POST /api/provider/rag — RAG-powered clinical resource query
 *
 * Body: { query: string, sourceFilter?: 'course' | 'assessment' | 'clinical', topK?: number }
 * Returns: { answer: string, sources: [...], model: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withProviderAuth } from '@/lib/api/with-auth';
import { ragQuery } from '@/lib/ai/rag';
import { logger } from '@/lib/logger';
import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';

const schema = z.object({
  query:        z.string().min(3).max(500),
  sourceFilter: z.enum(['course', 'assessment', 'clinical']).optional(),
  topK:         z.number().int().min(1).max(12).optional(),
});

export const POST = withProviderAuth(async (req, { userId }) => {
  // (slice 01 fix) Gate the RAG call behind the AI rate limit — each
  // request costs embedding + retrieval + LLM synthesis.
  const { limited, remaining, reset } = await isRateLimited(userId, AI_RATE_LIMIT, 'rag');
  if (limited) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(AI_RATE_LIMIT.limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      },
    );
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  try {
    const result = await ragQuery(parsed.data.query, {
      topK:         parsed.data.topK,
      sourceFilter: parsed.data.sourceFilter,
    });
    return NextResponse.json(result);
  } catch (err) {
    // (slice 01 fix) Don't log the full query — it routinely contains
    // patient identifiers and treatment details. Log only userId + err msg.
    logger.error('RAG query error', {
      userId,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: 'RAG query failed' }, { status: 500 });
  }
});
