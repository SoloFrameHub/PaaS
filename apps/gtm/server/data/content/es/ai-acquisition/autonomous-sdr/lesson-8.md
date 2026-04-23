---
title: "La matriz de fallos de automatización para SDR IA"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 26: Autonomous SDR Systems"
lesson: 8
---

## El correo de $75,000 que nadie revisó

El SDR IA de Sara llevaba tres semanas funcionando sin problemas. Había establecido una rutina: revisión rápida por la mañana, aprobar los envíos del día, seguir con el trabajo de producto. Un martes, se saltó la revisión. "Solo esta vez", pensó. "El sistema ha sido perfecto."

Esa tarde, su SDR IA envió 47 correos a prospectos enterprise. Cada uno hacía referencia a "una ronda de financiamiento reciente" que nunca ocurrió. La IA había alucinado el dato a partir de una empresa con nombre similar.

El miércoles por la mañana, tres prospectos habían reenviado el correo a sus redes con comentarios como "Esta empresa ni siquiera hace investigación básica". La reputación del dominio de Sara bajó 40 puntos. Dos deals en curso se enfriaron.

Los 15 minutos que ahorró le costaron un estimado de $75,000 en pipeline perdido.

**La pregunta no es si automatizar tu SDR IA. Es qué automatizar, qué controlar y qué mantener en manos humanas.**

---

## La Matriz de Fallos de Automatización: tu marco de decisión

¿Recuerdas la matriz 2×2 del Curso 21? Aquí la aplicamos específicamente a cada función que un SDR IA puede realizar.

<FlipCard 
  front="La Matriz de Fallos de Automatización" 
  back="Riesgo de fallo (eje X) × Ahorro de tiempo (eje Y) = 4 cuadrantes que te dicen exactamente qué automatizar, qué controlar y qué mantener humano" 
/>

Así funciona para los SDR IA:

### Los cuatro cuadrantes

**C1: Automatizar ahora** (Bajo riesgo, alto ahorro de tiempo)

- Estas tareas son seguras para automatizar completamente
- Los errores tienen bajo impacto y se detectan fácilmente
- Consumen mucho tiempo si se hacen de forma manual
- **Tu SDR IA debe manejarlas sin ninguna revisión humana**

**C2: Automatizar + Control humano** (Alto riesgo, alto ahorro de tiempo)

- Estas tareas ahorran mucho tiempo cuando se automatizan
- Pero los errores pueden dañar tu marca o hacer perder deals
- **IA genera, humano aprueba antes de ejecutar**

**C3: Mantener humano** (Alto riesgo, bajo ahorro de tiempo)

- Estas tareas no ahorran mucho tiempo al automatizarlas
- Pero el riesgo de equivocarse es catastrófico
- **Nunca las automatices, ni siquiera con control humano**

**C4: Eliminar** (Bajo riesgo, bajo ahorro de tiempo)

- Estas tareas hacen perder tiempo tanto automatizadas como manuales
- No mueven la aguja en los resultados
- **Deja de hacerlas definitivamente**

<InsightCard icon="⚠️" title="La realidad del fundador en solitario">
No tienes un equipo de respaldo. Un fallo en la automatización puede quemar toda tu infraestructura de correo, destruir tu marca o hacer perder a tu mejor prospecto. La matriz no es opcional: es supervivencia.
</InsightCard>

---

## Actividades C1: Automatizar ahora (configúralas y olvídate)

Esta es la zona segura de tu SDR IA. Automatización total, cero revisión necesaria.

<InteractiveChecklist
title="C1: Seguro de automatizar completamente"
persistKey="autonomous-sdr-L8-q1-tasks"
items={[
"Gestión del calentamiento de correo (incrementos diarios del volumen de envíos)",
"Procesamiento de rebotes (eliminación de rebotes duros de las listas)",
"Actualizaciones de campos en el CRM (último contacto, etapa de secuencia)",
"Programación de envíos (distribución óptima por hora del día)",
"Analítica e informes (dashboards diarios/semanales)",
"Deduplicación de listas (eliminar duplicados antes de enviar)",
"Verificación de correos (comprobar validez antes de agregar a la secuencia)",
"Procesamiento de cancelaciones (eliminación inmediata de todas las listas)",
"Detección de respuestas automáticas (identificar mensajes OOO, reprogramar)",
"Rotación de dominios (cambiar dominios de envío según el volumen)"
]}
/>

