---
title: "Rastreo de Ingresos: MRR Nuevo vs. Expansión vs. Perdido"
duration: "50 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 6
---

## El Misterio de $47K

Sarah miraba fijamente su cuenta bancaria. $47.000 en ingresos el mes pasado. Su mejor mes jamás.

¿Este mes? $39.000. Una baja de $8K.

Entró en pánico. "¿Qué pasó? ¿Perdí clientes? ¿Mi estrategia de contacto dejó de funcionar?"

Abrió su CRM. El mismo número de clientes activos: 42.

Espera. ¿Cómo bajaron los ingresos si el número de clientes siguió igual?

Pasó tres horas revisando facturas. La respuesta:

- 3 clientes actualizaron (+$2.400)
- 2 clientes bajaron de plan (-$1.200)
- 4 clientes se fueron (-$9.200)
- 5 nuevos clientes se unieron (+$6.000)

**Cambio neto: -$2.000**

Pero su vista de "ingresos totales" solo mostraba el número final. No tenía idea de que la expansión estaba enmascarando la pérdida. No tenía idea de que su negocio estaba sangrando.

<InsightCard icon="💡" title="La Ilusión de los Ingresos">
Los ingresos totales son una métrica de vanidad. Ocultan la verdad: ¿estás creciendo por nuevos clientes, o son los clientes existentes los que te salvan? ¿Las actualizaciones están enmascarando la pérdida? Sin el rastreo segmentado de MRR, estás volando a ciegas.
</InsightCard>

Al final de esta lección, construirás un **Panel de Cascada de MRR** que muestra exactamente de dónde viene cada dólar de ingresos — y a dónde va.

---

## Por Qué los Componentes del MRR Importan Más que los Ingresos Totales

La mayoría de los fundadores rastrean un número: "¿Cuánto dinero entró este mes?"

Es como si un médico solo revisara tu peso. El peso no te dice si estás perdiendo músculo o ganando grasa.

Los ingresos tienen cuatro componentes:

1. **MRR Nuevo** — Clientes por primera vez
2. **MRR por Expansión** — Actualizaciones, complementos, adiciones de asientos de clientes existentes
3. **MRR por Contracción** — Reducciones de plan de clientes existentes
4. **MRR Perdido** — Cancelaciones

<FlipCard 
  front="Fórmula del MRR Neto Nuevo" 
  back="MRR Neto Nuevo = MRR Nuevo + MRR por Expansión - MRR por Contracción - MRR Perdido" 
/>

### Por Qué Esto Importa para los Fundadores en Solitario

Tienes tiempo limitado. No puedes arreglar todo a la vez.

**Si el MRR Nuevo es bajo:** Tu adquisición no está funcionando. Regresa a los Cursos 21-27 (Adquisición con IA).

**Si el MRR por Expansión es cero:** Estás dejando dinero sobre la mesa. Es más fácil hacer upsell a clientes existentes que adquirir nuevos.

**Si el MRR por Contracción es alto:** Tus niveles de precios están mal o tu producto no está entregando valor en niveles más altos.

**Si el MRR Perdido es alto:** Tienes un problema de retención. Ve al Curso 37 (Retención y Expansión).

<RangeSlider 
  label="¿Qué tan seguro estás de identificar qué componente de ingresos necesita más atención?" 
  min={1} 
  max={10} 
  lowLabel="Sin idea" 
  highLabel="Muy seguro" 
  persistKey="analytics-L6-confidence" 
/>

---

## La Cascada de MRR: Tu Gráfico Más Importante

La Cascada de MRR visualiza el flujo de ingresos como agua cayendo en escalones.

Comienza con el MRR del mes pasado. Añade nuevos clientes. Añade expansiones. Resta contracciones. Resta pérdidas. Termina con el MRR de este mes.

Así es como se veía el de Sarah:

```
MRR Inicial (Abril):      $47.000
+ MRR Nuevo:              +$6.000
+ MRR por Expansión:      +$2.400
- MRR por Contracción:    -$1.200
- MRR Perdido:            -$9.200
= MRR Final (Mayo):       $45.000
```

**Cambio neto: -$2.000 (-4.3%)**

