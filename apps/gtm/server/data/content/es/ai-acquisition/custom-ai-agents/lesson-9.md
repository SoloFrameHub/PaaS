---
title: "Economía de Tokens y Costos Operativos"
duration: "45 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 9
---

Construiste 5 agentes. Funcionan. Tu agente de investigación de prospectos corre cada vez que un nuevo contacto llega a tu CRM. Tu redactor de emails escupe 3 variantes por prospecto. Tu agente de preparación de reuniones se dispara 30 minutos antes de cada llamada.

Luego revisas tu factura de OpenAI.

**$847.32.**

Por un mes.

Estás procesando 200 prospectos a la semana. Son 800 briefs de investigación, 2,400 borradores de emails, 40 docs de preparación de reuniones, más el enriquecimiento del CRM y los resúmenes post-llamada. A $0.50-1.00 por brief de investigación con GPT-4o, la matemática se pone fea rápido.

Este es el momento en que la mayoría de los solopreneurs se dan cuenta: **los agentes de IA no son gratis para ejecutar.** Y si no tienes cuidado, pueden costar más que los ingresos que generan.

Esta lección trata sobre la economía que nadie menciona en los tutoriales de "construye un agente de IA en 10 minutos". Vamos a calcular tus costos reales de operación, optimizar tu gasto en tokens y diseñar una estructura de costos que escale con los ingresos — no en su contra.

---

## La Verificación de Realidad de la Economía de Tokens

<InsightCard icon="💸" title="El Costo Oculto">
La mayoría de los solopreneurs subestiman los costos de operación de IA en un 3-5x en su primer mes. Un presupuesto asumido de $200/mes se convierte en $600-1,000 cuando los agentes corren a volumen de producción.
</InsightCard>

Esto es lo que realmente impulsa los costos:

**1. Volumen de Tokens de Entrada** — Cada vez que llamas a un LLM, pagas por el contexto que envías. Un agente de investigación de prospectos podría enviar:

- 500 tokens de datos del prospecto (LinkedIn, info de empresa)
- 800 tokens de instrucciones y plantillas
- 300 tokens de criterios ICP y ejemplos
- **Total: ~1,600 tokens de entrada por llamada**

**2. Volumen de Tokens de Salida** — También pagas por lo que el modelo genera:

- Brief de investigación: ~800 tokens
- Borradores de email (3 variantes): ~900 tokens total
- Doc de preparación de reunión: ~1,200 tokens
- **Estos se suman rápido**

**3. Elección de Modelo** — El diferencial de precios es enorme:

<FlipCard 
  front="GPT-4o vs Claude Haiku" 
  back="GPT-4o: $5/1M tokens entrada, $15/1M salida. Claude Haiku: $0.25/1M entrada, $1.25/1M salida. Eso es una diferencia de 20x para calidad similar en tareas estructuradas." 
/>

**4. Frecuencia de Llamadas** — ¿Con qué frecuencia corren tus agentes?

- Agente de investigación: una vez por nuevo contacto
- Redactor de emails: 3-5 veces por prospecto (secuencia)
- Enriquecimiento del CRM: actualización semanal para contactos activos
- Preparación de reuniones: una vez por llamada programada

Calculemos tus costos reales.

---

## Calcula Tu Gasto Mensual de Tokens

<ScenarioSimulator
title="Calculadora de Costos de Agentes de IA"
persistKey="custom-ai-agents-L9-cost-calc"
levers={[
{ id: "newContacts", label: "Nuevos contactos por semana", min: 10, max: 500, step: 10, defaultValue: 50 },
{ id: "emailsPerContact", label: "Borradores de email por contacto", min: 1, max: 10, step: 1, defaultValue: 5 },
{ id: "meetingsPerWeek", label: "Reuniones por semana", min: 1, max: 30, step: 1, defaultValue: 5 },
{ id: "model", label: "Modelo principal", options: [
{ value: "gpt4o", label: "GPT-4o", inputCost: 5, outputCost: 15 },
{ value: "gpt4omini", label: "GPT-4o-mini", inputCost: 0.15, outputCost: 0.6 },
{ value: "sonnet", label: "Claude Sonnet 4", inputCost: 3, outputCost: 15 },
{ value: "haiku", label: "Claude Haiku", inputCost: 0.25, outputCost: 1.25 }
], defaultValue: "gpt4o" }
]}
outputs={[
{
id: "researchCost",
label: "Agente de investigación (mensual)",
formula: "(newContacts * 4) * (1600 * model.inputCost + 800 * model.outputCost) / 1000000",
unit: "$",
precision: 2
},
{
id: "emailCost",
label: "Redactor de emails (mensual)",
formula: "(newContacts * 4 * emailsPerContact) * (1500 * model.inputCost + 300 * model.outputCost) / 1000000",
unit: "$",
precision: 2
},
{
id: "meetingCost",
label: "Preparación de reuniones (mensual)",
formula: "(meetingsPerWeek * 4) * (2000 * model.inputCost + 1200 * model.outputCost) / 1000000",
unit: "$",
precision: 2
},
{
id: "totalCost",
label: "Costo mensual total",
formula: "researchCost + emailCost + meetingCost",
unit: "$",
precision: 2
}
]}
insight="Con {newContacts} contactos/semana usando `{model.label}`, estás gastando ${totalCost}/mes. Si cada contacto convierte al 2% en un deal de $5K, necesitas {(totalCost / (newContacts _ 4 _ 0.02 _ 5000) _ 100).toFixed(1)}% de los ingresos en costos de IA."
/>

