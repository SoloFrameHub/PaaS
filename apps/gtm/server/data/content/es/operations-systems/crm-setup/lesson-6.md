---
title: "Rastreo de Tratos y Campos Personalizados"
duration: "50 min"
track: "Operaciones y Sistemas"
course: "Curso 40: Configuración Avanzada de CRM"
lesson: 6
---

## El Trato de $47K que Desapareció

Sarah llevaba seis semanas cultivando un trato. El prospecto estaba comprometido, las demos fueron bien y la conversación de precios se sentía cálida. Luego... silencio.

Buscó en su CRM. El trato seguía ahí, marcado como "Propuesta Enviada", pero al hacer clic vio:

- Un campo "Próximos Pasos" en blanco
- Tres notas en texto libre que decían cosas como "buena llamada" y "hacer seguimiento la próxima semana"
- Sin registro de qué competidor estaban evaluando
- Sin indicación de quién era realmente el tomador de decisiones
- Sin calendario de cuándo decidirían

El trato había estado ahí durante 18 días. Sin marcas. Sin alertas. Ningún agente de IA podría haberla ayudado porque **el CRM no tenía datos estructurados para razonar**.

Perdió el trato. No porque su producto estuviera mal, sino porque su CRM tenía amnesia.

<InsightCard icon="🧠" title="El Problema Central">
La mayoría de los CRM son hojas de cálculo glorificadas. Almacenan datos, pero no **habilitan la acción**. Cada campo que crees debe responder una pregunta: "¿Qué decisión me ayuda a tomar esto?"
</InsightCard>

Hoy vas a construir un sistema de rastreo de tratos que no solo recuerda — **piensa contigo**.

---

## Sección 1: Arquitectura del Registro de Trato (Los Imprescindibles)

Cada trato en tu CRM necesita una base. Estos campos son **obligatorios** — sin ellos, no estás rastreando tratos, estás coleccionando listas de deseos.

### Los Campos Esenciales del Trato

<FlipCard
  front="Nombre del Trato"
  back="Formato: [Nombre de Empresa] - [Producto/Servicio]. Ejemplo: 'Acme Corp - Plan Anual'. Hace que el escaneo del pipeline sea instantáneo."
/>

<FlipCard
  front="Monto del Trato"
  back="Ingresos esperados. Aunque no conozcas los precios exactos aún, estima. Los montos en blanco = invisible para las proyecciones."
/>

<FlipCard
  front="Fecha de Cierre"
  back="Cuándo esperas cerrar. No un deseo — un objetivo realista basado en el calendario de compra del prospecto. Actualiza semanalmente."
/>

<FlipCard
  front="Etapa"
  back="Dónde se encuentra el trato en tu pipeline. De la Lección 4: Lead → Contactado → Comprometido → Reunión → Propuesta → Ganado/Perdido."
/>

<FlipCard
  front="Propietario"
  back="Quién es responsable. Para fundadores en solitario, eres tú. Para equipos, esto previene los desastres de '¿pensé que tú lo estabas manejando?'."
/>

<FlipCard
  front="Contactos Asociados"
  back="Vincula a cada persona involucrada. Defensor, tomador de decisiones, influenciador, bloqueador. La conversación múltiple comienza aquí."
/>

<FlipCard
  front="Empresa Asociada"
  back="Vincular al registro de la empresa. Mantiene todos los tratos con la misma organización conectados. Crítico para ventas adicionales y renovaciones."
/>

### Por Qué Importan para la IA

Un agente de IA no puede ayudarte si no sabe:

- **Qué** estás vendiendo (nombre del trato + monto)
- **Cuándo** necesita cerrarse (fecha de cierre)
- **Dónde** está en el proceso (etapa)
- **Quién** está involucrado (contactos + empresa)

Sin esto, tu IA está ciega.

<RangeSlider
  label="¿Cuántos de tus tratos actuales tienen TODOS los 7 campos esenciales completados?"
  min={0}
  max={100}
  lowLabel="Ninguno (0%)"
  highLabel="Todos (100%)"
  persistKey="crm-setup-L6-core-fields"
/>

---

## Sección 2: Campos Personalizados que Se Justifican

Ahora llegamos a los campos que **diferencian** tu CRM de una hoja de cálculo básica. Pero aquí está la regla:

**Cada campo personalizado debe pasar la prueba "¿Actuaría Sobre Esto?".**

Si la respuesta es "quizás" o "es bueno saberlo", elimínalo. Eres un fundador en solitario. No tienes tiempo para métricas de vanidad.

### Los Campos Personalizados Esenciales

