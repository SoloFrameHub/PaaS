---
title: "El Bloque Semanal de Revisión de CS"
duration: "45 min"
track: "Éxito del Cliente"
course: "Curso 37: Retención y Prevención de Abandono"
lesson: 8
---

Has construido un modelo de puntaje de salud. Has conectado señales de abandono. Has escrito guiones de rescate.

Ahora viene la parte difícil: **realmente usarlos.**

La mayoría de los fundadores en solitario construyen sistemas de retención y luego... se olvidan de revisarlos. El dashboard de puntaje de salud queda intacto. Los emails de reactivación nunca se envían. Las cuentas en rojo se escapan entre las grietas.

¿La diferencia entre un sistema de retención que funciona y uno que acumula polvo? **Un ritual semanal.**

Esta lección te enseña a reservar 2-3 horas cada semana — un Bloque de Revisión de CS no negociable — donde sistemáticamente revisas la salud, priorizas intervenciones y ejecutas las acciones que realmente previenen el abandono.

<InsightCard icon="⏰" title="El Efecto Compuesto de la Consistencia">
Un fundador en solitario que revisa la salud del cliente semanalmente detecta cuentas en riesgo un 45% más rápido que uno que revisa "cuando se acuerda." Esa diferencia de velocidad se traduce en un 25% menos de abandono en 12 meses.
</InsightCard>

## El Problema: El CS Reactivo No Escala

Esto es lo que se ve el éxito del cliente reactivo:

- El cliente envía email para cancelar → te apresuras a salvarlo
- El pago falla → lo notas 3 días después cuando Stripe envía una alerta
- El uso cae 70% → no lo notas hasta que ya se desconectaron mentalmente
- Oportunidad de expansión → la pierdes porque estás apagando incendios de abandono

**El CS reactivo es agotador.** Siempre estás atrasado, siempre estresado, siempre perdiendo clientes que podrías haber salvado.

¿La alternativa? **CS proactivo con un ritual de revisión semanal.**

<FlipCard
  front="¿Qué es el CS Proactivo?"
  back="CS proactivo significa que detectas problemas antes de que el cliente te diga. Intervienes durante la zona Amarilla (salvable) en lugar de esperar al Rojo (crisis). Creas oportunidades de expansión en lugar de esperar a que los clientes pregunten."
/>

## El Bloque Semanal de Revisión de CS: Tu Ritual de 2-3 Horas

Aquí está la estructura que funciona para fundadores en solitario gestionando 20-200 clientes:

<SlideNavigation>
<Slide title="Paso 1: Revisión de Puntaje de Salud (30 min)">

**Lo que estás haciendo:** Escanear tu dashboard de puntaje de salud buscando cambios de zona.

**Preguntas a responder:**

- ¿Quién pasó de Verde a Amarillo esta semana?
- ¿Quién pasó de Amarillo a Rojo?
- ¿Hay patrones? (ej., todas las cuentas Amarillas están en el plan Básico)

**Resultado:** Una lista de cuentas señaladas con 3 categorías:

1. **Urgente (Rojo)** — Actuar dentro de 48 horas
2. **Vigilar (Amarillo)** — Contacto proactivo esta semana
3. **Expandir (Verde + señales)** — Oportunidad de upsell

<ExampleCard label="Ejemplo Real: El Patrón que Encontró Valentina">
Valentina notó que 4 clientes bajaron de Verde a Amarillo en la misma semana. Los 4 estaban en su plan Básico y habían sido clientes por 6+ meses.

¿El patrón? Habían superado el plan Básico pero no sabían que existía el Pro. Envió un email de "Estás listo para subir de nivel" a los 4. Tres mejoraron su plan. Uno se quedó en Básico pero se re-enganchó.

**La lección:** Las revisiones de puntaje de salud revelan patrones que las revisiones individuales de cuentas no detectan.
</ExampleCard>

**Herramienta:** Tu hoja de cálculo o dashboard de puntaje de salud (de la Lección 2).

</Slide>

<Slide title="Paso 2: Cola de Reactivación (30 min)">

**Lo que estás haciendo:** Revisando usuarios dormidos (sin login en 7-14 días) y enviando nudges de reactivación.

**Preguntas a responder:**

