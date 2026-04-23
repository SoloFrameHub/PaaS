---
title: "Configuración Universal de Etapas del Pipeline"
duration: "50 min"
track: "Operaciones y Sistemas"
course: "Curso 40: Configuración Avanzada de CRM"
lesson: 4
---

## El Pipeline de $47K que Vivía en la Cabeza de Alguien

Conoce a Jordan, un fundador técnico que llevaba 8 meses vendiendo su herramienta de desarrollo. Cuando le pedí ver su pipeline, abrió una hoja de cálculo con 73 filas y columnas etiquetadas como "Estado", "Vibras" y "¿Quizás Pronto?".

"¿Cuántos tratos están realmente cerca de cerrarse?", pregunté.

Se desplazó durante 30 segundos. "Eh... ¿cinco? ¿Quizás ocho si cuentas los que se callaron pero podrían volver?"

Su CRM tenía una función de pipeline. Nunca la había configurado. "Sé dónde está todo", dijo tocándose la frente.

Dos semanas después, el "trato caliente" de Jordan — el que había marcado mentalmente como 80% probable de cerrar — desapareció. Resulta que el defensor interno había dejado la empresa un mes antes. Jordan nunca lo registró porque "iba a hacer seguimiento pronto".

**El costo de ese pipeline invisible: $47K ARR y 6 meses de esfuerzo de cultivo desperdiciado.**

Después de reconstruir su pipeline con etapas claras y criterios de salida, Jordan cerró 3 tratos en los siguientes 45 días. No porque su producto mejorara. Porque finalmente podía **ver** qué necesitaba pasar a continuación.

Tu pipeline no es un boletín de calificaciones. Es un **motor de decisiones**. Cada etapa debe responder una pregunta: _¿Qué necesita este prospecto de mí ahora mismo?_

Construyamos el tuyo.

---

## Por Qué el Pipeline de 6 Etapas Funciona Universalmente

La mayoría de los fundadores complican demasiado los pipelines (12 etapas con nombres como "Calificación - Ajuste Técnico Confirmado") o los construyen de manera insuficiente (solo "Hablando" y "Cerrado").

El pipeline de 6 etapas alcanza el punto óptimo: **lo suficientemente específico para impulsar la acción, lo suficientemente simple para mantener en solitario.**

<FlipCard
  front="¿Por qué exactamente 6 etapas?"
  back="Con menos de 6 pierdes visibilidad de dónde se estancan los tratos. Con más de 6 pasas más tiempo moviendo tarjetas que cerrando tratos. Seis etapas se corresponden con el ritmo natural de la compra B2B: reconocimiento → interés → evaluación → decisión → cierre."
/>

Aquí está la estructura universal:

**Etapa 1: Lead** — Nuevo contacto, ajuste ICP confirmado, sin alcance aún
**Etapa 2: Contactado** — Primer mensaje enviado (correo, DM, llamada), esperando respuesta
**Etapa 3: Comprometido** — El prospecto respondió, mostró interés o hizo clic
**Etapa 4: Reunión** — Llamada de descubrimiento o demo programada/completada
**Etapa 5: Propuesta** — Precios, términos o documento de oferta enviado
**Etapa 6: Ganado/Perdido** — Trato cerrado con razón registrada

<InsightCard icon="🎯" title="La Prueba de Transición de Etapa">
Si no puedes señalar un evento observable específico que movió un trato de una etapa a la siguiente, tus etapas son demasiado vagas. "Parece interesado" no es un evento. "Respondió pidiendo precios" sí lo es.
</InsightCard>

Mapeemos tu proceso de ventas real a estas etapas.

<TemplateBuilder
title="Mapea Tu Proceso de Ventas a las Etapas"
persistKey="crm-setup-L4-process-map"
sections={[
{
id: "lead-to-contacted",
title: "Transición Lead → Contactado",
fields: [
{
id: "first-touch",
label: "¿Cuál es tu primer alcance típico?",
placeholder: "ej., Correo en frío, DM en LinkedIn, presentación de referencia",
type: "text"
},
{
id: "contacted-trigger",
label: "¿Qué evento mueve un lead a 'Contactado'?",
placeholder: "ej., Correo enviado, solicitud de conexión aceptada",
type: "text"
}
]
},
{
id: "contacted-to-engaged",
title: "Transición Contactado → Comprometido",
fields: [
{
id: "engagement-signal",
label: "¿Qué cuenta como 'comprometido' para ti?",
placeholder: "ej., Respondió al correo, hizo clic en el enlace del calendario, hizo una pregunta",
type: "textarea"
}
]
},
{
id: "engaged-to-meeting",
title: "Transición Comprometido → Reunión",
fields: [
{
id: "meeting-type",
label: "¿Cuál es el formato de tu primera reunión?",
placeholder: "ej., Descubrimiento de 15 min, demo de 30 min, Loom asíncrono",
type: "text"
}
]
}
]}
/>

