---
title: "Pronóstico Commit vs. Potencial Adicional"
duration: "50 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 4
---

## El Agujero de $80K en Ingresos

Conoce a Jordan, un fundador técnico que dirige un SaaS de herramientas de desarrollo. Hace tres meses, pronosticó $80K en ingresos para el Q4. Tenía 12 negocios en pipeline, todos "con buena pinta." Su hoja de cálculo mostraba interés verbal de prospectos, retroalimentación positiva en demos y reuniones de seguimiento agendadas.

Ingresos reales del Q4: $31K.

¿Qué pasó? Jordan cayó en la **trampa del optimismo del fundador**. Cada negocio en su pipeline se sentía como que iba a cerrar. El prospecto que dijo "esto se ve interesante" fue ponderado igual que el que dijo "envíame un contrato." El demo que salió bien se contó como una victoria casi segura.

Para diciembre, Jordan estaba apurado. Había rechazado trabajo de consultoría porque pensaba que tenía $80K entrando. Había contratado a un colaborador que no podía pagar. Y había perdido tres meses que podría haber gastado realmente cerrando negocios en lugar de celebrar ingresos fantasma.

<InsightCard icon="🎯" title="El Problema Real">
Los fundadores no mienten sobre su pipeline. Simplemente no pueden distinguir entre "interesado" y "comprometido" hasta que es demasiado tarde.
</InsightCard>

Hoy vas a aprender el **sistema binario de pronóstico commit/potencial adicional** que neutraliza el sesgo de optimismo y te da predicciones de ingresos precisas. Al final de esta lección, podrás mirar tu pipeline y saber — con 70-80% de precisión — qué va a cerrar realmente este mes.

---

## Por Qué los Fundadores Sobre-Pronostican (Y Cómo Parar)

### El Impuesto del Sesgo de Optimismo

Cada fundador lo paga. Estás programado para ver posibilidad en cada conversación. Un prospecto dice "déjame pensarlo" y escuchas "estoy 80% adentro." Te piden una propuesta y mentalmente registras los ingresos.

Los datos son brutales:

<FlipCard 
  front="¿Qué % de negocios en tu pipeline ya están muertos?" 
  back="El 60% de los negocios en tu pipeline ya están perdidos — solo que aún no lo sabes. (CSO Insights)" 
/>

<RangeSlider 
  label="¿Con qué frecuencia alcanzas tu pronóstico de ingresos mensual?" 
  min={0} 
  max={10} 
  lowLabel="Nunca" 
  highLabel="Siempre" 
  persistKey="analytics-L4-forecast-accuracy" 
/>

Esto es lo que muestra la investigación:

- **Precisión promedio de pronóstico en todas las organizaciones de ventas: 47%** (Gartner) — básicamente una moneda al aire
- **Los fundadores en solitario sobre-pronostican en promedio un 40-60%** — el sesgo de optimismo es extremo sin calibración de equipo
- **Incluso los SDRs profesionales solo alcanzan el 60% de su cuota** (Bridge Group) — y tienen gerentes que los mantienen honestos

El problema no es que seas malo en ventas. Es que **el interés verbal se siente como compromiso** cuando tú eres quien necesita los ingresos.

<ExampleCard label="Caso de Estudio: El Sí Verbal Que No Lo Era">
Alex, fundador de un negocio de coaching, tuvo un prospecto que dijo "sí, hagámoslo" en una llamada de descubrimiento. Alex envió el contrato. El prospecto guardó silencio dos semanas, luego respondió: "En realidad, necesito hablar primero con mi socio de negocios."

Alex ya había contado esos $5K en su pronóstico. Incluso había planeado cómo gastarlos. El negocio eventualmente cerró... tres meses después, después de dos momentos de "sí" más que tampoco eran realmente sí.

**La lección:** Hasta que el dinero se mueva o se firme un contrato, no es un commit. Es potencial adicional.
</ExampleCard>

### Las Cuatro Etapas de la Ilusión del Fundador

La mayoría de los fundadores pasan por estas etapas mientras aprenden a pronosticar:

<SlideNavigation>
<Slide title="Etapa 1: Optimismo Puro">
**"¡Todos van a comprar!"**

Cuentas cada lead como un cliente futuro. Tu pronóstico es simplemente tu pipeline × 100%. Te sorprende constantemente cuando los negocios no cierran.

