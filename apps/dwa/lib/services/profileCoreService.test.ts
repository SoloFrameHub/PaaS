import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/repositories/profileRepository', () => ({
    profileRepository: {
        getById: vi.fn(),
        save: vi.fn(),
        update: vi.fn()
    }
}));

describe('profileCoreService', () => {
    it.todo('should get a profile by user ID');
    it.todo('should save a new profile');
    it.todo('should update an existing profile');
});
