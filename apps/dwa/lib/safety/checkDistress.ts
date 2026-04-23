/**
 * Distress classification utility
 *
 * Delegates to the Maia unified AI client for distress classification.
 * All exports are preserved for backwards compatibility — existing call
 * sites (api/safety/classify, journal, assessments) work unchanged.
 *
 * Usage:
 *   const result = await checkDistress(text, { context: 'journal', userId, courseId })
 *   if (result.crisis)  → surface crisis modal
 *   if (result.flag)    → surface gentle check-in prompt
 */

import { maia } from '@/lib/ai/maia-client';
import type { DistressResult } from '@/lib/ai/maia-client';

export type DistressLevel = 'none' | 'mild' | 'crisis';

export interface DistressContext {
  context: 'journal' | 'assessment' | 'forum' | 'checkin';
  userId?: string;
  courseId?: string;
  lessonId?: string;
}

export type { DistressResult };

export async function checkDistress(
  text: string,
  _context?: DistressContext,
): Promise<DistressResult> {
  return maia.distress(text);
}

/**
 * Convenience: returns true if the text should trigger a crisis modal.
 * Equivalent to checkDistress(text).crisis but shorter for PHQ-9 Item 9 checks.
 */
export async function isCrisisLevel(text: string): Promise<boolean> {
  const result = await checkDistress(text);
  return result.crisis;
}
