---
title: "Arquitectura de Referencia: Autoalojado vs SaaS"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 8
---

# Arquitectura de Referencia: Autoalojado vs SaaS

## La Pregunta de los $3,000

Construiste tus primeros tres agentes. Funcionan. La investigación de prospectos corre cada mañana. Los borradores de emails se acumulan para revisión. Tu CRM se mantiene enriquecido.

Luego revisas el estado de tu tarjeta de crédito.

**$287 este mes.** Zapier Professional ($49). Make Pro ($18). Créditos de Apollo ($50). Clearbit ($99). Claude API ($71).

Haces el cálculo: **$3,444 al año** para ejecutar agentes que te ahorran tal vez 8 horas a la semana.

¿Hay una mejor manera?

<InsightCard icon="💰" title="La Decisión de Arquitectura">
La mayoría de los solopreneurs pagan de más por los orquestadores SaaS cuando las opciones autoalojadas cuestan un 80-90% menos. Pero el autoalojamiento no es gratis — tiene un costo de complejidad técnica, tiempo de mantenimiento y carga mental.
</InsightCard>

Esta lección mapea el **panorama completo de costos y complejidad** de ejecutar agentes de ventas con IA. Construirás un marco de decisión, verás arquitecturas reales de ambas rutas y calcularás tu costo total de propiedad real.

Al final, sabrás exactamente qué arquitectura se adapta a tu nivel técnico, presupuesto y tolerancia al riesgo.

---

## Los Dos Caminos

Todo sistema de agentes de IA se asienta sobre una de dos bases:

### Camino A: Stack SaaS

- **Orquestador**: Zapier ($20-49/mes) o Make ($10-18/mes)
- **Enriquecimiento**: APIs de Apollo/Clearbit (pago por uso o suscripción)
- **LLM**: API de OpenAI/Anthropic (pago por token)
- **Almacenamiento**: CRM (HubSpot/Pipedrive/Attio)
- **Monitoreo**: Incorporado en cada herramienta SaaS

**Costo mensual total**: $200-400 para 50-200 prospectos/semana

### Camino B: Stack Autoalojado

- **Orquestador**: n8n autoalojado en Railway/Render ($5-10/mes)
- **Enriquecimiento**: Las mismas APIs (nivel gratuito de Apollo + scrapers)
- **LLM**: Las mismas APIs (OpenAI/Anthropic)
- **Almacenamiento**: PostgreSQL en el mismo VPS (incluido)
- **Monitoreo**: Uptime Robot (gratis) + logs personalizados

**Costo mensual total**: $50-100 para 50-200 prospectos/semana

<FlipCard 
  front="¿Por qué la diferencia de precio de 4-5x?" 
  back="Las herramientas SaaS cobran por conveniencia, soporte y UI. El autoalojamiento elimina esos márgenes pero agrega deuda técnica: tú eres el sysadmin, el depurador y el administrador de actualizaciones." 
/>

<RangeSlider 
  label="¿Qué tan cómodo estás con el despliegue y la depuración desde la línea de comandos?" 
  min={1} 
  max={10} 
  lowLabel="Nunca lo he tocado" 
  highLabel="Despliego apps semanalmente" 
  persistKey="custom-ai-agents-L8-technical-comfort" 
/>

---

## Desglose de Costos: Los Números Reales

Calculemos el precio de ambas arquitecturas para una **carga de trabajo típica de solopreneur**:

- 50 nuevos prospectos/semana (200/mes)
- 5 agentes activos (investigación, borrador de email, enriquecimiento, preparación de reuniones, post-llamada)
- 10,000 llamadas a la API del LLM/mes (~$30-50 en tokens)

### Precios del Stack SaaS

<ScenarioSimulator
title="Calculadora de Costos del Stack SaaS"
persistKey="custom-ai-agents-L8-saas-cost"
levers={[
{ id: "prospects", label: "Prospectos por mes", min: 50, max: 500, step: 50, defaultValue: 200 },
{ id: "zapierTier", label: "Nivel de Zapier (tareas/mes)", min: 750, max: 50000, step: 1000, defaultValue: 2000 },
{ id: "enrichmentAPI", label: "Gasto en API de enriquecimiento", min: 0, max: 200, step: 25, defaultValue: 50 }
]}
outputs={[
{ id: "zapierCost", label: "Zapier", formula: "zapierTier <= 750 ? 20 : (zapierTier <= 2000 ? 49 : 69)", unit: "$", precision: 0 },
{ id: "llmCost", label: "APIs LLM (Claude/GPT)", formula: "(prospects * 0.15)", unit: "$", precision: 0 },
{ id: "enrichment", label: "APIs de enriquecimiento", formula: "enrichmentAPI", unit: "$", precision: 0 },
{ id: "total", label: "Total Mensual", formula: "zapierCost + llmCost + enrichment", unit: "$", precision: 0 }
]}
insight="Con `{prospects}` prospectos/mes, estás gastando ~$`{total}`/mes. Costo anual: ${total \* 12}."
/>

**Costos mensuales típicos de SaaS:**

- Zapier Professional (2K tareas): **$49**
- Make Pro (10K operaciones): **$18** (si usas en lugar de Zapier)
- Créditos de Apollo (200 emails): **$50**
- Enriquecimiento de Clearbit: **$99** (opcional)
- API LLM (Claude Sonnet): **$30-50**
- CRM (HubSpot Starter): **$20** (o nivel gratuito)

