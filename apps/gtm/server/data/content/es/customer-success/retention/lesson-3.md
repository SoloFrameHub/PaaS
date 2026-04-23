---
title: "Señales de predicción de abandono que realmente puedes rastrear"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 37: Retención y Prevención de Abandono"
lesson: 3
---

# Señales de predicción de abandono que realmente puedes rastrear

## El problema del abandonador silencioso

Conoce a Alejandro, un fundador en solitario que maneja una herramienta de gestión de proyectos para agencias creativas. El mes pasado, tres clientes cancelaron en una semana. Cuando Alejandro se comunicó para preguntar por qué, dos no respondieron. El tercero dijo: "Simplemente dejamos de usarlo."

Alejandro revisó los datos. Los tres habían dejado de iniciar sesión **23 días antes de cancelar**. Cero quejas. Cero tickets de soporte. Simplemente... se desvanecieron.

Este es el problema del abandonador silencioso: **el 70% de los clientes que abandonan nunca te dicen que están insatisfechos.** No se quejan. No piden ayuda. Dejan de usar tu producto, y semanas después, cancelan.

¿La buena noticia? Los abandonadores silenciosos dejan migajas digitales. El uso baja. El engagement con email disminuye. Los logins se vuelven esporádicos. Estas señales son **visibles 2-4 semanas antes de la cancelación** — si estás observando.

Esta lección te enseña exactamente qué señales rastrear, cómo recopilarlas sin herramientas empresariales, y cómo construir un sistema de alerta temprana que atrapa a los abandonadores antes de que desaparezcan.

<InsightCard icon="🚨" title="La ventana de detección">
Tienes una ventana de 14-21 días entre cuando aparecen las señales de abandono y cuando el cliente cancela. Si pierdes esa ventana, la tasa de recuperación cae del 40% a menos del 10%.
</InsightCard>

---

## Indicadores líderes vs. rezagados

Aquí está el problema fundamental con el abandono: **es un indicador rezagado.** Para cuando alguien cancela, la decisión se tomó semanas atrás. Estás mirando las consecuencias, no la causa.

La predicción de abandono requiere **indicadores líderes** — señales que aparecen _antes_ de la decisión de irse.

Piénsalo como un chequeo médico. Un infarto es un indicador rezagado. La presión arterial alta, el colesterol y el estrés son indicadores líderes. No puedes prevenir un infarto que ya ocurrió, pero puedes prevenir el próximo monitoreando las señales.

<FlipCard
  front="¿Cuál es la diferencia entre indicadores líderes y rezagados?"
  back="Los indicadores rezagados miden lo que ya pasó (abandono, cancelaciones). Los indicadores líderes predicen lo que está por pasar (caída en uso, baja de engagement)."
/>

### La línea de tiempo del abandono

Así se ve el patrón típico de abandono para SaaS de PyMEs:

<SlideNavigation>
<Slide title="Semana 0-1: Uso normal">
El cliente inicia sesión 8-12 veces, usa las funcionalidades principales, abre emails. Todo se ve sano.
</Slide>

<Slide title="Semana 2-3: Alerta temprana">
La frecuencia de login cae 30-50%. Todavía usan el producto, pero menos frecuentemente. La tasa de apertura de email disminuye. **Esta es tu primera señal.**
</Slide>

<Slide title="Semana 4-5: Zona crítica">
Sin logins por 7+ días. Engagement con email cercano a cero. Los tickets de soporte se disparan (frustración) o desaparecen (desconexión). **Esta es tu ventana de intervención.**
</Slide>

<Slide title="Semana 6-8: Punto de no retorno">
Sin actividad por 14-21 días. El cliente se fue mentalmente. La tasa de recuperación cae por debajo del 10%. Llega la solicitud de cancelación.
</Slide>
</SlideNavigation>

El insight clave: **Las semanas 2-5 son donde ganas o pierdes.** Ahí es cuando los indicadores líderes se encienden en rojo, y ahí es cuando la intervención todavía funciona.

<RangeSlider
  label="¿Cuántos días de inactividad pasan antes de que intervengas actualmente?"
  min={0}
  max={30}
  lowLabel="El mismo día"
  highLabel="30+ días"
  persistKey="retention-L3-intervention-timing"
/>

---

