/**
 * Build the PostgreSQL full-text search index for book chapters.
 * Run: npx tsx scripts/index-book-search.ts
 *
 * Requires DATABASE_URL in environment.
 */

import pg from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { BOOK_STRUCTURE } from '../lib/data/book-structure';
import { getChapterPlainText } from '../lib/book';

async function indexBook() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const pool = new pg.Pool({ connectionString });
  const chapters = BOOK_STRUCTURE.flatMap((p) => p.chapters);

  console.log(`Indexing ${chapters.length} chapters...`);

  for (const chapter of chapters) {
    const filePath = path.join(
      process.cwd(),
      'docs/manuscript',
      chapter.sourceFile
    );

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const plainText = getChapterPlainText(content);

      await pool.query(
        `
        INSERT INTO book_search_index (chapter_id, chapter_title, is_free, plain_text, search_vector, updated_at)
        VALUES ($1, $2, $3, $4, to_tsvector('english', $4), now())
        ON CONFLICT (chapter_id) DO UPDATE SET
          chapter_title = $2,
          is_free = $3,
          plain_text = $4,
          search_vector = to_tsvector('english', $4),
          updated_at = now()
        `,
        [chapter.id, chapter.title, chapter.isFree, plainText]
      );

      console.log(`  [ok] ${chapter.id}: ${chapter.title}`);
    } catch (err) {
      console.error(`  [error] ${chapter.id}: ${err}`);
    }
  }

  await pool.end();
  console.log('Done.');
}

indexBook();
