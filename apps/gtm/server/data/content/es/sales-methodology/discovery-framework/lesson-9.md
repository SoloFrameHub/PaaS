---
title: "Criterios y Proceso de Decisión"
duration: "55 min"
track: "Sales Methodology"
course: "Course 14: Discovery Framework - BANT/MEDDIC"
lesson: 9
---

# Criterios y Proceso de Decisión: Dominando las "Reglas del Juego"

Tienes una demo fantástica. El Campeón la amó. El Presupuesto fue aprobado. Proyectaste que el trato cerraría el último día del trimestre. Entonces, el día 29, recibes un correo: _"Oye, acabo de enterarme de que Legal necesita 3 semanas para revisar el DPA. Además, Adquisiciones está pidiendo un informe SOC2 Tipo II que no tenemos. Tendremos que pasarlo al próximo trimestre."_

**El trato no murió porque tu producto era malo. Murió porque no entendías las reglas del juego.**

En el marco MEDDIC, los **Criterios de Decisión (Dc)** y el **Proceso de Decisión (Dp)** son los componentes de "Gestión de Proyectos" de las ventas. (2025 State of Sales). Mientras que el Dolor y el Campeón tienen que ver con la emoción, los Criterios y el Proceso tienen que ver con la **Logística y la Realidad**.

<InsightCard icon="⚠️" title="The Silent Deal Killer">
67% of deals that stall in "final stages" fail due to unknown process steps, not product fit. You can't close what you can't see.
</InsightCard>

---

## 1. Criterios de Decisión (Dc): La Rúbrica de Calificación

Los Criterios de Decisión son los estándares específicos que usa el comprador para evaluarte frente a competidores o el statu quo. Si no conoces la rúbrica, estás adivinando las respuestas. (Gartner Research).

### Las Tres Capas de los Criterios

1.  **Criterios Técnicos:** _"¿Funciona? ¿Se integra con Snowflake? ¿Es compatible con SOC2?"_
2.  **Criterios Económicos:** _"¿El período de recuperación es inferior a 6 meses? ¿Cabe en nuestro presupuesto de OpEx?"_
3.  **Criterios de Relación:** _"¿Puede este fundador darnos soporte 24/7? ¿Confiamos en un operador en solitario con esta infraestructura crítica?"_

<ClassifyExercise
title="Classify These Evaluation Criteria"
persistKey="discovery-framework-L9-classify-criteria"
categories={[
{ id: "technical", label: "Technical", color: "#3b82f6" },
{ id: "economic", label: "Economic", color: "#10b981" },
{ id: "relationship", label: "Relationship", color: "#8b5cf6" }
]}
items={[
{ id: "1", content: "Must have SSO with Okta integration", correctCategory: "technical" },
{ id: "2", content: "ROI must be positive within 9 months", correctCategory: "economic" },
{ id: "3", content: "Need a dedicated CSM for onboarding", correctCategory: "relationship" },
{ id: "4", content: "API rate limit must support 10K requests/min", correctCategory: "technical" },
{ id: "5", content: "Total cost of ownership under $50K annually", correctCategory: "economic" },
{ id: "6", content: "Vendor must have 24/7 support SLA", correctCategory: "relationship" }
]}
/>

### La Estrategia de "Inception"

El nivel más alto del dominio de ventas no es solo _cumplir_ los criterios; es **establecerlos**. Si tu herramienta tiene una función única (por ejemplo, Sincronización en Tiempo Real) que le falta a tu competidor, debes "envenenar el pozo" haciendo que esa función sea un criterio obligatorio para el prospecto. (2026 Acquisition Trends).

<ExampleCard label="Case Study: The Poisoned Well">
A sales automation founder noticed their tool had real-time CRM sync while competitors batched updates every 15 minutes. During discovery, they asked: "How critical is it that your reps see lead status changes instantly? We've seen teams lose deals when two reps call the same lead because the CRM hadn't updated yet."

The prospect added "Real-time sync" to their mandatory requirements list. Two competitors were immediately disqualified.
</ExampleCard>

<TemplateBuilder
title="Your Inception Question Framework"
persistKey="discovery-framework-L9-inception"
sections={[
{
id: "unique-feature",
title: "Your Unique Advantage",
fields: [
{ id: "feature", label: "What unique capability does your product have?", placeholder: "e.g., Real-time sync, AI-powered routing, native mobile app", type: "text" },
{ id: "competitor-gap", label: "What do competitors lack?", placeholder: "e.g., They batch sync every 15 min, manual routing, web-only", type: "text" }
]
},
{
id: "pain-question",
title: "The Inception Question",
fields: [
{ id: "question", label: "Craft a question that makes this feature seem critical", placeholder: "e.g., 'How often do two reps accidentally contact the same lead because your CRM hadn't updated?'", type: "textarea" },
{ id: "impact", label: "What's the cost of NOT having this?", placeholder: "e.g., Lost deals, customer frustration, wasted rep time", type: "textarea" }
]
}
]}
/>

