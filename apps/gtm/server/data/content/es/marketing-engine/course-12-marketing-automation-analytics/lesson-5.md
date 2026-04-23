---
title: "Stack de Marketing Mínimo Viable: El Kit de $150"
duration: "55 min"
track: "Marketing Engine"
course: "Course 12: Marketing Automation & Analytics"
lesson: 5
---

# Stack de Marketing Mínimo Viable: El Kit de $150

Una de las excusas más comunes para no tener un sistema de marketing sofisticado es: _"No puedo pagar las herramientas."_

Los fundadores miran plataformas empresariales como Salesforce, Marketo o HubSpot Enterprise, ven el precio de $3.000/mes y asumen que están fuera de su alcance.
Asumen que están condenados a hojas de cálculo manuales y seguimientos aleatorios por Gmail.

Están equivocados.

<InsightCard icon="💡" title="La Era Dorada del Micro-SaaS">
Vivimos en la era dorada del **"Nivel Gratuito de Micro-SaaS."** Puedes construir un stack de marketing que rivaliza con una configuración de Fortune 500 por menos de lo que cuesta un café diario.
</InsightCard>

Tu objetivo es un **Stack Mínimo Viable (MVS)** — la colección más pequeña de herramientas que te permite capturar, nutrir, puntuar y cerrar leads sin fricción manual.

En esta lección, te doy el mapa específico en tres niveles de presupuesto: $0, $50 y $150.

---

## 1. La Filosofía Central: "La Fuente Única de Verdad"

Antes de elegir herramientas, debemos elegir una filosofía.
El mayor error que cometen los fundadores son los "Silos de Datos."

- Tu lista de correo está en Mailchimp.
- Tu pipeline de deals está en una hoja de cálculo.
- Tus notas de reuniones están en Notion.
- Tus formularios están en Typeform.

**Ninguno de estos se comunica entre sí.**
Esto significa que no tienes idea si el _Suscriptor A_ es también el _Prospecto B_.

<FlipCard front="Regla #1: El Cerebro Central" back="Debes tener un Cerebro Central (CRM) al que fluyan todos los datos. Cada herramienta de tu stack debe responder al Cerebro. Sin excepciones." />

---

## 2. Fase 1: El Stack de "Validación" de $0/mes

Si tienes $0 de presupuesto, aún puedes tener un sistema de automatización profesional.

<SlideNavigation>
<Slide title="El Cerebro (CRM): HubSpot Gratis">
**Por qué:** Es el único CRM gratuito que te ofrece usuarios ilimitados y 1 millón de contactos. Te permite rastrear aperturas de correo y registrar reuniones automáticamente.

**Lo que obtienes:** Gestión de contactos, pipeline de deals, seguimiento de correos, registro de reuniones.
</Slide>

<Slide title="La Cara (Página de Aterrizaje): Carrd">
**Por qué:** Puedes construir un sitio de una página de alta conversión en 30 minutos.

**Lo que obtienes:** Páginas de aterrizaje simples y rápidas con formularios que pueden conectarse a tu CRM.
</Slide>

<Slide title="La Voz (Correo): MailerLite">
**Por qué:** A diferencia de Mailchimp, su plan gratuito incluye *Automatización* (secuencias), lo cual es crítico para nosotros.

**Lo que obtienes:** Hasta 1.000 suscriptores, secuencias de correo automatizadas, segmentación básica.
</Slide>

<Slide title="El Calendario: Calendly">
**Por qué:** Un tipo de evento es gratis. Perfecto para "Reservar una Demo."

**Lo que obtienes:** Programación automatizada, sincronización de calendario, recordatorios por correo.
</Slide>

<Slide title="Los Analíticos: Google Analytics 4">
**Por qué:** Estándar de la industria.

**Lo que obtienes:** Seguimiento de tráfico, eventos de conversión, información de audiencia.
</Slide>
</SlideNavigation>

**Costo Total: $0.**
**Capacidades:** Puedes capturar un lead, enviar una secuencia de bienvenida automatizada, permitirle reservar una reunión y rastrear la etapa del deal — todo por cero dólares.

---

## 3. Fase 2: El Stack "Profesional" de $50/mes

Una vez que generas >$500/mes, deberías pagar para ahorrar tiempo y eliminar el branding "Desarrollado por."

- **El Cerebro:** **HubSpot Gratis** (Sigue siendo suficientemente bueno).
- **El Pegamento:** **Zapier Starter** ($20/mes).
  - _Por qué:_ Conecta tus herramientas. _Ejemplo:_ Cuando alguien llena un Typeform, Zapier crea un Deal en HubSpot y te envía una notificación en Slack.
