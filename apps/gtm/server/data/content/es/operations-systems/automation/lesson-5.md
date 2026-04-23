---
title: "Automatización 4: Perseguidor de Contratos y Facturas"
duration: "45 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 5
---

Ya hiciste la parte difícil. Tuviste la llamada de descubrimiento, entregaste el demo, manejaste las objeciones y enviaste la propuesta. El prospecto dijo "esto se ve genial — lo firmaré esta semana."

Eso fue hace 12 días.

El contrato está en su bandeja de entrada, sin firmar. No hiciste seguimiento porque se siente incómodo perseguir a alguien que ya dijo que sí. Así que esperas. Y esperas.

Cada día que el contrato está sin firmar es un día en que tu flujo de caja se retrasa, tu confianza se erosiona y una prioridad competidora podría apoderarse de su decisión.

El Perseguidor de Contratos elimina la incomodidad. Un sistema hace el seguimiento — no tú personalmente — y tú actúas según las indicaciones del sistema cuando es necesario.

---

## La Fuga de Ingresos en la Etapa de Cierre

La mayoría del pensamiento de automatización de los fundadores se centra en la parte superior del embudo: capturar leads, registrar reuniones, perseguir prospectos fríos. Pero las mayores fugas de ingresos a menudo ocurren en la parte inferior.

<InsightCard icon="💸" title="La Realidad de la Etapa de Cierre">
Tiempo promedio de firma de contrato B2B para negocios SMB: 5-14 días. Más allá de 14 días, el negocio está en riesgo significativo — prioridades competidoras, reasignación de presupuesto o pérdida de impulso. El 63% de las propuestas se firman dentro de 3 días si se hace seguimiento de inmediato. Sin seguimiento, esa cifra cae bruscamente.

En el lado de facturas: el 30-40% de las facturas B2B se pagan tarde. Los recordatorios automáticos de pago reducen los pagos tardíos en un 30%.
</InsightCard>

<ExampleCard label="Caso de Estudio: Los $18K Que Casi No Se Cierran">
Marco envió una propuesta de $6.000/mes a un prospecto que se había comprometido verbalmente. No hizo seguimiento porque "dijeron que la firmarían." Después de 18 días de silencio, finalmente envió un email de verificación.

La respuesta: "Ah, quería hacer seguimiento — nuestro equipo legal quería una aclaración. ¿Puedes agregar [cláusula simple] al contrato?"

Era una corrección de 10 minutos. El contrato se firmó al día siguiente.

**Un negocio de $6.000/mes, casi perdido por un contrato sin firmar y dos semanas de silencio incómodo.**

Si su Perseguidor de Contratos hubiera estado funcionando, habría sabido sobre la pregunta legal en el Día 3.
</ExampleCard>

---

## El Patrón del Perseguidor de Contratos

El Perseguidor de Contratos refleja el Recordatorio de Seguimiento Día 3/7/14 de la Lección 4 — pero apunta a la etapa "Propuesta Enviada" en lugar de la etapa "Contactado".

<ProgressiveReveal title="El Flujo del Perseguidor de Contratos" persistKey="automation-L5-flow">

<RevealSection title="Disparador: Etapa de Propuesta Enviada">

La cadena comienza cuando tu negocio en el CRM se mueve a la etapa "Propuesta" (o "Propuesta Enviada").

**Disparadores alternativos:**

- La herramienta de firma electrónica envía un webhook de "Documento Enviado" (DocuSign, SignWell, PandaDoc admiten esto)
- Mueves manualmente un negocio en el CRM a la etapa "Propuesta"

**El disparador más limpio:** Tu herramienta de firma electrónica (DocuSign/PandaDoc/SignWell) envía un webhook cuando se envía un documento para firmar. Esto es más específico que un cambio de etapa en el CRM y te da la URL del documento para incluir en tus notificaciones.

</RevealSection>

<RevealSection title="Día 3: Recordatorio Interno para Ti">

Tres días después de enviar la propuesta sin firma, necesitas un empujón.

**Acción:** Crea una tarea en el CRM O envíate un mensaje de Slack:

> 📋 Verificación de Contrato: [Nombre del Negocio] — $[Monto]
> Enviado: [Fecha] | 3 días sin firmar
> Enlace directo: [Enlace al documento] | CRM: [Enlace al negocio]
> Acción sugerida: Enviar un breve email "¿Alguna pregunta?"

**¿Por qué solo interno en el Día 3?** Tres días es normal. Este es solo tu aviso de conciencia interno. Tú decides si tomar acción o esperar.

