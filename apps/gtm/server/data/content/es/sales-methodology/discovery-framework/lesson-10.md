---
title: "Identificar Dolor vs. Campeón"
duration: "55 min"
track: "Sales Methodology"
course: "Course 14: Discovery Framework - BANT/MEDDIC"
lesson: 10
---

# Identificar Dolor vs. Campeón

Confirmaste el Presupuesto. Conoces el Proceso de Decisión. Has mapeado los Criterios. Lógicamente, el trato _debería_ cerrarse. Pero la lógica no firma cheques. **La emoción firma cheques.**

En el marco MEDDIC, **Identificar el Dolor (I)** y el **Campeón (C)** son los motores emocionales del trato. (2025 State of Sales).

- El **Dolor** proporciona el momentum del "¿Por Qué Cambiar?"
- El **Campeón** proporciona la defensa del "¿Quién Vende?" dentro de la empresa.

Sin estos dos, tienes un "Trato Zombi" — parece vivo, pero no tiene latido. Eventualmente morirá de **Inercia**. (2026 Acquisition Trends).

<InsightCard icon="💀" title="The Zombie Deal">
A deal with perfect BANT/MEDDIC scores but no emotional urgency is a zombie—it looks alive in your CRM but will die of inertia before signature.
</InsightCard>

---

## 1. Los 3 Niveles de Dolor (La 'I' en MEDDIC)

El "Dolor" en ventas es un tipo específico de problema que es **lo suficientemente insoportable como para justificar el presupuesto**. El descubrimiento profesional debe pasar de problemas técnicos superficiales a consecuencias empresariales estratégicas. (Sandler Research).

<SlideNavigation>
<Slide title="Level 1: Technical Pain (The Symptom)">

**Lo que dicen:** _"Nuestros reportes son lentos."_

**La Trampa:** Esto es una molestia táctica. Si te detienes aquí, eres un "vendedor."

**Tu Riesgo:** Lo resolverán con una herramienta de $50/mes o simplemente lo tolerarán.

</Slide>

<Slide title="Level 2: Business Pain (The Impact)">

**Lo que dicen:** _"Los reportes lentos causan un retraso de 48 horas en la facturación, costándonos $10k/semana en flujo de caja."_

**La Victoria:** Ahora eres un **Socio de ROI**. Estás resolviendo un problema de $1.2M anuales.

**Tu Palanca:** Ahora puedes justificar un contrato de $50K anuales contra una pérdida medible.

</Slide>

<Slide title="Level 3: Personal Pain (The Stake)">

**Lo que dicen:** _"El CFO me tiene bajo la lupa. Si no arreglamos esto para el Q4, mi trabajo está en juego."_

**El Cierre:** Has identificado el **Disparador de Disonancia**. Este es el nivel más alto de palanca en ventas. (2026 Acquisition Trends).

**Tu Poder:** Esta persona luchará internamente para que se apruebe tu solución.

</Slide>
</SlideNavigation>

<ClassifyExercise
title="Classify the Pain Level"
persistKey="discovery-framework-L10-pain-levels"
categories={[
{ id: "technical", label: "Level 1: Technical", color: "#94a3b8" },
{ id: "business", label: "Level 2: Business", color: "#f59e0b" },
{ id: "personal", label: "Level 3: Personal", color: "#ef4444" }
]}
items={[
{ id: "1", content: "\"Our CRM doesn't integrate with Slack.\"", correctCategory: "technical" },
{ id: "2", content: "\"The integration gap costs us 15 hours/week in manual data entry—that's $30K annually in wasted labor.\"", correctCategory: "business" },
{ id: "3", content: "\"I promised the board we'd automate this by Q3. If I miss that deadline, I lose credibility with the CEO.\"", correctCategory: "personal" },
{ id: "4", content: "\"The dashboard loads slowly.\"", correctCategory: "technical" },
{ id: "5", content: "\"Slow dashboards mean our sales team misses real-time opportunities—we estimate $50K in lost deals last quarter.\"", correctCategory: "business" },
{ id: "6", content: "\"My VP keeps asking why we haven't fixed this yet. It's becoming a performance issue for me.\"", correctCategory: "personal" }
]}
/>

