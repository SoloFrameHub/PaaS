---
title: "CAC, LTV y Período de Recuperación para Fundadores Bootstrapped"
duration: "55 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 5
---

## El Error de $40K

Conoce a Jordan. Seis meses en su camino SaaS, está celebrando 50 clientes. El panel muestra verde en todas partes: el MRR sube, las tasas de conversión son sólidas, el pipeline está lleno.

Luego su contador pregunta: "¿Cuánto costó adquirir cada cliente?"

Jordan hace los números. Herramientas: $200/mes. Anuncios: $500/mes. Su propio tiempo (80 horas/mes a $100/hora): $8.000/mes. Total: $8.700/mes por 8 nuevos clientes.

**CAC: $1.087 por cliente.**

El cliente promedio paga $49/mes y se va después de 11 meses.

**LTV: $539.**

Jordan había estado perdiendo $548 en cada cliente durante seis meses. El "crecimiento" era un agujero de $40.000 disfrazado de éxito.

Esta lección te enseña los tres números que previenen este desastre: **Costo de Adquisición de Clientes (CAC), Valor de Vida del Cliente (LTV) y Período de Recuperación**. Construirás una calculadora que muestra si tu adquisición realmente funciona — antes de quemar tu runway.

---

## Sección 1: Costo de Adquisición de Clientes (El Número Real)

La mayoría de los fundadores calculan el CAC incorrectamente. Cuentan los costos de herramientas y el gasto en anuncios, pero olvidan el gasto más grande: **su tiempo**.

### La Fórmula Completa del CAC

<InsightCard icon="💰" title="El CAC Real Incluye Todo">
CAC = (Costos de Herramientas + Gasto en Anuncios + Tu Tiempo × Tarifa por Hora) / Nuevos Clientes Adquiridos
</InsightCard>

**Ejemplo:**

- Herramientas (CRM, enriquecimiento, correo): $200/mes
- Anuncios de LinkedIn: $300/mes
- Tu tiempo: 60 horas/mes a $100/hora = $6.000/mes
- Nuevos clientes: 5

**CAC = ($200 + $300 + $6.000) / 5 = $1.300 por cliente**

¿Ese canal de salida "gratuito"? Te costó $6.000 en tiempo.

<FlipCard 
  front="¿Por qué importa el tiempo si no me estoy pagando?" 
  back="Porque el costo de oportunidad es real. Esas 60 horas podrían haberse gastado construyendo producto, atendiendo clientes, o trabajando en un contrato que pague dinero real. El tiempo tiene valor aunque el efectivo no salga de tu cuenta." 
/>

### CAC Ajustado por Tiempo por Canal

Los diferentes canales tienen costos de tiempo muy diferentes:

<ExampleCard label="Verificación de Realidad del Tiempo por Canal">
**Correo Saliente (Clay + Smartlead):**
- Configuración: 8 horas
- Mantenimiento semanal: 3 horas
- Costo de tiempo mensual: 20 horas × $100 = $2.000
- Costo de herramientas: $150
- Costo mensual total: $2.150

**Contenido en LinkedIn:**

- Escribir publicaciones: 10 horas/mes
- Engagement: 15 horas/mes
- Costo de tiempo mensual: 25 horas × $100 = $2.500
- Costo de herramientas: $0
- Costo mensual total: $2.500

**Anuncios Pagados:**

- Configuración + optimización: 5 horas/mes
- Costo de tiempo mensual: 5 horas × $100 = $500
- Gasto en anuncios: $1.000
- Costo mensual total: $1.500
  </ExampleCard>

El canal "gratuito" de LinkedIn cuesta más que los anuncios pagados cuando cuentas tu tiempo.

<RangeSlider 
  label="¿Cuántas horas por semana gastas en adquisición?" 
  min={0} 
  max={40} 
  lowLabel="0 horas" 
  highLabel="40+ horas" 
  persistKey="analytics-L5-acq-hours" 
/>

### Tu Ejercicio de Cálculo del CAC

<TemplateBuilder
title="Calcula Tu CAC Real"
persistKey="analytics-L5-cac-calc"
sections={[
{
id: "tools",
title: "Costos de Herramientas (Mensual)",
fields: [
{ id: "crm", label: "CRM", placeholder: "p. ej., $50", type: "text" },
{ id: "enrichment", label: "Enriquecimiento (Clay/Apollo)", placeholder: "p. ej., $100", type: "text" },
{ id: "email", label: "Automatización de correo", placeholder: "p. ej., $50", type: "text" },
{ id: "other", label: "Otras herramientas", placeholder: "p. ej., $50", type: "text" }
]
},
{
id: "paid",
title: "Gasto Pagado (Mensual)",
fields: [
{ id: "ads", label: "Anuncios (LinkedIn, Google, etc.)", placeholder: "p. ej., $500", type: "text" },
{ id: "sponsorships", label: "Patrocinios/comunidades", placeholder: "p. ej., $200", type: "text" }
]
},
{
id: "time",
title: "Tu Tiempo",
fields: [
{ id: "hours", label: "Horas por mes en adquisición", placeholder: "p. ej., 60", type: "text" },
{ id: "rate", label: "Tu tarifa horaria efectiva", placeholder: "p. ej., $100", type: "text" }
]
},
{
id: "customers",
title: "Resultados",
fields: [
{ id: "new", label: "Nuevos clientes el mes pasado", placeholder: "p. ej., 5", type: "text" }
]
}
]}
/>