### Por qué estas tareas son seguras

1. **Los errores no son visibles para el cliente** — Si el cronograma de calentamiento está ligeramente desajustado, los prospectos nunca lo ven
2. **Los fallos se detectan fácilmente** — Un pico en la tasa de rebotes aparece en tu dashboard de inmediato
3. **La recuperación es sencilla** — Vuelves a agregar un contacto, ajustas un horario, corriges un campo en el CRM
4. **Sin riesgo de marca** — Todo ocurre entre bastidores

<ExampleCard label="Implementación real: el ahorro de 30 minutos semanales">
Marcos automatizó todas las tareas C1 en su configuración de SDR IA. Antes: 30 minutos cada lunes actualizando campos del CRM, procesando rebotes, revisando el progreso del calentamiento. Después: cero minutos. Su SDR IA lo gestiona todo. Revisa el informe semanal (2 minutos) para confirmar que todo funciona bien.

**Tiempo ahorrado al mes:** 2 horas. **Incidentes en 6 meses:** Cero.
</ExampleCard>

### Cómo implementar la automatización C1

La mayoría de las plataformas SDR IA (AiSDR, Salesforge, Artisan) manejan las tareas C1 automáticamente. Si usas un stack propio:

- **Instantly/Smartlead**: El calentamiento automático, el procesamiento de rebotes y el manejo de cancelaciones están integrados
- **Zapier/Make**: Automatiza las actualizaciones del CRM (último contacto, etapa de secuencia) con triggers
- **Apollo**: Verificación automática al cargar, deduplicación al importar

<RangeSlider 
  label="¿Qué % de tus tareas C1 están actualmente automatizadas?" 
  min={0} 
  max={100} 
  lowLabel="0% (todo manual)" 
  highLabel="100% (completamente automatizado)" 
  persistKey="autonomous-sdr-L8-q1-current" 
/>

---

## Actividades C2: Automatizar + Control humano (la zona crítica de revisión)

Estas tareas ahorran mucho tiempo cuando se automatizan, pero los errores pueden destruir deals. **La IA genera, tú apruebas.**

<ClassifyExercise
title="Clasifica estas tareas de SDR IA"
persistKey="autonomous-sdr-L8-classify"
categories={[
{ id: "q1", label: "C1: Automatizar ahora", color: "#10b981" },
{ id: "q2", label: "C2: Automatizar + Control", color: "#f59e0b" },
{ id: "q3", label: "C3: Mantener humano", color: "#ef4444" }
]}
items={[
{ id: "1", content: "Personalización del primer contacto por correo", correctCategory: "q2" },
{ id: "2", content: "Clasificación de respuestas (interesado vs no interesado)", correctCategory: "q2" },
{ id: "3", content: "Procesamiento de rebotes", correctCategory: "q1" },
{ id: "4", content: "Responder preguntas sobre precios", correctCategory: "q3" },
{ id: "5", content: "Redacción de correos de seguimiento", correctCategory: "q2" },
{ id: "6", content: "DM en LinkedIn a prospecto tibio", correctCategory: "q3" },
{ id: "7", content: "Actualizaciones de campos en el CRM", correctCategory: "q1" },
{ id: "8", content: "Investigación de prospectos (cambios de trabajo, stack tecnológico)", correctCategory: "q2" }
]}
/>

### La lista de tareas C2

<SlideNavigation>
<Slide title="Personalización del primer contacto">

**Qué hace la IA:** Investiga al prospecto (publicación reciente en LinkedIn, noticias de la empresa, stack tecnológico) y escribe una primera línea personalizada.

**Por qué es C2:** La personalización alucinada es peor que ninguna personalización. Si la IA inventa una ronda de financiamiento falsa o una característica errónea del producto, pierdes credibilidad al instante.

**El control:** Revisa cada correo del primer contacto antes de enviarlo. Busca:

- Exactitud factual (¿es verdadera la personalización?)
- Relevancia (¿conecta con tu oferta?)
- Tono (¿suena a ti?)

**Costo de tiempo:** 10-30 segundos por correo. Con 50 correos al día, eso son 8-25 minutos.

**Tiempo ahorrado vs manual:** 2-3 horas/día (investigar y escribir desde cero).

</Slide>

<Slide title="Clasificación de respuestas">

