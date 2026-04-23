---
title: "Depurando Automatizaciones Rotas"
duration: "45 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 9
---

Tu automatización de Lead Catcher lleva tres semanas funcionando. Ayer, un prospecto envió tu formulario de contacto. No recibiste ninguna notificación en Slack. El contacto no está en tu CRM.

Lo descubriste porque el prospecto te envió un email de seguimiento dos días después preguntando si recibiste su consulta.

Este es el escenario de fallo de automatización al que todo fundador solo se enfrenta eventualmente. La automatización en la que confías se rompe silenciosamente, y solo te enteras cuando un deal ya está frío.

Esta lección te da un enfoque sistemático para diagnosticar y corregir automatizaciones rotas — y configuraciones de monitoreo que detectan fallos antes de que te cuesten deals.

---

## Los Fallos de Automatización Son Normales

Antes de que cunda el pánico: las automatizaciones se rompen. Esto no es señal de que elegiste las herramientas incorrectas o construiste las cosas de manera equivocada.

<InsightCard icon="🔧" title="La Realidad de los Fallos">
La automatización promedio de Zapier falla 1-3 veces por mes. El 60% de los fallos son relacionados con autenticación (tokens OAuth vencidos). El 25% son por incompatibilidades en el formato de datos. El 15% son por cambios en disparadores o actualizaciones de API.

No puedes prevenir todos los fallos. Puedes construir un monitoreo que los detecte rápido y un protocolo para solucionarlos en menos de 10 minutos.
</InsightCard>

<FlipCard
  front="¿Por qué las automatizaciones que funcionaban se rompen de repente?"
  back="Cinco razones comunes: (1) El token OAuth vence — la app se desconecta y necesita ser reautorizada. (2) La API de la app cambia — los endpoints se mueven, los nombres de los campos cambian, o las funciones obsoletas dejan de funcionar. (3) Se renombró un campo del formulario — tu mapeo de campo ahora apunta a un campo que no existe. (4) Se alcanzan los límites de velocidad — enviaste demasiadas llamadas a la API demasiado rápido. (5) La URL del webhook cambia — el webhook de la app apunta a una URL antigua que ya no funciona."
/>

---

## El Protocolo de Depuración de 5 Pasos

Cuando una automatización se rompe, no empieces a hacer clic al azar. Sigue este protocolo en orden — resuelve el 90% de los fallos.

<ProgressiveReveal title="El Protocolo de Depuración de 5 Pasos" persistKey="automation-L9-protocol">

<RevealSection title="Paso 1: Lee el Registro de Errores">

Cada plataforma de automatización tiene un historial de ejecuciones. Encuentra la ejecución fallida y lee el mensaje de error.

**En Zapier:**

- Ve a "Zap History" en la barra lateral izquierda
- Filtra por estado "Error"
- Haz clic en la ejecución fallida
- Lee el mensaje de error — suele ser específico: "401 Unauthorized", "404 Not Found", "Missing required field: email"

**En Make:**

- Ve a la pestaña "History" del escenario
- Filtra por estado "Error"
- Haz clic en la ejecución fallida
- Expande el módulo fallido — lee la respuesta de error de la API

**En n8n:**

- Panel de ejecuciones del workflow → filtra por "Error"
- Haz clic en la ejecución fallida → lee la salida del nodo

**La mayoría de los errores se explican por sí solos si los lees con atención.** "401 Unauthorized" significa reconectar la app. "404 Not Found" significa que el endpoint cambió o el registro fue eliminado. "Missing required field" significa que tu mapeo de campo tiene una brecha.

**Tiempo: 2-3 minutos. Resuelve: 40-50% de los fallos en este paso.**

</RevealSection>

<RevealSection title="Paso 2: Prueba el Disparador">

Si el registro de errores no apunta a un paso específico, verifica que el disparador siga funcionando correctamente.

**En Zapier:**

