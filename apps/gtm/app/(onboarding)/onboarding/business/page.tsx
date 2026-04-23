"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import OnboardingHeader from "../../onboarding-header";
import OnboardingProgress from "../../onboarding-progress";
import { useOnboarding } from "../../onboarding-context";
import { GA4Events } from "@/lib/analytics/ga4";

export default function BusinessPage() {
  const router = useRouter();
  const locale = useLocale();
  const isEs = locale === "es";
  const { data, updateData } = useOnboarding();
  const [website, setWebsite] = useState(data.website);
  const [pitch, setPitch] = useState(data.pitch);
  const [targetAudience, setTargetAudience] = useState(data.targetAudience);

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateData({ website, pitch, targetAudience });

    try {
      const response = await fetch("/api/onboarding/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteUrl: website,
          elevatorPitch: pitch,
          targetAudience,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save business data");
      }

      // Only redirect on success
      GA4Events.onboardingStepCompleted("business", 2);
      router.push("/onboarding/questionnaire");
    } catch (error) {
      console.error("Error saving business data:", error);
      // In a real app we'd use a toast, but for now a simple alert or just not redirecting is a huge improvement
      alert("Failed to save your progress. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative flex">
        <div className="w-full">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <div className="flex-1">
              <OnboardingHeader />
              <OnboardingProgress step={2} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-xl mx-auto">
                <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">
                  {isEs ? `Cuéntanos sobre ${data.companyName || "tu negocio"}` : `Tell us about ${data.companyName || "your business"}`}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {isEs
                    ? "Esto nos ayuda a personalizar el coaching AI y los ejemplos del OS."
                    : "This helps us personalize AI coaching and examples throughout the OS."}
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Website */}
                  <div className="mb-5">
                    <label
                      htmlFor="website-url"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {isEs ? "URL del sitio web" : "Website URL"}{" "}
                      <span className="text-gray-400">({isEs ? "opcional" : "optional"})</span>
                    </label>
                    <input
                      id="website-url"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourcompany.com"
                      className="form-input w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {isEs
                        ? "Analizaremos tu sitio para entender mejor tu posicionamiento"
                        : "We'll analyze your site to better understand your positioning"}
                    </p>
                  </div>

                  {/* Elevator Pitch */}
                  <div className="mb-5">
                    <label
                      htmlFor="elevator-pitch"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {isEs ? "¿Qué hace tu negocio?" : "What does your business do?"}{" "}
                      <span className="text-primary-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="elevator-pitch"
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      placeholder={isEs ? "Describe lo que ofreces y el problema que resuelves..." : "Describe what you offer and the problem you solve..."}
                      rows={3}
                      className="form-textarea w-full"
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Target Audience */}
                  <div className="mb-8">
                    <label
                      htmlFor="target-audience"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {isEs ? "¿Quién es tu cliente ideal?" : "Who is your ideal customer?"}{" "}
                      <span className="text-primary-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="target-audience"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder={isEs ? "Ej: Fundadores SaaS con 10-50 empleados, con dificultades en adquisición de clientes..." : "e.g., SaaS founders with 10-50 employees, struggling with customer acquisition..."}
                      rows={3}
                      className="form-textarea w-full"
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => router.push("/onboarding/welcome")}
                      className="btn border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      {isEs ? "← Atrás" : "← Back"}
                    </button>
                    <button
                      type="submit"
                      disabled={
                        !pitch.trim() || !targetAudience.trim() || isSaving
                      }
                      className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed relative group"
                    >
                      {isSaving ? (isEs ? "Guardando..." : "Saving...") : (isEs ? "Siguiente Paso →" : "Next Step →")}
                      {!pitch.trim() || !targetAudience.trim() ? (
                        <span className="sr-only">
                          Completion of all required fields is required to
                          proceed
                        </span>
                      ) : null}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