**Verificación de realidad:** Esta etapa generalmente dura 3-6 meses hasta que te has quemado suficientes veces.
</Slide>

<Slide title="Etapa 2: Descuento Arbitrario">
**"Bueno, tal vez el 50% cerrará."**

Empiezas a aplicar un descuento general a tu pipeline. "Tengo $100K en pipeline, así que pronosticaré $50K." Mejor que la Etapa 1, pero sigue siendo extremadamente impreciso porque no todos los negocios son iguales.

**Verificación de realidad:** Esto te lleva a tal vez 40-50% de precisión. Seguirás perdiendo el pronóstico por la mitad.
</Slide>

<Slide title="Etapa 3: Estimación Ponderada por Etapa">
**"Los leads son 10%, las reuniones son 40%, las propuestas son 60%..."**

Asignas probabilidades por etapa. Esto es más cercano al pronóstico real, pero sigues adivinando los porcentajes. Y no estás considerando las diferencias de calidad de los negocios dentro de las etapas.

**Verificación de realidad:** Esto te lleva a 50-60% de precisión si calibras bien. Pero toma 6+ meses de datos.
</Slide>

<Slide title="Etapa 4: Commit/Potencial Adicional Binario">
**"¿Apostaría $1.000 a que esto cierra?"**

Dejas de intentar ponderar probabilidades en todo. En cambio, clasificas los negocios en dos grupos: **Commit** (apostarías dinero) y **Potencial Adicional** (posible pero no seguro). Luego pronosticas Commit + (Potencial Adicional × 30%).

**Verificación de realidad:** Esto te lleva a 70-80% de precisión de inmediato, incluso sin datos históricos.
</Slide>
</SlideNavigation>

Vamos a saltar directamente a la Etapa 4.

---

## El Modelo Binario Commit/Potencial Adicional

Aquí está el marco que cambió el pronóstico de Jordan de 39% de precisión a 76% en 90 días:

### Los Dos Grupos

<ComparisonBuilder
title="Clasificación Commit vs. Potencial Adicional"
persistKey="analytics-L4-commit-definition"
prompt="Escribe tu definición de un negocio 'Commit'"
expertExample="Commit = Campeón confirmado + Presupuesto aprobado + Cronograma establecido + Sí verbal recibido + Sin bloqueos sin resolver. Todo lo demás es Potencial Adicional."
criteria={[
"Incluye criterios de verificación específicos",
"Requiere confirmación activa, no interés pasivo",
"Tiene una prueba clara de 'sí/no' que puedes aplicar"
]}
/>

Los **negocios Commit** son en los que apostarías tu alquiler. Literalmente. Si alguien te ofreciera $1.000 para apostar que este negocio cierra este mes, lo harías.

Los **negocios de Potencial Adicional** son todo lo demás. Podrían cerrar. Probablemente no. Pero son posibles.

La fórmula de pronóstico es simple:

**Pronóstico Mensual = Total Commit + (Total Potencial Adicional × 30%)**

Ese 30% es conservador. En realidad, tal vez el 20-40% de tus negocios de potencial adicional cerrarán. Pero comenzar al 30% te mantiene honesto.

### La Prueba de "Apuesta de $1.000"

Para cada negocio en tu pipeline, pregúntate:

> "¿Apostaría personalmente $1.000 de mi propio dinero a que este negocio cierra en los próximos 30 días?"

Si la respuesta es cualquier cosa menos "sí, absolutamente," es potencial adicional, no commit.

