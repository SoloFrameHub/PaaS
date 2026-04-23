/**
 * WhatsApp Business Cloud API Client — BYOK pattern.
 * Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
 *
 * Essential for LATAM market — WhatsApp is THE business communication
 * channel across Latin America. Users provide their own Meta Business
 * access token and Phone Number ID.
 *
 * Setup: Meta Business Suite → WhatsApp → API Setup → generate token.
 */

export interface WhatsAppMessage {
  messaging_product: "whatsapp";
  to: string;
  type: "text" | "template" | "interactive";
  text?: { body: string; preview_url?: boolean };
  template?: {
    name: string;
    language: { code: string };
    components?: Array<{
      type: "body" | "header";
      parameters: Array<{ type: "text"; text: string }>;
    }>;
  };
}

export interface WhatsAppSendResult {
  messaging_product: "whatsapp";
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string }>;
}

export interface WhatsAppBusinessProfile {
  about: string;
  address: string;
  description: string;
  email: string;
  vertical: string;
  websites: string[];
  profile_picture_url?: string;
}

export interface WhatsAppPhoneNumber {
  id: string;
  display_phone_number: string;
  verified_name: string;
  quality_rating: string;
}

const GRAPH_API_VERSION = "v21.0";
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

class WhatsAppClient {
  private async request<T>(
    path: string,
    accessToken: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
      throw new WhatsAppError(
        "invalid_token",
        "Invalid or expired WhatsApp access token. Generate a new one in Meta Business Suite.",
      );
    }
    if (response.status === 429) {
      throw new WhatsAppError(
        "rate_limited",
        "WhatsApp API rate limit reached. Try again shortly.",
      );
    }
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      // Parse Meta error format
      try {
        const parsed = JSON.parse(body);
        const msg =
          parsed.error?.message || parsed.error?.error_user_msg || body;
        throw new WhatsAppError(
          "api_error",
          `WhatsApp API error: ${msg.slice(0, 300)}`,
        );
      } catch (e) {
        if (e instanceof WhatsAppError) throw e;
        throw new WhatsAppError(
          "api_error",
          `WhatsApp API error ${response.status}: ${body.slice(0, 200)}`,
        );
      }
    }

    return response.json();
  }

  /**
   * Verify credentials by fetching the phone number details.
   * Requires: accessToken + phoneNumberId.
   */
  async verify(
    accessToken: string,
    phoneNumberId: string,
  ): Promise<{
    phoneNumber: string;
    verifiedName: string;
    qualityRating: string;
  }> {
    const data = await this.request<WhatsAppPhoneNumber>(
      `/${phoneNumberId}?fields=display_phone_number,verified_name,quality_rating`,
      accessToken,
    );
    return {
      phoneNumber: data.display_phone_number,
      verifiedName: data.verified_name,
      qualityRating: data.quality_rating,
    };
  }

  /** Send a text message */
  async sendText(
    accessToken: string,
    phoneNumberId: string,
    to: string,
    text: string,
    previewUrl = false,
  ): Promise<WhatsAppSendResult> {
    return this.request<WhatsAppSendResult>(
      `/${phoneNumberId}/messages`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: text, preview_url: previewUrl },
        }),
      },
    );
  }

  /**
   * Send a pre-approved template message.
   * Templates must be approved in Meta Business Manager first.
   * Common for LATAM: follow-up, meeting confirmation, proposal sent.
   */
  async sendTemplate(
    accessToken: string,
    phoneNumberId: string,
    to: string,
    templateName: string,
    languageCode: string,
    bodyParams?: string[],
  ): Promise<WhatsAppSendResult> {
    const components: WhatsAppMessage["template"][] = [];
    const template: WhatsAppMessage["template"] = {
      name: templateName,
      language: { code: languageCode },
    };
    if (bodyParams?.length) {
      template.components = [
        {
          type: "body",
          parameters: bodyParams.map((text) => ({ type: "text", text })),
        },
      ];
    }

    return this.request<WhatsAppSendResult>(
      `/${phoneNumberId}/messages`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "template",
          template,
        }),
      },
    );
  }

  /** Get business profile information */
  async getBusinessProfile(
    accessToken: string,
    phoneNumberId: string,
  ): Promise<WhatsAppBusinessProfile> {
    const result = await this.request<{
      data: WhatsAppBusinessProfile[];
    }>(
      `/${phoneNumberId}/whatsapp_business_profile?fields=about,address,description,email,vertical,websites,profile_picture_url`,
      accessToken,
    );
    return result.data[0];
  }

  /**
   * Mark a received message as read.
   * Useful for webhook-driven flows.
   */
  async markRead(
    accessToken: string,
    phoneNumberId: string,
    messageId: string,
  ): Promise<void> {
    await this.request<{ success: boolean }>(
      `/${phoneNumberId}/messages`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
          messaging_product: "whatsapp",
          status: "read",
          message_id: messageId,
        }),
      },
    );
  }
}

export class WhatsAppError extends Error {
  constructor(
    public readonly code: "invalid_token" | "rate_limited" | "api_error",
    message: string,
  ) {
    super(message);
    this.name = "WhatsAppError";
  }
}

export const whatsappClient = new WhatsAppClient();
