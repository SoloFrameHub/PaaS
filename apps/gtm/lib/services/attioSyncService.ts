/**
 * Attio Sync Service
 * Bi-directional sync between the OS pipeline and Attio CRM.
 */

import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { attioClient } from "@/lib/attio/client";
import { connectedAccountService } from "./connectedAccountService";
import { pipelineService } from "./pipelineService";
import { logger } from "@/lib/logger";
import type { FounderProfile } from "@/types/profile";

interface SyncResult {
  pushed: number;
  pulled: number;
  errors: string[];
}

/**
 * Push OS profile data to Attio (Person + Company).
 */
async function syncProfileToAttio(
  userId: string,
  profile: FounderProfile,
): Promise<SyncResult> {
  const result: SyncResult = { pushed: 0, pulled: 0, errors: [] };

  const connection = await connectedAccountService.getConnection(
    userId,
    "attio",
  );
  if (!connection) {
    result.errors.push("Attio not connected");
    return result;
  }

  const apiKey = connection.accessToken;

  try {
    // Sync person
    if (profile.email) {
      await attioClient.assertPerson(apiKey, {
        email: profile.email,
        name: profile.name || undefined,
      });
      result.pushed++;
    }

    // Sync company
    if (profile.businessName) {
      const domain = profile.websiteUrl
        ? new URL(profile.websiteUrl).hostname.replace(/^www\./, "")
        : undefined;
      await attioClient.assertCompany(apiKey, {
        name: profile.businessName,
        domain,
      });
      result.pushed++;
    }

    await connectedAccountService.updateLastSynced(userId, "attio");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    logger.error("Attio profile sync failed", { userId, error: msg });
  }

  return result;
}

/**
 * Push OS pipeline deals to Attio as notes on the person/company.
 * Full deal sync requires Attio Deals object setup — this is the initial version.
 */
async function syncDealsToAttio(userId: string): Promise<SyncResult> {
  const result: SyncResult = { pushed: 0, pulled: 0, errors: [] };

  const connection = await connectedAccountService.getConnection(
    userId,
    "attio",
  );
  if (!connection) {
    result.errors.push("Attio not connected");
    return result;
  }

  const apiKey = connection.accessToken;
  const deals = await pipelineService.getUserDeals(userId, { limit: 50 });

  for (const deal of deals) {
    try {
      // Create person for deal prospect if they have an email
      if (deal.prospectEmail) {
        const personResult = await attioClient.assertPerson(apiKey, {
          email: deal.prospectEmail,
          name: deal.prospectName,
        });

        // Update deal with Attio record ID if not set
        if (!deal.attioRecordId) {
          const db = getDb();
          if (db) {
            await db
              .update(schema.pipelineDeal)
              .set({
                attioRecordId: personResult.data.id.record_id,
                updatedAt: new Date(),
              })
              .where(eq(schema.pipelineDeal.id, deal.id));
          }
        }

        result.pushed++;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`Deal ${deal.id}: ${msg}`);
    }
  }

  if (result.pushed > 0) {
    await connectedAccountService.updateLastSynced(userId, "attio");
  }

  return result;
}

/**
 * Full sync: profile + deals.
 */
async function fullSync(
  userId: string,
  profile: FounderProfile,
): Promise<SyncResult> {
  const [profileResult, dealsResult] = await Promise.all([
    syncProfileToAttio(userId, profile),
    syncDealsToAttio(userId),
  ]);

  return {
    pushed: profileResult.pushed + dealsResult.pushed,
    pulled: profileResult.pulled + dealsResult.pulled,
    errors: [...profileResult.errors, ...dealsResult.errors],
  };
}

export const attioSyncService = {
  syncProfileToAttio,
  syncDealsToAttio,
  fullSync,
};
