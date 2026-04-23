---
title: "El Marco Tell-Show-Tell"
duration: "55 min"
track: "Sales Methodology"
course: "Course 16: Demo Architecture"
lesson: 2
---

# El Marco Tell-Show-Tell: Dirigiendo el Foco Cognitivo

Compartes tu pantalla en una llamada de Zoom. De repente, el cerebro de tu prospecto es golpeado por un tsunami de datos visuales: barras laterales, colores del dashboard e íconos. En los primeros 10 segundos de una pantalla compartida, la "Carga Cognitiva" del prospecto se dispara y su IQ efectivamente baja. (2025 State of Sales). Si empiezas a "vender" mientras están desorientados, pierdes.

Para solucionar esto, los fundadores profesionales usan el marco **Tell-Show-Tell** (Contexto-Demo-Valor). Es la única manera de enfocar el "Foco Cognitivo" donde quieres. (Gartner Research).

<RangeSlider 
  label="How often do you currently use a structured framework during demos?" 
  min={1} 
  max={10} 
  lowLabel="Never / Wing it" 
  highLabel="Always structured" 
  persistKey="demo-architecture-L2-framework-usage" 
/>

---

## 1. La Biología del Enfoque

El cerebro humano consume el 20% de la energía de tu cuerpo. Cuando presentas "Ruido" (una pantalla ocupada sin orientación), el cerebro tiene que trabajar en exceso. Para conservar energía, el prospecto literalmente **se desconecta**. (2025 State of Buyer Behavior).

**El Protocolo Tell-Show-Tell:**

1.  **TELL (La Preparación):** Dirige la "linterna" de su atención.
2.  **SHOW (La Prueba):** Enciende las luces y ejecuta la acción.
3.  **TELL (El Remate):** Explica por qué el resultado importa para su P&L específico.

<InsightCard icon="🧠" title="The Cognitive Load Trap">
In the first 10 seconds of a screen share, your prospect's brain is processing visual data at maximum capacity. Any selling during this window is wasted — they literally cannot process complex verbal logic while their visual cortex is overloaded.
</InsightCard>

---

## 2. Paso 1: TELL (El Contexto)

Nunca hagas clic en un botón antes de decir _por qué_ lo estás haciendo. Debes declarar el **Dolor** y la **Promesa** antes de que aparezca la imagen. (Sandler Research).

**El Guión:** _"¿Recuerdas que mencionaste que tu equipo pasa 4 horas cada lunes exportando CSVs manualmente? [Espera el asentimiento]. Voy a mostrarte la 'Vista Lista para el Directorio'. Convierte ese tedioso proceso manual de 4 horas en una ejecución de un clic. Mira esto..."_

<TemplateBuilder
title="Your Tell-Show-Tell Script"
persistKey="demo-architecture-L2-script"
sections={[
{
id: "tell1",
title: "TELL #1: The Context",
fields: [
{ id: "pain", label: "Reference their specific pain point", placeholder: "Remember how you mentioned that your team spends 4 hours every Monday manually exporting CSVs?", type: "textarea" },
{ id: "promise", label: "State what you're about to show", placeholder: "I'm going to show you the 'Board-Ready' View that turns that 4-hour manual slog into a one-click execution.", type: "textarea" }
]
},
{
id: "show",
title: "SHOW: The Proof",
fields: [
{ id: "action", label: "What specific action will you demonstrate?", placeholder: "Click 'Export Board Report' button", type: "text" }
]
},
{
id: "tell2",
title: "TELL #2: The Tie-Down",
fields: [
{ id: "question", label: "Your open-ended value question", placeholder: "How would your team use those extra 4 hours every Monday if they weren't wrangling CSVs?", type: "textarea" }
]
}
]}
/>

---

## 3. Paso 2: SHOW (La Prueba)

Ahora, y solo ahora, ejecutas la acción. En 2026, la **Higiene del Mouse** es un marcador de autoridad profesional. (2026 Acquisition Trends).

- **Estaciona el Mouse:** Cuando estés hablando, quita tu mano del mouse. El movimiento del cursor distrae de tu voz.
- **La Regla de Cero Latencia:** Si una función tarda más de 3 segundos en cargar, fallas. Ten tus pestañas pre-cargadas.
- **Sin Círculos:** No rodees un botón 15 veces. Apunta una vez, haz clic una vez. (2025 Benchmarks).

