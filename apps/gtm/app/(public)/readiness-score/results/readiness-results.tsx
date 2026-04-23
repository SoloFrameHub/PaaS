"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";

interface ScoreBreakdown {
  icpClarity: number;
  positioningStrength: number;
  contentEngine: number;
  channelReadiness: number;
  salesProcessMaturity: number;
  objectionHandling: number;
  aiReadiness: number;
  pipelineTracking: number;
}

interface ResultData {
  score: number;
  scoreBreakdown: ScoreBreakdown;
  name: string;
}

const DIMENSION_META_EN: Record<
  string,
  { label: string; track: string; maxWeighted: number }
> = {
  icpClarity: { label: "ICP Clarity", track: "Foundations", maxWeighted: 143 },
  positioningStrength: {
    label: "Positioning Strength",
    track: "Foundations",
    maxWeighted: 124,
  },
  contentEngine: {
    label: "Content Engine",
    track: "Marketing Engine",
    maxWeighted: 95,
  },
  channelReadiness: {
    label: "Channel Readiness",
    track: "Marketing Engine",
    maxWeighted: 114,
  },
  salesProcessMaturity: {
    label: "Sales Process",
    track: "Sales Methodology",
    maxWeighted: 124,
  },
  objectionHandling: {
    label: "Objection Handling",
    track: "Sales Methodology",
    maxWeighted: 95,
  },
  aiReadiness: {
    label: "AI Readiness",
    track: "AI Acquisition",
    maxWeighted: 95,
  },
  pipelineTracking: {
    label: "Pipeline Tracking",
    track: "Operations & Systems",
    maxWeighted: 76,
  },
};

const DIMENSION_META_ES: Record<
  string,
  { label: string; track: string; maxWeighted: number }
> = {
  icpClarity: { label: "Claridad del ICP", track: "Fundamentos", maxWeighted: 143 },
  positioningStrength: {
    label: "Fortaleza de Posicionamiento",
    track: "Fundamentos",
    maxWeighted: 124,
  },
  contentEngine: {
    label: "Motor de Contenido",
    track: "Motor de Marketing",
    maxWeighted: 95,
  },
  channelReadiness: {
    label: "Preparación de Canal",
    track: "Motor de Marketing",
    maxWeighted: 114,
  },
  salesProcessMaturity: {
    label: "Proceso de Ventas",
    track: "Metodología de Ventas",
    maxWeighted: 124,
  },
  objectionHandling: {
    label: "Manejo de Objeciones",
    track: "Metodología de Ventas",
    maxWeighted: 95,
  },
  aiReadiness: {
    label: "Preparación para IA",
    track: "Adquisición con IA",
    maxWeighted: 95,
  },
  pipelineTracking: {
    label: "Seguimiento del Pipeline",
    track: "Operaciones y Sistemas",
    maxWeighted: 76,
  },
};

function normalizeScore(totalScore: number): number {
  // Max possible weighted score is ~866. Normalize to 0-100.
  const maxPossible = 866;
  return Math.min(100, Math.round((totalScore / maxPossible) * 100));
}

function normalizeDimension(weighted: number, maxWeighted: number): number {
  return Math.min(100, Math.round((weighted / maxWeighted) * 100));
}

function getScoreColor(pct: number): string {
  if (pct >= 75) return "text-green-400";
  if (pct >= 50) return "text-amber-400";
  return "text-red-400";
}

function getBarColor(pct: number): string {
  if (pct >= 75) return "bg-green-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-red-500";
}

function getVerdict(pct: number, isEs: boolean): { label: string; description: string } {
  if (pct >= 75)
    return {
      label: isEs ? "Sólido" : "Strong",
      description: isEs
        ? "Tienes bases sólidas de adquisición. Es hora de optimizar y escalar."
        : "You have solid acquisition foundations. Time to optimize and scale.",
    };
  if (pct >= 50)
    return {
      label: isEs ? "Moderado" : "Moderate",
      description: isEs
        ? "Estás haciendo algunas cosas bien, pero brechas críticas te están frenando."
        : "You're doing some things right, but critical gaps are slowing you down.",
    };
  if (pct >= 25)
    return {
      label: isEs ? "Necesita Trabajo" : "Needs Work",
      description: isEs
        ? "Tu sistema de adquisición tiene puntos ciegos significativos. La buena noticia: las soluciones son claras."
        : "Your acquisition system has significant blind spots. The good news: the fixes are clear.",
    };
  return {
    label: isEs ? "Comenzando" : "Getting Started",
    description: isEs
      ? "Estás comenzando a construir tu motor de adquisición. Un enfoque estructurado multiplicará tus resultados por 10."
      : "You're early in building your acquisition engine. A structured approach will 10x your results.",
  };
}

