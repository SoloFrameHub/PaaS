---
title: "Agente 3: Agente de Enriquecimiento de CRM"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 5
---

# Agente 3: Agente de Enriquecimiento de CRM

## El Error de $3,000

Sarah llevaba 6 semanas ejecutando contacto en frío. Su tasa de respuesta estaba atascada en el 2%. No podía entender por qué — sus emails lucían bien, su targeting parecía correcto, su propuesta de valor era clara.

Entonces ejecutó una auditoría de datos.

**El 47% de sus contactos "VP de Marketing" ya no eran VPs.** Habían cambiado de trabajo hace 3-8 meses. Su CRM era un cementerio de datos obsoletos y había estado enviando emails a fantasmas.

¿El costo? 6 semanas de tiempo de envío. Aproximadamente 1,500 emails a personas equivocadas. Con una tasa de respuesta del 10% a las _personas correctas_, se había perdido ~75 conversaciones. Con su ACV de $2K y tasa de cierre del 20%, eso son **$3,000 en ingresos perdidos** solo por la degradación de datos.

<InsightCard icon="⚠️" title="El Impuesto Oculto">
Los datos del CRM se degradan a un ritmo del 2-3% por mes. Sin enriquecimiento, el 25-36% de tus registros quedan obsoletos en un año. Cada registro obsoleto es un envío desperdiciado, un punto de daño a la reputación del remitente y una oportunidad perdida.
</InsightCard>

Hoy construyes el agente que previene esto: el **Agente de Enriquecimiento de CRM**. Mantiene tus datos frescos, rellena los campos faltantes y señala los problemas antes de que te cuesten negocios.

---

## ¿Qué Es el Enriquecimiento de CRM?

**Enriquecimiento** = rellenar automáticamente los campos de datos faltantes y actualizar la información cambiada en tu CRM.

Cuando añades un contacto, normalmente tienes:

- Nombre
- Email (quizás)
- Empresa (quizás)
- Rol (quizás)

Un agente de enriquecimiento añade:

- **Datos de empresa**: número de empleados, etapa de financiación, stack tecnológico, industria, ubicación de la sede
- **Verificación de contacto**: validez del email, URL de LinkedIn, teléfono, zona horaria
- **Señales de actividad**: última publicación de LinkedIn, antigüedad en el trabajo, noticias recientes de la empresa
- **Puntuación de ajuste**: puntuación de coincidencia con el ICP, nivel de prioridad, canal recomendado

<FlipCard 
  front="¿Por qué no enriquecer solo una vez?" 
  back="Porque los datos cambian. La gente cambia de trabajo (15-20% anualmente), las empresas son adquiridas, los emails rebotan, los números de teléfono cambian. El enriquecimiento es un proceso continuo, no una tarea única." 
/>

### Los Dos Modos de Enriquecimiento

<SlideNavigation>
<Slide title="Enriquecimiento Basado en Eventos">

**Disparador:** Nuevo contacto añadido al CRM

**Qué hace:**

- Se ejecuta inmediatamente cuando se crea un contacto
- Rellena todos los campos faltantes usando fuentes en cascada
- Verifica la entregabilidad del email
- Calcula la puntuación de ajuste al ICP
- Etiqueta por prioridad/canal

**Ideal para:** Mantener nuevos leads listos para el contacto en minutos

**Ejemplo de flujo:**

1. Importas 50 contactos de LinkedIn
2. El agente se ejecuta en cada uno en 5 minutos
3. 45/50 obtienen datos completos de empresa
4. 42/50 obtienen emails verificados
5. Los 50 obtienen puntuaciones ICP y etiquetas de prioridad
6. Los contactos de alta prioridad disparan el agente de investigación (Agente 1)

</Slide>

<Slide title="Enriquecimiento Programado">

**Disparador:** Tarea cron semanal/mensual

**Qué hace:**

- Actualiza los registros con más de 90 días de antigüedad
- Vuelve a verificar emails que no se han comprobado en 60 días
- Actualiza datos de empresa (financiación, tamaño, noticias)
- Marca contactos que cambiaron de trabajo
- Elimina duplicados

**Ideal para:** Mantener la calidad de datos a lo largo del tiempo

**Ejemplo de flujo:**

1. Cada domingo a las 2am, el agente se ejecuta
2. Selecciona todos los contactos con `last_enriched < 90 días atrás`
3. Vuelve a verificar tamaño de empresa, financiación, títulos de trabajo
4. Encuentra 12 contactos que cambiaron de empresa
5. Los etiqueta como "Necesita Re-calificación"
6. Te envía un resumen por Slack

</Slide>
</SlideNavigation>

---

## El Patrón de Enriquecimiento en Cascada

Ninguna fuente de datos tiene cobertura del 100%. El truco es el **enriquecimiento en cascada**: intenta la Fuente A → si falta, intenta la Fuente B → si falta, intenta la Fuente C.

<ExampleCard label="Números de Cobertura Reales">

