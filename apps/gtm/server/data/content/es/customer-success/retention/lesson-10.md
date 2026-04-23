---
title: "Tu Playbook de Retención"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 37: Retención y Prevención de Abandono"
lesson: 10
---

Has pasado nueve lecciones aprendiendo la mecánica de retención: puntajes de salud, señales de abandono, secuencias de reactivación, jugadas de rescate, nudges de funciones. Ahora es momento de ensamblarlos en un **sistema vivo** que funcione sin que microgestiones cada cuenta en riesgo.

Esta lección es tu **sprint de implementación de 14 días**. Al final, tendrás un playbook de retención completo — documentado, automatizado donde sea posible, y listo para funcionar con un mantenimiento semanal de 2-3 horas.

<InsightCard icon="🎯" title="La Promesa del Sistema de Retención">
Un fundador en solitario con 50-200 clientes puede reducir el abandono entre 25-40% en 90 días con un sistema que requiere 2-3 horas por semana, no 20.
</InsightCard>

## El Problema con la "Retención Reactiva"

La mayoría de los fundadores en solitario hacen retención así:

- Cliente cancela → corren a rescatarlo
- El uso baja → lo notan 3 semanas después cuando cancela
- Llega ticket de soporte → lo responden, luego se olvidan del cliente
- Oportunidad de expansión → la pierden porque están apagando incendios

**Resultado:** 5-8% de abandono mensual, apagar incendios constante, cero ingresos de expansión.

La alternativa es un **sistema de retención proactivo** que:

1. **Detecta riesgo temprano** (puntajes de salud + rastreo de señales)
2. **Interviene automáticamente** (secuencias de reactivación, nudges de funciones)
3. **Escala estratégicamente** (jugadas de rescate para cuentas de alto valor)
4. **Aprende continuamente** (retrospectivas mensuales, actualizaciones del playbook)

<FlipCard
  front="La Paradoja de la Retención"
  back="Mientras menos tiempo pases en retención, mejor es tu retención — porque los sistemas escalan, el pánico no."
/>

## Tu Construcción del Sistema de Retención en 14 Días

<SlideNavigation>
<Slide title="Días 1-3: Fundamentos">

**Objetivo:** Configurar tu infraestructura de puntaje de salud y métricas base.

### Día 1: Configuración del Puntaje de Salud

- Construye tu hoja de cálculo de puntaje de salud (Uso 40% + Engagement 30% + Negocio 30%)
- Conecta fuentes de datos: GA4 para logins, ESP para engagement de email, Stripe/Mercado Pago para pagos
- Puntúa tu base de clientes actual y clasifica en zonas Verde/Amarillo/Rojo

### Día 2: Rastreo de Señales de Abandono

- Configura tu tracker de 7 señales (frecuencia de login, uso de funciones, engagement de email, tickets de soporte, comportamiento de pago, NPS, expansión)
- Configura alertas: Zapier o n8n para señalar cuando las señales cruzan umbrales rojos
- Establece tu tasa de abandono actual y NRR como base

### Día 3: Análisis de Benchmarks

- Compara tus métricas con benchmarks de SaaS SMB (&lt;3% abandono mensual, NRR ≥100%)
- Ejecuta un análisis de cohortes: ¿qué meses de registro tienen la mejor/peor retención?
- Identifica tu "precipicio de abandono" — el punto donde la mayoría de los clientes se van

<InteractiveChecklist
title="Checklist de Días 1-3"
persistKey="retention-L10-foundation"
items={[
"Hoja de cálculo de puntaje de salud construida y poblada",
"7 señales de abandono rastreadas con umbrales rojos definidos",
"Tasa de abandono actual y NRR calculados",
"Análisis de cohortes completado",
"Comparación con benchmarks documentada"
]}
/>

</Slide>

<Slide title="Días 4-7: Automatización">

**Objetivo:** Conectar tus secuencias de intervención automatizadas.

### Día 4: Secuencia de Reactivación

- Escribe tu secuencia de 3 emails de reactivación (Día 7, Día 14, Día 21 de inactividad)
- Configura automatización en tu ESP (Brevo, ConvertKit, Customer.io)
- Configura trigger: "Sin login en 7 días" → enviar Email 1