**Total: $167-236/mes** (sin Clearbit) o **$266-335/mes** (con Clearbit)

### Precios del Stack Autoalojado

<ScenarioSimulator
title="Calculadora de Costos del Stack Autoalojado"
persistKey="custom-ai-agents-L8-selfhost-cost"
levers={[
{ id: "prospects", label: "Prospectos por mes", min: 50, max: 500, step: 50, defaultValue: 200 },
{ id: "vpsSize", label: "Tamaño del VPS (GB RAM)", min: 1, max: 4, step: 1, defaultValue: 2 },
{ id: "enrichmentAPI", label: "Gasto en API de enriquecimiento", min: 0, max: 200, step: 25, defaultValue: 25 }
]}
outputs={[
{ id: "vpsCost", label: "VPS (Railway/Render)", formula: "vpsSize <= 1 ? 5 : (vpsSize <= 2 ? 7 : 10)", unit: "$", precision: 0 },
{ id: "llmCost", label: "APIs LLM", formula: "(prospects * 0.15)", unit: "$", precision: 0 },
{ id: "enrichment", label: "APIs de enriquecimiento", formula: "enrichmentAPI", unit: "$", precision: 0 },
{ id: "total", label: "Total Mensual", formula: "vpsCost + llmCost + enrichment", unit: "$", precision: 0 }
]}
insight="Con `{prospects}` prospectos/mes en un VPS de {vpsSize}GB, estás gastando ~$`{total}`/mes. Costo anual: ${total * 12}. Ahorros vs SaaS: ~${(200 - total) \* 12}/año."
/>

**Costos mensuales típicos autoalojados:**

- VPS Railway/Render (2GB): **$7**
- n8n (autoalojado, ilimitado): **$0**
- Nivel gratuito de Apollo (10K/mes): **$0**
- API LLM (igual que SaaS): **$30-50**
- PostgreSQL (en VPS): **$0**
- Dominio + SSL (Cloudflare): **$1**

**Total: $38-58/mes**

<InsightCard icon="📊" title="El Cálculo a 5 Años">
SaaS: $200/mes × 60 meses = **$12,000**
Autoalojado: $50/mes × 60 meses = **$3,000**
**Ahorros: $9,000** — suficiente para contratar un VA por 180 horas o correr publicidad pagada por 3 meses.
</InsightCard>

---

## Los Costos Ocultos

Los precios no cuentan toda la historia. Mapeemos los **costos no monetarios**:

### Costos Ocultos del SaaS

1. **Dependencia del Proveedor** — Tus flujos de trabajo viven en el formato propietario de Zapier. Migrar a n8n significa reconstruir desde cero.
2. **Límites de Tareas/Operaciones** — ¿Alcanzas tu límite de tareas de Zapier a mitad del mes? Paga $20 de exceso o pausa los agentes hasta el próximo ciclo de facturación.
3. **Brechas de Integración** — Zapier tiene 7,000 integraciones, pero si tu CRM de nicho no está entre ellas, igual te quedas atascado con webhooks y código personalizado.
4. **Aumento de Precios** — Zapier subió los precios un 15% en 2024. Make subió un 20% en 2025. Tu stack de $200/mes se convierte en $250/mes sin aviso.

### Costos Ocultos del Autoalojado

1. **Tiempo de Configuración** — Desplegar n8n en Railway: 2-4 horas la primera vez (siguiendo una guía). SaaS: 15 minutos.
2. **Mantenimiento** — n8n se actualiza cada 2-4 semanas. Necesitas hacer clic en "Desplegar" y probar. 10-20 min/mes.
3. **Depuración** — Cuando un flujo de trabajo falla, SaaS tiene chat de soporte. El autoalojado tiene issues de GitHub y Discord. Espera 30-60 min/mes de resolución de problemas.
4. **Carga Mental** — Eres responsable del tiempo de actividad, las copias de seguridad y los parches de seguridad. Algunos founders encuentran esto energizante. Otros lo encuentran agotador.
5. **Costo de Oportunidad** — 3-5 horas/mes en DevOps = 3-5 horas menos en ventas. A $100/hora de valor, son $300-500/mes en productividad perdida.

<ComparisonBuilder
title="Tu Evaluación de Costos Ocultos"
persistKey="custom-ai-agents-L8-hidden-costs"
prompt="Lista tus 3 principales preocupaciones sobre el autoalojamiento (ej. 'Romperé algo y perderé datos')"
expertExample="1. Ansiedad por el tiempo de actividad — ¿qué pasa si Railway cae durante una campaña? 2. Seguridad — ¿estoy exponiendo mis claves API? 3. Pérdida de tiempo — gastaré los fines de semana depurando en vez de vendiendo."
criteria={[
"Específico a tu contexto (no genérico)",
"Cuantificable si es posible (horas, dólares, nivel de estrés)",
"Honesto sobre tu zona de confort técnica"
]}
/>

---

## Arquitectura de Referencia A: Stack SaaS

Aquí está una **arquitectura SaaS de grado producción** usada por más de 100 solopreneurs:

```
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE DISPARO                        │
│  • Zapier: Nuevo contacto en CRM, evento de calendario...   │
│  • Make: Ejecuciones programadas (enriquecimiento diario)   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE ORQUESTACIÓN                     │
│  • Flujos de trabajo de Zapier (5-15 pasos por agente)      │
│  • Escenarios de Make (cascadas de enriquecimiento)         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE DATOS                          │
│  • API de Apollo (email + enriquecimiento de empresa)       │
│  • API de Clearbit (enriquecimiento de respaldo)            │
│  • Google Sheets (almacenamiento temporal para revisión)    │
│  • CRM (HubSpot/Pipedrive) — fuente de verdad              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       CAPA DE IA                            │
│  • API de OpenAI (GPT-4o para borradores)                  │
│  • API de Anthropic (Claude Sonnet para investigación)      │
│  • Zapier AI Actions (pasos LLM incorporados)               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE SALIDA                         │
│  • Actualizaciones del CRM (briefs, puntuaciones, emails)   │
│  • Notificaciones de Slack (leads prioritarios, errores)    │
│  • Email (docs de prep 30 min antes de las llamadas)        │
└─────────────────────────────────────────────────────────────┘
```

### Ejemplo: Agente de Investigación de Prospectos (SaaS)

**Flujo de trabajo en Zapier:**

1. **Disparo**: Nuevo contacto agregado a HubSpot
2. **Enriquecimiento con Apollo**: Buscar email + datos de empresa
3. **Enriquecimiento con Clearbit** (si Apollo falla): Datos de empresa de respaldo
4. **Búsqueda en Google News**: Obtener menciones recientes (via SerpAPI)
5. **OpenAI GPT-4o**: Generar brief de investigación (el prompt incluye todos los datos enriquecidos)
6. **Actualización de HubSpot**: Guardar brief en notas del contacto + establecer campo de puntaje ICP
7. **Filtro**: Si puntaje ICP >= 8 → notificación de Slack
8. **Fin**

**Conteo de tareas de Zapier**: 7-8 tareas por prospecto (cada paso cuenta)

Con 200 prospectos/mes: **1,400-1,600 tareas/mes** → requiere plan Professional ($49/mes para 2K tareas)

<ExampleCard label="Ejemplo Real de Costos: El Stack SaaS de Sarah">
Sarah ejecuta 4 agentes (investigación, borrador de email, enriquecimiento, preparación de reuniones) para 150 prospectos/mes.

**Costos mensuales:**

- Zapier Professional: $49
- Créditos de Apollo (150 emails): $37.50
- API de Claude: $28
- HubSpot Starter: $20
- SerpAPI (búsqueda de noticias): $50

**Total: $184.50/mes**

Probó Make en lugar de Zapier y ahorró $31/mes (Make Pro a $18 vs Zapier a $49), llevando su total a **$153.50/mes**.

Después de 6 meses, alcanzó el límite de 2K tareas de Zapier dos veces y pagó $40 en excesos. Cambió a Make de forma permanente.
</ExampleCard>

### Ventajas del Stack SaaS

<InteractiveChecklist
title="Ventajas del Stack SaaS"
persistKey="custom-ai-agents-L8-saas-pros"
items={[
"Cero DevOps — sin servidores, sin despliegues, sin SSH",
"Monitoreo incorporado — ve cada ejecución de flujo, reintenta fallos con un clic",
"Configuración rápida — primer agente funcionando en 30-60 minutos",
"Canales de soporte — Zapier/Make tienen soporte por chat y documentación extensa",
"Actualizaciones automáticas — nuevas integraciones y características aparecen sin acción",
"Cumplimiento gestionado — SOC 2, GDPR cubiertos por el proveedor"
]}
/>

### Desventajas del Stack SaaS

<InteractiveChecklist
title="Desventajas del Stack SaaS"
persistKey="custom-ai-agents-L8-saas-cons"
items={[
"4-5x más caro a escala (200+ prospectos/mes)",
"Los límites de tareas/operaciones crean restricciones artificiales al crecimiento",
"Dependencia del proveedor — los flujos no son portables entre plataformas",
"Aumentos de precio — sin control sobre la fijación de precios futura",
"Brechas de integración — si tu herramienta no está soportada, estás atascado",
"Residencia de datos — los datos de tus prospectos viven en servidores del proveedor"
]}
/>

---

## Arquitectura de Referencia B: Stack Autoalojado

Aquí está una **arquitectura autoalojada de grado producción** usada por founders técnicos:

```
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE DISPARO                        │
│  • Webhooks de n8n (CRM envía POST en nuevo contacto)       │
│  • Cron de n8n (programado: 0 8 * * * para enriquecimiento) │
│  • Disparo de Email de n8n (monitor IMAP para respuestas)   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE ORQUESTACIÓN                     │
│  • Flujos de trabajo n8n (ilimitados, en Railway)           │
│  • PostgreSQL (estado del flujo, logs de ejecución)         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE DATOS                          │
│  • API de Apollo (nivel gratuito: 10K/mes)                  │
│  • Hunter.io (nivel gratuito: 25/mes, pago $49/mes)         │
│  • PostgreSQL (caché de contactos, resultados de enriquec.) │
│  • API del CRM (HubSpot/Pipedrive/Attio via webhooks)       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       CAPA DE IA                            │
│  • API de OpenAI (igual que SaaS)                           │
│  • API de Anthropic (igual que SaaS)                        │
│  • Nodo Agente IA de n8n (integración LangChain incorporada)│
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE SALIDA                         │
│  • Actualizaciones de la API del CRM (via nodos HTTP)       │
│  • Webhook de Slack (notificaciones)                        │
│  • SMTP (enviar emails de prep via nodo Email de n8n)       │
└─────────────────────────────────────────────────────────────┘
```

