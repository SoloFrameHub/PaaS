---
title: "Diseño de Programas Grupales"
duration: "50 min"
track: "Economía del Creador"
course: "Curso 27: Escalando Ventas de Creador"
lesson: 6
---

# Diseño de Programas Grupales

Un programa grupal no es una práctica 1:1 con más personas en la llamada de Zoom. Es un producto fundamentalmente diferente que requiere su propia lógica de diseño. Los creadores que tratan los programas grupales como "1:1 con audiencia" terminan con experiencias agotadoras y desenfocadas que frustran a todos los involucrados.

Esta lección te guía a través de las decisiones estructurales que determinan si tu programa grupal prospera o fracasa.

<RangeSlider
  label="¿Qué tan seguro te sientes diseñando un programa grupal en este momento?"
  min={1}
  max={10}
  lowLabel="Nunca lo he hecho"
  highLabel="Muy seguro"
  persistKey="scaling-creator-sales-L6-confidence"
/>

---

## Estructura Curricular para Grupos

En un compromiso 1:1, puedes personalizar el camino para cada cliente. En un grupo, necesitas un marco compartido que todos sigan mientras permite la aplicación individual. El principio clave: **enseña el marco colectivamente, aplícalo individualmente**.

### La Arquitectura de Módulos

Un programa grupal bien estructurado usa de 4 a 8 módulos centrales, cada uno con tres capas:

<SlideNavigation>
<Slide title="Capa 1: El Concepto">

**Enseñado en video pregrabado, 15-30 minutos**

Esto es el qué y el por qué. Grábalo una vez. Los clientes lo ven en su propio tiempo antes de la sesión en vivo. Esto libera tus llamadas en vivo de ser clases magistrales.

</Slide>

<Slide title="Capa 2: La Aplicación">

**Llamada grupal en vivo, 60-90 minutos**

Esto es el cómo. Recorre el marco usando ejemplos reales del grupo. Pon en el "asiento caliente" a uno o dos participantes para demostrar la aplicación. Los clientes se van con una tarea específica vinculada al módulo.

</Slide>

<Slide title="Capa 3: La Implementación">

**Comunidad asíncrona + pods**

Esto es el hacer. Los clientes implementan la tarea, comparten su progreso en la comunidad (un grupo de WhatsApp o Slack dedicado), reciben retroalimentación de sus pares y de ti entre llamadas.

</Slide>
</SlideNavigation>

### Estructura de Currículo Grupal de 8 Semanas (Ejemplo)

| Semana | Módulo      | Video Conceptual | Enfoque de Llamada en Vivo                       | Tarea                                    |
| ------ | ----------- | ---------------- | ------------------------------------------------ | ---------------------------------------- |
| 1      | Base        | 20 min           | Establecer metas + formación de pods             | Definir meta a 90 días                   |
| 2      | Módulo A    | 25 min           | Recorrido del marco + Preguntas y Respuestas     | Aplicar el marco a tu propio negocio     |
| 3      | Módulo B    | 25 min           | Asientos calientes sobre resultados del Módulo A | Implementar ejercicio del Módulo B       |
| 4      | Integración | Ninguno          | Coaching grupal sobre Módulos A+B                | Revisión de progreso a mitad de programa |
| 5      | Módulo C    | 30 min           | Aplicación avanzada + casos de estudio           | Aplicar Módulo C a tu propio contexto    |
| 6      | Módulo D    | 25 min           | Asientos calientes sobre resultados del Módulo C | Sprint de implementación final           |
| 7      | Síntesis    | Ninguno          | Presentaciones de resultados entre pares         | Preparar showcase final                  |
| 8      | Graduación  | Ninguno          | Showcase + planificación de siguientes pasos     | Plan de continuación a 90 días           |

Observa el ritmo: enseñar, aplicar, integrar, repetir. Las semanas de integración (4 y 7) son críticas. Dan a los participantes tiempo para ponerse al día, consolidar el aprendizaje y evitar la saturación que mata las tasas de finalización.

