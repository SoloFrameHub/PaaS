---
title: "Cobros Automatizados y Recordatorios de Vencimiento"
duration: "45 min"
track: "Operations & Systems"
course: "Course 47: Sales Finance & Tax"
lesson: 2
---

## Dunning: La Palabra que Define tu Flujo de Caja

"Dunning" es el término centenario para el seguimiento de pagos vencidos. En la era pre-software, significaba cartas físicas, llamadas telefónicas y visitas a tribunales. Para los fundadores solo de hoy, debería significar casi nada de eso — porque el sistema correcto lo maneja automáticamente.

**El 82% de los pagos de facturas atrasadas se resuelven con un solo recordatorio de seguimiento.** La mayoría de las facturas vencidas no son clientes que intentan evitar el pago — son personas que se ocuparon, olvidaron o asumieron que alguien más en su equipo lo manejó. Tu sistema automatizado los alcanza antes de que un pago pendiente se convierta en un problema de relación.

El objetivo de esta lección: construir un sistema de cobranza que recupere pagos tardíos sin tu involucramiento emocional, preserve las relaciones con los clientes y elimine la experiencia agotadora de perseguir facturas manualmente.

<InsightCard icon="💰" title="Lo que Está en Juego si lo Haces Mal">
Para negocios SaaS: la pérdida involuntaria de clientes (pagos fallidos) representa el 20-40% de toda la rotación de SaaS. La mayoría de esos clientes no tenían intención de cancelar — su tarjeta venció o un pago falló y nadie lo detectó. La automatización de cobranza es el sistema de mayor ROI que construirás en este curso.
</InsightCard>

## Los Dos Problemas de Cobranza Diferentes

Los fundadores de SaaS y los fundadores de negocios de servicios enfrentan desafíos de cobros fundamentalmente diferentes. Sabe cuál eres:

<SlideNavigation>
<Slide title="SaaS / Suscripción: El Problema del Pago Fallido">

**El problema:** Las tarjetas de crédito vencen, los bancos rechazan transacciones por protección contra fraudes, los números de tarjeta cambian. Estos no son problemas de comportamiento del cliente — son problemas del sistema que la automatización de cobranza resuelve.

**El stack de solución:**

1. Stripe Smart Retries (gratis, integrado) — reintenta pagos fallidos en el momento óptimo
2. Stripe Customer Portal (gratis) — permite a los clientes actualizar sus propios métodos de pago
3. Notificaciones pre-vencimiento de tarjeta — alerta a los clientes 7 días antes de que venza su tarjeta
4. Baremetrics Recover ($50/mes+) — agrega correos personalizados y notificaciones en la app además de Stripe

**El resultado:** Los Reintentos Inteligentes de Stripe solos recuperan el **10-25% de los pagos inicialmente fallidos**. Agregar Baremetrics Recover encima recupera un 5-15% adicional. Para un SaaS con $10K MRR, esto son $1,500-4,000 en ingresos por mes que de otra manera desaparecerían.

</Slide>

<Slide title="Negocio de Servicios: El Problema de la Factura Vencida">

**El problema:** Los clientes pagan tarde — a veces por procesos de aprobación internos, a veces por olvido, ocasionalmente por sus propios problemas de flujo de caja.

**El stack de solución:**

1. Recordatorios automáticos de facturas (FreshBooks, Wave o Stripe Invoicing) — enviar en -1 día, +1 día, +3 días, +7 días, +14 días
2. Correo personal a +7 días de tu parte
3. Llamada telefónica a +14 días
4. Aviso formal con cargo por mora a +21 días
5. Pausa de trabajo + demanda final a +30 días

**El resultado:** Con recordatorios automatizados, el 82% de las facturas tardías se resuelven antes de que hagas una llamada personal. El 18% restante requiere intervención humana escalada — que la escalera de escalación aborda.

</Slide>
</SlideNavigation>

## Configurando Stripe Smart Retries

Si estás en Stripe y no tienes Smart Retries habilitado, hazlo ahora. Toma 3 minutos y probablemente recuperará miles de dólares por año.

<ProgressiveReveal title="Configuración de Stripe Smart Retries" persistKey="finance-L2-reveal">

<RevealSection title="Paso 1: Habilitar Smart Retries">

