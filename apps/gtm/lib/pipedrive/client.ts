/**
 * Pipedrive API Client — BYOK pattern (user provides their own API key).
 * Docs: https://developers.pipedrive.com/docs/api/v1
 *
 * Popular CRM in LATAM (Brazil, Mexico, Colombia, Argentina).
 */

import { logger } from "@/lib/logger";

export interface PipedriveDeal {
  id: number;
  title: string;
  value: number;
  currency: string;
  status: "open" | "won" | "lost" | "deleted";
  stage_id: number;
  pipeline_id: number;
  person_id: number | null;
  org_id: number | null;
  expected_close_date: string | null;
  lost_reason: string | null;
  add_time: string;
  update_time: string;
}

export interface PipedrivePerson {
  id: number;
  name: string;
  email: Array<{ value: string; primary: boolean }>;
  phone: Array<{ value: string; primary: boolean }>;
  org_id: number | null;
  add_time: string;
  update_time: string;
}

export interface PipedriveOrganization {
  id: number;
  name: string;
  address: string | null;
  cc_email: string | null;
  add_time: string;
  update_time: string;
}

export interface PipedriveStage {
  id: number;
  name: string;
  pipeline_id: number;
  order_nr: number;
}

export interface PipedrivePipeline {
  id: number;
  name: string;
  url_title: string;
  order_nr: number;
  active: boolean;
}

export interface PipedriveUser {
  id: number;
  name: string;
  email: string;
  company_id: number;
  company_name: string;
  language: { language_code: string; country_code: string };
}

const BASE_URL = "https://api.pipedrive.com/v1";

class PipedriveClient {
  private async request<T>(
    path: string,
    apiToken: string,
    options: RequestInit = {},
  ): Promise<T> {
    const separator = path.includes("?") ? "&" : "?";
    const url = `${BASE_URL}${path}${separator}api_token=${apiToken}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      throw new PipedriveError("invalid_key", "Invalid Pipedrive API token.");
    }
    if (response.status === 429) {
      throw new PipedriveError(
        "rate_limited",
        "Pipedrive rate limit reached. Try again shortly.",
      );
    }
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new PipedriveError(
        "api_error",
        `Pipedrive API error ${response.status}: ${body.slice(0, 200)}`,
      );
    }

    const json = (await response.json()) as {
      success: boolean;
      data: T;
      error?: string;
    };

    if (!json.success) {
      throw new PipedriveError(
        "api_error",
        json.error || "Pipedrive API returned success=false",
      );
    }

    return json.data;
  }

  /** Verify API token by fetching current user info */
  async verify(
    apiToken: string,
  ): Promise<{ name: string; email: string; companyName: string }> {
    const user = await this.request<PipedriveUser>("/users/me", apiToken);
    return {
      name: user.name,
      email: user.email,
      companyName: user.company_name,
    };
  }

  /** List deals (paginated) */
  async getDeals(
    apiToken: string,
    options?: { start?: number; limit?: number; status?: string },
  ): Promise<PipedriveDeal[]> {
    const start = options?.start ?? 0;
    const limit = options?.limit ?? 100;
    const status = options?.status ?? "all_not_deleted";
    return (
      (await this.request<PipedriveDeal[]>(
        `/deals?start=${start}&limit=${limit}&status=${status}`,
        apiToken,
      )) || []
    );
  }

  /** Create a deal */
  async createDeal(
    apiToken: string,
    data: {
      title: string;
      value?: number;
      currency?: string;
      person_id?: number;
      org_id?: number;
      stage_id?: number;
      expected_close_date?: string;
    },
  ): Promise<PipedriveDeal> {
    return this.request<PipedriveDeal>("/deals", apiToken, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /** Update a deal (e.g. change stage) */
  async updateDeal(
    apiToken: string,
    dealId: number,
    data: Partial<{
      title: string;
      value: number;
      stage_id: number;
      status: "open" | "won" | "lost";
      lost_reason: string;
    }>,
  ): Promise<PipedriveDeal> {
    return this.request<PipedriveDeal>(`/deals/${dealId}`, apiToken, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /** List persons (contacts) */
  async getPersons(
    apiToken: string,
    options?: { start?: number; limit?: number },
  ): Promise<PipedrivePerson[]> {
    const start = options?.start ?? 0;
    const limit = options?.limit ?? 100;
    return (
      (await this.request<PipedrivePerson[]>(
        `/persons?start=${start}&limit=${limit}`,
        apiToken,
      )) || []
    );
  }

  /** Create a person (contact) */
  async createPerson(
    apiToken: string,
    data: {
      name: string;
      email?: string[];
      phone?: string[];
      org_id?: number;
    },
  ): Promise<PipedrivePerson> {
    const body: Record<string, unknown> = { name: data.name };
    if (data.email?.length) body.email = data.email.map((v) => ({ value: v }));
    if (data.phone?.length) body.phone = data.phone.map((v) => ({ value: v }));
    if (data.org_id) body.org_id = data.org_id;

    return this.request<PipedrivePerson>("/persons", apiToken, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /** List pipelines */
  async getPipelines(apiToken: string): Promise<PipedrivePipeline[]> {
    return (
      (await this.request<PipedrivePipeline[]>("/pipelines", apiToken)) || []
    );
  }

  /** List stages of a pipeline */
  async getStages(
    apiToken: string,
    pipelineId?: number,
  ): Promise<PipedriveStage[]> {
    const path = pipelineId ? `/stages?pipeline_id=${pipelineId}` : "/stages";
    return (await this.request<PipedriveStage[]>(path, apiToken)) || [];
  }

  /** Search persons by term (name or email) */
  async searchPersons(
    apiToken: string,
    term: string,
    limit = 10,
  ): Promise<
    Array<{ id: number; name: string; emails: string[]; phones: string[] }>
  > {
    const results = await this.request<{
      items: Array<{ item: PipedrivePerson }>;
    }>(
      `/persons/search?term=${encodeURIComponent(term)}&limit=${limit}`,
      apiToken,
    );
    return (results?.items || []).map((r) => ({
      id: r.item.id,
      name: r.item.name,
      emails: r.item.email?.map((e) => e.value) || [],
      phones: r.item.phone?.map((p) => p.value) || [],
    }));
  }
}

export class PipedriveError extends Error {
  constructor(
    public readonly code: "invalid_key" | "rate_limited" | "api_error",
    message: string,
  ) {
    super(message);
    this.name = "PipedriveError";
  }
}

export const pipedriveClient = new PipedriveClient();
