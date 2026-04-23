'use client';

import { useState, useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComponentState, hashText } from './use-component-state';

/* ------------------------------------------------------------------ */
/*  Choice                                                             */
/* ------------------------------------------------------------------ */

interface ChoiceProps {
    /** InteractiveScenario child mode */
    label?: string;
    feedback?: string;
    type?: 'common' | 'avoidant' | 'healthy' | 'mixed';
    children?: ReactNode;
    /** Standalone knowledge-check mode */
    question?: string;
    options?: string;
    correct?: string;
    explanation?: string;
}

const TYPE_META: Record<string, { badge: string; color: string; bg: string; border: string }> = {
    common:   { badge: 'Common Response',    color: 'text-gray-600 dark:text-gray-300',   bg: 'bg-gray-100 dark:bg-gray-800',       border: 'border-gray-200 dark:border-gray-700' },
    avoidant: { badge: 'Avoidance Pattern',  color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-900/20',    border: 'border-amber-200 dark:border-amber-800' },
    healthy:  { badge: 'Effective Approach',  color: 'text-teal-700 dark:text-teal-300',   bg: 'bg-teal-50 dark:bg-teal-900/20',      border: 'border-teal-200 dark:border-teal-800' },
    mixed:    { badge: 'Mixed Strategy',      color: 'text-indigo-700 dark:text-indigo-300', bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-800' },
};

export function Choice({ label, feedback, type = 'common', children, question, options, correct, explanation }: ChoiceProps) {
    // When used as InteractiveScenario child (label/feedback), render nothing — data container
    if (label || feedback) {
        return null;
    }

    // When used standalone with question/options/correct/explanation, render a knowledge check
    if (question && options) {
        return <StandaloneChoice question={question} options={options} correct={correct} explanation={explanation} />;
    }

    // Fallback: render nothing
    return null;
}

/* ------------------------------------------------------------------ */
/*  Standalone Knowledge Check (used when Choice has question prop)     */
/* ------------------------------------------------------------------ */

function StandaloneChoice({ question, options, correct, explanation }: {
    question: string;
    options: string;
    correct?: string;
    explanation?: string;
}) {
    const parsedOptions = useMemo(() => options.split('|').map(o => o.trim()).filter(Boolean), [options]);
    const [selected, setSelected] = useState<string | null>(null);
    const [revealed, setRevealed] = useState(false);

    const handleSelect = useCallback((opt: string) => {
        if (revealed) return;
        setSelected(opt);
        setRevealed(true);
    }, [revealed]);

    const isCorrect = selected === correct;

    return (
        <div className="not-prose my-8 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 overflow-hidden">
            <div className="p-5 pb-3">
                <div className="flex items-center gap-1.5 mb-2">
                    <svg className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Knowledge Check</span>
                </div>
                <p className="font-bold text-gray-800 dark:text-gray-100 text-base">{question}</p>
            </div>
            <div className="px-5 pb-5 space-y-2">
                {parsedOptions.map((opt, i) => {
                    const isSelected = selected === opt;
                    const isCorrectOption = opt === correct;
                    let borderClass = 'border-gray-200 dark:border-gray-700';
                    let bgClass = 'bg-white dark:bg-gray-900';

                    if (revealed && isCorrectOption) {
                        borderClass = 'border-emerald-400 dark:border-emerald-600';
                        bgClass = 'bg-emerald-50 dark:bg-emerald-950/20';
                    } else if (revealed && isSelected && !isCorrect) {
                        borderClass = 'border-red-300 dark:border-red-700';
                        bgClass = 'bg-red-50 dark:bg-red-950/20';
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => handleSelect(opt)}
                            disabled={revealed}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${borderClass} ${bgClass} ${!revealed ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer' : 'cursor-default'}`}
                        >
                            <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                revealed && isCorrectOption
                                    ? 'bg-emerald-500 text-white'
                                    : revealed && isSelected && !isCorrect
                                    ? 'bg-red-400 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                            }`}>
                                {revealed && isCorrectOption ? (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                ) : revealed && isSelected && !isCorrect ? (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    String.fromCharCode(65 + i)
                                )}
                            </span>
                            <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">{opt}</span>
                        </button>
                    );
                })}
            </div>

            {/* Explanation shown after answering */}
            <AnimatePresence>
                {revealed && explanation && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mx-5 mb-5 rounded-xl bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800 p-4">
                            <div className="flex items-start gap-2">
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{explanation}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  InteractiveScenario                                                */
/* ------------------------------------------------------------------ */

interface ParsedChoice {
    label: string;
    feedback: string;
    type: 'common' | 'avoidant' | 'healthy' | 'mixed';
}

function hashStr(s: string): string {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return `scenario_${Math.abs(h).toString(36)}`;
}

interface InteractiveScenarioProps {
    title: string;
    description?: string;
    /** Alias for description — many MDX files use scenario= instead of description= */
    scenario?: string;
    children: ReactNode;
}

export default function InteractiveScenario({ title, description, scenario, children }: InteractiveScenarioProps) {
    const desc = description || scenario || '';
    const storageKey = useMemo(() => hashStr(title + desc), [title, desc]);
    const componentKey = useMemo(() => hashText(title + desc), [title, desc]);
    const { state: serverState, loading: serverLoading, getComponentData, saveComponentData } = useComponentState();
    const hydratedRef = useRef(false);

    // Parse Choice children from MDX
    const choices = useMemo<ParsedChoice[]>(() => {
        const result: ParsedChoice[] = [];
        const kids = Array.isArray(children) ? children : [children];
        for (const child of kids) {
            if (child && typeof child === 'object' && 'props' in child) {
                const p = (child as React.ReactElement<ChoiceProps>).props;
                if (p?.label && p?.feedback) {
                    result.push({
                        label: p.label,
                        feedback: p.feedback,
                        type: p.type ?? 'common',
                    });
                }
            }
        }
        return result;
    }, [children]);

    const [expanded, setExpanded] = useState<Set<number>>(new Set());

    // Load persisted state: prefer server, fallback to localStorage
    useEffect(() => {
        if (serverLoading) return;
        if (hydratedRef.current) return;
        hydratedRef.current = true;

        const serverData = getComponentData('scenarios', componentKey);
        if (serverData && Array.isArray(serverData)) {
            setExpanded(new Set(serverData));
            return;
        }

        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) {
                const data = JSON.parse(raw);
                if (Array.isArray(data.explored)) {
                    setExpanded(new Set(data.explored));
                }
            }
        } catch { /* ignore */ }
    }, [serverLoading, storageKey, componentKey, getComponentData]);

    const toggleChoice = useCallback((index: number) => {
        setExpanded(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            const exploredArray = Array.from(next);
            // Save to server
            saveComponentData('scenarios', componentKey, exploredArray);
            // Fallback: also save to localStorage
            try {
                localStorage.setItem(storageKey, JSON.stringify({
                    explored: exploredArray,
                    savedAt: new Date().toISOString(),
                }));
            } catch { /* storage full */ }
            return next;
        });
    }, [storageKey, componentKey, saveComponentData]);

    const exploredCount = expanded.size;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="not-prose my-8"
        >
            <div className="rounded-2xl border-2 border-rose-200 dark:border-rose-800/60 bg-gradient-to-br from-rose-50 to-purple-50 dark:from-rose-950/20 dark:to-purple-950/20 overflow-hidden">
                {/* Header */}
                <div className="p-5 pb-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                            </svg>
                            What Would You Do?
                        </span>
                        {choices.length > 0 && (
                            <span className="text-xs text-rose-400 dark:text-rose-500">
                                {exploredCount} of {choices.length} explored
                            </span>
                        )}
                    </div>

                    <p className="font-bold text-gray-800 dark:text-gray-100 text-base mb-2">
                        {title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {desc}
                    </p>
                </div>

                {/* Choices */}
                <div className="px-5 pb-5 space-y-2">
                    {choices.map((choice, i) => {
                        const isOpen = expanded.has(i);
                        const meta = TYPE_META[choice.type] ?? TYPE_META.common;

                        return (
                            <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                                <button
                                    onClick={() => toggleChoice(i)}
                                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                    aria-expanded={isOpen}
                                >
                                    {/* Choice indicator */}
                                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                        isOpen
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                    }`}>
                                        {isOpen ? (
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        ) : (
                                            String.fromCharCode(65 + i) // A, B, C, D
                                        )}
                                    </span>

                                    <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {choice.label}
                                    </span>

                                    <motion.svg
                                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 pt-0">
                                                <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
                                                    {/* Type badge */}
                                                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${meta.color} ${meta.bg} ${meta.border} border`}>
                                                        {meta.badge}
                                                    </span>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                        {choice.feedback}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Insight message after exploring at least one */}
                <AnimatePresence>
                    {exploredCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="px-5 pb-4">
                                <p className="text-xs text-rose-500 dark:text-rose-400 italic leading-relaxed">
                                    All of these reactions are normal. There are no wrong answers here — the goal is to expand your awareness of your patterns and build more options over time.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
