---
title: "Automatización 1: Capturador de Leads (Formulario → CRM → Notificar)"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 2
---

Un prospecto acaba de enviar tu formulario de contacto. Está interesado, tomó acción y quiere saber de ti.

¿Qué pasa ahora mismo?

Si la respuesta es "lo veré cuando revise mi email después" — estás dejando negocios sobre la mesa. El 78% de los negocios van al primero que responde. Responder dentro de 5 minutos te hace 100 veces más probable de conectar que responder después de una hora.

Pero no puedes responder en 5 minutos si no sabes que el lead existe.

El Capturador de Leads es tu solución. Captura cada nuevo lead de cada fuente — formularios, Calendly, respuestas de email — crea un contacto en el CRM, etiqueta la fuente del lead, asigna una puntuación y te avisa por Slack en 30 segundos. Para cuando termines esta lección, ningún lead volverá a perderse.

---

## El Patrón del Capturador de Leads

Antes de construir cualquier cosa, entiende el patrón que estás implementando. Cada automatización del Capturador de Leads sigue la misma estructura de seis pasos independientemente de qué plataforma uses.

<ProgressiveReveal title="El Flujo del Capturador de Leads" persistKey="automation-L2-flow">

<RevealSection title="Paso 1: Disparador — Evento de Nueva Fuente de Lead">

La automatización se activa cuando ocurre algo específico. Los tres disparadores más comunes para fundadores en solitario:

1. **Envío de formulario** — Typeform, Tally, Jotform, Google Forms, o el formulario nativo de tu CRM envía una nueva entrada
2. **Reserva en Calendly** — Un prospecto reserva una llamada de descubrimiento o demo
3. **Respuesta de email** — Un prospecto responde a tu campaña de contacto (requiere webhook de herramienta de email, p. ej., Instantly o Smartlead)

Necesitas al menos un disparador activo. La mayoría de los fundadores comienzan con su formulario de contacto y Calendly.

</RevealSection>

<RevealSection title="Paso 2: Crear o Actualizar Contacto en CRM">

El disparador envía datos (nombre, email, empresa, rol) a tu plataforma de automatización. Tu automatización mapea esos campos a tu CRM y crea un nuevo contacto — o actualiza uno existente si el email ya existe.

Lista de verificación de mapeo de campos:

- Nombre → Nombre en CRM
- Apellido → Apellido en CRM
- Email → Email en CRM (primario)
- Empresa → Empresa en CRM
- Mensaje/notas → Notas en CRM (primera actividad)

</RevealSection>

<RevealSection title="Paso 3: Establecer Metadatos en el Contacto">

Tres campos que deben establecerse automáticamente (nunca manualmente):

1. **Fuente del Lead** — ¿Qué disparador se activó? "Typeform — Sitio Web" o "Calendly — Llamada de Descubrimiento" o "Respuesta de Contacto — Instantly"
2. **Etapa del Pipeline** — Establecer en "Lead" (tu primera etapa del pipeline)
3. **Fecha de Entrada** — Marca de tiempo de cuándo se capturó el lead

Estos tres campos alimentan tu análisis del embudo del Curso 41. Si los omites, tus datos de atribución estarán rotos.

</RevealSection>

<RevealSection title="Paso 4: Enriquecimiento Opcional">

Después de crear el contacto en el CRM, puedes activar una búsqueda en Apollo o Hunter para completar datos faltantes — tamaño de empresa, URL de LinkedIn, cargo, industria, número de teléfono.

El tradeoff: el enriquecimiento agrega 15-30 segundos de demora antes de que se active tu notificación. Para la mayoría de los fundadores, vale la pena. Obtienes una notificación más rica con contexto en lugar de solo una dirección de email.

Si usas Apollo, el paso de enriquecimiento cuesta créditos de Apollo. Presupuesto: 1 crédito por enriquecimiento de lead.

</RevealSection>

<RevealSection title="Paso 5: Puntuar el Lead">

Basado en las respuestas del formulario o datos enriquecidos, calcula una puntuación aproximada de ajuste con el ICP. Un sistema de puntuación simple:

- El tamaño de la empresa coincide con tu ICP: +3 puntos
- El rol coincide con tu ICP (tomador de decisiones): +3 puntos
- Describió un problema específico que resuelves: +2 puntos
- Cronograma menor a 30 días: +2 puntos

Total: escala del 1-10. Puntuación ≥7 = alta prioridad (alerta inmediata de Slack). Puntuación &lt;7 = lote de resumen diario.

No necesitas IA para esto. Un filtro simple o cálculo numérico en Zapier/Make lo maneja.

</RevealSection>

