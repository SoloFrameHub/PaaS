---
title: "Agente 5: Agente de Resumen Post-Llamada"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 7
---

## El Error de $40K Que No Puedes Permitirte

Sarah cerró un deal de $40K en marzo. Para julio, el cliente dio churn. Cuando le preguntaron por qué, no recordaba los detalles específicos de sus puntos de dolor originales, las promesas que había hecho o las métricas de éxito en las que habían acordado. Sus notas en el CRM decían: "Buena llamada. Avanzando."

La entrevista de salida del cliente reveló que se sentían "desalineados desde el primer día" — Sarah había prometido características que su producto no priorizaba, y el equipo de onboarding no tenía contexto sobre lo que el cliente realmente necesitaba.

**El costo:** $40K en ingresos perdidos, 6 meses de esfuerzo desperdiciado y una reputación dañada en una industria donde todos se conocen.

**La causa raíz:** Sin documentación sistemática de las llamadas. Solo corazonadas y notas vagas.

<InsightCard icon="🎯" title="El Problema Real">
Tu memoria es terrible. Tu CRM es tan bueno como lo que pones en él. Y escribir notas detalladas mientras mantienes rapport en una llamada es imposible.
</InsightCard>

Aquí es donde el **Agente 5: Agente de Resumen Post-Llamada** se vuelve indispensable. Convierte transcripciones desordenadas en registros estructurados y accionables del CRM — automáticamente.

---

## Qué Hace Este Agente (Y Por Qué Es Tu Agente de Mayor ROI)

El Agente de Resumen Post-Llamada toma una transcripción bruta de llamada (de Zoom, Google Meet o Gong) y genera:

1. **Resumen Ejecutivo** — 2-3 oraciones que capturan el resultado de la llamada
2. **Puntos de Dolor Clave** — Lista estructurada de los desafíos discutidos, con citas directas
3. **Compromisos Adquiridos** — Qué prometiste tú, qué prometieron ellos, con fechas límite
4. **Próximos Pasos** — Acciones específicas para ambas partes
5. **Evaluación de Etapa del Deal** — Actualización recomendada de la etapa del CRM basada en señales de la conversación
6. **Banderas Rojas** — Preocupaciones de presupuesto, desajustes de tiempo, soluciones competidoras mencionadas
7. **Puntos de Conversación para la Próxima Llamada** — Qué dar seguimiento, qué evitar

**Tiempo ahorrado:** 10-15 minutos de toma de notas manual por llamada.

**Mejora de calidad:** Tasa de captura del 80-90% vs 30-40% con notas manuales.

**Impacto en el negocio:** Tasas de cierre más altas (recuerdas lo que importa), onboarding más rápido (el contexto de entrega es completo), menor churn (entregas lo que prometiste).

<RangeSlider 
  label="¿Con qué frecuencia revisas tus notas de llamadas antes de la siguiente conversación?" 
  min={1} 
  max={10} 
  lowLabel="Nunca" 
  highLabel="Siempre" 
  persistKey="custom-ai-agents-L7-review-frequency" 
/>

---

## El Pipeline de Transcripción a Resumen

Así es como funciona el agente:

<SlideNavigation>
<Slide title="Paso 1: Capturar la Transcripción">

**Fuentes de Transcripción:**

- **Zoom:** Auto-transcripción (gratis con cuentas de pago), exporta como .vtt o .txt
- **Google Meet:** Transcripción disponible (cuentas Workspace), exporta como Google Doc
- **Gong/Chorus:** Transcripción automática + inteligencia de conversación ($$$ pero vale la pena para equipos de ventas)
- **Otter.ai:** Transcripción en tiempo real, integra con Zoom/Meet, nivel gratuito: 600 min/mes
- **Manual:** Sube audio a la API de Whisper (OpenAI) por $0.006/minuto

**Opciones de Disparo:**

- **Automático:** Zapier/n8n observa nuevas grabaciones de Zoom → descarga transcripción → dispara el agente
- **Manual:** Pegas la transcripción en un formulario después de la llamada
- **Programado:** El agente se ejecuta por la noche, procesa todas las transcripciones del día

