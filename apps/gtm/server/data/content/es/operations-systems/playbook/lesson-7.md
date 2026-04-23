---
title: "El Sistema Personal de Adquisición en Una Página"
duration: "55 min"
track: "Operations & Systems"
course: "Course 44: The Sales Playbook"
lesson: 7
---

## La Prueba de Fuego

Has pasado seis lecciones construyendo manuales específicos por situación. Respondiste las 5 preguntas clave, elegiste tu situación (cero, B2B SaaS, entrenador/consultor, creador o escalando), y llenaste templates con respuestas específicas.

Ahora viene la prueba real: ¿puedes caber tu sistema de adquisición completo en una sola página?

Esto no es un ejercicio de simplificación. Es una prueba de claridad. La restricción de una página te obliga a eliminar todo lo que es aspiracional pero no accionable, todo lo que es vago pero suena estratégico, todo lo que agregaste para sentirte exhaustivo pero que nunca ejecutarás realmente.

Si no cabe en una página, te falta claridad.

Esto suena duro. Está destinado a serlo.

<InsightCard icon="📄" title="El Principio de la Una Página">
Las empresas con un documento de estrategia de una página ejecutan 3x más rápido que las que tienen documentos de 20 páginas. No porque las de una página tengan menos información — sino porque la restricción obliga a priorizar. Todo en la página se ganó su lugar. Nada es relleno.
</InsightCard>

## Por Qué Funciona la Una Página

Las investigaciones sobre objetivos escritos muestran que son **42% más propensos de lograrse** que los no escritos. El sistema de una página amplifica este efecto a través de tres mecanismos:

<SlideNavigation>
<Slide title="Mecanismo 1: Compromiso por Restricción">

Cuando estás obligado a elegir _un_ canal primario en lugar de tres, tomaste una decisión real. Cuando estás obligado a nombrar _un_ PCI en una sola oración, lograste una claridad que no tenías antes. La restricción de una página genera compromisos reales al hacer que las decisiones reales sean inevitables.

Un documento de 15 páginas puede sostener contradicciones — "nos enfocaremos en outbound Y construiremos inbound Y nutriremos referidos Y crearemos contenido." Una página no puede. Estás obligado a elegir.

</Slide>
<Slide title="Mecanismo 2: Visibilidad Diaria">

Un documento que puedes leer en 60 segundos es un documento que realmente leerás. Puedes pegarlo en la pared y mirarlo antes de tu primera actividad cada día. Se convierte en un recordatorio constante de lo que elegiste priorizar.

Una estrategia de 15 páginas vive en una carpeta. Un sistema de una página vive en tu pared, en tu práctica diaria.

</Slide>
<Slide title="Mecanismo 3: Velocidad de Comunicación">

Tu sistema de una página es algo que puedes mostrarle a un asesor, socio de accountability o futuro empleado en 60 segundos. Pueden darte retroalimentación enfocada, señalar brechas o validar tu enfoque sin tener que leer una novela.

La mejor retroalimentación sobre tu estrategia de adquisición viene de personas que la entienden rápidamente. Una página lo permite.

</Slide>
</SlideNavigation>

## El Diseño de Una Página

El sistema de una página tiene un diseño específico, diseñado para que cada sección sea visible de un vistazo:

<InsightCard icon="🗂️" title="La Anatomía de la Una Página">
**Sección superior:** Número de versión + fecha (accountability)

**Barra QUIÉN:** Tu PCI en una oración (claridad)

**Tres columnas:**

- Izquierda — CÓMO: Tu canal primario + secundario con herramientas y volúmenes
- Centro — QUÉ: Tu mensaje central (problema, transformación, prueba, CTA) en 3-4 oraciones
- Derecha — MEDIDO: 3 métricas líderes con objetivos semanales + 2 métricas rezagadas con objetivos mensuales

**Barra inferior:** COMPROMISO — actividades diarias y semanales con números específicos + objetivos totales de 90 días

