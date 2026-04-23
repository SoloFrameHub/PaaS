---
title: "Agente 4: Agente de Preparación de Reuniones"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 6
---

# Agente 4: Agente de Preparación de Reuniones

## El Pánico de los 30 Minutos

Faltan 5 minutos para tu llamada de descubrimiento. Abres tu CRM. Está el nombre del prospecto. Su empresa. Una dirección de email. Eso es todo.

Te lanzas a LinkedIn. Escaneas su perfil. Googl­eas la empresa. Revisas si publicó algo recientemente. Estás armando contexto mientras el recordatorio del calendario vuelve a sonar. **2 minutos.**

Entras a la llamada a medias, haciendo preguntas genéricas y sin notar que acaban de cerrar una ronda Serie A la semana pasada — el gancho perfecto para tu conversación.

**Esto les pasa a todos los solopreneurs.** Estás manejando 5-10 llamadas por semana, y cada una requiere 15-30 minutos de preparación para ser efectiva. Son 2-4 horas de investigación que no tienes.

El Agente de Preparación de Reuniones resuelve esto: **30 minutos antes de cada llamada programada, genera un brief de 1 página** con todo lo que necesitas — datos actualizados del prospecto, puntos de conversación vinculados a sus señales de dolor, preguntas de descubrimiento, preparación para objeciones y pruebas relevantes.

Entras a cada reunión como si llevaras semanas siguiéndoles el rastro.

<InsightCard icon="🎯" title="La Ventaja Real">
No es solo tiempo ahorrado. Es **confianza**. Cuando mencionas su publicación reciente en LinkedIn o el aumento en contrataciones de su empresa en los primeros 60 segundos, les estás diciendo: "Hice la tarea. Esto no es spam."
</InsightCard>

---

## Qué Hace Este Agente (Y Qué No Hace)

<FlipCard 
  front="Agente de Preparación: Función Principal" 
  back="Genera automáticamente un brief de reunión de 1 página 30 minutos antes de cada llamada programada, extrayendo datos frescos del CRM, el calendario, hilos de email y fuentes en vivo (LinkedIn, noticias)." 
/>

### El Trabajo del Agente

**Entrada:** Evento de calendario (aviso de 30 min) + registro del CRM + hilo de email + datos web frescos

**Salida:** Documento de preparación de 1 página con:

1. **Repaso Rápido** — Datos clave del brief de investigación original (Agente 1)
2. **Objetivo de la Reunión** — Lo que quieres lograr (descubrimiento, demo, cierre, etc.)
3. **Puntos de Conversación** — 3-5 bullets vinculados a sus señales de dolor específicas
4. **Preguntas de Descubrimiento** — 5-7 preguntas para hacer, ordenadas por prioridad
5. **Preparación de Objeciones** — Las 2-3 objeciones más probables con respuestas basadas en LARA
6. **Prueba Relevante** — Caso de estudio o testimonio para referenciar

**Entrega:** Slack DM, email o dashboard del CRM — 30 minutos antes de la llamada

<RangeSlider 
  label="¿Con qué frecuencia entras a llamadas sin preparación?" 
  min={1} 
  max={10} 
  lowLabel="Nunca" 
  highLabel="Siempre" 
  persistKey="custom-ai-agents-L6-prep-frequency" 
/>

### Qué No Hace

- **No se une a la llamada.** Tú eres el humano que dirige la conversación.
- **No toma decisiones.** Presenta opciones; tú eliges el enfoque.
- **No reemplaza las habilidades de descubrimiento.** Te da mejores preguntas para hacer, pero aún necesitas escuchar y adaptarte (ver Curso 13).

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Founders Técnicos">
Piensa en este agente como un **pre-commit hook para llamadas de ventas**. Se ejecuta automáticamente antes del "evento" (la reunión), valida tu contexto y señala advertencias (datos desactualizados, campos faltantes, nuevos eventos desencadenantes).
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches/Consultores">
Este agente es tu **asistente de preparación de sesiones**. Reúne todo lo que revisarías manualmente antes de una llamada con un cliente — su formulario de incorporación, notas de sesiones anteriores, actividad reciente — y lo estructura para una revisión rápida.
</ContextualNote>

---

## La Plantilla del Documento de Preparación

Esta es la estructura exacta que genera el agente. La personalizarás en la sesión de construcción.

<SlideNavigation>
<Slide title="Sección 1: Repaso Rápido">

### Repaso Rápido (30 segundos para escanear)

```
PROSPECTO: Sarah Chen, VP de Marketing @ DataPulse
EMPRESA: SaaS Serie A, 45 empleados, $3M ARR
ÚLTIMO CONTACTO: Intercambio de email hace 3 días (preguntó sobre precios)
PUNTAJE ICP: 8/10 (alto encaje)
ETAPA DEL DEAL: Descubrimiento programado
```

**Actividad Reciente:**

- Publicó en LinkedIn hace 2 días sobre desafíos de atribución
- La empresa anunció Serie A ($8M) la semana pasada
- Contratando 3 roles de marketing (señal: escalando el equipo)

**Señales de Dolor Clave:**

- No puede atribuir ingresos al marketing de contenido
- Los reportes manuales toman 10+ horas/semana
- La herramienta actual (HubSpot) no tiene atribución multitoque

Esta sección se **genera automáticamente desde el CRM + fuentes de datos frescos**. El agente revisa LinkedIn, Google News y Crunchbase para actualizaciones desde el brief de investigación original.

