---
title: "Orquestadores: n8n, Trigger.dev, Zapier, Make"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 2
---

# La decisión de $5 vs $500

Sara, una fundadora técnica, pasó tres semanas construyendo un script de Python personalizado para automatizar la investigación de prospectos. Funcionaba perfectamente — exactamente durante 12 prospectos antes de romperse cuando LinkedIn cambió su estructura HTML.

Mientras tanto, su cofundador no técnico configuró el mismo flujo de trabajo en Zapier en 45 minutos. Le costó $20/mes y nunca se rompió.

¿Quién tomó la mejor decisión?

**Ninguno de los dos.** Sara debería haber usado n8n (auto-alojado, $5/mes, constructor visual, no se rompe). Su cofundador debería haber usado Make (la misma interfaz visual, la mitad del costo de Zapier).

El orquestador que elijas determina si tus agentes IA cuestan $5/mes o $500/mes, si tardan 2 horas o 2 semanas en construirse, y si funcionan de forma confiable o se rompen cada vez que cambia una API.

Esta lección es tu marco de decisión.

---

## Por qué los orquestadores son el arma secreta

La mayoría de los fundadores en solitario piensan que "agente IA" significa escribir código. No es así.

**Un agente IA es:**

- Un disparador (nuevo contacto en el CRM, correo entrante, tiempo programado)
- Un flujo de trabajo (llamadas a APIs, prompts al LLM, transformaciones de datos)
- Un resultado (actualización del CRM, borrador de correo, notificación en Slack)

Los orquestadores proporcionan esto **sin escribir código** (o con código mínimo si quieres control).

<InsightCard icon="🎯" title="El problema real">
No necesitas un framework como LangChain para la mayoría de los agentes de ventas. Necesitas una forma confiable de encadenar: disparador → enriquecer → IA → resultado. Eso es lo que hacen los orquestadores.
</InsightCard>

<RangeSlider 
  label="¿Qué tan cómodo te sientes con los constructores de flujos visuales?" 
  min={1} 
  max={10} 
  lowLabel="Nunca usé uno" 
  highLabel="Vivo en ellos" 
  persistKey="custom-ai-agents-L2-workflow-comfort" 
/>

---

## Los cuatro orquestadores (y cuándo usar cada uno)

<SlideNavigation>
<Slide title="n8n: la elección del desarrollador">

### n8n (Auto-alojado o en la nube)

**Qué es:** Automatización de flujos de trabajo de código abierto con 400+ integraciones y nodos de IA integrados.

**Precios:**

- Auto-alojado: **Gratis** (aloja en Railway/Render por $5-10/mes)
- Nube: **$24/mes** (flujos ilimitados)

**Mejor para:** Fundadores técnicos que quieren control total, flujos ilimitados y cadenas de agentes IA.

**Por qué gana para fundadores en solitario:**

- Constructor visual (sin código requerido)
- Nodos de IA/LLM integrados (Claude, GPT-4, Gemini)
- Auto-alojamiento = flujos ilimitados por $5-10/mes
- 400+ integraciones (CRM, correo, LinkedIn, APIs de enriquecimiento)
- Nodos de código disponibles cuando necesitas lógica personalizada

**Flujo de ejemplo:** Nuevo contacto en el CRM → enriquecimiento con Apollo → informe de investigación con Claude → actualización del CRM → notificación en Slack.

**Debilidad:** El auto-alojamiento requiere conocimientos básicos de DevOps (pero Railway lo hace con 1 clic).

<ExampleCard label="Desglose de costos real">
**Configuración n8n de Sara (auto-alojada en Railway):**
- Alojamiento en Railway: $7/mes
- Flujos: 5 agentes activos (investigación, borrador de correo, enriquecimiento, preparación de reunión, post-llamada)
- Ejecuciones mensuales: ~1.000 (50 prospectos/semana × 4 agentes cada uno)
- Costo total: **$7/mes** + costos de API (nivel gratuito de Apollo, Claude ~$15/mes)

**Total: $22/mes para agentes ilimitados.**
</ExampleCard>

</Slide>

<Slide title="Trigger.dev: la opción primero-código">

