---
title: "Recetas de automatización para retención"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 37: Retención y Prevención de Abandono"
lesson: 9
---

Estás mirando tu lista de clientes un domingo por la noche. Tres cuentas acaban de pasar de puntuación de salud Verde a Amarilla. Dos no han iniciado sesión en 12 días. Uno acaba de hacer downgrade. Y estás pensando: _"No puedo estar monitoreando manualmente 80 clientes cada semana. Tiene que haber una mejor manera."_

La hay. Se llaman **recetas de automatización** — flujos de trabajo pequeños y repetibles que ejecutan jugadas de retención sin que toques cada cuenta. No es piloto automático de "configúralo y olvídalo". Más bien "configúralo y dirige" — la automatización maneja el trabajo repetitivo, tú manejas las intervenciones de alto impacto.

Al final de esta lección, tendrás 5-7 recetas de automatización que ejecutan tu sistema de retención mientras duermes.

---

## La paradoja de la automatización

Aquí está la tensión: la retención es profundamente personal (los clientes quieren sentirse vistos), pero también es repetitiva (los mismos patrones ocurren una y otra vez). La solución no es elegir entre automatización y personalización — es **automatizar la detección y la primera respuesta, luego personalizar la intervención**.

<FlipCard
  front="La regla de automatización de retención"
  back="Automatiza el monitoreo y el primer contacto. Personaliza la jugada de salvamento. Un robot puede detectar una caída en la puntuación de salud. Solo tú puedes hacer la llamada de recuperación."
/>

Piénsalo como un sistema de triaje hospitalario. Los sensores monitorean signos vitales 24/7 (automatización). Cuando algo se pone crítico, un doctor humano interviene (tú). No te estás reemplazando — te estás dando superpoderes.

<InsightCard icon="⚡" title="La realidad del fundador en solitario">
Tienes 2-3 horas por semana para CS. Sin automatización, ese tiempo se va en *encontrar* problemas. Con automatización, se va en *resolverlos*.
</InsightCard>

---

## Receta 1: El detector de inactividad

**Disparador:** El cliente no ha iniciado sesión en 7 días
**Acción:** Enviar email de reactivación #1 (empujón gentil)
**Escalación:** Si no inicia sesión para el Día 14 → Email #2 (recordatorio de valor). Si no inicia sesión para el Día 21 → Marcar para contacto personal.

### Cómo construirlo

<SlideNavigation>
<Slide title="Paso 1: Configura el disparador">

**Herramientas necesarias:** Analítica de producto (GA4, Mixpanel o consulta simple a base de datos) + Automatización de email (ConvertKit, Customer.io o Zapier)

**La lógica:**

```
IF last_login_date < (today - 7 days)
AND reactivation_email_1_sent = false
THEN send reactivation_email_1
```

**Versión no-code:** Filtro de Zapier vigilando tu base de datos de usuarios o stream de eventos de GA4. Cuando `last_login` es mayor a 7 días, dispara el email.

**Opción económica:** Exportación manual semanal de tu base de datos → filtrar en Google Sheets → carga masiva a herramienta de email.

</Slide>

<Slide title="Paso 2: Escribe la secuencia de emails">

**Email 1 (Día 7-10):**

```
Asunto: Un breve check-in

Hola [Nombre],

Noté que no has entrado a [Producto] en aproximadamente una semana. ¿Todo bien?

Si estás atorado en algo o simplemente andas ocupado, no te preocupes — estoy aquí para ayudarte.

[Tu nombre]
Fundador, [Producto]
```

**Email 2 (Día 14):**

```
Asunto: Te estás perdiendo [valor específico]

Hola [Nombre],

Desde la última vez que iniciaste sesión, [actualización reciente o funcionalidad].

Esto es lo que podrías estar haciendo con [Producto]:
- [Beneficio 1]
- [Beneficio 2]
- [Beneficio 3]

¿Quieres un recorrido rápido? Solo responde.

[Tu nombre]
```

**Email 3 (Día 21):**

```
Asunto: ¿Puedo ayudarte?

Hola [Nombre],

Quiero asegurarme de que [Producto] siga funcionando para ti.

Si algo no está bien, me encantaría arreglarlo. Si tus necesidades cambiaron, hablemos de opciones (incluyendo una pausa si solo necesitas tiempo).

[Tu nombre]
```

</Slide>

<Slide title="Paso 3: Configura reglas de escalación">

**Si el cliente responde a cualquier email:** Marcar para seguimiento personal (responde dentro de 24 horas).

**Si el cliente inicia sesión después del Email 1 o 2:** Detener secuencia, marcar como "reactivado," enviar confirmación de éxito.

**Si no hay respuesta después del Email 3 Y el valor de la cuenta es >$200/mes (aprox. $4,000 MXN):** Agregar a la cola de "contacto personal" para llamada del fundador.