</Slide>

<Slide title="Sección 2: Objetivo de la Reunión">

### Objetivo de la Reunión

```
META PRINCIPAL: Calificar encaje y descubrir presupuesto/timeline
META SECUNDARIA: Obtener compromiso para demo técnica la próxima semana
MÉTRICA DE ÉXITO: Próximo paso claro programado antes de que termine la llamada
```

El agente infiere esto de la etapa del deal en tu CRM. Puedes sobreescribirlo manualmente si es necesario.

<ExampleCard label="Ejemplo: Diferentes Objetivos por Etapa">
- **Llamada de descubrimiento:** Calificar encaje, descubrir profundidad del dolor, obtener compromiso de demo
- **Llamada de demo:** Mostrar la característica específica que resuelve su dolor, manejar objeciones, proponer prueba
- **Llamada de cierre:** Negociar términos, abordar preocupaciones finales, obtener firma
</ExampleCard>

</Slide>

<Slide title="Sección 3: Puntos de Conversación">

### Puntos de Conversación (Referencia estos al inicio)

```
1. "Vi tu publicación sobre los desafíos de atribución — eso es exactamente lo que resolvemos."
   → Se vincula a su actividad reciente en LinkedIn

2. "Felicidades por la Serie A. La mayoría de las empresas en tu etapa chocan contra la misma pared de reportes."
   → Reconoce su etapa de crecimiento, te posiciona como experto

3. "Mencionaste que HubSpot no tiene atribución multitoque. Nuestros clientes ven que esa brecha les cuesta entre el 20-30% de su presupuesto de marketing."
   → Agita el dolor con un número específico

4. "Con 3 roles de marketing abiertos, vas a necesitar reportes automatizados aún más."
   → Se vincula a su señal de contratación

5. "Ayudamos a una empresa similar en Serie A (Acme Corp) a reducir el tiempo de reportes de 12 horas a 30 minutos por semana."
   → Prueba social, resultado específico
```

Estos son **generados por IA basándose en el brief de investigación + datos frescos**. El agente extrae de:

- Publicaciones recientes de LinkedIn (señales de dolor)
- Noticias de la empresa (financiamiento, contrataciones, lanzamientos)
- Contexto del hilo de email (lo que ya dijeron)
- Tu propuesta de valor (del artefacto del Curso 2)

</Slide>

<Slide title="Sección 4: Preguntas de Descubrimiento">

### Preguntas de Descubrimiento (Haz en este orden)

```
SITUACIÓN (Entiende el estado actual):
1. "Cuéntame tu proceso actual de reportes — ¿quién está involucrado, cuánto tiempo toma?"
2. "¿Qué herramientas están usando para atribución hoy?"

PROBLEMA (Profundiza en el dolor):
3. "¿Cuál es la mayor brecha en tu configuración actual?"
4. "¿Cuánto tiempo dedica tu equipo a reportes manuales cada semana?"

IMPLICACIÓN (Explora el costo de la inacción):
5. "Si esto no se resuelve en el próximo trimestre, ¿qué pasa?"
6. "¿Cómo afecta la falta de atribución a tus decisiones de presupuesto?"

NECESIDAD-BENEFICIO (Haz que articulen el valor):
7. "Si pudieras automatizar esto, ¿qué haría tu equipo con las 10 horas extra por semana?"
```

Esto sigue el **framework SPIN** (del Curso 13). El agente ordena las preguntas por prioridad según la etapa del deal y las señales de dolor conocidas.

</Slide>

<Slide title="Sección 5: Preparación de Objeciones">

### Preparación de Objeciones (Las 3 más probables)

```
OBJECIÓN 1: "Ya estamos usando HubSpot."
RESPUESTA LARA:
- Escuchar: "Tiene sentido — HubSpot es sólido para muchas cosas."
- Reconocer: "La brecha que más equipos encuentran es la atribución multitoque."
- Reencuadrar: "Piensa en nosotros como la capa que se sienta encima de HubSpot, llenando esa brecha específica."
- Preguntar: "¿HubSpot actualmente te muestra qué puntos de contacto generan ingresos?"

OBJECIÓN 2: "No tenemos presupuesto ahora mismo."
RESPUESTA LARA:
- Escuchar: "Lo entiendo — la Serie A es todo sobre priorización."
- Reconocer: "La pregunta es si el costo de no resolver esto es mayor que el costo de la herramienta."
- Reencuadrar: "Si los reportes manuales cuestan 10 horas/semana a $75/hora, eso es $3K/mes en trabajo. Nuestra herramienta cuesta $500/mes."
- Preguntar: "¿Qué umbral haría de esto una prioridad?"

OBJECIÓN 3: "¿Podemos empezar con una prueba gratuita?"
RESPUESTA LARA:
- Escuchar: "Absolutamente — ofrecemos una prueba de 14 días."
- Reconocer: "La clave es asegurarse de que veas valor en esos 14 días."
- Reencuadrar: "Definamos cómo se ve el éxito desde el inicio, para que sepas si está funcionando."
- Preguntar: "¿Qué necesitarías ver en la prueba para seguir adelante?"
```

El agente **predice objeciones basándose en la etapa del deal, el tamaño de la empresa y los patrones pasados** en tu CRM. Genera respuestas basadas en LARA (del Curso 14).

</Slide>

