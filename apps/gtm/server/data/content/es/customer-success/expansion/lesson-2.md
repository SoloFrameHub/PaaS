---
title: "Triggers de expansión basados en uso (SaaS)"
duration: "50 min"
track: "Éxito del cliente"
course: "Curso 38: Expansión y Upsell"
lesson: 2
---

## El email de $18K que nunca se envió

Marco tenía un SaaS de gestión de proyectos con $12K MRR. Un martes, notó algo en su analítica: un cliente había creado 47 proyectos en los últimos 30 días. ¿Su límite del plan? 50 proyectos.

Tenía la intención de contactarlo. Lo agregó a su lista de pendientes. Se ocupó con un bug del producto.

Tres días después, el cliente chocó con el muro. No podía crear proyectos nuevos. Abrió un ticket de soporte, frustrado. Para cuando Marco respondió con una opción de upgrade, ya habían empezado a evaluar competidores.

Se fueron dos semanas después.

Las cuentas: ese cliente pagaba $149/mes (aprox. MXN $2,700). El plan Pro que necesitaban costaba $299/mes (aprox. MXN $5,400). Durante su vida proyectada de 12 meses, Marco perdió $1,800 en ingresos de expansión. Perdió los $1,788 completos de ingresos base cuando se fueron. Y perdió la referencia que habrían dado (valuada en unos $14K estimados basado en su patrón promedio de adquisición de clientes).

**Costo total de no tener un sistema de triggers de uso: $18K.**

Lo irónico: su producto ya rastreaba los datos. Simplemente no los estaba monitoreando sistemáticamente.

<InsightCard icon="📊" title="El insight clave">
Los triggers de expansión basados en uso son **señales objetivas** de que un cliente está listo para (y se beneficiaría de) un upgrade. No necesitas adivinar. No necesitas "tantear." El producto te dice exactamente cuándo iniciar la conversación.
</InsightCard>

## ¿Qué hace que un trigger sea "basado en uso"?

Los triggers de uso son comportamientos específicos y medibles del producto que indican preparación para la expansión. Son diferentes de los triggers de resultados (que cubriremos en la Lección 3) porque están vinculados a **cómo el cliente usa el producto**, no a qué resultados logra.

<FlipCard
  front="Definición de trigger de uso"
  back="Un patrón medible de uso del producto que indica que un cliente se beneficiaría de (y probablemente compraría) un plan de nivel superior o capacidad adicional."
/>

Las características clave:

1. **Objetivo** — No requiere interpretación. "Usó 42 de 50 licencias" es objetivo. "Parece que están creciendo" no lo es.
2. **Medible** — Puedes rastrearlo en tu base de datos, analítica o sistema de facturación
3. **Predictivo** — Históricamente correlaciona con upgrades exitosos
4. **Oportuno** — Se activa antes de la frustración, no después de que el cliente choque con el muro

<RangeSlider
  label="¿Qué tan sistemáticamente rastreas patrones de uso para oportunidades de expansión actualmente?"
  min={1}
  max={10}
  lowLabel="Nada en absoluto"
  highLabel="Totalmente automatizado"
  persistKey="expansion-L2-tracking-current"
/>

## Los 5 triggers de uso para SaaS

Desglosemos los cinco triggers de expansión basados en uso más confiables. Estos funcionan en prácticamente cualquier modelo de negocio SaaS.

<SlideNavigation>
<Slide title="Trigger 1: Acercamiento al límite del plan">

### La regla del 80%

Cuando un cliente alcanza el **80% de cualquier límite del plan** — licencias, almacenamiento, llamadas API, proyectos, contactos — es el momento óptimo para iniciar una conversación de expansión.

**¿Por qué 80% y no 100%?**

- Al 80%, todavía tienen margen de maniobra. La conversación se siente útil, no desesperada.
- Al 100%, están frustrados. Estás reaccionando a un problema en vez de prevenirlo.
- Tasas de conversión: 40-60% en el umbral del 80% vs. 15-25% después de chocar con el muro.

**Método de detección:**