### Día 5: Nudges de Adopción de Funciones

- Identifica tus 3 funciones sticky (las que usan los clientes retenidos y no usan los que abandonan)
- Crea calendario de introducción gradual: Día 1 función principal, Día 7 segunda función, Día 14 tercera función
- Escribe emails spotlight de funciones

### Día 6: Automatización de Jugadas de Rescate

- Construye tu flujo de cancelación: (1) Pregunta por qué, (2) Ofrece jugada de rescate, (3) Opción de downgrade/pausa, (4) Encuesta de salida
- Escribe guiones de rescate para cada razón de cancelación
- Configura alerta de Zapier para intentos de cancelación de alto valor ($200+/mes) → te notifica para llamada personal

### Día 7: Prueba

- Activa manualmente cada automatización con cuentas de prueba
- Verifica que los emails se envíen, las alertas disparen y los escalamientos se enruten correctamente

<InteractiveChecklist
title="Checklist de Días 4-7"
persistKey="retention-L10-automation"
items={[
"Secuencia de 3 emails de reactivación en vivo",
"Calendario de adopción gradual de funciones configurado",
"Flujo de cancelación con jugadas de rescate implementado",
"Alertas de cancelación de alto valor configuradas",
"Todas las automatizaciones probadas end-to-end"
]}
/>

</Slide>

<Slide title="Días 8-10: Documentación del Playbook">

**Objetivo:** Documentar tu sistema de retención para que sea repetible y entrenable.

### Día 8: Playbook de Puntaje de Salud

- Documenta tu modelo: señales, pesos, umbrales, definiciones de zonas
- Escribe protocolos de acción para cada zona

### Día 9: Guiones de Jugadas de Rescate

- Compila todos tus guiones de rescate en un solo documento
- Agrega ejemplos reales de tu primera semana de pruebas

### Día 10: Plantilla de Revisión Semanal de CS

- Crea tu agenda de revisión semanal de 2-3 horas
- Configura bloque recurrente de calendario

<InteractiveChecklist
title="Checklist de Días 8-10"
persistKey="retention-L10-playbook"
items={[
"Playbook de puntaje de salud documentado",
"Guiones de jugadas de rescate compilados",
"Plantilla de revisión semanal de CS creada",
"Bloque de calendario agendado",
"Playbook compartido con cualquier miembro del equipo o futuras contrataciones"
]}
/>

</Slide>

<Slide title="Días 11-14: Ejecución en Vivo">

**Objetivo:** Ejecutar tu primera semana completa del sistema de retención.

### Día 11: Primera Revisión Semanal

- Ejecuta tu primera revisión de CS de 2-3 horas siguiendo la plantilla
- Señala cuentas que cambiaron de zona
- Envía emails de reactivación a usuarios dormidos

### Día 12: Ejecutar Top 3 Acciones

- De tu revisión semanal, elige las 3 acciones de mayor impacto
- Ejecútalas. Documenta resultados.

### Día 13: Monitorear Automatización

- Verifica que las secuencias automatizadas estén disparando correctamente
- Revisa respuestas a emails de reactivación

### Día 14: Primera Retrospectiva

- Revisa tus datos de la primera semana
- Actualiza tu playbook basándote en lo que aprendiste

<InteractiveChecklist
title="Checklist de Días 11-14"
persistKey="retention-L10-execution"
items={[
"Primera revisión semanal de CS completada",
"Top 3 acciones ejecutadas y documentadas",
"Verificación de salud de automatización completada",
"Primera retrospectiva conducida",
"Playbook actualizado con aprendizajes de la Semana 1"
]}
/>

</Slide>
</SlideNavigation>

## Construyendo Tu Documento de Playbook de Retención

Tu playbook de retención es la **única fuente de verdad** de cómo gestionas la salud del cliente.

