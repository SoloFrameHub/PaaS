---
title: "Tu Playbook de Expansión"
duration: "45 min"
track: "Éxito del Cliente"
course: "Curso 38: Expansión y Upsell"
lesson: 8
---

## El Error de $127K

Conoce a Joaquín, un fundador en solitario ejecutando un SaaS de gestión de proyectos a $18K MRR. Producto sólido. Clientes contentos. Creciendo 8% mes a mes gracias a nueva adquisición.

Joaquín pasó 6 meses obsesionado con la adquisición: email frío, LinkedIn, contenido. Contrató un VA para gestionar el contacto. Construyó un programa de referidos. Ejecutó anuncios.

Entonces su cofundador (que había estado rastreando métricas en silencio) puso una hoja de cálculo sobre la mesa:

**"Dejamos $127,000 USD (~$2.2M MXN) sobre la mesa este año."**

¿Cómo? Doce clientes habían crecido de 3 asientos a 15+ orgánicamente — y nunca mejoraron sus planes. Ocho clientes habían preguntado sobre "configuración hecha por ti" — y Joaquín dijo "no ofrecemos eso." Cinco clientes llegaron a su renovación anual y abandonaron porque Joaquín nunca tuvo una conversación sobre qué sigue.

Joaquín había construido un **balde de expansión con fugas**. Los ingresos fluían por arriba (adquisición) y se escapaban por abajo (expansión perdida).

Hoy, estás tapando esa fuga. Estás construyendo tu sistema completo de expansión — el playbook que convierte tu base de clientes existente en un motor de crecimiento compuesto.

<InsightCard icon="📊" title="La Realidad de la Expansión">
Un NRR de 106% significa que tus clientes existentes hacen crecer tu negocio un 6% mensual incluso si dejas de adquirir nuevos clientes por completo. Eso se compone a ~100% de crecimiento anual solo de tu base. La adquisición se convierte en un bonus, no un requisito.
</InsightCard>

## Tu Sistema de Expansión: La Imagen Completa

Has aprendido las piezas en 7 lecciones. Ahora las estamos ensamblando en **un sistema cohesivo** que funciona junto a tu rutina semanal de éxito del cliente.

Esto es lo que estás construyendo hoy:

1. **Baseline y Tracking de NRR** — Saber dónde estás, medir mensualmente
2. **Biblioteca de Triggers de Expansión** — 5-8 señales específicas que significan "listo para expandir"
3. **Playbook de Contacto** — Plantillas y guiones para cada trigger
4. **Escenarios de Precios** — Cómo manejar upgrades, aumentos de tarifa y nuevos tiers
5. **Revisión Mensual de Expansión** — Ritual de 15 minutos para identificar y actuar sobre oportunidades
6. **Sprint de Implementación de 7 Días** — Lanzar el sistema esta semana

<FlipCard
  front="¿Qué es un 'Sistema de Expansión'?"
  back="Un proceso documentado y repetible para identificar oportunidades de expansión en tu base de clientes y convertirlas en ingresos adicionales. Funciona con triggers (no adivinanzas) y se integra a tu flujo de trabajo de CS existente."
/>

## Paso 1: Calcula Tu Baseline de NRR

Antes de poder mejorar la expansión, necesitas saber dónde estás.

**La Retención Neta de Ingresos (NRR)** es la métrica de expansión más importante. Responde: "Si dejara de adquirir nuevos clientes hoy, ¿mis ingresos crecerían o disminuirían?"

