---
title: "Agente de Puntuación de Ajuste de ICP (Modelo 1-10)"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 6
---

Enriqueciste 400 leads. Direcciones de email verificadas. Datos de empresa descargados. Tech stacks mapeados.

¿Y ahora qué?

**No puedes revisar manualmente 400 prospectos.** No tienes tiempo. Y aunque lo tuvieras, tu puntuación intuitiva sería inconsistente — el prospecto número 47 recibe un "quizás" el lunes por la mañana, pero el mismo perfil recibe un "no" el viernes por la tarde cuando estás agotado.

Aquí es donde la mayoría de los founders solo fracasan. Tratan a todos los leads igual. Envían la misma secuencia a todos. Se preguntan por qué las tasas de respuesta son del 2% en lugar del 12%.

**La solución:** Un agente de IA que evalúa cada prospecto en 3 segundos, asigna una puntuación del 1 al 10, y los enruta a la acción correcta.

En esta lección, construirás ese agente.

---

## El Problema de la Puntuación (Y Por Qué Los Humanos Fallan)

Hagamos una prueba rápida.

<RangeSlider 
  label="¿Cuánto tiempo te toma puntuar un prospecto manualmente ahora mismo?" 
  min={0} 
  max={10} 
  lowLabel="0 min (no puntúo)" 
  highLabel="10+ min" 
  persistKey="ai-lead-research-L6-manual-time" 
/>

Si respondiste algo por encima de 2 minutos, estás gastando demasiado tiempo. Si respondiste 0, estás desperdiciando dinero en malos leads.

**Los datos son brutales:**

- La puntuación manual toma entre 2 y 5 minutos por lead (estimaciones de profesionales)
- Solo el 25% de los leads de marketing están realmente listos para la venta (Gleanster Research)
- Las empresas con lead scoring convierten entre un 20% y un 30% más de leads (Forrester/HubSpot)
- La puntuación basada en IA es entre un 40% y un 60% más precisa que los sistemas basados en reglas para conjuntos de datos pequeños (HubSpot/Salesforce)

**Traducción:** O estás pasando horas puntuando leads manualmente, o estás tratando a un VP en una empresa SaaS recién financiada igual que a un practicante en una agencia bootstrapped.

<InsightCard icon="🎯" title="El Costo Real">
Si envías 100 emails a leads sin puntuar con una tasa de respuesta del 3%, obtienes 3 conversaciones. Si puntúas primero y solo envías emails a los 40 mejores con una tasa del 12%, obtienes 5 conversaciones — en un 60% menos de tiempo.
</InsightCard>

---

## El Modelo FIT + SIGNAL + FRICTION (Repaso)

Aprendiste este framework en el Curso 21, Lección 4. Ahora lo vas a automatizar.

<FlipCard 
  front="FIT (0-4 puntos)" 
  back="¿Este prospecto coincide con tu ICP? Industria, título, tamaño de empresa, tech stack. Cuanto más cercana la coincidencia, mayor la puntuación." 
/>

<FlipCard 
  front="SIGNAL (0-4 puntos)" 
  back="¿Hay un disparador de compra ahora mismo? Cambio de trabajo, financiamiento, contrataciones, adopción de tecnología. Las señales indican timing e intención." 
/>

<FlipCard 
  front="FRICTION (0 a -2 puntos)" 
  back="¿Hay factores que maten el trato? Ciclos de venta empresarial, compra por comité, industrias reguladas. La fricción resta del total." 
/>

**Puntuación Total = FIT + SIGNAL - FRICTION** (limitada a 1-10)

Veamos si recuerdas cómo funciona esto.

<ClassifyExercise
title="Puntúa Estos Prospectos"
persistKey="ai-lead-research-L6-classify"
categories={[
{ id: "high", label: "8-10 (Tier A)", color: "#10b981" },
{ id: "medium", label: "5-7 (Tier B)", color: "#f59e0b" },
{ id: "low", label: "1-4 (Tier C)", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "VP de Marketing en empresa SaaS de 200 personas, recaudó $10M en Serie A hace 3 meses, contratando 2 SDRs",
correctCategory: "high"
},
{
id: "2",
content: "Coordinador de Marketing en empresa enterprise de 5.000 personas, sin cambios recientes, ciclo de ventas de 9 meses",
correctCategory: "low"
},
{
id: "3",
content: "Director de Ventas en agencia de 80 personas, cambió de trabajo hace 60 días, usa HubSpot",
correctCategory: "high"
},
{
id: "4",
content: "Founder en startup de 12 personas, sin financiamiento, bootstrapped, activo en LinkedIn",
correctCategory: "medium"
}
]}
/>

