---
title: "Tu Modelo de Puntuación de Leads (1-10 Ajuste + Señal + Fricción)"
duration: "50 min"
track: "Adquisición con IA"
course: "Curso 21: Estrategia de Adquisición con IA"
lesson: 4
---

Construiste tu lista. Enriqueciste los datos. Ahora estás mirando 500 prospectos y enfrentando una pregunta brutal: **¿Cuáles 50 merecen tu tiempo esta semana?**

Sin un sistema de puntuación, terminarás:

- Desperdiciando horas en personas que nunca comprarán
- Perdiendo los leads calientes enterrados en tu CRM
- Agotándote persiguiendo a "todos" con la misma intensidad

La realidad es: **No todos los leads son iguales.** Una empresa SaaS de Serie A recientemente financiada que acaba de contratar a un VP de Ventas vale 10 veces más atención que un solopreneur bootstrapped que no ha actualizado su LinkedIn en 2 años.

¿La solución? Un modelo de puntuación simple del 1 al 10 que combina tres dimensiones: **Ajuste** (¿coinciden con tu ICP?), **Señal** (¿muestran intención de compra?) y **Fricción** (¿qué bloquea la venta?).

Al final de esta lección, tendrás una rúbrica de puntuación de leads funcional que te dice exactamente a quién llamar primero.

---

## El Problema con el "Spray and Pray"

La mayoría de los fundadores en solitario tratan a todos los prospectos igual. Envían la misma secuencia al VP de una empresa de $50M y al becario de una startup de 3 personas. La misma cadencia de seguimiento. El mismo nivel de personalización.

¿El resultado? **Más del 50% del tiempo de ventas desperdiciado en prospectos no calificados.**

<InsightCard icon="📊" title="La Brecha de Calificación">
Solo el 25% de los leads de marketing están realmente listos para venta, pero la mayoría de los fundadores dedica el mismo tiempo a todos ellos. La puntuación de leads aumenta la productividad de ventas en un 20-30% al concentrar el esfuerzo donde importa.
</InsightCard>

Piensa en tus últimas 20 conversaciones de alcance. ¿Cuántas fueron con personas que:

- No tenían presupuesto?
- No eran el tomador de decisiones?
- No tenían un problema urgente que resolver?
- Solo "exploraban opciones" sin un cronograma definido?

Ahora imagina que lo hubieras sabido **antes** de pasar 30 minutos en una llamada de descubrimiento.

<RangeSlider
  label="¿Qué porcentaje de tu tiempo de ventas se gasta en leads no calificados?"
  min={0}
  max={100}
  lowLabel="0% (soy perfecto)"
  highLabel="100% (todo mi tiempo)"
  persistKey="ai-acquisition-strategy-L4-waste"
/>

---

## El Modelo AJUSTE + SEÑAL + FRICCIÓN

Este es el marco que cambia todo:

<FlipCard
  front="La Fórmula de Puntuación 1-10"
  back="Puntuación = AJUSTE (0-4 puntos) + SEÑAL (0-4 puntos) - FRICCIÓN (0-2 puntos). Umbrales de acción: 8-10 = Alcance personal inmediato | 5-7 = Secuencia automatizada | 1-4 = Nurturing o descalificación"
/>

Analicemos cada dimensión.

### Dimensión 1: AJUSTE (0-4 Puntos)

El **Ajuste** mide qué tan bien un prospecto coincide con tu Perfil de Cliente Ideal. Son datos firmográficos y demográficos — datos que no cambian día a día.

Asigna **1 punto** por cada una de estas coincidencias:

1. **Coincidencia de Industria/Vertical** — ¿Están en un segmento al que sirves bien?
2. **Coincidencia de Cargo/Rol** — ¿Esta persona es el tomador de decisiones real o un influencer clave?
3. **Coincidencia de Tamaño de Empresa** — ¿Se ajustan a tu punto óptimo (empleados, ingresos, etapa de financiamiento)?
4. **Coincidencia de Stack Tecnológico/Señal** — ¿Usan herramientas complementarias o muestran sofisticación técnica?

**Ejemplo:**

