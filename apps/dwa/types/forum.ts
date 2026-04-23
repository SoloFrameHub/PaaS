// --- Flarum JSON:API raw types ---

export interface FlarumJsonApiResource {
  type: string;
  id: string;
  attributes: Record<string, unknown>;
  relationships?: Record<string, { data: { type: string; id: string } | { type: string; id: string }[] }>;
}

export interface FlarumJsonApiResponse {
  data: FlarumJsonApiResource | FlarumJsonApiResource[];
  included?: FlarumJsonApiResource[];
  links?: { first?: string; prev?: string; next?: string };
}

// --- Normalized app-level types ---

export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  discussionCount: number;
  position: number;
}

export interface ForumUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  joinedAt: string;
  discussionCount: number;
  commentCount: number;
}

export interface ForumDiscussion {
  id: string;
  title: string;
  slug: string;
  commentCount: number;
  participantCount: number;
  createdAt: string;
  lastPostedAt: string | null;
  isLocked: boolean;
  isSticky: boolean;
  votes: number;
  author: ForumUser;
  lastPostedUser: ForumUser | null;
  firstPost: ForumPost | null;
  tags: ForumCategory[];
  recentCommenters: ForumUser[];
}

export interface ForumPost {
  id: string;
  number: number;
  contentHtml: string;
  contentPlain: string;
  createdAt: string;
  editedAt: string | null;
  isHidden: boolean;
  votes: number;
  canLike: boolean;
  hasLiked: boolean;
  author: ForumUser;
  aiModerationLevel?: number;
}

export interface ForumDiscussionListResponse {
  discussions: ForumDiscussion[];
  hasMore: boolean;
  totalCount: number;
  nextOffset: number;
}

export interface ForumDiscussionDetailResponse {
  discussion: ForumDiscussion;
  posts: ForumPost[];
  hasMorePosts: boolean;
}

// --- Request types ---

export interface CreateDiscussionRequest {
  title: string;
  content: string;
  tagIds: string[];
}

export interface CreatePostRequest {
  discussionId: string;
  content: string;
}

// --- Moderation types ---

export type ModerationCategory =
  | 'self-harm'
  | 'violence'
  | 'harassment'
  | 'misinformation'
  | 'spam'
  | 'crisis-signals';

export interface ModerationResult {
  riskLevel: 0 | 1 | 2 | 3;
  flaggedCategories: ModerationCategory[];
  reasoning: string;
  crisisResourcesNeeded: boolean;
}
