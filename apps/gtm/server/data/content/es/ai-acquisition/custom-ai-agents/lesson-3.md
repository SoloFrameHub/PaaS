---
title: "Agente 1: Agente de Investigación de Prospectos"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 3
---

# Agente 1: Agente de Investigación de Prospectos

## El Problema de los 15 Minutos por Prospecto

Estás mirando una hoja de cálculo con 200 perfiles de LinkedIn que acabas de exportar. Cada uno necesita investigación antes de que puedas escribir un correo personalizado. A 15 minutos por prospecto, eso son **50 horas de trabajo**.

La mayoría de los fundadores solos hacen una de dos cosas:

1. Se saltan la investigación y envían correos genéricos (2% de tasa de respuesta)
2. Investigan 10-20 prospectos y se rinden (agotamiento)

**Hay una tercera opción:** Construir un agente de IA que hace el 80% de la investigación en 2 minutos, y luego tú pasas 3 minutos revisando y añadiendo el insight humano que realmente importa.

<InsightCard icon="⚡" title="El ROI del Agente de Investigación">
A 50 prospectos/semana: 12.5 horas ahorradas semanalmente. Eso son 650 horas/año — o 16 semanas completas de trabajo — de vuelta en tu calendario.
</InsightCard>

Al final de esta lección, tendrás un Agente de Investigación de Prospectos funcional que:

- Extrae datos de LinkedIn, Crunchbase y Google News
- Genera un resumen de 1 página con señales de dolor y puntos de conexión
- Puntúa el ajuste al ICP y recomienda un ángulo de contacto
- Cuesta $0.01-0.02 por resumen

Vamos a construirlo.

---

## ¿Qué Hace a un Buen Agente de Investigación?

Antes de escribir una sola línea de código, definamos cómo luce algo "bueno".

<FlipCard 
  front="¿Cuál es la diferencia entre un prompt y un agente?" 
  back="Un prompt es una pregunta de una sola vez. Un agente es un sistema que toma un objetivo, accede a herramientas (APIs, bases de datos), toma decisiones en un bucle y produce una salida estructurada." 
/>

### Los 5 Componentes de un Agente de Investigación

<SlideNavigation>
<Slide title="1. Objetivo Claro">
**Objetivo malo:** "Investiga este prospecto"
**Objetivo bueno:** "Genera un resumen de 1 página con: resumen del prospecto, contexto de la empresa, 3 señales de dolor, 2 puntos de conexión y un ángulo de contacto recomendado. Puntúa el ajuste al ICP del 1 al 10."

Especificidad = consistencia. Los objetivos vagos producen resultados vagos.
</Slide>

<Slide title="2. Fuentes de Datos">
Tu agente necesita acceso a:
- **Datos de CRM** (nombre, email, empresa, rol)
- **LinkedIn** (perfil, publicaciones recientes, antigüedad)
- **Datos de empresa** (tamaño, financiación, stack tecnológico)
- **Noticias** (menciones recientes, eventos disparadores)

Cuantas más fuentes, más rico el resumen — pero también mayor costo y complejidad. Empieza con 2-3 fuentes.
</Slide>

<Slide title="3. Salida Estructurada">
El texto libre es difícil de usar. Tu agente debe producir:
- **Resumen en Markdown** (legible por humanos)
- **Campos estructurados** (puntuación ICP, canal recomendado, puntos clave de conversación)
- **Citas de fuentes** (para que puedas verificar los datos)

Esto hace que la salida sea accionable, no solo informativa.
</Slide>

<Slide title="4. Instrucciones Anti-Alucinación">
Los LLMs inventarán datos con total confianza si no los detienes.

**Instrucción crítica:** "Si no puedes encontrar información específica, escribe 'No encontrado' en lugar de adivinar. Incluye URLs de fuentes para todas las afirmaciones."

Esta sola línea reduce las alucinaciones del 15% al 1-3%.
</Slide>

