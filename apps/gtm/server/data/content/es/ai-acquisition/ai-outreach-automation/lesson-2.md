---
title: "Inmersión Profunda en Instantly y Smartlead"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 24: AI Outreach Automation"
lesson: 2
---

Ya redujiste el campo. Las más de 200 herramientas de cold email se han filtrado a dos contendientes serios: **Instantly.ai** y **Smartlead.ai**.

Ambas prometen cuentas de email ilimitadas. Ambas incluyen warmup. Ambas cuestan aproximadamente lo mismo. Entonces, ¿por qué todos los foros de founders las debaten como si fuera Coca-Cola vs. Pepsi?

La verdad es que: **para el 90% de los founders solo, Instantly gana.** Pero ese 10% restante — los que construyen flujos de trabajo personalizados, hacen white-label o integran profundamente con su tech stack — encontrará que la superioridad de la API de Smartlead vale la pena la curva de aprendizaje ligeramente más pronunciada.

Esta lección es tu comparación lado a lado. Al final, sabrás qué plataforma se ajusta a tu caso de uso específico, cómo configurarla correctamente y cómo evitar los errores de configuración que arruinan la entregabilidad antes de enviar tu primer email.

---

## La División de Filosofías de Plataforma

Antes de sumergirnos en las funciones, entiende la diferencia de **filosofía de diseño**:

<FlipCard 
  front="La Filosofía de Instantly" 
  back="Construida para velocidad y simplicidad. La interfaz asume que quieres lanzar campañas rápido, probar agresivamente y escalar sin tocar código. Ideal para founders que quieren resultados, no proyectos de infraestructura." 
/>

<FlipCard 
  front="La Filosofía de Smartlead" 
  back="Construida para control y personalización. La plataforma asume que eventualmente querrás acceso a la API, webhooks personalizados y capacidades de white-label. Ideal para founders técnicos que construyen sistemas, no solo ejecutan campañas." 
/>

<InsightCard icon="🎯" title="El Factor Decisivo Real">
Si no puedes articular una necesidad técnica específica (integración de API, white-label, enrutamiento personalizado de webhooks), **elige Instantly**. Es $2/mes más económico, tiene mejor A/B testing y una interfaz más limpia. Las ventajas de Smartlead solo importan si estás construyendo flujos de trabajo personalizados.
</InsightCard>

---

## Instantly.ai: El Desglose de Funciones

Empecemos con el líder del mercado. Instantly creció de 0 a 100K+ usuarios en 24 meses al clavar el caso de uso del founder solo.

### Tiers de Precios (2025-2026)

<SlideNavigation>
<Slide title="Plan Growth — $37/mes">

**Lo Que Obtienes:**

- Cuentas de email ilimitadas (conecta las que quieras)
- 5.000 contactos activos por mes
- 5.000 emails enviados por mes
- Warmup ilimitado (integrado, siempre activo)
- Campañas ilimitadas
- A/B testing (hasta 26 variantes por paso)
- AI Writer (generación básica de copy)
- Lead Finder (1.000 leads B2B/mes de la base de datos integrada)
- Analítica estándar (aperturas, respuestas, clics, rebotes)

**Para Quién Es:**
Founders solo enviando 150-250 emails/día en 3-5 inboxes. Este es el punto óptimo para la mayoría de las personas en este curso.

**Limitación:**
El límite de 5K emails/mes significa que alcanzas el tope a ~170 emails/día si envías 6 días/semana. Para mayor volumen, necesitas Hypergrowth.

</Slide>

<Slide title="Plan Hypergrowth — $97/mes">

**Lo Que Obtienes:**

- Todo en Growth, más:
- 25.000 contactos activos por mes
- 100.000 emails enviados por mes
- Soporte prioritario
- Analítica avanzada

**Para Quién Es:**
Founders escalando más de 500 emails/día o gestionando múltiples campañas de clientes. Excesivo para la mayoría de founders solo en los meses 1-6.

**Cuándo Actualizar:**
Cuando alcances consistentemente el límite de 5K/mes durante 2+ meses y hayas validado que el outreach es tu canal principal de adquisición.

</Slide>

<Slide title="Costos Ocultos (No Hay Muchos)">

**Lo Que NO Está Incluido:**