<SwipeDecision
title="¿Commit o Potencial Adicional?"
description="Desliza a la derecha para Commit, a la izquierda para Potencial Adicional"
optionA="Potencial Adicional"
optionB="Commit"
persistKey="analytics-L4-swipe-classify"
cards={[
{
id: "1",
content: "El prospecto dijo 'esto se ve genial' después del demo y pidió precios",
correctOption: "a",
explanation: "Pedir precios es interés, no compromiso. Sin cronograma, sin confirmación de presupuesto, sin campeón identificado. Potencial Adicional."
},
{
id: "2",
content: "El prospecto acordó verbalmente los términos, te pidió enviar el contrato y dijo 'firmaré esta semana'",
correctOption: "b",
explanation: "Sí verbal + cronograma + contrato solicitado = Commit. Apostarías $1K a esto."
},
{
id: "3",
content: "El prospecto te presentó a su jefe y dijo 'necesitamos aprobación de presupuesto, pero estoy presionando por esto'",
correctOption: "a",
explanation: "El campeón está identificado y activo, pero el presupuesto aún no está aprobado. Potencial Adicional hasta que el jefe diga sí."
},
{
id: "4",
content: "El prospecto te envió un contrato firmado y dijo 'procesando el pago esta semana'",
correctOption: "b",
explanation: "Contrato firmado = Commit. Aunque el pago esté pendiente, esto es tan cercano a seguro como puede ser."
},
{
id: "5",
content: "El prospecto dijo 'estamos evaluando 3 proveedores y decidiremos el próximo mes'",
correctOption: "a",
explanation: "Estás en un proceso competitivo sin cronograma de decisión. Potencial Adicional en el mejor caso, tal vez muerto."
},
{
id: "6",
content: "El prospecto dijo 'envíame la propuesta, la revisaré con mi equipo y te responderé'",
correctOption: "a",
explanation: "Propuesta solicitada es progreso, pero sin cronograma, sin compromiso de decidir. Potencial Adicional."
},
{
id: "7",
content: "El prospecto dijo 'comenzamos el 1 de enero, aquí está nuestra tarjeta de crédito para el primer mes'",
correctOption: "b",
explanation: "Método de pago proporcionado + fecha de inicio = Commit. Esto está cerrado."
},
{
id: "8",
content: "El prospecto respondió tu correo de seguimiento con 'sigo interesado, solo ocupado ahora mismo'",
correctOption: "a",
explanation: "'Sigo interesado' es el beso de la muerte. Esto está muerto o es potencial adicional muy bajo."
}
]}
/>

### ¿Qué Hace que un Negocio Sea "Commit"?

Aquí están los cinco criterios. Un negocio debe tener **los cinco** para ser Commit:

<InteractiveChecklist
title="Criterios de Negocio Commit"
persistKey="analytics-L4-commit-criteria"
items={[
"**Campeón confirmado** — Tienes una persona específica internamente que quiere que esto pase y tiene influencia",
"**Presupuesto aprobado** — Confirmaron que existe presupuesto y está asignado (no 'encontraremos presupuesto')",
"**Cronograma establecido** — Te dieron una fecha de decisión o fecha de inicio específica (no 'pronto' o 'el próximo trimestre')",
"**Sí verbal recibido** — Dijeron explícitamente 'sí, queremos avanzar' (no 'esto se ve bien')",
"**Sin bloqueos sin resolver** — Sin aprobaciones pendientes, sin prioridades en competencia, sin 'necesitamos verificar con X primero'"
]}
/>

Si a un negocio le falta incluso uno de estos, es Potencial Adicional.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Piensa en los criterios de Commit como una suite de pruebas. Todas las pruebas deben pasar (en verde) para que el negocio sea desplegado. Una prueba fallida = no está listo para desplegar. La misma lógica aplica aquí.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches y Consultores">
Tu umbral de "Commit" debería ser incluso más alto. Hasta que hayan pagado un depósito o firmado un contrato, es Potencial Adicional. Los compromisos verbales en coaching frecuentemente se evaporan cuando el prospecto tiene que sacar su tarjeta de crédito.
</ContextualNote>

---

## Pronóstico Ponderado por Etapa (El Enfoque Alternativo)

Algunos fundadores prefieren un enfoque más granular: asignar probabilidades a cada etapa del pipeline y sumar los valores ponderados.

Así es cómo funciona:

### Probabilidades Predeterminadas por Etapa

<TemplateBuilder
title="Tu Modelo de Probabilidad por Etapa"
persistKey="analytics-L4-stage-weights"
sections={[
{
id: "stages",
title: "Etapas del Pipeline y Probabilidades",
fields: [
{
id: "lead",
label: "Lead (aún no contactado)",
placeholder: "5%",
type: "text",
helperText: "Predeterminado: 5%. Ajusta después de 90 días según tus datos."
},
{
id: "contacted",
label: "Contactado (respondió pero no calificado)",
placeholder: "10%",
type: "text",
helperText: "Predeterminado: 10%"
},
{
id: "engaged",
label: "Activo (calificado, interesado)",
placeholder: "20%",
type: "text",
helperText: "Predeterminado: 20%"
},
{
id: "meeting",
label: "Reunión Realizada (demo o descubrimiento completado)",
placeholder: "40%",
type: "text",
helperText: "Predeterminado: 40%"
},
{
id: "proposal",
label: "Propuesta Enviada",
placeholder: "60%",
type: "text",
helperText: "Predeterminado: 60%"
},
{
id: "verbal",
label: "Sí Verbal (compromiso dado)",
placeholder: "80%",
type: "text",
helperText: "Predeterminado: 80%"
}
]
}
]}
/>

