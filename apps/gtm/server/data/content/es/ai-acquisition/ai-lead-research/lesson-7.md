---
title: "Agente de Etiquetado de Segmentos"
duration: "45 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 7
---

## El Error de $12K

Conoce a Alex, un founder técnico que construyó un hermoso pipeline de enriquecimiento impulsado por IA. Cada lead recibía una puntuación del 1 al 10. Cada email estaba personalizado. La infraestructura era perfecta.

Pero su tasa de respuesta estaba estancada en el 4%.

¿El problema? **Enviaba el mismo mensaje a VPs en startups de 50 personas y en empresas enterprise de 5.000 personas.** Mismo pitch. Mismo caso de estudio. Mismo call-to-action.

Su agente de puntuación sabía que eran diferentes (uno puntuó 8, el otro puntuó 6). Pero su sistema de outreach los trataba a todos los leads "calificados" de manera idéntica.

Después de tres meses de resultados mediocres, Alex añadió un componente a su pipeline: **un agente de etiquetado de segmentos**. Tardó 90 minutos en construirlo.

En dos semanas, su tasa de respuesta saltó al 11%. Mismos leads. Mismo volumen. Mensajes diferentes para contextos diferentes.

El agente de etiquetado de segmentos hizo una pregunta que su agente de puntuación no podía responder: _"¿Qué versión específica de nuestro mensaje resonará con ESTA persona en ESTA situación?"_

<InsightCard icon="🎯" title="La Brecha de Segmentación">
La puntuación te dice A QUIÉN contactar. La segmentación te dice CÓMO contactarlos. La mayoría de los founders construyen lo primero y omiten lo segundo — luego se preguntan por qué la personalización no funciona.
</InsightCard>

---

## Qué Hace Realmente el Etiquetado de Segmentos

Tu agente de puntuación (Lección 6) genera un número: 1-10. Eso es útil para la priorización.

Pero cuando llega el momento de escribir un email, necesitas respuestas a preguntas diferentes:

- ¿Esta persona es un **titular de presupuesto** o un **influenciador**?
- ¿Están en **modo de evaluación** o en **modo de statu quo**?
- ¿Les importa más la **velocidad** o el **ahorro de costos**?
- ¿Debería liderar con un **caso de estudio**, un **dato**, o una **conexión mutua**?
- ¿Cuál es su **punto de dolor principal** entre los 5 que resolvemos?

**El etiquetado de segmentos** significa asignar etiquetas categóricas a cada prospecto basándose en datos enriquecidos y análisis de IA. Estas etiquetas impulsan variantes de mensajes, selección de secuencias y estrategia de seguimiento.

<FlipCard 
  front="Segmento vs. Puntuación" 
  back="Puntuación = rango de prioridad (1-10). Segmento = categoría de contexto (Enterprise Buyer, Early Adopter, Budget-Conscious, etc.). Necesitas ambos." 
/>

### El Esquema de Etiquetas de Segmento

Un sistema de etiquetado de segmentos bien diseñado asigna 3-5 etiquetas por prospecto:

```json
{
  "id": "lead_042",
  "name": "Sarah Chen",
  "icp_fit_score": 8,
  "segment_tags": {
    "company_stage": "growth_stage",
    "buyer_role": "economic_buyer",
    "pain_priority": "attribution_gap",
    "urgency_level": "active_evaluation",
    "message_angle": "roi_case_study"
  }
}
```

Cada etiqueta desbloquea una variante de mensaje diferente, un caso de estudio o una ruta de secuencia.

<RangeSlider 
  label="¿Cuántas variantes de mensajes distintas usas actualmente?" 
  min={1} 
  max={10} 
  lowLabel="Un mensaje para todos" 
  highLabel="10+ variantes" 
  persistKey="ai-lead-research-L7-variants" 
/>

---

## Las 5 Dimensiones Centrales de Segmento

La mayoría de los sistemas de etiquetado de segmentos B2B usan 5 dimensiones. No necesitas las 5 para cada ICP, pero estas cubren el 90% de los casos de uso.

<SlideNavigation>
<Slide title="1. Etapa de la Empresa">

**Qué significa:** En qué fase del ciclo de vida se encuentra la empresa — startup, crecimiento, escala, enterprise.

**Por qué importa:** Una startup de 15 personas se preocupa por la velocidad y la agilidad. Una empresa de 500 personas se preocupa por el cumplimiento y la integración.

**Cómo etiquetarlo:**

- Número de empleados (Apollo/LinkedIn)
- Etapa de financiamiento (Crunchbase)
- Estimación de ingresos (ZoomInfo/Apollo)

**Etiquetas de ejemplo:**