<ExampleCard label="La Configuración de Sarah">
Sarah usa la auto-transcripción de Zoom (incluida en su plan Pro de $15/mes). Tiene un flujo de n8n que observa su carpeta de grabaciones en la nube de Zoom. Cuando aparece una nueva grabación, n8n descarga la transcripción y dispara el Agente de Resumen Post-Llamada. El resumen está en su CRM dentro de los 5 minutos de que termina la llamada.
</ExampleCard>

</Slide>

<Slide title="Paso 2: Limpiar y Estructurar la Transcripción">

Las transcripciones brutas son desordenadas:

- Las etiquetas de hablante a menudo están mal ("Hablante 1" vs "Sarah")
- Las palabras de relleno ("eh," "este," "como") saturan el texto
- Las marcas de tiempo fragmentan las oraciones
- Las conversaciones cruzadas crean secciones confusas

**Pasos de preprocesamiento:**

1. Eliminar marcas de tiempo y palabras de relleno
2. Corregir etiquetas de hablante (tú vs el prospecto)
3. Combinar oraciones fragmentadas
4. Marcar secciones con [inaudible] o [cruce]

**Por qué importa:** Una transcripción limpia produce un resumen un 30-40% mejor. El LLM puede enfocarse en el contenido, no en analizar el ruido.

```python
# Pseudocódigo: Limpieza de Transcripción
def clean_transcript(raw_transcript):
    # Eliminar marcas de tiempo
    cleaned = remove_timestamps(raw_transcript)

    # Eliminar palabras de relleno
    fillers = ["eh", "este", "como", "o sea", "tipo"]
    cleaned = remove_words(cleaned, fillers)

    # Corregir etiquetas de hablante
    cleaned = replace_speaker_labels(cleaned, {
        "Hablante 1": "Tú",
        "Hablante 2": prospect_name
    })

    # Combinar oraciones fragmentadas
    cleaned = merge_fragments(cleaned)

    return cleaned
```

</Slide>

<Slide title="Paso 3: Generar el Resumen">

Aquí es donde el LLM hace el trabajo pesado. La estructura del prompt:

```
Eres un asistente de ventas para un solopreneur.
Genera un resumen estructurado de llamada a partir de esta transcripción.

TRANSCRIPCIÓN:
{cleaned_transcript}

CONTEXTO DEL PROSPECTO:
Nombre: {prospect_name}
Empresa: {company}
Etapa del Deal: {current_stage}
Puntaje ICP: {icp_score}

FORMATO DE SALIDA:
## Resumen Ejecutivo
[2-3 oraciones: qué pasó, cuál es el resultado]

## Puntos de Dolor Clave
- [Dolor 1 con cita directa]
- [Dolor 2 con cita directa]
- [Dolor 3 con cita directa]

## Compromisos Adquiridos
### Tú te comprometiste:
- [Acción 1 con fecha límite]
- [Acción 2 con fecha límite]

### Ellos se comprometieron:
- [Acción 1 con fecha límite]
- [Acción 2 con fecha límite]

## Próximos Pasos
1. [Acción específica para ti]
2. [Acción específica para ellos]
3. [Tiempo de seguimiento]

## Evaluación de Etapa del Deal
Actual: {current_stage}
Recomendada: [etapa] porque [razón basada en señales de la conversación]

## Banderas Rojas
- [Bandera 1 si aplica]
- [Bandera 2 si aplica]

## Puntos de Conversación para la Próxima Llamada
- [Tema 1 a retomar]
- [Tema 2 a explorar]
- [Tema 3 a evitar]

REGLAS:
- Usa citas directas para los puntos de dolor (textual de la transcripción)
- Sé específico con fechas límite y acciones
- Señala explícitamente las menciones de presupuesto/tiempo/competencia
- Si falta información, escribe "No discutido"
- Recomienda cambios de etapa solo si las señales de la conversación son claras
```

</Slide>

<Slide title="Paso 4: Guardar en el CRM">

El resumen es datos estructurados. Mapéalos a los campos del CRM:

| Sección del Resumen    | Campo del CRM            | Tipo                                        |
| ---------------------- | ------------------------ | ------------------------------------------- |
| Resumen Ejecutivo      | Notas de Llamada         | Texto largo                                 |
| Puntos de Dolor Clave  | Puntos de Dolor          | Etiquetas de selección múltiple             |
| Compromisos Adquiridos | Tareas                   | Lista de tareas (con fechas de vencimiento) |
| Próximos Pasos         | Próxima Acción           | Texto de una línea                          |
| Evaluación de Etapa    | Etapa                    | Lista de opciones                           |
| Banderas Rojas         | Alertas                  | Etiquetas                                   |
| Puntos de Conversación | Notas de Prep de Llamada | Texto largo                                 |

**Bonus:** Crear tareas automáticamente desde los compromisos. Si el resumen dice "Te comprometiste: Enviar precios el viernes," el agente crea una tarea en el CRM: "Enviar precios a [prospecto]" con fecha de vencimiento = este viernes.

</Slide>

<Slide title="Paso 5: Revisión Humana (Opcional pero Recomendada)">

Los resúmenes de IA son 80-90% precisos. El 10-20% de errores suelen ser:

- Citas mal atribuidas (el prospecto lo dijo, el resumen te lo atribuye a ti)
- Compromisos alucinados (la IA infiere una promesa que no fue explícita)
- Matices perdidos (sarcasmo, vacilación, tono)

**El flujo de revisión:**

1. El agente genera el resumen y lo guarda como "Borrador" en el CRM
2. Recibes una notificación de Slack: "Resumen de llamada listo para [prospecto]"
3. Revisas, editas si es necesario, haces clic en "Aprobar"
4. El resumen pasa a "Final" y se crean las tareas

**Costo de tiempo:** 2-3 minutos de revisión vs 10-15 minutos de toma de notas manual.

<InsightCard icon="⚡" title="La Regla 80/20">
El agente hace el 80% del trabajo en 30 segundos. Tú haces el 20% final (revisión + edición) en 2 minutos. Tiempo total: 2.5 minutos vs 15 minutos manual. Eso es un ahorro de tiempo del 83%.
</InsightCard>

</Slide>
</SlideNavigation>

---

## Construyendo Tu Agente de Resumen Post-Llamada

Construyamos esto paso a paso.

<TemplateBuilder
title="Especificación del Agente de Resumen Post-Llamada"
persistKey="custom-ai-agents-L7-spec"
sections={[
{
id: "trigger",
title: "1. Configuración del Disparo",
fields: [
{
id: "source",
label: "Fuente de Transcripción",
placeholder: "ej. auto-transcripción de Zoom",
type: "text"
},
{
id: "trigger-type",
label: "Tipo de Disparo",
placeholder: "ej. Automático (n8n observa la carpeta de Zoom) o Manual (pegar transcripción)",
type: "text"
},
{
id: "timing",
label: "Cuándo Ejecutar",
placeholder: "ej. Inmediatamente después de que termina la llamada o Batch nocturno a las 11pm",
type: "text"
}
]
},
{
id: "inputs",
title: "2. Datos de Entrada",
fields: [
{
id: "transcript",
label: "Formato de Transcripción",
placeholder: "ej. .vtt de Zoom, .txt de Otter, o texto pegado",
type: "text"
},
{
id: "context",
label: "Contexto del CRM a Incluir",
placeholder: "ej. Nombre del prospecto, empresa, etapa actual del deal, puntaje ICP, fecha de última interacción",
type: "textarea"
}
]
},
{
id: "processing",
title: "3. Pasos de Procesamiento",
fields: [
{
id: "cleaning",
label: "Reglas de Limpieza de Transcripción",
placeholder: "ej. Eliminar marcas de tiempo, eliminar palabras de relleno (eh, este, como), corregir etiquetas de hablante",
type: "textarea"
},
{
id: "model",
label: "Modelo LLM",
placeholder: "ej. Claude Sonnet 4 (mejor calidad) o GPT-4o (más rápido)",
type: "text"
},
{
id: "max-tokens",
label: "Tokens Máximos de Salida",
placeholder: "ej. 1500 (cubre la mayoría de las llamadas)",
type: "text"
}
]
},
{
id: "outputs",
title: "4. Mapeo de Salida",
fields: [
{
id: "crm-fields",
label: "Campos del CRM a Actualizar",
placeholder: "ej. Notas de Llamada, Puntos de Dolor (etiquetas), Próxima Acción, Etapa del Deal, Tareas",
type: "textarea"
},
{
id: "notifications",
label: "Preferencias de Notificación",
placeholder: "ej. DM de Slack con enlace al resumen, Email con resumen completo, Alerta en el dashboard del CRM",
type: "textarea"
}
]
},
{
id: "quality",
title: "5. Control de Calidad",
fields: [
{
id: "review-required",
label: "¿Requiere Revisión Humana?",
placeholder: "ej. Sí (resúmenes guardados como Borrador) o No (auto-aprobar)",
type: "text"
},
{
id: "quality-checks",
label: "Verificaciones Automáticas de Calidad",
placeholder: "ej. Señalar si no se encontraron puntos de dolor, Señalar si no se hicieron compromisos, Señalar si la etapa del deal no cambió",
type: "textarea"
}
]
}
]}
/>