### Ejemplo: Agente de Investigación de Prospectos (Autoalojado)

**Flujo de trabajo n8n:**

1. **Disparo Webhook**: HubSpot envía POST en nuevo contacto
2. **Solicitud HTTP**: Búsqueda en API de Apollo (email + empresa)
3. **Nodo IF**: Si Apollo devolvió datos → saltar al paso 5
4. **Solicitud HTTP**: Respaldo Hunter.io (solo email)
5. **Solicitud HTTP**: SerpAPI para noticias recientes (nombre de empresa)
6. **Nodo Agente IA**: Claude Sonnet genera brief de investigación
7. **Solicitud HTTP**: POST a la API de HubSpot (actualizar notas del contacto + puntaje ICP)
8. **Nodo IF**: Si puntaje ICP >= 8 → notificación por webhook de Slack
9. **PostgreSQL**: Registrar ejecución (timestamp, ID del prospecto, tokens usados, costo)

**Conteo de ejecuciones de n8n**: Ilimitado (autoalojado)

Con 200 prospectos/mes: **$0 en costos de orquestación** (solo APIs LLM + enriquecimiento)

<ExampleCard label="Ejemplo Real de Costos: El Stack Autoalojado de Marcus">
Marcus (founder técnico, cómodo con Docker) ejecuta 5 agentes para 200 prospectos/mes.

**Configuración inicial:**

- Registro en Railway: 5 min
- Despliegue de n8n (plantilla de Railway): 20 min
- Configuración de PostgreSQL (incluido en Railway): 5 min
- Configuración de webhook (HubSpot → n8n): 15 min
- Primer flujo construido: 90 min

**Tiempo total de configuración: ~2.5 horas**

**Costos mensuales:**

- VPS Railway (2GB, n8n + PostgreSQL): $7
- Nivel gratuito de Apollo: $0 (bajo el límite de 10K/mes)
- Hunter.io (respaldo ocasional): $5 (pago por uso)
- API de Claude: $32
- Dominio (n8n.tudominio.com): $1

**Total: $45/mes**

**Tiempo de mantenimiento:** 15-20 min/mes (actualizaciones de n8n, revisión de logs)

Marcus ahorra **$155/mes** vs su configuración anterior de Zapier. En 12 meses: **$1,860 ahorrados**.

Usa los ahorros para correr anuncios en LinkedIn.
</ExampleCard>

### Ventajas del Stack Autoalojado

<InteractiveChecklist
title="Ventajas del Stack Autoalojado"
persistKey="custom-ai-agents-L8-selfhost-pros"
items={[
"80-90% más barato a escala (200+ prospectos/mes)",
"Sin límites artificiales — ejecuta flujos y ejecuciones ilimitados",
"Control total de datos — los datos de tus prospectos quedan en tu infraestructura",
"Portable — exporta flujos como JSON, migra a cualquier instancia de n8n",
"Personalizable — escribe nodos personalizados, integra cualquier API",
"A prueba de futuro — sin aumentos de precio del proveedor ni eliminación de funciones"
]}
/>

### Desventajas del Stack Autoalojado

<InteractiveChecklist
title="Desventajas del Stack Autoalojado"
persistKey="custom-ai-agents-L8-selfhost-cons"
items={[
"Requiere comodidad técnica (línea de comandos, variables de entorno, depuración)",
"Tiempo de configuración: 2-4 horas vs 15 minutos para SaaS",
"Carga de mantenimiento: 15-30 min/mes para actualizaciones y monitoreo",
"Sin soporte oficial — depende de la comunidad (Discord, issues de GitHub)",
"Responsabilidad de tiempo de actividad — si Railway cae, tus agentes se detienen",
"Responsabilidad de seguridad — administras claves API, copias de seguridad, SSL"
]}
/>

---

## El Marco de Decisión

Usa este **marco de 5 factores** para elegir tu arquitectura:

<StrategyDuel
title="SaaS vs Autoalojado: ¿Cuál Encaja Contigo?"
persistKey="custom-ai-agents-L8-architecture-duel"
scenario="Estás listo para desplegar tus primeros 3 agentes (investigación, borrador de email, enriquecimiento) para 150-200 prospectos/mes."
strategyA={{
    name: "Stack SaaS (Zapier/Make)",
    description: "Paga $150-200/mes por cero DevOps y configuración instantánea",
    pros: [
      "Funcionando en 30 minutos",
      "No requiere conocimientos técnicos",
      "Monitoreo y soporte incorporados",
      "Actualizaciones automáticas e integraciones nuevas"
    ],
    cons: [
      "$1,800-2,400/año en costos continuos",
      "Los límites de tareas restringen el crecimiento",
      "Dependencia del proveedor (difícil de migrar)",
      "Sin control sobre la fijación de precios futura"
    ]
  }}
strategyB={{
    name: "Stack Autoalojado (n8n en Railway)",
    description: "Paga $40-60/mes pero invierte 3-5 horas en configuración y mantenimiento",
    pros: [
      "$480-720/año en costos continuos (ahorra $1,320-1,680/año)",
      "Flujos de trabajo y ejecuciones ilimitados",
      "Control total de datos y portabilidad",
      "Sin aumentos de precio del proveedor"
    ],
    cons: [
      "2-4 horas de configuración inicial",
      "15-30 min/mes de mantenimiento",
      "Requiere comodidad básica con DevOps",
      "Solo soporte comunitario (sin chat)"
    ]
  }}
