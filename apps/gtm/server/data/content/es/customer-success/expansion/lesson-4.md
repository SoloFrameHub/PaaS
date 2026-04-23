---
title: "Playbook de expansión de licencias y usuarios"
duration: "45 min"
track: "Éxito del cliente"
course: "Curso 38: Expansión y Upsell"
lesson: 4
---

Acabas de cerrar un cliente a $99/mes por una sola licencia. Tres meses después, mencionan "mi equipo" en un ticket de soporte.

**¿Qué haces?**

La mayoría de los fundadores se pierden esta señal por completo. Agradecen los $99 y no quieren parecer insistentes. Mientras tanto, el equipo de 8 personas de ese cliente comparte un solo login, choca con límites de uso y se frustra.

¿El resultado? Cancelan al renovar porque el producto "no escala con nuestro equipo."

**Aquí está la verdad:** La expansión de licencias es la palanca de crecimiento más fácil y de menor fricción que tienes. El cliente ya valora tu producto. Ya tiene presupuesto asignado. Solo necesita más acceso.

Esta lección te enseña cómo detectar señales de expansión de licencias, estructurar la conversación y convertir el interés del equipo en ingresos multi-licencia — sin sentirte vendedor.

---

## La economía de la expansión de licencias

<InsightCard icon="📊" title="El motor de crecimiento oculto">
La expansión de licencias representa el 40-60% de todos los ingresos de expansión SaaS. No es un "nice-to-have" — es la forma principal en que las empresas SaaS saludables hacen crecer su base existente.
</InsightCard>

Calculemos por qué la expansión de licencias importa tanto:

<ScenarioSimulator
title="Impacto de ingresos por expansión de licencias"
persistKey="expansion-L4-economics"
levers={[
{ id: "customers", label: "Clientes actuales", min: 10, max: 500, step: 10, defaultValue: 50 },
{ id: "avgSeats", label: "Licencias promedio por cliente", min: 1, max: 10, step: 0.5, defaultValue: 1.5 },
{ id: "seatPrice", label: "Precio por licencia/mes", min: 20, max: 500, step: 10, defaultValue: 99 },
{ id: "expansionRate", label: "Tasa mensual de expansión de licencias (%)", min: 1, max: 10, step: 0.5, defaultValue: 3 }
]}
outputs={[
{ id: "currentMRR", label: "MRR actual", formula: "customers * avgSeats * seatPrice", unit: "$", precision: 0 },
{ id: "monthlyExpansion", label: "MRR mensual de expansión", formula: "(customers * avgSeats * seatPrice) * (expansionRate / 100)", unit: "$", precision: 0 },
{ id: "annualImpact", label: "Ingresos anuales de expansión", formula: "((customers * avgSeats * seatPrice) * (expansionRate / 100)) * 12", unit: "$", precision: 0 }
]}
insight="Con una expansión mensual de licencias del {expansionRate}%, agregarías ${monthlyExpansion}/mes o ${annualImpact}/año en ingresos puros de expansión — con cero costo de adquisición."
/>

**Por qué la expansión de licencias le gana a la adquisición de nuevos clientes:**

<FlipCard front="5-10x menor costo" back="Sin gasto en marketing, sin ciclo de ventas, sin overhead de onboarding. El cliente ya confía en ti y tiene presupuesto asignado." />

<FlipCard front="50% menos fuga" back="Los clientes con 3+ licencias cancelan a la mitad de la tasa de los clientes de una sola licencia. La adopción del equipo crea costos de cambio y campeones internos." />

<FlipCard front="60-70% de conversión" back="Las conversaciones de expansión de licencias convierten al 60-70% vs 5-20% para prospectos fríos. La base es tu mejor pipeline." />

---

## Las 5 señales de expansión de licencias

No todos los clientes están listos para expansión de licencias. Aquí están las 5 señales que indican que **ahora es el momento**:

<SlideNavigation>
<Slide title="Señal 1: Lenguaje de equipo">

**Qué escuchar:** El cliente usa pronombres plurales o menciona colegas.

**Ejemplos:**