<SlideNavigation>
<Slide title="Fuente del Lead">

**Qué es:** De dónde se originó este trato (DM de LinkedIn, correo en frío, referencia, solicitud de demo inbound, descarga de contenido).

**Por qué importa:** Necesitas saber qué canales producen ingresos, no solo leads. Si el 80% de tus tratos cerrados vienen de referencias pero pasas el 80% de tu tiempo en correo en frío, estás desasignando esfuerzo.

**Cómo estructurarlo:** Menú desplegable con 5-8 opciones. Ejemplos:

- Inbound - Solicitud de Demo en Sitio Web
- Outbound - Correo en Frío
- Outbound - DM en LinkedIn
- Referencia - Cliente
- Referencia - Socio
- Contenido - Asistente a Webinar

**Beneficio de IA:** Los agentes pueden priorizar leads de fuentes de alta conversión y deprioritizar los de baja conversión.

</Slide>

<Slide title="Puntuación de Ajuste ICP">

**Qué es:** Una calificación del 1 al 10 de qué tan bien este prospecto coincide con tu Perfil de Cliente Ideal.

**Por qué importa:** No todos los tratos son iguales. Un ajuste de 9/10 vale 3 veces el esfuerzo de un ajuste de 4/10. Este campo te permite priorizar implacablemente.

**Cómo estructurarlo:** Campo numérico (1-10) o menú desplegable (Bajo/Medio/Alto). Basado en:

- Tamaño de empresa (número de empleados o ingresos)
- Coincidencia de industria
- Rol/título del comprador
- Stack tecnológico (para SaaS)
- Señales de presupuesto

**Beneficio de IA:** Los agentes pueden auto-puntuar nuevos leads y marcar tratos de bajo ajuste para descalificación.

</Slide>

<Slide title="Prioridad del Trato">

**Qué es:** Clasificación Caliente/Tibio/Frío basada en urgencia e interacción.

**Por qué importa:** Cuando tienes 20 tratos abiertos, necesitas saber en cuáles 5 enfocarte **hoy**. La prioridad es tu filtro de acción diaria.

**Cómo estructurarlo:** Menú desplegable con 3 opciones:

- **Caliente**: Interacción activa, fecha de cierre próxima, señales de alta intención
- **Tibio**: Comprometido pero con cronograma más lento, necesita cultivo
- **Frío**: Baja interacción, fecha de cierre lejana, o estancado

**Beneficio de IA:** Los agentes muestran primero los tratos Calientes en los resúmenes diarios y auto-marcan tratos que caen de Caliente a Frío.

</Slide>

<Slide title="Próxima Acción y Fecha">

**Qué es:** El siguiente paso específico que necesitas dar, y cuándo.

**Por qué importa:** Los tratos sin próximas acciones mueren 2 veces más rápido (InsideSales.com). Este campo es tu mecanismo de fuerza.

**Cómo estructurarlo:**

- **Próxima Acción**: Campo de texto (ej., "Enviar caso de estudio", "Programar demo", "Hacer seguimiento de pregunta de precios")
- **Fecha de Próxima Acción**: Campo de fecha (cuándo lo harás)

**Beneficio de IA:** Los agentes pueden auto-generar listas de tareas diarias y marcar acciones vencidas.

</Slide>

<Slide title="Competidor Mencionado">

**Qué es:** Qué competidores está evaluando el prospecto.

**Por qué importa:** Si te están comparando con el Competidor X, necesitas conocer las debilidades de X y tu diferenciación. Este campo activa la búsqueda de tarjetas de batalla.

**Cómo estructurarlo:** Menú desplegable de selección múltiple con tus 5-10 principales competidores. Incluye "Ninguno" y "Desconocido".

**Beneficio de IA:** Los agentes pueden obtener el manejo de objeciones específicas del competidor y los puntos de diferenciación.

</Slide>

<Slide title="Defensor Identificado">

**Qué es:** Sí/No — ¿has identificado un defensor interno?

**Por qué importa:** Los tratos con defensores cierran a 3 veces la tasa de los tratos sin ellos (Gartner). Este es un indicador adelantado.

**Cómo estructurarlo:** Casilla de verificación (Sí/No) o menú desplegable (Sí/No/Buscando).

**Beneficio de IA:** Los agentes marcan tratos en etapas tardías (Reunión, Propuesta) sin defensor como de alto riesgo.

</Slide>

<Slide title="Calendario de Decisión">

**Qué es:** Cuándo planea tomar una decisión el prospecto (no cuándo esperas cerrar tú).

**Por qué importa:** Tu fecha de cierre debe alinearse con su calendario de decisión. El desajuste = pronósticos fallidos.

