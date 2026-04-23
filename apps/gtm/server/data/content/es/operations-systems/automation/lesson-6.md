---
title: "Automatización 5: Notificaciones de Deals (Alertas por Slack/Email)"
duration: "45 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 6
---

Estás en una llamada de discovery. El prospecto está interesado. Terminas la llamada, prometes enviar una propuesta antes del cierre del día y vuelves al trabajo.

Tres horas después revisas tu CRM. El deal sigue en la etapa "Discovery". Olvidaste moverlo. Olvidaste crear la tarea de propuesta. Y definitivamente olvidaste enviar ese mensaje de Slack a tu co-fundador sobre la oportunidad de $15K.

**Esta es la brecha de notificaciones.**

La mayoría de los fundadores solistas viven simultáneamente en 3 a 5 herramientas: email, calendario, CRM, Slack y lo que sea que estén construyendo. Los eventos críticos de deals ocurren en el CRM, pero no estás ahí actualizando la página cada 10 minutos.

¿La solución? **Llevar el CRM a ti.** Cuando algo importante ocurra, el sistema debe darte un toque en el hombro — por Slack, email o incluso SMS — con todo el contexto que necesitas para actuar de inmediato.

Esta lección cubre la quinta y última automatización principal: **Notificaciones de Deals**. Aprenderás qué eventos merecen alertas en tiempo real, cómo diseñar notificaciones que no generen fatiga, y cómo conectarlas para que nunca pierdas un momento crítico.

---

## La Paradoja de las Notificaciones

<InsightCard icon="🔔" title="La Paradoja de las Notificaciones">
Cuantas más notificaciones recibes, menos atención le prestas a cada una. El objetivo no es "notificar todo" — es "notificar lo que importa, cuando importa."
</InsightCard>

Aquí está el desafío: tu CRM registra docenas de eventos cada día. Leads creados. Emails abiertos. Etapas cambiadas. Tareas completadas. Notas agregadas. Si recibes un ping de Slack por cada uno de ellos, silenciarás el canal en menos de una semana.

El arte de las notificaciones de deals está en el **enrutamiento por prioridad**:

- **Eventos de alta prioridad** → Slack/email en tiempo real con formato enriquecido
- **Eventos de prioridad media** → Email de resumen diario a las 6pm
- **Eventos de baja prioridad** → Resumen semanal o ninguna notificación

<RangeSlider 
  label="¿Con qué frecuencia revisas actualmente tu CRM?" 
  min={1} 
  max={20} 
  lowLabel="Una vez al día" 
  highLabel="Cada 30 minutos" 
  persistKey="automation-L6-crm-frequency" 
/>

Si respondiste "1 a 3 veces al día", estás perdiendo ventanas críticas. Un lead envía un formulario a las 10am. Revisas el CRM a las 2pm. Eso es una demora de 4 horas — suficiente para que reserven una llamada con un competidor.

Las notificaciones cierran esa brecha. El lead envía el formulario → Slack te avisa en 30 segundos → Respondes en 5 minutos → Eres el primero en responder.

---

## Las 5 Notificaciones Esenciales

No todos los eventos del CRM son iguales. Estas son las cinco que todo fundador solista debe configurar primero:

<SlideNavigation>
<Slide title="1. Nuevo Lead con Puntuación Alta">

**Disparador:** Lead Catcher crea un nuevo contacto con puntuación de fit ICP ≥7

**Por qué importa:** Los leads de alto fit son poco frecuentes. Cuando aparece uno, quieres saberlo de inmediato — no 4 horas después cuando revisas el CRM.

**Formato de notificación:**

```
🎯 Nuevo Lead con Puntuación Alta: Sarah Chen (Puntuación: 8/10)
Empresa: DataPulse (SaaS Serie A, 50 empleados)
Fuente: Formulario web
Dolor: "Dificultades con predicción de churn"
👉 Ver en CRM | Agregar a Secuencia
```

**Canal:** Slack (tiempo real) + SMS opcional para puntuaciones ≥9

</Slide>

<Slide title="2. Deal Ganado">

