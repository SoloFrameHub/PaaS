---
title: "Fundamentos de Negociación"
duration: "55 min"
track: "Sales Methodology"
course: "Course 18: Proposals, Pricing & Negotiation"
lesson: 6
---

# Fundamentos de Negociación: El Protocolo "Dar-Recibir"

La negociación no es una batalla de voluntades; es un ejercicio colaborativo de resolución de problemas. En 2026, todo prospecto B2B está bajo presión para "hacer más con menos". (Investigación Gartner). Si están negociando contigo, ya decidieron que quieren tu solución; ahora solo están tratando de gestionar los riesgos internos del **Comité en la Sombra**.

El objetivo es llegar a un acuerdo que sea sostenible para ti y de alta velocidad para el prospecto. Esto requiere pasar del "Regateo" a la **Negociación por Principios**.

<InsightCard icon="🤝" title="El Cambio de Mentalidad en la Negociación">
Si están negociando, ya te eligieron. Ya no están buscando alternativas: están gestionando riesgo interno y restricciones de presupuesto.
</InsightCard>

---

## 1. BATNA: Tu Poder Invisible

**BATNA** (Mejor Alternativa a un Acuerdo Negociado) es tu punto de abandono absoluto. (Investigación Sandler).

- **La Fuente de Poder:** Si tienes 3 tratos más en el pipeline, tu BATNA es sólida. Si _necesitas_ este trato para pagar el alquiler, tu BATNA es débil.
- **La Regla:** Nunca aceptes un trato que sea peor que tu BATNA. En 2026, un cliente de "mal ajuste" que negoció tu precio a la baja un 50% consumirá el 200% de tu tiempo de soporte. (2025 Puntos de Referencia).

<RangeSlider
  label="¿Qué tan sólida es tu BATNA actual?"
  min={1}
  max={10}
  lowLabel="Desesperado (necesito este trato)"
  highLabel="Sólida (múltiples opciones)"
  persistKey="proposals-pricing-L6-batna"
/>

<ConceptReframe
concept="BATNA"
defaultLens="technical-founder"
lenses={[
{ id: "technical-founder", label: "Fundador Técnico", explanation: "La BATNA es como tener infraestructura de respaldo. Si tu servidor principal falla, necesitas un respaldo. En ventas, tu respaldo son otros tratos en el pipeline o la opción de retirarte y enfocarte en el producto." },
{ id: "coach", label: "Coach", explanation: "La BATNA es tu confianza en el 'Plan B'. Si un cliente no es el ajuste correcto, tienes otros clientes que valoran tu metodología. Esa confianza se nota en cómo negocias." },
{ id: "creator", label: "Creador", explanation: "La BATNA es como tener múltiples fuentes de ingresos. Si un patrocinador te ofrece poco, puedes retirarte porque tienes cursos, afiliados u otras alianzas. Ese apalancamiento se nota." }
]}
/>

---

## 2. Posiciones vs. Intereses

Los compradores suelen iniciar con una **Posición** (una exigencia). Tu trabajo es descubrir el **Interés** (el "Por qué").

| Posición del Prospecto                            | El Interés Oculto                                           | La Respuesta del Fundador                                                             |
| :------------------------------------------------ | :---------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| _"Necesitamos un descuento del 20%."_             | _"Mi CFO me puso un tope de presupuesto estricto de $10K."_ | _"Si trasladamos $2K al próximo ciclo presupuestal, ¿podemos empezar hoy?"_           |
| _"Necesitamos una cláusula de salida a 30 días."_ | _"Un proveedor lento me decepcionó el año pasado."_         | _"¿Qué es específicamente lo que te preocupa de nuestros primeros 30 días?"_          |
| _"Tu tarifa de configuración es demasiado alta."_ | _"Quiero ver valor antes de comprometer capital."_          | _"Si diferimos la tarifa hasta que se alcance el Objetivo X, ¿eso reduce el riesgo?"_ |

<SwipeDecision
title="¿Posición o Interés?"
description="Desliza a la derecha si es el interés REAL (el por qué), a la izquierda si es solo la posición superficial"
optionA="Posición Superficial"
optionB="Interés Real"
persistKey="proposals-pricing-L6-swipe"
cards={[
{ id: "1", content: "Necesitamos un descuento del 15%", correctOption: "a", explanation: "Esto es una posición. El interés puede ser restricciones de presupuesto, umbrales de aprobación internos o comparación con la competencia." },
{ id: "2", content: "Mi CFO no aprueba nada por encima de $12K sin revisión de la junta", correctOption: "b", explanation: "Esto revela la restricción real: un umbral de aprobación específico que puedes trabajar." },
{ id: "3", content: "Tu cronograma de implementación es demasiado largo", correctOption: "a", explanation: "Esto es una posición. El interés puede ser: 'Necesitamos resultados antes de la junta del Q3' o 'Me preocupa el ancho de banda del equipo.'" },
{ id: "4", content: "Necesito mostrar ROI en 60 días o mi jefe cancelará el proyecto", correctOption: "b", explanation: "Este es el interés real: una presión de cronograma específica que puedes abordar con hitos." }
]}
/>

