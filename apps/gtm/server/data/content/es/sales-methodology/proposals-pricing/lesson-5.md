---
title: "Técnicas de Presentación de Precios"
duration: "50 min"
track: "Sales Methodology"
course: "Course 18: Proposals, Pricing & Negotiation"
lesson: 5
---

# Presentación del Precio: El Arte de la Revelación

El momento lo es todo. En 2026, un precio presentado antes del valor es un "Gasto"; un precio presentado después del valor es una **"Oportunidad de Inversión"**. (Investigación Sandler).

La mayoría de los fundadores revelan su precio demasiado pronto porque se sienten incómodos con la tensión. Esta lección te enseña el principio de **"Ganar el Derecho"**: no tienes el derecho de declarar tu precio hasta que hayas establecido el **Costo de la Inacción (CDI)**.

<RangeSlider
  label="¿Qué tan cómodo estás con el silencio después de indicar tu precio?"
  min={1}
  max={10}
  lowLabel="Muy incómodo"
  highLabel="Totalmente cómodo"
  persistKey="proposals-pricing-L5-silence-comfort"
/>

---

## 1. Cómo Manejar la Solicitud de "Precio Aproximado" Prematuro

Los prospectos suelen preguntar por el precio en los primeros 5 minutos para ver si pueden descalificarte. Maneja esto sin ser evasivo.

- **La Redirección 2026:** _"Quiero darte un número que sea realmente relevante para tu P&L. Nuestras implementaciones típicamente oscilan entre **$5K y $25K** dependiendo de la profundidad de la automatización. Para darte una cotización específica en lugar de una estimación, necesito entender tu [Volumen/Dolor] actual. ¿Podemos tomar 10 minutos para eso?"_
- **Por qué funciona:** Proporcionas un rango (anclando alto) pero mantienes el control de la agenda de diagnóstico. (2025 Estado del Comportamiento del Comprador).

<SwipeDecision
title="¿Buena Redirección o Mala Redirección?"
description="Desliza a la derecha las deflexiones de precio efectivas, a la izquierda las débiles"
optionA="Respuesta Débil"
optionB="Respuesta Sólida"
persistKey="proposals-pricing-L5-redirect-swipe"
cards={[
{
id: "1",
content: "Depende de lo que necesites. ¿Puedes contarme más sobre tus requerimientos?",
correctOption: "a",
explanation: "Demasiado vago. Sin rango de anclaje, sin un camino de diagnóstico claro. Suena evasivo."
},
{
id: "2",
content: "Nuestras soluciones oscilan entre $8K y $30K según la complejidad de la automatización. Para darte un número preciso, necesito 15 minutos para entender los costos de tu flujo de trabajo actual. ¿Te parece bien?",
correctOption: "b",
explanation: "Proporciona rango de anclaje, justifica el diagnóstico, mantiene el control de la conversación."
},
{
id: "3",
content: "No puedo darte un precio sin saber más.",
correctOption: "a",
explanation: "Suena a la defensiva. No se proporciona rango ni encuadre de valor. El prospecto se siente bloqueado."
},
{
id: "4",
content: "La mayoría de los clientes en tu industria invierten entre $12K y $20K. Para ajustar tu número específico, pasemos 10 minutos en tus puntos de dolor actuales. ¿Te parece justo?",
correctOption: "b",
explanation: "Anclaje específico por industria, agenda de diagnóstico clara, encuadre colaborativo."
}
]}
/>

---

## 2. El Script de Resumen Económico

Cuando llega el momento de revelar el precio en una llamada, usa el patrón de **Resumen Económico**. Esto asegura que lo último que escuche el prospecto antes del precio sea el **Dolor** que están resolviendo.

1.  **El Resumen del Dolor:** _"Mencionaste que [Brecha Manual] le cuesta al equipo **$124,000 por año** en productividad facturable perdida."_
2.  **El Puente de la Solución:** _"Nuestro Nivel Acelerador automatiza el 80% de ese flujo de trabajo, recuperando efectivamente $100,000 de esa pérdida."_
3.  **La Declaración del Precio:** _"La inversión anual para eso es de **$10,000**."_
4.  **La Pausa de 4 Segundos:** (Quédate en silencio. Deja que procesen el ROI de 10x).

**La Regla del Silencio:** La primera persona que habla después de que se declara el precio es quien hace la primera concesión. **No llenes el vacío con justificaciones.** (2025 Puntos de Referencia).

<TemplateBuilder
title="Tu Script de Resumen Económico"
persistKey="proposals-pricing-L5-recap"
sections={[
{
id: "pain",
title: "Resumen del Dolor",
fields: [
{
id: "problem",
label: "El problema cuantificado",
placeholder: "ej. Los reportes manuales le cuestan a tu equipo $80,000 por año en productividad perdida",
type: "textarea"
}
]
},
{
id: "solution",
title: "Puente de la Solución",
fields: [
{
id: "benefit",
label: "La recuperación de valor específica",
placeholder: "ej. Nuestro nivel Pro automatiza el 75% de ese flujo de trabajo, recuperando $60,000 anuales",
type: "textarea"
}
]
},
{
id: "price",
title: "Declaración del Precio",
fields: [
{
id: "investment",
label: "El monto de la inversión",
placeholder: "ej. La inversión anual para eso es de $8,000",
type: "text"
}
]
}
]}
/>