- Abre el editor del Zap
- Haz clic en el paso del disparador
- Haz clic en "Test trigger"
- Verifica que se devuelvan datos de muestra
- Si la prueba falla: la app del disparador necesita ser reconectada

**En Make:**

- Abre el editor del escenario
- Haz clic derecho en el módulo disparador
- Selecciona "Run this module only"
- Verifica si se devuelven datos

**Si la prueba del disparador falla:** La causa más común es que el token OAuth de la app ha sido revocado o que la URL del webhook ha cambiado.

**Solución:** Haz clic en "Reconnect" o "Reauthorize" en la app del disparador. Si es un webhook, regenera la URL del webhook en tu plataforma de automatización y actualízala en la app fuente.

**Tiempo: 3-5 minutos. Resuelve: 20-25% adicional de los fallos.**

</RevealSection>

<RevealSection title="Paso 3: Verifica Cada Paso de Acción">

Recorre cada paso de acción en orden, probando cada uno con los datos de muestra del Paso 2.

**Qué buscar:**

- ¿El paso recibe los datos que espera? (Verifica los mapeos de entrada)
- ¿Algún campo muestra `undefined` o `[empty]` donde debería tener un valor?
- ¿Falta algún campo requerido en los datos fuente?

**En Zapier:** Desactiva el Zap, haz clic en cada paso de acción, verifica que los mapeos de campo sigan siendo correctos (especialmente después de cualquier cambio en formularios o CRM).

**En Make:** Usa la función "Run once" para recorrer el escenario y ver los datos en cada límite de módulo.

**Problemas comunes en este paso:**

- Renombraste un campo de Typeform → Zapier aún referencia el nombre antiguo del campo → se envía un valor vacío al CRM
- Agregaste un campo requerido a HubSpot → la automatización no lo envía → la API rechaza la solicitud
- El formato de fecha cambió (ej.: Calendly envía la hora en UTC pero el CRM espera hora local)

**Tiempo: 5-10 minutos. Resuelve: 15-20% adicional de los fallos.**

</RevealSection>

<RevealSection title="Paso 4: Verifica la Autenticación de la App">

Si el disparador funciona correctamente pero las acciones fallan, verifica que cada app conectada tenga una autenticación válida.

**En Zapier:**

- Ve a Settings → Connected Accounts
- Busca apps que muestren "Reconnect" o "Expired"
- Haz clic en "Reconnect" y reautoriza vía OAuth

**En Make:**

- Ve a Connections en la barra lateral izquierda
- Busca conexiones marcadas con un icono de advertencia
- Haz clic en "Verify" luego en "Reauthorize" si es necesario

**Por qué ocurre esto:** Los tokens OAuth vencen (típicamente cada 30-90 días según la app). Algunas apps también revocan tokens cuando cambias tu contraseña, habilitas la autenticación de dos factores, o actualizas la configuración de seguridad.

**Solución:** Reutoriza la conexión. Tarda 30 segundos. La automatización funcionará de nuevo inmediatamente.

**Tiempo: 1-3 minutos. Resuelve: la mayoría de los fallos relacionados con autenticación (60% de todos los fallos).**

</RevealSection>

<RevealSection title="Paso 5: Prueba de Extremo a Extremo con Entrada Nueva">

Después de identificar y corregir el problema específico, ejecuta una prueba completa de extremo a extremo:

1. Envía una entrada de prueba real (nueva entrada de formulario, o dispara manualmente la automatización con datos de muestra)
2. Observa cada paso ejecutarse en el historial de ejecuciones
3. Verifica el resultado al final (¿se creó el contacto en el CRM? ¿se recibió la notificación en Slack? ¿se creó la tarea?)
4. Si todos los pasos se completan correctamente: la automatización está reparada

**No te limites a corregir el error y asumir que funciona.** Ejecuta la prueba completa. Algunas correcciones revelan un segundo problema aguas abajo.

**Tiempo: 5 minutos. Confirma que la corrección está completa.**

</RevealSection>

