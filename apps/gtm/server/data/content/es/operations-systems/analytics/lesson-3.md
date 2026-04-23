---
title: "Velocidad del Pipeline: Días Promedio Entre Etapas"
duration: "50 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 3
---

# Velocidad del Pipeline: Días Promedio Entre Etapas

## La Pregunta de $40K

Sarah tenía 12 negocios en su pipeline. Valor total: $84.000. Se sentía segura — "Tengo muchas oportunidades."

Tres meses después, había cerrado exactamente un negocio. $7.000.

¿Qué pasó? **Su pipeline no se estaba moviendo.** Los negocios se quedaban en "Propuesta Enviada" por 45 días. Los prospectos desaparecían después de las reuniones. Los seguimientos se arrastraban por semanas.

Tenía volumen. No tenía **velocidad**.

Aquí está la verdad que la mayoría de los fundadores se pierden: **Un pipeline lento es un pipeline moribundo.** Cuanto más tiempo se quede un negocio, menos probable es que cierre. Cada día adicional es un impuesto compuesto sobre tu tasa de victorias.

Esta lección te enseña a medir, diagnosticar y acelerar la velocidad del pipeline — la métrica compuesta más importante en ventas.

<InsightCard icon="⚡" title="La Perspectiva de Velocidad">
La velocidad del pipeline no se trata de trabajar más duro. Se trata de identificar dónde se estancan los negocios y eliminar sistemáticamente la fricción. Una mejora del 10% en la duración del ciclo se combina con mejoras en la tasa de victorias y el tamaño del negocio para crear un 33% más de ingresos.
</InsightCard>

---

## La Fórmula de Velocidad del Pipeline

La mayoría de los fundadores rastrean **cuántos negocios** tienen. Los fundadores inteligentes rastrean **qué tan rápido se mueven los negocios**.

La velocidad del pipeline es una métrica compuesta:

**Velocidad = (Número de Oportunidades × Tasa de Victorias × Tamaño Promedio del Negocio) / Duración Promedio del Ciclo de Ventas**

Desglosemos eso:

<FlipCard 
  front="¿Qué significa cada variable?" 
  back="N = oportunidades en pipeline | W = % que cierran | D = valor promedio en $ | L = días promedio desde lead hasta cierre. Mejorar CUALQUIER variable mejora la velocidad." 
/>

Aquí está el porqué esto importa: **Las pequeñas mejoras se componen exponencialmente.**

