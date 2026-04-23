import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * GET /api/og?score=72&name=Alex
 * Generates a shareable OG image for readiness score results.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const score = parseInt(searchParams.get("score") || "0", 10);
  const name = searchParams.get("name") || "";

  const getColor = (s: number) => {
    if (s >= 75) return "#22c55e";
    if (s >= 50) return "#eab308";
    return "#ef4444";
  };

  const getLabel = (s: number) => {
    if (s >= 75) return "Strong";
    if (s >= 50) return "Moderate";
    if (s >= 25) return "Needs Work";
    return "Getting Started";
  };

  const color = getColor(score);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a0a 0%, #171717 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#a3a3a3",
            letterSpacing: "0.1em",
            marginBottom: 12,
          }}
        >
          {name ? `${name.toUpperCase()}'S` : "YOUR"} READINESS SCORE
        </div>
        <div
          style={{
            fontSize: 144,
            fontWeight: 800,
            color: color,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {score}
        </div>
        <div
          style={{
            fontSize: 28,
            color: color,
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          {getLabel(score)}
        </div>
        <div
          style={{
            width: 400,
            height: 8,
            background: "#262626",
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: `${score}%`,
              height: "100%",
              background: color,
              borderRadius: 4,
            }}
          />
        </div>
        <div style={{ fontSize: 18, color: "#737373", marginBottom: 4 }}>
          Customer Acquisition Readiness Assessment
        </div>
        <div style={{ fontSize: 22, color: "#e5e5e5", fontWeight: 600 }}>
          Solo GTM OS
        </div>
        <div style={{ fontSize: 14, color: "#525252", marginTop: 16 }}>
          soloframehub.com/readiness-score
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
