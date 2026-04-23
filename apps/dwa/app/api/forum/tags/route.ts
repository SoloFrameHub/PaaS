import { flarumClient } from '@/lib/flarum';
import { successResponse, errorResponse } from '@/lib/api/response-utils';

/**
 * GET /api/forum/tags — public, lists all forum categories/tags.
 */
export async function GET() {
  try {
    const tags = await flarumClient.getTags();
    return successResponse(tags);
  } catch (error) {
    return errorResponse(error);
  }
}