- Las cuentas de email en sí (traes tus propias cuentas de Google Workspace o Microsoft 365 — presupuesta $6-12/inbox/mes)
- Registro de dominio (presupuesta $12-15/año por dominio)
- Enriquecimiento/verificación de email (si necesitas más que Lead Finder — presupuesta $30-50/mes para herramientas como ZeroBounce o NeverBounce)

**Costo Real Total para el Plan Growth:**

- Instantly: $37/mes
- 3 cuentas de email: $18-36/mes
- 2 dominios: $2-3/mes (amortizado)
- **Total: $57-76/mes**

Todavía muy por debajo del presupuesto de $200/mes.

</Slide>
</SlideNavigation>

### Las Funciones Estrella de Instantly

<ExampleCard label="Función Destacada: A/B Testing">

Instantly te permite probar **hasta 26 variantes** de cualquier paso de email. Esto es absurdamente poderoso.

**Caso de Uso de Ejemplo:**
Estás probando líneas de asunto para una campaña de outreach de SaaS. Creas 5 variantes:

1. "Pregunta rápida sobre el outbound de [empresa]"
2. "Vi a [empresa] en G2"
3. "[Nombre], pensé que esto te resultaría útil"
4. "Re: [noticia reciente de la empresa]"
5. "15 minutos para hablar sobre [punto de dolor]?"

Instantly divide tu lista de forma equitativa, envía cada variante al 20% de los destinatarios, rastrea las tasas de apertura y respuesta, y te muestra el ganador después de 100 envíos.

**Por Qué Importa:**
La mayoría de las plataformas te limitan a 2-3 variantes. El límite de 26 variantes de Instantly significa que puedes probar agresivamente sin cambiar de herramientas ni exportar datos a hojas de cálculo.

</ExampleCard>

<InsightCard icon="🔥" title="La Ventaja de Lead Finder">
Instantly incluye una base de datos de leads B2B (1.000 leads/mes en el plan Growth). No es tan completa como Apollo o ZoomInfo, pero para founders solo, a menudo es suficiente para empezar sin pagar por un proveedor de datos separado. Busca por título de trabajo, tamaño de empresa, industria, ubicación — exporta directamente a campañas.
</InsightCard>

### Guía de Configuración de Instantly

<TemplateBuilder
title="Tu Checklist de Configuración de Instantly"
persistKey="ai-outreach-automation-L2-instantly-setup"
sections={[
{
id: "account",
title: "1. Configuración de Cuenta",
fields: [
{
id: "plan",
label: "¿Con qué plan empezarás?",
type: "select",
options: ["Growth ($37/mes)", "Hypergrowth ($97/mes)", "Todavía decidiendo"],
placeholder: "Selecciona un plan"
},
{
id: "inboxes",
label: "¿Cuántas cuentas de email conectarás inicialmente?",
type: "number",
placeholder: "Recomendado: 3-5 para el plan Growth"
}
]
},
{
id: "domains",
title: "2. Estrategia de Dominio e Inbox",
fields: [
{
id: "primary-domain",
label: "Tu dominio principal de negocio",
type: "text",
placeholder: "ej., tustartup.com"
},
{
id: "outreach-domains",
label: "Dominios de outreach que comprarás",
type: "textarea",
placeholder: "ej., obtentustartup.com, probartustartup.com (lista 2-3)"
},
{
id: "inbox-naming",
label: "Convención de nombres de inbox",
type: "text",
placeholder: "ej., sara@, hola@, equipo@ (evita 'ventas@' o 'noreply@')"
}
]
},
{
id: "warmup",
title: "3. Configuración de Warmup",
fields: [
{
id: "warmup-duration",
label: "¿Cuántos días harás warmup antes de enviar?",
type: "number",
placeholder: "Recomendado: 14-21 días para dominios nuevos"
},
{
id: "daily-limit-week1",
label: "Límite de envío diario — Semana 1",
type: "number",
placeholder: "Recomendado: 10-15 por inbox"
},
{
id: "daily-limit-week2",
label: "Límite de envío diario — Semana 2",
type: "number",
placeholder: "Recomendado: 20-30 por inbox"
}
]
}
]}
/>

---

## Smartlead.ai: La Elección del Founder Técnico

