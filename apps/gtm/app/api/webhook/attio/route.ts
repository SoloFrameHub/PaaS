import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { schema } from "@/lib/db";
import { withSystemAdminApp } from "@/lib/db/with-tenant";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";
import type { AttioWebhookPayload } from "@/lib/attio/types";

/**
 * POST /api/webhook/attio
 * Handles incoming Attio webhooks for deal stage changes.
 * Validates HMAC signature via ATTIO_WEBHOOK_SECRET.
 *
 * Pattern C (resolve-then-pin) — Attio doesn't carry our tenant header,
 * so we look up the matching `pipeline_deal` by `attioRecordId` under
 * platform_system to read its `tenant_id`, then would re-enter
 * withTenantApp for any subsequent stage-sync writes (D-7).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.ATTIO_WEBHOOK_SECRET;
  if (!secret) {
    logger.error("ATTIO_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  // Validate HMAC signature
  const signature = request.headers.get("attio-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const body = await request.text();

  const expected = createHmac("sha256", secret).update(body).digest("hex");
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body) as AttioWebhookPayload;

  try {
    // Handle deal/entry stage changes
    if (
      payload.type === "list-entry.updated" ||
      payload.type === "record.updated"
    ) {
      if (payload.data?.id) {
        const attioRecordId =
          payload.data.id.record_id || payload.data.id.entry_id;
        if (attioRecordId) {
          // Cross-tenant lookup: find the pipeline deal that owns this
          // Attio record id, then use its tenantId to pin any subsequent
          // writes via withTenantApp.
          const deal = await withSystemAdminApp(async (tx) => {
            const [row] = await tx
              .select()
              .from(schema.pipelineDeal)
              .where(eq(schema.pipelineDeal.attioRecordId, attioRecordId))
              .limit(1);
            return row;
          });

          if (deal) {
            logger.info("Attio webhook: matched deal", {
              dealId: deal.id,
              attioRecordId,
              eventType: payload.type,
              tenantId: deal.tenantId,
            });
            // Stage-sync writes would go here — pinned to the deal's tenant.
            // Example shape (left as a noop until Attio attribute mapping lands):
            //   await withTenantApp({ tenantId: deal.tenantId }, async (tx) => {
            //     await tx.update(schema.pipelineDeal)
            //       .set({ stage: nextStage })
            //       .where(eq(schema.pipelineDeal.id, deal.id));
            //   });
          }
        }
      }
    }

    logger.info("Attio webhook processed", {
      type: payload.type,
      id: payload.id,
    });
    return NextResponse.json({ received: true });
  } catch (err) {
    logger.error("Attio webhook error", {
      error: err instanceof Error ? err.message : String(err),
      type: payload.type,
    });
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