---

## Definiciones de Etapas con Criterios de Salida

Aquí es donde la mayoría de los pipelines fallan: **nombres de etapas vagos sin reglas de salida.**

"Calificado" significa cosas diferentes para diferentes personas. "Propuesta Enviada" podría significar que enviaste precios o un SOW completo. Sin criterios de salida, tu pipeline se convierte en un juego de adivinanzas.

<SlideNavigation>
<Slide title="Etapa 1: Lead">

### Definición

Un contacto que coincide con tu ICP pero aún no ha sido contactado.

### Criterios de Entrada

- Agregado al CRM (manual o automatizado)
- Ajuste ICP confirmado (rol, tamaño de empresa, industria coinciden)
- Información de contacto verificada (correo válido, perfil de LinkedIn encontrado)

### Criterios de Salida

**Mover a Contactado cuando:** Se envía el primer alcance (correo, DM, llamada registrada)

### Tiempo Típico en la Etapa

0-7 días (si es más largo, tu proceso de investigación es demasiado lento)

### Activadores de Automatización

- Auto-enriquecer datos de contacto (Apollo, Attio)
- Auto-asignar al propietario
- Auto-crear tarea "Primer Alcance" con vencimiento en 48 horas

<ExampleCard label="Ejemplo Real: Etapa Lead">
**Contacto:** Sarah Chen, VP de Marketing en empresa SaaS de 50 personas
**Cómo entró:** Extraído del filtro de LinkedIn Sales Navigator
**Ajuste ICP:** ✅ El rol coincide, el tamaño de la empresa coincide, usa el stack tecnológico con el que nos integramos
**Evento de salida:** Correo en frío enviado vía secuencia de Instantly el martes a las 9am
</ExampleCard>

</Slide>

<Slide title="Etapa 2: Contactado">

### Definición

Primer alcance enviado, esperando respuesta.

### Criterios de Entrada

- Correo enviado, DM enviado o llamada registrada
- Alcance registrado en CRM con marca de tiempo

### Criterios de Salida

**Mover a Comprometido cuando:** El prospecto responde, hace clic en un enlace o reserva una reunión
**Mover a Perdido cuando:** Se enviaron 3 seguimientos en 14 días sin respuesta

### Tiempo Típico en la Etapa

3-7 días (B2B), 1-3 días (referencias cálidas)

### Activadores de Automatización

- Auto-programar seguimiento #1 el Día 3
- Auto-programar seguimiento #2 el Día 7
- Auto-marcar como "Sin Respuesta" el Día 14

<InsightCard icon="⚠️" title="La Trampa del Seguimiento">
No dejes que los tratos se pudran en "Contactado" durante más de 30 días. Si no han respondido después de 3 contactos en 2 semanas, muévelos a Perdido con razón "Sin Respuesta". Siempre puedes reactivarlos más tarde con un nuevo evento desencadenante.
</InsightCard>

</Slide>

<Slide title="Etapa 3: Comprometido">

### Definición

El prospecto mostró interés — respondió, hizo clic o hizo una pregunta.

### Criterios de Entrada

- Respondió al alcance (aunque sea solo "ahora no")
- Hizo clic en el enlace del calendario o en la página de precios
- Interactuó con el contenido (descargó recurso, vio video de demo)

### Criterios de Salida

**Mover a Reunión cuando:** Llamada/demo programada o completada
**Mover a Perdido cuando:** "No me interesa" explícito o 21 días sin actividad después del compromiso

### Tiempo Típico en la Etapa

3-10 días

### Activadores de Automatización

- Auto-crear tarea "Reservar reunión" (vence en 3 días)
- Auto-enviar enlace del programador de reuniones si aún no se ha enviado
- Auto-marcar si no se reserva reunión en 10 días

<ExampleCard label="Ejemplo Real: Etapa Comprometido">
**Contacto:** Sarah Chen respondió: "Qué oportuno — en realidad estamos evaluando herramientas ahora mismo. ¿Puedes enviarme los precios?"
**Acción tomada:** Envié el documento de precios + enlace de Calendly
**Evento de salida:** Reservó una demo de 30 min para el jueves a las 2pm
**Tiempo en la etapa:** 4 días
</ExampleCard>

</Slide>

<Slide title="Etapa 4: Reunión">

### Definición

