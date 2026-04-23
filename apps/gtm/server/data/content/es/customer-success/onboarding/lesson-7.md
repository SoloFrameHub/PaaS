---
title: "Diseño de Seguimiento y Encuesta del Día 45-60"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 36: Incorporación de Clientes"
lesson: 7
---

## La Ventana de Cancelación Silenciosa

Hiciste todo bien. Tu cliente se registró, completó la incorporación, alcanzó su primer hito en el Día 7. Lo están usando semanalmente. Respiras aliviado.

Luego, 60 días después, cancelan.

Sin advertencia. Sin ticket de soporte. Sin queja. Solo… se fueron.

Esto es la **cancelación silenciosa**, y ocurre con mayor frecuencia entre el Día 45 y el Día 60. La emoción inicial ha desaparecido. La novedad se fue. O han construido un hábito alrededor de tu producto — o no lo han hecho. Y si no lo han hecho, están evaluando silenciosamente si renovar.

**La brutal verdad:** El 68% de los clientes que cancelan lo hacen porque sienten que no te importan. No porque tu producto haya fallado. No porque un competidor fuera mejor. Porque desapareciste después de la incorporación.

El seguimiento del Día 45-60 es tu segunda oportunidad de prevenir la cancelación antes de que ocurra.

<InsightCard icon="🎯" title="La Brecha del Cuidado">
La mayoría de los fundadores se obsesionan con la primera semana de incorporación, luego desaparecen. Los clientes que permanecen no son los que tuvieron la mejor experiencia del Día 1 — son los que se sintieron atendidos en el Día 45.
</InsightCard>

---

## Por Qué el Día 45-60 Es la Segunda Ventana Crítica

Veamos el viaje emocional de un nuevo cliente:

<SlideNavigation>
<Slide title="Días 1-7: Emoción">
**Alta energía.** Acaban de comprar. Están motivados. Quieren que funcione. Tus correos de incorporación obtienen tasas de apertura del 60-80%.

**Riesgo:** Confusión, fricción de configuración, remordimiento del comprador.
</Slide>

<Slide title="Días 8-30: Formación de Hábitos">
**La realidad se asienta.** El golpe inicial de dopamina desaparece. O están construyendo una rutina con tu producto o luchando para que funcione.

**Riesgo:** Compromiso superficial, confusión de funciones, prioridades competidoras.
</Slide>

<Slide title="Días 31-45: La Meseta">
**La luna de miel terminó.** Han usado tu producto lo suficiente como para saber si está funcionando. Si aún no han visto resultados significativos, la duda se cuela.

**Riesgo:** Frustración silenciosa, comparación con competidores, desconexión mental.
</Slide>

<Slide title="Días 45-60: La Ventana de Decisión">
**La psicología de renovación se activa.** Incluso si tienen un plan mensual, están decidiendo subconscientemente: "¿Vale la pena mantener esto?"

**Riesgo:** Cancelación silenciosa. No se quejan — simplemente se van.
</Slide>
</SlideNavigation>

**Los datos son claros:**

- Los detractores de NPS (puntuaciones 0-6) son **5 veces más propensos a cancelar en 90 días**
- Un simple correo "¿Cómo va todo?" en el Día 45 **reduce la cancelación del Mes 2-3 en un 10-15%**
- Las empresas que actúan sobre la retroalimentación de clientes en 48 horas tienen **25% más de retención**

La ventana del Día 45-60 es donde **el cuidado proactivo supera al soporte reactivo**.

<RangeSlider
  label="¿Con qué frecuencia haces seguimiento con los clientes después de la incorporación?"
  min={1}
  max={10}
  lowLabel="Nunca"
  highLabel="Semanalmente"
  persistKey="onboarding-L7-checkin-frequency"
/>

---

## La Encuesta de 3 Preguntas

No necesitas una encuesta de 20 preguntas. Necesitas **3 preguntas que revelan todo**:

<FlipCard
  front="Pregunta 1: La Pregunta de NPS"
  back="'En una escala del 0 al 10, ¿qué tan probable es que recomiendes [producto] a un colega?' — Esta única pregunta predice el riesgo de cancelación mejor que cualquier otra métrica."
/>

<FlipCard
  front="Pregunta 2: La Pregunta de Mejora"
  back="'¿Qué es lo único que mejorarías?' — Texto abierto. Esto revela brechas del producto, fricción de incorporación y expectativas no cumplidas."
