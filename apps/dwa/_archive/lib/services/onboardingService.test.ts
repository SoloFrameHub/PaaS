import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateFounderCategory, calculateDiscProfile, getIndustries } from './onboardingService';

vi.mock('@/lib/repositories/profileRepository', () => ({
    profileRepository: {
        update: vi.fn(),
        getById: vi.fn(),
    }
}));

