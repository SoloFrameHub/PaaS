#!/usr/bin/env node
/**
 * Auto-translation script — EN → ES
 * Uses OpenAI (gpt-4o-mini) via existing OPENAI_API_KEY, or Anthropic if ANTHROPIC_API_KEY set
 *
 * Usage:
 *   npx tsx scripts/translate-content.ts --mode=messages   # translate messages/en.json → es.json
 *   npx tsx scripts/translate-content.ts --mode=lessons     # translate missing lesson .md files
 *   npx tsx scripts/translate-content.ts --mode=all         # both
 *   npx tsx scripts/translate-content.ts --mode=lessons --limit=20  # batch of 20
 *
 * Idempotent: skips files that already exist, merges missing keys only
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Load .env.local
const envFile = path.join(ROOT, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]])
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const CONTENT_EN = path.join(ROOT, "server/data/content");
const CONTENT_ES = path.join(ROOT, "server/data/content/es");
const MESSAGES_EN = path.join(ROOT, "messages/en.json");
const MESSAGES_ES = path.join(ROOT, "messages/es.json");

const TRANSLATION_PROMPT = `You are a professional translator specializing in Latin American Spanish for SaaS/EdTech products.

Rules:
- Translate from English to natural, conversational Latin American Spanish
- Keep ALL markdown formatting, code blocks, HTML tags exactly as-is
- Keep ALL MDX component tags (RangeSlider, InteractiveChecklist, etc.) and their props exactly as-is
- Keep technical terms, brand names (MAGNETS, DISC, ICP, GTM), and proper nouns as-is
- Use proper Spanish accents in prose (é, ó, etc.)
- Output ONLY the translated content — no explanation, no preamble`;

// ─── API client (OpenAI or Anthropic) ────────────────────────────────────────

async function callAI(prompt: string, content: string): Promise<string> {
  if (process.env.ANTHROPIC_API_KEY) {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      messages: [{ role: "user", content: `${prompt}\n\n${content}` }],
    });
    const r = msg.content[0];
    if (r.type !== "text") throw new Error("Unexpected Anthropic response");
    return r.text;
  } else if (process.env.OPENAI_API_KEY) {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content },
      ],
      temperature: 0.1,
    });
    return res.choices[0].message.content ?? "";
  } else {
    throw new Error(
      "No API key found. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.",
    );
  }
}

// ─── Mode: messages ──────────────────────────────────────────────────────────

async function translateMessages() {
  console.log("\n📝 Translating messages/en.json → messages/es.json");
  const en = JSON.parse(fs.readFileSync(MESSAGES_EN, "utf-8"));
  const existingEs = fs.existsSync(MESSAGES_ES)
    ? JSON.parse(fs.readFileSync(MESSAGES_ES, "utf-8"))
    : {};

  const toTranslate: Record<string, Record<string, string>> = {};
  for (const [ns, strings] of Object.entries(en) as [
    string,
    Record<string, string>,
  ][]) {
    const esNs = (existingEs[ns] as Record<string, string>) ?? {};
    const missing: Record<string, string> = {};
    for (const [k, v] of Object.entries(strings)) {
      if (!esNs[k]) missing[k] = v;
    }
    if (Object.keys(missing).length > 0) toTranslate[ns] = missing;
  }

  if (Object.keys(toTranslate).length === 0) {
    console.log("  ✓ All keys already translated");
    return;
  }

  const translated: Record<string, unknown> = { ...existingEs };

  for (const [ns, strings] of Object.entries(toTranslate)) {
    console.log(`  Namespace: ${ns} (${Object.keys(strings).length} keys)`);
    const raw = await callAI(
      `${TRANSLATION_PROMPT}\n\nTranslate these UI strings from English to Latin American Spanish.\nReturn ONLY valid JSON with the same keys, values translated. No explanation, no markdown fences.`,
      JSON.stringify(strings, null, 2),
    );
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error(`  ✗ Could not parse response for ${ns}`);
      continue;
    }
    const translatedNs = JSON.parse(jsonMatch[0]);
    translated[ns] = { ...((existingEs[ns] as object) ?? {}), ...translatedNs };
  }

  fs.writeFileSync(MESSAGES_ES, JSON.stringify(translated, null, 2) + "\n");
  console.log("  ✓ Written to messages/es.json");
}

// ─── Mode: lessons ───────────────────────────────────────────────────────────

function findEnglishLessons(): string[] {
  const lessons: string[] = [];
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== "es") walk(full);
      else if (entry.isFile() && entry.name.endsWith(".md")) lessons.push(full);
    }
  }
  walk(CONTENT_EN);
  return lessons;
}

function spanishPath(englishPath: string): string {
  return path.join(CONTENT_ES, path.relative(CONTENT_EN, englishPath));
}

async function translateLessons(limit?: number) {
  console.log("\n📚 Translating missing lesson files EN → ES");
  const all = findEnglishLessons();
  const missing = all.filter((f) => !fs.existsSync(spanishPath(f)));

  console.log(
    `  ${all.length} English lessons total, ${missing.length} missing Spanish`,
  );
  const batch = limit ? missing.slice(0, limit) : missing;
  console.log(`  Processing ${batch.length} files...\n`);

  let done = 0,
    errors = 0;

  for (const src of batch) {
    const dest = spanishPath(src);
    const rel = path.relative(ROOT, src);
    try {
      const content = fs.readFileSync(src, "utf-8");
      if (content.trim().length < 100) {
        console.log(`  ⚡ Skip (stub): ${rel}`);
        continue;
      }
      process.stdout.write(`  → ${rel} ... `);
      const translated = await callAI(
        `${TRANSLATION_PROMPT}\n\nTranslate this educational lesson markdown file to Latin American Spanish.\nOutput ONLY the translated markdown — no explanation.`,
        content,
      );
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, translated);
      console.log("✓");
      done++;
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`✗ ${err}`);
      errors++;
    }
  }

  console.log(`\n  Done: ${done} translated, ${errors} errors`);
  if (missing.length > batch.length) {
    const remaining = missing.length - batch.length;
    console.log(`  ${remaining} files remaining — run again to continue`);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const mode =
  args.find((a) => a.startsWith("--mode="))?.replace("--mode=", "") ?? "all";
const limit = args
  .find((a) => a.startsWith("--limit="))
  ?.replace("--limit=", "");
const provider = process.env.ANTHROPIC_API_KEY
  ? "Anthropic (claude-haiku-4-5-20251001)"
  : "OpenAI (gpt-4o-mini)";

console.log(`🌎 SoloFrameHub Translation Script`);
console.log(`   mode: ${mode} | provider: ${provider}`);

async function main() {
  if (mode === "messages" || mode === "all") await translateMessages();
  if (mode === "lessons" || mode === "all")
    await translateLessons(limit ? parseInt(limit) : undefined);
  console.log("\n✅ Done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