Una vez que llenes esto, calcula:

- **Costo Mensual Total** = Herramientas + Pagado + (Horas × Tarifa)
- **CAC** = Costo Mensual Total / Nuevos Clientes

<InsightCard icon="🎯" title="Realidad del Fundador Bootstrapped">
Si tu CAC está por encima de $500 y tu producto está por debajo de $100/mes, estás en problemas. Necesitas precios más altos, costos más bajos, o mejores tasas de conversión.
</InsightCard>

---

## Sección 2: Valor de Vida del Cliente (Cuánto Valen Realmente)

El LTV es el total de ingresos que ganarás de un cliente a lo largo de toda su relación contigo.

### La Fórmula del LTV (Para Suscripciones)

<InsightCard icon="📊" title="Fórmula Simple de LTV">
LTV = Ingreso Promedio Por Usuario (ARPU) / Tasa Mensual de Pérdida de Clientes
</InsightCard>

**Ejemplo:**

- ARPU: $99/mes
- Pérdida mensual: 5% (0.05)

**LTV = $99 / 0.05 = $1.980**

Este cliente te pagará aproximadamente $1.980 antes de cancelar.

<FlipCard 
  front="¿Qué pasa si todavía no tengo datos de pérdida?" 
  back="Usa benchmarks de la industria: el SaaS para PyMEs promedia 3-7% de pérdida mensual. Comienza con 5% y ajusta a medida que obtengas datos reales. Para servicios/coaching, estima la vida promedio del cliente (p. ej., 12 meses) y multiplica por los ingresos mensuales." 
/>

### LTV para Modelos Sin Suscripción

<SlideNavigation>
<Slide title="Servicios por Proyecto">
**LTV = Valor Promedio del Proyecto × Tasa de Compra Repetida**

Ejemplo:

- Proyecto promedio: $5.000
- El 40% de los clientes vuelven para un segundo proyecto
- El 20% vuelven para un tercero

LTV = $5.000 + ($5.000 × 0.40) + ($5.000 × 0.20) = $8.000
</Slide>

<Slide title="Coaching/Consultoría">
**LTV = Retainer Mensual × Retención Promedio (Meses)**

Ejemplo:

- Retainer mensual: $2.000
- El cliente promedio permanece 8 meses

LTV = $2.000 × 8 = $16.000
</Slide>

<Slide title="Productos de Pago Único">
**LTV = Valor Promedio de Pedido × (1 + Tasa de Compra Repetida)**

Ejemplo:

- Pedido promedio: $200
- El 30% compran de nuevo en un año

LTV = $200 × (1 + 0.30) = $260
</Slide>
</SlideNavigation>

### Benchmarks de Tasa de Pérdida

<ExampleCard label="¿Cuál es la Pérdida Normal?">
**SaaS para PyMEs (menos de $100/mes):**
- Por debajo del promedio: 7%+ mensual (57%+ anual)
- Promedio: 3-7% mensual (31-57% anual)
- Bueno: 2-3% mensual (22-31% anual)
- Excelente: &lt;2% mensual (&lt;22% anual)

**SaaS Mercado Medio ($100-500/mes):**

- Promedio: 2-5% mensual
- Bueno: 1-2% mensual

**SaaS Empresarial ($500+/mes):**

- Promedio: 1-3% mensual
- Bueno: &lt;1% mensual

**Servicios/Coaching:**

- Retención promedio: 6-12 meses
- Buena retención: 12-24 meses
  </ExampleCard>

<RangeSlider 
  label="¿Cuál es tu tasa de pérdida mensual actual?" 
  min={0} 
  max={15} 
  lowLabel="0%" 
  highLabel="15%+" 
  persistKey="analytics-L5-churn-rate" 
/>

### Tu Cálculo de LTV

