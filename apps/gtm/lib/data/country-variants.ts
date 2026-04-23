/**
 * Country variant configs for LatAm roleplay localization.
 *
 * Per research (A4): Colombia-first defaults, with country-specific adjustments
 * for Mexico, Chile, Argentina, and Spain.
 *
 * Each variant modifies tone instructions, soft-no patterns, and cultural context
 * injected into the roleplay system prompt.
 */

export interface CountryVariant {
  code: string;
  /** Display name in Spanish */
  name: string;
  /** Flag emoji */
  flag: string;
  /** Key cultural note for the AI prompt */
  culturalNote: string;
  /** Communication tone description */
  tone: string;
  /** Deal pace / timing */
  dealPace: string;
  /** Primary trust signal */
  trustSignal: string;
  /** Common soft-no phrases and what they really mean */
  softNoPatterns: { phrase: string; meaning: string }[];
  /** Sidebar note for curriculum — shown to learners */
  sidebarNote: string;
  /** Additional prompt instructions for the AI */
  promptModifier: string;
}

export const COUNTRY_VARIANTS: Record<string, CountryVariant> = {
  CO: {
    code: "CO",
    name: "Colombia",
    flag: "🇨🇴",
    culturalNote:
      "Personal warmth (simpatía) is the prerequisite — a call that starts with business is perceived as rude, not efficient. Colombian SMEs are 99.5% of formal companies; the owner decides but often consults a trusted advisor or accountant.",
    tone: "Warm, indirect, relational. Bogotá buyers are more formal and hierarchical; Medellín is faster, more entrepreneurial.",
    dealPace:
      "Moderate — relationship phase is long. Expect 2-4 relationship-building touches before any commercial conversation.",
    trustSignal:
      "Shared network reference; local presence; verifiable Colombian client stories.",
    softNoPatterns: [
      {
        phrase: "Lo miramos",
        meaning: "Rarely means active consideration — typically signals discomfort with saying no directly.",
      },
      {
        phrase: "Lo pensamos",
        meaning: "Without a committed next step, this is a dead deal 80% of the time.",
      },
      {
        phrase: "Déjame consultarlo",
        meaning: "May be legitimate (family-owned SMEs) or a delay mechanism. Ask to include the stakeholder.",
      },
    ],
    sidebarNote:
      "En Colombia, la simpatía personal es requisito antes de hablar de negocio. Si tu primera frase es sobre tu producto, ya perdiste terreno.",
    promptModifier: `COLOMBIAN CONTEXT:
- Start with personal warmth — ask about them before talking business
- Use Colombian business expressions naturally ("¿cómo va todo?", "con mucho gusto")
- Bogotá personas are more formal; Medellín personas are more entrepreneurial
- SME owners often consult a trusted advisor before deciding — mention this naturally
- "Lo miramos" and "lo pensamos" are soft-nos unless accompanied by a specific next step`,
  },
  MX: {
    code: "MX",
    name: "México",
    flag: "🇲🇽",
    culturalNote:
      "The patience market. Directness is culturally equated with aggression. Hierarchy and formal titles (Licenciado, Ingeniero) are strictly observed. 'Claro que sí' can mean no.",
    tone: "Very indirect; harmony over clarity. Highest use of soft-no language in the region.",
    dealPace:
      "Long — can stall without a champion. 3+ months is common. Requires the most patience of any LatAm market.",
    trustSignal:
      "Longevity, references, patience. Demonstrated commitment over time.",
    softNoPatterns: [
      {
        phrase: "Claro que sí",
        meaning: "One of the most common ways to say no. Enthusiastic affirmation followed by silence = polite exit.",
      },
      {
        phrase: "Mándame información y te aviso",
        meaning: "Classic disengagement signal. Information sent without follow-up generates near-zero pipeline movement.",
      },
      {
        phrase: "Ahorita lo vemos",
        meaning: "'Ahorita' in Mexico can mean 'never'. Without a calendar invite, treat as a soft no.",
      },
    ],
    sidebarNote:
      "En México, la respuesta a tu propuesta más difícil de interpretar es el sí entusiasta. Si no hay un siguiente paso claro acordado, asume que el deal está frío.",
    promptModifier: `MEXICAN CONTEXT:
- Be more indirect and patient than with Colombian prospects
- Use formal titles naturally (Licenciado, Ingeniero) unless invited otherwise
- Express disagreement gently — directness feels aggressive
- "Claro que sí" is often a polite exit, not genuine agreement — test with next-step commitment
- Deals require more touches and longer timelines — don't push for a close too early
- "Mándame información" is a classic exit — redirect to a specific follow-up date`,
  },
  CL: {
    code: "CL",
    name: "Chile",
    flag: "🇨🇱",
    culturalNote:
      "The analytical outlier. Most commercially mature SaaS market in LatAm and most direct communicator. Data, case studies, and structured ROI arguments open doors that would require relationship-building calls elsewhere.",
    tone: "Direct, analytical, pragmatic. Closest analog to a European B2B buyer in the region.",
    dealPace:
      "Faster once qualified. Chilean buyers are comfortable saying no clearly — pipeline qualification is faster and more reliable.",
    trustSignal:
      "Track record, ROI proof, case studies with measurable results.",
    softNoPatterns: [
      {
        phrase: "No creo que nos sirva",
        meaning: "Genuine — Chileans say no more directly. Respect it and ask what would change their mind.",
      },
      {
        phrase: "Muéstrame los números",
        meaning: "Not an objection — it's a buying signal. They want to be convinced with data.",
      },
    ],
    sidebarNote:
      "En Chile, el proceso de venta es más corto si llegas preparado con datos. No necesitas 3 llamadas de relación antes de presentar — pero sí necesitas tener los números claros.",
    promptModifier: `CHILEAN CONTEXT:
- Be more direct and data-driven than with Colombian prospects
- Lead with ROI, case studies, and structured arguments
- Relationship-building can be shorter — a well-prepared deck opens doors
- Chileans will say no clearly — this is an asset for pipeline qualification
- Skip excessive warmth — get to the value proposition faster
- Use precise language and avoid vague promises`,
  },
  AR: {
    code: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    culturalNote:
      "Intellectual respect as trust currency. Argentine professionals express engagement through debate and challenge, not agreement. Pushback is often a sign of genuine interest. Economic volatility (inflation, currency controls) is always a factor.",
    tone: "Very direct; debate-as-respect. Pushback on your proposal = genuine interest.",
    dealPace:
      "Unpredictable — economic volatility adds uncertainty. Buyers may delay for macroeconomic reasons outside your control.",
    trustSignal:
      "Intellectual credibility; frank dialogue; ability to hold your position with data.",
    softNoPatterns: [
      {
        phrase: "No me cierra",
        meaning: "Genuine objection — they want you to argue your case better. Don't cave.",
      },
      {
        phrase: "La situación del país...",
        meaning: "May be genuine macro concern or blanket deferral. Ask if the problem disappears when the economy improves.",
      },
    ],
    sidebarNote:
      "En Argentina, si el prospecto debate tu propuesta con fuerza, es buena señal. Aprende a sostener tu posición con calma y datos — ceder de inmediato se interpreta como falta de convicción en tu producto.",
    promptModifier: `ARGENTINE CONTEXT:
- Be prepared for direct pushback — it's a sign of engagement, not rejection
- Hold your position with data and confidence — caving immediately loses credibility
- Economic concerns are always present — pricing in USD is standard for digital services
- Debate is a form of respect — engage intellectually, don't retreat
- Skip excessive formality — Argentine professionals move to first names quickly
- If challenged, stand firm with data and warmth — this earns trust`,
  },
};

/** Get country variant by code, defaulting to Colombia */
export function getCountryVariant(code: string): CountryVariant {
  return COUNTRY_VARIANTS[code] || COUNTRY_VARIANTS.CO;
}

/** Get all available country variant codes */
export function getAvailableCountries(): { code: string; name: string; flag: string }[] {
  return Object.values(COUNTRY_VARIANTS).map((v) => ({
    code: v.code,
    name: v.name,
    flag: v.flag,
  }));
}