**Cómo estructurarlo:** Campo de fecha. Preguntar explícitamente: "¿Cuándo necesitan tener esta decisión tomada?"

**Beneficio de IA:** Los agentes comparan el Calendario de Decisión con la Fecha de Cierre y marcan los desajustes.

</Slide>

<Slide title="Razón de Pérdida">

**Qué es:** Por qué perdiste el trato (si lo perdiste).

**Por qué importa:** Reconocimiento de patrones. Si el 60% de las pérdidas son "Precio demasiado alto", tienes un problema de precios, no un problema de ventas.

**Cómo estructurarlo:** Menú desplegable con 8-12 opciones:

- Precio demasiado alto
- Eligió al competidor X
- Sin presupuesto
- Momento no es el adecuado
- Falta de funcionalidad
- El defensor dejó la empresa
- Desapareció / Sin respuesta
- Otro (especificar)

**Beneficio de IA:** Los agentes analizan patrones de pérdida y sugieren ajustes de posicionamiento o precios.

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Auditoría de Campos: ¿Cuáles de Estos Realmente Necesitas?"
persistKey="crm-setup-L6-field-audit"
items={[
"Fuente del Lead (para medir el ROI del canal)",
"Puntuación de Ajuste ICP (para priorizar implacablemente)",
"Prioridad del Trato (Caliente/Tibio/Frío para enfoque diario)",
"Próxima Acción + Fecha (para evitar que los tratos mueran)",
"Competidor Mencionado (para activar tarjetas de batalla)",
"Defensor Identificado (para marcar tratos de riesgo)",
"Calendario de Decisión (para alinear fechas de cierre)",
"Razón de Pérdida (para aprender de los fracasos)"
]}
/>

---

## Sección 3: El Esquema Listo para IA (Diseñando para Máquinas)

Aquí está la verdad: **las notas en texto libre son invisibles para la IA**.

Cuando escribes "Tuve una gran llamada, están interesados, hacer seguimiento la próxima semana", un agente de IA no puede extraer:

- Qué hizo que la llamada fuera genial
- Qué interés específico expresaron
- Cuál es el siguiente paso real
- Cuándo es "la próxima semana"

Necesitas **campos estructurados** en los que las máquinas puedan razonar.

### La Plantilla del Esquema de Trato Listo para IA

<TemplateBuilder
title="Tu Esquema de Trato Listo para IA"
persistKey="crm-setup-L6-schema"
sections={[
{
id: "contact-fields",
title: "Campos a Nivel de Contacto",
fields: [
{ id: "name", label: "Nombre Completo", placeholder: "ej., Sarah Chen", type: "text" },
{ id: "email", label: "Correo", placeholder: "ej., sarah@empresa.com", type: "text" },
{ id: "company", label: "Nombre de Empresa", placeholder: "ej., Acme Corp", type: "text" },
{ id: "role", label: "Título de Trabajo", placeholder: "ej., VP de Marketing", type: "text" },
{ id: "linkedin", label: "URL de LinkedIn", placeholder: "ej., linkedin.com/in/sarahchen", type: "text" },
{ id: "icp-fit", label: "Puntuación de Ajuste ICP (1-10)", placeholder: "ej., 8", type: "number" },
{ id: "disc", label: "Tipo DISC", placeholder: "ej., D (Dominante)", type: "text" },
{ id: "lead-source", label: "Fuente del Lead", placeholder: "ej., DM en LinkedIn", type: "text" },
{ id: "first-contact", label: "Fecha de Primer Contacto", placeholder: "ej., 2025-01-15", type: "date" }
]
},
{
id: "deal-fields",
title: "Campos a Nivel de Trato",
fields: [
{ id: "deal-name", label: "Nombre del Trato", placeholder: "ej., Acme Corp - Plan Anual", type: "text" },
{ id: "amount", label: "Monto del Trato ($)", placeholder: "ej., 12000", type: "number" },
{ id: "stage", label: "Etapa del Pipeline", placeholder: "ej., Reunión", type: "text" },
{ id: "close-date", label: "Fecha de Cierre Esperada", placeholder: "ej., 2025-02-28", type: "date" },
{ id: "priority", label: "Prioridad (Caliente/Tibio/Frío)", placeholder: "ej., Caliente", type: "text" },
{ id: "lead-source-deal", label: "Fuente del Lead", placeholder: "ej., Referencia - Cliente", type: "text" },
{ id: "competitor", label: "Competidor Mencionado", placeholder: "ej., Competidor X", type: "text" },
{ id: "champion", label: "Defensor Identificado (S/N)", placeholder: "ej., Sí", type: "text" },
{ id: "decision-timeline", label: "Calendario de Decisión", placeholder: "ej., 2025-02-15", type: "date" }
]
},
{
id: "event-log",
title: "Campos del Registro de Eventos (Por Interacción)",
fields: [
{ id: "event-type", label: "Tipo de Evento", placeholder: "ej., correo_enviado, llamada, reunión", type: "text" },
{ id: "event-date", label: "Fecha del Evento", placeholder: "ej., 2025-01-20", type: "date" },
{ id: "event-outcome", label: "Resultado (Positivo/Neutral/Negativo)", placeholder: "ej., Positivo", type: "text" },
{ id: "next-action", label: "Próxima Acción", placeholder: "ej., Enviar caso de estudio", type: "textarea" },
{ id: "next-action-date", label: "Fecha de Próxima Acción", placeholder: "ej., 2025-01-25", type: "date" }
]
},
{
id: "health-indicators",
title: "Campos de Indicadores de Salud (Auto-Calculados)",
fields: [
{ id: "days-since-contact", label: "Días Desde el Último Contacto", placeholder: "ej., 3", type: "number" },
{ id: "avg-response-time", label: "Tiempo Promedio de Respuesta (horas)", placeholder: "ej., 12", type: "number" },
{ id: "engagement-trend", label: "Tendencia de Compromiso (Arriba/Plano/Abajo)", placeholder: "ej., Arriba", type: "text" },
{ id: "meetings-held", label: "Reuniones Realizadas (cantidad)", placeholder: "ej., 2", type: "number" },
{ id: "emails-exchanged", label: "Correos Intercambiados (cantidad)", placeholder: "ej., 8", type: "number" }
]
}
]}
/>