Bien. Ahora construyamos el agente que hace esto automáticamente.

---

## Construyendo Tu Agente de Puntuación (Paso a Paso)

Vas a crear un agente de puntuación que toma datos de prospectos enriquecidos y genera una puntuación estructurada con razonamiento.

**El agente necesita tres cosas:**

1. **Tus criterios de ICP** (qué define el FIT para ti)
2. **Definiciones de señales** (qué disparadores de compra importan)
3. **Banderas de fricción** (qué hace que los tratos sean difíciles)

Empecemos con FIT.

<TemplateBuilder
title="Define Tus Criterios de FIT"
persistKey="ai-lead-research-L6-fit"
sections={[
{
id: "industry",
title: "Coincidencia de Industria (+1 punto)",
fields: [
{
id: "industries",
label: "Industrias Objetivo",
placeholder: "ej., B2B SaaS, Fintech, MarTech",
type: "text"
}
]
},
{
id: "title",
title: "Coincidencia de Título (+1 punto)",
fields: [
{
id: "titles",
label: "Títulos Objetivo",
placeholder: "ej., VP/Director/Head of Marketing, Sales, Growth",
type: "text"
}
]
},
{
id: "size",
title: "Coincidencia de Tamaño de Empresa (+1 punto)",
fields: [
{
id: "size_range",
label: "Rango de Empleados",
placeholder: "ej., 50-500 empleados",
type: "text"
}
]
},
{
id: "tech",
title: "Coincidencia de Tech Stack (+1 punto)",
fields: [
{
id: "tech_stack",
label: "Tecnologías Clave",
placeholder: "ej., HubSpot, Salesforce, Outreach",
type: "text"
}
]
}
]}
/>

Ahora los criterios de SIGNAL.

<TemplateBuilder
title="Define Tus Disparadores de SIGNAL"
persistKey="ai-lead-research-L6-signal"
sections={[
{
id: "job_change",
title: "Cambio de Trabajo (+1 punto)",
fields: [
{
id: "job_change_window",
label: "Ventana de Tiempo",
placeholder: "ej., Últimos 90 días",
type: "text"
}
]
},
{
id: "funding",
title: "Financiamiento Reciente (+1 punto)",
fields: [
{
id: "funding_window",
label: "Ventana de Tiempo",
placeholder: "ej., Últimos 6 meses",
type: "text"
}
]
},
{
id: "hiring",
title: "Contratando para Roles Relevantes (+1 punto)",
fields: [
{
id: "hiring_roles",
label: "Roles Objetivo",
placeholder: "ej., Ventas, Marketing, Growth",
type: "text"
}
]
},
{
id: "engagement",
title: "Engagement Reciente (+1 punto)",
fields: [
{
id: "engagement_types",
label: "Señales de Engagement",
placeholder: "ej., Descargó contenido, evaluó competidor, publicó sobre un punto de dolor",
type: "textarea"
}
]
}
]}
/>

Y las banderas de FRICTION.

<TemplateBuilder
title="Define Tus Banderas de FRICTION"
persistKey="ai-lead-research-L6-friction"
sections={[
{
id: "sales_cycle",
title: "Ciclo de Venta Largo (-1 punto)",
fields: [
{
id: "cycle_length",
label: "¿Qué califica como 'largo'?",
placeholder: "ej., >6 meses típico",
type: "text"
}
]
},
{
id: "committee",
title: "Compra por Comité (-1 punto)",
fields: [
{
id: "stakeholder_count",
label: "Umbral de Stakeholders",
placeholder: "ej., >3 stakeholders requeridos",
type: "text"
}
]
}
]}
/>

Perfecto. Ahora convirtamos esto en un prompt para el agente de puntuación.

---

## El Prompt del Agente de Puntuación (Tu Plantilla de Producción)

Aquí está el system prompt que impulsa tu agente de puntuación. Esto es lo que pegarás en Clay, n8n, o un flujo de trabajo de API personalizado.

