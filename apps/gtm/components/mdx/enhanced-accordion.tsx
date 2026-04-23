'use client';

import { useState, useRef, useId } from 'react';

interface EnhancedAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function EnhancedAccordion({ title, children, defaultOpen = false }: EnhancedAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const headerId = `accordion-header-${id}`;
  const panelId = `accordion-panel-${id}`;

  return (
    <div className="not-prose my-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        id={headerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="font-bold text-gray-800 dark:text-gray-100 text-sm">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight ?? 1000}px` : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div className="p-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