<ExampleCard label="Números Reales: La Agencia de Sarah">
Sarah dirige una agencia de contenido. Procesa 80 nuevos contactos/semana, envía secuencias de 5 emails y tiene 8 reuniones/semana.

**Configuración inicial (GPT-4o para todo):**

- Investigación: $64/mes
- Borradores de email: $240/mes
- Preparación de reuniones: $19/mes
- **Total: $323/mes**

**Después de optimizar (Haiku para investigación/email, Sonnet para reuniones):**

- Investigación: $3.20/mes
- Borradores de email: $12/mes
- Preparación de reuniones: $14/mes
- **Total: $29.20/mes**

Ahorró $294/mes (91%) al cambiar modelos para tareas estructuradas.
</ExampleCard>

---

## La Matriz de Selección de Modelos

No todas las tareas necesitan GPT-4o. Así es como emparejar modelos con tipos de agentes:

<ClassifyExercise
title="¿Qué Modelo para Qué Agente?"
persistKey="custom-ai-agents-L9-model-match"
categories={[
{ id: "haiku", label: "Claude Haiku ($)", color: "#10b981" },
{ id: "sonnet", label: "Claude Sonnet ($$)", color: "#f59e0b" },
{ id: "gpt4o", label: "GPT-4o ($$$)", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Brief de investigación de prospectos (salida estructurada, factual)",
correctCategory: "haiku",
explanation: "Haiku maneja la extracción de datos estructurados perfectamente a 1/20 del costo"
},
{
id: "2",
content: "Primer borrador de email (necesita voz, creatividad)",
correctCategory: "sonnet",
explanation: "Sonnet equilibra calidad y costo para tareas creativas de escritura"
},
{
id: "3",
content: "Preparación de reuniones (razonamiento complejo, estratégico)",
correctCategory: "sonnet",
explanation: "El razonamiento de Sonnet vale el costo extra para preparación de alto impacto"
},
{
id: "4",
content: "Extracción de campos del CRM (nombre, título, empresa)",
correctCategory: "haiku",
explanation: "Extracción pura de datos — Haiku es perfecto"
},
{
id: "5",
content: "Resumen post-llamada con elementos de acción",
correctCategory: "sonnet",
explanation: "Requiere matiz y contexto — Sonnet justificado"
},
{
id: "6",
content: "Generación de variantes A/B de asuntos de email",
correctCategory: "haiku",
explanation: "Tarea creativa simple — Haiku puede manejarlo"
}
]}
/>

### El Marco de Decisión

**Usa Claude Haiku cuando:**

- La salida es estructurada (JSON, markdown con secciones claras)
- La tarea es extracción o clasificación factual
- Puedes validar la salida con reglas simples
- El volumen es alto (100+ llamadas/día)

**Usa Claude Sonnet cuando:**

- La salida requiere coincidencia de voz/tono
- La tarea implica razonamiento o estrategia
- La calidad impacta directamente en los ingresos (emails, preparación de reuniones)
- El volumen es moderado (10-100 llamadas/día)

**Usa GPT-4o cuando:**

- Necesitas la mejor calidad absoluta
- La tarea es razonamiento multi-paso complejo
- El costo es insignificante comparado con el valor del deal
- El volumen es bajo (<10 llamadas/día)

<InsightCard icon="🎯" title="La Regla 80/20">
El 80% de las llamadas de tus agentes pueden usar modelos Haiku o mini. Reserva Sonnet/GPT-4o para el 20% que toca directamente a los prospectos o requiere pensamiento estratégico.
</InsightCard>

---

## Técnicas de Optimización de Tokens

Más allá de la selección de modelos, aquí hay 6 formas de reducir los costos de tokens sin sacrificar calidad:

### 1. Compresión de Prompts

**Antes (1,847 tokens):**

```
Eres un asistente de investigación de ventas para un solopreneur construyendo un producto SaaS B2B.
Tu trabajo es analizar datos del prospecto y generar un brief de investigación completo.

La información del prospecto es la siguiente:
Nombre: John Smith
Título: VP de Marketing
Empresa: Acme Corp
LinkedIn: [volcado completo del perfil: 800 tokens]
Datos de empresa: [volcado completo de Crunchbase: 600 tokens]

Por favor genera un brief de investigación que incluya:
1. Una descripción general del prospecto...
```

**Después (891 tokens):**

```
Genera brief del prospecto:

PROSPECTO:
- John Smith, VP Marketing, Acme Corp
- LinkedIn: [solo puntos clave: 200 tokens]
- Empresa: [datos filtrados: 150 tokens]

SALIDA (markdown):
1. Descripción general (rol, antigüedad, experiencia)
2. Empresa (tamaño, etapa, financiamiento, noticias)
3. Señales de dolor (basadas en rol + etapa)
4. Conexiones (mutuos, compartidos)
5. Ángulo de alcance (gancho específico + CTA)
```

**Ahorro: 956 tokens (52%) por llamada**

<TemplateBuilder
title="Comprime Tu Prompt de Investigación"
persistKey="custom-ai-agents-L9-compress"
sections={[
{
id: "original",
title: "Tu Prompt Actual",
fields: [
{
id: "prompt",
label: "Pega tu prompt completo",
placeholder: "Eres un asistente de investigación de ventas...",
type: "textarea",
rows: 8
}
]
},
{
id: "compressed",
title: "Versión Comprimida",
fields: [
{
id: "compressed",
label: "Compresión sugerida por IA",
placeholder: "La IA sugerirá una versión comprimida...",
type: "textarea",
rows: 8,
aiSuggestion: true
},
{
id: "savings",
label: "Ahorro estimado de tokens",
placeholder: "~500 tokens (40%)",
type: "text",
readonly: true
}
]
}
]}
/>

### 2. Caché de Contexto (Solo Claude)

El almacenamiento en caché de prompts de Claude te permite cachear contexto estático (plantillas, ejemplos, criterios ICP) y reutilizarlo entre llamadas. Pagas el precio completo una vez, luego un 90% menos para los tokens cacheados.

**Ejemplo:**

- Primera llamada: 1,600 tokens de entrada → $0.0048 (Sonnet)
- Llamadas posteriores: 200 tokens nuevos + 1,400 cacheados → $0.0006 + $0.00042 = $0.00102
- **Ahorro: 79% por llamada después de la primera**

**Qué cachear:**

- Plantillas de email (frameworks PAS, AIDA)
- Criterios ICP y ejemplos
- Guía de voz y reglas de estilo
- Contexto de empresa (para preparación de reuniones)

<FlipCard 
  front="¿Cuándo Compensa el Almacenamiento en Caché?" 
  back="Punto de equilibrio: ~10 llamadas con el mismo contexto cacheado. Si estás ejecutando 50+ briefs de investigación/día con la misma plantilla ICP, el almacenamiento en caché ahorra $50-100/mes." 
/>

### 3. Procesamiento en Lote

En lugar de llamar al LLM una vez por prospecto, agrupa 5-10 prospectos en una sola llamada.

**Enfoque de llamada única:**

- 50 prospectos × 1,600 tokens entrada = 80,000 tokens
- 50 prospectos × 800 tokens salida = 40,000 tokens
- **Costo (Sonnet): $0.24 + $0.60 = $0.84**

**Enfoque en lote:**

- 1 llamada × 8,000 tokens entrada (10 prospectos + plantilla) = 8,000 tokens
- 1 llamada × 8,000 tokens salida (10 briefs) = 8,000 tokens
- 5 lotes × ($0.024 + $0.12) = $0.72
- **Ahorro: 14%**

Además: el agrupamiento reduce el overhead de latencia de la API.

### 4. Límites de Longitud de Salida

Fuerza al modelo a ser conciso con `max_tokens` y restricciones explícitas de longitud.

**Antes:**

```
Genera un brief de investigación del prospecto.
```

→ El modelo genera 1,200 tokens (verboso)

**Después:**

```
Genera un brief de investigación del prospecto. Máximo 600 tokens. Sé conciso.
```

→ El modelo genera 650 tokens

**Ahorro: 550 tokens (46%) por llamada**

### 5. Salida Estructurada (Modo JSON)

Usa el modo JSON o salida estructurada para eliminar tokens de formato.

**Antes (markdown):**

