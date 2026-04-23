---
title: "Tu Playbook de Onboarding"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 36: Onboarding de Clientes"
lesson: 10
---

Has pasado nueve lecciones construyendo las piezas. Ahora es momento de ensamblarlas en un sistema que funcione sin que estés cuidando a cada nuevo cliente.

Este no es un ejercicio de "algún día". Al final de esta lección, tendrás un playbook de onboarding completo — un documento vivo que define cada punto de contacto, automatización e intervención desde el registro hasta el Día 90. También te llevarás un sprint de implementación de 14 días que convierte este playbook de teoría en práctica.

## El Playbook de Onboarding: Tu Manual de Operaciones

Piensa en tu playbook como el manual de instrucciones para tu sistema de onboarding. Responde tres preguntas:

1. **¿Qué pasa cuándo?** (Cronograma y disparadores)
2. **¿Quién hace qué?** (Intervenciones automatizadas vs. manuales)
3. **¿Cómo medimos el éxito?** (Métricas y umbrales)

La mayoría de los fundadores en solitario se saltan este paso. Construyen secuencias de correo y listas de verificación pero nunca documentan el _sistema_. Seis meses después, no recuerdan por qué configuraron un recordatorio del Día 5 o qué umbral de NPS debería activar una alerta.

Tu playbook resuelve eso.

<InsightCard icon="📋" title="¿Por Qué Documentar?">
Un playbook documentado te permite iterar sin romper cosas. Cuando pruebas una nueva variante de correo o agregas un hito, sabes exactamente qué estás cambiando y por qué. Además, si alguna vez contratas ayuda, esto se convierte en su manual de entrenamiento.
</InsightCard>

## Qué Incluir en Tu Playbook

Tu playbook tiene cinco secciones principales:

### 1. Mapa del Recorrido de Onboarding

Este es tu cronograma visual — el camino de 90 días desde el registro hasta la decisión de renovación. Lo construiste en las Lecciones 2 y 3. Ahora lo estás finalizando.

<TemplateBuilder
title="Tu Mapa del Recorrido de 90 Días"
persistKey="onboarding-L10-journey"
sections={[
{
id: "milestones",
title: "Hitos Clave",
fields: [
{ id: "day1", label: "Hito del Día 1", placeholder: "ej., Configuración de cuenta completa", type: "text" },
{ id: "day3", label: "Hito del Día 3", placeholder: "ej., Primera acción central realizada", type: "text" },
{ id: "day7", label: "Hito del Día 7 (Primer Valor)", placeholder: "ej., Primer reporte generado", type: "text" },
{ id: "day14", label: "Hito del Día 14", placeholder: "ej., Segundo caso de uso explorado", type: "text" },
{ id: "day30", label: "Hito del Día 30 (Hábito)", placeholder: "ej., 3+ inicios de sesión por semana", type: "text" },
{ id: "day60", label: "Hito del Día 60 (Expansión)", placeholder: "ej., Invitó a un miembro del equipo o subió de plan", type: "text" },
{ id: "day90", label: "Hito del Día 90 (Renovación)", placeholder: "ej., Decisión de renovación o extensión de contrato", type: "text" }
]
},
{
id: "interventions",
title: "Puntos de Intervención",
fields: [
{ id: "stalled", label: "¿Cuándo marcas 'estancado'?", placeholder: "ej., Sin inicio de sesión para el Día 5", type: "text" },
{ id: "atrisk", label: "¿Cuándo marcas 'en riesgo'?", placeholder: "ej., NPS 0-6 o sin hito del Día 7", type: "text" },
{ id: "advocate", label: "¿Cuándo marcas 'promotor'?", placeholder: "ej., NPS 9-10 + hito del Día 30", type: "text" }
]
}
]}
/>

### 2. Secuencias de Correo y Automatización

Lista cada correo automatizado y su disparador. Esta es tu referencia cuando algo se rompe o quieres hacer pruebas A/B.

