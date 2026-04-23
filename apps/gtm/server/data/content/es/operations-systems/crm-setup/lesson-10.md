---
title: "Tu Lista de Verificación de Configuración del CRM"
duration: "45 min"
track: "Operaciones y Sistemas"
course: "Curso 40: Configuración Avanzada de CRM"
lesson: 10
---

Has pasado nueve lecciones aprendiendo la filosofía del CRM, comparando herramientas, diseñando pipelines y construyendo esquemas listos para IA. Ahora es el momento de **configurarlo de verdad**.

Esto no es un descanso victorioso. Este es el sprint de implementación que separa a los fundadores que "aprendieron sobre CRMs" de los fundadores que **tienen un CRM funcional que impulsa ingresos**.

Al final de esta lección, tendrás un plan de configuración personalizado de 7 días. Verificarás cada integración. Probarás tu esquema con datos reales. Y puntuarás tu preparación para IA para saber exactamente qué pueden construir encima de tu fundación el Curso 41 (Análisis) y el Curso 27 (Agentes de IA).

## La Verificación de la Realidad de la Configuración

<InsightCard icon="⚠️" title="La Ventana de 48 Horas">
Si no configuras tu CRM dentro de las 48 horas de haberlo elegido, probablemente nunca lo harás. La trampa de "lo hago la semana que viene" ha arruinado más proyectos de CRM que las malas elecciones de herramientas.
</InsightCard>

Esto es lo que realmente ocurre cuando los fundadores en solitario demoran la configuración del CRM:

1. **Semana 1**: "Lo configuro este fin de semana"
2. **Semana 2**: "Estoy demasiado ocupado con el trabajo de clientes"
3. **Semana 3**: "Quizás debería reconsiderar qué CRM usar"
4. **Semana 4**: De vuelta a hojas de cálculo y notas adhesivas

La investigación es clara: **la adopción del CRM cae un 60% por cada semana de retraso después de la decisión de compra**. Elegiste tu herramienta en la Lección 8. Tienes el esquema de la Lección 6. Tienes el pipeline de la Lección 4.

Ahora lo ejecutas.

<RangeSlider
  label="¿Qué tan listo estás para configurar tu CRM esta semana?"
  min={1}
  max={10}
  lowLabel="Todavía investigando"
  highLabel="Listo ahora"
  persistKey="crm-setup-L10-readiness"
/>

## El Sprint de 7 Días del CRM

Este no es un proyecto de "trabaja en él cuando tengas tiempo". Este es un **sprint estructurado** con hitos diarios. Cada día se construye sobre el anterior. Saltarte un día y todo se derrumba.

<SlideNavigation>
<Slide title="Día 1: Configuración de la Cuenta">

### Lo Que Estás Construyendo

- Cuenta del CRM creada y verificada
- Correo conectado para autenticación
- Perfil básico configurado
- Cualquier colaborador invitado (si aplica)

### Tiempo Requerido

30-45 minutos

### Paso a Paso

**Para HubSpot Free/Starter:**

1. Ve a hubspot.com/products/crm
2. Regístrate con tu correo de trabajo principal
3. Verifica el correo y completa el asistente de incorporación
4. Conecta Gmail/Outlook para sincronización de correo (Configuración → Integraciones → Correo)
5. Establece tu zona horaria y moneda (Configuración → General)

**Para Attio Plus:**

1. Ve a attio.com
2. Regístrate y elige el plan Plus ($29/mes)
3. Conecta Gmail/Outlook durante la incorporación
4. Importa contactos de fuentes existentes (CSV, Contactos de Google)
5. Configura los ajustes del espacio de trabajo

**Para Folk Standard:**

1. Ve a folk.app
2. Regístrate y elige Standard ($20/mes)
3. Instala la extensión de Chrome
4. Conecta Gmail
5. Importa los contactos iniciales desde LinkedIn/Gmail

**Para Close Startup:**

1. Ve a close.com
2. Regístrate en el plan Startup ($29/mes)
3. Conecta correo y calendario
4. Configura el número de llamadas (si usas el marcador integrado)
5. Configura las preferencias de notificación

**Para Pipedrive Essential:**

1. Ve a pipedrive.com
2. Regístrate en Essential ($14/mes)
3. Conecta correo vía BCC inteligente o sincronización
4. Establece moneda y zona horaria
5. Configura la aplicación móvil

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Resiste la tentación de explorar cada endpoint de la API el Día 1. Construirás integraciones el Día 6. Hoy es solo configuración de cuenta.
</ContextualNote>

</Slide>

<Slide title="Día 2: Configuración del Pipeline">

### Lo Que Estás Construyendo

Tu pipeline de 6 etapas con criterios de salida y automatizaciones basadas en etapas

### Tiempo Requerido

45-60 minutos

### El Pipeline Universal de 6 Etapas

Recuerda de la Lección 4:

1. **Lead** — Nuevo contacto, ajuste ICP confirmado, sin prospección aún
2. **Contactado** — Primer mensaje enviado, esperando respuesta
3. **Comprometido** — El prospecto respondió o mostró interés
4. **Reunión** — Llamada de descubrimiento o demo agendada/completada
5. **Propuesta** — Precios/términos/oferta enviados
6. **Ganado/Perdido** — Trato cerrado con la razón registrada

### Pasos de Configuración

**HubSpot:**

- Ve a Configuración → Objetos → Tratos → Pipelines
- Renombra el pipeline predeterminado o crea uno nuevo
- Añade 6 etapas con los nombres exactos de arriba
- Establece el % de probabilidad para cada etapa (Lead: 10%, Contactado: 20%, Comprometido: 40%, Reunión: 60%, Propuesta: 80%, Ganado: 100%, Perdido: 0%)
- Configura las propiedades requeridas por etapa (ej., la etapa Propuesta requiere "Fecha de Cierre" y "Monto")

