/**
 * Production-grade Rate Limiting Utility (Sliding Window)
 * Designed for Next.js Middleware and API routes.
 */

import { redis } from './redis';
import { logger } from './logger';

/**
 * In-memory rate limit fallback when Redis is unavailable.
 * Maps identifier -> array of request timestamps within the current window.
 */
const memoryStore = new Map<string, number[]>();
let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 60_000; // clean up stale entries every 60s

function memoryRateLimit(identifier: string, config: RateLimitConfig, namespace: string): { limited: boolean; remaining: number; reset: number } {
    const now = Date.now();
    const key = `${namespace}:${identifier}`;
    const windowStart = now - config.windowMs;

    // Periodic cleanup of stale keys
    if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
        lastCleanup = now;
        memoryStore.forEach((timestamps, k) => {
            const filtered = timestamps.filter(t => t > now - config.windowMs);
            if (filtered.length === 0) {
                memoryStore.delete(k);
            } else {
                memoryStore.set(k, filtered);
            }
        });
    }

    const timestamps = (memoryStore.get(key) ?? []).filter(t => t > windowStart);
    timestamps.push(now);
    memoryStore.set(key, timestamps);

    const count = timestamps.length;
    const oldestInWindow = timestamps[0] ?? now;

    if (count > config.limit) {
        return { limited: true, remaining: 0, reset: oldestInWindow + config.windowMs };
    }

    return { limited: false, remaining: Math.max(0, config.limit - count), reset: oldestInWindow + config.windowMs };
}

export interface RateLimitConfig {
    limit: number;      // Max requests
    windowMs: number;   // Time window in milliseconds
}

/**
 * Checks if a given identifier is rate limited based on the provided configuration.
 * Uses a Redis-backed sliding window algorithm for accurate counting.
 * 
 * @param identifier - Unique identifier for the client (e.g., IP or user ID).
 * @param config - Rate limiting configuration (limit and window size).
 * @returns An object containing limited status, remaining requests, and reset timestamp.
 */
export async function isRateLimited(identifier: string, config: RateLimitConfig, namespace: string = 'global'): Promise<{ limited: boolean; remaining: number; reset: number }> {
    // Bypass rate limiting in mock environments to prevent Redis errors
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true') {
        // B-044: NODE_ENV alone — never rely on VERCEL_ENV to close the prod gate
        // (not set on Dokploy, so the dual-check silently failed open in prod there).
        if (process.env.NODE_ENV === 'production') {
            throw new Error('CRITICAL: Mock auth cannot be enabled in production');
        }
        return {
            limited: false,
            remaining: config.limit,
            reset: Date.now() + config.windowMs
        };
    }
    const key = `ratelimit:${namespace}:${identifier}`;
    const now = Date.now();
    const windowStart = now - config.windowMs;

    try {
        if (!redis) {
            return { limited: false, remaining: config.limit, reset: now + config.windowMs };
        }
        // Multi-exec for atomic sliding window update
        const multi = redis.multi();
        multi.zremrangebyscore(key, 0, windowStart);
        multi.zadd(key, now, now.toString());
        multi.zcard(key);
        multi.zrange(key, 0, 0); // Get oldest timestamp for reset calculation
        multi.expire(key, Math.ceil(config.windowMs / 1000) + 1);

        const results = await multi.exec();
        if (!results) throw new Error('Redis transaction failed');

        const currentUsage = Number(results[2][1]);
        const oldestTimestamp = Number((results[3][1] as string[])[0] || now);
        const resetTime = oldestTimestamp + config.windowMs;

        if (currentUsage > config.limit) {
            return {
                limited: true,
                remaining: 0,
                reset: resetTime
            };
        }

        return {
            limited: false,
            remaining: Math.max(0, config.limit - currentUsage),
            reset: resetTime
        };
    } catch (error) {
        logger.error('Redis Rate Limit Error — falling back to in-memory rate limiting', { error });
        return memoryRateLimit(identifier, config, namespace);
    }
}

/**
 * AI API Specific Rate Limits
 * Stricter limits for expensive AI generation calls.
 */
export const AI_RATE_LIMIT = {
    limit: 10,           // 10 requests
    windowMs: 60 * 1000  // per 1 minute
};

/**
 * Auth Rate Limits (signin, signup)
 * Stricter limits to prevent brute-force attacks.
 */
export const AUTH_RATE_LIMIT = {
    limit: 5,                    // 5 attempts
    windowMs: 15 * 60 * 1000    // per 15 minutes
};

/**
 * General API Rate Limits
 */
export const GENERAL_RATE_LIMIT = {
    limit: 60,           // 60 requests
    windowMs: 60 * 1000  // per 1 minute
};

/**
 * Extract the client IP for rate-limit bucketing.
 *
 * The client fully controls the `X-Forwarded-For` header and our reverse
 * proxy (Traefik / Dokploy) appends the real socket IP to the tail.
 * Using `split(',')[0]` keyed the limiter on the attacker-controlled value,
 * letting one attacker rotate the header and bypass the bucket (B-041).
 *
 * Preference order:
 *   1. `x-real-ip` — Traefik/Dokploy sets this from the socket, not from
 *      any client-supplied header.
 *   2. Rightmost entry of `x-forwarded-for` — the one appended by our own
 *      trusted proxy.
 *   3. Literal `'unknown'`.
 */
export function getClientIp(request: { headers: Headers }): string {
    const realIp = request.headers.get('x-real-ip');
    if (realIp && realIp.trim()) return realIp.trim();
    const xff = request.headers.get('x-forwarded-for');
    if (xff) {
        const parts = xff.split(',').map(p => p.trim()).filter(Boolean);
        if (parts.length) return parts[parts.length - 1]!;
    }
    return 'unknown';
}
