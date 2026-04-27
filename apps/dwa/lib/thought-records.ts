import fs from 'fs';
import path from 'path';
import type { ThoughtRecordConfig, ThoughtRecordEntry } from '@/types/thought-record';
import { logger } from './logger';
import { safeResolveInside } from './utils/safe-path';

const THOUGHT_RECORDS_PATH = path.join(process.cwd(), 'server/data/thought-records');

function loadLessonMap(): Record<string, Record<string, string>> {
    try {
        const filePath = path.join(THOUGHT_RECORDS_PATH, 'lesson-map.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        logger.error('Failed to load thought-records lesson-map.json');
        return {};
    }
}

/** Loads a thought record config by its ID */
export function getThoughtRecordConfig(recordId: string): ThoughtRecordConfig | null {
    const filePath = safeResolveInside(THOUGHT_RECORDS_PATH, `${recordId}.json`);
    if (!filePath) {
        logger.warn(`Thought record config rejected (invalid id): ${recordId}`);
        return null;
    }
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw) as ThoughtRecordConfig;
    } catch {
        logger.warn(`Thought record config not found: ${recordId}`);
        return null;
    }
}

/** Gets the thought record config for a specific course lesson, if one is mapped */
export function getThoughtRecordForLesson(courseId: string, lessonId: string): ThoughtRecordConfig | null {
    const map = loadLessonMap();
    const recordId = map[courseId]?.[lessonId];
    if (!recordId) return null;
    return getThoughtRecordConfig(recordId);
}

/** Generates a simple unique ID for thought record entries */
export function generateEntryId(): string {
    return `tr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Filters entries by recordId and returns them sorted by date descending */
export function filterAndSortEntries(entries: ThoughtRecordEntry[], recordId: string, limit = 10): ThoughtRecordEntry[] {
    return entries
        .filter(e => e.recordId === recordId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
}
