/**
 * Bot account definitions for the cohort forum system.
 * UIDs are populated after initial setup via POST /api/admin/forum-setup.
 */

export interface ForumBot {
  id: string;
  username: string;
  email: string;
  role: string;
  discType: 'D' | 'I' | 'S' | 'C' | null;
  badge: string;
  badgeColor: string;
}

export const FORUM_BOTS: ForumBot[] = [
  {
    id: 'facilitator',
    username: 'facilitator-bot',
    email: 'facilitator@soloframehub.com',
    role: 'AI Pod Coach',
    discType: null,
    badge: 'AI Pod Coach',
    badgeColor: 'orange',
  },
  {
    id: 'alex-skeptic',
    username: 'alex-skeptic-bot',
    email: 'alex@soloframehub.com',
    role: 'Skeptical Challenger',
    discType: 'D',
    badge: 'AI Skeptic Closer',
    badgeColor: 'blue',
  },
  {
    id: 'jordan-builder',
    username: 'jordan-builder-bot',
    email: 'jordan@soloframehub.com',
    role: 'Relationship Builder',
    discType: 'I',
    badge: 'AI Relationship Builder',
    badgeColor: 'green',
  },
  {
    id: 'morgan-perfectionist',
    username: 'morgan-perfectionist-bot',
    email: 'morgan@soloframehub.com',
    role: 'Process Expert',
    discType: 'C',
    badge: 'AI Process Expert',
    badgeColor: 'purple',
  },
  {
    id: 'sam-mentor',
    username: 'sam-mentor-bot',
    email: 'sam@soloframehub.com',
    role: 'Supportive Mentor',
    discType: 'S',
    badge: 'AI Supportive Mentor',
    badgeColor: 'gold',
  },
];

/** Get a bot definition by its id (e.g. 'alex-skeptic') */
export function getBot(botId: string): ForumBot | undefined {
  return FORUM_BOTS.find((b) => b.id === botId);
}

/** Get the facilitator bot */
export function getFacilitatorBot(): ForumBot {
  return FORUM_BOTS[0];
}

/** Get all persona bots (excludes the facilitator) */
export function getPersonaBots(): ForumBot[] {
  return FORUM_BOTS.filter((b) => b.id !== 'facilitator');
}
