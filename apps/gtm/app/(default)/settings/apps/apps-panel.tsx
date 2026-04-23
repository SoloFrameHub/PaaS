"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import type { ConnectedAccount } from "@/types/execute";

interface IntegrationCard {
  provider: "attio" | "notion" | "hunter" | "pipedrive" | "brevo" | "whatsapp";
  name: string;
  description: string;
  descriptionEs: string;
  connectType: "api_key" | "oauth" | "api_key_plus_id";
  connectHint?: string;
  connectHintEs?: string;
  secondFieldLabel?: string;
  secondFieldPlaceholder?: string;
  region?: "global" | "latam";
}

const INTEGRATIONS: IntegrationCard[] = [
  {
    provider: "attio",
    name: "Attio CRM",
    description:
      "Sync pipeline + auto-enrich companies and contacts. Bi-directional: deals flow to Attio, stage changes flow back. Click 'enrich' on any deal card to pull enriched firmographic data.",
    descriptionEs:
      "Sincroniza tu pipeline y enriquece automáticamente empresas y contactos. Bidireccional: los deals fluyen a Attio y los cambios de etapa regresan. Haz clic en 'enriquecer' en cualquier deal para obtener datos firmográficos.",
    connectType: "api_key",
  },
  {
    provider: "notion",
    name: "Notion",
    description:
      "Export your playbook artifacts (ICP, positioning, sequences) as Notion pages.",
    descriptionEs:
      "Exporta tus artefactos del playbook (ICP, posicionamiento, secuencias) como páginas de Notion.",
    connectType: "oauth",
  },
  {
    provider: "hunter",
    name: "Hunter.io",
    description:
      "Find verified email addresses at any company domain. Use the 'Find emails' button in ICP Builder or List Building to surface contacts without leaving the OS. Your key is never stored in plaintext.",
    descriptionEs:
      "Encuentra correos electrónicos verificados en cualquier dominio de empresa. Usa el botón 'Buscar emails' en el Constructor de ICP o en List Building para encontrar contactos sin salir del OS. Tu clave nunca se almacena en texto plano.",
    connectType: "api_key",
    connectHint:
      "Get your API key at hunter.io → Dashboard → API. Free plan includes 25 searches/month.",
    connectHintEs:
      "Obtén tu API key en hunter.io → Dashboard → API. El plan gratuito incluye 25 búsquedas/mes.",
  },
  {
    provider: "pipedrive",
    name: "Pipedrive",
    description:
      "Sync your pipeline with Pipedrive — the most popular CRM in Latin America. Deals, contacts, and stages flow bi-directionally between the OS and Pipedrive.",
    descriptionEs:
      "Sincroniza tu pipeline con Pipedrive — el CRM más popular en Latinoamérica. Deals, contactos y etapas fluyen bidireccionalmente entre el OS y Pipedrive.",
    connectType: "api_key",
    connectHint:
      "Get your API token at Pipedrive → Settings → Personal preferences → API.",
    connectHintEs:
      "Obtén tu token de API en Pipedrive → Configuración → Preferencias personales → API.",
    region: "latam",
  },
  {
    provider: "brevo",
    name: "Brevo",
    description:
      "Email marketing and contact management. Sync your prospect lists, send campaigns, and track engagement — all from your Brevo account. Popular across LATAM and Europe.",
    descriptionEs:
      "Marketing por correo y gestión de contactos. Sincroniza tus listas de prospectos, envía campañas y mide el engagement — todo desde tu cuenta Brevo. Popular en LATAM y Europa.",
    connectType: "api_key",
    connectHint:
      "Get your API key at app.brevo.com → Settings → SMTP & API → API Keys.",
    connectHintEs:
      "Obtén tu API key en app.brevo.com → Configuración → SMTP y API → Claves API.",
    region: "latam",
  },
  {
    provider: "whatsapp",
    name: "WhatsApp Business",
    description:
      "Send follow-ups and outreach via WhatsApp — the #1 business communication channel in Latin America. Connect your WhatsApp Business account to reach prospects where they already are.",
    descriptionEs:
      "Envía seguimientos y mensajes de prospección por WhatsApp — el canal de comunicación empresarial #1 en Latinoamérica. Conecta tu cuenta de WhatsApp Business para llegar a tus prospectos donde ya están.",
    connectType: "api_key_plus_id",
    connectHint:
      "Get your access token and Phone Number ID at Meta Business Suite → WhatsApp → API Setup.",
    connectHintEs:
      "Obtén tu token de acceso y el ID de número de teléfono en Meta Business Suite → WhatsApp → Configuración de API.",
    secondFieldLabel: "Phone Number ID",
    secondFieldPlaceholder: "Paste your Phone Number ID",
    region: "latam",
  },
];

