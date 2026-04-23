---
title: "Precios Basados en Valor"
duration: "55 min"
track: "Sales Methodology"
course: "Course 18: Proposals, Pricing & Negotiation"
lesson: 4
---

# Precios Basados en Valor: Cobrar por Resultados, No por Horas

La mayoría de los fundadores fijan el precio de sus productos basándose en el **Costo Más Margen** (horas + margen) o en la **Media del Mercado** (precio promedio del mercado). Ambos enfoques son deficientes. Convierten en commodity tu experiencia única y dejan enormes sumas de dinero sobre la mesa. (Investigación Gartner).

Los **Precios Basados en Valor** vinculan tu precio al **Impacto Económico** que creas para el cliente. En 2026, la métrica principal para todo CFO es la **Eficiencia de Capital**. Si resuelves un problema de $100,000, un precio de $10,000 no es "caro": es un descuento del 90% sobre el valor creado. (2025 Estado de las Ventas).

<RangeSlider label="¿Cómo fijas actualmente el precio de tu producto/servicio?" min={1} max={5} lowLabel="Costo Más Margen (horas + margen)" highLabel="Basado en Valor (vinculado a resultados)" persistKey="proposals-pricing-L4-current-method" />

---

## 1. La Fórmula Basada en Valor

Hay un protocolo lógico de 3 pasos para llegar a un precio basado en valor.

<SlideNavigation>
<Slide title="Paso 1: Cuantifica el Costo de la Inacción (CDI)">

Antes de hablar de precio, debes cuantificar el "Balde que Gotea". Esto se extrae durante el descubrimiento.

- **Capacidad Desperdiciada:** [Horas desperdiciadas] × [Tarifa por Hora] × [Empleados afectados].
- **Fuga de Ingresos:** [Leads Calificados Perdidos] × [Valor Promedio del Trato] × [Brecha en Tasa de Conversión].
- **Ejemplo:** Un equipo de 5 personas dedica 10 horas cada semana a la conciliación manual. A $100/hora, eso representa **$260,000/año** en "Fricción de Capital Humano".

</Slide>

<Slide title="Paso 2: Cuantifica el Valor de la Transformación">

¿Cuánto vale el "Estado Futuro"?

- **ROI Duro:** Ahorro directo de costos o generación de ingresos.
- **ROI Blando:** Mitigación de riesgos (legal/seguridad) o retención de talento (reducir el agotamiento).
- **Ejemplo:** Al automatizar la conciliación, se recuperan $200,000 en capacidad y se reducen los errores de entrada de datos en un 90%, evitando una posible multa de auditoría de $20,000. Valor Total: **$220,000**.

</Slide>

<Slide title="Paso 3: Precio como Fracción del Valor (La Regla del 10x)">

Tu precio objetivo generalmente debe ser el **10-20% del valor cuantificado**. (2025 Puntos de Referencia).

- Si el valor creado es $220,000, una tarifa de $25,000 representa un **ROI de casi 9x**.
- **La Lógica:** Cuando puedes mostrar un ROI de 10x o más, la decisión se convierte en un simple problema matemático en lugar de una "batalla de presupuesto".

</Slide>
</SlideNavigation>

<ScenarioSimulator
title="Calculadora de Precios Basados en Valor"
persistKey="proposals-pricing-L4-calculator"
levers={[
{ id: "hoursWasted", label: "Horas desperdiciadas por semana (por empleado)", min: 1, max: 40, step: 1, defaultValue: 10 },
{ id: "hourlyRate", label: "Tarifa por hora promedio ($)", min: 25, max: 200, step: 5, defaultValue: 100 },
{ id: "employees", label: "Número de empleados afectados", min: 1, max: 50, step: 1, defaultValue: 5 },
{ id: "additionalValue", label: "Valor adicional (mitigación de riesgos, etc.) ($)", min: 0, max: 100000, step: 5000, defaultValue: 20000 }
]}
outputs={[
{ id: "annualCost", label: "Costo Anual de la Inacción", formula: "(hoursWasted * hourlyRate * employees * 52)", unit: "$", precision: 0 },
{ id: "totalValue", label: "Valor Total de la Transformación", formula: "(hoursWasted * hourlyRate * employees * 52) + additionalValue", unit: "$", precision: 0 },
{ id: "suggestedPrice", label: "Precio Sugerido (15% del valor)", formula: "((hoursWasted * hourlyRate * employees * 52) + additionalValue) * 0.15", unit: "$", precision: 0 },
{ id: "roi", label: "ROI para el Cliente", formula: "(((hoursWasted * hourlyRate * employees * 52) + additionalValue) / (((hoursWasted * hourlyRate * employees * 52) + additionalValue) * 0.15))", unit: "x", precision: 1 }
]}
insight="A ${suggestedPrice}, el cliente obtiene un retorno de {roi}x. Esto convierte la decisión en un 'problema matemático' en lugar de una batalla de presupuesto."
/>

