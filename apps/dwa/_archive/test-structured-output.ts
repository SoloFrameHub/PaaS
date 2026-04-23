import { ai, gemini15Flash } from './lib/genkit/config';
import { z } from 'zod';

const TestSchema = z.object({
    feedback: z.string(),
    suggestions: z.array(z.string()),
    score: z.number().min(0).max(100),
});

async function testStructuredOutput() {
    console.log('Testing Gemini 1.5 Flash with different output formats...\n');

    // Test 1: format: 'json' with schema
    try {
        console.log('Test 1: format: "json" with schema');
        const result1 = await ai.generate({
            model: gemini15Flash,
            prompt: 'Provide feedback on this reflection: "I want to target CTOs". Return JSON with feedback (string), suggestions (array of strings), and score (0-100).',
            output: {
                format: 'json',
                schema: TestSchema
            },
        });
        console.log('✅ Success:', JSON.stringify(result1.output, null, 2));
    } catch (err: any) {
        console.log('❌ Failed:', err.message);
    }

    console.log('\n---\n');

    // Test 2: Just schema (no format)
    try {
        console.log('Test 2: schema only (no format)');
        const result2 = await ai.generate({
            model: gemini15Flash,
            prompt: 'Provide feedback on this reflection: "I want to target CTOs". Return JSON with feedback (string), suggestions (array of strings), and score (0-100).',
            output: {
                schema: TestSchema
            },
        });
        console.log('✅ Success:', JSON.stringify(result2.output, null, 2));
    } catch (err: any) {
        console.log('❌ Failed:', err.message);
    }

    console.log('\n---\n');

    // Test 3: No structured output, parse manually
    try {
        console.log('Test 3: No structured output (manual parsing)');
        const result3 = await ai.generate({
            model: gemini15Flash,
            prompt: 'Provide feedback on this reflection: "I want to target CTOs". Return ONLY valid JSON with these exact fields: feedback (string), suggestions (array of strings), score (number 0-100). No markdown, no explanation, just raw JSON.',
        });
        const parsed = JSON.parse(result3.text);
        console.log('✅ Success:', JSON.stringify(parsed, null, 2));
    } catch (err: any) {
        console.log('❌ Failed:', err.message);
    }
}

testStructuredOutput();