<TemplateBuilder
title="Estructura de Tu Playbook de Retención"
persistKey="retention-L10-playbook-builder"
sections={[
{
id: "health-model",
title: "Modelo de Puntaje de Salud",
fields: [
{ id: "usage-signals", label: "Señales de Uso (40% peso)", placeholder: "ej., Frecuencia de login (últimos 14 días), Frecuencia de acción principal, Amplitud de funciones", type: "textarea" },
{ id: "engagement-signals", label: "Señales de Engagement (30% peso)", placeholder: "ej., Tasa de apertura de email, Interacción con soporte, Puntaje NPS", type: "textarea" },
{ id: "business-signals", label: "Señales de Negocio (30% peso)", placeholder: "ej., Historial de pagos, Tier del plan, Antigüedad", type: "textarea" }
]
},
{
id: "zone-actions",
title: "Protocolos de Acción por Zona",
fields: [
{ id: "green-protocol", label: "Acciones Zona Verde (75-100)", placeholder: "ej., Check-in mensual, Escaneo de oportunidad de expansión, Encuesta NPS trimestral", type: "textarea" },
{ id: "yellow-protocol", label: "Acciones Zona Amarilla (50-74)", placeholder: "ej., Verificación semanal, Contacto proactivo, Nudges de adopción de funciones", type: "textarea" },
{ id: "red-protocol", label: "Acciones Zona Roja (0-49)", placeholder: "ej., Intervención urgente dentro de 48 horas, Llamada personal si $200+/mes, Despliegue de jugada de rescate", type: "textarea" }
]
},
{
id: "automation",
title: "Secuencias Automatizadas",
fields: [
{ id: "reactivation", label: "Triggers de Secuencia de Reactivación", placeholder: "ej., Sin login en 7 días → Email 1, Sin login en 14 días → Email 2", type: "textarea" },
{ id: "feature-nudges", label: "Calendario de Nudge de Adopción de Funciones", placeholder: "ej., Día 1: Función principal, Día 7: Segunda función, Día 14: Tercera función", type: "textarea" },
{ id: "save-plays", label: "Reglas de Automatización de Jugadas de Rescate", placeholder: "ej., Intención de cancelación + razón precio → Oferta de downgrade, Cancelación de alto valor → Alerta para llamada personal", type: "textarea" }
]
},
{
id: "weekly-review",
title: "Agenda de Revisión Semanal de CS",
fields: [
{ id: "review-steps", label: "Pasos de Revisión (2-3 horas)", placeholder: "ej., 0:00-0:30 Escaneo de puntaje de salud, 0:30-1:00 Cola de reactivación, 1:00-1:30 Pipeline de expansión", type: "textarea" },
{ id: "top-3-criteria", label: "Criterios de Selección de Top 3 Acciones", placeholder: "ej., Mayor urgencia + mayor valor = prioridad 1, Zona amarilla alto valor = prioridad 2", type: "textarea" }
]
}
]}
/>

## La Revisión Semanal de CS en Acción

<ExampleCard label="Caso de Estudio: La Primera Revisión Semanal de Valentina">

**Contexto:** Valentina ejecuta una herramienta SaaS de $15K MRR para creadores de contenido. Tiene 150 clientes a $100/mes promedio.

**Revisión de la Semana 1 (2.5 horas):**

**0:00-0:30 — Escaneo de Puntaje de Salud**

- 12 cuentas pasaron de Verde a Amarillo (uso cayó 30%+)
- 3 cuentas pasaron de Amarillo a Rojo (sin logins en 14+ días)
- 2 cuentas pasaron de Amarillo a Verde (se re-engancharon después de nudge de función)

**0:30-1:00 — Cola de Reactivación**

- 18 cuentas sin login en 7-10 días → Email 1 automático ya enviado
- 7 cuentas sin login en 14 días → Email 2 automático ya enviado
- **Acción:** Revisó respuestas a emails de reactivación. 4 respondieron pidiendo ayuda. Agregó al Top 3.

**1:00-1:30 — Pipeline de Expansión**

- 8 cuentas Verdes usando todas las funciones + alto engagement → candidatos potenciales de upsell
- 2 cuentas en plan Básico con patrones de uso que coinciden con usuarios Pro → enviar oferta de upgrade
- **Acción:** Redactó 2 emails personalizados de upgrade. Agregó al Top 3.

**1:30-2:00 — Revisión de Feedback**