- **Tu ICP:** Empresas B2B SaaS, 10-50 empleados, $500K-5M ARR, usando HubSpot
- **Prospecto A:** VP de Ventas en una empresa SaaS de 30 personas, $2M ARR, usa HubSpot → **4/4 AJUSTE**
- **Prospecto B:** Coordinadora de Marketing en una marca de e-commerce de 200 personas, usa Shopify → **1/4 AJUSTE** (solo el rol es algo relevante)

<ExampleCard label="Ejemplo Real: El Error de $40K">
Un fundador pasó 3 meses persiguiendo logos empresariales (500+ empleados) porque "parecían impresionantes". Su producto fue construido para equipos de 10-50 personas. Ciclo de ventas promedio: 9 meses. Tasa de cierre: 5%.

Cuando se reenfocó en su ICP real (empresas de 30 personas), el ciclo de ventas se redujo a 6 semanas y la tasa de cierre saltó al 35%. Mismo esfuerzo, resultados 7 veces mejores.
</ExampleCard>

<TemplateBuilder
title="Define Tus Criterios de AJUSTE"
persistKey="ai-acquisition-strategy-L4-fit"
sections={[
{
id: "industry",
title: "Industria/Vertical",
fields: [
{ id: "primary", label: "Industria Principal", placeholder: "ej., B2B SaaS, e-commerce DTC", type: "text" },
{ id: "secondary", label: "Industrias Secundarias (si aplica)", placeholder: "ej., Servicios profesionales, Agencias", type: "text" }
]
},
{
id: "role",
title: "Cargo/Rol",
fields: [
{ id: "buyer", label: "Cargo del Tomador de Decisiones Principal", placeholder: "ej., VP de Ventas, Director de Marketing", type: "text" },
{ id: "influencer", label: "Cargos de Influencers Clave", placeholder: "ej., Gerente de Operaciones de Ventas, Director de Marketing", type: "text" }
]
},
{
id: "size",
title: "Tamaño de Empresa",
fields: [
{ id: "employees", label: "Rango de Empleados", placeholder: "ej., 10-50", type: "text" },
{ id: "revenue", label: "Rango de Ingresos (si se conoce)", placeholder: "ej., $500K-5M ARR", type: "text" }
]
},
{
id: "tech",
title: "Stack Tecnológico/Señales",
fields: [
{ id: "tools", label: "Herramientas Clave que Deben Usar", placeholder: "ej., HubSpot, Salesforce, Stripe", type: "text" },
{ id: "maturity", label: "Indicador de Madurez Técnica", placeholder: "ej., Tiene un CRM, usa automatización de marketing", type: "text" }
]
}
]}
/>

---

## Dimensión 2: SEÑAL (0-4 Puntos)

La **Señal** mide la intención de comportamiento: acciones que sugieren que están en el mercado o listos para comprar. Son datos dinámicos que cambian semanalmente.

Asigna **1 punto** por cada una de estas señales:

1. **Cambio de Trabajo (Últimos 90 Días)** — Nuevo rol = nuevo presupuesto, nuevas prioridades, nuevas decisiones de proveedores
2. **Evento de Financiamiento/Crecimiento** — Levantamiento reciente, adquisición, expansión, nueva oficina
3. **Participación en Contenido** — Descargó tu lead magnet, asistió a un webinar, interactuó con publicaciones
4. **Evaluación de Competidor** — Visitó sitios de competidores, preguntó por alternativas, mencionó cambio

**El Poder de los Cambios de Trabajo:**

<InsightCard icon="🚀" title="La Ventana de 90 Días">
Los prospectos que cambiaron de trabajo en los últimos 90 días tienen **3 veces más probabilidades de comprar** que los contactos estáticos. Están construyendo nuevos sistemas, demostrando su valor y tienen autoridad de presupuesto fresca.
</InsightCard>

¿Dónde encuentras estas señales?

<SlideNavigation>
<Slide title="Señales de Primera Parte (Gratis)">

**Comportamiento en el Sitio Web:**

- Visitó la página de precios 3+ veces
- Pasó 5+ minutos en casos de estudio
- Descargó un recurso

**Participación en Email:**

- Abrió tus últimos 3 emails
- Hizo clic en un enlace de demo
- Respondió con una pregunta

**Herramientas:** Google Analytics 4 (gratis), HubSpot CRM (seguimiento de email gratuito)

