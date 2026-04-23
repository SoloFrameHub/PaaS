---
title: "Ensamblaje del Sistema: Alcance + Secuencias + CRM"
duration: "60 min"
track: "Operations & Systems"
course: "Course 48: Capstone"
lesson: 3
---

## De la Estrategia a la Infraestructura

En la Lección 2 definiste quién es tu cliente ideal, qué hace que tu oferta sea diferente, y qué canales usarás para llegar a ellos. Ese es el plano.

Esta lección construye la infraestructura: las secuencias reales de alcance que ejecutan tu estrategia, el pipeline de CRM que rastrea el progreso desde prospecto hasta cliente, y el flujo de datos que conecta cada herramienta en tu stack.

Al final de esta lección, tendrás un sistema de alcance activo configurado y listo para activar en el Sprint de 30 Días.

<InsightCard icon="⚙️" title="Lo Que Estás Configurando">
Esta lección produce tres artefactos: (1) Al menos una secuencia de alcance completa en tu herramienta de email/mensajería, lista para ejecutarse; (2) Tu pipeline de CRM configurado con etapas definidas, campos estándar, y al menos 20 prospectos de muestra; (3) Tu mapa de flujo de datos documentando cómo los prospectos se mueven a través del sistema.
</InsightCard>

## Paso 1: Construye Tu Secuencia de Alcance Principal

Aquí construyes la secuencia de alcance real — no describes cómo será, sino que la escribes lista para ejecutar.

<TemplateBuilder
title="Mi Secuencia de Alcance Principal"
persistKey="capstone-L3-sequences"
sections={[
{
id: "email1",
title: "Email 1: El Abridor (Día 1)",
fields: [
{ id: "subject1", label: "Línea de asunto", placeholder: "ej., Pregunta sobre tu proceso de pipeline | Pregunta rápida sobre [empresa]", type: "text" },
{ id: "body1", label: "Cuerpo del email (objetivo: 80-120 palabras)", placeholder: "Primera línea personalizada que demuestra que investigaste sobre ellos. Luego: el problema que resuelves en su lenguaje. Tu prueba en una oración. Una pregunta como CTA.", type: "textarea" }
]
},
{
id: "email2",
title: "Email 2: El Insight (Día 3-4)",
fields: [
{ id: "subject2", label: "Línea de asunto (diferente al Email 1)", placeholder: "ej., Lo que estamos viendo con [tipo de empresa] como la tuya", type: "text" },
{ id: "body2", label: "Cuerpo del email (objetivo: 100-150 palabras)", placeholder: "Breve referencia al Email 1. Una perspectiva o dato específico relevante para su situación. Conexión a lo que haces. CTA suave: '¿Esto resuena con lo que ves?'", type: "textarea" }
]
},
{
id: "email3",
title: "Email 3: La Prueba Social (Día 7-8)",
fields: [
{ id: "subject3", label: "Línea de asunto", placeholder: "ej., Cómo [Nombre de empresa] resolvió exactamente este problema", type: "text" },
{ id: "body3", label: "Cuerpo del email (objetivo: 100-130 palabras)", placeholder: "Caso de estudio de cliente de 2-3 oraciones: quiénes eran, cuál era su problema, qué resultado específico lograron. Conexión a su situación. CTA: '¿Vale la pena una llamada de 15 minutos para ver si podemos hacer lo mismo para [empresa]?'", type: "textarea" }
]
},
{
id: "email4",
title: "Email 4: La Objeción (Día 14)",
fields: [
{ id: "subject4", label: "Línea de asunto", placeholder: "ej., La preocupación más común que escuchamos de [tipo de ICP]", type: "text" },
{ id: "body4", label: "Cuerpo del email (objetivo: 80-100 palabras)", placeholder: "Aborda directamente la razón más probable por la que no han respondido. Tono empático y directo. Sin presión.", type: "textarea" }
]
},
{
id: "email5",
title: "Email 5: El Cierre Limpio (Día 21)",
fields: [
{ id: "subject5", label: "Línea de asunto", placeholder: "ej., Cerrando el hilo — sin presión", type: "text" },
{ id: "body5", label: "Cuerpo del email (objetivo: 60-80 palabras)", placeholder: "No quiero seguir llenando tu bandeja. Breve propuesta de valor final. La puerta siempre queda abierta: 'Si [problema] se vuelve una prioridad en [Trimestre], me encantaría conectar entonces.' Sin cierre forzado.", type: "textarea" }
]
}
]}
/>

## Paso 2: La Auditoría del CRM

Antes de configurar el pipeline para el Sprint, audita el estado actual de tu CRM.

