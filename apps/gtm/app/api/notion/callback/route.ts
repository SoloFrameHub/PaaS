import { NextRequest, NextResponse } from "next/server";
import { notionClient } from "@/lib/notion/client";
import { connectedAccountService } from "@/lib/services/connectedAccountService";
import { logger } from "@/lib/logger";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**
 * GET /api/notion/callback
 * Handles the Notion OAuth redirect after user authorization.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    logger.warn("Notion OAuth denied", { error });
    return NextResponse.redirect(
      `${APP_URL}/settings/apps?error=notion_denied`,
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${APP_URL}/settings/apps?error=invalid_callback`,
    );
  }

  // Validate state cookie
  const storedState = request.cookies.get("notion_oauth_state")?.value;
  if (!storedState || storedState !== state) {
    logger.warn("Notion OAuth state mismatch");
    return NextResponse.redirect(
      `${APP_URL}/settings/apps?error=state_mismatch`,
    );
  }

  // Extract userId from state (format: userId:randomHex)
  const userId = state.split(":")[0];
  if (!userId) {
    return NextResponse.redirect(
      `${APP_URL}/settings/apps?error=invalid_state`,
    );
  }

  try {
    const tokenResponse = await notionClient.exchangeCode(code);

    await connectedAccountService.connectAccount(
      userId,
      "notion",
      tokenResponse.access_token,
      {
        providerAccountId: tokenResponse.workspace_id,
        providerMetadata: {
          workspaceName: tokenResponse.workspace_name,
          botId: tokenResponse.bot_id,
        },
      },
    );

    logger.info("Notion connected", {
      userId,
      workspace: tokenResponse.workspace_name,
    });

    const response = NextResponse.redirect(
      `${APP_URL}/settings/apps?connected=notion`,
    );
    response.cookies.delete("notion_oauth_state");
    return response;
  } catch (err) {
    logger.error("Notion OAuth exchange failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.redirect(
      `${APP_URL}/settings/apps?error=notion_failed`,
    );
  }
}
