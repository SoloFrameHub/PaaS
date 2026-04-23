import { NextRequest, NextResponse } from 'next/server';
import { voiceService } from '@/lib/services/voiceService';
import { logger } from '@/lib/logger';

import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';
import { withAuth } from '@/lib/api/with-auth';

export const POST = withAuth(async (req: NextRequest, { userId }) => {
    try {
        const { limited, reset } = await isRateLimited(userId, AI_RATE_LIMIT, 'ai_voice');

        if (limited) {
            return NextResponse.json(
                { error: 'Rate limit exceeded' },
                {
                    status: 429,
                    headers: { 'X-RateLimit-Reset': reset.toString() }
                }
            );
        }

        const body = await req.json();
        const { text } = body;

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        // Cap text length to prevent abuse (voice API cost scales with length)
        const MAX_TTS_CHARS = 2000;
        if (text.length > MAX_TTS_CHARS) {
            return NextResponse.json(
                { error: `Text too long (max ${MAX_TTS_CHARS} characters)` },
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
