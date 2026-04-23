/**
 * AI Flow Types (OpenAI-based)
 */

import { z } from 'zod';

// Coaching Chat
export const CoachingChatInputSchema = z.object({
    courseId: z.string(),
    lessonId: z.string().optional(),
    message: z.string(),
    conversationHistory: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
    })),
    wellnessContext: z.string().optional(),
});

export const CoachingChatOutputSchema = z.object({
    response: z.string(),
    relatedLessons: z.array(z.object({
        courseId: z.string(),
        lessonId: z.string(),
        title: z.string(),
        relevance: z.string(),
    })).optional(),
});

export type CoachingChatInput = z.infer<typeof CoachingChatInputSchema>;
export type CoachingChatOutput = z.infer<typeof CoachingChatOutputSchema>;
