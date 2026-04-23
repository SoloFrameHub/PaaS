/**
 * Personalization Utilities — Pure Functions
 *
 * Helpers for surfacing why a course matters to a specific user,
 * and what to do next. All pure, no I/O.
 */

import type { WellnessProfile, SymptomCategory } from '@/types/wellness-profile';
import { SYMPTOM_COURSE_MAPPING } from '@/types/wellness-profile';
import type { WellnessScores } from '@/types/wellness-scores';
import { DIMENSION_KEYS } from '@/types/wellness-scores';
import { DIMENSION_COURSE_MAP, getCourseDimension, getCourse } from '@/lib/data/curriculum';
import { getDimensionLabel, getTierLabel, getWeakDimensions } from '@/lib/utils/wellness-scores';

// ── Symptom Matching ────────────────────────────────────────────────────────

/**
 * For a given course, return which of the user's symptom categories map to it.
 * Inverts SYMPTOM_COURSE_MAPPING per-course.
 */
export function getMatchingSymptomsForCourse(
    courseId: string,
    userSymptoms: SymptomCategory[],
): SymptomCategory[] {
    return userSymptoms.filter(symptom =>
        SYMPTOM_COURSE_MAPPING[symptom]?.includes(courseId)
    );
}

// ── Relevance Messaging ─────────────────────────────────────────────────────

/** Capitalize a symptom slug for display (e.g. "social-anxiety" -> "Social Anxiety") */
function formatSymptom(s: string): string {
    return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Build a warm, specific explanation of why a course is relevant to this user.
 * Returns null if there's no personalization context.
 */
export function buildRelevanceMessage(
    courseId: string,
    profile: WellnessProfile,
    scores: WellnessScores,
): string | null {
    const dimension = getCourseDimension(courseId);
    const userSymptoms = (profile.questionnaire?.primarySymptoms ?? []).map(s => s.category);
    const matching = getMatchingSymptomsForCourse(courseId, userSymptoms);

    if (matching.length === 0 && !dimension) return null;

    const parts: string[] = [];

    if (matching.length > 0) {
        const symptomNames = matching.map(formatSymptom).join(' and ');
        parts.push(`This course helps with ${symptomNames}, which you identified as important.`);
    }

    if (dimension) {
        const dim = scores.dimensions[dimension];
        if (dim?.tier) {
            const tierLabel = getTierLabel(dim.tier);
            parts.push(`Your ${dim.label} area is "${tierLabel}" \u2014 this course will help you grow.`);
        }
    }

    return parts.length > 0 ? parts.join(' ') : null;
}

// ── Next Course Suggestion ──────────────────────────────────────────────────

export interface CourseSuggestion {
    courseId: string;
    title: string;
    reason: string;
}

/**
 * Suggest the next course after completing (or viewing) a given course.
 * Priority: next in same dimension → weakest other dimension.
 */
export function getNextCourseSuggestion(
    currentCourseId: string,
    profile: WellnessProfile,
    scores: WellnessScores,
): CourseSuggestion | null {
    const completed = new Set(profile.progress?.completedCourses ?? []);
    const dimension = getCourseDimension(currentCourseId);

    // Try next course in the same dimension
    if (dimension) {
        const coursesInDimension = DIMENSION_COURSE_MAP[dimension];
        const currentIdx = coursesInDimension.indexOf(currentCourseId);

        if (currentIdx >= 0) {
            for (let i = currentIdx + 1; i < coursesInDimension.length; i++) {
                const nextId = coursesInDimension[i];
                if (!completed.has(nextId)) {
                    const next = getCourse(nextId);
                    if (next) {
                        return {
                            courseId: nextId,
                            title: next.title,
                            reason: `Continue building your ${getDimensionLabel(dimension).toLowerCase()} skills`,
                        };
                    }
                }
            }
        }
    }

    // Fall back to weakest other dimension
    const weakDimensions = getWeakDimensions(scores)
        .filter(d => d.key !== dimension);

    for (const weakDim of weakDimensions) {
        const courses = DIMENSION_COURSE_MAP[weakDim.key];
        for (const cId of courses) {
            if (!completed.has(cId)) {
                const course = getCourse(cId);
                if (course) {
                    return {
                        courseId: cId,
                        title: course.title,
                        reason: `Your ${weakDim.label.toLowerCase()} area could use some attention`,
                    };
                }
            }
        }
    }

    // Try any dimension with unscored courses
    for (const key of DIMENSION_KEYS) {
        if (key === dimension) continue;
        const dim = scores.dimensions[key];
        if (!dim || dim.score !== null) continue;

        const courses = DIMENSION_COURSE_MAP[key];
        for (const cId of courses) {
            if (!completed.has(cId)) {
                const course = getCourse(cId);
                if (course) {
                    return {
                        courseId: cId,
                        title: course.title,
                        reason: `Explore a new area of your wellness journey`,
                    };
                }
            }
        }
    }

    return null;
}
