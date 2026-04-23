"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import type { ICPValidationOutput } from "@/lib/ai/openai-flows";
import type { AttioRecord } from "@/lib/attio/types";
import type { HunterDomainSearchResult } from "@/lib/hunter/client";

interface EnrichmentState {
  loading: boolean;
  data: AttioRecord | null;
  connected: boolean;
  queried: boolean;
}

function extractAttioText(values: AttioRecord["values"], slug: string): string {
  const attr = values[slug];
  if (!attr || attr.length === 0) return "";
  const v = attr[0];
  return (v.value as string) || (v.domain as string) || "";
}

export default function ICPBuilderForm() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [formData, setFormData] = useState({
    industry: "",
    companySize: "",
    jobTitles: "",
    painPoints: "",
  });
  const [result, setResult] = useState<ICPValidationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domainInput, setDomainInput] = useState("");
  const [enrichment, setEnrichment] = useState<EnrichmentState>({
    loading: false,
    data: null,
    connected: true,
    queried: false,
  });
  const [hunterDomain, setHunterDomain] = useState("");
  const [hunterState, setHunterState] = useState<{
    loading: boolean;
    connected: boolean;
    queried: boolean;
    data: HunterDomainSearchResult | null;
    error: string | null;
  }>({
    loading: false,
    connected: true,
    queried: false,
    data: null,
    error: null,
  });

  async function handleEnrich() {
    if (!domainInput.trim()) return;
    setEnrichment((prev) => ({ ...prev, loading: true, queried: false }));
    const res = await fetch(
      `/api/attio/enrich?type=company&value=${encodeURIComponent(domainInput.trim())}`,
    );
    const json = await res.json();
    // If empty attributes, Attio may still be enriching — re-poll once after 3s
    const record = json.data as AttioRecord | null;
    const hasAttributes = record && Object.keys(record.values || {}).length > 0;
    if (record && !hasAttributes) {
      setEnrichment({
        loading: true,
        data: null,
        connected: json.connected ?? true,
        queried: false,
      });
      await new Promise((r) => setTimeout(r, 3000));
      const res2 = await fetch(
        `/api/attio/enrich?type=company&value=${encodeURIComponent(domainInput.trim())}`,
      );
      const json2 = await res2.json();
      setEnrichment({
        loading: false,
        data: json2.data ?? null,
        connected: json2.connected ?? true,
        queried: true,
      });
    } else {
      setEnrichment({
        loading: false,
        data: record,
        connected: json.connected ?? true,
        queried: true,
      });
    }
  }

  async function handleFindEmails() {
    if (!hunterDomain.trim()) return;
    setHunterState({
      loading: true,
      connected: true,
      queried: false,
      data: null,
      error: null,
    });
    const res = await fetch(
      `/api/hunter/domain-search?domain=${encodeURIComponent(hunterDomain.trim())}`,
    );
    const json = await res.json();
    if (!json.connected) {
      setHunterState({
        loading: false,
        connected: false,
        queried: true,
        data: null,
        error: null,
      });
      return;
    }
    if (json.error) {
      setHunterState({
        loading: false,
        connected: true,
        queried: true,
        data: null,
        error: json.error.message || (isEs ? "Búsqueda fallida." : "Search failed."),
      });
      return;
    }
    setHunterState({
      loading: false,
      connected: true,
      queried: true,
      data: json.data ?? null,
      error: null,
    });
  }

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/ai/icp-validation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        setError(errBody.error || (isEs ? "No se pudo validar el ICP. Inténtalo de nuevo." : "Failed to validate ICP. Please try again."));
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Validation error:", error);
      setError(isEs ? "Error de red. Verifica tu conexión e inténtalo de nuevo." : "Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Input Panel */}
      <div className="lg:col-span-5 space-y-8 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">
            {isEs ? "Estratega de ICP" : "ICP Strategist"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEs
              ? "Define tu objetivo y recibe retroalimentación directa de personas de IA."
              : "Define your target and get brutal feedback from AI personas."}
          </p>
        </div>

        <form
          onSubmit={handleValidate}
          className="space-y-6"
          data-testid="icp-builder-form"
        >
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
              {isEs ? "Industria / Vertical" : "Industry / Vertical"}
            </label>
            <input
              type="text"
              data-testid="industry-input"
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              placeholder={isEs ? "ej. Fintech SaaS, Logística E-commerce" : "e.g. Fintech SaaS, E-commerce Logistics"}
              className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
              {isEs ? "Tamaño de empresa" : "Company Size"}
            </label>
            <select
              data-testid="company-size-input"
              value={formData.companySize}
              onChange={(e) =>
                setFormData({ ...formData, companySize: e.target.value })
              }
              className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
              required
            >
              <option value="">{isEs ? "Selecciona un rango..." : "Select range..."}</option>
              <option value="1-10 (Seed/Bootstrapped)">
                {isEs ? "1-10 (Semilla/Bootstrapped)" : "1-10 (Seed/Bootstrapped)"}
              </option>
              <option value="11-50 (Early Stage)">
                {isEs ? "11-50 (Etapa temprana)" : "11-50 (Early Stage)"}
              </option>
              <option value="51-200 (Mid-Market)">
                {isEs ? "51-200 (Mercado medio)" : "51-200 (Mid-Market)"}
              </option>
              <option value="201-1000 (Enterprise)">
                {isEs ? "201-1000 (Empresa)" : "201-1000 (Enterprise)"}
              </option>
              <option value="1000+ (Fortune 500)">
                {isEs ? "1000+ (Fortune 500)" : "1000+ (Fortune 500)"}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
              {isEs ? "Cargos objetivo" : "Job Titles"}
            </label>
            <input
              type="text"
              data-testid="job-titles-input"
              value={formData.jobTitles}
              onChange={(e) =>
                setFormData({ ...formData, jobTitles: e.target.value })
              }
              placeholder={isEs ? "ej. VP de Ventas, Jefe de Operaciones, Arquitecto Técnico" : "e.g. VP Sales, Head of Ops, Technical Architect"}
              className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
              {isEs ? "Puntos de dolor observados" : "Observed Pain Points"}
            </label>
            <textarea
              rows={4}
              data-testid="pain-points-input"
              value={formData.painPoints}
              onChange={(e) =>
                setFormData({ ...formData, painPoints: e.target.value })
              }
              placeholder={isEs ? "¿Qué los desvela por las noches? Sé específico." : "What keeps them up at night? Be specific."}
              className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            data-testid="validate-icp-button"
            disabled={isLoading}
            className="w-full bg-gray-900 dark:bg-primary-600 text-white font-black py-4 rounded-2xl hover:bg-gray-800 dark:hover:bg-primary-500 transition-all shadow-xl disabled:opacity-50"
          >
            {isLoading
              ? (isEs ? "Consultando al equipo..." : "Consulting the Board...")
              : (isEs ? "Validar ICP →" : "Validate ICP →")}
          </button>
        </form>

        {/* Attio Company Enrichment */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
            {isEs ? "Enriquecer desde Attio" : "Enrich from Attio"}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={isEs ? "Dominio de empresa, ej. acme.com" : "Company domain, e.g. acme.com"}
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnrich()}
              className="form-input flex-1 rounded-xl text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              onClick={handleEnrich}
              disabled={!domainInput.trim() || enrichment.loading}
              className="btn bg-primary-500 text-white hover:bg-primary-600 text-sm px-4 disabled:opacity-50"
            >
              {enrichment.loading ? "…" : (isEs ? "Enriquecer" : "Enrich")}
            </button>
          </div>
          {enrichment.queried && !enrichment.connected && (
            <p className="text-xs text-amber-500 mt-2">
              {isEs
                ? "Conecta Attio en Configuración → Aplicaciones para habilitar el enriquecimiento."
                : "Connect Attio in Settings → Apps to enable enrichment."}
            </p>
          )}
        </div>

        {/* Hunter Email Finder */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
            {isEs ? "Buscar emails en empresa" : "Find Emails at Company"}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={isEs ? "Dominio de empresa, ej. acme.com" : "Company domain, e.g. acme.com"}
              value={hunterDomain}
              onChange={(e) => setHunterDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFindEmails()}
              className="form-input flex-1 rounded-xl text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              onClick={handleFindEmails}
              disabled={!hunterDomain.trim() || hunterState.loading}
              className="btn bg-orange-500 text-white hover:bg-orange-600 text-sm px-4 disabled:opacity-50"
            >
              {hunterState.loading ? "…" : (isEs ? "Buscar emails" : "Find emails")}
            </button>
          </div>
          {hunterState.queried && !hunterState.connected && (
            <p className="text-xs text-amber-500 mt-2">
              {isEs
                ? "Conecta Hunter.io en Configuración → Aplicaciones para buscar emails."
                : "Connect Hunter.io in Settings → Apps to find emails."}
            </p>
          )}
          {hunterState.queried && hunterState.error && (
            <p className="text-xs text-red-500 mt-2">{hunterState.error}</p>
          )}
        </div>
      </div>

      {/* Feedback Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Attio Enrichment Results */}
        {enrichment.loading && (
          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-2xl text-sm text-blue-700 dark:text-blue-300">
            {isEs ? "Actualizando datos de enriquecimiento desde Attio…" : "Refreshing enrichment data from Attio…"}
          </div>
        )}
        {/* Hunter Email Results */}
        {hunterState.queried &&
          !hunterState.loading &&
          hunterState.connected &&
          !hunterState.error && (
            <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                {isEs ? `Emails en ${hunterState.data?.domain || hunterDomain}` : `Emails at ${hunterState.data?.domain || hunterDomain}`}
              </h3>
              {!hunterState.data || hunterState.data.emails.length === 0 ? (
                <p className="text-sm text-gray-400">
                  {isEs ? "No se encontraron emails verificados para este dominio." : "No verified emails found for this domain."}
                </p>
              ) : (
                <ul className="space-y-2">
                  {hunterState.data.emails.slice(0, 8).map((email) => (
                    <li
                      key={email.value}
                      className="flex items-start justify-between gap-2 text-sm"
                    >
                      <div>
                        <span className="font-medium text-gray-800 dark:text-gray-100">
                          {email.value}
                        </span>
                        {(email.first_name || email.last_name) && (
                          <span className="text-gray-400 ml-2">
                            {[email.first_name, email.last_name]
                              .filter(Boolean)
                              .join(" ")}
                            {email.position && ` · ${email.position}`}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">
                        {email.confidence}% {isEs ? "confianza" : "confidence"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

        {enrichment.queried && !enrichment.loading && enrichment.connected && (
          <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
              {isEs ? "Datos de empresa (Attio)" : "Attio Company Data"}
            </h3>
            {!enrichment.data ? (
              <p className="text-sm text-gray-400">
                {isEs ? "No hay datos de enriquecimiento disponibles para este dominio." : "No enrichment data available for this domain."}
              </p>
            ) : (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {[
                  [isEs ? "Empresa" : "Company", extractAttioText(enrichment.data.values, "name")],
                  [isEs ? "Industria" : "Industry", extractAttioText(enrichment.data.values, "industry")],
                  [isEs ? "Empleados" : "Employees", extractAttioText(enrichment.data.values, "employee_count")],
                  [isEs ? "Financiación" : "Funding", extractAttioText(enrichment.data.values, "funding_raised")],
                  [isEs ? "Sede" : "HQ", extractAttioText(enrichment.data.values, "primary_location")],
                  ["LinkedIn", extractAttioText(enrichment.data.values, "linkedin_url")],
                ]
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-gray-400">{label}</dt>
                      <dd className="font-medium text-gray-800 dark:text-gray-100 truncate">
                        {value}
                      </dd>
                    </div>
                  ))}
              </dl>
            )}
          </div>
        )}
        {error && (
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-3xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-xl flex items-center justify-center shrink-0 text-2xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-100 mb-1">
                  {isEs ? "Servicio de IA no disponible" : "AI Service Unavailable"}
                </h3>
                <p className="text-red-700 dark:text-red-200 text-sm mb-3">
                  {error}
                </p>
                <button
                  onClick={() => setError(null)}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  {isEs ? "Descartar" : "Dismiss"}
                </button>
              </div>
            </div>
          </div>
        )}

        {!result && !isLoading && !error && (
          <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl text-center opacity-50">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-2xl">
              🧐
            </div>
            <h3 className="font-bold text-lg mb-1">
              {isEs ? "El equipo está esperando" : "Board is Waiting"}
            </h3>
            <p className="text-sm">
              {isEs
                ? "Completa el formulario para recibir retroalimentación de tus personas objetivo."
                : "Complete the form to get feedback from your target personas."}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 dark:bg-gray-800 rounded-3xl"
              ></div>
            ))}
          </div>
        )}

        {result && (
          <>
            {/* Score Card */}
            <div
              data-testid="icp-results"
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">
                  {isEs ? "Puntuación de fortaleza del ICP" : "ICPP Strength Score"}
                </h3>
                <p className="text-sm text-gray-500">
                  {isEs ? "¿Qué tan listo está para hacer outreach?" : "How ready is this for outreach?"}
                </p>
              </div>
              <div
                data-testid="icp-strength-score"
                className="text-5xl font-black text-primary-500"
              >
                {result.score}
                <span className="text-xs text-gray-400 font-bold">/100</span>
              </div>
            </div>

            {/* Persona Feedback */}
            <div className="space-y-4">
              <h3
                data-testid="persona-board-response"
                className="text-xs font-black uppercase tracking-widest text-gray-400 px-2 font-bold"
              >
                {isEs ? "El equipo de personas responde:" : "The Persona Board Responds:"}
              </h3>
              {result.feedback.map((f, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:border-primary-300 transition-colors"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl group-hover:opacity-20 transition-opacity">
                    {f.avatar}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-black bg-gray-900 text-white text-xs`}
                    >
                      {f.avatar}
                    </span>
                    <div>
                      <h4 className="font-black text-gray-800 dark:text-gray-100 tracking-tight">
                        {f.personaName}
                      </h4>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                        {f.role}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {f.comments.map((c, cIdx) => (
                      <p
                        key={cIdx}
                        className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed"
                      >
                        &quot;{c}&quot;
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary-600 p-8 rounded-3xl text-white shadow-xl shadow-primary-500/20">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary-200 font-bold">
                  {isEs ? "Pivote / Movimiento estratégico:" : "Strategic Pivot / Move:"}
                </h3>
                <div className="flex gap-2">
                  <button
                    data-testid="save-icp-button"
                    className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
                  >
                    {isEs ? "Guardar" : "Save"}
                  </button>
                  <button
                    data-testid="export-icp-button"
                    className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
                  >
                    {isEs ? "Exportar" : "Export"}
                  </button>
                </div>
              </div>
              <p
                data-testid="icp-advice"
                className="text-lg font-bold leading-snug"
              >
                {result.generalAdvice}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
