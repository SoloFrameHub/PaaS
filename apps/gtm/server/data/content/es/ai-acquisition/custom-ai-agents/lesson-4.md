---
title: "Agente 2: Agente de Primer Borrador de Email"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 4
---

Acabas de construir tu primer agente — el Agente de Investigación de Prospectos que convierte datos de contacto sin procesar en inteligencia accionable. Ahora llega el momento de la verdad: **convertir esa investigación en contacto que realmente genera respuestas.**

Aquí está el problema al que se enfrentan la mayoría de los fundadores solos: Tienes 50 resúmenes de prospectos en tu CRM. Cada uno le tomó 2 minutos a tu agente de investigación generarlo. Perfecto. Pero ahora necesitas escribir 50 emails de frío personalizados. A 10 minutos por email (si vas rápido), eso son 8+ horas de escritura.

**El Agente de Primer Borrador de Email resuelve esto.**

Lee tus resúmenes de prospectos, aplica tu voz y plantillas, y genera 3 variantes de email por prospecto en menos de 30 segundos. Tú revisas, editas ligeramente (cambios del 5-15%) y envías. Tiempo total: 2-3 minutos por prospecto en lugar de 10.

<InsightCard icon="⚡" title="La Regla 80/20 del Borrador de Email con IA">
La IA te lleva al 80-90% de calidad en 30 segundos. La edición humana — corregir una frase torpe, afilar el CTA, añadir un toque personal — añade el 10-20% final que marca la diferencia entre un 3% y un 8% de tasa de respuesta.
</InsightCard>

Pero aquí está lo que la mayoría de la gente hace mal: tratan a la IA como un botón mágico. "Escríbeme un email de frío." El resultado es basura genérica. **El secreto está en la arquitectura del prompt** — alimentar a la IA con tu resumen de investigación, tu guía de voz, tus plantillas probadas y restricciones estrictas que previenen la alucinación y el spam.

Al final de esta lección, tendrás un Agente de Primer Borrador de Email funcional que:

- Genera 3 variantes por prospecto (enfocada en dolor, en disparador, en valor)
- Pasa tu Sales Linter (conteo de palabras, profundidad de personalización, claridad del CTA)
- Se adapta a la posición en la secuencia (primer contacto vs seguimiento vs cierre)
- Cuesta $0.01-0.03 por prospecto (3 variantes)

Vamos a construirlo.

---

## La Anatomía de un Borrador de Email con IA

Antes de construir el agente, necesitas entender qué hace que un email con borradores de IA _funcione_ versus qué lo convierte en spam.

<FlipCard 
  front="El Control de Calidad FASP" 
  back="Cada email con borrador de IA debe pasar 4 pruebas: (F)actual — todas las referencias verificadas. (A)ctualmente relevante — no es un esfuerzo forzado. (E)specífico para esta persona — no aplicable a cualquiera. (O)rgulloso si supieran cómo lo encontraste." 
/>

Aquí hay un ejemplo real. El mismo prospecto (VP de Marketing en una empresa SaaS de Serie B), dos emails con borrador de IA:

<ComparisonBuilder
title="IA Genérica vs IA Guiada por Investigación"
persistKey="custom-ai-agents-L4-fasp-compare"
prompt="¿Qué email pasa la prueba FASP?"
expertExample="Asunto: tu brecha de atribución de contenido

Hola Sarah,

Vi tu publicación sobre la dificultad para vincular contenido con el pipeline. La mayoría de los VPs llegan a esto alrededor de la Serie B cuando la junta empieza a pedir el ROI del contenido.

Construimos un dashboard que conecta HubSpot + GA4 + tu CMS para mostrar qué publicaciones generan leads calificados. Puedo compartir una demo de 2 minutos si te resulta útil.

¿Vale la pena 15 minutos el martes?"
criteria={[
"Referencia algo específico (publicación de LinkedIn)",
"Nombra un dolor concreto (atribución de contenido)",
"Vincula el dolor a su etapa (Serie B, presión de la junta)",
"Ofrece valor específico (dashboard conectando 3 herramientas)",
"CTA de baja fricción (15 min, día específico)"
]}
/>

El primer email (pega el tuyo en el constructor de arriba) probablemente suena así:

> "Hola Sarah, ayudo a líderes de marketing a impulsar el ROI con nuestra plataforma. Hemos trabajado con empresas como la tuya para mejorar el rendimiento. ¿Estarías abierta a una llamada rápida?"

**Por qué falla FASP:**

- **(F)actual**: No hay referencia específica para verificar
- **(A)ctualmente relevante**: "Empresas como la tuya" es vago
- **(E)specífico**: Aplicable a cualquier VP de Marketing
- **(O)rgulloso**: Nada impresionante sobre cómo la encontraste

El segundo email pasa porque referencia una publicación real de LinkedIn (Factual), la vincula a un punto de dolor de Serie B (Actualmente relevante), nombra su brecha específica en el stack tecnológico (Específico) y demuestra que hiciste tarea (Orgulloso).

<RangeSlider 
  label="¿Con qué frecuencia pasan la prueba FASP tus emails de frío actuales?" 
  min={0} 
  max={10} 
  lowLabel="Nunca" 
  highLabel="Siempre" 
  persistKey="custom-ai-agents-L4-fasp-self" 
/>

La diferencia entre estos dos emails es la **arquitectura del prompt**. El primero vino de "Escribe un email de frío para un VP de Marketing." El segundo vino de un prompt estructurado con:

1. El resumen de investigación del prospecto (con la referencia a la publicación de LinkedIn)
2. Una guía de voz (conversacional, sin jerga)
3. Una plantilla (PAS: Dolor → Agitación → Solución)
4. Restricciones (máximo 125 palabras, un CTA, sin links)
5. Instrucciones anti-alucinación ("referencia solo hechos del resumen")

Vamos a construir ese prompt.

---

## La Arquitectura del Prompt de Borrador de Email

Tu Agente de Primer Borrador de Email necesita 5 entradas para generar borradores de calidad:

