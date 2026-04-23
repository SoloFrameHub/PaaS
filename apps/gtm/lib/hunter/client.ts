/**
 * Hunter.io API Client — BYOK pattern (user provides their own API key).
 * Docs: https://hunter.io/api-documentation/v2
 */

export interface HunterEmail {
  value: string;
  type: "personal" | "generic";
  confidence: number;
  first_name: string | null;
  last_name: string | null;
  position: string | null;
  linkedin_url: string | null;
  phone_number: string | null;
}

export interface HunterDomainSearchResult {
  domain: string;
  organization: string | null;
  description: string | null;
  industry: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  instagram: string | null;
  youtube: string | null;
  technologies: string[];
  country: string | null;
  state: string | null;
  city: string | null;
  postal_code: string | null;
  street: string | null;
  headcount: string | null;
  company_type: string | null;
  emails: HunterEmail[];
  pattern: string | null;
}

export interface HunterEmailFinderResult {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  score: number;
  domain: string;
  position: string | null;
  company: string | null;
  sources: Array<{ domain: string; uri: string; extracted_on: string }>;
}

export interface HunterVerifyResult {
  result: "deliverable" | "undeliverable" | "risky" | "unknown";
  score: number;
  email: string;
  regexp: boolean;
  gibberish: boolean;
  disposable: boolean;
  webmail: boolean;
  mx_records: boolean;
  smtp_server: boolean;
  smtp_check: boolean;
  accept_all: boolean;
  block: boolean;
}

const BASE_URL = "https://api.hunter.io/v2";

class HunterClient {
  private async request<T>(
    path: string,
    apiKey: string,
  ): Promise<{ data: T; meta?: Record<string, unknown> }> {
    const url = `${BASE_URL}${path}&api_key=${apiKey}`;
    const response = await fetch(url, {
      headers: { "User-Agent": "SoloFrameHub/1.0" },
    });

    if (response.status === 401) {
      throw new HunterError("invalid_key", "Invalid Hunter API key.");
    }
    if (response.status === 402) {
      throw new HunterError(
        "no_credits",
        "Your Hunter account is out of credits. Top up at hunter.io/dashboard.",
      );
    }
    if (response.status === 429) {
      throw new HunterError(
        "rate_limited",
        "Hunter rate limit reached. Try again in a few seconds.",
      );
    }
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new HunterError(
        "api_error",
        `Hunter API error ${response.status}: ${body.slice(0, 200)}`,
      );
    }

    return response.json();
  }

  /**
   * Search emails associated with a domain.
   * Returns up to `limit` verified email addresses found at the domain.
   */
  async domainSearch(
    apiKey: string,
    domain: string,
    limit = 10,
  ): Promise<HunterDomainSearchResult> {
    const result = await this.request<HunterDomainSearchResult>(
      `/domain-search?domain=${encodeURIComponent(domain)}&limit=${limit}`,
      apiKey,
    );
    return result.data;
  }

  /**
   * Find a specific person's email given their name + domain.
   */
  async emailFinder(
    apiKey: string,
    domain: string,
    firstName: string,
    lastName: string,
  ): Promise<HunterEmailFinderResult> {
    const result = await this.request<HunterEmailFinderResult>(
      `/email-finder?domain=${encodeURIComponent(domain)}&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}`,
      apiKey,
    );
    return result.data;
  }

  /**
   * Verify that an API key is valid by hitting the account endpoint.
   */
  async verify(
    apiKey: string,
  ): Promise<{ plan: string; requests_remaining: number }> {
    const result = await this.request<{
      plan_name: string;
      requests: { searches: { available: number } };
    }>(`/account?api_key_placeholder=true`, apiKey);
    return {
      plan: result.data.plan_name,
      requests_remaining: result.data.requests?.searches?.available ?? 0,
    };
  }
}

export class HunterError extends Error {
  constructor(
    public readonly code:
      | "invalid_key"
      | "no_credits"
      | "rate_limited"
      | "api_error",
    message: string,
  ) {
    super(message);
    this.name = "HunterError";
  }
}

export const hunterClient = new HunterClient();
