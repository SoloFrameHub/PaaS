---
title: "Migration: Moving Between CRMs Without Losing Data"
duration: "45 min"
track: "Operations & Systems"
course: "Course 40: Advanced CRM Setup"
lesson: 9
---

## The $12K Mistake

Sarah had been using HubSpot Free for 18 months. 847 contacts. 143 active deals. Thousands of logged emails and notes. Her pipeline was finally clean, her fields were AI-ready, and she'd just closed her biggest month ever.

Then she saw Attio's demo. The modern UI. The automatic enrichment. The flexible data model. She signed up that afternoon.

By Friday, she'd imported her contacts via CSV. By Monday, she realized:
- 40% of her custom fields didn't map
- Every email thread was now a single flat note
- Her pipeline stages were generic defaults
- All her automation triggers were gone
- Her deal history showed "Imported on [date]" with no context

She spent the next three weeks rebuilding. During that time, she missed follow-ups on two hot deals (combined value: $12K) because she couldn't find the context she needed.

**The lesson:** Migration isn't just moving data. It's preserving the *intelligence* in your CRM — the structure, the history, the triggers that tell you what to do next.

<InsightCard icon="⚠️" title="The Migration Paradox">
The better your current CRM setup, the harder migration becomes. A well-configured CRM with custom fields, automations, and structured data has more to lose than a glorified contact list.
</InsightCard>

---

## When Migration Actually Makes Sense

Not every CRM frustration justifies migration. Let's separate real blockers from shiny object syndrome.

<SwipeDecision
  title="Migrate or Stay?"
  description="Swipe right for legitimate migration triggers, left for bad reasons"
  optionA="Bad Reason"
  optionB="Good Reason"
  persistKey="crm-setup-L9-migrate-decision"
  cards={[
    {
      id: "1",
      content: "You're bored of the UI and want something that looks more modern",
      correctOption: "a",
      explanation: "UI preferences don't justify 20-40 hours of migration work. Customize your current CRM's dashboard instead."
    },
    {
      id: "2",
      content: "You've hit the contact limit on your free tier and the paid tier costs 3x your budget",
      correctOption: "b",
      explanation: "Economics matter. If HubSpot Starter at $20/mo doesn't fit but Pipedrive at $14/mo does, migration makes sense."
    },
    {
      id: "3",
      content: "Your sales motion changed from relationship-based to high-volume outbound and your CRM has no sequences",
      correctOption: "b",
      explanation: "Fundamental feature gaps that block your primary workflow justify migration."
    },
    {
      id: "4",
      content: "You saw a demo of a new CRM and it has a feature you haven't tried using yet",
      correctOption: "a",
      explanation: "Migrate for features you're *currently blocked by*, not features you *might want someday*."
    },
    {
      id: "5",
      content: "You're using &lt;50% of your current CRM's capabilities and think a simpler tool would be better",
      correctOption: "a",
      explanation: "Under-utilization is a usage problem, not a tool problem. Learn your current CRM first."
    },
    {
      id: "6",
      content: "Your current CRM can't structure data in a way that AI agents can reason on, and you're building Course 27 agents",
      correctOption: "b",
      explanation: "If your CRM architecture blocks your AI strategy, migration to an AI-ready platform (like Attio) is justified."
    }
  ]}
/>

### The Migration Decision Framework

Before you export a single CSV, answer these four questions:

<TemplateBuilder
  title="Migration Decision Audit"
  persistKey="crm-setup-L9-decision-audit"
  sections={[
    {
      id: "utilization",
      title: "Current CRM Utilization",
      fields: [
        {
          id: "features-used",
          label: "What % of your current CRM's features do you actively use?",
          placeholder: "e.g., 80% — I use pipelines, email sync, custom fields, and basic automation",
          type: "textarea"
        },
        {
          id: "blocker-type",
          label: "Is your blocker a feature gap or a usage gap?",
          placeholder: "Feature gap: CRM literally can't do X. Usage gap: I haven't learned how to do X yet.",
          type: "textarea"
        }
      ]
    },
    {
      id: "timing",
      title: "Migration Timing",
      fields: [
        {
          id: "active-deals",
          label: "How many active deals are in your pipeline right now?",
          placeholder: "e.g., 12 deals, 3 are close to closing",
          type: "text"
        },
        {
          id: "slow-period",
          label: "When is your next slow period (low deal activity)?",
          placeholder: "e.g., Last two weeks of December, first week of August",
          type: "text"
        }
      ]
    },
    {
      id: "cost-benefit",
      title: "Cost-Benefit Analysis",
      fields: [
        {
          id: "migration-cost",
          label: "How many hours will migration take? (20-40 hours is typical)",
          placeholder: "e.g., 30 hours — data export, mapping, import, validation, automation rebuild",
          type: "text"
        },
        {
          id: "opportunity-cost",
          label: "What deals or revenue might you miss during migration disruption?",
          placeholder: "e.g., Risk missing follow-ups on 2-3 warm deals worth ~$8K total",
          type: "textarea"
        }
      ]
    },
    {
      id: "verdict",
      title: "Your Verdict",
      fields: [
        {
          id: "decision",
          label: "Migrate now, migrate later, or stay?",
          placeholder: "State your decision and reasoning",
          type: "textarea"
        }
      ]
    }
  ]}
/>

<InsightCard icon="📊" title="The 80% Rule">
If you're using less than 80% of your current CRM's capabilities, you have a learning problem, not a tool problem. Master what you have before switching.
</InsightCard>

---

## The Complete Migration Checklist

If you've decided migration is justified, here's the step-by-step protocol that preserves your data *and* your intelligence.

<ProgressiveReveal title="7-Step Migration Protocol" persistKey="crm-setup-L9-protocol">

<RevealSection title="Step 1: Export Everything (Don't Trust Partial Exports)">

Most CRMs let you export contacts, deals, and companies as separate CSVs. **This is a trap.** You need:

- **Contacts** — All fields, including custom properties
- **Companies** — All fields, including custom properties
- **Deals** — All fields, stage history, associated contacts
- **Activities** — Emails, calls, meetings, notes (with timestamps)
- **Custom field definitions** — Field names, types, dropdown values
- **Pipeline configuration** — Stage names, probabilities, automation triggers

**How to export:**

- **HubSpot:** Settings → Data Management → Export → Select all object types → Include all properties
- **Pipedrive:** Settings → Import/Export → Export data → Select all entities
- **Attio:** Settings → Data → Export → Choose JSON (preserves structure better than CSV)
- **Folk:** Export → Download all data → Includes enrichment sources
- **Close:** Settings → Export → Select all data types

<ExampleCard label="What Sarah Missed">
Sarah exported only contacts and deals. She didn't export:
- Activity timeline (all her logged emails became "Imported note")
- Custom field definitions (so she had to recreate dropdowns manually)
- Pipeline stage history (lost visibility into how long deals sat in each stage)

Result: 3 weeks of manual reconstruction.
</ExampleCard>

**Action:** Export everything. Store exports in a dedicated folder with today's date. You'll reference these files multiple times.

</RevealSection>

<RevealSection title="Step 2: Map Fields Between Old and New CRM">

This is where most migrations break. Your old CRM's "Lead Status" might map to the new CRM's "Lifecycle Stage" — or it might not exist at all.

<ComparisonBuilder
  title="Field Mapping Exercise"
  persistKey="crm-setup-L9-field-mapping"
  prompt="Map 5 of your most important custom fields from your current CRM to your target CRM"
  expertExample="Old: 'ICP Fit Score' (1-10 number) → New: 'Qualification Score' (dropdown: Low/Medium/High) — TRANSFORMATION NEEDED: Convert 1-3 to Low, 4-7 to Medium, 8-10 to High"
  criteria={[
    "Identifies exact field names in both systems",
    "Notes field type differences (number vs dropdown vs text)",
    "Specifies transformation logic where types don't match",
    "Flags fields that have no equivalent in new CRM"
  ]}
/>

**Common mapping pitfalls:**