**Attio:**

- Ve a Configuración → Listas y Pipelines
- Crea un nuevo pipeline
- Añade 6 etapas como estados
- Configura los disparadores de automatización por etapa (cubierto el Día 6)

**Pipedrive:**

- Ve a Configuración → Pipelines
- Edita el pipeline predeterminado o crea uno nuevo
- Añade 6 etapas con el % de probabilidad de cierre
- Establece la duración esperada por etapa (Lead: 7 días, Contactado: 3 días, Comprometido: 7 días, Reunión: 14 días, Propuesta: 7 días)

**Close:**

- Ve a Configuración → Pipelines
- Crea pipeline con 6 etapas
- Establece probabilidad y fecha de cierre esperada por etapa

**Folk:**

- Folk usa etiquetas en lugar de pipelines formales
- Crea 6 etiquetas: "Etapa: Lead", "Etapa: Contactado", etc.
- Actualizarás las etiquetas manualmente a medida que los tratos avancen

<ExampleCard label="Variante Creador/Coach">
Si ejecutas un embudo de inscripción, tus etapas pueden ser:

1. **Seguidor** — En audiencia, aún sin interacción
2. **Suscriptor** — Miembro de la lista de correo o comunidad
3. **Solicitante** — Completó la solicitud o consulta
4. **Llamada Agendada** — Llamada de descubrimiento/inscripción programada
5. **Inscrito** — Pagó y fue incorporado
6. **Ganado/Perdido** — Completó el programa o canceló

Configura estas en lugar de las etapas B2B.
</ExampleCard>

</Slide>

<Slide title="Día 3: Sincronización de Correo y Enriquecimiento">

### Lo Que Estás Construyendo

- Sincronización de correo bidireccional (correos enviados y recibidos registrados automáticamente)
- Automatización de enriquecimiento de contactos (nuevo contacto → autocompletar empresa, cargo, LinkedIn)

### Tiempo Requerido

60-90 minutos

### Configuración de Sincronización de Correo

**HubSpot:**

- Configuración → Integraciones → Correo → Conectar Gmail/Outlook
- Habilita "Registrar correos automáticamente" para todas las carpetas
- Establece preferencias de registro predeterminadas (registrar todo vs. selectivo)
- Instala la extensión de Chrome de HubSpot Sales para registro con un clic
- Prueba: envía un correo a ti mismo, verifica que aparece en la línea de tiempo

**Attio:**

- La sincronización de correo es automática después de conectar Gmail/Outlook el Día 1
- Ve a Configuración → Correo para configurar las reglas de sincronización
- Habilita "Crear contactos automáticamente desde correo" (opcional)
- Prueba: envía/recibe un correo con un contacto, verifica que se registra

**Pipedrive:**

- Configuración → Sincronización de Correo (requiere plan Advanced para sincronización completa)
- Si estás en Essential, usa BCC inteligente: Configuración → Personal → Correo → Dirección BCC
- Añade la dirección BCC a cada correo saliente (o usa el plugin de Gmail/Outlook)
- Prueba: envía un correo con BCC, verifica que aparece en la línea de tiempo del trato

**Close:**

- La sincronización de correo está integrada
- Configuración → Correo → Conectar bandeja de entrada
- Habilita el registro automático
- Prueba: envía correo vía la interfaz de Close, verifica que se registra

**Folk:**

- Instala la extensión de Chrome (hecho el Día 1)
- La extensión registra automáticamente los correos cuando los ves en Gmail
- No se necesita configuración adicional
- Prueba: abre un hilo de Gmail, verifica que la barra lateral de Folk muestra el contacto

### Automatización de Enriquecimiento

**Opción A: Enriquecimiento Nativo del CRM (HubSpot, Attio)**

HubSpot:

- Configuración → Propiedades → Propiedades de Contacto
- Habilita el autoenriquecimiento de "Dominio de empresa" y "Nombre de empresa"
- HubSpot completará automáticamente desde el dominio del correo

Attio:

- El enriquecimiento es automático para todos los contactos
- Configuración → Enriquecimiento para configurar qué campos se autocompletar
- Attio extrae de LinkedIn, Crunchbase, Clearbit

**Opción B: Integración con Apollo.io (Todos los CRMs)**

1. Regístrate en el nivel gratuito de Apollo.io (10K enriquecimientos/mes)
2. Ve a Integraciones → encuentra tu CRM
3. Conecta vía clave API (HubSpot, Pipedrive, Close) o Zapier (Folk, Attio)
4. Configura las reglas de enriquecimiento: nuevo contacto creado → búsqueda en Apollo → completar tamaño de empresa, industria, cargo, URL de LinkedIn
5. Prueba: crea un contacto solo con correo → verifica que el enriquecimiento se ejecuta

**Opción C: Receta Zapier/Make (Configuración Manual)**

Disparador: Nuevo contacto creado en CRM
Acción 1: Apollo.io "Buscar Persona" (requiere Apollo de pago o clave API)
Acción 2: Actualizar contacto del CRM con datos enriquecidos
Acción 3: (Opcional) Notificación en Slack si se detecta un contacto de alto valor

<TemplateBuilder
title="Mapeo de Campos de Enriquecimiento"
persistKey="crm-setup-L10-enrichment"
sections={[
{
id: "fields",
title: "Qué Campos Enriquecer",
fields: [
{ id: "company", label: "Nombre de Empresa", placeholder: "Autocompletar desde dominio del correo", type: "text" },
{ id: "role", label: "Cargo", placeholder: "ej., VP de Marketing", type: "text" },
{ id: "linkedin", label: "URL de LinkedIn", placeholder: "Encontrar perfil automáticamente", type: "text" },
{ id: "size", label: "Tamaño de Empresa", placeholder: "Número de empleados", type: "text" },
{ id: "industry", label: "Industria", placeholder: "ej., SaaS, Agencia", type: "text" }
]
}
]}
/>

