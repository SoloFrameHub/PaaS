# Course 42: Sales Automation — Research Package

**Track:** Operations & Systems (Track 7)
**Duration:** 10 lessons | ~8 hours total
**Budget Constraint:** <$100/month total automation spend
**Time Constraint:** 5-7 hours/week on acquisition
**Primary Output Artifact:** Process Automation Map + Zap/Flow Templates
**Core Interactions:** Automation builder, budget optimizer, debugging coach, flow tester

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Compare Zapier vs Make vs n8n vs Trigger.dev for solo founder use | Lesson 1 | Automation Platform Comparison |
| Build the 5 core automations: Lead Catcher, Meeting Logger, Follow-Up Reminder, Contract Chaser, Notifications | Lessons 2-6 | 5 Automation Blueprints |
| Wire reply detection → CRM updates → tasks | Lesson 7 | Reply Routing Flow |
| Keep total automation spend under $100/month | Lesson 8 | Budget Optimization Plan |
| Debug and maintain automations without technical help | Lesson 9 | Debugging Playbook |
| Design a complete process automation map | Lesson 10 | Process Automation Map |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + diagrams explaining the automation concept
2. **Guided Build Session** — Step-by-step automation creation with AI suggestions + testing
3. **Simulation/Roleplay** — Where applicable (Lessons 7, 9)
4. **Implementation Sprint** — Course culminates in a 7-day automation build sprint (Lesson 10)

---

## LESSON 1: Automation Tools: Zapier vs Make vs n8n vs Trigger.dev (50 min)

### Key Topics

1. **The Automation Landscape** — Four tiers: no-code (Zapier, Make), low-code (n8n, Make advanced), code-first (Trigger.dev), and CRM-native (HubSpot workflows, Pipedrive automations). Solo founders should start no-code and graduate as needed.
2. **Zapier Deep Dive** — Trigger → Action model. 7,000+ app integrations. Free: 100 tasks/month (5 single-step Zaps). Starter: $19.99/mo (750 tasks, multi-step). Professional: $49/mo (2K tasks, paths/filters).
3. **Make (formerly Integromat) Deep Dive** — Visual scenario builder with branching logic. Free: 1,000 operations/month. Core: $10.59/mo (10K operations). Pro: $18.82/mo (10K operations + advanced features). More powerful than Zapier at lower cost.
4. **n8n Deep Dive** — Open-source workflow automation. Self-hosted: free (run on $5-10/mo VPS). Cloud: $24/mo (2.5K executions). 400+ integrations. Full flexibility for technical founders.
5. **Trigger.dev Deep Dive** — Code-first, event-driven automation for developers. Free tier: 10K runs/month. Pro: $25/mo. Best for custom logic that can't be expressed in no-code tools.
6. **Decision Framework** — Zapier: "I want it working in 10 minutes." Make: "I want complex logic at lower cost." n8n: "I want full control and free hosting." Trigger.dev: "I'm a developer and want code."

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Zapier Free: 100 tasks/month, 5 single-step Zaps | Zapier pricing 2025-2026 | Enough for initial testing only |
| Zapier Starter: $19.99/mo for 750 tasks, multi-step Zaps | Zapier pricing 2025-2026 | Sweet spot for most solo founders |
| Make Free: 1,000 operations/month, 2 scenarios | Make pricing 2025-2026 | 10x Zapier's free tier |
| Make Core: $10.59/mo for 10K operations | Make pricing 2025-2026 | Best value for volume |
| n8n Self-Hosted: $0 (+ $5-10/mo VPS) | n8n pricing 2025-2026 | Best for technical founders on budget |
| n8n Cloud: $24/mo for 2,500 executions | n8n pricing 2025-2026 | Easier than self-hosting |
| Trigger.dev Free: 10,000 runs/month | Trigger.dev pricing 2025-2026 | Generous free tier for developers |
| 65% of solo founders use Zapier as first automation tool | Community surveys | Easiest to start, most integrations |

### Tools to Reference

| Tool | Free Tier | Paid Tier | Best For | Learning Curve |
|------|-----------|----------|----------|---------------|
| Zapier | 100 tasks/5 Zaps | $19.99/mo (750 tasks) | Quick setup, huge ecosystem | Low |
| Make | 1,000 ops/2 scenarios | $10.59/mo (10K ops) | Complex logic, visual builder | Medium |
| n8n | Free (self-hosted) | $24/mo (cloud) | Full control, code access | Medium-High |
| Trigger.dev | 10K runs | $25/mo (pro) | Developers, custom logic | High |

