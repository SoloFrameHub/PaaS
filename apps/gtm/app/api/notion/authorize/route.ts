import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/with-auth";
import { notionClient } from "@/lib/notion/client";
import { randomBytes } from "crypto";

export const GET = withAuth(async (_request: NextRequest, { userId }) => {
  const state = `${userId}:${randomBytes(16).toString("hex")}`;

  const url = notionClient.getAuthorizationUrl(state);

  // Store state in a secure cookie for validation on callback
  const response = NextResponse.redirect(url);
  response.cookies.set("notion_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 minutes
    path: "/",
  });

  return response;
});
