---
title: "El Pipeline de 5 Pasos: Descubrir → Enriquecer → Puntuar → Personalizar → Enviar"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 4
---

## El Error de $40K que Me Enseñó Arquitectura de Pipeline

Conoce a Alex, un fundador técnico que pasó 6 meses construyendo un sistema de enriquecimiento de leads impulsado por IA. Código hermoso. Arquitectura elegante. Un problema: **enriquecía a las personas equivocadas**.

El sistema de Alex:

1. Extraía de LinkedIn a "fundadores de startups"
2. Enriquecía a cada uno con más de 50 puntos de datos
3. Los puntuaba a todos como "alta intención"
4. Enviaba outreach personalizado a 500 personas por semana

¿El resultado? 0.3% de tasa de respuesta. $4,000 en costos de enriquecimiento. Y una reputación de dominio dañada permanentemente.

**¿Qué salió mal?** Alex construyó las etapas 2, 3, 4 y 5 del pipeline... pero se saltó la etapa 1 completamente. Sin criterios de descubrimiento. Sin filtro de ICP. Solo "más datos = mejores resultados".

La corrección tomó 2 semanas: Agregar una etapa de descubrimiento adecuada con filtros de ICP estrictos. De repente, el mismo sistema de enriquecimiento produjo tasas de respuesta del 8% y 12 reuniones calificadas en el primer mes.

**La lección:** La arquitectura del pipeline no se trata de tener las cinco etapas. Se trata de tenerlas **en el orden correcto, con los datos correctos fluyendo entre ellas**.

Hoy construyes esa arquitectura.

---

## Las Cinco Etapas (y Por qué el Orden Importa)

<FlipCard 
  front="¿Por qué no puedo simplemente enriquecer a todos y filtrar después?" 
  back="Porque el enriquecimiento cuesta dinero y tiempo. Enriquecer 10,000 prospectos de mal ajuste cuesta lo mismo que enriquecer 500 de ajuste perfecto — pero solo el segundo grupo convierte." 
/>

Piensa en tu pipeline como una línea de ensamblaje de manufactura. Cada etapa agrega valor, pero **solo si la entrada vale la pena procesar**.

Esto es lo que sucede en cada etapa:

### Etapa 1: Descubrir

**Entrada:** Tus criterios de ICP (del Curso 21)  
**Salida:** Lista de prospectos bruta (nombres, empresas, títulos)  
**Herramientas:** Búsqueda en Apollo, Sales Navigator, minería de comunidades, asistentes a eventos  
**Compuerta de calidad:** ¿Esta persona coincide con nuestro ICP? Si no, detenerse aquí.

### Etapa 2: Enriquecer

**Entrada:** Lista de prospectos bruta  
**Salida:** Perfiles enriquecidos (correo, teléfono, datos de empresa, stack tecnológico, señales)  
**Herramientas:** Enriquecimiento en cascada (Apollo → Hunter → Snov → Clay)  
**Compuerta de calidad:** ¿Encontramos un correo verificado? Si no, marcar para investigación manual o descartar.

### Etapa 3: Puntuar

**Entrada:** Perfiles enriquecidos  
**Salida:** Puntuación de ajuste 1-10 + tier de prioridad (A/B/C)  
**Herramientas:** Agente de puntuación de IA (Lección 6)  
**Compuerta de calidad:** ¿Puntuación ≥5? Si no, mover a cultivo o descalificar.

### Etapa 4: Personalizar

**Entrada:** Leads puntuados (solo Tier A + B)  
**Salida:** Primeras líneas personalizadas, propuestas de valor, ganchos de conversación  
**Herramientas:** Agente de investigación de IA (Lección 5) + prompts de personalización  
**Compuerta de calidad:** ¿Tenemos 2+ ganchos de personalización? Si no, usar variante de plantilla.

### Etapa 5: Enviar

**Entrada:** Leads personalizados  
**Salida:** Outreach secuenciado por correo, LinkedIn, llamadas  
**Herramientas:** Instantly, Smartlead o secuencias manuales  
**Compuerta de calidad:** ¿Pasó la verificación de entregabilidad? Si no, arreglar la infraestructura primero.