## Las 7 señales de abandono que puedes rastrear (Edición fundador en solitario)

No necesitas Gainsight o Totango para predecir el abandono. Necesitas **7 señales rastreables** que puedes monitorear con herramientas básicas.

Aquí está la lista completa, clasificada por poder predictivo:

### Señal #1: Caída en frecuencia de login

**Qué mide:** Con qué frecuencia el cliente accede a tu producto
**Fuente de datos:** Google Analytics 4, base de datos del producto, o registros de autenticación
**Umbral rojo:** Caída del 50% en logins en 2 semanas
**Por qué importa:** La frecuencia de login es el predictor más fuerte de abandono. Un cliente que inició sesión 10 veces la semana pasada y 5 esta semana está mostrando señales tempranas de alarma.

<ExampleCard label="Patrón real: El desvanecimiento gradual">
Cliente A: Semana 1 = 12 logins, Semana 2 = 11 logins, Semana 3 = 10 logins, Semana 4 = 9 logins. **Estable.**

Cliente B: Semana 1 = 12 logins, Semana 2 = 6 logins, Semana 3 = 2 logins, Semana 4 = 0 logins. **Abandonando.**

La diferencia no es el número absoluto — es la **velocidad de caída.**
</ExampleCard>

**Cómo rastrearlo:**

- Configura un reporte semanal de GA4 que muestre usuarios únicos por ID de cliente
- O: consulta tu base de datos de producto para `last_login_date` y compara semana contra semana
- Señala cualquier cuenta con >50% de caída en una ventana de 14 días

### Señal #2: Caída en uso de funcionalidad principal

**Qué mide:** Si los clientes están usando las funcionalidades que crean valor
**Fuente de datos:** Analítica de producto (Mixpanel, Amplitude) o tracking de eventos en tu base de datos
**Umbral rojo:** Cero acciones principales en 7 días
**Por qué importa:** Un cliente que inicia sesión pero no usa funcionalidades principales es "zombie activo" — presente pero no comprometido.

<InsightCard icon="🎯" title="Define tu acción principal">
Todo producto tiene 1-3 "acciones principales" que se correlacionan con la retención. Para Slack, es enviar mensajes. Para Notion, es crear páginas. Para un CRM, es registrar contactos. Identifica la tuya y rastréala religiosamente.
</InsightCard>

**Cómo rastrearlo:**

- Instrumenta tu acción principal como un evento (ej., `proyecto_creado`, `reporte_generado`, `email_enviado`)
- Reporte semanal: clientes con cero acciones principales en los últimos 7 días
- Cruza con datos de login: iniciando sesión pero sin actuar = bandera roja

### Señal #3: Caída en engagement con email

**Qué mide:** Si los clientes están leyendo tus correos
**Fuente de datos:** Tu proveedor de email (Brevo, ConvertKit, Mailchimp)
**Umbral rojo:** La tasa de apertura cae por debajo del 10% por 3+ emails consecutivos
**Por qué importa:** La desconexión del email precede a la desconexión del producto. Si no abren tus correos, se están desconectando mentalmente.

<FlipCard
  front="¿Por qué el engagement con email predice el abandono?"
  back="Los clientes que dejan de leer tus emails han dejado de importarles tu categoría de producto. Ya no prestan atención al problema que tú resuelves."
/>

**Cómo rastrearlo:**

- Etiqueta clientes en tu ESP con un ID único
- Reporte semanal: clientes con &lt;10% de tasa de apertura en los últimos 3 emails
- Señal bonus: clientes que _solían_ abrir emails (>50% de tasa) pero pararon de repente

### Señal #4: Cambio en patrón de tickets de soporte

**Qué mide:** Cambios en cómo los clientes interactúan con soporte
**Fuente de datos:** Help desk (Intercom, Zendesk) o email/WhatsApp
**Umbral rojo:** Pico de quejas O cero contacto por 60+ días
**Por qué importa:** Ambos extremos son malos. Los picos de quejas significan frustración. Cero contacto significa desconexión.

