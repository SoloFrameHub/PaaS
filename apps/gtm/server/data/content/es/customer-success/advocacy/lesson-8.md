---
title: "Tu Playbook de Advocacy"
duration: "45 min"
track: "Éxito del Cliente"
course: "Curso 39: Promoción del Cliente"
lesson: 8
---

Has pasado siete lecciones construyendo las piezas. Ahora es momento de ensamblarlas en un sistema que funcione solo.

La mayoría de los fundadores tratan advocacy como un proyecto secundario — algo que recuerdan hacer cuando no están apagando incendios. Por eso la mayoría de los programas de advocacy mueren después de los primeros tres testimonios.

¿Los fundadores que ganan? Construyen advocacy dentro del viaje del cliente como si fuera una función del producto. Los testimonios llegan según programa. Los referidos fluyen sin rogar. Los casos de estudio se escriben solos porque los datos ya están rastreados.

Esta lección es tu blueprint de implementación. Al final, tendrás un playbook completo de advocacy que funciona en piloto automático — recopilando pruebas, desplegándolas en cada superficie y generando nuevos clientes mientras duermes.

---

## La Arquitectura del Sistema de Advocacy

<InsightCard icon="🏗️" title="El Sistema de Tres Capas">
**Capa 1: Detección de Triggers** — Alertas automatizadas cuando los clientes alcanzan hitos listos para advocacy
**Capa 2: Toque Humano** — Solicitudes personales tuyas (el fundador) en exactamente el momento correcto
**Capa 3: Motor de Despliegue** — La prueba automáticamente aparece en tu sitio web, emails y propuestas
</InsightCard>

La mayoría de los fundadores solo construyen la Capa 2 (la solicitud). Por eso se siente como trabajo manual constante.

El sistema funciona cuando las tres capas se comunican entre sí:

<FlipCard
  front="¿Qué hace que advocacy sea escalable?"
  back="La automatización detecta el momento. Tú haces la solicitud personal. El sistema despliega la prueba en todas partes sin que la toques de nuevo."
/>

Construyamos cada capa.

---

## Capa 1: Triggers Automatizados de Hitos

Tu CRM o analítica de producto ya rastrea el comportamiento del cliente. Solo necesitas señalar los momentos listos para advocacy.

<TemplateBuilder
title="Tu Mapa de Triggers de Advocacy"
persistKey="advocacy-L8-triggers"
sections={[
{
id: "day30",
title: "Día 30: Primer Valor Logrado",
fields: [
{ id: "milestone", label: "¿Qué hito señala 'primer valor'?", placeholder: "ej., Primer reporte generado, primera campaña enviada, primera factura pagada", type: "text" },
{ id: "trigger", label: "¿Cómo lo detectarás?", placeholder: "ej., Zapier vigila Stripe para primer pago, webhook del producto dispara en primera exportación", type: "text" },
{ id: "ask", label: "¿Qué solicitud de advocacy encaja aquí?", placeholder: "ej., Testimonio escrito (formulario de 3 preguntas)", type: "text" }
]
},
{
id: "day60",
title: "Día 60: Hábito Formado",
fields: [
{ id: "milestone", label: "¿Qué señala uso regular?", placeholder: "ej., Logueado 15+ veces, función principal usada 10+ veces", type: "text" },
{ id: "trigger", label: "¿Método de detección?", placeholder: "ej., Alerta de umbral de analítica de producto", type: "text" },
{ id: "ask", label: "¿Solicitud de advocacy?", placeholder: "ej., Reseña online (G2, Capterra, Google)", type: "text" }
]
},
{
id: "day90",
title: "Día 90: Resultados Medibles",
fields: [
{ id: "milestone", label: "¿Qué resultado puedes medir?", placeholder: "ej., Ingresos aumentaron 20%, tiempo ahorrado 5 horas/semana, abandono reducido 3%", type: "text" },
{ id: "trigger", label: "¿Cómo lo rastrearás?", placeholder: "ej., Reunión de revisión trimestral, cliente auto-reporta en encuesta", type: "text" },
{ id: "ask", label: "¿Solicitud de advocacy?", placeholder: "ej., Mini caso de estudio + solicitud de referido", type: "text" }
]
},
{
id: "renewal",
title: "Renovación/Expansión",
fields: [
{ id: "milestone", label: "¿Evento de renovación o upgrade?", placeholder: "ej., Renovación anual, upgrade de plan, expansión de asientos", type: "text" },
{ id: "trigger", label: "¿Detección?", placeholder: "ej., Webhook de Stripe, flag manual en CRM", type: "text" },
{ id: "ask", label: "¿Solicitud de advocacy?", placeholder: "ej., Solicitud de referido (¿conoces 1-2 personas?)", type: "text" }
]
}
]}
/>

