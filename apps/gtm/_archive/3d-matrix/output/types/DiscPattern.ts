export interface DiscPattern {
  disc_type: 'D' | 'I' | 'S' | 'C'
  full_name: string                  // "Dominant", "Influential", "Steady", "Conscientious"

  // Identification Cues (60-second protocol)
  verbal_cues: string[]
  email_patterns: string[]
  meeting_behaviors: string[]
  body_language: string[]
  diagnostic_question: string        // Question to confirm type
  diagnostic_response: string        // How this type answers

  // Sales Interaction Patterns
  objection_style: {
    how_they_say_no: string[]
    underlying_driver: string
    effective_response: string
  }

  buying_signals: {
    verbal_signals: string[]
    behavioral_signals: string[]
    what_they_need_to_commit: string
  }

  // Pitch Adaptation
  pitch_adaptation: {
    ideal_pace: 'fast' | 'moderate' | 'slow'
    ideal_structure: string          // e.g., "Bottom-line first, then details if asked"
    proof_type_preferred: string     // e.g., "ROI numbers", "testimonials", "documentation"
    avoid_phrases: string[]
    power_phrases: string[]
  }

  // Communication Guidelines
  email_template_style: string       // How to write emails to this type
  call_opening_approach: string      // How to start a call
  follow_up_cadence: string          // How often/how to follow up
}
