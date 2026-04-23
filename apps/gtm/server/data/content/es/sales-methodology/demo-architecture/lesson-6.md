---
title: "Cierres de Prueba: Verificando el Pulso"
duration: "50 min"
track: "Sales Methodology"
course: "Course 16: Demo Architecture"
lesson: 6
---

# Cierres de Prueba: Verificando el Pulso

Terminas tu demo de 45 minutos. Dejas de compartir tu pantalla.

- **Tú:** _"Entonces, ¿qué te pareció?"_
- **Prospecto:** _"Sí, se ve interesante. Te contactamos."_

**El trato está muerto.** (2025 State of Sales). Volaste a ciegas durante 45 minutos sin saber si estaban aburridos o emocionados. Para evitar esto, usamos **Cierres de Prueba** — micro-preguntas formuladas _durante_ la demo para verificar el pulso de la transacción. (Sandler Research).

<InsightCard icon="🎯" title="The Real Problem">
Most founders wait until the end to ask "What do you think?" By then, it's too late. Trial closes are diagnostic checkpoints that prevent you from presenting irrelevant features for 30 minutes while the prospect mentally checks out.
</InsightCard>

---

## 1. Los 3 Tipos de Cierres de Prueba

<SlideNavigation>
<Slide title="Level 1: The Comprehension Check">

Úsalo después de explicar un flujo de trabajo técnico.

- **Guión:** _"¿Esa lógica se alinea con cómo está estructurado tu dato hoy?"_
- **Objetivo:** Asegurarse de que no estén perdidos en el ruido técnico.

<ExampleCard label="When to Use">
After showing a complex integration or data flow. If they say "Not exactly," you've just discovered a critical gap before wasting 20 more minutes on the wrong architecture.
</ExampleCard>

</Slide>

<Slide title="Level 2: The Value Check">

Úsalo después de mostrar un "Momento Wow." (Curso 16, Lección 3).

- **Guión:** _"Si tu equipo tuviera esta vista mañana, ¿cómo cambiaría tu rutina semanal de reportes?"_
- **Objetivo:** Obligarlos a verbalizar la **Transformación**. (2025 Benchmarks).

<ExampleCard label="Why This Works">
When a prospect says "We'd save 4 hours every Monday," they're selling themselves. That sentence becomes your close: "So if we can get you those 4 hours back starting next week, what needs to happen on your end?"
</ExampleCard>

</Slide>

<Slide title="Level 3: The 'Temperature' Check">

Úsalo a mitad de la llamada.

- **Guión:** _"Te he mostrado la automatización principal y los reportes. Basándote en lo que has visto hasta ahora, ¿cómo se compara esto con lo que esperabas ver?"_
- **Objetivo:** Descubrir objeciones ocultas _antes_ de la diapositiva final.

<ExampleCard label="Reading the Response">
If they say "It's more technical than I thought," you now know to simplify. If they say "I expected more customization," you know to pivot to your API capabilities. This is real-time course correction.
</ExampleCard>

</Slide>
</SlideNavigation>

<TemplateBuilder
title="Your Trial Close Scripts"
persistKey="demo-architecture-L6-scripts"
sections={[
{
id: "comprehension",
title: "Comprehension Check (After Technical Section)",
fields: [
{ id: "context", label: "What technical concept did you just explain?", placeholder: "e.g., Our webhook-based sync process", type: "text" },
{ id: "script", label: "Your trial close question", placeholder: "e.g., Does that sync frequency match how often your data updates?", type: "textarea" }
]
},
{
id: "value",
title: "Value Check (After Wow Moment)",
fields: [
{ id: "feature", label: "What feature did you just demo?", placeholder: "e.g., Automated reconciliation dashboard", type: "text" },
{ id: "script", label: "Your trial close question", placeholder: "e.g., If your team had this view tomorrow, how would it change your month-end close?", type: "textarea" }
]
},
{
id: "temperature",
title: "Temperature Check (Midpoint)",
fields: [
{ id: "script", label: "Your midpoint check-in question", placeholder: "e.g., Based on what you've seen so far, how does this align with what you were hoping to solve?", type: "textarea" }
]
}
]}
/>

---

## 2. Leyendo el Lenguaje Corporal Digital

En un mundo de ventas remoto de 2026, debes buscar señales sutiles: (2026 Acquisition Trends).

- **La "Mirada a Slack":** Si sus ojos se dirigen repetidamente a la parte inferior izquierda, están multitareas.
  - **Solución:** Usa su nombre de inmediato. _"David, nota cómo esto afecta específicamente el territorio que mencionaste..."_
- **El Protocolo de "Video Apagado":** Si apagan el video, estás en alto riesgo.
  - **Solución:** Detén tu pantalla compartida por 30 segundos. _"Voy a pausar la demo un momento para que podamos simplemente charlar cara a cara sobre esta próxima parte."_ Esto obliga a que la cámara vuelva a encenderse. (2025 State of Buyer Behavior).

<ClassifyExercise
title="Classify These Engagement Signals"
persistKey="demo-architecture-L6-signals"
categories={[
{ id: "engaged", label: "Engaged", color: "#10b981" },
{ id: "neutral", label: "Neutral", color: "#f59e0b" },
{ id: "disengaged", label: "Disengaged", color: "#ef4444" }
]}
items={[
{ id: "1", content: "Prospect asks: 'Can you show that workflow again?'", correctCategory: "engaged" },
{ id: "2", content: "Prospect says: 'Uh-huh' while typing", correctCategory: "disengaged" },
{ id: "3", content: "Prospect turns video off mid-demo", correctCategory: "disengaged" },
{ id: "4", content: "Prospect says: 'That's interesting' with no follow-up question", correctCategory: "neutral" },
{ id: "5", content: "Prospect leans forward and says: 'Wait, how does that integrate with Salesforce?'", correctCategory: "engaged" },
{ id: "6", content: "Prospect's eyes dart to bottom-left screen repeatedly", correctCategory: "disengaged" }
]}
/>

