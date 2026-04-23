'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useComponentState, hashText } from './use-component-state';

interface CheckinProps {
    type: 'scale' | 'reflect' | 'choice';
    question: string;
    low?: string;
    high?: string;
    options?: string;
}

/** Simple hash for localStorage keys — consistent across renders */
function hashQuestion(q: string): string {
    let h = 0;
    for (let i = 0; i < q.length; i++) {
        h = ((h << 5) - h + q.charCodeAt(i)) | 0;
    }
    return `checkin_${Math.abs(h).toString(36)}`;
}

function ScaleInput({
    low,
    high,
    value,
    onChange,
}: {
    low: string;
    high: string;
    value: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400"
                    style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {value}
                </span>
            </div>
            <input
                type="range"
                min={1}
                max={10}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="checkin-slider"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{low}</span>
                <span>{high}</span>
            </div>
        </div>
    );
}

function ReflectInput({
    value,
    onChange,
    onBlur,
}: {
    value: string;
    onChange: (v: string) => void;
    onBlur: () => void;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const wordCount = useMemo(() => {
        const trimmed = value.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }, [value]);

    // Auto-grow textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    }, [value]);

    return (
        <div className="space-y-1">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                rows={2}
                placeholder="Take a moment to reflect..."
                className="w-full resize-none rounded-md border border-indigo-200 dark:border-indigo-800
                    bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400
                    transition-colors"
            />
            {wordCount > 0 && (
                <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
                    {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </p>
            )}
        </div>
    );
}

function ChoiceInput({
    options,
    selected,
    onSelect,
}: {
    options: string[];
    selected: string | null;
    onSelect: (v: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <button
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-150
                        ${
                            selected === opt
                                ? 'bg-indigo-100 dark:bg-indigo-900/60 border-indigo-400 dark:border-indigo-500 text-indigo-700 dark:text-indigo-300 font-medium shadow-sm'
                                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

export default function Checkin({
    type,
    question,
    low = 'Not at all',
    high = 'Very much',
    options,
}: CheckinProps) {
    const storageKey = useMemo(() => hashQuestion(question), [question]);
    const componentKey = useMemo(() => hashText(question), [question]);
    const { state: serverState, loading: serverLoading, getComponentData, saveComponentData } = useComponentState();
    const [expanded, setExpanded] = useState(false);
    const [saved, setSaved] = useState(false);

    // Type-specific state
    const [scaleValue, setScaleValue] = useState(5);
    const [reflectValue, setReflectValue] = useState('');
    const [choiceValue, setChoiceValue] = useState<string | null>(null);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hydratedRef = useRef(false);

    // Parse pipe-separated options
    const choiceOptions = useMemo(() => {
        if (!options) return [];
        return options.split('|').map((o) => o.trim()).filter(Boolean);
    }, [options]);

    // Load saved state: prefer server, fallback to localStorage
    useEffect(() => {
        if (serverLoading) return;
        if (hydratedRef.current) return;
        hydratedRef.current = true;

        // Try server state first
        const serverData = getComponentData('checkins', componentKey);
        if (serverData) {
            setSaved(true);
            if (type === 'scale' && typeof serverData.value === 'number') {
                setScaleValue(serverData.value);
                setExpanded(true);
            } else if (type === 'reflect' && typeof serverData.value === 'string') {
                setReflectValue(serverData.value);
                if (serverData.value) setExpanded(true);
            } else if (type === 'choice' && typeof serverData.value === 'string') {
                setChoiceValue(serverData.value);
                setExpanded(true);
            }
            return;
        }

        // Fallback to localStorage
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) {
                const data = JSON.parse(raw);
                setSaved(true);
                if (type === 'scale' && typeof data.value === 'number') {
                    setScaleValue(data.value);
                    setExpanded(true);
                } else if (type === 'reflect' && typeof data.value === 'string') {
                    setReflectValue(data.value);
                    if (data.value) setExpanded(true);
                } else if (type === 'choice' && typeof data.value === 'string') {
                    setChoiceValue(data.value);
                    setExpanded(true);
                }
            }
        } catch {
            // localStorage unavailable or corrupt — ignore
        }
    }, [serverLoading, storageKey, type, getComponentData, componentKey]);

    const persist = useCallback(
        (value: number | string) => {
            // Save to server
            saveComponentData('checkins', componentKey, { type, value });
            // Fallback: also save to localStorage
            try {
                localStorage.setItem(
                    storageKey,
                    JSON.stringify({ value, savedAt: new Date().toISOString() })
                );
            } catch {
                // Storage full or unavailable
            }
            setSaved(true);
            window.dispatchEvent(new CustomEvent('exercise-completed', { detail: { type: 'checkin' } }));
        },
        [storageKey, componentKey, type, saveComponentData]
    );

    // Scale handler — save immediately on change
    const handleScaleChange = useCallback(
        (v: number) => {
            setScaleValue(v);
            persist(v);
        },
        [persist]
    );

    // Reflect handler — debounce 2s, also save on blur
    const handleReflectChange = useCallback(
        (v: string) => {
            setReflectValue(v);
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                if (v.trim()) persist(v);
            }, 2000);
        },
        [persist]
    );

    const handleReflectBlur = useCallback(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (reflectValue.trim()) persist(reflectValue);
    }, [reflectValue, persist]);

    // Choice handler — save immediately
    const handleChoiceSelect = useCallback(
        (v: string) => {
            setChoiceValue(v);
            persist(v);
        },
        [persist]
    );

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="not-prose my-6"
        >
            <div
                className="relative rounded-lg overflow-hidden
                    bg-indigo-50/50 dark:bg-indigo-950/20
                    border border-indigo-100 dark:border-indigo-900/40"
            >
                {/* Gradient left border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500" />

                <div className="pl-4 pr-4 py-3 sm:pl-5 sm:pr-5 sm:py-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            {type === 'scale' ? 'Self-Rating' : type === 'reflect' ? 'Reflection' : 'Quick Check-in'}
                        </span>
                    </div>

                    {/* Question */}
                    <button
                        onClick={() => setExpanded(true)}
                        className={`w-full text-left text-sm font-medium text-gray-800 dark:text-gray-200
                            ${!expanded ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                        {question}
                        {!expanded && (
                            <span className="ml-2 text-xs font-normal text-indigo-400 dark:text-indigo-500">
                                Tap to respond
                            </span>
                        )}
                    </button>

                    {/* Expanded content */}
                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="mt-3"
                        >
                            {type === 'scale' && (
                                <ScaleInput
                                    low={low}
                                    high={high}
                                    value={scaleValue}
                                    onChange={handleScaleChange}
                                />
                            )}
                            {type === 'reflect' && (
                                <ReflectInput
                                    value={reflectValue}
                                    onChange={handleReflectChange}
                                    onBlur={handleReflectBlur}
                                />
                            )}
                            {type === 'choice' && (
                                <ChoiceInput
                                    options={choiceOptions}
                                    selected={choiceValue}
                                    onSelect={handleChoiceSelect}
                                />
                            )}

                            {/* Contextual feedback */}
                            {saved && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="mt-2 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400"
                                >
                                    <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    <span>
                                        {type === 'scale' && (
                                            scaleValue <= 3
                                                ? `Noted (${scaleValue}/10). This gives you a baseline to compare against as you work through the material.`
                                                : scaleValue <= 7
                                                ? `Noted (${scaleValue}/10). A mid-range rating — revisit this after the lesson to see if anything shifted.`
                                                : `Noted (${scaleValue}/10). That's a strong response. This check-in helps you track how your perspective develops.`
                                        )}
                                        {type === 'reflect' && 'Your reflection is saved. Putting thoughts into words builds self-awareness and helps you spot patterns over time.'}
                                        {type === 'choice' && 'Choice recorded. This helps personalize the lesson to your experience — refer back as you continue.'}
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
