
import { ai, gemini15Flash } from './lib/genkit/config';

async function listModels() {
    try {
        const result = await ai.generate({
            model: gemini15Flash,
            prompt: 'test'
        });
        console.log('Gemini 1.5 Flash result:', result.text);
    } catch (err: any) {
        console.error('Model Error:', err.message);
    }
}

listModels();