---

## 2. Probando a Tu Campeón (La 'C' en MEDDIC)

Un **Campeón** NO es simplemente alguien que te cae bien. Eso es un **Entrenador**.

- **Un Entrenador** te da información (_"Creo que les gustó la demo"_).
- **Un Campeón** toma acción (_"Programé la reunión con el CFO para ti"_).

**La Prueba de Fuego:**
Si le pides a tu contacto una sincronización de 15 minutos con el Comprador Económico (CE) y dice: _"No, están muy ocupados, solo habla conmigo,"_ **es un Entrenador.** Actualmente estás vendiendo a un guardián. (2025 State of Buyer Behavior).

<SwipeDecision
title="Coach or Champion?"
description="Swipe right for Champion behaviors, left for Coach behaviors"
optionA="Coach"
optionB="Champion"
persistKey="discovery-framework-L10-champion-test"
cards={[
{
id: "1",
content: "Contact says: \"I'll mention your solution in our next team meeting.\"",
correctOption: "a",
explanation: "Passive mention = Coach. A Champion would say: 'I'm putting you on the agenda for Thursday's leadership meeting.'"
},
{
id: "2",
content: "Contact sends you the internal org chart and highlights who needs to approve the budget.",
correctOption: "b",
explanation: "Taking action to help you navigate = Champion behavior. They're spending political capital."
},
{
id: "3",
content: "Contact says: \"The VP is really busy, but I can relay any questions you have.\"",
correctOption: "a",
explanation: "Blocking access to decision-makers = Coach. They don't have the influence to get you in the room."
},
{
id: "4",
content: "Contact schedules a call with the CFO and says: \"I told her this could save us $200K annually—she wants to hear your pitch.\"",
correctOption: "b",
explanation: "Actively selling your solution internally + providing access = Champion."
},
{
id: "5",
content: "Contact says: \"I really like your product! Let me know if you need anything.\"",
correctOption: "a",
explanation: "Enthusiasm without action = Coach. Champions do homework, not cheerleading."
}
]}
/>

<TemplateBuilder
title="The Champion Verification Script"
persistKey="discovery-framework-L10-champion-script"
sections={[
{
id: "setup",
title: "Setup Question",
fields: [
{
id: "context",
label: "Reference their pain",
placeholder: "e.g., You mentioned the billing delay is costing $10K/week...",
type: "textarea"
}
]
},
{
id: "ask",
title: "The Ask (Test Their Influence)",
fields: [
{
id: "request",
label: "Specific request that requires internal action",
placeholder: "e.g., Could you get me 15 minutes with the CFO to walk through the ROI model?",
type: "textarea"
}
]
},
{
id: "fallback",
title: "If They Block You",
fields: [
{
id: "response",
label: "Your response to 'They're too busy'",
placeholder: "e.g., I understand. Who else should I be talking to who has authority on this budget decision?",
type: "textarea"
}
]
}
]}
/>

---

## 3. La Trampa de los "Oídos Felices"

Los fundadores a menudo escuchan _"¡Qué interesante!"_ y asumen que el trato está hecho. Esto son **Oídos Felices**.
En el panorama de 2026, "interesante" lleva a "Sin Decisión." (2026 Acquisition Trends). Debes **Regular la Intención**:
_"Me alegra que te guste. Pero sé honesto — ¿es 'interesante', o resolver el retraso de facturación de $10k/semana es una prioridad de las 3 principales para el directorio este trimestre? Porque 'interesante' no obtiene firmas."_

<MiniRoleplay
  scenario="Prospect says: &quot;This looks really cool! I love the interface.&quot;"
  role="You are the founder responding to avoid Happy Ears"
  persistKey="discovery-framework-L10-happy-ears"
  modelResponse="I appreciate that! But let's be honest—'cool' doesn't get budget approval. Is fixing the $10K/week billing delay a top-3 priority for your CFO this quarter? Because if it's not, we should revisit this when it is."
/>

<RangeSlider 
  label="How often do you mistake enthusiasm for buying intent?" 
  min={1} 
  max={10} 
  lowLabel="Never" 
  highLabel="Every deal" 
  persistKey="discovery-framework-L10-happy-ears-self" 
