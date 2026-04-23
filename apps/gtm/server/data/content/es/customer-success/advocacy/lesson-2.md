---
title: "Sistema de Recolección de Testimonios (Formulario de 2-3 Preguntas)"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 39: Promoción del Cliente"
lesson: 2
---

## El Canal de Marketing de $0 Que Estás Ignorando

Imagina esto: Acabas de ayudar a un cliente a reducir su churn de 8% a 3% mensual. Está encantado. Te dice que es "un cambio de vida" en una llamada de Zoom. Tú dices "¡Qué genial!" y... nada pasa.

Tres meses después, estás gastando $2,000 (unos $40,000 MXN) en anuncios de Facebook que convierten al 0.8%. Mientras tanto, ese cliente que llamó a tu trabajo "un cambio de vida" nunca le ha contado a nadie más sobre ti.

**Aquí está la brecha:** 83% de los clientes satisfechos están dispuestos a referir o proporcionar testimonios. Solo 29% realmente lo hacen. ¿La diferencia? Nadie les preguntó.

Hoy vas a construir un sistema de recolección de testimonios que funciona en piloto automático y cuesta exactamente $0. Al final de esta lección, tendrás:

- Un formulario de 3 preguntas que obtiene 40-60% de tasas de completado
- Plantillas de correo de solicitud que se sienten personales, no corporativas
- Un flujo de edición ético que convierte respuestas crudas en prueba social persuasiva
- Un sistema de publicación que despliega testimonios en 5+ superficies

Cerremos la brecha de preguntar.

---

## Por Qué la Mayoría de los Fundadores Complican los Testimonios

<InsightCard icon="🎯" title="El Precipicio de la Tasa de Completado">
Un formulario de testimonio de 3 preguntas obtiene 40-60% de completado. Uno de 10 preguntas obtiene 5-10%. Cada pregunta más allá de tres reduce tu tasa de respuesta a la mitad.
</InsightCard>

La mayoría de los fundadores creen que los testimonios requieren:

- Una encuesta de 15 preguntas
- Una entrevista profesional
- Revisión legal
- Un diseñador gráfico
- Semanas de ida y vuelta

**Realidad:** Los mejores testimonios vienen de un formulario de 2 minutos enviado en el momento correcto.

Esto es lo que realmente funciona:

<FlipCard
  front="La Fórmula de Testimonio de 3 Preguntas"
  back="1. ¿Cuál era tu mayor desafío antes? 2. ¿Qué resultado específico has logrado? 3. ¿Qué le dirías a alguien que está considerando esto?"
/>

Eso es todo. Tres preguntas. Dos minutos para completar. Sin relleno.

### Por Qué Esto Funciona

<SlideNavigation>
<Slide title="Pregunta 1: El Estado Anterior">

**"¿Cuál era tu mayor desafío antes de trabajar con nosotros?"**

Esta pregunta hace tres cosas:

1. Hace que el testimonio sea identificable para prospectos en la misma situación
2. Ancla los resultados "después" contra un "antes" concreto
3. Usa las propias palabras del cliente (que suenan más auténticas que las tuyas)

**Ejemplo de respuesta:**
"Estábamos rastreando manualmente los puntajes de salud de clientes en hojas de cálculo. Tomaba 4 horas cada lunes y aun así se nos escapaban señales de churn."

</Slide>

<Slide title="Pregunta 2: El Resultado Específico">

**"¿Qué resultado u resultado específico has logrado desde que empezaste?"**

La palabra "específico" está haciendo el trabajo pesado aquí. Empuja a los clientes hacia números, no alabanzas vagas.

**Genérico (débil):** "¡Ha sido genial!"
**Específico (fuerte):** "Redujimos el churn de 8% a 3% en 90 días, ahorrando $4,500/mes (unos $90,000 MXN)."

<InsightCard icon="📊" title="La Regla de Persuasión 2x">
Los testimonios con números específicos son 2x más persuasivos que los elogios genéricos. "Aumentamos los ingresos en un 40%" gana siempre a "realmente ayudó a nuestro negocio."
</InsightCard>

</Slide>

<Slide title="Pregunta 3: La Recomendación entre Pares">

**"¿Qué le dirías a alguien que está considerando [producto/servicio] ahora mismo?"**

Esta pregunta genera el contenido más citable porque está escrita _para tu prospecto_, no _sobre ti_.

