---
title: "Campos de Enriquecimiento B2B vs. Campos de Enriquecimiento para Creadores"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 8
---

Construiste un pipeline de enriquecimiento en cascada. Está funcionando bien, extrayendo emails con un 75% de cobertura. Tu agente de puntuación de ICP está etiquetando los leads de Tier A. Todo funciona.

Luego decides expandirte. Quizás estás agregando un programa de alianzas con creadores. O lanzando una comunidad para solopreneurs. O apuntando a consultores que transitan entre el mundo B2B y el de marca personal.

Ejecutas tu pipeline de enriquecimiento en esta nueva lista.

**Retorna un 30% de cobertura y datos basura.**

¿Por qué? Porque estás intentando enriquecer creadores con campos B2B. Es como pedirle a Apollo el conteo de suscriptores de Substack de alguien o el nicho de su canal de YouTube. Las herramientas no hablan ese idioma.

Esta lección te enseña a **hablar ambos dialectos con fluidez** — enriquecimiento B2B y enriquecimiento para creadores — y a construir pipelines que se adaptan según a quién apuntas.

---

## Los Dos Universos de Enriquecimiento

<FlipCard 
  front="¿Por qué el enriquecimiento B2B y el de creadores requieren campos diferentes?" 
  back="La compra B2B ocurre a través de empresas (presupuestos, comités, tech stacks). La compra de creadores ocurre a través de individuos (tamaño de audiencia, engagement, modelo de monetización). Los datos que predicen el ajuste son fundamentalmente diferentes." 
/>

La realidad es que **las herramientas de enriquecimiento B2B fueron construidas para ventas centradas en empresas.** Destacan en:

- Tamaño de empresa, industria, ingresos
- Títulos de trabajo, departamentos, organigramas
- Tech stack, rondas de financiamiento, señales de contratación

**El enriquecimiento para creadores requiere datos centrados en personas:**

- Tamaño de audiencia, mix de plataformas, tasa de engagement
- Nicho de contenido, modelo de monetización, alianzas de marca
- Herramientas de creadores, frecuencia de contenido, demografía de audiencia

<InsightCard icon="🎯" title="La Oportunidad Híbrida">
El segmento de founders solo de más rápido crecimiento es el de los **creadores-operadores** — personas que tienen tanto una marca personal COMO un servicio/producto B2B. Necesitan enriquecimiento que capture ambos lados. La mayoría de las herramientas solo hacen uno.
</InsightCard>

Mapeemos los dos universos lado a lado.

---

## Mapa de Campos de Enriquecimiento B2B

<SlideNavigation>
<Slide title="Campos de Identidad Principal">

Estos campos identifican **quiénes son en un contexto empresarial:**

| Campo             | Valor de Ejemplo    | Fuente de Enriquecimiento | Por Qué Importa                 |
| ----------------- | ------------------- | ------------------------- | ------------------------------- |
| `job_title`       | "VP of Marketing"   | Apollo, LinkedIn          | Autoridad de toma de decisiones |
| `department`      | "Marketing"         | Apollo, Clearbit          | Titularidad del presupuesto     |
| `seniority_level` | "Director"          | Apollo                    | Poder de compra                 |
| `company_name`    | "Acme Corp"         | Apollo, Hunter            | Contexto de empresa             |
| `company_size`    | "50-200 employees"  | Apollo, Clearbit          | Potencial de tamaño del trato   |
| `industry`        | "B2B SaaS"          | Apollo, Clearbit          | Ajuste vertical                 |
| `location`        | "San Francisco, CA" | Apollo, LinkedIn          | Zona horaria, mercado           |

**Estrategia de Enriquecimiento:** Apollo + LinkedIn Sales Navigator cubren el 90% de estos campos. Usa el waterfall de Clay para las brechas.

</Slide>

<Slide title="Campos Firmográficos">

Estos campos describen **la empresa para la que trabajan:**

| Campo             | Valor de Ejemplo | Fuente de Enriquecimiento | Por Qué Importa                   |
| ----------------- | ---------------- | ------------------------- | --------------------------------- |
| `company_revenue` | "$10M-50M ARR"   | Clearbit, Crunchbase      | Capacidad presupuestaria          |
| `employee_count`  | 150              | Apollo, LinkedIn          | Complejidad organizacional        |
| `funding_stage`   | "Series B"       | Crunchbase, PitchBook     | Trayectoria de crecimiento        |
| `funding_amount`  | "$15M raised"    | Crunchbase                | Señal de presupuesto desbloqueado |
| `founded_year`    | 2019             | Clearbit, Apollo          | Etapa de madurez                  |
| `headquarters`    | "Austin, TX"     | Clearbit                  | Enfoque geográfico                |
| `parent_company`  | "Acme Holdings"  | Clearbit                  | Complejidad enterprise            |

**Estrategia de Enriquecimiento:** API de Crunchbase para financiamiento. Clearbit/Apollo para firmográficos. BuiltWith para tech stack.

</Slide>

<Slide title="Campos Tecnográficos">

Estos campos revelan **qué herramientas usan:**

| Campo                  | Valor de Ejemplo                   | Fuente de Enriquecimiento | Por Qué Importa                 |
| ---------------------- | ---------------------------------- | ------------------------- | ------------------------------- |
| `tech_stack`           | ["HubSpot", "Salesforce", "Slack"] | BuiltWith, Datanyze       | Compatibilidad de integración   |
| `crm_platform`         | "Salesforce"                       | BuiltWith                 | Ajuste de reemplazo/complemento |
| `marketing_automation` | "HubSpot"                          | BuiltWith                 | Madurez de marketing            |
| `analytics_tools`      | ["Google Analytics", "Mixpanel"]   | BuiltWith                 | Sofisticación de datos          |
| `hosting_provider`     | "AWS"                              | BuiltWith                 | Infraestructura técnica         |

**Estrategia de Enriquecimiento:** API de BuiltWith ($295/mes) o Datanyze. Clay tiene integración nativa con BuiltWith.

</Slide>

<Slide title="Campos de Señal">

Estos campos indican **intención de compra o timing:**

