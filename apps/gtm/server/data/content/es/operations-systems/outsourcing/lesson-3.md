---
title: "POE 1: Clasificación de Bandeja de Entrada (Lead/Cliente/Admin/Ruido)"
duration: "50 min"
track: "Operations & Systems"
course: "Course 43: Outsourcing & VAs"
lesson: 3
---

## Por Qué la Clasificación de Bandeja de Entrada Es el Primer POE que Debes Escribir

Tu bandeja de entrada es donde la oportunidad de ingresos y el caos administrativo conviven en el mismo espacio. Una consulta de lead puede estar tres correos debajo de una factura de proveedor y nunca recibir respuesta porque te quedaste sin energía clasificando todo lo anterior.

La clasificación de bandeja de entrada es la tarea de mayor apalancamiento para delegar primero — y la que más directamente protege los ingresos. Un AV que puede clasificar de manera confiable tu bandeja de entrada en cuatro categorías y marcar leads inmediatamente vale su costo mensual en la primera semana.

El tiempo de respuesta a nuevos leads es una de las variables más importantes en las ventas B2B. Las investigaciones muestran consistentemente que los leads contactados dentro de una hora tienen 7 veces más probabilidades de interactuar que los contactados después de una hora, y dramáticamente más probabilidades de interactuar que los leads alcanzados después de 24 horas. Tu AV ejecutando el POE de clasificación de bandeja de entrada significa que los leads se marcan en el momento en que llegan — no después de que hayas despejado 40 correos más.

<InsightCard icon="📬" title="El Problema de la Bandeja de Entrada">
El fundador solo promedio recibe 50-150 correos por día. Aproximadamente el 30-40% de esos son ruido (spam, boletines, irrelevantes) incluso después de los filtros estándar. Sin un sistema de clasificación, cada correo permanece en la misma cola — los leads compiten por atención con notificaciones de LinkedIn y facturas de proveedores. Un AV con un POE claro resuelve esto en 15-20 minutos por día.
</InsightCard>

## Las Cuatro Categorías

Cada correo entrante pertenece exactamente a una categoría. El trabajo de tu AV es tomar esa decisión de clasificación de manera rápida y precisa:

<SlideNavigation>
<Slide title="Categoría 1: Lead">

**Definición:** Un mensaje de alguien que es o podría convertirse en un cliente de pago.

**Indicadores:**

- El remitente menciona tu producto, servicio o precios
- El remitente solicita una llamada, demo o propuesta
- El remitente proviene de una empresa que coincide con tu Perfil de Cliente Ideal (PCI)
- El remitente fue referido por un cliente o socio actual
- El remitente responde a alcance previo con interés

**Subcategorías de leads:**

- **Alta prioridad:** Interés explícito, pregunta sobre precios, solicitud de reunión → Marcar inmediatamente → El fundador responde dentro de 4 horas
- **Baja prioridad:** Interés general, curiosidad temprana, inbound de empresa desconocida adyacente al PCI → Etiquetar en CRM → Agregar a secuencia de nurture

**Qué debe hacer tu AV:** Crear o actualizar un contacto en el CRM, registrar el correo como actividad y marcar para tu atención con una nota: "Lead: [razón de clasificación]."

</Slide>

<Slide title="Categoría 2: Cliente">

**Definición:** Un mensaje de alguien que ya te paga.

**Indicadores:**

- El correo del remitente coincide con un dominio de cliente conocido en tu CRM
- El remitente hace referencia a un proyecto, suscripción o compromiso existente
- El remitente fue cerrado previamente (el CRM muestra etapa "Cliente" o "Ganado Cerrado")

**Qué debe hacer tu AV:** Registrar en el CRM contra el registro del cliente. Si es una pregunta de soporte o comentario, enrutar hacia ti con contexto. Si es una solicitud de programación, manejar directamente usando tu enlace de Calendly.

</Slide>

<Slide title="Categoría 3: Administración">

**Definición:** Comunicación interna, operacional o de proveedor que requiere acción pero no atención de ventas.

**Indicadores:**

- Facturas, recibos o notificaciones de facturación
- Notificaciones de herramientas de software (correos de Slack, alertas de GitHub, invitaciones de calendario)
- Actualizaciones de equipo o contratistas
- Comunicaciones de socios o proveedores