<InsightCard icon="⚡" title="El Efecto Multiplicador del Pipeline">
Cada etapa mejora la conversión en un 20-50%. Pero se componen. Una mejora del 30% en cada etapa = 3.7x de mejora total en la etapa 5.
</InsightCard>

---

## El Flujo de Datos: JSON como tu Lenguaje Común

La realidad de la tecnología de adquisición en 2026: **cada herramienta habla un idioma diferente**. Apollo exporta CSV. Clay produce JSON. Tu CRM quiere XML. Tu herramienta de outreach necesita un formato CSV específico.

¿La solución? **Diseña tu propio esquema de datos y traduce en los extremos**.

<TemplateBuilder
title="Tu Esquema de Datos de Leads"
persistKey="ai-lead-research-L4-schema"
sections={[
{
id: "core",
title: "Campos de Identidad Principal",
fields: [
{ id: "firstName", label: "Nombre", placeholder: "Sarah", type: "text" },
{ id: "lastName", label: "Apellido", placeholder: "Chen", type: "text" },
{ id: "email", label: "Correo", placeholder: "sarah@acme.com", type: "text" },
{ id: "company", label: "Nombre de la Empresa", placeholder: "Acme Corp", type: "text" }
]
},
{
id: "enrichment",
title: "Campos de Enriquecimiento (de la Etapa 2)",
fields: [
{ id: "title", label: "Título del Cargo", placeholder: "VP de Marketing", type: "text" },
{ id: "companySize", label: "Tamaño de Empresa", placeholder: "50-200", type: "text" },
{ id: "industry", label: "Industria", placeholder: "B2B SaaS", type: "text" },
{ id: "techStack", label: "Stack Tecnológico (separado por comas)", placeholder: "HubSpot, Salesforce, Slack", type: "text" }
]
},
{
id: "scoring",
title: "Campos de Puntuación (de la Etapa 3)",
fields: [
{ id: "fitScore", label: "Puntuación de Ajuste ICP (1-10)", placeholder: "8", type: "number" },
{ id: "priorityTier", label: "Tier de Prioridad", placeholder: "A", type: "text" }
]
},
{
id: "personalization",
title: "Campos de Personalización (de la Etapa 4)",
fields: [
{ id: "firstLine", label: "Primera Línea Personalizada", placeholder: "Vi que Acme acaba de cerrar su Serie A...", type: "textarea" },
{ id: "conversationHook", label: "Gancho de Conversación Principal", placeholder: "Anuncio de financiamiento reciente", type: "text" }
]
}
]}
/>

**Por qué importa:** Cuando controlas el esquema, puedes cambiar herramientas sin reconstruir todo tu pipeline. ¿Apollo se vuelve demasiado caro? Cambia a Hunter. ¿Clay cambia los precios? Construye tu propio flujo en n8n. La estructura de datos permanece igual.

<ExampleCard label="Esquema Real: Fundador de SaaS B2B">
```json
{
  "id": "lead_001",
  "first_name": "Sarah",
  "last_name": "Chen",
  "email": "sarah@acme.com",
  "email_verified": true,
  "phone": "+1-555-0123",
  "title": "VP of Marketing",
  "company": "Acme Corp",
  "company_domain": "acme.com",
  "company_size": "50-200",
  "industry": "B2B SaaS",
  "tech_stack": ["HubSpot", "Salesforce", "Slack"],
  "location": "San Francisco, CA",
  "linkedin_url": "linkedin.com/in/sarahchen",
  "recent_funding": true,
  "funding_amount": "$5M Series A",
  "job_changed_90d": false,
  "icp_fit_score": 8,
  "signal_score": 3,
  "friction_score": -1,
  "total_score": 10,
  "priority_tier": "A",
  "first_line": "Vi que Acme acaba de cerrar su Serie A — felicidades por los $5M...",
  "conversation_hook": "Financiamiento Serie A + migración a HubSpot",
  "enrichment_source": "clay_waterfall",
  "enriched_at": "2026-02-24T10:30:00Z",
  "personalized_at": "2026-02-24T10:35:00Z"
}
```
</ExampleCard>