<ComparisonBuilder
title="Patrones de soporte sanos vs. no sanos"
persistKey="retention-L3-support-patterns"
prompt="Describe el patrón típico de interacción de soporte de tu cliente"
expertExample="Sano: 1-2 preguntas por mes, mayormente solicitudes de funcionalidades o preguntas de 'cómo hago esto'. No sano: Ya sea 5+ tickets frustrados en una semana O silencio total por 60+ días."
criteria={[
"Frecuencia de contacto",
"Tono de los tickets (curioso vs. frustrado)",
"Tiempo desde la última interacción"
]}
/>

**Cómo rastrearlo:**

- Reporte semanal: clientes con 3+ tickets en 7 días (pico de frustración)
- Reporte mensual: clientes con cero tickets en 60+ días (desconexión)
- Revisa manualmente el sentimiento de tickets para cuentas de alto valor

### Señal #5: Problemas de comportamiento de pago

**Qué mide:** Si los pagos se procesan sin problemas
**Fuente de datos:** Stripe, Mercado Pago, PayPal o tu sistema de facturación
**Umbral rojo:** Pago fallido no recuperado en 3 días
**Por qué importa:** Los pagos fallidos son frecuentemente el _resultado_ de la intención de abandono, no la causa. Los clientes que deciden irse dejan de actualizar su tarjeta.

<InsightCard icon="💳" title="La paradoja del pago">
El 30-50% de los pagos fallidos son accidentales (tarjeta vencida, problema bancario). Pero el 50-70% son intencionales — el cliente decidió irse y simplemente dejó que el pago fallara en lugar de cancelar.
</InsightCard>

**Cómo rastrearlo:**

- Configura webhooks de Stripe para eventos `payment_failed`
- Secuencia de cobro automatizada: email en Día 1, Día 3, Día 7
- Alcance personal para cuentas de alto valor ($200+/mes) en Día 3
- Rastrea la tasa de recuperación: pagos recuperados vs. abandonados después del fallo

### Señal #6: Caída en puntaje NPS

**Qué mide:** Satisfacción del cliente y probabilidad de recomendar
**Fuente de datos:** Herramienta de encuesta NPS (Delighted, AskNicely) o encuesta manual
**Umbral rojo:** El puntaje cae de 7+ a menos de 6
**Por qué importa:** El NPS es un indicador rezagado de satisfacción pero un indicador líder de abandono. Un cliente que era 9 y ahora es 4 te está diciendo que algo cambió.

**Cómo rastrearlo:**

- Envía encuestas NPS trimestralmente (no mensualmente — la fatiga de encuestas mata las tasas de respuesta)
- Rastrea los cambios de puntaje, no solo los puntajes absolutos
- Haz seguimiento personal con cualquier detractor (puntaje 0-6) dentro de 48 horas

### Señal #7: Falta de actividad de expansión

**Qué mide:** Si el cliente está creciendo contigo
**Fuente de datos:** Sistema de facturación, notas del CRM
**Umbral rojo:** Sin cambio de plan, agregar asientos, o upgrade de funcionalidades en 12+ meses
**Por qué importa:** Los clientes que expanden están invertidos. Los clientes que se mantienen estáticos por un año están estancados o preparándose para irse.

<ExampleCard label="La señal de expansión">
Cliente A ha estado en el plan de $99/mes por 18 meses. Sin upgrades, sin asientos adicionales, sin solicitudes de funcionalidades. **Estancado.**

Cliente B empezó en $99/mes, hizo upgrade a $199/mes en el mes 6, agregó 2 asientos en el mes 10. **Creciendo.**

El cliente B tiene 5x menos probabilidad de abandonar porque está invertido en la plataforma.
</ExampleCard>

**Cómo rastrearlo:**

- Revisión mensual: clientes en el mismo plan por 12+ meses
- Cruza con datos de uso: ¿están llegando a los límites del plan?
- Alcance proactivo: "Noté que has estado en el plan Starter por un año — ¿listo para desbloquear [funcionalidades avanzadas]?"

---

## Construyendo tu dashboard de alerta temprana

Ahora que conoces las 7 señales, necesitas un sistema para monitorearlas. Aquí está el dashboard mínimo viable para fundadores en solitario:

<TemplateBuilder
title="Tu rastreador de señales de abandono"
persistKey="retention-L3-signal-tracker"
sections={[
{
id: "signal-setup",
title: "Configuración de señales",
fields: [
{
id: "login-source",
label: "¿Dónde rastrear los logins?",
placeholder: "ej., Google Analytics, base de datos del producto, registros de autenticación",
type: "text"
},
{
id: "core-action",
label: "¿Cuál es tu acción principal?",
placeholder: "ej., proyecto creado, reporte generado, email enviado",
type: "text"
},
{
id: "email-tool",
label: "¿Qué ESP usas?",
placeholder: "ej., Brevo, ConvertKit, Mailchimp",
type: "text"
},
{
id: "billing-tool",
label: "¿Qué sistema de facturación?",
placeholder: "ej., Stripe, Mercado Pago, PayPal",
type: "text"
}
]
},
{
id: "thresholds",
title: "Tus umbrales rojos",
fields: [
{
id: "login-threshold",
label: "Umbral de caída de login",
placeholder: "ej., caída del 50% en 2 semanas",
type: "text"
},
{
id: "inactivity-days",
label: "Días de inactividad antes de intervenir",
placeholder: "ej., 10 días",
type: "number"
},
{
id: "email-threshold",
label: "Umbral de tasa de apertura de email",
placeholder: "ej., &lt;10% por 3 emails",
type: "text"
}
]
}
]}
/>

### El proceso de revisión semanal

No necesitas monitoreo en tiempo real. **Semanal es suficiente** para fundadores en solitario con &lt;200 clientes.

Aquí está la revisión semanal de 30 minutos:

1. **Extrae datos de login** (10 min): Exporta los últimos 14 días de logins, compara con los 14 días anteriores, señala caídas >50%
2. **Revisa el uso de acción principal** (5 min): Consulta clientes con cero acciones principales en 7 días
3. **Revisa el engagement con email** (5 min): Reporte del ESP de clientes con &lt;10% de tasa de apertura
4. **Escanea pagos fallidos** (5 min): Dashboard de Stripe para pagos fallidos en los últimos 7 días
5. **Prioriza intervenciones** (5 min): Ordena cuentas señaladas por valor (ARPU), elige las 3-5 principales para alcance

<InteractiveChecklist
title="Revisión semanal de señales de abandono"
persistKey="retention-L3-weekly-review"
items={[
"Extraer datos de login y señalar caídas del 50%+",
"Revisar uso de acción principal (cero acciones en 7 días)",
"Revisar engagement con email (&lt;10% de tasa de apertura)",
"Escanear pagos fallidos y estado de cobro",
"Priorizar las 3-5 cuentas principales para intervención"
]}
/>

---

## El sistema de detección de "abandonador silencioso"

Construyamos un sistema práctico para atrapar abandonadores silenciosos antes de que desaparezcan.

### Paso 1: Configura alertas automatizadas

No puedes revisar dashboards manualmente todos los días. Configura alertas que te notifiquen cuando las señales se pongan en rojo.

<SlideNavigation>
<Slide title="Alerta de Google Analytics">
**Qué:** Email cuando las sesiones de un cliente específico caen >50% semana contra semana
**Cómo:** Alerta personalizada de GA4 → configurar umbral → notificación por email
**Costo:** Gratis
</Slide>

<Slide title="Webhook de Stripe">
**Qué:** Notificación por Slack/email/WhatsApp en evento `payment_failed`
**Cómo:** Webhook de Stripe → Zapier → Slack/email/WhatsApp
**Costo:** Gratis (nivel gratuito de Zapier)
</Slide>

<Slide title="Alerta de engagement del ESP">
**Qué:** Etiquetar clientes con &lt;10% de tasa de apertura en 3 emails
**Cómo:** Automatización de Brevo/ConvertKit/Mailchimp → etiqueta → email semanal de resumen
**Costo:** Gratis (incluido en el ESP)
</Slide>
</SlideNavigation>

### Paso 2: Crea una lista de "zona roja"

Cada semana, compila una lista de clientes que activaron 2+ señales. Esta es tu cola de intervención.

