---
title: "La Matriz de Fallas de Automatización: Qué Nunca Automatizar"
duration: "50 min"
track: "Adquisición con IA"
course: "Curso 21: Estrategia de Adquisición con IA"
lesson: 6
---

## El Bloqueo de LinkedIn de $47,000

Sarah lo tenía todo calculado. Su stack de IA funcionaba perfectamente: Apollo alimentando a Clay, Clay alimentando a Instantly, Instantly alimentando a LinkedIn. Había automatizado 200 solicitudes de conexión personalizadas por día, cada una con un mensaje inicial que hacía referencia a la publicación reciente del prospecto.

El sistema funcionó durante 11 días.

El día 12, LinkedIn bloqueó su cuenta permanentemente. No la suspendió — la _bloqueó_. Perdió:

- 3,200 conexiones (incluyendo 40 prospectos cálidos)
- 18 meses de historial de contenido
- Su licencia de Sales Navigator
- Acceso a 6 conversaciones activas que valían $47K en pipeline

La automatización funcionó perfectamente. Ese fue el problema.

<InsightCard icon="⚠️" title="La Paradoja de la Automatización">
Cuanto mejor funciona tu automatización, más rápido puede destruir lo que tardaste años en construir. Esta lección te enseña la **Matriz de Fallas de Automatización** — un marco para decidir qué automatizar, qué supervisar con revisión humana, y qué nunca tocar.
</InsightCard>

---

## El Marco de Decisión de Dos Ejes

No toda automatización conlleva el mismo riesgo. Algunas tareas son _seguras_ de automatizar (entrada de datos, verificación de email). Otras son _peligrosas_ (negociación de precios, reparación de relaciones). La diferencia no es obvia hasta que las mapeas.

<FlipCard
  front="La Matriz de Fallas de Automatización"
  back="Una cuadrícula 2×2 que grafica el Riesgo de Falla (bajo a alto) frente al Ahorro de Tiempo (bajo a alto). Cuatro cuadrantes: C1 Automatizar Ahora, C2 Automatizar + Control Humano, C3 Mantener Humano, C4 Eliminar."
/>

Así funciona:

**Eje X: Ahorro de Tiempo** — ¿Cuántas horas por semana recuperas al automatizar esta tarea?
**Eje Y: Riesgo de Falla** — Si la automatización comete un error, ¿cuál es el peor resultado posible?

Mapeemos 20 tareas comunes de adquisición:

<ClassifyExercise
title="Mapea Estas Tareas a la Matriz"
persistKey="ai-acquisition-strategy-L6-classify"
categories={[
{ id: "q1", label: "C1: Automatizar Ahora", color: "#10b981" },
{ id: "q2", label: "C2: Automatizar + Control Humano", color: "#f59e0b" },
{ id: "q3", label: "C3: Mantener Humano", color: "#ef4444" },
{ id: "q4", label: "C4: Eliminar", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Verificación de dirección de email", correctCategory: "q1" },
{ id: "2", content: "Primeras líneas personalizadas generadas por IA", correctCategory: "q2" },
{ id: "3", content: "Llamada de descubrimiento con prospecto de $50K+", correctCategory: "q3" },
{ id: "4", content: "Formatear manualmente notas del CRM", correctCategory: "q4" },
{ id: "5", content: "Solicitudes de conexión en LinkedIn (200/día)", correctCategory: "q3" },
{ id: "6", content: "Enviar seguimiento #3 en una secuencia", correctCategory: "q1" },
{ id: "7", content: "Negociación de precios", correctCategory: "q3" },
{ id: "8", content: "Puntuación de leads basada en firmografía", correctCategory: "q1" },
{ id: "9", content: "Chatbot de IA calificando leads entrantes", correctCategory: "q2" },
{ id: "10", content: "Disculparse con un cliente molesto", correctCategory: "q3" }
]}
/>

---

## Cuadrante 1: Automatizar Ahora (Alto Ahorro, Bajo Riesgo)

Estas son tus **automatizaciones obvias**. Alto ahorro de tiempo, mínimas consecuencias si algo falla.

### Qué Pertenece Aquí

| Tarea                              | Herramienta                  | Por Qué Es Seguro                                             |
| ---------------------------------- | ---------------------------- | ------------------------------------------------------------- |
| Verificación de email              | MillionVerifier, NeverBounce | En el peor caso: envías a un email malo (pasa de todos modos) |
| Entrada de datos en CRM            | Zapier, Make                 | Los errores son visibles y corregibles                        |
| Secuencias de calentamiento        | Instantly, Smartlead         | Diseñadas para esto; bajo volumen                             |
| Reserva de calendario              | Calendly, Cal.com            | El usuario confirma; puedes cancelar                          |
| Recordatorios de seguimiento       | HubSpot, Pipedrive           | Solo un aviso; tú decides                                     |
| Puntuación de leads (firmográfica) | Apollo, Clay                 | Basada en datos objetivos                                     |

<ExampleCard label="Implementación Real: Verificación Automática">
**Antes:** Verificar manualmente 200 emails/semana en Hunter.io = 3 horas
**Después:** Zapier activa MillionVerifier en nuevas exportaciones de Apollo = 0 horas
**Riesgo:** Casi nulo. Los emails inválidos simplemente rebotan; no estás en peor situación.
**Ahorro:** 12 horas/mes
</ExampleCard>

<InteractiveChecklist
title="Auditoría de Automatizaciones C1"
persistKey="ai-acquisition-strategy-L6-q1-audit"
items={[
"Configura verificación de email en todas las importaciones de listas nuevas",
"Automatiza actualizaciones del CRM desde formularios enviados y respuestas de email",
"Configura enlaces de reserva de calendario en firmas de email",
"Activa secuencias de calentamiento en nuevos dominios de envío",
"Crea flujos en Zapier para actualizaciones de puntuación de leads"
]}
/>

---

## Cuadrante 2: Automatizar + Control Humano (Alto Ahorro, Alto Riesgo)

Aquí es donde **vive la mayor parte del alcance con IA**. Enormes ahorros de tiempo, pero los errores son costosos. La solución: la IA redacta, el humano aprueba.

### El Modelo Draft + Human Gate (DHG)

<FlipCard
  front="¿Qué es DHG?"
  back="La IA genera el 100% de los resultados. Los humanos revisan un porcentaje basado en el nivel de riesgo. 20% superior: revisión completa. 50% medio: revisión rápida. 30% inferior: verificación aleatoria del 10%."
/>

Esto es lo que pertenece en C2:

| Tarea                                   | Herramienta IA         | Control Humano                                     | Por Qué el Control Importa                        |
| --------------------------------------- | ---------------------- | -------------------------------------------------- | ------------------------------------------------- |
| Primeras líneas de email personalizadas | Clay, ChatGPT          | Revisa el 20% superior para detectar alucinaciones | La IA inventa detalles falsos el 5-10% del tiempo |
| Aperturas de DM en LinkedIn             | Instantly, Claude      | Revisa todo antes de enviar                        | Los bloqueos de LinkedIn son permanentes          |
| Calificación por chatbot                | Chatbase, Intercom Fin | Revisa conversaciones marcadas                     | La mala calificación desperdicia tiempo de ventas |
| Borradores de contenido                 | ChatGPT, Jasper        | Edita por voz y exactitud                          | El contenido genérico de IA daña la marca         |
| Puntuación de leads (comportamental)    | Clay, Apollo           | Audita puntuaciones mensualmente                   | El decaimiento de señales no es obvio             |

### La Prueba de Personalización FASP

Antes de enviar personalización generada por IA, pásala por **FASP**:

<TemplateBuilder
title="Auditoría de Personalización FASP"
persistKey="ai-acquisition-strategy-L6-fasp"
sections={[
{
id: "test",
title: "Prueba Tu Salida de IA",
fields: [
{ id: "line", label: "Primera Línea Generada por IA", placeholder: "ej., Vi que recientemente te uniste a Acme Corp como VP de Marketing...", type: "textarea" },
{ id: "factual", label: "F — ¿Factual? (¿Puedes verificar que esto es cierto?)", placeholder: "Sí/No + fuente", type: "text" },
{ id: "relevant", label: "A — ¿Actualmente Relevante? (¿Esto les importa?)", placeholder: "Sí/No + por qué", type: "text" },
{ id: "specific", label: "S — ¿Específico para Esta Persona? (¿O aplica a 100 otros?)", placeholder: "Sí/No", type: "text" },
{ id: "proud", label: "P — ¿Orgulloso si Supieran? (¿Admitirías cómo lo encontraste?)", placeholder: "Sí/No", type: "text" }
]
}
]}
/>

<InsightCard icon="🚨" title="El Impuesto de Alucinación">
En una prueba de 500 aperturas de LinkedIn generadas por IA, el **8.4%** hacía referencia a detalles que no existían (cambios de trabajo inventados, publicaciones inventadas, empresas incorrectas). Cada alucinación que llega a un prospecto daña la confianza permanentemente. Los 5 minutos que ahorras no valen el costo reputacional.
</InsightCard>

### Estrategia de Revisión por Niveles

No todos los prospectos merecen el mismo tiempo de revisión. Usa tu modelo de puntuación de leads (Lección 4) para asignar la atención humana:

<SlideNavigation>
<Slide title="Nivel 1: 20% Superior (Puntuación 8-10)">
**Revisión Manual Completa** — 2-5 minutos por prospecto

- Lee las notas de investigación de la IA
- Verifica los hechos de personalización
- Personaliza la propuesta de valor
- Redacta la primera línea a mano si es necesario
- Revisa antes de enviar

**Por qué:** Estos son tus prospectos de mayor valor. Un solo cierre paga por 100 horas de tiempo de revisión.
</Slide>

<Slide title="Nivel 2: 50% Medio (Puntuación 5-7)">
**Revisión Rápida** — 30-60 segundos por prospecto

- Escanea en busca de alucinaciones obvias
- Verifica que la plantilla del segmento coincida
- Verifica que el CTA sea apropiado
- Aprueba el envío en lote

**Por qué:** Buen ajuste, pero no vale la personalización profunda. La personalización de plantilla + segmento es suficiente.
</Slide>

<Slide title="Nivel 3: 30% Inferior (Puntuación 1-4)">
**Verificación Aleatoria del 10%** — Revisa una muestra aleatoria

- Extrae 10 emails aleatorios del lote
- Verifica problemas sistémicos
- Si >2 tienen problemas, revisa todos
- De lo contrario, envía

**Por qué:** Bajo valor esperado. Tu tiempo se invierte mejor en Niveles 1 y 2.
</Slide>
</SlideNavigation>

<RangeSlider
  label="¿Qué % de tu alcance generado por IA revisas actualmente antes de enviar?"
  min={0}
  max={100}
  lowLabel="0% (completamente automático)"
  highLabel="100% (todo manual)"
  persistKey="ai-acquisition-strategy-L6-review-rate"
/>

---

## Cuadrante 3: Mantener Humano (Bajo Ahorro, Alto Riesgo)

Algunas tareas _parecen_ automatizables porque son repetitivas. Pero la relación riesgo-recompensa es terrible. **Mantenlas humanas.**

### Lo Que Nunca Se Automatiza

| Tarea                                 | Por Qué Gana el Humano                   | Qué Pasa Si Lo Automatizas                                          |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| Llamadas de descubrimiento            | Matiz, rapport, pivotes en tiempo real   | Los prospectos se sienten procesados; la tasa de cierre se desploma |
| Negociación de precios                | Contexto, autoridad, creatividad         | Dejas dinero sobre la mesa o pierdes deals                          |
| Reparación de relaciones              | Empatía, responsabilidad                 | Los clientes enojados se convierten en detractores públicos         |
| Alcance del 20% superior              | Profundidad de personalización           | Las tasas de respuesta caen del 30% al 5%                           |
| Compromiso en LinkedIn (alto volumen) | TOS de la plataforma, valor de la cuenta | Bloqueo permanente (ver la historia de Sarah)                       |

<ExampleCard label="Caso de Estudio: La Disculpa Automatizada">
**Escenario:** Un founder de SaaS configuró un flujo en Zapier: "Si NPS < 5 → enviar plantilla de disculpa."

**Qué pasó:** Un cliente los calificó 2/10 después de un incidente de pérdida de datos. La disculpa automatizada llegó 4 minutos después con el nombre del cliente mal escrito y una línea genérica de "valoramos tu retroalimentación."

**Resultado:** El cliente publicó el email en Twitter con el pie de foto "Ni siquiera pueden molestarse en disculparse en persona." 12,000 impresiones. 3 prospectos lo mencionaron en llamadas de ventas.

**Lección:** Los momentos emocionales de alto riesgo requieren humanos. Siempre.
</ExampleCard>

### La Trampa del Volumen en LinkedIn

Los Términos de Servicio de LinkedIn permiten aproximadamente **50-75 solicitudes de conexión de calidad por día** para cuentas personales. Sales Navigator no cambia esto — solo te da mejor orientación.

Esto es lo que pasa cuando automatizas más allá de los límites seguros:

<DecisionTree
title="Escenario de Automatización en LinkedIn"
persistKey="ai-acquisition-strategy-L6-linkedin-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "Configuras una herramienta de automatización para enviar 200 solicitudes de conexión en LinkedIn por día con mensajes personalizados. ¿Qué pasa?",
choices: [
{ label: "LinkedIn no lo nota", nextNodeId: "notice" },
{ label: "Te marcan de inmediato", nextNodeId: "flagged" }
]
},
{
id: "notice",
content: "Incorrecto. El algoritmo de LinkedIn detecta actividad inusual en 24-48 horas. Recibes una advertencia.",
choices: [
{ label: "Detente de inmediato", nextNodeId: "stop" },
{ label: "Reduce a 100/día", nextNodeId: "reduce" }
]
},
{
id: "flagged",
content: "Correcto. Día 3: LinkedIn restringe tu cuenta. Puedes ver pero no enviar mensajes.",
choices: [
{ label: "Espera 7 días y reanuda manualmente", nextNodeId: "wait" },
{ label: "Contacta soporte de LinkedIn", nextNodeId: "support" }
]
},
{
id: "stop",
content: "Inteligente. Cambias a 50 solicitudes manuales/día. Tu cuenta se recupera. Tasa de respuesta: 25%.",
isTerminal: true,
outcome: "positive"
},
{
id: "reduce",
content: "Sigue siendo demasiado alto. Día 7: Bloqueo permanente. Pierdes 2,400 conexiones y $30K de pipeline.",
isTerminal: true,
outcome: "negative"
},
{
id: "wait",
content: "La cuenta se recupera, pero perdiste impulso. 14 prospectos cálidos se enfriaron.",
isTerminal: true,
outcome: "neutral"
},
{
id: "support",
content: "El soporte de LinkedIn no responde durante 3 semanas. Para entonces, tu restricción es permanente.",
isTerminal: true,
outcome: "negative"
}
]}
/>

