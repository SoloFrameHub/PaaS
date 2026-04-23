import { NextRequest, NextResponse } from 'next/server';
import { voiceService } from '@/lib/services/voiceService';
import { logger } from '@/lib/logger';
import { withAuth } from '@/lib/api/with-auth';
import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';

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

        const body = await req.json();
        const { text } = body;

        if (!text) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        const audioContent = await voiceService.synthesizeSpeech(text);

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
