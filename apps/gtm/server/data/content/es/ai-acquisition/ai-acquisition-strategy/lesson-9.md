---
title: "Economía: Stack de IA vs. SDR Junior"
duration: "45 min"
track: "Adquisición con IA"
course: "Curso 21: Estrategia de Adquisición con IA"
lesson: 9
---

## La Pregunta de los $70K

Estás en $15K MRR. Tu alcance asistido por IA está funcionando — tasa de respuesta del 12%, 3-4 llamadas de descubrimiento por semana, cerrando 1-2 deals al mes. Tus amigos founders siguen preguntando: "¿Cuándo vas a contratar un SDR?"

Las matemáticas parecen simples: un SDR junior cuesta $4-5K/mes. Tu stack de IA cuesta $197/mes. Esa es una diferencia de 20-25 veces.

Pero aquí está lo que nadie te dice: **la comparación real no es $5K vs. $200. Es $7,700-11,425 vs. $400-800.**

Y la comparación de producción? No es lo que esperarías.

<InsightCard icon="💰" title="La Economía Oculta">
La mayoría de los founders comparan el salario base con los costos de herramientas y piensan que contratar es "solo" 20 veces más caro. El multiplicador real es 15-25x cuando incluyes beneficios, impuestos, herramientas, tiempo de gestión, capacitación y costos de rotación. Y eso es antes de considerar el tiempo de rampa y las tasas de cumplimiento de cuota.
</InsightCard>

En esta lección, construirás un modelo económico completo comparando tu stack de IA con la contratación. Al final, conocerás tu punto de equilibrio exacto y cuándo (si acaso) contratar tiene sentido para tu negocio.

---

## El Verdadero Costo de un SDR Junior

Comencemos con lo que realmente cuesta un SDR junior. La mayoría de los founders solo piensan en el salario base. Ese es un error de $40K.

### Verificación de la Realidad de la Compensación Base

<RangeSlider
  label="¿Cuánto crees que cuesta un SDR junior por mes (salario base)?"
  min={2000}
  max={8000}
  step={500}
  lowLabel="$2K/mes"
  highLabel="$8K/mes"
  persistKey="ai-acquisition-strategy-L9-sdr-guess"
/>

**Tasas del Mercado 2025-2026:**

- Salario base de SDR junior: **$40K-55K/año** ($3,300-4,600/mes)
- Con beneficios e impuestos (costo cargado del 20-30%): **$55K-75K/año** ($4,600-6,250/mes)

Pero eso es solo el comienzo.

### El Stack de Costo Completo

<FlipCard
  front="¿Qué más cuesta dinero más allá del salario?"
  back="Herramientas ($200-500/mes), tiempo de gestión (10-15 hrs/mes @ $150/hr = $1,500-2,250), capacitación/incorporación (amortizada $500-1K/mes), costos de reclutamiento (amortizados $300-500/mes), y costos de reemplazo por rotación."
/>

Construyamos el panorama completo:

<TemplateBuilder
title="Calculadora del Costo Real del SDR"
persistKey="ai-acquisition-strategy-L9-sdr-cost"
sections={[
{
id: "compensation",
title: "Compensación y Beneficios",
fields: [
{ id: "base", label: "Salario Base (anual)", placeholder: "45000", type: "number" },
{ id: "benefits", label: "% de Beneficios/Impuestos (típicamente 20-30%)", placeholder: "25", type: "number" }
]
},
{
id: "tools",
title: "Herramientas e Infraestructura",
fields: [
{ id: "toolCost", label: "Costo mensual de herramientas por asiento", placeholder: "350", type: "number", helpText: "SalesLoft/Outreach ($100-150) + Apollo/ZoomInfo ($100-200) + asiento CRM ($50-100) + marcador ($50-100)" }
]
},
{
id: "management",
title: "Gestión y Capacitación",
fields: [
{ id: "mgmtHours", label: "Horas de gestión por mes", placeholder: "12", type: "number" },
{ id: "hourlyRate", label: "Tu tarifa por hora (tiempo del founder)", placeholder: "150", type: "number" },
{ id: "trainingCost", label: "Capacitación/incorporación (amortizada mensualmente)", placeholder: "750", type: "number", helpText: "Primeros 3-6 meses de productividad reducida + tiempo de capacitación" }
]
}
]}
/>