<TemplateBuilder
title="Calcula Tu LTV"
persistKey="analytics-L5-ltv-calc"
sections={[
{
id: "subscription",
title: "Para Suscripción/SaaS",
fields: [
{ id: "arpu", label: "Ingreso Promedio Por Usuario (mensual)", placeholder: "p. ej., $99", type: "text" },
{ id: "churn", label: "Tasa de pérdida mensual (%)", placeholder: "p. ej., 5", type: "text" }
]
},
{
id: "services",
title: "Para Servicios/Coaching",
fields: [
{ id: "monthly", label: "Ingreso mensual promedio por cliente", placeholder: "p. ej., $2.000", type: "text" },
{ id: "months", label: "Retención promedio (meses)", placeholder: "p. ej., 8", type: "text" }
]
},
{
id: "project",
title: "Para Proyectos",
fields: [
{ id: "project-value", label: "Valor promedio del proyecto", placeholder: "p. ej., $5.000", type: "text" },
{ id: "repeat", label: "Tasa de compra repetida (%)", placeholder: "p. ej., 40", type: "text" }
]
}
]}
/>

**Calcula:**

- **LTV de Suscripción** = ARPU / (Tasa de Pérdida / 100)
- **LTV de Servicios** = Ingresos Mensuales × Meses
- **LTV de Proyecto** = Valor del Proyecto × (1 + Tasa de Repetición / 100)

---

## Sección 3: La Relación LTV:CAC (La Verificación de Salud)

La relación entre LTV y CAC te dice si tu modelo de negocio funciona.

<InsightCard icon="⚖️" title="La Relación Dorada">
**SaaS Saludable: LTV:CAC de 3:1 o más alto**

Por cada $1 que gastas en adquirir un cliente, deberías ganar al menos $3 de vuelta.
</InsightCard>

### Qué Significan las Diferentes Relaciones

<ClassifyExercise
title="Clasifica Estos Escenarios de LTV:CAC"
persistKey="analytics-L5-ratio-classify"
categories={[
{ id: "dying", label: "El Negocio Está Muriendo", color: "#ef4444" },
{ id: "struggling", label: "Con Dificultades", color: "#f59e0b" },
{ id: "healthy", label: "Saludable", color: "#10b981" },
{ id: "excellent", label: "Excelente", color: "#3b82f6" }
]}
items={[
{
id: "1",
content: "LTV: $500, CAC: $600 (Relación: 0.83:1)",
correctCategory: "dying",
explanation: "Estás perdiendo dinero en cada cliente. Esto es insostenible."
},
{
id: "2",
content: "LTV: $1.200, CAC: $1.000 (Relación: 1.2:1)",
correctCategory: "struggling",
explanation: "Apenas rentable. Sin margen para errores o inversión en crecimiento."
},
{
id: "3",
content: "LTV: $3.000, CAC: $900 (Relación: 3.3:1)",
correctCategory: "healthy",
explanation: "Economía unitaria sólida. Espacio para invertir en crecimiento."
},
{
id: "4",
content: "LTV: $5.000, CAC: $800 (Relación: 6.25:1)",
correctCategory: "excellent",
explanation: "Excepcional. Puedes permitirte escalar agresivamente."
},
{
id: "5",
content: "LTV: $2.400, CAC: $1.200 (Relación: 2:1)",
correctCategory: "struggling",
explanation: "Por debajo del umbral 3:1. Necesitas mejorar la conversión o reducir costos."
}
]}
/>

### El Diagnóstico de la Relación

<FlipCard 
  front="LTV:CAC por debajo de 3:1 — ¿Qué está roto?" 
  back="Tres problemas posibles: (1) CAC demasiado alto (segmentación deficiente, canales costosos, baja conversión), (2) LTV demasiado bajo (alta pérdida, ARPU bajo, sin expansión), o (3) Ambos. Arregla el más fácil primero — generalmente el CAC." 
/>

<StrategyDuel
title="¿Arreglar el LTV o el CAC?"
persistKey="analytics-L5-fix-strategy"
scenario="Tu LTV:CAC es 2:1. Tienes 3 meses de runway. ¿Qué priorizas?"
strategyA={{
    name: "Reducir CAC",
    description: "Mejorar segmentación, eliminar canales costosos, optimizar conversión",
    pros: ["Resultados más rápidos (semanas)", "Control directo", "Impacto inmediato en flujo de caja"],
    cons: ["Puede reducir el volumen", "Requiere disciplina para eliminar canales"]
  }}
strategyB={{
    name: "Aumentar LTV",
    description: "Reducir pérdida, añadir upsells, aumentar precios",
    pros: ["Se compone con el tiempo", "Mayor valor a largo plazo"],
    cons: ["Toma 3-6 meses ver impacto", "Arriesgado con poco runway"]
  }}
expertVerdict="Con 3 meses de runway, arregla el CAC primero. Necesitas mejora inmediata del flujo de caja. Aumenta el LTV en paralelo, pero no apuestes la supervivencia en eso."
/>

### Comparación de Benchmarks

