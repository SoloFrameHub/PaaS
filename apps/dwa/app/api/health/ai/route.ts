import { NextRequest, NextResponse } from 'next/server';
import { aiClient, hasAIKey, isOpenRouter } from '@/lib/ai/client';
import { resolveModel } from '@/lib/ai/models';

/**
 * AI connectivity diagnostic endpoint.
 * GET /api/health/ai?key=<ADMIN_API_SECRET> → tests OpenRouter/OpenAI connection.
 * Returns diagnostic info (no secrets exposed).
 */
export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key');
  if (!key || key !== process.env.ADMIN_API_SECRET) {
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
    const msg = error instanceof Error ? error.message : String(error);
    diag.error = msg;
    return NextResponse.json({ status: 'error', diag }, { status: 503 });
  }
}
