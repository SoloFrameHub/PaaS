---
title: "Contratos y Términos Básicos"
duration: "55 min"
track: "Sales Methodology"
course: "Course 18: Proposals, Pricing & Negotiation"
lesson: 8
---

# Contratos y Términos: El Escudo Legal de Alta Velocidad

Has ganado el "Sí" emocional, pero antes de que cambie dinero de manos, hay papeleo. En 2026, el principal destructor de tratos no es el precio; es la **Fricción Legal**. (2025 Estado de las Ventas). Las grandes empresas suelen intentar obligar a los fundadores en solitario a firmar Acuerdos de Servicios Maestros (MSA) de 40 páginas diseñados para Microsoft.

Tu objetivo es usar un **Protocolo de Contrato de Alta Velocidad**: simplificar tus términos para asegurarte de cobrar, proteger tu propiedad intelectual y limitar tu responsabilidad sin una revisión legal de 6 meses.

<InsightCard icon="⚖️" title="El Problema Real">
La mayoría de los fundadores en solitario pierden tratos no porque sus contratos sean débiles, sino porque son demasiado complejos. Los compradores empresariales esperan documentos legales al nivel de Microsoft de una empresa unipersonal, creando un ciclo de revisión de 6 meses que mata el impulso.
</InsightCard>

---

## 1. Los 3 Pilares de un Acuerdo para Fundadores en Solitario

<SlideNavigation>
<Slide title="Pilar 1: Propiedad Intelectual (El Foso)">

En la era de la IA, esto es crítico. (2026 Tendencias de Adquisición).

- **Tu Propiedad:** Tú posees la "Plataforma", el "Código Base", la "Metodología" y los "Pesos del Modelo de IA" (si aplica).
- **Su Propiedad:** Ellos poseen sus "Datos de Usuario" y los "Resultados" específicos generados para su negocio.
- **La Guardia:** Nunca aceptes lenguaje de "Trabajo por Encargo" a menos que seas una empresa de desarrollo personalizado. Estás otorgando una **Licencia**, no vendiendo la fábrica.

<FlipCard front="¿Cuál es la diferencia entre una Licencia y un Trabajo por Encargo?" back="Una Licencia te permite mantener la propiedad de tu producto principal mientras otorgas derechos de uso. El Trabajo por Encargo transfiere toda la propiedad intelectual al cliente, lo que significa que no puedes usar ese trabajo para nadie más. Para servicios productizados, siempre usa Licenciamiento." />

</Slide>

<Slide title="Pilar 2: Limitación de Responsabilidad (La Seguridad)">

Esta es la cláusula "No pierdas tu casa".

- **El Estándar 2026:** La responsabilidad debe estar limitada al monto total pagado en los 12 meses anteriores. (2025 Puntos de Referencia).
- **La Guardia Cibernética:** Si usas LLMs, exime explícitamente la responsabilidad por "Alucinaciones de IA" o tiempo de inactividad de API de terceros.

<ExampleCard label="Caso Real: La Trampa de Responsabilidad de $500K">
Un fundador en solitario firmó un contrato sin límite de responsabilidad. Cuando la campaña de su cliente tuvo un rendimiento inferior (sin relación con el trabajo del fundador), el cliente demandó por "oportunidad de ingresos perdida" por un total de $500K. El fundador llegó a un acuerdo por $75K y casi quebró. Una simple cláusula de límite de responsabilidad habría limitado la exposición al valor del contrato de $15K.
</ExampleCard>

</Slide>

<Slide title="Pilar 3: Velocidad de Pago (El Flujo de Caja)">

"Neto 30" es el estándar empresarial, pero los fundadores en solitario deben presionar por **Neto 15** o **Pago Anticipado**.

- **El Script:** _"Como empresa boutique especializada, nuestro modelo operativo requiere términos Neto 15 para mantener la velocidad de implementación que discutimos. ¿Tu sistema de contabilidad admite eso, o debemos ajustar la fecha de inicio?"_

<RangeSlider label="¿Qué porcentaje de tus contratos actuales tienen términos de pago Neto 30 o más?" min={0} max={100} lowLabel="0%" highLabel="100%" persistKey="proposals-pricing-L8-net30" />

</Slide>
</SlideNavigation>

---

## 2. Navegando la Batalla de las "Marcas Rojas"