Smartlead se lanzó como "la alternativa a Instantly para desarrolladores." La interfaz es ligeramente más compleja, pero las capacidades de API y webhook son significativamente mejores.

### Tiers de Precios (2025-2026)

<SlideNavigation>
<Slide title="Plan Basic — $39/mes">

**Lo Que Obtienes:**

- Cuentas de email ilimitadas
- 2.000 leads activos por ciclo de campaña
- 6.000 emails enviados por mes
- Warmup ilimitado (sistema SmartDelivery)
- Campañas ilimitadas
- Acceso completo a la API (este es el gran diferenciador)
- Webhooks para detección de respuestas, manejo de rebotes, etc.
- SpinTax + variables de IA
- Importación vía CSV, API y Zapier
- Analítica por inbox (puntuación de salud del remitente)

**Para Quién Es:**
Founders técnicos que quieren construir flujos de trabajo personalizados, integrar con su CRM vía API, o eventualmente hacer white-label de la plataforma.

**Limitación:**
El límite de 2K leads activos es más ajustado que los 5K contactos de Instantly, pero los 6K emails/mes son ligeramente más altos.

</Slide>

<Slide title="Plan Pro — $94/mes">

**Lo Que Obtienes:**

- Todo en Basic, más:
- 30.000 leads activos
- Emails ilimitados enviados por mes
- Analítica avanzada de salud del remitente
- Soporte prioritario
- Opciones de white-label

**Para Quién Es:**
Agencias o founders gestionando múltiples campañas de clientes. No necesario para founders solo en los primeros 6 meses.

</Slide>

<Slide title="Costos Ocultos">

**Lo Que NO Está Incluido:**

- Cuentas de email (igual que Instantly — $6-12/inbox/mes)
- Dominios ($12-15/año cada uno)
- Herramientas de enriquecimiento (si se necesitan más allá de la investigación manual)

**Costo Real Total para el Plan Basic:**

- Smartlead: $39/mes
- 3 cuentas de email: $18-36/mes
- 2 dominios: $2-3/mes
- **Total: $59-78/mes**

Aproximadamente lo mismo que Instantly Growth.

</Slide>
</SlideNavigation>

### Las Funciones Estrella de Smartlead

<ExampleCard label="Función Destacada: API y Webhooks">

La API de Smartlead es **significativamente mejor** que la de Instantly. Esto es lo que significa en la práctica:

**Caso de Uso 1: Integración con CRM**
Quieres que cada respuesta cree automáticamente una tarea en tu CRM (Pipedrive, HubSpot, Attio, etc.). Con Smartlead, configuras un webhook que se activa cuando se detecta una respuesta, luego usas Zapier o Make para enrutarla a tu CRM.

**Caso de Uso 2: Puntuación Personalizada de Leads**
Estás enriqueciendo leads con Clay, puntuándolos basándote en tech stack + financiamiento reciente + cambios de trabajo, luego solo importando leads con puntuaciones >70 a Smartlead. La API hace esto sin problemas.

**Caso de Uso 3: White-Label**
Estás construyendo un servicio donde ejecutas outreach para clientes. La opción de white-label de Smartlead te permite rebranding de la plataforma y cobrar a clientes directamente.

**Por Qué Importa:**
Si eres un founder técnico que piensa en términos de "sistemas" y "flujos de trabajo", la API de Smartlead te ahorrará horas de trabajo manual. Si no estás construyendo integraciones personalizadas, esta ventaja es irrelevante.

</ExampleCard>

<InsightCard icon="📊" title="Analítica SmartDelivery">
Smartlead proporciona **puntuación de salud por inbox** que es más granular que la de Instantly. Puedes ver qué inboxes específicos están siendo marcados, qué dominios tienen problemas de reputación, y ajustar tu estrategia de envío en consecuencia. Es excesivo para la mayoría de los founders solo, pero invaluable si gestionas 10+ inboxes.
</InsightCard>

---

## Comparación Cara a Cara

Resolvamos esto de una vez por todas.