| Old CRM Field | New CRM Field | Pitfall | Solution |
|---------------|---------------|---------|----------|
| Custom dropdown | Free text field | Lose structure | Recreate dropdown in new CRM first |
| Multi-select tags | Single-select property | Lose multi-value data | Pick primary tag or create multiple fields |
| Activity timeline | Flat notes | Lose chronology | Export activities separately, import as tasks/notes with dates |
| Pipeline stage history | Current stage only | Lose velocity data | Accept loss or manually log key stage transitions in notes |

</RevealSection>

<RevealSection title="Step 3: Test Import with 20 Records">

**Never do a full import first.** Test with a small batch to catch mapping errors before they corrupt your entire database.

**Test import protocol:**

1. Select 20 diverse records:
   - 5 simple contacts (name, email, company)
   - 5 contacts with custom fields populated
   - 5 deals in different pipeline stages
   - 5 records with rich activity history

2. Import the test batch

3. Verify in new CRM:
   - All fields mapped correctly
   - Dropdown values preserved
   - Associated records linked (contact → company → deal)
   - Activity timestamps intact
   - No duplicate records created

4. If anything broke, fix the mapping and re-test

<InsightCard icon="🔬" title="The 20-Record Rule">
Testing with 20 records catches 90% of mapping errors. Testing with 5 records catches 50%. Testing with 0 records (full import YOLO) catches 0% and creates 847 broken records.
</InsightCard>

</RevealSection>

<RevealSection title="Step 4: Full Import (With Backup Plan)">

Once your test import is clean, proceed with the full import.

**Pre-import checklist:**

<InteractiveChecklist
  title="Pre-Import Verification"
  persistKey="crm-setup-L9-pre-import"
  items={[
    "Test import validated with 20 records",
    "Field mapping documented in spreadsheet",
    "Custom fields created in new CRM (with same dropdown values)",
    "Pipeline stages configured to match old CRM",
    "Backup of old CRM data stored locally (you'll need it for 30 days)",
    "New CRM account has enough storage/contact limits for full import",
    "Email sync DISABLED in new CRM (prevent duplicate sends during migration)"
  ]}
/>

**Import order matters:**

1. **Companies first** (if B2B)
2. **Contacts second** (associated to companies)
3. **Deals third** (associated to contacts and companies)
4. **Activities last** (associated to contacts and deals)

**Why this order?** Most CRMs require parent records to exist before you can associate child records. Importing deals before contacts creates orphaned deals.

</RevealSection>

<RevealSection title="Step 5: Verify Data Integrity">

Import complete? Don't celebrate yet. Spot-check 10% of your records to catch silent failures.

<ClassifyExercise
  title="Data Integrity Checks"
  persistKey="crm-setup-L9-integrity-checks"
  categories={[
    { id: "pass", label: "✅ Pass", color: "#10b981" },
    { id: "fail", label: "❌ Fail", color: "#ef4444" },
    { id: "warning", label: "⚠️ Warning", color: "#f59e0b" }
  ]}
  items={[
    {
      id: "1",
      content: "Total contact count in new CRM matches old CRM export",
      correctCategory: "pass",
      explanation: "If counts don't match, some records failed to import"
    },
    {
      id: "2",
      content: "Custom field 'ICP Fit Score' shows as blank for 80% of contacts",
      correctCategory: "fail",
      explanation: "Field mapping broke. Re-import with corrected mapping."
    },
    {
      id: "3",
      content: "Pipeline total value is $50K in new CRM vs $52K in old CRM",
      correctCategory: "warning",
      explanation: "Small discrepancy — spot-check a few deals to find the gap"
    },
    {
      id: "4",
      content: "Email activity shows 'Imported on [date]' instead of original send dates",
      correctCategory: "fail",
      explanation: "Activity timeline lost timestamps. Check if old CRM export included date fields."
    },
    {
      id: "5",
      content: "Contact-to-company associations intact for all B2B contacts",
      correctCategory: "pass",
      explanation: "Relationships preserved correctly"
    }
  ]}
/>

**Spot-check protocol:**

- Pick 10 random contacts → verify all custom fields populated correctly
- Pick 5 active deals → verify stage, amount, associated contacts, and notes intact
- Check 3 contacts with rich email history → verify activity timeline preserved
- Search for known duplicates → verify dedupe logic worked