<TemplateBuilder
title="Tu Calculadora de Baseline de NRR"
persistKey="expansion-L8-nrr-baseline"
sections={[
{
id: "current",
title: "Datos del Mes Actual",
fields: [
{ id: "startMRR", label: "MRR Inicial (inicio del mes)", placeholder: "ej., 50000", type: "number" },
{ id: "expansionMRR", label: "MRR de Expansión (upgrades, upsells, asientos adicionales)", placeholder: "ej., 8000", type: "number" },
{ id: "contractionMRR", label: "MRR de Contracción (downgrades)", placeholder: "ej., 2000", type: "number" },
{ id: "churnMRR", label: "MRR Abandonado (cancelaciones)", placeholder: "ej., 3000", type: "number" }
]
},
{
id: "calculation",
title: "Tu NRR",
fields: [
{ id: "endMRR", label: "MRR Final", placeholder: "Auto-calculado", type: "text", readonly: true },
{ id: "nrr", label: "Retención Neta de Ingresos (%)", placeholder: "Auto-calculado", type: "text", readonly: true },
{ id: "interpretation", label: "Qué Significa Esto", placeholder: "Auto-calculado", type: "textarea", readonly: true }
]
}
]}
/>

**Fórmula:**

- MRR Final = MRR Inicial + Expansión - Contracción - Abandono
- NRR = (MRR Final / MRR Inicial) × 100

**Objetivos:**

- **&lt;100% NRR** — Tu base está disminuyendo. La expansión no cubre el abandono. Prioridad: arreglar retención primero (Curso 37), luego expansión.
- **100-110% NRR** — Saludable para fundadores SMB en solitario. La expansión cubre el abandono con crecimiento modesto.
- **110-120% NRR** — Excelente. Tu base es un motor de crecimiento.
- **>120% NRR** — Best-in-class. Típicamente requiere clientes enterprise o tasas de expansión muy altas.

<RangeSlider
  label="¿Cuál es tu objetivo de NRR para 6 meses?"
  min={90}
  max={130}
  step={5}
  lowLabel="90%"
  highLabel="130%"
  persistKey="expansion-L8-nrr-target"
/>

## Paso 2: Construye Tu Biblioteca de Triggers de Expansión

La expansión no ocurre por accidente. Ocurre cuando **detectas señales específicas** y actúas sobre ellas.

Tu biblioteca de triggers son 5-8 escenarios concretos que significan "este cliente está listo para una conversación de expansión."

<SlideNavigation>
<Slide title="Triggers de SaaS">

Si ejecutas un producto SaaS, usa **triggers basados en uso**:

1. **Acercamiento al Límite del Plan** — Cliente alcanza 80%+ de asientos, almacenamiento, llamadas API o cualquier límite del plan
2. **Descubrimiento de Función Premium** — Cliente intenta una función bloqueada 3+ veces (la quiere pero no tiene acceso)
3. **Uso Multi-Equipo** — 3+ departamentos o roles de usuario distintos están activos
4. **Expansión de Integraciones** — Cliente conecta 3+ integraciones (construyendo un stack alrededor de tu producto)
5. **Picos de Uso** — Alcanzando consistentemente 90%+ de límites de uso o ventanas pico

**Detección:** Alertas del sistema de facturación, analítica de producto, consultas de base de datos, automatizaciones de Zapier

</Slide>

<Slide title="Triggers de Servicios/Coaching">

Si ejecutas servicios o coaching, usa **triggers basados en resultados**:

1. **Primer Hito de Éxito** — Cliente logra una victoria cuantificable (primeros 10 clientes, primer mes de $10K, etc.)
2. **Completar Objetivo** — Alcance original entregado; momento natural de "¿qué sigue?"
3. **Señal de Crecimiento del Negocio** — Los ingresos del cliente aumentan, contrata, lanza nuevo producto
4. **Emergencia de Nuevo Desafío** — Cliente menciona un nuevo problema en conversación
5. **Hito de Tiempo** — 90 días, 6 meses, revisión anual

**Detección:** Check-ins con clientes, menciones en WhatsApp, hitos de facturación, recordatorios de calendario

</Slide>

<Slide title="Triggers Híbridos">

Si ejecutas un modelo híbrido (SaaS + servicios, coaching + comunidad), combina ambos:

1. Triggers de uso para el lado de producto
2. Triggers de resultado para el lado de servicio/coaching
3. **Trigger de venta cruzada** — Cliente tiene éxito con una oferta, listo para la otra

