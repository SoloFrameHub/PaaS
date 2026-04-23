import { NextRequest } from 'next/server';
import { onboardingService } from '@/lib/services/onboardingService';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { completeAssessmentSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const { categoryAnswers, businessContext, discAnswers } = await validateBody(request, completeAssessmentSchema);

    const category = onboardingService.calculateFounderCategory(categoryAnswers);
    const disc = onboardingService.calculateDiscProfile(discAnswers);

    await profileService.updateProfile(userId, {
        'questionnaire.founder_description': category.category_id,
        'questionnaire.founder_confidence': category.confidence,
        'questionnaire.disc_primary': disc.primary,
        'questionnaire.disc_secondary': disc.secondary,
        industry: businessContext.industry,
        stage: businessContext.company_stage,
        targetAudience: businessContext.target_customer_type,
        'questionnaire.target_roles': businessContext.target_roles,
        onboardingCompleted: true,
        onboardingCompletedAt: new Date().toISOString()
    });

    return successResponse({ success: true });
});