- `early_stage` (1-20 empleados, pre-seed/seed)
- `growth_stage` (20-200 empleados, Serie A-B)
- `scale_stage` (200-1000 empleados, Serie C+)
- `enterprise` (1000+ empleados, público o etapa tardía)

**Impacto en el mensaje:**

- Etapa temprana → "Configúrate en 15 minutos, sin necesidad de IT"
- Enterprise → "Cumple con SOC 2, se integra con Okta y Salesforce"

</Slide>

<Slide title="2. Rol del Comprador">

**Qué significa:** ¿Esta persona es el tomador de decisiones, influenciador o usuario final?

**Por qué importa:** Los compradores económicos se preocupan por el ROI. Los champions se preocupan por resolver el dolor de su equipo. Los usuarios finales se preocupan por la facilidad de uso.

**Cómo etiquetarlo:**

- Análisis del título de trabajo (VP/Director = comprador económico, Manager = influenciador)
- Nivel de antigüedad (C-suite, VP, Director, Manager, IC)
- Departamento (Ventas, Marketing, Operaciones, Ingeniería)

**Etiquetas de ejemplo:**

- `economic_buyer` (VP+, autoridad de presupuesto)
- `champion` (Director/Manager, defensor interno)
- `end_user` (IC, usuario diario de la herramienta)
- `technical_gatekeeper` (Ingeniería/IT, evalúa seguridad/integración)

**Impacto en el mensaje:**

- Comprador económico → "Los clientes ven una reducción del 30% en CAC en 90 días"
- Champion → "Tu equipo ahorrará 10 horas/semana en reportes manuales"
- Technical gatekeeper → "REST API, webhooks y SSO listos para usar"

</Slide>

<Slide title="3. Prioridad de Dolor">

**Qué significa:** ¿Cuál de las propuestas de valor de tu producto importa más a este prospecto específico?

**Por qué importa:** Resuelves 5 problemas. Solo les importan 1-2 ahora mismo. Lidera con el correcto.

**Cómo etiquetarlo:**

- Análisis de ofertas de trabajo (contratando para roles relacionados con dolor específico)
- Señales de tech stack (herramientas faltantes que indican brechas)
- Actividad en LinkedIn (publicaciones/comentarios sobre desafíos específicos)
- Normas de la industria (ej., las agencias siempre se preocupan por reportes de clientes)

**Etiquetas de ejemplo (para una herramienta de analítica de marketing):**

- `attribution_gap` (no puede vincular ingresos a canales)
- `reporting_overhead` (creación manual de reportes)
- `data_silos` (herramientas desconectadas)
- `executive_visibility` (el CEO quiere dashboards)

**Impacto en el mensaje:**

- Brecha de atribución → "Ve qué canales generan ingresos, no solo clics"
- Carga de reportes → "Automatiza reportes de clientes — ahorra 15 horas/semana"

</Slide>

<Slide title="4. Nivel de Urgencia">

**Qué significa:** ¿Qué tan pronto necesitan resolver este problema?

**Por qué importa:** Los compradores activos necesitan una demo esta semana. Los investigadores pasivos necesitan contenido de nurture durante 3 meses.

**Cómo etiquetarlo:**

- Señales de cambio de trabajo (nuevo rol = nuevo presupuesto = urgencia)
- Señales de financiamiento (acaban de recaudar = modo de compra)
- Señales de contratación (escalando equipo = necesitan herramientas ahora)
- Señales de evaluación de tecnología (reseñas en G2, comparaciones con competidores)
- Disparadores estacionales (fin de trimestre, nuevo año fiscal)

**Etiquetas de ejemplo:**

- `active_evaluation` (comparando vendedores ahora)
- `problem_aware` (sabe que tiene el problema, aún no está comprando)
- `status_quo` (sin dolor activo, necesita educación)

**Impacto en el mensaje:**

- Evaluación activa → "Agenda una demo esta semana — podemos tener onboarding para fin de mes"
- Consciente del problema → "Así es como 3 empresas como la tuya resolvieron [dolor]"
- Statu quo → "¿Sabías que [estadística sorprendente sobre su industria]?"

</Slide>

<Slide title="5. Ángulo del Mensaje">

**Qué significa:** ¿Qué tipo de apertura resonará mejor — caso de estudio, dato, conexión mutua, gancho de noticias, etc.?

**Por qué importa:** Algunos prospectos responden a la prueba social. Otros quieren números duros. Otros necesitan una conexión personal primero.

**Cómo etiquetarlo:**