<ClassifyExercise
title="Clasifica estos clientes por nivel de riesgo"
persistKey="retention-L3-risk-classify"
categories={[
{ id: "green", label: "Sano", color: "#10b981" },
{ id: "yellow", label: "En riesgo", color: "#f59e0b" },
{ id: "red", label: "Crítico", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Logins bajaron 60% en 2 semanas, tasa de apertura de email &lt;5%, sin contacto de soporte en 45 días",
correctCategory: "red",
explanation: "3 señales activadas = intervención crítica necesaria dentro de 48 horas"
},
{
id: "2",
content: "Logins estables, abrió los últimos 2 emails, envió una solicitud de funcionalidad",
correctCategory: "green",
explanation: "Comprometido y activo = sano"
},
{
id: "3",
content: "Logins bajaron 30%, tasa de apertura de email 15%, pago a tiempo",
correctCategory: "yellow",
explanation: "1 señal (caída de login) = monitorear de cerca, considerar check-in proactivo"
},
{
id: "4",
content: "Pago fallido en Día 2 de cobro, logins normales, engagement de email normal",
correctCategory: "yellow",
explanation: "Fallo de pago solo = amarillo hasta el Día 7 de cobro"
},
{
id: "5",
content: "Sin logins en 14 días, cero aperturas de email, pago fallido no recuperado",
correctCategory: "red",
explanation: "3 señales + fallo de pago = jugada de salvamento urgente necesaria"
}
]}
/>

### Paso 3: Protocolo de intervención

Una vez que hayas identificado clientes en zona roja, necesitas un protocolo de respuesta.

<DecisionTree
title="Protocolo de respuesta a señales de abandono"
persistKey="retention-L3-response-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "El cliente activó 2+ señales de abandono. ¿Cuál es su ARPU?",
choices: [
{ label: "$200+/mes (alto valor)", nextNodeId: "high-value" },
{ label: "$50-200/mes (valor medio)", nextNodeId: "mid-value" },
{ label: "&lt;$50/mes (valor bajo)", nextNodeId: "low-value" }
]
},
{
id: "high-value",
content: "Cuenta de alto valor. Se requiere alcance personal. ¿Cuál es la señal principal?",
choices: [
{ label: "Caída de login + desconexión de email", nextNodeId: "personal-call" },
{ label: "Fallo de pago", nextNodeId: "payment-outreach" },
{ label: "Pico de tickets de soporte", nextNodeId: "support-escalation" }
]
},
{
id: "mid-value",
content: "Cuenta de valor medio. Intervención por email. ¿Cuál es el contexto?",
choices: [
{ label: "Sin logins en 10+ días", nextNodeId: "reactivation-email" },
{ label: "Desconexión de email", nextNodeId: "value-reminder" },
{ label: "Fallo de pago", nextNodeId: "dunning-sequence" }
]
},
{
id: "low-value",
content: "Cuenta de valor bajo. Secuencia automatizada. ¿Cuál es la señal?",
choices: [
{ label: "Inactividad", nextNodeId: "auto-reactivation" },
{ label: "Fallo de pago", nextNodeId: "auto-dunning" }
]
},
{
id: "personal-call",
content: "Programa una llamada de 15 minutos dentro de 24 horas. Usa el guión de llamada de recuperación de la Lección 7.",
isTerminal: true,
outcome: "positive"
},
{
id: "payment-outreach",
content: "Email personal o mensaje de WhatsApp: 'Noté que tu pago falló. ¿Está todo bien? No quiero que pierdas acceso.' Incluye el enlace para actualizar el método de pago.",
isTerminal: true,
outcome: "positive"
},
{
id: "support-escalation",
content: "Revisa los tickets recientes, identifica el patrón, contáctalos: 'Vi que has tenido problemas con [asunto]. Déjame ayudarte personalmente a resolverlo.'",
isTerminal: true,
outcome: "positive"
},
{
id: "reactivation-email",
content: "Envía el Email 1 de la secuencia de reactivación (Lección 5): 'Noté que no has iniciado sesión últimamente. ¿Todo bien?'",
isTerminal: true,
outcome: "positive"
},
{
id: "value-reminder",
content: "Envía email enfocado en valor: 'Te estás perdiendo [beneficio específico]. Esto es lo nuevo desde la última vez que entraste.'",
isTerminal: true,
outcome: "positive"
},
{
id: "dunning-sequence",
content: "Activa el cobro automatizado: emails en Día 1, Día 3, Día 7 con enlace para actualizar método de pago.",
isTerminal: true,
outcome: "positive"
},
{
id: "auto-reactivation",
content: "Activa la secuencia de reactivación automatizada (3 emails en 14 días). Monitorea por respuesta.",
isTerminal: true,
outcome: "positive"
},
{
id: "auto-dunning",
content: "Secuencia de cobro automatizada. Si no hay recuperación para el Día 7, acepta el abandono natural.",
isTerminal: true,
outcome: "neutral"
}
]}
/>

