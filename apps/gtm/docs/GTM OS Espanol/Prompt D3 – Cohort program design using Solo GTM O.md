<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Prompt D3 – Cohort program design using Solo GTM OS (LatAm incubators)

“Using best practices from Latin American accelerators, design 2–3 cohort program blueprints that use Solo GTM OS en español as the core GTM/sales infrastructure for solo founders and small teams. For each blueprint, specify:
Duration (4–8 weeks), weekly themes, and specific lessons/modules used.
Expected founder outputs (artifacts, outreach volume, meetings, roleplay scores).
How program coordinators track progress and success using platform data.
Aim for something that an incubator director could adopt with minimal modification.”

Now I have everything I need. Let me design three cohort blueprints with granular specificity.

***

# Cohort Program Blueprints — Solo GTM OS en Español para Incubadoras LatAm

These three blueprints are **ready-to-adopt** by a program coordinator with minimal modification. Each is mapped directly to existing platform infrastructure — specific courses, artifact types, Metabase views, roleplay personas, and gamification triggers — so nothing needs to be built from scratch.[^1][^2]

***

## Blueprint 1 — Arranque GTM (4 Weeks)

**Target:** Pre-revenue founders in Seed/MVP validation stage. Ideal for **Apps.co, HubBOG, or Cámara de Comercio Bogotá** intake cohorts where founders need a GTM foundation before Demo Day in a tight window.

**Cohort size:** 12–18 founders | **Pod structure:** 2–3 pods of 6 | **Language:** 100% Spanish (all Track 1 lessons are 100% translated) [^2] | **Time commitment:** 10–12 hours/week

### Weekly Arc

| Semana | Tema | Cursos del Platform | Entregables Clave |
| :-- | :-- | :-- | :-- |
| **1** | ¿A quién le vendes? (ICP + Psicología) | Course 0 (Sales Psychology, 8 lessons) + Course 1 (ICP Builder Workshop, 12 lessons) | **Artefacto:** ICP Document v1 via ICPWorkshop 13-step builder |
| **2** | ¿Qué les dices? (Posicionamiento + DISC) | Course 2 (Positioning \& Value Prop, 10 lessons) + Course 13 (DISC Buyer Personas, Lessons 1–4) | **Artefacto:** Positioning Statement + DISC Persona Reference Card |
| **3** | Primer contacto (Outreach en WhatsApp/Email) | Course 3 (Acquisition Path, 6 lessons) + Course 4 (List Building, Lessons 1–6) | **Ejecutar:** 30 outreach activities logged in Outreach Logger (WhatsApp + Email primary) |
| **4** | La primera reunión (Discovery + Demo Day Prep) | Course 14 (Discovery Framework, Lessons 1–5) + Course 15 (Discovery Simulations, Lessons 1–3) | **Artefacto:** Discovery Playbook v1 · **Roleplay:** ≥ 3 sesiones, puntaje objetivo ≥ 55 |

### Expected Founder Outputs at Graduation

- **3 artifacts completed:** ICP Document, Positioning Statement, Discovery Playbook[^1]
- **30+ outreach activities** logged across WhatsApp and email channels
- **≥ 3 pipeline deals** entered in Kanban (Lead or Contacted stage)
- **≥ 3 roleplay sessions** completed; average score ≥ 55 (Easy difficulty)
- **XP level:** Apprentice (300+ XP) or Journeyman (600+ XP)[^1]
- **Badges earned:** ICP Architect, First Lesson, 7-Day Streak minimum


### Program Coordinator Tracking (Metabase)

| Métrica Semanal | Vista/Fuente en Platform | Umbral de Alerta |
| :-- | :-- | :-- |
| Founders activos (login últimos 7 días) | `podmember.last_active` | < 70% = intervención |
| ICP Document completado | `artifact_type = 'icp'` count | < 60% por semana 2 |
| Outreach activities logged | `voutreachsummary` por cohort | < 5 actividades/fundador/semana |
| Roleplay sessions completadas | `vroleplayanalysis` | 0 sesiones en semana 4 = rojo |
| Readiness score delta (entry vs. semana 4) | `vassessmentscores` snapshot diff | Delta < 10 puntos = seguimiento |

**Demo Day deliverable:** Coordinador exporta en PDF — Readiness Score individual + 3 artefactos + pipeline value — como "brief del fundador" para el panel evaluador.

***

## Blueprint 2 — Tracción y Pipeline (6 Weeks)

**Target:** Founders with an MVP and first conversations but no systematic sales process. Ideal for **iNNpulsa growth cohorts, Ruta N Medellín, or Seedstars Colombia** — founders who know their product but can't close consistently.