- "¿**Podemos** exportar estos datos?"
- "Necesito compartir esto con **mi equipo**"
- "**Nuestro diseñador** preguntó sobre..."

**Por qué importa:** Ya están pensando en multi-usuario. Solo no lo han formalizado todavía.

**Acción:** Envía el email de expansión de equipo dentro de 24 horas.

<ExampleCard label="Conversación real">
**Ticket de soporte del cliente:** "¿Cómo le doy acceso al dashboard a mi asistente virtual?"

**Respuesta del fundador:** "¡Excelente pregunta! La forma más fácil es agregarlo como miembro del equipo. Los planes Team empiezan en $79/licencia (vs $99 individual). ¿Quieres que lo configure para ti?"

**Resultado:** El cliente hizo upgrade al plan de 2 licencias el mismo día.
</ExampleCard>

</Slide>

<Slide title="Señal 2: Acercamiento al límite de licencias">

**Qué rastrear:** Uso al 80%+ de los límites del plan.

**Ejemplos:**

- 4 de 5 licencias ocupadas
- Compartiendo logins (detectado por sesiones simultáneas desde diferentes IPs)
- Alcanzando límites de llamadas API que sugieren actividad multi-usuario

**Por qué importa:** Están a punto de chocar con un muro. El outreach proactivo previene la frustración.

**Acción:** Email de trigger automatizado cuando alcanzan el umbral del 80%.

<InsightCard icon="⚡" title="La regla del 80%">
Cuando los clientes alcanzan el 80% de los límites del plan, la conversión a planes superiores sube al 40-60% — **si contactas proactivamente**. ¿Esperas hasta que lleguen al 100% y se quejen? La conversión cae al 15-20%.
</InsightCard>

</Slide>

<Slide title="Señal 3: Segundo registro del mismo dominio">

**Qué rastrear:** Nuevo registro con el mismo dominio de email que un cliente existente.

**Ejemplos:**

- juan@acme.com es cliente
- carolina@acme.com se registra para una prueba gratuita

**Por qué importa:** Interés orgánico del equipo. Ya están convencidos del valor.

**Acción:** Envía email a ambos usuarios sugiriendo un plan de equipo con descuento por volumen.

<TemplateBuilder
title="Email de expansión por mismo dominio"
persistKey="expansion-L4-same-domain"
sections={[
{
id: "opener",
title: "Apertura",
fields: [
{ id: "greeting", label: "Saludo", placeholder: "Hola [Nombre 1] y [Nombre 2]", type: "text" },
{ id: "observation", label: "Lo que notaste", placeholder: "Noté que ambos se registraron desde Acme Corp", type: "textarea" }
]
},
{
id: "value",
title: "Valor del plan de equipo",
fields: [
{ id: "benefit", label: "Beneficio principal del equipo", placeholder: "Espacios compartidos, facturación unificada, analítica de equipo", type: "textarea" },
{ id: "pricing", label: "Oferta de precio", placeholder: "Los planes Team empiezan en $79/licencia (15% menos que precio individual)", type: "text" }
]
},
{
id: "cta",
title: "Llamada a la acción",
fields: [
{ id: "ask", label: "Solicitud específica", placeholder: "¿Quieres que les configure un espacio de trabajo compartido?", type: "text" }
]
}
]}
/>

</Slide>

<Slide title="Señal 4: Solicitudes de funciones compartidas">

**Qué escuchar:** El cliente pregunta por funciones que solo tienen sentido para equipos.

**Ejemplos:**

- "¿Podemos tener diferentes niveles de permisos?"
- "¿Cómo configuro plantillas compartidas?"
- "¿Hay forma de ver en qué está trabajando mi equipo?"

**Por qué importa:** Ya están pensando como equipo. Solo no saben que existen planes de equipo.

**Acción:** Posiciona la solicitud de función como incluida en los planes de equipo.

</Slide>

<Slide title="Señal 5: Indicadores de crecimiento del negocio">

**Qué rastrear:** Señales externas de que el equipo del cliente está creciendo.

**Ejemplos:**

