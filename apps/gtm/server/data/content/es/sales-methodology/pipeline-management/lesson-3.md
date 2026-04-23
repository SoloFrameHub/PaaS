---
title: "El Diagnóstico del Negocio Estancado: RCP para tu Pipeline"
duration: "55 min"
track: "Sales Methodology"
course: "Course 20: Sales Pipeline Management"
lesson: 3
---

# El Diagnóstico del Negocio Estancado: RCP para tu Pipeline

No todo negocio silencioso es un Fantasma. Algunos están simplemente **Estancados**: el deseo existe, pero un bloqueador específico detuvo el movimiento. En 2026, el 45% de los negocios estancados pueden reactivarse aplicando el **Diagnóstico RCP**. (Investigación 2026 sobre Recuperación de Ventas Solo).

No dejes que un gran negocio muera porque no supiste qué botón presionar.

<RangeSlider 
  label="¿Cuántos negocios en tu pipeline han quedado en silencio en los últimos 30 días?" 
  min={0} 
  max={10} 
  lowLabel="Ninguno" 
  highLabel="10+" 
  persistKey="pipeline-management-L3-silent-deals" 
/>

---

## 1. Las 3 Causas del Paro Cardíaco (Estancamientos)

Los negocios se estancan por tres razones principales:

1.  **Shock de Complejidad:** El comprador se dio cuenta de que la implementación es más difícil de lo que pensaba.
2.  **Motín de Partes Interesadas:** Un miembro del "Comité en las Sombras" (Seguridad/TI) planteó una inquietud que el Campeón no puede responder.
3.  **Cambio de Prioridad:** Un proyecto sorpresa (Incendios Internos) tomó precedencia.

<ClassifyExercise
title="Diagnostica el Tipo de Estancamiento"
persistKey="pipeline-management-L3-classify"
categories={[
{ id: "complexity", label: "Shock de Complejidad", color: "#ef4444" },
{ id: "stakeholder", label: "Motín de Partes Interesadas", color: "#f59e0b" },
{ id: "priority", label: "Cambio de Prioridad", color: "#3b82f6" }
]}
items={[
{ id: "1", content: "El campeón dice: 'Nuestro CTO acaba de plantear algunas inquietudes sobre la integración'", correctCategory: "stakeholder" },
{ id: "2", content: "El prospecto responde: 'Acabamos de tener un lanzamiento importante de producto y necesitamos enfocarnos en eso primero'", correctCategory: "priority" },
{ id: "3", content: "El campeón desaparece después de ver el cronograma de implementación", correctCategory: "complexity" },
{ id: "4", content: "El director de TI bloquea el negocio citando requisitos de revisión de seguridad", correctCategory: "stakeholder" },
{ id: "5", content: "El prospecto dice: 'Esto parece más complicado de lo que pensábamos'", correctCategory: "complexity" }
]}
/>

---

## 2. El Marco RCP (Contexto, Presión, Resolución)

- **Contexto (El Re-Anclaje):** Re-identifica por qué comenzaron el proyecto.
- **Presión (El Costo de la Demora):** Recuérdales suavemente lo que están perdiendo al esperar.
- **Resolución (El Micro-Siguiente-Paso):** Ofrece un camino sin riesgo.

<SlideNavigation>
<Slide title="C: Contexto (El Re-Anclaje)">

**Objetivo:** Reconectarlos con su punto de dolor original.

**Guión de ejemplo:**
_"Cuando hablamos por primera vez en enero, mencionaste que los reportes manuales le costaban a tu equipo 15 horas por semana. ¿Sigue siendo así, o algo ha cambiado?"_

**Por qué funciona:** Las personas olvidan su propio dolor cuando se distraen. El re-anclaje les recuerda por qué comenzaron este camino.

</Slide>

<Slide title="P: Presión (El Costo de la Demora)">

**Objetivo:** Cuantificar lo que están perdiendo al esperar.

**Guión de ejemplo:**
_"Solo para contextualizarlo: si seguimos con 15 horas semanales de trabajo manual, eso son aproximadamente 60 horas al mes. A la tarifa mixta de tu equipo, eso equivale a unos $6,000 en productividad perdida cada mes que demoramos."_

**Por qué funciona:** El dolor abstracto se vuelve concreto cuando se le atribuyen números y plazos.

</Slide>

<Slide title="R: Resolución (El Micro-Siguiente-Paso)">