- ¿Quién cruzó el umbral de 7 días de inactividad esta semana?
- ¿Quién está en 14 días (segundo nudge)?
- ¿Quién está en 21 días (nudge final o escalamiento)?

**Resultado:** Emails de reactivación enviados (de tu secuencia de la Lección 5).

**Ejecución:**

- &lt;50 clientes: Emails personales tuyos
- 50-200 clientes: Secuencia automatizada con tono personal
- Cuentas de alto valor ($200+/mes, ~$3,400 MXN): Mensaje de video personal, WhatsApp o llamada

<InsightCard icon="📧" title="La Ventana de Reactivación">
Días 7-14 de inactividad = 25-35% de tasa de reactivación. Días 21+ = &lt;10% de tasa de reactivación. La velocidad importa.
</InsightCard>

**Herramienta:** Analítica de producto (GA4, Mixpanel) o tracking manual de logins.

</Slide>

<Slide title="Paso 3: Pipeline de Expansión (30 min)">

**Lo que estás haciendo:** Revisando cuentas Verdes buscando señales de upsell.

**Señales a buscar:**

- Uso acercándose a los límites del plan (ej., 80% de capacidad de asientos)
- Alto engagement (NPS 9-10, logins frecuentes, uso de 3+ funciones)
- Hitos de permanencia (3 meses, 6 meses, 12 meses)
- Señales de crecimiento del negocio (contrató nuevo equipo, lanzó nuevo producto)

**Resultado:** Lista de contacto de expansión con ángulos personalizados de upsell.

<TemplateBuilder
title="Plantilla de Contacto de Expansión"
persistKey="retention-L8-expansion"
sections={[
{
id: "signal",
title: "Señal de Upsell",
fields: [
{ id: "customer", label: "Nombre del Cliente", placeholder: "ej., Acme Corp", type: "text" },
{ id: "signal", label: "¿Qué señal notaste?", placeholder: "ej., Usando 9 de 10 asientos", type: "textarea" },
{ id: "value", label: "¿Qué valor desbloquea la mejora?", placeholder: "ej., Asientos ilimitados + soporte prioritario", type: "textarea" }
]
},
{
id: "pitch",
title: "Mensaje de Contacto",
fields: [
{ id: "subject", label: "Asunto del Email", placeholder: "ej., ¿Listo para agregar más miembros al equipo?", type: "text" },
{ id: "body", label: "Cuerpo del Email", placeholder: "Hola [Nombre], noté que estás usando 9 de tus 10 asientos...", type: "textarea" }
]
}
]}
/>

**Herramienta:** Tu sistema de facturación (Stripe, Mercado Pago) + dashboard de puntaje de salud.

</Slide>

<Slide title="Paso 4: Revisión de Feedback (30 min)">

**Lo que estás haciendo:** Revisando respuestas de NPS, tickets de soporte y encuestas de salida buscando patrones y acciones.

**Preguntas a responder:**

- ¿Qué están elogiando los clientes? (Duplica esto)
- ¿De qué se están quejando? (Arréglalo o comunica timeline)
- ¿Hay solicitudes de funciones que aparecen múltiples veces? (Prioriza)
- ¿Qué dijeron los clientes que abandonaron en las encuestas de salida? (Previene abandono futuro)

**Resultado:** Acciones del feedback (ej., "Agregar función X al roadmap," "Mejorar onboarding para caso de uso Y," "Escribir doc de ayuda para Z").

<ExampleCard label="Caso de Estudio: El Patrón de la Encuesta de Salida">
Ricardo revisó encuestas de salida y notó que el 60% de los clientes que abandonaron dijeron: "Dejé de usarlo porque me olvidé."

**Su solución:** Agregó un email de resumen semanal mostrando a cada cliente sus estadísticas de uso y logros. El abandono bajó un 18% en 2 meses.

**La lección:** Las encuestas de salida te dicen qué arreglar para futuros clientes.
</ExampleCard>

**Herramienta:** Herramienta de NPS (Delighted, Typeform), sistema de soporte (Intercom, Help Scout), encuesta de salida (Google Form).

</Slide>

<Slide title="Paso 5: Ejecutar las Top 3 Acciones (30 min)">

