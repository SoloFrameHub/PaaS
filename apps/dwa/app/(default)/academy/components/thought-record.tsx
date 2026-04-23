'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { generateWorksheetPdf, downloadPdf, type WorksheetConfig, type WorksheetField } from '@/lib/pdf-worksheets';
import type {
    ThoughtRecordConfig,
    ThoughtRecordEntry,
    ThoughtRecordLoadResponse,
    ThoughtRecordSubmitResponse,
} from '@/types/thought-record';

interface ThoughtRecordProps {
    courseId: string;
    lessonId: string;
}

export default function ThoughtRecord({ courseId, lessonId }: ThoughtRecordProps) {
    const [config, setConfig] = useState<ThoughtRecordConfig | null>(null);
    const [entries, setEntries] = useState<ThoughtRecordEntry[]>([]);
    const [values, setValues] = useState<Record<string, string | number>>({});
    const [submittedEntry, setSubmittedEntry] = useState<ThoughtRecordEntry | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDistortions, setShowDistortions] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const data = await apiClient.get<ThoughtRecordLoadResponse>(
                    `/api/academy/thought-record/${courseId}/${lessonId}`
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

    const handleChange = (fieldId: string, value: string | number) => {
        setValues(prev => ({ ...prev, [fieldId]: value }));
    };

    const handleSubmit = async () => {
        if (!config) return;

        const missing = config.fields.filter(f => f.required && (values[f.id] === undefined || values[f.id] === ''));
        if (missing.length > 0) {
            alert(`Please complete all required fields. Missing: ${missing.map(f => f.label.split(' — ')[0]).join(', ')}`);
            return;
        }

        setSubmitting(true);
        try {
            const date = new Date().toISOString().slice(0, 10);
            const data = await apiClient.post<ThoughtRecordSubmitResponse>(
                `/api/academy/thought-record/${courseId}/${lessonId}`,
                { values, date }
            );
            setSubmittedEntry(data.entry);
            setEntries(prev => [data.entry, ...prev]);
            window.dispatchEvent(new CustomEvent('exercise-completed', { detail: { type: 'thoughtRecord' } }));
        } catch (err: any) {
            alert('Failed to save thought record: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setValues({});
        setSubmittedEntry(null);
    };

    // ── PDF Helpers ──

    function buildWorksheetConfig(prefillValues?: Record<string, string | number>): WorksheetConfig {
        if (!config) throw new Error('No config');

        const fields: WorksheetField[] = config.fields.map(f => {
            let pdfType: WorksheetField['type'] = 'text';
            let height: number | undefined;

            if (f.type === 'textarea') {
                pdfType = 'multiline';
                height = 60;
            } else if (f.type === 'rating') {
                pdfType = 'text';
            } else if (f.type === 'select') {
                pdfType = 'text';
            }

            let value: string | undefined;
            if (prefillValues && prefillValues[f.id] !== undefined) {
                const raw = prefillValues[f.id];
                if (f.type === 'select' && f.options) {
                    const opt = f.options.find(o => o.value === raw);
                    value = opt ? opt.label : String(raw);
                } else if (f.type === 'rating') {
                    value = `${raw}${f.unit || ''}`;
                } else {
                    value = String(raw);
                }
            }

            return {
                id: f.id,
                label: f.label,
                type: pdfType,
                value,
                height,
            };
        });

        return {
            title: config.title,
            subtitle: prefillValues ? 'Completed Record' : 'Blank Worksheet',
            instructions: config.instructions,
            disclaimer: config.disclaimer,
            fields,
        };
    }

    const handleDownloadBlank = async () => {
        try {
            const wsConfig = buildWorksheetConfig();
            const bytes = await generateWorksheetPdf(wsConfig);
            downloadPdf(bytes, `${config!.id}-blank.pdf`);
        } catch (err: any) {
            alert('Failed to generate PDF: ' + err.message);
        }
    };

    const handleDownloadFilled = async (entry: ThoughtRecordEntry) => {
        try {
            const wsConfig = buildWorksheetConfig(entry.values);
            wsConfig.subtitle = `Completed on ${new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
            const bytes = await generateWorksheetPdf(wsConfig);
            downloadPdf(bytes, `${config!.id}-${entry.date}.pdf`);
        } catch (err: any) {
            alert('Failed to generate PDF: ' + err.message);
        }
    };

    // ── Loading State ──
    if (loading) {
        return (
            <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center animate-pulse">
                        <PencilIcon />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Loading Thought Record...</h3>
                </div>
            </section>
        );
    }

    if (error || !config) return null;

    // ── Insight Helpers ──

    /** Find paired before/after rating fields and compute insights */
    function buildInsights(entry: ThoughtRecordEntry) {
        const insights: { icon: string; text: string; color: string }[] = [];

        // Detect before/after rating pairs by looking for rating fields
        const ratingFields = config!.fields.filter(f => f.type === 'rating');
        if (ratingFields.length >= 2) {
            const before = Number(entry.values[ratingFields[0].id]);
            const after = Number(entry.values[ratingFields[ratingFields.length - 1].id]);
            if (!isNaN(before) && !isNaN(after)) {
                const diff = before - after;
                if (diff > 0) {
                    insights.push({
                        icon: 'down',
                        text: `Your distress dropped from ${before}${ratingFields[0].unit || ''} to ${after}${ratingFields[ratingFields.length - 1].unit || ''} — a ${diff}-point shift. That's the restructuring process at work.`,
                        color: 'emerald',
                    });
                } else if (diff === 0) {
                    insights.push({
                        icon: 'steady',
                        text: `Your distress held steady at ${before}${ratingFields[0].unit || ''}. That's normal — sometimes change takes several rounds. The skill builds with practice.`,
                        color: 'amber',
                    });
                } else {
                    insights.push({
                        icon: 'up',
                        text: `Your distress went from ${before}${ratingFields[0].unit || ''} to ${after}${ratingFields[ratingFields.length - 1].unit || ''}. Increased awareness can temporarily raise intensity — this is actually a sign of deeper engagement with the process.`,
                        color: 'amber',
                    });
                }
            }
        }

        // Detect cognitive distortion selection
        const selectField = config!.fields.find(f => f.type === 'select');
        if (selectField && entry.values[selectField.id]) {
            const val = entry.values[selectField.id];
            const opt = selectField.options?.find(o => o.value === val);
            const distortion = config!.distortionsList?.find(d => d.id === val);
            if (opt) {
                insights.push({
                    icon: 'lens',
                    text: `You identified "${opt.label}" as the thinking pattern at play.${distortion ? ` (${distortion.description})` : ''} Naming the pattern is the first step to loosening its grip.`,
                    color: 'violet',
                });
            }
        }

        // Highlight balanced thought
        const balancedField = config!.fields.find(f =>
            f.id.toLowerCase().includes('balanced') ||
            f.id.toLowerCase().includes('realistic') ||
            f.id.toLowerCase().includes('alternative')
        );
        if (balancedField && entry.values[balancedField.id]) {
            const thought = String(entry.values[balancedField.id]);
            if (thought.length > 10) {
                insights.push({
                    icon: 'lightbulb',
                    text: `Your balanced perspective: "${thought.length > 150 ? thought.slice(0, 147) + '...' : thought}"`,
                    color: 'blue',
                });
            }
        }

        return insights;
    }

    // ── Success View ──
    if (submittedEntry) {
        const insights = buildInsights(submittedEntry);

        return (
            <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border border-violet-200 dark:border-violet-500/20">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center text-white">
                        <CheckIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Thought Record Complete</h3>
                        <p className="text-sm text-gray-500">You just practiced a core CBT skill — challenging thoughts with evidence. (+15 XP)</p>
                    </div>
                </div>

                {/* Insights */}
                {insights.length > 0 && (
                    <div className="space-y-3 mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">What you accomplished</h4>
                        {insights.map((insight, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-3 p-3 rounded-xl border ${
                                    insight.color === 'emerald'
                                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/20'
                                        : insight.color === 'amber'
                                        ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-500/20'
                                        : insight.color === 'blue'
                                        ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-500/20'
                                        : 'bg-violet-50/60 dark:bg-violet-950/20 border-violet-200 dark:border-violet-500/20'
                                }`}
                            >
                                <span className="mt-0.5 shrink-0">
                                    {insight.icon === 'down' && <InsightArrowDown />}
                                    {insight.icon === 'up' && <InsightArrowUp />}
                                    {insight.icon === 'steady' && <InsightSteady />}
                                    {insight.icon === 'lens' && <InsightLens />}
                                    {insight.icon === 'lightbulb' && <InsightLightbulb />}
                                </span>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{insight.text}</p>
                            </div>
                        ))}
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Each time you complete a thought record you strengthen new neural pathways. Research shows this gets easier and more automatic with repetition.
                        </p>
                    </div>
                )}

                {/* Summary */}
                <details className="mb-6 group">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors list-none flex items-center gap-1">
                        <ChevronIcon open={false} />
                        <span className="group-open:hidden">Show full record</span>
                        <span className="hidden group-open:inline">Hide full record</span>
                    </summary>
                    <div className="space-y-3 mt-3">
                    {config.fields.map(field => {
                        const val = submittedEntry.values[field.id];
                        if (val === undefined || val === '') return null;

                        let displayVal: string;
                        if (field.type === 'select' && field.options) {
                            const opt = field.options.find(o => o.value === val);
                            displayVal = opt ? opt.label : String(val);
                        } else if (field.type === 'rating') {
                            displayVal = `${val}${field.unit || ''}`;
                        } else {
                            displayVal = String(val);
                        }

                        return (
                            <div key={field.id} className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/50 border border-violet-100 dark:border-violet-500/10">
                                <p className="text-xs font-medium text-violet-600 dark:text-violet-400 mb-1">
                                    {field.label.split(' — ')[0]}
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{displayVal}</p>
                            </div>
                        );
                    })}
                    </div>
                </details>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                    <button onClick={() => handleDownloadFilled(submittedEntry)} className="btn bg-violet-500 hover:bg-violet-600 text-white">
                        <DownloadIcon /> Download as PDF
                    </button>
                    <button onClick={handleDownloadBlank} className="btn border border-violet-300 dark:border-violet-500/30 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30">
                        <DownloadIcon /> Download Blank Worksheet
                    </button>
                    <button onClick={handleReset} className="btn border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                        Fill Out Another
                    </button>
                </div>

                {/* Previous Entries */}
                {entries.length > 1 && (
                    <div className="mt-6">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Previous Records</h4>
                        <div className="space-y-2">
                            {entries.filter(e => e.id !== submittedEntry.id).slice(0, 5).map(entry => (
                                <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700">
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {new Date(entry.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate max-w-xs">
                                            {String(entry.values.situation || '').slice(0, 60)}...
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDownloadFilled(entry)}
                                        className="text-violet-500 hover:text-violet-600 text-sm flex items-center gap-1"
                                    >
                                        <DownloadIcon /> PDF
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Disclaimer */}
                {config.disclaimer && (
                    <p className="mt-6 text-xs text-gray-400 italic">{config.disclaimer}</p>
                )}
            </section>
        );
    }

    // ── Form View ──
    const filledCount = config.fields.filter(f => values[f.id] !== undefined && values[f.id] !== '').length;
    const totalFields = config.fields.length;

    return (
        <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border border-violet-200 dark:border-violet-500/20">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center text-white">
                    <PencilIcon />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{config.title}</h3>
                    <p className="text-sm text-gray-500">{config.description}</p>
                </div>
            </div>

            {/* Top Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={handleDownloadBlank} className="text-sm flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                    <DownloadIcon /> Download Blank Worksheet (PDF)
                </button>
            </div>

            {/* Instructions */}
            <div className="mt-4 p-4 rounded-xl bg-violet-100/50 dark:bg-violet-500/10 border border-violet-200/50 dark:border-violet-500/10">
                <p className="text-sm text-gray-700 dark:text-gray-300">{config.instructions}</p>
            </div>

            {/* Cognitive Distortions Reference */}
            {config.distortionsList && config.distortionsList.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={() => setShowDistortions(prev => !prev)}
                        className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1"
                    >
                        <ChevronIcon open={showDistortions} />
                        Common Cognitive Distortions Reference
                    </button>
                    {showDistortions && (
                        <div className="mt-2 p-4 rounded-xl bg-white/70 dark:bg-gray-800/50 border border-violet-100 dark:border-violet-500/10 space-y-2">
                            {config.distortionsList.map(d => (
                                <div key={d.id}>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{d.name}</p>
                                    <p className="text-xs text-gray-500">{d.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Previous Entries Notice */}
            {entries.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500">
                        You&apos;ve completed {entries.length} thought record{entries.length !== 1 ? 's' : ''} for this lesson.
                    </p>
                </div>
            )}

            {/* Form Fields */}
            <div className="mt-6 space-y-5">
                {config.fields.map(field => (
                    <div key={field.id} className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                            {field.label}
                            {field.required && <span className="text-red-400 ml-1">*</span>}
                        </label>

                        {field.type === 'textarea' && (
                            <textarea
                                value={String(values[field.id] ?? '')}
                                onChange={e => handleChange(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                rows={3}
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:border-violet-400 focus:ring-1 focus:ring-violet-400 outline-none resize-y"
                            />
                        )}

                        {field.type === 'text' && (
                            <input
                                type="text"
                                value={String(values[field.id] ?? '')}
                                onChange={e => handleChange(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:border-violet-400 focus:ring-1 focus:ring-violet-400 outline-none"
                            />
                        )}

                        {field.type === 'rating' && (
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min={field.min ?? 0}
                                    max={field.max ?? 100}
                                    value={Number(values[field.id] ?? field.min ?? 0)}
                                    onChange={e => handleChange(field.id, Number(e.target.value))}
                                    className="flex-1 accent-violet-500"
                                />
                                <span className="text-lg font-bold text-violet-600 dark:text-violet-400 min-w-[4rem] text-right">
                                    {values[field.id] !== undefined ? values[field.id] : field.min ?? 0}{field.unit || ''}
                                </span>
                            </div>
                        )}

                        {field.type === 'select' && field.options && (
                            <select
                                value={String(values[field.id] ?? '')}
                                onChange={e => handleChange(field.id, e.target.value)}
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 focus:border-violet-400 focus:ring-1 focus:ring-violet-400 outline-none"
                            >
                                <option value="">Select a cognitive distortion...</option>
                                {field.options.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
            </div>

            {/* Progress + Submit */}
            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {filledCount} / {totalFields} fields completed
                </p>
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn bg-violet-500 hover:bg-violet-600 text-white disabled:opacity-50"
                >
                    {submitting ? 'Saving...' : 'Save Thought Record'}
                </button>
            </div>

            {/* Disclaimer */}
            {config.disclaimer && (
                <p className="mt-4 text-xs text-gray-400 italic">{config.disclaimer}</p>
            )}
        </section>
    );
}

// ── Icons ──

function PencilIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

function DownloadIcon() {
    return (
        <svg className="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    );
}

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
    );
}

function InsightArrowDown() {
    return (
        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
    );
}

function InsightArrowUp() {
    return (
        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 7l5 5m0 0l-5 5m5-5H3" />
        </svg>
    );
}

function InsightSteady() {
    return (
        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
    );
}

function InsightLens() {
    return (
        <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
}

function InsightLightbulb() {
    return (
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    );
}
