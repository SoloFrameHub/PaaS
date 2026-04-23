import { z } from 'zod';

export const completeLessonSchema = z.object({
    courseId: z.string().optional(),
    courseNumber: z.number().optional(),
    lessonId: z.string().min(1, "Lesson ID is required"),
    xpEarned: z.number().optional().default(10),
    isLastLesson: z.boolean().optional().default(false),
    timezone: z.string().optional(),
});

export const quizSubmissionSchema = z.object({
    answers: z.record(z.string(), z.string()),
});

export const saveArtifactSchema = z.object({
    artifactType: z.string().min(1, "Artifact type is required"),
    sectionId: z.string().min(1, "Section ID is required"),
    courseNumber: z.number(),
    data: z.record(z.string(), z.unknown()),
});

export const lessonFeedbackSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    lessonId: z.string().min(1, "Lesson ID is required"),
    sentiment: z.enum(['positive', 'negative']),
    category: z.string().optional(),
    comment: z.string().max(1000).optional(),
});
