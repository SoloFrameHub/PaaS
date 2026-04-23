---
title: "Nudges de adopción de funcionalidades"
duration: "45 min"
track: "Éxito del Cliente"
course: "Curso 37: Retención y Prevención de Abandono"
lesson: 6
---

# Nudges de adopción de funcionalidades

## La funcionalidad de $2,400 que nadie sabía que existía

Valentina manejaba una herramienta de gestión de proyectos para agencias creativas. Pasó tres meses construyendo una funcionalidad de "Portal de Clientes" que permitía a las agencias compartir actualizaciones de proyectos con sus clientes — eliminando los interminables correos de "¿cuál es el estatus?" que plagaban a sus usuarios.

La lanzó con un banner de anuncio. 200 clientes lo vieron. 12 hicieron clic. 3 realmente lo usaron.

Seis meses después, estaba revisando datos de abandono y notó algo impactante: **cada cliente que usó la funcionalidad de Portal de Clientes seguía pagando. Cero abandono.** Mientras tanto, los clientes que solo usaban la gestión básica de tareas? 8% de abandono mensual.

Hizo los cálculos: si pudiera lograr que solo 50 clientes más adoptaran el Portal de Clientes, retendría $2,400/mes extra en MRR. Eso es $28,800/año. De una funcionalidad que ya existía.

El problema no era la funcionalidad. Era que **nadie sabía que existía, por qué importaba, o cuándo usarla.**

Esta lección se trata de arreglar esa brecha — sistemáticamente.

---

## Por qué adopción de funcionalidades = seguro de retención

<InsightCard icon="🔒" title="El multiplicador de costos de cambio">
Un cliente que usa 1 funcionalidad puede cambiarse a un competidor en 10 minutos. Un cliente que usa 3+ funcionalidades tiene flujos de trabajo, datos y hábitos atados. El costo de cambio pasa de cero a "esto me tomaría una semana recrear."
</InsightCard>

Aquí están los datos de retención que importan:

<FlipCard
  front="Usuarios de una sola funcionalidad"
  back="Abandonan a una tasa 2-3x mayor que los usuarios de múltiples funcionalidades. Ven tu producto como un commodity — fácilmente reemplazable."
/>

<FlipCard
  front="Usuarios de 3+ funcionalidades"
  back="Abandonan 50-70% menos. Han integrado tu producto en múltiples flujos de trabajo. Cambiarse significa reentrenar a su equipo."
/>

La verdad brutal: **el 60% de las funcionalidades SaaS no son usadas por el cliente promedio.** No porque sean malas — sino porque los clientes no saben que existen, no entienden el valor, o nunca llegan al momento donde las descubrirían naturalmente.

Tu trabajo no es construir más funcionalidades. Es **lograr que los clientes usen las funcionalidades que ya crean adhesión.**

<RangeSlider
  label="¿Qué % de tus funcionalidades usa el cliente promedio?"
  min={10}
  max={100}
  lowLabel="10% (la mayoría sin usar)"
  highLabel="100% (todas las funcionalidades)"
  persistKey="retention-L6-feature-usage"
/>

---

## El embudo de adopción de funcionalidades (y dónde se rompe)

La mayoría de las funcionalidades mueren en **Awareness** — los clientes no saben que existe. Las que sobreviven Awareness frecuentemente mueren en **Prueba** — los clientes saben que existe pero nunca la prueban.

Aquí está el embudo completo:

<SlideNavigation>
<Slide title="Etapa 1: Awareness">

**El problema:** Tu cliente no tiene idea de que la funcionalidad existe.

**Por qué pasa:**

- Enterrada en configuraciones o un submenú
- Lanzada con un solo email que el 40% de los clientes nunca abrió
- Sin mecanismo de descubrimiento en la app

**La solución:** Nudges de awareness multicanal en el momento correcto.

</Slide>

<Slide title="Etapa 2: Prueba">

**El problema:** El cliente sabe que existe pero no la ha probado.

**Por qué pasa:**

- Propuesta de valor poco clara ("¿Qué hace esto realmente por mí?")
- Complejidad percibida ("Esto parece difícil de configurar")
- Sin momento detonante ("No necesito esto ahora")

