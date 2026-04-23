---
title: "Jugadas de salvamento: Downgrades, pausas y llamadas de recuperación"
duration: "50 min"
track: "Éxito del Cliente"
course: "Curso 37: Retención y Prevención de Abandono"
lesson: 7
---

# Jugadas de salvamento: Downgrades, pausas y llamadas de recuperación

## El cliente de $50/mes que casi se va

Valentina maneja una herramienta de gestión de proyectos para agencias creativas. Un martes por la mañana, recibe la notificación que todo fundador teme: "El cliente #247 ha solicitado cancelación."

El cliente: un suscriptor de 9 meses que paga $149/mes. Valor de vida hasta ahora: $1,341. Si se queda otro año: $3,129.

Valentina tiene dos opciones:

1. Hacer clic en "Confirmar cancelación" y perder $1,788 en ingresos futuros
2. Gastar 15 minutos entendiendo qué pasó y ofreciendo una jugada de salvamento

Eligió la opción 2. Diez minutos después, el cliente estaba en un plan de $79/mes en vez de haber abandonado. **Impacto anual: $948 retenidos vs. $0.**

Ese es el poder de las jugadas de salvamento. Hoy, aprenderás exactamente cómo ejecutarlas.

<InsightCard icon="💰" title="La economía de las jugadas de salvamento">
Un cliente que paga $50/mes es infinitamente más valioso que un cliente que abandonó pagando $0. Cada jugada de salvamento — downgrade, pausa o llamada de recuperación — le gana a perderlos por completo.
</InsightCard>

---

## Las tres opciones de jugada de salvamento

Cuando un cliente señala intención de cancelar, tienes tres respuestas estratégicas:

<FlipCard
  front="Jugada #1: El downgrade"
  back="Reduce su plan para ajustarse a sus necesidades reducidas. Retiene el 20-40% de las cancelaciones. Un cliente de $50/mes le gana a un cliente que abandonó a $0 cada vez."
/>

<FlipCard
  front="Jugada #2: La pausa"
  back="Ofrece 30-60 días de congelamiento de cuenta. Los datos permanecen intactos, pueden reiniciar en cualquier momento. El 60-70% de los clientes pausados se reactivan vs. el 5-15% de los que cancelan."
/>

<FlipCard
  front="Jugada #3: La llamada de recuperación"
  back="Para cuentas de alto valor ($200+/mes): llamada de 10-15 minutos dentro de 24 horas. La intervención personal salva el 30-50% de las cuentas en riesgo."
/>

Desglosemos cuándo y cómo usar cada una.

---

## Parte 1: El salvamento por downgrade

### Cuándo ofrecer un downgrade

Un downgrade tiene sentido cuando la **necesidad del cliente disminuyó**, no desapareció:

- Están usando menos funcionalidades de las que pagan
- Su equipo se redujo (menos asientos necesarios)
- Su volumen de negocio disminuyó (procesando menos transacciones, gestionando menos proyectos)
- Restricciones de presupuesto, pero aún ven valor

<ExampleCard label="Escenario real: El negocio estacional">
Un cliente maneja un servicio de preparación de impuestos. Necesita tu herramienta de facturación intensamente de enero a abril, apenas la toca de mayo a diciembre. En vez de abandonar en mayo, le ofreces un downgrade estacional: $99/mes durante temporada de impuestos, $29/mes fuera de temporada. Se queda 3 años.

**Matemáticas**: $99×4 + $29×8 = $628/año vs. $0 si abandona = $1,884 en 3 años retenidos.
</ExampleCard>

### El árbol de decisión del downgrade

