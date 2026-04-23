---
title: "Visualizaciones del Pipeline: Más Allá del Kanban"
duration: "50 min"
track: "Sales Methodology"
course: "Course 20: Sales Pipeline Management"
lesson: 9
---

# Visualizaciones del Pipeline: Más Allá del Kanban

La mayoría de los fundadores usan un tablero "Kanban" estándar (columnas por etapas). Aunque es útil, el Kanban es una vista **Estática**. En 2026, el fundador en solitario de élite utiliza **Visualizaciones Multidimensionales** para identificar riesgos que las columnas no muestran. (Investigación 2026 sobre Visualización de Datos de Ventas).

Necesitas ver la **Salud**, no solo la **Etapa**.

<InsightCard icon="📊" title="El Cambio de Visualización">
El Kanban te muestra DÓNDE están los negocios. Las visualizaciones avanzadas te muestran QUÉ negocios están muriendo y POR QUÉ.
</InsightCard>

<RangeSlider label="¿Con qué frecuencia revisas tu pipeline visualmente?" min={1} max={10} lowLabel="Rara vez" highLabel="Revisión diaria" persistKey="pipeline-management-L9-review-frequency" />

---

## 1. El Gráfico de "Burbujas": Valor vs. Tiempo

En lugar de solo ver dónde está un negocio, observa qué tan "Pesado" es.

- **Eje X:** Días en el Pipeline.
- **Eje Y:** Valor del Negocio.
- **Tamaño de la Burbuja:** Nivel de Interacción (Volumen de emails/Número de llamadas).
- **La Zona de Riesgo:** Las burbujas grandes (Alto valor) que están muy a la derecha (Negocios antiguos) pero son pequeñas (Baja interacción) son tus "Ballenas Muertas". Elimínalas. (Lección 2).

<SwipeDecision
title="¿Ballena Muerta o Negocio Saludable?"
description="Desliza a la derecha los negocios saludables, a la izquierda las ballenas muertas que deben eliminarse"
optionA="Ballena Muerta"
optionB="Negocio Saludable"
persistKey="pipeline-management-L9-whale-swipe"
cards={[
{ id: "1", content: "Negocio de $50K, 90 días en el pipeline, 2 emails enviados en el último mes", correctOption: "a", explanation: "Alto valor + antiguo + baja interacción = Ballena Muerta. Elimínalo o reactívalo con una acción agresiva." },
{ id: "2", content: "Negocio de $15K, 30 días en el pipeline, 8 puntos de contacto este mes", correctOption: "b", explanation: "Edad moderada con alta interacción muestra un impulso activo." },
{ id: "3", content: "Negocio de $80K, 120 días en el pipeline, 1 llamada en las últimas 6 semanas", correctOption: "a", explanation: "Un valor enorme estancado. Esta es la Ballena Muerta clásica: suéltala." },
{ id: "4", content: "Negocio de $25K, 45 días en el pipeline, llamadas semanales programadas", correctOption: "b", explanation: "La cadencia regular y el plazo razonable indican una progresión saludable." }
]}
/>

<ExampleCard label="Caso de Estudio: La Ballena Muerta de $60K">
Marcus tenía un negocio empresarial de $60K que llevaba 4 meses "en revisión legal". Su Kanban lo mostraba en la etapa "Contrato", parecía estar bien. Pero en un gráfico de burbujas, era un círculo enorme muy a la derecha con un tamaño de interacción diminuto. Llamó al responsable: "Elegimos a otro proveedor hace 6 semanas, simplemente nos olvidamos de avisarte." El gráfico de burbujas lo habría detectado 2 meses antes.
</ExampleCard>

---

## 2. El Gráfico "Sunburst": Cobertura de Stakeholders

Para negocios B2B complejos, necesitas visualizar el **Multi-Threading**. (Lección 5).