Navega a: Panel de Stripe → Configuración → Facturación → Suscripciones

Encuentra "Smart Retries" y actívalo.

Eso es todo. Stripe ahora reintentará automáticamente los pagos de suscripción fallidos en momentos óptimos (la investigación muestra que el patrón óptimo de reintento es: 1, 3, 5 y 7 días después del fallo inicial).

</RevealSection>

<RevealSection title="Paso 2: Configurar Correos de Cobranza">

Aún en la configuración de Stripe Billing, encuentra "Correos al cliente" y configura:

- Correo de "Pago fallido": ACTIVADO (notificar al cliente inmediatamente)
- Correo de "Factura finalizada": ACTIVADO (confirmación cuando se genera la factura)
- Correo de "Factura próxima": ACTIVADO (aviso anticipado del próximo cobro)

Estos correos salen automáticamente desde Stripe. Personaliza la plantilla de correo con tu logo y tono amigable en Panel → Configuración → Correos.

</RevealSection>

<RevealSection title="Paso 3: Habilitar el Portal del Cliente">

El Portal del Cliente de Stripe permite a tus suscriptores actualizar sus métodos de pago, ver facturas y gestionar su suscripción — sin involucrarte a ti.

Ve a: Panel de Stripe → Configuración → Facturación → Portal del cliente → Habilitar

Agrega un enlace "Gestionar facturación" en el panel de tu producto o en tus correos de cobranza. Esta es la forma más efectiva de lograr que los clientes actualicen su método de pago — hazlo de autoservicio.

</RevealSection>

<RevealSection title="Paso 4: Configurar Pausa de Suscripción en Caso de Fallo">

Puedes configurar Stripe para pausar o cancelar automáticamente las suscripciones después de reintentos fallidos repetidos.

Configuración recomendada: Pausar (no cancelar) después de 14 días de reintentos fallidos. Esto le da al cliente tiempo para solucionar su método de pago sin perder completamente su suscripción. Configura un correo en el momento de pausa: "Tu cuenta ha sido pausada debido a un problema de pago — actualiza tu tarjeta aquí para restaurar el acceso."

Ve a: Panel de Stripe → Configuración → Facturación → Suscripciones → "Pausar suscripciones después del fallo" → 14 días

</RevealSection>

</ProgressiveReveal>

## La Escalera de Cobros para Negocios de Servicios

Construye esta escalera una vez. Luego síguala consistentemente cada vez que una factura se vence.

<SlideNavigation>
<Slide title="Fase Automatizada (Días -1 a +3)">

**Día -1 (antes de la fecha de vencimiento):** Recordatorio automatizado
"Recordatorio: La Factura [#] por $[X] vence mañana. Paga aquí: [enlace]"
Este único toque automatizado recupera una parte significativa de las facturas potencialmente tardías — especialmente para clientes que pagan puntualmente cuando se les recuerda.

**Día +1 (un día después del vencimiento):** Aviso automatizado de vencimiento
"Tu factura está vencida. La Factura [#] por $[X] venció el [fecha]. Paga aquí: [enlace]"
Tono: neutral y objetivo. No acusatorio.

**Día +3:** Segundo recordatorio automatizado
"Un segundo recordatorio de que la Factura [#] sigue pendiente. Si ya enviaste el pago, por favor ignora esto. Si no, puedes pagar aquí: [enlace]. Escríbeme si tienes alguna pregunta sobre esta factura."

Configura los tres en FreshBooks, Wave o Stripe Invoicing. Toma 15 minutos configurarlos. Funciona automáticamente para cada factura vencida a partir de entonces.

</Slide>

<Slide title="Fase Personal (Días +7 a +14)">

**Día +7:** Correo personal de tu parte

Este debe venir de tu correo, no de tu herramienta de facturación. Una a tres oraciones. Tono cálido, directo y orientado a resolver el problema:

"Hola [Nombre], solo haciendo seguimiento a la Factura [#] por $[X] — quería asegurarme de que no se hubiera perdido. Avísame si hay algo en tu lado con lo que pueda ayudar para procesarla."

Esto abre la puerta para que el cliente te diga si hay un problema: un nuevo aprobador, una factura que fue al correo equivocado, una congelación presupuestaria. La mayoría de las veces, este correo lo resuelve.