- Señales de personalidad (estilo de actividad en LinkedIn — orientado a datos vs. narrativa)
- Normas de industria (finanzas = números, creativos = casos de estudio)
- Antigüedad (C-suite = referencias de pares, IC = contenido de cómo hacer)

**Etiquetas de ejemplo:**

- `roi_case_study` (liderar con "La empresa X ahorró $Y")
- `data_driven` (liderar con "El 73% de las empresas como la tuya...")
- `mutual_connection` (liderar con "John Smith me sugirió que me comunicara")
- `news_hook` (liderar con financiamiento/contratación/lanzamiento reciente)
- `problem_agitation` (liderar con "¿Todavía haces [proceso manual]?")

**Impacto en el mensaje:**

- ROI caso de estudio → "Acme Corp redujo el churn en un 40% en 6 meses usando..."
- Orientado a datos → "Las empresas en tu segmento ven un ROI de 3.2x en promedio..."
- Conexión mutua → "Sarah Chen mencionó que estás evaluando soluciones para..."

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Dimensiones de Segmento para Tu ICP"
persistKey="ai-lead-research-L7-dimensions"
items={[
"Identificar cuáles de las 5 dimensiones importan más para tu ICP",
"Definir 2-4 etiquetas por dimensión (no sobre-segmentes)",
"Mapear cada etiqueta a una variante de mensaje específica o caso de estudio",
"Prueba: ¿Puedes escribir una primera línea diferente para cada combinación de etiquetas?"
]}
/>

---

## Construyendo el Agente de Etiquetado de Segmentos

Ahora que sabes _qué_ etiquetar, construyamos el agente que lo hace automáticamente.

### El System Prompt del Agente de Etiquetado

```
You are a B2B lead segmentation agent for [COMPANY_NAME].

Given enriched prospect data, assign segment tags across 5 dimensions:
1. Company Stage
2. Buyer Role
3. Pain Priority
4. Urgency Level
5. Message Angle

RULES:
- Only assign tags based on data provided — never guess
- If insufficient data for a dimension, tag as "unknown"
- Explain your reasoning for each tag in 1 sentence
- Output valid JSON only

INPUT DATA:
- Name, title, company, company_size, industry
- Tech stack (array)
- Recent funding (bool + amount)
- Job changed in 90 days (bool)
- LinkedIn recent activity (string)
- Hiring for roles (array)

OUTPUT FORMAT:
{
  "company_stage": "growth_stage",
  "company_stage_reason": "50-200 employees, Series A funded",
  "buyer_role": "economic_buyer",
  "buyer_role_reason": "VP of Marketing has budget authority",
  "pain_priority": "attribution_gap",
  "pain_priority_reason": "Uses Google Analytics but not attribution tool",
  "urgency_level": "problem_aware",
  "urgency_level_reason": "No recent funding or hiring signals",
  "message_angle": "roi_case_study",
  "message_angle_reason": "VP-level buyer responds to peer proof",
  "confidence": "high"
}

TAG OPTIONS:
[Company Stage]: early_stage, growth_stage, scale_stage, enterprise, unknown
[Buyer Role]: economic_buyer, champion, end_user, technical_gatekeeper, unknown
[Pain Priority]: [YOUR_PRODUCT_SPECIFIC_PAINS]
[Urgency Level]: active_evaluation, problem_aware, status_quo, unknown
[Message Angle]: roi_case_study, data_driven, mutual_connection, news_hook, problem_agitation, unknown
```

<ExampleCard label="Salida Real del Agente de Etiquetado">

**Entrada:**

```json
{
  "name": "Sarah Chen",
  "title": "VP of Marketing",
  "company": "Acme Corp",
  "company_size": "120",
  "industry": "B2B SaaS",
  "tech_stack": ["HubSpot", "Google Analytics", "Salesforce"],
  "recent_funding": true,
  "funding_amount": "$8M Series A",
  "job_changed_90d": false,
  "linkedin_activity": "Posted about struggling with multi-touch attribution",
  "hiring_for": ["Marketing Analyst", "Demand Gen Manager"]
}
```

**Salida del Agente:**

```json
{
  "company_stage": "growth_stage",
  "company_stage_reason": "120 employees, Series A funded",
  "buyer_role": "economic_buyer",
  "buyer_role_reason": "VP of Marketing has budget authority for marketing tools",
  "pain_priority": "attribution_gap",
  "pain_priority_reason": "LinkedIn post about multi-touch attribution + no attribution tool in stack",
  "urgency_level": "active_evaluation",
  "urgency_level_reason": "Recent funding + hiring for analytics roles = buying mode",
  "message_angle": "roi_case_study",
  "message_angle_reason": "VP-level buyer, B2B SaaS industry responds to peer proof",
  "confidence": "high"
}
```