---

## La Plantilla de Prompt (Lista para Copiar y Pegar)

Aquí está la plantilla de prompt lista para producción para tu Agente de Resumen Post-Llamada:

```markdown
Eres un asistente de ventas para un solopreneur.
Genera un resumen estructurado de llamada a partir de esta transcripción de llamada de ventas.

TRANSCRIPCIÓN:
{cleaned_transcript}

CONTEXTO DEL PROSPECTO:

- Nombre: {prospect_name}
- Empresa: {company}
- Etapa Actual del Deal: {current_stage}
- Puntaje ICP: {icp_score}/10
- Última Interacción: {last_interaction_date}

FORMATO DE SALIDA (usa exactamente esta estructura):

## Resumen Ejecutivo

[2-3 oraciones: qué pasó en esta llamada, cuál es el resultado, qué sigue]

## Puntos de Dolor Clave Discutidos

- [Punto de dolor 1 con cita directa de la transcripción]
- [Punto de dolor 2 con cita directa de la transcripción]
- [Punto de dolor 3 con cita directa de la transcripción]
  [Si no se discutieron puntos de dolor, escribe: "No se discutieron puntos de dolor específicos"]

## Compromisos Adquiridos

### Tú te comprometiste a:

- [Acción 1 con fecha límite si se mencionó]
- [Acción 2 con fecha límite si se mencionó]
  [Si no hay compromisos, escribe: "No se hicieron compromisos"]

### Ellos se comprometieron a:

- [Acción 1 con fecha límite si se mencionó]
- [Acción 2 con fecha límite si se mencionó]
  [Si no hay compromisos, escribe: "No se hicieron compromisos"]

## Próximos Pasos

1. [Acción específica para ti con tiempo]
2. [Acción específica para ellos con tiempo]
3. [Tiempo y método de seguimiento]

## Evaluación de Etapa del Deal

- Etapa Actual: {current_stage}
- Etapa Recomendada: [nombre de la etapa]
- Razón: [1-2 oraciones basadas en señales de la conversación: presupuesto discutido, tiempo confirmado, tomador de decisiones identificado, etc.]
  [Si no se recomienda cambio de etapa, escribe: "No se recomienda cambio"]

## Banderas Rojas

- [Preocupación de presupuesto si se mencionó]
- [Desajuste de tiempo si se mencionó]
- [Solución competidora si se mencionó]
- [Incertidumbre sobre el tomador de decisiones si se mencionó]
  [Si no hay banderas rojas, escribe: "No se identificaron banderas rojas"]

## Puntos de Conversación para la Próxima Llamada

- [Tema 1 para retomar o explorar más profundo]
- [Tema 2 para dar seguimiento]
- [Tema 3 para evitar según sus reacciones]

REGLAS CRÍTICAS:

1. Usa SOLO información de la transcripción — no inferas ni supongas
2. Para los puntos de dolor, usa citas directas (textual de la transcripción)
3. Para los compromisos, sé específico sobre qué y cuándo
4. Si falta información o no está clara, escribe "No discutido" o "No claro en la transcripción"
5. Señala explícitamente cualquier mención de presupuesto, tiempo, competencia o proceso de toma de decisiones
6. Recomienda cambios de etapa SOLO si hay señales claras (ej. pidieron precios = mover a etapa de Propuesta)
```

<FlipCard 
  front="¿Por Qué Citas Directas para Puntos de Dolor?" 
  back="Las citas directas son evidencia. Cuando das seguimiento, puedes decir 'Mencionaste que los reportes manuales toman 10 horas/semana' — eso es poderoso. Los puntos de dolor parafraseados pierden especificidad y credibilidad." 