### Trigger.dev (Auto-alojado o en la nube)

**Qué es:** Framework de trabajos en segundo plano de código abierto para desarrolladores. Nativo en TypeScript.

**Precios:**

- Auto-alojado: **Gratis**
- Nube: **Nivel gratuito** (50K ejecuciones/mes), luego $20/mes

**Mejor para:** Desarrolladores que quieren agentes basados en código con ejecución confiable, reintentos y programación.

**Por qué gana para desarrolladores:**

- Escribe agentes en TypeScript (nativo de Next.js/Node.js)
- Reintentos integrados, manejo de errores y observabilidad
- Controla tus agentes con versiones (basado en Git)
- Sin constructor visual = control total

**Flujo de ejemplo:**

```typescript
// Trabajo de Trigger.dev: agente de investigación de prospectos
export const researchAgent = task({
  id: "prospect-research",
  run: async (payload: { contactId: string }) => {
    const contact = await crm.getContact(payload.contactId);
    const linkedin = await apollo.enrich(contact.email);
    const brief = await claude.generate({
      prompt: RESEARCH_PROMPT,
      context: { contact, linkedin },
    });
    await crm.updateContact(contact.id, { brief });
  },
});
```

**Debilidad:** Menos visual que n8n/Zapier. Requiere conocimientos de TypeScript.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para fundadores técnicos">
Si ya estás construyendo en Next.js o Node.js, Trigger.dev es tu camino más rápido. Tus agentes viven en tu base de código, con control de versiones y pruebas.
</ContextualNote>

</Slide>

<Slide title="Zapier: la opción por defecto no técnica">

### Zapier (Solo en la nube)

**Qué es:** La plataforma de automatización sin código más popular. 7.000+ integraciones.

**Precios:**

- Gratis: 5 Zaps (flujos)
- Starter: **$20/mes** (750 tareas)
- Profesional: **$49/mes** (2.000 tareas)

**Mejor para:** Fundadores no técnicos, flujos simples de 2-3 pasos.

**Por qué es popular:**

- El más fácil de aprender (incorporación de 30 minutos)
- La biblioteca de integraciones más grande (7.000+ aplicaciones)
- Acciones de IA disponibles (ChatGPT, Claude)
- No requiere conocimientos técnicos

**Flujo de ejemplo:** Nueva respuesta en Typeform → investigación con ChatGPT → Google Sheets → borrador en Gmail.

**Debilidad:** **Caro a escala.** 750 tareas/mes = ~37 prospectos/semana (si cada prospecto desencadena 5 pasos). Alcanzarás los límites rápidamente.

<InsightCard icon="💰" title="El impuesto Zapier">
Con 50 prospectos/semana y flujos de 5 pasos, necesitas 1.000 tareas/mes. Eso es $49/mes en Profesional. n8n auto-alojado hace lo mismo ilimitado por $7/mes.
</InsightCard>

</Slide>

<Slide title="Make: el usuario avanzado visual">

### Make (anteriormente Integromat) (Solo en la nube)

**Qué es:** Plataforma de automatización visual con más complejidad que Zapier a menor costo.

**Precios:**

- Gratis: 1.000 operaciones/mes
- Core: **$10/mes** (10.000 operaciones)
- Pro: **$18/mes** (10.000 operaciones + funcionalidades avanzadas)

**Mejor para:** Personas con mentalidad visual que necesitan complejidad moderada a menor costo que Zapier.

**Por qué es la opción de valor:**

- 2-5 veces más barato que Zapier para flujos equivalentes
- Más poderoso (ramificación, manejo de errores, transformaciones de datos)
- 1.500+ integraciones
- Enrutador visual para lógica compleja

**Flujo de ejemplo:** Nuevo contacto en el CRM → (si tamaño de empresa > 50) → enriquecimiento con Clearbit → (sino) → enriquecimiento con Apollo → informe con Claude → actualización del CRM.

**Debilidad:** Curva de aprendizaje más pronunciada que Zapier. La interfaz puede sentirse abrumadora al principio.

<ExampleCard label="Comparativa de costos: Make vs Zapier">
**Escenario:** 50 prospectos/semana, flujo de 5 pasos = 1.000 operaciones/mes

