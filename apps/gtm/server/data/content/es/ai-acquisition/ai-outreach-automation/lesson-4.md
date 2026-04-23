---
title: "Diseño de Secuencias Multicanal (Enfoque B2B)"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 24: AI Outreach Automation"
lesson: 4
---

## El Error de $47K

Sarah lanzó su primera secuencia multicanal en enero de 2025. Email + LinkedIn + notas de voz. Siete toques en 21 días. Estaba orgullosa de la sofisticación.

Para marzo, su cuenta de LinkedIn estaba restringida. La reputación de su dominio de email había caído. Y había quemado a sus 500 mejores prospectos con una tasa de respuesta del 2%.

El problema no eran las herramientas. Era la **arquitectura de la secuencia**.

Cometió tres errores críticos:

1. **Demasiados toques, demasiado rápido** — 7 toques en 21 días en 3 canales se sentía como hostigamiento
2. **Sin lógica de canal** — Solicitud de conexión en LinkedIn el día 1, email el día 2, nota de voz el día 5 (antes de que siquiera supieran quién era ella)
3. **Personalización genérica** — Primeras líneas generadas por IA que referenciaban "el crecimiento de tu empresa" (toda empresa crece)

¿Los $47K? Ese es el valor del pipeline de esos 500 prospectos a los que nunca podrá llegar de nuevo con credibilidad.

**Esta lección te enseña a construir secuencias que funcionen** — no solo secuencias que envíen.

<InsightCard icon="⚡" title="La Verdad Central">
El multicanal mal hecho es peor que el solo email bien hecho. Más canales = más formas de arruinarlo. Esta lección te da la arquitectura para hacerlo correctamente.
</InsightCard>

---

## Sección 1: Fundamentos de Arquitectura de Secuencias B2B

La mayoría de los founders piensa "más toques = más respuestas." Eso solo es verdad hasta cierto punto.

Los datos de 2025-2026 muestran un patrón claro:

<FlipCard 
  front="El Punto Óptimo de 5-7 Toques" 
  back="El 80% de las respuestas B2B vienen de los toques 2-5. El toque 1 obtiene ~30%, el toque 2 ~25%, los toques 3-5 ~25% combinados. Más allá del toque 7, estás agregando &lt;5% de respuestas incrementales mientras aumentas el riesgo de molestia." 
/>

### Los Tres Arquetipos de Secuencias

<SlideNavigation>
<Slide title="Solo Email (5 toques, 21 días)">

**Ideal para:**

- Tickets bajos a medios ($1K-5K de ACV)
- Outreach de alto volumen (500+ prospectos/mes)
- Founders solos con presupuesto ajustado (&lt;$50/mes en herramientas)

**Estructura:**

- Día 1: Apertura personalizada enfocada en el problema
- Día 4: Ángulo diferente sobre el mismo problema + mini caso de estudio
- Día 8: Valor añadido (recurso, insight, datos)
- Día 14: Prueba social + CTA directo
- Día 21: Despedida cálida

**Rendimiento esperado:**

- 12-21% de tasa de respuesta acumulada
- 3-5% de conversión a reunión
- Costo: $37/mes (Instantly Growth)

</Slide>

<Slide title="Email + LinkedIn (7 toques, 28 días)">

**Ideal para:**

- Tickets medios ($5K-15K de ACV)
- Industrias activas en LinkedIn (SaaS, consultoría, agencias)
- Ventas basadas en relaciones

**Estructura:**

- Día 1: Vista de perfil en LinkedIn
- Día 2: Email #1 (apertura personalizada)
- Día 4: Solicitud de conexión en LinkedIn
- Día 7: Email #2 (ángulo diferente)
- Día 12: Mensaje de LinkedIn (si conectado) O Email #3
- Día 18: Email con valor añadido + prueba social
- Día 25: Despedida cálida

**Rendimiento esperado:**

- 15-25% de tasa de respuesta acumulada
- 5-8% de conversión a reunión
- Costo: $97-116/mes (Instantly + HeyReach O Lemlist Multichannel)

</Slide>

<Slide title="Multicanal Completo (10 toques, 35 días)">

**Ideal para:**

- Alto ticket ($15K+ de ACV)
- Ventas complejas (múltiples interesados)
- Solo prospectos de Nivel A (top 20%)

**Estructura:**

- Día 1: Vista de perfil en LinkedIn
- Día 2: Email #1 (basado en investigación)
- Día 4: Solicitud de conexión en LinkedIn
- Día 7: Mensaje de LinkedIn (si conectado)
- Día 9: Email #2 (ángulo diferente)
- Día 14: Nota de voz (Loom/BombBomb)
- Día 18: Email #3 (caso de estudio)
- Día 23: Comentario en publicación de LinkedIn
- Día 28: Email #4 (prueba social)
- Día 35: Despedida cálida

**Rendimiento esperado:**

- 20-35% de tasa de respuesta acumulada
- 10-15% de conversión a reunión
- Costo: $150-200/mes (Lemlist + Loom + HeyReach)

</Slide>
</SlideNavigation>

<RangeSlider 
  label="¿Cuál es tu tamaño promedio de contrato (ACV)?" 
  min={500} 
  max={50000} 
  step={500}
  lowLabel="$500" 
  highLabel="$50K+" 
  persistKey="ai-outreach-automation-L4-acv" 
