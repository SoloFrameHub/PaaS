import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getChapter } from '@/lib/data/book-structure';
import { logger } from '@/lib/logger';
import type { Pool as PoolType } from 'pg';

let _searchPool: PoolType | null = null;
function getSearchPool(): PoolType {
  if (!_searchPool) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require('pg') as typeof import('pg');
    _searchPool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  }
  return _searchPool;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim();
  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Convert user query to tsquery with prefix matching
    const tsquery = query
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.replace(/[^a-zA-Z0-9]/g, '') + ':*')
      .filter((w) => w.length > 2)
      .join(' & ');

    if (!tsquery) {
      return NextResponse.json({ results: [] });
    }

    // Raw SQL for full-text search (Drizzle has limited tsvector support)
    const pool = getSearchPool();

    let rows: any[];
    try {
      const result = await pool.query(
        `
        SELECT
          chapter_id,
          chapter_title,
          is_free,
          ts_headline('english', plain_text, to_tsquery('english', $1),
            'StartSel=<mark>, StopSel=</mark>, MaxWords=40, MinWords=20') AS snippet,
          ts_rank(search_vector, to_tsquery('english', $1)) AS rank
        FROM book_search_index
        WHERE search_vector @@ to_tsquery('english', $1)
        ORDER BY rank DESC
        LIMIT 20
        `,
        [tsquery]
      );
      rows = result.rows;
    } finally {
      // Pool is reused — do not end it
    }

    const results = rows.map((r) => {
      const chapter = getChapter(r.chapter_id);
      // Sanitize snippet: ts_headline produces <mark> tags but underlying text
      // could contain HTML. Strip everything except <mark> tags.
      const snippet = (r.snippet as string)
        .replace(/<mark>/g, '\x00MARK_OPEN\x00')
        .replace(/<\/mark>/g, '\x00MARK_CLOSE\x00')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\x00MARK_OPEN\x00/g, '<mark>')
        .replace(/\x00MARK_CLOSE\x00/g, '</mark>');
      return {
        chapterId: r.chapter_id,
        chapterTitle: r.chapter_title,
        slug: chapter?.slug ?? r.chapter_id,
        isFree: r.is_free,
        snippet,
        rank: parseFloat(r.rank),
      };
    });

    return NextResponse.json({ results });
  } catch (err) {
    logger.error('Book search error', { err });
    return NextResponse.json({ results: [] });
  }
}