<Slide title="Sección 6: Prueba Relevante">

### Prueba Relevante (Referencia durante la llamada)

```
CASO DE ESTUDIO: Acme Corp (SaaS Serie A, 50 empleados)
DESAFÍO: Gastaba 12 horas/semana en reportes manuales de atribución
SOLUCIÓN: Implementó nuestro dashboard de atribución multitoque
RESULTADO: Redujo el tiempo de reportes a 30 min/semana, reasignó 2 miembros del equipo a trabajo de campaña
CITA: "Por fin sabemos qué canales realmente generan ingresos." — CMO

TESTIMONIO: "DataPulse nos ayudó a demostrar el ROI de marketing a nuestra junta." — VP de Marketing, SimilarCo
```

El agente **empareja casos de estudio con el perfil del prospecto** (tamaño de empresa, etapa, industria, señal de dolor). Extrae de tu biblioteca de casos de estudio (almacenada en el CRM o un doc).

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Checklist de Secciones del Documento de Preparación"
persistKey="custom-ai-agents-L6-sections"
items={[
"Repaso Rápido (prospecto + empresa + actividad reciente)",
"Objetivo de la Reunión (meta principal + métrica de éxito)",
"Puntos de Conversación (3-5, vinculados a señales de dolor)",
"Preguntas de Descubrimiento (5-7, ordenadas por SPIN)",
"Preparación de Objeciones (top 2-3 con respuestas LARA)",
"Prueba Relevante (caso de estudio o testimonio)"
]}
/>

---

## Cómo Funciona el Agente (Arquitectura)

<InsightCard icon="⚙️" title="Lógica de Disparo">
El agente se ejecuta **30 minutos antes de un evento del calendario** etiquetado como "llamada de prospecto" o "llamada de descubrimiento." Revisa tu CRM con el email del asistente y genera el brief.
</InsightCard>

### Flujo Paso a Paso

```
[DISPARO: Evento de calendario en 30 minutos]
    ↓
[1. Identificar al Prospecto]
    - Extraer email del asistente del evento de calendario
    - Buscar registro en el CRM por email
    - Si no hay coincidencia → enviar alerta ("Sin registro en CRM para esta reunión")
    ↓
[2. Recopilar Contexto]
    - Extraer brief de investigación (salida del Agente 1)
    - Extraer hilo de email (últimos 3-5 intercambios)
    - Extraer etapa del deal, puntaje ICP, fecha del último contacto
    ↓
[3. Actualizar Datos]
    - Revisar LinkedIn para nuevas publicaciones (últimos 7 días)
    - Revisar Google News para menciones de la empresa (últimos 30 días)
    - Revisar Crunchbase para actualizaciones de financiamiento/contrataciones
    ↓
[4. Generar Documento de Preparación]
    - Llamada al LLM con prompt estructurado (ver pseudocódigo abajo)
    - Salida: documento markdown de 1 página
    ↓
[5. Entregar]
    - Enviar a Slack DM
    - O enviar por email a tu bandeja
    - O guardar en el dashboard del CRM
    ↓
[6. Prompt Post-Reunión]
    - Después de que termina la llamada, enviar mensaje por Slack: "¿Cómo salió la llamada? ¿Agrego notas?"
    - El usuario responde → el agente actualiza la etapa del deal + notas en el CRM
```

<FlipCard 
  front="¿Por Qué 30 Minutos Antes?" 
  back="Muy temprano (2 horas) y olvidas los detalles. Muy tarde (5 minutos) y estás apurado. 30 minutos te da tiempo para leer, internalizar y ajustar tu enfoque." 
/>

### Fuentes de Datos (Entradas)

<ComparisonBuilder
title="Tus Fuentes de Datos para la Preparación"
persistKey="custom-ai-agents-L6-data-sources"
prompt="Lista las fuentes de datos que conectarás a este agente"
expertExample="CRM (HubSpot), Calendario (Google Calendar), Email (API de Gmail), LinkedIn (pegado manual o Evaboot), Noticias (Google News API), Casos de estudio (doc en Notion)"
criteria={[
"Sistema de CRM especificado",
"Integración de calendario identificada",
"Fuentes de datos frescos incluidas (LinkedIn, noticias)",
"Ubicación de la biblioteca de casos de estudio/prueba definida"
]}
/>

---

## Construyendo Tu Agente de Preparación de Reuniones

Ahora especificarás tu propio agente. Este es el artefacto que implementarás en el sprint de la Lección 12.