**Qué hace la IA:** Lee las respuestas entrantes y las clasifica: Interesado / No interesado / Objeción / Pregunta / Molesto / OOO.

**Por qué es C2:** Una clasificación errónea hace perder deals. "Estoy interesado pero no hasta el Q2" clasificado como "No interesado" dispara un correo de despedida. "Por favor elimíname" clasificado como "Objeción" dispara una réplica.

**El control:** Revisa todas las respuestas positivas y las dudosas antes de que la IA responda. Solo procesa automáticamente las negativas claras ("No me interesa, por favor detente") y los mensajes OOO.

**Costo de tiempo:** 5-10 minutos/día (revisando 5-15 respuestas).

**Tiempo ahorrado vs manual:** 30-60 minutos/día (leer, categorizar, redactar respuestas).

</Slide>

<Slide title="Personalización de seguimientos">

**Qué hace la IA:** Escribe correos de seguimiento en una secuencia, añadiendo nueva personalización o valor en cada contacto.

**Por qué es C2:** Los seguimientos a prospectos comprometidos son de alto riesgo. Un seguimiento genérico o inapropiado puede matar el impulso.

**El control:** Revisa los seguimientos a cualquiera que haya respondido o interactuado (abierto 3+ veces, hecho clic en un enlace). Envía automáticamente a los prospectos fríos que no han interactuado.

**Costo de tiempo:** 5-10 minutos/día.

**Tiempo ahorrado vs manual:** 1-2 horas/día.

</Slide>

<Slide title="Puntuación de prospectos">

**Qué hace la IA:** Puntúa a los prospectos según señales de encaje (cargo, tamaño de empresa, stack tecnológico, nivel de compromiso).

**Por qué es C2:** Los errores de puntuación hacen perder tu tiempo. Puntuaciones altas a prospectos que no encajan = llamadas desperdiciadas. Puntuaciones bajas a prospectos ideales = oportunidades perdidas.

**El control:** Revisa el 20% mejor de los prospectos puntuados semanalmente. Ajusta los criterios de puntuación en función de lo que realmente está convirtiendo.

**Costo de tiempo:** 15-20 minutos/semana.

**Tiempo ahorrado vs manual:** 2-3 horas/semana (revisión y priorización manual de listas).

</Slide>

<Slide title="Generación de variantes A/B">

**Qué hace la IA:** Escribe 2-3 variantes de líneas de asunto o primeras líneas para pruebas.

**Por qué es C2:** Las malas variantes pueden hundir tus resultados. Probar una línea de asunto spam contra una buena desperdicia la mitad de tu volumen.

**El control:** Revisa todas las variantes antes de lanzar una prueba. Pásalas por el Sales Linter.

**Costo de tiempo:** 10-15 minutos por prueba.

**Tiempo ahorrado vs manual:** 30-45 minutos por prueba.

</Slide>

<Slide title="Optimización del timing de la secuencia">

**Qué hace la IA:** Ajusta los horarios de envío y los intervalos entre contactos según los datos de compromiso.

**Por qué es C2:** Los errores de timing pueden activar filtros de spam (demasiado frecuente) o hacer perder impulso (demasiado lento).

**El control:** Revisa los cambios de timing semanalmente. Asegúrate de que los intervalos se mantengan en rangos seguros (2-4 días entre contactos).

**Costo de tiempo:** 10 minutos/semana.

**Tiempo ahorrado vs manual:** 1-2 horas/semana (analizando patrones de compromiso).

</Slide>
</SlideNavigation>

### Implementar el control humano

El control debe tomar **10-30 segundos por elemento**. Si tarda más, tu SDR IA todavía no está bien calibrado.

<TemplateBuilder
title="Tu lista de verificación para la revisión C2"
persistKey="autonomous-sdr-L8-q2-gate"
sections={[
{
id: "daily",
title: "Revisión diaria (15-20 min)",
fields: [
{ id: "first-touch", label: "Correos de primer contacto para enviar hoy", placeholder: "Revisa exactitud factual, relevancia y tono", type: "textarea" },
{ id: "replies", label: "Respuestas positivas/dudosas para clasificar", placeholder: "Verifica la clasificación, revisa las respuestas redactadas por IA", type: "textarea" },
{ id: "followups", label: "Seguimientos a prospectos comprometidos", placeholder: "Revisa la personalización y el timing", type: "textarea" }
]
},
{
id: "weekly",
title: "Revisión semanal (30 min)",
fields: [
{ id: "scoring", label: "20% mejor de prospectos puntuados", placeholder: "Valida el encaje, ajusta los criterios de puntuación", type: "textarea" },
{ id: "timing", label: "Cambios de timing en la secuencia", placeholder: "Asegura que los intervalos sean seguros (2-4 días)", type: "textarea" },
{ id: "variants", label: "Nuevas variantes para pruebas A/B", placeholder: "Pasa por el Sales Linter, verifica activadores de spam", type: "textarea" }
]
}
]}
/>

