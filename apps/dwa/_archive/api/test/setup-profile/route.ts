import { NextRequest, NextResponse } from 'next/server';
import { profileRepository } from '@/lib/repositories/profileRepository';
import { FounderProfile } from '@/types/profile';

/**
 * Test Setup API - Only available in test/development mode
 * Allows E2E tests to pre-populate mock profiles
 */
export async function POST(request: NextRequest) {
    // Only allow in test mode with mock auth
    if (process.env.NEXT_PUBLIC_MOCK_AUTH !== 'true' || process.env.NODE_ENV === 'production') {
        return NextResponse.json(
            { error: 'Test API only available in mock auth mode' },
            { status: 403 }
        );
    }

    try {
        const { profile } = await request.json() as { profile: FounderProfile };

        if (!profile || !profile.userId) {
            return NextResponse.json(
                { error: 'Invalid profile data' },
                { status: 400 }
            );
        }

        // Save the profile to the mock repository
        await profileRepository.save(profile.userId, profile);

        return NextResponse.json({
            success: true,
            userId: profile.userId,
            message: 'Mock profile created successfully',
        });
    } catch (error) {
        console.error('Failed to setup test profile:', error);
        return NextResponse.json(
            { error: 'Failed to create mock profile' },
            { status: 500 }
        );
    }
}
