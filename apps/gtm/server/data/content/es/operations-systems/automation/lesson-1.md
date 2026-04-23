---
title: "Herramientas de Automatización: Zapier vs Make vs n8n vs Trigger.dev"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 1
---

Estás gastando 5-7 horas por semana en actividades de ventas. Al menos 2 de esas horas son en tareas que una máquina podría hacer en segundos.

Registrar un nuevo lead de un formulario en tu CRM. Crear una tarea de seguimiento después de una reunión. Enviarte un mensaje de Slack cuando un negocio cambia de etapa. Recordarte que hagas seguimiento cuando un prospecto no ha respondido en 3 días.

**Ese es el trabajo de la automatización. No el tuyo.**

Pero antes de poder construir automatizaciones, necesitas elegir la plataforma correcta. Y ahora mismo, hay cuatro opciones serias para fundadores en solitario — cada una con diferentes compensaciones en costo, poder y curva de aprendizaje.

Al final de esta lección, sabrás exactamente qué herramienta se adapta a tu situación y por qué.

---

## Por Qué la Automatización Importa para los Fundadores en Solitario

Antes de la comparación, seamos claros sobre lo que estás comprando.

<InsightCard icon="⏰" title="La Matemática del Tiempo">
Las 5 automatizaciones principales que construirás en este curso (Capturador de Leads, Registrador de Reuniones, Recordatorio de Seguimiento, Perseguidor de Contratos, Notificaciones de Negocios) ahorran 15-25 horas por mes cuando están funcionando. A una tasa efectiva conservadora de $50/hora, eso es $750-$1.250 de tiempo recuperado cada mes. Incluso una plataforma de automatización de $50/mes se paga sola 15 veces.
</InsightCard>

Ese es el caso de ROI. Pero la automatización también previene el problema que le cuesta más a los fundadores que el tiempo: **que las cosas se pierdan**.

Prospectos que respondieron y nunca recibieron una respuesta. Contratos que quedaron sin firmar por 3 semanas mientras lo olvidabas. Nuevos leads que no tuvieron noticias tuyas por 6 horas porque estabas en reuniones.

La automatización no solo ahorra tiempo. Tapa las fugas de ingresos.

<RangeSlider
  label="¿Cuántas horas por semana estás gastando en tareas que una máquina podría hacer?"
  min={0}
  max={20}
  lowLabel="Muy pocas"
  highLabel="Mitad de mi semana"
  persistKey="automation-L1-time-estimate"
/>

---

## Los Cuatro Jugadores: Una Visión Honesta

Aquí está el panorama sin el discurso de marketing:

<SlideNavigation>
<Slide title="Zapier: El Punto de Partida Más Fácil">

Zapier construyó la categoría de automatización sin código. Tiene más de 7.000 integraciones de aplicaciones — más que nadie — y el modelo de disparador-acción más simple que encontrarás.

**Cómo funciona:** Elige un disparador (p. ej., "Nueva envío de Typeform"). Agrega acciones (p. ej., "Crear contacto en HubSpot," luego "Enviar mensaje de Slack"). Listo. Sin código, sin compuertas lógicas, sin diagramas visuales.

**Precios:**

- Gratis: 100 tareas/mes, 5 Zaps de un solo paso
- Starter: $19.99/mes — 750 tareas, Zaps de varios pasos, filtros
- Professional: $49/mes — 2.000 tareas, rutas/lógica condicional

**El inconveniente:** El consumo de tareas. Cada paso en un Zap consume una tarea. Un Zap de 5 pasos que se ejecuta 100 veces = 500 tareas. En el nivel Starter (750 tareas), tienes espacio para unas 100-150 ejecuciones de automatización por mes con 5 pasos cada una.

**Ideal para:** Fundadores que quieren que las cosas funcionen en 10 minutos. Máximas integraciones con mínima fricción.

</Slide>

<Slide title="Make: Más Poder a Menor Costo">

Make (anteriormente Integromat) usa un constructor visual de escenarios — ves todo el flujo como un diagrama con módulos conectados por rutas de datos. Más complejo de aprender que Zapier, pero dramáticamente más poderoso y más barato por operación.