<DecisionTree
title="¿Deberías ofrecer un downgrade?"
persistKey="retention-L7-downgrade-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "El cliente señala cancelación. ¿Cuál es su razón declarada?",
choices: [
{ label: "Muy caro / recorte de presupuesto", nextNodeId: "price" },
{ label: "No lo uso suficiente", nextNodeId: "usage" },
{ label: "Falta una funcionalidad", nextNodeId: "feature" },
{ label: "Encontró un competidor", nextNodeId: "competitor" }
]
},
{
id: "price",
content: "Objeción de precio. ¿Aún ven valor en el producto?",
choices: [
{ label: "Sí, solo no pueden pagar el nivel actual", nextNodeId: "downgrade-offer" },
{ label: "No, no ven ROI", nextNodeId: "recovery-call" }
]
},
{
id: "usage",
content: "Bajo uso. ¿Alguna vez fueron usuarios activos?",
choices: [
{ label: "Sí, pero el uso bajó recientemente", nextNodeId: "pause-offer" },
{ label: "No, nunca realmente adoptaron", nextNodeId: "onboarding-failure" }
]
},
{
id: "feature",
content: "Funcionalidad faltante. ¿Está en tu roadmap?",
choices: [
{ label: "Sí, la lanzo en 1-2 meses", nextNodeId: "pause-offer" },
{ label: "No, no está planeada", nextNodeId: "graceful-exit" }
]
},
{
id: "competitor",
content: "Cambio a competidor. ¿Qué ofrece el competidor que tú no?",
choices: [
{ label: "Precio más bajo por las mismas funcionalidades", nextNodeId: "downgrade-offer" },
{ label: "Funcionalidad que no tienes", nextNodeId: "recovery-call" }
]
},
{
id: "downgrade-offer",
content: "Ofrece downgrade: '¿Te funcionaría mejor un plan de $X/mes para tus necesidades actuales?'",
isTerminal: true,
outcome: "positive"
},
{
id: "pause-offer",
content: "Ofrece pausa: '¿Te gustaría pausar por 30-60 días en vez de cancelar?'",
isTerminal: true,
outcome: "positive"
},
{
id: "recovery-call",
content: "Programa llamada de recuperación: '¿Puedo hacer una llamada de 10 minutos para entender qué pasó?'",
isTerminal: true,
outcome: "positive"
},
{
id: "onboarding-failure",
content: "Fallo de onboarding. Ofrece ayuda personalizada de configuración o salida elegante.",
isTerminal: true,
outcome: "neutral"
},
{
id: "graceful-exit",
content: "Salida elegante: Agradece, mantén la puerta abierta, pide feedback.",
isTerminal: true,
outcome: "neutral"
}
]}
/>

### Guiones de oferta de downgrade

<TemplateBuilder
title="Tu guión de oferta de downgrade"
persistKey="retention-L7-downgrade-script"
sections={[
{
id: "acknowledge",
title: "Paso 1: Reconoce su situación",
fields: [
{ id: "empathy", label: "Declaración de empatía", placeholder: "ej., Entiendo perfectamente — los presupuestos están apretados ahora.", type: "textarea" }
]
},
{
id: "offer",
title: "Paso 2: Presenta el downgrade",
fields: [
{ id: "plan", label: "Nombre y precio del plan de downgrade", placeholder: "ej., Plan Starter a $49/mes", type: "text" },
{ id: "features", label: "Qué conservan", placeholder: "ej., Todos tus datos, funcionalidades principales, solo menos asientos", type: "textarea" }
]
},
{
id: "bridge",
title: "Paso 3: Enmárcalo como temporal",
fields: [
{ id: "future", label: "Camino futuro de upgrade", placeholder: "ej., Siempre puedes hacer upgrade cuando el negocio repunte", type: "textarea" }
]
}
]}
/>

<InsightCard icon="📊" title="Tasas de éxito de downgrade">
**Benchmark de la industria**: Las ofertas de downgrade retienen el 20-40% de las cancelaciones. Para fundadores en solitario, incluso un 20% de retención significa miles en ingresos salvados anualmente.
</InsightCard>

---

## Parte 2: La oferta de pausa

### Por qué las pausas funcionan mejor que las cancelaciones

La pausa es psicológicamente brillante. Reenmarca la cancelación de **pérdida permanente** a **descanso temporal**.