- LinkedIn muestra que están contratando
- Mencionan crecimiento de ingresos en conversación
- Se mudan a una oficina más grande (para negocios locales)
- Su sitio web ahora lista más miembros del equipo

**Por qué importa:** Negocios en crecimiento necesitan herramientas que crezcan. Aprovecha mientras están en modo de expansión.

**Acción:** Email de felicitación que conecta su crecimiento con beneficios del plan de equipo.

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Configura tu rastreo de señales"
persistKey="expansion-L4-signals"
items={[
"Agregar bandera de 'lenguaje de equipo' al sistema de tickets de soporte",
"Configurar alerta de uso de licencias al 80% en el sistema de facturación",
"Crear notificación de registro del mismo dominio",
"Entrenarte para escuchar solicitudes de funciones compartidas",
"Configurar alertas de LinkedIn para anuncios de contratación de clientes"
]}
/>

---

## La estrategia de expansión liderada por el campeón

Aquí está el secreto que la mayoría de los fundadores se pierden: **Tú no vendes la expansión de licencias. Tu usuario existente lo hace.**

Tu cliente es el campeón interno. Tu trabajo es darle el lenguaje y la justificación para vender la idea de agregar licencias a su equipo o jefe.

<FlipCard front="El playbook del campeón" back="Equipa a tu usuario con: (1) Calculadora de ROI mostrando ganancias de productividad del equipo, (2) Comparación mostrando costo por usuario vs alternativas, (3) Caso de estudio de un equipo de tamaño similar, (4) Oferta de prueba para nuevas licencias" />

### El email de habilitación del campeón

Cuando detectas una señal de expansión de licencias, envía esto:

<ComparisonBuilder
title="Tu email de campeón vs. plantilla experta"
persistKey="expansion-L4-champion-email"
prompt="Escribe tu email de habilitación del campeón"
expertExample="Hola [Nombre],

Noté que mencionaste compartir esto con tu equipo. Quería hacértelo fácil.

Nuestros planes de equipo le dan a cada quien su propio login, espacios compartidos y analítica de equipo — todo por $79/licencia (15% menos que el precio individual).

Esto es lo que facilita conseguir la aprobación:

- Calculadora de ROI: [link] (muestra 5-10 horas ahorradas por miembro del equipo al mes)
- Caso de estudio: Cómo [empresa similar] usa las funciones de equipo
- Prueba de 14 días en licencias adicionales (sin compromiso)

¿Quieres que configure un espacio de trabajo de equipo para que lo pruebes con 2-3 colegas?

[Tu nombre]"
criteria={[
"Reconoce la señal de equipo específicamente",
"Proporciona herramientas de justificación de ROI",
"Ofrece un camino de prueba de bajo riesgo",
"Hace que sea fácil decir que sí"
]}
/>

**Qué hace que esto funcione:**

1. **Estás resolviendo su problema** (cómo compartir acceso) no vendiendo tu producto
2. **Los estás armando** con materiales de justificación para su jefe/equipo
3. **Estás reduciendo el riesgo** con una oferta de prueba
4. **Lo estás haciendo sin esfuerzo** — "¿Quieres que lo configure?"

---

## Precios por volumen que convierten

<InsightCard icon="💰" title="El punto óptimo de descuento">
Ofrecer 10-15% de descuento para 5+ licencias aumenta la adopción de equipo un 25-30% sin destrozar tu economía. La clave: que se sienta como un buen trato sin entrenar a los clientes a esperar descuentos profundos.
</InsightCard>

### El framework de precios por licencia

