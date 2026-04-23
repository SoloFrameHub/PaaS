---
title: "Frameworks de agentes: LangChain vs CrewAI vs AutoGen vs Claude SDK"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 1
---

## El error de $40K

Sara pasó seis meses construyendo un "agente SDR inteligente" con LangChain. Siguió cada tutorial, integró 15 herramientas, configuró la observabilidad con LangSmith y lo desplegó en producción.

Total de reuniones agendadas: **3**.

¿El problema? Había construido un Formula 1 cuando necesitaba una bicicleta.

Su agente tenía 700+ posibles integraciones de herramientas, grafos de conversación con estado y manejo de errores de nivel producción. Pero su necesidad real era simple: tomar un CSV de 50 prospectos por semana, investigarlos, redactar correos personalizados y guardarlos en su CRM.

Una llamada directa a la API + un flujo de trabajo en n8n le habría tomado 4 horas de construcción y costado $2/mes en ejecutar.

En cambio, gastó $40K en costo de oportunidad (6 meses sin vender) más $200/mes en infraestructura que no necesitaba.

**La pregunta central de esta lección:** ¿Cuándo necesitas un framework y cuándo un framework es solo complejidad costosa?

<InsightCard icon="🎯" title="La paradoja del framework">
Cuanto más maduro es el framework, más puede hacer — y más formas tiene de distraerte de publicar. Para los fundadores en solitario, el mejor agente es el que funciona mañana, no el que está "listo para producción" en seis meses.
</InsightCard>

---

## ¿Qué es un "agente IA" en ventas?

Antes de comparar frameworks, definamos qué estamos construyendo exactamente.

<FlipCard 
  front="Agente IA (contexto de ventas)" 
  back="Un programa impulsado por LLM que toma un objetivo, accede a herramientas (APIs, bases de datos, web), toma decisiones en un bucle y produce un resultado. No es solo un prompt — es un sistema con autonomía, uso de herramientas y memoria." 
/>

**La anatomía de un agente de ventas:**

1. **Disparador** — Nuevo contacto en el CRM, tiempo programado, correo entrante, webhook
2. **Recopilación de contexto** — Extraer datos de LinkedIn, CRM, APIs de noticias, sitios web de empresas
3. **Decisión del LLM** — "Basándome en estos datos, ¿qué debo hacer a continuación?"
4. **Ejecución de herramientas** — Llamar APIs, escribir en bases de datos, enviar correos, actualizar el CRM
5. **Bucle o terminación** — Repetir los pasos 3-4 hasta lograr el objetivo o alcanzar el máximo de iteraciones
6. **Resultado** — Informe de investigación, borrador de correo, actualización del CRM, notificación en Slack

<RangeSlider 
  label="¿Qué tan complejos son tus flujos de trabajo de ventas actuales?" 
  min={1} 
  max={10} 
  lowLabel="Un solo paso (ej. enviar correo)" 
  highLabel="Múltiples pasos (investigar → redactar → revisar → enviar)" 
  persistKey="custom-ai-agents-L1-complexity" 
/>

---

## La escalera de complejidad: ¿dónde necesitas estar realmente?

La mayoría de los fundadores en solitario empiezan en el Nivel 4 cuando deberían empezar en el Nivel 1.

<SlideNavigation>
<Slide title="Nivel 1: Llamada directa a la API">

**Qué es:** Una sola llamada a la API del LLM con un prompt. Sin framework. Sin orquestación. Solo `call_llm(prompt)`.

**Ejemplo:**

```python
# Investigación de prospectos en 10 líneas
def research_prospect(name, company):
    prompt = f"Genera un informe de una página para {name} en {company}..."
    return openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
```

**Cuándo usar:** Tareas de un solo paso. Sin llamadas a herramientas. Sin necesidad de memoria.

**Adecuación para fundador en solitario:** ⭐⭐⭐⭐⭐ Empieza aquí. El 80% de los "agentes" pueden ser así de simples.

</Slide>

<Slide title="Nivel 2: Agente único con herramientas">

**Qué es:** Un LLM que puede llamar funciones/herramientas (buscar en la web, consultar bases de datos, enviar correos). Usa APIs de llamada de funciones o uso de herramientas.

**Ejemplo:** Agente de investigación de prospectos que puede buscar en LinkedIn, obtener datos de empresas de Crunchbase y guardar en el CRM.

**Cuándo usar:** Tareas de múltiples pasos donde el LLM necesita decidir qué herramienta usar a continuación.