Ejemplo: Un cliente completa tu programa de coaching grupal (trigger de resultado) Y comienza a usar tu herramienta SaaS intensamente (trigger de uso) → pitchea coaching 1:1 + plan SaaS premium como bundle.

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Define Tus Triggers de Expansión"
persistKey="expansion-L8-triggers"
items={[
"Lista 5-8 triggers de expansión específicos para tu modelo de negocio",
"Define el método de detección para cada trigger (analítica, facturación, revisión manual)",
"Establece el umbral para cada trigger (80% del límite, 3+ intentos de función, etc.)",
"Documenta dónde rastrearás triggers activos (hoja de cálculo, CRM, Notion)"
]}
/>

## Paso 3: Escribe Tu Playbook de Contacto

Para cada trigger, necesitas un **guión de conversación o plantilla de email** que se sienta natural, no vendedor.

El patrón:

1. **Reconoce la señal** — "Noté que estás usando la función X mucho" o "Felicidades por alcanzar el hito Y"
2. **Conecta con su objetivo** — "Eso usualmente significa [dolor/oportunidad]"
3. **Introduce la expansión** — "Así es como [upgrade/servicio] ayuda con eso"
4. **CTA de baja presión** — "¿Quieres que te lo explique?" o "¿Te envío los detalles?"

<ComparisonBuilder
title="Contacto de Expansión: Tu Versión vs. Ejemplo Experto"
persistKey="expansion-L8-outreach-compare"
prompt="Escribe un email de expansión para UNO de tus triggers"
expertExample="Asunto: Estás alcanzando el límite de 5 asientos — esto es lo que sigue

Hola [Nombre],

Noté que tu equipo acaba de agregar el 5to usuario a [Producto] — ¡felicidades por el crecimiento!

La mayoría de los equipos en esta etapa empiezan a necesitar espacios compartidos y controles de administrador para mantener a todos coordinados. Nuestro plan Team (hasta 15 asientos) incluye esas funciones más soporte prioritario.

La mejora es $X/mes (vs. tu actual $Y), y puedo migrarte en unos 10 minutos.

¿Quieres que te envíe una comparación rápida de lo que obtendrías?

Saludos,
[Tu Nombre]"
criteria={[
"Reconoce la señal específica del trigger",
"Conecta el upgrade con un dolor/oportunidad real",
"Incluye precios concretos y siguiente paso",
"Se siente útil, no agresivo"
]}
/>

<ExampleCard label="Ejemplo Real: El Email de Expansión de Asientos que Convirtió al 67%">
Un fundador en solitario ejecutando un SaaS de colaboración de equipos envió este email a 15 clientes que habían alcanzado el 80% de su límite de asientos:

**Asunto:** Tu equipo está creciendo — asegurémonos de que [Producto] siga el ritmo

**Cuerpo:**
Hola [Nombre],

Noté que tu equipo acaba de agregar el usuario #8 (de tu plan de 10 asientos) — ¡felicidades por el crecimiento!

Aviso rápido: cuando los equipos llegan a 8-9 asientos, las cosas pueden volverse caóticas rápido. Nuestro plan de 20 asientos incluye:

- Espacios compartidos (para que los equipos no se pisen entre sí)
- Controles de administrador (gestiona permisos en un solo lugar)
- Soporte prioritario (porque estás operando algo más grande ahora)

La mejora es $299/mes (~$5,100 MXN) (vs. tu actual $199/mes), y puedo hacer el cambio en unos 5 minutos.

¿Quieres que te envíe una comparación rápida?

Saludos,
Joaquín

**Resultado:** 10 de 15 clientes mejoraron dentro de 7 días. 67% de tasa de conversión. $1,500 de MRR de expansión de un solo email.
</ExampleCard>

## Paso 4: Escenarios de Precios y Plantillas de Comunicación

Necesitas **respuestas pre-construidas** para preguntas comunes de precios de expansión:

1. **Expansión de asientos/volumen** — ¿Cuánto por asiento/unidad adicional?
2. **Upgrades de tier** — ¿Cuál es la diferencia de precio y qué obtienen?
3. **Aumentos de tarifa** — ¿Cómo comunicas ajustes anuales de tarifa?
4. **Grandfathering** — ¿Los clientes existentes mantienen el precio anterior cuando subes precios?
5. **Premium hecho-por-ti** — ¿Cuál es el multiplicador para DFY vs. autoservicio?

<TemplateBuilder
title="Tus Escenarios de Precios"
persistKey="expansion-L8-pricing-scenarios"
sections={[
{
id: "seat-expansion",
title: "Expansión de Asientos/Volumen",
fields: [
{ id: "basePrice", label: "Precio actual por asiento/unidad", placeholder: "ej., $50/asiento", type: "text" },
{ id: "volumeDiscount", label: "Descuento por volumen (si aplica)", placeholder: "ej., 10% off para 5+ asientos", type: "text" },
{ id: "expansionEmail", label: "Plantilla de email de expansión de asientos", placeholder: "Asunto + cuerpo", type: "textarea" }
]
},
{
id: "tier-upgrade",
title: "Upgrade de Tier",
fields: [
{ id: "currentTier", label: "Nombre y precio del tier actual", placeholder: "ej., Básico - $99/mes", type: "text" },
{ id: "nextTier", label: "Nombre y precio del siguiente tier", placeholder: "ej., Pro - $199/mes", type: "text" },
{ id: "tierDiff", label: "Qué obtienen con el upgrade", placeholder: "Lista 3-5 funciones/beneficios clave", type: "textarea" }
]
},
{
id: "rate-increase",
title: "Comunicación de Aumento de Tarifa",
fields: [
{ id: "increasePercent", label: "Aumento planificado (%)", placeholder: "ej., 10%", type: "text" },
{ id: "noticeWindow", label: "Período de aviso previo", placeholder: "ej., 60 días", type: "text" },
{ id: "increaseReason", label: "Razón del aumento", placeholder: "ej., nuevas funciones, tarifas de mercado, aumento de costos", type: "textarea" },
{ id: "increaseEmail", label: "Plantilla de email de aumento de tarifa", placeholder: "Asunto + cuerpo", type: "textarea" }
]
}
]}
/>

<InsightCard icon="💡" title="La Decisión de Grandfather">
Cuando subes precios, tienes 3 opciones para clientes existentes:

1. **Grandfather completo** — Mantienen el precio anterior para siempre (generoso pero limita ingresos)
2. **Grandfather temporal** — Mantienen el precio anterior por 6-12 meses, luego transicionan (equilibrado)
3. **Transición inmediata** — Todos pasan al nuevo precio (agresivo, alto riesgo de abandono)

**Recomendación para fundadores en solitario:** Grandfather temporal por 6 meses. Comunícalo como: "Como agradecimiento por ser un cliente temprano, mantendrás tu tarifa actual hasta [fecha]. Después, tu tarifa se ajustará a [nuevo precio], que aún está por debajo de nuestra tarifa estándar para nuevos clientes." En LATAM, ofrecer meses sin intereses en el nuevo precio puede suavizar la transición significativamente.
</InsightCard>

## Paso 5: El Ritual de Revisión Mensual de Expansión

La expansión no ocurre en un gran empuje trimestral. Ocurre en **pequeñas acciones consistentes** cada mes.

Agrega este ritual de 15 minutos a tu revisión semanal de éxito del cliente:

**La Revisión Mensual de Expansión (15 minutos):**

1. **Filtra cuentas con puntaje de salud Verde** (del Curso 36) — Estos son tus candidatos de expansión
2. **Verifica triggers activos** — ¿Qué cuentas han alcanzado umbrales de uso, hitos de resultados o revisiones basadas en tiempo?
3. **Prioriza las top 3-5 oportunidades** — Mayor potencial de ingresos o conversación más fácil
4. **Ejecuta contacto** — Envía emails o agenda llamadas para esas 3-5 cuentas
5. **Registra en pipeline de expansión** — Rastrea trigger → contacto → resultado

