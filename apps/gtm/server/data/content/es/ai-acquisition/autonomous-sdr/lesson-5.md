---
title: "Resultados: lo que realmente ven los fundadores en solitario"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 26: Autonomous SDR Systems"
lesson: 5
---

## La pregunta de los $750/mes

Sarah, una fundadora de SaaS B2B, miraba su panel de AiSDR. Mes 1: 3 reuniones. Mes 2: 7 reuniones. Mes 3: 11 reuniones. Costo total: $2,250.

Su amigo Jake usaba un stack DIY (Instantly + Apollo + ChatGPT). Mes 1: 4 reuniones. Mes 2: 6 reuniones. Mes 3: 9 reuniones. Costo total: $450.

Sarah cerró 2 tratos por $24K ARR. Jake cerró 2 tratos por $20K ARR.

**La pregunta:** ¿Valió la pena el extra de $1,800 de Sarah?

Esta lección responde esa pregunta con datos reales, no con promesas de marketing de los proveedores.

---

## Estableciendo expectativas realistas

<InsightCard icon="⏰" title="La verdad de los 30 días">
Las plataformas SDR IA NO son "configura y olvida". Los primeros 30 días son calibración, no producción. Espera resultados mínimos mientras el sistema aprende tu voz, ICP y qué realmente convierte.
</InsightCard>

Esto es lo que realmente sucede en los primeros 90 días:

<SlideNavigation>
<Slide title="Mes 1: El infierno de la calibración">

**Lo que estás haciendo:**

- Configurando los parámetros del ICP (10+ horas)
- Importando y limpiando listas de contactos
- Revisando los correos generados por IA (cada uno)
- Ajustando tono, profundidad de personalización, CTAs
- Lidiando con integraciones (CRM, calendario, herramientas de enriquecimiento)

**Lo que obtienes:**

- 2-5 reuniones si tienes suerte
- Muchos momentos de "esto no suena como yo"
- Al menos un "Dios mío, ¿de verdad envió eso?"

**Inversión de tiempo:** 15-20 horas este mes

<ExampleCard label="Fundador real: Mes 1">
"Pasé 18 horas en las primeras dos semanas solo ajustando prompts. La IA seguía usando frases como 'hacer sinergia' — jerga corporativa que yo nunca usaría. Conseguí 3 reuniones, pero dos eran de prospectos que ya había calentado manualmente."
— Alex, SaaS de automatización de marketing
</ExampleCard>

</Slide>

<Slide title="Mes 2: Mejorando">

**Lo que estás haciendo:**

- Aún revisando la mayoría de los correos (70% superior)
- Iterando en las reglas de clasificación de respuestas
- Agregando listas de exclusión (competidores, clientes pasados, mal ajuste)
- Afinando los disparadores de personalización
- Sesiones semanales de calibración (30-60 min cada una)

**Lo que obtienes:**

- 5-10 reuniones (el sistema mejora)
- Mejores tasas de respuesta (3-6% vs 1-3% en el Mes 1)
- Menos momentos de "oh no"
- Empezando a confiar en la IA para prospectos de bajo valor

**Inversión de tiempo:** 8-12 horas este mes

<ExampleCard label="Fundador real: Mes 2">
"La semana 5 fue el punto de inflexión. Dejé de editar cada correo y empecé a revisar en lote. La tasa de respuesta saltó del 2% al 5%. Agendé 8 reuniones. Finalmente sentí que el sistema trabajaba CONMIGO en lugar de en mi contra."
— Maria, plataforma de habilitación de ventas
</ExampleCard>

</Slide>

<Slide title="Mes 3+: Estado estable">

**Lo que estás haciendo:**

- Revisión diaria de 15 minutos en la cola
- Calibración semanal de 30 minutos
- Revisando principalmente prospectos de alto valor y respuestas
- Dejando que la IA maneje el 50-70% de los envíos automáticamente

**Lo que obtienes:**

