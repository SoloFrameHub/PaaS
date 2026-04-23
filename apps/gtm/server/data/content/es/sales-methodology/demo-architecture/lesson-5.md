---
title: "Manejando Objeciones Durante la Demo"
duration: "50 min"
track: "Sales Methodology"
course: "Course 16: Demo Architecture"
lesson: 5
---

# Manejando Objeciones Durante la Demo: El Arte de la Defensa

Estás en pleno flujo. Estás mostrando el "Momento Wow." De repente, el prospecto te interrumpe: _"Espera, ¿esto se integra con Netsuite?"_ o _"¿Cuánto cuesta esto?"_

La forma en que manejas estas interrupciones determina tu **Estatus**. (Curso 13).

<SwipeDecision
title="Status Check: How Would You Respond?"
description="Swipe right for high-status responses, left for low-status"
optionA="Low Status"
optionB="High Status"
persistKey="demo-architecture-L5-status"
cards={[
{ id: "1", content: "Uhh, let me check... I think it sort of integrates?", correctOption: "a", explanation: "Fumbling and apologetic language signals trainee status" },
{ id: "2", content: "Great question. Security is critical, and I want to cover all your IT requirements in a dedicated block at the end. For now, let's finish this workflow. Sound fair?", correctOption: "b", explanation: "Acknowledges, defers strategically, maintains control" },
{ id: "3", content: "Yeah, we can probably add that if you need it.", correctOption: "a", explanation: "Sounds reactive and uncertain" },
{ id: "4", content: "That's a strategic question about scalability. I've added it to my list for the Technical Q&A section in 10 minutes. Fair?", correctOption: "b", explanation: "Validates importance while maintaining demo flow" }
]}
/>

---

## 1. La Técnica del "Estacionamiento"

Los prospectos tienen una alta "Carga Cognitiva" durante una demo. Si respondes cada pregunta de inmediato, tu demo se convierte en un caos fragmentado. (2025 State of Sales).

**La Solución:** Crea un "Estacionamiento" verbal.

- **Reconoce:** _"Esa es una pregunta estratégica sobre escalabilidad."_
- **Valida:** _"Es importante que profundicemos en eso."_
- **Difiere:** _"Lo agregué a mi lista para la sección de 'Preguntas Técnicas' en 10 minutos para que podamos mantener el foco en el impacto en el P&L por ahora. ¿Te parece bien?"_

<TemplateBuilder
title="Your Parking Lot Script"
persistKey="demo-architecture-L5-parkinglot"
sections={[
{
id: "acknowledge",
title: "Acknowledge",
fields: [
{ id: "label", label: "Label the question type", placeholder: "e.g., That's a strategic question about scalability", type: "text" }
]
},
{
id: "validate",
title: "Validate",
fields: [
{ id: "importance", label: "Affirm its importance", placeholder: "e.g., It's important that we dive deep into that", type: "text" }
]
},
{
id: "defer",
title: "Defer",
fields: [
{ id: "when", label: "When you'll address it", placeholder: "e.g., in the Technical Q&A section in 10 minutes", type: "text" },
{ id: "current-focus", label: "What you're focusing on now", placeholder: "e.g., the P&L impact", type: "text" }
]
}
]}
/>

---

## 2. El "Chequeo de Precio" (La Trampa del Dinero)

En 2026, el error #1 es revelar un número específico antes de que el valor esté anclado. (Sandler Research).

<InsightCard icon="💰" title="The Anchoring Problem">
If a prospect hears "$20,000" while looking at a login screen, they see a $20,000 bill. If they hear "$20,000" after seeing a dashboard that recovers $100,000 in lost revenue, they see an $80,000 profit.
</InsightCard>

**El Guión de Pivote:** _"Tenemos inversiones escalonadas que van desde **$10k a $50k** dependiendo de tu volumen de automatización. Para determinar dónde encajas, necesito entender tu [Métrica] actual. ¿Podemos posponer los detalles específicos hasta que veamos el alcance completo de la integración?"_

- **Análisis:** Diste un rango (satisfaciendo la curiosidad), lo calificaste (depende del alcance) y mantuviste el "Marco de Experto."

<RewriteExercise
title="Rewrite This Pricing Fumble"
persistKey="demo-architecture-L5-pricing"
original="It costs $25,000 per year."
hint="Give a range, qualify it, and defer to after value demonstration"
expertRewrite="We have tiered investments ranging from $10k to $50k depending on your automation volume. To determine where you land, I need to understand your current processing volume. Can we put a pin in the specifics until we see the full integration scope?"
criteria={["Provides a range instead of a single number", "Qualifies the range with a variable", "Defers specific pricing until after value is shown"]}
/>

---

## 3. El "No Estratégico" (La Pregunta "Trampa")

A veces la respuesta es **NO**. No te disculpes; explica la filosofía. (2025 Benchmarks).

- **Prospecto:** _"¿Tienen una app nativa para iPad?"_
- **Respuesta Pro:** _"No tenemos. Y aquí está el por qué: Nuestros usuarios requieren actualizaciones de 'Cero Latencia'. Las tiendas de aplicaciones retrasan parches de seguridad críticos. Así que construimos una PWA que funciona idénticamente pero se actualiza en toda tu flota al instante. ¿El objetivo es el acceso sin conexión, o solo un ícono en la pantalla de inicio?"_