<FlipCard
  front="Ejemplo: Correo Recordatorio del Día 3"
  back="**Disparador:** 3 días después del registro, SI el hito del Día 1 NO está completo. **Asunto:** '¿Te trabaste en la configuración?' **Objetivo:** Re-enganchar usuarios estancados. **CTA:** Enlace a video de configuración de 3 min."
/>

Tu playbook debe incluir:

- Secuencia de bienvenida (7 correos, Lección 4)
- Correo de celebración de primera victoria (Lección 5)
- Recordatorios para usuarios estancados (Lección 5)
- Seguimiento del Día 45 (Lección 7)
- Disparador de entrevista de salida (Lección 7)

### 3. Protocolo de Llamadas de Onboarding

Si estás haciendo llamadas (Lección 6), documenta:

- ¿Quién recibe una llamada? (ej., todos los clientes >$100/mes, aprox. >$2,000 MXN)
- ¿Cuándo se agenda? (ej., Día 3-5)
- ¿Cuál es el guion? (plantilla de 15 minutos)
- ¿Cuál es el seguimiento? (enlace de seguimiento del Día 30)

<ExampleCard label="Protocolo de Llamadas: Fundador de SaaS">
**Quién:** Todos los clientes en plan Pro ($200/mes+, aprox. $4,000 MXN+)
**Cuándo:** Día 3-5 después del registro
**Duración:** 15 minutos
**Guion:** Rapport (3 min) → Verificación de objetivos (5 min) → Resolución de bloqueantes (5 min) → Siguiente paso (2 min)
**Seguimiento:** Enviar enlace de Calendly para seguimiento del Día 30 en el correo post-llamada
</ExampleCard>

### 4. Panel de Métricas

Define tus métricas estrella del norte de onboarding y sus umbrales:

<RangeSlider
  label="¿Cuál es tu objetivo de Tiempo hasta el Primer Valor (TTFV)?"
  min={1}
  max={14}
  lowLabel="1 día"
  highLabel="14 días"
  persistKey="onboarding-L10-ttfv"
/>

Tu playbook debe rastrear:

- **TTFV** (Tiempo hasta el Primer Valor): Objetivo < 24 horas para SaaS, < 7 días para servicios
- **Tasa de Activación del Día 7**: % de clientes que alcanzan el hito de primer valor para el Día 7
- **Retención del Día 30**: % que sigue activo al Día 30
- **Retención del Día 90**: % que sigue activo al Día 90
- **NPS al Día 45**: Puntaje promedio de la encuesta de seguimiento

<InsightCard icon="📊" title="La Métrica que Más Importa">
Si solo rastreas una cosa, que sea la **Tasa de Activación del Día 7**. Los clientes que alcanzan el primer valor en la primera semana tienen una retención del 85%+ a 60 días. Todo lo demás es consecuencia de esto.
</InsightCard>

### 5. Escalamiento y Manejo de Excepciones

¿Qué pasa cuando las cosas salen mal?

- **Usuario estancado (sin inicio de sesión para el Día 5):** Correo de recordatorio automatizado + notificación de WhatsApp/Slack al fundador
- **Cliente en riesgo (NPS 0-6):** Contacto personal dentro de 24 horas
- **Cliente molesto (ticket de soporte con sentimiento negativo):** Escalar al fundador inmediatamente
- **Solicitud de cancelación:** Enviar entrevista de salida + correo personal de "¿podemos resolverlo?"

