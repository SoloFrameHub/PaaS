---
title: "Puntaje de salud simple: Uso + Engagement + Negocio"
duration: "55 min"
track: "Éxito del Cliente"
course: "Curso 37: Retención y Prevención de Abandono"
lesson: 2
---

Estás mirando tu lista de clientes. 87 cuentas activas. Sabes que _alguien_ está a punto de abandonar — lo puedes sentir — pero no sabes _quién_.

El mes pasado, tres clientes cancelaron sin aviso. Sin correos molestos. Sin tickets de soporte. Simplemente... dejaron de iniciar sesión, y luego cancelaron en silencio. Perdiste $450 en MRR antes de darte cuenta.

**Este es el problema del "abandonador silencioso".** Y te está costando miles.

La solución no es trabajar más duro o hacer check-in con cada cliente cada semana. La solución es un **puntaje de salud** — un sistema de alerta temprana simple que convierte "creo que alguien podría abandonar" en "el puntaje de salud del cliente #47 bajó de 85 a 62 esta semana — llámalo hoy."

En esta lección, vas a construir un sistema de puntaje de salud usando tres dimensiones: Uso (40%), Engagement (30%) y Negocio (30%). No se necesitan herramientas empresariales. Solo una Google Sheet, tus fuentes de datos existentes, y 55 minutos.

Al final, tendrás un dashboard funcional de puntaje de salud que señala clientes en riesgo 2-4 semanas antes de que abandonen.

---

## Por qué importan los puntajes de salud (y por qué el tuyo será simple)

<InsightCard icon="🎯" title="El problema central">
Sin un puntaje de salud, estás volando a ciegas. Reaccionas a las cancelaciones en lugar de prevenirlas. Con un puntaje de salud, ves las señales de advertencia 2-4 semanas antes — cuando las tasas de salvamento aún son del 40-60%.
</InsightCard>

Esto es lo que muestran los datos:

- Las empresas con puntajes de salud **detectan clientes en riesgo 45% más rápido** que las que confían en el instinto
- Las señales basadas en uso son **2-3x más predictivas** del abandono que las señales basadas en encuestas (el NPS solo no es suficiente)
- Los puntajes de salud no necesitan ser complejos: **3-5 inputs superan a los modelos de 15+ inputs** para PyMEs

Las plataformas empresariales de CS (Gainsight, Totango) cobran $500-2,000/mes por puntajes de salud. Tú vas a construir el tuyo en una Google Sheet gratis.

<FlipCard
  front="¿Por qué los puntajes de salud simples funcionan mejor para fundadores en solitario?"
  back="Porque realmente puedes mantenerlos. Un modelo de 15 inputs requiere mantenimiento constante del pipeline de datos. Un modelo de 3 dimensiones (Uso, Engagement, Negocio) funciona con datos que ya tienes y se actualiza semanalmente con esfuerzo mínimo."
/>

### Las tres preguntas que tu puntaje de salud responde

Todo puntaje de salud existe para responder tres preguntas:

1. **¿Están usando el producto?** (Dimensión de Uso — 40% de peso)
2. **¿Están comprometidos con nosotros?** (Dimensión de Engagement — 30% de peso)
3. **¿La relación comercial está sana?** (Dimensión de Negocio — 30% de peso)

Si la respuesta a las tres es "sí", el cliente está en Verde (puntaje de salud 75-100). Si una dimensión está débil, están en Amarillo (50-74). Si dos o más están débiles, están en Rojo (0-49).

<RangeSlider
  label="¿Qué tan seguro estás de que podrías identificar a tus 3 clientes más en riesgo ahora mismo?"
  min={1}
  max={10}
  lowLabel="Ni idea"
  highLabel="Muy seguro"
  persistKey="retention-L2-confidence"
/>

---

## El modelo de puntaje de salud de tres dimensiones

Aquí está el framework que vas a construir:

<SlideNavigation>
<Slide title="Dimensión 1: Uso (40% de peso)">

**El uso es el predictor más fuerte de retención.** Si un cliente deja de usar tu producto, va a abandonar. Punto.

Las tres señales de uso que vas a rastrear:

| Señal                                                | Puntuación                                                                                                        | Fuente de datos             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **Frecuencia de inicio de sesión (últimos 14 días)** | 0 logins = 0<br/>1-3 = 25<br/>4-7 = 50<br/>8-10 = 75<br/>11+ = 100                                                | Analítica de producto / GA4 |
| **Frecuencia de acción principal**                   | Sin acciones = 0<br/>Debajo del promedio = 25<br/>Promedio = 50<br/>Arriba del promedio = 75<br/>Power user = 100 | Base de datos del producto  |
| **Amplitud de funcionalidades**                      | 1 funcionalidad = 25<br/>2 funcionalidades = 50<br/>3+ funcionalidades = 75<br/>Todas las funcionalidades = 100   | Analítica de producto       |

**¿Por qué estas tres?**

- **Frecuencia de inicio de sesión** detecta la inactividad temprano (antes de que se desconecten mentalmente)
- **Frecuencia de acción principal** mide si están obteniendo valor cuando inician sesión
- **Amplitud de funcionalidades** mide los costos de cambio (los clientes que usan 3+ funcionalidades abandonan 50-70% menos)

**Tu puntaje de uso** = promedio de estas tres señales.

<ExampleCard label="Ejemplo real: Herramienta de dashboard SaaS">
Cliente A: 15 logins (100) + 50 acciones/semana (75) + usa 4 funcionalidades (75) = **Puntaje de Uso: 83**

Cliente B: 2 logins (25) + 5 acciones/semana (25) + usa 1 funcionalidad (25) = **Puntaje de Uso: 25** ← BANDERA ROJA
</ExampleCard>

</Slide>

<Slide title="Dimensión 2: Engagement (30% de peso)">

**El engagement mide si están prestando atención.** Un cliente que ignora tus correos, nunca contacta soporte, y se salta tus webinars está mentalmente desconectado — incluso si aún inicia sesión.

Las tres señales de engagement que vas a rastrear:

| Señal                                           | Puntuación                                                                                     | Fuente de datos                           |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Tasa de apertura de email (últimos 30 días)** | 0% = 0<br/>&lt;10% = 25<br/>10-25% = 50<br/>25-50% = 75<br/>50%+ = 100                         | ESP (Brevo, ConvertKit, etc.)             |
| **Interacción con soporte**                     | Sin contacto nunca = 50<br/>Preguntas hechas = 75<br/>Feedback dado = 100<br/>Solo quejas = 25 | Herramienta de soporte / email / WhatsApp |
| **Puntaje NPS**                                 | 0-4 = 0<br/>5-6 = 25<br/>7-8 = 50<br/>9 = 75<br/>10 = 100                                      | Encuesta NPS                              |

**¿Por qué estas tres?**

- **Tasa de apertura de email** es una señal pasiva de engagement (¿siquiera están viendo tus actualizaciones?)
- **Interacción con soporte** es una señal activa de engagement — y contraintuitivamente, los clientes que envían tickets son **15% menos propensos a abandonar** que los que nunca te contactan (comprometidos vs. desconectados)
- **Puntaje NPS** captura el sentimiento (aunque es un indicador rezagado, así que dale el menor peso)

**Tu puntaje de engagement** = promedio de estas tres señales.

<InsightCard icon="⚠️" title="La trampa del 'nunca contactó'">
Un cliente que nunca escribe a soporte no necesariamente está feliz — podría estar silenciosamente frustrado. Por eso "sin contacto nunca" recibe 50 (neutral), no 100. Las preguntas y el feedback puntúan más alto porque indican engagement.
</InsightCard>

</Slide>

<Slide title="Dimensión 3: Negocio (30% de peso)">

**Las señales de negocio miden la salud comercial de la relación.** ¿Están pagando a tiempo? ¿Están en un plan de alto valor? ¿Han estado contigo el tiempo suficiente para ser sticky?

Las tres señales de negocio que vas a rastrear:

| Señal                  | Puntuación                                                                  | Fuente de datos                                |
| ---------------------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| **Historial de pagos** | Pagos fallidos = 0<br/>Tarde = 25<br/>A tiempo = 75<br/>Prepago anual = 100 | Stripe / Mercado Pago / sistema de facturación |
| **Nivel del plan**     | Gratuito = 25<br/>Básico = 50<br/>Pro = 75<br/>Enterprise = 100             | Sistema de facturación                         |
| **Antigüedad**         | &lt;30 días = 25<br/>1-3 meses = 50<br/>3-12 meses = 75<br/>12+ meses = 100 | CRM / fecha de registro                        |