**Adecuación para fundador en solitario:** ⭐⭐⭐⭐ Aquí es donde el Claude SDK o LangChain empiezan a agregar valor.

</Slide>

<Slide title="Nivel 3: Pipeline multi-agente">

**Qué es:** Múltiples agentes especializados que se pasan el trabajo entre sí. "Investigador" → "Redactor" → "Revisor."

**Ejemplo:** Agente 1 investiga al prospecto → Agente 2 redacta el correo → Agente 3 verifica activadores de spam → Agente 4 guarda en el CRM.

**Cuándo usar:** Flujos de trabajo complejos donde diferentes pasos necesitan diferentes prompts/modelos/herramientas.

**Adecuación para fundador en solitario:** ⭐⭐⭐ CrewAI brilla aquí. Pero pregúntate: ¿realmente necesitas 4 agentes o solo 4 pasos en un flujo de trabajo?

</Slide>

<Slide title="Nivel 4: Agentes conversacionales con estado">

**Qué es:** Agentes que mantienen el historial de conversación, se adaptan según interacciones previas y manejan lógica de ramificación compleja.

**Ejemplo:** Un agente que conduce una llamada de descubrimiento de múltiples turnos, recuerda lo que dijo el prospecto y ajusta las preguntas dinámicamente.

**Cuándo usar:** Casos de uso interactivos y conversacionales. Escenarios con humano en el bucle.

**Adecuación para fundador en solitario:** ⭐⭐ AutoGen o LangGraph. Rara vez se necesita para la automatización de ventas del fundador en solitario.

</Slide>
</SlideNavigation>

<ExampleCard label="Verificación de realidad: el error de Sara">
Sara construyó un agente de Nivel 4 (LangGraph con memoria de conversación con estado y 15 integraciones de herramientas) para un problema de Nivel 1 (generar informes de investigación a partir de datos CSV).

Su agente podía manejar conversaciones complejas de múltiples turnos y adaptarse a entradas inesperadas. Pero su flujo de trabajo real era: CSV → investigación → guardar en CRM. Sin conversación. Sin ramificación. Sin estado.

Un script de Python de 10 líneas habría funcionado.
</ExampleCard>

<ClassifyExercise
title="Clasifica estos casos de uso por nivel de complejidad"
persistKey="custom-ai-agents-L1-classify"
categories={[
{ id: "level1", label: "Nivel 1: API directa", color: "#10b981" },
{ id: "level2", label: "Nivel 2: Agente único + herramientas", color: "#f59e0b" },
{ id: "level3", label: "Nivel 3: Multi-agente", color: "#ef4444" },
{ id: "level4", label: "Nivel 4: Con estado/Conversacional", color: "#8b5cf6" }
]}
items={[
{ id: "1", content: "Generar un correo frío a partir del perfil de LinkedIn de un prospecto", correctCategory: "level1" },
{ id: "2", content: "Investigar un prospecto buscando en LinkedIn, Crunchbase y Google News, luego redactar un correo", correctCategory: "level2" },
{ id: "3", content: "Investigar → Redactar → Verificar spam → Guardar en CRM, con diferentes agentes para cada paso", correctCategory: "level3" },
{ id: "4", content: "Conducir una llamada de descubrimiento de múltiples turnos donde el agente hace preguntas de seguimiento basadas en las respuestas", correctCategory: "level4" },
{ id: "5", content: "Enriquecer 100 contactos del CRM con tamaño de empresa y datos de financiamiento", correctCategory: "level1" },
{ id: "6", content: "Monitorear la actividad de LinkedIn de un prospecto y enviar un DM cuando publique sobre un tema relevante", correctCategory: "level2" }
]}
/>

---

## Comparativa de frameworks: la perspectiva del fundador en solitario

Ahora comparemos los cuatro frameworks principales desde la perspectiva de **lo que los fundadores en solitario realmente necesitan**.

<InsightCard icon="💡" title="Los criterios del framework para fundadores en solitario">
1. **Tiempo hasta el primer agente funcional:** ¿Puedes publicar en horas, no en semanas?
2. **Costo con 50-200 prospectos/semana:** ¿Cuánto es la factura mensual?
3. **Complejidad de depuración:** Cuando falla, ¿puedes arreglarlo tú mismo?
4. **Riesgo de dependencia:** ¿Puedes cambiar de modelos o migrar a otro framework?
5. **Factor de exceso:** ¿Estás pagando (en complejidad) por funcionalidades que nunca usarás?
</InsightCard>