**Cascada de enriquecimiento de email:**

- Apollo.io: 60-70% de cobertura (nivel gratuito: 10K/mes)
- Hunter.io: +10-15% de cobertura (gratis: 25/mes, pagado: $49/mes)
- Snov.io: +5% de cobertura ($39/mes)
- **Cobertura total: 75-90%**

**Cascada de datos de empresa:**

- Apollo.io: 65% de cobertura (gratis)
- Clearbit: +20% de cobertura ($99/mes)
- Scraping de búsqueda de Google: +10% de cobertura (gratis, más lento)
- **Cobertura total: 85-95%**

</ExampleCard>

La cascada maximiza la cobertura mientras minimiza el costo. Solo accedes a las APIs de pago cuando las gratuitas fallan.

<RangeSlider 
  label="¿Cuál es la completitud actual de los datos de tu CRM?" 
  min={0} 
  max={100} 
  lowLabel="0% (solo nombres)" 
  highLabel="100% (completamente enriquecido)" 
  persistKey="custom-ai-agents-L5-completeness" 
/>

---

## Campos de Enriquecimiento: Qué Recopilar

### SaaS B2B / Negocio de Servicios

<TemplateBuilder
title="Esquema de Enriquecimiento B2B"
persistKey="custom-ai-agents-L5-b2b-schema"
sections={[
{
id: "company",
title: "Campos de Empresa",
fields: [
{ id: "size", label: "Número de Empleados", placeholder: "ej., 50-200", type: "text" },
{ id: "funding", label: "Etapa de Financiación", placeholder: "ej., Serie A, Bootstrapped", type: "text" },
{ id: "industry", label: "Industria", placeholder: "ej., SaaS, E-commerce", type: "text" },
{ id: "tech_stack", label: "Stack Tecnológico (si es relevante)", placeholder: "ej., Salesforce, HubSpot, Stripe", type: "textarea" }
]
},
{
id: "contact",
title: "Campos de Contacto",
fields: [
{ id: "title_verified", label: "Verificación de Título", placeholder: "Título actual de LinkedIn", type: "text" },
{ id: "tenure", label: "Antigüedad en el Trabajo", placeholder: "ej., 2 años 3 meses", type: "text" },
{ id: "linkedin", label: "URL de LinkedIn", placeholder: "https://linkedin.com/in/...", type: "text" },
{ id: "timezone", label: "Zona Horaria", placeholder: "ej., America/New_York", type: "text" }
]
},
{
id: "activity",
title: "Señales de Actividad",
fields: [
{ id: "last_post", label: "Fecha de Última Publicación en LinkedIn", placeholder: "ej., 2025-01-15", type: "text" },
{ id: "posting_freq", label: "Frecuencia de Publicación", placeholder: "ej., 2-3x/semana", type: "text" },
{ id: "recent_news", label: "Noticias Recientes de la Empresa", placeholder: "Financiación, adquisición, lanzamiento de producto", type: "textarea" }
]
}
]}
/>

### Creador / Coach / Consultor

<TemplateBuilder
title="Esquema de Enriquecimiento para Creadores"
persistKey="custom-ai-agents-L5-creator-schema"
sections={[
{
id: "audience",
title: "Campos de Audiencia",
fields: [
{ id: "size", label: "Tamaño de Audiencia", placeholder: "ej., 15K Twitter, 8K email", type: "text" },
{ id: "platforms", label: "Plataformas Principales", placeholder: "ej., Twitter, YouTube, Newsletter", type: "text" },
{ id: "niche", label: "Nicho de Contenido", placeholder: "ej., marketing SaaS, productividad", type: "text" }
]
},
{
id: "monetization",
title: "Señales de Monetización",
fields: [
{ id: "model", label: "Modelo de Ingresos", placeholder: "ej., Cursos, Coaching, Patrocinios", type: "text" },
{ id: "products", label: "Productos Conocidos", placeholder: "ej., Curso de $500, coaching de $2K", type: "textarea" }
]
},
{
id: "activity",
title: "Señales de Actividad",
fields: [
{ id: "frequency", label: "Frecuencia de Contenido", placeholder: "ej., Tweets diarios, newsletter semanal", type: "text" },
{ id: "recent_launch", label: "Lanzamiento Reciente", placeholder: "Nuevo producto, comunidad, asociación", type: "textarea" }
]
}
]}
/>

<InsightCard icon="🎯" title="La Regla 80/20">
Enfócate en los 5-7 campos que realmente impactan la calidad de tu contacto. Más datos ≠ mejor contacto. Datos **relevantes** = mejor contacto.
</InsightCard>

---

## Construyendo el Agente de Enriquecimiento: Paso a Paso

<ProgressiveReveal title="El Flujo de Enriquecimiento de 6 Pasos" persistKey="custom-ai-agents-L5-flow">

<RevealSection title="Paso 1: Verificación de Email">

**Por qué importa:** El 15-25% de los emails en listas compradas/scrapeadas son inválidos. Enviar a ellos daña tu reputación como remitente.

