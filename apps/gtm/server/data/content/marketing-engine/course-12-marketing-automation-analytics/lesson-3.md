---
title: "Lead Scoring Model"
duration: "55 min"
track: "Marketing Engine"
course: "Course 12: Marketing Automation & Analytics"
lesson: 3
---

## Prioritizing Intent: The Science of Lead Scoring

As a solo founder, your most expensive asset is your time. 

If you spend three hours this week chasing two "leads" who signed up for your newsletter but have zero intention of buying, you have effectively stolen those hours from the high-intent prospect who visited your pricing page three times and is waiting for a nudge to buy.

**Lead scoring** is the mathematical process of separating the "looky-loos" from the "buyers." It assigns numerical values to leads based on their attributes (who they are) and their behaviors (what they do). The result is a single number that tells you exactly who to call today, who to keep nurturing, and who to ignore.

This lesson teaches you how to build a practical lead scoring model that works on a bootstrap budget.

<RangeSlider 
  label="How confident are you in your current lead prioritization?" 
  min={1} 
  max={10} 
  lowLabel="Totally random" 
  highLabel="Data-driven system" 
  persistKey="course-12-marketing-automation-analytics-L3-confidence" 
/>

---

### The Four Dimensions of Lead Scoring

A robust scoring model doesn't just look at email opens. It evaluates a prospect across four distinct dimensions to calculate their "Buying Intent Score."

<SlideNavigation>
<Slide title="Dimension 1: Demographic Fit">

#### Dimension 1: Demographic Fit (The ICP Signal)
This dimension answers: *Is this the kind of person I want to sell to?* You add or subtract points based on how closely they match your Ideal Customer Profile.

*   **Positive Signals (Fit):**
    *   **Job Title:** Matches your decision-maker persona (e.g., CTO, VP Sales, Solo Founder) [+10 to +15 pts].
    *   **Company Size:** Is in your "sweet spot" (e.g., 10-50 employees for a SMB tool) [+10 pts].
    *   **Industry:** They are in an industry where you have a proven track record [+5 pts].
*   **Negative Signals (Friction):**
    *   **Unqualified Roles:** Students, competitors, or job seekers [-15 to -20 pts].
    *   **Disposable Email:** Gmail, Yahoo, or Outlook addresses often signal a less serious inquiry vs. a corporate domain [-5 to -10 pts].

</Slide>

<Slide title="Dimension 2: Behavioral Engagement">

#### Dimension 2: Behavioral Engagement (The Activity Signal)
This answers: *How much attention are they paying to me?* You score actions that show engagement with your brand.

*   **High-Value Actions:**
    *   **Replied to an Email:** Explicit communication is a massive signal [+15 pts].
    *   **Watched a 10-Min Demo Video:** They spent significant time learning [+15 pts].
    *   **Attended a Live Webinar:** Trade of time for information [+10 pts].
*   **Medium-Value Actions:**
    *   **Downloaded a Lead Magnet:** Interest in a specific solution [+5 pts].
    *   **Clicked a Nurture Link:** Engaging with your teaching [+3 pts].
*   **Low-Value Actions:**
    *   **Email Open:** A weak signal (could be an auto-load or a glance) [+1 pt].

</Slide>

<Slide title="Dimension 3: Content Consumption Depth">

#### Dimension 3: Content Consumption Depth (The Trust Signal)
This answers: *How much of my "Expertise" have they consumed?* A lead who has read five case studies is much "warmer" than one who has read one blog post.

*   **Logic:**
    *   **TOFU Content (General Blog Posts):** +1 per view.
    *   **MOFU Content (Case Studies, Comparison Guides):** +5 per view.
    *   **BOFU Content (ROI Calculators, Documentation):** +10 per view.
    *   **Depth Bonus:** If a user visits more than 5 pages in a single session, add [+10 pts].

</Slide>

<Slide title="Dimension 4: Intent Signals">

#### Dimension 4: Intent Signals (The Buying Signal)
This answers: *Are they actually looking at the "Buy" button?* This is the most weighted dimension in your model.

*   **The Intent Triggers:**
    *   **Pricing Page Visits:** 2+ visits to the pricing page in 48 hours is an emergency signal [+20 pts].
    *   **Consultation Request:** Explicitly asking for time [+25 pts].
    *   **Trial Activity:** Invite a team member (SaaS) or complete Module 1 (Course) [+15 pts].
    *   **Unsubscribe:** The ultimate negative signal [-50 pts].

</Slide>
</SlideNavigation>