- 8-15 reuniones/mes (si está bien ajustado)
- 5-8% de tasa de respuesta en campañas dirigidas
- 1-3% de tasa de respuesta positiva (realmente interesados)
- 40-60% de las respuestas positivas se convierten en reuniones

**Inversión de tiempo:** 4-6 horas/mes

<ExampleCard label="Fundador real: Mes 3">
"Ahora es parte de mi rutina matutina. 15 minutos con el café: revisar respuestas, aprobar los envíos del día, listo. Reservando 10-12 reuniones/mes de forma consistente. Cerré dos tratos este mes ($18K ARR). El sistema se pagó solo."
— David, startup de HR tech
</ExampleCard>

</Slide>
</SlideNavigation>

<RangeSlider 
  label="¿Qué tan paciente eres con un período de arranque de 30-60 días?" 
  min={1} 
  max={10} 
  lowLabel="Necesito resultados YA" 
  highLabel="Puedo invertir en la configuración" 
  persistKey="autonomous-sdr-L5-patience" 
/>

---

## Los números: SDR IA vs. stack DIY

Comparemos resultados reales con un volumen de 50-150 contactos/día (rango del fundador en solitario):

<ComparisonBuilder
title="Tu proyección de resultados mensuales"
persistKey="autonomous-sdr-L5-projection"
prompt="Basándote en tu volumen actual de outreach y tamaño de trato, ¿qué resultados esperas?"
expertExample="A 100 contactos/día con $10K ACV: Stack DIY = 8-10 reuniones/mes, 2 tratos ($20K). AiSDR = 10-12 reuniones/mes, 2-3 tratos ($25K). Diferencia: $750/mes por 2 reuniones extra y quizás 1 trato extra cada 3 meses."
criteria={[
"Volumen de contactos realista (50-150/día para fundadores en solitario)",
"Tiene en cuenta el período de arranque de 30 días",
"Incluye cálculo de costo por reunión",
"Considera el tiempo de supervisión"
]}
/>

### La tabla de datos

<ScenarioSimulator
title="SDR IA vs. DIY: Calculadora de producción mensual"
persistKey="autonomous-sdr-L5-calculator"
levers={[
{ id: "volume", label: "Volumen diario de contactos", min: 25, max: 200, step: 25, defaultValue: 100 },
{ id: "dealSize", label: "Tamaño promedio de trato ($)", min: 1000, max: 50000, step: 1000, defaultValue: 10000 },
{ id: "closeRate", label: "Tasa de cierre (%)", min: 5, max: 40, step: 5, defaultValue: 20 }
]}
outputs={[
{ id: "diyMeetings", label: "Reuniones DIY/mes", formula: "(volume * 20 * 0.05 * 0.5)", unit: "", precision: 1 },
{ id: "aiMeetings", label: "Reuniones SDR IA/mes", formula: "(volume * 20 * 0.06 * 0.55)", unit: "", precision: 1 },
{ id: "diyDeals", label: "Tratos DIY/mes", formula: "(diyMeetings * (closeRate / 100))", unit: "", precision: 1 },
{ id: "aiDeals", label: "Tratos SDR IA/mes", formula: "(aiMeetings * (closeRate / 100))", unit: "", precision: 1 },
{ id: "diyRevenue", label: "Ingresos mensuales DIY", formula: "(diyDeals * dealSize)", unit: "$", precision: 0 },
{ id: "aiRevenue", label: "Ingresos mensuales SDR IA", formula: "(aiDeals * dealSize)", unit: "$", precision: 0 },
{ id: "revenueDiff", label: "Diferencia de ingresos", formula: "(aiRevenue - diyRevenue)", unit: "$", precision: 0 }
]}
insight="A `{volume}` contactos/día: DIY genera ~${diyRevenue}/mes por $150-180 de costo. SDR IA genera ~${aiRevenue}/mes por $750-2000 de costo. Ingresos extra: ${revenueDiff}. ¿Vale ese margen el costo adicional?"
/>

