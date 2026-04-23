---
title: "Construyendo el Agente de Investigación de Prospectos"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 5
---

## El Problema de los 15 Minutos de Investigación

Tienes 200 prospectos en tu hoja de cálculo. Cada uno necesita outreach personalizado. Si dedicas 15 minutos por prospecto haciendo investigación manual — leyendo su LinkedIn, revisando noticias de la empresa, buscando ganchos de conversación — eso es **50 horas de trabajo**.

La mayoría de los fundadores solos se saltan la investigación. Envían plantillas genéricas. Las tasas de respuesta caen en picada.

Pero esto es lo que cambió en 2025: **los agentes de investigación de IA pueden hacer el 80% de ese trabajo en 60 segundos por prospecto.**

No perfectamente. No sin supervisión. Pero lo suficientemente bien como para que puedas personalizar a escala sin quemar los fines de semana espiando perfiles de LinkedIn.

Esta lección te enseña a construir un agente de investigación de prospectos que:

- Toma un nombre + empresa
- Devuelve un resumen de investigación completo en 30-60 segundos
- Cuesta $0.01-0.05 por prospecto
- Produce 3+ ganchos de conversación por persona

Al final, tendrás un agente de investigación funcional y una biblioteca de prompts que puedes desplegar en Clay, n8n o una simple Google Sheet.

<InsightCard icon="⚡" title="El Multiplicador de Investigación 10x">
Los agentes de investigación de IA no reemplazan el juicio humano — comprimen 15 minutos de navegación en 60 segundos de salida estructurada. Tú sigues revisando. Tú sigues agregando el toque humano. Pero lo haces 10 veces más rápido.
</InsightCard>

---

## Qué Hace Realmente un Agente de Investigación

Un agente de investigación de prospectos es un sistema de IA que toma una entrada mínima (nombre, título, empresa, dominio) y devuelve un resumen estructurado con:

1. **Descripción de la Empresa** — Qué hacen, a quién sirven, etapa de crecimiento
2. **Noticias Recientes** — Financiamiento, lanzamientos de productos, cambios de liderazgo, menciones en prensa
3. **Desafíos Clave** — Puntos de dolor probables basados en industria, tamaño y etapa
4. **Señales del Stack Tecnológico** — Tecnologías que usan (de ofertas de trabajo, BuiltWith, etc.)
5. **Ganchos de Conversación** — 3-5 ángulos específicos para outreach personalizado
6. **Ángulo de Personalización** — Mejor enfoque basado en todo lo anterior

Aquí se ve en la práctica:

<ExampleCard label="Resumen de Investigación: Sarah Chen, VP de Marketing en Acme Corp">

**Entrada:**

- Nombre: Sarah Chen
- Título: VP de Marketing
- Empresa: Acme Corp
- Dominio: acmecorp.com
- LinkedIn: linkedin.com/in/sarahchen

**Salida Generada por IA (60 segundos):**

```json
{
  "company_overview": "Acme Corp es una plataforma SaaS B2B para analítica de cadena de suministro, sirviendo a fabricantes del mercado medio. 150 empleados, financiada con Serie A.",
  "recent_news": "Cerró $5M de Serie A en enero 2026 (TechCrunch). Lanzó nueva función de analítica predictiva en diciembre 2025.",
  "key_challenges": "Probablemente escalando marketing post-financiamiento. La oferta de trabajo para 'Demand Gen Manager' sugiere que están construyendo outbound. Las reseñas de G2 mencionan 'excelente producto, necesita mejor onboarding'.",
  "tech_stack_signals": "Usa HubSpot (oferta de trabajo), Salesforce (página de empresa en LinkedIn), Slack (página de carreras). Sin mención de herramientas de automatización de outreach.",
  "conversation_hooks": [
    "Felicidades por la Serie A — vi el artículo en TechCrunch",
    "Noté que están contratando para demand gen; ayudamos a equipos a escalar outbound sin agregar headcount",
    "Tus reseñas de G2 son sólidas — los clientes aman la analítica pero mencionan fricción en el onboarding"
  ],
  "personalization_angle": "Lidera con felicitaciones por el financiamiento, gira hacia el desafío de escalar (contratación de demand gen), ofrece ayuda con infraestructura de outbound.",
  "confidence_score": "high"
}
```

</ExampleCard>

Ese resumen le tomó a un agente de IA 60 segundos. Te tomaría 15-20 minutos compilarlo manualmente.