<TemplateBuilder
title="Tus niveles de precios por volumen"
persistKey="expansion-L4-pricing"
sections={[
{
id: "base",
title: "Precio base",
fields: [
{ id: "singleSeat", label: "Precio de licencia individual", placeholder: "$99/mes", type: "text" },
{ id: "value", label: "Qué incluye", placeholder: "Funciones core, 1 usuario, soporte por email", type: "textarea" }
]
},
{
id: "tier1",
title: "Equipo pequeño (3-5 licencias)",
fields: [
{ id: "discount", label: "% de descuento", placeholder: "10%", type: "text" },
{ id: "perSeat", label: "Precio por licencia", placeholder: "$89/mes", type: "text" },
{ id: "added", label: "Beneficios adicionales", placeholder: "Espacios compartidos, analítica de equipo", type: "textarea" }
]
},
{
id: "tier2",
title: "Equipo (6-10 licencias)",
fields: [
{ id: "discount", label: "% de descuento", placeholder: "15%", type: "text" },
{ id: "perSeat", label: "Precio por licencia", placeholder: "$84/mes", type: "text" },
{ id: "added", label: "Beneficios adicionales", placeholder: "+ Soporte prioritario, controles de admin", type: "textarea" }
]
},
{
id: "enterprise",
title: "Enterprise (11+ licencias)",
fields: [
{ id: "approach", label: "Enfoque de precio", placeholder: "Cotización personalizada, 15-25% de descuento", type: "text" },
{ id: "added", label: "Beneficios adicionales", placeholder: "+ Gerente de éxito dedicado, integraciones personalizadas", type: "textarea" }
]
}
]}
/>

### Cuando el precio por volumen señala upsell

<DecisionTree
title="Conteo de licencias → Camino de upgrade"
persistKey="expansion-L4-upgrade-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "El cliente quiere agregar licencias. ¿Cuántas licencias totales va a tener?",
choices: [
{ label: "2-4 licencias", nextNodeId: "small" },
{ label: "5-10 licencias", nextNodeId: "team" },
{ label: "11+ licencias", nextNodeId: "enterprise" }
]
},
{
id: "small",
content: "Ofrece: Descuento por volumen + espacios compartidos. Mantener en nivel de plan actual.",
isTerminal: true,
outcome: "positive"
},
{
id: "team",
content: "Recomienda: Upgrade al plan Team. Incluye controles de admin, analítica de equipo, soporte prioritario. 15% de descuento por volumen.",
choices: [
{ label: "Aceptan el plan Team", nextNodeId: "team-yes" },
{ label: "Quieren quedarse en el plan actual", nextNodeId: "team-no" }
]
},
{
id: "team-yes",
content: "¡Excelente! El plan Team les da espacio para crecer a 15-20 licencias con mejores controles. Upsell exitoso.",
isTerminal: true,
outcome: "positive"
},
{
id: "team-no",
content: "Sin problema. Ofrece descuento por volumen en el plan actual, revisa el plan Team en la próxima renovación o cuando lleguen a 8+ licencias.",
isTerminal: true,
outcome: "neutral"
},
{
id: "enterprise",
content: "Esto es territorio enterprise. Agenda una llamada para discutir precios personalizados, soporte dedicado e integraciones potenciales.",
isTerminal: true,
outcome: "positive"
}
]}
/>

---

## El loop de crecimiento "Invita a un colega"

La mejor expansión de licencias sucede **dentro del producto**, no vía email.

### El prompt dentro del producto

Agrega un botón de "Invita a un colega" a tu producto. Colócalo donde la colaboración de equipo sea natural:

- **Después de que un usuario completa una acción clave:** "¿Quieres compartir esto con tu equipo?"
- **Cuando alcanzan un límite de uso:** "Estás al 80% de capacidad. Agrega un miembro del equipo para distribuir la carga."
- **En flujos de trabajo compartidos:** "Este reporte sería útil para [rol]. Invítalos a colaborar."

<RangeSlider
  label="¿Qué tan prominente es la invitación de equipo en tu producto hoy?"
  min={1}
  max={10}
  lowLabel="Inexistente"
  highLabel="Función central"
  persistKey="expansion-L4-invite-prominence"
/>

### Datos de conversión

<InsightCard icon="📈" title="La invitación dentro del producto convierte al 5-10%">
Por cada 100 usuarios activos, 5-10 invitarán a un colega si se les sugiere en el momento correcto. Son 5-10 expansiones de licencias con cero esfuerzo de outbound.
</InsightCard>

