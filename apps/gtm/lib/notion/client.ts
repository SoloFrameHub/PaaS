/**
 * Notion API Client — handles OAuth flow and page creation.
 */

import { logger } from "@/lib/logger";
import type { NotionBlock, NotionPage, NotionTokenResponse } from "./types";

const NOTION_API_VERSION = "2022-06-28";
const BASE_URL = "https://api.notion.com/v1";

class NotionClient {
  private get clientId(): string {
    return process.env.NOTION_CLIENT_ID || "";
  }
  private get clientSecret(): string {
    return process.env.NOTION_CLIENT_SECRET || "";
  }
  private get redirectUri(): string {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      if (process.env.NODE_ENV === "production") {
        throw new Error(
          "NEXT_PUBLIC_APP_URL must be set in production — Notion OAuth redirect_uri would otherwise point to localhost.",
        );
      }
      return "http://localhost:3000/api/notion/callback";
    }
    return `${appUrl}/api/notion/callback`;
  }

  /** Build the OAuth authorization URL */
  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: "code",
      owner: "user",
      state,
    });
    return `https://api.notion.com/v1/oauth/authorize?${params.toString()}`;
  }

  /** Exchange authorization code for access token */
  async exchangeCode(code: string): Promise<NotionTokenResponse> {
    const credentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString("base64");

    const response = await fetch(`${BASE_URL}/oauth/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_API_VERSION,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Notion OAuth error: ${error}`);
    }

    return response.json();
  }

  /** Create a page with blocks */
  async createPage(
    accessToken: string,
    title: string,
    children: NotionBlock[],
    parentPageId?: string,
  ): Promise<NotionPage> {
    // If no parent specified, create in the workspace root
    const parent = parentPageId
      ? { page_id: parentPageId }
      : { type: "page_id" as const, page_id: parentPageId || "" };

    // Notion API limits children to 100 blocks per request
    const firstBatch = children.slice(0, 100);

    const body: Record<string, unknown> = {
      parent: parentPageId ? { page_id: parentPageId } : undefined,
      properties: {
        title: {
          title: [{ text: { content: title } }],
        },
      },
      children: firstBatch,
    };

    // If no parent, we need to search for a page to use as parent
    if (!parentPageId) {
      // Create as a page in workspace — requires parent
      // Notion requires a parent for all pages, so we'll need the user to provide one
      throw new Error("Please select a parent page in Notion for the export");
    }

    const response = await fetch(`${BASE_URL}/pages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_API_VERSION,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Notion create page error: ${error}`);
    }

    const page = await response.json();

    // If more than 100 blocks, append in batches
    if (children.length > 100) {
      const remaining = children.slice(100);
      for (let i = 0; i < remaining.length; i += 100) {
        const batch = remaining.slice(i, i + 100);
        await this.appendBlocks(accessToken, page.id, batch);
      }
    }

    return { id: page.id, url: page.url, created_time: page.created_time };
  }

  /** Append blocks to an existing page */
  private async appendBlocks(
    accessToken: string,
    blockId: string,
    children: NotionBlock[],
  ): Promise<void> {
    const response = await fetch(`${BASE_URL}/blocks/${blockId}/children`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_API_VERSION,
      },
      body: JSON.stringify({ children }),
    });

    if (!response.ok) {
      logger.warn("Notion append blocks failed", {
        blockId,
        status: response.status,
      });
    }
  }

  /** Search for pages the integration has access to */
  async searchPages(
    accessToken: string,
    query?: string,
  ): Promise<{ id: string; title: string; url: string }[]> {
    const response = await fetch(`${BASE_URL}/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_API_VERSION,
      },
      body: JSON.stringify({
        query: query || "",
        filter: { property: "object", value: "page" },
        page_size: 20,
      }),
    });

    if (!response.ok) return [];

    const data = await response.json();
    return (data.results || []).map((r: Record<string, unknown>) => ({
      id: r.id as string,
      title: extractTitle(r),
      url: r.url as string,
    }));
  }
}

function extractTitle(page: Record<string, unknown>): string {
  const props = page.properties as
    | Record<string, Record<string, unknown>>
    | undefined;
  if (!props?.title) return "Untitled";
  const titleProp = props.title as { title?: { plain_text: string }[] };
  return titleProp.title?.[0]?.plain_text || "Untitled";
}

export const notionClient = new NotionClient();
