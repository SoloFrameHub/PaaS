'use client';

import { useState } from 'react';

interface CoursePresentationProps {
    file: string;
    title: string;
}

export default function CoursePresentation({ file, title }: CoursePresentationProps) {
    const pdfPath = `/presentations/${file}`;
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Course Overview</h2>
                    <div className="flex items-center gap-3">
                        {/* Expand only on desktop — iframes don't render on mobile */}
                        <button
                            onClick={() => setExpanded(true)}
                            className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            Expand
                        </button>
                        <a
                            href={pdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open in new tab
                        </a>
                        <a
                            href={pdfPath}
                            download
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF
                        </a>
                    </div>
                </div>

                {/* Mobile: PDF iframes don't render on iOS/Android — show a tap-to-open card */}
                <div className="lg:hidden rounded-2xl border border-gray-100 dark:border-gray-700/60 bg-white dark:bg-gray-800 p-4 sm:p-8 shadow-sm text-center">
                    <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-3 font-semibold text-gray-800 dark:text-gray-100">{title}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Course presentation (PDF)</p>
                    <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={pdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open PDF
                        </a>
                        <a
                            href={pdfPath}
                            download
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                        </a>
                    </div>
                </div>

                {/* Desktop: inline iframe preview */}
                <div
                    onClick={() => setExpanded(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(true); } }}
                    className="hidden lg:block relative w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden shadow-sm cursor-pointer hover:shadow-md hover:border-primary-300 dark:hover:border-primary-500/40 transition-all group"
                >
                    <div className="relative w-full" style={{ height: '70vh', minHeight: '500px' }}>
                        <iframe
                            src={`${pdfPath}#toolbar=0&navpanes=0`}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            title={title}
                        />
                    </div>
                    {/* Click-to-expand overlay hint */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            Click to expand
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox overlay */}
            {expanded && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setExpanded(false);
                    }}
                >
                    <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                        {/* Lightbox header */}
                        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-900 shrink-0">
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">{title}</h3>
                            <div className="flex items-center gap-3">
                                <a
                                    href={pdfPath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    New tab
                                </a>
                                <a
                                    href={pdfPath}
                                    download
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download
                                </a>
                                <button
                                    onClick={() => setExpanded(false)}
                                    className="ml-2 p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    aria-label="Close"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {/* Full-size PDF */}
                        <div className="flex-1 min-h-0">
                            <iframe
                                src={pdfPath}
                                className="w-full h-full"
                                title={title}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
