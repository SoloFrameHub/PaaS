import { z } from 'zod';

export const chatSchema = z.object({
    message: z.string().min(1, "Message is required").max(4000),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string()
    })).max(20).optional().default([]),
    context: z.object({
        courseId: z.string().optional(),
        lessonId: z.string().optional(),
        sectionId: z.string().optional(),
        pageContext: z.string().optional(),
    }).optional(),
});

export const icpValidationSchema = z.object({
    industry: z.string().min(1, "Industry is required"),
    companySize: z.string().min(1, "Company size is required"),
    jobTitles: z.string().min(1, "Job titles are required"),
    painPoints: z.string().min(1, "Pain points are required"),
});

export const evaluateRoleplaySchema = z.object({
    industryId: z.string(),
    roleId: z.string(),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string()
    })),
});

export const roleplayChatSchema = z.object({
    industryId: z.string(),
    roleId: z.string(),
    message: z.string().min(1),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string()
    })).optional().default([]),
});