---

## Etapa 1: Descubrimiento (Encontrando los 500 Correctos)

La mayoría de los fundadores hacen esto al revés. Piensan: "Enriqueceré una lista enorme, luego filtro por calidad."

**Incorrecto.** El enriquecimiento cuesta dinero. Filtrar no cuesta nada.

<RangeSlider 
  label="¿Cuántos prospectos quieres enriquecer por mes?" 
  min={100} 
  max={5000} 
  step={100}
  lowLabel="100" 
  highLabel="5,000" 
  persistKey="ai-lead-research-L4-volume" 
/>

Las matemáticas:

- **100-500/mes:** Perfecto para fundadores solos. Permite personalización profunda. Costo: $50-150/mes.
- **500-1,500/mes:** Bueno para equipos pequeños o juegos de alto volumen. Costo: $150-400/mes.
- **1,500-5,000/mes:** Requiere automatización + presupuesto. Costo: $400-1,200/mes.

**Fuentes de descubrimiento clasificadas por calidad:**

<ClassifyExercise
title="Clasifica Estas Fuentes de Descubrimiento"
persistKey="ai-lead-research-L4-sources"
categories={[
{ id: "high", label: "Alta Calidad (ajuste estrecho al ICP)", color: "#10b981" },
{ id: "medium", label: "Calidad Media (necesita filtrado)", color: "#f59e0b" },
{ id: "low", label: "Baja Calidad (demasiado amplio)", color: "#ef4444" }
]}
items={[
{ id: "1", content: "Búsqueda en Sales Navigator con 5+ filtros (título, tamaño, industria, ubicación, stack tecnológico)", correctCategory: "high" },
{ id: "2", content: "Búsqueda en Apollo con 3 filtros (título, industria, tamaño de empresa)", correctCategory: "medium" },
{ id: "3", content: "Interacción con publicaciones de LinkedIn (personas que dieron me gusta a tu contenido)", correctCategory: "medium" },
{ id: "4", content: "Lista de correos comprada a un broker", correctCategory: "low" },
{ id: "5", content: "Lista de asistentes de una conferencia de nicho", correctCategory: "high" },
{ id: "6", content: "Extracción de 'fundadores de startups' de Crunchbase sin filtros", correctCategory: "low" },
{ id: "7", content: "Miembros de una comunidad que respondieron una pregunta específica", correctCategory: "high" },
{ id: "8", content: "Búsqueda en Google de 'VP Marketing empresa SaaS'", correctCategory: "low" }
]}
/>

**La jerarquía de calidad de descubrimiento:**

1. **Tier 1 (Mejor):** Presentaciones cálidas, asistentes a eventos, miembros de comunidades que interactuaron con tu contenido
2. **Tier 2 (Bueno):** Sales Nav con 5+ filtros, Apollo con puntuación de ICP, listas de revisores de G2
3. **Tier 3 (Aceptable):** Búsquedas amplias en Apollo/LinkedIn con filtrado manual
4. **Tier 4 (Evitar):** Listas compradas, datos extraídos, bases de datos de "spray and pray"

<InsightCard icon="🎯" title="La Regla 80/20 del Descubrimiento">
Dedica el 80% de tu tiempo a fuentes de Tier 1-2. Producirán el 80% de tus reuniones. El Tier 3 es relleno. Nunca uses el Tier 4.
</InsightCard>

---

## Etapa 2: Enriquecimiento (La Cascada que Construiste en la Lección 3)

Ya aprendiste el enriquecimiento en cascada. Ahora lo estás conectando al pipeline.

**Punto de decisión clave:** ¿Enriqueces a todos desde el descubrimiento, o filtras primero?