<MiniRoleplay
  scenario="El prospecto dice: 'Necesitamos un descuento del 20% para que esto funcione.'"
  role="Eres el fundador. Descubre el interés detrás de esta posición."
  persistKey="proposals-pricing-L6-roleplay"
  modelResponse="Entiendo que el presupuesto es ajustado. ¿Puedo preguntar: ¿los $20K totales están fuera de tu rango aprobado, o hay un umbral específico que tu CFO estableció? A veces podemos reestructurar el calendario de pagos o trasladar costos al siguiente trimestre en lugar de descontar el valor."
/>

---

## 3. El Protocolo "Dar-Recibir"

Nunca cedas una concesión gratis. En 2026, los compradores profesionales respetan a los negociadores que mantienen su valor. Cada "Dar" de tu parte debe ir acompañado de un "Recibir" de parte de ellos.

**El Script "Si-Entonces":**

- **Si** necesitas un descuento del 10%, **Entonces** necesitamos eliminar la incorporación personalizada y pasar al autoservicio.
- **Si** necesitas términos de pago a 60 días, **Entonces** necesitamos un compromiso de 2 años en lugar de 1.
- **Si** quieres un precio más bajo, **Entonces** debes aceptar ser un caso de estudio público para nuestro lanzamiento del Q3.

<TemplateBuilder
title="Tus Escenarios Dar-Recibir"
persistKey="proposals-pricing-L6-giveget"
sections={[
{
id: "scenario1",
title: "Escenario 1: Solicitud de Descuento",
fields: [
{ id: "give1", label: "Lo que están pidiendo (el Dar)", placeholder: "ej. Descuento del 15%", type: "text" },
{ id: "get1", label: "Lo que pedirás a cambio (el Recibir)", placeholder: "ej. Pago anual anticipado en lugar de trimestral", type: "text" },
{ id: "script1", label: "Tu script Si-Entonces", placeholder: "Si reducimos el precio un 15%, entonces necesitaremos...", type: "textarea" }
]
},
{
id: "scenario2",
title: "Escenario 2: Solicitud de Términos",
fields: [
{ id: "give2", label: "Lo que están pidiendo", placeholder: "ej. Términos de pago a 60 días", type: "text" },
{ id: "get2", label: "Lo que pedirás a cambio", placeholder: "ej. Contrato de 2 años en lugar de 1", type: "text" },
{ id: "script2", label: "Tu script Si-Entonces", placeholder: "Si extendemos a 60 días, entonces necesitaremos...", type: "textarea" }
]
},
{
id: "scenario3",
title: "Escenario 3: Solicitud de Alcance",
fields: [
{ id: "give3", label: "Lo que están pidiendo", placeholder: "ej. Agregar asientos de usuario adicionales", type: "text" },
{ id: "get3", label: "Lo que pedirás a cambio", placeholder: "ej. Video de testimonio y logo en el sitio web", type: "text" },
{ id: "script3", label: "Tu script Si-Entonces", placeholder: "Si incluimos 5 asientos adicionales, entonces necesitaremos...", type: "textarea" }
]
}
]}
/>

<ExampleCard label="Ejemplo Real: El Intercambio por el Caso de Estudio">
Una fundadora SaaS recibió una solicitud de descuento del 20% de una marca reconocida. En lugar de simplemente aceptar, respondió: "Si reducimos el precio anual un 20%, entonces necesitaremos que te comprometas a un video testimonial y un webinar conjunto dentro de los 90 días posteriores al lanzamiento. Esa visibilidad de marca vale más para nosotros de lo que nos cuesta el descuento."

El prospecto aceptó. La fundadora obtuvo un caso de estudio de primer nivel que cerró 3 tratos más en el siguiente trimestre, un valor 10 veces mayor que el descuento que dio.
</ExampleCard>

---

## 4. El Apalancamiento de Negociación del "Fundador en Solitario"

Como fundador en solitario, tu mayor apalancamiento en la negociación no es el precio; es la **Velocidad de Implementación**.

