/**
 * Community Service — NodeBB API Proxy
 *
 * Wraps NodeBB Read/Write API and transforms responses into
 * shapes consumed by the Cruip Mosaic feed/forum components.
 */

const NODEBB_URL =
  process.env.NEXT_PUBLIC_FORUM_URL || "https://ai-caa-forum.soloframehub.com";
const NODEBB_API_KEY = process.env.NODEBB_API_KEY || "";

// ── Types ───────────────────────────────────────────────────────────

export interface FeedPost {
  tid: number;
  title: string;
  content: string; // HTML
  contentRaw: string;
  author: {
    uid: number;
    username: string;
    displayname: string;
    picture: string | null;
    iconBgColor: string;
    iconText: string;
  };
  timestamp: number;
  timestampISO: string;
  likes: number;
  votes: number;
  postCount: number;
  viewCount: number;
  category: {
    cid: number;
    name: string;
    slug: string;
  };
  mainPid: number;
  slug: string;
}

export interface ForumCategory {
  cid: number;
  name: string;
  description: string;
  slug: string;
  icon: string;
  bgColor: string;
  color: string;
  topicCount: number;
  postCount: number;
  children: ForumCategory[];
}

export interface TopicPost {
  pid: number;
  content: string; // HTML
  contentRaw: string;
  author: {
    uid: number;
    username: string;
    displayname: string;
    picture: string | null;
    iconBgColor: string;
    iconText: string;
  };
  timestamp: number;
  timestampISO: string;
  votes: number;
  upvotes: number;
  downvotes: number;
  isMainPost: boolean;
  index: number;
}

export interface TopicDetail {
  tid: number;
  title: string;
  slug: string;
  category: {
    cid: number;
    name: string;
    slug: string;
  };
  posts: TopicPost[];
  postCount: number;
  viewCount: number;
  votes: number;
  timestamp: number;
  timestampISO: string;
  locked: boolean;
  deleted: boolean;
}

// ── Internal helpers ────────────────────────────────────────────────

async function nodebbRead(path: string, uid: number = 1) {
  const separator = path.includes("?") ? "&" : "?";
  const url = `${NODEBB_URL}/api${path}${separator}_uid=${uid}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${NODEBB_API_KEY}` },
    next: { revalidate: 30 }, // cache for 30s
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`NodeBB read ${res.status}: ${body}`);
  }
  return res.json();
}

