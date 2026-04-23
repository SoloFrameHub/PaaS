import { getDb, hasDatabase, schema } from '@/lib/db';
import { eq, desc } from 'drizzle-orm';
import { profileCoreService } from './profileCoreService';
import { logger } from '@/lib/logger';

export class StreakService {
    /**
     * Get the calendar date string (YYYY-MM-DD) for a timestamp in the given timezone.
     * Falls back to UTC if the timezone is invalid.
     */
    private getLocalDate(date: Date, timezone?: string): string {
        if (!timezone) {
            return date.toISOString().split('T')[0];
        }
        try {
            // en-CA locale produces YYYY-MM-DD format
            return date.toLocaleDateString('en-CA', { timeZone: timezone });
        } catch {
            return date.toISOString().split('T')[0];
        }
    }

    /**
     * Calculate the user's current learning streak from lessonEvent timestamps.
     * A streak is consecutive calendar days with at least one lesson event.
     * Uses the user's timezone (if provided) to determine calendar boundaries.
     * Returns the new streak value and whether a streak milestone was hit.
     */
    async calculateStreak(userId: string, timezone?: string): Promise<{ currentStreak: number; longestStreak: number; milestone: number | null }> {
        if (!hasDatabase()) {
            return { currentStreak: 0, longestStreak: 0, milestone: null };
        }

        const db = getDb();
        if (!db) {
            return { currentStreak: 0, longestStreak: 0, milestone: null };
        }

        try {
            // Get all lesson events for this user, ordered by date desc
            const events = await db.select({ createdAt: schema.lessonEvent.createdAt })
                .from(schema.lessonEvent)
                .where(eq(schema.lessonEvent.userId, userId))
                .orderBy(desc(schema.lessonEvent.createdAt));

            if (events.length === 0) {
                return { currentStreak: 0, longestStreak: 0, milestone: null };
            }

            // Extract unique calendar dates in the user's timezone
            const uniqueDates = new Set<string>();
            for (const event of events) {
                const date = new Date(event.createdAt);
                uniqueDates.add(this.getLocalDate(date, timezone));
            }

            const sortedDates = Array.from(uniqueDates).sort().reverse(); // most recent first

            // Check if streak includes today or yesterday (allow 1-day grace)
            const today = this.getLocalDate(new Date(), timezone);
            const yesterday = this.getLocalDate(new Date(Date.now() - 86400000), timezone);

            if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
                // Streak is broken — last activity was more than a day ago
                // Preserve longestStreak from profile (it should never decrease)
                const profile = await profileCoreService.getProfile(userId);
                const previousLongest = profile?.progress?.longestStreak || 0;
                await this.updateProfileStreak(userId, 0, previousLongest);
                return { currentStreak: 0, longestStreak: previousLongest, milestone: null };
            }

            // Count consecutive days walking backwards from most recent
            let currentStreak = 1;
            for (let i = 1; i < sortedDates.length; i++) {
                const prevDate = new Date(sortedDates[i - 1]);
                const thisDate = new Date(sortedDates[i]);
                const diffMs = prevDate.getTime() - thisDate.getTime();
                const diffDays = Math.floor(diffMs / 86400000);

                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    break; // streak broken
                }
            }

            // Get previous longest streak from profile
            const profile = await profileCoreService.getProfile(userId);
            const previousLongest = profile?.progress?.longestStreak || 0;
            const previousStreak = profile?.progress?.currentStreak || 0;
            const longestStreak = Math.max(previousLongest, currentStreak);

            // Detect streak milestones
            const STREAK_MILESTONES = [3, 7, 14, 30];
            let milestone: number | null = null;
            for (const ms of STREAK_MILESTONES) {
                if (currentStreak >= ms && previousStreak < ms) {
                    milestone = ms;
                }
            }

            await this.updateProfileStreak(userId, currentStreak, longestStreak);

            return { currentStreak, longestStreak, milestone };
        } catch (err) {
            logger.error('Failed to calculate streak', { err, userId });
            return { currentStreak: 0, longestStreak: 0, milestone: null };
        }
    }

    private async updateProfileStreak(userId: string, currentStreak: number, longestStreak?: number): Promise<void> {
        const updates: Record<string, unknown> = {
            'progress.currentStreak': currentStreak,
            'progress.streakUpdatedAt': new Date().toISOString(),
        };

        if (longestStreak !== undefined) {
            updates['progress.longestStreak'] = longestStreak;
        }

        try {
            const { profileRepository } = await import('@/lib/repositories/profileRepository');
            await profileRepository.update(userId, updates);
        } catch (err) {
            logger.error('Failed to update profile streak', { err, userId });
        }
    }
}

export const streakService = new StreakService();
