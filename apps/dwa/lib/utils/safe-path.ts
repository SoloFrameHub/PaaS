import path from 'path';

// Tight allow-list: every real id in this app is like
// `gad7`, `phq9`, `anxiety-management`, or a small integer lesson number.
// Widen deliberately here if a future id needs a new character — do NOT
// bypass the check at a call site.
const SAFE_SEGMENT = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;

/**
 * Resolve `parts` relative to `base`, guaranteeing the result stays inside
 * `base`. Returns `null` when any segment fails validation or the resolved
 * path escapes — callers should treat that like file-not-found.
 *
 * B-045: this replaces the many `path.join(BASE, userId, ...)` sites that
 * happily followed `../` segments out of the base directory.
 */
export function safeResolveInside(base: string, ...parts: string[]): string | null {
  for (const p of parts) {
    if (typeof p !== 'string' || !SAFE_SEGMENT.test(p)) return null;
  }
  const resolvedBase = path.resolve(base);
  const resolved = path.resolve(resolvedBase, ...parts);
  if (resolved !== resolvedBase && !resolved.startsWith(resolvedBase + path.sep)) {
    return null;
  }
  return resolved;
}