**Primera línea resultante:**
"Hola Sarah — vi que Acme acaba de cerrar su Serie A (¡felicidades!). La mayoría de los VPs de B2B SaaS con los que trabajamos luchan con la atribución multitoque después de superar $5M ARR. Un cliente en tu espacio (tamaño similar, stack HubSpot + Salesforce) redujo su CAC en un 28% en 90 días una vez que pudo ver qué canales realmente generaban ingresos. ¿Vale la pena una conversación de 15 minutos?"

</ExampleCard>

### Dónde Construirlo

<ComparisonBuilder
title="Clay vs. n8n para Etiquetado de Segmentos"
persistKey="ai-lead-research-L7-compare"
prompt="¿Qué plataforma usarás para tu agente de etiquetado de segmentos?"
expertExample="Para la mayoría de los founders solo, Clay es más rápido de configurar (30 min vs 2 horas). Pero si ya usas n8n para otros flujos de trabajo, agrega el etiquetado allí para mantener todo en un solo lugar."
criteria={[
"Tiempo de configuración (Clay = 30 min, n8n = 2 hrs)",
"Costo (Clay = incluido en créditos, n8n = solo costos de API)",
"Flexibilidad (n8n gana para lógica personalizada)",
"Facilidad de mantenimiento (Clay gana para no técnicos)"
]}
/>

**Implementación en Clay:**

1. Agrega leads enriquecidos a la tabla de Clay
2. Agrega "AI Column" → pega el prompt del agente de etiquetado
3. Mapea las columnas de entrada (title, company_size, tech_stack, etc.)
4. Ejecuta en toda la tabla (cuesta ~1-2 créditos por lead)
5. Parsea la salida JSON en columnas de etiquetas individuales
6. Exporta leads etiquetados al CRM o herramienta de outreach

**Implementación en n8n:**

1. Disparador: Nuevo lead enriquecido en Google Sheet o webhook
2. Nodo HTTP Request: Llama a la API de OpenAI/Claude con el prompt de etiquetado
3. Nodo Function: Parsea la respuesta JSON
4. Nodo Set: Escribe etiquetas de vuelta en la hoja o CRM
5. Costo: ~$0.01-0.03 por lead (solo API)

<TemplateBuilder
title="Tu Prompt del Agente de Etiquetado de Segmentos"
persistKey="ai-lead-research-L7-prompt"
sections={[
{
id: "company",
title: "Contexto de Tu Empresa",
fields: [
{ id: "name", label: "Nombre de la Empresa", placeholder: "Acme Analytics", type: "text" },
{ id: "product", label: "Descripción del Producto (1 oración)", placeholder: "Plataforma de atribución de marketing para B2B SaaS", type: "textarea" }
]
},
{
id: "pains",
title: "Prioridades de Dolor (Tu Producto Resuelve)",
fields: [
{ id: "pain1", label: "Dolor 1", placeholder: "attribution_gap", type: "text" },
{ id: "pain2", label: "Dolor 2", placeholder: "reporting_overhead", type: "text" },
{ id: "pain3", label: "Dolor 3", placeholder: "data_silos", type: "text" }
]
},
{
id: "dimensions",
title: "Dimensiones Activas (Marca todas las que apliquen)",
fields: [
{ id: "company_stage", label: "Etapa de la Empresa", type: "checkbox" },
{ id: "buyer_role", label: "Rol del Comprador", type: "checkbox" },
{ id: "pain_priority", label: "Prioridad de Dolor", type: "checkbox" },
{ id: "urgency_level", label: "Nivel de Urgencia", type: "checkbox" },
{ id: "message_angle", label: "Ángulo del Mensaje", type: "checkbox" }
]
}
]}
/>

---

## Mapeo de Segmento a Mensaje

Las etiquetas son inútiles sin variantes de mensajes correspondientes. Para cada combinación de etiquetas, necesitas una primera línea específica, propuesta de valor y call-to-action.

### La Matriz de Mapeo

| Etapa de Empresa | Rol del Comprador    | Prioridad de Dolor   | Ejemplo de Primera Línea                                                           |
| ---------------- | -------------------- | -------------------- | ---------------------------------------------------------------------------------- |
| growth_stage     | economic_buyer       | attribution_gap      | "La mayoría de los VPs de B2B SaaS luchan con la atribución después de $5M ARR..." |
| early_stage      | champion             | reporting_overhead   | "Tu equipo probablemente pasa 10+ horas/semana en reportes manuales..."            |
| enterprise       | technical_gatekeeper | data_silos           | "Se integra con Salesforce, HubSpot y Marketo de fábrica..."                       |
| scale_stage      | economic_buyer       | executive_visibility | "Tu CEO puede ver el estado del pipeline en tiempo real con 2 clics..."            |