<ComparisonBuilder
title="Mensaje de cancelación vs. pausa"
persistKey="retention-L7-pause-compare"
prompt="Escribe tu mensaje de oferta de pausa"
expertExample="Noté que estás pensando en cancelar. ¿Funcionaría mejor pausar por 60 días? Tu cuenta se mantiene intacta, los datos están seguros, y puedes reiniciar en cualquier momento con un clic. Sin presión — solo quiero asegurarme de que tengas opciones."
criteria={[
"Enmarca la pausa como más fácil que la cancelación",
"Enfatiza la seguridad de los datos",
"Elimina la fricción para reiniciar",
"Sin culpa ni presión"
]}
/>

### Cuándo ofrecer una pausa

<ClassifyExercise
title="¿Pausa o no?"
persistKey="retention-L7-pause-classify"
categories={[
{ id: "pause", label: "Ofrecer pausa", color: "#10b981" },
{ id: "downgrade", label: "Ofrecer downgrade", color: "#f59e0b" },
{ id: "exit", label: "Salida elegante", color: "#ef4444" }
]}
items={[
{ id: "1", content: "El cliente dice: 'Estoy ahogado con un proyecto grande por los próximos 2 meses y no tendré tiempo de usar esto.'", correctCategory: "pause" },
{ id: "2", content: "El cliente dice: 'Estamos reduciendo y solo podemos pagar el plan básico.'", correctCategory: "downgrade" },
{ id: "3", content: "El cliente dice: 'Nos cambiamos a [competidor] porque tienen [funcionalidad que tú no].'", correctCategory: "exit" },
{ id: "4", content: "El cliente dice: 'Logré lo que necesitaba — mi libro está publicado, ya no necesito la herramienta de escritura.'", correctCategory: "exit" },
{ id: "5", content: "El cliente dice: 'El negocio anda lento ahora, podría necesitar esto de nuevo en Q3.'", correctCategory: "pause" }
]}
/>

### Las mecánicas de la pausa

**Configuración técnica:**

- Duración de pausa: 30-60 días (el usuario elige)
- Facturación: se pausa automáticamente, se reinicia con la reactivación
- Datos: completamente preservados, acceso de solo lectura opcional
- Reactivación: autoservicio con un clic

**Comunicación:**

- Día 1 de pausa: "Tu cuenta está pausada. Así puedes reiniciar en cualquier momento."
- Día 15 de pausa: "A la mitad de tu pausa — todo te está esperando."
- Día 25 de pausa: "Tu pausa termina en 5 días. ¿Reiniciar ahora o extender?"
- Día 30: Auto-reactivar O extender pausa O convertir a cancelación (el usuario elige)

<RangeSlider
  label="¿Qué duración de pausa ofrecerás?"
  min={14}
  max={90}
  step={7}
  lowLabel="14 días"
  highLabel="90 días"
  persistKey="retention-L7-pause-duration"
/>

<InsightCard icon="🔄" title="Tasas de recuperación de pausa">
**El 60-70%** de los clientes pausados se reactivan vs. **el 5-15%** de los clientes que cancelan que regresan. La pausa es un superpoder de retención.
</InsightCard>

---

## Parte 3: La llamada de recuperación

### Cuándo levantar el teléfono

No todo cliente en riesgo merece una llamada personal. Usa este filtro:

<SlideNavigation>
<Slide title="Umbral de alto valor">

**Llama si:**

- El cliente paga $200+/mes
- El cliente ha estado contigo 6+ meses
- El cliente es una cuenta estratégica (fuente de referidos, caso de estudio, influencer de la industria)

**No llames si:**

- El cliente es &lt;$100/mes Y &lt;3 meses de antigüedad
- El cliente nunca se enganchó (fantasma desde el día 1)
- El cliente ya aceptó downgrade/pausa

</Slide>

<Slide title="El timing importa">

**Mejor momento para llamar:**

- Dentro de 24 horas de la señal de cancelación
- Durante horas de oficina (su zona horaria)
- Cuando tengas 15-20 minutos de enfoque sin interrupciones