**¿Por qué estas tres?**

- **Historial de pagos** es el indicador líder definitivo — los pagos fallidos predicen el abandono en 7-14 días
- **Nivel del plan** se correlaciona con el compromiso y los costos de cambio (los clientes enterprise abandonan menos)
- **Antigüedad** mide la adhesión (los clientes que sobreviven los primeros 90 días tienen 3-5x más probabilidad de quedarse)

**Tu puntaje de negocio** = promedio de estas tres señales.

</Slide>

<Slide title="Cálculo del puntaje de salud compuesto">

Ahora combinas las tres dimensiones con promedios ponderados:

**Puntaje de salud compuesto** = (Uso × 0.4) + (Engagement × 0.3) + (Negocio × 0.3)

**Ejemplo:**

- Puntaje de Uso: 83
- Puntaje de Engagement: 60
- Puntaje de Negocio: 75

**Puntaje de salud compuesto** = (83 × 0.4) + (60 × 0.3) + (75 × 0.3) = 33.2 + 18 + 22.5 = **73.7**

Este cliente está en **Amarillo** (rango 50-74) — no urgente, pero necesita atención proactiva.

<FlipCard
  front="¿Por qué el Uso tiene peso de 40% y los otros 30%?"
  back="Porque el uso es el predictor más fuerte de abandono. Un cliente que usa el producto pero ignora los correos podría quedarse. Un cliente que dejó de usar el producto va a abandonar, incluso si está pagando a tiempo."
/>

</Slide>
</SlideNavigation>

---

## Zonas de salud y disparadores de acción

Tu puntaje de salud compuesto se mapea a tres zonas:

<ClassifyExercise
title="Clasifica estos clientes por zona de salud"
persistKey="retention-L2-classify"
categories={[
{ id: "green", label: "Verde (75-100)", color: "#10b981" },
{ id: "yellow", label: "Amarillo (50-74)", color: "#f59e0b" },
{ id: "red", label: "Rojo (0-49)", color: "#ef4444" }
]}
items={[
{ id: "1", content: "Puntaje de salud: 88 — Alto uso, alto engagement, plan anual", correctCategory: "green" },
{ id: "2", content: "Puntaje de salud: 62 — Uso moderado, baja apertura de emails, pagos a tiempo", correctCategory: "yellow" },
{ id: "3", content: "Puntaje de salud: 34 — Sin logins en 14 días, pago fallido, NPS = 4", correctCategory: "red" },
{ id: "4", content: "Puntaje de salud: 78 — Logins diarios, 3 funcionalidades usadas, 6 meses de antigüedad", correctCategory: "green" },
{ id: "5", content: "Puntaje de salud: 51 — 2 logins esta semana, sin contacto de soporte nunca, plan básico", correctCategory: "yellow" }
]}
/>

### Qué hacer en cada zona

| Zona         | Puntaje | Acción                                                        | Cadencia           |
| ------------ | ------- | ------------------------------------------------------------- | ------------------ |
| **Verde**    | 75-100  | Monitorear + oportunidad de expansión                         | Revisión mensual   |
| **Amarillo** | 50-74   | Alcance proactivo + nudges de funcionalidades                 | Revisión semanal   |
| **Rojo**     | 0-49    | Intervención urgente: llamada personal + jugada de salvamento | Dentro de 48 horas |

<InsightCard icon="🎯" title="La zona amarilla es donde ganas">
Los clientes amarillos (50-74) tienen una **tasa de salvamento del 40-60%** con intervención. Los clientes rojos (&lt;50) solo tienen una **tasa de salvamento del 10-15%**. Tu meta es atrapar clientes en amarillo antes de que caigan a rojo.
</InsightCard>

---

## Construyendo tu dashboard de puntaje de salud (Construcción guiada)

Ahora vas a construir tu dashboard real de puntaje de salud. Necesitarás:

- Google Sheets (o Excel)
- Acceso a tu analítica de producto (GA4, Mixpanel, o tu base de datos)
- Acceso a tu ESP (Brevo, ConvertKit, Mailchimp, etc.)
- Acceso a tu sistema de facturación (Stripe, Mercado Pago, etc.)

<TemplateBuilder
title="Tu dashboard de puntaje de salud"
persistKey="retention-L2-dashboard"
sections={[
{
id: "usage",
title: "Dimensión de Uso (40%)",
fields: [
{ id: "loginMetric", label: "¿Cómo vas a rastrear los logins?", placeholder: "ej., evento GA4 'user_login' o consulta a base de datos", type: "text" },
{ id: "coreAction", label: "¿Cuál es tu acción principal?", placeholder: "ej., 'reporte_creado' o 'campaña_enviada'", type: "text" },
{ id: "featureList", label: "Lista tus funcionalidades rastreables (separadas por coma)", placeholder: "ej., Dashboard, Reportes, Integraciones, API", type: "textarea" }
]
},
{
id: "engagement",
title: "Dimensión de Engagement (30%)",
fields: [
{ id: "emailSource", label: "¿De dónde obtienes las tasas de apertura de email?", placeholder: "ej., analítica de Brevo, reportes de Mailchimp", type: "text" },
{ id: "supportSource", label: "¿Dónde rastrear las interacciones de soporte?", placeholder: "ej., Intercom, tags de email, base de datos en Notion, WhatsApp", type: "text" },
{ id: "npsFrequency", label: "¿Con qué frecuencia envías encuestas NPS?", placeholder: "ej., Trimestral, después de 30 días, nunca (¡empieza ahora!)", type: "text" }
]
},
{
id: "business",
title: "Dimensión de Negocio (30%)",
fields: [
{ id: "billingSystem", label: "¿Qué sistema de facturación usas?", placeholder: "ej., Stripe, Mercado Pago, PayPal", type: "text" },
{ id: "planTiers", label: "Lista tus niveles de plan (separados por coma)", placeholder: "ej., Gratuito, Básico ($29), Pro ($99), Enterprise ($299)", type: "text" },
{ id: "signupDateSource", label: "¿Dónde está almacenada la fecha de registro?", placeholder: "ej., metadata de Stripe, CRM, base de datos de usuarios", type: "text" }
]
}
]}
/>

### Construcción paso a paso del dashboard

<ProgressiveReveal title="Construye tu dashboard (Haz clic para expandir cada paso)" persistKey="retention-L2-reveal">
<RevealSection title="Paso 1: Configura la estructura de tu hoja de cálculo">

Crea una Google Sheet con estas columnas:

| Columna                            | Descripción                           |
| ---------------------------------- | ------------------------------------- |
| A: Nombre del cliente              | De tu CRM o sistema de facturación    |
| B: Email                           | Para referencia                       |
| C: MRR                             | Ingreso recurrente mensual            |
| D: Conteo de logins (14d)          | De analítica de producto              |
| E: Acciones principales (14d)      | De base de datos del producto         |
| F: Funcionalidades usadas          | Conteo de funcionalidades distintas   |
| G: Puntaje de uso                  | Calculado (ver fórmula abajo)         |
| H: Tasa de apertura de email (30d) | De ESP                                |
| I: Interacciones de soporte        | Conteo o categoría                    |
| J: Puntaje NPS                     | Último puntaje                        |
| K: Puntaje de engagement           | Calculado                             |
| L: Estado de pago                  | A tiempo / Tarde / Fallido            |
| M: Nivel del plan                  | Gratuito / Básico / Pro / Enterprise  |
| N: Antigüedad (días)               | Días desde el registro                |
| O: Puntaje de negocio              | Calculado                             |
| P: **Puntaje de salud compuesto**  | **(G × 0.4) + (K × 0.3) + (O × 0.3)** |
| Q: Zona                            | Verde / Amarillo / Rojo               |

**Fórmula para Columna P (Puntaje de salud compuesto):**

```
=(G2*0.4)+(K2*0.3)+(O2*0.3)
```

**Fórmula para Columna Q (Zona):**

```
=IF(P2>=75,"Verde",IF(P2>=50,"Amarillo","Rojo"))
```