```
You are a lead scoring agent for [YOUR COMPANY]. Score each prospect 1-10
based on three dimensions:

FIT (0-4 points):
+1 if industry matches: [YOUR INDUSTRIES FROM ABOVE]
+1 if title matches: [YOUR TITLES FROM ABOVE]
+1 if company size matches: [YOUR SIZE RANGE FROM ABOVE]
+1 if tech stack includes: [YOUR TECH STACK FROM ABOVE]

SIGNAL (0-4 points):
+1 if changed jobs in past [YOUR JOB CHANGE WINDOW]
+1 if company raised funding in past [YOUR FUNDING WINDOW]
+1 if company is hiring for [YOUR HIRING ROLES]
+1 if recently engaged with [YOUR ENGAGEMENT TYPES]

FRICTION (0 to -2 points):
-1 if enterprise sales cycle ([YOUR CYCLE LENGTH])
-1 if committee buying ([YOUR STAKEHOLDER COUNT])

TOTAL = FIT + SIGNAL - FRICTION (clamp to 1-10)

OUTPUT FORMAT (JSON):
{
  "fit_score": 3,
  "fit_reasons": ["industry match", "title match", "size match"],
  "signal_score": 2,
  "signal_reasons": ["job change", "recent funding"],
  "friction_score": -1,
  "friction_reasons": ["committee buying"],
  "total_score": 4,
  "priority_tier": "B",
  "recommended_action": "Automated sequence",
  "confidence": "high"
}

TIER THRESHOLDS:
8-10 = Tier A (immediate personal outreach)
5-7 = Tier B (automated sequence)
1-4 = Tier C (nurture or disqualify)

RULES:
- Only score based on data provided
- If data is missing for a criterion, score 0 for that criterion
- Never guess or invent data
- Confidence = "high" if 80%+ of fields present, "medium" if 50-79%, "low" if <50%
```

<InsightCard icon="⚙️" title="¿Por Qué Salida en JSON?">
El JSON estructurado significa que puedes parsear la puntuación, el tier y el razonamiento automáticamente. Sin copiar y pegar manualmente. La salida del agente se convierte en la entrada para la siguiente etapa de tu pipeline (personalización).
</InsightCard>

---

## Implementando el Agente (Clay vs. n8n vs. Hoja de Cálculo)

Tienes tres caminos de implementación. Elige según tu presupuesto y comodidad técnica.

<SlideNavigation>
<Slide title="Opción 1: Columna AI de Clay">

**Mejor para:** Founders no técnicos con presupuesto para Clay ($149/mes+)

**Configuración:**

1. Agrega una "AI Column" a tu tabla de leads enriquecidos
2. Pega el prompt de puntuación de arriba
3. Mapea las columnas de entrada: First Name, Last Name, Company, Title, Industry, Company Size, Tech Stack, Job Changed (bool), Recent Funding (bool), Hiring (bool)
4. Elige el modelo: GPT-4o o Claude 3.5 Sonnet
5. Ejecuta en todas las filas

**Costo:** ~1-2 créditos de Clay por puntuación = ~$0.07-0.14 por lead

**Velocidad:** 500 leads puntuados en ~5 minutos

**Salida:** JSON parseado en columnas individuales (fit_score, signal_score, total_score, tier)

</Slide>

<Slide title="Opción 2: Flujo de Trabajo en n8n">

**Mejor para:** Founders técnicos o quienes tienen tiempo para aprender automatización

**Configuración:**

1. Crea un nuevo flujo de trabajo en n8n
2. Disparador: Google Sheets "New Row" o Webhook
3. Agrega un nodo de "OpenAI" o "Anthropic"
4. Pega el prompt de puntuación en el system message
5. Mapea los datos del lead enriquecido al user message como JSON
6. Parsea la respuesta JSON
7. Escribe las puntuaciones de vuelta a Google Sheets o CRM

**Costo:** Solo llamadas a API (~$0.01-0.03 por puntuación)

**Velocidad:** 500 leads puntuados en ~10 minutos (límites de rate de API)

**Salida:** Puntuaciones escritas en hoja de cálculo o CRM

**Bonus:** Eres dueño del flujo de trabajo; sin vendor lock-in

</Slide>

<Slide title="Opción 3: Google Sheets + Apps Script">

**Mejor para:** Founders conscientes del presupuesto que se sienten cómodos con scripting básico

**Configuración:**

1. Crea una Google Sheet con los leads enriquecidos
2. Agrega una función de Apps Script que llame a la API de ChatGPT
3. Itera por las filas, envía datos a la API, escribe las puntuaciones de vuelta
4. Ejecuta manualmente o con un disparador