**La regla:** Cada combinación de etiquetas que aparece en más del 5% de tus leads necesita una variante de mensaje dedicada.

<ClassifyExercise
title="Relaciona Etiquetas con Variantes de Mensajes"
persistKey="ai-lead-research-L7-classify"
categories={[
{ id: "roi", label: "Enfocado en ROI", color: "#10b981" },
{ id: "speed", label: "Enfocado en Velocidad", color: "#3b82f6" },
{ id: "ease", label: "Facilidad de Uso", color: "#f59e0b" }
]}
items={[
{ id: "1", content: "economic_buyer + growth_stage + attribution_gap", correctCategory: "roi" },
{ id: "2", content: "champion + early_stage + reporting_overhead", correctCategory: "speed" },
{ id: "3", content: "end_user + scale_stage + data_silos", correctCategory: "ease" },
{ id: "4", content: "economic_buyer + enterprise + executive_visibility", correctCategory: "roi" },
{ id: "5", content: "technical_gatekeeper + growth_stage + data_silos", correctCategory: "ease" }
]}
/>

### Construyendo la Biblioteca de Variantes de Mensajes

Una vez que tienes etiquetas, construye una biblioteca de variantes de mensajes. Cada variante incluye:

1. **Primera línea** (gancho personalizado)
2. **Propuesta de valor** (1-2 oraciones)
3. **Prueba social** (caso de estudio o estadística)
4. **CTA** (solicitud específica)

**Ejemplo para `growth_stage + economic_buyer + attribution_gap`:**

```
Primera Línea: "Hola [Nombre] — la mayoría de los VPs de B2B SaaS con los que trabajamos topan una pared alrededor de los $5M ARR cuando no pueden vincular ingresos a canales específicos."

Propuesta de Valor: "[Producto] te muestra exactamente qué campañas, contenido y touchpoints generan pipeline — no solo clics o MQLs."

Prueba Social: "Un cliente en tu espacio (120 empleados, stack HubSpot + Salesforce) redujo el CAC en un 28% en 90 días una vez que pudo ver atribución real."

CTA: "¿Vale la pena una conversación de 15 minutos para ver si podemos hacer lo mismo para Acme?"
```

<RewriteExercise
title="Escribe una Primera Línea Específica por Segmento"
persistKey="ai-lead-research-L7-rewrite"
original="Hola, quería comunicarme sobre nuestra plataforma de analítica de marketing."
hint="Usa estas etiquetas: growth_stage + champion + reporting_overhead"
expertRewrite="Hola [Nombre] — noté que estás contratando para un rol de Analista de Marketing. La mayoría de los managers de demand gen en tu etapa pasan 10+ horas/semana construyendo reportes manuales para el liderazgo. [Producto] automatiza eso completamente — un cliente ahorró 15 horas/semana y reasignó ese tiempo a optimización de campañas."
criteria={[
"Hace referencia a etiquetas de segmento específicas (etapa, rol, dolor)",
"Incluye beneficio concreto (tiempo ahorrado, ganancia de eficiencia)",
"Termina con CTA claro o próximo paso"
]}
/>

---

## Calibración: Probando Tus Etiquetas

Como el agente de puntuación (Lección 6), tu agente de etiquetado necesita calibración. Ejecútalo en 20-30 prospectos conocidos y verifica:

1. **¿Son precisas las etiquetas?** ¿`economic_buyer` realmente mapea a VPs con autoridad de presupuesto?
2. **¿Son accionables las etiquetas?** ¿Puedes escribir un mensaje diferente para cada etiqueta?
3. **¿Están distribuidas las etiquetas?** Si el 90% de los leads reciben la misma etiqueta, no estás segmentando — estás etiquetando.

<TimedChallenge
title="Detecta la Etiqueta de Segmento Mala"
persistKey="ai-lead-research-L7-timed"
timeLimit={90}
items={[
{
id: "1",
prompt: "Etiqueta: 'interested_buyer' — Razón: 'Visitó la página de precios'",
correctAnswer: "bad",
explanation: "Demasiado vago. 'Active evaluation' o 'problem aware' es más accionable."
},
{
id: "2",
prompt: "Etiqueta: 'growth_stage' — Razón: '50-200 empleados, Serie A'",
correctAnswer: "good",
explanation: "Específico, respaldado por datos y accionable."
},
{
id: "3",
prompt: "Etiqueta: 'high_value' — Razón: 'Parece un buen ajuste'",
correctAnswer: "bad",
explanation: "Subjetivo y no vinculado a datos. Usa 'economic_buyer' o 'enterprise' en su lugar."
},
{
id: "4",
prompt: "Etiqueta: 'attribution_gap' — Razón: 'Sin herramienta de atribución en tech stack + publicación en LinkedIn sobre multi-touch'",
correctAnswer: "good",
explanation: "Dolor específico, respaldado por señales."
}
]}
/>