| Campo                   | Valor de Ejemplo             | Fuente de Enriquecimiento   | Por Qué Importa               |
| ----------------------- | ---------------------------- | --------------------------- | ----------------------------- |
| `job_changed_90d`       | true                         | LinkedIn, Apollo            | Nuevo rol = nuevo presupuesto |
| `recent_funding`        | true                         | Crunchbase                  | Presupuesto desbloqueado      |
| `hiring_for_roles`      | ["SDR", "Marketing Manager"] | LinkedIn Jobs, Greenhouse   | Señal de crecimiento          |
| `recent_news`           | "Lanzó nuevo producto"       | Google News API, Perplexity | Gancho de conversación        |
| `website_traffic_trend` | "Creciendo 20% MoM"          | SimilarWeb, SEMrush         | Momentum de mercado           |
| `g2_reviews`            | 4.5 estrellas, 120 reseñas   | G2 API                      | Product-market fit            |

**Estrategia de Enriquecimiento:** LinkedIn para cambios de trabajo. Crunchbase para financiamiento. Google News API o Perplexity para noticias recientes. SimilarWeb para tráfico (costoso; úsalo con moderación).

</Slide>
</SlideNavigation>

<ExampleCard label="Enriquecimiento B2B en Acción">

**ICP objetivo:** VP de Marketing en empresas B2B SaaS, 50-500 empleados, usando HubSpot, financiadas recientemente.

**Receta de Enriquecimiento:**

1. Apollo: Encuentra contactos que coincidan con título + tamaño de empresa + industria
2. Crunchbase: Verifica el estado de financiamiento (últimos 6 meses)
3. BuiltWith: Verifica el uso de HubSpot
4. LinkedIn: Verifica la recencia del cambio de trabajo
5. Google News: Extrae anuncios recientes de la empresa

**Resultado:** 200 prospectos → 160 enriquecidos (80%) → 45 Tier A (financiamiento reciente + HubSpot + título VP) → 90 Tier B → 25 Tier C

**Costo:** ~$0.35/prospecto (waterfall de Clay) = $70 por 200 prospectos
</ExampleCard>

---

## Mapa de Campos de Enriquecimiento para Creadores

Ahora cambiemos al universo de los creadores. **Ninguno de los campos B2B de arriba importa aquí.** Los creadores no tienen "tamaño de empresa" ni "tech stack." Tienen tamaño de audiencia y nicho de contenido.

<SlideNavigation>
<Slide title="Campos de Identidad Principal">

Estos campos identifican **quiénes son como creadores:**

| Campo               | Valor de Ejemplo      | Fuente de Enriquecimiento     | Por Qué Importa               |
| ------------------- | --------------------- | ----------------------------- | ----------------------------- |
| `primary_platform`  | "YouTube"             | Investigación manual, Phyllo  | Dónde construyen su audiencia |
| `content_niche`     | "Finanzas personales" | Agente de IA, scraping de bio | Relevancia para tu oferta     |
| `creator_type`      | "Educador"            | Clasificación de IA           | Ajuste de estilo de contenido |
| `full_time_creator` | true                  | Análisis de bio, LinkedIn     | Nivel de compromiso           |
| `location`          | "Los Angeles, CA"     | Bio de Twitter/YouTube        | Zona horaria, alianzas        |
| `years_creating`    | 3                     | Fecha de creación del canal   | Nivel de experiencia          |

**Estrategia de Enriquecimiento:** Investigación manual + agente de IA. Ninguna API única cubre todas las plataformas. La API de Phyllo agrega algunos datos pero es costosa ($299/mes+).

</Slide>

<Slide title="Campos de Audiencia">

Estos campos describen **el tamaño y engagement de su audiencia:**

| Campo                  | Valor de Ejemplo | Fuente de Enriquecimiento                 | Por Qué Importa             |
| ---------------------- | ---------------- | ----------------------------------------- | --------------------------- |
| `youtube_subscribers`  | 45000            | YouTube API (gratuita)                    | Potencial de alcance        |
| `youtube_avg_views`    | 8000             | YouTube API                               | Calidad del engagement      |
| `twitter_followers`    | 12000            | Twitter API (tier gratuito)               | Presencia multiplataforma   |
| `email_list_size`      | 5000 (estimado)  | Inferencia de IA a partir de menciones    | Acceso directo              |
| `instagram_followers`  | 18000            | Scraping de Instagram (riesgoso) o manual | Alcance de contenido visual |
| `linkedin_followers`   | 3000             | LinkedIn (manual)                         | Señal de creador B2B        |
| `total_audience_reach` | ~88000           | Suma calculada                            | Influencia general          |
| `engagement_rate`      | 6.5%             | Calculado (vistas/subs)                   | Calidad de audiencia        |

**Estrategia de Enriquecimiento:** YouTube API (gratuita, 10K solicitudes/día). Twitter API (tier gratuito, limitado). Instagram = manual o scrapers riesgosos. Lista de email = inferencia de IA a partir de menciones "únete a mi lista".

</Slide>

<Slide title="Campos de Monetización">

Estos campos revelan **cómo ganan dinero:**

| Campo                       | Valor de Ejemplo                         | Fuente de Enriquecimiento           | Por Qué Importa                |
| --------------------------- | ---------------------------------------- | ----------------------------------- | ------------------------------ |
| `monetization_model`        | ["Sponsorships", "Courses", "Affiliate"] | Agente de investigación de IA       | Sofisticación de ingresos      |
| `has_paid_product`          | true                                     | Scraping de sitio web, agente de IA | Product-market fit             |
| `course_platform`           | "Teachable"                              | BuiltWith, manual                   | Uso de herramientas de creador |
| `membership_platform`       | "Patreon"                                | Bio links, manual                   | Señal de ingresos recurrentes  |
| `sponsor_history`           | ["BetterHelp", "Skillshare"]             | Descripciones de videos, IA         | Calidad de alianzas de marca   |
| `estimated_monthly_revenue` | "$5K-15K"                                | Inferencia de IA (muy aproximada)   | Capacidad presupuestaria       |

