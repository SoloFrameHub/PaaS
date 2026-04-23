---
title: "Automatizando la Incorporación con Zapier/Make/n8n"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 36: Incorporación de Clientes"
lesson: 8
---

# Automatizando la Incorporación con Zapier/Make/n8n

Llevas 6 semanas con tu nuevo producto SaaS. Tienes 23 clientes activos. Cada mañana empieza igual: revisar quién se registró durante la noche, enviar un correo de bienvenida personal, revisar quién no ha iniciado sesión, enviar un recordatorio, revisar quién alcanzó su primer hito, enviar felicitaciones. A las 10am, ya gastaste 90 minutos solo en correos de incorporación.

Luego un cliente te escribe por Slack: "Me registré hace 3 días y no he recibido nada. ¿Esto funciona?"

Olvidaste enviar su correo de bienvenida. Estabas en estado de flujo construyendo una función.

**Este es el punto de quiebre de la automatización de incorporación.** Los procesos manuales funcionan hasta que no funcionan. Y cuando se rompen, los clientes se dan cuenta de inmediato.

¿La buena noticia? Cinco automatizaciones — que toman 4-6 horas construir una vez — pueden manejar el 80% de tu flujo de incorporación para siempre.

<InsightCard icon="⚡" title="La Paradoja de la Automatización">
Los fundadores que resisten la automatización porque "se siente impersonal" son los mismos que olvidan escribirle a los clientes durante 3 días. El cuidado automatizado supera al toque personal inconsistente siempre.
</InsightCard>

## Las 5 Automatizaciones Centrales de Incorporación

La mayoría de los fundadores en solitario piensan que necesitan 47 flujos de Zapier para automatizar la incorporación. Necesitas **cinco**. Aquí están:

<FlipCard
  front="Automatización #1: Disparador de Secuencia de Bienvenida"
  back="Cuando se crea un cliente en tu sistema, inicia una secuencia de 7 correos en tu ESP. Esta es la base — todo lo demás se construye sobre esto."
/>

<FlipCard
  front="Automatización #2: Celebración de Hito"
  back="Cuando un cliente completa una acción central (primer proyecto, primer reporte, primera invitación), envía un correo de felicitación en 1 hora. Los disparadores conductuales superan a los goteos basados en tiempo 3:1."
/>

<FlipCard
  front="Automatización #3: Alerta de Usuario Estancado"
  back="Si no hay inicio de sesión/actividad en 5 días después del registro, dispara: (1) correo de recordatorio al cliente, (2) notificación de Slack para ti, (3) etiqueta en CRM. Esto detecta el 60% de la cancelación silenciosa antes de que ocurra."
/>

<FlipCard
  front="Automatización #4: Verificación de Primera Victoria del Día 7"
  back="7 días después del registro, verifica: ¿lograron el primer valor? Si sí → correo de celebración. Si no → correo de oferta de ayuda. Esta es la intervención en el precipicio de retención."
/>

<FlipCard
  front="Automatización #5: Disparador de Seguimiento del Día 45"
  back="45 días después del registro, envía encuesta NPS + correo personal '¿Cómo va todo?' de tu parte. Esto detecta la segunda ventana de cancelación antes de que comiencen las decisiones de renovación."
/>

<RangeSlider
  label="¿Cuántas de estas 5 automatizaciones tienes funcionando actualmente?"
  min={0}
  max={5}
  lowLabel="Ninguna"
  highLabel="Las 5"
  persistKey="onboarding-L8-current-automations"
/>

## Zapier vs Make vs n8n: ¿Qué Herramienta para Fundadores en Solitario?

No necesitas elegir la herramienta "mejor". Necesitas elegir la que se ajuste a tu **nivel de comodidad técnica** y **presupuesto**.

<SlideNavigation>
<Slide title="Zapier: La Más Fácil, La Más Cara">

**Mejor para:** Fundadores no técnicos que quieren simplicidad de apuntar y hacer clic.

**Precios (2025-2026):**

- Gratis: 100 tareas/mes (suficiente para ~10 clientes)
- Starter: $19.99/mes para 750 tareas (suficiente para ~75 clientes)
- Professional: $49/mes para 2,000 tareas (suficiente para ~200 clientes)

**Pros:**

- Mayor ecosistema de aplicaciones (7,000+ integraciones)
- Constructor visual, sin código requerido
- Mejor documentación y apoyo comunitario

**Contras:**

- Más cara por tarea
- Lógica condicional limitada en niveles inferiores
- No se puede alojar por cuenta propia

**Adecuación para fundador en solitario:** Alta si el presupuesto lo permite.

