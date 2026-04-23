import Redis from 'ioredis';
import { logger } from './logger';

const redisUrl = process.env.REDIS_URL;
const redisEnabled =
  process.env.REDIS_ENABLED !== 'false' && Boolean(redisUrl);

/**
 * Singleton Redis client provider.
 * Manages the connection to the Redis instance and handles errors.
 * Can be disabled via REDIS_ENABLED=false environment variable (useful for E2E tests).
 */
class RedisClient {
    private static instance: Redis | null = null;

    /**
     * Gets or creates the singleton Redis instance.
     * @returns The configured Redis client instance, or null if Redis is disabled.
     */
    static getInstance(): Redis | null {
        if (!redisEnabled || !redisUrl) {
            return null;
        }

        if (!this.instance) {
            this.instance = new Redis(redisUrl, {
                maxRetriesPerRequest: 3,
                retryStrategy: (times) => Math.min(times * 50, 2000),
                lazyConnect: true, // Don't connect immediately
            });

            this.instance.on('error', (err) => {
                // Only log if not in test environment
                if (process.env.NODE_ENV !== 'test') {
                    logger.error('Redis connection error', { error: err });
                }
            });

            // Attempt to connect
            this.instance.connect().catch((err) => {
                if (process.env.NODE_ENV !== 'test') {
                    logger.error('Failed to connect to Redis', { error: err });
                }
            });
        }
        return this.instance;
    }
}

export const redis = RedisClient.getInstance();

/**
 * Retrieves a value from the Redis cache.
 * 
 * @param key - The cache key.
 * @returns The parsed JSON value or null if not found or on error.
 */
export async function getCache<T>(key: string): Promise<T | null> {
    if (!redis) {
        return null;
    }

    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        logger.error(`Error getting cache for ${key}`, { error });
        return null;
    }
}

/**
 * Sets a value in the Redis cache with an optional TTL.
 * 
 * @param key - The cache key.
 * @param value - The value to store (will be JSON serialized).
 * @param ttlSeconds - Time-to-live in seconds (default: 3600).
 */
export async function setCache(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    if (!redis) {
        return;
    }

    try {
        await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (error) {
        logger.error(`Error setting cache for ${key}`, { error });
    }
}

/**
 * Invalidates (deletes) a specific cache key.
 * 
 * @param key - The cache key to remove.
 */
export async function invalidateCache(key: string): Promise<void> {
    if (!redis) {
        return;
    }

    try {
        await redis.del(key);
    } catch (error) {
        logger.error(`Error invalidating cache for ${key}`, { error });
    }
}