**Por qué funciona:**

- Los clientes naturalmente escriben en segunda persona ("Si estás luchando con X, esto va a...")
- Abordan objeciones que tenían antes de comprar
- Hablan de par a par, que es la señal de mayor confianza

**Ejemplo:**
"Si todavía estás rastreando el churn manualmente, para. Esto se pagó solo en el primer mes solo por los clientes que salvamos."

</Slide>
</SlideNavigation>

<RangeSlider
  label="¿Cuántas preguntas tiene tu proceso actual de testimonios?"
  min={0}
  max={20}
  lowLabel="Ninguno todavía"
  highLabel="20+ preguntas"
  persistKey="advocacy-L2-current-questions"
/>

Si estás por encima de 5, estás perdiendo 50%+ de testimonios potenciales por fatiga de formulario.

---

## Construyendo Tu Formulario de 3 Preguntas

Construyamos tu formulario real ahora mismo. Lo usarás para cada solicitud de testimonio en adelante.

<TemplateBuilder
title="Tu Formulario de Recolección de Testimonios"
persistKey="advocacy-L2-form-builder"
sections={[
{
id: "intro",
title: "Introducción del Formulario",
fields: [
{
id: "greeting",
label: "Mensaje de apertura",
placeholder: "¡Gracias por ser un cliente increíble! Tu retroalimentación ayuda a otros en tu situación.",
type: "textarea"
}
]
},
{
id: "questions",
title: "Las 3 Preguntas",
fields: [
{
id: "q1",
label: "Pregunta 1 (Estado Anterior)",
placeholder: "¿Cuál era tu mayor desafío antes de usar [tu producto/servicio]?",
type: "textarea"
},
{
id: "q2",
label: "Pregunta 2 (Resultado Específico)",
placeholder: "¿Qué resultado u resultado específico has logrado desde que empezaste?",
type: "textarea"
},
{
id: "q3",
label: "Pregunta 3 (Recomendación entre Pares)",
placeholder: "¿Qué le dirías a alguien que está considerando [tu producto/servicio] ahora mismo?",
type: "textarea"
}
]
},
{
id: "permission",
title: "Permiso y Atribución",
fields: [
{
id: "attribution",
label: "Pregunta de atribución",
placeholder: "¿Cómo te gustaría ser acreditado? (Nombre completo + empresa, solo nombre, anónimo)",
type: "text"
}
]
}
]}
/>

### Opciones de Herramientas (Todas Gratis o Baratas)

<ExampleCard label="El Stack Simple (Recomendado para Fundadores Solo)">

**Google Forms** (Gratis)

- Respuestas ilimitadas
- Se guarda automáticamente en Google Sheets
- Compatible con móvil
- Cero curva de aprendizaje

**Tiempo de configuración:** 5 minutos

**Alternativa:** Tally (gratis, interfaz más bonita, misma funcionalidad)

**Evita:** La versión gratuita de Typeform (solo 10 respuestas/mes), SurveyMonkey (excesivo para 3 preguntas)

</ExampleCard>

<InsightCard icon="💡" title="La Opción Senja">
Si quieres recolectar Y mostrar testimonios en una sola herramienta, Senja ofrece un plan gratuito (15 testimonios) con widgets embebibles. Vale la pena cuando tengas 10+ testimonios que gestionar.
</InsightCard>

---

## El Correo de Solicitud de Testimonio

Has construido el formulario. Ahora necesitas que los clientes lo llenen.

**El error:** Enviar un genérico "¡Nos encantaría tu retroalimentación!" que se siente como una encuesta.

**La solución:** Una solicitud personal y específica vinculada a su éxito reciente.

### La Anatomía de una Solicitud de Alta Respuesta

<SlideNavigation>
<Slide title="Línea de Asunto">

**Mal:** "Encuesta rápida"
**Bien:** "¿Un favor rápido? (2 min)"

La línea de asunto debe:

- Ser corta (menos de 5 palabras)
- Señalar bajo esfuerzo ("2 min")
- Sentirse personal ("favor" implica relación)

</Slide>

<Slide title="Apertura: Celebra Su Victoria">

**Plantilla:**
"Hola [Nombre], ¡Felicidades por [hito/resultado específico]!"

**Ejemplos:**

