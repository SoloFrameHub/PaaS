---
title: "Tu Manual de Análisis"
duration: "45 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 10
---

Has pasado nueve lecciones construyendo la infraestructura de análisis que la mayoría de los fundadores nunca crea. Tienes un panel de embudo, un rastreador de velocidad, un modelo de pronóstico commit/potencial adicional, una calculadora de economía unitaria, un flujo de MRR, un sistema de atribución de canal, una herramienta de panel y un ritual de revisión semanal.

Ahora es momento de poner todo junto.

Esta lección final tiene tres trabajos: verificar que realmente construiste lo que te propusiste construir, instalar el sprint de 7 días que activa todo, y mostrarte cómo análisis y automatización se conectan para que tu sistema siga mejorando.

**Asegurémonos de que tu motor de análisis está funcionando.**

---

## Paso 1: La Auditoría Completa del Stack de Análisis

Antes de llamarte un fundador guiado por datos, necesitas verificar que los nueve artefactos de las lecciones estén en su lugar.

<InsightCard icon="📊" title="Por Qué Importa la Auditoría">
La mayoría de los fundadores completan lecciones pero no completan implementaciones. La auditoría te obliga a distinguir entre "entiendo este concepto" y "tengo esto activo y funcionando." Entenderlo no vale nada. Un panel activo es una ventaja competitiva.
</InsightCard>

Revisa cada artefacto ahora:

<InteractiveChecklist
title="Auditoría de Artefactos de Análisis"
persistKey="analytics-L10-audit"
items={[
"Mapa de Filosofía de Métricas (L1): 3 preguntas mapeadas a métricas específicas con fuentes de datos y cadencia de revisión",
"Panel de Embudo (L2): Leads → Reuniones → Propuestas → Victorias con % de conversión en cada etapa",
"Rastreador de Velocidad del Pipeline (L3): Días promedio por etapa rastreados, tendencia de longitud total del ciclo visible",
"Modelo de Pronóstico (L4): Clasificación commit vs. potencial adicional + probabilidades ponderadas por etapa configuradas",
"Calculadora de Economía Unitaria (L5): CAC, LTV, período de recuperación y ratio LTV:CAC calculados por canal",
"Panel de Flujo de MRR (L6): MRR nuevo, de expansión, contracción y churneado rastreados mensualmente",
"Rastreador de Atribución de Canal (L7): Fuente de lead rastreada en cada negocio, ROI de canal calculado",
"Herramienta de Panel Activa (L8): Google Sheets, paneles de CRM o Metabase configurados y conectados al CRM",
"Ritual de Revisión Semanal (L9): Día/hora fijo agendado, agenda documentada, primera revisión completada"
]}
/>

Si tienes 9 de 9 marcados, has construido algo que la mayoría de las empresas de $10M+ no tienen. Si te faltan elementos, usa el sprint de 7 días a continuación para cerrar las brechas.

---

## El Sprint de Análisis de 7 Días

Ya sea que estés comenzando desde cero o llenando brechas, este sprint instala tu sistema completo de análisis en una semana enfocada.

<SlideNavigation>
<Slide title="Día 1: Configuración de la Herramienta de Panel">

**Meta:** Tu herramienta de panel está activa y conectada a tu CRM.

**Acciones:**

1. Elige tu herramienta: Google Sheets (gratis), HubSpot Dashboards (gratis si usas HubSpot), Pipedrive Insights (incluido) o Metabase (gratis autohospedado)
2. Crea un nuevo panel o hoja de cálculo titulado "Análisis de Ventas — [Tu Nombre]"
3. Conéctate a tu fuente de datos de CRM (exporta CSV o usa integración nativa)
4. Verifica que puedes ver datos de negocios fluyendo al panel

**Tiempo:** 60-90 minutos

**Resultado:** Herramienta de panel configurada y poblada con al menos 30 días de datos de CRM.

</Slide>

<Slide title="Día 2: Panel de Embudo">

**Meta:** Embudo activo mostrando Leads → Reuniones → Propuestas → Victorias con tasas de conversión.

**Acciones:**

1. Cuenta los negocios en cada etapa del pipeline en tu CRM ahora mismo
2. Calcula la tasa de conversión en cada transición (se aplican las fórmulas de L2)
3. Construye la visualización del embudo (gráfico de barras en Sheets o reporte de CRM)
4. Compara tus tasas de conversión contra los benchmarks de L2