</RevealSection>

<RevealSection title="Paso 2: Llena los datos de uso">

**Para cada cliente, calcula:**

1. **Conteo de logins (Columna D):** Consulta tu analítica de producto para logins en los últimos 14 días
   - 0 logins → 0
   - 1-3 → 25
   - 4-7 → 50
   - 8-10 → 75
   - 11+ → 100

2. **Acciones principales (Columna E):** Conteo de tu acción principal (ej., "reportes creados") en los últimos 14 días
   - Compara con tu promedio de todos los clientes
   - Menos del 50% del promedio → 25
   - 50-100% del promedio → 50
   - 100-150% del promedio → 75
   - 150%+ del promedio → 100

3. **Funcionalidades usadas (Columna F):** Conteo de funcionalidades distintas usadas en los últimos 30 días
   - 1 funcionalidad → 25
   - 2 funcionalidades → 50
   - 3+ funcionalidades → 75
   - Todas las funcionalidades → 100

**Puntaje de uso (Columna G):**

```
=AVERAGE(D2,E2,F2)
```

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para fundadores técnicos">
Puedes automatizar esto con una consulta SQL o llamada API. Exporta a CSV semanalmente e importa a tu hoja. Ejemplo SQL:

```sql
SELECT
  user_id,
  COUNT(DISTINCT DATE(login_at)) as login_days,
  COUNT(core_action_id) as core_actions,
  COUNT(DISTINCT feature_id) as features_used
FROM events
WHERE created_at >= NOW() - INTERVAL 14 DAY
GROUP BY user_id
```

</ContextualNote>

</RevealSection>

<RevealSection title="Paso 3: Llena los datos de engagement">

**Para cada cliente, calcula:**

1. **Tasa de apertura de email (Columna H):** De tu ESP, obtén la tasa de apertura de los últimos 30 días
   - 0% → 0
   - &lt;10% → 25
   - 10-25% → 50
   - 25-50% → 75
   - 50%+ → 100

2. **Interacciones de soporte (Columna I):** Conteo o categorización
   - Sin contacto nunca → 50
   - Preguntas hechas → 75
   - Feedback dado → 100
   - Solo quejas → 25

3. **Puntaje NPS (Columna J):** Última respuesta NPS
   - 0-4 → 0
   - 5-6 → 25
   - 7-8 → 50
   - 9 → 75
   - 10 → 100

**Puntaje de engagement (Columna K):**

```
=AVERAGE(H2,I2,J2)
```

</RevealSection>

<RevealSection title="Paso 4: Llena los datos de negocio">

**Para cada cliente, calcula:**

1. **Estado de pago (Columna L):** De Stripe/Mercado Pago/sistema de facturación
   - Pagos fallidos → 0
   - Tarde → 25
   - A tiempo → 75
   - Prepago anual → 100

2. **Nivel del plan (Columna M):** Del sistema de facturación
   - Gratuito → 25
   - Básico → 50
   - Pro → 75
   - Enterprise → 100

3. **Antigüedad (Columna N):** Días desde el registro
   - &lt;30 días → 25
   - 1-3 meses → 50
   - 3-12 meses → 75
   - 12+ meses → 100

**Puntaje de negocio (Columna O):**

```
=AVERAGE(L2,M2,N2)
```

</RevealSection>

<RevealSection title="Paso 5: Calcula el puntaje compuesto y la zona">

Tus fórmulas del Paso 1 ahora calcularán automáticamente:

- **Columna P (Puntaje de salud compuesto):** `=(G2*0.4)+(K2*0.3)+(O2*0.3)`
- **Columna Q (Zona):** `=IF(P2>=75,"Verde",IF(P2>=50,"Amarillo","Rojo"))`

**Agrega formato condicional:**

- Zona verde (75-100): fondo verde claro
- Zona amarilla (50-74): fondo amarillo claro
- Zona roja (0-49): fondo rojo claro

**Ordena por Columna P (Puntaje de salud) ascendente** para ver tus clientes más en riesgo arriba.

</RevealSection>
</ProgressiveReveal>

---

## Probando tu modelo de puntaje de salud

Has construido el dashboard. Ahora necesitas validar que realmente predice el abandono.

