---
title: "Higiene del CRM: Manteniendo los Datos Limpios"
duration: "45 min"
track: "Operaciones y Sistemas"
course: "Curso 40: Configuración Avanzada de CRM"
lesson: 7
---

## El Trato de $47K que Murió en una Hoja de Cálculo

Conoce a Alex, un fundador técnico que había construido un hermoso esquema de CRM en la Lección 6. Campos estructurados, registros de eventos listos para IA, todo. Tres meses después, su mayor trato hasta la fecha — un contrato anual de $47K — desapareció.

El prospecto había respondido dos veces, mostrado interés, incluso pedido precios. Pero Alex nunca vio esos correos. ¿Por qué? Seguía revisando una hoja de cálculo de Google para "tratos activos" en lugar de su CRM. El CRM decía "Contactado". La hoja de cálculo decía "Lead Caliente". La realidad decía "Perdido ante el competidor que hizo el seguimiento".

**La lección:** Un esquema de CRM perfecto no vale nada si los datos dentro son mentiras.

<InsightCard icon="🧹" title="El Problema del Deterioro del 30%">
Sin higiene activa, los datos de tu CRM se deterioran aproximadamente un 30% por año. Los contactos cambian de trabajo. Los correos rebotan. Los tratos se estancan. En 12 meses, casi un tercio de tu "pipeline activo" es ficción.
</InsightCard>

Esta lección trata sobre los **15 minutos por semana** que previenen ese deterioro. No es glamoroso. No es opcional.

---

## El Barrido Semanal de 15 Minutos

La mayoría de los fundadores en solitario tratan la higiene del CRM como usar hilo dental — saben que deberían, pero solo lo hacen antes de la cita con el dentista (reunión con inversores, revisión del consejo, temporada de impuestos).

Aquí está la verdad: **la higiene es un ritual semanal, no un proyecto de limpieza trimestral.**

El protocolo tarda exactamente 15 minutos:

<SlideNavigation>
<Slide title="Minutos 0-3: Marcar Tratos Inactivos">

Filtra tu pipeline para tratos con **sin actividad en 14+ días**. No "sin reuniones" — sin _actividad_. Sin correos enviados, sin notas registradas, sin llamadas intentadas.

En la mayoría de los CRM:

- **HubSpot**: Filtrar por "Fecha de Última Actividad" < hace 14 días
- **Attio**: Ordenar por "Último Contacto" ascendente
- **Pipedrive**: Filtrar "Actividades" = Ninguna en los últimos 14 días
- **Close**: Vista Inteligente "Tratos Inactivos" (integrado)

Buscas tratos que se han **perdido entre los huecos**, no tratos esperando próximos pasos programados.

</Slide>

<Slide title="Minutos 3-8: Clasificar Cada Trato Inactivo">

Para cada trato marcado, toma una de cuatro decisiones:

1. **Avanzar** — Mover a la siguiente etapa si ha habido progreso que olvidaste registrar
2. **Hacer Seguimiento** — Crear una tarea para reactivar (correo, llamada, LinkedIn)
3. **Cerrar como Perdido** — Si han desaparecido durante 30+ días, acéptalo
4. **Fusionar** — Si encontraste un duplicado, combínalos ahora

La clave: **cada trato debe tener una próxima acción con fecha**. "Esperando que ellos" no es una próxima acción. "Enviar correo de ruptura el viernes" sí lo es.

</Slide>

<Slide title="Minutos 8-11: Verificar Próximas Acciones">

Filtra todo tu pipeline para tratos **sin una próxima acción programada**.

Este es el modo de fallo del CRM más común: tratos en etapa "Reunión" sin reunión programada, o en etapa "Propuesta" sin tarea de seguimiento.

Para cada trato sin próxima acción:

- Agregar una tarea específica (no "hacer seguimiento" — "enviar caso de estudio por correo")
- Establecer una fecha (no "la próxima semana" — "jueves a las 2pm")
- Asignártela (aunque seas solitario, la propiedad explícita importa)

</Slide>

<Slide title="Minutos 11-13: Verificación de Duplicados">

Ejecuta la herramienta de detección de duplicados de tu CRM. La mayoría las tienen:

- **HubSpot**: Configuración → Gestión de Datos → Duplicados
- **Attio**: Marca automáticamente duplicados en la barra lateral
- **Pipedrive**: Herramientas → Buscador de Duplicados
- **Close**: Informes → Contactos Duplicados

Fusiona cualquier duplicado **inmediatamente**. No lo diferas. Los duplicados corrompen las matemáticas de tu pipeline y confunden a los agentes de IA.

</Slide>

<Slide title="Minutos 13-15: Revisión de Patrones">

Mira tus tratos "Perdidos" de la semana pasada. Agrúpalos por razón de pérdida:

- Eligió al competidor
- Sin presupuesto
- Desapareció / Sin respuesta
- Momento no adecuado
- No es un ajuste

Si ves un patrón (ej., 3 tratos perdidos por "sin presupuesto" este mes), esa es una señal. Quizás tus precios están mal. Quizás estás apuntando a empresas demasiado pequeñas. Quizás tu propuesta de valor no está llegando.

**No solo registres las pérdidas. Aprende de ellas.**

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Tu Lista de Verificación del Barrido Semanal"
persistKey="crm-setup-L7-weekly-sweep"
items={[
"Filtrar tratos sin actividad en 14+ días",
"Clasificar cada trato inactivo (avanzar, hacer seguimiento, cerrar o fusionar)",
"Verificar que cada trato tiene una próxima acción con fecha",
"Ejecutar detección de duplicados y fusionar los encontrados",
"Revisar tratos perdidos para encontrar patrones"
]}
/>

---

## La Escalera de Escalación de Tratos Inactivos

No todos los tratos inactivos están igualmente muertos. Algunos solo están esperando una llamada programada. Otros han estado ignorándote durante seis semanas.

Aquí está el protocolo de escalación que mantiene tu pipeline honesto:

<FlipCard
  front="14 Días: Marca Amarilla"
  back="Sin actividad durante 2 semanas → Marcar como 'En Riesgo' y crear una tarea de seguimiento personal. Este es tu momento de 'no te he olvidado'."
/>

<FlipCard
  front="30 Días: Marca Roja"
  back="Sin actividad durante un mes → Marcar como 'Estancado' y enviar un correo de ruptura. 'Hola [Nombre], no he tenido noticias — ¿debo asumir que esto no es una prioridad ahora mismo?'"
/>

<FlipCard
  front="45 Días: Cierre Automático"
  back="Sin actividad durante 45+ días → Mover automáticamente a Perdido con razón 'Desapareció'. Excepción: tratos con una acción futura programada (ej., 'reconectar en Q2')."
/>

Esta escalera hace dos cosas:

1. **Fuerza la honestidad** — El valor de tu pipeline es real, no inflado por tratos zombie
2. **Activa la acción** — El correo de ruptura de 30 días a menudo revive tratos muertos ("Lo siento, mes loco, hablemos")

<RangeSlider
  label="¿Qué % de tu pipeline actual está realmente muerto?"
  min={0}
  max={100}
  lowLabel="0% (prístino)"
  highLabel="100% (todo zombies)"
  persistKey="crm-setup-L7-dead-pipeline"
/>

Promedio de la industria: **el 60% de los tratos en el pipeline típico ya están muertos.** Si marcaste más del 40%, no estás solo. Solo necesitas higiene.

---

## Detección de Duplicados: El Asesino Oculto del Pipeline

Aquí hay un escenario: Conoces a Sarah en una conferencia. La agregas a tu CRM. Dos semanas después, llena un formulario en tu sitio web. Tu CRM crea una _segunda_ Sarah. Ahora tienes:

- Sarah #1: Etapa = "Contactado", Última Actividad = hace 14 días
- Sarah #2: Etapa = "Lead", Última Actividad = hoy

¿Cuál es real? **Ambas. Y ninguna.**

Tu pipeline ahora muestra dos Sarahs. Tus agentes de IA las tratarán como personas diferentes. Tus secuencias de correo podrían enviar mensajes duplicados. Tu análisis está equivocado.

<ExampleCard label="Caso de Estudio: El Desastre de los Duplicados">

Un fundador de SaaS B2B tenía 847 contactos en su CRM. Después de ejecutar la deduplicación, tenía **612**. Había estado inflando su "total de contactos direccionables" en un 38% con duplicados.