- **Zapier Profesional:** $49/mes (2.000 tareas)
- **Make Core:** $10/mes (10.000 operaciones)

**Ahorro: $39/mes = $468/año**
</ExampleCard>

</Slide>
</SlideNavigation>

---

## La matriz de selección del orquestador

<ComparisonBuilder
title="Elige tu orquestador"
persistKey="custom-ai-agents-L2-orchestrator-choice"
prompt="Según tu nivel técnico y presupuesto, ¿qué orquestador encaja mejor?"
expertExample="Fundador técnico, presupuesto de $10/mes, quiere flujos ilimitados → n8n auto-alojado en Railway ($7/mes)"
criteria={[
"Nivel de comodidad técnica (1-10)",
"Presupuesto mensual para automatización ($0-100)",
"Complejidad del flujo (simple de 2 pasos vs múltiples ramas)",
"Necesidad de personalización con código (sí/no)"
]}
/>

Aquí está el árbol de decisión:

**Presupuesto < $10/mes:**

- Técnico → **n8n auto-alojado** (gratis + $5-10 de alojamiento)
- No técnico → **Nivel gratuito de Make** (1K ops) o **Gratis de Zapier** (5 Zaps)

**Presupuesto $10-30/mes:**

- Técnico → **n8n en la nube** ($24/mes, ilimitado)
- No técnico → **Make Core** ($10/mes, 10K ops)

**Presupuesto $30-50/mes:**

- Técnico → **n8n en la nube** o **Trigger.dev en la nube**
- No técnico → **Zapier Starter** ($20/mes) o **Make Pro** ($18/mes)

**Desarrollador que quiere código:**

- **Trigger.dev** (nivel gratuito, nativo en TypeScript)

<FlipCard 
  front="El costo oculto de 'gratis'" 
  back="El nivel gratuito de Zapier (5 Zaps) parece generoso hasta que te das cuenta de que cada agente necesita 3-5 Zaps (disparador, enriquecimiento, IA, resultado, notificación). Llegarás al límite con 1-2 agentes." 
/>

---

## Construyendo tu primer flujo de agente (ejemplo en n8n)

Vamos a construir el **Agente de Investigación de Prospectos** de la Lección 3 en n8n. Este flujo se ejecuta cuando se añade un nuevo contacto a tu CRM.

<TemplateBuilder
title="Flujo de trabajo en n8n: Agente de Investigación de Prospectos"
persistKey="custom-ai-agents-L2-n8n-workflow"
sections={[
{
id: "trigger",
title: "1. Disparador",
fields: [
{ id: "trigger-type", label: "Tipo de disparador", placeholder: "Webhook, nuevo contacto en CRM, manual", type: "text" },
{ id: "trigger-source", label: "Fuente de datos", placeholder: "ej. HubSpot, Pipedrive, Airtable", type: "text" }
]
},
{
id: "enrich",
title: "2. Enriquecimiento",
fields: [
{ id: "enrich-api", label: "API de enriquecimiento", placeholder: "ej. Apollo, Clearbit, Hunter", type: "text" },
{ id: "enrich-fields", label: "Campos a enriquecer", placeholder: "ej. tamaño de empresa, URL de LinkedIn, stack tecnológico", type: "textarea" }
]
},
{
id: "ai",
title: "3. Investigación IA",
fields: [
{ id: "ai-model", label: "Modelo LLM", placeholder: "ej. Claude Sonnet 4, GPT-4o", type: "text" },
{ id: "ai-prompt", label: "Plantilla de prompt de investigación", placeholder: "Pega tu prompt de la Lección 3", type: "textarea" }
]
},
{
id: "output",
title: "4. Resultado",
fields: [
{ id: "output-crm", label: "Campo del CRM a actualizar", placeholder: "ej. campo personalizado 'Informe de Investigación'", type: "text" },
{ id: "output-notify", label: "Canal de notificación", placeholder: "ej. Slack, correo, ninguno", type: "text" }
]
}
]}
/>

### El flujo de trabajo en n8n (representación visual)

