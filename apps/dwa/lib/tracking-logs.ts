import fs from 'fs';
import path from 'path';
import type { TrackingLogConfig, TrackingLogEntry } from '@/types/tracking-log';
import { logger } from './logger';
import { safeResolveInside } from './utils/safe-path';

const TRACKING_LOGS_PATH = path.join(process.cwd(), 'server/data/tracking-logs');

function loadLessonMap(): Record<string, Record<string, string>> {
    try {
        const filePath = path.join(TRACKING_LOGS_PATH, 'lesson-map.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        logger.error('Failed to load tracking-logs lesson-map.json');
        return {};
    }
}

/** Loads a tracking log config by its ID */
export function getTrackingLogConfig(logId: string): TrackingLogConfig | null {
    const filePath = safeResolveInside(TRACKING_LOGS_PATH, `${logId}.json`);
    if (!filePath) {
        logger.warn(`Tracking log config rejected (invalid id): ${logId}`);
        return null;
    }
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw) as TrackingLogConfig;
    } catch {
        logger.warn(`Tracking log config not found: ${logId}`);
        return null;
    }
}

/** Gets the tracking log config for a specific course lesson, if one is mapped */
export function getTrackingLogForLesson(courseId: string, lessonId: string): TrackingLogConfig | null {
    const map = loadLessonMap();
    const logId = map[courseId]?.[lessonId];
    if (!logId) return null;
    return getTrackingLogConfig(logId);
}

/** Parses a time string "HH:MM" into minutes since midnight */
function timeToMinutes(time: string | number | boolean): number {
    if (typeof time !== 'string') return 0;
    const [h, m] = time.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
}

/** Computes minutes between two times, handling midnight crossing */
function minutesBetween(startTime: string | number | boolean, endTime: string | number | boolean): number {
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    // Handle midnight crossing (e.g., 23:00 → 07:00)
    return end >= start ? end - start : (1440 - start) + end;
}

/**
 * Computes derived metrics for a tracking log entry.
 * Each formula ID maps to a specific calculation function.
 */
export function computeDerivedMetrics(
    config: TrackingLogConfig,
    values: Record<string, string | number | boolean>
): Record<string, number> {
    const derived: Record<string, number> = {};

    if (!config.derivedMetrics) return derived;

    for (const metric of config.derivedMetrics) {
        switch (metric.formula) {
            case 'timeInBed': {
                // Minutes from bedTime to outOfBedTime
                derived[metric.id] = minutesBetween(values.bedTime, values.outOfBedTime);
                break;
            }
            case 'totalSleepTime': {
                // Time in bed minus sleep onset latency minus WASO
                const tib = minutesBetween(values.bedTime, values.outOfBedTime);
                const sol = Number(values.sleepOnsetMinutes) || 0;
                const waso = Number(values.wasoMinutes) || 0;
                derived[metric.id] = Math.max(0, tib - sol - waso);
                break;
            }
            case 'sleepEfficiency': {
                // (Total Sleep Time / Time in Bed) * 100
                const tib = minutesBetween(values.bedTime, values.outOfBedTime);
                const sol = Number(values.sleepOnsetMinutes) || 0;
                const waso = Number(values.wasoMinutes) || 0;
                const tst = Math.max(0, tib - sol - waso);
                derived[metric.id] = tib > 0 ? Math.round((tst / tib) * 100) : 0;
                break;
            }
            default:
                logger.warn(`Unknown derived metric formula: ${metric.formula}`);
        }
    }

    return derived;
}

/** Generates a simple unique ID for log entries */
export function generateEntryId(): string {
    return `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Filters entries by logId and returns them sorted by date descending */
export function filterAndSortEntries(entries: TrackingLogEntry[], logId: string, limit = 14): TrackingLogEntry[] {
    return entries
        .filter(e => e.logId === logId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
}
