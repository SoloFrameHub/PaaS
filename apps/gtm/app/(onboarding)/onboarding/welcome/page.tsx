"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import OnboardingHeader from "../../onboarding-header";
import OnboardingProgress from "../../onboarding-progress";
import { useOnboarding } from "../../onboarding-context";
import { GA4Events } from "@/lib/analytics/ga4";
import type { BusinessModel } from "@/types/profile";

const BUSINESS_MODELS: {
  id: BusinessModel;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "b2b-saas",
    label: "B2B SaaS / Software",
    icon: (
      <svg
        className="w-6 h-6 shrink-0 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          className="text-primary-500"
          d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
        />
        <path
          className="text-primary-300"
          d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z"
        />
        <path
          className="text-primary-200"
          d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z"
        />
      </svg>
    ),
  },
  {
    id: "creator-coach",
    label: "Creator / Coach / Consultant",
    icon: (
      <svg
        className="w-6 h-6 shrink-0 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          className="text-primary-500"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        />
        <circle className="text-primary-300" cx="12" cy="10" r="3" />
        <path
          className="text-primary-200"
          d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        />
      </svg>
    ),
  },
  {
    id: "service",
    label: "Agency / Service Business",
    icon: (
      <svg
        className="w-6 h-6 shrink-0 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          className="text-primary-500"
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        />
        <path
          className="text-primary-300"
          d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
        />
      </svg>
    ),
  },
  {
    id: "marketplace",
    label: "Marketplace / Platform",
    icon: (
      <svg
        className="w-6 h-6 shrink-0 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path className="text-primary-500" d="M12 2L2 7l10 5 10-5-10-5z" />
        <path className="text-primary-300" d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export default function WelcomePage() {
  const router = useRouter();
  const locale = useLocale();
  const isEs = locale === "es";
  const { data, updateData } = useOnboarding();
  const [userName, setUserName] = useState(data.userName);
  const [companyName, setCompanyName] = useState(data.companyName);
  const [selectedModel, setSelectedModel] = useState<BusinessModel | "">(
    data.businessModel,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !companyName.trim() || !selectedModel) return;

    updateData({ userName, companyName, businessModel: selectedModel });

    try {
      const response = await fetch("/api/onboarding/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          businessName: companyName, // Map UI 'companyName' to API 'businessName'
          businessModel: selectedModel,
        }),
      });
      if (!response.ok) throw new Error("Failed to save business info");

      GA4Events.onboardingStepCompleted("welcome", 1);
      router.push("/onboarding/business");
    } catch (error) {
      console.error("Error saving welcome data:", error);
      alert("Failed to save your progress. Please try again.");
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <div className="flex-1">
              <OnboardingHeader />
              <OnboardingProgress step={1} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-xl mx-auto">
                <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">
                  {isEs ? "Bienvenido/a al OS" : "Welcome to the OS"} 🎯
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {isEs
                    ? "En 3 minutos tienes tu perfil listo. Primero, cuéntanos sobre tu negocio."
                    : "Let's personalize your learning journey. First, tell us about your business."}
                </p>

                <form onSubmit={handleSubmit}>
                  {/* User Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="user-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {isEs ? "¿Cómo te llamas?" : "What's your name?"}{" "}
                      <span className="text-primary-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="user-name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g., Alex Smith"
                      className="form-input w-full"
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="mb-6">
                    <label
                      htmlFor="company-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {isEs ? "¿Cómo se llama tu empresa?" : "What's your company called?"}{" "}
                      <span className="text-primary-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g., Acme Inc, SoloFrameHub"
                      className="form-input w-full"
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Business Model Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {isEs ? "¿Qué tipo de negocio estás construyendo?" : "What type of business are you building?"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUSINESS_MODELS.map((model) => (
                        <label
                          key={model.id}
                          className="relative block cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="business-model"
                            value={model.id}
                            checked={selectedModel === model.id}
                            onChange={() => setSelectedModel(model.id)}
                            className="peer sr-only"
                          />
                          <div className="flex items-center bg-white text-sm font-medium text-gray-800 dark:text-gray-100 p-4 rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
                            <span className="mr-4">{model.icon}</span>
                            <span>{model.label}</span>
                          </div>
                          <div className="absolute inset-0 border-2 border-transparent peer-checked:border-primary-400 dark:peer-checked:border-primary-500 rounded-lg pointer-events-none" />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={
                        !userName.trim() ||
                        !companyName.trim() ||
                        !selectedModel
                      }
                      className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed group relative"
                    >
                      {isEs ? "Siguiente Paso →" : "Next Step →"}
                      {!userName.trim() ||
                      !companyName.trim() ||
                      !selectedModel ? (
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