<RevealSection title="Paso 6: Notificar al Fundador">

El paso final te envía una notificación con todo lo que necesitas para actuar. El formato ideal de notificación:

**Mensaje de Slack:**

> 🟢 Nuevo Lead: [Nombre] en [Empresa]
> Rol: [Cargo] | Puntuación: [X/10]
> Fuente: [Nombre del formulario / Calendly / Contacto]
> Mensaje: "[Primeros 100 caracteres de su mensaje]"
> → [Enlace directo al CRM]

**¿Por qué Slack?** Porque es más probable que lo veas de inmediato que una notificación de email enterrada en tu bandeja de entrada. Si no usas Slack, una notificación push por email o SMS funciona.

</RevealSection>

</ProgressiveReveal>

<InsightCard icon="⚡" title="La Velocidad Es la Palanca">
Las empresas que responden dentro de 5 minutos son 100 veces más propensas a conectar con leads versus responder después de 60 minutos. El Capturador de Leads no responde automáticamente — te hace consciente lo suficientemente rápido para responder mientras el lead todavía está activo.
</InsightCard>

---

## Constrúyelo: Typeform → HubSpot → Slack

Aquí está la construcción paso a paso para el stack más común de fundadores en solitario. Adapta los pasos a tus herramientas específicas.

<SlideNavigation>
<Slide title="Paso 1: Conecta Tu Formulario">

**En Zapier:**

1. Haz clic en "Crear Zap"
2. Disparador: Selecciona "Typeform" (o tu herramienta de formularios)
3. Evento: "Nueva Entrada"
4. Conecta tu cuenta de Typeform (inicio de sesión OAuth)
5. Selecciona tu formulario (p. ej., "Contáctanos" o "Reservar una Demo")
6. Haz clic en "Probar disparador" — Zapier extraerá tu envío más reciente como muestra

**En Make:**

1. Crea un nuevo escenario
2. Agrega un módulo de Typeform "Ver Respuestas"
3. Conecta tu cuenta, selecciona tu formulario
4. Establece el intervalo de sondeo: cada 15 minutos (nivel gratuito) o 5 minutos (nivel Core)
5. Ejecuta una vez para capturar una respuesta de muestra

</Slide>

<Slide title="Paso 2: Crea el Contacto en HubSpot">

**En Zapier:**

1. Agrega acción: Selecciona "HubSpot"
2. Evento: "Crear o Actualizar Contacto"
3. Mapea los campos:
   - Email → Campo de Typeform: "Email"
   - Nombre → Campo de Typeform: "Nombre" (o extrae del "Nombre Completo")
   - Apellido → Campo de Typeform: "Apellido"
   - Empresa → Campo de Typeform: "Empresa"
   - Fuente del Lead → Valor estático: "Typeform — [Nombre del Formulario]"
   - Etapa del Ciclo de Vida → Valor estático: "Lead"
   - Notas → Campo de Typeform: "Mensaje"

**Prueba:** Haz clic en "Probar paso" — verifica que el contacto aparezca en HubSpot.

</Slide>

<Slide title="Paso 3: Establecer Etapa del Pipeline">

**En Zapier:**

1. Agrega acción: "HubSpot — Crear Negocio"
2. Nombre del negocio: "[Nombre del Contacto] — [Empresa]"
3. Pipeline: Tu pipeline activo
4. Etapa: "Lead" (primera etapa)
5. Asociar con: ID de Contacto del Paso 2
6. Monto: Dejar en blanco (o $0)
7. Fecha de cierre: 60 días desde ahora (marcador de posición)

Esto crea un negocio en tu pipeline automáticamente. Si prefieres agregar negocios manualmente, omite este paso y solo crea el contacto.

</Slide>

<Slide title="Paso 4: Enviar Notificación de Slack">

**En Zapier:**

1. Agrega acción: "Slack — Enviar Mensaje al Canal"
2. Canal: #leads (o envíate un DM)
3. Texto del mensaje (personaliza esto):

```
🟢 Nuevo Lead: {{Nombre}} {{Apellido}} en {{Empresa}}
Rol: {{Cargo}} | Fuente: Typeform — Formulario de Contacto
Mensaje: {{Mensaje (primeros 150 caracteres)}}
→ HubSpot: {{URL del Contacto}}
```

4. Prueba: Verifica que el mensaje de Slack aparezca con datos reales

**Consejo profesional:** Agrega un paso de filtro antes de la notificación de Slack. Si el dominio del email es gmail.com, yahoo.com o hotmail.com (email personal), enruta a una notificación de menor prioridad. Los leads B2B deben tener direcciones de email corporativas.

