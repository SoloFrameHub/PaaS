import { z } from 'zod';

export const completeLessonSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    lessonId: z.string().min(1, "Lesson ID is required"),
    xpEarned: z.number().optional().default(10),
    isLastLesson: z.boolean().optional().default(false),
});

export const quizSubmissionSchema = z.object({
    answers: z.record(z.string(), z.string()),
});

export const lessonFeedbackSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    lessonId: z.string().min(1, "Lesson ID is required"),
    rating: z.number().int().min(1).max(5),
    category: z.enum([
        // Positive
        'helpful_content',
        'good_examples',
        'valuable_exercises',
        'easy_to_follow',
        // Negative / improvement
        'confusing',
        'level_mismatch',
        'needs_better_examples',
        'technical_issue',
        'missing_content',
        'too_long',
        'suggestion',
        // Legacy + generic
        'content',
        'technical',
        'other',
    ]),
    message: z.string().min(1, "Feedback message is required").max(2000),
});
