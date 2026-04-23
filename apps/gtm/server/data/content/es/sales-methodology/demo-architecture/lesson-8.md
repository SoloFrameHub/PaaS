---
title: "El Dojo de Demo: Usando el Roleplay de IA para el Dominio"
duration: "60 min"
track: "Sales Methodology"
course: "Course 16: Demo Architecture"
lesson: 8
---

# El Dojo de Demo: Dominio del Rendimiento con IA

Un lead de $10,000 es algo demasiado valioso para desperdiciarlo en una "práctica." Sin embargo, la mayoría de los fundadores esperan hasta tener a un prospecto de alto valor en una llamada de Zoom en vivo para probar un nuevo bucle narrativo. En los deportes profesionales, los atletas no esperan el campeonato para practicar sus tiros. Para el fundador en solitario, el **Dojo de Roleplay con IA** es tu gimnasio. (2025 State of Sales).

<InsightCard icon="🎯" title="The Real Goal">
Move your "mouse-clicking" and "scripting" into your subconscious, allowing you to focus 100% of your conscious attention on the prospect's emotional cues.
</InsightCard>

El objetivo es mover tu "clic del mouse" y "guión" a tu subconsciente, permitiéndote enfocar el 100% de tu atención consciente en las señales emocionales del prospecto. (Sandler Research).

---

## 1. El Bucle OMP: Tu Motor de Demo

El ritmo central de una demo de alta conversión es el bucle **Resultado-Mecanismo-Prueba (OMP)**. (2025 Benchmarks).

<SlideNavigation>
<Slide title="Outcome: The Business Result">

**Resultado:** _"Imagina poder generar un mes completo de contenido en 10 minutos."_

Aquí es donde pintas el cuadro del estado transformado. No características — resultados.

</Slide>
<Slide title="Mechanism: How It Works">

**Mecanismo:** _"Lo logramos usando nuestra [Función] que escanea tus correos anteriores y los convierte en 30 ganchos para LinkedIn."_

Ahora revelas el "cómo" — pero solo después de que estén convencidos del "qué."

</Slide>
<Slide title="Proof: Third-Party Validation">

**Prueba:** _"Por ejemplo, [Nombre del Cliente] usó esto el mes pasado y vio un aumento de 3x en leads entrantes."_

Métricas específicas de clientes reales. No logos — transformaciones.

</Slide>
</SlideNavigation>

**El Cambio de 2026:** En 2026, los compradores son "Escépticos por Defecto." (2026 Acquisition Trends). Tu sección de **Prueba** debe ser más que un logo; debe ser una **Transformación impulsada por Métricas** específica.

<TemplateBuilder
title="Build Your OMP Loop"
persistKey="demo-architecture-L8-omp"
sections={[
{
id: "outcome",
title: "Outcome",
fields: [
{ id: "result", label: "Business Result", placeholder: "e.g., Cut reporting time from 4 hours to 15 minutes", type: "text" }
]
},
{
id: "mechanism",
title: "Mechanism",
fields: [
{ id: "feature", label: "Feature/Capability", placeholder: "e.g., Our automated dashboard pulls data from 6 sources", type: "text" }
]
},
{
id: "proof",
title: "Proof",
fields: [
{ id: "customer", label: "Customer Name/Type", placeholder: "e.g., Mid-market SaaS company", type: "text" },
{ id: "metric", label: "Specific Metric", placeholder: "e.g., 3x increase in inbound leads in 30 days", type: "text" }
]
}
]}
/>

---

## 2. 3 Niveles de Estimulación del Dojo

### Nivel 1: Fluidez (El Innovador Curioso)

- **Persona:** Amigable y conocedor de tecnología.
- **Objetivo:** ¿Puedes moverte a través de la **Curva en U** (Lección 3) sin palabras de relleno?
- **Métrica:** Tiempo hasta el Valor. ¿Puedes alcanzar el momento "Wow" en menos de 120 segundos? (2025 State of Buyer Behavior).

### Nivel 2: Presión (El Ejecutivo Escéptico)

- **Persona:** Con poco tiempo, directo, obsesionado con el ROI.
- **El Desafío:** La IA te interrumpirá: _"Me quedan 5 minutos. ¿Por qué debería importarme esta función?"_
- **Estrategia:** Pivote inmediato a la vista de **Altitud 30,000 Pies** (Lección 4).

### Nivel 3: Adversidad (El Bloqueador Técnico)

- **Persona:** Líder de TI/Seguridad buscando razones para decir "No."
- **El Desafío:** La IA hará preguntas "trampa" sobre rotación de JWT o datos en reposo.
- **Estrategia:** Mantén el **Marco de Experto** (Curso 13). Usa el "No Estratégico" (Lección 5) para diferir los detalles técnicos al **Paquete de Adquisición** (Curso 18).

<RangeSlider 
  label="Which level best matches your current demo confidence?" 
  min={1} 
  max={3} 
  lowLabel="Level 1: Fluidity" 
  highLabel="Level 3: Adversity" 
  persistKey="demo-architecture-L8-level" 
/>

<MiniRoleplay
  scenario="You're 3 minutes into your demo when the prospect interrupts: 'I have 5 minutes left. Why should I care about this feature?'"
  role="You are the founder responding"
  persistKey="demo-architecture-L8-interrupt"
  modelResponse="Totally understand. Let me jump to the bottom line: this feature cuts your team's reporting time from 4 hours to 15 minutes weekly. That's 3.5 hours back per person. For a 10-person team, that's $50K in recovered capacity annually. Worth the next 2 minutes to see how?"
