---
title: "Tu Playbook de Ventas Comunitarias"
duration: "50 min"
track: "Economía del Creador"
course: "Curso 28: Ventas Impulsadas por Comunidad"
lesson: 8
---

# Tu Playbook de Ventas Comunitarias

Ahora entiendes los modelos, las plataformas, los embudos, las estrategias de participación, las mecánicas de retención, las estructuras híbridas y la psicología de precios. Esta lección final sintetiza todo en un playbook concreto y accionable que puedes ejecutar en los próximos 90 días.

Esto no es teoría. Este es tu plan de lanzamiento.

---

## Paso 1: Elige Tu Plataforma (Días 1-3)

Tomaste una decisión preliminar de plataforma en la Lección 2. Ahora es momento de comprometerte. Aquí está la decisión simplificada a su esencia:

**Elige Skool si:**

- Quieres un precio, una comunidad, configuración mínima
- Te sientes cómodo con el ecosistema de Skool y sus funciones de descubrimiento integradas
- Planeas embeber contenido de cursos dentro de la comunidad
- Quieres lanzar dentro de 48 horas

**Elige Circle si:**

- Necesitas múltiples niveles o múltiples productos
- Quieres personalización profunda e integraciones
- Te sientes cómodo con un proceso de configuración de 1-2 semanas
- Planeas escalar más allá de 500 miembros y necesitas flexibilidad

**Elige Mighty Networks si:**

- Una app móvil con tu marca es importante para tu audiencia
- Quieres cursos, comunidad, eventos y membresías en una plataforma
- Estás dispuesto a invertir en un proceso de configuración más largo para un feeling de "plataforma"

**Elige WhatsApp Communities + complemento si:**

- Tu audiencia es predominantemente latinoamericana
- Quieres cero fricción de adopción (todos ya tienen WhatsApp)
- Usas una herramienta complementaria para contenido estructurado (Notion, plataforma de cursos)
- Valoras la cercanía de las notas de voz y los mensajes directos

**Elige Discord si:**

- Tu comunidad es complementaria a productos vendidos en otras plataformas
- Tu audiencia es tech-savvy y ya usa Discord
- Quieres cero costos de plataforma para empezar

**Toma la decisión.** Regístrate. Configura tu perfil y estructura básica de comunidad. No sobrepienses esto -- puedes migrar después, pero no puedes lanzar si no eliges.

