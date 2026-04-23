/**
 * Terminology Helper for Wellness Context
 *
 * Provides consistent terminology across the mental wellness platform.
 */

export const TERMINOLOGY = {
    user: "Learner",
    users: "Learners",
    session: "Practice Session",
    sessions: "Practice Sessions",
    course: "Course",
    courses: "Courses",
    lesson: "Lesson",
    lessons: "Lessons",
    exercise: "Exercise",
    exercises: "Exercises",
    coach: "Wellness Coach",
    progress: "Progress",
    assessment: "Wellness Assessment",
    goal: "Wellness Goal",
    goals: "Wellness Goals",
    technique: "Coping Technique",
    techniques: "Coping Techniques",
    checkin: "Wellness Check-in",
    journal: "Reflection Journal",
} as const;

export type TermKey = keyof typeof TERMINOLOGY;

/**
 * Get the appropriate term.
 */
export function getTerm(term: TermKey): string {
    return TERMINOLOGY[term] || term;
}
