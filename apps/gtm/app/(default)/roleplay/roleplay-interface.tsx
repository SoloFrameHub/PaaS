"use client";

import { useState, useRef, useEffect } from "react";
import { FounderProfile } from "@/types/profile";
import { getIndustries } from "@/lib/api/onboarding-client";

import type { Industry, ClientRole } from "@/types/roleplay";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Mic, Square, Volume2, VolumeX } from "lucide-react";
import { GA4Events } from "@/lib/analytics/ga4";
import { useLocale } from "next-intl";
import { getAvailableCountries } from "@/lib/data/country-variants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const METHODOLOGIES = ["MEDDIC", "SPIN", "CHALLENGER"] as const;

interface RoleplayInterfaceProps {
  profile: FounderProfile;
}

export default function RoleplayInterface({ profile }: RoleplayInterfaceProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [step, setStep] = useState<"setup" | "chat">("setup");

  // Matrix State
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [roles, setRoles] = useState<ClientRole[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [methodology, setMethodology] = useState<string>(METHODOLOGIES[0]);

  // LatAm country variant (only shown when locale=es)
  const [countryCode, setCountryCode] = useState<string>("CO");
  const countries = isEs ? getAvailableCountries() : [];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Voice Mode State
  const [voiceMode, setVoiceMode] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const {
    isRecording,
    startRecording,
    stopRecording,
    hasMicrophonePermission,
    error: micError,
  } = useAudioRecorder();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrlRef = useRef<string | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
    };
  }, []);

  // Play TTS
  const speakText = async (text: string) => {
    if (!voiceMode) return;

    try {
      // Stop current audio if playing and revoke previous URL
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }

      const response = await fetch("/api/ai/voice/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("TTS Failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        if (audioUrlRef.current === url) audioUrlRef.current = null;
      };
      audio.play();
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };

  const handleMicrophoneClick = async () => {
    if (isRecording) {
      const blob = await stopRecording();
      if (blob) {
        setIsTranscribing(true);
        try {
          const formData = new FormData();
          formData.append("audio", blob, "recording.webm");

          const response = await fetch("/api/ai/voice/stt", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            setError(
              "Failed to transcribe audio. Please try again or type your message.",
            );
            return;
          }

          const data = await response.json();
          if (data.text) {
            setInput((prev) => (prev ? prev + " " : "") + data.text);
          }
        } catch (error) {
          console.error("STT Error:", error);
        } finally {
          setIsTranscribing(false);
        }
      }
    } else {
      await startRecording();
    }
  };

  // Initial Fetch: Industries
  useEffect(() => {
    const fetchIndustries = async () => {
      const data = await getIndustries();
      setIndustries(data);
      // Default to profile's industry if available
      const profIndustry = profile.inferred?.industryVertical
        ?.toLowerCase()
        .replace(/\s+/g, "_");
      if (profIndustry && data.some((i) => i.industry_id === profIndustry)) {
        setSelectedIndustry(profIndustry);
      } else if (data.length > 0) {
        setSelectedIndustry(data[0].industry_id);
      }
    };
    fetchIndustries();
  }, [profile.inferred?.industryVertical]);

  // Fetch Roles when Industry changes
  useEffect(() => {
    const fetchRoles = async () => {
      if (!selectedIndustry) return;
      try {
        const res = await fetch(
          `/api/roleplay/roles?industryId=${selectedIndustry}`,
        );
        if (res.ok) {
          const response = await res.json();
          const data = response.data || [];
          setRoles(data);
          if (data.length > 0) {
            setSelectedRole(data[0].role_id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch roles:", err);
      }
    };
    fetchRoles();
  }, [selectedIndustry]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startRoleplay = () => {
    const role = roles.find((r) => r.role_id === selectedRole);
    const ind = industries.find((i) => i.industry_id === selectedIndustry);

    setMessages([
      {
        role: "assistant",
        content: `(System: The scene is set. ${role?.display_name || "The prospect"} from a ${ind?.display_name || "company"} is waiting on the Zoom call.)\n\n"Hi, I'm ${role?.display_name.split(" ")[0] || "the prospect"}. Thanks for taking the time today. I've only got about 15 minutes, so let's get right into it. What are we here to discuss?"`,
      },
    ]);
    setStep("chat");
    GA4Events.roleplayStarted(selectedIndustry, selectedRole, methodology);
  };

  const handleSendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/roleplay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industryId: selectedIndustry,
          roleId: selectedRole,
          salesMethodology: methodology,
          message: userMessage,
          history: messages.slice(-10),
          locale: isEs ? "es" : "en",
          countryCode: isEs ? countryCode : undefined,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          responseData.error?.message || `Request failed (${response.status})`,
        );
      }
      const data = responseData.data || {};
      if (data.message) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
        if (voiceMode) {
          speakText(data.message);
        }
      } else {
        throw new Error("No response received from AI");
      }
    } catch (error) {
      console.error("Roleplay error:", error);
      setError(isEs ? "No se pudo obtener respuesta del coach IA. Inténtalo de nuevo." : "Failed to get response from AI coach. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    if (messages.length < 2) {
      setStep("setup");
      return;
    }

    if (
      !confirm(
        isEs
          ? "¿Seguro que quieres terminar esta sesión? Tu progreso se guardará para evaluación."
          : "Are you sure you want to end this session? Your progress will be saved for evaluation.",
      )
    ) {
      return;
    }

    setIsEvaluating(true);
    setShowEvalModal(true);

    try {
      const response = await fetch("/api/ai/roleplay/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industryId: selectedIndustry,
          roleId: selectedRole,
          history: messages,
          locale: isEs ? "es" : "en",
          countryCode: isEs ? countryCode : undefined,
        }),
      });

      const responseData = await response.json();
      const data = responseData.data || {};
      if (data.evaluation) {
        setEvaluationResult(data.evaluation);
        GA4Events.roleplayCompleted(
          selectedIndustry,
          selectedRole,
          messages.length,
          0,
          data.evaluation.overallScore,
        );
      }
    } catch (error) {
      console.error("Evaluation error:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  if (step === "setup") {
    return (
      <div className="max-w-4xl w-full mx-auto p-6 lg:p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-gray-800 dark:text-gray-100 mb-2">
            {isEs ? "Simulación de Ventas" : "Initialize Sales Simulation"} 🥋
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {isEs
              ? "Practica tus habilidades de venta contra personas IA antes de tu próxima reunión real."
              : "Battle-test your sales skills against AI personas before you step into a real meeting."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            {/* Country Variant (Spanish only) */}
            {isEs && countries.length > 0 && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-4">
                  Contexto de País
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setCountryCode(c.code)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                        countryCode === c.code
                          ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20"
                          : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300"
                      }`}
                    >
                      {c.flag} {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Industry Selection */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-4 font-bold">
                {isEs ? "1. Selecciona Industria" : "1. Select Industry"}
              </h3>
              <select
                name="industry"
                data-testid="industry-select"
                className="form-select w-full bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700 rounded-xl"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map((ind) => (
                  <option key={ind.industry_id} value={ind.industry_id}>
                    {ind.display_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Selection */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-4 font-bold">
                {isEs ? "2. Elige Tu Oponente" : "2. Choose Your Opponent"}
              </h3>
              <select
                name="clientRole"
                data-testid="role-select"
                className="form-select w-full bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700 rounded-xl"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((r) => (
                  <option key={r.role_id} value={r.role_id}>
                    {r.display_name} ({r.disc_type} - {r.seniority_level})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-8">
            {/* methodology Selection */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-4 font-bold">
                {isEs ? "3. Elige Metodología" : "3. Choose Weaponry"}
              </h3>
              <select
                name="methodology"
                data-testid="methodology-select"
                className="form-select w-full bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700 rounded-xl"
                value={methodology}
                onChange={(e) => setMethodology(e.target.value)}
              >
                {METHODOLOGIES.map((m) => (
                  <option key={m} value={m}>
                    {m} Framework
                  </option>
                ))}
              </select>
            </div>

            {/* Summary Box */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              <h4 className="text-xs font-black uppercase text-gray-400 mb-4">
                {isEs ? "Vista Previa" : "Simulation Preview"}
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{isEs ? "Industria:" : "Industry:"}</span>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    {
                      industries.find((i) => i.industry_id === selectedIndustry)
                        ?.display_name
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{isEs ? "Persona:" : "Persona:"}</span>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    {
                      roles.find((r) => r.role_id === selectedRole)
                        ?.display_name
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{isEs ? "Dificultad:" : "Difficulty:"}</span>
                  <span className="font-bold text-amber-500">
                    {isEs ? "Dinámica Calculada" : "Calculated Dynamic"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={startRoleplay}
            data-testid="start-roleplay-button"
            className="btn bg-primary-500 text-white hover:bg-primary-600 px-12 py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary-500/30"
          >
            {isEs ? "Iniciar Simulación →" : "Enter Simulation →"}
          </button>
        </div>
      </div>
    );
  }

  const currentRole = roles.find((r) => r.role_id === selectedRole);
  const currentIndustry = industries.find(
    (i) => i.industry_id === selectedIndustry,
  );

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto overflow-hidden shadow-2xl bg-white dark:bg-gray-800 rounded-3xl lg:my-4 border border-gray-100 dark:border-gray-700">
      {/* Simulation Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-900 text-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setStep("setup")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h2 className="font-black flex items-center gap-2 tracking-tight">
              <span className="text-primary-500 uppercase text-xs font-bold tracking-[0.2em]">
                Simulation:
              </span>
              {currentIndustry?.display_name} Context
            </h2>
            <div className="flex items-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              <span>
                Target: {currentRole?.display_name} ({currentRole?.disc_type})
              </span>
              <span>Method: {methodology}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleEndSession}
            data-testid="end-session-button"
            className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-bold px-4 py-2 rounded-xl transition-all"
          >
            {isEs ? "Terminar Sesión" : "End Session"}
          </button>
          <div className="px-3 py-1 bg-primary-500/20 text-primary-400 border border-primary-500/30 rounded-full text-xs font-black uppercase tracking-widest">
            Live Lab
          </div>
        </div>
      </div>

      {/* Voice Mode Toggle Bar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceMode(!voiceMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              voiceMode
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                : "bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {voiceMode ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            {voiceMode
              ? (isEs ? "Modo Voz Activo" : "Voice Mode Active")
              : (isEs ? "Modo Voz Inactivo" : "Voice Mode Off")}
          </button>
          {voiceMode && (
            <span className="text-[10px] text-gray-400 uppercase tracking-wide animate-pulse">
              • AI Audio Enabled
            </span>
          )}
        </div>
      </div>

      {/* Lab Screen */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50 dark:bg-gray-900/50 scroll-smooth"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            data-testid="chat-message"
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-6 py-4 rounded-3xl shadow-sm ${
                m.role === "user"
                  ? "bg-primary-500 text-white rounded-br-none font-medium"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none prose-sm leading-relaxed"
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">
                {m.role === "user"
                  ? (isEs ? "Tú (Vendedor)" : "You (Seller)")
                  : `${currentRole?.display_name || (isEs ? "Prospecto" : "Prospect")} (${isEs ? "Prospecto" : "Prospect"})`}
              </div>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl rounded-tl-none px-6 py-4 shadow-sm">
              <div className="flex gap-1.5 opacity-40">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="px-8 py-2">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/30 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Comms Panel */}
      <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <textarea
            data-testid="chat-input"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder={
              isRecording
                ? (isEs ? "Escuchando..." : "Listening...")
                : (isEs ? "Escribe tu respuesta... (Shift+Enter para nueva línea)" : "Type your response... (Shift+Enter for new line)")
            }
            disabled={isLoading || isTranscribing}
            className={`flex-1 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-primary-500 focus:border-primary-500 px-4 py-3 resize-none text-sm font-medium ${isRecording ? "animate-pulse border-red-500 bg-red-50 dark:bg-red-900/10" : ""}`}
          />

          {/* Microphone Button */}
          <button
            type="button"
            onClick={handleMicrophoneClick}
            disabled={isLoading || isTranscribing}
            aria-label={isRecording ? "Stop Recording" : "Start Recording"}
            className={`btn p-3 rounded-2xl transition-all ${
              isRecording
                ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30"
                : isTranscribing
                  ? "bg-gray-200 text-gray-400"
                  : "bg-white dark:bg-gray-800 text-gray-400 hover:text-primary-500 border border-gray-200 dark:border-gray-700"
            } ${micError ? "border-red-500" : ""}`}
            title={micError || "Hold to speak"}
          >
            {isRecording ? (
              <Square className="w-5 h-5 fill-current" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
          <button
            type="submit"
            data-testid="send-message-button"
            disabled={isLoading || !input.trim()}
            className="btn bg-primary-500 text-white hover:bg-primary-600 px-8 rounded-2xl disabled:opacity-50 transition-all font-black"
          >
            {isEs ? "Enviar" : "Say it"}
          </button>
        </form>
      </div>

      {/* Evaluation Modal */}
      {showEvalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            {isEvaluating ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mb-6"></div>
                <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">
                  {isEs ? "Analizando Rendimiento..." : "Analyzing Performance..."}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {isEs
                    ? "Nuestro coach IA está revisando la conversación."
                    : "Our AI coach is reviewing the transcript against the 3D Matrix context."}
                </p>
              </div>
            ) : evaluationResult ? (
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 mb-1">
                      {isEs ? "Evaluación" : "Performance Review"}
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">
                      {isEs ? "Retroalimentación de Sesión" : "Session Feedback"}
                    </h2>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-4xl font-black text-primary-500"
                      data-testid="evaluation-score"
                    >
                      {evaluationResult.score}/10
                    </div>
                    <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      {isEs ? "Puntuación Final" : "Final Score"}
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-8">
                  {/* Coaching Message */}
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
                      {isEs ? "Nota del Coach" : "Coach\u0027s Note"}
                    </h3>
                    <div className="p-6 bg-primary-50 dark:bg-primary-500/5 rounded-2xl border border-primary-100 dark:border-primary-500/20 italic text-gray-700 dark:text-gray-300">
                      &quot;{evaluationResult.coachingMessage}&quot;
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Strengths */}
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-green-500 mb-4 font-bold">
                        {isEs ? "Fortalezas" : "Key Strengths"}
                      </h3>
                      <ul className="space-y-2">
                        {evaluationResult.strengths.map(
                          (s: string, i: number) => (
                            <li
                              key={i}
                              className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <span className="text-green-500">✓</span> {s}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    {/* Improvements */}
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-amber-500 mb-4 font-bold">
                        {isEs ? "Áreas de Mejora" : "Growth Areas"}
                      </h3>
                      <ul className="space-y-2">
                        {evaluationResult.improvements.map(
                          (s: string, i: number) => (
                            <li
                              key={i}
                              className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <span className="text-amber-500">→</span> {s}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      onClick={() => {
                        setShowEvalModal(false);
                        setStep("setup");
                      }}
                      className="flex-1 btn bg-gray-900 border-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 dark:border-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs"
                    >
                      {isEs ? "Siguiente Simulación" : "Next Simulation"}
                    </button>
                    <button
                      onClick={() => setShowEvalModal(false)}
                      className="btn border-gray-200 dark:border-gray-700 text-gray-500 py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs"
                    >
                      {isEs ? "Ver Conversación" : "Review Transcript"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-red-500">
                <p>{isEs ? "No se pudo generar la evaluación. Inténtalo de nuevo." : "Failed to generate evaluation. Please try again."}</p>
                <button
                  onClick={() => setShowEvalModal(false)}
                  className="mt-4 underline"
                >
                  {isEs ? "Cerrar" : "Close"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
