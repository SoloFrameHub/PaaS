/**
 * GET /api/hunter/domain-search?domain=example.com
 *
 * Proxies a Hunter.io domain search using the user's BYOK API key.
 * Results are returned to the client — nothing is persisted.
 */

import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { connectedAccountService } from "@/lib/services/connectedAccountService";
import { hunterClient, HunterError } from "@/lib/hunter/client";
import { isRateLimited, EXPENSIVE_RATE_LIMIT } from "@/lib/security";

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const { limited } = await isRateLimited(
    userId,
    EXPENSIVE_RATE_LIMIT,
    "hunter",
  );
  if (limited) {
    return successResponse(
      { error: "Rate limit exceeded. Please try again later." },
      429,
    );
  }

  const domain = request.nextUrl.searchParams.get("domain")?.trim();

  if (!domain) {
    return successResponse({ error: "domain parameter is required" }, 400);
  }

  const connection = await connectedAccountService.getConnection(
    userId,
    "hunter",
  );
  if (!connection) {
    return successResponse({ connected: false, data: null });
  }

  try {
    const data = await hunterClient.domainSearch(
      connection.accessToken,
      domain,
    );
    return successResponse({ connected: true, data });
  } catch (err) {
    if (err instanceof HunterError) {
      return successResponse(
        { connected: true, error: { code: err.code, message: err.message } },
        err.code === "invalid_key" ? 401 : 400,
      );
    }
    throw err;
  }
});