**Cómo funciona:** Arrastra módulos al lienzo. Conéctalos con flechas. Agrega enrutadores, filtros e iteradores para manejar lógica de bifurcación. Los datos fluyen visualmente de izquierda a derecha.

**Precios:**

- Gratis: 1.000 operaciones/mes, 2 escenarios activos
- Core: $10.59/mes — 10.000 operaciones/mes
- Pro: $18.82/mes — 10.000 operaciones + funciones avanzadas

**La ventaja:** Las operaciones se cuentan de manera diferente a las tareas de Zapier. Un escenario de 5 pasos que se ejecuta 100 veces = 500 operaciones. En Core ($10.59), obtienes 10.000 operaciones — aproximadamente 2.000 ejecuciones de automatización con 5 pasos cada una. Eso es 2.7 veces más volumen que Zapier Starter a la mitad del precio.

**Ideal para:** Fundadores que necesitan lógica de bifurcación compleja (si/si no, bucles, agregadores) a menor costo. Vale la pena la curva de aprendizaje ligeramente más pronunciada.

</Slide>

<Slide title="n8n: Gratis Si Lo Alojas Tú">

n8n es automatización de flujo de trabajo de código abierto. Puedes alojarlo en un VPS de $5-10/mes (DigitalOcean, Vultr, Hetzner) y ejecutar flujos de trabajo ilimitados de forma gratuita. Si no quieres alojarlo tú mismo, la versión en la nube cuesta $24/mes por 2.500 ejecuciones.

**Cómo funciona:** Editor de flujos de trabajo visual similar a Make. Más de 400 integraciones integradas. Acceso completo al código — puedes escribir JavaScript dentro de cualquier nodo. Puede ejecutar subflujos de trabajo. Admite webhooks, trabajos cron y lógica compleja.

**Precios:**

- Autohospedado: Gratis (+ $5-10/mes por VPS)
- Nube: $24/mes por 2.500 ejecuciones

**El requisito técnico:** El autohospedaje requiere familiaridad con servidores, Docker o npm, y comandos básicos de Linux. Es una configuración de 1-2 horas, no de 10 minutos. Pero una vez en funcionamiento, el costo de automatización continuo es cero.

**Ideal para:** Fundadores técnicos que quieren control total, flujos de trabajo ilimitados y sin costos por operación. También ideal si quieres agregar lógica de JavaScript personalizada a cualquier paso de automatización.

</Slide>

<Slide title="Trigger.dev: Solo Para Desarrolladores">

Trigger.dev es automatización basada en eventos y primero en código, construida para desarrolladores. Escribes trabajos en TypeScript que se ejecutan en la nube, activados por webhooks, horarios o eventos de API. No es una herramienta de arrastrar y soltar — es un ejecutor de trabajos en segundo plano con una experiencia de desarrollador amigable.

**Cómo funciona:** Defines trabajos en código con `client.defineJob()`. Los trabajos tienen disparadores (webhooks, horarios, eventos HTTP) y se ejecutan en el servidor. El panel de Trigger.dev muestra ejecuciones de trabajos, registros y fallos.

**Precios:**

- Gratis: 10.000 ejecuciones/mes
- Pro: $25/mes

**El requisito técnico:** TypeScript/JavaScript. Necesitas escribir código. No hay interfaz de usuario para construir automatizaciones.

**Ideal para:** Fundadores técnicos que quieren expresar lógica de automatización que no cabe en herramientas sin código. Lógica condicional compleja, consultas de base de datos, llamadas a la API de IA en medio del flujo.

</Slide>
</SlideNavigation>

---

## Comparación Cara a Cara