</Slide>

<Slide title="Señales de Segunda Parte (Bajo Costo)">

**Actividad en LinkedIn:**

- Cambió de trabajo en los últimos 90 días
- Publicó sobre un problema que resuelves
- Interactuó con tu contenido

**Noticias/Financiamiento:**

- Anuncios de financiamiento en Crunchbase
- Publicaciones en el blog de la empresa sobre crecimiento
- Comunicados de prensa sobre nuevas contrataciones

**Herramientas:** LinkedIn Sales Navigator ($99.99/mes), Google Alerts (gratis), Crunchbase (nivel gratuito)

</Slide>

<Slide title="Señales de Tercera Parte (Caras — Omitir por Ahora)">

**Plataformas de Datos de Intención:**

- Bombora ($2,000+/mes)
- 6sense ($3,000+/mes)
- ZoomInfo Intent ($1,500+/mes)

**¿Por qué omitirlas?** A escala de fundador en solitario, el ROI no está justificado. Mantente con señales de primera y segunda parte hasta que generes $50K+/mes.

</Slide>
</SlideNavigation>

<ClassifyExercise
title="Clasifica Estas Señales"
persistKey="ai-acquisition-strategy-L4-signals"
categories={[
{ id: "strong", label: "Señal Fuerte (1 punto)", color: "#10b981" },
{ id: "weak", label: "Señal Débil (0 puntos)", color: "#6b7280" }
]}
items={[
{ id: "1", content: "El prospecto cambió de trabajo hace 3 semanas", correctCategory: "strong" },
{ id: "2", content: "El prospecto le dio 'me gusta' a tu publicación de LinkedIn", correctCategory: "weak" },
{ id: "3", content: "La empresa anunció financiamiento de Serie A el mes pasado", correctCategory: "strong" },
{ id: "4", content: "El prospecto visitó tu página de inicio una vez", correctCategory: "weak" },
{ id: "5", content: "El prospecto descargó tu lead magnet y visitó la página de precios", correctCategory: "strong" },
{ id: "6", content: "El prospecto tiene el mismo cargo desde hace 5 años, sin actividad reciente", correctCategory: "weak" }
]}
/>

---

## Dimensión 3: FRICCIÓN (0 a -2 Puntos)

La **Fricción** mide las barreras para cerrar. Son señales de alerta que hacen los tratos más difíciles, lentos o menos probables de cerrar.

**Resta 1 punto** por cada uno de estos factores de fricción:

1. **Industria con Ciclo de Ventas Largo** — Salud, gobierno, educación (ciclos de 6-12+ meses)
2. **Proceso de Compra por Comité** — Tratos empresariales que requieren 5+ partes interesadas

**¿Por qué restar en lugar de simplemente puntuar más bajo en AJUSTE?**

Porque la fricción es diferente al mal ajuste. Un prospecto puede ser una _coincidencia perfecta_ de ICP (4/4 AJUSTE) y mostrar intención fuerte (3/4 SEÑAL), pero si está en el sector salud con un proceso de contratación de 9 meses, necesitas saberlo de antemano.

<SwipeDecision
title="¿Alta Fricción o Baja Fricción?"
description="Desliza a la derecha para baja fricción (fácil de cerrar), a la izquierda para alta fricción (difícil de cerrar)"
optionA="Alta Fricción"
optionB="Baja Fricción"
persistKey="ai-acquisition-strategy-L4-friction"
cards={[
{ id: "1", content: "Fundador en solitario con tarjeta de crédito, toma decisiones en 1 semana", correctOption: "b", explanation: "Baja fricción — decisión rápida, proceso de compra simple" },
{ id: "2", content: "Empresa con equipo de compras, revisión legal, ciclo de 6 meses", correctOption: "a", explanation: "Alta fricción — compra por comité, ciclo de ventas largo" },
{ id: "3", content: "VP de SaaS de mercado medio con autoridad de presupuesto, evaluación de 2 semanas", correctOption: "b", explanation: "Baja fricción — tomador de decisiones único, plazo razonable" },
{ id: "4", content: "Agencia gubernamental que requiere RFP y revisión de cumplimiento", correctOption: "a", explanation: "Alta fricción — requisitos regulatorios, contratación larga" },
{ id: "5", content: "Fundador de startup que puede iniciar la prueba hoy", correctOption: "b", explanation: "Baja fricción — autoservicio, acción inmediata" }
]}
/>