expertVerdict="Si eres no técnico o valoras el tiempo sobre el dinero: SaaS. Si eres técnico o procesas >150 prospectos/mes: el autoalojado ahorra $1,500+/año con un overhead mínimo."
/>

### Factor 1: Comodidad Técnica

<RangeSlider 
  label="Califica tu nivel de comodidad técnica" 
  min={1} 
  max={10} 
  lowLabel="Evito el terminal" 
  highLabel="Despliego apps regularmente" 
  persistKey="custom-ai-agents-L8-technical-level" 
/>

**Regla de decisión:**

- **1-4**: Empieza con SaaS (Zapier o Make). Reconsidera el autoalojado en 6-12 meses si los costos se vuelven dolorosos.
- **5-7**: Prueba el autoalojado con una guía (plantilla de Railway + n8n). Presupuesta 4 horas para la configuración. Recurre al SaaS si te atascas.
- **8-10**: El autoalojado es obvio. Lo tendrás funcionando en 90 minutos y ahorrarás $1,500+/año.

### Factor 2: Sensibilidad al Presupuesto

<RangeSlider 
  label="¿Qué tan sensible al presupuesto eres?" 
  min={1} 
  max={10} 
  lowLabel="Pagaré por conveniencia" 
  highLabel="Cada $50/mes importa" 
  persistKey="custom-ai-agents-L8-budget-sensitivity" 
/>

**Regla de decisión:**

- **1-4**: SaaS. Tu tiempo vale más que los $150/mes de ahorro.
- **5-7**: Calcula tu punto de equilibrio. Si valoras tu tiempo en $100/hora, el autoalojado ahorra $1,500/año pero cuesta 5 horas/año de mantenimiento = $500 de costo de oportunidad. Ahorro neto: $1,000/año. ¿Vale la pena?
- **8-10**: Autoalojado. Los $1,500+/año de ahorro financian otras iniciativas de crecimiento (anuncios, herramientas, VA).

### Factor 3: Trayectoria de Escala

<RangeSlider 
  label="¿Cuántos prospectos procesarás en 6 meses?" 
  min={50} 
  max={1000} 
  lowLabel="50-100/mes" 
  highLabel="500-1000/mes" 
  persistKey="custom-ai-agents-L8-scale-trajectory" 
/>

**Regla de decisión:**

- **50-150/mes**: SaaS está bien. Zapier Starter ($20/mes) o Make Core ($10/mes) maneja este volumen.
- **150-300/mes**: SaaS empieza a ser caro (Zapier Professional a $49/mes). El autoalojado ahorra $30-40/mes.
- **300+/mes**: El autoalojado es esencial. Zapier Team ($69-99/mes) vs n8n ($7/mes VPS) = $62-92/mes de ahorro.

### Factor 4: Sensibilidad de Datos

<RangeSlider 
  label="¿Qué tan sensibles son los datos de tus prospectos?" 
  min={1} 
  max={10} 
  lowLabel="Solo info pública" 
  highLabel="Altamente confidencial" 
  persistKey="custom-ai-agents-L8-data-sensitivity" 
/>

**Regla de decisión:**

- **1-5**: SaaS está bien. Zapier/Make son SOC 2 conformes.
- **6-8**: Verifica las políticas de residencia de datos y subprocesadores del proveedor SaaS.
- **9-10**: Autoalojado. Control total sobre la ubicación de los datos, el cifrado y los registros de acceso.

### Factor 5: Tolerancia al Mantenimiento

<RangeSlider 
  label="¿Cuánto mantenimiento mensual puedes tolerar?" 
  min={0} 
  max={60} 
  lowLabel="Cero minutos" 
  highLabel="60+ minutos" 
  persistKey="custom-ai-agents-L8-maintenance-tolerance" 
/>

**Regla de decisión:**

- **0-15 min/mes**: SaaS. Quieres cero overhead de DevOps.
- **15-30 min/mes**: El autoalojado es viable. Las actualizaciones de n8n toman 10-15 min/mes.
- **30+ min/mes**: El autoalojado es fácil. Incluso puedes agregar monitoreo personalizado y flujos de trabajo avanzados.

---

## Arquitectura Híbrida: Lo Mejor de Ambos

Algunos solopreneurs ejecutan un **stack híbrido**:

- **SaaS para prototipado**: Construir y probar nuevos agentes en Zapier (iteración rápida, depuración fácil)
- **Autoalojado para producción**: Una vez que un agente está estable, migrarlo a n8n (costo más bajo, ejecuciones ilimitadas)

**Flujo de trabajo de ejemplo:**

1. Construir "Agente de Investigación de Prospectos" en Zapier (2 horas)
2. Probar con 20 prospectos, refinar el prompt y la lógica (1 semana)
3. Exportar la lógica del flujo, reconstruir en n8n (1 hora)
4. Ejecutar en producción en n8n (ilimitado, $0 costo de orquestación)

Este enfoque **minimiza el riesgo** (probar en SaaS) mientras **maximiza los ahorros** (ejecutar en autoalojado).

<InsightCard icon="🔄" title="El Camino de Migración">
La mayoría de los founders técnicos empiezan con SaaS, chocan con el muro de costos en 200-300 prospectos/mes, luego migran al autoalojado. La migración toma 3-6 horas (reconstruyendo 3-5 flujos en n8n) y se paga sola en 1-2 meses de ahorros.
</InsightCard>