**Cohort size:** 12–24 founders | **Pods:** 2–4 pods of 6 | **Language:** EN/ES bilingual (coordinador define preferencia por pod) | **Time commitment:** 12–15 hours/week

### Weekly Arc

| Semana | Tema Central | Cursos del Platform | Actividad Sincrónica |
| :-- | :-- | :-- | :-- |
| **1** | Cimienta tu ICP y posicionamiento | Courses 0–2 (Psychology, ICP, Positioning) | Workshop grupal: validar ICP con 3 compañeros de pod usando GoldenSegmentCalculator |
| **2** | Entiende a tu comprador (DISC profundo) | Course 13 (DISC completo, 12 lessons) | Roleplay en parejas: un fundador juega al comprador D, otro al I — facilitado por AI facilitator bot |
| **3** | Construye tu lista y lanza outreach | Course 4 (List Building, completo) + Course 8 (Cold Email Mastery, Lessons 1–8) | Meta de semana: 50 contactos en Outreach Logger |
| **4** | Discovery que cierra (BANT/MEDDIC) | Course 14 (Discovery Framework, completo, 14 lessons) + Course 15 (Simulations, Lessons 1–6) | Roleplay con persona **Elena VP de Ventas (D, Medium)** — objetivo: score ≥ 65 |
| **5** | De la reunión a la propuesta | Course 16 (Demo Architecture) + Course 18 (Proposals \& Pricing, Lessons 1–6) | Cada fundador graba un demo de 5 minutos y lo comparte en el pod para feedback |
| **6** | Pipeline real + Demo Day | Course 20 (Pipeline Management, completo) + Course 17 (Objection Handling, Lessons 1–6) | Roleplay con persona **Marcus el CTO Escéptico (C, Hard)** — certificación si score ≥ 75 |

### Expected Founder Outputs at Graduation

- **6 artifacts completed:** ICP, Positioning Statement, Value Proposition Canvas, Acquisition Path, Discovery Playbook, Email Sequences[^1]
- **75+ outreach activities** across WhatsApp, email, and LinkedIn
- **≥ 5 pipeline deals** in Kanban with at least 2 in Meeting or Proposal stage
- **≥ 8 roleplay sessions** completed; average score ≥ 65 (Medium difficulty)
- **1 meeting booked** with a real prospect (logged in Outreach Logger as "Meeting booked")
- **XP level:** Practitioner (1,000+ XP)[^1]
- **Certification eligible** if Tracks 1 + 3 complete + roleplay avg ≥ 75[^1]


### Program Coordinator Tracking (Metabase)

**Weekly digest** (generated via existing n8n daily-digest endpoint, extended for coordinators):[^2]


| Panel | Métrica | Frecuencia |
| :-- | :-- | :-- |
| Engagement | % founders with ≥ 1 lesson + ≥ 1 outreach log this week | Semanal |
| Pipeline health | Total deals by stage across cohort; avg deal value | Semanal |
| Roleplay progress | Avg score trend week-over-week; founders with 0 sessions | Semanal |
| Artifact velocity | Artifacts saved this week by type (ICP, Positioning, Discovery) | Semanal |
| Pod health heatmap | `vpodhealth` — engagement score per pod, posts/member | Semanal |
| Readiness delta | Entry score vs. week 6 score across 8 dimensions | Semana 6 |

**Interventions triggered when:** a pod's health score drops below threshold (coordinador recibe alerta → hace check-in manual con el pod facilitator AI o organiza una sesión de tutoría 1:1).

***

## Blueprint 3 — Motor GTM Completo (8 Weeks)

**Target:** Post-revenue founders (\$5K–\$50K MRR) ready to build a repeatable GTM system. Ideal for **Founder Institute Colombia, AWS Impact Accelerator LatAm, or corporate accelerators** (Bancolombia InnoHub, Telefónica Wayra) that need a rigorous, verifiable program for their top cohort.

**Cohort size:** 10–18 founders | **Pods:** 2–3 pods | **Language:** Bilingual; roleplay personas in English (industry-standard) with Spanish debrief | **Time commitment:** 15–20 hours/week | **Certification:** Mandatory target for all graduates

### Weekly Arc