</RevealSection>

<RevealSection title="Día 7: Empuje al Prospecto (Tarea o Envío Automático)">

Siete días sin firmar se está acercando a un territorio preocupante. Es momento de contactar al prospecto.

**Opción de tarea (recomendada):** Crea una tarea en el CRM — "Seguimiento de contrato: [Nombre] — Día 7". Tú escribes y envías un mensaje personalizado.

**Opción de envío automático (herramienta de firma electrónica):** PandaDoc y SignWell tienen funciones de recordatorio integradas que envían automáticamente un email de "recordatorio para firmar" desde la plataforma. Actívalas si están disponibles — son más limpias que enviar tu propio email.

**Plantilla si envías manualmente:**

> Asunto: Verificación rápida sobre la propuesta de [Empresa]
>
> Hola [Nombre], solo volviendo a la propuesta que envié el [fecha]. Con gusto hago una llamada rápida si hay preguntas o si el lenguaje del contrato necesita algún ajuste.
>
> Aquí está el enlace para firmar: [enlace]

</RevealSection>

<RevealSection title="Día 14: Escalación">

Catorce días sin firmar sin explicación es una señal seria. Algo está bloqueando la firma.

**Acción:** Crea una tarea de alta prioridad para el fundador:

> 🚨 Escalación de Contrato: [Nombre del Negocio] — 14 días sin firmar
> Monto: $[Valor] | Cliente: [Empresa]
> Acción requerida: Llamar para identificar bloqueadores o cerrar el negocio como Perdido — Detenido
> Enfoque sugerido: "Quiero asegurarme de abordar cualquier preocupación antes de que venza la propuesta. ¿Hay algo específico que esté deteniendo las cosas?"

**Decisión clave:** Después de 14 días, necesitas identificar el bloqueador y avanzar, o cerrar el negocio como Perdido y dejar de perseguirlo. Un negocio que permanece en la etapa "Propuesta Enviada" por más de 21 días no es un activo del pipeline — es una falsa esperanza que infla tu pronóstico.

</RevealSection>

<RevealSection title="Condiciones de Detención">

La cadena se detiene cuando ocurre cualquiera de estas:

1. **Documento firmado** — La herramienta de firma electrónica envía un webhook de "Completado" → detener cadena, activar automatización de onboarding
2. **Negocio cerrado ganado** — La etapa del CRM avanza a "Cerrado Ganado"
3. **Negocio cerrado perdido** — La etapa del CRM se mueve a "Cerrado Perdido" o "Perdido — Detenido"
4. **Pausa manual** — Estableces una bandera de "Persecución de Contrato Pausada" (p. ej., el prospecto dijo "firmo el próximo lunes")

</RevealSection>

</ProgressiveReveal>

---

## Constrúyelo: Herramienta de Firma Electrónica → Zapier/Make → Slack

<SlideNavigation>
<Slide title="Paso 1: Disparador en Propuesta Enviada">

**Si usas PandaDoc:**

1. En Zapier: Disparador = "PandaDoc — Estado del Documento Cambiado"
2. Estado: "Enviado para Firma"
3. Datos disponibles: nombre del destinatario, email, nombre del documento, URL del documento, fecha de vencimiento

**Si usas SignWell:**

1. En Zapier: Disparador = "SignWell — Nueva Solicitud de Documento Completada" (elige estado "Documento Enviado")
2. Misma estructura de datos que PandaDoc

**Si usas DocuSign:**

1. En Zapier: Disparador = "DocuSign — Estado del Sobre Cambiado"
2. Filtro de estado: "Enviado"

**Si no tienes herramienta de firma electrónica (contratos manuales):**

1. Disparador = Etapa del negocio HubSpot/Pipedrive cambiada a "Propuesta Enviada"
2. Esto es menos preciso pero funcional

</Slide>

<Slide title="Paso 2: Registrar en CRM e Iniciar Temporizador">

Después de que se activa el disparador:

1. **Encontrar el negocio en el CRM:** Buscar por email de contacto (del campo de destinatario de la firma electrónica)
2. **Registrar actividad en CRM:** Crear actividad — tipo "Propuesta Enviada", fecha: hoy, notas: incluir enlace del documento
3. **Establecer un campo en el negocio:** "Fecha de Envío de Propuesta" = hoy (lo usarás para reportes)
4. **Iniciar el perseguidor:** Programar tareas de seguimiento del Día 3, Día 7 y Día 14 (usando el mismo patrón de retraso de la Lección 4)

</Slide>

<Slide title="Paso 3: Alerta Interna de Slack en el Día 3">