---

## Consideraciones de Seguridad y Cumplimiento

Ambas arquitecturas requieren **higiene de seguridad**:

### Gestión de Claves API

**SaaS:**

- Zapier/Make almacenan claves API cifradas en reposo
- Acceso controlado via inicio de sesión de cuenta (2FA recomendado)
- Riesgo: Si tu cuenta de Zapier es comprometida, el atacante tiene todas tus claves API

**Autoalojado:**

- n8n almacena credenciales cifradas en PostgreSQL
- Variables de entorno para claves sensibles (secretos de Railway)
- Riesgo: Si tu VPS es comprometido, el atacante tiene acceso a la base de datos

**Mejores prácticas (ambas):**

- Usa claves API separadas para cada servicio (no reutilices)
- Rota las claves cada 90 días
- Habilita la lista blanca de IP donde esté disponible (Apollo, APIs del CRM)
- Monitorea el uso de la API para detectar anomalías

### Retención de Datos

**SaaS:**

- Zapier retiene logs de ejecución por 7-30 días (según el plan)
- Make retiene logs por 30 días
- Los datos del prospecto pasan por servidores del proveedor (cifrados en tránsito)

**Autoalojado:**

- Controlas la retención (los logs de PostgreSQL pueden guardarse indefinidamente o purgarse)
- Los datos del prospecto permanecen en tu VPS (nunca tocan servidores del proveedor excepto APIs LLM)

**Mejores prácticas (ambas):**

- Eliminar datos del prospecto de los logs después de 90 días (cumplimiento GDPR)
- Anonimizar los logs (eliminar emails, nombres) antes del almacenamiento a largo plazo
- Documentar los flujos de datos para solicitudes de GDPR/CCPA

### Checklist de Cumplimiento

<InteractiveChecklist
title="Checklist de Seguridad y Cumplimiento (Ambas Arquitecturas)"
persistKey="custom-ai-agents-L8-compliance"
items={[
"Claves API almacenadas cifradas (no en código de texto plano)",
"2FA habilitado en todas las cuentas (Zapier, Make, Railway, CRM)",
"Lista blanca de IP habilitada donde sea posible",
"Logs de ejecución purgados después de 90 días",
"Acuerdo de procesamiento de datos (DPA) firmado con el proveedor LLM (OpenAI/Anthropic)",
"Consentimiento del prospecto documentado (opt-in para alcance por email)",
"Estrategia de respaldo en su lugar (exportaciones del CRM semanales, exportaciones JSON de flujos n8n mensuales)",
"Plan de respuesta a incidentes (qué hacer si se filtran las claves API)"
]}
/>

---

## Guía de Migración: SaaS → Autoalojado

Si actualmente estás en SaaS y quieres migrar, aquí está el **camino paso a paso**:

### Fase 1: Preparación (Semana 1)

<InteractiveChecklist
title="Checklist de Preparación para la Migración"
persistKey="custom-ai-agents-L8-migration-prep"
items={[
"Exportar todos los flujos de Zapier/Make como documentación (capturas de pantalla + descripciones)",
"Listar todas las integraciones de API y confirmar que tienen APIs REST (para nodos HTTP de n8n)",
"Registrarse en Railway (nivel gratuito para empezar)",
"Desplegar n8n usando la plantilla de Railway (despliegue con 1 clic)",
"Configurar dominio personalizado (n8n.tudominio.com) y SSL"
]}
/>

### Fase 2: Reconstrucción (Semana 2)

<InteractiveChecklist
title="Checklist de Reconstrucción de Flujos"
persistKey="custom-ai-agents-L8-migration-rebuild"
items={[
"Reconstruir Agente 1 (Investigación de Prospectos) en n8n, probar con 5 prospectos",
"Reconstruir Agente 2 (Borrador de Email) en n8n, probar con 5 prospectos",
"Reconstruir Agente 3 (Enriquecimiento de CRM) en n8n, probar con 10 contactos",
"Configurar registro en PostgreSQL (historial de ejecución, uso de tokens)",
"Configurar webhook de Slack para notificaciones de errores"
]}
/>

### Fase 3: Ejecución Paralela (Semana 3)

<InteractiveChecklist
title="Checklist de Ejecución Paralela"
persistKey="custom-ai-agents-L8-migration-parallel"
items={[
"Ejecutar ambos agentes SaaS y autoalojados en los mismos prospectos (comparar salidas)",
"Verificar que las salidas de n8n coincidan con las de Zapier (briefs, borradores, enriquecimiento)",
"Monitorear los logs de ejecución de n8n para errores (corregir cualquier fallo)",
"Medir el rendimiento de n8n (tiempo de ejecución, confiabilidad)",
"Calcular ahorros reales (VPS + APIs vs SaaS)"
]}
/>

### Fase 4: Transición (Semana 4)

<InteractiveChecklist
title="Checklist de Transición"
persistKey="custom-ai-agents-L8-migration-cutover"
items={[
"Deshabilitar flujos de Zapier/Make (pausar, no eliminar todavía)",
"Dirigir todos los webhooks del CRM a n8n",
"Monitorear n8n durante 48 horas (asegurar que no se pierdan disparos)",
"Eliminar flujos de Zapier/Make (después de una ventana de seguridad de 7 días)",
"Bajar de categoría el plan de Zapier/Make (o cancelar)"
]}
/>