**Benchmarks:** MQL→SQL: 20-30%. SQL→Reunión: 40-60%. Reunión→Propuesta: 30-50%. Propuesta→Ganado: 20-40%.

**Tiempo:** 45-60 minutos

**Resultado:** Panel de embudo con datos en vivo y comparación de benchmarks.

</Slide>

<Slide title="Día 3: Seguimiento de Velocidad">

**Meta:** Días promedio por etapa calculados, longitud total del ciclo de ventas rastreada.

**Acciones:**

1. Extrae "fecha de entrada" y "fecha de salida" para cada etapa de tu CRM (la mayoría de los CRMs rastrean esto)
2. Calcula los días promedio por etapa en tus últimos 20+ negocios
3. Agrega seguimiento de velocidad a tu panel
4. Marca cualquier negocio actual que supere 2x la duración promedio de etapa

**Tiempo:** 45-60 minutos

**Resultado:** Rastreador de velocidad mostrando días promedio por etapa y negocios actuales inactivos.

</Slide>

<Slide title="Día 4: Modelo de Pronóstico">

**Meta:** Pronóstico commit/potencial adicional configurado con probabilidades ponderadas por etapa.

**Acciones:**

1. Abre el pipeline de tu CRM
2. Aplica la prueba de "apuesta de $1.000" a cada negocio — clasifica como Commit o Potencial Adicional
3. Agrega probabilidades de etapa (Lead 5%, Contactado 10%, Comprometido 20%, Reunión 40%, Propuesta 60%, Sí Verbal 80%)
4. Calcula tu total de commit y total de potencial adicional para este mes

**Tiempo:** 30-45 minutos

**Resultado:** Pronóstico de este mes: Commit = $X, Potencial Adicional = $Y, Total Ponderado = $Z.

</Slide>

<Slide title="Día 5: Economía Unitaria">

**Meta:** CAC, LTV, período de recuperación y LTV:CAC calculados por canal.

**Acciones:**

1. Suma todos los costos de adquisición de los últimos 90 días (herramientas + ads + tiempo × tarifa por hora)
2. Divide entre el número de nuevos clientes — ese es tu CAC combinado
3. Calcula el LTV: ARPU / tasa de churn mensual (o valor promedio del proyecto × tasa de repetición)
4. Calcula el período de recuperación: CAC / ingresos mensuales por cliente
5. Desglosa el CAC por canal si tienes datos de atribución

**Tiempo:** 60-90 minutos

**Resultado:** Panel de economía unitaria con CAC, LTV, período de recuperación y LTV:CAC por canal.

</Slide>

<Slide title="Día 6: Flujo de MRR y Atribución">

**Meta:** Flujo de MRR activo, atribución de canal en cada negocio.

**Acciones:**

1. Registra el flujo de MRR del mes pasado: MRR Inicial + Nuevo - Contracción - Churn = MRR Final
2. Calcula la NRR del mes pasado
3. Audita tu CRM: ¿cada negocio tiene una fuente de lead?
4. Calcula ingresos por canal (si tienes 3+ meses de datos)

**Tiempo:** 45-60 minutos

**Resultado:** Flujo de MRR de los últimos 3 meses, atribución de canal de los últimos 90 días.

</Slide>

<Slide title="Día 7: Primera Revisión del Viernes">

**Meta:** Ejecutar tu primera revisión completa de 30 minutos del viernes usando el panel completo.

**Agenda:**

1. Instantánea del embudo (5 min): volumen y conversión en cada etapa
2. Verificación de velocidad (5 min): ¿algún negocio atascado más de 2x la duración promedio de etapa?
3. Actualización de pronóstico (5 min): total de commit, total de potencial adicional, ¿algún cambio?
4. Verificación de canal (5 min): ¿qué fuente produjo más reuniones esta semana?
5. Elementos de acción (10 min): 3 acciones específicas para la próxima semana

**Esta es tu primera prueba real.** Si falta algo, anótalo y agrégalo.

**Tiempo:** 30-45 minutos

**Resultado:** Primera revisión del viernes completada con 3 elementos de acción documentados.

</Slide>
</SlideNavigation>

---

## El Traspaso de Análisis → Automatización

Tu sistema de análisis no solo mide lo que está pasando — te dice _qué automatizar a continuación_.

<InsightCard icon="🔗" title="El Ciclo Análisis-Automatización">
Medir → Identificar cuello de botella → Automatizar la corrección → Medir la mejora. Este es el ciclo que separa a los fundadores que crecen de los que se estancan. El análisis sin automatización es diagnóstico sin tratamiento.
</InsightCard>

