/**
 * Lesson Engagement — computes what interactive elements a lesson has
 * and whether the user has completed them.
 */

import { hasQuiz } from '@/lib/services/quizService';
import { getChecklistForLesson } from '@/lib/checklists';
import type { WellnessProfile } from '@/types/wellness-profile';
import type { ChecklistProgress } from '@/types/checklist';
import fs from 'fs';
import path from 'path';

// ── Lesson content reader ───────────────────────────────────────────────────

function readLessonContent(trackId: string, courseId: string, lessonId: string): string {
    try {
        const filePath = path.join(process.cwd(), 'server/data/content', trackId, courseId, `lesson-${lessonId}.md`);
        return fs.readFileSync(filePath, 'utf-8');
    } catch {
        return '';
    }
}

// ── Lesson-map loaders ──────────────────────────────────────────────────────

function loadMap(dir: string): Record<string, Record<string, string>> {
    try {
        const filePath = path.join(process.cwd(), 'server/data', dir, 'lesson-map.json');
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
        return {};
    }
}

const assessmentMap = () => loadMap('assessments');
const trackingLogMap = () => loadMap('tracking-logs');
const thoughtRecordMap = () => loadMap('thought-records');

// ── Types ───────────────────────────────────────────────────────────────────

export interface LessonEngagement {
    /** What interactive elements this lesson has */
    available: {
        quiz: boolean;
        checklist: boolean;
        assessment: boolean;
        trackingLog: boolean;
        thoughtRecord: boolean;
        checkin: boolean;
    };
    /** What the user has completed */
    completed: {
        quiz: boolean;
        checklist: boolean;
        assessment: boolean;
        trackingLog: boolean;
        thoughtRecord: boolean;
        checkin: boolean;
    };
    /** Summary counts */
    totalAvailable: number;
    totalCompleted: number;
}

// ── Main Function ───────────────────────────────────────────────────────────

export function getLessonEngagement(
    trackId: string,
    courseId: string,
    lessonId: string,
    profile: WellnessProfile,
): LessonEngagement {
    // What's available
    const quizAvailable = hasQuiz(trackId, courseId, lessonId);
    const checklistConfig = getChecklistForLesson(courseId, lessonId);
    const checklistAvailable = !!checklistConfig;
    const assessmentAvailable = !!assessmentMap()[courseId]?.[lessonId];
    const trackingLogAvailable = !!trackingLogMap()[courseId]?.[lessonId];
    const thoughtRecordAvailable = !!thoughtRecordMap()[courseId]?.[lessonId];

    // Detect inline <Checkin> components by scanning the lesson markdown
    const lessonContent = readLessonContent(trackId, courseId, lessonId);
    const checkinAvailable = lessonContent.includes('<Checkin');

    // What's completed — check profile data
    // Quiz: use dedicated completedQuizzes field (NOT completedLessons, which is also
    // written by the "complete lesson" button — the two were previously conflated)
    const completedQuizzes = profile.progress?.completedQuizzes?.[courseId] ?? [];
    const quizCompleted = quizAvailable && completedQuizzes.includes(lessonId);

    const checklists: ChecklistProgress[] = profile.progress?.checklists ?? [];
    const checklistCompleted = checklistAvailable && checklistConfig
        ? checklists.some(c => c.checklistId === checklistConfig.id && (
            Object.keys(c.items ?? {}).length > 0 || Object.keys(c.values ?? {}).length > 0
        ))
        : false;

    // Assessments are stored in profile.assessment.assessmentHistory
    const assessmentHistory: any[] = (profile as any).assessment?.assessmentHistory ?? [];
    const assessmentId = assessmentMap()[courseId]?.[lessonId];
    const assessmentCompleted = assessmentAvailable && assessmentId
        ? assessmentHistory.some((a: any) => a.assessmentId === assessmentId)
        : false;

    const trackingLogs: any[] = profile.progress?.trackingLogs ?? [];
    const trackingLogId = trackingLogMap()[courseId]?.[lessonId];
    const trackingLogCompleted = trackingLogAvailable && trackingLogId
        ? trackingLogs.some((l: any) => l.logId === trackingLogId)
        : false;

    const thoughtRecords: any[] = profile.progress?.thoughtRecords ?? [];
    const thoughtRecordId = thoughtRecordMap()[courseId]?.[lessonId];
    const thoughtRecordCompleted = thoughtRecordAvailable && thoughtRecordId
        ? thoughtRecords.some((r: any) => r.recordId === thoughtRecordId)
        : false;

    // Checkin: completed if any checkin was saved for this specific lesson
    const componentStates: any[] = (profile.progress as any)?.componentStates ?? [];
    const lessonState = componentStates.find((s: any) => s.courseId === courseId && s.lessonId === lessonId);
    const checkinCompleted = checkinAvailable && !!(lessonState?.checkins && Object.keys(lessonState.checkins).length > 0);

    const available = {
        quiz: quizAvailable,
        checklist: checklistAvailable,
        assessment: assessmentAvailable,
        trackingLog: trackingLogAvailable,
        thoughtRecord: thoughtRecordAvailable,
        checkin: checkinAvailable,
    };

    const completed = {
        quiz: quizCompleted,
        checklist: checklistCompleted,
        assessment: assessmentCompleted,
        trackingLog: trackingLogCompleted,
        thoughtRecord: thoughtRecordCompleted,
        checkin: checkinCompleted,
    };

    const totalAvailable = Object.values(available).filter(Boolean).length;
    const totalCompleted = Object.values(completed).filter(Boolean).length;

    return { available, completed, totalAvailable, totalCompleted };
}