<ComparisonBuilder
title="Instantly vs Smartlead: Tu Decisión"
persistKey="ai-outreach-automation-L2-platform-choice"
prompt="Según tu caso de uso, ¿qué plataforma es la mejor opción?"
expertExample="Para la mayoría de los founders solo, Instantly gana en facilidad de uso, A/B testing y el Lead Finder integrado. Elige Smartlead solo si necesitas integraciones de API o planeas hacer white-label."
criteria={[
"Necesidades técnicas específicas (API, webhooks, white-label)",
"Nivel de comodidad con una UX ligeramente más compleja",
"Plan de construir flujos de trabajo o integraciones personalizadas"
]}
/>

### Matriz de Funciones

<ClassifyExercise
title="¿Qué Plataforma Tiene Esta Función?"
persistKey="ai-outreach-automation-L2-feature-classify"
categories={[
{ id: "instantly", label: "Solo Instantly", color: "#3b82f6" },
{ id: "smartlead", label: "Solo Smartlead", color: "#8b5cf6" },
{ id: "both", label: "Ambas Plataformas", color: "#10b981" }
]}
items={[
{ id: "1", content: "Cuentas de email ilimitadas", correctCategory: "both" },
{ id: "2", content: "Base de datos de leads B2B integrada", correctCategory: "instantly" },
{ id: "3", content: "Hasta 26 variantes de A/B test", correctCategory: "instantly" },
{ id: "4", content: "Acceso completo a la API en el plan base", correctCategory: "smartlead" },
{ id: "5", content: "Opciones de white-label", correctCategory: "smartlead" },
{ id: "6", content: "Warmup ilimitado incluido", correctCategory: "both" },
{ id: "7", content: "Puntuación de salud por inbox", correctCategory: "smartlead" },
{ id: "8", content: "Webhooks para detección de respuestas", correctCategory: "smartlead" }
]}
/>

### Comparación de Precios

<ScenarioSimulator
title="Calculadora de Costo Mensual Total"
persistKey="ai-outreach-automation-L2-cost-simulator"
levers={[
{ id: "platform", label: "Plataforma", type: "select", options: ["Instantly Growth ($37)", "Instantly Hypergrowth ($97)", "Smartlead Basic ($39)", "Smartlead Pro ($94)"], defaultValue: "Instantly Growth ($37)" },
    { id: "inboxes", label: "Número de cuentas de email", min: 1, max: 10, step: 1, defaultValue: 3 },
    { id: "inbox-cost", label: "Costo por inbox/mes", min: 6, max: 15, step: 1, defaultValue: 10 },
    { id: "domains", label: "Número de dominios", min: 1, max: 5, step: 1, defaultValue: 2 }
  ]}
  outputs={[
    { id: "platform-cost", label: "Costo de plataforma", formula: "platform === 'Instantly Growth ($37)' ? 37 : platform === 'Instantly Hypergrowth ($97)' ? 97 : platform === 'Smartlead Basic ($39)' ? 39 : 94", unit: "$", precision: 0 },
{ id: "inbox-total", label: "Total de cuentas de email", formula: "inboxes _ inbox-cost", unit: "$", precision: 0 },
{ id: "domain-total", label: "Total de dominios (anual ÷ 12)", formula: "domains _ 1.25", unit: "$", precision: 2 },
    { id: "monthly-total", label: "Costo mensual total", formula: "(platform === 'Instantly Growth ($37)' ? 37 : platform === 'Instantly Hypergrowth ($97)' ? 97 : platform === 'Smartlead Basic ($39)' ? 39 : 94) + (inboxes * inbox-cost) + (domains * 1.25)", unit: "$", precision: 2 }
]}
insight="Tu costo mensual total de infraestructura de outreach es ${monthly-total}. Esto deja ${200 - monthly-total} en tu presupuesto de $200/mes para herramientas de enriquecimiento, automatización de LinkedIn u otros canales."
/>

---

## La Secuencia de Configuración (Ambas Plataformas)

Independientemente de qué plataforma elijas, la secuencia de configuración es casi idéntica. Aquí está el proceso paso a paso que asegura que no arruines tu entregabilidad desde el primer día.

<ProgressiveReveal title="La Secuencia de Configuración en 8 Pasos" persistKey="ai-outreach-automation-L2-setup-reveal">

<RevealSection title="Paso 1: Compra Dominios (Día 0)">

**Qué Hacer:**
Compra 2-3 dominios similares a tu dominio principal. Usa Namecheap, Google Domains o Cloudflare.

**Convención de Nombres:**