/>

---

## 4. Conclusiones Clave

1.  **Implica el Dolor.** Pasa de "cómo funciona" a "qué cuesta esperar."
2.  **Verifica al Campeón.** Dales tarea (por ejemplo, proporcionar documentos de seguridad/organigrama). Si no lo hacen, no son tu Campeón.
3.  **Encuentra el Interés Personal.** ¿A quién le "gritan" si este proyecto fracasa? Ese es tu punto de entrada.

<InteractiveChecklist
title="Your Pain & Champion Action Items"
persistKey="discovery-framework-L10-actions"
items={[
"Review your current pipeline—identify which deals have Level 3 (Personal) pain documented",
"For each active deal, test if your contact is a Coach or Champion using the 'Ask Test'",
"Draft a 'Throttle the Intent' script for the next time someone says 'That's cool!'",
"Map the personal stakes: Who in each deal has reputation/job security tied to solving this problem?",
"Schedule a 15-minute call with your top 3 contacts to request access to the Economic Buyer"
]}
/>

---

## Quiz: La Dinámica Emocional de las Ventas

```json
{
  "quizId": "pain-champion-2026",
  "title": "Mastering Internal Advocacy",
  "questions": [
    {
      "id": "pc101",
      "type": "multiple-choice",
      "text": "¿Cuál es la diferencia principal entre un Entrenador y un Campeón?",
      "options": [
        { "id": "a", "text": "Un Campeón es un ejecutivo de nivel C." },
        {
          "id": "b",
          "text": "Un Entrenador te tiene cariño; un Campeón está dispuesto a gastar su capital político interno para asegurar que tu solución sea comprada."
        },
        {
          "id": "c",
          "text": "Un Campeón es la persona que firma el contrato."
        },
        { "id": "d", "text": "No hay diferencia." }
      ],
      "correctAnswer": "b",
      "explanation": "Muchos fundadores en solitario pierden tratos porque pasan el 100% de su tiempo con gerentes locales (Entrenadores) que no tienen influencia con el Comprador Económico. Debes verificar si tu contacto tiene el poder de introducirte físicamente en la sala de toma de decisiones."
    },
    {
      "id": "pc102",
      "type": "multiple-choice",
      "text": "¿Cuál de estos es más probable que sea un punto de dolor de 'Nivel 3' (Personal)?",
      "options": [
        { "id": "a", "text": "'El servidor tarda 3 segundos en cargar.'" },
        { "id": "b", "text": "'Nuestra tasa de conversión ha bajado un 5%.'" },
        {
          "id": "c",
          "text": "'Si no alcanzamos esta fecha de lanzamiento, mi ascenso está en riesgo y me preocupa mi posición con el CEO.'"
        },
        { "id": "d", "text": "'Necesitamos cambiar a un modelo SaaS.'" }
      ],
      "correctAnswer": "c",
      "explanation": "El dolor personal tiene que ver con la reputación, la seguridad o el tiempo. Incluso en el B2B empresarial, los individuos toman la decisión final basándose en sus propias apuestas personales y profesionales."
    },
    {
      "id": "pc103",
      "type": "multiple-choice",
      "text": "¿Qué es la 'Prueba de la Solicitud' para un Campeón?",
      "options": [
        { "id": "a", "text": "Pedirles que te den un descuento." },
        {
          "id": "b",
          "text": "Pedirles algo ligeramente difícil, como un organigrama interno o una reunión con su jefe, para verificar si tienen la influencia que afirman tener."
        },
        { "id": "c", "text": "Invitarlos a tomar un café." },
        { "id": "d", "text": "Pedirles que mantengan el trato en secreto." }
      ],
      "correctAnswer": "b",
      "explanation": "Si un contacto te bloquea el acceso a stakeholders de nivel superior o se niega a compartir la logística interna, probablemente sea un Entrenador sin poder real. Probarlos temprano te evita contar con un trato que nunca recibirá aprobación financiera."
    }
  ]
}
```

**Siguiente Lección:** [Estructura de la Llamada de Descubrimiento y Escalado](/sales-methodology/discovery-framework/lesson-11)