<ExampleCard label="Configuración Real de Triggers: Fundador SaaS">
**Trigger Día 30:** Zapier vigila Stripe → Primer pago recibido → Alerta en Slack → Fundador envía solicitud personal de testimonio dentro de 24 horas
**Trigger Día 90:** Analítica de producto → Cliente exportó 10+ reportes → Flag en CRM → Fundador agenda entrevista de caso de estudio
**Trigger de Renovación:** Webhook de Stripe → Renovación anual procesada → Auto-agregar a lista de solicitud de referido → Fundador envía agradecimiento personal + solicitud de referido
</ExampleCard>

La clave: **Automatiza la detección, mantén la solicitud personal.**

<RangeSlider
  label="¿Qué tan automatizados están tus triggers de advocacy ahora?"
  min={1}
  max={10}
  lowLabel="100% manual"
  highLabel="Completamente automatizado"
  persistKey="advocacy-L8-automation"
/>

---

## Capa 2: La Biblioteca de Solicitudes Personales

Has construido los triggers. Ahora necesitas las palabras exactas para usar cuando la alerta dispara.

<InsightCard icon="✉️" title="La Ventaja de la Voz del Fundador">
Las plantillas automatizadas obtienen 8-12% de tasa de respuesta. Emails personales del fundador obtienen 35-50%. ¿La diferencia? Pueden notar que realmente eres tú. En LATAM, donde las relaciones personales son fundamentales, este toque personal es aún más crítico.
</InsightCard>

Aquí están tus cuatro plantillas principales de solicitud. Copia, personaliza, envía.

<SlideNavigation>
<Slide title="Día 30: Solicitud de Testimonio">

**Asunto:** ¿Un favor rápido? (2 min)

**Cuerpo:**

Hola [Nombre],

¡Felicidades por [hito específico — primer reporte, primera campaña, primer pago]!

Me encantaría compartir tu historia con otros que están enfrentando el mismo desafío que tú tenías cuando empezamos. ¿Te molestaría responder 3 preguntas rápidas? Toma como 2 minutos:

[Link al formulario de 3 preguntas]

Sin presión — y te enviaré la versión editada para tu aprobación antes de publicar cualquier cosa.

¡Gracias por ser un(a) [cliente] increíble!

[Tu nombre]

---

**Por qué funciona:**

- Referencia de hito específico (muestra que estás prestando atención)
- Baja fricción (2 minutos, 3 preguntas)
- Paso de aprobación (elimina miedo a mala representación)
- Tono personal (no se siente como plantilla)

</Slide>

<Slide title="Día 60: Solicitud de Reseña">

**Asunto:** ¿Otro favor rápido?

**Cuerpo:**

Hola [Nombre],

Llevas usando [producto] unos 2 meses, y esperaba que estuvieras dispuesto/a a dejar una reseña rápida en [G2 / Capterra / Google].

Toma unos 3 minutos y ayuda a otros [coaches/fundadores/agencias] a descubrirnos.

Aquí está el link: [link a plataforma de reseñas]

Si no te sientes cómodo/a con eso, sin problema — lo entiendo perfectamente.

¡Gracias!

[Tu nombre]

</Slide>

<Slide title="Día 90: Solicitud de Caso de Estudio + Referido">

**Asunto:** Tus resultados son increíbles

**Cuerpo:**

Hola [Nombre],

Acabo de ver tus números — [resultado específico: 40% de aumento en ingresos, 5 horas/semana ahorradas, 3% de reducción en abandono]. Eso es exactamente el tipo de resultado para el que construí [producto].

¿Estarías abierto/a a una llamada rápida de 15 minutos donde te pregunte sobre tu experiencia? Me encantaría convertirlo en un caso de estudio corto (con tu aprobación antes de publicar, por supuesto).