- Dominio principal: `tustartup.com`
- Dominios de outreach: `obtentustartup.com`, `probartustartup.com`, `unirsetustartup.com`

**Por Qué:**
Nunca envíes cold email desde tu dominio principal. Si un dominio de outreach es marcado, tu email principal de negocio se mantiene limpio.

**Costo:**
$12-15/año por dominio = ~$1.25/mes por dominio.

</RevealSection>

<RevealSection title="Paso 2: Configura Cuentas de Email (Día 0-1)">

**Qué Hacer:**
Crea 3-5 cuentas de email en tus dominios de outreach usando Google Workspace o Microsoft 365.

**Convención de Nombres:**
Usa nombres que suenen humanos, no direcciones genéricas de ventas:

- ✅ `sara@obtentustartup.com`
- ✅ `hola@probartustartup.com`
- ✅ `equipo@unirsetustartup.com`
- ❌ `ventas@obtentustartup.com`
- ❌ `noreply@probartustartup.com`

**Por Qué:**
Las direcciones genéricas de ventas tienen menor entregabilidad. Los nombres humanos rinden mejor.

**Costo:**
$6-12/mes por inbox (Google Workspace Business Starter es $6/usuario/mes; Microsoft 365 Business Basic es $6/usuario/mes).

</RevealSection>

<RevealSection title="Paso 3: Configura los Registros DNS (Día 1)">

**Qué Hacer:**
Configura los registros SPF, DKIM y DMARC para cada dominio. Tanto Instantly como Smartlead proporcionan instrucciones paso a paso.

**Por Qué:**
Estos registros autentican tus emails y prueban que no eres un spammer. Sin ellos, tus emails van directamente al spam.

**Cómo:**

1. Inicia sesión en tu registrador de dominios (Namecheap, Google Domains, etc.)
2. Navega a la configuración de DNS
3. Copia los registros SPF, DKIM y DMARC de Instantly/Smartlead
4. Pégalos en tus registros DNS
5. Espera 24-48 horas para la propagación

**Verificación:**
Usa MXToolbox.com para verificar que tus registros estén configurados correctamente.

</RevealSection>

<RevealSection title="Paso 4: Conecta Inboxes a la Plataforma (Día 2)">

**Qué Hacer:**
Conecta tus cuentas de email a Instantly o Smartlead usando OAuth (inicio de sesión con Google/Microsoft) o SMTP.

**Recomendación:**
Usa OAuth si es posible — es más seguro y menos propenso a desencadenar errores de autenticación.

**Por Qué:**
La plataforma necesita acceso para enviar emails en tu nombre y monitorear las respuestas.

</RevealSection>

<RevealSection title="Paso 5: Activa el Warmup (Día 2)">

**Qué Hacer:**
Activa el warmup para todos los inboxes conectados. Configura el warmup en "agresivo" o "normal" (no "conservador" — eso es demasiado lento).

**Qué Hace el Warmup:**
La plataforma envía emails entre tus inboxes y una red de inboxes de otros usuarios, aumentando gradualmente el volumen. Esto construye la reputación del remitente.

**Duración:**
Ejecuta el warmup durante **14-21 días** antes de enviar cualquier cold email. Los dominios nuevos necesitan tiempo para ganar confianza.

**Volumen Diario de Warmup:**

- Semana 1: 10-20 emails de warmup/día por inbox
- Semana 2: 20-40 emails de warmup/día por inbox
- Semana 3+: 40-60 emails de warmup/día por inbox

</RevealSection>

<RevealSection title="Paso 6: Establece Límites Diarios de Envío (Día 2)">

**Qué Hacer:**
Configura límites de envío diarios para cada inbox. Empieza de forma conservadora.

**Límites Recomendados:**

- **Dominios nuevos (0-30 días de antigüedad):** 20-30 emails/día por inbox
- **Dominios con warmup (30-60 días de antigüedad):** 40-50 emails/día por inbox
- **Dominios maduros (60+ días de antigüedad):** 50-80 emails/día por inbox

**Por Qué:**
Enviar demasiado demasiado rápido activa los filtros de spam. Aumenta gradualmente.

**Fórmula:**
Si tienes 3 inboxes y envías 30/día cada uno, eso son 90 emails/día total = 630/semana = ~2.500/mes. Esto encaja cómodamente dentro del límite de 5K/mes de Instantly Growth.

