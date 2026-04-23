---
title: "Patrones de supervisión: cola diaria + interruptores de emergencia"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 26: Autonomous SDR Systems"
lesson: 7
---

# Patrones de supervisión: cola diaria + interruptores de emergencia

## La llamada de las 3 AM

Son las 3:17 AM. Tu teléfono vibra. Notificación de Slack. Luego otra. Luego cinco más en rápida sucesión.

Tu SDR IA acaba de enviar 147 correos a toda tu lista de prospectos con una línea de personalización alucinada afirmando que todos "recientemente publicaron sobre cambiar de Salesforce a HubSpot" — excepto que ninguno lo hizo. La IA leyó un ejemplo de entrenamiento como datos en vivo.

Para la mañana, tienes 23 quejas de spam, 4 DMs enojados en LinkedIn y tu dominio de envío principal marcado por Google. Tres meses de trabajo de entregabilidad destruidos en 90 minutos mientras dormías.

**Por eso existen los patrones de supervisión.**

La promesa de los SDR IA "autónomos" es seductora: configura y olvida, despierta con reuniones agendadas. ¿La realidad? Los SDR IA son **semi-autónomos en el mejor caso** — necesitan supervisión humana como un SDR junior necesita a un gerente. La diferencia es que el SDR junior no enviará accidentalmente 500 correos a las 2 AM con el mensaje equivocado.

En esta lección, construirás la infraestructura de supervisión que previene los desastres mientras mantiene la inversión de tiempo por debajo de 15 minutos al día.

---

## La verificación de realidad de la supervisión

<InsightCard icon="⚠️" title="La verdad incómoda">
Si no estás dispuesto a invertir 15 minutos al día revisando el trabajo de tu SDR IA, no estás listo para ejecutar uno. El ahorro de tiempo viene de automatizar la investigación y los borradores — no de eliminar el juicio humano.
</InsightCard>

Establezcamos expectativas base:

<RangeSlider 
  label="¿Cuánto tiempo diario estás dispuesto a invertir en la supervisión del SDR IA?" 
  min={0} 
  max={60} 
  lowLabel="0 min (piloto automático total)" 
  highLabel="60 min (revisión completa)" 
  persistKey="autonomous-sdr-L7-time-commitment" 
/>

**Si seleccionaste menos de 10 minutos:** Estás en la zona de peligro. Espera incidentes de daño de marca en los próximos 30 días.

**Si seleccionaste 10-20 minutos:** Este es el punto óptimo para fundadores en solitario. Suficiente para detectar errores críticos, sin que niegue el beneficio de la automatización.

**Si seleccionaste 20+ minutos:** Quizás estás supervisando en exceso. Considera si un stack DIY (donde controlas cada envío) sería más simple.

<FlipCard 
  front="¿Qué significa realmente 'supervisión'?" 
  back="Revisión diaria de los envíos planeados, clasificaciones de respuestas y detección de anomalías. Calibración semanal de prompts, secuencias y métricas de rendimiento. Respuesta inmediata a escalaciones y activadores del interruptor de emergencia." 
/>

---

## La cola de revisión diaria: tu protocolo de 15 minutos

Cada mañana, antes de que tu SDR IA envíe un solo correo, revisas **la cola**. Esto no es negociable.

### Orden de prioridad (más crítico primero)

<SlideNavigation>
<Slide title="1. Cola de respuestas (5 minutos)">

**Por qué va primero:** Las respuestas mal clasificadas son el modo de fallo de mayor riesgo. Un prospecto "interesado" clasificado como "no interesado" recibe un correo de despedida en lugar de una invitación a reunión. Una queja de spam clasificada como "objeción" recibe una refutación en lugar de eliminación inmediata.

**Qué estás buscando:**

- Cualquier respuesta que contenga: "interesado", "llamada", "reunión", "precios", "demo"
- Cualquier respuesta que contenga: "eliminar", "baja", "parar", "spam"
- Cualquier respuesta de más de 2 oraciones (probablemente necesita matiz humano)
- Cualquier respuesta de un prospecto con tamaño de trato > $5K

**Acción:** Aprobar la clasificación de la IA O anular y gestionar manualmente.

