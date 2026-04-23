/**
 * NodeBB Write API v3 client.
 * Singleton wrapper providing typed methods for categories, topics, posts, and users.
 * Uses NODEBB_URL and NODEBB_API_KEY env vars.
 */

import { logger } from '@/lib/logger';
import type {
  NodeBBCategory,
  NodeBBTopic,
  NodeBBPost,
  NodeBBUser,
  NodeBBApiResponse,
  NodeBBCategoryPayload,
  NodeBBTopicPayload,
  NodeBBPostPayload,
  NodeBBUserPayload,
} from './types';

class NodeBBClient {
  private get baseUrl(): string {
    return process.env.NODEBB_URL || '';
  }

  private get apiKey(): string {
    return process.env.NODEBB_API_KEY || '';
  }

  private get maxRetries(): number {
    return 3;
  }

  /** Admin UID used with master token (default: 1 = first admin user) */
  private get adminUid(): number {
    return parseInt(process.env.NODEBB_ADMIN_UID || '1', 10);
  }

  private ensureConfigured(): void {
    if (!this.baseUrl || !this.apiKey) {
      throw new Error('NodeBB environment variables not configured (NODEBB_URL, NODEBB_API_KEY)');
    }
  }

  // ── Core HTTP methods ──────────────────────────────────────────────

