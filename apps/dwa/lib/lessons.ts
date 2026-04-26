import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { logger } from './logger';
import { safeResolveInside } from './utils/safe-path';

const CONTENT_PATH = path.join(process.cwd(), 'server/data/content');

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
    const lines = content.split('\n');
    const result: string[] = [];
    let inJsonBlock = false;
    let jsonBlockStart = -1;
    let jsonBlockContent = '';
    let quizSectionHeaderIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for quiz section header (## Quiz: ...)
        if (/^##\s*Quiz/i.test(line.trim())) {
            quizSectionHeaderIndex = result.length;
        }

        if (line.trim().startsWith('```json')) {
            inJsonBlock = true;
            jsonBlockStart = result.length;
            jsonBlockContent = '';
            result.push(line); // Temporarily add, will remove if it's a quiz
            continue;
        }

        if (inJsonBlock) {
            jsonBlockContent += line + '\n';
            result.push(line);

            if (line.trim() === '```') {
                inJsonBlock = false;
                // Check if this JSON block contains quizId
                if (jsonBlockContent.includes('"quizId"')) {
                    // Remove the entire JSON block
                    result.splice(jsonBlockStart);
                    // Also remove the quiz section header if it was right before
                    if (quizSectionHeaderIndex >= 0 && quizSectionHeaderIndex === jsonBlockStart - 2) {
                        // Remove empty line and header
                        while (result.length > 0 && result[result.length - 1].trim() === '') {
                            result.pop();
                        }
                        if (result.length > 0 && /^##\s*Quiz/i.test(result[result.length - 1].trim())) {
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

    return result.join('\n');
}

/**
 * Retrieves the content and metadata for a specific lesson from the filesystem.
 *
 * @param trackId - The ID of the track.
 * @param courseId - The ID of the course.
 * @param lessonId - The ID of the lesson.
 * @returns An object containing the lesson metadata, content, and reading time.
 */
export async function getLessonContent(trackId: string, courseId: string, lessonId: string) {
    const filePath = safeResolveInside(CONTENT_PATH, trackId, courseId, `lesson-${lessonId}.md`);
    if (!filePath) {
        logger.warn(`Lesson content rejected (invalid ids)`, { trackId, courseId, lessonId });
        return null;
    }
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Strip embedded quiz JSON since quizzes are loaded from separate JSON files
        const cleanedContent = stripQuizJson(content);

        return {
            meta: data,
            content: cleanedContent,
            readingTime: calculateReadingTime(cleanedContent)
        };
    } catch (error) {
        logger.error(`Error loading lesson ${lessonId} for course ${courseId}`, { error });
        return null;
    }
}