<SlideNavigation>
<Slide title="Entrada 1: Resumen de Investigación del Prospecto">

Esta es la salida del Agente 1 (Lección 3). Contiene:

- Resumen del prospecto (rol, antigüedad, trayectoria)
- Contexto de la empresa (tamaño, etapa, noticias recientes)
- Señales de dolor (basadas en el rol y la etapa de la empresa)
- Puntos de conexión (conexiones mutuas, intereses compartidos)
- Ángulo de contacto recomendado

**Por qué importa:** Esta es tu fuente de verdad. Cada referencia de personalización en el email debe provenir de este resumen. Si el resumen dice "Sarah publicó sobre desafíos de atribución de contenido", el email puede hacer referencia a eso. Si no lo dice, la IA no debería inventarlo.

<ExampleCard label="Extracto de Resumen de Muestra">
**Prospecto:** Sarah Chen, VP de Marketing en DataPulse (Serie B, 120 empleados)

**Señales de Dolor:**

- Publicación reciente en LinkedIn (hace 3 días): "Tengo dificultades para mostrar a la junta qué contenido impulsa el pipeline"
- La empresa acaba de levantar Serie B ($15M) — la junta probablemente pide prueba del ROI de marketing
- Stack tecnológico: HubSpot + GA4, pero sin capa de atribución de contenido

**Ángulo Recomendado:** Ofrecer una demo rápida del dashboard de contenido a pipeline
</ExampleCard>

</Slide>

<Slide title="Entrada 2: Biblioteca de Plantillas de Email">

No empiezas desde cero. Estás adaptando plantillas probadas. Las tres más efectivas para el contacto en frío:

**PAS (Dolor-Agitación-Solución):**

```
Asunto: {referencia específica a su situación}

Hola {primer_nombre},

{Dolor: 1 oración haciendo referencia a un desafío específico}

{Agitación: 1 oración sobre el costo/impacto de no resolverlo}

{Solución: 1 oración sobre cómo ayudas — resultado, no características}

{CTA: 1 petición específica y de baja fricción}
```

**AIDA (Atención-Interés-Deseo-Acción):**

```
Asunto: {gancho de curiosidad}

{Atención: estadística sorprendente o pregunta}

{Interés: por qué esto les importa específicamente}

{Deseo: qué cambia si resuelven esto}

{Acción: un siguiente paso claro}
```

**Con Pregunta al Inicio:**

```
Asunto: pregunta rápida sobre {su dolor}

Hola {primer_nombre},

{Pregunta: específica a su situación}

{Contexto: por qué preguntas — tu experiencia relevante}

{Valor: lo que puedes compartir si están interesados}

{CTA: sí/no u oferta de 15 min}
```

Tu agente generará una variante por plantilla, dándote 3 opciones para elegir.

</Slide>

<Slide title="Entrada 3: Guía de Voz">

Este es tu estilo de escritura codificado. Sin ella, la IA vuelve al lenguaje corporativo. Con ella, los emails suenan como tú.

<TemplateBuilder
title="Tu Guía de Voz para Emails"
persistKey="custom-ai-agents-L4-voice"
sections={[
{
id: "tone",
title: "Tono y Estilo",
fields: [
{
id: "tone",
label: "Tono General",
placeholder: "ej., Conversacional, directo, sin relleno",
type: "text"
},
{
id: "avoid",
label: "Palabras/Frases a Evitar",
placeholder: "ej., 'sinergia,' 'retomar el contacto,' 'ponerse en contacto'",
type: "textarea"
},
{
id: "signature",
label: "Frases Características",
placeholder: "ej., '¿Vale la pena 15 min?' en lugar de 'Avísame'",
type: "textarea"
}
]
},
{
id: "structure",
title: "Preferencias de Estructura",
fields: [
{
id: "length",
label: "Máximo de Palabras",
placeholder: "ej., 125 palabras",
type: "number"
},
{
id: "paragraphs",
label: "Estilo de Párrafos",
placeholder: "ej., Máximo 1-2 oraciones por párrafo",
type: "text"
},
{
id: "cta_style",
label: "Estilo de CTA",
placeholder: "ej., Siempre una pregunta, nunca una afirmación",
type: "text"
}
]
}
]}
/>

**Ejemplo de Guía de Voz:**

- Tono: Conversacional, como mensajear a un colega. Sin jerga corporativa.
- Evitar: "Quería ponerme en contacto," "retomar el contacto," "sinergia," "soluciones"
- Frases características: "¿Vale la pena 15 min?" "Pregunta rápida:" "Vi tu publicación sobre..."
- Extensión: Máximo 50-125 palabras
- Párrafos: 1-2 oraciones cada uno, mucho espacio en blanco
- CTA: Siempre una pregunta, siempre específica (día/hora o sí/no)

</Slide>

<Slide title="Entrada 4: Propuesta de Valor">

Esta es tu oferta/posicionamiento del Curso 2. La IA necesita saber _qué haces_ y _para quién_ para elaborar soluciones relevantes.

**Ejemplo:**
"Ayudamos a empresas SaaS B2B en Serie A-B ($1M-10M ARR) a reducir el CAC un 20-40% mediante puntuación de leads con IA y automatización de contacto personalizado. El cliente típico ve ROI en 60 días."

La IA usa esto para:

- Enmarcar la solución en términos de resultados (no características)
- Hacer coincidir la oferta con la etapa del prospecto (Serie B → presión de junta → prueba de ROI)
- Evitar promesas excesivas (si tu oferta es puntuación de leads, no prometas "10x de ingresos")

</Slide>

<Slide title="Entrada 5: Posición en la Secuencia">

Un email de primer contacto es diferente a un seguimiento, que es diferente a un email de cierre. Tu agente necesita saber dónde se ubica este email en la secuencia.

**Posiciones en la secuencia:**

