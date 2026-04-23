---
title: "El Lead Calificado de Marketing (MQL): El Umbral de la Intención"
duration: "50 min"
track: "Marketing Engine"
course: "Course 12: Marketing Automation & Analytics"
lesson: 7
---

# El Umbral de la Intención: Definiendo Tu MQL

No todos los leads son iguales.

Como fundador en solitario, tienes una cantidad finita de "Energía de Ventas" por semana. Si gastas 30 minutos grabando un video personalizado de Loom para un estudiante que solo quería tu PDF gratuito y tiene presupuesto de $0, estás robándole ese tiempo al CEO con un problema de $100.000 que está listo para comprar pero no ha recibido noticias tuyas.

El **Lead Calificado de Marketing (MQL)** es el filtro que protege tu activo más valioso: tu tiempo.

Es un umbral riguroso y matemático que dice: _"Esta persona coincide con mi Perfil de Cliente Ideal (ICP) Y ha mostrado suficiente intención conductual para merecer mi atención directa y personal."_

En esta lección, definiremos los criterios exactos para TUS MQLs, para que puedas dejar de perseguir "curiosos" y empezar a cerrar deals.

---

## 1. La Ecuación del MQL: Ajuste + Engagement

Para estar "Calificado," un lead debe pasar dos pruebas distintas.

- **Engagement sin Ajuste** = Un Fan/Aficionado. (Aman tu contenido pero no pueden comprar).
- **Ajuste sin Engagement** = Un Prospecto Frío. (Tienen el dinero pero aún no les interesas).
- **Ajuste + Engagement** = **MQL**. (La Zona Goldilocks).

<ConceptReframe
concept="MQL (Lead Calificado de Marketing)"
defaultLens="saas-founder"
lenses={[
{ id: "saas-founder", label: "Fundador SaaS", explanation: "Un MQL es como una estrella de GitHub de alguien que también abrió 3 issues y bifurcó tu repo — no están simplemente mirando, están evaluando para uso en producción." },
{ id: "coach", label: "Coach/Consultor", explanation: "Un MQL es como alguien que descargó tu guía gratuita, asistió a tu webinar Y hizo una pregunta específica en el chat — están señalando que están listos para la transformación." },
{ id: "agency", label: "Dueño de Agencia", explanation: "Un MQL es como un prospecto que vio tus casos de estudio, revisó tus precios y visitó tu página de 'Servicios' dos veces en 48 horas — te están comparando con la competencia ahora mismo." }
]}
/>

### La Puntuación de "Ajuste" (Datos Explícitos)

Esto se basa en _quiénes son_. Defines los atributos no negociables de alguien a quien puedes ayudar.

- **Cargo:** ¿Tienen poder de compra? (ej. Fundador, VP, Director vs. Pasante).
- **Tamaño de Empresa:** ¿Están en tu "Punto Ideal"? (ej. 10-50 empleados).
- **Sector:** ¿Tienes casos de estudio para su vertical específica?
- **Stack Tecnológico:** ¿Usan las herramientas con las que te integras? (ej. Usan HubSpot, y tú vendes un plugin de HubSpot).

### La Puntuación de "Engagement" (Datos Implícitos)

Esto se basa en _qué hacen_. Las acciones hablan más que la demografía.

- **Velocidad:** ¿Visitaron tu sitio 5 veces en los últimos 2 días? (Alta Intención).
- **Profundidad:** ¿Leyeron tu página de "Precios" o tus "Docs de API"? (Intención de Compra).
- **Capacidad de Respuesta:** ¿Hicieron clic en el enlace de tus últimos 3 boletines?

**La Fórmula del Fundador:**

> `MQL = (Puntuación de Ajuste > 70/100) Y (Puntuación de Engagement > 50 puntos)`

<RangeSlider 
  label="¿Qué tan seguro te sientes con tu definición actual de MQL?" 
  min={1} 
  max={10} 
  lowLabel="Sin criterios claros" 
  highLabel="Documentado y probado" 
  persistKey="course-12-marketing-automation-analytics-L7-mql-confidence" 
/>

---