<RangeSlider 
  label="¿Cuánto tiempo dedicas actualmente a investigar cada prospecto antes del outreach?" 
  min={0} 
  max={30} 
  lowLabel="0 min (ninguno)" 
  highLabel="30+ min" 
  persistKey="ai-lead-research-L5-research-time" 
/>

---

## La Arquitectura del Agente de Investigación

Así es como funciona un agente de investigación bajo el capó:

<SlideNavigation>
<Slide title="Paso 1: Recopilación de Entrada">

El agente necesita datos mínimos para empezar:

- **Requeridos:** Nombre, apellido, nombre de empresa, dominio de empresa
- **Opcionales pero útiles:** Título, URL de LinkedIn, ubicación

Estos datos provienen de tu pipeline de enriquecimiento (Lecciones 3-4). Si ya ejecutaste el enriquecimiento en cascada, tienes todo lo necesario.

**Ejemplo de JSON de Entrada:**

```json
{
  "first_name": "Sarah",
  "last_name": "Chen",
  "title": "VP of Marketing",
  "company": "Acme Corp",
  "domain": "acmecorp.com",
  "linkedin_url": "linkedin.com/in/sarahchen"
}
```

</Slide>

<Slide title="Paso 2: Recopilación de Datos">

El agente extrae información de múltiples fuentes:

**Fuentes Primarias:**

- Sitio web de la empresa (página de inicio, sobre nosotros, blog)
- Resultados recientes de Google News para la empresa
- Página de empresa en LinkedIn (si está disponible)
- Crunchbase (datos de financiamiento)
- BuiltWith o similar (stack tecnológico)
- Reseñas de G2/Capterra (retroalimentación de clientes)

**En Clay:** Usa columnas de enriquecimiento HTTP para obtener contenido del sitio web, API de Google News, API de Crunchbase.

**En n8n:** Usa nodos de Solicitud HTTP para hacer scraping de páginas, nodos de API para datos estructurados.

**En Scripts Personalizados:** Usa librerías como `requests` (Python) o `axios` (Node.js) para obtener datos.

</Slide>

<Slide title="Paso 3: Procesamiento con IA">

El agente envía todos los datos recopilados a un LLM (GPT-4, Claude, etc.) con un prompt estructurado:

**Patrón de Prompt del Sistema:**

```
Eres un agente de investigación de prospectos B2B. Dados los datos brutos sobre una persona
y su empresa, produce un resumen de investigación estructurado.

REGLAS:
- Solo incluye hechos que puedas verificar con los datos proporcionados
- Si falta información, escribe "No encontrado"
- Nunca inventes ni supongas
- Enfócate en perspectivas relevantes para ventas
- Mantén la salida en menos de 200 palabras

FORMATO DE SALIDA: [Esquema JSON]
```

El LLM procesa los datos y devuelve JSON estructurado.

</Slide>

<Slide title="Paso 4: Control de Calidad">

Antes de usar la salida, aplica controles de calidad:

**Verificaciones Anti-Alucinación:**

- ¿La descripción de la empresa coincide con el sitio web?
- ¿Los elementos de noticias tienen fecha y son verificables?
- ¿Los ganchos de conversación hacen referencia a eventos reales?

**Puntuación de Confianza:**

- Confianza alta: 3+ puntos de datos verificados
- Confianza media: 1-2 puntos de datos verificados
- Confianza baja: Principalmente inferido o genérico

**Umbral de Revisión Humana:**

- Prospectos Tier A (puntuación 8-10): Siempre revisión humana
- Prospectos Tier B (puntuación 5-7): Verificar al azar el 10%
- Prospectos Tier C (puntuación 1-4): Aprobación automática

</Slide>

<Slide title="Paso 5: Salida y Almacenamiento">

El agente produce JSON estructurado que alimenta tu sistema de personalización (Curso 24).

**Opciones de Almacenamiento:**

- Clay: Guardar en columnas de la tabla de enriquecimiento
- Google Sheets: Escribir en nuevas columnas
- CRM: Enviar a campos personalizados en HubSpot/Salesforce
- Archivo JSON: Exportar para procesamiento por lotes

El resumen de investigación se convierte en la entrada para primeras líneas generadas por IA, rompehielos y propuestas de valor.

</Slide>
</SlideNavigation>

---

## Construyendo tu Primer Agente de Investigación (Clay)

Clay lo hace más fácil para fundadores no técnicos. Aquí está el paso a paso:

<TemplateBuilder
title="Configuración del Agente de Investigación en Clay"
persistKey="ai-lead-research-L5-clay-config"
sections={[
{
id: "inputs",
title: "Columnas de Entrada",
fields: [
{ id: "name_col", label: "Columna de Nombre", placeholder: "ej., Nombre", type: "text" },
{ id: "company_col", label: "Columna de Empresa", placeholder: "ej., Empresa", type: "text" },
{ id: "domain_col", label: "Columna de Dominio", placeholder: "ej., Dominio", type: "text" },
{ id: "linkedin_col", label: "Columna de URL de LinkedIn (opcional)", placeholder: "ej., URL de LinkedIn", type: "text" }
]
},
{
id: "data_sources",
title: "Fuentes de Datos a Obtener",
fields: [
{ id: "website", label: "¿Obtener sitio web de la empresa?", type: "checkbox" },
{ id: "news", label: "¿Obtener noticias recientes?", type: "checkbox" },
{ id: "crunchbase", label: "¿Obtener datos de Crunchbase?", type: "checkbox" },
{ id: "builtwith", label: "¿Obtener stack tecnológico?", type: "checkbox" }
]
},
{
id: "ai_config",
title: "Configuración del Modelo de IA",
fields: [
{ id: "model", label: "Modelo", placeholder: "gpt-4o o claude-3-5-sonnet", type: "text" },
{ id: "max_tokens", label: "Máximo de Tokens de Salida", placeholder: "500", type: "text" },
{ id: "temperature", label: "Temperatura (0-1)", placeholder: "0.3", type: "text" }
]
}
]}
/>

**Pasos de Configuración en Clay:**

1. **Agregar Columna de Enriquecimiento HTTP** para el sitio web de la empresa
   - URL: `https://{{domain}}`
   - Extraer: HTML completo de la página o solo la meta descripción

2. **Agregar Enriquecimiento de Google News** (si está disponible en las integraciones de Clay)
   - Consulta: `{{company}} noticias`
   - Rango de fechas: Últimos 6 meses

3. **Agregar Enriquecimiento de Crunchbase** (si tienes acceso a la API)
   - Entrada: Dominio de la empresa
   - Salida: Financiamiento, número de empleados, descripción

4. **Agregar Columna de Investigación de IA**
   - Tipo: "Usar IA"
   - Modelo: GPT-4o o Claude 3.5 Sonnet
   - Prompt: [Ver siguiente sección]
   - Columnas de entrada: Todos los datos de los pasos 1-3
   - Salida: JSON parseado en columnas separadas

5. **Parsear la Salida JSON** en columnas individuales
   - `company_overview`
   - `recent_news`
   - `conversation_hooks` (array)
   - `personalization_angle`
   - `confidence_score`

<InsightCard icon="💰" title="Costo en Créditos de Clay">
Un flujo de trabajo completo de agente de investigación en Clay usa 2-5 créditos por prospecto:
- 1 crédito para enriquecimiento HTTP (sitio web)
- 1 crédito para noticias/Crunchbase (si se usa)
- 1-2 créditos para procesamiento de IA
- Total: ~$0.14-0.35 por prospecto con los precios de Clay
</InsightCard>

---

## El Prompt del Agente de Investigación (Listo para Copiar y Pegar)

Aquí está un prompt listo para producción que puedes usar en Clay, n8n o cualquier API de LLM:

```
Eres un agente de investigación de prospectos B2B. Dado información sobre una persona
y su empresa, produce un resumen de investigación para outreach de ventas.

DATOS DE ENTRADA:
- Nombre: {{first_name}} {{last_name}}
- Título: {{title}}
- Empresa: {{company}}
- Dominio: {{domain}}
- Contenido del Sitio Web: {{website_html}}
- Noticias Recientes: {{news_results}}
- Datos de Financiamiento: {{crunchbase_data}}
- Stack Tecnológico: {{builtwith_data}}

REGLAS:
1. Solo incluye hechos que puedas verificar con los datos proporcionados
2. Si no puedes encontrar información para un campo, escribe "No encontrado"
3. Nunca inventes, supongas ni alucines información
4. Enfócate en información útil para una conversación de ventas
5. Mantén el resumen en menos de 200 palabras en total
6. Proporciona 3-5 ganchos de conversación específicos, no declaraciones genéricas

FORMATO DE SALIDA (JSON):
{
  "company_overview": "1-2 oraciones sobre qué hace la empresa y a quién sirve",
  "recent_news": "Evento notable más reciente (financiamiento, lanzamiento, contratación, mención en prensa) con fecha",
  "key_challenges": "Puntos de dolor probables basados en la etapa, industria y datos disponibles de la empresa",
  "tech_stack_signals": "Tecnologías que usan o probablemente usen según ofertas de trabajo o BuiltWith",
  "conversation_hooks": [
    "Gancho específico 1 (hacer referencia a evento o punto de datos real)",
    "Gancho específico 2",
    "Gancho específico 3"
  ],
  "personalization_angle": "Mejor enfoque para outreach basado en toda la investigación",
  "confidence_score": "high/medium/low basado en calidad de los datos"
}

PUNTUACIÓN DE CONFIANZA:
- Alta: 3+ puntos de datos verificados (noticias, financiamiento, stack tecnológico, ofertas de trabajo)
- Media: 1-2 puntos de datos verificados
- Baja: Solo información genérica/inferida

Comenzar investigación:
```