<SwipeDecision
title="¿Sano o en riesgo?"
description="Desliza a la derecha para clientes sanos, a la izquierda para los que están en riesgo"
optionA="En riesgo"
optionB="Sano"
persistKey="retention-L2-swipe"
cards={[
{
id: "1",
content: "Puntaje de salud: 42 — 1 login este mes, 0% apertura de emails, pago fallido",
correctOption: "a",
explanation: "Zona roja (0-49). Este cliente necesita intervención urgente dentro de 48 horas."
},
{
id: "2",
content: "Puntaje de salud: 81 — Logins diarios, 4 funcionalidades usadas, plan anual, NPS = 9",
correctOption: "b",
explanation: "Zona verde (75-100). Monitorea mensualmente y busca oportunidades de expansión."
},
{
id: "3",
content: "Puntaje de salud: 58 — 5 logins esta semana, 15% apertura de emails, pagos a tiempo, plan básico",
correctOption: "a",
explanation: "Zona amarilla (50-74). No es urgente, pero necesita alcance proactivo esta semana para evitar que caiga a rojo."
},
{
id: "4",
content: "Puntaje de salud: 91 — Power user (20+ logins/semana), envió 3 solicitudes de funcionalidades, plan enterprise",
correctOption: "b",
explanation: "Zona verde. Este es tu cliente ideal — comprometido, de alto valor y pegajoso."
},
{
id: "5",
content: "Puntaje de salud: 67 — Uso moderado (7 logins), sin contacto de soporte nunca, 2 meses de antigüedad",
correctOption: "a",
explanation: "Zona amarilla. El 'sin contacto de soporte nunca' combinado con uso moderado sugiere desconexión. Contacta proactivamente."
}
]}
/>

### Ejercicio de validación: Mira hacia atrás

<ExampleCard label="Método de validación real">
Toma tus últimos 10 clientes que abandonaron. Calcula sus puntajes de salud 30 días antes de que cancelaran.

**Si tu modelo está funcionando:**

- 70-80% de los clientes que abandonaron deberían haber estado en Rojo (&lt;50) o Amarillo (50-74) 30 días antes de cancelar
- 90%+ deberían haber estado en Amarillo o Rojo 14 días antes de cancelar

**Si tu modelo no está funcionando:**

- Ajusta tus umbrales de puntuación (quizás 5 logins/semana es "normal" para tu producto, no 8)
- Agrega una señal que te falta (ej., uso de API para herramientas de desarrolladores)
- Pondera las dimensiones de forma diferente (quizás Engagement debería ser 40% para tu negocio)
  </ExampleCard>

<RangeSlider
  label="¿Cuántos de tus últimos 10 clientes que abandonaron habría señalado tu puntaje de salud como Amarillo o Rojo 30 días antes de cancelar?"
  min={0}
  max={10}
  lowLabel="0 clientes"
  highLabel="Los 10"
  persistKey="retention-L2-validation"
/>

---

## Manteniendo tu dashboard de puntaje de salud

Tu puntaje de salud solo es útil si lo **actualizas semanalmente** y **actúas sobre él**.

<ScenarioSimulator
title="Calculadora de mantenimiento de puntaje de salud"
persistKey="retention-L2-simulator"
levers={[
{ id: "customers", label: "Número de clientes", min: 10, max: 500, step: 10, defaultValue: 100 },
{ id: "updateFrequency", label: "Frecuencia de actualización (días)", min: 1, max: 30, step: 1, defaultValue: 7 }
]}
outputs={[
{ id: "timePerUpdate", label: "Tiempo por actualización (minutos)", formula: "(customers * 0.5)", unit: "min", precision: 0 },
{ id: "monthlyTime", label: "Inversión mensual de tiempo", formula: "((30 / updateFrequency) * (customers * 0.5))", unit: "min", precision: 0 }
]}
insight="Con `{customers}` clientes actualizados cada {updateFrequency} días, invertirás ~{monthlyTime} minutos/mes manteniendo tu puntaje de salud. Eso es {(monthlyTime / 60).toFixed(1)} horas — un precio pequeño por prevenir el abandono."
/>

### Ritual semanal de revisión de puntaje de salud (15-30 minutos)

