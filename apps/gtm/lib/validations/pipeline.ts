import { z } from "zod";

export const createDealSchema = z.object({
  prospectName: z.string().min(1, "Prospect name is required"),
  prospectCompany: z.string().optional(),
  prospectEmail: z.string().email().optional().or(z.literal("")),
  prospectLinkedin: z.string().url().optional().or(z.literal("")),
  stage: z
    .enum(["lead", "contacted", "meeting", "proposal", "won", "lost"])
    .optional()
    .default("lead"),
  dealValue: z.number().int().min(0).optional(),
  currency: z.string().length(3).optional().default("USD"),
  probability: z.number().int().min(0).max(100).optional(),
  expectedCloseDate: z.string().datetime().optional(),
  lossReason: z.string().max(500).optional(),
  notes: z.string().max(2000).optional(),
});

export const updateDealSchema = createDealSchema.partial();

export const moveDealSchema = z.object({
  stage: z.enum(["lead", "contacted", "meeting", "proposal", "won", "lost"]),
  lossReason: z.string().max(500).optional(),
});

export const pipelineQuerySchema = z.object({
  stage: z
    .enum(["lead", "contacted", "meeting", "proposal", "won", "lost"])
    .optional(),
  limit: z.coerce.number().min(1).max(200).optional().default(100),
});
