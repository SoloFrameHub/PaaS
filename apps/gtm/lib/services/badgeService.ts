import { BADGE_DEFINITIONS, type BadgeDefinition } from '@/lib/data/badges';
import { getLevel } from '@/lib/data/xp-levels';
import { profileCoreService } from './profileCoreService';
import { logger } from '@/lib/logger';
import type { BadgeEarned, FounderProfile, Progress } from '@/types/profile';

interface BadgeEvent {
    type: 'lesson_completed' | 'course_completed' | 'track_completed' | 'quiz_passed' |
        'roleplay_completed' | 'roleplay_scored' | 'artifact_saved' | 'community_post' |
        'community_upvotes' | 'streak_updated';
    data: Record<string, unknown>;
}

export class BadgeService {
    /**
     * Check all badge triggers against current profile state and event.
     * Returns newly earned badges (not previously earned).
     */
    async checkAllTriggers(userId: string, event: BadgeEvent): Promise<BadgeEarned[]> {
        try {
            const profile = await profileCoreService.getProfile(userId);
            if (!profile) return [];

            const progress = profile.progress;
            if (!progress) return [];
            const earnedIds = new Set((progress.badges || []).map(b => typeof b === 'string' ? b : b.id));
            const newBadges: BadgeEarned[] = [];

            for (const badge of BADGE_DEFINITIONS) {
                if (earnedIds.has(badge.id)) continue;

                if (this.isBadgeEarned(badge, progress, profile, event)) {
                    const earned: BadgeEarned = {
                        id: badge.id,
                        earnedAt: new Date().toISOString(),
                        courseId: event.data.courseNumber as number | undefined,
                    };
                    newBadges.push(earned);
                }
            }

            // Persist newly earned badges — re-read to narrow race window
            if (newBadges.length > 0) {
                const freshProfile = await profileCoreService.getProfile(userId);
                const latestBadges = freshProfile?.progress?.badges || [];
                const latestIds = new Set(latestBadges.map((b: BadgeEarned | string) => typeof b === 'string' ? b : b.id));
                const trulyNew = newBadges.filter(b => !latestIds.has(b.id));
                if (trulyNew.length > 0) {
                    // Deduplicate to guard against TOCTOU race (two concurrent requests awarding same badge)
                    const seen = new Set<string>();
                    const dedupedBadges = [...latestBadges, ...trulyNew].filter(b => {
                        const id = typeof b === 'string' ? b : b.id;
                        if (seen.has(id)) return false;
                        seen.add(id);
                        return true;
                    });
                    const { profileRepository } = await import('@/lib/repositories/profileRepository');
                    await profileRepository.update(userId, {
                        'progress.badges': dedupedBadges,
                    });
                    logger.info('Badges earned', { userId, badges: trulyNew.map(b => b.id) });
                }
                return trulyNew;
            }

            return newBadges;
        } catch (err) {
            logger.error('Failed to check badge triggers', { err, userId });
            return [];
        }
    }

    private isBadgeEarned(
        badge: BadgeDefinition,
        progress: Progress,
        profile: FounderProfile,
        event: BadgeEvent,
    ): boolean {
        const completedLessonCount = Object.values(progress.completedLessons || {})
            .reduce((sum, lessons) => sum + (Array.isArray(lessons) ? lessons.length : 0), 0);
        const completedCourseCount = (progress.completedCourses || []).length;
        const xp = progress.xpTotal || 0;
        const streak = progress.currentStreak || 0;

        switch (badge.id) {
            // ─── Milestone ───
            case 'first-lesson':
                return completedLessonCount >= 1;
            case 'course-complete-1':
                return completedCourseCount >= 1;
            case 'track-complete-1':
                return this.hasCompletedAnyTrack(progress);
            case 'halfway':
                return completedCourseCount >= 24;
            case 'academy-graduate':
                return completedCourseCount >= 48;

            // ─── Streak ───
            case 'streak-3':
                return streak >= 3;
            case 'streak-7':
                return streak >= 7;
            case 'streak-14':
                return streak >= 14;
            case 'streak-30':
                return streak >= 30;

            // ─── XP ───
            case 'xp-100':
                return xp >= 100;
            case 'xp-500':
                return xp >= 500;
            case 'xp-1000':
                return xp >= 1000;
            case 'xp-2500':
                return xp >= 2500;
            case 'xp-5000':
                return xp >= 5000;

            // ─── Artifact ───
            case 'first-artifact':
                return this.countArtifacts(profile) >= 1;
            case 'icp-complete':
                return profile.artifacts?.icpDocument != null;
            case 'playbook-50':
                return this.countArtifacts(profile) >= 5;
            case 'playbook-complete':
                return this.countArtifacts(profile) >= 10;

            // ─── Roleplay ───
            case 'roleplay-first':
                return (progress.roleplayStats?.totalSessions || 0) >= 1;
            case 'roleplay-ace':
                return event.type === 'roleplay_scored' && (event.data.score as number) >= 90;
            case 'roleplay-10':
                return (progress.roleplayStats?.totalSessions || 0) >= 10;

            // ─── Community ───
            case 'first-post':
                return event.type === 'community_post';
            case 'helpful-5':
                return event.type === 'community_upvotes' && (event.data.totalUpvotes as number) >= 5;

            default:
                return false;
        }
    }

    private hasCompletedAnyTrack(progress: Progress): boolean {
        // Track boundaries (course number ranges)
        const tracks = [
            [0, 4],   // Foundations
            [5, 12],  // Marketing Engine
            [13, 20], // Sales Methodology
            [21, 27], // AI Acquisition
            [28, 35], // Creator Economy
            [36, 39], // Customer Success
            [40, 48], // Operations & Systems
        ];

        for (const [start, end] of tracks) {
            let allComplete = true;
            for (let i = start; i <= end; i++) {
                if (!(progress.completedCourses || []).includes(i)) {
                    allComplete = false;
                    break;
                }
            }
            if (allComplete) return true;
        }
        return false;
    }

    private countArtifacts(profile: FounderProfile): number {
        const a = profile.artifacts;
        if (!a) return 0;
        let count = 0;
        if (a.icpDocument) count++;
        if (a.positioningStatement) count++;
        if (a.valuePropositionCanvas) count++;
        if (a.acquisitionPath) count++;
        if (a.listBuildingCriteria) count++;
        if (a.discProfile) count++;
        if (a.discoveryPlaybook) count++;
        if (a.objectionLibrary?.entries && a.objectionLibrary.entries.length > 0) count++;
        if (a.emailSequences) count++;
        if (a.personalPlaybook) count++;
        return count;
    }
}

export const badgeService = new BadgeService();