- 3 respuestas de NPS: 2 promotores (9-10), 1 detractor (4)
- Razón del detractor: "Falta integración con [herramienta]"
- **Acción:** Respondió al detractor con actualización del roadmap. Agregó al Top 3.

**2:00-2:30 — Ejecutar Top 3**

1. Respondió a 4 respuestas de email de reactivación con ofertas personalizadas de ayuda
2. Envió 2 emails de upgrade a candidatos de expansión
3. Respondió al detractor de NPS con actualización del roadmap

**Resultado:** Valentina pasó 2.5 horas y recuperó 1 cliente abandonando, expandió 1 cuenta e identificó un nuevo patrón de adopción de funciones. Impacto proyectado: -$100 de abandono prevenido, +$50 de expansión = $150 de MRR salvado/ganado en una semana.

</ExampleCard>

<RangeSlider
  label="¿Qué tan seguro te sientes ejecutando una revisión semanal de CS como la de Valentina?"
  min={1}
  max={10}
  lowLabel="No muy seguro"
  highLabel="Muy seguro"
  persistKey="retention-L10-review-confidence"
/>

## Recetas de Automatización: Configúralo y (Casi) Olvídalo

El objetivo es automatizar 70-80% del trabajo de retención para que tu revisión semanal se enfoque en el 20% que necesita juicio humano.

<ClassifyExercise
title="¿Automatizar o Manual?"
persistKey="retention-L10-classify"
categories={[
{ id: "automate", label: "Automatizar", color: "#10b981" },
{ id: "manual", label: "Manual (Toque Humano)", color: "#3b82f6" }
]}
items={[
{ id: "1", content: "Enviar Email 1 de reactivación a usuarios sin login en 7 días", correctCategory: "automate", explanation: "Acción de alto volumen y bajo contacto. Automatízala." },
{ id: "2", content: "Llamar a un cliente de $500/mes que acaba de pasar a zona Roja", correctCategory: "manual", explanation: "Cuentas de alto valor necesitan atención personal." },
{ id: "3", content: "Enviar email spotlight de función a usuarios que completaron onboarding", correctCategory: "automate", explanation: "Es una secuencia gradual. Automatízala." },
{ id: "4", content: "Responder a un cliente que contestó al email de reactivación pidiendo ayuda", correctCategory: "manual", explanation: "Se están enganchando. Respuesta personal construye confianza." },
{ id: "5", content: "Señalar cuentas que bajan de Verde a Amarillo en puntaje de salud", correctCategory: "automate", explanation: "Alerta automatizada. Tú decides qué hacer con la señal." },
{ id: "6", content: "Ofrecer downgrade a cliente que dice 'muy caro' en flujo de cancelación", correctCategory: "automate", explanation: "Jugada de rescate automatizada. Si aceptan, genial. Si no, escalar a manual." }
]}
/>

<ProgressiveReveal title="Las 5 Automatizaciones Principales de Retención" persistKey="retention-L10-automations">

<RevealSection title="1. Secuencia de Reactivación (Sin Login en 7+ Días)">

**Trigger:** Usuario no ha hecho login en 7 días

**Automatización:**

- Día 7: Enviar Email 1 ("Check-in rápido")
- Día 14: Enviar Email 2 ("Te estás perdiendo [valor]")
- Día 21: Enviar Email 3 ("¿Puedo ayudar?")
- Si no hay respuesta al Email 3 + cuenta es de alto valor ($200+/mes) → Alertarte para llamada personal o WhatsApp

**Resultado Esperado:** 25-35% tasa de apertura, 5-10% tasa de re-engagement

</RevealSection>

<RevealSection title="2. Goteo de Adopción de Funciones (Días 1, 7, 14, 30)">

**Trigger:** Usuario completa onboarding

**Automatización:**

- Día 1: Email de bienvenida + tutorial de función principal
- Día 7: Email spotlight de segunda función
- Día 14: Email spotlight de tercera función
- Día 30: Email de "power user" introduciendo funciones avanzadas

**Resultado Esperado:** 30-40% de aumento en adopción de funciones

</RevealSection>

<RevealSection title="3. Alertas de Puntaje de Salud (Cambios de Zona)">