</RevealSection>

<RevealSection title="Step 6: Rebuild Automations">

Your old CRM's automations don't transfer. You must rebuild them manually in the new system.

**Priority automation rebuild order:**

1. **Email sync** — Re-enable and test with a personal email
2. **Stale deal flags** — Auto-flag deals with no activity in 14+ days
3. **Follow-up reminders** — Auto-create tasks when deals advance stages
4. **Enrichment triggers** — Auto-enrich new contacts on creation
5. **Notification rules** — Alert you when hot leads reply or deals stall

<TemplateBuilder
  title="Automation Rebuild Plan"
  persistKey="crm-setup-L9-automation-rebuild"
  sections={[
    {
      id: "critical",
      title: "Critical Automations (Rebuild Day 1)",
      fields: [
        {
          id: "automation-1",
          label: "Automation 1",
          placeholder: "e.g., Email sync — Gmail to CRM, bidirectional",
          type: "text"
        },
        {
          id: "automation-2",
          label: "Automation 2",
          placeholder: "e.g., Stale deal flag — no activity 14 days → tag 'Needs Follow-Up'",
          type: "text"
        }
      ]
    },
    {
      id: "important",
      title: "Important Automations (Rebuild Week 1)",
      fields: [
        {
          id: "automation-3",
          label: "Automation 3",
          placeholder: "e.g., New contact enrichment — Apollo lookup on creation",
          type: "text"
        }
      ]
    },
    {
      id: "nice-to-have",
      title: "Nice-to-Have Automations (Rebuild Week 2)",
      fields: [
        {
          id: "automation-4",
          label: "Automation 4",
          placeholder: "e.g., Weekly pipeline summary email",
          type: "text"
        }
      ]
    }
  ]}
/>

</RevealSection>

<RevealSection title="Step 7: Update Integrations">

Your old CRM was connected to other tools. Reconnect them to the new CRM.

**Common integrations to update:**

- **Email tools** (Instantly, Lemlist, Woodpecker) → Reconnect to new CRM API
- **Enrichment tools** (Apollo, Clay) → Update CRM destination
- **Zapier/Make workflows** → Swap old CRM triggers/actions for new CRM
- **Calendar sync** (Calendly, Cal.com) → Reconnect to new CRM for meeting logging
- **Analytics dashboards** (if you built any in Course 41) → Update data source

<InteractiveChecklist
  title="Integration Update Checklist"
  persistKey="crm-setup-L9-integrations"
  items={[
    "Email outreach tool reconnected and tested",
    "Enrichment automation updated to new CRM",
    "Zapier/Make workflows updated and tested",
    "Calendar sync reconnected",
    "Any custom API integrations updated",
    "Analytics dashboards pointed to new CRM data source"
  ]}
/>

</RevealSection>

</ProgressiveReveal>

---

## Preserving AI-Ready Data During Migration

If you followed Lesson 6 and built an AI-ready field schema, migration is especially risky. Structured data can easily get flattened into free-text notes.

<InsightCard icon="🤖" title="The AI Data Preservation Rule">
If a field was structured in your old CRM (dropdown, date, number), it MUST remain structured in your new CRM. Flattening structured fields into notes makes them invisible to AI agents.
</InsightCard>

### AI-Ready Data Mapping Checklist

<InteractiveChecklist
  title="AI Data Preservation"
  persistKey="crm-setup-L9-ai-preservation"
  items={[
    "Event log fields (event_type, event_date, event_outcome) map to structured fields, not free-text notes",
    "Health indicators (days_since_last_contact, engagement_trend) preserved as numbers/dropdowns",
    "ICP fit score remains a number (1-10) or structured dropdown (Low/Medium/High)",
    "Lead source, competitor mentioned, and champion identified remain categorical fields",
    "Activity timeline preserves timestamps and event types (not flattened to 'Imported note')",
    "Custom fields used by Course 27 agents are recreated BEFORE import"
  ]}
/>

### The "Would an Agent Understand This?" Test

Before finalizing your field mapping, paste a sample record into ChatGPT and ask:

> "Based on this contact record, who should I follow up with today and why?"