Todo visible de una vez. Sin scroll. Sin cambio de página.
</InsightCard>

## Construye Tu Sistema de Una Página

Este es el template más importante de todo el curso. Tómate tu tiempo. Cada palabra debería ser específica, medible y honesta.

<TemplateBuilder
title="Mi Sistema Personal de Adquisición v1.0"
persistKey="playbook-L7-template"
sections={[
{
id: "header",
title: "Encabezado",
fields: [
{ id: "version", label: "Versión", placeholder: "v1.0", type: "text" },
{ id: "date", label: "Fecha de Creación", placeholder: "Fecha de hoy", type: "text" },
{ id: "situation", label: "Manual de Situación", placeholder: "Cuál situación te describe mejor: Empezando desde Cero / B2B SaaS / Entrenador-Consultor / Creador / Escalando", type: "text" }
]
},
{
id: "who",
title: "QUIÉN — Mi Cliente Ideal (1 oración)",
fields: [
{ id: "statement", label: "Declaración del PCI", placeholder: "[Título de trabajo] en [tipo de empresa, tamaño, etapa] experimentando [dolor/problema específico] que tiene [señal de presupuesto o disparador de compra].", type: "textarea" }
]
},
{
id: "how",
title: "CÓMO — Mis Canales de Adquisición",
fields: [
{ id: "primary", label: "Canal Primario (70% del esfuerzo)", placeholder: "p.ej., Email frío vía Apollo: 50 emails personalizados por semana a [filtro del PCI] usando [herramienta]. Tasa de respuesta esperada: 6-8%.", type: "textarea" },
{ id: "secondary", label: "Canal Secundario (30% del esfuerzo)", placeholder: "p.ej., LinkedIn: 3 posts por semana (problema + caso de estudio + perspectiva) + 10 DMs personalizados a seguidores comprometidos.", type: "textarea" },
{ id: "tools", label: "Herramientas ($X/mes)", placeholder: "Lista cada herramienta y costo. El total debería caber en tu presupuesto.", type: "text" }
]
},
{
id: "what",
title: "QUÉ — Mi Mensaje Central (3-4 oraciones total)",
fields: [
{ id: "problem", label: "Problema (1 oración)", placeholder: "La mayoría de [PCI] lucha con [problema específico] — [consecuencia en su propio lenguaje].", type: "text" },
{ id: "transformation", label: "Promesa de Transformación (1 oración)", placeholder: "[Empresa/Tú] ayuda a [PCI] a [resultado específico] en [plazo] sin [objeción].", type: "text" },
{ id: "proof", label: "Punto de Prueba Principal (1 oración)", placeholder: "[Cliente/tipo de cliente] logró [métrica específica] en [plazo].", type: "text" },
{ id: "cta", label: "Llamado a la Acción (1 oración)", placeholder: "p.ej., '¿Vale la pena una llamada de 15 minutos?' o 'Solicita una sesión de estrategia' o 'Descarga [lead magnet]'", type: "text" }
]
},
{
id: "measured",
title: "MEDIDO — Mis Métricas",
fields: [
{ id: "leading1", label: "Métrica Líder 1 (objetivo semanal)", placeholder: "p.ej., Emails fríos enviados: 50/semana", type: "text" },
{ id: "leading2", label: "Métrica Líder 2 (objetivo semanal)", placeholder: "p.ej., Tasa de respuesta de email: 6%+ / Respuestas de DM de LinkedIn: 3+/semana", type: "text" },
{ id: "leading3", label: "Métrica Líder 3 (objetivo semanal)", placeholder: "p.ej., Reuniones de descubrimiento agendadas: 3+/semana", type: "text" },
{ id: "lagging1", label: "Métrica Rezagada 1 (objetivo mensual)", placeholder: "p.ej., Nuevos clientes: 2/mes", type: "text" },
{ id: "lagging2", label: "Métrica Rezagada 2 (objetivo mensual)", placeholder: "p.ej., Nuevos MRR: $5K/mes para el mes 3", type: "text" }
]
},
{
id: "commitment",
title: "COMPROMISO — Mi Promesa de 90 Días",
fields: [
{ id: "daily", label: "Actividad Diaria (días de semana)", placeholder: "p.ej., 45 min en email frío: investigar 5 prospectos, enviar 10 emails personalizados. Sin excepciones de lunes a viernes.", type: "text" },
{ id: "weekly", label: "Actividad Semanal", placeholder: "p.ej., Lunes: construir lista de 50 prospectos. Miércoles: revisar tasas de respuesta + ajustar líneas de asunto. Jueves: todas las llamadas de descubrimiento (mínimo 2).", type: "text" },
{ id: "target90", label: "Objetivos Totales a 90 Días", placeholder: "p.ej., 1,800 emails fríos enviados, 144 respuestas, 72 llamadas de descubrimiento realizadas, 10 nuevos clientes firmados, $15K MRR agregado.", type: "textarea" }
]
}
]}
/>