<ExampleCard label="Benchmarks de LTV:CAC por Etapa">
**Bootstrapped / Pre-Ingresos:**
- Meta: 5:1 o más alto
- Por qué: Sin margen para errores, necesitas rentabilidad inmediata

**Levantamiento Pequeño ($100K-500K):**

- Meta: mínimo 3:1
- Por qué: Runway limitado, necesitas crecimiento sostenible

**Seed ($500K-2M):**

- Meta: 3:1, puede tolerar 2:1 temporalmente
- Por qué: Algo de margen para invertir en crecimiento

**Serie A+ ($2M+):**

- Meta: 3:1 a largo plazo, puede tolerar 1.5:1 durante escalado agresivo
- Por qué: Priorizando crecimiento sobre rentabilidad
  </ExampleCard>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Tu instinto es optimizar el producto para reducir la pérdida (aumentar el LTV). Eso es bueno a largo plazo, pero si tu LTV:CAC está roto, arregla el CAC primero. Una mejor segmentación y conversión son victorias más rápidas.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches/Consultores">
Tu LTV es naturalmente alto (relaciones largas con clientes). Tu desafío de CAC son canales intensivos en tiempo (redes de contactos, contenido). Rastrear el CAC ajustado por tiempo sin piedad — tu tiempo es tu recurso más escaso.
</ContextualNote>

---

## Sección 4: Período de Recuperación (¿Cuándo Alcanzas el Punto de Equilibrio?)

El Período de Recuperación es el número de meses que toma recuperar tu CAC de los ingresos de un cliente.

<InsightCard icon="⏱️" title="Fórmula del Período de Recuperación">
Período de Recuperación (Meses) = CAC / Ingresos Mensuales Por Cliente
</InsightCard>

**Ejemplo:**

- CAC: $900
- Ingresos mensuales por cliente: $99

**Recuperación = $900 / $99 = 9.1 meses**

Recuperarás tu costo de adquisición después de 9 meses de pagos de suscripción.

### Por Qué el Período de Recuperación Importa Más que LTV:CAC para Fundadores Bootstrapped

<FlipCard 
  front="¿Por qué importa la recuperación si el LTV:CAC es saludable?" 
  back="Por el flujo de caja. Un LTV:CAC de 3:1 con recuperación de 18 meses significa que eventualmente serás rentable, pero te quedarás sin efectivo antes de llegar ahí. Los fundadores bootstrapped necesitan recuperación rápida para sobrevivir." 
/>

### Metas del Período de Recuperación

<SlideNavigation>
<Slide title="Bootstrapped / Pre-Ingresos">
**Meta: 1-3 meses**

No tienes runway. Cada dólar gastado en adquisición debe volver dentro de un trimestre.

**Implicaciones:**

- Las ventas de alto contacto no funcionarán (demasiado lentas)
- Solo autoservicio o bajo contacto
- Precios agresivos (ARPU alto) o CAC ultra-bajo
  </Slide>

<Slide title="Levantamiento Pequeño ($100K-500K)">
**Meta: 3-6 meses**

Tienes runway limitado. La recuperación debe ocurrir antes de que te quedes sin efectivo.

**Implicaciones:**

- Puedes permitirte algunos negocios asistidos por ventas
- Necesitas adquisición predecible y repetible
- El gasto mensual debe cubrirse con la recuperación dentro de 6 meses
  </Slide>

<Slide title="Seed ($500K-2M)">
**Meta: 6-9 meses**

Tienes 12-18 meses de runway. Puedes invertir en crecimiento.

**Implicaciones:**

- Puedes construir equipos de salida
- Puedes probar canales con recuperación más larga
- Aún necesitas un camino hacia la rentabilidad
  </Slide>

<Slide title="Serie A+ ($2M+)">
**Meta: 9-18 meses**

Estás optimizando para el crecimiento, no para la rentabilidad.

**Implicaciones:**

- Puedes permitirte ciclos de ventas empresariales
- Puedes invertir fuertemente en marca/contenido
- La recuperación es secundaria a la tasa de crecimiento
  </Slide>
  </SlideNavigation>

<RangeSlider 
  label="¿Cuántos meses de runway tienes?" 
  min={0} 
  max={24} 
  lowLabel="0 meses" 
  highLabel="24+ meses" 
  persistKey="analytics-L5-runway" 
/>

### La Trampa del Desajuste Recuperación-Runway

<ExampleCard label="Caso de Estudio: La Trampa de la Recuperación a 12 Meses">
**Fundador:** Alex, SaaS B2B, $200K de ronda seed

**Números:**

- CAC: $1.200
- ARPU: $99/mes
- Recuperación: 12 meses
- Gasto mensual: $15.000
- Runway: 13 meses

