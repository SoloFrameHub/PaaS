'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/app-provider';

/** Get a context-aware greeting based on current page */
function getInitialGreeting(pathname: string): string {
    // Lesson page
    if (/^\/academy\/[^/]+\/[^/]+/.test(pathname)) {
        return "I'm here to help with this lesson. Ask me to explain a concept, suggest a practice exercise, or talk through what you're learning.";
    }
    // Course page
    if (/^\/academy\/[^/]+$/.test(pathname)) {
        return "Exploring this course? I can help you understand what to expect, suggest where to start, or answer questions about the topics covered.";
    }
    // Academy catalog
    if (pathname === '/academy') {
        return "Looking for the right course? Tell me what you're working on and I'll help you find where to start.";
    }
    // Dashboard
    if (pathname === '/dashboard') {
        return "Welcome back! I can help you figure out what to focus on next, review your progress, or talk through anything on your mind.";
    }
    // Coach page
    if (pathname === '/coach') {
        return "I'm your wellness companion. What would you like to talk about today?";
    }
    // Default
    return "I'm your wellness companion. Ask me anything about your courses, techniques you're learning, or how to get the most from the platform.";
}

/** Extract course/lesson/section IDs from the current URL path */
function parseLessonContext(pathname: string): { courseId?: string; lessonId?: string; sectionId?: string; pageContext?: string } | undefined {
    // Academy lesson/course pages
    const academyMatch = pathname.match(/^\/academy\/([^/]+)(?:\/([^/]+))?/);
    if (academyMatch) {
        return { courseId: academyMatch[1], lessonId: academyMatch[2] };
    }

    // Map other known pages to a context description so the AI knows where the user is
    const pageMap: Record<string, string> = {
        '/dashboard': 'User is on their main dashboard',
        '/academy': 'User is browsing the course catalog',
        '/coach': 'User is on the dedicated AI coach page',
        '/mood': 'User is on the mood tracking page',
        '/journal': 'User is on the journaling page',
        '/crisis': 'User is viewing crisis support resources',
        '/settings': 'User is on their settings page',
        '/community': 'User is on the community/connect page',
    };

    for (const [path, context] of Object.entries(pageMap)) {
        if (pathname === path || pathname.startsWith(path + '/')) {
            return { pageContext: context };
        }
    }

    return undefined;
}

export default function FlyoutChat() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, crisisDetected?: boolean }[]>([
        { role: 'assistant', content: getInitialGreeting(pathname) }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    // Reset greeting on navigation if no user messages have been sent
    useEffect(() => {
        const hasUserMessages = messages.some(m => m.role === 'user');
        if (!hasUserMessages) {
            setMessages([{ role: 'assistant', content: getInitialGreeting(pathname) }]);
        }
    }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    // Listen for open-flyout-chat event dispatched by OpenAdvisorButton
    useEffect(() => {
        const handler = () => setIsOpen(true);
        window.addEventListener('open-flyout-chat', handler);
        return () => window.removeEventListener('open-flyout-chat', handler);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        const lessonContext = parseLessonContext(pathname);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.slice(-5),
                    context: lessonContext,
                })
            });

            if (!response.ok) {
                const json = await response.json();
                const errorMsg = json.error?.message || json.error || 'Something went wrong';
                setMessages(prev => [...prev, { role: 'assistant', content: `I'm having trouble right now. ${errorMsg}. If you need immediate support, call or text 988.` }]);
                return;
            }

            const crisisDetected = response.headers.get('X-Crisis-Detected') === 'true';
            const reader = response.body!.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';
            let messageAdded = false;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                fullContent += decoder.decode(value, { stream: true });

                if (!messageAdded) {
                    setMessages(prev => [...prev, { role: 'assistant', content: fullContent, crisisDetected }]);
                    setIsLoading(false);
                    messageAdded = true;
                } else {
                    setMessages(prev => {
                        const msgs = [...prev];
                        msgs[msgs.length - 1] = { role: 'assistant', content: fullContent, crisisDetected };
                        return msgs;
                    });
                }
            }

            if (!messageAdded) {
                setMessages(prev => [...prev, { role: 'assistant', content: 'Connection lost. Please check your network. If you need immediate support, call or text 988.' }]);
            }
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection lost. Please check your network. If you need immediate support, call or text 988.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Flyout Window */}
            <div className={`fixed bottom-24 right-6 z-[60] w-[380px] h-[520px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
                }`}>
                {/* Header */}
                <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center font-bold text-xs">SA</div>
                        <div>
                            <h4 className="font-bold text-sm">Quick Advisor AI</h4>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Ready to help
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Chat Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                    {messages.map((m, idx) => (
                        <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${m.role === 'user'
                                ? 'bg-primary-600 text-white rounded-br-none'
                                : m.crisisDetected
                                    ? 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100 border-2 border-red-200 dark:border-red-800 rounded-bl-none'
                                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                                }`}>
                                {m.content}
                                {m.crisisDetected && (
                                    <div className="mt-2 pt-2 border-t border-red-200 dark:border-red-700 text-xs">
                                        <a href="/crisis" className="font-semibold text-red-600 dark:text-red-400 hover:underline">
                                            View crisis support resources
                                        </a>
                                        {' | '}
                                        <a href="tel:988" className="font-semibold text-red-600 dark:text-red-400 hover:underline">
                                            Call/Text 988
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-gray-800 px-4 py-2.5 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Panel */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything..."
                            disabled={isLoading}
                            className="flex-1 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 px-4 h-10"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
