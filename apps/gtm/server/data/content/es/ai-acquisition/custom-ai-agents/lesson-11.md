---
title: "Doble Contexto: Preparación para Descubrimiento B2B vs Agente de Nurture para Creadores"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 11
---

# La Historia de Dos Agentes

Sarah dirige una herramienta SaaS B2B para equipos de marketing. Marcus dirige un negocio de coaching para emprendedores creativos. Ambos tienen llamadas de descubrimiento de 30 minutos programadas para mañana.

**El problema de Sarah:** Tiene 4 llamadas seguidas. Cada prospecto viene de una industria diferente (fintech, salud, e-commerce, consultoría). Necesita recordar: su stack tecnológico, su financiamiento reciente, las señales de dolor del brief de investigación, qué caso de estudio compartir y qué preguntas hacer según la etapa de la empresa.

**El problema de Marcus:** Sus prospectos son leads cálidos de su newsletter. Han consumido entre 3-12 piezas de contenido a lo largo de 2-6 meses. Necesita recordar: qué artículos abrieron, en qué comentaron, sus metas declaradas del formulario de opt-in y dónde están en su camino creativo.

Ambos están ahogados en contexto. Ambos necesitan un agente de IA que recuerde por ellos.

Al final de esta lección, construirás **dos versiones del mismo agente** — una optimizada para preparación de descubrimiento B2B y otra para conversaciones de nurture con creadores. Misma arquitectura, diferentes ventanas de contexto.

<InsightCard icon="🎯" title="Por Qué Esta Lección Importa">
La mayoría de los tutoriales de agentes te muestran un caso de uso. Pero la habilidad real es **adaptar el mismo patrón a diferentes contextos**. Los negocios B2B y de creadores tienen estructuras de datos opuestas — sin embargo, la arquitectura del agente de preparación es idéntica. Domina esto y podrás construir agentes para cualquier contexto.
</InsightCard>

---

## El Patrón Universal del Agente de Preparación

Ya sea que estés preparándote para una llamada de descubrimiento B2B o una conversación de nurture con un creador, el agente hace las mismas 5 cosas:

<FlipCard 
  front="El Patrón de 5 Pasos de Preparación" 
  back="1. Reunir contexto (CRM + datos frescos). 2. Identificar el objetivo (qué quieres de esta conversación). 3. Generar puntos de conversación (vinculados a su situación específica). 4. Preparar preguntas (descubrimiento o profundización). 5. Anticipar objeciones/preocupaciones (con respuestas listas)." 
/>

La **única diferencia** es qué datos le alimentas y cómo encuadras la salida.

### Agente de Preparación para Descubrimiento B2B: Qué Necesita

**Fuentes de entrada:**

- Brief de investigación del CRM (del Agente 1)
- Evento del calendario (nombres de asistentes, empresa, tipo de reunión)
- Hilo de email (últimos 3-5 intercambios si están disponibles)
- Revisión fresca de LinkedIn (¿publicaron algo en los últimos 7 días?)
- Noticias recientes de la empresa (API de Google News, últimos 14 días)

**Formato de salida:**

- **Repaso Rápido** (3-5 datos clave: rol, etapa de empresa, señales de dolor)
- **Objetivo de la Reunión** (qué quieres lograr: calificar, demo, cerrar, descubrimiento)
- **Puntos de Conversación** (3-5 bullets vinculados a sus señales de dolor)
- **Preguntas de Descubrimiento** (5-7 preguntas, framework SPIN o MEDDIC)
- **Preparación de Objeciones** (top 2-3 objeciones probables con respuestas LARA)
- **Prueba para Compartir** (1 caso de estudio o testimonio relevante)

### Agente de Nurture para Creadores: Qué Necesita

**Fuentes de entrada:**

- Registro de contacto del CRM (fecha de opt-in, metas declaradas, etiquetas)
- Historial de engagement con contenido (qué artículos/videos consumieron)
- Datos de apertura/clic de email (qué temas resonaron)
- Actividad en la comunidad (si aplica: Discord, Slack, comentarios)
- Tiempo desde el último punto de contacto (¿se están enfriando?)

**Formato de salida:**

- **Contexto de la Relación** (cómo te encontraron, qué han consumido, nivel de engagement)
- **Objetivo de la Conversación** (profundizar la relación, calificar para la oferta, volver a conectar, cerrar)
- **Iniciadores de Conversación** (3 referencias a su consumo de contenido específico o metas declaradas)
- **Preguntas de Profundización** (5-7 preguntas para entender su situación y disposición)
- **Evaluación de Encaje con la Oferta** (cuál de tus ofertas coincide con su etapa actual)
- **Recomendación de Próximo Paso** (invitar a taller, enviar recurso, presentar oferta, nutrir más)

