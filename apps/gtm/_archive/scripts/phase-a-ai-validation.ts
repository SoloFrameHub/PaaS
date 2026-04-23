import * as flows from '../lib/genkit/flows/salesRoleplay';
import * as flows3D from '../lib/genkit/flows/salesRoleplay3D';
import * as assessment from '../lib/genkit/flows/assessmentGenerator';
import * as quiz from '../lib/genkit/flows/quizReflection';
import * as coaching from '../lib/genkit/flows/coachingChat';

async function validateAIFlows() {
    console.log('🤖 Starting AI Flow Validation...');

    const flowList = [
        { name: 'Sales Roleplay', module: flows },
        { name: 'Sales Roleplay 3D', module: flows3D },
        { name: 'Assessment Generator', module: assessment },
        { name: 'Quiz Reflection', module: quiz },
        { name: 'Coaching Chat', module: coaching }
    ];

    let report = `# AI Flow Validation Report\n\n`;
    report += `Generated: ${new Date().toISOString()}\n\n`;

    for (const item of flowList) {
        console.log(`Checking ${item.name}...`);
        report += `## ${item.name}\n`;

        const exportedKeys = Object.keys(item.module);
        report += `- **Exported Functions**: ${exportedKeys.join(', ')}\n`;

        // Check for specific expected functions (usually named the same as the file or containing 'Flow')
        const mainFlowKey = exportedKeys.find(k => k.toLowerCase().includes('flow') || k.toLowerCase().includes('run'));

        if (mainFlowKey) {
            report += `- **Main Flow Detected**: \`${mainFlowKey}\` ✅\n`;
        } else {
            report += `- **Main Flow Detected**: None found ❌\n`;
        }
        report += `\n`;
    }

    const fs = require('fs');
    const path = require('path');
    fs.writeFileSync(path.join(process.cwd(), 'docs/AI-FLOW-VALIDATION-REPORT.md'), report);
    console.log('\n✅ AI Flow Validation Complete! Report generated at docs/AI-FLOW-VALIDATION-REPORT.md');
}

validateAIFlows().catch(err => {
    console.error('AI Logic Validation failed:', err);
    process.exit(1);
});
