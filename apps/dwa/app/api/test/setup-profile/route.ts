import { NextRequest, NextResponse } from 'next/server';
import { profileRepository } from '@/lib/repositories/profileRepository';
import type { WellnessProfile } from '@/types/wellness-profile';

/**
 * Test Setup API — Only available in mock-auth / non-production mode.
 * Allows E2E tests to pre-populate mock profiles.
 */
export async function POST(request: NextRequest) {
    // Block this endpoint when a real database is configured (real deployment).
    // NODE_ENV alone is unreliable because `next start` always sets it to 'production'.
    if (process.env.NEXT_PUBLIC_MOCK_AUTH !== 'true' || process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: 'Test API only available in mock auth mode' },
            { status: 403 },
        );
    }

    try {
        const { profile } = (await request.json()) as { profile: WellnessProfile };

        if (!profile || !profile.userId) {
            return NextResponse.json({ error: 'Invalid profile data' }, { status: 400 });
        }

        await profileRepository.save(profile.userId, profile);

        return NextResponse.json({
            success: true,
            userId: profile.userId,
        });
    } catch (error) {
        console.error('Failed to setup test profile:', error);
        return NextResponse.json({ error: 'Failed to create mock profile' }, { status: 500 });
    }
}