<ExampleCard label="Comparación: El Mismo Agente, Contexto Diferente">

**Salida de Prep B2B:**

> **Repaso Rápido:** Jane Doe, VP de Marketing en Acme Corp (Serie B, 150 empleados). Dolor: no puede atribuir el ROI del contenido. Recientemente contrató 3 redactores de contenido.
>
> **Objetivo:** Calificar presupuesto y timeline para implementación en Q2.
>
> **Punto de Conversación 1:** "Mencionaste los desafíos de atribución — la mayoría de las empresas en Serie B con las que trabajamos ven una brecha de 6 semanas entre la publicación del contenido y el impacto en los ingresos. ¿Cómo estás midiendo eso actualmente?"

**Salida de Nurture para Creadores:**

> **Contexto de la Relación:** Alex se unió a tu lista hace 4 meses a través de la guía "Cómo Poner Precio a tu Coaching". Abrió 8/12 emails, hizo clic en "Cómo Llenar un Programa Grupal" dos veces. Etiquetado como: coach-aspirante, sin-clientes-aún.
>
> **Objetivo:** Evaluar disposición para tu curso "Primeros 10 Clientes" (lanza en 2 semanas).
>
> **Iniciador de Conversación 1:** "Noté que descargaste la guía de precios en enero y hiciste clic en el artículo del programa grupal dos veces — ¿estás pensando en lanzar una oferta grupal pronto?"

</ExampleCard>

<RangeSlider 
  label="¿Con qué frecuencia olvidas contexto clave antes de una llamada?" 
  min={1} 
  max={10} 
  lowLabel="Nunca" 
  highLabel="Siempre" 
  persistKey="custom-ai-agents-L11-context-gap" 
/>

---

## Construyendo el Agente de Preparación para Descubrimiento B2B

Construyamos primero la versión B2B. La adaptarás para creadores en la siguiente sección.

### Paso 1: Definir el Disparo

El agente corre **30 minutos antes** de un evento del calendario etiquetado como "Llamada de Descubrimiento" o "Llamada de Ventas."

**¿Por qué 30 minutos?** Suficiente tiempo para reunir datos frescos, suficientemente reciente como para que la preparación siga siendo relevante.

**Opciones de implementación:**

- **Zapier/Make:** Disparo de evento del calendario → filtrar por tipo de evento → retrasar hasta 30 min antes → ejecutar flujo
- **n8n:** Trabajo Cron revisa el calendario cada 15 minutos → encuentra llamadas próximas en la ventana de 30-45 min → ejecuta la preparación para cada una
- **Trigger.dev:** Trabajo programado consulta la API del calendario → dispara el flujo de preparación por evento

<TemplateBuilder
title="Tu Config de Disparo para el Agente de Prep B2B"
persistKey="custom-ai-agents-L11-b2b-trigger"
sections={[
{
id: "calendar",
title: "Integración de Calendario",
fields: [
{ id: "source", label: "Fuente de calendario", placeholder: "Google Calendar, Outlook, Calendly", type: "text" },
{ id: "event-filter", label: "Filtro de nombre de evento", placeholder: "ej. 'Descubrimiento', 'Ventas', 'Demo'", type: "text" },
{ id: "timing", label: "Ejecutar X minutos antes del evento", placeholder: "30", type: "number" }
]
},
{
id: "delivery",
title: "Entrega del Doc de Preparación",
fields: [
{ id: "channel", label: "Dónde enviar el doc de preparación", placeholder: "Slack DM, Email, Dashboard del CRM", type: "text" },
{ id: "format", label: "Preferencia de formato", placeholder: "Markdown, PDF, página de Notion", type: "text" }
]
}
]}
/>

### Paso 2: Reunir Contexto (La Fase de Recopilación de Datos)

El agente extrae de 5 fuentes en paralelo:

```
# Pseudocódigo: Agente de Prep para Descubrimiento B2B — Recopilación de Datos

function gather_b2b_context(calendar_event):
    contact = crm.get_contact_by_email(calendar_event.attendee_email)

    # Fuente 1: Brief de investigación del CRM (del Agente 1)
    research_brief = contact.research_brief

    # Fuente 2: Hilo de email (últimos 5 intercambios)
    email_thread = email_client.get_thread(contact.email, limit=5)

    # Fuente 3: Actividad fresca en LinkedIn (últimos 7 días)
    if contact.linkedin_url:
        linkedin_recent = scrape_linkedin_posts(contact.linkedin_url, days=7)
    else:
        linkedin_recent = None

    # Fuente 4: Noticias recientes de la empresa (últimos 14 días)
    company_news = google_news_search(contact.company, days=14)

    # Fuente 5: Etapa del deal e interacciones pasadas
    deal_stage = contact.deal_stage  # "discovery", "demo", "negotiation"
    past_notes = crm.get_notes(contact.id, limit=3)

    return {
        "contact": contact,
        "research_brief": research_brief,
        "email_thread": email_thread,
        "linkedin_recent": linkedin_recent,
        "company_news": company_news,
        "deal_stage": deal_stage,
        "past_notes": past_notes,
        "meeting_type": calendar_event.title
    }
```

<InsightCard icon="⚡" title="La Ventaja de los Datos Frescos">
Los briefs de investigación se vuelven obsoletos. Un prospecto que estaba "explorando opciones" hace 2 semanas podría haber anunciado una nueva contratación (señal de presupuesto) o publicado sobre un punto de dolor en LinkedIn. La revisión de LinkedIn de 7 días y el escaneo de noticias de 14 días detectan estos **eventos desencadenantes** que hacen tu preparación hiper-relevante.
</InsightCard>

### Paso 3: Generar el Documento de Preparación

Ahora alimentamos todo ese contexto a un prompt estructurado:

```
# Pseudocódigo: Agente de Prep para Descubrimiento B2B — Generación del Doc

function generate_b2b_prep_doc(context):
    prompt = f"""
Eres un asistente de preparación de ventas para un solopreneur que dirige un negocio SaaS B2B.

CONTEXTO:
- Contacto: {context.contact.name}, {context.contact.title} en {context.contact.company}
- Brief de Investigación: {context.research_brief}
- Hilo de Email Reciente: {context.email_thread}
- Actividad Reciente en LinkedIn: {context.linkedin_recent or "Ninguna"}
- Noticias Recientes de la Empresa: {context.company_news or "Ninguna"}
- Etapa del Deal: {context.deal_stage}
- Notas Pasadas: {context.past_notes}
- Tipo de Reunión: {context.meeting_type}

TAREA:
Genera un documento de preparación de reunión de 1 página con estas secciones:

1. REPASO RÁPIDO (3-5 datos clave para recordar)
2. OBJETIVO DE LA REUNIÓN (1 oración: qué quieres lograr)
3. PUNTOS DE CONVERSACIÓN (3-5 bullets vinculados a señales de dolor)
4. PREGUNTAS DE DESCUBRIMIENTO (5-7 preguntas, framework SPIN)
5. PREPARACIÓN DE OBJECIONES (top 2-3 objeciones probables con respuestas LARA)
6. PRUEBA PARA COMPARTIR (1 caso de estudio o testimonio relevante)

RESTRICCIONES:
- Mantener la longitud total bajo 500 palabras
- Ser específico — referenciar datos reales del contexto
- Si falta información, escribir "Desconocido — preguntar durante la llamada"
- Tono: seguro pero consultivo, no vendedor

FORMATO DE SALIDA: Markdown
"""

    prep_doc = call_llm(
        model="claude-sonnet-4",
        prompt=prompt,
        max_tokens=1200,
        temperature=0.4  # Equilibrado: factual pero ligeramente creativo
    )

    return prep_doc
```

<FlipCard 
  front="¿Por Qué Preguntas SPIN en el Prompt?" 
  back="SPIN (Situación, Problema, Implicación, Necesidad-Beneficio) es un framework de descubrimiento probado. Al instruir a la IA a usar SPIN, obtienes preguntas estructuradas que hacen avanzar la conversación — no preguntas de curiosidad aleatoria." 
/>

### Paso 4: Entregar el Doc de Preparación

El agente envía el doc de preparación a tu canal preferido 30 minutos antes de la llamada:

- **Slack DM:** Notificación instantánea, fácil de leer en el móvil
- **Email:** Bueno si ya estás en tu bandeja de entrada
- **Dashboard del CRM:** Embebido en el registro del contacto para referencia durante la llamada
- **Notion/Obsidian:** Si guardas tus notas de reunión ahí