**Peor momento:**

- Después de que ya se cambiaron al competidor
- Cuando estás apurado o distraído
- Por buzón de voz (siempre intenta en vivo primero, o envía un audio de WhatsApp)

</Slide>

<Slide title="Checklist de preparación">

Antes de la llamada, revisa:

- [ ] Sus datos de uso (últimos 30 días)
- [ ] Historial de tickets de soporte
- [ ] Últimos 3 emails de ellos
- [ ] Su razón declarada de cancelación
- [ ] Qué jugada de salvamento ofrecerás

</Slide>
</SlideNavigation>

### El guión de llamada de recuperación de 15 minutos

<ProgressiveReveal title="El framework de llamada de recuperación de 5 partes" persistKey="retention-L7-call-reveal">

<RevealSection title="Parte 1: La apertura (2 min)">

**Tu meta:** Establecer un tono colaborativo, no defensivo.

**Guión:**

> "Hola [Nombre], soy [Tu nombre] de [Empresa]. Gracias por haber sido cliente — realmente aprecio el tiempo que nos has dado. Noté [señal de cancelación] y quise contactarte personalmente para entender qué pasó. ¿Tienes 10 minutos para platicar?"

**Movimientos clave:**

- Agradece primero (la gratitud desarma la defensividad)
- Declara la razón de la llamada directamente
- Pide permiso por su tiempo
- Mantenlo corto — 2 minutos máximo

</RevealSection>

<RevealSection title="Parte 2: Descubrimiento (4 min)">

**Tu meta:** Entender la razón real, no solo la razón declarada.

**Preguntas para hacer:**

1. "¿Puedes ayudarme a entender qué no está funcionando?"
2. "¿Cuándo empezaste a sentir que esto no era lo correcto?"
3. "¿Qué necesitaría cambiar para que te quedaras?"

**Qué escuchar:**

- **Problema de producto** → ¿Puedes arreglarlo?
- **Fallo de onboarding** → ¿Puedes re-onboardearlos?
- **Necesidades cambiaron** → ¿Downgrade o pausa?
- **Competidor** → ¿Qué ofrecen que tú no?

**Regla crítica:** No defiendas ni expliques todavía. Solo escucha.

</RevealSection>

<RevealSection title="Parte 3: La oferta de salvamento (3 min)">

**Tu meta:** Presentar una solución hecha a medida basada en lo que acabas de escuchar.

**Framework:**

> "Basado en lo que me compartes, esto es lo que puedo ofrecer: [jugada de salvamento específica]. ¿Te funcionaría?"

**Ejemplos:**

- **Problema de producto:** "Puedo escalar esto a nuestro equipo de desarrollo y tener una solución para [fecha]. ¿Estarías dispuesto a pausar por 30 días mientras lo resolvemos?"
- **Presupuesto:** "¿Qué tal si te movemos a nuestro plan de $X? Conservarías [funcionalidades principales] a un precio que funcione."
- **Competidor:** "Ellos tienen [funcionalidad], que nosotros no. Pero nosotros tenemos [tu diferenciador]. ¿Es eso suficientemente valioso para quedarte?"

</RevealSection>

<RevealSection title="Parte 4: Maneja objeciones (3 min)">

**Objeciones comunes y respuestas:**

| Objeción                                 | Respuesta                                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| "Ya tomé la decisión."                   | "Lo respeto. ¿Puedo preguntar cuál fue el factor final? Quiero asegurarme de que aprendamos de esto."               |
| "Tu competidor es más barato."           | "Tiene sentido. ¿Hay funcionalidades que extrañarías si te cambias? A veces el ahorro no vale el costo del cambio." |
| "Simplemente no tengo tiempo de usarlo." | "¿Funcionaría mejor una pausa? Tus datos se mantienen seguros y puedes regresar cuando las cosas se calmen."        |
| "Les falta [funcionalidad]."             | "Tienes razón, todavía no la tenemos. Está en nuestro roadmap para [fecha]. ¿Te funcionaría ese timeline?"          |