**Cómo funciona:**

1. Verificar la sintaxis del email (validación regex)
2. Verificar que el dominio tiene registros MX (búsqueda DNS)
3. Comprobar contra dominios de email desechables conocidos
4. Opcionalmente: Verificación SMTP (arriesgado — puede activar filtros de spam)

**Herramientas:**

- **MillionVerifier** ($8/1K emails, 99% de precisión)
- **NeverBounce** ($8/1K emails)
- **Zerobounce** ($16/1K emails, incluye detección de trampas de spam)
- **Opción gratuita:** EmailListVerify (100 gratis/día)

**Campos de salida:**

- `email_status`: "valid" | "invalid" | "risky" | "unknown"
- `email_verified_date`: timestamp
- `verification_source`: "MillionVerifier"

**Fragmento de código (nodo HTTP Request de n8n):**

```javascript
// Llamada a la API de MillionVerifier
{
  "method": "GET",
  "url": "https://api.millionverifier.com/api/v3/",
  "qs": {
    "api": "YOUR_API_KEY",
    "email": "{{$json.email}}",
    "timeout": "10"
  }
}

// Análisis de la respuesta
{
  "email_status": "{{$json.result}}", // "ok", "invalid", "catch_all", "unknown"
  "email_verified_date": "{{$now}}",
  "verification_source": "MillionVerifier"
}
```

</RevealSection>

<RevealSection title="Paso 2: Enriquecimiento de Datos de Empresa">

**Por qué importa:** El tamaño de la empresa, la etapa y el stack tecnológico determinan el ajuste al ICP y los ángulos de personalización.

**Secuencia en cascada:**

1. **Apollo.io** (nivel gratuito: 10K búsquedas/mes)
   - Entrada: dominio de la empresa
   - Salida: número de empleados, industria, financiación, tecnologías
   - Cobertura: ~65%

2. **Clearbit** (si Apollo falla, $99/mes)
   - Entrada: dominio de la empresa
   - Salida: número de empleados, financiación, categoría, descripción
   - Cobertura: +20%

3. **Scraping de búsqueda de Google** (si ambos fallan, gratis pero lento)
   - Entrada: nombre de la empresa + "empleados" o "financiación"
   - Salida: número de empleados scrapeado de la página de empresa de LinkedIn
   - Cobertura: +10%

**Fragmento de código (flujo de trabajo de n8n):**

```javascript
// Nodo 1: Búsqueda de Empresa en Apollo
IF company_data is empty:
  HTTP Request → Apollo API
  Parse response → company_size, funding_stage, industry, tech_stack

// Nodo 2: Fallback de Clearbit (solo si Apollo falló)
IF company_size is still empty:
  HTTP Request → Clearbit Enrichment API
  Parse response → company_size, funding_stage

// Nodo 3: Fallback de Google (solo si ambos fallaron)
IF company_size is still empty:
  HTTP Request → Google Custom Search API
  Extract employee count from LinkedIn company page snippet
```

**Campos de salida:**

- `company_size`: entero (número de empleados)
- `funding_stage`: "Seed" | "Series A" | "Series B+" | "Bootstrapped" | "Public"
- `industry`: string
- `tech_stack`: array de strings (ej., ["Salesforce", "HubSpot"])
- `company_enriched_date`: timestamp

</RevealSection>

<RevealSection title="Paso 3: Enriquecimiento de Datos de Contacto">

**Por qué importa:** Las URLs de LinkedIn permiten el seguimiento de actividad. Los números de teléfono permiten el contacto multicanal. La zona horaria permite la optimización del tiempo de envío.

**Qué recopilar:**

1. **URL de LinkedIn**
   - Fuente: Apollo, Hunter o búsqueda de Google para "[Nombre] [Empresa] LinkedIn"
   - Validación: verificar que la URL devuelve 200, el perfil es público
   - Fallback: solicitud de búsqueda manual si la automatizada falla

2. **Número de Teléfono** (opcional, para prospectos de alto valor)
   - Fuente: Apollo (5 créditos móviles/mes en el nivel gratuito)
   - Caso de uso: solo para prospectos con puntuación ICP ≥8
   - Cumplimiento: verificar contra listas DNC si vas a llamar

3. **Zona Horaria**
   - Fuente: derivar de la ubicación de la sede de la empresa o la ubicación declarada del contacto
   - Herramienta: biblioteca `moment-timezone` o API de Zona Horaria de Google
   - Caso de uso: enviar emails a las 9am _en su_ hora, no en la tuya

**Fragmento de código:**