**Lo que estás haciendo:** Realmente hacer el trabajo — llamadas, emails, arreglos.

**La Regla del "Top 3":** Cada revisión semanal debe producir un máximo de 3 acciones de alto impacto que ejecutas **esta semana.**

¿Por qué solo 3? Porque más de 3 significa que estás dispersándote demasiado. Mejor ejecutar 3 perfectamente que intentar 10 y completar 2.

**Cómo elegir tu Top 3:**

1. **Matriz de Urgencia x Valor** (ver siguiente sección)
2. Elige las 3 acciones en el cuadrante superior-derecho (alta urgencia + alto valor)
3. Difiere o automatiza todo lo demás

**Ejemplo Top 3:**

1. Llamar al cliente de $500/mes (~$8,500 MXN) que cayó a Rojo (alta urgencia + alto valor)
2. Enviar pitch de expansión al cliente de $200/mes (~$3,400 MXN) al 80% de capacidad de asientos (urgencia media + alto valor)
3. Arreglar el bug de onboarding que 3 clientes mencionaron esta semana (urgencia media + valor medio, pero previene abandono futuro)

</Slide>

<Slide title="Paso 6: Documentar Patrones (30 min)">

**Lo que estás haciendo:** Mantener un registro continuo de CS con patrones, intervenciones y resultados.

**Por qué esto importa:** Tu registro de CS se convierte en tu conocimiento institucional. Cuando eventualmente contrates una persona de CS, este registro los entrena un 50% más rápido.

**Qué registrar:**

- **Patrones notados:** "Todas las cuentas Amarillas esta semana eran usuarios del plan Básico con 6+ meses de antigüedad"
- **Intervenciones intentadas:** "Envié email de 'sube de nivel' a 4 cuentas Amarillas"
- **Resultados:** "3 mejoraron a Pro, 1 se re-enganchó en Básico"
- **Aprendizajes:** "Los nudges proactivos de upgrade funcionan mejor que esperar a que los clientes pregunten"

**Herramienta:** Notion, Google Doc o una hoja de cálculo simple.

<InteractiveChecklist
title="Tu Plantilla de Registro de CS"
persistKey="retention-L8-log"
items={[
"Crear un documento de registro de CS (Notion, Google Doc o hoja de cálculo)",
"Agregar secciones: Patrones, Intervenciones, Resultados, Aprendizajes",
"Después de cada revisión semanal, pasar 10 minutos documentando lo que notaste",
"Una vez al mes, revisar tu registro buscando meta-patrones"
]}
/>

</Slide>
</SlideNavigation>

## Priorización: La Matriz de Urgencia x Valor

No puedes hacer todo. La matriz 2x2 te ayuda a enfocarte en lo que más importa.

