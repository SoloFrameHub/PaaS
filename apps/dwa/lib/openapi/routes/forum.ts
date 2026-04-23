import { z } from 'zod';
import { registry } from '../registry';
import { createDiscussionSchema, createPostSchema } from '@/lib/validations/forum';

const tags = ['Forum'];

export function registerForumRoutes() {
  registry.registerPath({
    method: 'get',
    path: '/api/forum/discussions',
    summary: 'List discussions with optional filters',
    tags,
    request: {
      query: z.object({
        sort: z.enum(['popular', 'newest', 'oldest', 'top']).optional(),
        tag: z.string().optional(),
        page: z.string().optional(),
        limit: z.string().optional(),
        q: z.string().optional(),
      }),
    },
    responses: {
      200: { description: 'List of discussions' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/forum/discussions',
    summary: 'Create a new discussion (moderated)',
    description: 'Requires authentication. Content is AI-moderated before publishing.',
    tags,
    request: {
      body: { content: { 'application/json': { schema: createDiscussionSchema } } },
    },
    responses: {
      201: { description: 'Discussion created' },
      401: { description: 'Unauthorized' },
      422: { description: 'Content blocked by moderation' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/forum/posts',
    summary: 'Reply to a discussion (moderated)',
    description: 'Requires authentication. Content is AI-moderated before publishing.',
    tags,
    request: {
      body: { content: { 'application/json': { schema: createPostSchema } } },
    },
    responses: {
      201: { description: 'Post created' },
      401: { description: 'Unauthorized' },
      422: { description: 'Content blocked by moderation' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/forum/posts/{id}/like',
    summary: 'Like or unlike a post',
    tags,
    request: {
      params: z.object({ id: z.string() }),
    },
    responses: {
      200: { description: 'Like toggled' },
      401: { description: 'Unauthorized' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/forum/tags',
    summary: 'List available forum tags',
    tags,
    responses: {
      200: { description: 'List of tags' },
    },
  });
}
