import { Webhooks } from "@polar-sh/nextjs";
import { withSystemAdminApp, withTenantApp } from "@/lib/db/with-tenant";
import { subscription, bookPurchase } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { trackPurchase } from "@/lib/analytics/ga4-server";
import { logger } from "@/lib/logger";

const BOOK_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_BOOK_PRODUCT_ID;

function getPolarWebhookSecret(): string {
  const secret = process.env.POLAR_WEBHOOK_SECRET;
  if (!secret) {
    logger.error(
      "POLAR_WEBHOOK_SECRET is not set — webhook signature verification disabled",
    );
    return "__MISSING_POLAR_WEBHOOK_SECRET__";
  }
  return secret;
}

/**
 * Resolve a userId to its tenantId via the platform-spine `tenant_member`
 * table. Webhooks have no inbound tenant header — we resolve from the
 * external customer ID Polar carries (`order.customer.externalId` ===
 * our `user.id`), then pin via `withTenantApp` (D-7, Pattern C).
 *
 * Pragmatic raw SQL — `tenant_member` lives in @platform/tenancy/internal
 * and importing the Drizzle table cleanly across packages is awkward for
 * one query. Resolution runs as platform_system to bypass RLS on
 * `tenant_member`.
 *
 * Returns null if the user has no membership (logged + skipped).
 */
async function resolveTenantForUser(userId: string): Promise<string | null> {
  try {
    const result = await withSystemAdminApp(async (tx) => {
      const rs = await tx.execute(
        sql`SELECT tenant_id FROM tenant_member WHERE user_id = ${userId} LIMIT 1`,
      );
      // node-postgres-style result has .rows; drizzle's execute returns the
      // raw QueryResult.
      const rows = (rs as unknown as { rows?: Array<{ tenant_id: string }> }).rows
        ?? (rs as unknown as Array<{ tenant_id: string }>);
      const first = Array.isArray(rows) ? rows[0] : undefined;
      return first?.tenant_id ?? null;
    });
    return result;
  } catch (err) {
    logger.error("[polar] tenant resolution failed", { userId, error: err });
    return null;
  }
}