---

## Integrando Todo: Umbrales de Acción

Ahora que puedes puntuar cualquier lead del 1 al 10, ¿qué _haces_ con esa puntuación?

<FlipCard
  front="Puntuación 8-10: Leads Calientes"
  back="Alcance personal inmediato. Investiga durante 15-30 minutos. Escribe un email personalizado o mensaje de LinkedIn. Da seguimiento en 48 horas si no hay respuesta. Estos son tu 10-20% superior de leads."
/>

<FlipCard
  front="Puntuación 5-7: Leads Tibios"
  back="Secuencia automatizada con personalización a nivel de segmento. Primeras líneas asistidas por IA. Secuencia de 3-5 contactos durante 2 semanas. Verifica puntualmente el 10-20% para calidad. Estos son tu 50% medio de leads."
/>

<FlipCard
  front="Puntuación 1-4: Leads Fríos"
  back="Secuencia de nurturing o descalificación. Boletín mensual, goteo de contenido, o eliminar del alcance activo. No desperdicies tiempo en seguimiento manual. Estos son tu 30% inferior de leads."
/>

**Las Matemáticas:**

Si tienes 200 prospectos:

- **20-40 leads (10-20%)** con puntuación 8-10 → 5-10 horas de alcance personal
- **100-120 leads (50-60%)** con puntuación 5-7 → 2-3 horas de configuración de secuencia + monitoreo
- **40-80 leads (20-40%)** con puntuación 1-4 → 30 minutos para agregar a nurturing o archivar

Tiempo total: **8-14 horas** para procesar 200 leads vs. **40+ horas** si los tratas a todos igual.

<ScenarioSimulator
title="Calculadora de ROI de Puntuación de Leads"
persistKey="ai-acquisition-strategy-L4-roi"
levers={[
{ id: "totalLeads", label: "Total de leads en CRM", min: 50, max: 1000, step: 50, defaultValue: 200 },
{ id: "hotPercent", label: "% con puntuación 8-10 (calientes)", min: 5, max: 30, step: 5, defaultValue: 15 },
{ id: "warmPercent", label: "% con puntuación 5-7 (tibios)", min: 30, max: 70, step: 5, defaultValue: 55 },
{ id: "timePerHot", label: "Minutos por lead caliente", min: 10, max: 60, step: 5, defaultValue: 20 }
]}
outputs={[
{ id: "hotLeads", label: "Leads calientes a trabajar", formula: "totalLeads * (hotPercent / 100)", unit: " leads", precision: 0 },
{ id: "warmLeads", label: "Leads tibios (automatizados)", formula: "totalLeads * (warmPercent / 100)", unit: " leads", precision: 0 },
{ id: "coldLeads", label: "Leads fríos (nurturing/archivo)", formula: "totalLeads - (totalLeads * (hotPercent / 100)) - (totalLeads * (warmPercent / 100))", unit: " leads", precision: 0 },
{ id: "hotTime", label: "Tiempo en leads calientes", formula: "(totalLeads * (hotPercent / 100) * timePerHot) / 60", unit: " horas", precision: 1 },
{ id: "totalTime", label: "Tiempo total ahorrado vs. sin puntuación", formula: "((totalLeads * 20) / 60) - ((totalLeads * (hotPercent / 100) * timePerHot) / 60) - 3", unit: " horas", precision: 1 }
]}
insight="Con puntuación, dedicas {hotTime} horas a tus mejores {hotLeads} leads en lugar de {(totalLeads \* 20) / 60} horas tratando a todos igual. Eso es {totalTime} horas ahorradas por lote."
/>

---

## Construyendo Tu Rúbrica de Puntuación

Hora de hacerlo real. Vas a construir tu propio modelo de puntuación 1-10 ahora mismo.