- **SaaS con facturación basada en uso:** Tu sistema de facturación (Stripe, Chargebee) ya rastrea esto
- **SaaS basado en licencias:** Cuenta usuarios activos vs. límite del plan en tu base de datos
- **Límites de API/almacenamiento:** Rastrea vía tu monitoreo de infraestructura

**Ejemplos de alertas de umbral:**

- Licencias: 4 de 5 licencias ocupadas
- Almacenamiento: 8GB de 10GB usados
- Llamadas API: 80,000 de 100,000 llamadas mensuales consumidas
- Proyectos: 40 de 50 proyectos creados

<ExampleCard label="Ejemplo real: La agencia de diseño">
Una herramienta de colaboración de diseño notó que un cliente tenía 4 de 5 licencias. Enviaron este email:

_"Hola Carolina — noté que tu equipo está usando 4 de sus 5 licencias en el plan Pro. Cuando incorpores a tu próximo diseñador, vas a querer asegurarte de que también tenga acceso. Nuestro plan Team te da 15 licencias a $X/mes (sale a $Y por licencia vs. $Z en Pro). ¿Quieres que lo configure para ti?"_

**Resultado:** La clienta hizo upgrade en 24 horas. Sin fricción, sin venta agresiva. Solo un timing perfecto.
</ExampleCard>

</Slide>

<Slide title="Trigger 2: Descubrimiento de funciones avanzadas">

### Cuando intentan usar lo que no pueden tener

Este trigger se activa cuando un cliente intenta repetidamente usar una función que está restringida detrás de un plan superior.

**Escenarios comunes:**

- Intentar exportar datos en un formato solo disponible en Pro
- Intentar crear una automatización que requiere el plan Business
- Hacer clic en "Analítica Avanzada" 3+ veces
- Intentar agregar una integración más allá del límite de su plan

**Método de detección:**

- Rastrea interacciones con puertas de funciones en tu analítica de producto (Mixpanel, Amplitude, PostHog)
- Establece umbral: 3+ intentos en una función restringida dentro de 7 días

**La psicología:** Ya decidieron que lo quieren. Solo están descubriendo que necesitan pagar por ello. Tu trabajo es hacer ese camino claro y sin fricción.

<InsightCard icon="💡" title="El momento del descubrimiento">
El descubrimiento de funciones avanzadas es la señal de expansión con mayor intención. No están navegando — están intentando lograr algo específico y chocando con un muro. Aprovecha mientras la intención está caliente.
</InsightCard>

**Plantilla de outreach:**

_"Hola [Nombre] — noté que has estado explorando [Función]. Es una de nuestras funciones Pro más populares. Está diseñada para [caso de uso]. ¿Te sería útil si te muestro cómo funciona y qué implicaría el upgrade? Aquí tienes un resumen rápido: [link]"_

</Slide>

<Slide title="Trigger 3: Uso multi-equipo">

### Cuando un departamento se convierte en tres

Este trigger se activa cuando detectas patrones de uso de múltiples departamentos o equipos distintos dentro de la misma organización.

**Señales de detección:**

- 3+ títulos de trabajo/roles diferentes en perfiles de usuario
- Actividad de login desde diferentes ubicaciones de oficina
- Patrones de nombres de proyectos distintos (ej., "Marketing_Q1" y "Deck_Ventas_v2")
- Dominios de email mostrando diferentes departamentos (@marketing.empresa.com, @ventas.empresa.com)

**Por qué importa:** El uso multi-equipo significa:

1. El producto ha probado su valor en diferentes casos de uso
2. El boca a boca interno está funcionando
3. Necesitan funciones de equipo/empresa (permisos, espacios compartidos, controles de admin)

**El camino de upgrade:**

- De planes individuales → Plan Team con espacios compartidos
- De plan Team → Enterprise con permisos a nivel departamental

<ExampleCard label="Caso de estudio: La huida de la hoja de cálculo">
Una herramienta de visualización de datos notó que un cliente tenía usuarios con los títulos: "Analista de Marketing," "Gerente de Operaciones de Ventas" y "Director de Finanzas."

Enviaron: _"Noté que tu equipo abarca Marketing, Ventas y Finanzas — eso es exactamente para lo que está construido nuestro plan Enterprise. Tendrían espacios de trabajo por departamento, facturación unificada y dashboards inter-equipo. ¿Quieres ver un demo?"_