Marcar en rojo es cuando el abogado del prospecto tacha tu texto. **No entres en pánico.**

<DecisionTree
title="Marco de Respuesta a Marcas Rojas"
persistKey="proposals-pricing-L8-redline"
startNodeId="start"
nodes={[
{
id: "start",
content: "El equipo legal del prospecto devuelve tu contrato con 12 marcas rojas. ¿Cuál es tu primer movimiento?",
choices: [
{ label: "Programa una llamada con tu Campeón para entender las preocupaciones reales", nextNodeId: "champion" },
{ label: "Responde directamente a Legal con contraargumentos", nextNodeId: "legal-direct" },
{ label: "Acepta todos los cambios para avanzar más rápido", nextNodeId: "accept-all" }
]
},
{
id: "champion",
content: "Tu Campeón revela que Legal está preocupado por la privacidad de datos debido a una brecha reciente en otro proveedor. Ofreces agregar un adéndum específico de manejo de datos. El trato avanza.",
isTerminal: true,
outcome: "positive"
},
{
id: "legal-direct",
content: "Legal responde con aún más preguntas y un retraso de 3 semanas. Tu Campeón se frustra con el ritmo lento.",
isTerminal: true,
outcome: "negative"
},
{
id: "accept-all",
content: "Firmas cediendo derechos de PI y responsabilidad ilimitada. Seis meses después, te demandan por $200K por mal uso de tu herramienta por parte del cliente.",
isTerminal: true,
outcome: "negative"
}
]}
/>

1.  **Entiende el Riesgo:** ¿Están preocupados por la privacidad de datos o por los retrasos en el proyecto? Resuelve el riesgo, no solo discutas las palabras.
2.  **Usa Estándares de la Industria:** _"Nuestro límite de responsabilidad sigue el estándar de la industria SaaS para proveedores de nuestro tamaño. Esto nos permite mantener nuestros precios al nivel competitivo que cotizamos."_
3.  **El Apalancamiento del 'Campeón':** Si los abogados están atascados, pregúntale a tu Campeón: _"Quiero empezar el lunes, pero el equipo legal está bloqueado en la Cláusula X. ¿Es esto un obstáculo para el proyecto, o podemos obtener una exención para este piloto?"_

<SwipeDecision
title="¿Lenguaje Contractual Seguro o Señal de Alerta?"
description="Desliza a la derecha el lenguaje seguro, a la izquierda las cláusulas peligrosas"
optionA="Señal de Alerta"
optionB="Lenguaje Seguro"
persistKey="proposals-pricing-L8-swipe"
cards={[
{
id: "1",
content: "El Contratista acepta responsabilidad ilimitada por cualquier daño derivado de los Servicios.",
correctOption: "a",
explanation: "Nunca aceptes responsabilidad ilimitada. Esto podría arruinarte por problemas fuera de tu control. Siempre limita a 12 meses de tarifas pagadas."
},
{
id: "2",
content: "La responsabilidad del Contratista se limita al monto total pagado por el Cliente en los 12 meses anteriores a la reclamación.",
correctOption: "b",
explanation: "Esta es la protección estándar de la industria. Limita tu exposición a una cantidad razonable y predecible."
},
{
id: "3",
content: "Todos los productos de trabajo serán considerados Trabajo por Encargo y propiedad exclusiva del Cliente.",
correctOption: "a",
explanation: "Esto transfiere toda la PI al cliente, impidiéndote reutilizar tu metodología, código o marcos de trabajo para otros clientes. Usa licenciamiento en su lugar."
},
{
id: "4",
content: "El Cliente posee todos los Datos de Resultados generados específicamente para su negocio. El Contratista retiene la propiedad de la Plataforma, Metodología Principal y Pesos del Modelo.",
correctOption: "b",
explanation: "División perfecta de PI: ellos poseen sus resultados específicos, tú posees tus activos reutilizables."
},
{
id: "5",
content: "Términos de pago: Neto 60 desde la fecha de la factura.",
correctOption: "a",
explanation: "Neto 60 destruye el flujo de caja para los fundadores en solitario. Presiona por Neto 15 o requiere el 50% anticipado para proyectos de más de $10K."
}
]}
/>

---

## 3. El "Paquete de Adquisición" 2026