<FlipCard front="The Strategic No Framework" back="Transform a missing feature into a deliberate design choice by explaining: 1) What you chose NOT to build, 2) The strategic reason (speed/simplicity/focus), 3) What you built instead that's better, 4) A clarifying question about their real need" />

<ComparisonBuilder
title="Your Strategic No Response"
persistKey="demo-architecture-L5-strategicno"
prompt="Write a response to a missing feature request using the Strategic No framework"
expertExample="We don't have a native mobile app. Here's why: Our users need zero-latency updates. App stores delay critical security patches by 2-3 days. So we built a PWA that works identically but updates across your fleet instantly. Is the goal offline access, or just a home-screen icon?"
criteria={["States what you don't have clearly", "Explains the strategic reason", "Describes what you built instead", "Ends with a clarifying question"]}
/>

---

## 4. La Táctica del "Juego Diferente" (Competencia)

Cuando te preguntan _"¿Cómo se compara esto con [Competidor X]?"_, no listes características. Compara **Filosofías**. (Gartner Research).

- **Guión:** _"[Competidor X] es una herramienta heredada fantástica si tienes un ejército de analistas para construir widgets personalizados. Nosotros construimos esto para equipos que quieren un sistema 'nativo de IA' que funcione de inmediato. ¿Quieres construir el auto, o quieres manejarlo?"_

<DecisionTree
title="Handling the Competitor Question"
persistKey="demo-architecture-L5-competitor"
startNodeId="start"
nodes={[
{ id: "start", content: "Prospect asks: 'How does this compare to [Competitor X]?'", choices: [
{ label: "List feature differences", nextNodeId: "features" },
{ label: "Compare philosophies", nextNodeId: "philosophy" }
]},
{ id: "features", content: "You get into a feature checklist battle. Prospect starts comparing spreadsheets. You lose the expert frame.", isTerminal: true, outcome: "negative" },
{ id: "philosophy", content: "You say: '[Competitor X] is fantastic if you have an army of analysts. We built this for teams who want it to work out of the box. Do you want to build the car, or drive it?' Prospect sees the strategic difference.", choices: [
{ label: "They say 'drive it'", nextNodeId: "win" },
{ label: "They say 'build it'", nextNodeId: "disqualify" }
]},
{ id: "win", content: "You've positioned yourself as the right fit for their buying philosophy. Demo continues with authority.", isTerminal: true, outcome: "positive" },
{ id: "disqualify", content: "You've learned they want a different product category. You can gracefully disqualify or pivot to a different use case.", isTerminal: true, outcome: "neutral" }
]}
/>

<InteractiveChecklist title="Your Demo Defense Toolkit" persistKey="demo-architecture-L5-actions" items={["Practice your Parking Lot script out loud 3 times", "Write down your 3 most common objections", "Draft a Strategic No response for your biggest missing feature", "Create a philosophy-based competitor comparison for your top 2 competitors", "Record yourself handling a pricing question using the range technique"]} />

<RangeSlider label="How confident are you in handling mid-demo objections without losing control?" min={1} max={10} lowLabel="I fumble constantly" highLabel="I maintain expert status" persistKey="demo-architecture-L5-confidence" />

---

## Quiz: Manteniendo el Marco de Experto

```json
{
  "quizId": "demo-objections-2026",
  "title": "Defense through Authority",
  "questions": [
    {
      "id": "da1651",
      "type": "multiple-choice",
      "text": "¿Cuál es el principal riesgo de responder una pregunta de precios a los 5 minutos de una demo?",
      "options": [
        { "id": "a", "text": "El prospecto pensará que no estás preparado." },
        {
          "id": "b",
          "text": "Anclaje Prematuro: El prospecto se fijará en el 'Precio' (Gasto) antes de haber visto el 'Resultado' (Inversión), generando resistencia inmediata al presupuesto."
        },
        {
          "id": "d",
          "text": "Hace que la demo se extienda más de lo planeado."
        }
      ],
      "correctAnswer": "b",
      "explanation": "Si un prospecto escucha '$20,000' mientras mira una pantalla de inicio de sesión, ve una factura de $20,000. Si escucha '$20,000' después de ver un dashboard que recupera $100,000 en ingresos perdidos, ve una ganancia de $80,000. Cambiar la conversación a un rango te permite mantener el momentum."
    },
    {
      "id": "da1652",
      "type": "multiple-choice",
      "text": "¿Cómo debe manejar un fundador en solitario una solicitud de función faltante (El 'No Estratégico') en 2026?",
      "options": [
        { "id": "a", "text": "Mentir y decir que está en el roadmap." },
        {
          "id": "b",
          "text": "Admitir la ausencia y explicar la razón estratégica por la que 'No tener esa función' en realidad beneficia al cliente (por ejemplo, velocidad, simplicidad o enfoque)."
        },
        { "id": "c", "text": "Bajar tu precio para compensar." },
        { "id": "d", "text": "Decirles que no la necesitan." }
      ],
      "correctAnswer": "b",
      "explanation": "La autoridad se construye sobre la convicción. En un mundo de 'Hinchazón de Funciones', un fundador que puede decir 'Elegimos explícitamente no construir X porque ralentiza el sistema' suena como un especialista. Transforma una brecha técnica en una decisión de diseño deliberada."
    }
  ]
}
```

**Siguiente Lección:** [Cierres de Prueba: Verificando el Pulso](/sales-methodology/demo-architecture/lesson-6)
