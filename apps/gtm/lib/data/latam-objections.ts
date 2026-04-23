/**
 * LatAm Objection Library — 20 sales objections for AI roleplay scenarios.
 *
 * Per research (B3): Full 20-objection library with priority matrix.
 * 9 high-priority (full AI roleplay), 8 medium (scripted drill), 3 contextual (reference cards).
 *
 * Each objection includes natural Spanish phrasing, context, hidden reality,
 * discovery questions, and suggested response — all grounded in LatAm sales culture.
 */

export type ObjectionPriority = "high" | "medium" | "contextual";

export type ObjectionCategory =
  | "price_budget"
  | "trust_credibility"
  | "time_decision"
  | "digital_readiness"
  | "process_approval"
  | "competitor_alternatives"
  | "creator_high_ticket"
  | "relationship_timing";

export interface LatAmObjection {
  id: number;
  /** Short key for referencing */
  key: string;
  /** Category grouping */
  category: ObjectionCategory;
  /** The objection phrase in natural LatAm Spanish */
  phrase: string;
  /** Full natural phrasing as a buyer would say it */
  naturalPhrase: string;
  /** Buyer context — who says this */
  context: string;
  /** What the buyer really means */
  hiddenReality: string;
  /** Discovery follow-up questions */
  discoveryQuestions: string[];
  /** Suggested handling response */
  suggestedResponse: string;
  /** Roleplay priority level */
  priority: ObjectionPriority;
  /** Roleplay scenario description (for high-priority) */
  roleplayScenario?: string;
  /** Which DISC types most commonly raise this */
  typicalDiscTypes?: string[];
  /** Country where this is most common (or "universal") */
  regionFocus: string;
}

