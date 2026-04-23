import { NextRequest } from 'next/server';
import { onboardingService } from '@/lib/services/onboardingService';
import { successResponse } from '@/lib/api/response-utils';
import { withAuth } from '@/lib/api/with-auth';

export const GET = withAuth(async () => {
    const industries = await onboardingService.getIndustries();
    return successResponse(industries);
});