**Tiempo total de migración**: 10-15 horas en 4 semanas (2-4 horas/semana)

**Período de recuperación de la inversión**: 1-2 meses de ahorros de costos

---

## Tu Decisión de Arquitectura

Sinteticemos tus inputs en una **recomendación personalizada**:

<TemplateBuilder
title="Tu Marco de Decisión de Arquitectura"
persistKey="custom-ai-agents-L8-decision"
sections={[
{
id: "context",
title: "Tu Contexto",
fields: [
{ id: "technical", label: "Comodidad técnica (1-10)", placeholder: "De los sliders de arriba", type: "number" },
{ id: "budget", label: "Sensibilidad al presupuesto (1-10)", placeholder: "De los sliders de arriba", type: "number" },
{ id: "scale", label: "Prospectos/mes (actual + proyección a 6 meses)", placeholder: "ej. 150 ahora, 300 en 6 meses", type: "text" },
{ id: "time", label: "Tolerancia al mantenimiento (min/mes)", placeholder: "ej. 20 minutos", type: "number" }
]
},
{
id: "decision",
title: "Tu Decisión",
fields: [
{ id: "architecture", label: "Arquitectura elegida", placeholder: "SaaS / Autoalojado / Híbrido", type: "text" },
{ id: "rationale", label: "Por qué esta elección encaja con tu contexto", placeholder: "ej. Soy técnico (8/10) y sensible al presupuesto (9/10), así que el autoalojado ahorra $1,500/año con mínimo overhead", type: "textarea" },
{ id: "timeline", label: "Línea de tiempo de implementación", placeholder: "ej. Semana 1: Desplegar n8n. Semana 2: Reconstruir agentes. Semana 3: Probar. Semana 4: Transición.", type: "textarea" }
]
},
{
id: "risks",
title: "Mitigación de Riesgos",
fields: [
{ id: "risk1", label: "Riesgo principal", placeholder: "ej. Rompo algo durante la migración", type: "text" },
{ id: "mitigation1", label: "Plan de mitigación", placeholder: "ej. Ejecutar en paralelo por 2 semanas, mantener Zapier como respaldo", type: "text" },
{ id: "risk2", label: "Segundo riesgo", placeholder: "ej. n8n cae y pierdo leads", type: "text" },
{ id: "mitigation2", label: "Plan de mitigación", placeholder: "ej. Configurar alertas de Uptime Robot, tener respaldo de webhook del CRM", type: "text" }
]
}
]}
/>

---

## Ejemplos de Arquitecturas del Mundo Real

Veamos cómo **3 tipos diferentes de founders** eligieron sus arquitecturas:

<SlideNavigation>
<Slide title="Founder Técnico: Autoalojado">

**Perfil**: Marcus, founder de SaaS, experiencia técnica (ex-ingeniero)

**Contexto**:

- 250 prospectos/mes
- Comodidad técnica: 9/10
- Sensibilidad al presupuesto: 8/10 (bootstrapped)
- Tolerancia al mantenimiento: 30 min/mes

**Arquitectura**: Autoalojado (n8n en Railway)

**Stack**:

- n8n (autoalojado): $7/mes
- PostgreSQL (en Railway): incluido
- Nivel gratuito de Apollo: $0
- API de Claude: $35/mes
- **Total: $42/mes**

**Costo SaaS anterior**: $220/mes (Zapier Pro + créditos de Apollo)

**Ahorros anuales**: $2,136

**Tiempo de configuración**: 3 horas (despliegue en Railway + 3 flujos)

**Mantenimiento**: 20 min/mes (actualizaciones de n8n, revisión de logs)

**Opinión de Marcus**: "Pasé un sábado por la tarde configurando esto y ahora ahorro $2K/año. Eso equivale a 40 horas de tiempo de VA o 2 meses de anuncios en LinkedIn. Obviedad."

</Slide>

<Slide title="Founder No Técnico: SaaS">

**Perfil**: Lisa, negocio de coaching, no técnica

**Contexto**:

- 100 prospectos/mes
- Comodidad técnica: 3/10
- Sensibilidad al presupuesto: 5/10 (rentable, valora el tiempo)
- Tolerancia al mantenimiento: 0 min/mes

**Arquitectura**: SaaS (Make)

**Stack**:

- Make Pro: $18/mes
- Créditos de Apollo: $25/mes
- API de Claude: $18/mes
- **Total: $61/mes**

**¿Por qué no autoalojado?**: "Traté de seguir una guía de Railway y me atascé en las variables de entorno. Perdí 2 horas. Make tardó 30 minutos y simplemente funciona."

**Opinión de Lisa**: "Prefiero pasar esas 2 horas en llamadas de ventas. Los $40/mes de ahorro no valen el estrés."

</Slide>

<Slide title="Founder Híbrido: Lo Mejor de Ambos">

**Perfil**: David, creador de contenido convertido en founder de SaaS, habilidades técnicas moderadas

**Contexto**:

- 180 prospectos/mes
- Comodidad técnica: 6/10
- Sensibilidad al presupuesto: 7/10
- Tolerancia al mantenimiento: 15 min/mes

**Arquitectura**: Híbrido (Zapier para prototipado, n8n para producción)

**Stack**:

- Zapier Starter (para probar nuevos agentes): $20/mes
- n8n en Railway (para agentes estables): $7/mes
- Nivel gratuito de Apollo: $0
- API de Claude: $28/mes
- **Total: $55/mes**

