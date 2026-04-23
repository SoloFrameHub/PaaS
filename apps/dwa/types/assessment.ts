/**
 * Self-Assessment Types
 * Likert-scale assessments (GAD-7, PHQ-9, SPIN, etc.) used across wellness courses
 */

/** A single question in a Likert-scale assessment */
export interface AssessmentQuestion {
  id: string;
  text: string;
  reverseScored?: boolean;
}

/** Defines the numeric scale and its labels */
export interface LikertScale {
  min: number;
  max: number;
  labels: Record<number, string>;
}

/** A scoring band that maps a score range to a severity level */
export interface SeverityBand {
  min: number;
  max: number;
  severity: string;
  label: string;
  description: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
}

/** Scoring configuration for an assessment */
export interface ScoringConfig {
  maxScore: number;
  bands: SeverityBand[];
  functionalImpairmentQuestion?: string;
}

/** Full assessment configuration loaded from JSON */
export interface AssessmentConfig {
  id: string;
  title: string;
  description: string;
  instructions: string;
  timeframe: string;
  questions: AssessmentQuestion[];
  scale: LikertScale;
  scoring: ScoringConfig;
  disclaimer: string;
  crisisItemIds?: string[];
}

/** Client-safe assessment config (scoring bands omitted to prevent gaming) */
export interface AssessmentConfigClient {
  id: string;
  title: string;
  description: string;
  instructions: string;
  timeframe: string;
  questions: AssessmentQuestion[];
  scale: LikertScale;
  disclaimer: string;
  crisisItemIds?: string[];
  questionCount: number;
  maxScore: number;
}

/** A completed assessment result */
export interface AssessmentResult {
  assessmentId: string;
  courseId: string;
  lessonId: string;
  responses: Record<string, number>;
  totalScore: number;
  maxScore: number;
  severity: string;
  severityLabel: string;
  severityDescription: string;
  severityColor: string;
  completedAt: string;
  crisisItemTriggered?: boolean;
}

/** Response shape from POST /api/academy/assessment */
export interface AssessmentSubmitResponse {
  result: AssessmentResult;
  previousResult?: AssessmentResult;
  scoringBands: SeverityBand[];
}

/** Response shape from GET /api/academy/assessment */
export interface AssessmentLoadResponse {
  config: AssessmentConfigClient;
  previousResults: AssessmentResult[];
}