**Si no hay respuesta después del Email 3 Y el valor de la cuenta es &lt;$200/mes:** Enviar email final de "oferta de pausa," luego aceptar abandono natural si no hay respuesta.

</Slide>
</SlideNavigation>

<TemplateBuilder
title="Tu receta de detector de inactividad"
persistKey="retention-L9-dormancy"
sections={[
{
id: "trigger",
title: "Definición del disparador",
fields: [
{ id: "days", label: "Días de inactividad antes del Email 1", placeholder: "7", type: "number" },
{ id: "source", label: "Fuente de datos para último inicio de sesión", placeholder: "ej., GA4, base de datos del producto", type: "text" }
]
},
{
id: "email1",
title: "Email 1 (Empujón gentil)",
fields: [
{ id: "subject", label: "Línea de asunto", placeholder: "Un breve check-in", type: "text" },
{ id: "body", label: "Cuerpo del email", placeholder: "Hola [Nombre], noté que...", type: "textarea" }
]
},
{
id: "escalation",
title: "Reglas de escalación",
fields: [
{ id: "highvalue", label: "Umbral de alto valor (para contacto personal)", placeholder: "$200/mes (~$4,000 MXN)", type: "text" },
{ id: "action", label: "Acción para no-respondedores de alto valor", placeholder: "Agregar a cola de llamadas", type: "text" }
]
}
]}
/>

---

## Receta 2: El empujón de adopción de funcionalidades

**Disparador:** El cliente ha estado activo por 14+ días pero solo usa 1 funcionalidad
**Acción:** Enviar email de spotlight de funcionalidad presentando la Funcionalidad #2
**Escalación:** Si adoptan la Funcionalidad #2 → presentar la Funcionalidad #3 después de 7 días. Si no hay adopción después de 14 días → tooltip in-app.

### La lógica

Los clientes que usan 3+ funcionalidades abandonan 50-70% menos. Pero la mayoría de los clientes no exploran por su cuenta. Necesitas **presentar funcionalidades progresivamente** basándote en hitos de uso.

<ExampleCard label="Caso de estudio: La presentación gradual de funcionalidades">
Mariana, fundadora de SaaS, tenía 8 funcionalidades pero la mayoría de los clientes solo usaban la principal (creación de documentos). Construyó una secuencia de adopción de funcionalidades:

- **Día 14:** Email presentando plantillas (Funcionalidad #2)
- **Día 21:** Email presentando colaboración (Funcionalidad #3)
- **Día 30:** Email presentando integraciones (Funcionalidad #4)

Resultado: La amplitud de funcionalidades aumentó de 1.2 funcionalidades/cliente a 2.8 funcionalidades/cliente. El abandono bajó de 6% a 3.5% mensual.
</ExampleCard>

### Cómo construirlo

<SlideNavigation>
<Slide title="Paso 1: Mapea tus funcionalidades">

Lista todas las funcionalidades de tu producto. Para cada una, responde:

1. ¿Cuál es la tasa de adopción? (% de clientes que la han usado)
2. ¿Es una funcionalidad "pegajosa"? (¿Los clientes que la usan abandonan menos?)
3. ¿Cuál es el prerrequisito? (¿Necesitan dominar la Funcionalidad A antes de que la Funcionalidad B tenga sentido?)

**Ejemplo:**
| Funcionalidad | Tasa de adopción | ¿Pegajosa? | Prerrequisito |
|---------------|------------------|------------|---------------|
| Acción principal (crear doc) | 95% | Alta | Ninguno |
| Plantillas | 30% | Alta | Acción principal |
| Colaboración | 20% | Muy alta | Acción principal |
| Integraciones | 10% | Media | Plantillas + Colaboración |

</Slide>

<Slide title="Paso 2: Construye el calendario de goteo">

**El patrón:**

- Día 1-7: Enfoque en dominar la funcionalidad principal (onboarding)
- Día 14: Presentar Funcionalidad #2 (mayor valor, menor fricción)
- Día 21: Presentar Funcionalidad #3 (si adoptaron la #2)
- Día 30: Presentar Funcionalidad #4 (funcionalidades de usuario avanzado)

**Lógica del disparador:**

```
IF days_since_signup >= 14
AND feature_2_used = false
AND core_feature_used >= 3 times
THEN send feature_2_spotlight_email
```

</Slide>

<Slide title="Paso 3: Escribe el email de spotlight">

**Plantilla:**

```
Asunto: [Nombre de funcionalidad] te ahorrará [tiempo/esfuerzo]

Hola [Nombre],

Noté que has estado [acción principal] en [Producto] — ¡buen trabajo!

Aquí hay algo que lo hará aún más rápido: [Funcionalidad #2].

[Funcionalidad #2] te permite [beneficio específico]. Así funciona:
[Explicación de 2-3 oraciones o GIF]

¿Quieres probarla? [Botón CTA o enlace]

[Tu nombre]
```

**Clave:** Conecta la nueva funcionalidad con algo que ya están haciendo. "Estás creando documentos manualmente — las plantillas automatizan eso."

</Slide>
</SlideNavigation>

<ComparisonBuilder
title="Tu email de spotlight de funcionalidad"
persistKey="retention-L9-feature-email"
prompt="Escribe un email de spotlight de funcionalidad para tu producto"
expertExample="Asunto: Las plantillas te ahorrarán 10 minutos por documento\n\nHola Mariana,\n\nNoté que has creado 5 documentos en DocFlow esta semana — ¡increíble!\n\nAquí hay algo que acelerará eso: Plantillas.\n\nEn vez de empezar de cero cada vez, puedes guardar tus formatos más usados como plantillas y reutilizarlos con un clic.\n\nPruébalo: [Enlace a plantillas]\n\n— Alejandro"
criteria={[
"Hace referencia a comportamiento específico del usuario (ej., 'creaste 5 documentos')",
"Explica el beneficio de la funcionalidad en 1-2 oraciones",
"Incluye un CTA claro (enlace o botón)",
"Conecta la nueva funcionalidad con el flujo de trabajo existente"
]}
/>

---

## Receta 3: El flujo de recuperación de pagos

**Disparador:** El pago falla
**Acción:** Secuencia automatizada de dunning (3 emails en 7 días) + lógica de reintento
**Escalación:** Si el pago sigue fallando después de 7 días Y el valor de la cuenta es >$200/mes → contacto personal

### La realidad de los pagos fallidos

El 30-50% de los pagos fallidos **no son cancelaciones intencionales**. Son tarjetas vencidas, fondos insuficientes o rechazos bancarios. Con recuperación automatizada, puedes salvar el 50-70% de estos clientes.

<InsightCard icon="💳" title="La ventana de recuperación de pagos">
Tienes 7-10 días para recuperar un pago fallido antes de que el cliente se desconecte mentalmente. Después de eso, la tasa de recuperación cae por debajo del 15%.
</InsightCard>

### Cómo construirlo

La mayoría de los procesadores de pago (Stripe, Paddle) tienen dunning integrado. Pero puedes agregar capas adicionales:

<SlideNavigation>
<Slide title="Paso 1: Habilita reintentos inteligentes">

**Stripe:** Habilita Smart Retries en el dashboard (reintenta automáticamente pagos fallidos en momentos óptimos)

**Paddle:** El dunning es automático, pero puedes personalizar los tiempos de email

**Alternativa manual:** Zapier vigila el webhook `payment.failed` → dispara secuencia de email

</Slide>

<Slide title="Paso 2: Construye la secuencia de emails">

**Email 1 (Inmediatamente después del fallo):**

```
Asunto: Problema de pago con tu cuenta de [Producto]

Hola [Nombre],

Intentamos procesar tu pago de [Producto] pero no se completó.

Esto normalmente pasa cuando una tarjeta vence o hay un problema temporal con el banco.

Actualiza tu método de pago aquí: [Enlace]

[Tu nombre]
```

**Email 2 (Día 3):**

```
Asunto: Tu cuenta de [Producto] se pausará en 4 días

Hola [Nombre],

Solo un aviso: aún no hemos podido procesar tu pago.

Tu cuenta se pausará el [Fecha] a menos que actualices tu información de pago.

Actualiza aquí: [Enlace]

¿Necesitas ayuda? Solo responde.

[Tu nombre]
```

**Email 3 (Día 7):**

```
Asunto: Última oportunidad para mantener tu cuenta de [Producto] activa

Hola [Nombre],

Tu cuenta de [Producto] se pausará hoy a menos que podamos procesar el pago.

Si tienes problemas, avísame — podemos encontrar una solución (downgrade, pausa, etc.).

Actualizar pago: [Enlace]

[Tu nombre]
```

</Slide>

<Slide title="Paso 3: Configura reglas de escalación">

**Si el pago se procesa en cualquier momento:** Detener secuencia, enviar confirmación de "gracias".

**Si el pago sigue fallando después del Día 7 Y el valor de la cuenta es >$200/mes (aprox. $4,000 MXN):** Agregar a la cola de "contacto personal". Llamar o enviar mensaje por WhatsApp: "Noté que tu pago no se procesó. ¿Todo bien? ¿Podemos ayudar?"

**Si el pago sigue fallando después del Día 7 Y el valor de la cuenta es &lt;$200/mes:** Pausar cuenta, enviar email final de "guardaremos tus datos por 30 días".

</Slide>
</SlideNavigation>

<RangeSlider
  label="¿Qué % de tus pagos fallidos recuperas actualmente?"
  min={0}
  max={100}
  lowLabel="0%"
  highLabel="100%"
  persistKey="retention-L9-recovery-rate"
/>

**Benchmark:** Con dunning automatizado, deberías recuperar el 50-70%. Si estás por debajo del 30%, tus emails son demasiado agresivos o los tiempos de reintento están mal configurados.

---

## Receta 4: El detector de señales de expansión

**Disparador:** El cliente alcanza un umbral de uso (ej., 80% del límite del plan) O usa 3+ funcionalidades consistentemente
**Acción:** Marcar para contacto de expansión
**Escalación:** Enviar email de sugerencia de upgrade → si no hay respuesta en 7 días, agregar a cola de "llamada de expansión"

### La oportunidad de expansión

Tus mejores candidatos para expansión no están distribuidos al azar. Son clientes que:

1. Alcanzan límites de uso (necesitan más capacidad)
2. Usan múltiples funcionalidades (alto engagement)
3. Han sido clientes por 3+ meses (valor comprobado)
4. Tienen buen historial de pago (bajo riesgo)

<ExampleCard label="Caso de estudio: El upsell automático">
Ricardo, fundador de SaaS, tenía un plan de $50/mes (aprox. $1,000 MXN) con límite de 10 proyectos. Construyó una automatización:

**Disparador:** El cliente crea su 8vo proyecto (80% del límite)

**Acción:** Email diciendo "¡La estás rompiendo! Vas en 8/10 proyectos. ¿Quieres hacer upgrade a ilimitado por $99/mes?"

**Resultado:** El 35% de los clientes que activaron el disparador hicieron upgrade en 14 días. Eso son $1,715/mes en ingresos de expansión con una sola automatización.
</ExampleCard>

### Cómo construirlo

<TemplateBuilder
title="Tu receta de señal de expansión"
persistKey="retention-L9-expansion"
sections={[
{
id: "signals",
title: "Señales de expansión",
fields: [
{ id: "usage", label: "Umbral de uso (% del límite del plan)", placeholder: "80%", type: "number" },
{ id: "features", label: "Umbral de amplitud de funcionalidades", placeholder: "3+ funcionalidades", type: "text" },
{ id: "tenure", label: "Antigüedad mínima del cliente", placeholder: "90 días", type: "number" }
]
},
{
id: "email",
title: "Email de expansión",
fields: [
{ id: "subject", label: "Línea de asunto", placeholder: "Estás listo para [plan superior]", type: "text" },
{ id: "body", label: "Cuerpo del email", placeholder: "Hola [Nombre], noté que vas en 8/10 proyectos...", type: "textarea" }
]
},
{
id: "escalation",
title: "Escalación",
fields: [
{ id: "noresponse", label: "Acción si no hay respuesta en 7 días", placeholder: "Agregar a cola de llamadas de expansión", type: "text" }
]
}
]}
/>

**La plantilla del email:**

```
Asunto: Estás listo para [plan superior]

Hola [Nombre],

Noté que vas en [X/Y límite] en tu plan [plan actual]. Claramente le estás sacando valor a [Producto] — ¡increíble!

La cosa es: estás a punto de alcanzar tu límite. En vez de frenar, ¿quieres hacer upgrade a [plan superior]?

[Plan superior] te da:
- [Beneficio 1]
- [Beneficio 2]
- [Beneficio 3]

Haz upgrade aquí: [Enlace]

O si quieres platicarlo, solo responde.

[Tu nombre]
```

---

## Receta 5: La alerta de puntuación de salud

**Disparador:** La puntuación de salud del cliente baja de Verde (75-100) a Amarillo (50-74) o de Amarillo a Rojo (0-49)
**Acción:** Alertarte vía Slack/WhatsApp/email + marcar para revisión
**Escalación:** Amarillo → monitoreo semanal. Rojo → contacto personal inmediato.

### El sistema de alerta temprana

Esta es la **meta-automatización** que alimenta todo lo demás. Tu puntuación de salud (de la Lección 2) debería alertarte automáticamente cuando los clientes se mueven entre zonas.

<FlipCard
  front="Por qué importan las alertas de puntuación de salud"
  back="Sin alertas, solo notas el abandono cuando ya es tarde (solicitud de cancelación). Con alertas, detectas la caída 2-4 semanas antes cuando la tasa de salvamento es del 40-60% en vez del 10-15%."
/>

### Cómo construirlo

<SlideNavigation>
<Slide title="Opción 1: Hoja de cálculo + Zapier">

**Configuración:**

1. Tu puntuación de salud vive en Google Sheets (actualizada semanalmente vía exportación manual o feeds de datos de Zapier)
2. Zapier vigila la columna "Zona de salud"
3. Cuando un cliente se mueve de Verde → Amarillo o Amarillo → Rojo, Zapier te envía un mensaje de Slack o WhatsApp

**Receta de Zapier:**

```
Disparador: Fila de Google Sheets actualizada
Filtro: "Zona de salud" cambió de "Verde" a "Amarillo" O de "Amarillo" a "Rojo"
Acción: Enviar mensaje de Slack al canal #salud-clientes
```

</Slide>

<Slide title="Opción 2: Alertas de Baremetrics / ChartMogul">

Si usas Baremetrics o ChartMogul para analítica de ingresos, tienen alertas integradas de "salud del cliente" basadas en cambios de MRR, caídas de uso y declives de engagement.

**Configuración:**

1. Define tus umbrales de alerta (ej., "MRR bajó 20% en 30 días")
2. Conecta a Slack o email
3. Las alertas se disparan automáticamente

**Costo:** $50-100/mes (vale la pena si tienes 50+ clientes)

</Slide>

<Slide title="Opción 3: Dashboard personalizado (Avanzado)">

Si eres técnico, construye un dashboard simple que:

1. Jale datos de tu base de datos del producto (inicios de sesión, uso de funcionalidades)
2. Jale datos de tu ESP (engagement de email)
3. Jale datos de Stripe (comportamiento de pago)
4. Calcule la puntuación de salud
5. Envíe alertas vía webhook a Slack o WhatsApp

**Herramientas:** Retool, Zapier Tables o script personalizado en Python

</Slide>
</SlideNavigation>

<RangeSlider
  label="¿Qué tan rápido detectas actualmente cuando la salud de un cliente declina?"
  min={1}
  max={30}
  lowLabel="El mismo día"
  highLabel="30+ días"
  persistKey="retention-L9-detection-speed"
/>

**Meta:** Deberías detectarlo dentro de 7 días. Más rápido es mejor, pero hay rendimientos decrecientes después de revisiones diarias (demasiado ruido).

---

## Receta 6: La automatización del ciclo de feedback

**Disparador:** El cliente envía encuesta NPS, encuesta de salida o ticket de soporte
**Acción:** Enrutar a la cola apropiada (expansión, salvamento, solicitud de funcionalidad) + etiquetar sentimiento automáticamente
**Escalación:** NPS 0-6 → contacto inmediato del fundador. NPS 9-10 → cola de expansión.

### Por qué esto importa

El feedback es una mina de oro, pero solo si actúas al respecto. La mayoría de los fundadores en solitario recopilan puntuaciones NPS y luego... no hacen nada. Esta automatización asegura que cada pieza de feedback se enrute a la acción correcta.

<InsightCard icon="📊" title="La matriz de acción NPS">
- **NPS 0-6 (Detractores):** Jugada de salvamento inmediata — llama dentro de 24 horas
- **NPS 7-8 (Pasivos):** Empujón de adopción de funcionalidades — les gusta pero no están impresionados
- **NPS 9-10 (Promotores):** Oportunidad de expansión + solicitud de referido
</InsightCard>

### Cómo construirlo

**Paso 1:** Usa una herramienta simple de NPS (Delighted, Typeform o integrada en tu producto)

**Paso 2:** Zapier vigila las nuevas respuestas de NPS

**Paso 3:** Basado en la puntuación, Zapier:

- NPS 0-6 → Agrega a lista de "salvamento urgente" en tu CRM + te envía una alerta de Slack o WhatsApp
- NPS 7-8 → Agrega a secuencia de email de "adopción de funcionalidades"
- NPS 9-10 → Agrega a secuencia de email de "expansión + referido"

**Paso 4:** Tú respondes personalmente a todas las puntuaciones de 0-6 dentro de 24 horas

<ComparisonBuilder
title="Tu email de seguimiento de NPS (para detractores)"
persistKey="retention-L9-nps-detractor"
prompt="Escribe un email de seguimiento para un detractor de NPS (puntuación 0-6)"
expertExample="Asunto: Vi tu feedback\n\nHola [Nombre],\n\nNoté que le diste a [Producto] un [puntuación]/10. No es donde queremos estar.\n\n¿Puedes ayudarme a entender qué no está funcionando? Me encantaría arreglarlo.\n\n¿Quieres saltar a una llamada rápida esta semana? O simplemente responde con lo que te está frustrando.\n\n— [Tu nombre]"
criteria={[
"Reconoce la puntuación baja sin ponerse a la defensiva",
"Pide feedback específico",
"Ofrece una llamada o la opción fácil de responder",
"Firmado por el fundador (toque personal)"
]}
/>

---

## Receta 7: La automatización del post-mortem de abandono

**Disparador:** El cliente cancela
**Acción:** Enviar encuesta de salida + programar revisión de post-mortem
**Escalación:** Cancelaciones de alto valor (>$200/mes) → el fundador llama dentro de 48 horas

### La experiencia de salida importa

El 15-20% de los clientes que se van elegantemente regresan dentro de 12 meses. Pero solo si:

1. Haces la salida fluida (sin culpabilización, sin patrones oscuros)
2. Preguntas por qué se fueron (encuesta de salida)
3. Dejas la puerta abierta ("Nos encantaría tenerte de vuelta")

<ExampleCard label="Caso de estudio: El email de win-back">
Carolina, fundadora de SaaS, perdió un cliente de $300/mes (aprox. $6,000 MXN). Envió un email de salida elegante:

"Hola [Nombre], vi que cancelaste. Sin resentimientos — espero que [Producto] te haya ayudado mientras lo usaste. Si algún día quieres regresar, la puerta está abierta. Y si tienes 2 minutos, me encantaría saber qué podríamos haber hecho mejor: [enlace a encuesta de salida]."

El cliente respondió con feedback. Carolina arregló el problema (faltaba una integración). 4 meses después, el cliente regresó y subió a $500/mes.
</ExampleCard>

### Cómo construirlo

**Paso 1:** La cancelación dispara una encuesta de salida (Typeform, Google Form o integrada en tu app)

**Paso 2:** La encuesta pregunta:

1. ¿Por qué cancelaste? (botones de radio: precio, no lo uso, falta funcionalidad, competidor, presupuesto, otro)
2. ¿Qué podríamos haber hecho mejor? (texto abierto)
3. ¿Considerarías regresar si arreglamos [problema]? (sí/no)

**Paso 3:** Zapier enruta las respuestas:

- "Falta funcionalidad" → Agregar al backlog de solicitudes de funcionalidades
- "Competidor" → Agregar a lista de análisis competitivo
- "Consideraría regresar" → Agregar a secuencia de win-back de 90 días

**Paso 4:** Para cancelaciones de alto valor, tú llamas o envías audio de WhatsApp dentro de 48 horas (no para salvar, sino para aprender)

<TemplateBuilder
title="Tu encuesta de salida"
persistKey="retention-L9-exit-survey"
sections={[
{
id: "question1",
title: "Pregunta 1: ¿Por qué cancelaste?",
fields: [
{ id: "options", label: "Opciones de respuesta (separadas por comas)", placeholder: "Muy caro, No lo uso, Falta funcionalidad, Encontré competidor, Recorte de presupuesto, Logré mi objetivo, Otro", type: "textarea" }
]
},
{
id: "question2",
title: "Pregunta 2: ¿Qué podríamos mejorar?",
fields: [
{ id: "prompt", label: "Texto de la pregunta", placeholder: "¿Qué podríamos haber hecho mejor?", type: "text" }
]
},
{
id: "question3",
title: "Pregunta 3: ¿Regresarías?",
fields: [
{ id: "prompt", label: "Texto de la pregunta", placeholder: "Si arreglamos [problema], ¿considerarías regresar?", type: "text" }
]
}
]}
/>

---

## Armando todo: Tu stack de automatización

No necesitas construir las 7 recetas de una vez. Empieza con las **3 automatizaciones de mayor impacto** para tu negocio:

<InteractiveChecklist
title="Tu lista de prioridades de automatización"
persistKey="retention-L9-priorities"
items={[
"Receta 1: Detector de inactividad (atrapa el 40-60% del abandono prevenible)",
"Receta 3: Flujo de recuperación de pagos (recupera el 50-70% de pagos fallidos)",
"Receta 5: Alerta de puntuación de salud (sistema de alerta temprana para todas las demás recetas)",
"Receta 2: Empujón de adopción de funcionalidades (aumenta la adhesión)",
"Receta 4: Detector de señales de expansión (impulsa el crecimiento de NRR)",
"Receta 6: Automatización del ciclo de feedback (enruta NPS/encuestas a acción)",
"Receta 7: Automatización del post-mortem de abandono (mejora el producto + habilita win-back)"
]}
/>

### El stack de herramientas (Presupuesto: &lt;$100/mes)

| Herramienta                  | Función                           | Costo              | Cobertura de recetas  |
| ---------------------------- | --------------------------------- | ------------------ | --------------------- |
| **Zapier**                   | Conecta todo                      | $20-30/mes         | Todas las recetas     |
| **Google Sheets**            | Rastreador de puntuación de salud | Gratis             | Receta 5              |
| **ConvertKit / Customer.io** | Automatización de email           | $29-50/mes         | Recetas 1, 2, 4, 6, 7 |
| **Stripe**                   | Procesamiento de pagos + dunning  | Gratis (integrado) | Receta 3              |
| **Typeform / Google Forms**  | Encuestas                         | Gratis-$25/mes     | Recetas 6, 7          |
| **Slack / WhatsApp**         | Alertas                           | Gratis             | Receta 5              |

**Total:** $50-100/mes por un stack de automatización completo.

---

## El principio de humano-en-el-ciclo

Aquí está la regla crítica: **La automatización maneja la detección y la primera respuesta. Tú manejas las intervenciones de alto impacto.**

<FlipCard
  front="Cuándo automatizar vs cuándo personalizar"
  back="Automatiza: Monitoreo, emails de primer contacto, enrutamiento de datos, cuentas de bajo valor. Personaliza: Llamadas de recuperación, jugadas de salvamento de alto valor, conversaciones de expansión, seguimiento de detractores."
/>

Piénsalo así:

| Escenario                                               | Automatización                             | Tú                                   |
| ------------------------------------------------------- | ------------------------------------------ | ------------------------------------ |
| El cliente no ha iniciado sesión en 7 días              | ✅ Enviar Email 1                          |                                      |
| El cliente sigue sin iniciar sesión después de 3 emails |                                            | ✅ Llamada personal (si alto valor)  |
| El pago falla                                           | ✅ Enviar secuencia de dunning + reintento |                                      |
| El pago sigue fallando después de 7 días                |                                            | ✅ Contacto personal (si alto valor) |
| El cliente alcanza el 80% del límite del plan           | ✅ Enviar email de upgrade                 |                                      |
| El cliente no responde al email de upgrade              |                                            | ✅ Llamada de expansión              |
| La puntuación de salud baja a Amarillo                  | ✅ Alertarte                               | ✅ Revisar + decidir acción          |
| La puntuación de salud baja a Rojo                      | ✅ Alertarte                               | ✅ Contacto personal inmediato       |

---

## Tu sprint de automatización de 14 días

¿Listo para construir tu sistema de automatización de retención? Aquí está el sprint:

<ProgressiveReveal title="Sprint de construcción de automatización de 14 días" persistKey="retention-L9-sprint">

<RevealSection title="Días 1-2: Configura la infraestructura">

**Tareas:**

- [ ] Regístrate en Zapier (si aún no lo has hecho)
- [ ] Conecta tu base de datos del producto, ESP y Stripe a Zapier
- [ ] Configura el rastreador de puntuación de salud en Google Sheets (de la Lección 2)
- [ ] Prueba el flujo de datos: ¿Zapier puede jalar datos de login? ¿Engagement de email? ¿Estado de pago?

**Resultado:** Conexiones de datos funcionando

</RevealSection>

<RevealSection title="Días 3-5: Construye la Receta 1 (Detector de inactividad)">

**Tareas:**

- [ ] Define el umbral de inactividad (¿7 días? ¿10 días?)
- [ ] Escribe la secuencia de reactivación de 3 emails
- [ ] Construye la automatización de Zapier: detectar inactividad → enviar Email 1
- [ ] Configura los disparadores del Email 2 y Email 3 (Día 14, Día 21)
- [ ] Prueba con un registro de cliente falso

**Resultado:** Detector de inactividad en vivo

</RevealSection>

<RevealSection title="Días 6-7: Construye la Receta 3 (Recuperación de pagos)">

**Tareas:**

- [ ] Habilita Stripe Smart Retries (o dunning de Paddle)
- [ ] Escribe la secuencia de dunning de 3 emails
- [ ] Construye la automatización de Zapier: pago falla → enviar Email 1
- [ ] Configura los disparadores del Email 2 y Email 3
- [ ] Prueba con un fallo de pago de prueba

**Resultado:** Flujo de recuperación de pagos en vivo

</RevealSection>

<RevealSection title="Días 8-10: Construye la Receta 5 (Alerta de puntuación de salud)">

**Tareas:**

- [ ] Configura el cálculo semanal de puntuación de salud (manual o automatizado)
- [ ] Construye la automatización de Zapier: cambio de zona de salud → alerta de Slack/WhatsApp
- [ ] Define reglas de escalación (Amarillo = revisión semanal, Rojo = contacto inmediato)
- [ ] Prueba con una caída de puntuación de salud falsa

**Resultado:** Sistema de alerta de puntuación de salud en vivo

</RevealSection>

<RevealSection title="Días 11-12: Construye la Receta 2 (Empujón de adopción de funcionalidades)">

**Tareas:**

- [ ] Mapea tus funcionalidades + tasas de adopción
- [ ] Define el calendario de presentación gradual (Día 14, Día 21, Día 30)
- [ ] Escribe los emails de spotlight de funcionalidades
- [ ] Construye la automatización de Zapier: antigüedad + uso → enviar email de funcionalidad
- [ ] Prueba con un registro de cliente falso

**Resultado:** Secuencia de adopción de funcionalidades en vivo

</RevealSection>

<RevealSection title="Días 13-14: Prueba y monitorea">

**Tareas:**

- [ ] Ejecuta todas las automatizaciones con datos de prueba
- [ ] Monitorea por 48 horas: ¿los disparadores se están activando correctamente?
- [ ] Arregla cualquier bug o problema de timing
- [ ] Documenta tu stack de automatización (qué está automatizado, qué es manual)

**Resultado:** Sistema de automatización de retención completamente operativo

</RevealSection>

</ProgressiveReveal>

---

## Errores comunes de automatización (y cómo evitarlos)

<ClassifyExercise
title="Banderas rojas de automatización"
persistKey="retention-L9-classify"
categories={[
{ id: "good", label: "Buena automatización", color: "#10b981" },
{ id: "bad", label: "Mala automatización", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Enviar 5 emails de reactivación en 7 días",
correctCategory: "bad",
explanation: "Demasiado agresivo. Los clientes se darán de baja o marcarán como spam. Limítate a 3 emails en 21 días."
},
{
id: "2",
content: "Alertarte cuando la puntuación de salud baja a Amarillo",
correctCategory: "good",
explanation: "Alerta temprana = mayor tasa de salvamento. Amarillo es la ventana de intervención óptima."
},
{
id: "3",
content: "Automatizar las respuestas de cancelación de alto valor ($500+/mes)",
correctCategory: "bad",
explanation: "Las cuentas de alto valor merecen atención personal. Automatiza la detección, personaliza la respuesta."
},
{
id: "4",
content: "Enviar emails de spotlight de funcionalidades a clientes que no han dominado la funcionalidad principal",
correctCategory: "bad",
explanation: "Se sentirán abrumados. Espera hasta que hayan usado la funcionalidad principal 3+ veces."
},
{
id: "5",
content: "Reintentar automáticamente pagos fallidos 3 veces en 7 días",
correctCategory: "good",
explanation: "Práctica estándar de dunning. La mayoría de los procesadores de pago hacen esto automáticamente."
},
{
id: "6",
content: "Enrutar detractores de NPS (0-6) a tu atención inmediata",
correctCategory: "good",
explanation: "Los detractores están en riesgo. El seguimiento personal dentro de 24 horas puede salvar el 30-50%."
}
]}
/>

---

## Tu checklist de automatización

Antes de terminar esta lección, asegúrate de poder responder "sí" a estas:

<InteractiveChecklist
title="Checklist de preparación para automatización"
persistKey="retention-L9-readiness"
items={[
"Sé cuáles 3 recetas de automatización son de mayor prioridad para mi negocio",
"Tengo las herramientas necesarias (Zapier, ESP, rastreador de puntuación de salud)",
"He escrito al menos una secuencia de emails de reactivación",
"Entiendo la diferencia entre automatizar la detección vs automatizar la respuesta",
"Tengo reglas de escalación para cuando la automatización debe pasar a mí",
"He configurado al menos una automatización de prueba y verificado que funciona",
"Tengo un plan para el sprint de automatización de 14 días"
]}
/>

---

## Qué sigue

En la **Lección 10**, armarás todo de este curso en un **sistema de retención completo** — un sprint de 14 días que te lleva de apagar incendios de abandono reactivamente a una máquina de retención proactiva.

Construirás:

- Tu dashboard de puntuación de salud (en vivo y actualizándose)
- Tu stack completo de automatización (7 recetas funcionando)
- Tu ritual de revisión semanal de CS (2-3 horas, enfocado en las cuentas correctas)
- Tu playbook de retención (documentado para que eventualmente puedas delegarlo)

Pero antes de eso, toma 30 minutos ahora mismo para construir tu primera receta de automatización. Elige una:

<DecisionTree
title="¿Cuál receta deberías construir primero?"
persistKey="retention-L9-first-recipe"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Cuál es tu mayor problema de retención ahora mismo?",
choices: [
{ label: "Los clientes se vuelven inactivos y no lo noto hasta que cancelan", nextNodeId: "dormancy" },
{ label: "Los pagos fallidos están matando mi MRR", nextNodeId: "payment" },
{ label: "No sé cuáles clientes están en riesgo", nextNodeId: "health" }
]
},
{
id: "dormancy",
content: "Construye la Receta 1: Detector de inactividad. Empieza con la secuencia de reactivación de 3 emails. Atraparás el 40-60% del abandono prevenible.",
isTerminal: true,
outcome: "positive"
},
{
id: "payment",
content: "Construye la Receta 3: Flujo de recuperación de pagos. Habilita Stripe Smart Retries + escribe la secuencia de dunning de 3 emails. Recuperarás el 50-70% de los pagos fallidos.",
isTerminal: true,
outcome: "positive"
},
{
id: "health",
content: "Construye la Receta 5: Alerta de puntuación de salud. Configura el cálculo semanal de puntuación de salud + alertas de Slack/WhatsApp. Detectarás problemas 2-4 semanas antes.",
isTerminal: true,
outcome: "positive"
}
]}
/>

Ahora ve y constrúyelo. Nos vemos en la Lección 10 para el sprint final.