<ScenarioSimulator
title="Calculadora de Impacto de Velocidad"
persistKey="analytics-L3-velocity-sim"
levers={[
{ id: "opps", label: "Oportunidades en pipeline", min: 5, max: 50, step: 5, defaultValue: 20 },
{ id: "winRate", label: "Tasa de victorias (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
{ id: "dealSize", label: "Tamaño promedio del negocio ($)", min: 1000, max: 20000, step: 1000, defaultValue: 5000 },
{ id: "cycleLength", label: "Ciclo de ventas (días)", min: 14, max: 90, step: 7, defaultValue: 35 }
]}
outputs={[
{ id: "monthlyRevenue", label: "Velocidad de ingresos mensual", formula: "(opps * (winRate / 100) * dealSize) / (cycleLength / 30)", unit: "$", precision: 0 }
]}
insight="Con {monthlyRevenue} de velocidad mensual, vas camino a ${monthlyRevenue \* 12} en ingresos anuales. Intenta mejorar cada palanca solo un 10% y observa lo que pasa."
/>

**Inténtalo:** En el simulador de arriba, mejora la tasa de victorias del 25% al 30% (solo 5 puntos porcentuales). Luego reduce la duración del ciclo de 35 a 30 días. Observa cómo los ingresos mensuales saltan más del 40%.

Ese es el poder del pensamiento de velocidad.

---

## Duración por Etapa: Dónde Van los Negocios a Morir

Tu pipeline tiene etapas. Los leads se convierten en contactos. Los contactos en reuniones. Las reuniones en propuestas. Las propuestas en victorias.

**Cada etapa tiene una duración.** Y cada etapa tiene un punto donde la duración se convierte en sentencia de muerte.

<ExampleCard label="Datos Reales: El Precipicio de la Propuesta a los 14 Días">
El análisis de más de 10.000 negocios B2B muestra: las propuestas que quedan sin respuesta por 14+ días cierran a una **tasa del 8%**. Las propuestas respondidas dentro de 7 días cierran a una **tasa del 35%**. ¿Después de 30 días? La tasa de cierre cae al **2%**.

La lección: Una propuesta que lleva 3 semanas en espera no está "aún en juego." Está muerta. Solo no lo has admitido todavía.
</ExampleCard>

Aquí están los benchmarks para ciclos de ventas B2B en PyMEs:

| Transición de Etapa         | Duración Meta  | Duración de Alerta | Qué Significa                                  |
| --------------------------- | -------------- | ------------------ | ---------------------------------------------- |
| Lead → Primer Contacto      | < 2 días       | > 5 días           | La velocidad de contacto lo es todo            |
| Contacto → Respuesta Activa | 3-7 días       | > 14 días          | Problema de mensajería o segmentación          |
| Activo → Reunión Agendada   | 5-10 días      | > 21 días          | CTA débil o baja urgencia                      |
| Reunión → Propuesta Enviada | 3-7 días       | > 14 días          | No te estás moviendo lo suficientemente rápido |
| Propuesta → Decisión        | 5-14 días      | > 30 días          | Negocio estancado o muerto                     |
| **Ciclo Total**             | **20-45 días** | **> 60 días**      | Proceso de empresa grande o mal ajuste         |

<RangeSlider 
  label="¿Cuál es tu ciclo de ventas total promedio ahora mismo?" 
  min={7} 
  max={120} 
  lowLabel="7 días" 
  highLabel="120+ días" 
  persistKey="analytics-L3-current-cycle" 
/>

Si respondiste 60+ días, o estás vendiendo a empresas grandes (ICP equivocado para un fundador en solitario) o tienes una fricción masiva en tu proceso.

---

## La Ventaja de la Velocidad de Contacto

Enfoquémonos en la primera etapa: **Lead → Primer Contacto.**

Aquí es donde la mayoría de los fundadores pierden negocios antes de que siquiera comiencen.

<InsightCard icon="🏃" title="La Regla de los 5 Minutos">
Responder a un lead en 5 minutos te hace **100x más probable de conectar** que responder después de 30 minutos. Responder dentro de 1 hora te hace 7x más probable que responder después de 24 horas.

¿Después de 24 horas? El lead está funcionalmente muerto.
</InsightCard>

¿Por qué la velocidad importa tanto?

1. **La intención del comprador decae rápidamente.** La persona que llenó tu formulario está pensando en su problema _ahora mismo_. En 2 horas, está en reuniones. En 24 horas, se ha movido.
2. **El primero en responder gana.** El 78% de los negocios B2B van al proveedor que responde primero, no al "mejor" proveedor.
3. **La velocidad señala seriedad.** Respuesta rápida = "Esta empresa tiene las cosas claras." Respuesta lenta = "No necesitan mi negocio."

<StrategyDuel
title="Estrategia de Velocidad de Contacto"
persistKey="analytics-L3-speed-duel"
scenario="Obtienes 3-5 leads entrantes por semana. Eres un fundador en solitario sin equipo de SDR."
strategyA={{
    name: "Respuesta Manual",
    description: "Revisar correo dos veces al día, responder personalmente en 4 horas",
    pros: ["Totalmente personalizado", "Sin costo de automatización"],
    cons: ["Perder la ventana de 5 minutos", "Perder 70%+ de leads ante competidores más rápidos"]
  }}
strategyB={{
    name: "Respuesta Automática + Seguimiento Rápido",
    description: "Respuesta automática instantánea con enlace de calendario + seguimiento personal en 1 hora",
    pros: ["Alcanzar la ventana de 5 minutos", "El enlace de calendario captura la intención", "Aún añades el toque personal"],
    cons: ["Requiere configuración de automatización (30 min una sola vez)"]
  }}
expertVerdict="La Estrategia B gana. La respuesta automática te da tiempo. El enlace de calendario convierte leads calientes al instante. Haces seguimiento personal en una hora para leads tibios. Lo mejor de ambos mundos."
/>

**Elemento de acción:** Configura una respuesta automática para tu formulario de contacto que se envíe en 60 segundos. Incluye un enlace de calendario y una nota personal: "Haré seguimiento en la próxima hora, pero si quieres saltarte la espera, elige un horario aquí."

---

## Construyendo Tu Rastreador de Velocidad

Es tiempo de construir el artefacto de esta lección: un **Rastreador de Velocidad del Pipeline** que te muestre exactamente dónde se están estancando los negocios.

Rastrearás tres cosas:

1. **Días promedio en cada etapa** (en todos los negocios activos)
2. **Negocios que superan 2x la duración meta** (tus negocios estancados)
3. **Tendencia de duración total del ciclo** (¿está mejorando o degradándose la velocidad?)

<TemplateBuilder
title="Rastreador de Velocidad del Pipeline"
persistKey="analytics-L3-velocity-tracker"
sections={[
{
id: "stages",
title: "Define las Etapas de Tu Pipeline",
fields: [
{ id: "stage1", label: "Nombre de Etapa 1", placeholder: "p. ej., Lead", type: "text" },
{ id: "stage1Target", label: "Días Meta en Etapa 1", placeholder: "p. ej., 2", type: "number" },
{ id: "stage2", label: "Nombre de Etapa 2", placeholder: "p. ej., Contactado", type: "text" },
{ id: "stage2Target", label: "Días Meta en Etapa 2", placeholder: "p. ej., 7", type: "number" },
{ id: "stage3", label: "Nombre de Etapa 3", placeholder: "p. ej., Reunión Realizada", type: "text" },
{ id: "stage3Target", label: "Días Meta en Etapa 3", placeholder: "p. ej., 7", type: "number" },
{ id: "stage4", label: "Nombre de Etapa 4", placeholder: "p. ej., Propuesta Enviada", type: "text" },
{ id: "stage4Target", label: "Días Meta en Etapa 4", placeholder: "p. ej., 10", type: "number" }
]
},
{
id: "currentDeals",
title: "Instantánea Actual del Pipeline",
fields: [
{ id: "totalDeals", label: "Total de negocios activos", placeholder: "p. ej., 12", type: "number" },
{ id: "avgCycleLength", label: "Duración promedio del ciclo total (días)", placeholder: "p. ej., 42", type: "number" },
{ id: "stalledDeals", label: "Negocios que superan 2x la duración meta", placeholder: "p. ej., 4", type: "number" }
]
}
]}
/>

Una vez que hayas llenado esto, tienes tu línea base. Ahora necesitas **rastrearlo semanalmente.**

---

## La Revisión Semanal de Velocidad

Cada viernes (al mismo tiempo que tu revisión de embudo de la Lección 2), añade una **verificación de velocidad de 5 minutos**:

<InteractiveChecklist
title="Revisión de Velocidad del Viernes (5 min)"
persistKey="analytics-L3-friday-review"
items={[
"Extraer días promedio en etapa para cada etapa del pipeline desde tu CRM",
"Identificar negocios que hayan estado en una etapa por 2x la duración meta",
"Para cada negocio estancado: ¿cuál es la próxima acción? Agéndala.",
"Calcular la duración promedio total del ciclo de esta semana",
"Comparar con la semana pasada: ¿está mejorando o degradándose la velocidad?"
]}
/>

**El patrón que buscas:** La velocidad debería **mejorar con el tiempo** a medida que eliminas fricción. Si tu duración promedio del ciclo está aumentando semana a semana, tienes un problema de proceso.

<ExampleCard label="Caso de Estudio: La Mejora de 21 Días">
Marcus rastreó la velocidad durante 8 semanas. Semana 1: el ciclo promedio era de 52 días. Identificó el cuello de botella: las propuestas se quedaban en espera 18 días en promedio.

Su solución: comenzó a enviar propuestas dentro de 24 horas de la reunión (en lugar de 3-5 días). Añadió una "llamada de revisión de propuesta" 3 días después de enviar.

Semana 8: el ciclo promedio bajó a 31 días. Misma tasa de victorias, 40% más velocidad = 40% más ingresos con el mismo esfuerzo.
</ExampleCard>

---

## Diagnosticando Cuellos de Botella de Velocidad

Cuando detectas una etapa con duración excesiva, así es cómo diagnosticar la causa raíz:

<ClassifyExercise
title="Diagnóstico de Cuello de Botella de Velocidad"
persistKey="analytics-L3-bottleneck-classify"
categories={[
{ id: "targeting", label: "Problema de Segmentación", color: "#ef4444" },
{ id: "process", label: "Problema de Proceso", color: "#f59e0b" },
{ id: "skill", label: "Problema de Habilidad", color: "#3b82f6" }
]}
items={[
{ id: "1", content: "Los leads toman 14+ días para responder al primer contacto", correctCategory: "targeting", explanation: "ICP equivocado o baja calidad de lista. Los prospectos correctos responden rápido." },
{ id: "2", content: "Reuniones agendadas pero tasa de no asistencia del 40%", correctCategory: "process", explanation: "Sin secuencia de confirmación ni recordatorios de calendario." },
{ id: "3", content: "Propuestas enviadas pero los prospectos desaparecen", correctCategory: "skill", explanation: "El descubrimiento fue débil o la propuesta no coincide con su dolor." },
{ id: "4", content: "Negocios en 'Sí Verbal' por 20+ días", correctCategory: "process", explanation: "Sin próximos pasos claros o fricción en el contrato." },
{ id: "5", content: "Alta tasa de respuesta pero baja conversión a reunión", correctCategory: "skill", explanation: "CTA débil o mala calificación en las respuestas." }
]}
/>

Una vez que hayas clasificado el cuello de botella, la solución se vuelve obvia:

- **Problema de segmentación** → Ajusta tu ICP (de vuelta al Curso 21-23)
- **Problema de proceso** → Añade automatización o lista de verificación (Curso 42)
- **Problema de habilidad** → Practica la habilidad específica (Cursos 31-36)

---

## Las Palancas de Mejora de Velocidad

Tienes **cuatro palancas** para mejorar la velocidad:

<SlideNavigation>
<Slide title="Palanca 1: Aumentar Oportunidades">
Más negocios en pipeline = más ingresos mensuales (si otras variables se mantienen constantes).

**Cómo usar esta palanca:**

- Aumentar el volumen de contacto (Curso 24)
- Añadir un nuevo canal de adquisición (Curso 21)
- Mejorar la calidad de leads para que más ingresen al pipeline (Curso 23)

**Advertencia:** Esta es la palanca _menos_ efectiva para fundadores en solitario. Tienes restricciones de tiempo. Enfócate en las otras tres primero.
</Slide>

<Slide title="Palanca 2: Aumentar la Tasa de Victorias">
Cierra un mayor % de negocios que entran a tu pipeline.

**Cómo usar esta palanca:**

- Ajustar la segmentación del ICP (menos leads de mal ajuste)
- Mejorar las habilidades de descubrimiento (Curso 33)
- Fortalecer tu proceso de cierre (Curso 36)
- Mejor manejo de objeciones (Curso 35)

**Impacto:** Pasar del 20% al 25% de tasa de victorias = 25% más ingresos sin esfuerzo adicional.
</Slide>

<Slide title="Palanca 3: Aumentar el Tamaño del Negocio">
Cobra más o vende adicional durante el proceso de ventas.

**Cómo usar esta palanca:**

- Sube los precios (en serio, la mayoría de los fundadores cobran de menos)
- Ofrece planes anuales con descuento
- Añade implementación o nivel premium durante la propuesta
- Apunta a empresas ligeramente más grandes (más presupuesto)

**Impacto:** Pasar de $5K a $6K de negocio promedio = 20% más ingresos por negocio.
</Slide>

<Slide title="Palanca 4: Reducir la Duración del Ciclo">
Mueve los negocios por el pipeline más rápido.

**Cómo usar esta palanca:**

- Responde leads en 5 minutos (automatización)
- Envía propuestas dentro de 24 horas de la reunión
- Añade urgencia (lugares limitados, aumento de precio, necesidad estacional)
- Elimina fricción (simplifica contrato, ofrece planes de pago)

**Impacto:** Pasar de 40 días a 30 días = 33% más negocios cerrados por año.
</Slide>
</SlideNavigation>

**El efecto compuesto:** Mejora cada palanca solo un 10%. El resultado no es un 10% más de ingresos — es un **46% más de ingresos** debido al efecto compuesto.

<ScenarioSimulator
title="Mejora Compuesta de Velocidad"
persistKey="analytics-L3-compound-sim"
levers={[
{ id: "oppImprovement", label: "Aumento de oportunidades (%)", min: 0, max: 50, step: 5, defaultValue: 10 },
{ id: "winRateImprovement", label: "Aumento de tasa de victorias (%)", min: 0, max: 50, step: 5, defaultValue: 10 },
{ id: "dealSizeImprovement", label: "Aumento de tamaño de negocio (%)", min: 0, max: 50, step: 5, defaultValue: 10 },
{ id: "cycleReduction", label: "Reducción de duración del ciclo (%)", min: 0, max: 50, step: 5, defaultValue: 10 }
]}
outputs={[
{ id: "totalImprovement", label: "Mejora total de ingresos", formula: "((1 + oppImprovement/100) * (1 + winRateImprovement/100) * (1 + dealSizeImprovement/100) * (1 / (1 - cycleReduction/100)) - 1) * 100", unit: "%", precision: 1 }
]}
insight="Una mejora del {totalImprovement}% significa que si hacías $10K/mes, ahora harías ${10000 \* (1 + totalImprovement/100)} — solo con pequeñas mejoras sistemáticas."
/>

---

## El Protocolo para Negocios Estancados

Identificaste negocios estancados (2x+ la duración meta). ¿Y ahora qué?

Aquí está el protocolo:

<ProgressiveReveal title="El Protocolo de 3 Pasos para Negocios Estancados" persistKey="analytics-L3-stalled-protocol">
<RevealSection title="Paso 1: Diagnostica el Estancamiento">
Pregúntate:
- ¿Desapareció el campeón?
- ¿Están esperando aprobación interna?
- ¿Surgió una prioridad competidora?
- ¿Fue la propuesta poco clara o desalineada?
- ¿Hay un bloqueo que no conozco?

**Acción:** Envía un check-in directo y honesto: "Hola [Nombre], noté que no nos hemos conectado desde [fecha]. ¿Qué cambió de tu parte?"
</RevealSection>

<RevealSection title="Paso 2: Ofrece una Salida Fácil">
Dale permiso de decir que no. En serio.

**Plantilla:** "Si esto no es una prioridad ahora, lo entiendo completamente. ¿Tendría sentido revisarlo en [período de tiempo], o debería cerrarlo?"

**Por qué funciona:**

- Elimina la presión (paradójicamente aumenta el engagement)
- Saca a la luz el bloqueo real ("En realidad, mi jefe quiere ver...")
- Limpia negocios muertos de tu pipeline (mejor pronóstico)
  </RevealSection>

<RevealSection title="Paso 3: Crea Nueva Urgencia">
Si vuelven a participar, crea una razón para moverse *ahora*:
- "Tenemos 2 espacios de incorporación disponibles este mes"
- "Los precios aumentan el 1 de marzo"
- "Tu competidor acaba de firmar — vas quedando atrás"
- "Puedo ponerte en marcha antes de [evento estacional]"

**Advertencia:** Esto solo funciona si es _verdad_. La urgencia falsa destruye la confianza.
</RevealSection>
</ProgressiveReveal>

<MiniRoleplay
  scenario="La propuesta de un prospecto lleva 21 días en espera. Envías: 'Hola Sarah, haciendo seguimiento de la propuesta que envié hace 3 semanas. ¿Sigue interesada?' Ella responde: 'Sí, solo he estado muy ocupada. La revisaré esta semana.'"
  role="Tú eres el fundador. ¿Qué dices a continuación?"
  persistKey="analytics-L3-stalled-roleplay"
  modelResponse="'Totalmente entendido — sé cómo va. Para hacerlo más fácil: ¿puedo guiarte por la propuesta en una llamada rápida de 15 minutos esta semana? Puedo responder preguntas en tiempo real y ajustamos lo que no encaje. Aquí está mi calendario: [enlace].' (Elimina fricción, crea urgencia, ofrece valor.)"
/>

---

## Asesinos de Velocidad que Evitar

Estos son los asesinos silenciosos del pipeline que destruyen la velocidad:

<FlipCard 
  front="Asesino de Velocidad #1: El Correo 'Solo Verificando'" 
  back="Seguimientos genéricos sin valor añadido. Los prospectos los ignoran. En su lugar: comparte un caso de estudio, artículo o perspectiva relevante. Dales una razón para responder." 
/>

<FlipCard 
  front="Asesino de Velocidad #2: Esperar el Momento 'Perfecto'" 
  back="Demoras enviar la propuesta porque quieres pulirla más. Cada día que esperas, la tasa de cierre baja. Envíala dentro de 24 horas de la reunión, aunque sea imperfecta." 
/>

<FlipCard 
  front="Asesino de Velocidad #3: Sin Próximos Pasos Claros" 
  back="La reunión termina sin agendar la próxima llamada ni definir la próxima acción. Siempre termina con: 'Entonces el próximo paso es [X] para el [fecha]. Te enviaré una invitación de calendario para [Y] el [fecha].'" 
/>

<FlipCard 
  front="Asesino de Velocidad #4: Parálisis Multi-Parte" 
  back="Estás esperando que 3 personas se alineen. Esto puede tomar meses. Solución: pide a tu campeón que agende una llamada grupal. Reúne a todos en una sala (virtual o real)." 
/>

<FlipCard 
  front="Asesino de Velocidad #5: Fricción en el Contrato" 
  back="Tu contrato requiere revisión legal, 3 firmas y un juramento de sangre. Simplifícalo. Ofrece un MSA + SOW simple. Usa DocuSign. Elimina cada punto posible de fricción." 
/>

---

## Tu Plan de Acción de Velocidad

Es tiempo de convertir esto en acción.

<InteractiveChecklist
title="Acciones de Velocidad de Esta Semana"
persistKey="analytics-L3-action-plan"
items={[
"Configura tu Rastreador de Velocidad del Pipeline (usa el constructor de plantillas arriba)",
"Extrae los días promedio en etapa actuales de tu CRM para cada etapa del pipeline",
"Identifica tus 3 negocios de movimiento más lento y aplica el Protocolo para Negocios Estancados",
"Configura una respuesta automática para leads entrantes (alcanza la ventana de 5 minutos)",
"Añade 'Verificación de Velocidad' a tu revisión de métricas del viernes (5 minutos)",
"Elige UNA palanca de velocidad para mejorar un 10% este mes",
"Agenda envíos de propuestas dentro de 24 horas de reuniones (bloquea tiempo en calendario)"
]}
/>

---

## Resumen: La Mentalidad de Velocidad

La velocidad del pipeline no es una métrica que verificas una vez. Es una **mentalidad** que adoptas.

Cada negocio en tu pipeline está **acelerando** o **decayendo**. No hay neutral. Cuanto más tiempo se quede un negocio, menos probable es que cierre.

Tu trabajo como fundador en solitario:

1. **Medir la velocidad** (días en cada etapa, duración total del ciclo)
2. **Identificar cuellos de botella** (dónde se estancan los negocios)
3. **Eliminar fricción** (automatizar, simplificar, acelerar)
4. **Mejorar sistemáticamente** (ganancias del 10% se componen a más del 40% de crecimiento en ingresos)

Los fundadores que ganan no son los que tienen los pipelines más grandes. Son los que tienen los **pipelines más rápidos**.

<InsightCard icon="🎯" title="La Verdad de la Velocidad">
Un pipeline de $50K moviéndose a 30 días genera más ingresos que un pipeline de $200K moviéndose a 90 días. La velocidad supera al tamaño.
</InsightCard>

Próxima lección: **Pronóstico Commit vs. Potencial Adicional** — cómo neutralizar el optimismo del fundador y predecir los ingresos con precisión.

---

## Quiz: Dominio de la Velocidad del Pipeline

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuál es la fórmula de velocidad del pipeline?",
      "options": [
        "Velocidad = Oportunidades × Tasa de Victorias",
        "Velocidad = (Oportunidades × Tasa de Victorias × Tamaño del Negocio) / Duración del Ciclo",
        "Velocidad = Tamaño del Negocio / Duración del Ciclo",
        "Velocidad = Tasa de Victorias × Duración del Ciclo"
      ],
      "correctAnswer": 1,
      "explanation": "La velocidad del pipeline es una métrica compuesta: (N × W × D) / L. Las cuatro variables importan."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Responder a un lead en 5 minutos te hace cuánto más probable de conectar vs. 30 minutos?",
      "options": [
        "2x más probable",
        "10x más probable",
        "50x más probable",
        "100x más probable"
      ],
      "correctAnswer": 3,
      "explanation": "La investigación muestra una mejora de 100x. La velocidad de contacto es la ventaja de velocidad #1."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "Una propuesta sin respuesta por 14+ días tiene qué tasa de cierre típica?",
      "options": ["35%", "20%", "8%", "2%"],
      "correctAnswer": 2,
      "explanation": "Después de 14 días, la tasa de cierre cae a ~8%. Después de 30 días, es ~2%. Los negocios estancados son negocios muertos."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Mejorar cada palanca de velocidad (oportunidades, tasa de victorias, tamaño del negocio, duración del ciclo) un 10% resulta en aproximadamente un 10% de mejora total en ingresos.",
      "correctAnswer": false,
      "explanation": "Falso. Las palancas se componen. Una mejora del 10% en cada una = ~46% de mejora total debido a la multiplicación."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "¿Cuál palanca de velocidad es MENOS efectiva para fundadores en solitario?",
      "options": [
        "Aumentar oportunidades (más volumen de pipeline)",
        "Aumentar la tasa de victorias (cerrar más negocios)",
        "Aumentar el tamaño del negocio (cobrar más)",
        "Reducir la duración del ciclo (moverse más rápido)"
      ],
      "correctAnswer": 0,
      "explanation": "Los fundadores en solitario tienen restricciones de tiempo. Añadir más volumen es difícil. Enfócate primero en la tasa de victorias, el tamaño del negocio y la duración del ciclo."
    }
  ]
}
```
