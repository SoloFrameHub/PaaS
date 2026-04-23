---
title: "Secuencias de bienvenida y listas de verificación dentro de la app"
duration: "50 min"
track: "Éxito del cliente"
course: "Curso 36: Onboarding de clientes"
lesson: 4
---

## La ventana de 5 minutos que lo determina todo

El producto SaaS de Sarah tenía una tasa de abandono del 42% en el primer mes. No porque el producto fuera malo — sus clientes retenidos lo amaban. El problema era más simple y brutal: **la mayoría de los nuevos clientes nunca llegó a experimentar el producto en absoluto.**

Se registraban, veían un panel en blanco, se confundían sobre qué hacer primero y... desaparecían. Sin correos enojados. Sin quejas. Solo abandono silencioso.

Luego cambió una sola cosa: envió un correo de bienvenida dentro de los 5 minutos del registro con un único primer paso claro. El abandono del primer mes bajó al 28%. Luego agregó una lista de verificación de 3 elementos dentro de la app. El abandono cayó al 18%. Después construyó una secuencia de 7 correos que guiaba a las personas desde el registro hasta el primer valor. **El abandono llegó al 11%.**

Mismo producto. Mismas funcionalidades. Onboarding diferente.

<InsightCard icon="📊" title="La ventaja del correo de bienvenida">
Los correos de bienvenida obtienen **tasas de apertura del 50-86%** frente al 20-25% de los correos de marketing habituales. Las primeras 24 horas después de la compra son la ventana de mayor engagement en todo el ciclo de vida del cliente. La mayoría de los fundadores la desperdicia.
</InsightCard>

Esta lección trata sobre aprovechar al máximo esa ventana. Construirás dos sistemas interconectados:

1. **Una secuencia de bienvenida de 7 correos** que guía a los clientes desde la compra hasta el primer valor en 14 días
2. **Una lista de verificación dentro de la app** que hace visible y rastreable el camino hacia el éxito

Al final tendrás plantillas, disparadores de tiempo y un plan de implementación claro.

---

## La arquitectura de la secuencia de bienvenida

La mayoría de los fundadores envía un único correo de bienvenida: "¡Gracias por registrarte! Aquí tienes un enlace a nuestra documentación." Luego se preguntan por qué nadie usa el producto.

El problema no es el correo — es la **falta de un sistema**. Una secuencia de bienvenida no es un mensaje único. Es una **campaña coordinada** que asume que el cliente no sabe nada, está ocupado y necesita una orientación amable y persistente.

<FlipCard
  front="¿Cuál es la diferencia entre un correo de bienvenida y una secuencia de bienvenida?"
  back="Un correo de bienvenida es un mensaje único. Una secuencia de bienvenida son 5-7 correos durante 14 días, cada uno con un trabajo específico: confirmar la compra, guiar la primera acción, celebrar los logros, resolver bloqueos y construir hábitos."
/>

### El marco de los 7 correos

Esta es la estructura que reduce el abandono del primer mes del ~38% al ~10%:

<SlideNavigation>
<Slide title="Correo 1: La bienvenida instantánea (Día 0)">

**Momento:** Dentro de los 5 minutos de la compra
**Tasa de apertura:** 60-80%
**Función:** Confirmar la compra, establecer expectativas, proporcionar el primer paso

Este correo hace tres cosas:

1. **Confirma la compra** — "Ya estás dentro. Esto es lo que sucede a continuación."
2. **Establece expectativas** — "Durante los próximos 14 días, te guiaré hacia tu primer logro."
3. **Da una acción clara** — "Tu primer paso: [acción específica con enlace directo]."

**Plantilla:**

```
Asunto: ¡Bienvenido/a a [Producto]! Aquí está tu primer paso

Hola [Nombre],

Ya estás dentro oficialmente. Bienvenido/a a [Producto].

Durante las próximas dos semanas, te enviaré algunos correos para ayudarte a obtener tu primer [resultado] lo más rápido posible. Sin relleno — solo los pasos exactos que funcionan.

Tu primer paso: [Acción específica]
[Enlace directo a esa acción]

Esto lleva unos 3 minutos. Una vez que lo hagas, verás [resultado específico].

¿Tienes preguntas? Solo responde a este correo — leo todos.

[Tu nombre]
Fundador/a, [Producto]
```

**Por qué funciona:**

- Enviado desde un nombre personal (tasas de apertura 20-30% más altas que nombres de empresa)
- Una acción clara, no un menú de opciones
- Establece el tono: útil, directo, con la participación del fundador

