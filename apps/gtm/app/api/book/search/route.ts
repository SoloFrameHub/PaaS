import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { withSystemAdminApp } from '@/lib/db/with-tenant';
import { getChapter } from '@/lib/data/book-structure';
import { logger } from '@/lib/logger';

/**
 * GET /api/book/search — full-text search across `book_search_index`.
 *
 * The book index is system-owned public catalog content (D-7 in
 * docs/Paas/B-009-migration-plan.md), shared across all tenants. Run as
 * `platform_system` to bypass per-tenant RLS — there is no tenant scope
 * for book chapters.
 */
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim();
  if (!query || query.length < 2) {
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

    // Raw SQL for full-text search (Drizzle has limited tsvector support).
    // Run inside `withSystemAdminApp` so the query inherits the same
    // pinned-role transaction discipline as the rest of the codebase.
    const rows = await withSystemAdminApp(async (tx) => {
      const result = await tx.execute<{
        chapter_id: string;
        chapter_title: string;
        is_free: boolean;
        snippet: string;
        rank: number;
      }>(sql`
        SELECT
          chapter_id,
          chapter_title,
          is_free,
          ts_headline('english', plain_text, to_tsquery('english', ${tsquery}),
            'StartSel=<mark>, StopSel=</mark>, MaxWords=40, MinWords=20') AS snippet,
          ts_rank(search_vector, to_tsquery('english', ${tsquery})) AS rank
        FROM book_search_index
        WHERE search_vector @@ to_tsquery('english', ${tsquery})
        ORDER BY rank DESC
        LIMIT 20
      `);
      // Drizzle's `tx.execute` returns either an array (better-sqlite-style)
      // or a `{ rows }` object (node-postgres). Normalize to the array form.
      return Array.isArray(result) ? result : (result as { rows: any[] }).rows;
    });

    const results = rows.map((r: any) => {
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