<TemplateBuilder
title="Tu flujo de invitación dentro del producto"
persistKey="expansion-L4-invite-flow"
sections={[
{
id: "trigger",
title: "Momento del trigger",
fields: [
{ id: "when", label: "Cuándo mostrar el prompt de invitación", placeholder: "Después de que el usuario crea su 3er proyecto", type: "text" },
{ id: "context", label: "Por qué este momento tiene sentido", placeholder: "Están obteniendo valor y probablemente quieren colaborar", type: "textarea" }
]
},
{
id: "prompt",
title: "El prompt",
fields: [
{ id: "headline", label: "Título", placeholder: "¿Quieres colaborar con tu equipo?", type: "text" },
{ id: "benefit", label: "Declaración de beneficio", placeholder: "Invita colegas a espacios compartidos. Primeras 2 licencias gratis por 14 días.", type: "textarea" },
{ id: "cta", label: "Texto del botón CTA", placeholder: "Invitar miembro del equipo", type: "text" }
]
},
{
id: "followup",
title: "Post-invitación",
fields: [
{ id: "inviterEmail", label: "Email al que invita", placeholder: "¡Gracias por invitar a [nombre]! Así es como ponerlos al día...", type: "textarea" },
{ id: "inviteeEmail", label: "Email al invitado", placeholder: "[Invitador] te invitó a colaborar en [producto]...", type: "textarea" }
]
}
]}
/>

---

## La conversación de expansión de licencias

Has detectado la señal. Has enviado el email. Ahora responden: "Cuéntame más sobre los planes de equipo."

**Así es como estructurar la conversación:**

<MiniRoleplay
scenario="Un cliente responde a tu email de expansión de equipo: 'Interesante. Tenemos 6 personas que podrían usar esto. ¿Cuál es el precio y qué obtenemos?'"
role="Tú eres el fundador respondiendo"
persistKey="expansion-L4-roleplay"
modelResponse="¡Excelente pregunta! Para 6 licencias, estarían en $84/licencia/mes (15% menos que el precio individual).

Esto es lo que obtienen:

- Cada quien tiene su propio login (se acabó compartir contraseñas)
- Espacios compartidos para que el equipo colabore en tiempo real
- Dashboard de analítica de equipo para que veas el uso y productividad
- Controles de admin para manejar permisos
- Soporte prioritario (respondemos en 4 horas vs 24 horas)

El ROI: La mayoría de los equipos ahorran 5-10 horas por persona al mes solo por mejor colaboración y no duplicar trabajo.

¿Quieres probarlo? Puedo configurar una prueba de 14 días con las 6 licencias para que tu equipo lo teste sin riesgo."
/>

### La estructura de 3 partes

1. **Reconoce su contexto:** "Para 6 personas, estarían en nuestro plan Team..."
2. **Traduce funciones a resultados:** No listes funciones. Explica qué gana el equipo (tiempo ahorrado, mejor colaboración, menos errores)
3. **Reduce la fricción:** Ofrece una prueba, ofrece configurarlo por ellos, ofrece un plan de migración

<ClassifyExercise
title="Respuestas buenas vs malas a expansión de licencias"
persistKey="expansion-L4-classify"
categories={[
{ id: "good", label: "Respuesta efectiva", color: "#10b981" },
{ id: "bad", label: "Respuesta inefectiva", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Los planes de equipo son $84/licencia. Obtienen espacios compartidos, controles de admin y soporte prioritario.",
correctCategory: "bad",
explanation: "Lista de funciones sin contexto ni enfoque en resultados. Sin oferta de prueba."
},
{
id: "2",
content: "Para 6 personas, el plan Team es perfecto. Ahorrarían ~30 horas/mes por mejor colaboración. ¿Quieres probarlo 14 días?",
correctCategory: "good",
explanation: "Enfocado en resultados (tiempo ahorrado), contextual (6 personas = plan Team), baja fricción (oferta de prueba)."
},
{
id: "3",
content: "Déjame enviarte un deck de precios y podemos agendar un demo la próxima semana.",
correctCategory: "bad",
explanation: "Agrega fricción innecesaria. Hicieron una pregunta simple — respóndela simplemente."
},
{
id: "4",
content: "¡Genial! Puedo configurar un espacio de equipo hoy. Estarían a $84/licencia (15% menos). Primeros 14 días gratis para probar con tu equipo. ¿Te parece?",
correctCategory: "good",
explanation: "Proactivo (yo lo configuro), precio claro, oferta de prueba, pregunta fácil de sí/no."
}
]}
/>

