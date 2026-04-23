/**
 * Tiered outreach channel configuration for LatAm-first GTM OS.
 *
 * Per research (Prompt A2): WhatsApp is the primary sales channel in LatAm
 * (62-80% of users communicate with businesses through it).
 * Instagram is the top social-to-WhatsApp bridge.
 * Email remains important for B2B but is secondary to conversational channels.
 */

import type { OutreachChannel } from "@/types/execute";

export interface ChannelConfig {
  id: OutreachChannel;
  /** i18n key under the "outreach" namespace */
  translationKey: string;
  icon: string;
  tier: 1 | 2 | 3;
  brandColor: string;
}

/**
 * Tier 1: Always visible — primary LatAm channels
 * Tier 2: Collapsible — supplementary channels
 * Tier 3: Collapsed under "Other" — secondary channels
 */
export const OUTREACH_CHANNELS: ChannelConfig[] = [
  // Tier 1 — always visible
  {
    id: "whatsapp",
    translationKey: "channelWhatsapp",
    icon: "MessageCircle",
    tier: 1,
    brandColor: "#25D366",
  },
  {
    id: "instagram_dm",
    translationKey: "channelInstagramDm",
    icon: "Camera",
    tier: 1,
    brandColor: "#E4405F",
  },
  {
    id: "email",
    translationKey: "channelEmail",
    icon: "Mail",
    tier: 1,
    brandColor: "#6366F1",
  },

  // Tier 2 — collapsible
  {
    id: "phone",
    translationKey: "channelPhone",
    icon: "Phone",
    tier: 2,
    brandColor: "#10B981",
  },
  {
    id: "linkedin",
    translationKey: "channelLinkedin",
    icon: "Linkedin",
    tier: 2,
    brandColor: "#0A66C2",
  },
  {
    id: "event",
    translationKey: "channelEvent",
    icon: "Calendar",
    tier: 2,
    brandColor: "#F59E0B",
  },

  // Tier 3 — collapsed under "Other"
  {
    id: "facebook_messenger",
    translationKey: "channelFacebookMessenger",
    icon: "MessageSquare",
    tier: 3,
    brandColor: "#0084FF",
  },
  {
    id: "twitter",
    translationKey: "channelTwitter",
    icon: "Twitter",
    tier: 3,
    brandColor: "#1DA1F2",
  },
  {
    id: "sms",
    translationKey: "channelSms",
    icon: "Smartphone",
    tier: 3,
    brandColor: "#8B5CF6",
  },
  {
    id: "other",
    translationKey: "channelOther",
    icon: "MoreHorizontal",
    tier: 3,
    brandColor: "#6B7280",
  },
];

export const CHANNELS_BY_TIER = {
  1: OUTREACH_CHANNELS.filter((c) => c.tier === 1),
  2: OUTREACH_CHANNELS.filter((c) => c.tier === 2),
  3: OUTREACH_CHANNELS.filter((c) => c.tier === 3),
} as const;

/** Get channel config by ID */
export function getChannelConfig(
  channelId: OutreachChannel
): ChannelConfig | undefined {
  return OUTREACH_CHANNELS.find((c) => c.id === channelId);
}