**Resultado:** Upgrade de $299/mes a $1,200/mes. El cliente ni sabía que existían las funciones inter-equipo hasta que recibió el email.
</ExampleCard>

</Slide>

<Slide title="Trigger 4: Expansión de integraciones">

### Construyendo un stack alrededor de ti

Cuando un cliente conecta 3+ integraciones a tu producto, están señalando dos cosas:

1. Tu producto es central para su flujo de trabajo
2. Están lo suficientemente invertidos como para construir infraestructura alrededor de él

**Método de detección:**

- Rastrea conexiones de integración en tu base de datos
- Umbral: 3+ integraciones activas (o acercándose al límite de integraciones de su plan)

**Por qué esto activa la expansión:**

- Alto conteo de integraciones = alto costo de cambio (están comprometidos)
- Probablemente son usuarios avanzados que necesitan funciones premium
- Si están cerca del límite de integraciones, van a necesitar un nivel superior pronto

**Enfoque de outreach:**

_"Hola [Nombre] — veo que has conectado [Integración A], [Integración B] e [Integración C]. Estás construyendo un stack poderoso alrededor de [Producto]. Nuestro plan Pro te da integraciones ilimitadas más [otras funciones relevantes]. La mayoría de los clientes con tu nivel de integraciones encuentran que el upgrade se paga solo en tiempo ahorrado. ¿Te gustaría explorar eso?"_

</Slide>

<Slide title="Trigger 5: Picos de uso consistentes">

### El patrón del usuario avanzado

Este trigger se activa cuando un cliente opera consistentemente al 90%+ de sus límites de uso, aunque no haya chocado con el muro todavía.

**Señales de detección:**

- 3+ meses al 90%+ de uso de cualquier métrica (licencias, almacenamiento, llamadas API)
- Advertencias frecuentes de "cerca del límite" en su dashboard
- Crecimiento mes a mes en uso (tendencia hacia los límites)

**Por qué importa:**

- No solo están acercándose a los límites — están creciendo
- Upgrades proactivos previenen frustración futura
- Demuestra que estás prestando atención a su éxito

**La conversación:**

_"Hola [Nombre] — he estado observando tu uso durante los últimos meses, y consistentemente estás al 90%+ de tu límite de [métrica]. Eso me dice dos cosas: (1) estás obteniendo valor serio de [Producto], y (2) pronto vas a necesitar más capacidad. Adelantémonos a eso. Así se ve el siguiente nivel: [detalles]. ¿Quieres que lo configure para que nunca choques con el muro?"_

<InsightCard icon="🎯" title="La ventaja proactiva">
Los clientes que hacen upgrade proactivamente (antes de llegar a los límites) tienen un 35% más de retención que los que hacen upgrade reactivamente (después de la frustración). El timing importa.
</InsightCard>

</Slide>
</SlideNavigation>

## Construyendo tu sistema de detección de triggers

No necesitas Gainsight ni una plataforma de CS de $50K/año. Así es como construir un sistema de triggers de uso como fundador en solitario con menos de $200/mes de presupuesto.

<TemplateBuilder
title="Tu sistema de triggers de uso"
persistKey="expansion-L2-trigger-system"
sections={[
{
id: "trigger1",
title: "Trigger 1: Acercamiento al límite del plan",
fields: [
{ id: "metric", label: "¿Qué métrica tiene un límite de plan?", placeholder: "ej., licencias, almacenamiento, llamadas API", type: "text" },
{ id: "threshold", label: "Valor del umbral del 80%", placeholder: "ej., 4 de 5 licencias", type: "text" },
{ id: "detection", label: "¿Cómo lo vas a detectar?", placeholder: "ej., Webhook de Stripe, consulta a base de datos, evento de analítica", type: "textarea" },
{ id: "action", label: "¿Qué pasa cuando se activa?", placeholder: "ej., Zapier → alerta en Slack → email al cliente", type: "textarea" }
]
},
{
id: "trigger2",
title: "Trigger 2: Descubrimiento de funciones avanzadas",
fields: [
{ id: "feature", label: "¿Qué función restringida quieren los clientes?", placeholder: "ej., Analítica Avanzada, Exportaciones Personalizadas", type: "text" },
{ id: "detection", label: "¿Cómo vas a rastrear los intentos?", placeholder: "ej., Evento de Mixpanel: 'clicked_gated_feature'", type: "textarea" },
{ id: "threshold", label: "¿Cuántos intentos = trigger?", placeholder: "ej., 3 intentos en 7 días", type: "text" }
]
},
{
id: "trigger3",
title: "Trigger 3: Uso multi-equipo",
fields: [
{ id: "signal", label: "¿Qué señala uso multi-equipo en tu producto?", placeholder: "ej., diferentes títulos de trabajo, múltiples departamentos en perfiles de usuario", type: "textarea" },
{ id: "threshold", label: "Umbral para el trigger", placeholder: "ej., 3+ roles/departamentos distintos", type: "text" }
]
}
]}
/>