<ExampleCard label="Ejemplo real: El rescate de $40K">
La IA clasificó esta respuesta como "no interesado": *"Esto parece interesante pero estamos atados a nuestra solución actual hasta el T3. ¿Pueden hacer seguimiento en junio?"*

La IA estaba a punto de enviar un correo de despedida. La revisión humana lo detectó, lo marcó como "caliente — seguimiento el 1 de junio" y ese prospecto se convirtió en un contrato anual de $40K.
</ExampleCard>

</Slide>

<Slide title="2. Primeros contactos con prospectos de alto valor (5 minutos)">

**Por qué importa:** Las primeras impresiones son permanentes. Una línea de personalización alucinada o un tono fuera de marca en un primer correo destruye la confianza antes de haberla construido.

**Qué estás revisando:**

- Cualquier correo de primer contacto con prospectos que tengan:
  - Tamaño de empresa > 100 empleados
  - Tamaño de trato estimado > $10K
  - Fuente de presentación cálida o referido
  - Industria en la que estás tratando de entrar

**Qué estás verificando:**

- La personalización es **factual** (¿no está alucinada?)
- El tono coincide con tu voz de marca
- La propuesta de valor es específica para su segmento
- El CTA es apropiado para la etapa de la relación

**La prueba FASP** (del Curso 21):

- ¿Es **(F)actual**? — ¿Puedes verificar esta afirmación?
- ¿Es **(A)ctualmente relevante**? — ¿Importa para su negocio?
- ¿Es **(E)specífico para esta persona**? — ¿O podría aplicar a cualquiera?
- ¿Estarías **(O)rgulloso** si supieran cómo lo encontraste?

</Slide>

<Slide title="3. Seguimientos de secuencias activas (3 minutos)">

**Por qué importa:** Los seguimientos a prospectos comprometidos necesitan conciencia del contexto. Es posible que la IA no recuerde que el Paso 2 recibió una respuesta, o que tenías una llamada agendada.

**Qué estás verificando:**

- Sin seguimientos a prospectos que ya respondieron (deberían estar en la cola de respuestas)
- Sin seguimientos a prospectos con reuniones agendadas
- El tiempo tiene sentido (no enviar el Paso 3 antes de que el Paso 2 se entregara)
- El mensaje reconoce el contexto anterior si aplica

**Revisión rápida:** Si el nombre del prospecto te parece familiar, abre su hilo completo antes de aprobar.

</Slide>

<Slide title="4. Escaneo de anomalías (2 minutos)">

**El panel rojo** — 5 métricas que deben activar una investigación inmediata:

<InteractiveChecklist
title="Lista de verificación diaria de anomalías"
persistKey="autonomous-sdr-L7-anomaly-check"
items={[
"Tasa de rebote < 5% (si es mayor, pausar e investigar)",
"Tasa de quejas < 0.05% (si es mayor, activar interruptor de emergencia inmediatamente)",
"Volumen de envío dentro del 20% de lo normal (picos repentinos = posible error masivo)",
"Tasa de respuesta dentro del rango esperado (caída repentina = problema de entregabilidad)",
"Sin patrones de personalización repetidos (señal de error de plantilla)"
]}
/>

**Si alguna métrica está en rojo:** Pausar los envíos, investigar la causa raíz, corregir antes de reanudar.

</Slide>
</SlideNavigation>

<InsightCard icon="⏱️" title="El compromiso de los 15 minutos">
Esta revisión diaria toma 15 minutos porque **no estás leyendo cada correo** — estás escaneando las excepciones. La IA maneja el 80% de los envíos rutinarios. Tú te enfocas en el 20% que conlleva riesgo.
</InsightCard>

---

## Interruptores de emergencia: tu sistema de parada de emergencia

Un interruptor de emergencia es exactamente lo que suena: un botón de pausa inmediata que detiene al SDR IA de enviar cualquier cosa hasta que lo reanudes manualmente.

**Necesitas los interruptores de emergencia configurados ANTES del lanzamiento, no después de un incidente.**

### La jerarquía del interruptor de emergencia