- "¡Felicidades por alcanzar 3% de churn — es una mejora enorme desde donde empezaste!"
- "¡Felicidades por tu primer mes de $10K usando el sistema!"
- "¡Increíble trabajo reduciendo tu tiempo de reportes manuales en 75%!"

**Por qué funciona:** Estás anclando la solicitud en _su éxito_, no en tu necesidad de contenido de marketing.

</Slide>

<Slide title="La Solicitud: Hazla Sobre Ellos">

**Plantilla:**
"Me encantaría compartir tu historia con otros que están enfrentando el mismo desafío que tenías tú. ¿Te importaría responder 3 preguntas rápidas? Toma como 2 minutos: [enlace]"

**Frases clave:**

- "Compartir tu historia" (no "obtener un testimonio")
- "Otros que están enfrentando el mismo desafío" (enmarcado entre pares)
- "3 preguntas rápidas" (establece expectativa)
- "Como 2 minutos" (elimina objeción de tiempo)

</Slide>

<Slide title="La Red de Seguridad: Sin Presión + Aprobación">

**Plantilla:**
"Sin ninguna presión — y te enviaré la versión editada para tu aprobación antes de publicar cualquier cosa."

**Por qué importa:**

- "Sin ninguna presión" les da una salida (paradójicamente aumenta la tasa de respuesta)
- "Versión editada para tu aprobación" elimina el miedo de ser mal citado
- "Antes de publicar" asegura control

</Slide>

<Slide title="Cierre: Gratitud">

**Plantilla:**
"¡Gracias por ser un [cliente] increíble!"

Simple. Cálido. Humano.

</Slide>
</SlideNavigation>

### Plantilla Completa de Correo

<TemplateBuilder
title="Tu Correo de Solicitud de Testimonio"
persistKey="advocacy-L2-email-template"
sections={[
{
id: "email",
title: "Borrador de Correo",
fields: [
{
id: "subject",
label: "Línea de asunto",
placeholder: "¿Un favor rápido? (2 min)",
type: "text"
},
{
id: "body",
label: "Cuerpo del correo",
placeholder: "Hola [Nombre],\n\n¡Felicidades por [hito específico]! Me encantaría compartir tu historia con otros que están enfrentando el mismo desafío que tenías tú.\n\n¿Te importaría responder 3 preguntas rápidas? Toma como 2 minutos: [enlace del formulario]\n\nSin ninguna presión — y te enviaré la versión editada para tu aprobación antes de publicar cualquier cosa.\n\n¡Gracias por ser un [cliente] increíble!",
type: "textarea"
}
]
}
]}
/>

> **Tip LATAM:** Considera enviar la solicitud de testimonio por WhatsApp además de por correo. En América Latina, WhatsApp tiene tasas de apertura del 98% vs 20-30% del correo electrónico. Un mensaje breve y personal por WhatsApp con el enlace al formulario puede duplicar o triplicar tu tasa de respuesta.

<RangeSlider
  label="¿Qué tan personal se siente tu solicitud actual de testimonios?"
  min={1}
  max={10}
  lowLabel="Plantilla genérica"
  highLabel="Altamente personal"
  persistKey="advocacy-L2-personalization"
/>

---

## Editando Testimonios Éticamente

Tu cliente llena el formulario. Recibes una respuesta cruda como esta:

> "Antes de usar su herramienta estabamos haciendo todo manualmente en hojas de cálculo y nos tardabamos un chorro y se nos escapaban cosas. Ahorita ahorramos como 4 horas a la semana y no se nos ha escapado ni una señal de churn en 2 meses. Si todavia lo haces manual deberias definitivamente probarlo."

**Tu trabajo:** Convertir esto en un testimonio pulido sin cambiar el significado ni inflar los resultados.

### Las Reglas de Edición

<FlipCard
  front="Lo Que SÍ Puedes Editar"
  back="Gramática, ortografía, claridad, estructura. 'Estabamos' → 'Estábamos', oraciones corridas → oraciones claras, vago → específico (si lo dijeron)."
/>

<FlipCard
  front="Lo Que NO Puedes Editar"
  back="Significado, afirmaciones, resultados. No agregues métricas que no mencionaron. No cambies 'ayudó' por 'transformó'. No infles '4 horas ahorradas' a '50% de reducción de tiempo' a menos que ellos lo hayan dicho."
/>

### El Flujo de Edición