### Frameworks & Models

- **The Automation Platform Decision Tree:**
  - Are you technical? → Yes → n8n or Trigger.dev. No → Zapier or Make.
  - Do you need complex branching? → Yes → Make or n8n. No → Zapier.
  - Budget sensitivity? → High → Make free tier or n8n self-hosted. Low → Zapier Starter.
  - Need 7,000+ integrations? → Yes → Zapier. No → Make or n8n.

### Artifact Component

**Automation Platform Comparison Matrix** — Feature-by-feature comparison scored for solo founder needs (cost, ease, power, integrations).

### Interactive Element

**Concept Capsule Quiz:** Match automation requirements to platforms; identify which platform fits different scenarios; calculate monthly cost for given task volumes.

---

## LESSON 2: Automation 1: Lead Catcher (Form → CRM → Notify) (50 min)

### Key Topics

1. **The Lead Catcher Pattern** — New lead submits form → Create/update CRM contact → Enrich with available data → Assign lead score → Notify founder via Slack/email. Total time saved: 5-10 min per lead.
2. **Trigger Sources** — Website form (Typeform, Tally, native CRM form), Calendly booking, email reply to campaign, chatbot conversation, LinkedIn connection accepted.
3. **CRM Contact Creation** — Map form fields to CRM fields. Set lead source. Assign to pipeline stage "Lead." Set "date_entered" timestamp.
4. **Instant Enrichment Step** — Optional: Trigger Apollo/Hunter lookup to populate company, role, LinkedIn URL. Adds 30 seconds of wait time but saves 5 minutes of manual research.
5. **Lead Score Assignment** — Based on form responses or enrichment data: assign ICP fit score (1-10). If score ≥7, escalate notification priority.
6. **Founder Notification** — Slack message or email with: name, company, lead source, score, and direct CRM link. Include a one-click "Add to sequence" button (Zapier Push Notification or Slack interactive message).

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Companies responding within 5 minutes: 100x more likely to connect | InsideSales.com | Lead Catcher enables instant awareness |
| 78% of deals go to the first responder | Harvard Business Review | Speed = competitive advantage |
| Average time to manually enter a lead: 5-10 minutes | Sales operations data | Lead Catcher saves this entirely |
| Automation reduces lead response time from hours to minutes | Zapier case studies | Even "aware in 5 minutes" beats "saw it at 6pm" |

### Frameworks & Models

- **Lead Catcher Flow:**
  1. TRIGGER: New form submission / Calendly booking / Email reply
  2. ACTION 1: Create CRM contact (map all fields)
  3. ACTION 2: Set lead source, pipeline stage, date
  4. ACTION 3 (optional): Enrich via Apollo/Hunter
  5. ACTION 4: Calculate lead score from fields
  6. ACTION 5: Send Slack/email notification with CRM link

### Artifact Component

**Lead Catcher Blueprint** — Complete automation template with trigger, actions, field mapping, and notification format. Includes Zapier and Make versions.

### Interactive Element

**Guided Build:** Student selects their form tool and CRM. AI generates the complete Lead Catcher automation with field mappings and notification template. Student tests with a sample submission.

---

## LESSON 3: Automation 2: Meeting Logger (Call → CRM → Follow-Up) (50 min)

### Key Topics

1. **The Meeting Logger Pattern** — Calendar event completed → Log meeting in CRM as activity → Update deal stage to "Meeting" → Create follow-up task for Day 1 → Send automated thank-you email (optional). Time saved: 10-15 min per meeting.
2. **Trigger Sources** — Calendly "invitee created" + "event ended" (or scheduled time passed), Google Calendar event, Zoom meeting ended, manual CRM stage change.
3. **CRM Activity Logging** — Create activity record: type = "Meeting," date, attendee, duration. Link to associated deal. Update deal stage from "Engaged" to "Meeting."
4. **Post-Meeting Follow-Up Task** — Auto-create task: "Send follow-up to [Name]" due in 24 hours. Include meeting date and any notes from the calendar event.
5. **Optional: Thank-You Email** — Trigger a simple thank-you email within 30 minutes of meeting end. Keep it brief: "Great speaking with you. As discussed, I'll send over [X] by [date]." Can use CRM email template or Zapier email.
6. **Meeting Outcome Tracking** — After follow-up: update CRM with meeting outcome (positive/neutral/negative). This feeds the AI-ready schema from Course 40.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Following up within 24 hours of a meeting increases close rate by 25% | HubSpot | Meeting Logger ensures nothing slips |
| Average rep spends 15 min logging each meeting | Salesforce | Automation recovers this entirely |
| Only 44% of sales meetings receive a follow-up within 24 hours | InsideSales.com | Automation fixes this gap |
| Deals without next steps after meetings die 2x faster | CSO Insights | Auto-created tasks prevent this |