<ComparisonBuilder
title="Comparación de Plataformas: Zapier vs Make para las 5 Automatizaciones Principales"
persistKey="automation-L1-compare"
prompt="Basándote en la comparación anterior, ¿qué plataforma elegirías para tu stack de automatización como fundador en solitario y por qué?"
expertExample="Elegiría Make en el nivel Core ($10.59/mes) por tres razones: (1) 10.000 operaciones me dan 10 veces más espacio que Zapier Starter a la mitad del precio, (2) el constructor visual de escenarios me ayuda a depurar flujos cuando se rompen, y (3) escenarios complejos como el flujo de Enrutamiento de Respuestas (con bifurcación condicional basada en el sentimiento de la respuesta) son más fáciles de construir en Make que en Zapier. Usaría Zapier solo si necesitara una integración específica que Make no admite."
criteria={["Costo por ejecución de automatización", "Facilidad para construir lógica de bifurcación compleja", "Número de integraciones de aplicaciones", "Depuración y visibilidad de errores", "Escalabilidad a largo plazo dentro de un presupuesto de $100/mes"]}
/>

---

## El Marco de Decisión

Deja de pensar demasiado. Aquí hay un árbol de decisión que maneja el 95% de las situaciones de fundadores en solitario:

<DecisionTree
title="¿Qué Plataforma de Automatización Es Correcta para Ti?"
persistKey="automation-L1-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Te sientes cómodo escribiendo código (JavaScript/TypeScript)?",
choices: [
{ label: "Sí — escribo código regularmente", nextNodeId: "developer" },
{ label: "No — prefiero herramientas visuales", nextNodeId: "no_code" }
]
},
{
id: "developer",
content: "¿Necesitas lógica personalizada completa, consultas de base de datos o llamadas a la API de IA en medio del flujo?",
choices: [
{ label: "Sí — se requiere lógica personalizada compleja", nextNodeId: "trigger_dev" },
{ label: "No — disparador/acción estándar con algo de personalización", nextNodeId: "n8n" }
]
},
{
id: "trigger_dev",
content: "Usa Trigger.dev. El nivel gratuito (10K ejecuciones/mes) cubre las 5 automatizaciones principales fácilmente. Escribe trabajos en TypeScript con total flexibilidad. La mejor opción para desarrolladores puros que quieren que sus automatizaciones se sientan como código.",
isTerminal: true,
outcome: "positive"
},
{
id: "n8n",
content: "Usa n8n. Alójalo en un VPS de $5-10/mes para flujos de trabajo ilimitados a costo casi cero. Más de 400 integraciones, acceso completo a JavaScript en cualquier nodo. Toma 1-2 horas configurar, ahorra para siempre después.",
isTerminal: true,
outcome: "positive"
},
{
id: "no_code",
content: "¿Necesitas lógica de bifurcación compleja (si el prospecto respondió negativamente → dar de baja, si positivamente → crear tarea prioritaria)?",
choices: [
{ label: "Sí — mis flujos tienen múltiples bifurcaciones", nextNodeId: "make" },
{ label: "No — principalmente flujos lineales disparador → acción", nextNodeId: "budget" }
]
},
{
id: "make",
content: "Usa Make en el nivel Core ($10.59/mes). El constructor visual de escenarios maneja el enrutamiento complejo con enrutadores, filtros y agregadores. 10K operaciones/mes es suficiente para las 5 automatizaciones principales más el enrutamiento de respuestas.",
isTerminal: true,
outcome: "positive"
},
{
id: "budget",
content: "¿Es más importante la máxima cobertura de aplicaciones que la optimización de costos?",
choices: [
{ label: "Sí — uso muchas herramientas diferentes", nextNodeId: "zapier" },
{ label: "No — uso herramientas estándar (HubSpot/Pipedrive + Calendly + Slack)", nextNodeId: "make_simple" }
]
},
{
id: "zapier",
content: "Usa Zapier Starter ($19.99/mes). Más de 7.000 integraciones cubren casi cualquier herramienta. 750 tareas/mes maneja las 5 automatizaciones principales a volumen moderado. Lo más fácil para comenzar rápido.",
isTerminal: true,
outcome: "positive"
},
{
id: "make_simple",
content: "Usa Make Free o Core. El nivel gratuito (1.000 ops/mes) es suficiente para probar las 5 automatizaciones. Core ($10.59/mes) escala cómodamente a medida que crece el volumen. Mejor valor que Zapier si usas herramientas estándar.",
isTerminal: true,
outcome: "positive"
}
]}
/>

---

## Cálculo de Costo Real: ¿Qué Gastarás Realmente?

