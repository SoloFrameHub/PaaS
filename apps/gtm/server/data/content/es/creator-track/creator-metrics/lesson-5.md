---
title: "Métricas de Lanzamiento vs Evergreen"
duration: "50 min"
track: "Economía del Creador"
course: "Curso 26: Métricas de Creador Que Importan"
lesson: 5
---

# Métricas de Lanzamiento vs Evergreen

Existen dos modelos de negocio fundamentalmente diferentes en la economía del creador, y requieren métricas completamente distintas. El **modelo de lanzamiento** genera ingresos en ráfagas concentradas -- abres las puertas, vendes intensamente durante 5-14 días y luego cierras. El **modelo evergreen** genera ingresos de forma continua -- tu embudo funciona diariamente, vendiendo a las personas conforme entran a tu ecosistema.

La mayoría de los creadores comienzan con lanzamientos y eventualmente hacen la transición a evergreen (o un modelo híbrido). Pero aquí está el problema: siguen midiendo su sistema evergreen con métricas de lanzamiento, o intentan aplicar estándares evergreen a sus lanzamientos. Este desajuste lleva al pánico, malas decisiones y pivotes prematuros.

Esta lección te da las métricas correctas para cada modelo y un marco para decidir cuándo hacer el cambio.

<RangeSlider
  label="¿Qué modelo estás usando actualmente?"
  min={1}
  max={3}
  lowLabel="Lanzamiento Puro"
  midLabel="Híbrido"
  highLabel="Evergreen Puro"
  persistKey="creator-metrics-L5-model"
/>

---

## Métricas del Modelo de Lanzamiento

Un lanzamiento es un evento de ventas con tiempo limitado. Construyes anticipación, abres inscripciones y cierras las puertas en una fecha específica. El cronograma comprimido crea urgencia y te permite concentrar tu energía.

### Las 6 Métricas de Lanzamiento Que Importan

<SlideNavigation>
<Slide title="1. Tasa de Registro">

El porcentaje de tu audiencia que se registra para tu evento de lanzamiento (webinar, reto, taller, serie de videos).

**Referencia:** 5-15% de tu lista de correo debería registrarse para tu evento de lanzamiento

**Fórmula:** Total de Registrados / Tamaño Total de la Lista de Correo x 100

Si tienes una lista de 5,000 y 400 se registran, eso es 8% -- saludable. Si solo 150 se registran (3%), tu gancho de lanzamiento es débil o tu lista está fatigada.

</Slide>

<Slide title="2. Tasa de Asistencia">

Cubierto en profundidad en la Lección 2. Para eventos específicos de lanzamiento:

**Referencia:** 30-45% para webinars gratuitos, 50-70% para talleres de pago ($27-97 USD / $500-1,800 MXN), 60-80% para retos (Día 1)

</Slide>

<Slide title="3. Tasa de Conversión de la Oferta">

El porcentaje de asistentes que compran durante la ventana de lanzamiento.

**Referencia por mecanismo:**

- Webinar a curso ($200-$997 USD / $3,700-$18,400 MXN): 5-15% de asistentes
- Webinar a ticket alto ($2,000+ USD / $37,000+ MXN): 2-8% de asistentes (que luego agendan llamadas)
- Reto a curso: 3-10% de asistentes del Día 1
- Taller a programa: 8-20% de asistentes (más alto porque los asistentes que pagaron están más comprometidos)

</Slide>

<Slide title="4. Tasa de Conversión de Página de Pago">

De las personas que visitan tu página de ventas/checkout, ¿cuántas realmente completan la compra?

**Referencia:** 10-25% de tasa de conversión en página de pago

Si tu conversión en la página de pago está por debajo del 10%, las causas comunes incluyen:

- Impacto de precio (el precio no se mencionó durante el evento)
- Demasiadas opciones/paquetes causando parálisis de decisión
- Fricción en el checkout (demasiados campos, sin opción de pago a meses con Mercado Pago, garantía poco clara)

</Slide>

<Slide title="5. Ingreso por Registrado (IPR)">

Esta es tu versión específica de lanzamiento del Ingreso por Suscriptor.

**Fórmula:** Ingreso Total del Lanzamiento / Total de Registrados

**Referencia:**

