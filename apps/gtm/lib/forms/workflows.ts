/**
 * Form Workflow Triggers
 *
 * Runs after a form submission is stored:
 * 1. Resend confirmation email
 * 2. n8n webhook POST
 * 3. Listmonk subscriber add
 *
 * All workflows are fire-and-forget with logging to form_workflow_log.
 */

import { getResend } from "@/lib/email/resend";
import { logger } from "@/lib/logger";
import { getDb, schema } from "@/lib/db";
import type { WorkflowConfig } from "./types";

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Send confirmation email via Resend */
export async function sendFormConfirmation(
  submissionId: string,
  email: string,
  name: string,
  config: WorkflowConfig["emailConfirmation"],
): Promise<void> {
  if (!config) return;

  const db = getDb();
  const logId = generateId("fwl");

  try {
    const html = config.bodyHtml
      .replace(/\{\{name\}\}/g, name || "there")
      .replace(/\{\{email\}\}/g, email)
      .replace(/\{\{submissionId\}\}/g, submissionId);

    const resend = getResend();
    await resend.emails.send({
      from: "SoloFrameHub <noreply@mail.soloframehub.com>",
      to: email,
      subject: config.subject,
      html,
    });

    if (db) {
      await db.insert(schema.formWorkflowLog).values({
        id: logId,
        submissionId,
        workflowType: "email_confirmation",
        status: "success",
      });
    }
  } catch (error) {
    logger.error("Form email workflow failed", { submissionId, error });
    if (db) {
      await db.insert(schema.formWorkflowLog).values({
        id: logId,
        submissionId,
        workflowType: "email_confirmation",
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

/** Trigger n8n webhook with form data */
export async function triggerN8nWebhook(
  submissionId: string,
  formSlug: string,
  data: Record<string, unknown>,
  config: WorkflowConfig["n8nWebhook"],
): Promise<void> {
  const webhookUrl = config?.webhookUrl || process.env.N8N_FORM_WEBHOOK_URL;
  if (!webhookUrl) return;

  const db = getDb();
  const logId = generateId("fwl");

  try {
    const payload = config?.includeFields
      ? Object.fromEntries(config.includeFields.map((f) => [f, data[f]]))
      : data;

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formSlug, submissionId, ...payload }),
    });

    if (db) {
      await db.insert(schema.formWorkflowLog).values({
        id: logId,
        submissionId,
        workflowType: "n8n_webhook",
        status: res.ok ? "success" : "failed",
        responseData: { status: res.status },
        errorMessage: res.ok ? null : `HTTP ${res.status}`,
      });
    }
  } catch (error) {
    logger.error("n8n webhook failed", { submissionId, error });
    if (db) {
      await db.insert(schema.formWorkflowLog).values({
        id: logId,
        submissionId,
        workflowType: "n8n_webhook",
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

/** Add subscriber to Listmonk */
export async function addToListmonk(
  submissionId: string,
  email: string,
  name: string,
  config: WorkflowConfig["listmonk"],
): Promise<void> {
  const listmonkUrl =
    process.env.LISTMONK_API_URL ||
    process.env.LISTMONK_URL?.replace(/\/admin\/?$/, "");
  const listmonkUser =
    process.env.LISTMONK_API_USER || process.env.LISTMONK_ADMIN_USERNAME;
  const listmonkPass =
    process.env.LISTMONK_API_PASS || process.env.LISTMONK_ADMIN_PASSWORD;
  const defaultListId = process.env.LISTMONK_DEFAULT_LIST_ID
    ? parseInt(process.env.LISTMONK_DEFAULT_LIST_ID, 10)
    : undefined;
  const listId = config?.listId || defaultListId;
  if (!listmonkUrl || !listId) return;

  const db = getDb();
  const logId = generateId("fwl");

  try {
    const authHeader =
      listmonkUser && listmonkPass
        ? "Basic " +
          Buffer.from(`${listmonkUser}:${listmonkPass}`).toString("base64")
        : undefined;

    const res = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify({
        email,
        name: name || email.split("@")[0],
        status: "enabled",
        lists: [listId],
        tags: config?.tags || [],
      }),
    });

    if (db) {
      await db.insert(schema.formWorkflowLog).values({
        id: logId,
        submissionId,
        workflowType: "listmonk_add",
        status: res.ok || res.status === 409 ? "success" : "failed", // 409 = already subscribed
        responseData: { status: res.status },
        errorMessage:
          res.ok || res.status === 409 ? null : `HTTP ${res.status}`,
      });
    }
  } catch (error) {
    logger.error("Listmonk add failed", { submissionId, error });
    if (db) {
      await db.insert(schema.formWorkflowLog).values({
        id: logId,
        submissionId,
        workflowType: "listmonk_add",
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

/** Run all configured workflows for a submission */
export async function runFormWorkflows(
  submissionId: string,
  formSlug: string,
  email: string,
  name: string,
  data: Record<string, unknown>,
  workflows: WorkflowConfig,
): Promise<void> {
  // Fire all workflows concurrently (non-blocking)
  const tasks: Promise<void>[] = [];

  if (workflows.emailConfirmation) {
    tasks.push(
      sendFormConfirmation(
        submissionId,
        email,
        name,
        workflows.emailConfirmation,
      ),
    );
  }
  if (workflows.n8nWebhook) {
    tasks.push(
      triggerN8nWebhook(submissionId, formSlug, data, workflows.n8nWebhook),
    );
  }
  if (workflows.listmonk) {
    tasks.push(addToListmonk(submissionId, email, name, workflows.listmonk));
  }

  // Don't await — let them complete in the background
  Promise.allSettled(tasks).catch((err) => {
    logger.error("Form workflows error", { submissionId, err });
  });
}
