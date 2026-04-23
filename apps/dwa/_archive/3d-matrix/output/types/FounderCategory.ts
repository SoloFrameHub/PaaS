export interface FounderCategory {
  category_id: string
  display_name: string
  short_description: string
  background: string
  primary_pain: string
  core_belief: string
  fear: string
  objection_patterns: string[]
  decision_criteria: string[]
  communication_style: {
    preferred_depth: 'surface' | 'moderate' | 'deep'
    preferred_pace: 'fast' | 'moderate' | 'slow'
    preferred_proof: 'testimonials' | 'data' | 'logic' | 'authority'
  }
  coaching_tone: string
  avoid_phrases: string[]
  motivating_phrases: string[]
  default_difficulty: 'beginner' | 'intermediate' | 'advanced'
  natural_disc_affinity: ('D' | 'I' | 'S' | 'C')[]
  struggle_disc_types: ('D' | 'I' | 'S' | 'C')[]
  recommended_courses: string[]
  milestone_triggers: string[]
}