<ClassifyExercise
title="Empareja la situación con el nivel del interruptor de emergencia"
persistKey="autonomous-sdr-L7-kill-switch-classify"
categories={[
{ id: "tactical", label: "Táctico (pausar una campaña)", color: "#f59e0b" },
{ id: "strategic", label: "Estratégico (pausar todos los envíos)", color: "#ef4444" },
{ id: "nuclear", label: "Nuclear (pausar + desconectar dominios)", color: "#991b1b" }
]}
items={[
{
id: "1",
content: "Notas que una campaña tiene una tasa de rebote del 12% (las demás están normales)",
correctCategory: "tactical",
explanation: "Aislado a una campaña — pausarla, investigar la calidad de la lista, corregir y reanudar. Las otras campañas pueden continuar."
},
{
id: "2",
content: "Recibes 3 quejas de spam en 10 minutos de diferentes campañas",
correctCategory: "strategic",
explanation: "El patrón en varias campañas sugiere un problema sistémico (entregabilidad, contenido o targeting). Pausa todo hasta identificar la causa raíz."
},
{
id: "3",
content: "Google envía un aviso de 'violación del remitente masivo' y tus tasas de apertura caen al 2%",
correctCategory: "nuclear",
explanation: "La reputación del dominio está comprometida. Pausa todos los envíos Y desconecta los dominios de envío para prevenir más daño. Esto requiere reconstruir la infraestructura."
},
{
id: "4",
content: "La IA envía un correo con un hecho alucinado a 50 prospectos antes de que lo detectes",
correctCategory: "strategic",
explanation: "Pausa todos los envíos. Revisa la configuración del prompt de la IA. Envía disculpas manuales a los prospectos afectados. Reanuda solo después de corregir el prompt."
},
{
id: "5",
content: "Un prospecto responde enojado por recibir un seguimiento después de darse de baja",
correctCategory: "tactical",
explanation: "Incidente aislado. Pausa esa secuencia específica, verifica que la baja se procesó, disculpate con el prospecto, corrige la lista de supresión."
}
]}
/>

### Cómo configurar los interruptores de emergencia

La mayoría de las plataformas SDR IA tienen funciones de pausa integradas, pero a menudo están enterradas en la configuración. **Necesitas acceso con un clic.**

<TemplateBuilder
title="Tu configuración del interruptor de emergencia"
persistKey="autonomous-sdr-L7-kill-switch-config"
sections={[
{
id: "tactical",
title: "Interruptor de emergencia táctico (a nivel de campaña)",
fields: [
{
id: "trigger",
label: "¿Qué activa este nivel?",
placeholder: "ej., Tasa de rebote > 8% en una campaña, 2+ quejas de un segmento",
type: "textarea"
},
{
id: "action",
label: "Pasos de acción inmediata",
placeholder: "1. Pausar campaña en la plataforma\n2. Exportar lista afectada\n3. Investigar calidad de los datos\n4. Corregir y reanudar",
type: "textarea"
},
{
id: "access",
label: "Cómo acceder (URL o pasos)",
placeholder: "ej., Plataforma → Campañas → [Nombre de campaña] → Botón de pausa",
type: "text"
}
]
},
{
id: "strategic",
title: "Interruptor de emergencia estratégico (todos los envíos)",
fields: [
{
id: "trigger",
label: "¿Qué activa este nivel?",
placeholder: "ej., 3+ quejas de spam en 1 hora, alucinación detectada, tasa de respuesta cae 50%+",
type: "textarea"
},
{
id: "action",
label: "Pasos de acción inmediata",
placeholder: "1. Pausar todas las campañas\n2. Revisar las últimas 24 horas de envíos\n3. Identificar causa raíz\n4. Corregir antes de reanudar",
type: "textarea"
},
{
id: "access",
label: "Cómo acceder (URL o pasos)",
placeholder: "ej., Plataforma → Configuración → Toggle de pausa global",
type: "text"
}
]
},
{
id: "nuclear",
title: "Interruptor de emergencia nuclear (pausar + desconectar)",
fields: [
{
id: "trigger",
label: "¿Qué activa este nivel?",
placeholder: "ej., Dominio en lista negra, aviso de remitente masivo de Google, tasa de apertura < 3% por 48 horas",
type: "textarea"
},
{
id: "action",
label: "Pasos de acción inmediata",
placeholder: "1. Pausar todos los envíos\n2. Desconectar dominios de envío de la plataforma\n3. Contactar a experto en entregabilidad\n4. Planificar recuperación o reemplazo del dominio",
type: "textarea"
},
{
id: "access",
label: "Cómo acceder (URL o pasos)",
placeholder: "ej., Plataforma → Integraciones → Email → Desconectar; DNS → Eliminar registros SPF/DKIM",
type: "text"
}
]
}
]}
/>