</Slide>

<Slide title="Correo 2: La guía de inicio rápido (Día 1)">

**Momento:** 24 horas después del registro
**Función:** Reforzar la primera acción con un tutorial paso a paso

La mayoría de los clientes no completará el primer paso del Correo 1. Este correo asume eso y proporciona un **video de 3 minutos o una guía visual** que muestra exactamente cómo hacerlo.

**Plantilla:**

```
Asunto: Lo único que debes hacer primero

Hola [Nombre],

Ayer mencioné [primera acción]. Si ya la hiciste — genial, llevas ventaja.

Si no, sin problema. Aquí tienes un tutorial de 3 minutos:
[Enlace al video de Loom o guía con capturas]

Esta es la cosa más importante que hacer en tu primera semana. Todo lo demás se construye sobre esto.

Una vez que lo hayas hecho, responde este correo y cuéntame. Te enviaré el siguiente paso.

[Tu nombre]
```

**Por qué funciona:**

- Asume la no-finalización sin avergonzar
- El tutorial visual reduce la fricción
- El prompt de respuesta crea un ciclo de engagement

</Slide>

<Slide title="Correo 3: El primer empujón hacia el logro (Día 3)">

**Momento:** 72 horas después del registro
**Función:** Verificar si alcanzaron el primer hito; empujar si no

Aquí comienza la segmentación. Idealmente, este correo tiene un **disparador basado en comportamiento** (se envía cuando completan la primera acción O cuando no lo han hecho después de 3 días).

**Plantilla (si el hito NO se alcanzó):**

```
Asunto: ¿Ya probaste [función principal]?

Hola [Nombre],

Revisión rápida: ¿Has tenido oportunidad de [primera acción] todavía?

Sé que empezar puede sentirse abrumador. Si estás bloqueado/a, estos son los dos obstáculos más comunes:

1. [Obstáculo común 1] → [Solución rápida]
2. [Obstáculo común 2] → [Solución rápida]

¿Sigues bloqueado/a? Responde a este correo o [reserva una llamada de 15 minutos].

[Tu nombre]
```

**Plantilla (si el hito SÍ se alcanzó):**

```
Asunto: Acabas de [logro] 🎉

Hola [Nombre],

Vi que acabas de [completar primera acción]. Buen trabajo.

Por qué importa eso: [beneficio específico o resultado].

Tu siguiente paso: [segunda acción]. Esto se basa en lo que acabas de hacer y desbloquea [siguiente resultado].

[Enlace directo]

[Tu nombre]
```

**Por qué funciona:**

- Ramificación basada en comportamiento (mensajes diferentes para estados diferentes)
- Soluciona los obstáculos comunes de forma proactiva
- Celebra los logros para generar impulso

</Slide>

<Slide title="Correo 4: Prueba social + motivación (Día 5)">

**Momento:** 5 días después del registro
**Función:** Mostrar qué es posible; motivar el engagement continuo

Para el Día 5, la emoción inicial se está desvaneciendo. Este correo **recarga energías** mostrando lo que otros clientes lograron en su primera semana.

**Plantilla:**

```
Asunto: Lo que [Nombre del cliente] logró en la semana 1

Hola [Nombre],

Llevas 5 días. Esto es lo que uno de nuestros clientes, [Nombre], logró en su primera semana:

[Resultado específico y medible — p.ej., "Generó 47 leads calificados" o "Redujo el tiempo de construcción de informes de 4 horas a 20 minutos"]

Empezaron exactamente donde estás ahora. ¿La diferencia? [Acción específica].

Si quieres resultados similares, esto es en lo que enfocarte esta semana:
- [Acción 1]
- [Acción 2]

[Tu nombre]
```

**Por qué funciona:**

- Prueba social de un par (no un caso de estudio de Fortune 500)
- Resultado concreto y creíble
- Vincula el éxito a acciones específicas

</Slide>

<Slide title="Correo 5: El check-in (Día 7)">

**Momento:** 7 días después del registro
**Función:** Check-in personal; ofrecer ayuda

Este es el **precipicio de retención**. El engagement se consolida o cae permanentemente en el Día 7. Un check-in personal enviado por el fundador puede recuperar el 15-25% de los usuarios en riesgo.

**Plantilla:**