<DecisionTree
title="Árbol de Decisión de Escalamiento"
persistKey="onboarding-L10-escalation"
startNodeId="start"
nodes={[
{
id: "start",
content: "El cliente no ha iniciado sesión para el Día 5. ¿Qué haces?",
choices: [
{ label: "Enviar correo de recordatorio automatizado", nextNodeId: "nudge" },
{ label: "Contacto personal del fundador", nextNodeId: "personal" }
]
},
{
id: "nudge",
content: "Recordatorio enviado. Inicia sesión pero no completa el hito del Día 7. ¿Siguiente paso?",
choices: [
{ label: "Enviar correo de 'un paso más'", nextNodeId: "onestep" },
{ label: "Agendar llamada personal", nextNodeId: "call" }
]
},
{
id: "personal",
content: "Envías un correo personal. Responde: 'Estoy muy ocupado ahorita.' ¿Qué haces?",
choices: [
{ label: "Ofrecer pausar la cuenta", nextNodeId: "pause" },
{ label: "Ofrecer recorrido asíncrono con Loom", nextNodeId: "loom" }
]
},
{
id: "onestep",
content: "¡Completa el hito! Lo recuperaste.",
isTerminal: true,
outcome: "positive"
},
{
id: "call",
content: "Llamada agendada. Resuelves el problema en vivo y se activa.",
isTerminal: true,
outcome: "positive"
},
{
id: "pause",
content: "Cuenta pausada. Haces seguimiento en 30 días.",
isTerminal: true,
outcome: "neutral"
},
{
id: "loom",
content: "Ve el Loom y se activa. Crisis resuelta.",
isTerminal: true,
outcome: "positive"
}
]}
/>

## Construyendo Tu Playbook: La Plantilla

Aquí está la estructura. Llénala conforme avanzas.

<TemplateBuilder
title="Tu Playbook de Onboarding"
persistKey="onboarding-L10-playbook"
sections={[
{
id: "overview",
title: "1. Resumen General",
fields: [
{ id: "business", label: "Tipo de Negocio", placeholder: "SaaS / Servicios / Coaching / Cursos", type: "text" },
{ id: "ttfv", label: "TTFV Objetivo", placeholder: "ej., 24 horas", type: "text" },
{ id: "customerCount", label: "Cantidad Actual de Clientes", placeholder: "ej., 35", type: "text" },
{ id: "arpu", label: "Ingreso Promedio por Usuario (ARPU)", placeholder: "ej., $150/mes (aprox. $3,000 MXN)", type: "text" }
]
},
{
id: "journey",
title: "2. Mapa del Recorrido de 90 Días",
fields: [
{ id: "milestones", label: "Hitos Clave (Día 1, 3, 7, 14, 30, 60, 90)", placeholder: "Lista cada hito y su definición", type: "textarea" }
]
},
{
id: "automation",
title: "3. Secuencias de Correo y Automatización",
fields: [
{ id: "welcome", label: "Secuencia de Bienvenida (7 correos)", placeholder: "Lista los asuntos y disparadores", type: "textarea" },
{ id: "firstwin", label: "Correo de Primera Victoria", placeholder: "Disparador + plantilla", type: "textarea" },
{ id: "stalled", label: "Recordatorios para Usuarios Estancados", placeholder: "Disparador + plantilla", type: "textarea" },
{ id: "checkin", label: "Seguimiento del Día 45", placeholder: "Enlace de encuesta + correo personal", type: "textarea" }
]
},
{
id: "calls",
title: "4. Protocolo de Llamadas de Onboarding",
fields: [
{ id: "callCriteria", label: "¿Quién recibe una llamada?", placeholder: "ej., Todos los clientes >$100/mes", type: "text" },
{ id: "callTiming", label: "¿Cuándo se agenda?", placeholder: "ej., Día 3-5", type: "text" },
{ id: "callScript", label: "Guion de Llamada de 15 Minutos", placeholder: "Pega o enlaza el guion", type: "textarea" }
]
},
{
id: "metrics",
title: "5. Panel de Métricas",
fields: [
{ id: "ttfvTarget", label: "Objetivo de TTFV", placeholder: "ej., <24 horas", type: "text" },
{ id: "day7Target", label: "Objetivo de Tasa de Activación del Día 7", placeholder: "ej., 70%", type: "text" },
{ id: "day30Target", label: "Objetivo de Retención del Día 30", placeholder: "ej., 85%", type: "text" },
{ id: "npsTarget", label: "Objetivo de NPS al Día 45", placeholder: "ej., 40+", type: "text" }
]
},
{
id: "escalation",
title: "6. Escalamiento y Manejo de Excepciones",
fields: [
{ id: "stalledProtocol", label: "Protocolo de Usuario Estancado", placeholder: "ej., Recordatorio automatizado + alerta de WhatsApp", type: "textarea" },
{ id: "atriskProtocol", label: "Protocolo de Cliente en Riesgo", placeholder: "ej., Contacto personal dentro de 24 horas", type: "textarea" },
{ id: "churnProtocol", label: "Protocolo de Solicitud de Cancelación", placeholder: "ej., Entrevista de salida + correo personal", type: "textarea" }
]
}
]}
/>