<Slide title="5. Control de Calidad">
Revisa al azar el 10% de los resúmenes semanalmente. Fallos comunes:
- Títulos de trabajo alucinados
- Datos de empresa incorrectos (confundido con nombre similar)
- Señales de dolor genéricas (no específicas para esta persona)

**Mitigación:** Exige que el agente cite fuentes. Si no puede enlazar a una publicación de LinkedIn o artículo de noticias, no debería afirmarlo.
</Slide>
</SlideNavigation>

<RangeSlider 
  label="¿Cuánta investigación manual haces actualmente por prospecto?" 
  min={0} 
  max={30} 
  lowLabel="0 min (ninguna)" 
  highLabel="30+ min" 
  persistKey="custom-ai-agents-L3-research-time" 
/>

---

## La Plantilla del Resumen de Investigación

Aquí está la plantilla exacta que llenará tu agente. Este es el **formato de salida** — la estructura que hace que la investigación sea accionable.

<TemplateBuilder
title="Plantilla de Resumen de Investigación de Prospectos"
persistKey="custom-ai-agents-L3-template"
sections={[
{
id: "overview",
title: "1. Resumen del Prospecto",
fields: [
{ id: "role", label: "Rol y Antigüedad", placeholder: "ej., VP de Marketing en Acme Corp (2 años)", type: "text" },
{ id: "background", label: "Trayectoria", placeholder: "ej., Anteriormente en BigCo, MBA de la Universidad Estatal", type: "textarea" },
{ id: "linkedin", label: "Actividad en LinkedIn", placeholder: "ej., Publica 2-3x/semana sobre marketing de contenidos, 5K seguidores", type: "textarea" }
]
},
{
id: "company",
title: "2. Contexto de la Empresa",
fields: [
{ id: "size", label: "Tamaño y Etapa de la Empresa", placeholder: "ej., 150 empleados, Serie B ($20M recaudados)", type: "text" },
{ id: "tech", label: "Stack Tecnológico (si está disponible)", placeholder: "ej., HubSpot, Salesforce, Segment", type: "text" },
{ id: "news", label: "Noticias Recientes", placeholder: "ej., Lanzó nueva línea de productos el mes pasado (TechCrunch)", type: "textarea" }
]
},
{
id: "signals",
title: "3. Señales de Dolor",
fields: [
{ id: "signal1", label: "Señal 1", placeholder: "ej., Contratando 3 SDRs (LinkedIn Jobs) — probablemente escalando outbound", type: "textarea" },
{ id: "signal2", label: "Señal 2", placeholder: "ej., Publicó sobre desafíos de atribución (LinkedIn)", type: "textarea" },
{ id: "signal3", label: "Señal 3", placeholder: "ej., Usando 5+ herramientas martech (BuiltWith) — dolor de integración", type: "textarea" }
]
},
{
id: "connection",
title: "4. Puntos de Conexión",
fields: [
{ id: "mutual", label: "Conexiones Mutuas", placeholder: "ej., Conectado con Sarah J. (excolega)", type: "text" },
{ id: "shared", label: "Intereses Compartidos", placeholder: "ej., Ambos publican sobre IA en marketing", type: "text" }
]
},
{
id: "outreach",
title: "5. Contacto Recomendado",
fields: [
{ id: "channel", label: "Canal", placeholder: "ej., DM de LinkedIn (publica activamente)", type: "text" },
{ id: "hook", label: "Gancho", placeholder: "ej., Referencia su publicación sobre atribución", type: "textarea" },
{ id: "angle", label: "Ángulo de Valor", placeholder: "ej., Mostrar cómo resolvemos la atribución para empresas similares", type: "textarea" }
]
}
]}
/>

**Consejo pro:** Guarda esta plantilla. La usarás como el **prompt del sistema** para tu agente en la siguiente sección.

---

## Construyendo el Agente: Paso a Paso

Ahora convirtamos esa plantilla en un agente funcional. Usaremos **n8n** (el orquestador de la Lección 2) y **Claude Sonnet** (el LLM).

