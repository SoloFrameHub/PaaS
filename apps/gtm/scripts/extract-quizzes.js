#!/usr/bin/env node

/**
 * Extract embedded quiz JSON from lesson markdown files and create
 * separate quiz JSON files in the proper directory structure.
 *
 * Targets tracks: ai-acquisition, customer-success, operations-systems
 * Output: server/data/quizzes/{trackId}/{courseId}/lesson-{lessonId}.json
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(PROJECT_ROOT, "server/data/content");
const QUIZZES_DIR = path.join(PROJECT_ROOT, "server/data/quizzes");

const TRACKS = ["ai-acquisition", "customer-success", "operations-systems"];

let totalExtracted = 0;
let totalSkipped = 0;
const results = [];

for (const trackId of TRACKS) {
  const trackContentDir = path.join(CONTENT_DIR, trackId);

  if (!fs.existsSync(trackContentDir)) {
    console.warn(`[WARN] Track content dir not found: ${trackContentDir}`);
    continue;
  }

  const courses = fs
    .readdirSync(trackContentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const courseId of courses) {
    const courseDir = path.join(trackContentDir, courseId);
    const lessonFiles = fs
      .readdirSync(courseDir)
      .filter((f) => /^lesson-\d+\.md$/.test(f))
      .sort((a, b) => {
        const numA = parseInt(a.match(/lesson-(\d+)/)[1]);
        const numB = parseInt(b.match(/lesson-(\d+)/)[1]);
        return numA - numB;
      });

    for (const lessonFile of lessonFiles) {
      const lessonMatch = lessonFile.match(/^lesson-(\d+)\.md$/);
      if (!lessonMatch) continue;

      const lessonId = lessonMatch[1];
      const filePath = path.join(courseDir, lessonFile);
      const content = fs.readFileSync(filePath, "utf-8");

      // Find the ## Quiz heading (match only on the same line, [: ]* not \s to avoid newlines)
      const quizHeadingMatch = content.match(/^## Quiz[: ]*(.*)/m);
      if (!quizHeadingMatch) {
        // No quiz in this lesson
        continue;
      }

      const rawTitle = quizHeadingMatch[1].trim();
      const quizTitle =
        rawTitle && !rawTitle.startsWith("```")
          ? rawTitle
          : `Lesson ${lessonId} Quiz`;

      // Find the JSON code block after the quiz heading
      const headingIndex = content.indexOf(quizHeadingMatch[0]);
      const afterHeading = content.slice(headingIndex);

      // Match the ```json ... ``` block (some files are missing the closing ```)
      let jsonBlockMatch = afterHeading.match(/```json\s*\n([\s\S]*?)```/);
      if (!jsonBlockMatch) {
        // Try matching ```json block that runs to end of file (no closing fence)
        jsonBlockMatch = afterHeading.match(/```json\s*\n([\s\S]*)$/);
      }
      if (!jsonBlockMatch) {
        console.warn(
          `[WARN] Found Quiz heading but no JSON block in ${filePath}`,
        );
        totalSkipped++;
        continue;
      }

      const jsonStr = jsonBlockMatch[1].trim();

      let quizData;
      try {
        quizData = JSON.parse(jsonStr);
      } catch (err) {
        console.error(`[ERROR] Invalid JSON in ${filePath}: ${err.message}`);
        totalSkipped++;
        continue;
      }

      // Extract questions - handle both {questions: [...]} and direct array
      const questions = Array.isArray(quizData) ? quizData : quizData.questions;

      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        console.warn(`[WARN] No questions found in quiz JSON in ${filePath}`);
        totalSkipped++;
        continue;
      }

      // Build the output quiz object
      const outputQuiz = {
        lessonId: lessonId,
        courseId: courseId,
        sectionId: trackId,
        title: quizTitle,
        passingScore: 70,
        questions: questions,
      };

      // Create output directory
      const outputDir = path.join(QUIZZES_DIR, trackId, courseId);
      fs.mkdirSync(outputDir, { recursive: true });

      // Write the quiz file
      const outputPath = path.join(outputDir, `lesson-${lessonId}.json`);
      fs.writeFileSync(
        outputPath,
        JSON.stringify(outputQuiz, null, 4) + "\n",
        "utf-8",
      );

      totalExtracted++;
      results.push({
        track: trackId,
        course: courseId,
        lesson: lessonId,
        title: quizTitle,
        questionCount: questions.length,
        outputPath: path.relative(PROJECT_ROOT, outputPath),
      });

      console.log(
        `[OK] ${trackId}/${courseId}/lesson-${lessonId} -> ${questions.length} questions ("${quizTitle}")`,
      );
    }
  }
}

console.log("\n--- Summary ---");
console.log(`Total quizzes extracted: ${totalExtracted}`);
console.log(`Skipped (errors/no-json): ${totalSkipped}`);

console.log("\nBy track:");
for (const trackId of TRACKS) {
  const trackResults = results.filter((r) => r.track === trackId);
  console.log(`  ${trackId}: ${trackResults.length} quizzes`);

  // Group by course
  const byCourse = {};
  for (const r of trackResults) {
    if (!byCourse[r.course]) byCourse[r.course] = [];
    byCourse[r.course].push(r);
  }
  for (const [course, items] of Object.entries(byCourse)) {
    const lessons = items.map((i) => i.lesson).join(", ");
    console.log(`    ${course}: lessons ${lessons}`);
  }
}