**Costo:** Solo API de ChatGPT (~$0.01-0.03 por puntuación)

**Velocidad:** 500 leads puntuados en ~15-20 minutos (más lento por límites de Apps Script)

**Salida:** Puntuaciones en columnas adyacentes

**Limitación:** Más lento que Clay/n8n; se requiere disparador manual

</Slide>
</SlideNavigation>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Founders Técnicos">
Si te sientes cómodo con Python o Node.js, omite las herramientas no-code. Construye un script simple que lea un CSV, llame a la API de OpenAI/Anthropic, y escriba las puntuaciones de vuelta. Ahorrarás $150/mes en Clay y tendrás control total.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches/Consultores">
Clay vale la inversión aquí. Vendes servicios de alto valor — el tiempo ahorrado en puntuación manual se paga solo en una conversación con un cliente. Enfócate en la estrategia, no en la plomería.
</ContextualNote>

---

## Calibración: Asegurándote de Que Tu Agente Funcione

Tu agente de puntuación es tan bueno como sus criterios. Si puntúa alto a malos leads y bajo a buenos leads, es peor que no tener puntuación en absoluto.

**El proceso de calibración:**

<ProgressiveReveal title="Protocolo de Calibración en 4 Pasos" persistKey="ai-lead-research-L6-calibration">
<RevealSection title="Paso 1: Reúne Datos Históricos">

Extrae 20 prospectos pasados:

- 10 que **convirtieron** (se convirtieron en clientes)
- 10 que **no convirtieron** (rechazados, ghosteados, o mala coincidencia)

Asegúrate de tener datos enriquecidos para los 20 (industria, título, tamaño, tech stack, señales).

</RevealSection>

<RevealSection title="Paso 2: Ejecuta el Agente de Puntuación">

Pasa los 20 prospectos a través de tu agente de puntuación. Registra las puntuaciones.

**Qué buscar:**

- ¿Los 10 que convirtieron puntuaron más alto en promedio que los 10 que no convirtieron?
- ¿Hay algún convertido con puntuación &lt;5? (Falsos negativos)
- ¿Hay algún no-convertido con puntuación >7? (Falsos positivos)

</RevealSection>

<RevealSection title="Paso 3: Ajusta Pesos y Criterios">

Si la precisión es &lt;70%, ajusta:

- **¿Criterios de Fit muy amplios?** Ajusta las definiciones de industria o título
- **¿Criterios de Signal demasiado débiles?** Agrega más peso a cambios de trabajo o financiamiento
- **¿Faltan criterios de Friction?** Agrega banderas para factores que matan tratos que has experimentado

**Ejemplo de ajuste:**

- Original: "+1 si tamaño de empresa 10-1.000 empleados"
- Revisado: "+1 si tamaño de empresa 50-500 empleados" (rango más ajustado)

</RevealSection>

<RevealSection title="Paso 4: Repuntúa y Valida">

Ejecuta el agente ajustado en los mismos 20 prospectos. Compara las puntuaciones.

**Precisión objetivo:** 80%+ (16 de 20 puntuados correctamente)

Si alcanzas el 80%, guarda esto como tu prompt de producción. Si no, repite el Paso 3.

**Consejo pro:** Recalibra mensualmente con nuevos datos de conversión. Tu ICP evoluciona; tu puntuación también debería hacerlo.

</RevealSection>
</ProgressiveReveal>

Practiquemos la calibración con una simulación.

<TimedChallenge
title="Desafío de Calibración: Detecta las Puntuaciones Incorrectas"
persistKey="ai-lead-research-L6-calibration-challenge"
timeLimit={90}
items={[
{
id: "1",
prompt: "Prospecto: VP de Ventas en SaaS de 300 personas, recaudó $15M, contratando 3 SDRs. Puntuación: 9. Resultado: Convirtió. ¿Correcto?",
correctAnswer: "correct",
explanation: "Alto FIT + señales fuertes = puntuación alta precisa."
},
{
id: "2",
prompt: "Prospecto: Pasante de Marketing en startup de 10 personas, sin financiamiento, sin señales. Puntuación: 7. Resultado: Ghosteó. ¿Correcto?",
correctAnswer: "incorrect",
explanation: "Falso positivo. Pasante + empresa pequeña + sin señales debería puntuar 2-3, no 7. Criterios demasiado amplios."
},
{
id: "3",
prompt: "Prospecto: Director de Marketing en agencia de 150 personas, cambió de trabajo hace 45 días. Puntuación: 6. Resultado: Convirtió. ¿Correcto?",
correctAnswer: "incorrect",
explanation: "Falso negativo. Cambio de trabajo + agencia de mediano mercado debería puntuar 8+. Peso del signal demasiado bajo."
},
{
id: "4",
prompt: "Prospecto: VP de Ops en enterprise de 5.000 personas, ciclo de ventas de 12 meses, 5 stakeholders. Puntuación: 3. Resultado: Rechazado. ¿Correcto?",
correctAnswer: "correct",
explanation: "Alta fricción penalizada correctamente. Enterprise + comité = puntuación baja."
}
]}
/>

