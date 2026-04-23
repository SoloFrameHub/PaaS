/**
 * Postgres client via Drizzle. Only connects when DATABASE_URL is set.
 * Used by Lucia auth and PostgresProfileRepository.
 *
 * Finding 17: Explicit connection pool configuration
 * - Development: max 5-10 connections
 * - Production: max 20-50 connections (configurable via DATABASE_POOL_SIZE)
 * - Formula: max_connections = (server_count * max_pool_size) + buffer
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';
import { logger } from '@/lib/logger';

const connectionString = process.env.DATABASE_URL;

// Connection pool configuration (Finding 17)
const getPoolConfig = (): pg.PoolConfig => {
  const isDev = process.env.NODE_ENV === 'development';
  const poolSize = parseInt(process.env.DATABASE_POOL_SIZE || '0', 10);

  // Explicit pool size from env, or sensible defaults
  const max = poolSize > 0 ? poolSize : (isDev ? 10 : 20);
  const min = Math.max(2, Math.floor(max / 4)); // 25% min idle connections

  return {
    connectionString,
    max,                          // Max connections (default: 10 dev, 20 prod)
    min,                          // Min idle connections (25% of max)
    idleTimeoutMillis: 30000,     // Close idle connections after 30s
    connectionTimeoutMillis: 5000, // Fail fast if pool exhausted
  };
};

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb() {
  if (!connectionString) return null;
  if (!db) {
    try {
      const poolConfig = getPoolConfig();
      const pool = new pg.Pool(poolConfig);

      pool.on('error', (err) => {
        logger.error('db_pool_error', { error: err.message });
      });

      pool.on('connect', () => {
        logger.debug('db_pool_connect', {
          max: poolConfig.max,
          min: poolConfig.min,
        });
      });

      db = drizzle(pool, { schema });

      logger.info('db_pool_initialized', {
        max: poolConfig.max,
        min: poolConfig.min,
        idleTimeout: poolConfig.idleTimeoutMillis,
        connectionTimeout: poolConfig.connectionTimeoutMillis,
      });
    } catch (err) {
      logger.error('db_pool_init_failed', {
        error: err instanceof Error ? err.message : String(err),
      });
      return null;
    }
  }
  return db;
}

export function hasDatabase(): boolean {
  return Boolean(connectionString);
}

export { db as dbInstance, getDb, schema };