## La cadencia de outreach

El trigger se activa. ¿Y ahora qué? Aquí está la cadencia probada para convertir triggers de uso en ingresos de expansión.

<SlideNavigation>
<Slide title="Día 0: Se activa el trigger">

**Acción interna:**

- Alerta automatizada para ti (Slack, email, notificación en dashboard)
- Registro del cliente etiquetado con tipo de trigger y marca de tiempo
- Email de outreach redactado (puede automatizarse con plantillas)

**NO envíes email inmediatamente.** Espera 24-48 horas. El outreach instantáneo se siente como vigilancia invasiva.

</Slide>

<Slide title="Día 1-2: Outreach inicial">

Envía el email contextual. Estructura:

1. **Observación** (no acusación): "Noté que estás usando X de Y [métrica]"
2. **Interpretación**: "Eso me dice que [cosa positiva sobre su uso]"
3. **Propuesta de valor**: "Así es como [upgrade] te ayuda con eso"
4. **CTA suave**: "¿Te gustaría explorar cómo se vería eso?"

**Ejemplo:**

_Asunto: Tu uso de [Producto]_

_Hola [Nombre],_

_Noté que estás usando 42 de tus 50 proyectos en el plan Pro. Eso es genial — significa que estás obteniendo valor real de [Producto]._

_La mayoría de los clientes con este nivel de uso encuentran que necesitan el plan Team en un mes o dos. Te da 200 proyectos, espacios compartidos y permisos de equipo a $299/mes (vs. $149 del Pro)._

_¿Quieres que te explique cómo se vería el upgrade? También puedo responder cualquier pregunta sobre cómo funciona la migración._

_[Tu Nombre]_

</Slide>

<Slide title="Día 7: Follow-up (si no hay respuesta)">

**Si no han respondido:**

Envía un follow-up con un caso de estudio o prueba social.

_Hola [Nombre],_

_Dándole seguimiento a mi nota sobre el upgrade al plan Team. Quería compartir un ejemplo rápido:_

_[Nombre del Cliente] estaba en la misma situación — alcanzando los límites de proyectos en Pro. Hicieron upgrade a Team y en 2 meses habían incorporado a todo su equipo de diseño (8 personas). Solo los espacios compartidos les ahorraron ~5 horas/semana en entregas._

_Aquí tienes un resumen de 2 minutos sobre lo que obtendrías: [link]_

_¿Vale la pena una conversación?_

</Slide>

<Slide title="Día 14: Nota personal">

**Si aún no hay respuesta:**

Un check-in breve, personal y de baja presión.

_Hola [Nombre],_

_Solo quería revisar — quiero asegurarme de que tengas todo lo que necesitas mientras escalas tu uso de [Producto]. Si el plan Team no es el fit correcto ahora, no hay problema. Pero si tienes preguntas al respecto, aquí estoy._

_[Tu Nombre]_

</Slide>

<Slide title="Día 30: Detener outreach">

**Si no hay respuesta después de 3 contactos:**

- Detén el outreach para esta instancia del trigger
- Reactiva si alcanzan un nuevo umbral (ej., 90% en vez de 80%)
- Etiqueta la cuenta como "consciente de expansión pero no listo"

**NO:**

