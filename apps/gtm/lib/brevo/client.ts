/**
 * Brevo (ex-Sendinblue) API Client — BYOK pattern.
 * Docs: https://developers.brevo.com/reference
 *
 * Dominant email marketing platform in LATAM. Supports transactional
 * email, campaigns, contacts, and lists.
 */

export interface BrevoContact {
  id: number;
  email: string;
  emailBlacklisted: boolean;
  smsBlacklisted: boolean;
  listIds: number[];
  attributes: Record<string, unknown>;
  createdAt: string;
  modifiedAt: string;
}

export interface BrevoList {
  id: number;
  name: string;
  totalSubscribers: number;
  totalBlacklisted: number;
  folderId: number;
  createdAt: string;
}

export interface BrevoAccountInfo {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  plan: Array<{ type: string; credits: number; creditsType: string }>;
}

export interface BrevoSendResult {
  messageId: string;
}

const BASE_URL = "https://api.brevo.com/v3";

class BrevoClient {
  private async request<T>(
    path: string,
    apiKey: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const headers: Record<string, string> = {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      throw new BrevoError("invalid_key", "Invalid Brevo API key.");
    }
    if (response.status === 429) {
      throw new BrevoError(
        "rate_limited",
        "Brevo rate limit reached. Try again shortly.",
      );
    }
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new BrevoError(
        "api_error",
        `Brevo API error ${response.status}: ${body.slice(0, 200)}`,
      );
    }

    // Some endpoints return 204 No Content
    if (response.status === 204) return {} as T;

    return response.json();
  }

  /** Verify API key by fetching account info */
  async verify(apiKey: string): Promise<{
    email: string;
    companyName: string;
    plan: string;
    emailCredits: number;
  }> {
    const info = await this.request<BrevoAccountInfo>("/account", apiKey);
    const emailPlan = info.plan?.find((p) => p.creditsType === "sendLimit");
    return {
      email: info.email,
      companyName: info.companyName,
      plan: emailPlan?.type || "Free",
      emailCredits: emailPlan?.credits ?? 0,
    };
  }

  /** List contacts (paginated) */
  async getContacts(
    apiKey: string,
    options?: { limit?: number; offset?: number; listId?: number },
  ): Promise<{ contacts: BrevoContact[]; count: number }> {
    const limit = options?.limit ?? 50;
    const offset = options?.offset ?? 0;
    const listParam = options?.listId ? `&listId=${options.listId}` : "";
    return this.request<{ contacts: BrevoContact[]; count: number }>(
      `/contacts?limit=${limit}&offset=${offset}${listParam}`,
      apiKey,
    );
  }

  /** Create or update a contact */
  async upsertContact(
    apiKey: string,
    data: {
      email: string;
      attributes?: Record<string, unknown>;
      listIds?: number[];
      updateEnabled?: boolean;
    },
  ): Promise<{ id?: number }> {
    return this.request<{ id?: number }>("/contacts", apiKey, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        attributes: data.attributes || {},
        listIds: data.listIds || [],
        updateEnabled: data.updateEnabled ?? true,
      }),
    });
  }

  /** Get all contact lists */
  async getLists(
    apiKey: string,
    options?: { limit?: number; offset?: number },
  ): Promise<{ lists: BrevoList[]; count: number }> {
    const limit = options?.limit ?? 50;
    const offset = options?.offset ?? 0;
    return this.request<{ lists: BrevoList[]; count: number }>(
      `/contacts/lists?limit=${limit}&offset=${offset}`,
      apiKey,
    );
  }

  /** Create a contact list */
  async createList(
    apiKey: string,
    data: { name: string; folderId: number },
  ): Promise<{ id: number }> {
    return this.request<{ id: number }>("/contacts/lists", apiKey, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /** Send a transactional email */
  async sendEmail(
    apiKey: string,
    data: {
      to: Array<{ email: string; name?: string }>;
      subject: string;
      htmlContent?: string;
      textContent?: string;
      sender: { name: string; email: string };
      replyTo?: { email: string; name?: string };
      tags?: string[];
    },
  ): Promise<BrevoSendResult> {
    return this.request<BrevoSendResult>("/smtp/email", apiKey, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /** Add contacts to a list */
  async addContactsToList(
    apiKey: string,
    listId: number,
    emails: string[],
  ): Promise<void> {
    await this.request<Record<string, unknown>>(
      `/contacts/lists/${listId}/contacts/add`,
      apiKey,
      {
        method: "POST",
        body: JSON.stringify({ emails }),
      },
    );
  }

  /** Remove contacts from a list */
  async removeContactsFromList(
    apiKey: string,
    listId: number,
    emails: string[],
  ): Promise<void> {
    await this.request<Record<string, unknown>>(
      `/contacts/lists/${listId}/contacts/remove`,
      apiKey,
      {
        method: "POST",
        body: JSON.stringify({ emails }),
      },
    );
  }
}

export class BrevoError extends Error {
  constructor(
    public readonly code: "invalid_key" | "rate_limited" | "api_error",
    message: string,
  ) {
    super(message);
    this.name = "BrevoError";
  }
}

export const brevoClient = new BrevoClient();