<FlipCard 
  front="Por qué 'Nunca inventes ni alucines' importa" 
  back="Los LLMs inventarán con confianza hechos que suenan plausibles si no se los limita. Una ronda de financiamiento falsa o un lanzamiento de producto inventado destruye tu credibilidad. Siempre incluye instrucciones anti-alucinación." 
/>

---

## Construyendo en n8n (Alternativa Económica)

Si tienes presupuesto ajustado o quieres más control, construye el agente de investigación en n8n:

<SlideNavigation>
<Slide title="Descripción General del Flujo de Trabajo en n8n">

**Nodos:**

1. **Disparador:** Webhook o fila agregada en Google Sheets
2. **Solicitud HTTP:** Obtener sitio web de la empresa
3. **Solicitud HTTP:** Búsqueda de Google News
4. **Solicitud HTTP:** API de Crunchbase (opcional)
5. **Nodo OpenAI/Claude:** Procesar todos los datos con el prompt de investigación
6. **Nodo Google Sheets:** Escribir la salida de vuelta en la hoja

**Costo:** Solo llamadas a la API (~$0.02-0.05 por prospecto)

**Tiempo de construcción:** 2-3 horas para el primer flujo de trabajo

</Slide>

<Slide title="Nodo 1: Disparador">

**Disparador de Webhook:**

```json
{
  "first_name": "Sarah",
  "last_name": "Chen",
  "title": "VP of Marketing",
  "company": "Acme Corp",
  "domain": "acmecorp.com"
}
```

O **Disparador de Google Sheets:** Nueva fila agregada a la hoja "Prospectos"

</Slide>

<Slide title="Nodo 2: Obtener Sitio Web">

**Nodo de Solicitud HTTP:**

- Método: GET
- URL: `https://{{$json.domain}}`
- Respuesta: HTML completo o extraer `<meta name="description">`

**Manejo de Errores:** Si el sitio web no carga, configurar `website_content = "No disponible"`

</Slide>

<Slide title="Nodo 3: Obtener Noticias">

**Nodo de Solicitud HTTP (Google News):**

- URL: `https://news.google.com/rss/search?q={{$json.company}}`
- Parsear feed RSS
- Extraer: Top 3 titulares + fechas

**Alternativa:** Usar NewsAPI.org ($0 para 100 solicitudes/día)

</Slide>

<Slide title="Nodo 4: Procesamiento con IA">

**Nodo OpenAI (o Claude vía HTTP):**

- Modelo: `gpt-4o` o `claude-3-5-sonnet-20241022`
- Prompt del Sistema: [Prompt del agente de investigación de arriba]
- Mensaje del Usuario: Inyectar todos los datos recopilados
- Máximo de Tokens: 500
- Temperatura: 0.3 (más bajo = más factual)

**Salida:** Cadena JSON

</Slide>

<Slide title="Nodo 5: Parsear y Almacenar">

**Nodo de Función:** Parsear cadena JSON a objeto

**Nodo de Google Sheets:**

- Operación: Actualizar fila
- Escribir campos parseados en columnas:
  - `company_overview`
  - `recent_news`
  - `conversation_hook_1`
  - `conversation_hook_2`
  - `conversation_hook_3`
  - `personalization_angle`
  - `confidence_score`

</Slide>
</SlideNavigation>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Puedes construir esto en Python con las librerías `requests` + `openai` en ~100 líneas de código. Almacena los resultados en PostgreSQL o Airtable. Costo total: solo uso de API. Tiempo de construcción: 1-2 horas.
</ContextualNote>

---

## Control de Calidad: El Protocolo de Confiar pero Verificar