</Slide>

<Slide title="Día 4: Despliegue del Esquema Listo para IA">

### Lo Que Estás Construyendo

El esquema de campos completo de la Lección 6, desplegado como propiedades personalizadas en tu CRM

### Tiempo Requerido

90-120 minutos (este es el día más largo)

### Recordatorio del Esquema

De la Lección 6, tu esquema listo para IA incluye:

**Campos de Contacto:**

- `icp_fit_score` (número 1-10)
- `lead_source` (lista desplegable: Outbound, Inbound, Referido, Evento, Contenido)
- `disc_type` (lista desplegable: D, I, S, C, Desconocido)
- `linkedin_url` (URL)
- `first_contact_date` (fecha)
- `engagement_score` (número, calculado)

**Campos de Trato:**

- `deal_priority` (lista desplegable: Caliente, Tibio, Frío)
- `competitor_mentioned` (selección múltiple: Competidor A, Competidor B, Ninguno)
- `champion_identified` (sí/no)
- `decision_timeline` (fecha)
- `loss_reason` (lista desplegable: Precio, Momento, Sin Presupuesto, Eligió Competidor, Ghosting)

**Campos de Eventos/Actividad:**

- `event_type` (lista desplegable: Correo Enviado, Correo Recibido, Llamada, Reunión, Nota)
- `event_outcome` (lista desplegable: Positivo, Neutral, Negativo)
- `next_action` (texto)
- `next_action_date` (fecha)

**Indicadores de Salud (Calculados o Manuales):**

- `days_since_last_contact` (número, calculado automáticamente)
- `avg_response_time_hours` (número)
- `engagement_trend` (lista desplegable: Al alza, Estable, A la baja)
- `meetings_held_count` (número)

### Crear Propiedades Personalizadas

**HubSpot:**

1. Configuración → Propiedades → Propiedades de Contacto → Crear Propiedad
2. Para cada campo de arriba:
   - Nombre interno: usa snake_case (ej., `icp_fit_score`)
   - Etiqueta: legible para humanos (ej., "Puntuación de Ajuste ICP")
   - Tipo de campo: Número, Lista desplegable, Fecha, etc.
   - Para listas desplegables: añade todas las opciones
3. Repite para Propiedades de Trato
4. Para campos calculados (days_since_last_contact): usa Flujos de Trabajo (plan Starter) o actualización manual

**Attio:**

1. Configuración → Atributos
2. Crea atributos personalizados para cada campo
3. El modelo de datos flexible de Attio lo hace más fácil que HubSpot
4. Usa atributos de "Fórmula" para campos calculados

**Pipedrive:**

1. Configuración → Campos de Datos → Añadir Campo Personalizado
2. Elige el tipo de objeto (Persona, Trato, Organización)
3. Crea cada campo con el tipo apropiado
4. Para campos calculados: usa la automatización de Pipedrive o Zapier

**Close:**

1. Configuración → Campos Personalizados
2. Añade campos a los objetos Contacto u Oportunidad
3. Close tiene menos opciones de tipo de campo; usa texto para datos complejos

**Folk:**

1. Folk usa etiquetas y notas flexibles en lugar de campos personalizados rígidos
2. Crea etiquetas para datos categóricos (ej., "ICP: Alto Ajuste", "Prioridad: Caliente")
3. Usa notas estructuradas para otros datos

<InsightCard icon="🤖" title="Por Qué Esto Importa para la IA">
Cada campo que creas ahora se convierte en un punto de datos para los agentes de IA en el Curso 27. Un agente no puede priorizar el alcance si `icp_fit_score` no existe. No puede personalizar si `disc_type` falta. Estructura ahora = inteligencia después.
</InsightCard>

</Slide>

<Slide title="Día 5: Importación de Datos y Migración">

### Lo Que Estás Construyendo

Todos los contactos y tratos existentes importados a tu nuevo CRM con el mapeo de campos correcto

### Tiempo Requerido

60-90 minutos

### Lista de Verificación Previa a la Importación

Antes de importar cualquier cosa:

1. **Limpia los datos de origen** — Elimina duplicados, corrige el formato, verifica los correos
2. **Mapea los campos** — Haz coincidir los nombres de columnas antiguas con las propiedades del nuevo CRM
3. **Prueba con 20 registros** — Siempre prueba la importación antes de la carga completa
4. **Haz una copia de seguridad de todo** — Exporta tus datos de origen como CSV antes de tocarlos

### Fuentes de Importación

**Desde Hoja de Cálculo (CSV):**

HubSpot:

- Contactos → Importar → Archivo desde el equipo
- Sube el CSV
- Mapea las columnas a las propiedades de HubSpot
- Revisa e importa

Attio:

- Importar → CSV
- Arrastra y suelta el archivo
- Mapea las columnas a los atributos
- Importar

Pipedrive:

- Importar Datos → Elige archivo
- Mapea los campos
- Importar

Close:

- Configuración → Importar/Exportar → Importar Contactos
- Sube el CSV
- Mapea los campos

Folk:

- Importar → CSV o Google Sheets
- Mapea las columnas
- Importar

**Desde Otro CRM:**

HubSpot → Attio: Usa la importación nativa de HubSpot de Attio (Configuración → Importar → HubSpot)

Pipedrive → HubSpot: Usa la herramienta de importación de Pipedrive de HubSpot

Close → Pipedrive: Exporta desde Close como CSV, importa a Pipedrive

Folk → Cualquiera: Exporta como CSV, importa al CRM destino

