/**
 * Attio API Client — singleton with retry logic.
 * Follows the NodeBB client pattern.
 */

import { logger } from "@/lib/logger";
import type { AttioRecord, AttioIdentifyResponse } from "./types";

class AttioClient {
  private get baseUrl(): string {
    return "https://api.attio.com/v2";
  }
  private get maxRetries(): number {
    return 3;
  }

  private async fetchWithRetry(
    path: string,
    options: RequestInit,
    apiKey: string,
    attempt: number = 0,
  ): Promise<Response> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    const response = await fetch(url, { ...options, headers });

    if (
      (response.status === 429 || response.status >= 500) &&
      attempt < this.maxRetries
    ) {
      const delay = Math.pow(2, attempt) * 500;
      logger.warn("Attio API retry", {
        path,
        status: response.status,
        attempt,
        delay,
      });
      await new Promise((r) => setTimeout(r, delay));
      return this.fetchWithRetry(path, options, apiKey, attempt + 1);
    }

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(
        `Attio API error ${response.status}: ${body.slice(0, 500)}`,
      );
    }

    return response;
  }

  async get<T>(path: string, apiKey: string): Promise<T> {
    const response = await this.fetchWithRetry(path, { method: "GET" }, apiKey);
    return response.json();
  }

  async post<T>(
    path: string,
    body: Record<string, unknown>,
    apiKey: string,
  ): Promise<T> {
    const response = await this.fetchWithRetry(
      path,
      { method: "POST", body: JSON.stringify(body) },
      apiKey,
    );
    return response.json();
  }

  async patch<T>(
    path: string,
    body: Record<string, unknown>,
    apiKey: string,
  ): Promise<T> {
    const response = await this.fetchWithRetry(
      path,
      { method: "PATCH", body: JSON.stringify(body) },
      apiKey,
    );
    return response.json();
  }

  async put<T>(
    path: string,
    body: Record<string, unknown>,
    apiKey: string,
  ): Promise<T> {
    const response = await this.fetchWithRetry(
      path,
      { method: "PUT", body: JSON.stringify(body) },
      apiKey,
    );
    return response.json();
  }

  // ── Domain Methods ───────────────────────────────────────────

  /** Verify the API key is valid by calling /self */
  async identify(apiKey: string): Promise<AttioIdentifyResponse> {
    return this.get<AttioIdentifyResponse>("/self", apiKey);
  }

  /** Create or update a person by email (upsert) */
  async assertPerson(
    apiKey: string,
    data: { email: string; name?: string; [key: string]: unknown },
  ): Promise<{ data: AttioRecord }> {
    const values: Record<string, unknown> = {
      email_addresses: [data.email],
    };
    if (data.name) {
      const nameParts = data.name.split(" ");
      values.name = [
        {
          first_name: nameParts[0],
          last_name: nameParts.slice(1).join(" ") || "",
        },
      ];
    }
    return this.put<{ data: AttioRecord }>(
      "/objects/people/records?matching_attribute=email_addresses",
      { data: { values } },
      apiKey,
    );
  }

  /** Create or update a company by domain (upsert) */
  async assertCompany(
    apiKey: string,
    data: { name: string; domain?: string },
  ): Promise<{ data: AttioRecord }> {
    const values: Record<string, unknown> = {
      name: [{ value: data.name }],
    };
    if (data.domain) {
      values.domains = [data.domain];
    }
    return data.domain
      ? this.put<{ data: AttioRecord }>(
          "/objects/companies/records?matching_attribute=domains",
          { data: { values } },
          apiKey,
        )
      : this.post<{ data: AttioRecord }>(
          "/objects/companies/records",
          { data: { values } },
          apiKey,
        );
  }

  /** Create a note on a person or company record */
  async createNote(
    apiKey: string,
    data: {
      parentObject: "people" | "companies";
      parentRecordId: string;
      title: string;
      content: string;
    },
  ): Promise<{ data: { id: string } }> {
    return this.post<{ data: { id: string } }>(
      "/notes",
      {
        data: {
          parent_object: data.parentObject,
          parent_record_id: data.parentRecordId,
          title: data.title,
          format: "plaintext",
          content: data.content,
        },
      },
      apiKey,
    );
  }

  /** Query records from an object */
  async queryRecords(
    apiKey: string,
    objectSlug: string,
    filter?: Record<string, unknown>,
    limit: number = 100,
  ): Promise<{ data: AttioRecord[] }> {
    return this.post<{ data: AttioRecord[] }>(
      `/objects/${objectSlug}/records/query`,
      { filter: filter || {}, limit },
      apiKey,
    );
  }

  /**
   * Fetch enriched company record by domain.
   * Returns null if not found or Attio is unreachable.
   */
  async getCompanyRecord(
    apiKey: string,
    domain: string,
  ): Promise<AttioRecord | null> {
    try {
      const result = await this.post<{ data: AttioRecord[] }>(
        "/objects/companies/records/query",
        { filter: { domains: { $eq: domain } }, limit: 1 },
        apiKey,
      );
      return result.data[0] ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Fetch enriched person record by email.
   * Returns null if not found or Attio is unreachable.
   */
  async getPersonRecord(
    apiKey: string,
    email: string,
  ): Promise<AttioRecord | null> {
    try {
      const result = await this.post<{ data: AttioRecord[] }>(
        "/objects/people/records/query",
        { filter: { email_addresses: { $eq: email } }, limit: 1 },
        apiKey,
      );
      return result.data[0] ?? null;
    } catch {
      return null;
    }
  }
}

export const attioClient = new AttioClient();