</RevealSection>

<RevealSection title="Parte 5: Cierre (3 min)">

**Si se salvó:**

> "Perfecto — te configuro eso hoy. Te envío un email de confirmación con los detalles. Y yo personalmente haré check-in contigo en [plazo] para asegurarme de que todo funcione. ¿Te parece?"

**Si no se salvó:**

> "Entiendo. Realmente aprecio que nos hayas dado una oportunidad. La puerta siempre está abierta si tus necesidades cambian. Me aseguro de que tu cancelación sea suave y tu exportación de datos esté lista. ¿Puedo pedirte un último favor — estarías dispuesto a compartir feedback sobre qué podríamos haber hecho mejor?"

**Crítico:** Termina en una nota positiva. El 15-20% de los clientes que se van elegantemente regresan dentro de 12 meses.

</RevealSection>

</ProgressiveReveal>

### Practica la llamada de recuperación

<MiniRoleplay
  scenario="Estás llamando a un cliente que ha estado contigo 8 meses (plan de $250/mes). Enviaron una solicitud de cancelación con razón: 'No lo uso suficiente.' Su uso cayó 60% en los últimos 30 días."
  role="Tú eres el fundador haciendo la llamada de recuperación"
  persistKey="retention-L7-call-roleplay"
  modelResponse="Hola [Nombre], soy [Fundador] de [Producto]. Gracias por estar con nosotros estos 8 meses — realmente he apreciado tenerte como cliente. Vi que solicitaste la cancelación y quería entender qué pasó. ¿Tienes 10 minutos? [PAUSA] Noté que tu uso bajó recientemente. ¿Puedes ayudarme a entender qué cambió? [ESCUCHA] Basado en lo que me dices, parece que estás en una temporada ocupada. ¿Funcionaría mejor pausar por 60 días en vez de cancelar? Tus datos se mantienen intactos y puedes reiniciar con un clic cuando las cosas se calmen."
/>

---

## Parte 4: El flujo de cancelación

### No lo hagas fácil NI lo hagas difícil

Los mejores flujos de cancelación balancean **respeto por el cliente** con **oportunidad de salvamento**.

<StrategyDuel
title="Filosofía del flujo de cancelación"
persistKey="retention-L7-flow-duel"
scenario="Un cliente hace clic en 'Cancelar mi cuenta.' ¿Qué pasa después?"
strategyA={{
    name: "Cancelación instantánea",
    description: "Cancelar con un clic, sin preguntas.",
    pros: ["Respeta la autonomía del cliente", "Sin patrones oscuros"],
    cons: ["Pierde el 20-40% de clientes salvables", "Sin ciclo de feedback"]
  }}
strategyB={{
    name: "Flujo de salvamento multi-paso",
    description: "Preguntar por qué → ofrecer jugada de salvamento → confirmar → encuesta de salida",
    pros: ["Retiene 20-40% más clientes", "Recopila datos de cancelación"],
    cons: ["Puede sentirse manipulativo si se ejecuta mal"]
  }}
expertVerdict="La estrategia B gana SI se ejecuta con respeto. La clave: hacer que cada paso sea valioso para el cliente (no solo para ti). Pregunta por qué para ofrecer una mejor solución, no para culpabilizar. Ofrece jugadas de salvamento que genuinamente ayuden, no descuentos desesperados. Confirma claramente, no escondas el botón de cancelar."
/>

### El flujo de cancelación de 4 pasos

<SlideNavigation>
<Slide title="Paso 1: Pregunta por qué (1 clic)">

**UI:** Botones de radio, no texto abierto (reduce fricción)

**Opciones:**

- [ ] Muy caro
- [ ] No lo uso suficiente
- [ ] Falta una funcionalidad que necesito
- [ ] Encontré una mejor alternativa
- [ ] Recorte de presupuesto / cambio de negocio
- [ ] Logré mi objetivo
- [ ] Otro (campo de texto opcional)

