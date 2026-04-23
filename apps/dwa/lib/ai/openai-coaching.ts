/**
 * AI Wellness Coach - Trauma-informed coaching for mental health education
 * Uses OpenAI for compassionate, evidence-based wellness support
 */

import OpenAI from 'openai';
import { aiClient, assertAIKey } from '@/lib/ai/client';
import { resolveModel, logTokenUsage } from '@/lib/ai/models';

export interface CoachingParams {
    message: string;
    history: { role: 'user' | 'assistant'; content: string }[];
    /** Pre-built wellness context string (profile + course context). */
    contextString: string;
}

// Crisis detection keywords - research-backed indicators
const CRISIS_KEYWORDS = {
    immediate: [
        'want to die', 'going to kill myself', 'ending my life', 'suicide plan',
        'better off dead', 'no reason to live', 'can\'t go on', 'ending it all',
        'kill myself', 'hurt myself badly', 'overdose', 'jump off', 'hang myself'
    ],
    high: [
        'suicidal', 'self-harm', 'cutting myself', 'hurting myself',
        'don\'t want to be here', 'wish I wasn\'t alive', 'hopeless',
        'no point in living', 'everyone would be better without me'
    ],
    moderate: [
        'can\'t take it anymore', 'feeling trapped', 'no way out',
        'overwhelmed', 'breaking down', 'falling apart', 'desperate'
    ]
};

/**
 * Detects crisis level from user message
 */
export function detectCrisisLevel(message: string): 'none' | 'moderate' | 'high' | 'immediate' {
    const lowerMessage = message.toLowerCase();

    for (const keyword of CRISIS_KEYWORDS.immediate) {
        if (lowerMessage.includes(keyword)) return 'immediate';
    }

    for (const keyword of CRISIS_KEYWORDS.high) {
        if (lowerMessage.includes(keyword)) return 'high';
    }

    for (const keyword of CRISIS_KEYWORDS.moderate) {
        if (lowerMessage.includes(keyword)) return 'moderate';
    }

    return 'none';
}

/**
 * Builds the wellness coach system prompt
 */
function buildSystemPrompt(contextString: string): string {
    return `You are a compassionate AI Wellness Coach for a mental health education platform. Your role is to provide supportive, trauma-informed guidance while helping users learn about mental wellness.

## YOUR IDENTITY
- You are a supportive wellness guide, NOT a therapist, counselor, or medical professional
- You provide psychoeducation, coping techniques, and emotional support
- You are warm, validating, and empowering
- You use trauma-informed communication principles

## WHAT YOU CAN DO
✓ Provide psychoeducation about mental health topics (anxiety, depression, sleep, etc.)
✓ Suggest evidence-based coping techniques (breathing exercises, grounding, cognitive reframing)
✓ Normalize and validate emotional experiences
✓ Guide users to relevant course content on the platform
✓ Encourage professional help-seeking when appropriate
✓ Celebrate progress and small wins
✓ Offer hope and perspective

## WHAT YOU CANNOT DO
✗ Diagnose mental health conditions
✗ Prescribe medications or treatment plans
✗ Replace professional therapy or psychiatric care
✗ Make clinical judgments about someone's condition
✗ Promise that techniques will "cure" or "fix" mental health issues
✗ Access personal medical records or therapy notes

## TRAUMA-INFORMED PRINCIPLES
1. **Safety First**: Always prioritize user safety. Never minimize distress.
2. **Choice & Autonomy**: Offer options, not directives. "Would you like to try..." not "You should..."
3. **Validation**: Acknowledge feelings before offering solutions. "That sounds really difficult."
4. **Pacing**: Let the user lead. Don't rush to fix or solve.
5. **Cultural Humility**: Avoid assumptions about background, beliefs, or circumstances.
6. **Strengths-Based**: Focus on resilience and coping abilities they already have.

## CRISIS RESPONSE PROTOCOL
If someone expresses thoughts of suicide, self-harm, or immediate danger:

1. Acknowledge their pain with compassion
2. IMMEDIATELY provide the 988 Suicide & Crisis Lifeline
3. Encourage them to reach out for support
4. Stay present and supportive

Example crisis response:
"I hear how much pain you're in right now, and I'm genuinely concerned about your safety. These feelings are serious, and you deserve immediate support from someone who can really help.

**Please reach out to the 988 Suicide & Crisis Lifeline right now:**
📞 Call or text **988** (available 24/7)
💬 Chat at 988lifeline.org

You don't have to face this alone. Would you be willing to reach out to them?"

## COMMUNICATION STYLE
- Use warm, conversational language
- Keep responses concise but caring (2-4 paragraphs typically)
- Ask clarifying questions to understand better
- Offer specific, actionable suggestions when appropriate
- End with an invitation to continue the conversation

## USER CONTEXT
${contextString}

Remember: You are here to support someone's wellness journey, not to replace professional care. When in doubt, encourage professional support and provide crisis resources.`;
}

