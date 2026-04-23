// Privileged Drizzle client. Engines inside @platform/* import this via
// `@platform/tenancy/internal`; apps are blocked from the path by
// `@platform/eslint-plugin/no-direct-db-access`. All tenant-scoped work goes
// through `withTenant(ctx, tx => ...)` so the tx carries the correct role +
// `app.tenant_id` GUC.

import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import { TenancyError } from '../errors.js';
import * as schema from '../schema/index.js';

export type Schema = typeof schema;
export type PlatformDb = NodePgDatabase<Schema>;

let _pool: pg.Pool | null = null;
let _db: PlatformDb | null = null;

export function getPool(): pg.Pool {
  if (!_pool) {
    const connectionString =
      process.env.PLATFORM_DATABASE_URL ?? process.env.DATABASE_URL;
    if (!connectionString) {
      throw new TenancyError(
        '@platform/tenancy: neither PLATFORM_DATABASE_URL nor DATABASE_URL is set; cannot open a pool.',
      );
    }
    const max = parseInt(process.env.PLATFORM_DATABASE_POOL_SIZE ?? '', 10);
    _pool = new pg.Pool({
      connectionString,
      max: Number.isFinite(max) && max > 0 ? max : 20,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return _pool;
}

export function getDb(): PlatformDb {
  if (!_db) {
    _db = drizzle(getPool(), { schema });
  }
  return _db;
}

/**
 * Close the pool. Tests call this between suites; production callers should
 * never need it (the pool lives for the process lifetime).
 */
export async function __closePool(): Promise<void> {
  const pool = _pool;
  _pool = null;
  _db = null;
  if (pool) await pool.end();
}

export { schema };