**Por qué funciona:** Obtienes datos estructurados + toma 5 segundos.

</Slide>

<Slide title="Paso 2: Oferta de salvamento contextual">

**Basado en su razón, muestra UNA jugada de salvamento:**

| Razón seleccionada     | Oferta mostrada                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| Muy caro               | "¿Te funcionaría nuestro plan de $X? Mismas funcionalidades principales, menor precio."   |
| No lo uso              | "¿Te gustaría pausar por 60 días? Tus datos se mantienen seguros."                        |
| Falta funcionalidad    | "Esa funcionalidad está en nuestro roadmap para [fecha]. ¿Quieres pausar hasta entonces?" |
| Encontré alternativa   | "Nos encantaría entender qué ofrecen que nosotros no. ¿Llamada de 5 minutos?"             |
| Recorte de presupuesto | "¿Downgrade a $X/mes o pausa por 30-60 días?"                                             |
| Logré mi objetivo      | "¡Felicidades! La puerta siempre está abierta si nos necesitas de nuevo."                 |

**UI:** Botón verde grande para jugada de salvamento, link gris pequeño para "No gracias, cancelar de todos modos."

</Slide>

<Slide title="Paso 3: Confirmar cancelación">

**Si declinan la oferta de salvamento:**

**UI:**

> "Sentimos que te vayas. Tu cancelación tomará efecto el [fecha]. Tus datos estarán disponibles para descarga hasta [fecha + 30 días]."

**Botones:**

- "Sí, cancelar mi cuenta" (rojo, claro)
- "En realidad, me quedo" (verde, secundario)

**Por qué funciona:** Última oportunidad de reconsiderar sin patrones oscuros.

</Slide>

<Slide title="Paso 4: Encuesta de salida">

**Después de confirmar la cancelación:**

**Preguntas (opcionales, 2-3 máximo):**

1. "¿Qué podríamos haber hecho diferente?"
2. "¿Nos recomendarías a otros?" (Sí/No)
3. "¿Podemos contactarte en 3 meses para ver si tus necesidades cambiaron?"

**Por qué funciona:** Obtienes feedback + permiso para re-enganche futuro.

</Slide>
</SlideNavigation>

<InsightCard icon="🎯" title="Impacto del flujo de cancelación">
Las empresas con flujos de cancelación estructurados retienen **10-15% más clientes** que las que tienen un simple botón de "clic para cancelar". La clave: respeto + relevancia.
</InsightCard>

---

## Parte 5: Recuperación post-abandono

### El juego largo: Campañas de win-back

No todo cliente que se va se fue para siempre. **El 15-20% de los clientes que se van elegantemente regresan dentro de 12 meses.**

<TemplateBuilder
title="Tu secuencia de win-back de 90 días"
persistKey="retention-L7-winback-sequence"
sections={[
{
id: "day7",
title: "Día 7 post-cancelación: El check-in",
fields: [
{ id: "subject", label: "Línea de asunto", placeholder: "ej., ¿Cómo va la transición?", type: "text" },
{ id: "body", label: "Cuerpo del email", placeholder: "Hola [Nombre], solo quería hacer check-in una semana después de tu cancelación. ¿Cómo va la transición a [alternativa]? Si algo no funciona como esperabas, la puerta siempre está abierta.", type: "textarea" }
]
},
{
id: "day30",
title: "Día 30 post-cancelación: La actualización",
fields: [
{ id: "subject", label: "Línea de asunto", placeholder: "ej., Qué hay de nuevo en [Producto]", type: "text" },
{ id: "body", label: "Cuerpo del email", placeholder: "Hola [Nombre], quería compartir lo que hemos lanzado desde que te fuiste: [funcionalidad 1], [funcionalidad 2]. Si alguna resuelve problemas que enfrentas, platiquemos.", type: "textarea" }
]
},
{
id: "day90",
title: "Día 90 post-cancelación: La oferta",
fields: [
{ id: "subject", label: "Línea de asunto", placeholder: "ej., Regresa con 50% de descuento tu primer mes", type: "text" },
{ id: "body", label: "Cuerpo del email", placeholder: "Hola [Nombre], Han pasado 3 meses desde que te fuiste. Si estás abierto a darnos otra oportunidad, me gustaría ofrecerte 50% de descuento en tu primer mes de regreso. Sin presión — solo quería extender la oferta.", type: "textarea" }
]
}
]}
/>