---

## Recopilación de datos sin herramientas empresariales

No necesitas plataformas de CS de $500/mes. Así es como recopilas señales de abandono con herramientas que ya tienes (o puedes obtener por &lt;$50/mes):

### Rastreo de logins

**Opción 1: Google Analytics 4 (Gratis)**

- Configura rastreo de ID de usuario en GA4
- Crea un reporte personalizado: "Usuarios por ID de usuario, sesiones por semana"
- Exportación semanal → compara semana contra semana

**Opción 2: Consulta a base de datos del producto (Gratis)**

- Consulta SQL: `SELECT user_id, COUNT(*) as logins FROM sessions WHERE created_at >= NOW() - INTERVAL 7 DAY GROUP BY user_id`
- Compara con la semana anterior
- Señala caídas >50%

### Engagement con email

**Tu ESP (Gratis — incluido)**

- Brevo: Segmentos → "Abrió menos de 1 de los últimos 3 broadcasts"
- ConvertKit: Segmentos → "Abrió menos de 1 de los últimos 3 broadcasts"
- Mailchimp: Segmentos → "Puntaje de engagement de email < 2 estrellas"

### Pagos fallidos

**Stripe (Gratis — incluido)**

- Dashboard → Pagos → Fallidos
- Configura webhook para `payment_failed` → Zapier → notificación por Slack/WhatsApp
- O: revisión manual semanal

### Rastreo de acción principal

**Opción 1: Mixpanel/Amplitude (Nivel gratuito)**

- Rastrea la acción principal como evento
- Reporte semanal: usuarios con cero eventos en 7 días

**Opción 2: Consulta a base de datos (Gratis)**

- `SELECT user_id, COUNT(*) as actions FROM core_actions WHERE created_at >= NOW() - INTERVAL 7 DAY GROUP BY user_id HAVING actions = 0`

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para fundadores técnicos">
Puedes construir un dashboard simple de señales de abandono con un cron job diario que consulte tu base de datos, calcule cambios semana contra semana, y te envíe un resumen por email. Tiempo total de construcción: 2-3 horas. Cero costo continuo.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para coaches y consultores">
Tu "producto" es el programa de coaching o servicio. Rastrea: asistencia a sesiones, completación de tareas, actividad en Slack/comunidad/grupo de WhatsApp, y estado de pago. Las mismas señales, diferentes fuentes de datos.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="Para creadores">
Rastrea: frecuencia de login al curso (en Hotmart u otra plataforma), tasa de completación de lecciones, frecuencia de publicación en la comunidad, tasa de apertura de email, y estado de pago de membresía. Los creadores tienen los mismos patrones de abandono que el SaaS.
</ContextualNote>

---

## El efecto compuesto de la detección temprana

Hagamos los números de lo que vale la detección temprana de abandono.

<ScenarioSimulator
title="Calculadora de ROI de detección de abandono"
persistKey="retention-L3-roi-simulator"
levers={[
{ id: "customers", label: "Total de clientes", min: 10, max: 500, step: 10, defaultValue: 100 },
{ id: "arpu", label: "ARPU ($/mes)", min: 50, max: 500, step: 50, defaultValue: 100 },
{ id: "churnRate", label: "Abandono mensual actual (%)", min: 3, max: 10, step: 1, defaultValue: 5 },
{ id: "detectionRate", label: "% de abandonadores que detectas temprano", min: 0, max: 80, step: 10, defaultValue: 50 },
{ id: "saveRate", label: "% de abandonadores detectados que salvas", min: 20, max: 60, step: 10, defaultValue: 40 }
]}
outputs={[
{
id: "monthlyChurn",
label: "Clientes abandonando por mes",
formula: "(customers * (churnRate / 100))",
unit: "",
precision: 1
},
{
id: "detected",
label: "Abandonadores detectados temprano",
formula: "(customers * (churnRate / 100) * (detectionRate / 100))",
unit: "",
precision: 1
},
{
id: "saved",
label: "Clientes salvados",
formula: "(customers * (churnRate / 100) * (detectionRate / 100) * (saveRate / 100))",
unit: "",
precision: 1
},
{
id: "mrr",
label: "MRR salvado mensual",
formula: "(customers * (churnRate / 100) * (detectionRate / 100) * (saveRate / 100) * arpu)",
unit: "$",
precision: 0
},
{
id: "annual",
label: "Ingresos anuales salvados",
formula: "(customers * (churnRate / 100) * (detectionRate / 100) * (saveRate / 100) * arpu * 12)",
unit: "$",
precision: 0
}
]}
insight="Con `{saved}` clientes salvados por mes × $`{arpu}` ARPU × 12 meses = $`{annual}` en ingresos retenidos. Ese es el valor de tu sistema de alerta temprana."
/>