**Día +14:** Llamada telefónica o Zoom

No seas pasivo. Llama. El objetivo no es confrontación — es información. ¿Hay un problema de proceso? ¿Una disputa con la factura? ¿Un problema de flujo de caja de su lado?

"Hola [Nombre], llamo para dar seguimiento a la Factura [#] — ya son dos semanas después del vencimiento. Quiero asegurarme de que podamos resolver esto. ¿Hay algo que esté retrasando el procesamiento de tu lado?"

Escucha primero. Luego resuelve.

</Slide>

<Slide title="Fase Formal (Días +21 a +45)">

**Día +21:** Aviso formal con cargo por mora
Aviso escrito (correo + carta si el monto lo amerita). Aplica el cargo por mora según tu contrato.

"Estimado [Nombre], este es un aviso formal de que la Factura [#] por $[X] sigue sin pagar al [fecha]. Se ha aplicado un cargo por mora del 1.5% mensual ($[X]) según nuestro contrato del [fecha]. Total actualizado: $[X]. Por favor remita el pago en 5 días hábiles."

**Día +30:** Pausa de trabajo + demanda final
Si tienes trabajo en curso con este cliente, paúsalo. Indícalo claramente en tu demanda final.

**Día +45:** Decisión de escalación
Tres caminos: demanda en tribunal de menor cuantía (bajo $10K, sin abogado necesario), agencia de cobros (tarifa del 25-40%, apropiado para montos mayores), o cancelación (para montos pequeños donde el costo de recuperación supera el beneficio). Documenta la cancelación para fines fiscales.

</Slide>
</SlideNavigation>

## Avanzado: Baremetrics Recover

Para fundadores de SaaS con $5K+ MRR, vale la pena evaluar el salto de la cobranza integrada de Stripe a Baremetrics Recover.

<StrategyDuel
title="Stripe Integrado vs. Baremetrics Recover"
persistKey="finance-L2-duel"
scenario="Eres un fundador de SaaS con $8,000 MRR y perdiendo aproximadamente $400/mes en pagos fallidos (5% de rotación involuntaria). ¿Vale Baremetrics Recover $50/mes?"
strategyA={{ name: "Stripe Integrado (Gratis)", description: "Smart Retries + correos automatizados + Portal del Cliente", pros: ["Gratis — sin costo mensual", "Ya configurado si estás en Stripe", "Recupera el 10-25% de pagos fallidos por sí solo"], cons: ["Plantillas de correo genéricas", "Sin banners ni notificaciones en la app", "Analítica limitada sobre el rendimiento de cobranza"] }}
strategyB={{ name: "Baremetrics Recover ($50/mes)", description: "Correos personalizados de cobranza, avisos en la app y analítica detallada sobre Stripe", pros: ["Recupera un 5-15% adicional más allá de Stripe solo", "Secuencias de correo personalizadas con nombre del cliente y plan", "Analítica que muestra exactamente qué paso de cobranza recupera clientes"], cons: ["$50/mes de costo adicional", "Requiere tiempo de configuración para configurar correctamente", "El ROI requiere $3K+ MRR en exposición a pagos fallidos"] }}
expertVerdict="Con $8K MRR y $400/mes en pagos fallidos, los Reintentos Inteligentes de Stripe probablemente recuperan $60-100/mes gratuitamente. Baremetrics agrega otros $20-60/mes en recuperación. Con un costo de $50/mes, es límite. El punto de inflexión real es $10K+ MRR. Por debajo de eso, optimiza primero la cobranza integrada de Stripe — es gratis y cubre la mayor parte del potencial de recuperación."
/>

## Plantillas de Correo para Cada Etapa