**La solución:** Nudges contextuales ligados al comportamiento del usuario + prueba de baja fricción.

</Slide>

<Slide title="Etapa 3: Adopción">

**El problema:** El cliente la probó una vez, nunca regresó.

**Por qué pasa:**

- No vio valor inmediato
- Fricción en el flujo de trabajo
- Se olvidó de que existía después del primer uso

**La solución:** Nudges de construcción de hábitos + refuerzo visible del valor.

</Slide>

<Slide title="Etapa 4: Uso habitual">

**El problema:** El cliente la usa ocasionalmente, no consistentemente.

**Por qué pasa:**

- No integrada en el flujo de trabajo diario
- Compitiendo con herramientas/hábitos existentes
- Sin sistema de recordatorio

**La solución:** Integración en flujo de trabajo + estímulo disparado por uso.

</Slide>
</SlideNavigation>

<ExampleCard label="Caso de estudio: El umbral de 3 funcionalidades">
Una herramienta de analítica B2B rastreó la retención por uso de funcionalidades. Los clientes que solo usaban el dashboard: 7% de abandono mensual. Los que usaban dashboard + reportes: 4% de abandono. Los que usaban dashboard + reportes + integraciones: **1.5% de abandono**.

La empresa cambió todo su onboarding para empujar a los usuarios hacia esas 3 funcionalidades dentro de los primeros 14 días. El abandono bajó de 6% a 3.2% en 6 meses.
</ExampleCard>

---

## Identificando tus "funcionalidades pegajosas"

No todas las funcionalidades son iguales. Algunas funcionalidades, cuando se adoptan, reducen dramáticamente el abandono. Otras son nice-to-haves que no mueven la aguja de retención.

Tu primer trabajo: **descubrir qué funcionalidades realmente crean adhesión.**

### El análisis de funcionalidades pegajosas

<TemplateBuilder
title="Identificador de funcionalidades pegajosas"
persistKey="retention-L6-sticky-features"
sections={[
{
id: "feature-list",
title: "Inventario de funcionalidades",
fields: [
{ id: "feature1", label: "Nombre de funcionalidad 1", placeholder: "ej., Portal de Clientes", type: "text" },
{ id: "feature1-adoption", label: "% estimado de clientes que la usan", placeholder: "ej., 15%", type: "text" },
{ id: "feature2", label: "Nombre de funcionalidad 2", placeholder: "ej., Reportes automatizados", type: "text" },
{ id: "feature2-adoption", label: "% estimado de clientes que la usan", placeholder: "ej., 40%", type: "text" },
{ id: "feature3", label: "Nombre de funcionalidad 3", placeholder: "ej., Integración con WhatsApp", type: "text" },
{ id: "feature3-adoption", label: "% estimado de clientes que la usan", placeholder: "ej., 8%", type: "text" }
]
},
{
id: "hypothesis",
title: "Hipótesis de adhesión",
fields: [
{ id: "sticky-feature", label: "¿Qué funcionalidad crees que crea más adhesión?", placeholder: "ej., Portal de Clientes — porque involucra a sus clientes, creando dependencia externa", type: "textarea" },
{ id: "validation-plan", label: "¿Cómo vas a validar esto?", placeholder: "ej., Comparar tasa de abandono de usuarios que adoptaron esta funcionalidad vs. los que no", type: "textarea" }
]
}
]}
/>

### El método de validación rápida (Sin herramienta de analítica necesaria)

Si no tienes analítica de producto sofisticada, aquí está la versión manual:

1. **Exporta tu lista de clientes** con MRR y fecha de registro
2. **Etiqueta cada cliente** con las funcionalidades que usa (revisa tu base de datos o pregunta a tu equipo de soporte)
3. **Segmenta en dos grupos**: clientes que abandonaron en los últimos 90 días vs. clientes aún activos después de 6+ meses
4. **Compara el uso de funcionalidades** entre los dos grupos

Las funcionalidades que aparecen mucho más frecuentemente en el grupo "aún activo"? Esas son tus funcionalidades pegajosas.