<InsightCard icon="📊" title="Las Matemáticas de los Bloqueos en LinkedIn">
**Volumen manual seguro:** 50 solicitudes/día × 25% de aceptación × 10% de respuesta = **1.25 conversaciones/día**
**Volumen automatizado arriesgado:** 200 solicitudes/día × 3 días antes del bloqueo = **600 solicitudes, luego cero para siempre**

Estás cambiando 3 días de volumen por la pérdida permanente de un canal que vale $50K+/año en pipeline.
</InsightCard>

---

## Cuadrante 4: Eliminar (Bajo Ahorro, Bajo Riesgo)

Estas son tareas que no deberías automatizar _ni_ hacer manualmente. **Simplemente deja de hacerlas.**

### Qué Eliminar

| Tarea                                       | Por Qué Existe          | Por Qué Eliminarla                                |
| ------------------------------------------- | ----------------------- | ------------------------------------------------- |
| Formatear manualmente campos del CRM        | Perfeccionismo          | Nadie lo lee; usa etiquetas en su lugar           |
| Informes semanales sobre los que no actúas  | "Mejor práctica"        | Si no cambias el comportamiento, deja de rastrear |
| Investigar prospectos que nunca contactarás | FOMO                    | Enfócate solo en Niveles 1 y 2                    |
| Personalizar cada firma de email            | Teatro de marca         | La firma estándar convierte igual de bien         |
| Registrar cada punto de contacto            | Mito de higiene del CRM | Registra resultados, no actividades               |

