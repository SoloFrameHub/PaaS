"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type {
  OutreachLog,
  OutreachChannel,
  OutreachAction,
  OutreachStats,
} from "@/types/execute";
import {
  OUTREACH_CHANNELS,
  CHANNELS_BY_TIER,
  getChannelConfig,
} from "@/lib/data/outreach-channels";
import { WHATSAPP_TEMPLATES } from "@/lib/data/whatsapp-templates";

const ACTIONS: OutreachAction[] = [
  "initial_outreach",
  "follow_up",
  "meeting_booked",
  "meeting_held",
  "proposal_sent",
  "voice_note",
  "other",
];

export default function OutreachPageClient() {
  const t = useTranslations("outreach");
  const tc = useTranslations("common");

  const [logs, setLogs] = useState<OutreachLog[]>([]);
  const [stats, setStats] = useState<OutreachStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showMoreChannels, setShowMoreChannels] = useState(false);

  // Form state
  const [prospectName, setProspectName] = useState("");
  const [prospectCompany, setProspectCompany] = useState("");
  const [channel, setChannel] = useState<OutreachChannel>("whatsapp");
  const [action, setAction] = useState<OutreachAction>("initial_outreach");
  const [notes, setNotes] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  // Show voice_note action only when WhatsApp is selected
  const availableActions =
    channel === "whatsapp"
      ? ACTIONS
      : ACTIONS.filter((a) => a !== "voice_note");

  async function loadData() {
    setLoading(true);
    const [logsRes, statsRes] = await Promise.all([
      fetch("/api/outreach").then((r) => r.json()),
      fetch("/api/outreach/stats?days=7").then((r) => r.json()),
    ]);
    setLogs(logsRes.data || []);
    setStats(statsRes.data || null);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prospectName.trim()) return;

    setSubmitting(true);
    await fetch("/api/outreach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prospectName,
        prospectCompany,
        channel,
        action,
        notes,
      }),
    });

    setProspectName("");
    setProspectCompany("");
    setNotes("");
    setSelectedTemplate("");
    await loadData();
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/outreach/${id}`, { method: "DELETE" });
    await loadData();
  }

  function applyTemplate(templateId: string) {
    const tmpl = WHATSAPP_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setNotes(tmpl.template);
      setAction(tmpl.suggestedAction);
      setSelectedTemplate(templateId);
    }
  }

  function getChannelLabel(channelId: OutreachChannel): string {
    const config = getChannelConfig(channelId);
    if (!config) return channelId;
    try {
      return t(config.translationKey);
    } catch {
      // Fallback if translation key missing
      return channelId.replace(/_/g, " ");
    }
  }

  function getActionLabel(actionId: OutreachAction): string {
    try {
      return t(`action_${actionId}`);
    } catch {
      return actionId.replace(/_/g, " ");
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("subtitle")}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          &larr; {t("backToDashboard")}
        </Link>
      </div>

      {/* Stats bar */}
      {stats && stats.totalActions > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700/60 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {stats.totalActions}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              {t("statsThisWeek")}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700/60 text-center">
            <div className="text-2xl font-bold text-green-500">
              {stats.byOutcome.positive}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              {t("statsPositive")}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700/60 text-center">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">
              {stats.byOutcome.pending}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              {t("statsPending")}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700/60 text-center">
            <div className="text-2xl font-bold text-purple-500">
              {stats.byAction.meeting_booked}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              {t("statsMeetings")}
            </div>
          </div>
        </div>
      )}

      {/* Quick log form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 mb-8"
      >
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
          {t("logOutreach")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder={t("prospectNamePlaceholder")}
            value={prospectName}
            onChange={(e) => setProspectName(e.target.value)}
            required
            className="form-input w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
          <input
            type="text"
            placeholder={t("companyPlaceholder")}
            value={prospectCompany}
            onChange={(e) => setProspectCompany(e.target.value)}
            className="form-input w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />

          {/* Tiered channel selector */}
          <div className="space-y-2">
            {/* Tier 1 — always visible */}
            <div className="flex flex-wrap gap-2">
              {CHANNELS_BY_TIER[1].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChannel(c.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    channel === c.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: c.brandColor }}
                  />
                  {getChannelLabel(c.id)}
                </button>
              ))}
            </div>

            {/* Tier 2+3 — collapsible */}
            {!showMoreChannels ? (
              <button
                type="button"
                onClick={() => setShowMoreChannels(true)}
                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {t("moreChannels")} +
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {[...CHANNELS_BY_TIER[2], ...CHANNELS_BY_TIER[3]].map(
                    (c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setChannel(c.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          channel === c.id
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: c.brandColor }}
                        />
                        {getChannelLabel(c.id)}
                      </button>
                    )
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowMoreChannels(false)}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {t("lessChannels")} −
                </button>
              </div>
            )}
          </div>

          <select
            value={action}
            onChange={(e) => setAction(e.target.value as OutreachAction)}
            className="form-select w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            {availableActions.map((a) => (
              <option key={a} value={a}>
                {getActionLabel(a)}
              </option>
            ))}
          </select>
        </div>

        {/* WhatsApp templates — show only when WhatsApp is selected */}
        {channel === "whatsapp" && (
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
              {t("waTemplates")}
            </label>
            <div className="flex flex-wrap gap-2">
              {WHATSAPP_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => applyTemplate(tmpl.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    selectedTemplate === tmpl.id
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-green-300"
                  }`}
                >
                  {t(tmpl.translationKey)}
                </button>
              ))}
            </div>
          </div>
        )}

        <textarea
          placeholder={t("notesPlaceholder")}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="form-textarea w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 mb-4"
        />
        <button
          type="submit"
          disabled={submitting || !prospectName.trim()}
          className="btn bg-primary-500 text-white hover:bg-primary-600 px-6 disabled:opacity-50"
        >
          {submitting ? t("logging") : t("logButton")}
        </button>
      </form>

      {/* Log list */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {t("recentActivity")}
          </h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-400">{tc("loading")}</div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            {t("emptyState")}
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {logs.map((log) => (
              <div
                key={log.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {log.prospectName}
                    </span>
                    {log.prospectCompany && (
                      <span className="text-xs text-gray-400">
                        {log.prospectCompany}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded text-white"
                      style={{
                        backgroundColor:
                          getChannelConfig(log.channel)?.brandColor ||
                          "#6B7280",
                      }}
                    >
                      {getChannelLabel(log.channel)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {getActionLabel(log.action)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(log.loggedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="text-xs text-gray-400 hover:text-red-500 ml-4"
                >
                  {t("delete")}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