## El Sprint de Implementación de 14 Días

Construiste el playbook. Ahora necesitas _implementarlo_.

Este sprint es tu plan de ejecución. Cada día tiene un solo enfoque. Sin multitareas. Sin "lo haré después."

<SlideNavigation>
<Slide title="Día 1-2: Auditoría y Línea Base">
**Objetivo:** Entender tu estado actual.

**Tareas:**

- Exporta tu lista de clientes
- Calcula tu TTFV actual (promedio de días desde el registro hasta el primer valor)
- Calcula la tasa de activación del Día 7 (% que alcanza el primer valor para el Día 7)
- Calcula la retención del Día 30 y Día 90
- Documenta tu proceso actual de onboarding (¿qué correos existen? ¿qué es manual?)

**Resultado:** Métricas de línea base + análisis de brechas
</Slide>

<Slide title="Día 3-4: Construir la Secuencia de Bienvenida">
**Objetivo:** Poner la secuencia de 7 correos en vivo.

**Tareas:**

- Escribe los 7 correos (usa las plantillas de la Lección 4)
- Configura la secuencia de correos en tu ESP (Brevo, ConvertKit, Customer.io, Mailchimp)
- Prueba la secuencia registrándote como cliente de prueba
- Verifica los tiempos y disparadores

**Resultado:** Secuencia de bienvenida en vivo
</Slide>

<Slide title="Día 5-6: Configurar el Seguimiento de Hitos">
**Objetivo:** Definir y rastrear tus hitos de activación.

**Tareas:**

- Define tus hitos del Día 1, 3, 7, 14, 30, 60, 90
- Configura seguimiento de eventos (si es SaaS) o seguimiento manual (si es servicio/coaching)
- Crea una hoja de Google Sheets o base de datos de Notion para registrar la completación de hitos
- Prueba: activa manualmente un hito y verifica que se registre correctamente

**Resultado:** Sistema de seguimiento de hitos funcionando
</Slide>

<Slide title="Día 7-8: Construir la Detección de Usuarios Estancados">
**Objetivo:** Detectar usuarios estancados antes de que desaparezcan.

**Tareas:**

- Configura una automatización en Zapier/Make/n8n: SI no hay inicio de sesión en 5 días → enviar correo de recordatorio + notificación de WhatsApp/Slack
- Escribe el correo de recordatorio para "usuario estancado" (usa la plantilla de la Lección 5)
- Prueba la automatización con una cuenta de prueba

**Resultado:** Automatización de usuario estancado en vivo
</Slide>

<Slide title="Día 9-10: Construir el Seguimiento del Día 45">
**Objetivo:** Obtener retroalimentación antes de que ocurra la cancelación.

**Tareas:**

- Crea tu encuesta NPS de 3 preguntas (Typeform, Tally, o Google Forms)
- Escribe el correo personal del Día 45 (usa la plantilla de la Lección 7)
- Configura la automatización: 45 días después del registro → enviar encuesta + correo personal
- Define el protocolo de respuesta NPS (9-10 = pedir testimonio, 0-6 = contacto personal)

**Resultado:** Sistema de seguimiento del Día 45 en vivo
</Slide>

<Slide title="Día 11-12: Configuración de Llamadas de Onboarding (si aplica)">
**Objetivo:** Agendar y preparar tus llamadas de onboarding.

**Tareas:**

- Configura Calendly con 2 bloques semanales (ej., martes/jueves 10-11am)
- Escribe tu guion de llamada de 15 minutos (usa la plantilla de la Lección 6)
- Agrega el enlace de Calendly al correo del Día 3 para clientes que califiquen
- Haz una llamada de práctica con un amigo o cliente existente

**Resultado:** Sistema de llamadas en vivo (o saltar si no aplica)
</Slide>