Los agentes de investigación de IA son rápidos pero no perfectos. Así es como detectar alucinaciones y salidas de baja calidad:

### La Regla del Verificación del 10%

Por cada 100 prospectos investigados:

1. Revisa manualmente 10 resúmenes de investigación (muestra aleatoria)
2. Verifica cada hecho contra los datos de origen
3. Cuenta las alucinaciones (hechos inventados)
4. Si la tasa de alucinaciones es mayor al 10%, reescribe el prompt con reglas más estrictas
5. Si la tasa de alucinaciones es menor al 5%, aprueba para producción

<InteractiveChecklist
title="Lista de Verificación de Calidad de Investigación (Revisa 10 Resúmenes)"
persistKey="ai-lead-research-L5-quality-check"
items={[
"La descripción de la empresa coincide con la descripción del sitio web/LinkedIn",
"Los elementos de noticias tienen fecha y son verificables vía Google",
"Los ganchos de conversación hacen referencia a eventos reales (no genéricos)",
"Las afirmaciones del stack tecnológico coinciden con las ofertas de trabajo o datos de BuiltWith",
"Sin rondas de financiamiento inventadas o lanzamientos de productos",
"La puntuación de confianza coincide con la calidad de los datos (alta = 3+ fuentes)",
"El ángulo de personalización es específico, no como una plantilla",
"Sin texto de marcador de posición como '[Nombre de la Empresa]' en la salida",
"Tasa de alucinaciones menor al 10% en la muestra",
"La salida es accionable para outreach (no solo hechos)"
]}
/>

### Señales de Alerta a Observar

<ClassifyExercise
title="Clasifica Estas Salidas de Investigación"
persistKey="ai-lead-research-L5-classify"
categories={[
{ id: "good", label: "Alta Calidad", color: "#10b981" },
{ id: "medium", label: "Necesita Revisión", color: "#f59e0b" },
{ id: "bad", label: "Riesgo de Alucinación", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Noticias recientes: Acme Corp cerró $5M de Serie A en enero 2026 (TechCrunch)",
correctCategory: "good",
explanation: "Específico, con fecha, fuente citable"
},
{
id: "2",
content: "Noticias recientes: La empresa está creciendo rápidamente y expandiéndose",
correctCategory: "bad",
explanation: "Genérico, sin fuente, probablemente alucinado"
},
{
id: "3",
content: "Stack tecnológico: Usa HubSpot (mencionado en oferta de trabajo para rol de Marketing Ops)",
correctCategory: "good",
explanation: "Señal verificable de oferta de trabajo"
},
{
id: "4",
content: "Stack tecnológico: Probablemente usa Salesforce, Marketo y Outreach.io",
correctCategory: "medium",
explanation: "Inferido, no verificado — necesita verificación humana"
},
{
id: "5",
content: "Desafíos clave: Tiene dificultades con la retención de clientes y la pérdida",
correctCategory: "bad",
explanation: "Sin evidencia proporcionada — pura especulación"
},
{
id: "6",
content: "Desafíos clave: Las reseñas de G2 mencionan 'excelente producto, necesita mejor onboarding'",
correctCategory: "good",
explanation: "Específico, verificable desde G2"
}
]}
/>

---

## La Biblioteca de Prompts del Agente de Investigación

Diferentes ICPs necesitan diferentes ángulos de investigación. Aquí hay 5 prompts listos para usar:

<ProgressiveReveal title="5 Prompts de Agente de Investigación" persistKey="ai-lead-research-L5-prompts">

<RevealSection title="1. SaaS B2B General">

```
Estás investigando un prospecto de SaaS B2B. Enfócate en:
- Etapa de la empresa (startup, crecimiento, enterprise)
- Señales de financiamiento o crecimiento recientes
- Stack tecnológico (especialmente herramientas de ventas/marketing)
- Actividad de contratación (roles de ventas, marketing, customer success)
- Retroalimentación de clientes (reseñas de G2, Capterra)

Los ganchos de conversación deben hacer referencia a:
- Anuncios de financiamiento
- Lanzamientos de productos
- Contratación para roles relevantes
- Puntos de dolor mencionados en reseñas
- Movimientos competitivos

Salida: [Esquema JSON estándar]
```

</RevealSection>

<RevealSection title="2. Empresas de Servicios/Consultoría">

