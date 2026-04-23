import { task, queue } from "@trigger.dev/sdk/v3";
import { generateContent } from "./utils/ai-content-client";
import { RETROFIT_SYSTEM_PROMPT } from "./utils/component-catalog";
import { readLesson, writeLesson, hasComponents } from "./utils/lesson-io";

/** Rate-limited queue: max 2 concurrent AI calls */
export const retrofitQueue = queue({
  name: "retrofit-queue",
  concurrencyLimit: 2,
});

export const retrofitLesson = task({
  id: "retrofit-lesson",
  queue: retrofitQueue,
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 30000,
    factor: 2,
  },
  run: async (payload: {
    trackId: string;
    courseId: string;
    lessonNum: string;
  }) => {
    const { trackId, courseId, lessonNum } = payload;
    const logPrefix = `[${courseId}/lesson-${lessonNum}]`;

    // 1. Read the lesson content
    const originalContent = await readLesson(trackId, courseId, lessonNum);

    // 2. Skip if already has components
    if (hasComponents(originalContent)) {
      return {
        status: "skipped" as const,
        reason: "already has components",
        courseId,
        lessonNum,
      };
    }

    // 3. Send to AI for enhancement
    const enhanced = await generateContent({
      systemPrompt: RETROFIT_SYSTEM_PROMPT,
      userPrompt: `Enhance this lesson with 4-8 interactive MDX components. The course ID is "${courseId}" and this is lesson ${lessonNum}. Use these for persistKey prefixes.

IMPORTANT: Return the COMPLETE file content including frontmatter. Do NOT wrap in code fences.

Here is the lesson content:

${originalContent}`,
      maxTokens: 12000,
      temperature: 0.3,
    });

    // 4. Validate the response
    const cleanContent = enhanced
      .replace(/^```(?:markdown|mdx)?\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    if (!hasComponents(cleanContent)) {
      throw new Error(`${logPrefix} AI response has no components — retrying`);
    }

    // Verify frontmatter is preserved
    if (!cleanContent.startsWith("---")) {
      throw new Error(`${logPrefix} AI response missing frontmatter — retrying`);
    }

    // 5. Count components added
    const componentMatches = cleanContent.match(/<[A-Z][a-zA-Z]+[\s/>]/g) || [];
    const componentCount = componentMatches.length;

    // 6. Write the enhanced content
    await writeLesson(trackId, courseId, lessonNum, cleanContent);

    return {
      status: "success" as const,
      courseId,
      lessonNum,
      componentCount,
      originalLength: originalContent.length,
      enhancedLength: cleanContent.length,
    };
  },
});
