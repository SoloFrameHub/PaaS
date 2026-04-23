---
title: "El Sprint de 30 Días: Planificando tus objetivos"
duration: "50 min"
track: "Operations & Systems"
course: "Course 48: Sales System Capstone"
lesson: 6
---

## De Documentado a Activo

Tu sistema está ensamblado. Las 8 etapas están documentadas. Los criterios de transferencia están definidos. Las plantillas están escritas.

Pero un sistema documentado que nadie ejecuta es solo un documento bien formateado.

El Sprint de 30 Días es el mecanismo que convierte tu sistema en un motor activo. Es un período de ejecución estructurada — 30 días de actividad diaria comprometida, revisiones semanales, y ajuste basado en datos en lugar de conjeturas.

Esta lección te ayuda a planificar el sprint antes de ejecutarlo. Definirás objetivos específicos, priorizarás las iniciativas de mayor impacto usando el marco ICE, y crearás tu plan de acción semana a semana.

<InsightCard icon="🚀" title="Por qué Necesitas un Sprint en Lugar de un 'Empezar Poco a Poco'">
Los fundadores que "empiezan poco a poco" con nuevos sistemas rara vez generan suficiente impulso para ver resultados. Los sistemas de ventas requieren masa crítica de actividad para producir señal — 5 correos por semana no te dicen nada sobre si el mensaje funciona. 50 correos por semana sí lo hacen. El sprint comprime suficiente actividad en 30 días para darte datos reales con qué trabajar.
</InsightCard>

## El Marco de Priorización ICE

Antes de planificar el sprint, necesitas priorizar qué actividades recibirán la mayor parte de tu energía. El marco ICE te ayuda a hacer esto sistemáticamente.

**ICE:** Impacto × Confianza × Facilidad (cada uno puntuado 1-10, el promedio determina la prioridad)

<ScenarioSimulator
title="Calculadora de Puntuación ICE"
persistKey="capstone-L6-ice"
levers={[
{ id: "impact", label: "Impacto (1-10): ¿Cuánto moverá esto el indicador más importante?", min: 1, max: 10, step: 1, defaultValue: 7 },
{ id: "confidence", label: "Confianza (1-10): ¿Qué tan seguros estamos de que funcionará?", min: 1, max: 10, step: 1, defaultValue: 6 },
{ id: "ease", label: "Facilidad (1-10): ¿Qué tan fácil es implementarlo en 30 días?", min: 1, max: 10, step: 1, defaultValue: 8 }
]}
outputs={[
{ id: "ice_score", label: "Puntuación ICE", formula: "(impact + confidence + ease) / 3", unit: "/10", precision: 1 },
{ id: "priority", label: "Prioridad relativa", formula: "ice_score > 7 ? 10 : ice_score > 5 ? 5 : 2", unit: "(1-10)", precision: 0 }
]}
insight="Una puntuación ICE de {ice_score}/10. Las iniciativas por encima de 7 merecen estar en tu lista de tareas del sprint. Las que están por debajo de 5 probablemente deberían esperar."
/>

## Tus Objetivos del Sprint de 30 Días

Los objetivos del sprint deben ser específicos, accionables y orientados a leading indicators (no lagging indicators como revenue). Necesitas datos sobre lo que estás haciendo, no sobre lo que el mercado hizo con lo que hiciste.

<TemplateBuilder
title="Plan del Sprint de 30 Días"
persistKey="capstone-L6-sprint-plan"
sections={[
{
id: "primary-goal",
title: "Objetivo Principal del Sprint",
fields: [
{ id: "metric", label: "Métrica principal de leading indicator para este sprint", placeholder: "p. ej., 'Enviar 200 correos en frío en 30 días con tasa de respuesta objetivo del 7%+' o 'Realizar 15 llamadas de descubrimiento en 30 días'", type: "text" },
{ id: "baseline", label: "Tu línea base actual (¿dónde estás hoy?)", placeholder: "p. ej., '0 correos enviados esta semana' o '2 llamadas de descubrimiento este mes'", type: "text" },
{ id: "target", label: "Tu objetivo al día 30", placeholder: "p. ej., '200 correos enviados, tasa de respuesta del 7%+'", type: "text" }
]
},
{
id: "weekly",
title: "Desglose Semana por Semana",
fields: [
{ id: "week1", label: "Semana 1 — objetivo de actividad específico", placeholder: "p. ej., Construir lista de 100 prospectos. Escribir secuencia de 5 correos. Enviar primeros 50 correos.", type: "textarea" },
{ id: "week2", label: "Semana 2 — objetivo de actividad específico", placeholder: "p. ej., Enviar siguientes 50 correos. Gestionar todas las respuestas. Revisar tasas de apertura/respuesta.", type: "textarea" },
{ id: "week3", label: "Semana 3 — objetivo de actividad específico", placeholder: "p. ej., Enviar 50 correos adicionales. Realizar primeras 5 llamadas de descubrimiento de respuestas interesadas.", type: "textarea" },
{ id: "week4", label: "Semana 4 — objetivo de actividad específico", placeholder: "p. ej., Enviar correos finales del sprint. Revisar todas las métricas. Hacer ajustes para sprint 2.", type: "textarea" }
]
},
{
id: "blockers",
title: "Anticipar Obstáculos",
fields: [
{ id: "obstacles", label: "¿Qué podría impedirte ejecutar este sprint?", placeholder: "p. ej., reuniones de clientes, trabajo de producto, falta de lista de prospectos, configuración de herramientas pendiente", type: "textarea" },
{ id: "mitigation", label: "¿Cómo mitigarás cada obstáculo?", placeholder: "p. ej., bloquear 8-9am diariamente para actividades del sprint antes de que los clientes se conecten", type: "textarea" }
]
}
]}
/>

## El Principio de las Actividades No Negociables

El mayor riesgo para el sprint no es la estrategia equivocada — es la ejecución inconsistente. La solución: hacer que las actividades principales sean no negociables durante 30 días.

Una actividad no negociable es una que ejecutas el número específico de veces sin importar cómo te sientas, qué tan ocupado estés, o qué tan tentador se vea el trabajo de producto.

Identifica 1-2 actividades no negociables para el sprint:

- ¿Cuántos correos o mensajes enviados por día hábil?
- ¿Cuántas llamadas de descubrimiento realizadas por semana?
- ¿Con qué frecuencia revisas y respondes correos de prospectos?

Escríbelo con números exactos. No rangos.

## Tu Verificación de Preparación para el Sprint

<InteractiveChecklist
title="¿Estoy listo para ejecutar el Sprint de 30 Días?"
persistKey="capstone-L6-readiness"
items={[
"Tengo una lista de prospectos con al menos 100 contactos que coinciden con mi ICP",
"Mi secuencia de correos está escrita y revisada (o mis mensajes de LinkedIn están preparados)",
"Mi CRM está configurado para rastrear el estado de los prospectos",
"Mis herramientas de envío están configuradas y los dominios calentados (si aplica)",
"Tengo bloques de calendario reservados para actividades de prospección cada día hábil",
"He identificado mi métrica principal de leading indicator y tengo una forma de rastrearla",
"He comunicado mi compromiso de sprint a mi socio de responsabilidad (si tengo uno)"
]}
/>

## Lo que Sigue

En la **Lección 7**, ejecutarás la Semana 1 del sprint y realizarás tu primera revisión. Aprenderás qué buscar en los primeros datos, cómo distinguir ruido de señal en datos de una semana, y cómo ajustar tu enfoque sin abandoar el sprint prematuramente.