1. **Primer contacto** — Preséntate, referencia investigación, ofrece valor
2. **Seguimiento 1** (3 días después) — Ángulo diferente, añade prueba social o insight
3. **Seguimiento 2** (5 días después) — Con pregunta, enfocado en su dolor
4. **Aporte de valor** (7 días después) — Comparte un recurso (guía, caso de estudio, herramienta)
5. **Cierre** (10 días después) — Cierre elegante, deja la puerta abierta

Cada posición tiene diferentes expectativas de tono, extensión y CTA. El agente se adapta.

<ClassifyExercise
title="Clasifica Estos Fragmentos de Email por Posición en la Secuencia"
persistKey="custom-ai-agents-L4-sequence-classify"
categories={[
{ id: "first", label: "Primer Contacto", color: "#3b82f6" },
{ id: "followup", label: "Seguimiento", color: "#f59e0b" },
{ id: "breakup", label: "Cierre", color: "#ef4444" }
]}
items={[
{
id: "1",
content: "Vi tu publicación sobre atribución de contenido — la mayoría de los VPs de Serie B llegan a esto cuando la junta empieza a pedir ROI.",
correctCategory: "first"
},
{
id: "2",
content: "Sé que estás ocupado, así que seré breve: ¿sigues luchando con esa brecha de atribución?",
correctCategory: "followup"
},
{
id: "3",
content: "Parece que el momento no es el adecuado — totalmente entendible. Si las cosas cambian y quieres ver cómo otros equipos de Serie B están resolviendo la atribución de contenido, aquí hay una guía que preparamos: [enlace]",
correctCategory: "breakup"
},
{
id: "4",
content: "Pregunta rápida: ¿tu configuración actual conecta HubSpot + GA4 + tu CMS para el seguimiento de contenido a pipeline?",
correctCategory: "followup"
}
]}
/>

</Slide>
</SlideNavigation>

Ahora que entiendes las 5 entradas, construyamos el prompt que las combina.

---

## Construyendo el Prompt de Borrador

Aquí está la plantilla completa del prompt que usará tu agente. Esta es la "mente" del Agente de Primer Borrador de Email.

```
Eres un asistente de redacción de emails con IA para un fundador solo.

RESUMEN DE INVESTIGACIÓN DEL PROSPECTO:
{research_brief}

PLANTILLA DE EMAIL:
{template}  # PAS, AIDA, o Con Pregunta

GUÍA DE VOZ:
{voice_guide}

PROPUESTA DE VALOR:
{value_proposition}

POSICIÓN EN LA SECUENCIA:
{sequence_position}  # first_touch, follow_up_1, follow_up_2, value_bump, breakup

RESTRICCIONES:
- Máximo 125 palabras (solo el cuerpo, excluyendo la línea de asunto)
- Solo un CTA (pregunta o petición suave)
- Sin links en los emails de primer contacto (links permitidos en seguimientos)
- Referencia SOLO hechos del resumen del prospecto — si no estás seguro, no lo referencíes
- Línea de asunto: menos de 50 caracteres, en minúsculas, específica para este prospecto
- Tono: {voice_guide.tone}
- Evita estas palabras/frases: {voice_guide.avoid}

INSTRUCCIÓN ANTI-ALUCINACIÓN:
Si un dato no está explícitamente indicado en el resumen del prospecto, no lo inventes. Usa solo información verificada. Si no puedes encontrar un detalle específico, escribe un gancho más general pero igualmente relevante.

FORMATO DE SALIDA:
Asunto: ...
Cuerpo: ...

Ahora genera el email.
```

<InsightCard icon="🎯" title="Por Qué Funciona Este Prompt">
Es **estructurado** (secciones claras), **restringido** (conteo de palabras, reglas de CTA), **fundamentado** (referencia solo datos del resumen) y **consciente de la voz** (aplica tu guía de estilo). Esta es la diferencia entre "escríbeme un email" (basura) y "aquí está todo lo que necesitas para escribir un gran email" (calidad del 80-90%).
</InsightCard>

Probémoslo.

---

## La Estrategia de Generación de 3 Variantes

Tu agente no genera un email. Genera **3 variantes** usando diferentes ángulos:

1. **Enfocada en Dolor** — Lidera con su desafío específico (del resumen)
2. **Enfocada en Disparador** — Referencia un evento reciente (publicación de LinkedIn, ronda de financiación, contratación)
3. **Enfocada en Valor** — Lidera con un insight o dato relevante

¿Por qué 3 variantes? Porque no sabes qué ángulo resonará hasta que lo pruebes. Y tener 3 opciones te permite elegir la mejor para cada prospecto.

<SwipeDecision
title="Dolor vs Disparador vs Valor: ¿Qué Ángulo Encaja?"
description="Desliza para emparejar cada escenario de prospecto con el mejor ángulo de email"
optionA="Ángulo Incorrecto"
optionB="Ángulo Correcto"
persistKey="custom-ai-agents-L4-angle-swipe"
cards={[
{
id: "1",
content: "El prospecto acaba de publicar en LinkedIn sobre su lucha con el churn. Usa: Enfocado en Dolor",
correctOption: "b",
explanation: "La publicación de LinkedIn es un disparador fresco, pero el dolor (churn) es el problema central. El enfoque en dolor funciona mejor aquí."
},
{
id: "2",
content: "La empresa del prospecto acaba de levantar Serie B. Usa: Enfocado en Disparador",
correctOption: "b",
explanation: "Las rondas de financiación crean urgencia (expectativas de la junta, nuevos presupuestos). El enfoque en disparador capitaliza el momento."
},
{
id: "3",
content: "El prospecto es VP de Ventas en una empresa sin noticias recientes. Usa: Enfocado en Valor",
correctOption: "b",
explanation: "Sin disparador, sin señal de dolor fresca. Lidera con un insight o estadística relevante para su rol."
},
{
id: "4",
content: "El prospecto acaba de contratar 3 SDRs (actualización de LinkedIn). Usa: Enfocado en Dolor",
correctOption: "a",
explanation: "La contratación es el disparador. El enfoque en disparador ('Vi que estás escalando tu equipo de SDRs...') es más fuerte que el dolor genérico."
}
]}
/>

