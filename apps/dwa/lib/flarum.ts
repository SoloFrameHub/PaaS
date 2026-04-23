/**
 * Flarum JSON:API client — server-only.
 *
 * Communicates with the Flarum REST API, normalises JSON:API responses
 * into clean typed objects that React components can consume directly.
 */

import DOMPurify from 'isomorphic-dompurify';
import type {
  FlarumJsonApiResponse,
  FlarumJsonApiResource,
  ForumDiscussion,
  ForumDiscussionListResponse,
  ForumDiscussionDetailResponse,
  ForumPost,
  ForumUser,
  ForumCategory,
  CreateDiscussionRequest,
  CreatePostRequest,
} from '@/types/forum';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findIncluded(
  included: FlarumJsonApiResource[] | undefined,
  type: string,
  id: string,
): FlarumJsonApiResource | undefined {
  return included?.find((r) => r.type === type && r.id === id);
}

function relId(
  resource: FlarumJsonApiResource,
  name: string,
): string | undefined {
  const rel = resource.relationships?.[name];
  if (!rel) return undefined;
  const data = rel.data;
  if (Array.isArray(data)) return data[0]?.id;
  return (data as { type: string; id: string } | undefined)?.id;
}

function relIds(
  resource: FlarumJsonApiResource,
  name: string,
): string[] {
  const rel = resource.relationships?.[name];
  if (!rel) return [];
  const data = rel.data;
  if (Array.isArray(data)) return data.map((d) => d.id);
  return data ? [(data as { type: string; id: string }).id] : [];
}

// ---------------------------------------------------------------------------
// Normalisers
// ---------------------------------------------------------------------------

function normalizeUser(resource: FlarumJsonApiResource, rewriteUrls?: (v: string | null) => string | null): ForumUser {
  const a = resource.attributes;
  const avatarUrl = (a.avatarUrl as string) || null;
  return {
    id: resource.id,
    username: (a.username as string) || '',
    displayName: (a.displayName as string) || (a.username as string) || '',
    avatarUrl: rewriteUrls ? rewriteUrls(avatarUrl) : avatarUrl,
    joinedAt: (a.joinedAt as string) || '',
    discussionCount: (a.discussionCount as number) || 0,
    commentCount: (a.commentCount as number) || 0,
  };
}

function normalizeTag(resource: FlarumJsonApiResource): ForumCategory {
  const a = resource.attributes;
  return {
    id: resource.id,
    name: (a.name as string) || '',
    slug: (a.slug as string) || '',
    description: (a.description as string) || '',
    color: (a.color as string) || '#6366f1',
    discussionCount: (a.discussionCount as number) || 0,
    position: (a.position as number) ?? 999,
  };
}

function normalizePost(
  resource: FlarumJsonApiResource,
  included?: FlarumJsonApiResource[],
  rewriteUrls?: (v: string | null) => string | null,
): ForumPost {
  const a = resource.attributes;
  const authorId = relId(resource, 'user');
  const authorRes = authorId ? findIncluded(included, 'users', authorId) : undefined;
  const rawContentHtml = (a.contentHtml as string) || '';

  // XSS Protection: Sanitize HTML from Flarum before rendering
  // Never trust external HTML sources, even if Flarum has its own sanitization
  let sanitizedHtml = DOMPurify.sanitize(rawContentHtml, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'class', 'id', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });

  // Apply URL rewriting after sanitization (for image proxying, etc.)
  if (rewriteUrls) {
    sanitizedHtml = rewriteUrls(sanitizedHtml) || '';
  }

  return {
    id: resource.id,
    number: (a.number as number) || 0,
    contentHtml: sanitizedHtml,
    contentPlain: rawContentHtml.replace(/<[^>]*>/g, ''),
    createdAt: (a.createdAt as string) || '',
    editedAt: (a.editedAt as string) || null,
    isHidden: !!(a.isHidden ?? a.hiddenAt),
    votes: (a.likesCount as number) || 0,
    canLike: (a.canLike as boolean) ?? true,
    hasLiked: (a.isLiked as boolean) ?? false,
    author: authorRes
      ? normalizeUser(authorRes, rewriteUrls)
      : { id: '0', username: 'unknown', displayName: 'Unknown', avatarUrl: null, joinedAt: '', discussionCount: 0, commentCount: 0 },
    aiModerationLevel: a.aiModerationLevel as number | undefined,
  };
}

