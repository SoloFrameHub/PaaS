import { NextRequest } from 'next/server';
import { flarumClient } from '@/lib/flarum';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';

/**
 * POST /api/forum/posts/[id]/like — authenticated, upvote a post.
 */
export const POST = withAuth(async (
  request: NextRequest,
  { userId, email },
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params;
  const username = email.split('@')[0];
  const userToken = await flarumClient.getOrCreateUserToken(userId, email, username);
  await flarumClient.likePost(id, userToken);
  return successResponse({ liked: true });
});

/**
 * DELETE /api/forum/posts/[id]/like — authenticated, remove upvote.
 */
export const DELETE = withAuth(async (
  request: NextRequest,
  { userId, email },
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params;
  const username = email.split('@')[0];
  const userToken = await flarumClient.getOrCreateUserToken(userId, email, username);
  await flarumClient.unlikePost(id, userToken);
  return successResponse({ liked: false });
});
