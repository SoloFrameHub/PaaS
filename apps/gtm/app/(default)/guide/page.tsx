import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { MarkGuideViewed } from "./mark-viewed";

export const metadata = {
  title: "Platform Overview | SoloFrameHub",
};

const TOC = [
  { id: "what-is-this", en: "What is Solo GTM OS?", es: "¿Qué es Solo GTM OS?" },
  { id: "getting-started", en: "Getting Started", es: "Primeros Pasos" },
  { id: "five-layers", en: "The 5-Layer System", es: "El Sistema de 5 Capas" },
  { id: "dashboard", en: "Your Dashboard", es: "Tu Panel" },
  { id: "academy", en: "Academy & Courses", es: "Academia y Cursos" },
  { id: "ai-tools", en: "AI Tools", es: "Herramientas AI" },
  { id: "execute", en: "Execute: Outreach & Pipeline", es: "Ejecutar: Outreach y Pipeline" },
  { id: "community", en: "Community & Pods", es: "Comunidad y Pods" },
  { id: "gamification", en: "XP, Badges & Streaks", es: "XP, Insignias y Rachas" },
  { id: "integrations", en: "Integrations & Apps", es: "Integraciones y Apps" },
  { id: "daily-rhythm", en: "Your Daily Rhythm", es: "Tu Ritmo Diario" },
  { id: "maximize", en: "Maximizing Your Results", es: "Maximiza tus Resultados" },
  { id: "replaces", en: "What This Replaces", es: "Lo que Reemplaza" },
  { id: "profile", en: "Updating Your Profile", es: "Actualizar tu Perfil" },
];

const LAYERS = [
  {
    nameEn: "Learn",
    nameEs: "Aprender",
    color: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-500/30",
    whatEn: "Build the knowledge foundation",
    whatEs: "Construye la base de conocimiento",
    howEn:
      "48 courses across 8 tracks, each with interactive exercises, quizzes, and AI-graded assessments. Your curriculum is personalized based on your readiness assessment — the AI focuses you on your weakest areas first.",
    howEs:
      "48 cursos en 8 tracks, cada uno con ejercicios interactivos, quizzes y evaluaciones calificadas por IA. Tu currículo se personaliza según tu evaluación de preparación — la IA te enfoca primero en tus áreas más débiles.",
    features: [
      {
        nameEn: "Academy Courses",
        nameEs: "Cursos de la Academia",
        href: "/academy",
        descEn: "Structured curriculum matched to your gaps",
        descEs: "Currículo estructurado alineado a tus brechas",
      },
      {
        nameEn: "Solo Advisor AI",
        nameEs: "Solo Advisor AI",
        href: "/coach",
        descEn: "Ask your AI coach anything about your business",
        descEs: "Pregúntale a tu coach AI cualquier cosa sobre tu negocio",
      },
      {
        nameEn: "Sales Roleplay",
        nameEs: "Sales Roleplay",
        href: "/roleplay",
        descEn: "Practice sales calls against AI buyer personas",
        descEs: "Practica llamadas de ventas contra buyer personas de IA",
      },
    ],
  },
  {
    nameEn: "Build",
    nameEs: "Construir",
    color: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-500/30",
    whatEn: "Create your acquisition playbook",
    whatEs: "Crea tu playbook de adquisición",
    howEn:
      "As you complete courses, you build real deliverables — your ICP document, positioning statement, email sequences, discovery playbook. These are living documents that improve over time as you learn and iterate.",
    howEs:
      "A medida que completas cursos, construyes entregables reales — tu documento de ICP, declaración de posicionamiento, secuencias de email, playbook de discovery. Son documentos vivos que mejoran con el tiempo.",
    features: [
      {
        nameEn: "Playbook Artifacts",
        nameEs: "Artefactos del Playbook",
        href: "/dashboard/playbook",
        descEn: "Your ICP, positioning, sequences, and more",
        descEs: "Tu ICP, posicionamiento, secuencias y más",
      },
      {
        nameEn: "ICP Builder",
        nameEs: "ICP Builder",
        href: "/academy/tools/icp-builder",
        descEn: "Interactive workshop for your ideal customer profile",
        descEs: "Taller interactivo para tu perfil de cliente ideal",
      },
      {
        nameEn: "Export (MD/CSV/PDF)",
        nameEs: "Exportar (MD/CSV/PDF)",
        href: "/dashboard/playbook",
        descEn: "Download artifacts for use anywhere",
        descEs: "Descarga artefactos para usarlos donde quieras",
      },
    ],
  },
  {
    nameEn: "Execute",
    nameEs: "Ejecutar",
    color: "bg-green-500",
    lightBg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-500/30",
    whatEn: "Turn learning into pipeline",
    whatEs: "Convierte el aprendizaje en pipeline",
    howEn:
      "Log your outreach, track your deals, and see what's working. This is where the OS becomes a daily tool — not a course you visit occasionally. Copy your email sequences into your outreach tool, log the results here.",
    howEs:
      "Registra tu outreach, haz seguimiento a tus deals y ve qué funciona. Aquí es donde el OS se convierte en una herramienta diaria — no en un curso que visitas de vez en cuando. Copia tus secuencias de email en tu herramienta de outreach y registra los resultados aquí.",
    features: [
      {
        nameEn: "Outreach Log",
        nameEs: "Registro de Outreach",
        href: "/dashboard/outreach",
        descEn: "Track every touchpoint with prospects",
        descEs: "Registra cada punto de contacto con prospectos",
      },
      {
        nameEn: "Pipeline Board",
        nameEs: "Pipeline Board",
        href: "/dashboard/pipeline",
        descEn: "Drag-and-drop deal tracking across stages",
        descEs: "Seguimiento de deals con arrastrar y soltar entre etapas",
      },
      {
        nameEn: "CRM Sync",
        nameEs: "CRM Sync",
        href: "/settings/apps",
        descEn: "Connect Attio or Pipedrive for bi-directional sync",
        descEs: "Conecta Attio o Pipedrive para sincronización bidireccional",
      },
    ],
  },
  {
    nameEn: "Measure",
    nameEs: "Medir",
    color: "bg-amber-500",
    lightBg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-500/30",
    whatEn: "See what's improving",
    whatEs: "Ve lo que está mejorando",
    howEn:
      "Your readiness scores, pipeline stats, outreach response rates, and win rate — all tracked over time. The AI coach uses this data to give you specific, actionable advice instead of generic motivation.",
    howEs:
      "Tus puntajes de preparación, estadísticas del pipeline, tasas de respuesta de outreach y tasa de cierre — todo rastreado en el tiempo. El coach AI usa estos datos para darte consejos específicos y accionables en lugar de motivación genérica.",
    features: [
      {
        nameEn: "Readiness Scores",
        nameEs: "Puntajes de Preparación",
        href: "/dashboard",
        descEn: "5-dimension assessment with before/after tracking",
        descEs: "Evaluación de 5 dimensiones con seguimiento antes/después",
      },
      {
        nameEn: "Pipeline Analytics",
        nameEs: "Analítica del Pipeline",
        href: "/dashboard/pipeline",
        descEn: "Win rate, deal velocity, pipeline value",
        descEs: "Tasa de cierre, velocidad de deals, valor del pipeline",
      },
      {
        nameEn: "Coaching Nudges",
        nameEs: "Nudges de Coaching",
        href: "/dashboard",
        descEn: "AI-powered daily recommendations based on your data",
        descEs: "Recomendaciones diarias impulsadas por IA basadas en tus datos",
      },
    ],
  },
  {
    nameEn: "Connect",
    nameEs: "Conectar",
    color: "bg-indigo-500",
    lightBg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-200 dark:border-indigo-500/30",
    whatEn: "Sync with your existing tools",
    whatEs: "Sincroniza con tus herramientas actuales",
    howEn:
      "The OS doesn't replace your CRM or outreach tool — it connects to them. Sync your pipeline with Attio or Pipedrive. Export artifacts to Notion. Find emails with Hunter.io. The OS is your command center; your other tools are the execution layer.",
    howEs:
      "El OS no reemplaza tu CRM ni tu herramienta de outreach — se conecta a ellas. Sincroniza tu pipeline con Attio o Pipedrive. Exporta artefactos a Notion. Encuentra emails con Hunter.io. El OS es tu centro de comando; tus otras herramientas son la capa de ejecución.",
    features: [
      {
        nameEn: "CRM Sync",
        nameEs: "CRM Sync",
        href: "/settings/apps",
        descEn: "Attio & Pipedrive bi-directional sync",
        descEs: "Sincronización bidireccional con Attio y Pipedrive",
      },
      {
        nameEn: "Notion Export",
        nameEs: "Exportar a Notion",
        href: "/settings/apps",
        descEn: "Push artifacts to your Notion workspace",
        descEs: "Envía artefactos a tu workspace de Notion",
      },
      {
        nameEn: "Hunter.io",
        nameEs: "Hunter.io",
        href: "/settings/apps",
        descEn: "Find verified emails without leaving the OS",
        descEs: "Encuentra emails verificados sin salir del OS",
      },
    ],
  },
];