**El Problema:**
Alex adquiere 10 clientes/mes. Eso son $12.000 en gasto de CAC. Después de 12 meses:

- Total CAC gastado: $144.000
- Ingresos recaudados: $59.400 (10 clientes × $99 × 6 meses promedio)
- Posición de efectivo: $200.000 - $180.000 gasto - $144.000 CAC + $59.400 ingresos = **-$64.600**

Alex se quedó sin dinero antes de que la recuperación comenzara a funcionar.

**La Solución:**
Reducir el CAC a $400 (recuperación a 3 meses) o aumentar el ARPU a $300 (recuperación a 4 meses). Cualquiera de los cambios hace que la economía unitaria funcione dentro del runway.
</ExampleCard>

### Tu Cálculo de Recuperación

<ScenarioSimulator
title="Calculadora del Período de Recuperación"
persistKey="analytics-L5-payback-sim"
levers={[
{ id: "cac", label: "CAC ($)", min: 100, max: 5000, step: 100, defaultValue: 1000 },
{ id: "arpu", label: "ARPU Mensual ($)", min: 10, max: 500, step: 10, defaultValue: 99 },
{ id: "runway", label: "Runway (meses)", min: 0, max: 24, step: 1, defaultValue: 12 }
]}
outputs={[
{ id: "payback", label: "Período de Recuperación", formula: "cac / arpu", unit: " meses", precision: 1 },
{ id: "safe", label: "¿Seguro para tu runway?", formula: "(cac / arpu) < (runway * 0.5) ? 'Sí' : 'No'", unit: "", precision: 0 }
]}
insight="Tu recuperación es de `{payback}` meses. Con `{runway}` meses de runway, necesitas recuperación bajo {runway \* 0.5} meses para estar seguro. Estado: `{safe}`"
/>

<InsightCard icon="🚨" title="La Regla del 50%">
Tu período de recuperación debería ser menor al **50% de tu runway**. Si tienes 12 meses de runway, necesitas recuperación en menos de 6 meses. Esto te da margen para errores y crecimiento.
</InsightCard>

---

## Sección 5: CAC por Canal (Dónde Apostar Doble)

No todos los canales tienen el mismo CAC. Rastrea el CAC por separado para cada fuente de adquisición.

### Cálculo del CAC por Canal

<InsightCard icon="📊" title="Fórmula del CAC por Canal">
CAC del Canal = (Gasto del Canal + Tiempo en el Canal × Tarifa Horaria) / Nuevos Clientes del Canal
</InsightCard>

**Ejemplo: Correo Saliente**

- Costo de herramienta: $150/mes
- Tiempo: 20 horas/mes × $100/hora = $2.000
- Nuevos clientes: 3

**CAC del Canal = ($150 + $2.000) / 3 = $717**

**Ejemplo: Contenido en LinkedIn**

- Costo de herramienta: $0
- Tiempo: 25 horas/mes × $100/hora = $2.500
- Nuevos clientes: 2

**CAC del Canal = $2.500 / 2 = $1.250**

Aunque LinkedIn es "gratuito," tiene un CAC más alto debido a la inversión de tiempo.

### Rangos Típicos de CAC por Canal

<ExampleCard label="Benchmarks de CAC por Canal (SaaS para PyMEs)">
**Referencias:**
- CAC: $50-300
- Por qué: Bajo esfuerzo, alta confianza
- Limitación: Difícil de escalar

**Correo Saliente (Bien Segmentado):**

- CAC: $300-800
- Por qué: Escalable, predecible
- Limitación: Riesgo de entregabilidad

**LinkedIn (Orgánico):**

- CAC: $500-1.500
- Por qué: Alto costo de tiempo
- Limitación: Lento para escalar

**Contenido/Inbound:**

- CAC: $200-600 (después de 6-12 meses)
- Por qué: Se compone con el tiempo
- Limitación: Largo tiempo de arranque

**Anuncios Pagados (LinkedIn, Google):**

- CAC: $800-2.500
- Por qué: Rápido, escalable
- Limitación: Costoso, requiere presupuesto

**Comunidades/Asociaciones:**

- CAC: $300-1.000
- Por qué: Alta confianza, segmentado
- Limitación: Depende de relaciones
  </ExampleCard>