También — ya que estás obteniendo tan buenos resultados, ¿conoces 1-2 personas que podrían beneficiarse similarmente? Con gusto les ofrezco [incentivo: 10% de descuento los primeros 3 meses, $50 de crédito, etc.] si haces una intro.

¡Avísame!

[Tu nombre]

</Slide>

<Slide title="Renovación: Solicitud de Referido">

**Asunto:** Gracias (y una pregunta)

**Cuerpo:**

Hola [Nombre],

¡Gracias por renovar! Significa mucho que [producto] siga entregando valor después de [X meses/años].

Pregunta rápida: ¿conoces 1-2 personas que podrían beneficiarse de lo que hemos construido? Con gusto les ofrezco [incentivo] si haces una intro.

Sin presión — solo pensé en preguntar ya que has tenido una experiencia tan buena.

¡Gracias de nuevo!

[Tu nombre]

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Personaliza Tus Plantillas de Solicitud"
persistKey="advocacy-L8-templates"
items={[
"Reemplaza [producto] con el nombre real de tu producto",
"Reemplaza [hito específico] con datos reales de clientes",
"Reemplaza [incentivo] con tu oferta real de referido (o elimina si no hay incentivo)",
"Agrega estas plantillas a tu CRM o herramienta de email",
"Envíate cada plantilla de prueba para verificar el tono"
]}
/>

---

## Capa 3: El Motor de Despliegue

Has recopilado la prueba. Ahora necesita trabajar para ti en todas partes.

<InsightCard icon="🚀" title="La Regla de Despliegue">
Cada pieza de prueba debe aparecer en al menos 3 lugares. Si solo está en tu página de testimonios, estás desperdiciando el 80% de su valor.
</InsightCard>

<ClassifyExercise
title="Empareja Prueba con Superficie"
persistKey="advocacy-L8-classify"
categories={[
{ id: "homepage", label: "Homepage", color: "#3b82f6" },
{ id: "email", label: "Email de Ventas", color: "#10b981" },
{ id: "proposal", label: "Propuesta", color: "#f59e0b" },
{ id: "social", label: "LinkedIn/Social", color: "#8b5cf6" }
]}
items={[
{ id: "1", content: "Testimonio escrito de 3 oraciones", correctCategory: "homepage" },
{ id: "2", content: "Mini caso de estudio (200-400 palabras)", correctCategory: "proposal" },
{ id: "3", content: "Video testimonial (30-90 segundos)", correctCategory: "homepage" },
{ id: "4", content: "Logo de cliente", correctCategory: "homepage" },
{ id: "5", content: "Cita de resultado de una oración", correctCategory: "email" },
{ id: "6", content: "Historia Desafío→Solución→Resultados", correctCategory: "social" },
{ id: "7", content: "Captura de reseña de G2", correctCategory: "proposal" }
]}
/>

### Tu Checklist de Despliegue

Cada vez que recopiles nueva prueba, ejecuta este checklist:

<InteractiveChecklist
title="Checklist de Despliegue de Prueba"
persistKey="advocacy-L8-deploy"
items={[
"Agregar a página de testimonios del sitio web",
"Agregar mejor cita a sección hero del homepage",
"Agregar a Biblioteca de Prueba Social (organizada por industria/caso de uso)",
"Crear 1-2 posts de LinkedIn presentando la historia",
"Agregar caso de estudio relevante a plantilla de propuesta",
"Agregar cita de una oración a firma de email",
"Actualizar secuencias de email de ventas con nueva prueba",
"Compartir en grupo de WhatsApp/Slack del equipo (si tienes equipo)",
"Etiquetar en CRM para referencia futura"
]}
/>

---

## El Sprint de Advocacy de 30 Días

Has construido el sistema. Ahora vamos a encenderlo.

<InsightCard icon="⚡" title="El Objetivo del Sprint">
En los próximos 30 días, recopilarás 5-10 nuevas piezas de prueba y las desplegarás en cada superficie de cara al cliente. Esto no es un proyecto para "algún día". Es tu actividad principal de adquisición por el próximo mes.
</InsightCard>

<ProgressiveReveal title="Tu Plan de Sprint de 30 Días" persistKey="advocacy-L8-sprint">

<RevealSection title="Semana 1: Configuración de Triggers">