const DASHBOARD_WIDGETS = [
  {
    titleEn: "Onboarding Checklist",
    titleEs: "Lista de Onboarding",
    descriptionEn:
      "Tracks your setup progress — completing your profile, assessment, first lesson, first roleplay, and reading this guide. Shows until all steps are done, then collapses. You can always reopen it.",
    descriptionEs:
      "Rastrea tu progreso de configuración — completar tu perfil, evaluación, primera lección, primer roleplay y leer esta guía. Se muestra hasta que todos los pasos estén listos, luego se colapsa. Siempre puedes reabrirla.",
  },
  {
    titleEn: "Quick Win Path",
    titleEs: "Ruta de Victorias Rápidas",
    descriptionEn:
      "Three recommended first lessons chosen based on your biggest assessment gaps. Designed to give you the fastest improvement in under 90 minutes. Disappears after you complete 3 lessons.",
    descriptionEs:
      "Tres primeras lecciones recomendadas elegidas según tus mayores brechas de evaluación. Diseñadas para darte la mejora más rápida en menos de 90 minutos. Desaparece después de completar 3 lecciones.",
  },
  {
    titleEn: "Coaching Nudges",
    titleEs: "Nudges de Coaching",
    descriptionEn:
      "AI-generated contextual reminders based on your actual data — like 'You haven't logged outreach in 3 days' or 'Your ICP score is low, consider this course'. Actionable, not generic.",
    descriptionEs:
      "Recordatorios contextuales generados por IA basados en tus datos reales — como 'No has registrado outreach en 3 días' o 'Tu puntaje de ICP es bajo, considera este curso'. Accionables, no genéricos.",
  },
  {
    titleEn: "Acquisition Health",
    titleEs: "Salud de Adquisición",
    descriptionEn:
      "Five readiness scores (ICP Clarity, Positioning, Messaging, Channel Readiness, Sales Process) rated 0-100. These update as you complete lessons and assessments. Green = strong. Red = priority gap. Shows change vs. your previous scores.",
    descriptionEs:
      "Cinco puntajes de preparación (Claridad de ICP, Posicionamiento, Mensajería, Preparación de Canal, Proceso de Ventas) calificados de 0 a 100. Se actualizan al completar lecciones y evaluaciones. Verde = fuerte. Rojo = brecha prioritaria. Muestra el cambio frente a tus puntajes anteriores.",
  },
  {
    titleEn: "What to Do Next",
    titleEs: "Qué Hacer a Continuación",
    descriptionEn:
      "Four prioritized actions based on your assessment gaps, quick wins, and progress. Each links directly to the course, tool, or exercise that addresses it. This is your daily starting point.",
    descriptionEs:
      "Cuatro acciones priorizadas basadas en tus brechas de evaluación, victorias rápidas y progreso. Cada una enlaza directamente al curso, herramienta o ejercicio que la aborda. Este es tu punto de partida diario.",
  },
  {
    titleEn: "Continue Your Journey",
    titleEs: "Continúa tu Recorrido",
    descriptionEn:
      "Shows your current course with a one-click resume button. Tells you which track you're on and the total duration remaining.",
    descriptionEs:
      "Muestra tu curso actual con un botón de un clic para continuar. Te indica en qué track estás y el tiempo total restante.",
  },
  {
    titleEn: "Roleplay Stats",
    titleEs: "Estadísticas de Roleplay",
    descriptionEn:
      "Your sales simulation performance — total sessions, average score, and breakdown by buyer personality type (DISC). Practice regularly to see these improve over time.",
    descriptionEs:
      "Tu desempeño en simulaciones de ventas — sesiones totales, puntaje promedio y desglose por tipo de personalidad de comprador (DISC). Practica con regularidad para ver cómo mejoran.",
  },
  {
    titleEn: "Artifact Status",
    titleEs: "Estado de Artefactos",
    descriptionEn:
      "Shows which playbook documents you've built (ICP, positioning, email sequences, discovery playbook, etc.) and which are still empty. Your goal: complete all of them through the courses.",
    descriptionEs:
      "Muestra qué documentos del playbook has construido (ICP, posicionamiento, secuencias de email, playbook de discovery, etc.) y cuáles aún están vacíos. Tu objetivo: completarlos todos a través de los cursos.",
  },
  {
    titleEn: "Solo Advisor AI Preview",
    titleEs: "Vista Previa del Solo Advisor AI",
    descriptionEn:
      "A preview of your AI coach's latest personalized insight about your business. Click through to have a full conversation about strategy, messaging, or any GTM question.",
    descriptionEs:
      "Una vista previa del último insight personalizado de tu coach AI sobre tu negocio. Haz clic para tener una conversación completa sobre estrategia, mensajería o cualquier pregunta de GTM.",
  },
  {
    titleEn: "Outreach & Pipeline Stats",
    titleEs: "Estadísticas de Outreach y Pipeline",
    descriptionEn:
      "Snapshot of your outreach activity (emails, LinkedIn, calls, WhatsApp) and pipeline health (total deals, value, conversion rate). These populate as you log actions in the Execute section.",
    descriptionEs:
      "Panorama de tu actividad de outreach (emails, LinkedIn, llamadas, WhatsApp) y salud del pipeline (deals totales, valor, tasa de conversión). Se llenan a medida que registras acciones en la sección Ejecutar.",
  },
  {
    titleEn: "Streak, XP & Badges",
    titleEs: "Racha, XP e Insignias",
    descriptionEn:
      "Gamification that tracks consistency. Keep a daily streak by completing lessons, earn XP to level up through 15 titles (from Observer to GTM Architect), and unlock badges for milestones. The streak counter resets if you miss a day.",
    descriptionEs:
      "Gamificación que rastrea la constancia. Mantén una racha diaria completando lecciones, gana XP para subir de nivel a través de 15 títulos (desde Observador hasta GTM Architect) y desbloquea insignias por hitos. El contador de racha se reinicia si pierdes un día.",
  },
];

