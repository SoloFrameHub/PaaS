/**
 * TypeScript interfaces for NodeBB Write API v3 responses.
 */

export interface NodeBBCategory {
  cid: number;
  name: string;
  slug: string;
  description: string;
  parentCid: number | null;
  icon: string;
  order: number;
  topic_count: number;
  post_count: number;
  disabled: number;
}

export interface NodeBBTopic {
  tid: number;
  title: string;
  slug: string;
  cid: number;
  uid: number;
  mainPid: number;
  postcount: number;
  viewcount: number;
  votes: number;
  timestamp: number;
  lastposttime: number;
  deleted: number;
  locked: number;
  pinned: number;
  category?: { name: string } | null;
  user?: { username: string; uid: number } | null;
}

export interface NodeBBPost {
  pid: number;
  tid: number;
  uid: number;
  content: string;
  votes: number;
  timestamp: number;
  deleted: number;
  user?: { username: string; uid: number } | null;
}

export interface NodeBBUser {
  uid: number;
  username: string;
  email: string;
  userslug: string;
  joindate: number;
  banned: number;
}

export interface NodeBBApiResponse<T> {
  status: { code: string; message: string };
  response: T;
}

export interface NodeBBCategoryPayload {
  name: string;
  description?: string;
  parentCid?: number;
  icon?: string;
  order?: number;
}

export interface NodeBBTopicPayload {
  cid: number;
  title: string;
  content: string;
  _uid?: number;
}

export interface NodeBBPostPayload {
  tid: number;
  content: string;
  _uid?: number;
}

export interface NodeBBUserPayload {
  username: string;
  password: string;
  email: string;
}
