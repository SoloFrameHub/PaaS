import { NextRequest } from 'next/server';
import { requireTenantContext } from '@platform/tenancy';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { withTenantApp } from '@/lib/db/with-tenant';
import { forumBookmark } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { AppError } from '@/lib/api/errors';

/**
 * GET /api/forum/bookmarks — return all bookmarked discussion IDs for the current user.
 */
export const GET = withAuth(async (request, { userId }) => {
  const ctx = await requireTenantContext(request, { userId });
  const rows = await withTenantApp(ctx, async (tx) =>
    tx
      .select({ discussionId: forumBookmark.discussionId })
      .from(forumBookmark)
      .where(eq(forumBookmark.userId, userId))
  );

  return successResponse({ ids: rows.map((r) => r.discussionId) });
});

/**
 * POST /api/forum/bookmarks — bookmark a discussion.
 * Body: { discussionId: string }
 */
export const POST = withAuth(async (request, { userId }) => {
  const ctx = await requireTenantContext(request, { userId });

  const body = await request.json();
  const discussionId = body?.discussionId;
  if (!discussionId || typeof discussionId !== 'string') {
    throw new AppError('discussionId is required', 400);
  }

  await withTenantApp(ctx, async (tx) =>
    tx
      .insert(forumBookmark)
      .values({ userId, discussionId })
      .onConflictDoNothing()
  );

  return successResponse({ bookmarked: true });
});

/**
 * DELETE /api/forum/bookmarks — remove a bookmark.
 * Body: { discussionId: string }
 */
export const DELETE = withAuth(async (request, { userId }) => {
  const ctx = await requireTenantContext(request, { userId });

  const body = await request.json();
  const discussionId = body?.discussionId;
  if (!discussionId || typeof discussionId !== 'string') {
    throw new AppError('discussionId is required', 400);
  }

  await withTenantApp(ctx, async (tx) =>
    tx
      .delete(forumBookmark)
      .where(and(eq(forumBookmark.userId, userId), eq(forumBookmark.discussionId, discussionId)))
  );

  return successResponse({ bookmarked: false });
});