<TemplateBuilder
title="Tu Rúbrica de Puntuación de Leads"
persistKey="ai-acquisition-strategy-L4-rubric"
sections={[
{
id: "fit",
title: "Criterios de AJUSTE (0-4 puntos)",
fields: [
{ id: "industry", label: "Coincidencia de Industria (+1 punto si...)", placeholder: "ej., Están en B2B SaaS o servicios profesionales", type: "text" },
{ id: "title", label: "Coincidencia de Cargo (+1 punto si...)", placeholder: "ej., Son VP de Ventas, Director de Marketing o Fundador", type: "text" },
{ id: "size", label: "Coincidencia de Tamaño de Empresa (+1 punto si...)", placeholder: "ej., Tienen 10-50 empleados", type: "text" },
{ id: "tech", label: "Coincidencia de Stack Tecnológico (+1 punto si...)", placeholder: "ej., Usan HubSpot, Salesforce u otro CRM similar", type: "text" }
]
},
{
id: "signal",
title: "Criterios de SEÑAL (0-4 puntos)",
fields: [
{ id: "jobChange", label: "Cambio de Trabajo (+1 punto si...)", placeholder: "ej., Cambió de trabajo en los últimos 90 días", type: "text" },
{ id: "funding", label: "Financiamiento/Crecimiento (+1 punto si...)", placeholder: "ej., Levantó financiamiento o anunció expansión en los últimos 6 meses", type: "text" },
{ id: "engagement", label: "Participación en Contenido (+1 punto si...)", placeholder: "ej., Descargó lead magnet, asistió a webinar, o interactuó 3+ veces", type: "text" },
{ id: "competitor", label: "Evaluación de Competidor (+1 punto si...)", placeholder: "ej., Mencionó cambiar de herramienta o visitó sitios de competidores", type: "text" }
]
},
{
id: "friction",
title: "Criterios de FRICCIÓN (0 a -2 puntos)",
fields: [
{ id: "cycle", label: "Ciclo de Ventas Largo (-1 punto si...)", placeholder: "ej., Sector salud, gobierno o educación", type: "text" },
{ id: "committee", label: "Compra por Comité (-1 punto si...)", placeholder: "ej., Trato empresarial que requiere 5+ partes interesadas", type: "text" }
]
},
{
id: "thresholds",
title: "Umbrales de Acción",
fields: [
{ id: "hot", label: "Acción para Puntuación 8-10", placeholder: "ej., Investigación personal + email personalizado en 24 horas", type: "textarea" },
{ id: "warm", label: "Acción para Puntuación 5-7", placeholder: "ej., Agregar a secuencia automatizada con personalización asistida por IA", type: "textarea" },
{ id: "cold", label: "Acción para Puntuación 1-4", placeholder: "ej., Agregar a nurturing mensual o archivar", type: "textarea" }
]
}
]}
/>

---

## Automatizando las Actualizaciones de Puntuación

Aquí es donde brilla la IA y la automatización: **No querrás volver a puntuar manualmente 200 leads cada semana.**

En cambio, configura disparadores que actualicen automáticamente las puntuaciones cuando cambien las señales:

**Recetas de Automatización en Zapier/Make:**

1. **Cambio de Trabajo Detectado** (alerta de LinkedIn Sales Navigator) → Suma +1 a la puntuación SEÑAL → Mover a vista "Leads Calientes" si la puntuación total ≥ 8
2. **Email Abierto 3+ Veces** (seguimiento de HubSpot) → Suma +1 a la puntuación SEÑAL
3. **Anuncio de Financiamiento** (alerta de Crunchbase) → Suma +1 a la puntuación SEÑAL
4. **Visita a Página de Precios** (evento de GA4) → Suma +1 a la puntuación SEÑAL
5. **Sin Actividad en 90 Días** → Resta -1 de la puntuación SEÑAL → Mover a "Nurturing" si la puntuación total ≤ 4

<InsightCard icon="⚡" title="El Poder de la Puntuación Dinámica">
Las puntuaciones estáticas se desactualizan en semanas. La puntuación dinámica significa que un lead que era un 5 el mes pasado (secuencia tibia) se convierte en un 9 esta semana (alcance personal) cuando cambia de trabajo y visita tu página de precios.
</InsightCard>

**Herramientas para Automatización:**