```
Asunto: Tu primera semana — ¿cómo va?

Hola [Nombre],

Llevas una semana usando [Producto]. ¿Cómo va?

Tengo genuina curiosidad:
- ¿Qué está funcionando bien?
- ¿Qué ha sido frustrante?
- ¿Hay algo que te esté bloqueando para lograr [resultado deseado]?

Solo responde — leo cada respuesta y con frecuencia hago llamadas rápidas para ayudar a resolver problemas.

[Tu nombre]
```

**Por qué funciona:**

- Tono genuino y humano (no suena automatizado)
- Las preguntas abiertas invitan a retroalimentación real
- Señala que al fundador le importa

</Slide>

<Slide title="Correo 6: Expansión de funcionalidades (Día 10)">

**Momento:** 10 días después del registro
**Función:** Introducir un segundo caso de uso o funcionalidad avanzada

Asumiendo que ya alcanzaron el primer hito, este correo **expande su uso** mostrando una segunda forma de obtener valor.

**Plantilla:**

```
Asunto: Desbloquea [funcionalidad avanzada] — así se hace

Hola [Nombre],

Ahora que ya [primer hito], estás listo/a para el siguiente nivel: [segunda funcionalidad/caso de uso].

Esto es lo que hace: [beneficio específico].

Y así se usa: [proceso de 3 pasos o enlace al video].

La mayoría de los clientes que usan esta funcionalidad ven [resultado específico] en [plazo].

[Tu nombre]
```

**Por qué funciona:**

- Se construye sobre el éxito existente (no abruma)
- Vincula la nueva funcionalidad a un resultado concreto
- Corto y accionable

</Slide>

<Slide title="Correo 7: El informe de progreso de 2 semanas (Día 14)">

**Momento:** 14 días después del registro
**Función:** Resumir el progreso, celebrar logros, establecer el próximo hito

Este correo **cierra el ciclo de la secuencia de bienvenida** y hace la transición del cliente hacia el engagement continuo.

**Plantilla:**

```
Asunto: Tu informe de progreso de 2 semanas

Hola [Nombre],

Llevas dos semanas con nosotros. Esto es lo que has logrado:

✅ [Hito 1]
✅ [Hito 2]
✅ [Hito 3]

Eso te pone por delante del 70% de los nuevos usuarios. Bien hecho.

Tu próximo hito: [objetivo específico]. Así llegar allí: [enlace a guía o siguiente paso].

Haré otro check-in en el Día 30 para ver cómo te va.

[Tu nombre]
```

**Por qué funciona:**

- Cuantifica el progreso (genera confianza)
- Compara con pares (prueba social)
- Establece un objetivo claro a continuación

</Slide>
</SlideNavigation>

<InteractiveChecklist
title="Lista de verificación de la secuencia de bienvenida"
persistKey="onboarding-L4-sequence-checklist"
items={[
"Redactar el Correo 1 (Bienvenida instantánea) con un primer paso claro",
"Crear un video de 3 minutos o guía visual para el Correo 2",
"Escribir variantes basadas en comportamiento para el Correo 3 (hito alcanzado vs. no alcanzado)",
"Identificar una historia de éxito de cliente para el Correo 4",
"Redactar el check-in personal para el Correo 5",
"Mapear el segundo caso de uso o funcionalidad avanzada para el Correo 6",
"Diseñar el informe de progreso de 2 semanas para el Correo 7"
]}
/>

---

## Construyendo tu secuencia de bienvenida

La teoría es inútil sin ejecución. Construyamos tu secuencia de bienvenida real ahora mismo.

