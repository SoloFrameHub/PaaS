import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../server/data/content');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

function validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        // Check for unescaped '<' followed by something that isn't a tag start
        // MDX treats < as a tag start. If it's followed by a number, space, or symbol, it often fails.
        // Regex: < followed by not (letter, /, !, or ?)
        const regex = /<(?![a-zA-Z\/!?])/g;
        let match;
        while ((match = regex.exec(line)) !== null) {
            // Ignore code blocks (simplified check, might need robust parser for 100% accuracy)
            if (!line.trim().startsWith('```') && !line.includes('`')) {
                errors.push({
                    line: index + 1,
                    char: match.index + 1,
                    msg: `Potentially unescaped '<' detected. Replace with '&lt;' or 'less than'. Context: "${line.substring(Math.max(0, match.index - 5), Math.min(line.length, match.index + 10))}"`
                });
            }
        }
    });

    return errors;
}

console.log('🔍 Validating Lesson Content in:', CONTENT_DIR);

try {
    const files = getAllFiles(CONTENT_DIR);
    let errorCount = 0;

    files.forEach(file => {
        const relativePath = path.relative(CONTENT_DIR, file);
        const fileErrors = validateFile(file);

        if (fileErrors.length > 0) {
            console.error(`\n❌ Error in ${relativePath}:`);
            fileErrors.forEach(err => {
                console.error(`   Line ${err.line}: ${err.msg}`);
            });
            errorCount += fileErrors.length;
        }
    });

    if (errorCount > 0) {
        console.error(`\n💥 Found ${errorCount} potential MDX errors.`);
        process.exit(1);
    } else {
        console.log('\n✅ All lessons passed validation!');
        process.exit(0);
    }

} catch (e) {
    console.error("Failed to run validation:", e);
    process.exit(1);
}