Llamada de descubrimiento, demo o reunión de evaluación programada o completada.

### Criterios de Entrada

- Reunión en el calendario (programada)
- O reunión completada y registrada

### Criterios de Salida

**Mover a Propuesta cuando:** Se envían precios/términos después de la reunión
**Mover a Comprometido cuando:** Se necesita programar una reunión de seguimiento
**Mover a Perdido cuando:** Rechazo explícito o 30 días de no-show/reprogramación

### Tiempo Típico en la Etapa

7-14 días (incluye reunión + seguimiento)

### Activadores de Automatización

- Auto-crear tarea "Enviar propuesta" después de que la reunión se marque como completada
- Auto-enviar plantilla de correo de seguimiento post-reunión
- Auto-marcar si la propuesta no se envía en 7 días después de la reunión

<InsightCard icon="🎯" title="El Ritual de Finalización de Reunión">
Inmediatamente después de cada reunión, registra: (1) Siguiente paso acordado, (2) Calendario de decisión, (3) Defensor identificado (S/N), (4) Objeciones planteadas. Esto se convierte en la cadena de razonamiento de tu agente de IA en el Curso 27.
</InsightCard>

</Slide>

<Slide title="Etapa 5: Propuesta">

### Definición

Precios, términos u oferta formal enviada.

### Criterios de Entrada

- Documento de precios, propuesta o contrato enviado
- Registrado en CRM con fecha de envío

### Criterios de Salida

**Mover a Ganado cuando:** Contrato firmado, pago recibido o "sí" verbal + incorporación iniciada
**Mover a Perdido cuando:** Rechazo explícito o 30 días sin respuesta a la propuesta

### Tiempo Típico en la Etapa

7-21 días (varía según el tamaño del trato)

### Activadores de Automatización

- Auto-programar llamada de seguimiento 3 días después de enviar la propuesta
- Auto-marcar si no hay respuesta en 14 días
- Auto-crear tarea "Negociación" si el prospecto solicita cambios

<ExampleCard label="Ejemplo Real: Etapa Propuesta">
**Contacto:** Sarah Chen
**Propuesta enviada:** Precios personalizados para plan anual de 50 usuarios ($18K)
**Seguimiento:** Llamé 4 días después — está revisando con el CFO
**Evento de salida:** Contrato firmado el Día 12
**Tiempo en la etapa:** 12 días
</ExampleCard>

</Slide>

<Slide title="Etapa 6: Ganado/Perdido">

### Definición

Trato cerrado — ya sea cliente o muerto.

### Criterios de Entrada (Ganado)

- Contrato firmado, pago recibido o incorporación iniciada
- Trato marcado "Cerrado Ganado" con fecha de cierre

### Criterios de Entrada (Perdido)

- Rechazo explícito
- Eligió a un competidor
- Sin respuesta después de múltiples seguimientos
- Presupuesto/momento no alineados

### Criterios de Salida

Ninguno — etapa terminal

### Campos Requeridos

- **Fecha de Cierre:** Cuándo se cerró el trato
- **Razón de Cierre (Ganado):** Por qué compraron (para análisis de patrones)
- **Razón de Pérdida (Perdido):** Por qué no compraron (para manejo de objeciones)
- **Competidor (Perdido):** A quién eligieron en cambio (si aplica)

### Activadores de Automatización (Ganado)

- Auto-crear tareas de incorporación
- Auto-enviar correo de bienvenida
- Auto-notificar al equipo en Slack

### Activadores de Automatización (Perdido)

- Auto-etiquetar para reactivación en 90 días
- Auto-agregar al informe "Tratos Perdidos" para revisión mensual

<InsightCard icon="📊" title="Por Qué Importan las Razones de Pérdida">
Tus tratos perdidos son una mina de oro. Si el 60% de las pérdidas son "eligió al competidor X", tienes un problema de posicionamiento. Si el 40% son "presupuesto", tienes un problema de calificación. Rastrea las razones de pérdida religiosamente.
</InsightCard>

</Slide>
</SlideNavigation>

Ahora pongamos a prueba tu comprensión de cuándo mover tratos entre etapas.