/>

---

## Economía de Tokens y Costos

Calculemos el costo por resumen de llamada.

**Transcripción Típica de Llamada:**

- Llamada de 30 minutos = ~4,500 palabras = ~6,000 tokens (entrada)
- Salida del resumen = ~1,000 tokens

**Costo por Resumen:**

| Modelo          | Costo de Entrada | Costo de Salida | Total/Resumen |
| --------------- | ---------------- | --------------- | ------------- |
| Claude Sonnet 4 | ~$0.018          | ~$0.015         | **~$0.033**   |
| Claude Haiku    | ~$0.0015         | ~$0.00125       | **~$0.00275** |
| GPT-4o          | ~$0.03           | ~$0.06          | **~$0.09**    |
| GPT-4o-mini     | ~$0.0009         | ~$0.0006        | **~$0.0015**  |

**Con 10 llamadas/semana:**

- Claude Sonnet 4: **$0.33/semana** o **$17/año**
- Claude Haiku: **$0.03/semana** o **$1.50/año**
- GPT-4o: **$0.90/semana** o **$47/año**
- GPT-4o-mini: **$0.015/semana** o **$0.78/año**

<InsightCard icon="💰" title="Verificación de Realidad del Costo">
Incluso con el modelo más caro (GPT-4o), estás gastando $47/año para ahorrar 520 horas de toma de notas manual (10 min × 52 semanas × 10 llamadas). Son $0.09 por hora ahorrada. ROI absurdamente bueno.
</InsightCard>

**Recomendación:** Empieza con Claude Sonnet 4 para calidad. Si haces 50+ llamadas/semana, cambia a Haiku para reducir costos (la caída de calidad es mínima para este caso de uso).

---

## El Flujo de n8n (Plano Visual)

Así se construye esto en n8n:

```
[Disparo: Webhook de Zoom]
  ↓
[Solicitud HTTP: Descargar Transcripción desde la API de Zoom]
  ↓
[Nodo de Código: Limpiar Transcripción]
  - Eliminar marcas de tiempo
  - Eliminar palabras de relleno
  - Corregir etiquetas de hablante
  ↓
[Solicitud HTTP: Obtener Contexto del CRM]
  - Obtener nombre del prospecto, empresa, etapa del deal, puntaje ICP
  ↓
[Nodo de Agente IA: Claude Sonnet 4]
  - Prompt del sistema: [Plantilla de Resumen Post-Llamada]
  - Entrada: {cleaned_transcript, crm_context}
  - Salida: {summary_json}
  ↓
[Nodo de Código: Analizar Resumen en Campos]
  - Extraer: executive_summary, pain_points, commitments, next_steps, stage_recommendation, red_flags
  ↓
[Nodo IF: ¿Se Requiere Revisión?]
  SÍ → [Actualización de CRM: Guardar como Borrador]
         → [Notificación de Slack: "Resumen listo para revisión: {prospect_name}"]
  NO  → [Actualización de CRM: Guardar como Final]
         → [Crear Tareas desde Compromisos]
         → [Actualizar Etapa del Deal si se Recomendó]
  ↓
[Fin]
```

<ExampleCard label="El Flujo de Trabajo de Sarah en Acción">
Sarah tiene una llamada de descubrimiento de 45 minutos con un prospecto a las 2pm. Para las 2:50pm:

1. La auto-transcripción de Zoom termina
2. n8n descarga la transcripción
3. El agente la limpia y genera el resumen
4. El resumen aparece en su CRM como Borrador
5. Slack le avisa: "Resumen de llamada listo para John en Acme Corp"
6. Ella lo revisa durante su café de las 3pm (2 minutos)
7. Hace clic en "Aprobar"
8. El CRM crea tareas: "Enviar precios el viernes" y "Programar demo el martes próximo"
9. La etapa del deal se actualiza de "Descubrimiento" a "Propuesta"

Tiempo total empleado: 2 minutos. Calidad: mejor que sus notas manuales.
</ExampleCard>

---

## Control de Calidad: El Linter de Resúmenes

