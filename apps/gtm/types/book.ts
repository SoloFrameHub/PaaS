/**
 * Book & Manuscript Types
 */

export interface BookPart {
  id: string;
  number: number;
  title: string;
  description: string;
  chapters: BookChapter[];
}

export interface BookChapter {
  id: string;
  slug: string;
  title: string;
  description: string;
  partId: string;
  order: number;
  type: 'front-matter' | 'chapter' | 'appendix' | 'back-matter';
  isFree: boolean;
  sourceFile: string;
}

export interface BookSearchResult {
  chapterId: string;
  chapterTitle: string;
  slug: string;
  snippet: string;
  rank: number;
  isFree: boolean;
}