export const LATAM_OBJECTIONS: LatAmObjection[] = [
  // ─── Category 1: Price & Budget ───────────────────────────────────
  {
    id: 1,
    key: "muy_caro",
    category: "price_budget",
    phrase: "Está muy caro",
    naturalPhrase:
      "Mira, me parece interesante, pero está muy caro para lo que necesitamos ahorita.",
    context: "Universal — SME owner, startup co-founder, mid-market procurement.",
    hiddenReality:
      "Often not a budget refusal but a value gap — the buyer hasn't yet connected price to measurable outcome.",
    discoveryQuestions: [
      "¿Caro comparado con qué? ¿Estás comparando con otra herramienta o con no hacer nada?",
      "Si resolviéramos [problema específico que mencionaste], ¿cuánto te está costando ahora no tenerlo resuelto?",
    ],
    suggestedResponse:
      "Entiendo. No quiero convencerte de gastar — quiero entender si tiene sentido económico para ti. [Resultado concreto de cliente similar]. ¿Eso cambiaría la ecuación para ti?",
    priority: "high",
    roleplayScenario:
      "Objeción de precio con SME colombiana y startup mexicana — practicar reframe de valor.",
    typicalDiscTypes: ["D", "C"],
    regionFocus: "universal",
  },
  {
    id: 2,
    key: "sin_presupuesto",
    category: "price_budget",
    phrase: "No tengo presupuesto este trimestre",
    naturalPhrase:
      "El tema es que el presupuesto ya está asignado hasta fin de año. No podemos meter nada nuevo.",
    context: "Mid-market corporate, finance-controlled SME, post-planning cycle.",
    hiddenReality:
      "May be genuine or a polite delay; must distinguish between budget timing and lack of priority.",
    discoveryQuestions: [
      "¿Cuándo se abre el próximo ciclo de presupuesto?",
      "¿Hay alguna partida de 'herramientas operativas' donde esto podría caber?",
      "¿Si encontráramos la forma de financiarlo en cuotas o empezar con un piloto más pequeño, cambiaría algo?",
    ],
    suggestedResponse:
      "Perfecto — ¿puedo agendarte para [fecha de apertura de presupuesto] con un resumen de lo que hablamos? Así entras al siguiente ciclo ya informado.",
    priority: "medium",
    typicalDiscTypes: ["C", "S"],
    regionFocus: "universal",
  },
  {
    id: 3,
    key: "descuento",
    category: "price_budget",
    phrase: "Me das un descuento y cerramos",
    naturalPhrase:
      "Oye, y si me haces un descuentito, yo te firmo hoy mismo.",
    context: "SME owner (highest frequency), entrepreneurs, negotiation culture.",
    hiddenReality:
      "A cultural reflex, not a real budget limitation — in LatAm, asking for a discount is expected as engagement.",
    discoveryQuestions: [
      "¿El precio es lo único que está pendiente para avanzar, o hay algo más que necesitas revisar primero?",
    ],
    suggestedResponse:
      "No puedo bajar el precio porque afecta lo que puedo darte. Lo que sí puedo hacer es incluirte [onboarding adicional / mes extra / sesión de setup] sin costo. ¿Eso funciona para ti?",
    priority: "medium",
    typicalDiscTypes: ["I", "D"],
    regionFocus: "universal",
  },

  // ─── Category 2: Trust & Credibility ──────────────────────────────
  {
    id: 4,
    key: "no_te_conozco",
    category: "trust_credibility",
    phrase: "No te conozco / ¿Quiénes son sus clientes?",
    naturalPhrase:
      "Disculpa, pero no te conozco a ti ni a tu empresa. ¿Con quién más han trabajado?",
    context: "First cold contact in Colombia or Mexico; any buyer evaluating a solo founder.",
    hiddenReality:
      "Single most predictable objection in LatAm early-stage sales — it is not an obstacle, it is the process. The buyer needs social proof.",
    discoveryQuestions: [
      "¿Qué información necesitarías sobre nuestro trabajo para sentirte cómodo avanzando?",
      "¿Te ayudaría hablar con uno de los clientes con los que hemos trabajado?",
    ],
    suggestedResponse:
      "Trabajamos con [empresa similar en Colombia/México]. Aquí está lo que logramos en 60 días. ¿Puedo conectarte con ellos directamente?",
    priority: "high",
    roleplayScenario:
      "Cold WhatsApp sin referencias previas — práctica de storytelling del caso de cliente.",
    typicalDiscTypes: ["C", "S"],
    regionFocus: "CO/MX",
  },
  {
    id: 5,
    key: "muy_pequeno",
    category: "trust_credibility",
    phrase: "Eres muy pequeño para lo que necesitamos",
    naturalPhrase:
      "La verdad es que para lo que manejamos nosotros, necesitamos algo más robusto. Ustedes son muy chicos.",
    context: "Mid-market or corporate buyer evaluating a solo founder or 2-person agency.",
    hiddenReality:
      "Fear of dependency — the buyer worries the vendor will disappear or can't handle their volume.",
    discoveryQuestions: [
      "¿Cuál sería específicamente el riesgo que te preocupa si trabajamos juntos?",
      "¿Qué tamaño de equipo esperarías que tuviera un proveedor para tu operación?",
    ],
    suggestedResponse:
      "Somos pequeños porque elegimos serlo. Cada cliente recibe atención directa del fundador, no de un junior. Trabajamos con [empresa de tamaño similar] y llevamos [X meses/años] con ellos sin problema. ¿Te gustaría hablar con su equipo?",
    priority: "medium",
    typicalDiscTypes: ["D", "C"],
    regionFocus: "universal",
  },
  {
    id: 6,
    key: "mala_experiencia",
    category: "trust_credibility",
    phrase: "Ya tuve una mala experiencia con algo similar",
    naturalPhrase:
      "Es que ya pagué por algo parecido y no funcionó. Me quemé y ahora soy más cuidadoso.",
    context: "SME owner who has been sold a poorly implemented SaaS tool or digital service.",
    hiddenReality:
      "A trust wound, not a product objection. The buyer is not rejecting you — they are protecting themselves.",
    discoveryQuestions: [
      "¿Me cuentas qué pasó? Quiero entender bien dónde falló para asegurarme de que esto sea diferente.",
    ],
    suggestedResponse:
      "Lo que describes tiene sentido y es más común de lo que debería. Lo que hacemos diferente es [punto específico]. Y si en 30 días no ves [resultado], te devolvemos lo pagado. Sin discusión.",
    priority: "medium",
    typicalDiscTypes: ["S", "C"],
    regionFocus: "universal",
  },

  // ─── Category 3: Time & Decision-Making ───────────────────────────
  {
    id: 7,
    key: "dejame_pensarlo",
    category: "time_decision",
    phrase: "Déjame pensarlo",
    naturalPhrase:
      "Está bien, lo que me mostraste me parece interesante. Déjame pensarlo y te aviso.",
    context: "Universal — every market, every buyer type. The most common soft no in LatAm.",
    hiddenReality:
      "'Déjame pensarlo' without a next step = dead deal in 80% of cases. The buyer is either unconvinced or avoiding discomfort of saying no.",
    discoveryQuestions: [
      "Claro, con gusto. ¿Qué es lo que necesitas pensar? ¿Es el precio, el timing, o hay alguna duda sobre si esto resuelve tu problema?",
      "¿Qué información te falta para poder decidir con confianza?",
    ],
    suggestedResponse:
      "Perfecto. Para no quedarnos en el aire, ¿qué tal si agendamos 15 minutos el [día específico] para ver qué preguntas te surgieron? Así no pierdes el hilo.",
    priority: "high",
    roleplayScenario:
      "Escenario más universal — ejercicio de 'cierre del siguiente paso'.",
    typicalDiscTypes: ["S", "I"],
    regionFocus: "universal",
  },
  {
    id: 8,
    key: "consultar_socio",
    category: "time_decision",
    phrase: "Tengo que consultarlo con mi socio",
    naturalPhrase:
      "Me interesa, pero necesito hablarlo con mi socio antes de tomar cualquier decisión.",
    context: "SME and family business owners across all LatAm markets — Colombia especially.",
    hiddenReality:
      "Often legitimate — most LatAm SMEs are family-owned or co-founded. But sometimes it's a delay mechanism.",
    discoveryQuestions: [
      "¿Tu socio estaría disponible para una llamada rápida juntos? Así resolvemos dudas en tiempo real.",
      "¿Cuál crees que sería su principal pregunta o preocupación?",
    ],
    suggestedResponse:
      "Te preparo un resumen de una página con los puntos clave y los números. Así tu socio tiene todo lo que necesita en 5 minutos de lectura.",
    priority: "high",
    roleplayScenario:
      "Venta de múltiples stakeholders — identificar y llegar al decisor real.",
    typicalDiscTypes: ["S", "I"],
    regionFocus: "CO/MX",
  },
  {
    id: 9,
    key: "muy_ocupados",
    category: "time_decision",
    phrase: "Ahorita estamos muy ocupados",
    naturalPhrase:
      "Mira, en este momento tenemos mucho qué resolver internamente. Contáctame en tres meses.",
    context: "Any market; peak in Colombia end-of-year, Mexico holidays, Chile budget cycles.",
    hiddenReality:
      "Sometimes genuine; often a polite deferral that extends indefinitely without structured follow-up.",
    discoveryQuestions: [
      "¿Qué es lo que tienen que resolver primero? Pregunto porque a veces lo que vendo ayuda a acelerar exactamente ese tipo de proceso.",
    ],
    suggestedResponse:
      "Entiendo. ¿Sería útil que te enviara algo puntual por WhatsApp en [fecha] para retomar la conversación con más contexto?",
    priority: "medium",
    typicalDiscTypes: ["S", "D"],
    regionFocus: "universal",
  },

  // ─── Category 4: Digital Readiness & Change ───────────────────────
  {
    id: 10,
    key: "no_digitales",
    category: "digital_readiness",
    phrase: "No somos muy digitales todavía",
    naturalPhrase:
      "Es que nosotros somos más tradicionales. No manejamos mucho lo digital, eso es más para empresas grandes.",
    context: "Colombian and Mexican SMEs (retail, services, manufacturing); founders 45+.",
    hiddenReality:
      "Not a rejection of technology — a fear of implementation complexity and disruption to daily operations.",
    discoveryQuestions: [
      "¿Qué parte de lo digital te preocupa más: la implementación, el costo, o que el equipo no lo adopte?",
      "¿Cuánto tiempo a la semana pierdes hoy en [el proceso que resuelves]?",
    ],
    suggestedResponse:
      "Lo que te muestro hoy lo puedes tener funcionando en menos de una hora. No necesitas cambiar nada de cómo trabaja tu equipo. De hecho, lo hemos implementado con empresas que solo usaban Excel antes.",
    priority: "high",
    roleplayScenario:
      "Prospecto tradicional de mediana empresa colombiana — relevante para incubadoras de impacto.",
    typicalDiscTypes: ["S", "C"],
    regionFocus: "CO/MX",
  },
  {
    id: 11,
    key: "ya_tenemos_sistema",
    category: "digital_readiness",
    phrase: "Ya tenemos un sistema",
    naturalPhrase:
      "Nosotros ya tenemos un proveedor para eso. Llevamos años con ellos y estamos bien.",
    context: "Any B2B buyer with an existing solution — common in mid-market Colombia and Chile.",
    hiddenReality:
      "'We're fine' often means 'the pain isn't big enough yet to justify switching cost.'",
    discoveryQuestions: [
      "¿Qué es lo que más te gusta de lo que tienes hoy?",
      "¿Y qué es lo que más te molesta o lo que quisieras que funcionara mejor?",
      "¿Cuánto tiempo lleva eso sin resolverse?",
    ],
    suggestedResponse:
      "No vine a reemplazar nada — vine a ver si hay un problema que tu sistema actual no resuelve bien. Si lo hay, tiene sentido conversar. Si no, perfecto.",
    priority: "medium",
    typicalDiscTypes: ["S", "C"],
    regionFocus: "CO/CL",
  },
  {
    id: 12,
    key: "integracion_erp",
    category: "digital_readiness",
    phrase: "¿Esto funciona con mi ERP?",
    naturalPhrase:
      "Pero, ¿esto se conecta con Siigo/Aspel/SAP? Porque si no, no sirve.",
    context: "Colombian SMEs (Siigo/Alegra), Mexican (Aspel/SAP), Chilean (sophisticated ERP).",
    hiddenReality:
      "Often surfaced when the buyer is already interested and looking for confirmation before committing.",
    discoveryQuestions: [
      "¿La integración con [sistema] sería un requisito obligatorio o sería ideal tenerla?",
      "Si no se conecta de manera nativa, ¿estarías dispuesto a revisar si hay una alternativa aceptable?",
    ],
    suggestedResponse:
      "No tenemos integración nativa hoy, pero tenemos clientes que exportan [formato] y lo cargan en [X minutos]. ¿Puedo mostrarte cómo?",
    priority: "contextual",
    typicalDiscTypes: ["C"],
    regionFocus: "CO/MX/CL",
  },

  // ─── Category 5: Process & Approval Delays ────────────────────────
  {
    id: 13,
    key: "propuesta_formal",
    category: "process_approval",
    phrase: "Necesito una propuesta formal",
    naturalPhrase:
      "Todo bien, pero necesito que me mandes una propuesta escrita para podérsela presentar a la junta.",
    context: "Mid-market and corporate buyers in Colombia and Chile; procurement-controlled.",
    hiddenReality:
      "Sometimes legitimate; often a stall mechanism that kills momentum if sent without first confirming buy-in.",
    discoveryQuestions: [
      "¿Puedes decirme quiénes la van a leer y cuál es su principal criterio de decisión?",
      "¿Ya tienes una recomendación personal antes de presentarla, o todavía estás evaluando?",
    ],
    suggestedResponse:
      "Perfecto. Antes de armarla, quiero asegurarme de que capture lo correcto. ¿Me das 10 minutos para confirmar los puntos clave?",
    priority: "high",
    roleplayScenario:
      "Propuesta como herramienta de cierre, no de exploración.",
    typicalDiscTypes: ["C", "S"],
    regionFocus: "CO/CL",
  },
  {
    id: 14,
    key: "pagos_internacionales",
    category: "process_approval",
    phrase: "Los pagos internacionales son complicados",
    naturalPhrase:
      "El tema es que nosotros tenemos restricciones para pagar en dólares / en el exterior.",
    context: "Colombia and Argentina especially; currency control and banking limitations.",
    hiddenReality:
      "A real friction point — Colombia has transfer limits and USD restrictions affecting SME purchasing.",
    discoveryQuestions: [
      "¿Han pagado antes servicios digitales o software? ¿Cómo lo han manejado?",
      "¿La facturación en pesos colombianos / moneda local cambiaría esto?",
    ],
    suggestedResponse:
      "Tenemos opción de pago en pesos con factura colombiana. ¿Eso resuelve el problema?",
    priority: "contextual",
    typicalDiscTypes: ["C"],
    regionFocus: "CO/AR",
  },

  // ─── Category 6: Competitor & Alternatives ────────────────────────
  {
    id: 15,
    key: "mas_barato",
    category: "competitor_alternatives",
    phrase: "Ya vi algo similar más barato",
    naturalPhrase:
      "Encontré algo parecido que cuesta la mitad. ¿Por qué debería pagar más por lo tuyo?",
    context: "Digital-savvy SME buyers, startup founders comparing tools, creators evaluating courses.",
    hiddenReality:
      "Comparison shopping — often using a generic tool to negotiate, not a genuine alternative.",
    discoveryQuestions: [
      "¿Lo probaste? ¿Qué tal te fue?",
      "¿Qué tiene que hacer que ese otro no tiene?",
    ],
    suggestedResponse:
      "Perfecto. Ese sirve para [use case]. Nosotros resolvemos específicamente [diferenciador]. Si lo que necesitas es [resultado específico], esto te lo da. ¿Cuál es tu prioridad real?",
    priority: "medium",
    typicalDiscTypes: ["D", "C"],
    regionFocus: "universal",
  },
  {
    id: 16,
    key: "prefiero_local",
    category: "competitor_alternatives",
    phrase: "Prefiero alguien local",
    naturalPhrase:
      "La verdad es que prefiero trabajar con alguien de acá, que entienda el mercado colombiano.",
    context: "Colombia and Mexico especially — strong local preference for vendors.",
    hiddenReality:
      "A trust and accountability concern, not nationalism. The buyer wants to know you won't disappear.",
    discoveryQuestions: [
      "¿Qué significa 'local' para ti en este contexto? ¿Es la posibilidad de reunirse en persona, o es conocer el mercado colombiano?",
    ],
    suggestedResponse:
      "Entiendo. Aunque no estoy físicamente en [ciudad], trabajo exclusivamente con empresas colombianas hace [X tiempo] y conozco [regulación, plataforma, comportamiento de mercado específico]. ¿Puedo conectarte con un cliente comparable?",
    priority: "high",
    roleplayScenario:
      "Fundador vendiendo desde otra ciudad o país — relevante para expansión regional.",
    typicalDiscTypes: ["S", "C"],
    regionFocus: "CO/MX",
  },

  // ─── Category 7: Creator & High-Ticket ────────────────────────────
  {
    id: 17,
    key: "esperar_descuento",
    category: "creator_high_ticket",
    phrase: "Voy a esperar a que salga más barato",
    naturalPhrase:
      "Voy a esperar. Seguro en Black Friday sale más barato o haces un descuento.",
    context: "Creator economy — course buyers, coaching program prospects in Mexico and Colombia.",
    hiddenReality:
      "Buyer is interested but looking for permission to wait. Without urgency framing, they will wait indefinitely.",
    discoveryQuestions: [
      "¿Cuánto tiempo llevas con este problema sin resolverlo?",
      "Si esperas tres meses más, ¿qué habrá cambiado en tu situación?",
    ],
    suggestedResponse:
      "Entiendo. Pero si llevas [X meses] sin resolver esto, esperar 3 meses más tiene un costo — aunque no sea visible. ¿Qué podría pasar en tu negocio si esto sigue igual hasta [fecha]?",
    priority: "medium",
    typicalDiscTypes: ["S", "I"],
    regionFocus: "CO/MX",
  },
  {
    id: 18,
    key: "sin_tiempo_curso",
    category: "creator_high_ticket",
    phrase: "No sé si tengo tiempo para el curso",
    naturalPhrase:
      "Me llama la atención, pero con todo lo que tengo ahorita, no sé si voy a poder dedicarle tiempo.",
    context: "Training programs, online courses, coaching — universal in LatAm creator/coach market.",
    hiddenReality:
      "A self-trust issue — the buyer doubts their own follow-through, not the value of the program.",
    discoveryQuestions: [
      "¿Cuántas horas a la semana necesitarías invertir para que esto tuviera impacto para ti?",
      "Si el programa requiriera solo [X horas semanales], ¿lo considerarías?",
    ],
    suggestedResponse:
      "Eso es lo que escucho con más frecuencia. Por eso el programa está diseñado para hacerse en [X minutos al día]. No necesitas tiempo extra — necesitas usarlo de manera diferente.",
    priority: "medium",
    typicalDiscTypes: ["S", "I"],
    regionFocus: "universal",
  },

  // ─── Category 8: Relationship & Timing ────────────────────────────
  {
    id: 19,
    key: "mandame_info",
    category: "relationship_timing",
    phrase: "Mándame información y te aviso",
    naturalPhrase:
      "Sí, mándame todo por correo y con gusto lo reviso.",
    context: "Mexico (highest frequency), Colombia — classic conversation exit.",
    hiddenReality:
      "LatAm equivalent of 'send me a deck.' Information sent without follow-up plan generates near-zero pipeline movement.",
    discoveryQuestions: [
      "Con gusto. Para enviarte lo más relevante, ¿cuál es el problema principal que estás tratando de resolver ahorita?",
      "¿Cuándo tendrías tiempo de revisarlo? ¿Te parece si agendamos 10 minutos para comentarlo juntos después?",
    ],
    suggestedResponse:
      "En lugar de un correo largo, te mando los 3 puntos más relevantes por aquí. Así es más fácil de revisar. ¿Te parece?",
    priority: "high",
    roleplayScenario:
      "Convertir solicitud de información en conversación activa.",
    typicalDiscTypes: ["S", "I"],
    regionFocus: "MX/CO",
  },
  {
    id: 20,
    key: "situacion_economica",
    category: "relationship_timing",
    phrase: "La situación económica del país...",
    naturalPhrase:
      "El tema es que con la situación del país ahorita, preferimos esperar antes de comprometernos con algo nuevo.",
    context: "Colombia (political uncertainty), Argentina (chronic), Mexico (election cycles).",
    hiddenReality:
      "Legitimate context, but often a blanket deferral. The real question is whether the problem exists regardless of macro conditions.",
    discoveryQuestions: [
      "¿El problema que hablamos — [problema específico] — va a desaparecer si la situación económica mejora, o va a seguir estando?",
      "Si la situación mejora en 6 meses, ¿qué habrás perdido mientras tanto?",
    ],
    suggestedResponse:
      "Entiendo la cautela. Lo interesante es que lo que te propongo ayuda a [reducir costos / aumentar eficiencia] precisamente en momentos como este. Empresas como [referencia] lo adoptaron en momentos similares por esa razón.",
    priority: "high",
    roleplayScenario:
      "Macro-objeción LatAm — especialmente relevante para Argentina y Colombia en año electoral.",
    typicalDiscTypes: ["S", "C"],
    regionFocus: "AR/CO/MX",
  },
];