</RevealSection>

<RevealSection title="Paso 7: Importa Contactos de Prueba (Días 16-18)">

**Qué Hacer:**
Después de 14+ días de warmup, importa una lista pequeña de prueba (50-100 contactos). Envía un email simple y no de ventas para verificar la entregabilidad.

**Ejemplo de Email de Prueba:**

```
Subject: Pregunta rápida

Hola {first_name},

Me estoy comunicando con algunos {job_title}s en el espacio de {industry}
para preguntar: ¿cuál es tu mayor desafío con [tema relevante]
ahora mismo?

Sin pitch — genuinamente curioso/a.

{signature}
```

**Qué Monitorear:**

- Tasa de apertura (debería ser 40-60% para una prueba cálida)
- Tasa de rebote (debería ser &lt;2%)
- Quejas de spam (debería ser 0%)

**Si los Resultados Son Pobres:**
Espera otra semana de warmup. Verifica los registros DNS. Verifica la autenticación del inbox.

</RevealSection>

<RevealSection title="Paso 8: Lanza la Primera Campaña (Día 21+)">

**Qué Hacer:**
Importa tu lista real de prospectos. Crea tu primera campaña. Empieza al 25% de tu límite diario y escala durante 2 semanas.

**Cronograma de Escalado:**

- Semana 1: 25% del límite diario (ej., 7-8 emails/día por inbox)
- Semana 2: 50% del límite diario (15 emails/día por inbox)
- Semana 3: 75% del límite diario (22-23 emails/día por inbox)
- Semana 4+: 100% del límite diario (30 emails/día por inbox)

**Por Qué:**
El escalado gradual previene los picos repentinos que activan los filtros de spam.

</RevealSection>

</ProgressiveReveal>

---

## Errores Comunes de Configuración (Y Cómo Evitarlos)

<SwipeDecision
title="¿Buena Configuración o Mala Configuración?"
description="Desliza a la derecha para configuraciones correctas, a la izquierda para errores que arruinarán tu entregabilidad"
optionA="Mala Configuración"
optionB="Buena Configuración"
persistKey="ai-outreach-automation-L2-setup-swipe"
cards={[
{
id: "1",
content: "Enviar cold emails desde ventas@tustartup.com (tu dominio principal)",
correctOption: "a",
explanation: "Nunca envíes cold email desde tu dominio principal. Si es marcado, toda tu infraestructura de email de negocio está comprometida. Usa siempre dominios de outreach separados."
},
{
id: "2",
content: "Comprar obtentustartup.com y probartustartup.com como dominios de outreach",
correctOption: "b",
explanation: "Correcto. Estos dominios son lo suficientemente similares a tu marca para ser reconocibles, pero lo suficientemente separados para proteger tu dominio principal."
},
{
id: "3",
content: "Omitir la configuración de DNS y conectar inboxes directamente",
correctOption: "a",
explanation: "Sin registros SPF, DKIM y DMARC, tus emails irán al spam. La autenticación DNS no es negociable."
},
{
id: "4",
content: "Ejecutar warmup durante 14 días antes de enviar cualquier cold email",
correctOption: "b",
explanation: "Correcto. Los dominios nuevos necesitan tiempo para construir reputación de remitente. 14-21 días es el mínimo."
},
{
id: "5",
content: "Enviar 100 emails/día por inbox desde el día 1",
correctOption: "a",
explanation: "Esto te marcará de inmediato. Empieza con 20-30/día y aumenta gradualmente durante 2-3 semanas."
},
{
id: "6",
content: "Usar sara@obtentustartup.com en lugar de ventas@obtentustartup.com",
correctOption: "b",
explanation: "Los nombres humanos rinden mejor que las direcciones de ventas genéricas. Tanto la entregabilidad como las tasas de respuesta son más altas."
},
{
id: "7",
content: "Conectar 10 inboxes al plan Instantly Growth y enviar 500 emails/día total",
correctOption: "a",
explanation: "Instantly Growth tiene un límite de 5K emails/mes = ~170/día. Alcanzarías el límite en 10 días. Reduce el volumen o actualiza a Hypergrowth."
},
{
id: "8",
content: "Probar la entregabilidad con una lista de 50 personas antes de lanzar la campaña completa",
correctOption: "b",
explanation: "Inteligente. Siempre prueba con una lista pequeña primero para verificar tasas de apertura, tasas de rebote y quejas de spam antes de escalar."
}
]}
/>