**Estrategia de Enriquecimiento:** Agente de investigación de IA scrapeea sitio web, descripciones de YouTube, bio links. BuiltWith para plataformas de cursos. Manual para historial de patrocinadores.

</Slide>

<Slide title="Campos de Contenido">

Estos campos describen **qué crean y con qué frecuencia:**

| Campo                   | Valor de Ejemplo                             | Fuente de Enriquecimiento              | Por Qué Importa           |
| ----------------------- | -------------------------------------------- | -------------------------------------- | ------------------------- |
| `content_frequency`     | "2 videos/semana"                            | YouTube API (fechas de subida)         | Señal de consistencia     |
| `content_format`        | ["Long-form video", "Shorts"]                | Clasificación de IA                    | Preferencias de formato   |
| `avg_video_length`      | "12 minutos"                                 | YouTube API                            | Profundidad del contenido |
| `recent_topics`         | ["Presupuesto", "Inversión", "Side hustles"] | Extracción de temas de IA              | Relevancia para la oferta |
| `collaboration_history` | ["Creador X", "Creador Y"]                   | Descripciones de videos                | Calidad de red            |
| `content_quality_score` | 8/10                                         | Puntuación de IA (valor de producción) | Profesionalismo           |

**Estrategia de Enriquecimiento:** YouTube API para metadatos. Agente de IA para extracción de temas y puntuación de calidad.

</Slide>

<Slide title="Stack de Herramientas del Creador">

Estos campos revelan **qué herramientas usan para crear:**

| Campo                | Valor de Ejemplo           | Fuente de Enriquecimiento              | Por Qué Importa                   |
| -------------------- | -------------------------- | -------------------------------------- | --------------------------------- |
| `video_editing_tool` | "Final Cut Pro" (inferido) | Inferencia de IA a partir de menciones | Sofisticación técnica             |
| `email_platform`     | "ConvertKit"               | Footer del sitio web, BuiltWith        | Madurez de email marketing        |
| `analytics_tool`     | "TubeBuddy"                | Menciones en contenido                 | Enfoque basado en datos           |
| `scheduling_tool`    | "Later"                    | Menciones, integraciones               | Optimización del flujo de trabajo |
| `community_platform` | "Discord"                  | Bio links                              | Engagement de audiencia           |

**Estrategia de Enriquecimiento:** BuiltWith para herramientas del sitio web. Agente de IA para menciones de herramientas en el contenido. Manual para plataformas de comunidad.

</Slide>
</SlideNavigation>

<ExampleCard label="Enriquecimiento de Creadores en Acción">

**ICP objetivo:** Creadores de YouTube en el nicho de finanzas personales, 20K-100K suscriptores, monetizando vía cursos/coaching, publicando 1+ video/semana.

**Receta de Enriquecimiento:**

1. YouTube API: Extrae conteo de suscriptores, promedio de vistas, frecuencia de subidas
2. Agente de Investigación de IA: Scrapeea la página "Acerca de" del canal + descripciones de videos recientes para nicho, modelo de monetización, herramientas mencionadas
3. BuiltWith: Verifica el sitio web para plataforma de cursos (Teachable, Gumroad, etc.)
4. Manual: Verifica bio links para Patreon, Discord, registro de email
5. Puntuación de IA: Califica la calidad del contenido del 1 al 10 basándose en el valor de producción

**Resultado:** 150 creadores → 120 enriquecidos (80%) → 30 Tier A (ajuste perfecto de nicho + monetización activa + alto engagement) → 60 Tier B → 30 Tier C

**Costo:** ~$0.10/creador (principalmente llamadas a API de IA + tiempo manual) = $15 por 150 creadores
</ExampleCard>

---

## El Perfil Híbrido Creador-Operador

Aquí es donde se pone interesante. **El segmento de más rápido crecimiento es el de creadores-operadores** — personas que tienen tanto:

- Una marca personal (YouTube, newsletter, podcast)
- Un servicio o producto B2B (consultoría, SaaS, agencia)

Piensa en:

- Un consultor de marketing con 30K suscriptores de YouTube enseñando marketing
- Un founder de SaaS con una newsletter de 10K personas sobre bootstrapping
- Un coach de ventas con 50K seguidores en LinkedIn vendiendo un curso + consultoría

**Estas personas necesitan AMBOS universos de enriquecimiento.**

<ComparisonBuilder
title="Perfil de Enriquecimiento Híbrido"
persistKey="ai-lead-research-L8-hybrid"
prompt="Diseña un esquema de enriquecimiento híbrido para un creador-operador en tu nicho"
expertExample="Para un founder de B2B SaaS con una newsletter: Enriquece la empresa (ingresos, financiamiento, tech stack) Y las métricas de creador (suscriptores de newsletter, tasa de apertura, nicho de contenido). Puntúa el ajuste en ambas dimensiones: ajuste del producto B2B + relevancia de la audiencia."
criteria={[
"Incluye tanto campos firmográficos B2B como campos de audiencia de creador",
"Define cómo puntuar el ajuste en ambas dimensiones",
"Identifica qué fuentes de enriquecimiento cubren qué campos"
]}
/>

### Mapa de Campos de Enriquecimiento Híbrido

| Categoría de Campo | Campos B2B                                    | Campos de Creador                                                  | Fuente de Enriquecimiento    |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------ | ---------------------------- |
| **Identidad**      | Título de trabajo, empresa                    | Plataforma principal, nicho de contenido                           | Apollo + agente de IA        |
| **Escala**         | Tamaño de empresa, ingresos                   | Tamaño de audiencia, tasa de engagement                            | Apollo + YouTube/Twitter API |
| **Monetización**   | Presupuesto, financiamiento                   | Productos de pago, patrocinadores                                  | Crunchbase + agente de IA    |
| **Herramientas**   | Tech stack (CRM, automatización de marketing) | Herramientas de creador (plataforma de email, software de edición) | BuiltWith + agente de IA     |
| **Señales**        | Cambio de trabajo, contrataciones             | Frecuencia de contenido, lanzamientos recientes                    | LinkedIn + YouTube API       |

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="Para Founders Creadores">
Estás en la zona híbrida. Al prospectar socios o patrocinadores, enriquece TANTO tus métricas de creador (audiencia, engagement) COMO tus métricas de negocio (ingresos, conteo de clientes). Los patrocinadores se preocupan por el alcance. Los socios B2B se preocupan por la tracción.
</ContextualNote>

