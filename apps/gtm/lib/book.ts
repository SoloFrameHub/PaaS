import fs from 'fs/promises';
import path from 'path';
import { logger } from './logger';
import { calculateReadingTime } from './lessons';
import { getChapter, type BookChapter } from './data/book-structure';

const BOOK_PATH = path.join(process.cwd(), 'docs/manuscript');

/**
 * Load a book chapter's markdown content by ID.
 */
export async function getChapterContent(chapterId: string): Promise<{
  meta: BookChapter;
  content: string;
  readingTime: number;
} | null> {
  const chapter = getChapter(chapterId);
  if (!chapter) return null;

  try {
    const filePath = path.join(BOOK_PATH, chapter.sourceFile);
    const content = await fs.readFile(filePath, 'utf-8');
    return {
      meta: chapter,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    logger.error(`Error loading book chapter ${chapterId}`, { error });
    return null;
  }
}

/**
 * Strip markdown syntax from content to produce plain text for search indexing.
 */
export function getChapterPlainText(markdownContent: string): string {
  return markdownContent
    .replace(/^#{1,6}\s+/gm, '')           // headings
    .replace(/\*\*([^*]+)\*\*/g, '$1')     // bold
    .replace(/\*([^*]+)\*/g, '$1')         // italic
    .replace(/!\[.*?\]\(.*?\)/g, '')       // images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // links (keep text)
    .replace(/^>\s*/gm, '')                // blockquotes
    .replace(/```[\s\S]*?```/g, '')        // code blocks
    .replace(/`([^`]+)`/g, '$1')           // inline code
    .replace(/\|[^\n]*\|/g, '')            // tables
    .replace(/^-{3,}$/gm, '')             // horizontal rules
    .replace(/^\s*[-*+]\s+/gm, '')        // unordered list markers
    .replace(/^\s*\d+\.\s+/gm, '')        // ordered list markers
    .replace(/\n{3,}/g, '\n\n')           // excess newlines
    .trim();
}
