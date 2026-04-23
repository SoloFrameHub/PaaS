---
title: "Benchmarks de abandono para PyMEs y metas de NRR"
duration: "45 min"
track: "Éxito del Cliente"
course: "Curso 37: Retención y Prevención de Abandono"
lesson: 4
---

Estás rastreando puntajes de salud. Has identificado señales de abandono. Estás interviniendo en cuentas en riesgo.

Pero aquí está la pregunta que te quita el sueño: **¿Tu abandono realmente es bueno o malo?**

Perdiste 4 clientes el mes pasado. ¿Es una crisis o es normal? Tu NRR es 94%. ¿Deberías celebrar o entrar en pánico?

Sin benchmarks, estás volando a ciegas. No sabes si estás ganando o perdiendo.

## La verificación de realidad con benchmarks

Esto es lo que le pasó a Marcos, un fundador en solitario con una herramienta de gestión de proyectos de $28K MRR para agencias creativas en LATAM:

Estaba perdiendo 6-8 clientes por mes de un total de 180. Se sentía como mucho. Pasaba noches sin dormir preguntándose si su producto estaba fundamentalmente roto.

Entonces hizo los números contra benchmarks de la industria.

Su abandono mensual de logos: **3.9%**
Mediana de la industria para SaaS de PyMEs: **5.2%**
Best-in-class: **&lt;3%**

No estaba fallando. Estaba _arriba del promedio_. No genial todavía, pero no roto.

Más importante: ahora sabía su meta. Pasar de 3.9% a 2.8% en los próximos 6 meses lo pondría en la categoría best-in-class.

Esa claridad lo cambió todo. En lugar de pánico, tenía una hoja de ruta.

<InsightCard icon="📊" title="Por qué importan los benchmarks">
Sin contexto, cada cliente perdido se siente como un fracaso. Con benchmarks, sabes si estás peleando un problema de producto, un problema de onboarding, o solo dinámica normal del mercado.
</InsightCard>

## Las tres métricas que realmente importan

La mayoría de los fundadores rastrean demasiadas métricas y no entienden ninguna. Para fundadores en solitario, tres métricas te dicen todo:

1. **Abandono mensual de logos** — ¿Qué porcentaje de clientes cancelan cada mes?
2. **Abandono mensual de ingresos** — ¿Qué porcentaje del MRR pierdes cada mes?
3. **Retención Neta de Ingresos (NRR)** — ¿Estás creciendo los ingresos de clientes existentes más rápido de lo que los pierdes?

Desglosemos cada una.

<FlipCard
  front="Abandono de logos vs abandono de ingresos — ¿Cuál es la diferencia?"
  back="El abandono de logos cuenta clientes. El abandono de ingresos cuenta dólares. Si pierdes 5 clientes pequeños ($50/mes cada uno) pero haces upsell a 2 grandes (+$200/mes cada uno), el abandono de logos se ve mal (5 perdidos) pero el abandono de ingresos en realidad es negativo (ganaste $150 netos)."
/>

### Abandono mensual de logos: El conteo de clientes

**Fórmula:** (Clientes perdidos este mes / Clientes al inicio del mes) × 100

Si empezaste marzo con 100 clientes y perdiste 4, tu abandono mensual de logos es 4%.

<ScenarioSimulator
title="Calculadora de abandono de logos"
persistKey="retention-L4-logo-churn"
levers={[
{ id: "startCustomers", label: "Clientes al inicio del mes", min: 10, max: 500, step: 10, defaultValue: 100 },
{ id: "lostCustomers", label: "Clientes perdidos", min: 0, max: 50, step: 1, defaultValue: 4 }
]}
outputs={[
{ id: "logoChurn", label: "Abandono mensual de logos", formula: "(lostCustomers / startCustomers) * 100", unit: "%", precision: 1 },
{ id: "annualRetention", label: "Retención anual implícita", formula: "Math.pow(1 - (lostCustomers / startCustomers), 12) * 100", unit: "%", precision: 1 }
]}
insight="Con {logoChurn}% de abandono mensual, retendrás {annualRetention}% de los clientes en 12 meses. Eso significa que la vida promedio del cliente es aproximadamente {(1 / (lostCustomers / startCustomers)).toFixed(1)} meses."
/>

