/**
 * POST /api/forms/submit — Public form submission endpoint (standalone)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { FORM_DEFINITIONS, getAllFields } from '@/lib/forms/definitions';
import { FORM_SCHEMAS } from '@/lib/validations/forms';
import { calculateScore } from '@/lib/forms/scoring';
import { runFormWorkflows } from '@/lib/forms/workflows';

function generateId(): string {
  return `fs_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Simple in-memory rate limiter (resets on restart, fine for forms)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  entry.count++;
  return entry.count > 10;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Honeypot
    if (body._hp_email_confirm) return NextResponse.json({ submitted: true });

    // 2. Time gate
    if (body._form_loaded_at && Date.now() - Number(body._form_loaded_at) < 3000) {
      return NextResponse.json({ submitted: true });
    }

    // 3. Rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: { message: 'Too many submissions. Please try again later.', code: 'RATE_LIMITED' } }, { status: 429 });
    }

    // 4. Validate form slug
    const formSlug = body.formSlug as string;
    if (!formSlug || !FORM_DEFINITIONS[formSlug]) {
      return NextResponse.json({ error: { message: 'Invalid form.', code: 'INVALID_FORM' } }, { status: 400 });
    }

    const formDef = FORM_DEFINITIONS[formSlug];
    const zodSchema = FORM_SCHEMAS[formSlug];
    if (!zodSchema) {
      return NextResponse.json({ error: { message: 'Form validation not configured.', code: 'INVALID_FORM' } }, { status: 400 });
    }

    // 5. Zod validation
    const parsed = zodSchema.safeParse(body.data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join('.');
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return NextResponse.json({ error: { message: 'Validation failed.', code: 'VALIDATION_ERROR', fieldErrors } }, { status: 400 });
    }

    const validatedData = parsed.data as Record<string, unknown>;
    const email = validatedData.email as string;
    const name = (validatedData.name as string) || '';

    // 6. Database
    const sql = getDb();
    if (!sql) {
      return NextResponse.json({ error: { message: 'Database unavailable.', code: 'DB_ERROR' } }, { status: 503 });
    }

    // 7. Duplicate check
    if (!formDef.settings.allowMultiple) {
      const existing = await sql`SELECT id FROM form_submission WHERE form_slug = ${formSlug} AND email = ${email} LIMIT 1`;
      if (existing.length > 0) {
        return NextResponse.json({ error: { message: "You've already submitted this form.", code: 'DUPLICATE' } }, { status: 409 });
      }
    }

    // 8. Score
    let score: number | null = null;
    let scoreBreakdown: Record<string, number> | null = null;
    if (formDef.scoring) {
      const allFields = getAllFields(formDef);
      const result = calculateScore(validatedData, formDef.scoring.rules, allFields);
      score = result.totalScore;
      scoreBreakdown = result.breakdown;
    }

    // 9. Insert
    const submissionId = generateId();
    const userAgent = request.headers.get('user-agent')?.slice(0, 500) || null;
    const utmSource = (body.utm?.source as string) || null;
    const utmMedium = (body.utm?.medium as string) || null;
    const utmCampaign = (body.utm?.campaign as string) || null;
    const referrer = (body.utm?.referrer as string) || request.headers.get('referer')?.slice(0, 500) || null;

    await sql`INSERT INTO form_submission (id, form_slug, email, name, data, score, score_breakdown, status, ip_address, user_agent, utm_source, utm_medium, utm_campaign, referrer)
      VALUES (${submissionId}, ${formSlug}, ${email}, ${name || null}, ${JSON.stringify(validatedData)}, ${score}, ${scoreBreakdown ? JSON.stringify(scoreBreakdown) : null}, 'new', ${ip}, ${userAgent}, ${utmSource}, ${utmMedium}, ${utmCampaign}, ${referrer})`;

    // 10. Workflows
    runFormWorkflows(submissionId, formSlug, formDef.title, email, name, validatedData, score, formDef.workflows);

    return NextResponse.json({
      submitted: true,
      redirectTo: formDef.settings.successRedirect || `/forms/thank-you?form=${formSlug}`,
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({ error: { message: 'Something went wrong. Please try again.', code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
