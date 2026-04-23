import { NextRequest, NextResponse } from "next/server";
import { getLucia } from "@/lib/auth-lucia";
import { getDb, schema } from "@/lib/db";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import {
  generateVerificationCode,
  sendVerificationCode,
} from "@/lib/email/resend";
import { isRateLimited, AUTH_RATE_LIMIT, getClientIp } from "@/lib/security";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Auth not configured (no database)" },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const { limited } = await isRateLimited(ip, AUTH_RATE_LIMIT, "auth:signin");
  if (limited) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!password || password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 },
    );
  }

  const db = getDb();
  if (!db)
    return NextResponse.json(
      { error: "Database not available" },
      { status: 503 },
    );
  const users = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .limit(1);
  const user = users[0];
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 400 },
    );
  }
  const valid = await verify(user.hashedPassword, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 400 },
    );
  }

  const lucia = getLucia();
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  let redirect = "/dashboard";

  // If email not verified, resend a code and redirect to verification
  if (!user.emailVerified) {
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await db
      .update(schema.user)
      .set({
        emailVerificationCode: code,
        emailVerificationExpiresAt: expiresAt,
      })
      .where(eq(schema.user.id, user.id));
    try {
      await sendVerificationCode(email, code);
    } catch (err) {
      logger.error("[signin] Failed to send verification email", {
        error: err,
      });
    }
    redirect = "/verify-email";
  }

  const res = NextResponse.json({ ok: true, redirect });
  res.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return res;
}