---

## Migración: Cambiar Entre Plataformas

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Founders Técnicos">
Si estás considerando Smartlead solo por el acceso a la API, asegúrate de tener una **integración específica en mente**. "Podría necesitarla más adelante" no es una buena razón para elegir una UX ligeramente más difícil. Construye la integración primero en Zapier/Make, luego migra a la API si alcanzas los límites de rate o necesitas más control.
</ContextualNote>

**Cuándo Cambiar:**

- Elegiste Instantly pero ahora necesitas integraciones de API → Migra a Smartlead
- Elegiste Smartlead pero encuentras la UX frustrante y no usas la API → Migra a Instantly
- Estás escalando más de 500 emails/día y necesitas mejor analítica → Considera Smartlead Pro

**Costo de Migración:**

- Tiempo: 4-8 horas para exportar datos, reconfigurar campañas, reconectar inboxes
- Interrupción de entregabilidad: 1-2 semanas (el warmup necesita reiniciarse en la nueva plataforma)
- Riesgo: Medio (perderás analítica histórica y datos de A/B test)

**Cómo Migrar:**

1. Exporta todos los contactos y datos de campaña de la Plataforma A
2. Configura la Plataforma B con los mismos dominios e inboxes
3. Reinicia el warmup (incluso si los inboxes ya estaban con warmup)
4. Importa contactos y recrea campañas
5. Ejecuta una pequeña prueba antes de lanzar el volumen completo

<InsightCard icon="⚠️" title="Verificación de Realidad de la Migración">
Cambiar de plataforma es doloroso. La mayoría de los founders que cambian se arrepienten de no haber elegido correctamente la primera vez. Invierte una hora adicional en la decisión ahora para evitar 8 horas de trabajo de migración más adelante.
</InsightCard>

---

## Tu Decisión de Plataforma

Es hora de comprometerte. Usa este árbol de decisión para hacer tu elección final.

<DecisionTree
title="¿Instantly o Smartlead?"
persistKey="ai-outreach-automation-L2-decision-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Tienes una necesidad técnica específica (integración de API, white-label, webhooks personalizados)?",
choices: [
{ label: "Sí, necesito API/webhooks para una integración específica", nextNodeId: "api-yes" },
{ label: "No, solo quiero enviar cold emails", nextNodeId: "api-no" },
{ label: "Quizás en el futuro, pero no ahora mismo", nextNodeId: "api-maybe" }
]
},
{
id: "api-yes",
content: "¿Puedes articular exactamente qué construirás con la API?",
choices: [
{ label: "Sí, tengo una integración específica en mente", nextNodeId: "smartlead" },
{ label: "No, solo creo que podría necesitarla", nextNodeId: "api-maybe" }
]
},
{
id: "api-no",
content: "¿Quieres datos de leads B2B integrados (1.000 leads/mes)?",
choices: [
{ label: "Sí, eso me ahorraría tiempo", nextNodeId: "instantly" },
{ label: "No, ya tengo una fuente de leads", nextNodeId: "ab-test" }
]
},
{
id: "api-maybe",
content: "¿Te sientes cómodo con una UX ligeramente más compleja a cambio de flexibilidad futura?",
choices: [
{ label: "Sí, soy técnico y me gusta el control", nextNodeId: "smartlead" },
{ label: "No, quiero simplicidad ahora", nextNodeId: "instantly" }
]
},
{
id: "ab-test",
content: "¿Planeas ejecutar A/B tests agresivos (10+ variantes)?",
choices: [
{ label: "Sí, las pruebas son el núcleo de mi estrategia", nextNodeId: "instantly" },
{ label: "No, probaré 2-3 variantes como máximo", nextNodeId: "either" }
]
},
{
id: "instantly",
content: "**Recomendación: Instantly Growth ($37/mes)**\n\nIdeal para: Founders solo que quieren simplicidad, datos de leads integrados y A/B testing poderoso. Empieza aquí a menos que tengas una razón específica para elegir Smartlead.",
isTerminal: true,
outcome: "positive"
},
{
id: "smartlead",
content: "**Recomendación: Smartlead Basic ($39/mes)**\n\nIdeal para: Founders técnicos construyendo integraciones personalizadas, agencias haciendo white-label, o founders que necesitan analítica granular por inbox.",
isTerminal: true,
outcome: "positive"
},
{
id: "either",
content: "**Cualquiera de las dos plataformas funciona para ti.**\n\nElige al azar o ve con Instantly por la UX ligeramente más limpia y el ahorro de $2/mes. Ambas te servirán bien.",
isTerminal: true,
outcome: "neutral"
}
]}
/>