<SwipeDecision
title="Demo Hygiene: Good or Bad?"
description="Swipe right for professional demo behaviors, left for amateur mistakes"
optionA="Amateur Mistake"
optionB="Professional Move"
persistKey="demo-architecture-L2-hygiene"
cards={[
{
id: "1",
content: "You circle a button 8 times with your cursor while explaining what it does",
correctOption: "a",
explanation: "Cursor movement triggers the brain's tracking mechanism, displacing capacity to process your verbal explanation. Point once, click once."
},
{
id: "2",
content: "You rest your hand off the mouse while delivering the context statement",
correctOption: "b",
explanation: "Parking the mouse keeps the prospect's visual attention on the screen content, not cursor movement, allowing them to process your words."
},
{
id: "3",
content: "You click a feature that takes 8 seconds to load while the prospect watches the loading spinner",
correctOption: "a",
explanation: "The Zero-Latency Rule: anything >3 seconds kills momentum. Pre-load all tabs and features before the call."
},
{
id: "4",
content: "You have all demo tabs pre-loaded in separate browser windows before the call starts",
correctOption: "b",
explanation: "Professional preparation. No loading delays = no cognitive breaks = maintained narrative flow."
},
{
id: "5",
content: "You start clicking through features immediately after screen share, while the prospect is still orienting to your interface",
correctOption: "a",
explanation: "In the first 10 seconds, their brain is processing visual layout. Any selling during this window is wasted. Always TELL before you SHOW."
}
]}
/>

---

## 4. Paso 3: TELL (El Remate de Valor)

Después de que aparece el gráfico, **Para de moverte.** Ahora debes obligar al prospecto a verbalizar el valor.

- **El Guión:** _"Entonces, eso fue la sincronización automatizada. En lugar de 4 horas, tomó 4 segundos. ¿Cómo usaría tu equipo esas 4 horas extra cada lunes si no estuvieran lidiando con CSVs?"_
- **La Psicología:** Si lo _dices tú_, es una afirmación. Si lo _dice él_, es un hecho.

<FlipCard 
  front="Why must the prospect verbalize the value?" 
  back="Confirmation bias is a powerful tool. When a prospect answers 'What would you do with those 4 extra hours?', they mentally move themselves into the 'Future State' you promised. They have effectively closed themselves on that specific feature's value. Your claim becomes their accepted fact." 
/>

<MiniRoleplay
  scenario="You just showed a feature that automates a 2-hour weekly task. The prospect is silent, looking at the screen."
  role="You are the founder delivering the Tie-Down"
  persistKey="demo-architecture-L2-tiedown"
  modelResponse="So that automation just turned 2 hours into 30 seconds. If your team had those 2 hours back every week, what would they focus on instead?"
/>

<InteractiveChecklist
title="Your Demo Prep Checklist"
persistKey="demo-architecture-L2-prep"
items={[
"Pre-load all demo tabs/features (Zero-Latency Rule)",
"Write out TELL #1 script referencing their specific pain",
"Identify the single action you'll demonstrate in SHOW",
"Prepare your TELL #2 tie-down question",
"Practice parking the mouse during verbal explanations",
"Test all features to ensure <3 second load times",
"Have backup demo environment ready in case of technical issues"
]}
/>

---

## Quiz: Ingeniería del Flujo Narrativo

```json
{
  "quizId": "tell-show-tell-2026",
  "title": "Mastering the Demo Loop",
  "questions": [
    {
      "id": "da1621",
      "type": "multiple-choice",
      "text": "¿Por qué es crítico 'Estacionar el Mouse' en una demo de 2026?",
      "options": [
        { "id": "a", "text": "Para evitar que se canse tu mano." },
        {
          "id": "b",
          "text": "Porque el ojo humano está biológicamente programado para seguir el movimiento; si el cursor se mueve, el prospecto está mirando el cursor en lugar de escuchar tu propuesta de valor."
        },
        { "id": "d", "text": "Para demostrar que tu internet es rápido." }
      ],
      "correctAnswer": "b",
      "explanation": "La atención es la moneda más cara en 2026. La investigación de neuromarketing muestra que los micro-movimientos en pantalla (como mover el mouse o circular frenéticamente) activan el mecanismo de seguimiento del cerebro, desplazando la capacidad de procesar lógica verbal compleja."
    },
    {
      "id": "da1622",
      "type": "multiple-choice",
      "text": "¿Cuál es el objetivo principal del segundo 'TELL' (el Remate) en el marco?",
      "options": [
        {
          "id": "a",
          "text": "Describir las especificaciones técnicas de la función."
        },
        {
          "id": "b",
          "text": "Obligar al prospecto a verbalizar el beneficio en su propio contexto, transformando tu afirmación en un hecho aceptado."
        },
        { "id": "c", "text": "Pedir la venta de inmediato." },
        { "id": "d", "text": "Llenar el silencio mientras carga la página." }
      ],
      "correctAnswer": "b",
      "explanation": "El sesgo de confirmación es una herramienta poderosa. Cuando un prospecto responde '¿Qué haría con esas 4 horas extra?', se está moviendo mentalmente al 'Estado Futuro' que prometiste. Se ha cerrado a sí mismo en el valor de esa característica específica."
    }
  ]
}
```

**Siguiente Lección:** [Ingeniería Inversa del WOW](/sales-methodology/demo-architecture/lesson-3)
