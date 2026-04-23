'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComponentState } from './use-component-state';

/** A single feared situation with a SUDS rating */
interface FearItem {
    id: string;
    situation: string;
    suds: number; // 0-100
}

const SUDS_COLORS = [
    { min: 0, max: 25, bg: 'bg-green-50 dark:bg-green-900/30', border: 'border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-400', bar: '#22c55e', label: 'Low anxiety' },
    { min: 26, max: 50, bg: 'bg-yellow-50 dark:bg-yellow-900/30', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-700 dark:text-yellow-400', bar: '#eab308', label: 'Mild anxiety' },
    { min: 51, max: 75, bg: 'bg-orange-50 dark:bg-orange-900/30', border: 'border-orange-200 dark:border-orange-800', text: 'text-orange-700 dark:text-orange-400', bar: '#f97316', label: 'Moderate anxiety' },
    { min: 76, max: 100, bg: 'bg-red-50 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-400', bar: '#ef4444', label: 'High anxiety' },
];

function getSudsColor(suds: number) {
    return SUDS_COLORS.find(c => suds >= c.min && suds <= c.max) || SUDS_COLORS[0];
}

const STORAGE_KEY = 'interactive-lab-fear-hierarchy';
const COMPONENT_KEY = 'fear-hierarchy';

function loadItems(): FearItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveItemsToLS(items: FearItem[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* storage full */ }
}

// ── Situation Card ──

function SituationCard({
    item,
    step,
    total,
    onUpdate,
    onRemove,
}: {
    item: FearItem;
    step: number;
    total: number;
    onUpdate: (id: string, field: 'situation' | 'suds', value: string | number) => void;
    onRemove: (id: string) => void;
}) {
    const color = getSudsColor(item.suds);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className={`rounded-2xl border-2 ${color.border} ${color.bg} shadow-sm overflow-hidden`}
        >
            {/* SUDS progress bar */}
            <div className="h-1.5 bg-gray-200/50 dark:bg-gray-700/50">
                <div
                    className="h-full rounded-r-full transition-all duration-150"
                    style={{ width: `${item.suds}%`, backgroundColor: color.bar }}
                />
            </div>

            <div className="p-4">
                {/* Step label + remove */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Step {step} of {total} &mdash; Start here and work up
                    </span>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center justify-center"
                        title="Remove this step"
                    >
                        &times;
                    </button>
                </div>

                {/* Situation text input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={item.situation}
                    onChange={(e) => onUpdate(item.id, 'situation', e.target.value)}
                    placeholder="Type a feared situation (e.g., 'Making a phone call to a stranger')"
                    className="w-full bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 mb-3"
                />

                {/* SUDS slider */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-bold shrink-0">Anxiety<br/>Level</span>
                    <div className="flex-1 flex flex-col gap-0.5">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            value={item.suds}
                            onChange={(e) => onUpdate(item.id, 'suds', Number(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, ${color.bar} 0%, ${color.bar} ${item.suds}%, #e5e7eb ${item.suds}%, #e5e7eb 100%)`,
                            }}
                        />
                        <div className="flex justify-between text-[9px] text-gray-400">
                            <span>0 (calm)</span>
                            <span>50</span>
                            <span>100 (worst)</span>
                        </div>
                    </div>
                    <div className="text-right shrink-0 w-14">
                        <span className={`text-lg font-black ${color.text}`}>{item.suds}</span>
                        <p className={`text-[9px] font-bold uppercase tracking-wider ${color.text}`}>{color.label}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ── Main Component ──

export default function ExposureHierarchyBuilder() {
    const [items, setItems] = useState<FearItem[]>(loadItems);
    const { state: serverState, loading: serverLoading, getComponentData, saveComponentData } = useComponentState();
    const hydratedRef = useRef(false);

    // Hydrate from server state when available
    useEffect(() => {
        if (serverLoading) return;
        if (hydratedRef.current) return;
        hydratedRef.current = true;

        const serverData = getComponentData('exposureHierarchy', COMPONENT_KEY);
        if (serverData && Array.isArray(serverData) && serverData.length > 0) {
            setItems(serverData);
        }
    }, [serverLoading, getComponentData]);

    const saveItems = useCallback((next: FearItem[]) => {
        saveComponentData('exposureHierarchy', COMPONENT_KEY, next);
        saveItemsToLS(next);
    }, [saveComponentData]);

    const handleUpdate = useCallback((id: string, field: 'situation' | 'suds', value: string | number) => {
        setItems(prev => {
            const next = prev.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            );
            saveItems(next);
            return next;
        });
    }, [saveItems]);

    const handleRemove = useCallback((id: string) => {
        setItems(prev => {
            const next = prev.filter(item => item.id !== id);
            saveItems(next);
            return next;
        });
    }, [saveItems]);

    const handleAdd = useCallback(() => {
        setItems(prev => {
            const next = [...prev, {
                id: `fear-${Date.now()}`,
                situation: '',
                suds: 30,
            }];
            saveItems(next);
            return next;
        });
    }, [saveItems]);

    const handleReset = () => {
        setItems([]);
        saveItems([]);
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    };

    // Sort: highest SUDS at top (hardest), lowest at bottom (start here)
    const sorted = useMemo(() =>
        [...items].sort((a, b) => b.suds - a.suds),
        [items]
    );

    const sweetSpot = sorted.filter(i => i.suds >= 25 && i.suds <= 50);

    return (
        <figure className="my-10 not-prose">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200/80 dark:border-indigo-800/60 p-4 sm:p-6 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            Build Your Exposure Ladder
                        </h3>
                        <p className="text-sm text-gray-500">
                            List situations that trigger anxiety and rate each one 0-100. They&apos;ll sort automatically — start practicing from the bottom (easiest) up.
                        </p>
                    </div>
                </div>

                {/* SUDS Legend */}
                <div className="flex flex-wrap gap-2 mb-4 mt-3">
                    {SUDS_COLORS.map(c => (
                        <span key={c.label} className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/60 dark:bg-gray-800/40 px-2 py-1 rounded-lg">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.bar }} />
                            {c.min}-{c.max}: {c.label}
                        </span>
                    ))}
                </div>

                {/* Ladder direction indicator */}
                {sorted.length > 0 && (
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                        <span className="font-bold text-red-400">Hardest</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-red-300 via-yellow-300 to-green-300" />
                        <span className="font-bold text-green-500">Start here</span>
                    </div>
                )}

                {/* Sorted list */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {sorted.map((item, index) => (
                            <SituationCard
                                key={item.id}
                                item={item}
                                step={sorted.length - index}
                                total={sorted.length}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {items.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="text-4xl mb-3">🪜</div>
                        <p className="text-gray-500 text-sm mb-1">Build your exposure ladder</p>
                        <p className="text-gray-400 text-xs mb-4">Add situations that cause anxiety, from mild to most feared</p>
                        <button
                            onClick={handleAdd}
                            className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors"
                        >
                            + Add your first situation
                        </button>
                    </div>
                )}

                {/* Add + Reset buttons */}
                {items.length > 0 && (
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors flex items-center gap-1.5"
                        >
                            <span className="text-lg leading-none">+</span> Add Situation
                        </button>
                        <button
                            onClick={handleReset}
                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                {/* Sweet spot hint */}
                {items.length >= 3 && sweetSpot.length > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-yellow-50/80 dark:bg-yellow-900/20 border border-yellow-200/60 dark:border-yellow-800/40">
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">
                            <span className="font-bold">Recommended starting point:</span> Begin exposure practice with situations rated 25-50 (mild anxiety). You have {sweetSpot.length} situation{sweetSpot.length > 1 ? 's' : ''} in this range.
                        </p>
                    </div>
                )}

                <p className="text-xs text-gray-400 mt-3 text-center">
                    Your hierarchy is saved automatically in this browser.
                </p>
            </div>
        </figure>
    );
}