```javascript
// Buscador de URL de LinkedIn (Google Custom Search)
{
  "method": "GET",
  "url": "https://www.googleapis.com/customsearch/v1",
  "qs": {
    "key": "YOUR_API_KEY",
    "cx": "YOUR_SEARCH_ENGINE_ID",
    "q": "{{$json.name}} {{$json.company}} LinkedIn"
  }
}

// Extraer el primer resultado que contiene "linkedin.com/in/"
linkedin_url = results.items[0].link

// Detección de zona horaria
{
  "method": "GET",
  "url": "https://maps.googleapis.com/maps/api/timezone/json",
  "qs": {
    "location": "{{$json.company_hq_lat}},{{$json.company_hq_lng}}",
    "timestamp": "{{Math.floor(Date.now() / 1000)}}",
    "key": "YOUR_API_KEY"
  }
}

timezone = response.timeZoneId // ej., "America/New_York"
```

</RevealSection>

<RevealSection title="Paso 4: Recopilación de Señales de Actividad">

**Por qué importa:** La actividad reciente en LinkedIn = señal de engagement. La antigüedad en el trabajo = indicador de estabilidad/autoridad. Las noticias recientes de la empresa = evento disparador para el contacto.

**Qué recopilar:**

1. **Fecha de la Última Publicación en LinkedIn**
   - Fuente: scraping del perfil de LinkedIn (Phantombuster, Apify) o verificación manual
   - Frecuencia: verificar cada 30 días
   - Señal: publicó en los últimos 7 días = "activo," 30+ días = "inactivo"

2. **Antigüedad en el Trabajo**
   - Fuente: perfil de LinkedIn (fecha de inicio del rol actual)
   - Cálculo: `hoy - fecha_inicio`
   - Señal: &lt;6 meses = "nuevo en el rol," 2+ años = "establecido"

3. **Noticias Recientes de la Empresa**
   - Fuente: API de Google News, Crunchbase, RSS del blog de la empresa
   - Ventana de tiempo: últimos 30 días
   - Palabras clave: "financiación," "adquisición," "lanzamiento," "contratación," "expansión"

**Fragmento de código (API de Google News):**

```javascript
{
  "method": "GET",
  "url": "https://newsapi.org/v2/everything",
  "qs": {
    "q": "{{$json.company}}",
    "from": "{{$now.minus({days: 30}).toISODate()}}",
    "sortBy": "publishedAt",
    "apiKey": "YOUR_API_KEY"
  }
}

// Analizar los 3 primeros artículos
recent_news = response.articles.slice(0, 3).map(a => ({
  title: a.title,
  url: a.url,
  date: a.publishedAt
}))
```

</RevealSection>

<RevealSection title="Paso 5: Puntuación de Ajuste al ICP">

**Por qué importa:** No todos los contactos enriquecidos vale la pena contactarlos. Puntúalos para que priorices los mejores ajustes.

**Rúbrica de puntuación (ejemplo para SaaS B2B):**

| Criterio                           | Puntos | Lógica                                              |
| ---------------------------------- | ------ | --------------------------------------------------- |
| Tamaño de empresa en rango         | 3      | 10-500 empleados = 3, si no 0                       |
| Etapa de financiación coincide     | 2      | Seed/Serie A = 2, si no 0                           |
| Superposición de stack tecnológico | 2      | Usa 1+ de tus integraciones = 2                     |
| Evento disparador reciente         | 2      | Financiación/lanzamiento en los últimos 60 días = 2 |
| Título de tomador de decisiones    | 1      | VP/Director/Head = 1, si no 0                       |
| **Total**                          | **10** |                                                     |

**Fragmento de código:**

```javascript
let score = 0;

// Tamaño de empresa
if (company_size >= 10 && company_size <= 500) score += 3;

// Etapa de financiación
if (["Seed", "Series A"].includes(funding_stage)) score += 2;

// Superposición de stack tecnológico
const target_stack = ["Salesforce", "HubSpot", "Stripe"];
if (tech_stack.some((t) => target_stack.includes(t))) score += 2;

// Noticias recientes (financiación/lanzamiento)
if (recent_news.some((n) => n.title.match(/funding|launch|raises/i)))
  score += 2;

// Título
if (title.match(/VP|Director|Head|Chief/i)) score += 1;

// Guardar puntuación
icp_score = score;
priority = score >= 7 ? "High" : score >= 4 ? "Medium" : "Low";
```

</RevealSection>

<RevealSection title="Paso 6: Actualización del CRM y Notificación">

**Por qué importa:** El enriquecimiento es inútil si no fluye de vuelta a tu CRM y no dispara las siguientes acciones.

**Qué actualizar:**

1. **Todos los campos enriquecidos** (company_size, email_status, linkedin_url, etc.)
2. **Campos de metadatos**:
   - `last_enriched`: timestamp
   - `next_refresh`: timestamp (hoy + 90 días)
   - `enrichment_source`: "Apollo + MillionVerifier"
3. **Etiquetas**:
   - Nivel de prioridad: "Alta Prioridad" | "Prioridad Media" | "Baja Prioridad"
   - Marcadores de estado: "Email Inválido" | "Cambió de Trabajo" | "Datos Obsoletos"

**Qué notificar:**