<TemplateBuilder
title="Especificación del Agente de Preparación de Reuniones"
persistKey="custom-ai-agents-L6-spec"
sections={[
{
id: "trigger",
title: "Configuración del Disparo",
fields: [
{
id: "timing",
label: "¿Cuántos minutos antes de la reunión?",
placeholder: "ej. 30 minutos",
type: "text"
},
{
id: "event-filter",
label: "¿Qué palabras clave del evento de calendario activan este agente?",
placeholder: "ej. 'descubrimiento', 'demo', 'llamada con prospecto'",
type: "text"
},
{
id: "delivery",
label: "¿Dónde se debe entregar el doc de preparación?",
placeholder: "ej. Slack DM, email, dashboard del CRM",
type: "text"
}
]
},
{
id: "data-sources",
title: "Fuentes de Datos",
fields: [
{
id: "crm",
label: "Sistema de CRM",
placeholder: "ej. HubSpot, Pipedrive, Airtable",
type: "text"
},
{
id: "calendar",
label: "Sistema de calendario",
placeholder: "ej. Google Calendar, Outlook",
type: "text"
},
{
id: "email",
label: "Sistema de email (para contexto del hilo)",
placeholder: "ej. Gmail, Outlook",
type: "text"
},
{
id: "fresh-data",
label: "Fuentes de datos frescos",
placeholder: "ej. LinkedIn, Google News, Crunchbase",
type: "textarea"
},
{
id: "proof-library",
label: "¿Dónde están almacenados tus casos de estudio/testimonios?",
placeholder: "ej. doc en Notion, campo personalizado del CRM, Google Doc",
type: "text"
}
]
},
{
id: "output-format",
title: "Preferencias de Formato de Salida",
fields: [
{
id: "sections",
label: "¿Qué secciones quieres en el doc de preparación?",
placeholder: "ej. Repaso Rápido, Puntos de Conversación, Preguntas de Descubrimiento, Prep de Objeciones, Prueba",
type: "textarea"
},
{
id: "length",
label: "Longitud máxima (palabras o páginas)?",
placeholder: "ej. 1 página, 500 palabras",
type: "text"
},
{
id: "tone",
label: "Preferencia de tono/estilo",
placeholder: "ej. bullets concisos, conversacional, técnico",
type: "text"
}
]
},
{
id: "customization",
title: "Reglas Personalizadas",
fields: [
{
id: "disc-integration",
label: "¿Quieres incluir notas de personalidad DISC? (sí/no)",
placeholder: "ej. sí — si el tipo DISC está en el CRM",
type: "text"
},
{
id: "objection-library",
label: "¿Tienes una biblioteca personalizada de objeciones? ¿Dónde?",
placeholder: "ej. doc en Notion con respuestas LARA",
type: "text"
},
{
id: "special-instructions",
label: "¿Alguna otra instrucción personalizada?",
placeholder: "ej. siempre incluir comparación con competidores si se conoce",
type: "textarea"
}
]
}
]}
/>

---

## La Plantilla del Prompt (Lógica Central)

Aquí está el prompt del LLM que impulsa el agente. Lo personalizarás según tu especificación de arriba.

```python
# Plantilla del Prompt del Agente de Preparación de Reuniones

SYSTEM_PROMPT = """
Eres un asistente de preparación de reuniones para un solopreneur.
Tu trabajo: generar un brief conciso y accionable de 1 página para una llamada de ventas próxima.

REGLAS:
1. Sé específico — referencia datos reales del registro del prospecto
2. Prioriza actividad reciente (últimos 7-30 días) sobre datos antiguos
3. Vincula los puntos de conversación a señales de dolor, no a características genéricas
4. Ordena las preguntas de descubrimiento por el framework SPIN (Situación → Problema → Implicación → Necesidad-Beneficio)
5. Genera respuestas de objeciones basadas en LARA (Escuchar, Reconocer, Reencuadrar, Preguntar)
6. Empareja casos de estudio con el perfil del prospecto (tamaño, etapa, industria, dolor)
7. Si faltan datos, escribe "No disponible" — no alucines
8. Mantén la salida total bajo 500 palabras
"""

USER_PROMPT = f"""
Genera un documento de preparación para esta llamada:

EVENTO DE CALENDARIO:
- Título: {event.title}
- Hora: {event.start_time}
- Asistentes: {event.attendees}

REGISTRO DEL PROSPECTO (del CRM):
{crm_record}

BRIEF DE INVESTIGACIÓN (del Agente 1):
{research_brief}

HILO DE EMAIL (últimos 3 intercambios):
{email_thread}

DATOS FRESCOS (últimos 7 días):
- LinkedIn: {linkedin_activity}
- Noticias: {company_news}
- Crunchbase: {crunchbase_updates}

ETAPA DE LA REUNIÓN: {deal_stage}
PUNTAJE ICP: {icp_score}/10

TU PROPUESTA DE VALOR:
{value_prop}

BIBLIOTECA DE CASOS DE ESTUDIO:
{case_studies}

FORMATO DE SALIDA:
1. Repaso Rápido (datos clave + actividad reciente)
2. Objetivo de la Reunión (meta principal + métrica de éxito)
3. Puntos de Conversación (3-5, vinculados a señales de dolor)
4. Preguntas de Descubrimiento (5-7, ordenadas por SPIN)
5. Preparación de Objeciones (top 2-3 con respuestas LARA)
6. Prueba Relevante (1 caso de estudio o testimonio)

Genera el documento de preparación ahora.
"""
```

<FlipCard 
  front="¿Por Qué Incluir el Hilo de Email?" 
  back="El contexto de los intercambios recientes evita que preguntes algo que ya respondieron. También pone en superficie objeciones que ya plantearon, para que puedas preparar respuestas." 
/>

### Pseudocódigo: Flujo Completo del Agente