**Benchmarks de la Industria:**

| Categoría de Costo                   | Monto Mensual    | Monto Anual   |
| ------------------------------------ | ---------------- | ------------- |
| Compensación base                    | $3,300-4,600     | $40K-55K      |
| Beneficios/impuestos (25%)           | $825-1,150       | $10K-14K      |
| Herramientas por asiento             | $200-500         | $2,400-6,000  |
| Tiempo de gestión (12 hrs @ $150/hr) | $1,800           | $21,600       |
| Capacitación (amortizada)            | $500-1,000       | $6K-12K       |
| Reclutamiento/rotación (amortizado)  | $300-500         | $3,600-6,000  |
| **TOTAL**                            | **$6,925-9,750** | **$83K-117K** |

<InsightCard icon="⏰" title="El Impuesto del Tiempo de Rampa">
Los datos de Bridge Group muestran que los SDRs junior tardan 3-6 meses en alcanzar plena productividad. Durante ese tiempo, pagas el costo completo por un 30-60% de producción. Considera esto en tus primeros doce meses: realmente estás pagando por 6-9 meses de trabajo productivo, no 12.
</InsightCard>

### Los Costos Invisibles

Más allá de la hoja de cálculo, hay costos que no aparecen en tu P&L:

<InteractiveChecklist
title="Costos Ocultos del SDR"
persistKey="ai-acquisition-strategy-L9-hidden-costs"
items={[
"Cambio de contexto: 10-15 horas/mes de gestión vs construcción del producto",
"Trabajo emocional: gestión del rendimiento, motivación, resolución de conflictos",
"Costo de oportunidad: ¿podrían esas horas de gestión ir a llamadas de ventas de alto valor?",
"Riesgo de mala contratación: 6 meses de costo + reiniciar el proceso de reclutamiento",
"Desafíos de ajuste cultural: la primera contratación marca el tono para el equipo futuro",
"Cumplimiento y RRHH: derecho laboral, administración de beneficios, documentación de rendimiento"
]}
/>

**La Realidad de la Rotación:**

- Permanencia promedio del SDR: **14-18 meses** (Bridge Group, Bravado)
- Cumplimiento promedio de cuota: **~60%** (SalesHacker)
- Porcentaje que cumple consistentemente la cuota: **~40%**

Esto significa que hay una probabilidad del 60% de que tu primera contratación de SDR tenga un rendimiento inferior, y una probabilidad del 50%+ de que se vaya en 18 meses.

---

## El Verdadero Costo de Tu Stack de IA

Ahora calculemos lo que realmente gastas en adquisición potenciada por IA.

### Costos Directos de Herramientas

<TemplateBuilder
title="El Costo de Tu Stack de IA"
persistKey="ai-acquisition-strategy-L9-ai-cost"
sections={[
{
id: "tools",
title: "Stack de Herramientas Actual",
fields: [
{ id: "apollo", label: "Apollo.io", placeholder: "49", type: "number" },
{ id: "instantly", label: "Instantly.ai / Smartlead", placeholder: "37", type: "number" },
{ id: "salesNav", label: "LinkedIn Sales Navigator", placeholder: "80", type: "number" },
{ id: "chatgpt", label: "ChatGPT Plus / Claude Pro", placeholder: "20", type: "number" },
{ id: "verification", label: "Verificación de email (amortizada)", placeholder: "4", type: "number" },
{ id: "automation", label: "Zapier / Make", placeholder: "7", type: "number" },
{ id: "chatbot", label: "Chatbase / Tidio (opcional)", placeholder: "19", type: "number" },
{ id: "other", label: "Otras herramientas", placeholder: "0", type: "number" }
]
}
]}
/>

**Stacks de Referencia:**