La cascada reveló su problema de inmediato: **la pérdida se estaba comiendo su crecimiento**.

<ExampleCard label="Caso de Estudio: El Motor de Expansión Oculto">
Marcus dirigía un negocio de coaching de $28K/mes. Pensaba que estaba estancado — los ingresos habían sido planos durante 6 meses.

Luego construyó una cascada. Descubrió:

- MRR Nuevo: +$4K/mes (constante)
- MRR por Expansión: +$3K/mes (clientes actualizando de 1:1 a programas grupales)
- MRR Perdido: -$7K/mes (clientes terminando programas de 3 meses)

Su negocio no estaba estancado. Tenía un **problema de pérdida de $7K/mes** enmascarado por $7K en ingresos nuevos + expansión.

Arregló la pérdida añadiendo un programa de continuidad de bajo costo. En 90 días, la pérdida bajó a $2K/mes. Su MRR saltó a $38K.
</ExampleCard>

<InsightCard icon="📊" title="La Ventaja de la Cascada">
La cascada te muestra **en qué enfocarte**. Si la expansión es cero, estás ignorando tu fuente de ingresos más fácil. Si la pérdida es alta, la adquisición es un parche. Arregla la fuga antes de llenar el balde.
</InsightCard>

---

## Construyendo Tu Cascada de MRR (Paso a Paso)

La construirás en Google Sheets (o tu CRM si admite informes personalizados).

<SlideNavigation>
<Slide title="Paso 1: Define Tus Categorías de MRR">

Crea una tabla con estas columnas:

| Nombre del Cliente | MRR Mes Pasado | MRR Este Mes | Categoría   |
| ------------------ | -------------- | ------------ | ----------- |
| Acme Corp          | $500           | $500         | Retenido    |
| Beta Inc           | $0             | $300         | Nuevo       |
| Gamma LLC          | $800           | $1.200       | Expansión   |
| Delta Co           | $600           | $400         | Contracción |
| Epsilon Ltd        | $400           | $0           | Perdido     |

**Reglas de categoría:**

- **Nuevo**: Mes pasado = $0, Este mes > $0
- **Retenido**: Mes pasado = Este mes (y ambos > $0)
- **Expansión**: Este mes > Mes pasado (y ambos > $0)
- **Contracción**: Este mes < Mes pasado (y ambos > $0)
- **Perdido**: Mes pasado > $0, Este mes = $0

</Slide>

<Slide title="Paso 2: Calcula los Totales por Componente">

Suma cada categoría:

```
MRR Nuevo = SUMA(todas las filas "Nuevo", columna MRR Este Mes)
MRR Expansión = SUMA(todas las filas "Expansión", delta entre meses)
MRR Contracción = SUMA(todas las filas "Contracción", delta entre meses)
MRR Perdido = SUMA(todas las filas "Perdido", columna MRR Mes Pasado)
```

**Ejemplo:**

- MRR Nuevo: $300 (Beta Inc)
- MRR Expansión: $400 (Gamma LLC: $1.200 - $800)
- MRR Contracción: $200 (Delta Co: $600 - $400)
- MRR Perdido: $400 (Epsilon Ltd)

</Slide>

<Slide title="Paso 3: Construye la Cascada">

Crea una tabla de resumen:

| Componente                 | Monto      |
| -------------------------- | ---------- |
| MRR Inicial (Mes Pasado)   | $2.300     |
| + MRR Nuevo                | +$300      |
| + MRR por Expansión        | +$400      |
| - MRR por Contracción      | -$200      |
| - MRR Perdido              | -$400      |
| **= MRR Final (Este Mes)** | **$2.400** |

**MRR Neto Nuevo: +$100 (+4.3%)**

</Slide>

<Slide title="Paso 4: Visualízalo">

En Google Sheets:

1. Selecciona tu tabla de resumen
2. Insertar → Gráfico
3. Tipo de gráfico: **Gráfico de cascada**
4. Personalizar: Verde para Nuevo/Expansión, Rojo para Contracción/Pérdida

El gráfico muestra el flujo de ingresos de izquierda a derecha, con ganancias subiendo y pérdidas bajando.

</Slide>
</SlideNavigation>