function normalizeDiscussion(
  resource: FlarumJsonApiResource,
  included?: FlarumJsonApiResource[],
  rewriteUrls?: (v: string | null) => string | null,
): ForumDiscussion {
  const a = resource.attributes;

  // Author
  const authorId = relId(resource, 'user');
  const authorRes = authorId ? findIncluded(included, 'users', authorId) : undefined;

  // Last posted user
  const lastUserId = relId(resource, 'lastPostedUser');
  const lastUserRes = lastUserId ? findIncluded(included, 'users', lastUserId) : undefined;

  // First post
  const firstPostId = relId(resource, 'firstPost');
  const firstPostRes = firstPostId ? findIncluded(included, 'posts', firstPostId) : undefined;

  // Tags
  const tagIds = relIds(resource, 'tags');
  const tags = tagIds
    .map((tid) => findIncluded(included, 'tags', tid))
    .filter(Boolean)
    .map((t) => normalizeTag(t!));

  // Recent commenters (from the lastThreePostedUsers or similar relationship)
  const commenterIds = relIds(resource, 'mostRelevantPost')
    .concat(relIds(resource, 'lastPostedUser'));
  const commenters = commenterIds
    .map((uid) => findIncluded(included, 'users', uid))
    .filter(Boolean)
    .map((u) => normalizeUser(u!, rewriteUrls));

  return {
    id: resource.id,
    title: (a.title as string) || '',
    slug: (a.slug as string) || '',
    commentCount: (a.commentCount as number) || 0,
    participantCount: (a.participantCount as number) || 0,
    createdAt: (a.createdAt as string) || '',
    lastPostedAt: (a.lastPostedAt as string) || null,
    isLocked: !!(a.isLocked),
    isSticky: !!(a.isSticky),
    votes: (a.likesCount as number) || (a.votes as number) || 0,
    author: authorRes
      ? normalizeUser(authorRes, rewriteUrls)
      : { id: '0', username: 'unknown', displayName: 'Unknown', avatarUrl: null, joinedAt: '', discussionCount: 0, commentCount: 0 },
    lastPostedUser: lastUserRes ? normalizeUser(lastUserRes, rewriteUrls) : null,
    firstPost: firstPostRes ? normalizePost(firstPostRes, included, rewriteUrls) : null,
    tags,
    recentCommenters: commenters,
  };
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

class FlarumClient {
  private baseUrl: string;
  private publicUrl: string;
  private apiKey: string;

  constructor() {
    // Resolve URLs lazily at first use instead of at construction: the
    // module is imported during `next build`'s page-data collection phase,
    // where NODE_ENV==='production' is true but env vars aren't available
    // yet. Throwing here would break CI/CD builds. The getters below
    // throw on first call if the prod env hasn't been configured.
    this.baseUrl = '';
    this.publicUrl = '';
    this.apiKey = process.env.FLARUM_API_KEY || '';
  }

  private resolveUrls(): { baseUrl: string; publicUrl: string } {
    if (this.baseUrl && this.publicUrl) {
      return { baseUrl: this.baseUrl, publicUrl: this.publicUrl };
    }
    const devFallback = 'http://localhost:8080';
    const isProd = process.env.NODE_ENV === 'production';
    const flarumUrl = process.env.FLARUM_URL;
    const flarumPublicUrl = process.env.FLARUM_PUBLIC_URL ?? flarumUrl;
    if (isProd && (!flarumUrl || !flarumPublicUrl)) {
      throw new Error(
        'FLARUM_URL (and optionally FLARUM_PUBLIC_URL) must be set in production; localhost fallback is dev-only.',
      );
    }
    this.baseUrl = (flarumUrl ?? devFallback).replace(/\/$/, '');
    this.publicUrl = (flarumPublicUrl ?? devFallback).replace(/\/$/, '');
    return { baseUrl: this.baseUrl, publicUrl: this.publicUrl };
  }

  /** Rewrite internal URLs in a string to public-facing ones */
  private rewriteUrls(value: string | null): string | null {
    if (!value) return value;
    const { baseUrl, publicUrl } = this.resolveUrls();
    if (baseUrl === publicUrl) return value;
    return value.replaceAll(baseUrl, publicUrl);
  }

  private headers(userToken?: string): HeadersInit {
    const h: Record<string, string> = {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    };
    if (userToken) {
      h['Authorization'] = `Token ${userToken}`;
    } else if (this.apiKey) {
      h['Authorization'] = `Token ${this.apiKey}`;
    }
    return h;
  }

  private async request(
    path: string,
    options: RequestInit = {},
    cache?: { revalidate: number },
  ): Promise<FlarumJsonApiResponse> {
    const { baseUrl } = this.resolveUrls();
    const url = `${baseUrl}/api${path}`;
    const res = await fetch(url, {
      ...options,
      headers: { ...this.headers((options.headers as Record<string, string>)?.['Authorization']?.replace('Token ', '')), ...options.headers },
      next: cache ? { revalidate: cache.revalidate } : undefined,
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Flarum API error ${res.status}: ${body}`);
    }
    return res.json();
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  async listDiscussions(params: {
    sort?: 'popular' | 'newest' | 'oldest' | 'top';
    tagSlug?: string;
    page?: number;
    limit?: number;
    q?: string;
  } = {}): Promise<ForumDiscussionListResponse> {
    const qs = new URLSearchParams();
    qs.set('include', 'user,lastPostedUser,firstPost,tags');

    // Sort mapping
    const sortMap: Record<string, string> = {
      popular: '-commentCount',
      newest: '-createdAt',
      oldest: 'createdAt',
      top: '-likesCount',
    };
    if (params.sort && sortMap[params.sort]) {
      qs.set('sort', sortMap[params.sort]);
    }

    // Tag filter
    if (params.tagSlug) {
      qs.set('filter[tag]', params.tagSlug);
    }

    // Search
    if (params.q) {
      qs.set('filter[q]', params.q);
    }

    // Pagination
    const limit = params.limit || 20;
    const offset = ((params.page || 1) - 1) * limit;
    qs.set('page[limit]', String(limit));
    qs.set('page[offset]', String(offset));

    const json = await this.request(`/discussions?${qs}`, {}, { revalidate: 30 });
    const data = Array.isArray(json.data) ? json.data : [json.data];
    const rw = this.rewriteUrls.bind(this);
    const discussions = data.map((d) => normalizeDiscussion(d, json.included, rw));

    return {
      discussions,
      hasMore: !!json.links?.next,
      totalCount: discussions.length, // Flarum doesn't provide total in standard response
      nextOffset: offset + limit,
    };
  }

  async getDiscussion(id: string): Promise<ForumDiscussionDetailResponse> {
    const json = await this.request(
      `/discussions/${id}?include=user,lastPostedUser,firstPost,posts,posts.user,tags`,
      {},
      { revalidate: 15 },
    );

    const resource = Array.isArray(json.data) ? json.data[0] : json.data;
    const rw = this.rewriteUrls.bind(this);
    const discussion = normalizeDiscussion(resource, json.included, rw);

    // Extract posts from included
    const postResources = (json.included || []).filter((r) => r.type === 'posts');
    const posts = postResources
      .map((p) => normalizePost(p, json.included, rw))
      .filter((p) => !p.isHidden)
      .sort((a, b) => a.number - b.number);

    return {
      discussion,
      posts,
      hasMorePosts: false, // Simplified; paginate posts separately if needed
    };
  }

  async createDiscussion(
    data: CreateDiscussionRequest,
    userToken: string,
  ): Promise<ForumDiscussion> {
    const body = {
      data: {
        type: 'discussions',
        attributes: {
          title: data.title,
          content: data.content,
        },
        relationships: {
          tags: {
            data: data.tagIds.map((id) => ({ type: 'tags', id })),
          },
        },
      },
    };

    const json = await this.request('/discussions', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { Authorization: `Token ${userToken}` } as Record<string, string>,
    });

    const resource = Array.isArray(json.data) ? json.data[0] : json.data;
    return normalizeDiscussion(resource, json.included, this.rewriteUrls.bind(this));
  }

  async createPost(
    data: CreatePostRequest,
    userToken: string,
  ): Promise<ForumPost> {
    const body = {
      data: {
        type: 'posts',
        attributes: {
          content: data.content,
        },
        relationships: {
          discussion: {
            data: { type: 'discussions', id: data.discussionId },
          },
        },
      },
    };

    const json = await this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { Authorization: `Token ${userToken}` } as Record<string, string>,
    });

    const resource = Array.isArray(json.data) ? json.data[0] : json.data;
    return normalizePost(resource, json.included, this.rewriteUrls.bind(this));
  }

  async likePost(postId: string, userToken: string): Promise<void> {
    await this.request(`/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        data: {
          type: 'posts',
          id: postId,
          attributes: { isLiked: true },
        },
      }),
      headers: { Authorization: `Token ${userToken}` } as Record<string, string>,
    });
  }

  async unlikePost(postId: string, userToken: string): Promise<void> {
    await this.request(`/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        data: {
          type: 'posts',
          id: postId,
          attributes: { isLiked: false },
        },
      }),
      headers: { Authorization: `Token ${userToken}` } as Record<string, string>,
    });
  }

  async getTags(): Promise<ForumCategory[]> {
    const json = await this.request('/tags?include=parent', {}, { revalidate: 300 });
    const data = Array.isArray(json.data) ? json.data : [json.data];
    return data
      .map((d) => normalizeTag(d))
      .sort((a, b) => a.position - b.position);
  }

  async getOrCreateUserToken(
    userId: string,
    email: string,
    username: string,
  ): Promise<string> {
    // Use the master API key to create/retrieve a token for this user.
    // Flarum's token endpoint: POST /api/token
    const { baseUrl } = this.resolveUrls();
    const res = await fetch(`${baseUrl}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.apiKey}; userId=1`,
      },
      body: JSON.stringify({
        identification: email,
        password: '', // With API key auth, password is not required
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.token || data.userId || this.apiKey;
    }

    // Fallback: use master API key with userId header
    // This allows actions on behalf of the user via the admin key
    return `${this.apiKey}; userId=${userId}`;
  }
}

export const flarumClient = new FlarumClient();