| Nivel del Stack | Herramientas                                 | Costo Mensual |
| --------------- | -------------------------------------------- | ------------- |
| **Esencial**    | Apollo Básico + Instantly + ChatGPT          | $106          |
| **Recomendado** | Esencial + Sales Nav + Verificación + Zapier | $197          |
| **Extendido**   | Recomendado + Chatbase + Clay Explorer       | $365          |

### Tu Inversión de Tiempo

El stack de IA no es gratuito — requiere tu tiempo. Pero la proporción es dramáticamente diferente a gestionar un SDR.

<RangeSlider
  label="Horas por semana que gastas en adquisición asistida por IA"
  min={2}
  max={15}
  step={1}
  lowLabel="2 hrs/semana"
  highLabel="15 hrs/semana"
  persistKey="ai-acquisition-strategy-L9-time-investment"
/>

**Desglose de Tiempo Típico (5-7 horas/semana):**

- Investigación y construcción de lista: 90 min
- Revisión y edición de personalización: 60 min
- Seguimientos y secuencias: 45 min
- Llamadas de descubrimiento: 90 min
- Métricas y optimización: 45 min

**Costo de tiempo mensual total:** 20-28 horas @ $150/hr = **$3,000-4,200**

Pero aquí está la diferencia clave: **este tiempo es trabajo del founder de alto apalancamiento** — estás hablando con clientes, aprendiendo sobre el mercado, refinando el posicionamiento. Gestionar un SDR es pura sobrecarga.

<ComparisonBuilder
title="Comparación de Calidad del Tiempo"
persistKey="ai-acquisition-strategy-L9-time-quality"
prompt="Describe lo que realmente haces durante tus 5-7 horas de adquisición asistida por IA"
expertExample="Paso 90 minutos investigando prospectos de alto ajuste y aprendiendo sobre sus desafíos. Otros 90 minutos en llamadas de descubrimiento donde valido el posicionamiento y recopilo retroalimentación del producto. El resto es revisar la personalización generada por IA y optimizar secuencias basadas en datos de respuesta. Cada hora me enseña algo sobre el mercado."
criteria={[
"Tiempo de interacción directa con el cliente",
"Aprendizaje del mercado y generación de insights",
"Toma de decisiones estratégicas vs. ejecución táctica",
"Desarrollo de habilidades que se acumulan con el tiempo"
]}
/>

### Configuración y Mantenimiento

<FlipCard
  front="¿Costo de configuración único?"
  back="20-40 horas para configurar herramientas, construir secuencias iniciales, crear plantillas y establecer flujos de trabajo. Amortizado en 12 meses = ~2-3 horas/mes equivalente."
/>

**Mantenimiento Continuo:**

- Optimización semanal: 30-60 min
- Actualizaciones mensuales de herramientas: 30 min
- Revisión estratégica trimestral: 2 horas

**Mantenimiento mensual total:** ~4-6 horas

---

## Comparación de Producción: ¿Qué Obtienes Realmente?

Aquí es donde la economía se vuelve interesante. Comparemos lo que produce un SDR junior vs. lo que produces tú con un stack de IA.

### Producción del SDR Junior (Benchmarks de la Industria)

<ExampleCard label="Rendimiento Típico del SDR Junior">
**Mes 1-3 (Rampa):**
- Emails enviados: 200-400/mes
- Tasa de respuesta: 3-8%
- Conversaciones: 8-20/mes
- Reuniones reservadas: 4-10/mes
- Pipeline creado: $15K-40K

**Mes 4-12 (Plena Productividad):**

- Emails enviados: 800-1,200/mes
- Tasa de respuesta: 5-12%
- Conversaciones: 40-80/mes
- Reuniones reservadas: 15-30/mes
- Pipeline creado: $60K-150K

**Verificación de Realidad:** Solo el 60% de los SDRs alcanza estos números consistentemente.
</ExampleCard>

### Producción del Founder Solitario + Stack de IA

<ExampleCard label="Rendimiento Típico del Founder Solitario + IA">
**Mes 1-2 (Aprendizaje):**
- Emails enviados: 300-600/mes
- Tasa de respuesta: 5-15% (mejor segmentación)
- Conversaciones: 15-45/mes
- Reuniones reservadas: 8-20/mes
- Pipeline creado: $30K-80K