<TemplateBuilder
title="Tu Plantilla de Cascada de MRR"
persistKey="analytics-L6-waterfall"
sections={[
{
id: "starting",
title: "Punto de Partida",
fields: [
{ id: "lastMonthMRR", label: "MRR Total del Mes Pasado", placeholder: "p. ej., $47.000", type: "text" }
]
},
{
id: "components",
title: "Componentes de Este Mes",
fields: [
{ id: "newMRR", label: "MRR Nuevo (clientes por primera vez)", placeholder: "p. ej., $6.000", type: "text" },
{ id: "expansionMRR", label: "MRR por Expansión (actualizaciones, complementos)", placeholder: "p. ej., $2.400", type: "text" },
{ id: "contractionMRR", label: "MRR por Contracción (reducciones)", placeholder: "p. ej., $1.200", type: "text" },
{ id: "churnedMRR", label: "MRR Perdido (cancelaciones)", placeholder: "p. ej., $9.200", type: "text" }
]
},
{
id: "analysis",
title: "Análisis Rápido",
fields: [
{ id: "biggestIssue", label: "¿Qué componente necesita más atención?", placeholder: "p. ej., La pérdida es el 19.6% del MRR inicial", type: "textarea" }
]
}
]}
/>

---

## Retención Neta de Ingresos (NRR): El Indicador de Salud

El NRR responde una pregunta: **¿Los clientes existentes están creciendo o reduciéndose?**

<FlipCard 
  front="Fórmula del NRR" 
  back="NRR = (MRR Inicial + Expansión - Contracción - Pérdida) / MRR Inicial × 100" 
/>

### Interpretando el NRR

| NRR          | Significado                                                     | Acción                                                                                     |
| ------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **< 90%**    | Los clientes existentes se están reduciendo rápido              | **Modo crisis.** Arregla la retención de inmediato.                                        |
| **90-100%**  | Los clientes existentes están planos o reduciéndose ligeramente | Aceptable en etapa temprana, pero no sostenible a largo plazo.                             |
| **100-110%** | Los clientes existentes crecen ligeramente                      | **Saludable.** La expansión compensa la pérdida.                                           |
| **110-130%** | Los clientes existentes crecen significativamente               | **De clase mundial.** Tienes un motor de retención + expansión.                            |
| **> 130%**   | Los clientes existentes crecen rápidamente                      | Raro. Generalmente impulsado por precios basados en uso o modelos de expansión progresiva. |

<InsightCard icon="🎯" title="Por Qué el NRR Importa Más que la Tasa de Crecimiento">
Una empresa con 10% de crecimiento mensual y 95% de NRR es **más débil** que una empresa con 5% de crecimiento mensual y 110% de NRR. La primera está llenando un balde con fugas. La segunda tiene un motor de composición.
</InsightCard>

### Calculando el NRR de Sarah

```
MRR Inicial: $47.000
+ Expansión: +$2.400
- Contracción: -$1.200
- Pérdida: -$9.200
= $39.000

NRR = ($39.000 / $47.000) × 100 = 83%
```

**Los clientes existentes de Sarah se redujeron un 17% este mes.** Eso es una crisis.

<RangeSlider 
  label="¿Qué crees que es una meta realista de NRR para un fundador bootstrapped en solitario en el año 1?" 
  min={70} 
  max={130} 
  lowLabel="70%" 
  highLabel="130%" 
  persistKey="analytics-L6-nrr-target" 
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
El NRR es la métrica que más importa a los inversores, pero para los fundadores bootstrapped es tu **indicador de supervivencia**. Si el NRR es &lt;90%, estás quemando efectivo en adquisición para reemplazar ingresos perdidos. Construye características de retención antes de escalar la adquisición.
</ContextualNote>

---

## Rastreo para Negocios que No Son SaaS

No todos tienen ingresos recurrentes mensuales. Así es cómo adaptarlo:

### Para Proveedores de Servicios y Coaches

Rastrea los **ingresos recurrentes de retainer mensual** de la misma manera:

- **MRR Nuevo**: Nuevos clientes de retainer
- **MRR por Expansión**: Clientes actualizando de retainers básicos a premium
- **MRR por Contracción**: Clientes bajando de plan
- **MRR Perdido**: Clientes de retainer que terminaron sus contratos