</ProgressiveReveal>

---

## Patrones de Errores Comunes y Soluciones

<ClassifyExercise
title="Código de Error → Causa Raíz"
persistKey="automation-L9-errors"
categories={[
{ id: "auth", label: "Error de Autenticación (Reconectar App)", color: "#ef4444" },
{ id: "data", label: "Error de Formato de Datos (Corregir Mapeo)", color: "#f59e0b" },
{ id: "rate", label: "Error de Límite de Velocidad (Agregar Retraso)", color: "#3b82f6" },
{ id: "endpoint", label: "Cambio de API (Actualizar Endpoint/Campo)", color: "#6b7280" }
]}
items={[
{ id: "1", content: "Error: '401 Unauthorized' de la API de HubSpot", correctCategory: "auth" },
{ id: "2", content: "Error: '400 Bad Request — el campo email espera formato de email válido, recibió undefined'", correctCategory: "data" },
{ id: "3", content: "Error: '429 Too Many Requests — retry after 60 seconds'", correctCategory: "rate" },
{ id: "4", content: "Error: '404 Not Found — el recurso solicitado no existe'", correctCategory: "endpoint" },
{ id: "5", content: "Error: 'Formato de fecha inválido — se esperaba ISO 8601, recibió MM/DD/YYYY'", correctCategory: "data" },
{ id: "6", content: "Error: '403 Forbidden — el token OAuth ha sido revocado'", correctCategory: "auth" }
]}
/>

### Soluciones Específicas por Tipo de Error

<SlideNavigation>
<Slide title="Errores de Autenticación 401/403">

**Causa:** Token OAuth vencido o revocado. Ocurre cuando cambias la contraseña, habilitas la autenticación de dos factores, actualizas la configuración de seguridad, o el token alcanza su fecha de vencimiento (30-90 días para la mayoría de las apps).

**Solución en Zapier:**

1. Settings → Connected Accounts
2. Encuentra la app afectada
3. Haz clic en "Reconnect"
4. Completa el flujo OAuth (inicia sesión, autoriza)
5. Regresa al Zap — debería funcionar inmediatamente

**Solución en Make:**

1. Barra lateral de Connections
2. Encuentra la conexión con icono de advertencia
3. Haz clic en "Verify" → "Reauthorize"

**Prevención:** Establece un recordatorio en el calendario cada 60 días para reautorizar todas las conexiones de apps como mantenimiento preventivo. Tarda 5 minutos en total.

</Slide>

<Slide title="Errores 400 Bad Request / Formato de Datos">

**Causa:** Los datos que envía tu automatización no coinciden con lo que espera la API. Causas comunes: campo renombrado en la app fuente, campo requerido faltante, tipo de datos incorrecto (cadena enviada a campo numérico), fecha en formato incorrecto.

**Diagnóstico:**

1. Lee el mensaje de error con atención — generalmente especifica qué campo es el problema
2. Abre el paso de acción que falla
3. Verifica qué valor se envía al campo problemático
4. Rastrea de dónde proviene ese valor en tu mapeo

**Ejemplos de solución:**

- Campo renombrado en Typeform → vuelve a probar el disparador para obtener nuevos nombres de campo → actualiza los mapeos
- Formato de fecha incorrecto → agrega un paso Formatter para convertir "15 de marzo de 2026" a "2026-03-15"
- Campo requerido faltante → agrega un valor estático o haz que el campo sea opcional en tu CRM

</Slide>

<Slide title="Errores 429 de Límite de Velocidad">

**Causa:** Estás llamando a una API demasiadas veces demasiado rápido. Las APIs tienen límites de velocidad (ej.: HubSpot Free: 100 solicitudes/10 segundos, 40,000/día). Las automatizaciones con bucles o agregadores pueden superarlos.

**Solución:**

- En Zapier: No es un problema común con flujos de automatización normales. Si se alcanzan límites: agrega un paso Delay entre operaciones por lotes.
- En Make: Agrega un módulo Sleep (retraso de 1-2 segundos) entre llamadas a la API en bucles. O reduce el número de registros procesados por ejecución del escenario.