**Trigger:** Cuenta pasa de Verde a Amarillo o Amarillo a Rojo

**Automatización:**

- Verde → Amarillo: Agregar a cola de revisión semanal
- Amarillo → Rojo: Enviar alerta de Slack/WhatsApp + señalar para revisión inmediata
- Amarillo → Rojo + alto valor ($200+/mes): Enviar alerta urgente + agendar llamada

</RevealSection>

<RevealSection title="4. Flujo de Cancelación con Jugadas de Rescate">

**Trigger:** Usuario hace clic en "Cancelar suscripción"

**Automatización:**

- Paso 1: Preguntar por qué (radio buttons: precio, no lo uso, falta función, competidor, presupuesto, otro)
- Paso 2: Basándose en la razón, ofrecer jugada de rescate contextual
- Paso 3: Si sigue cancelando → Encuesta de salida + email de "la puerta está abierta"

**Resultado Esperado:** 20-40% de tasa de rescate (downgrade + pausa combinados)

</RevealSection>

<RevealSection title="5. Alertas de Oportunidad de Expansión">

**Trigger:** Cuenta en zona Verde muestra señales de expansión

**Automatización:**

- Escaneo semanal: Identificar cuentas Verdes con patrones de uso que coincidan con tier superior
- Alertarte con: Nombre de cuenta, plan actual, upgrade sugerido, datos de uso
- Tú decides: Enviar email personalizado de upgrade o esperar

</RevealSection>

</ProgressiveReveal>

## Retrospectiva Mensual: Aprendiendo de Tus Datos

Cada mes, dedica 30-60 minutos a revisar el rendimiento de tu sistema de retención.

<TemplateBuilder
title="Retrospectiva Mensual de Retención"
persistKey="retention-L10-retrospective"
sections={[
{
id: "metrics",
title: "Revisión de Métricas Clave",
fields: [
{ id: "churn-rate", label: "Tasa de Abandono Mensual (Este Mes vs Mes Pasado)", placeholder: "ej., 5.2% → 4.1% (21% de mejora)", type: "text" },
{ id: "nrr", label: "Retención Neta de Ingresos (Este Mes)", placeholder: "ej., 98% (objetivo: 100%+)", type: "text" },
{ id: "reactivation-rate", label: "Tasa de Éxito de Secuencia de Reactivación", placeholder: "ej., 8% de usuarios dormidos se re-engancharon", type: "text" },
{ id: "save-rate", label: "Tasa de Éxito de Jugadas de Rescate", placeholder: "ej., 35% de intentos de cancelación rescatados (downgrade + pausa)", type: "text" }
]
},
{
id: "patterns",
title: "Patrones Notados",
fields: [
{ id: "churn-reasons", label: "Top 3 Razones de Abandono Este Mes", placeholder: "ej., 1. No lo usa (40%), 2. Muy caro (25%), 3. Falta función (20%)", type: "textarea" },
{ id: "cohort-insights", label: "Insights de Análisis de Cohortes", placeholder: "ej., La cohorte de marzo tiene 15% mejor retención que enero — mejoras de onboarding funcionando", type: "textarea" },
{ id: "feature-adoption", label: "Patrones de Adopción de Funciones", placeholder: "ej., Usuarios que adoptan Función B en primeros 14 días tienen 3x menor abandono", type: "textarea" }
]
},
{
id: "actions",
title: "Actualizaciones del Playbook",
fields: [
{ id: "what-worked", label: "Qué Funcionó (Seguir Haciendo)", placeholder: "ej., Llamadas personales a cuentas Rojas de alto valor rescataron 50% de ellas", type: "textarea" },
{ id: "what-didnt", label: "Qué No Funcionó (Dejar o Cambiar)", placeholder: "ej., Email 2 de reactivación genérico tuvo &lt;10% de tasa de apertura — necesita más personalización", type: "textarea" },
{ id: "experiments", label: "Experimentos del Próximo Mes", placeholder: "ej., Probar oferta de pausa vs oferta de downgrade para cancelaciones por 'muy caro'", type: "textarea" }
]
}
]}
/>

## El Modelo de Madurez del Sistema de Retención

