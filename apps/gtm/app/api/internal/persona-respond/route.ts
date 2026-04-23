import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { personaService } from "@/lib/services/personaService";
import { logger } from "@/lib/logger";

const ADMIN_SECRET = process.env.ADMIN_API_SECRET;

/**
 * POST /api/internal/persona-respond
 * Called by Trigger.dev after a durable delay (10-60 min).
 * Generates and posts an AI persona response to a forum thread.
 * Protected by ADMIN_API_SECRET.
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (
    !ADMIN_SECRET ||
    !token ||
    token.length !== ADMIN_SECRET.length ||
    !timingSafeEqual(Buffer.from(token), Buffer.from(ADMIN_SECRET))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { personaId, podId, threadId } = await request.json();

    if (!personaId || !podId || !threadId) {
      return NextResponse.json(
        { error: "Missing required fields: personaId, podId, threadId" },
        { status: 400 },
      );
    }

    const posted = await personaService.generatePersonaResponse({
      personaId,
      podId,
      threadId,
    });

    if (!posted) {
      // Rate limited, faded out, or empty response — not an error
      return NextResponse.json(
        { success: false, reason: "skipped" },
        { status: 409 },
      );
    }

    return NextResponse.json({ success: true, personaId, podId, threadId });
  } catch (error) {
    logger.error("Persona respond failed", { error });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 },
    );
  }
}
