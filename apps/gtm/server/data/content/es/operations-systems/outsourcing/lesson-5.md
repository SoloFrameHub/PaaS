---
title: "POE 3: Tareas de Investigación de Prospectos"
duration: "50 min"
track: "Operations & Systems"
course: "Course 43: Outsourcing & VAs"
lesson: 5
---

## La Investigación Es la Diferencia Entre lo Genérico y lo Resonante

La forma más rápida de arruinar una secuencia de alcance frío es enviar un mensaje que pudo haberse enviado a cualquiera. "Ayudo a empresas como la tuya a crecer sus ingresos" aterriza en la carpeta de eliminados. "Noté que Priya acaba de unirse como VP de Ventas en Rowantech después de tres años en Salesforce — probablemente heredó un problema de visibilidad del pipeline" obtiene una respuesta.

Ese nivel de personalización requiere investigación. Y la investigación toma tiempo — 15 a 30 minutos por prospecto cuando lo haces tú mismo. A $75/hora, eso es $19-38 del valor de tu tiempo por prospecto antes de haber enviado una sola palabra.

Aquí es exactamente donde un AV con un POE de investigación claro transforma tu economía. Un AV entrenado investigando prospectos a $6/hora — incluso con asistencia de IA — cuesta $1.50 a $3 por Resumen del Prospecto. La misma investigación, documentada de manera confiable, formateada de la misma manera cada vez.

<InsightCard icon="🔍" title="La Investigación Impulsa Directamente los Ingresos">
El alcance personalizado que hace referencia a un disparador específico (cambio de trabajo, financiamiento, lanzamiento de producto, contenido publicado) genera tasas de respuesta 3-5 veces más altas que los mensajes genéricos. El trabajo de tu AV es encontrar esos disparadores y presentarlos antes de que escribas una sola palabra de alcance.
</InsightCard>

## El Resumen del Prospecto: Tu Entregable Estándar de Investigación

Cada sesión de investigación del AV produce exactamente una cosa: un Resumen del Prospecto completado. Es un resumen de una página (o registro estructurado del CRM) de todo lo que necesitas para enviar un mensaje de alcance relevante y personalizado.

<FlipCard
  front="¿Qué hace útil a un Resumen del Prospecto?"
  back="Un Resumen del Prospecto es útil cuando te dice algo específico que puedes referenciar en el alcance que el prospecto reconocerá como interés real en ellos — no una plantilla. 'Vi tu publicación reciente en LinkedIn sobre los ciclos de ventas empresariales' es útil. 'Trabajas en ventas' no lo es."
/>

<FlipCard
  front="¿Qué hace que un Resumen del Prospecto sea una pérdida de tiempo?"
  back="Un resumen que contiene solo información pública que podrías haber encontrado en 30 segundos (nombre, título, empresa) no justifica su tiempo de investigación. El valor está en el disparador, el punto de conversación y la puntuación de ajuste al PCI — las cosas que requieren sintetizar múltiples fuentes."
/>

<FlipCard
  front="¿Cuánto tiempo debería tomar la investigación por prospecto?"
  back="Objetivo: 10-15 minutos por Resumen del Prospecto. Un AV con asistencia de IA (ChatGPT o Perplexity para resúmenes de empresas) puede llegar a 8-10 minutos. Más de 20 minutos significa que el POE no es suficientemente específico, o el prospecto es demasiado oscuro para investigar eficientemente."
/>

## La Plantilla del Resumen del Prospecto