```
[Disparador: Webhook del CRM]
  ↓
[Solicitud HTTP: Apollo API]
  Entrada: contact.email
  Salida: company_size, linkedin_url, tech_stack
  ↓
[Solicitud HTTP: Google News API]
  Entrada: contact.company
  Salida: recent_news (últimos 30 días)
  ↓
[Nodo Agente IA: Claude Sonnet 4]
  System Prompt: "Eres un agente de investigación de prospectos..."
  Entrada: {contact, apollo_data, news}
  Salida: {research_brief, icp_score, recommended_angle}
  ↓
[Nodo IF: ICP Score >= 7]
  SÍ → [Actualización CRM: Añadir informe + etiquetar "Alta Prioridad"]
         → [Notificación Slack: "Nuevo prospecto de alto encaje"]
  NO → [Actualización CRM: Añadir informe + etiquetar "Baja Prioridad"]
  ↓
[Fin]
```

<InsightCard icon="🔧" title="El poder de los flujos visuales">
Este flujo de 6 nodos reemplaza 50+ líneas de código Python. Sin manejo de errores que escribir, sin lógica de reintento de API, sin infraestructura de registro. n8n lo maneja todo.
</InsightCard>

---

## Patrones de diseño de flujos (para todos los orquestadores)

Cada flujo de agente de ventas sigue uno de estos patrones:

### Patrón 1: Pipeline lineal

**Disparador → Enriquecer → IA → Resultado**

Úsalo para: Agentes de investigación, redactores de correos, preparación de reuniones.

Ejemplo: Nuevo contacto → enriquecimiento con Apollo → informe con Claude → actualización del CRM.

### Patrón 2: Rama condicional

**Disparador → Enriquecer → SI/SINO → Diferentes caminos de IA → Resultado**

Úsalo para: Puntuación del ICP, enrutamiento de leads, selección de secuencia.

Ejemplo: Nuevo contacto → Apollo → SI tamaño_empresa > 50 → secuencia enterprise, SINO → secuencia PyME.

### Patrón 3: Enriquecimiento paralelo

**Disparador → [Apollo + Clearbit + Noticias] en paralelo → Fusionar → IA → Resultado**

Úsalo para: Máxima cobertura de datos, optimización de velocidad.

Ejemplo: Nuevo contacto → (Apollo, Clearbit, Google News se ejecutan simultáneamente) → fusionar resultados → informe con Claude.

### Patrón 4: Humano en el bucle

**Disparador → Borrador IA → Aprobación en Slack → SI Aprobado → Enviar, SINO → Descartar**

Úsalo para: Envío de correos, prospección en LinkedIn, todo lo que requiera juicio humano.

Ejemplo: Investigación completa → borrador de correo con Claude → revisión en Slack → Aprobar/Editar → Enviar.

<ClassifyExercise
title="Empareja el agente con el patrón"
persistKey="custom-ai-agents-L2-pattern-match"
categories={[
{ id: "linear", label: "Pipeline lineal", color: "#3b82f6" },
{ id: "conditional", label: "Rama condicional", color: "#f59e0b" },
{ id: "parallel", label: "Enriquecimiento paralelo", color: "#10b981" },
{ id: "hitl", label: "Humano en el bucle", color: "#ef4444" }
]}
items={[
{ id: "1", content: "Agente de investigación de prospectos (nuevo contacto → enriquecer → informe → CRM)", correctCategory: "linear" },
{ id: "2", content: "Remitente de correos (borrador → revisión humana → aprobar → enviar)", correctCategory: "hitl" },
{ id: "3", content: "Enrutador de leads (nuevo lead → puntuar → SI alto → ventas, SINO → nurture)", correctCategory: "conditional" },
{ id: "4", content: "Agente de enriquecimiento (contacto → Apollo + Clearbit + LinkedIn → fusionar → CRM)", correctCategory: "parallel" }
]}
/>

---

## Modelado de costos: ¿qué costarán realmente tus agentes?

Vamos a modelar los **5 agentes principales** de este curso ejecutándose para un fundador en solitario que hace 50 prospectos/semana.