### El Checklist de Calibración

<InteractiveChecklist
title="Calibración del Etiquetado de Segmentos"
persistKey="ai-lead-research-L7-calibration"
items={[
"Ejecutar el agente de etiquetado en 30 leads enriquecidos",
"Revisar manualmente 10 salidas — ¿son precisas las etiquetas?",
"Verificar distribución de etiquetas — ¿alguna etiqueta supera el 70% de los leads?",
"Escribir 1 variante de mensaje por combinación de etiquetas común",
"Prueba: Enviar 10 emails con variantes específicas por segmento",
"Comparar tasas de respuesta con la línea de base genérica",
"Ajustar el prompt si la precisión es &lt;80% o la tasa de respuesta no mejora"
]}
/>

---

## Etiquetas de Segmento en Acción: El Pipeline Completo

Así es como el etiquetado de segmentos encaja en tu pipeline de enriquecimiento completo (de la Lección 4):

```
DISCOVER
├── Apollo Search → raw_leads.json (500 leads)
│
ENRICH (Waterfall)
├── Clay/Apollo/Hunter → enriched_leads.json (400 leads, 80% coverage)
│   ├── email (verified)
│   ├── company_size, industry, tech_stack
│   ├── recent_funding, job_changed_90d
│
SCORE (ICP Fit Agent — Lección 6)
├── AI Scoring → scored_leads.json
│   ├── fit_score (0-4)
│   ├── signal_score (0-4)
│   ├── total_score (1-10)
│   ├── priority_tier (A/B/C)
│   Resultado: 120 Tier A, 160 Tier B, 120 Tier C
│
TAG (Segment Tagging Agent — ESTA LECCIÓN)
├── AI Tagging → tagged_leads.json (280 Tier A+B only)
│   ├── company_stage
│   ├── buyer_role
│   ├── pain_priority
│   ├── urgency_level
│   ├── message_angle
│   Resultado: 8-12 combinaciones de segmentos distintas
│
PERSONALIZE (Course 24)
├── Message Variant Selector → personalized_leads.json
│   ├── first_line (segment-specific)
│   ├── value_prop_variant
│   ├── case_study_match
│   ├── cta
│
SEND
├── Instantly/Smartlead → sequences by segment
│   ├── Segment A: "ROI Case Study" sequence
│   ├── Segment B: "Speed to Value" sequence
│   ├── Segment C: "Ease of Use" sequence
```

**El resultado:** En lugar de un mensaje genérico para 280 leads, envías 8-12 mensajes específicos por segmento — cada uno resonando con un contexto específico.

<ScenarioSimulator
title="Calculadora de ROI del Etiquetado de Segmentos"
persistKey="ai-lead-research-L7-simulator"
levers={[
{ id: "leads", label: "Leads calificados por mes", min: 50, max: 500, step: 50, defaultValue: 200 },
{ id: "genericReply", label: "Tasa de respuesta con mensaje genérico (%)", min: 2, max: 10, step: 1, defaultValue: 5 },
{ id: "segmentedReply", label: "Tasa de respuesta con mensaje segmentado (%)", min: 5, max: 20, step: 1, defaultValue: 12 }
]}
outputs={[
{ id: "genericReplies", label: "Respuestas con mensajería genérica", formula: "(leads * (genericReply / 100))", unit: "", precision: 0 },
{ id: "segmentedReplies", label: "Respuestas con mensajería segmentada", formula: "(leads * (segmentedReply / 100))", unit: "", precision: 0 },
{ id: "lift", label: "Incremento de respuestas por segmentación", formula: "(segmentedReplies - genericReplies)", unit: "", precision: 0 }
]}
insight="Con {segmentedReply}% de tasa de respuesta vs {genericReply}%, obtienes `{lift}` respuestas más por mes — eso son {lift \* 0.25} reuniones extra si el 25% de las respuestas convierten."
/>

---

## Errores Comunes de Etiquetado de Segmentos

<ProgressiveReveal title="5 Errores a Evitar" persistKey="ai-lead-research-L7-mistakes">

<RevealSection title="Error 1: Sobre-Segmentación">

**El problema:** Crear 50 etiquetas de segmento con 200 combinaciones posibles.