### El principio de salida elegante

**Cómo tratas a los clientes de salida determina si regresan.**

<SwipeDecision
title="¿Salida elegante o puente quemado?"
description="Desliza a la derecha para salidas elegantes, a la izquierda para puentes quemados"
optionA="Puente quemado"
optionB="Salida elegante"
persistKey="retention-L7-exit-swipe"
cards={[
{ id: "1", content: "El cliente cancela. Envías: 'Sentimos que te vayas. Tu cuenta ahora está cerrada.'", correctOption: "a", explanation: "Demasiado frío. Sin gratitud, sin puerta abierta." },
{ id: "2", content: "El cliente cancela. Envías: 'Gracias por haber sido cliente. Tus datos estarán disponibles por 30 días. Si tus necesidades cambian, aquí estamos.'", correctOption: "b", explanation: "Perfecto. Gratitud + info práctica + puerta abierta." },
{ id: "3", content: "El cliente cancela. Envías: '¿ESTÁS SEGURO? ¡Perderás todos tus datos y no podrás regresar!'", correctOption: "a", explanation: "Culpa + urgencia falsa. Manipulativo." },
{ id: "4", content: "El cliente cancela. No envías nada.", correctOption: "a", explanation: "El silencio se siente como que no te importa." },
{ id: "5", content: "El cliente cancela. Envías: 'Lamento que no hayamos podido cumplir tus necesidades. Me encantaría saber qué podríamos haber hecho mejor. La puerta siempre está abierta.'", correctOption: "b", explanation: "Humilde, curioso y acogedor. Salida elegante perfecta." }
]}
/>

---

## Armando tu playbook de salvamento

Ahora es momento de construir tu playbook completo de salvamento.

<InteractiveChecklist
title="Checklist de tu playbook de salvamento"
persistKey="retention-L7-playbook-checklist"
items={[
"Define los niveles de downgrade y precios para cada uno",
"Escribe guiones de oferta de downgrade para cada razón de cancelación",
"Configura las mecánicas de pausa (opciones de 30 y 60 días)",
"Escribe la plantilla de email de oferta de pausa",
"Crea el guión de llamada de recuperación con respuestas a objeciones",
"Define el umbral de alto valor para llamadas de recuperación ($200+/mes o personalizado)",
"Construye el flujo de cancelación de 4 pasos (preguntar por qué → oferta de salvamento → confirmar → encuesta)",
"Escribe las preguntas de la encuesta de salida (2-3 máximo)",
"Crea la secuencia de win-back de 90 días (Día 7, 30, 90)",
"Configura el rastreo de razones de cancelación en tu CRM/hoja de cálculo"
]}
/>

---

## Simulación de jugadas de salvamento

Practiquemos las tres jugadas de salvamento en escenarios realistas.

