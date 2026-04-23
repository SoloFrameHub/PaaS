---
title: "Ensamblaje del sistema: Descubrimiento + Propuestas + Cierre"
duration: "60 min"
track: "Operations & Systems"
course: "Course 48: Sales System Capstone"
lesson: 4
---

## Por qué algunos sistemas de ventas se rompen en el medio

En las lecciones 1 y 2 aprendiste cómo construir el inicio de tu sistema: ICP definido, canales seleccionados, mensajes de prospección escritos. La lección 3 te mostró cómo conectar el tope del embudo con la primera conversación.

Ahora viene el tramo que falla con más frecuencia: el proceso del medio. Descubrimiento, propuestas y cierre son las etapas donde el momentum se pierde, los prospectos "se ponen a pensar" y los acuerdos mueren en silencio.

Esta lección ensambla esas tres etapas en una secuencia integrada con puntos de transferencia definidos, criterios de calificación claros y protocolos de cierre que crean momentum en lugar de frenarlo.

<InsightCard icon="🔗" title="El Problema de la Transferencia">
La mayoría de los sistemas de ventas tienen piezas sólidas pero conexiones débiles. El descubrimiento va bien. La propuesta es profesional. El cierre se siente torpe. El problema no son las piezas —es el protocolo de transferencia entre ellas. Esta lección se trata de conectar las piezas, no solo de pulirlas individualmente.
</InsightCard>

## La Secuencia del Medio del Embudo

<TemplateBuilder
title="Ensamblaje de mi Sistema de Ventas: Etapas 2-4"
persistKey="capstone-L4-assembly"
sections={[
{
id: "discovery",
title: "Etapa 2: Descubrimiento",
fields: [
{ id: "framework", label: "Tu marco de descubrimiento (cursos 13-14)", placeholder: "¿Qué estructura sigues? p. ej., SPIN, MEDDIC, o preguntas de situación/problema/implicación personalizadas", type: "textarea" },
{ id: "qualify", label: "Criterios de calificación para avanzar a propuesta", placeholder: "¿Qué debe ser verdad para que envíes una propuesta? p. ej., presupuesto confirmado, cronograma de decisión definido, tomador de decisiones identificado", type: "textarea" },
{ id: "disqualify", label: "Señales de descalificación (cuándo terminar amablemente)", placeholder: "¿Qué te indica que no es un buen ajuste? p. ej., sin presupuesto, sin urgencia, ICP equivocado", type: "textarea" }
]
},
{
id: "proposal",
title: "Etapa 3: Propuesta",
fields: [
{ id: "format", label: "Formato de propuesta y longitud", placeholder: "¿Cómo presentas tus propuestas? p. ej., propuesta de una página, deck de 5 diapositivas, video personalizado + PDF", type: "text" },
{ id: "components", label: "Componentes de la propuesta (del Curso 15)", placeholder: "¿Qué incluyes? p. ej., resumen del problema, solución propuesta, entregables, cronograma, inversión, términos", type: "textarea" },
{ id: "timing", label: "Cronograma: entrega de propuesta después del descubrimiento", placeholder: "¿Cuándo envías la propuesta? p. ej., 24-48 horas después de la llamada de descubrimiento, nunca más de 72 horas", type: "text" }
]
},
{
id: "closing",
title: "Etapa 4: Cierre",
fields: [
{ id: "process", label: "Tu proceso de cierre (del Curso 16)", placeholder: "¿Cómo solicitas la decisión? p. ej., llamada de revisión de propuesta, firma de DocuSign, conversación de cierre estructurada", type: "textarea" },
{ id: "followup", label: "Protocolo de seguimiento después de enviar la propuesta", placeholder: "¿Cuándo y cómo haces seguimiento? p. ej., verificación a las 48 horas, llamada a los 5 días, correo de ruptura limpia a los 14 días", type: "textarea" },
{ id: "objections", label: "Las 3 principales objeciones y tus respuestas", placeholder: "¿Qué suelen decir los prospectos antes de decidir? ¿Cuál es tu respuesta a cada una?", type: "textarea" }
]
}
]}
/>

## Los Criterios de Transferencia Etapa por Etapa

El sistema se rompe cuando avanzas un prospecto sin confirmar que está listo. Define exactamente lo que debe ser verdad antes de pasar a la siguiente etapa.

<FlipCard
  front="Prospección → Descubrimiento"
  back="El prospecto respondió positivamente, acordó una reunión y tiene el perfil de ICP correcto. NO avances basándote solo en una respuesta interesada si el ajuste del ICP no está confirmado."
/>