export default function ReadinessResults() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEs = locale === "es";
  const DIMENSION_META = isEs ? DIMENSION_META_ES : DIMENSION_META_EN;
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Results come from sessionStorage (set by form-client after submit)
    const stored = sessionStorage.getItem("readiness-score-result");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResult(parsed);
      } catch {
        // fallback: no results available
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">{isEs ? "No se encontraron resultados" : "No Results Found"}</h1>
        <p className="mb-8 text-neutral-400">
          {isEs ? "Realiza la evaluación de preparación primero para ver tus resultados." : "Take the readiness assessment first to see your results."}
        </p>
        <Link
          href="/readiness-score"
          className="rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-neutral-200"
        >
          {isEs ? "Realizar la Evaluación" : "Take the Assessment"}
        </Link>
      </div>
    );
  }

  const overallPct = normalizeScore(result.score);
  const verdict = getVerdict(overallPct, isEs);

  // Sort dimensions by score (lowest first = biggest blind spots)
  const dimensions = Object.entries(result.scoreBreakdown)
    .filter(([key]) => key in DIMENSION_META)
    .map(([key, weighted]) => {
      const meta = DIMENSION_META[key];
      const pct = normalizeDimension(weighted, meta.maxWeighted);
      return { key, weighted, pct, ...meta };
    })
    .sort((a, b) => a.pct - b.pct);

  const blindSpots = dimensions.filter((d) => d.pct < 50);
  const strengths = dimensions.filter((d) => d.pct >= 70);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://ai-solo-gtm-os.soloframehub.com";
  const shareUrl = `${appUrl}/readiness-score`;
  const shareText = isEs
    ? `Obtuve ${overallPct}/100 en la Evaluación de Preparación para Adquisición de Clientes. ${verdict.label} — ${blindSpots.length > 0 ? `principales puntos ciegos: ${blindSpots.map((d) => d.label).join(", ")}` : "sólido en todos los aspectos"}.`
    : `I scored ${overallPct}/100 on the Customer Acquisition Readiness Assessment. ${verdict.label} — ${blindSpots.length > 0 ? `biggest blind spots: ${blindSpots.map((d) => d.label).join(", ")}` : "solid across the board"}.`;
  const ogImageUrl = `${appUrl}/api/og?score=${overallPct}&name=${encodeURIComponent(result.name || "")}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 pb-20">
      <div className="mx-auto max-w-2xl px-4 pt-16">
        {/* Overall Score */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium tracking-wider text-neutral-500 uppercase">
            {isEs
              ? `${result.name ? `Puntuación de ${result.name}` : "Tu Puntuación"} de Preparación`
              : `${result.name ? `${result.name}'s` : "Your"} Readiness Score`}
          </p>
          <div className="relative mx-auto mb-4 flex h-40 w-40 items-center justify-center">
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-neutral-800"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={`${overallPct * 2.83} 283`}
                strokeLinecap="round"
                className={getScoreColor(overallPct)}
              />
            </svg>
            <span className={`text-5xl font-bold ${getScoreColor(overallPct)}`}>
              {overallPct}
            </span>
          </div>
          <p className={`text-xl font-semibold ${getScoreColor(overallPct)}`}>
            {verdict.label}
          </p>
          <p className="mt-2 text-neutral-400">{verdict.description}</p>
        </div>

        {/* Dimension Breakdown */}
        <div className="mb-12 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
          <h2 className="mb-6 text-lg font-semibold text-white">
            {isEs ? "Desglose de Puntuación" : "Score Breakdown"}
          </h2>
          <div className="space-y-4">
            {dimensions.map((dim) => (
              <div key={dim.key}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-neutral-300">{dim.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-600">
                      {dim.track}
                    </span>
                    <span
                      className={`text-sm font-medium ${getScoreColor(dim.pct)}`}
                    >
                      {dim.pct}%
                    </span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(dim.pct)}`}
                    style={{ width: `${dim.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blind Spots */}
        {blindSpots.length > 0 && (
          <div className="mb-8 rounded-xl border border-red-900/30 bg-red-950/20 p-6">
            <h2 className="mb-4 text-lg font-semibold text-red-400">
              {isEs ? "Tus Puntos Ciegos" : "Your Blind Spots"}
            </h2>
            <ul className="space-y-3">
              {blindSpots.map((d) => (
                <li
                  key={d.key}
                  className="flex items-start gap-3 text-sm text-neutral-300"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-900/40 text-xs text-red-400">
                    !
                  </span>
                  <span>
                    <strong className="text-white">{d.label}</strong> ({d.pct}%)
                    {isEs
                      ? <> — Está en el track de <strong>{d.track}</strong>. Abordar esto primero tendrá el mayor impacto.</>
                      : <> — This is in the <strong>{d.track}</strong> track. Addressing this first will have the biggest impact.</>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="mb-8 rounded-xl border border-green-900/30 bg-green-950/20 p-6">
            <h2 className="mb-4 text-lg font-semibold text-green-400">
              {isEs ? "Tus Fortalezas" : "Your Strengths"}
            </h2>
            <ul className="space-y-2">
              {strengths.map((d) => (
                <li
                  key={d.key}
                  className="flex items-center gap-3 text-sm text-neutral-300"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong className="text-white">{d.label}</strong> ({d.pct}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Share */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="text-sm text-neutral-500">{isEs ? "Comparte tu puntuación:" : "Share your score:"}</span>
          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X / Twitter
          </a>
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-white">
            {isEs ? "¿Listo para corregir tus puntos ciegos?" : "Ready to fix your blind spots?"}
          </h2>
          <p className="mb-6 text-neutral-400">
            {isEs
              ? "El Solo GTM OS te da un camino personalizado desde donde estás hasta donde necesitas estar. Gratis durante la beta. $29.95/mes después."
              : "The Solo GTM OS gives you a personalized path from where you are to where you need to be. Free during beta. $29.95/month after."}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/checkout"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-black transition hover:bg-neutral-200"
            >
              {isEs ? "Comienza Tu Plan de 90 Días" : "Start Your 90-Day Plan"}
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-neutral-700 px-8 py-3 font-medium text-neutral-300 transition hover:bg-neutral-800"
            >
              {isEs ? "Saber Más" : "Learn More"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