### Frameworks & Models

- **Meeting Logger Flow:**
  1. TRIGGER: Calendar event completed (Calendly event ended / time passed)
  2. ACTION 1: Create CRM activity (type: meeting, date, attendee, duration)
  3. ACTION 2: Update deal stage to "Meeting" (if not already)
  4. ACTION 3: Create follow-up task (due: +24 hours)
  5. ACTION 4 (optional): Send thank-you email template
  6. ACTION 5: Set reminder to log meeting outcome (+48 hours)

### Artifact Component

**Meeting Logger Blueprint** — Complete automation template with Calendly/Google Calendar triggers, CRM actions, and follow-up task creation. Zapier and Make versions.

### Interactive Element

**Guided Build:** Student connects their calendar and CRM. AI configures the Meeting Logger and tests with a sample event. Student verifies CRM activity creation and task.

---

## LESSON 4: Automation 3: Follow-Up Reminder (Day 3/7/14 Chain) (50 min)

### Key Topics

1. **The Follow-Up Reminder Pattern** — After outreach, most solo founders forget to follow up. This automation creates tasks at Day 3, Day 7, and Day 14 if no reply detected. The chain stops when the prospect replies or the deal stage advances.
2. **The Day 3/7/14 Cadence** — Day 3: Quick check-in ("Following up on my note from Monday"). Day 7: Add new value ("I noticed [trigger event]"). Day 14: Break-up email or final check-in ("I'll assume the timing isn't right").
3. **Trigger: No Reply Detection** — Check CRM contact's last activity. If last outbound email was 3 days ago AND no inbound email or stage change → create follow-up task. Repeat at 7 and 14 days.
4. **Stop Conditions** — (1) Prospect replied (inbound email detected). (2) Deal stage advanced. (3) Deal moved to Lost. (4) Manual "pause" flag set. Always include stop conditions to avoid harassing cold leads.
5. **Task vs Auto-Send** — Follow-ups should be TASKS (human reviews and personalizes), not auto-send (risk of bad timing or irrelevant messaging). The human gate is critical for follow-ups.
6. **Scaling Follow-Up** — At 20+ active conversations, manual follow-up tracking is impossible. This automation ensures nothing falls through the cracks without creating "set and forget" spam.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| 80% of sales require 5+ follow-ups to close | National Sales Executive Association | Most founders stop at 1-2 |
| 44% of salespeople give up after 1 follow-up | Scripted | Automation prevents follow-up fatigue |
| The optimal follow-up cadence: Day 1, 3, 7, 14, 30 | Woodpecker / Mailshake | Day 3/7/14 covers the critical window |
| Follow-up emails get 2-3x the reply rate of initial outreach | Yesware | Follow-up is where deals happen |

### Frameworks & Models

- **Day 3/7/14 Follow-Up Chain:**
  1. TRIGGER: Outbound email sent (logged in CRM)
  2. WAIT: 3 days
  3. CHECK: Any reply or stage change? → Yes: STOP. No: Create Day 3 task.
  4. WAIT: 4 more days (Day 7 total)
  5. CHECK: Any reply or stage change? → Yes: STOP. No: Create Day 7 task.
  6. WAIT: 7 more days (Day 14 total)
  7. CHECK: Any reply or stage change? → Yes: STOP. No: Create Day 14 (break-up) task.

- **Follow-Up Email Templates:**
  - Day 3: "Quick follow-up on [topic] — any thoughts?"
  - Day 7: "Noticed [trigger event / relevant news] — thought of our conversation about [topic]"
  - Day 14: "I'll assume the timing isn't right. Feel free to reach out when [trigger]. Wishing you well."

### Artifact Component

**Follow-Up Reminder Chain Blueprint** — Complete automation template with timing, stop conditions, and task templates. Zapier and Make versions.

### Interactive Element

**Guided Build:** Student configures the Day 3/7/14 chain for their CRM. AI helps set up stop conditions. Student tests with a sample outreach sequence.