If the AI can't answer because critical fields are missing or unstructured, fix your mapping.

<ExampleCard label="AI-Readable vs AI-Blind Records">

**AI-Readable Record (Structured):**
```
Name: Sarah Chen
Company: DataPulse Inc
Role: VP of Marketing
ICP Fit Score: 9
Last Contact Date: 2025-01-15
Engagement Trend: Up
Last Event Type: Email Reply
Last Event Outcome: Positive
Next Action: Send pricing proposal
Next Action Date: 2025-01-20
```

**AI-Blind Record (Flattened):**
```
Name: Sarah Chen
Notes: Talked to her on 1/15, she seemed interested, need to follow up with pricing
```

The first record lets an AI agent reason: "Sarah is high-fit, recently engaged positively, and has a scheduled next action. Prioritize her." The second record is opaque.

</ExampleCard>

---

## Post-Migration Validation Protocol

Migration complete? Run this validation protocol before you trust your new CRM.

<TimedChallenge
  title="Spot the Migration Failure"
  persistKey="crm-setup-L9-validation-challenge"
  timeLimit={120}
  items={[
    {
      id: "1",
      prompt: "Your new CRM shows 847 contacts but your old CRM export had 850. What do you check first?",
      correctAnswer: "Check for duplicate merge rules that auto-deleted 3 records during import",
      explanation: "Small count discrepancies often come from auto-dedupe logic. Review merge logs."
    },
    {
      id: "2",
      prompt: "A high-value deal shows 'Stage: Unknown' in your new CRM. What happened?",
      correctAnswer: "Old CRM stage name didn't match new CRM stage names — deal couldn't map",
      explanation: "Create a matching stage in new CRM, then re-import that deal."
    },
    {
      id: "3",
      prompt: "Email activity shows 'Imported on 2025-01-18' for all emails. What broke?",
      correctAnswer: "Activity export didn't include original date fields, so import used today's date",
      explanation: "Check if old CRM export has a 'sent_date' or 'created_at' column. Re-map and re-import activities."
    },
    {
      id: "4",
      prompt: "Custom field 'ICP Fit Score' is blank for 90% of contacts. What's the likely cause?",
      correctAnswer: "Field name in CSV didn't match new CRM field name exactly (case-sensitive)",
      explanation: "CRM imports are case-sensitive. 'ICP_Fit_Score' ≠ 'icp_fit_score'. Fix mapping and re-import."
    }
  ]}
/>

### The 30-Day Parallel Run

**Don't delete your old CRM immediately.** Run both systems in parallel for 30 days:

- **Week 1-2:** New CRM is primary, but check old CRM for any data you can't find
- **Week 3-4:** New CRM only, but old CRM stays read-only as backup
- **Day 30:** If no critical data gaps found, archive old CRM export and cancel subscription

<InsightCard icon="⏱️" title="The 30-Day Safety Net">
Most migration failures surface within 2 weeks. Keep your old CRM accessible (read-only) for 30 days so you can recover any data that didn't transfer cleanly.
</InsightCard>

---

## Migration Cost-Benefit Calculator

Should you migrate? Let's do the math.

<ScenarioSimulator
  title="Migration ROI Calculator"
  persistKey="crm-setup-L9-roi-calculator"
  levers={[
    {
      id: "migrationHours",
      label: "Migration time (hours)",
      min: 10,
      max: 60,
      step: 5,
      defaultValue: 30
    },
    {
      id: "hourlyValue",
      label: "Your hourly value ($)",
      min: 25,
      max: 500,
      step: 25,
      defaultValue: 100
    },
    {
      id: "newCrmCost",
      label: "New CRM monthly cost ($)",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 29
    },
    {
      id: "oldCrmCost",
      label: "Old CRM monthly cost ($)",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 20
    },
    {
      id: "featureValue",
      label: "Monthly value of new features ($)",
      min: 0,
      max: 1000,
      step: 50,
      defaultValue: 200
    }
  ]}
  outputs={[
    {
      id: "migrationCost",
      label: "One-time migration cost",
      formula: "migrationHours * hourlyValue",
      unit: "$",
      precision: 0
    },
    {
      id: "monthlySavings",
      label: "Monthly net benefit",
      formula: "featureValue - (newCrmCost - oldCrmCost)",
      unit: "$",
      precision: 0
    },
    {
      id: "breakEven",
      label: "Break-even timeline",
      formula: "(migrationHours * hourlyValue) / (featureValue - (newCrmCost - oldCrmCost))",
      unit: " months",
      precision: 1
    }
  ]}
  insight="If break-even is >6 months, migration might not be worth it unless the feature gap is blocking active deals."
