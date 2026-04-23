/**
 * Connected Account Service
 * Manages encrypted token storage for external integrations (Attio, Notion).
 */

import { getDb, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { encryptToken, decryptToken } from "@/lib/utils/encryption";
import type { IntegrationProvider, ConnectedAccount } from "@/types/execute";

function generateId(): string {
  return `ca_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function connectAccount(
  userId: string,
  provider: IntegrationProvider,
  accessToken: string,
  options?: {
    refreshToken?: string;
    tokenExpiresAt?: Date;
    providerAccountId?: string;
    providerMetadata?: Record<string, unknown>;
  },
): Promise<void> {
  try {
    const db = getDb();
    if (!db) throw new Error("Database not available");

    const accessTokenEncrypted = encryptToken(accessToken);
    const refreshTokenEncrypted = options?.refreshToken
      ? encryptToken(options.refreshToken)
      : null;

    await db
      .insert(schema.connectedAccount)
      .values({
        id: generateId(),
        userId,
        provider,
        accessTokenEncrypted,
        refreshTokenEncrypted,
        tokenExpiresAt: options?.tokenExpiresAt || null,
        providerAccountId: options?.providerAccountId || null,
        providerMetadata: options?.providerMetadata || null,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [
          schema.connectedAccount.userId,
          schema.connectedAccount.provider,
        ],
        set: {
          accessTokenEncrypted,
          refreshTokenEncrypted,
          tokenExpiresAt: options?.tokenExpiresAt || null,
          providerAccountId: options?.providerAccountId || null,
          providerMetadata: options?.providerMetadata || null,
          status: "active",
          updatedAt: new Date(),
        },
      });
  } catch (error) {
    console.error("[connectAccount] failed:", error);
    throw error;
  }
}

async function getConnection(
  userId: string,
  provider: IntegrationProvider,
): Promise<{
  account: ConnectedAccount;
  accessToken: string;
  refreshToken: string | null;
} | null> {
  try {
    const db = getDb();
    if (!db) return null;

    const [row] = await db
      .select()
      .from(schema.connectedAccount)
      .where(
        and(
          eq(schema.connectedAccount.userId, userId),
          eq(schema.connectedAccount.provider, provider),
          eq(schema.connectedAccount.status, "active"),
        ),
      )
      .limit(1);

    if (!row) return null;

    return {
      account: {
        id: row.id,
        userId: row.userId,
        provider: row.provider as IntegrationProvider,
        providerAccountId: row.providerAccountId,
        providerMetadata: row.providerMetadata as Record<
          string,
          unknown
        > | null,
        status: row.status as "active" | "expired" | "revoked",
        lastSyncedAt: row.lastSyncedAt?.toISOString() || null,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      },
      accessToken: decryptToken(row.accessTokenEncrypted),
      refreshToken: row.refreshTokenEncrypted
        ? decryptToken(row.refreshTokenEncrypted)
        : null,
    };
  } catch (error) {
    console.error("[getConnection] failed:", error);
    throw error;
  }
}

async function disconnectAccount(
  userId: string,
  provider: IntegrationProvider,
): Promise<void> {
  try {
    const db = getDb();
    if (!db) return;

    await db
      .update(schema.connectedAccount)
      .set({ status: "revoked", updatedAt: new Date() })
      .where(
        and(
          eq(schema.connectedAccount.userId, userId),
          eq(schema.connectedAccount.provider, provider),
        ),
      );
  } catch (error) {
    console.error("[disconnectAccount] failed:", error);
    throw error;
  }
}

async function isConnected(
  userId: string,
  provider: IntegrationProvider,
): Promise<boolean> {
  try {
    const db = getDb();
    if (!db) return false;

    const [row] = await db
      .select({ id: schema.connectedAccount.id })
      .from(schema.connectedAccount)
      .where(
        and(
          eq(schema.connectedAccount.userId, userId),
          eq(schema.connectedAccount.provider, provider),
          eq(schema.connectedAccount.status, "active"),
        ),
      )
      .limit(1);

    return !!row;
  } catch (error) {
    console.error("[isConnected] failed:", error);
    throw error;
  }
}

async function updateLastSynced(
  userId: string,
  provider: IntegrationProvider,
): Promise<void> {
  try {
    const db = getDb();
    if (!db) return;

    await db
      .update(schema.connectedAccount)
      .set({ lastSyncedAt: new Date(), updatedAt: new Date() })
      .where(
        and(
          eq(schema.connectedAccount.userId, userId),
          eq(schema.connectedAccount.provider, provider),
        ),
      );
  } catch (error) {
    console.error("[updateLastSynced] failed:", error);
    throw error;
  }
}

async function listConnections(userId: string): Promise<ConnectedAccount[]> {
  try {
    const db = getDb();
    if (!db) return [];

    const rows = await db
      .select({
        id: schema.connectedAccount.id,
        userId: schema.connectedAccount.userId,
        provider: schema.connectedAccount.provider,
        providerAccountId: schema.connectedAccount.providerAccountId,
        providerMetadata: schema.connectedAccount.providerMetadata,
        status: schema.connectedAccount.status,
        lastSyncedAt: schema.connectedAccount.lastSyncedAt,
        createdAt: schema.connectedAccount.createdAt,
        updatedAt: schema.connectedAccount.updatedAt,
      })
      .from(schema.connectedAccount)
      .where(eq(schema.connectedAccount.userId, userId));

    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      provider: r.provider as IntegrationProvider,
      providerAccountId: r.providerAccountId,
      providerMetadata: r.providerMetadata as Record<string, unknown> | null,
      status: r.status as "active" | "expired" | "revoked",
      lastSyncedAt: r.lastSyncedAt?.toISOString() || null,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("[listConnections] failed:", error);
    throw error;
  }
}

export const connectedAccountService = {
  connectAccount,
  getConnection,
  disconnectAccount,
  isConnected,
  updateLastSynced,
  listConnections,
};
