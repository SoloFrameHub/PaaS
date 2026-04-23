import { profileRepository } from '@/lib/repositories/profileRepository';
import type { WellnessProfile, WellnessProgress } from '@/types/wellness-profile';
import { flattenObject } from '@/lib/utils/object';
import { invalidateCache } from '@/lib/redis';

// Backward compatibility alias
type FounderProfile = WellnessProfile;

export class ProfileCoreService {
    private readonly CURRENT_VERSION = 3; // Bumped for wellness profile migration

    async getOrCreateProfile(userId: string, email: string): Promise<WellnessProfile> {
        // getById throws on DB errors (not swallowed), so a transient failure
        // will propagate up rather than silently creating an empty profile
        // that overwrites the real one.
        let profile = await profileRepository.getById(userId);

        if (!profile) {
            profile = this.createEmptyProfile(userId, email);
            // save uses onConflictDoNothing — if the profile was created
            // between our read and write, we won't overwrite it.
            await profileRepository.save(userId, profile);
            // Re-read to get the authoritative version (ours or the race winner's)
            const saved = await profileRepository.getById(userId);
            if (saved) profile = saved;
        }

        return this.migrateAndPersist(userId, profile);
    }

    async getProfile(userId: string): Promise<WellnessProfile | null> {
        const profile = await profileRepository.getById(userId);
        return profile ? this.migrateAndPersist(userId, profile) : null;
    }

    async updateProfile(userId: string, updates: Record<string, unknown>): Promise<void> {
        // Flatten nested objects to ensure partial updates work correctly
        const flattenedUpdates = flattenObject(updates);

        await profileRepository.update(userId, {
            ...flattenedUpdates,
            updatedAt: new Date().toISOString()
        });

        // Invalidate cached AI context so next coaching call rebuilds it
        await invalidateCache(`ai:ctx:${userId}`);
    }

    /**
     * Migrate profile in-memory AND persist any missing fields to the DB.
     * This prevents jsonb_set from silently failing when intermediate keys are null.
     */
    private async migrateAndPersist(userId: string, profile: WellnessProfile): Promise<WellnessProfile> {
        const migrated = this.migrateProfile(profile);

        // Detect which progress fields were null/missing and need to be persisted
        const fixes: Record<string, unknown> = {};
        const empty = this.createEmptyProgress();

        if (!profile.progress) {
            fixes['progress'] = empty;
        } else {
            if (profile.progress.completedCourses == null) fixes['progress.completedCourses'] = empty.completedCourses;
            if (profile.progress.completedLessons == null) fixes['progress.completedLessons'] = empty.completedLessons;
            if (profile.progress.badges == null) fixes['progress.badges'] = empty.badges;
            if (profile.progress.xpTotal == null) fixes['progress.xpTotal'] = empty.xpTotal;
            if (profile.progress.streakDays == null) fixes['progress.streakDays'] = empty.streakDays;
            if (profile.progress.longestStreak == null) fixes['progress.longestStreak'] = empty.longestStreak;
        }

        if (Object.keys(fixes).length > 0) {
            // Non-blocking — profile works in-memory regardless
            profileRepository.update(userId, fixes).catch(() => { /* non-critical */ });
        }

        return migrated;
    }

    migrateProfile(profile: WellnessProfile): WellnessProfile {
        const migrated: WellnessProfile = { ...profile };

        // Always ensure required fields exist regardless of version —
        // a profile can be at CURRENT_VERSION but still be missing sub-fields
        // if it was created via an older code path.
        const empty = this.createEmptyProgress();
        if (!migrated.progress) {
            migrated.progress = empty;
        } else {
            migrated.progress = {
                ...empty,
                ...migrated.progress,
                completedCourses: migrated.progress.completedCourses ?? empty.completedCourses,
                completedLessons: migrated.progress.completedLessons ?? empty.completedLessons,
                badges: migrated.progress.badges ?? empty.badges,
            };
        }

        if (!migrated.preferences) {
            migrated.preferences = { emailReminders: false };
        }

        if (migrated.has988Acknowledged === undefined) {
            migrated.has988Acknowledged = false;
        }

        // Skip version bump if already current
        if (profile.profileVersion >= this.CURRENT_VERSION) return migrated;

        return migrated;
    }