<RangeSlider
  label="¿Cuántas horas/semana gastas en tareas que no generan pipeline directamente?"
  min={0}
  max={20}
  lowLabel="0 hrs"
  highLabel="20+ hrs"
  persistKey="ai-acquisition-strategy-L6-waste-time"
/>

---

## El Marco de Decisión Human-in-the-Loop (HITL)

Para cada automatización que estés considerando, hazte tres preguntas:

<TemplateBuilder
title="Plantilla de Decisión HITL"
persistKey="ai-acquisition-strategy-L6-hitl"
sections={[
{
id: "decision",
title: "Decisión de Automatización",
fields: [
{ id: "task", label: "Tarea a Automatizar", placeholder: "ej., Aperturas de DM en LinkedIn generadas por IA", type: "text" },
{ id: "worst", label: "1. ¿Peor caso si la automatización comete un error?", placeholder: "ej., El prospecto piensa que soy un bot, me bloquea", type: "textarea" },
{ id: "detect", label: "2. ¿Puedo detectar el error antes de que el prospecto lo vea?", placeholder: "Sí/No + cómo", type: "text" },
{ id: "recovery", label: "3. ¿Cuál es el costo de recuperarse del error?", placeholder: "ej., Disculparse y re-engancharse = 30 min, o Daño permanente a la relación", type: "textarea" },
{ id: "verdict", label: "Veredicto: Automatizar / Controlar / Humano / Eliminar", placeholder: "Elige uno", type: "text" }
]
}
]}
/>