<ExampleCard label="¿Por qué n8n + Claude?">
**n8n** te da un constructor visual de flujos de trabajo con más de 400 integraciones. **Claude Sonnet** es el mejor balance entre calidad y costo para tareas de investigación ($0.01-0.02/resumen vs $0.05-0.15 para GPT-4o).

También puedes usar Zapier + GPT-4o, o Trigger.dev + cualquier LLM. El patrón es el mismo.
</ExampleCard>

### Paso 1: Configurar el Disparador

Tu agente necesita saber **cuándo** ejecutarse. Dos opciones:

<ComparisonBuilder
title="Disparador Basado en Eventos vs Programado"
persistKey="custom-ai-agents-L3-trigger"
prompt="¿Qué patrón de disparador se adapta a tu flujo de trabajo?"
expertExample="Basado en eventos: Nuevo contacto añadido al CRM → agente se ejecuta inmediatamente. Programado: Cada lunes a las 9am, el agente procesa todos los contactos añadidos en los últimos 7 días."
criteria={[
"¿Añades contactos en lotes o de uno en uno?",
"¿Necesitas investigación instantánea o puede esperar?",
"¿Cuántos contactos/semana añades?"
]}
/>

**Para la mayoría de los fundadores solos:** El basado en eventos es mejor. Añades un contacto, el agente se ejecuta y 2 minutos después tienes un resumen.

**Configuración en n8n:**

1. Nodo disparador: "Webhook" (si tu CRM puede enviar webhooks) o "CRM Watch" (sondea nuevos contactos)
2. Entrada: nombre del contacto, email, empresa, rol

### Paso 2: Recopilar Datos (En Paralelo Donde Sea Posible)

Tu agente necesita extraer datos de múltiples fuentes. Cuanto más puedas ejecutar **en paralelo**, más rápido será tu agente.

```
[Disparador: Nuevo Contacto]
    ↓
[Dividir en 3 ramas paralelas]
    ↓
Rama A: Datos de LinkedIn (CSV de Evaboot o pegado manual)
Rama B: Datos de empresa (API de Crunchbase o Clearbit)
Rama C: Noticias recientes (API de Google News o SerpAPI)
    ↓
[Fusionar ramas]
    ↓
[Pasar todos los datos al LLM]
```

<InsightCard icon="🔧" title="El Stack de Nivel Gratuito">
- **LinkedIn:** Pegado manual o exportación de Evaboot ($0)
- **Datos de empresa:** Nivel gratuito de Crunchbase (3 consultas/día) o Apollo.io (10K/mes gratis)
- **Noticias:** SerpAPI ($50/mes para 5K búsquedas) o RSS de Google News (gratis pero manual)

Costo total: $0-50/mes dependiendo del volumen.
</InsightCard>

**Configuración en n8n:**

1. Nodo HTTP Request (A): Obtener datos de LinkedIn desde tu CSV/campo de CRM
2. Nodo HTTP Request (B): Llamar a la API de Crunchbase o Apollo con el nombre de la empresa
3. Nodo HTTP Request (C): Llamar a SerpAPI con la consulta `{nombre empresa} noticias`, últimos 30 días
4. Nodo Merge: Combinar las 3 salidas en un objeto JSON

### Paso 3: Construir el Prompt de Investigación

Aquí es donde ocurre la magia. Le vas a dar a Claude:

- La plantilla (de antes)
- Todos los datos que acabas de recopilar
- Instrucciones anti-alucinación
- Tus criterios de ICP (para que pueda puntuar el ajuste)