<ComparisonBuilder
title="Tu Doc de Preparación para Descubrimiento B2B"
persistKey="custom-ai-agents-L11-b2b-prep"
prompt="Pega el contexto para una próxima llamada de descubrimiento (nombre del contacto, empresa, señales de dolor, actividad reciente)"
expertExample="**Repaso Rápido:** Sarah Chen, Jefa de Crecimiento en Fintech Startup (Semilla, 25 empleados). Dolor: no puede escalar el outbound sin contratar SDRs. Acaba de publicar en LinkedIn sobre 'el infierno de la prospección manual.'

**Objetivo:** Calificar presupuesto para Q2 y hacer demo del flujo de investigación automatizada.

**Punto de Conversación 1:** 'Vi tu publicación de LinkedIn sobre la prospección manual — la mayoría de las empresas en etapa semilla con las que trabajamos chocan contra esa pared alrededor de los 20-30 empleados. ¿Cuántas horas/semana está gastando tu equipo en investigación ahora mismo?'

**Pregunta de Descubrimiento 1 (Situación):** 'Cuéntame tu proceso actual de outbound — ¿quién hace qué?'

**Prep de Objeción:** 'Somos demasiado tempranos para la automatización' → Escuchar: 'Tiene sentido, muchos founders piensan eso.' Reconocer: 'Quieres mantenerte lean.' Reencuadrar: 'Las empresas que automatizan temprano en realidad escalan más rápido porque no construyen hábitos manuales.' Preguntar: '¿Qué cambiaría si la investigación tomara 10 minutos en lugar de 2 horas por prospecto?'"
criteria={[
"Referencia actividad reciente específica (publicación de LinkedIn, noticias, email)",
"Puntos de conversación vinculados a sus señales de dolor",
"Las preguntas de descubrimiento siguen el framework SPIN",
"Las objeciones usan la estructura LARA"
]}
/>

---

## Adaptando para Creadores: El Agente de Nurture

Ahora reconstruyamos el mismo agente para **conversaciones de nurture con creadores**. La arquitectura es idéntica — solo cambian las entradas y el encuadre.

### Diferencias Clave: Contexto B2B vs Creador

| Dimensión                       | Prep para Descubrimiento B2B           | Prep para Nurture de Creadores                                            |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------------------------- |
| **Etapa de la Relación**        | Frío → Cálido (semanas)                | Cálido → Caliente (meses)                                                 |
| **Fuentes de Datos**            | CRM, LinkedIn, noticias, hilo de email | CRM, engagement con contenido, aperturas de email, actividad en comunidad |
| **Objetivo de la Conversación** | Calificar, demo, cerrar                | Profundizar relación, evaluar disposición, invitar a la oferta            |
| **Estilo de Preguntas**         | SPIN (descubrimiento)                  | Preguntas de coaching (metas, obstáculos, disposición)                    |
| **Tipo de Objeción**            | Presupuesto, tiempo, autoridad         | Autoduda, disposición, encaje                                             |
| **Tipo de Prueba**              | Caso de estudio, métrica de ROI        | Testimonio, historia de transformación                                    |

<ConceptReframe
concept="Propósito del Agente de Preparación"
defaultLens="technical-founder"
lenses={[
{
id: "technical-founder",
label: "Founder de SaaS B2B",
explanation: "El agente de preparación es como una lista de verificación pre-vuelo. Estás a punto de despegar (iniciar la llamada) — asegura que tengas todos los sistemas verificados: combustible (contexto), ruta (objetivo), clima (objeciones) y planes de respaldo (prueba)."
},
{
id: "coach",
label: "Coach/Consultor",
explanation: "El agente de preparación es como revisar el formulario de intake de un cliente antes de una sesión. Necesitas recordar: qué dijeron en la solicitud, qué contenido resonó, dónde están atascados y para qué transformación están listos."
},
{
id: "creator",
label: "Creador de Contenido",
explanation: "El agente de preparación es como un CRM de relaciones para tu audiencia. Antes de una llamada 1-a-1 con un suscriptor, te recuerda: qué videos vieron, en qué comentaron, con qué están luchando y qué oferta encaja en su viaje."
}
]}
/>

### Paso 1: Definir el Disparo para el Agente de Nurture de Creadores

Misma ventana de 30 minutos, pero los tipos de eventos son diferentes:

- "Llamada de Estrategia"
- "Coaching 1-a-1"
- "Sesión de Descubrimiento"
- "Conversación de Inscripción"

### Paso 2: Reunir Contexto del Creador