1. **Actualiza los datos** (10-15 min): Extrae datos frescos de analítica de producto, ESP y sistema de facturación. Pégalos en tu hoja.
2. **Ordena por puntaje de salud ascendente** (1 min): Ve tus clientes más en riesgo arriba.
3. **Señala elementos de acción** (5-10 min):
   - ¿Nuevos clientes en Rojo? → Agregar a "lista de llamadas urgentes"
   - ¿Clientes que pasaron de Verde a Amarillo? → Agregar a "lista de alcance proactivo"
   - ¿Clientes en Verde con alto MRR? → Agregar a "lista de oportunidades de expansión"
4. **Ejecuta las 3 acciones principales** (se hace durante tu bloque semanal de revisión CS — Lección 8)

<InteractiveChecklist
title="Tu plan de acción de puntaje de salud"
persistKey="retention-L2-actions"
items={[
"Construye tu hoja de cálculo de puntaje de salud con el modelo de 3 dimensiones",
"Llena los datos de todos los clientes actuales",
"Valida el modelo contra tus últimos 10 clientes que abandonaron",
"Configura el proceso de actualización semanal de datos (manual o automatizado)",
"Agrega la revisión de puntaje de salud a tu ritual semanal de CS (Lección 8)",
"Señala tus 3 clientes más en riesgo y planifica intervenciones"
]}
/>

---

## Errores comunes de puntaje de salud (y cómo evitarlos)

<StrategyDuel
title="Puntajes de salud complejos vs. simples"
persistKey="retention-L2-duel"
scenario="Estás decidiendo qué tan sofisticado hacer tu modelo de puntaje de salud."
strategyA={{
    name: "Complejo (15+ inputs)",
    description: "Rastrear cada señal posible: frecuencia de login, duración de sesión, uso de funcionalidades, aperturas de email, clics, NPS, tickets de soporte, historial de pagos, nivel de plan, antigüedad, referidos, llamadas API, integraciones, tamaño del equipo, industria...",
    pros: ["Más comprensivo", "Se siente sofisticado"],
    cons: ["Requiere mantenimiento constante", "Difícil de depurar cuando falla", "El pipeline de datos se rompe fácilmente", "Toma 2+ horas actualizar"]
  }}
strategyB={{
    name: "Simple (3-5 inputs)",
    description: "Rastrear las 3 dimensiones (Uso, Engagement, Negocio) con 3 señales cada una. Total: 9 inputs.",
    pros: ["Fácil de mantener", "Se actualiza en 15 minutos", "Fácil de depurar", "Realmente se usa"],
    cons: ["Podría perder casos extremos", "Menos preciso"]
  }}
expertVerdict="Lo simple gana para fundadores en solitario. Un modelo de 9 inputs que actualizas semanalmente supera a un modelo de 15 inputs que actualizas una vez y abandonas. Siempre puedes agregar complejidad después."
/>

### Los 5 errores más comunes

1. **Error: Ponderar todas las dimensiones por igual**
   - Solución: El uso es el predictor más fuerte — pondera 40% o más

2. **Error: Solo rastrear indicadores rezagados (NPS, historial de pagos)**
   - Solución: Los indicadores líderes (frecuencia de login, uso de funcionalidades) te dan 2-4 semanas de advertencia

3. **Error: Construir el modelo pero nunca actualizarlo**
   - Solución: Programa una tarea recurrente semanal de 15 minutos para actualizar los datos

4. **Error: Rastrear demasiadas señales y quemarte**
   - Solución: Empieza con 3 dimensiones × 3 señales = 9 inputs totales. Agrega más solo si es necesario.

5. **Error: No validar contra datos reales de abandono**
   - Solución: Cada trimestre, verifica: ¿tus clientes Rojos/Amarillos realmente abandonaron a tasas más altas que los Verdes?

---

## Resumen: Tu sistema de puntaje de salud

Ahora tienes un **modelo de puntaje de salud simple y mantenible** que:

- Usa 3 dimensiones (Uso 40%, Engagement 30%, Negocio 30%)
- Rastrea 9 señales totales (3 por dimensión)
- Clasifica clientes en zonas Verde/Amarillo/Rojo
- Se actualiza semanalmente en 15-30 minutos
- Señala clientes en riesgo 2-4 semanas antes del abandono

