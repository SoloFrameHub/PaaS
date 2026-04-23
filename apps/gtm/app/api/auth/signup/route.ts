import { NextRequest, NextResponse } from "next/server";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { getLucia } from "@/lib/auth-lucia";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import {
  generateVerificationCode,
  sendVerificationCode,
} from "@/lib/email/resend";
import { isRateLimited, AUTH_RATE_LIMIT, getClientIp } from "@/lib/security";
import { logger } from "@/lib/logger";

function isEmailWhitelisted(email: string): boolean {
  const whitelist = process.env.BETA_EMAILS;
  if (!whitelist) return true; // no whitelist = open signup
  const allowed = whitelist.split(",").map((e) => e.trim().toLowerCase());
  return allowed.includes(email.toLowerCase());
}

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Auth not configured (no database)" },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const { limited } = await isRateLimited(ip, AUTH_RATE_LIMIT, "auth:signup");
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
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!password || password.length < 12) {
    return NextResponse.json(
      { error: "Password must be at least 12 characters" },
      { status: 400 },
    );
  }

  if (!isEmailWhitelisted(email)) {
    return NextResponse.json(
      { error: "Beta access is by invitation only. Contact us for access." },
      { status: 403 },
    );
  }

  const db = getDb();
  if (!db)
    return NextResponse.json(
      { error: "Database not available" },
      { status: 503 },
    );
  const existing = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .limit(1);
  if (existing.length > 0) {
    return NextResponse.json({ error: "Email already used" }, { status: 400 });
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10);
  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await db.insert(schema.user).values({
    id: userId,
    email,
    hashedPassword: passwordHash,
    emailVerified: false,
    emailVerificationCode: code,
    emailVerificationExpiresAt: expiresAt,
  });

  // Send verification email (non-blocking — don't fail signup if email fails)
  try {
    await sendVerificationCode(email, code);
  } catch (err) {
    logger.error("[signup] Failed to send verification email", { error: err });
  }

  const lucia = getLucia();
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const res = NextResponse.json({ ok: true, redirect: "/verify-email" });
  res.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return res;
}