<FlipCard 
  front="La verdad incómoda" 
  back="Para la mayoría de los fundadores en solitario haciendo <150 contactos/día, la diferencia de producción entre un stack DIY bien ajustado y una plataforma SDR IA de $750-2000/mes es del 10-20%. La diferencia de costo es del 400-1000%." 
/>

---

## Dónde las plataformas SDR IA realmente GANAN

No todo se trata del volumen bruto de reuniones. Estos son los escenarios donde las plataformas SDR IA genuinamente superan al DIY:

### 1. Gestión de respuestas a escala

<ExampleCard label="La ventaja de la clasificación de respuestas">
**Escenario:** Tienes 3 campañas activas simultáneamente. Recibes 40-60 respuestas/día.

**Stack DIY:** Lees cada respuesta manualmente, la categoriza (interesado/objeción/no interesado/fuera de oficina), redacta respuestas, hace seguimiento. **Tiempo: 60-90 min/día.**

**Plataforma SDR IA:** Auto-clasifica respuestas con precisión del 80-95%. Redacta respuestas para tu revisión. Marca las de alta prioridad. **Tiempo: 15-20 min/día.**

**Ganador:** La plataforma SDR IA ahorra 45-70 min/día en gestión de respuestas.
</ExampleCard>

### 2. Coordinación multicanal

<ExampleCard label="La ventaja de la orquestación">
**Escenario:** Quieres contactar prospectos por email (Día 1), visita a LinkedIn (Día 3), seguimiento por email (Día 7), conexión en LinkedIn (Día 10).

**Stack DIY:** Rastreas manualmente quién está en qué paso en distintas plataformas. Zapier ayuda pero requiere zaps complejos. Fácil de perder el hilo.

**Plataforma SDR IA:** Orquesta toda la secuencia automáticamente. Ajusta el tiempo según el engagement. Pausa LinkedIn si el email recibe respuesta.

**Ganador:** Plataforma SDR IA para complejidad multicanal.
</ExampleCard>

### 3. Bases de datos de prospectos integradas

<ExampleCard label="La ventaja de los datos">
**Escenario:** Necesitas 500 nuevos contactos que coincidan con tu ICP este mes.

**Stack DIY:** Apollo ($49-99/mes) + filtrado manual + verificación ($4/mes) + enriquecimiento con ChatGPT ($20/mes). **Tiempo: 3-5 horas para construir la lista.**

**Plataforma SDR IA (Artisan):** Base de datos de 300M+ contactos integrada. La IA filtra por ICP. Auto-enriquece. **Tiempo: 30-60 min para construir la lista.**

**Ganador:** Plataforma SDR IA con base de datos integrada (Artisan, 11x) ahorra 2-4 horas/mes en construcción de listas.
</ExampleCard>

### 4. Personalización a volumen

<ExampleCard label="La ventaja de la escala">
**Escenario:** Envías 100 correos/día. Cada uno necesita una primera línea personalizada.

**Stack DIY:** Investigas 20-30 prospectos/día manualmente, escribes abridores personalizados, usas plantillas para el resto. **Tiempo: 45-60 min/día.**

**Plataforma SDR IA:** Auto-investiga cada prospecto (publicaciones recientes, noticias de empresa, stack tecnológico), genera abridores personalizados, tú revisas el 30% superior. **Tiempo: 15-20 min/día.**

**Ganador:** La plataforma SDR IA ahorra 30-40 min/día en personalización.
</ExampleCard>

<InsightCard icon="🎯" title="El patrón">
Las plataformas SDR IA ganan en **ahorro de tiempo para tareas repetitivas de alto volumen**. No necesariamente ganan en calidad del resultado o tasas de conversión — esas son comparables a los stacks DIY bien ejecutados.
</InsightCard>

