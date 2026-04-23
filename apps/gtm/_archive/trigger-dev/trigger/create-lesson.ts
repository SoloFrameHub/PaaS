import { task, queue } from "@trigger.dev/sdk/v3";
import { generateContent } from "./utils/ai-content-client";
import { CREATE_LESSON_SYSTEM_PROMPT } from "./utils/component-catalog";
import {
  writeLesson,
  lessonExists,
  readResearch,
  readDesignBlueprint,
  hasComponents,
} from "./utils/lesson-io";

/** Rate-limited queue: max 1 concurrent creation (lessons build on each other) */
export const createQueue = queue({
  name: "create-queue",
  concurrencyLimit: 1,
});

/** Map of course number → research file name */
const RESEARCH_FILES: Record<number, string> = {
  21: "course-21-ai-acquisition-strategy.md",
  22: "course-22-email-deliverability.md",
  23: "course-23-ai-lead-research.md",
  24: "course-24-ai-outreach-automation.md",
  25: "course-25-linkedin-ai.md",
  26: "course-26-autonomous-sdr.md",
  27: "course-27-custom-ai-agents.md",
  28: "course-28-creator-sales-mindset.md",
  36: "course-36-customer-onboarding.md",
  37: "course-37-retention-churn.md",
  38: "course-38-expansion-upsell.md",
  39: "course-39-customer-advocacy.md",
  40: "course-40-crm-setup.md",
  41: "course-41-sales-analytics.md",
  42: "course-42-sales-automation.md",
  43: "course-43-outsourcing-vas.md",
  44: "course-44-sales-playbook.md",
  45: "course-45-scaling-first-hire.md",
  46: "course-46-sales-legal.md",
  47: "course-47-sales-finance.md",
  48: "course-48-capstone.md",
};

/** Map of course number → track ID for file system paths */
const COURSE_TRACK_MAP: Record<number, string> = {
  21: "ai-acquisition",
  22: "ai-acquisition",
  23: "ai-acquisition",
  24: "ai-acquisition",
  25: "ai-acquisition",
  26: "ai-acquisition",
  27: "ai-acquisition",
  // Course 28 already exists in creator-track — skip
  36: "customer-success",
  37: "customer-success",
  38: "customer-success",
  39: "customer-success",
  40: "operations-systems",
  41: "operations-systems",
  42: "operations-systems",
  43: "operations-systems",
  44: "operations-systems",
  45: "operations-systems",
  46: "operations-systems",
  47: "operations-systems",
  48: "operations-systems",
};

export const createLesson = task({
  id: "create-lesson",
  queue: createQueue,
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 30000,
    factor: 2,
  },
  run: async (payload: {
    courseNumber: number;
    courseId: string;
    courseTitle: string;
    trackId: string;
    trackTitle: string;
    lessonNum: string;
    lessonTitle: string;
    lessonDuration: string;
    courseOutcomes: string[];
    totalLessonsInCourse: number;
  }) => {
    const {
      courseNumber,
      courseId,
      courseTitle,
      trackId,
      trackTitle,
      lessonNum,
      lessonTitle,
      lessonDuration,
      courseOutcomes,
      totalLessonsInCourse,
    } = payload;

    const logPrefix = `[${courseId}/lesson-${lessonNum}]`;

    // 1. Skip if lesson already exists
    const fsTrackId = COURSE_TRACK_MAP[courseNumber] || trackId;
    if (await lessonExists(fsTrackId, courseId, lessonNum)) {
      return {
        status: "skipped" as const,
        reason: "lesson file already exists",
        courseId,
        lessonNum,
      };
    }

    // 2. Read research package
    const researchFile = RESEARCH_FILES[courseNumber];
    let research = "";
    if (researchFile) {
      try {
        research = await readResearch(researchFile);
      } catch {
        console.warn(`${logPrefix} No research file found: ${researchFile}`);
      }
    }

    // 3. Read design blueprint
    let blueprint = "";
    try {
      blueprint = await readDesignBlueprint();
    } catch {
      console.warn(`${logPrefix} No design blueprint found`);
    }

    // 4. Build the user prompt
    const userPrompt = `Create lesson ${lessonNum} of ${totalLessonsInCourse} for this course.

## Lesson Details
- **Title:** ${lessonTitle}
- **Duration:** ${lessonDuration}
- **Course:** ${courseTitle} (Course ${courseNumber})
- **Track:** ${trackTitle}
- **Course ID (for persistKey):** ${courseId}

## Course Outcomes (this lesson should contribute to these)
${courseOutcomes.map((o) => `- ${o}`).join("\n")}

## Research Package
${research ? research.slice(0, 30000) : "No research package available. Use your knowledge of the topic to create comprehensive, accurate content."}

## Design Blueprint
${blueprint ? blueprint.slice(0, 5000) : "Follow the 4 Building Blocks pattern: Concept Capsule → Guided Build → Simulation/Roleplay → Implementation Sprint."}

Generate the complete lesson file with frontmatter, engaging content, and 5-10 interactive components baked in. The frontmatter should use:
- title: "${lessonTitle}"
- duration: "${lessonDuration}"
- track: "${trackTitle}"
- course: "${courseTitle}"
- lesson: ${lessonNum}`;

    // 5. Generate lesson content
    const content = await generateContent({
      systemPrompt: CREATE_LESSON_SYSTEM_PROMPT,
      userPrompt,
      maxTokens: 16384,
      temperature: 0.4,
    });

    // 6. Clean and validate
    const cleanContent = content
      .replace(/^```(?:markdown|mdx)?\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    if (!hasComponents(cleanContent)) {
      throw new Error(`${logPrefix} Generated lesson has no components — retrying`);
    }

    if (!cleanContent.startsWith("---")) {
      throw new Error(`${logPrefix} Generated lesson missing frontmatter — retrying`);
    }

    // 7. Count components
    const componentMatches = cleanContent.match(/<[A-Z][a-zA-Z]+[\s/>]/g) || [];

    // 8. Write the lesson file
    await writeLesson(fsTrackId, courseId, lessonNum, cleanContent);

    return {
      status: "success" as const,
      courseId,
      lessonNum,
      lessonTitle,
      componentCount: componentMatches.length,
      contentLength: cleanContent.length,
    };
  },
});
