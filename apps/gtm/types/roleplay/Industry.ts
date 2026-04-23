export interface Industry {
  industry_id: string
  display_name: string
  parent_category: 'technology' | 'commerce' | 'services' | 'traditional'
  description: string
  typical_company_sizes: ('1-10' | '11-50' | '51-200' | '201-500' | '500+')[]
  typical_deal_sizes: ('transactional' | 'smb' | 'mid_market' | 'enterprise')[]
  sales_cycle_length: 'days' | 'weeks' | 'months' | 'quarters'

  // Pain points - tagged by complexity level
  pain_points: Array<{
    pain: string
    level: 'straightforward' | 'complex'
    context?: string
  }>

  buying_triggers: string[]
  budget_cycle: string

  // Regulatory (if applicable)
  regulatory_concerns: string[]
  compliance_language: string[]
  risk_tolerance: 'low' | 'medium' | 'high'

  // Terminology - at least 10 terms per industry
  terminology: Array<{
    term: string
    definition: string
    usage_context: string
  }>

  formality_level: 'casual' | 'professional' | 'formal'
  decision_making_style: 'fast_individual' | 'committee' | 'lengthy_process'

  // Objections - tagged by complexity level
  common_objections: Array<{
    objection: string
    underlying_concern: string
    effective_response_approach: string
    level: 'straightforward' | 'complex'
  }>

  typical_incumbent_solutions: string[]
  switching_barriers: string[]

  // Scenarios - tagged by complexity
  scenario_templates: Array<{
    template: string
    complexity: 'single_stakeholder' | 'multi_stakeholder'
    variables: string[]
  }>
}