/>

<ContextualNote showWhen={{ acv: { min: 0, max: 5000 } }} variant="personalized" title="Para Tu Tamaño de Contrato">
Quédate con **Solo Email (5 toques)**. El multicanal agrega costo y complejidad sin ROI proporcional a este ACV. Domina el email primero, luego experimenta con LinkedIn para el Nivel A únicamente.
</ContextualNote>

<ContextualNote showWhen={{ acv: { min: 5001, max: 15000 } }} variant="personalized" title="Para Tu Tamaño de Contrato">
**Email + LinkedIn (7 toques)** es tu punto óptimo. El aumento del 20-30% en la tasa de respuesta de LinkedIn justifica el costo incremental de $60-80/mes. Usa Lemlist Multichannel ($99/mes) o Instantly + HeyReach ($116/mes).
</ContextualNote>

<ContextualNote showWhen={{ acv: { min: 15001, max: 100000 } }} variant="personalized" title="Para Tu Tamaño de Contrato">
**Multicanal Completo (10 toques)** tiene sentido para prospectos de Nivel A. Pero no lo uses para todos — segmenta tu lista. El top 20% recibe el tratamiento completo, el 50% del medio recibe Email + LinkedIn, el 30% restante recibe solo email o se descalifica.
</ContextualNote>

---

## Sección 2: El Principio de Rotación de Ángulos

Aquí es donde la mayoría de las secuencias fallan: **cada email dice lo mismo con palabras diferentes**.

Secuencia mala:

- Email 1: "Ayudamos a empresas como la tuya a crecer en ingresos"
- Email 2: "Seguimiento de mi último email sobre el crecimiento de ingresos"
- Email 3: "¿Sigues interesado en crecer en ingresos?"

Esto es **repetición**, no **rotación**.

<FlipCard 
  front="El Principio de Rotación de Ángulos" 
  back="Cada toque debe abordar el MISMO problema desde un ÁNGULO DIFERENTE. Problema → Evidencia → Insight → Prueba → Salida. Nunca repitas el mismo ángulo dos veces." 
/>

### El Marco de 5 Ángulos

<TemplateBuilder
title="Construye Tu Secuencia de 5 Ángulos"
persistKey="ai-outreach-automation-L4-angles"
sections={[
{
id: "angle1",
title: "Ángulo 1: Declaración del Problema (Día 1)",
fields: [
{
id: "problem",
label: "¿Qué problema específico enfrenta tu ICP?",
placeholder: "ej., Ingreso manual de datos consumiendo 10+ horas/semana",
type: "textarea"
},
{
id: "impact",
label: "¿Cuál es el impacto medible de este problema?",
placeholder: "ej., Cuesta $2K+/mes en mano de obra, retrasa los reportes 5 días",
type: "text"
}
]
},
{
id: "angle2",
title: "Ángulo 2: Evidencia de la Solución (Día 4)",
fields: [
{
id: "evidence",
label: "¿Qué prueba tienes de que tu solución funciona?",
placeholder: "ej., 3 empresas similares redujeron el ingreso de datos en un 80%",
type: "textarea"
},
{
id: "metric",
label: "¿Cuál es la métrica clave?",
placeholder: "ej., 10 horas → 2 horas por semana",
type: "text"
}
]
},
{
id: "angle3",
title: "Ángulo 3: Insight de la Industria (Día 8)",
fields: [
{
id: "insight",
label: "¿Qué tendencia de la industria o punto de datos es relevante?",
placeholder: "ej., El 67% de las agencias aún usa hojas de cálculo para reportes de clientes",
type: "textarea"
},
{
id: "resource",
label: "¿Qué recurso puedes compartir?",
placeholder: "ej., Enlace a informe de benchmark, plantilla o herramienta",
type: "text"
}
]
},
{
id: "angle4",
title: "Ángulo 4: Prueba Social (Día 14)",
fields: [
{
id: "testimonial",
label: "¿Cuál es un resultado específico de un cliente?",
placeholder: "ej., 'Ahorramos 12 horas/semana y a nuestros clientes les encantan los nuevos dashboards' — Sarah, VP de Ops",
type: "textarea"
},
{
id: "cta",
label: "¿Cuál es el CTA directo?",
placeholder: "ej., Demo de 15 minutos, enviarte un reporte de muestra, auditoría gratuita",
type: "text"
}
]
},
{
id: "angle5",
title: "Ángulo 5: Despedida Cálida (Día 21)",
fields: [
{
id: "exit",
label: "¿Cómo cierras el ciclo sin quemar puentes?",
placeholder: "ej., 'Entiendo perfectamente si ahora no es el momento. ¿Puedo contactarte de nuevo en Q3?'",
type: "textarea"
}
]
}
]}
/>

<ExampleCard label="Ejemplo Real: Rotación de Ángulos Bien Hecha">

**Empresa:** DataPulse (reportes automatizados para agencias)  
**ICP:** Agencias de marketing, 10-50 empleados, reportes manuales de clientes

**Email 1 (Día 1) — Problema:**

> Hola `{first_name}`,
>
> Noté que tu equipo publica reportes mensuales de clientes en LinkedIn — parece mucho trabajo manual extrayendo datos de 5+ plataformas.
>
> La mayoría de las agencias con las que trabajamos estaban gastando 10-15 horas/mes en esto antes de automatizarlo. ¿Te suena familiar?