<TemplateBuilder
title="Tu secuencia de bienvenida de 7 correos"
persistKey="onboarding-L4-sequence-builder"
sections={[
{
id: "email1",
title: "Correo 1: Bienvenida instantánea (Día 0)",
fields: [
{
id: "subject1",
label: "Línea de asunto",
placeholder: "¡Bienvenido/a a [Producto]! Aquí está tu primer paso",
type: "text"
},
{
id: "firststep",
label: "Primera acción (específica, un solo paso)",
placeholder: "p.ej., Crea tu primer proyecto, Sube tu primer archivo, Completa tu perfil",
type: "text"
},
{
id: "body1",
label: "Cuerpo del correo",
placeholder: "Hola [Nombre],\n\nYa estás dentro oficialmente. Bienvenido/a a [Producto].\n\nTu primer paso: [acción]\n[Enlace]\n\n[Tu nombre]",
type: "textarea"
}
]
},
{
id: "email2",
title: "Correo 2: Guía de inicio rápido (Día 1)",
fields: [
{
id: "subject2",
label: "Línea de asunto",
placeholder: "Lo único que debes hacer primero",
type: "text"
},
{
id: "guidelink",
label: "Enlace al video/guía visual",
placeholder: "https://...",
type: "text"
},
{
id: "body2",
label: "Cuerpo del correo",
placeholder: "Hola [Nombre],\n\nAyer mencioné [primera acción]. Aquí tienes un tutorial de 3 minutos:\n[Enlace]\n\n[Tu nombre]",
type: "textarea"
}
]
},
{
id: "email3",
title: "Correo 3: Empujón hacia el primer logro (Día 3)",
fields: [
{
id: "milestone",
label: "Definición del primer hito",
placeholder: "p.ej., Creó el primer proyecto, Envió el primer correo, Ejecutó el primer informe",
type: "text"
},
{
id: "blocker1",
label: "Obstáculo común 1 + Solución",
placeholder: "p.ej., 'No encuentro el botón de importar' → 'Está en la esquina superior derecha, junto a Configuración'",
type: "textarea"
},
{
id: "blocker2",
label: "Obstáculo común 2 + Solución",
placeholder: "p.ej., 'Los datos no sincronizan' → 'Verifica tu clave API en Configuración > Integraciones'",
type: "textarea"
}
]
},
{
id: "email4",
title: "Correo 4: Prueba social (Día 5)",
fields: [
{
id: "customername",
label: "Nombre del cliente (o anonimizado)",
placeholder: "p.ej., María, una consultora de marketing",
type: "text"
},
{
id: "outcome",
label: "Resultado específico que lograron",
placeholder: "p.ej., Generó 47 leads calificados en 10 días",
type: "text"
}
]
},
{
id: "email5",
title: "Correo 5: Check-in (Día 7)",
fields: [
{
id: "subject5",
label: "Línea de asunto",
placeholder: "Tu primera semana — ¿cómo va?",
type: "text"
},
{
id: "body5",
label: "Cuerpo del correo (mantenerlo personal y abierto)",
placeholder: "Hola [Nombre],\n\nLlevas una semana usando [Producto]. ¿Cómo va?\n\n¿Qué funciona? ¿Qué es frustrante?\n\nSolo responde.\n\n[Tu nombre]",
type: "textarea"
}
]
},
{
id: "email6",
title: "Correo 6: Expansión de funcionalidades (Día 10)",
fields: [
{
id: "secondfeature",
label: "Segunda funcionalidad/caso de uso",
placeholder: "p.ej., Informes automatizados, Colaboración en equipo, Filtros avanzados",
type: "text"
},
{
id: "benefit",
label: "Beneficio específico",
placeholder: "p.ej., Ahorra 2 horas/semana en informes manuales",
type: "text"
}
]
},
{
id: "email7",
title: "Correo 7: Informe de progreso (Día 14)",
fields: [
{
id: "milestone1",
label: "Hito 1 (del Correo 3)",
placeholder: "p.ej., Creó el primer proyecto",
type: "text"
},
{
id: "milestone2",
label: "Hito 2 (del Correo 6)",
placeholder: "p.ej., Usó la funcionalidad avanzada",
type: "text"
},
{
id: "nextgoal",
label: "Objetivo para los próximos 30 días",
placeholder: "p.ej., Invitar a un miembro del equipo, Automatizar el primer flujo de trabajo",
type: "text"
}
]
}
]}
/>

---

## Listas de verificación dentro de la app: haciendo visible el progreso

Las secuencias de correo guían a los clientes **fuera** de tu producto. Las listas de verificación dentro de la app los guían **dentro** de él.

La combinación es poderosa: los correos recuerdan y motivan; las listas de verificación muestran exactamente qué hacer y rastrean el progreso en tiempo real.

<InsightCard icon="📈" title="El efecto de la lista de verificación">
Los usuarios que completan una lista de verificación de onboarding tienen **3 veces más probabilidades** de convertirse en clientes a largo plazo. Las listas de verificación dentro de la app aumentan la adopción de funcionalidades entre un 150-200%. ¿El motivo? Hacen visible y rastreable el camino invisible hacia el valor.
</InsightCard>

### La fórmula de la lista de 3-5 elementos

Tu lista de verificación debe tener **3-5 elementos**, no 10. Cada elemento debe:

1. Ser una **acción concreta** (no "Aprende sobre X" — eso es vago)
2. Enlazar directamente a la acción (un clic para empezar)
3. Desbloquear un resultado visible (barra de progreso, animación de celebración, insignia)