```
## Brief del Prospecto: John Smith

**Rol:** VP de Marketing en Acme Corp
**Antigüedad:** 2.5 años
**Experiencia:** Anteriormente en...
```

→ ~800 tokens con formato

**Después (JSON):**

```json
{
  "name": "John Smith",
  "role": "VP de Marketing",
  "company": "Acme Corp",
  "tenure": "2.5 años",
  "background": "Anteriormente en..."
}
```

→ ~600 tokens

**Ahorro: 200 tokens (25%) por llamada**

### 6. Carga Perezosa de Contexto

No envíes datos que el modelo no necesita. Usa lógica condicional para incluir contexto solo cuando sea relevante.

**Ejemplo: Redactor de emails**

- Si `sequence_position == "first_touch"` → incluir el brief de investigación completo
- Si `sequence_position == "follow_up_2"` → incluir solo señales de dolor + email anterior
- Si `sequence_position == "breakup"` → incluir solo nombre + empresa

**Ahorro: 40-60% en emails de seguimiento**

<InteractiveChecklist
title="Checklist de Optimización de Tokens"
persistKey="custom-ai-agents-L9-optimize"
items={[
"Comprimir prompts: eliminar instrucciones verbosas, usar bullets",
"Habilitar caché de prompts para contexto estático (Claude)",
"Agrupar solicitudes similares en llamadas únicas a la API",
"Establecer límites de max_tokens en todas las salidas",
"Usar modo JSON para extracción de datos estructurados",
"Carga perezosa de contexto: enviar solo lo necesario por llamada",
"Cambiar a modelos Haiku/mini para el 80% de las tareas",
"Probar la calidad de la salida después de cada optimización"
]}
/>

---

## Monitoreo de Costos y Alertas

No puedes optimizar lo que no mides. Configura el seguimiento de costos **antes** de escalar.

### 1. Dashboards de Uso de API

**OpenAI:**

- Dashboard: platform.openai.com/usage
- Muestra: gasto diario, tokens por modelo, solicitudes por endpoint
- Alertas: establece límites de presupuesto mensual ($50, $100, $200)

**Anthropic:**

- Dashboard: console.anthropic.com/settings/billing
- Muestra: gasto diario, tokens cacheados vs no cacheados
- Alertas: notificaciones por email al 50%, 80%, 100% del presupuesto

**Mejor práctica:** Revisa semanalmente, no mensualmente. Detecta los costos descontrolados temprano.

### 2. Seguimiento de Costos por Agente

Etiqueta cada llamada a la API con metadatos para rastrear el costo por agente:

```python
# Ejemplo: OpenAI con metadatos
response = openai.chat.completions.create(
    model="gpt-4o-mini",
    messages=[...],
    metadata={
        "agent": "research",
        "contact_id": "12345",
        "cost_center": "acquisition"
    }
)

# Registrar en tu análisis
log_cost(
    agent="research",
    input_tokens=response.usage.prompt_tokens,
    output_tokens=response.usage.completion_tokens,
    cost=calculate_cost(response.usage, model="gpt-4o-mini")
)
```

Esto te permite responder:

- ¿Qué agente es el más caro?
- ¿Cuál es el costo por cliente convertido?
- ¿Los costos están creciendo más rápido que los ingresos?

### 3. Métricas de Costo por Resultado

El único costo que importa es el **costo por resultado deseado**.