**Mes 3-6 (Optimizado):**

- Emails enviados: 600-1,000/mes
- Tasa de respuesta: 8-18%
- Conversaciones: 48-120/mes
- Reuniones reservadas: 20-40/mes
- Pipeline creado: $80K-200K

**Diferencia Clave:** Tasas de respuesta más altas debido a mejor segmentación y credibilidad del founder. Menor volumen pero mayor calidad.
</ExampleCard>

<InsightCard icon="🎯" title="La Paradoja Calidad vs. Cantidad">
Los SDRs optimizan para volumen. Los founders optimizan para conversión. Un founder enviando 500 emails altamente segmentados a menudo supera a un SDR enviando 1,200 genéricos. El stack de IA amplifica la calidad del founder a escala de SDR.
</InsightCard>

### La Ventaja de Conversión

Esto es lo que muestran los datos sobre el alcance liderado por el founder:

<SlideNavigation>
<Slide title="Ventaja en Tasa de Respuesta">
**Alcance liderado por founder:** 8-18% de tasa de respuesta
**Alcance del SDR:** 5-12% de tasa de respuesta

¿Por qué? Los founders pueden:

- Hablar con autoridad sobre la visión del producto
- Tomar decisiones en tiempo real sobre precios/alcance
- Construir relaciones genuinas, no solo reservar reuniones
- Aprovechar la marca personal y la credibilidad
  </Slide>

<Slide title="Ventaja Reunión→Cierre">
**Llamadas de descubrimiento del founder:** 25-40% de tasa de cierre
**Reuniones reservadas por SDR:** 15-25% de tasa de cierre

¿Por qué? Los founders:

- Califican mejor (conocen el producto profundamente)
- Pueden cambiar el posicionamiento en tiempo real
- Construyen confianza más rápido (tomador de decisiones en la llamada)
- Recopilan mejor retroalimentación del producto
  </Slide>

<Slide title="Ventaja en Tamaño de Deal">
**Deals cerrados por founder:** A menudo un 20-50% más grandes
**Deals originados por SDR:** Tienden hacia el extremo inferior del rango

¿Por qué? Los founders pueden:

- Hacer upsell basado en profundo conocimiento del producto
- Personalizar soluciones en el momento
- Construir asociaciones estratégicas, no solo transacciones
  </Slide>
  </SlideNavigation>

---

## El Modelo Económico: Comparación Lado a Lado

Construyamos tu modelo de comparación completo.

<ScenarioSimulator
title="Economía SDR vs. Stack de IA"
persistKey="ai-acquisition-strategy-L9-economics"
levers={[
{ id: "mrr", label: "MRR Actual", min: 5000, max: 100000, step: 5000, defaultValue: 15000, unit: "$" },
{ id: "aiStackCost", label: "Costo Mensual del Stack de IA", min: 100, max: 500, step: 50, defaultValue: 197, unit: "$" },
{ id: "aiHours", label: "Tus Horas/Semana en Adquisición", min: 3, max: 15, step: 1, defaultValue: 6, unit: " hrs" },
{ id: "hourlyRate", label: "Tu Tarifa por Hora", min: 100, max: 300, step: 25, defaultValue: 150, unit: "$" },
{ id: "sdrBaseSalary", label: "Salario Base del SDR (anual)", min: 35000, max: 65000, step: 5000, defaultValue: 45000, unit: "$" },
{ id: "sdrToolCost", label: "Costo de Herramientas del SDR/Mes", min: 200, max: 600, step: 50, defaultValue: 350, unit: "$" }
]}
outputs={[
{ id: "aiTotalCost", label: "Costo Mensual Total del Stack de IA", formula: "aiStackCost + (aiHours * 4.33 * hourlyRate)", unit: "$", precision: 0 },
{ id: "sdrTotalCost", label: "Costo Mensual Total del SDR", formula: "(sdrBaseSalary * 1.25 / 12) + sdrToolCost + (12 * hourlyRate) + 750", unit: "$", precision: 0 },
{ id: "costRatio", label: "Ratio Costo SDR / Costo IA", formula: "sdrTotalCost / aiTotalCost", unit: "x", precision: 1 },
{ id: "breakeven", label: "MRR de Equilibrio (para justificar SDR)", formula: "sdrTotalCost * 6", unit: "$", precision: 0 }
]}
insight="Con tu MRR actual de $`{mrr}`, el stack de IA cuesta ${aiTotalCost}/mes vs. ${sdrTotalCost}/mes para un SDR — una diferencia de {costRatio}x. Necesitarías alcanzar ~$`{breakeven}` de MRR antes de que la economía de contratar tenga sentido (asumiendo que el SDR puede generar 6 veces su costo en pipeline)."
/>