<InsightCard icon="⏱️" title="La regla de los 15 minutos">
Si tu revisión diaria de C2 tarda más de 15-20 minutos, tu SDR IA necesita más ajuste. Dedica una semana a mejorar los prompts, las listas de exclusión y las reglas de clasificación. Un sistema bien calibrado debería presentar solo 10-20 elementos para revisar al día.
</InsightCard>

---

## Actividades C3: Mantener humano (nunca automatizar)

Estas tareas no ahorran mucho tiempo al automatizarlas, pero el riesgo de equivocarse es catastrófico.

<SwipeDecision
title="¿Automatizar o mantener humano?"
description="Desliza a la derecha para automatizar, a la izquierda para mantener humano"
optionA="Mantener humano"
optionB="Automatizar"
persistKey="autonomous-sdr-L8-swipe"
cards={[
{ id: "1", content: "Responder a un prospecto interesado que hizo una pregunta", correctOption: "a", explanation: "Conversación de alto riesgo. Una respuesta equivocada hace perder el deal." },
{ id: "2", content: "Agendar una reunión cuando el prospecto dice 'sí'", correctOption: "b", explanation: "Bajo riesgo. La automatización de enlaces de calendario es segura." },
{ id: "3", content: "Negociar precios con un lead tibio", correctOption: "a", explanation: "Nunca automatices las conversaciones de precios. Demasiado contexto y matices." },
{ id: "4", content: "Enviar un correo de despedida a un prospecto frío", correctOption: "b", explanation: "Bajo riesgo. Si están fríos, un correo de despedida es seguro de automatizar." },
{ id: "5", content: "Responder a un DM en LinkedIn de un prospecto", correctOption: "a", explanation: "Los DMs de LinkedIn son personales. La automatización suena robótica y arriesga restricciones en la cuenta." },
{ id: "6", content: "Actualizar campos del CRM después de una llamada", correctOption: "b", explanation: "Tarea administrativa de bajo riesgo. Segura de automatizar." }
]}
/>

### La lista de tareas C3

**Nunca automatices estas, ni siquiera con controles:**

1. **Responder a prospectos interesados/tibios** — Estas son tus conversaciones de mayor valor. Una respuesta equivocada hace perder un deal que vale $5K-50K+.

2. **Precios y negociación** — Demasiado contexto, demasiadas variables. La IA no entiende tu flexibilidad en precios, tu autoridad para dar descuentos ni tus prioridades estratégicas.

3. **DMs en LinkedIn** — La detección de automatización de LinkedIn es agresiva. Un DM equivocado puede hacer que tu cuenta sea restringida. Además, los DMs se sienten personales: la automatización es obvia y repele.

4. **Notas de voz y videos Loom** — Son contactos de alta confianza y alta personalización. La IA no puede replicar tu voz, tu tono ni tu personalidad.

5. **Agendamiento de llamadas de descubrimiento (con contexto)** — Si un prospecto tiene restricciones específicas ("Solo estoy libre los martes después de las 3pm"), se requiere juicio humano. Los simples enlaces de calendario sí se pueden automatizar.

6. **Manejo de quejas** — Si alguien está enojado o amenaza con reportarte, la intervención humana es innegociable. La IA puede escalar, pero nunca debe responder.

7. **Comunicaciones sensibles para la marca** — Todo lo que vaya a un prospecto VIP, inversor, socio o contacto de prensa debe ser escrito por un humano.

<ExampleCard label="Caso de estudio: el deal perdido de $40K">
El SDR IA de Tomás clasificó una respuesta como "Objeción: Timing" y envió un manejador de objeciones predefinido: "Entiendo que el timing es una preocupación. La mayoría de los clientes descubren que retrasar la decisión les cuesta más a largo plazo."

