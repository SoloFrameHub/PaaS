/**
 * scripts/seed-embeddings.ts
 *
 * Seeds the content_embedding table with chunks from:
 *   - All 592 lesson files (therapeutic + optimization schools)
 *   - All course descriptions + lesson lists
 *   - All clinical assessments (GAD-7, PHQ-9, etc.)
 *
 * Run once (or re-run to refresh after content changes):
 *   npx tsx scripts/seed-embeddings.ts
 *
 * Requires: DATABASE_URL, OPENAI_API_KEY
 */

import 'dotenv/config';
import { upsertEmbedding, type ContentChunk } from '../lib/ai/rag';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// We import the raw JS data files directly to avoid Next.js module resolution
const curriculumData = require('../server/data/curriculumData.js');
const assessmentFiles = [
  'gad7', 'phq9', 'phq2', 'pdss-sr',
  'anger-self-check', 'ocd-self-check', 'insomnia-severity-check',
  'grief-experience-check', 'burnout-self-check', 'perfectionism-self-check',
  'bipolar-mood-check', 'emotional-dysregulation-check',
];

// ─── Build chunks from curriculum data ───────────────────────────────────────

function buildCurriculumChunks(): ContentChunk[] {
  const chunks: ContentChunk[] = [];

  // Flatten tracks → courses
  const tracks: any[] = Array.isArray(curriculumData)
    ? curriculumData
    : (curriculumData.CURRICULUM ?? curriculumData.default ?? []);

  for (const track of tracks) {
    for (const course of (track.courses ?? [])) {
      // Chunk 0: Course overview
      const outcomesList = (course.outcomes ?? []).join('\n- ');
      chunks.push({
        sourceType: 'course',
        sourceId:   course.id,
        chunkIndex: 0,
        title:      `${course.title} — Course Overview`,
        body: [
          `Track: ${track.title}`,
          `Description: ${course.description}`,
          `Clinical framework: ${course.clinicalFramework ?? 'N/A'}`,
          `Evidence: ${course.evidenceBadge ?? 'N/A'}`,
          `Duration: ${course.duration ?? 'N/A'}`,
          `Learning outcomes:\n- ${outcomesList}`,
        ].join('\n'),
        metadata: {
          trackId:          track.id,
          courseId:         course.id,
          clinicalFramework: course.clinicalFramework,
        },
      });

      // Chunk per lesson
      for (const lesson of (course.lessons ?? [])) {
        chunks.push({
          sourceType: 'course',
          sourceId:   course.id,
          chunkIndex: parseInt(lesson.id, 10) || 0,
          title:      `${course.title} — Lesson ${lesson.id}: ${lesson.title}`,
          body: [
            `Course: ${course.title}`,
            `Lesson: ${lesson.title}`,
            `Duration: ${lesson.duration ?? 'N/A'}`,
            `Clinical framework: ${course.clinicalFramework ?? 'N/A'}`,
          ].join('\n'),
          metadata: {
            trackId:  track.id,
            courseId: course.id,
            lessonId: lesson.id,
          },
        });
      }
    }
  }

  return chunks;
}

// ─── Build chunks from ALL lesson MDX/MD files ────────────────────────────────

