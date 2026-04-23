---
title: "La Estrategia de Altitud: Adaptándose a los Roles"
duration: "55 min"
track: "Sales Methodology"
course: "Course 16: Demo Architecture"
lesson: 4
---

# La Estrategia de Altitud: Dominando el "Nivel de Vuelo"

En 2026, la causa número 1 de fracaso en demos es la "Fricción de Altitud" — saltar aleatoriamente entre estrategia de alto nivel y detalles técnicos de bajo nivel. (2025 State of Sales). Si el CEO está en la sala, mostrar una pantalla de restablecimiento de contraseña es fatal. Si el Desarrollador está en la sala, hablar solo de "ROI" suena a humo.

Para ganar, debes elegir una **Altitud** y volar hacia allí según **Quién está en la sala**. (Gartner Research).

<InsightCard icon="✈️" title="The Core Problem">
Altitude Friction kills more demos than bad products. Showing a CEO the settings menu is like showing a pilot the engine schematics mid-flight—technically accurate, strategically fatal.
</InsightCard>

---

## 1. Las 3 Altitudes de la Demo

<SlideNavigation>
<Slide title="Altitude 30,000 Ft (The Economic Buyer / CFO / CEO)">

**Brújula:** Lógica (enfocada en P&L). (Curso 13).

**Les importa:** Velocidad del ROI, Mitigación de Riesgos, Ventaja Competitiva.

**La Guardia:** No muestres botones ni configuraciones. Muestra **Vistas de Resultados Agregados**.

**Guión:** _"Este dashboard te da la visibilidad para reducir el CAC en un 15%. Lo logramos automatizando el flujo de atribución."_

<ExampleCard label="Real Example: SaaS CFO Demo">
A founder demoing to a CFO showed a single dashboard with three metrics: Customer Acquisition Cost (down 18%), Time-to-Value (reduced from 45 to 12 days), and Churn Rate (improved 3.2%). Zero clicks. Zero settings. The CFO said "Send the contract" in 8 minutes.
</ExampleCard>

</Slide>

<Slide title="Altitude 10,000 Ft (The Manager / Champion)">

**Brújula:** Lógica (enfocada en el flujo de trabajo).

**Les importa:** Tiempo de implementación, Adopción del equipo, "¿Esto reducirá mi carga de gestión?"

**La Guardia:** Muestra funciones de **Reporte y Visibilidad**.

**Guión:** _"Tus representantes actualmente pasan 10 horas a la semana en entrada manual de datos. Esta vista automatiza eso, dándote un pronóstico preciso para la reunión del lunes."_

<ExampleCard label="Real Example: Sales Manager Demo">
A founder showed a VP of Sales a single screen: the Monday morning forecast report that auto-populated from rep activity. The VP's response: "My team will actually use this because it saves them from the Friday data-entry nightmare."
</ExampleCard>

</Slide>

<Slide title="Altitude: Ground Level (The End User)">

**Brújula:** Emocional (enfocada en la fricción).

**Les importa:** Cantidad de clics, velocidad de la UI, "¿Hará mi martes menos miserable?"

**La Guardia:** Muestra **Automatizaciones y Facilidad de Uso**.

**Guión:** _"Odias registrar datos. Mira esto: un clic, el registro se actualiza y terminaste por hoy."_

<ExampleCard label="Real Example: SDR Demo">
A founder demoing to an SDR showed exactly one workflow: clicking a Chrome extension button that auto-logged the LinkedIn conversation into Salesforce. The SDR said "This saves me 90 minutes a day" and became the internal champion.
</ExampleCard>

</Slide>
</SlideNavigation>

<ClassifyExercise
title="Classify the Altitude"
persistKey="demo-architecture-L4-classify"
categories={[
{ id: "30k", label: "30,000 Ft (Executive)", color: "#3b82f6" },
{ id: "10k", label: "10,000 Ft (Manager)", color: "#f59e0b" },
{ id: "ground", label: "Ground Level (User)", color: "#10b981" }
]}
items={[
{ id: "1", content: "Show the API documentation and security certifications", correctCategory: "30k" },
{ id: "2", content: "Demonstrate the one-click data sync that eliminates manual entry", correctCategory: "ground" },
{ id: "3", content: "Display the team performance dashboard with forecast accuracy metrics", correctCategory: "10k" },
{ id: "4", content: "Walk through the settings menu and customization options", correctCategory: "ground" },
{ id: "5", content: "Present the ROI calculator showing 6-month payback period", correctCategory: "30k" },
{ id: "6", content: "Show the automated weekly report that eliminates status meetings", correctCategory: "10k" }
]}
/>

---

## 2. El Protocolo de la "Sala Mixta" (Multiplexing)

En 2026, la mayoría de los tratos son **impulsados por Consenso**. A menudo tienes al CEO y al Usuario en la misma llamada. (2026 Acquisition Trends).

- **La Estrategia:** La Narración de "Pantalla Dividida."
- **La Fórmula:** _"Entonces [Nombre del Usuario], para ti, esto significa 3 clics menos. Y [Nombre del CEO], lo que eso significa para el negocio es que tus datos son realmente precisos para la reunión del directorio."_
- **La Regla:** Actúas como el **Traductor** entre el botón y el balance general.