<ClassifyExercise
title="Clasifica Estas Transiciones de Etapa"
persistKey="crm-setup-L4-classify"
categories={[
{ id: "correct", label: "Transición Correcta", color: "#10b981" },
{ id: "too-early", label: "Demasiado Pronto", color: "#f59e0b" },
{ id: "too-late", label: "Demasiado Tarde", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "El prospecto respondió 'Gracias, lo revisaré' → Mover a Comprometido",
correctCategory: "correct",
explanation: "Cualquier respuesta = compromiso, aunque sea tibia"
},
{
id: "2",
content: "Correo en frío enviado → Mover a Propuesta",
correctCategory: "too-early",
explanation: "Saltaste las etapas de Contactado, Comprometido y Reunión"
},
{
id: "3",
content: "Excelente llamada de demo, les encantó → Mantener en etapa Reunión por 2 semanas",
correctCategory: "too-late",
explanation: "Debería moverse a Propuesta inmediatamente después de la reunión si el siguiente paso son los precios"
},
{
id: "4",
content: "El prospecto no se presentó a la reunión dos veces → Mover a Perdido",
correctCategory: "correct",
explanation: "Dos no-shows = no es una oportunidad real"
},
{
id: "5",
content: "Propuesta enviada, pidieron descuento → Mantener en etapa Propuesta",
correctCategory: "correct",
explanation: "La negociación ocurre en la etapa Propuesta hasta que se firme"
},
{
id: "6",
content: "El prospecto dijo 'quizás el próximo trimestre' → Mantener en Comprometido por 90 días",
correctCategory: "too-late",
explanation: "Mover a Perdido con razón 'Momento' y reactivar en T+1"
}
]}
/>

---

## Variantes del Pipeline: B2B vs Creador

El pipeline de 6 etapas funciona para la mayoría de las ventas B2B. Pero si eres coach, consultor o creador que vende programas de alto valor, necesitas una variante.

<ComparisonBuilder
title="Diseña Tu Variante de Pipeline"
persistKey="crm-setup-L4-variant"
prompt="Describe tu proceso de ventas desde el primer contacto hasta el pago"
expertExample="**Pipeline de Creador:** Seguidor → Suscriptor → Solicitud Enviada → Llamada Reservada → Llamada Completada → Inscrito/Perdido. La Etapa 3 (Solicitud) actúa como calificador — solo los prospectos serios reciben una llamada."
criteria={[
"Las etapas se corresponden con eventos observables",
"Incluye una puerta de calificación antes de las etapas de alto contacto",
"La etapa terminal captura la razón de ganancia/pérdida"
]}
/>

Aquí están las dos variantes más comunes:

### Pipeline de Volumen B2B (para fundadores con mucho outbound)

**Lead → Contactado → Respondió → Calificado → Reunión → Propuesta → Ganado/Perdido**

La etapa "Calificado" se sitúa entre "Respondió" y "Reunión" — haces 2-3 preguntas de calificación por correo antes de reservar una llamada. Te ahorra perder tiempo con curiosos.

### Pipeline de Creador/Coach (para embudos de solicitud)

**Seguidor → Suscriptor → Solicitante → Llamada Reservada → Llamada Completada → Inscrito/Perdido**

La etapa "Solicitante" es tu filtro. Solo las personas que completan tu formulario de solicitud (con preguntas sobre presupuesto/compromiso) reciben una llamada. Conversión típica: 40-60% de solicitantes reservan, 20-40% de llamadas se inscriben.

<InsightCard icon="🎯" title="La Trampa del Pipeline Múltiple">
Los fundadores en solitario preguntan: "¿Debería tener pipelines separados para inbound vs outbound?" Respuesta: **No.** Usa un solo pipeline con un campo "Fuente del Lead" (Inbound, Outbound, Referencia). Múltiples pipelines = informes fragmentados y el doble de mantenimiento.
</InsightCard>

---

## Activadores de Automatización por Etapa

Aquí es donde tu CRM se convierte en un **sistema de acción** en lugar de una base de datos pasiva.

Cada etapa debe activar al menos una automatización. Estas automatizaciones hacen dos cosas:

1. **Te recuerdan qué hacer a continuación** (tareas, notificaciones)
2. **Marcan los tratos que se están estancando** (alertas basadas en tiempo)

<SlideNavigation>
<Slide title="Automatizaciones de la Etapa Lead">

### Cuando un contacto entra en la etapa "Lead":

- ✅ Auto-enriquecer datos de contacto (Apollo, Attio, Clay)
- ✅ Auto-crear tarea: "Investigar + enviar primer alcance" (vence en 48 horas)
- ✅ Auto-asignar al propietario (si tienes equipo, de lo contrario asignarte a ti)

### Activadores basados en tiempo:

- 🚨 Si está en etapa Lead por 7+ días → Marcar en amarillo ("Pendiente de investigación")

