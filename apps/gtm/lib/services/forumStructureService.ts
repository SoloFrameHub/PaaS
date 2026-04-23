/**
 * Forum Structure Service
 * Manages the NodeBB category hierarchy, bot accounts, and pod category lifecycle.
 */

import { nodebbClient } from "@/lib/nodebb/client";
import { FORUM_BOTS } from "@/lib/data/forum-bots";
import { logger } from "@/lib/logger";
import crypto from "crypto";

// ── Category hierarchy definition ────────────────────────────────────

interface CategoryDef {
  name: string;
  description: string;
  children?: CategoryDef[];
}

const FORUM_STRUCTURE: Record<string, CategoryDef> = {
  academyWide: {
    name: "Community-Wide",
    description: "Announcements and open discussions for all community members",
    children: [
      {
        name: "Announcements",
        description: "Official updates from the SoloFrameHub team",
      },
      {
        name: "Wins & Celebrations",
        description: "Share your victories, big and small",
      },
      {
        name: "General Discussion",
        description: "Open discussion for all community members",
      },
    ],
  },
  pods: {
    name: "Pods",
    description: "Private peer group categories (auto-created per pod)",
  },
  courseDiscussions: {
    name: "Course Discussions",
    description: "Discuss courses by curriculum section",
    children: [
      {
        name: "Foundation",
        description:
          "Sales psychology, ICP building, positioning (Courses 1-3)",
      },
      {
        name: "Lead Generation",
        description: "Cold email, LinkedIn, list building (Courses 4-7)",
      },
      {
        name: "Sales Conversations",
        description: "Discovery, objections, closing (Courses 8-10)",
      },
    ],
  },
  resources: {
    name: "Resources",
    description: "Shared templates, tools, and reading material",
    children: [
      {
        name: "Templates & Scripts",
        description: "Share and improve sales templates",
      },
      {
        name: "Tool Recommendations",
        description: "Tools that work for solo founders",
      },
      {
        name: "Book Club",
        description: "Reading discussions and recommendations",
      },
    ],
  },
};

// ── Service ──────────────────────────────────────────────────────────

export class ForumStructureService {
  /**
   * One-time setup: creates the full category hierarchy + bot accounts.
   * Safe to call multiple times (checks for existing categories/users).
   */
  async setupFullStructure(): Promise<{
    categories: Record<string, number>;
    bots: Record<string, number>;
  }> {
    logger.info("Setting up forum structure...");
    const categories = await this.createCategoryHierarchy();
    const bots = await this.createBotAccounts();
    logger.info("Forum structure setup complete", { categories, bots });
    return { categories, bots };
  }

  /**
   * Creates all top-level and child categories.
   * Returns a flat map of category name -> cid.
   */
  async createCategoryHierarchy(): Promise<Record<string, number>> {
    const cidMap: Record<string, number> = {};
    let order = 1;

    for (const [key, def] of Object.entries(FORUM_STRUCTURE)) {
      try {
        const parent = await nodebbClient.createCategory({
          name: def.name,
          description: def.description,
          order: order++,
        });
        cidMap[def.name] = parent.cid;
        logger.info(`Created category: ${def.name} (cid: ${parent.cid})`);

        if (def.children) {
          let childOrder = 1;
          for (const child of def.children) {
            const childCat = await nodebbClient.createCategory({
              name: child.name,
              description: child.description,
              parentCid: parent.cid,
              order: childOrder++,
            });
            cidMap[child.name] = childCat.cid;
            logger.info(
              `  Created sub-category: ${child.name} (cid: ${childCat.cid})`,
            );
          }
        }
      } catch (err) {
        logger.error(`Failed to create category: ${def.name}`, { err });
      }
    }

    return cidMap;
  }