**Benchmarks de SaaS para PyMEs:**

- Punto de partida (normal): 5-8% mensual
- Bueno (meta a 6 meses): 3-5% mensual
- Excelente (meta a 12 meses): &lt;3% mensual

### Abandono mensual de ingresos: El impacto en dólares

**Fórmula:** (MRR perdido este mes / MRR al inicio del mes) × 100

Aquí es donde las cosas se ponen interesantes. El abandono de ingresos puede ser _menor_ que el abandono de logos si pierdes clientes pequeños, o _mayor_ si pierdes los grandes.

<ExampleCard label="Caso de estudio: El abandono de logos engañoso">
El SaaS de Carolina tenía 5% de abandono mensual de logos — justo en la mediana. Pero su abandono de ingresos era 8%.

¿Por qué? Estaba perdiendo a sus clientes de pago más alto ($500/mes) mientras retenía los del nivel más bajo ($50/mes).

El abandono de logos decía "estás en el promedio." El abandono de ingresos decía "estás sangrando cuentas de alto valor."

Investigó los datos: su nivel de $500/mes tenía un onboarding terrible. Se registraban, se sentían abrumados, y abandonaban en 60 días.

Solución: Construyó un flujo de onboarding personalizado para clientes de $500+. El abandono de ingresos bajó al 3% en 3 meses.
</ExampleCard>

**Benchmarks de SaaS para PyMEs:**

- Punto de partida: 4-6% mensual
- Bueno: 2-4% mensual
- Excelente: &lt;2% mensual

### Retención Neta de Ingresos (NRR): El motor de crecimiento

Esta es la métrica que separa los negocios buenos de los excelentes.

**Fórmula:** (MRR Inicial + Expansión - Contracción - Abandono) / MRR Inicial × 100

Digamos que empiezas el mes con $40,000 de MRR:

- Haces upsell a 3 clientes: +$1,200
- Haces downgrade a 2 clientes: -$300
- Pierdes 4 clientes: -$1,600

**NRR = ($40,000 + $1,200 - $300 - $1,600) / $40,000 × 100 = 97.5%**

<FlipCard
  front="¿Qué significa NRR >100%?"
  back="Significa que estás creciendo los ingresos de clientes existentes más rápido de lo que los pierdes al abandono. Podrías dejar de adquirir clientes nuevos por completo y seguir creciendo. Las mejores empresas SaaS tienen NRR de 120-130%. Para fundadores en solitario, 100%+ es la meta."
/>

<ScenarioSimulator
title="Calculadora de NRR"
persistKey="retention-L4-nrr"
levers={[
{ id: "startingMRR", label: "MRR inicial ($)", min: 5000, max: 100000, step: 1000, defaultValue: 40000 },
{ id: "expansion", label: "MRR de expansión ($)", min: 0, max: 5000, step: 100, defaultValue: 1200 },
{ id: "contraction", label: "MRR de contracción ($)", min: 0, max: 2000, step: 100, defaultValue: 300 },
{ id: "churn", label: "MRR abandonado ($)", min: 0, max: 5000, step: 100, defaultValue: 1600 }
]}
outputs={[
{ id: "nrr", label: "Retención Neta de Ingresos", formula: "((startingMRR + expansion - contraction - churn) / startingMRR) * 100", unit: "%", precision: 1 },
{ id: "netChange", label: "Cambio neto de MRR", formula: "expansion - contraction - churn", unit: "$", precision: 0 }
]}
insight="Tu NRR es `{nrr}`%. {nrr >= 100 ? 'Estás creciendo solo con clientes existentes — este es el santo grial.' : 'Necesitas ' + ((startingMRR \* 0.01) - (expansion - contraction - churn)).toFixed(0) + ' más en expansión para llegar al 100% de NRR.'}"
/>

**Benchmarks de SaaS para PyMEs:**

- Punto de partida: 85-95%
- Bueno: 95-100%
- Excelente: 100%+

## La realidad del fundador en solitario: Tus metas reales

Aquí está la verdad: no estás compitiendo con empresas SaaS respaldadas por venture capital que tienen equipos de CS de 10 personas.

Eres un fundador en solitario. Tus benchmarks son diferentes.

