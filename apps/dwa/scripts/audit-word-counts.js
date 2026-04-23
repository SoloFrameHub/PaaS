const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../server/data/content');
const REPORT_FILE = path.join(__dirname, '../final-word-count-report.txt');
const JSON_REPORT_FILE = path.join(__dirname, '../docs/word-count-analysis.json');

function countWords(text) {
    // Remove code blocks
    const noCode = text.replace(/```[\s\S]*?```/g, '');
    // Remove frontmatter
    const noFrontmatter = noCode.replace(/^---[\s\S]*?---/, '');
    // Remove HTML tags
    const noHtml = noFrontmatter.replace(/<[^>]+>/g, '');
    // Simply split by whitespace
    return noHtml.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });
    return arrayOfFiles;
}

const allFiles = getAllFiles(CONTENT_DIR);
let under1000 = 0;
let under1200 = 0;
let totalFiles = 0;
let reportContent = "=== WORD COUNT AUDIT REPORT ===\n";
reportContent += `Date: ${new Date().toISOString()}\n\n`;

const results = [];

allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const wordCount = countWords(content);
    const relativePath = path.relative(CONTENT_DIR, file);

    results.push({ path: relativePath, count: wordCount });
    totalFiles++;
    if (wordCount < 1000) under1000++;
    if (wordCount < 1200) under1200++;
});

// Sort by word count (ascending) to show worst offenders first
results.sort((a, b) => a.count - b.count);

reportContent += `Total Lessons: ${totalFiles}\n`;
reportContent += `High Priority Failures (<1000 words): ${under1000}\n`;
reportContent += `Medium Priority Failures (1000-1199 words): ${under1200 - under1000}\n`;
reportContent += `Total Failures (<1200 words): ${under1200}\n`;
reportContent += `Pass Rate: ${Math.round(((totalFiles - under1200) / totalFiles) * 100)}%\n`;
reportContent += "--------------------------------------------------\n";

reportContent += "🔴 HIGH PRIORITY (<1000 words):\n";
results.forEach(item => {
    if (item.count < 1000) {
        reportContent += `[${item.count} words] ${item.path}\n`;
    }
});

reportContent += "\n--------------------------------------------------\n";
reportContent += "🟡 NEEDS EXPANSION (1000-1199 words):\n";
results.forEach(item => {
    if (item.count >= 1000 && item.count < 1200) {
        reportContent += `[${item.count} words] ${item.path}\n`;
    }
});

reportContent += "\n--------------------------------------------------\n";
reportContent += "✅ PASSING (>=1200 words):\n";
results.forEach(item => {
    if (item.count >= 1200) {
        reportContent += `[${item.count} words] ${item.path}\n`;
    }
});

fs.writeFileSync(REPORT_FILE, reportContent);
fs.writeFileSync(JSON_REPORT_FILE, JSON.stringify({
    date: new Date().toISOString(),
    stats: { total: totalFiles, under1000, under1200, passRate: Math.round(((totalFiles - under1200) / totalFiles) * 100) },
    results
}, null, 2));

console.log(`Audit complete.`);
console.log(`TXT Report: ${REPORT_FILE}`);
console.log(`JSON Report: ${JSON_REPORT_FILE}`);
console.log(`Summary: ${under1200}/${totalFiles} lessons failed (<1200 words).`);