Así es como el agente genera las 3:

```python
# Pseudocódigo: Generación de 3 Variantes

angulos = ["pain_focused", "trigger_focused", "value_focused"]
plantillas = ["PAS", "AIDA", "Question"]

borradores = []
for i, angulo in enumerate(angulos):
    prompt = BASE_PROMPT.format(
        research_brief=resumen,
        template=plantillas[i],  # Rotar plantillas para variedad
        voice_guide=voz,
        value_proposition=oferta,
        sequence_position=posicion,
        angle=angulo  # Indica a la IA qué ángulo enfatizar
    )

    borrador = call_llm(
        model="claude-sonnet-4",
        prompt=prompt,
        max_tokens=300,
        temperature=0.7  # Ligeramente más alto para variación creativa
    )

    borradores.append({"angulo": angulo, "plantilla": plantillas[i], "borrador": borrador})

return borradores
```

Ahora tienes 3 emails. Pero ¿son buenos? Ahí es donde entra el Sales Linter.

---

## El Sales Linter: Control de Calidad para Borradores de IA

El Sales Linter es un conjunto de verificaciones automatizadas que puntúan cada borrador según tus criterios de calidad. Detecta:

- **Violaciones de conteo de palabras** (más de 125 palabras)
- **Jerga** (palabras de tu lista de evitados)
- **CTAs débiles** (peticiones vagas como "avísame" en lugar de "¿vale la pena 15 min el martes?")
- **Falta de personalización** (sin referencia a la situación específica del prospecto)
- **Palabras que activan filtros de spam** ("gratis," "garantía," "tiempo limitado")
- **Problemas con la línea de asunto** (más de 50 caracteres, todo en mayúsculas, signos de exclamación)

<LinterFeedback
title="Sales Linter: Puntúa Tu Borrador"
persistKey="custom-ai-agents-L4-linter"
inputLabel="Pega un email con borrador de IA (asunto + cuerpo)"
rules={[
{
id: "length",
label: "Conteo de Palabras",
description: "El cuerpo tiene 50-125 palabras",
keywords: [],
antiKeywords: [],
checkType: "wordCount",
min: 50,
max: 125
},
{
id: "personalization",
label: "Personalización",
description: "Referencia algo específico sobre el prospecto",
keywords: ["noté", "vi que", "tu publicación", "tu empresa", "reciente"],
antiKeywords: ["Estimado señor", "A quien corresponda"]
},
{
id: "cta",
label: "CTA Claro",
description: "Termina con una petición específica (pregunta u oferta con tiempo límite)",
keywords: ["15 minutos", "martes", "llamada rápida", "vale la pena", "¿te interesa?"],
antiKeywords: ["avísame", "ponte en contacto", "retomemos el contacto"]
},
{
id: "jargon",
label: "Sin Jerga",
description: "Evita palabras de moda corporativas",
keywords: [],
antiKeywords: ["sinergia", "aprovechar", "soluciones", "ecosistema", "ponerse en contacto", "retomar el contacto"]
},
{
id: "spam",
label: "Sin Palabras de Spam",
description: "Evita palabras que activan filtros de spam",
keywords: [],
antiKeywords: ["gratis", "garantía", "tiempo limitado", "actúa ahora", "haz clic aquí", "100%"]
},
{
id: "subject",
label: "Línea de Asunto",
description: "Menos de 50 caracteres, en minúsculas, específica",
keywords: [],
antiKeywords: ["!!!", "GRATIS", "URGENTE"],
checkType: "subjectLine",
maxLength: 50
}
]}
/>

**Cómo funciona en el agente:**

```python
def sales_linter(borrador):
    problemas = []
    puntuacion = 100

    # Extraer asunto y cuerpo
    asunto = extraer_asunto(borrador)
    cuerpo = extraer_cuerpo(borrador)

    # Verificación 1: Conteo de palabras
    conteo_palabras = len(cuerpo.split())
    if conteo_palabras > 125:
        problemas.append(f"El cuerpo tiene {conteo_palabras} palabras (máx 125)")
        puntuacion -= 20

    # Verificación 2: Personalización
    palabras_clave_personalizacion = ["noté", "vi", "tu publicación", "reciente"]
    if not any(kw in cuerpo.lower() for kw in palabras_clave_personalizacion):
        problemas.append("No se detectó personalización específica")
        puntuacion -= 30

    # Verificación 3: Claridad del CTA
    palabras_clave_cta = ["15 min", "martes", "vale la pena", "¿te interesa?"]
    if not any(kw in cuerpo.lower() for kw in palabras_clave_cta):
        problemas.append("CTA débil o faltante")
        puntuacion -= 20

    # Verificación 4: Jerga
    jerga = ["sinergia", "aprovechar", "soluciones", "retomar el contacto"]
    jerga_encontrada = [j for j in jerga if j in cuerpo.lower()]
    if jerga_encontrada:
        problemas.append(f"Jerga detectada: {', '.join(jerga_encontrada)}")
        puntuacion -= 10 * len(jerga_encontrada)

    # Verificación 5: Palabras de spam
    palabras_spam = ["gratis", "garantía", "tiempo limitado", "haz clic aquí"]
    spam_encontrado = [s for s in palabras_spam if s in cuerpo.lower()]
    if spam_encontrado:
        problemas.append(f"Palabras de spam detectadas: {', '.join(spam_encontrado)}")
        puntuacion -= 15 * len(spam_encontrado)

    # Verificación 6: Línea de asunto
    if len(asunto) > 50:
        problemas.append(f"La línea de asunto tiene {len(asunto)} caracteres (máx 50)")
        puntuacion -= 10

    return {"puntuacion": max(0, puntuacion), "problemas": problemas}
```

Cualquier borrador que puntúe por debajo de 70 se marca para revisión manual. Puntuaciones de 70-85 son "suficientemente buenas para editar." Puntuaciones de 85+ son "enviar con cambios mínimos."

---

## Adaptación a la Secuencia: Primer Contacto vs Seguimiento vs Cierre