<TemplateBuilder
title="Your Split-Screen Script"
persistKey="demo-architecture-L4-script"
sections={[
{
id: "feature",
title: "The Feature You're Showing",
fields: [
{ id: "feature-name", label: "Feature Name", placeholder: "e.g., Automated Lead Scoring", type: "text" }
]
},
{
id: "user-benefit",
title: "Ground-Level Benefit (For the User)",
fields: [
{ id: "user-name", label: "User's Name/Role", placeholder: "e.g., Sarah, SDR", type: "text" },
{ id: "user-value", label: "What it saves them", placeholder: "e.g., 2 hours per day of manual research", type: "textarea" }
]
},
{
id: "exec-benefit",
title: "30,000 Ft Benefit (For the Executive)",
fields: [
{ id: "exec-name", label: "Executive's Name/Role", placeholder: "e.g., John, CEO", type: "text" },
{ id: "exec-value", label: "Business impact", placeholder: "e.g., increases pipeline quality by 40%, reducing wasted sales time", type: "textarea" }
]
}
]}
/>

<MiniRoleplay
  scenario="You're demoing to both a CEO and an SDR. The CEO asks: 'How does this affect our conversion rates?' while the SDR looks confused about the technical setup."
  role="You are the founder responding with a split-screen narration"
  persistKey="demo-architecture-L4-roleplay"
  modelResponse="Great question. [CEO Name], this feature increases conversion by 25% because your team is reaching out to qualified leads only. [SDR Name], what that means for you is the system auto-flags the hot leads, so you're not wasting time on cold prospects—just focus on the green-lit accounts."
/>

---

## 3. Manejando al "Guardián Técnico"

Hay una cuarta capa oculta: **Nivel de Mantenimiento** (generalmente TI o Seguridad).

- **Objetivo:** "No quiero que me hackeen. No quiero agregar carga a mis tickets."
- **Guión:** _"Sé que la seguridad es primordial. Somos conformes con SOC2 y soportamos SAML SSO, lo que significa cero sobrecarga para tu equipo de TI."_ (Maneja esto temprano y luego regresa a los 30,000 pies).

<FlipCard 
  front="The Technical Gatekeeper's Hidden Veto" 
  back="IT/Security can kill deals silently. Address their concerns in the first 90 seconds ('SOC2, SAML SSO, zero IT overhead'), then immediately return to business value. Never let security become the entire conversation." 
/>

<RangeSlider 
  label="How often do you proactively address security/IT concerns in the first 2 minutes of a demo?" 
  min={1} 
  max={10} 
  lowLabel="Never" 
  highLabel="Always" 
  persistKey="demo-architecture-L4-security" 
/>

<InteractiveChecklist
title="Your Altitude Mastery Action Plan"
persistKey="demo-architecture-L4-actions"
items={[
"Audit your last 3 demos: What altitude were you flying at for each stakeholder?",
"Create a 'cheat sheet' mapping your product features to all 3 altitudes (30k, 10k, ground)",
"Write 3 split-screen narration scripts for your most common mixed-room scenarios",
"Practice the 'security handoff' script: address IT concerns in 60 seconds, then return to business value",
"Record yourself doing a demo and count altitude shifts—aim for max 2 shifts per 10-minute segment"
]}
/>

---

## Quiz: Liderando a través de la Altitud

```json
{
  "quizId": "altitude-strategy-2026",
  "title": "Matching the Buyer's Horizon",
  "questions": [
    {
      "id": "da1641",
      "type": "multiple-choice",
      "text": "¿Cómo sabes si estás en la 'Altitud Incorrecta' para un CEO (30,000 pies)?",
      "options": [
        {
          "id": "a",
          "text": "Te piden una inmersión más profunda en la documentación de la API."
        },
        {
          "id": "b",
          "text": "Empiezan a revisar su teléfono, se reclinan o preguntan '¿Cuál es la conclusión aquí?' mientras estás mostrando el menú de configuración."
        },
        { "id": "d", "text": "Permanecen en silencio durante 10 minutos." }
      ],
      "correctAnswer": "b",
      "explanation": "La atención ejecutiva es un recurso escaso. Si un tomador de decisiones siente que estás 'cortando el pasto' (mostrando detalles granulares que no afectan el resultado financiero), se desconectará mentalmente. Los fundadores profesionales 'Suben de Altitud' de inmediato cuando ven a un CEO desengancharse."
    },
    {
      "id": "da1642",
      "type": "multiple-choice",
      "text": "¿Para qué se usa la técnica de 'Narración de Pantalla Dividida' en 2026?",
      "options": [
        {
          "id": "a",
          "text": "Para mostrar dos navegadores separados a la vez."
        },
        {
          "id": "b",
          "text": "Para abordar simultáneamente las necesidades emocionales/de flujo de trabajo del usuario final y las necesidades lógicas/económicas del comprador dentro de la misma demostración de características."
        },
        { "id": "c", "text": "Para enfocarse solo en el usuario técnico." },
        {
          "id": "d",
          "text": "Para mostrar un video pregrabado junto a una demo en vivo."
        }
      ],
      "correctAnswer": "b",
      "explanation": "Los tratos B2B modernos involucran múltiples stakeholders con intereses en competencia. La adopción por parte del usuario mata los tratos si es muy difícil; el ROI mata los tratos si es muy caro. Unir ambos asegura que el 'Campeón' y el 'Pagador' estén alineados en el valor."
    }
  ]
}
```

**Siguiente Lección:** [Manejando Objeciones Durante la Demo](/sales-methodology/demo-architecture/lesson-5)