## La Prueba de Laminación

Ahora lee lo que escribiste. Aplica la prueba de laminación a cada sección:

_"Si imprimiera esta página, la laminara y la pegara en mi pared — ¿alguna sección me haría hacer una mueca?"_

Una mueca indica: vaguedad, deshonestidad sobre tu compromiso, aspiraciones confundidas con planes, o especificidad que aún no has ganado.

<SwipeDecision
title="Auditoría del Sistema de Una Página"
description="Para cada respuesta de ejemplo, decide: ¿pasa la prueba de laminación o necesita una reescritura?"
optionA="Falla — Muy Vaga o Aspiracional"
optionB="Pasa — Específica y Honesta"
persistKey="playbook-L7-swipe"
cards={[
{ id: "1", content: "QUIÉN: 'Fundadores y emprendedores que quieren hacer crecer su negocio'", correctOption: "a", explanation: "Esto describe a casi todos con un negocio. Sin título, sin tipo de empresa, sin tamaño, sin dolor específico. Reescribe con: [título específico] en [tipo/tamaño específico de empresa] experimentando [dolor cuantificado específico]." },
{ id: "2", content: "QUIÉN: 'Jefe de Ventas en empresas B2B SaaS con 20-100 empleados, $1M-$10M ARR, luchando por mantener el 80%+ de consecución de cuota en su equipo'", correctOption: "b", explanation: "Título específico, tipo específico de empresa, rango de tamaño específico con tanto número de empleados como ingresos, dolor específico medible. Podrías encontrar 200 personas que encajan en esta descripción en LinkedIn ahora mismo." },
{ id: "3", content: "CÓMO Canal Primario: 'Email frío y LinkedIn y contenido y referidos y tal vez algunos anuncios pagados'", correctOption: "a", explanation: "Esto es una lista de canales, no una estrategia de canal. Listar todo evita el compromiso de elegir. Elige uno primario con volúmenes semanales específicos." },
{ id: "4", content: "COMPROMISO Diario: 'Trabajar en actividades de ventas cada día y mantenerme consistente'", correctOption: "a", explanation: "'Mantenerme consistente' no es un compromiso. Es una esperanza. Un compromiso tiene una actividad específica + una cantidad específica + un bloque de tiempo específico. Reescribe: 'Enviar 10 emails fríos personalizados entre las 8-9am de lunes a viernes.'" },
{ id: "5", content: "COMPROMISO Diario: 'Enviar 3 mensajes personalizados del Dream 25 antes de las 10am, de lunes a viernes. Sin excepciones.'", correctOption: "b", explanation: "Actividad específica (mensajes personalizados del Dream 25), cantidad específica (3), ventana de tiempo específica (antes de las 10am), días específicos (lunes a viernes), compromiso explícito ('sin excepciones'). Esto es un compromiso real." },
{ id: "6", content: "MEDIDO Rezagado: 'Multiplicar mis ingresos por 10 en 90 días'", correctOption: "a", explanation: "Esto es un objetivo, no una métrica. Y probablemente no es realista, lo que significa que te desmoralizará. Métricas rezagadas reales: 'Agregar $8K MRR en 90 días (del $12K actual al objetivo de $20K).' Específico, con tiempo definido, basado en la matemática de tu pipeline." }
]}
/>

