---
title: "The Altitude Strategy: Tailoring to Roles"
duration: "55 min"
track: "Sales Methodology"
course: "Course 16: Demo Architecture"
lesson: 4
---

# The Altitude Strategy: Mastering the "Flight Level"

In 2026, the #1 cause of demo failure is "Altitude Friction"—bouncing randomly between high-level strategy and low-level technical minutia. (2025 State of Sales). If the CEO is in the room, showing a password reset screen is fatal. If the Developer is in the room, speaking only about "ROI" sounds like vaporware.

To win, you must pick an **Altitude** and fly there based on **Who is in the room**. (Gartner Research).

<InsightCard icon="✈️" title="The Core Problem">
Altitude Friction kills more demos than bad products. Showing a CEO the settings menu is like showing a pilot the engine schematics mid-flight—technically accurate, strategically fatal.
</InsightCard>

---

## 1. The 3 Demo Altitudes

<SlideNavigation>
<Slide title="Altitude 30,000 Ft (The Economic Buyer / CFO / CEO)">

**Compass:** Logical (P&L focused). (Course 13).

**Care About:** ROI Velocity, Risk Mitigation, Competitive Moat.

**The Guard:** Do not show buttons or settings. show **Aggregated Outcome Views**.

**Script:** *"This dashboard gives you the visibility to cut CAC by 15%. We do it by automating the attribution flow."*

<ExampleCard label="Real Example: SaaS CFO Demo">
A founder demoing to a CFO showed a single dashboard with three metrics: Customer Acquisition Cost (down 18%), Time-to-Value (reduced from 45 to 12 days), and Churn Rate (improved 3.2%). Zero clicks. Zero settings. The CFO said "Send the contract" in 8 minutes.
</ExampleCard>

</Slide>

<Slide title="Altitude 10,000 Ft (The Manager / Champion)">

**Compass:** Logical (Workflow focused).

**Care About:** Implementation Time, Team Adoption, "Will this reduce my management overhead?"

**The Guard:** show **Reporting and Visibility** features.

**Script:** *"Your reps currently spend 10 hours a week on manual entry. This view automates that, giving you an accurate forecast for the Monday meeting."*

<ExampleCard label="Real Example: Sales Manager Demo">
A founder showed a VP of Sales a single screen: the Monday morning forecast report that auto-populated from rep activity. The VP's response: "My team will actually use this because it saves them from the Friday data-entry nightmare."
</ExampleCard>

</Slide>

<Slide title="Altitude: Ground Level (The End User)">

**Compass:** Emotional (Friction focused).

**Care About:** Click-counts, UI speed, "Will this make my Tuesday less miserable?"

**The Guard:** show **Automations and Ease-of-Use**.

**Script:** *"You hate logging data. Watch this: one click, the record is updated, and you're done for the day."*

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

## 2. The "Mixed Room" Protocol (Multiplexing)

In 2026, most deals are **Consensus Driven**. You often have the CEO and the User on the same call. (2026 Acquisition Trends).

*   **The Strategy:** The "Split-Screen" Narration.
*   **The Formula:** *"So [User Name], for you, this means 3 fewer clicks. And [CEO Name], what that means for the business is that your data is actually accurate for the board meeting."*
*   **The Rule:** You act as the **Translator** between the button and the balance sheet.

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

## 3. Dealing with the "Technical Gatekeeper"

There is a hidden fourth layer: **Maintenance Level** (often IT or Security).

*   **Goal:** "Don't get hacked. Don't add to my ticket load."
*   **Script:** *"I know security is paramount. We are SOC2 compliant and support SAML SSO, which means zero overhead for your IT team."* (Handle this early and then move back to 30,000 ft).

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

## Quiz: Leading through Altitude

```json
{
  "quizId": "altitude-strategy-2026",
  "title": "Matching the Buyer's Horizon",
  "questions": [
    {
      "id": "da1641",
      "type": "multiple-choice",
      "text": "How do you know if you are at the 'Wrong Altitude' for a CEO (30,000 ft)?",
      "options": [
        { "id": "a", "text": "They ask for a deeper dive into the API documentation." },
        { "id": "b", "text": "They start checking their phone, lean back, or ask 'What is the bottom line here?' while you are showing the settings menu." },
        { "id": "d", "text": "They stay silent for 10 minutes." }
      ],
      "correctAnswer": "b",
      "explanation": "Executive attention is a scarce resource. If a decision-maker feels you are 'weed-wacking' (showing granular details that don't affect the financial outcome), they will mentally check out. Professional founders 'Pull Up' immediately when they see a CEO disengaging."
    },
    {
      "id": "da1642",
      "type": "multiple-choice",
      "text": "What is the 'Split-Screen Narration' technique used for in 2026?",
      "options": [
        { "id": "a", "text": "Displaying two separate browsers at once." },
        { "id": "b", "text": "Simultaneously addressing the emotional/workflow needs of the end-user and the logical/economic needs of the buyer within the same feature demonstration." },
        { "id": "c", "text": "Focusing only on the technical user." },
        { "id": "d", "text": "Showing a pre-recorded video alongside a live demo." }
      ],
      "correctAnswer": "b",
      "explanation": "Modern B2B deals involve multiple stakeholders with competing interests. User-adoption kills deals if it's too hard; ROI kills deals if it's too expensive. Bridging both ensures the 'Champion' and the 'Payer' are aligned on the value."
    }
  ]
}
```

**Next Lesson:** [Handling In-Demo Objections](/sales-methodology/demo-architecture/lesson-5)