Tu agente necesita adaptar el tono y el contenido según dónde se ubica el email en la secuencia. Así es como:

<ProgressiveReveal title="Ajustes de Prompt Específicos por Posición" persistKey="custom-ai-agents-L4-sequence-reveal">
<RevealSection title="Primer Contacto">

**Objetivo:** Preséntate, establece relevancia, ofrece valor

**Tono:** Profesional pero cálido, curioso

**Estructura:**

- Asunto: Referencia algo específico (su publicación, noticias de la empresa, rol)
- Apertura: 1 oración reconociendo lo que notaste
- Cuerpo: 2-3 oraciones sobre por qué esto importa + cómo ayudas
- CTA: Petición de baja fricción (15 min, pregunta rápida, sí/no)

**Restricciones:**

- Sin links (riesgo de entregabilidad)
- Máx 100 palabras
- Debe pasar la prueba FASP

**Ejemplo:**

```
Asunto: tu brecha de atribución de contenido

Hola Sarah,

Vi tu publicación sobre la dificultad para mostrar a la junta qué contenido impulsa el pipeline. La mayoría de los VPs de Serie B llegan a esto cuando los presupuestos de marketing quedan bajo escrutinio.

Construimos un dashboard que conecta HubSpot + GA4 + tu CMS para mostrar qué publicaciones generan leads calificados. Tarda 15 min en configurarse.

¿Vale la pena una demo rápida el martes?
```

</RevealSection>

<RevealSection title="Seguimiento 1 (3 días después)">

**Objetivo:** Volver a conectar con un ángulo diferente, añadir credibilidad

**Tono:** Ligeramente más directo, asume que están ocupados

**Estructura:**

- Asunto: Gancho diferente (pregunta o insight)
- Apertura: Reconoce brevemente el primer email
- Cuerpo: Nuevo ángulo (prueba social, caso de estudio o pregunta)
- CTA: La misma petición de baja fricción o más fácil (link de demo asíncrona)

**Restricciones:**

- Ahora se pueden incluir links
- Máx 125 palabras
- No repetir el ángulo del primer email

**Ejemplo:**

```
Asunto: pregunta rápida sobre tu stack tecnológico

Hola Sarah,

Sé que estás ocupada, así que seré breve.

¿Tu configuración actual conecta HubSpot + GA4 + tu CMS para el seguimiento de contenido a pipeline? La mayoría de los equipos con los que trabajamos tienen estas herramientas pero sin capa de atribución.

Aquí hay una demo de 2 min que puedes ver de forma asíncrona: [link]

Si no es relevante, no te preocupes — solo avísame.
```

</RevealSection>

<RevealSection title="Seguimiento 2 (5 días después)">

**Objetivo:** Sacar a la luz un punto de dolor con una pregunta

**Tono:** Conversacional, útil

**Estructura:**

- Asunto: Pregunta directa
- Apertura: Reconoce el silencio, pivota hacia el valor
- Cuerpo: Haz una pregunta diagnóstica que saque a la luz su dolor
- CTA: Sí/no o comparte un recurso

**Restricciones:**

- Máx 100 palabras
- La pregunta debe ser específica para su rol/etapa

</RevealSection>

<RevealSection title="Cierre (10 días después)">

**Objetivo:** Salida elegante, deja la puerta abierta

**Tono:** Amigable, sin presión

**Estructura:**

- Asunto: Reconoce que estás cerrando el ciclo
- Apertura: Asume que no están interesados, está bien
- Cuerpo: Ofrece un recurso o insight final
- CTA: Ninguno, o "responde si las cosas cambian"

**Restricciones:**

- Máx 75 palabras
- Sin petición fuerte
- Tono positivo

</RevealSection>
</ProgressiveReveal>

El agente usa la entrada `sequence_position` para seleccionar el tono, la estructura y las restricciones correctas para cada email.

---

## Construyendo el Agente: Paso a Paso

Ahora vamos a unirlo todo. Vas a construir el Agente de Primer Borrador de Email en tu orquestador (n8n, Zapier, Make o Trigger.dev).

<TemplateBuilder
title="Especificación del Agente de Primer Borrador de Email"
persistKey="custom-ai-agents-L4-agent-spec"
sections={[
{
id: "trigger",
title: "Configuración del Disparador",
fields: [
{
id: "trigger_type",
label: "Tipo de Disparador",
placeholder: "ej., Contacto de CRM actualizado (resumen de investigación añadido)",
type: "text"
},
{
id: "trigger_filter",
label: "Condición de Filtro",
placeholder: "ej., research_brief no está vacío Y email_drafts está vacío",
type: "textarea"
}
]
},
{
id: "inputs",
title: "Fuentes de Datos de Entrada",
fields: [
{
id: "research_brief",
label: "Fuente del Resumen de Investigación",
placeholder: "ej., Campo de CRM: contact.research_brief",
type: "text"
},
{
id: "voice_guide",
label: "Ubicación de la Guía de Voz",
placeholder: "ej., Tabla de Airtable: Voice_Guide, ID de registro: rec123",
type: "text"
},
{
id: "value_prop",
label: "Fuente de la Propuesta de Valor",
placeholder: "ej., Campo de configuración del CRM o codificado en el flujo de trabajo",
type: "text"
},
{
id: "sequence_position",
label: "Lógica de Posición en la Secuencia",
placeholder: "ej., Si contact.emails_sent = 0, entonces 'first_touch'",
type: "textarea"
}
]
},
{
id: "generation",
title: "Configuración de Generación de Borradores",
fields: [
{
id: "model",
label: "Modelo LLM",
placeholder: "ej., claude-sonnet-4, gpt-4o",
type: "text"
},
{
id: "temperature",
label: "Temperatura",
placeholder: "ej., 0.7 (más alto = más creativo)",
type: "number"
},
{
id: "max_tokens",
label: "Tokens Máximos por Borrador",
placeholder: "ej., 300",
type: "number"
},
{
id: "variants",
label: "Número de Variantes",
placeholder: "ej., 3 (dolor, disparador, valor)",
type: "number"
}
]
},
{
id: "linting",
title: "Configuración del Sales Linter",
fields: [
{
id: "min_score",
label: "Puntuación Mínima para Aprobar",
placeholder: "ej., 70 (sobre 100)",
type: "number"
},
{
id: "auto_reject",
label: "Rechazar Automáticamente por Debajo de Puntuación",
placeholder: "ej., 50 (regenerar si está por debajo)",
type: "number"
},
{
id: "jargon_list",
label: "Palabras de Jerga a Marcar",
placeholder: "ej., sinergia, aprovechar, soluciones",
type: "textarea"
}
]
},
{
id: "output",
title: "Destino de Salida",
fields: [
{
id: "crm_field",
label: "Campo del CRM para Borradores",
placeholder: "ej., contact.email_drafts (array JSON)",
type: "text"
},
{
id: "notification",
label: "Canal de Notificación",
placeholder: "ej., DM de Slack, email, tarea en CRM",
type: "text"
},
{
id: "review_queue",
label: "Configuración de la Cola de Revisión",
placeholder: "ej., Vista de Airtable filtrada por draft_status = 'pending_review'",
type: "textarea"
}
]
}
]}
/>