<SlideNavigation>
<Slide title="Etapa 1: Reactivo (Donde Empezaste)">

- Sin puntaje de salud
- Abandono descubierto cuando el cliente cancela
- 5-8% abandono mensual
- **Inversión de tiempo:** 5-10 horas/semana apagando incendios

</Slide>

<Slide title="Etapa 2: Sistema Básico (Después del Sprint de 14 Días)">

- Modelo de puntaje de salud implementado
- Secuencias de reactivación automatizadas funcionando
- 4-6% abandono mensual
- **Inversión de tiempo:** 2-3 horas/semana

</Slide>

<Slide title="Etapa 3: Sistema Optimizado (3-6 Meses)">

- Puntaje de salud refinado con datos
- Nudges de adopción de funciones aumentan stickiness
- 3-4% abandono mensual, NRR acercándose a 100%
- **Inversión de tiempo:** 2-3 horas/semana, firefighting mínimo

</Slide>

<Slide title="Etapa 4: Sistema Predictivo (6-12 Meses)">

- Predicción de abandono 4-6 semanas de anticipación
- CS se convierte en motor de ingresos (NRR >100%)
- &lt;3% abandono mensual, NRR 105-110%
- **Inversión de tiempo:** 2-3 horas/semana, sistema funciona solo

</Slide>
</SlideNavigation>

<RangeSlider
  label="¿En qué etapa está tu sistema de retención ahora?"
  min={1}
  max={4}
  lowLabel="Etapa 1 (Reactivo)"
  highLabel="Etapa 4 (Predictivo)"
  persistKey="retention-L10-maturity"
/>

## Errores Comunes y Cómo Evitarlos

<ProgressiveReveal title="Los 5 Modos de Fallo del Sistema de Retención" persistKey="retention-L10-pitfalls">

<RevealSection title="1. Sobre-Automatizar (La Trampa del 'Configúralo y Olvídalo')">

**Síntoma:** Construyes todas las automatizaciones, luego nunca verificas si están funcionando.

**Solución:** Verificación mensual de salud de automatización. Prueba cada secuencia, revisa entregabilidad, verifica triggers de alertas.

</RevealSection>

<RevealSection title="2. Parálisis de Análisis (La Trampa del 'Puntaje Perfecto')">

**Síntoma:** Pasas semanas ajustando tu modelo de puntaje de salud. Nunca lo usas para intervenir.

**Solución:** Empieza con el modelo simple de 3 dimensiones. Ejecútalo un mes. Refina basándote en resultados reales.

</RevealSection>

<RevealSection title="3. Ignorar la Zona Amarilla (La Trampa de 'Solo Alerta Roja')">

**Síntoma:** Solo actúas en cuentas Rojas. Las Amarillas se deslizan a Rojo antes de que lo notes.

**Solución:** Zona Amarilla es donde tienes la mayor tasa de rescate (40-60%). Contacto proactivo previene que se vuelvan Rojas.

</RevealSection>

<RevealSection title="4. Jugadas de Rescate Genéricas (La Trampa de 'Talla Única')">

**Síntoma:** Ofreces el mismo downgrade o pausa a cada cancelación, sin importar la razón.

**Solución:** Jugadas de rescate contextuales basadas en la razón de cancelación.

</RevealSection>

<RevealSection title="5. Sin Retrospectivas (La Trampa del 'Día de la Marmota')">

**Síntoma:** Ejecutas el mismo playbook mes a mes sin aprender de los datos.

**Solución:** Retrospectiva mensual. ¿Qué funcionó? ¿Qué no? ¿Qué experimentos deberías ejecutar el próximo mes?

</RevealSection>

</ProgressiveReveal>

## Tu Sprint Final de Implementación

<InteractiveChecklist
title="Tu Sprint de Sistema de Retención de 14 Días"
persistKey="retention-L10-final-sprint"
items={[
"Días 1-3: Configuración de puntaje de salud, rastreo de señales de abandono, análisis de benchmarks",
"Días 4-7: Secuencia de reactivación, nudges de funciones, jugadas de rescate, prueba de automatización",
"Días 8-10: Documentación del playbook, plantilla de revisión semanal, bloque de calendario agendado",
"Días 11-14: Primera revisión semanal, ejecución de Top 3, monitoreo de automatización, primera retrospectiva",
"Mes 2: Ejecutar revisiones semanales consistentemente, rastrear métricas, conducir primera retrospectiva mensual",
"Mes 3: Refinar playbook basándote en datos, optimizar jugadas de rescate, reducir abandono en 25%+"
]}
/>

