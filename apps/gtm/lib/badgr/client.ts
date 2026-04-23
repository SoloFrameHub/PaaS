/**
 * Badgr API Client — Open Badges 3.0
 * Issues digital badge assertions to certified founders.
 *
 * Configure via environment variables:
 *   BADGR_BASE_URL      — default: https://api.badgr.io
 *   BADGR_USERNAME      — Badgr account email
 *   BADGR_PASSWORD      — Badgr account password
 *   BADGR_ISSUER_ID     — Issuer entity ID from badgr.com/issuer/<id>
 *   BADGR_BADGE_EN_ID   — Badge class ID for EN certification
 *   BADGR_BADGE_ES_ID   — Badge class ID for ES certification
 */

import { logger } from "@/lib/logger";

const BASE_URL = process.env.BADGR_BASE_URL ?? "https://api.badgr.io";
const ISSUER_ID = process.env.BADGR_ISSUER_ID ?? "";
const BADGE_EN_ID = process.env.BADGR_BADGE_EN_ID ?? "";
const BADGE_ES_ID = process.env.BADGR_BADGE_ES_ID ?? "";

export interface BadgrAssertion {
  assertionId: string;
  assertionUrl: string;
  badgeUrl: string;
  recipientEmail: string;
  issuedOn: string;
}

class BadgrClient {
  private tokenCache: { token: string; expiresAt: number } | null = null;

  private async getAccessToken(): Promise<string> {
    if (this.tokenCache && Date.now() < this.tokenCache.expiresAt) {
      return this.tokenCache.token;
    }

    const res = await fetch(`${BASE_URL}/o/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: process.env.BADGR_USERNAME ?? "",
        password: process.env.BADGR_PASSWORD ?? "",
      }),
    });

    if (!res.ok) {
      throw new Error(`Badgr auth failed: ${res.status}`);
    }

    const json = await res.json();
    this.tokenCache = {
      token: json.access_token,
      expiresAt: Date.now() + (json.expires_in - 60) * 1000,
    };
    return this.tokenCache.token;
  }

  /**
   * Issue a badge assertion to a recipient email.
   * Returns null (with a warning) if Badgr is not configured — cert is still stored locally.
   */
  async issueAssertion(
    recipientEmail: string,
    locale: "en" | "es",
    certId: string,
  ): Promise<BadgrAssertion | null> {
    if (!ISSUER_ID || !BADGE_EN_ID) {
      logger.warn("Badgr not configured — skipping remote badge issuance", {
        certId,
      });
      return null;
    }

    const badgeClassId =
      locale === "es" ? BADGE_ES_ID || BADGE_EN_ID : BADGE_EN_ID;

    try {
      const token = await this.getAccessToken();
      const res = await fetch(
        `${BASE_URL}/v2/issuers/${ISSUER_ID}/assertions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            badgeclass: badgeClassId,
            recipient: {
              identity: recipientEmail,
              type: "email",
              hashed: false,
            },
            narrative: `Certified Solo GTM Practitioner — cert ID ${certId}`,
            evidence: [
              { url: `https://soloframehub.com/certification/criteria` },
            ],
          }),
        },
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        logger.error("Badgr assertion failed", {
          status: res.status,
          body: body.slice(0, 300),
          certId,
        });
        return null;
      }

      const json = await res.json();
      const assertion = json.result?.[0];
      return {
        assertionId: assertion?.entityId ?? certId,
        assertionUrl:
          assertion?.openBadgeId ??
          `${BASE_URL}/public/assertions/${assertion?.entityId}`,
        badgeUrl: assertion?.badgeclass ?? badgeClassId,
        recipientEmail,
        issuedOn: assertion?.issuedOn ?? new Date().toISOString(),
      };
    } catch (err) {
      logger.error("Badgr client error", { err, certId });
      return null;
    }
  }
}

export const badgrClient = new BadgrClient();