async function nodebbWrite(
  path: string,
  method: string,
  body: any,
  uid: number,
) {
  const separator = path.includes("?") ? "&" : "?";
  const url = `${NODEBB_URL}/api/v3${path}${separator}_uid=${uid}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${NODEBB_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const responseBody = await res.text();
    throw new Error(`NodeBB write ${res.status}: ${responseBody}`);
  }
  return res.json();
}

function mapUser(u: any) {
  return {
    uid: u.uid,
    username: u.username || "unknown",
    displayname: u.displayname || u.username || "Unknown",
    picture: u.picture || null,
    iconBgColor: u["icon:bgColor"] || "#666",
    iconText: u["icon:text"] || "?",
  };
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Get recent topics as feed posts.
 */
async function getRecentTopics(
  page: number = 0,
  uid: number = 1,
): Promise<{ posts: FeedPost[]; hasMore: boolean }> {
  try {
    const data = await nodebbRead(`/recent?page=${page + 1}`, uid);
    const topics = data.topics || [];

    const posts: FeedPost[] = topics
      .filter((t: any) => !t.deleted)
      .map((t: any) => ({
        tid: t.tid,
        title: t.title || t.titleRaw || "",
        content: t.teaser?.content || "",
        contentRaw: t.teaser?.content || "",
        author: mapUser(t.user || {}),
        timestamp: t.timestamp,
        timestampISO: t.timestampISO,
        likes: t.upvotes || 0,
        votes: t.votes || 0,
        postCount: t.postcount || 0,
        viewCount: t.viewcount || 0,
        category: {
          cid: t.category?.cid || t.cid,
          name: t.category?.name || "",
          slug: t.category?.slug || "",
        },
        mainPid: t.mainPid,
        slug: t.slug,
      }));

    return { posts, hasMore: topics.length >= 20 };
  } catch (error) {
    console.error("[getRecentTopics] failed:", error);
    throw error;
  }
}

/**
 * Get a single topic with all its posts.
 */
async function getTopic(tid: number, uid: number = 1): Promise<TopicDetail> {
  try {
    const data = await nodebbRead(`/topic/${tid}`, uid);

    return {
      tid: data.tid,
      title: data.title || data.titleRaw || "",
      slug: data.slug,
      category: {
        cid: data.category?.cid || data.cid,
        name: data.category?.name || "",
        slug: data.category?.slug || "",
      },
      posts: (data.posts || []).map((p: any, i: number) => ({
        pid: p.pid,
        content: p.content || "",
        contentRaw: p.sourceContent || p.content || "",
        author: mapUser(p.user || {}),
        timestamp: p.timestamp,
        timestampISO: p.timestampISO,
        votes: p.votes || 0,
        upvotes: p.upvotes || 0,
        downvotes: p.downvotes || 0,
        isMainPost: i === 0,
        index: p.index ?? i,
      })),
      postCount: data.postcount || 0,
      viewCount: data.viewcount || 0,
      votes: data.votes || 0,
      timestamp: data.timestamp,
      timestampISO: data.timestampISO,
      locked: Boolean(data.locked),
      deleted: Boolean(data.deleted),
    };
  } catch (error) {
    console.error("[getTopic] failed:", error);
    throw error;
  }
}

/**
 * Get all forum categories.
 */
async function getCategories(): Promise<ForumCategory[]> {
  try {
    const data = await nodebbRead("/categories");

    function mapCategory(c: any): ForumCategory {
      return {
        cid: c.cid,
        name: c.name,
        description: c.description || "",
        slug: c.slug,
        icon: c.icon || "",
        bgColor: c.bgColor || "#666",
        color: c.color || "#fff",
        topicCount: c.totalTopicCount || c.topic_count || 0,
        postCount: c.totalPostCount || c.post_count || 0,
        children: (c.children || []).map(mapCategory),
      };
    }

    return (data.categories || [])
      .filter((c: any) => !c.disabled)
      .map(mapCategory);
  } catch (error) {
    console.error("[getCategories] failed:", error);
    throw error;
  }
}

/**
 * Get topics within a specific category.
 */
async function getCategoryTopics(
  cid: number,
  page: number = 0,
  uid: number = 1,
): Promise<{ topics: FeedPost[]; hasMore: boolean }> {
  try {
    const data = await nodebbRead(`/category/${cid}?page=${page + 1}`, uid);
    const topics = data.topics || [];

    const mapped: FeedPost[] = topics
      .filter((t: any) => !t.deleted)
      .map((t: any) => ({
        tid: t.tid,
        title: t.title || t.titleRaw || "",
        content: t.teaser?.content || "",
        contentRaw: t.teaser?.content || "",
        author: mapUser(t.user || {}),
        timestamp: t.timestamp,
        timestampISO: t.timestampISO,
        likes: t.upvotes || 0,
        votes: t.votes || 0,
        postCount: t.postcount || 0,
        viewCount: t.viewcount || 0,
        category: {
          cid: data.cid || cid,
          name: data.name || "",
          slug: data.slug || "",
        },
        mainPid: t.mainPid,
        slug: t.slug,
      }));

    return { topics: mapped, hasMore: topics.length >= 20 };
  } catch (error) {
    console.error("[getCategoryTopics] failed:", error);
    throw error;
  }
}

/**
 * Create a new topic.
 */
async function createTopic(
  nodebbUid: number,
  cid: number,
  title: string,
  content: string,
): Promise<{ tid: number; slug: string }> {
  try {
    const data = await nodebbWrite(
      "/topics",
      "POST",
      { cid, title, content },
      nodebbUid,
    );
    return {
      tid: data.response.tid,
      slug: data.response.slug,
    };
  } catch (error) {
    console.error("[createTopic] failed:", error);
    throw error;
  }
}

/**
 * Reply to a topic.
 */
async function replyToTopic(
  nodebbUid: number,
  tid: number,
  content: string,
): Promise<{ pid: number }> {
  try {
    const data = await nodebbWrite(
      `/topics/${tid}`,
      "POST",
      { content },
      nodebbUid,
    );
    return { pid: data.response.pid };
  } catch (error) {
    console.error("[replyToTopic] failed:", error);
    throw error;
  }
}

/**
 * Upvote a post.
 */
async function upvotePost(nodebbUid: number, pid: number): Promise<void> {
  try {
    await nodebbWrite(`/posts/${pid}/vote`, "PUT", { delta: 1 }, nodebbUid);
  } catch (error) {
    console.error("[upvotePost] failed:", error);
    throw error;
  }
}

/**
 * Downvote a post.
 */
async function downvotePost(nodebbUid: number, pid: number): Promise<void> {
  try {
    await nodebbWrite(`/posts/${pid}/vote`, "PUT", { delta: -1 }, nodebbUid);
  } catch (error) {
    console.error("[downvotePost] failed:", error);
    throw error;
  }
}

/**
 * Remove vote from a post.
 */
async function unvotePost(nodebbUid: number, pid: number): Promise<void> {
  try {
    await nodebbWrite(`/posts/${pid}/vote`, "DELETE", {}, nodebbUid);
  } catch (error) {
    console.error("[unvotePost] failed:", error);
    throw error;
  }
}

/**
 * Get popular topics (sorted by votes/activity).
 */
async function getPopularTopics(
  page: number = 0,
  uid: number = 1,
): Promise<{ posts: FeedPost[]; hasMore: boolean }> {
  try {
    const data = await nodebbRead(
      `/popular?page=${page + 1}&term=alltime`,
      uid,
    );
    const topics = data.topics || [];

    const posts: FeedPost[] = topics
      .filter((t: any) => !t.deleted)
      .map((t: any) => ({
        tid: t.tid,
        title: t.title || t.titleRaw || "",
        content: t.teaser?.content || "",
        contentRaw: t.teaser?.content || "",
        author: mapUser(t.user || {}),
        timestamp: t.timestamp,
        timestampISO: t.timestampISO,
        likes: t.upvotes || 0,
        votes: t.votes || 0,
        postCount: t.postcount || 0,
        viewCount: t.viewcount || 0,
        category: {
          cid: t.category?.cid || t.cid,
          name: t.category?.name || "",
          slug: t.category?.slug || "",
        },
        mainPid: t.mainPid,
        slug: t.slug,
      }));

    return { posts, hasMore: topics.length >= 20 };
  } catch (error) {
    console.error("[getPopularTopics] failed:", error);
    throw error;
  }
}

export const communityService = {
  getRecentTopics,
  getPopularTopics,
  getTopic,
  getCategories,
  getCategoryTopics,
  createTopic,
  replyToTopic,
  upvotePost,
  downvotePost,
  unvotePost,
};
