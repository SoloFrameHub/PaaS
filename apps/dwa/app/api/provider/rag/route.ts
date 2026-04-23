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

const schema = z.object({
  query:        z.string().min(3).max(500),
  sourceFilter: z.enum(['course', 'assessment', 'clinical']).optional(),
  topK:         z.number().int().min(1).max(12).optional(),
});

export const POST = withProviderAuth(async (req, { userId }) => {
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
    logger.error('RAG query error', {
      userId,
      query: parsed.data.query,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: 'RAG query failed' }, { status: 500 });
  }
});