---

## LESSON 5: Automation 4: Contract & Invoice Chaser (45 min)

### Key Topics

1. **The Contract Chaser Pattern** — Proposal sent but unsigned after 3 days → Remind founder → If unsigned after 7 days → Auto-send gentle nudge to prospect → If unsigned after 14 days → Escalate with "any questions?" email. Stops when signed or deal closed-lost.
2. **Trigger: Proposal Sent Stage** — When deal moves to "Proposal" stage in CRM, start the contract chase timer. Track via CRM deal stage or e-signature tool status (DocuSign, SignWell, PandaDoc).
3. **Day 3: Internal Reminder** — Slack/email to founder: "Contract for [Deal Name] hasn't been signed yet. Follow up today?" Include direct link to deal and document.
4. **Day 7: Gentle Prospect Nudge** — Optional auto-send (or task): "Hi [Name], just checking if you've had a chance to review the proposal. Happy to hop on a quick call if any questions."
5. **Day 14: Escalation** — Task to founder: "Contract unsigned for 14 days. Call to discuss blockers or move to Lost?" Include deal details and suggested talk track.
6. **Invoice Chaser Variant** — Same pattern for unpaid invoices. Day 3: Internal reminder. Day 7: Auto-send payment reminder. Day 14: Personal follow-up. Day 30: Escalate or pause service.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average B2B contract signing time: 5-14 days (SMB) | DocuSign analytics | Beyond 14 days, deal is at risk |
| 63% of proposals are signed within 3 days if followed up | PandaDoc | Speed of follow-up matters |
| Late invoice rate: 30-40% of B2B invoices paid late | Dun & Bradstreet | Chasers recover revenue faster |
| Automated payment reminders reduce late payments by 30% | Stripe / QuickBooks | Simple automation, real impact |

### Frameworks & Models

- **Contract Chaser Flow:**
  1. TRIGGER: Deal stage → "Proposal" (or e-signature sent)
  2. WAIT: 3 days. CHECK: Signed? → Yes: STOP. No: Internal reminder.
  3. WAIT: 4 more days (Day 7). CHECK: Signed? → Yes: STOP. No: Create prospect nudge task/email.
  4. WAIT: 7 more days (Day 14). CHECK: Signed? → Yes: STOP. No: Escalation task to founder.
  5. STOP CONDITIONS: Document signed, deal closed-lost, manual pause.

### Artifact Component

**Contract & Invoice Chaser Blueprint** — Templates for both contract and invoice chasers with timing, messaging, and stop conditions.

### Interactive Element

**Guided Build:** Student connects their e-signature or invoicing tool to CRM. AI configures the chaser chain. Student tests with a sample document.

---

## LESSON 6: Automation 5: Deal Notifications (Slack/Email Alerts) (45 min)

### Key Topics

1. **The Deal Notification Pattern** — When key deal events happen, notify the right person instantly via Slack or email. No need to live inside the CRM.
2. **5 Essential Notifications** — (1) New lead created (from Lead Catcher). (2) Deal stage changed. (3) Deal won (celebration + onboarding trigger). (4) Deal lost (log reason + post-mortem trigger). (5) High-value deal enters pipeline.
3. **Notification Design** — Rich notifications with: deal name, amount, stage, contact name, and direct CRM link. Use Slack blocks for formatting. Color-code: green for won, red for lost, blue for new.
4. **Notification Fatigue Prevention** — Only notify on meaningful events. Batch low-priority updates into a daily digest. Reserve real-time alerts for: new high-score leads, deals won, deals lost.
5. **Multi-Channel Notifications** — Slack for real-time. Email digest for daily summary. SMS for high-priority events (optional, use Twilio or native phone notification).
6. **Team Notifications (Future-Proofing)** — When you hire (Course 45), these notifications scale to team channels. Same automations, different recipients.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average CRM login frequency for solo founders: 2-3x/day | CRM usage studies | Not enough to catch real-time events |
| Slack notifications reduce response time to CRM events by 60% | Zapier case studies | Events come to you, not the other way |
| Notification fatigue sets in above 20 alerts/day | UX research | Batch low-priority, alert high-priority |
| Deal won celebrations increase motivation and consistency | Behavioral psychology | Small dopamine hit reinforces the sales habit |

### Frameworks & Models

- **Notification Priority Matrix:**

