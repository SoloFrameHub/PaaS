/**
 * Attio API response types (V2).
 */

export interface AttioRecord {
  id: { record_id: string; object_id: string };
  values: Record<string, AttioAttributeValue[]>;
  created_at: string;
}

export interface AttioAttributeValue {
  attribute_type: string;
  [key: string]: unknown;
}

export interface AttioListEntry {
  id: { entry_id: string; list_id: string };
  record_id: string;
  created_at: string;
  values: Record<string, AttioAttributeValue[]>;
}

export interface AttioWebhookPayload {
  id: string;
  type: string;
  created_at: string;
  data: {
    id: Record<string, string>;
    [key: string]: unknown;
  };
}

export interface AttioIdentifyResponse {
  workspace: {
    id: string;
    name: string;
  };
}