```python
# Agente 4: Agente de Preparación de Reuniones
# Disparo: Evento de calendario en 30 minutos

def meeting_prep_agent(event):
    # Paso 1: Identificar prospecto
    attendee_email = extract_attendee_email(event)
    crm_record = crm.lookup_by_email(attendee_email)

    if not crm_record:
        notify_slack(f"⚠️ Sin registro en CRM para la reunión: {event.title}")
        return

    # Paso 2: Recopilar contexto
    research_brief = crm_record.get("research_brief")  # Del Agente 1
    email_thread = fetch_email_thread(attendee_email, limit=5)
    deal_stage = crm_record.get("deal_stage")
    icp_score = crm_record.get("icp_score")

    # Paso 3: Actualizar datos (verificar novedades desde la última investigación)
    linkedin_activity = get_linkedin_posts(crm_record.linkedin_url, days=7)
    company_news = search_news(crm_record.company, days=30)
    crunchbase_updates = check_crunchbase(crm_record.company)

    # Paso 4: Cargar datos de soporte
    value_prop = load_value_proposition()  # Del artefacto del Curso 2
    case_studies = load_case_studies()     # De tu biblioteca

    # Paso 5: Construir prompt
    prompt = USER_PROMPT.format(
        event=event,
        crm_record=crm_record,
        research_brief=research_brief,
        email_thread=email_thread,
        linkedin_activity=linkedin_activity,
        company_news=company_news,
        crunchbase_updates=crunchbase_updates,
        deal_stage=deal_stage,
        icp_score=icp_score,
        value_prop=value_prop,
        case_studies=case_studies
    )

    # Paso 6: Generar documento de preparación
    prep_doc = call_llm(
        model="claude-sonnet-4",
        system=SYSTEM_PROMPT,
        prompt=prompt,
        max_tokens=1000,
        temperature=0.3  # Temperatura baja para precisión factual
    )

    # Paso 7: Entregar
    send_to_slack(prep_doc)
    # O: send_email(prep_doc)
    # O: crm.update_contact(crm_record.id, {"meeting_prep": prep_doc})

    # Paso 8: Programar seguimiento post-reunión
    schedule_message(
        time=event.end_time + 5_minutes,
        message=f"¿Cómo salió la llamada con {crm_record.name}? Responde con notas y actualizaré el CRM.",
        channel="slack_dm"
    )

    return prep_doc
```

<InsightCard icon="💡" title="El Hook Post-Reunión">
El trabajo del agente no termina cuando empieza la llamada. Después de la reunión, te pide notas. Respondes en Slack: "Buena llamada. Pasando a demo. Objeción: presupuesto. Dar seguimiento en 3 días." El agente analiza esto y actualiza el CRM automáticamente.
</InsightCard>

---

## Economía de Tokens y Costos

<ScenarioSimulator
title="Calculadora de Costos del Agente de Preparación"
persistKey="custom-ai-agents-L6-cost-sim"
levers={[
{ id: "meetings", label: "Reuniones por semana", min: 1, max: 20, step: 1, defaultValue: 5 },
{ id: "model", label: "Elección de modelo", min: 1, max: 3, step: 1, defaultValue: 2, options: ["Haiku ($)", "Sonnet ($$)", "GPT-4o ($$$)"] }
]}
outputs={[
{
id: "weekly-cost",
label: "Costo semanal",
formula: "model === 1 ? meetings * 0.002 : model === 2 ? meetings * 0.02 : meetings * 0.04",
unit: "$",
precision: 2
},
{
id: "monthly-cost",
label: "Costo mensual",
formula: "model === 1 ? meetings * 4 * 0.002 : model === 2 ? meetings * 4 * 0.02 : meetings * 4 * 0.04",
unit: "$",
precision: 2
}
]}
insight="Con `{meetings}` reuniones/semana usando {model === 1 ? 'Haiku' : model === 2 ? 'Sonnet' : 'GPT-4o'}, estás gastando ~${monthly-cost}/mes en preparación de reuniones. Compara eso con 15-30 min de preparación manual por llamada (2.5-10 horas/semana = $125-500 en costo de oportunidad)."
/>

### Desglose de Tokens (Por Documento de Preparación)

| Modelo          | Tokens de Entrada (~) | Tokens de Salida (~) | Costo/Doc de Prep |
| --------------- | --------------------- | -------------------- | ----------------- |
| Claude Haiku    | ~2,500                | ~800                 | ~$0.002           |
| Claude Sonnet 4 | ~2,500                | ~800                 | ~$0.02            |
| GPT-4o          | ~2,500                | ~800                 | ~$0.03-0.04       |
| GPT-4o-mini     | ~2,500                | ~800                 | ~$0.002           |

**Los tokens de entrada incluyen:** Registro del CRM, brief de investigación, hilo de email, datos frescos (LinkedIn/noticias), propuesta de valor, casos de estudio.

**Tokens de salida:** El documento de preparación de 500 palabras.

Con **5 reuniones/semana**, estás viendo:

- **Haiku:** $0.01/semana = $0.50/mes
- **Sonnet:** $0.10/semana = $5/mes
- **GPT-4o:** $0.15-0.20/semana = $8/mes

**Costo insignificante.** El tiempo ahorrado (15-30 min por llamada × 5 llamadas = 75-150 min/semana) vale $75-150 en costo de oportunidad.

---

## Avanzado: Integración de la Personalidad DISC

Si completaste el **Curso 13 (Psicología de Ventas y DISC)**, puedes añadir notas basadas en personalidad al agente.

<FlipCard 
  front="DISC en la Preparación de Reuniones" 
  back="Si el tipo DISC del prospecto está almacenado en tu CRM, el agente incluye notas de estilo de comunicación: ritmo, nivel de detalle, enfoque de toma de decisiones y consejos para manejo de objeciones." 
/>

