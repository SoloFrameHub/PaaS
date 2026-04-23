import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import {
  BADGE_DEFINITIONS,
  TIER_ORDER,
  type BadgeDefinition,
} from "@/lib/data/badges";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import type { BadgeEarned, BadgeCategory } from "@/types/profile";

export const metadata = {
  title: "Badge Collection - SoloFrameHub",
  description: "View all badges you can earn in the Solo GTM OS",
};

const TIER_COLORS = {
  bronze: "from-amber-600 to-amber-800",
  silver: "from-gray-300 to-gray-500",
  gold: "from-yellow-400 to-amber-500",
  platinum: "from-indigo-400 to-purple-500",
} as const;

const TIER_BORDER = {
  bronze: "border-amber-300 dark:border-amber-600/40",
  silver: "border-gray-300 dark:border-gray-500/40",
  gold: "border-yellow-300 dark:border-yellow-500/40",
  platinum: "border-indigo-300 dark:border-purple-500/40",
} as const;

const CATEGORY_LABELS_EN: Record<
  BadgeCategory,
  { label: string; description: string }
> = {
  milestone: {
    label: "Milestones",
    description: "Hit key learning milestones",
  },
  streak: { label: "Streaks", description: "Build consistent learning habits" },
  xp: { label: "Experience", description: "Accumulate XP across the academy" },
  artifact: {
    label: "Artifacts",
    description: "Build real business artifacts",
  },
  roleplay: { label: "Roleplay", description: "Practice sales conversations" },
  community: { label: "Community", description: "Engage with fellow founders" },
};

const CATEGORY_LABELS_ES: Record<
  BadgeCategory,
  { label: string; description: string }
> = {
  milestone: {
    label: "Hitos",
    description: "Alcanza hitos clave de aprendizaje",
  },
  streak: { label: "Rachas", description: "Construye hábitos de aprendizaje consistentes" },
  xp: { label: "Experiencia", description: "Acumula XP en toda la academia" },
  artifact: {
    label: "Artefactos",
    description: "Construye artefactos reales de negocio",
  },
  roleplay: { label: "Roleplay", description: "Practica conversaciones de ventas" },
  community: { label: "Comunidad", description: "Conecta con otros fundadores" },
};

const CATEGORY_ORDER: BadgeCategory[] = [
  "milestone",
  "streak",
  "xp",
  "artifact",
  "roleplay",
  "community",
];

export default async function BadgesPage() {
  const { user, profile } = await getAuthContext();

  if (!user) redirect("/signin");
  if (!profile) redirect("/onboarding/welcome");

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== "active") redirect("/subscribe");

  const locale = await getLocale();
  const isEs = locale === "es";
  const CATEGORY_LABELS = isEs ? CATEGORY_LABELS_ES : CATEGORY_LABELS_EN;

  const earnedBadges = profile.progress?.badges || [];
  const earnedIds = new Set(earnedBadges.map((b: BadgeEarned) => b.id));
  const earnedMap = new Map(earnedBadges.map((b: BadgeEarned) => [b.id, b]));

  // Group badges by category
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    ...CATEGORY_LABELS[cat],
    badges: BADGE_DEFINITIONS.filter((b) => b.category === cat).sort(
      (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
    ),
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-primary-500 hover:text-primary-600 font-semibold mb-2 inline-block"
        >
          ← {isEs ? "Volver al panel" : "Back to Dashboard"}
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {isEs ? "Colección de insignias" : "Badge Collection"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {isEs
            ? `${earnedBadges.length} de ${BADGE_DEFINITIONS.length} insignias obtenidas. ¡Sigue aprendiendo para desbloquearlas todas!`
            : `${earnedBadges.length} of ${BADGE_DEFINITIONS.length} badges earned. Keep learning to unlock them all!`}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-6 mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500 dark:text-gray-400 font-semibold">
            {isEs ? "Progreso de colección" : "Collection Progress"}
          </span>
          <span className="font-bold text-gray-800 dark:text-gray-100">
            {Math.round((earnedBadges.length / BADGE_DEFINITIONS.length) * 100)}
            %
          </span>
        </div>
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full transition-all duration-1000"
            style={{
              width: `${(earnedBadges.length / BADGE_DEFINITIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Badge Categories */}
      <div className="space-y-8">
        {grouped.map(({ category, label, description, badges }) => (
          <div
            key={category}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-b border-gray-100 dark:border-gray-700/60">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {label}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {badges.map((badge) => {
                  const isEarned = earnedIds.has(badge.id);
                  const earned = earnedMap.get(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`flex flex-col items-center text-center p-4 rounded-xl border ${
                        isEarned
                          ? TIER_BORDER[badge.tier] +
                            " bg-gray-50 dark:bg-gray-700/20"
                          : "border-gray-100 dark:border-gray-700/40 opacity-40"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 border-2 ${
                          isEarned
                            ? TIER_BORDER[badge.tier]
                            : "border-gray-200 dark:border-gray-700"
                        } ${isEarned ? "bg-gradient-to-br " + TIER_COLORS[badge.tier] : "bg-gray-100 dark:bg-gray-700"}`}
                      >
                        <span
                          className={`text-2xl ${isEarned ? "" : "grayscale"}`}
                        >
                          {badge.icon}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">
                        {badge.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {badge.description}
                      </p>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          isEarned ? "text-primary-500" : "text-gray-400"
                        }`}
                      >
                        {isEarned && earned
                          ? new Date(earned.earnedAt).toLocaleDateString()
                          : badge.tier}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