No todos los resúmenes son iguales. Construye un **Linter de Resúmenes** para detectar problemas comunes:

<LinterFeedback
title="Linter de Calidad de Resúmenes"
persistKey="custom-ai-agents-L7-linter"
inputLabel="Pega tu resumen de llamada generado por IA"
rules={[
{
id: "pain-quotes",
label: "Puntos de Dolor Tienen Citas Directas",
description: "Cada punto de dolor debe incluir una cita textual de la transcripción",
keywords: ["\"", "'"],
antiKeywords: []
},
{
id: "commitments-specific",
label: "Los Compromisos Son Específicos",
description: "Los compromisos deben incluir qué y cuándo (ej. 'Enviar precios el viernes')",
keywords: ["para el", "antes del", "el día", "fecha límite"],
antiKeywords: ["pronto", "después", "eventualmente"]
},
{
id: "next-steps-actionable",
label: "Los Próximos Pasos Son Accionables",
description: "Cada próximo paso debe ser una acción concreta, no una intención vaga",
keywords: ["enviar", "programar", "revisar", "preparar", "dar seguimiento"],
antiKeywords: ["pensar en", "considerar", "quizás"]
},
{
id: "stage-reasoning",
label: "El Cambio de Etapa Tiene Razonamiento Claro",
description: "Si se recomienda un cambio de etapa, la razón debe referenciar señales específicas de la conversación",
keywords: ["porque", "basado en", "mencionaron", "preguntaron"],
antiKeywords: []
},
{
id: "red-flags-explicit",
label: "Las Banderas Rojas Son Explícitas",
description: "Las preocupaciones de presupuesto, tiempo, competencia o tomador de decisiones deben señalarse claramente",
keywords: ["presupuesto", "tiempo", "competidor", "decisión", "aprobación"],
antiKeywords: []
}
]}
/>

**Cómo usar el linter:**

1. El agente genera el resumen
2. El linter lo puntúa (0-100%)
3. Si el puntaje es < 70%, señalar para revisión humana
4. Si el puntaje es >= 70%, auto-aprobar (o revisar igualmente si prefieres)

---

## Modos de Fallo Comunes (Y Cómo Solucionarlos)

Incluso los agentes bien diseñados fallan. Aquí están los 5 modos de fallo más comunes para los Agentes de Resumen Post-Llamada:

<ClassifyExercise
title="Clasifica Estos Fallos de Resúmenes"
persistKey="custom-ai-agents-L7-failures"
categories={[
{ id: "hallucination", label: "Alucinación", color: "#ef4444" },
{ id: "misattribution", label: "Atribución Incorrecta", color: "#f59e0b" },
{ id: "missing-context", label: "Contexto Faltante", color: "#3b82f6" }
]}
items={[
{
id: "1",
content: "El resumen dice 'Se comprometieron a tomar una decisión para fin de mes' pero la transcripción muestra que dijeron 'Intentaremos decidir para fin de mes'",
correctCategory: "hallucination"
},
{
id: "2",
content: "El resumen atribuye un punto de dolor al prospecto, pero en realidad fuiste tú quien describió un desafío común",
correctCategory: "misattribution"
},
{
id: "3",
content: "El resumen recomienda pasar a la etapa de Propuesta, pero no menciona que aún no han confirmado el presupuesto",
correctCategory: "missing-context"
},
{
id: "4",
content: "El resumen dice 'Usan Salesforce' pero la transcripción muestra que dijeron 'Estamos evaluando Salesforce'",
correctCategory: "hallucination"
},
{
id: "5",
content: "El resumen lista una bandera roja sobre el tiempo, pero la preocupación la planteaste tú, no ellos",
correctCategory: "misattribution"
}
]}
/>

**Soluciones:**