<InsightCard icon="⏱️" title="La Regla de los 4 Segundos">
Después de indicar tu precio, cuenta hasta 4 mentalmente. El silencio se siente incómodo, pero está haciendo un trabajo crítico: el prospecto está calculando el ROI. Si intervienes con justificaciones ("...y podemos incluir soporte" o "...somos flexibles con el precio"), señalas que TÚ no crees en tu propio valor. Eso activa inmediatamente el modo de negociación.
</InsightCard>

<TimedChallenge
title="Practica el Silencio"
persistKey="proposals-pricing-L5-silence-drill"
timeLimit={30}
items={[
{
id: "1",
prompt: "Dices: 'La inversión es $15,000.' El prospecto está en silencio. ¿Qué haces?",
correctAnswer: "wait",
explanation: "Permanece en silencio. Deja que procesen. El primero en hablar hace la primera concesión."
},
{
id: "2",
prompt: "Después de 3 segundos de silencio, sientes el impulso de decir 'Podemos trabajar los términos de pago'. ¿Deberías?",
correctAnswer: "no",
explanation: "No. Estás llenando el vacío con una concesión antes de que hayan objetado. Espera a que respondan."
},
{
id: "3",
prompt: "El prospecto dice 'Hmm, es más alto de lo que esperaba'. ¿Cuál es tu primer movimiento?",
correctAnswer: "clarify",
explanation: "Pregunta: '¿Qué esperabas?' o '¿Cuál es tu rango de presupuesto?' No hagas un descuento de inmediato."
}
]}
/>

---

## 3. Presentando los Niveles Verbalmente

Al presentar tu modelo de 3 Niveles (de la Lección 3), guía al prospecto hacia la opción **Estratégica**.

- **El Script:** _"Según el volumen que compartiste, el **nivel Base** cubre lo esencial, pero el **nivel Estratégico** incluye [Beneficio X] que identificamos como una prioridad. La mayoría de las empresas en tu etapa encuentran que el nivel Estratégico a $15K ofrece la mejor relación 'Precio-Valor'. ¿Te parece que esa alineación funciona para ti?"_

<MiniRoleplay
  scenario="Un prospecto pregunta: '¿Puedes simplemente decirme el precio de cada nivel?'"
  role="Eres el fundador presentando los niveles"
  persistKey="proposals-pricing-L5-tier-roleplay"
  modelResponse="Por supuesto. Base es $8K y cubre [Funcionalidades Principales]. Estratégico es $15K y agrega [Beneficio Prioritario] que discutimos. Basado en tu [Volumen/Dolor], el Estratégico ofrece el mayor ROI. ¿Eso se alinea con tus expectativas?"
/>

<InteractiveChecklist
title="Lista de Verificación de Presentación del Precio"
persistKey="proposals-pricing-L5-checklist"
items={[
"Practica tu script de Resumen Económico en voz alta 3 veces",
"Pon un temporizador y practica 4 segundos de silencio después de indicar un precio",
"Escribe tu script de guía de niveles para tus 2 principales segmentos de clientes",
"Grábate haciendo una revelación de precio completa y escúchate para detectar palabras de relleno",
"Prepara tu script de 'redirección de precio aproximado' con tu rango de precios real"
]}
/>

<FlipCard
  front="¿Qué es el principio 'Ganar el Derecho'?"
  back="No tienes el derecho de declarar tu precio hasta que hayas establecido el Costo de la Inacción (CDI). El precio sin contexto es un gasto. El precio después del dolor cuantificado es una oportunidad de inversión."
/>

---

## Quiz: Controlando la Tensión de la Narrativa

```json
{
  "quizId": "price-presentation-2026",
  "title": "Timing the Investment",
  "questions": [
    {
      "id": "p1851",
      "type": "multiple-choice",
      "text": "What is the 'Rule of Silence' in price presentation?",
      "options": [
        { "id": "a", "text": "Turning off your microphone during a demo." },
        {
          "id": "b",
          "text": "Staying silent for at least 4 seconds after stating your price to allow the prospect to process the value and respond first."
        },
        {
          "id": "c",
          "text": "Not talking about price until the customer brings it up."
        },
        {
          "id": "d",
          "text": "Hanging up the call if the prospect doesn't like the price."
        }
      ],
      "correctAnswer": "b",
      "explanation": "Human brains need time to process 'Choice Architecture'. If you jump in with excuses ('...and we can include support' or '...we can move on price'), you signal that you are uncomfortable with your own value, which triggers an immediate negotiation response from the buyer."
    },
    {
      "id": "p1852",
      "type": "multiple-choice",
      "text": "What should be stated immediately BEFORE the price in a verbal reveals?",
      "options": [
        { "id": "a", "text": "A list of your technical specifications." },
        {
          "id": "b",
          "text": "The quantified Cost of Inaction (COI) or the value to be recovered."
        },
        { "id": "c", "text": "Your company's founding story." },
        { "id": "d", "text": "An apology for the high cost." }
      ],
      "correctAnswer": "b",
      "explanation": "Value-Based Pricing only works if the context of the problem is fresh. By recapping that the problem costs $100k right before stating a $10k price, you frame the investment as a logic-based opportunity rather than an emotional expense."
    }
  ]
}
```

**Siguiente Lección:** [Fundamentos de Negociación](/sales-methodology/proposals-pricing/lesson-6)