<InsightCard icon="📊" title="La regla del 2x">
Si una funcionalidad es usada por el 60% de los clientes retenidos pero solo el 20% de los que abandonaron, eso es una diferencia de 3x — una fuerte señal de adhesión. Prioriza empujar a todos hacia esa funcionalidad.
</InsightCard>

---

## La estrategia de introducción progresiva de funcionalidades

Esto es lo que **no funciona**: lanzarle todas tus funcionalidades al cliente el Día 1.

Esto es lo que **sí funciona**: introducir funcionalidades progresivamente, ligadas a la preparación y el contexto del cliente.

### El cronograma de 30 días

<SlideNavigation>
<Slide title="Día 1-3: Solo funcionalidad principal">

**Meta:** Lograr que el cliente tenga su primera victoria con la funcionalidad principal absoluta.

**Por qué:** Carga cognitiva. Si les muestras 10 funcionalidades, usarán cero. Si les muestras 1, la dominarán.

**Ejemplo de nudge:** "¡Bienvenido! Vamos a hacer tu primera [acción principal] en los próximos 5 minutos."

</Slide>

<Slide title="Día 7: Introducción de segunda funcionalidad">

**Meta:** Introducir una funcionalidad complementaria que se construye sobre el flujo de trabajo principal.

**Disparador:** El cliente ha completado 3+ acciones principales.

**Ejemplo de nudge:** "Has creado 5 proyectos — ¡muy bien! ¿Sabías que puedes automatizar las actualizaciones de estatus con nuestra funcionalidad de Reportes? Así se hace →"

</Slide>

<Slide title="Día 14: Introducción de tercera funcionalidad">

**Meta:** Introducir una funcionalidad que resuelve un punto de dolor que probablemente han encontrado para este punto.

**Disparador:** El cliente ha usado el producto 5+ veces.

**Ejemplo de nudge:** "Notamos que estás actualizando clientes manualmente. Nuestro Portal de Clientes les permite revisar el estatus ellos mismos — te ahorra 2 horas/semana. ¿Quieres probarlo?"

</Slide>

<Slide title="Día 30: Funcionalidades avanzadas">

**Meta:** Introducir funcionalidades avanzadas para usuarios comprometidos.

**Disparador:** El cliente está en el top 30% de uso.

**Ejemplo de nudge:** "¡Eres un power user! Aquí hay 3 funcionalidades avanzadas que la mayoría de los clientes no descubren hasta el mes 3: [lista]. ¿Cuál te ayudaría más?"

</Slide>

<Slide title="Día 60+: Funcionalidades de expansión">

**Meta:** Introducir funcionalidades ligadas a upsells o integraciones.

**Disparador:** El cliente ha adoptado 3+ funcionalidades y está en zona "Verde" de salud.

**Ejemplo de nudge:** "Estás obteniendo excelentes resultados con [producto]. ¿Listo para el siguiente nivel? Nuestra [funcionalidad premium] ayuda a clientes como tú a [resultado específico]."

</Slide>
</SlideNavigation>

<InsightCard icon="⏱️" title="La regla de 1 por semana">
Nunca introduzcas más de 1 funcionalidad nueva por semana vía email. Más que eso crea "fatiga de funcionalidades" — los clientes se desconectan y se pierden todo.
</InsightCard>

---

## Tipos de nudge: In-app vs. Email vs. Contextual

Diferentes canales de nudge funcionan para diferentes etapas de adopción.

### Efectividad del canal por etapa

