---
title: "Ejecución y Revisión de la Semana 3"
duration: "90 min"
track: "Operations & Systems"
course: "Course 48: Sales System Capstone"
lesson: 9
---

## La Semana del Aprendizaje

La Semana 3 es donde el sprint se vuelve científico. Realizaste un ajuste de un solo variable al final de la Semana 2. Ahora ejecutas durante 5 días más con ese cambio implementado y mides el resultado.

Esta es la diferencia entre iteración basada en datos e iteración basada en conjeturas. Al final de la Semana 3, podrás decir: "Cambié X, y la tasa de respuesta subió/bajó/se mantuvo igual." Ese conocimiento da forma a la Semana 4 y a todos los sprints futuros.

<InsightCard icon="🔬" title="El Principio del Experimento Controlado">
Para que los datos de la Semana 3 sean útiles, solo puedes haber cambiado UNA cosa desde la Semana 2. Si cambiaste la línea de asunto Y el primer párrafo Y el CTA, no sabes cuál de esos cambios, si es que hubo alguno, mejoró los resultados. Mantén el control.
</InsightCard>

## Guía de Ejecución de la Semana 3

<ProgressiveReveal title="Guía de Ejecución y Revisión de la Semana 3" persistKey="capstone-L9-execution">

<RevealSection title="Días 1-5: Ejecutar con el Único Cambio Implementado">

Ejecuta exactamente el mismo sistema que las Semanas 1-2, con el único cambio que implementaste al final de la Semana 2.

**Mantén todo lo demás igual:**

- El mismo ICP y lista de prospectos (mismo perfil, nuevos contactos)
- El mismo cuerpo del mensaje (si cambiaste la línea de asunto)
- La misma línea de asunto (si cambiaste el cuerpo)
- El mismo CTA
- El mismo volumen de envío diario

**Rastrea las mismas métricas:**

- Enviados por día
- Tasas de apertura (si aplica)
- Tasas de respuesta
- Respuestas positivas

</RevealSection>

<RevealSection title="Día 7: Comparación de Datos de Semana 3 vs. Semanas 1-2">

Compara las tasas de respuesta de la Semana 3 con las de las Semanas 1-2.

**Preguntas de interpretación:**

1. ¿La tasa de respuesta subió? → El cambio funcionó. Mantén el cambio para la Semana 4.
2. ¿La tasa de respuesta se mantuvo igual o bajó? → El cambio no funcionó. Revierte y prueba la siguiente variable.
3. ¿Las respuestas son de diferentes tipos de prospectos? → Esto puede indicar un cambio de señal en el ICP.
4. ¿El tipo de respuestas cambió (más positivas vs. más negativas)? → También es datos válidos.

**Recuerda:** Con 3 semanas de datos todavía no tienes un tamaño de muestra estadísticamente significativo para la mayoría de las situaciones B2B. Estás buscando señal direccional, no certeza estadística.

</RevealSection>

</ProgressiveReveal>

## Tu Registro de Aprendizaje de la Semana 3

