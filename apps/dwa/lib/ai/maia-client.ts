/**
 * Maia Client — Unified AI Classification Layer
 *
 * Typed client for all Maia classifiers. Each method follows the same
 * fail-safe pattern as the original checkDistress.ts:
 *   - 3 second timeout: never block user flow
 *   - Any error returns safe fallback
 *   - Text is never logged or stored
 *
 * Finding 13: No single point of failure - MAIA_URL misconfiguration doesn't crash the app.
 * All classify() calls use try/catch with safe fallbacks. Missing/unreachable service degrades
 * gracefully to conservative defaults (no distress detected, no crisis alerts).
 *
 * Usage:
 *   import { maia } from '@/lib/ai/maia-client';
 *
 *   const distress = await maia.distress(text);
 *   const topic    = await maia.forumTopic(text);
 *   const quality  = await maia.contentQuality(text);
 *   const atom     = await maia.atomization(text);
 */

import { logger } from '@/lib/logger';

function getMaiaUrl(): string {
  const url = process.env.MAIA_URL ?? process.env.DISTRESS_CLASSIFIER_URL ?? 'http://localhost:8001';

  // Production safety check: warn if MAIA_URL is not configured (Finding 13: fail-safe, not fail-hard)
  if (
    typeof window === 'undefined' && // server-side only
    process.env.NODE_ENV === 'production' &&
    !process.env.MAIA_URL &&
    !process.env.DISTRESS_CLASSIFIER_URL &&
    !process.env.VERCEL_ENV // allow builds on Vercel
  ) {
    logger.warn('MAIA_URL not configured in production', {
      fallbackUrl: url,
      message: 'Crisis detection will use safe fallbacks (no alerts triggered). Configure MAIA_URL to enable AI classification.',
    });
  }

  return url;
}

const MAIA_URL = getMaiaUrl();

// ── Result Types ────────────────────────────────────────────────────────────

export interface DistressResult {
  level: 'none' | 'mild' | 'crisis';
  confidence: number;
  flag: boolean;
  crisis: boolean;
}

export interface ForumTopicResult {
  topic: string;
  topic_confidence: number;
  routing: 'needs-provider' | 'community-handles' | 'informational';
  needs_provider: boolean;
}

export interface ContentQualityResult {
  quality: string;
  quality_confidence: number;
  publish_ready: boolean;
}

export interface AtomizationResult {
  tag: string;
  tag_confidence: number;
  extractable: boolean;
}

export interface MaiaHealthResult {
  status: string;
  classifiers: Record<string, { name: string; loaded: boolean; model: string | null }>;
  total_loaded: number;
  total_registered: number;
}

// ── Safe Fallbacks ──────────────────────────────────────────────────────────

const DISTRESS_FALLBACK: DistressResult = {
  level: 'none',
  confidence: 0,
  flag: false,
  crisis: false,
};

const FORUM_TOPIC_FALLBACK: ForumTopicResult = {
  topic: 'general-wellness',
  topic_confidence: 0,
  routing: 'community-handles',
  needs_provider: false,
};

const CONTENT_QUALITY_FALLBACK: ContentQualityResult = {
  quality: 'needs-revision',
  quality_confidence: 0,
  publish_ready: false,
};

const ATOMIZATION_FALLBACK: AtomizationResult = {
  tag: 'needs-full-context',
  tag_confidence: 0,
  extractable: false,
};

// ── Generic Classify ────────────────────────────────────────────────────────

async function classify<T>(
  classifier: string,
  text: string,
  fallback: T,
): Promise<T> {
  if (!text?.trim()) return fallback;

  try {
    const res = await fetch(`${MAIA_URL}/v1/classify/${classifier}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(3_000),
    });

    if (!res.ok) return fallback;

    const data = await res.json();
    return data as T;
  } catch {
    // Timeout, network error, or service not running — always fail safe
    return fallback;
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

export const maia = {
  /** Distress/crisis detection (journal, assessment, forum, check-in) */
  distress: (text: string) => classify<DistressResult>('distress', text, DISTRESS_FALLBACK),

  /** Forum post topic classification + provider routing */
  forumTopic: (text: string) => classify<ForumTopicResult>('forum-topic', text, FORUM_TOPIC_FALLBACK),

  /** Therapeutic language quality scoring (lesson content) */
  contentQuality: (text: string) => classify<ContentQualityResult>('content-quality', text, CONTENT_QUALITY_FALLBACK),

  /** Content atomization tagging (marketing extraction) */
  atomization: (text: string) => classify<AtomizationResult>('content-atomization', text, ATOMIZATION_FALLBACK),

  /** Service health check */
  health: async (): Promise<MaiaHealthResult | null> => {
    try {
      const res = await fetch(`${MAIA_URL}/v1/health`, {
        signal: AbortSignal.timeout(3_000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },
};