<ClassifyExercise
  title="Classify These Lead Signals"
  persistKey="course-12-marketing-automation-analytics-L3-classify"
  categories={[
    { id: "demographic", label: "Demographic Fit", color: "#3b82f6" },
    { id: "behavioral", label: "Behavioral Engagement", color: "#8b5cf6" },
    { id: "content", label: "Content Depth", color: "#ec4899" },
    { id: "intent", label: "Intent Signal", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "CTO at a 30-person company", correctCategory: "demographic" },
    { id: "2", content: "Visited pricing page 3 times in 24 hours", correctCategory: "intent" },
    { id: "3", content: "Replied to your nurture email", correctCategory: "behavioral" },
    { id: "4", content: "Read 4 case studies and 2 comparison guides", correctCategory: "content" },
    { id: "5", content: "Student with @gmail.com address", correctCategory: "demographic" },
    { id: "6", content: "Watched your 15-minute demo video", correctCategory: "behavioral" }
  ]}
/>

---

### Building the Thresholds: Cold, Warm, Hot

Once you have your points defined, you must categorize your leads so you know what action to take for each score range.

| Score Range | Category | Definition | Founder Action |
| :--- | :--- | :--- | :--- |
| **0 - 25** | **Cold** | Interested, but low fit or low engagement. | Automated nurture only. Do NOT spend manual time. |
| **26 - 50** | **Warm** | Good fit with moderate engagement. | Targeted invite to a webinar or a specific case study. |
| **51 - 75** | **Hot** | High fit and high engagement. | Personalised "check-in" email. Offer a 15-min specific advice call. |
| **76+** | **Sales-Ready** | Explicit intent to buy or extreme fit/activity. | immediate outreach. Phone call or high-priority email. |

<ScenarioSimulator
  title="Lead Score Calculator"
  persistKey="course-12-marketing-automation-analytics-L3-simulator"
  levers={[
    { id: "demographic", label: "Demographic Fit Points", min: -20, max: 30, step: 5, defaultValue: 15 },
    { id: "behavioral", label: "Behavioral Points", min: 0, max: 30, step: 5, defaultValue: 10 },
    { id: "content", label: "Content Depth Points", min: 0, max: 25, step: 5, defaultValue: 10 },
    { id: "intent", label: "Intent Signal Points", min: 0, max: 50, step: 5, defaultValue: 20 }
  ]}
  outputs={[
    { id: "total", label: "Total Lead Score", formula: "demographic + behavioral + content + intent", unit: "pts", precision: 0 },
    { id: "category", label: "Lead Category", formula: "total < 26 ? 'Cold' : total < 51 ? 'Warm' : total < 76 ? 'Hot' : 'Sales-Ready'", unit: "", precision: 0 }
  ]}
  insight="At {total} points, this lead is {category}. {total >= 76 ? 'Drop everything and reach out now!' : total >= 51 ? 'Send a personalized check-in email today.' : total >= 26 ? 'Add to your next targeted campaign.' : 'Keep in automated nurture only.'}"
/>

---

### The Silent Killer: Points Decay

A score of 80 is impressive if it happened yesterday. It is meaningless if it happened six months ago. To keep your data clean, you must implement **Points Decay.**

