/**
 * Next.js instrumentation hook — runs once when the server starts.
 * 1. Validates critical environment variables
 * 2. Starts a keep-alive self-ping to prevent idle container shutdown
 */

/** Required env vars that must be set for the platform to function. */
const REQUIRED_ENV = [
  { key: 'DATABASE_URL', label: 'Postgres database' },
  { key: 'OPENROUTER_API_KEY', label: 'AI chat (OpenRouter)' },
  { key: 'NEXT_PUBLIC_APP_URL', label: 'Public URL (keep-alive, OpenRouter headers)' },
  { key: 'MAIA_URL', label: 'Maia AI classifier service (distress detection)' },
] as const;

/** Infrastructure & deployment env vars — warn if missing. */
const INFRA_ENV = [
  { key: 'SSH_HOST', label: 'Hostinger VPS host' },
  { key: 'SSH_USER', label: 'Hostinger VPS user' },
  { key: 'DOKPLOY_DEPLOY_API_KEY', label: 'Dokploy deployment key' },
] as const;

/** Optional but recommended env vars — warn if missing. */
const RECOMMENDED_ENV = [
  { key: 'REDIS_URL', label: 'Redis (rate limiting, caching)' },
  { key: 'AI_MODEL_COACHING', label: 'Coaching model override (defaults to anthropic/claude-sonnet-4.5)' },
  { key: 'OPENAI_API_KEY', label: 'OpenAI fallback / voice (TTS/STT)' },
] as const;

function validateEnv() {
  const missing: string[] = [];
  const infraMissing: string[] = [];
  const warnings: string[] = [];

  for (const { key, label } of REQUIRED_ENV) {
    if (!process.env[key]) {
      missing.push(`  - ${key} (${label})`);
    }
  }

  for (const { key, label } of INFRA_ENV) {
    if (!process.env[key]) {
      infraMissing.push(`  - ${key} (${label})`);
    }
  }

  for (const { key, label } of RECOMMENDED_ENV) {
    if (!process.env[key]) {
      warnings.push(`  - ${key} (${label})`);
    }
  }

  if (missing.length > 0) {
    console.error(
      `\n[env] MISSING REQUIRED environment variables:\n${missing.join('\n')}\n` +
      `Some features will not work. Check .env.local (local) or Dokploy env vars (production).\n`
    );
  }

  if (infraMissing.length > 0) {
    console.warn(
      `[env] Infrastructure env vars not set:\n${infraMissing.join('\n')}`
    );
  }

  if (warnings.length > 0) {
    console.warn(
      `[env] Recommended env vars not set:\n${warnings.join('\n')}`
    );
  }

  if (missing.length === 0 && warnings.length === 0) {
    console.log('[env] All environment variables OK');
  }
}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    validateEnv();

    const url =
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ||
      `http://localhost:${process.env.PORT || 3000}`;

    const INTERVAL_MS = 4 * 60 * 1000; // every 4 minutes

    // Wait for the server to be fully ready before starting pings
    setTimeout(() => {
      console.log(`[keep-alive] Starting self-ping → ${url}/api/health`);

      setInterval(async () => {
        try {
          const res = await fetch(`${url}/api/health`, {
            signal: AbortSignal.timeout(10_000),
          });
          if (!res.ok) {
            console.warn(`[keep-alive] Health check returned ${res.status}`);
          }
        } catch (err) {
          console.warn('[keep-alive] Ping failed:', (err as Error).message);
        }
      }, INTERVAL_MS);
    }, 30_000); // 30s startup delay
  }
}
