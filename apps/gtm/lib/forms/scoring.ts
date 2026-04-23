/**
 * Form Qualification Scoring Engine
 *
 * Calculates a weighted score based on selected options and scoring rules.
 * Each field option can have a scoreValue; each rule has a weight multiplier.
 */

import type { ScoringRule, FormFieldDefinition } from './types';

export function calculateScore(
  formData: Record<string, unknown>,
  rules: ScoringRule[],
  allFields: FormFieldDefinition[]
): { totalScore: number; breakdown: Record<string, number> } {
  const breakdown: Record<string, number> = {};
  let totalScore = 0;

  for (const rule of rules) {
    const fieldValue = formData[rule.fieldId];
    if (fieldValue === undefined || fieldValue === null || fieldValue === '') continue;

    const fieldDef = allFields.find((f) => f.id === rule.fieldId);
    if (!fieldDef?.options) continue;

    let baseScore = 0;

    if (Array.isArray(fieldValue)) {
      // multi-select: sum scoreValues of all selected options
      for (const val of fieldValue) {
        const opt = fieldDef.options.find((o) => o.id === val);
        baseScore += opt?.scoreValue ?? (rule.scoreMap?.[val as string] ?? 0);
      }
    } else {
      const opt = fieldDef.options.find((o) => o.id === fieldValue);
      baseScore = opt?.scoreValue ?? (rule.scoreMap?.[fieldValue as string] ?? 0);
    }

    const weightedScore = Math.round(baseScore * rule.weight);
    breakdown[rule.fieldId] = weightedScore;
    totalScore += weightedScore;
  }

  return { totalScore, breakdown };
}

export function getQualificationStatus(
  score: number,
  thresholds: { qualified: number; maybe: number }
): 'qualified' | 'maybe' | 'unqualified' {
  if (score >= thresholds.qualified) return 'qualified';
  if (score >= thresholds.maybe) return 'maybe';
  return 'unqualified';
}