**Desde Correo/LinkedIn:**

HubSpot: Instala la extensión de HubSpot Sales, importa desde contactos de Gmail

Attio: Importa automáticamente desde Gmail/Outlook conectado

Folk: La extensión de Chrome importa desde LinkedIn, Gmail, Twitter

### Plantilla de Mapeo de Campos

<ComparisonBuilder
title="Mapea tus Campos Antiguos al Nuevo Esquema"
persistKey="crm-setup-L10-mapping"
prompt="Lista tus nombres de campos antiguos (ej., 'Estado', 'Empresa', 'Notas')"
expertExample="Antiguo: 'Estado' → Nuevo: 'deal_priority' (Caliente/Tibio/Frío)
Antiguo: 'Empresa' → Nuevo: 'company_name' (texto)
Antiguo: 'Último Contacto' → Nuevo: 'first_contact_date' (fecha)"
criteria={["Cada campo antiguo se mapea a una nueva propiedad", "Sin pérdida de datos", "Los tipos coinciden (texto→texto, fecha→fecha)"]}
/>

### Validación Post-Importación

Después de importar:

1. **Verifica aleatoriamente el 10% de los registros** — Abre 10-20 contactos/tratos, verifica la precisión de los datos
2. **Comprueba los totales** — ¿El valor del pipeline coincide con el origen?
3. **Verifica las relaciones** — ¿Los contactos están vinculados a las empresas/tratos correctos?
4. **Prueba la búsqueda** — Busca un contacto conocido, verifica que aparece
5. **Comprueba los duplicados** — Ejecuta la herramienta de deduplicación, fusiona los duplicados

</Slide>

<Slide title="Día 6: Configuración de Automatizaciones">

### Lo Que Estás Construyendo

3 automatizaciones fundamentales que mantienen tu CRM saludable y accionable

### Tiempo Requerido

60-90 minutos

### Automatización 1: Señalización de Tratos Obsoletos

**Propósito:** Marcar automáticamente los tratos sin actividad en 14+ días

**HubSpot (requiere plan Starter):**

1. Automatización → Flujos de Trabajo → Crear flujo de trabajo
2. Disparador: Propiedad del trato "Fecha de última actividad" es hace más de 14 días
3. Acción: Establecer "Prioridad del Trato" a "Frío"
4. Acción: Crear tarea "Hacer seguimiento de trato obsoleto" asignada al propietario
5. Activar el flujo de trabajo

**Attio:**

1. Automatizaciones → Crear automatización
2. Disparador: Estado del trato sin cambios por 14 días
3. Acción: Añadir etiqueta "Obsoleto"
4. Acción: Enviar notificación a Slack (opcional)

**Pipedrive:**

1. Automatización de Flujos de Trabajo → Crear flujo de trabajo
2. Disparador: Trato no actualizado en 14 días
3. Acción: Cambiar etiqueta a "Obsoleto"
4. Acción: Crear actividad "Revisar trato obsoleto"

**Zapier (para CRMs sin automatización nativa):**

1. Disparador: Programación (diaria)
2. Acción: API del CRM → Buscar tratos con last_activity > 14 días atrás
3. Acción: Actualizar trato → establecer prioridad a "Frío"
4. Acción: Crear tarea en el CRM

### Automatización 2: Recordatorios de Seguimiento

**Propósito:** Crear automáticamente una tarea de seguimiento 3 días después del primer contacto

**HubSpot:**

1. Disparador del flujo de trabajo: El trato entra en la etapa "Contactado"
2. Retraso: 3 días
3. Acción: Crear tarea "Enviar correo de seguimiento" con vencimiento hoy

**Attio:**

1. Disparador: El estado del trato cambia a "Contactado"
2. Retraso: 3 días
3. Acción: Crear recordatorio

**Pipedrive:**

1. Disparador: El trato pasa a la etapa "Contactado"
2. Retraso: 3 días
3. Acción: Crear actividad "Hacer seguimiento"

### Automatización 3: Enriquecimiento de Nuevos Contactos

**Propósito:** Enriquecer automáticamente los nuevos contactos con datos de empresa

(Ya configurado el Día 3 si usas Apollo/enriquecimiento nativo de Attio)

Si aún no está configurado:

1. Disparador: Nuevo contacto creado
2. Acción: "Buscar Persona" de Apollo.io o enriquecimiento de Clearbit
3. Acción: Actualizar contacto con datos enriquecidos
4. Acción: Calcular puntuación de ajuste ICP basada en tamaño de empresa + industria

<TimedChallenge
title="Construcción Rápida de Automatizaciones"
persistKey="crm-setup-L10-automation"
timeLimit={300}
items={[
{ id: "1", prompt: "¿Qué automatización evita que los tratos se queden en la oscuridad?", correctAnswer: "Señalización de tratos obsoletos", explanation: "Marca los tratos sin actividad en 14+ días" },
{ id: "2", prompt: "¿Cuándo debería dispararse un recordatorio de seguimiento?", correctAnswer: "3 días después del primer contacto", explanation: "Da tiempo al prospecto para responder sin que te olvide" },
{ id: "3", prompt: "¿Cuál es el riesgo de sobreautomatizar?", correctAnswer: "Perder el toque humano", explanation: "Automatiza la administración, no las relaciones" }
]}
/>

</Slide>

<Slide title="Día 7: Pruebas de Integración y Validación">

### Lo Que Estás Construyendo

Verificación de extremo a extremo de que todo funciona con datos reales

### Tiempo Requerido

45-60 minutos

### Escenario de Prueba: El Sprint de 5 Contactos

Vas a procesar 5 contactos reales a través de todo tu sistema de CRM para verificar que cada componente funciona.

**Paso 1: Añade 5 Contactos**

