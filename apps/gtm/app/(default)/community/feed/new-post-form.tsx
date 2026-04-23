'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface ForumCategory {
  cid: number;
  name: string;
  children: ForumCategory[];
}

export default function NewPostForm() {
  const locale = useLocale(); const isEs = locale === 'es';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cid, setCid] = useState<number>(0);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (expanded && categories.length === 0) {
      fetch('/api/community/forum')
        .then(res => res.json())
        .then(({ data }) => {
          const cats = data || [];
          setCategories(cats);
          // Auto-select first leaf category
          const first = findFirstLeaf(cats);
          if (first) setCid(first.cid);
        })
        .catch(() => {});
    }
  }, [expanded]);

  function findFirstLeaf(cats: ForumCategory[]): ForumCategory | null {
    for (const cat of cats) {
      if (cat.children?.length > 0) {
        const leaf = findFirstLeaf(cat.children);
        if (leaf) return leaf;
      } else {
        return cat;
      }
    }
    return cats[0] || null;
  }

  function flattenCategories(cats: ForumCategory[], depth = 0): { cid: number; name: string; depth: number }[] {
    const result: { cid: number; name: string; depth: number }[] = [];
    for (const cat of cats) {
      result.push({ cid: cat.cid, name: cat.name, depth });
      if (cat.children?.length > 0) {
        result.push(...flattenCategories(cat.children, depth + 1));
      }
    }
    return result;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !cid) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/community/feed/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cid,
          title: title.trim(),
          content: content.trim(),
        }),
      });
      if (res.ok) {
        setTitle('');
        setContent('');
        setExpanded(false);
        router.refresh();
      }
    } catch {
      // Failed to post
    } finally {
      setSubmitting(false);
    }
  }

  const flatCats = flattenCategories(categories);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="w-full text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isEs ? 'Comparte algo con la comunidad...' : 'Share something with the community...'}
            </span>
          </div>
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Category selector */}
          {flatCats.length > 0 && (
            <div className="mb-3">
              <select
                value={cid}
                onChange={e => setCid(Number(e.target.value))}
                className="form-select w-full text-sm bg-gray-100 dark:bg-gray-700 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-gray-800"
              >
                <option value={0} disabled>{isEs ? 'Selecciona una categoría...' : 'Select a category...'}</option>
                {flatCats.map(cat => (
                  <option key={cat.cid} value={cat.cid}>
                    {'  '.repeat(cat.depth)}{cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={isEs ? 'Título del post...' : 'Post title...'}
            className="form-input w-full bg-gray-100 dark:bg-gray-700 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-gray-800 placeholder-gray-500 mb-3 font-semibold"
            autoFocus
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={isEs ? 'Escribe tu post...' : 'Write your post...'}
            rows={3}
            className="form-textarea w-full bg-gray-100 dark:bg-gray-700 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-gray-800 placeholder-gray-500 mb-3 resize-none"
          />
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => { setExpanded(false); setTitle(''); setContent(''); }}
              className="text-sm text-gray-500 hover:text-gray-600"
            >
              {isEs ? 'Cancelar' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={submitting || !title.trim() || !content.trim() || !cid}
              className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap disabled:opacity-50"
            >
              {submitting ? (isEs ? 'Publicando...' : 'Posting...') : (isEs ? 'Publicar' : 'Post')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