<InsightCard icon="🔴" title="La opción nuclear no es teórica">
En 2025, un fundador en solitario que usaba una plataforma SDR IA tuvo su dominio principal en lista negra después de que la IA envió 800+ correos en 2 horas debido a un error de limitación de tasa. La recuperación tomó 4 meses y requirió un nuevo dominio. El interruptor de emergencia nuclear habría limitado el daño a 50 correos en lugar de 800.
</InsightCard>

---

## Reglas de escalación de excepciones: qué requiere tu atención

No todas las respuestas necesitan tu atención. No todos los envíos necesitan revisión. La clave es definir **reglas de escalación** que dirijan las cosas correctas a ti y dejen que la IA maneje lo rutinario.

### La matriz de escalación de excepciones

<ComparisonBuilder
title="Construye tus reglas de escalación"
persistKey="autonomous-sdr-L7-escalation-rules"
prompt="Para cada tipo de respuesta abajo, decide: ¿Debería escalarse a ti, o puede la IA manejarlo?"
expertExample="**Respuesta positiva/interesada:** SIEMPRE escalar — demasiado valiosa para arriesgar que la IA la maneje mal.
**Objeción (tiempo):** Escalar si el tamaño del trato > $5K, de lo contrario la IA maneja con la secuencia de objeción estándar.
**No interesado (cortés):** La IA maneja — enviar correo de cierre cordial.
**Queja de spam:** ESCALAR + PAUSAR — eliminación inmediata + investigar por qué se quejaron."
criteria={[
"Protege las oportunidades de alto valor",
"Previene daño de marca",
"No escala en exceso las respuestas rutinarias"
]}
/>

### Matriz de escalación estándar (personaliza para tu negocio)

| Tipo de respuesta                     | Acción del SDR IA                           | ¿Escalar a humano?        | ¿Por qué?                                      |
| ------------------------------------- | ------------------------------------------- | ------------------------- | ---------------------------------------------- |
| **Positiva / interesada**             | Redactar respuesta, EN ESPERA para revisión | ✅ SÍ — siempre           | Demasiado valioso para arriesgar un mal manejo |
| **Solicitud de reunión**              | Enviar enlace de calendario                 | ✅ SÍ — confirmar primero | Verificar disponibilidad y prepararse          |
| **Pregunta sobre producto/precios**   | Redactar respuesta, EN ESPERA               | ✅ SÍ — siempre           | Requiere exactitud y contexto                  |
| **Objeción (tiempo)**                 | Enviar manejo de objeción                   | ✅ Si trato > $5K         | El alto valor necesita toque humano            |
| **Objeción (presupuesto)**            | Enviar manejo de objeción                   | ✅ Si trato > $5K         | Puede necesitar precios personalizados         |
| **No interesado (cortés)**            | Enviar cierre cordial                       | ❌ No — la IA maneja      | Bajo riesgo, respuesta estándar                |
| **Solicitud de baja**                 | Eliminar inmediatamente                     | ❌ No — auto-procesar     | Requisito legal, sin juicio necesario          |
| **Enojado / queja**                   | PAUSAR todos los envíos a esta persona      | ✅ SÍ — inmediatamente    | Riesgo de daño de marca                        |
| **Confuso / poco claro**              | Redactar aclaración, EN ESPERA              | ✅ SÍ                     | Requiere interpretación humana                 |
| **Auto-respuesta / fuera de oficina** | Registrar y reagendar                       | ❌ No — la IA maneja      | Rutinario, sin acción necesaria                |

