import { NextRequest, NextResponse } from 'next/server';
import { openaiRoleplayReply } from '@/lib/ai/openai-flows';
import { buildRoleplayContext } from '@/lib/services/roleplayService.server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { roleplayChatSchema } from '@/lib/validations/ai';
import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const { limited, reset } = await isRateLimited(userId, AI_RATE_LIMIT, 'ai_chat');

  if (limited) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: { 'X-RateLimit-Reset': reset.toString() } }
    );
  }

  const { industryId, roleId, message, history = [], locale, countryCode } = await validateBody(request, roleplayChatSchema);

  const context = await buildRoleplayContext(userId, industryId, roleId, locale, countryCode);

  const aiMessage = await openaiRoleplayReply(context, history, message);

  return successResponse({ message: aiMessage });
});