El prospecto en realidad había escrito: "Esto parece genial, pero necesito obtener aprobación presupuestaria. ¿Podemos hablar en 2 semanas?"

El manejador de objeciones sonó agresivo y desdeñoso. El prospecto nunca volvió a responder.

**La lección:** Los prospectos interesados con restricciones de timing necesitan empatía humana, no manejo automatizado de objeciones.
</ExampleCard>

### Cómo hacer cumplir los límites de C3

La mayoría de las plataformas SDR IA permiten configurar reglas de escalada. Configúralas el día 1:

<InteractiveChecklist
title="Reglas de escalada C3 para configurar"
persistKey="autonomous-sdr-L8-q3-rules"
items={[
"Cualquier respuesta que contenga 'interesado', 'sí', 'llamada', 'reunión' → Escalar a humano",
"Cualquier respuesta que contenga 'precio', 'costo', 'presupuesto', 'descuento' → Escalar a humano",
"Cualquier respuesta que contenga 'molesto', 'detente', 'spam', 'reportar' → Escalar + pausar todos los envíos a este contacto",
"Cualquier DM de LinkedIn → Escalar (nunca responder automáticamente)",
"Cualquier respuesta de un contacto etiquetado como 'VIP' o 'Socio' → Escalar",
"Cualquier respuesta que la IA clasifique como 'Confuso' o 'No claro' → Escalar"
]}
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para fundadores técnicos">
Piensa en las tareas C3 como escrituras en una base de datos de producción. Nunca dejarías que un script sin probar confirmara cambios automáticamente en producción. Mismo principio: las interacciones de alto riesgo con clientes requieren revisión humana.
</ContextualNote>

---

## Actividades C4: Eliminar (deja de hacerlas)

Estas tareas hacen perder tiempo tanto automatizadas como manuales. No mueven la aguja en los resultados.

<DecisionTree
title="¿Deberías mantener esta tarea?"
persistKey="autonomous-sdr-L8-eliminate"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Esta tarea conduce directamente a más reuniones o mejores tasas de conversión?",
choices: [
{ label: "Sí", nextNodeId: "time" },
{ label: "No", nextNodeId: "eliminate" }
]
},
{
id: "time",
content: "¿Toma más de 30 minutos a la semana?",
choices: [
{ label: "Sí", nextNodeId: "automate" },
{ label: "No", nextNodeId: "keep" }
]
},
{
id: "eliminate",
content: "Elimina esta tarea. No está moviendo la aguja.",
isTerminal: true,
outcome: "negative"
},
{
id: "automate",
content: "Considera automatizar o delegar esta tarea.",
isTerminal: true,
outcome: "positive"
},
{
id: "keep",
content: "Sigue haciéndola de forma manual. Es de alto impacto y bajo tiempo.",
isTerminal: true,
outcome: "positive"
}
]}
/>

### Tareas C4 comunes para eliminar

1. **Variantes de pruebas A/B excesivas** — Probar 5+ variantes de líneas de asunto o primeras líneas. Los rendimientos decrecientes aparecen después de 2-3 variantes. Elige tus 2 mejores y sigue adelante.

2. **Sobrepersonalización para prospectos de bajo valor** — Gastar 10 minutos investigando un prospecto con un deal de $500. Usa personalización simple y escalable (sector, cargo) para segmentos de bajo valor.

3. **Informes diarios manuales sobre los que no actúas** — Revisar dashboards solo por revisar. Si no estás tomando decisiones basadas en los datos, deja de revisarlos a diario. Semanal está bien.

4. **Dar formato a los correos más allá de lo profesional simple** — Plantillas HTML elegantes, fuentes personalizadas, encabezados con imágenes. Perjudican la entregabilidad y no mejoran la conversión. El texto simple gana.

5. **Limpiar manualmente campos del CRM que nunca filtras** — Actualizar campos de "Sector" o "Número de empleados" que nunca usas en segmentación. Deja que la IA lo maneje o ignóralos completamente.

6. **Enviar correos de despedida a prospectos que nunca interactuaron** — Si nunca abrieron ni respondieron, no están en tu pipeline. No desperdicies un envío en un correo de despedida. Simplemente para.

