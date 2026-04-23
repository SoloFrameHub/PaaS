Create a comprehensive research package and system prompt for an "AI Wellness Coach" feature for a mental health education platform (Real Psychiatric Services).

CONTEXT: 
- Platform has existing AI chat endpoint (/api/ai/chat) currently used for sales coaching
- Refactoring to mental health wellness coaching
- Anonymous users (no PII collection in Phase 1)
- Educational platform, NOT therapy or treatment
- Must integrate crisis detection and 988 Suicide & Crisis Lifeline escalation

RESEARCH NEEDED:

1. TRAUMA-INFORMED AI CONVERSATION DESIGN
- Principles of trauma-informed communication in digital health
- Validation and normalization techniques
- Pacing and user control (avoiding re-traumatization)
- Choice and autonomy in conversations
- Cultural sensitivity and neurodiversity awareness
- Avoiding pathologizing language

2. CRISIS DETECTION & ESCALATION
- Suicide risk indicators in text-based conversations
- Self-harm language detection
- Crisis escalation protocols for chatbots
- 988 Suicide & Crisis Lifeline integration best practices
- When to interrupt conversation flow for safety
- False positive management (not over-triggering)

3. EDUCATIONAL BOUNDARIES (NOT THERAPY)
- Clear distinction: coaching vs. counseling vs. therapy
- What AI wellness coaches should NEVER do:
  - Diagnose mental health conditions
  - Prescribe treatment plans
  - Replace professional care
  - Make clinical judgments
- What AI wellness coaches CAN do:
  - Provide psychoeducation
  - Suggest coping techniques
  - Normalize experiences
  - Guide to course content
  - Encourage professional help-seeking

4. ANONYMOUS CONTEXT HANDLING
- Conversation memory without PII
- User preference tracking (symptom focus, techniques tried)
- Session continuity for anonymous users
- Privacy-preserving conversation design

5. CONVERSATION CAPABILITIES
- Symptom psychoeducation (anxiety, depression, sleep, etc.)
- Coping technique suggestions (breathing, grounding, cognitive reframing)
- Course content recommendations based on user needs
- Motivational interviewing techniques (readiness, ambivalence)
- Reflective listening and validation
- Goal-setting support
- Progress celebration

6. SAFETY & RATE LIMITING
- Conversation limits (prevent over-reliance)
- When to redirect to human support
- Handling repeated crisis expressions
- Burnout prevention messaging
- Appropriate AI limitations disclosure

DELIVERABLES NEEDED:

A) SYSTEM PROMPT STRUCTURE
- Role definition for AI wellness coach
- Tone and communication style guidelines
- Trauma-informed language patterns
- Boundary statements (what you can/cannot do)
- Crisis detection and escalation protocols
- Sample conversation flows:
  - User expressing anxiety
  - User asking for diagnosis
  - User expressing suicidal ideation
  - User asking if AI can replace therapy

B) CRISIS DETECTION LOGIC
- Keyword/phrase indicators (research-backed)
- Severity levels (mild distress → immediate crisis)
- Response templates for each level
- 988 escalation triggers and messaging

C) INTEGRATION ARCHITECTURE
- How to adapt existing /api/ai/chat endpoint
- Rate limiting recommendations (messages per day/hour)
- Conversation logging for safety (anonymous)
- Prompt engineering for OpenAI GPT-4o-mini/GPT-4o

D) SAMPLE PROMPTS & RESPONSES
- 10+ example user inputs with ideal AI coach responses
- Include: crisis, boundary-testing, help-seeking, technique requests

FORMAT: Organized markdown with:
- Evidence-based crisis detection guidelines
- Complete system prompt (copy-paste ready)
- Integration technical recommendations
- Sample conversation examples

TONE FOR SYSTEM PROMPT: Warm, validating, empowering, gentle, non-pathologizing, hopeful. "I'm here to support your wellness journey."