<DecisionTree
title="Árbol de Decisión para Selección de Plataforma"
persistKey="community-led-sales-L8-platform"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Cuál es tu restricción principal en este momento?",
choices: [
{ label: "Velocidad — Necesito lanzar en 48 horas", nextNodeId: "speed" },
{ label: "Flexibilidad — Necesito múltiples niveles y personalización", nextNodeId: "flexibility" },
{ label: "Costo — Quiero empezar con cero costos de plataforma", nextNodeId: "cost" },
{ label: "Audiencia LATAM — Mi audiencia vive en WhatsApp", nextNodeId: "latam" }
]
},
{
id: "speed",
content: "¿Planeas embeber contenido de cursos dentro de la comunidad?",
choices: [
{ label: "Sí, los cursos serán parte de la comunidad", nextNodeId: "skool" },
{ label: "No, solo comunidad", nextNodeId: "skool-or-circle" }
]
},
{
id: "flexibility",
content: "¿Qué tan importante es una app móvil con tu marca para tu audiencia?",
choices: [
{ label: "Crítico — mi audiencia espera una app", nextNodeId: "mighty" },
{ label: "No importante — web está bien", nextNodeId: "circle" }
]
},
{
id: "cost",
content: "¿Tu audiencia ya está familiarizada con Discord?",
choices: [
{ label: "Sí, lo usan regularmente", nextNodeId: "discord" },
{ label: "No, tendrían que aprenderlo", nextNodeId: "reconsider" }
]
},
{
id: "latam",
content: "¿Necesitas contenido estructurado de cursos o es principalmente discusión y coaching?",
choices: [
{ label: "Necesito cursos estructurados + comunidad", nextNodeId: "whatsapp-hybrid" },
{ label: "Principalmente discusión, coaching y networking", nextNodeId: "whatsapp-pure" }
]
},
{
id: "skool",
content: "**Recomendación: Skool** — Configuración rápida, cursos integrados, funciones de descubrimiento fuertes. Lanza dentro de 48 horas.",
isTerminal: true,
outcome: "positive"
},
{
id: "skool-or-circle",
content: "**Recomendación: Skool o Circle** — Ambos funcionan. Elige Skool por velocidad, Circle por flexibilidad futura.",
isTerminal: true,
outcome: "positive"
},
{
id: "circle",
content: "**Recomendación: Circle** — Personalización profunda, múltiples niveles, integraciones fuertes. Planifica 1-2 semanas de configuración.",
isTerminal: true,
outcome: "positive"
},
{
id: "mighty",
content: "**Recomendación: Mighty Networks** — App con tu marca, plataforma todo-en-uno. Invierte en una configuración más larga para un feeling premium.",
isTerminal: true,
outcome: "positive"
},
{
id: "discord",
content: "**Recomendación: Discord** — Cero costo de plataforma, familiar para audiencias tech. Mejor como complemento de otros productos.",
isTerminal: true,
outcome: "positive"
},
{
id: "reconsider",
content: "**Reconsidera Discord** — Si tu audiencia no es nativa de Discord, la curva de aprendizaje puede perjudicar la adopción. Considera Skool por facilidad de uso.",
isTerminal: true,
outcome: "neutral"
},
{
id: "whatsapp-hybrid",
content: "**Recomendación: WhatsApp Communities + plataforma de cursos** — Usa WhatsApp para la comunidad viva (discusión, notas de voz, rendición de cuentas) y una plataforma como Hotmart, Teachable o tu propia web para el contenido estructurado.",
isTerminal: true,
outcome: "positive"
},
{
id: "whatsapp-pure",
content: "**Recomendación: WhatsApp Communities** — Cero fricción, máxima cercanía. Estructura con canales de anuncios, grupos temáticos y grupos de pods. Complementa con un Notion o Google Drive compartido para recursos.",
isTerminal: true,
outcome: "positive"
}
]}
/>

---

## Paso 2: Diseña Tu Estructura de Niveles (Días 3-7)

Basándote en tu trabajo de precios de la Lección 7, finaliza tus niveles. Para la mayoría de los creadores independientes lanzando su primera comunidad, recomiendo empezar con dos niveles, no tres:

### Estructura de Lanzamiento de Dos Niveles:

**Nivel Gratuito (Generación de Leads)**

- Inscripción abierta, sin pago requerido
- Espacio de discusión general
- Contenido gratuito semanal (una publicación, recurso o evento en vivo)
- Canal de presentaciones
- Biblioteca de recursos limitada (3-5 recursos iniciales)

**Nivel de Pago ($67-$127 USD / ~$1,170-$2,220 MXN al mes)**

- Acceso completo a discusiones con espacios premium
- Coaching grupal semanal o sesión de hot-seat
- Biblioteca completa de recursos
- Emparejamiento de rendición de cuentas
- Contenido de cursos (si aplica)
- Eventos exclusivos para miembros

**¿Por qué no tres niveles al lanzar?** Porque aún no tienes suficientes datos para saber qué es lo que tus miembros más valoran. Empieza con dos niveles, observa el comportamiento de los miembros por 90 días, luego divide tu nivel de pago en dos si los datos lo respaldan.

<TemplateBuilder
title="Tu Estructura de Dos Niveles"
persistKey="community-led-sales-L8-tiers"
sections={[
{
id: "free",
title: "Nivel Gratuito (Generación de Leads)",
fields: [
{ id: "name", label: "Nombre del Nivel", placeholder: "ej., Miembro de Comunidad, Insider, Starter", type: "text" },
{ id: "access", label: "¿A qué espacios/canales acceden?", placeholder: "ej., Discusión general, presentaciones, contenido gratuito semanal", type: "textarea" },
{ id: "value", label: "Propuesta de valor clave para miembros gratuitos", placeholder: "ej., Tips semanales de expertos, apoyo entre pares, biblioteca de recursos iniciales", type: "textarea" }
]
},
{
id: "paid",
title: "Nivel de Pago",
fields: [
{ id: "name", label: "Nombre del Nivel", placeholder: "ej., Miembro Pro, Círculo Interior, VIP", type: "text" },
{ id: "price", label: "Precio Mensual", placeholder: "ej., $97 USD (~$1,700 MXN)", type: "text" },
{ id: "access", label: "¿Qué acceso adicional obtienen?", placeholder: "ej., Canales premium, coaching semanal, biblioteca completa, emparejamiento de rendición de cuentas", type: "textarea" },
{ id: "unique", label: "¿Qué hace que este nivel valga el precio?", placeholder: "ej., Acceso directo a mí, frameworks probados, eventos exclusivos", type: "textarea" }
]
}
]}
/>