**Los proyectos de pago único no cuentan como MRR.** Rastréalos por separado como "ingresos por proyecto."

### Para Negocios Basados en Proyectos

No tienes MRR, pero puedes rastrear:

1. **Promedio de Ingresos de los Últimos 3 Meses** — Suaviza la irregularidad
2. **Relación de Cobertura del Pipeline** — Valor del pipeline / meta de ingresos de 3 meses

**Meta: 3x de cobertura del pipeline.** Si tu meta de 3 meses es $30K, necesitas $90K en pipeline.

### Para Creadores de Contenido

Rastrea:

- **Ingresos recurrentes** (membresías, Patreon, patrocinios con contratos de varios meses)
- **Ingresos de pago único** (ventas de cursos, comisiones de afiliados, patrocinios únicos)

Calcula el NRR solo sobre ingresos recurrentes. Los ingresos de pago único son un bono, no sostenibles.

<ClassifyExercise
title="Clasifica Estos Flujos de Ingresos"
persistKey="analytics-L6-classify"
categories={[
{ id: "new", label: "MRR Nuevo", color: "#10b981" },
{ id: "expansion", label: "MRR por Expansión", color: "#3b82f6" },
{ id: "contraction", label: "MRR por Contracción", color: "#f59e0b" },
{ id: "churn", label: "MRR Perdido", color: "#ef4444" },
{ id: "notMRR", label: "No es MRR", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Un nuevo cliente se registra en tu plan de $500/mes", correctCategory: "new" },
{ id: "2", content: "Un cliente existente actualiza de $200/mes a $500/mes", correctCategory: "expansion" },
{ id: "3", content: "Un cliente existente baja de $500/mes a $200/mes", correctCategory: "contraction" },
{ id: "4", content: "Un cliente cancela su suscripción de $500/mes", correctCategory: "churn" },
{ id: "5", content: "Un cliente compra un proyecto de consultoría de pago único de $2.000", correctCategory: "notMRR" },
{ id: "6", content: "Un cliente añade 3 asientos más a su plan existente (+$150/mes)", correctCategory: "expansion" }
]}
/>

---

## Indicadores de Calidad de Ingresos

No todos los ingresos son iguales. Rastrea estas métricas de calidad:

### 1. Riesgo de Concentración

**Regla:** Si cualquier cliente individual es >20% de tus ingresos, eres frágil.

**Por qué:** Si se van, pierdes más del 20% de tu negocio de la noche a la mañana.

**Solución:** Diversifica. Añade más clientes en el mismo segmento, o expándete a segmentos adyacentes.

<ExampleCard label="La Dependencia de $60K">
Jake tenía 8 clientes. Uno pagaba $5K/mes. Los otros 7 pagaban $500/mes en total.

Su MRR: $5.500. Su concentración: **91% de un cliente.**

Ese cliente se fue. El MRR de Jake cayó a $500 de la noche a la mañana. Tuvo que despedir a su asistente virtual y volver al modo en solitario.

**Lección:** Diversifica antes de escalar.
</ExampleCard>

### 2. Mezcla de Ingresos: Recurrente vs. Pago Único

**SaaS Saludable:** 80%+ recurrente, &lt;20% de pago único (tarifas de configuración, consultoría).

**Servicios Saludables:** 50%+ retainers recurrentes, &lt;50% basado en proyectos.

**Por qué:** Los ingresos recurrentes son predecibles. Los de pago único son una caminadora.

### 3. Confiabilidad de Pagos

Rastrea:

- **Pagos a tiempo** (pagados dentro de los 7 días de la factura)
- **Pagos tardíos** (pagados 8-30 días después de la factura)
- **Pagos vencidos** (>30 días de vencimiento)

**Meta:** 90%+ a tiempo.

**Si los tardíos/vencidos son altos:** Cambia a facturación automática (suscripciones de Stripe) o exige pago por adelantado.

<ScenarioSimulator
title="Simulador de Calidad de Ingresos"
persistKey="analytics-L6-quality"
levers={[
{ id: "customers", label: "Total de Clientes", min: 5, max: 50, step: 5, defaultValue: 20 },
{ id: "topCustomerPct", label: "% de Ingresos del Cliente Principal", min: 5, max: 50, step: 5, defaultValue: 25 },
{ id: "recurringPct", label: "% de Ingresos Recurrentes", min: 30, max: 100, step: 10, defaultValue: 70 }
]}
outputs={[
{ id: "concentrationRisk", label: "Riesgo de Concentración", formula: "topCustomerPct > 20 ? 'ALTO' : 'BAJO'", unit: "", precision: 0 },
{ id: "revenueMixHealth", label: "Salud de la Mezcla de Ingresos", formula: "recurringPct >= 80 ? 'SALUDABLE' : recurringPct >= 50 ? 'MODERADA' : 'ARRIESGADA'", unit: "", precision: 0 }
]}
insight="Si tu cliente principal es >{topCustomerPct}% de los ingresos, tienes alto riesgo de concentración. Si los ingresos recurrentes son <{recurringPct}%, estás en una caminadora."
/>

---

## El Ritual de Revisión de Ingresos Mensual

El primer viernes de cada mes, dedica 30 minutos a esto:

<InteractiveChecklist
title="Lista de Verificación de Revisión Mensual de Ingresos"
persistKey="analytics-L6-review"
items={[
"Calcula la cascada de MRR de este mes (Nuevo, Expansión, Contracción, Pérdida)",
"Calcula el NRR (¿los clientes existentes están creciendo o reduciéndose?)",
"Verifica el riesgo de concentración (¿algún cliente es >20% de los ingresos?)",
"Revisa la mezcla de ingresos (¿qué % es recurrente vs. de pago único?)",
"Identifica el mayor problema (¿poca expansión? ¿alta pérdida? ¿riesgo de concentración?)",
"Establece un elemento de acción para abordar el mayor problema este mes"
]}
/>

### Qué Hacer con los Datos

| Hallazgo                         | Acción                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **MRR Nuevo es bajo**            | Regresa a la adquisición (Cursos 21-27). Tu embudo no está convirtiendo.                                    |
| **MRR por Expansión es cero**    | Construye un camino de upsell. Añade niveles premium, complementos, o precios basados en asientos.          |
| **MRR por Contracción es alto**  | Tus niveles de precios están mal. Los clientes están bajando porque no obtienen valor en niveles más altos. |
| **MRR Perdido es alto**          | Arregla la retención (Curso 37). La pérdida está matando tu crecimiento.                                    |
| **NRR < 90%**                    | **Modo crisis.** Deja de escalar la adquisición. Arregla la retención primero.                              |
| **Riesgo de concentración >20%** | Diversifica. Añade más clientes en el mismo segmento o expándete a segmentos adyacentes.                    |

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches y Consultores">
Tu mayor oportunidad de expansión son los **programas de continuidad**. Si los clientes terminan un engagement de 3 meses y se van, estás perdiendo el 100% de ellos. Añade un mastermind mensual de bajo costo o un programa de horas de oficina para retenerlos a un MRR más bajo.
</ContextualNote>

---

## Comparando Tu MRR con Benchmarks

Así es como se ve lo saludable para el SaaS en PyMEs:

| Métrica                      | Por Debajo del Promedio | Promedio              | Por Encima del Promedio |
| ---------------------------- | ----------------------- | --------------------- | ----------------------- |
| **Crecimiento de MRR Nuevo** | &lt;5% mensual          | 5-10% mensual         | >10% mensual            |
| **MRR por Expansión**        | 0-5% del MRR inicial    | 5-10% del MRR inicial | >10% del MRR inicial    |
| **MRR por Contracción**      | >3% del MRR inicial     | 1-3% del MRR inicial  | &lt;1% del MRR inicial  |
| **MRR Perdido**              | >7% del MRR inicial     | 3-7% del MRR inicial  | &lt;3% del MRR inicial  |
| **NRR**                      | &lt;90%                 | 90-100%               | >100%                   |

<InsightCard icon="📈" title="La Ventaja de $1 en Expansión">
Según Profitwell, **$1 de ingresos por expansión cuesta un 60% menos generarlo que $1 de ingresos nuevos**. Los clientes existentes ya confían en ti. Es más fácil hacerles upsell que adquirir extraños.

Si tu MRR por expansión es cero, estás dejando dinero sobre la mesa.
</InsightCard>

<ComparisonBuilder
title="Tu Cascada de MRR vs. Benchmark"
persistKey="analytics-L6-compare"
prompt="Pega tu resumen de cascada de MRR (MRR Inicial, Nuevo, Expansión, Contracción, Pérdida, MRR Final)"
expertExample="MRR Inicial: $50.000 | Nuevo: +$5.000 (10%) | Expansión: +$3.000 (6%) | Contracción: -$1.000 (2%) | Pérdida: -$2.000 (4%) | MRR Final: $55.000 | NRR: 102%"
criteria={[
"El MRR Nuevo es 5-10% del MRR inicial",
"El MRR por Expansión es 5-10% del MRR inicial",
"El MRR por Contracción es &lt;3% del MRR inicial",
"El MRR Perdido es &lt;7% del MRR inicial",
"El NRR es ≥100%"
]}
/>

---

## Errores Comunes en el Rastreo de MRR

### Error 1: Contar Ingresos de Pago Único como MRR

**Incorrecto:** Un cliente paga $5.000 por un proyecto de pago único. Lo cuentas como $5.000 MRR.

**Correcto:** Los ingresos de pago único no son MRR. Rastréalos por separado como "ingresos por proyecto."

### Error 2: No Rastrear la Expansión por Separado

**Incorrecto:** Un cliente actualiza de $200/mes a $500/mes. Solo ves el MRR total aumentar en $300.

**Correcto:** Rastrea los $300 como MRR por Expansión. Esto te dice que los clientes existentes están creciendo.

### Error 3: Ignorar la Contracción

**Incorrecto:** Un cliente baja de $500/mes a $200/mes. Lo ignoras porque no se fue.

**Correcto:** Rastrea los -$300 como MRR por Contracción. Las reducciones son un indicador adelantado de pérdida.

### Error 4: No Calcular el NRR

**Incorrecto:** Rastreas el crecimiento total del MRR y asumes que estás saludable porque está subiendo.

**Correcto:** Calcula el NRR. Si es &lt;100%, tus clientes existentes se están reduciendo. Lo estás enmascarando con la adquisición de nuevos clientes.

<SwipeDecision
title="Rastreo de MRR: ¿Correcto o Incorrecto?"
description="Desliza a la derecha para rastreo correcto de MRR, a la izquierda para errores"
optionA="Incorrecto"
optionB="Correcto"
persistKey="analytics-L6-swipe"
cards={[
{
id: "1",
content: "Un cliente paga $10.000 por un proyecto de consultoría de pago único. Lo cuentas como $10.000 MRR.",
correctOption: "a",
explanation: "Los ingresos de pago único no son MRR. Rastréalos por separado."
},
{
id: "2",
content: "Un cliente actualiza de $100/mes a $300/mes. Rastreas +$200 como MRR por Expansión.",
correctOption: "b",
explanation: "Correcto. El MRR por Expansión es el delta de las actualizaciones."
},
{
id: "3",
content: "Tu MRR total creció de $40K a $45K. Asumes que estás saludable sin verificar el NRR.",
correctOption: "a",
explanation: "Incorrecto. El crecimiento total del MRR puede enmascarar alta pérdida. Siempre calcula el NRR."
},
{
id: "4",
content: "Un cliente baja de $500/mes a $200/mes. Rastreas -$300 como MRR por Contracción.",
correctOption: "b",
explanation: "Correcto. Las reducciones son MRR por Contracción y un indicador adelantado de pérdida."
}
]}
/>

---

## Tu Plantilla de Panel de MRR

Aquí está la plantilla completa que construirás en Google Sheets (o tu CRM):

### Sección 1: Datos a Nivel de Cliente

| Nombre del Cliente | MRR Mes Pasado | MRR Este Mes | Categoría   | Delta |
| ------------------ | -------------- | ------------ | ----------- | ----- |
| Acme Corp          | $500           | $500         | Retenido    | $0    |
| Beta Inc           | $0             | $300         | Nuevo       | +$300 |
| Gamma LLC          | $800           | $1.200       | Expansión   | +$400 |
| Delta Co           | $600           | $400         | Contracción | -$200 |
| Epsilon Ltd        | $400           | $0           | Perdido     | -$400 |

### Sección 2: Resumen de Cascada de MRR

| Componente            | Monto      | % del MRR Inicial |
| --------------------- | ---------- | ----------------- |
| MRR Inicial           | $2.300     | 100%              |
| + MRR Nuevo           | +$300      | +13%              |
| + MRR por Expansión   | +$400      | +17%              |
| - MRR por Contracción | -$200      | -9%               |
| - MRR Perdido         | -$400      | -17%              |
| **= MRR Final**       | **$2.400** | **+4%**           |

### Sección 3: Métricas Clave

| Métrica           | Valor | Benchmark     | Estado                  |
| ----------------- | ----- | ------------- | ----------------------- |
| MRR Neto Nuevo    | +$100 | 5-10% mensual | En camino               |
| NRR               | 87%   | ≥100%         | Por debajo de la meta   |
| Tasa de Pérdida   | 17%   | &lt;7%        | Crisis                  |
| Tasa de Expansión | 17%   | 5-10%         | Por encima del promedio |

### Sección 4: Calidad de Ingresos

| Métrica                   | Valor | Meta    | Estado                  |
| ------------------------- | ----- | ------- | ----------------------- |
| % del Cliente Principal   | 21%   | &lt;20% | Riesgo de concentración |
| % de Ingresos Recurrentes | 85%   | >80%    | Saludable               |
| % de Pagos a Tiempo       | 92%   | >90%    | Saludable               |

<LinterFeedback
title="Verificador del Panel de MRR"
persistKey="analytics-L6-linter"
inputLabel="Pega tu resumen de cascada de MRR (MRR Inicial, Nuevo, Expansión, Contracción, Pérdida, MRR Final, NRR)"
rules={[
{
id: "nrr",
label: "NRR Saludable",
description: "El NRR debería ser ≥100%",
keywords: ["NRR", "100%", "110%", "120%"],
antiKeywords: ["90%", "80%", "70%"]
},
{
id: "churn",
label: "Pérdida Aceptable",
description: "El MRR perdido debería ser &lt;7% del MRR inicial",
keywords: ["3%", "5%", "6%"],
antiKeywords: ["10%", "15%", "20%"]
},
{
id: "expansion",
label: "Expansión Presente",
description: "El MRR por expansión debería ser >0",
keywords: ["Expansión", "+"],
antiKeywords: ["$0", "0%"]
}
]}
/>

---

## Elementos de Acción: Construye Tu Cascada de MRR Esta Semana

<InteractiveChecklist
title="Tus Elementos de Acción de la Cascada de MRR"
persistKey="analytics-L6-actions"
items={[
"Exporta tu lista de clientes con el MRR del mes pasado y de este mes desde tu CRM o sistema de facturación",
"Categoriza cada cliente como Nuevo, Retenido, Expansión, Contracción o Perdido",
"Calcula los totales para cada componente de MRR (Nuevo, Expansión, Contracción, Pérdida)",
"Construye tu tabla de resumen de cascada de MRR (MRR Inicial → MRR Neto Nuevo → MRR Final)",
"Calcula tu NRR (¿los clientes existentes están creciendo o reduciéndose?)",
"Verifica el riesgo de concentración (¿algún cliente es >20% de los ingresos?)",
"Identifica tu #1 problema de ingresos (¿poca expansión? ¿alta pérdida? ¿riesgo de concentración?)",
"Establece un elemento de acción para abordar tu #1 problema este mes"
]}
/>

---

## Lo Que Sigue

Ahora tienes una vista completa de la salud de tus ingresos. Sabes de dónde viene cada dólar y a dónde va.

**Próxima lección:** Abordaremos la **atribución de canal** — ¿qué fuente de adquisición (correo saliente, LinkedIn, contenido, referencias) produce más victorias? Aprenderás a calcular el ROI por canal y a eliminar los perdedores.

Tu cascada de MRR te dice **si** estás creciendo. La atribución de canal te dice **qué canales** están impulsando ese crecimiento.

Nos vemos en la Lección 7.
