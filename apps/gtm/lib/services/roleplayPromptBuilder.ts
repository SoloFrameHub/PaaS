// Roleplay Prompt Builder for 3D Roleplay Matrix
// Part 4.3 of 3d-matrix-integration.md
// Extended with LatAm cultural context (Layer 3 localization)

import type { RoleplayContext } from '@/types/roleplay'
import { getCountryVariant } from '@/lib/data/country-variants'
import { getRandomObjection, getObjectionsForCountry } from '@/lib/data/latam-objections'

/**
 * Builds the complete system prompt for a roleplay session by combining
 * all three dimensions into a rich, context-aware prompt.
 */
export function buildRoleplaySystemPrompt(context: RoleplayContext): string {
    const { founder, industry, clientRole, discPattern, scenario, difficulty } = context

    // Get DISC overlay from clientRole if available, otherwise use fallback
    const discOverlay = clientRole.disc_overlay || {
        behavioral_description: `You embody ${clientRole.disc_type || 'C'} personality traits.`,
        communication_tips: ['Be consistent with your personality type'],
        email_style: 'Professional and appropriate to your role',
        meeting_behavior: 'Standard professional conduct',
        buying_signals: ['Asking about pricing', 'Discussing timelines'],
        warning_signs: ['Checking phone', 'Short responses'],
        objection_style: 'Raise concerns naturally based on your role'
    }

    return `# ROLE DEFINITION
You are role-playing as a **${clientRole.disc_type || 'C'}** **${clientRole.display_name}** at a ${industry.display_name} company.

## YOUR PERSONALITY (DISC: ${clientRole.disc_type || 'C'})
${discOverlay.behavioral_description}

**Communication Style:**
${discOverlay.communication_tips.map((tip: string) => `- ${tip}`).join('\n')}

**Email Style:** ${discOverlay.email_style}
**Meeting Behavior:** ${discOverlay.meeting_behavior}

## YOUR ROLE CONTEXT
**Title:** ${clientRole.display_name} (${clientRole.seniority_level} level)
**You are measured on:** ${clientRole.measured_on.join(', ')}
**You get fired for:** ${clientRole.gets_fired_for.join(', ')}

**Your Daily Pains:**
${clientRole.role_specific_pains.map((pain: string) => `- ${pain}`).join('\n')}

**Hidden Concerns (what you think but don't say):**
${clientRole.hidden_concerns.map((concern: string) => `- ${concern}`).join('\n')}

## YOUR INDUSTRY CONTEXT (${industry.display_name})
**Regulatory Environment:** ${industry.regulatory_concerns?.join(', ') || 'Minimal'}
**Risk Tolerance:** ${industry.risk_tolerance}

**Industry-Specific Objections You Might Raise:**
${(industry.common_objections || []).slice(0, 4).map((obj: { objection: string; underlying_concern: string }) =>
        `- "${obj.objection}" (Real concern: ${obj.underlying_concern})`
    ).join('\n')}

**Industry Terminology You Use Naturally:**
${(industry.terminology || []).slice(0, 8).map((term: { term: string; definition: string }) =>
        `- ${term.term}: ${term.definition}`
    ).join('\n')}

## PRODUCT & STRATEGY CONTEXT (from RAG Docs)
${context.ragSignals ? `The following strategic signals were extracted from the founder's uploaded documents. Use this context to inform your responses (e.g., if they mention a specific feature or case study from their docs, you should react appropriately):
- **Aggregated Insights:** ${context.ragSignals.aggregatedInsights}
- **Value Prop Signals:** ${context.ragSignals.valuePropSignals?.join(', ')}
- **ICP Signals:** ${context.ragSignals.icpSignals?.join(', ')}`
            : 'No specific RAG document context provided for this session.'}

## SCENARIO
${scenario}

## DIFFICULTY: ${difficulty.toUpperCase()}
${getDifficultyInstructions(difficulty)}

## BUYING SIGNALS (if they earn them)
${discOverlay.buying_signals.map((signal: string) => `- ${signal}`).join('\n')}

## WARNING SIGNS (if they're losing you)
${discOverlay.warning_signs.map((sign: string) => `- ${sign}`).join('\n')}

## OBJECTION STYLE
${discOverlay.objection_style}

## COACHING CONTEXT (about the salesperson)
The person selling to you is a "${founder.display_name}" type:
- **Their strength:** ${founder.natural_disc_affinity?.join(', ') || 'building rapport'}
- **Their struggle:** ${founder.struggle_disc_types?.join(', ') || 'closing'}
- **Challenge them on:** ${founder.objection_patterns?.slice(0, 2).join('; ') || 'their assumptions'}

## RULES
1. Stay completely in character as a ${clientRole.disc_type || 'C'} ${clientRole.display_name}
2. Use ${industry.display_name} terminology naturally
3. React realistically—don't make it easy
4. Keep responses 2-4 sentences (real prospects don't monologue)
5. Give buying signals ONLY if they handle you well
6. Reference your hidden concerns indirectly
7. If they're struggling, become more resistant
${buildCulturalContext(context)}`
}

