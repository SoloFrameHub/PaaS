/**
 * File I/O utilities for lesson content.
 * Reads, writes, and scans lesson markdown files in server/data/content/.
 */

import fs from "fs/promises";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "server/data/content");
const RESEARCH_ROOT = path.join(process.cwd(), "server/data/research");

export interface LessonFile {
  trackId: string;
  courseId: string;
  lessonNum: string;
  filePath: string;
}

/** Check if a markdown string contains JSX component tags (PascalCase tags) */
export function hasComponents(content: string): boolean {
  // Matches <ComponentName or <ComponentName> but not HTML tags like <div>, <p>, etc.
  return /<[A-Z][a-zA-Z]+[\s/>]/.test(content);
}

/** Read a lesson file and return its content */
export async function readLesson(
  trackId: string,
  courseId: string,
  lessonNum: string
): Promise<string> {
  const filePath = path.join(CONTENT_ROOT, trackId, courseId, `lesson-${lessonNum}.md`);
  return fs.readFile(filePath, "utf-8");
}

/** Write content to a lesson file, creating directories if needed */
export async function writeLesson(
  trackId: string,
  courseId: string,
  lessonNum: string,
  content: string
): Promise<void> {
  const dir = path.join(CONTENT_ROOT, trackId, courseId);
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `lesson-${lessonNum}.md`);
  await fs.writeFile(filePath, content, "utf-8");
}

/** Check if a lesson file exists */
export async function lessonExists(
  trackId: string,
  courseId: string,
  lessonNum: string
): Promise<boolean> {
  const filePath = path.join(CONTENT_ROOT, trackId, courseId, `lesson-${lessonNum}.md`);
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/** Read a research package file */
export async function readResearch(filename: string): Promise<string> {
  const filePath = path.join(RESEARCH_ROOT, filename);
  return fs.readFile(filePath, "utf-8");
}

/** Read the design blueprint */
export async function readDesignBlueprint(): Promise<string> {
  return readResearch("design-blueprint-tracks-4-7.md");
}

/** Scan all lesson files and return those that are still plain text (no components) */
export async function getPlainTextLessons(): Promise<LessonFile[]> {
  const plainTextLessons: LessonFile[] = [];

  const tracks = await fs.readdir(CONTENT_ROOT);
  for (const trackId of tracks) {
    const trackPath = path.join(CONTENT_ROOT, trackId);
    const trackStat = await fs.stat(trackPath);
    if (!trackStat.isDirectory()) continue;

    const courses = await fs.readdir(trackPath);
    for (const courseId of courses) {
      const coursePath = path.join(trackPath, courseId);
      const courseStat = await fs.stat(coursePath);
      if (!courseStat.isDirectory()) continue;

      const files = await fs.readdir(coursePath);
      for (const file of files) {
        if (!file.startsWith("lesson-") || !file.endsWith(".md")) continue;
        const lessonNum = file.replace("lesson-", "").replace(".md", "");
        const filePath = path.join(coursePath, file);
        const content = await fs.readFile(filePath, "utf-8");

        if (!hasComponents(content)) {
          plainTextLessons.push({ trackId, courseId, lessonNum, filePath });
        }
      }
    }
  }

  return plainTextLessons;
}

/** Get all lessons for a specific track */
export async function getLessonsByTrack(trackId: string): Promise<LessonFile[]> {
  const lessons: LessonFile[] = [];
  const trackPath = path.join(CONTENT_ROOT, trackId);

  try {
    const courses = await fs.readdir(trackPath);
    for (const courseId of courses) {
      const coursePath = path.join(trackPath, courseId);
      const courseStat = await fs.stat(coursePath);
      if (!courseStat.isDirectory()) continue;

      const files = await fs.readdir(coursePath);
      for (const file of files) {
        if (!file.startsWith("lesson-") || !file.endsWith(".md")) continue;
        const lessonNum = file.replace("lesson-", "").replace(".md", "");
        lessons.push({
          trackId,
          courseId,
          lessonNum,
          filePath: path.join(coursePath, file),
        });
      }
    }
  } catch {
    // Track directory doesn't exist yet
  }

  return lessons;
}
