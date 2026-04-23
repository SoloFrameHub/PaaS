import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { connectedAccountService } from "@/lib/services/connectedAccountService";
import { attioClient } from "@/lib/attio/client";
import { hunterClient, HunterError } from "@/lib/hunter/client";
import { pipedriveClient, PipedriveError } from "@/lib/pipedrive/client";
import { brevoClient, BrevoError } from "@/lib/brevo/client";
import { whatsappClient, WhatsAppError } from "@/lib/whatsapp/client";
import { z } from "zod";
import type { IntegrationProvider } from "@/types/execute";

const connectSchema = z.object({
  provider: z.enum([
    "attio",
    "notion",
    "hunter",
    "pipedrive",
    "brevo",
    "whatsapp",
  ]),
  apiKey: z.string().min(1, "API key is required"),
  // WhatsApp requires a second credential (Phone Number ID)
  phoneNumberId: z.string().optional(),
});

export const GET = withAuth(async (_request: NextRequest, { userId }) => {
  const connections = await connectedAccountService.listConnections(userId);
  return successResponse(connections);
});

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const { provider, apiKey, phoneNumberId } = await validateBody(
    request,
    connectSchema,
  );

  // Validate the key by making a test API call
  if (provider === "attio") {
    const result = await attioClient.identify(apiKey);
    await connectedAccountService.connectAccount(
      userId,
      provider as IntegrationProvider,
      apiKey,
      {
        providerAccountId: result.workspace.id,
        providerMetadata: { workspaceName: result.workspace.name },
      },
    );
    return successResponse({
      connected: true,
      provider,
      workspace: result.workspace.name,
    });
  }

  if (provider === "hunter") {
    try {
      const result = await hunterClient.verify(apiKey);
      await connectedAccountService.connectAccount(
        userId,
        provider as IntegrationProvider,
        apiKey,
        {
          providerMetadata: {
            plan: result.plan,
            requestsRemaining: result.requests_remaining,
          },
        },
      );
      return successResponse({ connected: true, provider, plan: result.plan });
    } catch (err) {
      if (err instanceof HunterError) {
        return successResponse({ error: err.message }, 400);
      }
      throw err;
    }
  }

  if (provider === "pipedrive") {
    try {
      const result = await pipedriveClient.verify(apiKey);
      await connectedAccountService.connectAccount(
        userId,
        provider as IntegrationProvider,
        apiKey,
        {
          providerMetadata: {
            companyName: result.companyName,
            userName: result.name,
          },
        },
      );
      return successResponse({
        connected: true,
        provider,
        companyName: result.companyName,
      });
    } catch (err) {
      if (err instanceof PipedriveError) {
        return successResponse({ error: err.message }, 400);
      }
      throw err;
    }
  }

  if (provider === "brevo") {
    try {
      const result = await brevoClient.verify(apiKey);
      await connectedAccountService.connectAccount(
        userId,
        provider as IntegrationProvider,
        apiKey,
        {
          providerMetadata: {
            companyName: result.companyName,
            plan: result.plan,
            emailCredits: result.emailCredits,
          },
        },
      );
      return successResponse({
        connected: true,
        provider,
        companyName: result.companyName,
      });
    } catch (err) {
      if (err instanceof BrevoError) {
        return successResponse({ error: err.message }, 400);
      }
      throw err;
    }
  }

  if (provider === "whatsapp") {
    if (!phoneNumberId) {
      return successResponse(
        { error: "Phone Number ID is required for WhatsApp" },
        400,
      );
    }
    try {
      const result = await whatsappClient.verify(apiKey, phoneNumberId);
      await connectedAccountService.connectAccount(
        userId,
        provider as IntegrationProvider,
        apiKey,
        {
          providerAccountId: phoneNumberId,
          providerMetadata: {
            phoneNumber: result.phoneNumber,
            verifiedName: result.verifiedName,
            qualityRating: result.qualityRating,
          },
        },
      );
      return successResponse({
        connected: true,
        provider,
        phoneNumber: result.phoneNumber,
        verifiedName: result.verifiedName,
      });
    } catch (err) {
      if (err instanceof WhatsAppError) {
        return successResponse({ error: err.message }, 400);
      }
      throw err;
    }
  }

  // Notion uses OAuth, not API key — handled by separate /api/notion/authorize flow
  return successResponse({ error: "Use OAuth flow for Notion" }, 400);
});
