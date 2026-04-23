import { WellnessProfile } from '@/types/wellness-profile';
import { MockProfileRepository } from './mockProfileRepository';
import { PostgresProfileRepository } from './postgresProfileRepository';
import { hasDatabase } from '@/lib/db';

// Alias for backwards compatibility
type FounderProfile = WellnessProfile;

export interface IProfileRepository {
    getById(id: string): Promise<WellnessProfile | null>;
    save(id: string, profile: Partial<WellnessProfile>): Promise<void>;
    update(id: string, updates: Record<string, unknown>): Promise<void>;
    getByEmail(email: string): Promise<WellnessProfile | null>;
}

const getProfileRepository = (): IProfileRepository => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true') {
        // Security: Block mock mode in actual production runtime (not during builds)
        if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
            throw new Error('CRITICAL: Mock auth cannot be enabled in production');
        }
        return new MockProfileRepository();
    }
    if (hasDatabase()) {
        return new PostgresProfileRepository();
    }
    return new MockProfileRepository();
};

export const profileRepository = getProfileRepository();