- **La Cara:** **Carrd Pro** ($19/AÑO) o **Framer** ($5-10/mes).
  - _Por qué:_ Nombre de dominio personalizado (sin más `.carrd.co`), mejores controles de diseño.
- **La Inteligencia:** **Plausible Analytics** ($9/mes).
  - _Por qué:_ Google Analytics es feo e invasivo. Plausible es amigable con la privacidad, liviano y hermoso.
- **La Voz:** **ConvertKit Creator** ($29/mes).
  - _Por qué:_ Si eres Creador/Coach, ConvertKit maneja el "Etiquetado" mejor que MailerLite.

**Costo Total: ~$58/mes.**
**Capacidades:** Dominio personalizado, zaps de múltiples pasos (automatización), mejor segmentación.

<ScenarioSimulator
title="Calculadora de ROI del Stack"
persistKey="course-12-marketing-automation-analytics-L5-roi"
levers={[
{ id: "budget", label: "Presupuesto mensual de herramientas ($)", min: 0, max: 200, step: 10, defaultValue: 50 },
{ id: "leads", label: "Leads por mes", min: 10, max: 500, step: 10, defaultValue: 100 },
{ id: "conversionBoost", label: "Aumento de conversión por automatización (%)", min: 0, max: 50, step: 5, defaultValue: 20 }
]}
outputs={[
{ id: "extraDeals", label: "Deals extra por automatización", formula: "(leads * (conversionBoost / 100) * 0.1)", unit: "", precision: 1 },
{ id: "costPerDeal", label: "Costo por deal extra", formula: "(budget / (leads * (conversionBoost / 100) * 0.1))", unit: "$", precision: 0 }
]}
insight="At {extraDeals} extra deals per month, you're paying ${costPerDeal} per deal. If your average deal value is >$500, this stack pays for itself 10x over."
/>

---

## 4. Fase 3: El Stack de "Escala" de $150/mes

Cuando generas >$5k/mes, necesitas herramientas que te ayuden a **Convertir** y **Operar**.

- **El Cerebro:** **HubSpot Starter** ($15-20/mes).
  - _Por qué:_ Elimina el branding de HubSpot, agrega automatización simple dentro del CRM y desbloquea información de salud de correos.
- **El Arma de Video:** **Loom** ($12,50/mes) o **Vimeo** ($20/mes).
  - _Por qué:_ Enviar respuestas de video personales a leads aumenta la conversión en un 30-50%.
- **La Prueba Social:** **Senja.io** ($19/mes).
  - _Por qué:_ Automatiza la recolección de testimonios y crea widgets de "Muro de Amor" para tu sitio.
- **La Automatización:** **Make.com** ($9-20/mes).
  - _Por qué:_ Más económico y poderoso que Zapier para flujos de trabajo complejos.
- **El Programador:** **SavvyCal** ($12/mes).
  - _Por qué:_ Mejor experiencia de usuario que Calendly (se superpone en tu calendario).

**Costo Total: ~$100-$150/mes.**
**Capacidades:** Motor completo de "RevOps." Recolección automatizada de testimonios, venta por video, reportes robustos de CRM.

---

## 5. Criterios de Selección de Herramientas (Cómo Elegir)

No compres herramientas porque son "Geniales." Cómpralas para resolver problemas.

<ProgressiveReveal title="Las 3 Reglas de Selección de Herramientas" persistKey="course-12-marketing-automation-analytics-L5-rules">
<RevealSection title="Regla 1: Integración Nativa Primero">
Si la Herramienta A se conecta con HubSpot de forma nativa, úsala. Si la Herramienta B requiere un hack de Zapier para conectarse con HubSpot, evítala. Las integraciones nativas son más rápidas y no se rompen.

**Por qué importa:** Zapier cuesta dinero por tarea y puede romperse cuando cambian las APIs. Las integraciones nativas están integradas en el producto y las mantiene el proveedor.
</RevealSection>

<RevealSection title="Regla 2: La Regla de 'Exportar'">
Nunca pongas datos en una herramienta que no te permita exportarlos como CSV. Necesitas ser dueño de tus datos.

**Por qué importa:** La dependencia del proveedor es real. Si no puedes exportar tus contactos, estás atrapado. Siempre verifica la capacidad de exportación antes de comprometerte.
</RevealSection>

