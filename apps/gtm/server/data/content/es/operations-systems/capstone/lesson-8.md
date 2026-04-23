---
title: "Ejecución y Revisión de la Semana 2"
duration: "90 min"
track: "Operations & Systems"
course: "Course 48: Sales System Capstone"
lesson: 8
---

## Las Dos Semanas que Determinan el Sprint

Llegaste a la Semana 2. Esto significa que superaste la mayor tasa de abandono del sprint — la mayoría de los fundadores que fallan, fallan en la Semana 1. Llegar a la Semana 2 con datos reales es un logro genuino.

Ahora el trabajo se vuelve más interesante. Tienes suficiente volumen para empezar a ver patrones — no conclusiones definitivas, sino señales tempranas. La Semana 2 tiene que ver con ejecutar consistentemente mientras empiezas a interpretar lo que los datos te están diciendo.

La trampa de la Semana 2: hacer demasiados ajustes demasiado pronto. Cuando los fundadores ven sus primeros datos, quieren cambiar todo a la vez. El resultado: no saben qué causó el cambio en los resultados. La disciplina de prueba de un solo variable se aplica aquí.

<InsightCard icon="⚖️" title="La Tentación del Pivot vs. La Disciplina de Un Solo Variable">
Con dos semanas de datos, la tentación es rediseñar todo el sistema. Resiste esto. Tienes suficientes datos para identificar UN área de mejora. Cambia exactamente esa cosa. Espera dos semanas. Luego evalúa si funcionó. Cambiar varias cosas a la vez es cómo los fundadores pasan 6 meses haciendo cambios sin saber qué está funcionando.
</InsightCard>

## Tu Revisión de la Semana 2

<StrategyDuel
title="Dos Enfoques para Interpretar los Datos de la Semana 2"
persistKey="capstone-L8-duel"
scenario="Tienes 100 correos enviados en 2 semanas. Tu tasa de respuesta es del 3.5% (objetivo: 7%). Estás a la mitad de tu sprint de 30 días."
strategyA={{
    name: "Pivota el sistema",
    description: "Reescribe la secuencia completa de correos, cambia el ICP objetivo y considera cambiar a LinkedIn en su lugar",
    pros: ["Sensación de acción decisiva", "Máximo cambio potencial de resultados", "Prueba múltiples hipótesis simultáneamente"],
    cons: ["No sabrás qué causó cualquier mejora", "Destruye continuidad de datos", "Probablemente demasiado pronto para saber qué está fallando", "Consume tiempo que podría dedicarse a ejecutar"]
  }}
strategyB={{
    name: "Prueba una variable",
    description: "Mantén todo igual excepto la línea de asunto — prueba una nueva línea de asunto mientras el cuerpo del correo permanece idéntico",
    pros: ["Si mejora la tasa de respuesta, sabes que la línea de asunto era el problema", "Si no mejora, has descartado la línea de asunto — ahora prueba la siguiente variable", "Construye conocimiento sistemático del mercado", "Los aprendizajes aplican a campañas futuras"],
    cons: ["Más lento para encontrar 'la respuesta'", "Puede sentirse insuficiente con datos bajos", "Requiere paciencia durante dos semanas más de ejecución"]
  }}
expertVerdict="Prueba una variable. Con solo 2 semanas de datos y 100 mensajes, no tienes suficiente señal para saber qué está fallando. Una tasa de respuesta del 3.5% podría mejorar a medida que el dominio se calienta, o cuando la secuencia de seguimiento patee, o cuando tus mensajes lleguen a las personas correctas en su horario correcto. Cambia exactamente una cosa: la línea de asunto. Si la tasa de respuesta sube, sabes que fue la línea de asunto. Ahora tienes un aprendizaje real."
/>

## Dónde Probar Primero: El Embudo de Diagnóstico

Cuando los resultados están por debajo del objetivo, usa este embudo para identificar qué probar primero:

<TemplateBuilder
title="Diagnóstico del Embudo de Correo Frío"
persistKey="capstone-L8-diagnosis"
sections={[
{
id: "delivery",
title: "Nivel 1: Entrega",
fields: [
{ id: "open-rate", label: "¿Cuál es tu tasa de apertura? (objetivo: 40%+)", placeholder: "p. ej., '28% — por debajo del objetivo'. Si está debajo del 30%, el problema es de entrega o de línea de asunto", type: "text" },
{ id: "spam", label: "¿Estás aterrizando en spam? ¿Cómo lo verificas?", placeholder: "p. ej., Usar mail-tester.com, verificar puntuación de spam del dominio, verificar registros SPF/DKIM/DMARC", type: "text" }
]
},
{
id: "open",
title: "Nivel 2: La Apertura",
fields: [
{ id: "subject", label: "¿Qué línea de asunto estás usando?", placeholder: "p. ej., 'Pregunta rápida sobre [su herramienta]'", type: "text" },
{ id: "subject-test", label: "¿Qué variante probarías primero?", placeholder: "p. ej., '[Nombre de empresa] → [resultado específico]' o '¿Sigue siendo relevante [su herramienta]?'", type: "text" }
]
},
{
id: "reply",
title: "Nivel 3: La Respuesta",
fields: [
{ id: "opener", label: "¿Cuál es tu primera línea personalizada actual?", placeholder: "p. ej., 'Vi que acabas de lanzar [función]...'", type: "text" },
{ id: "problem", label: "¿Qué problema estás describiendo?", placeholder: "p. ej., 'La mayoría de los [ICP] lucha con [problema específico]...'", type: "text" },
{ id: "cta", label: "¿Cuál es tu CTA?", placeholder: "p. ej., '¿Vale la pena una llamada de 15 minutos?'", type: "text" }
]
}
]}
/>

## Tu Ajuste de Un Solo Variable para la Semana 3

Basado en tu revisión de la Semana 2, elige exactamente UNA cosa para cambiar:

<InsightCard icon="🎯" title="El Orden de Pruebas Recomendado">
Si la tasa de apertura es baja (menos del 30%): prueba líneas de asunto primero.

Si la tasa de apertura es alta pero la tasa de respuesta es baja (buena apertura, mal cuerpo): prueba el remitente/primera línea primero.

Si estás obteniendo aperturas y algunas respuestas pero estas no convierten: prueba el CTA primero.

Si estás obteniendo respuestas pero son mayormente "no es relevante para nosotros": el ICP puede ser el problema — verifica que estás apuntando a la persona correcta.
</InsightCard>

## Lo que Sigue

En la **Lección 9**, ejecutarás la Semana 3 con tu ajuste de un solo variable implementado. Aprenderás cómo comparar las métricas de la Semana 3 con las de la Semana 1-2 para determinar si el cambio mejoró las cosas — y qué hacer si no lo hizo.