| Event | Priority | Channel | Format |
|-------|----------|---------|--------|
| New high-score lead (≥7) | High | Slack (real-time) | Rich card with CRM link |
| Deal won | High | Slack + Email | Celebration message + amount |
| Deal lost | High | Slack | Loss reason + post-mortem prompt |
| Deal stage changed | Medium | Daily digest email | Batch summary |
| New lead (score <7) | Low | Daily digest email | Batch summary |

### Artifact Component

**Deal Notification Blueprint** — Templates for all 5 notification types with Slack block formatting, email templates, and priority routing.

### Interactive Element

**Guided Build:** Student configures 3 high-priority notifications (new lead, deal won, deal lost) in their chosen platform. AI tests with sample CRM events.

---

## LESSON 7: Wiring Reply Detection → CRM → Tasks (50 min)

### Key Topics

1. **The Reply Routing Problem** — Prospect replies to an outreach email. That reply needs to: (1) Update CRM stage, (2) Pause any automated sequences, (3) Create a response task, (4) Notify the founder. Most solo founders miss replies because they live in email, not CRM.
2. **Reply Detection Methods** — CRM email sync (best: HubSpot, Attio auto-detect). Outreach tool webhooks (Instantly, Smartlead send reply events to Zapier). Manual: BCC + filter rules.
3. **CRM Stage Update on Reply** — Reply detected → Move deal from "Contacted" to "Engaged." If reply is positive (contains booking language, interest keywords), advance further.
4. **Sequence Pause Logic** — If prospect is in an automated email sequence (Instantly, Smartlead), reply should pause the sequence. Most tools do this natively. Verify and test.
5. **Response Task Creation** — Auto-create CRM task: "Reply from [Name] — Respond within 4 hours." Include the reply content if possible (Zapier can parse email body).
6. **Positive vs Negative Reply Classification** — Advanced: Use AI (ChatGPT via API or Make AI module) to classify reply sentiment. Positive: create priority response task. Negative/Unsubscribe: update CRM, remove from sequences.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average reply-to-response time for solo founders: 6-12 hours | Outreach analytics | Should be <4 hours for warm leads |
| 30-50% of positive replies go unanswered within 24 hours | SalesHacker | Biggest revenue leak in outbound |
| AI reply classification accuracy: 85-95% | Practical AI testing | Good enough for routing, not for auto-responding |
| Pausing sequences on reply prevents 90% of "oops I just sent a follow-up" moments | Instantly / Smartlead data | Always verify sequence pausing works |

### Frameworks & Models

- **Reply Routing Flow:**
  1. TRIGGER: Reply detected (CRM email sync, outreach tool webhook, or email filter)
  2. ACTION 1: Update CRM stage (Contacted → Engaged)
  3. ACTION 2: Pause automated sequences for this contact
  4. ACTION 3: Create response task (due: 4 hours)
  5. ACTION 4: Notify founder via Slack (high priority)
  6. OPTIONAL: AI classify reply sentiment → route accordingly

### Artifact Component

**Reply Routing Flow Blueprint** — Complete automation template with detection methods, CRM updates, sequence pausing, and task creation. Includes AI classification option.

### Interactive Element

**Simulation:** Student receives 10 simulated replies (positive interest, negative, out-of-office, unsubscribe, question). Must configure routing rules for each type. AI tests the routing and scores accuracy.

---

## LESSON 8: Budget Optimization: Staying Under $100/Month (45 min)

### Key Topics

1. **The $100/Month Automation Budget** — For solo founders, automation is an investment that must show ROI quickly. $100/month = 10-20 hours saved at $5-10/hour effective rate.
2. **Budget Tier 1: $0/Month** — Make free (1,000 ops/month) + n8n self-hosted ($5-10/mo VPS) + CRM-native automations (HubSpot free has none, Pipedrive has 30 automations). Enough for 2-3 core automations.
3. **Budget Tier 2: $20-30/Month** — Zapier Starter ($19.99/mo, 750 tasks) or Make Core ($10.59/mo, 10K ops). Covers all 5 core automations plus reply routing. Sweet spot for most solo founders.
4. **Budget Tier 3: $50-100/Month** — Zapier Professional ($49/mo, 2K tasks) or Make Pro ($18.82/mo) + n8n Cloud ($24/mo). Covers complex multi-step automations, AI classification, and high volume.
5. **Cost Optimization Strategies** — (1) Use polling (check every 15 min) instead of instant triggers (1 task per trigger). (2) Consolidate multi-step Zaps into fewer steps. (3) Use CRM-native automations for simple tasks. (4) Switch to Make for complex logic (cheaper per operation).
6. **ROI Calculation** — Time saved per automation × hourly rate × frequency. If an automation saves 10 min/day = 5 hrs/month. At $50/hr effective rate = $250/month value. Even a $50/month tool pays for itself 5x.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average Zapier Starter user: 400-600 tasks/month | Zapier usage data | Well within 750-task limit |
| Make is 3-5x cheaper per operation than Zapier at scale | Price comparison analysis | Switch to Make if task volume is high |
| CRM-native automations: $0 additional cost | CRM platforms | Use these first, then layer Zapier/Make |
| 5 core automations save 15-25 hours/month | Course estimate | $750-1,250/month value at $50/hr |