## Qué se Ve el Éxito en 90 Días

<ScenarioSimulator
title="Tu Proyección de Retención a 90 Días"
persistKey="retention-L10-projection"
levers={[
{ id: "currentChurn", label: "Abandono Mensual Actual (%)", min: 3, max: 10, step: 0.5, defaultValue: 5 },
{ id: "customers", label: "Conteo Actual de Clientes", min: 20, max: 500, step: 10, defaultValue: 100 },
{ id: "arpu", label: "Ingreso Promedio Por Usuario ($)", min: 50, max: 500, step: 10, defaultValue: 100 }
]}
outputs={[
{ id: "currentChurnMRR", label: "Pérdida Mensual Actual por Abandono", formula: "(customers * arpu * (currentChurn / 100))", unit: "$", precision: 0 },
{ id: "targetChurn", label: "Abandono Objetivo (25% reducción)", formula: "(currentChurn * 0.75)", unit: "%", precision: 1 },
{ id: "targetChurnMRR", label: "Pérdida Mensual Objetivo por Abandono", formula: "(customers * arpu * (targetChurn / 100))", unit: "$", precision: 0 },
{ id: "monthlySavings", label: "MRR Mensual Salvado", formula: "(currentChurnMRR - targetChurnMRR)", unit: "$", precision: 0 },
{ id: "annualImpact", label: "Impacto Anual en MRR", formula: "(monthlySavings * 12)", unit: "$", precision: 0 }
]}
insight="Con {targetChurn}% de abandono mensual, salvas ${monthlySavings}/mes o ${annualImpact}/año. Eso es suficiente para financiar todo tu stack de herramientas y más."
/>

## Checklist de Tu Playbook de Retención

<InteractiveChecklist
title="Checklist de Finalización del Playbook de Retención"
persistKey="retention-L10-completion"
items={[
"Modelo de puntaje de salud construido y documentado",
"7 señales de abandono rastreadas con umbrales rojos",
"Secuencia de reactivación (3 emails) en vivo y probada",
"Calendario de adopción gradual de funciones configurado",
"Flujo de cancelación con jugadas de rescate implementado",
"Plantilla de revisión semanal de CS creada y bloque de calendario agendado",
"Documento de playbook creado (Google Doc/Notion) con todos los protocolos",
"Primera revisión semanal completada",
"Primera retrospectiva mensual agendada",
"Verificación de salud de automatización agendada (recurrente mensual)"
]}
/>

## El Efecto Compuesto de la Retención

**La adquisición es lineal. La retención es exponencial.**

Una reducción del 2% en abandono mensual vale 10-20% más de ingresos en 12 meses sin adquirir un solo cliente nuevo. Ese es el poder de la retención.

<InsightCard icon="💡" title="El Multiplicador de Retención">
Una reducción del 2% en abandono mensual vale 10-20% más de ingresos en 12 meses sin adquirir un solo cliente nuevo. Ese es el poder de la retención.
</InsightCard>

---

**Felicidades.** Has completado el Curso 37: Retención y Prevención de Abandono.

Ahora tienes:

- Un modelo de puntaje de salud que detecta riesgo temprano
- Secuencias automatizadas que intervienen proactivamente
- Jugadas de rescate que recuperan cuentas en riesgo
- Un sistema de revisión semanal que funciona con 2-3 horas/semana
- Un playbook que compone valor cada mes

**El siguiente paso:** Ejecuta tu sprint de 14 días. Construye el sistema. Ejecútalo por 90 días. Observa cómo baja tu abandono y sube tu NRR.

La retención no es sexy. Pero es la actividad de crecimiento de mayor apalancamiento que puedes hacer como fundador en solitario.

Ahora ve a prevenir algo de abandono.
