import { NextRequest, NextResponse } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { openaiIcpValidation } from '@/lib/ai/openai-flows';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { icpValidationSchema } from '@/lib/validations/ai';
import { logger } from '@/lib/logger';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const data = await validateBody(request, icpValidationSchema);
  const profile = await profileService.getProfile(userId);

  const businessContext = [
    profile?.businessName && `Company: ${profile.businessName}`,
    profile?.websiteUrl && `Website: ${profile.websiteUrl}`,
    profile?.biggestChallenge && `Problem: ${profile.biggestChallenge}`,
    profile?.targetAudience && `High-level Audience: ${profile.targetAudience}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const validation = await openaiIcpValidation({
      ...data,
      businessContext: businessContext || undefined,
    });
    return successResponse(validation);
  } catch (error) {
    logger.error('ICP Validation AI Error', {
      error: error instanceof Error ? error.message : String(error),
      userId,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    });
    return NextResponse.json(
      { error: 'AI service temporarily unavailable. Please try again.' },
      { status: 503 }
    );
  }
});