<SwipeDecision
title="¿Enriquecer Ahora o Filtrar Primero?"
description="Desliza a la derecha para enriquecer de inmediato, a la izquierda para filtrar primero"
optionA="Filtrar Primero"
optionB="Enriquecer Ahora"
persistKey="ai-lead-research-L4-enrich-timing"
cards={[
{
id: "1",
content: "Tienes 5,000 leads brutos de una búsqueda amplia en Apollo. Presupuesto: $200/mes.",
correctOption: "a",
explanation: "Filtra primero a 500 leads de alto ajuste. Enriquecer 5,000 costaría $350-700."
},
{
id: "2",
content: "Tienes 200 leads de una conferencia de nicho. Todos coinciden con tu ICP.",
correctOption: "b",
explanation: "Enriquece de inmediato. Ya están pre-calificados. Costo de enriquecimiento: ~$70-140."
},
{
id: "3",
content: "Extrajiste 10,000 'fundadores' de LinkedIn sin otros filtros.",
correctOption: "a",
explanation: "Filtra a menos de 1,000 usando título, tamaño de empresa, industria. Luego enriquece."
},
{
id: "4",
content: "Tienes 50 presentaciones cálidas de tu red.",
correctOption: "b",
explanation: "Enriquece los 50. Las presentaciones cálidas son oro. Costo: ~$17-35."
}
]}
/>

**Lista de verificación de salida de la etapa de enriquecimiento:**

- ✅ Correo verificado (90%+ de entregabilidad)
- ✅ Título del cargo y empresa
- ✅ Tamaño de empresa e industria
- ✅ Al menos 1 campo de señal (stack tecnológico, financiamiento, cambio de trabajo, contratación)
- ✅ URL de LinkedIn (para investigación manual si es necesario)

**Qué hacer con los enriquecimientos fallidos:**

- No se encontró correo → Mover a cola de "investigación manual" o descartar
- Correo encontrado pero no verificado → Ejecutar en MillionVerifier antes de enviar
- Datos de empresa faltantes → Marcar para búsqueda manual (toma 2 minutos)

---

## Etapa 3: Puntuación (Separando los 8s de los 3s)

Aquí es donde la mayoría de los fundadores pierden más tiempo. Tratan todos los leads por igual.

**La realidad:** Un lead con puntuación 8 vale 10 veces más atención que uno con puntuación 3. Pero no sabrás cuál es cuál sin puntuar.

<ScenarioSimulator
title="Matemáticas del Pipeline: Cómo la Puntuación Cambia Todo"
persistKey="ai-lead-research-L4-scoring-math"
levers={[
{ id: "totalLeads", label: "Total de leads enriquecidos", min: 100, max: 1000, step: 50, defaultValue: 500 },
{ id: "tierAPercent", label: "% con puntuación 8-10 (Tier A)", min: 5, max: 30, step: 5, defaultValue: 15 },
{ id: "tierBPercent", label: "% con puntuación 5-7 (Tier B)", min: 30, max: 60, step: 5, defaultValue: 45 }
]}
outputs={[
{ id: "tierA", label: "Leads Tier A (outreach manual)", formula: "totalLeads * (tierAPercent / 100)", unit: "", precision: 0 },
{ id: "tierB", label: "Leads Tier B (secuencia automatizada)", formula: "totalLeads * (tierBPercent / 100)", unit: "", precision: 0 },
{ id: "tierC", label: "Leads Tier C (cultivo o descarte)", formula: "totalLeads - (totalLeads * (tierAPercent / 100)) - (totalLeads * (tierBPercent / 100))", unit: "", precision: 0 }
]}
insight="Con {tierA} leads Tier A obteniendo 30% de tasas de respuesta y {tierB} leads Tier B obteniendo 8%, estás mirando ~{tierA _ 0.3 + tierB _ 0.08} respuestas totales por mes."
/>

**Criterios de puntuación (vista previa de la Lección 6):**

**AJUSTE (0-4 puntos):**

- +1 si la industria coincide con tu ICP
- +1 si el título coincide (tomador de decisiones o influenciador)
- +1 si el tamaño de empresa coincide
- +1 si el stack tecnológico incluye herramientas relevantes

**SEÑAL (0-4 puntos):**

- +1 si cambió de trabajo en los últimos 90 días
- +1 si la empresa levantó financiamiento en los últimos 6 meses
- +1 si la empresa está contratando para roles relevantes
- +1 si interactuó recientemente con un competidor o contenido relevante