**Qué debe hacer tu AV:** Archivar en la etiqueta/carpeta apropiada. Si el correo requiere acción (pagar esta factura, aprobar este entregable), crear una tarea con fecha límite y marcar para tu revisión administrativa semanal.

</Slide>

<Slide title="Categoría 4: Ruido">

**Definición:** Correos que no requieren acción y no agregan valor.

**Indicadores:**

- Boletines a los que estás suscrito pero no lees
- Spam de alcance frío (especialmente si es claramente automatizado y de baja calidad)
- Correos promocionales de herramientas que usas
- Correos de notificación de redes sociales

**Qué debe hacer tu AV:** Archivar o eliminar inmediatamente. No se necesita registro en el CRM. Si un boletín parece valioso, moverlo a una carpeta "Leer Después" en lugar de eliminarlo.

</Slide>
</SlideNavigation>

## El Árbol de Decisión de Clasificación

Tu AV debe seguir esta lógica para cada correo entrante:

<DecisionTree
title="Árbol de Decisión de Clasificación de Bandeja de Entrada"
persistKey="outsourcing-L3-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿El remitente es un cliente conocido (encontrado en el CRM como 'Cliente' o 'Ganado Cerrado')?",
choices: [
{ label: "Sí — cliente conocido", nextNodeId: "customer" },
{ label: "No — no está en el CRM o no es un cliente", nextNodeId: "check-lead" }
]
},
{
id: "customer",
content: "Categoría: CLIENTE. Registrar correo en el registro del CRM. ¿Requiere respuesta del fundador?",
choices: [
{ label: "Sí — necesita atención del fundador", nextNodeId: "customer-flag" },
{ label: "No — programación o pregunta rutinaria", nextNodeId: "customer-handle" }
]
},
{
id: "customer-flag",
content: "Marcar para el fundador con nota de contexto. Registrar correo completo en el CRM. AV terminado.",
isTerminal: true,
outcome: "positive"
},
{
id: "customer-handle",
content: "AV maneja con plantilla aprobada (ej., enlace de Calendly, respuesta estándar). Registrar en CRM. Listo.",
isTerminal: true,
outcome: "positive"
},
{
id: "check-lead",
content: "¿El remitente está preguntando sobre tu producto, servicio o precios? ¿O solicita una reunión?",
choices: [
{ label: "Sí — interés en producto/precio/reunión", nextNodeId: "lead-high" },
{ label: "No — sin señal explícita de lead", nextNodeId: "check-icp" }
]
},
{
id: "lead-high",
content: "Categoría: LEAD (Alta Prioridad). Crear contacto en CRM inmediatamente. Marcar para el fundador con objetivo de respuesta de 4 horas. Anotar razón de clasificación.",
isTerminal: true,
outcome: "positive"
},
{
id: "check-icp",
content: "¿El remitente proviene de una empresa que coincide con el PCI (verificar brevemente LinkedIn/sitio web)?",
choices: [
{ label: "Sí — coincide con PCI, aunque sin interés explícito", nextNodeId: "lead-low" },
{ label: "No — poco claro o no es PCI", nextNodeId: "check-admin" }
]
},
{
id: "lead-low",
content: "Categoría: LEAD (Baja Prioridad). Crear contacto en CRM. Agregar etiqueta de nurture. Marcar para revisión semanal en lugar de respuesta inmediata.",
isTerminal: true,
outcome: "positive"
},
{
id: "check-admin",
content: "¿Es una factura, correo de proveedor, notificación de herramienta o comunicación interna?",
choices: [
{ label: "Sí — administrativo u operacional", nextNodeId: "admin" },
{ label: "No — poco claro o promocional", nextNodeId: "noise" }
]
},
{
id: "admin",
content: "Categoría: ADMINISTRACIÓN. Archivar en carpeta apropiada. Si requiere acción, crear tarea con fecha límite. Marcar para revisión administrativa semanal si es necesario.",
isTerminal: true,
outcome: "neutral"
},
{
id: "noise",
content: "Categoría: RUIDO. Archivar o eliminar. No se necesita registro en CRM. Si no estás seguro, etiquetar como 'Incierto' y marcar para revisión del fundador.",
isTerminal: true,
outcome: "neutral"
}
]}
/>

