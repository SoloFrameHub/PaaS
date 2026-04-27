import { NextRequest } from 'next/server';
import { flarumClient } from '@/lib/flarum';
import { withAuth } from '@/lib/api/with-auth';
import { withModeration } from '@/lib/api/with-moderation';
import { successResponse, errorResponse, validateBody } from '@/lib/api/response-utils';
import { createDiscussionSchema } from '@/lib/validations/forum';

/**
 * GET /api/forum/discussions — public, lists discussions with optional filters.
 */
// Pagination caps — without these, `?limit=100000` hits Flarum directly.
// (slice 01 fix.)
const MAX_PAGE = 200;
const MAX_LIMIT = 100;

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const rawSort = params.get('sort');
    const sort: 'popular' | 'newest' | 'oldest' | 'top' =
      rawSort === 'newest' || rawSort === 'oldest' || rawSort === 'top' ? rawSort : 'popular';
    const page = Math.max(1, Math.min(Number(params.get('page')) || 1, MAX_PAGE));
    const limit = Math.max(1, Math.min(Number(params.get('limit')) || 20, MAX_LIMIT));
    const result = await flarumClient.listDiscussions({
      sort,
      tagSlug: params.get('tag') || undefined,
      page,
      limit,
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