/>

---

## Common Migration Scenarios

Let's walk through the three most common solo founder migration paths.

### Scenario 1: HubSpot Free → Attio Plus

**Why migrate:** You need better AI-readiness, automatic enrichment, and a flexible data model. HubSpot Free's 1-pipeline limit is blocking you.

**What transfers cleanly:**
- Contacts (all fields)
- Companies (all fields)
- Deals (current stage, amount, close date)
- Basic email activity (as notes)

**What breaks:**
- HubSpot's pipeline stage history → Attio only imports current stage
- HubSpot's email tracking metadata → Attio logs emails but not open/click data
- HubSpot workflows → Must rebuild as Attio automations

**Migration time:** 20-25 hours

**Attio advantage:** Native migration tool exists. Use it instead of CSV export.

### Scenario 2: Pipedrive → HubSpot Starter

**Why migrate:** You need HubSpot's ecosystem (more integrations) and you're willing to pay $20/mo for better automation.

**What transfers cleanly:**
- Contacts, companies, deals (Pipedrive export is clean)
- Activity timeline (if you export activities separately)
- Custom fields (if you recreate them in HubSpot first)

**What breaks:**
- Pipedrive's activity-based workflow → HubSpot is deal-stage-based (different mental model)
- Pipedrive's visual pipeline → HubSpot's list views (less visual)

**Migration time:** 25-30 hours

**HubSpot advantage:** Massive integration ecosystem. If you use Zapier heavily, HubSpot has more native triggers.

### Scenario 3: Folk → Close

**Why migrate:** Your sales motion shifted from relationship-based to high-volume outbound. You need built-in calling and sequences.

**What transfers cleanly:**
- Contacts (Folk export is simple)
- Basic notes

**What breaks:**
- Folk's LinkedIn/Twitter enrichment metadata → Close doesn't auto-enrich
- Folk's relationship tags → Must map to Close custom fields

**Migration time:** 15-20 hours (Folk is lightweight, less to migrate)

**Close advantage:** Built-in calling, SMS, and sequences. No need for separate tools.

---

## Your Migration Action Plan

Ready to migrate? Build your plan.

<TemplateBuilder
  title="Migration Action Plan"
  persistKey="crm-setup-L9-action-plan"
  sections={[
    {
      id: "decision",
      title: "Migration Decision",
      fields: [
        {
          id: "current-crm",
          label: "Current CRM",
          placeholder: "e.g., HubSpot Free",
          type: "text"
        },
        {
          id: "target-crm",
          label: "Target CRM",
          placeholder: "e.g., Attio Plus",
          type: "text"
        },
        {
          id: "reason",
          label: "Primary reason for migration",
          placeholder: "e.g., Need AI-ready data model and automatic enrichment",
          type: "textarea"
        }
      ]
    },
    {
      id: "timeline",
      title: "Migration Timeline",
      fields: [
        {
          id: "start-date",
          label: "Migration start date",
          placeholder: "e.g., 2025-02-01 (during slow period)",
          type: "text"
        },
        {
          id: "estimated-hours",
          label: "Estimated hours",
          placeholder: "e.g., 30 hours over 2 weeks",
          type: "text"
        }
      ]
    },
    {
      id: "risk-mitigation",
      title: "Risk Mitigation",
      fields: [
        {
          id: "active-deals",
          label: "How will you protect active deals during migration?",
          placeholder: "e.g., Export deal details to spreadsheet as backup, notify key contacts of potential delays",
          type: "textarea"
        },
        {
          id: "rollback-plan",
          label: "Rollback plan if migration fails",
          placeholder: "e.g., Keep old CRM active for 30 days, can revert if data integrity issues found",
          type: "textarea"
        }
      ]
    },
    {
      id: "success-criteria",
      title: "Success Criteria",
      fields: [
        {
          id: "validation",
          label: "How will you validate migration success?",
          placeholder: "e.g., Contact count matches, pipeline value matches, spot-check 20 records, test email sync",
          type: "textarea"
        }
      ]
    }
  ]}