<InsightCard icon="🎯" title="Benchmarks realistas para fundadores en solitario">
Si estás en 5-8% de abandono mensual ahora mismo, eres *normal*. Tu meta no es igualar el SaaS empresarial (1-2% de abandono) en 6 meses. Tu meta es llegar a 3-5% en 6 meses, luego &lt;3% en 12 meses.
</InsightCard>

<TemplateBuilder
title="Tus metas de benchmark"
persistKey="retention-L4-targets"
sections={[
{
id: "current",
title: "Estado actual",
fields: [
{ id: "customers", label: "Total de clientes", placeholder: "ej., 150", type: "number" },
{ id: "mrr", label: "MRR total ($)", placeholder: "ej., 25000", type: "number" },
{ id: "logoChurn", label: "Abandono mensual de logos (%)", placeholder: "ej., 6", type: "number" },
{ id: "revenueChurn", label: "Abandono mensual de ingresos (%)", placeholder: "ej., 5", type: "number" }
]
},
{
id: "targets",
title: "Metas a 6 meses",
fields: [
{ id: "logoTarget", label: "Meta de abandono de logos (%)", placeholder: "ej., 3.5", type: "number" },
{ id: "revenueTarget", label: "Meta de abandono de ingresos (%)", placeholder: "ej., 2.5", type: "number" },
{ id: "nrrTarget", label: "Meta de NRR (%)", placeholder: "ej., 98", type: "number" }
]
}
]}
/>

## Análisis de cohortes: La verdad oculta sobre tu abandono

Aquí hay una pregunta que cambiará cómo piensas sobre la retención:

**¿Estás mejorando o empeorando en mantener clientes?**

No puedes responder eso mirando el abandono general. Necesitas análisis de cohortes.

Una cohorte es un grupo de clientes que se registraron en el mismo mes. El análisis de cohortes rastrea: ¿cuántos clientes de cada mes de registro siguen contigo después de 1 mes, 3 meses, 6 meses, 12 meses?

<ExampleCard label="Caso de estudio: El abandono que mejora">
El SaaS de David tenía 5% de abandono mensual. Se veía estable.

Pero cuando hizo análisis de cohortes, descubrió:

- Cohorte de enero: 40% abandonó en el primer mes, 60% retenido al mes 6
- Cohorte de marzo (después de mejoras de onboarding): 20% abandonó en el primer mes, 75% retenido al mes 6

El abandono general era el mismo, pero los _nuevos_ clientes se estaban reteniendo mucho mejor. Sus mejoras estaban funcionando — solo tomaba tiempo para aparecer en los números agregados.
</ExampleCard>

La tabla de cohortes se ve así:

| Mes de registro | Mes 1 | Mes 2 | Mes 3 | Mes 6 | Mes 12 |
| --------------- | ----- | ----- | ----- | ----- | ------ |
| Enero           | 100%  | 60%   | 50%   | 40%   | 35%    |
| Febrero         | 100%  | 65%   | 55%   | 45%   | —      |
| Marzo           | 100%  | 80%   | 70%   | —     | —      |

Si Marzo > Febrero > Enero, estás mejorando. Si la tendencia es plana o descendente, tu trabajo de retención no está aterrizando.

<SlideNavigation>
<Slide title="Cómo leer tablas de cohortes">

**Qué buscar:**

1. **El precipicio del primer mes** — ¿Dónde está la mayor caída? Si el 40% abandona en el mes 1, eso es un problema de onboarding.
2. **El estado estable** — ¿Dónde se aplana la retención? Si se aplana al 60% después del mes 3, esa es tu tasa natural de retención.
3. **La tendencia** — ¿Las cohortes más nuevas retienen mejor que las antiguas? Ese es el único número que importa.

</Slide>

<Slide title="Construyendo tu primera tabla de cohortes">

No necesitas herramientas sofisticadas. Una Google Sheet funciona:

**Columnas:** Mes 0, Mes 1, Mes 2... Mes 12
**Filas:** Cada mes de registro (Ene 2024, Feb 2024, etc.)
**Fórmula:** =COUNTIF(clientes, "sigue activo al mes X") / COUNTIF(clientes, "se registró en mes de cohorte")