/>

<FlipCard
  front="Pregunta 3: La Pregunta de Resultados"
  back="'¿Cuál es el mayor resultado que has logrado hasta ahora?' — Esto te dice si han alcanzado valor significativo. Si no pueden responder, están en riesgo."
/>

### Por Qué Estas 3 Preguntas Funcionan

**Pregunta 1 (NPS)** segmenta a tus clientes en tres grupos:

- **9-10 (Promotores):** Tus embajadores. Pide testimonios y referencias.
- **7-8 (Pasivos):** Satisfechos pero no leales. A un competidor de distancia de irse.
- **0-6 (Detractores):** En riesgo. Necesitan contacto personal en 24 horas.

**Pregunta 2 (Mejora)** te da tu hoja de ruta del producto.

**Pregunta 3 (Resultados)** es el predictor de retención. Si pueden articular una victoria, se quedan. Si dicen "todavía estoy descubriendo cómo funciona" en el Día 45, van a cancelar.

<ExampleCard label="Respuesta Real de Encuesta: La Señal de Advertencia">
**NPS:** 5
**Mejora:** "Quisiera que fuera más fácil entender qué hacer primero."
**Resultado:** "En realidad no lo he usado mucho todavía."

**Traducción:** Este cliente está a 7 días de cancelar. Está confundido, no ha alcanzado valor y ya está mentalmente desconectado.

**Acción:** Correo personal del fundador en 24 horas ofreciendo una guía de 15 minutos.
</ExampleCard>

<TemplateBuilder
title="Tu Encuesta de 3 Preguntas"
persistKey="onboarding-L7-survey"
sections={[
{
id: "nps",
title: "Pregunta 1: NPS",
fields: [
{
id: "nps-text",
label: "Texto de la Pregunta NPS",
placeholder: "En una escala del 0 al 10, ¿qué tan probable es que recomiendes [Tu Producto] a un colega?",
type: "text"
}
]
},
{
id: "improvement",
title: "Pregunta 2: Mejora",
fields: [
{
id: "improvement-text",
label: "Texto de la Pregunta de Mejora",
placeholder: "¿Qué es lo único que mejorarías de [Tu Producto]?",
type: "text"
}
]
},
{
id: "results",
title: "Pregunta 3: Resultados",
fields: [
{
id: "results-text",
label: "Texto de la Pregunta de Resultados",
placeholder: "¿Cuál es el mayor resultado que has logrado con [Tu Producto] hasta ahora?",
type: "textarea"
}
]
}
]}
/>

---

## El Protocolo de Respuesta NPS

**El error que comete la mayoría de los fundadores:** Leen las respuestas, se sienten bien con los 9s y 10s, se estremecen ante los 3s y 4s, y… no hacen nada.

**El movimiento correcto:** Tratar las puntuaciones NPS como un sistema de triaje.

<ClassifyExercise
title="Clasifica Estas Respuestas NPS"
persistKey="onboarding-L7-nps-classify"
categories={[
{ id: "promoter", label: "Promotor (9-10)", color: "#10b981" },
{ id: "passive", label: "Pasivo (7-8)", color: "#f59e0b" },
{ id: "detractor", label: "Detractor (0-6)", color: "#ef4444" }
]}
items={[
{ id: "1", content: "Puntuación: 9 | '¡Me encanta! Me ahorra 3 horas a la semana.'", correctCategory: "promoter" },
{ id: "2", content: "Puntuación: 7 | 'Está bien. Hace lo que necesito.'", correctCategory: "passive" },
{ id: "3", content: "Puntuación: 4 | 'Todavía intento descubrir cómo usarlo.'", correctCategory: "detractor" },
{ id: "4", content: "Puntuación: 10 | '¡Ya lo recomendé a 2 colegas!'", correctCategory: "promoter" },
{ id: "5", content: "Puntuación: 6 | 'Está bien, pero le faltan algunas funciones que necesito.'", correctCategory: "detractor" }
]}
/>

### El Protocolo de Respuesta