<ExampleCard label="Caso de estudio: La lista de verificación de 3 elementos">
Un SaaS de gestión de proyectos tenía una lista de verificación de onboarding de 12 elementos. Tasa de finalización: 8%.

La redujeron a 3 elementos:

- ✅ Crea tu primer proyecto
- ✅ Agrega tu primera tarea
- ✅ Invita a un miembro del equipo

La tasa de finalización saltó al 64%. ¿Por qué? **Lo alcanzable se siente motivador. Lo abrumador se siente paralizante.**
</ExampleCard>

### Diseñando tu lista de verificación

<ClassifyExercise
title="¿Buen elemento para la lista o malo?"
persistKey="onboarding-L4-classify-checklist"
categories={[
{ id: "good", label: "Buen elemento", color: "#10b981" },
{ id: "bad", label: "Mal elemento", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Aprende sobre nuestras funcionalidades",
correctCategory: "bad",
explanation: "Demasiado vago. ¿Qué significa 'aprender'? No hay acción ni resultado claros."
},
{
id: "2",
content: "Crea tu primer proyecto",
correctCategory: "good",
explanation: "Acción concreta. Resultado claro. Un clic para empezar."
},
{
id: "3",
content: "Explora el panel de control",
correctCategory: "bad",
explanation: "'Explorar' es pasivo. No hay estado de finalización medible."
},
{
id: "4",
content: "Sube tu primer archivo",
correctCategory: "good",
explanation: "Acción específica. Medible. Lleva al primer valor."
},
{
id: "5",
content: "Mira nuestros videos tutoriales",
correctCategory: "bad",
explanation: "Consumo pasivo. No crea valor dentro del producto."
},
{
id: "6",
content: "Invita a un miembro del equipo",
correctCategory: "good",
explanation: "Acción concreta. Aumenta la adhesión (efecto de red)."
},
{
id: "7",
content: "Personaliza tu configuración",
correctCategory: "bad",
explanation: "No está vinculado al primer valor. Se puede hacer después."
},
{
id: "8",
content: "Ejecuta tu primer informe",
correctCategory: "good",
explanation: "Entrega valor inmediato. Finalización medible."
}
]}
/>

### La conexión entre la lista y los correos

Los elementos de tu lista de verificación deben **reflejar los hitos de tu secuencia de correos**:

| Elemento de la lista              | Correo correspondiente                 |
| --------------------------------- | -------------------------------------- |
| ✅ Completa tu perfil             | Correo 1: Bienvenida instantánea       |
| ✅ [Primera acción principal]     | Correo 2: Guía de inicio rápido        |
| ✅ [Segundo caso de uso]          | Correo 6: Expansión de funcionalidades |
| ✅ Invita a un miembro del equipo | Correo 7: Informe de progreso          |

Esto crea **refuerzo**: el correo les recuerda, la lista les muestra dónde hacer clic, y la finalización dispara el siguiente correo.

---

## Construyendo tu lista de verificación dentro de la app

<TemplateBuilder
title="Tu lista de verificación de onboarding dentro de la app"
persistKey="onboarding-L4-checklist-builder"
sections={[
{
id: "item1",
title: "Elemento 1 de la lista: Primera acción principal",
fields: [
{
id: "action1",
label: "Descripción de la acción",
placeholder: "p.ej., Crea tu primer proyecto, Sube tu primer archivo, Envía tu primer correo",
type: "text"
},
{
id: "outcome1",
label: "¿Qué ocurre al completarse?",
placeholder: "p.ej., Verás el panel de tu proyecto, Tu archivo aparece en la biblioteca",
type: "text"
},
{
id: "link1",
label: "Enlace directo (¿adónde lleva al hacer clic?)",
placeholder: "/nuevo-proyecto o /subir",
type: "text"
}
]
},
{
id: "item2",
title: "Elemento 2 de la lista: Primer hito de valor",
fields: [
{
id: "action2",
label: "Descripción de la acción",
placeholder: "p.ej., Ejecuta tu primer informe, Completa tu primera tarea, Envía tu primera campaña",
type: "text"
},
{
id: "outcome2",
label: "¿Qué ocurre al completarse?",
placeholder: "p.ej., Verás tus primeros análisis de datos, Tarea marcada como completada",
type: "text"
},
{
id: "link2",
label: "Enlace directo",
placeholder: "/informes o /tareas",
type: "text"
}
]
},
{
id: "item3",
title: "Elemento 3 de la lista: Acción de formación de hábitos",
fields: [
{
id: "action3",
label: "Descripción de la acción",
placeholder: "p.ej., Invita a un miembro del equipo, Configura tu primera automatización, Conecta una integración",
type: "text"
},
{
id: "outcome3",
label: "¿Qué ocurre al completarse?",
placeholder: "p.ej., El miembro del equipo recibe la invitación, La automatización se ejecuta, La integración sincroniza datos",
type: "text"
},
{
id: "link3",
label: "Enlace directo",
placeholder: "/equipo o /automatizaciones o /integraciones",
type: "text"
}
]
},
{
id: "optional4",
title: "Elemento 4 opcional: Expansión de funcionalidades",
fields: [
{
id: "action4",
label: "Descripción de la acción (dejar en blanco si solo usas 3 elementos)",
placeholder: "p.ej., Prueba los filtros avanzados, Crea una plantilla personalizada",
type: "text"
},
{
id: "outcome4",
label: "¿Qué ocurre al completarse?",
placeholder: "p.ej., Ver resultados filtrados, Plantilla guardada",
type: "text"
}
]
},
{
id: "celebration",
title: "Celebración al completar",
fields: [
{
id: "message",
label: "¿Qué mensaje se muestra cuando la lista está 100% completa?",
placeholder: "p.ej., '¡Todo listo! Completaste el onboarding y desbloqueaste [funcionalidad].'",
type: "textarea"
},
{
id: "reward",
label: "Recompensa o siguiente paso (opcional)",
placeholder: "p.ej., Insignia, Código de descuento, Desbloquear funcionalidades avanzadas, Reservar una llamada estratégica",
type: "text"
}
]
}
]}
/>

