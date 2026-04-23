/**
 * Profile repository using Postgres (Drizzle). Used when DATABASE_URL is set.
 */

import { eq, sql } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import type { FounderProfile } from "@/types/profile";
import type { IProfileRepository } from "./profileRepository";

function setByPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): void {
  const parts = path.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const next = (current[key] as Record<string, unknown>) ?? {};
    current[key] = next;
    current = next;
  }
  current[parts[parts.length - 1]] = value;
}

export class PostgresProfileRepository implements IProfileRepository {
  async getById(id: string): Promise<FounderProfile | null> {
    const db = getDb();
    if (!db) return null;
    const rows = await db
      .select()
      .from(schema.profile)
      .where(eq(schema.profile.userId, id))
      .limit(1);
    const row = rows[0];
    if (!row?.data) return null;
    return {
      id,
      userId: id,
      ...(row.data as Omit<FounderProfile, "id" | "userId">),
    } as FounderProfile;
  }

  async save(id: string, profile: Partial<FounderProfile>): Promise<void> {
    const db = getDb();
    if (!db) throw new Error("DATABASE_URL not set");
    const { id: _id, userId: _uid, ...data } = profile as FounderProfile;
    await db
      .insert(schema.profile)
      .values({
        userId: id,
        data: data as Record<string, unknown>,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.profile.userId,
        set: { data: data as Record<string, unknown>, updatedAt: new Date() },
      });
  }

  async update(id: string, updates: Record<string, unknown>): Promise<void> {
    const db = getDb();
    if (!db) throw new Error("DATABASE_URL not set");

    // Build a flat merge object from potentially dotted keys
    const merged: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (key === "updatedAt") continue;
      setByPath(merged, key, value);
    }
    merged.updatedAt = new Date().toISOString();

    // Deep JSONB merge: recursively merge nested objects instead of overwriting them.
    // The || operator only does shallow merge, which destroys sibling keys in nested objects.
    const patch = JSON.stringify(merged);
    await db
      .insert(schema.profile)
      .values({ userId: id, data: merged, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: schema.profile.userId,
        set: {
          data: sql`(
            SELECT COALESCE(
              jsonb_object_agg(
                key,
                CASE
                  WHEN jsonb_typeof(existing.value) = 'object'
                    AND jsonb_typeof(patch.value) = 'object'
                  THEN existing.value || patch.value
                  ELSE COALESCE(patch.value, existing.value)
                END
              ),
              '{}'::jsonb
            )
            FROM jsonb_each(COALESCE(${schema.profile.data}, '{}'::jsonb)) AS existing(key, value)
            FULL OUTER JOIN jsonb_each(${patch}::jsonb) AS patch(key, value) USING (key)
          )`,
          updatedAt: new Date(),
        },
      });
  }

  async acquireAnalysisLock(
    id: string,
    staleLockMinutes = 5,
  ): Promise<boolean> {
    const db = getDb();
    if (!db) return false;
    const cutoff = new Date(
      Date.now() - staleLockMinutes * 60 * 1000,
    ).toISOString();
    // Atomic: only set 'analyzing' if not already locked (or lock is stale)
    const result = await db.execute(sql`
      UPDATE ${schema.profile}
      SET data = jsonb_set(
        jsonb_set(
          COALESCE(data, '{}'::jsonb),
          '{analysisStatus}', '"analyzing"'
        ),
        '{updatedAt}', to_jsonb(now()::text)
      ),
      updated_at = now()
      WHERE user_id = ${id}
        AND (
          COALESCE(data->>'analysisStatus', '') != 'analyzing'
          OR COALESCE(data->>'updatedAt', '1970-01-01') < ${cutoff}
        )
    `);
    return (result as any).rowCount > 0;
  }

  async getByEmail(email: string): Promise<FounderProfile | null> {
    const db = getDb();
    if (!db) return null;
    const rows = await db
      .select()
      .from(schema.profile)
      .where(sql`${schema.profile.data}->>'email' = ${email}`)
      .limit(1);
    const row = rows[0];
    if (!row?.data) return null;
    return {
      id: row.userId,
      userId: row.userId,
      ...(row.data as Omit<FounderProfile, "id" | "userId">),
    } as FounderProfile;
  }

  async getCertifiedFounders(): Promise<
    import("./profileRepository").CertifiedFounderEntry[]
  > {
    const db = getDb();
    if (!db) return [];
    const rows = await db
      .select({ data: schema.profile.data })
      .from(schema.profile)
      .where(
        sql`${schema.profile.data}->'progress'->'certificationEarned' IS NOT NULL`,
      )
      .orderBy(
        sql`${schema.profile.data}->'progress'->'certificationEarned'->>'earnedAt' DESC`,
      );

    return rows
      .map((row) => {
        const d = row.data as Record<string, any>;
        const cert = d?.progress?.certificationEarned;
        if (!cert?.certId) return null;
        return {
          certId: cert.certId,
          name: d.name || "Anonymous",
          businessName: d.businessName || "",
          badgrAssertionUrl: cert.badgrAssertionUrl ?? null,
          earnedAt: cert.earnedAt,
        };
      })
      .filter(Boolean) as import("./profileRepository").CertifiedFounderEntry[];
  }
}
