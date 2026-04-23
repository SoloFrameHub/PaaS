'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

interface ToolkitData {
    physical: string;
    grounding: string;
    copingThought: string;
    workedBefore1: string;
    workedBefore2: string;
    supportPerson: string;
}

const STORAGE_KEY = 'interactive-lab-toolkit-card';

function loadToolkit(): ToolkitData {
    if (typeof window === 'undefined') return defaultToolkit();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : defaultToolkit();
    } catch {
        return defaultToolkit();
    }
}

function defaultToolkit(): ToolkitData {
    return {
        physical: '',
        grounding: '',
        copingThought: '',
        workedBefore1: '',
        workedBefore2: '',
        supportPerson: '',
    };
}

function saveToolkit(data: ToolkitData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function ToolkitCard() {
    const [data, setData] = useState<ToolkitData>(defaultToolkit);
    const [mounted, setMounted] = useState(false);
    const [saved, setSaved] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setMounted(true);
        setData(loadToolkit());
    }, []);

    const save = useCallback((d: ToolkitData) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            saveToolkit(d);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 800);
    }, []);

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const update = useCallback((field: keyof ToolkitData, value: string) => {
        setData(prev => {
            const next = { ...prev, [field]: value };
            save(next);
            return next;
        });
    }, [save]);

    const filledCount = Object.values(data).filter(v => v.trim()).length;

    if (!mounted) {
        return (
            <figure className="my-10 not-prose">
                <div className="rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 p-6">
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => <div key={i} className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />)}
                    </div>
                </div>
            </figure>
        );
    }

    return (
        <figure className="my-10 not-prose">
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/80 dark:border-amber-800/60 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            Your Personal Anxiety Toolkit Card
                        </h3>
                        <p className="text-sm text-gray-500">
                            Fill this in and keep it handy — reference it whenever anxiety rises.
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
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                {filledCount}/6 filled
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            When I notice anxiety rising, I will:
                        </p>
                        <div className="space-y-2 pl-4">
                            <div className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold text-sm mt-1.5">1.</span>
                                <input
                                    type="text"
                                    value={data.physical}
                                    onChange={(e) => update('physical', e.target.value)}
                                    placeholder="Quick physical intervention (e.g., box breathing, cold water on wrists)"
                                    className="flex-1 bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600"
                                />
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold text-sm mt-1.5">2.</span>
                                <input
                                    type="text"
                                    value={data.grounding}
                                    onChange={(e) => update('grounding', e.target.value)}
                                    placeholder="Grounding or breathing technique (e.g., 5-4-3-2-1 senses)"
                                    className="flex-1 bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600"
                                />
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold text-sm mt-1.5">3.</span>
                                <input
                                    type="text"
                                    value={data.copingThought}
                                    onChange={(e) => update('copingThought', e.target.value)}
                                    placeholder='Helpful coping thought (e.g., "This feeling will pass")'
                                    className="flex-1 bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            What has worked for me before:
                        </p>
                        <div className="space-y-2 pl-4">
                            <div className="flex items-start gap-2">
                                <span className="text-amber-400 mt-1.5">&bull;</span>
                                <input
                                    type="text"
                                    value={data.workedBefore1}
                                    onChange={(e) => update('workedBefore1', e.target.value)}
                                    placeholder="A strategy or activity that helped reduce your anxiety"
                                    className="flex-1 bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600"
                                />
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-amber-400 mt-1.5">&bull;</span>
                                <input
                                    type="text"
                                    value={data.workedBefore2}
                                    onChange={(e) => update('workedBefore2', e.target.value)}
                                    placeholder="Another strategy or go-to coping method"
                                    className="flex-1 bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            My support person:
                        </p>
                        <div className="pl-4">
                            <input
                                type="text"
                                value={data.supportPerson}
                                onChange={(e) => update('supportPerson', e.target.value)}
                                placeholder="Name and how to reach them"
                                className="w-full bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600"
                            />
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mt-4 text-center">
                    Your toolkit card is saved automatically in this browser.
                </p>
            </div>
        </figure>
    );
}
