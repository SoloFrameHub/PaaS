---
title: "Modelo de Puntuación de Leads"
duration: "55 min"
track: "Marketing Engine"
course: "Course 12: Marketing Automation & Analytics"
lesson: 3
---

## Priorizando la Intención: La Ciencia de la Puntuación de Leads

Como fundador en solitario, tu activo más valioso es tu tiempo.

Si pasas tres horas esta semana persiguiendo dos "leads" que se registraron en tu boletín pero no tienen ninguna intención de comprar, estás robando esas horas al prospecto de alta intención que visitó tu página de precios tres veces y está esperando una señal para comprar.

La **puntuación de leads** es el proceso matemático de separar a los "curiosos" de los "compradores." Asigna valores numéricos a los leads en función de sus atributos (quiénes son) y sus comportamientos (qué hacen). El resultado es un único número que te dice exactamente a quién llamar hoy, a quién seguir nutriendo y a quién ignorar.

Esta lección te enseña a construir un modelo práctico de puntuación de leads que funcione con un presupuesto ajustado.

<RangeSlider 
  label="¿Qué tan seguro te sientes con tu priorización actual de leads?" 
  min={1} 
  max={10} 
  lowLabel="Totalmente al azar" 
  highLabel="Sistema basado en datos" 
  persistKey="course-12-marketing-automation-analytics-L3-confidence" 
/>

---

### Las Cuatro Dimensiones de la Puntuación de Leads

Un modelo de puntuación robusto no solo considera las aperturas de correo. Evalúa a un prospecto a través de cuatro dimensiones distintas para calcular su "Puntuación de Intención de Compra."

<SlideNavigation>
<Slide title="Dimensión 1: Ajuste Demográfico">

#### Dimensión 1: Ajuste Demográfico (La Señal del ICP)

Esta dimensión responde: _¿Es este el tipo de persona a la que quiero venderle?_ Sumas o restas puntos según qué tan bien encajan con tu Perfil de Cliente Ideal.

- **Señales Positivas (Ajuste):**
  - **Cargo:** Coincide con tu perfil de tomador de decisiones (ej. CTO, VP de Ventas, Fundador en Solitario) [+10 a +15 pts].
  - **Tamaño de Empresa:** Está en tu "punto ideal" (ej. 10-50 empleados para una herramienta para PYMEs) [+10 pts].
  - **Sector:** Están en un sector donde tienes un historial comprobado [+5 pts].
- **Señales Negativas (Fricción):**
  - **Cargos No Calificados:** Estudiantes, competidores o buscadores de empleo [-15 a -20 pts].
  - **Correo Desechable:** Direcciones de Gmail, Yahoo u Outlook suelen indicar una consulta menos seria vs. un dominio corporativo [-5 a -10 pts].

</Slide>

<Slide title="Dimensión 2: Engagement Conductual">

#### Dimensión 2: Engagement Conductual (La Señal de Actividad)

Esto responde: _¿Cuánta atención me están prestando?_ Puntúas las acciones que muestran engagement con tu marca.

- **Acciones de Alto Valor:**
  - **Respondió un Correo:** La comunicación explícita es una señal enorme [+15 pts].
  - **Vio un Video Demo de 10 Min:** Dedicaron tiempo significativo a aprender [+15 pts].
  - **Asistió a un Webinar en Vivo:** Intercambio de tiempo por información [+10 pts].
- **Acciones de Valor Medio:**
  - **Descargó un Lead Magnet:** Interés en una solución específica [+5 pts].
  - **Hizo Clic en un Enlace de Nurture:** Se involucra con tu contenido [+3 pts].
- **Acciones de Bajo Valor:**
  - **Apertura de Correo:** Una señal débil (podría ser carga automática o un vistazo rápido) [+1 pt].

</Slide>

<Slide title="Dimensión 3: Profundidad de Consumo de Contenido">

#### Dimensión 3: Profundidad de Consumo de Contenido (La Señal de Confianza)

Esto responde: _¿Cuánto de mi "Experiencia" han consumido?_ Un lead que ha leído cinco casos de estudio está mucho más "cálido" que uno que leyó un solo artículo.

- **Lógica:**
  - **Contenido TOFU (Artículos de Blog Generales):** +1 por vista.
  - **Contenido MOFU (Casos de Estudio, Guías Comparativas):** +5 por vista.
  - **Contenido BOFU (Calculadoras de ROI, Documentación):** +10 por vista.
  - **Bono de Profundidad:** Si un usuario visita más de 5 páginas en una sola sesión, agrega [+10 pts].