### Por Qué Este Esquema Funciona para la IA

1. **Registros de Eventos Estructurados**: En lugar de "Tuve una llamada", registras `tipo_evento: llamada`, `resultado_evento: positivo`, `proxima_accion: Enviar precios`, `fecha_proxima_accion: 2025-01-25`. Una IA puede analizar esto.

2. **Indicadores de Salud**: Los campos auto-calculados como "Días Desde el Último Contacto" y "Tendencia de Compromiso" dan a los agentes de IA **señales** en las que actuar. Si `dias_desde_contacto > 14` y `tendencia_compromiso = abajo`, el agente lo marca.

3. **Etiquetas Categóricas**: Menús desplegables (no texto libre) para cosas como Prioridad, Etapa, Competidor. La IA puede filtrar y agrupar.

4. **Datos Temporales**: Fechas en todas partes (primer contacto, fecha de cierre, calendario de decisión, fecha de próxima acción). La IA puede construir cronologías y predecir resultados.

<ExampleCard label="Ejemplo de Consulta de Agente de IA">
**Humano:** "¿En qué tratos debería enfocarme hoy?"

**Agente de IA (razonando sobre datos estructurados del CRM):**

- Trato 1: Acme Corp - Plan Anual
  - Prioridad: Caliente
  - Etapa: Propuesta
  - Próxima Acción: Hacer seguimiento de pregunta de precios (vence hoy)
  - Días Desde Último Contacto: 2
  - Defensor Identificado: Sí
  - **Recomendación:** Máxima prioridad. Están comprometidos, tienes un defensor, y la pregunta de precios es el último bloqueador.

- Trato 2: Beta Inc - Plan Inicial
  - Prioridad: Tibio
  - Etapa: Reunión
  - Próxima Acción: Enviar caso de estudio (vencido hace 2 días)
  - Días Desde Último Contacto: 9
  - Defensor Identificado: No
  - **Recomendación:** Prioridad media. Acción vencida, sin defensor aún. Enviar caso de estudio + pedir presentación al tomador de decisiones.

- Trato 3: Gamma LLC - Plan Empresarial
  - Prioridad: Frío
  - Etapa: Comprometido
  - Próxima Acción: Ninguna
  - Días Desde Último Contacto: 18
  - Defensor Identificado: No
  - **Recomendación:** Baja prioridad. Estancado. Enviar correo de ruptura o mover a Perdido.

**Sin datos estructurados, la IA no puede hacer esto.**
</ExampleCard>

---

## Sección 4: Notas Estructuradas vs. Texto Libre (La Batalla por la Legibilidad de la IA)

Comparemos dos formas de registrar la misma llamada de ventas.

### Enfoque A: Nota en Texto Libre

```
Tuve una buena llamada con Sarah. Está interesada en el plan anual.
Mencionó que también están evaluando al Competidor X. Necesito hacer seguimiento
la próxima semana con un caso de estudio. Parecía positiva.
```