<TemplateBuilder
title="Diseña Tu Programa Grupal de 6 Semanas"
persistKey="scaling-creator-sales-L6-curriculum"
sections={[
{
id: "program-basics",
title: "Datos Básicos del Programa",
fields: [
{ id: "name", label: "Nombre del Programa", placeholder: "ej., Acelerador de Contenido a Clientes", type: "text" },
{ id: "outcome", label: "Resultado Principal", placeholder: "ej., Conseguir los primeros 3 clientes de consultoría a partir del contenido", type: "textarea" }
]
},
{
id: "modules",
title: "Módulos Centrales (3-4)",
fields: [
{ id: "module1", label: "Módulo 1", placeholder: "ej., Posicionamiento y Selección de Nicho", type: "text" },
{ id: "module2", label: "Módulo 2", placeholder: "ej., Estrategia de Contenido para Generación de Leads", type: "text" },
{ id: "module3", label: "Módulo 3", placeholder: "ej., Prospección y Conversión", type: "text" },
{ id: "module4", label: "Módulo 4 (opcional)", placeholder: "ej., Entrega y Éxito del Cliente", type: "text" }
]
},
{
id: "rhythm",
title: "Ritmo del Programa",
fields: [
{ id: "call-frequency", label: "Frecuencia de Llamadas en Vivo", placeholder: "ej., 2x por semana, martes y jueves", type: "text" },
{ id: "community-platform", label: "Plataforma de Comunidad", placeholder: "ej., WhatsApp, Slack, Circle, Discord", type: "text" }
]
}
]}
/>

---

## Cohorte vs. Inscripción Continua

Esta es una de las decisiones más trascendentales en el diseño de programas grupales. Cada modelo tiene ventajas distintas.

<StrategyDuel
title="Cohorte vs. Inscripción Continua"
persistKey="scaling-creator-sales-L6-enrollment"
scenario="Estás lanzando tu primer programa grupal. ¿Qué modelo de inscripción deberías elegir?"
strategyA={{
    name: "Modelo de Cohorte",
    description: "Todos comienzan juntos, avanzan por el mismo material en el mismo calendario y se gradúan juntos.",
    pros: ["Fuerte vínculo grupal y rendición de cuentas", "Más fácil de enseñar — todos están en el mismo módulo", "Crea urgencia para la inscripción", "Tasas de finalización más altas gracias al impulso entre pares"],
    cons: ["Los ingresos son irregulares (grandes períodos de inscripción seguidos de vacíos)", "Los prospectos que pierden la fecha límite esperan semanas o meses", "Requiere masa crítica — una cohorte de 3 se siente vacía"]
  }}
strategyB={{
    name: "Inscripción Continua",
    description: "Las personas se unen en cualquier momento y avanzan por el material a su propio ritmo, con llamadas en vivo que atienden a participantes en diferentes etapas.",
    pros: ["Ingresos mensuales consistentes (inscripciones cada semana)", "Ningún prospecto tiene que esperar para comenzar", "Escala más fácilmente — la comunidad se enriquece con el tiempo"],
    cons: ["Más difícil crear vínculos de cohorte", "Las llamadas en vivo deben servir a personas en diferentes etapas simultáneamente", "Mayor riesgo de abandono porque no hay un punto final claro", "Los nuevos miembros pueden sentirse perdidos al unirse a una comunidad establecida"]
  }}
expertVerdict="Para tu primer programa grupal, comienza con cohortes. Los vínculos y las tasas de finalización importan más que la consistencia de ingresos cuando estás probando el modelo. Una vez que tengas 3-4 cohortes exitosas, considera el enfoque híbrido: cohortes trimestrales que se gradúan a una comunidad continua."
/>

### El Enfoque Híbrido