/**
 * Generates crisis response for immediate/high risk situations
 */
function generateCrisisResponse(level: 'immediate' | 'high'): string {
    if (level === 'immediate') {
        return `I'm really concerned about what you're sharing, and I want you to know that what you're feeling matters deeply. But right now, I need you to reach out to someone who can truly help keep you safe.

**Please contact the 988 Suicide & Crisis Lifeline immediately:**
📞 **Call or text 988** - Available 24/7, free and confidential
💬 **Chat online:** 988lifeline.org

These counselors are trained to help, and they're available right now.

If you're in immediate danger, please call 911 or go to your nearest emergency room.

I'm here for you, but this is bigger than what I can help with alone. You deserve real human support right now. Will you reach out to 988?`;
    }

    return `I hear how much pain you're in, and I want you to know that you're not alone. What you're describing sounds really difficult, and I'm genuinely concerned about your wellbeing.

I want to make sure you have support available:

**988 Suicide & Crisis Lifeline**
📞 Call or text **988** - Available 24/7
💬 Chat at 988lifeline.org

These are real people who understand what you're going through and can help.

Would you be willing to tell me more about what's going on? And would you consider reaching out to 988 for additional support?`;
}

/**
 * Returns the wellness coach's reply as a streaming ReadableStream.
 * Crisis info is returned alongside for use in response headers.
 */
export async function openaiCoachingReplyStream(params: CoachingParams): Promise<{
    stream: ReadableStream<Uint8Array>;
    crisisDetected: boolean;
    crisisLevel: 'none' | 'moderate' | 'high' | 'immediate';
}> {
    const { message, history, contextString } = params;
    const crisisLevel = detectCrisisLevel(message);
    const encoder = new TextEncoder();

    // For immediate or high crisis, stream the pre-built response instantly
    if (crisisLevel === 'immediate' || crisisLevel === 'high') {
        const crisisText = generateCrisisResponse(crisisLevel);
        const stream = new ReadableStream<Uint8Array>({
            start(controller) {
                controller.enqueue(encoder.encode(crisisText));
                controller.close();
            },
        });
        return { stream, crisisDetected: true, crisisLevel };
    }

    assertAIKey();
    const systemPrompt = buildSystemPrompt(contextString);
    const model = resolveModel('coaching');

    const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...history.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
        })),
        { role: 'user', content: message },
    ];

    const completion = await aiClient.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 600,
        stream: true,
    });

    const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) controller.enqueue(encoder.encode(content));
                }
            } finally {
                controller.close();
            }
        },
    });

    return { stream, crisisDetected: crisisLevel !== 'none', crisisLevel };
}

/**
 * Returns the wellness coach's reply using OpenAI chat completions.
 */
export async function openaiCoachingReply(params: CoachingParams): Promise<{
    message: string;
    crisisDetected: boolean;
    crisisLevel: 'none' | 'moderate' | 'high' | 'immediate';
}> {
    const { message, history, contextString } = params;
    assertAIKey();

    // Check for crisis indicators
    const crisisLevel = detectCrisisLevel(message);

    // For immediate or high crisis, return pre-defined crisis response
    if (crisisLevel === 'immediate' || crisisLevel === 'high') {
        return {
            message: generateCrisisResponse(crisisLevel),
            crisisDetected: true,
            crisisLevel,
        };
    }

    const systemPrompt = buildSystemPrompt(contextString);

    const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...history.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
        })),
        { role: 'user', content: message },
    ];

    const model = resolveModel('coaching');
    const completion = await aiClient.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 600,
    });
    logTokenUsage('coaching', model, completion.usage ?? undefined);

    const choice = completion.choices[0];
    const content = choice?.message?.content;

    if (content == null) {
        throw new Error('OpenAI returned no content');
    }

    return {
        message: content,
        crisisDetected: crisisLevel !== 'none',
        crisisLevel,
    };
}

// Legacy export for backward compatibility
export { openaiCoachingReply as openaiCoachReply };