**Cómo usar esto:**

1. Lista todos los negocios en tu pipeline
2. Asigna cada negocio a una etapa
3. Multiplica el valor del negocio × la probabilidad de la etapa
4. Suma todos los valores ponderados = tu pronóstico

**Ejemplo:**

- 10 Leads a $5K cada uno × 5% = $2.500
- 5 Activos a $5K cada uno × 20% = $5.000
- 3 Reuniones a $5K cada uno × 40% = $6.000
- 2 Propuestas a $5K cada uno × 60% = $6.000
- 1 Sí Verbal a $5K × 80% = $4.000

**Pronóstico total: $23.500**

### El Problema con el Pronóstico Ponderado por Etapa

Es mejor que nada, pero tiene tres fallas fatales para fundadores en solitario:

<FlipCard 
  front="Falla #1: Falsa Precisión" 
  back="Estás adivinando las probabilidades. ¿Es una propuesta realmente 60%? ¿O es 40%? ¿O 75%? No lo sabrás hasta que tengas 50+ negocios de datos históricos." 
/>

<FlipCard 
  front="Falla #2: Ignora la Calidad del Negocio" 
  back="Dos negocios en 'Propuesta Enviada' pueden tener probabilidades de cierre muy diferentes. Uno tiene un campeón y presupuesto. El otro es un curioso. La ponderación por etapa los trata igual." 
/>

<FlipCard 
  front="Falla #3: El Optimismo Sigue Filtrándose" 
  back="Inconscientemente inflarás tus probabilidades por etapa para que el pronóstico se vea mejor. 'Tal vez las propuestas son 70%, no 60%...' Y estás de vuelta al sobre-pronóstico." 
/>

**Cuándo usar el pronóstico ponderado por etapa:**

- Tienes 6+ meses de datos históricos para calibrar probabilidades
- Tienes 20+ negocios en pipeline en cualquier momento dado
- Lo estás rastreando en un CRM que calcula automáticamente los valores ponderados

**Cuándo usar el commit/potencial adicional binario en cambio:**

- Eres un fundador en solitario con &lt;20 negocios en pipeline
- No tienes datos históricos todavía
- Necesitas precisión AHORA, no en 6 meses

---

## Construyendo Tu Modelo de Pronóstico

Construyamos la hoja de cálculo real que usarás cada semana.

<TemplateBuilder
title="Modelo de Pronóstico Mensual"
persistKey="analytics-L4-forecast-model"
sections={[
{
id: "commit",
title: "Negocios Commit",
fields: [
{
id: "commit-deals",
label: "Lista tus negocios Commit (nombre + valor)",
placeholder: "p. ej., Acme Corp - $5.000\nWidgetCo - $3.500",
type: "textarea",
helperText: "Solo incluye negocios que pasen los 5 criterios Commit"
},
{
id: "commit-total",
label: "Valor Total Commit",
placeholder: "Calculado automáticamente de arriba",
type: "text",
helperText: "Este es tu piso. Deberías alcanzar al menos este número."
}
]
},
{
id: "upside",
title: "Negocios de Potencial Adicional",
fields: [
{
id: "upside-deals",
label: "Lista tus negocios de Potencial Adicional (nombre + valor)",
placeholder: "p. ej., BetaCo - $4.000\nGammaCorp - $2.500",
type: "textarea",
helperText: "Todo lo demás en tu pipeline"
},
{
id: "upside-total",
label: "Valor Total de Potencial Adicional",
placeholder: "Calculado automáticamente de arriba",
type: "text",
helperText: "Multiplica esto por 30% para tu pronóstico de potencial adicional"
}
]
},
{
id: "forecast",
title: "Pronóstico Final",
fields: [
{
id: "final-forecast",
label: "Pronóstico Mensual",
placeholder: "Commit + (Potencial Adicional × 0.30)",
type: "text",
helperText: "Esto es alrededor de lo que debes planificar"
},
{
id: "stretch-forecast",
label: "Pronóstico Ambicioso (si el 50% del Potencial Adicional cierra)",
placeholder: "Commit + (Potencial Adicional × 0.50)",
type: "text",
helperText: "Tu mejor escenario posible"
}
]
}
]}
/>