## 2. Estableciendo Tu Lógica de Puntuación

No necesitas una herramienta empresarial compleja para hacer esto. Solo necesitas un modelo lógico.

| Actividad                                | Puntos | ¿Por qué?                                       |
| :--------------------------------------- | :----- | :---------------------------------------------- |
| **Visita a Página de Precios**           | +20    | Están evaluando el costo.                       |
| **Visita a Página "Acerca de Nosotros"** | +5     | Están haciendo debida diligencia.               |
| **Visita a Página de Empleos**           | -10    | Podrían estar buscando trabajo, no un producto. |
| **Descargó Caso de Estudio**             | +15    | Buscan pruebas (Fondo del Embudo).              |
| **Descargó "Guía 101"**                  | +5     | Están aprendiendo (Tope del Embudo).            |
| **Apertura de Correo**                   | +1     | Engagement pasivo.                              |
| **Clic en Correo**                       | +5     | Engagement activo.                              |

**El Umbral:**
Establece tu Umbral de MQL en **50 Puntos**.
Cuando un contacto llega a 50 puntos, debe activarse una automatización.

<ClassifyExercise
title="Clasifica Estos Comportamientos de Leads"
persistKey="course-12-marketing-automation-analytics-L7-classify"
categories={[
{ id: "high", label: "Alta Intención (+15 a +20)", color: "#ef4444" },
{ id: "medium", label: "Intención Media (+5 a +10)", color: "#f59e0b" },
{ id: "low", label: "Baja Intención (0 a +5)", color: "#3b82f6" },
{ id: "negative", label: "Señal Negativa (-10 o peor)", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Pasó 8 minutos en tu página de documentación de API", correctCategory: "high" },
{ id: "2", content: "Abrió tu boletín semanal", correctCategory: "low" },
{ id: "3", content: "Descargó tu 'Guía de Principiantes 101' en PDF", correctCategory: "medium" },
{ id: "4", content: "Visitó tu página de Empleos y pasó 5 minutos ahí", correctCategory: "negative" },
{ id: "5", content: "Usó tu calculadora de precios interactiva durante 4 minutos", correctCategory: "high" },
{ id: "6", content: "Hizo clic en un enlace de tu correo a una publicación de blog", correctCategory: "medium" }
]}
/>

---

## 3. Los Disparadores de "Vía Rápida" (El Pase para Saltarse la Fila)

Algunas acciones tienen tan alta intención que el lead debería saltarse el modelo de puntuación y convertirse en MQL inmediatamente.

**Los "Levantadores de Mano":**

1.  **Solicitud de Demo:** Obvio.
2.  **Formulario de "Contactar Ventas":** Obvio.
3.  **Uso de Calculadora de Precios:** Si alguien pasa 5 minutos en tu calculadora de precios interactiva ajustando variables, están mentalmente comprando.
4.  **Inmersión Profunda en Docs de Integración:** Si un desarrollador pasa 20 minutos leyendo tu "Guía de Instalación," probablemente está implementando o evaluando la herramienta ahora mismo.

**Acción:** Etiquétalos como `MQL_Inmediato` y enrútalos a tu Slack/Bandeja de entrada al instante.

<InsightCard icon="⚡" title="La Ventaja del Levantador de Mano">
Cuando alguien solicita explícitamente una demo o pasa tiempo serio en tu calculadora de precios, ya superó la etapa de "conciencia." Estos leads convierten 3-5 veces más que los MQLs basados en puntuación porque se han autoseleccionado en modo de compra.
</InsightCard>

---

## 4. El Documento de Definición de MQL (Tu Libro de Reglas)

Para evitar "juicios de valor" que desperdician energía mental, crea un documento simple de 1 página.

**Sección A: Los "Imprescindibles" (Pasa/No Pasa Binario)**

- _Geografía:_ Debe estar en EE.UU./Reino Unido/Canadá.
- _Cargo:_ Debe ser Fundador o C-Level.
- _Presupuesto:_ Debe implicar >$1M de ingresos anuales.
- _(Si fallan alguno de estos, nunca son un MQL, sin importar cuánto hagan clic)._

**Sección B: Las "Señales" (Comportamiento)**

- _Lista las acciones de tu modelo de puntuación._

**Sección C: El "Traspaso" (¿Quién hace qué?)**

- _Disparador:_ Puntuación > 50.
- _Acción del Sistema:_ Etiquetar como "MQL" en CRM. Agregar a "Cola de Contacto Manual." Enviar Alerta de Slack al Fundador.
- _Acción del Fundador:_ Revisar perfil de LinkedIn. Enviar "Correo Contextual" personalizado en menos de 12 horas.

<TemplateBuilder
title="Tu Documento de Definición de MQL"
persistKey="course-12-marketing-automation-analytics-L7-mql-doc"
sections={[
{
id: "must-haves",
title: "Sección A: Imprescindibles (Pasa/No Pasa Binario)",
fields: [
{ id: "geography", label: "Requisitos Geográficos", placeholder: "Ej. Solo EE.UU./Reino Unido/Canadá", type: "text" },
{ id: "role", label: "Cargos/Roles Requeridos", placeholder: "Ej. Fundador, VP, Director, C-Level", type: "text" },
{ id: "company-size", label: "Rango de Tamaño de Empresa", placeholder: "Ej. 10-50 empleados", type: "text" },
{ id: "disqualifiers", label: "Descalificadores Automáticos", placeholder: "Ej. Estudiantes, Competidores, Freelancers", type: "textarea" }
]
},
{
id: "scoring",
title: "Sección B: Puntuación Conductual",
fields: [
{ id: "high-intent", label: "Acciones de Alta Intención (+15 a +20 puntos)", placeholder: "Ej. Visita a página de precios, descarga de caso de estudio", type: "textarea" },
{ id: "medium-intent", label: "Acciones de Intención Media (+5 a +10 puntos)", placeholder: "Ej. Clics en correos, engagement con blog", type: "textarea" },
{ id: "hand-raisers", label: "Disparadores Inmediatos de MQL", placeholder: "Ej. Solicitud de demo, formulario de contactar ventas", type: "textarea" }
]
},
{
id: "handoff",
title: "Sección C: El Protocolo de Traspaso",
fields: [
{ id: "threshold", label: "Umbral de Puntuación MQL", placeholder: "Ej. 50 puntos", type: "text" },
{ id: "alert", label: "Mecanismo de Alerta", placeholder: "Ej. Notificación de Slack, correo al fundador", type: "text" },
{ id: "response-time", label: "Compromiso de Respuesta del Fundador", placeholder: "Ej. Contacto personalizado en menos de 12 horas de la alerta MQL", type: "text" }
]
}
]}
/>

---

## 5. MQL vs. SQL: La Progresión del Embudo

Entender la diferencia previene el "Happy Ears" (pensar que todos son compradores).

<SlideNavigation>
<Slide title="Etapa 1: Lead (Suscriptor)">

**Definición:** Cualquiera con un correo en tu base de datos.

**Objetivo:** Nutrirlos con contenido automatizado.

**Enfoque de Conversión:** Hacer que se involucren (abrir correos, visitar el sitio, consumir contenido).

**Volumen Típico:** El número más alto en tu embudo.

</Slide>

<Slide title="Etapa 2: MQL (Calificado de Marketing)">

**Definición:** Criterios de engagement + ajuste cumplidos.

**Objetivo:** Validar la intención a través de una conversación humana.

**Enfoque de Conversión:** Reservar una llamada de descubrimiento o demo.

**Volumen Típico:** 5-15% del total de leads.

</Slide>

<Slide title="Etapa 3: SQL (Calificado de Ventas)">

**Definición:** Has hablado con ellos. Se verificó BANT (Presupuesto, Autoridad, Necesidad, Timing).

**Objetivo:** Enviar una Propuesta / Cerrar el deal.

**Enfoque de Conversión:** Avanzar a contrato/pago.

**Volumen Típico:** 20-40% de los MQLs (si tus criterios de MQL son estrictos).

</Slide>

<Slide title="Etapa 4: Cliente">

**Definición:** Pagaron.

**Objetivo:** Entregar valor, retener, hacer upsell.

**Enfoque de Conversión:** Renovación y referidos.

**Volumen Típico:** 20-50% de los SQLs (dependiendo de la habilidad de ventas y el product-market fit).

</Slide>
</SlideNavigation>

**Métrica Clave:**
Si tu **Tasa de Conversión MQL-a-SQL** es &lt;20%, tu definición de MQL es demasiado laxa. Estás dejando pasar "curiosos" por el filtro. Ajusta la puntuación (sube el umbral a 70 puntos).

<ScenarioSimulator
title="Calculadora de Impacto del Umbral MQL"
persistKey="course-12-marketing-automation-analytics-L7-simulator"
levers={[
{ id: "leads", label: "Total de Leads por Mes", min: 100, max: 2000, step: 100, defaultValue: 500 },
{ id: "threshold", label: "Umbral de Puntuación MQL", min: 30, max: 100, step: 10, defaultValue: 50 },
{ id: "sqlRate", label: "Tasa MQL-a-SQL (%)", min: 10, max: 50, step: 5, defaultValue: 25 }
]}
outputs={[
{ id: "mqls", label: "MQLs Generados", formula: "leads * (threshold < 50 ? 0.15 : threshold < 70 ? 0.10 : 0.05)", unit: "", precision: 0 },
{ id: "sqls", label: "SQLs Generados", formula: "(leads * (threshold < 50 ? 0.15 : threshold < 70 ? 0.10 : 0.05)) * (sqlRate / 100)", unit: "", precision: 0 },
{ id: "hoursNeeded", label: "Horas del Fundador Necesarias", formula: "(leads * (threshold < 50 ? 0.15 : threshold < 70 ? 0.10 : 0.05)) * 0.5", unit: " hrs", precision: 1 }
]}
insight="At threshold {threshold}, you'll generate {mqls} MQLs requiring ~{hoursNeeded} hours of founder time. If your MQL→SQL rate is below 20%, raise the threshold to filter out tire-kickers."
/>

---

## 6. Errores Comunes que Evitar

### Error 1: El "MQL de Vanidad"

Contar "Nuevos Suscriptores del Newsletter" como MQLs.

- _Realidad:_ Un suscriptor simplemente tiene curiosidad. Llamarlos MQL infla tu pipeline con ruido.

### Error 2: La Trampa del "Freelancer"

Un Freelancer puede amar tu contenido y hacer clic en todo (Alto Engagement), pero a menudo tiene presupuesto de $0 (Bajo Ajuste).

- _Solución:_ Usa "Puntuación Negativa." Si el `Cargo` contiene "Freelancer" o "Estudiante," descuenta 50 puntos.

### Error 3: Caducidad Ignorada

Un lead que tenía 50 puntos _el año pasado_ no es un MQL hoy.

- _Solución:_ Implementa "Caducidad de Puntuación." Si un lead está inactivo por 30 días, restablece su puntuación o degradala en un 25%. La intención es perecedera.

<SwipeDecision
title="¿Error de MQL o Filtro Inteligente?"
description="Desliza a la derecha para prácticas inteligentes de MQL, a la izquierda para errores comunes"
optionA="Error"
optionB="Filtro Inteligente"
persistKey="course-12-marketing-automation-analytics-L7-swipe"
cards={[
{
id: "1",
content: "Contar cada nuevo suscriptor de correo como MQL para mostrar crecimiento a inversores",
correctOption: "a",
explanation: "Este es el error del 'MQL de Vanidad'. Los suscriptores están en la parte superior del embudo de conciencia, no son compradores calificados. Esto infla tu pipeline con ruido."
},
{
id: "2",
content: "Descontar 50 puntos cuando el cargo contiene 'Estudiante' o 'Freelancer'",
correctOption: "b",
explanation: "Puntuación negativa inteligente. Estos segmentos a menudo tienen alto engagement pero presupuesto bajo/nulo, desperdiciando tu tiempo de ventas."
},
{
id: "3",
content: "Mantener leads en 50 puntos indefinidamente, aunque no hayan tenido engagement en 6 meses",
correctOption: "a",
explanation: "Este es el error de la 'Caducidad Ignorada'. La intención es perecedera. Implementa caducidad de puntuación para evitar que los 'MQLs zombies' abarroten tu pipeline."
},
{
id: "4",
content: "Etiquetar automáticamente a cualquier persona que solicite una demo como MQL inmediato",
correctOption: "b",
explanation: "Perfecto. Las solicitudes de demo son 'levantadores de mano' con intención de compra explícita. Deben saltarse el modelo de puntuación por completo."
},
{
id: "5",
content: "Dar los mismos +5 puntos por visitar la página de inicio que la página de precios",
correctOption: "a",
explanation: "Las visitas a la página de inicio son navegación de baja intención. Las visitas a la página de precios señalan intención de compra en etapa de evaluación y deberían puntuar mucho más alto (+15-20)."
}
]}
/>

---

## 7. Ejemplos de Contexto Dual

### Escenario A: B2B SaaS (La Herramienta de Analíticos)

- **El MQL:**
  - _Quién:_ "Jefa de Producto" en una empresa Serie A (Ajuste).
  - _Qué:_ Leyó la "Guía de Cumplimiento GDPR" y visitó la página de "Precios Enterprise" (Engagement).
- **El Disparador:** Alerta de Slack: _"Lead Caliente: Sarah de TechFlow está revisando precios. Puntuación: 65."_
- **La Acción del Fundador:** Enviar una solicitud de conexión: _"Hey Sarah, vi que estabas revisando nuestros docs de GDPR. Ayudamos a [Empresa Similar] a navegar esa auditoría. ¿Te comparto el checklist que usamos?"_

### Escenario B: Creador/Coach (El Consultor de $5k)

- **El MQL:**
  - _Quién:_ "Dueño de Agencia" con 10-50 empleados (Ajuste).
  - _Qué:_ Hizo clic en el enlace al "Marco de Escalamiento de Agencias" en el boletín y estuvo en la página durante 8 minutos (Engagement).
- **El Disparador:** Alerta por correo.
- **La Acción del Fundador:** Enviar un video de Loom enfocado. _"Hey Juan, noté que estabas mirando el Marco de Escalamiento. Generalmente las agencias de tu tamaño se quedan atascadas en el Paso 3 (Contratar). Grabé un video de 2 min sobre cómo saltarse ese cuello de botella..."_

<ExampleCard label="Caso de Estudio: El Filtro Ajustado">
Marcos obtenía 40 MQLs por mes pero solo convertía 4 a SQLs (tasa del 10%). Gastaba 20 horas en llamadas de descubrimiento con curiosos.

**La Solución:** Agregó puntuación negativa para cargos "Consultor" y "Freelancer" (-30 puntos) y subió su umbral de 40 a 60 puntos.

**El Resultado:** El volumen de MQL cayó a 18/mes, pero la conversión a SQL saltó al 50% (9 SQLs). Redujo a la mitad su tiempo desperdiciado en llamadas y cerró 2 deals más ese mes porque tenía energía para el seguimiento adecuado.

**La Lección:** Menos MQLs mejor calificados superan al ruido de alto volumen en todo momento.
</ExampleCard>

---

## 8. Lista de Verificación Resumen

<InteractiveChecklist
title="Tu Checklist del Sistema MQL"
persistKey="course-12-marketing-automation-analytics-L7-checklist"
items={[
"Definí los 3 rasgos de 'Ajuste' no negociables de mi comprador ideal (cargo, tamaño de empresa, sector/presupuesto)",
"Asigné valores de puntos a señales conductuales clave (página de precios, casos de estudio, clics en correos)",
"Implementé puntuación negativa para filtrar estudiantes, competidores y freelancers",
"Asigné puntos extra (+15-20) a páginas de alta intención como Precios y Docs de API",
"Establecí un umbral documentado de puntuación MQL (ej. 50 puntos) que activa una alerta",
"Identifiqué 2-3 acciones de 'levantadores de mano' que crean MQLs inmediatos (solicitud de demo, contactar ventas)",
"Construí lógica de caducidad de puntuación para que los leads inactivos pierdan puntos en 30-60 días",
"Creé un protocolo de respuesta del fundador (ej. contacto personalizado en menos de 12 horas de la alerta MQL)"
]}
/>

---

## 9. Ejercicio Práctico: El Scorecard de MQL

Redacta tu modelo de puntuación.

**1. Las Señales de "Buen Ajuste" (Explícito):**

- Cargo: ********\_\_\_******** (+20)
- Tamaño de Empresa: ********\_\_\_******** (+20)
- Descalificador: ********\_\_\_******** (-50)

**2. Las Acciones "Calientes" (Implícito):**

- Acción A: ********\_\_\_******** (+10)
- Acción B: ********\_\_\_******** (+20)
- Acción "Levantador de Mano": ********\_\_\_******** (MQL Inmediato)

**3. El Protocolo del Fundador:**

- "Cuando recibo una alerta de MQL, me comprometo a enviar un mensaje personal en **\_** horas."

---

## Quiz: Calificando Tu Pipeline

```json
{
  "quizId": "mql-mastery",
  "title": "Defining the Marketing Qualified Lead",
  "questions": [
    {
      "id": "mql1",
      "type": "multiple-choice",
      "text": "What are the two core components of an MQL?",
      "options": [
        { "id": "a", "text": "Money and Time." },
        { "id": "b", "text": "Fit (Demographics) and Engagement (Behavior)." },
        { "id": "c", "text": "Email and Phone Number." },
        { "id": "d", "text": "Clicks and Opens." }
      ],
      "correctAnswer": "b",
      "explanation": "An MQL is the intersection of 'Can they buy?' (Fit) and 'Do they want to buy?' (Engagement/Intent)."
    },
    {
      "id": "mql2",
      "type": "multiple-choice",
      "text": "Why should 'Career Page' visits often have negative points?",
      "options": [
        { "id": "a", "text": "They shouldn't." },
        {
          "id": "b",
          "text": "Because job seekers often look like high-traffic users but have zero buying intent."
        },
        { "id": "c", "text": "Because hiring is expensive." },
        { "id": "d", "text": "Because they are competitors." }
      ],
      "correctAnswer": "b",
      "explanation": "Job seekers will click everything on your site to research for an interview. Negative scoring helps filter out this 'False Positive' traffic."
    },
    {
      "id": "mql3",
      "type": "true-false",
      "text": "True or False: A user who downloaded a whitepaper 2 years ago but hasn't opened an email since is still an MQL today.",
      "correctAnswer": "false",
      "explanation": "Intent decays. If they haven't engaged recently, they are a 'Cold Lead', not an MQL. You must use Score Decay."
    },
    {
      "id": "mql4",
      "type": "multiple-choice",
      "text": "What is the primary purpose of defining MQL criteria for a solo founder?",
      "options": [
        { "id": "a", "text": "To look corporate." },
        {
          "id": "b",
          "text": "To protect your time so you only focus on high-probability deals."
        },
        { "id": "c", "text": "To make automated charts." },
        { "id": "d", "text": "To stop people from visiting your site." }
      ],
      "correctAnswer": "b",
      "explanation": "Your time is your scarcest resource. MQLs act as a gatekeeper, ensuring you invest that resource only where the ROI is likely."
    },
    {
      "id": "mql5",
      "type": "multiple-choice",
      "text": "Which page visit usually signals the highest buying intent?",
      "options": [
        { "id": "a", "text": "Home Page." },
        { "id": "b", "text": "Blog Post." },
        { "id": "c", "text": "Pricing Page or Integration Docs." },
        { "id": "d", "text": "About Us." }
      ],
      "correctAnswer": "c",
      "explanation": "People checking pricing or technical docs are usually in the 'Evaluation' phase of the buyer's journey."
    }
  ]
}
```

**Siguiente Lección:** [El Proceso de Traspaso de Marketing a Ventas](/marketing-engine/course-12-marketing-automation-analytics/lesson-8)