const INTEGRATIONS = [
  {
    name: "Attio CRM",
    descriptionEn:
      "Bi-directional pipeline sync. Deals you create in the OS flow to Attio; stage changes in Attio flow back. Auto-enriches companies and contacts with firmographic data.",
    descriptionEs:
      "Sincronización bidireccional del pipeline. Los deals que creas en el OS fluyen a Attio; los cambios de etapa en Attio regresan al OS. Enriquece automáticamente empresas y contactos con datos firmográficos.",
    setupEn: "Go to Settings > Connected Apps > Attio. Paste your API key.",
    setupEs: "Ve a Configuración > Apps Conectadas > Attio. Pega tu API key.",
  },
  {
    name: "Pipedrive",
    descriptionEn:
      "Sync your deals and contacts with Pipedrive. Two-way: create deals in either place, they stay in sync.",
    descriptionEs:
      "Sincroniza tus deals y contactos con Pipedrive. Bidireccional: crea deals en cualquiera de los dos lados y se mantienen sincronizados.",
    setupEn:
      "Go to Settings > Connected Apps > Pipedrive. Enter your API token and company domain.",
    setupEs:
      "Ve a Configuración > Apps Conectadas > Pipedrive. Ingresa tu API token y dominio de empresa.",
  },
  {
    name: "Notion",
    descriptionEn:
      "Export your playbook artifacts (ICP doc, positioning, email sequences) as formatted Notion pages in your workspace.",
    descriptionEs:
      "Exporta tus artefactos del playbook (doc de ICP, posicionamiento, secuencias de email) como páginas formateadas de Notion en tu workspace.",
    setupEn:
      "Go to Settings > Connected Apps > Notion. Click Connect to authorize via OAuth.",
    setupEs:
      "Ve a Configuración > Apps Conectadas > Notion. Haz clic en Conectar para autorizar vía OAuth.",
  },
  {
    name: "Hunter.io",
    descriptionEn:
      "Find verified email addresses at any company domain. Use the 'Find emails' button in ICP Builder or List Building to surface contacts without leaving the OS.",
    descriptionEs:
      "Encuentra direcciones de email verificadas en cualquier dominio de empresa. Usa el botón 'Buscar emails' en el ICP Builder o en la creación de listas para encontrar contactos sin salir del OS.",
    setupEn:
      "Go to Settings > Connected Apps > Hunter.io. Paste your API key from hunter.io/dashboard.",
    setupEs:
      "Ve a Configuración > Apps Conectadas > Hunter.io. Pega tu API key desde hunter.io/dashboard.",
  },
  {
    name: "Brevo (Sendinblue)",
    descriptionEn:
      "Send email campaigns and manage subscriber lists. Useful for nurture sequences built in the OS.",
    descriptionEs:
      "Envía campañas de email y gestiona listas de suscriptores. Útil para secuencias de nurture construidas en el OS.",
    setupEn: "Go to Settings > Connected Apps > Brevo. Paste your API key.",
    setupEs:
      "Ve a Configuración > Apps Conectadas > Brevo. Pega tu API key.",
  },
  {
    name: "WhatsApp Business",
    descriptionEn:
      "Send outreach messages via WhatsApp. Log conversations and track responses alongside your other channels.",
    descriptionEs:
      "Envía mensajes de outreach por WhatsApp. Registra conversaciones y rastrea respuestas junto a tus otros canales.",
    setupEn:
      "Go to Settings > Connected Apps > WhatsApp. Enter your API key and phone number ID.",
    setupEs:
      "Ve a Configuración > Apps Conectadas > WhatsApp. Ingresa tu API key y el ID de número de teléfono.",
  },
];