</Slide>

<Slide title="Make (antes Integromat): La Más Flexible">

**Mejor para:** Fundadores cómodos con constructores de lógica visual que quieren más potencia por cada dólar.

**Precios (2025-2026):**

- Gratis: 1,000 operaciones/mes (suficiente para ~100 clientes)
- Core: $10.59/mes para 10,000 ops (suficiente para ~1,000 clientes)
- Pro: $18.82/mes para 10,000 ops + apps premium

**Pros:**

- 10 veces más barata que Zapier por operación
- Constructor de escenarios visual con ramificación avanzada
- Mejor manejo y depuración de errores
- Puede procesar arrays/bucles en una automatización

**Contras:**

- Curva de aprendizaje más pronunciada que Zapier
- Ecosistema de aplicaciones más pequeño (~1,500 integraciones)
- Documentación menos amigable para principiantes

**Adecuación para fundador en solitario:** Alta si estás dispuesto a invertir 2-3 horas aprendiendo la interfaz. Mejor ROI.

</Slide>

<Slide title="n8n: Autoalojado, Ilimitado">

**Mejor para:** Fundadores técnicos (pueden implementar en un VPS) que quieren operaciones ilimitadas y control total.

**Precios (2025-2026):**

- Autoalojado: Gratis (paga solo por VPS: $5-10/mes en DigitalOcean/Railway)
- Cloud: $20/mes para 2,500 ejecuciones

**Pros:**

- Operaciones ilimitadas si se autoaloja
- Código abierto, totalmente personalizable
- Puede ejecutar código personalizado en flujos de trabajo
- Mejor para automatizaciones complejas de alto volumen

**Contras:**

- Requiere configuración técnica (Docker, gestión de VPS)
- Comunidad más pequeña que Zapier/Make
- Eres responsable del tiempo de actividad y mantenimiento

**Adecuación para fundador en solitario:** Media-Alta para fundadores técnicos.

</Slide>
</SlideNavigation>

<StrategyDuel
title="Zapier vs Make para Tu Primera Automatización"
persistKey="onboarding-L8-tool-duel"
scenario="Tienes 30 clientes, $150/mes de presupuesto para herramientas y comodidad técnica moderada."
strategyA={{
    name: "Empezar con Zapier",
    description: "Pagar $19.99/mes por simplicidad y velocidad",
    pros: ["Configura en 30 minutos", "Tutoriales extensos", "Funciona con todo"],
    cons: ["Mayor costo a largo plazo", "Necesitarás actualizar en ~75 clientes"]
  }}
strategyB={{
    name: "Empezar con Make",
    description: "Invertir 2-3 horas aprendiendo, pagar $10.59/mes",
    pros: ["10 veces más barata por operación", "No necesitarás actualizar hasta 1,000 clientes", "Lógica más poderosa"],
    cons: ["Curva de aprendizaje más pronunciada", "Menos integraciones"]
  }}
expertVerdict="Para fundadores en solitario: Empieza con Make. La inversión de aprendizaje de 2-3 horas se recupera en 3 meses. La ventaja de simplicidad de Zapier desaparece una vez que construyes tu primera automatización — y la ventaja de costo de Make se acumula para siempre."
/>

## Construyendo Tu Primera Automatización: Disparador de Secuencia de Bienvenida

Construyamos juntos la Automatización #1. Esta es la base para todo lo demás.

**El objetivo:** Cuando se crea un nuevo cliente en tu sistema (Stripe, Gumroad, tu base de datos de aplicación), iniciar automáticamente una secuencia de 7 correos en tu ESP.

<ProgressiveReveal title="Paso a Paso: Secuencia de Bienvenida en Make" persistKey="onboarding-L8-welcome-build">

<RevealSection title="Paso 1: Elige Tu Disparador">

En Make, haz clic en **Crear un nuevo escenario**.

Tus opciones de disparador:

- **Stripe:** "Watch Customers" (se activa cuando se crea un nuevo cliente)
- **Gumroad:** "Watch Sales" (se activa en una nueva compra)
- **Webhook:** Disparador personalizado de tu aplicación

Para este ejemplo, usaremos **Stripe → Watch Customers**.

1. Agrega el módulo de Stripe
2. Conecta tu cuenta de Stripe
3. Establece el disparador en "Created" (no "Updated")
4. Prueba la conexión — Make obtendrá tu cliente más reciente

</RevealSection>

<RevealSection title="Paso 2: Filtra Solo Clientes que Pagan">

Agrega un **Filtro** entre Stripe y tu siguiente paso:

**Condición:** `Status = active` Y `Email no contiene "test"`

Esto garantiza que solo los clientes reales que pagan activen la secuencia.

</RevealSection>

<RevealSection title="Paso 3: Agrega Cliente al ESP">

Conecta a tu proveedor de servicios de correo. Opciones comunes:

- **ConvertKit:** "Add Subscriber to Form" o "Add Tag"
- **Customer.io:** "Create or Update Person" + "Trigger Campaign"
- **Mailchimp:** "Add/Update Subscriber" + "Add to Automation"

Para ConvertKit:

1. Agrega el módulo de ConvertKit
2. Elige "Add Subscriber to Form"
3. Mapea campos:
   - Email → `{{Stripe.email}}`
   - Nombre → `{{Stripe.name}}`
   - Formulario → Selecciona tu formulario "Secuencia de Bienvenida"
4. Establece "Resubscribe" en "Yes"

</RevealSection>

<RevealSection title="Paso 4: Registra en Tu CRM (Opcional pero Recomendado)">

Agrega un paso más: registra este cliente en una Hoja de Google o Airtable para seguimiento.

Agrega un módulo de **Google Sheets**:

1. Elige "Add a Row"
2. Mapea campos:
   - Email → `{{Stripe.email}}`
   - Nombre → `{{Stripe.name}}`
   - Fecha de Registro → `{{Stripe.created}}`
   - Plan → `{{Stripe.plan.nickname}}`
   - Estado → "Incorporación Iniciada"

</RevealSection>

<RevealSection title="Paso 5: Prueba de Extremo a Extremo">

Antes de activar:

1. Haz clic en "Ejecutar una vez" en Make
2. Crea un cliente de prueba en Stripe (usa tu propio correo con sufijo `+test`)
3. Observa la ejecución de la automatización
4. Verifica:
   - El correo llega a ConvertKit
   - La secuencia de bienvenida inicia
   - La fila aparece en la Hoja de Google

</RevealSection>

<RevealSection title="Paso 6: Activa y Monitorea">

Una vez probado:

1. Haz clic en "Activate scenario"
2. Establece el horario en "Immediately" (disparador en tiempo real)
3. Monitorea durante 48 horas — revisa el registro de ejecución para errores

**Consejo profesional:** Configura notificaciones de error. En la configuración de Make, agrega tu correo a "Send notifications on errors."

</RevealSection>

</ProgressiveReveal>

<InteractiveChecklist
title="Lista de Verificación de Automatización de Secuencia de Bienvenida"
persistKey="onboarding-L8-welcome-checklist"
items={[
"Conectado Stripe (o procesador de pago) a Make/Zapier",
"Agregado filtro solo para clientes que pagan",
"Mapeado datos del cliente al ESP (ConvertKit/Customer.io/Mailchimp)",
"Configurada hoja de seguimiento (Google Sheets/Airtable)",
"Probado con un registro real",
"Activada la automatización y habilitadas las notificaciones de error"
]}
/>

## Automatización #3: El Detector de Incorporación Estancada

**El problema:** El 60% de los nuevos clientes nunca regresan después de su primera sesión.

**La solución:** Detectar la incorporación estancada en 5 días e intervenir.

### Construyendo la Automatización de Usuario Estancado

**Paso 1: Define la Lógica de "Estancado"**

En Make/Zapier, crea un filtro:

```
SI:
  - Días desde registro >= 5
  - Fecha del último inicio de sesión < 5 días atrás
  - Acción central completada = No
ENTONCES: Disparar intervención de estancamiento
```

**Paso 2: Intervención Multi-Canal**

Cuando se identifica a un cliente como estancado, dispara **3 acciones**:

1. **Correo al cliente:** "Notamos que todavía no has probado [función central]. ¿Necesitas ayuda para comenzar?"
2. **Notificación de Slack para ti:** "🚨 Usuario estancado: [Nombre] ([Correo]) — registrado hace [X] días, sin actividad desde el Día 1"
3. **Etiqueta en CRM:** Agrega etiqueta "Estancado - Día 5" para seguimiento

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">

Puedes construir un detector de estancamiento más sofisticado usando consultas SQL o llamadas a API. Ejemplo de lógica:

```sql
SELECT email, name, created_at, last_login_at
FROM customers
WHERE created_at < NOW() - INTERVAL '5 days'
  AND last_login_at < NOW() - INTERVAL '5 days'
  AND (SELECT COUNT(*) FROM events WHERE user_id = customers.id AND event_name = 'first_value_milestone') = 0
```

</ContextualNote>

## Automatización #4: Verificación de Primera Victoria del Día 7 (Lógica Condicional)