<TemplateBuilder
title="Prompt del Sistema del Agente de Investigación"
persistKey="custom-ai-agents-L3-prompt"
sections={[
{
id: "role",
title: "Rol del Agente",
fields: [
{ id: "role_desc", label: "Descripción del Rol", placeholder: "Eres un asistente de investigación de ventas para un fundador solo que construye [tu producto/servicio].", type: "textarea" }
]
},
{
id: "task",
title: "Definición de Tarea",
fields: [
{ id: "task_desc", label: "Tarea", placeholder: "Genera un resumen de prospecto de 1 página para el contacto a continuación. Usa las fuentes de datos proporcionadas. Sigue exactamente la estructura de la plantilla.", type: "textarea" }
]
},
{
id: "constraints",
title: "Restricciones y Anti-Alucinación",
fields: [
{ id: "constraints_list", label: "Restricciones", placeholder: "- Si la información no está disponible, escribe 'No encontrado' en lugar de adivinar\n- Incluye URLs de fuentes para todas las afirmaciones de hechos\n- Las señales de dolor deben ser específicas para el rol y la etapa de la empresa de esta persona\n- Los puntos de conexión deben ser verificables (actividad en LinkedIn, conexiones mutuas)", type: "textarea" }
]
},
{
id: "icp",
title: "Criterios de Puntuación ICP",
fields: [
{ id: "icp_criteria", label: "Criterios ICP (del Curso 1)", placeholder: "Puntúa del 1 al 10 basado en:\n- Tamaño de empresa: 50-500 empleados (10 pts si está en rango)\n- Rol: Nivel VP/Director (10 pts si es sí)\n- Stack tecnológico: Usa HubSpot o Salesforce (10 pts si es sí)\n- Evento disparador reciente: Contratación, financiación o lanzamiento de producto (10 pts si es sí)", type: "textarea" }
]
}
]}
/>

**Estructura completa del prompt:**

```
PROMPT DEL SISTEMA:
{Tu descripción del rol}

TAREA:
{Definición de tarea}

DATOS DEL PROSPECTO:
Nombre: {nombre}
Email: {email}
Empresa: {empresa}
Rol: {rol}

DATOS DE LINKEDIN:
{linkedin_json}

DATOS DE EMPRESA:
{company_json}

NOTICIAS RECIENTES:
{news_json}

CRITERIOS ICP:
{icp_criteria}

RESTRICCIONES:
{constraints_list}

PLANTILLA DE SALIDA:
## Resumen del Prospecto: {nombre}
Generado: {fecha} | Puntuación ICP: __/10

### 1. Resumen del Prospecto
- Rol: ...
- Trayectoria: ...
- LinkedIn: ...

### 2. Contexto de la Empresa
- Tamaño: ... | Etapa: ...
- Stack Tecnológico: ...
- Noticias Recientes: ...

### 3. Señales de Dolor
- Señal 1: ...
- Señal 2: ...
- Señal 3: ...

### 4. Puntos de Conexión
- Conexiones mutuas: ...
- Intereses compartidos: ...

### 5. Ángulo de Contacto Recomendado
- Canal: ...
- Gancho: ...
- Propuesta de valor: ...
- CTA: ...
```

**Configuración en n8n:**

1. Nodo AI Agent: Claude Sonnet 4
2. Prompt del sistema: Pega el prompt completo de arriba
3. Tokens máximos: 1000
4. Temperatura: 0.3 (baja = más factual, menos creativo)

### Paso 4: Extraer Campos Estructurados

El LLM devolverá un resumen en markdown. También necesitas **datos estructurados** para tu CRM (puntuación ICP, canal recomendado, etc.).

Dos opciones:

1. **Extracción con regex** (rápido pero frágil): Analiza el markdown para encontrar `ICP Score: 8/10` y extrae el número
2. **Segunda llamada al LLM** (más lento pero confiable): Pide a Claude que devuelva JSON con `{icp_score: 8, channel: "LinkedIn", angle: "..."}`

**Recomendado:** Usa la salida JSON desde el principio. Modifica el prompt para que diga:

```
FORMATO DE SALIDA:
Devuelve un objeto JSON con:
{
  "brief_markdown": "...",
  "icp_score": 8,
  "recommended_channel": "LinkedIn",
  "outreach_angle": "Referencia su publicación sobre atribución",
  "key_talking_points": ["Punto 1", "Punto 2", "Punto 3"]
}
```

**Configuración en n8n:**

1. Nodo Code (JavaScript): Analiza la respuesta JSON
2. Extrae campos: `icp_score`, `recommended_channel`, `outreach_angle`, `key_talking_points`