**Email 2 (Día 4) — Evidencia:**

> Hola `{first_name}`,
>
> Seguimiento rápido: ayudamos a 3 agencias similares a la tuya (10-20 clientes, reportes multi-plataforma) a reducir el tiempo de reportes de 12 horas a 2 horas por mes.
>
> La clave fue automatizar la extracción de datos + la generación de plantillas. Puedo mostrarte cómo funciona — ¿15 minutos?

**Email 3 (Día 8) — Insight:**

> Hola `{first_name}`,
>
> Vi esta estadística y pensé en ti: el 67% de las agencias sigue usando hojas de cálculo para reportes de clientes (Informe de Benchmark de Agencias 2025).
>
> Construimos una plantilla gratuita que extrae datos de GA4 + Meta + LinkedIn en un solo dashboard. ¿Quieres que te la envíe? Sin compromisos.

**Email 4 (Día 14) — Prueba:**

> Hola `{first_name}`,
>
> Una cosa más: Sarah en BrightPath Agency (tamaño similar al tuyo) dijo esto después de cambiar:
>
> _"Ahorramos 12 horas/semana y a nuestros clientes les encantan los nuevos dashboards. Ojalá lo hubiéramos hecho hace un año."_
>
> Si tienes curiosidad, puedo enviarte un reporte de muestra que construiríamos para tu cliente principal. Me lleva 10 minutos.

**Email 5 (Día 21) — Salida:**

> Hola `{first_name}`,
>
> Sé que estás ocupado, así que voy a dejar de llenar tu bandeja de entrada. Si la automatización de reportes no es una prioridad ahora mismo, lo entiendo perfectamente.
>
> ¿Puedo contactarte de nuevo en Q3? Las cosas generalmente cambian después de la planificación de mitad de año.

</ExampleCard>

<InsightCard icon="🎯" title="Por Qué Esto Funciona">
Cada email da una NUEVA razón para responder. Email 1: "Sí, gastamos demasiado tiempo en esto." Email 2: "Muéstrame la prueba." Email 3: "Quiero la plantilla gratuita." Email 4: "Quiero ver una muestra." Email 5: "En realidad, hablemos antes de que te vayas."
</InsightCard>

---

## Sección 3: Timing y Lógica del Canal

Agregar LinkedIn a tu secuencia no es solo "enviar un email, luego enviar un mensaje de LinkedIn." Hay una **lógica** de cuándo y por qué usar cada canal.

<FlipCard 
  front="La Jerarquía del Canal" 
  back="Vista de LinkedIn (señal pasiva) → Email (propuesta principal) → Conexión en LinkedIn (solicitud de relación) → Mensaje de LinkedIn (si conectado) O Seguimiento por Email (si no). Nunca inviertas este orden." 
/>

### El Árbol de Decisión Multicanal

<DecisionTree
title="¿Deberías Agregar Este Toque de LinkedIn?"
persistKey="ai-outreach-automation-L4-linkedin-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "Estás construyendo una secuencia. ¿Deberías agregar toques de LinkedIn?",
choices: [
{ label: "Mi ICP está activo en LinkedIn (publica 1x/semana+)", nextNodeId: "active" },
{ label: "Mi ICP rara vez usa LinkedIn", nextNodeId: "skip" }
]
},
{
id: "active",
content: "Bien. ¿Estás dispuesto a gastar $79-99/mes en automatización de LinkedIn (HeyReach o Lemlist)?",
choices: [
{ label: "Sí, el presupuesto lo permite", nextNodeId: "budget-yes" },
{ label: "No, necesito mantenerme bajo $50/mes", nextNodeId: "budget-no" }
]
},
{
id: "skip",
content: "Quédate con solo email. LinkedIn no añadirá un aumento significativo si tu ICP no interactúa allí.",
isTerminal: true,
outcome: "neutral"
},
{
id: "budget-yes",
content: "Perfecto. Usa esta secuencia: Día 1 vista de LinkedIn → Día 2 Email → Día 4 conexión de LinkedIn → Día 7 seguimiento por Email → Día 12 mensaje de LinkedIn (si conectado).",
isTerminal: true,
outcome: "positive"
},
{
id: "budget-no",
content: "Haz toques manuales de LinkedIn solo para el Nivel A (top 20%). Ve su perfil antes de enviar el Email 1. Conecta después del Email 2 si no responden. El resto solo con email.",
isTerminal: true,
outcome: "positive"
}
]}
/>

### La Regla de Espaciado 3-4-5

<FlipCard 
  front="La Regla de Espaciado 3-4-5" 
  back="Toques tempranos: 3 días de separación (urgencia). Toques del medio: 4 días de separación (persistencia). Toques tardíos: 5-7 días de separación (respeto). Nunca envíes 2 emails en 48 horas a menos que hayan respondido." 
/>

Por qué importa el espaciado:

**Demasiado rápido (cada 2 días):**

- Se siente agresivo
- Activa filtros de spam (alta frecuencia de envío desde dominio nuevo)
- No les da tiempo para procesar

**Demasiado lento (cada 7+ días):**

- Olvidan quién eres
- Pierde impulso
- Tarda 6+ semanas en completar una secuencia de 5 toques

**Lo justo (patrón 3-4-5):**