<TemplateBuilder
title="Plantilla del Resumen del Prospecto"
persistKey="outsourcing-L5-brief"
sections={[
{
id: "contact",
title: "Datos de Contacto",
fields: [
{ id: "name", label: "Nombre Completo", placeholder: "ej., Priya Sharma", type: "text" },
{ id: "title", label: "Cargo Actual", placeholder: "ej., VP Operaciones de Ventas", type: "text" },
{ id: "company", label: "Empresa", placeholder: "ej., Rowantech", type: "text" },
{ id: "linkedin", label: "URL de LinkedIn", placeholder: "ej., linkedin.com/in/priyasharma", type: "text" },
{ id: "email", label: "Correo (si se encontró)", placeholder: "ej., priya@rowantech.com o [no encontrado]", type: "text" }
]
},
{
id: "company-context",
title: "Contexto de la Empresa",
fields: [
{ id: "size", label: "Tamaño de la Empresa (número de empleados)", placeholder: "ej., 50-100 empleados (estimación de LinkedIn)", type: "text" },
{ id: "industry", label: "Industria", placeholder: "ej., SaaS B2B — Tech de Ventas", type: "text" },
{ id: "funding", label: "Etapa de Financiamiento (si aplica)", placeholder: "ej., Serie A ($8M, dic 2025) — Crunchbase", type: "text" },
{ id: "recent-news", label: "Noticias Recientes de la Empresa (últimos 90 días)", placeholder: "ej., Lanzaron nuevo nivel empresarial en enero. Publicaron 3 vacantes enfocadas en ventas este mes.", type: "textarea" }
]
},
{
id: "trigger",
title: "Disparador de Investigación",
fields: [
{ id: "trigger-type", label: "Tipo de Disparador", placeholder: "ej., Cambio de Trabajo / Financiamiento / Lanzamiento de Producto / Publicación Reciente / Aparición en Podcast / Señal de Contratación", type: "text" },
{ id: "trigger-detail", label: "Detalle del Disparador (específico y con fuente)", placeholder: "ej., Priya se unió a Rowantech hace 3 meses desde Salesforce (LinkedIn). Este es su primer rol de VP.", type: "textarea" },
{ id: "source", label: "Enlace(s) de Fuente", placeholder: "ej., linkedin.com/in/priyasharma, crunchbase.com/rowantech", type: "textarea" }
]
},
{
id: "outreach",
title: "Inteligencia de Alcance",
fields: [
{ id: "icp-score", label: "Puntuación de Ajuste al PCI (1-10)", placeholder: "ej., 8/10 — Coincide en tamaño de empresa, industria, señales de contratación. Reducido por etapa de presupuesto poco clara.", type: "text" },
{ id: "talking-point", label: "Punto de Conversación Sugerido", placeholder: "ej., 'Noté que te uniste a Rowantech hace tres meses desde Salesforce — los nuevos roles de VP a menudo vienen con un mandato de arreglar problemas de pipeline heredados. Encantado de compartir cómo ayudamos a dos VPs de SaaS en tu situación.'", type: "textarea" },
{ id: "objections", label: "Objeciones Probables", placeholder: "ej., 'Todavía estamos evaluando nuestras herramientas' (tenencia temprana), 'Acabamos de implementar algo' (estado del CRM desconocido)", type: "textarea" }
]
}
]}
/>

## Fuentes de Investigación: Orden de Prioridad

Tu AV debe trabajar a través de las fuentes en este orden. Las fuentes más tempranas son más rápidas y confiables. Las fuentes posteriores se usan solo cuando las fuentes anteriores no producen suficiente información:

<ProgressiveReveal title="Prioridad de Fuentes de Investigación del AV" persistKey="outsourcing-L5-sources">

<RevealSection title="Fuente 1: LinkedIn (Siempre Primero)">

**Por qué primero:** Más confiable, más actualizado, más relevante para el alcance B2B.

**Qué verificar:**

- Rol y cargo actuales (fecha de inicio — reciente = disparador de cambio de trabajo)
- Empresas y roles anteriores (contexto de trayectoria profesional)
- Publicaciones y actividad recientes (intereses, prioridades, qué comparten)
- Página de empresa (número de empleados, actividad reciente, vacantes abiertas)
- Conexiones mutuas (posibles caminos de presentación cálida)

**Presupuesto de tiempo:** 4-5 minutos por prospecto en LinkedIn.

**Disparador clave a encontrar:** Cambio de trabajo en los últimos 6 meses. Los nuevos VPs tienen 3-6 meses para demostrar resultados — están abiertos a herramientas que los ayuden a verse bien rápidamente.

</RevealSection>

<RevealSection title="Fuente 2: Sitio Web de la Empresa">

**Por qué:** El sitio web de la empresa revela posicionamiento, prioridades de mensajes y en qué se enfoca la empresa ahora mismo.

**Qué verificar:**

- Página Acerca de (misión, equipo, historia de fundación)
- Blog (publicaciones recientes, temas en los que publican)
- Página de prensa/noticias (anuncios, lanzamientos, alianzas)
- Página de empleos (qué roles están abiertos — un aumento de contratación en ventas señala crecimiento + presupuesto)

**Presupuesto de tiempo:** 3-4 minutos. Enfocarse en blog y empleos — estos cambian más frecuentemente.

**Disparador clave a encontrar:** Lanzamiento de producto, anuncio de alianza, contratación importante o crecimiento agresivo del equipo de ventas.

</RevealSection>

<RevealSection title="Fuente 3: Google Noticias / Búsqueda">

**Por qué:** Presenta noticias que las empresas no anuncian en su propio sitio web.

