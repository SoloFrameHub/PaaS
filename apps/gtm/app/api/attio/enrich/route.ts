import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { connectedAccountService } from "@/lib/services/connectedAccountService";
import { attioClient } from "@/lib/attio/client";

/**
 * GET /api/attio/enrich?type=company&value=example.com
 * GET /api/attio/enrich?type=person&value=user@example.com
 *
 * Returns enriched Attio record attributes for a domain or email.
 * Returns { connected: false } if Attio is not connected.
 * Returns { data: null } if no record found (not an error).
 */
export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const value = searchParams.get("value");

  if (!type || !value || (type !== "company" && type !== "person")) {
    return successResponse(
      { error: "type (company|person) and value are required" },
      400,
    );
  }

  const connection = await connectedAccountService.getConnection(
    userId,
    "attio",
  );
  if (!connection) {
    return successResponse({ connected: false, data: null });
  }

  const record =
    type === "company"
      ? await attioClient.getCompanyRecord(connection.accessToken, value)
      : await attioClient.getPersonRecord(connection.accessToken, value);

  return successResponse({ connected: true, data: record });
});