<ExampleCard label="Eliminación real: el ahorro de 3 horas semanales">
Jéssica pasaba 3 horas cada semana:
- Probando 5 variantes de líneas de asunto (1.5 horas)
- Actualizando manualmente los campos de "Última actividad" del CRM (1 hora)
- Dando formato a los correos con plantillas personalizadas (30 min)

Eliminó las tres:

- Redujo a 2 variantes de líneas de asunto (30 min)
- Automatizó las actualizaciones del CRM con Zapier (0 min)
- Cambió a correos de texto simple (0 min)

**Tiempo ahorrado:** 2.5 horas/semana. **Impacto en los resultados:** Ninguno. Sus tasas de respuesta mejoraron (texto simple = mejor entregabilidad).
</ExampleCard>

---

## Juntando todo: tu protocolo de decisión de automatización

Ya tienes el marco. Aquí te mostramos cómo aplicarlo a cada función de tu SDR IA.

<TemplateBuilder
title="Protocolo de decisión de automatización"
persistKey="autonomous-sdr-L8-protocol"
sections={[
{
id: "task",
title: "Tarea a evaluar",
fields: [
{ id: "name", label: "Nombre de la tarea", placeholder: "ej. Personalización del primer contacto", type: "text" },
{ id: "current", label: "¿Cómo la manejas actualmente?", placeholder: "Manual / Semi-automatizada / Completamente automatizada", type: "text" }
]
},
{
id: "risk",
title: "Evaluación de riesgo",
fields: [
{ id: "customer-facing", label: "¿Está orientada al cliente?", placeholder: "Sí / No", type: "text" },
{ id: "error-impact", label: "¿Qué ocurre si la IA comete un error aquí?", placeholder: "ej. Deal perdido, queja de spam, daño de marca", type: "textarea" },
{ id: "error-cost", label: "Costo estimado de un error", placeholder: "ej. $5,000 (valor del deal perdido)", type: "text" }
]
},
{
id: "time",
title: "Ahorro de tiempo",
fields: [
{ id: "manual-time", label: "Tiempo para hacerla manualmente (por semana)", placeholder: "ej. 2 horas", type: "text" },
{ id: "ai-time", label: "Tiempo para revisar el output de la IA (por semana)", placeholder: "ej. 20 minutos", type: "text" },
{ id: "savings", label: "Ahorro neto de tiempo", placeholder: "ej. 1 hora 40 min", type: "text" }
]
},
{
id: "decision",
title: "Decisión",
fields: [
{ id: "quadrant", label: "¿Qué cuadrante?", placeholder: "C1 / C2 / C3 / C4", type: "text" },
{ id: "action", label: "¿Qué harás?", placeholder: "Automatizar completamente / Automatizar + control / Mantener humano / Eliminar", type: "text" },
{ id: "implementation", label: "¿Cómo lo implementarás?", placeholder: "ej. Configurar regla de escalada en AiSDR", type: "textarea" }
]
}
]}
/>

### Las reglas de decisión (referencia rápida)

| Si...                                                                 | Entonces...                         |
| --------------------------------------------------------------------- | ----------------------------------- |
| Orientado al cliente + costo del error > $1K                          | C3 (Mantener humano) o C2 (Control) |
| No orientado al cliente + ahorra > 1 hr/semana                        | C1 (Automatizar ahora)              |
| Orientado al cliente + ahorra > 2 hrs/semana + costo del error < $500 | C2 (Automatizar + Control)          |
| Ahorra < 30 min/semana + sin impacto en reuniones                     | C4 (Eliminar)                       |

<RangeSlider 
  label="¿Qué tan seguro te sientes clasificando tus tareas de SDR IA en la matriz?" 
  min={1} 
  max={10} 
  lowLabel="Nada seguro" 
  highLabel="Muy seguro" 
  persistKey="autonomous-sdr-L8-confidence" 
/>

---

## La revisión diaria de 15 minutos: tu control C2 en acción

Ya clasificaste tus tareas. Ahora te explicamos cómo ejecutar el control C2 de manera eficiente.

### El orden de prioridad de la cola de revisión

Cada mañana, revisa en este orden:

1. **Respuestas primero** (5 min) — El riesgo de clasificación errónea es más alto aquí
2. **Primeros contactos a prospectos de alto valor** (5 min) — El riesgo de marca es más alto aquí
3. **Seguimientos en secuencias activas** (3 min) — El riesgo de perder impulso es más alto aquí
4. **Nuevas incorporaciones de prospectos** (2 min) — El riesgo de encaje es más alto aquí