- Equilibra urgencia y respeto
- Se mantiene en la mente sin hostigamiento
- Se completa en 21-28 días (ciclo B2B óptimo)

<ScenarioSimulator
title="Calculadora de Timing de Secuencias"
persistKey="ai-outreach-automation-L4-timing"
levers={[
{ id: "touches", label: "Número de toques", min: 3, max: 10, step: 1, defaultValue: 5 },
{ id: "spacing", label: "Días promedio entre toques", min: 2, max: 7, step: 1, defaultValue: 4 }
]}
outputs={[
{
id: "duration",
label: "Duración total de la secuencia",
formula: "(touches - 1) * spacing",
unit: " días",
precision: 0
},
{
id: "emails-per-month",
label: "Emails enviados por prospecto por mes",
formula: "Math.round((30 / ((touches - 1) * spacing)) * touches * 10) / 10",
unit: "",
precision: 1
}
]}
insight="Con `{duration}` días en total, completarás la secuencia en {Math.round(duration / 7)} semanas. Si envías a 100 prospectos/mes, eso son {Math.round(touches \* 100)} emails totales en todas las secuencias."
/>

---

## Sección 4: Puntos de Integración con LinkedIn

Seamos específicos sobre **cuándo** y **cómo** usar LinkedIn en tu secuencia.

### Los 4 Tipos de Toque en LinkedIn

<SlideNavigation>
<Slide title="1. Vista de Perfil (Señal Pasiva)">

**Cuándo:** Día 1, antes del primer email  
**Propósito:** Activar una notificación, crear familiaridad  
**Riesgo:** Bajo (ver perfiles es comportamiento normal)  
**Herramienta:** HeyReach, Lemlist, o manual

**Cómo funciona:**

- Reciben una notificación: "`{Tu Nombre}` vio tu perfil"
- El 30-40% verá tu perfil de vuelta
- Cuando vean tu email al día siguiente, no serás un completo extraño

**Mejor práctica:**

- Ve su perfil 12-24 horas antes de enviar el Email 1
- No veas el perfil varias veces (parece acoso)
- Asegúrate de que tu perfil de LinkedIn esté optimizado (titular claro, foto profesional)

</Slide>

<Slide title="2. Solicitud de Conexión (Solicitud de Relación)">

**Cuándo:** Día 4, después de enviar el Email 1  
**Propósito:** Construir relación, desbloquear mensajería  
**Riesgo:** Medio (puede ser ignorada o rechazada)  
**Herramienta:** HeyReach, Lemlist, o manual

**Cómo funciona:**

- Envía una nota de conexión personalizada (máximo 300 caracteres)
- Tasa de aceptación del 25-35% para solicitudes en frío
- Si la aceptan, ahora puedes enviar mensajes de LinkedIn

**Mejor práctica:**

- Referencia algo específico: "Vi tu publicación sobre [tema]" o "Ambos estamos en [industria]"
- No hagas pitch en la nota de conexión
- Si no aceptan en 7 días, continúa solo con email

**Nota de conexión de ejemplo:**

> Hola `{first_name}`, estoy contactando a líderes de agencias de marketing sobre automatización de reportes. Me encantaría conectar y compartir algunos insights de nuestro trabajo con equipos similares.

</Slide>

<Slide title="3. Mensaje de LinkedIn (Propuesta Directa)">

**Cuándo:** Día 12, si aceptaron tu solicitud de conexión  
**Propósito:** Canal diferente, misma conversación  
**Riesgo:** Medio (puede ser ignorado, reportado como spam)  
**Herramienta:** HeyReach, Lemlist, o manual

**Cómo funciona:**

- Solo envía si aceptaron tu conexión
- Sé breve (máximo 3-4 oraciones)
- Referencia tu conversación por email: "Te envié un email la semana pasada sobre..."

**Mejor práctica:**

- No repitas tu email textualmente
- Usa un ángulo diferente (si el Email 2 fue evidencia, el mensaje de LinkedIn podría ser insight)
- Incluye un CTA suave: "Tengo curiosidad por escuchar tus pensamientos"

**Mensaje de LinkedIn de ejemplo:**

> Hola `{first_name}`, ¡gracias por conectar! Te envié un email la semana pasada sobre la automatización de reportes de clientes. Pensé que esto podría ser relevante: acabamos de publicar un informe de benchmark que muestra que el 67% de las agencias aún usa procesos manuales. ¿Quieres que te lo envíe?

</Slide>

<Slide title="4. Interacción con Publicación (Señal Social)">

**Cuándo:** Días 18-23, si están activos en LinkedIn  
**Propósito:** Mantenerse visible, mostrar interés genuino  
**Riesgo:** Bajo (la interacción es normal)  
**Herramienta:** Solo manual (no automatices likes/comentarios)

**Cómo funciona:**

- Encuentra una publicación reciente que hayan publicado
- Deja un comentario reflexivo (2-3 oraciones)
- No hagas pitch, solo aporta valor

**Mejor práctica:**

- Solo hazlo si publican regularmente (1x/semana+)
- El comentario debe tener valor por sí solo (valioso incluso si no te conocen)
- No los etiquetes en tu propia publicación (demasiado agresivo)

**Comentario de ejemplo:**