<ClassifyExercise
title="¿Qué sistema gana?"
persistKey="autonomous-sdr-L5-classify"
categories={[
{ id: "diy", label: "Stack DIY mejor", color: "#3b82f6" },
{ id: "ai", label: "SDR IA mejor", color: "#8b5cf6" },
{ id: "tie", label: "Aproximadamente igual", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Enviar 50 correos altamente personalizados/día a leads calientes", correctCategory: "tie", explanation: "Ambos pueden hacerlo bien. DIY da más control, IA ahorra tiempo." },
{ id: "2", content: "Gestionar 60+ respuestas/día en 3 campañas", correctCategory: "ai", explanation: "La clasificación de respuestas y el borrador automático ahorran 45+ min/día." },
{ id: "3", content: "Mantener voz de marca consistente en el outreach", correctCategory: "diy", explanation: "Tú lo escribes, así que suenas como tú. La IA requiere ajuste constante." },
{ id: "4", content: "Coordinar outreach por email + LinkedIn + Twitter", correctCategory: "ai", explanation: "La orquestación multicanal es donde brillan los SDR IA." },
{ id: "5", content: "Construir una lista de 500 nuevos contactos/mes", correctCategory: "ai", explanation: "Si usas Artisan/11x con bases de datos integradas. De lo contrario DIY está bien." },
{ id: "6", content: "Manejar negociaciones de precios matizadas por email", correctCategory: "diy", explanation: "Nunca automatices discusiones de precios. Demasiado riesgo." },
{ id: "7", content: "Enviar 150+ contactos/día de forma sostenible", correctCategory: "ai", explanation: "A este volumen, el ahorro de tiempo justifica el costo." },
{ id: "8", content: "Personalizar abridores para 100 prospectos/día", correctCategory: "ai", explanation: "La investigación + generación de IA ahorra 30-40 min/día." }
]}
/>

---

## Dónde las plataformas SDR IA PIERDEN

Ahora la parte incómoda. Aquí es donde las plataformas SDR IA tienen un rendimiento inferior o crean riesgo:

### 1. Consistencia de voz de marca

<FlipCard 
  front="El problema de la voz" 
  back="La IA no suena como tú. Suena como IA corporativa. Incluso después del ajuste, el 20-30% de los resultados necesitan edición para coincidir con tu voz real. Stack DIY = tú lo escribes, así que siempre es tu voz." 
/>

<ExampleCard label="Ejemplo real: La trampa genérica">
**Resultado del SDR IA (antes de editar):**
"Hola {{firstName}}, noté que tu empresa está creciendo rápidamente. Quería comunicarme para discutir cómo podemos ayudarte a optimizar tu proceso de ventas."

**La voz real del fundador:**
"Oye {{firstName}} — vi que contrataste 3 AEs el mes pasado. Esa es la parte divertida. El caos de capacitarlos a todos a la vez, ¿no tanto? Construimos una herramienta que reduce el tiempo de incorporación a la mitad. ¿Vale 15 min?"

**La brecha:** La IA usa por defecto un lenguaje seguro y corporativo. Tu voz es directa, específica, humana. Cerrar esa brecha requiere edición constante.
</ExampleCard>

### 2. Gestión matizada de respuestas

<InsightCard icon="⚠️" title="La tasa de error del 5-20%">
La clasificación de respuestas de IA tiene una precisión del 80-95%. Eso significa que **el 5-20% de las respuestas se clasifican incorrectamente**. A 100 respuestas/mes, eso son 5-20 conversaciones mal gestionadas. Una de ellas podría ser tu trato más grande.
</InsightCard>

<ExampleCard label="Incidente real de mala clasificación">
**Respuesta del prospecto:** "Esto parece interesante pero estamos atados a nuestro contrato actual hasta el T3. ¿Puedes hacer seguimiento en julio?"

**Clasificación de la IA:** "No interesado" (por "atados a contrato actual")

**Acción de la IA:** Envió correo de despedida: "Gracias por tu tiempo. Si algo cambia, no dudes en contactarnos."

**Realidad:** El prospecto estaba caliente y dio una fecha clara de seguimiento. La IA mató la conversación.

**Costo:** Perdió un trato de $15K.
</ExampleCard>

### 3. Memoria de contexto de relación

<FlipCard 
  front="El problema del contexto" 
  back="Las plataformas SDR IA no recuerdan bien las interacciones pasadas. Si tuviste una llamada hace 2 meses y el prospecto re-entra en una secuencia, la IA podría enviar un correo de introducción en frío. Vergonzoso y mata el trato." 
/>

### 4. Eficiencia de costo a bajo volumen

Hagamos los cálculos:

<ScenarioSimulator
title="Calculadora de costo por reunión"
persistKey="autonomous-sdr-L5-cost-per-meeting"
levers={[
{ id: "volume", label: "Volumen de envío diario", min: 25, max: 200, step: 25, defaultValue: 75 },
{ id: "platform", label: "Costo de plataforma/mes ($)", min: 0, max: 5000, step: 50, defaultValue: 750 }
]}
outputs={[
{ id: "meetings", label: "Reuniones/mes", formula: "(volume * 20 * 0.05 * 0.5)", unit: "", precision: 1 },
{ id: "costPerMeeting", label: "Costo por reunión", formula: "(platform / meetings)", unit: "$", precision: 0 }
]}
insight="A `{volume}` envíos/día con $`{platform}`/mes de costo de plataforma: ${costPerMeeting} por reunión. Si el tamaño de tu trato es <$5K, esto es caro. Si el tamaño de tu trato es >$20K, es razonable."
/>

**El punto de equilibrio:** Las plataformas SDR IA tienen sentido económico cuando:

- Tamaño de trato > $10K (el costo por reunión es <10% del valor del trato)
- Volumen > 150 contactos/día (el ahorro de tiempo justifica el costo)
- Tasa de cierre > 15% (suficientes tratos para cubrir el costo de la plataforma)

Por debajo de esos umbrales, el stack DIY gana en economía.

---

## Casos de estudio reales: tres fundadores, tres caminos

<SlideNavigation>
<Slide title="Caso de estudio A: Fundador SaaS (AiSDR)">

**Perfil:**

- SaaS B2B, $15K ACV
- 100 contactos/día
- $750/mes para AiSDR

**Resultados (Mes 3):**

- 12 reuniones/mes
- 5-6% de tasa de respuesta
- 2 tratos cerrados ($30K ARR)
- Costo por reunión: $62.50
- Inversión de tiempo: 4 horas/mes

**Veredicto:** "Vale la pena para mí. Solo el manejo de respuestas me ahorra 30 min/día. Cerré 2 tratos en el Mes 3 que pagaron los próximos 4 meses. Pero el Mes 1 fue duro — casi lo abandono."

**Factor clave de éxito:** El alto tamaño de trato ($15K) significó que el costo por reunión fue <5% del valor del trato.

</Slide>

<Slide title="Caso de estudio B: Dueño de agencia (Salesforge)">

**Perfil:**

- Agencia de marketing, retainers de $3K/mes
- 75 contactos/día
- $80/mes para Salesforge

**Resultados (Mes 3):**

- 8 reuniones/mes
- 4-5% de tasa de respuesta
- 3 clientes firmados ($9K/mes recurrente)
- Costo por reunión: $10
- Inversión de tiempo: 6 horas/mes

**Veredicto:** "La mejor herramienta por ROI que he usado. Es básicamente un stack DIY con asistencia de IA. Aún escribo la mayoría de los correos, pero la investigación de IA y el borrador de respuestas me ahorran 20 min/día. A $80/mes, es obvio."

**Factor clave de éxito:** Bajo costo + alto control = sostenible para tamaños de trato más pequeños.

</Slide>

<Slide title="Caso de estudio C: Consultor (Stack DIY)">

**Perfil:**

- Consultoría estratégica, proyectos de $20K
- 50 contactos/día
- $150/mes para stack DIY (Instantly + Apollo + ChatGPT)

**Resultados (Mes 3):**

- 10 reuniones/mes
- 6-7% de tasa de respuesta
- 2 compromisos firmados ($40K)
- Costo por reunión: $15
- Inversión de tiempo: 8 horas/mes

**Veredicto:** "Probé AiSDR por un mes. Volví al DIY. A mi volumen (50/día), la IA no ahorraba suficiente tiempo para justificar $750/mes. Prefiero invertir 30 minutos extra escribiendo correos que suenen exactamente como yo."

**Factor clave de éxito:** Bajo volumen + alta necesidad de personalización = stack DIY es óptimo.

</Slide>
</SlideNavigation>

<StrategyDuel
title="Plataforma SDR IA vs. stack DIY"
persistKey="autonomous-sdr-L5-duel"
scenario="Eres un fundador en solitario con $300K ARR, $10K ACV, 100 contactos/día."
strategyA={{
    name: "Plataforma SDR IA ($750/mes)",
    description: "Usar AiSDR para automatización completa con revisión humana",
    pros: [
      "Ahorra 30-45 min/día en investigación y gestión de respuestas",
      "Mejor coordinación multicanal",
      "Auto-clasificación de respuestas",
      "10-12 reuniones/mes (vs 8-10 con DIY)"
    ],
    cons: [
      "5 veces más caro ($750 vs $150/mes)",
      "30 días de arranque antes de ver resultados",
      "Requiere supervisión diaria (15 min)",
      "La consistencia de voz requiere ajuste constante"
    ]
  }}
strategyB={{
    name: "Stack DIY ($150/mes)",
    description: "Instantly + Apollo + ChatGPT con orquestación manual",
    pros: [
      "5 veces más barato ($150 vs $750/mes)",
      "Control total sobre voz y mensajes",
      "Sin riesgo de dependencia de proveedor",
      "8-10 reuniones/mes (resultado comparable)"
    ],
    cons: [
      "Requiere 45-60 min/día de trabajo manual",
      "La gestión de respuestas es manual (30 min/día)",
      "La coordinación multicanal es compleja",
      "Más difícil de escalar más de 150 contactos/día"
    ]
  }}
expertVerdict="Para este escenario: **gana el stack DIY**. A 100 contactos/día con $10K ACV, las 2 reuniones extra al mes del SDR IA no justifican los $600/mes de diferencia de costo. Ahorra el dinero. Invierte el tiempo ahorrado en un mejor targeting del ICP."
/>

---

## El marcador "¿Está funcionando?"

Después de 60-90 días con una plataforma SDR IA, evalúa usando este marcador:

<InteractiveChecklist
title="Criterios de éxito de la plataforma SDR IA (revisión de 60 días)"
persistKey="autonomous-sdr-L5-scorecard"
items={[
"Reuniones/mes ≥ 8 (producción mínima viable)",
"Costo por reunión < (Tamaño de trato × Tasa de cierre × 10%)",
"Tasa de respuesta ≥ 4% (la plataforma funciona)",
"Tasa de respuesta positiva ≥ 1% (el targeting es bueno)",
"Tiempo de supervisión del fundador < 5 horas/mes",
"Cero incidentes de daño de marca (sin envíos vergonzosos)",
"Tasa de mala clasificación de respuestas < 5%",
"ROI de la plataforma positivo (ingresos de tratos cerrados > costo de plataforma)",
"Recomendarías esta plataforma a otro fundador en solitario",
"NO estás pensando constantemente en volver al DIY"
]}
/>

**Puntuación:**

- **8-10 marcadas:** La plataforma funciona. Mantenla.
- **5-7 marcadas:** La plataforma es marginal. Considera cambiar a DIY o alternativa más barata.
- **&lt;5 marcadas:** La plataforma no funciona. Cambia a stack DIY.

<RangeSlider 
  label="¿Cuántos de estos criterios cumple tu sistema actual?" 
  min={0} 
  max={10} 
  lowLabel="0-2 (con dificultades)" 
  highLabel="8-10 (funcionando bien)" 
  persistKey="autonomous-sdr-L5-current-score" 
/>

---

## El marco de decisión: ¿DEBERÍAS usar una plataforma SDR IA?

<DecisionTree
title="Árbol de decisión: Plataforma SDR IA vs. Stack DIY"
persistKey="autonomous-sdr-L5-decision-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Cuál es tu volumen diario de outreach?",
choices: [
{ label: "<75 contactos/día", nextNodeId: "low-volume" },
{ label: "75-150 contactos/día", nextNodeId: "medium-volume" },
{ label: ">150 contactos/día", nextNodeId: "high-volume" }
]
},
{
id: "low-volume",
content: "A <75 contactos/día, ¿cuál es tu tamaño promedio de trato?",
choices: [
{ label: "<$5K", nextNodeId: "low-vol-low-deal" },
{ label: "$5K-$20K", nextNodeId: "low-vol-med-deal" },
{ label: ">$20K", nextNodeId: "low-vol-high-deal" }
]
},
{
id: "low-vol-low-deal",
content: "**Recomendación: Stack DIY**\n\nA <75 contactos/día con tratos <$5K, las plataformas SDR IA no justifican su costo. Usa Instantly + Apollo + ChatGPT por $150/mes. Obtendrás el 80-90% del resultado al 20% del costo.",
isTerminal: true,
outcome: "neutral"
},
{
id: "low-vol-med-deal",
content: "**Recomendación: Stack DIY o Salesforge**\n\nA este volumen y tamaño de trato, empieza con DIY ($150/mes). Si gastas >1 hora/día en outreach, considera Salesforge ($80/mes) para asistencia de IA sin el alto costo.",
isTerminal: true,
outcome: "neutral"
},
{
id: "low-vol-high-deal",
content: "**Recomendación: Considera AiSDR**\n\nCon tratos >$20K, el costo por reunión de AiSDR ($750/mes) es <5% del valor del trato. El ahorro de tiempo (30-45 min/día) puede valer la pena. Prueba por 90 días.",
isTerminal: true,
outcome: "positive"
},
{
id: "medium-volume",
content: "A 75-150 contactos/día, ¿cuánto tiempo gastas en outreach diariamente?",
choices: [
{ label: "<1 hora/día", nextNodeId: "med-vol-efficient" },
{ label: "1-2 horas/día", nextNodeId: "med-vol-moderate" },
{ label: ">2 horas/día", nextNodeId: "med-vol-heavy" }
]
},
{
id: "med-vol-efficient",
content: "**Recomendación: Stack DIY**\n\nYa eres eficiente. No arregles lo que no está roto. Ahorra los $600-750/mes e invierte en mejor targeting o contenido.",
isTerminal: true,
outcome: "neutral"
},
{
id: "med-vol-moderate",
content: "**Recomendación: Prueba Salesforge o AiSDR**\n\nEstás en el punto ideal donde las plataformas SDR IA pueden ahorrar 30-45 min/día. Empieza con Salesforge ($80/mes) por 60 días. Si lo maxas, actualiza a AiSDR ($750/mes).",
isTerminal: true,
outcome: "positive"
},
{
id: "med-vol-heavy",
content: "**Recomendación: AiSDR o Artisan**\n\nEstás gastando demasiado tiempo en outreach. Una plataforma SDR IA te ahorrará 1-1.5 horas/día. A tu volumen, eso vale $750-2000/mes. Prueba AiSDR primero (más barato).",
isTerminal: true,
outcome: "positive"
},
{
id: "high-volume",
content: "A >150 contactos/día, estás más allá del territorio DIY del fundador en solitario. ¿Cuál es tu presupuesto mensual de herramientas?",
choices: [
{ label: "<$500/mes", nextNodeId: "high-vol-budget" },
{ label: "$500-$2000/mes", nextNodeId: "high-vol-mid" },
{ label: ">$2000/mes", nextNodeId: "high-vol-premium" }
]
},
{
id: "high-vol-budget",
content: "**Recomendación: Salesforge + orquestación manual**\n\nNecesitas automatización pero no puedes pagar plataformas premium. Usa Salesforge ($160/mes plan Growth) + orquestación pesada con Zapier. No es perfecto pero es sostenible.",
isTerminal: true,
outcome: "neutral"
},
{
id: "high-vol-mid",
content: "**Recomendación: AiSDR**\n\nA este volumen y presupuesto, AiSDR ($750/mes) es el mejor valor. Obtienes el 80% de la capacidad de Artisan/11x al 40% del costo. Empieza aquí.",
isTerminal: true,
outcome: "positive"
},
{
id: "high-vol-premium",
content: "**Recomendación: Artisan o 11x**\n\nTienes el presupuesto y el volumen para justificar las plataformas premium. Artisan ($2K/mes) si necesitas prospección integrada. 11x ($5K/mes) si necesitas orquestación de nivel empresarial. Pero honestamente, a esta escala, considera contratar un SDR humano.",
isTerminal: true,
outcome: "positive"
}
]}
/>

