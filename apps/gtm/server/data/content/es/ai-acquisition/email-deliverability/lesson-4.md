---
title: "Estrategia de dominios: dominio principal + 3-5 dominios de envío"
duration: "55 min"
track: "Adquisición Impulsada por IA"
course: "Curso 22: Entregabilidad de Email e Infraestructura"
lesson: 4
---

# Estrategia de dominios: dominio principal + 3-5 dominios de envío

## El error de $40,000

Sarah lanzó su producto SaaS en enero de 2024. Para marzo, tenía 200 leads calificados de una conferencia. Los cargó en su CRM y envió una campaña de email en frío personalizada desde **hello@sarahsaas.com** — su dominio principal.

En menos de 48 horas:

- Gmail marcó su dominio por "patrones de envío inusuales"
- La puntuación de reputación de su dominio bajó de 95 a 32
- Los emails de soporte al cliente empezaron a caer en spam
- Sus emails de confirmación de pago de Stripe desaparecieron sin llegar
- Perdió 3 acuerdos por valor de $40K porque sus prospectos nunca vieron sus seguimientos

Tardó **4 meses** y una migración completa de dominio para recuperarse. Sus clientes tuvieron que poner en lista blanca un nuevo dominio. Su SEO sufrió. La confianza en su marca se dañó.

**¿La lección?** Nunca, jamás envíes email en frío desde tu dominio principal.

<InsightCard icon="🚨" title="La regla fundamental">
Tu dominio principal es el salvavidas de tu marca. Una sola queja de spam puede destruir años de confianza. Siempre separa el alcance en frío de tu dominio principal.
</InsightCard>

---

## Por qué importa la arquitectura multi-dominio

Piensa en la reputación de tu dominio como una puntuación de crédito. Cada email que envías es una transacción. Cada queja de spam, rebote o ignorada es una nota en tu contra.

Esto es lo que la mayoría de los fundadores no comprenden:

<FlipCard 
  front="¿Qué pasa cuando envías 200 emails en frío desde tu dominio principal?" 
  back="Incluso con un 1% de quejas (2 personas), los algoritmos de Gmail marcan todo tu dominio. Emails de clientes, restablecimientos de contraseña, facturas — todo cae en spam. La recuperación tarda 30-90 días." 
/>

Los números son devastadores:

- **200 emails en frío/día** desde un solo dominio
- **1% de quejas** = 2 quejas/día
- **Umbral de Google** = 0.1% (0.2 quejas por cada 200 emails)
- **Resultado:** Estás 10 veces por encima del límite desde el primer día

<ExampleCard label="Caso de estudio: El cortafuegos de dominios">
Marcus tiene un negocio de coaching de $50K/mes. Utiliza:
- **marcuscoaching.com** — sitio web, emails a clientes, entrega de cursos
- **getmarcuscoaching.com** — dominio de alcance en frío #1
- **trymarcuscoaching.com** — dominio de alcance en frío #2
- **himarcus.com** — dominio de alcance en frío #3

Cuando el dominio #2 cayó en una trampa de spam en el mes 3, solo la reputación de ese dominio bajó. Su dominio principal quedó intacto. Los emails a clientes siguieron llegando. Pausó el dominio #2 durante 60 días, rotó al dominio #4 y nunca perdió el ritmo.

**Costo de protección:** $36/año para 3 dominios extra. **Costo de no protegerse:** Potencialmente $50K/mes en ingresos perdidos.
</ExampleCard>

---

## La arquitectura recomendada

Esta es la configuración estándar de oro para fundadores solos que envían 200-400 emails/día:

<SlideNavigation>
<Slide title="Roles de los dominios">

### 1. Dominio principal (nunca tocar)

**Ejemplo:** `acme.com`

- Alojamiento del sitio web
- Emails de soporte al cliente
- Emails transaccionales (facturas, restablecimientos de contraseña)
- Respuestas de ventas entrantes
- **Volumen de email en frío:** 0

### 2. Dominios de envío (3-5 activos)

**Ejemplos:** `getacme.com`, `tryacme.com`, `hiacme.com`

- Solo alcance en frío
- 2-3 bandejas de entrada por dominio
- 30-50 emails/día por bandeja
- Rotados cada 3-6 meses

### 3. Dominio de respaldo/rotación (1-2)

**Ejemplo:** `useacme.com`

- Calentándose mientras otros están activos
- Listo para intercambiar si un dominio de envío es marcado
- Puede descansar un dominio quemado aquí durante 60-90 días

</Slide>