## Versionando Tu Sistema

Tu sistema de una página no es un documento terminado — es la versión 1.0 de un sistema vivo.

<FlipCard
  front="v1.0 → v1.1: Actualización de 30 Días"
  back="Después de 30 días de ejecución, tienes datos. ¿Tus tasas de respuesta coincidieron con tus objetivos? ¿Tus métricas líderes están mejorando? Ajustes menores: una mejor línea de asunto, un PCI refinado, objetivos semanales actualizados basados en lo que es realista. v1.1 está informada por datos, no por intuición."
/>

<FlipCard
  front="v1.1 → v1.2: Actualización de 60 Días"
  back="Después de 60 días, sabes si tu canal primario está funcionando. Si los indicadores líderes están mejorando, persiste y refina (v1.2). Si los indicadores líderes están planos o negativos, esto podría justificar un pivote — pero consulta la Lección 9 antes de tomar esa decisión."
/>

<FlipCard
  front="v1.x → v2.0: Actualización Mayor de 90 Días"
  back="Después de 90 días, tienes 3 puntos de datos mensuales. v2.0 representa una actualización estratégica significativa: posiblemente un nuevo canal primario, un PCI refinado basado en quién realmente convirtió, niveles de compromiso actualizados basados en lo que es sostenible, y nuevos objetivos basados en el rendimiento probado."
/>

<TemplateBuilder
title="Registro de Historial de Versiones"
persistKey="playbook-L7-version"
sections={[
{
id: "v10",
title: "v1.0 — Versión Inicial",
fields: [
{ id: "date", label: "Fecha", placeholder: "Fecha de hoy", type: "text" },
{ id: "rationale", label: "Por Qué Lo Construí de Esta Manera", placeholder: "¿Qué suposiciones estás haciendo? ¿Cuál es tu hipótesis de por qué esta combinación de canal + PCI funcionará?", type: "textarea" }
]
},
{
id: "v11",
title: "v1.1 — Revisión de 30 Días (completar después del Día 30)",
fields: [
{ id: "date11", label: "Fecha", placeholder: "Deja en blanco — completa el Día 30", type: "text" },
{ id: "changes", label: "Qué Cambió y Por Qué", placeholder: "¿Qué datos motivaron esta actualización? ¿Qué se mantuvo igual?", type: "textarea" }
]
},
{
id: "v20",
title: "v2.0 — Revisión Mayor de 90 Días (completar después del Día 90)",
fields: [
{ id: "date20", label: "Fecha", placeholder: "Deja en blanco — completa el Día 90", type: "text" },
{ id: "pivots", label: "Cambios Mayores y Fundamento Estratégico", placeholder: "¿Qué aprendiste? ¿Qué pivotes hiciste? ¿Qué funcionó mejor de lo esperado?", type: "textarea" }
]
}
]}
/>

## Compartiendo Tu Sistema

Una de las cosas más poderosas que puedes hacer con tu sistema de una página: compartirlo con alguien que te hará accountable.

<InsightCard icon="🤝" title="El Multiplicador de Accountability">
Los socios de accountability aumentan el logro de objetivos en un 65% (investigación ASTD). Compartir tu sistema de una página con un par crea un compromiso específico — no contigo mismo (fácil de racionalizar) sino con alguien más que preguntará "¿cómo fueron esos 50 emails fríos esta semana?"
</InsightCard>