<TemplateBuilder
title="Auditoría del CRM"
persistKey="capstone-L3-crm-audit"
sections={[
{
id: "current-state",
title: "Estado Actual",
fields: [
{ id: "crm-tool", label: "¿Qué CRM estás usando?", placeholder: "ej., HubSpot CRM (gratuito)", type: "text" },
{ id: "contact-count", label: "¿Cuántos contactos tienes ahora mismo?", placeholder: "ej., 147 contactos", type: "text" },
{ id: "stage-defined", label: "¿Tienes etapas de pipeline definidas con criterios claros?", placeholder: "ej., Sí — Prospecto, Contactado, Respondió, Reunión Agendada, Propuesta, Cerrado Ganado, Cerrado Perdido", type: "textarea" },
{ id: "data-quality", label: "¿Qué tan completos están los campos? (1-10, siendo 10 = datos perfectos)", placeholder: "ej., 4 — muchos registros no tienen cargo, tamaño de empresa, o campo de fuente del lead", type: "text" }
]
},
{
id: "gaps",
title: "Brechas a Arreglar Antes del Sprint",
fields: [
{ id: "missing-fields", label: "Campos requeridos faltando en contactos existentes", placeholder: "ej., 80% de los contactos no tienen registrado el tamaño de empresa. Agregar esto manualmente para los 20 prospectos más calientes antes del Sprint.", type: "textarea" },
{ id: "stage-gaps", label: "Prospectos atascados en etapas incorrectas", placeholder: "ej., 15 prospectos todavía en 'Contactado' de hace 3 meses — necesito revisarlos y moverlos a Cerrado Perdido o Rescatado", type: "textarea" }
]
}
]}
/>

## Paso 3: Configura Tu Pipeline del Sprint

Tu pipeline del Sprint necesita estar configurado y poblado antes de que comience el Sprint de 30 Días.

<TemplateBuilder
title="Configuración del Pipeline del Sprint"
persistKey="capstone-L3-dataflow"
sections={[
{
id: "stages",
title: "Definiciones de Etapas del Pipeline",
fields: [
{ id: "stage1", label: "Etapa 1 y criterio de entrada", placeholder: "ej., Prospecto — persona identificada que cumple criterios de ICP, aún no contactada", type: "text" },
{ id: "stage2", label: "Etapa 2 y criterio de entrada", placeholder: "ej., En Secuencia — actualmente en secuencia de email activa", type: "text" },
{ id: "stage3", label: "Etapa 3 y criterio de entrada", placeholder: "ej., Respondió — respondió a un email o mensaje positivamente", type: "text" },
{ id: "stage4", label: "Etapa 4 y criterio de entrada", placeholder: "ej., Reunión Agendada — llamada de descubrimiento en el calendario", type: "text" },
{ id: "stage5", label: "Etapa 5 y criterio de entrada", placeholder: "ej., Propuesta Enviada — propuesta formal enviada, esperando decisión", type: "text" },
{ id: "stage6", label: "Etapas finales", placeholder: "ej., Cerrado Ganado — contrato firmado, pagado. Cerrado Perdido — decisión tomada de no avanzar. Nutrición — interesado pero no ahora, seguir trimestral.", type: "textarea" }
]
},
{
id: "fields",
title: "Campos Estándar del CRM",
fields: [
{ id: "required-fields", label: "Campos requeridos para cada prospecto", placeholder: "ej., Nombre, Empresa, Cargo, Email, Tamaño de empresa, Fuente del lead, Fecha del primer contacto, Próxima acción + fecha", type: "textarea" },
{ id: "icp-score", label: "Cómo puntuarás el ajuste del ICP en el CRM", placeholder: "ej., Campo personalizado 'Puntuación ICP' (1-3): 3=ajuste perfecto, 2=ajuste parcial, 1=incierto. Priorizar 3s en el Sprint.", type: "textarea" }
]
},
{
id: "sprint-list",
title: "Lista del Sprint (20-50 prospectos objetivo)",
fields: [
{ id: "source", label: "¿Dónde encuentras los 20-50 prospectos para el Sprint?", placeholder: "ej., Apollo.io con filtros: [cargo] en empresas de [industria] con [tamaño] en [región]. Exportar los 50 mejores, revisar manualmente, ingresar los 30 mejores en HubSpot.", type: "textarea" },
{ id: "quality-check", label: "¿Cómo verificas la calidad del prospecto antes de agregar al Sprint?", placeholder: "ej., Verificación manual de LinkedIn: ¿el cargo coincide con mi ICP? ¿Hay señales recientes de compra (contratación, expansión)?", type: "text" }
]
}
]}
/>

## Paso 4: El Agente de IA para Alcance

¿Cómo usará IA para escalar el alcance sin sacrificar la personalización?

<TemplateBuilder
title="Plan del Agente de IA para Alcance"
persistKey="capstone-L3-agent"
sections={[
{
id: "personalization",
title: "Personalización a Escala con IA",
fields: [
{ id: "tool", label: "Herramienta de IA que usarás para personalización", placeholder: "ej., Clay + GPT-4 para generar aperturas de primera línea. Apollo AI para sugerencias de personalización de secuencias.", type: "text" },
{ id: "prompt", label: "Instrucción de IA que genera tu primera línea personalizada", placeholder: "ej., 'Dado este perfil de LinkedIn: [perfil], escribe una primera línea de email de 1 oración que (1) demuestre que revisé su trabajo específico, (2) conecte a [problema del ICP], (3) suene como un par, no como un vendedor. 15-25 palabras.'", type: "textarea" },
{ id: "review", label: "Tu proceso de revisión — ¿cómo verificas la calidad de IA?", placeholder: "ej., Revisar manualmente cada primera línea generada por IA antes de ingresar a la secuencia. Umbral de calidad: la apertura debe sonar como yo, no como un bot.", type: "textarea" }
]
}
]}
/>

