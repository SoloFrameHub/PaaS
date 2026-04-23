'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { apiClient } from '@/lib/api/client';
import { useConfetti } from './use-confetti';
import { generateWorksheetPdf, downloadPdf } from '@/lib/pdf-worksheets';
import type { WorksheetField } from '@/lib/pdf-worksheets';
import type {
    ChecklistConfig,
    ChecklistProgress,
    ChecklistLoadResponse,
    ChecklistSaveResponse,
    ChecklistItem,
} from '@/types/checklist';

interface ChecklistProps {
    courseId: string;
    lessonId: string;
}

export default function Checklist({ courseId, lessonId }: ChecklistProps) {
    const [config, setConfig] = useState<ChecklistConfig | null>(null);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [fieldValues, setFieldValues] = useState<Record<string, string | number>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [justCompleted, setJustCompleted] = useState(false);
    const [wasAlreadyComplete, setWasAlreadyComplete] = useState(false);
    const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { fireConfetti } = useConfetti();

    useEffect(() => {
        async function load() {
            try {
                const data = await apiClient.get<ChecklistLoadResponse>(
                    `/api/academy/checklist/${courseId}/${lessonId}`
                );
                setConfig(data.config);
                if (data.progress) {
                    setCheckedItems(data.progress.items);
                    setFieldValues(data.progress.values);
                    if (data.progress.completedAt) {
                        setWasAlreadyComplete(true);
                    }
                }
            } catch {
                setError('none');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [courseId, lessonId]);

    const save = useCallback(async (items: Record<string, boolean>, values: Record<string, string | number>) => {
        setSaving(true);
        try {
            const data = await apiClient.put<ChecklistSaveResponse>(
                `/api/academy/checklist/${courseId}/${lessonId}`,
                { items, values }
            );
            if (data.xpAwarded && !wasAlreadyComplete) {
                setJustCompleted(true);
                setWasAlreadyComplete(true);
                fireConfetti({ intensity: 'small' });
                window.dispatchEvent(new CustomEvent('exercise-completed', { detail: { type: 'checklist' } }));
            }
        } catch {
            // Silent failure for auto-save — user can retry by making another change
        } finally {
            setSaving(false);
        }
    }, [courseId, lessonId, wasAlreadyComplete]);

    const scheduleSave = useCallback((items: Record<string, boolean>, values: Record<string, string | number>) => {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => save(items, values), 1000);
    }, [save]);

    const handleCheck = (itemId: string, checked: boolean) => {
        const updated = { ...checkedItems, [itemId]: checked };
        setCheckedItems(updated);
        scheduleSave(updated, fieldValues);
    };

    const handleFieldChange = (itemId: string, value: string | number) => {
        const updated = { ...fieldValues, [itemId]: value };
        setFieldValues(updated);
        scheduleSave(checkedItems, updated);
    };

    // ── PDF Helpers ──

    const buildPdfFields = (prefilled: boolean): WorksheetField[] => {
        if (!config) return [];
        return config.items.map(item => {
            if (item.type === 'checkbox') {
                return {
                    id: item.id,
                    label: item.label,
                    type: 'checkbox' as const,
                    value: prefilled && checkedItems[item.id] ? 'true' : undefined,
                };
            } else if (item.type === 'rating') {
                return {
                    id: item.id,
                    label: item.label,
                    type: 'text' as const,
                    value: prefilled && fieldValues[item.id] !== undefined
                        ? `${fieldValues[item.id]} / ${item.max ?? 10}`
                        : undefined,
                };
            } else {
                return {
                    id: item.id,
                    label: item.label,
                    type: 'text' as const,
                    value: prefilled && fieldValues[item.id] !== undefined
                        ? String(fieldValues[item.id])
                        : undefined,
                };
            }
        });
    };

    const handleDownloadBlank = async () => {
        if (!config) return;
        try {
            const bytes = await generateWorksheetPdf({
                title: config.title,
                subtitle: 'Blank Checklist',
                instructions: config.instructions,
                disclaimer: config.disclaimer,
                fields: buildPdfFields(false),
            });
            downloadPdf(bytes, `${config.id}-blank.pdf`);
        } catch (err: any) {
            alert('Failed to generate PDF: ' + err.message);
        }
    };

    const handleDownloadFilled = async () => {
        if (!config) return;
        try {
            const bytes = await generateWorksheetPdf({
                title: config.title,
                subtitle: `My Progress — ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
                instructions: config.instructions,
                disclaimer: config.disclaimer,
                fields: buildPdfFields(true),
            });
            downloadPdf(bytes, `${config.id}-progress.pdf`);
        } catch (err: any) {
            alert('Failed to generate PDF: ' + err.message);
        }
    };

    // ── Loading State ──
    if (loading) {
        return (
            <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center animate-pulse">
                        <ChecklistIcon />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Loading Checklist...</h3>
                </div>
            </section>
        );
    }

    if (error || !config) return null;

    // Compute progress
    const checkboxItems = config.items.filter(i => i.type === 'checkbox');
    const checkedCount = checkboxItems.filter(i => checkedItems[i.id]).length;
    const totalCheckboxes = checkboxItems.length;
    const progressPercent = totalCheckboxes > 0 ? Math.round((checkedCount / totalCheckboxes) * 100) : 0;

    // Group items by category
    const categories = groupByCategory(config.items);

    return (
        <section className="mt-12 p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-500/20">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                    <ChecklistIcon />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{config.title}</h3>
                    <p className="text-sm text-gray-500">{config.description}</p>
                </div>
                {saving && (
                    <span className="text-xs text-emerald-500 animate-pulse">Saving...</span>
                )}
            </div>

            {/* Download links */}
            <div className="mt-3 flex flex-wrap gap-3">
                <button onClick={handleDownloadBlank} className="text-sm flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                    <DownloadIcon /> Download Blank Checklist (PDF)
                </button>
                <button onClick={handleDownloadFilled} className="text-sm flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                    <DownloadIcon /> Download My Progress (PDF)
                </button>
            </div>

            {/* Progress bar (only for checkbox-type checklists) */}
            {totalCheckboxes > 0 && (
                <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{checkedCount} / {totalCheckboxes} completed</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Completion celebration */}
            {justCompleted && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-500/30">
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        All items checked! +10 XP
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
                        Great job completing this checklist. You can still update it anytime.
                    </p>
                </div>
            )}

            {/* Instructions */}
            <div className="mt-4 p-3 rounded-xl bg-emerald-100/50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/10">
                <p className="text-sm text-gray-700 dark:text-gray-300">{config.instructions}</p>
            </div>

            {/* Items grouped by category */}
            <div className="mt-6 space-y-6">
                {categories.map(({ category, items }) => (
                    <div key={category}>
                        {category && (
                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
                                {category}
                            </h4>
                        )}
                        <div className="space-y-2">
                            {items.map(item => (
                                <ItemRenderer
                                    key={item.id}
                                    item={item}
                                    checked={checkedItems[item.id] ?? false}
                                    value={fieldValues[item.id]}
                                    onCheck={handleCheck}
                                    onChange={handleFieldChange}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Disclaimer */}
            {config.disclaimer && (
                <p className="mt-6 text-xs text-gray-400 italic">{config.disclaimer}</p>
            )}
        </section>
    );
}

// ── Item Renderer ──

function ItemRenderer({
    item,
    checked,
    value,
    onCheck,
    onChange,
}: {
    item: ChecklistItem;
    checked: boolean;
    value: string | number | undefined;
    onCheck: (id: string, checked: boolean) => void;
    onChange: (id: string, value: string | number) => void;
}) {
    if (item.type === 'checkbox') {
        return (
            <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                checked
                    ? 'border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-500/30'
            }`}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={e => onCheck(item.id, e.target.checked)}
                    className="form-checkbox mt-0.5 rounded text-emerald-500 border-gray-300 dark:border-gray-600"
                />
                <span className={`text-sm ${
                    checked
                        ? 'text-emerald-700 dark:text-emerald-400 line-through opacity-70'
                        : 'text-gray-700 dark:text-gray-300'
                }`}>
                    {item.label}
                </span>
            </label>
        );
    }

    if (item.type === 'text') {
        return (
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {item.label}
                </label>
                <input
                    type="text"
                    value={String(value ?? '')}
                    onChange={e => onChange(item.id, e.target.value)}
                    placeholder={item.placeholder}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none"
                />
            </div>
        );
    }

    if (item.type === 'rating') {
        const min = item.min ?? 0;
        const max = item.max ?? 10;
        const count = max - min + 1;
        const current = value !== undefined ? Number(value) : undefined;

        return (
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {item.label}
                </label>
                <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: count }, (_, i) => min + i).map(v => (
                        <button
                            key={v}
                            type="button"
                            onClick={() => onChange(item.id, v)}
                            className={`w-8 h-8 rounded-lg border text-xs font-bold transition-colors ${
                                current === v
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-emerald-300'
                            }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between mt-1 px-0.5">
                    <span className="text-xs text-gray-400">{min} = Very Poor</span>
                    <span className="text-xs text-gray-400">{max} = Excellent</span>
                </div>
            </div>
        );
    }

    return null;
}

// ── Helpers ──

function groupByCategory(items: ChecklistItem[]): { category: string; items: ChecklistItem[] }[] {
    const groups: { category: string; items: ChecklistItem[] }[] = [];
    const seen = new Set<string>();

    for (const item of items) {
        const cat = item.category ?? '';
        if (!seen.has(cat)) {
            seen.add(cat);
            groups.push({ category: cat, items: [] });
        }
        groups.find(g => g.category === cat)!.items.push(item);
    }

    return groups;
}

// ── Icons ──

function ChecklistIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    );
}
