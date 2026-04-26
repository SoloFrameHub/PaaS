import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { logger } from "./logger";

const CONTENT_PATH = path.join(process.cwd(), "server/data/content");
const CONTENT_ES_PATH = path.join(process.cwd(), "server/data/content/es");

/**
 * Calculates the estimated reading time for a block of text.
 *
 * @param content - The text content to analyze.
 * @returns The estimated reading time in minutes.
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Strips quiz JSON code blocks from markdown content.
 * Quiz data is loaded separately from dedicated JSON files.
 *
 * @param content - The markdown content to process.
 * @returns The content with quiz JSON code blocks removed.
 */
function stripQuizJson(content: string): string {
  // Find and remove ```json blocks containing "quizId"
  // Use a simple approach: find ```json, then find closing ```, check if quizId is inside
  const lines = content.split("\n");
  const result: string[] = [];
  let inJsonBlock = false;
  let jsonBlockStart = -1;
  let jsonBlockContent = "";
  let quizSectionHeaderIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for quiz section header (## Quiz: ...)
    if (/^##\s*Quiz/i.test(line.trim())) {
      quizSectionHeaderIndex = result.length;
    }

    if (line.trim().startsWith("```json")) {
      inJsonBlock = true;
      jsonBlockStart = result.length;
      jsonBlockContent = "";
      result.push(line); // Temporarily add, will remove if it's a quiz
      continue;
    }

    if (inJsonBlock) {
      jsonBlockContent += line + "\n";
      result.push(line);

      if (line.trim() === "```") {
        inJsonBlock = false;
        // Check if this JSON block contains quizId
        if (jsonBlockContent.includes('"quizId"')) {
          // Remove the entire JSON block (from start to current position)
          result.splice(jsonBlockStart, result.length - jsonBlockStart);
          // Also remove the quiz section header if it was right before
          if (
            quizSectionHeaderIndex >= 0 &&
            quizSectionHeaderIndex === jsonBlockStart - 2
          ) {
            // Remove empty line and header
            while (
              result.length > 0 &&
              result[result.length - 1].trim() === ""
            ) {
              result.pop();
            }
            if (
              result.length > 0 &&
              /^##\s*Quiz/i.test(result[result.length - 1].trim())
            ) {
              result.pop();
            }
          }
        }
        quizSectionHeaderIndex = -1;
      }
      continue;
    }

    result.push(line);
  }

  return result.join("\n");
}

/**
 * Retrieves the content and metadata for a specific lesson from the filesystem.
 * When locale is 'es', tries the Spanish translation first and falls back to English.
 *
 * @param trackId - The ID of the track.
 * @param courseId - The ID of the course.
 * @param lessonId - The ID of the lesson.
 * @param locale - Optional locale ('en' | 'es'). Defaults to 'en'.
 * @returns An object containing the lesson metadata, content, and reading time.
 */
export async function getLessonContent(
  trackId: string,
  courseId: string,
  lessonId: string,
  locale: string = "en",
) {
  const filename = `lesson-${lessonId}.md`;

  // Build candidate paths: ES first (if locale is es), then EN fallback
  const candidates: string[] =
    locale === "es"
      ? [
          path.join(CONTENT_ES_PATH, trackId, courseId, filename),
          path.join(CONTENT_PATH, trackId, courseId, filename),
        ]
      : [path.join(CONTENT_PATH, trackId, courseId, filename)];

  for (const filePath of candidates) {
    try {
      // Prevent path traversal — resolved path must stay within CONTENT_PATH.
      // Include `path.sep` to defend against the prefix-match edge case where
      // a sibling directory like `<CONTENT_PATH>_evil/` would startsWith the
      // base. (B-045 partial-mitigation hardening.)
      const resolved = path.resolve(filePath);
      const inEn =
        resolved === CONTENT_PATH ||
        resolved.startsWith(CONTENT_PATH + path.sep);
      const inEs =
        resolved === CONTENT_ES_PATH ||
        resolved.startsWith(CONTENT_ES_PATH + path.sep);
      if (!inEn && !inEs) {
        logger.error("Path traversal attempt blocked", {
          trackId,
          courseId,
          lessonId,
        });
        return null;
      }

      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const cleanedContent = stripQuizJson(content);

      return {
        meta: data,
        content: cleanedContent,
        readingTime: calculateReadingTime(cleanedContent),
        locale: inEs ? "es" : "en",
      };
    } catch {
      // File not found — try next candidate
    }
  }

  logger.error(`Error loading lesson ${lessonId} for course ${courseId}`, {
    locale,
  });
  return null;
}