**Prevención:** Si procesas lotes grandes (100+ registros), agrega retrasos explícitos entre llamadas.

</Slide>

<Slide title="Errores 404 Not Found">

**Causa:** El endpoint de la API cambió (la app actualizó su API), o el registro al que se hace referencia fue eliminado.

**Si el endpoint cambió:**

1. Revisa el registro de cambios de la API de la app o las notas de versión
2. Actualiza la URL en tu módulo de solicitud HTTP
3. O espera a que la integración se actualice (Zapier/Make mantienen sus propias integraciones de apps)

**Si el registro fue eliminado:**

1. El deal, contacto o tarea al que se hace referencia ya no existe
2. Agrega manejo de errores para omitir graciosamente cuando no se encuentre un registro
3. En Make: Agrega un módulo de manejo de errores → enruta errores "404" a una ruta de "registrar y omitir"

</Slide>
</SlideNavigation>

---

## Incorporando Monitoreo a Tu Stack

El protocolo de 5 pasos repara automatizaciones rotas. El monitoreo las detecta antes de que pierdas deals.

<InsightCard icon="🔔" title="El Principio de Monitoreo">
Deberías saber que una automatización falló en menos de 24 horas — no cuando un prospecto te escribe 3 días después preguntando por qué nunca respondiste. Configura el monitoreo una vez, benefíciate de él indefinidamente.
</InsightCard>

**Tres capas de monitoreo:**

<ProgressiveReveal title="Configuración del Monitoreo de Automatizaciones" persistKey="automation-L9-monitoring">

<RevealSection title="Capa 1: Alertas por Email de la Plataforma">

Tanto Zapier como Make pueden enviarte un email cuando una automatización falla.

**En Zapier:**

- Settings → Notifications
- Habilita "Email me when a Zap is turned off due to errors"
- Zapier automáticamente desactiva los Zaps después de 10 fallos consecutivos y te envía un email

**En Make:**

- Organization Settings → Notifications
- Habilita "Send me an email when a scenario has an error"

**A dónde llega la alerta:** Tu bandeja de email. Tiempo de respuesta: el mismo día (dependiendo de con qué frecuencia revisas el email).

**Limitación:** Solo serás notificado después de que los fallos se acumulen, no en el primer fallo.

</RevealSection>

<RevealSection title="Capa 2: Canal de Errores en Slack desde Zapier/Make">

Configura una automatización que te envíe una notificación en Slack cada vez que otra automatización falle.

**En Make:**

1. Crea un nuevo escenario
2. Disparador: Make "Watch Scenario Errors" (disponible en el módulo de Monitoreo de Make)
3. Acción: Slack "Send Message" → tu canal #automation-alerts
4. Mensaje: "🚨 Error de Automatización: [Nombre del Escenario] — [Mensaje de Error]"

**En Zapier:**

1. Usa el manejo de errores integrado de Zapier
2. En cualquier Zap, haz clic en "Error Handler" → enruta los errores a una acción de notificación en Slack

Esto te da alertas en tiempo real en Slack para cada fallo de automatización. Revisa #automation-alerts durante tu revisión del viernes.

</RevealSection>

<RevealSection title="Capa 3: Prueba Canario Semanal">

Una prueba canario es una ejecución de automatización simple y esperada que disparas manualmente cada semana. Si funciona, tu stack está saludable. Si falla, sabes que algo está roto.

**Configuración:**

1. Crea un evento de calendario "Prueba Canario de Automatización Semanal" cada lunes por la mañana
2. Envía una entrada de formulario de prueba con un email específico (canario@tudominio.com)
3. Verifica que recibas una notificación en Slack dentro de 2 minutos
4. Si no: ejecuta el protocolo de depuración de 5 pasos inmediatamente