Así se mapea cada insight de análisis a una automatización del Curso 42:

<FlipCard
  front="Cuello de botella: Seguimiento lento después del contacto (alta deserción en etapa de Contactado)"
  back="Corrección de automatización: Cadena de Recordatorios de Seguimiento (Día 3/7/14). Construye en la Lección 4 del Curso 42. Automatiza la creación de tareas cuando no se detecta respuesta después del contacto. Mejora esperada: 20-30% más respuestas."
/>

<FlipCard
  front="Cuello de botella: Reuniones no registradas en CRM (los datos de velocidad están incompletos)"
  back="Corrección de automatización: Registrador de Reuniones. Construye en la Lección 3 del Curso 42. Registra automáticamente cada evento de Calendly/Google Calendar en el CRM como actividad. Mejora esperada: tasa de captura de reuniones del 100%."
/>

<FlipCard
  front="Cuello de botella: Propuestas sin firmar durante más de 14 días (conversión propuesta→ganado por debajo del benchmark)"
  back="Corrección de automatización: Perseguidor de Contratos. Construye en la Lección 5 del Curso 42. Crea automáticamente recordatorios en el Día 3, 7 y 14 después de enviada la propuesta. Mejora esperada: tasas de cierre 15-25% más rápidas."
/>

<FlipCard
  front="Cuello de botella: Nuevos leads no ingresados en CRM (datos del embudo incompletos)"
  back="Corrección de automatización: Capturador de Leads. Construye en la Lección 2 del Curso 42. Crea automáticamente contactos en el CRM desde cada envío de formulario, reserva de Calendly y respuesta de contacto. Mejora esperada: captura de leads del 100%."
/>

<ExampleCard label="Caso de Estudio: La Ruta de Automatización Primero-Análisis">
Daniel ejecutó su sprint de análisis y descubrió dos cosas: su conversión reunión-a-propuesta era del 22% (por debajo del benchmark del 30-50%), y el 40% de sus reuniones nunca aparecía en su CRM.

Construyó la automatización del Registrador de Reuniones del Curso 42. En 30 días, tenía captura del 100% de reuniones y podía ver el cuello de botella real: no estaba enviando propuestas dentro de los 7 días de las reuniones.

Construyó una automatización del Perseguidor de Contratos que le recordaba enviar propuestas dentro de las 24 horas de cada reunión.

Seis semanas después, su conversión reunión-a-propuesta llegó al 41% — una mejora del 90% — y su ciclo de ventas se redujo de 47 días a 31 días.

**El análisis le dijo qué estaba roto. Las automatizaciones lo arreglaron.**
</ExampleCard>

---

## Las Metas de Mejora de 90 Días

Tener un panel no es suficiente. Necesitas metas específicas y un plan de mejora estructurado.

<TemplateBuilder
title="Tu Plan de Mejora de Análisis de 90 Días"
persistKey="analytics-L10-improvement-plan"
sections={[
{
id: "baseline",
title: "Tu Línea Base (Hoy)",
fields: [
{
id: "funnel",
label: "Tasa de conversión de etapa de embudo más débil",
placeholder: "p. ej., Reunión→Propuesta: 18% (benchmark: 30-50%)",
type: "text"
},
{
id: "velocity",
label: "Longitud actual total del ciclo de ventas",
placeholder: "p. ej., 52 días (objetivo SMB: 20-45 días)",
type: "text"
},
{
id: "cac",
label: "CAC combinado actual",
placeholder: "p. ej., $840 en todos los canales",
type: "text"
},
{
id: "payback",
label: "Período de recuperación de CAC actual",
placeholder: "p. ej., 8 meses (objetivo bootstrapped: 1-3 meses)",
type: "text"
}
]
},
{
id: "targets",
title: "Tus Metas de 90 Días",
fields: [
{
id: "funnel_target",
label: "Mejora objetivo para la etapa de embudo más débil",
placeholder: "p. ej., Mejorar Reunión→Propuesta del 18% al 30%",
type: "text"
},
{
id: "velocity_target",
label: "Reducción objetivo del ciclo de ventas",
placeholder: "p. ej., Reducir de 52 días a 38 días",
type: "text"
},
{
id: "cac_target",
label: "Reducción objetivo de CAC",
placeholder: "p. ej., Reducir CAC combinado de $840 a $600 mediante optimización de canal",
type: "text"
}
]
},
{
id: "actions",
title: "Tus 3 Acciones Principales",
fields: [
{
id: "action1",
label: "Acción 1 (implementar esta semana)",
placeholder: "p. ej., Construir automatización del Registrador de Reuniones para capturar el 100% de las reuniones",
type: "textarea"
},
{
id: "action2",
label: "Acción 2 (implementar semanas 2-3)",
placeholder: "p. ej., Eliminar LinkedIn como canal (CAC 3x más alto que email)",
type: "textarea"
},
{
id: "action3",
label: "Acción 3 (implementar semanas 4-6)",
placeholder: "p. ej., Construir automatización del Perseguidor de Contratos para reducir el tiempo del ciclo Propuesta→Ganado",
type: "textarea"
}
]
}
]}
/>