### Reglas de Decisión

**Si el peor caso = daño permanente (bloqueo, cliente perdido, vergüenza pública)** → C3 Mantener Humano
**Si el peor caso = recuperable + puedes detectarlo antes de enviar** → C2 Automatizar + Control Humano
**Si el peor caso = menor + detectable automáticamente** → C1 Automatizar Ahora
**Si la tarea no impacta el pipeline** → C4 Eliminar

<SwipeDecision
title="¿Automatizar o Mantener Humano?"
description="Desliza a la derecha para automatizar, a la izquierda para mantener humano"
optionA="Mantener Humano"
optionB="Automatizar (con o sin control)"
persistKey="ai-acquisition-strategy-L6-swipe"
cards={[
{
id: "1",
content: "Enviar un email de seguimiento 3 días después de no recibir respuesta",
correctOption: "b",
explanation: "Bajo riesgo, alto volumen. Automatiza con lógica de secuencia."
},
{
id: "2",
content: "Responder a un prospecto que dijo 'Tu precio es 3 veces nuestro presupuesto'",
correctOption: "a",
explanation: "La negociación requiere contexto y creatividad. Mantén humano."
},
{
id: "3",
content: "Generar primeras líneas personalizadas para 100 prospectos",
correctOption: "b",
explanation: "Automatiza con IA, pero controla con revisión FASP en el 20% superior."
},
{
id: "4",
content: "Calificar solicitudes de demo entrantes mediante chatbot",
correctOption: "b",
explanation: "Automatiza + controla. Revisa conversaciones marcadas antes de reservar."
},
{
id: "5",
content: "Llamar a un prospecto que desapareció después de un compromiso verbal",
correctOption: "a",
explanation: "Alto riesgo, requiere empatía y resolución de problemas en tiempo real."
}
]}
/>

---

## Riesgos de Cumplimiento y Reputación

Las fallas de automatización no son solo pérdida de tiempo. Crean **responsabilidades legales y reputacionales**.

### Umbrales de Entregabilidad de Email

<InsightCard icon="📧" title="La Regla del 0.1%">
Google y Yahoo (desde 2024-2025) requieren tasas de quejas de spam por debajo del **0.1%**. Al 0.3%, tu dominio se bloquea. Si envías 1,000 emails y 3 personas te marcan como spam, terminaste.
</InsightCard>

**Qué desencadena quejas de spam:**

- Emails genéricos de "rociar y rezar"
- Sin enlace claro de cancelación de suscripción
- Enviar a listas compradas
- Alto volumen desde dominios nuevos (>100/día en los primeros 30 días)

**Cómo la automatización lo empeora:**

- Los emails generados por IA a escala (1,000+/día) activan filtros de spam más rápido
- Los seguimientos automatizados después de cancelar la suscripción = violación de CAN-SPAM (multa de $46,517 por email)
- Las secuencias de calentamiento que ignoran el engagement = espiral de muerte de entregabilidad

### Violaciones de los TOS de LinkedIn

LinkedIn ha bloqueado permanentemente estas herramientas por violaciones de automatización:

- **Apollo.io** (2025) — Extensión de Chrome para conexiones automáticas
- **Seamless.ai** (2025) — Scraping masivo de perfiles
- **Dux-Soup** (2024) — Visitas y mensajes automatizados

**Qué te hace bloquear:**

- > 100 solicitudes de conexión/día
- Mensajes automatizados mediante APIs no oficiales
- Scraping de perfiles a escala
- Usar extensiones de navegador de "automatización de LinkedIn"

<PredictionGate
question="Usas una extensión de Chrome para visitar automáticamente 500 perfiles de LinkedIn por día para activar notificaciones de 'Quién vio tu perfil'. ¿Cuánto tiempo hasta que LinkedIn restrinja tu cuenta?"
persistKey="ai-acquisition-strategy-L6-predict"
type="choice"
choices={[
{ id: "a", text: "1-3 días" },
{ id: "b", text: "1-2 semanas" },
{ id: "c", text: "1 mes" },
{ id: "d", text: "LinkedIn no detecta esto" }
]}
correctId="a"

> **1-3 días.** El algoritmo de LinkedIn detecta patrones inusuales de visita de perfiles en 24-48 horas. Para el día 3, recibirás una advertencia o restricción temporal. Para el día 7, bloqueo permanente si continúas.

La táctica de "Quién vio tu perfil" funcionó en 2018. En 2026, es un camino rápido a perder tu cuenta.
</PredictionGate>

---

## Tu Matriz Personal de Fallas de Automatización

Es hora de mapear tus automatizaciones actuales y planificadas.

<TemplateBuilder
title="Construye Tu Matriz de Automatización"
persistKey="ai-acquisition-strategy-L6-matrix"
sections={[
{
id: "q1",
title: "C1: Automatizar Ahora (Alto Ahorro, Bajo Riesgo)",
fields: [
{ id: "tasks", label: "Lista 3-5 tareas que automatizarás de inmediato", placeholder: "ej., Verificación de email, entrada de datos en CRM, reserva de calendario", type: "textarea" },
{ id: "tools", label: "Herramientas que usarás", placeholder: "ej., Zapier, MillionVerifier, Calendly", type: "text" }
]
},
{
id: "q2",
title: "C2: Automatizar + Control Humano (Alto Ahorro, Alto Riesgo)",
fields: [
{ id: "tasks", label: "Lista 3-5 tareas que automatizarás con controles de revisión", placeholder: "ej., Primeras líneas con IA, calificación por chatbot, DMs de LinkedIn", type: "textarea" },
{ id: "gate", label: "¿Cómo controlarás? (% de revisión, frecuencia, criterios)", placeholder: "ej., Revisa el 20% superior para detectar alucinaciones, verificación aleatoria del 10% del Nivel 3", type: "textarea" }
]
},
{
id: "q3",
title: "C3: Mantener Humano (Bajo Ahorro, Alto Riesgo)",
fields: [
{ id: "tasks", label: "Lista 3-5 tareas que NUNCA automatizarás", placeholder: "ej., Llamadas de descubrimiento, negociación de precios, reparación de relaciones", type: "textarea" },
{ id: "why", label: "Por qué estas permanecen humanas", placeholder: "ej., Alto riesgo, requiere empatía, riesgo de TOS", type: "textarea" }
]
},
{
id: "q4",
title: "C4: Eliminar (Bajo Ahorro, Bajo Riesgo)",
fields: [
{ id: "tasks", label: "Lista 3-5 tareas que dejarás de hacer por completo", placeholder: "ej., Formateo manual del CRM, informes sobre los que no actúo", type: "textarea" },
{ id: "hours", label: "Horas/semana que recuperarás", placeholder: "ej., 4 horas", type: "text" }
]
}
]}
/>

---

## Límites de Automatización del Mundo Real

Pongamos a prueba tu criterio con 10 escenarios reales.

