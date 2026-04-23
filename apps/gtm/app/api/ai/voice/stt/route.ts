import { NextRequest, NextResponse } from 'next/server';
import { voiceService } from '@/lib/services/voiceService';
import { logger } from '@/lib/logger';

import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';

import { withAuth } from '@/lib/api/with-auth';

// Authenticated STT Endpoint
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

        const formData = await req.formData();
        const file = formData.get('audio') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Audio file is required' },
                { status: 400 }
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