### LangChain: la navaja suiza

**Qué es:** El framework de agentes más maduro. 700+ integraciones de herramientas. LangGraph para agentes con estado. LangSmith para observabilidad.

**Fortalezas:**

- Ecosistema más grande — si existe una herramienta, LangChain probablemente tiene una integración
- Observabilidad de nivel producción con LangSmith (traza cada llamada al LLM, depura fallos)
- Comunidad activa, documentación extensa, actualizaciones frecuentes

**Debilidades:**

- **Alta complejidad** — abstracciones sobre abstracciones. El ejemplo "simple" tiene 50 líneas.
- **Cambios de ruptura frecuentes** — LangChain v0.1 → v0.2 rompió la mayoría de los tutoriales
- **Excesivo para agentes simples** — Estás importando una biblioteca que puede orquestar 20 enjambres de agentes cuando solo necesitas llamar a una API

<FlipCard 
  front="Cuándo usar LangChain" 
  back="Necesitas 10+ integraciones de herramientas, observabilidad de producción, o estás construyendo un producto (no solo automatizando tus propias ventas). Para fundadores en solitario: probablemente no es tu primera elección." 
/>

**Tiempo hasta el primer agente:** 4-8 horas (curva de aprendizaje)
**Costo:** Gratis (framework) + LangSmith $39/mes (observabilidad opcional)
**Adecuación para fundador en solitario:** ⭐⭐ (poderoso pero pesado)

---

### CrewAI: el equipo basado en roles

**Qué es:** Framework multi-agente donde defines agentes con roles específicos (Investigador, Redactor, Revisor) que colaboran para completar tareas.

**Fortalezas:**

- **Modelo mental intuitivo** — "Necesito un investigador y un redactor" se traduce directamente en código
- **Construido para flujos multi-agente** — pasar contexto entre agentes es nativo
- **Más simple que LangChain** para pipelines de múltiples pasos

**Debilidades:**

- **Menos flexible para casos de un solo agente** — si solo necesitas un agente, CrewAI añade estructura innecesaria
- **Ecosistema más pequeño** — menos integraciones preconstruidas que LangChain
- **Relativamente nuevo** — menos probado en batalla que LangChain

<FlipCard 
  front="Cuándo usar CrewAI" 
  back="Tienes un flujo multi-agente claro (investigar → redactar → revisar) y quieres separación basada en roles. Excelente para complejidad de Nivel 3. Excesivo para Niveles 1-2." 
/>

**Tiempo hasta el primer agente:** 3-6 horas
**Costo:** Gratis (código abierto)
**Adecuación para fundador en solitario:** ⭐⭐⭐ (bueno para multi-agente, pero pregúntate si realmente necesitas multi-agente)

---

### AutoGen: el enjambre conversacional

**Qué es:** El framework multi-agente de Microsoft donde los agentes "hablan" entre sí para resolver problemas. Diseñado para razonamiento complejo y flujos de trabajo con humano en el bucle.

**Fortalezas:**

- **Poderoso para tareas de investigación/razonamiento** — los agentes debaten y refinan respuestas
- **Patrones de humano en el bucle** — soporte integrado para puntos de decisión "pregunta al humano"
- **Fuerte para problemas complejos y no deterministas**

**Debilidades:**

- **Pesado** — incluso los agentes simples requieren una configuración significativa
- **Orientado a empresas** — diseñado para equipos, no para fundadores en solitario
- **Excesivo para automatización de ventas** — estás construyendo un enjambre conversacional cuando solo necesitas redactar correos

<FlipCard 
  front="Cuándo usar AutoGen" 
  back="Estás resolviendo problemas de investigación complejos o necesitas que los agentes debatan/refinen los outputs. Para la automatización de ventas del fundador en solitario: casi nunca es la elección correcta." 
/>

**Tiempo hasta el primer agente:** 6-10 horas
**Costo:** Gratis (código abierto)
**Adecuación para fundador en solitario:** ⭐ (poderoso pero no diseñado para tu caso de uso)

---

### Claude Agent SDK: el camino centrado en Anthropic

**Qué es:** El SDK oficial de Anthropic para construir agentes con modelos Claude. Integración estrecha con las capacidades de uso de herramientas y uso de computadora de Claude.

**Fortalezas:**

- **Menor curva de aprendizaje** — si puedes llamar a la API de Claude, puedes construir un agente
- **Llamada a herramientas de primer nivel** — Claude Sonnet 4 tiene la llamada de funciones más confiable
- **Abstracciones simples y limpias** — sin exceso del framework
- **Soporte oficial** — mantenido por Anthropic, no se romperá con las actualizaciones del modelo