**Objetivo:** Ofrecer el siguiente paso más pequeño posible con riesgo percibido cero.

**Guión de ejemplo:**
_"¿Qué tal si simplemente agendamos una llamada de 20 minutos con tu CTO para revisar la documentación de seguridad? Sin compromiso, solo para responder sus preguntas y que no estés de intermediario."_

**Por qué funciona:** Los grandes compromisos se sienten riesgosos. Los micro-pasos se sienten seguros y accionables.

</Slide>
</SlideNavigation>

<TemplateBuilder
title="Construye Tu Mensaje de Reactivación RCP"
persistKey="pipeline-management-L3-cpr-builder"
sections={[
{
id: "context",
title: "Contexto: Re-Anclar al Dolor Original",
fields: [
{ id: "original-pain", label: "¿Qué punto de dolor mencionaron inicialmente?", placeholder: "ej., Reportes manuales tomando 15 horas/semana", type: "textarea" },
{ id: "context-question", label: "Tu pregunta de re-anclaje", placeholder: "ej., ¿Ese reporte manual sigue consumiendo el tiempo de tu equipo?", type: "textarea" }
]
},
{
id: "pressure",
title: "Presión: Cuantificar el Costo de la Demora",
fields: [
{ id: "time-cost", label: "Tiempo desperdiciado (por semana/mes)", placeholder: "ej., 15 horas por semana = 60 horas/mes", type: "text" },
{ id: "dollar-cost", label: "Costo en dinero de la demora", placeholder: "ej., $6,000/mes en productividad perdida", type: "text" }
]
},
{
id: "resolution",
title: "Resolución: Micro-Siguiente-Paso",
fields: [
{ id: "micro-step", label: "¿Cuál es el siguiente paso más pequeño que puedes ofrecer?", placeholder: "ej., Llamada de 20 minutos con el CTO para responder preguntas de seguridad", type: "textarea" },
{ id: "zero-risk", label: "¿Cómo lo presentas como sin riesgo?", placeholder: "ej., Sin compromiso necesario, solo para resolver preguntas", type: "text" }
]
}
]}
/>

---

## 3. Los Guiones de "Desestancamiento"

**Escenario A: Shock de Complejidad**

- _Pivote:_ _"Entiendo que la parte de migración puede parecer una montaña. ¿Qué tal si hacemos una sesión de 'Preparación del Piloto' de 2 horas donde le muestro a tu líder técnico el script automatizado? Sin compromiso, solo para ver si es tan grande como lo imaginan."_

**Escenario B: Motín de Partes Interesadas**

- _Pivote:_ _"Parece que tu director de TI tiene inquietudes válidas sobre la API. ¿Puedo grabar un video de 3 minutos sobre la documentación para ellos? O mejor aún, ¿puedo unirme a una llamada de 10 minutos para responder sus preguntas directamente y que no tengas que hacer de intermediario?"_

<RewriteExercise
title="Reescribe Este Seguimiento Genérico"
persistKey="pipeline-management-L3-rewrite"
original="Hi, just checking in to see if you've had a chance to review our proposal. Let me know if you have any questions!"
hint="Use the CPR framework: re-anchor to their pain, add pressure with cost of delay, offer a micro-next-step"
expertRewrite="Hi [Name], when we last spoke, you mentioned the manual data entry was costing your team 20 hours/week. That's roughly $8K/month in lost productivity. I know the implementation timeline gave you pause—what if we start with just a 30-minute technical walkthrough with your ops lead to show how simple the setup actually is? No commitment, just clarity."
criteria={["Re-anchors to original pain point", "Quantifies cost of delay", "Offers specific micro-next-step", "Removes risk/pressure"]}
/>

---

## 4. La Última Palanca: El Piloto Sin Riesgo

En 2026, la **Entrada Sin Riesgo** es el mayor desestancador. (State of Sales 2025).

- **El guión:** _"Parece que estamos atascados en la puerta de seguridad. ¿Qué tal esto: hacemos una ejecución de 'Sandbox' de 14 días con datos anonimizados. Si después de 14 días el equipo de seguridad no está satisfecho y el valor no está ahí, nos separamos sin costo alguno. ¿Eso elimina la barrera?"_