<ClassifyExercise
title="Empareja el nudge con la etapa"
persistKey="retention-L6-nudge-matching"
categories={[
{ id: "awareness", label: "Mejor para awareness", color: "#3b82f6" },
{ id: "trial", label: "Mejor para prueba", color: "#f59e0b" },
{ id: "adoption", label: "Mejor para adopción", color: "#10b981" }
]}
items={[
{
id: "1",
content: "Tooltip in-app que aparece cuando el usuario pasa sobre un elemento del menú",
correctCategory: "awareness",
explanation: "Los tooltips crean awareness pasivo sin interrumpir el flujo de trabajo"
},
{
id: "2",
content: "Email con video walkthrough de 'Prueba esta funcionalidad en 2 minutos'",
correctCategory: "trial",
explanation: "El email da espacio para explicar el valor y reducir la complejidad percibida"
},
{
id: "3",
content: "Mensaje disparado por uso: 'Acabas de hacer X — ¿sabías que Y lo hace 3x más rápido?'",
correctCategory: "trial",
explanation: "Los nudges contextuales capturan al usuario en el momento perfecto de necesidad"
},
{
id: "4",
content: "Resumen semanal mostrando 'Ahorraste 4 horas esta semana usando [funcionalidad]'",
correctCategory: "adoption",
explanation: "El refuerzo visible del valor construye hábitos"
},
{
id: "5",
content: "Spotlight de funcionalidad en newsletter mensual",
correctCategory: "awareness",
explanation: "Alcance amplio, baja fricción, bueno para descubrimiento"
}
]}
/>

### Los 3 formatos de nudge que funcionan

**1. El nudge "Ya estás haciendo X"**

Mejor para: Etapa de prueba
Canal: In-app o email
Ejemplo: "Notamos que estás exportando reportes manualmente cada semana. Nuestra funcionalidad de Reportes Programados hace esto automáticamente — ¿quieres configurarlo?"

**Por qué funciona:** Liga la nueva funcionalidad a un punto de dolor existente que están experimentando activamente.

**2. El nudge "Pro tip"**

Mejor para: Awareness → Prueba
Canal: Email
Ejemplo: "Pro tip: el 80% de nuestros power users habilitan [funcionalidad] en su primer mes. Aquí está por qué →"

**Por qué funciona:** Prueba social + curiosidad + invitación sin presión.

**3. El nudge "Hito desbloqueado"**

Mejor para: Etapa de adopción
Canal: Celebración in-app
Ejemplo: "Has completado 10 proyectos! Desbloqueaste acceso a nuestro dashboard de Analítica Avanzada. Revísalo →"

**Por qué funciona:** Gamificación + sensación de recompensa + progresión natural.

<ComparisonBuilder
title="Escribe tu nudge de funcionalidad"
persistKey="retention-L6-nudge-draft"
prompt="Elige una de tus funcionalidades pegajosas y escribe un email de nudge 'Ya estás haciendo X' (2-3 oraciones)"
expertExample="Asunto: Ahorra 2 horas/semana en actualizaciones de clientes

Hola [Nombre],

Noté que has estado actualizando clientes manualmente sobre el estatus del proyecto — todos hemos pasado por eso! Nuestra funcionalidad de Portal de Clientes permite que los clientes revisen el progreso ellos mismos, lo cual ahorra a nuestros usuarios como 2 horas por semana.

¿Quieres probarlo? Puedo configurarlo para ti en 5 minutos: [link]"
criteria={[
"Hace referencia a un punto de dolor específico que el cliente está experimentando",
"Cuantifica el beneficio (tiempo ahorrado, esfuerzo reducido)",
"CTA de baja fricción (configuración rápida, prueba, o demo)"
]}
/>

---

## Nudges disparados por uso: El multiplicador de adopción 3x

Los nudges más efectivos no están programados — están **disparados por el comportamiento del usuario.**

### La lógica Disparador → Nudge

<TemplateBuilder
title="Constructor de nudges disparados por uso"
persistKey="retention-L6-trigger-nudges"
sections={[
{
id: "trigger1",
title: "Disparador 1",
fields: [
{ id: "behavior", label: "Comportamiento del usuario que dispara el nudge", placeholder: "ej., Usuario exporta un reporte manualmente por 3ra vez", type: "text" },
{ id: "feature", label: "Funcionalidad a introducir", placeholder: "ej., Reportes programados", type: "text" },
{ id: "nudge-copy", label: "Mensaje del nudge", placeholder: "ej., 'Parece que exportas reportes seguido. ¿Quieres automatizar esto?'", type: "textarea" }
]
},
{
id: "trigger2",
title: "Disparador 2",
fields: [
{ id: "behavior", label: "Comportamiento del usuario que dispara el nudge", placeholder: "ej., Usuario invita a su 3er miembro de equipo", type: "text" },
{ id: "feature", label: "Funcionalidad a introducir", placeholder: "ej., Permisos de equipo", type: "text" },
{ id: "nudge-copy", label: "Mensaje del nudge", placeholder: "ej., 'Tu equipo está creciendo! Configura permisos personalizados para controlar quién ve qué.'", type: "textarea" }
]
}
]}
/>

