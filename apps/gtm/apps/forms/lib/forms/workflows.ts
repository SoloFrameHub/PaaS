/**
 * Form Workflow Triggers — Standalone version using raw postgres
 */
import { Resend } from 'resend';
import { getDb } from '@/lib/db';
import type { WorkflowConfig } from './types';

let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY not set');
    resend = new Resend(key);
  }
  return resend;
}

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function logWorkflow(submissionId: string, workflowType: string, status: string, errorMessage?: string | null, responseData?: Record<string, unknown> | null) {
  const sql = getDb();
  if (!sql) return;
  try {
    await sql`INSERT INTO form_workflow_log (id, submission_id, workflow_type, status, error_message, response_data) VALUES (${generateId('fwl')}, ${submissionId}, ${workflowType}, ${status}, ${errorMessage || null}, ${responseData ? JSON.stringify(responseData) : null})`;
  } catch (e) {
    console.error('Failed to log workflow', e);
  }
}

export async function sendFormConfirmation(submissionId: string, email: string, name: string, config: WorkflowConfig['emailConfirmation']): Promise<void> {
  if (!config) return;
  try {
    const html = config.bodyHtml.replace(/\{\{name\}\}/g, name || 'there').replace(/\{\{email\}\}/g, email);
    const r = getResend();
    await r.emails.send({ from: 'SoloFrameHub <noreply@mail.soloframehub.com>', to: email, subject: config.subject, html });
    await logWorkflow(submissionId, 'email_confirmation', 'success');
  } catch (error) {
    console.error('Form email workflow failed', error);
    await logWorkflow(submissionId, 'email_confirmation', 'failed', error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function triggerN8nWebhook(submissionId: string, formSlug: string, data: Record<string, unknown>, config: WorkflowConfig['n8nWebhook']): Promise<void> {
  const webhookUrl = config?.webhookUrl || process.env.N8N_FORM_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    const payload = config?.includeFields ? Object.fromEntries(config.includeFields.map((f) => [f, data[f]])) : data;
    const res = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ formSlug, submissionId, ...payload }) });
    await logWorkflow(submissionId, 'n8n_webhook', res.ok ? 'success' : 'failed', res.ok ? null : `HTTP ${res.status}`, { status: res.status });
  } catch (error) {
    console.error('n8n webhook failed', error);
    await logWorkflow(submissionId, 'n8n_webhook', 'failed', error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function sendAdminNotification(
  submissionId: string,
  formSlug: string,
  formTitle: string,
  email: string,
  name: string,
  data: Record<string, unknown>,
  score: number | null,
  config: WorkflowConfig['adminNotification'],
): Promise<void> {
  if (!config) return;
  try {
    const r = getResend();

    const fields = config.includeFields
      ? config.includeFields.map((f) => [f, data[f]] as const)
      : Object.entries(data).filter(([k]) => !k.startsWith('_'));

    const fieldRows = fields
      .map(
        ([key, val]) =>
          `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;vertical-align:top;">${String(key)}</td><td style="padding:8px 12px;color:#4b5563;border-bottom:1px solid #e5e7eb;">${String(val ?? '')}</td></tr>`,
      )
      .join('');

    let scoreSection = '';
    if (config.includeScore && score !== null) {
      const bg = score >= 30 ? '#ecfdf5' : score >= 20 ? '#fffbeb' : '#fef2f2';
      const color = score >= 30 ? '#065f46' : score >= 20 ? '#92400e' : '#991b1b';
      const label = score >= 30 ? 'QUALIFIED' : score >= 20 ? 'MAYBE' : 'LOW FIT';
      scoreSection = `<div style="margin:16px 0;padding:12px 16px;background:${bg};border-radius:8px;font-weight:bold;color:${color};">Score: ${score} &mdash; ${label}</div>`;
    }

    const subject = config.subject
      .replace(/\{\{formName\}\}/g, formTitle)
      .replace(/\{\{name\}\}/g, name || 'Unknown');

    const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
      <h2 style="margin-bottom:8px;">New ${formTitle} Submission</h2>
      <p style="color:#6b7280;margin-bottom:16px;">From: <strong>${name || 'Unknown'}</strong> (${email})</p>
      ${scoreSection}
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">${fieldRows}</table>
      <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;">
      <p style="color:#374151;font-size:14px;margin-bottom:8px;"><strong>Next step:</strong> To approve this tester, add their email to the <code>BETA_EMAILS</code> environment variable in Dokploy.</p>
      <p style="color:#9ca3af;font-size:12px;">Submission ID: ${submissionId} &middot; Form: ${formSlug}</p>
    </div>`;

    await r.emails.send({ from: 'SoloFrameHub Forms <noreply@mail.soloframehub.com>', to: config.to, subject, html });
    await logWorkflow(submissionId, 'admin_notification', 'success');
  } catch (error) {
    console.error('Admin notification failed', error);
    await logWorkflow(submissionId, 'admin_notification', 'failed', error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function addToListmonk(submissionId: string, email: string, name: string, config: WorkflowConfig['listmonk']): Promise<void> {
  const listmonkUrl = process.env.LISTMONK_API_URL;
  const listmonkUser = process.env.LISTMONK_API_USER;
  const listmonkPass = process.env.LISTMONK_API_PASS;
  if (!listmonkUrl || !config?.listId) return;
  try {
    const authHeader = listmonkUser && listmonkPass ? 'Basic ' + Buffer.from(`${listmonkUser}:${listmonkPass}`).toString('base64') : undefined;
    const res = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(authHeader ? { Authorization: authHeader } : {}) },
      body: JSON.stringify({ email, name: name || email.split('@')[0], status: 'enabled', lists: [config.listId], tags: config.tags || [] }),
    });
    await logWorkflow(submissionId, 'listmonk_add', res.ok || res.status === 409 ? 'success' : 'failed', res.ok || res.status === 409 ? null : `HTTP ${res.status}`, { status: res.status });
  } catch (error) {
    console.error('Listmonk add failed', error);
    await logWorkflow(submissionId, 'listmonk_add', 'failed', error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function runFormWorkflows(submissionId: string, formSlug: string, formTitle: string, email: string, name: string, data: Record<string, unknown>, score: number | null, workflows: WorkflowConfig): Promise<void> {
  const tasks: Promise<void>[] = [];
  if (workflows.emailConfirmation) tasks.push(sendFormConfirmation(submissionId, email, name, workflows.emailConfirmation));
  if (workflows.adminNotification) tasks.push(sendAdminNotification(submissionId, formSlug, formTitle, email, name, data, score, workflows.adminNotification));
  if (workflows.n8nWebhook) tasks.push(triggerN8nWebhook(submissionId, formSlug, data, workflows.n8nWebhook));
  if (workflows.listmonk) tasks.push(addToListmonk(submissionId, email, name, workflows.listmonk));
  Promise.allSettled(tasks).catch((err) => console.error('Form workflows error', err));
}