### El Marco de Equilibrio

¿Cuándo tiene sentido económico contratar un SDR?

<TemplateBuilder
title="Calculadora de Equilibrio para Contratar SDR"
persistKey="ai-acquisition-strategy-L9-breakeven"
sections={[
{
id: "current",
title: "Estado Actual",
fields: [
{ id: "currentMRR", label: "MRR Actual", placeholder: "15000", type: "number" },
{ id: "aiPipeline", label: "Pipeline mensual del stack de IA", placeholder: "80000", type: "number" },
{ id: "aiCost", label: "Costo total del stack de IA (herramientas + tiempo)", placeholder: "4000", type: "number" }
]
},
{
id: "sdr",
title: "Proyección del SDR",
fields: [
{ id: "sdrCost", label: "Costo mensual total del SDR", placeholder: "8500", type: "number" },
{ id: "sdrPipeline", label: "Pipeline mensual esperado del SDR (después de la rampa)", placeholder: "100000", type: "number" },
{ id: "rampMonths", label: "Meses para plena productividad", placeholder: "4", type: "number" }
]
}
]}
/>

**La Regla General:**

No contrates un SDR hasta que:

1. **MRR > $30K** (puedes permitirte el riesgo)
2. **El pipeline de IA está al máximo** (estás en capacidad con el sistema actual)
3. **El tiempo del founder es el cuello de botella** (no la segmentación, los mensajes, o la conversión)
4. **Tienes 10+ horas/semana** para gestionarlos efectivamente
5. **Has documentado tu playbook** (para que puedan ejecutarlo)

<InsightCard icon="🚀" title="El Futuro Híbrido">
El mejor resultado no es "IA vs. SDR." Es "IA + SDR." Cuando contrates, heredarán el stack de IA que construiste. Tus $197/mes en herramientas se convierten en su multiplicador de fuerza. Pueden enfocarse en conversaciones de alto contacto mientras la IA maneja la investigación, personalización y seguimiento. Un SDR bien equipado con tu playbook de IA puede superar a 2-3 SDRs tradicionales.
</InsightCard>

---

## El ROI Invisible: Lo Que Aprendes

Hay una ventaja masiva del enfoque asistido por IA que no aparece en ninguna hoja de cálculo: **el aprendizaje del mercado.**

<FlipCard
  front="¿Qué aprendes haciendo tu propio alcance asistido por IA?"
  back="Qué segmentos convierten mejor. Qué mensajes resuenan. Qué objeciones surgen. Qué características importan más. Qué precio es aceptable. Qué competidores se mencionan. Qué puntos de dolor son urgentes vs. agradables de tener. Esta inteligencia vale 10 veces lo que pagas a un SDR."
/>

### La Curva de Aprendizaje del Founder

<ProgressiveReveal title="Lo Que 6 Meses de Alcance Asistido por IA Te Enseñan" persistKey="ai-acquisition-strategy-L9-learning">
<RevealSection title="Meses 1-2: Claridad de Segmentación">
Descubres qué segmentos de ICP realmente responden. Tu hipótesis inicial era "agencias con 10-50 empleados." La realidad: las agencias con 20-35 empleados en verticales específicas (e-commerce, SaaS) responden 3 veces más. No aprenderías esto si un SDR estuviera haciendo el alcance.
</RevealSection>