**Disparador:** La etapa del deal pasa a "Closed Won"

**Por qué importa:** Celebración + inicio inmediato del onboarding. Este es el momento para enviar el email de bienvenida, crear tareas de onboarding y notificar a tu equipo (si tienes uno).

**Formato de notificación:**

```
🎉 Deal Ganado: Contrato Anual de $12,000
Cliente: Acme Corp
Fecha de Cierre: 24 Feb, 2026
Próximo Paso: Enviar email de onboarding en las próximas 24 horas
👉 Ver Deal | Iniciar Onboarding
```

**Canal:** Slack (tiempo real) con emoji de confeti + resumen por email

**Bonus:** Esta notificación es dopamina pura. Refuerza el hábito de ventas y te mantiene motivado durante los períodos difíciles.

</Slide>

<Slide title="3. Deal Perdido">

**Disparador:** La etapa del deal pasa a "Closed Lost"

**Por qué importa:** Cada pérdida es una oportunidad de aprendizaje. La notificación debe invitarte a registrar el motivo de la pérdida y programar una revisión post-mortem.

**Formato de notificación:**

```
❌ Deal Perdido: Acme Corp ($8,000)
Etapa: Propuesta
Motivo de Pérdida: [Click para agregar]
Días en Pipeline: 23
👉 Registrar Motivo | Programar Post-Mortem
```

**Canal:** Slack (tiempo real) + email de resumen semanal de pérdidas

**Acción:** La notificación debe crear una tarea: "Registrar motivo de pérdida e identificar mejoras" con vencimiento en 24 horas.

</Slide>

<Slide title="4. Cambio de Etapa del Deal">

**Disparador:** Cualquier deal se mueve de una etapa a otra (excepto Ganado/Perdido, que tienen notificaciones dedicadas)

**Por qué importa:** Los cambios de etapa indican momentum. "Discovery → Propuesta" significa que necesitas enviar la propuesta. "Propuesta → Negociación" significa que están comprometidos.

**Formato de notificación:**

```
📊 Cambio de Etapa: Acme Corp
Etapa Anterior: Discovery
Nueva Etapa: Propuesta
Valor del Deal: $8,000
Próxima Acción: Enviar propuesta antes del cierre del día
👉 Ver Deal
```

**Canal:** Email de resumen diario (en lote) a menos que el valor del deal sea >$10K (entonces Slack en tiempo real)

</Slide>

<Slide title="5. Deal de Alto Valor Entra al Pipeline">

**Disparador:** Nuevo deal creado con valor ≥$10,000 (o tu umbral)

**Por qué importa:** Los deals grandes merecen atención adicional desde el primer día. Quieres saberlo de inmediato para poder priorizar la investigación y el alcance.

**Formato de notificación:**

```
💰 Deal de Alto Valor Creado: $15,000
Empresa: DataPulse
Contacto: Sarah Chen
Fuente: Referido por Mike
Etapa: Discovery
👉 Ver Deal | Investigar Empresa
```

**Canal:** Slack (tiempo real) + SMS opcional para deals ≥$25K

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="¿Qué notificaciones necesitas?"
persistKey="automation-L6-notification-needs"
items={[
"Nuevo lead con puntuación alta (≥7)",
"Deal ganado",
"Deal perdido",
"Cambio de etapa del deal (solo alto valor)",
"Deal de alto valor entra al pipeline"
]}
/>

---

## Diseño de Notificaciones: Enriquecidas vs. Simples

Una notificación simple luce así:

```
Nuevo lead: Sarah Chen
```

Una **notificación enriquecida** luce así:

```
🎯 Nuevo Lead con Puntuación Alta: Sarah Chen (Puntuación: 8/10)
Empresa: DataPulse (SaaS Serie A, 50 empleados)
Fuente: Formulario web
Dolor: "Dificultades con predicción de churn"
👉 Ver en CRM | Agregar a Secuencia
```

¿La diferencia? **Contexto accionable.** La notificación enriquecida te dice:

- **Quién** (nombre + empresa)
- **Por qué importa** (puntuación, tamaño de empresa, etapa de financiamiento)
- **Qué necesitan** (punto de dolor)
- **Qué hacer a continuación** (ver en CRM, agregar a secuencia)

Todo sin abrir el CRM.

<FlipCard 
  front="¿Por qué usar bloques de Slack en lugar de texto plano?" 
  back="Los bloques de Slack admiten formato (negrita, enlaces, botones), codificación de color (verde para ganado, rojo para perdido) y elementos interactivos (acciones con un clic). Las notificaciones de texto plano se ignoran." 
/>

### Ejemplo de Bloque de Slack (Deal Ganado)

Así se ve una notificación de bloque de Slack en Zapier o Make:

```json
{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🎉 Deal Ganado: Contrato Anual de $12,000"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*Cliente:*\nAcme Corp"
        },
        {
          "type": "mrkdwn",
          "text": "*Fecha de Cierre:*\n24 Feb, 2026"
        }
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Próximo Paso:* Enviar email de onboarding en las próximas 24 horas"
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Ver Deal"
        },
        "url": "https://crm.com/deals/12345"
      }
    }
  ]
}
```

No te preocupes — Zapier y Make tienen constructores visuales de bloques de Slack. No necesitas escribir JSON a mano.

<ExampleCard label="Caso de Estudio: El Deal de $40K Que Casi Se Escapó">

Mark dirige una consultoría de SaaS B2B. Tenía un deal de $40K en la etapa "Propuesta" durante 9 días. Sin notificación. Sin recordatorio. Solo lo notó cuando hizo su revisión semanal de pipeline.

Para entonces, el prospecto ya había firmado con un competidor.

Después de configurar las notificaciones de deals, Mark recibió un ping de Slack el Día 3: "La propuesta para Acme Corp todavía no ha sido firmada. ¿Haces seguimiento hoy?"

Llamó. El prospecto tenía preguntas sobre la implementación. Mark las respondió. El deal se cerró 2 días después.

**La notificación salvó el deal.**

</ExampleCard>

---

## Prevenir la Fatiga de Notificaciones

<InsightCard icon="⚠️" title="El Umbral de las 20 Alertas">
Las investigaciones muestran que la fatiga de notificaciones aparece al superar las 20 alertas por día. A partir de ahí, las personas empiezan a ignorar o silenciar los canales.
</InsightCard>

Cómo mantenerse por debajo del umbral:

### 1. Usa Enrutamiento por Prioridad

No todos los eventos merecen Slack en tiempo real. Usa esta matriz:

<ComparisonBuilder
title="Matriz de Prioridad de Notificaciones"
persistKey="automation-L6-priority-matrix"
prompt="Clasifica estos eventos del CRM por prioridad"
expertExample="Alta: Nuevo lead (puntuación ≥7), Deal ganado, Deal perdido, Deal de alto valor creado. Media: Cambio de etapa (deals >$5K). Baja: Email abierto, tarea completada, nota agregada."
criteria={[
"Eventos de alta prioridad reciben Slack en tiempo real",
"Eventos de prioridad media reciben resumen diario",
"Eventos de baja prioridad reciben resumen semanal o ninguna notificación"
]}
/>

### 2. Agrupa Eventos de Baja Prioridad

En lugar de 15 notificaciones separadas de "Email abierto", envía un resumen diario a las 6pm:

```
📧 Resumen de Actividad de Email (24 Feb)
- 12 emails abiertos
- 3 enlaces con clics
- 2 respuestas recibidas
👉 Ver Informe Completo
```

### 3. Usa Lógica Condicional

Notifica solo si el evento cumple criterios específicos:

- Nuevo lead → Solo si puntuación ≥7
- Cambio de etapa → Solo si valor del deal ≥$5,000
- Email abierto → Solo si fue abierto 3+ veces (señal de alta intención)