> Excelente punto sobre el cambio a datos de primera parte. Vemos la misma tendencia con nuestros clientes de agencias — los que invirtieron pronto en infraestructura de datos propios están muy por delante ahora. ¿Cómo estás pensando en la atribución en este nuevo modelo?

</Slide>
</SlideNavigation>

<ClassifyExercise
title="Clasifica Estos Toques de LinkedIn"
persistKey="ai-outreach-automation-L4-classify"
categories={[
{ id: "good", label: "Buena Práctica", color: "#10b981" },
{ id: "risky", label: "Arriesgado", color: "#f59e0b" },
{ id: "bad", label: "Mala Práctica", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Ver su perfil el Día 1, enviar email el Día 2",
correctCategory: "good",
explanation: "Timing perfecto. La vista crea familiaridad antes de que llegue el email."
},
{
id: "2",
content: "Enviar solicitud de conexión con un pitch en la nota",
correctCategory: "bad",
explanation: "Nunca hagas pitch en la nota de conexión. Es la forma más rápida de ser ignorado o reportado."
},
{
id: "3",
content: "Enviar mensaje de LinkedIn a alguien que no aceptó tu conexión",
correctCategory: "bad",
explanation: "No puedes enviar mensajes a no-conexiones a menos que tengas créditos de InMail. E incluso así, es agresivo."
},
{
id: "4",
content: "Comentar en su publicación sin mencionar tu producto",
correctCategory: "good",
explanation: "La interacción genuina construye familiaridad. Solo no hagas pitch en el comentario."
},
{
id: "5",
content: "Ver su perfil 5 veces en una semana",
correctCategory: "bad",
explanation: "Parece acoso. Una vista es suficiente."
},
{
id: "6",
content: "Enviar mensaje de LinkedIn el Día 12 si aceptaron la conexión el Día 5",
correctCategory: "good",
explanation: "Buen timing. Les has dado una semana para ver tus emails, ahora estás agregando un toque de LinkedIn."
},
{
id: "7",
content: "Usar HeyReach para dar like automáticamente a sus últimas 10 publicaciones",
correctCategory: "risky",
explanation: "La interacción automatizada puede activar la detección de spam de LinkedIn. Hazlo manualmente para el Nivel A únicamente."
},
{
id: "8",
content: "Enviar solicitud de conexión el Día 1, antes de cualquier email",
correctCategory: "risky",
explanation: "No está mal, pero es mejor enviar el email primero para que sepan quién eres cuando llegue la solicitud de conexión."
}
]}
/>

---

## Sección 5: El Marco de Salida Cálida

La mayoría de los founders arruinan el último email. O bien:

1. **Desaparecen** — Simplemente dejan de enviar emails (deja un mal sabor)
2. **Culpabilizan** — "Supongo que no estás interesado..." (pasivo-agresivo)
3. **Suplican** — "Por favor dame solo 5 minutos..." (desesperado)

Ninguno de estos funciona.

<FlipCard 
  front="El Marco de Salida Cálida" 
  back="Reconocer que pueden no estar interesados → Dejar la puerta abierta → Ofrecer reconectar más adelante → Sin culpa, sin presión. El 10-20% de los emails de despedida obtienen respuestas." 
/>

### El Email de Despedida de 4 Partes

<TemplateBuilder
title="Construye Tu Email de Salida Cálida"
persistKey="ai-outreach-automation-L4-breakup"
sections={[
{
id: "acknowledge",
title: "Parte 1: Reconocer",
fields: [
{
id: "acknowledge-text",
label: "Reconoce que pueden no estar interesados (sin culpa)",
placeholder: "ej., Sé que estás ocupado, así que voy a dejar de llenar tu bandeja de entrada.",
type: "textarea"
}
]
},
{
id: "door-open",
title: "Parte 2: Dejar la Puerta Abierta",
fields: [
{
id: "door-text",
label: "Deja en claro que pueden responder en cualquier momento",
placeholder: "ej., Si la automatización de reportes se vuelve una prioridad más adelante, no dudes en contactarme.",
type: "textarea"
}
]
},
{
id: "reconnect",
title: "Parte 3: Ofrecer Reconectar",
fields: [
{
id: "reconnect-text",
label: "Sugiere un punto de contacto futuro (3-6 meses)",
placeholder: "ej., ¿Puedo contactarte de nuevo en Q3? Las cosas generalmente cambian después de la planificación de mitad de año.",
type: "textarea"
}
]
},
{
id: "value-add",
title: "Parte 4: Valor Añadido Opcional",
fields: [
{
id: "value-text",
label: "Ofrece algo útil sin condiciones (opcional)",
placeholder: "ej., Mientras tanto, aquí está esa plantilla gratuita que mencioné — podría ahorrarte unas horas.",
type: "textarea"
}
]
}
]}
/>

<ExampleCard label="Email de Despedida Real que Obtuvo una Respuesta">

**Asunto:** Cerrando el ciclo

> Hola Sarah,
>
> Sé que estás ocupada, así que voy a dejar de llenar tu bandeja de entrada.
>
> Si la automatización de reportes no es una prioridad ahora mismo, lo entiendo perfectamente. La mayoría de las agencias con las que trabajamos esperaron 6-12 meses antes de hacer el cambio.
>
> ¿Puedo contactarte de nuevo en Q3? Las cosas generalmente cambian después de la planificación de mitad de año.
>
> Mientras tanto, aquí está esa plantilla gratuita de GA4 + Meta que mencioné — podría ahorrarte unas horas incluso si no usas nuestra herramienta.
>
> [Enlace a la plantilla]
>
> Saludos,  
> Alex