- **Slack/Email:** Contactos de alta prioridad (puntuación ICP ≥8)
- **Slack/Email:** Emails inválidos o cambios de trabajo (para que puedas reemplazar/re-calificar)
- **Dashboard:** Resumen semanal (X contactos enriquecidos, Y de alta prioridad, Z problemas)

**Fragmento de código (actualización de CRM + notificación de Slack en n8n):**

```javascript
// Actualización del CRM (ejemplo de HubSpot)
{
  "method": "PATCH",
  "url": "https://api.hubapi.com/crm/v3/objects/contacts/{{$json.contact_id}}",
  "headers": {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  },
  "body": {
    "properties": {
      "company_size": "{{$json.company_size}}",
      "funding_stage": "{{$json.funding_stage}}",
      "email_status": "{{$json.email_status}}",
      "icp_score": "{{$json.icp_score}}",
      "last_enriched": "{{$now}}"
    }
  }
}

// Notificación de Slack (si es alta prioridad)
IF icp_score >= 8:
  {
    "method": "POST",
    "url": "https://slack.com/api/chat.postMessage",
    "headers": {
      "Authorization": "Bearer YOUR_SLACK_TOKEN"
    },
    "body": {
      "channel": "#sales-alerts",
      "text": "🎯 Prospecto de alto ajuste enriquecido: {{$json.name}} ({{$json.company}}) — Puntuación ICP: {{$json.icp_score}}/10"
    }
  }
```

</RevealSection>

</ProgressiveReveal>

---

## Costo y Economía de Tokens

<ScenarioSimulator
title="Calculadora de Costos de Enriquecimiento"
persistKey="custom-ai-agents-L5-cost-calc"
levers={[
{ id: "contacts", label: "Nuevos contactos por semana", min: 10, max: 500, step: 10, defaultValue: 50 },
{ id: "emailVerify", label: "Tasa de verificación de email (%)", min: 0, max: 100, step: 10, defaultValue: 100 },
{ id: "companyPaid", label: "% que necesita API de empresa de pago", min: 0, max: 50, step: 5, defaultValue: 20 }
]}
outputs={[
{ id: "emailCost", label: "Costo de verificación de email/semana", formula: "(contacts * (emailVerify / 100) * 0.008)", unit: "$", precision: 2 },
{ id: "companyCost", label: "Costo de datos de empresa/semana", formula: "(contacts * (companyPaid / 100) * 0.05)", unit: "$", precision: 2 },
{ id: "totalWeekly", label: "Costo semanal total", formula: "(emailCost + companyCost)", unit: "$", precision: 2 },
{ id: "totalMonthly", label: "Costo mensual total", formula: "(totalWeekly * 4)", unit: "$", precision: 2 }
]}
insight="Con `{contacts}` contactos/semana, tu enriquecimiento cuesta ~${totalMonthly}/mes. El nivel gratuito de Apollo (10K/mes) cubre {contacts \* 4} contactos, así que estás dentro del límite gratuito."
/>

**Principales impulsores de costo:**

| Servicio           | Nivel Gratuito      | Nivel de Pago       | Cuándo Actualizar                      |
| ------------------ | ------------------- | ------------------- | -------------------------------------- |
| Apollo.io          | 10K contactos/mes   | $49/mes (Ilimitado) | Cuando superes los 10K/mes             |
| MillionVerifier    | Ninguno             | $8/1K emails        | Siempre necesario para verificación    |
| Clearbit           | Ninguno             | $99/mes             | Solo si la cobertura de Apollo &lt;80% |
| API de Google News | 100 solicitudes/día | N/A                 | Suficiente para la mayoría             |

**Presupuesto para fundador solo:** $10-30/mes para enriquecimiento (principalmente verificación de email). El nivel gratuito de Apollo + MillionVerifier cubre el 90% de los casos de uso.

---

## Construyendo Tu Agente de Enriquecimiento

<InteractiveChecklist
title="Lista de Verificación de Construcción del Agente de Enriquecimiento"
persistKey="custom-ai-agents-L5-build-checklist"
items={[
"Define tu esquema de enriquecimiento (5-7 campos críticos)",
"Regístrate en Apollo.io (nivel gratuito) y MillionVerifier",
"Configura el flujo de trabajo de n8n: Disparador = Nuevo contacto en CRM",
"Configura la cascada: Apollo → Clearbit (si es necesario) → Google",
"Añade el paso de verificación de email (API de MillionVerifier)",
"Construye la lógica de puntuación ICP (rúbrica de 10 puntos)",
"Mapea los campos enriquecidos a las propiedades personalizadas del CRM",
"Configura la notificación de Slack para contactos de alta prioridad",
"Configura la actualización programada (semanal, para registros >90 días de antigüedad)",
"Prueba con 10 contactos de muestra y verifica la precisión"
]}
/>

### Construcción en Vivo: Flujo de Trabajo de Enriquecimiento en n8n

Construyamos el flujo de trabajo real juntos. Lo crearás en n8n (o adaptarás a Zapier/Make).