```
# Pseudocódigo: Agente de Nurture de Creadores — Recopilación de Datos

function gather_creator_context(calendar_event):
    contact = crm.get_contact_by_email(calendar_event.attendee_email)

    # Fuente 1: Contexto del opt-in (cómo se unieron, metas declaradas)
    opt_in_data = contact.opt_in_form_data  # Del lead magnet o solicitud

    # Fuente 2: Historial de engagement con contenido
    content_engagement = email_platform.get_engagement(contact.email)
    # Devuelve: {articles_opened: [...], videos_watched: [...], click_topics: [...]}

    # Fuente 3: Datos de apertura/clic de email (últimos 90 días)
    email_activity = email_platform.get_activity(contact.email, days=90)

    # Fuente 4: Actividad en la comunidad (si aplica)
    if contact.in_community:
        community_activity = discord_or_slack.get_activity(contact.id, days=30)
    else:
        community_activity = None

    # Fuente 5: Tiempo desde el último punto de contacto
    last_interaction = contact.last_interaction_date
    days_since = (today() - last_interaction).days

    # Fuente 6: Etiquetas y segmentos
    tags = contact.tags  # ej. "coach-aspirante", "tiene-audiencia", "sin-clientes-aún"

    return {
        "contact": contact,
        "opt_in_data": opt_in_data,
        "content_engagement": content_engagement,
        "email_activity": email_activity,
        "community_activity": community_activity,
        "days_since_last_interaction": days_since,
        "tags": tags,
        "meeting_type": calendar_event.title
    }
```

### Paso 3: Generar el Doc de Preparación para Nurture de Creadores

```
# Pseudocódigo: Agente de Nurture de Creadores — Generación del Doc

function generate_creator_prep_doc(context):
    prompt = f"""
Eres un asistente de conversaciones de nurture para un creador/coach que dirige un negocio digital.

CONTEXTO:
- Contacto: {context.contact.name}
- Cómo se Unió: {context.opt_in_data.source} el {context.opt_in_data.date}
- Metas Declaradas: {context.opt_in_data.goals}
- Contenido Consumido: {context.content_engagement.articles_opened}, {context.content_engagement.videos_watched}
- Actividad de Email: Abrió {context.email_activity.open_rate}% de emails, hizo clic en temas: {context.email_activity.click_topics}
- Actividad en Comunidad: {context.community_activity or "No está en la comunidad"}
- Días Desde la Última Interacción: {context.days_since_last_interaction}
- Etiquetas: {context.tags}
- Tipo de Reunión: {context.meeting_type}

TAREA:
Genera un documento de preparación de conversación de 1 página con estas secciones:

1. CONTEXTO DE LA RELACIÓN (cómo te encontraron, nivel de engagement, tiempo en tu mundo)
2. OBJETIVO DE LA CONVERSACIÓN (qué quieres lograr)
3. INICIADORES DE CONVERSACIÓN (3 referencias a su viaje específico)
4. PREGUNTAS DE PROFUNDIZACIÓN (5-7 preguntas enfocadas en situación, obstáculos, metas, disposición)
5. EVALUACIÓN DE ENCAJE CON LA OFERTA (cuál de tus ofertas coincide con su etapa)
6. RECOMENDACIÓN DE PRÓXIMO PASO (qué proponer al final de la llamada)

RESTRICCIONES:
- Mantener la longitud total bajo 500 palabras
- Ser cálido y personal — esto es una relación, no una transacción
- Referenciar contenido específico por nombre (títulos de artículos, temas de videos)
- Si falta información, escribir "Preguntar durante la llamada"

FORMATO DE SALIDA: Markdown
"""

    prep_doc = call_llm(
        model="claude-sonnet-4",
        prompt=prompt,
        max_tokens=1200,
        temperature=0.5  # Ligeramente más cálido para el contexto de creadores
    )

    return prep_doc
```

<ExampleCard label="Ejemplo de Doc de Preparación para Nurture de Creadores">

**Contexto de la Relación:** Alex se unió a tu lista hace 4 meses a través de la guía "Cómo Poner Precio a tu Coaching". Abrió 8/12 emails (67%), hizo clic en "Cómo Llenar un Programa Grupal" dos veces y en "Vender sin Manipular" una vez. Etiquetado como: coach-aspirante, sin-clientes-aún. Última interacción: hace 18 días (abrió "3 Errores que Cometen los Coaches Nuevos").

