import type { BadgeTier, BadgeCategory } from "@/types/profile";

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  tier: BadgeTier;
  category: BadgeCategory;
  icon: string; // emoji for now, can be replaced with SVG paths
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // ─── Milestone badges ───
  {
    id: "first-lesson",
    name: "First Steps",
    description: "Complete your first lesson",
    tier: "bronze",
    category: "milestone",
    icon: "👣",
  },
  {
    id: "course-complete-1",
    name: "Foundation Layer",
    description: "Complete your first course",
    tier: "silver",
    category: "milestone",
    icon: "🏗️",
  },
  {
    id: "track-complete-1",
    name: "Track Master",
    description: "Complete an entire track",
    tier: "gold",
    category: "milestone",
    icon: "🏆",
  },
  {
    id: "halfway",
    name: "Halfway There",
    description: "Complete 24 of 48 courses",
    tier: "gold",
    category: "milestone",
    icon: "⚡",
  },
  {
    id: "academy-graduate",
    name: "OS Graduate",
    description: "Complete all courses",
    tier: "platinum",
    category: "milestone",
    icon: "🎓",
  },

  // ─── Streak badges ───
  {
    id: "streak-3",
    name: "Getting Going",
    description: "3-day learning streak",
    tier: "bronze",
    category: "streak",
    icon: "🔥",
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "7-day learning streak",
    tier: "silver",
    category: "streak",
    icon: "🔥",
  },
  {
    id: "streak-14",
    name: "Two-Week Titan",
    description: "14-day learning streak",
    tier: "gold",
    category: "streak",
    icon: "🔥",
  },
  {
    id: "streak-30",
    name: "Month of Mastery",
    description: "30-day learning streak",
    tier: "platinum",
    category: "streak",
    icon: "🔥",
  },

  // ─── XP Level badges ───
  {
    id: "xp-100",
    name: "Novice Seller",
    description: "Earn 100 XP",
    tier: "bronze",
    category: "xp",
    icon: "⭐",
  },
  {
    id: "xp-500",
    name: "Apprentice",
    description: "Earn 500 XP",
    tier: "silver",
    category: "xp",
    icon: "⭐",
  },
  {
    id: "xp-1000",
    name: "Journeyman",
    description: "Earn 1,000 XP",
    tier: "silver",
    category: "xp",
    icon: "⭐",
  },
  {
    id: "xp-2500",
    name: "Expert",
    description: "Earn 2,500 XP",
    tier: "gold",
    category: "xp",
    icon: "⭐",
  },
  {
    id: "xp-5000",
    name: "Master Closer",
    description: "Earn 5,000 XP",
    tier: "platinum",
    category: "xp",
    icon: "⭐",
  },

  // ─── Artifact badges ───
  {
    id: "first-artifact",
    name: "Builder",
    description: "Create your first business artifact",
    tier: "bronze",
    category: "artifact",
    icon: "🛠️",
  },
  {
    id: "icp-complete",
    name: "ICP Architect",
    description: "Complete your ICP Document",
    tier: "silver",
    category: "artifact",
    icon: "🎯",
  },
  {
    id: "playbook-50",
    name: "Half a Playbook",
    description: "Complete 5 of 10 artifacts",
    tier: "gold",
    category: "artifact",
    icon: "📋",
  },
  {
    id: "playbook-complete",
    name: "Playbook Master",
    description: "Complete all 10 artifacts",
    tier: "platinum",
    category: "artifact",
    icon: "📖",
  },

  // ─── Roleplay badges ───
  {
    id: "roleplay-first",
    name: "First Pitch",
    description: "Complete your first roleplay session",
    tier: "bronze",
    category: "roleplay",
    icon: "🎭",
  },
  {
    id: "roleplay-ace",
    name: "Sales Ace",
    description: "Score 90+ on a roleplay",
    tier: "gold",
    category: "roleplay",
    icon: "🃏",
  },
  {
    id: "roleplay-10",
    name: "Practice Pro",
    description: "Complete 10 roleplay sessions",
    tier: "silver",
    category: "roleplay",
    icon: "🎯",
  },

  // ─── Community badges ───
  {
    id: "first-post",
    name: "Voice Found",
    description: "Create your first community post",
    tier: "bronze",
    category: "community",
    icon: "💬",
  },
  {
    id: "helpful-5",
    name: "Helpful Hand",
    description: "Receive 5 upvotes on forum posts",
    tier: "silver",
    category: "community",
    icon: "🤝",
  },
];

export const BADGE_MAP = new Map(BADGE_DEFINITIONS.map((b) => [b.id, b]));

export function getBadgeDefinition(id: string): BadgeDefinition | undefined {
  return BADGE_MAP.get(id);
}

export function getBadgesByCategory(
  category: BadgeCategory,
): BadgeDefinition[] {
  return BADGE_DEFINITIONS.filter((b) => b.category === category);
}

export const TIER_ORDER: Record<BadgeTier, number> = {
  bronze: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
};