**FRICCIÓN (0 a -2 puntos):**

- -1 si el ciclo de venta es enterprise (6+ meses)
- -1 si la compra es por comité (3+ partes interesadas)

**Puntuación total = AJUSTE + SEÑAL - FRICCIÓN (acotado a 1-10)**

<ProgressiveReveal title="El Prompt del Agente de Puntuación (Vista Previa)" persistKey="ai-lead-research-L4-scoring-reveal">
<RevealSection title="Plantilla de Prompt del Sistema">
```
Eres un agente de puntuación de leads para [TU EMPRESA]. Puntúa cada prospecto del 1 al 10 según tres dimensiones:

AJUSTE (0-4 puntos):
+1 si la industria coincide: [TUS INDUSTRIAS]
+1 si el título coincide: [TUS TÍTULOS]
+1 si el tamaño de empresa coincide: [TU RANGO DE TAMAÑO]
+1 si el stack tecnológico incluye: [TUS SEÑALES DE TECH]

SEÑAL (0-4 puntos):
+1 si cambió de trabajo en los últimos 90 días
+1 si la empresa levantó financiamiento en los últimos 6 meses
+1 si la empresa está contratando para [ROLES RELEVANTES]
+1 si interactuó recientemente con [CONTENIDO/COMPETIDORES RELEVANTES]

FRICCIÓN (0 a -2 puntos):
-1 si el ciclo de venta es enterprise (>6 meses típico)
-1 si la compra es por comité (>3 partes interesadas)

TOTAL = AJUSTE + SEÑAL - FRICCIÓN (acotar a 1-10)

FORMATO DE SALIDA:
{
"fit_score": 3,
"signal_score": 2,
"friction_score": -1,
"total_score": 4,
"priority_tier": "B",
"reasoning": "Buen ajuste en industria y título, señal de financiamiento reciente, pero la compra por comité agrega fricción."
}

UMBRALES DE TIER:
8-10 = Tier A (outreach personal inmediato)
5-7 = Tier B (secuencia automatizada)
1-4 = Tier C (cultivo o descalificar)

```
</RevealSection>

<RevealSection title="Cómo Usarlo en Clay">
1. Agrega un tipo de columna "AI"
2. Pega el prompt del sistema de arriba (personalizado para tu ICP)
3. Referencia las columnas de enriquecimiento como entrada: `{{title}}`, `{{company_size}}`, `{{tech_stack}}`
4. Configura la salida para parsear JSON
5. Ejecuta en toda la tabla — puntúa 500 leads en ~2 minutos
</RevealSection>

<RevealSection title="Cómo Usarlo en n8n">
1. Agrega un nodo "OpenAI" o "Anthropic"
2. Configura el mensaje del sistema con el prompt de arriba
3. Configura el mensaje del usuario como: "Puntúa este lead: [JSON de datos enriquecidos]"
4. Parsea la respuesta JSON
5. Escribe puntuaciones de vuelta a tu hoja de cálculo o CRM
</RevealSection>
</ProgressiveReveal>

---

## Etapa 4: Personalización (Convirtiendo Datos en Conversación)

Tienes un lead puntuado. ¿Y ahora?

**La jerarquía de personalización:**

<ComparisonBuilder
  title="Escribe una Primera Línea Personalizada"
  persistKey="ai-lead-research-L4-personalization"
  prompt="Escribe una primera línea personalizada para este prospecto: Sarah Chen, VP de Marketing en Acme Corp (SaaS B2B, 50-200 empleados, acaba de levantar $5M en Serie A, usa HubSpot)"
  expertExample="Vi que Acme acaba de cerrar su Serie A — felicidades por los $5M. La mayoría de los VPs con los que hablo en tu posición están repensando su stack de MarTech post-financiamiento. ¿Tienes curiosidad por saber si estás evaluando nuevas herramientas para la próxima etapa?"
  criteria={[
    "Hace referencia a un evento específico y reciente (financiamiento)",
    "Conecta el evento con el probable punto de dolor (evaluación de MarTech)",
    "Termina con una pregunta de baja fricción",
    "Evita frases genéricas como 'quería ponerme en contacto'"
  ]}