- Lanzamiento de ticket bajo ($200-500 USD / $3,700-$9,200 MXN): $10-40 USD IPR
- Lanzamiento de ticket medio ($500-2,000 USD / $9,200-$37,000 MXN): $30-100 USD IPR
- Lanzamiento de ticket alto ($2,000+ USD / $37,000+ MXN): $50-200 USD IPR

El IPR es el número único que te dice si todo tu sistema de lanzamiento está funcionando. Rastréalo a través de tus lanzamientos para ver si tu rendimiento está mejorando o declinando.

</Slide>

<Slide title="6. Curva de Urgencia al Cierre del Carrito">

Esto rastrea cuándo ocurren las ventas durante tu ventana de lanzamiento:

**Distribución típica para un lanzamiento de 7 días:**

- Día 1 (apertura del carrito): 25-35% del total de ventas
- Días 2-5: 10-20% del total de ventas (la "zona muerta")
- Día 6: 15-20% del total de ventas (la urgencia se activa)
- Día 7 (cierre del carrito): 30-40% del total de ventas

Si no ves un pico en el día final, tu fecha límite no es creíble. Si más del 40% de las ventas ocurren en el Día 1, tu audiencia está caliente pero tu secuencia de lanzamiento no está agregando valor durante los días intermedios.

</Slide>
</SlideNavigation>

<ScenarioSimulator
title="Calculadora de Ingresos de Lanzamiento"
persistKey="creator-metrics-L5-launch-calc"
levers={[
{ id: "listSize", label: "Tamaño de lista de correo", min: 1000, max: 50000, step: 1000, defaultValue: 5000 },
{ id: "regRate", label: "Tasa de registro (%)", min: 3, max: 15, step: 1, defaultValue: 8 },
{ id: "showRate", label: "Tasa de asistencia (%)", min: 20, max: 60, step: 5, defaultValue: 35 },
{ id: "convRate", label: "Tasa de conversión de oferta (%)", min: 2, max: 15, step: 1, defaultValue: 8 },
{ id: "price", label: "Precio de la oferta ($)", min: 200, max: 3000, step: 100, defaultValue: 497 }
]}
outputs={[
{ id: "registrants", label: "Registrados", formula: "(listSize * (regRate / 100))", unit: "", precision: 0 },
{ id: "attendees", label: "Asistentes", formula: "(listSize * (regRate / 100) * (showRate / 100))", unit: "", precision: 0 },
{ id: "buyers", label: "Compradores", formula: "(listSize * (regRate / 100) * (showRate / 100) * (convRate / 100))", unit: "", precision: 0 },
{ id: "revenue", label: "Ingreso total", formula: "(listSize * (regRate / 100) * (showRate / 100) * (convRate / 100) * price)", unit: "$", precision: 0 },
{ id: "rpr", label: "Ingreso por registrado", formula: "((listSize * (regRate / 100) * (showRate / 100) * (convRate / 100) * price) / (listSize * (regRate / 100)))", unit: "$", precision: 2 }
]}
insight="Con {buyers} compradores × ${price}, tu IPR es ${rpr}. La referencia de la industria para una oferta de ${price} es $30-100 USD de IPR."
/>

---

## Métricas del Modelo Evergreen

Un embudo evergreen funciona de forma continua. No hay un "día de lanzamiento" -- alguien puede entrar a tu embudo hoy y llegar al punto de compra en 3-14 días a partir de ahora, todos los días del año.

### Las 6 Métricas Evergreen Que Importan

<ProgressiveReveal title="Las 6 Métricas Evergreen" persistKey="creator-metrics-L5-evergreen">
<RevealSection title="1. Tasa Diaria de Opt-In">

¿Cuántos nuevos leads entran a tu embudo cada día?

**Referencia por fuente de tráfico:**

- Contenido orgánico (redes sociales, SEO, podcast): 5-30 por día dependiendo del tamaño de la audiencia
- Anuncios pagados: depende completamente del presupuesto, pero apunta a $3-15 USD ($55-275 MXN) por opt-in para la mayoría de los nichos de creadores

**Fórmula:** Total de Nuevos Opt-Ins Esta Semana / 7

Este es tu "indicador de combustible". Si los opt-ins diarios caen por debajo de tu número mínimo viable, los ingresos disminuirán 7-14 días después (una vez que el pipeline se seque).

</RevealSection>

<RevealSection title="2. Tasa de Visualización del Webinar Automatizado">

Si usas un webinar automatizado/bajo demanda como tu evento principal de conversión:

**Referencia:** 25-40% de los opt-ins ven el webinar dentro de 7 días

Por debajo del 25% significa que tu secuencia de correos no es lo suficientemente convincente para motivar a la gente a ver. Por encima del 40% indica buena calidad de leads y correos de nutrición efectivos.

</RevealSection>

<RevealSection title="3. Ventas por Día (VPD)">

La métrica evergreen más importante. ¿Cuántas ventas haces por día, en promedio?

**Fórmula:** Total de Ventas Este Mes / 30

**Por qué importa:** VPD es tu "latido" evergreen. Te dice de un vistazo si tu embudo está saludable. Rastréalo con un promedio móvil de 7 y 30 días para suavizar la variación diaria.

**Ejemplos de objetivos:**

- 1 venta/día de un producto de $497 USD ($9,200 MXN) = $14,910 USD/mes ($275,400 MXN/mes)
- 0.5 ventas/día de un producto de $2,000 USD ($37,000 MXN) = $30,000 USD/mes ($555,000 MXN/mes)
- 0.2 ventas/día de un paquete de coaching de $5,000 USD ($92,500 MXN) = $30,000 USD/mes ($555,000 MXN/mes)

</RevealSection>

<RevealSection title="4. Tiempo hasta la Compra (TTC)">

El número promedio de días entre que alguien hace opt-in y realiza su primera compra.

**Referencia:**

- Ticket bajo ($50-200 USD): 1-7 días
- Ticket medio ($200-1,000 USD): 7-21 días
- Ticket alto ($1,000+ USD): 14-45 días

El TTC te ayuda a establecer expectativas realistas para el flujo de caja. Si tu TTC es de 21 días, el dinero que gastas en anuncios hoy no retornará en 3 semanas. Planifica tu flujo de caja acorde.

</RevealSection>

<RevealSection title="5. Tasa de Conversión de Secuencia de Correo">

El porcentaje de personas que hacen opt-in y eventualmente compran a través de tu secuencia de correo.

**Referencia:**

- Secuencia básica de bienvenida (3-5 correos): 0.5-2% de conversión
- Secuencia completa de nutrición (7-14 correos): 1-5% de conversión
- Secuencia con webinar automatizado: 2-8% de conversión

</RevealSection>

<RevealSection title="6. ROI del Embudo (para tráfico pagado)">

**Fórmula:** (Ingresos del Embudo - Gasto en Anuncios) / Gasto en Anuncios x 100

**Referencia:**

- 0-50% ROI en los primeros 30 días: Aceptable si tienes un backend (upsells, recurrente)
- 50-100% ROI en 30 días: Bueno
- 100%+ ROI en 30 días: Fuerte
- 200%+ ROI en 30 días: Escala agresivamente

Muchos embudos evergreen exitosos empatan en el front end (0% ROI a los 30 días) y generan su ganancia en el backend a través de upsells, order bumps e ingresos recurrentes. Si solo mides el ROI del front-end, matarás embudos rentables prematuramente.

</RevealSection>
</ProgressiveReveal>

<InsightCard icon="💡" title="La Ventaja de las VPD">
Las Ventas Por Día son la métrica evergreen más poderosa porque normalizan la variación. Un lanzamiento podría generar $50K en una semana y $0 las siguientes tres semanas. Un embudo evergreen generando 0.5 ventas/día de una oferta de $2K USD produce $30K/mes de forma consistente -- más fácil de pronosticar, más fácil de escalar.
</InsightCard>

---

## Cuándo Cambiar de Lanzamiento a Evergreen

El modelo de lanzamiento no es inherentemente mejor ni peor que el evergreen. Cada uno tiene ventajas:

<StrategyDuel
title="Lanzamiento vs Evergreen: ¿Qué Modelo Te Conviene?"
persistKey="creator-metrics-L5-duel"
scenario="Tienes un curso probado de $497 USD ($9,200 MXN) y 8,000 suscriptores de correo. Has hecho 3 lanzamientos exitosos promediando $35K USD ($647K MXN) cada uno."
strategyA={{
    name: "Seguir con Lanzamientos",
    description: "Continuar haciendo 4 lanzamientos por año",
    pros: [
      "Energía y atención concentradas",
      "Los picos de ingresos ayudan con la planificación de flujo de caja",
      "La entrega basada en cohortes crea comunidad",
      "Los eventos de lanzamiento reactivan suscriptores dormidos"
    ],
    cons: [
      "Montaña rusa emocional de los ciclos de lanzamiento",
      "Brechas de ingresos entre lanzamientos",
      "Requiere contenido/ganchos nuevos constantemente",
      "Riesgo de burnout por la intensidad repetida"
    ]
  }}