Peor: 23 tratos activos eran duplicados. El valor de su pipeline estaba sobreestimado en $180K. Cuando cerró su primer "gran trato", se dio cuenta de que ya lo había perdido bajo un registro de contacto diferente.

</ExampleCard>

### Cómo Ocurren los Duplicados

1. **Entrada manual** — Agregas a alguien, lo olvidas, lo agregas de nuevo
2. **Envíos de formulario** — El formulario del sitio web crea un nuevo contacto en lugar de actualizar el existente
3. **Sincronización de correos** — Diferentes direcciones de correo para la misma persona (trabajo vs. personal)
4. **Importaciones** — La carga de CSV no coincide con los registros existentes
5. **Integraciones** — Zapier crea un nuevo contacto en lugar de encontrar el existente

### El Ritual Mensual de Deduplicación

Una vez al mes (el primer lunes funciona bien), ejecuta el buscador de duplicados de tu CRM y fusiona todo lo que marque.

**Reglas de fusión:**

- Conserva el registro con **datos más completos** (más campos completados)
- Preserva **todo el historial de actividad** de ambos registros
- Usa la **dirección de correo más reciente** como principal
- Fusiona **todos los tratos asociados** en el registro que permanece

<ClassifyExercise
title="¿Duplicado o Persona Diferente?"
persistKey="crm-setup-L7-dedupe-classify"
categories={[
{ id: "duplicate", label: "Duplicado (Fusionar)", color: "#ef4444" },
{ id: "different", label: "Persona Diferente (Conservar Ambos)", color: "#10b981" }
]}
items={[
{
id: "1",
content: "Sarah Chen (sarah@empresa.com) y Sarah Chen (sarah.chen@empresa.com)",
correctCategory: "duplicate",
explanation: "La misma persona, formato de correo diferente. Fusionar y conservar ambos correos."
},
{
id: "2",
content: "John Smith en Acme Corp y John Smith en Beta Inc",
correctCategory: "different",
explanation: "Nombre común, empresas diferentes. Probablemente personas diferentes."
},
{
id: "3",
content: "Mike Johnson (mike@startup.io) y Michael Johnson (m.johnson@startup.io)",
correctCategory: "duplicate",
explanation: "Mike = Michael, mismo dominio. Fusionar."
},
{
id: "4",
content: "Lisa Park (lisa@agencia.com) y Lisa Park (lisa@gmail.com)",
correctCategory: "duplicate",
explanation: "La misma persona, correo de trabajo vs. personal. Fusionar y conservar ambos."
}
]}
/>

---

## Deterioro de Datos: El Problema del Cambio de Trabajo en 2.3 Años

Tu defensor en Acme Corp acaba de cambiar de trabajo. Tú aún no lo sabes. Tu CRM sigue diciendo "VP de Marketing en Acme Corp".

Envías un correo. Rebota. O peor, va a su reemplazante, quien no tiene idea de quién eres.

**Las estadísticas:**

- Promedio de permanencia en un cargo: **2.3 años** para roles por debajo del nivel de Director
- Tasa de deterioro de correos: **2-3% por mes** (cambios de trabajo, cambios de empresa, cambios de dominio)
- Precisión de datos de contacto después de 12 meses: **~70%** sin verificación activa

<InsightCard icon="📉" title="La Curva de Deterioro">
Mes 0: 100% preciso. Mes 6: ~85% preciso. Mes 12: ~70% preciso. Mes 24: ~50% preciso.

Sin verificación trimestral, la mitad de tu CRM está equivocado después de dos años.
</InsightCard>

### Protocolo de Verificación Trimestral

Cada 90 días, verifica tus **contactos del pipeline activo** (no toda tu base de datos — eso es demasiado trabajo).

**Pipeline activo = cualquiera en un trato que no es Ganado o Perdido.**

Para cada contacto activo:

1. **Verificación de correo** — Usa Hunter.io (nivel gratuito: 25/mes) o NeverBounce para verificar si el correo es válido
2. **Verificación de LinkedIn** — Visita su perfil de LinkedIn. ¿Siguen en la misma empresa? ¿Mismo rol?
3. **Actualización de enriquecimiento** — Volver a ejecutar Apollo o Attio para detectar cambios de trabajo