<RevealSection title="Meses 3-4: Refinamiento de Mensajes">
Pruebas 5 propuestas de valor diferentes. "Ahorra 10 horas/semana" obtiene el 6% de respuestas. "Reduce la rotación de clientes un 15%" obtiene el 14% de respuestas. Cambias todo tu posicionamiento basado en datos de conversación reales. Un SDR solo ejecutaría el guion que le diste.
</RevealSection>

<RevealSection title="Meses 5-6: Señales de Ajuste Producto-Mercado">
Notas que los prospectos siguen preguntando sobre una característica que no tienes. Tres conversaciones separadas mencionan la misma necesidad de integración. La construyes. Se convierte en tu diferenciador #1. Este insight llegó al estar en las conversaciones, no al leer resúmenes de llamadas del SDR.
</RevealSection>
</ProgressiveReveal>

**El Efecto Compuesto:**

Cada conversación te hace mejor en:

- Posicionamiento
- Manejo de objeciones
- Priorización de características
- Estrategia de precios
- Diferenciación competitiva

Un SDR aprende a reservar reuniones. Tú aprendes a construir un mejor negocio.

---

## Casos de Estudio del Mundo Real

Veamos tres founders que tomaron decisiones diferentes.

<SlideNavigation>
<Slide title="Caso 1: La Contratación Prematura">
**Sarah, B2B SaaS, $12K MRR**

Contrató un SDR con $12K MRR porque "todos dijeron que lo hiciera."

**Resultados:**

- Meses 1-3: SDR en rampa, $0 pipeline
- Meses 4-6: $40K pipeline creado, 2 deals cerrados ($8K)
- Mes 7: El SDR renunció por una empresa más grande
- Costo total: $51K (6 meses × $8.5K)
- Ingresos totales: $8K
- **ROI: -84%**

**Lección:** Contratar demasiado pronto significó quemar efectivo durante la rampa sin red de seguridad. El SDR se fue justo cuando se volvió productivo.
</Slide>

<Slide title="Caso 2: El Enfoque IA Primero">
**Marcus, Founder Técnico, $18K MRR**

Construyó stack de IA en lugar de contratar.

**Resultados:**

- Meses 1-2: $30K pipeline (fase de aprendizaje)
- Meses 3-6: $80-120K pipeline/mes
- Meses 7-12: $150K+ pipeline/mes
- Costo total: $197/mes herramientas + ~$3.5K/mes tiempo = $4K/mes
- Costo en 12 meses: $48K
- Ingresos generados: $180K (15 deals @ $12K promedio)
- **ROI: +275%**

**Lección:** Permaneció ágil, aprendió el mercado, escaló gradualmente. Alcanzó $45K MRR antes de considerar contratar.
</Slide>

<Slide title="Caso 3: El Modelo Híbrido">
**Jen, Founder-Creator, $35K MRR**

Usó stack de IA durante 8 meses, luego contrató SDR para ejecutar su playbook probado.

**Resultados:**

- Meses 1-8 (solo IA): Construyó hasta $35K MRR, documentó el playbook
- Mes 9: Contrató SDR, le dio stack de IA + playbook
- Meses 10-12: SDR generó $200K pipeline usando el sistema del founder
- Costo del SDR: $8K/mes
- Producción del SDR + stack de IA: 2.5x el rendimiento típico del SDR
- **ROI: El SDR se pagó solo en el Mes 10**

**Lección:** El enfoque IA primero creó un playbook que valía la pena copiar. Cuando contrató, el SDR tenía un sistema probado que ejecutar.
</Slide>
</SlideNavigation>

---

## Marco de Decisión: ¿Deberías Contratar?

Construyamos tu modelo de decisión personalizado.