**Días 1-2:** Audita tus datos de clientes — lista clientes con resultados medibles en los últimos 90 días. Señala 10 para contacto inmediato.

**Días 3-4:** Construye triggers — configura alertas de Zapier/n8n para hitos de Día 30, 60, 90. Prueba un trigger end-to-end.

**Días 5-7:** Personaliza plantillas y envía 3 solicitudes de testimonio a clientes de Día 30.

**Meta:** 3 solicitudes de testimonio enviadas, 1-2 respuestas recibidas

</RevealSection>

<RevealSection title="Semana 2: Blitz de Recopilación">

**Días 8-10:** Envía 5 más solicitudes de testimonio. Haz seguimiento de la Semana 1.

**Días 11-12:** Envía 3-5 solicitudes de reseña a clientes de Día 60+.

**Días 13-14:** Identifica 2 clientes con resultados fuertes. Envía solicitud de entrevista de caso de estudio.

**Meta:** 5-8 testimonios escritos, 2-3 reseñas publicadas, 2 entrevistas de caso de estudio agendadas

</RevealSection>

<RevealSection title="Semana 3: Casos de Estudio + Referidos">

**Días 15-17:** Conduce 2 entrevistas de caso de estudio (15 minutos cada una). Graba con permiso.

**Días 18-19:** Redacta 2 mini casos de estudio (200-400 palabras). Envía para aprobación.

**Días 20-21:** Envía solicitudes de referido a 5 clientes que renovaron o expandieron. En LATAM, enviar un audio de WhatsApp personal pidiendo el referido funciona mejor que un email formal.

**Meta:** 2 casos de estudio aprobados, 2-3 intros de referido hechas

</RevealSection>

<RevealSection title="Semana 4: Despliegue + Automatización">

**Días 22-24:** Despliega toda la prueba nueva — sitio web, propuestas, LinkedIn.

**Días 25-26:** Actualiza secuencias de email de ventas y firma de email.

**Días 27-28:** Finaliza triggers y automatizaciones.

**Días 29-30:** Mide y itera — cuenta pruebas recopiladas, mide cobertura de despliegue.

**Meta:** Toda la prueba desplegada, automatización funcionando, playbook documentado

</RevealSection>

</ProgressiveReveal>

<RangeSlider
  label="¿Qué tan seguro te sientes ejecutando este sprint de 30 días?"
  min={1}
  max={10}
  lowLabel="Necesito más claridad"
  highLabel="Listo para empezar mañana"
  persistKey="advocacy-L8-confidence"
/>

---

## El Dashboard de Métricas de Advocacy

No puedes mejorar lo que no mides.

<ScenarioSimulator
title="Calculadora de ROI de Advocacy"
persistKey="advocacy-L8-roi"
levers={[
{ id: "customers", label: "Total de clientes activos", min: 10, max: 500, step: 10, defaultValue: 50 },
{ id: "askRate", label: "% a los que pides advocacy cada mes", min: 5, max: 50, step: 5, defaultValue: 20 },
{ id: "responseRate", label: "Tasa de respuesta (%)", min: 10, max: 70, step: 5, defaultValue: 40 }
]}
outputs={[
{ id: "monthly", label: "Nuevas piezas de prueba por mes", formula: "(customers * (askRate / 100) * (responseRate / 100))", unit: "", precision: 1 },
{ id: "quarterly", label: "Piezas de prueba por trimestre", formula: "(customers * (askRate / 100) * (responseRate / 100) * 3)", unit: "", precision: 0 }
]}
insight="Con `{monthly}` piezas/mes, tendrás `{quarterly}` nuevos testimonios, casos de estudio o referidos cada trimestre. Suficiente para refrescar todo tu sitio web y materiales de venta 2-3x por año."
/>

---

## Modos de Fallo Comunes de Advocacy

<StrategyDuel
title="La Trampa del Advocacy"
persistKey="advocacy-L8-trap"
scenario="Has recopilado 10 testimonios excelentes. ¿Qué haces?"
strategyA={{
    name: "Acumularlos",
    description: "Guardarlos para un gran rediseño del sitio web en 6 meses",
    pros: ["Todo se lanza de una vez", "Se siente más 'completo'"],
    cons: ["Cero ROI por 6 meses", "La prueba se vuelve vieja", "Te olvidas de desplegarlos"]
  }}
