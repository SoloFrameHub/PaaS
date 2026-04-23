import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { loadQuiz, evaluateAnswers } from "@/lib/services/quizService";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { NotFoundError } from "@/lib/api/errors";
import { profileService } from "@/lib/services/profileService";
import { quizSubmissionSchema } from "@/lib/validations/academy";

async function getLocale(): Promise<string> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  return locale === "es" ? "es" : "en";
}

/**
 * GET - Load quiz for a lesson
 */
export const GET = withAuth(
  async (request: NextRequest, { userId }, context) => {
    const { sectionId, courseId, lessonId } = await context.params;
    const locale = await getLocale();
    const quiz = loadQuiz(sectionId, courseId, lessonId, locale);

    if (!quiz) {
      throw new NotFoundError("No quiz for this lesson");
    }

    return successResponse({ quiz });
  },
);

/**
 * POST - Submit quiz answers and get evaluation
 */
export const POST = withAuth(
  async (request: NextRequest, { userId }, context) => {
    const { sectionId, courseId, lessonId } = await context.params;
    const { answers } = await validateBody(request, quizSubmissionSchema);
    const locale = await getLocale();

    // Get auth context for 3D personalization
    const profile = await profileService.getProfile(userId);

    // Extract founder context from profile using existing schema
    const founderContext = profile
      ? {
          founderCategory:
            profile.questionnaire?.founder_description ??
            profile.businessModel ??
            undefined,
          industry:
            profile.questionnaire?.industry ??
            profile.inferred?.industryVertical ??
            undefined,
          targetRoles: profile.questionnaire?.target_roles,
          painPoints: profile.inferred?.commonObjections?.slice(0, 3),
        }
      : undefined;

    const result = await evaluateAnswers(
      sectionId,
      courseId,
      lessonId,
      answers,
      founderContext,
      locale,
    );

    if (!result.success) {
      throw new NotFoundError(result.error || "Failed to evaluate quiz");
    }

    // Handle progress tracking if quiz is passed
    if (result.results?.passed) {
      await profileService.updateProgress(userId, {
        completedLesson: { courseId, lessonId },
        xpEarned: 25, // Quiz XP (lesson completion awards 10)
      });
    }

    return successResponse({ results: result.results });
  },
);
