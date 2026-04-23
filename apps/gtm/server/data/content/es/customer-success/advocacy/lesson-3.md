---
title: "Mini Casos de Estudio: Desafío → Solución → Resultados"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 39: Promoción del Cliente"
lesson: 3
---

Has recolectado algunos testimonios. Buen comienzo. Pero aquí está el problema: una cita de dos oraciones no cuenta una _historia_. Y las historias son lo que mueve a los compradores de "interesante" a "lo necesito."

Un fundador llamado Carlos aprendió esto por las malas. Tenía 12 testimonios brillantes en su sitio web. Elogios genéricos: "¡Gran producto!" "¡Muy recomendado!" "¡Cinco estrellas!" Su tasa de conversión? 2.1%.

Luego reescribió solo tres de esos testimonios como mini casos de estudio — 300 palabras cada uno, siguiendo el marco de Desafío → Solución → Resultados. Los mismos clientes. Los mismos resultados. Diferente formato.

Su tasa de conversión saltó a 4.7% en 30 días.

¿La diferencia? **La especificidad gana al elogio.** Los compradores no confían en "resultados increíbles." Confían en "redujimos el churn de 8% a 3% en 90 días, ahorrando $4,500/mes (unos $90,000 MXN)."

Hoy vas a aprender a escribir mini casos de estudio que convierten. No PDFs de 2,000 palabras que nadie lee. Historias cortas, contundentes y medibles que puedes desplegar en todas partes: tu sitio web, correos de ventas, propuestas, publicaciones de LinkedIn, presentaciones de webinars.

Al final de esta lección, tendrás una plantilla reutilizable y tres borradores de casos de estudio listos para enviar a aprobación del cliente.

---

## El Formato de Mini Caso de Estudio

Olvida el manual corporativo de casos de estudio. No estás escribiendo un whitepaper. Estás escribiendo una historia de 200-400 palabras con tres secciones:

1. **Desafío** — Con qué luchaban antes de ti
2. **Solución** — Lo que hiciste (o lo que hicieron con tu producto)
3. **Resultados** — Resultados medibles con números específicos

Eso es todo. Sin resumen ejecutivo. Sin antecedentes de la empresa. Sin lista de funcionalidades. Solo la transformación.

<FlipCard
  front="¿Por qué 200-400 palabras?"
  back="Los mini casos de estudio se leen 5x más que los casos de estudio completos (1,500+ palabras). La atención es corta. La especificidad importa más que la extensión."
/>

<InsightCard icon="📊" title="Los Datos de Conversión">
Los casos de estudio con métricas específicas convierten **3x mejor** que los que no tienen. "Aumentó los ingresos en un 40%" gana siempre a "vio excelentes resultados."
</InsightCard>

Aquí está la plantilla que usarás:

<TemplateBuilder
title="Plantilla de Mini Caso de Estudio"
persistKey="advocacy-L3-template"
sections={[
{
id: "header",
title: "Encabezado",
fields: [
{ id: "customer", label: "Nombre del Cliente (o Descripción Anónima)", placeholder: "ej., 'Un fundador de SaaS B2B' o 'Ana García, VP de Marketing en TechCo'", type: "text" }
]
},
{
id: "challenge",
title: "Desafío (2-3 oraciones)",
fields: [
{ id: "situation", label: "Su situación antes de tu producto/servicio", placeholder: "Describe el problema que enfrentaban. Usa sus palabras del formulario de testimonios donde sea posible.", type: "textarea" }
]
},
{
id: "solution",
title: "Solución (2-3 oraciones)",
fields: [
{ id: "approach", label: "Lo que hiciste o lo que hicieron con tu producto", placeholder: "Enfócate en el enfoque y la metodología, no en nombres de funcionalidades. ej., 'Implementamos un sistema de incorporación de 90 días' no 'Usaron la Función X.'", type: "textarea" }
]
},
{
id: "results",
title: "Resultados (2-3 oraciones)",
fields: [
{ id: "metrics", label: "Resultados específicos y cuantificables", placeholder: "ej., 'En 90 días, redujeron el churn de 8% a 3% mensual, ahorrando $4,500/mes en ingresos perdidos.'", type: "textarea" }
]
},
{
id: "quote",
title: "Cita (1 oración)",
fields: [
{ id: "testimonial", label: "Cita directa del cliente", placeholder: "Toma de la pregunta #3 del formulario de testimonio: '¿Qué le dirías a alguien que está considerando [producto]?'", type: "text" }
]
}
]}
/>

