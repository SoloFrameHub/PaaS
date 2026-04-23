'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FORM_DEFINITIONS } from '@/lib/forms/definitions';

interface WorkflowLog {
  id: string;
  workflowType: string;
  status: string;
  errorMessage: string | null;
  createdAt: string;
}

interface Submission {
  id: string;
  formSlug: string;
  email: string;
  name: string | null;
  data: Record<string, unknown>;
  score: number | null;
  scoreBreakdown: Record<string, number> | null;
  status: string;
  adminNotes: string | null;
  ipAddress: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrer: string | null;
  createdAt: string;
}

interface AdminFormDetailProps {
  submissionId: string;
  adminSecret: string;
}

const STATUS_OPTIONS = ['new', 'reviewed', 'qualified', 'rejected', 'contacted'];

export default function AdminFormDetail({ submissionId, adminSecret }: AdminFormDetailProps) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [workflowLogs, setWorkflowLogs] = useState<WorkflowLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/forms/${submissionId}`, {
          headers: { Authorization: `Bearer ${adminSecret}` },
        });
        const data = await res.json();
        setSubmission(data.submission);
        setWorkflowLogs(data.workflowLogs || []);
        setStatus(data.submission?.status || '');
        setAdminNotes(data.submission?.adminNotes || '');
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, [submissionId, adminSecret]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/forms/${submissionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminSecret}`,
        },
        body: JSON.stringify({ status, adminNotes }),
      });
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
        <p className="text-gray-500">Submission not found.</p>
      </div>
    );
  }

  const formDef = FORM_DEFINITIONS[submission.formSlug];
  const allFields = formDef?.steps.flatMap((s) => s.fields) || [];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/admin/forms"
          className="text-sm text-primary-500 hover:text-primary-600 mb-2 inline-block"
        >
          &larr; Back to list
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {formDef?.title || submission.formSlug}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Submitted {new Date(submission.createdAt).toLocaleString()} &middot; {submission.email}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Data */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Submission Data</h2>
            <dl className="space-y-3">
              {Object.entries(submission.data).map(([key, value]) => {
                const fieldDef = allFields.find((f) => f.id === key);
                const label = fieldDef?.label || key;
                let displayValue: string;
                if (Array.isArray(value)) {
                  displayValue = value
                    .map((v) => fieldDef?.options?.find((o) => o.id === v)?.label || v)
                    .join(', ');
                } else if (fieldDef?.options) {
                  displayValue = fieldDef.options.find((o) => o.id === value)?.label || String(value);
                } else {
                  displayValue = String(value || '—');
                }
                return (
                  <div key={key}>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {displayValue}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Score Breakdown */}
          {submission.score !== null && submission.scoreBreakdown && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Score: {submission.score}
              </h2>
              <div className="space-y-2">
                {Object.entries(submission.scoreBreakdown).map(([fieldId, points]) => {
                  const fieldDef = allFields.find((f) => f.id === fieldId);
                  return (
                    <div key={fieldId} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {fieldDef?.label || fieldId}
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {points} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Workflow Logs */}
          {workflowLogs.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Workflow Log</h2>
              <div className="space-y-2">
                {workflowLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-3 text-sm">
                    <span className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : log.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                    <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">{log.workflowType}</span>
                    <span className="text-gray-500 dark:text-gray-400">{log.status}</span>
                    {log.errorMessage && (
                      <span className="text-red-500 text-xs">{log.errorMessage}</span>
                    )}
                    <span className="ml-auto text-xs text-gray-400">
                      {new Date(log.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status + Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Admin Controls</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                className="form-select w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Admin Notes</label>
              <textarea
                className="form-textarea w-full"
                rows={4}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add internal notes..."
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Meta */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Meta</h2>
            <dl className="space-y-2 text-sm">
              {submission.ipAddress && (
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">IP</dt>
                  <dd className="text-gray-800 dark:text-gray-200 font-mono text-xs">{submission.ipAddress}</dd>
                </div>
              )}
              {submission.utmSource && (
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">UTM Source</dt>
                  <dd className="text-gray-800 dark:text-gray-200">{submission.utmSource}</dd>
                </div>
              )}
              {submission.utmMedium && (
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">UTM Medium</dt>
                  <dd className="text-gray-800 dark:text-gray-200">{submission.utmMedium}</dd>
                </div>
              )}
              {submission.utmCampaign && (
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">UTM Campaign</dt>
                  <dd className="text-gray-800 dark:text-gray-200">{submission.utmCampaign}</dd>
                </div>
              )}
              {submission.referrer && (
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Referrer</dt>
                  <dd className="text-gray-800 dark:text-gray-200 text-xs break-all">{submission.referrer}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