**Lo que una IA puede extraer:** Casi nada. "Buena llamada" es subjetivo. "Interesada" es vago. "La próxima semana" es ambiguo. "Parecía positiva" es un sentimiento, no un dato.

### Enfoque B: Campos Estructurados

| Campo                   | Valor                                                    |
| ----------------------- | -------------------------------------------------------- |
| Tipo de Evento          | Llamada                                                  |
| Fecha del Evento        | 2025-01-20                                               |
| Resultado del Evento    | Positivo                                                 |
| Temas Clave Discutidos  | Precios (Plan Anual), Comparación con Competidor         |
| Objeciones Planteadas   | Precio vs. Competidor X                                  |
| Defensor Identificado   | No (Sarah es influenciadora, no tomadora de decisiones)  |
| Próxima Acción          | Enviar caso de estudio comparándonos con el Competidor X |
| Fecha de Próxima Acción | 2025-01-27                                               |
| Calendario de Decisión  | Fin del T1 (2025-03-31)                                  |

**Lo que una IA puede extraer:** Todo. Sabe:

- La llamada fue positiva
- Precios y comparación de competidores son temas candentes
- Sarah es una influenciadora, no la defensora
- La próxima acción es específica y tiene fecha
- El calendario de decisión es el T1

<ComparisonBuilder
title="Convierte Tu Última Llamada de Ventas en Datos Estructurados"
persistKey="crm-setup-L6-structured-notes"
prompt="Pega tu nota de ventas más reciente en texto libre"
expertExample="Evento: Llamada | Fecha: 2025-01-20 | Resultado: Positivo | Temas: Precios, Competidor X | Objeciones: Precio | Defensor: No | Próxima Acción: Enviar caso de estudio | Fecha de Próxima Acción: 2025-01-27 | Calendario de Decisión: T1 2025"
criteria={[
"Tipo de evento y fecha especificados",
"Resultado categorizado (Positivo/Neutral/Negativo)",
"La próxima acción es específica y tiene fecha",
"Estado del defensor clarificado"
]}
/>

### La Prueba "¿Entendería un Agente Esto?"

Antes de guardar cualquier nota, pregunta:

> ¿Podría un modelo de clase GPT-4 extraer la perspectiva clave de este campo **sin contexto adicional**?

Si la respuesta es no, estructura el dato.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Piensa en los campos estructurados como **parámetros de API**. Las notas en texto libre son como pasar JSON no estructurado a un endpoint — el agente tiene que adivinar qué significa cada campo. Los campos estructurados son como una API bien documentada con parámetros tipados. El agente sabe exactamente qué hacer.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches y Consultores">
Los campos estructurados son como **formularios de admisión** para tus clientes. En lugar de pedirles que "te hablen de sus desafíos" (texto libre), haces preguntas específicas: "¿Cuáles son tus ingresos actuales? ¿Cuál es tu objetivo? ¿Qué te bloquea?" El mismo principio para el CRM — estructura las preguntas para que las respuestas sean accionables.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="Para Creadores">
Piensa en los campos estructurados como **etiquetas de contenido**. Cuando etiquetas un video de YouTube con "SEO", "Tutorial", "Principiante", el algoritmo sabe qué hacer con él. Las descripciones en texto libre son invisibles para el algoritmo. Lo mismo con el CRM — etiqueta tus tratos para que la IA pueda enrutarlos correctamente.
</ContextualNote>

---

## Sección 5: Línea de Tiempo de Actividades (La Cadena de Razonamiento de la IA)

Cada interacción con un prospecto debe registrarse como un **evento** en una línea de tiempo. Esta línea de tiempo se convierte en la **cadena de razonamiento** para los agentes de IA.

### Qué Registrar (y Cómo)

<SlideNavigation>
<Slide title="Correo Enviado">

**Tipo de Evento:** `correo_enviado`
**Campos Requeridos:**

- Fecha/hora
- Línea de asunto
- Resultado (abierto/hizo clic/sin respuesta)
- Próxima acción activada (si aplica)

**Por qué importa:** La IA puede rastrear la cadencia de correos y marcar si estás enviando demasiados o haciendo poco seguimiento.

</Slide>

<Slide title="Correo Recibido">

**Tipo de Evento:** `correo_recibido`
**Campos Requeridos:**

- Fecha/hora
- Sentimiento (positivo/neutral/negativo/objeción)
- Temas clave mencionados
- Próxima acción activada

**Por qué importa:** La IA puede detectar tendencias de compromiso. Si el sentimiento cambia de positivo a neutral a negativo, marca el trato como en riesgo.

