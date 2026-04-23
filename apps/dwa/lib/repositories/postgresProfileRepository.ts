/**
 * Profile repository using Postgres (Drizzle). Used when DATABASE_URL is set.
 */

import { eq, sql } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db';
import type { WellnessProfile } from '@/types/wellness-profile';
import type { IProfileRepository } from './profileRepository';


// Alias for backwards compatibility
type FounderProfile = WellnessProfile;

export class PostgresProfileRepository implements IProfileRepository {
  async getById(id: string): Promise<WellnessProfile | null> {
    const db = getDb();
    if (!db) throw new Error('No database connection');
    const rows = await db.select().from(schema.profile).where(eq(schema.profile.userId, id)).limit(1);
    const row = rows[0];
    if (!row?.data) return null;
    return { id, userId: id, ...(row.data as Omit<FounderProfile, 'id' | 'userId'>) } as FounderProfile;
  }

  async save(id: string, profile: Partial<FounderProfile>): Promise<void> {
    const db = getDb();
    if (!db) throw new Error('No database connection');
    const { id: _id, userId: _uid, ...data } = profile as FounderProfile;
    await db
      .insert(schema.profile)
      .values({
        userId: id,
        data: data as Record<string, unknown>,
        updatedAt: new Date(),
      })
      .onConflictDoNothing();
  }

  async update(id: string, updates: Record<string, unknown>): Promise<void> {
    const db = getDb();
    if (!db) throw new Error('No database connection');

    // Separate top-level keys from dot-path keys, skipping undefined values
    const topLevel: Record<string, unknown> = {};
    const deepPaths: { path: string[]; value: unknown }[] = [];

    for (const [key, value] of Object.entries(updates)) {
      if (key === 'updatedAt') continue; // handled by table column, not JSONB
      if (value === undefined) continue; // skip undefined to prevent NULL in jsonb_set
      if (key.includes('.')) {
        deepPaths.push({ path: key.split('.'), value });
      } else {
        topLevel[key] = value;
      }
    }

    // Start with existing data, merge top-level keys only if there are any
    const hasTopLevel = Object.keys(topLevel).length > 0;
    let dataExpr = hasTopLevel
      ? sql`(COALESCE(${schema.profile.data}, '{}'::jsonb) || ${JSON.stringify(topLevel)}::jsonb)`
      : sql`COALESCE(${schema.profile.data}, '{}'::jsonb)`;

    // Apply deep path sets using jsonb_set to preserve sibling keys
    for (const { path, value } of deepPaths) {
      const pathStr = `{${path.join(',')}}`;
      const valueStr = JSON.stringify(value ?? null);
      dataExpr = sql`jsonb_set(${dataExpr}, ${pathStr}::text[], ${valueStr}::jsonb, true)`;
    }

    // For new profiles (INSERT), build a complete initial value
    const insertData: Record<string, unknown> = { ...topLevel };
    for (const { path, value } of deepPaths) {
      let current: Record<string, unknown> = insertData;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        const next = (current[key] as Record<string, unknown>) ?? {};
        current[key] = next;
        current = next;
      }
      current[path[path.length - 1]] = value ?? null;
    }

    await db
      .insert(schema.profile)
      .values({ userId: id, data: insertData, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: schema.profile.userId,
        set: {
          data: dataExpr,
          updatedAt: new Date(),
        },
      });
  }

  async getByEmail(email: string): Promise<WellnessProfile | null> {
    const db = getDb();
    if (!db) throw new Error('No database connection');
    const rows = await db
      .select()
      .from(schema.profile)
      .where(sql`${schema.profile.data}->>'email' = ${email}`)
      .limit(1);
    const row = rows[0];
    if (!row?.data) return null;
    return { id: row.userId, userId: row.userId, ...(row.data as Omit<FounderProfile, 'id' | 'userId'>) } as FounderProfile;
  }
}
