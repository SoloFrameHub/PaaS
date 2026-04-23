/**
 * Notion API types (subset for artifact export).
 */

export interface NotionBlock {
  object: "block";
  type: string;
  [key: string]: unknown;
}

export interface NotionPage {
  id: string;
  url: string;
  created_time: string;
}

export interface NotionTokenResponse {
  access_token: string;
  workspace_id: string;
  workspace_name: string;
  workspace_icon: string | null;
  bot_id: string;
  owner: { type: string; [key: string]: unknown };
}

export interface NotionSearchResult {
  results: { id: string; properties: Record<string, unknown>; url: string }[];
}