<ClassifyExercise
title="¿Qué Canal Deberías Eliminar?"
persistKey="analytics-L5-channel-kill"
categories={[
{ id: "keep", label: "Mantener y Escalar", color: "#10b981" },
{ id: "optimize", label: "Optimizar Primero", color: "#f59e0b" },
{ id: "kill", label: "Eliminar Inmediatamente", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Referencias: CAC $200, LTV $3.000, 2 clientes/mes",
correctCategory: "keep",
explanation: "Excelente LTV:CAC (15:1). Construye un programa de referencias para escalar esto."
},
{
id: "2",
content: "Saliente: CAC $600, LTV $1.980, 5 clientes/mes",
correctCategory: "keep",
explanation: "LTV:CAC saludable (3.3:1) y escalable. Sigue adelante."
},
{
id: "3",
content: "LinkedIn: CAC $1.200, LTV $1.980, 2 clientes/mes",
correctCategory: "optimize",
explanation: "LTV:CAC es 1.65:1 (por debajo de 3:1). Reduce el tiempo o mejora la conversión antes de escalar."
},
{
id: "4",
content: "Anuncios Pagados: CAC $2.500, LTV $1.980, 3 clientes/mes",
correctCategory: "kill",
explanation: "Estás perdiendo $520 por cliente. Elimina esto inmediatamente a menos que puedas triplicar la conversión."
},
{
id: "5",
content: "Contenido: CAC $800, LTV $1.980, 1 cliente/mes (comenzó hace 2 meses)",
correctCategory: "optimize",
explanation: "El contenido toma 6-12 meses para arrancar. Dale tiempo, pero rastrea la mejora mensual."
}
]}
/>

### Tu Análisis de CAC por Canal

<TemplateBuilder
title="Calcula el CAC por Canal"
persistKey="analytics-L5-channel-cac"
sections={[
{
id: "channel1",
title: "Canal 1",
fields: [
{ id: "name1", label: "Nombre del canal", placeholder: "p. ej., Correo Saliente", type: "text" },
{ id: "spend1", label: "Gasto mensual ($)", placeholder: "p. ej., 150", type: "text" },
{ id: "hours1", label: "Horas por mes", placeholder: "p. ej., 20", type: "text" },
{ id: "rate1", label: "Tarifa horaria ($)", placeholder: "p. ej., 100", type: "text" },
{ id: "customers1", label: "Nuevos clientes el mes pasado", placeholder: "p. ej., 3", type: "text" }
]
},
{
id: "channel2",
title: "Canal 2",
fields: [
{ id: "name2", label: "Nombre del canal", placeholder: "p. ej., LinkedIn", type: "text" },
{ id: "spend2", label: "Gasto mensual ($)", placeholder: "p. ej., 0", type: "text" },
{ id: "hours2", label: "Horas por mes", placeholder: "p. ej., 25", type: "text" },
{ id: "rate2", label: "Tarifa horaria ($)", placeholder: "p. ej., 100", type: "text" },
{ id: "customers2", label: "Nuevos clientes el mes pasado", placeholder: "p. ej., 2", type: "text" }
]
},
{
id: "channel3",
title: "Canal 3",
fields: [
{ id: "name3", label: "Nombre del canal", placeholder: "p. ej., Referencias", type: "text" },
{ id: "spend3", label: "Gasto mensual ($)", placeholder: "p. ej., 0", type: "text" },
{ id: "hours3", label: "Horas por mes", placeholder: "p. ej., 5", type: "text" },
{ id: "rate3", label: "Tarifa horaria ($)", placeholder: "p. ej., 100", type: "text" },
{ id: "customers3", label: "Nuevos clientes el mes pasado", placeholder: "p. ej., 2", type: "text" }
]
}
]}
/>

**Para cada canal, calcula:**

- **Costo Total** = Gasto + (Horas × Tarifa)
- **CAC del Canal** = Costo Total / Clientes
- **Relación LTV:CAC** = Tu LTV / CAC del Canal

**Reglas de decisión:**

- **LTV:CAC > 5:1** → Escala agresivamente
- **LTV:CAC 3-5:1** → Sigue adelante, optimiza
- **LTV:CAC 1.5-3:1** → Optimiza antes de escalar
- **LTV:CAC < 1.5:1** → Elimina o arregla inmediatamente

---

## Sección 6: El Panel de Economía Unitaria

Ahora construyes el panel que lo une todo.

### La Vista de 5 Métricas de Economía Unitaria

<InsightCard icon="📊" title="Tu Panel de Economía Unitaria">
Rastrea estos 5 números mensualmente:

1. **CAC** (general y por canal)
2. **LTV** (general y por cohorte)
3. **Relación LTV:CAC**
4. **Período de Recuperación**
5. **Margen Bruto** (ingresos - COGS, como %)
   </InsightCard>

### Construyendo Tu Panel

