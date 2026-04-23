import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { activityFeedService } from '@/lib/services/activityFeedService';

// GET: Unified activity feed (platform events + community posts)
export const GET = withAuth(async () => {
    const feed = await activityFeedService.getActivityFeed(30);
    return successResponse(feed);
});