Las páginas de precios te dicen los límites de tareas/operaciones. Pero ¿qué significa eso para tu stack de automatización real?

<ScenarioSimulator
title="Estimador de Costo Mensual de Automatización"
persistKey="automation-L1-cost-sim"
levers={[
{ id: "leads_month", label: "Nuevos leads por mes", min: 5, max: 100, step: 5, defaultValue: 20 },
{ id: "meetings_month", label: "Reuniones por mes", min: 2, max: 30, step: 2, defaultValue: 8 },
{ id: "active_deals", label: "Negocios activos en pipeline", min: 5, max: 50, step: 5, defaultValue: 15 },
{ id: "steps_per_flow", label: "Pasos promedio por automatización", min: 3, max: 8, step: 1, defaultValue: 5 }
]}
outputs={[
{ id: "monthly_ops", label: "Operaciones mensuales estimadas", formula: "(leads_month + meetings_month + active_deals * 2) * steps_per_flow", unit: "ops", precision: 0 },
{ id: "zapier_tasks", label: "Tareas de Zapier consumidas", formula: "(leads_month + meetings_month + active_deals * 2) * steps_per_flow", unit: "tareas", precision: 0 },
{ id: "make_ops_pct", label: "Utilización del nivel gratuito de Make (%)", formula: "((leads_month + meetings_month + active_deals * 2) * steps_per_flow) / 10", unit: "%", precision: 0 }
]}
insight="Con `{monthly_ops}` operaciones por mes, estás bien dentro de Make Core (10K ops). Zapier Starter (750 tareas) también lo maneja. Si tu utilización del nivel gratuito de Make alcanza `{make_ops_pct}`%, actualiza a Make Core a $10.59/mes."
/>

<InsightCard icon="💡" title="La Realidad Práctica del Presupuesto">
Para la mayoría de los fundadores en solitario que ejecutan las 5 automatizaciones principales a volumen moderado (20-50 leads/mes, 8-15 reuniones/mes, 10-20 negocios activos), el costo total de la plataforma de automatización es de $10-20/mes en Make o Zapier Starter. Te mantienes cómodamente por debajo del presupuesto de $100/mes con espacio para crecer.
</InsightCard>

---

## Automatizaciones Nativas del CRM: Úsalas Primero

Antes de pagar por una plataforma de terceros, comprueba qué hace tu CRM gratis.

<FlipCard
  front="Automatizaciones Gratuitas de HubSpot"
  back="HubSpot Free incluye automatización de etapa de negocio (p. ej., 'Cuando el negocio se mueve a Propuesta, enviar una tarea al propietario'). Sin flujos de trabajo de varios pasos — esos requieren Starter ($15/mes). Útil para: notificaciones de cambio de etapa y creación simple de tareas."
/>

<FlipCard
  front="Automatizaciones de Pipedrive"
  back="Todos los planes de Pipedrive incluyen automatizaciones (el plan Essential a $14/mes incluye 30 automatizaciones activas). Admite disparadores basados en cambios de etapa de negocio, creación de contactos y completación de actividades. Cubre muchas de las 5 automatizaciones principales de forma nativa."
/>

<FlipCard
  front="Automatizaciones de Attio"
  back="El sistema de automatización de Attio (disponible en el plan Pro, $34/mes/usuario) admite flujos de trabajo de disparador-acción con filtros. Buena cobertura nativa para enrutamiento de leads y actualizaciones de etapa de negocio. Integración con Zapier disponible en el plan gratuito."
/>

<ExampleCard label="Caso de Estudio: El Enfoque CRM-Primero">
Rachel usó las automatizaciones nativas de Pipedrive (incluidas en su plan Essential de $14/mes) para manejar tres de las cinco automatizaciones principales sin herramientas adicionales:

1. **Registrador de Reuniones**: Pipedrive registra automáticamente eventos de Calendly y crea actividades de seguimiento mediante Zapier (1 Zap, mínimas tareas)
2. **Notificaciones de Negocios**: Las automatizaciones nativas de Pipedrive le envían un mensaje de Slack cuando un negocio cambia de etapa (integrado, costo adicional cero)
3. **Recordatorio de Seguimiento**: Pipedrive crea tareas 3 y 7 días después de la creación del negocio si no se registra actividad (automatización nativa, gratis)

