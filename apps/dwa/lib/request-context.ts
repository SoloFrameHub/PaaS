/**
 * Request Context Storage (Finding 11)
 *
 * Uses AsyncLocalStorage to maintain request-scoped context across async operations.
 * Enables request ID tracking for distributed tracing and log correlation.
 */

import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  requestId: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  path?: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

/**
 * Get current request context (if available)
 */
export function getRequestContext(): RequestContext | undefined {
  return requestContext.getStore();
}

/**
 * Get current request ID (if available)
 */
export function getRequestId(): string | undefined {
  return requestContext.getStore()?.requestId;
}

/**
 * Run a function with request context
 */
export function withRequestContext<T>(context: RequestContext, fn: () => T): T {
  return requestContext.run(context, fn);
}
