---
title: "Tipos de Contratos: MSA, SOW, Términos SaaS, Cartas de Compromiso"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Marco Legal para Fundadores"
lesson: 1
---

## Por Qué Los Contratos Importan Más de Lo Que Crees

La mayoría de los fundadores piensan en los contratos como papeleo — algo que se firma para cumplir con las formalidades y que nunca se vuelve a ver. Eso funciona bien hasta que no funciona.

Un cliente que desaparece después de 3 meses de trabajo. Un socio que reclama la propiedad del código que escribiste. Un cliente que llama "consulta gratuita" a una sesión de estrategia de 5 horas. Estas situaciones no son excepcionales — son estadísticamente probables si llevas suficiente tiempo en el negocio.

Los contratos no son para los buenos momentos. Son para los malos.

<InsightCard icon="📋" title="Los Cuatro Contratos Que Necesita Cada Fundador">
Hay cuatro tipos de contratos que cubren el 95% de las relaciones comerciales de los fundadores: el MSA (Acuerdo de Servicios Maestro), el SOW (Declaración de Trabajo), los Términos de SaaS, y la Carta de Compromiso. Cada uno tiene un propósito diferente. Confundirlos — o usar el tipo incorrecto para la situación equivocada — es uno de los errores contractuales más comunes que cometen los fundadores.
</InsightCard>

## Los Cuatro Tipos de Contratos

<SlideNavigation>
<Slide title="MSA: El Acuerdo de Servicios Maestro">

**¿Qué es?** El MSA es el contrato marco que establece los términos generales de tu relación con un cliente. Es el "acuerdo paraguas" que cubre todo lo que hagas con ese cliente.

**¿Qué incluye?**

- Términos de pago y consecuencias de pago tardío
- Propiedad intelectual (quién posee qué)
- Confidencialidad y NDA
- Limitación de responsabilidad
- Condiciones de terminación
- Ley aplicable y jurisdicción

**¿Cuándo lo usas?** Con cualquier cliente con quien esperas tener múltiples proyectos o una relación continua. Se firma una vez, luego cada proyecto nuevo se añade con un SOW.

**¿Por qué importa?** Negociar el MSA por adelantado significa que no tienes que renegociar los términos legales difíciles cada vez que inicias un nuevo proyecto. El trabajo legal pesado se hace una vez.

</Slide>
<Slide title="SOW: La Declaración de Trabajo">

**¿Qué es?** El SOW es el documento específico del proyecto que vive bajo el MSA. Define exactamente qué harás, cuándo y por cuánto.

**¿Qué incluye?**

- Alcance detallado de los entregables
- Plazos y cronograma
- Precios y estructura de pagos
- Criterios de aceptación (¿cómo se ve "hecho"?)
- Procedimiento de cambio de alcance

**¿Cuándo lo usas?** Para cada proyecto o compromiso nuevo con un cliente existente (si tienes un MSA) o para proyectos únicos sin una relación continua.

**¿Por qué importa?** El SOW es el documento que se convierte en la "fuente de verdad" cuando hay un desacuerdo sobre lo que se prometió. Sin un SOW detallado, "alcance de trabajo" significa lo que cada parte quiere que signifique.

</Slide>
<Slide title="Términos de SaaS: Para Productos de Software">

**¿Qué es?** Los Términos de Servicio (ToS) o Contrato de Suscripción para productos de software. Es el contrato entre tu empresa y todos tus usuarios/clientes.

**¿Qué incluye?**

- Derechos de licencia de software (lo que los clientes pueden y no pueden hacer con tu software)
- SLAs (Acuerdos de Nivel de Servicio) — uptime garantizado, tiempos de respuesta de soporte
- Política de privacidad de datos y GDPR/CCPA
- Política de reembolso y cancelación
- Limitación de responsabilidad
- Procedimientos de cambio de términos

**¿Cuándo lo usas?** Si vendes software, herramientas o cualquier producto digital con usuarios que acceden a través de un login.

</Slide>
<Slide title="Carta de Compromiso: Para Servicios Profesionales">

**¿Qué es?** Un contrato más ligero y legible diseñado para relaciones de consultoría, coaching o servicios profesionales. Es técnicamente menos formal que un MSA/SOW pero sirve el mismo propósito.

**¿Qué incluye?**

- Descripción clara de los servicios
- Honorarios y estructura de pago
- Duración del compromiso
- Términos de terminación
- Cláusulas básicas de IP y confidencialidad

**¿Cuándo lo usas?** Para compromisos de consultoría, paquetes de coaching, o cualquier trabajo de servicio profesional donde un MSA formal se sentiría excesivo para la relación.

**¿Por qué importa?** La Carta de Compromiso es lo suficientemente simple para que los clientes la lean y firmen rápidamente, pero lo suficientemente completa para protegerte en disputas comunes.

</Slide>
</SlideNavigation>

## El Árbol de Decisiones de Contratos

Antes de enviar cualquier propuesta, usa este árbol para decidir qué tipo de contrato necesitas.