### Cómo Usar Este Modelo Semanalmente

Cada viernes (o lunes), actualiza tu pronóstico:

1. **Revisa los negocios Commit** — ¿Alguno perdió el estado Commit? (cronograma se retrasó, surgió un bloqueo, el campeón desapareció) → Mueve a Potencial Adicional
2. **Revisa los negocios de Potencial Adicional** — ¿Alguno ganó el estado Commit? (obtuvo sí verbal, presupuesto aprobado, cronograma establecido) → Mueve a Commit
3. **Añade nuevos negocios** — Clasifica como Commit o Potencial Adicional desde el primer día
4. **Elimina negocios muertos** — Si un negocio ha estado en Potencial Adicional por 60+ días sin movimiento, márcalo como muerto y elimínalo

<InteractiveChecklist
title="Lista de Verificación de Actualización Semanal del Pronóstico"
persistKey="analytics-L4-weekly-update"
items={[
"Revisa cada negocio Commit: ¿sigue pasando los 5 criterios?",
"Revisa cada negocio de Potencial Adicional: ¿algún movimiento hacia Commit?",
"Añade cualquier negocio nuevo de esta semana",
"Elimina negocios que han estado estancados 60+ días",
"Calcula el nuevo pronóstico: Commit + (Potencial Adicional × 30%)",
"Compara con el pronóstico de la semana pasada: ¿qué cambió y por qué?"
]}
/>

---

## Rastreo de Precisión del Pronóstico

El modelo solo es útil si rastreas qué tan preciso es. Así es cómo:

### Reales Mensuales vs. Pronóstico

Al final de cada mes, registra:

<ScenarioSimulator
title="Calculadora de Precisión del Pronóstico"
persistKey="analytics-L4-accuracy-sim"
levers={[
{
id: "forecast",
label: "Tu pronóstico para el mes",
min: 0,
max: 100000,
step: 1000,
defaultValue: 25000
},
{
id: "actual",
label: "Ingresos reales cerrados",
min: 0,
max: 100000,
step: 1000,
defaultValue: 20000
}
]}
outputs={[
{
id: "accuracy",
label: "Precisión del pronóstico",
formula: "100 - (Math.abs(forecast - actual) / forecast * 100)",
unit: "%",
precision: 1
},
{
id: "variance",
label: "Varianza",
formula: "actual - forecast",
unit: "$",
precision: 0
}
]}
insight="Meta: >70% de precisión. Si consistentemente sobre-pronosticas, baja tu multiplicador de Potencial Adicional del 30% al 20%. Si consistentemente sub-pronosticas, súbelo al 40%."
/>

Después de 3 meses de rastreo, verás patrones:

- **¿Consistentemente sobre-pronósticando?** → Tus criterios de Commit son demasiado laxos, o tu multiplicador de Potencial Adicional es demasiado alto
- **¿Consistentemente sub-pronósticando?** → Tus criterios de Commit son demasiado estrictos, o tu multiplicador de Potencial Adicional es demasiado bajo
- **¿Muy inconsistente?** → No estás actualizando el pronóstico semanalmente, o no estás clasificando los negocios de forma consistente

### Ejercicio de Calibración

<ClassifyExercise
title="Calibra Tu Modelo de Pronóstico"
persistKey="analytics-L4-calibrate"
categories={[
{ id: "over", label: "Sobre-Pronóstico", color: "#ef4444" },
{ id: "accurate", label: "Preciso", color: "#10b981" },
{ id: "under", label: "Sub-Pronóstico", color: "#3b82f6" }
]}
items={[
{
id: "1",
content: "Pronóstico: $30K | Real: $18K",
correctCategory: "over",
explanation: "40% de fallo. Estás contando demasiados negocios de Potencial Adicional o siendo demasiado optimista sobre el Commit."
},
{
id: "2",
content: "Pronóstico: $25K | Real: $22K",
correctCategory: "accurate",
explanation: "88% de precisión. Esto es excelente. Sigue haciendo lo que estás haciendo."
},
{
id: "3",
content: "Pronóstico: $20K | Real: $28K",
correctCategory: "under",
explanation: "40% de sorpresa positiva. Eres demasiado conservador. Sube tu multiplicador de Potencial Adicional."
},
{
id: "4",
content: "Pronóstico: $15K | Real: $14.500",
correctCategory: "accurate",
explanation: "97% de precisión. Casi perfecto."
},
{
id: "5",
content: "Pronóstico: $40K | Real: $12K",
correctCategory: "over",
explanation: "70% de fallo. Tus criterios de Commit están rotos. Los negocios que pensabas que eran seguros se cayeron."
}
]}
/>

