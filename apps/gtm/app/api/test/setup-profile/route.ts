import { NextRequest, NextResponse } from 'next/server';
import { profileRepository } from '@/lib/repositories/profileRepository';
import { hasDatabase } from '@/lib/db';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { FounderProfile } from '@/types/profile';
import { logger } from '@/lib/logger';

/**
 * Test Setup API - Only available in test/development mode
 * Allows E2E tests to pre-populate profiles (works with both mock and Postgres repos)
 *
 * The user being created here is brand new and not yet a tenant member,
 * so we resolve the tenant context with `requireMembership: false` — the
 * membership gate would otherwise reject a freshly-minted test user.
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
            const { schema } = await import('@/lib/db');
            const ctx = await requireTenantContext(request, {
                requireMembership: false,
            });
            await withTenantApp(ctx, async (tx) =>
                tx.insert(schema.user).values({
                    id: profile.userId,
                    email: profile.email || `${profile.userId}@test.local`,
                    hashedPassword: 'mock-not-used',
                    emailVerified: true,
                }).onConflictDoNothing(),
            );
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