Tres días después del disparador de "Propuesta Enviada":

1. Agrega el paso de Retraso: 3 días
2. Verifica la condición de detención: ¿El negocio todavía está en la etapa "Propuesta Enviada"? Si la etapa cambió → detener
3. Envía mensaje de Slack a ti mismo:
   > 📋 Contrato pendiente: [Nombre del Contacto] en [Empresa] | $[Monto del Negocio]
   > Propuesta enviada hace 3 días — todavía sin firmar
   > Documento: [enlace de firma] | CRM: [enlace al negocio]
4. Crea tarea en CRM: "Verificación de contrato — Día 3" con vencimiento hoy

</Slide>

<Slide title="Paso 4: Tarea de Contacto al Prospecto en el Día 7">

Siete días después de enviada la propuesta:

1. Agrega segundo Retraso: 4 días más (total 7)
2. Verifica la condición de detención: ¿El negocio todavía está en la etapa "Propuesta Enviada"?
3. Crea tarea en CRM: "Seguimiento de contrato Día 7 — [Nombre]" con vencimiento hoy
4. Incluir en las notas de la tarea: URL del contrato, fecha de propuesta original, monto del negocio
5. Slack opcional: "Tarea de seguimiento de contrato de 7 días creada para [Nombre] — toma acción hoy"

</Slide>

<Slide title="Paso 5: Escalación en el Día 14">

Catorce días después de enviada la propuesta:

1. Agrega Retraso final: 7 días más (total 14)
2. Verifica la condición de detención: ¿El negocio todavía está en la etapa "Propuesta Enviada"?
3. Crea tarea de alta prioridad en CRM: "🚨 Escalación de contrato — 14 días sin firmar: [Nombre]"
4. Notas de la tarea: "Identifica el bloqueador hoy o mueve a Perdido — Detenido. No dejes que esto espere más."
5. Slack: "El contrato para [Nombre] ($[Monto]) lleva 14 días sin firmar. Se requiere acción inmediata."

</Slide>
</SlideNavigation>

---

## El Perseguidor de Facturas: Mismo Patrón, Contexto Diferente

Si emites facturas (servicios, consultoría, proyectos únicos), el mismo patrón aplica a las facturas sin pagar.

<FlipCard
  front="Perseguidor de Contratos vs Perseguidor de Facturas: ¿Qué es diferente?"
  back="El Perseguidor de Contratos apunta a propuestas sin firmar (pre-ingresos). El Perseguidor de Facturas apunta a facturas sin pagar (post-entrega, dinero adeudado). El tono emocional cambia: perseguir contratos es mantener los negocios avanzando; perseguir facturas es cobrar lo que ya ganaste. Ambos usan el patrón Día 3/7/14."
/>

<FlipCard
  front="Disparador del Perseguidor de Facturas: ¿Cuándo empieza?"
  back="Cuando se envía una factura y no se recibe el pago. Activar desde tu herramienta de facturación (QuickBooks, FreshBooks, Stripe, Wave, Invoice Ninja) cuando el estado de la factura = 'Enviada' o 'Vencida.' Día 3: recordatorio interno. Día 7: email automático de recordatorio de pago (la mayoría de las herramientas de facturación lo hacen de forma nativa). Día 14: tarea de llamada de seguimiento personal. Día 30: pausar servicio o escalar a cobros."
/>

**Plantilla de factura (envío automático Día 7, a través de herramienta de facturación):**

> Asunto: Factura #[número] — Recordatorio amistoso
>
> Hola [Nombre], solo un recordatorio rápido de que la factura #[número] por $[monto] venció el [fecha]. Puedes pagar via: [enlace de pago].
>
> Si hay algún problema con la factura o una pregunta, solo responde aquí.

**Plantilla de escalación del Día 14 (personal, a través de ti):**

> Hola [Nombre], estoy haciendo seguimiento de la factura #[número] — ahora 14 días vencida. ¿Hay algún problema que pueda ayudar a resolver? Quiero asegurarme de que estemos al día antes de [próxima entrega/reunión].

---

## Conectando con Tu Herramienta de Firma Electrónica

Si aún no usas una herramienta de firma electrónica, aquí hay una comparación rápida:

<ClassifyExercise
title="Herramienta de Firma Electrónica: Mejor Caso de Uso"
persistKey="automation-L5-esig-classify"
categories={[
{ id: "pandadoc", label: "PandaDoc", color: "#3b82f6" },
{ id: "signwell", label: "SignWell", color: "#10b981" },
{ id: "docusign", label: "DocuSign", color: "#f59e0b" },
{ id: "manual", label: "PDF Manual (sin herramienta)", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Necesitas plantillas de propuestas integradas con tablas de precios y formato enriquecido", correctCategory: "pandadoc" },
{ id: "2", content: "Necesitas la herramienta de firma electrónica de menor costo con integración Zapier ($8/mes)", correctCategory: "signwell" },
{ id: "3", content: "Tus clientes empresariales requieren DocuSign específicamente para cumplimiento legal", correctCategory: "docusign" },
{ id: "4", content: "Firmas menos de 2 contratos por mes y el costo es la principal preocupación", correctCategory: "manual" },
{ id: "5", content: "Quieres cobro de pago integrado después de la firma (pago con un clic al firmar)", correctCategory: "pandadoc" },
{ id: "6", content: "Necesitas una herramienta de firma simple y confiable con un nivel gratuito generoso (3 documentos/mes)", correctCategory: "signwell" }
]}
/>

---

## El Disparador de Onboarding: Qué Sucede Cuando Firman

El Perseguidor de Contratos es un mecanismo para manejar retrasos. Pero cuando llega una firma, también necesitas un disparador de onboarding.

<InsightCard icon="🎉" title="El Momento del Negocio Ganado">
Cuando la herramienta de firma electrónica envía un webhook de "Documento Completado", puedes activar:
1. Un mensaje de celebración de Slack para ti mismo (refuerzo de dopamina — importa)
2. Una actualización de etapa del CRM a "Cerrado Ganado"
3. Una nueva lista de tareas de onboarding del cliente en tu CRM o herramienta de gestión de proyectos
4. Un email de bienvenida automatizado al nuevo cliente

Esto es separado del Perseguidor de Contratos — es el camino feliz. Constrúyelo junto al perseguidor para que el evento de completación se maneje tan bien como los eventos de retraso.
</InsightCard>

<TemplateBuilder
title="Mi Configuración del Perseguidor de Contratos"
persistKey="automation-L5-config"
sections={[
{
id: "tools",
title: "Herramientas en Mi Stack",
fields: [
{
id: "esig_tool",
label: "Herramienta de firma electrónica (o 'Contratos manuales')",
placeholder: "p. ej., PandaDoc, SignWell, DocuSign o PDF Manual",
type: "text"
},
{
id: "invoice_tool",
label: "Herramienta de facturación (si aplica)",
placeholder: "p. ej., QuickBooks, FreshBooks, Stripe, Wave o N/A",
type: "text"
},
{
id: "automation_platform",
label: "Plataforma de automatización que conecta todo",
placeholder: "p. ej., Zapier Starter, Make Core",
type: "text"
}
]
},
{
id: "timing",
title: "Configuración de Temporización del Perseguidor",
fields: [
{
id: "day3",
label: "Acción del Día 3",
placeholder: "p. ej., Solo alerta interna de Slack (no contactar al prospecto todavía)",
type: "text"
},
{
id: "day7",
label: "Acción del Día 7",
placeholder: "p. ej., Crear tarea en CRM para enviar email de seguimiento personalizado",
type: "text"
},
{
id: "day14",
label: "Acción del Día 14",
placeholder: "p. ej., Tarea de alta prioridad en CRM: llamar para identificar bloqueador o marcar como Perdido",
type: "text"
}
]
},
{
id: "stop_conditions",
title: "Condiciones de Detención Configuradas",
fields: [
{
id: "conditions",
label: "Lista las condiciones de detención que has implementado",
placeholder: "p. ej., Documento firmado (webhook de PandaDoc), Etapa del negocio = Cerrado Ganado, Etapa del negocio = Cerrado Perdido, Campo 'Pausa' manual en CRM",
type: "textarea"
}
]
},
{
id: "onboarding",
title: "Disparador de Negocio Ganado",
fields: [
{
id: "won_actions",
label: "¿Qué sucede automáticamente cuando se firma el contrato?",
placeholder: "p. ej., Celebración de Slack → Actualización del CRM a Cerrado Ganado → Crear lista de tareas de onboarding → Enviar plantilla de email de bienvenida",
type: "textarea"
}
]
}
]}
/>

---

## Probando el Perseguidor de Contratos

<InteractiveChecklist
title="Protocolo de Prueba del Perseguidor de Contratos"
persistKey="automation-L5-test-checklist"
items={[
"Envía un documento de prueba a ti mismo a través de tu herramienta de firma electrónica — verifica que el disparador se activa en Zapier/Make",
"Verifica que la actividad del CRM se creó con el tipo 'Propuesta Enviada' y la asociación correcta al negocio",
"Verifica que el campo 'Fecha de Envío de Propuesta' está establecido en el negocio",
"Espera el retraso del Día 3 (o activa manualmente en modo de prueba) — verifica que se recibe la alerta de Slack",
"Simula la firma del documento — verifica que la cadena se detiene y las acciones de 'Negocio Ganado' se activan",
"Simula mover el negocio a 'Cerrado Perdido' — verifica que la cadena se detiene",
"Para el perseguidor de facturas: envía una factura de prueba y verifica que el recordatorio del Día 7 se envía correctamente",
"Verifica que la conexión de webhook de Zapier/Make de tu plantilla de contrato está activa y autorizada"
]}
/>

---

## Tus Elementos de Acción

<InteractiveChecklist
title="Elementos de Acción de la Lección 5"
persistKey="automation-L5-actions"
items={[
"Si no usas una herramienta de firma electrónica, elige una: SignWell (nivel gratuito, $8/mes pago) o PandaDoc (nivel gratuito)",
"Construye el Perseguidor de Contratos: firma electrónica 'Documento Enviado' → registro en CRM → cadena de tareas Día 3/7/14",
"Agrega todas las condiciones de detención: documento firmado, negocio cerrado ganado, negocio cerrado perdido, pausa manual",
"Construye el disparador de Negocio Ganado: firma → celebración de Slack → actualización del CRM → tareas de onboarding",
"Si emites facturas: configura el Perseguidor de Facturas (patrón Día 3/7/14 para facturas sin pagar)",
"Ejecuta el protocolo de prueba de 8 pasos de arriba",
"Audita tu pipeline actual: ¿cuántas propuestas han estado sin firmar por más de 7 días?"
]}
/>

---

## Qué Sigue

En la **Lección 6**, aprenderás Notificaciones de Negocios — las alertas de Slack/email que te mantienen informado sobre eventos clave del pipeline sin vivir dentro de tu CRM.

En la **Lección 7**, construirás la automatización técnicamente más interesante: conectar la detección de respuestas a actualizaciones del CRM y tareas. Cuando un prospecto responde a tu contacto, la automatización debería actualizar su etapa en el CRM, pausar cualquier secuencia activa y crear una tarea de respuesta — todo sin que toques un botón.

---

## Quiz: Perseguidor de Contratos y Facturas

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuánto tiempo tarda en promedio firmar un contrato B2B SMB?",
      "options": ["1-3 días", "5-14 días", "30-60 días", "90+ días"],
      "correctAnswer": 1,
      "explanation": "El tiempo promedio de firma de contrato B2B SMB es de 5-14 días. Más allá de 14 días, el negocio está en riesgo significativo de detenerse o perder impulso ante prioridades competidoras."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Qué debe ser la acción del Perseguidor de Contratos en el Día 3?",
      "options": [
        "Enviar automáticamente un email de seguimiento al prospecto",
        "Recordatorio interno solo para ti — no contactes al prospecto todavía",
        "Llamar al prospecto directamente",
        "Cancelar la propuesta y reenviarla"
      ],
      "correctAnswer": 1,
      "explanation": "El Día 3 es normal. Solo un recordatorio interno — tú decides si se necesita acción. Enviar automáticamente un seguimiento en el Día 3 es prematuro y puede sentirse insistente."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "Un negocio que ha estado en la etapa 'Propuesta Enviada' por 21 días es un activo sólido del pipeline.",
      "correctAnswer": false,
      "explanation": "Falso. Un negocio sin firmar por más de 21 días no es un activo confiable del pipeline — infla tu pronóstico con negocios que probablemente están detenidos o muertos. La escalación del Día 14 del Perseguidor de Contratos debe activar una decisión: identificar el bloqueador o cerrar como Perdido."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Qué automatización adicional debes activar cuando se firma un contrato?",
      "options": [
        "Nada — el perseguidor se detiene automáticamente",
        "Otra secuencia de seguimiento",
        "Un disparador de Negocio Ganado: actualización de CRM + notificación de celebración + tareas de onboarding",
        "Una nueva propuesta para un negocio más grande"
      ],
      "correctAnswer": 2,
      "explanation": "Cuando se firma el contrato, activa: celebración de Slack, actualización de etapa del CRM a Cerrado Ganado y una nueva lista de tareas de onboarding para el cliente. La automatización del 'camino feliz' maneja la completación igual que el Perseguidor de Contratos maneja los retrasos."
    }
  ]
}
```