<Slide title="Distribución de volumen">

**Objetivo:** 200-400 emails en frío/día en total

| Dominio     | Bandejas | Emails/Bandeja/Día | Total/Día   |
| ----------- | -------- | ------------------ | ----------- |
| getacme.com | 3        | 30-40              | 90-120      |
| tryacme.com | 3        | 30-40              | 90-120      |
| hiacme.com  | 3        | 30-40              | 90-120      |
| useacme.com | 2        | 0 (calentando)     | 0           |
| **Total**   | **11**   | —                  | **270-360** |

**Margen:** Capacidad de 360, objetivo real de 250-300 envíos = margen de seguridad

</Slide>

<Slide title="Desglose de costos">

**Dominios (anual):**

- 4 dominios de envío × $12/año = **$48/año**

**Alojamiento de email (mensual):**

- 11 bandejas × $7.20/mes (Google Workspace) = **$79.20/mes**
- O 11 bandejas × $6/mes (Microsoft 365) = **$66/mes**

**Costo total de infraestructura:**

- **~$80-90/mes** para infraestructura de envío completa
- **~$1,000/año** todo incluido

Compara esto con el costo de quemar tu dominio principal: **No tiene precio.**

</Slide>
</SlideNavigation>

<RangeSlider 
  label="¿Cuántos emails en frío envías actualmente por día?" 
  min={0} 
  max={500} 
  step={50}
  lowLabel="0" 
  highLabel="500+" 
  persistKey="email-deliverability-L4-volume" 
/>

---

## Estrategia de nomenclatura de dominios

Tus dominios de envío necesitan parecer legítimos. Esto es lo que funciona:

### ✅ Patrones de dominio recomendados

<ClassifyExercise
title="Clasifica estos nombres de dominio"
persistKey="email-deliverability-L4-classify"
categories={[
{ id: "good", label: "Legítimo", color: "#10b981" },
{ id: "suspicious", label: "Sospechoso", color: "#ef4444" }
]}
items={[
{ id: "1", content: "getacme.com", correctCategory: "good" },
{ id: "2", content: "acme-offers.com", correctCategory: "suspicious" },
{ id: "3", content: "tryacme.com", correctCategory: "good" },
{ id: "4", content: "acme.xyz", correctCategory: "suspicious" },
{ id: "5", content: "hiacme.com", correctCategory: "good" },
{ id: "6", content: "acme123.com", correctCategory: "suspicious" },
{ id: "7", content: "useacme.com", correctCategory: "good" },
{ id: "8", content: "acme.io", correctCategory: "suspicious" }
]}
/>

### Reglas de nomenclatura

1. **Usa solo .com** — .io, .xyz, .co activan filtros de spam
2. **Agrega un prefijo, no un sufijo** — `getacme.com` > `acmesales.com`
3. **Que sea pronunciable** — Si no puedes decirlo en voz alta, no lo uses
4. **Evita números y guiones** — `acme-2.com` grita "dominio de spam"
5. **Que coincida con tu marca** — Debe sentirse como una variación legítima

<FlipCard 
  front="¿Por qué 'getacme.com' funciona mejor que 'acme.io'?" 
  back="Los dominios .com tienen la puntuación de confianza más alta con los filtros de email. Los .io/.xyz se asocian con dominios temporales o desechables. Además, 'get' es un prefijo común en SaaS que se siente legítimo." 
/>

---

## Antigüedad y reputación del dominio

Los dominios nuevos son como tarjetas de crédito nuevas — no tienen historial, por lo que los ISP los tratan con sospecha.

### La cronología de antigüedad del dominio

<ProgressiveReveal title="Ciclo de vida de la reputación del dominio" persistKey="email-deliverability-L4-reveal">
<RevealSection title="Días 1-14: Dominio infantil">

**Estado:** Reputación cero, máximo escrutinio

**Qué está pasando:**

- Registros DNS propagándose globalmente
- Los ISP construyendo el perfil inicial del remitente
- Sin datos históricos para juzgarte

**Qué debes hacer:**

- Configurar todos los registros DNS (SPF, DKIM, DMARC)
- Crear una página de destino básica (aunque sea de una sola página)
- Redirigir a tu dominio principal
- **Enviar cero emails en frío**

**¿Por qué esperar?** Enviar desde un dominio recién creado es como pedir un préstamo de $50K sin historial de crédito. Te rechazarán.

</RevealSection>

<RevealSection title="Días 15-30: Fase de calentamiento">

**Estado:** Construyendo reputación inicial

**Qué está pasando:**

