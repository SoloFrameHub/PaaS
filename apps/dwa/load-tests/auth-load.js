import http from 'k6/http';
import { check, sleep } from 'k6';

// Test configuration
export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    },
    stages: [
        { duration: '30s', target: 20 }, // Ramp up to 20 users
        { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
        { duration: '30s', target: 0 },  // Ramp down to 0 users
    ],
};

export default function () {
    // 1. Visit Homepage
    const homeRes = http.get('http://localhost:3000');
    check(homeRes, {
        'homepage status is 200': (r) => r.status === 200,
    });

    // 2. Submit Mock Authentication (POST /api/auth/session)
    // Ensure NEXT_PUBLIC_MOCK_AUTH=true is set in your .env.local
    const url = 'http://localhost:3000/api/auth/session';
    const payload = JSON.stringify({
        idToken: 'mock-token',
        uid: `user-${__VU}`, // Virtual User ID
        email: `loadtest-${__VU}@example.com`
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(url, payload, params);

    check(loginRes, {
        'login status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