---

## 2. Co-Autorizando el Caso de Negocio

En 2026, no envías un caso de negocio; lo **Co-Autoras** con tu Campeón.

- **El Script:** _"Para asegurarnos de que tu CFO vea la misma lógica que nosotros, revisemos los números juntos. Basándonos en tus cifras, vemos una fuga de [X]. Si lo resolvemos, el retorno es [Y]. ¿Te parece suficientemente conservador ese cálculo para tu equipo de finanzas?"_
- **Por qué funciona:** Cuando el Campeón ayuda a construir el modelo, lo defenderá ante el "Comité en la Sombra" como si fuera suyo. (2026 Tendencias de Adquisición).

<TemplateBuilder
title="Plantilla de Caso de Negocio Co-Autorizado"
persistKey="proposals-pricing-L4-business-case"
sections={[
{
id: "current-state",
title: "Estado Actual (Costo de la Inacción)",
fields: [
{ id: "problem", label: "Problema Principal", placeholder: "ej. Conciliación manual que consume 50 horas/semana", type: "textarea" },
{ id: "quantified-cost", label: "Costo Anual Cuantificado", placeholder: "ej. $260,000 en capacidad desperdiciada", type: "text" }
]
},
{
id: "future-state",
title: "Estado Futuro (Valor de la Transformación)",
fields: [
{ id: "hard-roi", label: "ROI Duro (ahorro/ingresos directos)", placeholder: "ej. $200,000 en capacidad recuperada", type: "text" },
{ id: "soft-roi", label: "ROI Blando (mitigación de riesgos, retención)", placeholder: "ej. $20,000 en riesgo de auditoría evitado", type: "text" },
{ id: "total-value", label: "Valor Total de la Transformación", placeholder: "ej. $220,000", type: "text" }
]
},
{
id: "investment",
title: "Inversión y ROI",
fields: [
{ id: "price", label: "Tu Precio", placeholder: "ej. $25,000", type: "text" },
{ id: "roi-multiple", label: "Múltiplo de ROI", placeholder: "ej. 8.8x", type: "text" },
{ id: "payback-period", label: "Período de Recuperación", placeholder: "ej. 6 semanas", type: "text" }
]
}
]}
/>

<InsightCard icon="🤝" title="Por Qué Funciona la Co-Autoría">
Cuando tu Campeón construye el modelo de ROI contigo, se convierte en "su número", no en "el número del proveedor". Lo defenderá con 10 veces más convicción cuando lo presente al CFO y al Comité en la Sombra.
</InsightCard>

---

## 3. Cambiando tus Métricas

Aleja de las "Métricas Heredadas" hacia los **Niveles Basados en Resultados**:

- **Métrica Obsoleta:** _"Facturado por asiento de usuario."_
- **Métrica 2026:** _"Facturado por flujo de trabajo automatizado exitoso"_ o _"Facturado como % de ingresos recuperados."_