  private async fetchWithRetry(
    path: string,
    options: RequestInit,
    attempt = 1,
  ): Promise<Response> {
    this.ensureConfigured();

    // Master tokens require _uid: for GET/DELETE add as query param
    let url = `${this.baseUrl}${path}`;
    if (options.method === 'GET' || options.method === 'DELETE') {
      const sep = url.includes('?') ? '&' : '?';
      url = `${url}${sep}_uid=${this.adminUid}`;
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (res.ok) return res;

    // Retry on 5xx or 429
    if ((res.status >= 500 || res.status === 429) && attempt < this.maxRetries) {
      const delay = Math.pow(2, attempt) * 500;
      logger.warn(`NodeBB API ${res.status}, retrying in ${delay}ms (attempt ${attempt}/${this.maxRetries})`, { path });
      await new Promise((r) => setTimeout(r, delay));
      return this.fetchWithRetry(path, options, attempt + 1);
    }

    const body = await res.text().catch(() => '');
    throw new Error(`NodeBB API error ${res.status}: ${res.statusText} - ${body}`);
  }

  async get<T = any>(path: string): Promise<T> {
    const res = await this.fetchWithRetry(path, { method: 'GET' });
    const json = await res.json();
    return (json.response ?? json) as T;
  }

  async post<T = any>(path: string, body?: Record<string, unknown>): Promise<T> {
    // Master tokens require _uid in POST/PUT body
    const bodyWithUid = { _uid: this.adminUid, ...(body || {}) };
    const res = await this.fetchWithRetry(path, {
      method: 'POST',
      body: JSON.stringify(bodyWithUid),
    });
    const json = await res.json();
    return (json.response ?? json) as T;
  }

  async put<T = any>(path: string, body: Record<string, unknown>): Promise<T> {
    const bodyWithUid = { _uid: this.adminUid, ...body };
    const res = await this.fetchWithRetry(path, {
      method: 'PUT',
      body: JSON.stringify(bodyWithUid),
    });
    const json = await res.json();
    return (json.response ?? json) as T;
  }

  async del<T = any>(path: string): Promise<T> {
    const res = await this.fetchWithRetry(path, { method: 'DELETE' });
    const json = await res.json();
    return (json.response ?? json) as T;
  }

  // ── Categories ─────────────────────────────────────────────────────

  async createCategory(data: NodeBBCategoryPayload): Promise<NodeBBCategory> {
    return this.post<NodeBBCategory>('/categories', data as unknown as Record<string, unknown>);
  }

  async getCategory(cid: number): Promise<NodeBBCategory> {
    return this.get<NodeBBCategory>(`/categories/${cid}`);
  }

  async updateCategory(cid: number, data: Partial<NodeBBCategoryPayload>): Promise<NodeBBCategory> {
    return this.put<NodeBBCategory>(`/categories/${cid}`, data as unknown as Record<string, unknown>);
  }

  async deleteCategory(cid: number): Promise<void> {
    await this.del(`/categories/${cid}`);
  }

  /**
   * Set a privilege on a category for a specific group or user.
   * privilege examples: 'groups:find', 'groups:read', 'groups:topics:create', 'groups:posts:create'
   */
  async setCategoryPrivilege(
    cid: number,
    privilege: string,
    groupOrUid: string | number,
    value: boolean,
  ): Promise<void> {
    await this.put(`/categories/${cid}/privileges`, {
      privilege,
      member: groupOrUid,
      set: value,
    });
  }

  // ── Topics ─────────────────────────────────────────────────────────

  async createTopic(data: NodeBBTopicPayload): Promise<NodeBBTopic> {
    return this.post<NodeBBTopic>('/topics', data as unknown as Record<string, unknown>);
  }

  async getTopic(tid: number): Promise<NodeBBTopic & { posts?: NodeBBPost[] }> {
    return this.get(`/topics/${tid}`);
  }

  async getRecentTopics(page = 1): Promise<NodeBBTopic[]> {
    const data = await this.get<{ topics?: NodeBBTopic[] }>(`/categories/recent?page=${page}`);
    return data.topics || [];
  }

  async getTopicPosts(tid: number): Promise<NodeBBPost[]> {
    const data = await this.get<{ posts?: NodeBBPost[] }>(`/topics/${tid}`);
    return data.posts || [];
  }

  async deleteTopic(tid: number): Promise<void> {
    await this.del(`/topics/${tid}`);
  }

  async pinTopic(tid: number): Promise<void> {
    await this.put(`/topics/${tid}`, { pinned: 1 });
  }

  // ── Posts ───────────────────────────────────────────────────────────

  async createPost(data: NodeBBPostPayload): Promise<NodeBBPost> {
    return this.post<NodeBBPost>(`/topics/${data.tid}`, {
      content: data.content,
      _uid: data._uid,
    });
  }

  async updatePost(pid: number, data: { content: string }): Promise<NodeBBPost> {
    return this.put<NodeBBPost>(`/posts/${pid}`, data as unknown as Record<string, unknown>);
  }

  async deletePost(pid: number): Promise<void> {
    await this.del(`/posts/${pid}`);
  }

  // ── Users ──────────────────────────────────────────────────────────

  async createUser(data: NodeBBUserPayload): Promise<NodeBBUser> {
    return this.post<NodeBBUser>('/users', data as unknown as Record<string, unknown>);
  }

  async getUser(uid: number): Promise<NodeBBUser> {
    return this.get<NodeBBUser>(`/users/${uid}`);
  }

  async getUserByUsername(username: string): Promise<NodeBBUser | null> {
    try {
      return await this.get<NodeBBUser>(`/users/bySlug/${username}`);
    } catch {
      return null;
    }
  }

  /**
   * Grant specific privileges to a user on a category.
   */
  async grantUserCategoryAccess(cid: number, uid: number): Promise<void> {
    const privileges = ['find', 'read', 'topics:create', 'topics:reply', 'posts:edit'];
    for (const priv of privileges) {
      await this.setCategoryPrivilege(cid, priv, uid, true);
    }
  }

  /**
   * Revoke all privileges from a user on a category.
   */
  async revokeUserCategoryAccess(cid: number, uid: number): Promise<void> {
    const privileges = ['find', 'read', 'topics:create', 'topics:reply', 'posts:edit'];
    for (const priv of privileges) {
      await this.setCategoryPrivilege(cid, priv, uid, false);
    }
  }
}

export const nodebbClient = new NodeBBClient();