### Patrones comunes de disparadores

| Comportamiento del usuario         | Funcionalidad a introducir      | Por qué funciona                                                              |
| ---------------------------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| Completa acción principal 5+ veces | Funcionalidad de automatización | Han demostrado que hacen esto regularmente — la automatización es valor obvio |
| Invita 2+ miembros de equipo       | Funcionalidades de colaboración | El tamaño del equipo señala necesidad de herramientas de coordinación         |
| Hace algo manualmente 3+ veces     | Funcionalidad que lo automatiza | Repetición = punto de dolor                                                   |
| Alcanza un hito de uso             | Funcionalidad avanzada/premium  | El engagement señala preparación para complejidad                             |
| Exporta datos                      | Integración o acceso API        | Están tratando de usar datos en otro lugar — facilítaselos                    |

<InsightCard icon="🎯" title="La regla del 3x">
Los nudges disparados por uso tienen 3x la tasa de adopción que las sugerencias no disparadas. ¿Por qué? Porque capturas al cliente en el momento exacto en que necesitan la funcionalidad.
</InsightCard>

---

## El dashboard de adopción de funcionalidades (Qué rastrear)

No necesitas Mixpanel o Amplitude. Una hoja de cálculo simple que rastree 4 métricas por funcionalidad es suficiente.

### Las 4 métricas que importan

<SlideNavigation>
<Slide title="Métrica 1: % de Awareness">

**Qué mide:** % de clientes que saben que la funcionalidad existe

**Cómo rastrearlo:** Encuesta ("¿Sabías que tenemos [funcionalidad]?") o métrica proxy (hizo clic en funcionalidad en menú, abrió página de funcionalidad)

**Meta buena:** 70%+ para funcionalidades principales, 40%+ para funcionalidades avanzadas

</Slide>

<Slide title="Métrica 2: % de Prueba">

**Qué mide:** % de clientes con awareness que probaron la funcionalidad al menos una vez

**Cómo rastrearlo:** Tracking de eventos (funcionalidad usada al menos 1 vez)

**Meta buena:** 40%+ para funcionalidades principales, 20%+ para funcionalidades avanzadas

</Slide>

<Slide title="Métrica 3: % de Adopción">

**Qué mide:** % de usuarios que probaron que usan la funcionalidad regularmente (3+ veces)

**Cómo rastrearlo:** Tracking de eventos (funcionalidad usada 3+ veces en 30 días)

**Meta buena:** 50%+ para funcionalidades pegajosas

</Slide>

<Slide title="Métrica 4: Puntaje de adhesión">

**Qué mide:** Diferencia en tasa de abandono entre usuarios que adoptan esta funcionalidad vs. los que no

**Cómo rastrearlo:** Análisis de cohortes (tasa de abandono de adoptantes vs. no adoptantes)

**Meta buena:** 2x+ de diferencia (ej., 2% de abandono para adoptantes vs. 5% para no adoptantes)

</Slide>
</SlideNavigation>

### La plantilla simple de seguimiento

| Funcionalidad                  | Awareness % | Prueba % | Adopción % | Puntaje de adhesión | Prioridad                 |
| ------------------------------ | ----------- | -------- | ---------- | ------------------- | ------------------------- |
| Portal de Clientes             | 40%         | 20%      | 15%        | Alto (1.5% vs 6%)   | **Empujar awareness**     |
| Reportes programados           | 70%         | 50%      | 30%        | Medio (4% vs 6%)    | Empujar prueba → adopción |
| Integración con Slack/WhatsApp | 60%         | 30%      | 10%        | Bajo (5% vs 6%)     | Investigar: ¿es útil?     |
| Analítica avanzada             | 30%         | 15%      | 10%        | Alto (2% vs 6%)     | **Empujar awareness**     |

