'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useComponentState } from './use-component-state';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Strategy {
    id: string;
    name: string;
    category: string;
    description: string;
    icon: string;
}

const DEFAULT_STRATEGIES: Strategy[] = [
    { id: 'exercise', name: 'Exercise & Movement', category: 'Physical', description: 'Walking, jogging, yoga, or any physical activity', icon: '🏃' },
    { id: 'breathing', name: 'Deep Breathing', category: 'Relaxation', description: 'Box breathing, diaphragmatic breathing', icon: '🌬️' },
    { id: 'sleep', name: 'Sleep Hygiene', category: 'Lifestyle', description: 'Consistent bedtime, dark room, no screens', icon: '😴' },
    { id: 'social', name: 'Social Connection', category: 'Social', description: 'Talking to a friend, family member, or support group', icon: '👥' },
    { id: 'mindfulness', name: 'Mindfulness Meditation', category: 'Mental', description: 'Focused attention, body scan, loving-kindness', icon: '🧘' },
    { id: 'nutrition', name: 'Balanced Nutrition', category: 'Lifestyle', description: 'Regular meals, reduced caffeine, hydration', icon: '🥗' },
    { id: 'journaling', name: 'Journaling', category: 'Mental', description: 'Writing thoughts, gratitude lists, worry dumps', icon: '📝' },
    { id: 'nature', name: 'Time in Nature', category: 'Physical', description: 'Parks, gardens, outdoor walks', icon: '🌳' },
    { id: 'grounding', name: 'Grounding Techniques', category: 'Relaxation', description: '5-4-3-2-1 senses, cold water, body awareness', icon: '🌍' },
    { id: 'hobbies', name: 'Creative Hobbies', category: 'Behavioral', description: 'Art, music, cooking, crafts — anything absorbing', icon: '🎨' },
];

const CATEGORY_COLORS: Record<string, string> = {
    Physical: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    Relaxation: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
    Lifestyle: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    Social: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    Mental: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    Behavioral: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
};

const STORAGE_KEY = 'interactive-lab-coping-ranker';
const COMPONENT_KEY = 'coping-ranker';

function loadOrder(): string[] | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveOrderToLS(ids: string[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch { /* storage full */ }
}

// ── Sortable Item ──

function SortableItem({ strategy, rank }: { strategy: Strategy; rank: number }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: strategy.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
    };

    const catColor = CATEGORY_COLORS[strategy.category] || 'bg-gray-100 text-gray-600';

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border bg-white dark:bg-gray-800 transition-shadow ${
                isDragging
                    ? 'shadow-xl border-indigo-400 dark:border-indigo-500 scale-[1.02]'
                    : 'border-gray-100 dark:border-gray-700 shadow-sm'
            }`}
        >
            {/* Drag handle */}
            <button
                {...attributes}
                {...listeners}
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                aria-label={`Reorder ${strategy.name}`}
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="9" cy="6" r="1.5" />
                    <circle cx="15" cy="6" r="1.5" />
                    <circle cx="9" cy="12" r="1.5" />
                    <circle cx="15" cy="12" r="1.5" />
                    <circle cx="9" cy="18" r="1.5" />
                    <circle cx="15" cy="18" r="1.5" />
                </svg>
            </button>

            {/* Rank number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{rank}</span>
            </div>

            {/* Icon */}
            <span className="text-xl flex-shrink-0">{strategy.icon}</span>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-100">{strategy.name}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${catColor}`}>
                        {strategy.category}
                    </span>
                </div>
                <p className="text-xs text-gray-400 truncate">{strategy.description}</p>
            </div>
        </div>
    );
}

// ── Main Component ──

export default function CopingStrategyRanker() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { state: serverState, loading: serverLoading, getComponentData, saveComponentData } = useComponentState();
    const hydratedRef = useRef(false);

    const [items, setItems] = useState<Strategy[]>(() => {
        const savedOrder = loadOrder();
        if (savedOrder) {
            const ordered = savedOrder
                .map(id => DEFAULT_STRATEGIES.find(s => s.id === id))
                .filter(Boolean) as Strategy[];
            const remaining = DEFAULT_STRATEGIES.filter(s => !savedOrder.includes(s.id));
            return [...ordered, ...remaining];
        }
        return DEFAULT_STRATEGIES;
    });

    // Hydrate from server state when available
    useEffect(() => {
        if (serverLoading) return;
        if (hydratedRef.current) return;
        hydratedRef.current = true;

        const serverData = getComponentData('copingRanker', COMPONENT_KEY);
        if (serverData && Array.isArray(serverData) && serverData.length > 0) {
            const ordered = serverData
                .map((id: string) => DEFAULT_STRATEGIES.find(s => s.id === id))
                .filter(Boolean) as Strategy[];
            const remaining = DEFAULT_STRATEGIES.filter(s => !serverData.includes(s.id));
            setItems([...ordered, ...remaining]);
        }
    }, [serverLoading, getComponentData]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const saveOrder = useCallback((ids: string[]) => {
        saveComponentData('copingRanker', COMPONENT_KEY, ids);
        saveOrderToLS(ids);
    }, [saveComponentData]);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setItems(prev => {
                const oldIndex = prev.findIndex(i => i.id === active.id);
                const newIndex = prev.findIndex(i => i.id === over.id);
                const next = arrayMove(prev, oldIndex, newIndex);
                saveOrder(next.map(s => s.id));
                return next;
            });
        }
    }

    const handleReset = () => {
        setItems(DEFAULT_STRATEGIES);
        saveOrder(DEFAULT_STRATEGIES.map(s => s.id));
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    };

    // Top 3 summary
    const top3 = items.slice(0, 3);

    if (!mounted) {
        return (
            <figure className="my-10 not-prose">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/80 dark:border-emerald-800/60 p-4 sm:p-6 shadow-sm">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                    <div className="space-y-2">
                        {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)}
                    </div>
                </div>
            </figure>
        );
    }

    return (
        <figure className="my-10 not-prose">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/80 dark:border-emerald-800/60 p-4 sm:p-6 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            Your Coping Strategy Ranking
                        </h3>
                        <p className="text-sm text-gray-500">
                            Drag to reorder by personal effectiveness. Your top strategies go first.
                        </p>
                    </div>
                    <button
                        onClick={handleReset}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        Reset order
                    </button>
                </div>

                {/* Top 3 badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {top3.map((s, i) => (
                        <span
                            key={s.id}
                            className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-700"
                        >
                            <span className="text-sm">{['🥇', '🥈', '🥉'][i]}</span>
                            {s.name}
                        </span>
                    ))}
                </div>

                {/* Sortable list */}
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                            {items.map((strategy, index) => (
                                <SortableItem key={strategy.id} strategy={strategy} rank={index + 1} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                <p className="text-xs text-gray-400 mt-4 text-center">
                    Your ranking is saved automatically. Review it as you learn new techniques.
                </p>
            </div>
        </figure>
    );
}