### Frameworks & Models

- **Budget Allocation Matrix:**

| Budget | Platform | Tasks/Ops | Core Automations | Reply Routing | AI Classification |
|--------|----------|-----------|-----------------|--------------|-------------------|
| $0/mo | Make Free + CRM native | 1,000 ops/mo | 2-3 basic | Manual | No |
| $20/mo | Zapier Starter or Make Core | 750-10K | All 5 | Yes | No |
| $50/mo | Zapier Pro or Make Pro | 2K-10K | All 5 + advanced | Yes | Basic |
| $100/mo | Zapier Pro + Make/n8n | 2K-20K | All 5 + custom | Yes | AI-powered |

### Artifact Component

**Budget Optimization Plan** — Personalized automation budget with platform selection, task volume projections, and ROI calculation.

### Interactive Element

**KPI Simulator:** Input number of leads/month, meetings/month, and active deals. AI calculates required automation volume, recommends platform, and projects monthly cost vs time saved.

---

## LESSON 9: Debugging Broken Automations (45 min)

### Key Topics

1. **Why Automations Break** — API changes (apps update, break connection). Auth token expires (OAuth reconnection needed). Data format changes (form field renamed). Rate limits hit (too many API calls). Trigger stops firing (webhook deactivated).
2. **The 5-Step Debug Protocol** — (1) Check the automation history/log for error messages. (2) Verify trigger is still connected (test trigger). (3) Check each step for data mapping errors. (4) Verify API connections are authenticated. (5) Test with a fresh sample input.
3. **Common Error Patterns** — "404 Not Found" = endpoint changed or record deleted. "401 Unauthorized" = reconnect the app. "400 Bad Request" = data format mismatch (text sent to number field). "429 Too Many Requests" = add delays between steps.
4. **Monitoring & Alerts** — Set up Zapier/Make to email you when an automation fails. Check automation health weekly (add to Friday review). Keep a log of past failures and fixes.
5. **Versioning and Rollback** — Before editing a working automation, duplicate it. Name with dates (e.g., "Lead Catcher v2 — 2026-02-24"). If the edit breaks, reactivate the old version.
6. **When to Rebuild vs Patch** — If the automation has been patched 3+ times, rebuild from scratch. Patched automations accumulate technical debt. A clean rebuild takes 30-60 minutes and prevents cascading failures.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average Zapier automation fails 1-3 times per month | Zapier reliability data | Failures are normal, not exceptional |
| 60% of automation failures are auth-related (expired tokens) | Integration platform data | Fix: reconnect the app |
| 25% of failures are data format mismatches | Integration platform data | Fix: check field mappings |
| Average debug time for solo founders: 15-30 minutes per incident | Community surveys | The 5-step protocol cuts this to 5-10 min |

### Frameworks & Models

- **The 5-Step Debug Protocol:**
  1. **READ THE LOG**: Open automation history. Find the failed run. Read the error message. (Most errors are self-explanatory.)
  2. **TEST THE TRIGGER**: Re-run the trigger with a sample event. Does it fire? If not: reconnect the app.
  3. **CHECK EACH STEP**: Walk through each action. Where does data go missing or malform?
  4. **VERIFY AUTH**: Reconnect any apps showing "disconnected." Re-authorize OAuth tokens.
  5. **TEST END-TO-END**: Run a fresh test input through the entire automation. Verify output at each step.

### Artifact Component

**Debugging Playbook** — Error pattern reference, 5-step protocol, common fixes by platform (Zapier, Make, n8n), and monitoring setup guide.

### Interactive Element

**Simulation:** Student receives 5 broken automation scenarios with error messages. Must diagnose the issue using the 5-step protocol and select the correct fix. AI scores diagnosis accuracy and speed.