</Slide>

<Slide title="Llamada">

**Tipo de Evento:** `llamada`
**Campos Requeridos:**

- Fecha/hora
- Duración
- Resultado (positivo/neutral/negativo)
- Temas clave discutidos
- Objeciones planteadas
- Próxima acción acordada

**Por qué importa:** La IA puede correlacionar la frecuencia de llamadas con las tasas de cierre y sugerir la cadencia de llamadas óptima.

</Slide>

<Slide title="Reunión (Demo, Descubrimiento, Revisión de Propuesta)">

**Tipo de Evento:** `reunión`
**Campos Requeridos:**

- Fecha/hora
- Tipo de reunión (descubrimiento/demo/propuesta/cierre)
- Asistentes (con roles)
- Resultado
- Próxima acción acordada
- Calendario de decisión confirmado

**Por qué importa:** La IA puede rastrear la conversación múltiple (cuántos stakeholders has conocido) y marcar tratos con solo un contacto como riesgosos.

</Slide>

<Slide title="Nota (Contexto Manual)">

**Tipo de Evento:** `nota`
**Campos Requeridos:**

- Fecha/hora
- Tipo de nota (perspectiva/objeción/mención-de-competidor/defensor-identificado)
- Contenido estructurado (no texto libre)

**Por qué importa:** Incluso las notas manuales deben categorizarse para que la IA pueda filtrarlas y mostrarlas.

</Slide>
</SlideNavigation>

### La Línea de Tiempo en Acción

Imagina esta secuencia de eventos para un trato:

1. **2025-01-10**: `correo_enviado` → Sin respuesta
2. **2025-01-13**: `correo_enviado` (seguimiento) → Abierto, hizo clic
3. **2025-01-15**: `correo_recibido` → Sentimiento positivo, solicitó demo
4. **2025-01-18**: `reunión` (demo) → Resultado positivo, 3 asistentes, próxima acción: enviar propuesta
5. **2025-01-20**: `correo_enviado` (propuesta) → Abierto
6. **2025-01-22**: `llamada` → Resultado neutral, objeción planteada (precio), próxima acción: enviar calculadora de ROI
7. **2025-01-25**: `correo_enviado` (calculadora de ROI) → Aún sin respuesta
8. **2025-01-28**: `nota` → Defensor identificado (Sarah, VP Marketing)

**Lo que un agente de IA puede inferir de esta línea de tiempo:**

- El trato está **progresando** (pasó de correo a demo a propuesta en 10 días)
- Hay **compromiso** (correos abiertos, asistió a la demo con 3 personas)
- Hay un **bloqueador** (objeción de precio el 2025-01-22)
- Hay un **defensor** (Sarah, identificada el 2025-01-28)
- La **próxima acción** está vencida (calculadora de ROI enviada hace 3 días, sin respuesta)

**Recomendación de IA:** "Hacer seguimiento de la calculadora de ROI. Referenciar a Sarah (defensora) en el correo. Si no hay respuesta en 2 días, escalar a una llamada."

<InsightCard icon="⚡" title="El Poder de las Líneas de Tiempo">
Una línea de tiempo no es solo un registro — es una **historia**. Los agentes de IA leen historias para predecir resultados. Cuanto más rica sea tu línea de tiempo, más inteligentes serán tus agentes.
</InsightCard>

---

## Sección 6: Convenciones de Nombres de Campos (Listos para API desde el Día 1)

Si vas a construir agentes de IA en el Curso 27, los nombres de tus campos deben ser **legibles por máquinas**.

### Las Reglas

1. **Prefijo con categoría**: `puntuacion_ajuste`, `señal_ultimo_correo_abierto`, `prioridad_trato`, `nota_tipo_objecion`
2. **Usar snake_case**: `fuente_lead`, no `Fuente Lead` ni `fuenteLead`
3. **Mantener nombres de visualización legibles para humanos**: El nombre del campo en la base de datos es `puntuacion_ajuste`, pero la etiqueta que ves en la interfaz es "Puntuación de Ajuste ICP (1-10)"
4. **Evitar espacios y caracteres especiales**: `fecha_proxima_accion`, no `Próxima Acción (Fecha)`
5. **Ser consistente**: Si usas `_fecha` para fechas, úsalo en todas partes (`fecha_primer_contacto`, `fecha_cierre`, `fecha_proxima_accion`)

### Ejemplo de Esquema de Nombres de Campos