<TemplateBuilder
title="Mis Plantillas de Correo de Cobranza"
persistKey="finance-L2-template"
sections={[
{
id: "automated",
title: "Plantillas de Recordatorio Automatizado",
fields: [
{ id: "reminder", label: "Recordatorio Día -1 (automatizado)", placeholder: "p. ej., Asunto: Recordatorio de pago — Factura [#] vence mañana\nHola [Nombre], solo un recordatorio amigable de que la Factura [#] por $[X] vence mañana...", type: "textarea" },
{ id: "overdue1", label: "Aviso de vencimiento Día +1 (automatizado)", placeholder: "p. ej., Asunto: La Factura [#] está vencida\nHola [Nombre], la Factura [#] por $[X] venció el [fecha] y sigue pendiente...", type: "textarea" }
]
},
{
id: "personal",
title: "Plantillas de Seguimiento Personal",
fields: [
{ id: "day7", label: "Correo personal Día +7", placeholder: "p. ej., Hola [Nombre], solo revisando la Factura [#]...", type: "textarea" },
{ id: "formal", label: "Aviso formal Día +21", placeholder: "p. ej., Estimado [Nombre], este es un aviso formal de que la Factura [#]...", type: "textarea" }
]
}
]}
/>

## Pon a Prueba tu Lógica de Cobranza

<SwipeDecision
title="Juego de Respuesta de Cobros"
description="Para cada escenario, elige la acción de cobros correcta."
optionA="Escalar Inmediatamente"
optionB="Seguir la Escalera Estándar"
persistKey="finance-L2-swipe"
cards={[
{
id: "1",
content: "La factura tiene 3 días de retraso. El cliente es un cliente de larga data con un historial de pago impecable.",
correctOption: "b",
explanation: "Sigue la escalera estándar. Los recordatorios automatizados en los Días +1 y +3 son la respuesta correcta. Una llamada rápida a un cliente confiable sería prematuro y puede sentirse agresivo."
},
{
id: "2",
content: "La factura tiene 7 días de retraso. El cliente mencionó en una reunión la semana pasada que su empresa está 'pasando por algunos cambios financieros.'",
correctOption: "a",
explanation: "Escala más rápido. La mención de cambios financieros es una señal. Haz la llamada personal en el Día +7 (en lugar de esperar al Día +14) y pregunta directamente sobre la situación. Puede que necesites negociar un plan de pago en lugar de esperar 30 días más."
},
{
id: "3",
content: "El pago de suscripción SaaS falló. Tarjeta rechazada. El cliente ha estado contigo 8 meses.",
correctOption: "b",
explanation: "Sigue la escalera estándar: primero los Reintentos Inteligentes de Stripe, luego el correo automatizado con enlace al Portal del Cliente. No hagas una llamada personal por un primer fallo de tarjeta — generalmente es un problema del sistema, no de intención."
},
{
id: "4",
content: "La factura tiene 21 días de retraso. El cliente no ha respondido al correo del Día +7 ni a la llamada del Día +14.",
correctOption: "a",
explanation: "Escala. La falta de respuesta en el Día +21 es una señal de alerta. Envía el aviso formal con cargo por mora aplicado, y si tienes trabajo en curso, paúsalo. Este es el punto donde evalúas la relación y los posibles cobros."
}
]}
/>

<RangeSlider
  label="¿Cuánto de tu proceso actual de cobros está automatizado vs. manual?"
  min={1}
  max={10}
  lowLabel="100% manual — hago todo yo"
  highLabel="Completamente automatizado — el sistema lo maneja"
  persistKey="finance-L2-automation"
/>

## Completaciones de la Lección 2

<InteractiveChecklist
title="Lista de Verificación de Automatización de Cobros"
persistKey="finance-L2-actions"
items={[
"Habilitar Stripe Smart Retries (Panel → Configuración → Facturación → Suscripciones) si estás en Stripe",
"Habilitar el Portal del Cliente de Stripe para actualizaciones de métodos de pago de autoservicio",
"Configurar recordatorios automáticos de facturas en FreshBooks o Wave (Día -1, +1, +3, +7, +14)",
"Escribir plantillas de seguimiento personal para el Día +7 y Día +21",
"Definir mi regla de decisión de escalación: ¿cuándo pauso trabajo? ¿cuándo involucro cobros?",
"Configurar la aplicación del cargo por mora en el Día +21 — asegurarme de que mi herramienta de facturación lo soporte"
]}
/>

## Qué Sigue

En la **Lección 3**, aprenderás a rastrear tus ingresos correctamente — no solo como un número total, sino descompuesto en Nuevo MRR, MRR de Expansión, Contracción y MRR Cancelado. Entender este desglose revela si tu negocio es realmente saludable bajo la superficie.