/** Get objections by priority level */
export function getObjectionsByPriority(
  priority: ObjectionPriority,
): LatAmObjection[] {
  return LATAM_OBJECTIONS.filter((o) => o.priority === priority);
}

/** Get high-priority objections (for full AI roleplay) */
export function getHighPriorityObjections(): LatAmObjection[] {
  return getObjectionsByPriority("high");
}

/** Get objections by category */
export function getObjectionsByCategory(
  category: ObjectionCategory,
): LatAmObjection[] {
  return LATAM_OBJECTIONS.filter((o) => o.category === category);
}

/** Get a random high-priority objection, optionally filtered by DISC type */
export function getRandomObjection(discType?: string): LatAmObjection {
  const pool = discType
    ? LATAM_OBJECTIONS.filter(
        (o) =>
          o.priority === "high" &&
          o.typicalDiscTypes?.includes(discType),
      )
    : getHighPriorityObjections();

  return pool[Math.floor(Math.random() * pool.length)] || LATAM_OBJECTIONS[0];
}

/** Get objections relevant to a specific country */
export function getObjectionsForCountry(
  countryCode: string,
): LatAmObjection[] {
  return LATAM_OBJECTIONS.filter(
    (o) =>
      o.regionFocus === "universal" || o.regionFocus.includes(countryCode),
  );
}