```
Estás investigando un prospecto de una empresa de servicios/consultoría. Enfócate en:
- Tipos y sectores de clientes que atienden
- Tamaño del equipo y trayectoria de crecimiento
- Liderazgo de pensamiento (posts de blog, webinars, conferencias)
- Casos de estudio o victorias con clientes recientes
- Desafíos operativos (escala, entrega, ventas)

Los ganchos de conversación deben hacer referencia a:
- Contenido reciente que publicaron
- Victorias con clientes o casos de estudio
- Tendencias de la industria sobre las que están escribiendo
- Puntos de dolor operativos (procesos manuales, escala)

Salida: [Esquema JSON estándar]
```

</RevealSection>

<RevealSection title="3. ICPs de Creadores/Coaches">

```
Estás investigando a un creador o coach. Enfócate en:
- Plataforma de contenido (YouTube, podcast, newsletter, curso)
- Tamaño e interacción de audiencia
- Modelo de monetización (anuncios, patrocinios, cursos, coaching)
- Temas de contenido recientes
- Trayectoria de crecimiento (crecimiento de suscriptores, nuevos lanzamientos)

Los ganchos de conversación deben hacer referencia a:
- Contenido reciente específico (episodio, post, video)
- Hitos de crecimiento de audiencia
- Nuevos lanzamientos de productos (curso, comunidad, coaching)
- Puntos de dolor mencionados en el contenido (escala, automatización, monetización)

Salida: [Esquema JSON estándar]
```

</RevealSection>

<RevealSection title="4. Prospectos Enterprise">

```
Estás investigando un prospecto enterprise. Enfócate en:
- Tamaño y estructura de la empresa (divisiones, geografías)
- Iniciativas estratégicas recientes (M&A, transformación digital)
- Esfuerzos de modernización tecnológica
- Presiones regulatorias o de cumplimiento
- Cambios en el liderazgo ejecutivo

Los ganchos de conversación deben hacer referencia a:
- Iniciativas estratégicas de llamadas de ganancias o comunicados de prensa
- Inversiones tecnológicas (de ofertas de trabajo o noticias)
- Cambios de liderazgo (nuevo CTO, CMO, etc.)
- Desafíos específicos de la industria (regulación, competencia)

Salida: [Esquema JSON estándar]
```

</RevealSection>

<RevealSection title="5. Pequeñas Empresas de Alta Velocidad">

```
Estás investigando un prospecto de pequeña empresa. Enfócate en:
- Modelo de negocio y fuentes de ingresos
- Presencia local vs. nacional
- Presencia en línea (calidad del sitio web, actividad en redes sociales)
- Cambios recientes (nueva ubicación, rebranding, expansión)
- Puntos de dolor operativos (procesos manuales, desafíos de escala)

Los ganchos de conversación deben hacer referencia a:
- Cambios de negocio recientes (nueva ubicación, rebranding)
- Actividad en redes sociales o menciones en noticias locales
- Problemas de calidad del sitio web (lento, desactualizado, mal móvil)
- Ineficiencias operativas visibles en ofertas de trabajo

Salida: [Esquema JSON estándar]
```

</RevealSection>

</ProgressiveReveal>

---

## Práctica: Construye tu Agente de Investigación

Hora de construir. Elige tu camino:

<DecisionTree
title="Elige tu Camino de Construcción"
persistKey="ai-lead-research-L5-build-path"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Qué herramienta usarás para construir tu agente de investigación?",
choices: [
{ label: "Clay (más fácil, mayor costo)", nextNodeId: "clay" },
{ label: "n8n (más control, menor costo)", nextNodeId: "n8n" },
{ label: "Código personalizado (Python/Node.js)", nextNodeId: "code" }
]
},
{
id: "clay",
content: "Excelente elección para velocidad. Sigue los pasos de configuración de Clay arriba. Tu próxima acción: Agregar una columna de Investigación de IA a tu tabla de enriquecimiento.",
isTerminal: true,
outcome: "positive"
},
{
id: "n8n",
content: "Inteligente para constructores con presupuesto ajustado. Sigue los pasos del flujo de trabajo de n8n arriba. Tu próxima acción: Crear un nuevo flujo de trabajo y agregar el disparador webhook.",
isTerminal: true,
outcome: "positive"
},
{
id: "code",
content: "Máxima flexibilidad. Usa el prompt del agente de investigación con la API de OpenAI o Claude. Tu próxima acción: Configurar las credenciales de API y escribir la lógica de obtención de datos.",
isTerminal: true,
outcome: "positive"
}
]}
/>

### Desafío de Carrera de Investigación

Pongamos a prueba tu agente con un escenario real:

