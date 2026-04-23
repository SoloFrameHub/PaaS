import { NextRequest } from 'next/server';
import { flarumClient } from '@/lib/flarum';
import { successResponse, errorResponse } from '@/lib/api/response-utils';

/**
 * GET /api/forum/discussions/[id] — public, fetches a single discussion with posts.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const result = await flarumClient.getDiscussion(id);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
