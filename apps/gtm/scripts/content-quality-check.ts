#!/usr/bin/env tsx
/**
 * content-quality-check.ts — Comprehensive content quality check for all academy lessons
 *
 * Usage:  npx tsx scripts/content-quality-check.ts
 *         npx tsx scripts/content-quality-check.ts --verbose
 *         npx tsx scripts/content-quality-check.ts --course sales-psychology
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CURRICULUM, getCourse, getLesson, getTrackIdForCourse, getAllCourses } from '../lib/data/curriculum';
import { CONTENT_STATUS } from '../lib/data/content-status';

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const ROOT = process.cwd();
const CONTENT_BASE = path.join(ROOT, 'server/data/content');
const MDX_INDEX_FILE = path.join(ROOT, 'components/mdx/index.ts');
const FLYOUT_CHAT_FILE = path.join(ROOT, 'components/ai/flyout-chat.tsx');
const CHAT_ROUTE_FILE = path.join(ROOT, 'app/api/ai/chat/route.ts');

const WORDS_PER_MINUTE = 200;
const MIN_WORD_COUNT = 500;
const MIN_READING_TIME = 3;
const MAX_READING_TIME = 30;

// Patterns to detect placeholder/draft content. These use regex for word-boundary matching.
const PLACEHOLDER_PATTERNS: { label: string; regex: RegExp }[] = [
    { label: 'TODO', regex: /\bTODO\b/ },
    { label: 'TBD', regex: /\bTBD\b/ },
    { label: 'PLACEHOLDER', regex: /\bPLACEHOLDER\b/ },
    { label: 'Lorem ipsum', regex: /Lorem ipsum/i },
    { label: '[INSERT', regex: /\[INSERT/ },
    { label: 'FIXME', regex: /\bFIXME\b/ },
];

const INTERACTIVE_COMPONENTS = new Set([
    'InteractiveChecklist', 'ProgressiveReveal', 'RewriteExercise', 'MiniRoleplay',
    'ClassifyExercise', 'SwipeDecision', 'PredictionGate', 'DecisionTree',
    'AssessmentEngine', 'ScenarioSimulator', 'TemplateBuilder', 'ComparisonBuilder',
    'LinterFeedback', 'TimedChallenge', 'StrategyDuel', 'RangeSlider',
    'ConceptReframe', 'ArtifactExercise', 'FlipCard', 'SlideNavigation',
]);

const AI_API_ROUTES = [
    'app/api/ai/chat/route.ts',
    'app/api/ai/icp-validation/route.ts',
    'app/api/ai/roleplay/route.ts',
    'app/api/ai/roleplay/evaluate/route.ts',
    'app/api/ai/voice/stt/route.ts',
    'app/api/ai/voice/tts/route.ts',
    'app/api/academy/mini-assessment/route.ts',
];

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

type Severity = 'error' | 'warning' | 'info';

interface Issue {
    severity: Severity;
    category: string;
    file?: string;
    courseId?: string;
    lessonId?: string;
    message: string;
}

interface LessonRecord {
    trackId: string;
    courseId: string;
    lessonId: string;
    courseTitle: string;
    lessonTitle: string;
    filePath: string;
    relPath: string;
    exists: boolean;
    frontmatter: Record<string, unknown> | null;
    content: string | null;
    wordCount: number;
    readingTimeMin: number;
    components: string[];
    persistKeys: string[];
    isInteractive: boolean;
    internalLinks: string[];
    imageRefs: string[];
}

interface CourseReport {
    trackId: string;
    courseId: string;
    courseTitle: string;
    lessonCount: number;
    interactiveCount: number;
    totalWords: number;
    issueCount: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// ANSI COLORS
// ═══════════════════════════════════════════════════════════════════════════

const C = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
};

const PASS = `${C.green}✅${C.reset}`;
const WARN = `${C.yellow}⚠️${C.reset}`;
const FAIL = `${C.red}❌${C.reset}`;
const INFO = `${C.blue}ℹ${C.reset}`;

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function readingTime(wordCount: number): number {
    return Math.ceil(wordCount / WORDS_PER_MINUTE);
}

function stripCodeBlocks(content: string): string {
    return content.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]+`/g, '');
}

function stripHtmlComments(content: string): string {
    return content.replace(/<!--[\s\S]*?-->/g, '');
}

function walkDir(dir: string, extensions: string[]): string[] {
    const results: string[] = [];
    if (!fs.existsSync(dir)) return results;

    function walk(d: string) {
        const entries = fs.readdirSync(d, { withFileTypes: true });
        for (const entry of entries) {
            const full = path.join(d, entry.name);
            if (entry.isDirectory()) {
                walk(full);
            } else if (extensions.some(ext => entry.name.endsWith(ext))) {
                results.push(full);
            }
        }
    }

    walk(dir);
    return results;
}

function parseRegisteredComponents(): Set<string> {
    const src = fs.readFileSync(MDX_INDEX_FILE, 'utf-8');
    const names = new Set<string>();
    // Match keys in the mdxComponents object
    const objMatch = src.match(/export const mdxComponents\s*=\s*\{([\s\S]*?)\};/);
    if (objMatch) {
        const body = objMatch[1];
        const keyRegex = /^\s+(\w+),?\s*$/gm;
        let m: RegExpExecArray | null;
        while ((m = keyRegex.exec(body)) !== null) {
            names.add(m[1]);
        }
    }
    return names;
}

function extractComponents(content: string): string[] {
    const cleaned = stripCodeBlocks(content);
    const matches: string[] = [];
    const regex = /<([A-Z][a-zA-Z]+)/g;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(cleaned)) !== null) {
        matches.push(m[1]);
    }
    return [...new Set(matches)];
}

function extractPersistKeys(content: string): { key: string; component: string }[] {
    const cleaned = stripCodeBlocks(content);
    const results: { key: string; component: string }[] = [];

    // Match component opening tags with persistKey prop
    // Handle: persistKey="value", persistKey={'value'}, persistKey={`value`}
    const tagRegex = /<([A-Z][a-zA-Z]+)\s[^>]*?persistKey\s*=\s*(?:"([^"]+)"|['{]"?([^"'}`]+)"?['}])/g;
    let m: RegExpExecArray | null;
    while ((m = tagRegex.exec(cleaned)) !== null) {
        results.push({ key: m[2] || m[3], component: m[1] });
    }

    return results;
}

function extractInternalLinks(content: string): string[] {
    const links: string[] = [];
    // Markdown links: [text](/academy/...)
    const mdRegex = /\[.*?\]\((\/academy\/[^\s)]+)\)/g;
    let m: RegExpExecArray | null;
    while ((m = mdRegex.exec(content)) !== null) {
        links.push(m[1]);
    }
    // JSX href: href="/academy/..."
    const hrefRegex = /href=["'](\/academy\/[^\s"']+)["']/g;
    while ((m = hrefRegex.exec(content)) !== null) {
        links.push(m[1]);
    }
    return links;
}

function extractImageRefs(content: string): string[] {
    const refs: string[] = [];
    // Markdown images: ![alt](path)
    const mdRegex = /!\[.*?\]\(([^\s)]+)\)/g;
    let m: RegExpExecArray | null;
    while ((m = mdRegex.exec(content)) !== null) {
        if (!m[1].startsWith('http')) refs.push(m[1]);
    }
    // JSX/HTML img src
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    while ((m = imgRegex.exec(content)) !== null) {
        if (!m[1].startsWith('http')) refs.push(m[1]);
    }
    return refs;
}

// ═══════════════════════════════════════════════════════════════════════════
// CHECK 1: CURRICULUM ↔ FILE SYSTEM INTEGRITY
// ═══════════════════════════════════════════════════════════════════════════

function checkCurriculumIntegrity(): { issues: Issue[]; lessonRecords: LessonRecord[]; orphanFiles: string[] } {
    const issues: Issue[] = [];
    const lessonRecords: LessonRecord[] = [];
    const expectedPaths = new Set<string>();

    for (const track of CURRICULUM) {
        // Check track directory
        const trackDir = path.join(CONTENT_BASE, track.id);
        if (!fs.existsSync(trackDir)) {
            issues.push({
                severity: 'error',
                category: 'curriculum-integrity',
                message: `Track directory missing: ${track.id}/`,
            });
        }

        for (const course of track.courses) {
            // Check course directory
            const courseDir = path.join(CONTENT_BASE, track.id, course.id);
            if (!fs.existsSync(courseDir)) {
                issues.push({
                    severity: 'error',
                    category: 'curriculum-integrity',
                    courseId: course.id,
                    message: `Course directory missing: ${track.id}/${course.id}/`,
                });
            }

            for (const lesson of course.lessons) {
                const relPath = path.join(track.id, course.id, `lesson-${lesson.id}.md`);
                const filePath = path.join(CONTENT_BASE, relPath);
                expectedPaths.add(path.resolve(filePath));

                const exists = fs.existsSync(filePath);
                let frontmatter: Record<string, unknown> | null = null;
                let content: string | null = null;
                let wordCount = 0;

                if (exists) {
                    try {
                        const raw = fs.readFileSync(filePath, 'utf-8');
                        const parsed = matter(raw);
                        frontmatter = parsed.data as Record<string, unknown>;
                        content = parsed.content;
                        const cleanContent = stripHtmlComments(stripCodeBlocks(content));
                        wordCount = countWords(cleanContent);
                    } catch (err) {
                        issues.push({
                            severity: 'error',
                            category: 'curriculum-integrity',
                            file: relPath,
                            courseId: course.id,
                            lessonId: lesson.id,
                            message: `Failed to parse: ${(err as Error).message}`,
                        });
                    }
                } else {
                    issues.push({
                        severity: 'error',
                        category: 'curriculum-integrity',
                        file: relPath,
                        courseId: course.id,
                        lessonId: lesson.id,
                        message: `Missing lesson file: ${relPath}`,
                    });
                }

                const components = content ? extractComponents(content) : [];
                const persistKeyResults = content ? extractPersistKeys(content) : [];
                const internalLinks = content ? extractInternalLinks(content) : [];
                const imageRefs = content ? extractImageRefs(content) : [];

                lessonRecords.push({
                    trackId: track.id,
                    courseId: course.id,
                    lessonId: lesson.id,
                    courseTitle: course.title,
                    lessonTitle: lesson.title,
                    filePath,
                    relPath,
                    exists,
                    frontmatter,
                    content,
                    wordCount,
                    readingTimeMin: readingTime(wordCount),
                    components,
                    persistKeys: persistKeyResults.map(pk => pk.key),
                    isInteractive: components.some(c => INTERACTIVE_COMPONENTS.has(c)),
                    internalLinks,
                    imageRefs,
                });
            }
        }
    }

    // Cross-check CONTENT_STATUS vs CURRICULUM
    const allCourseIds = new Set(getAllCourses().map(c => c.id));
    for (const csId of Object.keys(CONTENT_STATUS)) {
        if (!allCourseIds.has(csId)) {
            issues.push({
                severity: 'warning',
                category: 'curriculum-integrity',
                courseId: csId,
                message: `Course "${csId}" in CONTENT_STATUS but not in CURRICULUM`,
            });
        }
    }
    for (const cId of allCourseIds) {
        if (!(cId in CONTENT_STATUS)) {
            issues.push({
                severity: 'info',
                category: 'curriculum-integrity',
                courseId: cId,
                message: `Course "${cId}" in CURRICULUM but not in CONTENT_STATUS`,
            });
        }
    }

    // Find orphan files
    const allMdFiles = walkDir(CONTENT_BASE, ['.md']);
    const orphanFiles = allMdFiles
        .filter(f => !expectedPaths.has(path.resolve(f)))
        .map(f => path.relative(CONTENT_BASE, f));

    for (const orphan of orphanFiles) {
        issues.push({
            severity: 'warning',
            category: 'curriculum-integrity',
            file: orphan,
            message: `Orphan file (not in curriculum): ${orphan}`,
        });
    }

    return { issues, lessonRecords, orphanFiles };
}

// ═══════════════════════════════════════════════════════════════════════════
// CHECK 2: FRONTMATTER VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

function checkFrontmatter(records: LessonRecord[]): Issue[] {
    const issues: Issue[] = [];
    const titlesByCourse = new Map<string, Map<string, string>>();

    for (const rec of records) {
        if (!rec.exists || !rec.frontmatter) continue;
        const fm = rec.frontmatter;

        // Required: title
        if (!fm.title || (typeof fm.title === 'string' && fm.title.trim() === '')) {
            issues.push({
                severity: 'error',
                category: 'frontmatter',
                file: rec.relPath,
                courseId: rec.courseId,
                lessonId: rec.lessonId,
                message: 'Missing or empty "title" in frontmatter',
            });
        }

        // Warning: duration
        if (!fm.duration) {
            issues.push({
                severity: 'warning',
                category: 'frontmatter',
                file: rec.relPath,
                courseId: rec.courseId,
                lessonId: rec.lessonId,
                message: 'Missing "duration" in frontmatter',
            });
        } else if (typeof fm.duration === 'string') {
            const durationStr = fm.duration.toLowerCase();
            if (!/^\d+(?:-\d+)?\s*(min(?:utes?)?|hours?|hr)/i.test(durationStr)) {
                issues.push({
                    severity: 'warning',
                    category: 'frontmatter',
                    file: rec.relPath,
                    courseId: rec.courseId,
                    lessonId: rec.lessonId,
                    message: `Invalid duration format: "${fm.duration}"`,
                });
            }
        }

        // Lesson number match
        if (fm.lesson !== undefined) {
            const fmLesson = String(fm.lesson);
            if (fmLesson !== rec.lessonId) {
                issues.push({
                    severity: 'warning',
                    category: 'frontmatter',
                    file: rec.relPath,
                    courseId: rec.courseId,
                    lessonId: rec.lessonId,
                    message: `Frontmatter lesson number (${fmLesson}) doesn't match file lesson ID (${rec.lessonId})`,
                });
            }
        }

        // Track duplicate titles within course
        if (typeof fm.title === 'string') {
            if (!titlesByCourse.has(rec.courseId)) titlesByCourse.set(rec.courseId, new Map());
            const courseMap = titlesByCourse.get(rec.courseId)!;
            const normalizedTitle = fm.title.trim().toLowerCase();
            if (courseMap.has(normalizedTitle)) {
                issues.push({
                    severity: 'warning',
                    category: 'frontmatter',
                    file: rec.relPath,
                    courseId: rec.courseId,
                    lessonId: rec.lessonId,
                    message: `Duplicate title "${fm.title}" (also in lesson ${courseMap.get(normalizedTitle)})`,
                });
            } else {
                courseMap.set(normalizedTitle, rec.lessonId);
            }
        }
    }

    return issues;
}

// ═══════════════════════════════════════════════════════════════════════════
// CHECK 3: CONTENT QUALITY
// ═══════════════════════════════════════════════════════════════════════════

function checkContentQuality(records: LessonRecord[]): Issue[] {
    const issues: Issue[] = [];

    for (const rec of records) {
        if (!rec.exists) continue;

        // Empty content
        if (!rec.content || rec.content.trim().length === 0) {
            issues.push({
                severity: 'error',
                category: 'content-quality',
                file: rec.relPath,
                courseId: rec.courseId,
                lessonId: rec.lessonId,
                message: 'Empty content body (no content after frontmatter)',
            });
            continue;
        }

        // Word count too low
        if (rec.wordCount < MIN_WORD_COUNT) {
            issues.push({
                severity: 'warning',
                category: 'content-quality',
                file: rec.relPath,
                courseId: rec.courseId,
                lessonId: rec.lessonId,
                message: `Low word count: ${rec.wordCount} words (minimum ${MIN_WORD_COUNT})`,
            });
        }

        // Reading time outliers
        if (rec.readingTimeMin < MIN_READING_TIME) {
            issues.push({
                severity: 'warning',
                category: 'content-quality',
                file: rec.relPath,
                courseId: rec.courseId,
                lessonId: rec.lessonId,
                message: `Very short: ~${rec.readingTimeMin} min reading time`,
            });
        }
        if (rec.readingTimeMin > MAX_READING_TIME) {
            issues.push({
                severity: 'info',
                category: 'content-quality',
                file: rec.relPath,
                courseId: rec.courseId,
                lessonId: rec.lessonId,
                message: `Very long: ~${rec.readingTimeMin} min reading time (${rec.wordCount} words)`,
            });
        }

        // Placeholder patterns — only check prose lines, not JSX/component content
        const strippedContent = stripCodeBlocks(rec.content);
        const proseLines = strippedContent.split('\n');
        for (const pattern of PLACEHOLDER_PATTERNS) {
            for (let lineIdx = 0; lineIdx < proseLines.length; lineIdx++) {
                const line = proseLines[lineIdx];
                if (pattern.regex.test(line)) {
                    // Skip JSX prop lines (placeholder="...", inputPlaceholder, keywords arrays, etc.)
                    if (/(?:placeholder|Placeholder)\s*[:=]/i.test(line)) continue;
                    // Skip lines that look like JSX prop values or arrays
                    if (/^\s+\w+\s*[:=]\s*[\["{(]/.test(line)) continue;
                    if (/antiKeywords|keywords/i.test(line)) continue;

                    issues.push({
                        severity: 'warning',
                        category: 'content-quality',
                        file: rec.relPath,
                        courseId: rec.courseId,
                        lessonId: rec.lessonId,
                        message: `Placeholder text "${pattern.label}" found at line ${lineIdx + 1}`,
                    });
                    break; // Only report first occurrence per pattern per lesson
                }
            }
        }
    }

    return issues;
}

// ═══════════════════════════════════════════════════════════════════════════
// CHECK 4: MDX COMPONENT VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

function checkMdxComponents(records: LessonRecord[]): {
    issues: Issue[];
    componentUsage: Map<string, number>;
    persistKeyMap: Map<string, string[]>;
} {
    const issues: Issue[] = [];
    const componentUsage = new Map<string, number>();
    const persistKeyMap = new Map<string, string[]>(); // key -> [file paths]

    const registeredComponents = parseRegisteredComponents();

    // Also add RevealSection (child of ProgressiveReveal), LikertScale, ScenarioQuiz, Slide
    // These are already in the registry from the export parse

    for (const rec of records) {
        if (!rec.exists || !rec.content) continue;

        // Count component usage
        for (const comp of rec.components) {
            componentUsage.set(comp, (componentUsage.get(comp) || 0) + 1);
        }

        // Check for unregistered components
        for (const comp of rec.components) {
            if (!registeredComponents.has(comp)) {
                issues.push({
                    severity: 'error',
                    category: 'mdx-components',
                    file: rec.relPath,
                    courseId: rec.courseId,
                    lessonId: rec.lessonId,
                    message: `Unregistered MDX component: <${comp}>`,
                });
            }
        }

        // Check persistKey on interactive components
        const contentStripped = stripCodeBlocks(rec.content);
        for (const comp of rec.components) {
            if (INTERACTIVE_COMPONENTS.has(comp)) {
                // Check if this component has persistKey in the content
                const compTagRegex = new RegExp(`<${comp}[\\s][^>]*>`, 'g');
                let tagMatch: RegExpExecArray | null;
                while ((tagMatch = compTagRegex.exec(contentStripped)) !== null) {
                    if (!tagMatch[0].includes('persistKey')) {
                        // Only warn for components where persistKey is truly required
                        const requiredPersist = new Set([
                            'InteractiveChecklist', 'ProgressiveReveal', 'RewriteExercise',
                            'MiniRoleplay', 'ClassifyExercise', 'SwipeDecision',
                            'PredictionGate', 'DecisionTree',
                        ]);
                        if (requiredPersist.has(comp)) {
                            issues.push({
                                severity: 'warning',
                                category: 'mdx-components',
                                file: rec.relPath,
                                courseId: rec.courseId,
                                lessonId: rec.lessonId,
                                message: `<${comp}> missing required persistKey prop`,
                            });
                        }
                    }
                }
            }
        }

        // Track persistKey uniqueness
        const pkResults = extractPersistKeys(rec.content);
        for (const pk of pkResults) {
            if (!persistKeyMap.has(pk.key)) persistKeyMap.set(pk.key, []);
            persistKeyMap.get(pk.key)!.push(rec.relPath);
        }
    }

    // Check for duplicate persistKeys across files
    for (const [key, files] of persistKeyMap) {
        const uniqueFiles = [...new Set(files)];
        if (uniqueFiles.length > 1) {
            issues.push({
                severity: 'error',
                category: 'mdx-components',
                message: `Duplicate persistKey "${key}" used in ${uniqueFiles.length} files: ${uniqueFiles.join(', ')}`,
            });
        }
    }

    return { issues, componentUsage, persistKeyMap };
}

// ═══════════════════════════════════════════════════════════════════════════
// CHECK 5: AI INTEGRATION
// ═══════════════════════════════════════════════════════════════════════════

function checkAiIntegration(): Issue[] {
    const issues: Issue[] = [];

    // Check API route existence and POST export
    for (const routeRelPath of AI_API_ROUTES) {
        const fullPath = path.join(ROOT, routeRelPath);
        if (!fs.existsSync(fullPath)) {
            issues.push({
                severity: 'error',
                category: 'ai-integration',
                file: routeRelPath,
                message: `AI API route missing: ${routeRelPath}`,
            });
            continue;
        }

        const src = fs.readFileSync(fullPath, 'utf-8');
        if (!src.includes('export const POST') && !src.includes('export async function POST') && !src.includes('export { POST')) {
            issues.push({
                severity: 'error',
                category: 'ai-integration',
                file: routeRelPath,
                message: `No POST export found in ${routeRelPath}`,
            });
        }
    }

    // Check FlyoutChat URL extraction
    if (fs.existsSync(FLYOUT_CHAT_FILE)) {
        const src = fs.readFileSync(FLYOUT_CHAT_FILE, 'utf-8');

        if (src.includes('usePathname')) {
            if (src.includes('courseId') && src.includes('lessonId')) {
                issues.push({
                    severity: 'info',
                    category: 'ai-integration',
                    file: 'components/ai/flyout-chat.tsx',
                    message: 'FlyoutChat correctly extracts courseId/lessonId from URL',
                });
            } else {
                issues.push({
                    severity: 'warning',
                    category: 'ai-integration',
                    file: 'components/ai/flyout-chat.tsx',
                    message: 'FlyoutChat uses usePathname but may not extract courseId/lessonId',
                });
            }
        } else {
            issues.push({
                severity: 'error',
                category: 'ai-integration',
                file: 'components/ai/flyout-chat.tsx',
                message: 'FlyoutChat does not use usePathname — no lesson context sent to AI',
            });
        }
    } else {
        issues.push({
            severity: 'error',
            category: 'ai-integration',
            file: 'components/ai/flyout-chat.tsx',
            message: 'FlyoutChat component file missing',
        });
    }

    // Check chat route uses curriculum for context
    if (fs.existsSync(CHAT_ROUTE_FILE)) {
        const src = fs.readFileSync(CHAT_ROUTE_FILE, 'utf-8');
        if (src.includes('getCourse') && src.includes('getLesson')) {
            issues.push({
                severity: 'info',
                category: 'ai-integration',
                file: 'app/api/ai/chat/route.ts',
                message: 'Chat route correctly imports getCourse/getLesson for lesson context',
            });
        } else {
            issues.push({
                severity: 'warning',
                category: 'ai-integration',
                file: 'app/api/ai/chat/route.ts',
                message: 'Chat route may not resolve lesson context from curriculum',
            });
        }
    }

    return issues;
}

// ═══════════════════════════════════════════════════════════════════════════
// CHECK 6: LINK & REFERENCE VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

function checkLinks(records: LessonRecord[]): Issue[] {
    const issues: Issue[] = [];
    const allCourseIds = new Set(getAllCourses().map(c => c.id));
    let totalInternalLinks = 0;
    let totalBrokenLinks = 0;
    let totalImageRefs = 0;
    let totalBrokenImages = 0;

    for (const rec of records) {
        if (!rec.exists) continue;

        // Check internal /academy/ links
        for (const link of rec.internalLinks) {
            totalInternalLinks++;

            // Try multiple link formats:
            // /academy/{courseId}
            // /academy/{courseId}/{lessonId}
            // /academy/{trackId}/{courseId}/{lessonId}  (some links include track)
            let linkedCourseId: string | null = null;
            let linkedLessonId: string | undefined;

            // 3-segment: /academy/track/course/lesson-N
            const threeSegMatch = link.match(/^\/academy\/([^/]+)\/([^/]+)\/lesson-(\d+)$/);
            if (threeSegMatch) {
                linkedCourseId = threeSegMatch[2];
                linkedLessonId = threeSegMatch[3];
            }

            if (!linkedCourseId) {
                // 2-segment: /academy/{courseId}/{lessonId} or /academy/{trackId}/{courseId}
                const twoSegMatch = link.match(/^\/academy\/([^/]+)\/(\d+)$/);
                if (twoSegMatch) {
                    linkedCourseId = twoSegMatch[1];
                    linkedLessonId = twoSegMatch[2];
                }
            }

            if (!linkedCourseId) {
                // 2-segment with course slug: /academy/{trackOrCourse}/{courseId}
                const slugMatch = link.match(/^\/academy\/([^/]+)\/([^/]+)$/);
                if (slugMatch) {
                    // If first segment is a track and second is a course, use the course
                    if (allCourseIds.has(slugMatch[2])) {
                        linkedCourseId = slugMatch[2];
                    } else if (allCourseIds.has(slugMatch[1])) {
                        linkedCourseId = slugMatch[1];
                    } else {
                        linkedCourseId = slugMatch[1]; // Will flag as broken
                    }
                }
            }

            if (!linkedCourseId) {
                // 1-segment: /academy/{courseId}
                const oneSegMatch = link.match(/^\/academy\/([^/]+)$/);
                if (oneSegMatch) {
                    linkedCourseId = oneSegMatch[1];
                }
            }

            if (!linkedCourseId) continue;

            // Skip known special routes
            if (linkedCourseId === 'tools') continue;

            if (!allCourseIds.has(linkedCourseId)) {
                totalBrokenLinks++;
                issues.push({
                    severity: 'error',
                    category: 'links',
                    file: rec.relPath,
                    courseId: rec.courseId,
                    lessonId: rec.lessonId,
                    message: `Broken link: ${link} (course "${linkedCourseId}" not found)`,
                });
            } else if (linkedLessonId) {
                const lesson = getLesson(linkedCourseId, linkedLessonId);
                if (!lesson) {
                    totalBrokenLinks++;
                    issues.push({
                        severity: 'error',
                        category: 'links',
                        file: rec.relPath,
                        courseId: rec.courseId,
                        lessonId: rec.lessonId,
                        message: `Broken link: ${link} (lesson ${linkedLessonId} not found in ${linkedCourseId})`,
                    });
                }
            }
        }

        // Check image references
        for (const imgRef of rec.imageRefs) {
            totalImageRefs++;
            if (imgRef.startsWith('/')) {
                const imgPath = path.join(ROOT, 'public', imgRef);
                if (!fs.existsSync(imgPath)) {
                    totalBrokenImages++;
                    issues.push({
                        severity: 'warning',
                        category: 'links',
                        file: rec.relPath,
                        courseId: rec.courseId,
                        lessonId: rec.lessonId,
                        message: `Broken image: ${imgRef}`,
                    });
                }
            }
        }
    }

    // Summary info
    issues.push({
        severity: 'info',
        category: 'links',
        message: `Scanned ${totalInternalLinks} internal links (${totalBrokenLinks} broken), ${totalImageRefs} images (${totalBrokenImages} broken)`,
    });

    return issues;
}

// ═══════════════════════════════════════════════════════════════════════════
// REPORT FORMATTER
// ═══════════════════════════════════════════════════════════════════════════

function formatReport(
    records: LessonRecord[],
    allIssues: Issue[],
    orphanFiles: string[],
    componentUsage: Map<string, number>,
    persistKeyMap: Map<string, string[]>,
    elapsed: number,
    verbose: boolean,
    filterCourse?: string,
) {
    const issuesByCategory = new Map<string, Issue[]>();
    for (const issue of allIssues) {
        if (!issuesByCategory.has(issue.category)) issuesByCategory.set(issue.category, []);
        issuesByCategory.get(issue.category)!.push(issue);
    }

    const errors = allIssues.filter(i => i.severity === 'error');
    const warnings = allIssues.filter(i => i.severity === 'warning');
    const infos = allIssues.filter(i => i.severity === 'info');

    const trackCount = CURRICULUM.length;
    const courseCount = getAllCourses().length;
    const lessonCount = records.length;
    const interactiveCount = records.filter(r => r.isInteractive).length;
    const plainCount = lessonCount - interactiveCount;
    const totalWords = records.reduce((sum, r) => sum + r.wordCount, 0);
    const existingRecords = records.filter(r => r.exists);
    const avgWords = existingRecords.length > 0 ? Math.round(totalWords / existingRecords.length) : 0;

    console.log('');
    console.log(`${C.bold}╔══════════════════════════════════════════════════════════╗${C.reset}`);
    console.log(`${C.bold}║          Content Quality Check Report                     ║${C.reset}`);
    console.log(`${C.bold}╠══════════════════════════════════════════════════════════╣${C.reset}`);
    console.log('');

    // ─── OVERVIEW ────────────────────────────────────────────
    console.log(`${C.bold}  OVERVIEW${C.reset}`);
    console.log(`  Tracks: ${C.cyan}${trackCount}${C.reset} | Courses: ${C.cyan}${courseCount}${C.reset} | Lessons: ${C.cyan}${lessonCount}${C.reset}`);
    console.log(`  Interactive: ${C.green}${interactiveCount}${C.reset} (${Math.round(interactiveCount / lessonCount * 100)}%) | Plain text: ${C.dim}${plainCount}${C.reset} (${Math.round(plainCount / lessonCount * 100)}%)`);
    console.log(`  Total words: ${C.cyan}${(totalWords / 1000).toFixed(0)}K${C.reset} | Avg: ${C.cyan}${avgWords.toLocaleString()}${C.reset} words/lesson`);
    console.log('');

    // ─── CURRICULUM INTEGRITY ────────────────────────────────
    const integrityIssues = issuesByCategory.get('curriculum-integrity') || [];
    const integrityErrors = integrityIssues.filter(i => i.severity === 'error');
    const matchedCount = lessonCount - integrityErrors.filter(i => i.message.startsWith('Missing lesson')).length;

    if (integrityErrors.length === 0) {
        console.log(`  ${PASS} ${C.bold}CURRICULUM INTEGRITY${C.reset}  (${matchedCount}/${lessonCount} matched, ${orphanFiles.length} orphans)`);
    } else {
        console.log(`  ${FAIL} ${C.bold}CURRICULUM INTEGRITY${C.reset}  (${integrityErrors.length} errors)`);
        for (const issue of integrityErrors) {
            console.log(`     ${C.red}${issue.message}${C.reset}`);
        }
    }
    if (orphanFiles.length > 0) {
        console.log(`     ${C.yellow}Orphan files: ${orphanFiles.length}${C.reset}`);
        if (verbose) {
            for (const o of orphanFiles) console.log(`       ${C.dim}${o}${C.reset}`);
        }
    }
    console.log('');

    // ─── FRONTMATTER ─────────────────────────────────────────
    const fmIssues = (issuesByCategory.get('frontmatter') || []).filter(i => i.severity !== 'info');
    const fmErrors = fmIssues.filter(i => i.severity === 'error');
    const fmWarnings = fmIssues.filter(i => i.severity === 'warning');

    if (fmIssues.length === 0) {
        console.log(`  ${PASS} ${C.bold}FRONTMATTER${C.reset}  (all valid)`);
    } else {
        const icon = fmErrors.length > 0 ? FAIL : WARN;
        console.log(`  ${icon} ${C.bold}FRONTMATTER${C.reset}  (${fmErrors.length} errors, ${fmWarnings.length} warnings)`);
        if (verbose || fmErrors.length > 0) {
            for (const issue of fmIssues.slice(0, verbose ? undefined : 10)) {
                const icon2 = issue.severity === 'error' ? C.red : C.yellow;
                console.log(`     ${icon2}[${issue.severity}]${C.reset} ${issue.file}: ${issue.message}`);
            }
            if (!verbose && fmIssues.length > 10) {
                console.log(`     ${C.dim}... and ${fmIssues.length - 10} more${C.reset}`);
            }
        }
    }
    console.log('');

    // ─── CONTENT QUALITY ─────────────────────────────────────
    const cqIssues = (issuesByCategory.get('content-quality') || []).filter(i => i.severity !== 'info');
    const cqErrors = cqIssues.filter(i => i.severity === 'error');
    const cqWarnings = cqIssues.filter(i => i.severity === 'warning');
    const cqInfos = (issuesByCategory.get('content-quality') || []).filter(i => i.severity === 'info');

    if (cqErrors.length === 0 && cqWarnings.length === 0) {
        console.log(`  ${PASS} ${C.bold}CONTENT QUALITY${C.reset}  (all lessons pass)`);
    } else {
        const icon = cqErrors.length > 0 ? FAIL : WARN;
        console.log(`  ${icon} ${C.bold}CONTENT QUALITY${C.reset}  (${cqErrors.length} errors, ${cqWarnings.length} warnings)`);
        if (verbose || cqErrors.length > 0) {
            for (const issue of [...cqErrors, ...cqWarnings].slice(0, verbose ? undefined : 15)) {
                const icon2 = issue.severity === 'error' ? C.red : C.yellow;
                console.log(`     ${icon2}[${issue.severity}]${C.reset} ${issue.file}: ${issue.message}`);
            }
            const total = cqErrors.length + cqWarnings.length;
            if (!verbose && total > 15) {
                console.log(`     ${C.dim}... and ${total - 15} more${C.reset}`);
            }
        }
    }
    if (cqInfos.length > 0 && verbose) {
        for (const issue of cqInfos) {
            console.log(`     ${C.blue}[info]${C.reset} ${issue.file}: ${issue.message}`);
        }
    }
    console.log('');

    // ─── MDX COMPONENTS ──────────────────────────────────────
    const mdxIssues = issuesByCategory.get('mdx-components') || [];
    const mdxErrors = mdxIssues.filter(i => i.severity === 'error');
    const mdxWarnings = mdxIssues.filter(i => i.severity === 'warning');
    const registeredCount = parseRegisteredComponents().size;
    const usedCount = componentUsage.size;
    const dupPersistKeys = [...persistKeyMap.entries()].filter(([, files]) => new Set(files).size > 1).length;

    if (mdxErrors.length === 0) {
        console.log(`  ${PASS} ${C.bold}MDX COMPONENTS${C.reset}  (${registeredCount} registered, ${usedCount} used, ${mdxWarnings.length} warnings)`);
    } else {
        console.log(`  ${FAIL} ${C.bold}MDX COMPONENTS${C.reset}  (${mdxErrors.length} errors, ${mdxWarnings.length} warnings)`);
        for (const issue of mdxErrors) {
            console.log(`     ${C.red}[error]${C.reset} ${issue.file ? issue.file + ': ' : ''}${issue.message}`);
        }
    }
    if (mdxWarnings.length > 0 && verbose) {
        for (const issue of mdxWarnings.slice(0, 20)) {
            console.log(`     ${C.yellow}[warn]${C.reset} ${issue.file}: ${issue.message}`);
        }
        if (mdxWarnings.length > 20) console.log(`     ${C.dim}... and ${mdxWarnings.length - 20} more${C.reset}`);
    }

    // Component usage top 10
    const sortedUsage = [...componentUsage.entries()].sort((a, b) => b[1] - a[1]);
    console.log(`     ${C.dim}Top components: ${sortedUsage.slice(0, 8).map(([n, c]) => `${n}(${c})`).join(', ')}${C.reset}`);
    console.log(`     ${C.dim}persistKey: ${persistKeyMap.size} unique keys, ${dupPersistKeys} duplicates${C.reset}`);
    console.log('');

    // ─── AI INTEGRATION ──────────────────────────────────────
    const aiIssues = issuesByCategory.get('ai-integration') || [];
    const aiErrors = aiIssues.filter(i => i.severity === 'error');
    const aiWarnings = aiIssues.filter(i => i.severity === 'warning');
    const aiRouteCount = AI_API_ROUTES.length;
    const missingRoutes = aiErrors.filter(i => i.message.includes('route missing')).length;

    if (aiErrors.length === 0) {
        console.log(`  ${PASS} ${C.bold}AI INTEGRATION${C.reset}  (${aiRouteCount - missingRoutes}/${aiRouteCount} routes, FlyoutChat OK)`);
    } else {
        console.log(`  ${FAIL} ${C.bold}AI INTEGRATION${C.reset}  (${aiErrors.length} errors)`);
        for (const issue of aiErrors) {
            console.log(`     ${C.red}[error]${C.reset} ${issue.message}`);
        }
    }
    for (const issue of aiIssues.filter(i => i.severity === 'info')) {
        console.log(`     ${C.dim}${issue.message}${C.reset}`);
    }
    console.log('');

    // ─── LINKS ───────────────────────────────────────────────
    const linkIssues = issuesByCategory.get('links') || [];
    const linkErrors = linkIssues.filter(i => i.severity === 'error');
    const linkWarnings = linkIssues.filter(i => i.severity === 'warning');
    const linkSummary = linkIssues.find(i => i.severity === 'info' && i.message.startsWith('Scanned'));

    if (linkErrors.length === 0 && linkWarnings.length === 0) {
        console.log(`  ${PASS} ${C.bold}LINKS & REFERENCES${C.reset}  ${linkSummary ? linkSummary.message : ''}`);
    } else {
        const icon = linkErrors.length > 0 ? FAIL : WARN;
        console.log(`  ${icon} ${C.bold}LINKS & REFERENCES${C.reset}  (${linkErrors.length} errors, ${linkWarnings.length} warnings)`);
        for (const issue of [...linkErrors, ...linkWarnings].slice(0, verbose ? undefined : 10)) {
            const icon2 = issue.severity === 'error' ? C.red : C.yellow;
            console.log(`     ${icon2}[${issue.severity}]${C.reset} ${issue.file}: ${issue.message}`);
        }
    }
    console.log('');

    // ─── PER-COURSE SUMMARY TABLE ────────────────────────────
    console.log(`  ${C.bold}PER-COURSE SUMMARY${C.reset}`);
    console.log(`  ${C.dim}${'Course'.padEnd(42)} Lessons  Interactive  Words     Issues${C.reset}`);
    console.log(`  ${C.dim}${'─'.repeat(42)} ─────── ─────────── ───────── ──────${C.reset}`);

    // Build per-course records
    const courseMap = new Map<string, CourseReport>();
    for (const rec of records) {
        if (!courseMap.has(rec.courseId)) {
            courseMap.set(rec.courseId, {
                trackId: rec.trackId,
                courseId: rec.courseId,
                courseTitle: rec.courseTitle,
                lessonCount: 0,
                interactiveCount: 0,
                totalWords: 0,
                issueCount: 0,
            });
        }
        const cr = courseMap.get(rec.courseId)!;
        cr.lessonCount++;
        if (rec.isInteractive) cr.interactiveCount++;
        cr.totalWords += rec.wordCount;
    }

    // Count issues per course
    for (const issue of allIssues) {
        if (issue.courseId && courseMap.has(issue.courseId) && issue.severity !== 'info') {
            courseMap.get(issue.courseId)!.issueCount++;
        }
    }

    const courseReports = [...courseMap.values()];
    // Group by track
    let currentTrack = '';
    for (const cr of courseReports) {
        if (cr.trackId !== currentTrack) {
            currentTrack = cr.trackId;
            console.log(`  ${C.cyan}${currentTrack}${C.reset}`);
        }
        const intPct = cr.lessonCount > 0 ? Math.round(cr.interactiveCount / cr.lessonCount * 100) : 0;
        const issueStr = cr.issueCount > 0 ? `${C.yellow}${cr.issueCount}${C.reset}` : `${C.dim}0${C.reset}`;
        const intStr = `${cr.interactiveCount} (${intPct}%)`;
        const wordsStr = cr.totalWords > 1000 ? `${(cr.totalWords / 1000).toFixed(1)}K` : `${cr.totalWords}`;
        console.log(`    ${cr.courseId.padEnd(40)} ${String(cr.lessonCount).padStart(5)}   ${intStr.padStart(10)}  ${wordsStr.padStart(8)}   ${issueStr}`);
    }
    console.log('');

    // ─── FINAL SUMMARY ───────────────────────────────────────
    console.log(`  ${C.bold}${'═'.repeat(56)}${C.reset}`);
    const resultColor = errors.length > 0 ? C.red : warnings.length > 0 ? C.yellow : C.green;
    const resultLabel = errors.length > 0 ? 'FAIL' : 'PASS';
    console.log(`  ${C.bold}RESULT: ${resultColor}${resultLabel}${C.reset} — ${C.red}${errors.length} errors${C.reset}, ${C.yellow}${warnings.length} warnings${C.reset}, ${C.blue}${infos.length} info${C.reset}`);
    console.log(`  ${C.dim}Completed in ${elapsed.toFixed(1)}s${C.reset}`);
    console.log(`${C.bold}╚══════════════════════════════════════════════════════════╝${C.reset}`);
    console.log('');
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

function main() {
    const startTime = Date.now();
    const args = process.argv.slice(2);
    const verbose = args.includes('--verbose') || args.includes('-v');
    const courseIdx = args.indexOf('--course');
    const filterCourse = courseIdx !== -1 ? args[courseIdx + 1] : undefined;

    if (filterCourse) {
        console.log(`${C.dim}Filtering to course: ${filterCourse}${C.reset}`);
    }

    // 1. Curriculum integrity (also builds lesson records)
    const { issues: integrityIssues, lessonRecords, orphanFiles } = checkCurriculumIntegrity();

    // Apply course filter if specified
    const filteredRecords = filterCourse
        ? lessonRecords.filter(r => r.courseId === filterCourse)
        : lessonRecords;

    // 2. Frontmatter validation
    const frontmatterIssues = checkFrontmatter(filteredRecords);

    // 3. Content quality
    const contentIssues = checkContentQuality(filteredRecords);

    // 4. MDX component validation
    const { issues: mdxIssues, componentUsage, persistKeyMap } = checkMdxComponents(filteredRecords);

    // 5. AI integration
    const aiIssues = checkAiIntegration();

    // 6. Link & reference validation
    const linkIssues = checkLinks(filteredRecords);

    // Aggregate all issues
    const allIssues = [
        ...integrityIssues,
        ...frontmatterIssues,
        ...contentIssues,
        ...mdxIssues,
        ...aiIssues,
        ...linkIssues,
    ];

    const elapsed = (Date.now() - startTime) / 1000;

    formatReport(filteredRecords, allIssues, orphanFiles, componentUsage, persistKeyMap, elapsed, verbose, filterCourse);

    // Exit code
    const errorCount = allIssues.filter(i => i.severity === 'error').length;
    process.exit(errorCount > 0 ? 1 : 0);
}

main();