<TemplateBuilder
title="Especificación del Flujo de Trabajo de Enriquecimiento en n8n"
persistKey="custom-ai-agents-L5-workflow-spec"
sections={[
{
id: "trigger",
title: "Configuración del Disparador",
fields: [
{ id: "trigger_type", label: "Tipo de Disparador", placeholder: "Webhook, nuevo contacto en CRM, Programación", type: "text" },
{ id: "trigger_source", label: "Fuente", placeholder: "HubSpot, Pipedrive, Airtable", type: "text" }
]
},
{
id: "email_verify",
title: "Paso de Verificación de Email",
fields: [
{ id: "verify_service", label: "Servicio", placeholder: "MillionVerifier, NeverBounce", type: "text" },
{ id: "verify_threshold", label: "Confianza mínima", placeholder: "ej., 95%", type: "text" }
]
},
{
id: "company_enrich",
title: "Paso de Enriquecimiento de Empresa",
fields: [
{ id: "primary_source", label: "Fuente Principal", placeholder: "Apollo.io", type: "text" },
{ id: "fallback_source", label: "Fuente de Respaldo", placeholder: "Clearbit, Google", type: "text" },
{ id: "required_fields", label: "Campos Requeridos", placeholder: "company_size, funding_stage, industry", type: "textarea" }
]
},
{
id: "scoring",
title: "Lógica de Puntuación ICP",
fields: [
{ id: "size_range", label: "Tamaño de Empresa Objetivo", placeholder: "ej., 10-500 empleados", type: "text" },
{ id: "funding_stages", label: "Etapas de Financiación Objetivo", placeholder: "ej., Seed, Serie A", type: "text" },
{ id: "tech_stack", label: "Stack Tecnológico Objetivo", placeholder: "ej., Salesforce, HubSpot", type: "textarea" },
{ id: "high_score_threshold", label: "Umbral de Alta Prioridad", placeholder: "ej., 7/10", type: "text" }
]
},
{
id: "output",
title: "Configuración de Salida",
fields: [
{ id: "crm_fields", label: "Campos del CRM a Actualizar", placeholder: "company_size, icp_score, last_enriched", type: "textarea" },
{ id: "notification_channel", label: "Canal de Notificación", placeholder: "Slack, Email, Ninguno", type: "text" },
{ id: "notification_threshold", label: "Notificar cuando la Puntuación ICP ≥", placeholder: "ej., 8", type: "text" }
]
}
]}
/>

---

## Control de Calidad y Monitoreo

Los agentes de enriquecimiento pueden fallar silenciosamente. Necesitas monitoreo.

<ClassifyExercise
title="Clasifica Estos Fallos de Enriquecimiento"
persistKey="custom-ai-agents-L5-classify-failures"
categories={[
{ id: "data_source", label: "Problema de Fuente de Datos", color: "#ef4444" },
{ id: "logic_error", label: "Error de Lógica", color: "#f59e0b" },
{ id: "api_limit", label: "Límite de API Alcanzado", color: "#3b82f6" }
]}
items={[
{ id: "1", content: "Apollo devuelve 'empresa no encontrada' para el 40% de las búsquedas", correctCategory: "data_source" },
{ id: "2", content: "La puntuación ICP siempre es 0 incluso para contactos de ajuste perfecto", correctCategory: "logic_error" },
{ id: "3", content: "La verificación de email deja de funcionar después de 1,000 contactos", correctCategory: "api_limit" },
{ id: "4", content: "Las URLs de LinkedIn están rotas (errores 404)", correctCategory: "data_source" },
{ id: "5", content: "La zona horaria siempre es 'UTC' independientemente de la ubicación", correctCategory: "logic_error" }
]}
/>

### Lista de Verificación de Monitoreo Semanal

<InteractiveChecklist
title="Verificación de Salud Semanal del Enriquecimiento"
persistKey="custom-ai-agents-L5-health-check"
items={[
"Verificar la tasa de éxito del enriquecimiento (objetivo: >80%)",
"Revisar 10 registros enriquecidos aleatorios para verificar precisión",
"Verificar que la verificación de email se está ejecutando (comprobar fechas last_verified)",
"Verificar el uso de API vs límites (Apollo, MillionVerifier)",
"Revisar las notificaciones de contactos de alta prioridad (¿algún falso positivo?)",
"Verificar al azar las puntuaciones ICP contra la evaluación manual",
"Buscar registros duplicados creados por el enriquecimiento",
"Revisar los enriquecimientos fallidos (¿qué fuentes de datos fallaron?)",
"Actualizar la rúbrica de puntuación ICP si es necesario (según negocios cerrados)",
"Archivar o eliminar contactos con emails inválidos con más de 90 días de antigüedad"
]}
/>

---

## Modos de Fallo Comunes y Soluciones