Para parecer un proveedor "Seguro", entrega un paquete prearmado a Adquisiciones antes de que lo pidan. Esto evita el 50% de sus preguntas.

<InteractiveChecklist
title="Tu Lista de Verificación del Paquete de Adquisición"
persistKey="proposals-pricing-L8-procurement"
items={[
"Certificado de Seguro Cibernético (que muestre cobertura de $1M+)",
"Autoevaluación de Seguridad (estado VSA o SOC2-Lite)",
"Documentación W-9 / RUC / Identificación Fiscal",
"Adéndum GDPR / DPA (si manejas datos de la UE o CA)",
"Plantilla de MSA estándar (1-2 páginas, no 40)",
"Referencias o casos de estudio de clientes de tamaño similar"
]}
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Tu documentación de seguridad es una ventaja competitiva. Si has implementado prácticas de seguridad básicas (cifrado en reposo, controles SOC2-lite, copias de seguridad regulares), documéntalas en una hoja simple. Los compradores empresariales confiarán en ti más que en agencias sin documentación.
</ContextualNote>

<TemplateBuilder
title="Tu Plantilla MSA de 1 Página"
persistKey="proposals-pricing-L8-msa"
sections={[
{
id: "services",
title: "Servicios y Entregables",
fields: [
{ id: "scope", label: "Resumen del Alcance", placeholder: "ej. Estrategia de contenido mensual + 4 artículos", type: "textarea" },
{ id: "timeline", label: "Cronograma", placeholder: "ej. Compromiso inicial de 90 días", type: "text" }
]
},
{
id: "ip",
title: "Propiedad Intelectual",
fields: [
{ id: "you-own", label: "Tú Posees", placeholder: "ej. Plataforma, Metodología Principal, Modelos de IA", type: "textarea" },
{ id: "they-own", label: "El Cliente Posee", placeholder: "ej. Sus Datos, Resultados Específicos para su negocio", type: "textarea" }
]
},
{
id: "liability",
title: "Responsabilidad y Pago",
fields: [
{ id: "cap", label: "Límite de Responsabilidad", placeholder: "ej. Tarifas totales pagadas en los 12 meses anteriores", type: "text" },
{ id: "payment", label: "Términos de Pago", placeholder: "ej. Neto 15, o 50% anticipado para proyectos de más de $10K", type: "text" }
]
}
]}
/>

---

## Quiz: Protegiendo los Cimientos

```json
{
  "quizId": "contracts-2026",
  "title": "Legal Safety for Solo Founders",
  "questions": [
    {
      "id": "p1881",
      "type": "multiple-choice",
      "text": "Why should you separate the 'Proposal' from the 'Agreement' (MSA)?",
      "options": [
        { "id": "a", "text": "To make the prospect sign more documents." },
        {
          "id": "b",
          "text": "To separate the Persuasive narrative (Proposal) from the Legal protection (Agreement), allowing you to close the business logic first and the legal logic second."
        },
        { "id": "c", "text": "Because it's required by the SEC." },
        { "id": "d", "text": "To hide the price." }
      ],
      "correctAnswer": "b",
      "explanation": "If your contract is inside your proposal, the buyer's focus shifts from 'Value' to 'Risk' immediately. By separating them, you secure the 'Emotional Yes' on the value first, then move to the 'Technical Yes' on the legal terms."
    },
    {
      "id": "p1882",
      "type": "multiple-choice",
      "text": "What is the most critical 'IP Guard' for a founder using AI in their product in 2026?",
      "options": [
        { "id": "a", "text": "Copyrighting every line of code." },
        {
          "id": "b",
          "text": "Clearly defining that the founder retains ownership of all 'Training Data Improvements' and 'Derivative Model Weights', while the client owns only their 'Resulting Output'."
        },
        { "id": "c", "text": "Naming the AI after the company." },
        { "id": "d", "text": "Hiring a lawyer for every single deal." }
      ],
      "correctAnswer": "b",
      "explanation": "If you don't explicitly own the refinements your AI makes while serving a client, you could lose the ability to use those improvements for other customers. Protecting your 'Core Intelligence' is the foundation of your long-term moat."
    }
  ]
}
```

**Siguiente Lección:** [Herramientas y Entrega de Propuestas](/sales-methodology/proposals-pricing/lesson-9)