- **La Vista:** Un círculo dividido en departamentos (IT, Finanzas, Marketing, RRHH).
- **La Señal:** Si un negocio de $20K solo tiene un "Segmento" (Marketing) iluminado, tienes un alto riesgo de veto del "Comité en la Sombra".
- **La Acción:** La visualización te dice exactamente adónde ir a continuación: _"Necesito conectarme con IT para iluminar ese segmento."_

<ClassifyExercise
title="Evaluación de Cobertura de Stakeholders"
persistKey="pipeline-management-L9-stakeholder-classify"
categories={[
{ id: "high-risk", label: "Alto Riesgo (1-2 departamentos)", color: "#ef4444" },
{ id: "medium-risk", label: "Riesgo Medio (3 departamentos)", color: "#f59e0b" },
{ id: "well-threaded", label: "Bien Conectado (4+ departamentos)", color: "#10b981" }
]}
items={[
{ id: "1", content: "Negocio de $40K: Contactos solo en Marketing", correctCategory: "high-risk" },
{ id: "2", content: "Negocio de $25K: Contactos en Marketing, IT, Finanzas", correctCategory: "medium-risk" },
{ id: "3", content: "Negocio de $60K: Contactos en Marketing, IT, Finanzas, Operaciones, RRHH", correctCategory: "well-threaded" },
{ id: "4", content: "Negocio de $15K: Contactos en Ventas y Marketing", correctCategory: "high-risk" },
{ id: "5", content: "Negocio de $50K: Contactos en IT, Finanzas, Legal, Dirección", correctCategory: "well-threaded" }
]}
/>

---

## 3. El Diagrama de "Flujo" (Sankey): ¿Dónde Está la Fuga?

Un diagrama de Sankey muestra los cuellos de botella en tu pipeline.

- **La Visión:** Puede que tengas 100 leads en la parte superior, pero una caída masiva entre "Demo" y "Propuesta".
- **La Solución:** Esto te dice que el problema no es tu prospección; es la Arquitectura de tu Demo. (Curso 16).