<StrategyDuel
title="Fallo de Enriquecimiento: ¿Qué Salió Mal?"
persistKey="custom-ai-agents-L5-failure-duel"
scenario="Tu agente de enriquecimiento se ejecutó en 200 contactos. Solo 40 obtuvieron datos de empresa. ¿Cuál es la causa probable?"
strategyA={{
    name: "Problema de Cobertura de la Fuente de Datos",
    description: "Apollo no tiene datos para estas empresas (pequeñas/nuevas/internacionales)",
    pros: ["Causa más común", "Fácil de diagnosticar"],
    cons: ["Requiere añadir fuentes de respaldo"]
  }}
strategyB={{
    name: "Error de Configuración de API",
    description: "Tu clave de API es inválida o alcanzaste los límites de velocidad",
    pros: ["Fácil de solucionar una vez identificado"],
    cons: ["Menos común que las brechas de cobertura"]
  }}
expertVerdict="La cobertura de la fuente de datos es la causa #1. Apollo cubre ~65% de las empresas. Añade Clearbit o Google como respaldo para alcanzar el 85-90%."
/>

### Guía de Soluciones

| Síntoma                                              | Causa Probable                         | Solución                                                       |
| ---------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| &lt;50% de cobertura de datos de empresa             | Fuente de datos única (solo Apollo)    | Añadir Clearbit o respaldo de Google                           |
| Verificación de email siempre "unknown"              | Clave de API inválida o servicio caído | Verificar clave de API, probar con curl                        |
| Puntuaciones ICP todas 0 o todas 10                  | Lógica de puntuación rota              | Revisar código de puntuación, probar con contactos conocidos   |
| URLs de LinkedIn con errores 404                     | Scraping de datos antiguos/cacheados   | Volver a scrapear o usar el campo LinkedIn de Apollo           |
| Zona horaria siempre UTC                             | No se deriva de la ubicación           | Usar la API de Zona Horaria de Google con lat/lng              |
| El enriquecimiento se detiene después de N contactos | Límite de velocidad de API alcanzado   | Implementar limitación de velocidad o actualizar el plan       |
| Contactos duplicados creados                         | Webhook disparando dos veces           | Añadir verificación de deduplicación antes del enriquecimiento |

---

## Avanzado: Orquestación de Enriquecimiento con Múltiples Fuentes

Para fundadores técnicos que quieren máxima cobertura y precisión.

<DecisionTree
title="Selección de Fuente de Enriquecimiento"
persistKey="custom-ai-agents-L5-source-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "Nuevo contacto añadido. ¿Qué datos faltan?",
choices: [
{ label: "Solo email", nextNodeId: "email_only" },
{ label: "Solo datos de empresa", nextNodeId: "company_only" },
{ label: "Tanto email como empresa", nextNodeId: "both" }
]
},
{
id: "email_only",
content: "Ejecutar cascada de email: Apollo → Hunter → Snov. Cobertura: 75-90%.",
isTerminal: true,
outcome: "positive"
},
{
id: "company_only",
content: "Ejecutar cascada de empresa: Apollo → Clearbit → Google. Cobertura: 85-95%.",
isTerminal: true,
outcome: "positive"
},
{
id: "both",
content: "Ejecutar ambas cascadas en paralelo. Tiempo total: 5-10 segundos.",
isTerminal: true,
outcome: "positive"
}
]}
/>

### Patrón de Enriquecimiento en Paralelo (n8n)

En lugar de una cascada secuencial (lenta), ejecuta las fuentes en paralelo y fusiona los resultados.

**Pseudocódigo:**

```javascript
// Nodo 1: Dividir en ramas paralelas
[Nuevo Contacto] → [Dividir en 3 ramas]

// Rama A: Enriquecimiento de email
→ Búsqueda de email en Apollo
→ Búsqueda de email en Hunter (si Apollo falla)
→ Fusionar resultados

// Rama B: Enriquecimiento de empresa
→ Búsqueda de empresa en Apollo
→ Búsqueda de empresa en Clearbit (si Apollo falla)
→ Fusionar resultados

// Rama C: Enriquecimiento de actividad
→ Búsqueda en Google News
→ Scraping del perfil de LinkedIn (si la URL está disponible)
→ Fusionar resultados

// Nodo 2: Fusionar todas las ramas
[Fusionar A + B + C] → [Puntuación ICP] → [Actualización CRM] → [Notificación]
```

**Beneficio:** Reduce el tiempo total de enriquecimiento de 15-30 segundos (secuencial) a 5-10 segundos (paralelo).

---

## Tu Especificación del Agente de Enriquecimiento

Es momento de construir el tuyo.