function buildLessonChunks(): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  const contentRoot = join(__dirname, '../server/data/content');

  // Helper: recursively find all .md/.mdx files
  function findLessonFiles(dir: string): string[] {
    const files: string[] = [];
    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findLessonFiles(fullPath));
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  // Helper: extract text from MDX (strip components, keep content)
  function extractText(content: string): string {
    return content
      // Remove import statements
      .replace(/^import\s+.*$/gm, '')
      // Remove JSX components (opening/closing tags)
      .replace(/<[^>]+>/g, '')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`[^`]+`/g, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Helper: chunk text into ~500-word segments
  function chunkText(text: string, maxWords = 500): string[] {
    const words = text.split(/\s+/);
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += maxWords) {
      chunks.push(words.slice(i, i + maxWords).join(' '));
    }

    return chunks;
  }

  // Helper: parse file path to extract metadata
  function parseFilePath(filePath: string): { school: string; track: string; course: string; lesson: string } {
    const relativePath = filePath.replace(contentRoot + '/', '');
    const parts = relativePath.split('/');

    // Two possible structures:
    // 1. optimization/{pillar}/{course}/lesson-X.md
    // 2. {track}/{course}/lesson-X.md

    if (parts[0] === 'optimization') {
      return {
        school: 'optimization',
        track: parts[1] || 'unknown',
        course: parts[2] || 'unknown',
        lesson: parts[3]?.replace(/\.(md|mdx)$/, '') || 'unknown',
      };
    } else {
      return {
        school: 'therapeutic',
        track: parts[0] || 'unknown',
        course: parts[1] || 'unknown',
        lesson: parts[2]?.replace(/\.(md|mdx)$/, '') || 'unknown',
      };
    }
  }

  const lessonFiles = findLessonFiles(contentRoot);
  console.log(`  Found ${lessonFiles.length} lesson files to process...\n`);

  for (const filePath of lessonFiles) {
    try {
      const raw = readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content } = matter(raw);
      const metadata = parseFilePath(filePath);

      const title = frontmatter.title || metadata.lesson;
      const extractedText = extractText(content);
      const textChunks = chunkText(extractedText);

      // Create a chunk for each text segment
      textChunks.forEach((chunkText, idx) => {
        chunks.push({
          sourceType: 'lesson',
          sourceId: `${metadata.school}/${metadata.track}/${metadata.course}/${metadata.lesson}`,
          chunkIndex: idx,
          title: `${title} (Part ${idx + 1}/${textChunks.length})`,
          body: chunkText,
          metadata: {
            school: metadata.school,
            track: metadata.track,
            course: metadata.course,
            lesson: metadata.lesson,
            framework: frontmatter.framework || frontmatter.clinicalFramework || null,
            duration: frontmatter.duration || null,
          },
        });
      });
    } catch (err) {
      console.warn(`  ⚠ Could not process ${filePath}: ${(err as Error).message}`);
    }
  }

  return chunks;
}

// ─── Build chunks from assessment JSON files ──────────────────────────────────

function buildAssessmentChunks(): ContentChunk[] {
  const chunks: ContentChunk[] = [];

  for (const name of assessmentFiles) {
    let data: any;
    try {
      data = require(`../server/data/assessments/${name}.json`);
    } catch {
      console.warn(`  ⚠ Could not load assessment: ${name}`);
      continue;
    }

    const questions = (data.questions ?? data.items ?? [])
      .map((q: any, i: number) => `${i + 1}. ${q.text ?? q.question ?? ''}`)
      .join('\n');

    chunks.push({
      sourceType: 'assessment',
      sourceId:   name,
      chunkIndex: 0,
      title:      data.title ?? name.toUpperCase(),
      body: [
        `Assessment: ${data.title ?? name}`,
        data.description ? `Description: ${data.description}` : '',
        data.clinicalUse ? `Clinical use: ${data.clinicalUse}` : '',
        questions ? `Questions:\n${questions}` : '',
        data.scoring ? `Scoring: ${JSON.stringify(data.scoring)}` : '',
      ].filter(Boolean).join('\n'),
      metadata: { assessmentId: name },
    });
  }

  return chunks;
}

// ─── Clinical reference chunks ────────────────────────────────────────────────

const CLINICAL_CHUNKS: ContentChunk[] = [
  {
    sourceType: 'clinical',
    sourceId: 'cbt-overview',
    chunkIndex: 0,
    title: 'Cognitive Behavioral Therapy (CBT) — Clinical Overview',
    body: `CBT is a structured, goal-oriented psychotherapy that examines the relationship between thoughts, feelings, and behaviors.