---

## Sección de Desafío: Hazla Identificable

La sección de Desafío hace dos trabajos:

1. **Describe la situación del cliente antes de ti** — su dolor, su lucha, sus intentos fallidos
2. **La hace identificable para tu ICP** — los lectores deberían pensar "Esa es exactamente mi situación"

<ExampleCard label="Sección de Desafío Débil">
"El cliente estaba luchando con sus esfuerzos de marketing y no estaba viendo resultados."

**Por qué falla:** Vaga. Sin específicos. Podría aplicar a cualquiera.
</ExampleCard>

<ExampleCard label="Sección de Desafío Fuerte">
"Antes de trabajar con nosotros, la agencia de Ana creaba manualmente reportes de clientes cada mes — un proceso que tomaba 12-15 horas por cliente. Con 8 clientes activos, estaba dedicando casi 3 días completos solo a reportes, dejando casi nada de tiempo para trabajo estratégico o desarrollo de nuevos negocios."

**Por qué funciona:** Rol específico (dueña de agencia), dolor específico (reportes manuales), impacto específico (3 días/mes perdidos), identificable para otros dueños de agencias.
</ExampleCard>

Las mejores secciones de Desafío **usan las propias palabras del cliente** de tu formulario de testimonios (pregunta #1: "¿Cuál era tu mayor desafío antes de trabajar con nosotros?"). No lo inventes. Cítalos y luego pulir para claridad.

<RangeSlider
  label="¿Qué tan específica es tu sección de Desafío típica?"
  min={1}
  max={10}
  lowLabel="Muy vaga"
  highLabel="Extremadamente específica"
  persistKey="advocacy-L3-challenge-specificity"
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Resiste la tentación de describir el problema técnico. Describe el **impacto en el negocio** del problema técnico. "Su API era lenta" → "Su página de checkout tardaba 8 segundos en cargar, causando 40% de abandono de carrito."
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches/Consultores">
Tu sección de Desafío debería describir la **lucha emocional o estratégica**, no solo el problema táctico. "Se sentía abrumado por ingresos inconsistentes" gana a "No tenía un proceso de ventas."
</ContextualNote>

---

## Sección de Solución: Enfócate en el Enfoque, No en las Funcionalidades

La sección de Solución es donde la mayoría de los fundadores se equivocan. Listan funcionalidades. Describen su producto. Hablan de sí mismos.

**Enfoque incorrecto:**
"Les proporcionamos nuestro panel de análisis avanzado, herramientas de reportes automatizados e integraciones personalizadas."

**Enfoque correcto:**
"Implementamos un sistema de incorporación de 30 días donde el equipo de Ana aprendió a automatizar su flujo de trabajo de reportes. En lugar de extraer datos manualmente de 5 herramientas diferentes, ahora todo fluye a un solo panel que genera reportes listos para el cliente en menos de 10 minutos."

¿La diferencia? **Metodología sobre funcionalidades.** Describe _qué pasó_, no _qué tienes_.

<FlipCard
  front="¿Por qué evitar nombres de funcionalidades?"
  back="A los compradores no les importa la 'Función X.' Les importan los resultados. Describe la transformación, no la herramienta."
/>

<RewriteExercise
title="Reescribe Esta Solución Cargada de Funcionalidades"
persistKey="advocacy-L3-rewrite-solution"
original="Les dimos acceso a nuestro motor de calificación de leads impulsado por IA, secuencias de correos automatizadas e integración con CRM."
hint="Enfócate en lo que _hicieron_ con esas herramientas, no cómo se llaman"
expertRewrite="Les ayudamos a construir un sistema de calificación de leads que automáticamente puntúa leads entrantes basándose en ajuste e intención, y luego envía los prospectos de alta prioridad directamente a su equipo de ventas. Los correos de seguimiento ahora se envían automáticamente basándose en el comportamiento del prospecto, liberando 10 horas por semana que antes se invertían en contacto manual."
criteria={["Describe el proceso o la metodología", "Se enfoca en lo que el cliente hizo", "Evita jerga de funcionalidades"]}
/>

Tu sección de Solución debería responder: **"¿Qué cambió en su flujo de trabajo o enfoque?"**

---

## Sección de Resultados: Los Números Ganan

Esta es la sección más importante. Las afirmaciones vagas pierden. Las métricas específicas ganan.

<InsightCard icon="🎯" title="La Regla de Especificidad">
"Aumentó los ingresos" es débil. "Aumentó los ingresos en un 40% en 90 días, de $10K a $14K MRR (de $200K a $280K MXN mensual)" es fuerte. Especificidad = credibilidad.
</InsightCard>

Esto es lo que hace una sección de Resultados fuerte:

1. **Números específicos** — porcentajes, montos en dólares/pesos, tiempo ahorrado, usuarios adquiridos
2. **Marco temporal** — "en 90 días" o "en 6 meses"
3. **Contexto** — "de X a Y" o "ahorrando $Z por mes"

<SlideNavigation>
<Slide title="Ejemplos de Resultados Fuertes">

**Ejemplo 1 (SaaS):**
"En 90 días, Ana redujo el churn de 8% a 3% mensual, ahorrando aproximadamente $4,500/mes (unos $90,000 MXN) en ingresos perdidos. Su equipo ahora dedica 15 horas menos por mes en reportes manuales."

**Ejemplo 2 (Coaching):**
"Después de implementar el marco, Carlos cerró 5 nuevos clientes en 60 días — arriba de 1-2 por trimestre anteriormente. Su tamaño promedio de trato aumentó de $3,000 a $5,500 (de $60,000 a $110,000 MXN)."

**Ejemplo 3 (Creador de Contenido):**
"En 4 meses, Valentina creció de 800 a 4,200 suscriptores de correo. Su lanzamiento de curso generó $18,000 en ingresos (unos $360,000 MXN) — 3x su mejor lanzamiento anterior."

</Slide>

<Slide title="Ejemplos de Resultados Débiles (y Por Qué)">

**Ejemplo 1:** "Vieron excelentes resultados y estaban muy contentos."
**Por qué falla:** Sin números. Sin específicos. Puro relleno.

**Ejemplo 2:** "Los ingresos aumentaron significativamente."
**Por qué falla:** "Significativamente" no dice nada. ¿Cuánto? ¿En qué período?

**Ejemplo 3:** "Ahorraron mucho tiempo."
**Por qué falla:** "Mucho" es subjetivo. ¿2 horas? ¿20 horas? Sé específico.

</Slide>
</SlideNavigation>

<ClassifyExercise
title="Clasifica Estas Declaraciones de Resultados"
persistKey="advocacy-L3-classify-results"
categories={[
{ id: "strong", label: "Fuerte (Específico)", color: "#10b981" },
{ id: "weak", label: "Débil (Vago)", color: "#ef4444" }
]}
items={[
{ id: "1", content: "Redujo el costo de adquisición de clientes en 35% en 6 meses, de $450 a $292 por cliente", correctCategory: "strong" },
{ id: "2", content: "Vio un rendimiento mejorado en todas las áreas", correctCategory: "weak" },
{ id: "3", content: "Aumentó las tasas de apertura de correo de 18% a 31% en 90 días", correctCategory: "strong" },
{ id: "4", content: "Obtuvo mejores resultados que antes", correctCategory: "weak" },
{ id: "5", content: "Cerró 8 tratos en Q1 (arriba de 3 en Q4), generando $47K en nuevo ARR", correctCategory: "strong" },
{ id: "6", content: "Los clientes estaban mucho más contentos", correctCategory: "weak" }
]}
/>

Si no tienes números exactos, **pregúntale al cliente**. La mayoría están felices de compartir si explicas que estás escribiendo un caso de estudio. Si no pueden compartir cifras exactas, usa rangos: "aumentó los ingresos entre 30-40%" o "ahorró 10-15 horas por semana."

---

## El Proceso de Aprobación del Cliente

Has escrito el borrador. Ahora viene el paso crítico: **aprobación del cliente**.

Nunca publiques un caso de estudio sin permiso explícito por escrito. Incluso si el cliente te dio un testimonio, un caso de estudio es más detallado y público. Obtén el visto bueno.

<ProgressiveReveal title="El Flujo de Aprobación en 5 Pasos" persistKey="advocacy-L3-approval-workflow">

<RevealSection title="Paso 1: Escribe el Borrador">
Usa la plantilla. Toma de sus respuestas de testimonios. Agrega métricas específicas de tus registros o preguntándoles directamente.
</RevealSection>

<RevealSection title="Paso 2: Envía para Aprobación">
Asunto del correo: "Aprobación rápida necesaria: Tu borrador de caso de estudio"

Cuerpo del correo:
"Hola [Nombre], escribí tu historia como un mini caso de estudio para compartir con otros que están en la misma situación en la que estabas. ¿Podrías revisar este borrador y decirme si es preciso? Siéntete libre de sugerir cualquier edición. [Adjuntar borrador o pegar en línea]"
</RevealSection>

<RevealSection title="Paso 3: Maneja las Ediciones">
La mayoría de los clientes aprobarán tal cual o sugerirán ajustes menores. Algunos querrán anonimizar (usar "un fundador de SaaS B2B" en lugar de su nombre). Respeta eso.
</RevealSection>

<RevealSection title="Paso 4: Obtén Confirmación Escrita">
Una vez que aprueben, pregunta: "¿Tengo tu permiso para publicar esto en nuestro sitio web y usarlo en materiales de marketing?"

Guarda su correo de "sí" en archivo. Esta es tu protección legal.
</RevealSection>

<RevealSection title="Paso 5: Publica y Despliega">
Agrega a tu sitio web, biblioteca de prueba social, materiales de ventas y cualquier otro lugar donde necesites credibilidad.
</RevealSection>

</ProgressiveReveal>

<InsightCard icon="⚖️" title="La Regla de Ética">
Puedes corregir gramática, ajustar el lenguaje y agregar contexto. **No puedes** cambiar el significado, inflar resultados o agregar afirmaciones que no hicieron. En caso de duda, pregunta.
</InsightCard>

---

## Desplegando Casos de Estudio en Todas Partes

Un solo caso de estudio tiene 5-10 superficies de despliegue. No lo escribas y lo entierres en una página de "Casos de Estudio" que nadie visita.

<InteractiveChecklist
title="Lista de Despliegue de Caso de Estudio"
persistKey="advocacy-L3-deployment"
items={[
"Agregar a la página /casos-de-estudio del sitio web",
"Insertar en la secuencia de correos de ventas (resumen de 2 oraciones + enlace)",
"Incluir en propuestas como prueba social",
"Publicar en LinkedIn como historia (formato Desafío + Resultado)",
"Agregar al deck de webinar/presentación como diapositiva",
"Usar cita + resultado como bloque de testimonio en landing pages",
"Referenciar en llamadas de descubrimiento ('Trabajamos con un cliente en tu exacta situación...')",
"Agregar a materiales de incorporación para mostrar a nuevos clientes lo que es posible",
"Reutilizar como hilo de Twitter/X",
"Incluir en newsletter trimestral a clientes existentes"
]}
/>

<ExampleCard label="Formato de Publicación en LinkedIn">
**Historia de Desafío + Resultado:**

"Hace 6 meses, Ana dedicaba 3 días completos cada mes a crear reportes de clientes manualmente.

Hoy, genera esos mismos reportes en menos de 10 minutos.

Esto es lo que cambió: [enlace al caso de estudio completo]"

**Por qué funciona:** Engancha con el dolor, entrega el resultado, invita al clic.
</ExampleCard>

<ExampleCard label="Inserción en Correo de Ventas">
"Recientemente trabajé con una dueña de agencia en una situación similar — dedicaba 12-15 horas por cliente en reportes mensuales. Le ayudamos a automatizar ese proceso, y ahora genera reportes listos para el cliente en menos de 10 minutos. [Enlace al caso de estudio completo]"

**Por qué funciona:** Te posiciona como alguien que ha resuelto este mismo problema antes. Construye confianza a través de la especificidad.
</ExampleCard>

---

## Construcción Guiada: Escribe Tu Primer Mini Caso de Estudio

Es hora de crear tu primer borrador. Usarás un cliente real (o uno hipotético si aún no has lanzado).

<ComparisonBuilder
title="Tu Mini Caso de Estudio vs. Ejemplo Experto"
persistKey="advocacy-L3-case-study-build"
prompt="Escribe un mini caso de estudio para uno de tus clientes usando el formato Desafío → Solución → Resultados. Apunta a 200-400 palabras en total."
expertExample="**Ana García, Dueña de Agencia**

**Desafío:**
Antes de trabajar con nosotros, la agencia de Ana creaba manualmente reportes de clientes cada mes — un proceso que tomaba 12-15 horas por cliente. Con 8 clientes activos, dedicaba casi 3 días completos solo a reportes, sin dejar casi nada de tiempo para trabajo estratégico o desarrollo de nuevos negocios.

**Solución:**
Implementamos un sistema de incorporación de 30 días donde el equipo de Ana aprendió a automatizar su flujo de trabajo de reportes. En lugar de extraer datos manualmente de 5 herramientas diferentes, ahora todo fluye a un solo panel que genera reportes listos para el cliente en menos de 10 minutos.

**Resultados:**
En 90 días, Ana redujo el tiempo de reportes de 96 horas/mes a 8 horas/mes — una reducción del 92%. Reinvirtió ese tiempo en trabajo estratégico con clientes y desarrollo de nuevos negocios, cerrando 3 nuevos clientes que representan $15,000/mes (unos $300,000 MXN) en ingresos adicionales.

**Cita:**
'Era escéptica de que la automatización pudiera igualar la calidad de nuestros reportes manuales, pero los resultados hablan por sí solos. Mi equipo está más contento, los clientes obtienen mejores insights, y finalmente tengo tiempo para hacer crecer el negocio en lugar de solo mantenerlo.'"
criteria={[
"La sección de Desafío usa detalles específicos (no dolor vago)",
"La sección de Solución se enfoca en enfoque/metodología (no funcionalidades)",
"La sección de Resultados incluye métricas específicas con marcos temporales",
"La cita se siente auténtica y aborda una objeción común",
"La extensión total es de 200-400 palabras"
]}
/>

<LinterFeedback
title="Linter de Caso de Estudio: Evalúa Tu Borrador"
persistKey="advocacy-L3-linter"
inputLabel="Pega tu borrador de caso de estudio"
rules={[
{
id: "specificity",
label: "Especificidad",
description: "Incluye números específicos, marcos temporales y contexto",
keywords: ["90 días", "40%", "de", "a", "$", "horas"],
antiKeywords: ["excelentes resultados", "significativamente", "mucho", "muy"]
},
{
id: "customer-voice",
label: "Voz del Cliente",
description: "Usa las propias palabras del cliente en las secciones de Desafío y Cita",
keywords: ["yo estaba", "nosotros estábamos", "nuestro equipo"],
antiKeywords: []
},
{
id: "approach-focus",
label: "Enfoque en el Enfoque",
description: "La sección de Solución describe metodología, no funcionalidades",
keywords: ["implementamos", "sistema", "proceso", "flujo de trabajo"],
antiKeywords: ["función", "herramienta", "plataforma", "dashboard"]
},
{
id: "length",
label: "Extensión",
description: "200-400 palabras en total",
keywords: [],
antiKeywords: []
}
]}
/>

---

## Manejando Objeciones Comunes

Algunos clientes dudarán cuando les pidas convertir su testimonio en un caso de estudio. Así es como manejar las objeciones más comunes:

<SlideNavigation>
<Slide title="'No quiero que mis competidores sepan que estoy usando esto'">

**Respuesta:**
"Totalmente entendido. Podemos anonimizarlo — en lugar de tu nombre y empresa, usaríamos algo como 'un fundador de SaaS B2B' o 'una agencia de tamaño mediano.' Tú aprobarás la versión final antes de que se publique."

**Por qué funciona:** Respeta su preocupación mientras preserva el valor del caso de estudio.

</Slide>

<Slide title="'No estoy seguro de poder compartir números específicos'">

**Respuesta:**
"Sin problema. Podemos usar rangos en lugar de cifras exactas — como 'aumentó los ingresos entre 30-40%' o 'ahorró 10-15 horas por semana.' O podemos enfocarnos en métricas no financieras como tiempo ahorrado, satisfacción del cliente o mejoras de proceso."

**Por qué funciona:** Ofrece flexibilidad mientras mantiene la especificidad.

</Slide>

<Slide title="'No tengo tiempo para revisar un caso de estudio'">

**Respuesta:**
"Yo escribiré todo el borrador basándome en lo que ya compartiste. Todo lo que necesitas hacer es leerlo (toma 2 minutos) y responder con 'se ve bien' o sugerir cualquier cambio. Yo me encargo de todo lo demás."

**Por qué funciona:** Minimiza su esfuerzo. Lo convierte en una tarea de 2 minutos, no un proyecto.

</Slide>

<Slide title="'¿Podemos esperar hasta que tengamos resultados aún mejores?'">

**Respuesta:**
"Definitivamente podemos actualizarlo después a medida que tus resultados mejoren. Pero la historia que tienes ahora ya es convincente — y nos ayuda a traer más clientes como tú. Siempre podemos publicar una 'Parte 2' más adelante."

**Por qué funciona:** Captura la victoria actual mientras deja espacio para futuras actualizaciones.

</Slide>
</SlideNavigation>

<MiniRoleplay
  scenario="Un cliente dice: 'No me siento cómodo compartiendo números específicos de ingresos públicamente.'"
  role="Tú eres el fundador respondiendo"
  persistKey="advocacy-L3-roleplay-numbers"
  modelResponse="Totalmente entendido — podemos usar porcentajes o rangos en su lugar. Por ejemplo, 'aumentó los ingresos en un 35%' o 'creció de un rango de $X a $Y.' O podemos enfocarnos en métricas no financieras como tiempo ahorrado o adquisición de clientes. Tú aprobarás la versión final antes de que se publique, así que tienes control total."
/>

---

## Resumen: Tu Sistema de Casos de Estudio

Ahora tienes un sistema repetible para convertir testimonios en mini casos de estudio:

1. **Usa la plantilla de Desafío → Solución → Resultados** (200-400 palabras)
2. **Toma de las respuestas de testimonios** — especialmente la pregunta #1 (Desafío) y la #2 (Resultados)
3. **Agrega métricas específicas** — números, marcos temporales, contexto
4. **Envía para aprobación** — nunca publiques sin permiso escrito
5. **Despliega en todas partes** — sitio web, correos, propuestas, LinkedIn, webinars

<InteractiveChecklist
title="Tus Elementos de Acción"
persistKey="advocacy-L3-actions"
items={[
"Identifica 3 clientes con resultados fuertes para convertir en casos de estudio",
"Escribe el primer borrador de 1 mini caso de estudio usando la plantilla",
"Pasa el borrador por el Linter de Caso de Estudio",
"Envía el borrador al cliente para aprobación",
"Una vez aprobado, despliega en al menos 3 superficies (sitio web, correo, LinkedIn)",
"Programa recolección trimestral de casos de estudio (agregar al calendario)"
]}
/>

En la próxima lección, aprenderás a recolectar **testimonios en video** con presupuesto limitado usando Loom, VideoAsk y Zoom. Los testimonios en video son 2x más persuasivos que los escritos — y no necesitas un equipo de producción para crearlos.

---

## Quiz: Prueba Tu Comprensión

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuál es la extensión ideal para un mini caso de estudio?",
      "options": [
        "50-100 palabras",
        "200-400 palabras",
        "1,000-1,500 palabras",
        "2,000+ palabras"
      ],
      "correctAnswer": 1,
      "explanation": "Los mini casos de estudio son de 200-400 palabras. Se leen 5x más que los casos completos (1,500+ palabras) mientras proporcionan suficiente detalle para ser persuasivos."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Cuál declaración de Resultados es la más fuerte?",
      "options": [
        "Vieron excelentes resultados y estaban muy contentos",
        "Los ingresos aumentaron significativamente",
        "Redujo el churn de 8% a 3% mensual en 90 días, ahorrando $4,500/mes",
        "El rendimiento mejoró en todas las áreas"
      ],
      "correctAnswer": 2,
      "explanation": "Las métricas específicas con marcos temporales y contexto son 3x más persuasivas que las afirmaciones vagas. 'Redujo el churn de 8% a 3% mensual en 90 días, ahorrando $4,500/mes' es concreto y medible."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "¿En qué debería enfocarse la sección de Solución?",
      "options": [
        "Nombres de funcionalidades y capacidades del producto",
        "La historia y credenciales de tu empresa",
        "El enfoque o metodología que usó el cliente",
        "Especificaciones técnicas e integraciones"
      ],
      "correctAnswer": 2,
      "explanation": "La sección de Solución debería describir el enfoque o metodología, no listar funcionalidades. A los compradores les importa qué cambió en el flujo de trabajo del cliente, no cómo se llama tu producto."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Puedes publicar un caso de estudio sin aprobación del cliente siempre que uses información que ya compartieron en un testimonio.",
      "correctAnswer": false,
      "explanation": "Falso. Siempre obtén permiso escrito antes de publicar un caso de estudio, incluso si el cliente te dio un testimonio. Un caso de estudio es más detallado y público. Obtén el visto bueno explícito."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "¿Cuántas superficies de despliegue debería tener un solo caso de estudio?",
      "options": [
        "1 (solo el sitio web)",
        "2-3 (sitio web y correo)",
        "5-10 (sitio web, correo, propuestas, LinkedIn, webinars, etc.)",
        "Los casos de estudio solo deberían vivir en una página dedicada"
      ],
      "correctAnswer": 2,
      "explanation": "Un solo caso de estudio debería desplegarse en 5-10 superficies: sitio web, correos de ventas, propuestas, publicaciones de LinkedIn, decks de webinar, landing pages y más. Maximiza el ROI de cada caso de estudio que crees."
    }
  ]
}
```