<FlipCard
  front="Descubrimiento → Propuesta"
  back="Has confirmado: (1) el problema existe y duele lo suficiente, (2) hay presupuesto o voluntad de invertir, (3) el tomador de decisiones está en la conversación o accesible, (4) el cronograma tiene alguna urgencia real. Si los cuatro no aplican, no envíes la propuesta todavía."
/>

<FlipCard
  front="Propuesta → Negociación/Cierre"
  back="El prospecto ha revisado la propuesta (confirmado, no supuesto), tiene preguntas específicas sobre los términos, y ha expresado intención de decidir dentro de un plazo definido. Las propuestas enviadas al vacío producen silencio, no cierres."
/>

<FlipCard
  front="Negociación → Decisión"
  back="Todas las objeciones técnicas están resueltas. El tomador de decisiones tiene lo que necesita para decir sí. El siguiente paso es específico: una firma, una reunión de aprobación del consejo, o una llamada de inicio. Sin pasos vagos como 'pensamos en ello'."
/>

## Plantilla de Llamada de Descubrimiento

<TemplateBuilder
title="Mi Guión de Llamada de Descubrimiento"
persistKey="capstone-L4-discovery"
sections={[
{
id: "open",
title: "Apertura (2-3 min)",
fields: [
{ id: "frame", label: "Cómo encuadras la llamada", placeholder: "p. ej., 'Quiero hacer esto valioso para ti — voy a hacer algunas preguntas sobre tu situación actual, luego compartiré cómo podríamos ayudar, y para el final sabremos si tiene sentido hablar más.'", type: "textarea" }
]
},
{
id: "questions",
title: "Preguntas Clave (10-12 min)",
fields: [
{ id: "q1", label: "Pregunta de situación 1", placeholder: "¿Cómo manejas actualmente [el problema que resuelves]?", type: "text" },
{ id: "q2", label: "Pregunta de problema 1", placeholder: "¿Cuál es la mayor frustración con tu enfoque actual?", type: "text" },
{ id: "q3", label: "Pregunta de implicación", placeholder: "¿Cuánto te cuesta este problema en términos de tiempo/dinero/oportunidad perdida?", type: "text" },
{ id: "q4", label: "Pregunta de calificación", placeholder: "Si encontraras la solución correcta, ¿cuál sería tu cronograma para implementarla?", type: "text" }
]
},
{
id: "qualify",
title: "Verificación de Calificación (3-5 min)",
fields: [
{ id: "budget", label: "Cómo verificas el presupuesto", placeholder: "p. ej., 'Nuestros clientes generalmente invierten entre X y Y. ¿Está eso dentro del rango de lo que considerarías?'", type: "textarea" },
{ id: "decision", label: "Cómo identificas al tomador de decisiones", placeholder: "p. ej., '¿Quién más estaría involucrado en tomar esta decisión?'", type: "text" }
]
}
]}
/>

## Tu Protocolo de Cierre

El cierre no debería sentirse como un momento distinto — debería ser la conclusión lógica de un descubrimiento bien hecho y una propuesta relevante. Pero aún así necesita un protocolo.

<InteractiveChecklist
title="Lista de Verificación Pre-Cierre"
persistKey="capstone-L4-preclosing"
items={[
"El prospecto ha revisado la propuesta completa (confirmado en la conversación, no supuesto)",
"Todas las preguntas técnicas o de ajuste están respondidas",
"El tomador de decisiones primario está en la conversación",
"Hay un cronograma de decisión definido ('necesitamos esto para el Q2' vs. 'en algún momento')",
"Entiendes el proceso de aprobación interno (¿necesitan aprobación de la junta? ¿Revisión legal? ¿Validación del equipo?)",
"Tu propuesta aborda el resultado específico que más importa al prospecto"
]}
/>

<RangeSlider
  label="¿Qué tan cómodo te sientes pidiendo la decisión directamente al final de una llamada de propuesta?"
  min={1}
  max={10}
  lowLabel="Incomodo — tiendo a esperar"
  highLabel="Natural — siempre pido el siguiente paso"
  persistKey="capstone-L4-closing-comfort"
/>

<RangeSlider
  label="¿Qué tan bien documentada está actualmente tu secuencia de descubrimiento a cierre?"
  min={1}
  max={10}
  lowLabel="Está en mi cabeza"
  highLabel="Completamente documentada con plantillas"
  persistKey="capstone-L4-doc-quality"
/>

## Lo que Sigue

En la **Lección 5**, completarás el ensamblaje del sistema integrando las etapas post-venta: incorporación, retención, expansión y promoción. Un sistema de adquisición que pierde clientes rápidamente no escala — el back-end del sistema es donde la LTV se construye o se destruye.