- **El Reencuadre:** _"No puedo igualar el precio de [Gran Proveedor Tradicional]. Pero ellos pasarán 3 meses en 'Descubrimiento' con analistas junior. Yo puedo tenerte en funcionamiento y recuperando ingresos en 14 días. ¿Qué es más valioso para tu número del Q3: un descuento de $2K o $20K en ingresos recuperados?"_ (2026 Tendencias de Adquisición).

<ScenarioSimulator
title="Calculadora de Velocidad vs. Descuento"
persistKey="proposals-pricing-L6-simulator"
levers={[
{ id: "discount", label: "Descuento % que están solicitando", min: 5, max: 30, step: 5, defaultValue: 15 },
{ id: "dealSize", label: "Tamaño del trato ($)", min: 5000, max: 100000, step: 5000, defaultValue: 20000 },
{ id: "monthlyValue", label: "Valor mensual para el cliente ($)", min: 2000, max: 50000, step: 2000, defaultValue: 10000 },
{ id: "competitorDelay", label: "Implementación del competidor (meses)", min: 1, max: 6, step: 1, defaultValue: 3 },
{ id: "yourDelay", label: "Tu implementación (semanas)", min: 1, max: 8, step: 1, defaultValue: 2 }
]}
outputs={[
{ id: "discountCost", label: "Costo del descuento", formula: "dealSize * (discount / 100)", unit: "$", precision: 0 },
{ id: "timeAdvantage", label: "Meses de ventaja", formula: "competitorDelay - (yourDelay / 4)", unit: " meses", precision: 1 },
{ id: "velocityValue", label: "Valor de la ventaja en velocidad", formula: "monthlyValue * (competitorDelay - (yourDelay / 4))", unit: "$", precision: 0 }
]}
insight="La ventaja en velocidad vale ${velocityValue} frente a un descuento de ${discountCost}. Eso es una propuesta de valor {(velocityValue / discountCost).toFixed(1)}x mejor."
/>

<InteractiveChecklist
title="Tu Lista de Verificación de Preparación para Negociar"
persistKey="proposals-pricing-L6-actions"
items={[
"Calcula mi BATNA para este trato (¿cuál es mi punto de abandono?)",
"Identifica 3 posibles 'Recibires' que puedo solicitar si piden concesiones",
"Prepara mi propuesta de valor de velocidad (¿cuánto más rápido soy que las alternativas?)",
"Redacta 2-3 respuestas 'Si-Entonces' para solicitudes de descuento comunes",
"Investiga el ciclo presupuestal y los umbrales de aprobación del prospecto",
"Prepara preguntas para descubrir los intereses detrás de las posiciones"
]}
/>

---

## Quiz: Protegiendo el Margen

```json
{
  "quizId": "negotiation-fundamentals-2026",
  "title": "Strategy over Compromise",
  "questions": [
    {
      "id": "p1861",
      "type": "multiple-choice",
      "text": "What is the 'Give-Get' Protocol?",
      "options": [
        {
          "id": "a",
          "text": "Giving the customer whatever they want to get the deal."
        },
        {
          "id": "b",
          "text": "The rule that every concession you provide (the 'Give') must be exchanged for a concession from the buyer (the 'Get')."
        },
        { "id": "c", "text": "Getting a signature before giving the demo." },
        { "id": "d", "text": "A way to ask for more money." }
      ],
      "correctAnswer": "b",
      "explanation": "Free concessions invite more demands. By requiring a'Get' (like a faster signature, a longer term, or a case study) in exchange for a price'Give', you maintain your professional authority and ensure the trade is balanced."
    },
    {
      "id": "p1862",
      "type": "multiple-choice",
      "text": "Why is 'Implementation Velocity' a powerful negotiation lever for solo founders?",
      "options": [
        { "id": "a", "text": "Because it shows you are a fast worker." },
        {
          "id": "b",
          "text": "Because the economic value of 'Time-to-Result' often outweighs a small percentage discount, especially for high-interest 2026 budgets."
        },
        { "id": "c", "text": "Because it makes the proposal shorter." },
        { "id": "d", "text": "It isn't; price is all that matters." }
      ],
      "correctAnswer": "b",
      "explanation": "If a legacy vendor takes 6 months to start and you take 2 weeks, you are giving the customer 5.5 extra months of revenue/savings. That delta is almost always worth more than a 10-15% discount on the license fee."
    }
  ]
}
```

**Siguiente Lección:** [Cómo Manejar Solicitudes de Descuento](/sales-methodology/proposals-pricing/lesson-7)