/>

---

## Summary: Migration Without Regret

Migration is a 20-40 hour project. Do it right or don't do it at all.

<InteractiveChecklist
  title="Migration Mastery Checklist"
  persistKey="crm-setup-L9-summary"
  items={[
    "I've validated that migration is justified (not just shiny object syndrome)",
    "I've scheduled migration during a slow period (low active deal count)",
    "I've exported ALL data from old CRM (contacts, deals, activities, field definitions)",
    "I've mapped fields between old and new CRM (with transformation logic documented)",
    "I've tested import with 20 records and verified data integrity",
    "I've rebuilt critical automations in new CRM before going live",
    "I've updated all integrations (email tools, enrichment, Zapier)",
    "I've validated data integrity with spot-checks on 10% of records",
    "I'm running old and new CRM in parallel for 30 days as safety net",
    "I've preserved AI-ready data structure (no flattening to free-text notes)"
  ]}
/>

**Next lesson:** We'll compile everything from Lessons 1-9 into your complete CRM Setup Checklist and launch your 7-day implementation sprint.

---

## Quiz: Migration Readiness

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "You're frustrated with your CRM's UI and want something more modern. Is this a good reason to migrate?",
      "options": [
        "Yes — if the UI slows you down, migration is justified",
        "No — UI preferences don't justify 20-40 hours of migration work",
        "Yes — but only if the new CRM also has better features",
        "No — unless you're also hitting feature limits"
      ],
      "correctAnswer": 1,
      "explanation": "UI frustration is almost never a sufficient reason to migrate. Customize your current CRM's dashboard or learn keyboard shortcuts instead. Migrate only for fundamental feature gaps or economic reasons."
    },
    {
      "id": "q2",
      "question": "What's the correct order for importing data into a new CRM?",
      "options": [
        "Contacts → Deals → Companies → Activities",
        "Companies → Contacts → Deals → Activities",
        "Deals → Contacts → Companies → Activities",
        "Activities → Contacts → Deals → Companies"
      ],
      "correctAnswer": 1,
      "explanation": "Import parent records first: Companies → Contacts (associated to companies) → Deals (associated to contacts) → Activities (associated to contacts/deals). This prevents orphaned records."
    },
    {
      "id": "q3",
      "question": "Your new CRM shows 847 contacts but your old CRM export had 850. What's the most likely cause?",
      "options": [
        "3 contacts were corrupted during export",
        "The new CRM has a contact limit of 847",
        "Auto-dedupe logic merged 3 duplicate records during import",
        "You forgot to export 3 contacts"
      ],
      "correctAnswer": 2,
      "explanation": "Small count discrepancies usually come from automatic duplicate detection and merging. Review the new CRM's merge logs to confirm."
    },
    {
      "id": "q4",
      "question": "Why should you run old and new CRM in parallel for 30 days?",
      "options": [
        "To compare which CRM you like better",
        "To catch migration failures that surface within 2 weeks",
        "To train your team on both systems",
        "To keep paying for both subscriptions"
      ],
      "correctAnswer": 1,
      "explanation": "Most migration failures (missing data, broken mappings, lost context) surface within 2 weeks. Running parallel gives you a safety net to recover any data that didn't transfer cleanly."
    },
    {
      "id": "q5",
      "question": "What happens to structured fields (dropdowns, dates, numbers) if you don't recreate them in the new CRM before importing?",
      "options": [
        "They import as free-text notes, making them invisible to AI agents",
        "They import correctly but lose their dropdown values",
        "The import fails with an error",
        "They import as blank fields"
      ],
      "correctAnswer": 0,
      "explanation": "If structured fields don't exist in the new CRM, most import tools flatten them into free-text notes. This destroys AI-readiness. Always recreate custom fields BEFORE importing."
    }
  ]
}