**Pasos del Flujo de Trabajo (ejemplo de n8n):**

1. **Disparador:** Contacto de CRM actualizado → filtrar para `research_brief` añadido y `email_drafts` vacío
2. **Obtener Entradas:** Obtener resumen de investigación, guía de voz, prop de valor, determinar posición en la secuencia
3. **Generar Variante 1 (Enfocada en Dolor):** Llamar al LLM con plantilla PAS + ángulo de dolor
4. **Generar Variante 2 (Enfocada en Disparador):** Llamar al LLM con plantilla AIDA + ángulo de disparador
5. **Generar Variante 3 (Enfocada en Valor):** Llamar al LLM con plantilla de Pregunta + ángulo de valor
6. **Lint de los 3 Borradores:** Ejecutar Sales Linter en cada uno, calcular puntuaciones
7. **Filtrar:** Si algún borrador puntúa &lt;50, regenerarlo con prompt ajustado
8. **Guardar en CRM:** Almacenar los 3 borradores como array JSON en `contact.email_drafts`
9. **Notificar:** Enviar mensaje de Slack: "3 borradores de email listos para [Nombre]"
10. **Fin**

<InsightCard icon="💡" title="Consejo Pro: El Bucle de Regeneración">
Si un borrador puntúa por debajo de 50, no lo guardes simplemente. Regénéralo con un prompt modificado: "El intento anterior fue demasiado genérico. Enfócate más en [dolor específico del resumen]." Esto detecta el 80% de las salidas de baja calidad antes de que lleguen a ti.
</InsightCard>

---

## Probando Tu Agente: El Sandbox de Personalización

Antes de lanzar este agente sobre tus prospectos reales, necesitas probarlo. El Sandbox de Personalización te permite subir 5 resúmenes de prospectos, generar 15 borradores de email (3 por prospecto) y puntuarlos.

<InteractiveChecklist
title="Lista de Verificación para Probar el Agente"
persistKey="custom-ai-agents-L4-testing"
items={[
"Sube 5 resúmenes de prospectos diversos (diferentes roles, industrias, etapas)",
"Genera 3 variantes de email por prospecto (15 en total)",
"Ejecuta el Sales Linter en los 15 borradores",
"Revisa manualmente el borrador con la puntuación más alta para cada prospecto",
"Edita cada borrador (registra el % del texto cambiado)",
"Calcula la puntuación promedio del Linter y la distancia de edición promedio",
"Si la puntuación promedio &lt;75 o la distancia de edición >20%, ajusta el prompt y vuelve a probar"
]}
/>

**Qué buscar:**

- **Puntuaciones del Linter:** El promedio debería ser 75+. Si está por debajo, tu prompt necesita restricciones más estrictas.
- **Distancia de edición:** Deberías cambiar &lt;20% del texto. Si estás reescribiendo el 50%, la IA no está aprendiendo tu voz.
- **Cumplimiento FASP:** Cada borrador debería pasar Factual, Actualmente relevante, Específico, Orgulloso. Si no, fortalece la instrucción anti-alucinación.
- **Diversidad de variantes:** Las 3 variantes deberían sentirse significativamente diferentes, no solo reformuladas. Si son demasiado similares, ajusta las instrucciones de ángulo.

<RewriteExercise
title="Reescribe Este Borrador de IA"
persistKey="custom-ai-agents-L4-rewrite"
original="Hola Sarah, quería ponerme en contacto porque vi que tu empresa está creciendo. Ayudamos a los equipos de marketing a mejorar su rendimiento. ¿Estarías abierta a una llamada rápida para hablar sobre cómo podemos ayudarte a alcanzar tus objetivos?"
hint="Usa el resumen del prospecto: Sarah publicó sobre desafíos de atribución de contenido hace 3 días. Es VP de Marketing en una empresa SaaS de Serie B."
expertRewrite="Asunto: tu brecha de atribución de contenido\n\nHola Sarah,\n\nVi tu publicación sobre la dificultad para mostrar a la junta qué contenido impulsa el pipeline. La mayoría de los VPs de Serie B llegan a esto cuando los presupuestos quedan bajo escrutinio.\n\nConstruimos un dashboard que conecta HubSpot + GA4 + tu CMS para mostrar qué publicaciones generan leads calificados. Tarda 15 min en configurarse.\n\n¿Vale la pena una demo rápida el martes?"
criteria={[
"Referencia la publicación de LinkedIn (disparador específico)",
"Nombra el dolor (atribución de contenido)",
"Vincula a su etapa (Serie B, presión de la junta)",
"Ofrece valor concreto (dashboard, 3 herramientas)",
"CTA específico (15 min, martes)"
]}
/>

---

## Economía de Tokens: Qué Cuesta Este Agente

Desglosemos el costo por prospecto (3 variantes de email):