- Sigas enviando emails semanales (eso es spam)
- Te pongas insistente o crees urgencia donde no existe
- Asumas que no les interesa para siempre (las circunstancias cambian)

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Checklist de cadencia de outreach"
persistKey="expansion-L2-cadence-checklist"
items={[
"Configurar detección de trigger para al menos una métrica de uso",
"Crear plantillas de email para Día 1, Día 7 y Día 14",
"Configurar automatización con Zapier/Make: trigger → alerta en Slack → borrador de email",
"Probar el sistema con un trigger falso para verificar que el flujo funciona",
"Documentar tus reglas de cadencia (cuándo parar, cuándo reactivar)"
]}
/>

## Automatización para fundadores en solitario

No puedes revisar métricas de uso manualmente todos los días. Así es como automatizar la detección de triggers con herramientas de menos de $50/mes.

### Opción 1: Stripe + Zapier (para facturación basada en uso)

**Si los límites de tu plan están vinculados a suscripciones de Stripe:**

1. **Webhook de Stripe** → se activa cuando el uso se acerca al umbral
2. **Zapier** captura el webhook → envía alerta en Slack + crea borrador de email en Gmail
3. **Tú** revisas el borrador, personalizas, envías

**Costo:** Zapier Starter ($19.99/mes) + Stripe (webhooks gratis)

### Opción 2: Consulta a base de datos + Make.com (para métricas personalizadas)

**Si rastreas uso en tu propia base de datos:**

1. **Cron job diario** consulta la base de datos para cuentas al 80%+ de límites
2. **Make.com** recibe los resultados → envía alerta en Slack + llena plantilla de email
3. **Tú** revisas y envías

**Costo:** Make.com tier gratis (1,000 operaciones/mes) o $9/mes para más

### Opción 3: Analítica de producto + Webhooks (para descubrimiento de funciones)

**Para rastrear intentos de funciones restringidas:**

1. **Mixpanel/PostHog** rastrea eventos "clicked_gated_feature"
2. **Webhook** se activa cuando el usuario acumula 3+ eventos en 7 días
3. **Zapier/Make** captura el webhook → alerta + borrador de email

**Costo:** PostHog tier gratis (1M eventos/mes) + Zapier/Make

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Puedes construir todo este sistema con un script de Python de 50 líneas + cron job. Consulta tu base de datos, verifica umbrales, envía alertas vía API de Slack, redacta emails vía API de Gmail. Sin necesidad de Zapier. Costo total: $0.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches">
Tus "triggers de uso" son diferentes — son basados en resultados (cubiertos en la Lección 3). Pero el patrón de automatización es el mismo: detectar señal → alertarte → outreach personalizado. Podrías rastrear "completó el módulo 8 de 10" en vez de "usó 40 de 50 licencias."
</ContextualNote>

## Práctica: Clasifica estas señales

Vamos a probar tu reconocimiento de triggers. Para cada escenario, identifica cuál de los 5 triggers de uso aplica (si alguno).