---

## Implementación: herramientas y tácticas

Has diseñado tu secuencia de bienvenida y tu lista de verificación. Ahora: ¿cómo los construyes en la práctica?

### Opción 1: Herramientas para secuencias de correo (más sencillo)

<FlipCard
  front="¿Cuál es la forma más simple de construir una secuencia de bienvenida para un fundador en solitario?"
  back="Usa tu proveedor de servicios de correo electrónico (ESP) existente — ConvertKit, Mailchimp o Customer.io — para crear una automatización basada en tiempo. Disparador: 'Nuevo cliente creado'. Luego programa 7 correos para los Días 0, 1, 3, 5, 7, 10 y 14."
/>

| Herramienta     | Mejor para                                      | Precio                           | Tiempo de configuración |
| --------------- | ----------------------------------------------- | -------------------------------- | ----------------------- |
| **ConvertKit**  | Creadores, coaches                              | $29/mes (1.000 suscriptores)     | 2-3 horas               |
| **Mailchimp**   | Presupuesto limitado                            | Gratis (500 contactos) / $13/mes | 2-3 horas               |
| **Customer.io** | SaaS con disparadores basados en comportamiento | $100/mes (Essentials)            | 4-6 horas               |
| **Intercom**    | SaaS con mensajería dentro de la app            | $39/mes (Starter)                | 3-4 horas               |

**Punto de partida recomendado:** Usa el ESP que ya tienes. No cambies de herramienta solo para el onboarding.

### Opción 2: Herramientas para listas de verificación dentro de la app

| Herramienta                | Función                               | Precio                | Adecuación para solitario             |
| -------------------------- | ------------------------------------- | --------------------- | ------------------------------------- |
| **UserGuiding**            | Listas + tours dentro de la app       | $89/mes (Basic)       | Alta — asequible, fácil de configurar |
| **Appcues**                | Flujos de onboarding dentro de la app | $249/mes (Essentials) | Media — potente pero costoso          |
| **Chameleon**              | Tours + tooltips dentro de la app     | $279/mes (Startup)    | Media — rico en funciones pero caro   |
| **HTML/CSS personalizado** | Lista DIY en tu app                   | Gratis                | Alta — si sabes programar             |

**Punto de partida recomendado:** Si sabes programar, construye una lista HTML sencilla (3-5 elementos, barra de progreso, celebración al completar). Si no, usa UserGuiding.

### Opción 3: Híbrido (correo + lista sencilla)

La mayoría de los fundadores en solitario debería empezar aquí:

1. **Secuencia de correo** en tu ESP existente (ConvertKit, Mailchimp, etc.)
2. **Lista sencilla** como página de Notion, Google Doc o HTML básico en tu app

Esto cuesta $0-30/mes y toma 4-6 horas en configurarse.

<RangeSlider
  label="¿Qué tan técnico/a eres?"
  min={1}
  max={10}
  lowLabel="Nada técnico/a"
  highLabel="Sé programar"
  persistKey="onboarding-L4-technical"
