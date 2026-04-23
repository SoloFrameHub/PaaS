import fs from 'fs';
import path from 'path';
import { AssessmentConfig } from '@/types/assessment';
import { logger } from './logger';

const ASSESSMENTS_PATH = path.join(process.cwd(), 'server/data/assessments');

/** Loads a lesson-map.json that maps courseId+lessonId to assessmentId */
function loadLessonMap(): Record<string, Record<string, string>> {
    try {
        const filePath = path.join(ASSESSMENTS_PATH, 'lesson-map.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        logger.error('Failed to load assessment lesson-map.json');
        return {};
    }
}

/** Loads an assessment config by its ID (e.g., 'gad7', 'phq9') */
export function getAssessmentConfig(assessmentId: string): AssessmentConfig | null {
    try {
        const filePath = path.join(ASSESSMENTS_PATH, `${assessmentId}.json`);
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw) as AssessmentConfig;
    } catch {
        logger.warn(`Assessment config not found: ${assessmentId}`);
        return null;
    }
}

/** Gets the assessment config for a specific course lesson, if one is mapped */
export function getAssessmentForLesson(courseId: string, lessonId: string): AssessmentConfig | null {
    const map = loadLessonMap();
    const assessmentId = map[courseId]?.[lessonId];
    if (!assessmentId) return null;
    return getAssessmentConfig(assessmentId);
}

/** Calculates the total score and determines the severity band */
export function scoreAssessment(config: AssessmentConfig, responses: Record<string, number>) {
    let totalScore = 0;
    for (const q of config.questions) {
        const value = responses[q.id] ?? 0;
        totalScore += q.reverseScored ? (config.scale.max - value) : value;
    }

    const band = config.scoring.bands.find(b => totalScore >= b.min && totalScore <= b.max);
    const fallback = config.scoring.bands[config.scoring.bands.length - 1];
    const matched = band || fallback;

    const crisisItemTriggered = config.crisisItemIds?.some(id => (responses[id] ?? 0) > 0) ?? false;

    return {
        totalScore,
        maxScore: config.scoring.maxScore,
        severity: matched.severity,
        severityLabel: matched.label,
        severityDescription: matched.description,
        severityColor: matched.color,
        crisisItemTriggered,
    };
}
