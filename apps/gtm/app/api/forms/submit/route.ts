/**
 * POST /api/forms/submit — Public form submission endpoint
 *
 * Handles honeypot, time gate, rate limiting, Zod validation,
 * duplicate check, scoring, DB insert, and workflow triggers.
 */

import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/lib/db";
import { requireTenantContext } from "@platform/tenancy";
import { withTenantApp } from "@/lib/db/with-tenant";
import { isRateLimited } from "@/lib/security";
import { logger } from "@/lib/logger";
import { FORM_DEFINITIONS, getAllFields } from "@/lib/forms/definitions";
import { FORM_SCHEMAS } from "@/lib/validations/forms";
import { calculateScore } from "@/lib/forms/scoring";
import { runFormWorkflows } from "@/lib/forms/workflows";
import { eq, and } from "drizzle-orm";

const FORM_RATE_LIMIT = { limit: 10, windowMs: 15 * 60 * 1000 }; // 10 per 15 min per IP

function generateId(): string {
  return `fs_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Honeypot check — silent success
    if (body._hp_email_confirm) {
      return NextResponse.json({ submitted: true });
    }

    // 2. Time gate — reject if <3 seconds since page load
    if (
      body._form_loaded_at &&
      Date.now() - Number(body._form_loaded_at) < 3000
    ) {
      return NextResponse.json({ submitted: true });
    }

    // 3. Rate limit
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const { limited } = await isRateLimited(ip, FORM_RATE_LIMIT, "forms");
    if (limited) {
      return NextResponse.json(
        {
          error: {
            message: "Too many submissions. Please try again later.",
            code: "RATE_LIMITED",
          },
        },
        { status: 429 },
      );
    }

    // 4. Validate form slug
    const formSlug = body.formSlug as string;
    if (!formSlug || !FORM_DEFINITIONS[formSlug]) {
      return NextResponse.json(
        { error: { message: "Invalid form.", code: "INVALID_FORM" } },
        { status: 400 },
      );
    }

    const formDef = FORM_DEFINITIONS[formSlug];
    const zodSchema = FORM_SCHEMAS[formSlug];
    if (!zodSchema) {
      return NextResponse.json(
        {
          error: {
            message: "Form validation not configured.",
            code: "INVALID_FORM",
          },
        },
        { status: 400 },
      );
    }

    // 5. Zod validation
    const parsed = zodSchema.safeParse(body.data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return NextResponse.json(
        {
          error: {
            message: "Validation failed.",
            code: "VALIDATION_ERROR",
            fieldErrors,
          },
        },
        { status: 400 },
      );
    }

    const validatedData = parsed.data as Record<string, unknown>;
    const email = validatedData.email as string;
    const name = (validatedData.name as string) || "";

    // 6. Resolve tenant context. This is a public, pre-auth route (the
    // visitor has no session yet), so `requireMembership: false` — the
    // membership gate would have nothing to check. The tenant is derived
    // from the host header by middleware.
    const ctx = await requireTenantContext(request, {
      requireMembership: false,
    });

    // 7. Calculate score (pure compute — outside the tx)
    let score: number | null = null;
    let scoreBreakdown: Record<string, number> | null = null;

    if (formDef.scoring) {
      const allFields = getAllFields(formDef);
      const result = calculateScore(
        validatedData,
        formDef.scoring.rules,
        allFields,
      );
      score = result.totalScore;
      scoreBreakdown = result.breakdown;
    }

    // 8. Duplicate check + insert in one tenant tx
    const submissionId = generateId();
    const duplicate = await withTenantApp(ctx, async (tx) => {
      if (!formDef.settings.allowMultiple) {
        const existing = await tx
          .select({ id: schema.formSubmission.id })
          .from(schema.formSubmission)
          .where(
            and(
              eq(schema.formSubmission.formSlug, formSlug),
              eq(schema.formSubmission.email, email),
            ),
          )
          .limit(1);

        if (existing.length > 0) return true;
      }

      await tx.insert(schema.formSubmission).values({
        id: submissionId,
        formSlug,
        email,
        name: name || null,
        data: validatedData,
        score,
        scoreBreakdown,
        status: "new",
        ipAddress: ip,
        userAgent: request.headers.get("user-agent")?.slice(0, 500) || null,
        utmSource: (body.utm?.source as string) || null,
        utmMedium: (body.utm?.medium as string) || null,
        utmCampaign: (body.utm?.campaign as string) || null,
        referrer:
          (body.utm?.referrer as string) ||
          request.headers.get("referer")?.slice(0, 500) ||
          null,
      });

      return false;
    });

    if (duplicate) {
      return NextResponse.json(
        {
          error: {
            message: "You've already submitted this form.",
            code: "DUPLICATE",
          },
        },
        { status: 409 },
      );
    }

    // 9. Fire workflows (non-blocking)
    runFormWorkflows(
      submissionId,
      formSlug,
      email,
      name,
      validatedData,
      formDef.workflows,
    );

    return NextResponse.json({
      submitted: true,
      redirectTo:
        formDef.settings.successRedirect || `/forms/thank-you?form=${formSlug}`,
      score: score ?? undefined,
      scoreBreakdown: scoreBreakdown ?? undefined,
      submissionId,
    });
  } catch (error) {
    logger.error("Form submission error", { error });
    return NextResponse.json(
      {
        error: {
          message: "Something went wrong. Please try again.",
          code: "SERVER_ERROR",
        },
      },
      { status: 500 },
    );
  }
}
