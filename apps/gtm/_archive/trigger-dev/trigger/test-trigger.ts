/**
 * Trigger individual retrofit tasks for remaining plain-text lessons.
 * Avoids batchTriggerAndWait stalling issue by using fire-and-forget triggers.
 * Run with: TRIGGER_SECRET_KEY=tr_dev_... npx tsx trigger/test-trigger.ts
 */
import { tasks, runs } from "@trigger.dev/sdk/v3";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

const CONTENT_DIR = join(process.cwd(), "server/data/content");
const CONCURRENCY = 2;

async function getPlainTextLessons() {
  const results: Array<{ trackId: string; courseId: string; lessonNum: string }> = [];
  const tracks = await readdir(CONTENT_DIR);

  for (const trackId of tracks) {
    const trackPath = join(CONTENT_DIR, trackId);
    let courses: string[];
    try { courses = await readdir(trackPath); } catch { continue; }

    for (const courseId of courses) {
      const coursePath = join(trackPath, courseId);
      let files: string[];
      try { files = await readdir(coursePath); } catch { continue; }

      for (const file of files) {
        if (!file.startsWith("lesson-") || !file.endsWith(".md")) continue;
        const content = await readFile(join(coursePath, file), "utf-8");
        if (/<[A-Z][a-zA-Z]+[\s/>]/.test(content)) continue; // already has components

        const lessonNum = file.replace("lesson-", "").replace(".md", "");
        results.push({ trackId, courseId, lessonNum });
      }
    }
  }
  return results;
}

async function main() {
  const lessons = await getPlainTextLessons();
  console.log(`Found ${lessons.length} plain-text lessons to retrofit`);

  if (lessons.length === 0) {
    console.log("All lessons already have components!");
    return;
  }

  // Fire off all tasks (the queue concurrency limit of 2 handles throttling)
  const handles = [];
  for (const lesson of lessons) {
    const handle = await tasks.trigger("retrofit-lesson", {
      trackId: lesson.trackId,
      courseId: lesson.courseId,
      lessonNum: lesson.lessonNum,
    }, {
      ttl: "30m",
    });
    handles.push({ ...lesson, runId: handle.id });
    console.log(`Triggered: ${lesson.courseId}/lesson-${lesson.lessonNum} → ${handle.id}`);
  }

  console.log(`\nAll ${handles.length} tasks triggered. Polling for completion...`);

  // Poll until all complete
  let completed = 0;
  let succeeded = 0;
  let failed = 0;
  const pending = new Set(handles.map(h => h.runId));

  while (pending.size > 0) {
    await new Promise(r => setTimeout(r, 15000)); // check every 15s

    for (const runId of Array.from(pending)) {
      try {
        const run = await runs.retrieve(runId);
        if (run.isCompleted) {
          pending.delete(runId);
          completed++;
          if (run.isSuccess) {
            succeeded++;
            console.log(`✓ ${runId} succeeded (${completed}/${handles.length})`);
          } else {
            failed++;
            console.log(`✗ ${runId} failed: ${run.error?.message} (${completed}/${handles.length})`);
          }
        }
      } catch (e) {
        // API error, skip this check
      }
    }

    console.log(`  Progress: ${completed}/${handles.length} complete (${succeeded} ok, ${failed} fail, ${pending.size} pending)`);
  }

  console.log(`\nDone! ${succeeded} succeeded, ${failed} failed out of ${handles.length} total`);
}

main().catch(console.error);