### Paso 5: Guardar en CRM y Notificar

Último paso: actualiza tu CRM y notifícate si es un prospecto de alta prioridad.

**Configuración en n8n:**

1. Nodo de actualización de CRM (Airtable, Notion o la API de tu CRM):
   - Campo: `research_brief` → `{brief_markdown}`
   - Campo: `icp_score` → `{icp_score}`
   - Campo: `recommended_channel` → `{recommended_channel}`
   - Campo: `outreach_angle` → `{outreach_angle}`
   - Campo: `research_date` → `{today()}`
2. Nodo IF: `icp_score >= 8`
   - SÍ → Notificación de Slack: "Prospecto de alto ajuste: `{nombre}` (`{icp_score}`/10)"
   - NO → (no hacer nada)

---

## Probando Tu Agente

Has construido el flujo de trabajo. Ahora probémoslo con datos reales.

<InteractiveChecklist
title="Lista de Verificación para Probar el Agente"
persistKey="custom-ai-agents-L3-testing"
items={[
"Prueba con 3 prospectos reales de tu CRM",
"Verifica que todas las fuentes de datos devuelven resultados (LinkedIn, empresa, noticias)",
"Comprueba que las puntuaciones ICP coincidan con tu evaluación manual",
"Confirma que las señales de dolor son específicas (no genéricas)",
"Verifica que se incluyen las URLs de fuentes y son precisas",
"Prueba el fallback 'No encontrado' (usa un prospecto con datos mínimos)",
"Comprueba que los campos del CRM se actualizan correctamente",
"Confirma que la notificación de Slack se activa para prospectos de alto ajuste"
]}
/>

### Fallos Comunes y Soluciones

<ClassifyExercise
title="Clasifica Estos Fallos del Agente"
persistKey="custom-ai-agents-L3-failures"
categories={[
{ id: "data", label: "Problema de Fuente de Datos", color: "#ef4444" },
{ id: "prompt", label: "Problema de Prompt", color: "#f59e0b" },
{ id: "integration", label: "Problema de Integración", color: "#3b82f6" }
]}
items={[
{ id: "1", content: "El agente dice 'VP de Marketing' pero LinkedIn muestra 'Marketing Manager'", correctCategory: "data" },
{ id: "2", content: "Las señales de dolor son genéricas ('necesita crecer más rápido')", correctCategory: "prompt" },
{ id: "3", content: "El campo 'icp_score' del CRM queda en blanco después de que el agente se ejecuta", correctCategory: "integration" },
{ id: "4", content: "El agente inventa una ronda de financiación reciente que no ocurrió", correctCategory: "prompt" },
{ id: "5", content: "La sección de noticias siempre está vacía", correctCategory: "data" }
]}
/>

**Soluciones:**

- **Problema de fuente de datos:** Verifica credenciales de API, límites de velocidad y formato de respuesta. Añade manejo de errores.
- **Problema de prompt:** Añade restricciones más específicas. Ejemplo: "Las señales de dolor deben hacer referencia a una publicación específica de LinkedIn, oferta de empleo o artículo de noticias."
- **Problema de integración:** Verifica el mapeo de campos en tu nodo de actualización de CRM. Comprueba que la ruta JSON es correcta.

---

## La Economía de Tokens

Hablemos de costos. Cada vez que tu agente se ejecuta, pagas por:

1. **Llamadas a API** (LinkedIn, Crunchbase, noticias)
2. **Tokens del LLM** (entrada + salida)

