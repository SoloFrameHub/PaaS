import { NextRequest } from 'next/server';
import { flarumClient } from '@/lib/flarum';
import { withAuth } from '@/lib/api/with-auth';
import { withModeration } from '@/lib/api/with-moderation';
import { successResponse, errorResponse, validateBody } from '@/lib/api/response-utils';
import { createDiscussionSchema } from '@/lib/validations/forum';

/**
 * GET /api/forum/discussions — public, lists discussions with optional filters.
 */
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const result = await flarumClient.listDiscussions({
      sort: (params.get('sort') as 'popular' | 'newest' | 'oldest' | 'top') || 'popular',
      tagSlug: params.get('tag') || undefined,
      page: Number(params.get('page')) || 1,
      limit: Number(params.get('limit')) || 20,
      q: params.get('q') || undefined,
    });
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

/**
 * POST /api/forum/discussions — authenticated + AI moderated, creates a new discussion.
 */
export const POST = withAuth(
  withModeration(
    {
      contentType: 'discussion',
      extractText: (body) => `${body.title ?? ''}\n\n${body.content ?? ''}`,
    },
    async (request: NextRequest, { userId, email }) => {
      const body = await validateBody(request, createDiscussionSchema);
      const username = email.split('@')[0];
      const userToken = await flarumClient.getOrCreateUserToken(userId, email, username);
      const discussion = await flarumClient.createDiscussion(body, userToken);
      return successResponse(discussion, 201);
    },
  ),
);