Actualízala mensualmente. Observa la tendencia.

</Slide>

<Slide title="Cómo se ve lo bueno">

**Retención de cohorte saludable:**

- Mes 1: 80-90% (10-20% abandono en primer mes)
- Mes 3: 70-80%
- Mes 6: 60-75%
- Mes 12: 55-70%

**Banderas rojas:**

- Retención del Mes 1 &lt;60% (el onboarding está roto)
- La retención sigue cayendo después del mes 6 (problema de product-market fit)
- Las cohortes más nuevas retienen _peor_ que las antiguas (estás retrocediendo)

</Slide>
</SlideNavigation>

## La tasa de abandono de equilibrio: Tu techo de crecimiento

Aquí hay una métrica que la mayoría de los fundadores no rastrean pero deberían:

**Tasa de abandono de equilibrio = Nuevo MRR / MRR Total**

Esta es la máxima tasa de abandono mensual que puedes sostener y seguir creciendo.

Ejemplo: Tienes $40K MRR. Agregas $2K en nuevo MRR cada mes.

Abandono de equilibrio = $2K / $40K = **5%**

Si tu abandono está por debajo del 5%, creces. Si está por encima del 5%, te achicas.

<ScenarioSimulator
title="Calculadora de abandono de equilibrio"
persistKey="retention-L4-breakeven"
levers={[
{ id: "totalMRR", label: "MRR total ($)", min: 5000, max: 100000, step: 1000, defaultValue: 40000 },
{ id: "newMRR", label: "Nuevo MRR por mes ($)", min: 500, max: 10000, step: 500, defaultValue: 2000 }
]}
outputs={[
{ id: "breakeven", label: "Tasa de abandono de equilibrio", formula: "(newMRR / totalMRR) * 100", unit: "%", precision: 1 },
{ id: "growthRate", label: "Tasa de crecimiento si abandono = 3%", formula: "((newMRR - (totalMRR * 0.03)) / totalMRR) * 100", unit: "%", precision: 1 }
]}
insight="Tu abandono de equilibrio es `{breakeven}`%. Si estás por debajo, creces. Si estás por encima, te achicas. Con 3% de abandono, crecerías {growthRate}% mensual."
/>

<InsightCard icon="⚠️" title="La trampa del crecimiento">
Muchos fundadores se enfocan obsesivamente en la adquisición mientras ignoran el abandono. Agregan $3K/mes en nuevo MRR pero pierden $2.5K al abandono. Crecimiento neto: $500/mes. Eso son 12 meses para agregar $6K de MRR.

Si reducen el abandono a la mitad (a $1.25K), el crecimiento neto se convierte en $1.75K/mes — 3.5x más rápido con _cero_ cambio en adquisición.

La retención es una palanca de crecimiento, no solo una medida de ahorro de costos.
</InsightCard>

## Benchmarking por ARPU: Por qué el nivel de precio importa

No todas las tasas de abandono son iguales. Tu abandono aceptable depende mucho de tu ARPU (Ingreso Promedio Por Usuario).

<ClassifyExercise
title="Clasifica estas tasas de abandono"
persistKey="retention-L4-classify"
categories={[
{ id: "good", label: "Bueno para este ARPU", color: "#10b981" },
{ id: "acceptable", label: "Aceptable", color: "#f59e0b" },
{ id: "bad", label: "Demasiado alto", color: "#ef4444" }
]}
items={[
{ id: "1", content: "$50/mes de ARPU, 6% de abandono mensual", correctCategory: "acceptable", explanation: "Los productos de ARPU bajo tienen abandono estructuralmente más alto. 6% es la mediana para este nivel." },
{ id: "2", content: "$500/mes de ARPU, 6% de abandono mensual", correctCategory: "bad", explanation: "Con $500/mes, deberías estar en &lt;3%. 6% significa que estás perdiendo clientes de alto valor demasiado rápido." },
{ id: "3", content: "$100/mes de ARPU, 3% de abandono mensual", correctCategory: "good", explanation: "3% es best-in-class para este nivel de ARPU." },
{ id: "4", content: "$50/mes de ARPU, 10% de abandono mensual", correctCategory: "bad", explanation: "Incluso para ARPU bajo, 10% es insostenible." },
{ id: "5", content: "$200/mes de ARPU, 2% de abandono mensual", correctCategory: "good", explanation: "Excelente retención para ARPU de mercado medio." }
]}
/>