<ScenarioSimulator
title="Calculadora de Costos del Agente de Investigación"
persistKey="custom-ai-agents-L3-cost"
levers={[
{ id: "prospects", label: "Prospectos por semana", min: 10, max: 500, step: 10, defaultValue: 50 },
{ id: "model", label: "Modelo", options: [
{ value: "sonnet", label: "Claude Sonnet ($0.015/resumen)" },
{ value: "haiku", label: "Claude Haiku ($0.001/resumen)" },
{ value: "gpt4o", label: "GPT-4o ($0.025/resumen)" }
], defaultValue: "sonnet" }
]}
outputs={[
{ id: "weekly", label: "Costo semanal del LLM", formula: "prospects * (model === 'sonnet' ? 0.015 : model === 'haiku' ? 0.001 : 0.025)", unit: "$", precision: 2 },
{ id: "monthly", label: "Costo mensual del LLM", formula: "weekly * 4.3", unit: "$", precision: 2 },
{ id: "yearly", label: "Costo anual del LLM", formula: "monthly * 12", unit: "$", precision: 2 }
]}
insight="A `{prospects}` prospectos/semana con `{model}`, gastas $`{monthly}`/mes en llamadas al LLM. Añade ~$10-50/mes para llamadas a API (Crunchbase, noticias). Total: ${monthly + 30}/mes."
/>

**Conclusión clave:** Incluso con 200 prospectos/semana con Claude Sonnet, gastas **$12-15/mes** en costos de LLM. Esto es insignificante comparado con las 50+ horas/mes que ahorras.

---

## Contexto B2B vs Creador

El agente de investigación funciona tanto para negocios B2B como para negocios de creadores, pero las **fuentes de datos** y las **señales de dolor** difieren.

<ConceptReframe
concept="Agente de Investigación de Prospectos"
defaultLens="technical-founder"
lenses={[
{
id: "technical-founder",
label: "Fundador de SaaS B2B",
explanation: "Investiga tamaño de empresa, stack tecnológico, financiación reciente, señales de contratación. Señales de dolor: desafíos de escala, dolor de integración, necesidades de cumplimiento. Fuentes de datos: Crunchbase, BuiltWith, LinkedIn Jobs."
},
{
id: "coach",
label: "Coach/Consultor",
explanation: "Investiga el modelo de negocio del cliente, tamaño del equipo, etapa de ingresos, lanzamientos recientes. Señales de dolor: limitaciones de capacidad, desafíos de adquisición de clientes, precios/posicionamiento. Fuentes de datos: LinkedIn, sitio web, apariciones en podcasts."
},
{
id: "creator",
label: "Creador de Contenido",
explanation: "Investiga tamaño de audiencia, frecuencia de contenido, modelo de monetización, plataformas de comunidad. Señales de dolor: meseta de crecimiento de audiencia, brechas de monetización, consistencia de contenido. Fuentes de datos: Social Blade, YouTube Analytics (si se comparte), datos públicos de Patreon/Substack."
}
]}
/>

**Campos específicos de creadores para añadir:**

- Tamaño de audiencia (suscriptores de YouTube, estimación de lista de email, seguidores de Twitter)
- Frecuencia de contenido (publicaciones/semana, subidas de video/mes)
- Modelo de monetización (anuncios, patrocinios, cursos, membresías)
- Plataformas de comunidad (Discord, Slack, Circle)
- Lanzamientos recientes (nuevo curso, producto, comunidad)

---

## Tu Turno: Construye el Agente

Has visto el blueprint. Ahora es momento de construir el tuyo.

<ProgressiveReveal title="Sprint de Construcción del Agente (45 minutos)" persistKey="custom-ai-agents-L3-sprint">
<RevealSection title="Paso 1: Elige Tu Stack (5 min)">
**Decisión:**
- Orquestador: n8n (autoalojado o en la nube) vs Zapier vs Make
- LLM: Claude Sonnet vs Haiku vs GPT-4o
- Fuentes de datos: LinkedIn (manual/Evaboot), Crunchbase (nivel gratuito), SerpAPI (noticias)

**Acción:** Regístrate para cuentas si es necesario. Obtén claves de API.
</RevealSection>

<RevealSection title="Paso 2: Configura el Flujo de Trabajo (10 min)">
**Acción:**
1. Crea un nuevo flujo de trabajo en tu orquestador
2. Añade disparador (webhook o CRM watch)
3. Añade 3 nodos HTTP Request (LinkedIn, empresa, noticias) en paralelo
4. Añade nodo Merge
5. Prueba con 1 prospecto — verifica que los datos se devuelven correctamente
</RevealSection>

