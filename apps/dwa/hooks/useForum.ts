'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  ForumDiscussionListResponse,
  ForumDiscussionDetailResponse,
  ForumCategory,
  ForumDiscussion,
  ForumPost,
} from '@/types/forum';

// ---------------------------------------------------------------------------
// List discussions
// ---------------------------------------------------------------------------

export function useDiscussions(params: {
  sort?: string;
  tag?: string;
  page?: number;
  q?: string;
}) {
  const [data, setData] = useState<ForumDiscussionListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (params.sort) qs.set('sort', params.sort);
      if (params.tag) qs.set('tag', params.tag);
      if (params.page) qs.set('page', String(params.page));
      if (params.q) qs.set('q', params.q);
      const res = await fetch(`/api/forum/discussions?${qs}`);
      if (!res.ok) throw new Error('Failed to load discussions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [params.sort, params.tag, params.page, params.q]);

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  return { data, loading, error, refetch: fetchDiscussions };
}

// ---------------------------------------------------------------------------
// Single discussion
// ---------------------------------------------------------------------------

export function useDiscussion(id: string) {
  const [data, setData] = useState<ForumDiscussionDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussion = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/forum/discussions/${id}`);
      if (!res.ok) throw new Error('Failed to load discussion');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDiscussion();
  }, [fetchDiscussion]);

  return { data, loading, error, refetch: fetchDiscussion };
}

// ---------------------------------------------------------------------------
// Tags / categories
// ---------------------------------------------------------------------------

export function useTags() {
  const [data, setData] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/forum/tags')
      .then((res) => res.json())
      .then((json) => setData(json.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export function useCreateDiscussion() {
  const [submitting, setSubmitting] = useState(false);

  const createDiscussion = async (body: {
    title: string;
    content: string;
    tagIds: string[];
  }): Promise<ForumDiscussion> => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/forum/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Failed to create discussion');
      }
      const json = await res.json();
      return json.data;
    } finally {
      setSubmitting(false);
    }
  };

  return { createDiscussion, submitting };
}

export function useCreatePost() {
  const [submitting, setSubmitting] = useState(false);

  const createPost = async (body: {
    discussionId: string;
    content: string;
  }): Promise<ForumPost> => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Failed to create reply');
      }
      const json = await res.json();
      return json.data;
    } finally {
      setSubmitting(false);
    }
  };

  return { createPost, submitting };
}

export function useLikePost() {
  const toggleLike = async (postId: string, currentlyLiked: boolean) => {
    const res = await fetch(`/api/forum/posts/${postId}/like`, {
      method: currentlyLiked ? 'DELETE' : 'POST',
    });
    if (!res.ok) throw new Error('Failed to toggle like');
    const json = await res.json();
    return json.data;
  };

  return { toggleLike };
}
