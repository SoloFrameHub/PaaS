'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComponentState } from './use-component-state';

interface LogEntry {
    id: string;
    date: string;
    situation: string;
    expected: string;
    peak: string;
    ending: string;
    learned: string;
}

const STORAGE_KEY = 'interactive-lab-exposure-log';
const COMPONENT_KEY = 'exposure-log';

function loadEntries(): LogEntry[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveEntriesToLS(entries: LogEntry[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch { /* storage full */ }
}

function emptyEntry(): LogEntry {
    return {
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        date: new Date().toISOString().split('T')[0],
        situation: '',
        expected: '',
        peak: '',
        ending: '',
        learned: '',
    };
}

function EntryCard({
    entry,
    index,
    onUpdate,
    onRemove,
}: {
    entry: LogEntry;
    index: number;
    onUpdate: (id: string, field: keyof LogEntry, value: string) => void;
    onRemove: (id: string) => void;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-teal-200 dark:border-teal-800 bg-white/60 dark:bg-gray-800/60 p-4 space-y-3"
        >
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                    Exposure #{index + 1}
                </span>
                <button
                    onClick={() => onRemove(entry.id)}
                    className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center justify-center"
                    title="Remove this entry"
                >
                    &times;
                </button>
            </div>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                    <input
                        type="date"
                        value={entry.date}
                        onChange={(e) => onUpdate(entry.id, 'date', e.target.value)}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-600"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Situation</label>
                    <input
                        type="text"
                        value={entry.situation}
                        onChange={(e) => onUpdate(entry.id, 'situation', e.target.value)}
                        placeholder="What did you face?"
                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-600"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 min-[480px]:grid-cols-3 gap-2 sm:gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Expected (/100)</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={entry.expected}
                        onChange={(e) => onUpdate(entry.id, 'expected', e.target.value)}
                        placeholder="0-100"
                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-600"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Peak (/100)</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={entry.peak}
                        onChange={(e) => onUpdate(entry.id, 'peak', e.target.value)}
                        placeholder="0-100"
                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-600"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Ending (/100)</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={entry.ending}
                        onChange={(e) => onUpdate(entry.id, 'ending', e.target.value)}
                        placeholder="0-100"
                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-600"
                    />
                </div>
            </div>

            {/* Visual anxiety progression */}
            {entry.expected && entry.peak && entry.ending && (
                <div className="flex items-center gap-2 px-1">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex">
                        <div className="h-full bg-yellow-400 transition-all" style={{ width: `${Number(entry.expected)}%` }} />
                    </div>
                    <span className="text-[9px] text-gray-400">→</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex">
                        <div className="h-full bg-red-400 transition-all" style={{ width: `${Number(entry.peak)}%` }} />
                    </div>
                    <span className="text-[9px] text-gray-400">→</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex">
                        <div className="h-full bg-green-400 transition-all" style={{ width: `${Number(entry.ending)}%` }} />
                    </div>
                </div>
            )}

            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">What I Learned</label>
                <textarea
                    value={entry.learned}
                    onChange={(e) => onUpdate(entry.id, 'learned', e.target.value)}
                    placeholder="What happened? Was it as bad as expected?"
                    rows={2}
                    className="w-full resize-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-600"
                />
            </div>
        </motion.div>
    );
}

export default function ExposureLog() {
    const [entries, setEntries] = useState<LogEntry[]>(loadEntries);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { state: serverState, loading: serverLoading, getComponentData, saveComponentData } = useComponentState();
    const hydratedRef = useRef(false);

    // Hydrate from server state when available
    useEffect(() => {
        if (serverLoading) return;
        if (hydratedRef.current) return;
        hydratedRef.current = true;

        const serverData = getComponentData('exposureLogs', COMPONENT_KEY);
        if (serverData && Array.isArray(serverData) && serverData.length > 0) {
            setEntries(serverData);
        }
    }, [serverLoading, getComponentData]);

    const saveEntries = useCallback((next: LogEntry[]) => {
        saveComponentData('exposureLogs', COMPONENT_KEY, next);
        saveEntriesToLS(next);
    }, [saveComponentData]);

    const handleUpdate = useCallback((id: string, field: keyof LogEntry, value: string) => {
        setEntries(prev => {
            const next = prev.map(e => e.id === id ? { ...e, [field]: value } : e);
            saveEntries(next);
            return next;
        });
    }, [saveEntries]);

    const handleRemove = useCallback((id: string) => {
        setEntries(prev => {
            const next = prev.filter(e => e.id !== id);
            saveEntries(next);
            return next;
        });
    }, [saveEntries]);

    const handleAdd = useCallback(() => {
        setEntries(prev => {
            const next = [...prev, emptyEntry()];
            saveEntries(next);
            return next;
        });
    }, [saveEntries]);

    if (!mounted) {
        return (
            <figure className="my-10 not-prose">
                <div className="rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-800/40 p-4 sm:p-6">
                    <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                    <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                </div>
            </figure>
        );
    }

    return (
        <figure className="my-10 not-prose">
            <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border border-teal-200/80 dark:border-teal-800/60 p-4 sm:p-6 shadow-sm">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        Exposure Log
                    </h3>
                    <p className="text-sm text-gray-500">
                        Track each exposure practice. Record your anxiety before, during, and after — and what you learned.
                    </p>
                </div>

                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {entries.map((entry, index) => (
                            <EntryCard
                                key={entry.id}
                                entry={entry}
                                index={index}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {entries.length === 0 && (
                    <div className="py-10 text-center">
                        <div className="text-3xl mb-2">📋</div>
                        <p className="text-gray-500 text-sm mb-1">No exposure logs yet</p>
                        <p className="text-gray-400 text-xs mb-4">Start tracking your exposure practice sessions</p>
                    </div>
                )}

                <button
                    onClick={handleAdd}
                    className="mt-4 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm transition-colors flex items-center gap-1.5"
                >
                    <span className="text-lg leading-none">+</span> Log an Exposure
                </button>

                {entries.length > 0 && (
                    <p className="text-xs text-gray-400 mt-3 text-center">
                        {entries.length} exposure{entries.length !== 1 ? 's' : ''} logged. Your data is saved in this browser.
                    </p>
                )}
            </div>
        </figure>
    );
}
