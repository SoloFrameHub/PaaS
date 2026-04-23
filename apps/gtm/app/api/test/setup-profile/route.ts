import { NextRequest, NextResponse } from 'next/server';
import { profileRepository } from '@/lib/repositories/profileRepository';
import { hasDatabase } from '@/lib/db';
import { FounderProfile } from '@/types/profile';
import { logger } from '@/lib/logger';

/**
 * Test Setup API - Only available in test/development mode
 * Allows E2E tests to pre-populate profiles (works with both mock and Postgres repos)
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

        // Ensure a user row exists in the DB so profile FK constraints are satisfied
        if (hasDatabase()) {
            const { getDb, schema } = await import('@/lib/db');
            const db = getDb();
            if (db) {
                await db.insert(schema.user).values({
                    id: profile.userId,
                    email: profile.email || `${profile.userId}@test.local`,
                    hashedPassword: 'mock-not-used',
                    emailVerified: true,
                }).onConflictDoNothing();
            }
        }

        // Save the profile to the repository (Postgres if available, else mock)
        await profileRepository.save(profile.userId, profile);

        return NextResponse.json({
            success: true,
            userId: profile.userId,
            message: 'Test profile created successfully',
        });
    } catch (error) {
        logger.error('Failed to setup test profile', { error });
        return NextResponse.json(
            { error: 'Failed to create test profile' },
            { status: 500 }
        );
    }
}
