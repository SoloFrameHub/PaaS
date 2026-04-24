import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { timingSafeEqual } from 'node:crypto';
import { getDb, hasDatabase } from '@/lib/db';
import { aiClient, hasAIKey } from '@/lib/ai/client';
import { resolveModel } from '@/lib/ai/models';
import { maia } from '@/lib/ai/maia-client';
import { redis } from '@/lib/redis';

/**
 * Health check for Dokploy / Docker / load balancers.
 * GET /api/health → 200 when app + DB are healthy.
 *
 * Diagnostic branches (admin-only — require `Authorization: Bearer <ADMIN_API_SECRET>`):
 *   GET /api/health?diag=ai      → AI service readiness + env-var presence
 *   GET /api/health?diag=ai-test → triggers a billed completion; admin-only.
 *   GET /api/health?diag=maia    → Maia classifier diagnostics
 *
 * (slice 01 finding) Previously the diag branches were unauthenticated, which
 * made `ai-test` a cost-amplification vector against the OpenRouter/OpenAI
 * bill and leaked env-var presence.
 */
function isAdminRequest(request: NextRequest): boolean {
  const hdr = request.headers.get('authorization') ?? '';
  const want = `Bearer ${process.env.ADMIN_API_SECRET ?? ''}`;
  if (!process.env.ADMIN_API_SECRET) return false;
  if (hdr.length !== want.length) return false;
  try {
    return timingSafeEqual(Buffer.from(hdr), Buffer.from(want));
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const checks: Record<string, string> = { app: 'ok' };

  if (hasDatabase()) {
    try {
      const db = getDb();
      if (db) {
        await db.execute(sql`SELECT 1`);
        checks.database = 'ok';
      }
    } catch {
      checks.database = 'error';
      return NextResponse.json(
        { status: 'degraded', service: 'wellness-academy', checks },
        { status: 503 }
      );
    }
  }

  // Check Maia AI classifier service (critical for crisis detection)
  try {
    const maiaHealth = await maia.health();
    if (maiaHealth && maiaHealth.status === 'healthy') {
      checks.maia = 'ok';
      checks.maia_classifiers = `${maiaHealth.total_loaded}/${maiaHealth.total_registered}`;
    } else if (maiaHealth) {
      checks.maia = 'degraded';
      checks.maia_classifiers = `${maiaHealth.total_loaded}/${maiaHealth.total_registered}`;
    } else {
      checks.maia = 'unavailable';
      if (process.env.NODE_ENV === 'production') {
        checks.maia_warning = 'CRITICAL: Crisis detection offline';
      }
    }
  } catch {
    checks.maia = 'error';
  }

  // Check Redis (rate limiting, session caching)
  try {
    if (redis) {
      await redis.ping();
      checks.redis = 'ok';
    } else {
      checks.redis = 'not_configured';
    }
  } catch {
    checks.redis = 'error';
    checks.redis_note = 'Rate limiting will fall back to in-memory (single-container only)';
  }

  const diag = request.nextUrl.searchParams.get('diag');

  // Any diagnostic branch requires admin auth — these leak env-var presence
  // and can trigger billed AI calls.
  if (diag === 'ai' || diag === 'ai-test' || diag === 'maia') {
    if (!isAdminRequest(request)) {
      return NextResponse.json(
        { status: 'ok', service: 'wellness-academy', checks },
        { status: 200 },
      );
    }
    checks.openrouter_key = process.env.OPENROUTER_API_KEY ? 'set' : 'MISSING';
    checks.openai_key = process.env.OPENAI_API_KEY ? 'set' : 'MISSING';
    checks.ai_model_coaching = resolveModel('coaching');
    checks.ai_model_coaching_env = process.env.AI_MODEL_COACHING || '(not set, using fallback)';
    checks.app_url = process.env.NEXT_PUBLIC_APP_URL || 'MISSING';
    checks.redis_url = process.env.REDIS_URL ? 'set' : 'MISSING';
    checks.maia_url = process.env.MAIA_URL || process.env.DISTRESS_CLASSIFIER_URL || 'http://localhost:8001 (fallback)';
  }

  // Live AI connectivity test — sends a minimal 1-token completion.
  // Admin-only (already gated above; double-check here for clarity).
  if (diag === 'ai-test' && hasAIKey && isAdminRequest(request)) {
    try {
      const model = resolveModel('coaching');
      const start = Date.now();
      const completion = await aiClient.chat.completions.create({
        model,
        messages: [{ role: 'user', content: 'Say hi' }],
        max_tokens: 5,
      });
      const latencyMs = Date.now() - start;
      checks.ai_test = 'ok';
      checks.ai_test_latency = `${latencyMs}ms`;
      checks.ai_test_model_used = completion.model || model;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      checks.ai_test = 'FAILED';
      checks.ai_test_error = msg.slice(0, 300);
    }
  }

  return NextResponse.json(
    { status: 'ok', service: 'wellness-academy', checks },
    { status: 200 }
  );
}
