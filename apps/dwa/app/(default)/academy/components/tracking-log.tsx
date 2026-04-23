'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { apiClient } from '@/lib/api/client';
import { generateWorksheetPdf, downloadPdf } from '@/lib/pdf-worksheets';
import type { WorksheetField } from '@/lib/pdf-worksheets';
import type {
    TrackingLogConfig,
    TrackingLogEntry,
    TrackingLogLoadResponse,
    TrackingLogSubmitResponse,
    TrackingField,
    MetricThreshold,
    DerivedMetric,
} from '@/types/tracking-log';

const TrackingTrendChart = dynamic(
    () => import('./tracking-trend-chart'),
    { ssr: false }
);

interface TrackingLogProps {
    courseId: string;
    lessonId: string;
}

const THRESHOLD_COLORS: Record<string, { bg: string; text: string }> = {
    green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
    yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
    orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
    red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
};

export default function TrackingLog({ courseId, lessonId }: TrackingLogProps) {
    const [config, setConfig] = useState<TrackingLogConfig | null>(null);
    const [entries, setEntries] = useState<TrackingLogEntry[]>([]);
    const [values, setValues] = useState<Record<string, string | number | boolean>>({});
    const [date, setDate] = useState(todayString());
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastSubmitted, setLastSubmitted] = useState<TrackingLogEntry | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await apiClient.get<TrackingLogLoadResponse>(
                    `/api/academy/tracking-log/${courseId}/${lessonId}`
                );
                setConfig(data.config);
                setEntries(data.entries);
            } catch {
                setError('none');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [courseId, lessonId]);

    const handleFieldChange = (fieldId: string, value: string | number | boolean) => {
        setValues(prev => ({ ...prev, [fieldId]: value }));
    };

    const handleSubmit = async () => {
        if (!config) return;

        const missing = config.fields.filter(f => f.required && (values[f.id] === undefined || values[f.id] === ''));
        if (missing.length > 0) {
            alert(`Please fill in: ${missing.map(f => f.label).join(', ')}`);
            return;
        }

        setSubmitting(true);
        try {
            const data = await apiClient.post<TrackingLogSubmitResponse>(
                `/api/academy/tracking-log/${courseId}/${lessonId}`,
                { values, date }
            );
            setLastSubmitted(data.entry);
            setEntries(prev => [data.entry, ...prev]);
            setValues({});
            setDate(todayString());
            window.dispatchEvent(new CustomEvent('exercise-completed', { detail: { type: 'trackingLog' } }));
        } catch (err: any) {
            alert('Failed to save entry: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleNewEntry = () => {
        setLastSubmitted(null);
    };

    const buildBlankFields = (): WorksheetField[] => {
        if (!config) return [];
        return config.fields.map(f => {
            let pdfType: WorksheetField['type'] = 'text';
            if (f.type === 'text') pdfType = 'text';
            else if (f.type === 'number' || f.type === 'rating') pdfType = 'text';
            else if (f.type === 'time') pdfType = 'text';
            else if (f.type === 'boolean') pdfType = 'checkbox';
            else if (f.type === 'select') pdfType = 'text';
            return { id: f.id, label: f.label, type: pdfType };
        });
    };

    const handleDownloadBlank = async () => {
        if (!config) return;
        try {
            const bytes = await generateWorksheetPdf({
                title: config.title,
                subtitle: 'Blank Log',
                instructions: config.instructions,
                disclaimer: config.disclaimer,
                fields: buildBlankFields(),
            });
            downloadPdf(bytes, `${config.id}-blank.pdf`);
        } catch (err: any) {
            alert('Failed to generate PDF: ' + err.message);
        }
    };

    const handleDownloadEntries = async () => {
        if (!config || entries.length === 0) return;
        try {
            const fields: WorksheetField[] = entries.slice(0, 7).flatMap(entry => {
                const dateLabel = new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const entryFields: WorksheetField[] = config.fields.map(f => {
                    const raw = entry.values[f.id];
                    let val = raw !== undefined ? String(raw) : '';
                    if (f.type === 'boolean') val = raw ? 'Yes' : 'No';
                    if (f.type === 'select' && f.options) {
                        const opt = f.options.find(o => o.value === raw);
                        if (opt) val = opt.label;
                    }
                    if (f.unit && val) val = `${val} ${f.unit}`;
                    return { id: `${entry.id}-${f.id}`, label: `${f.label}`, type: 'text' as const, value: val };
                });
                // Add derived metrics
                if (entry.derivedValues && config.derivedMetrics) {
                    for (const m of config.derivedMetrics) {
                        const dv = entry.derivedValues[m.id];
                        if (dv !== undefined) {
                            entryFields.push({ id: `${entry.id}-${m.id}`, label: m.label, type: 'text', value: `${dv}${m.unit}` });
                        }
                    }
                }
                return [
                    { id: `${entry.id}-header`, label: `--- ${dateLabel} ---`, type: 'text' as const, value: '' },
                    ...entryFields,
                ];
            });
            const bytes = await generateWorksheetPdf({
                title: `${config.title} — Recent Entries`,
                subtitle: `Last ${Math.min(entries.length, 7)} entries`,
                instructions: config.instructions,
                disclaimer: config.disclaimer,
                fields,
            });
            downloadPdf(bytes, `${config.id}-entries.pdf`);
        } catch (err: any) {
            alert('Failed to generate PDF: ' + err.message);
        }
    };

    if (loading) {
        return (
            <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center animate-pulse">
                        <ChartIcon />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Loading Tracker...</h3>
                </div>
            </section>
        );
    }

    if (error || !config) return null;

    // ── Success / Derived Metrics View ──
    if (lastSubmitted) {
        return (
            <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-teal-200 dark:border-teal-500/20">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white">
                        <CheckIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Entry Saved</h3>
                        <p className="text-sm text-gray-500">{formatDate(lastSubmitted.date)}</p>
                    </div>
                </div>

                {/* Derived Metrics */}
                {lastSubmitted.derivedValues && config.derivedMetrics && (
                    <div className="grid gap-3 sm:grid-cols-3 mb-6">
                        {config.derivedMetrics.map(metric => {
                            const val = lastSubmitted.derivedValues?.[metric.id];
                            if (val === undefined) return null;
                            const threshold = findThreshold(metric.thresholds, val);
                            const colors = threshold ? THRESHOLD_COLORS[threshold.color] : null;

                            return (
                                <div
                                    key={metric.id}
                                    className={`p-4 rounded-2xl border ${colors ? `${colors.bg} border-transparent` : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}
                                >
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{metric.label}</p>
                                    <p className={`text-2xl font-black ${colors ? colors.text : 'text-gray-800 dark:text-gray-100'}`}>
                                        {val}{metric.unit}
                                    </p>
                                    {threshold && (
                                        <p className={`text-sm font-medium ${colors?.text}`}>{threshold.label}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="flex flex-wrap gap-3">
                    <button onClick={handleNewEntry} className="btn bg-teal-500 hover:bg-teal-600 text-white">
                        Log Another Entry
                    </button>
                    <button onClick={handleDownloadBlank} className="btn border border-teal-300 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 flex items-center gap-2">
                        <DownloadIcon /> Download Blank Log
                    </button>
                    {entries.length > 0 && (
                        <button onClick={handleDownloadEntries} className="btn border border-teal-300 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 flex items-center gap-2">
                            <DownloadIcon /> Download Entries as PDF
                        </button>
                    )}
                </div>

                {/* History below */}
                {entries.length > 0 && (
                    <EntryHistory entries={entries} config={config} />
                )}
            </section>
        );
    }

    // ── Form View ──
    return (
        <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-teal-200 dark:border-teal-500/20">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white">
                    <ChartIcon />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{config.title}</h3>
                    <p className="text-sm text-gray-500">{config.description}</p>
                </div>
            </div>

            {/* Download link */}
            <div className="mt-3">
                <button onClick={handleDownloadBlank} className="text-sm flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                    <DownloadIcon /> Download Blank Log (PDF)
                </button>
            </div>

            {config.disclaimer && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20">
                    <p className="text-xs text-amber-700 dark:text-amber-400">{config.disclaimer}</p>
                </div>
            )}

            <div className="mt-6 mb-4">
                <p className="text-base font-medium text-gray-700 dark:text-gray-300">{config.instructions}</p>
            </div>

            {/* Date picker */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    max={todayString()}
                    className="form-input rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-auto"
                />
            </div>

            {/* Fields */}
            <div className="space-y-5">
                {config.fields.map(field => (
                    <FieldRenderer
                        key={field.id}
                        field={field}
                        value={values[field.id]}
                        onChange={val => handleFieldChange(field.id, val)}
                    />
                ))}
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50"
                >
                    {submitting ? 'Saving...' : 'Save Entry'}
                </button>
            </div>

            {/* History */}
            {entries.length > 0 && (
                <EntryHistory entries={entries} config={config} />
            )}
        </section>
    );
}

// ── Field Renderer ──

function FieldRenderer({
    field,
    value,
    onChange,
}: {
    field: TrackingField;
    value: string | number | boolean | undefined;
    onChange: (val: string | number | boolean) => void;
}) {
    const labelEl = (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
        </label>
    );

    switch (field.type) {
        case 'text':
            return (
                <div>
                    {labelEl}
                    <input
                        type="text"
                        value={(value as string) ?? ''}
                        onChange={e => onChange(e.target.value)}
                        placeholder={field.placeholder}
                        className="form-input w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                </div>
            );

        case 'number':
            return (
                <div>
                    {labelEl}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={value !== undefined ? String(value) : ''}
                            onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                            min={field.min}
                            max={field.max}
                            placeholder={field.placeholder}
                            className="form-input w-32 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                        />
                        {field.unit && <span className="text-sm text-gray-400">{field.unit}</span>}
                    </div>
                </div>
            );

        case 'time':
            return (
                <div>
                    {labelEl}
                    <input
                        type="time"
                        value={(value as string) ?? ''}
                        onChange={e => onChange(e.target.value)}
                        className="form-input w-40 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                </div>
            );

        case 'rating': {
            const min = field.min ?? 1;
            const max = field.max ?? 5;
            const count = max - min + 1;
            // For scales > 6, use compact number buttons instead of full labels
            const compact = count > 6;

            return (
                <div>
                    {labelEl}
                    <div className={`flex flex-wrap gap-2 ${compact ? '' : ''}`}>
                        {Array.from({ length: count }, (_, i) => min + i).map(v => {
                            const selected = value === v;
                            const label = field.ratingLabels?.[v];
                            return (
                                <button
                                    key={v}
                                    type="button"
                                    onClick={() => onChange(v)}
                                    className={`px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
                                        selected
                                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-300'
                                    }`}
                                >
                                    {compact ? v : (label ?? v)}
                                </button>
                            );
                        })}
                    </div>
                    {/* Show min/max labels for compact mode */}
                    {compact && (field.ratingLabels?.[min] || field.ratingLabels?.[max]) && (
                        <div className="flex justify-between mt-1 px-1">
                            <span className="text-xs text-gray-400">{min} = {field.ratingLabels?.[min] ?? ''}</span>
                            <span className="text-xs text-gray-400">{max} = {field.ratingLabels?.[max] ?? ''}</span>
                        </div>
                    )}
                </div>
            );
        }

        case 'boolean':
            return (
                <div>
                    {labelEl}
                    <div className="flex gap-3">
                        {[true, false].map(v => (
                            <button
                                key={String(v)}
                                type="button"
                                onClick={() => onChange(v)}
                                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                                    value === v
                                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-300'
                                }`}
                            >
                                {v ? 'Yes' : 'No'}
                            </button>
                        ))}
                    </div>
                </div>
            );

        case 'select':
            return (
                <div>
                    {labelEl}
                    <select
                        value={(value as string) ?? ''}
                        onChange={e => onChange(e.target.value)}
                        className="form-select rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    >
                        <option value="">Select...</option>
                        {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            );

        default:
            return null;
    }
}

// ── Entry History ──

function EntryHistory({ entries, config }: { entries: TrackingLogEntry[]; config: TrackingLogConfig }) {
    // Pick up to 3 display fields (first fields that are number/rating type, or first 3)
    const displayFields = config.fields
        .filter(f => f.type === 'rating' || f.type === 'number')
        .slice(0, 3);

    if (displayFields.length === 0) {
        // Fallback: show first 2 fields
        displayFields.push(...config.fields.slice(0, 2));
    }

    return (
        <div className="mt-8 pt-6 border-t border-teal-200/50 dark:border-teal-500/10">
            {/* Trend Chart */}
            <TrackingTrendChart entries={entries} fields={config.fields} />

            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 mt-6">
                Recent Entries ({entries.length})
            </h4>
            <div className="space-y-2">
                {entries.slice(0, 7).map(entry => (
                    <div
                        key={entry.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 text-sm"
                    >
                        <span className="font-medium text-gray-500 w-20 flex-shrink-0">
                            {formatDateShort(entry.date)}
                        </span>
                        <div className="flex gap-4 flex-wrap flex-1">
                            {displayFields.map(f => (
                                <span key={f.id} className="text-gray-600 dark:text-gray-400">
                                    <span className="text-gray-400 text-xs">{shortLabel(f.label)}: </span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        {formatFieldValue(entry.values[f.id], f)}
                                    </span>
                                </span>
                            ))}
                        </div>
                        {/* Derived metrics */}
                        {entry.derivedValues && config.derivedMetrics?.map(m => {
                            const val = entry.derivedValues?.[m.id];
                            if (val === undefined) return null;
                            const threshold = findThreshold(m.thresholds, val);
                            const colors = threshold ? THRESHOLD_COLORS[threshold.color] : null;
                            return (
                                <span
                                    key={m.id}
                                    className={`px-2 py-0.5 rounded-lg text-xs font-bold ${colors ? `${colors.bg} ${colors.text}` : 'text-gray-500'}`}
                                >
                                    {val}{m.unit}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Helpers ──

function todayString(): string {
    return new Date().toISOString().slice(0, 10);
}

function formatDate(d: string): string {
    return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function formatDateShort(d: string): string {
    return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function shortLabel(label: string): string {
    // Take first meaningful words, drop parenthetical
    return label.replace(/\s*\(.*\)/, '').split(/[?:]/)[0].trim().slice(0, 20);
}

function formatFieldValue(value: string | number | boolean | undefined, field: TrackingField): string {
    if (value === undefined || value === '') return '-';
    if (field.type === 'boolean') return value ? 'Yes' : 'No';
    if (field.type === 'rating' && field.ratingLabels?.[value as number]) {
        return `${value}`;
    }
    if (field.unit) return `${value} ${field.unit}`;
    return String(value);
}

function findThreshold(thresholds: MetricThreshold[] | undefined, value: number): MetricThreshold | null {
    if (!thresholds) return null;
    return thresholds.find(t => value >= t.min && value <= t.max) ?? null;
}

// ── Icons ──

function DownloadIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    );
}

function ChartIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}