strategyB={{
    name: "Ir a Evergreen",
    description: "Construir un embudo automatizado funcionando diariamente",
    pros: [
      "Ingresos mensuales predecibles",
      "Sin burnout por ciclos de lanzamiento",
      "Escala con tráfico (no con tu energía)",
      "Funciona mientras duermes/viajas"
    ],
    cons: [
      "Requiere un webinar/proceso de ventas probado",
      "Necesita tráfico diario consistente (20+ opt-ins/día)",
      "Menos energía de comunidad/cohorte",
      "Más difícil reactivar suscriptores fríos"
    ]
  }}
expertVerdict="Con 8K suscriptores y datos de lanzamiento probados, estás listo para evergreen. Comienza con un híbrido: embudo evergreen para ingresos base ($15-20K USD/mes / $275-370K MXN/mes), más 2 lanzamientos/año para impulsos de crecimiento y reactivación de la lista."
/>

### Quédate con Lanzamientos Cuando:

- Tu audiencia es pequeña (menos de 5,000 suscriptores de correo) -- los lanzamientos concentran la atención
- Tu oferta es nueva y no probada -- los lanzamientos te dan retroalimentación rápida
- Disfrutas la energía e intensidad de los períodos de lanzamiento
- Tu oferta se beneficia de la entrega basada en cohortes (programas grupales, cursos en vivo)
- Aún estás refinando tu mensaje y posicionamiento

### Cambia a Evergreen Cuando:

- Tienes datos de lanzamiento probados (al menos 2-3 lanzamientos exitosos con la misma oferta)
- Tu audiencia es lo suficientemente grande para generar opt-ins diarios consistentes (20+ por día)
- Te estás quemando con el ciclo de lanzamientos (la montaña rusa emocional es insostenible)
- Tu oferta funciona tan bien en formato autodidacta como en vivo
- Quieres ingresos mensuales predecibles en lugar de picos de ingresos

### El Modelo Híbrido

Muchos creadores exitosos usan ambos: un embudo evergreen que funciona diariamente, más 2-4 lanzamientos por año que crean picos de ingresos y reactivan suscriptores dormidos. El embudo evergreen proporciona la base; los lanzamientos proporcionan los impulsos de crecimiento.

**Referencia híbrida:** Tus ingresos evergreen deberían ser el 60-70% de tus ingresos anuales totales, con los lanzamientos contribuyendo el 30-40%.

<ClassifyExercise
title="Clasifica a Estos Creadores por Mejor Modelo"
persistKey="creator-metrics-L5-classify"
categories={[
{ id: "launch", label: "Modelo de Lanzamiento", color: "#ef4444" },
{ id: "evergreen", label: "Modelo Evergreen", color: "#3b82f6" },
{ id: "hybrid", label: "Modelo Híbrido", color: "#8b5cf6" }
]}
items={[
{
id: "1",
content: "2,000 suscriptores, primer lanzamiento de curso, programa basado en cohorte",
correctCategory: "launch",
explanation: "Lista pequeña + oferta no probada + entrega en cohorte = el modelo de lanzamiento es el mejor"
},
{
id: "2",
content: "15,000 suscriptores, 3 lanzamientos exitosos, curso autodidacta, generando 40 opt-ins/día orgánicamente",
correctCategory: "evergreen",
explanation: "Lista grande + oferta probada + tráfico consistente + autodidacta = listo para evergreen"
},
{
id: "3",
content: "10,000 suscriptores, embudo evergreen generando $20K USD/mes, quiere reactivar suscriptores fríos",
correctCategory: "hybrid",
explanation: "Base evergreen funcionando + deseo de impulsar ingresos y reactivar = agregar lanzamientos para híbrido"
},
{
id: "4",
content: "8,000 suscriptores, webinar probado convirtiendo al 12%, pero solo obtiene 5 opt-ins/día",
correctCategory: "launch",
explanation: "Oferta probada pero tráfico diario insuficiente para sostener un evergreen"
},
{
id: "5",
content: "20,000 suscriptores, embudo evergreen exitoso, quiere probar una nueva oferta de ticket alto",
correctCategory: "hybrid",
explanation: "Mantener la base evergreen funcionando, usar lanzamientos para probar nuevas ofertas con atención concentrada"
}
]}
/>