| Puntuación NPS | Clasificación | Acción                                                      | Plazo              |
| -------------- | ------------- | ----------------------------------------------------------- | ------------------ |
| **9-10**       | Promotor      | Agradecer + pedir testimonio + solicitar referido           | Dentro de 48 horas |
| **7-8**        | Pasivo        | Agradecer + preguntar "¿Qué lo haría un 10?"                | Dentro de 72 horas |
| **0-6**        | Detractor     | **Contacto personal en 24 horas** + resolución del problema | Inmediato          |

<ComparisonBuilder
title="Correo de Respuesta al Detractor"
persistKey="onboarding-L7-detractor-email"
prompt="Escribe tu respuesta a un detractor (NPS 0-6)"
expertExample="Hola [Nombre],

Vi tu retroalimentación y quise contactarte personalmente. Una puntuación de [X] me dice que no estamos entregando el valor que esperabas, y quiero arreglarlo.

Mencionaste [problema específico de su retroalimentación]. Esto es lo que puedo hacer:

[Solución específica u oferta — p.ej., 'Me encantaría hacer una llamada de 15 minutos para mostrarte [función]' o 'Puedo configurar [integración] manualmente esta semana.']

¿Te vendría bien [hora específica] para una llamada rápida?

Gracias por ser honesto conmigo.

[Tu nombre]"
criteria={[
"Reconoce la puntuación directamente",
"Hace referencia a su retroalimentación específica",
"Ofrece una solución concreta",
"Incluye una solicitud específica (llamada, acción, etc.)"
]}
/>

<InsightCard icon="💡" title="La Tasa de Recuperación de Detractores">
El 15-25% de los detractores que reciben contacto personal en 24 horas se quedan y se convierten en pasivos o promotores. Eso es una reducción de cancelación del 15-25% con un solo correo.
</InsightCard>

---

## El Correo Personal del Día 45

La encuesta es un punto de contacto. Pero hay una segunda intervención igualmente poderosa: **el correo personal del fundador**.

Este no está automatizado. No está en plantilla. Eres tú, el fundador, escribiendo un correo genuino de seguimiento a cada cliente en el Día 45.

<TemplateBuilder
title="Correo Personal del Día 45"
persistKey="onboarding-L7-personal-email"
sections={[
{
id: "opening",
title: "Línea de Apertura",
fields: [
{ id: "greeting", label: "Saludo Personal", placeholder: "Hola [Nombre], llevas aproximadamente 6 semanas con nosotros...", type: "text" }
]
},
{
id: "question",
title: "La Pregunta de Seguimiento",
fields: [
{ id: "question-text", label: "¿Cómo va todo?", placeholder: "¿Cómo te está funcionando [producto]? ¿Estás obteniendo los resultados que esperabas?", type: "textarea" }
]
},
{
id: "offer",
title: "La Oferta de Ayuda",
fields: [
{ id: "offer-text", label: "Oferta de Ayudar", placeholder: "Si hay algo que pueda hacer para que esto sea más valioso para ti, solo responde a este correo. Leo cada respuesta.", type: "textarea" }
]
},
{
id: "signature",
title: "Firma",
fields: [
{ id: "sign-off", label: "Despedida", placeholder: "Gracias por ser cliente.\n\n[Tu nombre]\nFundador, [Empresa]", type: "textarea" }
]
}
]}
/>

<ExampleCard label="Respuesta Real al Correo del Día 45">
**Correo del fundador:** "Hola Sarah, llevas 6 semanas con nosotros. ¿Cómo va? ¿Puedo hacer algo para ayudar?"

**Respuesta de Sarah:** "Honestamente, he estado intentando conectarlo a mi CRM. Sé que se supone que funciona, pero no encuentro las instrucciones."

**Resultado:** El fundador envía un video de Loom de 2 minutos. Sarah conecta la integración. Se queda 18 meses y refiere a 3 clientes.

**ROI de un correo:** $12,000+ en ingresos retenidos + referidos.
</ExampleCard>

---

## Entrevistas de Salida: Aprendiendo de los Clientes que Cancelaron

No todos se quedarán. Eso está bien. Pero cuando alguien cancela, **necesitas saber por qué**.