</Slide>

<Slide title="Dimensión 4: Señales de Intención">

#### Dimensión 4: Señales de Intención (La Señal de Compra)

Esto responde: _¿Están realmente mirando el botón de "Comprar"?_ Esta es la dimensión de mayor peso en tu modelo.

- **Los Disparadores de Intención:**
  - **Visitas a la Página de Precios:** 2+ visitas a la página de precios en 48 horas es una señal de emergencia [+20 pts].
  - **Solicitud de Consulta:** Piden tiempo de forma explícita [+25 pts].
  - **Actividad en Prueba:** Invitar a un miembro del equipo (SaaS) o completar el Módulo 1 (Curso) [+15 pts].
  - **Cancelar Suscripción:** La señal negativa definitiva [-50 pts].

</Slide>
</SlideNavigation>

<ClassifyExercise
title="Clasifica Estas Señales de Leads"
persistKey="course-12-marketing-automation-analytics-L3-classify"
categories={[
{ id: "demographic", label: "Ajuste Demográfico", color: "#3b82f6" },
{ id: "behavioral", label: "Engagement Conductual", color: "#8b5cf6" },
{ id: "content", label: "Profundidad de Contenido", color: "#ec4899" },
{ id: "intent", label: "Señal de Intención", color: "#ef4444" }
]}
items={[
{ id: "1", content: "CTO en una empresa de 30 personas", correctCategory: "demographic" },
{ id: "2", content: "Visitó la página de precios 3 veces en 24 horas", correctCategory: "intent" },
{ id: "3", content: "Respondió tu correo de nurture", correctCategory: "behavioral" },
{ id: "4", content: "Leyó 4 casos de estudio y 2 guías comparativas", correctCategory: "content" },
{ id: "5", content: "Estudiante con dirección @gmail.com", correctCategory: "demographic" },
{ id: "6", content: "Vio tu video demo de 15 minutos", correctCategory: "behavioral" }
]}
/>

---

### Construyendo los Umbrales: Frío, Tibio, Caliente

Una vez que tienes tus puntos definidos, debes categorizar tus leads para saber qué acción tomar en cada rango de puntuación.

| Rango de Puntos | Categoría             | Definición                                                 | Acción del Fundador                                                                        |
| :-------------- | :-------------------- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **0 - 25**      | **Frío**              | Interesado, pero bajo ajuste o bajo engagement.            | Solo nurture automatizado. NO gastes tiempo manual.                                        |
| **26 - 50**     | **Tibio**             | Buen ajuste con engagement moderado.                       | Invitación dirigida a un webinar o un caso de estudio específico.                          |
| **51 - 75**     | **Caliente**          | Alto ajuste y alto engagement.                             | Correo personalizado de "seguimiento". Ofrece una llamada de consejo específico de 15 min. |
| **76+**         | **Listo para Ventas** | Intención explícita de compra o ajuste/actividad extremos. | Contacto inmediato. Llamada telefónica o correo de alta prioridad.                         |

<ScenarioSimulator
title="Calculadora de Puntuación de Leads"
persistKey="course-12-marketing-automation-analytics-L3-simulator"
levers={[
{ id: "demographic", label: "Puntos por Ajuste Demográfico", min: -20, max: 30, step: 5, defaultValue: 15 },
{ id: "behavioral", label: "Puntos Conductuales", min: 0, max: 30, step: 5, defaultValue: 10 },
{ id: "content", label: "Puntos de Profundidad de Contenido", min: 0, max: 25, step: 5, defaultValue: 10 },
{ id: "intent", label: "Puntos de Señal de Intención", min: 0, max: 50, step: 5, defaultValue: 20 }
]}
outputs={[
{ id: "total", label: "Puntuación Total del Lead", formula: "demographic + behavioral + content + intent", unit: "pts", precision: 0 },
{ id: "category", label: "Categoría del Lead", formula: "total < 26 ? 'Cold' : total < 51 ? 'Warm' : total < 76 ? 'Hot' : 'Sales-Ready'", unit: "", precision: 0 }
]}
insight="At {total} points, this lead is {category}. {total >= 76 ? 'Drop everything and reach out now!' : total >= 51 ? 'Send a personalized check-in email today.' : total >= 26 ? 'Add to your next targeted campaign.' : 'Keep in automated nurture only.'}"
/>

