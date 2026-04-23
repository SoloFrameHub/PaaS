import { NextRequest } from 'next/server';
import { flarumClient } from '@/lib/flarum';
import { withAuth } from '@/lib/api/with-auth';
import { withModeration } from '@/lib/api/with-moderation';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { createPostSchema } from '@/lib/validations/forum';

/**
 * POST /api/forum/posts — authenticated + AI moderated, creates a reply.
 */
export const POST = withAuth(
  withModeration(
    {
      contentType: 'post',
      extractText: (body) => String(body.content ?? ''),
    },
    async (request: NextRequest, { userId, email }) => {
      const body = await validateBody(request, createPostSchema);
      const username = email.split('@')[0];
      const userToken = await flarumClient.getOrCreateUserToken(userId, email, username);
      const post = await flarumClient.createPost(body, userToken);
      return successResponse(post, 201);
    },
  ),
);