<DecisionTree
title="¿Qué Contrato Necesito?"
persistKey="legal-L1-contract-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Estás vendiendo software con acceso de usuario (login)?",
choices: [
{ label: "Sí", nextNodeId: "saas" },
{ label: "No — estoy vendiendo servicios o consultoría", nextNodeId: "services" }
]
},
{
id: "saas",
content: "Necesitas Términos de Servicio + Política de Privacidad para tu plataforma. ¿También ofreces servicios profesionales o implementación además del software?",
choices: [
{ label: "Sí — software + servicios", nextNodeId: "saas-plus-services" },
{ label: "No — solo software", nextNodeId: "saas-only" }
]
},
{
id: "saas-only",
content: "Usa Términos de Servicio de SaaS + Política de Privacidad. Para clientes empresariales, también puedes necesitar un DPA (Acuerdo de Procesamiento de Datos) si manejas datos personales.",
isTerminal: true,
outcome: "positive"
},
{
id: "saas-plus-services",
content: "Usa Términos de Servicio de SaaS para el software + MSA/SOW para los servicios de implementación o consultoría.",
isTerminal: true,
outcome: "positive"
},
{
id: "services",
content: "¿Anticipes trabajar con este cliente en múltiples proyectos a lo largo del tiempo?",
choices: [
{ label: "Sí — cliente recurrente o relación continua", nextNodeId: "msa" },
{ label: "No — proyecto único", nextNodeId: "single-project" }
]
},
{
id: "msa",
content: "Usa un MSA + SOW. El MSA establece los términos de la relación una vez. Cada nuevo proyecto obtiene su propio SOW.",
isTerminal: true,
outcome: "positive"
},
{
id: "single-project",
content: "¿El proyecto es complejo (múltiples entregables, plazos largos, monto alto)?",
choices: [
{ label: "Sí — proyecto complejo", nextNodeId: "sow-standalone" },
{ label: "No — compromiso relativamente simple", nextNodeId: "engagement-letter" }
]
},
{
id: "sow-standalone",
content: "Usa un SOW independiente (que incluya los términos del MSA incorporados). Para proyectos grandes, considera un MSA completo incluso para el primer compromiso.",
isTerminal: true,
outcome: "positive"
},
{
id: "engagement-letter",
content: "Una Carta de Compromiso es suficiente — simple, rápida de firmar, te protege en las situaciones de disputa más comunes.",
isTerminal: true,
outcome: "positive"
}
]}
/>

## La Prueba del Sobre

Antes de enviar cualquier contrato a un cliente, aplica la Prueba del Sobre:

_"Si este contrato terminara en un litigio y un juez lo leyera, ¿quedaría claro sin ambigüedad qué acordó cada parte?"_

Si la respuesta es no — si hay términos vagos, plazos no especificados, o entregables ambiguos — el contrato necesita revisión antes de ser firmado.

<PredictionGate
question="Un diseñador freelance acuerda verbalmente rediseñar el sitio web de un cliente por $5,000. Trabajan durante 2 meses. El cliente rechaza el trabajo final diciendo 'esto no es lo que pedí.' No existe contrato escrito. ¿Quién gana probablemente en un litigio?",
persistKey="legal-L1-predict"
type="choice"
choices={[
{ id: "a", text: "El diseñador — hicieron el trabajo y deben ser pagados" },
{ id: "b", text: "El cliente — puede simplemente negarse a pagar si no están satisfechos" },
{ id: "c", text: "Es imposible saberlo — y ese es exactamente el problema" }
]}
correctId="c"

> Sin un contrato escrito que defina qué es "el sitio web rediseñado", ninguna de las partes puede demostrar qué se acordó. El diseñador no puede probar que entregó lo que se prometió. El cliente no puede probar que lo que recibió no cumplió con los términos. Los litigios sin contratos escritos son inciertos, costosos y agotadores — y con frecuencia se resuelven en favor de quien tenga mejores abogados. El único ganador es el abogado.
> </PredictionGate>

<FlipCard
  front="MSA vs. SOW: La diferencia clave"
  back="El MSA cubre el 'cómo trabajamos juntos' — términos de pago, propiedad intelectual, responsabilidad, terminación. El SOW cubre el 'qué hacemos juntos' — entregables específicos, plazos, precios del proyecto. Se necesitan ambos para una relación de cliente completa y protegida."
/>

<FlipCard
  front="¿Cuándo es suficiente una Carta de Compromiso?"
  back="Una Carta de Compromiso es suficiente cuando: el proyecto es relativamente simple (1-3 entregables claros), el monto es menor de $10,000, la relación es nueva pero de bajo riesgo, y el cliente es una pequeña empresa o individuo (no una corporación con su propio equipo legal). Para montos más altos o proyectos complejos, usa un MSA + SOW."
/>

<TemplateBuilder
title="Mi Inventario de Contratos Actuales"
persistKey="legal-L1-inventory"
sections={[
{
id: "current",
title: "Estado Actual de Mis Contratos",
fields: [
{ id: "has-msa", label: "¿Tengo un MSA de plantilla listo para usar?", placeholder: "p. ej., Sí — almacenado en Google Drive > Legal. / No — necesito crear uno.", type: "text" },
{ id: "has-sow", label: "¿Tengo una plantilla de SOW lista para usar?", placeholder: "p. ej., Sí — plantilla de Notion con campos variables. / No — actualmente uso acuerdos informales por email.", type: "text" },
{ id: "has-engagement", label: "¿Tengo una Carta de Compromiso para proyectos más pequeños?", placeholder: "p. ej., Uso una carta de 1 página para compromisos menores de $5K.", type: "text" },
{ id: "gap", label: "¿Cuál es tu mayor brecha contractual ahora mismo?", placeholder: "p. ej., Trabajo con varios clientes recurrentes sin MSAs firmados.", type: "textarea" }
]
}
]}
/>

<InteractiveChecklist
title="Elementos de Acción de la Lección 1"
persistKey="legal-L1-actions"
items={[
"Identifica qué tipo de contrato necesitas para tu modelo de negocio principal usando el Árbol de Decisiones",
"Audita los clientes actuales: ¿con cuántos trabajas sin un contrato escrito?",
"Decide si tu prioridad es el MSA+SOW, la Carta de Compromiso, o los Términos de SaaS",
"Aplica la Prueba del Sobre a cualquier contrato que tengas actualmente — ¿qué áreas son ambiguas?",
"En la Lección 2, aprenderás a personalizar las 4 cláusulas más importantes de cualquier contrato"
]}
/>