**Lógica de prioridad:**

- Alta adhesión + bajo awareness = **empujar awareness agresivamente**
- Alto awareness + baja prueba = **reducir fricción, clarificar valor**
- Alta prueba + baja adopción = **mejorar onboarding o UX de funcionalidad**
- Baja adhesión = **no invertir en nudges; investigar si funcionalidad es valiosa**

<ScenarioSimulator
title="Calculadora de ROI de adopción de funcionalidades"
persistKey="retention-L6-roi-simulator"
levers={[
{ id: "customers", label: "Total de clientes", min: 50, max: 500, step: 10, defaultValue: 200 },
{ id: "currentAdoption", label: "Adopción actual de funcionalidad %", min: 5, max: 50, step: 5, defaultValue: 15 },
{ id: "targetAdoption", label: "Adopción objetivo %", min: 10, max: 80, step: 5, defaultValue: 40 },
{ id: "churnReduction", label: "Reducción de abandono para adoptantes (puntos porcentuales)", min: 1, max: 10, step: 1, defaultValue: 4 },
{ id: "arpu", label: "ARPU ($)", min: 20, max: 500, step: 10, defaultValue: 100 }
]}
outputs={[
{ id: "newAdopters", label: "Nuevos adoptantes", formula: "customers * ((targetAdoption - currentAdoption) / 100)", unit: " clientes", precision: 0 },
{ id: "monthlyMRRSaved", label: "MRR mensual salvado", formula: "(customers * ((targetAdoption - currentAdoption) / 100)) * arpu * (churnReduction / 100)", unit: "$", precision: 0 },
{ id: "annualImpact", label: "Impacto anual", formula: "(customers * ((targetAdoption - currentAdoption) / 100)) * arpu * (churnReduction / 100) * 12", unit: "$", precision: 0 }
]}
insight="Lograr que {newAdopters} clientes más adopten esta funcionalidad ahorraría ${monthlyMRRSaved}/mes en abandono prevenido — eso es ${annualImpact}/año."
/>

---

## Construyendo tu campaña de adopción de funcionalidades de 30 días

Juntemos todo en un plan de ejecución concreto de 30 días.

<TemplateBuilder
title="Tu campaña de adopción de funcionalidades"
persistKey="retention-L6-campaign-plan"
sections={[
{
id: "feature-selection",
title: "Paso 1: Elige tu funcionalidad",
fields: [
{ id: "feature-name", label: "Nombre de la funcionalidad", placeholder: "ej., Portal de Clientes", type: "text" },
{ id: "why-sticky", label: "¿Por qué es pegajosa esta funcionalidad?", placeholder: "ej., Crea dependencia externa (los clientes la usan), reduce trabajo manual", type: "textarea" },
{ id: "current-adoption", label: "Tasa de adopción actual", placeholder: "ej., 15%", type: "text" },
{ id: "target-adoption", label: "Meta de adopción a 30 días", placeholder: "ej., 35%", type: "text" }
]
},
{
id: "awareness-nudges",
title: "Paso 2: Nudges de awareness (Semana 1-2)",
fields: [
{ id: "email-subject", label: "Línea de asunto del email spotlight", placeholder: "ej., 'La funcionalidad que el 80% de los power users habilitan'", type: "text" },
{ id: "email-body", label: "Cuerpo del email (2-3 oraciones + CTA)", placeholder: "Explica valor, muestra prueba social, link a demo", type: "textarea" },
{ id: "inapp-tooltip", label: "Texto del tooltip in-app", placeholder: "ej., 'Nuevo: Deja que los clientes revisen el estatus del proyecto por sí mismos'", type: "text" }
]
},
{
id: "trial-nudges",
title: "Paso 3: Nudges de prueba (Semana 2-3)",
fields: [
{ id: "trigger-behavior", label: "¿Qué comportamiento del usuario dispara el nudge de prueba?", placeholder: "ej., Usuario actualiza un cliente manualmente por 3ra vez", type: "text" },
{ id: "trigger-message", label: "Mensaje del nudge disparado", placeholder: "ej., 'Parece que actualizas clientes seguido. ¿Quieres automatizar esto?'", type: "textarea" },
{ id: "setup-help", label: "¿Cómo reducirás la fricción de configuración?", placeholder: "ej., Video walkthrough de 2 minutos, ofrecerte a configurarlo por ellos", type: "textarea" }
]
},
{
id: "adoption-nudges",
title: "Paso 4: Nudges de adopción (Semana 3-4)",
fields: [
{ id: "value-reinforcement", label: "¿Cómo mostrarás valor visible?", placeholder: "ej., Email semanal: 'Ahorraste 3 horas esta semana usando Portal de Clientes'", type: "textarea" },
{ id: "habit-building", label: "¿Qué mecanismo de construcción de hábitos usarás?", placeholder: "ej., Resumen diario mostrando actividad de clientes, hito de gamificación", type: "textarea" }
]
}
]}
/>