**Por qué falla:** No puedes escribir 200 variantes de mensajes. No puedes probar 200 variantes. No puedes mantener 200 variantes.

**La solución:** Empieza con 2-3 dimensiones y 2-4 etiquetas por dimensión. Eso es un máximo de 8-16 combinaciones. Expande solo cuando tengas datos que demuestren que un nuevo segmento necesita un mensaje diferente.

</RevealSection>

<RevealSection title="Error 2: Etiquetar Sin Variantes de Mensajes">

**El problema:** Construir un agente de etiquetado perfecto, luego enviar el mismo mensaje a todos de todos modos.

**Por qué falla:** Las etiquetas son inútiles si no cambian el comportamiento. Si no puedes escribir una primera línea diferente para una etiqueta, no crees la etiqueta.

**La solución:** Para cada etiqueta que crees, escribe la variante de mensaje correspondiente PRIMERO. Si no puedes, la etiqueta no es accionable.

</RevealSection>

<RevealSection title="Error 3: Etiquetas Subjetivas">

**El problema:** Etiquetas como "high_value," "interested," "good_fit" que se basan en la intuición, no en datos.

**Por qué falla:** La IA no puede asignar etiquetas subjetivas de manera confiable. Los humanos no están de acuerdo en etiquetas subjetivas. Las etiquetas subjetivas no escalan.

**La solución:** Cada etiqueta debe estar vinculada a datos observables: título de trabajo, tamaño de empresa, tech stack, financiamiento, actividad en LinkedIn, etc.

</RevealSection>

<RevealSection title="Error 4: Ignorar la Distribución de Etiquetas">

**El problema:** El 80% de los leads se etiquetan como `growth_stage + economic_buyer + attribution_gap`.

**Por qué falla:** Si la mayoría de los leads obtienen la misma etiqueta, no estás segmentando — simplemente estás etiquetando tu ICP.

**La solución:** Verifica la distribución de etiquetas después de la calibración. Si alguna combinación de etiquetas supera el 50% de los leads, tus segmentos son demasiado amplios. Refina.

</RevealSection>

<RevealSection title="Error 5: No Medir Tasas de Respuesta por Segmento">

**El problema:** Asumir que los mensajes segmentados funcionan mejor sin medirlo.

**Por qué falla:** Algunos segmentos podrían no responder de manera diferente. Algunas variantes de mensajes podrían rendir peor que las genéricas.

**La solución:** Rastrea las tasas de respuesta por etiqueta de segmento. Después de 50 envíos por segmento, compara. Refuerza los segmentos de alto rendimiento, revisa o fusiona los de bajo rendimiento.

</RevealSection>

</ProgressiveReveal>

---

## Sprint de Implementación: Construye Tu Agente de Etiquetado

Aprendiste la teoría. Ahora constrúyelo.

<InteractiveChecklist
title="Sprint de 7 Días de Etiquetado de Segmentos"
persistKey="ai-lead-research-L7-sprint"
items={[
"Día 1: Elige 2-3 dimensiones de segmento que importen para tu ICP",
"Día 2: Define 2-4 etiquetas por dimensión (8-16 combinaciones totales)",
"Día 3: Escribe el system prompt del agente de etiquetado con tus etiquetas",
"Día 4: Configura el etiquetado en Clay o n8n y ejecútalo en 30 leads de prueba",
"Día 5: Revisa las salidas — ajusta el prompt si la precisión es &lt;80%",
"Día 6: Escribe 1 variante de mensaje por combinación de etiquetas común",
"Día 7: Envía 50 emails segmentados y rastrea las tasas de respuesta por etiqueta"
]}
/>

### Tu Checklist del Agente de Etiquetado

Antes de lanzar tu agente de etiquetado a producción, verifica:

- [ ] El system prompt incluye las 5 dimensiones (o justifica por qué omites algunas)
- [ ] Las opciones de etiquetas están respaldadas por datos, no son subjetivas
- [ ] El formato de salida es JSON válido con razonamiento por etiqueta
- [ ] El agente fue probado en 30 leads con precisión >80%
- [ ] Cada combinación de etiquetas común tiene una variante de mensaje correspondiente
- [ ] La distribución de etiquetas está balanceada (ninguna etiqueta supera el 50% de los leads)
- [ ] El rastreo de tasas de respuesta está configurado por etiqueta de segmento

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Founders Técnicos">
Puedes construir lógica de etiquetado más sofisticada con código personalizado. Pero empieza simple. La mayoría de los founders sobre-ingenian la segmentación antes de tener suficientes datos para saber qué segmentos importan. Lanza el agente básico primero, luego agrega complejidad basada en datos de tasas de respuesta.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches y Consultores">
Tus segmentos podrían verse diferentes: "cliente corporativo vs. solopreneur," "buscador de certificación vs. comprador de transformación," "DIY vs. hecho para ti." Los mismos principios aplican — solo adapta las dimensiones a tu oferta de servicio.
</ContextualNote>