*   **The Logic:** If a lead takes no action for 30 days, reduce their score by 25%. If no action for 90 days, reset the behavioral/intent points to zero while keeping the demographic points (since their job title likely hasn't changed).

<InsightCard icon="⏰" title="The Decay Reality">
Without decay, your "hot leads" list becomes a graveyard of people who were interested 8 months ago. Decay keeps your priorities accurate and your time focused on current intent.
</InsightCard>

---

### Implementation Options

#### Level 1: The Manual Spreadsheet (The "Start Here" Method)
If you have fewer than 20 new leads a week, you don't need automation for this.
1. Create a Google Sheet with your leads.
2. Add columns for your dimensions.
3. Use a simple `=SUM(B2:E2)` formula to calculate the score.
4. Filter by the "Total Score" column once a week to see who to email.

#### Level 2: The Semi-Automated CRM
Tools like **HubSpot (Free)** or **Pipedrive** allow you to create custom fields.
1. Create a "Buying Intent Score" property.
2. Use a tool like **Zapier** to add points. (e.g., Trigger: New Email Open in Mailchimp → Action: Add 1 to HubSpot Score).
3. Set up a "High Priority View" in your CRM that only shows people with a score > 50.

#### Level 3: Native Lead Scoring
Advanced tiers of tools like **ConvertKit (Creator Pro)** or **HubSpot (Marketing Hub Professional)** have lead scoring built in. They automatically track the behavior and calculate the score for you.

<StrategyDuel
  title="Manual Spreadsheet vs. Automated CRM Scoring"
  persistKey="course-12-marketing-automation-analytics-L3-duel"
  scenario="You're getting 15-20 new leads per week and want to implement lead scoring."
  strategyA={{ 
    name: "Manual Spreadsheet", 
    description: "Track scores in Google Sheets with weekly manual updates", 
    pros: ["Zero cost", "Full control over formula", "Easy to understand and adjust"], 
    cons: ["Manual data entry", "No real-time updates", "Doesn't scale past 50 leads/week"] 
  }}
  strategyB={{ 
    name: "Automated CRM", 
    description: "Use HubSpot Free + Zapier to auto-calculate scores", 
    pros: ["Real-time scoring", "Automatic tracking", "Scales to hundreds of leads"], 
    cons: ["Learning curve", "Setup time investment", "Potential monthly cost for Zapier"] 
  }}
  expertVerdict="Start with the spreadsheet for your first 100 leads. You'll learn what actually matters. Then migrate to automation once you've validated your scoring model and hit 20+ leads/week consistently."
/>

---

### Dual Context: Scoring Scenarios

<ExampleCard label="B2B SaaS: UptimeBot">

#### The B2B SaaS Context: "UptimeBot"
A solo founder selling server monitoring software.
*   **The "MQL" (Marketing Qualified Lead):** A CTO of a 20-person company (+15) who downloaded the "Incident Response Template" (+10) and then visited the "AWS Integration" page twice (+20). 
    *   **Total Score:** 45.
    *   **The Action:** The founder sends a manual Slack message or email: "Hey, saw you checking out the AWS integration. We just pushed an update for Lambda functions—want a quick video of how it works?"

</ExampleCard>

<ExampleCard label="Creator/Coach: ProfitLab">

#### The Creator/Coach Context: "ProfitLab"
A consultant selling an $8,000 High-Ticket Sales system.
*   **The "MQL":** A business owner with $500k revenue (+15) who opened the last 5 emails (+10) and completed the "Sales Pipeline Audit" tool (+15).
    *   **Total Score:** 40.
    *   **The Action:** The founder sends a voice note on Instagram or a personal email: "I saw you finished the Audit! Your conversion rate is actually better than average, but your pipeline velocity is where the leak is. Want to see the framework I use to fix that?"

</ExampleCard>

---

### Summary Checklist

<InteractiveChecklist 
  title="Your Lead Scoring Implementation Checklist" 
  persistKey="course-12-marketing-automation-analytics-L3-checklist" 
  items={[
    "Define Top 3 Fit Criteria: What job title and industry are you looking for?",
    "Assign Point Values: Which behaviors are worth +1 and which are worth +20?",
    "Set Your 'Action Threshold': At what score will you personally reach out?",
    "Audit Your Data: Once a month, check if your 'Hot' leads actually converted. If not, adjust the points."
  ]} 
/>

### Practice Exercise: Create Your Lead Scoring Model

<TemplateBuilder
  title="Your Lead Scoring Model (V1.0)"
  persistKey="course-12-marketing-automation-analytics-L3-model"
  sections={[
    {
      id: "demographic",
      title: "Demographic Fit Criteria",
      fields: [
        { id: "title1", label: "Job Title #1 (+15 pts)", placeholder: "e.g., CTO, VP Sales", type: "text" },
        { id: "title2", label: "Job Title #2 (+15 pts)", placeholder: "e.g., Solo Founder", type: "text" },
        { id: "title3", label: "Job Title #3 (+15 pts)", placeholder: "e.g., Marketing Director", type: "text" },
        { id: "companySize", label: "Ideal Company Size (+10 pts)", placeholder: "e.g., 10-50 employees", type: "text" },
        { id: "industry", label: "Target Industry (+5 pts)", placeholder: "e.g., B2B SaaS", type: "text" }
      ]
    },
    {
      id: "behavioral",
      title: "High-Value Behaviors",
      fields: [
        { id: "behavior1", label: "Highest-Value Action (+20 pts)", placeholder: "e.g., Replied to email", type: "text" },
        { id: "behavior2", label: "Second-Highest Action (+15 pts)", placeholder: "e.g., Watched demo video", type: "text" },
        { id: "behavior3", label: "Medium-Value Action (+5 pts)", placeholder: "e.g., Downloaded lead magnet", type: "text" }
      ]
    },
    {
      id: "intent",
      title: "Intent Signals",
      fields: [
        { id: "intent1", label: "Strongest Intent Signal (+25 pts)", placeholder: "e.g., Requested consultation", type: "text" },
        { id: "intent2", label: "Secondary Intent Signal (+20 pts)", placeholder: "e.g., 2+ pricing page visits in 48hrs", type: "text" }
      ]
    },
    {
      id: "thresholds",
      title: "Action Thresholds",
      fields: [
        { id: "salesReady", label: "Sales-Ready Score (Personal Outreach)", placeholder: "e.g., 76", type: "number" },
        { id: "hot", label: "Hot Lead Score (Check-in Email)", placeholder: "e.g., 51", type: "number" },
        { id: "warm", label: "Warm Lead Score (Targeted Campaign)", placeholder: "e.g., 26", type: "number" }
      ]
    }
  ]}
/>

1.  **Select Your Weights:** Create a 4x5 table (Dimensions vs. Triggers). Assign a point value to each.
2.  **Define "Fit":** Write down the 3 job titles that get +15 points.
3.  **Set the Sales-Ready Threshold:** Decide the EXACT number where you will stop what you are doing and email a lead personally.
4.  **Expected Output:** A 1-page Lead Scoring Model (V1.0) documented for your business.