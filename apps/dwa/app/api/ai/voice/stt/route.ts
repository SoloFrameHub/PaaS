import { NextRequest, NextResponse } from 'next/server';
import { voiceService } from '@/lib/services/voiceService';
import { logger } from '@/lib/logger';

import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';

import { withAuth } from '@/lib/api/with-auth';

// Authenticated STT Endpoint
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

        const formData = await req.formData();
        const file = formData.get('audio');

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: 'Audio file is required' },
                { status: 400 }
            );
        }

        // Size + MIME guards — prevent oversized/wrong-type uploads hitting
        // the transcription vendor and running up cost / leaking non-audio
        // data into STT logs. (slice 01 fix.)
        const MAX_BYTES = 25 * 1024 * 1024; // 25 MB
        if (file.size > MAX_BYTES) {
            return NextResponse.json(
                { error: `Audio file too large (max ${MAX_BYTES} bytes)` },
                { status: 413 }
            );
        }
        if (file.type && !file.type.startsWith('audio/')) {
            return NextResponse.json(
                { error: 'Unsupported audio MIME type' },
                { status: 415 }
            );
        }

        // Convert Request File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const transcript = await voiceService.transcribeAudio(buffer);

        if (!transcript) {
            // It might be empty if no speech detected, but not necessarily an error
            return NextResponse.json({ text: '' });
        }

        return NextResponse.json({ text: transcript });

    } catch (error) {
        logger.error('API STT Error:', { error });
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
});
