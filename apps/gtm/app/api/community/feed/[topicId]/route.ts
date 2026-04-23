import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { communityService } from '@/lib/services/communityService';
import { nodebbUserService } from '@/lib/services/nodebbUserService';

// GET: Get topic detail with posts
export const GET = withAuth(async (request: NextRequest, { userId }, context) => {
    const { topicId } = await context.params;
    const tid = Number(topicId);
    if (isNaN(tid)) throw new Error('Invalid topic ID');

    const nodebbUid = await nodebbUserService.getNodebbUid(userId);
    if (!nodebbUid) throw new Error('NodeBB account not found for this user');
    const topic = await communityService.getTopic(tid, nodebbUid);
    return successResponse(topic);
});

// POST: Reply to a topic
export const POST = withAuth(async (request: NextRequest, { userId, email }, context) => {
    const { topicId } = await context.params;
    const tid = Number(topicId);
    if (isNaN(tid)) throw new Error('Invalid topic ID');

    const body = await request.json();
    const content = body.content?.trim();
    if (!content) throw new Error('Content is required');

    const username = email.split('@')[0] || userId.slice(0, 8);
    const nodebbUid = await nodebbUserService.getOrCreateNodebbUid(
        userId,
        username,
        email
    );

    const result = await communityService.replyToTopic(nodebbUid, tid, content);
    return successResponse(result);
});