- Los ISP observando tus patrones de envío
- Tasas de interacción siendo rastreadas
- Tasas de quejas siendo monitoreadas

**Qué debes hacer:**

- Comenzar el calentamiento con 5 emails/día
- Usar herramientas de calentamiento (MailReach, Instantly)
- Aumentar gradualmente a 20-30/día
- Monitorear la ubicación en bandeja de entrada diariamente

**Señales de alerta:**

- Ubicación en bandeja de entrada por debajo del 80%
- Cualquier queja de spam
- Tasa de rebote superior al 2%

</RevealSection>

<RevealSection title="Días 31-60: Dominio establecido">

**Estado:** Reputación moderada, escrutinio normal

**Qué está pasando:**

- La puntuación de reputación estabilizándose
- Los ISP tienen suficientes datos para juzgarte
- Patrones establecidos

**Qué debes hacer:**

- Alcanzar velocidad de crucero (30-50/día por bandeja)
- Mantener el calentamiento corriendo en segundo plano
- Monitorear semanalmente en lugar de diariamente
- Mantener &lt;0.05% de tasa de quejas

**Ya puedes:**

- Enviar al volumen objetivo
- Ejecutar pruebas A/B
- Escalar gradualmente

</RevealSection>

<RevealSection title="Días 61+: Dominio maduro">

**Estado:** Reputación establecida (buena o mala)

**Qué está pasando:**

- La reputación es pegajosa (difícil de cambiar rápidamente)
- Los patrones históricos importan más que los recientes
- La recuperación de incidentes tarda 30-90 días

**Qué debes hacer:**

- Mantener patrones de envío consistentes
- Mantener la tasa de quejas por debajo del 0.05%
- Rotar dominios cada 6-12 meses
- Descansar dominios proactivamente antes de que se quemen

**Señales de advertencia:**

- Disminución gradual en tasas de apertura
- Aumento de ubicación en carpeta de spam
- Tasas de rebote en aumento

</RevealSection>
</ProgressiveReveal>

<InsightCard icon="⏰" title="La regla de los 14 días">
Nunca envíes email en frío desde un dominio con menos de 14 días de antigüedad. El costo reputacional de apresurarse es 10 veces el tiempo ahorrado.
</InsightCard>

---

## Redireccionamiento y branding de dominios

Tus dominios de envío deben sentirse como extensiones legítimas de tu marca, no como alias aleatorios.

### La estrategia de página de destino

Cada dominio de envío debe tener:

1. **Una redirección a tu sitio principal** — `getacme.com` → `acme.com`
2. **O una página de destino simple** con:
   - Tu logo
   - Propuesta de valor en una oración
   - Enlace al sitio principal
   - Enlace a política de privacidad
   - Enlace para darse de baja

<ExampleCard label="Ejemplo: Página de destino mínima">

```html
<!-- getacme.com/index.html -->
<html>
  <head>
    <title>Acme - Automatización de ventas para equipos B2B</title>
  </head>
  <body style="font-family: Arial; text-align: center; padding: 50px;">
    <img src="logo.png" width="200" />
    <h1>Automatización de ventas para equipos B2B</h1>
    <p>Más información en <a href="https://acme.com">acme.com</a></p>
    <p>
      <a href="https://acme.com/privacy">Política de privacidad</a> |
      <a href="mailto:hello@acme.com?subject=Unsubscribe">Darse de baja</a>
    </p>
  </body>
</html>
```

**Por qué funciona:**

- Parece legítimo para los filtros de spam (contenido real, no dominio aparcado)
- Genera consistencia de marca
- Proporciona el enlace de cancelación requerido
- Tarda 10 minutos en configurarse

</ExampleCard>

### Consistencia de la firma de email

Tu firma de email debe hacer referencia a tu **dominio principal**, no al dominio de envío:

```
Sarah Chen
Fundadora, Acme
acme.com  ← Dominio principal
LinkedIn: linkedin.com/in/sarahchen
```

**No:**

```
Sarah Chen
Fundadora, Acme
getacme.com  ← Parece sospechoso
```