<ScenarioSimulator
title="Calculadora de costos de agentes"
persistKey="custom-ai-agents-L2-cost-simulator"
levers={[
{ id: "prospects", label: "Prospectos por semana", min: 10, max: 200, step: 10, defaultValue: 50 },
{ id: "orchestrator", label: "Elección de orquestador", options: ["n8n auto-alojado ($7)", "n8n en la nube ($24)", "Make ($10)", "Zapier ($49)"], defaultValue: "n8n auto-alojado ($7)" }
  ]}
  outputs={[
    { id: "monthly-runs", label: "Ejecuciones de flujo mensuales", formula: "prospects * 4 * 5", unit: "", precision: 0 },
    { id: "orchestrator-cost", label: "Costo del orquestador", formula: "orchestrator === 'n8n auto-alojado ($7)' ? 7 : orchestrator === 'n8n en la nube ($24)' ? 24 : orchestrator === 'Make ($10)' ? 10 : 49", unit: "$", precision: 0 },
{ id: "llm-cost", label: "Costo del LLM (Claude Sonnet)", formula: "(prospects _ 4 _ 5 _ 0.02)", unit: "$", precision: 2 },
    { id: "total-cost", label: "Costo mensual total", formula: "orchestrator-cost + llm-cost", unit: "$", precision: 2 }
]}
insight="Con `{prospects}` prospectos/semana, tus 5 agentes cuestan **${total-cost}/mes**. Eso es \*\*${total-cost / (prospects _ 4)}/prospecto\*\* — mucho más barato que un asistente o SDR."
/>

**Desglose de costos (50 prospectos/semana, n8n auto-alojado):**

- Orquestador (n8n en Railway): **$7/mes**
- Llamadas al LLM (Claude Sonnet, 5 agentes × 50 prospectos × 4 semanas): **~$20/mes**
- APIs de enriquecimiento (nivel gratuito de Apollo): **$0/mes**
- **Total: $27/mes** para 200 prospectos/mes completamente automatizados.

Comparado con:

- Asistente haciendo investigación manual: **$400-800/mes** (10-20 horas/semana a $10-20/hora)
- Herramienta SDR (Outreach, SalesLoft): **$100-150/mes/licencia**

<FlipCard 
  front="La ventaja de costo 10x" 
  back="Los agentes IA cuestan $27/mes. Un asistente cuesta $400-800/mes. Una herramienta SDR cuesta $100-150/mes. Los agentes son 10-30 veces más baratos y funcionan las 24 horas." 
/>

---

## Consideraciones de seguridad y cumplimiento

Los orquestadores manejan datos sensibles (correos, registros del CRM, claves de API). Cómo mantenerse seguro:

### 1. Gestión de claves de API

- **Nunca codifiques claves de API** en los flujos
- Usa variables de entorno (almacén de credenciales de n8n, almacenamiento seguro de Zapier/Make)
- Rota las claves cada 90 días
- Usa claves separadas para desarrollo/producción

### 2. Retención de datos

- **No registres datos personales** en los registros de ejecución de flujos
- Establece límites de retención (n8n: 30 días, Zapier: 14 días)
- Cumplimiento del RGPD: eliminar datos de prospectos cuando se solicite

### 3. Control de acceso

- **Limita quién puede editar los flujos** (fundador en solitario = solo tú, pero planifica para el equipo futuro)
- Usa 2FA en las cuentas del orquestador
- Audita los cambios en los flujos mensualmente

### 4. Manejo de errores

- **Nunca expongas claves de API en los mensajes de error**
- Configura notificaciones de fallos (Slack, correo)
- Construye lógica de reintento para fallos transitorios (límites de velocidad de la API, tiempos de espera)

<LinterFeedback
title="Linter de seguridad del flujo"
persistKey="custom-ai-agents-L2-security-linter"
inputLabel="Pega la descripción de tu flujo o URL de captura de pantalla"
rules={[
{ id: "api-keys", label: "Claves de API en almacén de credenciales", description: "Sin claves codificadas en el flujo", keywords: ["credentials", "vault", "env var"], antiKeywords: ["sk-", "api_key ="] },
{ id: "pii-logging", label: "Registro de datos personales desactivado", description: "Los registros de ejecución no almacenan correos/nombres", keywords: ["log disabled", "redacted"], antiKeywords: ["log all", "debug mode"] },
{ id: "error-handling", label: "Manejo de errores presente", description: "El flujo tiene lógica de reintento y notificaciones de fallo", keywords: ["retry", "on error", "catch"], antiKeywords: [] }
]}
/>