Esta automatización tiene **dos caminos** según si el cliente logró el primer valor.

### Cómo Construir Lógica Condicional en Make

Make maneja esto perfectamente con **Routers**.

**Paso 1: Disparador**

- Horario: Diario a las 10am
- Acción: Obtener todos los clientes donde `signup_date = 7 días atrás`

**Paso 2: Agrega Router**

- El router divide el flujo en 2 caminos

**Paso 3: Camino A (Primer Valor Logrado)**

- Filtro: `first_value_milestone = true`
- Acción: Enviar correo "¡Felicidades por tu primera victoria!"

**Paso 4: Camino B (Sin Primer Valor Todavía)**

- Filtro: `first_value_milestone = false`
- Acción: Enviar correo "¿Necesitas ayuda para comenzar?"

## Automatización #5: Disparador de Seguimiento del Día 45

**¿Por qué el Día 45?**

- La emoción inicial se ha desvanecido
- Los hábitos pueden no haberse formado todavía
- Las decisiones de renovación se aproximan (para planes mensuales)
- Aquí es donde comienza la **cancelación silenciosa**

### Qué Enviar

Dos cosas:

1. **Encuesta NPS** (3 preguntas, 2 minutos para completar)
2. **Correo personal tuyo** (genuino, humano, preguntando "¿Cómo va todo?")

### El 80/20 de la Automatización de Incorporación

**Automatiza lo repetible. Mantén el toque humano para las excepciones.**

<InsightCard icon="🎯" title="La Regla de Automatización">
Si lo haces de la misma manera para cada cliente, automatízalo. Si requiere juicio o personalización, mantenlo humano.
</InsightCard>

### Qué Automatizar (80%)

- Disparador de secuencia de bienvenida
- Correos de celebración de hitos
- Detección de usuario estancado + primer recordatorio
- Verificación de primera victoria del Día 7
- Encuesta NPS del Día 45
- Recordatorios de renovación
- Correos de anuncio de funciones

### Qué Mantener Humano (20%)

- Contacto personal con detractores de NPS (puntuaciones 0-6)
- Llamadas de incorporación para clientes de alto valor (>$200/mes)
- Solución de problemas personalizada para casos complejos
- Conversaciones de expansión (upsell/cross-sell)
- Prevención de cancelación para cuentas en riesgo

<ScenarioSimulator
title="Calculadora de Ahorro de Tiempo en Incorporación"
persistKey="onboarding-L8-time-simulator"
levers={[
{ id: "customers", label: "Clientes activos", min: 10, max: 200, step: 10, defaultValue: 50 },
{ id: "manualMinutes", label: "Minutos por tarea manual de incorporación", min: 5, max: 30, step: 5, defaultValue: 15 },
{ id: "automationPercent", label: "% de tareas automatizadas", min: 0, max: 100, step: 10, defaultValue: 80 }
]}
outputs={[
{ id: "weeklyHours", label: "Horas semanales ahorradas", formula: "(customers * manualMinutes * (automationPercent / 100)) / 60", unit: " hrs", precision: 1 },
{ id: "monthlyHours", label: "Horas mensuales ahorradas", formula: "(customers * manualMinutes * (automationPercent / 100)) / 60 * 4", unit: " hrs", precision: 0 }
]}
insight="Con {weeklyHours} horas ahorradas por semana, recuperas {monthlyHours} horas al mes para trabajo en producto o adquisición. Eso equivale a contratar a una persona de CS a tiempo parcial."
/>

## Tu Sprint de Construcción de Automatización

<InteractiveChecklist
title="Sprint de Construcción de Automatización de Incorporación"
persistKey="onboarding-L8-build-sprint"
items={[
"Hora 1: Configura cuenta de Make/Zapier y conecta tus herramientas centrales (procesador de pago, ESP, CRM)",
"Hora 2: Construye la Automatización #1 (Disparador de Secuencia de Bienvenida) y prueba con un registro real",
"Hora 3: Construye la Automatización #3 (Detector de Usuario Estancado) y prueba con un registro de cliente con fecha atrasada",
"Hora 4: Construye la Automatización #4 (Verificación de Primera Victoria del Día 7) con lógica condicional y prueba ambos caminos",
"Bonus (si tienes tiempo): Construye la Automatización #2 (Celebración de Hito) para tu hito de activación #1",
"Paso final: Habilita notificaciones de error y pon un recordatorio de calendario para revisiones de salud semanales"
]}
/>

**Siguiente Lección:** Gestión del Tiempo — CS en 5-7 Horas/Semana
