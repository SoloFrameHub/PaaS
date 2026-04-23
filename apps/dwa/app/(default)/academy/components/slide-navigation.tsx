'use client';

import { useState, useEffect, useCallback, Children, ReactNode, ReactElement, isValidElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComponentState, hashText } from './use-component-state';

// ── Slide (structural — rendering handled by SlideNavigation) ──

interface SlideProps {
    title?: string;
    children: ReactNode;
}

export function Slide(_props: SlideProps) {
    // Never rendered directly — SlideNavigation reads its props
    return null;
}
// Preserve identity across RSC boundary — checked in extractSlides
Slide.displayName = 'Slide';

// ── SlideNavigation ──

interface SlideNavigationProps {
    children: ReactNode;
    persistKey?: string;
    showDots?: boolean;
}

interface SlideData {
    title?: string;
    children: ReactNode;
}

function extractSlides(children: ReactNode): SlideData[] {
    const slides: SlideData[] = [];
    Children.forEach(children, child => {
        if (isValidElement(child) && (child.type === Slide || (child.type as { displayName?: string; name?: string })?.displayName === 'Slide' || (child.type as { name?: string })?.name === 'Slide')) {
            const props = child.props as SlideProps;
            slides.push({ title: props.title, children: props.children });
        }
    });
    return slides;
}

export function SlideNavigation({ children, persistKey, showDots = true }: SlideNavigationProps) {
    const slides = extractSlides(children);
    const key = persistKey ?? `sl-${hashText(slides.map(s => s.title ?? '').join('|'))}`;
    const { state, updateSlideState } = useComponentState();

    const persisted = state?.slides?.[key];
    const [current, setCurrent] = useState(0);
    const [visited, setVisited] = useState<Set<number>>(new Set([0]));
    const [direction, setDirection] = useState(0); // -1 = left, 1 = right
    const [hasRestored, setHasRestored] = useState(false);

    // Restore persisted position on load
    useEffect(() => {
        if (persisted && !hasRestored) {
            setCurrent(persisted.current);
            setVisited(new Set(persisted.visited));
            setHasRestored(true);
        }
    }, [persisted, hasRestored]);

    const goTo = useCallback((index: number) => {
        if (index < 0 || index >= slides.length || index === current) return;
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
        setVisited(prev => {
            const next = new Set(prev);
            next.add(index);
            updateSlideState(key, index, Array.from(next));
            return next;
        });
    }, [current, slides.length, key, updateSlideState]);

    // Keyboard navigation
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'ArrowRight') goTo(current + 1);
            if (e.key === 'ArrowLeft') goTo(current - 1);
        }
        // Only add if this component is focused or hovered — use document level for simplicity
        // In practice, multiple SlideNavigations on one page are rare
        return () => {};
    }, [current, goTo]);

    if (slides.length === 0) return null;

    const slide = slides[current];

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
    };

    return (
        <div className="not-prose my-8">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                    {slide.title && (
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base truncate">
                            {slide.title}
                        </h3>
                    )}
                    <span className="text-xs text-gray-400 font-medium tabular-nums flex-shrink-0 ml-auto">
                        {current + 1} of {slides.length}
                    </span>
                </div>

                {/* Slide content */}
                <div className="relative overflow-hidden min-h-[120px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="p-4 sm:p-6"
                        >
                            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-strong:text-gray-800 dark:prose-strong:text-gray-100">
                                {slide.children}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer: nav buttons + dots */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                    <button
                        onClick={() => goTo(current - 1)}
                        disabled={current === 0}
                        className="px-4 py-2 text-sm font-medium rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        Previous
                    </button>

                    {showDots && slides.length > 1 && (
                        <div className="flex items-center gap-1.5">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                                        i === current
                                            ? 'bg-indigo-500 ring-2 ring-indigo-500/30 scale-110'
                                            : visited.has(i)
                                                ? 'bg-indigo-300 dark:bg-indigo-700'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => goTo(current + 1)}
                        disabled={current === slides.length - 1}
                        className="px-4 py-2 text-sm font-medium rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