<MiniRoleplay
  scenario="Tu SDR IA clasificó una respuesta como 'No interesado' y redactó un correo de despedida. La respuesta dice: 'Esto parece interesante, pero estamos en medio de un rebranding. ¿Podemos reconectar en el Q2?'"
  role="Estás revisando la clasificación y la respuesta de la IA"
  persistKey="autonomous-sdr-L8-roleplay"
  modelResponse="Clasificación: INCORRECTA. Esto es 'Interesado - Restricción de timing', no 'No interesado'. Acción: Escalar a humano. Respuesta sugerida: 'Totalmente entendido — los rebrandings son agotadores. Te escribo a principios del Q2. Mientras tanto, aquí tienes un recurso rápido sobre [tema relevante].' Configura un recordatorio para el 1 de abril."
/>

### La lista de verificación de 10 segundos

Para cada elemento en tu cola de revisión, pregunta:

<InteractiveChecklist
title="Lista de verificación de 10 segundos"
persistKey="autonomous-sdr-L8-review-checklist"
items={[
"¿La personalización es factualmente precisa?",
"¿El tono coincide con mi voz de marca?",
"¿El CTA es claro y apropiado para esta etapa?",
"¿Estaría orgulloso si este prospecto lo reenviara a su equipo?",
"Si esto sale mal, ¿puedo recuperarme fácilmente?"
]}
/>

Si los 5 son "sí", aprueba. Si alguno es "no", edita o rechaza.

<InsightCard icon="🎯" title="El 80/20 del tiempo de revisión">
El 80% de tu tiempo de revisión debe dedicarse al 20% mejor de los prospectos (alto valor del deal, compromiso activo, cuentas estratégicas). El 80% inferior puede enviarse automáticamente con revisión mínima. Prioriza sin piedad.
</InsightCard>

---

## Errores comunes: qué no hacer

<SlideNavigation>
<Slide title="Error 1: Saltarse la revisión 'solo esta vez'">

**La trampa:** Tu SDR IA ha sido perfecto durante 2 semanas. Estás ocupado. Te saltas la revisión matutina.

**Qué pasa:** Ese es el día en que la IA alucina un detalle de personalización, envía al segmento equivocado o clasifica mal una respuesta caliente.

**La solución:** 15 minutos inamovibles cada mañana. Pon un bloque en el calendario. Trátalo como una reunión de standup con tu SDR IA.

</Slide>

<Slide title="Error 2: Automatizar tareas C3 'para ahorrar tiempo'">

**La trampa:** "Solo voy a automatizar los DMs de LinkedIn para ahorrar 30 minutos al día."

**Qué pasa:** Tu cuenta es restringida. O peor, envías un DM robótico a un prospecto tibio y matas la relación.

**La solución:** Las tareas C3 son C3 por una razón. El ahorro de tiempo no justifica el riesgo. Mantenlas humanas.

</Slide>

<Slide title="Error 3: No configurar reglas de escalada">

**La trampa:** Asumes que la IA escalará automáticamente las respuestas importantes.

**Qué pasa:** La IA responde automáticamente a una pregunta sobre precios con una respuesta genérica. El prospecto desaparece.

**La solución:** Configura las reglas de escalada el día 1. Pruébalas con respuestas de muestra antes de lanzarte.

</Slide>

<Slide title="Error 4: Revisar todo (sin automatización C1)">

**La trampa:** "No confío en la IA. Voy a revisar cada rebote, cada actualización del CRM, cada cronograma de calentamiento."

**Qué pasa:** Gastas 2 horas/día en tareas administrativas que no mueven la aguja. Te agota.

**La solución:** Confía en la matriz. Las tareas C1 son seguras de automatizar. Deja que la IA las maneje.

</Slide>

<Slide title="Error 5: No eliminar las tareas C4">

**La trampa:** "Siempre he revisado este dashboard a diario. Debería seguir haciéndolo."

**Qué pasa:** Desperdicias 30 minutos/día en tareas que no impactan los resultados.

**La solución:** Audita tus tareas trimestralmente. Si no conduce a más reuniones o mejor conversión, para.

</Slide>
</SlideNavigation>

---

## Tu plan de acción: implementar la matriz esta semana

