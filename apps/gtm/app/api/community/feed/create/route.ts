import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { communityService } from '@/lib/services/communityService';
import { nodebbUserService } from '@/lib/services/nodebbUserService';

// POST: Create a new topic
export const POST = withAuth(async (request: NextRequest, { userId, email }) => {
    const body = await request.json();
    const { cid, title, content } = body;

    if (typeof cid !== 'number' || !title?.trim() || !content?.trim()) {
        throw new Error('Category ID (number), title, and content are required');
    }

    const username = email.split('@')[0] || userId.slice(0, 8);
    const nodebbUid = await nodebbUserService.getOrCreateNodebbUid(
        userId,
        username,
        email
    );

    const result = await communityService.createTopic(nodebbUid, cid, title.trim(), content.trim());
    return successResponse(result);
});