Si han cambiado de trabajo:

- Actualizar su empresa y rol
- Verificar si la **nueva empresa** todavía encaja en tu ICP
- Si sí, actualizar el contexto del trato ("Sarah se mudó a Beta Inc, todavía tiene este problema")
- Si no, cerrar el trato como Perdido ("El defensor se fue, la nueva empresa no encaja")

<TemplateBuilder
title="Registro de Verificación de Contactos"
persistKey="crm-setup-L7-verification-log"
sections={[
{
id: "contact",
title: "Detalles del Contacto",
fields: [
{ id: "name", label: "Nombre del Contacto", placeholder: "ej., Sarah Chen", type: "text" },
{ id: "last-verified", label: "Fecha de Última Verificación", placeholder: "ej., 2025-01-15", type: "date" }
]
},
{
id: "verification",
title: "Resultados de la Verificación",
fields: [
{ id: "email-status", label: "Estado del Correo", placeholder: "ej., Válido / Rebotado / Catch-all", type: "text" },
{ id: "linkedin-check", label: "Estado de LinkedIn", placeholder: "ej., Mismo rol / Cambió de trabajo a X", type: "textarea" },
{ id: "action-needed", label: "Acción Requerida", placeholder: "ej., Actualizar campo de empresa, cerrar trato, re-enriquecer", type: "textarea" }
]
}
]}
/>

---

## La Regla de "Una Sola Fuente de Verdad"

Tienes un CRM. También tienes:

- Una hoja de cálculo de Google con "leads calientes"
- Un documento de Notion con "objetivos del T1"
- Un hilo de Slack con "personas a las que hacer seguimiento"
- Un cuaderno con nombres garabateados de una conferencia

**Uno de estos está equivocado. Probablemente todos ellos.**

La regla de "Una Sola Fuente de Verdad" es simple: **Si los datos existen en dos lugares, uno es una mentira.**

Tu CRM es la autoridad. Todo lo demás es un borrador, una nota o un cementerio.

### Matar la Hoja de Cálculo

La parte más difícil de la higiene del CRM es **confiar en tu CRM** lo suficiente como para eliminar la hoja de cálculo de respaldo.

Aquí está la prueba: ¿Puedes responder estas preguntas solo con tu CRM?

<InteractiveChecklist
title="Prueba de Confianza en el CRM"
persistKey="crm-setup-L7-trust-test"
items={[
"¿Cuántos tratos están en la etapa 'Reunión' ahora mismo?",
"¿Cuál es el valor total de mi pipeline?",
"¿A quién debo hacer seguimiento esta semana?",
"¿Qué tratos han pasado 14+ días sin actividad?",
"¿Cuál es mi tamaño promedio de trato?",
"¿Cuántos tratos cerré el mes pasado?"
]}
/>

Si no puedes responder las seis desde tu CRM en menos de 60 segundos, tu CRM aún no es tu fuente de verdad.

**La migración:**

1. Exporta tu hoja de cálculo como CSV
2. Importa a tu CRM (mapea columnas a campos)
3. Verifica que la importación funcionó (spot-check 10 registros)
4. **Elimina la hoja de cálculo**

Sí, elimínala. No la archives. Elimínala. Si la conservas "por si acaso", seguirás actualizándola y tendrás dos fuentes de verdad nuevamente.

<FlipCard
  front="¿Y si pierdo datos?"
  back="No lo harás. Los CRM tienen funciones de exportación. Siempre puedes recuperar tus datos. Pero mantener una hoja de cálculo paralela garantiza la divergencia de datos."
/>

---

## Automatización de Higiene: Deja que los Robots Hagan las Partes Aburridas

No necesitas marcar manualmente cada trato inactivo. Puedes automatizar la mayor parte del barrido de 15 minutos.

Aquí están las tres automatizaciones que cada fundador en solitario debe configurar:

### 1. Auto-Marcar Tratos Inactivos

**Activador:** El trato no ha tenido actividad durante 14 días
**Acción:** Agregar etiqueta "En Riesgo" y crear tarea "Hacer seguimiento de [Nombre del Trato]"

**Cómo construir:**