<ClassifyExercise
title="Identifica el trigger de uso"
persistKey="expansion-L2-classify"
categories={[
{ id: "limit", label: "Acercamiento al límite", color: "#ef4444" },
{ id: "feature", label: "Descubrimiento de funciones", color: "#f59e0b" },
{ id: "team", label: "Uso multi-equipo", color: "#3b82f6" },
{ id: "integration", label: "Expansión de integraciones", color: "#8b5cf6" },
{ id: "spike", label: "Picos de uso consistentes", color: "#10b981" },
{ id: "none", label: "No es un trigger de uso", color: "#6b7280" }
]}
items={[
{
id: "1",
content: "El cliente ha usado 47 de 50 proyectos en su plan",
correctCategory: "limit",
explanation: "Trigger clásico de acercamiento al límite — 94% del límite alcanzado."
},
{
id: "2",
content: "El cliente hizo clic en 'Exportar a Excel' 5 veces (la función requiere plan Pro)",
correctCategory: "feature",
explanation: "Descubrimiento de funciones avanzadas — intentos repetidos de una función restringida."
},
{
id: "3",
content: "El cliente mencionó en un ticket de soporte que a su equipo le encanta el producto",
correctCategory: "none",
explanation: "Señal positiva, pero no es un trigger de uso. Es feedback cualitativo, no comportamiento medible."
},
{
id: "4",
content: "El cliente ha conectado integraciones de Slack, Google Drive, Salesforce y Zapier",
correctCategory: "integration",
explanation: "Expansión de integraciones — 4 integraciones sugiere que están construyendo un stack alrededor de tu producto."
},
{
id: "5",
content: "El cliente tiene usuarios con títulos: 'Gerente de Marketing,' 'Director de Ventas,' 'Líder de Producto'",
correctCategory: "team",
explanation: "Uso multi-equipo — tres departamentos distintos usando el producto."
},
{
id: "6",
content: "El cliente ha estado al 92-98% del límite de llamadas API durante 4 meses consecutivos",
correctCategory: "spike",
explanation: "Picos de uso consistentes — uso alto sostenido con tendencia hacia los límites."
},
{
id: "7",
content: "El cliente dejó una reseña de 5 estrellas en G2",
correctCategory: "none",
explanation: "Excelente para advocacy (Curso 39), pero no es un trigger de uso para expansión."
},
{
id: "8",
content: "El cliente tiene 9 de 10 licencias ocupadas y acaba de publicar una vacante para un nuevo miembro del equipo",
correctCategory: "limit",
explanation: "Acercamiento al límite + señal externa (contratación) = oportunidad de expansión de alta intención."
}
]}
/>

## Práctica de reescritura: Genérico → Contextual

Ahora practiquemos escribir outreach basado en triggers. Toma este email genérico de expansión y reescríbelo para que sea específico a un trigger de uso.

<RewriteExercise
title="Transforma outreach genérico en outreach basado en triggers"
persistKey="expansion-L2-rewrite"
original="Hola [Nombre], quería contactarte sobre hacer upgrade de tu plan. Nuestro plan Pro tiene muchas funciones geniales que creo que te resultarían valiosas. Avísame si te gustaría saber más."
hint="Elige uno de los 5 triggers y haz el email específico a esa señal. Referencia los datos de uso reales."
expertRewrite="Hola Carolina — noté que estás usando 8 de tus 10 licencias en el plan Team, y tu uso ha crecido 30% en los últimos 2 meses. Ese es exactamente el patrón de crecimiento que vemos antes de que los clientes necesiten el plan Business (50 licencias + permisos avanzados). ¿Quieres adelantarte a llegar al límite? Puedo explicarte cómo se ve el upgrade y asegurarme de que la transición sea fluida."
criteria={[
"Referencia datos de uso específicos (números, no un vago 'estás creciendo')",
"Identifica qué trigger se está activando",
"Explica el beneficio en términos de evitar dolor futuro, no solo 'más funciones'",
"Incluye un CTA claro y de baja presión"
]}
/>

## El simulador de Trigger → Ingresos

Modelemos lo que el outreach sistemático de triggers de uso podría generar para tu negocio.

<ScenarioSimulator
title="Impacto de ingresos por triggers de uso"
persistKey="expansion-L2-simulator"
levers={[
{ id: "customers", label: "Total de clientes activos", min: 10, max: 500, step: 10, defaultValue: 50 },
{ id: "triggerRate", label: "% que activan triggers mensualmente", min: 5, max: 30, step: 5, defaultValue: 15 },
{ id: "conversionRate", label: "Conversión de trigger → upgrade %", min: 20, max: 60, step: 5, defaultValue: 40 },
{ id: "avgExpansion", label: "MRR promedio de expansión por upgrade", min: 50, max: 500, step: 50, defaultValue: 150 }
]}
outputs={[
{
id: "monthlyExpansion",
label: "MRR mensual de expansión",
formula: "(customers * (triggerRate / 100) * (conversionRate / 100) * avgExpansion)",
unit: "$",
precision: 0
},
{
id: "annualExpansion",
label: "Ingresos anuales de expansión",
formula: "(customers * (triggerRate / 100) * (conversionRate / 100) * avgExpansion * 12)",
unit: "$",
precision: 0
},
{
id: "nrrImpact",
label: "Contribución al NRR (asumiendo $50K de MRR base)",
formula: "((customers * (triggerRate / 100) * (conversionRate / 100) * avgExpansion) / 50000 * 100)",
unit: "%",
precision: 1
}
]}
insight="Con {monthlyExpansion} en MRR mensual de expansión, agregarías {annualExpansion} en ingresos anuales de expansión. Eso es un impulso de {nrrImpact} al NRR solo por triggers de uso."
/>

