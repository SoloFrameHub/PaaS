import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { communityService } from '@/lib/services/communityService';

export const GET = withAuth(async (request: NextRequest) => {
    const page = Number(request.nextUrl.searchParams.get('page') || '0');
    const sort = request.nextUrl.searchParams.get('sort') || 'newest';
    const cid = request.nextUrl.searchParams.get('cid');

    // Filter by category
    if (cid) {
        const result = await communityService.getCategoryTopics(Number(cid), page);
        return successResponse({ posts: result.topics, hasMore: result.hasMore });
    }

    // Sort by popularity
    if (sort === 'popular') {
        const result = await communityService.getPopularTopics(page);
        return successResponse(result);
    }

    // Default: newest (chronological)
    const result = await communityService.getRecentTopics(page);
    return successResponse(result);
});