- **Gratis:** Zapier Gratis (100 tareas/mes), Make Gratis (1,000 operaciones/mes)
- **Pago:** Zapier Starter ($19.99/mes por 750 tareas), Make Core ($9/mes por 10,000 operaciones)
- **CRM:** HubSpot Gratis (puntuación básica), Apollo.io Pro ($99/mes incluye puntuación)

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Puedes construir esta lógica de puntuación directamente en tu CRM usando campos personalizados y flujos de trabajo. El nivel gratuito de HubSpot admite propiedades calculadas. Si usas Airtable o Notion como CRM, puedes usar fórmulas para calcular puntuaciones automáticamente.

Ejemplo de fórmula en Airtable:

```
{Coincidencia Industria} + {Coincidencia Cargo} + {Coincidencia Tamaño} + {Coincidencia Tech} + {Cambio Trabajo} + {Financiamiento} + {Participación} + {Competidor} - {Ciclo Largo} - {Comité}
```

</ContextualNote>

---

## Práctica: Puntúa Estos Leads

Pongamos a prueba tus habilidades de puntuación. Para cada prospecto, calcula su puntuación total usando el modelo AJUSTE + SEÑAL - FRICCIÓN.

<TimedChallenge
title="Ronda Rápida de Puntuación de Leads"
persistKey="ai-acquisition-strategy-L4-practice"
timeLimit={120}
items={[
{
id: "1",
prompt: "VP de Ventas en empresa SaaS B2B de 40 personas ($3M ARR), usa HubSpot, cambió de trabajo hace 2 meses, sin financiamiento reciente, no está en industria regulada",
correctAnswer: "8",
explanation: "AJUSTE: 4/4 (industria, cargo, tamaño, tech). SEÑAL: 1/4 (solo cambio de trabajo). FRICCIÓN: 0. Total: 4+1-0 = 5. Nota: el puntaje exacto depende de tu ICP específico."
},
{
id: "2",
prompt: "Coordinadora de Marketing en empresa de e-commerce de 200 personas, sin CRM, mismo cargo desde hace 3 años, sin actividad reciente",
correctAnswer: "1",
explanation: "AJUSTE: 1/4 (solo el rol es algo relevante). SEÑAL: 0/4. FRICCIÓN: 0. Total: 1+0-0 = 1."
},
{
id: "3",
prompt: "Fundador de agencia de 15 personas, usa HubSpot, levantó $500K de capital semilla el mes pasado, visitó la página de precios 3 veces",
correctAnswer: "7",
explanation: "AJUSTE: 3-4/4 (industria, cargo, tamaño; HubSpot podría contar). SEÑAL: 2/4 (financiamiento + participación). FRICCIÓN: 0. Total: aproximadamente 5-6."
},
{
id: "4",
prompt: "VP de Operaciones en empresa de salud de 500 personas, coincidencia perfecta de ICP, recién cambió de trabajo, pero requiere ciclo de contratación de 6 meses",
correctAnswer: "6",
explanation: "AJUSTE: 3-4/4 (depende si 500 empleados encaja en tu ICP). SEÑAL: 1/4 (cambio de trabajo). FRICCIÓN: -1 (ciclo de ventas largo). Total: aproximadamente 3-4."
}
]}
/>

_(Nota: La puntuación puede ser subjetiva según tu ICP específico. La clave es la consistencia en cómo aplicas tu rúbrica.)_

---

## Errores Comunes de Puntuación

<ProgressiveReveal title="5 Errores a Evitar en la Puntuación" persistKey="ai-acquisition-strategy-L4-pitfalls">

<RevealSection title="Error 1: Puntuar por Métricas de Vanidad">

**El Problema:** Dar puntos por "empresa Fortune 500" o "gran cantidad de seguidores en LinkedIn" cuando eso no predice el comportamiento de compra.

**La Solución:** Solo puntúa criterios que se correlacionen con tratos cerrados. Revisa tus últimos 10 clientes — ¿qué tenían en común?

</RevealSection>

<RevealSection title="Error 2: Puntuaciones Estáticas que Nunca se Actualizan">

**El Problema:** Puntuar una vez y no revisitar. Un lead que estaba frío hace 6 meses puede estar caliente hoy.

**La Solución:** Configura actualizaciones automáticas de puntuación basadas en participación y señales externas (cambios de trabajo, financiamiento, etc.).

</RevealSection>