**Debilidades:**

- **Bloqueado a Claude** — no puedes cambiar fácilmente a GPT-4 u otros modelos
- **Ecosistema más pequeño** — menos integraciones preconstruidas que LangChain
- **Más nuevo** — menos contenido y ejemplos de la comunidad

<FlipCard 
  front="Cuándo usar el Claude SDK" 
  back="Estás construyendo agentes con Claude primero (lo cual deberías — Claude Sonnet 4 es el mejor modelo de agente de ventas). Quieres simplicidad sobre flexibilidad. Perfecto para complejidad de Niveles 1-2." 
/>

**Tiempo hasta el primer agente:** 2-4 horas
**Costo:** Gratis (SDK) + costos de la API de Claude (~$0.01-0.05 por ejecución del agente)
**Adecuación para fundador en solitario:** ⭐⭐⭐⭐⭐ (el punto óptimo para la mayoría de los fundadores en solitario)

---

## La matriz de decisión del framework

<StrategyDuel
title="Selección de framework: la realidad del fundador en solitario"
persistKey="custom-ai-agents-L1-duel"
scenario="Quieres construir un agente de investigación de prospectos que se ejecute 50 veces por semana."
strategyA={{
    name: "LangChain + LangGraph",
    description: "Framework completo con observabilidad y 700+ integraciones",
    pros: ["Observabilidad de nivel producción", "Ecosistema masivo", "Puede escalar a multi-agente complejo"],
    cons: ["Curva de aprendizaje de 4-8 horas", "Excesivo para agentes simples", "Cambios de ruptura frecuentes", "$39/mes por LangSmith"]
  }}
strategyB={{
    name: "Claude SDK + n8n",
    description: "Llamadas directas a la API de Claude orquestadas por un flujo de trabajo de n8n",
    pros: ["2-4 horas hasta el primer agente", "Simple y depurable", "Sin dependencia de framework", "Gratis (solo costos de API)"],
    cons: ["Sin observabilidad integrada", "Trabajo de integración manual", "Solo Claude (pero eso está bien)"]
  }}
expertVerdict="Para fundadores en solitario: la Estrategia B gana el 90% de las veces. No necesitas el poder de LangChain hasta que estés ejecutando 10+ agentes en producción. Empieza simple, pasa a frameworks solo cuando llegues a sus límites."
/>

<ConceptReframe
concept="Frameworks de agentes"
defaultLens="technical-founder"
lenses={[
{
id: "technical-founder",
label: "Fundador técnico",
explanation: "Piensa en los frameworks como frameworks web (Rails, Django, Next.js). No necesitas Rails para construir una página de aterrizaje — lo necesitas cuando estás construyendo una aplicación compleja con autenticación, base de datos, trabajos en segundo plano, etc. Igual con los frameworks de agentes: empieza con llamadas directas a la API, pasa a frameworks cuando la complejidad lo exija."
},
{
id: "coach",
label: "Coach/Consultor",
explanation: "Los frameworks son como los sistemas de negocio. No necesitas un CRM con automatización de pipeline y previsión cuando tienes 5 clientes — una hoja de cálculo funciona bien. Pero con 50 clientes, necesitas el sistema. Igual con los agentes: empieza manual (API directa), sistematiza cuando el volumen lo exija."
},
{
id: "creator",
label: "Creador de contenido",
explanation: "Los frameworks son como el software de edición de video. No necesitas Premiere Pro para hacer videos de YouTube — puedes empezar con iMovie o incluso tu teléfono. Pero cuando estás editando 10 videos/semana con efectos complejos, actualizas. Igual con los agentes: empieza simple, actualiza cuando estés publicando agentes semanalmente."
}
]}
/>

---

## La guía de selección de framework para fundadores en solitario

Aquí está el árbol de decisión para elegir tu framework:

<DecisionTree
title="¿Qué framework deberías usar?"
persistKey="custom-ai-agents-L1-tree"
startNodeId="start"
nodes={[
{
id: "start",
content: "¿Cuántos agentes vas a construir en los próximos 3 meses?",
choices: [
{ label: "1-2 agentes", nextNodeId: "simple" },
{ label: "3-5 agentes", nextNodeId: "medium" },
{ label: "6+ agentes o construyendo un producto", nextNodeId: "complex" }
]
},
{
id: "simple",
content: "¿Necesitas colaboración multi-agente (agentes pasándose el trabajo entre sí)?",
choices: [
{ label: "No, solo flujos simples de un paso", nextNodeId: "direct-api" },
{ label: "Sí, pipelines de múltiples pasos", nextNodeId: "orchestrator" }
]
},
{
id: "direct-api",
content: "✅ Usa llamadas directas a la API (sin framework). Orquesta con n8n o Zapier si es necesario. Esto cubre el 80% de los casos de uso del fundador en solitario.",
isTerminal: true,
outcome: "positive"
},
{
id: "orchestrator",
content: "¿Te sientes cómodo escribiendo código o prefieres constructores visuales?",
choices: [
{ label: "Prefiero constructor visual", nextNodeId: "n8n" },
{ label: "Prefiero código", nextNodeId: "claude-sdk" }
]
},
{
id: "n8n",
content: "✅ Usa n8n (constructor de flujos visuales) + llamadas directas a la API de Claude. Sin framework necesario.",
isTerminal: true,
outcome: "positive"
},
{
id: "claude-sdk",
content: "✅ Usa el Claude Agent SDK. Simple, limpio y perfecto para 1-5 agentes.",
isTerminal: true,
outcome: "positive"
},
{
id: "medium",
content: "¿Necesitas colaboración de agentes basada en roles (Investigador → Redactor → Revisor)?",
choices: [
{ label: "Sí, separación de roles clara", nextNodeId: "crewai" },
{ label: "No, solo pasos secuenciales", nextNodeId: "claude-sdk-medium" }
]
},
{
id: "crewai",
content: "✅ Usa CrewAI. Construido para flujos de trabajo multi-agente basados en roles.",
isTerminal: true,
outcome: "positive"
},
{
id: "claude-sdk-medium",
content: "✅ Usa el Claude SDK o n8n. Todavía no necesitas un framework.",
isTerminal: true,
outcome: "positive"
},
{
id: "complex",
content: "¿Necesitas observabilidad de producción (trazar cada llamada al LLM, depurar fallos, monitorear costos)?",
choices: [
{ label: "Sí, esto es un producto o una operación de alto volumen", nextNodeId: "langchain" },
{ label: "No, solo construyo para mí mismo", nextNodeId: "crewai-complex" }
]
},
{
id: "langchain",
content: "✅ Usa LangChain + LangSmith. Estás en el nivel de complejidad donde el framework se paga solo.",
isTerminal: true,
outcome: "positive"
},
{
id: "crewai-complex",
content: "✅ Usa CrewAI o el Claude SDK. Empieza simple, pasa a LangChain solo si llegas a sus límites.",
isTerminal: true,
outcome: "positive"
}
]}
/>

---

## El enfoque "sin framework": API directa + orquestador

Vamos a construir un agente real de investigación de prospectos con **cero framework** — solo llamadas directas a la API orquestadas por n8n.

<ExampleCard label="Ejemplo real: agente de investigación de prospectos (sin framework)">

**Objetivo:** Cuando se añade un nuevo contacto al CRM, generar un informe de investigación de una página.

**Arquitectura:**

1. **Disparador:** Webhook del CRM (nuevo contacto añadido)
2. **Recopilación de datos:** Obtener datos de LinkedIn (exportación Evaboot), datos de empresa (API de Clearbit), noticias recientes (API de Google News)
3. **Llamada al LLM:** API de Claude Sonnet 4 con prompt de investigación
4. **Resultado:** Guardar informe en el CRM, notificar en Slack

**Implementación:** Flujo de trabajo en n8n (visual, sin código)

**Costo:** $0.01-0.02 por prospecto (solo API de Claude)

**Tiempo de construcción:** 2-3 horas

**Líneas de código:** 0 (es un flujo visual)

</ExampleCard>

Aquí está el mismo agente como script de Python (si prefieres código):

