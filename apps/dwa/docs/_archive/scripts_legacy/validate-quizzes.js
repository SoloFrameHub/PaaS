const fs = require('fs');
const path = require('path');

const BASE_QUIZ_PATH = path.join(__dirname, '../server/data/quizzes');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.json')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const quizFiles = getAllFiles(BASE_QUIZ_PATH);
let totalErrors = 0;

console.log(`Validating ${quizFiles.length} quiz files...\n`);

quizFiles.forEach(filePath => {
    const relativePath = path.relative(BASE_QUIZ_PATH, filePath);
    let errors = [];

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        // 1. Root structure check
        if (Array.isArray(data)) {
            errors.push("CRITICAL: Root is an array, MUST be an object { questions: [] }");
        } else if (!data.questions || !Array.isArray(data.questions)) {
            errors.push("CRITICAL: Missing 'questions' array");
        } else {
            // 2. Question count check
            if (data.questions.length !== 5) {
                errors.push(`Warning: Has ${data.questions.length} questions, expected 5`);
            }

            // 3. Individual question checks
            data.questions.forEach((q, idx) => {
                const qLabel = `Q${idx + 1} (${q.id || 'no-id'})`;

                if (!q.type) {
                    errors.push(`${qLabel}: Missing 'type'`);
                } else if (q.type === 'single_choice') {
                    errors.push(`${qLabel}: Incorrect type 'single_choice', MUST be 'multiple-choice'`);
                }

                if (q.type === 'multiple-choice' || q.type === 'single_choice') {
                    if (!q.options || !Array.isArray(q.options)) {
                        errors.push(`${qLabel}: Missing 'options' array`);
                    } else if (q.options.length === 0) {
                        errors.push(`${qLabel}: Options array is empty`);
                    } else {
                        q.options.forEach((opt, optIdx) => {
                            if (typeof opt !== 'object' || !opt.id || !opt.text) {
                                errors.push(`${qLabel}: Option ${optIdx + 1} is not an object with id and text`);
                            }
                        });
                    }

                    if (!q.correctAnswer) {
                        errors.push(`${qLabel}: Missing 'correctAnswer'`);
                    }
                    if (!q.explanation) {
                        errors.push(`${qLabel}: Missing 'explanation'`);
                    }
                }
            });
        }
    } catch (e) {
        errors.push(`CRITICAL: Malformed JSON: ${e.message}`);
    }

    if (errors.length > 0) {
        console.log(`❌ ${relativePath}`);
        errors.forEach(err => console.log(`   - ${err}`));
        totalErrors += errors.length;
    }
});

if (totalErrors === 0) {
    console.log("\n✅ All quizzes passed validation.");
    process.exit(0);
} else {
    console.log(`\nTotal errors found: ${totalErrors}`);
    process.exit(1);
}
