import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { inYourWordsSchema } from '@/lib/validations/onboarding';
import { maia } from '@/lib/ai/maia-client';
import { getDb } from '@/lib/db';
import { distressEvent } from '@/lib/db/schema';
import { logger } from '@/lib/logger';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const body = await request.json();
    const result = inYourWordsSchema.safeParse(body);
    if (!result.success) {
        return errorResponse(result.error);
    }

    await profileService.saveInYourWords(userId, {
        goodDayDescription: result.data.goodDayDescription,
        biggestChallenge: result.data.biggestChallenge,
        hopedSupportDescription: result.data.hopedSupportDescription,
        personalPatterns: result.data.personalPatterns,
        anythingElse: result.data.anythingElse,
    });

    // Fire-and-forget distress classification on combined free-text fields (Finding 2)
    const fields = [
        result.data.goodDayDescription,
        result.data.biggestChallenge,
        result.data.hopedSupportDescription,
        result.data.personalPatterns,
        result.data.anythingElse,
    ].filter(Boolean);

    const combinedText = fields.join('\n\n');
    if (combinedText.length > 20) {
        maia.distress(combinedText)
            .then((distressResult) => {
                if (distressResult.level !== 'none') {
                    const db = getDb();
                    if (db) {
                        db.insert(distressEvent)
                            .values({
                                userId,
                                level: distressResult.level,
                                confidence: distressResult.confidence,
                                context: 'onboarding',
                                providerAlerted: false,
                            })
                            .execute()
                            .catch((err) =>
                                logger.error('distress_event_insert_error', {
                                    context: 'onboarding',
                                    error: err,
                                })
                            );
                    }
                }
            })
            .catch((err) =>
                logger.error('maia_distress_error', { context: 'onboarding', error: err })
            );
    }

    return successResponse({ success: true });
});
