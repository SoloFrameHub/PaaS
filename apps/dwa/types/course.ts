/**
 * Course & Curriculum Types
 */

export interface Track {
    id: string;
    title: string;
    description: string;
    magnetComponent: 'M' | 'A' | 'G' | 'N' | 'E' | 'T' | 'S';
    courses: Course[];
}

export interface QuickWinLesson {
    lessonId: string;
    tool: string;
    timeMinutes: number;
    tagline: string;
}

export interface Course {
    id: string;
    title: string;
    number: number;
    description: string;
    duration: string;
    outcomes: string[];
    lessons: LessonMeta[];
    prerequisites?: string[];
    trackId?: string;
    presentationFile?: string;
    /** Short label shown as a badge on course cards, e.g. 'NICE 2024' or 'CBT gold-standard' */
    evidenceBadge?: string;
    /** Clinical framework underpinning the course, e.g. 'CBT', 'DBT', 'CBT-I', 'IPSRT' */
    clinicalFramework?: string;
    /** Flags courses where clinical involvement is required beyond self-management */
    clinicalCaveat?: 'medication-required' | 'consult-provider' | 'none';
    /** Lessons containing a standalone interactive tool suitable for a quick-win entry point */
    quickWinLessons?: QuickWinLesson[];
}

export interface LessonMeta {
    id: string;
    title: string;
    duration: string;
}

export interface Lesson extends LessonMeta {
    courseId: string;
    content: string; // MDX content
    objectives?: string[];
    keyPoints?: string[];
    exercises?: Exercise[];
    quiz?: QuizMeta;
}

export interface Exercise {
    id: string;
    title: string;
    type: 'reflection' | 'action' | 'ai-practice';
    prompt: string;
    hints?: string[];
}

export interface QuizMeta {
    id: string;
    questionCount: number;
    passingScore: number;
}

export interface Quiz {
    id?: string;
    lessonId: string;
    courseId: string;
    sectionId: string;
    title: string;
    passingScore?: number;
    questions: QuizQuestion[];
}

export interface QuizQuestion {
    id: string;
    type: 'multiple-choice' | 'single_choice' | 'true-false' | 'reflection';
    question: string; // Changed from 'text' to 'question' to match quizService
    options?: QuizOption[];
    correctAnswer?: string;
    explanation?: string;
    minLength?: number; // For reflections
    aiPrompt?: string; // For reflections
}

export interface QuizOption {
    id: string;
    text: string;
}

export interface QuizResult {
    id: string;
    type: string;
    question: string;
    userAnswer: string;
    correctAnswer?: string;
    isCorrect?: boolean;
    explanation?: string;
    meetsMinLength?: boolean;
    aiFeedback?: string;
}

export interface QuizResults {
    score: number;
    passed: boolean;
    questionResults: QuizResult[];
}

// User Progress
export interface UserProgress {
    userId: string;
    courseId: string;
    completedLessons: string[];
    currentLesson: string | null;
    startedAt: string;
    lastAccessedAt: string;
    completedAt: string | null;
    quizScores: Record<string, number>; // lessonId -> score
}

export interface OverallProgress {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalLessons: number;
    completedLessons: number;
    currentStreak: number; // days
    lastActivity: string;
}