Elige 5 personas reales de tu red:

- 2 leads cálidos (personas con las que hayas hablado recientemente)
- 2 prospectos fríos (personas a las que quieras contactar)
- 1 cliente existente

Añádelos manualmente o impórtalos desde LinkedIn/correo.

**Paso 2: Verifica el Enriquecimiento**

Para cada contacto:

- Comprueba si el nombre de la empresa se autocompletó
- Verifica si se encontró la URL de LinkedIn
- Confirma que los datos de industria/cargo son precisos
- Si algún campo está en blanco, enriquece manualmente o revisa tu integración con Apollo

**Paso 3: Crea Tratos**

Para los 4 no-clientes:

- Crea un trato para cada uno
- Establece la etapa apropiada (Lead, Contactado o Comprometido)
- Añade el monto del trato (estimado)
- Establece la fecha de cierre (30-60 días a partir de ahora)
- Asigna prioridad (Caliente/Tibio/Frío)

**Paso 4: Registra Actividad**

Para cada trato:

- Envía un correo real (o registra un correo pasado)
- Verifica que el correo aparece en la línea de tiempo del CRM
- Añade una nota con datos estructurados (ej., "Objeción: Precio demasiado alto")
- Crea una tarea de próxima acción con fecha de vencimiento

**Paso 5: Prueba las Automatizaciones**

- Mueve un trato a la etapa "Contactado" → verifica que se crea la tarea de seguimiento en 3 días (revisa el historial del flujo de trabajo)
- Establece manualmente la última actividad de un trato a hace 15 días → verifica que se marca como obsoleto
- Añade un nuevo contacto → verifica que se ejecuta el enriquecimiento

**Paso 6: Ejecuta Informes**

- Ver resumen del pipeline → verifica que el valor total del trato es correcto
- Revisar lista de contactos → verifica que los 5 contactos aparecen
- Revisar línea de tiempo de actividad → verifica que los correos y notas se registraron
- Probar búsqueda → busca un contacto por nombre de empresa

<InteractiveChecklist
title="Lista de Verificación de Validación del Día 7"
persistKey="crm-setup-L10-validation"
items={[
"5 contactos añadidos y enriquecidos",
"4 tratos creados con etapas apropiadas",
"Sincronización de correo verificada (el correo enviado aparece en la línea de tiempo)",
"Al menos 1 nota registrada por trato",
"Automatización de seguimiento disparada",
"Automatización de trato obsoleto disparada",
"El informe del pipeline muestra los totales correctos",
"La búsqueda funciona para contactos y tratos"
]}
/>

</Slide>
</SlideNavigation>

## Auditoría de Preparación para IA

Has construido tu CRM. Ahora evaluemos qué tan preparado está para los agentes de IA (Curso 27).

Un agente de IA necesita datos **estructurados, consistentes y completos** para razonar efectivamente. Las notas de texto libre son invisibles para la IA. Los campos faltantes rompen la lógica del agente. La nomenclatura inconsistente confunde a los modelos.

<LinterFeedback
title="Linter de Preparación para IA"
persistKey="crm-setup-L10-ai-linter"
inputLabel="Describe la configuración de tu CRM (pega nombres de campos, reglas de automatización, completitud de datos)"
rules={[
{
id: "structured-events",
label: "Registro de Eventos Estructurado",
description: "Actividades registradas con tipo, fecha, resultado (no solo notas de texto libre)",
keywords: ["event_type", "event_outcome", "tipo de actividad"],
antiKeywords: ["solo notas", "texto libre"]
},
{
id: "health-indicators",
label: "Indicadores de Salud Presentes",
description: "Campos como days_since_last_contact, engagement_score, response_time",
keywords: ["days_since", "engagement", "salud", "puntuación"],
antiKeywords: []
},
{
id: "categorical-fields",
label: "Campos Categóricos (no texto libre)",
description: "Listas desplegables para prioridad, etapa, fuente, loss_reason",
keywords: ["desplegable", "select", "prioridad", "etapa"],
antiKeywords: ["campo de texto para prioridad"]
},
{
id: "consistent-naming",
label: "Nomenclatura de Campos Consistente",
description: "snake_case o camelCase, no mezclados",
keywords: ["snake_case", "camelCase", "consistente"],
antiKeywords: ["mayúsculas mixtas", "espacios en nombres de campos"]
},
{
id: "automation-coverage",
label: "Cobertura de Automatización",
description: "Al menos 3 automatizaciones ejecutándose (señales de obsoletos, seguimientos, enriquecimiento)",
keywords: ["automatización", "flujo de trabajo", "disparador"],
antiKeywords: ["solo manual"]
}
]}
/>

### Interpretación de la Puntuación de Preparación para IA

**1-3 (No Preparado):**

- Principalmente notas de texto libre
- Sin registro de eventos estructurado
- Indicadores de salud faltantes
- Sin automatizaciones

**Acción:** Revisa la Lección 6 y reconstruye tu esquema con campos estructurados.

**4-6 (Parcialmente Preparado):**

- Algunos campos estructurados
- Pipeline básico configurado
- Sincronización de correo funcionando
- 1-2 automatizaciones

**Acción:** Añade indicadores de salud y convierte las notas de texto libre a campos estructurados.

**7-8 (Preparado):**

- Esquema completo listo para IA desplegado
- Registro de eventos estructurado
- Indicadores de salud presentes
- 3+ automatizaciones ejecutándose

**Acción:** Estás listo para el Curso 27. Prueba con una consulta de IA simple: "¿Con cuáles 3 contactos debería priorizar esta semana?"

**9-10 (Optimizado):**

- Esquema + automatizaciones + probado con consultas de agente de IA
- Cada campo tiene un propósito claro
- Completitud de datos >90%
- Rutina de higiene semanal establecida

