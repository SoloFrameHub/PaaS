export interface ClientRole {
  role_id: string                    // e.g., "cto_high_d", "cto_high_c"
  base_role_id: string               // e.g., "cto" (for grouping)
  display_name: string               // e.g., "CTO / VP Engineering"
  role_category: 'technical' | 'business' | 'executive' | 'operations' | 'finance'
  seniority_level: 'individual_contributor' | 'manager' | 'director' | 'vp' | 'c_suite'

  // Role Context
  typical_responsibilities: string[]
  reports_to: string[]
  manages: string[]

  // Decision Making
  budget_authority: 'none' | 'small' | 'departmental' | 'significant' | 'unlimited'
  decision_role: 'user' | 'influencer' | 'champion' | 'decision_maker' | 'economic_buyer'
  typical_buying_committee_role: string

  // Success Metrics
  measured_on: string[]              // KPIs
  gets_promoted_by: string[]
  gets_fired_for: string[]

  // Pain Points
  role_specific_pains: string[]
  time_constraints: string
  preferred_meeting_length: '15min' | '30min' | '45min' | '60min'

  // Communication
  preferred_communication: ('email' | 'phone' | 'video' | 'in_person' | 'slack')[]
  response_time_expectation: 'immediate' | 'same_day' | 'within_week'

  // Role-Specific Objections (not DISC-modified)
  role_objections: Array<{
    objection: string
    context: string
    effective_counter: string
  }>

  // Questions They Ask
  typical_questions: string[]
  hidden_concerns: string[]

  // DISC Overlay (THIS VARIES PER ENTRY)
  disc_type: 'D' | 'I' | 'S' | 'C'
  disc_overlay: {
    behavioral_description: string   // How this DISC manifests in this role
    communication_tips: string[]     // How to communicate with them
    email_style: string              // How they write emails
    meeting_behavior: string         // How they act in calls
    objection_style: string          // How they say "no"
    buying_signals: string[]         // How they show interest
    warning_signs: string[]          // Signs you're losing them
  }

  // Industries where this role exists
  applicable_industries: string[]
}