- **HubSpot Starter**: Flujo de trabajo → Basado en tratos → "Fecha de Última Actividad es de hace más de 14 días" → Agregar a lista "Tratos Inactivos"
- **Attio**: Automatización → "Último Contacto > 14 días" → Agregar etiqueta "Inactivo"
- **Pipedrive**: Automatización de flujo → "Sin actividad en 14 días" → Crear actividad "Hacer seguimiento"
- **Zapier/Make**: Activador de CRM → Filtrar "Última Actividad > 14 días" → Actualizar trato + crear tarea

### 2. Auto-Archivar Correos Rebotados

**Activador:** El correo rebota (rebote permanente, no temporal)
**Acción:** Agregar etiqueta "Correo Inválido" y eliminar de las secuencias activas

**Cómo construir:**

- **HubSpot**: Nativo — marca automáticamente los contactos como "Rebotado"
- **Attio**: La sincronización de correos detecta rebotes, marca el contacto
- **Instantly/Smartlead**: Webhook en rebote → Zapier → Actualizar contacto del CRM
- **Close**: Manejo nativo de rebotes

### 3. Auto-Etiquetar Contactos Inactivos

**Activador:** El contacto no ha interactuado (abierto correo, hecho clic, respondido) en 90 días
**Acción:** Agregar etiqueta "Inactivo - 90 días"

**Cómo construir:**

- **HubSpot**: Flujo de trabajo → Basado en contactos → "Fecha de Último Compromiso es de hace más de 90 días" → Agregar a lista "Inactivos"
- **Attio**: Automatización → "Último Correo Abierto > 90 días" → Agregar etiqueta "Inactivo"
- **Pipedrive**: Filtrar → "Última Actividad > 90 días" → Etiquetar en lote
- **Zapier**: Activador programado (semanal) → Obtener contactos → Filtrar por última actividad → Etiquetar

<ScenarioSimulator
title="ROI de la Automatización de Higiene"
persistKey="crm-setup-L7-automation-roi"
levers={[
{ id: "deals", label: "Tratos activos en pipeline", min: 10, max: 200, step: 10, defaultValue: 50 },
{ id: "staleRate", label: "% que se vuelven inactivos mensualmente", min: 10, max: 50, step: 5, defaultValue: 30 }
]}
outputs={[
{
id: "stalePer Month",
label: "Tratos inactivos por mes",
formula: "(deals * (staleRate / 100))",
unit: " tratos",
precision: 0
},
{
id: "timeSaved",
label: "Tiempo ahorrado por mes",
formula: "(deals * (staleRate / 100) * 3 / 60)",
unit: " horas",
precision: 1
}
]}
insight="Con {stalePer Month} tratos inactivos/mes, la automatización te ahorra {timeSaved} horas de marcado manual. Son {timeSaved \* 4} horas por trimestre."
/>

---

## El Ritmo Semanal del CRM

La higiene no es un proyecto de una sola vez. Es un **ritmo semanal**.

Aquí está el ritual completo del CRM semanal para fundadores en solitario:

<ProgressiveReveal title="Tu Ritmo Semanal del CRM" persistKey="crm-setup-L7-rhythm">

<RevealSection title="Lunes por la Mañana (15 min): Revisión del Pipeline">

Comienza tu semana revisando tu pipeline:

- Ejecuta el barrido de 15 minutos (tratos inactivos, próximas acciones, deduplicaciones, patrones de pérdida)
- Identifica tus **3 tratos principales** para la semana (mayor valor × mayor probabilidad)
- Bloquea tiempo en tu calendario para esos 3 tratos

Este es tu filtro de "qué importa esta semana".

</RevealSection>

<RevealSection title="Miércoles (Según Vayas): Registrar Notas de Reunión">

Después de cada llamada o reunión, registra notas **inmediatamente**. No al final del día. No el viernes. Ahora.

Usa campos estructurados, no texto libre:

- **Resultado**: Positivo / Neutral / Negativo (menú desplegable)
- **Próxima Acción**: Tarea específica con fecha
- **Perspectiva Clave**: Resumen de una oración
- **Objeciones Planteadas**: Selección múltiple (Presupuesto, Momento, Competidor, Ajuste)

Esto toma 2 minutos por reunión. Diferirlo cuesta 10 minutos de "espera, ¿qué dijeron?"

</RevealSection>