---

## Umbrales de Acción: Qué Hacer Con Cada Tier

La puntuación es inútil si no actúas sobre ella. Aquí está lo que hacer con cada tier.

<FlipCard 
  front="Tier A (8-10): Leads Calientes" 
  back="Contacto personal en menos de 24 horas. Llamadas del founder o emails altamente personalizados. Revisión manual requerida. ~10-20% de tu lista." 
/>

<FlipCard 
  front="Tier B (5-7): Leads Tibios" 
  back="Secuencia automatizada de 5-7 pasos con personalización por IA. Sin revisión manual. ~40-50% de tu lista." 
/>

<FlipCard 
  front="Tier C (1-4): Fríos/Nurture" 
  back="Agrega a nurture de newsletter o descalifica. No pierdas tiempo en contacto activo. ~30-40% de tu lista." 
/>

**Las matemáticas:**

- 400 leads enriquecidos
- 60 Tier A (15%) → 60 emails personales → 12% tasa de respuesta = 7 conversaciones
- 180 Tier B (45%) → secuencia automatizada → 6% tasa de respuesta = 11 conversaciones
- 160 Tier C (40%) → nurture o descartar

**Total:** 18 conversaciones de 240 contactos de outreach (A+B), en lugar de 12 conversaciones de 400 emails genéricos.

<InsightCard icon="📊" title="La Regla de Distribución de Tiers">
Si más del 25% de tus leads son Tier A, tus criterios son demasiado amplios. Si menos del 10% son Tier A, tus criterios son demasiado estrictos o la calidad de tu lista es mala. Apunta a 10-20% Tier A.
</InsightCard>

---

## Ejemplo Real: El Agente de Puntuación de $40K de Sarah

<ExampleCard label="Caso de Estudio: La Corrección de Puntuación de $40K">

**Contexto:** Sarah vende una herramienta de atribución de marketing a empresas B2B SaaS. Enviaba 200 emails fríos/semana a cualquier persona con "marketing" en su título. Tasa de respuesta: 2.5%. Reuniones: 1-2/semana.

**El Problema:** Trataba a un CMO en una empresa Serie B igual que a un Coordinador de Marketing en una startup de 10 personas.

**La Solución:** Construyó un agente de puntuación con estos criterios:

**FIT:**

- Industria: B2B SaaS (+1)
- Título: VP/Director/Head of Marketing (+1)
- Tamaño de empresa: 50-500 empleados (+1)
- Tech stack: HubSpot O Salesforce (+1)

**SIGNAL:**

- Recaudó financiamiento en los últimos 6 meses (+1)
- Contratando para roles de marketing (+1)
- Cambió de trabajo en los últimos 90 días (+1)
- Publicó sobre desafíos de atribución (+1)

**FRICTION:**

- Enterprise (>500 empleados) (-1)
- Industria regulada (salud, finanzas) (-1)

**Resultados después de 30 días:**

- 200 leads enriquecidos y puntuados
- 35 Tier A (17.5%) → contacto personal → 14% tasa de respuesta = 5 conversaciones
- 90 Tier B (45%) → secuencia automatizada → 7% tasa de respuesta = 6 conversaciones
- 75 Tier C (37.5%) → descalificados

**Total:** 11 conversaciones de 125 contactos de outreach (vs. 5 de 200 antes)

**Impacto en ingresos:** 3 nuevos clientes en 60 días = $40K ARR

**Tiempo ahorrado:** 6 horas/semana (sin más revisión manual de prospectos)

</ExampleCard>

---

## Construyendo Tu Agente de Puntuación (Práctica)

