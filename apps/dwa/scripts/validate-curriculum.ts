import fs from 'fs';
import path from 'path';
import { CURRICULUM } from '../lib/data/curriculum';
import { z } from 'zod';

const CONTENT_BASE_PATH = path.join(process.cwd(), 'server/data/content');
const QUIZ_BASE_PATH = path.join(process.cwd(), 'server/data/quizzes');

// Quiz Schema for validation
const QuizQuestionSchema = z.object({
    id: z.string(),
    type: z.enum(['multiple-choice', 'single_choice', 'true-false', 'reflection']),
    question: z.string(),
    options: z.array(z.object({
        id: z.string(),
        text: z.string()
    })).optional(),
    correctAnswer: z.string().optional(),
    explanation: z.string().optional(),
    minLength: z.number().optional(),
    aiPrompt: z.string().optional(),
});

const QuizSchema = z.object({
    lessonId: z.string(),
    courseId: z.string(),
    sectionId: z.string(),
    title: z.string(),
    passingScore: z.number().optional(),
    questions: z.array(QuizQuestionSchema)
});

async function validate() {
    console.log('🔍 Starting Comprehensive Curriculum Validation...\n');

    let errorCount = 0;
    let warningCount = 0;
    const missingLessons: string[] = [];
    const missingQuizzes: string[] = [];
    const invalidQuizzes: string[] = [];
    const trackedFiles = new Set<string>();

    for (const track of CURRICULUM) {
        for (const course of track.courses) {
            for (const lesson of course.lessons) {
                const lessonRelPath = path.join(track.id, course.id, `lesson-${lesson.id}.md`);
                const lessonFullPath = path.join(CONTENT_BASE_PATH, lessonRelPath);

                trackedFiles.add(path.resolve(lessonFullPath));

                // 1. Check lesson content
                if (!fs.existsSync(lessonFullPath)) {
                    missingLessons.push(`${course.id} / lesson-${lesson.id} (${lessonRelPath})`);
                    errorCount++;
                }

                // 2. Check quiz
                const quizRelPath = path.join(track.id, course.id, `lesson-${lesson.id}.json`);
                const quizFullPath = path.join(QUIZ_BASE_PATH, quizRelPath);

                if (fs.existsSync(quizFullPath)) {
                    trackedFiles.add(path.resolve(quizFullPath));

                    // Validate Quiz JSON
                    try {
                        const quizData = JSON.parse(fs.readFileSync(quizFullPath, 'utf8'));
                        const result = QuizSchema.safeParse(quizData);

                        if (!result.success) {
                            invalidQuizzes.push(`${quizRelPath}: ${result.error.message}`);
                            errorCount++;
                        } else {
                            // Extra checks for metadata matching
                            if (quizData.lessonId !== lesson.id || quizData.courseId !== course.id || quizData.sectionId !== track.id) {
                                invalidQuizzes.push(`${quizRelPath}: Metadata mismatch (Found: ${quizData.sectionId}/${quizData.courseId}/${quizData.lessonId}, Expected: ${track.id}/${course.id}/${lesson.id})`);
                                errorCount++;
                            }
                        }
                    } catch (e) {
                        invalidQuizzes.push(`${quizRelPath}: Invalid JSON`);
                        errorCount++;
                    }
                } else {
                    // Quizzes are optional but let's warn if they are missing
                    // missingQuizzes.push(quizRelPath);
                    // warningCount++;
                }
            }
        }
    }

    // 3. Check for Orphans
    const contentOrphans = findOrphans(CONTENT_BASE_PATH, ['.md', '.mdx'], trackedFiles);
    const quizOrphans = findOrphans(QUIZ_BASE_PATH, ['.json'], trackedFiles);

    // Reporting
    if (missingLessons.length > 0) {
        console.error('❌ Missing Lesson Files:');
        missingLessons.forEach(l => console.error(`   - ${l}`));
        console.log('');
    }

    if (invalidQuizzes.length > 0) {
        console.error('❌ Invalid or Mismatched Quizzes:');
        invalidQuizzes.forEach(q => console.error(`   - ${q}`));
        console.log('');
    }

    if (contentOrphans.length > 0) {
        console.warn('⚠️ Orphaned Content Files (Not in curriculum):');
        contentOrphans.forEach(o => console.warn(`   - ${o}`));
        console.log('');
        warningCount += contentOrphans.length;
    }

    if (quizOrphans.length > 0) {
        console.warn('⚠️ Orphaned Quiz Files (Not in curriculum):');
        quizOrphans.forEach(o => console.warn(`   - ${o}`));
        console.log('');
        warningCount += quizOrphans.length;
    }

    console.log('-------------------------------------------');
    console.log(`Summary: ${errorCount} Errors, ${warningCount} Warnings`);

    if (errorCount > 0) {
        process.exit(1);
    } else {
        console.log('\n✅ Curriculum validation passed!');
        process.exit(0);
    }
}

function findOrphans(dir: string, extensions: string[], trackedFiles: Set<string>): string[] {
    const orphans: string[] = [];

    function walk(currentDir: string) {
        if (!fs.existsSync(currentDir)) return;
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (extensions.some(ext => entry.name.endsWith(ext))) {
                if (!trackedFiles.has(path.resolve(fullPath))) {
                    orphans.push(path.relative(CONTENT_BASE_PATH, fullPath));
                }
            }
        }
    }

    walk(dir);
    return orphans;
}

validate().catch(err => {
    console.error('Fatal validation error:', err);
    process.exit(1);
});