**Inversión de tiempo:** 3 minutos por semana. **Valor:** Detecta fallos en 7 días en lugar de cuando un prospecto se queja.

</RevealSection>

</ProgressiveReveal>

---

## Control de Versiones y Retroceso

Antes de editar cualquier automatización que funciona, protégete con una copia de seguridad de la versión.

<FlipCard
  front="La Regla de Control de Versiones"
  back="Antes de editar una automatización que funciona: duplícala. Nombra el duplicado con una fecha (ej.: 'Lead Catcher v2 — 24/02/2026'). Mantén el original activo. Si tu edición rompe la automatización, desactiva la nueva versión y reactiva la original. Sin pérdida de datos, sin tiempo de inactividad."
/>

<FlipCard
  front="¿Cuándo deberías reconstruir en lugar de parchear?"
  back="Si una automatización ha sido parcheada 3+ veces con soluciones provisionales, reconstruye desde cero. Las automatizaciones parcheadas acumulan deuda técnica — cada solución provisional depende de la anterior, haciendo que el próximo fallo sea más difícil de depurar. Una reconstrucción limpia tarda 30-60 minutos y produce una automatización más confiable."
/>

**Pasos de control de versiones en Zapier:**

1. Abre el Zap que quieres editar
2. Haz clic en el menú de tres puntos → "Copy Zap"
3. Renombra la copia para incluir la fecha de hoy: "Lead Catcher v3 — 26/02/2026"
4. Edita la copia, pruébala
5. Si funciona: desactiva la versión antigua, activa la nueva
6. Mantén la versión antigua 30 días como opción de retroceso

**En Make:**

1. Haz clic en el escenario → "Create a copy"
2. Agrega el sufijo de fecha al nombre de la copia
3. Edita y prueba la copia
4. Si funciona: desactiva el original, activa la copia

---

## La Decisión de Reconstruir vs Parchear

<SwipeDecision
title="¿Reconstruir o Parchear?"
description="Para cada escenario, decide si parchear la automatización existente o reconstruirla desde cero."
optionA="Parchear"
optionB="Reconstruir"
persistKey="automation-L9-swipe"
cards={[
{
id: "1",
content: "Tu Lead Catcher funcionaba perfectamente durante 2 meses. Se renombró un campo de Typeform. El mapeo de campo del CRM ahora es incorrecto.",
correctOption: "a",
explanation: "Parcheá. Un cambio de nombre de campo es una solución simple — vuelve a probar el disparador, actualiza el mapeo. No hay necesidad de reconstruir toda la automatización."
},
{
id: "2",
content: "Tu cadena de Follow-Up Reminder ha sido parcheada 4 veces. Hay condiciones de disparador duplicadas, una solución para un error en la lógica de retraso original, y condiciones de parada que a veces no funcionan correctamente.",
correctOption: "b",
explanation: "Reconstruye. Cuatro parches en una automatización basada en retrasos indica una complejidad acumulada que hace la depuración más difícil que la reconstrucción. Una reconstrucción limpia de 30 minutos será más confiable."
},
{
id: "3",
content: "Tu Meeting Logger dejó de funcionar porque el token OAuth de Calendly venció.",
correctOption: "a",
explanation: "Parcheá. El vencimiento del token es una corrección de 1 minuto — reconecta la app. No reconstruyas una automatización que funciona por un problema rutinario de mantenimiento."
},
{
id: "4",
content: "Tu automatización original usaba una función obsoleta de Zapier que Zapier eliminará el próximo mes. La función afecta 6 de los 8 pasos de la automatización.",
correctOption: "b",
explanation: "Reconstruye. Si 6 de los 8 pasos necesitan cambiar, parchear no es realista. Construye el reemplazo limpiamente antes de que se elimine la función obsoleta."
}
]}
/>

---

## Construyendo Tu Playbook de Depuración

Documenta tus fallos pasados para que el tú del futuro pase menos tiempo diagnosticando los mismos problemas.