**Objetivo:** Evaluar disposición para el curso "Primeros 10 Clientes" (lanza en 2 semanas) e invitar si está calificado.

**Iniciador de Conversación 1:** "Noté que descargaste la guía de precios en enero y hiciste clic en el artículo del programa grupal dos veces — ¿estás pensando en lanzar una oferta grupal pronto, o todavía estás en el modo 1-a-1?"

**Pregunta de Profundización 1:** "¿Cuál es el mayor obstáculo que te impide conseguir tus primeros clientes ahora mismo?"

**Encaje con la Oferta:** El curso **Primeros 10 Clientes** encaja bien — están en la etapa de "sin clientes aún", se comprometieron con contenido de precios y programas, y el curso lanza en 2 semanas. Posible objeción: "No tengo audiencia todavía" (el curso incluye un módulo de construcción de audiencia).

**Próximo Paso:** Si expresan disposición y tienen 5-10 horas/semana para implementar, presentar el curso. Si están dudosos, invitar al taller gratuito "Atracción de Clientes" del jueves como próximo paso de bajo compromiso.

</ExampleCard>

<ComparisonBuilder
title="Tu Doc de Preparación para Nurture de Creadores"
persistKey="custom-ai-agents-L11-creator-prep"
prompt="Pega el contexto para una próxima llamada de nurture (nombre del contacto, cómo se unieron, contenido consumido, metas declaradas)"
expertExample="**Contexto de la Relación:** Jamie se unió hace 6 meses a través de la guía 'Construye Tu Primer Producto Digital'. Abrió 15/20 emails (75%), vio el video 'Estrategias de Precios' 3 veces, hizo clic en el enlace 'Playbook de Lanzamiento' dos veces. Etiquetado como: creador, tiene-audiencia (5K seguidores), sin-producto-aún. Última interacción: hace 12 días (hizo clic en artículo 'Validación de Producto').

**Objetivo:** Evaluar disposición para el 'Acelerador de Lanzamiento de Producto' (empieza en 3 semanas) y cerrar si está calificado.

**Iniciador de Conversación 1:** 'Vi que viste el video de precios varias veces y hiciste clic en el playbook de lanzamiento — suena como que te estás poniendo serio en crear algo. ¿Cuál es la idea de producto que estás considerando?'

**Pregunta de Profundización 1:** '¿Qué te impide lanzarlo en los próximos 30-60 días?'

**Encaje con la Oferta:** El **Acelerador de Lanzamiento de Producto** es perfecto — tiene audiencia, consumió contenido enfocado en productos intensamente, y el programa empieza en 3 semanas (urgencia). Posible objeción: 'No sé si mi idea es lo suficientemente buena' (el programa incluye módulo de validación).

**Próximo Paso:** Si tienen una idea de producto y 8-12 horas/semana para construir, presentar el acelerador. Si todavía están en la etapa de ideas, enviar el 'Checklist de Validación de Ideas' y programar un seguimiento en 2 semanas."
criteria={[
"Referencia contenido específico consumido (títulos de artículos/videos)",
"Los iniciadores de conversación se sienten personales, no genéricos",
"Las preguntas de profundización se enfocan en obstáculos y disposición",
"El encaje con la oferta está justificado por datos de engagement y etiquetas"
]}
/>

---

## La Implementación Dual

Ahora tienes **dos versiones del mismo agente**. Así es como implementar ambas:

### Opción 1: Agente Único con Cambio de Contexto

Construye un agente que detecte el tipo de reunión y cambie de contexto:

```
# Pseudocódigo: Agente de Preparación de Doble Contexto

function prep_agent(calendar_event):
    # Paso 1: Detectar contexto
    if calendar_event.title in ["Descubrimiento", "Ventas", "Demo"]:
        context_type = "b2b"
    elif calendar_event.title in ["Llamada de Estrategia", "Coaching", "Inscripción"]:
        context_type = "creator"
    else:
        context_type = "unknown"  # Por defecto B2B

    # Paso 2: Reunir contexto
    if context_type == "b2b":
        context = gather_b2b_context(calendar_event)
        prep_doc = generate_b2b_prep_doc(context)
    else:
        context = gather_creator_context(calendar_event)
        prep_doc = generate_creator_prep_doc(context)

    # Paso 3: Entregar
    deliver_prep_doc(prep_doc, channel="slack")

    return prep_doc
```

### Opción 2: Dos Agentes Separados

Construye dos flujos distintos en tu orquestador (n8n, Zapier, Make):