Es hora de construir el tuyo. Usa los criterios que definiste anteriormente.

<ComparisonBuilder
title="Tu Prompt del Agente de Puntuación"
persistKey="ai-lead-research-L6-prompt-builder"
prompt="Escribe tu prompt de sistema completo del agente de puntuación usando el modelo FIT + SIGNAL + FRICTION"
expertExample="You are a lead scoring agent for Acme Marketing Tools. Score each prospect 1-10 based on three dimensions:

FIT (0-4 points):
+1 if industry matches: B2B SaaS, Fintech, MarTech
+1 if title matches: VP/Director/Head of Marketing, Growth, Revenue
+1 if company size matches: 50-500 employees
+1 if tech stack includes: HubSpot OR Salesforce OR Marketo

SIGNAL (0-4 points):
+1 if changed jobs in past 90 days
+1 if company raised funding in past 6 months
+1 if company is hiring for marketing or sales roles
+1 if recently posted about attribution or ROI challenges

FRICTION (0 to -2 points):
-1 if enterprise sales cycle (>6 months typical)
-1 if committee buying (>3 stakeholders required)

TOTAL = FIT + SIGNAL - FRICTION (clamp to 1-10)

OUTPUT FORMAT (JSON):
{
&quot;fit_score&quot;: 3,
&quot;fit_reasons&quot;: [&quot;industry match&quot;, &quot;title match&quot;, &quot;size match&quot;],
&quot;signal_score&quot;: 2,
&quot;signal_reasons&quot;: [&quot;job change&quot;, &quot;recent funding&quot;],
&quot;friction_score&quot;: -1,
&quot;friction_reasons&quot;: [&quot;committee buying&quot;],
&quot;total_score&quot;: 4,
&quot;priority_tier&quot;: &quot;B&quot;,
&quot;recommended_action&quot;: &quot;Automated sequence&quot;,
&quot;confidence&quot;: &quot;high&quot;
}

TIER THRESHOLDS:
8-10 = Tier A (immediate personal outreach)
5-7 = Tier B (automated sequence)
1-4 = Tier C (nurture or disqualify)"
criteria={[
"Incluye los 4 criterios de FIT con valores específicos",
"Incluye los 4 criterios de SIGNAL con ventanas de tiempo",
"Incluye al menos 2 banderas de FRICTION",
"Especifica el formato de salida JSON",
"Define umbrales de tier y acciones"
]}
/>

---

## Errores Comunes de Puntuación (Y Cómo Evitarlos)

<StrategyDuel
title="Duelo de Enfoques de Puntuación"
persistKey="ai-lead-research-L6-duel"
scenario="Tienes 300 leads enriquecidos. ¿Cómo los puntúas?"
strategyA={{
    name: "Puntúa a Todos Igual",
    description: "Envía la misma secuencia a los 300 leads",
    pros: ["Simple", "Rápido de configurar"],
    cons: ["Desperdicia tiempo en malos leads", "Pierde prospectos de alta intención", "Tasa de respuesta baja"]
  }}
strategyB={{
    name: "Puntuación con IA + Outreach por Tiers",
    description: "Puntúa los 300, divide en tiers A/B/C, personaliza el enfoque por tier",
    pros: ["Tasas de respuesta más altas", "Mejor asignación de tiempo", "Mejora medible"],
    cons: ["Requiere configuración", "Necesita calibración"]
  }}
expertVerdict="La Estrategia B gana siempre. El costo de configuración es de 2-3 horas. El ROI es 2-3 veces más conversaciones. Sin duda."
/>

**Error #1: Puntuar sin calibración**

- **Problema:** Tus criterios no coinciden con la realidad
- **Solución:** Ejecuta la calibración en 20 prospectos históricos antes de salir en vivo

**Error #2: Demasiados criterios**

- **Problema:** La puntuación se vuelve demasiado compleja; el agente se confunde
- **Solución:** Mantén máximo 4 FIT + 4 SIGNAL + 2 FRICTION

**Error #3: Ignorar las puntuaciones de confianza**

- **Problema:** Confías igualmente en puntuaciones de baja confianza que en las de alta confianza
- **Solución:** Solo auto-enruta Tier B/C si la confianza = "high"; revisa manualmente "medium" o "low"

**Error #4: No recalibrar**

- **Problema:** Tu ICP evoluciona; tu puntuación no
- **Solución:** Recalibra mensualmente con datos reales de conversión