<MiniRoleplay
  scenario="Estás compartiendo tu sistema de una página con un socio de accountability por primera vez. Preguntan: '¿Con qué te estás comprometiendo para los próximos 90 días, y cómo sabré si estás ejecutando?'"
  role="Tú (explicando tu sistema de una página)"
  persistKey="playbook-L7-roleplay"
  modelResponse="Para los próximos 90 días, me comprometo a [actividad diaria con número específico] cada día de la semana. Mi canal primario es [canal], apuntando a [PCI]. La métrica que te reportaré cada [semana/quincena] es [métrica líder con objetivo]. Si estoy alcanzando [objetivo de métrica líder] para la Semana 4, sabremos que el sistema está funcionando. Si estoy por debajo de [objetivo de métrica líder] durante 3 semanas seguidas, quiero que me preguntes por qué y que rebatas mis excusas. La única razón aceptable para faltar al compromiso es [excepción específica, p.ej., una emergencia familiar] — todo lo demás es una elección que estoy haciendo para no hacer el trabajo."
/>

## La Reflexión de Claridad

Antes de finalizar tu sistema de una página, responde estas tres preguntas:

<ComparisonBuilder
title="La Reflexión de Claridad"
persistKey="playbook-L7-compare"
prompt="Escribe tu respuesta a: 'Si ejecuto este sistema perfectamente durante 90 días, aquí está exactamente lo que pasará y por qué lo creo'"
expertExample="Si ejecuto este sistema perfectamente durante 90 días:

Enviaré 900 emails fríos (10/día × 5 días × 18 semanas) a [descripción del PCI]. Con mi tasa proyectada del 7% de respuesta, eso es 63 respuestas. Con mi tasa de conversión del 50% de respuesta a reunión, eso es 32 llamadas de descubrimiento. Con mi tasa de cierre del 20%, eso es 6 nuevos clientes. Con mi ACV de $8K, eso es $48K en nuevos ARR.

Lo creo porque: (1) Mi tasa de respuesta actual de 50 emails de prueba fue del 8%, lo que sugiere que el mensaje resuena. (2) Mi conversión de llamada de descubrimiento ha sido del 55% desde mi alcance a la red. (3) Mi tasa de cierre de los 4 tratos que he hecho es del 25%. Estos son mis propios puntos de datos, no promedios de la industria.

Mi mayor riesgo: no ejecuto consistentemente. La matemática solo funciona si envío 10 emails cada día de semana. Ese es mi foco."
criteria={["Establece números específicos, no rangos", "Se deriva de la matemática del pipeline, no de deseos", "Referencia tus propios datos donde sea posible", "Identifica el riesgo más importante para la ejecución", "Termina con un único foco para los 90 días"]}
/>

<InteractiveChecklist
title="Tus Elementos de Acción Antes de la Lección 8"
persistKey="playbook-L7-actions"
items={[
"Completa el template del Sistema de Una Página arriba — cada campo con respuestas específicas",
"Pasa cada respuesta por la Prueba de Laminación — reescribe cualquier cosa que te haga hacer una mueca",
"Inicia tu Registro de Historial de Versiones con v1.0 y tus suposiciones iniciales",
"Identifica tu socio de accountability y comparte tu sistema de una página con ellos esta semana",
"Agenda tus fechas de revisión del Día 30 y Día 60 en tu calendario ahora mismo",
"Imprime o captura tu sistema de una página completado y ponlo en algún lugar donde lo veas diariamente",
"Escribe tu Reflexión de Claridad — ¿qué pasará si ejecutas perfectamente durante 90 días?"
]}
/>

## Qué Viene Después

En la **Lección 8**, tu sistema de una página se convierte en un compromiso formal. Construirás el Contrato de Compromiso de 90 Días — un documento con compromisos específicos de actividad, una lista de "No Haré", mecanismos de accountability y puntos de control de revisión.

El contrato formaliza la promesa. El sistema de una página clarifica qué estás prometiendo. Juntos forman la columna vertebral conductual de tu sistema de adquisición.