---

## Errores comunes en orquestadores (y cómo evitarlos)

### Error 1: Sobreingeniería del primer flujo

**Lo que hacen los fundadores:** Construyen un flujo de 15 nodos con ramas paralelas, manejo de errores y lógica de respaldo el primer día.

**Qué hacer en su lugar:** Empieza con un flujo lineal de 3 nodos (disparador → IA → resultado). Añade complejidad solo cuando sea necesario.

### Error 2: No probar con datos reales

**Lo que hacen los fundadores:** Construyen el flujo con datos de prueba falsos, lo despliegan en producción, y luego descubren que los campos de su CRM no coinciden.

**Qué hacer en su lugar:** Prueba con 5-10 prospectos reales en un CRM de staging antes de lanzarte en vivo.

### Error 3: Ignorar los límites de velocidad

**Lo que hacen los fundadores:** Ejecutan 200 prospectos a través del enriquecimiento de Apollo en 5 minutos, alcanzan los límites de velocidad, el flujo se rompe.

**Qué hacer en su lugar:** Añade demoras entre llamadas a la API (n8n: nodo "Esperar", Zapier: acción "Demora"). Procesa en lotes (10 prospectos/hora en lugar de 200 de una vez).

### Error 4: Sin revisión humana para acciones de alto riesgo

**Lo que hacen los fundadores:** Envían automáticamente correos redactados por IA sin revisión. Un hecho alucinado arruina la credibilidad.

**Qué hacer en su lugar:** Usa humano en el bucle para el envío de correos, la prospección en LinkedIn y cualquier cosa orientada al cliente.

<SwipeDecision
title="¿Flujo bien diseñado o flujo arriesgado?"
description="Desliza a la derecha para flujos bien diseñados, a la izquierda para arriesgados"
optionA="Arriesgado"
optionB="Bien diseñado"
persistKey="custom-ai-agents-L2-workflow-swipe"
cards={[
{ id: "1", content: "Enviar automáticamente 50 correos fríos redactados por IA sin revisión humana", correctOption: "a", explanation: "Alto riesgo de alucinaciones o problemas de tono. Siempre revisa el primer lote." },
{ id: "2", content: "Generar informes de investigación automáticamente, guardar en CRM, notificar en Slack para revisión", correctOption: "b", explanation: "Acción de bajo riesgo (actualización del CRM) + notificación humana para el seguimiento de alto riesgo." },
{ id: "3", content: "Ejecutar 200 enriquecimientos de Apollo en paralelo sin manejo de límites de velocidad", correctOption: "a", explanation: "Alcanzará los límites de velocidad y se romperá. Añade demoras o procesamiento en lotes." },
{ id: "4", content: "Flujo lineal: Nuevo contacto → Apollo → informe con Claude → actualización del CRM", correctOption: "b", explanation: "Simple, confiable, bajo riesgo. El primer flujo perfecto." }
]}
/>

---

## Tu primer flujo: construcción guiada

Vamos a construir el **Agente de Investigación de Prospectos** en tu orquestador elegido.

<ProgressiveReveal title="Construcción del flujo paso a paso" persistKey="custom-ai-agents-L2-build-reveal">
<RevealSection title="Paso 1: Elige tu orquestador">

Según tu selección anterior, elige tu herramienta:

- **n8n auto-alojado:** Regístrate en Railway, despliega n8n (plantilla de 1 clic)
- **n8n en la nube:** Regístrate en n8n.io, comienza la prueba gratuita
- **Trigger.dev:** Regístrate en trigger.dev, crea un nuevo proyecto
- **Make:** Regístrate en make.com, comienza el nivel gratuito
- **Zapier:** Regístrate en zapier.com, comienza el nivel gratuito

**Acción:** Crea tu cuenta e inicia sesión.

</RevealSection>

<RevealSection title="Paso 2: Configura tu disparador">

**Para n8n/Make/Zapier:**

