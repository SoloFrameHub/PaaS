import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { communityService } from '@/lib/services/communityService';

// GET: All forum categories
export const GET = withAuth(async () => {
    const categories = await communityService.getCategories();
    return successResponse(categories);
});