<SlideNavigation>
<Slide title="Paso 1: Corregir Gramática y Claridad">

**Antes:**
"Antes de usar su herramienta estabamos haciendo todo manualmente en hojas de cálculo y nos tardabamos un chorro y se nos escapaban cosas."

**Después:**
"Antes de usar [Producto], estábamos rastreando todo manualmente en hojas de cálculo. Nos tomaba demasiado tiempo, y se nos escapaban señales importantes."

**Qué cambió:** Gramática, estructura de oraciones. Significado intacto.

</Slide>

<Slide title="Paso 2: Hacer los Resultados Específicos">

**Antes:**
"Ahorita ahorramos como 4 horas a la semana y no se nos ha escapado ni una señal de churn en 2 meses."

**Después:**
"Ahora ahorramos 4 horas cada semana, y no se nos ha escapado una sola señal de churn en 2 meses."

**Qué cambió:** Se eliminó "como" (palabra de relleno), se agregó "cada" y "una sola" para énfasis. Números sin cambio.

</Slide>

<Slide title="Paso 3: Fortalecer la Recomendación">

**Antes:**
"Si todavia lo haces manual deberias definitivamente probarlo."

**Después:**
"Si todavía estás rastreando el churn manualmente, deberías probar esto. Se paga solo en el primer mes."

**Qué cambió:** Se corrigió ortografía, se hizo la recomendación más específica. Se agregó "se paga solo" porque está implícito en "4 horas ahorradas semanalmente" (pero verifica con el cliente si no estás seguro).

</Slide>

<Slide title="Paso 4: Estructurar para Legibilidad">

**Versión final editada:**

"Antes de usar [Producto], estábamos rastreando todo manualmente en hojas de cálculo. Nos tomaba demasiado tiempo, y se nos escapaban señales importantes.

Ahora ahorramos 4 horas cada semana, y no se nos ha escapado una sola señal de churn en 2 meses.

Si todavía estás rastreando el churn manualmente, deberías probar esto. Se paga solo en el primer mes."

**Qué cambió:** Se agregaron saltos de párrafo para legibilidad. Eso es todo.

</Slide>
</SlideNavigation>

<InsightCard icon="⚖️" title="La Prueba de Ética">
Si el cliente lee tu versión editada y dice "Yo no dije eso," cruzaste la línea. En caso de duda, pregúntale: "Ajusté un poco esto — ¿todavía suena como tú?"
</InsightCard>

### Práctica: Edita Este Testimonio

<RewriteExercise
title="Edita Este Testimonio Crudo"
persistKey="advocacy-L2-edit-practice"
original="su plataforma esta genial estabamos gastando mucho tiempo en contactar gente y no nos respondian ahora tenemos como 10% de tasa de respuesta y agendamos 3 reuniones la semana pasada que es mucho mejor que antes definitivamente lo recomiendo"
hint="Corrige gramática, agrega estructura, haz los resultados específicos. No infles afirmaciones."
expertRewrite="Antes de usar [Producto], estábamos gastando horas en contacto de clientes sin casi ninguna respuesta. Ahora estamos obteniendo una tasa de respuesta de 10% y agendamos 3 reuniones la semana pasada — una mejora enorme. Definitivamente lo recomendaría si estás luchando con el contacto en frío."
criteria={[
"Gramática y ortografía corregidas",
"Estructura clara de párrafos",
"Métricas específicas preservadas (10%, 3 reuniones)",
"Sin afirmaciones infladas agregadas"
]}
/>

---

## El Flujo de Aprobación

Has editado el testimonio. Ahora necesitas la aprobación del cliente antes de publicar.

**Por qué la aprobación importa:**

1. **Seguridad legal** — Tienes permiso escrito para usar sus palabras
2. **Preservación de confianza** — Ven la versión final antes de que sea pública
3. **Protección de la relación** — Sin sorpresas = sin relaciones dañadas

### El Correo de Aprobación