<InsightCard icon="🔓" title="Por Qué Funcionan los Pilotos Sin Riesgo">
Los compradores modernos sufren de "Fobia al Compromiso". Un piloto les permite validar el producto en su propio entorno, lo que a menudo provee la evidencia necesaria para convencer a los guardianes del "Comité en las Sombras". Transforma el "¿Deberíamos comprar esto?" en "Solo probémoslo y veamos."
</InsightCard>

<DecisionTree
title="Navega el Negocio Estancado"
persistKey="pipeline-management-L3-decision-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "Tu campeón no ha respondido en 2 semanas. ¿Cuál es tu primer movimiento?",
choices: [
{ label: "Enviar un mensaje RCP (Contexto + Presión + Resolución)", nextNodeId: "cpr" },
{ label: "Preguntar si quieren cancelar", nextNodeId: "cancel" },
{ label: "Esperar otra semana", nextNodeId: "wait" }
]
},
{
id: "cpr",
content: "Responden: 'Nuestro equipo de TI tiene inquietudes sobre la integración.' ¿Qué haces?",
choices: [
{ label: "Ofrecer una llamada de 10 minutos con TI para responder preguntas", nextNodeId: "it-call" },
{ label: "Enviar documentación y esperar que la lean", nextNodeId: "docs" }
]
},
{
id: "it-call",
content: "TI se une a la llamada, abordas las inquietudes y aprueban. El negocio avanza.",
isTerminal: true,
outcome: "positive"
},
{
id: "docs",
content: "No leen la documentación. El negocio sigue estancado.",
isTerminal: true,
outcome: "negative"
},
{
id: "cancel",
content: "Dicen 'Sí, cancelemos.' Perdiste el negocio por preguntar.",
isTerminal: true,
outcome: "negative"
},
{
id: "wait",
content: "Pasa otra semana. Aún sin respuesta. El negocio ahora es un fantasma.",
isTerminal: true,
outcome: "negative"
}
]}
/>

<InteractiveChecklist
title="Tu Lista de Verificación para Reactivar Negocios Estancados"
persistKey="pipeline-management-L3-actions"
items={[
"Identifica 2-3 negocios estancados en tu pipeline ahora mismo",
"Clasifica el tipo de estancamiento de cada uno (Complejidad, Partes Interesadas, Prioridad)",
"Redacta un mensaje RCP para tu negocio estancado de mayor valor",
"Identifica qué 'micro-siguiente-paso' puedes ofrecer (piloto, demo, llamada técnica)",
"Envía tu mensaje RCP dentro de las próximas 24 horas",
"Si no hay respuesta en 3 días, ofrece un piloto sin riesgo o sandbox",
"Registra qué táctica de reactivación funcionó mejor para futuros negocios"
]}
/>

---

## Quiz: El Negocio Estancado

```json
{
  "quizId": "stalled-deals-2026",
  "title": "Reviving Deal Momentum",
  "questions": [
    {
      "id": "sd20031",
      "type": "multiple-choice",
      "text": "What is the primary objective of the CPR (Context, Pressure, Resolution) framework?",
      "options": [
        { "id": "a", "text": "To sell a more expensive product." },
        {
          "id": "b",
          "text": "To re-anchor the prospect to their initial pain-point while offering a low-risk micro-step to remove the specific blocker causing the stall."
        },
        { "id": "c", "text": "To complain about the slow progress." },
        { "id": "d", "text": "To ask for an early deposit." }
      ],
      "correctAnswer": "b",
      "explanation": "Stalls happen because the'Effort' of moving forward suddenly feels higher than the'Benefit'. CPR lowers the effort (Resolution) while reminding them of the benefit (Context)."
    },
    {
      "id": "sd20032",
      "type": "multiple-choice",
      "text": "Why is offering a 'Risk-Free Pilot' or 'Sandbox' run such an effective unstaller in 2026?",
      "options": [
        {
          "id": "a",
          "text": "Because it's a way to give away the product for free."
        },
        {
          "id": "b",
          "text": "Because it bypasses high-friction approval processes (Legal/Security) by defining a limited, low-stakes scope where the buyer can see value before committing to the full contract."
        },
        {
          "id": "c",
          "text": "Because it makes the prospect feel guilty if they don't buy."
        },
        { "id": "d", "text": "To delay the close on your own terms." }
      ],
      "correctAnswer": "b",
      "explanation": "Modern buyers suffer from'Commitment Phobia'. A pilot allows them to validate the product in their own environment, which often provides the evidence needed to convince the'Shadow Committee' gatekeepers."
    }
  ]
}
```
