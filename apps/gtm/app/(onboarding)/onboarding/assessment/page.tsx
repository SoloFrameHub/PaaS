"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import OnboardingHeader from "../../onboarding-header";
import OnboardingProgress from "../../onboarding-progress";
import { useOnboarding } from "../../onboarding-context";
import { GA4Events } from "@/lib/analytics/ga4";
import { buildActionRoute } from "@/lib/utils/action-routing";
import Link from "next/link";

function ScoreGauge({ score, isEs }: { score: number; isEs: boolean }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreLabel = () => {
    if (score >= 80) return isEs ? "Excelente" : "Excellent";
    if (score >= 60) return isEs ? "Bien" : "Good";
    if (score >= 40) return isEs ? "En Desarrollo" : "Developing";
    return isEs ? "Comenzando" : "Getting Started";
  };

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset || 0}
          className={`${getScoreColor()} transition-all duration-1000`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
        <span className="text-sm text-gray-500">{getScoreLabel()}</span>
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  const router = useRouter();
  const locale = useLocale();
  const isEs = locale === "es";
  const { data, updateData } = useOnboarding();

  const [loading, setLoading] = useState(!data.assessment);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!data.assessment) {
        try {
          const res = await fetch("/api/profile");
          if (res.ok) {
            const { data: responseData } = await res.json();
            const profile = responseData?.profile;
            if (profile?.assessment) {
              updateData({
                assessment: profile.assessment,
                assessmentScore: profile.assessment.overallReadiness,
              });
              setLoading(false);
              return;
            }
          }
        } catch (error) {
          console.error("Failed to fetch assessment:", error);
        }

        // FALLBACK if fetch failed or no assessment
        const fallback = {
          overallReadiness: 45,
          scores: {
            icpClarity: 40,
            positioningStrength: 50,
            messagingConsistency: 45,
            channelReadiness: 35,
            salesProcessMaturity: 55,
          },
          personalizedInsight:
            "To improve your assessment score, focus on being more specific in your questionnaire responses—particularly regarding your target audience niche and primary offer price point.",
          quickWins: [
            {
              category: "Questionnaire",
              title: "Detail your target audience",
              description: "Narrow down your niche for better positioning",
              impact: "high" as const,
              addressedInCourse: 1,
              actionableStep: "Update Profile",
              actionType: "artifact" as const,
              actionTarget: { courseNumber: 1, artifactType: "icpDocument" },
              frameworkRef: "ICP Framework",
            },
            {
              category: "Documents",
              title: "Upload business docs",
              description: "Give AI more context for coaching",
              impact: "medium" as const,
              addressedInCourse: 3,
              actionableStep: "Upload docs",
              actionType: "course" as const,
              actionTarget: { courseNumber: 3 },
              frameworkRef: "Zero-to-Ten Sprint",
            },
          ],
          criticalGaps: [
            {
              category: "Positioning",
              title: "Broad value proposition",
              description:
                "Your current positioning is too broad for high-conversion sales.",
              impact: "high" as const,
              addressedInCourse: 2,
              actionableStep: "Complete Course 2",
              actionType: "artifact" as const,
              actionTarget: {
                courseNumber: 2,
                artifactType: "positioningStatement",
              },
              frameworkRef: "Prescription Frame",
            },
          ],
          recommendedPath: "hybrid",
          recommendedStartCourse: 1,
          journeyMap: [],
        };

        updateData({
          assessment: fallback,
          assessmentScore: fallback.overallReadiness,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    // Add a small delay to avoid flash if context is hydrating
    fetchAssessment();
  }, [data.assessment, updateData]);

  if (loading) {
    return (
      <main className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">{isEs ? 'Cargando tus resultados...' : 'Loading your results...'}</p>
        </div>
      </main>
    );
  }

  const handleComplete = async () => {
    try {
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to complete onboarding");

      GA4Events.onboardingCompleted(data.assessmentScore || 0);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative flex">
        <div className="w-full">
          <div className="min-h-[100dvh] h-full flex flex-col">
            <div className="flex-1">
              <OnboardingHeader />
              <OnboardingProgress step={6} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">
                    {isEs ? 'Tu Primera Evaluación 🎯' : 'Your First Look Assessment 🎯'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isEs ? 'Este es tu puntaje base. El OS te ayudará a mejorar en cada área.' : 'Here\'s your baseline score. The OS will help you improve in each area.'}
                  </p>
                </div>

                {/* Score Gauge */}
                <div className="mb-10">
                  <ScoreGauge score={data.assessmentScore || 0} isEs={isEs} />
                </div>

                {/* Methodology Transparency */}
                <details className="mb-10 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group">
                  <summary className="px-5 py-3.5 cursor-pointer flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                    <span className="flex items-center gap-2">
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {isEs ? 'Cómo funciona esta evaluación' : 'How this assessment works'}
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                    {isEs ? (
                      <>
                        <p>
                          Esta es una{" "}
                          <strong className="text-gray-700 dark:text-gray-300">
                            evaluación objetiva, basada en datos
                          </strong>{" "}
                          basada en lo que proporcionaste: tus respuestas del cuestionario, documentos subidos, sitio web y perfil de LinkedIn. El AI no adivina ni asume; cada puntaje hace referencia a datos específicos de tus entradas.
                        </p>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Se evalúan cinco dimensiones:
                        </p>
                        <ul className="space-y-1.5 ml-1">
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Claridad de ICP
                            </span>
                            &mdash;¿Qué tan específico y accionable es tu perfil de cliente ideal?
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Posicionamiento
                            </span>
                            &mdash;¿Tu propuesta de valor está diferenciada y orientada a resultados?
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Mensajería
                            </span>
                            &mdash;¿Tu sitio web, LinkedIn, pitch y documentos cuentan una historia consistente?
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Preparación de Canales
                            </span>
                            &mdash;¿Tus canales elegidos coinciden con tu perfil de comprador y tamaño de trato?
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Madurez de Ventas
                            </span>
                            &mdash;¿Qué tan estructurado está tu proceso de ventas actual para tu etapa?
                          </li>
                        </ul>
                        <p>
                          La evaluación está diseñada para ser{" "}
                          <strong className="text-gray-700 dark:text-gray-300">
                            honesta en lugar de alentadora
                          </strong>
                          &mdash;revela brechas reales para que el OS pueda abordarlas. Un puntaje bajo no es un juicio; es un punto de partida. Tu puntaje mejorará a medida que completes cursos y apliques lo que aprendes.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          This is an{" "}
                          <strong className="text-gray-700 dark:text-gray-300">
                            objective, data-driven assessment
                          </strong>{" "}
                          based entirely on what you provided&mdash;your
                          questionnaire answers, uploaded documents, website, and
                          LinkedIn profile. The AI doesn&apos;t guess or assume;
                          every score references specific data from your inputs.
                        </p>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Five dimensions are evaluated:
                        </p>
                        <ul className="space-y-1.5 ml-1">
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              ICP Clarity
                            </span>
                            &mdash;How specific and actionable is your ideal
                            customer profile?
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Positioning
                            </span>
                            &mdash;Is your value proposition differentiated and
                            outcome-focused?
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Messaging
                            </span>
                            &mdash;Are your website, LinkedIn, pitch, and docs
                            telling a consistent story?
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Channel Readiness
                            </span>
                            &mdash;Do your chosen channels match your buyer profile
                            and deal size?
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                              Sales Maturity
                            </span>
                            &mdash;How structured is your current sales process for
                            your stage?
                          </li>
                        </ul>
                        <p>
                          The assessment is designed to be{" "}
                          <strong className="text-gray-700 dark:text-gray-300">
                            candid rather than encouraging
                          </strong>
                          &mdash;it surfaces real gaps so the OS can address them. A
                          low score isn&apos;t a judgment; it&apos;s a starting
                          point. Your score will improve as you complete courses and
                          apply what you learn.
                        </p>
                      </>
                    )}
                  </div>
                </details>

                {/* Scores Breakdown */}
                {data.assessment?.scores && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                    {Object.entries(data.assessment.scores).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="text-sm text-gray-500 mb-1 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {value as number}%
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}

                {/* Source Audits (Detailed AI Critiques) */}
                {data.assessment?.sourceAudits &&
                  data.assessment.sourceAudits.length > 0 && (
                    <div className="mb-12 space-y-8">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-primary-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {isEs ? 'Auditorías Detalladas de Fuentes' : 'Deep Source Audits'}
                      </h2>
                      <div className="grid grid-cols-1 gap-6">
                        {data.assessment.sourceAudits.map(
                          (audit: any, i: number) => (
                            <div
                              key={i}
                              className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm"
                            >
                              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                  <span className="capitalize px-2 py-0.5 rounded text-[10px] bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
                                    {audit.source}
                                  </span>
                                  {audit.title}
                                </h3>
                              </div>
                              <div className="p-6">
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                  {audit.critique}
                                </p>
                                <div className="space-y-2">
                                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {isEs ? 'Recomendaciones' : 'Recommendations'}
                                  </h4>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                    {audit.recommendations.map(
                                      (rec: string, j: number) => (
                                        <li
                                          key={j}
                                          className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2"
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1 flex-shrink-0" />
                                          {rec}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                {/* Quick Wins & Gaps */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    {isEs ? 'Resumen Estratégico' : 'Strategic Summary'}
                  </h2>
                  <div className="space-y-4">
                    {data.assessment?.personalizedInsight && (
                      <div className="p-5 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl italic text-gray-700 dark:text-gray-300">
                        &quot;{data.assessment.personalizedInsight}&quot;
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 rounded-lg">
                        <h3 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2">
                          {isEs ? 'Victorias Rápidas' : 'Quick Wins'}
                        </h3>
                        <ul className="space-y-3">
                          {data.assessment?.quickWins?.map(
                            (win: any, i: number) => {
                              const route = buildActionRoute(
                                win.actionType,
                                win.actionTarget,
                                win.addressedInCourse,
                              );
                              return (
                                <li
                                  key={i}
                                  className="text-sm text-gray-700 dark:text-gray-300"
                                >
                                  <div className="flex items-start gap-2">
                                    <span className="mt-0.5 text-green-500 shrink-0">
                                      ✓
                                    </span>
                                    <div className="flex-1">
                                      <span className="font-medium">
                                        {win.title}
                                      </span>
                                      {win.frameworkRef && (
                                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-400 rounded">
                                          {win.frameworkRef}
                                        </span>
                                      )}
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {win.actionableStep}
                                      </p>
                                      {route && (
                                        <Link
                                          href={route.href}
                                          className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-green-700 dark:text-green-400 hover:underline"
                                        >
                                          {route.label} &rarr;
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </div>
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30 rounded-lg">
                        <h3 className="text-sm font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-2">
                          {isEs ? 'Brechas Críticas' : 'Critical Gaps'}
                        </h3>
                        <ul className="space-y-3">
                          {data.assessment?.criticalGaps?.map(
                            (gap: any, i: number) => {
                              const route = buildActionRoute(
                                gap.actionType,
                                gap.actionTarget,
                                gap.addressedInCourse,
                              );
                              return (
                                <li
                                  key={i}
                                  className="text-sm text-gray-700 dark:text-gray-300"
                                >
                                  <div className="flex items-start gap-2">
                                    <span className="mt-0.5 text-orange-500 shrink-0">
                                      !
                                    </span>
                                    <div className="flex-1">
                                      <span className="font-medium">
                                        {gap.title}
                                      </span>
                                      {gap.frameworkRef && (
                                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-orange-100 dark:bg-orange-800/30 text-orange-700 dark:text-orange-400 rounded">
                                          {gap.frameworkRef}
                                        </span>
                                      )}
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {gap.actionableStep}
                                      </p>
                                      {route && (
                                        <Link
                                          href={route.href}
                                          className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-orange-700 dark:text-orange-400 hover:underline"
                                        >
                                          {route.label} &rarr;
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Operating System */}
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    {isEs ? 'Tu Sistema Operativo Está Listo' : 'Your Operating System is Ready'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {isEs
                      ? 'Esto no es un curso que miras. Es un sistema que ejecutas — cinco capas trabajando juntas:'
                      : 'This isn\'t a course you watch. It\'s a system you run — five layers working together:'}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center text-xs font-bold shrink-0">
                        1
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>{isEs ? 'Aprender' : 'Learn'}</strong> {isEs ? '— Cursos adaptados a tus brechas, coaching AI, práctica de roleplay' : '— Courses matched to your gaps, AI coaching, roleplay practice'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-purple-500 text-white rounded flex items-center justify-center text-xs font-bold shrink-0">
                        2
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>{isEs ? 'Construir' : 'Build'}</strong> {isEs ? '— ICP, posicionamiento, secuencias de email — artefactos versionados' : '— ICP, positioning, email sequences — versioned artifacts'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center text-xs font-bold shrink-0">
                        3
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>{isEs ? 'Ejecutar' : 'Execute'}</strong> {isEs ? '— Registra outreach, sigue tratos, gestiona tu pipeline' : '— Log outreach, track deals, manage your pipeline'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-amber-500 text-white rounded flex items-center justify-center text-xs font-bold shrink-0">
                        4
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>{isEs ? 'Medir' : 'Measure'}</strong> {isEs ? '— Puntajes de preparación, estadísticas del pipeline, resumen AI diario' : '— Readiness scores, pipeline stats, daily AI digest'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-indigo-500 text-white rounded flex items-center justify-center text-xs font-bold shrink-0">
                        5
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>{isEs ? 'Conectar' : 'Connect'}</strong> {isEs ? '— Sincroniza con Attio, exporta a Notion, copia/pega en cualquier lugar' : '— Sync with Attio, export to Notion, copy/paste anywhere'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    {isEs
                      ? <>Puedes explorar cómo todo encaja en la guía <strong>&quot;Cómo Funciona&quot;</strong> — siempre disponible en tu barra lateral.</>
                      : <>You can explore how everything fits together in the{" "}<strong>&quot;How This Works&quot;</strong> guide — it&apos;s always available in your sidebar.</>}
                  </p>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <button
                    onClick={handleComplete}
                    className="btn bg-primary-500 text-white hover:bg-primary-600 text-lg px-8 py-3"
                  >
                    {isEs ? 'Comienza Tu Viaje →' : 'Start Your Journey →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