---

## Construyendo Pipelines de Enriquecimiento de Doble Contexto

No puedes usar el mismo pipeline para B2B y creadores. Pero SÍ puedes construir un **pipeline de cambio de contexto** que se adapta según el tipo de prospecto.

Aquí está la arquitectura:

<SlideNavigation>
<Slide title="Paso 1: Clasifica el Tipo de Prospecto">

Antes del enriquecimiento, **clasifica cada prospecto como B2B, Creador, o Híbrido.**

**Lógica de Clasificación:**

- Si existe `company_domain` Y `linkedin_url` contiene "/company/" → B2B
- Si existe `youtube_channel_url` O `twitter_handle` Y no hay dominio de empresa → Creador
- Si AMBOS existen → Híbrido

**Implementación:**

- Clay: Agrega una columna de fórmula "Classify Prospect Type"
- n8n: Agrega un nodo "Switch" basado en la presencia de campos
- Manual: Etiqueta prospectos durante la construcción de lista

</Slide>

<Slide title="Paso 2: Enruta a la Receta de Enriquecimiento Correcta">

**Ruta B2B:**

1. Apollo: Título de trabajo, empresa, industria, tamaño
2. Crunchbase: Financiamiento, ingresos
3. BuiltWith: Tech stack
4. LinkedIn: Señales de cambio de trabajo
5. Agente de IA: Noticias recientes, ganchos de conversación

**Ruta Creador:**

1. YouTube API: Suscriptores, promedio de vistas, frecuencia de subida
2. Twitter API: Seguidores, engagement
3. Agente de IA: Nicho, modelo de monetización, temas de contenido
4. BuiltWith: Herramientas del sitio web (plataforma de email, plataforma de cursos)
5. Manual: Bio links (Patreon, Discord, registro de email)

**Ruta Híbrida:**

1. Ejecuta AMBOS pipelines
2. Fusiona resultados en un solo registro enriquecido
3. Puntúa el ajuste en ambas dimensiones (ajuste B2B + ajuste de creador)
4. Prioriza basándose en puntuación combinada

</Slide>

<Slide title="Paso 3: Define Puntuación Específica por Contexto">

**Puntuación B2B (FIT + SIGNAL + FRICTION):**

- FIT: Coincidencia de industria, título, tamaño de empresa, tech stack
- SIGNAL: Cambio de trabajo, financiamiento, contrataciones
- FRICTION: Ciclo de ventas enterprise, compra por comité

**Puntuación de Creadores (AUDIENCE + ENGAGEMENT + MONETIZATION):**

- AUDIENCE: Conteo de suscriptores/seguidores en el rango objetivo
- ENGAGEMENT: Tasa de engagement >3%, frecuencia de contenido >1/semana
- MONETIZATION: Tiene producto de pago, patrocinadores activos

**Puntuación Híbrida:**

- Puntuación B2B (0-5) + Puntuación de Creador (0-5) = Total (0-10)
- Tier A: 8-10 (fuerte en ambas dimensiones)
- Tier B: 5-7 (fuerte en una dimensión)
- Tier C: 1-4 (débil en ambas)

</Slide>

<Slide title="Paso 4: Adapta la Personalización por Tipo">

**Personalización B2B:**

- Referencia noticias de la empresa, financiamiento, tech stack
- Lidera con puntos de dolor del negocio
- CTA: "Llamada de 15 minutos para discutir [desafío específico]"

**Personalización de Creadores:**

- Referencia contenido reciente, crecimiento de audiencia, nicho
- Lidera con oportunidades de audiencia/monetización
- CTA: "Conversación rápida sobre [alianza/herramienta/oportunidad]"

**Personalización Híbrida:**

- Referencia TANTO logros de negocio como de creador
- Lidera con cómo tu oferta une ambos mundos
- CTA: "Exploremos cómo [oferta] encaja con tu [negocio + audiencia]"

</Slide>
</SlideNavigation>

<TemplateBuilder
title="Esquema de Enriquecimiento de Doble Contexto"
persistKey="ai-lead-research-L8-schema"
sections={[
{
id: "prospect-type",
title: "Clasificación del Prospecto",
fields: [
{ id: "type", label: "Tipo de Prospecto", placeholder: "B2B / Creador / Híbrido", type: "select", options: ["B2B", "Creator", "Hybrid"] },
{ id: "classification-logic", label: "¿Cómo clasificaste esto?", placeholder: "ej., Tiene dominio de empresa + página de empresa en LinkedIn = B2B", type: "textarea" }
]
},
{
id: "b2b-fields",
title: "Campos de Enriquecimiento B2B (si aplica)",
fields: [
{ id: "job-title", label: "Título de Trabajo", placeholder: "ej., VP of Marketing", type: "text" },
{ id: "company-size", label: "Tamaño de Empresa", placeholder: "ej., 50-200 empleados", type: "text" },
{ id: "tech-stack", label: "Tech Stack", placeholder: "ej., HubSpot, Salesforce", type: "text" },
{ id: "recent-funding", label: "¿Financiamiento Reciente?", placeholder: "Sí/No + monto", type: "text" }
]
},
{
id: "creator-fields",
title: "Campos de Enriquecimiento de Creador (si aplica)",
fields: [
{ id: "primary-platform", label: "Plataforma Principal", placeholder: "ej., YouTube", type: "text" },
{ id: "audience-size", label: "Tamaño de Audiencia", placeholder: "ej., 45K suscriptores de YouTube", type: "text" },
{ id: "content-niche", label: "Nicho de Contenido", placeholder: "ej., Finanzas personales", type: "text" },
{ id: "monetization", label: "Modelo de Monetización", placeholder: "ej., Cursos, patrocinadores", type: "text" }
]
},
{
id: "scoring",
title: "Puntuación de Ajuste",
fields: [
{ id: "b2b-fit", label: "Puntuación de Ajuste B2B (0-5)", placeholder: "0-5", type: "number" },
{ id: "creator-fit", label: "Puntuación de Ajuste de Creador (0-5)", placeholder: "0-5", type: "number" },
{ id: "total-score", label: "Puntuación Total (0-10)", placeholder: "Auto-calculada", type: "number" },
{ id: "tier", label: "Tier de Prioridad", placeholder: "A / B / C", type: "select", options: ["A", "B", "C"] }
]
}
]}
/>