<RevealSection title="Regla 3: Evita las Trampas 'Todo en Uno'">
Herramientas como "ClickFunnels" o "Kajabi" intentan hacer todo (Correo + Sitio web + CRM). Usualmente lo hacen todo de forma mediocre.

Prefiero un stack de **"Mejor en su Clase"** (Mejor CRM + Mejor Correo) conectado por APIs. Es más flexible y económico a largo plazo.

**Por qué importa:** Cuando una pieza de tu stack necesita actualizarse, puedes reemplazarla sin reconstruir todo.
</RevealSection>
</ProgressiveReveal>

---

## 6. Ejemplos de Contexto Dual

<StrategyDuel
title="Stack B2B SaaS vs. Creador"
persistKey="course-12-marketing-automation-analytics-L5-duel"
scenario="Tienes $60/mes para gastar en tu stack de marketing."
strategyA={{
    name: "Stack B2B SaaS",
    description: "Framer + Supabase + HubSpot Gratis + Webhooks",
    pros: ["Amigable para código", "Datos de producto integrados", "Arquitectura escalable"],
    cons: ["Requiere configuración técnica", "Más partes móviles"]
  }}
strategyB={{
    name: "Stack de Creador",
    description: "Carrd + ConvertKit + LemonSqueezy",
    pros: ["Configuración sin código", "Etiquetado de correo sólido", "Manejo de impuestos integrado"],
    cons: ["Menos profundidad de CRM", "Analíticos de producto limitados"]
  }}
expertVerdict="Elige según tu habilidad principal. Los devs deben aprovechar los webhooks de Supabase. Los creadores necesitan el etiquetado de ConvertKit y el manejo de impuestos de comerciante de LemonSqueezy."
/>

### Escenario A: B2B SaaS (El Dev Bootstrapped)

- **Stack:** $60/mes.
- **Sitio web:** Framer (Mejor para diseño).
- **Auth/Datos:** Supabase (DB del Producto).
- **CRM:** HubSpot Gratis.
- **Conexión:** Cuando un usuario se registra (Supabase), un Webhook se dispara a HubSpot para crear un Contacto.
- **Por qué:** El dev quiere mantenerse en código, pero necesita datos de ventas en un CRM.

### Escenario B: Creador/Coach (El Escritor de Newsletter)

- **Stack:** $40/mes.
- **Sitio web:** Carrd ($19/año).
- **Correo:** ConvertKit ($29/mes).
- **Comercio:** LemonSqueezy (Maneja Impuestos).
- **Por qué:** El Creador necesita "Comerciante de Registro" (manejo de impuestos) y etiquetado de correo sólido. El CRM importa menos.

---

## 7. Lista de Verificación Resumen

<InteractiveChecklist
title="Tu Verificación de Salud del Stack"
persistKey="course-12-marketing-automation-analytics-L5-checklist"
items={[
"Cerebro Central: Tengo un lugar (HubSpot/ConvertKit) donde viven TODOS los contactos",
"Sin Silos: Mi herramienta de formularios envía datos al Cerebro automáticamente",
"Verificación de Presupuesto: Audité mis suscripciones y cancelé funciones 'Pro' sin usar",
"Calendario: Tengo un enlace de reserva para evitar correos de '¿Cuándo estás libre?'",
"Agilidad: Puedo cambiar mi herramienta de sitio web sin perder mi lista de correo (stack desacoplado)",
"Listo para Exportar: Cada herramienta que uso permite exportar mis datos en CSV"
]}
/>

---

## 8. Ejercicio Práctico: La Auditoría del Stack

