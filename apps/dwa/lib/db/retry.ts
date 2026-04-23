/**
 * Database Retry Logic (Finding 14)
 *
 * Exponential backoff retry wrapper for transient database errors.
 *
 * Retries on:
 * - Connection errors (ECONNREFUSED, ECONNRESET)
 * - Deadlocks (40P01)
 * - Serialization failures (40001)
 * - Statement timeouts (57014)
 * - Too many connections (53300)
 *
 * Does NOT retry on:
 * - Constraint violations (unique, foreign key, check)
 * - Syntax errors
 * - Permission errors
 * - Data type errors
 */

import { logger } from '@/lib/logger';

interface RetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  onRetry?: (attempt: number, error: Error) => void;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  baseDelayMs: 100,
  maxDelayMs: 5000,
  onRetry: () => {},
};

/**
 * Check if error is transient and should be retried
 */
function isTransientError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();
  const code = (error as any).code;

  // PostgreSQL error codes (https://www.postgresql.org/docs/current/errcodes-appendix.html)
  const RETRYABLE_CODES = [
    '40001', // serialization_failure
    '40P01', // deadlock_detected
    '53300', // too_many_connections
    '57014', // query_canceled (statement timeout)
    '08000', // connection_exception
    '08003', // connection_does_not_exist
    '08006', // connection_failure
    '08001', // sqlclient_unable_to_establish_sqlconnection
    '08004', // sqlserver_rejected_establishment_of_sqlconnection
  ];

  if (code && RETRYABLE_CODES.includes(code)) {
    return true;
  }

  // Network errors
  const NETWORK_ERRORS = [
    'econnrefused',
    'econnreset',
    'etimedout',
    'enotfound',
    'enetunreach',
    'socket hang up',
    'connection terminated unexpectedly',
  ];

  return NETWORK_ERRORS.some(err => message.includes(err));
}

/**
 * Calculate delay with exponential backoff + jitter
 */
function calculateDelay(attempt: number, baseDelayMs: number, maxDelayMs: number): number {
  // Exponential: 100ms, 200ms, 400ms, 800ms, ...
  const exponentialDelay = baseDelayMs * Math.pow(2, attempt - 1);

  // Add jitter (±25%) to prevent thundering herd
  const jitter = exponentialDelay * 0.25 * (Math.random() * 2 - 1);

  const delayWithJitter = exponentialDelay + jitter;

  return Math.min(delayWithJitter, maxDelayMs);
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a database operation with exponential backoff
 *
 * @example
 * const user = await withRetry(() => db.select().from(users).where(eq(users.id, '123')));
 *
 * @example
 * await withRetry(
 *   () => db.insert(profile).values({ userId: '123', data: {} }),
 *   { maxAttempts: 5, baseDelayMs: 200 }
 * );
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on non-transient errors
      if (!isTransientError(error)) {
        throw lastError;
      }

      // Don't retry if this was the last attempt
      if (attempt >= opts.maxAttempts) {
        logger.error('Database operation failed after max retries', {
          attempts: attempt,
          error: lastError.message,
          code: (lastError as any).code,
        });
        throw lastError;
      }

      // Calculate delay and retry
      const delayMs = calculateDelay(attempt, opts.baseDelayMs, opts.maxDelayMs);

      logger.warn('Database transient error, retrying', {
        attempt,
        maxAttempts: opts.maxAttempts,
        delayMs: Math.round(delayMs),
        error: lastError.message,
        code: (lastError as any).code,
      });

      opts.onRetry(attempt, lastError);

      await sleep(delayMs);
    }
  }

  // TypeScript: this should never be reached, but satisfy the compiler
  throw lastError!;
}