---

## Resumen: De Puntuaciones a Segmentos

Ahora tienes dos agentes de IA trabajando juntos:

1. **Agente de Puntuación (Lección 6):** Clasifica leads del 1 al 10 basándose en el ajuste al ICP y señales de compra
2. **Agente de Etiquetado de Segmentos (Esta Lección):** Categoriza leads en segmentos relevantes para mensajes

**La puntuación** te dice A QUIÉN contactar y CUÁNDO.  
**La segmentación** te dice CÓMO contactarlos.

La combinación es poderosa:

- Puntuación alta (8-10) + segmento de alta urgencia → Contacto personal inmediato
- Puntuación alta (8-10) + segmento de baja urgencia → Secuencia de nurture con contenido específico por segmento
- Puntuación media (5-7) + segmento de alta urgencia → Secuencia automatizada con primera línea específica por segmento
- Puntuación media (5-7) + segmento de baja urgencia → Newsletter + retargeting

**Próxima lección:** Construirás el agente de personalización que toma las etiquetas de segmento y genera primeras líneas personalizadas, propuestas de valor y icebreakers a escala.

Pero primero, lanza tu agente de etiquetado. 30 leads. 3 segmentos. 3 variantes de mensajes. Mide las tasas de respuesta.

Los datos te dirán si la segmentación funciona para tu ICP. Y si lo hace, nunca más enviarás un mensaje genérico.

---

## Quiz: Dominio del Etiquetado de Segmentos

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuál es la diferencia principal entre un agente de puntuación y un agente de etiquetado de segmentos?",
      "options": [
        "La puntuación es para priorización, el etiquetado es para personalización de mensajes",
        "La puntuación es automatizada, el etiquetado es manual",
        "La puntuación usa IA, el etiquetado usa reglas",
        "La puntuación es para B2B, el etiquetado es para B2C"
      ],
      "correctAnswer": 0,
      "explanation": "La puntuación clasifica leads por prioridad (1-10). El etiquetado los categoriza por contexto para impulsar mensajes diferentes."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Qué dimensión de segmento es MÁS importante para determinar el tono y la complejidad del mensaje?",
      "options": [
        "Etapa de la Empresa",
        "Rol del Comprador",
        "Prioridad de Dolor",
        "Nivel de Urgencia"
      ],
      "correctAnswer": 1,
      "explanation": "El Rol del Comprador determina CON QUIÉN estás hablando — los compradores económicos necesitan ROI, los champions necesitan beneficios para el equipo, los usuarios finales necesitan facilidad de uso."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "Tienes 200 leads calificados. Tu agente de etiquetado les asigna 180 a 'growth_stage + economic_buyer'. ¿Cuál es el problema?",
      "options": [
        "Tu ICP es demasiado estrecho",
        "Tus segmentos son demasiado amplios — no estás realmente segmentando",
        "Tu agente de etiquetado está roto",
        "Esto es normal y está bien"
      ],
      "correctAnswer": 1,
      "explanation": "Si el 90% de los leads obtienen la misma etiqueta, estás etiquetando tu ICP, no segmentando. Refina tus dimensiones para crear distinciones más accionables."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Cuál de estas es una etiqueta de segmento MALA?",
      "options": [
        "'attribution_gap' — basada en herramienta faltante en tech stack + publicación en LinkedIn",
        "'high_value' — basada en 'parece un buen ajuste'",
        "'active_evaluation' — basada en financiamiento reciente + señales de contratación",
        "'economic_buyer' — basada en título VP + autoridad de presupuesto"
      ],
      "correctAnswer": 1,
      "explanation": "'High_value' es subjetivo y no está vinculado a datos observables. Las buenas etiquetas están respaldadas por datos y son accionables."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "¿Cuántas variantes de mensajes debes escribir para 3 dimensiones con 3 etiquetas cada una (27 combinaciones posibles)?",
      "options": [
        "27 — una para cada combinación",
        "9 — una para cada etiqueta",
        "3-5 — solo para las combinaciones más comunes",
        "1 — la segmentación no requiere mensajes diferentes"
      ],
      "correctAnswer": 2,
      "explanation": "Empieza con 3-5 variantes para las combinaciones de etiquetas más comunes (las que aparecen en más del 10% de los leads). No sobre-ingenies antes de tener datos."
    }
  ]
}
```