<TemplateBuilder
title="Tu plan de arquitectura de dominios"
persistKey="email-deliverability-L4-template"
sections={[
{
id: "main",
title: "Dominio principal",
fields: [
{ id: "domain", label: "Dominio principal", placeholder: "ej., acme.com", type: "text" },
{ id: "purpose", label: "Usado para", placeholder: "ej., Sitio web, emails de clientes, soporte", type: "textarea" }
]
},
{
id: "sending1",
title: "Dominio de envío #1",
fields: [
{ id: "name", label: "Nombre del dominio", placeholder: "ej., getacme.com", type: "text" },
{ id: "inboxes", label: "Número de bandejas de entrada", placeholder: "ej., 3", type: "number" },
{ id: "volume", label: "Volumen diario objetivo", placeholder: "ej., 90-120", type: "text" }
]
},
{
id: "sending2",
title: "Dominio de envío #2",
fields: [
{ id: "name", label: "Nombre del dominio", placeholder: "ej., tryacme.com", type: "text" },
{ id: "inboxes", label: "Número de bandejas de entrada", placeholder: "ej., 3", type: "number" },
{ id: "volume", label: "Volumen diario objetivo", placeholder: "ej., 90-120", type: "text" }
]
},
{
id: "sending3",
title: "Dominio de envío #3",
fields: [
{ id: "name", label: "Nombre del dominio", placeholder: "ej., hiacme.com", type: "text" },
{ id: "inboxes", label: "Número de bandejas de entrada", placeholder: "ej., 3", type: "number" },
{ id: "volume", label: "Volumen diario objetivo", placeholder: "ej., 90-120", type: "text" }
]
},
{
id: "backup",
title: "Dominio de respaldo/rotación",
fields: [
{ id: "name", label: "Nombre del dominio", placeholder: "ej., useacme.com", type: "text" },
{ id: "status", label: "Estado actual", placeholder: "ej., Calentando, Listo, Descansando", type: "text" }
]
},
{
id: "costs",
title: "Estimación de costos",
fields: [
{ id: "domains", label: "Total de dominios", placeholder: "ej., 4", type: "number" },
{ id: "inboxes-total", label: "Total de bandejas de entrada", placeholder: "ej., 11", type: "number" },
{ id: "monthly", label: "Costo mensual estimado", placeholder: "ej., $85", type: "text" }
]
}
]}
/>

---

## Retiro y rotación de dominios

Incluso los dominios saludables necesitan descanso. Aquí te explicamos cuándo y cómo rotar:

### El semáforo de salud del dominio

<SwipeDecision
title="Verificación de salud del dominio"
description="Desliza a la derecha para dominios saludables, a la izquierda para dominios que necesitan descanso"
optionA="Necesita descanso"
optionB="Saludable"
persistKey="email-deliverability-L4-swipe"
cards={[
{
id: "1",
content: "Tasa de quejas: 0.03%, Tasa de apertura: 22%, Ubicación en bandeja: 85%",
correctOption: "b",
explanation: "Todas las métricas saludables. Sigue enviando."
},
{
id: "2",
content: "Tasa de quejas: 0.12%, Tasa de apertura: 18%, Ubicación en bandeja: 72%",
correctOption: "a",
explanation: "Tasa de quejas por encima del umbral de 0.1%. Pausa inmediatamente."
},
{
id: "3",
content: "Tasa de quejas: 0.05%, Tasa de apertura: 15%, Ubicación en bandeja: 68%",
correctOption: "a",
explanation: "Ubicación en bandeja por debajo del 70% es una señal de alerta. Descansa por 30 días."
},
{
id: "4",
content: "Tasa de quejas: 0.02%, Tasa de apertura: 25%, Ubicación en bandeja: 90%",
correctOption: "b",
explanation: "Métricas excelentes. Este dominio tiene buen desempeño."
},
{
id: "5",
content: "Tasa de quejas: 0.08%, Tasa de apertura: 20%, Ubicación en bandeja: 78%",
correctOption: "a",
explanation: "Tasa de quejas acercándose a la zona de peligro. Reduce el volumen o descansa."
}
]}
/>

### Cuándo descansar un dominio

**Descanso inmediato (detén los envíos hoy):**

- Tasa de quejas superior al 0.1%
- Ubicación en bandeja por debajo del 60%
- Aparición en lista negra (verifica con MXToolbox)
- Caída repentina en tasas de apertura (descenso >30%)

**Descanso proactivo (rotación planificada):**

- Después de 6-12 meses de envío continuo
- Cuando la tasa de quejas tiende al alza (aunque esté por debajo del 0.1%)
- Antes de lanzar una nueva campaña a un ICP diferente
- Cuando quieras probar un nuevo ángulo de mensajes

### El protocolo de descanso y recuperación

