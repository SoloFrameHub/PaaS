"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { PipelineDeal, DealStage } from "@/types/execute";
import type { AttioRecord } from "@/lib/attio/types";

interface EnrichCache {
  [dealId: string]: {
    loading: boolean;
    data: AttioRecord | null;
    connected: boolean;
  };
}

const STAGE_COLORS: Record<DealStage, string> = {
  lead: "bg-gray-100 dark:bg-gray-700",
  contacted: "bg-blue-50 dark:bg-blue-900/20",
  meeting: "bg-indigo-50 dark:bg-indigo-900/20",
  proposal: "bg-purple-50 dark:bg-purple-900/20",
  won: "bg-green-50 dark:bg-green-900/20",
  lost: "bg-red-50 dark:bg-red-900/20",
};

const STAGE_KEYS: DealStage[] = ["lead", "contacted", "meeting", "proposal", "won", "lost"];

export default function PipelinePageClient() {
  const locale = useLocale();
  const isEs = locale === "es";

  const stageLabels: Record<DealStage, string> = isEs
    ? { lead: "Prospecto", contacted: "Contactado", meeting: "Reunión", proposal: "Propuesta", won: "Ganado", lost: "Perdido" }
    : { lead: "Lead", contacted: "Contacted", meeting: "Meeting", proposal: "Proposal", won: "Won", lost: "Lost" };
  const [dealsByStage, setDealsByStage] = useState<
    Record<DealStage, PipelineDeal[]>
  >({
    lead: [],
    contacted: [],
    meeting: [],
    proposal: [],
    won: [],
    lost: [],
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);
  const [enrichCache, setEnrichCache] = useState<EnrichCache>({});

  async function enrichDeal(deal: PipelineDeal) {
    const lookupType = deal.prospectEmail
      ? "person"
      : deal.prospectCompany
        ? "company"
        : null;
    const lookupValue = deal.prospectEmail || deal.prospectCompany || null;
    if (!lookupType || !lookupValue) return;

    setEnrichCache((prev) => ({
      ...prev,
      [deal.id]: { loading: true, data: null, connected: true },
    }));

    const res = await fetch(
      `/api/attio/enrich?type=${lookupType}&value=${encodeURIComponent(lookupValue)}`,
    );
    const json = await res.json();

    // Re-poll once after 3s if record exists but attributes are empty
    const record = json.data as AttioRecord | null;
    if (record && Object.keys(record.values || {}).length === 0) {
      await new Promise((r) => setTimeout(r, 3000));
      const res2 = await fetch(
        `/api/attio/enrich?type=${lookupType}&value=${encodeURIComponent(lookupValue)}`,
      );
      const json2 = await res2.json();
      setEnrichCache((prev) => ({
        ...prev,
        [deal.id]: {
          loading: false,
          data: json2.data ?? null,
          connected: json2.connected ?? true,
        },
      }));
    } else {
      setEnrichCache((prev) => ({
        ...prev,
        [deal.id]: {
          loading: false,
          data: record,
          connected: json.connected ?? true,
        },
      }));
    }
  }

  // Form state
  const [formName, setFormName] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formValue, setFormValue] = useState("");
  const [formNotes, setFormNotes] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/pipeline?grouped=true");
    const json = await res.json();
    if (json.data) setDealsByStage(json.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!formName.trim()) return;

    await fetch("/api/pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prospectName: formName,
        prospectCompany: formCompany || undefined,
        prospectEmail: formEmail || undefined,
        dealValue: formValue
          ? Math.round(parseFloat(formValue) * 100)
          : undefined,
        notes: formNotes || undefined,
      }),
    });

    setFormName("");
    setFormCompany("");
    setFormEmail("");
    setFormValue("");
    setFormNotes("");
    setShowForm(false);
    await loadData();
  }

  async function handleDrop(targetStage: DealStage) {
    if (!draggedDeal) return;
    setDraggedDeal(null);

    await fetch(`/api/pipeline/${draggedDeal}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: targetStage }),
    });

    await loadData();
  }

  async function handleDelete(dealId: string) {
    await fetch(`/api/pipeline/${dealId}`, { method: "DELETE" });
    await loadData();
  }

  const totalActive = ["lead", "contacted", "meeting", "proposal"].reduce(
    (sum, s) => sum + dealsByStage[s as DealStage].length,
    0,
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Pipeline
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {totalActive} {isEs ? (totalActive !== 1 ? "deals activos" : "deal activo") : (totalActive !== 1 ? "active deals" : "active deal")} &middot;
            {isEs ? "Arrastra para cambiar etapa" : "Drag to move stages"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn bg-primary-500 text-white hover:bg-primary-600 px-4"
          >
            {isEs ? "+ Agregar deal" : "+ Add Deal"}
          </button>
          <Link
            href="/dashboard"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            &larr; {isEs ? "Panel" : "Dashboard"}
          </Link>
        </div>
      </div>

      {/* Add deal form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder={isEs ? "Nombre del prospecto *" : "Prospect name *"}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
              className="form-input w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              placeholder={isEs ? "Empresa" : "Company"}
              value={formCompany}
              onChange={(e) => setFormCompany(e.target.value)}
              className="form-input w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <input
              type="email"
              placeholder="Email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="form-input w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="number"
              step="0.01"
              placeholder="Deal value ($)"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              className="form-input w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              placeholder={isEs ? "Notas" : "Notes"}
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              className="form-input w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 md:col-span-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn bg-primary-500 text-white hover:bg-primary-600 px-6"
            >
              {isEs ? "Crear" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-6"
            >
              {isEs ? "Cancelar" : "Cancel"}
            </button>
          </div>
        </form>
      )}

      {/* Kanban board */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">
          {isEs ? "Cargando pipeline..." : "Loading pipeline..."}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {STAGE_KEYS.map((key) => (
            <div
              key={key}
              className={`${STAGE_COLORS[key]} rounded-xl p-3 min-h-[200px] transition-all ${draggedDeal ? "border-2 border-dashed border-gray-300 dark:border-gray-600" : "border border-gray-200 dark:border-gray-700/60"}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(key)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  {stageLabels[key]}
                </h3>
                <span className="text-xs font-bold text-gray-400">
                  {dealsByStage[key].length}
                </span>
              </div>
              <div className="space-y-2">
                {dealsByStage[key].map((deal) => {
                  const daysInStage = Math.floor(
                    (Date.now() - new Date(deal.stageChangedAt).getTime()) /
                      (1000 * 60 * 60 * 24),
                  );
                  return (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={() => setDraggedDeal(deal.id)}
                      onDragEnd={() => setDraggedDeal(null)}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700/60 cursor-grab active:cursor-grabbing"
                    >
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">
                        {deal.prospectName}
                      </div>
                      {deal.prospectCompany && (
                        <div className="text-xs text-gray-400 mb-1">
                          {deal.prospectCompany}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        {deal.dealValue ? (
                          <span className="text-xs font-bold text-green-600 dark:text-green-400">
                            ${(deal.dealValue / 100).toLocaleString()}
                          </span>
                        ) : (
                          <span />
                        )}
                        <span
                          className={`text-[10px] ${daysInStage >= 7 ? "text-amber-500 font-bold" : "text-gray-400"}`}
                        >
                          {daysInStage}d
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          onClick={() => handleDelete(deal.id)}
                          className="text-[10px] text-gray-400 hover:text-red-500"
                        >
                          {isEs ? "eliminar" : "remove"}
                        </button>
                        {(deal.prospectEmail || deal.prospectCompany) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              enrichDeal(deal);
                            }}
                            disabled={enrichCache[deal.id]?.loading}
                            className="text-[10px] text-primary-500 hover:text-primary-600 disabled:opacity-50"
                          >
                            {enrichCache[deal.id]?.loading ? "…" : (isEs ? "enriquecer" : "enrich")}
                          </button>
                        )}
                      </div>
                      {enrichCache[deal.id] &&
                        !enrichCache[deal.id].loading && (
                          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700/60">
                            {!enrichCache[deal.id].connected ? (
                              <p className="text-[10px] text-amber-500">
                                {isEs ? "Conecta Attio para enriquecer" : "Connect Attio to enrich"}
                              </p>
                            ) : !enrichCache[deal.id].data ? (
                              <p className="text-[10px] text-gray-400">
                                {isEs ? "Sin datos de Attio" : "No Attio data"}
                              </p>
                            ) : (
                              <dl className="space-y-0.5">
                                {(
                                  [
                                    "industry",
                                    "employee_count",
                                    "linkedin_url",
                                  ] as const
                                ).map((slug) => {
                                  const attr =
                                    enrichCache[deal.id].data!.values[slug];
                                  const val = attr?.[0]?.value as
                                    | string
                                    | undefined;
                                  return val ? (
                                    <div
                                      key={slug}
                                      className="flex gap-1 text-[10px]"
                                    >
                                      <dt className="text-gray-400 capitalize">
                                        {slug.replace(/_/g, " ")}:
                                      </dt>
                                      <dd className="text-gray-600 dark:text-gray-300 truncate">
                                        {val}
                                      </dd>
                                    </div>
                                  ) : null;
                                })}
                              </dl>
                            )}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