<TemplateBuilder
title="Plantilla del Panel de Economía Unitaria"
persistKey="analytics-L5-dashboard"
sections={[
{
id: "inputs",
title: "Entradas Mensuales",
fields: [
{ id: "new-customers", label: "Nuevos clientes este mes", placeholder: "p. ej., 8", type: "text" },
{ id: "total-acq-cost", label: "Costo total de adquisición ($)", placeholder: "p. ej., 6.500", type: "text" },
{ id: "arpu", label: "Ingreso promedio por usuario ($)", placeholder: "p. ej., 99", type: "text" },
{ id: "churn", label: "Tasa de pérdida mensual (%)", placeholder: "p. ej., 5", type: "text" },
{ id: "cogs", label: "Costo de bienes vendidos (% de ingresos)", placeholder: "p. ej., 20", type: "text" }
]
},
{
id: "calculated",
title: "Métricas Calculadas",
fields: [
{ id: "cac-result", label: "CAC", placeholder: "Calculado automáticamente", type: "text", disabled: true },
{ id: "ltv-result", label: "LTV", placeholder: "Calculado automáticamente", type: "text", disabled: true },
{ id: "ratio-result", label: "Relación LTV:CAC", placeholder: "Calculado automáticamente", type: "text", disabled: true },
{ id: "payback-result", label: "Período de Recuperación (meses)", placeholder: "Calculado automáticamente", type: "text", disabled: true },
{ id: "margin-result", label: "Margen Bruto (%)", placeholder: "Calculado automáticamente", type: "text", disabled: true }
]
}
]}
/>

**Fórmulas:**

- CAC = Costo Total de Adquisición / Nuevos Clientes
- LTV = ARPU / (Tasa de Pérdida / 100)
- LTV:CAC = LTV / CAC
- Recuperación = CAC / ARPU
- Margen Bruto = 100 - % COGS

### Verificaciones de Salud del Panel

<ComparisonBuilder
title="¿Cómo Se Comparan Tus Números?"
persistKey="analytics-L5-benchmark-compare"
prompt="Ingresa tus métricas calculadas"
expertExample="CAC: $600 | LTV: $1.980 | LTV:CAC: 3.3:1 | Recuperación: 6 meses | Margen Bruto: 80%"
criteria={[
"La relación LTV:CAC es 3:1 o más alta",
"El período de recuperación está por debajo del 50% del runway",
"El margen bruto está por encima del 70%"
]}
/>

<PredictionGate
question="Un fundador tiene CAC de $800, LTV de $2.400 y 6 meses de runway. ¿Qué pasa si no cambia nada?"
persistKey="analytics-L5-prediction"
type="choice"
choices={[
{ id: "a", text: "Será rentable en 6 meses" },
{ id: "b", text: "Se quedará sin dinero" },
{ id: "c", text: "Alcanzará el punto de equilibrio" }
]}
correctId="b"

> **Se quedará sin dinero.**

El período de recuperación es de 8 meses ($800 / $100 ARPU). Con solo 6 meses de runway, quemará efectivo antes de que los clientes paguen su costo de adquisición.

**La solución:** Reducir el CAC a $300 (recuperación de 3 meses) o aumentar el ARPU a $267 (recuperación de 3 meses).
</PredictionGate>

---

## Sección 7: Mejorando Tu Economía Unitaria

Calculaste tus números. ¿Y ahora qué?

### Las Palancas de Mejora

<SlideNavigation>
<Slide title="Palanca 1: Reducir CAC">
**Tácticas:**
- Elimina canales con CAC > LTV
- Mejora la segmentación (ICP más ajustado = mayor conversión)
- Automatiza procesos manuales (reduce el costo de tiempo)
- Mejora las tasas de conversión en cada etapa del embudo
- Negocia mejores precios de herramientas

**Impacto:** Una reducción del 10% en CAC = mejora del 10% en LTV:CAC y recuperación
</Slide>

<Slide title="Palanca 2: Aumentar LTV">
**Tácticas:**
- Reduce la pérdida (mejor incorporación, éxito del cliente)
- Añade upsells y cross-sells (ingresos por expansión)
- Aumenta los precios (ARPU más alto)
- Mejora el valor del producto (adherencia)
- Contratos anuales (efectivo por adelantado, menor pérdida)

**Impacto:** Un aumento del 10% en LTV = mejora del 10% en LTV:CAC
</Slide>

<Slide title="Palanca 3: Mejorar el Margen Bruto">
**Tácticas:**
- Reduce el COGS (infraestructura más barata, mejores acuerdos con proveedores)
- Aumenta los precios (más ingresos por unidad de costo)
- Automatiza la entrega (reduce el costo de mano de obra)
- Optimiza la infraestructura (reduce costos en la nube)

**Impacto:** Mayor margen = más efectivo para reinvertir en adquisición
</Slide>

<Slide title="Palanca 4: Acelerar la Recuperación">
**Tácticas:**
- Pago anual por adelantado (12 meses de efectivo de inmediato)
- Pago trimestral (3 meses de efectivo por adelantado)
- ARPU más alto (recuperación más rápida por mes)
- CAC más bajo (menos que recuperar)

