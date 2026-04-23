import fs from 'fs';
import path from 'path';
import { CURRICULUM } from '../lib/data/curriculum';

const CONTENT_BASE_PATH = path.join(process.cwd(), 'server/data/content');

interface AuditResult {
    courseId: string;
    lessonId: string;
    title: string;
    wordCount: number;
    hasSAAS: boolean;
    hasCreator: boolean;
    hasMistakes: boolean;
    hasExercise: boolean;
    path: string;
}

function countWords(text: string): number {
    // Remove markdown symbols
    const cleanText = text
        .replace(/[#*`_~]/g, '') // Remove markdown special chars
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\[.*?\]\(.*?\)/g, '$1') // Keep link text, remove URL
        .replace(/<.*?>/g, '') // Remove HTML tags
        .trim();

    if (cleanText.length === 0) return 0;
    return cleanText.split(/\s+/).length;
}

async function runAudit() {
    console.log('🚀 Starting Phase A Content Audit...');
    const results: AuditResult[] = [];
    let totalLessons = 0;
    let failedWordCount = 0;
    let missingSections = 0;

    for (const track of CURRICULUM) {
        for (const course of track.courses) {
            for (const lesson of course.lessons) {
                const lessonRelPath = path.join(track.id, course.id, `lesson-${lesson.id}.md`);
                const lessonFullPath = path.join(CONTENT_BASE_PATH, lessonRelPath);

                totalLessons++;

                if (!fs.existsSync(lessonFullPath)) {
                    console.error(`❌ Missing file: ${lessonFullPath}`);
                    continue;
                }

                const content = fs.readFileSync(lessonFullPath, 'utf8');
                const wordCount = countWords(content);

                // Very liberal detection
                const hasSAAS = /SaaS/i.test(content);
                const hasCreator = /Creator/i.test(content) || /Coach/i.test(content);
                const hasMistakes = /Mistake/i.test(content) || /Pitfall/i.test(content) || /Sabotage/i.test(content) || /Common Error/i.test(content) || /Amateur/i.test(content) || /Trap/i.test(content);
                const hasExercise = /Exercise/i.test(content) || /Practice/i.test(content) || /Actionable/i.test(content) || /Next Step/i.test(content) || /Checklist/i.test(content) || /Homework/i.test(content);
                const hasVisuals = /!\[.*?\]\(.*?\)/.test(content) || /<img/.test(content) || /```mermaid/.test(content) || /| :--- |/.test(content); // Check for tables too

                const result: AuditResult & { hasVisuals: boolean } = {
                    courseId: course.id,
                    lessonId: lesson.id,
                    title: lesson.title,
                    wordCount,
                    hasSAAS,
                    hasCreator,
                    hasMistakes,
                    hasExercise,
                    hasVisuals,
                    path: lessonRelPath
                };

                results.push(result);

                if (wordCount < 1200) failedWordCount++;
                if (!hasSAAS || !hasCreator || !hasMistakes || !hasExercise) missingSections++;
            }
        }
    }

    // Generate Markdown Report
    let report = `# Phase A Content Audit Report\n\n`;
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += `## Summary\n`;
    report += `- Total Lessons: ${totalLessons}\n`;
    report += `- Passed Word Count (>=1200): ${totalLessons - failedWordCount}\n`;
    report += `- Failed Word Count (<1200): ${failedWordCount}\n`;
    report += `- Missing Mandatory Sections (SaaS, Creator, Mistakes, or Exercise): ${missingSections}\n\n`;

    report += `## Detailed Findings\n\n`;
    report += `| Course | Lesson | Word Count | SaaS | Creator | Mistakes | Exercise | Visuals | Status |\n`;
    report += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

    for (const res of (results as (AuditResult & { hasVisuals: boolean })[])) {
        const status = (res.wordCount >= 1200 && res.hasSAAS && res.hasCreator && res.hasMistakes && res.hasExercise) ? '✅' : '❌';
        report += `| ${res.courseId} | ${res.lessonId} | ${res.wordCount} | ${res.hasSAAS ? '✅' : '❌'} | ${res.hasCreator ? '✅' : '❌'} | ${res.hasMistakes ? '✅' : '❌'} | ${res.hasExercise ? '✅' : '❌'} | ${res.hasVisuals ? '✅' : '❌'} | ${status} |\n`;
    }

    fs.writeFileSync(path.join(process.cwd(), 'docs/CONTENT-AUDIT-REPORT.md'), report);
    console.log(`\n✅ Audit Complete! Report generated at docs/CONTENT-AUDIT-REPORT.md`);
    console.log(`Found ${failedWordCount} lessons under 1,200 words and ${missingSections} lessons with missing sections.`);
}

runAudit().catch(err => {
    console.error('Audit failed:', err);
    process.exit(1);
});
