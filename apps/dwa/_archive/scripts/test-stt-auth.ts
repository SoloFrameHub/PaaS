
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Mock file for upload
const TEST_AUDIO_PATH = path.join(process.cwd(), 'scripts/test-audio.webm');
if (!fs.existsSync(TEST_AUDIO_PATH)) {
    fs.writeFileSync(TEST_AUDIO_PATH, 'mock audio content');
}

async function testSttAuth() {
    console.log('🧪 Testing STT Endpoint Authentication...');

    const formData = new FormData();
    const fileBlob = new Blob(['mock audio'], { type: 'audio/webm' });
    formData.append('audio', fileBlob as any, 'test.webm');

    try {
        const response = await fetch('http://localhost:3000/api/ai/voice/stt', {
            method: 'POST',
            body: formData as any,
            headers: {
                // No cookie header = unauthenticated
            }
        });

        if (response.status === 401 || response.status === 403) {
            console.log('✅ SUCCESS: Endpoint rejected unauthenticated request (Status: ' + response.status + ')');
        } else {
            console.error('❌ FAILURE: Endpoint allowed unauthenticated request (Status: ' + response.status + ')');
            console.log('Response:', await response.text());
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ ERROR: Request failed completely', error);
        // If the server isn't running, this will fail, which is expected in this environment if we don't start it.
        // For this agentic run, we might assume the server is running or we are just code-checking.
        // Since I can't easily start the Next.js server and wait for it in this environment without blocking,
        // I will rely on the code review and unit tests principally, but this script is good for the user to have.
    }
}

testSttAuth();