<Slide title="Día 13: Panel de Métricas">
**Objetivo:** Construir tu panel de onboarding.

**Tareas:**

- Crea una hoja de Google Sheets o página de Notion con tus 5 métricas centrales (TTFV, activación del Día 7, retención del Día 30, retención del Día 90, NPS)
- Configura seguimiento semanal (cada lunes, actualiza los números)
- Define tus objetivos para cada métrica

**Resultado:** Panel de métricas en vivo
</Slide>

<Slide title="Día 14: Finalización del Playbook y Revisión">
**Objetivo:** Documentar todo y comprometerte con la revisión semanal.

**Tareas:**

- Llena tu plantilla completa del playbook (usa el TemplateBuilder de arriba)
- Agenda una revisión semanal recurrente de 30 minutos (viernes por la tarde) para revisar métricas y ajustar
- Celebra: ahora tienes un sistema real de onboarding

**Resultado:** Playbook de onboarding completo + cadencia de revisión semanal
</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Tu Checklist del Sprint de 14 Días"
persistKey="onboarding-L10-sprint"
items={[
"Día 1-2: Auditar el onboarding actual y calcular métricas de línea base",
"Día 3-4: Construir y probar la secuencia de bienvenida de 7 correos",
"Día 5-6: Configurar el sistema de seguimiento de hitos",
"Día 7-8: Construir la automatización de detección de usuarios estancados",
"Día 9-10: Construir el sistema de seguimiento NPS del Día 45",
"Día 11-12: Configurar el sistema de llamadas de onboarding (si aplica)",
"Día 13: Construir el panel de métricas",
"Día 14: Finalizar el playbook y agendar la revisión semanal"
]}
/>

## El Ritmo Semanal de CS (Post-Sprint)

Una vez que tu sprint termina, pasas a modo de mantenimiento. Aquí está tu ritmo continuo:

**Lunes (30 min):**

- Escaneo matutino: nuevos registros, usuarios estancados, respuestas NPS, tickets de soporte
- Triaje: marca los 3 temas principales que necesitan acción esta semana

**Miércoles (90 min):**

- Llamadas de onboarding (si aplica)
- Contacto personal con clientes en riesgo (NPS 0-6)
- Correos de seguimiento a clientes de alto valor

**Viernes (60 min):**

- Actualizar panel de métricas
- Revisar el desempeño de onboarding de la semana
- Ajustar una cosa (ej., probar un nuevo asunto de correo, ajustar el hito del Día 7)

**Tiempo semanal total:** 3-4 horas para onboarding (deja 2-3 horas para trabajo de retención y expansión en los Cursos 37-39)

<ScenarioSimulator
title="Asignación Semanal de Tiempo de CS"
persistKey="onboarding-L10-time"
levers={[
{ id: "newSignups", label: "Nuevos registros por semana", min: 1, max: 20, step: 1, defaultValue: 5 },
{ id: "callsEnabled", label: "¿Llamadas de onboarding habilitadas? (1=sí, 0=no)", min: 0, max: 1, step: 1, defaultValue: 1 }
]}
outputs={[
{ id: "scanTime", label: "Tiempo de escaneo matutino (min)", formula: "30", unit: "min", precision: 0 },
{ id: "callTime", label: "Tiempo de llamadas (min)", formula: "callsEnabled * newSignups * 15", unit: "min", precision: 0 },
{ id: "outreachTime", label: "Contacto con clientes en riesgo (min)", formula: "newSignups * 5", unit: "min", precision: 0 },
{ id: "reviewTime", label: "Revisión semanal (min)", formula: "60", unit: "min", precision: 0 },
{ id: "totalTime", label: "Tiempo semanal total de CS", formula: "scanTime + callTime + outreachTime + reviewTime", unit: "min", precision: 0 }
]}
insight="Con {newSignups} registros/semana y llamadas {callsEnabled === 1 ? 'habilitadas' : 'deshabilitadas'}, dedicarás ~{(totalTime / 60).toFixed(1)} horas/semana a CS. Objetivo: 5-7 horas totales en todas las actividades de CS."
/>