---

## El Ritual de Revisión del Pronóstico

Pronosticar no es un ejercicio de una sola vez. Es una disciplina semanal.

### La Revisión del Pronóstico del Viernes de 15 Minutos

<ProgressiveReveal title="Tu Ritual Semanal de Pronóstico" persistKey="analytics-L4-ritual-reveal">
<RevealSection title="Paso 1: Actualiza las Etapas del Negocio (5 min)">
Abre tu CRM o hoja de cálculo de pipeline. Para cada negocio:

- ¿Avanzó? (reunión agendada, propuesta enviada, sí verbal recibido)
- ¿Retrocedió? (cronograma se retrasó, surgió un bloqueo, campeón desapareció)
- ¿Está muerto? (sin respuesta en 30+ días, "no" explícito, se fue con un competidor)

Actualiza la etapa de cada negocio.
</RevealSection>

<RevealSection title="Paso 2: Reclasifica Commit vs. Potencial Adicional (5 min)">
Para cada negocio, haz la pregunta de "apuesta de $1.000":

> ¿Apostaría $1.000 de mi propio dinero a que esto cierra en los próximos 30 días?

Si sí → Commit. Si no → Potencial Adicional.

Mueve negocios entre grupos según sea necesario.
</RevealSection>

<RevealSection title="Paso 3: Calcula el Nuevo Pronóstico (2 min)">
Suma tus negocios Commit. Suma tus negocios de Potencial Adicional. Calcula:

**Pronóstico = Commit + (Potencial Adicional × 30%)**

Escribe este número. Esto es alrededor de lo que planificarás para los próximos 30 días.
</RevealSection>

<RevealSection title="Paso 4: Compara con la Semana Pasada (3 min)">
¿Cómo cambió tu pronóstico respecto a la semana pasada?

- **El pronóstico subió** → Nuevos negocios añadidos, o Potencial Adicional se movió a Commit. Buena señal.
- **El pronóstico bajó** → Negocios se cayeron, o Commit se movió a Potencial Adicional. Señal de advertencia.
- **El pronóstico se mantuvo igual** → El pipeline está estancado. Necesitas más actividad en la parte superior del embudo.

Identifica el cambio más grande y anota por qué sucedió.
</RevealSection>
</ProgressiveReveal>

### Análisis Profundo Mensual

Una vez al mes (primer viernes del mes), añade un análisis profundo de 30 minutos:

<InteractiveChecklist
title="Análisis Profundo Mensual del Pronóstico"
persistKey="analytics-L4-monthly-review"
items={[
"Compara el pronóstico del mes pasado con los ingresos reales — calcula el % de precisión",
"Identifica qué negocios Commit cerraron y cuáles no — ¿qué fue diferente?",
"Identifica qué negocios de Potencial Adicional cerraron — ¿tenían rasgos comunes?",
"Ajusta tu multiplicador de Potencial Adicional si consistentemente sobre/sub-pronostican",
"Revisa tus criterios de Commit — ¿son demasiado estrictos o demasiado laxos?",
"Establece una meta de ingresos para el próximo mes basada en el pipeline actual + nuevos negocios esperados"
]}
/>

---

## Errores Comunes de Pronóstico (Y Cómo Evitarlos)

<StrategyDuel
title="Comparación de Enfoques de Pronóstico"
persistKey="analytics-L4-strategy-duel"
scenario="Tienes $50K en negocios Commit y $80K en negocios de Potencial Adicional. ¿Qué pronosticas?"
strategyA={{
    name: "Pronóstico Optimista",
    description: "Pronosticar $50K + ($80K × 50%) = $90K porque 'tengo buen presentimiento sobre estos negocios'",
    pros: ["Motivador", "Permite planes más grandes"],
    cons: ["Probable fallo del 30-40%", "Te prepara para la decepción", "Toma malas decisiones de contratación/gasto"]
  }}