  /**
   * Creates bot user accounts on NodeBB.
   * Returns a map of bot id -> NodeBB uid.
   */
  async createBotAccounts(): Promise<Record<string, number>> {
    const uidMap: Record<string, number> = {};

    for (const bot of FORUM_BOTS) {
      try {
        // Check if user already exists
        const existing = await nodebbClient.getUserByUsername(bot.username);
        if (existing) {
          uidMap[bot.id] = existing.uid;
          logger.info(
            `Bot already exists: ${bot.username} (uid: ${existing.uid})`,
          );
          continue;
        }

        const password = crypto.randomBytes(24).toString("hex");
        const user = await nodebbClient.createUser({
          username: bot.username,
          email: bot.email,
          password,
        });
        uidMap[bot.id] = user.uid;
        logger.info(`Created bot: ${bot.username} (uid: ${user.uid})`);
      } catch (err) {
        logger.error(`Failed to create bot: ${bot.username}`, { err });
      }
    }

    return uidMap;
  }

  /**
   * Creates a private pod category under the "Pods" parent.
   * Returns the new category's cid.
   */
  async createPodCategory(
    podName: string,
    podsParentCid: number,
  ): Promise<number> {
    const category = await nodebbClient.createCategory({
      name: podName,
      description: `Private pod: ${podName}`,
      parentCid: podsParentCid,
    });

    // Make it private: revoke default read access for registered-users
    try {
      await nodebbClient.setCategoryPrivilege(
        category.cid,
        "groups:find",
        "registered-users",
        false,
      );
      await nodebbClient.setCategoryPrivilege(
        category.cid,
        "groups:read",
        "registered-users",
        false,
      );
      await nodebbClient.setCategoryPrivilege(
        category.cid,
        "groups:topics:create",
        "registered-users",
        false,
      );
      await nodebbClient.setCategoryPrivilege(
        category.cid,
        "groups:topics:reply",
        "registered-users",
        false,
      );
    } catch (err) {
      logger.warn(
        `Could not set private privileges for pod category ${category.cid}`,
        { err },
      );
    }

    logger.info(`Created pod category: ${podName} (cid: ${category.cid})`);
    return category.cid;
  }

  /**
   * Creates initial pinned topics in a pod category.
   * Uses the facilitator bot UID.
   */
  async createPodSubThreads(
    podCid: number,
    facilitatorUid: number,
  ): Promise<void> {
    const threads = [
      {
        title: "Introductions - Tell Us About Yourself",
        content:
          "Welcome to the pod! Share a bit about yourself, your business, and what you hope to get from this group.\n\n- What do you sell?\n- Who is your ideal customer?\n- What is your biggest challenge right now?",
      },
      {
        title: "Wins & Progress",
        content:
          "Share your wins here - big or small. Closed a deal? Got a meeting? Finished a course? Let the pod know!",
      },
      {
        title: "Resource Sharing",
        content:
          "Found a great template, tool, or article? Share it here for the pod.",
      },
    ];

    for (const thread of threads) {
      try {
        const topic = await nodebbClient.createTopic({
          cid: podCid,
          title: thread.title,
          content: thread.content,
          _uid: facilitatorUid,
        });
        await nodebbClient.pinTopic(topic.tid);
        logger.info(`Created pod thread: ${thread.title} (tid: ${topic.tid})`);
      } catch (err) {
        logger.error(`Failed to create pod thread: ${thread.title}`, { err });
      }
    }
  }

  /**
   * Grants a user read/write access to a pod's private category.
   */
  async grantPodAccess(podCid: number, userUid: number): Promise<void> {
    await nodebbClient.grantUserCategoryAccess(podCid, userUid);
    logger.info(`Granted pod access`, { podCid, userUid });
  }

  /**
   * Revokes a user's access to a pod's private category.
   */
  async revokePodAccess(podCid: number, userUid: number): Promise<void> {
    await nodebbClient.revokeUserCategoryAccess(podCid, userUid);
    logger.info(`Revoked pod access`, { podCid, userUid });
  }
}

export const forumStructureService = new ForumStructureService();
