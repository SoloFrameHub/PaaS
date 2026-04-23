import { task } from "@trigger.dev/sdk/v3";
import { retrofitLesson } from "./retrofit-lesson";
import { getPlainTextLessons } from "./utils/lesson-io";

const CHUNK_SIZE = 10;

/**
 * Batch orchestrator: finds all plain-text lessons and triggers
 * retrofit-lesson for each one in chunks to avoid TTL expiry.
 *
 * Trigger with no payload to process ALL remaining plain-text lessons.
 * Or pass { trackId } to process only one track.
 */
export const batchRetrofit = task({
  id: "batch-retrofit",
  maxDuration: 7200, // 2 hours for full batch
  run: async (payload?: { trackId?: string; courseId?: string }) => {
    // 1. Get all plain-text lessons
    let lessons = await getPlainTextLessons();

    // Filter to specific track or course if requested
    if (payload?.trackId) {
      lessons = lessons.filter((l) => l.trackId === payload.trackId);
    }
    if (payload?.courseId) {
      lessons = lessons.filter((l) => l.courseId === payload.courseId);
    }

    console.log(`Found ${lessons.length} plain-text lessons to retrofit`);

    if (lessons.length === 0) {
      return { status: "complete", message: "No plain-text lessons found" };
    }

    // 2. Process in chunks to avoid queue TTL expiry
    const allResults: Array<{
      lesson: string;
      ok: boolean;
      output?: unknown;
      error?: string;
    }> = [];
    let totalSucceeded = 0;
    let totalFailed = 0;

    for (let i = 0; i < lessons.length; i += CHUNK_SIZE) {
      const chunk = lessons.slice(i, i + CHUNK_SIZE);
      const chunkNum = Math.floor(i / CHUNK_SIZE) + 1;
      const totalChunks = Math.ceil(lessons.length / CHUNK_SIZE);

      console.log(
        `Processing chunk ${chunkNum}/${totalChunks} (${chunk.length} lessons)`
      );

      const results = await retrofitLesson.batchTriggerAndWait(
        chunk.map((lesson) => ({
          payload: {
            trackId: lesson.trackId,
            courseId: lesson.courseId,
            lessonNum: lesson.lessonNum,
          },
          options: {
            ttl: "30m",
          },
        }))
      );

      const runs = results.runs;
      const succeeded = runs.filter((r) => r.ok).length;
      const failed = runs.filter((r) => !r.ok).length;
      totalSucceeded += succeeded;
      totalFailed += failed;

      console.log(
        `Chunk ${chunkNum}: ${succeeded} succeeded, ${failed} failed`
      );

      allResults.push(
        ...runs.map((r, idx) => ({
          lesson: `${chunk[idx].courseId}/lesson-${chunk[idx].lessonNum}`,
          ok: r.ok,
          output: r.ok ? r.output : undefined,
          error: !r.ok ? String(r.error) : undefined,
        }))
      );
    }

    console.log(
      `Batch retrofit complete: ${totalSucceeded} succeeded, ${totalFailed} failed out of ${lessons.length} total`
    );

    return {
      status: "complete",
      total: lessons.length,
      succeeded: totalSucceeded,
      failed: totalFailed,
      results: allResults,
    };
  },
});