<TimedChallenge
title="Carrera de Investigación: 3 Prospectos en 5 Minutos"
persistKey="ai-lead-research-L5-race"
timeLimit={300}
items={[
{
id: "1",
prompt: "Investiga: John Smith, CTO en TechFlow Inc (techflow.io). Encuentra 2 ganchos de conversación.",
correctAnswer: "hooks_found",
explanation: "Buenos ganchos: financiamiento reciente, cambios de stack tecnológico, actividad de contratación, lanzamientos de productos"
},
{
id: "2",
prompt: "Investiga: Maria Garcia, VP de Ventas en CloudScale (cloudscale.com). Identifica su desafío clave.",
correctAnswer: "challenge_identified",
explanation: "Busca: reseñas de G2, ofertas de trabajo, contenido reciente, posicionamiento competitivo"
},
{
id: "3",
prompt: "Investiga: Alex Chen, Fundador de StartupX (startupx.io). Encuentra su ángulo de personalización.",
correctAnswer: "angle_found",
explanation: "Mejores ángulos: lanzamiento reciente, financiamiento, contratación, temas de contenido, hitos de crecimiento"
}
]}
/>

---

## Planificación de Costo y Volumen

Calculemos lo que costará tu agente de investigación a diferentes volúmenes:

<ScenarioSimulator
title="Calculadora de Costos del Agente de Investigación"
persistKey="ai-lead-research-L5-cost-calc"
levers={[
{ id: "prospects", label: "Prospectos por mes", min: 50, max: 1000, step: 50, defaultValue: 200 },
{ id: "platform", label: "Plataforma", options: ["Clay ($0.35/prospecto)", "n8n + API ($0.03/prospecto)", "Código personalizado ($0.02/prospecto)"], defaultValue: "Clay ($0.35/prospecto)" }
  ]}
  outputs={[
    { 
      id: "monthly_cost", 
      label: "Costo mensual de investigación", 
      formula: "platform === 'Clay ($0.35/prospecto)' ? prospects * 0.35 : platform === 'n8n + API ($0.03/prospecto)' ? prospects * 0.03 : prospects * 0.02", 
      unit: "$",
precision: 2
},
{
id: "time_saved",
label: "Horas ahorradas vs. manual",
formula: "(prospects \* 15) / 60",
unit: " horas",
precision: 1
}
]}
insight="Con `{prospects}` prospectos/mes, ahorras `{time_saved}` horas de investigación manual. Eso es {time_saved / 40} semanas de trabajo de tiempo completo comprimidas en minutos."
/>

<InsightCard icon="📊" title="El ROI de la Investigación">
Si tu tiempo vale $100/hora, y el agente te ahorra 15 minutos por prospecto, eso es $25 de valor por prospecto. Con 200 prospectos/mes, eso es $5,000 en tiempo ahorrado — por un costo de herramienta de $70-200/mes.
</InsightCard>

---

## Errores Comunes y Cómo Evitarlos

### Error 1: Depender Demasiado de la IA Sin Verificación

**El Problema:** La IA genera hechos que suenan plausibles pero no son verdaderos. Envías outreach haciendo referencia a una ronda de financiamiento falsa. Credibilidad destruida.

**La Solución:** Siempre verifica al azar el 10% de la salida. Para prospectos Tier A, revisa manualmente cada resumen.

### Error 2: Ganchos de Conversación Genéricos

**El Problema:** La IA devuelve ganchos como "Veo que estás en el espacio SaaS" o "Tu empresa está creciendo rápido" — inútiles para personalización.

**La Solución:** Agrega a tu prompt: "Los ganchos de conversación deben hacer referencia a eventos o puntos de datos específicos y verificables. Sin declaraciones genéricas."

### Error 3: Ignorar las Puntuaciones de Confianza

**El Problema:** Tratas todos los resúmenes de investigación por igual. Los resúmenes de baja confianza (basados en datos mínimos) se envían como si fueran de alta calidad.

**La Solución:** Solo usa resúmenes de alta confianza para outreach Tier A. Media confianza para Tier B. Baja confianza solo obtiene personalización de plantilla.

### Error 4: No Actualizar los Prompts Según los Resultados

**El Problema:** Tu primera versión del prompt no es perfecta. Pero nunca iteras. La calidad se mantiene mediocre.

**La Solución:** Ejecuta el ciclo de calibración mensualmente. Compara la calidad de la investigación con las tasas de respuesta reales. Ajusta los prompts según lo que funciona.