| Modo de Fallo                         | Solución                                                                                                                                                                                            |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alucinación**                       | Agregar al prompt: "No inferas compromisos. Solo incluye declaraciones explícitas. Si no estás seguro, escribe 'No claro en la transcripción.'"                                                     |
| **Atribución Incorrecta**             | Mejorar la limpieza de etiquetas de hablante. Agregar al prompt: "Distingue claramente entre lo que dijiste tú y lo que dijo el prospecto."                                                         |
| **Contexto Faltante**                 | Incluir más contexto del CRM en el prompt (ej. "Presupuesto aún no confirmado" como un campo). Agregar al prompt: "Señala cualquier información faltante necesaria para la progresión de la etapa." |
| **Resúmenes Genéricos**               | Agregar al prompt: "Usa detalles específicos y citas directas. Evita declaraciones genéricas como 'Están interesados.'"                                                                             |
| **Recomendación de Etapa Incorrecta** | Agregar un rúbrica de cambio de etapa al prompt: "Solo recomienda cambio de etapa si: (1) Presupuesto discutido, (2) Tiempo confirmado, (3) Tomador de decisiones identificado."                    |

---

## Contexto B2B vs Creador: ¿Qué Cambia?

La estructura central del agente es la misma, pero las secciones del resumen se adaptan:

### Enfoque B2B:

- **Puntos de Dolor:** Ineficiencias operacionales, fugas de ingresos, riesgos de cumplimiento
- **Compromisos:** Demos, pruebas, propuestas de precios, evaluaciones técnicas
- **Banderas Rojas:** Proceso de aprobación de presupuesto, proveedores competidores, requisitos técnicos
- **Puntos de Conversación:** Cálculos de ROI, casos de estudio, requisitos de integración

### Enfoque Creador/Coach:

- **Puntos de Dolor:** Estancamientos en el crecimiento de audiencia, desafíos de monetización, limitaciones de tiempo
- **Compromisos:** Colaboraciones de contenido, inscripciones a cursos, paquetes de coaching
- **Banderas Rojas:** Preocupaciones de presupuesto (personal vs negocio), disponibilidad de tiempo, programas competidores
- **Puntos de Conversación:** Historias de éxito, encaje con la comunidad, soporte de implementación

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="Para Creadores">
Tus "llamadas" pueden ser sesiones de descubrimiento para clientes de coaching o llamadas de estrategia para estudiantes de cursos. El agente funciona igual — solo se enfoca en metas de transformación en vez de puntos de dolor empresariales.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches">
Usa este agente para llamadas de intake de clientes. El resumen se convierte en la base de tu plan de coaching — sus metas declaradas, obstáculos y compromisos forman tu hoja de ruta de sesiones.
</ContextualNote>

---

## Probando Tu Agente: El Desafío de 3 Llamadas

Antes de confiarle este agente a prospectos reales, pruébalo con 3 llamadas pasadas:

<InteractiveChecklist
title="Checklist de Prueba del Agente"
persistKey="custom-ai-agents-L7-testing"
items={[
"Encontrar transcripciones de 3 llamadas pasadas (o grabar 3 llamadas de prueba con un colega)",
"Ejecutar cada transcripción a través de tu agente",
"Comparar el resumen de IA con tus notas manuales (o tu memoria de la llamada)",
"Verificar: ¿Son precisos los puntos de dolor? ¿Son correctos los compromisos? ¿Se detectaron las banderas rojas?",
"Calcular precisión: ¿Qué % de detalles clave capturó el agente?",
"Identificar modos de fallo: ¿Qué se perdió? ¿Qué alucinó?",
"Refinar tu prompt basándote en los fallos",
"Re-probar con las mismas 3 transcripciones",
"Si la precisión es >= 80%, desplegar a producción",
"Si la precisión es < 80%, iterar en el prompt y re-probar"
]}
/>

**Criterio de éxito:** 80%+ de precisión en detalles clave (puntos de dolor, compromisos, próximos pasos). Deberías sentirte seguro usando el resumen sin volver a escuchar la llamada.

---

## Integración con los Agentes 1-4: El Pipeline Completo

Tu Agente de Resumen Post-Llamada no trabaja de forma aislada. Es parte de un pipeline de 5 agentes:

```
Agente 1: Investigación de Prospectos
  ↓ (genera brief de investigación)
Agente 2: Primer Borrador de Email
  ↓ (envía alcance personalizado)
[El prospecto responde, se programa la llamada]
  ↓
Agente 4: Preparación de Reuniones
  ↓ (genera doc de prep 30 min antes de la llamada)
[Tú tienes la llamada]
  ↓
Agente 5: Resumen Post-Llamada ← ESTÁS AQUÍ
  ↓ (genera resumen, actualiza CRM, crea tareas)
[Comienza la secuencia de seguimiento]
  ↓
Agente 2: Primer Borrador de Email (variante de seguimiento)
```

