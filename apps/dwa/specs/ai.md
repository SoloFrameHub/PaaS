# AI API — Behavioral Specification

## Intent
AI-powered wellness coaching chat and voice features. The coach is personalized
using the user's wellness profile and includes crisis detection for safety.

## Routes

### Chat (requires auth)
- `POST /api/ai/chat` — Send message to wellness coach, receive response

### Voice (requires auth)
- `POST /api/ai/voice/tts` — Text-to-speech (returns audio/mpeg stream)
- `POST /api/ai/voice/stt` — Speech-to-text (accepts audio file upload)

## AI Routing
- **Chat**: Routes through OpenRouter (`OPENROUTER_API_KEY`) — model configured via `lib/ai/models.ts`
- **Voice TTS/STT**: Direct OpenAI API (`OPENAI_API_KEY`) — TTS model: tts-1, STT model: whisper-1

## Behavioral Contracts

### Chat
- Messages validated via `chatSchema`: min 1 char, max 4000, history max 20 turns
- Optional `context` field for current page/course awareness
- Stable wellness context (profile data) is cached in Redis for 5 minutes
- Dynamic context (current page) is always built fresh
- Response includes `crisisDetected` boolean and optional `crisisLevel`
- Crisis detection is logged (no PII) for monitoring

### Voice TTS
- Text max 4096 characters
- Voice options: alloy, echo, fable, onyx, nova, shimmer
- Returns streaming audio/mpeg response

### Voice STT
- Accepts multipart/form-data with audio file
- Supported formats: webm, mp3, wav, m4a, etc.
- Returns transcribed text

## Crisis Detection
- Every chat response is analyzed for crisis indicators
- Crisis levels: none, low, medium, high
- High-crisis responses include 988 Suicide & Crisis Lifeline resources
- Crisis events are logged with userId (no message content) for monitoring

## Rate Limiting
- Chat: per-userId rate limit via Redis
- Voice: per-userId rate limit via Redis
- Returns 429 with user-friendly message

## Error Behavior
| Condition | Status | Message |
|-----------|--------|---------|
| Not authenticated | 401 | "Unauthorized" |
| Rate limited | 429 | "You are sending messages too quickly" |
| Geo-blocked by provider | 503 | "AI service is not available in this server region" |
| Invalid API key | 503 | "AI service configuration error" |
| Generic AI failure | 503 | "Wellness coach temporarily unavailable" |