**Formato de búsqueda:** "[Nombre de empresa] noticias 2025" y "[Nombre completo del prospecto] [empresa]"

**Qué buscar:** Menciones en prensa, apariciones en podcasts, premios de la industria, casos de éxito de clientes en los que aparecieron, presentaciones en eventos.

**Presupuesto de tiempo:** 2-3 minutos.

</RevealSection>

<RevealSection title="Fuente 4: Crunchbase (Para Empresas Financiadas)">

**Por qué:** Los datos de financiamiento te dicen la etapa del presupuesto y la velocidad de crecimiento.

**Qué verificar:** Historial y fechas de financiamiento, total recaudado, nombres de inversores, tendencia de número de empleados.

**Disparadores:**

- Recaudación en los últimos 12 meses → Modo de crecimiento, probablemente gastando en herramientas
- Serie A o B → Fase de inversión en infraestructura de ventas
- Inversores de tech de ventas conocidos recientemente contratados → Señal de inversión planificada en ventas

**Presupuesto de tiempo:** 1-2 minutos — solo verificar la página del resumen.

</RevealSection>

<RevealSection title="Fuente 5: Síntesis Asistida por IA (Perplexity o ChatGPT)">

**Por qué:** Resume información pública rápidamente para que el AV pueda avanzar más rápido.

**Plantilla de prompt para el AV:** "Investiga [Nombre de Empresa]. Dame: 1) Lo que hacen en una oración. 2) Tamaño de empresa y etapa de financiamiento si es público. 3) Cualquier noticia significativa de los últimos 90 días. Máximo 100 palabras y cita fuentes."

**Regla crítica:** El AV debe verificar cada afirmación generada por IA contra una fuente primaria antes de ingresarla en el Resumen del Prospecto. Las alucinaciones de IA sobre rondas de financiamiento o tamaño de empresa son vergonzosas en el alcance.

**Presupuesto de tiempo:** 1-2 minutos con verificación. Esto complementa las fuentes 1-4, nunca las reemplaza.

</RevealSection>

</ProgressiveReveal>

## El Flujo de Trabajo de Investigación en Lotes

La investigación individual es ineficiente. Aquí está el sistema que convierte la investigación en una operación predecible y programada en lugar de una tarea ad hoc:

<SlideNavigation>
<Slide title="Lunes: El Fundador Proporciona la Lista">

Cada lunes por la mañana, le das a tu AV una lista de 10-20 prospectos para investigar durante la semana. Esta lista puede provenir de:

- Tu hoja de cálculo de prospección del PCI (construida en el Curso 40)
- Leads guardados de LinkedIn Sales Navigator
- Listas de asistentes de eventos o webinars
- Referencias cálidas de tu red
- Leads entrantes que necesitan investigación antes de que respondas

Formato: Nombre, Empresa, URL de LinkedIn (si se conoce), cualquier contexto que ya tengas.

Lo envías a tu AV vía Slack o una Google Sheet compartida.

</Slide>

<Slide title="Martes-Miércoles: El AV Investiga y Entrega Resúmenes">

El AV trabaja a través de la lista usando el POE de investigación. Cada resumen toma 10-15 minutos. Una lista de 10 prospectos toma 2-3 horas.

El AV entrega resúmenes completados para el miércoles al final del día en tu formato acordado — ya sea una base de datos de Notion, una Google Sheet, o directamente en tu CRM como registros de contactos enriquecidos.

**Verificación de calidad antes de la entrega:** El AV revisa cada resumen contra los estándares de calidad (todos los campos requeridos completados, el disparador tiene un enlace de fuente, el punto de conversación sugerido es específico no genérico).

</Slide>

<Slide title="Jueves-Viernes: El Fundador Revisa y Personaliza el Alcance">

Revisas los resúmenes y escribes alcance usando los puntos de conversación como inspiración — no como copiar y pegar. Tu AV ha hecho la investigación; tú añades tu voz.

Para cualquier resumen que necesite investigación adicional (el prospecto no está en LinkedIn, la empresa es privada con presencia en línea mínima), los marcas de vuelta al AV con preguntas específicas.

Si la calidad del resumen es consistentemente inferior al estándar en ciertas áreas (puntuación del PCI demasiado generosa, puntos de conversación demasiado genéricos), actualizas el POE con ejemplos más claros en lugar de dar comentarios generales.

</Slide>
</SlideNavigation>

## Puntuación de Ajuste al PCI: Enseña a Tu AV Tus Criterios