Solo necesitó Zapier para el Capturador de Leads (formulario → CRM) y el Perseguidor de Contratos. Su costo total de automatización: $14/mes (Pipedrive) + $0 (nivel gratuito de Zapier para 2 Zaps de un solo paso).

**Total: $14/mes por un stack de automatización completo.**
</ExampleCard>

---

## La Pregunta de Calidad de la Integración

Todas las plataformas de automatización afirman integrarse con todo. La realidad es más matizada.

<SwipeDecision
title="¿Qué Plataforma Usarías?"
description="Para cada escenario, elige la plataforma de automatización que mejor se adapte."
optionA="Zapier"
optionB="Make"
persistKey="automation-L1-swipe"
cards={[
{
id: "1",
content: "Quieres conectar Typeform → HubSpot → Slack en 15 minutos. Nunca has usado herramientas de automatización antes.",
correctOption: "a",
explanation: "Zapier gana en velocidad. El Zap de tres pasos toma 10-15 minutos en configurar con la configuración guiada de Zapier. No se necesita diagrama visual."
},
{
id: "2",
content: "Quieres enrutar respuestas de manera diferente según el sentimiento: respuestas positivas → tarea prioritaria, respuestas negativas → dar de baja + actualizar CRM, fuera de oficina → tarea de reprogramación.",
correctOption: "b",
explanation: "Make gana en lógica de bifurcación. El módulo de enrutador maneja el enrutamiento condicional de tres vías limpiamente. Esto requeriría Zapier Paths (nivel professional, $49/mes) pero está disponible en Make Core ($10.59/mes)."
},
{
id: "3",
content: "Usas un CRM específico de la industria que no tiene integración con Make pero tiene integración con Zapier.",
correctOption: "a",
explanation: "Zapier gana cuando necesitas una integración específica que Make no admite. La biblioteca de más de 7.000 integraciones de Zapier es el diferenciador decisivo para soporte de herramientas de nicho."
},
{
id: "4",
content: "Necesitas procesar 500 leads por mes a través de una automatización de 5 pasos con un presupuesto de $20/mes.",
correctOption: "b",
explanation: "Make gana en economía de volumen. 500 leads × 5 pasos = 2.500 operaciones. Make Core ($10.59/mes) incluye 10.000 operaciones. Zapier Starter ($19.99/mes) solo incluye 750 tareas — superarías ese límite."
}
]}
/>

---

## Elegir Tu Plataforma y Comprometerte

El peor resultado es la parálisis de plataforma — pasar 3 semanas comparando herramientas mientras tus automatizaciones quedan sin construir.

La regla es: **elige una plataforma esta semana y construye tu primera automatización antes del domingo**.

<TemplateBuilder
title="Mi Decisión de Plataforma de Automatización"
persistKey="automation-L1-platform-decision"
sections={[
{
id: "choice",
title: "Mi Elección de Plataforma",
fields: [
{
id: "platform",
label: "Plataforma que estoy eligiendo",
placeholder: "p. ej., Make Core a $10.59/mes",
type: "text"
},
{
id: "reason",
label: "Razón principal para esta elección",
placeholder: "p. ej., Mejor ratio costo/operación para mi volumen, y necesito lógica de bifurcación para el enrutamiento de respuestas",
type: "textarea"
}
]
},
{
id: "setup",
title: "Mi Plan de Configuración",
fields: [
{
id: "crm",
label: "CRM que estoy automatizando",
placeholder: "p. ej., HubSpot Free",
type: "text"
},
{
id: "tools",
label: "Otras herramientas en mi stack (calendario, formularios, Slack)",
placeholder: "p. ej., Calendly, Typeform, Slack",
type: "text"
},
{
id: "first_automation",
label: "Primera automatización que construiré (Lección 2: Capturador de Leads)",
placeholder: "p. ej., Typeform → creación de contacto en HubSpot → notificación de Slack",
type: "textarea"
}
]
},
{
id: "budget",
title: "Mi Presupuesto Mensual",
fields: [
{
id: "platform_cost",
label: "Costo de la plataforma por mes",
placeholder: "p. ej., $10.59/mes (Make Core)",
type: "text"
},
{
id: "remaining",
label: "Presupuesto restante para otras herramientas de automatización",
placeholder: "p. ej., $89.41 restantes del presupuesto de $100",
type: "text"
}
]
}
]}
/>