---

## Tu plan de acción

<InteractiveChecklist
title="Próximos pasos: Evaluar plataformas SDR IA"
persistKey="autonomous-sdr-L5-actions"
items={[
"Calcula tu costo actual por reunión (costo mensual total ÷ reuniones agendadas)",
"Estima tu volumen diario de outreach (contactos/día en los últimos 30 días)",
"Determina tu tamaño promedio de trato y tasa de cierre",
"Usa el árbol de decisión de arriba para obtener una recomendación de plataforma",
"Si consideras una plataforma SDR IA: solicita una demo y pide una prueba de 30 días",
"Si te quedas con DIY: audita tu stack actual para tareas manuales que consumen tiempo",
"Establece una fecha de revisión a 60 días para evaluar resultados con el marcador de éxito",
"Calcula el valor del 'tiempo ahorrado': (horas ahorradas/semana) × (tu tarifa por hora)",
"Compara el valor del tiempo ahorrado con la diferencia de costo de plataforma (costo SDR IA - costo DIY)",
"Toma una decisión basada en economía, no en hype de marketing"
]}
/>

---

## Resumen: La verdad incómoda

<InsightCard icon="💡" title="La respuesta real">
Para **la mayoría de los fundadores en solitario** (por debajo de $500K ARR, <150 contactos/día, <$10K ACV), un stack DIY bien ejecutado entrega el 80-90% del resultado de una plataforma SDR IA de $750-5000/mes al 10-20% del costo.

Las plataformas SDR IA ganan en **ahorro de tiempo** (30-60 min/día), no en calidad del resultado ni tasas de conversión.

La pregunta no es "¿Funciona?" — sí funciona. La pregunta es: "¿Vale el tiempo ahorrado el costo adicional?"
</InsightCard>

**Cuándo las plataformas SDR IA tienen sentido:**

- Volumen >150 contactos/día
- Tamaño de trato >$10K
- Gastas >2 horas/día en outreach
- El tiempo ahorrado vale >$600/mes para ti

**Cuándo el stack DIY tiene sentido:**

- Volumen <150 contactos/día
- Tamaño de trato <$10K
- Valoras el control de voz y la seguridad de marca
- Eres consciente del presupuesto (<$200/mes en herramientas)

**El camino híbrido (recomendado para la mayoría):**
Empieza con el stack DIY. Agrega Salesforge ($80/mes) para asistencia de IA. Si lo maxas, actualiza a AiSDR ($750/mes). Nunca saltes directamente a plataformas premium sin haber probado primero que el modelo funciona.

Próxima lección: **Modos de fallo** — las 6 formas en que las plataformas SDR IA se rompen y cómo prevenir daños catastróficos a tu marca.