<TemplateBuilder
title="Mi Playbook de Depuración"
persistKey="automation-L9-playbook"
sections={[
{
id: "known_issues",
title: "Problemas Conocidos y Soluciones",
fields: [
{
id: "issue1",
label: "Fallo pasado 1: Qué se rompió y cómo lo solucionaste",
placeholder: "ej.: Lead Catcher se rompió el 10/02/2026. Causa: OAuth de HubSpot venció. Solución: Reconecté HubSpot en Zapier Settings → Connected Accounts. Tiempo de solución: 3 minutos.",
type: "textarea"
},
{
id: "issue2",
label: "Fallo pasado 2 (si lo hay)",
placeholder: "ej.: Meeting Logger dejó de registrar actividades. Causa: El nombre del campo de Calendly cambió de 'start_time' a 'event_start_time' después de una actualización de Calendly. Solución: Volví a probar el disparador, actualicé el mapeo de campo. Tiempo de solución: 8 minutos.",
type: "textarea"
}
]
},
{
id: "maintenance",
title: "Programa de Mantenimiento Preventivo",
fields: [
{
id: "weekly",
label: "Verificación semanal (qué verificas cada viernes)",
placeholder: "ej.: Enviar entrada de formulario canario de prueba, verificar que se recibió la notificación en Slack. Revisar el canal de Slack #automation-alerts en busca de errores.",
type: "textarea"
},
{
id: "monthly",
label: "Verificación mensual (primer lunes de cada mes)",
placeholder: "ej.: Revisar todos los historiales de ejecución de automatizaciones en busca de errores. Reautorizar las conexiones OAuth de las 5 automatizaciones. Verificar el uso de operaciones/tareas vs los límites del plan.",
type: "textarea"
}
]
},
{
id: "contacts",
title: "Escalamiento (Cuando No Puedes Solucionarlo)",
fields: [
{
id: "resources",
label: "Recursos a consultar cuando estás atascado",
placeholder: "ej.: Comunidad de Zapier (community.zapier.com), Comunidad de Make (community.make.com), Reddit r/zapier",
type: "text"
},
{
id: "support",
label: "Canales de soporte para cada plataforma",
placeholder: "ej.: Soporte por chat de Zapier (Starter+), soporte por chat de Make (Core+), foro de la comunidad de n8n",
type: "text"
}
]
}
]}
/>

---

## La Simulación de Depuración

Practiquemos. Diagnosticarás cinco automatizaciones rotas usando el protocolo de 5 pasos.

<TimedChallenge
title="Desafío de Depuración de Automatizaciones"
persistKey="automation-L9-timed"
timeLimit={120}
items={[
{
id: "1",
prompt: "Error: '401 Unauthorized — invalid_token' de la API de Slack. El Zap de Notificaciones de Deal funcionó por última vez hace 3 días.",
correctAnswer: "reconnect slack oauth",
explanation: "401 Unauthorized = problema con el token OAuth. Solución: ve a Zapier → Connected Accounts → Slack → Reconnect. Tarda 60 segundos."
},
{
id: "2",
prompt: "Error: 'Required field missing: email — received undefined.' El Lead Catcher dejó de funcionar después de que editaste tu formulario de Typeform.",
correctAnswer: "remap typeform email field",
explanation: "Editar el formulario cambia los IDs de campo. Solución: vuelve a probar el disparador de Typeform para obtener nuevos nombres de campo → actualiza el mapeo del campo email en el paso de acción de HubSpot."
},
{
id: "3",
prompt: "No hay error en el registro, pero se crean tareas de Follow-Up Reminder incluso para contactos que han respondido. Las condiciones de parada parecen estar fallando.",
correctAnswer: "check reply filter condition logic",
explanation: "Sin error = la automatización se ejecuta con éxito, pero la lógica está mal. Solución: revisa el paso de filtro — la condición 'la fecha de última respuesta está vacía' puede estar verificando el campo incorrecto o usando operadores incorrectos."
},
{
id: "4",
prompt: "Error: '429 Too Many Requests — please wait 60 seconds.' Tu Meeting Logger funciona correctamente para las primeras 3 reuniones del día pero falla en la 4ta y siguientes.",
correctAnswer: "add delay between api calls",
explanation: "429 = límite de velocidad alcanzado. Solución: agrega un módulo Delay o Sleep (2-3 segundos) entre la creación de la actividad en el CRM y los pasos de actualización del stage del deal para espaciar las llamadas a la API."
}
]}
/>

