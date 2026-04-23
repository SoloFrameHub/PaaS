---
title: "Ejecución y Revisión de la Semana 1"
duration: "90 min"
track: "Operations & Systems"
course: "Course 48: Sales System Capstone"
lesson: 7
---

## La Semana Más Importante del Sprint

La Semana 1 establece el patrón para las siguientes tres semanas. Los fundadores que ejecutan de forma consistente en la Semana 1 casi siempre completan el sprint. Los que hacen concesiones en la Semana 1 —"empezaré en serio la próxima semana"— rara vez recuperan el ritmo.

Esto no es motivación. Es estadística. Los hábitos de comportamiento se forman en los primeros 7-10 días de cualquier nuevo compromiso. Si tu actividad diaria de sprint no está incorporada en tu rutina para el final de la Semana 1, estás en riesgo de abandono para la Semana 3.

Esta lección tiene dos partes: una guía de ejecución para los Días 1-7, y un marco de revisión para el Día 7 que te ayuda a interpretar tus primeros datos sin pivotar prematuramente.

<InsightCard icon="📊" title="Sobre Datos de Una Semana">
Una semana de datos de prospección tiene limitaciones. No te dice si tu estrategia funciona — te dice si la estás ejecutando. Busca señales de comportamiento (¿ejecuté el compromiso?) más que señales de resultado (¿obtuve reuniones?) en la revisión de la Semana 1.
</InsightCard>

## Guía de Ejecución: Días 1-7

<ProgressiveReveal title="Guía Día por Día para la Semana 1" persistKey="capstone-L7-execution">

<RevealSection title="Día 1: Lanzamiento con Preparación Completa">

**Antes de enviar tu primer mensaje:**

- Confirma que tu herramienta de envío está funcionando (entrega de prueba a ti mismo)
- Verifica que tu lista de prospectos está limpia (sin duplicados, coincide con el ICP)
- Asegúrate de que tu plantilla de CRM está configurada para registrar actividad
- Bloquea tu tiempo de prospección en el calendario — defínelo como no negociable

**Objetivos del Día 1:**

- Enviar el primer lote de tu compromiso diario (si son 10 correos/día, enviar 10 correos)
- Registrar toda actividad en el CRM
- Anotar cualquier obstáculo de configuración que haya surgido

**No hagas:** No optimices el mensaje al último minuto. Envía el que preparaste. Los ajustes vienen después de los datos.

</RevealSection>

<RevealSection title="Días 2-5: Ejecución Consistente">

**La rutina diaria del sprint:**

1. Revisar respuestas de ayer (10-15 min) — responder a cualquier interesado, registrar en CRM
2. Ejecutar actividad diaria comprometida (tiempo bloqueado)
3. Registrar actividad del día en el rastreador

**Qué rastrear diariamente:**

- Mensajes/correos enviados
- Respuestas recibidas
- Respuestas positivas (interés expresado, solicitud de reunión)
- Respuestas negativas (no interesado, no es buen momento)
- Tasas de apertura (si tu herramienta las rastrea)

**Lo que NO debes hacer esta semana:**

- No cambies el mensaje después de solo 1-2 días de datos
- No abandones la cadencia por una semana ocupada
- No añadas nuevos canales o iniciativas — ejecuta el plan

</RevealSection>

<RevealSection title="Día 6-7: Primera Revisión de Datos">

El Día 7 (o fin de semana), dedica 30-45 minutos a revisar los primeros datos.

**Preguntas que responder:**

1. ¿Ejecuté mi compromiso diario en los 5 días hábiles? (Objetivo: sí en al menos 4 de 5)
2. ¿Cuál es mi tasa de apertura (si aplica)? Por encima del 40% sugiere buena entrega
3. ¿Cuál es mi tasa de respuesta hasta ahora? (Demasiado temprano para sacar conclusiones, pero rastrea el número)
4. ¿Hay alguna respuesta (positiva o negativa) que indique algo sobre el mensaje o el ICP?
5. ¿Qué obstáculos de ejecución encontré y cómo los resolveré la próxima semana?

</RevealSection>

</ProgressiveReveal>

## Marco de Revisión de la Semana 1