<DecisionTree
title="Árbol de decisiones para recuperación de dominio"
persistKey="email-deliverability-L4-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "La ubicación en bandeja de entrada de tu dominio cayó al 65%. ¿Cuál es tu primer paso?",
choices: [
{ label: "Detener inmediatamente todos los envíos", nextNodeId: "stop" },
{ label: "Reducir el volumen en un 50%", nextNodeId: "reduce" },
{ label: "Verificar si está en lista negra", nextNodeId: "blacklist" }
]
},
{
id: "stop",
content: "Bien. Has detenido los envíos. ¿Ahora qué?",
choices: [
{ label: "Verificar Google Postmaster y SNDS", nextNodeId: "monitor" },
{ label: "Esperar 7 días y reanudar", nextNodeId: "wait-bad" }
]
},
{
id: "reduce",
content: "Reducir el volumen ayuda, pero un 65% de ubicación significa que algo está muy mal. Deberías detenerlo completamente.",
isTerminal: true,
outcome: "negative"
},
{
id: "blacklist",
content: "Verificar listas negras es inteligente, pero deberías detener los envíos primero para prevenir más daño.",
isTerminal: true,
outcome: "negative"
},
{
id: "monitor",
content: "Revisas Postmaster. La puntuación de reputación es 'Baja'. La tasa de spam es 0.15%. ¿Y ahora?",
choices: [
{ label: "Descansar el dominio por 60 días", nextNodeId: "rest-60" },
{ label: "Descansar el dominio por 30 días", nextNodeId: "rest-30" },
{ label: "Cambiar al dominio de respaldo inmediatamente", nextNodeId: "switch" }
]
},
{
id: "wait-bad",
content: "7 días no es suficiente para la recuperación de reputación. Reanudas los envíos y te marcan de nuevo de inmediato.",
isTerminal: true,
outcome: "negative"
},
{
id: "rest-60",
content: "Correcto. 60 días le dan al dominio tiempo para recuperarse. Cambias a tu dominio de respaldo y continúas enviando.",
isTerminal: true,
outcome: "positive"
},
{
id: "rest-30",
content: "30 días puede funcionar para problemas menores, pero una tasa de spam del 0.15% necesita 60+ días. Te arriesgas a quemar el dominio de nuevo.",
isTerminal: true,
outcome: "negative"
},
{
id: "switch",
content: "¡Sí! Cambia a tu dominio de respaldo inmediatamente. Deja el dominio dañado descansar por 60-90 días.",
isTerminal: true,
outcome: "positive"
}
]}
/>

### El calendario de rotación

**Estrategia de rotación proactiva:**

| Mes   | Dominio 1   | Dominio 2   | Dominio 3   | Dominio 4  |
| ----- | ----------- | ----------- | ----------- | ---------- |
| 1-3   | Enviando    | Enviando    | Enviando    | Calentando |
| 4-6   | Enviando    | Enviando    | Descansando | Enviando   |
| 7-9   | Enviando    | Descansando | Enviando    | Enviando   |
| 10-12 | Descansando | Enviando    | Enviando    | Enviando   |

**Beneficios:**

- Siempre tener 3 dominios activos
- Cada dominio descansa 3 meses al año
- Dominio de respaldo siempre listo
- Previene la fatiga de reputación

---

## La lista de verificación completa de configuración

<InteractiveChecklist
title="Lista de verificación de infraestructura multi-dominio"
persistKey="email-deliverability-L4-checklist"
items={[
"Identificar 4-5 variaciones de nombre de dominio (get-, try-, hi-, use-)",
"Comprar dominios (solo .com) en Namecheap o Cloudflare",
"Configurar Google Workspace o Microsoft 365 para cada dominio",
"Crear 2-3 bandejas de entrada por dominio de envío",
"Configurar SPF, DKIM y DMARC para cada dominio (Lección 2)",
"Configurar redirecciones de dominio o páginas de destino",
"Esperar 14+ días antes de enviar desde nuevos dominios",
"Iniciar el protocolo de calentamiento (Lección 6) para todas las bandejas",
"Configurar monitoreo (Google Postmaster, SNDS, GlockApps)",
"Crear calendario de rotación (qué dominios activos cuándo)",
"Documentar la arquitectura de dominios en tu Blueprint de Infraestructura",
"Configurar bandeja de entrada centralizada para respuestas (HubSpot o Gmail compartido)",
"Configurar el dominio de respaldo y mantenerlo en calentamiento"
]}
/>

---

## Análisis costo-beneficio

Hagamos los cálculos sobre si la infraestructura multi-dominio vale la pena:

<ScenarioSimulator
title="Calculadora de ROI de estrategia de dominios"
persistKey="email-deliverability-L4-simulator"
levers={[
{ id: "domains", label: "Número de dominios de envío", min: 1, max: 5, step: 1, defaultValue: 3 },
{ id: "inboxes", label: "Bandejas por dominio", min: 1, max: 5, step: 1, defaultValue: 3 },
{ id: "emailsPerInbox", label: "Emails por bandeja/día", min: 10, max: 50, step: 5, defaultValue: 30 }
]}
outputs={[
{ id: "totalInboxes", label: "Total de bandejas", formula: "domains * inboxes", unit: "", precision: 0 },
{ id: "dailyCapacity", label: "Capacidad diaria de emails", formula: "domains * inboxes * emailsPerInbox", unit: "emails", precision: 0 },
{ id: "monthlyCost", label: "Costo mensual de infraestructura", formula: "(domains * 1) + (domains * inboxes * 7.20)", unit: "$", precision: 2 },
{ id: "annualCost", label: "Costo anual de infraestructura", formula: "((domains * 1) + (domains * inboxes * 7.20)) * 12", unit: "$", precision: 2 }
]}
insight="Con `{domains}` dominios y {totalInboxes} bandejas, puedes enviar {dailyCapacity} emails/día de forma segura. Costo anual: ${annualCost}. Compara esto con el costo de quemar tu dominio principal (potencialmente $10K-100K+ en ingresos perdidos)."
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para fundadores técnicos">
Piensa en los dominios como microservicios. Tu dominio principal es tu API de producción — nunca pruebas código experimental allí. Los dominios de envío son tus entornos de staging. Si uno falla, lo intercambias sin tocar producción.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para coaches y consultores">
Tu dominio principal es tu reputación. Cada email de cliente, cada entrega de curso, cada confirmación de pago fluye a través de él. Enviar alcance en frío desde tu dominio principal es como usar tu número de teléfono personal para llamadas en frío — una sola queja de spam y toda la comunicación de tu negocio queda comprometida.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="Para creadores de contenido">
Tu dominio principal es tu marca de medios. Suscriptores de newsletter, estudiantes de cursos, socios de afiliados — todos confían en los emails de ese dominio. Mezclar el alcance en frío con la entrega de contenido es como publicar anuncios en tus Instagram Stories sin etiquetarlos. Erosiona la confianza rápidamente.
</ContextualNote>

---

## Errores comunes que evitar

<StrategyDuel
title="Dominio único vs. multi-dominio"
persistKey="email-deliverability-L4-duel"
scenario="Estás lanzando alcance en frío por primera vez. Tienes un presupuesto de $100/mes."
strategyA={{
    name: "Estrategia de dominio único",
    description: "Enviar todos los emails en frío desde el dominio principal para ahorrar dinero",
    pros: ["Menor costo ($7.20/mes por una bandeja)", "Más simple de gestionar", "Menos registros DNS que configurar"],
    cons: ["Una queja de spam puede destruir tu marca", "Sin respaldo si el dominio es marcado", "No puede escalar más de 50 emails/día con seguridad", "La recuperación tarda 30-90 días", "Riesgo para las comunicaciones con clientes"]
  }}
strategyB={{
    name: "Estrategia multi-dominio",
    description: "Configurar 3 dominios de envío + dominio principal",
    pros: ["Dominio principal protegido", "Puede escalar a 300+ emails/día", "Dominios de respaldo listos", "Riesgo aislado", "Infraestructura profesional"],
    cons: ["Mayor costo (~$85/mes)", "Configuración más compleja", "Más registros DNS que gestionar"]
  }}
expertVerdict="El multi-dominio gana siempre. El costo de $85/mes es un seguro contra un desastre de $10K-100K+. Los fundadores solos que se saltan este paso casi siempre se arrepienten en 3-6 meses. El mayor error de entregabilidad es enviar email en frío desde tu dominio principal."
/>

### Los 5 principales errores de estrategia de dominios

1. **Enviar email en frío desde tu dominio principal** — Ya lo cubrimos. No lo hagas.

2. **Usar dominios .io o .xyz para alcance en frío** — Los filtros de spam marcan estas extensiones con fuerza. Quédate con .com.

3. **No esperar 14 días antes de enviar** — Los dominios nuevos tienen reputación cero. Apresurarse = carpeta de spam inmediata.

4. **Tener demasiadas bandejas por dominio** — Más de 3-4 bandejas por dominio parece sospechoso. Distribuye en más dominios.

5. **No tener un dominio de respaldo listo** — Cuando un dominio es marcado, necesitas cambiar inmediatamente. Sin respaldo = días de envío perdidos.

