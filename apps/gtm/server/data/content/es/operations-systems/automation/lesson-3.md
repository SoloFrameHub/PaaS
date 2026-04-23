---
title: "Automatización 2: Registrador de Reuniones (Llamada → CRM → Seguimiento)"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 3
---

Acabas de terminar una llamada de descubrimiento de 45 minutos. Fue bien. El prospecto hizo preguntas detalladas sobre precios, mencionó un punto de dolor específico que puedes resolver y dijo "envíame algo para revisar."

Ahora necesitas registrar la reunión en tu CRM, actualizar la etapa del negocio, enviar un email de seguimiento y crear una tarea para verificar la semana próxima.

Son 15 minutos de trabajo administrativo después de cada reunión.

Si tienes 8-12 reuniones por mes, eso son 2 horas de administración post-reunión — tiempo que podría gastarse en tu próxima secuencia de contacto.

El Registrador de Reuniones lo elimina.

---

## Por Qué el Trabajo Administrativo Post-Reunión Es un Problema de Ingresos

No se trata solo del tiempo. Se trata de lo que sucede cuando omites el trabajo administrativo.

<InsightCard icon="⚠️" title="La Brecha del Trabajo Administrativo de Reuniones">
Solo el 44% de las reuniones de ventas reciben un seguimiento dentro de las 24 horas. La mayoría de los fundadores en solitario tienen buenas intenciones pero malos sistemas — terminan una reunión, planean "registrarla después," luego se ven absorbidos por el email y lo olvidan. Ese negocio nunca recibe un seguimiento. Muere en silencio.

El Registrador de Reuniones hace que olvidar sea imposible.
</InsightCard>

<FlipCard
  front="¿Qué sucede cuando no registras las reuniones en tu CRM?"
  back="Los datos de velocidad de tu pipeline son incorrectos (no puedes rastrear las duraciones de las etapas sin marcas de tiempo de actividad). Tu pronóstico se basa en información incompleta. Tus tareas de seguimiento solo existen en tu memoria o bandeja de entrada. Los negocios se estancan porque no hay ningún sistema que los rastree."
/>

<FlipCard
  front="¿Qué crea una reunión correctamente registrada?"
  back="Un registro de actividad en el CRM con fecha, tipo, duración y participante. Una etapa de negocio actualizada. Una tarea de seguimiento con una fecha límite específica. Un email de agradecimiento opcional enviado automáticamente. Un rastro de datos que alimenta tu análisis de velocidad del Curso 41."
/>

---

## El Patrón del Registrador de Reuniones

El Registrador de Reuniones se activa después de cada llamada de descubrimiento, demo o reunión de ventas. Aquí está el flujo completo:

<ProgressiveReveal title="El Flujo del Registrador de Reuniones" persistKey="automation-L3-flow">

<RevealSection title="Paso 1: Disparador — Reunión Terminada">

**Mejores disparadores:**

1. **"Invitado Creado" de Calendly + retraso de tiempo** — Cuando alguien reserva un evento de Calendly, programa la automatización para que se ejecute cuando el horario de la reunión haya pasado. El paso de Retraso de Zapier o el módulo de Suspensión de Make lo maneja.

2. **Evento de Google Calendar terminado** — Si usas Google Calendar (no Calendly), activa en eventos de calendario que coincidan con criterios específicos (p. ej., el nombre del evento contiene "Descubrimiento" o "Demo").

3. **Cambio manual de etapa del negocio en CRM** — Si no usas Calendly, puedes activar en un cambio manual de etapa de CRM como respaldo. Menos automatizado, pero aun mejor que no registrar nada.

**Recomendación:** Usa Calendly + retraso de tiempo. Es el disparador más confiable porque Calendly tiene un evento de webhook dedicado para citas completadas.

</RevealSection>

<RevealSection title="Paso 2: Crear Actividad en CRM">

Crea un registro de actividad vinculado al contacto y al negocio:

- **Tipo de Actividad:** Reunión
- **Asunto:** "Llamada de Descubrimiento — [Nombre del Contacto]"
- **Fecha:** Fecha/hora de la reunión (de los datos del evento de Calendly)
- **Duración:** Duración de la reunión (del tipo de evento de Calendly — p. ej., 30 o 45 minutos)
- **Resultado:** Dejar en blanco inicialmente — lo completarás manualmente después de revisar tus notas
- **Notas:** Extrae cualquier respuesta a preguntas personalizadas de Calendly si las recopilaste

Vincula la actividad tanto al registro de contacto como al negocio asociado.

</RevealSection>

<RevealSection title="Paso 3: Actualizar Etapa del Negocio">

Después de que se realiza una reunión, el negocio debe avanzar de "Comprometido" o "Reunión Programada" a "Reunión Realizada."

En tu CRM, encuentra el negocio asociado con este contacto (por email) y actualiza la etapa. Esto mantiene tu panel de embudo preciso — verás exactamente cuándo los negocios avanzan por tu pipeline.

**Advertencia:** Solo avanza la etapa si la reunión fue una llamada de descubrimiento/ventas, no solo una verificación. Para Calendly, puedes usar el nombre del tipo de evento para filtrar — solo actualiza la etapa para tipos de eventos "Llamada de Descubrimiento" o "Demo", no para tipos "Llamada de Seguimiento".

</RevealSection>

<RevealSection title="Paso 4: Crear Tarea de Seguimiento">

Crea automáticamente una tarea en el CRM:

- **Nombre de la Tarea:** "Hacer seguimiento con [Nombre del Contacto] post-reunión"
- **Fecha Límite:** Fecha de la reunión + 24 horas
- **Prioridad:** Alta
- **Notas:** "Llamada de descubrimiento realizada el [fecha]. Agregar notas de la reunión y enviar materiales de seguimiento."

La ventana de 24 horas es crítica. La investigación muestra que hacer seguimiento dentro de las 24 horas de una reunión aumenta las tasas de cierre en un 25%. La automatización asegura que siempre cumplas con esta ventana.

</RevealSection>

<RevealSection title="Paso 5 (Opcional): Enviar Email de Agradecimiento">

Activa un email simple de agradecimiento 30-60 minutos después de que termine la reunión. Mantenlo breve:

> Hola [Nombre],
>
> Excelente hablar contigo hoy sobre [tema de las preguntas de Calendly]. Voy a [próximo paso específico] para el [fecha].
>
> Con gusto continuamos la conversación.
>
> [Tu nombre]

**Cuándo usarlo:** Siempre, si tienes una integración de email de CRM o conexión Zapier → Gmail/Outlook.

**Cuándo omitirlo:** Si tu seguimiento siempre es muy personalizado y reescribirías la plantilla de todos modos, omite el envío automático y solo usa el recordatorio de tarea para escribir un email personalizado.

</RevealSection>

</ProgressiveReveal>

---

## Constrúyelo: Calendly → HubSpot → Slack

Aquí está la construcción paso a paso para la configuración más común:

<SlideNavigation>
<Slide title="Paso 1: Disparador en Reserva de Calendly">

**En Zapier:**

1. Crea un nuevo Zap
2. Disparador: "Calendly" → "Invitado Creado"
3. Conecta tu cuenta de Calendly
4. Selecciona tu tipo de evento (o "Todos los tipos de eventos")
5. Prueba: Verifica que los datos de muestra incluyan nombre del evento, email del invitado, hora de inicio del evento

**¿Por qué "Invitado Creado" en lugar de "Evento Terminado"?**

Zapier no activa de manera confiable al finalizar una reunión. La solución alternativa: activar en la creación de la reserva, luego agregar un paso de Retraso que espere hasta que la reunión haya terminado.

Ejemplo: Si la reunión es a las 2pm y dura 45 minutos, el retraso se activa aproximadamente a las 2:50pm.

En Make, usa el mismo disparador — "Ver Eventos" → "Invitado Creado."

</Slide>

<Slide title="Paso 2: Agrega un Retraso de Tiempo">

**En Zapier (requiere nivel Starter):**