<TemplateBuilder
title="Solicitud de Aprobación de Testimonio"
persistKey="advocacy-L2-approval-email"
sections={[
{
id: "approval",
title: "Correo de Aprobación",
fields: [
{
id: "subject",
label: "Línea de asunto",
placeholder: "Aprobación rápida: tu testimonio",
type: "text"
},
{
id: "body",
label: "Cuerpo del correo",
placeholder: "Hola [Nombre],\n\n¡Gracias de nuevo por llenar el formulario de testimonio! Edité tu respuesta para mayor claridad (ve abajo). ¿Te parece bien?\n\n[Pegar testimonio editado]\n\nSiéntete libre de sugerir cualquier cambio. Una vez que apruebes, agregaré esto a nuestro sitio web y materiales de marketing.\n\n¡Gracias!\n[Tu nombre]",
type: "textarea"
}
]
}
]}
/>

### Manejando Respuestas de Aprobación

<SlideNavigation>
<Slide title="Respuesta 1: '¡Se ve genial!'">

**Acción:** Publica inmediatamente. Agrega a tu Biblioteca de Prueba Social (Lección 7).

**Respuesta:** "¡Increíble, gracias! Lo pongo en línea hoy."

</Slide>

<Slide title="Respuesta 2: '¿Puedes cambiar X?'">

**Acción:** Haz el cambio solicitado, envía la versión actualizada para re-aprobación.

**Respuesta:** "¡Listo! ¿Esta versión funciona?"

</Slide>

<Slide title="Respuesta 3: '¿Podemos esperar?'">

**Acción:** Respétalo. Marca en el CRM para re-preguntar en 60-90 días.

**Respuesta:** "¡Sin problema! Vuelvo a escribirte en unos meses."

</Slide>

<Slide title="Respuesta 4: Sin respuesta después de 3 días">

**Acción:** Envía un recordatorio amable. Si aún no hay respuesta, sigue adelante.

**Seguimiento:** "Hola [Nombre], solo quería asegurarme de que viste mi correo sobre el testimonio. Sin prisa — ¡avísame si necesitas algún cambio!"

</Slide>
</SlideNavigation>

---

## Publicando Tus Testimonios

Tienes un testimonio aprobado. ¿Ahora qué?

**El error:** Agregarlo a tu sitio web y detenerte ahí.

**La oportunidad:** Un solo testimonio puede desplegarse en 5-10 superficies.

### Superficies de Despliegue

<ClassifyExercise
title="¿A Dónde Va Este Testimonio?"
persistKey="advocacy-L2-deployment"
categories={[
{ id: "homepage", label: "Página Principal", color: "#ef4444" },
{ id: "sales", label: "Materiales de Ventas", color: "#f59e0b" },
{ id: "social", label: "Redes Sociales", color: "#3b82f6" }
]}
items={[
{
id: "1",
content: "Cita corta con nombre del cliente y empresa",
correctCategory: "homepage",
explanation: "Perfecto para la sección de prueba social de la página principal — construye confianza inmediatamente"
},
{
id: "2",
content: "Testimonio completo de 3 párrafos con resultados específicos",
correctCategory: "sales",
explanation: "Ideal para propuestas y correos de ventas — muestra prueba detallada"
},
{
id: "3",
content: "Cita de una oración con foto del cliente",
correctCategory: "social",
explanation: "Genial para publicaciones de LinkedIn y gráficos de prueba social"
},
{
id: "4",
content: "Métricas de antes/después del testimonio",
correctCategory: "homepage",
explanation: "Poderoso para secciones hero de landing pages — los números captan la atención"
}
]}
/>

### La Lista de Despliegue en 5 Superficies

<InteractiveChecklist
title="Despliega Este Testimonio En:"
persistKey="advocacy-L2-deployment-checklist"
items={[
"Sección de testimonios de la página principal (agregar a rotación)",
"Secuencia de correos de ventas (insertar en el Correo 3 o 4)",
"Plantilla de propuesta (agregar a la sección 'Lo Que Dicen Nuestros Clientes')",
"Publicación de LinkedIn (compartir como historia de éxito del cliente)",
"Biblioteca de Prueba Social (Lección 7 — repositorio central)"
]}
/>

---

## Armando Todo: Tu Sistema de Testimonios

Ahora tienes todas las piezas. Ensamblémoslas en un sistema que se repite.

### El Flujo Completo

<ProgressiveReveal title="Sistema de Recolección de Testimonios en 7 Pasos" persistKey="advocacy-L2-workflow">

<RevealSection title="Paso 1: Detección de Disparador">

**Cuándo:** El cliente logra un hito de éxito medible (cubierto en la Lección 6)

**Ejemplos:**