---

## 2. Proceso de Decisión (Dp): El Rastro de Papel

El Proceso de Decisión es la secuencia de aprobaciones requeridas para pasar del "Sí Verbal" al "Dinero en el Banco." (2025 State of Buyer Behavior).

### Los Dos Procesos que Debes Mapear

1.  **El Proceso de Validación (Llegar al 'Sí Técnico'):** Pruebas, Demos y POCs.
2.  **El Proceso de Autorización (Llegar al 'Sí Financiero'):** Legal (MSA/DPA), Cuestionarios de Seguridad y Adquisiciones (Incorporación de Proveedores).

**La Regla del Fundador:** La aprobación técnica es rápida; la Autorización es un agujero negro. Debes preguntar: _"Cuéntame exactamente en el escritorio de quién se posa el contrato después de que hagas clic en 'aprobar'. ¿Hay algún abogado junior al que debamos adelantarnos hoy?"_

<DecisionTree
title="Map Your Deal's Decision Process"
persistKey="discovery-framework-L9-process-map"
startNodeId="start"
nodes={[
{
id: "start",
content: "Your Champion says: 'This looks great, let's move forward.' What do you ask first?",
choices: [
{ label: "What's the next step to get this approved?", nextNodeId: "good-start" },
{ label: "Great! When can we get the contract signed?", nextNodeId: "bad-start" }
]
},
{
id: "good-start",
content: "Champion: 'I need to get IT Security and Legal to sign off.' What do you do?",
choices: [
{ label: "Ask: 'Who specifically in IT Security? Can we schedule a call this week?'", nextNodeId: "proactive" },
{ label: "Say: 'No problem, let me know when they approve.'", nextNodeId: "reactive" }
]
},
{
id: "bad-start",
content: "Champion: 'Well, I need to run it by a few people first...' You've lost control of the timeline.",
isTerminal: true,
outcome: "negative"
},
{
id: "proactive",
content: "You uncover that IT Security needs SOC2 Type II (you have it) and Legal needs a custom DPA (3-week process). You build a reverse timeline and close on schedule.",
isTerminal: true,
outcome: "positive"
},
{
id: "reactive",
content: "Three weeks later: 'Legal is asking for a bunch of security docs we didn't know about. This is going to take a while.' Deal slips to next quarter.",
isTerminal: true,
outcome: "negative"
}
]}
/>

<SlideNavigation>
<Slide title="Step 1: Map the Validation Process">

**Preguntas a Hacer:**

- "¿Quién más además de ti necesita ver una demo?"
- "¿Cómo se ve una prueba exitosa? ¿Qué métricas importan?"
- "¿Quién tiene poder de veto en el lado técnico?"

**Señal de Alerta:** Si dicen "Solo yo", no tienes un Campeón real. Los tratos empresariales requieren múltiples stakeholders.

</Slide>
<Slide title="Step 2: Map the Authorization Process">

**Preguntas a Hacer:**

- "Después de que apruebes, ¿en el escritorio de quién aterriza el contrato?"
- "¿Qué necesita típicamente Legal? ¿MSA? ¿DPA? ¿Cuestionario de seguridad?"
- "¿Tiene Adquisiciones un proceso de incorporación de proveedores? ¿Cuánto tiempo lleva?"
- "¿Hay requisitos de cumplimiento (SOC2, GDPR, HIPAA) para los que debamos prepararnos?"

**Consejo Pro:** Pide el cuestionario de seguridad AHORA, incluso si el trato está a semanas de distancia. Complétalo proactivamente.

</Slide>
<Slide title="Step 3: Identify the Shadow Stakeholders">

**Las Personas que No Has Conocido:**

- Abogado Junior (la persona que en realidad lee los contratos)
- Oficial de Seguridad de TI (la persona que bloquea tratos sin SOC2)
- Gerente de Adquisiciones (la persona que exige 3 referencias de proveedores)

**La Pregunta:** "¿Hay alguien en Legal, Seguridad o Adquisiciones con quien deba conectarme directamente para que esto sea más fluido?"

</Slide>
<Slide title="Step 4: Build the Timeline">

**Trabaja hacia Atrás desde la Fecha de Inicio:**

1. Inicio: 1 de Oct
2. Incorporación/implementación: 2 semanas → Iniciar el 15 de Sep
3. Ejecución del contrato: 1 semana → Firmado el 8 de Sep
4. Revisión legal: 3 semanas → Enviado el 18 de Ago
5. Revisión de seguridad: 1 semana → Enviado el 11 de Ago

**Hoy es 5 de Ago. Tienes 6 días para completar el cuestionario de seguridad.**

</Slide>
</SlideNavigation>

---

## 3. El Cierre de Línea de Tiempo Inversa

Usa el Proceso de Decisión para generar urgencia sin ser "insistente."

