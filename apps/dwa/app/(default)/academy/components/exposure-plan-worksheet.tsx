'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useComponentState } from './use-component-state';

interface PlanData {
    targetFear: string;
    motivation: string;
    steps: { situation: string; rating: string }[];
    firstExposure: string;
    schedule: string;
}

const STORAGE_KEY = 'interactive-lab-exposure-plan';
const COMPONENT_KEY = 'exposure-plan';

function loadPlan(): PlanData {
    if (typeof window === 'undefined') return defaultPlan();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : defaultPlan();
    } catch {
        return defaultPlan();
    }
}

function defaultPlan(): PlanData {
    return {
        targetFear: '',
        motivation: '',
        steps: Array.from({ length: 7 }, () => ({ situation: '', rating: '' })),
        firstExposure: '',
        schedule: '',
    };
}

function savePlanToLS(plan: PlanData) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch { /* storage full */ }
}

function FieldInput({
    label,
    value,
    onChange,
    placeholder,
    multiline,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    multiline?: boolean;
}) {
    const Component = multiline ? 'textarea' : 'input';
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <Component
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
                placeholder={placeholder}
                {...(multiline ? { rows: 2 } : { type: 'text' })}
                className="w-full bg-white dark:bg-gray-900 border border-violet-200 dark:border-violet-800 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-600 resize-none"
            />
        </div>
    );
}

export default function ExposurePlanWorksheet() {
    const [plan, setPlan] = useState<PlanData>(defaultPlan);
    const [mounted, setMounted] = useState(false);
    const [saved, setSaved] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { state: serverState, loading: serverLoading, getComponentData, saveComponentData } = useComponentState();
    const hydratedRef = useRef(false);

    useEffect(() => {
        setMounted(true);
        setPlan(loadPlan());
    }, []);

    // Hydrate from server state when available
    useEffect(() => {
        if (serverLoading) return;
        if (hydratedRef.current) return;
        hydratedRef.current = true;

        const serverData = getComponentData('exposurePlans', COMPONENT_KEY);
        if (serverData && typeof serverData === 'object' && 'targetFear' in serverData) {
            setPlan(serverData as PlanData);
        }
    }, [serverLoading, getComponentData]);

    const save = useCallback((p: PlanData) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            // Save to server
            saveComponentData('exposurePlans', COMPONENT_KEY, p);
            // Fallback: also save to localStorage
            savePlanToLS(p);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 800);
    }, [saveComponentData]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const update = useCallback((field: keyof PlanData, value: string) => {
        setPlan(prev => {
            const next = { ...prev, [field]: value };
            save(next);
            return next;
        });
    }, [save]);

    const updateStep = useCallback((index: number, field: 'situation' | 'rating', value: string) => {
        setPlan(prev => {
            const steps = [...prev.steps];
            steps[index] = { ...steps[index], [field]: value };
            const next = { ...prev, steps };
            save(next);
            return next;
        });
    }, [save]);

    const addStep = useCallback(() => {
        setPlan(prev => {
            const next = { ...prev, steps: [...prev.steps, { situation: '', rating: '' }] };
            save(next);
            return next;
        });
    }, [save]);

    const removeStep = useCallback((index: number) => {
        setPlan(prev => {
            if (prev.steps.length <= 3) return prev;
            const steps = prev.steps.filter((_, i) => i !== index);
            const next = { ...prev, steps };
            save(next);
            return next;
        });
    }, [save]);

    const filledCount = [
        plan.targetFear,
        plan.motivation,
        plan.firstExposure,
        plan.schedule,
        ...plan.steps.map(s => s.situation),
    ].filter(v => v.trim()).length;

    if (!mounted) {
        return (
            <figure className="my-10 not-prose">
                <div className="rounded-2xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-800/40 p-4 sm:p-6">
                    <div className="h-6 w-52 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />)}
                    </div>
                </div>
            </figure>
        );
    }

    return (
        <figure className="my-10 not-prose">
            <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border border-violet-200/80 dark:border-violet-800/60 p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            Your Exposure Planning Worksheet
                        </h3>
                        <p className="text-sm text-gray-500">
                            Fill in your plan below. Everything auto-saves as you type.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {saved && (
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                Saved
                            </span>
                        )}
                        {filledCount > 0 && (
                            <span className="text-xs text-violet-500 font-medium">
                                {filledCount} field{filledCount !== 1 ? 's' : ''} filled
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <FieldInput
                        label="My Target Fear"
                        value={plan.targetFear}
                        onChange={(v) => update('targetFear', v)}
                        placeholder="e.g., Public speaking, driving on highways, social situations..."
                    />

                    <FieldInput
                        label="Why I Want to Overcome This"
                        value={plan.motivation}
                        onChange={(v) => update('motivation', v)}
                        placeholder="What will change in your life when you face this fear?"
                        multiline
                    />

                    {/* Hierarchy table */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            My Exposure Hierarchy
                        </label>
                        <div className="space-y-1.5">
                            <div className="hidden sm:grid grid-cols-[40px_1fr_100px] gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                                <span>Step</span>
                                <span>Situation</span>
                                <span>Rating (0-100)</span>
                            </div>
                            {plan.steps.map((step, index) => (
                                <div key={index} className="grid grid-cols-[28px_1fr_64px_24px] sm:grid-cols-[40px_1fr_100px_28px] gap-1.5 sm:gap-2 items-center group">
                                    <span className="text-sm font-bold text-violet-400 text-center">{index + 1}</span>
                                    <input
                                        type="text"
                                        value={step.situation}
                                        onChange={(e) => updateStep(index, 'situation', e.target.value)}
                                        placeholder="Describe the situation..."
                                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 sm:px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-600"
                                    />
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={step.rating}
                                        onChange={(e) => updateStep(index, 'rating', e.target.value)}
                                        placeholder="0-100"
                                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 sm:px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-600"
                                    />
                                    <button
                                        onClick={() => removeStep(index)}
                                        className={`w-6 h-6 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm flex items-center justify-center ${plan.steps.length <= 3 ? 'invisible' : 'opacity-0 group-hover:opacity-100'}`}
                                        title="Remove step"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addStep}
                            className="mt-2 text-xs text-violet-500 hover:text-violet-700 font-medium transition-colors"
                        >
                            + Add another step
                        </button>
                    </div>

                    <FieldInput
                        label="My First Exposure Will Be"
                        value={plan.firstExposure}
                        onChange={(v) => update('firstExposure', v)}
                        placeholder="Which step will you start with?"
                    />

                    <FieldInput
                        label="I Will Practice It On (day/time)"
                        value={plan.schedule}
                        onChange={(v) => update('schedule', v)}
                        placeholder="e.g., Tuesday at 3pm, Saturday morning..."
                    />
                </div>

                <p className="text-xs text-gray-400 mt-4 text-center">
                    Your worksheet is saved automatically in this browser.
                </p>
            </div>
        </figure>
    );
}