- Primer valor logrado (Día 30)
- Resultado medible (Día 60-90)
- Renovación o expansión
- Puntaje NPS de 9-10

**Acción:** Marcar en CRM o poner recordatorio en calendario

</RevealSection>

<RevealSection title="Paso 2: Enviar Correo de Solicitud">

**Timing:** Dentro de las 48 horas del hito

**Herramienta:** Correo personal (no plantilla automatizada). En LATAM, considera también un mensaje por WhatsApp.

**Plantilla:** Usa la plantilla de correo que construiste antes en esta lección

**Tasa de respuesta esperada:** 40-60% si el timing es correcto

</RevealSection>

<RevealSection title="Paso 3: El Cliente Completa el Formulario">

**Cronograma:** 2-5 días para respuesta

**Herramienta:** Google Forms / Tally / Typeform

**Lo que obtienes:** Respuestas crudas a tus 3 preguntas

</RevealSection>

<RevealSection title="Paso 4: Editar para Claridad">

**Cronograma:** El mismo día que recibes la respuesta

**Herramienta:** Google Docs o borrador de correo

**Proceso:** Corregir gramática, agregar estructura, preservar significado

**Tiempo requerido:** 10-15 minutos por testimonio

</RevealSection>

<RevealSection title="Paso 5: Enviar para Aprobación">

**Cronograma:** El mismo día de la edición

**Herramienta:** Correo con la versión editada pegada en el cuerpo

**Tiempo de aprobación esperado:** 1-3 días

</RevealSection>

<RevealSection title="Paso 6: El Cliente Aprueba">

**Posibles resultados:**

- Aprobado tal cual (80% de los casos)
- Solicita cambios menores (15%)
- Pide esperar (5%)

**Acción:** Hacer cambios si es necesario, o respetar "ahora no"

</RevealSection>

<RevealSection title="Paso 7: Publicar en Todas Partes">

**Cronograma:** El mismo día de la aprobación

**Superficies:** Página principal, correos de ventas, propuestas, LinkedIn, Biblioteca de Prueba Social

**Tiempo requerido:** 15-20 minutos para desplegar en todas las superficies

</RevealSection>

</ProgressiveReveal>

### Inversión de Tiempo

<ScenarioSimulator
title="ROI de Recolección de Testimonios"
persistKey="advocacy-L2-roi-calculator"
levers={[
{ id: "customers", label: "Clientes activos", min: 5, max: 100, step: 5, defaultValue: 20 },
{ id: "milestones", label: "Hitos de éxito por año (por cliente)", min: 1, max: 4, step: 1, defaultValue: 2 },
{ id: "responseRate", label: "Tasa de respuesta (%)", min: 20, max: 80, step: 5, defaultValue: 50 }
]}
outputs={[
{
id: "testimonials",
label: "Testimonios recolectados por año",
formula: "(customers * milestones * (responseRate / 100))",
unit: "",
precision: 0
},
{
id: "timeInvested",
label: "Tiempo total invertido (horas/año)",
formula: "(customers * milestones * (responseRate / 100)) * 0.5",
unit: "hrs",
precision: 1
}
]}
insight="Con `{testimonials}` testimonios por año y ~30 minutos por testimonio, estás invirtiendo {timeInvested} horas anuales para construir una biblioteca de prueba social que trabaja 24/7."
/>

---

## Errores Comunes y Cómo Evitarlos

<SlideNavigation>

<Slide title="Error 1: Preguntar Demasiado Tarde">

**El problema:** Esperas 6 meses después de su éxito para pedir un testimonio. Han olvidado los detalles.

**La solución:** Pide dentro de las 48-72 horas del hito. La emoción y la especificidad están en su punto más alto en esta ventana.

**Datos:** Las solicitudes dentro de 48 horas obtienen 60-70% de tasa de respuesta. Las solicitudes después de 30 días obtienen 15-25%.

</Slide>

<Slide title="Error 2: Hacerlo Demasiado Largo">

**El problema:** Tu formulario tiene 10+ preguntas. La tasa de completado cae a 5-10%.

**La solución:** Quédate con 3 preguntas. Si necesitas más detalle, agenda una entrevista de 15 minutos para caso de estudio (Lección 3) en su lugar.

</Slide>

<Slide title="Error 3: Solicitudes Genéricas">

**El problema:** "¡Nos encantaría tu retroalimentación!" se siente como una encuesta, no como una solicitud personal.