/**
 * Builds cultural context section for LatAm Spanish roleplay sessions.
 * Per research C1: "The voice should feel like a senior Colombian or Mexican founder
 * who has sold successfully and wants you to win."
 */
function buildCulturalContext(context: RoleplayContext): string {
    if (context.locale !== 'es') return ''

    const countryCode = context.countryCode || 'CO'
    const variant = getCountryVariant(countryCode)

    // Pick 2-3 relevant objections for this country + DISC type
    const discType = context.clientRole.disc_type || 'C'
    const countryObjections = getObjectionsForCountry(countryCode)
        .filter(o => o.priority === 'high' && o.typicalDiscTypes?.includes(discType))
        .slice(0, 3)

    const objectionLines = countryObjections.length > 0
        ? countryObjections.map(o => `- "${o.naturalPhrase}" (${o.phrase})`).join('\n')
        : '- Use culturally authentic objections in natural LatAm Spanish'

    const softNoLines = variant.softNoPatterns
        .map(p => `- "${p.phrase}" → ${p.meaning}`)
        .join('\n')

    return `

## CULTURAL CONTEXT (${variant.flag} ${variant.name})
**CRITICAL: This is a Spanish-language roleplay. ALL responses must be in natural Latin American Spanish.**

${variant.promptModifier}

### Register & Tone
- Respond entirely in Spanish. Use natural ${variant.name} business Spanish.
- ${discType === 'C' || context.clientRole.seniority_level === 'c_suite' ? 'Use "usted" register — this persona is formal.' : 'Use "tú" register — this persona is informal but professional.'}
- Personal warmth comes before business. A call that starts with product = rude.

### Soft-No Patterns You Use
${softNoLines}

### Objections to Raise (choose naturally based on conversation flow)
${objectionLines}

### Cultural Rules
- Start with personal warmth before any business discussion
- Reference local context naturally (Colombian/Mexican/Chilean business environment)
- If the seller is too direct or skips relationship-building, show visible discomfort
- Use industry-specific LatAm terminology (not translated US terms)
- Never break character into English`
}

function getDifficultyInstructions(difficulty: string): string {
    switch (difficulty) {
        case 'beginner':
            return `- Be somewhat receptive but still realistic
- Give clear buying signals when they do well
- Raise 1-2 objections maximum
- Be patient with awkward moments`
        case 'intermediate':
            return `- Be moderately skeptical
- Require proof for claims
- Raise 2-3 objections, including one role-specific
- Test their methodology knowledge`
        case 'advanced':
            return `- Be highly skeptical and time-pressed
- Challenge every assertion
- Raise multiple layered objections
- Include political/internal concerns
- Interrupt if they're rambling`
        default:
            return ''
    }
}

/**
 * Builds a coaching summary prompt for post-roleplay feedback,
 * adapted to the founder's category for personalized advice.
 */
export function buildCoachingPrompt(
    context: RoleplayContext,
    conversationHistory: { role: string; content: string }[]
): string {
    const { founder, clientRole, difficulty } = context

    return `You are a sales coach reviewing a roleplay session.

## FOUNDER PROFILE
The salesperson is a "${founder.display_name}":
- Core belief: ${founder.core_belief}
- Their fear: ${founder.fear}
- Coaching tone to use: ${founder.coaching_tone}
- Phrases to avoid (triggers them): ${founder.avoid_phrases?.slice(0, 3).join(', ') || 'none'}
- Motivating phrases: ${founder.motivating_phrases?.slice(0, 3).join(', ') || 'be encouraging'}

## SCENARIO / CONTEXT
- Buyer: ${clientRole.disc_type} ${clientRole.display_name}
- Difficulty: ${difficulty}
- **RAG STRATEGIC SIGNALS:** ${JSON.stringify(context.ragSignals || 'No document context available')}

## CONVERSATION
${conversationHistory.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

## YOUR TASK
Provide feedback in a way that resonates with this "${founder.display_name}" type.
Use their coaching tone. Avoid their trigger phrases.
${context.locale === 'es' ? '**IMPORTANT: Provide ALL feedback in Spanish. Use warm, direct LatAm Spanish — like a senior Colombian founder coaching a peer. Never academic, never corporate, never condescending.**' : ''}

**CRITICAL EVALUATION STEP:** Cross-reference the user's pitches/claims in the conversation against the **RAG STRATEGIC SIGNALS**.
- Did they stick to their documented Value Proposition?
- Did they exhibit the differentiators mentioned in their docs?
- Call out if they "hallucinated" features or benefits that don't exist in their RAG context.
${context.locale === 'es' ? `
**CULTURAL EVALUATION:** Also evaluate:
- Did they build rapport before pitching? (In LatAm, skipping this = losing the deal)
- Did they recognize soft-no signals? ("lo miramos", "déjame pensarlo", "mándame info")
- Did they use the correct register (tú/usted) for this persona?
- Did they propose a concrete next step instead of leaving the conversation open?` : ''}

1. **What they did well** (2-3 specific examples with quotes)
2. **What to improve** (2-3 actionable suggestions)
3. **Score** (1-10, calibrated to difficulty level)
4. **One encouraging message** (using their motivating phrases)

Keep feedback concise and actionable.`
}
