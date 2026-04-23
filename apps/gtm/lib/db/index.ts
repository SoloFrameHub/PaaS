/**
 * Postgres client via Drizzle. Only connects when DATABASE_URL is set.
 * Used by Lucia auth and PostgresProfileRepository.
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb() {
  if (!connectionString) return null;
  if (!db) {
    const pool = new pg.Pool({ connectionString });
    db = drizzle(pool, { schema });
  }
  return db;
}

export function hasDatabase(): boolean {
  return Boolean(connectionString);
}

export { db as dbInstance, getDb, schema };