/>

**Fuentes de personalización (clasificadas por impacto):**

1. **Tier 1 (Mayor Impacto):** Financiamiento reciente, cambio de trabajo, lanzamiento de empresa, premio/reconocimiento
2. **Tier 2 (Alto Impacto):** Publicación/comentario en LinkedIn, contratación reciente, lanzamiento de nuevo producto
3. **Tier 3 (Impacto Medio):** Coincidencia de stack tecnológico, conexión mutua, interés compartido
4. **Tier 4 (Bajo Impacto):** Descripción de la empresa, tendencia de la industria, elogio genérico

**El flujo de trabajo del agente de investigación de IA (de la Lección 5):**

```

Entrada: JSON del lead enriquecido
↓
Agente de Investigación de IA:

- Extrae el sitio web de la empresa
- Verifica publicaciones recientes en LinkedIn
- Busca noticias sobre el nombre de la empresa
- Identifica 3+ ganchos de conversación
  ↓
  Salida: Resumen de investigación con ángulos de personalización
  ↓
  Agente de Personalización de IA:
- Genera 3 variantes de primera línea
- Puntúa cada una por especificidad y relevancia
- Selecciona la mejor variante
  ↓
  Salida: Primera línea personalizada + gancho de conversación

```

<MiniRoleplay
  scenario="Estás personalizando outreach para un VP de Ventas que acaba de publicar en LinkedIn sobre dificultades con la visibilidad del pipeline."
  role="Escribe tu primera línea"
  persistKey="ai-lead-research-L4-roleplay"
  modelResponse="Vi tu publicación sobre los desafíos de visibilidad del pipeline — es la queja #1 que escucho de VPs en tu etapa. La mayoría lo resuelven con [enfoque específico]. ¿Sería útil una llamada de 10 minutos para comparar notas?"
/>

---

## Etapa 5: Enviar (Secuenciación y Multi-Canal)

Descubriste, enriqueciste, puntuaste y personalizaste. Ahora envías.

**Pero no todo a la vez.**

<SlideNavigation>
<Slide title="Tier A: Manual, Alto Contacto">
**Volumen:** 50-100/mes
**Enfoque:** El fundador envía personalmente
**Canales:** Correo + DM de LinkedIn + (opcional) llamada
**Secuencia:**
- Día 1: Correo con personalización profunda
- Día 3: Solicitud de conexión en LinkedIn (si no están conectados)
- Día 5: DM de LinkedIn haciendo referencia al correo
- Día 8: Correo de seguimiento con nuevo valor
- Día 12: Intento de llamada (si hay número de teléfono disponible)

**Tasa de respuesta esperada:** 20-40%
</Slide>

<Slide title="Tier B: Automatizado, Personalizado">
**Volumen:** 200-400/mes
**Enfoque:** Secuencia automatizada con personalización de IA
**Canales:** Correo principal, LinkedIn secundario
**Secuencia:**
- Día 1: Correo con primera línea generada por IA
- Día 4: Correo de seguimiento (ángulo diferente)
- Día 7: Conexión en LinkedIn (si no están conectados)
- Día 10: Correo final (ruptura o valor agregado)

**Tasa de respuesta esperada:** 8-15%
</Slide>

<Slide title="Tier C: Cultivo o Descalificación">
**Volumen:** 100-200/mes
**Enfoque:** Agregar al newsletter o descartar
**Canales:** Solo newsletter por correo
**Secuencia:**
- Agregar al newsletter semanal
- Re-puntuar trimestralmente (las señales pueden cambiar)
- Si la puntuación mejora a 5+, mover al Tier B

**Tasa de respuesta esperada:** 1-3%
</Slide>
</SlideNavigation>

**Reglas de secuenciación multi-canal:**
- ✅ Correo primero, siempre (menos intrusivo)
- ✅ Conexión de LinkedIn dentro de 3-7 días (si es relevante)
- ✅ DM de LinkedIn solo después de aceptar la conexión
- ❌ Nunca llamar sin correo previo (a menos que sea una presentación cálida)
- ❌ Nunca enviar más de 1 mensaje por canal por semana

