import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MockProfileRepository } from './mockProfileRepository';
import fs from 'fs';
import { FounderProfile } from '@/types/profile';

// Mock fs to ensure atomic operations are called
vi.mock('fs', async () => {
    const mem = new Map<string, string>();
    return {
        default: {
            existsSync: vi.fn((p) => mem.has(p)),
            readFileSync: vi.fn((p) => mem.get(p)),
            writeFileSync: vi.fn((p, v) => mem.set(p, v)),
            renameSync: vi.fn((src, dst) => {
                mem.set(dst, mem.get(src) || '');
                mem.delete(src);
            }),
            promises: {
                readFile: vi.fn(async (p) => mem.get(p)),
                writeFile: vi.fn(async (p, v) => mem.set(p, v)),
                rename: vi.fn(async (src, dst) => {
                    mem.set(dst, mem.get(src) || '');
                    mem.delete(src);
                }),
            }
        },
        existsSync: vi.fn((p) => mem.has(p)),
        readFileSync: vi.fn((p) => mem.get(p)),
        writeFileSync: vi.fn((p, v) => mem.set(p, v)),
        renameSync: vi.fn((src, dst) => {
            mem.set(dst, mem.get(src) || '');
            mem.delete(src);
        }),
        promises: {
            readFile: vi.fn(async (p) => mem.get(p)),
            writeFile: vi.fn(async (p, v) => mem.set(p, v)),
            rename: vi.fn(async (src, dst) => {
                mem.set(dst, mem.get(src) || '');
                mem.delete(src);
            }),
        }
    };
});

describe('MockProfileRepository', () => {
    let repository: MockProfileRepository;
    const mockProfile = {
        id: 'user123',
        email: 'test@example.com',
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    beforeEach(() => {
        vi.clearAllMocks();

        repository = new MockProfileRepository();
    });

    it('should save a profile using atomic write pattern', async () => {
        await repository.save('user123', mockProfile as any);

        // Verify write to .tmp file
        expect(fs.promises.writeFile).toHaveBeenCalledWith(
            expect.stringContaining('.tmp'),
            expect.stringContaining('user123')
        );

        // Verify rename to final file
        expect(fs.promises.rename).toHaveBeenCalledWith(
            expect.stringContaining('.tmp'),
            expect.stringContaining('soloframehub_mock_profiles.json')
        );
    });

    it('should reload data from disk on getById to ensure freshness', async () => {
        // Mock file existence and content by writing to the mock mem
        const filePath = '/tmp/soloframehub_mock_profiles.json';
        await fs.promises.writeFile(filePath, JSON.stringify({
            'user123': mockProfile
        }));

        // Call getById
        const result = await repository.getById('user123');

        // Verify readFile was called
        expect(fs.promises.readFile).toHaveBeenCalled();
        expect(result).toEqual(mockProfile);
    });

    it('should handle read errors gracefully', async () => {
        const filePath = '/tmp/soloframehub_mock_profiles.json';
        await fs.promises.writeFile(filePath, 'invalid json');

        // Mock readFile to throw
        (fs.promises.readFile as any).mockImplementationOnce(() => {
            throw new Error('Read error');
        });

        // Should catch error and return null or empty (based on implementation)
        const result = await repository.getById('missing');
        expect(result).toBeNull();
    });
});