<TimedChallenge
title="Drill rápido de jugadas de salvamento"
persistKey="retention-L7-speed-drill"
timeLimit={120}
items={[
{ id: "1", prompt: "Cliente ($99/mes, 6 meses de antigüedad) dice: 'Muy caro ahora.' ¿Cuál es tu jugada de salvamento?", correctAnswer: "Downgrade al plan de $49/mes", explanation: "Objeción de precio + aún ve valor = oferta de downgrade." },
{ id: "2", prompt: "Cliente ($299/mes, 12 meses de antigüedad) dice: 'Ahogado con un proyecto grande, no usaré esto por 2 meses.' ¿Tu jugada?", correctAnswer: "Ofrecer pausa de 60 días", explanation: "Período ocupado temporal = pausa, no cancelación." },
{ id: "3", prompt: "Cliente ($499/mes, 8 meses de antigüedad) dice: 'Me cambio a [competidor] porque tienen [funcionalidad].' ¿Tu jugada?", correctAnswer: "Programar llamada de recuperación", explanation: "Alto valor + cambio a competidor = intervención personal necesaria." },
{ id: "4", prompt: "Cliente ($29/mes, 2 meses de antigüedad) dice: 'Nunca realmente lo usé.' ¿Tu jugada?", correctAnswer: "Salida elegante", explanation: "Bajo valor + nunca se enganchó = no vale el esfuerzo de recuperación." },
{ id: "5", prompt: "Cliente ($199/mes, 10 meses de antigüedad) dice: 'Recorte de presupuesto — solo puedo pagar $99/mes máximo.' ¿Tu jugada?", correctAnswer: "Downgrade al plan de $99/mes", explanation: "Dijeron exactamente el precio que pueden pagar. Iguálalo." }
]}
/>

---

## Calculadora de ROI de jugadas de salvamento

¿Cuántos ingresos pueden realmente recuperar las jugadas de salvamento?

<ScenarioSimulator
title="Impacto de ingresos de jugadas de salvamento"
persistKey="retention-L7-roi-simulator"
levers={[
{ id: "cancellations", label: "Solicitudes de cancelación mensuales", min: 1, max: 50, step: 1, defaultValue: 10 },
{ id: "arpu", label: "Ingreso promedio por usuario ($/mes)", min: 20, max: 500, step: 10, defaultValue: 100 },
{ id: "saveRate", label: "Tasa de éxito de jugadas de salvamento (%)", min: 10, max: 50, step: 5, defaultValue: 25 }
]}
outputs={[
{ id: "saved", label: "Clientes salvados por mes", formula: "cancellations * (saveRate / 100)", unit: "", precision: 1 },
{ id: "monthlyRevenue", label: "Ingresos mensuales retenidos", formula: "cancellations * (saveRate / 100) * arpu", unit: "$", precision: 0 },
{ id: "annualRevenue", label: "Ingresos anuales retenidos", formula: "cancellations * (saveRate / 100) * arpu * 12", unit: "$", precision: 0 }
]}
insight="Con una tasa de salvamento del {saveRate}%, estás reteniendo ${monthlyRevenue}/mes o ${annualRevenue}/año. Eso es el costo de una contratación de CS a tiempo completo — financiada enteramente por jugadas de salvamento."
/>

---

## Resumen: El sistema de jugadas de salvamento

Ahora tienes tres herramientas poderosas de retención:

1. **Downgrade** — Retiene el 20-40% de los clientes sensibles al precio ajustando el plan a la necesidad
2. **Pausa** — Retiene el 60-70% de los clientes temporalmente inactivos ofreciendo un descanso en vez de ruptura
3. **Llamada de recuperación** — Salva el 30-50% de las cuentas de alto valor en riesgo con intervención personal (por teléfono o WhatsApp)

**El insight clave:** Un cliente que paga cualquier cosa es infinitamente más valioso que un cliente que abandonó pagando $0.

<InteractiveChecklist
title="Tu plan de acción de jugadas de salvamento"
persistKey="retention-L7-actions"
items={[
"Construye tu estructura de niveles de downgrade y precios",
"Escribe guiones de jugadas de salvamento para cada razón de cancelación",
"Configura las mecánicas de pausa (30 y 60 días)",
"Crea tu guión de llamada de recuperación y practícalo",
"Diseña tu flujo de cancelación de 4 pasos",
"Escribe tu secuencia de win-back de 90 días",
"Calcula tu ROI de jugadas de salvamento usando el simulador de arriba",
"Agrega disparadores de jugadas de salvamento a tu revisión semanal de CS (Lección 8)"
]}
/>

**Siguiente lección:** Vamos a construir tu Bloque de Revisión Semanal de CS — el ritual de 2-3 horas que mantiene tu sistema de retención funcionando sin estar apagando incendios constantemente.