La Puntuación de Ajuste al PCI (1-10) solo es útil si tu AV puntúa contra criterios consistentes. La puntuación vaga ("parece un buen ajuste") no tiene valor. Los criterios específicos ("restar 2 puntos si la empresa tiene menos de 10 empleados") tienen valor.

<ConceptReframe
concept="Puntuación de Ajuste al PCI"
defaultLens="solo-founder"
lenses={[
{
id: "solo-founder",
label: "Perspectiva del Fundador Solo",
explanation: "Conoces tu PCI intuitivamente — puedes sentir si un prospecto es correcto en 30 segundos. Pero tu AV no tiene esa intuición. La puntuación del PCI te obliga a hacer explícito tu instinto, para que tu AV pueda aplicarlo consistentemente. Un AV con criterios de puntuación claros produce listas de prospectos mejor calificados de lo que podrías producir solo a escala."
},
{
id: "va",
label: "Perspectiva del AV",
explanation: "Sin criterios explícitos, cada decisión de puntuación requiere juicio que solo tiene el fundador. Esto significa que el AV puntúa incorrectamente o hace preguntas constantemente. Los criterios claros del PCI (rango de tamaño de empresa, industria, nivel de cargo, stack tecnológico, señales de crecimiento) permiten al AV puntuar con confianza sin interrumpir al fundador por cada caso marginal."
},
{
id: "scale",
label: "A Escala",
explanation: "Cuando tu AV investiga 50+ prospectos por semana, la puntuación inconsistente del PCI significa que gastas tu sesión de revisión del jueves re-calificando a todos en lugar de escribir alcance. Los criterios consistentes significan que la sesión del jueves es revisar resúmenes, no rehacer investigación. Esta es la diferencia entre un sistema y una tarea."
}
]}
/>

Usa esto para definir tus criterios de puntuación del PCI para tu AV:

<TemplateBuilder
title="Criterios de Puntuación del PCI para Tu AV"
persistKey="outsourcing-L5-icp"
sections={[
{
id: "positive",
title: "Señales de Puntuación Positiva (+1 a +3 puntos cada una)",
fields: [
{ id: "size", label: "Rango de Tamaño de Empresa que Gana Puntos", placeholder: "ej., 10-100 empleados = +2 puntos. 100-500 = +1 punto.", type: "text" },
{ id: "industry", label: "Industrias que Ganan Puntos", placeholder: "ej., SaaS B2B = +2. Servicios profesionales = +1.", type: "text" },
{ id: "role", label: "Roles/Títulos que Ganan Puntos", placeholder: "ej., VP de Ventas, CRO, Director de Ingresos = +2. Gerente de Ventas = +1.", type: "text" },
{ id: "triggers", label: "Señales de Crecimiento que Ganan Puntos", placeholder: "ej., Financiamiento reciente = +2. Aumento de contratación en ventas = +2. Nueva dirección = +1.", type: "text" }
]
},
{
id: "negative",
title: "Señales de Puntuación Negativa (-1 a -3 puntos cada una)",
fields: [
{ id: "too-small", label: "Señales de Empresa que Pierden Puntos", placeholder: "ej., Menos de 5 empleados = -3. Sin página de empresa en LinkedIn = -1.", type: "text" },
{ id: "wrong-stage", label: "Señales de Etapa que Pierden Puntos", placeholder: "ej., Pre-ingresos = -2. Sin función de ventas visible = -1.", type: "text" },
{ id: "wrong-role", label: "Señales de Rol que Pierden Puntos", placeholder: "ej., Contribuidor individual (sin autoridad de presupuesto) = -2.", type: "text" }
]
}
]}
/>

## Estándares de Calidad: Cómo Luce "Buena Investigación"

