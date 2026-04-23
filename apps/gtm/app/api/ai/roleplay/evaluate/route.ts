import { NextRequest, NextResponse } from 'next/server';
import { openaiRoleplayEval } from '@/lib/ai/openai-flows';
import { buildRoleplayContext, saveRoleplaySession } from '@/lib/services/roleplayService.server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { evaluateRoleplaySchema } from '@/lib/validations/ai';
import { isRateLimited, GENERAL_RATE_LIMIT } from '@/lib/security';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const { limited, reset } = await isRateLimited(userId, GENERAL_RATE_LIMIT, 'ai_eval');

  if (limited) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: { 'X-RateLimit-Reset': reset.toString() } }
    );
  }

  const { industryId, roleId, history, locale, countryCode } = await validateBody(request, evaluateRoleplaySchema);
  const validHistory = history;

  const context = await buildRoleplayContext(userId, industryId, roleId, locale, countryCode);

  const evaluation = await openaiRoleplayEval(context, validHistory);

  // Extract DISC type from roleId or fall back to context
  const validDiscTypes = ['D', 'I', 'S', 'C'];
  const extractedDisc = roleId.split('_high_')[1]?.toUpperCase();
  const discType = (extractedDisc && validDiscTypes.includes(extractedDisc))
      ? extractedDisc
      : context.discPattern?.disc_type || 'C';

  await saveRoleplaySession(userId, {
    industryId,
    roleId,
    discType,
    transcript: validHistory,
    evaluation: {
      score: evaluation.score,
      strengths: evaluation.strengths,
      improvements: evaluation.improvements,
      coachingMessage: evaluation.coachingMessage,
    },
  });

  return successResponse({ evaluation });
});