## Construyendo Tu POE de Clasificación

Ahora construyamos el documento real que tu AV seguirá. Un buen POE tiene seis componentes: Propósito, Disparador, Pasos, Reglas de Decisión, Plantillas y Escalación.

<TemplateBuilder
title="Tu POE de Clasificación de Bandeja de Entrada"
persistKey="outsourcing-L3-sop"
sections={[
{
id: "purpose",
title: "Propósito y Disparador",
fields: [
{ id: "purpose", label: "Propósito del POE", placeholder: "ej., Garantizar que cada correo entrante se categorice dentro de las 2 horas de llegada, los leads se marquen inmediatamente y los elementos administrativos se acción o archiven.", type: "textarea" },
{ id: "trigger", label: "Cuándo Ejecutar", placeholder: "ej., Cada mañana (9 AM) y cada tarde (2 PM). Verificar la bandeja de entrada en estos dos momentos diarios.", type: "text" },
{ id: "time", label: "Presupuesto de Tiempo por Sesión", placeholder: "ej., 15-20 minutos por sesión, 30-40 minutos en total por día", type: "text" }
]
},
{
id: "lead-rules",
title: "Reglas de Clasificación de Leads",
fields: [
{ id: "lead-keywords", label: "Palabras Clave que Señalan un Lead", placeholder: "ej., 'precio', 'demo', 'llamada', 'interesado en', 'cómo funciona', '¿pueden ayudarme?'", type: "textarea" },
{ id: "icp-domains", label: "Dominios o Características de Empresas PCI Conocidas", placeholder: "ej., Empresas SaaS B2B con 10-100 empleados, agencias de marketing, marcas de e-commerce", type: "textarea" },
{ id: "lead-response-time", label: "Objetivo de Tiempo de Respuesta a Leads", placeholder: "ej., Leads de alta prioridad: el fundador responde dentro de 4 horas. Baja prioridad: revisado en reunión semanal de pipeline.", type: "text" }
]
},
{
id: "customer-rules",
title: "Identificación de Clientes",
fields: [
{ id: "customer-domains", label: "Dominios de Clientes Conocidos (o dónde verifica el AV)", placeholder: "ej., Verificar CRM primero. En caso de duda, buscar el correo del remitente en HubSpot antes de clasificar.", type: "textarea" },
{ id: "customer-routing", label: "Cómo se Enrutan los Correos de Clientes", placeholder: "ej., Preguntas de soporte → marcar para fundador. Solicitudes de programación → AV envía enlace de Calendly. Facturas → registrar y archivar.", type: "textarea" }
]
},
{
id: "escalation",
title: "Protocolo de Escalación",
fields: [
{ id: "unsure", label: "Cuándo Escalar (Casos Inciertos)", placeholder: "ej., Si la clasificación no es clara después de 2 minutos de investigación, etiquetar como 'Incierto' y marcar para el fundador con el correo completo citado.", type: "textarea" },
{ id: "escalate-how", label: "Cómo Escalar", placeholder: "ej., Enviar mensaje de Slack en #canal-av con: 'Escalación necesaria: [remitente] — [razón de incertidumbre]'", type: "text" }
]
}
]}
/>

## Plantillas de Respuesta para Escenarios Comunes

Tu AV debe tener respuestas preaprobadas que puede enviar directamente — esto elimina el cuello de botella de esperar tu aprobación para comunicaciones rutinarias.

<ProgressiveReveal title="Plantillas de Respuesta del AV" persistKey="outsourcing-L3-templates">

<RevealSection title="Plantilla 1: Acusar Recibo a un Lead Entrante">

**Cuándo usar:** Un lead envía un correo de consulta. Necesitas responder rápidamente mientras el lead está caliente, pero el fundador todavía no lo ha visto. El AV envía esto para ganar tiempo.

---

Asunto: Re: [Asunto Original]

Hola [Nombre],

Gracias por comunicarte — pasé tu mensaje a [Nombre del Fundador] y estará en contacto en breve.

Mientras tanto, si quisieras reservar una llamada breve directamente, puedes encontrar un horario aquí: [enlace de Calendly]