</Slide>
</SlideNavigation>

---

## La Variante de Calendly

Las reservas de Calendly son un disparador diferente pero siguen el mismo patrón. Aquí está la adaptación:

<FlipCard
  front="Disparador de Calendly: ¿Qué datos obtienes?"
  back="Calendly envía: nombre del invitado, email, nombre del evento, hora programada, URL de cancelación y cualquier pregunta que hayas hecho en el formulario de reserva. NO obtienes su empresa o cargo a menos que hayas agregado esas preguntas personalizadas en tu evento de Calendly."
/>

<FlipCard
  front="Mejor práctica: Agrega preguntas personalizadas a Calendly"
  back="Agrega 2-3 preguntas a cada tipo de evento de Calendly: '¿Cuál es el nombre de tu empresa?', '¿Cuál es tu rol?', '¿Qué esperas obtener de esta llamada?' Estas respuestas se agregan a tu CRM y hacen que tu investigación previa a la llamada sea instantánea."
/>

Para la versión de Calendly, el flujo es idéntico con dos cambios:

1. **Disparador:** Zapier "Calendly — Invitado Creado" (no "Evento Terminado" — quieres saber en cuanto reserven)
2. **Fuente del Lead:** Establecer en "Calendly — [Nombre del Tipo de Evento]" (p. ej., "Calendly — Llamada de Descubrimiento de 30 Min")

La notificación de Slack también debe incluir la hora de la reunión programada para que puedas prepararte:

> 📅 Nueva Llamada de Descubrimiento Reservada: [Nombre] en [Empresa]
> Hora: [Fecha] a las [Hora] ([Zona Horaria])
> Respuestas a preguntas: [Respuestas personalizadas]
> → HubSpot: [Enlace] | Calendly: [Enlace]

---

## Probando Tu Capturador de Leads

No implementes sin probar. Aquí está el protocolo:

<InteractiveChecklist
title="Protocolo de Prueba del Capturador de Leads"
persistKey="automation-L2-test-checklist"
items={[
"Envía una entrada de prueba a tu formulario usando una dirección de email de prueba",
"Verifica que el contacto se creó en el CRM con nombre, email y empresa correctos",
"Verifica que la Fuente del Lead está establecida correctamente (p. ej., 'Typeform — Formulario de Contacto')",
"Verifica que la Etapa del Pipeline está establecida en 'Lead'",
"Verifica que la notificación de Slack se recibió dentro de 60 segundos",
"Verifica que el mensaje de Slack contiene el enlace directo al contacto en el CRM",
"Reserva una cita de prueba en Calendly y verifica que el mismo flujo funciona",
"Envía una entrada de prueba duplicada — verifica que el CRM actualiza el contacto existente en lugar de crear un duplicado"
]}
/>

El último elemento importa. Si tu automatización crea contactos duplicados en lugar de actualizar los existentes, tendrás problemas de calidad de datos que corrompen tu análisis del Curso 41. Usa "Crear o Actualizar" (no solo "Crear") en tu acción de CRM.

---

## Agregar Puntuación de Leads (Opcional pero Poderoso)

Una vez que tu Capturador de Leads básico esté funcionando, agrega una puntuación para priorizar tu respuesta.

<ExampleCard label="Caso de Estudio: La Ventaja de la Puntuación">
Antes de la puntuación de leads, Nadia respondía a los leads en el orden en que llegaban. Un freelancer buscando un contrato de un mes recibía la misma prioridad que una empresa de 50 personas con un presupuesto de $50K.

Después de agregar puntuación a su Capturador de Leads:

- Leads con puntuación 7-10: DM de Slack para sí misma (acción inmediata)
- Leads con puntuación 4-6: Notificación de canal (responder en 4 horas)
- Leads con puntuación 1-3: Email de resumen diario (responder en 24 horas)

Su tasa de conversión en leads de alta puntuación se duplicó porque respondía en minutos, no en horas.
</ExampleCard>

Para implementar puntuación en Zapier:

1. Agrega un paso "Formateador" después de la creación del contacto
2. Usa "Números — Realizar Matemáticas" para calcular la puntuación basada en los valores de los campos del formulario
3. Agrega un paso "Rutas" (requiere Zapier Professional) o "Filtro" para enrutar de manera diferente según la puntuación

En Make, usa un módulo Enrutador con condiciones de filtro en el valor de la puntuación. Esto es más fácil en Make que en Zapier y no requiere el nivel Professional.

---

## El Capturador de Leads Multi-Fuente

Versión avanzada: un centro de notificaciones que captura leads de todas las fuentes.