<RevealSection title="Paso 3: Construye el Prompt (15 min)">
**Acción:**
1. Copia la plantilla del Prompt del Sistema del Agente de Investigación (de antes)
2. Completa tus criterios de ICP (del Curso 1)
3. Añade tu descripción de rol y restricciones
4. Añade nodo AI Agent (Claude o GPT)
5. Pega el prompt completo
6. Configura tokens máximos: 1000, temperatura: 0.3
7. Prueba con 1 prospecto — revisa la salida
</RevealSection>

<RevealSection title="Paso 4: Extrae y Guarda (10 min)">
**Acción:**
1. Modifica el prompt para producir JSON (resumen + campos estructurados)
2. Añade nodo Code para analizar JSON
3. Añade nodo de actualización de CRM
4. Mapea campos: `research_brief`, `icp_score`, `recommended_channel`, `outreach_angle`
5. Prueba con 1 prospecto — verifica que el CRM se actualiza
</RevealSection>

<RevealSection title="Paso 5: Añade Notificaciones (5 min)">
**Acción:**
1. Añade nodo IF: `icp_score >= 8`
2. Añade notificación de Slack/email para prospectos de alto ajuste
3. Prueba con un prospecto de alto y bajo ajuste
4. Confirma que las notificaciones funcionan correctamente
</RevealSection>
</ProgressiveReveal>

---

## Control de Calidad: La Regla del 10% de Revisión Aleatoria

Tu agente está activo. Pero ¿cómo sabes que funciona bien?

**La regla:** Revisa aleatoriamente el 10% de los resúmenes semanalmente. Busca:

1. **Alucinaciones** (datos que no están en la fuente)
2. **Señales de dolor genéricas** (podrían aplicarse a cualquiera)
3. **Datos de empresa incorrectos** (confundido con nombre similar)
4. **Citas faltantes** (afirmaciones sin URLs de fuentes)

<LinterFeedback
title="Linter de Resúmenes de Investigación"
persistKey="custom-ai-agents-L3-linter"
inputLabel="Pega un resumen de investigación de tu agente"
rules={[
{
id: "citations",
label: "Citas de Fuentes",
description: "Todas las afirmaciones de hechos incluyen URLs de fuentes",
keywords: ["linkedin.com", "crunchbase.com", "techcrunch.com", "source:"],
antiKeywords: []
},
{
id: "specificity",
label: "Señales de Dolor Específicas",
description: "Las señales de dolor hacen referencia a eventos, publicaciones o datos específicos",
keywords: ["publicó sobre", "contratando para", "lanzó", "anunció"],
antiKeywords: ["necesita crecer", "quiere escalar", "busca mejorar"]
},
{
id: "icp_score",
label: "Puntuación ICP Presente",
description: "El resumen incluye una puntuación ICP (1-10)",
keywords: ["ICP Score:", "/10"],
antiKeywords: []
},
{
id: "not_found",
label: "Brechas Honestas",
description: "Usa 'No encontrado' cuando los datos no están disponibles",
keywords: ["No encontrado", "No disponible", "No se puede verificar"],
antiKeywords: []
}
]}
/>

**Si encuentras problemas:**

- **Alucinaciones:** Fortalece la instrucción anti-alucinación. Añade: "No inferas ni supongas. Solo afirma hechos que puedas citar."
- **Señales genéricas:** Añade ejemplos de señales de dolor buenas vs malas al prompt.
- **Datos incorrectos:** Verifica las respuestas de la API de tu fuente de datos. ¿El nombre de la empresa coincide exactamente?

---

## Próximos Pasos: De la Investigación al Contacto

Ahora tienes un Agente de Investigación de Prospectos funcional. Cada nuevo contacto recibe un resumen de 1 página en 2 minutos.

**¿Qué sigue?**