<RevealSection title="Error 3: Demasiados Criterios">

**El Problema:** Modelos de puntuación de 15 puntos con 8 dimensiones. Demasiado complejo para mantener.

**La Solución:** Mantén 3 dimensiones (AJUSTE, SEÑAL, FRICCIÓN) con 2-4 criterios cada una. La simplicidad supera a la exhaustividad.

</RevealSection>

<RevealSection title="Error 4: Ignorar la Fricción">

**El Problema:** Perseguir leads de ajuste perfecto en industrias imposibles de cerrar (gobierno, salud para fundadores en solitario).

**La Solución:** Resta puntos por factores de fricción. Un 4/4 AJUSTE con -2 FRICCIÓN es un 2, no un 4.

</RevealSection>

<RevealSection title="Error 5: No Probar los Umbrales">

**El Problema:** Asumir que 8-10 es "caliente" sin validar contra tasas de cierre reales.

**La Solución:** Después de 30 días, revisa: ¿Qué puntuaciones realmente cerraron? Ajusta los umbrales según corresponda.

</RevealSection>

</ProgressiveReveal>

---

## Tu Plan de Implementación de Puntuación

Construiste tu rúbrica. Ahora hagámosla operativa.

<InteractiveChecklist
title="Lista de Verificación para Implementar la Puntuación de Leads"
persistKey="ai-acquisition-strategy-L4-implementation"
items={[
"Definir criterios de AJUSTE (4 factores) basados en tu ICP real",
"Identificar fuentes de SEÑAL que puedes rastrear (cambios de trabajo, financiamiento, participación)",
"Listar factores de FRICCIÓN específicos de tu mercado (industria, proceso de compra)",
"Establecer umbrales de acción (qué haces en cada nivel de puntuación)",
"Agregar campos de puntuación a tu CRM (HubSpot, Apollo, Airtable, etc.)",
"Puntuar tu lista de leads existente (empieza con los 50 primeros)",
"Configurar 2-3 disparadores de automatización (alerta de cambio de trabajo, participación en email, etc.)",
"Crear vistas/listas separadas para Calientes (8-10), Tibios (5-7), Fríos (1-4)",
"Probar durante 2 semanas, luego revisar: ¿Las puntuaciones altas realmente convierten mejor?",
"Ajustar criterios y umbrales según datos reales de conversión"
]}
/>

---

## Qué Sigue

Ahora tienes un modelo de puntuación de leads que te dice exactamente dónde enfocarte. En la próxima lección, exploraremos los **Motores de Personalización con IA y Líneas de Apertura que Convierten** — cómo usar la IA para generar primeras líneas personalizadas que pasen la prueba "estarías orgulloso si supieran cómo lo encontraste".

Pero primero, un ejercicio final:

<ComparisonBuilder
title="Puntúa Tus 5 Mejores Leads Ahora Mismo"
persistKey="ai-acquisition-strategy-L4-compare"
prompt="Elige tus 5 prospectos actuales más importantes y puntúalos usando tu nueva rúbrica. Lista: Nombre, Empresa, puntuación AJUSTE, puntuación SEÑAL, puntuación FRICCIÓN, Total y Acción."
expertExample="1. Sarah Chen, Acme SaaS — AJUSTE: 4, SEÑAL: 2 (cambio de trabajo + financiamiento), FRICCIÓN: 0, TOTAL: 6, ACCIÓN: Agregar a secuencia tibia con personalización IA 2. John Smith, BigCorp — AJUSTE: 3, SEÑAL: 0, FRICCIÓN: -1 (comité), TOTAL: 2, ACCIÓN: Archivar o nurturing largo"
criteria={[
"Puntuó los 5 leads usando AJUSTE + SEÑAL - FRICCIÓN",
"Identificó la acción específica para cada uno según la puntuación total",
"Al menos un lead puntuó 8+ (caliente) o explicó por qué ninguno califica"
]}
/>

**Tu tarea:** Puntúa toda tu lista de leads esta semana. Luego, el próximo lunes, mira tu calendario. ¿Estás dedicando tiempo a leads con puntuación 8-10, o desperdiciando horas en los que tienen 2-4?

La respuesta cambiará toda tu estrategia de adquisición.