---

## El Ciclo de Mejora Continua

El análisis no es un proyecto de una sola vez. Es una disciplina. Aquí está el ciclo que mantiene tu sistema mejorando:

<ProgressiveReveal title="El Ciclo de Mejora de Cuatro Etapas" persistKey="analytics-L10-loop">

<RevealSection title="Etapa 1: Medir">

**Qué:** Ejecuta tu revisión semanal del viernes y tu inmersión profunda mensual.

**Cómo:** Usando el panel que construiste en las Lecciones 2-8 y el ritual de la Lección 9.

**Cuándo:** Cada viernes (30 min) y el primer viernes de cada mes (60 min).

**Resultado:** Imagen clara de lo que está funcionando y lo que está roto.

</RevealSection>

<RevealSection title="Etapa 2: Identificar el Cuello de Botella">

**Qué:** Encuentra la única métrica más alejada de su benchmark.

**Cómo:** Compara tus tasas de conversión del embudo, números de velocidad y economía unitaria contra los benchmarks de cada lección.

**Regla:** Arregla un cuello de botella a la vez. No intentes mejorar todo simultáneamente.

**Resultado:** Un cuello de botella claramente identificado con una hipótesis de la causa raíz.

</RevealSection>

<RevealSection title="Etapa 3: Hipótesis y Prueba">

**Qué:** Formula una hipótesis específica y comprobable y ejecuta una prueba de 4 semanas.

**Cómo:** "Creo que [cambio específico] mejorará [métrica específica] en [cantidad específica] dentro de [plazo]."

**Ejemplo:** "Creo que agregar una demo en vivo antes de cada propuesta mejorará la conversión Reunión→Propuesta del 22% al 35% en 60 días."

**Resultado:** Una prueba documentada con criterios de éxito claros.

</RevealSection>

<RevealSection title="Etapa 4: Medir de Nuevo">

**Qué:** Después de 4-6 semanas, ¿mejoró la métrica?

**Cómo:** Compara la métrica antes y después del cambio.

**Regla:** Solo prueba una variable a la vez. Si cambias la mensajería Y agregas demos simultáneamente, no sabrás cuál funcionó.

**Resultado:** Mejora confirmada (duplicar) o prueba fallida (nueva hipótesis).

</RevealSection>

</ProgressiveReveal>

