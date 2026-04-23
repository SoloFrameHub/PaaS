---
title: "Documentación Final del Sistema"
duration: "60 min"
track: "Operations & Systems"
course: "Course 48: Sales System Capstone"
lesson: 11
---

## El Artefacto que lo Une Todo

Has construido mucho durante esta academia. Un ICP detallado. Una propuesta de valor diferenciada. Secuencias de prospección probadas. Un proceso de descubrimiento documentado. Un sistema de gestión del CRM. Una cadencia de métricas. Quizás algunos automatizaciones de IA.

Cada uno de estos artefactos existe en algún lugar — en Notion, en una hoja de cálculo de Google, en un documento, en tu cabeza. El trabajo de la Lección 11 es consolidarlos en un único Sistema de Adquisición de Clientes documentado.

Este documento hace tres cosas: te da claridad sobre cómo funciona realmente tu sistema (qué es oficial vs. qué estás improvisando), crea el documento de incorporación para tu primera contratación de ventas, y produce el análisis de sistema que los asesores, inversores y socios estratégicos necesitan para evaluar tu negocio.

<InsightCard icon="📁" title="Los Seis Documentos del Sistema Completo">
Tu Sistema de Adquisición de Clientes completo tiene seis documentos:
1. El Perfil del Cliente Ideal (PCI)
2. El Sistema de Posicionamiento y Mensajes
3. El Manual de Prospección y Alcance
4. El Manual de Descubrimiento y Cierre
5. El Sistema de Éxito del Cliente
6. El Panel de Métricas y Revisión
</InsightCard>

## Los Seis Documentos del Sistema

<TemplateBuilder
title="Documento 1: Perfil del Cliente Ideal"
persistKey="capstone-L11-icp"
sections={[
{
id: "firmographic",
title: "Perfil Firmográfico",
fields: [
{ id: "title", label: "Título/Rol del Comprador Principal", placeholder: "p. ej., Director de Operaciones en empresas SaaS B2B", type: "text" },
{ id: "company", label: "Tipo y Tamaño de Empresa", placeholder: "p. ej., SaaS B2B, 20-100 empleados, $1M-$10M ARR", type: "text" },
{ id: "pain", label: "Punto de Dolor Específico (cuantificado)", placeholder: "p. ej., Perdiendo 8+ horas/semana en procesos manuales de [categoría específica]", type: "text" },
{ id: "signal", label: "Señal de Compra / Indicador de Presupuesto", placeholder: "p. ej., Recién contrató a un jefe de ventas, recibió Serie A, usando [herramienta competidora]", type: "text" }
]
},
{
id: "psychographic",
title: "Perfil Psicográfico",
fields: [
{ id: "motivation", label: "¿Qué motiva al comprador a actuar?", placeholder: "p. ej., Miedo a perder ante la competencia que ya automatizó este proceso", type: "text" },
{ id: "objections", label: "Objeciones más comunes", placeholder: "p. ej., 'Ya tenemos algo para esto' / 'No es el momento' / 'Es demasiado caro'", type: "textarea" }
]
}
]}
/>

<TemplateBuilder
title="Documento 2: Sistema de Posicionamiento y Mensajes"
persistKey="capstone-L11-positioning"
sections={[
{
id: "core",
title: "Posicionamiento Central",
fields: [
{ id: "statement", label: "Declaración de Transformación", placeholder: "p. ej., 'Ayudo a [ICP específico] a pasar de [estado actual doloroso] a [resultado deseado] en [plazo] sin [objeción/miedo común]'", type: "textarea" },
{ id: "proof", label: "Prueba Principal (caso de estudio más relevante)", placeholder: "p. ej., '[Tipo de cliente] logró [métrica específica] en [plazo]'", type: "text" },
{ id: "differentiator", label: "Diferenciador Clave", placeholder: "¿Por qué tú y no un competidor? Una razón específica y verificable.", type: "text" }
]
}
]}
/>