### Ejemplo: Sección de Preparación Mejorada con DISC

```
TIPO DISC: Alto D (Dominante)

ESTILO DE COMUNICACIÓN:
- Ritmo: Rápido — ve al grano rápidamente
- Detalle: Bajo — sáltate los antecedentes, enfócate en resultados
- Toma de decisiones: Decisivo — dirán sí o no rápido
- Estilo de objeciones: Directo — "¿Por qué debería importarme?" o "Demuéstralo."

ENFOQUE PARA LA REUNIÓN:
- Lidera con el resultado: "Ayudamos a empresas como la tuya a reducir el tiempo de reportes en un 80%."
- Salta el pequeño talk — apreciarán la franqueza
- Prepárate para el desafío — los Alto D cuestionan para probarte
- Termina con un próximo paso claro — quieren momentum

MANEJO DE OBJECIONES:
- Si dicen "Demuéstralo" → comparte una métrica específica de un caso de estudio
- Si dicen "¿Por qué debería importarme?" → vincula a su meta de ingresos/crecimiento
- No lo tomes personal — así es como evalúan soluciones
```

El agente extrae esto de una **biblioteca de prompts DISC** que creas (almacenada en tu CRM o un doc). Cada tipo DISC tiene una sección personalizada.

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches">
Esto es especialmente poderoso para llamadas de incorporación de clientes. Si conoces su tipo DISC desde un formulario de intake, el agente adapta tu enfoque — ej. los clientes Alto S necesitan seguridad y construcción de relación; los clientes Alto C necesitan datos y claridad de proceso.
</ContextualNote>

---

## Probando Tu Agente (Simulación)

Antes de desplegar este agente en vivo, pruébalo con reuniones pasadas.

<MiniRoleplay
  scenario="Tienes una llamada de descubrimiento en 30 minutos con un VP de Marketing de una empresa SaaS Serie A. Publicaron en LinkedIn la semana pasada sobre desafíos de atribución. Tu CRM muestra que respondieron a tu email frío preguntando sobre precios. El agente genera un doc de preparación. Revísalo e identifica: (1) ¿Qué es útil? (2) ¿Qué falta? (3) ¿Qué cambiarías?"
  role="Eres el solopreneur revisando el doc de preparación"
  persistKey="custom-ai-agents-L6-roleplay"
  modelResponse="Útil: Punto de conversación sobre su publicación en LinkedIn, preguntas SPIN, preparación de objeción para 'ya usan HubSpot.' Falta: No hay caso de estudio que coincida con su perfil (SaaS Serie A). Cambio: Añadir una pregunta sobre la disponibilidad del equipo para la implementación."
/>

### Checklist de Prueba

<InteractiveChecklist
title="Checklist de Prueba del Agente de Preparación de Reuniones"
persistKey="custom-ai-agents-L6-test"
items={[
"Ejecutar el agente en 3 reuniones pasadas (usar eventos antiguos del calendario + registros del CRM)",
"Verificar: ¿Extrae datos frescos correctamente? (LinkedIn, noticias)",
"Verificar: ¿Son los puntos de conversación específicos al prospecto?",
"Verificar: ¿Están las preguntas de descubrimiento ordenadas por SPIN?",
"Verificar: ¿Son las objeciones realistas para la etapa del deal?",
"Verificar: ¿El caso de estudio coincide con el perfil del prospecto?",
"Verificar: ¿Es la salida menor a 500 palabras?",
"Verificar: ¿Señala datos faltantes en vez de alucinarlos?",
"Ajustar el prompt según los resultados de la prueba",
"Desplegar a producción (disparo de 30 min en el calendario real)"
]}
/>

---

## Modos de Fallo Comunes (Y Cómo Solucionarlos)

<ClassifyExercise
title="Clasifica Estos Fallos de Preparación de Reuniones"
persistKey="custom-ai-agents-L6-classify"
categories={[
{ id: "data", label: "Problema de Datos", color: "#ef4444" },
{ id: "prompt", label: "Problema de Prompt", color: "#f59e0b" },
{ id: "integration", label: "Problema de Integración", color: "#3b82f6" }
]}
items={[
{
id: "1",
content: "El agente genera puntos de conversación sobre una publicación de LinkedIn que el prospecto nunca hizo",
correctCategory: "data",
explanation: "El scraper de LinkedIn falló o devolvió el perfil incorrecto. Solución: Agregar validación de URL."
},
{
id: "2",
content: "El doc de preparación tiene 1,200 palabras en vez de 500",
correctCategory: "prompt",
explanation: "El LLM ignoró la restricción de longitud. Solución: Agregar 'Máximo 500 palabras. Detener después de la sección de Prueba Relevante.'"
},
{
id: "3",
content: "El agente no se dispara para un evento del calendario etiquetado como 'Llamada con Cliente'",
correctCategory: "integration",
explanation: "El filtro de disparo solo busca 'descubrimiento' o 'demo'. Solución: Agregar 'llamada con cliente' a la lista de palabras clave."
},
{
id: "4",
content: "Las preguntas de descubrimiento son genéricas, no vinculadas al dolor del prospecto",
correctCategory: "prompt",
explanation: "El prompt no enfatiza usar el brief de investigación. Solución: Agregar 'Basa las preguntas en las señales de dolor del brief de investigación.'"
},
{
id: "5",
content: "El caso de estudio no coincide con la industria del prospecto",
correctCategory: "data",
explanation: "La biblioteca de casos de estudio carece de metadatos (industria, tamaño, etapa). Solución: Agregar etiquetas a los casos de estudio."
}
]}
/>