Key techniques: cognitive restructuring, behavioral activation, exposure and response prevention, thought records.
Typical duration: 12-20 sessions.
Evidence base: Strong RCT support for anxiety, depression, OCD, PTSD, insomnia.
Common tools assigned as homework: thought records, behavioral experiments, exposure hierarchies.`,
    metadata: { framework: 'CBT' },
  },
  {
    sourceType: 'clinical',
    sourceId: 'dbt-overview',
    chunkIndex: 0,
    title: 'Dialectical Behavior Therapy (DBT) — Clinical Overview',
    body: `DBT combines CBT with mindfulness and acceptance strategies.
Core skill modules: Mindfulness, Distress Tolerance, Emotion Regulation, Interpersonal Effectiveness.
Primary indication: Borderline Personality Disorder, emotional dysregulation, suicidality, self-harm.
Format: individual therapy + skills group.
Key concepts: dialectics, radical acceptance, chain analysis.`,
    metadata: { framework: 'DBT' },
  },
  {
    sourceType: 'clinical',
    sourceId: 'crisis-protocols',
    chunkIndex: 0,
    title: 'Crisis Intervention Protocols',
    body: `Crisis escalation indicators: PHQ-9 item 9 score > 0, distress classifier confidence > 0.8 at "crisis" level.
Safe messaging: explore intent, means, plan, timeline.
Crisis resources: 988 Suicide & Crisis Lifeline (call/text), Crisis Text Line (text HOME to 741741).
Provider action steps: (1) Assess immediate safety, (2) Reduce access to means, (3) Connect to higher level of care if needed.
Document everything for HIPAA audit trail.`,
    metadata: { category: 'crisis' },
  },
  {
    sourceType: 'clinical',
    sourceId: 'phq9-interpretation',
    chunkIndex: 0,
    title: 'PHQ-9 Scoring and Clinical Interpretation',
    body: `PHQ-9 total score ranges:
0-4: None/minimal depression
5-9: Mild depression
10-14: Moderate depression
15-19: Moderately severe depression
20-27: Severe depression
Item 9 (suicidal ideation): Any score > 0 warrants immediate clinical assessment.
Minimum clinically important difference (MCID): 5-point change.
Use for: screening, severity tracking, treatment response monitoring.`,
    metadata: { assessment: 'PHQ-9' },
  },
  {
    sourceType: 'clinical',
    sourceId: 'gad7-interpretation',
    chunkIndex: 0,
    title: 'GAD-7 Scoring and Clinical Interpretation',
    body: `GAD-7 total score ranges:
0-4: Minimal anxiety
5-9: Mild anxiety
10-14: Moderate anxiety
15-21: Severe anxiety
Cutoff for GAD diagnosis: score ≥ 10 (sensitivity 89%, specificity 82%).
Useful for: GAD screening, panic disorder, social anxiety, PTSD.
MCID: 4-point change indicates clinically meaningful improvement.`,
    metadata: { assessment: 'GAD-7' },
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔧 Seeding content embeddings...\n');

  const lessonChunks = buildLessonChunks();
  const curriculumChunks = buildCurriculumChunks();
  const assessmentChunks = buildAssessmentChunks();
  const allChunks = [...lessonChunks, ...curriculumChunks, ...assessmentChunks, ...CLINICAL_CHUNKS];

  console.log(`  Lesson chunks:      ${lessonChunks.length}`);
  console.log(`  Curriculum chunks:  ${curriculumChunks.length}`);
  console.log(`  Assessment chunks:  ${assessmentChunks.length}`);
  console.log(`  Clinical chunks:    ${CLINICAL_CHUNKS.length}`);
  console.log(`  Total:              ${allChunks.length}\n`);

  let success = 0;
  let errors = 0;

  for (const chunk of allChunks) {
    try {
      process.stdout.write(`  Embedding: ${chunk.title.slice(0, 60)}...`);
      await upsertEmbedding(chunk);
      process.stdout.write(' ✓\n');
      success++;
      // Small delay to stay within embedding rate limits
      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      process.stdout.write(` ✗ ${(err as Error).message}\n`);
      errors++;
    }
  }

  console.log(`\n✅ Done: ${success} embedded, ${errors} failed.`);
  if (errors > 0) process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