<MiniRoleplay
  scenario="Tienes tres fuentes de leads activas simultáneamente: formulario del sitio web (Typeform), reserva de demo (Calendly) y respuestas de contacto (Instantly). Un prospecto al que le enviaste email la semana pasada acaba de responder positivamente. También tienes un nuevo envío de formulario de alguien más. Ambos llegan dentro de 10 minutos."
  role="Tú — el fundador en solitario gestionando tu automatización"
  persistKey="automation-L2-roleplay"
  modelResponse="El Capturador de Leads multi-fuente lo maneja automáticamente. La respuesta de contacto activa el Capturador de Leads vía webhook de Instantly → Zapier/Make, creando o actualizando un contacto en el CRM con Fuente de Lead = 'Respuesta de Contacto — Instantly' y enviando un DM de Slack de alta prioridad (respuesta positiva = puntuación alta). El envío de Typeform se activa simultáneamente, creando un contacto separado con Fuente de Lead = 'Typeform — Formulario del Sitio Web'. Recibes dos notificaciones distintas de Slack en segundos, cada una con un enlace directo al CRM. Respondes primero a la respuesta de contacto (lead activo, mayor prioridad), luego manejas el nuevo envío de formulario. Sin verificación manual, sin leads perdidos, sin confusión sobre la fuente."
/>

---

## Solución de Problemas del Capturador de Leads

<ProgressiveReveal title="Problemas Comunes del Capturador de Leads y Soluciones" persistKey="automation-L2-debug">

<RevealSection title="Problema: Se están creando contactos duplicados">

**Causa raíz:** Tu acción de CRM está configurada en "Crear Contacto" en lugar de "Crear o Actualizar Contacto."

**Solución:** Cambia la acción a "Crear o Actualizar Contacto" en Zapier, o usa la acción "Upsert Contact" de HubSpot. En Make, usa el módulo "Crear o Actualizar Contacto" de HubSpot. La dirección de email es la clave de deduplicación.

</RevealSection>

<RevealSection title="Problema: La notificación de Slack no se activa">

**Causa raíz:** Generalmente un error de autenticación (la aplicación de Slack necesita reinstalarse o reautorizarse) o la conexión Zapier/Make → Slack expiró.

**Solución:** En Zapier, ve a Cuentas Conectadas y vuelve a conectar Slack. Prueba el paso de Slack de forma aislada. Si funciona en modo de prueba pero no en modo en vivo, verifica tus condiciones de filtro — pueden ser demasiado restrictivas.

</RevealSection>

<RevealSection title="Problema: Los datos de Typeform no se mapean correctamente">

**Causa raíz:** Los IDs de campo de Typeform cambian cuando editas tu formulario. Después de cualquier edición del formulario, vuelve a probar el disparador en Zapier/Make para obtener mapeos de campos nuevos.

**Solución:** Abre tu Zap/escenario, vuelve a ejecutar la prueba del disparador y vuelve a mapear todos los campos a los nuevos IDs de campo. Dedica 5 minutos a verificar que todos los mapeos sean correctos después de cualquier cambio en el formulario.

</RevealSection>

<RevealSection title="Problema: La Fuente del Lead no se está estableciendo">

**Causa raíz:** El campo de Fuente del Lead no se está enviando a tu CRM. Verifica que tengas un paso que establezca explícitamente este campo con un valor estático que coincida con tu fuente.

**Solución:** Agrega un paso de acción de CRM que establezca específicamente la Fuente del Lead a un valor estático (p. ej., "Typeform — Formulario de Contacto"). No lo dejes vacío ni dependas de los valores predeterminados del CRM.

</RevealSection>

</ProgressiveReveal>

---

## Tu Esquema del Capturador de Leads

Documenta tu automatización completada para referencia futura y solución de problemas:

<TemplateBuilder
title="Mi Esquema del Capturador de Leads"
persistKey="automation-L2-blueprint"
sections={[
{
id: "triggers",
title: "Mis Fuentes de Disparador",
fields: [
{
id: "source1",
label: "Disparador 1 (herramienta de formulario y nombre del formulario)",
placeholder: "p. ej., Typeform — formulario 'Contáctanos' en la página de inicio",
type: "text"
},
{
id: "source2",
label: "Disparador 2 (herramienta de calendario/reserva)",
placeholder: "p. ej., Calendly — tipo de evento 'Llamada de Descubrimiento de 30 Min'",
type: "text"
},
{
id: "source3",
label: "Disparador 3 (si aplica)",
placeholder: "p. ej., Instantly — webhook de respuesta de contacto",
type: "text"
}
]
},
{
id: "crm",
title: "Configuración del CRM",
fields: [
{
id: "crm_tool",
label: "Herramienta de CRM",
placeholder: "p. ej., HubSpot Free",
type: "text"
},
{
id: "lead_source_values",
label: "Valores de Fuente del Lead que estoy usando (lista todos)",
placeholder: "p. ej., 'Typeform — Formulario de Contacto', 'Calendly — Llamada de Descubrimiento', 'Respuesta de Contacto — Instantly'",
type: "textarea"
},
{
id: "first_stage",
label: "Nombre de la primera etapa del pipeline",
placeholder: "p. ej., Lead",
type: "text"
}
]
},
{
id: "notification",
title: "Configuración de Notificación",
fields: [
{
id: "channel",
label: "Canal de notificación (canal de Slack o email)",
placeholder: "p. ej., canal #leads en Slack",
type: "text"
},
{
id: "format",
label: "Formato de notificación (pega tu plantilla de mensaje)",
placeholder: "p. ej., 🟢 Nuevo Lead: {{Nombre}} en {{Empresa}} | Puntuación: {{Puntuación}} | → {{Enlace CRM}}",
type: "textarea"
}
]
}
]}
/>

---

## Tus Elementos de Acción

<InteractiveChecklist
title="Elementos de Acción del Capturador de Leads"
persistKey="automation-L2-actions"
items={[
"Construye el Capturador de Leads básico (disparador de formulario → contacto en CRM → notificación de Slack)",
"Agrega la variante de Calendly (disparador de reserva → mismo flujo de CRM → notificación con hora de reunión)",
"Ejecuta el protocolo de prueba de 8 pasos de arriba — verifica que todas las verificaciones pasen",
"Agrega el campo de Fuente del Lead al CRM y verifica que se establezca en cada lead",
"Establece un filtro para enrutar leads de alta prioridad (email corporativo + rol específico) a DM inmediato de Slack",
"Documenta tu esquema en la plantilla de arriba",
"Envía un lead de prueba real y cronometra la respuesta: ¿cuánto tiempo desde el envío hasta la notificación de Slack?"
]}
/>

---

## Qué Sigue

En la **Lección 3**, construirás el Registrador de Reuniones: la automatización que captura cada reunión de Calendly o Google Calendar en tu CRM como una actividad, actualiza la etapa del negocio, crea una tarea de seguimiento y opcionalmente envía un email de agradecimiento — todo dentro de minutos de que termine la reunión.

---

## Quiz: El Capturador de Leads

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuál es la razón más importante para responder a los leads dentro de 5 minutos?",
      "options": [
        "Se ve profesional",
        "La investigación muestra que eres 100 veces más propenso a conectar que si esperas una hora",
        "Los leads se eliminan después de 10 minutos",
        "Tu CRM lo requiere"
      ],
      "correctAnswer": 1,
      "explanation": "La investigación de InsideSales.com muestra que responder dentro de 5 minutos te hace 100 veces más probable de conectar versus esperar una hora. La velocidad es la palanca de conversión #1 que habilita el Capturador de Leads."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Qué acción de CRM deberías usar para evitar contactos duplicados?",
      "options": [
        "Crear Contacto",
        "Crear o Actualizar Contacto",
        "Buscar Contacto",
        "Eliminar y Recrear Contacto"
      ],
      "correctAnswer": 1,
      "explanation": "Siempre usa 'Crear o Actualizar Contacto' (o 'Upsert'). Verifica si ya existe un contacto con ese email y lo actualiza en lugar de crear un duplicado. Esto es esencial para la calidad de los datos."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "El Capturador de Leads debe enviar automáticamente un email de respuesta al prospecto de inmediato.",
      "correctAnswer": false,
      "explanation": "Falso. El Capturador de Leads te notifica A TI para que puedas responder personalmente. Las respuestas automáticas a menudo se sienten robóticas y reducen la conversión. La respuesta humana debe ser personalizada — la automatización solo se asegura de que respondas en minutos."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Cuáles son los tres campos de metadatos que deben establecerse automáticamente en cada nuevo lead?",
      "options": [
        "Nombre, Email, Teléfono",
        "Fuente del Lead, Etapa del Pipeline, Fecha de Entrada",
        "Fuente del Lead, Tamaño del Negocio, Fecha de Cierre",
        "Empresa, Rol, URL de LinkedIn"
      ],
      "correctAnswer": 1,
      "explanation": "Fuente del Lead (para atribución), Etapa del Pipeline (para seguimiento del embudo) y Fecha de Entrada (para seguimiento de velocidad) deben establecerse automáticamente. Estos alimentan los paneles de análisis del Curso 41."
    }
  ]
}
```
