import { z } from 'zod';

export const entranceSurveySchema = z.object({
  businessContext: z.object({
    product: z.string().min(1),
    businessModel: z.enum(['b2b', 'b2c', 'hybrid']),
    dealSize: z.string().min(1),
    industry: z.string().min(1),
  }),
  learningGoals: z.object({
    curriculumStage: z.enum(['foundation', 'lead_gen', 'sales_conv']),
    painPoints: z.array(z.string()).min(1),
  }),
  discProfile: z.object({
    primary: z.enum(['D', 'I', 'S', 'C']),
    secondary: z.enum(['D', 'I', 'S', 'C']).nullable(),
  }),
  timeCommitment: z.enum(['5-10h', '10-15h', '15-20h', '20h+']),
});

export type EntranceSurveyData = z.infer<typeof entranceSurveySchema>;

export const createPodSchema = z.object({
  name: z.string().min(3).max(50),
  curriculumStage: z.enum(['foundation', 'lead_gen', 'sales_conv']),
  dealSizeTier: z.enum(['small', 'medium', 'enterprise']).optional(),
  maxMembers: z.number().min(3).max(8).default(6),
});

export type CreatePodData = z.infer<typeof createPodSchema>;

export const addMemberSchema = z.object({
  userId: z.string().min(1),
});

export const matchingTriggerSchema = z.object({
  userId: z.string().min(1),
});

export const facilitatorTriggerSchema = z.object({
  dayOfWeek: z.enum(['monday', 'wednesday', 'friday']),
});