**Siguiente lección:** Aprenderás a rastrear las 7 señales específicas de predicción de abandono que alimentan tu puntaje de salud — y construir un dashboard de alerta temprana que atrapa abandonadores silenciosos antes de que desaparezcan.

<InteractiveChecklist
title="Antes de pasar a la Lección 3"
persistKey="retention-L2-final"
items={[
"He construido mi hoja de cálculo de puntaje de salud con las 3 dimensiones",
"He llenado datos de al menos 10 clientes para probar el modelo",
"He identificado mis 3 clientes más en riesgo (zona Amarilla o Roja)",
"He programado un ritual semanal de 15 minutos de actualización de puntaje de salud",
"Entiendo por qué el Uso tiene peso de 40% (predictor más fuerte)",
"He validado el modelo contra al menos 3 clientes que abandonaron en el pasado"
]}
/>

---

## Quiz: Dominio del puntaje de salud

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Por qué la dimensión de Uso tiene peso de 40% en lugar de peso igual con Engagement y Negocio?",
      "options": [
        "Porque es más fácil de rastrear",
        "Porque el uso es 2-3x más predictivo de abandono que otras señales",
        "Porque a los clientes les importan más las funcionalidades que el soporte",
        "Porque simplifica las matemáticas"
      ],
      "correctAnswer": 1,
      "explanation": "La investigación muestra que las señales basadas en uso (logins, adopción de funcionalidades, acciones principales) son 2-3x más predictivas del abandono que las señales basadas en encuestas o negocio. Un cliente que deja de usar el producto va a abandonar, incluso si está pagando a tiempo."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Un cliente tiene un puntaje de salud de 58. ¿En qué zona está y qué acción deberías tomar?",
      "options": [
        "Zona verde — monitorear mensualmente",
        "Zona amarilla — alcance proactivo esta semana",
        "Zona roja — llamada urgente dentro de 48 horas",
        "Zona amarilla — esperar hasta que caiga a rojo antes de actuar"
      ],
      "correctAnswer": 1,
      "explanation": "58 está en la zona amarilla (50-74). Los clientes amarillos tienen una tasa de salvamento del 40-60% con intervención, así que deberías contactarlos proactivamente esta semana. No esperes a que caigan a rojo (&lt;50) cuando las tasas de salvamento bajan al 10-15%."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "¿Por qué 'sin contacto de soporte nunca' puntúa 50 (neutral) en lugar de 100 (excelente) en la dimensión de Engagement?",
      "options": [
        "Porque los clientes que nunca contactan soporte están desconectados, no necesariamente felices",
        "Porque los tickets de soporte siempre son una buena señal",
        "Porque es un error en el modelo de puntuación",
        "Porque queremos fomentar más tickets de soporte"
      ],
      "correctAnswer": 0,
      "explanation": "El 70% de los clientes que abandonan nunca se quejan ni contactan soporte — simplemente dejan de usar el producto. 'Sin contacto nunca' puede indicar desconexión, no satisfacción. Los clientes que hacen preguntas o dan feedback (puntaje 75-100) están activamente comprometidos."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Un modelo complejo de puntaje de salud con 15+ inputs es mejor que un modelo simple de 9 inputs para fundadores en solitario.",
      "correctAnswer": false,
      "explanation": "Falso. Para fundadores en solitario, un modelo simple de 9 inputs (3 dimensiones × 3 señales) que realmente mantienes semanalmente es mucho mejor que un modelo complejo de 15+ inputs que requiere mantenimiento constante del pipeline de datos y termina abandonado."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "¿Con cuánta anticipación un puntaje de salud bien configurado típicamente señala clientes en riesgo antes de que abandonen?",
      "options": ["1-3 días", "2-4 semanas", "2-3 meses", "6-12 meses"],
      "correctAnswer": 1,
      "explanation": "Un puntaje de salud bien configurado señala clientes en riesgo 2-4 semanas antes del abandono. Esta es la ventana óptima de intervención — lo suficientemente temprano para salvarlos, pero no tan temprano como para perseguir falsos positivos."
    }
  ]
}
```