**La solución:** Haz referencia a su hito específico: "Felicidades por alcanzar 3% de churn — me encantaría compartir tu historia."

**Impacto:** Las solicitudes personales obtienen 3x la tasa de respuesta de las plantillas genéricas.

</Slide>

<Slide title="Error 4: Sobre-Editar">

**El problema:** Cambias tanto sus palabras que ya no suena como ellos.

**La solución:** Corrige gramática y estructura, pero preserva su voz. En caso de duda, pregunta: "¿Todavía suena como tú?"

</Slide>

<Slide title="Error 5: Publicar Sin Aprobación">

**El problema:** Te saltas el paso de aprobación para ahorrar tiempo. El cliente ve su testimonio en línea y se siente sorprendido.

**La solución:** Siempre envía la versión editada para aprobación. Cuesta 1 correo extra y previene daño a la relación.

</Slide>

</SlideNavigation>

---

## Tu Sprint de Implementación

Has aprendido el sistema. Ahora constrúyelo.

<InteractiveChecklist
title="Tu Construcción del Sistema de Testimonios en 7 Días"
persistKey="advocacy-L2-implementation"
items={[
"Día 1: Crea tu formulario de 3 preguntas (Google Forms o Tally)",
"Día 2: Escribe tu plantilla de correo de solicitud de testimonio",
"Día 3: Identifica 3-5 clientes que recientemente alcanzaron hitos de éxito",
"Día 4: Envía solicitudes de testimonio a esos 3-5 clientes (por correo y/o WhatsApp)",
"Día 5: Edita cualquier respuesta que recibas (corrige gramática, agrega estructura)",
"Día 6: Envía las versiones editadas para aprobación",
"Día 7: Publica los testimonios aprobados en la página principal + Biblioteca de Prueba Social"
]}
/>

### Métricas de Éxito

Al final de la Semana 1, deberías tener:

- Un formulario de testimonio de 3 preguntas en línea
- 3-5 solicitudes enviadas
- 1-3 testimonios completados (40-60% tasa de respuesta)
- Al menos 1 testimonio aprobado y publicado

<RangeSlider
  label="¿Qué tan seguro te sientes de construir este sistema esta semana?"
  min={1}
  max={10}
  lowLabel="Necesito más ayuda"
  highLabel="Listo para construir"
  persistKey="advocacy-L2-confidence"
/>

---

## Lo Que Sigue

Ahora tienes un sistema de recolección de testimonios que funciona en piloto automático. Cada vez que un cliente alcanza un hito, envías un formulario de 2 minutos, editas su respuesta, obtienes aprobación y publicas.

**En la Lección 3**, llevarás esto más lejos: convirtiendo testimonios en **mini casos de estudio** usando el marco de Desafío → Solución → Resultados. Los casos de estudio son 3x más persuasivos que los testimonios porque cuentan una historia completa con resultados medibles.

**En la Lección 4**, aprenderás a recolectar **testimonios en video** con presupuesto de $0 usando Loom, VideoAsk y Zoom. Los testimonios en video son 2x más persuasivos que los escritos porque los prospectos ven emociones reales y autenticidad.

Pero primero: ve y construye tu formulario. Envía tu primera solicitud. Obtén tu primer testimonio aprobado y publicado.

¿La brecha entre 83% dispuestos y 29% que realmente promueven? Acabas de cerrarla.

---

## Referencia Rápida: La Fórmula de 3 Preguntas

**Pregunta 1:** "¿Cuál era tu mayor desafío antes de trabajar con nosotros?"
→ Crea identificación para prospectos en la misma situación

**Pregunta 2:** "¿Qué resultado u resultado específico has logrado desde que empezaste?"
→ Genera prueba medible (los números son 2x más persuasivos)

**Pregunta 3:** "¿Qué le dirías a alguien que está considerando [producto/servicio] ahora mismo?"
→ Produce recomendaciones entre pares (la señal de mayor confianza)

**Timing de solicitud:** Dentro de las 48 horas de un hito de éxito
**Tasa de respuesta esperada:** 40-60%
**Tiempo por testimonio:** 30 minutos (solicitud + edición + aprobación + publicación)
**Superficies de despliegue:** Página principal, correos de ventas, propuestas, LinkedIn, Biblioteca de Prueba Social

Ahora ve y pregunta.