<RevealSection title="Viernes por la Tarde (15 min): Barrido de Higiene">

Termina tu semana limpiando:

- Ejecuta el barrido de 15 minutos de nuevo (sí, dos veces por semana si tu pipeline es activo)
- Archiva cualquier trato que se haya cerrado esta semana
- Actualiza los valores de los tratos si algo cambió
- Revisa tus tratos "Perdidos" y registra las razones de pérdida

Esto mantiene tu pipeline preciso para la revisión del lunes.

</RevealSection>

</ProgressiveReveal>

<InsightCard icon="⏱️" title="Inversión Total de Tiempo">
30 minutos por semana (2 barridos × 15 min) + 2 minutos por reunión para notas.

Para un fundador en solitario con 5 reuniones/semana, eso es **40 minutos en total**. Menos del 1% de tu semana laboral. Pero previene el deterioro anual del 30% que mata los pipelines.
</InsightCard>

---

## Simulacro de Higiene: ¿Puedes Sobrevivir una Auditoría?

Imagina esto: Un inversor pide ver tu pipeline. O un posible comprador quiere verificar tus afirmaciones de ingresos. O estás solicitando un préstamo y necesitas mostrar tratos activos.

¿Puede tu CRM sobrevivir una auditoría?

<TimedChallenge
title="Simulación de Auditoría del Pipeline"
persistKey="crm-setup-L7-audit-challenge"
timeLimit={120}
items={[
{
id: "1",
prompt: "Trato en etapa 'Propuesta' durante 60 días sin próxima acción",
correctAnswer: "fail",
explanation: "Trato inactivo sin próximo paso = no es una oportunidad real"
},
{
id: "2",
prompt: "Trato en etapa 'Reunión' con una llamada programada para la próxima semana",
correctAnswer: "pass",
explanation: "Trato activo con próximo paso claro"
},
{
id: "3",
prompt: "Contacto con correo rebotado todavía marcado como 'Lead Activo'",
correctAnswer: "fail",
explanation: "Contacto inválido infla tu mercado direccionable"
},
{
id: "4",
prompt: "Trato cerrado hace 3 meses todavía visible en etapa 'Ganado'",
correctAnswer: "pass",
explanation: "Los tratos ganados deben seguir siendo visibles para los informes"
},
{
id: "5",
prompt: "Dos contactos con la misma dirección de correo en diferentes empresas",
correctAnswer: "fail",
explanation: "Duplicado que corrompe tu conteo de contactos"
}
]}
/>

**Lista de verificación de CRM listo para auditoría:**

- Sin tratos sin próximas acciones
- Sin tratos inactivos de más de 45 días (a menos que estén marcados explícitamente como "Ciclo Largo")
- Sin duplicados
- Sin correos rebotados en el pipeline activo
- Razones de pérdida registradas para todos los tratos Perdidos
- El valor del pipeline coincide con la suma de los valores de los tratos (sin tratos huérfanos)

---

## Resumen: Los 15 Minutos que Salvan Tu Pipeline

La higiene del CRM no es glamorosa. No es un hack de crecimiento. No multiplicará tus ingresos por 10.

Pero es la diferencia entre un CRM que **te dice la verdad** y un CRM que **te miente**.

El barrido semanal de 15 minutos previene:

- Tratos zombie inflando tu pipeline
- Duplicados corrompiendo tu conteo de contactos
- Tratos inactivos muriendo por descuido
- Deterioro de datos haciendo tu CRM inútil
- Tratos perdidos repitiendo los mismos errores

Y habilita:

- Agentes de IA que pueden razonar sobre datos limpios (Curso 27)
- Análisis que reflejan la realidad (Curso 41)
- Respuestas confiadas cuando los inversores preguntan "¿Cuál es tu pipeline?"

<InteractiveChecklist
title="Tus Tareas de Higiene del CRM"
persistKey="crm-setup-L7-actions"
items={[
"Programar barrido del CRM de 15 minutos cada lunes y viernes",
"Configurar automatización de auto-marcado para tratos sin actividad en 14+ días",
"Ejecutar detección de duplicados y fusionar los encontrados",
"Verificar los 10 principales contactos del pipeline activo (correo + LinkedIn)",
"Implementar la escalera de escalación de tratos inactivos (14/30/45 días)",
"Eliminar cualquier hoja de cálculo o documento de Notion paralelo que rastree tratos",
"Registrar notas de reuniones inmediatamente después de las llamadas (solo campos estructurados)",
"Revisar tratos perdidos mensualmente para encontrar patrones"
]}
/>