export default function AppsPanel() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [connections, setConnections] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectingProvider, setConnectingProvider] = useState<string | null>(
    null,
  );
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [secondFieldInput, setSecondFieldInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadConnections();
  }, []);

  async function loadConnections() {
    setLoading(true);
    try {
      const res = await fetch("/api/settings/connections");
      const json = await res.json();
      setConnections(json.data || []);
    } catch {
      // Silent
    }
    setLoading(false);
  }

  function getConnection(provider: string): ConnectedAccount | undefined {
    return connections.find(
      (c) => c.provider === provider && c.status === "active",
    );
  }

  async function handleConnectApiKey(
    provider: string,
    requiresSecondField = false,
  ) {
    if (!apiKeyInput.trim()) return;
    if (requiresSecondField && !secondFieldInput.trim()) return;
    setError("");
    try {
      const payload: Record<string, string> = {
        provider,
        apiKey: apiKeyInput,
      };
      if (requiresSecondField) {
        payload.phoneNumberId = secondFieldInput;
      }
      const res = await fetch("/api/settings/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error?.message || json.error || (isEs ? "No se pudo conectar" : "Failed to connect"));
        return;
      }
      setApiKeyInput("");
      setSecondFieldInput("");
      setConnectingProvider(null);
      await loadConnections();
    } catch {
      setError(isEs ? "Conexión fallida. Verifica tu API key." : "Connection failed. Check your API key.");
    }
  }

  async function handleDisconnect(provider: string) {
    await fetch(`/api/settings/connections/${provider}`, { method: "DELETE" });
    await loadConnections();
  }

  async function handleSync(provider: string) {
    if (provider === "attio") {
      await fetch("/api/attio/sync", { method: "POST" });
    }
  }

  return (
    <div className="grow">
      <div className="p-6">
        <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-2">
          {isEs ? "Aplicaciones conectadas" : "Connected Apps"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "Conecta tus herramientas para sincronizar datos con el OS. Todo lo demás funciona mediante copiar/pegar y exportar."
            : "Connect your tools to sync data with the OS. Everything else works via copy/paste and export."}
        </p>

        {loading ? (
          <div className="text-center py-8 text-gray-400">
            {isEs ? "Cargando..." : "Loading..."}
          </div>
        ) : (
          <div className="space-y-4">
            {INTEGRATIONS.map((integration) => {
              const conn = getConnection(integration.provider);
              const isConnected = !!conn;
              const isConnecting = connectingProvider === integration.provider;

              return (
                <div
                  key={integration.provider}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700/60 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">
                          {integration.name}
                        </h3>
                        {isConnected && (
                          <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">
                            {isEs ? "Conectado" : "Connected"}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {isEs ? integration.descriptionEs : integration.description}
                      </p>

                      {isConnected && conn?.providerMetadata && (
                        <div className="text-xs text-gray-400 mb-3">
                          {(() => {
                            const meta = conn.providerMetadata as Record<
                              string,
                              unknown
                            >;
                            switch (integration.provider) {
                              case "hunter":
                                return (
                                  <>
                                    {isEs ? "Plan:" : "Plan:"} {(meta.plan as string) || (isEs ? "Gratuito" : "Free")}
                                    {meta.requestsRemaining != null && (
                                      <span className="ml-3">
                                        {meta.requestsRemaining as number}{" "}
                                        {isEs ? "búsquedas restantes" : "searches remaining"}
                                      </span>
                                    )}
                                  </>
                                );
                              case "pipedrive":
                                return (
                                  <>
                                    {isEs ? "Empresa:" : "Company:"}{" "}
                                    {(meta.companyName as string) || (isEs ? "Desconocida" : "Unknown")}
                                  </>
                                );
                              case "brevo":
                                return (
                                  <>
                                    {(meta.companyName as string) || (isEs ? "Cuenta" : "Account")}
                                    <span className="ml-3">
                                      {isEs ? "Plan:" : "Plan:"} {(meta.plan as string) || (isEs ? "Gratuito" : "Free")}
                                    </span>
                                    {meta.emailCredits != null && (
                                      <span className="ml-3">
                                        {meta.emailCredits as number} {isEs ? "créditos de email" : "email credits"}
                                      </span>
                                    )}
                                  </>
                                );
                              case "whatsapp":
                                return (
                                  <>
                                    {(meta.verifiedName as string) ||
                                      "WhatsApp"}
                                    <span className="ml-3">
                                      {(meta.phoneNumber as string) || ""}
                                    </span>
                                    {meta.qualityRating && (
                                      <span className="ml-3">
                                        {isEs ? "Calidad:" : "Quality:"} {meta.qualityRating as string}
                                      </span>
                                    )}
                                  </>
                                );
                              default:
                                return (
                                  <>
                                    {isEs ? "Espacio de trabajo:" : "Workspace:"}{" "}
                                    {(meta.workspaceName as string) ||
                                      (isEs ? "Desconocido" : "Unknown")}
                                    {conn.lastSyncedAt && (
                                      <span className="ml-3">
                                        {isEs ? "Última sincronización:" : "Last synced:"}{" "}
                                        {new Date(
                                          conn.lastSyncedAt,
                                        ).toLocaleDateString()}
                                      </span>
                                    )}
                                  </>
                                );
                            }
                          })()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isConnected ? (
                        <>
                          {integration.provider === "attio" && (
                            <button
                              onClick={() => handleSync(integration.provider)}
                              className="text-xs font-medium text-primary-500 hover:text-primary-600 px-3 py-1.5 border border-primary-200 dark:border-primary-500/30 rounded-lg"
                            >
                              {isEs ? "Sincronizar" : "Sync Now"}
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDisconnect(integration.provider)
                            }
                            className="text-xs font-medium text-red-500 hover:text-red-600 px-3 py-1.5 border border-red-200 dark:border-red-500/30 rounded-lg"
                          >
                            {isEs ? "Desconectar" : "Disconnect"}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            if (integration.connectType === "oauth") {
                              window.location.href = "/api/notion/authorize";
                            } else {
                              setConnectingProvider(integration.provider);
                              setApiKeyInput("");
                              setSecondFieldInput("");
                              setError("");
                            }
                          }}
                          className="btn bg-primary-500 text-white hover:bg-primary-600 text-sm px-4"
                        >
                          {isEs ? "Conectar" : "Connect"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* API key input */}
                  {isConnecting &&
                    (integration.connectType === "api_key" ||
                      integration.connectType === "api_key_plus_id") && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <input
                              type="password"
                              placeholder={isEs ? `Pega tu API key de ${integration.name}` : `Paste your ${integration.name} API key`}
                              value={apiKeyInput}
                              onChange={(e) => setApiKeyInput(e.target.value)}
                              className="form-input flex-1 rounded-lg text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            />
                            {integration.connectType !== "api_key_plus_id" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleConnectApiKey(integration.provider)
                                  }
                                  disabled={!apiKeyInput.trim()}
                                  className="btn bg-green-500 text-white hover:bg-green-600 text-sm px-4 disabled:opacity-50"
                                >
                                  {isEs ? "Conectar" : "Connect"}
                                </button>
                                <button
                                  onClick={() => {
                                    setConnectingProvider(null);
                                    setApiKeyInput("");
                                    setError("");
                                  }}
                                  className="btn bg-gray-100 dark:bg-gray-700 text-gray-500 text-sm px-3"
                                >
                                  {isEs ? "Cancelar" : "Cancel"}
                                </button>
                              </>
                            )}
                          </div>
                          {integration.connectType === "api_key_plus_id" && (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder={
                                  integration.secondFieldPlaceholder ||
                                  (isEs ? "ID secundario" : "Secondary ID")
                                }
                                value={secondFieldInput}
                                onChange={(e) =>
                                  setSecondFieldInput(e.target.value)
                                }
                                className="form-input flex-1 rounded-lg text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                              />
                              <button
                                onClick={() =>
                                  handleConnectApiKey(
                                    integration.provider,
                                    true,
                                  )
                                }
                                disabled={
                                  !apiKeyInput.trim() ||
                                  !secondFieldInput.trim()
                                }
                                className="btn bg-green-500 text-white hover:bg-green-600 text-sm px-4 disabled:opacity-50"
                              >
                                {isEs ? "Conectar" : "Connect"}
                              </button>
                              <button
                                onClick={() => {
                                  setConnectingProvider(null);
                                  setApiKeyInput("");
                                  setSecondFieldInput("");
                                  setError("");
                                }}
                                className="btn bg-gray-100 dark:bg-gray-700 text-gray-500 text-sm px-3"
                              >
                                {isEs ? "Cancelar" : "Cancel"}
                              </button>
                            </div>
                          )}
                        </div>
                        {error && (
                          <p className="text-xs text-red-500 mt-2">{error}</p>
                        )}
                        {integration.connectHint && (
                          <p className="text-xs text-gray-400 mt-2">
                            {isEs && integration.connectHintEs
                              ? integration.connectHintEs
                              : integration.connectHint}
                          </p>
                        )}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