/>

<ContextualNote showWhen={{ technical: [1, 2, 3, 4, 5] }} variant="personalized" title="Para fundadores no técnicos">
Comienza solo con secuencias de correo. Usa ConvertKit o Mailchimp para construir el flujo de 7 correos. Omite las listas dentro de la app por ahora — las puedes agregar más adelante cuando tengas presupuesto o contrates a un desarrollador.
</ContextualNote>

<ContextualNote showWhen={{ technical: [6, 7, 8, 9, 10] }} variant="personalized" title="Para fundadores técnicos">
Construye una lista de verificación personalizada dentro de la app usando HTML/CSS/JavaScript. Almacena el estado de finalización en localStorage o tu base de datos. Dispara animaciones de celebración con transiciones CSS. Esto te da control total y cuesta $0.
</ContextualNote>

---

## La estrategia del campo "De:"

Un detalle táctico que impacta enormemente las tasas de apertura: **de quién es el correo**.

<SwipeDecision
title="¿Buen campo 'De:' o malo?"
description="Desliza a la derecha para campos 'De:' con alta tasa de apertura, a la izquierda para los de baja tasa"
optionA="Baja tasa de apertura"
optionB="Alta tasa de apertura"
persistKey="onboarding-L4-from-line"
cards={[
{
id: "1",
content: "De: noreply@empresa.com",
correctOption: "a",
explanation: "'noreply' señala 'no interactúes'. Las tasas de apertura caen un 30-40%."
},
{
id: "2",
content: "De: Sara de [Producto]",
correctOption: "b",
explanation: "Nombre personal + empresa. Tasas de apertura 20-30% más altas que las genéricas."
},
{
id: "3",
content: "De: Equipo de [Producto]",
correctOption: "a",
explanation: "Genérico. Parece automatizado. Menor confianza y tasas de apertura."
},
{
id: "4",
content: "De: Sara (Fundadora)",
correctOption: "b",
explanation: "Personal + rol. Señala la participación del fundador. Alta confianza."
},
{
id: "5",
content: "De: soporte@empresa.com",
correctOption: "a",
explanation: "Parece un sistema de tickets, no una bienvenida. Bajo engagement."
}
]}
/>

**Regla:** Siempre envía correos de onboarding desde un nombre personal (tu nombre o el de un miembro del equipo), no desde una dirección genérica de empresa.

---

## Midiendo el éxito

Construiste tu secuencia de bienvenida y tu lista de verificación. ¿Cómo sabes si está funcionando?

### Las 4 métricas clave

<FlipCard
  front="¿Cuáles son las 4 métricas que indican si tu onboarding está funcionando?"
  back="1. Tasas de apertura de correos (objetivo: 50%+ para el Correo 1, 30%+ para el Correo 7). 2. Tasa de finalización de la lista de verificación (objetivo: 50%+). 3. Tiempo hasta el Primer Valor (objetivo: &lt;24 horas para SaaS). 4. Abandono del primer mes (objetivo: &lt;15%)."
/>

| Métrica                           | Objetivo                                    | Cómo medirla                                              |
| --------------------------------- | ------------------------------------------- | --------------------------------------------------------- |
| **Tasa de apertura Correo 1**     | 60-80%                                      | Analíticas del ESP                                        |
| **Tasa de apertura Correo 7**     | 30-50%                                      | Analíticas del ESP                                        |
| **Tasa de finalización de lista** | 50%+                                        | Analíticas dentro de la app o seguimiento manual          |
| **Tiempo hasta el Primer Valor**  | &lt;24 horas (SaaS), &lt;7 días (servicios) | Registra el tiempo desde el registro hasta el primer hito |
| **Abandono del primer mes**       | &lt;15%                                     | Tasa de abandono en los primeros 30 días                  |

### El ritual de revisión semanal

Cada lunes, invierte 15 minutos revisando:

1. ¿Cuántos nuevos clientes se registraron la semana pasada?
2. ¿Cuántos completaron la lista de verificación?
3. ¿Cuál es el TTFV promedio?
4. ¿Hay patrones en quién se estanca vs. quién tiene éxito?

<InteractiveChecklist
title="Revisión semanal del onboarding"
persistKey="onboarding-L4-weekly-review"
items={[
"Verificar tasa de apertura del Correo 1 (objetivo: 60%+)",
"Verificar tasa de apertura del Correo 7 (objetivo: 30%+)",
"Calcular tasa de finalización de la lista de verificación (objetivo: 50%+)",
"Medir el Tiempo hasta el Primer Valor promedio",
"Identificar obstáculos comunes o puntos de estancamiento",
"Revisar tasa de abandono del primer mes (objetivo: &lt;15%)"
]}
/>