<SwipeDecision
title="Métricas Heredadas vs. Basadas en Resultados"
description="Desliza a la derecha las métricas basadas en resultados alineadas con el valor, a la izquierda las métricas heredadas que convierten tu solución en commodity"
optionA="Heredada (Comoditizada)"
optionB="Basada en Resultados (Alineada al Valor)"
persistKey="proposals-pricing-L4-metrics"
cards={[
{ id: "1", content: "Facturado por asiento de usuario", correctOption: "a", explanation: "Esta es una métrica SaaS heredada que no refleja el valor real entregado. Incentiva a los clientes a minimizar asientos en lugar de maximizar resultados." },
{ id: "2", content: "Facturado por flujo de trabajo automatizado exitoso", correctOption: "b", explanation: "Esto se vincula directamente al valor creado. Cuantos más flujos de trabajo se automaticen, más valor se entrega y más ganas." },
{ id: "3", content: "Facturado por hora de consultoría", correctOption: "a", explanation: "La facturación por horas penaliza la eficiencia. Cuanto más rápido resuelves el problema, menos ganas: un incentivo perverso." },
{ id: "4", content: "Facturado como % de ingresos recuperados", correctOption: "b", explanation: "Alineación perfecta: solo ganas cuando el cliente gana. Este es el estándar de oro de los precios basados en valor." },
{ id: "5", content: "Retainer mensual fijo", correctOption: "a", explanation: "Aunque predecible, no escala con el valor. Un cliente que obtiene un ROI de 10x paga lo mismo que uno que obtiene un ROI de 2x." },
{ id: "6", content: "Precio por niveles según los resultados obtenidos", correctOption: "b", explanation: "A medida que el cliente logra más valor (más flujos, más ingresos, más ahorros), tu precio escala proporcionalmente." }
]}
/>

<ComparisonBuilder
title="Reencuadra tu Métrica de Precio"
persistKey="proposals-pricing-L4-reframe"
prompt="Toma tu métrica de precio actual y reencuádrala como una métrica basada en resultados"
expertExample="ANTERIOR: $99/mes por asiento de usuario → NUEVO: $499/mes por flujo de trabajo de departamento automatizado (usuarios ilimitados)"
criteria={["Se vincula a un resultado medible", "Escala con el valor del cliente", "Elimina restricciones arbitrarias (asientos, horas, etc.)"]}
/>

<InteractiveChecklist title="Acciones de Precios Basados en Valor" persistKey="proposals-pricing-L4-actions" items={["Calcula el Costo de la Inacción para tus 3 principales prospectos usando datos reales de descubrimiento", "Construye una plantilla de modelo de ROI co-autorizado que puedas usar con los Campeones", "Identifica una métrica de precio heredada que estés usando y reencuádrala como basada en resultados", "Practica el 'Script de Co-Autoría' con un colega o mentor", "Revisa tus últimas 5 propuestas: ¿cuantificaste el valor antes de presentar el precio?"]} />

---

## Quiz: La Matemática del Valor

```json
{
  "quizId": "value-based-pricing-2026",
  "title": "Decoupling Fees from Labor",
  "questions": [
    {
      "id": "p1841",
      "type": "multiple-choice",
      "text": "What is the '10x Rule' in value-based pricing?",
      "options": [
        { "id": "a", "text": "Talking 10 times more than the prospect." },
        {
          "id": "b",
          "text": "Ensuring that the quantified economic value you create is at least 10 times the price you are charging, making the purchase a 'Logical No-Brainer'."
        },
        { "id": "c", "text": "Increasing your price by 10% every year." },
        { "id": "d", "text": "Hiring 10 employees." }
      ],
      "correctAnswer": "b",
      "explanation": "If you solve a $100k problem for $10k, the customer keeps $90k in profit. The higher the ROI ratio, the less resistance you will face from the 'Shadow Committee' (Legal/Finance), as the cost of NOT buying becomes the biggest risk."
    },
    {
      "id": "p1842",
      "type": "multiple-choice",
      "text": "Why should you 'Co-Author' the ROI model with your Champion?",
      "options": [
        { "id": "a", "text": "Because they are better at math than you." },
        {
          "id": "b",
          "text": "To ensure they feel ownership over the data, which makes them a more effective advocate when they present the case internally to the CFO."
        },
        { "id": "c", "text": "To save time writing the proposal." },
        { "id": "d", "text": "Because it is required by law in 2026." }
      ],
      "correctAnswer": "b",
      "explanation": "Selling in 2026 is a 'Consensus Sport'. If you provide an ROI model, it's 'the vendor's number'. If the Champion builds it with you, it's 'their number', and they will fight for it with much higher conviction."
    }
  ]
}
```

**Siguiente Lección:** [Técnicas de Presentación de Precios](/sales-methodology/proposals-pricing/lesson-5)