---

## Stack de Herramientas para Enriquecimiento de Doble Contexto

Diferentes herramientas destacan en diferentes contextos. Aquí está tu stack:

<SlideNavigation>
<Slide title="Herramientas de Enriquecimiento B2B">

| Herramienta        | Uso Principal                | Precio                          | Cobertura                    |
| ------------------ | ---------------------------- | ------------------------------- | ---------------------------- |
| Apollo.io          | Datos de contacto + empresa  | Gratuito / $49-99/mes           | 90% de cobertura B2B         |
| Clearbit (Breeze)  | Enriquecimiento firmográfico | Planes pagos de HubSpot         | 70% de datos de empresa      |
| Crunchbase         | Financiamiento, ingresos     | $29/mes (Basic) / $99/mes (Pro) | 80% de empresas financiadas  |
| BuiltWith          | Tech stack                   | $295/mes (API)                  | 60% de sitios web            |
| LinkedIn Sales Nav | Investigación manual         | $99.99/mes                      | 100% de perfiles de LinkedIn |

**Stack Recomendado para Founders Solo:**

- Apollo Free (10K registros/mes) + Crunchbase Basic ($29/mes) + BuiltWith (verificaciones manuales) = **$29/mes**
- O Clay Explorer ($149/mes) con integraciones nativas = **$149/mes** (mayor cobertura, menos trabajo manual)

</Slide>

<Slide title="Herramientas de Enriquecimiento para Creadores">

| Herramienta                                  | Uso Principal                                             | Precio                         | Cobertura                            |
| -------------------------------------------- | --------------------------------------------------------- | ------------------------------ | ------------------------------------ |
| YouTube API                                  | Conteo de suscriptores, vistas, subidas                   | Gratuita (10K solicitudes/día) | 100% YouTube                         |
| Twitter API                                  | Conteo de seguidores, tweets                              | Tier gratuito (limitado)       | 100% Twitter                         |
| Phyllo API                                   | Datos de creador multiplataforma                          | $299/mes+                      | 80% de plataformas principales       |
| Agente de Investigación de IA (GPT-4/Claude) | Nicho, monetización, herramientas                         | ~$0.02-0.05/prospecto          | Variable (depende de datos públicos) |
| BuiltWith                                    | Herramientas del sitio web (email, plataformas de cursos) | $295/mes (API) o manual        | 60% de sitios web de creadores       |

**Stack Recomendado para Founders Solo:**

- YouTube API (gratuita) + Twitter API (gratuita) + Agente de Investigación de IA (API de ChatGPT ~$20/mes) + verificaciones manuales = **$20/mes**
- O Phyllo API ($299/mes) para enriquecimiento multiplataforma automatizado = **$299/mes** (costoso; solo si tienes alto volumen)

</Slide>

<Slide title="Herramientas de Enriquecimiento Híbrido">

Para creadores-operadores, necesitas AMBOS stacks. Opciones económicas:

**Opción 1: Híbrido Manual ($50/mes)**

- Apollo Free (datos B2B)
- YouTube + Twitter APIs (gratuitas)
- Agente de Investigación de IA (API de ChatGPT $20/mes)
- Crunchbase Basic ($29/mes)
- Verificaciones manuales de BuiltWith

**Opción 2: Híbrido Impulsado por Clay ($149/mes)**

- Clay Explorer ($149/mes)
- Apollo, BuiltWith, columnas de IA nativas
- Agrega integraciones de YouTube/Twitter API (gratuitas)
- Verificaciones manuales de Phyllo para datos profundos de creadores

**Opción 3: Híbrido de Alto Volumen ($450/mes)**

- Clay Pro ($349/mes)
- Phyllo API ($299/mes) — solo si enriqueces 500+ creadores/mes
- Crunchbase Pro ($99/mes)

</Slide>
</SlideNavigation>

<RangeSlider 
  label="¿Cuál es tu presupuesto mensual de enriquecimiento?" 
  min={0} 
  max={500} 
  step={50}
  lowLabel="$0" 
  highLabel="$500+" 
  persistKey="ai-lead-research-L8-budget" 
/>

<ContextualNote showWhen={{ budget: "&lt;100" }} variant="tip" title="Enfoque con Presupuesto Ajustado">
Usa **Apollo Free + YouTube/Twitter APIs + Agente de Investigación de IA** por $20-30/mes. Verifica manualmente BuiltWith para prospectos clave. Alcanzarás una cobertura del 60-70%, que es suficiente para empezar.
</ContextualNote>

<ContextualNote showWhen={{ budget: "100-200" }} variant="tip" title="Presupuesto en el Punto Dulce">
**Clay Explorer ($149/mes)** es tu mejor opción. Automatiza el waterfall, incluye columnas de investigación de IA y se integra con YouTube/Twitter APIs. Agrega Crunchbase Basic ($29/mes) si necesitas datos de financiamiento. Total: $178/mes.
</ContextualNote>

---

## Práctica: Construye Tu Pipeline de Doble Contexto

Construyamos un pipeline de enriquecimiento de doble contexto funcional. Crearás un esquema, definirás fuentes de enriquecimiento y configurarás lógica de puntuación.