- **Flujo A:** "Prep para Descubrimiento B2B" — se dispara en eventos del calendario con "Descubrimiento" o "Ventas" en el título
- **Flujo B:** "Prep de Nurture para Creadores" — se dispara en eventos del calendario con "Estrategia" o "Coaching" en el título

**Ventaja:** Separación más limpia, más fácil de mantener.
**Desventaja:** Código/configuración duplicados.

<StrategyDuel
title="Agente Único vs Dos Agentes"
persistKey="custom-ai-agents-L11-duel"
scenario="Diriges tanto un SaaS B2B como un negocio de coaching. Tienes 2-3 llamadas de descubrimiento y 2-3 llamadas de nurture por semana."
strategyA={{
    name: "Agente Único con Cambio de Contexto",
    description: "Un flujo que detecta el tipo de reunión y cambia de prompts",
    pros: ["Menos duplicación", "Único punto de mantenimiento"],
    cons: ["Lógica más compleja", "Más difícil de depurar"]
  }}
strategyB={{
    name: "Dos Agentes Separados",
    description: "Dos flujos, cada uno optimizado para su contexto",
    pros: ["Lógica más simple por agente", "Más fácil de personalizar"],
    cons: ["Configuración duplicada", "Dos cosas que mantener"]
  }}
expertVerdict="Para solopreneurs: **Dos agentes separados** gana. La claridad añadida y la facilidad de personalización superan la duplicación menor. Puedes copiar y pegar el 80% de la configuración y ajustar los prompts."
/>

---

## Economía de Tokens: Qué Cuesta Esto

Ambos agentes son intensivos en prompts pero no caros:

| Modelo          | Tokens de Entrada (~) | Tokens de Salida (~) | Costo/Doc de Prep |
| --------------- | --------------------- | -------------------- | ----------------- |
| Claude Sonnet 4 | ~2,500                | ~1,000               | ~$0.02-0.03       |
| Claude Haiku    | ~2,500                | ~1,000               | ~$0.002           |
| GPT-4o          | ~2,500                | ~1,000               | ~$0.03-0.05       |
| GPT-4o-mini     | ~2,500                | ~1,000               | ~$0.002           |

**Con 10 llamadas/semana (5 B2B + 5 creadores):**

- Claude Sonnet: $0.20-0.30/semana = **$1.00-1.50/mes**
- Claude Haiku: $0.02/semana = **$0.10/mes**

Las **APIs de recopilación de datos** (scraping de LinkedIn, Google News, plataforma de email) cuestan más que las llamadas al LLM. Presupuesta $10-20/mes para APIs de enriquecimiento si ejecutas revisiones de datos frescos.

<ScenarioSimulator
title="Calculadora de ROI del Agente de Preparación"
persistKey="custom-ai-agents-L11-roi"
levers={[
{ id: "calls", label: "Llamadas por semana", min: 1, max: 20, step: 1, defaultValue: 8 },
{ id: "prepTime", label: "Tiempo de prep manual (min/llamada)", min: 5, max: 30, step: 5, defaultValue: 15 },
{ id: "hourlyRate", label: "Tu tarifa por hora ($)", min: 50, max: 500, step: 50, defaultValue: 150 }
]}
outputs={[
{ id: "timeSaved", label: "Tiempo ahorrado por mes (horas)", formula: "(calls * 4 * prepTime) / 60", unit: "hrs", precision: 1 },
{ id: "valueSaved", label: "Valor del tiempo ahorrado por mes ($)", formula: "(calls * 4 * prepTime / 60) * hourlyRate", unit: "$", precision: 0 }
]}
insight="Con {timeSaved} horas ahorradas/mes, eso son ${valueSaved} de tu tiempo de vuelta. Costo del agente: ~$1.50/mes. ROI: {(valueSaved / 1.5).toFixed(0)}x."
/>

---

## Control de Calidad: Verificación Puntual de Tus Docs de Preparación

Los agentes de IA alucinan. Los docs de preparación son de alto impacto — no quieres referenciar una publicación de LinkedIn que no existe o una señal de dolor que el prospecto nunca mencionó.

**La Regla de Verificación del 10%:** Cada semana, revisa manualmente 1-2 docs de preparación contra los datos fuente. Verifica:

1. **Precisión factual:** ¿Son reales las publicaciones de LinkedIn, artículos de noticias y referencias de email?
2. **Relevancia:** ¿Los puntos de conversación están realmente vinculados a sus señales de dolor, o son genéricos?
3. **Calidad de las preguntas:** ¿Las preguntas de descubrimiento/profundización tienen sentido para su etapa?
4. **Preparación de objeciones:** ¿Las objeciones anticipadas son realistas, o la IA está adivinando?

<LinterFeedback
title="Linter de Docs de Preparación"
persistKey="custom-ai-agents-L11-linter"
inputLabel="Pega un doc de preparación generado por tu agente"
rules={[
{
id: "specificity",
label: "Especificidad",
description: "Referencia contenido específico (publicación de LinkedIn, título de artículo, evento de noticias)",
keywords: ["publicó en LinkedIn", "artículo titulado", "anunció", "mencionó en email"],
antiKeywords: ["genérico", "típico", "generalmente"]
},
{
id: "questions",
label: "Calidad de Preguntas",
description: "Las preguntas son abiertas y apropiadas para la etapa",
keywords: ["Cómo", "Qué", "Cuéntame sobre", "Describe"],
antiKeywords: ["sí/no", "¿Tienes", "¿Estás"]
},
{
id: "proof",
label: "Relevancia de la Prueba",
description: "El caso de estudio o testimonio coincide con su contexto",
keywords: ["similar a", "misma industria", "misma etapa"],
antiKeywords: ["genérico", "cualquier empresa"]
}
]}
/>

---

## Sprint de Implementación: Construye Ambos Agentes Esta Semana

Aprendiste el patrón. Ahora constrúyelo.

<InteractiveChecklist
title="Tu Sprint de Construcción de Doble Agente en 7 Días"
persistKey="custom-ai-agents-L11-sprint"
items={[
"Día 1: Elige tu orquestador (n8n, Zapier, Make) y conecta tu calendario",
"Día 2: Construye el Agente de Prep para Descubrimiento B2B — configura el disparo, las fuentes de datos y el prompt",
"Día 3: Prueba el agente B2B con 3 próximas llamadas de descubrimiento — verifica la precisión",
"Día 4: Construye el Agente de Nurture para Creadores — adapta la config B2B para el contexto de creadores",
"Día 5: Prueba el agente de Creadores con 3 próximas llamadas de nurture — verifica la relevancia",
"Día 6: Configura los canales de entrega (Slack, email, CRM) y ejecuta ambos agentes en paralelo",
"Día 7: Revisa 5 docs de preparación (mezcla de B2B y creadores) — refina los prompts según las brechas de calidad"
]}
/>

---

## Resumen: Un Patrón, Contextos Infinitos

El patrón del agente de preparación es **universal**:

1. Reunir contexto (CRM + datos frescos)
2. Identificar el objetivo (qué quieres de la conversación)
3. Generar puntos de conversación (vinculados a su situación específica)
4. Preparar preguntas (descubrimiento o profundización)
5. Anticipar objeciones/preocupaciones (con respuestas listas)

Lo construiste para **descubrimiento B2B** y **nurture de creadores**. Pero el mismo patrón funciona para:

- **Check-ins de éxito del cliente** (reúne datos de uso, identifica riesgo de churn, prepara preguntas de retención)
- **Llamadas de asociación** (reúne contexto de la empresa, identifica oportunidades de colaboración, prepara preguntas de intercambio de valor)
- **Pitches a inversores** (reúne el portafolio del inversor, identifica el encaje con su tesis, prepara respuestas a objeciones)

Domina este agente y habrás desbloqueado una **meta-habilidad**: adaptar flujos de trabajo de IA a cualquier contexto.

<InsightCard icon="🎯" title="La Habilidad Real">
Construir agentes no se trata de memorizar frameworks. Se trata de **reconocer patrones** y **adaptarlos a tu contexto**. El agente de preparación es un patrón. B2B y creadores son contextos. Una vez que ves el patrón, puedes aplicarlo en cualquier lugar.
</InsightCard>

---

## Vista Previa de la Próxima Lección

En la Lección 12, construirás el **Blueprint Completo del Stack de Agentes** — el plano definitivo para tu sistema de ventas con IA. Reunirás todos los agentes en un sistema cohesivo con arquitectura de referencia, sprints de implementación, monitoreo y métricas de ROI.

Luego ensamblarás los 5 agentes en un **sistema de ventas completo impulsado por IA** y ejecutarás tu primer sprint de extremo a extremo: investigación de prospectos → borrador de email → preparación de reunión → llamada → seguimiento. Todo automatizado, todo personalizado, todo en 7 días.