<InsightCard icon="📊" title="El Efecto Compuesto de una Secuenciación Correcta">
Un solo correo a 500 personas = 15-25 respuestas (tasa del 3-5%).
Secuencia de 5 pasos a 500 personas = 75-125 respuestas (tasa del 15-25%).
El mismo esfuerzo. 5x resultados.
</InsightCard>

---

## Juntando Todo: Tu Plano del Pipeline

Hora de diseñar tu pipeline completo.

<TemplateBuilder
  title="Tu Plano del Pipeline de 5 Pasos"
  persistKey="ai-lead-research-L4-blueprint"
  sections={[
    {
      id: "discovery",
      title: "Etapa 1: Descubrimiento",
      fields: [
        { id: "source", label: "Fuente principal de descubrimiento", placeholder: "Búsqueda en Sales Navigator", type: "text" },
        { id: "filters", label: "Filtros de ICP aplicados", placeholder: "Título: VP/Director, Tamaño: 50-500, Industria: SaaS B2B", type: "textarea" },
        { id: "volume", label: "Volumen objetivo por mes", placeholder: "500", type: "number" }
      ]
    },
    {
      id: "enrichment",
      title: "Etapa 2: Enriquecimiento",
      fields: [
        { id: "tool", label: "Herramienta principal de enriquecimiento", placeholder: "Cascada en Clay", type: "text" },
        { id: "sources", label: "Fuentes en cascada (en orden)", placeholder: "Apollo → Hunter → Snov.io", type: "text" },
        { id: "budget", label: "Presupuesto mensual de enriquecimiento", placeholder: "$150", type: "text" }
      ]
    },
    {
      id: "scoring",
      title: "Etapa 3: Puntuación",
      fields: [
        { id: "fitCriteria", label: "Criterios de ajuste (3-5 ítems)", placeholder: "Coincidencia de industria, título, tamaño, stack tecnológico", type: "textarea" },
        { id: "signals", label: "Señales clave a detectar", placeholder: "Cambio de trabajo, financiamiento, contratación, adopción tecnológica", type: "textarea" },
        { id: "tierAThreshold", label: "Umbral Tier A (puntuación)", placeholder: "8", type: "number" }
      ]
    },
    {
      id: "personalization",
      title: "Etapa 4: Personalización",
      fields: [
        { id: "researchDepth", label: "Profundidad de investigación para Tier A", placeholder: "Investigación completa de IA + revisión manual", type: "text" },
        { id: "researchDepthB", label: "Profundidad de investigación para Tier B", placeholder: "Solo investigación de IA", type: "text" },
        { id: "hookSources", label: "Top 3 fuentes de personalización", placeholder: "Financiamiento reciente, publicaciones de LinkedIn, stack tecnológico", type: "textarea" }
      ]
    },
    {
      id: "send",
      title: "Etapa 5: Enviar",
      fields: [
        { id: "tierASequence", label: "Secuencia Tier A (¿manual o automatizada?)", placeholder: "Manual, secuencia de 5 toques", type: "text" },
        { id: "tierBSequence", label: "Secuencia Tier B", placeholder: "Automatizada, secuencia de 4 toques", type: "text" },
        { id: "channels", label: "Canales utilizados", placeholder: "Correo + LinkedIn", type: "text" }
      ]
    }
  ]}
/>

**Métricas de salud del pipeline a rastrear:**

| Métrica | Objetivo | Qué te Dice |
|--------|--------|-------------------|
| Conversión Descubrimiento → Enriquecimiento | 80%+ | ¿Son suficientemente estrictos tus filtros de descubrimiento? |
| Enriquecimiento → Correo verificado | 70%+ | ¿Está funcionando tu cascada? |
| % Tier A del total | 10-20% | ¿Estás encontrando suficientes leads de alto ajuste? |
| Tasa de respuesta Tier A | 20-40% | ¿Está funcionando tu personalización? |
| Tasa de respuesta Tier B | 8-15% | ¿Es precisa tu puntuación de ICP? |
| Costo por reunión calificada | Menos de $50 | ¿Es eficiente tu pipeline? |