| Modelo          | Tokens de Entrada (~) | Tokens de Salida (~) | Costo por Variante | Costo por 3 Variantes |
| --------------- | --------------------- | -------------------- | ------------------ | --------------------- |
| Claude Sonnet 4 | ~1,500                | ~300                 | ~$0.008            | ~$0.024               |
| Claude Haiku    | ~1,500                | ~300                 | ~$0.0007           | ~$0.002               |
| GPT-4o          | ~1,500                | ~300                 | ~$0.012            | ~$0.036               |
| GPT-4o-mini     | ~1,500                | ~300                 | ~$0.0007           | ~$0.002               |

**A 50 prospectos/semana:**

- Claude Sonnet 4: $1.20/semana = **$5/mes**
- Claude Haiku: $0.10/semana = **$0.40/mes**
- GPT-4o: $1.80/semana = **$7.50/mes**
- GPT-4o-mini: $0.10/semana = **$0.40/mes**

**Recomendación:** Empieza con Claude Sonnet 4 o GPT-4o para calidad. Una vez que tu prompt esté afinado, cambia a Haiku o GPT-4o-mini para reducir costos en un 90%.

<ScenarioSimulator
title="Calculadora de ROI del Agente de Borradores de Email"
persistKey="custom-ai-agents-L4-roi"
levers={[
{ id: "prospects", label: "Prospectos por semana", min: 10, max: 200, step: 10, defaultValue: 50 },
{ id: "model", label: "Costo del modelo por 3 variantes", min: 0.002, max: 0.05, step: 0.001, defaultValue: 0.024 },
{ id: "time_saved", label: "Minutos ahorrados por prospecto", min: 5, max: 15, step: 1, defaultValue: 8 }
]}
outputs={[
{ id: "cost_month", label: "Costo mensual de IA", formula: "(prospects * 4.33 * model)", unit: "$", precision: 2 },
{ id: "time_saved_month", label: "Horas ahorradas por mes", formula: "(prospects * 4.33 * time_saved / 60)", unit: "hrs", precision: 1 }
]}
insight="Con `{time_saved_month}` horas ahorradas por mes, eso son aproximadamente {time_saved_month \* 2} prospectos más que puedes investigar y contactar — o `{time_saved_month}` horas de vuelta para llamadas de producto/ventas."
/>

---

## Modos de Fallo Comunes (y Cómo Solucionarlos)

Incluso con un prompt bien diseñado, los borradores de IA pueden fallar. Aquí están los 5 problemas más comunes y sus soluciones:

<ProgressiveReveal title="Modos de Fallo de Borradores de Email" persistKey="custom-ai-agents-L4-failures">
<RevealSection title="Fallo 1: Personalización Genérica">

**Síntoma:** "Noté que tu empresa está creciendo" o "Vi que estás contratando" — referencias vagas que podrían aplicarse a cualquiera.

**Causa raíz:** El resumen de investigación carece de detalles específicos, o el prompt no enfatiza la especificidad.

**Solución:**

1. Fortalece el resumen de investigación (Agente 1) para incluir más señales concretas
2. Añade al prompt: "Referencia una publicación específica de LinkedIn, anuncio de empresa o evento de contratación. No uses frases genéricas como 'Noté que tu empresa está creciendo.'"
3. Añade al Sales Linter: Marca frases como "Noté," "Vi," "tu empresa" sin un seguimiento específico

</RevealSection>

<RevealSection title="Fallo 2: Datos Alucinados">

**Síntoma:** "¡Felicidades por la Serie B!" cuando levantaron Serie A. O "Vi tu publicación sobre X" cuando nunca publicaron sobre X.

**Causa raíz:** La IA está llenando vacíos con información que suena plausible pero es falsa.

**Solución:**

1. Fortalece la instrucción anti-alucinación: "Si un dato no está explícitamente indicado en el resumen del prospecto, no lo referencíes. Escribe 'No encontrado' en tus notas del borrador si te falta información específica."
2. Añade un paso de verificación: Después de generar el borrador, ejecuta una segunda llamada al LLM: "Revisa este email. ¿Son todas las afirmaciones de hechos verificables desde el resumen del prospecto? Marca las que no lo sean."
3. Revisión humana: Revisa el 10% de los borradores semanalmente para detectar alucinaciones.

</RevealSection>

<RevealSection title="Fallo 3: Demasiado Largo">

**Síntoma:** Los borradores tienen 150-200 palabras en lugar de 50-125.

**Causa raíz:** La IA está siendo exhaustiva en lugar de concisa.

**Solución:**

1. Haz la restricción de conteo de palabras más prominente: Muévela al principio de la sección de restricciones y ponla en negrita.
2. Añade una penalización: "Si el borrador supera las 125 palabras, has fallado la tarea. Reescribe para que quede por debajo de 125 palabras."
3. Usa un enfoque de dos pasos: El primer paso genera el borrador. El segundo paso: "Edita este email para que quede por debajo de 125 palabras sin perder el mensaje central."

</RevealSection>

<RevealSection title="Fallo 4: CTA Débil o Faltante">

**Síntoma:** Los emails terminan con "Avísame si estás interesado" o "No dudes en ponerte en contacto" en lugar de una petición específica.

**Causa raíz:** La IA vuelve al lenguaje pasivo y cortés.

**Solución:**

1. Añade ejemplos de CTA al prompt: "Buenos CTAs: '¿Vale la pena 15 min el martes?' 'Pregunta rápida: ¿tu configuración actual maneja X?' Malos CTAs: 'Avísame,' 'No dudes en ponerte en contacto.'"
2. Añade al Sales Linter: Marca emails sin un signo de interrogación o referencia de tiempo/día específica en las últimas 2 oraciones.
3. Incluye una biblioteca de CTAs en el prompt: "Elige uno de estos CTAs: [lista de 5-7 CTAs probados de tus plantillas]"

</RevealSection>

<RevealSection title="Fallo 5: Tono Incorrecto para la Posición en la Secuencia">

