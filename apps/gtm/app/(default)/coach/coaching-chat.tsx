"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { FounderProfile } from "@/types/profile";
import { GA4Events } from "@/lib/analytics/ga4";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CoachingChatProps {
  profile: FounderProfile;
}

export default function CoachingChat({ profile }: CoachingChatProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: isEs
        ? `¡Hola ${profile.name || ""}! Soy tu Asesor Solo. Revisé tu negocio ${profile.businessName || ""} y estoy listo para ayudarte a construir tu motor de ventas. ¿En qué piensas hoy?`
        : `Hello ${profile.name || "there"}! I'm your Solo Advisor. I've reviewed your business ${profile.businessName || ""} and I'm ready to help you build your sales engine. What's on your mind today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sessionStartRef = useRef(Date.now());
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    GA4Events.coachingSessionStarted();
    return () => {
      const duration = Math.round(
        (Date.now() - sessionStartRef.current) / 1000,
      );
      GA4Events.coachingSessionEnded(messagesRef.current.length, duration);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10), // Send last 10 messages for context
          context: {
            currentTopic: "General Coaching",
            ...(profile.progress?.currentCourse != null && {
              courseId: String(profile.progress.currentCourse),
            }),
            ...((profile.progress as any)?.lastVisitedLesson && {
              lastVisitedCourseId: (profile.progress as any).lastVisitedLesson
                .courseId,
              lastVisitedLessonId: (profile.progress as any).lastVisitedLesson
                .lessonId,
            }),
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMsg = data.error?.message || "Something went wrong";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I'm having trouble processing that request. ${errorMsg}. Please try again in a moment.`,
          },
        ]);
      } else if (data.data?.message) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.data.message },
        ]);
      } else if (data.message) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm sorry, I received an unexpected response. Please try again.",
          },
        ]);
      }
    } catch {
      // Network error - show user-friendly message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection lost. Please check your network.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto overflow-hidden shadow-2xl bg-white dark:bg-gray-800 rounded-2xl lg:my-4">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-primary-500 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
            SF
          </div>
          <div>
            <h2 className="font-bold">Solo Advisor AI</h2>
            <p className="text-xs text-primary-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {isEs ? 'En línea y listo para asesorar' : 'Online & Ready to Coach'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium opacity-80">
          {isEs ? 'Track:' : 'Track:'} {profile.stage || (isEs ? "Fundamentos" : "Foundation")}
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
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                m.role === "user"
                  ? "bg-primary-500 text-white rounded-tr-none"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none"
              }`}
            >
              <div
                className="text-sm leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: m.content
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(
                      /^### (.+)$/gm,
                      '<strong class="text-base block mt-3 mb-1">$1</strong>',
                    )
                    .replace(
                      /^## (.+)$/gm,
                      '<strong class="text-lg block mt-3 mb-1">$1</strong>',
                    )
                    .replace(
                      /^- (.+)$/gm,
                      '<span class="block pl-4">• $1</span>',
                    )
                    .replace(/^\d+\. (.+)$/gm, (_, text, offset, str) => {
                      const before = str.substring(0, offset);
                      const num = (before.match(/^\d+\. /gm) || []).length + 1;
                      return `<span class="block pl-4">${num}. ${text}</span>`;
                    })
                    .replace(
                      /`([^`]+)`/g,
                      '<code class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs">$1</code>',
                    )
                    .replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isEs ? "Describe tu desafío de ventas actual..." : "Describe your current sales challenge..."}
            disabled={isLoading}
            className="flex-1 bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-primary-500 focus:border-primary-500 px-4"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn bg-primary-500 text-white hover:bg-primary-600 px-6 py-2 rounded-xl disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {isLoading ? (isEs ? "Pensando..." : "Thinking...") : (isEs ? "Enviar" : "Send")}
          </button>
        </form>
        <p className="text-[10px] text-gray-400 mt-2 text-center uppercase tracking-widest font-bold">
          {isEs
            ? `Coaching personalizado para tu perfil de ${profile.businessModel || "negocio"}`
            : `Personalized coaching based on your ${profile.businessModel || "business"} profile`}
        </p>
      </div>
    </div>
  );
}
