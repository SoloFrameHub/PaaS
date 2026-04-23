import { Webhooks } from "@polar-sh/nextjs";
import { getDb } from "@/lib/db";
import { subscription, bookPurchase } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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
    if (externalId) {
      const db = getDb();
      if (db) {
        try {
          await db
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
          logger.info("[polar] subscription upserted", { userId: externalId });

          // Track purchase in GA4 via Measurement Protocol
          trackPurchase({
            userId: externalId,
            orderId: order.id,
            productId: order.product?.id ?? "unknown",
            value: (order.amount ?? 0) / 100,
          }).catch((err) =>
            logger.error("[ga4] purchase tracking error", { error: err }),
          );
        } catch (err) {
          logger.error("[polar] failed to upsert subscription", { error: err });
        }

        // Book one-time purchase: insert into book_purchase table
        if (BOOK_PRODUCT_ID && order.product?.id === BOOK_PRODUCT_ID) {
          try {
            await db.insert(bookPurchase).values({
              id: `bp_${order.id}`,
              userId: externalId,
              polarOrderId: order.id,
              polarCustomerId: order.customer?.id ?? null,
              polarProductId: order.product?.id ?? null,
              status: "active",
              metadata: order as unknown as Record<string, unknown>,
            });
            logger.info("[polar] book purchase recorded", {
              userId: externalId,
            });
          } catch (err) {
            logger.error("[polar] failed to record book purchase", {
              error: err,
            });
          }
        }
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

    if (externalId) {
      const db = getDb();
      if (db) {
        try {
          await db
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
          logger.info("[polar] subscription activated", { userId: externalId });
        } catch (err) {
          logger.error("[polar] failed to activate subscription", {
            error: err,
          });
        }
      }
    }
  },

  onSubscriptionCanceled: async (payload) => {
    const sub = payload.data;
    const externalId = sub.customer?.externalId;

    if (externalId) {
      const db = getDb();
      if (db) {
        try {
          await db
            .update(subscription)
            .set({
              status: "canceled",
              updatedAt: new Date(),
            })
            .where(eq(subscription.userId, externalId));
          logger.info("[polar] subscription canceled", { userId: externalId });
        } catch (err) {
          logger.error("[polar] failed to cancel subscription", { error: err });
        }
      }
    }
  },

  onSubscriptionRevoked: async (payload) => {
    const sub = payload.data;
    const externalId = sub.customer?.externalId;

    if (externalId) {
      const db = getDb();
      if (db) {
        try {
          await db
            .update(subscription)
            .set({
              status: "revoked",
              updatedAt: new Date(),
            })
            .where(eq(subscription.userId, externalId));
          logger.info("[polar] subscription revoked", { userId: externalId });
        } catch (err) {
          logger.error("[polar] failed to revoke subscription", { error: err });
        }
      }
    }
  },
});
