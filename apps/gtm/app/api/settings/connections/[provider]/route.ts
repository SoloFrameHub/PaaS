import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse } from "@/lib/api/response-utils";
import { connectedAccountService } from "@/lib/services/connectedAccountService";
import type { IntegrationProvider } from "@/types/execute";

const VALID_PROVIDERS = new Set([
  "attio",
  "notion",
  "hunter",
  "pipedrive",
  "brevo",
  "whatsapp",
]);

export const DELETE = withAuth(
  async (_request: NextRequest, { userId }, context) => {
    const { provider } = await context.params;

    if (!VALID_PROVIDERS.has(provider)) {
      return successResponse({ error: "Invalid provider" }, 400);
    }

    await connectedAccountService.disconnectAccount(
      userId,
      provider as IntegrationProvider,
    );
    return successResponse({ disconnected: true, provider });
  },
);