---

## Objeciones comunes y respuestas

<ProgressiveReveal title="Las 4 objeciones a la expansión de licencias" persistKey="expansion-L4-objections">

<RevealSection title="Objeción 1: 'Estamos bien compartiendo un login'">

**Lo que realmente están diciendo:** "No veo el valor de licencias separadas."

**Tu respuesta:**
"Totalmente lo entiendo — compartir funciona hasta que no funciona. Esto es lo que generalmente se rompe:

- Alguien cambia una configuración y nadie sabe quién fue
- No puedes ver quién está trabajando en qué
- Los logs de auditoría son inútiles (todo aparece como un solo usuario)
- Cuando alguien se va, tienes que cambiar la contraseña y re-compartirla

La mayoría de los equipos cambian cuando les pasa alguno de estos problemas. ¿Quieres evitarte ese dolor de cabeza proactivamente?"

**Por qué funciona:** No estás discutiendo. Estás pintando una imagen de dolor futuro que no han experimentado todavía.

</RevealSection>

<RevealSection title="Objeción 2: 'Es muy caro para nuestro equipo'">

**Lo que realmente están diciendo:** "No veo el ROI."

**Tu respuesta:**
"Preocupación válida. Hagamos las cuentas:

6 personas × 5 horas ahorradas al mes (por mejor colaboración) = 30 horas
30 horas × $50/hora de tasa promedio = $1,500/mes en ganancias de productividad
Costo del plan Team: $504/mes (6 licencias × $84)

ROI: Están obteniendo $1,500 en valor por $504 en costo. Eso es un retorno de 3x.

Y eso es solo ahorro de tiempo — no cuenta errores reducidos, mejor visibilidad o onboarding más fácil.

¿Quieres probar esas cuentas con una prueba de 14 días?"

**Por qué funciona:** Estás reenmarcando de costo a inversión con números concretos.

</RevealSection>

<RevealSection title="Objeción 3: '¿Podemos agregar solo 2 licencias por ahora?'">

**Lo que realmente están diciendo:** "Quiero probar esto antes de comprometerme por completo."

**Tu respuesta:**
"¡Absolutamente! Empezar con 2 licencias es inteligente. Esto es lo que recomendaría:

Agrega a tus 2 miembros de equipo más activos primero. Después de 30 días, revisamos:

- Cuánto tiempo están ahorrando
- Si el resto del equipo está pidiendo acceso
- Si los flujos de trabajo compartidos están funcionando

Entonces puedes decidir si expandir más. ¿Te parece?"

**Por qué funciona:** Estás diciendo sí mientras estableces un checkpoint natural de expansión.

</RevealSection>

<RevealSection title="Objeción 4: 'Lo vamos a pensar y te avisamos'">

**Lo que realmente están diciendo:** "Esto no es lo suficientemente urgente para decidir ahora."

**Tu respuesta:**
"¡Sin problema! Para ayudarte a pensarlo, te voy a enviar:

- Calculadora de ROI (pon tu tamaño de equipo y tasa por hora)
- Caso de estudio de [empresa similar]
- Link de prueba de 14 días (sin tarjeta de crédito necesaria)

¿Hay alguna preocupación específica que pueda abordar para facilitar la decisión?"

**Por qué funciona:** Les estás dando herramientas para auto-convencerse mientras descubres objeciones ocultas.

</RevealSection>

</ProgressiveReveal>

---

## Tu playbook de expansión de licencias

Construyamos tu sistema completo de expansión de licencias:

<TemplateBuilder
title="Tu playbook de expansión de licencias"
persistKey="expansion-L4-playbook"
sections={[
{
id: "signals",
title: "Tus 3 señales principales",
fields: [
{ id: "signal1", label: "Señal 1", placeholder: "ej., Cliente menciona 'mi equipo' en ticket de soporte", type: "text" },
{ id: "action1", label: "Acción para Señal 1", placeholder: "ej., Enviar email de expansión de equipo dentro de 24 horas", type: "textarea" },
{ id: "signal2", label: "Señal 2", placeholder: "ej., Uso al 80% del límite de licencias", type: "text" },
{ id: "action2", label: "Acción para Señal 2", placeholder: "ej., Email automatizado + alerta en Slack al fundador", type: "textarea" },
{ id: "signal3", label: "Señal 3", placeholder: "ej., Segundo registro del mismo dominio", type: "text" },
{ id: "action3", label: "Acción para Señal 3", placeholder: "ej., Email a ambos usuarios con oferta de plan de equipo", type: "textarea" }
]
},
{
id: "pricing",
title: "Tus precios por volumen",
fields: [
{ id: "base", label: "Precio base por licencia", placeholder: "$99/mes", type: "text" },
{ id: "tier1", label: "Precio para 3-5 licencias", placeholder: "$89/licencia (10% menos)", type: "text" },
{ id: "tier2", label: "Precio para 6-10 licencias", placeholder: "$84/licencia (15% menos)", type: "text" },
{ id: "enterprise", label: "Enfoque para 11+ licencias", placeholder: "Cotización personalizada, 15-25% de descuento", type: "text" }
]
},
{
id: "templates",
title: "Tus plantillas de email",
fields: [
{ id: "teamLanguage", label: "Email de señal de lenguaje de equipo", placeholder: "Asunto: Facilitar el compartir con tu equipo...", type: "textarea" },
{ id: "seatLimit", label: "Email de 80% del límite de licencias", placeholder: "Asunto: Estás casi al máximo...", type: "textarea" },
{ id: "sameDomain", label: "Email de registro del mismo dominio", placeholder: "Asunto: Noté que ambos se registraron...", type: "textarea" }
]
},
{
id: "inProduct",
title: "Invitación dentro del producto",
fields: [
{ id: "trigger", label: "Cuándo mostrar el prompt de invitación", placeholder: "Después de que el usuario completa su 3er proyecto", type: "text" },
{ id: "prompt", label: "Texto del prompt", placeholder: "¿Quieres colaborar con tu equipo? Invita colegas a espacios compartidos.", type: "textarea" },
{ id: "cta", label: "Botón CTA", placeholder: "Invitar miembro del equipo", type: "text" }
]
}
]}
/>

---

## Checklist de implementación

<InteractiveChecklist
title="Lanza tu sistema de expansión de licencias"
persistKey="expansion-L4-implementation"
items={[
"Configurar alerta de uso de licencias al 80% en el sistema de facturación",
"Agregar bandera de 'lenguaje de equipo' al flujo de trabajo de soporte",
"Crear notificación de registro del mismo dominio",
"Escribir 3 plantillas de email de expansión de licencias",
"Definir niveles de precios por volumen (3-5 licencias, 6-10 licencias, 11+ licencias)",
"Agregar prompt de 'Invita a un colega' al producto (elegir momento del trigger)",
"Crear calculadora de ROI para planes de equipo",
"Documentar respuestas a objeciones para tu contexto de equipo",
"Revisar todos los clientes actuales buscando señales inmediatas de expansión de licencias",
"Enviar los primeros 3 emails de expansión de licencias esta semana"
]}
/>

---

## ¿Qué sigue?

Has construido tu playbook de expansión de licencias. En la siguiente lección, abordaremos los **Caminos de upsell de servicio hecho para ti (DFY) y consultoría** — cómo convertir clientes que aman tu producto pero necesitan ayuda implementándolo en ingresos de servicio de alto margen.

**Pregunta de vista previa:** Si un cliente dice "Me encanta la herramienta pero no tengo tiempo para configurarla bien," ¿qué le ofreces?

<RangeSlider
  label="¿Qué tan seguro te sientes con tu sistema de expansión de licencias?"
  min={1}
  max={10}
  lowLabel="Necesito más trabajo"
  highLabel="Listo para ejecutar"
  persistKey="expansion-L4-confidence"
/>