- Añade un disparador "Webhook" (para integraciones con CRM) O
- Añade un disparador "Nuevo Contacto en CRM" (si tu CRM está soportado)

**Para Trigger.dev:**

```typescript
export const researchAgent = task({
  id: "prospect-research",
  trigger: eventTrigger({
    name: "crm.contact.created",
  }),
  run: async (payload) => {
    /* ... */
  },
});
```

**Acción:** Configura tu disparador para que se active cuando se añada un nuevo contacto a tu CRM.

</RevealSection>

<RevealSection title="Paso 3: Añade el paso de enriquecimiento">

**Para n8n/Make/Zapier:**

- Añade un nodo/acción "Solicitud HTTP"
- Configura la llamada a la API de Apollo:
  - Método: POST
  - URL: `https://api.apollo.io/v1/people/match`
  - Encabezados: `Api-Key: TU_CLAVE_APOLLO`
  - Cuerpo: `{ "email": "{{trigger.email}}" }`

**Para Trigger.dev:**

```typescript
const enrichment = await apollo.enrich({
  email: payload.contact.email,
});
```

**Acción:** Prueba el paso de enriquecimiento con una dirección de correo real.

</RevealSection>

<RevealSection title="Paso 4: Añade el paso de investigación IA">

**Para n8n:**

- Añade un nodo "OpenAI" o "Anthropic"
- Selecciona el modelo: Claude Sonnet 4
- Pega tu prompt de investigación de la Lección 3
- Mapea los datos de enriquecimiento en las variables del prompt

**Para Make/Zapier:**

- Añade una acción "ChatGPT" o "Claude"
- Configura el prompt con los datos de enriquecimiento

**Para Trigger.dev:**

```typescript
const brief = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  messages: [
    {
      role: "user",
      content: RESEARCH_PROMPT.replace("{data}", JSON.stringify(enrichment)),
    },
  ],
});
```

**Acción:** Prueba el paso de IA con los datos de enriquecimiento del Paso 3.

</RevealSection>

<RevealSection title="Paso 5: Añade el paso de actualización del CRM">

**Para n8n/Make/Zapier:**

- Añade tu acción de CRM (HubSpot, Pipedrive, Airtable, etc.)
- Selecciona "Actualizar Contacto"
- Mapea el resultado de la IA al campo del CRM (ej. campo personalizado "Informe de Investigación")

**Para Trigger.dev:**

```typescript
await crm.updateContact(payload.contact.id, {
  researchBrief: brief.content[0].text,
  icpScore: extractScore(brief.content[0].text),
});
```

**Acción:** Prueba el flujo completo de principio a fin con un contacto real.

</RevealSection>

<RevealSection title="Paso 6: Añade notificación (opcional)">

**Para n8n/Make/Zapier:**

- Añade una acción "Slack" o "Correo"
- Configura el mensaje: "Nuevo informe de investigación para `{contact.name}`"

**Para Trigger.dev:**

```typescript
await slack.postMessage({
  channel: "#sales",
  text: `Nuevo informe de investigación para ${payload.contact.name}`,
});
```

**Acción:** Prueba la notificación.

</RevealSection>
</ProgressiveReveal>

---

## Comparativa de orquestadores: uno frente al otro

<StrategyDuel
title="n8n auto-alojado vs Zapier"
persistKey="custom-ai-agents-L2-orchestrator-duel"
scenario="Eres un fundador técnico con 5 agentes que construir y un presupuesto de $50/mes."
strategyA={{
    name: "n8n Auto-alojado",
    description: "Despliega n8n en Railway ($7/mes), construye los 5 agentes visualmente",
    pros: ["Flujos ilimitados", "Control total", "Opción más barata ($7/mes)", "Nodos de IA integrados"],
    cons: ["Requiere conocimientos básicos de DevOps", "Actualizaciones autogestionadas", "Sin soporte telefónico"]
  }}
strategyB={{
    name: "Zapier Profesional",
    description: "Usa Zapier para los 5 agentes ($49/mes por 2K tareas)",
    pros: ["El más fácil de aprender", "La biblioteca de integraciones más grande", "Servicio gestionado"],
    cons: ["Caro ($49/mes)", "Límites de tareas (2K/mes = ~50 prospectos/semana)", "Menos potente que n8n"]
  }}