**Acción:** Estás por delante de la curva. Comienza a construir agentes personalizados en el Curso 27 de inmediato.

## El Ritmo Semanal del CRM

Tu CRM está configurado. Ahora necesitas una **rutina de mantenimiento sostenible** para mantenerlo saludable.

<FlipCard
  front="El Barrido Semanal de 15 Minutos"
  back="Lunes: Revisión del pipeline (15 min). Miércoles: Registra las notas de las reuniones en el momento. Viernes: Barrido de higiene de 15 minutos (tratos obsoletos, duplicados, próximas acciones)."
/>

### Lunes: Revisión del Pipeline (15 minutos)

1. Abre la vista del pipeline
2. Ordena por "Fecha de Última Actividad" (más antigua primero)
3. Para cada trato sin actividad en 7+ días:
   - Actualiza la etapa o cierra como perdido
   - Añade la próxima acción con fecha específica
   - Envía seguimiento si es apropiado
4. Revisa los tratos "Calientes": ¿realmente están avanzando?
5. Comprueba el total del pipeline vs. el objetivo mensual

### Miércoles: Registro en Tiempo Real

- Después de cada llamada o reunión: registra inmediatamente las notas en el CRM (2 min por reunión)
- Usa campos estructurados: event_type, event_outcome, next_action
- No esperes hasta el viernes — olvidarás los detalles

### Viernes: Barrido de Higiene (15 minutos)

1. Ejecuta la detección de duplicados → fusiona cualquier duplicado
2. Comprueba los tratos sin próximas acciones → añádelas
3. Revisa los tratos marcados como "Obsoletos" → avanza o cierra
4. Verifica que la sincronización de correo funciona (revisa los correos enviados recientemente)
5. Verifica aleatoriamente 5 contactos para precisión de datos

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para Coaches y Consultores">
Tu ritmo del CRM puede ser más ligero (10 min lunes, 10 min viernes) porque tienes menos tratos pero relaciones más profundas. Enfócate en registrar notas de llamadas y rastrear fuentes de referidos.
</ContextualNote>

## Verificación de Integraciones

Tu CRM no vive en aislamiento. Se conecta a:

- **Correo** (Gmail, Outlook) — para registro y secuencias
- **Calendario** (Google Calendar, Outlook) — para agendar reuniones
- **Herramientas de prospección** (Instantly, Lemlist, Smartlead) — para campañas de correo frío
- **Enriquecimiento** (Apollo, Clearbit) — para datos de contactos
- **Automatización** (Zapier, Make) — para flujos de trabajo personalizados
- **Análisis** (paneles del Curso 41) — para informes

### Lista de Verificación de Integraciones

<InteractiveChecklist
title="Verificación de Integraciones"
persistKey="crm-setup-L10-integrations"
items={[
"Sincronización de correo: los correos enviados y recibidos se registran automáticamente",
"Sincronización de calendario: las reuniones aparecen en la línea de tiempo del CRM",
"Herramienta de prospección conectada (si usas Instantly, Lemlist, etc.)",
"Enriquecimiento ejecutándose (Apollo, Clearbit o nativo del CRM)",
"Recetas de Zapier/Make probadas (si usas automatizaciones personalizadas)",
"Aplicación móvil instalada y sincronizando",
"Extensión de navegador instalada (HubSpot, Folk, etc.)"
]}
/>

## Transferencia al Curso 41: Análisis y Paneles

Tu CRM es ahora la **fuente única de verdad** para todas las métricas de adquisición.

El Curso 41 te enseñará a construir paneles que respondan:

- ¿Cuántos leads entraron al pipeline esta semana?
- ¿Cuál es el tiempo promedio de cierre por fuente?
- ¿Qué secuencias de prospección tienen las tasas de respuesta más altas?
- ¿Cuál es el ingreso proyectado para el próximo mes basado en el pipeline actual?

Pero esos paneles solo funcionan si tus datos del CRM son **limpios, estructurados y completos**.

<InsightCard icon="📊" title="La Base del Análisis">
Cada panel en el Curso 41 extrae datos de los campos del CRM que configuraste hoy. Si `lead_source` es inconsistente, tu informe de atribución de fuente será inútil. Si falta `close_date`, tu previsión de ingresos será incorrecta. Datos limpios ahora = insights precisos después.
</InsightCard>

## Tu Artefacto Completo de Configuración del CRM

Has completado las 10 lecciones del Curso 40. Es hora de compilar todo en tu **Lista de Verificación Completa de Configuración del CRM** — el artefacto principal de este curso.