---

### El Asesino Silencioso: La Caducidad de Puntos

Una puntuación de 80 es impresionante si ocurrió ayer. Es insignificante si ocurrió hace seis meses. Para mantener tus datos limpios, debes implementar la **Caducidad de Puntos.**

- **La Lógica:** Si un lead no realiza ninguna acción en 30 días, reduce su puntuación en un 25%. Si no hay acción en 90 días, restablece los puntos conductuales/de intención a cero, pero conserva los puntos demográficos (ya que su cargo probablemente no haya cambiado).

<InsightCard icon="⏰" title="La Realidad de la Caducidad">
Sin caducidad, tu lista de "leads calientes" se convierte en un cementerio de personas que estaban interesadas hace 8 meses. La caducidad mantiene tus prioridades precisas y tu tiempo enfocado en la intención actual.
</InsightCard>

---

### Opciones de Implementación

#### Nivel 1: La Hoja de Cálculo Manual (El Método "Empieza Aquí")

Si tienes menos de 20 leads nuevos por semana, no necesitas automatización para esto.

1. Crea una hoja de Google con tus leads.
2. Agrega columnas para tus dimensiones.
3. Usa una fórmula simple `=SUM(B2:E2)` para calcular la puntuación.
4. Filtra por la columna "Puntuación Total" una vez a la semana para ver a quién contactar.

#### Nivel 2: El CRM Semi-Automatizado

Herramientas como **HubSpot (Gratis)** o **Pipedrive** te permiten crear campos personalizados.

1. Crea una propiedad "Puntuación de Intención de Compra".
2. Usa una herramienta como **Zapier** para agregar puntos. (Ej. Disparador: Nueva Apertura en Mailchimp → Acción: Agregar 1 a la Puntuación en HubSpot).
3. Configura una "Vista de Alta Prioridad" en tu CRM que solo muestre personas con puntuación > 50.

#### Nivel 3: Puntuación de Leads Nativa

Los planes avanzados de herramientas como **ConvertKit (Creator Pro)** o **HubSpot (Marketing Hub Professional)** tienen puntuación de leads integrada. Rastrean automáticamente el comportamiento y calculan la puntuación por ti.

<StrategyDuel
title="Hoja de Cálculo Manual vs. Puntuación Automatizada en CRM"
persistKey="course-12-marketing-automation-analytics-L3-duel"
scenario="Recibes 15-20 leads nuevos por semana y quieres implementar puntuación de leads."
strategyA={{
    name: "Hoja de Cálculo Manual",
    description: "Registra puntuaciones en Google Sheets con actualizaciones manuales semanales",
    pros: ["Costo cero", "Control total sobre la fórmula", "Fácil de entender y ajustar"],
    cons: ["Entrada de datos manual", "Sin actualizaciones en tiempo real", "No escala más allá de 50 leads/semana"]
  }}
strategyB={{
    name: "CRM Automatizado",
    description: "Usa HubSpot Gratis + Zapier para calcular puntuaciones automáticamente",
    pros: ["Puntuación en tiempo real", "Seguimiento automático", "Escala a cientos de leads"],
    cons: ["Curva de aprendizaje", "Inversión de tiempo en configuración", "Costo mensual potencial de Zapier"]
  }}
expertVerdict="Empieza con la hoja de cálculo para tus primeros 100 leads. Aprenderás qué importa realmente. Luego migra a la automatización una vez que hayas validado tu modelo de puntuación y tengas más de 20 leads/semana de forma consistente."
/>

---

### Contexto Dual: Escenarios de Puntuación

<ExampleCard label="B2B SaaS: UptimeBot">

#### El Contexto B2B SaaS: "UptimeBot"

Un fundador en solitario que vende software de monitoreo de servidores.

- **El "MQL" (Lead Calificado de Marketing):** Un CTO de una empresa de 20 personas (+15) que descargó la "Plantilla de Respuesta a Incidentes" (+10) y luego visitó la página "Integración con AWS" dos veces (+20).
  - **Puntuación Total:** 45.
  - **La Acción:** El fundador envía un mensaje de Slack o correo manual: "Hey, vi que estabas revisando la integración con AWS. Acabamos de lanzar una actualización para funciones Lambda —¿quieres un video rápido de cómo funciona?"

</ExampleCard>

<ExampleCard label="Creador/Coach: ProfitLab">