expertVerdict="n8n auto-alojado gana para fundadores técnicos. $7/mes vs $49/mes, flujos ilimitados y más potente. Zapier solo es mejor si eres no técnico y necesitas más orientación."
/>

---

## Resumen: tu decisión de orquestador

<InteractiveChecklist
title="Tus acciones"
persistKey="custom-ai-agents-L2-actions"
items={[
"Elige tu orquestador según tu nivel técnico y presupuesto (usa la matriz comparativa)",
"Regístrate en la herramienta elegida y crea tu primer flujo (Agente de Investigación de Prospectos)",
"Prueba el flujo con 5 prospectos reales de tu CRM",
"Configura notificaciones de error (Slack o correo) para fallos en el flujo",
"Documenta tu flujo (captura de pantalla o exporta el JSON) para referencia futura",
"Calcula tu costo mensual (orquestador + LLM + APIs) usando el simulador de costos"
]}
/>

---

## Quiz: dominio del orquestador

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Eres un fundador no técnico con un presupuesto de $20/mes. ¿Qué orquestador deberías elegir?",
      "options": [
        "n8n auto-alojado (requiere conocimientos de DevOps)",
        "Trigger.dev (requiere TypeScript)",
        "Make Core ($10/mes, constructor visual)",
        "Zapier Profesional ($49/mes)"
      ],
      "correctAnswer": 2,
      "explanation": "Make Core ($10/mes) es la mejor opción: constructor visual (sin código), asequible y más potente que Zapier. n8n requiere habilidades técnicas, Trigger.dev requiere programación, y Zapier es demasiado caro."
    },
    {
      "id": "q2",
      "question": "¿Qué patrón de flujo deberías usar para un agente que enriquece contactos desde múltiples APIs (Apollo, Clearbit, LinkedIn) simultáneamente?",
      "options": [
        "Pipeline lineal",
        "Rama condicional",
        "Enriquecimiento paralelo",
        "Humano en el bucle"
      ],
      "correctAnswer": 2,
      "explanation": "El enriquecimiento paralelo ejecuta múltiples llamadas a la API simultáneamente, luego fusiona los resultados. Esto es más rápido y maximiza la cobertura de datos en comparación con el enriquecimiento secuencial (lineal)."
    },
    {
      "id": "q3",
      "question": "Estás construyendo un agente de envío de correos. ¿Qué patrón de flujo es esencial?",
      "options": [
        "Pipeline lineal (disparador → IA → enviar)",
        "Enriquecimiento paralelo (múltiples fuentes de datos)",
        "Humano en el bucle (borrador IA → revisión humana → enviar)",
        "Rama condicional (lógica SI/SINO)"
      ],
      "correctAnswer": 2,
      "explanation": "El humano en el bucle es crítico para el envío de correos. La IA puede alucinar o cometer errores de tono. Siempre revisa antes de enviar mensajes orientados al cliente."
    },
    {
      "id": "q4",
      "question": "Con 50 prospectos/semana y 5 agentes, ¿cuántas ejecuciones de flujo al mes?",
      "options": [
        "250 (50 × 5)",
        "1.000 (50 × 4 semanas × 5 agentes)",
        "200 (50 × 4 semanas)",
        "500 (50 × 10)"
      ],
      "correctAnswer": 1,
      "explanation": "50 prospectos/semana × 4 semanas = 200 prospectos/mes. Cada prospecto desencadena 5 agentes = 200 × 5 = 1.000 ejecuciones/mes."
    },
    {
      "id": "q5",
      "question": "¿Cuál es el error de seguridad número 1 que los fundadores en solitario cometen con los orquestadores?",
      "options": [
        "No usar 2FA",
        "Codificar claves de API en los flujos",
        "No configurar notificaciones de error",
        "Usar niveles gratuitos"
      ],
      "correctAnswer": 1,
      "explanation": "Codificar claves de API en los flujos es el error más peligroso. Si alguien obtiene acceso a tu orquestador, tiene tus claves. Siempre usa almacenes de credenciales o variables de entorno."
    }
  ]
}
```