<SwipeDecision
title="Buen Resumen vs. Resumen Deficiente"
description="Revisa cada resultado de investigación y juzga: ¿calidad aceptable o necesita revisión?"
optionA="Necesita Revisión"
optionB="Calidad Aceptable"
persistKey="outsourcing-L5-swipe"
cards={[
{ id: "1", content: "Punto de conversación sugerido: 'Noté que trabajas en ventas en una empresa en crecimiento. Ayudamos a equipos de ventas como el tuyo a mejorar su proceso.'", correctOption: "a", explanation: "Esto es completamente genérico — podría aplicar a cualquier profesional de ventas en cualquier empresa. No es aceptable. El punto de conversación debe referenciar algo específico de esta persona." },
{ id: "2", content: "Punto de conversación sugerido: 'Noté que publicaste la semana pasada sobre la precisión de las previsiones de pipeline — trabajamos con una empresa SaaS de etapa similar que redujo la varianza de previsión en un 40%. Encantado de compartir qué cambió.'", correctOption: "b", explanation: "Específico, con fuente (publicación de LinkedIn), relevante. Esto muestra investigación real y da al prospecto una razón para responder." },
{ id: "3", content: "Disparador reciente: 'La empresa está creciendo.' Fuente: N/A.", correctOption: "a", explanation: "No aceptable. 'La empresa está creciendo' sin fuente es conjetura, no investigación. El disparador debe tener un enlace de fuente específico — una ronda de financiamiento de Crunchbase, una página de empleos de LinkedIn que muestra nuevas vacantes, un comunicado de prensa." },
{ id: "4", content: "Puntuación del PCI: 8/10. Justificación: 'Empresa SaaS Serie B, 80 empleados, VP de Ventas contratado hace 3 meses. Restados 2 por stack tecnológico desconocido — no se puede confirmar el uso del CRM.'", correctOption: "b", explanation: "Esta es una buena puntuación — específica, referenciada a criterios, honesta sobre lo que se desconoce. El AV está aplicando la rúbrica de puntuación, no adivinando." },
{ id: "5", content: "Resumen del Prospecto completado en 8 minutos. Todos los campos completados. Disparador con fuente de actividad de LinkedIn. Puntuación del PCI incluye razonamiento.", correctOption: "b", explanation: "Eficiente y completo. Esto es lo que produce un AV entrenado para la semana tres." }
]}
/>

## Investigación Asistida por IA: Velocidad Sin Sacrificar Precisión

Tu AV puede usar herramientas de IA para acelerar la investigación — pero solo con requisitos estrictos de verificación:

<InsightCard icon="🤖" title="La Combinación AV + IA en Investigación">
Perplexity o ChatGPT pueden resumir el contexto de una empresa en 60 segundos. Eso es 3-4 minutos de tiempo de navegación del AV ahorrados por prospecto. Pero los modelos de IA alucinan rondas de financiamiento, tamaños de empresas y detalles del personal. La regla es: la IA genera el borrador, el AV verifica cada afirmación factual contra una fuente primaria antes de que entre en el Resumen del Prospecto.
</InsightCard>

<MiniRoleplay
  scenario="Tu AV te contacta en Slack: 'Investigué TechCorp usando ChatGPT y dice que recaudaron una Serie A de $12M en 2024. Pero no puedo encontrar un comunicado de prensa o entrada de Crunchbase que confirme esto. ¿Debo incluirlo en el resumen?'"
  role="Tú (el fundador)"
  persistKey="outsourcing-L5-roleplay"
  modelResponse="No incluyas información de financiamiento no verificada. Si no puedes encontrar una fuente primaria (Crunchbase, TechCrunch, comunicado de prensa de la empresa o presentación ante la SEC) que confirme la ronda de financiamiento, márcala como 'Financiamiento: No confirmado públicamente'. Puedes notar que ChatGPT sugirió una Serie A pero no se pudo verificar. Nunca ponemos afirmaciones financieras no verificadas en material de alcance — si el prospecto sabe que es incorrecto, perdemos credibilidad inmediatamente. Para este resumen, usa el tamaño de la empresa y las señales de crecimiento que puedes verificar desde su página de empleos de LinkedIn y sitio web."
/>

<InteractiveChecklist
title="Tus Acciones Antes de la Lección 6"
persistKey="outsourcing-L5-actions"
items={[
"Completa tu plantilla del Resumen del Prospecto en el TemplateBuilder arriba",
"Define tus Criterios de Puntuación del PCI con valores de puntos específicos para cada señal",
"Escribe la lista de prioridad de fuentes de investigación para tu AV (qué fuentes verificar, en qué orden)",
"Establece tus estándares de calidad: ¿cómo luce un resumen inaceptable vs. uno aceptable?",
"Crea tu formato de solicitud de investigación del lunes (cómo enviarás la lista de prospectos a tu AV cada semana)",
"Lee la Lección 6 para aprender cómo contratar, incorporar y gestionar tu AV sin microgestionar"
]}
/>

## Lo Que Sigue

En la **Lección 6**, pasarás de los POEs a la ejecución: cómo escribir un anuncio de trabajo que atraiga candidatos calificados, cómo diseñar una tarea de prueba remunerada que filtre a los solicitantes y cómo ejecutar una incorporación de 4 semanas que lleva a tu AV al 90% de precisión sin que tengas que supervisar cada resultado.

Ahora tienes tres POEs. El siguiente paso es encontrar a la persona correcta para ejecutarlos.
