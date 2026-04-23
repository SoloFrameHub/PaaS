# Solo Frame Hub - API Documentation

## Authentication
All protected endpoints require a `session` cookie.

---

## Onboarding API

### `POST /api/onboarding/analyze`
Starts or resumes the AI-powered founder analysis.

**Request Body:**
```json
{
  "onboardingData": {
    "userName": "string",
    "companyName": "string",
    "businessModel": "b2b-saas | creator-coach | ...",
    "website": "url",
    "linkedinUrl": "url",
    "pitch": "string",
    "revenueGoal": "string",
    "stage": "idea | seed | ...",
    "questionnaire": { "topic": "answer" },
    "uploadedDocuments": [{ "id": "string", "name": "string", "content": "string" }]
  }
}
```

**Response:**
```json
{
  "success": true,
  "assessment": {
    "overallReadiness": number,
    "scores": { "icpClarity": number, ... },
    "quickWins": [...],
    "criticalGaps": [...],
    "personalizedInsight": "string"
  }
}
```

---

## Academy API

### `POST /api/academy/complete-lesson`
Marks a lesson as completed and rewards XP.

**Request Body:**
```json
{
  "courseNumber": number,
  "lessonId": "string"
}
```

---

## Profile API

### `GET /api/profile`
Returns the current user's profile.

### `PATCH /api/profile`
Updates specific profile fields.

---

## AI API (Internal Flows)

These are orchestrated via Genkit and usually wrapped by the above API routes.

- **LinkedIn Analyzer**: Extracts professional context from LinkedIn URLs.
- **Website Analyzer**: Scrapes and analyzes business value propositions.
- **RAG Indexer**: Processes documents for context-aware roleplays and coaching.
- **Assessment Generator**: The "Master Brain" that aggregates all context into the final readiness score.

---

## Security
- **Rate Limiting**: 60 req/min (General), 10 req/min (AI).
- **CSRF**: Origin verification on all POST/PATCH/PUT requests.