---

## LESSON 10: Your Automation Stack Blueprint (45 min)

### Key Topics

1. **The Complete Automation Review** — Walk through all 9 lessons' artifacts and verify completeness
2. **The Process Automation Map** — Visual diagram showing all automations, triggers, connections, and data flows between: Forms → CRM → Calendar → Email → Notifications → Tasks.
3. **The 7-Day Automation Sprint** — Day 1: Choose platform, create account. Day 2: Build Lead Catcher. Day 3: Build Meeting Logger. Day 4: Build Follow-Up Reminder. Day 5: Build Contract Chaser + Deal Notifications. Day 6: Wire reply routing. Day 7: Test all automations end-to-end.
4. **Integration Health Dashboard** — Track which automations are running, last successful run, error count, and tasks consumed. Review weekly.
5. **Handoff to Course 43** — When automation isn't enough and you need human help (VAs), Course 43 covers outsourcing. Your automations become the SOPs for VA tasks.
6. **The Automation-First Principle** — Before hiring (Course 43, 45), ask: can this be automated? If yes, automate. If partially, automate what you can and delegate the rest.

### Frameworks & Models

**7-Day Automation Sprint:**

| Day | Activity | Output |
|-----|----------|--------|
| 1 | Choose platform, create account, connect CRM | Platform ready |
| 2 | Build Automation 1: Lead Catcher | Leads auto-captured |
| 3 | Build Automation 2: Meeting Logger | Meetings auto-logged |
| 4 | Build Automation 3: Follow-Up Reminder | Follow-ups never missed |
| 5 | Build Automations 4-5: Contract Chaser + Notifications | Contracts chased, events notified |
| 6 | Wire reply detection → CRM → tasks | Replies auto-routed |
| 7 | End-to-end testing of all automations | System validated |

**Process Automation Map Template:**
```
[Form/Website] → Lead Catcher → [CRM: New Lead] → Notification
[Calendar] → Meeting Logger → [CRM: Update Stage] → Follow-Up Task
[CRM: No Reply 3d] → Follow-Up Reminder → [Task: Follow Up]
[CRM: Proposal Stage] → Contract Chaser → [Reminder Chain]
[CRM: Stage Change] → Deal Notification → [Slack/Email]
[Email: Reply] → Reply Router → [CRM: Update + Task + Notify]
```

### Artifact Component

**Complete Process Automation Map** (Primary Course Artifact) — Visual diagram of all automations with triggers, actions, data flows, and integration points. Includes all 5 automation blueprints + reply routing flow + budget plan + debugging playbook.

### Interactive Element

**Implementation Sprint Launcher:** AI generates personalized 7-day sprint calendar based on chosen platform and CRM. Daily check-ins verify each automation is working. Day 7: full integration test scored by AI.

---

## TOOL PRICING SUMMARY

### Automation Platforms

| Tool | Free Tier | Solo Starter Tier | Pro Tier |
|------|-----------|------------------|----------|
| Zapier | $0 (100 tasks, 5 Zaps) | $19.99/mo (750 tasks) | $49/mo (2K tasks) |
| Make | $0 (1,000 ops, 2 scenarios) | $10.59/mo (10K ops) | $18.82/mo (10K ops) |
| n8n | $0 (self-hosted) | $24/mo (cloud, 2.5K) | Custom |
| Trigger.dev | $0 (10K runs) | $25/mo (pro) | Custom |

### Budget Recommendations
- **$0/mo**: Make free tier (best free automation volume)
- **$10-20/mo**: Make Core (best value) or Zapier Starter (most integrations)
- **$50/mo**: Zapier Professional (for high volume or complex Zaps)
- **$100/mo**: Zapier Pro + Make/n8n (for AI classification + complex flows)

---

## ALL ARTIFACTS CREATED

1. Automation Platform Comparison Matrix (L1)
2. Lead Catcher Blueprint (L2)
3. Meeting Logger Blueprint (L3)
4. Follow-Up Reminder Chain Blueprint (L4)
5. Contract & Invoice Chaser Blueprint (L5)
6. Deal Notification Blueprint (L6)
7. Reply Routing Flow Blueprint (L7)
8. Budget Optimization Plan (L8)
9. Debugging Playbook (L9)
10. Complete Process Automation Map (L10) — compiles all above

**Completion Badge:** "Automation Architect" — 200 XP