## Errores comunes (y cómo evitarlos)

<SlideNavigation>
<Slide title="Error 1: Esperar hasta que choquen con el muro">

**El error:** Solo contactar después de que el cliente ha alcanzado su límite y está frustrado.

**Por qué falla:** Estás reaccionando a un problema en vez de prevenirlo. La conversación se siente como control de daños, no entrega de valor.

**La solución:** Configura triggers al 80%, no al 100%. Proactivo > reactivo.

**Impacto en conversión:** 40-60% al 80% vs. 15-25% al 100%.

</Slide>

<Slide title="Error 2: Emails genéricos de 'Haz upgrade ahora'">

**El error:** Enviar el mismo pitch de upgrade a todos, sin importar su patrón de uso específico.

**Por qué falla:** Los clientes ignoran mensajes que no se sienten relevantes a su situación.

**La solución:** Cada email de outreach debería referenciar el trigger específico: "Noté que estás usando X de Y licencias" o "Veo que has intentado exportar a Excel 5 veces."

**Impacto en conversión:** Los emails contextuales convierten 3-5x mejor que los genéricos.

</Slide>

<Slide title="Error 3: Sobre-automatizar la conversación">

**El error:** Emails de upgrade completamente automatizados sin revisión humana ni personalización.

**Por qué falla:** Las conversaciones de expansión son de alto valor. Un poco de personalización (30 segundos por email) aumenta dramáticamente la conversión.

**La solución:** Automatiza la detección del trigger y la creación del borrador. Revisa y personaliza manualmente antes de enviar.

**Impacto en conversión:** Los emails personalizados convierten 2-3x mejor que los totalmente automatizados.

</Slide>

<Slide title="Error 4: Sin sistema de follow-up">

**El error:** Enviar un email y rendirse si no hay respuesta.

**Por qué falla:** Los clientes están ocupados. Las tasas de apertura del primer email son del 20-30%. Necesitas 2-3 toques.

**La solución:** Usa la cadencia de Día 1 → Día 7 → Día 14. Luego detente.

**Impacto en conversión:** El 60-70% de las conversiones suceden en el toque 2 o 3, no en el toque 1.

</Slide>

<Slide title="Error 5: Ignorar combinaciones de triggers">

**El error:** Tratar cada trigger independientemente en vez de reconocer cuando múltiples triggers se activan simultáneamente.

**Por qué falla:** Un cliente al 80% del límite de licencias + 4 integraciones conectadas + uso multi-equipo es una oportunidad de MUCHA mayor intención que un solo trigger.

**La solución:** Marca las cuentas con 2+ triggers activos como "oportunidades de expansión de alta prioridad."

**Impacto en conversión:** Las cuentas con múltiples triggers convierten al 60-80% vs. 40% para triggers individuales.

</Slide>
</SlideNavigation>

## Tu sistema de triggers de expansión (constrúyelo ahora)

Construyamos tu primer sistema de triggers de uso. Este es el artefacto que vas a usar a partir de esta semana.

