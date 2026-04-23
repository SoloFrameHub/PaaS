/**
 * Tracking Log Types
 * Config-driven daily/weekly logs (Sleep Diary, Activity-Mood Log, etc.)
 */

export type FieldType = 'text' | 'number' | 'time' | 'rating' | 'boolean' | 'select';

/** A single field in a tracking log form */
export interface TrackingField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  min?: number;
  max?: number;
  unit?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  ratingLabels?: Record<number, string>;
}

/** A threshold band for derived metric interpretation */
export interface MetricThreshold {
  min: number;
  max: number;
  label: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
}

/** A metric computed from raw field values */
export interface DerivedMetric {
  id: string;
  label: string;
  formula: string;
  unit?: string;
  thresholds?: MetricThreshold[];
}

/** Full tracking log configuration loaded from JSON */
export interface TrackingLogConfig {
  id: string;
  title: string;
  description: string;
  instructions: string;
  frequency: 'daily' | 'weekly' | 'per-event';
  fields: TrackingField[];
  derivedMetrics?: DerivedMetric[];
  disclaimer?: string;
}

/** A single log entry submitted by the user */
export interface TrackingLogEntry {
  id: string;
  logId: string;
  courseId: string;
  lessonId: string;
  date: string;
  values: Record<string, string | number | boolean>;
  derivedValues?: Record<string, number>;
  createdAt: string;
}

/** Response from GET /api/academy/tracking-log */
export interface TrackingLogLoadResponse {
  config: TrackingLogConfig;
  entries: TrackingLogEntry[];
}

/** Response from POST /api/academy/tracking-log */
export interface TrackingLogSubmitResponse {
  entry: TrackingLogEntry;
}
