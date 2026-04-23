'use client';

import { useState, useRef, useEffect } from 'react';
interface Message {
    role: 'user' | 'assistant';
    content: string;
    crisisDetected?: boolean;
}

interface CoachingChatProps {
    profile: {
        displayName?: string | null;
        name?: string;
        questionnaire?: {
            primarySymptoms?: { category: string; isPrimary: boolean }[];
        } | null;
    };
}

export default function CoachingChat({ profile }: CoachingChatProps) {
    const displayName = profile.displayName || profile.name || 'there';
    const primaryFocus = profile.questionnaire?.primarySymptoms?.find(s => s.isPrimary)?.category;

    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: `Hello${displayName ? ` ${displayName}` : ''}! I'm your Wellness Coach. I'm here to support you with evidence-based techniques and compassionate guidance${primaryFocus ? `, especially around managing ${primaryFocus.replace('-', ' ')}` : ''}. How are you feeling today?`
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const transcribeAudio = async (blob: Blob) => {
        setIsTranscribing(true);
        try {
            const formData = new FormData();
            // Use webm extension so Whisper accepts it
            formData.append('audio', new File([blob], 'recording.webm', { type: blob.type }));
            const res = await fetch('/api/ai/voice/stt', { method: 'POST', body: formData });
            if (res.ok) {
                const { text } = await res.json();
                if (text) setInput(text);
            }
        } catch {
            // Silently fail — user can just type instead
        } finally {
            setIsTranscribing(false);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioChunksRef.current = [];
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            recorder.onstop = () => {
                stream.getTracks().forEach(t => t.stop());
                const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
                transcribeAudio(blob);
            };

            recorder.start();
            setIsRecording(true);
        } catch {
            // Mic permission denied or unavailable — do nothing
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        mediaRecorderRef.current = null;
        setIsRecording(false);
    };

    const speakText = async (text: string) => {
        // Stop any currently playing audio
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        setIsSpeaking(true);
        try {
            const res = await fetch('/api/ai/voice/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            if (!res.ok) return;
            const audioBlob = await res.blob();
            const url = URL.createObjectURL(audioBlob);
            const audio = new Audio(url);
            currentAudioRef.current = audio;
            audio.onended = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                setIsSpeaking(false);
            };
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                setIsSpeaking(false);
            };
            await audio.play();
        } catch {
            setIsSpeaking(false);
        }
    };

    const stopSpeaking = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        setIsSpeaking(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(-10),
                    context: {
                        pageContext: 'User is on the dedicated Wellness Coach page'
                    }
                })
            });

            if (!response.ok) {
                const data = await response.json();
                const errorMsg = data.error?.message || data.error || 'Something went wrong';
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `I'm having trouble right now. ${errorMsg}. Please try again, and remember - if you need immediate support, 988 is always available.`
                }]);
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
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "I'm sorry, I received an unexpected response. Please try again."
                }]);
            } else if (ttsEnabled && !crisisDetected && fullContent) {
                // Don't auto-speak crisis messages — user needs to read those carefully
                speakText(fullContent);
            }
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Connection lost. Please check your network. If you need immediate support, call or text 988."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full max-w-5xl mx-auto overflow-hidden shadow-2xl bg-white dark:bg-gray-800 rounded-2xl lg:my-4">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-bold">Wellness Coach</h2>
                        <p className="text-xs text-teal-100 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Here to support you
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* TTS toggle */}
                    <button
                        type="button"
                        onClick={() => {
                            if (isSpeaking) stopSpeaking();
                            setTtsEnabled(prev => !prev);
                        }}
                        title={ttsEnabled ? 'Turn off voice responses' : 'Turn on voice responses'}
                        className={`text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${ttsEnabled ? 'bg-white/30 ring-1 ring-white/60' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        {isSpeaking ? (
                            // Stop icon when actively speaking
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="6" y="6" width="12" height="12" rx="1" />
                            </svg>
                        ) : ttsEnabled ? (
                            // Speaker-on icon
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12l-4-4H5a1 1 0 01-1-1V11a1 1 0 011-1h3l4-4z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728" />
                            </svg>
                        ) : (
                            // Speaker-off icon
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        )}
                        <span>{ttsEnabled ? (isSpeaking ? 'Stop' : 'Voice on') : 'Voice off'}</span>
                    </button>
                    <a
                        href="tel:988"
                        className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        988 Crisis Line
                    </a>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900/50"
            >
                {messages.map((m, idx) => (
                    <div
                        key={idx}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${m.role === 'user'
                            ? 'bg-teal-500 text-white rounded-tr-none'
                            : m.crisisDetected
                                ? 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100 border-2 border-red-200 dark:border-red-800 rounded-tl-none'
                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none'
                            }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isTranscribing || isLoading}
                        title={isRecording ? 'Stop recording' : 'Speak your message'}
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 ${
                            isRecording
                                ? 'bg-red-500 text-white animate-pulse'
                                : isTranscribing
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/30'
                        }`}
                    >
                        {isTranscribing ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        )}
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isRecording ? 'Listening...' : isTranscribing ? 'Transcribing...' : 'Share what\'s on your mind...'}
                        disabled={isLoading || isRecording || isTranscribing}
                        className="flex-1 bg-gray-50 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-teal-500 focus:border-teal-500 px-4"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="btn bg-teal-500 text-white hover:bg-teal-600 px-6 py-2 rounded-xl disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                        {isLoading ? 'Thinking...' : 'Send'}
                    </button>
                </form>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                    This is educational support, not therapy. For crisis support, call/text 988.
                </p>
            </div>
        </div>
    );
}