<RangeSlider 
  label="¿Cuál es tu umbral de tamaño de trato para escalar objeciones?" 
  min={1000} 
  max={50000} 
  step={1000}
  lowLabel="$1K" 
  highLabel="$50K" 
  persistKey="autonomous-sdr-L7-deal-threshold" 
/>

**Por qué importa:** Si tu trato promedio es de $2K, escalar cada objeción por encima de $5K significa revisar ~20% de las objeciones. Si tu trato promedio es de $20K, podrías escalar todo lo que esté por encima de $10K (50% de las objeciones). Calibra según tu economía.

---

## La sesión de calibración semanal: 30 minutos para mantenerte al día

La revisión diaria detecta errores tácticos. La calibración semanal corrige la **deriva sistémica**.

Los SDR IA no permanecen ajustados — se desvían. Los prompts que funcionaban en la Semana 1 producen resultados genéricos para la Semana 4. Las clasificaciones de respuestas que tenían 95% de precisión caen al 80% a medida que se acumulan los casos extremos. El volumen de envío sube gradualmente. La personalización se vuelve descuidada.

**Cada viernes (o lunes), dedica 30 minutos a la calibración.**

<SlideNavigation>
<Slide title="Paso de calibración 1: Revisión de rendimiento (10 min)">

Extrae las métricas semanales:

<InteractiveChecklist
title="Métricas semanales a revisar"
persistKey="autonomous-sdr-L7-weekly-metrics"
items={[
"Total de envíos (por campaña)",
"Tasa de rebote (debe ser < 3%)",
"Tasa de respuesta (positiva, negativa, neutral)",
"Tasa de agendamiento de reuniones (de respuestas positivas)",
"Tasa de quejas (debe ser < 0.05%)",
"Precisión de clasificación de respuestas (verificar al azar 10 respuestas)"
]}
/>

**Qué estás buscando:**

- **Tendencias:** ¿La tasa de respuesta está bajando? ¿La tasa de rebote va subiendo?
- **Valores atípicos:** ¿Una campaña rindió 3 veces mejor que las demás? ¿Por qué?
- **Deriva:** ¿Las puntuaciones de calidad de personalización están bajando semana a semana?

</Slide>

<Slide title="Paso de calibración 2: Ajuste de prompts (10 min)">

Revisa 5-10 correos generados por IA de la semana pasada. Pregúntate:

1. **¿Esto todavía suena como yo?** (Deriva de voz de marca)
2. **¿La personalización sigue siendo específica?** (Deriva hacia lo genérico)
3. **¿Estamos repitiendo los mismos patrones?** (Fatiga de plantilla)

**Correcciones comunes:**

- Agregar ejemplos negativos a los prompts ("No digas X, di Y en cambio")
- Refrescar las fuentes de datos de personalización (nuevos eventos desencadenantes, publicaciones recientes)
- Rotar los ángulos de propuesta de valor (si has estado liderando con ROI por 4 semanas, prueba reducción de riesgo)

<ExampleCard label="Ejemplo real de deriva de prompt">
**Resultado de la Semana 1:** *"Noté que tu equipo publicó sobre escalar la producción de contenido — la mayoría de las agencias choca contra un muro a los 50 artículos/mes sin automatización del flujo de trabajo."*

**Resultado de la Semana 4 (mismo prompt):** _"Vi que te enfocas en contenido. Ayudamos con eso."_

**La corrección:** Se agregó al prompt: _"Siempre referencia un número específico, métrica o evento reciente. Nunca uses frases vagas como 'te enfocas en' o 'ayudamos con'."_
</ExampleCard>

</Slide>

<Slide title="Paso de calibración 3: Actualización de lista de exclusión (5 min)">

Tu SDR IA debe mantener una **lista de exclusión** de:

- Bajas (automático)
- Competidores (manual)
- Clientes pasados (manual)
- Prospectos con los que ya has hablado personalmente (manual)
- Industrias/segmentos que ya no estás targeting (manual)

**Tarea semanal:** Agregar cualquier nueva exclusión de los últimos 7 días.