<TemplateBuilder
title="Tus Reglas de Notificación"
persistKey="automation-L6-notification-rules"
sections={[
{
id: "high-priority",
title: "Alta Prioridad (Slack en Tiempo Real)",
fields: [
{
id: "lead-threshold",
label: "Umbral de puntuación para nuevos leads",
placeholder: "ej., ≥7",
type: "text"
},
{
id: "deal-threshold",
label: "Umbral para deals de alto valor",
placeholder: "ej., ≥$10,000",
type: "text"
}
]
},
{
id: "medium-priority",
title: "Prioridad Media (Resumen Diario)",
fields: [
{
id: "stage-change",
label: "Regla de notificación para cambio de etapa",
placeholder: "ej., Solo para deals >$5K",
type: "textarea"
}
]
},
{
id: "low-priority",
title: "Baja Prioridad (Resumen Semanal o Ninguna)",
fields: [
{
id: "email-activity",
label: "Regla de notificación para actividad de email",
placeholder: "ej., Solo resumen semanal",
type: "textarea"
}
]
}
]}
/>

---

## Construyendo Tu Primera Notificación (Guía Paso a Paso)

Configuremos la notificación más importante: **Nuevo Lead con Puntuación Alta**.

### Paso 1: Elige Tu Canal de Notificación

<ClassifyExercise
title="¿Qué canal para qué notificación?"
persistKey="automation-L6-channel-classify"
categories={[
{ id: "slack", label: "Slack (Tiempo Real)", color: "#4A154B" },
{ id: "email", label: "Resumen por Email", color: "#EA4335" },
{ id: "sms", label: "SMS (Solo Emergencias)", color: "#34A853" }
]}
items={[
{
id: "1",
content: "Nuevo lead con puntuación ≥9",
correctCategory: "slack"
},
{
id: "2",
content: "Email abierto (sin respuesta)",
correctCategory: "email"
},
{
id: "3",
content: "Deal ganado (>$50K)",
correctCategory: "slack"
},
{
id: "4",
content: "Tarea completada",
correctCategory: "email"
},
{
id: "5",
content: "Deal crítico en riesgo (sin actividad en 14 días, valor >$25K)",
correctCategory: "sms"
}
]}
/>

### Paso 2: Configura el Disparador

En Zapier o Make:

1. **Disparador:** Contacto creado en el CRM (o automatización de Lead Catcher completada)
2. **Filtro:** Continuar solo si `icp_fit_score ≥ 7`
3. **Acción:** Enviar mensaje de Slack al canal #ventas

### Paso 3: Diseña la Notificación

