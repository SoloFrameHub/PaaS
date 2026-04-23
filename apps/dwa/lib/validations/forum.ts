import { z } from 'zod';

export const createDiscussionSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10).max(10000),
  tagIds: z.array(z.string()).min(1).max(5),
});

export const createPostSchema = z.object({
  discussionId: z.string(),
  content: z.string().min(1).max(10000),
});
