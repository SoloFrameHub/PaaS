import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('next/headers', () => ({
    cookies: vi.fn(() => Promise.resolve({
        get: vi.fn((name) => {
            if (name === 'session') return { value: JSON.stringify({ uid: 'test-user', email: 'test@example.com' }) };
            return undefined;
        })
    })),
}));