**Error #5: Puntuar sin actuar**

- **Problema:** Puntúas leads pero no cambias tu enfoque de outreach
- **Solución:** Define acciones claras para cada tier (ver Umbrales de Acción arriba)

---

## Tu Checklist del Agente de Puntuación

<InteractiveChecklist
title="Checklist de Implementación del Agente de Puntuación"
persistKey="ai-lead-research-L6-checklist"
items={[
"Definir criterios de FIT (máx. 4)",
"Definir disparadores de SIGNAL (máx. 4)",
"Definir banderas de FRICTION (máx. 2)",
"Escribir el system prompt del agente de puntuación",
"Elegir ruta de implementación (Clay/n8n/Hoja de cálculo)",
"Configurar flujo de puntuación en la herramienta elegida",
"Ejecutar calibración en 20 prospectos históricos",
"Ajustar criterios si la precisión es &lt;80%",
"Definir umbrales de acción para Tier A/B/C",
"Puntuar el primer lote de 50-100 leads",
"Revisar puntuaciones manualmente (spot-check del 10%)",
"Desplegar en pipeline de producción",
"Programar recalibración mensual"
]}
/>

---

## Lo Que Sigue

Ahora tienes un agente de puntuación que evalúa cada prospecto en 3 segundos y los enruta a la acción correcta.

**Próxima lección:** Construirás el **Agente de Personalización** que toma tus leads de Tier A y B y genera primeras líneas personalizadas, icebreakers y propuestas de valor en segundos.

**El pipeline hasta ahora:**

1. Descubrir (Apollo, Sales Nav)
2. Enriquecer (Waterfall)
3. Puntuar (Esta lección)
4. Personalizar (Próxima lección)
5. Enviar (Lección 8)

Estás al 60% de camino hacia un sistema de adquisición totalmente automatizado e impulsado por IA.

---

## Quiz Rápido: Pon a Prueba Tu Conocimiento de Puntuación

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Un prospecto puntúa 9 en FIT pero 0 en SIGNAL y -1 en FRICTION. ¿Cuál es su puntuación total?",
      "options": ["9", "8", "10", "7"],
      "correctIndex": 1,
      "explanation": "9 (FIT) + 0 (SIGNAL) - 1 (FRICTION) = 8. Las puntuaciones se limitan a 1-10."
    },
    {
      "id": "q2",
      "question": "¿Cuál es la señal de compra #1 más fuerte según los datos de LinkedIn?",
      "options": [
        "Financiamiento reciente",
        "Cambio de trabajo en los últimos 90 días",
        "Contratando para roles relevantes",
        "Publicó sobre un punto de dolor"
      ],
      "correctIndex": 1,
      "explanation": "Los cambios de trabajo hacen que los prospectos sean 3 veces más propensos a comprar dentro de 90 días (datos de LinkedIn Sales Solutions)."
    },
    {
      "id": "q3",
      "question": "Si el 40% de tus leads están puntuando Tier A (8-10), ¿cuál es el problema?",
      "options": [
        "La calidad de tu lista es excelente",
        "Tus criterios son demasiado amplios",
        "Tu agente de puntuación está roto",
        "Nada — eso es ideal"
      ],
      "correctIndex": 1,
      "explanation": "Apunta a 10-20% Tier A. Si más del 25% son Tier A, tus criterios son demasiado amplios y no estás filtrando efectivamente."
    },
    {
      "id": "q4",
      "question": "¿Con qué frecuencia debes recalibrar tu agente de puntuación?",
      "options": [
        "Nunca — configúralo y olvídalo",
        "Semanalmente",
        "Mensualmente",
        "Anualmente"
      ],
      "correctIndex": 2,
      "explanation": "La recalibración mensual con datos reales de conversión mantiene tu puntuación precisa a medida que tu ICP evoluciona."
    },
    {
      "id": "q5",
      "question": "¿Qué debes hacer con los leads de Tier C (1-4)?",
      "options": [
        "Enviarles la misma secuencia que al Tier A",
        "Agregar a nurture de newsletter o descalificar",
        "Llamarlos inmediatamente",
        "Puntuarlos de nuevo la próxima semana"
      ],
      "correctIndex": 1,
      "explanation": "Los leads de Tier C tienen bajo ajuste o alta fricción. No pierdas tiempo en outreach activo — nutre o descarta."
    }
  ]
}
```