strategyB={{
    name: "Desplegar inmediatamente",
    description: "Agregarlos a tu sitio, emails y propuestas esta semana",
    pros: ["Aumento inmediato de conversión", "La prueba se mantiene fresca", "El impulso se construye"],
    cons: ["Se siente 'desordenado' o incompleto"]
  }}
expertVerdict="Desplegar inmediatamente gana siempre. Un solo testimonio en tu homepage hoy vale más que 10 testimonios sentados en un Google Doc por 6 meses. Publica prueba conforme la recopilas."
/>

### Los 5 Asesinos de Advocacy

<FlipCard front="Asesino #1: Esperar por 'suficientes' pruebas" back="No necesitas 50 testimonios. Necesitas 3 buenos desplegados en todas partes. Empieza con lo que tienes." />

<FlipCard front="Asesino #2: Pedir a todos a la vez" back="Las solicitudes masivas se sienten spam y se ignoran. Pide a 3-5 clientes por semana, sincronizados con sus hitos." />

<FlipCard front="Asesino #3: Plantillas de solicitud genéricas" back="'Nos encantaría un testimonio' obtiene 10% de respuesta. 'Felicidades por [resultado específico]! ¿Te importaría compartir tu historia?' obtiene 40%." />

<FlipCard front="Asesino #4: Sin paso de aprobación" back="Los clientes temen mala representación. Siempre envía la versión editada para aprobación antes de publicar." />

<FlipCard front="Asesino #5: Recopilar pero no desplegar" back="Prueba en una carpeta = $0 de valor. Prueba en tu homepage, emails y propuestas = aumento medible de ingresos." />

---

## Tu Playbook de Advocacy (Artefacto Final)

Has construido las piezas en 8 lecciones. Ahora ensámblalas en un documento que puedas referenciar siempre.

<TemplateBuilder
title="Tu Playbook Completo de Advocacy"
persistKey="advocacy-L8-playbook"
sections={[
{
id: "triggers",
title: "Triggers de Advocacy",
fields: [
{ id: "day30", label: "Trigger + solicitud de Día 30", placeholder: "Hito: Primer valor logrado | Solicitud: Testimonio escrito", type: "textarea" },
{ id: "day60", label: "Trigger + solicitud de Día 60", placeholder: "Hito: Hábito formado | Solicitud: Reseña online", type: "textarea" },
{ id: "day90", label: "Trigger + solicitud de Día 90", placeholder: "Hito: Resultados medibles | Solicitud: Caso de estudio + referido", type: "textarea" },
{ id: "renewal", label: "Trigger + solicitud de Renovación", placeholder: "Hito: Renovación/expansión | Solicitud: Referido", type: "textarea" }
]
},
{
id: "templates",
title: "Plantillas de Solicitud",
fields: [
{ id: "testimonial", label: "Email de solicitud de testimonio", placeholder: "Asunto: ¿Un favor rápido? (2 min) | Cuerpo: Hola [Nombre]...", type: "textarea" },
{ id: "review", label: "Email de solicitud de reseña", placeholder: "Asunto: ¿Otro favor rápido? | Cuerpo: Hola [Nombre]...", type: "textarea" },
{ id: "casestudy", label: "Email de solicitud de caso de estudio", placeholder: "Asunto: Tus resultados son increíbles | Cuerpo: Hola [Nombre]...", type: "textarea" },
{ id: "referral", label: "Email de solicitud de referido", placeholder: "Asunto: Gracias (y una pregunta) | Cuerpo: Hola [Nombre]...", type: "textarea" }
]
},
{
id: "deployment",
title: "Checklist de Despliegue",
fields: [
{ id: "surfaces", label: "Lista todas las superficies donde se desplegará la prueba", placeholder: "Homepage, emails de ventas, propuestas, LinkedIn, firma de email, etc.", type: "textarea" },
{ id: "process", label: "Proceso de despliegue (paso a paso)", placeholder: "1. Recopilar | 2. Editar + obtener aprobación | 3. Agregar al sitio | 4. Actualizar secuencias de email | 5. Crear post de LinkedIn | etc.", type: "textarea" }
]
},
{
id: "metrics",
title: "Métricas de Advocacy",
fields: [
{ id: "targets", label: "Metas mensuales", placeholder: "Solicitudes enviadas: 10 | Tasa de respuesta: 40% | Pruebas recopiladas: 4 piezas | Cobertura de despliegue: 3+ superficies", type: "textarea" },
{ id: "tracking", label: "¿Cómo rastrearás estas?", placeholder: "Google Sheet, dashboard de CRM, reunión de revisión mensual, etc.", type: "text" }
]
},
{
id: "sprint",
title: "Plan de Sprint de 30 Días",
fields: [
{ id: "week1", label: "Acciones Semana 1", placeholder: "Auditar clientes, configurar triggers, enviar 3 solicitudes de testimonio", type: "textarea" },
{ id: "week2", label: "Acciones Semana 2", placeholder: "Blitz de recopilación: 5-8 testimonios, 2-3 reseñas, 2 entrevistas de caso de estudio agendadas", type: "textarea" },
{ id: "week3", label: "Acciones Semana 3", placeholder: "Conducir entrevistas, escribir casos de estudio, enviar solicitudes de referido", type: "textarea" },
{ id: "week4", label: "Acciones Semana 4", placeholder: "Desplegar toda la prueba, automatizar triggers, medir resultados", type: "textarea" }
]
}
]}
/>