---

## Tus Elementos de Acción

<InteractiveChecklist
title="Elementos de Acción de la Lección 1"
persistKey="automation-L1-actions"
items={[
"Ejecuta el árbol de decisión de arriba e identifica tu plataforma",
"Crea una cuenta en tu plataforma elegida (Zapier, Make, n8n o Trigger.dev)",
"Conecta tu CRM como la primera integración — verifica que la conexión funciona",
"Audita las automatizaciones nativas de tu CRM — lista cuáles de las 5 automatizaciones principales puede manejar de forma nativa",
"Calcula tu volumen mensual estimado de operaciones usando el simulador de arriba",
"Completa tu plantilla de Decisión de Plataforma de arriba",
"Lee la Lección 2 para construir tu primera automatización: el Capturador de Leads"
]}
/>

---

## Qué Sigue

En la **Lección 2**, construirás el Capturador de Leads: la automatización que captura nuevos leads de cualquier fuente (formulario, Calendly, respuesta de email) y crea un contacto en el CRM, establece la fuente del lead y te notifica por Slack — todo en menos de 30 segundos.

Al final de la Lección 2, ningún lead volverá a perderse.

---

## Quiz: Fundamentos de Plataformas de Automatización

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Qué plataforma ofrece más integraciones de aplicaciones?",
      "options": ["Make", "n8n", "Zapier", "Trigger.dev"],
      "correctAnswer": 2,
      "explanation": "Zapier tiene más de 7.000 integraciones — la mayor cantidad de cualquier plataforma. Esta es su principal ventaja sobre Make (1.500+) y n8n (400+)."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Un Zap de 5 pasos en Zapier se ejecuta 200 veces por mes. ¿Cuántas tareas consume?",
      "options": ["200", "500", "1.000", "5"],
      "correctAnswer": 2,
      "explanation": "Cada paso en un Zap consume una tarea. 5 pasos × 200 ejecuciones = 1.000 tareas. Zapier Starter permite 750 tareas/mes — necesitarías actualizar a Professional ($49/mes) o cambiar a Make."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "¿Qué plataforma es gratuita si la alojas en un VPS?",
      "options": ["Zapier", "Make", "n8n", "Trigger.dev"],
      "correctAnswer": 2,
      "explanation": "n8n es de código abierto y gratuito para autohospedar. Un VPS de $5-10/mes (DigitalOcean, Vultr, Hetzner) ejecuta n8n con flujos de trabajo ilimitados."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Trigger.dev es la mejor opción para fundadores no técnicos que quieren automatizaciones funcionando en 10 minutos.",
      "correctAnswer": false,
      "explanation": "Falso. Trigger.dev requiere código TypeScript — es solo para desarrolladores. Los fundadores no técnicos deberían comenzar con Zapier (más fácil) o Make (más poderoso)."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "Make Core cuesta $10.59/mes e incluye 10.000 operaciones. Zapier Starter cuesta $19.99/mes e incluye 750 tareas. Con 5 pasos por ejecución de automatización, ¿cuántas veces puede ejecutar automatizaciones cada plataforma por mes?",
      "options": [
        "Make: 2.000 ejecuciones. Zapier: 150 ejecuciones.",
        "Make: 1.000 ejecuciones. Zapier: 750 ejecuciones.",
        "Make: 10.000 ejecuciones. Zapier: 750 ejecuciones.",
        "Make: 2.000 ejecuciones. Zapier: 750 ejecuciones."
      ],
      "correctAnswer": 0,
      "explanation": "Make: 10.000 ops ÷ 5 pasos = 2.000 ejecuciones. Zapier: 750 tareas ÷ 5 pasos = 150 ejecuciones. Make te da 13 veces más ejecuciones de automatización a la mitad del precio."
    }
  ]
}
```