---

## Tus Acciones a Tomar

<InteractiveChecklist
title="Acciones de la Lección 9"
persistKey="automation-L9-actions"
items={[
"Habilitar notificaciones por email para fallos de automatización en Zapier y/o Make (Settings → Notifications)",
"Crear un canal #automation-alerts en Slack y configurar el enrutamiento de errores",
"Configurar una prueba canario semanal: evento en el calendario cada lunes para enviar una entrada de formulario de prueba",
"Agregar 'Verificación de Salud de Automatizaciones' a tu agenda de revisión del viernes (verificación de 5 min del registro de errores)",
"Duplicar cada una de tus 5 automatizaciones como copias de seguridad versionadas con la fecha de hoy en el nombre",
"Iniciar tu Playbook de Depuración — documenta los fallos pasados que recuerdes",
"Marcar la URL del registro de errores de tu plataforma para acceso rápido al depurar"
]}
/>

---

## Qué Sigue

En la **Lección 10**, compilarás todo en tu Plano Completo del Stack de Automatización — un mapa visual de las seis automatizaciones, sus conexiones, fuentes de disparadores, y el sprint de implementación de 7 días que pone en marcha tu stack completo para fin de semana.

---

## Quiz: Depurando Automatizaciones

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "¿Qué porcentaje de los fallos de automatización están relacionados con autenticación (tokens OAuth vencidos)?",
      "options": ["15%", "25%", "60%", "90%"],
      "correctAnswer": 2,
      "explanation": "El 60% de los fallos de automatización están relacionados con autenticación. Los tokens OAuth vencen, las apps revocan el acceso cuando cambian las contraseñas, y habilitar la autenticación de dos factores puede romper conexiones. Reconectar la app los resuelve en menos de un minuto."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "¿Cuál es el primer paso del protocolo de depuración de 5 pasos?",
      "options": [
        "Probar el disparador con un evento de muestra",
        "Reconectar todas las autenticaciones de apps",
        "Leer el registro de errores y el mensaje de error",
        "Reconstruir la automatización desde cero"
      ],
      "correctAnswer": 2,
      "explanation": "Siempre lee primero el registro de errores. El mensaje de error a menudo te dice exactamente qué está mal — '401 Unauthorized' significa reconectar, '400 Bad Request — missing field: email' significa corregir tu mapeo. Leer el registro resuelve el 40-50% de los problemas de inmediato."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "Deberías reconstruir una automatización cada vez que falla, para empezar desde cero.",
      "correctAnswer": false,
      "explanation": "Falso. La mayoría de los fallos se solucionan en menos de 10 minutos con el protocolo de 5 pasos. Reconstruye solo cuando una automatización ha sido parcheada 3+ veces y ha acumulado una complejidad que hace la depuración más difícil que la reconstrucción."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "¿Qué deberías hacer ANTES de editar una automatización que funciona?",
      "options": [
        "Primero desactivar la automatización",
        "Duplicarla con un sufijo de fecha como copia de seguridad versionada",
        "Exportar la configuración de la automatización a un archivo",
        "Nada — simplemente editarla directamente"
      ],
      "correctAnswer": 1,
      "explanation": "Siempre duplica una automatización que funciona antes de editarla. Nombra el duplicado con la fecha de hoy. Si tu edición rompe la automatización, reactiva la versión original. Esto evita la pérdida de datos y el tiempo de inactividad."
    }
  ]
}
```