<InteractiveChecklist
title="Checklist de Construcción del Pipeline de Doble Contexto"
persistKey="ai-lead-research-L8-build"
items={[
"Define tus dos ICPs: B2B y Creador (o Híbrido)",
"Lista 10 campos de enriquecimiento B2B que necesitas (del mapa de campos de arriba)",
"Lista 10 campos de enriquecimiento de Creador que necesitas (del mapa de campos de arriba)",
"Elige tus herramientas de enriquecimiento (Apollo, Clay, YouTube API, etc.)",
"Escribe una regla de clasificación: ¿Cómo determinas B2B vs. Creador vs. Híbrido?",
"Define lógica de puntuación para el ajuste B2B (FIT + SIGNAL + FRICTION)",
"Define lógica de puntuación para el ajuste de Creador (AUDIENCE + ENGAGEMENT + MONETIZATION)",
"Construye un enriquecimiento de prueba en 10 prospectos (5 B2B, 5 Creador)",
"Revisa la cobertura de enriquecimiento: ¿Alcanzaste 70%+ en ambos tipos?",
"Ajusta tu waterfall o agrega pasos manuales donde la cobertura sea baja"
]}
/>

### Ejercicio de Clasificación

Practiquemos clasificando prospectos.

<ClassifyExercise
title="Clasifica Estos Prospectos"
persistKey="ai-lead-research-L8-classify"
categories={[
{ id: "b2b", label: "B2B", color: "#3b82f6" },
{ id: "creator", label: "Creador", color: "#8b5cf6" },
{ id: "hybrid", label: "Híbrido", color: "#10b981" }
]}
items={[
{
id: "1",
content: "Sarah Chen, VP de Marketing en Acme Corp (B2B SaaS, 150 empleados). LinkedIn: linkedin.com/in/sarahchen. Sin YouTube ni Twitter.",
correctCategory: "b2b",
explanation: "Perfil B2B claro. Sin presencia de creador."
},
{
id: "2",
content: "Alex Rivera, creador de YouTube con 60K suscriptores en el nicho de finanzas personales. Publica 2 veces/semana. Sin afiliación empresarial.",
correctCategory: "creator",
explanation: "Creador puro. Sin conexión empresarial B2B."
},
{
id: "3",
content: "Jordan Lee, Founder de GrowthTools (SaaS, $500K ARR) + 25K suscriptores de newsletter enseñando bootstrapping.",
correctCategory: "hybrid",
explanation: "Tanto B2B (founder de SaaS) como Creador (newsletter). Se necesita enriquecimiento híbrido."
},
{
id: "4",
content: "Taylor Morgan, Coach de Ventas con 40K seguidores en LinkedIn, dirige una firma de consultoría (5 empleados), vende un curso de $2K.",
correctCategory: "hybrid",
explanation: "Híbrido: Servicio B2B (firma de consultoría) + Creador (curso + audiencia en LinkedIn)."
},
{
id: "5",
content: "Chris Patel, Director de Ventas en TechCo (500 empleados). Activo en LinkedIn (3K seguidores) pero sin creación de contenido.",
correctCategory: "b2b",
explanation: "B2B. La presencia en LinkedIn no lo convierte en creador a menos que esté creando contenido activamente."
},
{
id: "6",
content: "Jamie Kim, streamer de Twitch (15K seguidores) en el nicho de gaming. Sin negocio, sin productos, solo streaming.",
correctCategory: "creator",
explanation: "Creador puro. Sin ángulo B2B."
}
]}
/>

---

## Puntuando Prospectos de Doble Contexto

Ahora practiquemos la puntuación. Verás perfiles enriquecidos y asignarás puntuaciones de ajuste.

<SwipeDecision
title="Puntúa Este Prospecto: Ajuste B2B"
description="Desliza a la derecha para ALTO ajuste (7-10), a la izquierda para BAJO ajuste (1-6)"
optionA="Bajo Ajuste (1-6)"
optionB="Alto Ajuste (7-10)"
persistKey="ai-lead-research-L8-b2b-score"
cards={[
{
id: "1",
content: "VP de Marketing, B2B SaaS, 100 empleados, usa HubSpot, recaudó $10M Serie A hace 3 meses, contratando 2 SDRs.",
correctOption: "b",
explanation: "Ajuste B2B perfecto: Título correcto, industria, tamaño, tech stack, financiamiento reciente (presupuesto desbloqueado), contratando (señal de crecimiento). Puntuación: 9/10."
},
{
id: "2",
content: "Coordinadora de Marketing, empresa de e-commerce, 20 empleados, sin financiamiento, usa Mailchimp.",
correctOption: "a",
explanation: "Bajo ajuste: Título junior, empresa pequeña, sin financiamiento, herramientas básicas. Puntuación: 3/10."
},
{
id: "3",
content: "Director de Ventas, Enterprise SaaS, 2.000 empleados, usa Salesforce, sin financiamiento ni contrataciones recientes.",
correctOption: "a",
explanation: "Ajuste medio-bajo: Título y herramientas correctos, pero enterprise = ciclo de ventas largo (fricción). Sin señales. Puntuación: 5/10."
}
]}
/>

<SwipeDecision
title="Puntúa Este Prospecto: Ajuste de Creador"
description="Desliza a la derecha para ALTO ajuste (7-10), a la izquierda para BAJO ajuste (1-6)"
optionA="Bajo Ajuste (1-6)"
optionB="Alto Ajuste (7-10)"
persistKey="ai-lead-research-L8-creator-score"
cards={[
{
id: "1",
content: "YouTube: 50K suscriptores, nicho de finanzas personales, 8% tasa de engagement, publica 2 veces/semana, vende un curso de $500 en Teachable.",
correctOption: "b",
explanation: "Alto ajuste: Nicho correcto, engagement fuerte, publicación consistente, monetización activa. Puntuación: 9/10."
},
{
id: "2",
content: "YouTube: 5K suscriptores, nicho de gaming, 2% tasa de engagement, publica 1 vez/mes, sin monetización.",
correctOption: "a",
explanation: "Bajo ajuste: Audiencia pequeña, bajo engagement, publicación inconsistente, sin monetización. Puntuación: 2/10."
},
{
id: "3",
content: "YouTube: 80K suscriptores, nicho de reseñas tech, 5% tasa de engagement, publica 1 vez/semana, tiene patrocinadores pero sin productos de pago.",
correctOption: "b",
explanation: "Ajuste medio-alto: Audiencia grande, engagement decente, publicación consistente, monetizando vía patrocinadores. Puntuación: 7/10."
}
]}
/>