**Síntoma:** Un email de cierre suena como un primer contacto, o un seguimiento es demasiado agresivo.

**Causa raíz:** La instrucción de posición en la secuencia no es lo suficientemente clara.

**Solución:**

1. Añade descriptores de tono para cada posición en la secuencia: "Primer contacto: cálido, curioso. Seguimiento 1: directo, útil. Cierre: amigable, sin presión."
2. Incluye emails de ejemplo para cada posición en el prompt (aprendizaje con pocos ejemplos)
3. Añade una verificación de tono: Después de generar el borrador, ejecuta una segunda llamada al LLM: "¿Este email coincide con el tono de un email de [sequence_position]? Si no, sugiere ediciones."

</RevealSection>
</ProgressiveReveal>

---

## Integración con Tu Flujo de Trabajo de Contacto

Tu Agente de Primer Borrador de Email no funciona de forma aislada. Es parte de un flujo de trabajo más amplio:

**La Secuencia Completa:**

1. **Agente 1 (Investigación):** Genera resumen del prospecto → guarda en CRM
2. **Agente 2 (Borrador de Email):** Genera 3 variantes de email → guarda en cola de revisión del CRM
3. **Revisión Humana:** Eliges la mejor variante, editas ligeramente (5-15%), apruebas
4. **Herramienta de Contacto:** El email aprobado se carga en la secuencia de Lemlist/Instantly/Smartlead
5. **Lógica de Seguimiento:** Si no hay respuesta en 3 días, el Agente 2 genera variantes de seguimiento
6. **Repetir** a través de la secuencia de 5 pasos (primer contacto → seguimiento 1 → seguimiento 2 → aporte de valor → cierre)

<MiniRoleplay
  scenario="Has generado 3 variantes de email para un prospecto. La Variante 1 puntuó 85 (enfocada en dolor), la Variante 2 puntuó 78 (enfocada en disparador), la Variante 3 puntuó 72 (enfocada en valor). ¿Cuál eliges y por qué?"
  role="Eres el fundador solo revisando los borradores"
  persistKey="custom-ai-agents-L4-roleplay"
  modelResponse="Elegiría la Variante 1 (enfocada en dolor, puntuación 85). Esta es mi razón: los emails enfocados en dolor tienen las tasas de respuesta más altas porque impactan un problema activo. La puntuación de 85 significa que pasó todas las verificaciones del linter con problemas mínimos. Aún la leeré para asegurarme de que la referencia al dolor es precisa y el CTA se siente natural, pero probablemente está lista para enviar con &lt;10% de ediciones."
/>

**Configuración de la Cola de Revisión:**

La mayoría de los fundadores solos usan una de estas:

- **Vista de Airtable:** Filtra por `draft_status = 'pending_review'`, ordenada por puntuación ICP (prospectos de alto ajuste primero)
- **Dashboard del CRM:** Vista personalizada mostrando contactos con `email_drafts` llenos pero `email_sent` = false
- **Notificaciones de Slack:** Resumen diario a las 9am: "5 borradores de email listos para revisión"

**Presupuesto de tiempo:** Con 3 variantes por prospecto y 2-3 minutos de revisión por prospecto, puedes procesar 20-30 prospectos/hora. Eso son 50 prospectos en 2 horas vs 8+ horas escribiendo desde cero.

---

## Tu Sprint de Implementación

Has aprendido la teoría. Ahora constrúyelo.

<InteractiveChecklist
title="Sprint de Construcción del Agente de Primer Borrador de Email"
persistKey="custom-ai-agents-L4-sprint"
items={[
"Día 1: Completa tu Guía de Voz (tono, palabras a evitar, frases características, estructura)",
"Día 2: Configura el flujo de trabajo del agente en n8n/Zapier/Make (disparador, entradas, llamadas al LLM, linting, salida)",
"Día 3: Prueba con 5 resúmenes de prospectos, genera 15 borradores, puntúa con el Sales Linter",
"Día 4: Revisa y edita los 15 borradores, calcula la puntuación promedio del Linter y la distancia de edición",
"Día 5: Ajusta el prompt según los modos de fallo, regenera los 5 borradores con puntuación más baja",
"Día 6: Conecta a tu CRM y herramienta de contacto, configura la cola de revisión",
"Día 7: Ejecuta el agente con 10 prospectos reales, envía los emails con mayor puntuación, rastrea las tasas de respuesta"
]}
/>

**Métricas de éxito:**

- **Puntuación del Linter:** Promedio 75+ (sobre 100)
- **Distancia de edición:** &lt;20% del texto cambiado durante la revisión
- **Tiempo ahorrado:** 5-10 minutos por prospecto (vs escribir desde cero)
- **Tasa de respuesta:** Dentro de 1-2 puntos porcentuales de tus emails escritos a mano

Si alcanzas estas métricas, tu agente está listo para producción. Si no, itera sobre el prompt y vuelve a probar.

---

## Lo Que Has Construido

Ahora tienes un Agente de Primer Borrador de Email que:

- Lee los resúmenes de investigación de prospectos (del Agente 1)
- Genera 3 variantes de email personalizadas (ángulos de dolor, disparador, valor)
- Adapta el tono y la estructura a la posición en la secuencia (primer contacto → cierre)
- Pasa los controles de calidad a través del Sales Linter (conteo de palabras, personalización, CTA, jerga, spam)
- Guarda los borradores en tu cola de revisión del CRM
- Cuesta $0.01-0.03 por prospecto (3 variantes)
- Ahorra 5-10 minutos por prospecto

**Siguiente paso:** Agente 3 (Enriquecimiento de CRM) — manteniendo los datos de tus prospectos frescos y completos para que los Agentes 1 y 2 tengan mejores entradas con qué trabajar.

Pero primero, prueba tu agente. Sube 5 resúmenes reales de prospectos. Genera 15 borradores. Puntúalos. Edítalos. Envíalos. Rastrea las respuestas.

**La IA hace el primer 80%. Tú añades el 20% final que lo hace humano.**
