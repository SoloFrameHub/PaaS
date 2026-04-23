/**
 * NodeBB User Mapping Service
 *
 * Auto-creates NodeBB accounts for platform users on first community action.
 * Maps platform userId → NodeBB uid via the nodebb_user_map table.
 */

import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

const NODEBB_URL =
  process.env.NEXT_PUBLIC_FORUM_URL || "https://ai-caa-forum.soloframehub.com";
const NODEBB_API_KEY = process.env.NODEBB_API_KEY || "";

async function nodebbFetch(path: string, options: RequestInit = {}) {
  const url = `${NODEBB_URL}${path}${path.includes("?") ? "&" : "?"}_uid=1`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${NODEBB_API_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`NodeBB API error ${res.status}: ${body}`);
  }
  return res.json();
}

/**
 * Get NodeBB uid for a platform user. Returns null if no mapping exists.
 */
export async function getNodebbUid(userId: string): Promise<number | null> {
  try {
    const db = getDb();
    if (!db) return null;

    const [row] = await db
      .select()
      .from(schema.nodebbUserMap)
      .where(eq(schema.nodebbUserMap.userId, userId));

    return row?.nodebbUid ?? null;
  } catch (error) {
    console.error("[getNodebbUid] failed:", error);
    throw error;
  }
}

/**
 * Get or create a NodeBB user for a platform user.
 * Creates the NodeBB account and mapping on first call.
 */
export async function getOrCreateNodebbUid(
  userId: string,
  username: string,
  email: string,
): Promise<number> {
  try {
    // Check existing mapping
    const existing = await getNodebbUid(userId);
    if (existing) return existing;

    const db = getDb();
    if (!db) throw new Error("Database not available");

    // Create a NodeBB-safe username (alphanumeric + dashes, no spaces)
    const safeUsername =
      username
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 24) || `user-${userId.substring(0, 8)}`;

    // Generate a random password (users won't login to NodeBB directly)
    const password = `NB_${crypto.randomUUID().replace(/-/g, "")}`;

    const data = await nodebbFetch("/api/v3/users", {
      method: "POST",
      body: JSON.stringify({
        username: safeUsername,
        password,
        email,
      }),
    });

    const nodebbUid = data.response.uid;

    // Store the mapping — use onConflictDoNothing so the first-inserted mapping wins.
    // In a race, both requests create NodeBB accounts but only the first mapping persists.
    // The second NodeBB account becomes orphaned (harmless — no mapping points to it).
    const [row] = await db
      .insert(schema.nodebbUserMap)
      .values({
        userId,
        nodebbUid,
      })
      .onConflictDoNothing()
      .returning();

    if (!row) {
      // Another request won the race — use the existing mapping
      const existingUid = await getNodebbUid(userId);
      if (existingUid) {
        logger.info("NodeBB mapping race: using existing mapping", {
          userId,
          existingUid,
          orphanedUid: nodebbUid,
        });
        return existingUid;
      }
      // Shouldn't happen, but fall back to the uid we just created
      return nodebbUid;
    }

    return row.nodebbUid;
  } catch (error) {
    console.error("[getOrCreateNodebbUid] failed:", error);
    throw error;
  }
}

export const nodebbUserService = {
  getNodebbUid,
  getOrCreateNodebbUid,
};