**Impacto:** Recuperación más rápida = mejor flujo de caja = mayor capacidad de crecimiento
</Slide>
</SlideNavigation>

### El Efecto Compuesto

<ScenarioSimulator
title="Simulador de Mejora de Economía Unitaria"
persistKey="analytics-L5-improvement-sim"
levers={[
{ id: "cac-improve", label: "Reducción de CAC (%)", min: 0, max: 50, step: 5, defaultValue: 0 },
{ id: "ltv-improve", label: "Aumento de LTV (%)", min: 0, max: 50, step: 5, defaultValue: 0 },
{ id: "base-cac", label: "CAC Inicial ($)", min: 100, max: 3000, step: 100, defaultValue: 1000 },
{ id: "base-ltv", label: "LTV Inicial ($)", min: 500, max: 10000, step: 100, defaultValue: 2000 }
]}
outputs={[
{ id: "new-cac", label: "Nuevo CAC", formula: "base-cac * (1 - cac-improve / 100)", unit: "$", precision: 0 },
{ id: "new-ltv", label: "Nuevo LTV", formula: "base-ltv * (1 + ltv-improve / 100)", unit: "$", precision: 0 },
{ id: "new-ratio", label: "Nueva Relación LTV:CAC", formula: "(base-ltv * (1 + ltv-improve / 100)) / (base-cac * (1 - cac-improve / 100))", unit: ":1", precision: 2 }
]}
insight="Una reducción del {cac-improve}% en CAC + un aumento del {ltv-improve}% en LTV mejora tu LTV:CAC de {base-ltv / base-cac}:1 a {new-ratio}:1. Las pequeñas mejoras se componen."
/>

<InsightCard icon="🎯" title="La Regla 10-10-10">
Mejorar el CAC un 10%, el LTV un 10% y la conversión un 10% no te da un 30% mejor en economía unitaria — te da un **33% mejor** porque los efectos se multiplican.
</InsightCard>

### Tu Plan de Mejora de 90 Días

<InteractiveChecklist
title="Sprint de Mejora de Economía Unitaria"
persistKey="analytics-L5-improvement-plan"
items={[
"Identifica tu cuello de botella #1 de CAC (canal de mayor costo, menor ROI)",
"Elimina o pausa ese canal por 30 días",
"Reasigna tiempo/presupuesto a tu canal de mejor rendimiento",
"Implementa una táctica de reducción de pérdida (mejor incorporación, cadencia de check-in, o educación de características)",
"Prueba un aumento de precio del 10-20% en nuevos clientes",
"Añade una oferta de upsell o expansión a clientes existentes",
"Negocia mejores precios en tus 3 principales costos de herramientas",
"Automatiza un proceso de adquisición manual (investigación, contacto, o seguimiento)",
"Rastrear semanalmente: CAC, LTV, LTV:CAC y período de recuperación",
"Revisar mensualmente: compara con el mes pasado, identifica el próximo cuello de botella"
]}
/>

---

## Resumen: Los Números Que Importan

Ahora conoces las tres métricas que determinan si tu negocio sobrevive:

1. **CAC (Costo de Adquisición de Clientes)** — Incluye tu tiempo. Rastrear por canal. Elimina cualquier cosa con CAC > LTV.

2. **LTV (Valor de Vida del Cliente)** — Ingresos por cliente durante toda su relación. Auméntalo reduciendo la pérdida y añadiendo expansión.

3. **Período de Recuperación** — Meses para recuperar el CAC. Debe estar por debajo del 50% de tu runway o te quedarás sin efectivo.

**La verificación de salud:**

- LTV:CAC ≥ 3:1 (saludable)
- Recuperación ≤ 50% del runway (seguro)
- Margen bruto ≥ 70% (sostenible)

**Próxima lección:** Rastrearás el MRR segmentado por ingresos nuevos, por expansión y perdidos — la cascada que muestra exactamente de dónde viene tu crecimiento.

<InteractiveChecklist
title="Tus Elementos de Acción"
persistKey="analytics-L5-actions"
items={[
"Calcula tu CAC real (incluyendo el costo de tiempo) para el mes pasado",
"Calcula tu LTV usando tu tasa de pérdida real o el benchmark de la industria",
"Calcula tu relación LTV:CAC — ¿está por encima de 3:1?",
"Calcula tu período de recuperación — ¿está por debajo del 50% de tu runway?",
"Calcula el CAC por separado para cada canal de adquisición",
"Identifica tu mejor canal (CAC más bajo, LTV:CAC más alto) y el peor",
"Construye tu Panel de Economía Unitaria usando la plantilla",
"Elige una palanca de mejora en la que enfocarte durante los próximos 30 días",
"Establece un recordatorio de calendario para revisar estas métricas el primer viernes de cada mes"
]}
/>