<DecisionTree
title="¿Deberías Contratar un SDR?"
persistKey="ai-acquisition-strategy-L9-decision"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Cuál es tu MRR actual?",
choices: [
{ label: "Menos de $20K", nextNodeId: "too-early" },
{ label: "$20K-40K", nextNodeId: "check-pipeline" },
{ label: "Más de $40K", nextNodeId: "check-capacity" }
]
},
{
id: "too-early",
content: "Con menos de $20K MRR, enfócate en ventas lideradas por founder asistidas por IA. Necesitas el aprendizaje del mercado y no puedes permitirte el riesgo de una mala contratación.",
isTerminal: true,
outcome: "negative",
recommendation: "Construye tu stack de IA. Reconsidera contratar con $30K+ MRR."
},
{
id: "check-pipeline",
content: "¿Tu pipeline asistido por IA genera consistentemente 3-5 veces tu objetivo de ingresos mensuales?",
choices: [
{ label: "Sí, el pipeline es sólido", nextNodeId: "check-capacity" },
{ label: "No, el pipeline es inconsistente", nextNodeId: "fix-pipeline" }
]
},
{
id: "fix-pipeline",
content: "No contrates para solucionar un problema de pipeline. Un SDR solo ejecutará un sistema roto más rápido. Primero arregla la segmentación, los mensajes y la conversión.",
isTerminal: true,
outcome: "negative",
recommendation: "Optimiza tu stack de IA y playbook antes de contratar."
},
{
id: "check-capacity",
content: "¿Estás rechazando conversaciones calificadas porque no tienes tiempo?",
choices: [
{ label: "Sí, estoy en capacidad máxima", nextNodeId: "check-playbook" },
{ label: "No, puedo manejar más", nextNodeId: "not-yet" }
]
},
{
id: "not-yet",
content: "Si tienes capacidad, sigue haciendo ventas lideradas por founder. El aprendizaje del mercado es invaluable y tus tasas de conversión probablemente son más altas de lo que serían las de un SDR.",
isTerminal: true,
outcome: "neutral",
recommendation: "Escala tu stack de IA. Contrata cuando estés verdaderamente en capacidad."
},
{
id: "check-playbook",
content: "¿Tienes un playbook documentado y repetible que un SDR podría ejecutar?",
choices: [
{ label: "Sí, está documentado", nextNodeId: "ready-to-hire" },
{ label: "No, está todo en mi cabeza", nextNodeId: "document-first" }
]
},
{
id: "document-first",
content: "Documenta tu playbook primero. Un SDR no puede replicar lo que no has sistematizado. Pasa 2-4 semanas creando: definiciones de ICP, plantillas de secuencias, guiones de manejo de objeciones, marcos de llamadas de descubrimiento.",
isTerminal: true,
outcome: "neutral",
recommendation: "Documenta el playbook, luego contrata en 30-60 días."
},
{
id: "ready-to-hire",
content: "Estás listo. Tienes los ingresos, el pipeline, la restricción de capacidad y el playbook. Contrata un SDR y dale tu stack de IA como su multiplicador de fuerza.",
isTerminal: true,
outcome: "positive",
recommendation: "Empieza a reclutar. Presupuesta $8-10K/mes total. Espera 3-6 meses de rampa."
}
]}
/>

---

## Tu Modelo Económico

Construyamos tu hoja de comparación personalizada — el artefacto final de esta lección.

<TemplateBuilder
title="Mi Modelo de Economía SDR vs. IA"
persistKey="ai-acquisition-strategy-L9-final-model"
sections={[
{
id: "current",
title: "Estado Actual (Stack de IA)",
fields: [
{ id: "mrr", label: "MRR Actual", placeholder: "15000", type: "number" },
{ id: "toolCost", label: "Costo mensual de herramientas", placeholder: "197", type: "number" },
{ id: "weeklyHours", label: "Horas/semana en adquisición", placeholder: "6", type: "number" },
{ id: "hourlyRate", label: "Tu tarifa por hora", placeholder: "150", type: "number" },
{ id: "monthlyPipeline", label: "Pipeline mensual creado", placeholder: "80000", type: "number" },
{ id: "monthlyDeals", label: "Deals cerrados/mes", placeholder: "2", type: "number" }
]
},
{
id: "sdr",
title: "Proyección del SDR",
fields: [
{ id: "sdrBase", label: "Salario base del SDR (anual)", placeholder: "45000", type: "number" },
{ id: "sdrTools", label: "Costo de herramientas del SDR/mes", placeholder: "350", type: "number" },
{ id: "mgmtHours", label: "Horas de gestión/mes", placeholder: "12", type: "number" },
{ id: "expectedPipeline", label: "Pipeline mensual esperado del SDR (post-rampa)", placeholder: "100000", type: "number" },
{ id: "rampMonths", label: "Tiempo de rampa (meses)", placeholder: "4", type: "number" }
]
},
{
id: "decision",
title: "Criterios de Decisión",
fields: [
{ id: "targetMRR", label: "Objetivo de MRR para considerar contratar", placeholder: "30000", type: "number" },
{ id: "cashReserve", label: "Meses de runway con los que te sientes cómodo", placeholder: "12", type: "number" },
{ id: "hireDate", label: "Fecha proyectada de contratación (si aplica)", placeholder: "Q3 2026", type: "text" }
]
}
]}
/>