---

## Quiz: Dominio de la Higiene del CRM

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Cuál es el propósito principal del barrido semanal de 15 minutos del CRM?",
      "options": [
        "Agregar más campos personalizados a tu CRM",
        "Prevenir el deterioro de datos y mantener tu pipeline honesto",
        "Impresionar a los inversores con una interfaz limpia",
        "Practicar el uso de las funciones del CRM"
      ],
      "correctAnswer": 1,
      "explanation": "El barrido semanal previene el deterioro anual del 30% de los datos que mata la precisión del pipeline. Se trata de la verdad, no de la estética."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿En qué punto debería un trato sin actividad moverse automáticamente a Perdido?",
      "options": [
        "7 días",
        "14 días (marca amarilla)",
        "30 días (marca roja)",
        "45 días (cierre automático)"
      ],
      "correctAnswer": 3,
      "explanation": "La escalera de escalación: 14 días = marca amarilla, 30 días = marca roja + correo de ruptura, 45 días = cierre automático como Perdido (a menos que haya una acción futura programada)."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "¿Qué porcentaje del pipeline de ventas típico ya está muerto?",
      "options": ["10-20%", "30-40%", "60%", "80-90%"],
      "correctAnswer": 2,
      "explanation": "La investigación de la industria muestra que el 60% de los tratos en el pipeline típico ya están muertos. La higiene lo reduce al 20-30%."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Deberías mantener una hoja de cálculo de respaldo de tus tratos 'por si acaso' tu CRM falla.",
      "correctAnswer": false,
      "explanation": "La regla de 'Una Sola Fuente de Verdad': si los datos existen en dos lugares, uno es una mentira. Tu CRM debe ser la única autoridad. Las hojas de cálculo paralelas garantizan la divergencia de datos."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "¿Con qué frecuencia deberías verificar los contactos del pipeline activo (correo + verificación de LinkedIn)?",
      "options": [
        "Semanalmente",
        "Mensualmente",
        "Trimestralmente (cada 90 días)",
        "Anualmente"
      ],
      "correctAnswer": 2,
      "explanation": "La verificación trimestral detecta cambios de trabajo y deterioro de correos antes de que corrompan tu pipeline. Semanalmente es excesivo; anualmente es demasiado tarde."
    },
    {
      "id": "q6",
      "type": "multiple-choice",
      "question": "¿Cuál de estos NO es una razón válida para fusionar dos registros de contacto?",
      "options": [
        "Mismo nombre, misma empresa, formatos de correo diferentes (sarah@empresa.com vs s.jones@empresa.com)",
        "Mismo nombre, empresas diferentes (John Smith en Acme vs John Smith en Beta)",
        "Misma persona, correo de trabajo vs. correo personal",
        "Error tipográfico obvio en un registro (Sara Chen vs Sarah Chen, mismo correo)"
      ],
      "correctAnswer": 1,
      "explanation": "Mismo nombre, empresas diferentes = probablemente personas diferentes (especialmente nombres comunes como John Smith). No fusiones sin verificar que son la misma persona."
    },
    {
      "id": "q7",
      "type": "true-false",
      "question": "Cada trato en tu pipeline debe tener una próxima acción con una fecha específica.",
      "correctAnswer": true,
      "explanation": "Esta es la regla central de higiene. 'Esperando que ellos' no es una próxima acción. 'Enviar correo de seguimiento el viernes a las 2pm' sí lo es. Los tratos sin próximas acciones son tratos muertos disfrazados."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "¿Cuál es la permanencia promedio en un cargo para roles por debajo del nivel de Director?",
      "options": ["6 meses", "1 año", "2.3 años", "5 años"],
      "correctAnswer": 2,
      "explanation": "La permanencia promedio es de 2.3 años. Esto significa que tu defensor podría cambiar de trabajo en medio del trato. La verificación trimestral detecta esto antes de que tus correos reboten."
    }
  ]
}
```