/>

---

## 3. Analizando la "Cinta del Partido"

Después de cada sesión del Dojo, el **Coach de IA** auditará tu rendimiento en busca de estas Señales de Alerta de 2026: (Gartner Research).

<ClassifyExercise
title="Classify These Demo Moments"
persistKey="demo-architecture-L8-classify"
categories={[
{ id: "green", label: "✅ Prospect-Focused", color: "#10b981" },
{ id: "yellow", label: "⚠️ Borderline", color: "#f59e0b" },
{ id: "red", label: "❌ Founder-Focused", color: "#ef4444" }
]}
items={[
{ id: "1", content: "I built this feature because I was frustrated with...", correctCategory: "red" },
{ id: "2", content: "Your team will save 4 hours per week on reporting.", correctCategory: "green" },
{ id: "3", content: "We use machine learning to optimize the workflow.", correctCategory: "yellow" },
{ id: "4", content: "This dashboard shows you exactly which campaigns are driving revenue.", correctCategory: "green" },
{ id: "5", content: "Our product has 47 integrations.", correctCategory: "red" }
]}
/>

1.  **El Conteo de "Yo" (Narcisismo):** Si dices "Yo" o "Nuestro producto" dos veces más seguido que "Tú" o "Tu equipo", pierdes. (Objetivo: 3:1 a favor del prospecto).
2.  **Longitud del Monólogo:** Busca bloques donde hablaste más de 90 segundos sin un **Cierre de Prueba** (Lección 6).
3.  **Fuga de Jerga:** Cualquier palabra que requiera un diccionario técnico para entenderse activa un "Interruptor Biológico de Apagado" en el cerebro del CFO.

<LinterFeedback
title="Demo Script Linter"
persistKey="demo-architecture-L8-linter"
inputLabel="Paste a 2-minute section of your demo script"
rules={[
{
id: "you-ratio",
label: "Prospect-Focused Language",
description: "Uses 'you/your' at least 3x more than 'I/we/our'",
keywords: ["you", "your", "you'll"],
antiKeywords: ["I", "we", "our product"]
},
{
id: "trial-close",
label: "Trial Close Present",
description: "Includes a check-in question",
keywords: ["does that make sense", "sound good", "does this address", "is this relevant"]
},
{
id: "jargon",
label: "Jargon-Free",
description: "Avoids technical terms without business context",
antiKeywords: ["JWT", "API", "microservices", "Kubernetes", "OAuth", "webhook"]
},
{
id: "metric",
label: "Specific Metric",
description: "Includes a concrete number or percentage",
keywords: ["hours", "minutes", "%", "x increase", "days", "$"]
}
]}
/>

<InteractiveChecklist
title="Post-Dojo Debrief Checklist"
persistKey="demo-architecture-L8-debrief"
items={[
"Record a 5-minute demo with AI roleplay (Level 1 or 2)",
"Run your script through the Demo Script Linter above",
"Identify your top 2 jargon words and replace with business outcomes",
"Practice one OMP loop until you can deliver it in under 60 seconds",
"Schedule 3 more Dojo sessions this week at different difficulty levels"
]}
/>

---

## Quiz: Ensayando el Resultado

```json
{
  "quizId": "demo-dojo-2026",
  "title": "Scaling through Simulation",
  "questions": [
    {
      "id": "da1681",
      "type": "multiple-choice",
      "text": "¿Cuál es el principal beneficio del bucle OMP (Resultado-Mecanismo-Prueba)?",
      "options": [
        { "id": "a", "text": "Hace que la demo sea más larga." },
        {
          "id": "b",
          "text": "Asegura que cada función técnica (Mecanismo) esté anclada en un resultado empresarial (Resultado) y validada por datos de terceros (Prueba)."
        },
        { "id": "c", "text": "Te ayuda a recordar tus funciones." },
        { "id": "d", "text": "Anima al prospecto a hacer más preguntas." }
      ],
      "correctAnswer": "b",
      "explanation": "En 2026, los compradores no compran código; compran 'Riesgo Reducido' e 'Ingresos Aumentados'. El bucle OMP evita que hagas 'Volcado de Características' al obligarte a declarar el valor antes de explicar la mecánica."
    },
    {
      "id": "da1682",
      "type": "multiple-choice",
      "text": "¿Por qué deberías usar el Roleplay de IA para la 'Gestión de Interrupciones'?",
      "options": [
        { "id": "a", "text": "Para practicar a ser grosero de vuelta." },
        {
          "id": "b",
          "text": "Para desarrollar el reflejo de 'Pivotar al Valor' cuando un stakeholder de alto estatus (CEO/CFO) hace una pregunta inesperada o intenta terminar la llamada antes de tiempo."
        },
        {
          "id": "c",
          "text": "Para ver si la IA puede bloquear tu computadora."
        },
        { "id": "d", "text": "Para grabar un video para YouTube." }
      ],
      "correctAnswer": "b",
      "explanation": "Las demos rara vez van según tu guión. Al practicar con una persona de IA con 'Muchas Interrupciones', aprendes a mantener tu 'Marco de Experto' y mantenerte enfocado en los resultados empresariales sin importar cómo cambie la conversación."
    }
  ]
}
```

**Siguiente Lección:** [Guionización y Estandarización](/sales-methodology/demo-architecture/lesson-9)