```python
# prospect_research_agent.py
# Sin framework — solo llamadas directas a la API

import anthropic
import requests

def research_prospect(name, company, linkedin_url):
    # Paso 1: Recopilar datos
    linkedin_data = fetch_linkedin(linkedin_url)  # Tu fuente de datos
    company_data = fetch_company(company)          # API de Clearbit
    news = fetch_news(company)                     # API de Google News

    # Paso 2: Construir el prompt
    prompt = f"""Eres un asistente de investigación de ventas.
    Genera un informe de prospecto de una página para:

    Nombre: {name}
    Empresa: {company}
    LinkedIn: {linkedin_data}
    Info de empresa: {company_data}
    Noticias recientes: {news}

    Formato de salida:
    1. Resumen del prospecto (rol, antigüedad, trayectoria)
    2. Contexto de la empresa (tamaño, etapa, eventos recientes)
    3. Señales de dolor (basadas en rol + etapa de la empresa)
    4. Puntos de conexión (intereses compartidos, conexiones mutuas)
    5. Ángulo de contacto recomendado

    Si la información no está disponible, escribe "No encontrado" en lugar de adivinar.
    """

    # Paso 3: Llamar a Claude
    client = anthropic.Anthropic(api_key="your-key")
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        temperature=0.3,
        messages=[{"role": "user", "content": prompt}]
    )

    brief = response.content[0].text

    # Paso 4: Guardar en el CRM
    save_to_crm(name, brief)

    return brief

# Eso es todo. Sin framework. 30 líneas de código.
```

<InsightCard icon="🚀" title="La regla 80/20 para fundadores en solitario">
El 80% de tus necesidades de agentes pueden satisfacerse con llamadas directas a la API + un orquestador (n8n/Zapier). El 20% restante podría necesitar un framework — pero empieza simple y pasa a frameworks solo cuando llegues a límites reales.
</InsightCard>

---

## Cuándo pasar a un framework

Sabrás que es hora de usar un framework cuando experimentes estos problemas:

<ProgressiveReveal title="Señales de graduación al framework" persistKey="custom-ai-agents-L1-reveal">

<RevealSection title="Señal 1: Estás construyendo 5+ agentes">
Cuando tienes 5+ agentes en producción, empiezas a necesitar:
- Plantillas de prompts compartidas
- Registro centralizado
- Manejo de errores consistente
- Integraciones de herramientas reutilizables

**Framework que ayuda:** LangChain o CrewAI

</RevealSection>

<RevealSection title="Señal 2: Necesitas flujos multi-agente complejos">
Cuando los agentes necesitan pasarse contexto entre sí, tomar decisiones sobre qué agente llamar a continuación, o colaborar en una tarea.

**Ejemplo:** Agente de investigación → encuentra 3 señales de dolor → llama a 3 agentes diferentes de redacción de correos (uno por señal de dolor) → agente de revisión elige el mejor borrador.

**Framework que ayuda:** CrewAI (basado en roles) o LangGraph (con estado)

</RevealSection>

<RevealSection title="Señal 3: Estás depurando fallos de agentes semanalmente">
Cuando no puedes averiguar por qué un agente falló sin un registro y rastreo extensos.

**Framework que ayuda:** LangChain + LangSmith (observabilidad)

</RevealSection>

<RevealSection title="Señal 4: Estás construyendo un producto (no solo automatizando tus propias ventas)">
Cuando estás vendiendo software impulsado por agentes a otros, necesitas confiabilidad, observabilidad y escalabilidad de nivel producción.

**Framework que ayuda:** LangChain (más maduro) o AutoGen (si es conversacional)

</RevealSection>

<RevealSection title="Señal 5: Estás cambiando de modelos frecuentemente">
Cuando necesitas hacer pruebas A/B con GPT-4 vs Claude vs Gemini, y quieres intercambiar modelos sin reescribir código.

**Framework que ayuda:** LangChain (abstracciones agnósticas al modelo)

</RevealSection>

</ProgressiveReveal>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para fundadores técnicos">
Probablemente estés tentado a empezar con LangChain porque es "la forma correcta" de construir agentes. Resiste. Tu instinto de ingeniería de construir sistemas escalables es una responsabilidad aquí — necesitas publicar rápido, no construir para una escala que aún no tienes. Empieza con llamadas directas a la API. Pasa a los frameworks solo cuando sientas el dolor.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="Para coaches/consultores">
Piensa en los frameworks como contratar un asistente virtual en lugar de hacerlo tú mismo. No contratas un asistente para enviar 5 correos/semana — lo haces tú mismo. Pero con 50 correos/semana, contratas ayuda. Igual con los frameworks: empieza haciéndolo tú mismo (API directa), contrata el framework (LangChain/CrewAI) solo cuando el volumen lo exija.
</ContextualNote>

---

## Comparativa de costos: framework vs sin framework

Comparemos el costo total de propiedad para un sistema simple de 3 agentes (investigación, borrador de correo, enriquecimiento de CRM) ejecutándose con 50 prospectos/semana.