### Los 5 Modos de Fallo Principales

| Fallo                                | Causa                                      | Solución                                                                                                          |
| ------------------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Datos alucinados**                 | El LLM inventa hechos cuando faltan datos  | Agregar instrucción anti-alucinación: "Si los datos no están disponibles, escribe 'No encontrado'"                |
| **Puntos de conversación genéricos** | El prompt no enfatiza la especificidad     | Agregar: "Referencia datos reales del registro del prospecto. Sin declaraciones genéricas."                       |
| **Caso de estudio incorrecto**       | Sin lógica de emparejamiento en el prompt  | Agregar perfil del prospecto al prompt: "Emparejar caso de estudio con `{company_size}`, `{stage}`, `{industry}`" |
| **Doc de prep demasiado largo**      | El LLM ignora la restricción de longitud   | Agregar parada forzada: "Máximo 500 palabras. Terminar después de la sección de Prueba Relevante."                |
| **El agente no se dispara**          | Desajuste de palabras clave del calendario | Expandir palabras clave de disparo: "descubrimiento", "demo", "llamada", "reunión", "prospecto"                   |

---

## Post-Reunión: Cerrando el Ciclo

El trabajo del agente no termina cuando empieza la llamada. Después de la reunión, te ayuda a **capturar notas y actualizar el CRM**.

### Flujo Post-Reunión

```
[La reunión termina]
    ↓
[5 minutos después: mensaje de Slack]
"¿Cómo salió la llamada con Sarah Chen? Responde con notas y actualizaré el CRM."
    ↓
[Tú respondes]
"Buena llamada. Pasando a etapa de demo. Objeción: preocupaciones de presupuesto. Dar seguimiento en 3 días con calculadora de ROI."
    ↓
[El agente analiza tu mensaje]
- Etapa del deal: Descubrimiento → Demo
- Próximo paso: Enviar calculadora de ROI
- Fecha de seguimiento: Hoy + 3 días
- Objeción: Presupuesto
    ↓
[El agente actualiza el CRM]
- Etapa = "Demo"
- Próxima tarea = "Enviar calculadora de ROI" (vence en 3 días)
- Notas = "Objeción: preocupaciones de presupuesto. Necesita justificación de ROI."
    ↓
[El agente programa recordatorio]
Recordatorio de Slack en 3 días: "Dar seguimiento a Sarah Chen — enviar calculadora de ROI"
```

Esto **cierra el ciclo** de preparación → reunión → seguimiento sin entrada manual de datos al CRM.

<InsightCard icon="🔄" title="El Ciclo de Retroalimentación">
Con el tiempo, el agente aprende qué puntos de conversación funcionan (basándose en la progresión del deal) y qué objeciones surgen más seguido (basándose en tus notas). Puedes usar estos datos para refinar tus prompts.
</InsightCard>

---

## Tu Plan de Implementación

Ya especificaste tu Agente de Preparación de Reuniones. Así es como lo construirás en el **sprint de implementación de la Lección 12**.

<InteractiveChecklist
title="Plan de Construcción del Agente de Preparación de Reuniones"
persistKey="custom-ai-agents-L6-build-plan"
items={[
"Semana 1, Día 1: Configurar integración de calendario (API de Google Calendar o Zapier)",
"Semana 1, Día 2: Conectar CRM (extraer brief de investigación, etapa del deal, hilo de email)",
"Semana 1, Día 3: Agregar fuentes de datos frescos (LinkedIn, Google News, Crunchbase)",
"Semana 1, Día 4: Escribir y probar el prompt del LLM (usar 3 reuniones pasadas)",
"Semana 1, Día 5: Construir el mecanismo de entrega (Slack, email o dashboard del CRM)",
"Semana 2, Día 1: Agregar captura de notas post-reunión (prompt de Slack + actualización del CRM)",
"Semana 2, Día 2: Probar de extremo a extremo con 5 reuniones próximas",
"Semana 2, Día 3: Refinar el prompt según los resultados de la prueba",
"Semana 2, Día 4: Desplegar a producción (disparo de 30 min en todas las llamadas con prospectos)",
"Semana 2, Día 5: Monitorear durante 1 semana, recopilar retroalimentación, iterar"
]}
/>

---

## Resumen: Lo Que Aprendiste

<FlipCard 
  front="Agente de Preparación de Reuniones: Valor Central" 
  back="Ahorra 15-30 min de investigación manual por llamada, pone en superficie datos frescos (LinkedIn, noticias) automáticamente, genera preguntas SPIN y respuestas LARA para objeciones, y cierra el ciclo con actualizaciones del CRM post-reunión." 
/>

Ahora sabes:

1. **Qué hace el agente** — Genera docs de preparación de 1 página 30 min antes de las llamadas
2. **Cómo funciona** — Extrae del CRM + datos frescos, ejecuta el prompt del LLM, entrega a Slack/email
3. **La plantilla del prompt** — Salida estructurada con 6 secciones (Repaso, Objetivo, Puntos de Conversación, Preguntas, Objeciones, Prueba)
4. **Economía de tokens** — $0.002-0.04 por doc de preparación (costo insignificante)
5. **Modos de fallo** — Alucinación, salida genérica, caso de estudio incorrecto, problemas de longitud
6. **Ciclo post-reunión** — Captura notas, actualiza CRM, programa seguimientos