---

## 3. El Poder de la "Pausa de 4 Segundos"

Los fundadores le temen al silencio. Hablan para llenarlo. Pero el silencio es donde el prospecto **piensa**. (Gartner Research).

**La Táctica:**

1.  Muestra el momento "Wow" (por ejemplo, la Reconciliación Automatizada).
2.  Di: _"Imagina enviar esto a tu CFO el lunes."_
3.  **Cállate.** Cuenta hasta 4.
4.  Si esperas, a menudo dirán: _"Vaya. Eso en realidad sería enorme."_
    **Esa oración es la venta sucediendo.** No la interrumpas con más características.

<TimedChallenge
title="Practice the 4-Second Pause"
persistKey="demo-architecture-L6-pause"
timeLimit={30}
items={[
{ id: "1", prompt: "After showing a key feature, you say: 'Imagine having this data in real-time.' What do you do next?", correctAnswer: "pause", explanation: "Pause for 4 seconds. Let them process and respond. Most founders ruin the moment by immediately adding 'And it also does X, Y, Z...'" },
{ id: "2", prompt: "Prospect says: 'Hmm, interesting.' You should:", correctAnswer: "pause", explanation: "Pause again. 'Interesting' is neutral. Silence often prompts them to elaborate: 'Actually, we've been struggling with exactly this...'" },
{ id: "3", prompt: "After a 4-second pause, prospect says nothing. You should:", correctAnswer: "trial-close", explanation: "Use a trial close: 'I'm getting the sense this might not be a top priority—am I reading that right?' This forces clarity instead of guessing." }
]}
/>

<RangeSlider 
  label="How comfortable are you with 4+ seconds of silence during a demo?" 
  min={1} 
  max={10} 
  lowLabel="Very uncomfortable" 
  highLabel="Totally comfortable" 
  persistKey="demo-architecture-L6-silence" 
/>

<MiniRoleplay
  scenario="You just showed the automated reporting dashboard. You say: 'Imagine sending this to your board on Monday.' Then you pause for 4 seconds. The prospect says: 'Yeah, that would save us a ton of time.'"
  role="You are the founder. What do you say next?"
  persistKey="demo-architecture-L6-roleplay"
  modelResponse="'A ton of time'—can you put a number on that? Like, how many hours per week does your team spend on this manually right now?"
/>

<InteractiveChecklist
title="Your Trial Close Action Plan"
persistKey="demo-architecture-L6-actions"
items={[
"Write 3 trial close scripts (comprehension, value, temperature) for your next demo",
"Practice the 4-second pause with a colleague or recording",
"Identify 3 digital body language signals you'll watch for in your next remote demo",
"Add trial close checkpoints to your demo script at 15-min, 30-min, and 40-min marks",
"Record your next demo and count how many trial closes you actually used"
]}
/>

---

## Quiz: Monitoreando el Engagement

```json
{
  "quizId": "trial-closes-2026",
  "title": "Diagnosis in Motion",
  "questions": [
    {
      "id": "da1661",
      "type": "multiple-choice",
      "text": "¿Por qué deberías DETENER una demo si un prospecto responde con 'Se ve bien' a un cierre de prueba?",
      "options": [
        { "id": "a", "text": "Porque estaban siendo groseros." },
        {
          "id": "b",
          "text": "Porque 'Bien' es un 'No' cortés. Señala que la función actual es irrelevante para su dolor, y estás desperdiciando su tiempo al continuar con el arco actual."
        },
        {
          "id": "d",
          "text": "Porque ya es hora de terminar la llamada de todas formas."
        }
      ],
      "correctAnswer": "b",
      "explanation": "El estatus de experto se construye sobre la precisión diagnóstica. Si una función no está aterrizando, seguir hablando de ella crea fricción. Un fundador proactivo dirá: 'Tengo la sensación de que esto no es una prioridad de primer nivel; ¿debemos volver al tema de la API que mencionaste antes?' Esto demuestra que valoras su tiempo más que tu guión."
    },
    {
      "id": "da1662",
      "type": "multiple-choice",
      "text": "¿Cuál es el objetivo de la pregunta de cierre de prueba 'Virtual' hacia el final de la demo?",
      "options": [
        { "id": "a", "text": "Lograr que firmen el contrato de inmediato." },
        {
          "id": "b",
          "text": "Llevar al prospecto a través de un 'Camino al Éxito' hipotético (por ejemplo, 'Si enviamos el contrato hoy, ¿qué pasa internamente a continuación?') para descubrir los obstáculos reales del 'Comité en la Sombra'."
        },
        { "id": "c", "text": "Pedir información de la tarjeta de crédito." },
        { "id": "d", "text": "Explicar los niveles de precios nuevamente." }
      ],
      "correctAnswer": "b",
      "explanation": "El 'Cierre Virtual' es una herramienta diagnóstica. Cuando un prospecto dice 'Bueno, entonces va a Legal', ahora sabes que 'Legal' es el próximo bloqueador que debes considerar en tu cronograma. Te ayuda a mapear el 'Proceso de Decisión' (Modelo PID) mientras el momentum de la demo sigue alto."
    }
  ]
}
```

**Siguiente Lección:** [El Dojo de Demo: Usando el Roleplay de IA para el Dominio](/sales-methodology/demo-architecture/lesson-7)