---

## Errores Comunes en el Enriquecimiento de Doble Contexto

<SlideNavigation>
<Slide title="Error 1: Usar Herramientas B2B para Creadores">

**El Error:** Ejecutar búsquedas de Apollo o LinkedIn Sales Navigator para creadores de YouTube.

**Por Qué Falla:** Apollo no indexa conteos de suscriptores de YouTube ni tasas de engagement. LinkedIn no muestra membresías de Patreon ni ventas de cursos.

**La Solución:** Usa YouTube API + Agente de Investigación de IA para creadores. Apollo solo para B2B.

</Slide>

<Slide title="Error 2: Ignorar Perfiles Híbridos">

**El Error:** Clasificar a un founder de SaaS con una newsletter de 20K como "solo B2B" y perder el ángulo de creador.

**Por Qué Falla:** Pierdes un gancho de personalización importante (su audiencia) y posibles oportunidades de alianza.

**La Solución:** Siempre verifica la presencia de creador (YouTube, newsletter, podcast, contenido en LinkedIn) incluso en prospectos B2B. Etiqueta como Híbrido si ambos existen.

</Slide>

<Slide title="Error 3: Depender Demasiado de Herramientas Costosas">

**El Error:** Pagar $299/mes por la API de Phyllo cuando solo enriqueces 50 creadores/mes.

**Por Qué Falla:** El costo por prospecto es $6 ($299 ÷ 50). Podrías hacerlo manualmente por $0.10/prospecto con YouTube API + agente de IA.

**La Solución:** Usa herramientas costosas SOLO si enriqueces 500+ prospectos/mes. De lo contrario, manual + IA es más económico.

</Slide>

<Slide title="Error 4: No Verificar Datos de Creadores">

**El Error:** Confiar en los conteos de suscriptores de datos scrapeados sin verificar el canal real.

**Por Qué Falla:** Los conteos de suscriptores pueden estar inflados (seguidores comprados), desactualizados o mal atribuidos.

**La Solución:** Siempre verifica manualmente el 10% de los datos de creadores. Verifica conteos de suscriptores, tasas de engagement y afirmaciones de monetización.

</Slide>
</SlideNavigation>

---

## Tu Receta de Enriquecimiento de Doble Contexto

Es hora de construir tu propia receta de enriquecimiento. Este será tu manual operativo para los próximos 90 días.

<TemplateBuilder
title="Mi Receta de Enriquecimiento de Doble Contexto"
persistKey="ai-lead-research-L8-recipe"
sections={[
{
id: "icp-definition",
title: "Definición de ICP",
fields: [
{ id: "b2b-icp", label: "ICP B2B (si aplica)", placeholder: "ej., VP de Marketing en B2B SaaS, 50-500 empleados, usando HubSpot", type: "textarea" },
{ id: "creator-icp", label: "ICP de Creador (si aplica)", placeholder: "ej., Creadores de YouTube en finanzas personales, 20K-100K suscriptores, monetizando vía cursos", type: "textarea" },
{ id: "hybrid-icp", label: "ICP Híbrido (si aplica)", placeholder: "ej., Founders de SaaS con 10K+ suscriptores de newsletter", type: "textarea" }
]
},
{
id: "b2b-enrichment",
title: "Pasos de Enriquecimiento B2B",
fields: [
{ id: "b2b-source-1", label: "Fuente B2B Principal", placeholder: "ej., Apollo.io", type: "text" },
{ id: "b2b-fields-1", label: "Campos de la Fuente 1", placeholder: "ej., Título de trabajo, tamaño de empresa, industria", type: "textarea" },
{ id: "b2b-source-2", label: "Fuente B2B Secundaria", placeholder: "ej., Crunchbase", type: "text" },
{ id: "b2b-fields-2", label: "Campos de la Fuente 2", placeholder: "ej., Financiamiento, ingresos", type: "textarea" },
{ id: "b2b-verification", label: "Paso de Verificación", placeholder: "ej., MillionVerifier para emails", type: "text" }
]
},
{
id: "creator-enrichment",
title: "Pasos de Enriquecimiento de Creador",
fields: [
{ id: "creator-source-1", label: "Fuente Principal de Creador", placeholder: "ej., YouTube API", type: "text" },
{ id: "creator-fields-1", label: "Campos de la Fuente 1", placeholder: "ej., Suscriptores, promedio de vistas, frecuencia de subida", type: "textarea" },
{ id: "creator-source-2", label: "Fuente Secundaria de Creador", placeholder: "ej., Agente de Investigación de IA", type: "text" },
{ id: "creator-fields-2", label: "Campos de la Fuente 2", placeholder: "ej., Nicho, modelo de monetización, herramientas usadas", type: "textarea" },
{ id: "creator-manual", label: "Verificaciones Manuales", placeholder: "ej., Bio links para Patreon, Discord", type: "textarea" }
]
},
{
id: "scoring-logic",
title: "Lógica de Puntuación",
fields: [
{ id: "b2b-scoring", label: "Puntuación de Ajuste B2B (0-5)", placeholder: "ej., +1 por coincidencia de industria, +1 por título, +1 por tech stack, +1 por financiamiento, +1 por contrataciones", type: "textarea" },
{ id: "creator-scoring", label: "Puntuación de Ajuste de Creador (0-5)", placeholder: "ej., +1 por coincidencia de nicho, +1 por tamaño de audiencia, +1 por tasa de engagement, +1 por monetización, +1 por frecuencia de contenido", type: "textarea" },
{ id: "tier-thresholds", label: "Umbrales de Tier", placeholder: "ej., 8-10 = Tier A, 5-7 = Tier B, 1-4 = Tier C", type: "textarea" }
]
},
{
id: "budget-estimate",
title: "Estimación de Presupuesto y Volumen",
fields: [
{ id: "monthly-volume", label: "Volumen Mensual de Enriquecimiento", placeholder: "ej., 200 B2B + 100 Creador = 300 total", type: "text" },
{ id: "tool-costs", label: "Costos de Herramientas", placeholder: "ej., Clay $149/mes + Crunchbase $29/mes = $178/mes", type: "textarea" },
{ id: "cost-per-prospect", label: "Costo por Prospecto", placeholder: "ej., $178 ÷ 300 = $0.59/prospecto", type: "text" }
]
}
]}
/>