---

## Errores comunes de adopción de funcionalidades (y cómo evitarlos)

<SwipeDecision
title="¿Buen nudge o mal nudge?"
description="Desliza a la derecha para nudges efectivos, a la izquierda para inefectivos"
optionA="Mal nudge"
optionB="Buen nudge"
persistKey="retention-L6-nudge-quality"
cards={[
{
id: "1",
content: "Asunto: ¡Conoce nuestra nueva funcionalidad!\n\nCuerpo: Acabamos de lanzar [funcionalidad]. Haz clic aquí para saber más.",
correctOption: "a",
explanation: "Demasiado vago. Sin propuesta de valor, sin contexto, sin razón para importarle. Tasa de apertura: ~5%."
},
{
id: "2",
content: "Asunto: Ahorra 2 horas/semana en actualizaciones de clientes\n\nCuerpo: Noté que actualizas clientes manualmente con frecuencia. Nuestro Portal de Clientes automatiza esto — los clientes revisan el estatus por sí mismos. ¿Quieres probarlo?",
correctOption: "b",
explanation: "Punto de dolor específico, beneficio cuantificado, CTA de baja fricción. Tasa de apertura: ~30%."
},
{
id: "3",
content: "Modal in-app que bloquea toda la pantalla: '¡Prueba nuestras 15 nuevas funcionalidades!'",
correctOption: "a",
explanation: "Interrumpe el flujo de trabajo, abrumador, crea fatiga de funcionalidades. Tasa de adopción: &lt;5%."
},
{
id: "4",
content: "Acabas de exportar un reporte por 3ra vez. [Aparece tooltip] '¿Quieres automatizar esto? Configura Reportes Programados →'",
correctOption: "b",
explanation: "Contextual, disparado por comportamiento, resuelve dolor inmediato. Tasa de adopción: ~25%."
},
{
id: "5",
content: "Newsletter mensual con 10 actualizaciones de funcionalidades enterradas en el párrafo 5",
correctOption: "a",
explanation: "Perdido en el ruido, sin priorización, sin CTA claro. Tasa de adopción: &lt;2%."
}
]}
/>

### Los 5 pecados capitales de los nudges de funcionalidades

1. **El volcado de funcionalidades** — Introducir 5+ funcionalidades a la vez. Resultado: el cliente no prueba ninguna.
2. **La trampa de la jerga** — "¡Habilita nuestro dashboard de analítica predictiva con ML!" Traducción: nadie sabe qué significa eso.
3. **La bomba de interrupción** — Modales de pantalla completa que bloquean el flujo de trabajo. Resultado: el cliente lo cierra y nunca lo ve de nuevo.
4. **El error de timing** — Introducir funcionalidades avanzadas a clientes nuevos. Resultado: abrumamiento y abandono.
5. **El nudge invisible** — Enterrar anuncios de funcionalidades en una newsletter mensual. Resultado: 2% de lectura.

---

## Tu plan de acción de adopción de funcionalidades