export const POST = Webhooks({
  webhookSecret: getPolarWebhookSecret(),

  onCheckoutCreated: async (payload) => {
    logger.info("[polar] checkout.created", { checkoutId: payload.data.id });
  },

  onOrderPaid: async (payload) => {
    const order = payload.data;
    const customerEmail = order.customer?.email;
    const externalId = order.customer?.externalId;

    logger.info("[polar] order.paid", {
      orderId: order.id,
      customerEmail,
      externalId,
      productId: order.product?.id,
    });

    // If we have an external user ID, update their subscription record
    if (!externalId) return;

    const tenantId = await resolveTenantForUser(externalId);
    if (!tenantId) {
      logger.warn("[polar] order.paid — no tenant for user, skipping db writes", {
        userId: externalId,
        orderId: order.id,
      });
      return;
    }

    try {
      await withTenantApp({ tenantId, userId: externalId }, async (tx) => {
        await tx
          .insert(subscription)
          .values({
            id: `sub_${order.id}`,
            userId: externalId,
            polarCustomerId: order.customer?.id ?? null,
            polarProductId: order.product?.id ?? null,
            polarSubscriptionId: order.subscription?.id ?? null,
            status: "active",
            currentPeriodEnd: order.subscription?.currentPeriodEnd
              ? new Date(order.subscription.currentPeriodEnd)
              : null,
            metadata: order as unknown as Record<string, unknown>,
          })
          .onConflictDoUpdate({
            target: subscription.userId,
            set: {
              polarCustomerId: order.customer?.id ?? null,
              polarProductId: order.product?.id ?? null,
              polarSubscriptionId: order.subscription?.id ?? null,
              status: "active",
              currentPeriodEnd: order.subscription?.currentPeriodEnd
                ? new Date(order.subscription.currentPeriodEnd)
                : null,
              metadata: order as unknown as Record<string, unknown>,
              updatedAt: new Date(),
            },
          });
      });
      logger.info("[polar] subscription upserted", { userId: externalId });

      // Track purchase in GA4 via Measurement Protocol
      trackPurchase({
        userId: externalId,
        orderId: order.id,
        productId: order.product?.id ?? "unknown",
        value: (order.totalAmount ?? 0) / 100,
      }).catch((err) =>
        logger.error("[ga4] purchase tracking error", { error: err }),
      );
    } catch (err) {
      logger.error("[polar] failed to upsert subscription", { error: err });
    }

    // Book one-time purchase: insert into book_purchase table
    if (BOOK_PRODUCT_ID && order.product?.id === BOOK_PRODUCT_ID) {
      try {
        await withTenantApp({ tenantId, userId: externalId }, async (tx) => {
          await tx.insert(bookPurchase).values({
            id: `bp_${order.id}`,
            userId: externalId,
            polarOrderId: order.id,
            polarCustomerId: order.customer?.id ?? null,
            polarProductId: order.product?.id ?? null,
            status: "active",
            metadata: order as unknown as Record<string, unknown>,
          });
        });
        logger.info("[polar] book purchase recorded", { userId: externalId });
      } catch (err) {
        logger.error("[polar] failed to record book purchase", { error: err });
      }
    }
  },

  onSubscriptionCreated: async (payload) => {
    logger.info("[polar] subscription.created", {
      subscriptionId: payload.data.id,
    });
  },

  onSubscriptionActive: async (payload) => {
    const sub = payload.data;
    const externalId = sub.customer?.externalId;
    if (!externalId) return;

    const tenantId = await resolveTenantForUser(externalId);
    if (!tenantId) {
      logger.warn("[polar] subscription.active — no tenant for user", {
        userId: externalId,
      });
      return;
    }

    try {
      await withTenantApp({ tenantId, userId: externalId }, async (tx) => {
        await tx
          .update(subscription)
          .set({
            status: "active",
            polarSubscriptionId: sub.id,
            currentPeriodEnd: sub.currentPeriodEnd
              ? new Date(sub.currentPeriodEnd)
              : null,
            updatedAt: new Date(),
          })
          .where(eq(subscription.userId, externalId));
      });
      logger.info("[polar] subscription activated", { userId: externalId });
    } catch (err) {
      logger.error("[polar] failed to activate subscription", { error: err });
    }
  },

  onSubscriptionCanceled: async (payload) => {
    const sub = payload.data;
    const externalId = sub.customer?.externalId;
    if (!externalId) return;

    const tenantId = await resolveTenantForUser(externalId);
    if (!tenantId) {
      logger.warn("[polar] subscription.canceled — no tenant for user", {
        userId: externalId,
      });
      return;
    }

    try {
      await withTenantApp({ tenantId, userId: externalId }, async (tx) => {
        await tx
          .update(subscription)
          .set({
            status: "canceled",
            updatedAt: new Date(),
          })
          .where(eq(subscription.userId, externalId));
      });
      logger.info("[polar] subscription canceled", { userId: externalId });
    } catch (err) {
      logger.error("[polar] failed to cancel subscription", { error: err });
    }
  },

  onSubscriptionRevoked: async (payload) => {
    const sub = payload.data;
    const externalId = sub.customer?.externalId;
    if (!externalId) return;

    const tenantId = await resolveTenantForUser(externalId);
    if (!tenantId) {
      logger.warn("[polar] subscription.revoked — no tenant for user", {
        userId: externalId,
      });
      return;
    }

    try {
      await withTenantApp({ tenantId, userId: externalId }, async (tx) => {
        await tx
          .update(subscription)
          .set({
            status: "revoked",
            updatedAt: new Date(),
          })
          .where(eq(subscription.userId, externalId));
      });
      logger.info("[polar] subscription revoked", { userId: externalId });
    } catch (err) {
      logger.error("[polar] failed to revoke subscription", { error: err });
    }
  },
});