<ScenarioSimulator
title="Simulador de Crecimiento de Ingresos"
persistKey="analytics-L10-simulator"
levers={[
{ id: "funnel_conversion", label: "Tasa de Conversión Propuesta→Ganado (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
{ id: "velocity_days", label: "Ciclo de Ventas Promedio (días)", min: 15, max: 90, step: 5, defaultValue: 45 },
{ id: "deal_size", label: "Tamaño Promedio del Negocio ($)", min: 500, max: 10000, step: 500, defaultValue: 3000 },
{ id: "proposals_month", label: "Propuestas Enviadas Por Mes", min: 2, max: 20, step: 1, defaultValue: 6 }
]}
outputs={[
{ id: "monthly_revenue", label: "Ingresos Mensuales de Cierres", formula: "(funnel_conversion / 100) * proposals_month * deal_size", unit: "$", precision: 0 },
{ id: "annual_run_rate", label: "Tasa de Ejecución Anual", formula: "(funnel_conversion / 100) * proposals_month * deal_size * 12", unit: "$", precision: 0 },
{ id: "deals_per_month", label: "Negocios Cerrados Por Mes", formula: "(funnel_conversion / 100) * proposals_month", unit: "", precision: 1 }
]}
insight="A `{monthly_revenue}`/mes, las mejoras pequeñas se acumulan rápido. Un aumento del 10% en la conversión de propuestas agrega `{deals_per_month}` negocios/mes — enfócate primero en tu métrica más débil."
/>

---

## El Futuro del Análisis con IA

Has construido un sistema de análisis revisado manualmente. ¿Qué viene después?

<InsightCard icon="🤖" title="Hacia Dónde Va el Análisis">
La próxima evolución es la IA que responde "¿Por qué perdimos 3 negocios esta semana?" a partir de tus datos de CRM. Lee notas de reuniones, hilos de email, duraciones de etapas y tamaños de negocios — luego presenta causas raíz que te perderías en una revisión manual.

Esto requiere el esquema de CRM listo para IA del Curso 40. Si lo construiste, estás listo. Si te saltaste los campos estructurados del Curso 40, ese es tu próximo proyecto.
</InsightCard>

El stack de análisis que has construido en este curso se conecta directamente al Curso 27 (Construyendo Agentes de Ventas de IA Personalizados). Tus paneles se convierten en la fuente de verdad que los agentes de IA leen para priorizar el contacto, identificar negocios en riesgo y redactar seguimientos personalizados.

**Los cimientos que pusiste aquí son la infraestructura para tu capa de ventas con IA.**

---

## La Regla de "Gana el Derecho a la Complejidad"

Un último principio antes de terminar el curso:

<ConceptReframe
concept="Agregar Más Métricas"
defaultLens="technical-founder"
lenses={[
{
id: "technical-founder",
label: "Visión del Fundador Técnico",
explanation: "El instinto es instrumentar todo. Construir un panel en tiempo real con 40 métricas. Conectar cada API. Crear reportes personalizados para cada pregunta posible. Esto se siente productivo. Produce ruido."
},
{
id: "operator",
label: "Visión del Operador",
explanation: "Agrega métricas solo cuando hayas actuado en cada métrica que ya tienes durante 8+ semanas. Cada nueva métrica debe ganarse su lugar cambiando una decisión. El panel de 5 métricas que realmente revisas semanalmente supera al panel de 30 métricas que miras mensualmente."
},
{
id: "coach",
label: "Visión del Coach",
explanation: "Pregunta: ¿qué decisión cambiaría esta métrica? Si no puedes nombrar una decisión específica, no agregues la métrica. La complejidad es un mecanismo de defensa para los fundadores que quieren sentirse guiados por datos sin tener que actuar en lo que dicen los datos."
}
]}
/>

---

## Tu Evaluación de Completación

Has pasado este curso aprendiendo nueve marcos. Verifiquemos que puedes aplicar los más críticos:

<TimedChallenge
title="Ronda Rápida de Análisis"
persistKey="analytics-L10-timed"
timeLimit={90}
items={[
{
id: "1",
prompt: "Tu conversión Reunión→Propuesta es del 15%. El benchmark es 30-50%. ¿Qué indica esto?",
correctAnswer: "debilidad en descubrimiento o demo",
explanation: "Una baja conversión Reunión→Propuesta indica un problema de descubrimiento o demo — estás teniendo reuniones pero no convenciendo suficientemente a los prospectos de que la propuesta sea valiosa."
},
{
id: "2",
prompt: "¿Cuál es la fórmula para la Velocidad del Pipeline?",
correctAnswer: "oportunidades por tasa de victorias por tamaño de negocio dividido por longitud del ciclo",
explanation: "V = (N × W × D) / L — oportunidades, tasa de victorias, tamaño promedio del negocio, dividido por la longitud promedio del ciclo en días."
},
{
id: "3",
prompt: "Un negocio tiene sí verbal confirmado, presupuesto aprobado y cronograma establecido. ¿Es Commit o Potencial Adicional?",
correctAnswer: "commit",
explanation: "Los negocios Commit tienen campeón confirmado, presupuesto aprobado, cronograma establecido y sí verbal recibido sin bloqueadores sin resolver. Este cumple todos los criterios."
},
{
id: "4",
prompt: "Tu período de recuperación de CAC bootstrapped es de 8 meses. ¿Está en el objetivo?",
correctAnswer: "no",
explanation: "Los fundadores bootstrapped necesitan recuperación de 1-3 meses para la supervivencia del flujo de caja. 8 meses es aceptable para empresas con seed. 8 meses bootstrapped = crisis de flujo de caja."
}
]}
/>

---

## Lo Que Has Construido

A lo largo de 10 lecciones, has creado una infraestructura de análisis completa:

<PredictionGate
question="¿Qué porcentaje de empresas con $1M+ ARR tienen los 9 artefactos de análisis en su lugar?"
persistKey="analytics-L10-predict"
type="choice"
choices={[
{ id: "a", text: "La mayoría — el análisis es fundamental por encima de $1M ARR" },
{ id: "b", text: "Aproximadamente la mitad — muchas empresas confían en la intuición incluso a escala" },
{ id: "c", text: "Una pequeña minoría — los stacks de análisis completos son más raros de lo que crees" }
]}
correctId="c"

>

**La respuesta: C — y por un gran margen.**

Los estudios muestran consistentemente que menos del 20% de las empresas B2B tienen visibilidad completa de análisis en conversión del embudo, velocidad del pipeline, economía unitaria y atribución de canal simultáneamente.

La mayoría de las empresas tienen _algunos_ paneles. Muy pocas tienen _todos_ funcionando juntos con un ritual de revisión semanal consistente.

Ahora tienes lo que la mayoría de las empresas de $5M+ ARR no tienen. Úsalo.

</PredictionGate>

---

## Tus Elementos de Acción Finales

<InteractiveChecklist
title="Tu Lista de Verificación de Lanzamiento del Manual de Análisis"
persistKey="analytics-L10-actions"
items={[
"Completa la auditoría de 9 artefactos arriba — identifica cualquier brecha",
"Ejecuta el sprint de 7 días para cerrar brechas (o valida que todo está activo)",
"Define tus metas de mejora de 90 días en la plantilla de arriba",
"Agenda tu primera inmersión profunda mensual (primer viernes del próximo mes, 60 min)",
"Identifica tu único mayor cuello de botella del embudo y formula una hipótesis para arreglarlo",
"Conecta tus hallazgos de análisis a las automatizaciones del Curso 42 — ¿qué deberías automatizar primero?",
"Comparte tus métricas semanales con un compañero de responsabilidad o comunidad"
]}
/>

---

## Felicitaciones: Eres un Arquitecto de Análisis

Comenzaste este curso sin saber qué 5 métricas rastrear. Lo terminas con un stack de análisis completo: panel de embudo, rastreador de velocidad, modelo de pronóstico, calculadora de economía unitaria, flujo de MRR, atribución de canal, una herramienta de panel y un ritual de revisión semanal.

Más importante, tienes la **disciplina** — un ritual semanal fijo que convierte datos en decisiones.

**En el Curso 42 (Automatización de Ventas)**, automatizarás las partes manuales de tu proceso de ventas: captura de leads, registro de reuniones, recordatorios de seguimiento, seguimiento de contratos y enrutamiento de respuestas. Tu análisis te dirá qué automatizaciones construir primero.

Nos vemos allá.

---

## Quiz: El Manual de Análisis

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "En el ciclo análisis → automatización, ¿qué te dice el análisis?",
      "options": [
        "Cómo construir automatizaciones en Zapier",
        "Qué cuellos de botella priorizar para automatización",
        "Cómo reducir tu presupuesto de automatización",
        "Cuándo cambiar de herramienta de CRM"
      ],
      "correctAnswer": 1,
      "explanation": "El análisis identifica cuellos de botella. La automatización los arregla. El ciclo: Medir → Identificar cuello de botella → Automatizar corrección → Medir mejora."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Cuánto tiempo deberías probar una hipótesis antes de sacar conclusiones?",
      "options": ["1-2 semanas", "4-6 semanas", "6 meses", "1 año"],
      "correctAnswer": 1,
      "explanation": "4-6 semanas proporciona suficientes datos para ver tendencias sin esperar tanto tiempo que pierdas la ventana para corregir el rumbo. 1-2 semanas es ruido; 6+ meses es demasiado lento."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "Deberías probar múltiples variables simultáneamente para encontrar mejoras más rápido.",
      "correctAnswer": false,
      "explanation": "Falso. Prueba una variable a la vez. Si cambias la mensajería Y agregas demos simultáneamente, no sabrás qué cambio impulsó la mejora."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Cuándo deberías agregar una nueva métrica a tu panel?",
      "options": [
        "Cada vez que encuentres una fuente de datos interesante",
        "Después de actuar consistentemente en todas las métricas existentes durante 8+ semanas",
        "Mensualmente, para mantener tu panel actualizado",
        "Solo cuando los inversores lo soliciten"
      ],
      "correctAnswer": 1,
      "explanation": "Gana el derecho a la complejidad. Solo agrega métricas cuando hayas actuado en todo lo que ya rastreas durante 8+ semanas. Cada nueva métrica debe cambiar una decisión."
    }
  ]
}
```