## Errores Comunes del Playbook (Y Cómo Evitarlos)

### Error 1: Construir para 1,000 clientes cuando tienes 10

**Solución:** Empieza simple. Una hoja de Google Sheets + 7 correos + 1 automatización de Zapier es suficiente para tus primeros 50 clientes. No construyas infraestructura de CS empresarial el Día 1.

### Error 2: Automatizar todo, incluyendo las excepciones

**Solución:** Automatiza lo repetible (correos de bienvenida, recordatorios de hitos, encuestas). Mantén el toque humano para las excepciones (clientes en riesgo, tickets de soporte negativos, conversaciones de expansión). En LATAM, los clientes valoran especialmente el contacto personal y cálido — no automatices lo que debería sentirse humano.

### Error 3: Configurarlo y olvidarlo

**Solución:** Tu playbook es un documento vivo. Revísalo semanalmente. Ajusta una cosa cada semana basándote en datos. El onboarding nunca está "terminado."

<FlipCard
  front="La Paradoja del Playbook"
  back="Entre más documentes tu sistema de onboarding, menos tiempo pasas gestionándolo. El playbook crea libertad, no rigidez."
/>

### Error 4: Medir métricas de vanidad

**Solución:** No rastrees "tasas de apertura de correo" o "número de llamadas de onboarding completadas." Rastrea resultados: TTFV, tasa de activación del Día 7, retención del Día 90. Esos predicen ingresos.

### Error 5: Tratar a todos los clientes igual

**Solución:** Segmenta tu onboarding. Los clientes de alto valor (>$200/mes, aprox. >$4,000 MXN) reciben llamadas. Los clientes de autoservicio (<$50/mes, aprox. <$1,000 MXN) reciben solo automatización. No desperdicies tiempo en actividades de bajo ROI.

## Tu Playbook en Acción: Un Caso de Estudio

**Gabriela tiene una herramienta SaaS para creadores de contenido ($99/mes, aprox. $2,000 MXN).**

Antes de su playbook:

- TTFV: 9 días
- Activación del Día 7: 35%
- Retención del Día 90: 52%
- Tiempo semanal de CS: 12 horas (infierno de soporte reactivo)

Después de su sprint de 14 días:

- TTFV: 2 días (bajó de 9)
- Activación del Día 7: 78% (subió de 35%)
- Retención del Día 90: 87% (subió de 52%)
- Tiempo semanal de CS: 4 horas (agrupado y proactivo)

**¿Qué cambió?**

1. Definió "primer valor" como "publicó su primer post asistido por IA" (antes no estaba definido)
2. Construyó una lista de verificación de 3 pasos dentro de la app que el 78% de los usuarios completaba en 48 horas
3. Automatizó la detección de usuarios estancados (sin inicio de sesión para el Día 3 → correo de recordatorio + alerta de WhatsApp)
4. Agregó una encuesta NPS del Día 45 que detectaba clientes en riesgo antes de que cancelaran
5. Documentó todo en un playbook y lo revisaba cada viernes

**El resultado:** Redujo la cancelación en un 40% y liberó 8 horas/semana para trabajo de adquisición.

<ExampleCard label="El Playbook de Gabriela: El Cambio que Más Importó">
"La mayor victoria no fueron los correos ni las automatizaciones. Fue **definir el primer valor**. Una vez que supe exactamente qué acción predecía la retención, pude diseñar todo para llevar a los usuarios a ese momento lo más rápido posible. El TTFV bajó de 9 días a 2, y la retención subió 35 puntos."
</ExampleCard>

## Verificación Final: ¿Tu Playbook Está Listo?

Usa esta lista de verificación para confirmar que tu playbook está completo:

<InteractiveChecklist
title="Lista de Verificación de Preparación del Playbook"
persistKey="onboarding-L10-readiness"
items={[
"He definido mis hitos del Día 1, 3, 7, 14, 30, 60, 90",
"He construido una secuencia de bienvenida de 7 correos con disparadores",
"He configurado la detección de usuarios estancados (sin inicio de sesión para el Día 5)",
"He creado un sistema de seguimiento NPS del Día 45",
"He definido mi protocolo de llamadas de onboarding (o decidí no hacer llamadas)",
"He construido un panel de métricas que rastrea TTFV, activación del Día 7, retención del Día 30/90 y NPS",
"He documentado mis protocolos de escalamiento (estancado, en riesgo, cancelación)",
"He agendado una revisión semanal de 30 minutos para revisar métricas y ajustar",
"He completado mi sprint de implementación de 14 días",
"He probado todo el sistema de principio a fin con una cuenta de prueba"
]}
/>

Si marcaste los 10, estás listo. Si no, regresa y termina las brechas.

## Qué Sigue

Construiste tu sistema de onboarding. Ahora lo mantienes.

**Semanas 1-4:** Observa tus métricas. Espera algunos bugs. Corrígelos. Ajusta los tiempos de correo. Afina las definiciones de hitos.

**Meses 2-3:** Empieza a optimizar. Haz pruebas A/B de asuntos de correo. Prueba diferentes recordatorios del Día 7. Experimenta con los horarios de las llamadas.

**Mes 4+:** Tu sistema está funcionando suavemente. El TTFV está estable. La retención está subiendo. Estás dedicando 3-4 horas/semana al onboarding en lugar de 12.

**La siguiente frontera:** Retención y expansión (Cursos 37-39). Una vez que los clientes están incorporados, ¿cómo los mantienes? ¿Cómo haces crecer sus cuentas? Ahí es donde vive el verdadero multiplicador de ingresos.

Pero primero, termina tu sprint. Construye tu playbook. Convierte el onboarding de caos en una máquina.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Tu instinto es sobre-ingenierizar esto. Resiste. Empieza con Google Sheets + automatización básica de correo. Puedes construir dashboards personalizados y pipelines de eventos después. Ahora mismo, la velocidad de implementación supera la perfección arquitectónica.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches y Consultores">
Tu playbook será más centrado en relaciones que el de fundadores de SaaS. Está bien. Documenta tu guion de llamada de kickoff, tu plantilla de acuerdo de trabajo y tu cadencia de seguimiento. La estructura crea espacio para mejores relaciones con clientes, no peores. En LATAM, esa cercanía personal es especialmente valorada — tu playbook debe reflejar eso.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="Para Creadores">
Tu onboarding se trata de entrega de contenido + activación de comunidad. Define "primer valor" como "completó el primer módulo" o "publicó su primera presentación en la comunidad." Tu playbook debe incluir correos de bienvenida, programación de entrega de contenido y avisos de engagement en la comunidad.
</ContextualNote>

## Tus Acciones

<InteractiveChecklist
title="Acciones Post-Lección"
persistKey="onboarding-L10-actions"
items={[
"Completa tu plantilla del Playbook de Onboarding (las 6 secciones)",
"Comienza tu sprint de implementación de 14 días HOY (Día 1: auditoría y línea base)",
"Bloquea 3 espacios recurrentes semanales: escaneo del lunes (30 min), llamadas/contacto del miércoles (90 min), revisión del viernes (60 min)",
"Pon un recordatorio en el calendario para el Día 14: 'Finalizar playbook y celebrar'",
"Comparte tu playbook con un compañero de accountability o mentor para recibir retroalimentación"
]}
/>

---

**Has llegado al final del Curso 36: Onboarding de Clientes.**

Ahora tienes:

- Un mapa de hitos de 90 días
- Una secuencia de bienvenida de 7 correos
- Detección de usuarios estancados
- Un sistema de seguimiento NPS del Día 45
- Un protocolo de llamadas de onboarding (si aplica)
- Un panel de métricas
- Un playbook completo
- Un sprint de implementación de 14 días

**Siguiente:** Curso 37 (Retención y Prevención de Cancelaciones) — donde aprenderás a mantener a los clientes que acabas de incorporar.

Pero primero: ejecuta tu sprint. Construye tu sistema. Convierte el onboarding de caos en una máquina.

Tú puedes con esto.