<ScenarioSimulator
title="Calculadora de costos de agentes: framework vs sin framework"
persistKey="custom-ai-agents-L1-simulator"
levers={[
{ id: "prospects", label: "Prospectos por semana", min: 10, max: 500, step: 10, defaultValue: 50 },
{ id: "agents", label: "Número de agentes", min: 1, max: 10, step: 1, defaultValue: 3 }
]}
outputs={[
{
id: "noframework",
label: "Costo sin framework (API de Claude + n8n)",
formula: "(prospects * agents * 0.02) + 0",
unit: "$/mes",
precision: 2
},
{
id: "langchain",
label: "Costo LangChain + LangSmith",
formula: "(prospects * agents * 0.02) + 39",
unit: "$/mes",
precision: 2
},
{
id: "crewai",
label: "Costo CrewAI (código abierto)",
formula: "(prospects * agents * 0.02) + 0",
unit: "$/mes",
precision: 2
}
]}
insight="Con `{prospects}` prospectos/semana y `{agents}` agentes, sin framework cuesta $`{noframework}`/mes vs LangChain a $`{langchain}`/mes. La tarifa de LangSmith de $39 solo tiene sentido si estás depurando fallos semanalmente o construyendo un producto."
/>

**Conclusión clave:** Para fundadores en solitario con &lt;200 prospectos/semana, el costo del framework (observabilidad de LangSmith) es a menudo mayor que el costo de la API. Empieza sin él.

---

## Tu decisión de framework

Ahora es tu turno de elegir.

<TemplateBuilder
title="Tu selección de framework"
persistKey="custom-ai-agents-L1-framework"
sections={[
{
id: "context",
title: "Tu contexto",
fields: [
{
id: "agents",
label: "¿Cuántos agentes planeas construir en los próximos 3 meses?",
placeholder: "ej. 3 agentes: investigación, borrador de correo, preparación de reunión",
type: "text"
},
{
id: "volume",
label: "¿Cuántos prospectos/semana procesarás?",
placeholder: "ej. 50-100 prospectos/semana",
type: "text"
},
{
id: "technical",
label: "¿Te sientes cómodo escribiendo código? (sí/no/prefiero visual)",
placeholder: "ej. sí, pero prefiero visual por velocidad",
type: "text"
},
{
id: "complexity",
label: "¿Necesitas colaboración multi-agente? (sí/no)",
placeholder: "ej. no, solo pasos secuenciales",
type: "text"
}
]
},
{
id: "decision",
title: "Tu elección de framework",
fields: [
{
id: "framework",
label: "Según tus respuestas, ¿con qué framework empezarás?",
placeholder: "ej. API directa + n8n (sin framework)",
type: "text"
},
{
id: "reasoning",
label: "¿Por qué esta es la elección correcta para ti?",
placeholder: "ej. Voy a construir 2-3 agentes simples, quiero publicar rápido y no necesito observabilidad todavía",
type: "textarea"
},
{
id: "graduation",
label: "¿Qué te haría pasar a un framework más complejo?",
placeholder: "ej. Si construyo 5+ agentes o depuro fallos semanalmente",
type: "textarea"
}
]
}
]}
/>

---

## Resumen: la filosofía del framework para fundadores en solitario

<InsightCard icon="🎯" title="El principio central">
**Los frameworks son para la escala, no para empezar.** Empieza con lo más simple que funcione (API directa + orquestador). Pasa a los frameworks solo cuando sientas el dolor de no tenerlos.
</InsightCard>

**La escalera de frameworks para fundadores en solitario:**

1. **0-2 agentes:** Llamadas directas a la API + n8n/Zapier (sin framework)
2. **3-5 agentes:** Claude SDK o CrewAI (si es multi-agente)
3. **6+ agentes o producto:** LangChain + LangSmith (la observabilidad importa)

**Resumen comparativo de frameworks:**

| Framework                 | Mejor para                               | Adecuación | Cuándo usar                                      |
| ------------------------- | ---------------------------------------- | ---------- | ------------------------------------------------ |
| **Ninguno (API directa)** | 1-2 agentes simples                      | ⭐⭐⭐⭐⭐ | Empieza aquí. 80% de los casos.                  |
| **Claude SDK**            | 1-5 agentes, primero Claude              | ⭐⭐⭐⭐⭐ | Agentes simples de llamada a herramientas        |
| **CrewAI**                | Flujos multi-agente basados en roles     | ⭐⭐⭐     | Se necesita separación de roles clara            |
| **LangChain**             | 6+ agentes, observabilidad de producción | ⭐⭐       | Construyendo un producto o alto volumen          |
| **AutoGen**               | Razonamiento complejo, conversacional    | ⭐         | Rara vez necesario para automatización de ventas |