---

## Puntos de Acción: Tus Próximos Pasos

<InteractiveChecklist
title="Checklist de Configuración de Plataforma"
persistKey="ai-outreach-automation-L2-actions"
items={[
"Tomar la decisión final de plataforma (Instantly o Smartlead)",
"Comprar 2-3 dominios de outreach (ej., obtentustartup.com)",
"Crear 3-5 cuentas de email en dominios de outreach (Google Workspace o Microsoft 365)",
"Configurar los registros DNS (SPF, DKIM, DMARC) para todos los dominios",
"Conectar las cuentas de email a la plataforma elegida",
"Activar el warmup para todos los inboxes (configurar en 'normal' o 'agresivo')",
"Establecer límites de envío diarios (comenzar en 20-30/día por inbox)",
"Esperar 14-21 días de warmup antes de enviar cold emails",
"Importar una lista de prueba de 50 personas y enviar una campaña de prueba",
"Monitorear la tasa de apertura, tasa de rebote y quejas de spam"
]}
/>

---

## Verificación de Conocimientos

```json
{
  "quizTitle": "Dominio de Instantly vs Smartlead",
  "questions": [
    {
      "id": "q1",
      "question": "¿Cuál es la principal ventaja de Smartlead sobre Instantly?",
      "options": [
        "Precio más económico",
        "Mejor A/B testing",
        "Capacidades superiores de API y webhook",
        "Base de datos de leads B2B integrada"
      ],
      "correctAnswer": 2,
      "explanation": "Las capacidades de API y webhook de Smartlead son significativamente mejores que las de Instantly. Esto importa para founders técnicos que construyen integraciones personalizadas, pero es irrelevante para la mayoría de founders solo."
    },
    {
      "id": "q2",
      "question": "¿Cuál es la duración recomendada de warmup para nuevos dominios antes de enviar cold emails?",
      "options": ["3-5 días", "7-10 días", "14-21 días", "30+ días"],
      "correctAnswer": 2,
      "explanation": "Los nuevos dominios necesitan 14-21 días de warmup para construir reputación de remitente. Enviar cold emails antes de esto resultará en mala entregabilidad."
    },
    {
      "id": "q3",
      "question": "¿Qué dirección de email tiene la mejor entregabilidad?",
      "options": [
        "ventas@tustartup.com",
        "noreply@tustartup.com",
        "sara@obtentustartup.com",
        "info@tustartup.com"
      ],
      "correctAnswer": 2,
      "explanation": "Los nombres humanos en dominios de outreach separados rinden mejor. Las direcciones genéricas como 'ventas@' o 'noreply@' tienen menor entregabilidad. Nunca envíes cold email desde tu dominio principal."
    },
    {
      "id": "q4",
      "question": "Tienes 3 cuentas de email y quieres enviar 90 emails/día en total. ¿Qué límite diario debes establecer por inbox?",
      "options": [
        "10 emails/día por inbox",
        "20 emails/día por inbox",
        "30 emails/día por inbox",
        "50 emails/día por inbox"
      ],
      "correctAnswer": 2,
      "explanation": "90 emails/día ÷ 3 inboxes = 30 emails/día por inbox. Este es un límite seguro para dominios con warmup (30-60 días de antigüedad)."
    },
    {
      "id": "q5",
      "question": "¿Cuál es el costo mensual total de Instantly Growth + 3 cuentas de email + 2 dominios?",
      "options": ["$37-45", "$57-76", "$97-120", "$150-200"],
      "correctAnswer": 1,
      "explanation": "Instantly Growth ($37) + 3 cuentas de email ($18-36) + 2 dominios ($2-3) = $57-76/mes en total."
    }
  ]
}
```