<ClassifyExercise
title="Prioriza Estas Acciones de CS"
persistKey="retention-L8-prioritize"
categories={[
{ id: "urgent-high", label: "Urgente + Alto Valor (Hacer Primero)", color: "#ef4444" },
{ id: "urgent-low", label: "Urgente + Bajo Valor (Automatizar)", color: "#f59e0b" },
{ id: "not-urgent-high", label: "No Urgente + Alto Valor (Programar)", color: "#3b82f6" },
{ id: "not-urgent-low", label: "No Urgente + Bajo Valor (Diferir)", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Cliente de $500/mes cayó a zona Roja (puntaje de salud 35)", correctCategory: "urgent-high" },
{ id: "2", content: "Cliente de $50/mes con 10 días de inactividad", correctCategory: "urgent-low" },
{ id: "3", content: "Cliente Verde de $300/mes usando 9 de 10 asientos", correctCategory: "not-urgent-high" },
{ id: "4", content: "Cliente de $40/mes solicitó una función menor", correctCategory: "not-urgent-low" },
{ id: "5", content: "El pago del cliente de $200/mes falló hace 3 días", correctCategory: "urgent-high" },
{ id: "6", content: "Cliente de $80/mes dio puntaje NPS de 9", correctCategory: "not-urgent-high" }
]}
/>

**La Matriz:**

|                                                                          | **Alto Valor ($200+/mes)**                                    | **Bajo Valor (&lt;$200/mes)**                         |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------- |
| **Alta Urgencia (zona Roja, fallo de pago, 21+ días inactivo)**          | **Hacer Primero** — Llamada/email personal dentro de 48 horas | **Automatizar** — Secuencia de rescate automatizada   |
| **Baja Urgencia (zona Amarilla, señal de expansión, feedback positivo)** | **Programar** — Agregar al Top 3 de esta semana               | **Diferir** — Agregar al backlog, revisar próximo mes |

## La Retrospectiva Mensual de CS

Una vez al mes, dedica 30 minutos a revisar tus métricas de CS y ajustar tu playbook.

<ProgressiveReveal title="Checklist de Retrospectiva Mensual" persistKey="retention-L8-retro">
<RevealSection title="1. Revisar Números de Abandono">

**Preguntas:**

- ¿Cuál fue la tasa de abandono de logos este mes?
- ¿Cuál fue la tasa de abandono de ingresos este mes?
- ¿Cuál fue el NRR este mes?
- ¿Cómo se comparan con el mes pasado? ¿Con hace 3 meses?

**Acción:** Si el abandono tiene tendencia al alza, profundiza en encuestas de salida y patrones de puntaje de salud para encontrar la causa raíz.

</RevealSection>

<RevealSection title="2. Revisar Tendencias de Puntaje de Salud">

**Preguntas:**

- ¿Qué % de clientes están en cada zona (Verde, Amarillo, Rojo)?
- ¿La zona Amarilla está creciendo o disminuyendo?
- ¿Hay patrones de cohorte? (ej., clientes que se registraron en enero abandonan más rápido que los de marzo)

**Acción:** Si Amarillo está creciendo, tu onboarding o product-market fit necesita trabajo.

</RevealSection>

<RevealSection title="3. Revisar Tasas de Éxito de Rescate">

**Preguntas:**

- ¿A cuántos clientes intentaste rescatar este mes?
- ¿A cuántos rescataste exitosamente?
- ¿Qué jugadas de rescate funcionaron mejor? (downgrade, pausa, llamada de recuperación)

**Acción:** Duplica las jugadas de rescate con las tasas de éxito más altas. Retira o revisa las que no funcionan.

</RevealSection>

<RevealSection title="4. Revisar Victorias de Expansión">

**Preguntas:**

- ¿Cuántos clientes mejoraron su plan este mes?
- ¿Cuál fue el MRR total de expansión?
- ¿Qué señales precedieron las mejoras?

**Acción:** Sistematiza las señales que predicen expansión (ej., "clientes que usan 3+ funciones y alcanzan el 80% de los límites del plan mejoran el 60% del tiempo").

</RevealSection>

<RevealSection title="5. Ajustar Tu Playbook">

**Preguntas:**

- ¿Qué funcionó este mes que deberías hacer más?
- ¿Qué no funcionó que deberías dejar de hacer o cambiar?
- ¿Qué nuevos patrones notaste?

**Acción:** Actualiza tu playbook de CS (secuencias de reactivación, guiones de rescate, pitches de expansión) basándote en lo que aprendiste.

</RevealSection>
</ProgressiveReveal>

## Construyendo Tu Hábito de Revisión Semanal de CS

Saber la estructura es una cosa. Realmente hacerlo cada semana es otra.

Así es cómo hacer del Bloque de Revisión de CS un hábito no negociable:

### 1. Bloquea el Tiempo

**Elige un día y hora específicos.** La mayoría de los fundadores en solitario eligen:

- **Lunes por la mañana** (9-11am) — Empezar la semana con claridad de CS
- **Viernes por la tarde** (2-5pm) — Terminar la semana preparando las acciones de la próxima

**Agrégalo a tu calendario como evento recurrente.** Trátalo como una reunión con cliente — no negociable.

<RangeSlider
  label="¿Qué tan seguro estás de que realmente harás esto semanalmente?"
  min={1}
  max={10}
  lowLabel="No muy seguro"
  highLabel="Muy seguro"
  persistKey="retention-L8-confidence"
/>

### 2. Prepara Tus Herramientas

**Antes de tu primer Bloque de Revisión de CS, configura:**

- Dashboard de puntaje de salud (hoja de cálculo o herramienta)
- Plantillas de email de reactivación (de la Lección 5)
- Plantillas de contacto de expansión (de esta lección)
- Documento de registro de CS (Notion, Google Doc, hoja de cálculo)

**Durante la revisión, deberías estar ejecutando, no construyendo.**

### 3. Usa un Checklist

**Imprime o guarda este checklist en favoritos:**

<InteractiveChecklist
title="Checklist del Bloque de Revisión Semanal de CS"
persistKey="retention-L8-checklist"
items={[
"Revisión de Puntaje de Salud: Señalar cuentas Rojas, Amarillas y listas para expansión (30 min)",
"Cola de Reactivación: Enviar nudges a usuarios dormidos (30 min)",
"Pipeline de Expansión: Identificar y contactar oportunidades de upsell (30 min)",
"Revisión de Feedback: Escanear NPS, tickets de soporte, encuestas de salida buscando patrones (30 min)",
"Ejecutar Top 3: Completar las 3 acciones de mayor prioridad (30 min)",
"Documentar Patrones: Actualizar registro de CS con aprendizajes de esta semana (30 min)"
]}
/>

### 4. Rastrea Tu Racha

**Gamifícalo:** Rastrea cuántas semanas consecutivas completas el Bloque de Revisión de CS.

**Por qué funciona:** Las rachas crean impulso. Después de 4 semanas, se vuelve automático. Después de 12 semanas, es un hábito.

<TimedChallenge
title="Ejercicio Rápido de Priorización"
persistKey="retention-L8-drill"
timeLimit={90}
items={[
{ id: "1", prompt: "Cliente A: $600/mes, puntaje de salud bajó de 85 a 55, sin login en 12 días", correctAnswer: "urgent", explanation: "Alto valor + zona Amarilla + inactividad = intervención urgente" },
{ id: "2", prompt: "Cliente B: $80/mes, puntaje de salud 90, usando 8 de 10 asientos", correctAnswer: "schedule", explanation: "Baja urgencia pero buena señal de expansión — agregar al Top 3 de esta semana" },
{ id: "3", prompt: "Cliente C: $40/mes, puntaje de salud 45, sin login en 25 días", correctAnswer: "automate", explanation: "Bajo valor + zona Roja = secuencia de rescate automatizada, no contacto personal" },
{ id: "4", prompt: "Cliente D: $300/mes, pago falló ayer", correctAnswer: "urgent", explanation: "Alto valor + fallo de pago = dunning inmediato + seguimiento personal" },
{ id: "5", prompt: "Cliente E: $100/mes, puntaje NPS 9, antigüedad 6 meses", correctAnswer: "schedule", explanation: "Señal positiva + valor medio = oportunidad de expansión, no urgente" }
]}
/>

## Ejemplos Reales de Bloques de Revisión de CS

Veamos cómo se ve esto en la práctica.

<ExampleCard label="El Bloque de Revisión de Valentina (SaaS, 80 clientes)">

**Lunes, 9:00-11:30am**

**9:00-9:30 — Revisión de Puntaje de Salud:**

- 3 clientes bajaron a Amarillo (puntaje de salud 50-74)
- 1 cliente cayó a Rojo (puntaje de salud 35)
- 5 clientes en Verde con señales de expansión (usando 80%+ de límites del plan)

**9:30-10:00 — Cola de Reactivación:**

- 4 clientes a 7-10 días de inactividad → enviado Email 1 de secuencia de reactivación
- 2 clientes a 14 días → enviado Email 2
- 1 cliente a 21 días → escalado a mensaje de video personal por WhatsApp (cuenta de alto valor)

**10:00-10:30 — Pipeline de Expansión:**

- Enviado email de "¿Listo para subir de nivel?" a 3 clientes usando 80%+ de asientos
- Agendada llamada con 1 cliente que respondió preguntando sobre el plan Pro

**10:30-11:00 — Revisión de Feedback:**

- Revisadas 2 respuestas de NPS (ambas 9s) → agregadas al banco de testimonios
- Revisadas 3 encuestas de salida → notado patrón: "Me olvidé de usarlo" (agregado email de resumen semanal al roadmap)

**11:00-11:30 — Ejecutar Top 3:**

1. Llamó al cliente Rojo ($400/mes) → descubrió que estaba frustrado con un bug → lo arregló, el cliente se quedó
2. Envió pitch de expansión al cliente de $300/mes a 9 de 10 asientos → mejoró al plan ilimitado
3. Actualizó email de onboarding para enfatizar el resumen semanal (previene abandono por "me olvidé de usarlo")

**11:30-12:00 — Documentar Patrones:**

- Registrado: "Los clientes Amarillos esta semana eran todos de 6+ meses de antigüedad en plan Básico — necesitan nudges proactivos de upgrade"
- Registrado: "Rescate de cliente Rojo vía arreglo de bug — necesitamos SLA de respuesta de soporte más rápido"

</ExampleCard>

<ExampleCard label="El Bloque de Revisión de Carlos (Coaching, 35 clientes)">

**Viernes, 2:00-4:30pm**

**2:00-2:30 — Revisión de Puntaje de Salud:**

- 2 clientes bajaron a Amarillo (faltaron 2 sesiones consecutivas)
- 1 cliente en Rojo (sin contacto en 3 semanas)
- 3 clientes en Verde con señales de expansión (completaron programa, preguntando sobre siguiente nivel)

**2:30-3:00 — Cola de Reactivación:**

- Envió WhatsApp "Noté que faltaste a nuestra última sesión" a 2 clientes Amarillos
- Llamó a cliente Rojo → dejó mensaje de voz + envió email con oferta de pausa

**3:00-3:30 — Pipeline de Expansión:**

- Envió email "¿Listo para el programa avanzado?" a 3 clientes Verdes
- 1 respondió sí → agendó llamada de inscripción

**3:30-4:00 — Revisión de Feedback:**

- Revisó notas de sesiones de esta semana → notó 4 clientes luchando con el mismo concepto (agregó video de entrenamiento bonus)
- Revisó encuesta de salida de cliente que abandonó → logró su objetivo y se graduó (abandono bueno)

**4:00-4:30 — Ejecutar Top 3:**

1. Llamó a cliente Amarillo que respondió al WhatsApp de reactivación → reagendó sesiones perdidas
2. Envió pitch de inscripción a cliente listo para expansión
3. Grabó video de entrenamiento bonus sobre el concepto con el que 4 clientes luchaban

**4:30-5:00 — Documentar Patrones:**

- Registrado: "Clientes que faltan 2 sesiones seguidas tienen 60% de riesgo de abandono — necesito nudge automatizado por WhatsApp al faltar 1 sesión"
- Registrado: "Pitch de expansión funciona mejor después de completar programa + feedback positivo"

</ExampleCard>

## Errores Comunes (y Cómo Evitarlos)

<SwipeDecision
title="Bloque de Revisión de CS: ¿Buena Práctica o Mala Práctica?"
description="Desliza a la derecha para buenas prácticas, a la izquierda para malas prácticas"
optionA="Mala Práctica"
optionB="Buena Práctica"
persistKey="retention-L8-swipe"
cards={[
{ id: "1", content: "Pasar 3 horas revisando el puntaje de salud de cada cliente en detalle", correctOption: "a", explanation: "Demasiado lento. Enfócate en cambios de zona (Verde→Amarillo, Amarillo→Rojo) y señales de expansión." },
{ id: "2", content: "Elegir 3 acciones de alto impacto y ejecutarlas esta semana", correctOption: "b", explanation: "La regla del 'Top 3' asegura que realmente ejecutes en lugar de crear listas de tareas infinitas." },
{ id: "3", content: "Saltar el Bloque de Revisión de CS cuando estás ocupado con adquisición de nuevos clientes", correctOption: "a", explanation: "La retención se compone. Saltar revisiones de CS te cuesta más a largo plazo que perder unas horas de adquisición." },
{ id: "4", content: "Documentar patrones y aprendizajes en un registro de CS después de cada revisión", correctOption: "b", explanation: "Tu registro de CS se convierte en conocimiento institucional y entrena futuras contrataciones." },
{ id: "5", content: "Intentar rescatar a cada cliente Rojo, incluso los de bajo valor", correctOption: "a", explanation: "Usa la matriz de Urgencia x Valor. Automatiza rescates de bajo valor, enfoca esfuerzo personal en alto valor." },
{ id: "6", content: "Revisar NPS y feedback de encuestas de salida buscando patrones", correctOption: "b", explanation: "El feedback revela problemas sistémicos que puedes arreglar para todos los futuros clientes." }
]}
/>

## Tu Primer Bloque de Revisión de CS (Esta Semana)

Hagamos esto real. Vas a agendar y ejecutar tu primer Bloque de Revisión de CS esta semana.

<TemplateBuilder
title="Mi Plan del Primer Bloque de Revisión de CS"
persistKey="retention-L8-plan"
sections={[
{
id: "schedule",
title: "Agenda",
fields: [
{ id: "day", label: "¿Qué día harás tu Bloque de Revisión de CS?", placeholder: "ej., Lunes", type: "text" },
{ id: "time", label: "¿A qué hora?", placeholder: "ej., 9:00am-11:30am", type: "text" },
{ id: "recurring", label: "¿Cómo lo harás recurrente?", placeholder: "ej., Evento de calendario, recordatorio, compañero de accountability", type: "textarea" }
]
},
{
id: "tools",
title: "Configuración de Herramientas",
fields: [
{ id: "health", label: "¿Dónde está tu dashboard de puntaje de salud?", placeholder: "ej., Google Sheets, Baremetrics, tracking manual", type: "text" },
{ id: "reactivation", label: "¿Dónde están tus plantillas de email de reactivación?", placeholder: "ej., Brevo, Gmail borradores, Notion", type: "text" },
{ id: "log", label: "¿Dónde mantendrás tu registro de CS?", placeholder: "ej., Notion, Google Doc, hoja de cálculo", type: "text" }
]
},
{
id: "commitment",
title: "Compromiso",
fields: [
{ id: "why", label: "¿Por qué esto te importa?", placeholder: "ej., Estoy perdiendo $500/mes en abandono prevenible", type: "textarea" },
{ id: "accountability", label: "¿Cómo te mantendrás accountable?", placeholder: "ej., Compartir racha con compañero de accountability, rastrear en app de hábitos", type: "textarea" }
]
}
]}
/>

## Resumen: El Ritual de Retención que se Compone

El Bloque de Revisión Semanal de CS no es glamoroso. No es un hack. No es una herramienta.

Es una **disciplina.**

Pero es la disciplina que separa a los fundadores en solitario con 3% de abandono mensual de los que tienen 8%. En 12 meses, esa diferencia de 5 puntos es la diferencia entre crecimiento y estancamiento.

**El efecto compuesto:**

- Semana 1: Atrapas 1 cliente en riesgo antes de que abandone
- Semana 4: Has atrapado 4 clientes + identificado 2 oportunidades de expansión
- Semana 12: Has salvado $2,000 en MRR + agregado $1,500 en MRR de expansión
- Semana 24: Tu tasa de abandono ha bajado del 6% al 4%, tu NRR está por encima del 100%, y tienes un playbook de CS que funciona en piloto automático

**El ritual:**

1. Bloquea 2-3 horas cada semana (mismo día, misma hora)
2. Sigue la agenda de 6 pasos (revisión de salud → reactivación → expansión → feedback → Top 3 → documentar)
3. Usa la matriz de Urgencia x Valor para priorizar
4. Ejecuta tus Top 3 acciones esta semana
5. Rastrea tu racha

<InteractiveChecklist
title="Tus Elementos de Acción del Bloque de Revisión de CS"
persistKey="retention-L8-actions"
items={[
"Agenda tu primer Bloque de Revisión de CS (día + hora) y agrégalo a tu calendario",
"Configura tus herramientas de Revisión de CS (dashboard de salud, plantillas de reactivación, registro de CS)",
"Completa tu primer Bloque de Revisión de CS esta semana usando el checklist de 6 pasos",
"Documenta tus aprendizajes en tu registro de CS",
"Comprométete a una racha de 4 semanas (rastréala visiblemente)"
]}
/>

Próxima lección: **Recetas de Automatización que Ejecutan la Retención Sin Ti** — cómo conectar los insights del Bloque de Revisión de CS en flujos de trabajo automatizados que te ahorran horas mientras previenen el abandono.