<TemplateBuilder
title="Lista de Verificación Completa de Configuración del CRM"
persistKey="crm-setup-L10-complete"
sections={[
{
id: "tool-choice",
title: "1. Elección de la Herramienta CRM",
fields: [
{ id: "crm", label: "CRM Elegido", placeholder: "HubSpot Free, Attio Plus, Folk, Close, Pipedrive", type: "text" },
{ id: "reason", label: "¿Por qué este CRM?", placeholder: "Movimiento de ventas, presupuesto, integraciones, preparación para IA", type: "textarea" },
{ id: "tier", label: "Plan/Nivel", placeholder: "Gratuito, Starter, Plus, Essential", type: "text" },
{ id: "cost", label: "Costo Mensual", placeholder: "$0, $14, $20, $29", type: "text" }
]
},
{
id: "philosophy",
title: "2. Filosofía del CRM (de la Lección 1)",
fields: [
{ id: "principle1", label: "Principio Rector 1", placeholder: "ej., Menos campos, más automatizaciones", type: "text" },
{ id: "principle2", label: "Principio Rector 2", placeholder: "ej., Registrar contexto, no solo datos", type: "text" },
{ id: "principle3", label: "Principio Rector 3", placeholder: "ej., Revisar semanalmente, no diariamente", type: "text" },
{ id: "not-tracking", label: "Lo que NO estoy rastreando", placeholder: "ej., Métricas de vanidad, campos en los que no actuaré", type: "textarea" }
]
},
{
id: "pipeline",
title: "3. Configuración del Pipeline (de la Lección 4)",
fields: [
{ id: "stages", label: "Etapas del Pipeline", placeholder: "Lead → Contactado → Comprometido → Reunión → Propuesta → Ganado/Perdido", type: "text" },
{ id: "variant", label: "Variante del Pipeline", placeholder: "B2B estándar, inscripción de creador, personalizado", type: "text" },
{ id: "automations", label: "Automatizaciones por Etapa", placeholder: "ej., Contactado → tarea de seguimiento en 3 días", type: "textarea" }
]
},
{
id: "schema",
title: "4. Esquema de Campos Listo para IA (de la Lección 6)",
fields: [
{ id: "contact-fields", label: "Campos de Contacto", placeholder: "icp_fit_score, lead_source, disc_type, linkedin_url, first_contact_date", type: "textarea" },
{ id: "deal-fields", label: "Campos de Trato", placeholder: "deal_priority, competitor_mentioned, champion_identified, decision_timeline, loss_reason", type: "textarea" },
{ id: "event-fields", label: "Campos de Eventos/Actividad", placeholder: "event_type, event_outcome, next_action, next_action_date", type: "textarea" },
{ id: "health-fields", label: "Indicadores de Salud", placeholder: "days_since_last_contact, engagement_trend, meetings_held_count", type: "textarea" }
]
},
{
id: "integrations",
title: "5. Integraciones Configuradas",
fields: [
{ id: "email", label: "Sincronización de Correo", placeholder: "Gmail, Outlook, registro BCC", type: "text" },
{ id: "enrichment", label: "Fuente de Enriquecimiento", placeholder: "Apollo, Clearbit, nativo del CRM", type: "text" },
{ id: "outreach", label: "Herramienta de Prospección", placeholder: "Instantly, Lemlist, Smartlead, Ninguna", type: "text" },
{ id: "automation", label: "Plataforma de Automatización", placeholder: "Zapier, Make, flujos de trabajo nativos del CRM", type: "text" }
]
},
{
id: "hygiene",
title: "6. Rutina de Higiene (de la Lección 7)",
fields: [
{ id: "weekly", label: "Tareas Semanales", placeholder: "Lunes: revisión del pipeline, Viernes: barrido de higiene", type: "textarea" },
{ id: "monthly", label: "Tareas Mensuales", placeholder: "Verificación de duplicados, verificación de datos, actualización de enriquecimiento", type: "textarea" },
{ id: "quarterly", label: "Tareas Trimestrales", placeholder: "Revisión del esquema, auditoría de automatizaciones, verificación de integraciones", type: "textarea" }
]
},
{
id: "ai-readiness",
title: "7. Puntuación de Preparación para IA",
fields: [
{ id: "score", label: "Puntuación Actual (1-10)", placeholder: "7", type: "text" },
{ id: "gaps", label: "Brechas a Abordar", placeholder: "ej., Necesito añadir el campo engagement_trend", type: "textarea" },
{ id: "next-steps", label: "Próximos Pasos para Agentes de IA", placeholder: "ej., Probar con consulta de agente del Curso 27", type: "textarea" }
]
}
]}
/>

## Acciones Finales

Has configurado tu CRM. Lo has probado con datos reales. Has puntuado tu preparación para IA.

Ahora comprométete con el **Ritmo Semanal del CRM** durante los próximos 30 días. Aquí es donde la mayoría de los fundadores en solitario fallan — no en la configuración, sino en el **uso sostenido**.

<InteractiveChecklist
title="Compromiso de 30 Días con el CRM"
persistKey="crm-setup-L10-commitment"
items={[
"Añadir el barrido de higiene del CRM al calendario (lunes y viernes, 15 min cada uno)",
"Configurar la aplicación móvil y probar el registro en movimiento",
"Registrar cada correo, llamada y reunión por 30 días (construir el hábito)",
"Revisar el pipeline semanalmente y actualizar las etapas de los tratos",
"Ejecutar la deduplicación mensual y la verificación de datos",
"Compartir acceso al CRM con un compañero de responsabilidad o co-fundador (si aplica)",
"Programar el Curso 41 (Análisis) para comenzar en 2 semanas"
]}
/>

<InsightCard icon="🎯" title="La Prueba Real">
Tu CRM no está "listo" cuando terminas el Día 7. Está listo cuando lo has usado consistentemente por 90 días y se ha convertido en tu sistema predeterminado para gestionar relaciones. La configuración es el 10% del trabajo. El hábito es el 90%.
</InsightCard>

---

## Quiz: Dominio de la Configuración del CRM

