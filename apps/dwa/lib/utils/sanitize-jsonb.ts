/**
 * JSONB Sanitization Utility
 *
 * Protects against:
 * - Prototype pollution (__proto__, constructor, prototype)
 * - Unbounded object depth (DoS via deeply nested objects)
 * - JSONB injection (if data is later used in raw SQL)
 *
 * Usage:
 * const clean = sanitizeJsonb(userProvidedData);
 * await db.insert(table).values({ data: clean });
 */

const FORBIDDEN_KEYS = ['__proto__', 'constructor', 'prototype'];
const DEFAULT_MAX_DEPTH = 10;

export interface SanitizeOptions {
  maxDepth?: number;
  allowedTypes?: ('string' | 'number' | 'boolean' | 'object' | 'array')[];
}

/**
 * Recursively sanitizes a JSON object for safe storage in JSONB columns
 */
export function sanitizeJsonb(
  obj: unknown,
  options: SanitizeOptions = {}
): Record<string, unknown> {
  const {
    maxDepth = DEFAULT_MAX_DEPTH,
    allowedTypes = ['string', 'number', 'boolean', 'object', 'array'],
  } = options;

  // Handle non-objects
  if (typeof obj !== 'object' || obj === null) {
    return {};
  }

  // Handle arrays at root (wrap in object)
  if (Array.isArray(obj)) {
    return { items: sanitizeArray(obj, 0, maxDepth, allowedTypes) };
  }

  const clean: Record<string, unknown> = {};
  traverse(obj as Record<string, unknown>, clean, 0, maxDepth, allowedTypes);
  return clean;
}

function traverse(
  source: Record<string, unknown>,
  target: Record<string, unknown>,
  depth: number,
  maxDepth: number,
  allowedTypes: string[]
): void {
  // Stop at max depth to prevent DoS
  if (depth > maxDepth) {
    return;
  }

  for (const [key, value] of Object.entries(source)) {
    // Block prototype pollution keys
    if (FORBIDDEN_KEYS.includes(key)) {
      continue;
    }

    // Block non-string keys (shouldn't happen in JSON, but be safe)
    if (typeof key !== 'string') {
      continue;
    }

    // Block keys that are too long (prevent DoS)
    if (key.length > 100) {
      continue;
    }

    const valueType = Array.isArray(value) ? 'array' : typeof value;

    // Skip disallowed types
    if (!allowedTypes.includes(valueType)) {
      continue;
    }

    // Handle null
    if (value === null) {
      target[key] = null;
      continue;
    }

    // Handle primitives
    if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
      // Sanitize strings (truncate if too long)
      if (typeof value === 'string' && value.length > 10000) {
        target[key] = value.slice(0, 10000);
      } else {
        target[key] = value;
      }
      continue;
    }

    // Handle arrays
    if (valueType === 'array') {
      target[key] = sanitizeArray(value as unknown[], depth + 1, maxDepth, allowedTypes);
      continue;
    }

    // Handle objects (recurse)
    if (valueType === 'object') {
      const nested: Record<string, unknown> = {};
      traverse(value as Record<string, unknown>, nested, depth + 1, maxDepth, allowedTypes);
      target[key] = nested;
    }
  }
}

function sanitizeArray(
  arr: unknown[],
  depth: number,
  maxDepth: number,
  allowedTypes: string[]
): unknown[] {
  if (depth > maxDepth) {
    return [];
  }

  // Limit array length to prevent DoS
  if (arr.length > 1000) {
    arr = arr.slice(0, 1000);
  }

  return arr.map((item) => {
    if (item === null) {
      return null;
    }

    const itemType = Array.isArray(item) ? 'array' : typeof item;

    if (!allowedTypes.includes(itemType)) {
      return null;
    }

    if (itemType === 'string' || itemType === 'number' || itemType === 'boolean') {
      // Truncate long strings
      if (typeof item === 'string' && item.length > 10000) {
        return item.slice(0, 10000);
      }
      return item;
    }

    if (itemType === 'array') {
      return sanitizeArray(item as unknown[], depth + 1, maxDepth, allowedTypes);
    }

    if (itemType === 'object') {
      const nested: Record<string, unknown> = {};
      traverse(item as Record<string, unknown>, nested, depth + 1, maxDepth, allowedTypes);
      return nested;
    }

    return null;
  });
}
