/**
 * Production-grade Rate Limiting Utility (Sliding Window)
 * Designed for Next.js Middleware and API routes.
 */

import { redis } from "./redis";
import { logger } from "./logger";

export interface RateLimitConfig {
  limit: number; // Max requests
  windowMs: number; // Time window in milliseconds
  failClosed?: boolean; // If true, deny requests when Redis is unavailable (use for auth)
}

/**
 * Checks if a given identifier is rate limited based on the provided configuration.
 * Uses a Redis-backed sliding window algorithm for accurate counting.
 *
 * @param identifier - Unique identifier for the client (e.g., IP or user ID).
 * @param config - Rate limiting configuration (limit and window size).
 * @returns An object containing limited status, remaining requests, and reset timestamp.
 */
export async function isRateLimited(
  identifier: string,
  config: RateLimitConfig,
  namespace: string = "global",
): Promise<{ limited: boolean; remaining: number; reset: number }> {
  // Bypass rate limiting in mock environments to prevent Redis errors
  if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
    return {
      limited: false,
      remaining: config.limit,
      reset: Date.now() + config.windowMs,
    };
  }
  const key = `ratelimit:${namespace}:${identifier}`;
  const now = Date.now();
  const windowStart = now - config.windowMs;

  try {
    if (!redis) {
      if (config.failClosed) {
        logger.warn(
          "Redis unavailable, failing closed for security-critical rate limit",
          { namespace },
        );
        return { limited: true, remaining: 0, reset: now + config.windowMs };
      }
      return {
        limited: false,
        remaining: config.limit,
        reset: now + config.windowMs,
      };
    }
    // Multi-exec for atomic sliding window update
    const multi = redis.multi();
    multi.zremrangebyscore(key, 0, windowStart);
    multi.zadd(key, now, now.toString());
    multi.zcard(key);
    multi.zrange(key, 0, 0); // Get oldest timestamp for reset calculation
    multi.expire(key, Math.ceil(config.windowMs / 1000) + 1);

    const results = await multi.exec();
    if (!results) throw new Error("Redis transaction failed");

    const currentUsage = Number(results[2][1]);
    const oldestTimestamp = Number((results[3][1] as string[])[0] || now);
    const resetTime = oldestTimestamp + config.windowMs;

    if (currentUsage > config.limit) {
      return {
        limited: true,
        remaining: 0,
        reset: resetTime,
      };
    }

    return {
      limited: false,
      remaining: Math.max(0, config.limit - currentUsage),
      reset: resetTime,
    };
  } catch (error) {
    logger.error("Redis Rate Limit Error", { error });
    if (config.failClosed) {
      return { limited: true, remaining: 0, reset: now + config.windowMs };
    }
    // Fallback to allowing request if Redis is down (non-critical endpoints)
    return { limited: false, remaining: 1, reset: now + config.windowMs };
  }
}

/**
 * AI API Specific Rate Limits
 * Stricter limits for expensive AI generation calls.
 */
export const AI_RATE_LIMIT = {
  limit: 10, // 10 requests
  windowMs: 60 * 1000, // per 1 minute
};

/**
 * General API Rate Limits
 */
export const GENERAL_RATE_LIMIT = {
  limit: 60, // 60 requests
  windowMs: 60 * 1000, // per 1 minute
};

/**
 * Auth Rate Limits — strict to prevent brute force.
 * Applies to signin, signup, verify-email, resend-code.
 */
export const AUTH_RATE_LIMIT = {
  limit: 5, // 5 attempts
  windowMs: 15 * 60 * 1000, // per 15 minutes
  failClosed: true, // Deny auth attempts when Redis is unavailable (prevents brute force)
};

/**
 * Expensive Operation Rate Limits — for endpoints that trigger
 * multiple AI calls, external API calls, or heavy processing.
 * Applies to: onboarding/analyze, hunter/domain-search, profile/export.
 */
export const EXPENSIVE_RATE_LIMIT: RateLimitConfig = {
  limit: 3, // 3 requests
  windowMs: 60 * 60 * 1000, // per hour
  failClosed: true,
};

/**
 * Extracts the client IP from a Next.js request.
 * Prefers infrastructure-set headers (x-real-ip, cf-connecting-ip) that
 * cannot be spoofed by end users, over the user-controllable x-forwarded-for.
 */
export function getClientIp(request: {
  headers: { get(name: string): string | null };
}): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "unknown"
  );
}