<TemplateBuilder
title="Tu primer trigger de uso"
persistKey="expansion-L2-first-trigger"
sections={[
{
id: "trigger",
title: "Definición del trigger",
fields: [
{ id: "name", label: "Nombre del trigger", placeholder: "ej., Acercamiento al límite de licencias", type: "text" },
{ id: "metric", label: "¿Qué métrica activa esto?", placeholder: "ej., licencias activas vs. límite del plan", type: "text" },
{ id: "threshold", label: "Valor del umbral", placeholder: "ej., 80% del límite del plan (4 de 5 licencias)", type: "text" },
{ id: "why", label: "¿Por qué esto señala preparación para expansión?", placeholder: "ej., El cliente está haciendo crecer su equipo y necesitará más capacidad pronto", type: "textarea" }
]
},
{
id: "detection",
title: "Método de detección",
fields: [
{ id: "source", label: "¿Dónde viven estos datos?", placeholder: "ej., Metadata de suscripción en Stripe, tabla de usuarios en BD, eventos de Mixpanel", type: "text" },
{ id: "how", label: "¿Cómo vas a detectar cuándo se cruza el umbral?", placeholder: "ej., Cron job diario consulta BD, webhook de Stripe se activa, alerta de Mixpanel", type: "textarea" },
{ id: "alert", label: "¿Cómo serás notificado?", placeholder: "ej., Mensaje de Slack, alerta por email, notificación en dashboard", type: "text" }
]
},
{
id: "outreach",
title: "Plantilla de outreach",
fields: [
{ id: "subject", label: "Asunto del email", placeholder: "ej., Tu uso de [Producto]", type: "text" },
{ id: "body", label: "Cuerpo del email (usa [Nombre], [Métrica], [Umbral] como variables)", placeholder: "Hola [Nombre],\n\nNoté que estás usando [Métrica] de tu [Umbral]...", type: "textarea", rows: 8 },
{ id: "cta", label: "Llamada a la acción", placeholder: "ej., ¿Quieres explorar cómo se vería el upgrade?", type: "text" }
]
},
{
id: "cadence",
title: "Cadencia de follow-up",
fields: [
{ id: "day1", label: "Acción Día 1-2", placeholder: "ej., Enviar email inicial", type: "text" },
{ id: "day7", label: "Acción Día 7 (si no hay respuesta)", placeholder: "ej., Enviar follow-up con caso de estudio", type: "text" },
{ id: "day14", label: "Acción Día 14 (si no hay respuesta)", placeholder: "ej., Enviar check-in personal breve", type: "text" },
{ id: "stop", label: "Cuándo detener el outreach", placeholder: "ej., Después del Día 14 sin respuesta; reactivar si alcanzan nuevo umbral", type: "text" }
]
}
]}
/>

## Acciones pendientes

<InteractiveChecklist
title="Tareas de triggers de expansión de esta semana"
persistKey="expansion-L2-actions"
items={[
"Identifica tus 1-2 métricas de uso principales que tienen límites de plan (licencias, almacenamiento, llamadas API, etc.)",
"Configura detección para al menos UN trigger en el umbral del 80%",
"Escribe tu primer email de outreach basado en triggers usando el constructor de plantillas de arriba",
"Configura automatización: detección de trigger → alerta en Slack/email → borrador de email",
"Revisa tu base de clientes actual: ¿quién ya está al 80%+ de un límite? Envíales el email esta semana.",
"Documenta tu cadencia de follow-up (Día 1, 7, 14) y configura recordatorios",
"Prueba el sistema: activa manualmente un trigger falso y verifica que la alerta + borrador de email funcionen"
]}
/>

## ¿Qué sigue?

Ahora tienes un enfoque sistemático para los **triggers de expansión basados en uso** para productos SaaS. En la **Lección 3**, cubriremos los **triggers de expansión basados en resultados** para negocios de servicios y coaching — donde las señales vienen de los resultados del cliente, no del uso del producto.

El patrón es el mismo: detectar señal → outreach personalizado → follow-up estructurado. Pero los triggers son completamente diferentes.

**Vista previa de la Lección 3:**

- Los 5 triggers basados en resultados (primer hito de éxito, completación de meta, crecimiento del negocio, nuevo reto, hito de tiempo)
- El framework de conversación "¿Qué sigue?"
- Expansión de retainer para negocios de servicios
- Escalera de programas para coaches

---

**Auto-evaluación rápida:**

<RangeSlider
  label="¿Qué tan seguro te sientes de configurar tu primer trigger de uso esta semana?"
  min={1}
  max={10}
  lowLabel="Poco seguro"
  highLabel="Muy seguro"
  persistKey="expansion-L2-confidence"
/>

Si estás por debajo del 7, revisa la sección "Automatización para fundadores en solitario" y elige la opción más simple (Stripe + Zapier para la mayoría de fundadores SaaS). Empieza con UN trigger, no cinco. Siempre puedes agregar más después.