strategyB={{
    name: "Pronóstico Conservador",
    description: "Pronosticar $50K + ($80K × 30%) = $74K y tratar cualquier cosa por encima como sorpresa positiva",
    pros: ["70-80% de precisión", "Protege contra el sesgo de optimismo", "Permite planificación inteligente"],
    cons: ["Puede sentirse 'pesimista'", "Requiere disciplina"]
  }}
expertVerdict="La Estrategia B gana. Pronosticar se trata de precisión, no de motivación. Puedes ser optimista sobre tu capacidad de ejecución mientras eres realista sobre lo que realmente va a cerrar. El multiplicador de 30% para Potencial Adicional está calibrado con miles de organizaciones de ventas. Confía en las matemáticas."
/>

### Error #1: Contar el Interés Verbal como Compromiso

**La trampa:** El prospecto dice "esto se ve genial" o "estoy interesado" y mentalmente registras los ingresos.

**La solución:** El interés verbal es Potencial Adicional en el mejor caso. Hasta que digan "sí, queremos avanzar" Y te den un cronograma, no está ni cerca del Commit.

### Error #2: No Eliminar Negocios Muertos

**La trampa:** Un negocio ha estado en tu pipeline por 90 días sin movimiento. Lo mantienes en Potencial Adicional "por si acaso."

**La solución:** Si un negocio ha estado estancado por 60+ días, está muerto. Elimínalo. Tu pronóstico solo debería incluir negocios con impulso activo.

<PredictionGate
question="¿Qué % de negocios estancados por 60+ días eventualmente cierran?"
persistKey="analytics-L4-predict-stalled"
type="choice"
choices={[
{ id: "a", text: "30-40%" },
{ id: "b", text: "10-20%" },
{ id: "c", text: "&lt;5%" }
]}
correctId="c"

> **Menos del 5%** de los negocios estancados por 60+ días alguna vez cierran. (CSO Insights)

Si un negocio se vuelve oscuro por dos meses, está muerto. El prospecto se fue con un competidor, perdió presupuesto, o depriorizó el problema. Mantenerlo en tu pronóstico es pensamiento ilusorio.

**Acción:** Establece una tarea mensual recurrente para revisar todos los negocios que no se han movido en 60+ días y márcalos como "Cerrado Perdido."
</PredictionGate>

### Error #3: Inflar el Multiplicador de Potencial Adicional

**La trampa:** Comienzas al 30%, pero después de unos meses piensas "mis negocios son mejores que el promedio" y lo subes al 50% o 60%.

**La solución:** Solo ajusta tu multiplicador de Potencial Adicional basándote en **datos reales**. Rastrea pronóstico vs. real por 3+ meses. Si consistentemente sub-pronosticas un 20%, súbelo al 40%. Pero no ajustes basándote en intuición.

### Error #4: No Actualizar Semanalmente

**La trampa:** Construyes un pronóstico al inicio del mes y no lo tocas hasta el final.

**La solución:** Los negocios cambian de estado constantemente. Un negocio Commit puede perder su campeón. Un negocio de Potencial Adicional puede obtener aprobación de presupuesto. Actualiza tu pronóstico cada viernes para saber siempre dónde estás.

---

## Tu Modelo de Pronóstico en Acción

Veamos un ejemplo real:

<MiniRoleplay
scenario="Estás revisando tu pipeline el viernes. Tienes 8 negocios. Clasifica cada uno como Commit o Potencial Adicional."
role="Tú eres el fundador tomando decisiones de clasificación"
persistKey="analytics-L4-roleplay-classify"
modelResponse="Así es como clasificaría:

**Commit (3 negocios, $14K total):**

1. **WidgetCo ($5K)** — Sí verbal recibido, contrato enviado, dijeron 'firmando el lunes'
2. **Acme Corp ($4K)** — Campeón confirmado, presupuesto aprobado, fecha de inicio establecida para el próximo mes
3. **BetaCo ($5K)** — Depósito pagado, incorporación agendada

**Potencial Adicional (5 negocios, $22K total):** 4. **GammaCorp ($3K)** — Tuvo demo, dijo 'se ve bien,' pero sin cronograma ni discusión de presupuesto 5. **DeltaInc ($5K)** — Propuesta enviada hace 2 semanas, sin respuesta todavía 6. **EpsilonLLC ($4K)** — Reunión agendada para la próxima semana, pero presupuesto no calificado 7. **ZetaCo ($6K)** — Dijo 'estamos interesados' pero necesita hablar con su equipo primero 8. **ThetaCorp ($4K)** — Activo, haciendo buenas preguntas, pero sin campeón identificado todavía