**Las matemáticas son simples:** Si detectas el 50% de los abandonadores temprano y salvas el 40% de los que detectas, estás reduciendo tu tasa efectiva de abandono en un 20%.

Para una base de 100 clientes a $100 ARPU con 5% de abandono mensual:

- Sin detección: 5 clientes abandonan/mes = $500 de MRR perdido = $6,000/año
- Con detección: 4 clientes abandonan/mes = $400 de MRR perdido = $4,800/año
- **Ahorro: $1,200/año** — suficiente para financiar todo tu stack de herramientas

Y eso es conservador. Muchos fundadores en solitario reportan 30-40% de reducción de abandono después de implementar rastreo de señales.

---

## Tu plan de acción

Ahora conoces las 7 señales de abandono, cómo rastrearlas y cómo responder. Aquí está tu plan de implementación:

<InteractiveChecklist
title="Configuración del sistema de señales de abandono"
persistKey="retention-L3-action-plan"
items={[
"Configurar rastreo de logins (GA4 o consulta a base de datos)",
"Definir tu acción principal y rastrearla como evento",
"Crear segmento en ESP para bajo engagement de email (&lt;10% de tasa de apertura)",
"Configurar webhook de Stripe para pagos fallidos",
"Construir tu plantilla de revisión semanal (proceso de 30 minutos)",
"Crear protocolo de intervención (árbol de decisión para cuentas en zona roja)",
"Programar la primera sesión de revisión semanal (agregar al calendario)",
"Hacer la primera revisión y señalar 3-5 cuentas para alcance"
]}
/>

### Vista previa de la siguiente lección

Has aprendido a detectar señales de abandono. Siguiente lección: **Benchmarks de abandono para PyMEs y metas de NRR** — cómo saber si tu tasa de abandono es "buena" o "mala", cómo calcular la Retención Neta de Ingresos, y cómo compararte con estándares de la industria.

---

## Verificación rápida de conocimiento

<SwipeDecision
title="¿Señal de abandono o falsa alarma?"
description="Desliza a la derecha si es una señal real de abandono que vale investigar, a la izquierda si es comportamiento normal"
optionA="Falsa alarma"
optionB="Señal real"
persistKey="retention-L3-signal-check"
cards={[
{
id: "1",
content: "El cliente inició sesión 8 veces la semana pasada, 7 veces esta semana",
correctOption: "a",
explanation: "Uso estable — una fluctuación menor es normal"
},
{
id: "2",
content: "El cliente inició sesión 10 veces la semana pasada, 4 esta semana, 1 la semana anterior",
correctOption: "b",
explanation: "Caída del 60% en 2 semanas — investiga"
},
{
id: "3",
content: "El cliente envió 3 tickets de soporte en un día sobre el mismo bug",
correctOption: "a",
explanation: "Frustración, pero comprometido — arregla el bug y haz seguimiento"
},
{
id: "4",
content: "El cliente no ha contactado soporte en 90 días",
correctOption: "b",
explanation: "Cero contacto por 60+ días = señal de desconexión"
},
{
id: "5",
content: "El pago del cliente falló por tarjeta vencida, actualizó la tarjeta el mismo día",
correctOption: "a",
explanation: "Fallo accidental + arreglo inmediato = no es señal de abandono"
},
{
id: "6",
content: "El pago del cliente falló, sin respuesta a 3 emails de cobro en 7 días",
correctOption: "b",
explanation: "No-pago intencional — probablemente decidió abandonar"
}
]}
/>