---

## El Marco de Transición

Si estás pasando de lanzamiento a evergreen, estos son los datos que necesitas primero:

1. **Tu webinar o evento de ventas probado** -- la presentación exacta que ha convertido al 5%+ durante al menos dos lanzamientos
2. **Tu secuencia de correo** -- al menos 7 correos con tasas de apertura superiores al 25% y tasas de clic superiores al 3%
3. **Las métricas de tu oferta front-end** -- precio, tasa de conversión y valor promedio de orden incluyendo upsells
4. **Tu plan de tráfico** -- cómo generarás 10-30 opt-ins diarios sin la energía del lanzamiento impulsándolos

No intentes construir un embudo evergreen desde cero. Toma lo que funcionó en tus lanzamientos y automatízalo. El webinar se convierte en un webinar bajo demanda. La secuencia de correo se convierte en una secuencia de nutrición automatizada. La fecha límite de cierre del carrito se convierte en una fecha límite automatizada (herramientas como Deadline Funnel crean fechas límite reales por persona).

<TemplateBuilder
title="Lista de Verificación para Transición Evergreen"
persistKey="creator-metrics-L5-transition"
sections={[
{
id: "proven-assets",
title: "Activos Probados",
fields: [
{
id: "webinar",
label: "Webinar/evento de ventas que convirtió al 5%+ en lanzamientos",
placeholder: "ej., Webinar 'El Marco de 5 Pasos' - 8% de conversión en los últimos 2 lanzamientos",
type: "textarea"
},
{
id: "emails",
label: "Secuencia de correo con métricas de engagement fuertes",
placeholder: "ej., Secuencia de 7 correos, promedio 28% tasa de apertura, 4% tasa de clic",
type: "textarea"
}
]
},
{
id: "offer-metrics",
title: "Métricas de la Oferta",
fields: [
{
id: "price",
label: "Precio de la oferta front-end",
placeholder: "ej., $497 USD ($9,200 MXN)",
type: "text"
},
{
id: "conversion",
label: "Tasa de conversión del lanzamiento (asistentes a compradores)",
placeholder: "ej., 8% de asistentes al webinar",
type: "text"
},
{
id: "aov",
label: "Valor promedio de orden (incluyendo upsells/bumps)",
placeholder: "ej., $612 USD con order bump",
type: "text"
}
]
},
{
id: "traffic-plan",
title: "Plan de Tráfico",
fields: [
{
id: "sources",
label: "¿Cómo generarás 20+ opt-ins diarios?",
placeholder: "ej., SEO de YouTube (10/día) + anuncios de Facebook ($50 USD/día, $5 USD CPA = 10/día)",
type: "textarea"
},
{
id: "timeline",
label: "¿Cuándo tendrás tráfico consistente?",
placeholder: "ej., Publicación de contenido en YouTube durante 90 días, anuncios lanzan en 30 días",
type: "textarea"
}
]
}
]}
/>

---

## Elementos de Acción

<InteractiveChecklist
title="Tus Elementos de Acción: Lanzamiento vs Evergreen"
persistKey="creator-metrics-L5-actions"
items={[
"Identifica tu modelo actual: ¿Estás ejecutando lanzamientos, evergreen o híbrido? Escríbelo.",
"Rastrea las 6 métricas correctas: Según tu modelo, configura el seguimiento de las 6 métricas que aplican a tu caso.",
"Calcula tu IPR o VPD: Si lanzas, calcula el Ingreso Por Registrado de tu último lanzamiento. Si eres evergreen, calcula las Ventas Por Día de los últimos 30 días.",
"Evalúa tu preparación para la transición: Si solo haces lanzamientos, revisa los criterios de 'Cambia a Evergreen Cuando'. ¿Cuántos cumples?",
"Si estás en transición a evergreen: Completa la Lista de Verificación para Transición Evergreen de arriba para identificar brechas en tus activos probados, métricas de oferta o plan de tráfico."
]}
/>

---

**Siguiente Lección:** [Ratio Audiencia-Ingresos](/creator-track/creator-metrics/lesson-6)
