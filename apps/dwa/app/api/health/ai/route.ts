import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { aiClient, hasAIKey, isOpenRouter } from '@/lib/ai/client';
import { resolveModel } from '@/lib/ai/models';

/**
 * AI connectivity diagnostic endpoint.
 *
 * Requires `Authorization: Bearer <ADMIN_API_SECRET>`.
 *
 * (slice 01 finding) The previous shape (`?key=<secret>`) put the admin
 * secret in the URL, which ends up in Traefik/Dokploy access logs,
 * browser history, and Referer headers. Plus the `!==` compare was
 * timing-unsafe. (B-042.)
 */
export async function GET(request: NextRequest) {
  const hdr = request.headers.get('authorization') ?? '';
  const want = `Bearer ${process.env.ADMIN_API_SECRET ?? ''}`;
  const authorized =
    !!process.env.ADMIN_API_SECRET &&
    hdr.length === want.length &&
    (() => {
      try { return timingSafeEqual(Buffer.from(hdr), Buffer.from(want)); }
      catch { return false; }
    })();

  if (!authorized) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const model = resolveModel('coaching');
  const diag: Record<string, unknown> = {
    hasAIKey,
    provider: isOpenRouter ? 'openrouter' : 'openai-direct',
    coachingModel: model,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'NOT SET',
  };

  if (!hasAIKey) {
    return NextResponse.json({ status: 'error', error: 'No AI API key configured', diag }, { status: 503 });
  }

  try {
    const start = Date.now();
    const completion = await aiClient.chat.completions.create({
      model,
      messages: [{ role: 'user', content: 'Respond with exactly: OK' }],
      max_tokens: 5,
      temperature: 0,
    });
    const elapsed = Date.now() - start;

    const content = completion.choices[0]?.message?.content;
    diag.responseTime = `${elapsed}ms`;
    diag.response = content;
    diag.usage = completion.usage;

    return NextResponse.json({ status: 'ok', diag });
  } catch (error) {
    // Don't return the raw upstream error — redact to a short tag. The full
    // error stays in server logs only. (slice 01 finding.)
    diag.error = error instanceof Error ? error.name : 'UpstreamError';
    return NextResponse.json({ status: 'error', diag }, { status: 503 });
  }
}