<ExampleCard label="Receta de Automatización: Etapa Lead">
**Activador:** Nuevo contacto creado con etiqueta "ajuste-ICP"
**Acción 1:** Enriquecer vía API de Apollo (tamaño de empresa, stack tecnológico, financiación reciente)
**Acción 2:** Crear tarea "Enviar primer alcance" asignada a ti, vence en 2 días
**Acción 3:** Si sigue en Lead después de 7 días, enviar notificación de Slack "Alerta de pendientes: 12 leads sin contactar"
</ExampleCard>

</Slide>

<Slide title="Automatizaciones de la Etapa Contactado">

### Cuando un trato se mueve a "Contactado":

- ✅ Auto-programar tarea de seguimiento el Día 3 ("Enviar seguimiento #1")
- ✅ Auto-programar tarea de seguimiento el Día 7 ("Enviar seguimiento #2")
- ✅ Auto-registrar alcance en el historial de actividad

### Activadores basados en tiempo:

- 🚨 Si está en etapa Contactado por 14+ días sin respuesta → Auto-mover a Perdido con razón "Sin Respuesta"

<InsightCard icon="⚡" title="La Regla de los 3 Contactos">
Si alguien no responde después de 3 contactos en 14 días, no le interesa **ahora mismo**. Muévelo a Perdido y reactívalo en 90 días con un nuevo evento desencadenante (actualización del producto, caso de estudio, noticias del sector). No los dejes pudrirse en "Contactado" durante meses.
</InsightCard>

</Slide>

<Slide title="Automatizaciones de la Etapa Comprometido">

### Cuando un trato se mueve a "Comprometido":

- ✅ Auto-crear tarea: "Reservar reunión" (vence en 3 días)
- ✅ Auto-enviar enlace del programador de reuniones si aún no se ha enviado
- ✅ Auto-registrar evento de compromiso (respondió, hizo clic, descargó)

### Activadores basados en tiempo:

- 🚨 Si está en etapa Comprometido por 10+ días sin reunión reservada → Marcar en amarillo ("Compromiso estancado")
- 🚨 Si está en etapa Comprometido por 21+ días → Auto-mover a Perdido con razón "Compromiso desvanecido"

</Slide>

<Slide title="Automatizaciones de la Etapa Reunión">

### Cuando un trato se mueve a "Reunión":

- ✅ Auto-crear tarea: "Prepararse para la reunión" (vence 1 día antes de la reunión)
- ✅ Auto-enviar recordatorio de reunión 24 horas antes
- ✅ Auto-crear tarea: "Enviar propuesta" (vence 2 días después de la reunión)

### Después de que la reunión se marque como completada:

- ✅ Auto-enviar plantilla de correo de seguimiento post-reunión
- ✅ Auto-crear tarea: "Registrar notas de la reunión" (vence el mismo día)

### Activadores basados en tiempo:

- 🚨 Si la reunión se completó pero no se envió propuesta en 7 días → Marcar en rojo ("Propuesta atrasada")
- 🚨 Si la reunión estaba programada pero hubo no-show → Auto-crear tarea "Reprogramar o cerrar como perdido"

</Slide>

<Slide title="Automatizaciones de la Etapa Propuesta">

### Cuando un trato se mueve a "Propuesta":

- ✅ Auto-crear tarea: "Hacer seguimiento de la propuesta" (vence 3 días después del envío)
- ✅ Auto-registrar fecha de envío de la propuesta e importe
- ✅ Auto-notificar al equipo en Slack (si aplica)

### Activadores basados en tiempo:

- 🚨 Si está en etapa Propuesta por 14+ días sin respuesta → Marcar en amarillo ("Propuesta ignorada")
- 🚨 Si está en etapa Propuesta por 30+ días → Auto-crear tarea "Cerrar como perdido o negociar"

<ExampleCard label="Receta de Automatización: Etapa Propuesta">
**Activador:** Trato movido a etapa Propuesta
**Acción 1:** Crear tarea "Llamar para hablar de la propuesta" vence en 3 días
**Acción 2:** Si no se registra actividad en 14 días, enviar correo: "Hola [Nombre], dándote seguimiento sobre la propuesta que envié. ¿Tienes alguna pregunta?"
**Acción 3:** Si sigue sin respuesta el Día 30, auto-marcar para revisión manual
</ExampleCard>

</Slide>

<Slide title="Automatizaciones de la Etapa Ganado/Perdido">

### Cuando un trato se mueve a "Ganado":

- ✅ Auto-crear tareas de incorporación (llamada de inicio, enviar correo de bienvenida, agregar al Slack de clientes)
- ✅ Auto-actualizar etapa del ciclo de vida del contacto a "Cliente"
- ✅ Auto-notificar al equipo en Slack con el valor del trato

### Cuando un trato se mueve a "Perdido":

