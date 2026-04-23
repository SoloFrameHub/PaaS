'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProviderProfileData {
  displayName:   string;
  credentials:   string;
  specialty:     string;
  licenseNumber: string;
  npiNumber:     string;
  bio:           string;
}

interface SaveResult {
  verificationStatus: 'verified' | 'manual_review' | 'pending' | 'rejected';
  message: string;
}

export default function ProviderProfileForm({ existing }: { existing: ({ displayName: string; credentials: string | null; specialty: string | null; licenseNumber: string | null; npiNumber: string | null; bio: string | null; verificationStatus?: string }) | null }) {
  const [form, setForm] = useState<ProviderProfileData>({
    displayName:   existing?.displayName   ?? '',
    credentials:   existing?.credentials   ?? '',
    specialty:     existing?.specialty     ?? '',
    licenseNumber: existing?.licenseNumber ?? '',
    npiNumber:     (existing as any)?.npiNumber ?? '',
    bio:           existing?.bio           ?? '',
  });
  const [saving, setSaving]     = useState(false);
  const [result, setResult]     = useState<SaveResult | null>(null);
  const [error, setError]       = useState<string | null>(null);
  const router = useRouter();

  const save = async () => {
    if (!form.displayName.trim()) { setError('Display name is required.'); return; }
    setSaving(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/provider/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Save failed');
        return;
      }

      setResult({ verificationStatus: data.verificationStatus, message: data.message });

      if (data.verificationStatus === 'verified') {
        setTimeout(() => {
          router.push('/provider/dashboard');
          router.refresh();
        }, 1500);
      } else {
        setTimeout(() => {
          router.push('/provider-pending');
          router.refresh();
        }, 1500);
      }
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ label, field, placeholder, hint }: {
    label: string; field: keyof ProviderProfileData; placeholder: string; hint?: string;
  }) => (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        value={form[field]}
        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
      />
      {hint && <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">

      <Field label="Display Name *" field="displayName" placeholder="Dr. Jane Smith" />
      <Field label="Credentials" field="credentials" placeholder="MD, LCSW, PhD, PsyD…" />
      <Field label="Specialty" field="specialty" placeholder="Anxiety & OCD, Trauma, Mood Disorders…" />

      {/* NPI field — highlighted as the fast-track path */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          NPI Number
          <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-300">
            Instant verification
          </span>
        </label>
        <input
          type="text"
          value={form.npiNumber}
          onChange={e => setForm(f => ({ ...f, npiNumber: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
          placeholder="10-digit NPI (e.g. 1234567890)"
          maxLength={10}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 font-mono"
        />
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
          US practitioners: providing your NPI enables automatic verification against the NPPES national registry — no manual review needed.
          Find yours at{' '}
          <a
            href="https://npiregistry.cms.hhs.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-500 hover:underline"
          >
            npiregistry.cms.hhs.gov
          </a>
        </p>
      </div>

      <Field
        label="State License Number"
        field="licenseNumber"
        placeholder="TX-12345 (optional, for reference)"
      />

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Bio</label>
        <textarea
          value={form.bio}
          onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
          placeholder="Brief professional bio visible to your patients…"
          rows={3}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>

      {/* Result feedback */}
      {result && (
        <div className={`rounded-lg border px-4 py-3 text-sm ${
          result.verificationStatus === 'verified'
            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300'
            : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300'
        }`}>
          <span className="font-medium">
            {result.verificationStatus === 'verified' ? '✓ Verified — ' : '⏳ Under review — '}
          </span>
          {result.message}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <button
        onClick={save}
        disabled={saving || !!result}
        className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
      >
        {saving ? 'Verifying credentials…' : result ? 'Redirecting…' : existing ? 'Update Profile' : 'Submit for Verification'}
      </button>

      {/* Verification explanation */}
      {!result && (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
          <p className="font-medium text-gray-700 dark:text-gray-300">How verification works</p>
          <p>🟢 <strong>NPI provided:</strong> Your NPI is checked against the NPPES national registry. Strong name match = instant access.</p>
          <p>🟡 <strong>No NPI / partial match:</strong> Application is queued for manual review (typically 1-2 business days).</p>
        </div>
      )}
    </div>
  );
}