<TemplateBuilder
title="Encuesta de Entrevista de Salida"
persistKey="onboarding-L7-exit-survey"
sections={[
{
id: "reason",
title: "Pregunta 1: Razón Principal",
fields: [
{ id: "reason-text", label: "¿Por qué cancelas?", placeholder: "¿Cuál fue la razón principal para cancelar? (Texto abierto)", type: "textarea" }
]
},
{
id: "improvement",
title: "Pregunta 2: ¿Qué Podríamos Haber Hecho?",
fields: [
{ id: "improvement-text", label: "¿Qué podríamos haber hecho diferente?", placeholder: "¿Qué podríamos haber hecho diferente para mantenerte como cliente?", type: "textarea" }
]
},
{
id: "return",
title: "Pregunta 3: ¿Volverías?",
fields: [
{ id: "return-text", label: "¿Considerarías volver?", placeholder: "Si resolviéramos [problema], ¿considerarías volver en el futuro?", type: "text" }
]
}
]}
/>

<SwipeDecision
title="¿Razón de Cancelación Accionable o Cancelación Natural?"
description="Desliza a la derecha para razones que puedes resolver, a la izquierda para cancelación natural"
optionA="Cancelación Natural"
optionB="Accionable"
persistKey="onboarding-L7-churn-swipe"
cards={[
{ id: "1", content: "'Cerré mi negocio.'", correctOption: "a", explanation: "No había nada que pudieras haber hecho. Cancelación natural." },
{ id: "2", content: "'No pude entender cómo usarlo.'", correctOption: "b", explanation: "Brecha de incorporación. Puedes arreglarlo." },
{ id: "3", content: "'No se integra con mi CRM.'", correctOption: "b", explanation: "Brecha del producto. Prioridad en la hoja de ruta." },
{ id: "4", content: "'Encontré una alternativa más barata.'", correctOption: "a", explanation: "Cliente sensible al precio. Difícil de prevenir." },
{ id: "5", content: "'Nunca obtuve los resultados que esperaba.'", correctOption: "b", explanation: "Desajuste de expectativas o fallo de incorporación. Solucionable." }
]}
/>

---

## Tu Sistema del Día 45-60

<ProgressiveReveal title="El Sistema Completo del Día 45-60" persistKey="onboarding-L7-system-reveal">
<RevealSection title="Paso 1: La Encuesta de 3 Preguntas (Día 45)">
Envía a todos los clientes en el Día 45:
1. Pregunta NPS
2. "¿Qué mejorarías?"
3. "¿Cuál es tu mayor resultado hasta ahora?"

Herramienta: Google Forms o Typeform
</RevealSection>

<RevealSection title="Paso 2: El Correo Personal (Día 45)">
Envía desde tu correo personal:
- "Llevas 6 semanas con nosotros. ¿Cómo va?"
- Invita una respuesta
- Sin argumentos de venta

Herramienta: Tu cliente de correo
</RevealSection>

<RevealSection title="Paso 3: El Protocolo de Respuesta (Dentro de 24-48 Horas)">
- **Promotores (9-10):** Agradecer + pedir testimonio
- **Pasivos (7-8):** Agradecer + preguntar qué lo haría un 10
- **Detractores (0-6):** Contacto personal + resolución del problema

Herramienta: Tu cliente de correo + notificación de Zapier
</RevealSection>

<RevealSection title="Paso 4: Entrevistas de Salida (Al Cancelar)">
Envía encuesta de 2-3 preguntas:
- ¿Por qué cancelas?
- ¿Qué podríamos haber hecho diferente?
- ¿Considerarías volver?

Herramienta: Google Forms activado al cancelar
</RevealSection>

<RevealSection title="Paso 5: Revisión Semanal (Cada Viernes)">
- Revisar todas las respuestas NPS
- Responder a detractores
- Categorizar retroalimentación de entrevistas de salida
- Identificar patrones → actualizar incorporación

Herramienta: Hoja de cálculo o Notion
</RevealSection>
</ProgressiveReveal>

<InteractiveChecklist
title="Tu Lista de Verificación de Implementación del Día 45-60"
persistKey="onboarding-L7-implementation"
items={[
"Crear tu encuesta de 3 preguntas en Google Forms o Typeform",
"Configurar Zapier para notificarte cuando NPS < 7",
"Escribir tu plantilla de correo personal del Día 45",
"Crear tu encuesta de entrevista de salida",
"Configurar un recordatorio de revisión semanal (viernes, 30 minutos)",
"Redactar tu plantilla de correo de respuesta al detractor",
"Probar el flujo de encuesta con un cliente de prueba",
"Programar tu primer lote de correos del Día 45"
]}
/>