<InteractiveChecklist
title="Tus acciones"
persistKey="custom-ai-agents-L1-actions"
items={[
"Completa la plantilla de Selección de Framework de arriba",
"Si eliges 'sin framework': configura n8n (prueba en la nube o auto-alojado) y conéctalo a la API de Claude",
"Si eliges el Claude SDK: instala el SDK y ejecuta el ejemplo 'Hola Mundo' de la documentación de Anthropic",
"Si eliges CrewAI: instala CrewAI y ejecuta el ejemplo básico multi-agente",
"Dibuja tu primer agente en papel: disparador → fuentes de datos → prompt LLM → resultado",
"Estima el costo: [prospectos/semana] × [agentes] × $0.02 = costo mensual de la API"
]}
/>

---

## Quiz: pon a prueba tu conocimiento de frameworks

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Estás construyendo un único agente que investiga prospectos y redacta correos. Se ejecutará 50 veces/semana. ¿Con qué framework deberías empezar?",
      "options": [
        "LangChain + LangSmith para observabilidad de producción",
        "CrewAI para colaboración multi-agente",
        "Llamadas directas a la API de Claude + orquestador n8n",
        "AutoGen para razonamiento conversacional"
      ],
      "correctIndex": 2,
      "explanation": "Este es un caso de uso simple de un solo agente con bajo volumen. API directa + orquestador es el camino más rápido para publicar. LangChain es excesivo, CrewAI es para multi-agente, AutoGen es para conversacional."
    },
    {
      "id": "q2",
      "question": "¿Cuándo tiene sentido pagar $39/mes por la observabilidad de LangSmith?",
      "options": [
        "Cuando estás construyendo tu primer agente",
        "Cuando estás ejecutando 50 prospectos/semana",
        "Cuando estás depurando fallos de agentes semanalmente o construyendo un producto",
        "Nunca — la observabilidad no es necesaria para fundadores en solitario"
      ],
      "correctIndex": 2,
      "explanation": "LangSmith es valioso cuando necesitas rastrear y depurar fallos complejos de agentes, o cuando estás construyendo un producto para otros. Para agentes simples a bajo volumen, es excesivo."
    },
    {
      "id": "q3",
      "question": "Necesitas construir un flujo de trabajo donde el Agente 1 investiga, el Agente 2 redacta y el Agente 3 revisa. ¿Qué framework es más adecuado?",
      "options": [
        "Llamadas directas a la API (sin framework)",
        "Claude SDK",
        "CrewAI",
        "AutoGen"
      ],
      "correctIndex": 2,
      "explanation": "CrewAI está diseñado para flujos de trabajo multi-agente basados en roles. Este es exactamente su caso de uso. La API directa podría funcionar pero requiere más lógica de orquestación. El Claude SDK está enfocado en un solo agente."
    },
    {
      "id": "q4",
      "question": "¿Cuál es la principal debilidad de empezar con LangChain para tu primer agente?",
      "options": [
        "Es demasiado caro",
        "No soporta modelos Claude",
        "La curva de aprendizaje retrasa la publicación",
        "No puede manejar flujos de trabajo multi-agente"
      ],
      "correctIndex": 2,
      "explanation": "El principal costo de LangChain para los fundadores en solitario es el tiempo — la curva de aprendizaje de 4-8 horas retrasa la publicación. Para agentes simples, las llamadas directas a la API te llevan a producción en 2-3 horas."
    },
    {
      "id": "q5",
      "question": "Verdadero o falso: la mayoría de los casos de uso de agentes del fundador en solitario (80%) pueden resolverse con llamadas directas a la API + un orquestador, sin necesidad de framework.",
      "options": ["Verdadero", "Falso"],
      "correctIndex": 0,
      "explanation": "Verdadero. La gran mayoría de los agentes del fundador en solitario son simples: disparador → recopilación de datos → llamada al LLM → resultado. Esto no requiere un framework. Los frameworks agregan valor a mayor complejidad (5+ agentes, colaboración multi-agente, observabilidad de producción)."
    }
  ]
}
```

---

**Vista previa de la próxima lección:** En la Lección 2, profundizaremos en los orquestadores (n8n, Trigger.dev, Zapier, Make) y construiremos tu primer flujo de trabajo de agente — el Agente de Investigación de Prospectos — con cero código de framework.