---

## Tus Elementos de Acción Finales

<InteractiveChecklist
title="Lanza Tu Sistema de Advocacy"
persistKey="advocacy-L8-final"
items={[
"Completa tu Mapa de Triggers de Advocacy (Día 30, 60, 90, renovación)",
"Personaliza las 4 plantillas de solicitud con los detalles de tu producto/servicio",
"Configura al menos un trigger automatizado (Zapier, webhook o alerta de CRM)",
"Identifica 10 clientes listos para solicitudes inmediatas de advocacy",
"Envía tus primeras 3 solicitudes de testimonio esta semana",
"Crea la estructura de tu Biblioteca de Prueba Social (carpeta, hoja de cálculo o herramienta)",
"Agrega checklist de despliegue a tu flujo de trabajo (cada nueva prueba → 3+ superficies)",
"Agenda la fecha de inicio de tu sprint de advocacy de 30 días",
"Configura tracking mensual de métricas de advocacy (scorecard o dashboard)",
"Documenta tu playbook completo en un solo lugar (Google Doc, Notion o CRM)"
]}
/>

---

## Qué Pasa Después

Has construido un sistema completo de advocacy. Esto es lo que cambia:

**Semana 1:** Envías tu primer lote de solicitudes. 2-3 clientes responden con testimonios. Sientes el impulso.

**Semana 2:** Despliegas esos testimonios en tu homepage. Un prospecto menciona haberlos visto durante una llamada de ventas. Te das cuenta de que está funcionando.

**Semana 3:** Un cliente hace una intro de referido. Ese referido se convierte en cliente. Acabas de adquirir un cliente por $0.

**Semana 4:** Tienes 8-10 nuevas piezas de prueba. Tu sitio se siente más creíble. Tus emails obtienen mayores tasas de respuesta. Tus propuestas cierran más rápido.

**Mes 2:** Los triggers funcionan automáticamente. Los testimonios llegan sin que pidas. Los referidos se convierten en un canal predecible.

**Mes 3:** Tienes más pruebas de las que puedes desplegar. Empiezas a ser selectivo. Has construido una máquina.

Este es el flywheel de advocacy en movimiento. Cada éxito de cliente crea más prueba. Cada pieza de prueba atrae mejores clientes. Cada mejor cliente crea prueba más fuerte.

Ya no estás rogando por testimonios. Estás gestionando una abundancia de advocacy.

En la cultura LATAM, donde el boca a boca y las recomendaciones personales son la moneda más valiosa del negocio, este sistema se convierte en tu superpoder competitivo.

---

<InsightCard icon="🎯" title="La Verdadera Victoria">
Advocacy no es una táctica de marketing. Es prueba de que estás construyendo algo que la gente realmente quiere. Cuando los clientes se ofrecen voluntariamente a contar tu historia, has cruzado el umbral de "producto" a "movimiento."
</InsightCard>

Ahora ve a construir tu playbook. Empieza tu sprint de 30 días. Y observa qué pasa cuando tus clientes se convierten en tus mejores vendedores.