Con gusto nos conectamos pronto.

[Equipo de Nombre del Fundador]

---

**Instrucciones para el AV:** Usa esta plantilla solo después de haber marcado el correo al fundador. Nunca prometas un plazo de respuesta específico que no hayas confirmado.

</RevealSection>

<RevealSection title="Plantilla 2: Programación de Reuniones para Clientes Existentes">

**Cuándo usar:** Un cliente existente solicita programar una llamada, revisión o conversación.

---

Asunto: Re: [Asunto Original]

Hola [Nombre],

¡Con mucho gusto coordinamos un horario! Aquí está el enlace al calendario de [Nombre del Fundador] — siéntete libre de elegir el horario que mejor funcione para ti:

[enlace de Calendly]

¡Espero con ansias la conversación!

[Equipo de Nombre del Fundador]

---

**Instrucciones para el AV:** Después de enviar, registrar el correo en el CRM contra el registro del cliente y anotar "Reunión solicitada — enlace de Calendly enviado."

</RevealSection>

<RevealSection title="Plantilla 3: Enviar Información a un Prospecto">

**Cuándo usar:** Un prospecto pide materiales, casos de éxito o información general sobre tu oferta. El fundador ha preaprobado un conjunto específico de material de apoyo para esto.

---

Asunto: Re: [Asunto Original]

Hola [Nombre],

¡Gracias por tu interés! Quería asegurarme de que tuvieras los recursos correctos para revisar:

[Insertar enlace al material preaprobado — caso de éxito, presentación, etc.]

[Nombre del Fundador] hará seguimiento contigo [plazo, si aplica]. Mientras tanto, si tienes preguntas específicas, no dudes en responder aquí.

Saludos,

[Equipo de Nombre del Fundador]

---

**Instrucciones para el AV:** Solo enviar material que haya sido preaprobado por el fundador. Si el prospecto pide algo que no está en la lista aprobada, escalar.

</RevealSection>

</ProgressiveReveal>

## Control de Calidad: Verificando la Precisión de Clasificación de Tu AV

Un nuevo AV cometerá errores, especialmente en las semanas uno y dos. Tu trabajo es detectar errores temprano con verificaciones por muestreo en lugar de revisar cada correo.

<InteractiveChecklist
title="Checklist de Control de Calidad Semanal de Clasificación"
persistKey="outsourcing-L3-qa"
items={[
"Revisar 10 correos aleatorios que tu AV categorizó esta semana — verificar precisión de clasificación",
"Verificar CRM: ¿todos los leads entrantes de esta semana están registrados como contactos?",
"Verificar que las etiquetas 'Incierto' fueron escaladas y manejadas (no quedan correos inciertos sin resolver)",
"Verificar por muestreo 3 correos en la carpeta 'Ruido' o 'Archivo' — ¿algo importante fue archivado ahí?",
"Revisar las plantillas de respuesta del AV enviadas esta semana — ¿suenan bien? ¿Algún problema de tono?",
"Verificar que ningún correo de Lead quedó sin marcar por más de 4 horas"
]}
/>

## Entrena a Tu AV en Tu Contexto Específico

El árbol de decisión anterior es universal, pero tu AV necesita conocer TUS especificidades para clasificar con precisión desde el primer día:

<RewriteExercise
title="Documento de Instrucción para el AV"
persistKey="outsourcing-L3-rewrite"
original="Por favor clasifica mi bandeja de entrada. Los leads deben marcarse. Las cosas administrativas deben archivarse. El ruido puede eliminarse. Avísame si no estás seguro de algo."
hint="Un documento de instrucción para el AV debe dar suficientes detalles para que el AV pueda clasificar el 90%+ de los correos sin preguntarte. Incluye: quién es tu PCI, dominios de clientes conocidos, señales de lead específicas para tu negocio y cómo luce un caso 'Incierto'."
expertRewrite="Estarás clasificando mi bandeja de entrada dos veces al día (9 AM y 2 PM). Esto es lo que buscar: LEADS — cualquiera que pregunte sobre [servicio específico], precios de [oferta], o que solicite una llamada/demo. También marca a cualquiera de empresas que coincidan con este perfil: [descripción del PCI]. Los dominios de clientes conocidos incluyen: [lista]. ADMINISTRACIÓN — facturas de [herramientas], actualizaciones de contratistas, notificaciones de calendario. RUIDO — boletines (cualquier cosa de Substack, beehiiv), alcance frío que claramente está automatizado, correos promocionales de herramientas. Si ves un correo y no estás seguro en 2 minutos, etiquétalo como 'Incierto' y envíame un mensaje en Slack. Prefiero revisar 5 correos inciertos a perder un lead."
criteria={[
"Define las características del PCI con suficiente claridad para que un nuevo AV las reconozca",
"Lista palabras clave o frases específicas de señales de lead",
"Proporciona ejemplos de dominios de clientes conocidos",
"Da orientación de escalación clara para casos inciertos",
"Establece una expectativa de tiempo de respuesta para leads de alta prioridad"
]}
/>