---

## Resumen y Próximos Pasos

Ahora entiendes los **dos universos de enriquecimiento** — B2B y Creador — y cómo construir pipelines que manejan ambos.

**Conclusiones Clave:**

1. **El enriquecimiento B2B** se enfoca en datos de empresa (firmográficos, tech stack, financiamiento). Herramientas: Apollo, Clearbit, Crunchbase, BuiltWith.
2. **El enriquecimiento para creadores** se enfoca en datos de audiencia (suscriptores, engagement, monetización). Herramientas: YouTube API, Twitter API, Agente de Investigación de IA, Phyllo.
3. **Los perfiles híbridos** (creadores-operadores) necesitan AMBOS tipos de enriquecimiento. Clasifica → Enruta → Enriquece → Puntúa en ambas dimensiones.
4. **El presupuesto importa:** Manual + IA ($20-50/mes) funciona para &lt;200 prospectos/mes. Clay ($149/mes) escala a 500+. Phyllo ($299/mes) solo si tienes alto volumen de creadores.
5. **Siempre verifica:** Spot-check el 10% de los datos enriquecidos para precisión. La IA alucina. Los datos scrapeados se vuelven obsoletos.

<InteractiveChecklist
title="Tus Puntos de Acción"
persistKey="ai-lead-research-L8-actions"
items={[
"Define tu ICP B2B y tu ICP de Creador (o ICP Híbrido)",
"Lista 10 campos de enriquecimiento para cada tipo de ICP",
"Elige tus herramientas de enriquecimiento según presupuesto y volumen",
"Construye una regla de clasificación para enrutar prospectos al pipeline correcto",
"Configura un enriquecimiento de prueba en 20 prospectos (10 B2B, 10 Creador)",
"Revisa la cobertura: ¿Alcanzaste 70%+ en ambos tipos?",
"Define lógica de puntuación tanto para el ajuste B2B como para el ajuste de Creador",
"Documenta tu receta de enriquecimiento de doble contexto (usa la plantilla de arriba)",
"Calcula tu costo por prospecto y presupuesto mensual",
"Programa un sprint semanal de enriquecimiento: 50-100 prospectos/semana"
]}
/>

**Vista Previa de la Próxima Lección:** En la Lección 9, abordaremos la **decisión de Construir vs. Comprar** — cuándo usar Clay/Apollo versus construir tu propio pipeline de enriquecimiento con n8n + APIs. Aprenderás las matemáticas del punto de equilibrio, los requisitos técnicos y los costos de mantenimiento de cada enfoque.

---

## Quiz Rápido

Pon a prueba tu comprensión del enriquecimiento de doble contexto.

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "¿Cuál es la diferencia principal entre el enriquecimiento B2B y el de Creadores?",
      "options": [
        "B2B usa LinkedIn, Creadores usan YouTube",
        "B2B se enfoca en datos de empresa, Creadores se enfocan en datos de audiencia",
        "B2B es más económico, Creadores son más costosos",
        "B2B es automatizado, Creadores es manual"
      ],
      "correctIndex": 1,
      "explanation": "El enriquecimiento B2B se centra en datos a nivel de empresa (firmográficos, tech stack). El enriquecimiento para Creadores se centra en datos de audiencia individuales (suscriptores, engagement, monetización)."
    },
    {
      "id": "q2",
      "question": "¿Qué herramienta es mejor para enriquecer datos de creadores de YouTube?",
      "options": [
        "Apollo.io",
        "LinkedIn Sales Navigator",
        "YouTube API + Agente de Investigación de IA",
        "Clearbit"
      ],
      "correctIndex": 2,
      "explanation": "YouTube API proporciona conteos de suscriptores, vistas y datos de subida. El Agente de Investigación de IA scrapeea nicho, monetización y herramientas. Apollo y LinkedIn no indexan métricas de creadores."
    },
    {
      "id": "q3",
      "question": "¿Cómo debes clasificar a un founder de SaaS con una newsletter de 20K?",
      "options": [
        "Solo B2B",
        "Solo Creador",
        "Híbrido (tanto B2B como Creador)",
        "Ninguno — datos insuficientes"
      ],
      "correctIndex": 2,
      "explanation": "Tienen tanto un negocio B2B (SaaS) como una presencia de creador (newsletter). Enriquece tanto por datos de empresa como de audiencia. Puntúa en ambas dimensiones."
    },
    {
      "id": "q4",
      "question": "¿Cuál es el presupuesto recomendado para enriquecimiento de doble contexto a 200 prospectos/mes?",
      "options": [
        "$20-50/mes (manual + IA)",
        "$150-200/mes (Clay + Crunchbase)",
        "$500+/mes (Phyllo + Clay Pro)",
        "$0 (todas herramientas gratuitas)"
      ],
      "correctIndex": 1,
      "explanation": "A 200 prospectos/mes, Clay Explorer ($149/mes) + Crunchbase Basic ($29/mes) = $178/mes es el punto óptimo. Manual + IA ($20-50/mes) funciona pero es intensivo en tiempo. Phyllo ($299/mes) es excesivo a menos que hagas 500+ creadores/mes."
    },
    {
      "id": "q5",
      "question": "¿Cuál es el mayor riesgo al enriquecer datos de creadores?",
      "options": [
        "LinkedIn baneará tu cuenta",
        "La IA alucinará detalles de monetización",
        "YouTube API es demasiado costosa",
        "Los creadores no tienen direcciones de email"
      ],
      "correctIndex": 1,
      "explanation": "Los agentes de investigación de IA pueden alucinar modelos de monetización, uso de herramientas y detalles de nicho si no encuentran evidencia clara. Siempre verifica manualmente el 10% de los enriquecimientos de creadores."
    }
  ]
}
```