<TemplateBuilder
title="Tu Especificación del Agente de Enriquecimiento de CRM"
persistKey="custom-ai-agents-L5-final-spec"
sections={[
{
id: "overview",
title: "Resumen del Agente",
fields: [
{ id: "name", label: "Nombre del Agente", placeholder: "ej., Agente de Enriquecimiento de CRM v1", type: "text" },
{ id: "purpose", label: "Propósito Principal", placeholder: "ej., Mantener los datos del CRM frescos y completos", type: "textarea" },
{ id: "trigger", label: "Disparador(es)", placeholder: "ej., Nuevo contacto añadido, Programación semanal", type: "text" }
]
},
{
id: "data_sources",
title: "Fuentes de Datos",
fields: [
{ id: "email_sources", label: "Fuentes de Enriquecimiento de Email", placeholder: "ej., Apollo (principal), Hunter (respaldo)", type: "textarea" },
{ id: "company_sources", label: "Fuentes de Enriquecimiento de Empresa", placeholder: "ej., Apollo, Clearbit, Google", type: "textarea" },
{ id: "activity_sources", label: "Fuentes de Señales de Actividad", placeholder: "ej., Google News, LinkedIn", type: "textarea" }
]
},
{
id: "enrichment_fields",
title: "Campos de Enriquecimiento (5-7 campos críticos)",
fields: [
{ id: "field_1", label: "Campo 1", placeholder: "ej., company_size", type: "text" },
{ id: "field_2", label: "Campo 2", placeholder: "ej., funding_stage", type: "text" },
{ id: "field_3", label: "Campo 3", placeholder: "ej., email_status", type: "text" },
{ id: "field_4", label: "Campo 4", placeholder: "ej., linkedin_url", type: "text" },
{ id: "field_5", label: "Campo 5", placeholder: "ej., icp_score", type: "text" }
]
},
{
id: "icp_scoring",
title: "Rúbrica de Puntuación ICP",
fields: [
{ id: "criterion_1", label: "Criterio 1 (puntos)", placeholder: "ej., Tamaño de empresa 10-500 (3 puntos)", type: "text" },
{ id: "criterion_2", label: "Criterio 2 (puntos)", placeholder: "ej., Etapa de financiación Seed/A (2 puntos)", type: "text" },
{ id: "criterion_3", label: "Criterio 3 (puntos)", placeholder: "ej., Superposición de stack tecnológico (2 puntos)", type: "text" },
{ id: "high_threshold", label: "Umbral de Alta Prioridad", placeholder: "ej., 7/10", type: "text" }
]
},
{
id: "output",
title: "Salida y Notificaciones",
fields: [
{ id: "crm_update", label: "Campos del CRM a Actualizar", placeholder: "Lista todos los campos", type: "textarea" },
{ id: "notification_channel", label: "Canal de Notificación", placeholder: "Slack, Email, Dashboard", type: "text" },
{ id: "notification_trigger", label: "Disparador de Notificación", placeholder: "ej., Puntuación ICP ≥8", type: "text" }
]
},
{
id: "quality_control",
title: "Control de Calidad",
fields: [
{ id: "monitoring_frequency", label: "Frecuencia de Monitoreo", placeholder: "ej., Revisión manual semanal de 10 registros", type: "text" },
{ id: "success_threshold", label: "Umbral de Éxito", placeholder: "ej., >80% de tasa de éxito en enriquecimiento", type: "text" },
{ id: "failure_handling", label: "Manejo de Fallos", placeholder: "ej., Etiquetar 'Enriquecimiento Fallido' y reintentar en 7 días", type: "textarea" }
]
}
]}
/>

---

## Resumen y Próximos Pasos

Has aprendido cómo construir un Agente de Enriquecimiento de CRM que:

✅ Rellena automáticamente los datos de contacto y empresa faltantes
✅ Verifica la entregabilidad del email antes de enviar
✅ Puntúa los prospectos para el ajuste al ICP
✅ Mantiene los datos frescos con actualizaciones programadas
✅ Cuesta $10-30/mes para la mayoría de los fundadores solos

<InsightCard icon="🚀" title="El Efecto Compuesto">
Cada semana que tu agente de enriquecimiento se ejecuta, tu CRM se vuelve más inteligente. Después de 3 meses, tendrás la base de datos de prospectos más rica y precisa de tu nicho — y apenas habrás movido un dedo.
</InsightCard>

<InteractiveChecklist
title="Tus Acciones a Tomar"
persistKey="custom-ai-agents-L5-actions"
items={[
"Completa tu Especificación del Agente de Enriquecimiento (usa la plantilla de arriba)",
"Regístrate en Apollo.io (nivel gratuito) y MillionVerifier",
"Construye tu primer flujo de trabajo de enriquecimiento en n8n (o equivalente en Zapier/Make)",
"Prueba con 10 contactos de muestra y verifica la precisión",
"Configura el monitoreo semanal (tasa de éxito, verificación al azar de 10 registros)",
"Configura las notificaciones de Slack para contactos de alta prioridad",
"Programa tu primera ejecución de actualización (para registros con >90 días de antigüedad)",
"Documenta tu rúbrica de puntuación ICP (la refinarás con el tiempo)"
]}
/>

**Próxima Lección:** Agente 4: Agente de Preparación de Reuniones — genera automáticamente documentos de preparación de 1 página 30 minutos antes de cada llamada de ventas.