<ScenarioSimulator
title="Analizador de Flujo del Pipeline"
persistKey="pipeline-management-L9-flow-simulator"
levers={[
{ id: "leads", label: "Leads Mensuales", min: 50, max: 500, step: 50, defaultValue: 200 },
{ id: "demoRate", label: "Lead → Demo (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
{ id: "proposalRate", label: "Demo → Propuesta (%)", min: 10, max: 70, step: 5, defaultValue: 40 },
{ id: "closeRate", label: "Propuesta → Cierre (%)", min: 10, max: 60, step: 5, defaultValue: 30 }
]}
outputs={[
{ id: "demos", label: "Demos Mensuales", formula: "leads * (demoRate / 100)", unit: "", precision: 0 },
{ id: "proposals", label: "Propuestas Mensuales", formula: "leads * (demoRate / 100) * (proposalRate / 100)", unit: "", precision: 0 },
{ id: "closes", label: "Cierres Mensuales", formula: "leads * (demoRate / 100) * (proposalRate / 100) * (closeRate / 100)", unit: "", precision: 1 }
]}
insight="Si tu tasa Demo → Propuesta está por debajo del 40%, tienes un problema con la demo. Si Propuesta → Cierre está por debajo del 25%, tienes un problema con el precio/manejo de objeciones. Arregla el cuello de botella, no la parte superior del embudo."
/>

<PredictionGate
question="Sarah tiene 150 leads/mes, el 30% se convierte en demos, pero solo el 15% de las demos se convierte en propuestas. ¿En qué debería enfocarse para mejorar?"
persistKey="pipeline-management-L9-bottleneck-predict"
type="choice"
choices={[
{ id: "a", text: "Conseguir más leads: 150 no es suficiente" },
{ id: "b", text: "Mejorar su proceso de demo: ese es el cuello de botella" },
{ id: "c", text: "Mejorar sus plantillas de propuesta" },
{ id: "d", text: "Contratar un asistente de ventas" }
]}
correctId="b"

> El cuello de botella es la **conversión Demo → Propuesta al 15%**. Aunque duplicara sus leads a 300, solo obtendría ~7 propuestas (300 × 30% × 15%). Pero si mejora su demo para convertir al 40%, sus 150 leads actuales generarían 18 propuestas: una mejora de 2,5 veces sin necesitar más leads. **Siempre arregla primero el punto más estrecho del flujo.**
> </PredictionGate>

---

## 4. El Panel de "Velocidad" (El Velocímetro)

En 2026, deberías tener un único "Velocímetro" para tu pipeline. (2025 Estado de las Ventas).

- **La Métrica:** Tiempo promedio para mover un negocio de la etapa A a la etapa B.
- **La Línea Roja:** Si tu "Velocidad" cae más de un 10% mes a mes, es un indicador adelantado de una futura caída en ingresos.

<FlipCard front="Fórmula de Velocidad del Pipeline" back="Velocidad = (Número de Oportunidades × Valor Promedio del Negocio × Tasa de Cierre) ÷ Duración Promedio del Ciclo de Ventas. Una caída del 10% en velocidad significa problemas de ingresos en 60-90 días." />

<InteractiveChecklist title="Tu Plan de Acción de Visualización" persistKey="pipeline-management-L9-actions" items={["Audita tu pipeline actual en busca de 'Ballenas Muertas' (alto valor + antiguos + baja interacción)", "Mapea la cobertura de stakeholders para tus 3 negocios principales: identifica los departamentos faltantes", "Calcula tus tasas de conversión en cada etapa para encontrar tu cuello de botella", "Configura un panel mensual de seguimiento de velocidad", "Programa revisiones semanales de 15 min de visualización del pipeline"]} />

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Tus habilidades con datos son perfectas para esto. Construye un script sencillo en Python o un panel en Google Sheets que genere automáticamente estas visualizaciones desde la exportación de tu CRM. La mayoría de los CRM tienen visualizaciones integradas terribles; puedes construir algo mejor en una tarde.
</ContextualNote>

---

## Quiz: Visualización del Pipeline

```json
{
  "quizId": "pipeline-visualization-2026",
  "title": "Mapping the Hidden Risks",
  "questions": [
    {
      "id": "pv20091",
      "type": "multiple-choice",
      "text": "Why is a 'Bubble' chart (Value vs. Time) more useful than a standard Kanban board for a busy founder?",
      "options": [
        { "id": "a", "text": "It uses more colors." },
        {
          "id": "b",
          "text": "It allows you to instantly identify 'Dead Whales'—high-value deals that have been in the pipeline too long without engagement—which a Kanban board hides in its columns."
        },
        { "id": "c", "text": "It helps you calculate sales tax." },
        {
          "id": "d",
          "text": "It makes you look more professional to investors."
        }
      ],
      "correctAnswer": "b",
      "explanation": "Kanban boards treat all deals in a column as equal. A bubble chart adds the dimension of'Time' and'Probability', highlighting which high-stakes deals are actually in danger of rotting away due to neglect or friction."
    },
    {
      "id": "pv20092",
      "type": "multiple-choice",
      "text": "What does a 'Sankey' (Flow) diagram reveal about your sales process?",
      "options": [
        {
          "id": "a",
          "text": "Exactly which step in your funnel is causing the most 'Leakage' (e.g., if you have a massive drop-off between Demo and Proposal), allowing you to fix the specific skill gap."
        },
        { "id": "b", "text": "The names of the best prospects." },
        { "id": "c", "text": "How many emails you've sent today." },
        { "id": "d", "text": "The total amount of money in the bank." }
      ],
      "correctAnswer": "a",
      "explanation": "Visualizing the flow allows you to see the volume of deals at each stage and where they disappear. If the'neck' is at the Demo stage, it doesn't matter how many more leads you get—you have a Demo problem that must be fixed first."
    }
  ]
}
```