export default async function GuidePage() {
  const session = await getServerSession();
  if (!session?.uid) redirect("/signin");
  const locale = await getLocale();
  const isEs = locale === "es";

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      {/* Track that the user viewed this page */}
      <MarkGuideViewed />

      {/* ═══════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════ */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-2">
          {isEs ? "Vista General de la Plataforma" : "Platform Overview"}
        </p>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          {isEs ? "Tu Guía Completa del Solo GTM OS" : "Your Complete Guide to Solo GTM OS"}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
          {isEs
            ? "Todo lo que necesitas saber para entender, usar y sacar el máximo provecho de la plataforma. Guarda esta página — vuelve cuando necesites un repaso."
            : "Everything you need to know to understand, use, and get the most out of the platform. Bookmark this page — come back whenever you need a refresher."}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/60 p-6 mb-12">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-3">
          {isEs ? "En esta página" : "On this page"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-primary-500 hover:text-primary-600 truncate"
            >
              {isEs ? item.es : item.en}
            </a>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: WHAT IS THIS?
      ═══════════════════════════════════════════════════════════════ */}
      <section id="what-is-this" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {isEs ? "¿Qué es Solo GTM OS?" : "What is Solo GTM OS?"}
        </h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>
            {isEs ? (
              <>
                Solo GTM OS es un <strong>Sistema Operativo de go-to-market</strong> para
                fundadores y fundadoras en solitario. No es una biblioteca de cursos. No es un
                programa de coaching. No es un CRM. Es un sistema único que combina todo eso
                en un flujo de trabajo conectado — aprendes la habilidad, construyes el activo,
                ejecutas la acción, mides el resultado, y luego retroalimentas esos datos para
                aprender mejor la próxima vez.
              </>
            ) : (
              <>
                Solo GTM OS is a <strong>go-to-market Operating System</strong> for
                solo founders. It&apos;s not a course library. It&apos;s not a
                coaching program. It&apos;s not a CRM. It&apos;s a single system
                that combines all of those into one connected workflow — learn the
                skill, build the asset, execute the action, measure the result, then
                feed that data back to learn better next time.
              </>
            )}
          </p>
          <p>
            {isEs
              ? "Piénsalo así: la mayoría de los productos educativos te enseñan cosas y luego te dejan descubrir cómo aplicarlas. Esta plataforma te enseña y, de inmediato, te da las herramientas para aplicar lo que aprendiste, rastrea si funcionó, y usa IA para ajustar tu ruta con base en resultados reales."
              : "Think of it like this: most educational products teach you things and then leave you to figure out how to apply them. This platform teaches you, then immediately gives you the tools to apply what you learned, tracks whether it worked, and uses AI to adjust your path based on real results."}
          </p>
          <p>
            {isEs
              ? "Todo está conectado. Tu evaluación de preparación le dice a la IA qué cursos priorizar. Esos cursos incluyen ejercicios que construyen tu playbook real de ventas. Ese playbook alimenta tu outreach y el seguimiento del pipeline. Tus resultados de outreach actualizan tus puntajes de preparación. Y el coach AI ve todo — así que cuando pides ayuda, conoce tu ICP, tu posicionamiento, tu pipeline y tus brechas."
              : "Everything is connected. Your readiness assessment tells the AI which courses to prioritize. Those courses include exercises that build your actual sales playbook. That playbook feeds into your outreach and pipeline tracking. Your outreach results update your readiness scores. And the AI coach sees all of it — so when you ask for help, it knows your ICP, your positioning, your pipeline, and your gaps."}
          </p>

          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30 rounded-xl p-5 mt-6">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-3">
              {isEs ? "Qué lo hace diferente" : "What makes this different"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Benefit
                text={
                  isEs
                    ? "IA que conoce tu negocio — no consejos genéricos de chatbot"
                    : "AI that knows your business — not generic chatbot advice"
                }
              />
              <Benefit
                text={
                  isEs
                    ? "Los cursos construyen entregables reales, no solo conocimiento"
                    : "Courses build real deliverables, not just knowledge"
                }
              />
              <Benefit
                text={
                  isEs
                    ? "Seguimiento de pipeline y outreach integrado — sin herramientas separadas"
                    : "Pipeline and outreach tracking built in — no separate tools"
                }
              />
              <Benefit
                text={
                  isEs
                    ? "Puntajes de preparación que se actualizan al aprender y ejecutar"
                    : "Readiness scores that update as you learn and execute"
                }
              />
              <Benefit
                text={
                  isEs
                    ? "Sales roleplay contra buyer personas de IA antes de llamadas reales"
                    : "Sales roleplay against AI buyer personas before real calls"
                }
              />
              <Benefit
                text={
                  isEs
                    ? "Un sistema en lugar de 5+ herramientas y cursos separados"
                    : "One system instead of 5+ separate tools and courses"
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: GETTING STARTED
      ═══════════════════════════════════════════════════════════════ */}
      <section id="getting-started" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Primeros Pasos" : "Getting Started"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "No intentes explorar todo a la vez. Tu panel tiene una lista de onboarding que rastrea estos pasos por ti."
            : "Don\u2019t try to explore everything at once. Your dashboard has an onboarding checklist that tracks these steps for you."}
        </p>

        <div className="space-y-4">
          <StartStep
            number={1}
            title={
              isEs
                ? "Completa tu perfil de negocio"
                : "Complete your business profile"
            }
            description={
              isEs
                ? "El cuestionario de onboarding toma 5-10 minutos. Pregunta sobre tu negocio, audiencia objetivo, experiencia en ventas y metas. Todo lo que hace la IA — desde recomendar cursos hasta hacerte coaching — se basa en estos datos. Si lo llenaste rápido, puedes actualizarlo cuando quieras."
                : "The onboarding questionnaire takes 5-10 minutes. It asks about your business, target audience, sales experience, and goals. Everything the AI does — from recommending courses to coaching you — is based on this data. If you rushed through it, you can update it anytime."
            }
            href="/onboarding/questionnaire"
            linkText={isEs ? "Ir al cuestionario" : "Go to questionnaire"}
          />
          <StartStep
            number={2}
            title={
              isEs
                ? "Ejecuta la evaluación de preparación"
                : "Run the readiness assessment"
            }
            description={
              isEs
                ? "Después del cuestionario, la IA analiza tu negocio y genera tus puntajes base de preparación en 5 dimensiones: Claridad de ICP, Posicionamiento, Mensajería, Preparación de Canal y Proceso de Ventas. Estos puntajes impulsan todo — tu currículo recomendado, nudges de coaching y próximas acciones."
                : "After the questionnaire, the AI analyzes your business and generates your baseline readiness scores across 5 dimensions: ICP Clarity, Positioning, Messaging, Channel Readiness, and Sales Process. These scores drive everything — your recommended curriculum, coaching nudges, and next actions."
            }
            href="/onboarding/analyzing"
            linkText={isEs ? "Ejecutar evaluación" : "Run assessment"}
          />
          <StartStep
            number={3}
            title={
              isEs
                ? "Empieza tu primera lección"
                : "Start your first lesson"
            }
            description={
              isEs
                ? "Tu panel muestra las primeras lecciones recomendadas según tus mayores brechas. Cada lección dura 15-30 minutos e incluye ejercicios interactivos — no solo lectura. Los ejercicios construyen tu playbook real de ventas (doc de ICP, declaración de posicionamiento, secuencias de email)."
                : "Your dashboard shows recommended first lessons based on your biggest gaps. Each lesson is 15-30 minutes and includes interactive exercises — not just reading. The exercises build your actual sales playbook (ICP doc, positioning statement, email sequences)."
            }
            href="/academy"
            linkText={isEs ? "Abrir Academia" : "Open Academy"}
          />
          <StartStep
            number={4}
            title={
              isEs
                ? "Practica un sales roleplay"
                : "Practice a sales roleplay"
            }
            description={
              isEs
                ? "La herramienta de Sales Roleplay te permite practicar llamadas de discovery, demos y manejo de objeciones contra buyer personas de IA basadas en tipos de personalidad DISC reales. Califica tu desempeño y te dice exactamente qué mejorar. Sin prospectos reales afectados."
                : "The Sales Roleplay tool lets you practice discovery calls, demos, and objection handling against AI buyer personas based on real DISC personality types. It scores your performance and tells you exactly what to improve. No real prospects harmed."
            }
            href="/roleplay"
            linkText={isEs ? "Iniciar un roleplay" : "Start a roleplay"}
          />
          <StartStep
            number={5}
            title={
              isEs
                ? "Configura tus integraciones"
                : "Set up your integrations"
            }
            description={
              isEs
                ? "Conecta tu CRM (Attio o Pipedrive), Notion para exportar artefactos, y Hunter.io para encontrar emails. El OS funciona solo, pero las integraciones lo convierten en parte de tu flujo de trabajo diario en lugar de una pestaña separada."
                : "Connect your CRM (Attio or Pipedrive), Notion for artifact export, and Hunter.io for email finding. The OS works standalone, but integrations make it part of your daily workflow instead of a separate tab."
            }
            href="/settings/apps"
            linkText={
              isEs ? "Ir a Configuración > Apps" : "Go to Settings > Apps"
            }
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: THE 5-LAYER SYSTEM
      ═══════════════════════════════════════════════════════════════ */}
      <section id="five-layers" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "El Sistema de 5 Capas" : "The 5-Layer System"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "Cada capa alimenta la siguiente. Esto es lo que lo convierte en un sistema operativo, no en una biblioteca de cursos."
            : "Each layer feeds the next. This is what makes it an operating system, not a course library."}
        </p>

        <div className="space-y-4">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.nameEn}
              className={`${layer.lightBg} ${layer.border} border rounded-2xl overflow-hidden`}
            >
              <div className="px-6 py-5">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`w-8 h-8 ${layer.color} text-white rounded-lg flex items-center justify-center text-sm font-bold`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {isEs ? layer.nameEs : layer.nameEn}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    &mdash; {isEs ? layer.whatEs : layer.whatEn}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {isEs ? layer.howEs : layer.howEn}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {layer.features.map((f) => (
                    <Link
                      key={f.nameEn}
                      href={f.href}
                      className="bg-white/60 dark:bg-gray-800/60 rounded-xl px-4 py-3 hover:bg-white dark:hover:bg-gray-800 transition-colors border border-white/50 dark:border-gray-700/30"
                    >
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                        {isEs ? f.nameEs : f.nameEn}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {isEs ? f.descEs : f.descEn}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700/60 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
            {LAYERS.map((layer, i) => (
              <div key={layer.nameEn} className="flex items-center gap-2">
                <div
                  className={`${layer.color} text-white px-4 py-2 rounded-xl text-sm font-bold`}
                >
                  {isEs ? layer.nameEs : layer.nameEn}
                </div>
                {i < LAYERS.length - 1 && (
                  <span className="text-gray-300 dark:text-gray-600 text-lg hidden sm:block">
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
            <span className="text-xs text-gray-400">
              {isEs
                ? "Medir retroalimenta a Aprender — tus puntajes le dicen a la IA qué enseñarte a continuación"
                : "Measure feeds back into Learn \u2014 your scores tell the AI what to teach you next"}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: YOUR DASHBOARD
      ═══════════════════════════════════════════════════════════════ */}
      <section id="dashboard" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Tu Panel" : "Your Dashboard"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "El panel es tu centro de comando. Ábrelo cada día — te dice qué necesita atención y qué hacer a continuación. Esto es lo que muestra cada sección."
            : "The dashboard is your command center. Open it every day \u2014 it tells you what needs attention and what to do next. Here\u2019s what each section shows you."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DASHBOARD_WIDGETS.map((w) => (
            <div
              key={w.titleEn}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl px-5 py-4"
            >
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1.5">
                {isEs ? w.titleEs : w.titleEn}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {isEs ? w.descriptionEs : w.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: ACADEMY & COURSES
      ═══════════════════════════════════════════════════════════════ */}
      <section id="academy" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Academia y Cursos" : "Academy & Courses"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "La Academia está estructurada en tracks → cursos → lecciones. Tu ruta de currículo generada por IA te indica el orden a seguir, pero puedes explorar libremente."
            : "The Academy is structured as tracks \u2192 courses \u2192 lessons. Your AI-generated curriculum path tells you which order to follow, but you can explore freely."}
        </p>

        <div className="space-y-4">
          <DetailCard
            title={isEs ? "8 Tracks de Aprendizaje" : "8 Learning Tracks"}
            content={
              isEs
                ? "Cada track cubre un área principal de adquisición de clientes: ICP y Posicionamiento, Generación de Leads, Proceso de Ventas, Manejo de Objeciones, Negociación y Cierre, Éxito del Cliente, Economía del Creador y Estrategia Avanzada. Despliega cualquier track en la barra lateral para ver sus cursos."
                : "Each track covers a major area of customer acquisition: ICP & Positioning, Lead Generation, Sales Process, Objection Handling, Negotiation & Closing, Customer Success, Creator Economy, and Advanced Strategy. Expand any track in the sidebar to see its courses."
            }
          />
          <DetailCard
            title={isEs ? "48 Cursos, ~490 Lecciones" : "48 Courses, ~490 Lessons"}
            content={
              isEs
                ? "Cada curso tiene 10-15 lecciones que cubren un tema específico. Las lecciones incluyen material de lectura, ejercicios interactivos (sliders, checklists, hojas de trabajo), quizzes y evaluaciones calificadas por IA. Una lección típica toma 15-30 minutos."
                : "Each course has 10-15 lessons covering a focused topic. Lessons include reading material, interactive exercises (sliders, checklists, worksheets), quizzes, and AI-graded assessments. A typical lesson takes 15-30 minutes."
            }
          />
          <DetailCard
            title={isEs ? "Ejercicios Interactivos" : "Interactive Exercises"}
            content={
              isEs
                ? "Los ejercicios no son solo 'reflexiona sobre esto'. Producen resultados reales — tu documento de ICP, declaración de posicionamiento, plantillas de email, scripts para manejar objeciones. Estos se convierten en artefactos versionados en tu Playbook que puedes exportar y usar."
                : "Exercises aren\u2019t just \u2018reflect on this.\u2019 They produce real outputs \u2014 your ICP document, positioning statement, email templates, objection handling scripts. These become versioned artifacts in your Playbook that you can export and use."
            }
          />
          <DetailCard
            title={isEs ? "Evaluaciones Calificadas por IA" : "AI-Graded Assessments"}
            content={
              isEs
                ? "Al final de cada curso, una evaluación de IA evalúa tu comprensión y aplicación. No son quizzes de opción múltiple — te piden aplicar conceptos a tu negocio específico. Tus puntajes contribuyen a tus dimensiones de preparación."
                : "At the end of each course, an AI assessment evaluates your understanding and application. These aren\u2019t multiple-choice quizzes \u2014 they ask you to apply concepts to your specific business. Your scores contribute to your readiness dimensions."
            }
          />
          <DetailCard
            title={isEs ? "Ruta Personalizada" : "Personalized Path"}
            content={
              isEs
                ? "Tu evaluación de preparación identifica tus áreas más débiles. La sección 'Qué Hacer a Continuación' en tu panel usa esto para recomendar qué curso tomar a continuación. Puedes seguir esta ruta o ir por tu cuenta — ambas funcionan."
                : "Your readiness assessment identifies your weakest areas. The \u2018What to Do Next\u2019 section on your dashboard uses this to recommend which course to take next. You can follow this or go your own way \u2014 both work."
            }
          />
        </div>

        <div className="mt-4">
          <Link
            href="/academy"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            {isEs ? "Ver todos los cursos \u2192" : "Browse all courses \u2192"}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: AI TOOLS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="ai-tools" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Herramientas AI" : "AI Tools"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "Tres herramientas impulsadas por IA que conocen el contexto de tu negocio. No son genéricas — usan tu perfil, evaluación, ICP y datos de pipeline para darte ayuda específica y relevante."
            : "Three AI-powered tools that know your business context. They\u2019re not generic \u2014 they use your profile, assessment, ICP, and pipeline data to give specific, relevant help."}
        </p>

        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              Solo Advisor AI
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              {isEs
                ? "Tu coach AI personal. Conoce tu modelo de negocio, audiencia objetivo, puntajes de evaluación, estado del pipeline y progreso de aprendizaje. Pregúntale cualquier cosa:"
                : "Your personal AI coach. It knows your business model, target audience, assessment scores, pipeline status, and learning progress. Ask it anything:"}
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 mb-4">
              {isEs ? (
                <>
                  <li>&bull; &ldquo;¿Cómo me posiciono frente a [competidor]?&rdquo;</li>
                  <li>&bull; &ldquo;Escríbeme un cold email para [persona objetivo]&rdquo;</li>
                  <li>&bull; &ldquo;¿En qué debo enfocarme esta semana?&rdquo;</li>
                  <li>&bull; &ldquo;Revisa mi script de discovery call&rdquo;</li>
                  <li>&bull; &ldquo;Ayúdame a manejar la objeción de &apos;ya tenemos una solución&apos;&rdquo;</li>
                </>
              ) : (
                <>
                  <li>&bull; &ldquo;How should I position against [competitor]?&rdquo;</li>
                  <li>&bull; &ldquo;Write me a cold email for [target persona]&rdquo;</li>
                  <li>&bull; &ldquo;What should I focus on this week?&rdquo;</li>
                  <li>&bull; &ldquo;Review my discovery call script&rdquo;</li>
                  <li>
                    &bull; &ldquo;Help me handle the &apos;we already have a
                    solution&apos; objection&rdquo;
                  </li>
                </>
              )}
            </ul>
            <Link
              href="/coach"
              className="text-sm font-medium text-primary-500 hover:text-primary-600"
            >
              {isEs ? "Abrir Solo Advisor \u2192" : "Open Solo Advisor \u2192"}
            </Link>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              Sales Roleplay
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              {isEs
                ? "Practica conversaciones de ventas contra buyer personas de IA. Cada persona tiene un tipo de personalidad DISC distinto (Dominante, Influyente, Estable, Concienzudo) que cambia cómo responde. La IA te califica en:"
                : "Practice sales conversations against AI buyer personas. Each persona has a distinct DISC personality type (Dominant, Influencer, Steady, Conscientious) that changes how they respond. The AI scores you on:"}
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 mb-4">
              {isEs ? (
                <>
                  <li>&bull; Técnica de discovery — ¿estás haciendo las preguntas correctas?</li>
                  <li>&bull; Manejo de objeciones — ¿abordas las preocupaciones o las evitas?</li>
                  <li>&bull; Escucha activa — ¿construyes sobre lo que dicen?</li>
                  <li>&bull; Cierre — ¿avanzas la conversación hacia los próximos pasos?</li>
                </>
              ) : (
                <>
                  <li>&bull; Discovery technique — are you asking the right questions?</li>
                  <li>
                    &bull; Objection handling — do you address concerns or dodge them?
                  </li>
                  <li>&bull; Active listening — do you build on what they say?</li>
                  <li>
                    &bull; Closing — do you advance the conversation toward next steps?
                  </li>
                </>
              )}
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {isEs
                ? "Tus estadísticas de roleplay en el panel muestran tu puntaje promedio y desglose por tipo de personalidad — para que puedas ver con qué tipos de compradores tienes dificultades."
                : "Your roleplay stats on the dashboard show your average score and breakdown by personality type \u2014 so you can see which buyer types you struggle with."}
            </p>
            <Link
              href="/roleplay"
              className="text-sm font-medium text-primary-500 hover:text-primary-600"
            >
              {isEs ? "Iniciar un roleplay \u2192" : "Start a roleplay \u2192"}
            </Link>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              ICP Builder
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              {isEs
                ? "Un taller interactivo y guiado que te lleva paso a paso a definir tu Perfil de Cliente Ideal. Pregunta sobre tamaño de empresa, industria, puntos de dolor, señales de compra y proceso de toma de decisiones. El resultado se convierte en un artefacto versionado en tu Playbook que el coach AI referencia al ayudarte."
                : "An interactive, guided workshop that walks you through defining your Ideal Customer Profile step by step. It asks about company size, industry, pain points, buying signals, and decision-making process. The output becomes a versioned artifact in your Playbook that the AI coach references when helping you."}
            </p>
            <Link
              href="/academy/tools/icp-builder"
              className="text-sm font-medium text-primary-500 hover:text-primary-600"
            >
              {isEs ? "Abrir ICP Builder \u2192" : "Open ICP Builder \u2192"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7: EXECUTE — OUTREACH & PIPELINE
      ═══════════════════════════════════════════════════════════════ */}
      <section id="execute" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs
            ? "Ejecutar: Outreach y Pipeline"
            : "Execute: Outreach & Pipeline"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "Aquí es donde el aprendizaje se convierte en ingresos. La capa Ejecutar rastrea tu actividad de ventas real para que la IA pueda darte coaching basado en datos."
            : "This is where learning becomes revenue. The Execute layer tracks your real-world sales activity so the AI can give you data-driven coaching."}
        </p>

        <div className="space-y-4">
          <DetailCard
            title={isEs ? "Registro de Outreach" : "Outreach Log"}
            content={
              isEs
                ? "Registra cada punto de contacto con prospectos — emails enviados, mensajes de LinkedIn, llamadas telefónicas, mensajes de WhatsApp y eventos. Registra el canal, el tipo de acción (contacto inicial, seguimiento, reunión agendada) y el resultado (positivo, neutro, negativo, pendiente). Tu panel muestra tasas de respuesta y qué canales funcionan mejor para ti."
                : "Track every prospect touchpoint \u2014 emails sent, LinkedIn messages, phone calls, WhatsApp messages, and events. Log the channel, action type (initial outreach, follow-up, meeting booked), and outcome (positive, neutral, negative, pending). Your dashboard shows response rates and which channels work best for you."
            }
          />
          <DetailCard
            title={isEs ? "Pipeline Board" : "Pipeline Board"}
            content={
              isEs
                ? "Un tablero Kanban con arrastrar y soltar para rastrear deals desde Lead a través de Contactado, Reunión, Propuesta, hasta Ganado o Perdido. Ve el valor total de tu pipeline, la tasa de conversión entre etapas y la velocidad de los deals. Si conectas un CRM, los deals se sincronizan en ambas direcciones."
                : "A drag-and-drop Kanban board for tracking deals from Lead through Contacted, Meeting, Proposal, to Won or Lost. See your total pipeline value, conversion rate between stages, and deal velocity. If you connect a CRM, deals sync both ways."
            }
          />
          <DetailCard
            title={isEs ? "Por Qué Esto Importa" : "Why This Matters"}
            content={
              isEs
                ? "La mayoría de fundadores y fundadoras en solitario no rastrean su outreach ni su pipeline. Sin datos, no puedes saber qué funciona. El OS usa tus datos de ejecución para generar nudges de coaching ('No has hecho seguimiento a 3 prospectos'), actualizar tus puntajes de preparación y darle al coach AI contexto real cuando pides ayuda."
                : "Most solo founders don\u2019t track their outreach or pipeline at all. Without data, you can\u2019t know what\u2019s working. The OS uses your execution data to generate coaching nudges (\u2018You haven\u2019t followed up with 3 prospects\u2019), update your readiness scores, and give the AI coach real context when you ask for help."
            }
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Link
            href="/dashboard/outreach"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            {isEs ? "Abrir Registro de Outreach \u2192" : "Open Outreach Log \u2192"}
          </Link>
          <Link
            href="/dashboard/pipeline"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            {isEs ? "Abrir Pipeline \u2192" : "Open Pipeline \u2192"}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8: COMMUNITY & PODS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="community" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Comunidad y Pods" : "Community & Pods"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "Solo no significa en soledad. Las funciones de comunidad te conectan con otros fundadores y fundadoras que atraviesan el mismo proceso."
            : "Solo doesn\u2019t mean alone. The community features connect you with other founders going through the same process."}
        </p>

        <div className="space-y-4">
          <DetailCard
            title={isEs ? "Pods (Grupos de Responsabilidad)" : "Pods (Accountability Groups)"}
            content={
              isEs
                ? "Se te coloca en un pod pequeño (3-5 fundadores y fundadoras) emparejados por etapa, industria y estilo de comportamiento. Los pods tienen una categoría compartida en el foro donde haces check-in, compartes victorias y te responsabilizas mutuamente. Un facilitador de IA publica iniciadores de conversación y mantiene el ritmo."
                : "You\u2019re placed in a small pod (3-5 founders) matched by stage, industry, and behavioral style. Pods have a shared category in the forum where you check in, share wins, and hold each other accountable. An AI facilitator posts conversation starters and keeps the rhythm going."
            }
          />
          <DetailCard
            title={isEs ? "Foro del Cohort" : "Cohort Forum"}
            content={
              isEs
                ? "Un tablón de discusión comunitaria organizado por tema: Toda la Academia (anuncios, victorias, general), Discusiones de Cursos (canales por track) y Recursos (plantillas, herramientas, club de libros). Personas AI participan en las discusiones para modelar buenas preguntas y mantener las conversaciones productivas."
                : "A community discussion board organized by topic: Academy-Wide (announcements, wins, general), Course Discussions (per-track channels), and Resources (templates, tools, book club). AI personas participate in discussions to model good questions and keep conversations productive."
            }
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Link
            href="/community/pods"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            {isEs ? "Mis Pods \u2192" : "My Pods \u2192"}
          </Link>
          <Link
            href="/community/forum"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            {isEs ? "Foro del Cohort \u2192" : "Cohort Forum \u2192"}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9: GAMIFICATION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="gamification" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "XP, Insignias y Rachas" : "XP, Badges & Streaks"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "La gamificación premia la constancia, no la velocidad. El objetivo es el compromiso diario, no maratonear contenido."
            : "Gamification rewards consistency, not speed. The goal is daily engagement, not binge-watching."}
        </p>

        <div className="space-y-4">
          <DetailCard
            title={isEs ? "XP y Niveles" : "XP & Levels"}
            content={
              isEs
                ? "Gana XP completando lecciones, ejercicios, evaluaciones y roleplays. El XP se acumula en niveles con títulos (Observador, Explorador, Estratega, ... hasta GTM Architect en el Nivel 15). Tu nivel se muestra en tu panel."
                : "Earn XP by completing lessons, exercises, assessments, and roleplays. XP accumulates into levels with titles (Observer, Scout, Strategist, ... up to GTM Architect at Level 15). Your level is displayed on your dashboard."
            }
          />
          <DetailCard
            title={isEs ? "Racha Diaria" : "Daily Streak"}
            content={
              isEs
                ? "Completa al menos una lección por día para mantener tu racha. Tu racha actual y la más larga se rastrean en el panel. Perder un día reinicia el contador a cero — pero tu XP total y progreso nunca se pierden."
                : "Complete at least one lesson per day to maintain your streak. Your current and longest streaks are tracked on the dashboard. Missing a day resets the counter to zero \u2014 but your total XP and progress are never lost."
            }
          />
          <DetailCard
            title={isEs ? "Insignias" : "Badges"}
            content={
              isEs
                ? "Desbloquea insignias por hitos: primera lección completada, primer roleplay, 10 roleplays, completar un track, alcanzar hitos de racha y más. Las insignias ganadas se muestran en la Vitrina de Insignias de tu panel."
                : "Unlock badges for milestones: first lesson complete, first roleplay, 10 roleplays, completing a track, reaching streak milestones, and more. Earned badges display in the Badge Showcase on your dashboard."
            }
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 10: INTEGRATIONS & APPS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="integrations" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Integraciones y Apps" : "Integrations & Apps"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "El OS funciona solo, pero conectar tus herramientas actuales lo hace significativamente más poderoso. Configúralas pronto — cada una toma 2 minutos."
            : "The OS works standalone, but connecting your existing tools makes it significantly more powerful. Set these up early \u2014 they take 2 minutes each."}
        </p>

        <div className="space-y-3">
          {INTEGRATIONS.map((int) => (
            <div
              key={int.name}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl px-5 py-4"
            >
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">
                {int.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
                {isEs ? int.descriptionEs : int.descriptionEn}
              </p>
              <p className="text-xs text-primary-500 font-medium">
                {isEs ? int.setupEs : int.setupEn}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link
            href="/settings/apps"
            className="btn bg-primary-500 text-white hover:bg-primary-600 text-sm px-5"
          >
            {isEs
              ? "Ir a Configuración \u2192 Apps Conectadas"
              : "Go to Settings \u2192 Connected Apps"}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 11: DAILY RHYTHM
      ═══════════════════════════════════════════════════════════════ */}
      <section id="daily-rhythm" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs
            ? "Tu Ritmo Diario (35 min/día)"
            : "Your Daily Rhythm (35 min/day)"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "Todo el sistema funciona en menos de 35 minutos al día. La constancia supera a la intensidad — las pequeñas acciones diarias se acumulan."
            : "The whole system works in under 35 minutes a day. Consistency beats intensity \u2014 daily small actions compound."}
        </p>

        <div className="space-y-3">
          <RhythmStep
            time={isEs ? "Mañana (2 min)" : "Morning (2 min)"}
            action={
              isEs
                ? "Abre tu panel. Lee los nudges de coaching — te dicen qué necesita atención según tus datos reales (deals sin actividad, días sin outreach, áreas de evaluación débiles)."
                : "Open your dashboard. Read the coaching nudges \u2014 they tell you what needs attention based on your actual data (stale deals, missed outreach days, weak assessment areas)."
            }
          />
          <RhythmStep
            time={isEs ? "Bloque de enfoque (20-30 min)" : "Focus block (20-30 min)"}
            action={
              isEs
                ? "Completa 1 lección en tu curso actual. La sección 'Qué Hacer a Continuación' te dice exactamente cuál según tus brechas de evaluación. No saltes los ejercicios — construyen tu playbook."
                : "Complete 1 lesson in your current course. The \u2018What to Do Next\u2019 section tells you exactly which one based on your assessment gaps. Don\u2019t skip the exercises \u2014 they build your playbook."
            }
          />
          <RhythmStep
            time={isEs ? "Después del outreach (2 min)" : "After outreach (2 min)"}
            action={
              isEs
                ? "¿Enviaste emails, DMs o hiciste llamadas hoy? Regístralos en el Registro de Outreach. ¿Avanzaste un deal? Actualiza el Pipeline board. Esto toma 2 minutos y hace que tus analíticas tengan sentido."
                : "Did you send emails, DMs, or make calls today? Log them in the Outreach Log. Moved a deal forward? Update the Pipeline board. This takes 2 minutes and makes your analytics meaningful."
            }
          />
          <RhythmStep
            time={isEs ? "Semanal (15 min)" : "Weekly (15 min)"}
            action={
              isEs
                ? "Revisa tus puntajes de Salud de Adquisición — ¿están subiendo? Abre un artefacto en tu Playbook y refínalo según lo que aprendiste esta semana. Haz un Sales Roleplay para mantener tus habilidades afiladas."
                : "Review your Acquisition Health scores \u2014 are they going up? Open one artifact in your Playbook and refine it based on what you learned this week. Do one Sales Roleplay to keep your skills sharp."
            }
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 12: MAXIMIZING YOUR RESULTS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="maximize" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Maximiza tus Resultados" : "Maximizing Your Results"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "Quienes más aprovechan el OS comparten estos hábitos:"
            : "Users who get the most from the OS share these habits:"}
        </p>

        <div className="space-y-4">
          <DetailCard
            title={
              isEs
                ? "Usa el coach AI como un colega, no como un buscador"
                : "Use the AI coach like a colleague, not a search engine"
            }
            content={
              isEs
                ? "No solo preguntes '¿qué es el posicionamiento?' — pregunta 'revisa mi declaración de posicionamiento para [tu producto] dirigida a [tu ICP] y dime qué le falta.' Mientras más específicas y contextuales sean tus preguntas, mejor el consejo. El coach ya conoce tu negocio — aprovéchalo."
                : "Don\u2019t just ask \u2018what is positioning?\u2019 \u2014 ask \u2018review my positioning statement for [your product] targeting [your ICP] and tell me what\u2019s missing.\u2019 The more specific and contextual your questions, the better the advice. The coach already knows your business \u2014 lean into that."
            }
          />
          <DetailCard
            title={
              isEs
                ? "Haz los ejercicios, no solo leas"
                : "Do the exercises, don\u2019t just read"
            }
            content={
              isEs
                ? "Las lecciones que construyen artefactos del playbook son la actividad de mayor apalancamiento en el OS. Un documento de ICP completado, una secuencia de email o un playbook de discovery valen más que leer 10 lecciones. Los ejercicios son el producto."
                : "The lessons that build playbook artifacts are the highest-leverage activity in the OS. A completed ICP document, email sequence, or discovery playbook is worth more than reading 10 lessons. The exercises are the product."
            }
          />
          <DetailCard
            title={
              isEs
                ? "Registra tu outreach con disciplina"
                : "Log your outreach religiously"
            }
            content={
              isEs
                ? "Aunque sean solo 2-3 emails al día. Los datos se acumulan. Después de algunas semanas, verás qué canales generan respuestas, qué mensajería resuena y dónde se estancan los deals. Sin registrar, el coach AI y las analíticas no tienen nada con qué trabajar."
                : "Even if it\u2019s just 2-3 emails a day. The data compounds. After a few weeks, you\u2019ll see which channels get responses, which messaging resonates, and where deals stall. Without logging, the AI coach and analytics have nothing to work with."
            }
          />
          <DetailCard
            title={
              isEs
                ? "Haz roleplay antes de llamadas reales"
                : "Roleplay before real calls"
            }
            content={
              isEs
                ? "Practicar una discovery call contra un buyer AI de tipo D (Dominante) antes de hacerla de verdad mejora dramáticamente tu confianza y técnica. La calificación te muestra exactamente dónde eres más débil."
                : "Practicing a discovery call against a D-type (Dominant) AI buyer before doing one for real dramatically improves your confidence and technique. The scoring shows you exactly where you\u2019re weak."
            }
          />
          <DetailCard
            title={
              isEs
                ? "Revisita y actualiza tu perfil"
                : "Revisit and update your profile"
            }
            content={
              isEs
                ? "Tu negocio evoluciona. Si tu ICP cambia, tu precio se ajusta o aprendes algo que cambia tu enfoque, actualiza tu cuestionario y vuelve a ejecutar la evaluación. Todo lo que viene después — coaching, recomendaciones, prioridad del currículo — se ajusta automáticamente."
                : "Your business evolves. If your ICP changes, your pricing shifts, or you learn something that changes your approach, update your questionnaire and re-run the assessment. Everything downstream \u2014 coaching, recommendations, curriculum priority \u2014 adjusts automatically."
            }
          />
          <DetailCard
            title={isEs ? "Conecta tus herramientas" : "Connect your tools"}
            content={
              isEs
                ? "El OS se vuelve dramáticamente más útil cuando tu CRM está sincronizado y tus artefactos del playbook están en Notion. Toma 5 minutos configurarlo y te ahorra cambiar de contexto cada día. Ve a Configuración > Apps Conectadas."
                : "The OS becomes dramatically more useful when your CRM is synced and your playbook artifacts are in Notion. It takes 5 minutes to set up and saves you context-switching every day. Go to Settings > Connected Apps."
            }
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 13: WHAT THIS REPLACES
      ═══════════════════════════════════════════════════════════════ */}
      <section id="replaces" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Lo que Reemplaza" : "What This Replaces"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "El OS consolida lo que de otro modo serían 5-6 herramientas y servicios separados."
            : "The OS consolidates what would otherwise be 5-6 separate tools and services."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-red-800 dark:text-red-300 mb-3">
              {isEs ? "Sin el OS" : "Without the OS"}
            </h3>
            <ul className="text-sm text-red-700 dark:text-red-400 space-y-2">
              {isEs ? (
                <>
                  <li>&bull; Ves cursos, los olvidas la semana siguiente</li>
                  <li>&bull; Sin sistema para rastrear outreach o pipeline</li>
                  <li>&bull; Improvisar en llamadas de ventas</li>
                  <li>&bull; Consejos genéricos de ChatGPT que no conocen tu negocio</li>
                  <li>&bull; Sin idea de si estás mejorando ni dónde están tus brechas</li>
                  <li>&bull; Notas, plantillas y playbooks dispersos en 5 apps</li>
                  <li>&bull; Pagar por cursos + CRM + coaching + herramientas AI por separado</li>
                </>
              ) : (
                <>
                  <li>&bull; Watch courses, forget by next week</li>
                  <li>&bull; No system for tracking outreach or pipeline</li>
                  <li>&bull; Wing it on sales calls</li>
                  <li>
                    &bull; Generic ChatGPT advice that doesn&apos;t know your business
                  </li>
                  <li>
                    &bull; No idea if you&apos;re improving or where your gaps are
                  </li>
                  <li>
                    &bull; Notes, templates, and playbooks scattered across 5 apps
                  </li>
                  <li>
                    &bull; Pay for courses + CRM + coaching + AI tools separately
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-green-800 dark:text-green-300 mb-3">
              {isEs ? "Con el OS" : "With the OS"}
            </h3>
            <ul className="text-sm text-green-700 dark:text-green-400 space-y-2">
              {isEs ? (
                <>
                  <li>&bull; Aprendes y aplicas de inmediato en ejercicios prácticos</li>
                  <li>&bull; Registro de outreach y pipeline integrados</li>
                  <li>&bull; Practicas contra buyer personas de IA antes de llamadas reales</li>
                  <li>&bull; Coach AI que conoce tu ICP, pipeline y brechas</li>
                  <li>&bull; Puntajes de preparación en 5 dimensiones rastreados en el tiempo</li>
                  <li>&bull; Un sistema: aprender, construir, ejecutar, medir, conectar</li>
                  <li>&bull; Una suscripción reemplaza todo el stack</li>
                </>
              ) : (
                <>
                  <li>&bull; Learn then immediately apply in hands-on exercises</li>
                  <li>&bull; Built-in outreach log and pipeline board</li>
                  <li>
                    &bull; Practice against AI buyer personas before real calls
                  </li>
                  <li>&bull; AI coach that knows your ICP, pipeline, and gaps</li>
                  <li>&bull; 5-dimension readiness scores tracked over time</li>
                  <li>
                    &bull; One system: learn, build, execute, measure, connect
                  </li>
                  <li>&bull; One subscription replaces the whole stack</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 14: UPDATING YOUR PROFILE
      ═══════════════════════════════════════════════════════════════ */}
      <section id="profile" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs
            ? "Actualizar tu Perfil y Evaluación"
            : "Updating Your Profile & Assessment"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {isEs
            ? "Tu negocio evoluciona. El OS debe evolucionar contigo. Puedes actualizar tu perfil y volver a ejecutar tu evaluación en cualquier momento — el currículo de IA, el coaching y las recomendaciones se ajustarán automáticamente."
            : "Your business evolves. The OS should evolve with it. You can update your profile and re-run your assessment at any time \u2014 the AI curriculum, coaching, and recommendations will adjust automatically."}
        </p>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
              {isEs ? "Cuándo actualizar" : "When to update"}
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
              {isEs ? (
                <>
                  <li>&bull; Tu cliente objetivo cambió (diferente ICP, industria o tamaño de deal)</li>
                  <li>&bull; Tu modelo de negocio evolucionó (p. ej., de servicios a SaaS)</li>
                  <li>&bull; Llenaste el cuestionario rápido y quieres dar mejores respuestas</li>
                  <li>&bull; Quieres que la IA recalcule tus puntajes de preparación con nuevos datos</li>
                  <li>&bull; Han pasado 2+ meses y tus prioridades cambiaron</li>
                </>
              ) : (
                <>
                  <li>
                    &bull; Your target customer has changed (different ICP, industry, or deal size)
                  </li>
                  <li>
                    &bull; Your business model evolved (e.g., from services to SaaS)
                  </li>
                  <li>
                    &bull; You rushed through the questionnaire and want to give better answers
                  </li>
                  <li>
                    &bull; You want the AI to recalculate your readiness scores based on new data
                  </li>
                  <li>
                    &bull; It&apos;s been 2+ months and your priorities shifted
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/onboarding/questionnaire"
              className="btn bg-primary-500 text-white hover:bg-primary-600 text-sm px-5"
            >
              {isEs ? "Actualizar Cuestionario" : "Update Questionnaire"}
            </Link>
            <Link
              href="/onboarding/analyzing"
              className="btn bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 text-sm px-5"
            >
              {isEs ? "Volver a Ejecutar Evaluación" : "Re-run Assessment"}
            </Link>
            <Link
              href="/settings/account"
              className="btn bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 text-sm px-5"
            >
              {isEs ? "Configuración de Cuenta" : "Account Settings"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER CTA
      ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/30 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          {isEs ? "¿Listo para empezar?" : "Ready to go?"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          {isEs
            ? "Tu panel muestra tu próxima acción recomendada según tu evaluación de preparación. Empieza por ahí. El sistema se adapta a ti a medida que lo usas."
            : "Your dashboard shows your recommended next action based on your readiness assessment. Start there. The system adapts to you as you use it."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="btn bg-primary-500 text-white hover:bg-primary-600 px-6"
          >
            {isEs ? "Ir al Panel" : "Go to Dashboard"}
          </Link>
          <Link
            href="/academy"
            className="btn bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 px-6"
          >
            {isEs ? "Ver Cursos" : "Browse Courses"}
          </Link>
          <Link
            href="/settings/apps"
            className="btn bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 px-6"
          >
            {isEs ? "Configurar Integraciones" : "Set Up Integrations"}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════════════ */

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <svg
        className="w-4 h-4 text-primary-500 shrink-0 mt-0.5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm text-gray-700 dark:text-gray-200">{text}</span>
    </div>
  );
}

function StartStep({
  number,
  title,
  description,
  href,
  linkText,
}: {
  number: number;
  title: string;
  description: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl px-5 py-4 flex items-start gap-4">
      <span className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
        {number}
      </span>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
          {description}
        </p>
        <Link
          href={href}
          className="text-xs font-medium text-primary-500 hover:text-primary-600"
        >
          {linkText} &rarr;
        </Link>
      </div>
    </div>
  );
}

function DetailCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl px-5 py-4">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {content}
      </p>
    </div>
  );
}

function RhythmStep({ time, action }: { time: string; action: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700/60 px-5 py-4 flex items-start gap-4">
      <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-2" />
      <div>
        <div className="text-sm font-bold text-gray-800 dark:text-gray-100">
          {time}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {action}
        </div>
      </div>
    </div>
  );
}
