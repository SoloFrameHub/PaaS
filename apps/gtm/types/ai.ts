/**
 * AI Flow Types (OpenAI-based)
 */

import { z } from 'zod';

// Website Analyzer
export const WebsiteAnalysisInputSchema = z.object({
    url: z.string().url(),
    businessModel: z.enum(['b2b-saas', 'creator-coach', 'service', 'marketplace', 'other']),
    stage: z.enum(['idea', 'pre-launch', '0-10k', '10k-100k', 'scaling']),
});

export const WebsiteAnalysisOutputSchema = z.object({
    icpSummary: z.string().nullable(),
    valueProposition: z.string().nullable(),
    competitivePositioning: z.string().nullable(),
    pricingStructure: z.string().nullable(),
    industryVertical: z.string().nullable(),
    commonObjections: z.array(z.string()),
    typicalUseCases: z.array(z.string()),
    competitorMentions: z.array(z.string()),
    confidence: z.object({
        icpClarity: z.number().min(0).max(100),
        positioningStrength: z.number().min(0).max(100),
        messagingConsistency: z.number().min(0).max(100),
        valueArticulation: z.number().min(0).max(100),
    }),
});

export type WebsiteAnalysisInput = z.infer<typeof WebsiteAnalysisInputSchema>;
export type WebsiteAnalysisOutput = z.infer<typeof WebsiteAnalysisOutputSchema>;

// Sales Roleplay
export const RoleplayInputSchema = z.object({
    personaId: z.string(),
    scenario: z.string(),
    conversationHistory: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
    })),
    userMessage: z.string(),
    founderContext: z.string().optional(),
});

export const RoleplayOutputSchema = z.object({
    response: z.string(),
    coaching: z.object({
        feedback: z.string(),
        score: z.number().min(0).max(100),
        suggestions: z.array(z.string()),
    }).optional(),
    shouldEndConversation: z.boolean(),
});

export type RoleplayInput = z.infer<typeof RoleplayInputSchema>;
export type RoleplayOutput = z.infer<typeof RoleplayOutputSchema>;

// Coaching Chat
export const CoachingChatInputSchema = z.object({
    courseId: z.string(),
    lessonId: z.string().optional(),
    message: z.string(),
    conversationHistory: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
    })),
    founderContext: z.string().optional(),
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