<MiniRoleplay
  scenario="Un prospecto responde: 'Mencionaste que levantamos una Serie B. No lo hicimos. ¿De dónde sacaste eso?'"
  role="Eres el fundador respondiendo a este error embarazoso"
  persistKey="ai-lead-research-L5-roleplay"
  modelResponse="Tienes toda la razón — me disculpo por el error. Estoy refinando mi proceso de investigación y eso se escapó. Aun así me encantaría conectar sobre [punto de dolor real]. ¿Estarías abierto a una llamada rápida?"
/>

---

## Integración con tu Pipeline

Tu agente de investigación no funciona de forma aislada. Es el **Paso 2.5** en tu pipeline de enriquecimiento:

```
DESCUBRIR → ENRIQUECER → **INVESTIGAR** → PUNTUAR → PERSONALIZAR → ENVIAR
```

**Flujo de Datos:**

1. Descubrir prospectos (Apollo, Sales Nav)
2. Enriquecer con cascada (correo, teléfono, datos de empresa)
3. **Investigar con agente de IA** (esta lección)
4. Puntuar ajuste de ICP (Lección 6)
5. Personalizar outreach (Curso 24)
6. Enviar secuencias (Curso 24)

El resumen de investigación se convierte en la **entrada para la personalización**. Tus primeras líneas generadas por IA, rompehielos y propuestas de valor se nutren de los ganchos de conversación y ángulos de personalización.

<FlipCard 
  front="Por qué la investigación viene DESPUÉS del enriquecimiento" 
  back="Necesitas datos básicos (nombre, título, empresa, dominio) antes de poder investigar. El enriquecimiento llena esos vacíos. La investigación agrega la capa cualitativa encima." 
/>

---

## Tus Elementos de Acción

<InteractiveChecklist
title="Construye tu Agente de Investigación Esta Semana"
persistKey="ai-lead-research-L5-actions"
items={[
"Elige tu plataforma: Clay, n8n o código personalizado",
"Copia el prompt del agente de investigación y personalízalo para tu ICP",
"Configura fuentes de datos: obtención del sitio web, búsqueda de noticias, Crunchbase (opcional)",
"Configura el modelo de IA: GPT-4o o Claude 3.5 Sonnet",
"Prueba en 10 prospectos y revisa la calidad de la salida",
"Ejecuta el protocolo de verificación del 10% y calcula la tasa de alucinaciones",
"Ajusta el prompt si la tasa de alucinaciones es mayor al 10%",
"Integra la salida de investigación en tu pipeline de enriquecimiento",
"Calcula el costo por prospecto y el impacto en el presupuesto mensual",
"Documenta tu flujo de trabajo en un SOP simple (1 página)"
]}
/>

---

## Qué Sigue

Ahora tienes un agente de investigación que convierte nombres en resúmenes ricos y personalizados en 60 segundos.

**Próxima lección (Lección 6):** Construirás el **Agente de Puntuación de Ajuste de ICP** — un sistema de IA que toma tus datos enriquecidos + investigados y produce una puntuación de 1-10 con tiers de prioridad (A/B/C). Esto determina quién recibe outreach manual, quién recibe secuencias automatizadas y quién queda descalificado.

El resumen de investigación que acabas de construir alimenta directamente al agente de puntuación. Juntos, forman la capa de inteligencia de tu pipeline de adquisición.

---

## Verificación Rápida de Conocimientos

<PredictionGate
question="Ejecutas tu agente de investigación en 100 prospectos. Devuelve resúmenes de alta confianza para 60, media para 30, baja para 10. ¿Qué debes hacer con los resúmenes de baja confianza?"
persistKey="ai-lead-research-L5-predict"
type="choice"
choices={[
{ id: "a", text: "Envíalos de todos modos — la IA generalmente acierta" },
{ id: "b", text: "Usa personalización de plantilla en lugar de ganchos generados por IA" },
{ id: "c", text: "Investiga manualmente esos 10 prospectos" },
{ id: "d", text: "Descalificalos del outreach" }
]}
correctId="b"

>

**Respuesta correcta: B — Usa personalización de plantilla en lugar de ganchos generados por IA.**

Los resúmenes de baja confianza significan que la IA no tenía suficientes datos para generar ganchos de calidad. No descalifiques los prospectos (puede que aún sean buenos ajustes), pero no arriesgues enviar personalización basada en datos débiles. Regresa a outreach basado en plantillas para esos 10.

Para prospectos Tier A, investigarías manualmente. Para Tier B/C, las plantillas están bien.

</PredictionGate>
