import { z } from "zod";

export const createOutreachSchema = z.object({
  prospectName: z.string().min(1, "Prospect name is required"),
  prospectCompany: z.string().optional(),
  channel: z.enum([
    "email",
    "linkedin",
    "phone",
    "twitter",
    "whatsapp",
    "event",
    "other",
  ]),
  action: z.enum([
    "initial_outreach",
    "follow_up",
    "meeting_booked",
    "meeting_held",
    "proposal_sent",
    "other",
  ]),
  notes: z.string().max(2000).optional(),
  outcome: z.enum(["positive", "neutral", "negative"]).optional(),
  dealId: z.string().optional(),
  loggedAt: z.string().datetime().optional(),
});

export const updateOutreachSchema = createOutreachSchema.partial();

export const outreachQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  channel: z
    .enum(["email", "linkedin", "phone", "twitter", "event", "other"])
    .optional(),
  limit: z.coerce.number().min(1).max(100).optional().default(50),
});