**Resultado:** Sarah respondió 3 días después: "En realidad, hablemos. Acabamos de perder un cliente por un error de reporte y ya estoy harta de los procesos manuales."

</ExampleCard>

<InsightCard icon="💡" title="Por Qué Funcionan los Emails de Despedida">
Activan el FOMO ("Esta es mi última oportunidad") + eliminan la presión ("Sin culpa si ignoro esto") + demuestran respeto ("No están desesperados"). El 10-20% de los emails de despedida obtienen respuestas, frecuentemente de personas que estaban interesadas pero ocupadas.
</InsightCard>

---

## Sección 6: Variantes de Secuencia por Tamaño de Contrato

No todas las secuencias deberían tener la misma longitud. Tu ACV determina cuánto esfuerzo está justificado.

<StrategyDuel
title="Secuencias de 5 Toques vs. 10 Toques"
persistKey="ai-outreach-automation-L4-duel"
scenario="Estás decidiendo cuántos toques incluir en tu secuencia. Tu ACV es de $8K."
strategyA={{
    name: "5 Toques Solo Email",
    description: "Simple, rápido, escalable. 21 días, solo email, personalización con IA.",
    pros: ["Menor costo ($37/mes)", "Más rápido de construir", "Puede manejar 500+ prospectos/mes"],
    cons: ["Tasa de respuesta más baja (12-15%)", "Pierde prospectos activos en LinkedIn"]
  }}
strategyB={{
    name: "10 Toques Multicanal",
    description: "Email + LinkedIn + notas de voz. 35 días, personalización manual para el Nivel A.",
    pros: ["Tasa de respuesta más alta (20-30%)", "Mejor para ventas de relaciones"],
    cons: ["Mayor costo ($150/mes)", "Más lento (máximo 200 prospectos/mes)", "Más complejo"]
  }}
expertVerdict="Con $8K de ACV, ve con **7 Toques Email + LinkedIn** (la opción intermedia). 5 toques deja dinero sobre la mesa, 10 toques es excesivo. Usa Lemlist Multichannel ($99/mes) o Instantly + HeyReach ($116/mes). Guarda la secuencia de 10 toques para contratos de $15K+."
/>

### La Matriz ACV-a-Secuencia

| ACV     | Toques Recomendados | Canales                | Duración | Personalización      | Costo de Herramientas |
| ------- | ------------------- | ---------------------- | -------- | -------------------- | --------------------- |
| &lt;$1K | 3-4                 | Solo email             | 14 días  | Plantilla + segmento | $37/mes               |
| $1-5K   | 5                   | Solo email             | 21 días  | Primera línea con IA | $37/mes               |
| $5-15K  | 7                   | Email + LinkedIn       | 28 días  | Investigación con IA | $99-116/mes           |
| $15K+   | 10                  | Email + LinkedIn + voz | 35 días  | IA + manual Nivel A  | $150-200/mes          |

<RangeSlider 
  label="Refina: ¿Cuál es tu tamaño promedio de contrato?" 
  min={500} 
  max={50000} 
  step={500}
  lowLabel="$500" 
  highLabel="$50K+" 
  persistKey="ai-outreach-automation-L4-acv-refine" 
/>

---

## Sección 7: Construye Tu Primera Secuencia Multicanal

Es hora de poner todo junto. Vas a construir una secuencia completa usando los marcos de esta lección.