---

## Errores comunes (y cómo evitarlos)

### Error 1: Demasiados correos

**El problema:** Enviar correos diarios parece útil para ti pero abrumador para los clientes.

**La solución:** Limítate a 5-7 correos durante 14 días. No más de 1 correo cada 2 días.

### Error 2: Contenido genérico

**El problema:** "Hola, ¡bienvenido/a a nuestra plataforma!" parece automatizado e impersonal.

**La solución:** Usa el nombre del cliente, haz referencia a su caso de uso específico o fuente de registro, y escribe con una voz personal y de fundador.

### Error 3: Sin siguiente paso claro

**El problema:** Correos que dicen "¡Explora nuestras funcionalidades!" sin una acción específica.

**La solución:** Cada correo debe tener **una acción clara** con un enlace directo.

### Error 4: Sobrecarga en la lista de verificación

**El problema:** Listas de 10-15 elementos que nadie completa.

**La solución:** Máximo 3-5 elementos. Enfócate en las acciones que predicen la retención.

<RewriteExercise
title="Reescribe este correo de bienvenida genérico"
persistKey="onboarding-L4-rewrite"
original="Asunto: ¡Bienvenido/a a nuestra plataforma!\n\nHola,\n\nGracias por registrarte. Estamos emocionados de tenerte.\n\nSiéntete libre de explorar nuestras funcionalidades y avísanos si tienes preguntas.\n\nSaludos,\nEl Equipo"
hint="Hazlo personal, específico y orientado a la acción. Incluye el nombre del cliente, un primer paso claro y un enlace directo."
expertRewrite="Asunto: ¡Bienvenido/a a [Producto]! Aquí está tu primer paso\n\nHola [Nombre],\n\nYa estás dentro oficialmente. Bienvenido/a a [Producto].\n\nTu primer paso: Crea tu primer proyecto. Esto toma unos 3 minutos y verás [resultado específico].\n\n[Enlace directo a 'Nuevo Proyecto']\n\n¿Tienes preguntas? Solo responde — leo todos los correos.\n\nSara\nFundadora, [Producto]"
criteria={[
"Usa el nombre del cliente",
"Incluye una acción específica",
"Proporciona un enlace directo",
"Firmado por una persona real (no 'El Equipo')",
"Establece expectativas claras"
]}
/>

---

## Tu plan de acción

Ahora tienes los marcos, plantillas y herramientas para construir una secuencia de bienvenida y una lista de verificación dentro de la app que reduzca el abandono del primer mes del ~38% al ~10%.

Aquí está tu plan de implementación:

<InteractiveChecklist
title="Tu sprint de implementación de onboarding"
persistKey="onboarding-L4-action-plan"
items={[
"Completar el constructor de secuencia de bienvenida de 7 correos arriba",
"Completar el constructor de lista de verificación dentro de la app arriba",
"Elegir tu herramienta de correo (ConvertKit, Mailchimp, Customer.io, etc.)",
"Configurar la automatización de correo en tu ESP (4-6 horas)",
"Construir o implementar tu lista de verificación dentro de la app (2-4 horas si programas, 1-2 horas si usas UserGuiding)",
"Probar la secuencia completa tú mismo/a (regístrate como cliente de prueba)",
"Configurar el ritual de revisión semanal (cada lunes, 15 minutos)",
"Lanzar y monitorear durante 2 semanas, luego iterar según las métricas"
]}
/>

**Inversión de tiempo:** 8-12 horas de configuración única. 15 minutos/semana en adelante.

**Impacto esperado:** El abandono del primer mes cae del ~38% al ~10-15% en 60 días.

---

## Vista previa de la próxima lección

Construiste la secuencia de bienvenida. Pero ¿qué ocurre cuando los clientes **se estancan** en el Día 7 — no han alcanzado el primer hito, no están interactuando, y están en alto riesgo de abandonar?

**Lección 5: El correo del "Primer logro" en el Día 7** cubre:

- Disparadores basados en comportamiento vs. disparadores basados en tiempo
- Escribir el correo de intervención para onboarding estancado
- Segmentar clientes en "en buen camino" vs. "en riesgo"
- El árbol de decisiones del Día 7: celebración vs. empujón vs. rescate

Nos vemos allí.
