import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { communityService } from '@/lib/services/communityService';
import { nodebbUserService } from '@/lib/services/nodebbUserService';

// POST: Vote on a post (upvote / downvote / unvote)
export const POST = withAuth(async (request: NextRequest, { userId, email }, context) => {
    const { topicId } = await context.params;
    const body = await request.json();
    const { pid } = body;
    const delta = Number(body.delta);

    if (!pid || typeof pid !== 'number' || !Number.isInteger(pid)) throw new Error('Post ID must be an integer');
    if (![1, -1, 0].includes(delta)) throw new Error('delta must be 1, -1, or 0');

    const username = email.split('@')[0] || userId.slice(0, 8);
    const nodebbUid = await nodebbUserService.getOrCreateNodebbUid(
        userId,
        username,
        email
    );

    if (delta === 1) {
        await communityService.upvotePost(nodebbUid, pid);
    } else if (delta === -1) {
        await communityService.downvotePost(nodebbUid, pid);
    } else {
        await communityService.unvotePost(nodebbUid, pid);
    }

    return successResponse({ success: true });
});