- ✅ Auto-etiquetar contacto para reactivación en 90 días
- ✅ Auto-agregar al informe mensual de revisión de "Tratos Perdidos"
- ✅ Auto-enviar (opcional) solicitud de retroalimentación: "¿Qué te hizo elegir a [competidor]?"

</Slide>
</SlideNavigation>

Ahora construyamos tu plan de automatización.

<TemplateBuilder
title="Tu Plan de Automatización por Etapas"
persistKey="crm-setup-L4-automations"
sections={[
{
id: "contacted",
title: "Automatizaciones de la Etapa Contactado",
fields: [
{
id: "followup-1",
label: "¿Cuándo debe activarse el seguimiento #1?",
placeholder: "ej., 3 días después del primer alcance",
type: "text"
},
{
id: "followup-2",
label: "¿Cuándo debe activarse el seguimiento #2?",
placeholder: "ej., 7 días después del primer alcance",
type: "text"
},
{
id: "auto-close",
label: "¿Cuándo deberías auto-cerrar como Perdido?",
placeholder: "ej., 14 días sin respuesta después de 3 contactos",
type: "text"
}
]
},
{
id: "meeting",
title: "Automatizaciones de la Etapa Reunión",
fields: [
{
id: "post-meeting",
label: "¿Qué debe pasar inmediatamente después de una reunión?",
placeholder: "ej., Enviar correo de agradecimiento, crear tarea de propuesta",
type: "textarea"
},
{
id: "proposal-deadline",
label: "¿Cuántos días después de una reunión debe enviarse una propuesta?",
placeholder: "ej., 2-3 días",
type: "text"
}
]
}
]}
/>

---

## Reglas de Higiene del Pipeline

Tu pipeline solo es útil si es **preciso**. Datos basura = decisiones basura.

Aquí están las reglas de higiene innegociables:

### Regla 1: Máximo 30 Días en Cualquier Etapa

Si un trato permanece en una etapa por 30+ días, o está muerto o estás evitando una conversación difícil. Revísalo y ya sea avánzalo, ciérralo como perdido o programa una próxima acción específica.

### Regla 2: Cada Trato Tiene una Próxima Acción con Fecha

Ningún trato debe existir sin una tarea adjunta. "Esperando que ellos" no es una tarea. "Hacer seguimiento de la propuesta" con una fecha de vencimiento sí lo es.

### Regla 3: Los Tratos Perdidos Deben Tener un Código de Razón

No solo marques los tratos como "Perdido" — registra **por qué**. Tus razones de pérdida se convierten en tu hoja de ruta de producto y guía de posicionamiento.

Razones de pérdida comunes:

- Eligió a un competidor (nómbralo)
- Presupuesto/precio
- Momento (no está listo ahora)
- Sin respuesta (ignoró)
- No es un ajuste (desajuste del ICP)
- El defensor dejó la empresa

### Regla 4: Barrido Semanal del Pipeline (15 Minutos)

Cada viernes (o lunes), revisa:

1. Tratos sin actividad en 14+ días
2. Tratos sin próxima acción
3. Tratos que deben cambiar de etapa
4. Nuevos duplicados para fusionar

<InteractiveChecklist
title="Tu Ritual Semanal de Higiene del Pipeline"
persistKey="crm-setup-L4-hygiene"
items={[
"Filtrar tratos sin actividad en 14+ días y actualizar o cerrar",
"Verificar que cada trato abierto tiene una próxima acción con fecha de vencimiento",
"Mover tratos que alcanzaron criterios de salida a la siguiente etapa",
"Cerrar tratos obviamente muertos con una razón de pérdida",
"Verificar contactos duplicados y fusionar",
"Revisar tratos perdidos de esta semana para encontrar patrones"
]}
/>

Practiquemos la higiene del pipeline con una simulación.

<MiniRoleplay
  scenario="Estás revisando tu pipeline el viernes. Ves un trato en la etapa 'Propuesta' durante 28 días. El prospecto no ha respondido a tus últimos dos seguimientos. ¿Qué haces?"
  role="Eres el fundador tomando una decisión"
  persistKey="crm-setup-L4-hygiene-roleplay"
  modelResponse="Lo movería a Perdido con razón 'Sin Respuesta - Propuesta'. Luego etiquetaría el contacto para reactivación en 90 días con un nuevo desencadenante (actualización del producto, caso de estudio). Mantenerlo en Propuesta me da falsas esperanzas y contamina mi pipeline. Si regresan, puedo reabrir el trato."
/>

---

## Tu Lista de Verificación de Configuración del Pipeline

Ya aprendiste la teoría. Ahora construyámoslo.

