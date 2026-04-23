import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { getDb } from '@/lib/db';
import { forumBookmark } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { AppError } from '@/lib/api/errors';

/**
 * GET /api/forum/bookmarks — return all bookmarked discussion IDs for the current user.
 */
export const GET = withAuth(async (_request, { userId }) => {
  const db = getDb();
  if (!db) throw new AppError('Database not available', 503);

  const rows = await db
    .select({ discussionId: forumBookmark.discussionId })
    .from(forumBookmark)
    .where(eq(forumBookmark.userId, userId));

  return successResponse({ ids: rows.map((r) => r.discussionId) });
});

/**
 * POST /api/forum/bookmarks — bookmark a discussion.
 * Body: { discussionId: string }
 */
export const POST = withAuth(async (request, { userId }) => {
  const db = getDb();
  if (!db) throw new AppError('Database not available', 503);

  const body = await request.json();
  const discussionId = body?.discussionId;
  if (!discussionId || typeof discussionId !== 'string') {
    throw new AppError('discussionId is required', 400);
  }

  await db
    .insert(forumBookmark)
    .values({ userId, discussionId })
    .onConflictDoNothing();

  return successResponse({ bookmarked: true });
});

/**
 * DELETE /api/forum/bookmarks — remove a bookmark.
 * Body: { discussionId: string }
 */
export const DELETE = withAuth(async (request, { userId }) => {
  const db = getDb();
  if (!db) throw new AppError('Database not available', 503);

  const body = await request.json();
  const discussionId = body?.discussionId;
  if (!discussionId || typeof discussionId !== 'string') {
    throw new AppError('discussionId is required', 400);
  }

  await db
    .delete(forumBookmark)
    .where(and(eq(forumBookmark.userId, userId), eq(forumBookmark.discussionId, discussionId)));

  return successResponse({ bookmarked: false });
});
