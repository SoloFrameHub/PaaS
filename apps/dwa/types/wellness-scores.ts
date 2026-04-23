/**
 * Wellness Scoring Types
 * Types for the 5-dimension wellness scoring system, smart actions, and alerts.
 */

// ── Dimension Keys ──────────────────────────────────────────────────────────

export type WellnessDimensionKey =
  | 'anxietyManagement'
  | 'moodStability'
  | 'sleepQuality'
  | 'stressResilience'
  | 'nutritionAwareness';

export const DIMENSION_KEYS: WellnessDimensionKey[] = [
  'anxietyManagement',
  'moodStability',
  'sleepQuality',
  'stressResilience',
  'nutritionAwareness',
];

// ── Dimension Score ─────────────────────────────────────────────────────────

export type WellnessTier = 'thriving' | 'growing' | 'needs-attention';

export interface WellnessDimension {
  key: WellnessDimensionKey;
  label: string;
  score: number | null;            // 0-100, null = no data yet
  assessmentScore: number | null;  // normalized 0-100 from clinical assessment
  engagementScore: number | null;  // normalized 0-100 from logs/records/lessons
  delta: number | null;            // change vs. previous snapshot
  lastAssessmentAt: string | null;
  assessmentId: string | null;     // e.g., 'gad7'
  courseId: string | null;         // course containing the primary assessment
  trackId: string;
  tier: WellnessTier | null;       // null when score is null
}

// ── Aggregate Scores ────────────────────────────────────────────────────────

export interface WellnessScores {
  dimensions: Record<WellnessDimensionKey, WellnessDimension>;
  overallScore: number | null;
  computedAt: string;
}

// ── Score History (stored in profile JSONB) ─────────────────────────────────

export interface WellnessScoreSnapshot {
  scores: Record<WellnessDimensionKey, number | null>;
  overallScore: number | null;
  snapshotAt: string;
}

// ── Smart Actions ───────────────────────────────────────────────────────────

export type WellnessActionSource =
  | 'quick-checkin'    // 5-10 min exercise
  | 'practice'         // technique from current/recommended course
  | 'deep-dive'        // start/continue a course
  | 'talk-to-coach';   // coaching session

export interface PrioritizedWellnessAction {
  id: string;
  title: string;
  description: string;
  source: WellnessActionSource;
  urgency: 'primary' | 'secondary';
  href: string;
  durationLabel: string;
  dimensionKey: WellnessDimensionKey | null;
  badgeLabel: string;
}

// ── Alerts ──────────────────────────────────────────────────────────────────

export type WellnessAlertKind =
  | 'reassess'
  | 'inactivity'
  | 'stagnation'
  | 'clinical-flag';

export interface WellnessAlert {
  id: string;
  kind: WellnessAlertKind;
  title: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
  dimensionKey: WellnessDimensionKey | null;
  priority: number;     // lower = shown first
  isClinical: boolean;  // affects visual treatment
}

// ── Dimension Color Palette ─────────────────────────────────────────────────

export interface DimensionColors {
  bg: string;
  text: string;
  bar: string;
}