**Por qué importa:** Sin actualizaciones regulares, la IA volverá a contactar a personas que ya has descalificado, creando momentos incómodos de "¿no ya me enviaste un correo?"

</Slide>

<Slide title="Paso de calibración 4: Ajustes de secuencia (5 min)">

Revisa las secuencias activas:

- ¿Los intervalos de seguimiento siguen siendo apropiados? (Quizás 3 días es muy agresivo, mover a 5)
- ¿Estamos enviando demasiados pasos? (Quizás las secuencias de 7 pasos deberían ser de 5)
- ¿Están funcionando los correos de despedida? (Si sí, mantener; si no, revisar o eliminar)

**Los datos a revisar:**

- Tasa de respuesta por paso de secuencia (si el Paso 4+ obtiene 0 respuestas, cortarlo)
- Tasa de baja por paso (si el Paso 5 tiene 3 veces más bajas que el Paso 2, es demasiado agresivo)

</Slide>
</SlideNavigation>

<InsightCard icon="📊" title="Por qué importa la calibración semanal">
Los fundadores en solitario que omiten la calibración semanal reportan un 40% más de incidentes de daño de marca y un 25% menos de tasa de respuesta para el Mes 3. La IA no se auto-corrige — tienes que ajustarla tú.
</InsightCard>

---

## Simulación: Clasificar la bandeja de entrada

Estás a punto de ver 15 resultados del SDR IA de las últimas 24 horas. Tu trabajo: **clasificar cada uno.**

- ✅ **Aprobar** — La acción de la IA es correcta, dejar que proceda
- ✏️ **Editar** — La acción de la IA necesita modificación antes de proceder
- 🚨 **Escalar** — Esto necesita manejo humano, no dejes que la IA lo toque
- 🛑 **Interruptor de emergencia** — Esto es un problema sistémico, pausar todo

<MiniRoleplay
scenario="**Respuesta del prospecto:** 'Esto parece interesante pero acabamos de firmar un contrato de 2 años con tu competidor. ¿Pueden volver en 18 meses?'

**Clasificación de la IA:** No interesado (enviar correo de despedida)

**¿Qué haces?**"
role="Eres el fundador revisando esta clasificación"
persistKey="autonomous-sdr-L7-roleplay-1"
modelResponse="**ESCALAR + EDITAR.** Esto no es 'no interesado' — es 'interesado pero el tiempo no es el correcto'. Anular la clasificación a 'Caliente — Seguimiento [18 meses desde ahora]'. Agregar al CRM con recordatorio. NO enviar correo de despedida. Este prospecto acaba de decirte exactamente cuándo volver a contactarlo."
/>

<MiniRoleplay
scenario="**Correo de primer contacto generado por IA:** 'Hola [Nombre], noté que tu empresa recientemente levantó una Serie B y está contratando agresivamente. La mayoría de las startups de rápido crecimiento luchan con [punto de dolor].'

**Empresa del prospecto:** Bootstrapped, 8 empleados, sin financiamiento reciente.

**¿Qué haces?**"
role="Estás revisando este correo antes de que se envíe"
persistKey="autonomous-sdr-L7-roleplay-2"
modelResponse="**INTERRUPTOR DE EMERGENCIA (Táctico).** Esta es una personalización alucinada — la IA inventó la afirmación de la Serie B. Pausar esta campaña inmediatamente. Revisar la fuente de datos que alimenta a la IA. Verificar si otros correos en este lote tienen alucinaciones similares. Corregir el prompt para exigir verificación factual antes de enviar. NO enviar este correo."
/>

<MiniRoleplay
scenario="**Alerta del panel:** La tasa de rebote se disparó al 18% en las últimas 2 horas (lo normal es 2-3%). Afecta a una campaña que apunta a 'VP de Marketing en empresas SaaS de 50-200 empleados'.