<ProgressiveReveal title="Pasos de Configuración del Pipeline" persistKey="crm-setup-L4-reveal">

<RevealSection title="Paso 1: Crea Tus 6 Etapas">

En tu CRM (HubSpot, Attio, Pipedrive, etc.), crea estas etapas:

1. **Lead** (o "Nuevo")
2. **Contactado** (o "Alcance Enviado")
3. **Comprometido** (o "Respondió")
4. **Reunión** (o "Demo Programada")
5. **Propuesta** (o "Oferta Enviada")
6. **Ganado** y **Perdido** (separados o combinados según el CRM)

**HubSpot:** Configuración → Objetos → Tratos → Pipelines → Editar etapas
**Attio:** Listas → Tratos → Configurar etapas
**Pipedrive:** Configuración → Pipelines → Editar etapas

</RevealSection>

<RevealSection title="Paso 2: Define los Criterios de Salida para Cada Etapa">

Para cada etapa, anota:

- **¿Qué evento mueve un trato HACIA esta etapa?**
- **¿Qué evento mueve un trato FUERA de esta etapa?**
- **¿Cuánto tiempo debería quedarse típicamente un trato aquí?**

Usa las definiciones anteriores en esta lección como tu plantilla.

</RevealSection>

<RevealSection title="Paso 3: Configura Marcas Basadas en Tiempo">

Configura automatizaciones (o recordatorios manuales) para:

- Etapa Contactado: 14 días sin actividad → marcar o auto-cerrar
- Etapa Comprometido: 21 días sin reunión reservada → marcar
- Etapa Reunión: 7 días post-reunión, sin propuesta → marcar
- Etapa Propuesta: 30 días sin respuesta → marcar

**HubSpot Starter:** Flujos de trabajo → Crear tarea basada en tiempo
**Attio:** Automatizaciones → Activadores basados en tiempo
**Pipedrive:** Automatización de flujos → Condiciones basadas en tiempo

</RevealSection>

<RevealSection title="Paso 4: Crea Tareas Estándar para Cada Etapa">

Construye plantillas de tareas que se auto-crean cuando un trato entra en una etapa:

- **Lead → Contactado:** "Investigar + enviar primer alcance" (vence en 48 horas)
- **Contactado → Comprometido:** "Reservar reunión" (vence en 3 días)
- **Comprometido → Reunión:** "Prepararse para la llamada" (vence 1 día antes de la reunión)
- **Reunión → Propuesta:** "Enviar propuesta" (vence 2 días después de la reunión)
- **Propuesta → Ganado/Perdido:** "Registrar razón de cierre" (vence el mismo día)

</RevealSection>

<RevealSection title="Paso 5: Agrega los Campos Requeridos para Ganado/Perdido">

Haz que estos campos sean **obligatorios** al cerrar un trato:

**Ganado:**

- Fecha de cierre
- Razón de cierre (por qué compraron)
- Valor del trato (si aún no se rastrea)

**Perdido:**

- Fecha de cierre
- Razón de pérdida (menú desplegable: competidor, presupuesto, momento, sin respuesta, no es un ajuste)
- Nombre del competidor (si aplica)

Estos datos se convierten en tu inteligencia estratégica en el Curso 41 (Analítica).

</RevealSection>

<RevealSection title="Paso 6: Importa Tus Tratos Existentes">

Si tienes tratos en una hoja de cálculo u otro CRM:

1. Exporta a CSV
2. Mapea columnas a tus nuevas etapas del pipeline
3. Importa y verifica manualmente el 10% de los registros
4. Elimina la hoja de cálculo (en serio — una sola fuente de verdad)

</RevealSection>

</ProgressiveReveal>

---

## Prueba el Diseño de Tu Pipeline

Asegurémonos de que tu pipeline realmente funcionará en la práctica.

<SwipeDecision
title="¿Buen Pipeline o Mal Pipeline?"
description="Desliza a la derecha para pipelines bien diseñados, a la izquierda para los defectuosos"
optionA="Defectuoso"
optionB="Bien Diseñado"
persistKey="crm-setup-L4-swipe"
cards={[
{
id: "1",
content: "Etapas: Prospecto → Hablando → Interesado → Cerrando → Cerrado",
correctOption: "a",
explanation: "Demasiado vago. 'Hablando' e 'Interesado' no tienen criterios de salida claros."
},
{
id: "2",
content: "Etapas: Lead → Contactado → Comprometido → Reunión → Propuesta → Ganado/Perdido",
correctOption: "b",
explanation: "Transiciones claras y observables en cada etapa."
},
{
id: "3",
content: "Etapas: Frío → Tibio → Caliente → Cerrado",
correctOption: "a",
explanation: "Las metáforas de temperatura son subjetivas. ¿Qué es 'tibio' para ti vs. para mí?"
},
{
id: "4",
content: "12 etapas incluyendo 'Calificación - Presupuesto Confirmado' y 'Propuesta - Revisión Legal'",
correctOption: "a",
explanation: "Sobre-ingeniería. Los fundadores en solitario no necesitan granularidad de nivel empresarial."
},
{
id: "5",
content: "Etapas: Suscriptor → Solicitante → Llamada Reservada → Inscrito/Perdido",
correctOption: "b",
explanation: "Perfecto para un pipeline de creador/coach con embudo de solicitud."
}
]}
/>

