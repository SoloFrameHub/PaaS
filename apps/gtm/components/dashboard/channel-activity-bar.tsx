"use client";

import { getChannelConfig } from "@/lib/data/outreach-channels";
import type { ChannelActivity } from "@/lib/services/pipelineService";

interface ChannelActivityBarProps {
  activities: ChannelActivity[];
}

/** Recency color: green <48h, yellow 3-7d, red 8+d */
function getRecencyColor(lastContact: string): string {
  const hoursAgo =
    (Date.now() - new Date(lastContact).getTime()) / (1000 * 60 * 60);
  if (hoursAgo < 48) return "#10B981"; // green
  if (hoursAgo < 168) return "#F59E0B"; // yellow (7 days)
  return "#EF4444"; // red
}

const CHANNEL_ICONS: Record<string, string> = {
  whatsapp: "💬",
  email: "✉️",
  phone: "📞",
  event: "🤝",
  linkedin: "🔗",
  instagram_dm: "📷",
  facebook_messenger: "💭",
  twitter: "🐦",
  sms: "📱",
};

export function ChannelActivityBar({ activities }: ChannelActivityBarProps) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {activities.map((a) => {
        const config = getChannelConfig(a.channel as never);
        const color = getRecencyColor(a.lastContact);
        const icon = CHANNEL_ICONS[a.channel] || "📌";

        return (
          <span
            key={a.channel}
            title={`${a.channel}: ${new Date(a.lastContact).toLocaleDateString()}`}
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs border-2"
            style={{ borderColor: color }}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}