| Nombre para Mostrar             | Nombre del Campo (Base de Datos) | Tipo                              |
| ------------------------------- | -------------------------------- | --------------------------------- |
| Puntuación de Ajuste ICP (1-10) | `puntuacion_ajuste`              | Número                            |
| Fuente del Lead                 | `fuente_lead`                    | Menú desplegable                  |
| Prioridad del Trato             | `prioridad_trato`                | Menú desplegable                  |
| Defensor Identificado           | `defensor_identificado`          | Casilla de verificación           |
| Próxima Acción                  | `proxima_accion`                 | Texto                             |
| Fecha de Próxima Acción         | `fecha_proxima_accion`           | Fecha                             |
| Días Desde el Último Contacto   | `salud_dias_desde_contacto`      | Número (auto-calculado)           |
| Tendencia de Compromiso         | `salud_tendencia_compromiso`     | Menú desplegable (auto-calculado) |

<LinterFeedback
title="Verificador de Nombres de Campos"
persistKey="crm-setup-L6-field-linter"
inputLabel="Pega tus nombres de campos (uno por línea)"
rules={[
{
id: "snake-case",
label: "Usa snake*case",
description: "Todo en minúsculas, palabras separadas por guiones bajos",
keywords: ["*"],
antiKeywords: [" ", "-", "camelCase"]
},
{
id: "category-prefix",
label: "Tiene prefijo de categoría",
description: "Comienza con ajuste*, señal*, trato*, nota*, salud*",
keywords: ["ajuste*", "señal*", "trato*", "nota*", "salud*"],
antiKeywords: []
},
{
id: "no-special-chars",
label: "Sin caracteres especiales",
description: "Solo letras, números y guiones bajos",
keywords: [],
antiKeywords: ["(", ")", "!", "@", "#", "$", "%", "^", "&", "*"]
}
]}
/>

---

## Sección 7: Juntando Todo (Tu Esquema de Trato Listo para IA)

Aprendiste:

1. Los 7 campos esenciales innegociables
2. Los 8 campos personalizados que se justifican
3. Cómo estructurar notas en lugar de texto libre
4. Cómo registrar eventos en una línea de tiempo
5. Cómo nombrar campos para compatibilidad con API

Ahora es el momento de **construir tu esquema**.

<InteractiveChecklist
title="Tu Lista de Verificación del Esquema de Trato Listo para IA"
persistKey="crm-setup-L6-schema-checklist"
items={[
"Campos esenciales configurados: Nombre del Trato, Monto, Fecha de Cierre, Etapa, Propietario, Contactos, Empresa",
"Campos personalizados añadidos: Fuente del Lead, Puntuación de Ajuste ICP, Prioridad, Próxima Acción + Fecha, Competidor, Defensor, Calendario de Decisión, Razón de Pérdida",
"Estructura del registro de eventos definida: tipo_evento, fecha_evento, resultado_evento, proxima_accion, fecha_proxima_accion",
"Indicadores de salud planificados: dias_desde_contacto, tiempo_respuesta_promedio, tendencia_compromiso, reuniones_realizadas, correos_intercambiados",
"Los nombres de campos siguen la convención snake_case con prefijos de categoría",
"Los menús desplegables estructurados reemplazan campos de texto libre donde sea posible",
"El registro de la línea de tiempo es parte de tu flujo de trabajo diario (registrar cada correo, llamada, reunión)",
"Esquema documentado en formato compartible (hoja de cálculo o JSON) para la configuración del agente del Curso 27"
]}
/>

### La Exportación del Esquema

Tu artefacto final para esta lección es un **Documento de Esquema de Campos** que puedes exportar como JSON y proporcionar a los agentes de IA en el Curso 27.

<ExampleCard label="Cómo Este Esquema Potencia los Agentes de IA">
En el Curso 27, construirás agentes de IA que:
- **Priorizan tu día**: "Muéstrame todos los tratos Calientes con próximas acciones vencidas"
- **Marcan riesgos**: "¿Qué tratos están en etapa Propuesta sin un defensor?"
- **Sugieren acciones**: "El Trato X ha estado en Comprometido durante 14 días sin próxima acción. Recomendación: Enviar correo de ruptura o programar llamada."
- **Analizan patrones**: "El 60% de las pérdidas son 'Precio demasiado alto'. Considera probar una oferta de nivel inferior."

**Todo esto requiere datos estructurados.** El esquema que construyes hoy es la base para cada agente de IA que desplegarás mañana.
</ExampleCard>

---

## Resumen: Tu Sistema de Rastreo de Tratos Listo para IA

Acabas de diseñar un esquema de CRM que no solo **almacena** datos — **habilita la acción**.

Esto es lo que construiste:

1. **Campos Esenciales del Trato**: Los 7 imprescindibles que cada trato debe tener
2. **Campos Personalizados que Se Justifican**: 8 campos que pasan la prueba "¿Actuaría Sobre Esto?"
3. **Registros de Eventos Estructurados**: Una línea de tiempo de cada interacción, categorizada y fechada
4. **Indicadores de Salud**: Señales auto-calculadas en las que los agentes de IA pueden razonar
5. **Nombres de Campos Listos para API**: snake_case con prefijos de categoría para la integración del Curso 27

<InsightCard icon="🎯" title="El Verdadero Logro">
El trato de $47K de Sarah desapareció porque su CRM no tenía estructura. Los tuyos no lo harán. Construiste un sistema que **piensa contigo** — y pronto, los agentes de IA también lo harán.
</InsightCard>

<InteractiveChecklist
title="Tus Tareas"
persistKey="crm-setup-L6-actions"
items={[
"Auditar tu CRM actual: ¿qué campos esenciales faltan?",
"Agregar los 8 campos personalizados que se justifican (o justificar por qué no los necesitas)",
"Convertir tus últimas 3 notas de ventas de texto libre a campos estructurados",
"Configurar el registro de eventos para correos, llamadas y reuniones",
"Exportar tu esquema de campos como JSON para el Curso 27",
"Probar tu esquema: ¿puede un agente de IA responder '¿Qué debo hacer hoy?' solo con los datos de tu CRM?"
]}
/>

---

## Quiz: Pon a Prueba Tu Comprensión

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "¿Qué es la prueba '¿Actuaría Sobre Esto?'?",
      "options": [
        "Una prueba para ver si un campo activa una decisión o automatización",
        "Una prueba para ver si un campo se ve profesional",
        "Una prueba para ver si un campo es requerido por el CRM",
        "Una prueba para ver si un campo puede ser auto-completado"
      ],
      "correctAnswer": 0,
      "explanation": "Cada campo personalizado debe pasar esta prueba: si la respuesta no activa una decisión o automatización, elimínalo. Los fundadores en solitario no tienen tiempo para métricas de vanidad."
    },
    {
      "id": "q2",
      "question": "¿Por qué son problemáticas las notas en texto libre para los agentes de IA?",
      "options": [
        "Tardan demasiado en escribirse",
        "Son invisibles para la IA — los agentes no pueden extraer perspectivas estructuradas",
        "No son buscables",
        "Requieren demasiado almacenamiento"
      ],
      "correctAnswer": 1,
      "explanation": "Las notas en texto libre como 'Tuve una buena llamada' son subjetivas y no estructuradas. Los agentes de IA necesitan campos categóricos (tipo_evento, resultado_evento, proxima_accion) para razonar."
    },
    {
      "id": "q3",
      "question": "¿Cuál es el beneficio de registrar eventos en una línea de tiempo (vs. solo actualizar la etapa del trato)?",
      "options": [
        "Se ve más profesional",
        "Crea una cadena de razonamiento para que los agentes de IA predigan resultados",
        "Es requerido por la mayoría de los CRM",
        "Hace los informes más bonitos"
      ],
      "correctAnswer": 1,
      "explanation": "Una línea de tiempo de eventos (correo_enviado → correo_recibido → llamada → reunión) cuenta una historia. Los agentes de IA leen historias para predecir resultados y sugerir próximas acciones."
    },
    {
      "id": "q4",
      "question": "¿Por qué usar nombres de campos en snake_case (ej., 'puntuacion_ajuste') en lugar de 'Puntuación de Ajuste'?",
      "options": [
        "Es una mejor práctica del CRM",
        "Es requerido para compatibilidad con API e integración con agentes del Curso 27",
        "Ahorra espacio de almacenamiento",
        "Es más fácil de escribir"
      ],
      "correctAnswer": 1,
      "explanation": "El snake_case con prefijos de categoría (puntuacion_ajuste, prioridad_trato, salud_dias_desde_contacto) hace que los campos sean legibles por máquinas para agentes de IA e integraciones de API."
    },
    {
      "id": "q5",
      "question": "¿Cuál de estos es un campo 'indicador de salud'?",
      "options": [
        "Nombre del Trato",
        "Días Desde el Último Contacto",
        "Fuente del Lead",
        "Competidor Mencionado"
      ],
      "correctAnswer": 1,
      "explanation": "Los indicadores de salud son señales auto-calculadas como 'Días Desde el Último Contacto', 'Tendencia de Compromiso' y 'Tiempo Promedio de Respuesta'. Le dan a los agentes de IA datos de salud del trato en tiempo real."
    }
  ]
}
```