<InteractiveChecklist
title="Checklist de Revisión Mensual de Expansión"
persistKey="expansion-L8-monthly-review"
items={[
"Filtrar cuentas con puntaje de salud Verde (saludables, comprometidas, sin riesgo)",
"Verificar cada cuenta contra la biblioteca de triggers de expansión",
"Identificar 3-5 cuentas con triggers activos",
"Enviar emails de contacto de expansión o agendar llamadas",
"Registrar oportunidades en tracker de pipeline de expansión",
"Actualizar cálculo de NRR con nuevo MRR de expansión"
]}
/>

## Paso 6: El Dashboard de Expansión de 4 Métricas

Rastrea estas 4 métricas mensualmente:

<ScenarioSimulator
title="Simulador de Métricas de Expansión"
persistKey="expansion-L8-metrics-simulator"
levers={[
{ id: "startMRR", label: "MRR Inicial", min: 5000, max: 100000, step: 5000, defaultValue: 20000 },
{ id: "expansionMRR", label: "MRR de Expansión", min: 0, max: 10000, step: 500, defaultValue: 2000 },
{ id: "contractionMRR", label: "MRR de Contracción", min: 0, max: 5000, step: 250, defaultValue: 500 },
{ id: "churnMRR", label: "MRR Abandonado", min: 0, max: 5000, step: 250, defaultValue: 1000 }
]}
outputs={[
{ id: "nrr", label: "Retención Neta de Ingresos", formula: "((startMRR + expansionMRR - contractionMRR - churnMRR) / startMRR * 100)", unit: "%", precision: 1 },
{ id: "expansionPct", label: "Expansión como % del Crecimiento", formula: "(expansionMRR / (expansionMRR + (startMRR * 0.08)) * 100)", unit: "%", precision: 1 },
{ id: "netGrowth", label: "Crecimiento Neto de MRR", formula: "(expansionMRR - contractionMRR - churnMRR)", unit: "$", precision: 0 }
]}
insight="Con `{nrr}`% de NRR, tu base de clientes existente está {'creciendo' if nrr > 100 else 'disminuyendo'}. La expansión contribuye {expansionPct}% del crecimiento total. Objetivo: NRR ≥100%, expansión ≥20% del crecimiento."
/>

## Paso 7: El Sprint de Implementación de 7 Días

Has construido el playbook. Ahora lo estás lanzando.

<ProgressiveReveal title="Tu Lanzamiento del Sistema de Expansión en 7 Días" persistKey="expansion-L8-sprint-reveal">

<RevealSection title="Día 1: Calcular Baseline de NRR">

**Tarea:** Calcula tu NRR actual usando datos del mes pasado.
**Entregable:** Porcentaje de NRR + interpretación
**Tiempo:** 30 minutos

</RevealSection>

<RevealSection title="Día 2: Definir 5-8 Triggers de Expansión">

**Tarea:** Escribe tus triggers de expansión específicos con métodos de detección y umbrales.
**Entregable:** Biblioteca de triggers de expansión documentada
**Tiempo:** 45 minutos

</RevealSection>

<RevealSection title="Día 3: Escribir Plantillas de Contacto">

**Tarea:** Crea plantillas de email/guión para cada trigger.
**Entregable:** 5-8 plantillas de contacto de expansión
**Tiempo:** 60 minutos

</RevealSection>

<RevealSection title="Día 4: Configurar Automatizaciones de Triggers">

**Tarea:** Automatiza la detección de triggers donde sea posible.
**Entregable:** Automatizaciones de Zapier/n8n O recordatorios de calendario para revisión manual
**Tiempo:** 60 minutos

</RevealSection>

<RevealSection title="Día 5: Escenarios de Precios y Comunicación">

**Tarea:** Documenta tus escenarios de precios y plantillas de comunicación.
**Entregable:** Documento de escenarios de precios
**Tiempo:** 45 minutos

</RevealSection>

<RevealSection title="Día 6: Revisar Cuentas Verdes">