#### El Contexto Creador/Coach: "ProfitLab"

Un consultor que vende un sistema de Ventas de Alto Valor de $8.000.

- **El "MQL":** Un dueño de negocio con $500k de ingresos (+15) que abrió los últimos 5 correos (+10) y completó la herramienta "Auditoría del Pipeline de Ventas" (+15).
  - **Puntuación Total:** 40.
  - **La Acción:** El fundador envía una nota de voz en Instagram o un correo personal: "Vi que terminaste la Auditoría. Tu tasa de conversión es mejor que el promedio, pero la velocidad de tu pipeline es donde está la fuga. ¿Quieres ver el marco que uso para arreglarlo?"

</ExampleCard>

---

### Lista de Verificación Resumen

<InteractiveChecklist
title="Tu Checklist de Implementación de Puntuación de Leads"
persistKey="course-12-marketing-automation-analytics-L3-checklist"
items={[
"Define tus 3 Criterios de Ajuste Principales: ¿Qué cargo e industria buscas?",
"Asigna Valores de Puntos: ¿Qué comportamientos valen +1 y cuáles +20?",
"Establece Tu 'Umbral de Acción': ¿A qué puntuación contactarás personalmente?",
"Audita Tus Datos: Una vez al mes, verifica si tus leads 'Calientes' realmente convirtieron. Si no, ajusta los puntos."
]}
/>

### Ejercicio Práctico: Crea Tu Modelo de Puntuación de Leads

<TemplateBuilder
title="Tu Modelo de Puntuación de Leads (V1.0)"
persistKey="course-12-marketing-automation-analytics-L3-model"
sections={[
{
id: "demographic",
title: "Criterios de Ajuste Demográfico",
fields: [
{ id: "title1", label: "Cargo #1 (+15 pts)", placeholder: "Ej. CTO, VP de Ventas", type: "text" },
{ id: "title2", label: "Cargo #2 (+15 pts)", placeholder: "Ej. Fundador en Solitario", type: "text" },
{ id: "title3", label: "Cargo #3 (+15 pts)", placeholder: "Ej. Director de Marketing", type: "text" },
{ id: "companySize", label: "Tamaño Ideal de Empresa (+10 pts)", placeholder: "Ej. 10-50 empleados", type: "text" },
{ id: "industry", label: "Sector Objetivo (+5 pts)", placeholder: "Ej. B2B SaaS", type: "text" }
]
},
{
id: "behavioral",
title: "Comportamientos de Alto Valor",
fields: [
{ id: "behavior1", label: "Acción de Mayor Valor (+20 pts)", placeholder: "Ej. Respondió al correo", type: "text" },
{ id: "behavior2", label: "Segunda Acción de Mayor Valor (+15 pts)", placeholder: "Ej. Vio el video demo", type: "text" },
{ id: "behavior3", label: "Acción de Valor Medio (+5 pts)", placeholder: "Ej. Descargó el lead magnet", type: "text" }
]
},
{
id: "intent",
title: "Señales de Intención",
fields: [
{ id: "intent1", label: "Señal de Intención Más Fuerte (+25 pts)", placeholder: "Ej. Solicitó consulta", type: "text" },
{ id: "intent2", label: "Señal de Intención Secundaria (+20 pts)", placeholder: "Ej. 2+ visitas a precios en 48h", type: "text" }
]
},
{
id: "thresholds",
title: "Umbrales de Acción",
fields: [
{ id: "salesReady", label: "Puntuación Listo para Ventas (Contacto Personal)", placeholder: "Ej. 76", type: "number" },
{ id: "hot", label: "Puntuación Lead Caliente (Correo de Seguimiento)", placeholder: "Ej. 51", type: "number" },
{ id: "warm", label: "Puntuación Lead Tibio (Campaña Dirigida)", placeholder: "Ej. 26", type: "number" }
]
}
]}
/>

1.  **Selecciona Tus Pesos:** Crea una tabla de 4x5 (Dimensiones vs. Disparadores). Asigna un valor de puntos a cada uno.
2.  **Define el "Ajuste":** Escribe los 3 cargos que obtienen +15 puntos.
3.  **Establece el Umbral de Listo para Ventas:** Decide el número EXACTO en el que dejarás lo que estés haciendo y escribirás un correo personal a un lead.
4.  **Resultado Esperado:** Un Modelo de Puntuación de Leads de 1 página (V1.0) documentado para tu negocio.