<DecisionTree
title="Interpretación de los Datos de la Semana 1"
persistKey="capstone-L7-review"
startNodeId="start"
nodes={[
{
id: "start",
content: "Fin de la Semana 1. ¿Ejecutaste tu compromiso diario en 4+ de los 5 días hábiles?",
choices: [
{ label: "Sí — ejecuté consistentemente", nextNodeId: "check-signals" },
{ label: "No — perdí 2+ días", nextNodeId: "behavior-problem" }
]
},
{
id: "behavior-problem",
content: "El problema de la Semana 1 es de comportamiento, no de estrategia. No cambies el mensaje ni el canal todavía. Identifica qué impidió la ejecución: conflictos de programación, falta de lista, problemas técnicos. Arregla el obstáculo esta semana. La ejecución viene antes del análisis.",
isTerminal: true,
outcome: "neutral"
},
{
id: "check-signals",
content: "Bien ejecutado. ¿Viste alguna respuesta de prospectos (positiva o negativa)?",
choices: [
{ label: "Sí — al menos 1-2 respuestas de cualquier tipo", nextNodeId: "has-data" },
{ label: "No — cero respuestas", nextNodeId: "low-volume" }
]
},
{
id: "low-volume",
content: "Con 0 respuestas en la Semana 1, verifica el volumen enviado. Si enviaste menos de 30 mensajes, el silencio es normal — no hay suficiente muestra. Si enviaste 50+ sin respuesta, revisa las tasas de apertura para diagnosticar si el problema es de entrega (ninguno llega) o de mensaje (llegan pero nadie responde).",
isTerminal: true,
outcome: "neutral"
},
{
id: "has-data",
content: "Las respuestas son señal temprana. ¿Las respuestas son mayormente interesadas o mayormente negativas?",
choices: [
{ label: "Mixtas o algunas interesadas — señal prometedora", nextNodeId: "continue" },
{ label: "Todas negativas con un patrón consistente ('ya tenemos esto', 'no es relevante')", nextNodeId: "icp-signal" }
]
},
{
id: "continue",
content: "✅ Continúa ejecutando en la Semana 2 sin cambios. Las respuestas mixtas con señales positivas son exactamente lo que quieres ver en la Semana 1. Sigue el plan.",
isTerminal: true,
outcome: "positive"
},
{
id: "icp-signal",
content: "Un patrón consistente de respuestas negativas después de 30-50 mensajes puede indicar un desajuste de ICP o de mensaje. No cambies todavía — necesitas 60+ días para confirmar el patrón. Anota el patrón y continúa ejecutando. Revisa en la Semana 2.",
isTerminal: true,
outcome: "neutral"
}
]}
/>

## Tu Rastreador de Datos de la Semana 1

<TemplateBuilder
title="Registro de Ejecución de la Semana 1"
persistKey="capstone-L7-tracker"
sections={[
{
id: "activity",
title: "Actividad Diaria",
fields: [
{ id: "day1", label: "Lunes — actividades enviadas / respuestas recibidas", placeholder: "p. ej., 12 correos enviados, 1 respuesta (negativa)", type: "text" },
{ id: "day2", label: "Martes — actividades enviadas / respuestas recibidas", placeholder: "p. ej., 10 correos enviados, 0 respuestas", type: "text" },
{ id: "day3", label: "Miércoles — actividades enviadas / respuestas recibidas", placeholder: "p. ej., 11 correos enviados, 2 respuestas (1 interesada, 1 negativa)", type: "text" },
{ id: "day4", label: "Jueves — actividades enviadas / respuestas recibidas", placeholder: "p. ej., 12 correos enviados, 1 respuesta (solicitó reunión)", type: "text" },
{ id: "day5", label: "Viernes — actividades enviadas / respuestas recibidas", placeholder: "p. ej., 10 correos enviados, 0 respuestas", type: "text" }
]
},
{
id: "totals",
title: "Totales de la Semana 1",
fields: [
{ id: "sent", label: "Total de mensajes enviados", placeholder: "p. ej., 55", type: "text" },
{ id: "replies", label: "Total de respuestas", placeholder: "p. ej., 4 (7.3% tasa de respuesta)", type: "text" },
{ id: "positive", label: "Respuestas positivas/interesadas", placeholder: "p. ej., 2 (1 solicitud de reunión, 1 pregunta sobre precios)", type: "text" },
{ id: "meetings", label: "Reuniones reservadas", placeholder: "p. ej., 1", type: "text" }
]
},
{
id: "observations",
title: "Observaciones",
fields: [
{ id: "what-worked", label: "¿Qué funcionó mejor esta semana?", placeholder: "p. ej., Los correos que referenciaban la noticia reciente de la empresa tuvieron el doble de tasa de respuesta", type: "textarea" },
{ id: "obstacles", label: "¿Qué obstáculos de ejecución encontré?", placeholder: "p. ej., El miércoles no pude enviar correos debido a llamadas de clientes back-to-back", type: "textarea" },
{ id: "week2-adjustment", label: "¿Qué ajustaré en la Semana 2 (solo comportamiento/programación, no estrategia)?", placeholder: "p. ej., Bloquear el envío de correos 7-8am antes de las llamadas con clientes", type: "textarea" }
]
}
]}
/>

<RangeSlider
  label="¿Qué porcentaje de tu compromiso diario ejecutaste esta semana?"
  min={0}
  max={100}
  lowLabel="0% — no ejecuté"
  highLabel="100% — cada día comprometido"
  persistKey="capstone-L7-execution-rate"
/>

## Lo que Sigue

En la **Lección 8**, ejecutarás la Semana 2 y realizarás tu segunda revisión de datos. Para entonces tendrás suficiente volumen para hacer observaciones más significativas sobre el rendimiento del mensaje y el ajuste del ICP — y tomarás tu primera decisión de "un solo variable" sobre si ajustar algo en las Semanas 3-4.
