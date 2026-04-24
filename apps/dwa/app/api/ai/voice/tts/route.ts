import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { voiceService } from '@/lib/services/voiceService';
import { logger } from '@/lib/logger';
import { withAuth } from '@/lib/api/with-auth';
import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';

const ttsSchema = z.object({
    text: z.string().min(1).max(5000),
});

export const POST = withAuth(async (req: NextRequest, { userId }) => {
    try {
        const { limited, remaining, reset } = await isRateLimited(userId, AI_RATE_LIMIT, 'ai');

        if (limited) {
            return NextResponse.json(
                { error: 'Rate limit exceeded' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
                        'X-RateLimit-Limit': String(AI_RATE_LIMIT.limit),
                        'X-RateLimit-Remaining': String(remaining),
                        'X-RateLimit-Reset': String(reset),
                    },
                }
            );
        }

        const body = await req.json().catch(() => null);
        const parsed = ttsSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'text must be 1-5000 characters', details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const audioContent = await voiceService.synthesizeSpeech(parsed.data.text);

        if (!audioContent) {
            return NextResponse.json(
                { error: 'Failed to synthesize speech' },
                { status: 500 }
            );
        }

        // Return audio as a downloadable file or stream
        return new NextResponse(Buffer.from(audioContent), {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioContent.length.toString(),
            },
        });

    } catch (error) {
        logger.error('API TTS Error:', { error });
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
});