## Práctica: Clasifica Estos Escenarios Reales de Bandeja de Entrada

<TimedChallenge
title="Ejercicio de Velocidad de Clasificación"
persistKey="outsourcing-L3-timed"
timeLimit={120}
items={[
{ id: "1", prompt: "Correo de 'sara@acmecorp.com' con asunto: 'Pregunta sobre tus servicios de consultoría'", correctAnswer: "lead", explanation: "Esto es un Lead — consulta explícita sobre tus servicios de un remitente desconocido. Crear contacto en CRM y marcar para el fundador inmediatamente." },
{ id: "2", prompt: "Correo de Stripe: 'Tu factura mensual está lista'", correctAnswer: "admin", explanation: "Administración — notificación de facturación. Archivar bajo facturas/recibos. No se necesita acción en el CRM." },
{ id: "3", prompt: "Correo de 'juan@clienteactual.com' con asunto: '¿Podemos mover la llamada del martes?'", correctAnswer: "customer", explanation: "Cliente — solicitud de programación de cliente existente. El AV maneja enviando enlace de Calendly y registrando en el CRM." },
{ id: "4", prompt: "Correo de Mailchimp: '5 consejos para tu próxima campaña de correo'", correctAnswer: "noise", explanation: "Ruido — contenido promocional de una herramienta que usas. Archivar inmediatamente, no se necesita acción." },
{ id: "5", prompt: "Correo de 'info@startupdesconocida.io' con asunto: 'Oportunidad de asociación'", correctAnswer: "lead", explanation: "Potencialmente Lead — consulta de asociación entrante. Verificar en LinkedIn si la empresa coincide con el PCI. Si no está claro, etiquetar como Lead de Baja Prioridad y marcar para revisión semanal." }
]}
/>

<InsightCard icon="🎯" title="El Objetivo: 90% de Precisión para la Semana 4">
Un nuevo AV no clasificará perfectamente en la semana uno — y eso es esperado. Tu trabajo durante la incorporación es detectar errores temprano y actualizar el POE con ejemplos específicos. Para la semana cuatro, apunta al 90%+ de precisión en todas las categorías. Rastrea esto con tu verificación semanal de control de calidad por muestreo.
</InsightCard>

<InteractiveChecklist
title="Tus Acciones Antes de la Lección 4"
persistKey="outsourcing-L3-actions"
items={[
"Completa el POE de Clasificación de Bandeja de Entrada usando el TemplateBuilder arriba",
"Escribe tus Reglas de Clasificación de Leads con palabras clave específicas para tu negocio",
"Lista todos los dominios de clientes conocidos que tu AV debe reconocer inmediatamente",
"Finaliza tus plantillas de respuesta del AV (acusar recibo a leads, programar, enviar material)",
"Configura un sistema de etiquetas/carpetas en Gmail o Outlook para la categorización del AV",
"Lee la Lección 4 para escribir el POE 2: Actualizaciones del CRM"
]}
/>

## Lo Que Sigue

En la **Lección 4**, escribirás tu POE de Actualizaciones del CRM — el documento que convierte a tu AV en un gestor diario del pipeline. Definirás exactamente cómo tu AV actualiza las etapas de negocios, verifica las próximas acciones y mantiene la calidad de los datos del CRM. Al final de la Lección 4, tu pipeline nunca estará desactualizado de nuevo.
