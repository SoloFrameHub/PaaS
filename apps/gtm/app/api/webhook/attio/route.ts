import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";
import type { AttioWebhookPayload } from "@/lib/attio/types";

/**
 * POST /api/webhook/attio
 * Handles incoming Attio webhooks for deal stage changes.
 * Validates HMAC signature via ATTIO_WEBHOOK_SECRET.
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
      const db = getDb();
      if (db && payload.data?.id) {
        const attioRecordId =
          payload.data.id.record_id || payload.data.id.entry_id;
        if (attioRecordId) {
          // Find matching pipeline deal
          const [deal] = await db
            .select()
            .from(schema.pipelineDeal)
            .where(eq(schema.pipelineDeal.attioRecordId, attioRecordId))
            .limit(1);

          if (deal) {
            logger.info("Attio webhook: matched deal", {
              dealId: deal.id,
              attioRecordId,
              eventType: payload.type,
            });
            // Stage sync would be handled here once Attio custom attributes are mapped
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