### Tu Plan de Acción

Basado en tus entradas, aquí está tu recomendación personalizada:

<InteractiveChecklist
title="Mi Hoja de Ruta para Contratar SDR"
persistKey="ai-acquisition-strategy-L9-roadmap"
items={[
"Calcula mi verdadero costo del stack de IA (herramientas + tiempo) y compara con el costo total del SDR",
"Rastrea métricas de pipeline y conversión mensuales durante los próximos 90 días",
"Documenta mi playbook actual (secuencias, guiones, manejo de objeciones)",
"Establece un 'disparador de contratación' claro (umbral de MRR + restricción de capacidad)",
"Construye un modelo financiero de 6 meses mostrando la rampa y el equilibrio del SDR",
"Si contrataré pronto: redacta la descripción del puesto y tarjeta de puntuación de entrevistas",
"Si no contrataré: optimiza el stack de IA para aumentar la producción un 30-50%",
"Reconsidera esta decisión trimestralmente a medida que cambien el MRR y la capacidad"
]}
/>

---

## Resumen: La Realidad Económica

Repasemos los insights clave:

<InsightCard icon="📊" title="Los Números Reales">
**Stack de IA:** $100-500/mes herramientas + 5-7 hrs/semana tiempo del founder = $400-800/mes total

**SDR Junior:** $4-6K salario + $1-2K beneficios/impuestos + $200-500 herramientas + $1.5-2.5K tiempo de gestión + $500-1K capacitación = $7,700-11,425/mes total

**Ratio de Costo:** Diferencia de 15-25x, no la 20x que asumen la mayoría de los founders
</InsightCard>

<InsightCard icon="🎯" title="La Realidad de la Producción">
**Stack de IA (Liderado por Founder):**
- Tasas de respuesta más altas (8-18% vs. 5-12%)
- Mejor calificación (el founder conoce el producto)
- Iteración más rápida (sin lag de comunicación)
- Aprendizaje del mercado acumulado

**SDR:**

- Mayor volumen (después de la rampa)
- Libera tiempo del founder (si se gestiona bien)
- Escalable (puedes contratar más)
- Requiere playbook probado para tener éxito
  </InsightCard>

<InsightCard icon="💡" title="La Decisión Estratégica">
**Usa Stack de IA Cuando:**
- MRR < $30K
- Aún aprendiendo mercado/posicionamiento
- El pipeline es inconsistente
- El playbook no está documentado
- Quieres preservar efectivo

**Contrata SDR Cuando:**

- MRR > $30K
- El pipeline está probado y es consistente
- Estás en capacidad (rechazando llamadas)
- El playbook está documentado
- 10+ horas/semana para gestionar efectivamente
  </InsightCard>

La respuesta correcta no es "IA vs. SDR para siempre." Es "IA primero, luego IA + SDR cuando la economía y la capacidad lo justifiquen."

La mayoría de los founders solitarios deberían planear ejecutar ventas lideradas por founder asistidas por IA hasta $30-50K MRR, luego contratar un SDR para ejecutar el playbook que han probado.

**Próxima Lección:** Tomaremos todo lo que has aprendido en las 9 lecciones y construiremos tu Blueprint Completo del Sistema de Adquisición con IA — el playbook maestro que une estrategia, herramientas, flujos de trabajo y economía en un sistema ejecutable único.