<MiniRoleplay
  scenario="Un prospecto responde: '¿Por qué me envías un email desde getacme.com en lugar de acme.com? ¿Es esto una estafa?'"
  role="Eres el fundador respondiendo"
  persistKey="email-deliverability-L4-roleplay"
  modelResponse="¡Buena pregunta! Usamos getacme.com para el alcance saliente con el fin de mantener nuestro dominio principal (acme.com) enfocado en las comunicaciones con clientes. Es una práctica común para la entregabilidad de email. Puedes verificar que somos legítimos visitando acme.com — mismo equipo, misma empresa. Con gusto puedo continuar la conversación desde nuestro dominio principal si lo prefieres."
/>

---

## Tu plan estratégico de dominios

Ahora tienes todo lo que necesitas para construir una arquitectura de dominios a prueba de balas. Aquí está tu plan de implementación:

<InteractiveChecklist
title="Sprint de configuración de 7 días"
persistKey="email-deliverability-L4-sprint"
items={[
"Día 1: Hacer lluvia de ideas de 5 variaciones de nombre de dominio, verificar disponibilidad",
"Día 1: Comprar 4 dominios (solo .com) en Namecheap/Cloudflare",
"Día 2: Configurar Google Workspace o Microsoft 365 para cada dominio",
"Día 2: Crear 2-3 bandejas por dominio de envío (9-12 en total)",
"Día 3: Configurar registros DNS (SPF, DKIM, DMARC) para todos los dominios",
"Día 3: Configurar redirecciones de dominio o páginas de destino simples",
"Día 4: Verificar todos los registros DNS con MXToolbox",
"Día 4: Configurar monitoreo de Google Postmaster y Microsoft SNDS",
"Día 5: Crear bandeja de entrada centralizada para respuestas (HubSpot o Gmail compartido)",
"Día 5: Documentar la arquitectura de dominios en una hoja de cálculo",
"Día 6: Configurar herramientas de calentamiento (MailReach o Instantly) para todas las bandejas",
"Día 7: Iniciar el protocolo de calentamiento a 5 emails/día por bandeja",
"Día 7: Crear calendario de rotación para los próximos 12 meses"
]}
/>

### Próximos pasos

En la **Lección 5**, repasaremos la lista de verificación completa de configuración DNS paso a paso, con los registros exactos para copiar y pegar en cada dominio.

En la **Lección 6**, construiremos tu plan de calentamiento de 30 días para llevar tus bandejas de 5/día a 30-50/día de forma segura.

Pero primero, completa tu plan de arquitectura de dominios usando la plantilla anterior. Esta es la base de toda tu infraestructura de email.

---