**Próxima lección:** Agente 5 (Agente de Resumen Post-Llamada) — genera automáticamente resúmenes de llamadas, elementos de acción y actualizaciones del CRM desde transcripciones de reuniones.

<InteractiveChecklist
title="Tus Próximos Pasos"
persistKey="custom-ai-agents-L6-next-steps"
items={[
"Completa tu especificación del Agente de Preparación de Reuniones (TemplateBuilder de arriba)",
"Identifica 3 reuniones pasadas para usar como casos de prueba",
"Redacta tu plantilla de prompt personalizada (copia el pseudocódigo y adáptalo)",
"Decide: ¿entrega por Slack, email o dashboard del CRM?",
"Agrega este agente a tu plan de sprint de implementación de la Lección 12"
]}
/>

---

## Quiz: Dominio del Agente de Preparación de Reuniones

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Por qué el Agente de Preparación de Reuniones se dispara 30 minutos antes de una llamada (en vez de 2 horas o 5 minutos)?",
      "options": [
        "Para reducir los costos de API agrupando solicitudes",
        "Para darte tiempo de leer e internalizar sin olvidar los detalles",
        "Porque las APIs de calendario solo soportan intervalos de 30 minutos",
        "Para evitar abrumarte con demasiados docs de preparación"
      ],
      "correctAnswer": 1,
      "explanation": "30 minutos es el punto ideal: suficientemente temprano para revisar sin apresurarse, suficientemente reciente como para retener los detalles durante la llamada."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Cuál es el propósito principal de incluir datos frescos (publicaciones de LinkedIn, noticias) en el doc de preparación?",
      "options": [
        "Para hacer el doc más largo e impresionante",
        "Para poner en superficie eventos desencadenantes recientes para puntos de conversación personalizados",
        "Para probar que las fuentes de datos están funcionando correctamente",
        "Para reemplazar el brief de investigación original"
      ],
      "correctAnswer": 1,
      "explanation": "Los datos frescos (últimos 7-30 días) te dan ganchos oportunos — ej. 'Vi tu publicación sobre los desafíos de atribución' — que hacen que tu alcance se sienta actual y relevante."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "¿Por qué el agente genera 3 puntos de conversación en vez de 10?",
      "options": [
        "Para ahorrar tokens y reducir costos",
        "Porque 3 es más fácil de recordar y usar en la conversación",
        "Porque el LLM no puede generar más de 3 de forma confiable",
        "Para forzarte a priorizar manualmente"
      ],
      "correctAnswer": 1,
      "explanation": "3-5 puntos de conversación es el rango óptimo: suficiente variedad para adaptarse a la conversación, pocos para recordar y desplegar naturalmente."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Qué framework usa el agente para ordenar las preguntas de descubrimiento?",
      "options": [
        "BANT (Presupuesto, Autoridad, Necesidad, Tiempo)",
        "SPIN (Situación, Problema, Implicación, Necesidad-Beneficio)",
        "MEDDIC (Métricas, Comprador Económico, Criterios de Decisión, Proceso de Decisión, Identificar Dolor, Campeón)",
        "AIDA (Atención, Interés, Deseo, Acción)"
      ],
      "correctAnswer": 1,
      "explanation": "SPIN es el framework de descubrimiento enseñado en el Curso 13. El agente ordena las preguntas desde Situación (estado actual) → Problema (dolor) → Implicación (costo) → Necesidad-Beneficio (valor)."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "¿Qué pasa si el agente no puede encontrar un caso de estudio que coincida con el prospecto?",
      "options": [
        "Genera un caso de estudio falso para llenar el espacio",
        "Omite la sección de Prueba Relevante por completo",
        "Escribe 'Sin caso de estudio disponible' y sugiere crear uno",
        "Usa un testimonio genérico en su lugar"
      ],
      "correctAnswer": 2,
      "explanation": "La instrucción anti-alucinación le dice al agente que señale los datos faltantes en vez de inventarlos. Esto te incita a agregar un caso de estudio para ese perfil."
    },
    {
      "id": "q6",
      "type": "true-false",
      "question": "El Agente de Preparación de Reuniones debería unirse a la llamada y tomar notas en tiempo real.",
      "correctAnswer": false,
      "explanation": "Falso. Este agente genera un doc de preparación antes de la llamada. El Agente de Resumen Post-Llamada (Lección 7) se encarga de la transcripción y toma de notas."
    },
    {
      "id": "q7",
      "type": "true-false",
      "question": "Incluir el hilo de email en el prompt ayuda a evitar hacer preguntas que el prospecto ya respondió.",
      "correctAnswer": true,
      "explanation": "Verdadero. El hilo de email proporciona contexto sobre lo que ya se discutió, para que no repitas preguntas ni pierdas las objeciones que ya plantearon."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "Con 5 reuniones/semana usando Claude Sonnet, ¿cuál es el costo mensual aproximado de este agente?",
      "options": ["$0.50", "$5", "$50", "$500"],
      "correctAnswer": 1,
      "explanation": "$5/mes. A ~$0.02 por doc de preparación × 5 reuniones/semana × 4 semanas = $0.40-0.50/mes. Insignificante comparado con el tiempo ahorrado (75-150 min/semana)."
    }
  ]
}
```
