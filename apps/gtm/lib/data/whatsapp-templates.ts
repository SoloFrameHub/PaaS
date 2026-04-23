/**
 * WhatsApp outreach templates for LatAm founders.
 *
 * Per research (Prompt A2): Well-structured WhatsApp sales sequences respect
 * warmth, pacing, and add value at each step. Voice notes are a culturally
 * native trust signal — they feel personal, not automated.
 *
 * These templates use tú register (per C1 guidelines) and preserve English
 * tech terms where natural in LatAm startup culture.
 */

export interface WhatsAppTemplate {
  id: string;
  /** i18n key under the "outreach" namespace */
  translationKey: string;
  /** Default Spanish text with [placeholders] */
  template: string;
  /** When to use this template */
  context: string;
  /** Suggested action type to log */
  suggestedAction: "initial_outreach" | "follow_up" | "voice_note" | "other";
}

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "cold_intro",
    translationKey: "templateColdIntro",
    template:
      "Hola [Nombre], vi que estás en [industria] y quería presentarme — soy [nombre], estoy construyendo [solución] para [problema]. ¿Tienes 10 minutos esta semana para un café virtual?",
    context: "First contact with a cold prospect found via LinkedIn or events",
    suggestedAction: "initial_outreach",
  },
  {
    id: "follow_up",
    translationKey: "templateFollowUp",
    template:
      "Hola [Nombre], te escribí hace unos días sobre [tema]. Solo quería ver si tenía sentido conversar. ¿Sí o no? Sin compromiso.",
    context: "Day 3-5 follow-up when first message got no reply",
    suggestedAction: "follow_up",
  },
  {
    id: "post_demo",
    translationKey: "templatePostDemo",
    template:
      "Fue un placer hablar hoy, [Nombre]. Te envío un resumen de lo que conversamos + próximos pasos. ¿Cuándo podemos avanzar?",
    context: "Immediately after a demo or discovery call",
    suggestedAction: "follow_up",
  },
  {
    id: "voice_note_prompt",
    translationKey: "templateVoiceNote",
    template:
      "(Graba una nota de voz de 60 segundos) Muchas gracias por tu tiempo, aquí va un resumen rápido…",
    context:
      "Re-engaging after 5+ days of silence — voice notes dramatically increase reply rates in LatAm",
    suggestedAction: "voice_note",
  },
  {
    id: "inbound_qualifier",
    translationKey: "templateInboundQualifier",
    template:
      "Hola [Nombre], gracias por escribirnos. Cuéntame, ¿cuál es el mayor desafío que tienes hoy con [área]?",
    context:
      "Responding to an inbound WhatsApp message within 5 minutes (per A2 research)",
    suggestedAction: "initial_outreach",
  },
];
