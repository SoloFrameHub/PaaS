import { z } from "zod";

export const chatSchema = z.object({
  message: z.string().min(1, "Message is required"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().max(10000),
      }),
    )
    .max(50)
    .optional()
    .default([]),
  context: z
    .object({
      courseId: z.string().optional(),
      lessonId: z.string().optional(),
      sectionId: z.string().optional(),
      currentTopic: z.string().optional(),
      lastVisitedCourseId: z.string().optional(),
      lastVisitedLessonId: z.string().optional(),
    })
    .optional(),
  sessionId: z.string().optional(),
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
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(10000),
      }),
    )
    .max(50),
  locale: z.enum(["en", "es"]).optional(),
  countryCode: z.string().max(2).optional(),
});

export const roleplayChatSchema = z.object({
  industryId: z.string(),
  roleId: z.string(),
  salesMethodology: z.string().optional(),
  message: z.string().min(1),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(10000),
      }),
    )
    .max(50)
    .optional()
    .default([]),
  locale: z.enum(["en", "es"]).optional(),
  countryCode: z.string().max(2).optional(),
});