    async updateProgress(
        userId: string,
        update: {
            completedCourse?: string;
            completedLesson?: { courseId: string; lessonId: string };
            completedQuiz?: { courseId: string; lessonId: string };
            currentCourse?: string;
            xpEarned?: number;
            badge?: string;
            streakDays?: number;
        }
    ): Promise<void> {
        const profile = await this.getProfile(userId);
        if (!profile) return;

        const updates: Record<string, unknown> = {
            'progress.lastActivityAt': new Date().toISOString(),
        };

        const completedCourses = profile.progress.completedCourses ?? [];
        const completedLessons = profile.progress.completedLessons ?? {};
        const completedQuizzes = profile.progress.completedQuizzes ?? {};
        const badges = profile.progress.badges ?? [];

        if (update.completedCourse !== undefined && !completedCourses.includes(update.completedCourse)) {
            updates['progress.completedCourses'] = [...completedCourses, update.completedCourse];
        }

        let newLessonCompleted = false;
        if (update.completedLesson) {
            const { courseId, lessonId } = update.completedLesson;
            const currentLessons = completedLessons[courseId] || [];
            if (!currentLessons.includes(lessonId)) {
                // Set the entire completedLessons object to avoid jsonb_set failing
                // when the intermediate key doesn't exist in Postgres
                const updatedLessons = { ...completedLessons, [courseId]: [...currentLessons, lessonId] };
                updates['progress.completedLessons'] = updatedLessons;
                newLessonCompleted = true;
            }
        }

        if (update.completedQuiz) {
            const { courseId, lessonId } = update.completedQuiz;
            const currentQuizzes = completedQuizzes[courseId] || [];
            if (!currentQuizzes.includes(lessonId)) {
                const updatedQuizzes = { ...completedQuizzes, [courseId]: [...currentQuizzes, lessonId] };
                updates['progress.completedQuizzes'] = updatedQuizzes;
            }
        }

        if (update.currentCourse !== undefined) updates['progress.currentCourse'] = update.currentCourse;
        // Only award XP when a new lesson was actually completed (prevent double-counting)
        if (update.xpEarned && newLessonCompleted) updates['progress.xpTotal'] = (profile.progress.xpTotal || 0) + update.xpEarned;
        if (update.badge && !badges.includes(update.badge)) {
            updates['progress.badges'] = [...badges, update.badge];
        }
        if (update.streakDays !== undefined) {
            updates['progress.streakDays'] = update.streakDays;
            if (update.streakDays > (profile.progress.longestStreak || 0)) {
                updates['progress.longestStreak'] = update.streakDays;
            }
        }

        await profileRepository.update(userId, updates);
    }

    private createEmptyProgress(): WellnessProgress {
        return {
            completedCourses: [],
            completedLessons: {},
            currentCourse: null,
            xpTotal: 0,
            streakDays: 0,
            longestStreak: 0,
            badges: [],
            techniquesPracticed: {},
            favoritesTechniques: [],
            moodEntries: [],
            techniquePractices: [],
            lastActivityAt: new Date().toISOString(),
        };
    }

    private createEmptyProfile(userId: string, email: string): WellnessProfile {
        const now = new Date().toISOString();
        return {
            id: userId,
            userId,
            name: '',
            email,
            displayName: undefined,
            onboardingCompleted: false,
            onboardingCompletedAt: null,
            profileVersion: this.CURRENT_VERSION,
            questionnaire: undefined,
            assessment: null,
            progress: this.createEmptyProgress(),
            preferences: {
                emailReminders: false,
            },
            has988Acknowledged: false,
            createdAt: now,
            updatedAt: now,
        };
    }
}

export const profileCoreService = new ProfileCoreService();