<ScenarioSimulator
title="Calculadora de Costo por Resultado"
persistKey="custom-ai-agents-L9-cpo"
levers={[
{ id: "monthlyCost", label: "Costo mensual de IA", min: 10, max: 1000, step: 10, defaultValue: 100 },
{ id: "newContacts", label: "Contactos procesados/mes", min: 50, max: 2000, step: 50, defaultValue: 200 },
{ id: "replyRate", label: "Tasa de respuesta (%)", min: 1, max: 20, step: 1, defaultValue: 5 },
{ id: "meetingRate", label: "Respuesta → reunión (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
{ id: "closeRate", label: "Reunión → cierre (%)", min: 5, max: 30, step: 5, defaultValue: 15 },
{ id: "dealValue", label: "Valor promedio del deal", min: 500, max: 50000, step: 500, defaultValue: 5000 }
]}
outputs={[
{
id: "replies",
label: "Respuestas/mes",
formula: "newContacts * (replyRate / 100)",
unit: "",
precision: 0
},
{
id: "meetings",
label: "Reuniones/mes",
formula: "replies * (meetingRate / 100)",
unit: "",
precision: 0
},
{
id: "deals",
label: "Deals cerrados/mes",
formula: "meetings * (closeRate / 100)",
unit: "",
precision: 1
},
{
id: "revenue",
label: "Ingresos/mes",
formula: "deals * dealValue",
unit: "$",
precision: 0
},
{
id: "costPerDeal",
label: "Costo de IA por deal",
formula: "monthlyCost / deals",
unit: "$",
precision: 2
},
{
id: "costAsPercent",
label: "Costo de IA como % de ingresos",
formula: "(monthlyCost / revenue) * 100",
unit: "%",
precision: 2
}
]}
insight="A ${monthlyCost}/mes, estás gastando ${costPerDeal} por deal ({costAsPercent}% de los ingresos). Referencia de la industria: 2-5% de los ingresos en herramientas de adquisición."
/>

**Benchmarks saludables:**

- Costo por respuesta: $0.50-2.00
- Costo por reunión: $5-20
- Costo por deal: 2-5% del valor del deal
- Costos de IA como % de ingresos: <5%

Si tus costos superan estos valores, optimiza o sube los precios.

---

## La Economía Autoalojado vs SaaS

Tienes dos caminos para ejecutar agentes a escala:

### Camino 1: SaaS (Zapier/n8n Cloud/Make)

**Costos:**

- Orquestador: $20-50/mes (Zapier/Make) o $24/mes (n8n cloud)
- API LLM: $50-300/mes (depende del volumen + modelo)
- APIs de enriquecimiento: $0-100/mes (nivel gratuito de Apollo o pago)
- **Total: $70-450/mes**

**Ventajas:**

- Cero gestión de infraestructura
- Monitoreo y logs incorporados
- Fácil de escalar
- No requiere habilidades DevOps

**Desventajas:**

- Costos más altos por ejecución
- Personalización limitada
- Dependencia del proveedor
- Los costos escalan linealmente con el volumen

### Camino 2: Autoalojado (VPS + Código Abierto)

**Costos:**

- VPS: $5-20/mes (Railway, Render, DigitalOcean)
- API LLM: $50-300/mes (igual que SaaS)
- APIs de enriquecimiento: $0-100/mes (igual que SaaS)
- **Total: $55-420/mes**

**Ventajas:**

- Costos más bajos por ejecución a escala
- Control total y personalización
- Sin dependencia del proveedor
- Los costos no escalan con el volumen (VPS fijo)

**Desventajas:**

- Requiere habilidades DevOps (Docker, despliegue, monitoreo)
- Gestionas el tiempo de actividad y los errores
- Tiempo de configuración inicial: 4-8 horas

<StrategyDuel
title="SaaS vs Autoalojado para Agentes de IA"
persistKey="custom-ai-agents-L9-duel"
scenario="Estás ejecutando 200 contactos/semana a través de 5 agentes. ¿Qué arquitectura?"
strategyA={{
    name: "SaaS (n8n Cloud + APIs)",
    description: "Usa n8n cloud ($24/mes) + APIs LLM. Sin gestión de infraestructura.",
    pros: [
      "Cero DevOps requerido",
      "Monitoreo incorporado",
      "Fácil de empezar"
    ],
    cons: [
      "Mayor costo a escala",
      "Personalización limitada",
      "Dependencia del proveedor"
    ]
  }}
strategyB={{
    name: "Autoalojado (VPS + n8n)",
    description: "Despliega n8n en Railway ($7/mes) + APIs LLM. Control total.",
    pros: [
      "Menor costo a escala",
      "Personalización total",
      "Sin dependencia del proveedor"
    ],
    cons: [
      "Requiere habilidades DevOps",
      "Gestionas el tiempo de actividad",
      "Configuración inicial de 8 horas"
    ]
  }}
expertVerdict="SaaS para los primeros 3 meses o si eres no técnico. Autoalojado una vez que alcances 500+ contactos/semana o necesites lógica personalizada. Punto de equilibrio: ~1,000 ejecuciones de agentes/mes."
/>

### Análisis de Punto de Equilibrio

**Costos SaaS:**

- n8n cloud: $24/mes (flujos ilimitados)
- Costo por ejecución: $0 (incluido)

**Costos autoalojados:**

- VPS Railway: $7/mes
- Costo por ejecución: $0 (pagas por cómputo, no por ejecuciones)

**Punto de equilibrio:** Inmediato si eres técnico. Si valoras tu tiempo DevOps en $50/hora y la configuración toma 8 horas, el punto de equilibrio es en el mes 24 ($400 costo de configuración / $17/mes de ahorro).

**Recomendación:** Empieza con SaaS, migra al autoalojado cuando alcances 1,000+ ejecuciones/mes o necesites características personalizadas.

---

## Manual de Optimización de Costos

Aquí está tu plan paso a paso para reducir los costos de IA en un 50-80% sin sacrificar calidad:

<SlideNavigation>
<Slide title="Semana 1: Medir">

**Objetivo: Establecer costos de referencia**

1. Habilitar el seguimiento de uso en los dashboards de OpenAI/Anthropic
2. Etiquetar todas las llamadas a la API con metadatos del agente
3. Ejecutar los agentes durante 1 semana a volumen normal
4. Calcular:
   - Gasto total
   - Costo por agente
   - Costo por resultado (respuesta, reunión, deal)
5. Identificar los 3 agentes más costosos

**Entregable:** Hoja de cálculo de costos de referencia

</Slide>

<Slide title="Semana 2: Cambio de Modelos">

**Objetivo: Cambiar el 80% de las llamadas a modelos más baratos**

1. Identificar agentes que hacen tareas estructuradas (investigación, enriquecimiento, clasificación)
2. Probar Haiku/GPT-4o-mini en 10 llamadas de muestra
3. Comparar la calidad de la salida (usa el Linter de Ventas)
4. Si la calidad es aceptable (>90% igual de buena), cambiar el modelo
5. Monitorear por 3 días, revertir si hay problemas

**Ahorros esperados: 60-80%**

</Slide>

<Slide title="Semana 3: Compresión de Prompts">

**Objetivo: Reducir los tokens de entrada en un 40%**

1. Exportar tus 3 prompts más utilizados
2. Eliminar instrucciones verbosas
3. Usar bullets en lugar de párrafos
4. Probar versiones comprimidas en 10 muestras
5. Desplegar si la calidad de la salida se mantiene

**Ahorros esperados: 30-50% en tokens de entrada**

</Slide>

<Slide title="Semana 4: Caché + Agrupamiento">

**Objetivo: Optimizar para volumen**

1. Habilitar caché de prompts para contexto estático (solo Claude)
2. Agrupar solicitudes similares (5-10 por llamada)
3. Establecer límites de max_tokens en todas las salidas
4. Usar modo JSON para datos estructurados

**Ahorros esperados: 20-40% adicional**

</Slide>

<Slide title="Semana 5: Monitorear + Iterar">

**Objetivo: Sostener las optimizaciones**

1. Configurar revisión semanal de costos (15 min)
2. Configurar alertas de presupuesto al 80% del objetivo
3. Hacer pruebas A/B de nuevas optimizaciones (1 por semana)
4. Documentar lo que funciona en tu runbook

**Resultado: Costos predecibles y optimizados**

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Tu Sprint de Optimización de Costos"
persistKey="custom-ai-agents-L9-sprint"
items={[
"Semana 1: Configurar el seguimiento de costos y establecer la referencia",
"Semana 2: Cambiar el 80% de los agentes a modelos Haiku/mini",
"Semana 3: Comprimir los prompts y reducir los tokens de entrada en un 40%",
"Semana 4: Habilitar el almacenamiento en caché y el agrupamiento para agentes de alto volumen",
"Semana 5: Configurar el monitoreo y el proceso de revisión semanal",
"Calcular las nuevas métricas de costo por resultado",
"Documentar las optimizaciones en el runbook del agente"
]}
/>

---

## Estructuras de Costos del Mundo Real

Veamos 3 perfiles de solopreneurs y sus estructuras de costos optimizadas:

<ExampleCard label="Perfil 1: Founder Técnico (SaaS B2B)">

**Volumen:**

- 150 nuevos contactos/semana
- Secuencias de 5 emails
- 6 reuniones/semana

**Stack de Agentes:**

- Investigación: Haiku
- Borradores de email: Sonnet (primer contacto), Haiku (seguimientos)
- Preparación de reuniones: Sonnet
- Enriquecimiento del CRM: Haiku
- Post-llamada: Sonnet

**Costos Mensuales:**

- API LLM: $42/mes
- n8n cloud: $24/mes
- Apollo (nivel gratuito): $0
- **Total: $66/mes**

**Resultados:**

- 30 respuestas/mes
- 6 reuniones/mes
- 1.2 deals/mes
- **Costo por deal: $55 (1.1% de $5K ACV)**

</ExampleCard>

<ExampleCard label="Perfil 2: Coach/Consultor">

**Volumen:**

- 80 nuevos contactos/semana
- Secuencias de 3 emails
- 10 reuniones/semana

**Stack de Agentes:**

- Investigación: Haiku
- Borradores de email: Sonnet
- Preparación de reuniones: Sonnet
- Post-llamada: Haiku

**Costos Mensuales:**

- API LLM: $28/mes
- Zapier: $20/mes
- **Total: $48/mes**

**Resultados:**

- 16 respuestas/mes
- 10 reuniones/mes
- 2 deals/mes
- **Costo por deal: $24 (0.8% de paquete de $3K)**

</ExampleCard>

<ExampleCard label="Perfil 3: Creador de Contenido (Ventas de Cursos)">

**Volumen:**

- 200 nuevos suscriptores/semana (de lead magnet)
- Secuencia de nurture de 5 emails
- 4 llamadas de ventas/semana

**Stack de Agentes:**

- Investigación de suscriptores: Haiku (modo lote)
- Personalización de email: Haiku
- Preparación de llamadas: Sonnet

**Costos Mensuales:**

- API LLM: $18/mes
- Make: $10/mes
- **Total: $28/mes**

**Resultados:**

- 40 respuestas/mes
- 4 llamadas/mes
- 1.6 ventas de cursos/mes
- **Costo por venta: $17.50 (1.75% de curso de $997)**

</ExampleCard>

**Patrón:** Los costos optimizados de IA para solopreneurs corren al 0.8-2% de los ingresos. Si estás por encima del 5%, estás pagando de más.

---

## La Estrategia del Techo de Costos

Así es como asegurarte de que los costos de IA nunca se descontrolen:

### 1. Establecer Límites Duros de Presupuesto

**OpenAI/Anthropic:** Establece topes de gasto mensual en el dashboard

- Límite suave: 80% del presupuesto → alerta por email
- Límite duro: 100% del presupuesto → llamadas a la API rechazadas

**Ejemplo:**

- Objetivo: $100/mes
- Límite suave: $80 (alerta a Slack)
- Límite duro: $100 (detener todos los agentes no críticos)

### 2. Prioridad de Agentes por Niveles

No todos los agentes son igualmente críticos. Asigna niveles de prioridad:

**Nivel 1 (Crítico):** Siempre ejecutar, incluso si se supera el presupuesto

- Preparación de reuniones (crítico para los ingresos)
- Resumen post-llamada (higiene del CRM)

**Nivel 2 (Importante):** Ejecutar a menos que se use el 90% del presupuesto

- Investigación de prospectos
- Primer borrador de email

**Nivel 3 (Conveniente):** Pausar si se usa el 80% del presupuesto

- Actualización de enriquecimiento del CRM
- Generación de publicaciones en LinkedIn

**Implementación:**

```python
def should_run_agent(agent_tier, budget_used_percent):
    if agent_tier == 1:
        return True  # Siempre ejecutar
    elif agent_tier == 2:
        return budget_used_percent < 90
    elif agent_tier == 3:
        return budget_used_percent < 80
    return False
```

### 3. Puertas de Costo por Resultado

Establece un costo máximo aceptable por resultado. Si se supera, pausa e investiga.

**Ejemplo de puertas:**

- Costo por brief de investigación: <$0.05
- Costo por borrador de email: <$0.02
- Costo por preparación de reunión: <$0.15

**Si se supera:** Verifica si hay:

- Cambio de modelo (¿estás usando GPT-4o accidentalmente en lugar de Haiku?)
- Hinchazón de prompts (¿alguien agregó instrucciones verbosas?)
- Pico de volumen (¿importaste una lista enorme?)

### 4. Ritual de Revisión Semanal de Costos

**Cada lunes, 15 minutos:**

1. Revisar el gasto total vs presupuesto (¿en camino?)
2. Revisar el costo por agente (¿algún pico?)
3. Revisar el costo por resultado (¿sigue siendo eficiente?)
4. Identificar 1 optimización para probar esta semana

**Resultado:** Los costos permanecen predecibles y optimizados.

<TimedChallenge
title="Detecta el Problema de Costos"
persistKey="custom-ai-agents-L9-timed"
timeLimit={90}
items={[
{
id: "1",
prompt: "El costo de tu agente de investigación saltó de $0.02 a $0.18 por brief. ¿Cuál es la causa probable?",
correctAnswer: "model-swap",
options: ["Pico de volumen", "El modelo fue cambiado accidentalmente a GPT-4o", "El prompt se hizo más largo", "El precio de la API cambió"],
explanation: "18 centavos es el precio de GPT-4o. Revisa la configuración de tu modelo — alguien probablemente lo cambió."
},
{
id: "2",
prompt: "Tu redactor de emails está usando 2,400 tokens de entrada por llamada (antes eran 1,200). ¿Qué pasó?",
correctAnswer: "context-bloat",
options: ["El modelo cambió", "Hinchazón de contexto (alguien agregó ejemplos)", "El agrupamiento falló", "El caché está deshabilitado"],
explanation: "El doble de tokens de entrada = alguien agregó contexto (ejemplos, plantillas, instrucciones verbosas)."
},
{
id: "3",
prompt: "Tu factura mensual es de $400 pero presupuestaste $100. Procesas 200 contactos/semana. ¿Qué está mal?",
correctAnswer: "no-optimization",
options: ["Volumen demasiado alto", "Usando modelos caros para todo", "El precio de la API cambió", "El agrupamiento no está habilitado"],
explanation: "200/semana debería costar $50-100 optimizado. Estás usando GPT-4o para todo. Cambia a Haiku."
}
]}
/>

---

## Resumen: Tu Checklist de Optimización de Costos

Aprendiste a calcular, monitorear y optimizar los costos de operación de los agentes de IA. Aquí está tu plan de acción:

<InteractiveChecklist
title="Dominio de la Economía de Tokens"
persistKey="custom-ai-agents-L9-summary"
items={[
"Calcular tu costo mensual de referencia usando el simulador",
"Cambiar el 80% de los agentes a Haiku o GPT-4o-mini",
"Comprimir tus 3 prompts principales (40% de reducción de tokens)",
"Habilitar el caché de prompts para contexto estático (Claude)",
"Configurar el seguimiento de costos con metadatos a nivel de agente",
"Configurar alertas de presupuesto al 80% y 100%",
"Asignar niveles de prioridad a todos los agentes",
"Establecer puertas de costo por resultado (investigación, email, reunión)",
"Programar revisión semanal de costos de 15 min",
"Documentar las optimizaciones en tu runbook del agente",
"Probar una nueva optimización por semana"
]}
/>

**Próxima lección:** Abordaremos la seguridad, el manejo de PII y el cumplimiento — cómo ejecutar agentes de IA de forma segura como una operación unipersonal sin un equipo legal.

---

## Quiz: Economía de Tokens

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Procesas 200 prospectos/semana con un agente de investigación. Cada llamada usa 1,600 tokens de entrada y 800 de salida. Usando Claude Sonnet 4 ($3/1M entrada, $15/1M salida), ¿cuál es tu costo mensual?",
      "options": ["$3.84", "$14.40", "$38.40", "$144.00"],
      "correctIndex": 1,
      "explanation": "200/semana × 4 semanas = 800 llamadas. (800 × 1,600 × $3 + 800 × 800 × $15) / 1,000,000 = $14.40/mes."
    },
    {
      "id": "q2",
      "question": "¿Qué agente debería usar Claude Haiku en lugar de Sonnet?",
      "options": [
        "Preparación de reuniones (requiere razonamiento estratégico)",
        "Primer borrador de email (necesita coincidencia de voz)",
        "Enriquecimiento del CRM (extracción de datos estructurados)",
        "Resumen post-llamada (elementos de acción con matiz)"
      ],
      "correctIndex": 2,
      "explanation": "El enriquecimiento del CRM es extracción pura de datos estructurados — perfecto para Haiku a 1/12 del costo de Sonnet."
    },
    {
      "id": "q3",
      "question": "Tus costos de IA son $200/mes y cierras 4 deals/mes a $5K cada uno. ¿Cuál es tu costo de IA como % de ingresos?",
      "options": ["1%", "4%", "10%", "20%"],
      "correctIndex": 0,
      "explanation": "$200 / ($5,000 × 4) = $200 / $20,000 = 1%. El benchmark saludable es <5%."
    },
    {
      "id": "q4",
      "question": "El caché de prompts (Claude) ahorra un 90% en tokens cacheados. Tienes una plantilla de 1,400 tokens usada en 100 llamadas/día. ¿Cuál es el ahorro mensual vs sin caché?",
      "options": ["$1.26", "$12.60", "$126.00", "$378.00"],
      "correctIndex": 2,
      "explanation": "Sin caché: 100 × 30 × 1,400 × $3/1M = $126. Con caché: primera llamada $0.0042, luego 2,999 llamadas × $0.00042 = $1.26. Ahorro: $126 - $1.26 = ~$126/mes."
    },
    {
      "id": "q5",
      "question": "¿Cuándo deberías migrar de SaaS (n8n cloud) a autoalojado (VPS)?",
      "options": [
        "Inmediatamente — siempre es más barato",
        "Cuando alcances 1,000+ ejecuciones de agentes/mes",
        "Nunca — el SaaS siempre es mejor",
        "Solo si eres experto en DevOps"
      ],
      "correctIndex": 1,
      "explanation": "El punto de equilibrio es alrededor de 1,000 ejecuciones/mes o cuando necesites características personalizadas. Por debajo de eso, la simplicidad del SaaS gana."
    }
  ]
}
```