**Tarea:** Filtra todas las cuentas con puntaje de salud Verde y verifica triggers activos.
**Entregable:** Pipeline de expansión con 3-5 oportunidades inmediatas
**Tiempo:** 45 minutos

</RevealSection>

<RevealSection title="Día 7: Ejecutar Primeras 3 Conversaciones de Expansión">

**Tarea:** Envía emails de expansión o agenda llamadas para tus top 3 oportunidades.
**Entregable:** 3 conversaciones de expansión iniciadas + resultados registrados
**Tiempo:** 60 minutos

</RevealSection>

</ProgressiveReveal>

<InteractiveChecklist
title="Checklist de Finalización del Sprint de 7 Días"
persistKey="expansion-L8-sprint-complete"
items={[
"Día 1: Baseline de NRR calculado y documentado",
"Día 2: 5-8 triggers de expansión definidos con métodos de detección",
"Día 3: Plantillas de contacto escritas para cada trigger",
"Día 4: Automatizaciones de triggers configuradas (o recordatorios de revisión manual)",
"Día 5: Escenarios de precios y plantillas de comunicación documentados",
"Día 6: Cuentas Verdes revisadas, 3-5 oportunidades de expansión identificadas",
"Día 7: Primeras 3 conversaciones de expansión ejecutadas y registradas",
"Bonus: Sistema de expansión integrado al ritual de revisión mensual de CS"
]}
/>

## El Cambio de Mentalidad de Expansión

**Mentalidad anterior:** "Estoy agradecido de que me paguen. No quiero parecer codicioso pidiendo más."

**Mentalidad nueva:** "Estoy buscando oportunidades para entregar más valor y capturar más ingresos. Si están obteniendo resultados, querrán más. Si no, necesito arreglar eso primero."

La expansión NO se trata de extraer más dinero de los clientes. Se trata de **servirlos más profundamente** a medida que sus necesidades crecen. En la cultura LATAM, donde las relaciones son fundamentales, este enfoque consultivo resuena especialmente bien — no estás "vendiendo," estás cuidando la relación.

<RangeSlider
  label="¿Qué tan cómodo te sientes iniciando conversaciones de expansión?"
  min={1}
  max={10}
  lowLabel="Muy incómodo"
  highLabel="Muy cómodo"
  persistKey="expansion-L8-comfort"
/>

## Tus Elementos de Acción

<InteractiveChecklist
title="Elementos de Acción Post-Lección"
persistKey="expansion-L8-actions"
items={[
"Completa el Sprint de Implementación de 7 Días (o agéndalo para la próxima semana)",
"Calcula tu baseline de NRR actual",
"Define 5-8 triggers de expansión específicos para tu negocio",
"Escribe plantillas de contacto para cada trigger",
"Configura detección de triggers (automatizaciones o recordatorios manuales)",
"Documenta escenarios de precios y plantillas de comunicación",
"Revisa cuentas con puntaje de salud Verde e identifica 3-5 oportunidades de expansión inmediatas",
"Ejecuta tus primeras 3 conversaciones de expansión",
"Agrega revisión mensual de expansión a tu calendario (15 minutos, recurrente)",
"Establece objetivo de NRR a 6 meses y rastrea progreso mensual"
]}
/>

## Qué Sigue: Curso 39 — Promoción del Cliente y Referidos

Has construido el motor de expansión. Ahora vas a convertir a tus mejores clientes en una **máquina de referidos**. Expansión y advocacy son el **dúo de crecimiento compuesto**. La expansión crece los ingresos por cliente. Advocacy crece el conteo de clientes a CAC cercano a cero.

Juntos, crean un negocio que crece exponencialmente mientras duermes.

---

**Has completado el Curso 38: Expansión y Upsell.**

Tu sistema de expansión está construido. Tu baseline de NRR está calculado. Tus triggers están definidos. Tus plantillas están escritas.

Ahora ve a ejecutar. Revisa tus cuentas Verdes. Envía esos primeros 3 emails de expansión. Observa tu NRR subir por encima del 100%.

Tu base de clientes existente está a punto de convertirse en tu mejor canal de crecimiento.