<TemplateBuilder
title="Tu Blueprint de Secuencia Multicanal"
persistKey="ai-outreach-automation-L4-sequence"
sections={[
{
id: "basics",
title: "Básicos de la Secuencia",
fields: [
{
id: "name",
label: "Nombre de la secuencia",
placeholder: "ej., Agencias Automatización de Reportes - Q2 2026",
type: "text"
},
{
id: "icp",
label: "ICP objetivo",
placeholder: "ej., Agencias de marketing, 10-50 empleados, reportes manuales de clientes",
type: "textarea"
},
{
id: "acv",
label: "Tamaño promedio del contrato",
placeholder: "ej., $8,000",
type: "text"
},
{
id: "touches",
label: "Número de toques",
placeholder: "ej., 7",
type: "text"
},
{
id: "channels",
label: "Canales utilizados",
placeholder: "ej., Email + LinkedIn",
type: "text"
}
]
},
{
id: "touch1",
title: "Toque 1: Vista de Perfil en LinkedIn (Día 1)",
fields: [
{
id: "t1-action",
label: "Acción",
placeholder: "Ver su perfil de LinkedIn",
type: "text"
},
{
id: "t1-purpose",
label: "Propósito",
placeholder: "Crear familiaridad antes del email",
type: "text"
}
]
},
{
id: "touch2",
title: "Toque 2: Email #1 (Día 2)",
fields: [
{
id: "t2-subject",
label: "Línea de asunto",
placeholder: "ej., Tus reportes mensuales de clientes",
type: "text"
},
{
id: "t2-angle",
label: "Ángulo",
placeholder: "ej., Declaración del problema",
type: "text"
},
{
id: "t2-body",
label: "Cuerpo del email (primer borrador)",
placeholder: "Escribe tu email aquí...",
type: "textarea"
}
]
},
{
id: "touch3",
title: "Toque 3: Solicitud de Conexión en LinkedIn (Día 4)",
fields: [
{
id: "t3-note",
label: "Nota de conexión (máximo 300 caracteres)",
placeholder: "ej., Hola `{first_name}`, estoy contactando a líderes de agencias sobre automatización de reportes. Me encantaría conectar.",
type: "textarea"
}
]
},
{
id: "touch4",
title: "Toque 4: Email #2 (Día 7)",
fields: [
{
id: "t4-subject",
label: "Línea de asunto",
placeholder: "ej., Re: Tus reportes mensuales de clientes",
type: "text"
},
{
id: "t4-angle",
label: "Ángulo",
placeholder: "ej., Evidencia de la solución",
type: "text"
},
{
id: "t4-body",
label: "Cuerpo del email",
placeholder: "Escribe tu email aquí...",
type: "textarea"
}
]
},
{
id: "touch5",
title: "Toque 5: Mensaje de LinkedIn O Email #3 (Día 12)",
fields: [
{
id: "t5-channel",
label: "Canal (LinkedIn si conectado, Email si no)",
placeholder: "ej., Mensaje de LinkedIn",
type: "text"
},
{
id: "t5-angle",
label: "Ángulo",
placeholder: "ej., Insight de la industria",
type: "text"
},
{
id: "t5-body",
label: "Cuerpo del mensaje",
placeholder: "Escribe tu mensaje aquí...",
type: "textarea"
}
]
},
{
id: "touch6",
title: "Toque 6: Email #4 (Día 18)",
fields: [
{
id: "t6-subject",
label: "Línea de asunto",
placeholder: "ej., Cómo BrightPath Agency ahorró 12 horas/semana",
type: "text"
},
{
id: "t6-angle",
label: "Ángulo",
placeholder: "ej., Prueba social",
type: "text"
},
{
id: "t6-body",
label: "Cuerpo del email",
placeholder: "Escribe tu email aquí...",
type: "textarea"
}
]
},
{
id: "touch7",
title: "Toque 7: Email de Despedida Cálida (Día 25)",
fields: [
{
id: "t7-subject",
label: "Línea de asunto",
placeholder: "ej., Cerrando el ciclo",
type: "text"
},
{
id: "t7-body",
label: "Cuerpo del email (usa el Marco de Salida Cálida)",
placeholder: "Escribe tu email de despedida aquí...",
type: "textarea"
}
]
}
]}
/>

<InsightCard icon="🎯" title="Próximo Paso">
Una vez que hayas completado este blueprint, lo configurarás en tu herramienta de outreach (Instantly, Lemlist o HeyReach) en la próxima lección. Por ahora, enfócate en tener la **arquitectura** correcta: timing, ángulos y lógica de canal.
</InsightCard>

---

## Sección 8: Errores Comunes en Secuencias (Y Cómo Evitarlos)

Veamos los errores que hunden las secuencias — y cómo solucionarlos.

<SwipeDecision
title="¿Buena Secuencia o Mala Secuencia?"
description="Desliza a la derecha para secuencias bien diseñadas, a la izquierda para las defectuosas"
optionA="Defectuosa"
optionB="Bien Diseñada"
persistKey="ai-outreach-automation-L4-swipe"
cards={[
{
id: "1",
content: "7 toques en 14 días (cada 2 días)",
correctOption: "a",
explanation: "Demasiado rápido. Se siente agresivo y no da a los prospectos tiempo para procesar. Usa el espaciado 3-4-5 en su lugar."
},
{
id: "2",
content: "5 toques en 21 días (Días 1, 4, 8, 14, 21)",
correctOption: "b",
explanation: "Espaciado perfecto. Equilibra urgencia y respeto."
},
{
id: "3",
content: "Cada email dice 'siguiendo mi último email'",
correctOption: "a",
explanation: "Sin rotación de ángulos. Cada email debe abordar el problema desde un ángulo diferente, no solo repetir la solicitud."
},
{
id: "4",
content: "Solicitud de conexión de LinkedIn el Día 1, email el Día 2",
correctOption: "a",
explanation: "Al revés. Email primero, luego LinkedIn. Necesitan saber quién eres antes de que llegue la solicitud de conexión."
},
{
id: "5",
content: "Vista de LinkedIn el Día 1, email el Día 2, conexión de LinkedIn el Día 4",
correctOption: "b",
explanation: "Integración perfecta de LinkedIn. Vista → Email → Conectar es la secuencia correcta."
},
{
id: "6",
content: "Email final: 'Supongo que no estás interesado...'",
correctOption: "a",
explanation: "Despedida pasivo-agresiva. Usa el Marco de Salida Cálida en su lugar: reconocer, dejar la puerta abierta, ofrecer reconectar."
},
{
id: "7",
content: "10 toques para un producto de $2K de ACV",
correctOption: "a",
explanation: "Excesivo. 10 toques son para contratos de $15K+. Usa 5 toques para $2K de ACV."
},
{
id: "8",
content: "5 toques para un producto de $20K de ACV",
correctOption: "a",
explanation: "Dejando dinero sobre la mesa. Los contratos de $20K justifican 10 toques con personalización manual para el Nivel A."
},
{
id: "9",
content: "Email 1: Problema. Email 2: Evidencia. Email 3: Insight. Email 4: Prueba. Email 5: Despedida.",
correctOption: "b",
explanation: "Rotación de ángulos perfecta. Cada email aborda el mismo problema desde un ángulo diferente."
},
{
id: "10",
content: "El email de despedida ofrece un recurso gratuito sin condiciones",
correctOption: "b",
explanation: "Excelente salida cálida. Deja la puerta abierta y aporta valor incluso si no compran."
}
]}
/>