1.  **Objetivo:** _"Necesitas estar en marcha para el 1 de Oct."_
2.  **Trabaja hacia Atrás:** _"Legal tarda 3 semanas. Adquisiciones tarda 1 semana. Para llegar al 1 de Oct, el contrato debe enviarse antes del 1 de Sep. Hoy es 25 de Ago. Tenemos 5 días."_

<ScenarioSimulator
title="Reverse Timeline Calculator"
persistKey="discovery-framework-L9-timeline"
levers={[
{ id: "golive", label: "Days until go-live", min: 14, max: 90, step: 7, defaultValue: 60 },
{ id: "implementation", label: "Implementation days", min: 7, max: 30, step: 7, defaultValue: 14 },
{ id: "legal", label: "Legal review days", min: 7, max: 30, step: 7, defaultValue: 21 },
{ id: "security", label: "Security review days", min: 3, max: 14, step: 1, defaultValue: 7 }
]}
outputs={[
{ id: "deadline", label: "Contract must be submitted in", formula: "golive - implementation - legal - security", unit: "days", precision: 0 }
]}
insight="If the deadline is negative or less than 7 days, you need to either compress timelines (get Legal to expedite) or push the go-live date. Use this math in your next call: 'To hit your Oct 1 deadline, we need to submit the contract by [date]. That's [deadline] days from now.'"
/>

<InteractiveChecklist
title="Your Decision Process Action Plan"
persistKey="discovery-framework-L9-actions"
items={[
"Ask Champion: 'Walk me through every approval step from here to signature'",
"Request the security questionnaire and compliance requirements NOW",
"Identify the specific people in Legal, Security, and Procurement",
"Build a reverse timeline from the go-live date",
"Schedule intro calls with shadow stakeholders (Legal, IT Security)",
"Prepare all compliance docs (SOC2, references, case studies) proactively",
"Send Champion a visual timeline showing critical path and deadlines"
]}
/>

---

## Quiz: Las Reglas del Juego

```json
{
  "quizId": "criteria-process-2026",
  "title": "Mapping the Path to Signature",
  "questions": [
    {
      "id": "cp91",
      "type": "multiple-choice",
      "text": "¿Cuál es la diferencia entre los Criterios de Decisión (Dc) y el Proceso de Decisión (Dp)?",
      "options": [
        {
          "id": "a",
          "text": "Dc tiene que ver con el dinero; Dp tiene que ver con el tiempo."
        },
        {
          "id": "b",
          "text": "Dc es la 'rúbrica de calificación' (qué compran); Dp son los 'pasos hasta la firma' (cómo compran)."
        },
        { "id": "c", "text": "Dc es para el usuario; Dp es para el abogado." },
        { "id": "d", "text": "No hay diferencia." }
      ],
      "correctAnswer": "b",
      "explanation": "Los Criterios son el 'Qué' (requisitos). El Proceso es el 'Cómo' (la serie de obstáculos internos). Debes dominar ambos para asegurar que un trato no colapse en la última milla."
    },
    {
      "id": "cp92",
      "type": "multiple-choice",
      "text": "¿Qué es 'Envenenar el Pozo' en el contexto de los Criterios de Decisión?",
      "options": [
        { "id": "a", "text": "Hablar mal del personal de tus competidores." },
        {
          "id": "b",
          "text": "Usar 'Preguntas de Inception' para resaltar una fortaleza única de tu producto para que el prospecto la agregue a sus requisitos 'obligatorios', descalificando efectivamente a los competidores que carecen de ella."
        },
        { "id": "c", "text": "Ofrecer un precio más bajo que nadie." },
        { "id": "d", "text": "Sabotear la herramienta actual del prospecto." }
      ],
      "correctAnswer": "b",
      "explanation": "Los fundadores estratégicos no solo reaccionan a la lista de un prospecto; la influyen. Al hacer de tu ventaja única un requisito de negocio, amañas el juego a tu favor de forma legal y técnica."
    },
    {
      "id": "cp93",
      "type": "multiple-choice",
      "text": "¿Por qué el Proceso de Autorización suele ser el 'Asesino Silencioso de Tratos'?",
      "options": [
        {
          "id": "a",
          "text": "Porque los abogados y los oficiales de adquisiciones no están en tus llamadas de Zoom y no les importa tu ROI o tu relación personal con el Campeón."
        },
        { "id": "b", "text": "Porque es caro comprar contratos." },
        {
          "id": "c",
          "text": "Porque a los CEOs les gusta firmar cosas en el último minuto."
        },
        {
          "id": "d",
          "text": "No lo es; una vez que obtienes un 'sí' verbal, el trato está hecho."
        }
      ],
      "correctAnswer": "a",
      "explanation": "La experiencia en el Proceso de Decisión consiste en identificar a las personas que *no* has conocido. En 2026, Adquisiciones y Legal son guardianes activos que pueden retrasar un trato semanas si no tienen la documentación de seguridad correcta desde el principio."
    }
  ]
}
```

**Siguiente Lección:** [Identificar Dolor vs. Campeón](/sales-methodology/discovery-framework/lesson-10)
