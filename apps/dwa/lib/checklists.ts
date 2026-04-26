import fs from 'fs';
import path from 'path';
import type { ChecklistConfig } from '@/types/checklist';
import { logger } from './logger';
import { safeResolveInside } from './utils/safe-path';

const CHECKLISTS_PATH = path.join(process.cwd(), 'server/data/checklists');

function loadLessonMap(): Record<string, Record<string, string>> {
    try {
        const filePath = path.join(CHECKLISTS_PATH, 'lesson-map.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        logger.error('Failed to load checklists lesson-map.json');
        return {};
    }
}

/** Loads a checklist config by its ID */
export function getChecklistConfig(checklistId: string): ChecklistConfig | null {
    const filePath = safeResolveInside(CHECKLISTS_PATH, `${checklistId}.json`);
    if (!filePath) {
        logger.warn(`Checklist config rejected (invalid id): ${checklistId}`);
        return null;
    }
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw) as ChecklistConfig;
    } catch {
        logger.warn(`Checklist config not found: ${checklistId}`);
        return null;
    }
}

/** Gets the checklist config for a specific course lesson, if one is mapped */
export function getChecklistForLesson(courseId: string, lessonId: string): ChecklistConfig | null {
    const map = loadLessonMap();
    const checklistId = map[courseId]?.[lessonId];
    if (!checklistId) return null;
    return getChecklistConfig(checklistId);
}