**El flujo de datos:**

- El brief de investigación del Agente 1 → alimenta el doc de prep del Agente 4
- El doc de prep del Agente 4 → te recuerda los puntos clave durante la llamada
- El resumen del Agente 5 → alimenta los emails de seguimiento del Agente 2
- El resumen del Agente 5 → alimenta el enriquecimiento del CRM del Agente 3 (actualiza la etapa del deal, añade etiquetas)

<InsightCard icon="🔗" title="El Efecto Compuesto">
Cada agente hace al siguiente mejor. La investigación del Agente 1 hace la preparación del Agente 4 más relevante. El resumen del Agente 5 hace los seguimientos del Agente 2 más personalizados. Todo el sistema se vuelve más inteligente con cada interacción.
</InsightCard>

---

## Tu Sprint de Implementación

Ya construiste la especificación. Ahora construye el agente.

<InteractiveChecklist
title="Sprint de Implementación de 7 Días"
persistKey="custom-ai-agents-L7-sprint"
items={[
"Día 1: Configurar la fuente de transcripción (auto-transcripción de Zoom u Otter.ai)",
"Día 2: Construir el flujo de n8n/Zapier (disparo → descargar → limpiar → LLM → CRM)",
"Día 3: Configurar la plantilla de prompt con los campos de contexto de tu CRM",
"Día 4: Probar con 3 transcripciones de llamadas pasadas, medir precisión",
"Día 5: Refinar el prompt según los resultados de la prueba, re-probar",
"Día 6: Configurar el mapeo de campos del CRM y la lógica de creación de tareas",
"Día 7: Desplegar a producción, ejecutar en tus próximas 3 llamadas, revisar resúmenes",
"Semana 2: Verificar aleatoriamente el 10% de los resúmenes, rastrear el tiempo ahorrado, iterar en el prompt"
]}
/>

**Métrica de éxito:** Para el final de la Semana 2, deberías estar ahorrando 10+ minutos por llamada y capturando el 80%+ de los detalles clave automáticamente.

---

## Resumen: Por Qué Este Agente Es Indispensable

Repasemos por qué el Agente de Resumen Post-Llamada es tu agente de mayor ROI:

<FlipCard 
  front="Ahorro de Tiempo" 
  back="10-15 minutos por llamada. Con 10 llamadas/semana, son 100-150 minutos/semana = 86-130 horas/año ahorradas." 
/>

<FlipCard 
  front="Mejora de Calidad" 
  back="Tasa de captura del 80-90% vs 30-40% con notas manuales. Recuerdas lo que importa, entregas lo que prometiste y cierras más deals." 
/>

<FlipCard 
  front="Costo" 
  back="$17-47/año (según el modelo). Menos que una sola comida de trabajo. ROI absurdo." 
/>

<FlipCard 
  front="Prevención de Churn" 
  back="Cuando tienes un registro completo de lo que prometiste, puedes cumplirlo. Menor churn = mayor LTV." 
/>

<FlipCard 
  front="Calidad de Entrega" 
  back="Si contratas un CSM o especialista de onboarding, obtienen contexto completo. Sin momentos de '¿Sarah prometió qué?'" 
/>

**La conclusión:** Este agente se paga solo después de 2-3 llamadas. Todo lo que viene después es ganancia pura (tiempo y calidad).

---

## Vista Previa de la Próxima Lección

Ya construiste 5 agentes de ventas centrales:

1. Agente de Investigación de Prospectos
2. Agente de Primer Borrador de Email
3. Agente de Enriquecimiento de CRM
4. Agente de Preparación de Reuniones
5. Agente de Resumen Post-Llamada

En la **Lección 8: Orquestación Multi-Agente y Flujos de Datos**, conectaremos estos agentes en un sistema unificado. Aprenderás:

- Cómo diseñar flujos de datos entre agentes (investigación → borrador → prep → resumen)
- Cuándo usar ejecución de agentes secuencial vs paralela
- Cómo manejar fallos de agentes y reintentos
- Cómo monitorear y depurar pipelines multi-agente
- Decisiones de arquitectura autoalojada vs SaaS

Nos vemos ahí.