<DecisionTree
title="El Árbol de Decisión de la Semana 3"
persistKey="capstone-L9-decision"
startNodeId="start"
nodes={[
{
id: "start",
content: "Comparando las métricas de la Semana 3 con las Semanas 1-2: ¿mejoró tu tasa de respuesta después de tu único cambio?",
choices: [
{ label: "Sí — la tasa de respuesta subió (incluso un poco)", nextNodeId: "improvement" },
{ label: "No — igual o peor", nextNodeId: "no-improvement" }
]
},
{
id: "improvement",
content: "El cambio tuvo impacto positivo. ¿Qué tan significativa fue la mejora?",
choices: [
{ label: "Mejora significativa (más del 50% de aumento en la tasa de respuesta)", nextNodeId: "big-win" },
{ label: "Mejora modesta (10-50% de aumento en la tasa de respuesta)", nextNodeId: "small-win" }
]
},
{
id: "big-win",
content: "✅ Victorias grandes. Este cambio fue la variable principal. Aplica este aprendizaje a todas las campañas futuras. Para la Semana 4: ejecuta con este mensaje mejorado, considera si hay otra variable a probar.",
isTerminal: true,
outcome: "positive"
},
{
id: "small-win",
content: "✅ Mejora modesta — todavía un aprendizaje valioso. Mantén el cambio para la Semana 4. Si el tiempo lo permite, considera probar una segunda variable en la Semana 4.",
isTerminal: true,
outcome: "positive"
},
{
id: "no-improvement",
content: "El cambio no tuvo impacto positivo. ¿Fue el cambio revertido o todavía en proceso de evaluación?",
choices: [
{ label: "Definitivamente sin mejora — lo revertí al final de la Semana 3", nextNodeId: "revert" },
{ label: "Aún evaluando — podría ser muy pronto para juzgar", nextNodeId: "early" }
]
},
{
id: "revert",
content: "Revertiste correctamente. Para la Semana 4: prueba la siguiente variable en el embudo de diagnóstico (si probaste la línea de asunto, prueba ahora el primer párrafo). Cada prueba fallida es información — has descartado esa variable.",
isTerminal: true,
outcome: "neutral"
},
{
id: "early",
content: "Válido. Con volúmenes de B2B más bajos, 5 días puede que no sea suficiente para ver el impacto del cambio. Continúa con la Semana 4 sin nuevo cambio. Evalúa con los datos acumulados de las Semanas 3-4 juntas.",
isTerminal: true,
outcome: "neutral"
}
]}
/>

## Rastreador de Datos de la Semana 3

<TemplateBuilder
title="Registro de la Semana 3: Impacto del Cambio"
persistKey="capstone-L9-tracker"
sections={[
{
id: "change",
title: "El Cambio que Implementé",
fields: [
{ id: "what-changed", label: "¿Qué cambié de las Semanas 1-2?", placeholder: "p. ej., 'Cambié la línea de asunto de «Pregunta rápida» a «[Nombre de empresa] → [resultado específico]»'", type: "text" },
{ id: "hypothesis", label: "¿Por qué esperabas que esto mejoraría los resultados?", placeholder: "p. ej., 'Las tasas de apertura de la Semana 1-2 eran del 22%, lo que indica que la línea de asunto era el problema, no el cuerpo del mensaje'", type: "textarea" }
]
},
{
id: "results",
title: "Resultados de la Semana 3",
fields: [
{ id: "sent", label: "Total enviados", placeholder: "p. ej., 58", type: "text" },
{ id: "open-rate", label: "Tasa de apertura (si aplica)", placeholder: "p. ej., '38% (arriba desde 22% en la Semana 1-2)'", type: "text" },
{ id: "reply-rate", label: "Tasa de respuesta", placeholder: "p. ej., '6.9% (arriba desde 3.5% en la Semana 1-2)'", type: "text" },
{ id: "positive-replies", label: "Respuestas positivas", placeholder: "p. ej., 3 interesados, 1 solicitó reunión", type: "text" }
]
},
{
id: "conclusion",
title: "Conclusión",
fields: [
{ id: "verdict", label: "¿El cambio funcionó? (Sí / No / Demasiado pronto para saberlo)", placeholder: "p. ej., 'Sí — la tasa de apertura subió un 73% y la tasa de respuesta subió un 97%'", type: "text" },
{ id: "week4-plan", label: "¿Qué ejecutarás diferente en la Semana 4?", placeholder: "p. ej., 'Mantener la nueva línea de asunto. Ningún cambio adicional — ejecutar con el sistema mejorado para el sprint final.'", type: "textarea" }
]
}
]}
/>

## Lo que Sigue

En la **Lección 10**, ejecutarás la Semana 4 y harás el análisis final del sprint. Construirás tu Cuadro de Mando del Sprint con todos los aprendizajes del mes, calcularás el ROI de tu sistema de adquisición, y planificarás tu Sprint 2.