<TimedChallenge
title="Test de Velocidad de Límites de Automatización"
persistKey="ai-acquisition-strategy-L6-timed"
timeLimit={120}
items={[
{
id: "1",
prompt: "Envío automático de email de seguimiento si no hay respuesta en 3 días",
correctAnswer: "automate",
explanation: "Bajo riesgo, alto volumen. Lógica estándar de secuencia."
},
{
id: "2",
prompt: "Generar automáticamente mensajes de solicitud de conexión en LinkedIn para 200 prospectos/día",
correctAnswer: "human",
explanation: "Violación de TOS. LinkedIn bloquea a ese volumen."
},
{
id: "3",
prompt: "Usar IA para escribir primeras líneas personalizadas, luego revisar el 20% superior",
correctAnswer: "gate",
explanation: "Alto ahorro, alto riesgo. Controla con revisión FASP."
},
{
id: "4",
prompt: "Reservar automáticamente llamadas de descubrimiento mediante chatbot sin revisión humana",
correctAnswer: "gate",
explanation: "La mala calificación desperdicia tiempo de ventas. Controla con revisión."
},
{
id: "5",
prompt: "Formatear manualmente cada nota del CRM para consistencia",
correctAnswer: "eliminate",
explanation: "Nadie lo lee. Usa etiquetas en su lugar."
},
{
id: "6",
prompt: "Verificar automáticamente direcciones de email antes de añadir a secuencias",
correctAnswer: "automate",
explanation: "Bajo riesgo, alto ahorro. Automatiza con MillionVerifier."
},
{
id: "7",
prompt: "Usar IA para responder objeciones de precio en email",
correctAnswer: "human",
explanation: "La negociación requiere contexto. Mantén humano."
},
{
id: "8",
prompt: "Enviar automáticamente un informe semanal de métricas sobre el que nunca actúas",
correctAnswer: "eliminate",
explanation: "Si no cambias el comportamiento, deja de rastrear."
},
{
id: "9",
prompt: "Usar IA para puntuar leads basándose en firmografía (tamaño de empresa, industria)",
correctAnswer: "automate",
explanation: "Datos objetivos, bajo riesgo. Automatiza la puntuación."
},
{
id: "10",
prompt: "Enviar automáticamente emails de disculpa a clientes con NPS < 5",
correctAnswer: "human",
explanation: "Momento emocional de alto riesgo. Siempre humano."
}
]}
/>

---

## Resumen: La Jerarquía de Automatización

Aquí está tu árbol de decisión para cada tarea de adquisición:

1. **¿Esta tarea impacta directamente el pipeline?**
   - No → C4 Eliminar
   - Sí → Continúa

2. **Si la automatización falla, ¿cuál es el peor caso?**
   - Daño permanente (bloqueo, cliente perdido, vergüenza pública) → C3 Mantener Humano
   - Daño recuperable → Continúa

3. **¿Puedo detectar el error antes de que el prospecto lo vea?**
   - No → C3 Mantener Humano
   - Sí → Continúa

4. **¿Esta tarea ahorra >2 horas/semana?**
   - No → C3 Mantener Humano (no vale la pena automatizar)
   - Sí → C2 Automatizar + Control Humano o C1 Automatizar Ahora

5. **¿La tarea es objetiva y basada en reglas?**
   - Sí → C1 Automatizar Ahora
   - No (requiere criterio) → C2 Automatizar + Control Humano

<InteractiveChecklist
title="Tus Acciones de Automatización"
persistKey="ai-acquisition-strategy-L6-actions"
items={[
"Mapea tus automatizaciones actuales a la matriz de 4 cuadrantes",
"Identifica 3 tareas en C1 para automatizar esta semana",
"Configura controles de revisión FASP para automatizaciones de C2",
"Documenta 3 tareas que nunca automatizarás (C3)",
"Elimina 2 tareas de C4 y reclama esas horas",
"Ejecuta el Marco de Decisión HITL en tu próxima idea de automatización",
"Establece el límite de solicitudes de conexión en LinkedIn a máximo 50/día",
"Configura monitoreo de quejas de spam en tu herramienta de email"
]}
/>

---

## Vista Previa de la Próxima Lección

Has definido tus límites de automatización. A continuación: **Lección 7 — Asignación de Tiempo: La División 60/40 Humano/Automatización**.

Diseñarás tu ritmo semanal de adquisición de 5-7 horas, equilibrando el trabajo humano de alto valor (llamadas de descubrimiento, alcance de primer nivel) con la eficiencia asistida por IA (investigación, redacción, puntuación). El objetivo: máximo pipeline por hora, no máxima automatización.