1. Agrega el paso "Retraso"
2. Tipo: "Retrasar Hasta"
3. Fecha/hora: Hora de inicio del evento de Calendly + duración de la reunión
4. Zona horaria: Usa la zona horaria del invitado de los datos de Calendly

Fórmula de retraso de ejemplo: `Hora de Inicio del Evento + 45 minutos`

**En Make:**

1. Agrega un módulo "Suspender"
2. Duración: Establece en minutos igual a la duración típica de tu reunión (30 o 45 minutos) desde la hora de inicio del evento

**Alternativa (si no puedes usar retrasos):** Activa en "Invitado Creado" sin retraso y acepta que la actividad del CRM se registrará en el momento de la reserva, no al completar la reunión. Menos preciso pero funcional.

</Slide>

<Slide title="Paso 3: Buscar o Crear Contacto en HubSpot">

Después de que se activa el retraso:

1. Agrega acción: "HubSpot — Buscar Contacto por Email"
2. Email: Email del invitado de Calendly
3. Si se encuentra: proceder a registrar la actividad
4. Si no se encuentra: el Capturador de Leads de la Lección 2 ya debería haberlos creado — pero agrega un paso de respaldo "Crear Contacto" por si acaso

**Vincula el contacto a un negocio:**
Después de encontrar el contacto, encuentra su negocio abierto más reciente usando "HubSpot — Buscar Negocios" filtrado por ID de contacto y etapa ≠ "Cerrado Ganado" o "Cerrado Perdido."

</Slide>

<Slide title="Paso 4: Crear Actividad en CRM + Actualizar Etapa">

**Crear actividad:**

1. Acción de HubSpot: "Crear Interacción" (o "Registrar Actividad")
2. Tipo: "REUNIÓN"
3. Asunto: "Llamada de Descubrimiento — `{{Nombre del Invitado}}`"
4. Cuerpo: "Reunión de Calendly realizada. Duración: `{{Duración del Evento}}` minutos."
5. Marca de tiempo: Hora de inicio del evento de Calendly
6. Asociar con: ID del Contacto (del Paso 3) + ID del Negocio (del Paso 3)

**Actualizar etapa del negocio:**

1. Acción de HubSpot: "Actualizar Negocio"
2. ID del Negocio: De la búsqueda en el Paso 3
3. Etapa: "Reunión Realizada" (o el nombre de tu etapa equivalente)

</Slide>

<Slide title="Paso 5: Crear Tarea de Seguimiento + Notificar por Slack">

**Crear tarea de seguimiento:**

1. Acción de HubSpot: "Crear Tarea"
2. Asunto: "Hacer seguimiento con `{{Nombre del Invitado}}` post-reunión"
3. Fecha límite: Hora de inicio del evento + 24 horas
4. Propietario: Tu ID de usuario de HubSpot
5. Asociar con: ID del Contacto + ID del Negocio

**Notificación de Slack (opcional pero recomendada):**

1. Agrega acción de Slack: "Enviar Mensaje"
2. Canal: Tu DM personal o canal #reuniones
3. Mensaje: "✅ Reunión registrada: `{{Nombre del Invitado}}` en `{{Empresa}}` | Etapa actualizada a Reunión Realizada | Tarea de seguimiento para: `{{Fecha de Mañana}}` → `{{Enlace al Negocio en HubSpot}}`"

</Slide>
</SlideNavigation>

---

## Manejo de Variaciones de Reuniones

No todas las reuniones siguen el mismo patrón. Así se manejan las variaciones comunes:

<ClassifyExercise
title="Tipo de Reunión → Acción de Automatización"
persistKey="automation-L3-classify"
categories={[
{ id: "full", label: "Flujo Completo del Registrador de Reuniones", color: "#3b82f6" },
{ id: "partial", label: "Flujo Parcial (Omitir Actualización de Etapa)", color: "#f59e0b" },
{ id: "skip", label: "Omitir Automatización Completamente", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Primera llamada de descubrimiento con un nuevo prospecto", correctCategory: "full" },
{ id: "2", content: "Llamada de verificación de seguimiento con un cliente existente", correctCategory: "skip" },
{ id: "3", content: "Demo del producto después de la llamada de descubrimiento inicial", correctCategory: "full" },
{ id: "4", content: "Reunión interna del equipo (no es una llamada de ventas)", correctCategory: "skip" },
{ id: "5", content: "Segunda llamada de descubrimiento con el mismo prospecto", correctCategory: "partial" },
{ id: "6", content: "Llamada de negociación de contrato", correctCategory: "partial" }
]}
/>

Para implementar estas reglas, usa un filtro en tu automatización:

- El disparador solo se activa para tipos de eventos de Calendly que contengan "Descubrimiento" o "Demo" en el nombre
- Para las llamadas de seguimiento, usa un tipo de evento de Calendly separado que no active el Registrador de Reuniones completo

---

## La Plantilla del Email de Agradecimiento

Cuando habilitas el envío automático del email de agradecimiento, usa esta plantilla como punto de partida:

<RewriteExercise
title="Mejora Esta Plantilla de Email de Agradecimiento"
persistKey="automation-L3-rewrite"
original="Hola [Nombre], Gracias por reunirte conmigo. Te enviaré algo de información pronto. Avísame si tienes preguntas."
hint="Un gran email post-reunión hace referencia a algo específico de la llamada, se compromete a un próximo paso concreto con una fecha límite y facilita que respondan con una palabra."
expertRewrite="Hola [Nombre], Excelente hablar contigo hoy sobre [punto de dolor específico que mencionaron]. Como acordamos, voy a enviar [entregable específico — propuesta, caso de estudio, grabación del demo] para el [fecha específica — p. ej., el jueves al final del día]. Una pregunta para asegurarme de adaptarlo bien: [una pregunta específica sobre su situación]. Con gusto continuamos desde aquí. [Tu nombre]"
criteria={[
"Hace referencia a algo específico de la llamada (no genérico 'excelente reunión')",
"Se compromete a un próximo paso concreto con una fecha límite específica",
"Hace una pregunta enfocada para mantener el impulso",
"Suficientemente corto para leer en 10 segundos"
]}
/>

---

## Probando Tu Registrador de Reuniones

<InteractiveChecklist
title="Protocolo de Prueba del Registrador de Reuniones"
persistKey="automation-L3-test-checklist"
items={[
"Reserva una cita de prueba en Calendly con una dirección de email personal",
"Espera a que se active el retraso (o activa manualmente la automatización en modo de prueba)",
"Verifica que la actividad del CRM se creó con la fecha, tipo y asociación de contacto correctos",
"Verifica que la etapa del negocio se actualizó a 'Reunión Realizada' (o tu equivalente)",
"Verifica que la tarea de seguimiento se creó con la fecha límite correcta (reunión + 24 horas)",
"Verifica que la notificación de Slack se recibió con el enlace correcto al negocio",
"Comprueba que la actividad esté vinculada tanto al contacto COMO al negocio (no solo a uno)",
"Reserva una segunda prueba con el mismo email — verifica que no se crea ningún contacto duplicado"
]}
/>

---

## El Respaldo Manual

Incluso con el Registrador de Reuniones en funcionamiento, algunas reuniones no activarán la automatización:

- Llamadas telefónicas programadas fuera de Calendly
- Reuniones en persona
- Llamadas improvisadas de prospectos que respondieron a tu email

Para estas, crea un hábito simple de registro manual:

<InsightCard icon="📝" title="El Hábito de 2 Minutos Post-Reunión">
Inmediatamente después de cualquier reunión que no sea de Calendly: abre tu CRM en el móvil, registra una actividad de "Reunión" (toma 30 segundos), actualiza la etapa del negocio y agrega una línea de notas. La automatización maneja las reuniones de Calendly. Tú manejas el resto — pero solo los casos que la automatización se pierde.
</InsightCard>

<MiniRoleplay
  scenario="Acabas de terminar una llamada de 30 minutos con una referencia cálida que no fue reservada a través de Calendly — llamaron directo a tu móvil. La llamada fue bien; quieren ver una propuesta. Tu automatización del Registrador de Reuniones no se activó porque no hubo disparador de Calendly."
  role="Tú — necesitando registrar esta reunión sin la automatización"
  persistKey="automation-L3-roleplay"
  modelResponse="Abre HubSpot/Pipedrive en el móvil (toma 10 segundos). Encuentra el contacto — ya debería existir si el Capturador de Leads lo capturó de tu respuesta de contacto inicial. Registra una actividad de reunión: tipo 'Reunión', asunto 'Llamada de Descubrimiento — Referencia Inbound', fecha/hora: ahora, duración: 30 min, notas: 'Referencia cálida de [X]. Se habló de [Y punto de dolor]. Solicitó propuesta para [fecha]. Próximo paso: enviar propuesta el viernes.' Actualiza la etapa del negocio a 'Reunión Realizada'. Crea tarea: 'Enviar propuesta — [Nombre]' fecha límite el viernes. Listo en 3 minutos. La automatización maneja las reservas de Calendly; tú manejas los casos especiales."
/>

---

## Integración con Tu Análisis

El Registrador de Reuniones crea datos que alimentan directamente tu panel de velocidad del Curso 41.

<ExampleCard label="Caso de Estudio: El Insight de Velocidad">
Antes del Registrador de Reuniones, Carlos no tenía idea de cuánto tiempo pasaban los negocios en cada etapa del pipeline. Sabía cuándo cerraban los negocios, pero no cuándo ocurrían las reuniones.

Después de 60 días de datos del Registrador de Reuniones, podía ver su análisis claramente:

- Tiempo promedio desde Capturador de Leads hasta la primera reunión: 8.3 días
- Tiempo promedio desde la reunión hasta la propuesta: 4.1 días (objetivo: 3-7 días — en camino)
- Tiempo promedio desde la propuesta hasta el cierre: 18.7 días (objetivo: 5-14 días — **demasiado lento**)

Ese tiempo de 18.7 días de propuesta a cierre fue el insight que necesitaba. Construyó una automatización del Perseguidor de Contratos (Lección 5) y lo redujo a 11.2 días en 90 días.

**Solo encontró el cuello de botella porque el Registrador de Reuniones estaba creando registros de actividad con marcas de tiempo.**
</ExampleCard>

---

## Tu Esquema del Registrador de Reuniones

<TemplateBuilder
title="Mi Esquema del Registrador de Reuniones"
persistKey="automation-L3-blueprint"
sections={[
{
id: "trigger",
title: "Mi Configuración de Disparador",
fields: [
{
id: "trigger_tool",
label: "Herramienta de disparador",
placeholder: "p. ej., Calendly",
type: "text"
},
{
id: "event_types",
label: "¿Qué tipos de eventos deben activar el Registrador de Reuniones?",
placeholder: "p. ej., 'Llamada de Descubrimiento (30 min)', 'Demo del Producto (45 min)' — NO 'Llamada de Seguimiento' o 'Verificación con Cliente'",
type: "textarea"
},
{
id: "delay",
label: "Duración del retraso (¿cuánto tiempo después de la reserva se ejecuta la automatización?)",
placeholder: "p. ej., El disparador se activa 45 minutos después de la hora de inicio del evento",
type: "text"
}
]
},
{
id: "crm_actions",
title: "Acciones de CRM",
fields: [
{
id: "activity_type",
label: "Nombre del tipo de actividad en tu CRM",
placeholder: "p. ej., 'Reunión' o 'Llamada'",
type: "text"
},
{
id: "stage_after_meeting",
label: "Etapa del negocio a la que avanzar después de la reunión",
placeholder: "p. ej., 'Reunión Realizada' o 'Demo Completa'",
type: "text"
},
{
id: "task_due",
label: "Fecha límite de la tarea de seguimiento (horas después de la reunión)",
placeholder: "p. ej., 24 horas después del fin de la reunión",
type: "text"
}
]
},
{
id: "thank_you",
title: "Email de Agradecimiento (opcional)",
fields: [
{
id: "enabled",
label: "¿Habilitado o deshabilitado?",
placeholder: "p. ej., Habilitado — enviado automáticamente 30 minutos después del fin de la reunión mediante plantilla de HubSpot",
type: "text"
},
{
id: "template",
label: "Línea de asunto de la plantilla de email",
placeholder: "p. ej., 'Seguimiento de nuestra llamada de hoy'",
type: "text"
}
]
}
]}
/>

---

## Tus Elementos de Acción

<InteractiveChecklist
title="Elementos de Acción del Registrador de Reuniones"
persistKey="automation-L3-actions"
items={[
"Construye el flujo de disparador de Calendly → retraso → creación de actividad en CRM",
"Agrega el paso de actualización de etapa del negocio (avanzar a 'Reunión Realizada')",
"Agrega el paso de creación de tarea de seguimiento (con vencimiento 24 horas después de la reunión)",
"Configura la notificación opcional de Slack con un enlace directo al negocio",
"Ejecuta el protocolo de prueba de 8 pasos de arriba — verifica que todas las verificaciones pasen",
"Audita tus últimas 10 reuniones — ¿cuántas tienen registros de actividad en tu CRM? (Esta es tu línea base)",
"Después de 30 días, revisa tu análisis de velocidad — ¿puedes ver ahora los días promedio desde la reunión hasta la propuesta?"
]}
/>

---

## Qué Sigue

En la **Lección 4**, construirás el Recordatorio de Seguimiento: una cadena de Día 3/7/14 que crea tareas cuando los prospectos no han respondido, se detiene automáticamente cuando lo hacen y asegura que nada se pierda en todo tu pipeline activo.

---

## Quiz: El Registrador de Reuniones

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Qué porcentaje de las reuniones de ventas reciben un seguimiento dentro de las 24 horas?",
      "options": ["87%", "44%", "62%", "29%"],
      "correctAnswer": 1,
      "explanation": "Solo el 44% de las reuniones de ventas reciben un seguimiento dentro de las 24 horas. El Registrador de Reuniones asegura que siempre estés en ese grupo al crear automáticamente una tarea de seguimiento."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Por qué deberías activar el Registrador de Reuniones en 'Invitado Creado' en lugar de 'Evento Terminado' en Calendly?",
      "options": [
        "Calendly no tiene un disparador 'Evento Terminado'",
        "Las plataformas de automatización no pueden detectar de manera confiable cuándo terminan las reuniones",
        "Es más rápido y requiere menos configuración",
        "Calendly solo envía datos al reservar, no al completar"
      ],
      "correctAnswer": 1,
      "explanation": "Las plataformas de automatización como Zapier y Make no reciben de manera confiable un webhook cuando termina una reunión de Calendly. La solución alternativa es activar en la creación de la reserva y agregar un paso de retraso igual a la duración de la reunión."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "El Registrador de Reuniones debe activarse para todos los tipos de eventos de Calendly, incluyendo verificaciones con clientes y reuniones internas.",
      "correctAnswer": false,
      "explanation": "Falso. Filtra para que solo se active para tipos de eventos relacionados con ventas (Llamada de Descubrimiento, Demo). Las verificaciones con clientes existentes y las reuniones internas no deben avanzar etapas de negocios ni crear tareas de seguimiento de ventas."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Cuál es el principal beneficio de análisis del Registrador de Reuniones?",
      "options": [
        "Reduce el costo de tu CRM",
        "Crea registros de actividad con marcas de tiempo que habilitan el seguimiento de velocidad",
        "Cierra automáticamente los negocios cuando las reuniones van bien",
        "Reemplaza la toma de notas manual"
      ],
      "correctAnswer": 1,
      "explanation": "El Registrador de Reuniones crea registros de actividad con marcas de tiempo que alimentan tu panel de velocidad del pipeline del Curso 41. Sin él, no puedes medir con precisión cuánto tiempo pasan los negocios en cada etapa."
    }
  ]
}
```