**Pronóstico:** $14K (Commit) + ($22K × 30%) = $14K + $6.600 = **$20.600**

Si el 50% del Potencial Adicional cierra (escenario ambicioso): $14K + $11K = **$25K**"
/>

---

## Resumen: Tu Sistema de Pronóstico

Esto es lo que te llevas:

<InteractiveChecklist
title="Lista de Verificación de Tu Sistema de Pronóstico"
persistKey="analytics-L4-summary-actions"
items={[
"Entender los 5 criterios Commit: Campeón, Presupuesto, Cronograma, Sí Verbal, Sin Bloqueos",
"Aplicar la prueba de 'apuesta de $1.000' a cada negocio en tu pipeline",
"Construir tu modelo de pronóstico Commit/Potencial Adicional en una hoja de cálculo",
"Configurar una revisión del pronóstico semanal del viernes (15 minutos)",
"Rastrear el pronóstico mensual vs. real para calibrar la precisión",
"Eliminar negocios que han estado estancados 60+ días",
"Ajustar tu multiplicador de Potencial Adicional solo después de 3+ meses de datos"
]}
/>

**Próxima lección:** Tomaremos este pronóstico y lo conectaremos a tu economía unitaria (CAC, LTV, período de recuperación) para responder la pregunta: "¿Puedo permitirme crecer a esta tasa?"

---

## Quiz: Pon a Prueba Tu Conocimiento de Pronóstico

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Un prospecto dice 'esto se ve genial, envíame una propuesta.' ¿Cómo deberías clasificar este negocio?",
      "options": [
        "Commit — pidieron una propuesta",
        "Potencial Adicional — sin cronograma ni presupuesto confirmado",
        "Muerto — solo están curioseando",
        "50/50 — pondera al 50% de probabilidad"
      ],
      "correctAnswer": 1,
      "explanation": "Pedir una propuesta es progreso, pero no es compromiso. Sin cronograma, sin discusión de presupuesto, sin sí verbal. Esto es Potencial Adicional."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Tienes $30K en negocios Commit y $60K en negocios de Potencial Adicional. ¿Qué deberías pronosticar?",
      "options": [
        "$90K (todos los negocios cerrarán)",
        "$30K (solo cuenta Commit)",
        "$48K (Commit + Potencial Adicional × 30%)",
        "$60K (Commit + Potencial Adicional × 50%)"
      ],
      "correctAnswer": 2,
      "explanation": "$30K + ($60K × 30%) = $48K. Esta es la fórmula binaria de commit/potencial adicional."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "Un negocio ha estado en tu pipeline por 75 días sin movimiento. ¿Qué deberías hacer?",
      "options": [
        "Mantenerlo en Potencial Adicional — podría cerrar todavía",
        "Moverlo a Commit — ha estado ahí mucho tiempo",
        "Marcarlo como Cerrado Perdido y eliminarlo",
        "Enviar un correo de seguimiento más"
      ],
      "correctAnswer": 2,
      "explanation": "Los negocios estancados 60+ días tienen una tasa de cierre &lt;5%. Elimínalo de tu pronóstico. Aún puedes enviar un seguimiento, pero no lo cuentes en tus números."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "Tu precisión de pronóstico durante los últimos 3 meses: 55%, 62%, 58%. ¿Qué deberías hacer?",
      "options": [
        "Nada — esto es suficientemente bueno",
        "Bajar tu multiplicador de Potencial Adicional al 20%",
        "Subir tu multiplicador de Potencial Adicional al 40%",
        "Ajustar tus criterios de Commit"
      ],
      "correctAnswer": 0,
      "explanation": "55-62% de precisión está por debajo de la meta del 70%, pero necesitas más datos antes de ajustar. Rastrea por 3 meses más. Si el patrón continúa, entonces ajusta los criterios de Commit o baja el multiplicador de Potencial Adicional."
    },
    {
      "id": "q5",
      "type": "true-false",
      "question": "Verdadero o Falso: Un negocio con un sí verbal, cronograma establecido y presupuesto aprobado debería clasificarse como Commit aunque no hayas identificado un campeón.",
      "correctAnswer": false,
      "explanation": "Falso. Los 5 criterios deben cumplirse para Commit. Sin campeón = sin nadie internamente empujando por esto. Es Potencial Adicional hasta que tengas un campeón."
    }
  ]
}
```