<TemplateBuilder
title="Documento 3: Manual de Prospección y Alcance"
persistKey="capstone-L11-prospecting"
sections={[
{
id: "channels",
title: "Canales y Volúmenes",
fields: [
{ id: "primary", label: "Canal Primario + Volumen Semanal", placeholder: "p. ej., Correo frío vía Apollo: 50 correos/semana a [filtros de ICP específicos]", type: "text" },
{ id: "secondary", label: "Canal Secundario + Volumen Semanal", placeholder: "p. ej., LinkedIn: 3 publicaciones/semana + 10 DMs a interactuantes", type: "text" }
]
},
{
id: "sequence",
title: "Secuencia de Alcance",
fields: [
{ id: "email1", label: "Correo 1 (Día 1) — estructura clave", placeholder: "p. ej., Primera línea personalizada + encuadre del problema + punto de prueba + CTA de baja fricción", type: "text" },
{ id: "followup", label: "Protocolo de Seguimiento", placeholder: "p. ej., Correo 2 (Día 3): compartir perspectiva. Correo 3 (Día 7): caso de estudio. Correo 4 (Día 14): anticipar objeción. Correo 5 (Día 21): ruptura limpia.", type: "textarea" }
]
}
]}
/>

<TemplateBuilder
title="Documento 4: Manual de Descubrimiento y Cierre"
persistKey="capstone-L11-discovery-close"
sections={[
{
id: "discovery",
title: "Marco de Descubrimiento",
fields: [
{ id: "questions", label: "Preguntas clave de descubrimiento (5-7 preguntas)", placeholder: "Lista tus preguntas de descubrimiento más importantes en orden", type: "textarea" },
{ id: "qualify", label: "Criterios de calificación para avanzar a propuesta", placeholder: "¿Qué debe ser verdad para que envíes la propuesta?", type: "textarea" }
]
},
{
id: "close",
title: "Proceso de Cierre",
fields: [
{ id: "proposal", label: "Formato y componentes de la propuesta", placeholder: "p. ej., Propuesta de una página: problema, solución, entregables, cronograma, inversión", type: "text" },
{ id: "closing", label: "Protocolo de cierre", placeholder: "¿Cómo solicitas la decisión y manejas los pasos finales?", type: "textarea" }
]
}
]}
/>

<TemplateBuilder
title="Documento 5: Sistema de Éxito del Cliente"
persistKey="capstone-L11-customer-success"
sections={[
{
id: "onboarding",
title: "Proceso de Incorporación",
fields: [
{ id: "day30", label: "Hito del Día 30 (primera victoria)", placeholder: "¿Qué resultado específico debería lograr el cliente en los primeros 30 días?", type: "text" },
{ id: "checkpoints", label: "Puntos de contacto de los primeros 90 días", placeholder: "p. ej., Check-in del Día 7, revisión del Día 30, revisión del Día 90", type: "textarea" }
]
},
{
id: "retention",
title: "Sistema de Retención",
fields: [
{ id: "health", label: "Métricas de salud del cliente que rastreo", placeholder: "p. ej., Frecuencia de uso, NPS, respuesta a los puntos de contacto", type: "text" },
{ id: "expansion", label: "Proceso de expansión", placeholder: "¿Cuándo y cómo inicias conversaciones de expansión?", type: "text" }
]
}
]}
/>

<TemplateBuilder
title="Documento 6: Panel de Métricas y Revisión"
persistKey="capstone-L11-metrics"
sections={[
{
id: "leading",
title: "Métricas Leading (Revisión Semanal)",
fields: [
{ id: "l1", label: "Métrica leading 1 + objetivo semanal", placeholder: "p. ej., Correos enviados: objetivo 50/semana", type: "text" },
{ id: "l2", label: "Métrica leading 2 + objetivo semanal", placeholder: "p. ej., Tasa de respuesta: objetivo 7%+", type: "text" },
{ id: "l3", label: "Métrica leading 3 + objetivo semanal", placeholder: "p. ej., Reuniones reservadas: objetivo 3+/semana", type: "text" }
]
},
{
id: "lagging",
title: "Métricas Lagging (Revisión Mensual)",
fields: [
{ id: "lag1", label: "Métrica lagging 1 + objetivo mensual", placeholder: "p. ej., Nuevos clientes: objetivo 2/mes", type: "text" },
{ id: "lag2", label: "Métrica lagging 2 + objetivo mensual", placeholder: "p. ej., Nuevos ingresos: objetivo $8K MRR/mes", type: "text" }
]
}
]}
/>

## Lo que Sigue

En la **Lección 12**, presentarás tu Sistema de Adquisición completo en el formato de presentación de certificación. Esta es tu evaluación final del Capstone — la demostración de que has construido un sistema completo, no solo completado cursos individuales.