<InteractiveChecklist
title="Sprint de adopción de funcionalidades de 30 días"
persistKey="retention-L6-action-items"
items={[
"Identifica tus 3 funcionalidades más pegajosas (mayor reducción de abandono para adoptantes)",
"Construye una hoja de seguimiento de adopción de funcionalidades (Awareness %, Prueba %, Adopción %, Puntaje de adhesión)",
"Elige 1 funcionalidad para enfocarte los próximos 30 días",
"Escribe 3 emails de nudge: Awareness (Semana 1), Prueba (Semana 2), Adopción (Semana 3)",
"Configura 2 nudges disparados por uso (in-app o email) ligados a comportamiento del cliente",
"Crea un video demo de 2 minutos o walkthrough de la funcionalidad",
"Programa revisión semanal: rastrea adopción %, ajusta nudges basado en respuesta",
"Mide resultados al Día 30: aumento en tasa de adopción, impacto en abandono, MRR salvado"
]}
/>

---

## Qué sigue

Has construido tu sistema de adopción de funcionalidades. Siguiente lección: **Jugadas de salvamento — Downgrades, pausas y llamadas de recuperación.** Cuando un cliente señala intención de cancelar, tienes 3 opciones que son todas mejores que perderlo completamente. Vamos a construir los guiones, árboles de decisión y automatización que convierten solicitudes de cancelación en victorias de retención.

---

```json
{
  "quiz": {
    "title": "Verificación de dominio de adopción de funcionalidades",
    "questions": [
      {
        "id": "q1",
        "question": "Un cliente que usa 3+ funcionalidades abandona a qué tasa comparado con usuarios de una sola funcionalidad?",
        "options": [
          "10-20% menos",
          "30-40% menos",
          "50-70% menos",
          "La misma tasa"
        ],
        "correctAnswer": 2,
        "explanation": "Los usuarios de múltiples funcionalidades abandonan 50-70% menos porque han integrado tu producto en múltiples flujos de trabajo, creando altos costos de cambio."
      },
      {
        "id": "q2",
        "question": "¿Qué % de las funcionalidades SaaS no son usadas por el cliente promedio?",
        "options": ["20%", "40%", "60%", "80%"],
        "correctAnswer": 2,
        "explanation": "El 60% de las funcionalidades SaaS no se usan — no porque sean malas, sino porque los clientes no saben que existen o no entienden su valor."
      },
      {
        "id": "q3",
        "question": "¿Cuándo deberías introducir funcionalidades avanzadas a un cliente nuevo?",
        "options": [
          "Día 1 (mostrar todo desde el inicio)",
          "Día 7 (después de dominar la funcionalidad principal)",
          "Día 30 (después de que estén comprometidos)",
          "Nunca (dejar que descubran solos)"
        ],
        "correctAnswer": 2,
        "explanation": "Día 30+ es óptimo para funcionalidades avanzadas. Introdúcelas después de que el cliente haya adoptado 2-3 funcionalidades principales y demostrado engagement."
      },
      {
        "id": "q4",
        "question": "Los nudges disparados por uso tienen qué tasa de adopción comparado con nudges no disparados?",
        "options": ["La misma tasa", "1.5x mayor", "3x mayor", "10x mayor"],
        "correctAnswer": 2,
        "explanation": "Los nudges disparados por uso tienen 3x la tasa de adopción porque capturan a los clientes en el momento exacto en que necesitan la funcionalidad."
      },
      {
        "id": "q5",
        "question": "Tu funcionalidad tiene alta adhesión (2% de abandono para adoptantes vs 6% para no adoptantes) pero solo 20% de awareness. ¿Cuál es tu prioridad?",
        "options": [
          "Mejorar la UX de la funcionalidad",
          "Empujar awareness agresivamente",
          "Enfocarse en una funcionalidad diferente",
          "Esperar descubrimiento orgánico"
        ],
        "correctAnswer": 1,
        "explanation": "Alta adhesión + bajo awareness = oportunidad masiva. Empuja awareness agresivamente — cada nuevo adoptante reduce dramáticamente el abandono."
      }
    ]
  }
}
```