---

## Resumen y Pasos de Acción

Ya tienes la arquitectura para secuencias multicanal que funcionan. Esto es lo que aprendiste:

1. **El Punto Óptimo de 5-7 Toques** — El 80% de las respuestas vienen de los toques 2-5; más allá de 7 toques hay rendimientos decrecientes
2. **El Principio de Rotación de Ángulos** — Cada email debe abordar el mismo problema desde un ángulo diferente (Problema → Evidencia → Insight → Prueba → Salida)
3. **La Regla de Espaciado 3-4-5** — Toques tempranos: 3 días. Medios: 4 días. Tardíos: 5-7 días.
4. **Lógica de Integración de LinkedIn** — Vista → Email → Conectar → Mensaje (si conectado). Nunca inviertas este orden.
5. **El Marco de Salida Cálida** — Reconocer → Dejar la puerta abierta → Ofrecer reconectar → Valor añadido opcional
6. **Matriz ACV-a-Secuencia** — Bajo ticket: 5 toques. Ticket medio: 7 toques. Alto ticket: 10 toques.

<InteractiveChecklist
title="Tus Pasos de Acción"
persistKey="ai-outreach-automation-L4-actions"
items={[
"Completa el Blueprint de Secuencia Multicanal de arriba (los 7 toques)",
"Revisa tu secuencia contra la Regla de Espaciado 3-4-5 — ajusta el timing si es necesario",
"Verifica que cada email use un ángulo diferente (sin repetición)",
"Confirma que los toques de LinkedIn siguen el orden correcto (Vista → Email → Conectar → Mensaje)",
"Escribe tu email de Salida Cálida usando el marco de 4 partes",
"Calcula el costo total de la secuencia basado en las herramientas elegidas y el ACV",
"Identifica tus prospectos de Nivel A (top 20%) que recibirán la secuencia completa",
"Programa un recordatorio para construir esta secuencia en tu herramienta de outreach (próxima lección)"
]}
/>

---

## Mini-Quiz: Pon a Prueba Tus Habilidades de Diseño de Secuencias

<details>
<summary><strong>Pregunta 1:</strong> Estás construyendo una secuencia para un producto de $6K de ACV. ¿Cuántos toques deberías incluir?</summary>

**Respuesta:** 5-7 toques. Con $6K de ACV, estás en el rango de ticket medio. 5 toques (solo email) es el mínimo, pero 7 toques (email + LinkedIn) te darán tasas de respuesta 20-30% más altas y justifican el costo incremental.

**¿Por qué no 3-4 toques?** Estarías dejando dinero sobre la mesa. Los contratos de ticket medio justifican más esfuerzo.

**¿Por qué no 10 toques?** Excesivo para $6K. Guarda las secuencias de 10 toques para contratos de $15K+.

</details>

<details>
<summary><strong>Pregunta 2:</strong> Tu prospecto no aceptó tu solicitud de conexión en LinkedIn. ¿Qué deberías hacer el Día 12?</summary>

**Respuesta:** Envía el Email #3 en lugar de un mensaje de LinkedIn. No puedes enviar mensajes a no-conexiones (a menos que tengas créditos de InMail, que son costosos). Quédate con email para los prospectos que no conectan.

**¿Por qué no enviar otra solicitud de conexión?** LinkedIn limita cuántas solicitudes pendientes puedes tener. No desperdicies espacios en personas que ya te ignoraron una vez.

**¿Por qué no omitir el Día 12 completamente?** Aún necesitas mantener el ritmo de la secuencia. Solo usa email en lugar de LinkedIn.

</details>

<details>
<summary><strong>Pregunta 3:</strong> ¿Qué está mal con este email de despedida? "Me he comunicado varias veces y no he recibido respuesta. Supongo que no estás interesado. Avísame si eso cambia."</summary>

**Respuesta:** Es pasivo-agresivo y culpabilizante. El Marco de Salida Cálida dice: (1) Reconocer sin culpa, (2) Dejar la puerta abierta, (3) Ofrecer reconectar, (4) Valor añadido opcional.

**Mejor versión:** "Sé que estás ocupado, así que voy a dejar de llenar tu bandeja de entrada. Si la automatización de reportes se vuelve una prioridad más adelante, no dudes en contactarme. ¿Puedo contactarte de nuevo en Q3?"

**¿Por qué importa esto?** Las despedidas pasivo-agresivas queman puentes. Puede que necesites contactar de nuevo en 6 meses cuando su situación cambie.

</details>

---

**Próxima Lección:** Tomarás este blueprint de secuencia y lo configurarás en tu herramienta de outreach (Instantly, Lemlist o HeyReach). Cubriremos la configuración de campañas, la configuración de pruebas A/B, los límites de envío diario y las salvaguardas de entregabilidad.