## Evaluación: Dominio de la estrategia de dominios

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuál es la razón principal para nunca enviar email en frío desde tu dominio principal?",
      "options": [
        "Es más caro",
        "Una sola queja de spam puede destruir la reputación de email de tu marca",
        "Es más difícil rastrear métricas",
        "Los ISP bloquean automáticamente los dominios principales"
      ],
      "correctAnswer": 1,
      "explanation": "Tu dominio principal gestiona todas las comunicaciones con clientes, emails de soporte y mensajes transaccionales. Una queja de spam por alcance en frío puede marcar todo tu dominio, haciendo que los emails legítimos caigan en spam. La recuperación tarda 30-90 días y puede costar decenas de miles en ingresos perdidos."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Cuántos dominios de envío debería usar un fundador solo con objetivo de 200-400 emails/día?",
      "options": [
        "1 (solo el dominio principal)",
        "2 (principal + 1 de envío)",
        "3-5 (principal + 3-5 de envío)",
        "10+ (máxima redundancia)"
      ],
      "correctAnswer": 2,
      "explanation": "3-5 dominios de envío (además de tu dominio principal) proporcionan el equilibrio correcto de redundancia, escalabilidad y manejabilidad. Esto te permite rotar dominios, tener respaldos listos y escalar a 300-400+ emails/día de forma segura."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "¿Qué extensión de dominio deberías usar para dominios de alcance en frío?",
      "options": [
        ".io (moderno y orientado a la tecnología)",
        ".xyz (barato y disponible)",
        ".com (puntuación de confianza más alta)",
        ".co (corto y memorable)"
      ],
      "correctAnswer": 2,
      "explanation": "Los dominios .com tienen la puntuación de confianza más alta con los filtros de email. Las extensiones alternativas .io, .xyz y otras se asocian con dominios temporales o desechables y activan filtros de spam con más agresividad."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Cuánto tiempo deberías esperar antes de enviar emails en frío desde un dominio recién creado?",
      "options": [
        "0 días (comenzar inmediatamente)",
        "3-5 días (espera mínima)",
        "14+ días (mínimo recomendado)",
        "90 días (máxima seguridad)"
      ],
      "correctAnswer": 2,
      "explanation": "Los dominios nuevos necesitan un mínimo de 14 días para madurar antes de enviar emails en frío. Esto permite que los registros DNS se propaguen globalmente y da tiempo a los ISP para construir un perfil inicial del remitente. Enviar desde un dominio con menos de 14 días aumenta significativamente el riesgo de caer en spam."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "¿Cuándo deberías dejar de enviar desde un dominio inmediatamente?",
      "options": [
        "Cuando las tasas de apertura bajan un 10%",
        "Cuando la tasa de quejas supera el 0.1%",
        "Cuando llevas 6 meses enviando",
        "Cuando recibes tu primera cancelación de suscripción"
      ],
      "correctAnswer": 1,
      "explanation": "Una tasa de quejas superior al 0.1% es el umbral de peligro de Google y Yahoo. Al 0.3%, comienzan a bloquear tu dominio completamente. Si llegas al 0.1%, detén los envíos inmediatamente, investiga la causa y descansa el dominio por 60-90 días."
    },
    {
      "id": "q6",
      "type": "multiple-choice",
      "question": "¿Cuál es el número máximo recomendado de bandejas de entrada por dominio de envío?",
      "options": [
        "1 bandeja (un dominio, una bandeja)",
        "2-3 bandejas (recomendado)",
        "5-10 bandejas (maximizar volumen)",
        "Sin límite (sin restricciones)"
      ],
      "correctAnswer": 1,
      "explanation": "2-3 bandejas por dominio es el punto ideal. Más de 3-4 bandejas por dominio empieza a parecer sospechoso para los ISP y aumenta el riesgo de que todo el dominio sea marcado si una bandeja tiene problemas."
    },
    {
      "id": "q7",
      "type": "true-false",
      "question": "Verdadero o Falso: Deberías usar tu dominio principal en tu firma de email aunque envíes desde un dominio de envío.",
      "options": ["Verdadero", "Falso"],
      "correctAnswer": 0,
      "explanation": "Verdadero. Tu firma de email siempre debe hacer referencia a tu dominio principal (ej., acme.com), no al dominio de envío (ej., getacme.com). Esto genera consistencia de marca y legitimidad. El dominio de envío es solo infraestructura — tu marca es tu dominio principal."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "¿Qué deberías hacer con un dominio de envío que ha sido marcado por spam?",
      "options": [
        "Eliminarlo inmediatamente y comprar uno nuevo",
        "Reducir el volumen de envío un 50% y continuar",
        "Dejarlo descansar por 60-90 días mientras usas un dominio de respaldo",
        "Cambiar a un proveedor de email diferente"
      ],
      "correctAnswer": 2,
      "explanation": "Deja descansar el dominio marcado por 60-90 días para permitir la recuperación de reputación. Cambia a tu dominio de respaldo inmediatamente para continuar enviando. Nunca elimines un dominio — puedes recuperarlo con tiempo. Reducir el volumen no repara el daño reputacional."
    },
    {
      "id": "q9",
      "type": "multiple-choice",
      "question": "¿Cuál es el costo mensual estimado de una infraestructura multi-dominio completa (4 dominios, 11 bandejas)?",
      "options": ["$20-30/mes", "$50-60/mes", "$80-90/mes", "$150-200/mes"],
      "correctAnswer": 2,
      "explanation": "4 dominios × $1/mes = $4. 11 bandejas × $7.20/mes (Google Workspace) = $79.20. Total: ~$83/mes. Este es el costo de seguro para proteger tu dominio principal y escalar de forma segura a 300-400 emails/día."
    },
    {
      "id": "q10",
      "type": "multiple-choice",
      "question": "¿Qué patrón de nombre de dominio es más legítimo para el alcance en frío?",
      "options": ["acme-sales.com", "acme123.com", "getacme.com", "acme.xyz"],
      "correctAnswer": 2,
      "explanation": "getacme.com sigue la mejor práctica de agregar un prefijo (get-, try-, hi-, use-) al nombre de tu marca con extensión .com. Esto parece una variación legítima de la marca. Los guiones, números y extensiones alternativas (.xyz) activan los filtros de spam."
    }
  ]
}
```
