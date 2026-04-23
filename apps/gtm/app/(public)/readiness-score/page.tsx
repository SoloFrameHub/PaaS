import { Metadata } from "next";
import { FORM_DEFINITIONS } from "@/lib/forms/definitions";
import { getLocale } from "next-intl/server";
import FormClient from "../forms/[slug]/form-client";

export const metadata: Metadata = {
  title: "Customer Acquisition Readiness Score | Solo GTM OS",
  description:
    "Discover your blind spots in 5 minutes. Get a personalized readiness score across 7 dimensions — and a clear path to fix what's broken. Free assessment for solo founders.",
  openGraph: {
    title: "What's Your Customer Acquisition Readiness Score?",
    description:
      "71% of founders dangerously overestimate or underestimate their acquisition skills. Take the 5-minute assessment.",
    type: "website",
  },
};

export default async function ReadinessScorePage() {
  const locale = await getLocale();
  const isEs = locale === "es";
  const form = FORM_DEFINITIONS["readiness-score"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      {/* Hero */}
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-8 text-center">
        <p className="mb-3 text-sm font-medium tracking-wider text-amber-400 uppercase">
          {isEs ? "Evaluación gratuita de 5 minutos" : "Free 5-minute assessment"}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {isEs
            ? "¿Cuál es tu Puntuación de Preparación para la Adquisición de Clientes?"
            : "What's Your Customer Acquisition Readiness Score?"}
        </h1>
        <p className="mx-auto max-w-xl text-lg text-neutral-400">
          {isEs
            ? <>El 71% de los fundadores sobreestiman o subestiman peligrosamente sus habilidades de adquisición.{" "}<span className="text-neutral-200">Descubre tus puntos ciegos en 5 minutos.</span></>
            : <>71% of founders dangerously overestimate or underestimate their acquisition skills.{" "}<span className="text-neutral-200">Find your blind spots in 5 minutes.</span></>}
        </p>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {isEs ? "Sin tarjeta de crédito" : "No credit card"}
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {isEs ? "5 minutos" : "5 minutes"}
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {isEs ? "Resultados inmediatos" : "Instant results"}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl px-4 pb-20">
        <FormClient formDefinition={form} />
      </div>

      {/* Social proof / trust */}
      <div className="border-t border-neutral-800 bg-neutral-950/50 py-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-sm text-neutral-500">
            {isEs
              ? "Basado en frameworks de Stanford AI, más de 22,000 evaluaciones de habilidades de Workera, y probado por fundadores independientes generando $5K-$50K+ MRR."
              : "Based on frameworks from Stanford AI research, Workera's 22,000+ skill assessments, and battle-tested by solo founders generating $5K-$50K+ MRR."}
          </p>
        </div>
      </div>
    </div>
  );
}