**¿Qué haces?**"
role="Estás respondiendo a esta anomalía"
persistKey="autonomous-sdr-L7-roleplay-3"
modelResponse="**INTERRUPTOR DE EMERGENCIA (Táctico).** Pausar esta campaña inmediatamente. Exportar la lista y verificar la calidad de los datos — probablemente la verificación de correos falló o la fuente de la lista es mala. Investigar: ¿Son estos correos reales? ¿Son basados en roles (info@, ventas@) que rebotan más? Corregir la lista, re-verificar correos, luego reanudar. La alta tasa de rebote dañará la reputación del dominio si continúa."
/>

---

## Tu guía de supervisión: constrúyela ahora

Aprendiste la teoría. Ahora construye el artefacto que usarás realmente cada día.

<TemplateBuilder
title="Lista de verificación de supervisión diaria del SDR IA"
persistKey="autonomous-sdr-L7-daily-checklist"
sections={[
{
id: "morning",
title: "Revisión matutina (15 minutos)",
fields: [
{
id: "replies",
label: "Revisión de cola de respuestas (5 min)",
placeholder: "1. Buscar palabras clave 'interesado'\n2. Verificar clasificación de la IA\n3. Escalar respuestas de alto valor\n4. Aprobar respuestas rutinarias de 'no interesado'",
type: "textarea"
},
{
id: "first-touch",
label: "Primeros contactos de alto valor (5 min)",
placeholder: "1. Filtrar por tamaño de trato > $X\n2. Ejecutar prueba FASP en personalización\n3. Verificar voz de marca\n4. Aprobar o editar",
type: "textarea"
},
{
id: "sequences",
label: "Verificación de secuencias activas (3 min)",
placeholder: "1. Verificar sin seguimientos a prospectos que respondieron\n2. Comprobar que el tiempo tiene sentido\n3. Aprobar seguimientos rutinarios",
type: "textarea"
},
{
id: "anomalies",
label: "Escaneo del panel rojo (2 min)",
placeholder: "1. ¿Tasa de rebote < 5%?\n2. ¿Tasa de quejas < 0.05%?\n3. ¿Volumen de envío normal?\n4. ¿Tasa de respuesta normal?\n5. ¿Sin errores repetidos?",
type: "textarea"
}
]
},
{
id: "friday",
title: "Calibración del viernes (30 minutos)",
fields: [
{
id: "metrics",
label: "Revisión de métricas semanales (10 min)",
placeholder: "1. Extraer envíos, rebotes, respuestas, reuniones\n2. Comparar con la semana pasada\n3. Identificar tendencias (arriba/abajo/plano)\n4. Marcar valores atípicos",
type: "textarea"
},
{
id: "prompts",
label: "Verificación de calidad de prompts (10 min)",
placeholder: "1. Revisar 5-10 correos recientes generados por IA\n2. Verificar deriva de voz\n3. Verificar personalización genérica\n4. Actualizar prompts con ejemplos negativos",
type: "textarea"
},
{
id: "exclusions",
label: "Actualización de lista de exclusión (5 min)",
placeholder: "1. Agregar nuevas bajas\n2. Agregar prospectos descalificados\n3. Agregar clientes pasados\n4. Verificar sincronización de lista con el SDR IA",
type: "textarea"
},
{
id: "sequences",
label: "Ajuste de secuencias (5 min)",
placeholder: "1. Verificar tasa de respuesta por paso\n2. Ajustar intervalos si es necesario\n3. Cortar pasos de bajo rendimiento\n4. Probar nuevas variantes de correo de despedida",
type: "textarea"
}
]
}
]}
/>

---

## La verificación de realidad del presupuesto de tiempo de supervisión

Hagamos los cálculos sobre lo que realmente te cuesta la supervisión:

<ScenarioSimulator
title="Calculadora de tiempo de supervisión vs. valor"
persistKey="autonomous-sdr-L7-time-calculator"
levers={[
{ id: "dailyMin", label: "Tiempo de revisión diaria (minutos)", min: 5, max: 60, step: 5, defaultValue: 15 },
{ id: "weeklyMin", label: "Tiempo de calibración semanal (minutos)", min: 0, max: 120, step: 15, defaultValue: 30 },
{ id: "hourlyRate", label: "Tu tarifa por hora ($)", min: 50, max: 500, step: 50, defaultValue: 150 },
{ id: "meetingsPerMonth", label: "Reuniones agendadas por mes", min: 2, max: 30, step: 2, defaultValue: 10 },
{ id: "dealSize", label: "Tamaño promedio de trato ($)", min: 1000, max: 100000, step: 1000, defaultValue: 10000 },
{ id: "closeRate", label: "Tasa de cierre (%)", min: 5, max: 50, step: 5, defaultValue: 20 }
]}
outputs={[
{
id: "monthlyTime",
label: "Tiempo de supervisión mensual (horas)",
formula: "((dailyMin * 30) + (weeklyMin * 4)) / 60",
unit: "hrs",
precision: 1
},
{
id: "timeCost",
label: "Costo mensual de tiempo",
formula: "(((dailyMin * 30) + (weeklyMin * 4)) / 60) * hourlyRate",
unit: "$",
precision: 0
},
{
id: "revenue",
label: "Ingresos mensuales generados",
formula: "meetingsPerMonth * (closeRate / 100) * dealSize",
unit: "$",
precision: 0
},
{
id: "roi",
label: "ROI (ingresos / costo de tiempo)",
formula: "(meetingsPerMonth * (closeRate / 100) * dealSize) / ((((dailyMin * 30) + (weeklyMin * 4)) / 60) * hourlyRate)",
unit: "x",
precision: 1
}
]}
insight="Con {monthlyTime} horas/mes de supervisión, estás invirtiendo ${timeCost} de tu tiempo. Si eso genera $`{revenue}` en ingresos, tu ROI es `{roi}`x. Si el ROI < 3x, considera si el SDR IA vale la pena vs. un stack DIY más simple."
/>

**El punto de referencia:** Si el ROI de tu supervisión está por debajo de 3x, estás gastando demasiado tiempo en relación con el resultado. Ya sea:

1. Reduce el tiempo de supervisión (mover más a piloto automático — arriesgado)
2. Mejora el rendimiento del SDR IA (mejores prompts, mejores listas)
3. Cambia a un stack DIY donde controlas cada envío (más simple, menos supervisión necesaria)

---

## Resumen: Los compromisos innegociables

<InteractiveChecklist
title="Tus compromisos de supervisión del SDR IA"
persistKey="autonomous-sdr-L7-commitments"
items={[
"Dedicaré 15 minutos cada mañana a revisar la cola diaria (respuestas, envíos de alto valor, anomalías)",
"Tengo interruptores de emergencia configurados en 3 niveles (táctico, estratégico, nuclear) y sé cómo acceder a ellos en menos de 30 segundos",
"Definí las reglas de escalación para cada tipo de respuesta y no dejaré que la IA maneje las respuestas de alto valor o enojadas",
"Dedicaré 30 minutos cada viernes a la calibración (métricas, prompts, exclusiones, secuencias)",
"Rastreo las métricas del panel rojo diariamente y pausaré inmediatamente si se supera algún umbral",
"Entiendo que 'autónomo' no significa 'sin supervisión' — la IA es un SDR junior, no un reemplazo del juicio"
]}
/>

**La realidad:** Si no puedes comprometerte con estos 6 puntos, no estás listo para una plataforma SDR IA. Un stack DIY (Instantly + Apollo + ChatGPT) te servirá mejor porque naturalmente revisarás cada envío mientras lo construyes.

**La ventaja:** Si SÍ te comprometes con estos patrones, detectarás más del 90% de los errores antes de que lleguen a los prospectos, mantendrás la confianza en la marca y obtendrás el ahorro de tiempo que prometen los SDR IA sin los desastres que pueden causar.

---

## ¿Qué sigue?

En la **Lección 8**, aplicaremos la **Matriz de Fallos de Automatización** específicamente a los SDR IA — un marco 2x2 que te dice exactamente qué tareas automatizar, cuáles bloquear con revisión humana, cuáles mantener completamente humanas y cuáles eliminar por completo.

Clasificarás cada función del SDR IA (redacción de correos, gestión de respuestas, DMs de LinkedIn, investigación de prospectos, tiempo de secuencia) en la matriz y construirás tu **Árbol de Decisión de Automatización** — el artefacto que te previene de automatizar las cosas equivocadas.