Usa el Block Kit Builder de Slack (https://api.slack.com/block-kit) para diseñar el mensaje visualmente, luego copia el JSON en Zapier/Make.

**Campos requeridos:**

- Nombre del lead
- Nombre de la empresa
- Puntuación de fit ICP
- Fuente del lead
- Punto de dolor principal (del formulario o enriquecimiento)
- Enlace directo al CRM
- Botón de acción con un clic ("Agregar a Secuencia")

<RewriteExercise
title="Reescribe Esta Notificación Genérica"
persistKey="automation-L6-notification-rewrite"
original="Nuevo lead: Sarah Chen de DataPulse"
hint="Agrega puntuación, fuente, punto de dolor y enlace al CRM"
expertRewrite="🎯 Nuevo Lead con Puntuación Alta: Sarah Chen (Puntuación: 8/10)\nEmpresa: DataPulse (SaaS Serie A, 50 empleados)\nFuente: Formulario web\nDolor: 'Dificultades con predicción de churn'\n👉 Ver en CRM | Agregar a Secuencia"
criteria={[
"Incluye la puntuación de fit ICP",
"Muestra la fuente del lead",
"Destaca el punto de dolor",
"Proporciona enlace directo al CRM",
"Sugiere la próxima acción"
]}
/>

### Paso 4: Prueba la Notificación

Crea un lead de prueba en tu CRM con puntuación ≥7. Verifica:

- ✅ La notificación de Slack aparece en menos de 30 segundos
- ✅ Todos los campos se completan correctamente
- ✅ El enlace al CRM funciona
- ✅ El botón de acción funciona (si aplica)

<InteractiveChecklist
title="Lista de Verificación para Probar Notificaciones"
persistKey="automation-L6-testing-checklist"
items={[
"Crear lead de prueba con puntuación ≥7",
"Verificar que la notificación de Slack aparece",
"Comprobar que todos los campos se completan correctamente",
"Probar el enlace al CRM",
"Probar el botón de acción (si aplica)",
"Verificar que la notificación no se dispara para puntuación &lt;7"
]}
/>

---

## Notificaciones Multi-Canal: Cuándo Usar Cada Uno

<StrategyDuel
title="Slack vs. Email vs. SMS"
persistKey="automation-L6-channel-duel"
scenario="Tienes un deal de $20K que acaba de pasar a la etapa 'Propuesta'. ¿Cómo deberías ser notificado?"
strategyA={{
    name: "Slack en Tiempo Real",
    description: "Mensaje instantáneo de Slack con detalles del deal y próxima acción",
    pros: ["Conciencia inmediata", "Formato enriquecido", "Acceso al CRM con un clic"],
    cons: ["Puede ser disruptivo si estás en trabajo profundo", "Requiere tener Slack abierto"]
  }}
strategyB={{
    name: "Resumen Diario por Email",
    description: "Agrupado con otros cambios de etapa en el email de las 6pm",
    pros: ["Menos disruptivo", "Mentalidad de procesamiento en lote", "El email siempre es accesible"],
    cons: ["Conciencia tardía (hasta 24 horas)", "Menos urgencia", "Fácil de ignorar"]
  }}
expertVerdict="Para deals de alto valor (≥$10K), usa Slack en tiempo real. Para deals más pequeños, agrupa en resumen diario. El deal de $20K merece atención inmediata."
/>

### Matriz de Decisión de Canal

| Tipo de Evento                 | Valor del Deal | Canal         | Momento          |
| ------------------------------ | -------------- | ------------- | ---------------- |
| Nuevo lead con puntuación alta | Cualquiera     | Slack         | Tiempo real      |
| Deal ganado                    | Cualquiera     | Slack + Email | Tiempo real      |
| Deal perdido                   | Cualquiera     | Slack         | Tiempo real      |
| Cambio de etapa                | &lt;$5K        | Email         | Resumen diario   |
| Cambio de etapa                | $5K-$10K       | Slack         | Tiempo real      |
| Cambio de etapa                | >$10K          | Slack + SMS   | Tiempo real      |
| Email abierto                  | Cualquiera     | Email         | Resumen semanal  |
| Tarea completada               | Cualquiera     | Ninguno       | Sin notificación |

<RangeSlider 
  label="¿Cuál es tu umbral para deals de alto valor?" 
  min={1000} 
  max={50000} 
  step={1000}
  lowLabel="$1K" 
  highLabel="$50K" 
  persistKey="automation-L6-deal-threshold" 
/>

---

## Avanzado: Notificaciones Interactivas (Botones de Slack)

Slack admite **botones interactivos** que disparan acciones sin abrir el CRM.

Ejemplo: botón "Agregar a Secuencia" en una notificación de nuevo lead.

Al hacer clic, el botón:

1. Dispara un webhook de Zapier
2. Agrega el contacto a tu secuencia de alcance (Instantly, Smartlead, etc.)
3. Actualiza el mensaje de Slack: "✅ Agregado a Secuencia: Alcance Frío v3"

Esto requiere:

- Disparador webhook de Zapier
- Configuración de mensaje interactivo de Slack
- Integración con la API del CRM/herramienta de alcance

**¿Vale la pena?** Para flujo de leads de alto volumen (10+ leads/día), sí. Para volumen bajo (1-2 leads/día), el clic manual para abrir el CRM es suficiente.

<PredictionGate
question="¿Qué pasa si agregas botones interactivos a todas las notificaciones?"
persistKey="automation-L6-button-predict"
type="choice"
choices={[
{ id: "a", text: "Ahorra mucho tiempo" },
{ id: "b", text: "Crea clics accidentales y errores" },
{ id: "c", text: "Requiere configuración compleja de webhooks que se rompe seguido" }
]}
correctId="b"

>

**Respuesta: B (y un poco de C).**

Los botones interactivos son poderosos pero riesgosos. Los clics accidentales pueden agregar al lead equivocado a una secuencia o marcar un deal como ganado prematuramente.

**Buena práctica:** Usa botones solo para acciones de bajo riesgo ("Ver en CRM", "Posponer 1 hora"). Para acciones de alto riesgo ("Agregar a secuencia", "Marcar como ganado"), requiere una visita manual al CRM.

</PredictionGate>

---

## Monitoreo de Notificaciones: ¿Están Funcionando?

Una vez que tus notificaciones estén activas, monitorea:

1. **Volumen de notificaciones:** ¿Cuántas por día? (Debería ser &lt;20 para fundadores solistas)
2. **Tiempo de respuesta:** ¿Cuánto tiempo desde la notificación hasta la acción? (Meta: &lt;1 hora para alta prioridad)
3. **Falsos positivos:** Notificaciones que no requirieron acción (ajusta tus filtros)
4. **Eventos perdidos:** Eventos críticos que no dispararon una notificación (agrega nuevas reglas)

<ScenarioSimulator
title="Calculadora de Volumen de Notificaciones"
persistKey="automation-L6-volume-simulator"
levers={[
{
id: "leads",
label: "Nuevos leads por semana",
min: 0,
max: 50,
step: 5,
defaultValue: 10
},
{
id: "scoreThreshold",
label: "Umbral de puntuación para notificación",
min: 5,
max: 10,
step: 1,
defaultValue: 7
},
{
id: "deals",
label: "Deals activos",
min: 0,
max: 50,
step: 5,
defaultValue: 15
},
{
id: "stageChanges",
label: "Cambios de etapa por semana",
min: 0,
max: 20,
step: 2,
defaultValue: 8
}
]}
outputs={[
{
id: "weeklyNotifications",
label: "Notificaciones por semana",
formula: "(leads * (11 - scoreThreshold) / 10) + stageChanges + (deals * 0.1)",
unit: "",
precision: 0
},
{
id: "dailyNotifications",
label: "Notificaciones por día",
formula: "weeklyNotifications / 7",
unit: "",
precision: 1
}
]}
insight="Con {dailyNotifications} notificaciones/día, estás {dailyNotifications > 20 ? 'por encima' : 'por debajo'} del umbral de fatiga. {dailyNotifications > 20 ? 'Aumenta tu umbral de puntuación o agrupa más eventos en resúmenes.' : 'Tienes margen para agregar más notificaciones en tiempo real si lo necesitas.'}"
/>

---

## Notificaciones de Equipo (Para el Futuro)

Ahora mismo eres un fundador solista. Todas las notificaciones van para ti.

Pero cuando contrates (Curso 45: Construyendo Tu Primer Equipo de Ventas), estas mismas automatizaciones escalan a canales de equipo:

- **#ventas-leads** → Nuevos leads con puntuación alta
- **#ventas-ganancias** → Celebraciones de deals ganados
- **#ventas-perdidas** → Post-mortems de deals perdidos
- **#ventas-pipeline** → Cambios de etapa y deals de alto valor

La automatización no cambia. Solo cambia el destinatario.

<ContextualNote
showWhen={{ founderType: "technical" }}
variant="personalized"
title="Para Fundadores Técnicos"

>

Si te manejas bien con webhooks y APIs, considera construir un enrutador de notificaciones personalizado:

1. Evento del CRM → Webhook a tu servidor
2. Lógica del servidor: enrutar según tipo de evento, valor del deal y asignación de miembro del equipo
3. Enviar al canal de Slack apropiado o DM individual

Esto te da control total sobre la lógica de enrutamiento y evita el consumo de tareas de Zapier para eventos de alto volumen.

Herramientas: n8n (auto-hospedado), Trigger.dev (code-first), o un servidor Express.js simple en Railway/Render.

</ContextualNote>

---

## Tu Plan de Notificaciones

<InteractiveChecklist
title="Construye Tu Sistema de Notificaciones"
persistKey="automation-L6-build-checklist"
items={[
"Elige el canal de notificaciones (Slack, email o ambos)",
"Configura la notificación 'Nuevo Lead con Puntuación Alta' (puntuación ≥7)",
"Configura la notificación 'Deal Ganado' con formato de celebración",
"Configura la notificación 'Deal Perdido' con solicitud de motivo de pérdida",
"Configura la notificación 'Deal de Alto Valor' (≥$10K)",
"Configura el resumen diario para eventos de prioridad media",
"Prueba todas las notificaciones con datos de CRM de muestra",
"Monitorea el volumen de notificaciones durante 1 semana y ajusta los umbrales"
]}
/>

---

## Resumen: La Mentalidad de las Notificaciones

Las notificaciones no se tratan de **ver todo**. Se tratan de **ver lo que importa, cuando importa**.

El objetivo es:

- ✅ Responder a leads de alta intención en menos de 5 minutos
- ✅ Celebrar las ganancias de inmediato (refuerzo de dopamina)
- ✅ Aprender de las pérdidas en menos de 24 horas
- ✅ Nunca dejar que un deal de alto valor se escape
- ✅ Mantener menos de 20 notificaciones/día para evitar la fatiga

Cuando se hace correctamente, las notificaciones convierten tu CRM de un **lugar que visitas** en un **sistema que te da un toque en el hombro** en exactamente el momento correcto.

Próxima lección: **Conectando Detección de Respuestas → CRM → Tareas** — la automatización que garantiza que ninguna respuesta de prospecto quede sin atender.

---

## Quiz: Diseño de Notificaciones

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuál es el principal riesgo de notificar cada evento del CRM en tiempo real?",
      "options": [
        "Cuesta demasiado en tareas de Zapier",
        "Genera fatiga de notificaciones y empiezas a ignorar todas las alertas",
        "Ralentiza tu CRM",
        "Viola el RGPD"
      ],
      "correctAnswer": 1,
      "explanation": "La fatiga de notificaciones aparece por encima de las 20 alertas/día. Cuando todo es urgente, nada es urgente."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Qué evento debe disparar una notificación en tiempo real de Slack?",
      "options": [
        "Email abierto (sin respuesta)",
        "Tarea completada",
        "Nuevo lead con puntuación de fit ICP = 9",
        "Nota agregada al contacto del CRM"
      ],
      "correctAnswer": 2,
      "explanation": "Los leads con puntuación alta (≥7) merecen atención inmediata. Las aperturas de email y las tareas completadas pueden agruparse en resúmenes diarios."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "¿Cuál es el beneficio de usar bloques de Slack en lugar de notificaciones de texto plano?",
      "options": [
        "Son más fáciles de configurar",
        "Admiten formato enriquecido, codificación de color y botones interactivos",
        "Consumen menos tareas de Zapier",
        "Funcionan sin conexión a internet"
      ],
      "correctAnswer": 1,
      "explanation": "Los bloques de Slack admiten formato, colores y botones — haciendo las notificaciones accionables sin abrir el CRM."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Cuándo deberías usar notificaciones por SMS?",
      "options": [
        "Para cada nuevo lead",
        "Para todos los cambios de etapa de deals",
        "Solo para eventos críticos de alto valor (ej., deal de $25K+ en riesgo)",
        "Nunca — email y Slack son suficientes"
      ],
      "correctAnswer": 2,
      "explanation": "El SMS es solo para emergencias. El uso excesivo genera fatiga y cuesta dinero. Resérvalo para eventos críticos de alto valor."
    },
    {
      "id": "q5",
      "type": "true-false",
      "question": "Verdadero o Falso: Deberías agregar botones interactivos 'Marcar como Ganado' a todas las notificaciones de deals para ahorrar tiempo.",
      "correctAnswer": false,
      "explanation": "Falso. Los botones interactivos para acciones de alto riesgo (como marcar deals como ganados) pueden generar clics accidentales. Usa botones solo para acciones de bajo riesgo como 'Ver en CRM.'"
    }
  ]
}
```