<InteractiveChecklist
title="Lista de verificación de implementación — Semana 1"
persistKey="autonomous-sdr-L8-actions"
items={[
"Haz una lista de cada tarea que tu SDR IA realiza actualmente (o podría realizar)",
"Clasifica cada tarea en C1, C2, C3 o C4 usando el protocolo de decisión",
"Configura las reglas de escalada para todas las tareas C3 en tu plataforma SDR IA",
"Establece tu bloque diario de revisión de 15 minutos (a la misma hora cada mañana)",
"Automatiza todas las tareas C1 (o verifica que ya estén automatizadas)",
"Elimina al menos 2 tareas C4 (deja de hacerlas completamente)",
"Prueba tu control C2 con 10 correos/respuestas de muestra",
"Documenta tus decisiones en tu Manual de Operaciones del SDR IA (artefacto del Curso 26)"
]}
/>

### Semana 2: Calibración

Después de una semana usando la matriz:

<TemplateBuilder
title="Revisión de calibración — Semana 2"
persistKey="autonomous-sdr-L8-calibration"
sections={[
{
id: "metrics",
title: "Verificación de métricas",
fields: [
{ id: "review-time", label: "Tiempo promedio de revisión diaria", placeholder: "ej. 18 minutos", type: "text" },
{ id: "errors-caught", label: "Errores detectados en la revisión", placeholder: "ej. 3 alucinaciones, 2 clasificaciones erróneas", type: "textarea" },
{ id: "errors-missed", label: "Errores que pasaron desapercibidos", placeholder: "ej. 1 correo genérico a prospecto VIP", type: "textarea" }
]
},
{
id: "adjustments",
title: "Ajustes necesarios",
fields: [
{ id: "move-to-q3", label: "Tareas a mover de C2 a C3 (demasiado riesgosas)", placeholder: "ej. Seguimientos a prospectos tibios", type: "textarea" },
{ id: "move-to-q1", label: "Tareas a mover de C2 a C1 (suficientemente seguras)", placeholder: "ej. Seguimientos a prospectos fríos", type: "textarea" },
{ id: "new-rules", label: "Nuevas reglas de escalada para agregar", placeholder: "ej. Escalar cualquier respuesta que mencione competidores", type: "textarea" }
]
}
]}
/>

---

## Resumen: la matriz en una página

<FlipCard 
  front="C1: Automatizar ahora" 
  back="Bajo riesgo, alto ahorro de tiempo. Calentamiento de correo, procesamiento de rebotes, actualizaciones del CRM, analítica. Configúralo y olvídate." 
/>

<FlipCard 
  front="C2: Automatizar + Control humano" 
  back="Alto riesgo, alto ahorro de tiempo. Personalización del primer contacto, clasificación de respuestas, seguimientos. La IA genera, tú apruebas (10-30 seg por elemento)." 
/>

<FlipCard 
  front="C3: Mantener humano" 
  back="Alto riesgo, bajo ahorro de tiempo. Respuestas a prospectos interesados, precios, DMs en LinkedIn, quejas. Nunca automatices, ni siquiera con controles." 
/>

<FlipCard 
  front="C4: Eliminar" 
  back="Bajo riesgo, bajo ahorro de tiempo. Pruebas A/B excesivas, sobrepersonalización para prospectos de bajo valor, informes sin uso. Para de hacerlos." 
/>

### El principio central

**Automatiza lo repetitivo, controla lo arriesgado, humaniza lo de alto riesgo, elimina lo inútil.**

Tu SDR IA es un multiplicador de fuerzas, no un reemplazo. La matriz garantiza que multipliques las cosas correctas.

<InteractiveChecklist
title="Acciones finales"
persistKey="autonomous-sdr-L8-final-actions"
items={[
"Completa el Protocolo de Decisión de Automatización para tus 10 principales tareas del SDR IA",
"Configura las reglas de escalada para todas las tareas C3",
"Establece tu bloque de revisión diaria de 15 minutos (inamovible)",
"Elimina al menos 2 tareas C4 esta semana",
"Documenta tus decisiones de la matriz en tu Manual de Operaciones del SDR IA",
"Programa una revisión de calibración en la Semana 2 para ajustar las clasificaciones"
]}
/>

---

**Próxima lección:** Compararemos la economía de las plataformas SDR IA versus los stacks propios — ¿cuándo justifica la inversión de $750-5.000/mes para fundadores en solitario?