Ejecuta cohortes trimestrales para el programa central, pero mantén la comunidad abierta todo el año. Los miembros pasan por el programa estructurado de 8 semanas con su cohorte, luego se gradúan a una comunidad continua con llamadas mensuales y soporte asíncrono. Esto te da los beneficios de vinculación de las cohortes con los ingresos recurrentes de la inscripción continua.

---

## Integración de Comunidad

Un programa grupal sin comunidad es solo una serie de webinars con tarea. La comunidad es donde ocurre la verdadera transformación — en las conversaciones diarias, la retroalimentación entre pares y la vulnerabilidad compartida entre llamadas.

### Elección de Plataforma

Mantenlo simple. Usa lo que tu audiencia ya conoce:

- **WhatsApp Business o Telegram**: La opción más natural en LATAM. Barrera de entrada bajísima. Todos ya lo tienen en su celular.
- **Slack o Discord**: Mejor para comunidades activas y comprometidas. Conversación en tiempo real. Puede volverse ruidoso.
- **Circle o Skool**: Diseñados específicamente para comunidades de cursos. Mejor organizados. Menos fatiga de notificaciones.

La plataforma importa menos que las normas que establezcas. Una comunidad de WhatsApp próspera con buena moderación supera a un espacio de Circle bellamente diseñado que nadie usa.

### Arquitectura de Comunidad

Estructura tu espacio de comunidad alrededor de estos canales centrales:

- **Anuncios**: Solo tus actualizaciones. Comunicación unidireccional.
- **Victorias y Celebraciones**: Donde los miembros comparten su progreso. Este es el canal más importante porque las historias de éxito visibles motivan a todos.
- **Discusión por Módulo**: Un hilo o canal por módulo para preguntas y compartir la implementación.
- **Opiniones y Reflexiones**: Discusión abierta sobre temas de la industria. Construye cultura y relaciones.
- **Pods de Rendición de Cuentas**: Grupos privados (WhatsApp o canales internos) para cada pod de 3-5 miembros.
- **Biblioteca de Recursos**: Marcos, plantillas, grabaciones y materiales de referencia fijados.