---

## Paso 3: Crea Tu Contenido Base (Días 7-21)

Antes de invitar a un solo miembro, prepara el contenido fundacional que haga que la comunidad se sienta viva y valiosa desde el día uno. Nadie quiere unirse a un salón vacío.

### El Producto Mínimo Viable (MVP) de Contenido:

**1. Post de bienvenida y orientación.** Un post fijado que explique qué es la comunidad, para quién es, cuáles son las reglas y cómo sacar el máximo provecho. Esto es lo primero que cada nuevo miembro lee.

**2. Cinco recursos fundacionales.** Plantillas, frameworks o guías que entreguen valor inmediato. Deben ser específicos para tu nicho y genuinamente útiles por sí solos.

**3. Tres posts semilla de discusión.** Posts que inviten a los miembros a compartir sus situaciones, hacer preguntas o participar con un prompt. Estos modelan el tipo de conversación que quieres ver.

**4. Un prompt de presentaciones.** Una plantilla para que los nuevos miembros se presenten: nombre, a qué se dedican, en qué están trabajando y con qué necesitan ayuda.

**5. Un calendario de contenido para los primeros 30 días.** Planifica tus publicaciones, eventos y recursos para el primer mes para que no estés improvisando día a día.

### Calendario de Contenido de Ejemplo para 30 Días:

| Semana | Lunes                               | Miércoles                         | Viernes                                              |
| ------ | ----------------------------------- | --------------------------------- | ---------------------------------------------------- |
| 1      | Post de bienvenida + presentaciones | Recurso: [Plantilla #1]           | Discusión: "¿Cuál es tu mayor reto en este momento?" |
| 2      | Hilo de victorias semanales         | AMA en vivo (30 min)              | Recurso: [Plantilla #2]                              |
| 3      | Spotlight de miembro (miembro beta) | Discusión: "Comparte tu progreso" | Recurso: [Plantilla #3]                              |
| 4      | Hilo de victorias semanales         | Taller en vivo (45 min)           | Resumen del mes + solicitud de retroalimentación     |

No necesitas contenido diario. Tres publicaciones de calidad por semana son suficientes para mantener una comunidad activa, especialmente al inicio.

<InteractiveChecklist
title="Checklist del MVP de Contenido"
persistKey="community-led-sales-L8-content"
items={[
"Post de bienvenida y orientación redactado (explica propósito, reglas, cómo obtener valor)",
"5 recursos fundacionales creados (plantillas, frameworks o guías)",
"3 posts semilla de discusión escritos (prompts que inviten participación de miembros)",
"Plantilla de presentaciones creada (nombre, rol, proyecto actual, con qué necesitas ayuda)",
"Calendario de contenido de 30 días planificado (mínimo 3 publicaciones por semana)"
]}
/>

---

## Paso 4: Construye Tus Primeros 100 Miembros (Días 21-60)

Los primeros 100 miembros son los más difíciles de conseguir y los más importantes. Establecen la cultura, generan los primeros testimonios y determinan si la comunidad alcanza masa crítica.

### La Estrategia de Siembra:

**Nivel 1: Tu red cercana (Miembros 1-25)**

Estas son personas que ya te conocen, les caes bien y confían en ti. Pueden ser suscriptores de email, seguidores en redes sociales, clientes pasados o contactos profesionales. Se unen por su relación contigo, no porque la comunidad se haya probado.

**Cómo alcanzarlos:**

- Email o DM personal a tus 50 contactos principales: "Estoy lanzando una comunidad para [audiencia]. Me encantaría que fueras miembro fundador. Esto es lo que incluye... Los miembros fundadores obtienen [beneficio/descuento]."
- Anuncia a tu lista de email con una invitación clara y específica
- Publica en tu plataforma social principal con un llamado a la acción directo
- En LATAM, un mensaje de WhatsApp personal o una nota de voz es mucho más efectivo que un email frío

**Meta:** 25 miembros fundadores en las primeras dos semanas

**Nivel 2: Tu audiencia extendida (Miembros 25-75)**

Estas son personas que conocen tu trabajo pero no han interactuado contigo directamente. Te siguen en redes sociales, están suscritos a tu newsletter o han consumido tu contenido gratuito.

**Cómo alcanzarlos:**

- Serie de contenido en redes sociales sobre el tema de la comunidad (no sobre la comunidad en sí). Demuestra tu expertise, luego menciona la comunidad como recurso.
- Apariciones como invitado en podcasts, canales de YouTube o newsletters en tu nicho. Ofrece valor genuino y menciona la comunidad como siguiente paso.
- Un reto o taller gratuito que atraiga a tu audiencia objetivo y lleve naturalmente a la comunidad. En LATAM, un "reto de 5 días" en un grupo temporal de WhatsApp es una estrategia probada de alta conversión.

**Meta:** 50 miembros adicionales en las siguientes 3-4 semanas

**Nivel 3: Audiencia nueva (Miembros 75-100)**

Estas son personas que nunca han oído de ti. Alcanzarlos requiere estrategias de visibilidad.

**Cómo alcanzarlos:**

- Descubrimiento nativo de plataforma (marketplace de Skool, directorio de Circle)
- Cross-promotions con creadores complementarios ("Yo promuevo tu producto a mi comunidad si tú promueves el mío a la tuya")
- Publicidad pagada (empieza pequeño -- $10-20 USD/día en Meta o YouTube segmentando tu ICP)
- Contenido optimizado para SEO que rankee por términos que tu audiencia busca
- Grupos de Facebook y foros relevantes en tu nicho donde puedes aportar valor genuino

**Meta:** 25 miembros adicionales, alcanzando tus primeros 100

<ProgressiveReveal title="La Estrategia de los Primeros 100 Miembros" persistKey="community-led-sales-L8-100members">
<RevealSection title="Nivel 1: Red Cercana (Miembros 1-25)">

**Quiénes son:** Personas que ya te conocen, les caes bien y confían en ti — suscriptores de email, seguidores en redes, clientes pasados, contactos profesionales.

**Plantilla de contacto:**

"Hola [Nombre],

Estoy lanzando una comunidad para [audiencia específica] que quieren [resultado específico]. Dado tu trabajo en [su área], pensé que serías un miembro fundador perfecto.

Esto es lo que incluye:

- [Beneficio 1]
- [Beneficio 2]
- [Beneficio 3]

Los miembros fundadores obtienen [descuento/bonus] y ayudan a dar forma a la dirección de la comunidad.

¿Te interesa? Me encantaría tenerte."

**Línea de tiempo:** Primeras 2 semanas
**Meta:** 25 miembros

</RevealSection>

<RevealSection title="Nivel 2: Audiencia Extendida (Miembros 25-75)">

**Quiénes son:** Personas que conocen tu trabajo pero no han interactuado directamente — seguidores en redes, suscriptores de newsletter, consumidores de contenido.

**Estrategias:**

1. **Serie de contenido:** Publica 5-7 piezas de contenido de alto valor sobre el tema de la comunidad (no sobre la comunidad). Demuestra expertise, luego menciona la comunidad como siguiente paso.
2. **Apariciones como invitado:** Entrevistas en podcasts, colaboraciones en YouTube, features en newsletters. Entrega valor primero, menciona la comunidad después.
3. **Reto gratuito:** Reto de 5 días por email o WhatsApp, o taller en vivo que naturalmente lleve a la membresía comunitaria.

**Línea de tiempo:** Semanas 3-6
**Meta:** 50 miembros adicionales

</RevealSection>

<RevealSection title="Nivel 3: Audiencia Nueva (Miembros 75-100)">

**Quiénes son:** Personas que nunca han oído de ti. Requiere estrategias de visibilidad y descubrimiento.

**Estrategias:**

1. **Descubrimiento en plataforma:** Optimiza para el marketplace de Skool o directorio de Circle (posicionamiento claro, oferta fuerte, prueba social)
2. **Cross-promotions:** Asóciate con creadores complementarios para promoción mutua
3. **Publicidad pagada:** Empieza pequeño ($10-20 USD/día) en Meta o YouTube segmentando tu ICP
4. **Contenido SEO:** Escribe contenido que rankee por términos que tu audiencia busca

**Línea de tiempo:** Semanas 7-9
**Meta:** 25 miembros adicionales (total: 100)

</RevealSection>
</ProgressiveReveal>

---

## Paso 5: Los Primeros 30 Días Después del Lanzamiento

Los primeros 30 días determinan si tu comunidad se vuelve auto-sustentable o se desvanece. Tu trabajo durante este período es facilitación intensiva.

### Semana 1: Onboarding y Activación

- Da la bienvenida a cada nuevo miembro personalmente (por nombre, referenciando su presentación)
- Publica el contenido de tu calendario de contenido según lo programado
- Responde a cada comentario y pregunta dentro de 4 horas
- Empareja las primeras parejas de rendición de cuentas
- Organiza tu primer evento en vivo (aunque solo asistan 5 personas)

### Semana 2: Patrones de Participación

- Lanza tu primer hilo de Victorias Semanales
- Presenta tu primer spotlight de miembro
- Comparte tu primer recurso premium
- Comienza a rastrear métricas de participación (quién publica, quién solo observa)
- Envía un check-in personal a cualquiera que no haya publicado todavía

### Semana 3: Prueba Social e Impulso

- Comparte las primeras victorias y avances de miembros
- Publica un "snapshot de la comunidad" -- cuántos miembros, cuántas discusiones, qué temas están en tendencia
- Organiza tu segundo evento en vivo con un invitado o formato diferente
- Identifica a tus 5 miembros más comprometidos e invítalos a ser "campeones de la comunidad"

### Semana 4: Retroalimentación e Iteración

- Envía una encuesta breve a todos los miembros: "¿Qué te encanta? ¿Qué falta? ¿Qué deberíamos hacer más?"
- Revisa tus métricas de participación contra tus metas
- Ajusta tu calendario de contenido basándote en lo que generó más participación
- Anuncia el contenido y eventos del próximo mes (crea anticipación)

<SlideNavigation>
<Slide title="Semana 1: Onboarding y Activación">

**Tu enfoque:** Haz que cada nuevo miembro se sienta visto y bienvenido.

**Acciones diarias:**

- Da la bienvenida a cada nuevo miembro por nombre dentro de 2 horas de unirse
- Referencia algo específico de su presentación
- Publica contenido programado de tu calendario (sin saltarte nada)
- Responde a cada comentario y pregunta dentro de 4 horas
- Empareja las primeras parejas de rendición de cuentas basándote en metas/experiencia

**Evento clave:** Organiza tu primera sesión en vivo (aunque solo asistan 5 personas — calidad sobre cantidad)

**Métrica de éxito:** 80%+ de nuevos miembros publican una presentación

</Slide>

<Slide title="Semana 2: Patrones de Participación">

**Tu enfoque:** Establece rituales recurrentes que creen hábitos.

**Lanzamientos clave:**

- **Hilo de Victorias Semanales:** "Comparte una victoria de esta semana, sin importar qué tan pequeña"
- **Spotlight de miembro:** Presenta la historia, reto o avance de un miembro
- **Recurso premium:** Entrega tu primera plantilla o framework de alto valor

**Comienza el rastreo:**

- ¿Quién publica vs. quién solo observa?
- ¿Qué tipos de contenido generan más participación?
- ¿Quién no ha publicado todavía? (Envía un check-in personal por DM)

**Métrica de éxito:** 15%+ de miembros publican al menos una vez esta semana

</Slide>

<Slide title="Semana 3: Prueba Social e Impulso">

**Tu enfoque:** Muestra victorias tempranas y construye impulso visible.

**Contenido a crear:**

- Comparte victorias y avances de miembros (con permiso)
- Publica un "snapshot de la comunidad": número de miembros, temas de discusión, preguntas en tendencia
- Organiza segundo evento en vivo con formato diferente o experto invitado
- Identifica a los 5 miembros más comprometidos y invítalos a ser "campeones de la comunidad"

**Por qué importa:** Los nuevos miembros necesitan ver que otros están obteniendo resultados. La prueba social acelera la participación.

**Métrica de éxito:** 3+ testimonios o historias de éxito de miembros recopilados

</Slide>

<Slide title="Semana 4: Retroalimentación e Iteración">

**Tu enfoque:** Aprende qué funciona y ajusta el rumbo.

**Encuesta a tus miembros:**

- ¿Qué te encanta de la comunidad hasta ahora?
- ¿Qué falta o podría ser mejor?
- ¿Qué deberíamos hacer más? ¿Menos?

**Revisa tus datos:**

- Tasa de participación vs. meta (15%+ activos diariamente)
- Rendimiento de contenido (qué posts generaron más interacción)
- Rotación (¿alguien canceló? ¿Por qué?)

**Anuncia el próximo mes:**

- Comparte el contenido y eventos que vienen
- Incorpora la retroalimentación de miembros en los planes
- Crea anticipación de lo que viene

**Métrica de éxito:** 60%+ de tasa de respuesta a la encuesta, elementos de acción claros para el Mes 2

</Slide>
</SlideNavigation>

---

## Paso 6: La Línea de Tiempo de 90 Días para el Lanzamiento

Aquí está la línea de tiempo completa desde la decisión hasta 100 miembros:

### Fase 1: Fundación (Días 1-21)

- Día 1-3: Elige plataforma, configura estructura de comunidad
- Día 3-7: Diseña niveles, establece precios, configura pagos
- Día 7-14: Crea el MVP de contenido base (post de bienvenida, 5 recursos, posts semilla de discusión)
- Día 14-21: Prueba beta con 5-10 contactos de confianza, recopila retroalimentación, ajusta

### Fase 2: Lanzamiento Fundador (Días 21-45)

- Día 21-28: Abre inscripción de miembros fundadores a tu red cercana (meta: 25 miembros)
- Día 28-35: Expande a audiencia extendida vía email, redes sociales, apariciones como invitado
- Día 35-45: Organiza primeros eventos en vivo, establece rituales de participación, construye impulso

### Fase 3: Crecimiento (Días 45-90)

- Día 45-60: Alcanza 50 miembros, lanza primer reto o sprint
- Día 60-75: Comienza cross-promotions y estrategia de contenido orgánico
- Día 75-90: Alcanza 100 miembros, recopila testimonios, prepara aumento de precio

### Hitos Clave a Rastrear:

| Día | Hito                                      | Meta                                       |
| --- | ----------------------------------------- | ------------------------------------------ |
| 7   | Plataforma configurada                    | Completo                                   |
| 21  | MVP de contenido creado, beta probada     | 5-10 miembros beta                         |
| 30  | Lanzamiento fundador completo             | 25+ miembros                               |
| 45  | Rituales de participación establecidos    | 15%+ tasa de activos diarios               |
| 60  | Primeros testimonios recopilados          | 3+ historias de éxito de miembros          |
| 75  | Motor de crecimiento orgánico funcionando | 5+ nuevos miembros/semana                  |
| 90  | Comunidad es auto-sustentable             | 100+ miembros, 3% o menor rotación mensual |

---

## El P&L de la Comunidad a los 90 Días

Proyectemos la economía de tu comunidad a la marca de 90 días:

**Ingresos (100 miembros a $97 USD/mes / ~$1,700 MXN/mes):**

- Ingreso recurrente mensual: $9,700 USD (~$170,000 MXN)
- Tasa anual de ingresos: $116,400 USD (~$2,037,000 MXN)

**Costos:**

- Plataforma: $99 USD/mes (Skool) o $99-$219 USD/mes (Circle)
- Procesamiento Stripe (2.9% + $0.30): aproximadamente $310 USD/mes
- Tu tiempo: 15-20 horas/semana (el costo principal)
- Opcional: community manager ($500-$1,000 USD/mes medio tiempo en esta etapa, si es necesario)

**Margen neto:** 85-95% (tu principal inversión es tiempo)

**Pregunta clave a los 90 días:** ¿La comunidad está creciendo orgánicamente? Si estás agregando 5+ miembros por semana a través de referencias, contenido orgánico y descubrimiento en plataforma, el negocio está funcionando. Si aún dependes de contacto manual para cada nuevo miembro, revisa tu propuesta de valor y estrategia de participación.

<ScenarioSimulator
title="Calculadora de Economía Comunitaria a 90 Días"
persistKey="community-led-sales-L8-economics"
levers={[
{ id: "members", label: "Total de Miembros", min: 25, max: 200, step: 5, defaultValue: 100 },
{ id: "price", label: "Precio Mensual ($)", min: 47, max: 197, step: 10, defaultValue: 97 },
{ id: "churn", label: "Rotación Mensual (%)", min: 1, max: 15, step: 1, defaultValue: 3 }
]}
outputs={[
{ id: "mrr", label: "Ingreso Recurrente Mensual", formula: "members * price", unit: "$", precision: 0 },
{ id: "arr", label: "Tasa Anual de Ingresos", formula: "members * price * 12", unit: "$", precision: 0 },
{ id: "churnLoss", label: "Pérdida Mensual por Rotación", formula: "members * (churn / 100) * price", unit: "$", precision: 0 },
{ id: "netMargin", label: "Margen Neto (después de plataforma + Stripe)", formula: "(members * price) - 99 - (members * price * 0.029)", unit: "$", precision: 0 }
]}
insight="Con {members} miembros y ${price}/mes con {churn}% de rotación, necesitas agregar {Math.ceil(members _ (churn / 100))} nuevos miembros mensualmente solo para mantener el MRR actual. Para crecer, necesitas {Math.ceil(members _ (churn / 100)) + 5}+ nuevos miembros por mes."
/>

---

## El Árbol de Decisión para Lo Que Sigue

A la marca de 90 días, enfrentas una bifurcación:

**Si tu comunidad está prosperando (100+ miembros, <4% de rotación, creciendo orgánicamente):**

- Introduce tu tercer nivel (premium/círculo interior)
- Sube precios para nuevos miembros (protege a los existentes)
- Contrata un community manager medio tiempo para liberar tu tiempo
- Comienza a desarrollar contenido híbrido de cursos para aumentar el LTV

**Si tu comunidad está luchando (menos de 50 miembros, >7% de rotación, crecimiento estancado):**

- Encuesta a los miembros existentes para entender la brecha de valor
- Revisa tu posicionamiento: ¿para quién exactamente es esto y qué resultado específico entrega?
- Aumenta tu inversión en participación: más eventos en vivo, más interacción personal
- Considera si el modelo comunitario es el correcto para tu audiencia (algunas audiencias prefieren modelos 1-a-1 o basados en cohortes)

**Si estás en algún punto intermedio (50-100 miembros, 4-7% de rotación, crecimiento lento):**

- Duplica los rituales de participación de la Lección 4
- Lanza un reto de 5 días para reactivar observadores silenciosos y atraer nuevos miembros
- Pregunta a tus miembros más comprometidos qué los haría referir entusiastamente a otros
- Prueba una estructura de precios diferente (agrega opción anual, ajusta niveles)

<StrategyDuel
title="Decisión a los 90 Días: Escalar vs. Arreglar"
persistKey="community-led-sales-L8-decision"
scenario="Has llegado a los 90 días. Tu comunidad tiene 75 miembros, 5% de rotación mensual, y el crecimiento se ha desacelerado a 2-3 nuevos miembros por semana (bajó de 5-7)."
strategyA={{
    name: "Estrategia de Escalar",
    description: "Agregar tercer nivel, subir precios, invertir en publicidad y cross-promotions",
    pros: ["Aumentar ingresos por miembro", "Atraer miembros de mayor intención", "Crear ruta de upgrade"],
    cons: ["Puede alienar a miembros existentes", "Requiere más contenido/entrega", "Mayores expectativas que gestionar"]
  }}
strategyB={{
    name: "Estrategia de Arreglar",
    description: "Encuestar miembros, aumentar participación, reactivar observadores antes de escalar",
    pros: ["Entender brechas de valor antes de invertir más", "Mejorar retención primero", "Construir base más fuerte"],
    cons: ["Crecimiento de ingresos más lento", "Requiere más tiempo del fundador", "Puede perder timing de mercado"]
  }}
expertVerdict="Arregla primero, luego escala. Con 5% de rotación, estás perdiendo 3-4 miembros mensuales. Agregar un tercer nivel no resolverá la retención. Encuesta a tus miembros, identifica la brecha de participación y baja la rotación a menos del 3% antes de escalar. Una comunidad saludable de 75 miembros le gana a una de 150 miembros con fugas."
/>

---

## Tu Checklist Pre-Lanzamiento

Antes de cerrar esta lección, confirma que tienes:

<InteractiveChecklist
title="Checklist Pre-Lanzamiento"
persistKey="community-led-sales-L8-prelaunch"
items={[
"Plataforma seleccionada y cuenta creada",
"Estructura de niveles diseñada con precios claros",
"Oferta de miembro fundador definida (lugares, descuento, términos)",
"MVP de contenido esbozado (post de bienvenida, 5 recursos, 3 posts semilla de discusión, plantilla de presentaciones)",
"Calendario de contenido de 30 días redactado",
"Primeras 50 personas identificadas para contacto de miembros fundadores (nómbralas específicamente)",
"Fecha de lanzamiento establecida (dentro de 21 días de completar esta lección)",
"Métricas de éxito definidas (miembros, rotación, tasa de participación, ingresos)",
"Metas de hitos a 90 días escritas y visibles"
]}
/>

---

## Pensamiento Final

Construir una comunidad no es una táctica de marketing. Es un compromiso de servir a un grupo de personas a lo largo del tiempo. Los creadores que tienen éxito con ventas impulsadas por comunidad no son los que tienen los mejores embudos o la gamificación más sofisticada. Son los que genuinamente se preocupan por los resultados de sus miembros y se presentan consistentemente para facilitar el progreso.

En América Latina, tienes una ventaja que muchos creadores anglosajones envidian: una cultura donde la comunidad no es algo que se construye artificialmente -- es algo que vives. Las relaciones personales, las notas de voz de WhatsApp, el "¿cómo vas?" genuino, la disposición natural a ayudar al otro emprendedor. Todo esto ya es parte de tu ADN cultural. Tu trabajo no es crear comunidad desde cero -- es canalizar la comunidad que ya existe naturalmente hacia una estructura que genere valor para todos.

El playbook te da la estructura. Tu inversión auténtica en el éxito de tus miembros le da vida.

Empieza hoy. Lanza en tres semanas. Construye hasta 100 miembros en 90 días. Luego hazlo todo de nuevo a un nivel más alto.

<RangeSlider
  label="¿Qué tan listo te sientes para lanzar tu comunidad en los próximos 21 días?"
  min={1}
  max={10}
  lowLabel="Nada listo"
  highLabel="Listo para lanzar ya"
  persistKey="community-led-sales-L8-readiness"
/>

---

## Elementos de Acción

<InteractiveChecklist
title="Tus Próximos Pasos"
persistKey="community-led-sales-L8-actions"
items={[
"Completa el checklist pre-lanzamiento de arriba — cada elemento debe estar listo antes de lanzar",
"Establece tu fecha de lanzamiento y ponla en tu calendario (cuéntale a alguien para hacerlo real)",
"Redacta tu mensaje de contacto para miembros fundadores (el email/DM/WhatsApp personal para tus primeros 50 prospectos)",
"Construye tu tablero de seguimiento de 90 días (una hoja de cálculo simple: miembros, rotación, ingresos, participación semanal)",
"Identifica a tus primeros 3 campeones de comunidad (¿quién en tu red sería un miembro fundador ideal?)",
"Agenda tu primer evento en vivo (aunque sea solo un AMA de 30 minutos)",
"Escribe tu post de bienvenida y plantilla de presentaciones"
]}
/>

---

**Curso Completo.** Ahora tienes la estrategia, las tácticas y el playbook para construir un motor de ventas impulsado por comunidad. El siguiente paso es la ejecución.