**Flujo de trabajo**:

1. Construir nuevo agente en Zapier (iteración rápida)
2. Probar por 1-2 semanas
3. Migrar a n8n una vez estable
4. Mantener Zapier para experimentos ad-hoc

**Opinión de David**: "Obtengo la velocidad del SaaS para probar y los ahorros de costos del autoalojado para producción. Lo mejor de ambos mundos."

</Slide>
</SlideNavigation>

---

## Elementos de Acción: Elige Tu Camino

<InteractiveChecklist
title="Tus Próximos Pasos"
persistKey="custom-ai-agents-L8-actions"
items={[
"Completa el Marco de Decisión de Arquitectura (arriba) — documenta tu elección",
"Si SaaS: Regístrate en Make o Zapier, despliega tu primer agente para fin de semana",
"Si Autoalojado: Regístrate en Railway, despliega n8n usando la plantilla de 1 clic (30 min)",
"Si Híbrido: Regístrate en ambos, construye el primer agente en SaaS, planifica la línea de tiempo de migración",
"Calcula tu proyección de costos a 12 meses (usa las calculadoras de arriba)",
"Establece un recordatorio en el calendario para revisar la arquitectura en 6 meses (reevaluar al escalar)",
"Únete al Discord de n8n o la comunidad de Zapier (obtén ayuda cuando te atascas)"
]}
/>

---

## Quiz: Dominio de la Arquitectura

```json
{
  "questions": [
    {
      "id": "cost-comparison",
      "type": "multiple-choice",
      "question": "Procesas 250 prospectos/mes con 5 agentes activos. ¿Cuál es la diferencia de costo mensual aproximada entre SaaS (Zapier Pro) y autoalojado (n8n en Railway)?",
      "options": [
        "SaaS es $50-75/mes más barato",
        "El autoalojado es $50-75/mes más barato",
        "El autoalojado es $150-200/mes más barato",
        "Cuestan aproximadamente lo mismo"
      ],
      "correctAnswer": 2,
      "explanation": "SaaS (Zapier Pro + APIs) corre ~$200-250/mes. Autoalojado (Railway + APIs) corre ~$50-60/mes. Ahorros: $150-190/mes."
    },
    {
      "id": "technical-threshold",
      "type": "multiple-choice",
      "question": "¿Cuál es el nivel mínimo de comodidad técnica (1-10) donde el autoalojado se vuelve viable?",
      "options": [
        "1-2 (cualquiera puede hacerlo)",
        "3-4 (habilidades básicas de computadora)",
        "5-6 (cómodo con guías y resolución de problemas)",
        "8-10 (solo desarrolladores con experiencia)"
      ],
      "correctAnswer": 2,
      "explanation": "Con buenas guías (despliegue con 1 clic en Railway), el nivel de comodidad 5-6 es suficiente. Necesitas seguir instrucciones, pegar variables de entorno y depurar errores básicos."
    },
    {
      "id": "migration-time",
      "type": "multiple-choice",
      "question": "¿Cuánto tiempo toma una migración típica de SaaS → autoalojado para 3-5 agentes?",
      "options": [
        "2-4 horas (una sesión)",
        "10-15 horas (a lo largo de 2-4 semanas)",
        "40+ horas (tiempo completo por una semana)",
        "No es posible migrar"
      ],
      "correctAnswer": 1,
      "explanation": "Reconstruir 3-5 flujos en n8n toma 10-15 horas repartidas en 2-4 semanas (preparación, reconstrucción, prueba, transición). Se recupera la inversión en 1-2 meses de ahorros."
    },
    {
      "id": "hybrid-use-case",
      "type": "multiple-choice",
      "question": "¿Cuándo tiene más sentido una arquitectura híbrida (SaaS + autoalojado)?",
      "options": [
        "Nunca — elige uno y quédate con él",
        "Cuando quieres prototipar rápido en SaaS, luego migrar agentes estables al autoalojado",
        "Cuando eres no técnico y necesitas un respaldo",
        "Cuando tienes presupuesto ilimitado"
      ],
      "correctAnswer": 1,
      "explanation": "El híbrido funciona bien para founders iterativos: construir y probar en SaaS (rápido), migrar al autoalojado una vez estable (barato). Combina velocidad y ahorro."
    },
    {
      "id": "data-control",
      "type": "true-false",
      "question": "Verdadero o Falso: Con n8n autoalojado, los datos de tus prospectos nunca salen de tu infraestructura (excepto cuando llamas a APIs LLM).",
      "correctAnswer": true,
      "explanation": "Verdadero. n8n autoalojado corre en tu VPS. Los datos solo salen cuando llamas a APIs externas (LLMs, enriquecimiento). El SaaS pasa los datos por servidores del proveedor."
    },
    {
      "id": "maintenance-reality",
      "type": "multiple-choice",
      "question": "¿Cuál es el tiempo de mantenimiento mensual realista para n8n autoalojado?",
      "options": [
        "0 minutos (configura y olvida)",
        "5-10 minutos (revisiones rápidas de logs)",
        "15-30 minutos (actualizaciones + monitoreo)",
        "2+ horas (resolución de problemas constante)"
      ],
      "correctAnswer": 2,
      "explanation": "Realista: 15-30 min/mes. Las actualizaciones de n8n toman 10-15 min. La revisión de logs y el monitoreo añaden 5-10 min. La resolución de problemas es rara si los flujos son estables."
    }
  ]
}
```