<ClassifyExercise
title="Diseño de Canales de Comunidad"
persistKey="scaling-creator-sales-L6-channels"
categories={[
{ id: "essential", label: "Esencial (Debe Tener)", color: "#10b981" },
{ id: "valuable", label: "Valioso (Bueno Tener)", color: "#f59e0b" },
{ id: "optional", label: "Opcional (Se Puede Omitir)", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Anuncios (actualizaciones solo del coach)", correctCategory: "essential" },
{ id: "2", content: "Victorias y Celebraciones", correctCategory: "essential" },
{ id: "3", content: "Hilos de Discusión por Módulo", correctCategory: "essential" },
{ id: "4", content: "Pods de Rendición de Cuentas (grupos de 3-5 personas)", correctCategory: "valuable" },
{ id: "5", content: "Chat libre / Temas varios", correctCategory: "valuable" },
{ id: "6", content: "Frases motivacionales diarias", correctCategory: "optional" },
{ id: "7", content: "Canal separado para cada lección individual", correctCategory: "optional" },
{ id: "8", content: "Biblioteca de Recursos (materiales fijados)", correctCategory: "essential" }
]}
/>

### El Ritmo de la Comunidad

Las comunidades mueren cuando no hay ritmo. Establece una cadencia semanal:

- **Lunes**: Post de intención semanal (tú estableces el tema, los miembros comparten su meta de la semana)
- **Miércoles**: Pregunta de seguimiento a mitad de semana (haces una pregunta específica relacionada con el módulo actual)
- **Viernes**: Hilo de victorias (los miembros comparten su mayor victoria o aprendizaje de la semana)

Este ritmo crea la expectativa de participación regular, lo que impulsa el engagement incluso cuando no estás publicando activamente.

<InteractiveChecklist
title="Configuración del Ritmo de Engagement de Comunidad"
persistKey="scaling-creator-sales-L6-rhythm"
items={[
"Crear una plantilla de post de intención del lunes (tema + pregunta para la meta semanal)",
"Redactar 4 preguntas de seguimiento del miércoles vinculadas a tu primer módulo",
"Configurar un hilo recurrente de victorias del viernes (se puede automatizar con flujos de trabajo de Slack/WhatsApp o post manual)",
"Escribir las directrices de comunidad que expliquen el ritmo lunes/miércoles/viernes",
"Programar tus primeras 2 semanas de publicaciones con anticipación para establecer el patrón"
]}
/>

---

## Formatos de Llamadas en Vivo

Tus llamadas en vivo son el latido del corazón de la experiencia grupal. El formato que elijas determina la energía, el engagement y el valor de cada sesión.

<SlideNavigation>
<Slide title="Formato 1: El Asiento Caliente">

**Estructura**: 60-90 minutos. Haces coaching a 3-5 participantes en vivo mientras los demás observan.

**Cómo funciona**: Los miembros envían solicitudes de asiento caliente antes de la llamada (vía formulario o publicación en la comunidad). Seleccionas 3-5 basándote en relevancia para el módulo actual y variedad de situaciones. Cada asiento caliente dura 12-18 minutos: contexto breve del miembro, tu coaching, aporte del grupo y un siguiente paso claro.

**Por qué funciona**: Los observadores aprenden al ver coaching en tiempo real. Los problemas son identificables. Es lo más cercano al coaching 1:1 en un entorno grupal.

</Slide>

<Slide title="Formato 2: El Taller">

**Estructura**: 60-90 minutos. Enseñas un marco y luego los participantes trabajan en aplicarlo en tiempo real.

**Cómo funciona**: 20 minutos de instrucción, 20 minutos de aplicación individual o en salas de breakout, 20 minutos de compartir y recibir retroalimentación. Repetir si es necesario.

**Por qué funciona**: Los participantes se van con un resultado tangible (un borrador, un plan, un guión) en lugar de solo conocimiento. La energía de completar algo es alta.

</Slide>

<Slide title="Formato 3: El Panel">

**Estructura**: 60 minutos. Moderas una discusión entre 3-4 miembros del grupo que han logrado resultados.

**Cómo funciona**: Invitas a miembros que han implementado el material exitosamente. Les pides que compartan su proceso, desafíos y resultados. Se abre a preguntas y respuestas del grupo.

**Por qué funciona**: La prueba social de los pares es más persuasiva que la instrucción del coach. Normaliza el camino y proporciona ejemplos diversos de éxito.

</Slide>
</SlideNavigation>

### Cadencia de Llamadas Recomendada

Para un programa de dos llamadas por semana:

- **Llamada 1 (Enseñanza)**: Formato de taller para contenido de nuevo módulo
- **Llamada 2 (Coaching)**: Formato de asiento caliente para soporte de implementación

Para un programa de una llamada por semana:

- Alterna entre semanas de taller y asiento caliente, con una llamada de panel una vez al mes

<SwipeDecision
title="Juego de Decisión de Formato de Llamada"
description="Desliza a la derecha si esta situación requiere formato de ASIENTO CALIENTE, a la izquierda para formato de TALLER"
optionA="Taller"
optionB="Asiento Caliente"
persistKey="scaling-creator-sales-L6-format"
cards={[
{
id: "1",
content: "Semana 2: Acabas de enseñar un marco de posicionamiento. Los miembros necesitan aplicarlo a su propio negocio.",
correctOption: "a",
explanation: "El formato de taller permite que todos redacten su posicionamiento en vivo, luego compartan y reciban retroalimentación."
},
{
id: "2",
content: "Semana 4: Tres miembros están atascados en diferentes desafíos de implementación con el módulo de prospección.",
correctOption: "b",
explanation: "El formato de asiento caliente te permite hacer coaching del desafío específico de cada persona mientras los demás aprenden de los patrones."
},
{
id: "3",
content: "Semana 1: Llamada de inicio donde todos necesitan establecer su meta a 90 días usando tu marco.",
correctOption: "a",
explanation: "El formato de taller asegura que todos se vayan con una meta completada usando la misma plantilla."
},
{
id: "4",
content: "Semana 6: Los miembros han estado implementando por un mes y tienen preguntas específicas sobre sus resultados.",
correctOption: "b",
explanation: "El formato de asiento caliente aborda situaciones individuales y proporciona coaching personalizado."
}
]}
/>

---

## Equilibrando Estructura con Flexibilidad

La tensión en todo programa grupal: demasiada estructura y se siente rígido, muy poca y se siente caótico. La solución es ser **estructurado en el formato, flexible en el contenido**.

**Lo que se mantiene fijo:**

- Días y horarios de llamadas
- Secuencia y ritmo de módulos
- Fechas límite de tareas
- Ritmo de comunidad (publicaciones de lunes, miércoles y viernes)

**Lo que se mantiene flexible:**

- Temas de asientos calientes (impulsados por las necesidades de los participantes)
- Profundidad en módulos específicos (si el grupo necesita más tiempo en un concepto, extiéndelo)
- Alcance de las tareas (permite que los participantes ajusten según la etapa de su negocio)
- Expertos invitados (trae especialistas cuando las preguntas del grupo van más allá de tu experiencia)

La regla general: estructura el contenedor, no el contenido. Las personas necesitan saber cuándo presentarse y qué esperar. Lo que sucede dentro de ese contenedor debe responder a dónde está realmente el grupo, no a dónde tu plan curricular dice que deberían estar.

<InsightCard icon="⚖️" title="La Paradoja de la Estructura">
Cuanto más estructurado sea tu formato (horarios fijos de llamadas, secuencia clara de módulos, ritmo consistente de comunidad), más libertad tienes para ser flexible con el contenido. La estructura crea la seguridad que te permite improvisar basándote en lo que el grupo realmente necesita.
</InsightCard>

---

## Resumen de la Lección

- Estructura el currículo en tres capas: concepto (video asíncrono), aplicación (llamada en vivo), implementación (comunidad + pods)
- La inscripción por cohorte genera vínculos y urgencia; la inscripción continua crea ingresos consistentes; el modelo híbrido combina ambos
- La arquitectura de comunidad necesita canales para anuncios, victorias, discusión por módulo, chat abierto, pods y recursos
- Establece un ritmo semanal de comunidad: lunes intenciones, miércoles seguimiento, viernes victorias
- Tres formatos de llamadas en vivo: asiento caliente (coaching), taller (aplicación), panel (prueba social)
- Sé estructurado en el formato (calendarios y secuencias fijos) pero flexible en el contenido (responsivo a las necesidades del grupo)

<InteractiveChecklist
title="Tu Checklist de Lanzamiento de Programa Grupal"
persistKey="scaling-creator-sales-L6-launch"
items={[
"Diseñar 4-6 módulos centrales con resultados claros para cada uno",
"Decidir entre cohorte o inscripción continua (comienza con cohorte para el primer programa)",
"Elegir y configurar tu plataforma de comunidad (WhatsApp, Slack, Circle, Discord, etc.)",
"Crear canales esenciales de comunidad: Anuncios, Victorias, Discusión por Módulo, Biblioteca de Recursos",
"Escribir tus publicaciones de ritmo de comunidad lunes/miércoles/viernes para el primer mes",
"Planificar tu calendario de llamadas en vivo: formato de taller vs. asiento caliente para cada semana",
"Grabar tus primeros 2-3 videos conceptuales (15-30 min cada uno) antes del lanzamiento",
"Crear un formulario de solicitud de asiento caliente para que los miembros envíen temas de coaching"
]}
/>