---

## La Decisión de Construir vs. Comprar (Clay vs. n8n vs. Manual)

Tienes tres opciones para construir este pipeline:

<StrategyDuel
  title="Clay vs. n8n vs. Hojas de Cálculo Manuales"
  persistKey="ai-lead-research-L4-build-buy"
  scenario="Quieres procesar 500 leads por mes a través del pipeline completo de 5 pasos."
  strategyA={{
    name: "Clay (Comprar)",
    description: "Usar la cascada incorporada de Clay, columnas de IA e integraciones",
    pros: ["Configuración más rápida (2-3 horas)", "75+ fuentes de datos incorporadas", "Investigación de IA + puntuación en una plataforma", "Excelente para fundadores no técnicos"],
    cons: ["$149-349/mes", "Los precios basados en créditos pueden ser impredecibles", "Menos personalización que el código"]
  }}
  strategyB={{
    name: "n8n (Construir)",
    description: "Construir flujos de trabajo personalizados con n8n + APIs",
    pros: ["$0-20/mes (auto-alojado o cloud starter)", "Control total sobre la lógica", "Puede integrar cualquier API", "Configuración única, sin costos por lead"],
    cons: ["Requiere habilidades técnicas", "10-20 horas de configuración inicial", "Debes mantener los flujos de trabajo tú mismo"]
  }}
  strategyC={{
    name: "Manual (Hojas de Cálculo)",
    description: "Google Sheets + enriquecimiento manual + ChatGPT para puntuación",
    pros: ["$0/mes (solo suscripciones a herramientas)", "Control completo", "Aprende cada paso en profundidad"],
    cons: ["30-60 minutos por 100 leads", "Propenso a errores", "No escala más allá de 200-300/mes"]
  }}
  expertVerdict="Para fundadores solos: Empieza manual con tus primeros 100 leads para aprender el proceso. Luego elige Clay si valoras el tiempo sobre el dinero, o n8n si eres técnico y quieres optimizar costos. Nunca te quedes en manual más allá de 300 leads/mes — el costo de tiempo te mata."
/>

**Cuándo elegir cada uno:**

- **Clay:** No eres técnico, el presupuesto es $150-350/mes, quieres moverte rápido
- **n8n:** Eres técnico, el presupuesto es menos de $100/mes, quieres control total
- **Manual:** Estás aprendiendo, procesas menos de 200 leads/mes, el presupuesto es menos de $50/mes

---

## Tus Elementos de Acción

<InteractiveChecklist
  title="Construye Tu Pipeline Esta Semana"
  persistKey="ai-lead-research-L4-actions"
  items={[
    "Define tu fuente de descubrimiento y filtros de ICP (usa Sales Navigator o Apollo)",
    "Configura tu enriquecimiento en cascada (Clay o manual Apollo → Hunter → Snov)",
    "Crea tu esquema de datos de leads (usa el template builder arriba)",
    "Escribe tus criterios de puntuación (ajuste, señal, fricción) y prueba en 10 leads pasados",
    "Diseña tus secuencias Tier A y Tier B (5 toques y 4 toques)",
    "Procesa tus primeros 50 leads a través del pipeline completo y mide la conversión en cada etapa",
    "Calcula tu costo por reunión calificada y optimiza la etapa más costosa"
  ]}
/>

---

## Qué Sigue

Ahora tienes la arquitectura. Pero la arquitectura sin ejecución es solo un diagrama.

**Próxima lección:** Estás construyendo el Agente de Investigación de Prospectos — la IA que convierte nombres brutos de empresas en resúmenes de investigación ricos y personalizados en 60 segundos.

**Lección 6:** Estás construyendo el Agente de Puntuación de ICP — la IA que puntúa 500 leads en 2 minutos con más del 85% de precisión.

**Para la Lección 10:** Tendrás un pipeline completamente automatizado que procesa 500+ leads por mes, con la IA haciendo el 90% del trabajo y tú enfocándote en el 10% que importa — hablar con los prospectos del Tier A.

El pipeline es tu sistema. Los agentes son tu equipo. Construyamos ambos.
```