## La Comprobación de Integración de Entregabilidad

Antes de lanzar cualquier secuencia, verifica que tu infraestructura de email esté configurada correctamente.

<InteractiveChecklist
title="Comprobación de Entregabilidad del Email"
persistKey="capstone-L3-deliverability"
items={[
"Dominio de envío separado configurado (no enviando desde tu dominio principal)",
"SPF, DKIM, y DMARC configurados en el dominio de envío",
"Calentamiento del dominio completo (al menos 2-3 semanas de calentamiento gradual antes de escalar el volumen)",
"Puntuación de reputación del dominio verificada (objetivo: >90 en Instantly, Lemlist, u otra herramienta)",
"Volumen de envío diario dentro de los límites seguros (máximo 50 emails/día por dominio durante el primer mes)",
"Configuración de seguimiento de desuscripción habilitada",
"Texto del email verificado — sin palabras desencadenantes de spam, sin imágenes ni archivos adjuntos en el Email 1"
]}
/>

## La Comprobación de Integración del Stack

¿Están conectadas todas las piezas de tu stack?

<InteractiveChecklist
title="Comprobación de Integración del Stack"
persistKey="capstone-L3-integration"
items={[
"Herramienta de secuencias → CRM: las respuestas se registran automáticamente como actividad de contacto",
"Herramienta de secuencias → Notificación de Slack: cuando un prospecto responde, tú recibes una alerta",
"Herramienta de enriquecimiento → CRM: los nuevos prospectos se enriquecen automáticamente antes de ingresar a la secuencia",
"CRM → Hoja de Cálculo: el pipeline se puede exportar para revisión semanal",
"Calendly (u herramienta de programación) → CRM: las reuniones reservadas crean automáticamente actividad de deal"
]}
/>

## Resumen del Sistema de Alcance

<TemplateBuilder
title="Resumen del Sistema de Alcance del Capstone"
persistKey="capstone-L3-summary"
sections={[
{
id: "system-summary",
title: "Mi Sistema de Alcance en Resumen",
fields: [
{ id: "sequence-status", label: "Estado de la secuencia (¿está completa y cargada en la herramienta?)", placeholder: "ej., Secuencia de 5 emails cargada en Instantly. Primera líneas personalizadas para los primeros 30 prospectos listas.", type: "text" },
{ id: "crm-status", label: "Estado del CRM (¿etapas definidas, prospectos cargados?)", placeholder: "ej., HubSpot con 7 etapas definidas. 35 prospectos del Sprint cargados con puntuaciones de ICP.", type: "text" },
{ id: "deliverability-status", label: "Estado de entregabilidad (¿listo para enviar?)", placeholder: "ej., Dominio de envío calentado durante 3 semanas. Puntuación 94. Listo para empezar en 50/día.", type: "text" },
{ id: "launch-date", label: "Fecha de lanzamiento del Sprint (¿cuándo empiezas?)", placeholder: "ej., Lunes 20 de enero — 30 días de alcance activo termina el 18 de febrero.", type: "text" }
]
}
]}
/>

<RangeSlider
  label="¿Qué tan listo está tu sistema de alcance para lanzar el Sprint?"
  min={1}
  max={10}
  lowLabel="Necesita trabajo significativo"
  highLabel="Listo para lanzar esta semana"
  persistKey="capstone-L3-sequence-confidence"
/>

## Tus Elementos de Acción Antes de la Lección 4

<InteractiveChecklist
title="Elementos de Acción de la Lección 3"
persistKey="capstone-L3-actions"
items={[
"Escribe tu secuencia de 5 emails completa usando el TemplateBuilder arriba",
"Carga la secuencia en tu herramienta de envío de emails con todos los tiempos y pasos configurados",
"Completa la auditoría del CRM — arregla los campos faltantes en los 20 prospectos más calientes",
"Configura las etapas del pipeline con criterios de entrada claros",
"Construye y carga tu lista de prospectos del Sprint (20-50 prospectos objetivo con puntuaciones de ICP)",
"Ejecuta la comprobación de entregabilidad — no lances hasta que todos los puntos estén marcados",
"Verifica la integración del stack — las respuestas llegan al CRM y a las notificaciones de Slack"
]}
/>

## Qué Sigue

En la **Lección 4**, ensamblarás tu sistema de ventas: descubrimiento, propuestas y cierre. Saldrás con un guion de descubrimiento documentado, un marco de manejo de objeciones, y una plantilla de propuesta — los sistemas que convierten las reuniones reservadas por tu sistema de alcance en clientes reales.
