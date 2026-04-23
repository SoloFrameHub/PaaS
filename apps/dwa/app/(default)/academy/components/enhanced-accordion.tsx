'use client';

import { useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComponentState, hashText } from './use-component-state';

/* ------------------------------------------------------------------ */
/*  AccordionItem — a single collapsible section                       */
/* ------------------------------------------------------------------ */

interface AccordionItemProps {
    title: string;
    children?: ReactNode;
    content?: string;
    defaultOpen?: boolean;
    persistKey?: string;
}

export function AccordionItem({ title, children, content, defaultOpen = false, persistKey }: AccordionItemProps) {
    const key = persistKey ?? `acc-${hashText(title)}`;
    const { state, markAccordionOpened } = useComponentState();
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const wasOpened = state?.accordions?.opened?.includes(key) ?? false;

    const toggle = useCallback(() => {
        const opening = !isOpen;
        setIsOpen(opening);
        if (opening) {
            markAccordionOpened(key);
        }
    }, [isOpen, key, markAccordionOpened]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    }, [toggle]);

    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div
                className="flex items-center justify-between gap-3 p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/50 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={toggle}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base truncate">
                        {title}
                    </h3>
                    {wasOpened && !isOpen && (
                        <span className="flex-shrink-0 text-xs text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Read
                        </span>
                    )}
                </div>
                <motion.svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
            </div>

            {/* Content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 sm:p-5 sm:pt-0 border-t border-gray-100 dark:border-gray-800">
                            <div className="pt-4 prose prose-sm dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-strong:text-gray-800 dark:prose-strong:text-gray-100">
                                {children ?? content}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  EnhancedAccordion — single accordion or container for items        */
/* ------------------------------------------------------------------ */

interface EnhancedAccordionProps {
    title?: string;
    children?: ReactNode;
    items?: Array<{ title: string; content: string }>;
    defaultOpen?: boolean;
    persistKey?: string;
}

export default function EnhancedAccordion({ title, children, items, defaultOpen = false, persistKey }: EnhancedAccordionProps) {
    // Items array mode — render each item as its own AccordionItem
    if (items && items.length > 0) {
        return (
            <div className="not-prose my-6 space-y-3">
                {items.map((item, i) => (
                    <AccordionItem key={i} title={item.title} content={item.content} />
                ))}
            </div>
        );
    }

    // Container mode — no title, just wrap children (used with AccordionItem children)
    if (!title) {
        return (
            <div className="not-prose my-6 space-y-3">
                {children}
            </div>
        );
    }

    // Single collapsible section (original behavior)
    return (
        <div className="not-prose my-6">
            <AccordionItem title={title} defaultOpen={defaultOpen} persistKey={persistKey}>
                {children}
            </AccordionItem>
        </div>
    );
}
