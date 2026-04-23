/**
 * Native Form System — Type Definitions
 *
 * Forms are defined as TypeScript config objects (not DB-driven).
 * Each form has steps with fields, optional scoring, and workflow triggers.
 */

export type FieldType = 'text' | 'email' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'multi-select' | 'url' | 'hidden';

export interface FormFieldOption {
  id: string;
  label: string;
  description?: string;
  scoreValue?: number;
}

export interface FormFieldDefinition {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: FormFieldOption[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  showIf?: {
    fieldId: string;
    value: string | string[];
  };
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldDefinition[];
}

export interface ScoringRule {
  fieldId: string;
  weight: number;
  scoreMap?: Record<string, number>;
}

export interface WorkflowConfig {
  emailConfirmation?: {
    subject: string;
    bodyHtml: string;
  };
  n8nWebhook?: {
    webhookUrl?: string;
    includeFields?: string[];
  };
  listmonk?: {
    listId?: number;
    tags?: string[];
  };
}

export interface FormDefinition {
  slug: string;
  title: string;
  description: string;
  steps: FormStep[];
  scoring?: {
    rules: ScoringRule[];
    thresholds: {
      qualified: number;
      maybe: number;
    };
  };
  workflows: WorkflowConfig;
  settings: {
    allowMultiple: boolean;
    successMessage: string;
    successRedirect?: string;
  };
}
