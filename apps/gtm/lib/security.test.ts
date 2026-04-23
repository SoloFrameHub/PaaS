import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isRateLimited } from './security';
import { redis } from './redis';

// Mock Redis
vi.mock('./redis', () => ({
    redis: {
        multi: vi.fn()
    }
}));

describe('isRateLimited', () => {
    const config = { limit: 2, windowMs: 1000 };
    const id = 'test-ip';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should allow requests within limit', async () => {
        const mockExec = vi.fn().mockResolvedValue([
            [null, 0], // zremrangebyscore
            [null, 1], // zadd
            [null, 1], // zcard (1 request used)
            [null, [Date.now().toString()]], // zrange (oldest)
            [null, 'OK'] // expire
        ]);

        (redis!.multi as any).mockReturnValue({
            zremrangebyscore: vi.fn().mockReturnThis(),
            zadd: vi.fn().mockReturnThis(),
            zcard: vi.fn().mockReturnThis(),
            zrange: vi.fn().mockReturnThis(),
            expire: vi.fn().mockReturnThis(),
            exec: mockExec
        });

        const res1 = await isRateLimited(id, config);
        expect(res1.limited).toBe(false);
        expect(res1.remaining).toBe(1);
    });

    it('should block requests over limit', async () => {
        const mockExec = vi.fn().mockResolvedValue([
            [null, 0],
            [null, 1],
            [null, 3], // zcard (3 requests used, limit is 2)
            [null, [Date.now().toString()]],
            [null, 'OK']
        ]);

        (redis!.multi as any).mockReturnValue({
            zremrangebyscore: vi.fn().mockReturnThis(),
            zadd: vi.fn().mockReturnThis(),
            zcard: vi.fn().mockReturnThis(),
            zrange: vi.fn().mockReturnThis(),
            expire: vi.fn().mockReturnThis(),
            exec: mockExec
        });

        const res = await isRateLimited(id, config);
        expect(res.limited).toBe(true);
        expect(res.remaining).toBe(0);
    });

    it('should fallback gracefully when Redis fails', async () => {
        (redis!.multi as any).mockReturnValue({
            zremrangebyscore: vi.fn().mockReturnThis(),
            zadd: vi.fn().mockReturnThis(),
            zcard: vi.fn().mockReturnThis(),
            zrange: vi.fn().mockReturnThis(),
            expire: vi.fn().mockReturnThis(),
            exec: vi.fn().mockRejectedValue(new Error('Redis Down'))
        });

        const res = await isRateLimited(id, config);
        expect(res.limited).toBe(false);
        expect(res.remaining).toBe(1);
    });
});