```json
{
  "questions": [
    {
      "id": "crm-setup-q1",
      "question": "¿Cuál es la razón principal por la que los fundadores en solitario abandonan los CRMs?",
      "options": [
        "Elección incorrecta de herramienta",
        "Sobreingeniería (demasiados campos) o subutilización (hoja de cálculo glorificada)",
        "Falta de integraciones",
        "Costo"
      ],
      "correctAnswer": 1,
      "explanation": "La mayoría de los fallos de CRM vienen de la sobrepersonalización (demasiado complejo para mantener) o la baja adopción (no usarlo consistentemente). La elección de herramienta importa menos que la disciplina de uso."
    },
    {
      "id": "crm-setup-q2",
      "question": "¿Cuál es el pipeline universal de 6 etapas?",
      "options": [
        "Prospecto → Calificado → Demo → Propuesta → Negociación → Cerrado",
        "Lead → Contactado → Comprometido → Reunión → Propuesta → Ganado/Perdido",
        "Conciencia → Interés → Decisión → Acción → Retención → Defensa",
        "Frío → Tibio → Caliente → Reunión → Propuesta → Ganado"
      ],
      "correctAnswer": 1,
      "explanation": "Lead → Contactado → Comprometido → Reunión → Propuesta → Ganado/Perdido funciona universalmente porque mapea a acciones observables, no a juicios subjetivos."
    },
    {
      "id": "crm-setup-q3",
      "question": "¿Por qué son críticos los datos estructurados para los agentes de IA?",
      "options": [
        "La IA no puede leer notas de texto libre de forma efectiva",
        "Los campos estructurados permiten el razonamiento, la categorización y la priorización",
        "Las listas desplegables son más rápidas de completar que los campos de texto",
        "Tanto A como B"
      ],
      "correctAnswer": 3,
      "explanation": "Los agentes de IA necesitan datos estructurados y categóricos para razonar. Las notas de texto libre son invisibles para la IA. Los campos estructurados (listas desplegables, números, fechas) permiten a los agentes priorizar, personalizar y recomendar acciones."
    },
    {
      "id": "crm-setup-q4",
      "question": "¿Qué es la prueba '¿Actuaría sobre Esto?'?",
      "options": [
        "Para cada campo personalizado: si la respuesta es no, elimínalo",
        "Para cada automatización: si no ahorra tiempo, desactívala",
        "Para cada contacto: si no tiene ajuste ICP, archívalo",
        "Para cada trato: si no está avanzando, ciérralo"
      ],
      "correctAnswer": 0,
      "explanation": "Cada campo personalizado debe ganarse su lugar desencadenando una decisión o acción. Si no actuarías sobre los datos, no los rastrees."
    },
    {
      "id": "crm-setup-q5",
      "question": "¿Cuál es la rutina de higiene semanal del CRM recomendada?",
      "options": [
        "Diario: registrar todo. Semanal: revisar pipeline. Mensual: deduplicar.",
        "Lunes: revisión del pipeline (15 min). Viernes: barrido de higiene (15 min). En tiempo real: registrar reuniones.",
        "Semanal: actualizar todos los tratos. Mensual: auditoría completa. Trimestral: migración.",
        "Diario: verificar nuevos leads. Semanal: enviar seguimientos. Mensual: cerrar tratos perdidos."
      ],
      "correctAnswer": 1,
      "explanation": "Revisión del pipeline los lunes + barrido de higiene los viernes + registro de reuniones en tiempo real es el ritmo sostenible para fundadores en solitario. La administración diaria del CRM es excesiva; solo mensual es insuficiente."
    },
    {
      "id": "crm-setup-q6",
      "question": "¿Qué CRM es mejor para ventas B2B outbound de alto volumen?",
      "options": [
        "Folk (relación primero)",
        "HubSpot Free (automatización limitada)",
        "Close (llamadas + secuencias integradas)",
        "Attio (UX moderno)"
      ],
      "correctAnswer": 2,
      "explanation": "Close está construido específicamente para outbound de alto volumen con llamadas, SMS y secuencias integradas. Folk es para ventas de relaciones. HubSpot Free carece de automatización. Attio es excelente para preparación de IA pero no está optimizado para volumen."
    },
    {
      "id": "crm-setup-q7",
      "question": "¿Cuál es la integración #1 que verificar el Día 7?",
      "options": [
        "Sincronización de calendario",
        "Sincronización de correo (los correos enviados y recibidos se registran automáticamente)",
        "Enriquecimiento (Apollo, Clearbit)",
        "Automatizaciones de Zapier/Make"
      ],
      "correctAnswer": 1,
      "explanation": "La sincronización de correo es la base. Sin ella, tu CRM tiene amnesia. El calendario, el enriquecimiento y las automatizaciones son importantes pero secundarios al registro de correos."
    },
    {
      "id": "crm-setup-q8",
      "question": "¿Cuál es el rango de la Puntuación de Preparación para IA para 'Listo para el Curso 27'?",
      "options": ["1-3", "4-6", "7-8", "9-10"],
      "correctAnswer": 2,
      "explanation": "7-8 significa esquema completo listo para IA desplegado, registro de eventos estructurado, indicadores de salud presentes y 3+ automatizaciones ejecutándose. Ese es el umbral para construir agentes de IA en el Curso 27."
    },
    {
      "id": "crm-setup-q9",
      "question": "¿Qué ocurre si retrasa la configuración del CRM 1 semana después de elegir una herramienta?",
      "options": [
        "Nada — puedes configurarlo en cualquier momento",
        "La adopción cae un 60% por cada semana de retraso",
        "Olvidas qué herramienta elegiste",
        "Tu período de prueba gratuita expira"
      ],
      "correctAnswer": 1,
      "explanation": "La investigación muestra que la adopción del CRM cae un 60% por cada semana de retraso después de la decisión de compra. La ventana de 48 horas es real."
    },
    {
      "id": "crm-setup-q10",
      "question": "¿Cuál es el artefacto de salida principal del Curso 40?",
      "options": [
        "Cuadro de Evaluación Comparativa de CRM",
        "Mapa de Etapas del Pipeline",
        "Esquema de Campos Listo para IA",
        "Lista de Verificación Completa de Configuración del CRM (compila todos los artefactos de las lecciones)"
      ],
      "correctAnswer": 3,
      "explanation": "La Lista de Verificación Completa de Configuración del CRM es el artefacto culminante que compila tu filosofía del CRM, elección de herramienta, pipeline, esquema, integraciones, rutina de higiene y puntuación de preparación para IA."
    }
  ]
}
```