**Benchmarks de abandono por ARPU:**

| Nivel de ARPU | Abandono mensual aceptable | Abandono mensual bueno | Abandono mensual excelente |
| ------------- | -------------------------- | ---------------------- | -------------------------- |
| &lt;$100/mes  | 4-8%                       | 3-5%                   | &lt;3%                     |
| $100-500      | 2-5%                       | 2-3%                   | &lt;2%                     |
| $500+         | 1-3%                       | 1-2%                   | &lt;1%                     |

¿Por qué importa el ARPU? Los clientes que pagan más tienen:

- Más tomadores de decisión (más difícil cancelar impulsivamente)
- Contratos más largos (anual vs mensual)
- Más integración/costos de cambio
- Expectativas más altas (pero también mayor tolerancia al precio si el valor es claro)

## Juntando todo: Tu dashboard de benchmarks

No necesitas una herramienta sofisticada de BI. Una hoja de cálculo simple actualizada mensualmente es suficiente.

<TemplateBuilder
title="Dashboard mensual de retención"
persistKey="retention-L4-dashboard"
sections={[
{
id: "snapshot",
title: "Foto mensual",
fields: [
{ id: "month", label: "Mes", placeholder: "ej., Marzo 2026", type: "text" },
{ id: "startCustomers", label: "Clientes (inicio)", placeholder: "ej., 150", type: "number" },
{ id: "startMRR", label: "MRR (inicio)", placeholder: "ej., 25000", type: "number" },
{ id: "newCustomers", label: "Clientes nuevos", placeholder: "ej., 12", type: "number" },
{ id: "lostCustomers", label: "Clientes perdidos", placeholder: "ej., 5", type: "number" },
{ id: "expansion", label: "MRR de expansión", placeholder: "ej., 800", type: "number" },
{ id: "contraction", label: "MRR de contracción", placeholder: "ej., 200", type: "number" },
{ id: "churnedMRR", label: "MRR abandonado", placeholder: "ej., 1200", type: "number" }
]
},
{
id: "calculated",
title: "Métricas calculadas",
fields: [
{ id: "logoChurn", label: "Abandono de logos (%)", placeholder: "Calculado automáticamente", type: "number" },
{ id: "revenueChurn", label: "Abandono de ingresos (%)", placeholder: "Calculado automáticamente", type: "number" },
{ id: "nrr", label: "NRR (%)", placeholder: "Calculado automáticamente", type: "number" }
]
}
]}
/>

**Actualiza esto mensualmente. Rastrea las tendencias durante 6-12 meses.**

## Tu plan de acción

<InteractiveChecklist
title="Checklist de implementación de benchmarks"
persistKey="retention-L4-actions"
items={[
"Calcula tu abandono mensual actual de logos y de ingresos",
"Calcula tu NRR de los últimos 3 meses",
"Construye una tabla simple de retención de cohortes (últimos 6 meses de registro)",
"Establece metas a 6 meses para abandono de logos, abandono de ingresos y NRR",
"Calcula tu tasa de abandono de equilibrio",
"Crea una plantilla de dashboard mensual y comprométete a actualizarla",
"Identifica tu brecha más grande: abandono de logos, abandono de ingresos o expansión"
]}
/>

## La verdad sobre los benchmarks

Los benchmarks no son metas. Son contexto.

Si estás en 6% de abandono mensual y el benchmark es 3%, eso no significa que estás fallando. Significa que tienes una oportunidad de 3 puntos porcentuales.

La pregunta real no es "¿Soy mejor que el benchmark?" sino "¿Estoy mejorando?"

Si tu abandono era 8% hace seis meses y es 6% ahora, estás ganando. Si ha estado estancado en 6% por un año, necesitas cambiar tu enfoque.

**Los benchmarks te dan dirección. Las tendencias te dicen si te estás moviendo.**

---

**Siguiente lección:** Secuencias de reactivación (Sin login en 10 días) — donde aprenderás a intervenir _antes_ de que los clientes se desconecten mentalmente.