En la **Lección 4**, construirás el **Agente 2: Agente de Primer Borrador de Email**. Este:

- Tomará el resumen de investigación como entrada
- Generará 3 variantes de email personalizadas (diferentes ganchos/ángulos)
- Las pasará por el Sales Linter (del Curso 21)
- Guardará borradores en tu CRM para revisión humana

**La transferencia:** Agente 1 (investigación) → Agente 2 (borrador de email) → Tú (revisión + envío).

<InteractiveChecklist
title="Antes de la Lección 4: Acciones a Tomar"
persistKey="custom-ai-agents-L3-actions"
items={[
"Construye tu flujo de trabajo del Agente de Investigación de Prospectos (sprint de 45 min arriba)",
"Prueba con 5 prospectos reales de tu CRM",
"Revisa los 5 resúmenes para detectar alucinaciones y especificidad",
"Calcula tu costo semanal (usa la calculadora de arriba)",
"Guarda tu mejor resumen como ejemplo de referencia",
"Documenta cualquier fallo o caso límite que encuentres"
]}
/>

---

## Quiz de la Lección 3

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuál es el objetivo principal de la instrucción anti-alucinación en tu prompt de investigación?",
      "options": [
        "Hacer que el agente se ejecute más rápido",
        "Reducir costos usando menos tokens",
        "Evitar que el LLM invente datos cuando no están disponibles",
        "Mejorar la calidad de escritura del resumen"
      ],
      "correctAnswer": 2,
      "explanation": "La instrucción anti-alucinación ('Si la información no está disponible, escribe No encontrado en lugar de adivinar') evita que el LLM invente datos con total confianza. Esto reduce las alucinaciones del 15% al 1-3%."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Por qué deberías ejecutar la recopilación de datos (LinkedIn, empresa, noticias) en paralelo en lugar de secuencialmente?",
      "options": [
        "Es más fácil de depurar",
        "Reduce el tiempo total de ejecución",
        "Cuesta menos",
        "Mejora la calidad de los datos"
      ],
      "correctAnswer": 1,
      "explanation": "La ejecución paralela significa que las 3 llamadas a API ocurren al mismo tiempo, reduciendo el tiempo total de espera de 6 segundos (2+2+2 secuencial) a 2 segundos (todos a la vez). Esto hace que tu agente sea 3 veces más rápido."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "A 50 prospectos/semana usando Claude Sonnet ($0.015/resumen), ¿cuál es tu costo mensual aproximado del LLM?",
      "options": ["$3-4", "$10-12", "$25-30", "$50-60"],
      "correctAnswer": 0,
      "explanation": "50 prospectos/semana × $0.015/resumen = $0.75/semana. $0.75 × 4.3 semanas = ~$3.22/mes. Incluso con alto volumen, los costos del LLM son insignificantes comparados con el tiempo ahorrado."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Cuál es la configuración de temperatura recomendada para un agente de investigación?",
      "options": [
        "0.0 (determinista)",
        "0.3 (baja creatividad)",
        "0.7 (equilibrado)",
        "1.0 (alta creatividad)"
      ],
      "correctAnswer": 1,
      "explanation": "La temperatura 0.3 es lo suficientemente baja para priorizar la precisión factual sobre la creatividad, pero no tan baja que las salidas se vuelvan robóticas. La investigación necesita consistencia y precisión, no variación creativa."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "¿Qué deberías hacer si tu agente produce constantemente señales de dolor genéricas como 'necesita crecer más rápido'?",
      "options": [
        "Cambiar a un modelo de LLM más costoso",
        "Aumentar la configuración de temperatura",
        "Añadir ejemplos específicos de señales de dolor buenas vs malas al prompt",
        "Reducir el límite máximo de tokens"
      ],
      "correctAnswer": 2,
      "explanation": "Las salidas genéricas son un problema de prompt, no un problema de modelo. Añadir ejemplos de señales de dolor específicas (ej., 'Publicó sobre desafíos de atribución en LinkedIn') enseña al agente cómo luce algo bueno."
    }
  ]
}
```