---

## Tareas: Construye Tu Pipeline Esta Semana

<InteractiveChecklist
title="Tu Sprint de Configuración del Pipeline"
persistKey="crm-setup-L4-actions"
items={[
"Crear 6 etapas del pipeline en tu CRM con nombres claros",
"Escribir criterios de salida para cada etapa (qué mueve un trato hacia adelante)",
"Configurar 3 marcas basadas en tiempo (Contactado 14d, Comprometido 21d, Propuesta 30d)",
"Crear plantillas de tareas para cada transición de etapa",
"Hacer de la razón de cierre un campo obligatorio para los tratos Ganados/Perdidos",
"Importar tus tratos existentes y mapearlos a etapas",
"Programar tu primera revisión semanal de higiene del pipeline (15 min)"
]}
/>

**Próxima Lección:** Configuraremos el registro de correos y el enriquecimiento de contactos para que tu pipeline se alimente de datos precisos y listos para IA.

---

## Quiz: Dominio de las Etapas del Pipeline

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Un prospecto responde a tu correo en frío diciendo 'No me interesa ahora mismo.' ¿En qué etapa debería estar este trato?",
      "options": [
        "Contactado (en realidad no han respondido de verdad)",
        "Comprometido (cualquier respuesta cuenta como compromiso)",
        "Perdido (dijeron que no les interesa)",
        "Reunión (programar un seguimiento)"
      ],
      "correctAnswer": 1,
      "explanation": "Cualquier respuesta = compromiso, aunque sea negativa. Mover a Comprometido y luego hacer seguimiento en 90 días con un nuevo desencadenante. No cerrar como Perdido a menos que digan explícitamente 'nunca me contactes de nuevo'."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Cuánto tiempo debería típicamente permanecer un trato en la etapa 'Contactado' antes de que tomes acción?",
      "options": [
        "3-7 días con seguimientos, luego cerrar como Perdido si no hay respuesta para el Día 14",
        "Mínimo 30 días para darles tiempo de pensar",
        "Seguir haciendo seguimiento semanalmente por 90 días",
        "Mover a Perdido inmediatamente si no responden en 24 horas"
      ],
      "correctAnswer": 0,
      "explanation": "La regla de 3 contactos: hacer seguimiento el Día 3 y el Día 7. Si no hay respuesta para el Día 14, mover a Perdido con razón 'Sin Respuesta'. Puedes reactivarlos más tarde con un nuevo desencadenante."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "¿Cuál es el campo más importante para requerir al cerrar un trato como Perdido?",
      "options": [
        "Valor del trato",
        "Razón de pérdida",
        "Nombre del competidor",
        "Fecha del último contacto"
      ],
      "correctAnswer": 1,
      "explanation": "La razón de pérdida es inteligencia estratégica. Si el 60% de tus pérdidas son 'eligió al competidor X', tienes un problema de posicionamiento. Rastrea esto religiosamente."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Los fundadores en solitario deben usar pipelines separados para leads inbound vs. outbound.",
      "correctAnswer": false,
      "explanation": "Falso. Usa un solo pipeline con un campo 'Fuente del Lead'. Múltiples pipelines fragmentan tus informes y duplican el trabajo de mantenimiento."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "Un prospecto tuvo una excelente llamada de demo y te pidió que le enviaras precios. ¿A qué etapa debería moverse este trato?",
      "options": [
        "Mantener en etapa Reunión hasta que confirmen el interés",
        "Mover a etapa Propuesta inmediatamente",
        "Mover a etapa Comprometido para seguir cultivando",
        "Mover a etapa Ganado (claramente están interesados)"
      ],
      "correctAnswer": 1,
      "explanation": "Precios enviados = etapa Propuesta. No esperes. El criterio de salida para la etapa Reunión es 'propuesta enviada' — muévelo inmediatamente y crea una tarea de seguimiento."
    }
  ]
}
```