| Semana | Tema | Cursos del Platform | KPI de la Semana |
| :-- | :-- | :-- | :-- |
| **1** | Diagnóstico + Psicología del vendedor fundador | Courses 0–1 (Psychology + ICP) + 8-dimension Readiness Assessment | Readiness score baseline establecido para todos los founders |
| **2** | Posicionamiento diferenciado + DISC avanzado | Courses 2 + 13 (Positioning + DISC completo) | Artefactos: Positioning Statement + Value Proposition Canvas |
| **3** | Motor de outreach LatAm (WhatsApp-first) | Courses 3–4 (Acquisition Path + List Building) + Course 8 (Cold Email, completo) | 50 contactos outreach; WhatsApp + email como canales primarios en tracker |
| **4** | Discovery mastery | Course 14 (completo) + Course 15 (Simulations, completo) | Roleplay score ≥ 65 con persona **David Procurement (D, Hard)** |
| **5** | Demo + Propuestas que cierran | Courses 16–18 (Demo Architecture + Objections + Proposals) | ≥ 2 deals en etapa Proposal en el Kanban |
| **6** | Cierre y negociación | Course 19 (Closing \& Next Steps) + Course 17 (Objection Handling, completo) | Roleplay score ≥ 70; ≥ 1 deal en Won o negociación activa |
| **7** | AI en el stack de ventas (diferenciador competitivo) | Courses 21–24 (AI Strategy, Deliverability, Lead Research, AI Outreach — partial) | Setup de secuencias automatizadas; 30+ contactos via AI-assisted outreach |
| **8** | Playbook completo + Demo Day | Course 44 (Personal Sales Playbook) + Certification check | **Artefacto final:** Personal Sales Playbook completo; Badgr badge emitido |

### Expected Founder Outputs at Graduation

- **All 10 artifact types completed:** ICP, Positioning, Value Proposition Canvas, Acquisition Path, List-Building Criteria, DISC Profile, Discovery Playbook, Objection Library, Email Sequences, Personal Sales Playbook[^1]
- **150+ outreach activities** logged; ≥ 30 via WhatsApp or Instagram channels
- **≥ 8 pipeline deals** with documented stage history; ≥ 3 in Proposal or Won
- **≥ 15 roleplay sessions** completed; average score ≥ 75 across 3 DISC difficulty levels
- **Revenue milestone:** At least 1 closed deal or signed LOI (logged as Won in pipeline)
- **XP level:** Expert (1,500+ XP) or Master (2,500+ XP)[^1]
- **Certification:** "Certified Solo GTM Practitioner" via Badgr Open Badges 3.0[^1]


### Program Coordinator Tracking (Metabase)

This blueprint requires the full operator dashboard. The following 5 views are already available in the platform's Metabase instance:[^2]


| Dashboard Tab | Key Panels | Audience |
| :-- | :-- | :-- |
| **Cohort Overview** | Enrollment, active users (7-day), avg readiness score, artifact completion rate, total pipeline value, certifications issued | Program Director, Sponsor |
| **Founder Progress Cards** | Per-founder: readiness delta, artifacts pending, pipeline stage distribution, roleplay avg, streak | Mentors (pre-1:1 session) |
| **Outreach Activity** | Channel breakdown (WhatsApp %, email %, LinkedIn %), weekly trend, top performers | Program Director |
| **Pod Health Heatmap** | Engagement score per pod, posts/member, AI facilitator post volume vs. human posts (fade-out logic indicator) | Coordinador |
| **Certification Pipeline** | Founders within 1 course of certification; Badgr badges issued this cohort | Director, Sponsor report |

**Government/sponsor export** (PDF, end of program): Cohort name, start/end date, enrolled vs. completed, avg readiness score delta, total artifacts created, total pipeline value generated, total meetings booked, certifications issued with Badgr verification links.

***

## Coordinator Onboarding Checklist (All Blueprints)

An incubator director can launch any of these blueprints in under one week:

1. **Invite founders** via Listmonk email sequence using existing `/api/forms` endpoint[^2]
2. **Configure pods** — platform's DISC-based pod matching runs automatically on onboarding completion; coordinator selects cohort dates and curriculum stage
3. **Set language to ES** — Spanish content mirrors English directory at 100% coverage for Track 1 and Creator Track; all three blueprints draw primarily from these tracks[^2]
4. **Pin weekly themes** — the AI facilitator bot (Mon/Wed/Fri rhythm via n8n) references the current week's track automatically; coordinators post the weekly kickoff prompt in the Pod category on NodeBB[^1]
5. **Access Metabase** at the configured `NEXT_PUBLIC_METABASE_URL` for the live cohort dashboard[^2]
6. **Schedule 2 live touchpoints per blueprint** — a mid-program checkpoint (week 2 for Blueprint 1, week 3 for Blueprint 2, week 4 for Blueprint 3) and a pre-Demo Day review — all other facilitation is handled by the platform's AI systems
<span style="display:none">[^3]</span>

<div align="center">⁂</div>

[^1]: platform-product-analysis.md

[^2]: PROJECT_OVERVIEW.md

[^3]: Customer_Acquisition_Academy_Complete_Outline-1.md