<TemplateBuilder
title="Tu Auditoría del Stack"
persistKey="course-12-marketing-automation-analytics-L5-audit"
sections={[
{
id: "current-tools",
title: "Paso 1: Lista Tus Herramientas Actuales",
fields: [
{ id: "tool1", label: "Herramienta 1", placeholder: "Ej. Mailchimp - $29/mes", type: "text" },
{ id: "tool2", label: "Herramienta 2", placeholder: "Ej. Calendly Pro - $12/mes", type: "text" },
{ id: "tool3", label: "Herramienta 3", placeholder: "Ej. Webflow - $16/mes", type: "text" },
{ id: "tool4", label: "Herramienta 4 (opcional)", placeholder: "Agrega más si es necesario", type: "text" },
{ id: "totalCost", label: "Costo Mensual Total", placeholder: "$___", type: "text" }
]
},
{
id: "data-flow",
title: "Paso 2: Mapea el Flujo de Datos",
fields: [
{ id: "formToCrm", label: "Formulario del Sitio → CRM", placeholder: "Ej. Typeform → CSV Manual → HubSpot (ROTO)", type: "textarea" },
{ id: "emailToCrm", label: "Herramienta de Correo → CRM", placeholder: "Ej. Mailchimp → Sin conexión (SILO)", type: "textarea" },
{ id: "breaks", label: "¿Dónde están las roturas?", placeholder: "Lista cualquier paso manual de exportación/importación", type: "textarea" }
]
},
{
id: "optimization",
title: "Paso 3: Los Cortes y Correcciones",
fields: [
{ id: "downgrade", label: "Herramienta a degradar/cancelar", placeholder: "Ej. Calendly Pro → Gratis (ahorra $12/mes)", type: "text" },
{ id: "fixSilo", label: "Silo a corregir", placeholder: "Ej. Agregar Zapier para conectar Typeform → HubSpot", type: "text" },
{ id: "savings", label: "Ahorro mensual estimado", placeholder: "$___", type: "text" }
]
}
]}
/>

<RangeSlider 
  label="¿Qué tan seguro te sientes con la arquitectura actual de tu stack?" 
  min={1} 
  max={10} 
  lowLabel="Un desastre total" 
  highLabel="Perfectamente optimizado" 
  persistKey="course-12-marketing-automation-analytics-L5-confidence" 
/>

---

## Quiz: Arquitectura del Stack

```json
{
  "quizId": "tech-stack-basics",
  "title": "Building the Minimum Viable Stack",
  "questions": [
    {
      "id": "ts1",
      "type": "multiple-choice",
      "text": "What is the 'Central Brain' of your marketing stack?",
      "options": [
        { "id": "a", "text": "Your Twitter account." },
        {
          "id": "b",
          "text": "The CRM (Customer Relationship Management) system."
        },
        { "id": "c", "text": "Excel." },
        { "id": "d", "text": "Your inbox." }
      ],
      "correctAnswer": "b",
      "explanation": "The CRM (like HubSpot) is the single source of truth. All leads, history, and deal data must live there so you can track the relationship."
    },
    {
      "id": "ts2",
      "type": "multiple-choice",
      "text": "Why should you avoid 'All-in-One' platforms (like high-end enterprise suites) at the start?",
      "options": [
        { "id": "a", "text": "They are too cheap." },
        {
          "id": "b",
          "text": "They are usually mediocre at everything and create 'Vendor Lock-in'."
        },
        { "id": "c", "text": "They don't have good colors." },
        { "id": "d", "text": "They are illegal." }
      ],
      "correctAnswer": "b",
      "explanation": "Best-in-Breed stacks (connecting the best email tool to the best CRM) give you more flexibility and power for less money."
    },
    {
      "id": "ts3",
      "type": "true-false",
      "text": "True or False: You need to pay at least $500/month to have professional marketing automation.",
      "correctAnswer": "false",
      "explanation": "False. With tools like HubSpot Free, MailerLite, and Zapier, you can build a world-class system for &lt;$50/mo."
    },
    {
      "id": "ts4",
      "type": "multiple-choice",
      "text": "What is the primary benefit of using a tool like Calendly/SavvyCal?",
      "options": [
        { "id": "a", "text": "It looks cool." },
        {
          "id": "b",
          "text": "It eliminates the 'When are you free?' email ping-pong, reducing friction to book a meeting."
        },
        { "id": "c", "text": "It sends video." },
        { "id": "d", "text": "It tracks revenue." }
      ],
      "correctAnswer": "b",
      "explanation": "Friction kills deals. If it takes 4 emails to find a time, you will lose 20% of your meetings. Calendar links solve this."
    },
    {
      "id": "ts5",
      "type": "multiple-choice",
      "text": "Why do we prefer 'Native Integrations' over Zapier?",
      "options": [
        {
          "id": "a",
          "text": "They are usually free, faster, and less prone to breaking."
        },
        { "id": "b", "text": "They are more expensive." },
        { "id": "c", "text": "Zapier is evil." },
        { "id": "d", "text": "No reason." }
      ],
      "correctAnswer": "a",
      "explanation": "Zapier is great glue, but it costs money and can break if an API changes. Native (built-in) integration is always the first choice."
    }
  ]
}
```

**Siguiente Lección:** [Fundamentos de Páginas de Aterrizaje: El Vendedor Digital](/marketing-engine/course-12-marketing-automation-analytics/lesson-6)
