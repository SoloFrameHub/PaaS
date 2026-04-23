const curriculumData = [
    {
        id: 'foundations',
        title: 'TRACK 1: FOUNDATIONS',
        description: 'Build the strategic foundation for your sales efforts by mastering psychology, positioning, and target market selection.',
        magnetComponent: 'M',
        courses: [
            {
                id: 'sales-psychology',
                title: 'Course 0: Solo Founder Sales Psychology',
                number: 0,
                description: 'Master the mindset before the tactics. Overcome sales resistance, impostor syndrome, and fear of rejection.',
                duration: '6-7 hours',
                objectives: [
                    'Identify your specific avoidance patterns (Procrastibuilding vs. Content Treadmill)',
                    'Reframe sales from "extraction" to "diagnosis" to align with your values',
                    'Neutralize the negativity bias that makes rejection feel like physical danger',
                    'Stop underpricing your work out of fear',
                    'Distinguish between genuine "no fit" and fear-driven "no"',
                    'Establish a sustainable sales rhythm that fits your personality'
                ],
                lessons: [
                    { id: '1', title: 'Why Your Brain Sabotages Sales', duration: '45 min' },
                    { id: '2', title: 'The Math Your Brain Gets Wrong About Rejection', duration: '50 min' },
                    { id: '3', title: 'Your Specific Avoidance Pattern', duration: '50 min' },
                    { id: '4', title: 'The Price of Underpricing', duration: '45 min' },
                    { id: '5', title: 'The Reframe That Actually Works', duration: '55 min' },
                    { id: '6', title: 'Specialized Reframes (Scientist vs. Invitation)', duration: '50 min' },
                    { id: '7', title: 'Direct Questions and Early Disqualification', duration: '50 min' },
                    { id: '8', title: 'Building Your Sustainable Sales Rhythm', duration: '45 min' }
                ]
            },
            {
                id: 'icp-builder',
                title: 'Course 1: ICP Builder Workshop',
                number: 1,
                description: 'Define your Ideal Customer Profile with precision to stop wasting time on the wrong prospects.',
                duration: '10-12 hours',
                objectives: [
                    'Define your Ideal Customer Profile with 12+ specific attributes',
                    'Distinguish between firmographic, behavioral, and psychographic criteria',
                    'Identify your "Golden Segment" beachhead market',
                    'Create ICP v1 and refine it through feedback'
                ],
                lessons: [
                    { id: '1', title: 'Why Most Founders Target Wrong', duration: '45 min' },
                    { id: '2', title: 'Defining Your Perfect Customer', duration: '50 min' },
                    { id: '3', title: 'Finding Your Golden Segment', duration: '60 min' },
                    { id: '4', title: 'Buyer Personas vs. Company Profiles', duration: '50 min' },
                    { id: '5', title: 'Psychographic Targeting', duration: '55 min' },
                    { id: '6', title: 'Behavioral Signals & Triggers', duration: '50 min' },
                    { id: '7', title: 'The ICP Document Creation', duration: '60 min' },
                    { id: '8', title: 'Validating Your ICP', duration: '55 min' },
                    { id: '9', title: 'Negative ICP: Who NOT to Sell To', duration: '45 min' },
                    { id: '10', title: 'ICP for Different Sales Motions', duration: '50 min' },
                    { id: '11', title: 'ICP Evolution: v1 to v3', duration: '50 min' },
                    { id: '12', title: 'Your Complete ICP System', duration: '60 min' }
                ]
            },
            {
                id: 'positioning-value',
                title: 'Course 2: Positioning & Value Proposition',
                number: 2,
                description: 'Differentiate your offer and articulate value that resonates with your ICP.',
                duration: '8-10 hours',
                objectives: [
                    'Apply April Dunford\'s positioning framework',
                    'Translate features into business outcomes',
                    'Create a compelling narrative for your product',
                    'Use StoryBrand framework for customer-centric messaging',
                    'Quantify value in terms of time, money, and risk'
                ],
                lessons: [
                    { id: '1', title: 'What Positioning Actually Means (And Why Features Don\'t Sell)', duration: '45 min' },
                    { id: '2', title: 'April Dunford\'s Positioning Framework', duration: '55 min' },
                    { id: '3', title: 'StoryBrand Messaging Framework', duration: '55 min' },
                    { id: '4', title: 'Feature → Benefit → Outcome Translation', duration: '50 min' },
                    { id: '5', title: 'Value Quantification', duration: '55 min' },
                    { id: '6', title: 'Competitive Positioning (Without Competitor Bashing)', duration: '50 min' },
                    { id: '7', title: 'Minimum Viable Brand', duration: '50 min' },
                    { id: '8', title: 'Brand Voice and Tone', duration: '45 min' },
                    { id: '9', title: 'Your Positioning Statement', duration: '55 min' },
                    { id: '10', title: 'Elevator Pitch Workshop', duration: '50 min' }
                ]
            },
            {
                id: 'choose-path',
                title: 'Course 3: Choose Your Acquisition Path',
                number: 3,
                description: 'Identify if you are built for Inbound, Outbound, or Community-led growth.',
                duration: '6-8 hours',
                objectives: [
                    'Evaluate acquisition channels against your strengths',
                    'Select your primary and secondary growth engines',
                    'Build your initial acquisition roadmap'
                ],
                lessons: [
                    { id: '1', title: 'The Three Acquisition Archetypes', duration: '45 min' }
                ]
            },
            {
                id: 'list-building',
                title: 'Course 4: List Building & Prospecting Infrastructure',
                number: 4,
                description: 'Build the technical systems to find and verify your ideal prospects.',
                duration: '9-10 hours',
                objectives: [
                    'Identify top-tier prospecting tools (Apollo, SalesNav, etc.)',
                    'Build automated verification workflows',
                    'Create high-quality target lists'
                ],
                lessons: [
                    { id: '1', title: 'List Building Philosophy', duration: '25 min' },
                    { id: '2', title: 'LinkedIn Sales Navigator Mastery', duration: '45 min' },
                    { id: '3', title: 'Apollo and Enrichment Tools', duration: '40 min' },
                    { id: '4', title: 'Advanced Data Sourcing', duration: '35 min' },
                    { id: '5', title: 'Email Infrastructure Setup', duration: '40 min' },
                    { id: '6', title: 'Domain Warming Strategy', duration: '30 min' },
                    { id: '7', title: 'CRM Selection and Setup', duration: '50 min' },
                    { id: '8', title: 'List Hygiene and Maintenance', duration: '25 min' },
                    { id: '9', title: 'Compliance: CAN-SPAM and GDPR', duration: '30 min' },
                    { id: '10', title: 'The Execution Engine', duration: '45 min' },
                    { id: '11', title: 'List Building Recap', duration: '20 min' }
                ]
            }
        ]
    },
    {
        id: 'marketing-engine',
        title: 'TRACK 2: MARKETING ENGINE',
        description: 'Build systematic marketing systems that generate a steady stream of qualified leads.',
        magnetComponent: 'S',
        courses: [
            {
                id: 'technical-content',
                title: 'Course 5: Technical Content Engine',
                number: 5,
                description: 'Create content that earns the trust of technical buyers and decision-makers.',
                duration: '10-12 hours',
                lessons: [{ id: '1', title: 'Content for Builders', duration: '45 min' }]
            },
            {
                id: 'seo-aeo',
                title: 'Course 6: SEO & Answer Engine Optimization',
                number: 6,
                description: 'Rank where your customers search, including AI-driven answer engines.',
                duration: '8-10 hours',
                lessons: [{ id: '1', title: 'SEO in the Age of AI', duration: '45 min' }]
            },
            {
                id: 'linkedin-engine',
                title: 'Course 7: LinkedIn Growth Engine',
                number: 7,
                description: 'Turn LinkedIn into a professional networking and lead generation powerhouse.',
                duration: '8-10 hours',
                lessons: [{ id: '1', title: 'The LinkedIn Algorithm for Founders', duration: '45 min' }]
            },
            {
                id: 'cold-email-mastery',
                title: 'Course 8: Cold Email Mastery',
                number: 8,
                description: 'Write emails that get replies by focusing on problems, not features.',
                duration: '10-12 hours',
                objectives: [
                    'Master multi-touch sequence architecture',
                    'Implement personalization at scale',
                    'Ensure 99% email deliverability'
                ],
                lessons: [
                    { id: '1', title: 'Why Cold Email Still Works', duration: '45 min' },
                    { id: '2', title: 'The PAS & AIDA Frameworks', duration: '55 min' }
                ]
            },
            {
                id: 'community-lead-gen',
                title: 'Course 9: Community-Based Lead Generation',
                number: 9,
                description: 'Leverage Slack, Discord, and niche forums to find prospects.',
                duration: '7-8 hours',
                lessons: []
            },
            {
                id: 'email-nurture',
                title: 'Course 10: Email Nurture & Newsletter',
                number: 10,
                description: 'Stay top-of-mind with prospects who aren\'t ready to buy yet.',
                duration: '8-9 hours',
                lessons: []
            },
            {
                id: 'social-proof',
                title: 'Course 11: Social Proof & Referral Systems',
                number: 11,
                description: 'Systematize the collection and deployment of testimonials and referrals.',
                duration: '7-8 hours',
                lessons: []
            },
            {
                id: 'marketing-automation',
                title: 'Course 12: Marketing Automation & Analytics',
                number: 12,
                description: 'Connect your tools and measure what actually works.',
                duration: '9-10 hours',
                lessons: []
            }
        ]
    },
    {
        id: 'sales-methodology',
        title: 'TRACK 3: SALES METHODOLOGY',
        description: 'Master the art and science of the B2B sales conversation.',
        magnetComponent: 'S',
        courses: [
            {
                id: 'disc-personas',
                title: 'Course 13: Understanding DISC Buyer Personas',
                number: 13,
                description: 'Adapt your communication style to match your buyer\'s personality.',
                duration: '9-10 hours',
                objectives: [
                    'Identify DISC types (D, I, S, C) rapidly',
                    'Adapt pitch and pace to personality',
                    'Handle type-specific objections'
                ],
                lessons: [
                    { id: '1', title: 'Why Personality Matters More Than Product', duration: '45 min' },
                    { id: '2', title: 'The D Personality - Dominant', duration: '50 min' },
                    { id: '3', title: 'The I Personality - Influential', duration: '50 min' },
                    { id: '4', title: 'The S Personality - Steady', duration: '50 min' },
                    { id: '5', title: 'The C Personality - Conscientious', duration: '50 min' },
                    { id: '6', title: 'Rapid DISC Identification', duration: '55 min' },
                    { id: '7', title: 'DISC in Sales Conversations', duration: '60 min' },
                    { id: '8', title: 'Common Mistakes by DISC Type', duration: '45 min' },
                    { id: '9', title: 'Multi-Stakeholder DISC', duration: '50 min' },
                    { id: '10', title: 'Practice: DISC Roleplay Sessions', duration: '60 min' }
                ]
            },
            {
                id: 'discovery-framework',
                title: 'Course 14: Discovery Framework - BANT/MEDDIC',
                number: 14,
                description: 'Structured frameworks to uncover pain and qualify opportunities.',
                duration: '12-13 hours',
                objectives: [
                    'Execute high-level qualification calls',
                    'Uncover root-cause business pain',
                    'Systematize the BANT and MEDDIC frameworks'
                ],
                lessons: [
                    { id: '1', title: 'Why Discovery Is Where Deals Are Won', duration: '45 min' },
                    { id: '2', title: 'The BANT Framework', duration: '50 min' },
                    { id: '3', title: 'The MEDDIC Framework', duration: '55 min' },
                    { id: '4', title: 'Budget: Qualifying Financial Fit', duration: '50 min' },
                    { id: '5', title: 'Authority: Mapping Decision-Makers', duration: '55 min' },
                    { id: '6', title: 'Need: Uncovering Real Pain', duration: '55 min' },
                    { id: '7', title: 'Timeline: Understanding Urgency', duration: '50 min' },
                    { id: '8', title: 'Metrics: Business Impact', duration: '50 min' },
                    { id: '9', title: 'Decision Criteria & Process', duration: '55 min' },
                    { id: '10', title: 'Identify Pain vs. Champion', duration: '55 min' },
                    { id: '11', title: 'Discovery Call Structure & Scaling', duration: '55 min' },
                    { id: '12', title: 'AI Roleplay: Discovery Practice', duration: '60 min' }
                ]
            },
            {
                id: 'discovery-simulations',
                title: 'Course 15: Discovery Call Simulations',
                number: 15,
                description: 'Intensive AI-based practice sessions for discovery calls.',
                duration: 'Practice',
                lessons: [
                    { id: '1', title: 'Practical Discovery Drills', duration: '60 min' }
                ]
            },
            {
                id: 'demo-architecture',
                title: 'Course 16: Demo Architecture',
                number: 16,
                description: 'Conduct value-first demos that map features to customer pain.',
                duration: '8-10 hours',
                lessons: [
                    { id: '1', title: 'The Validation Map: Feature Dumping vs. Value Mapping', duration: '45 min' },
                    { id: '2', title: 'The Tell-Show-Tell Framework', duration: '50 min' },
                    { id: '3', title: 'Reverse Engineering the WOW', duration: '40 min' },
                    { id: '4', title: 'The Altitude Strategy: Tailoring to Roles', duration: '35 min' },
                    { id: '5', title: 'Handling In-Demo Objections', duration: '40 min' },
                    { id: '6', title: 'Trial Closes: Checking for Pulse', duration: '30 min' },
                    { id: '7', title: 'Demo Production Value', duration: '25 min' },
                    { id: '8', title: 'The Demo Dojo: AI Roleplay', duration: '60 min' },
                    { id: '9', title: 'Scripting & Standardization', duration: '45 min' }
                ]
            },
            {
                id: 'objection-handling',
                title: 'Course 17: Objection Handling Database',
                number: 17,
                description: 'Prepare for and neutralize the most common sales objections.',
                duration: '8-10 hours',
                lessons: [
                    { id: '1', title: 'Why Objections Are Opportunities, Not Rejections', duration: '45 min' },
                    { id: '2', title: 'The 6 Universal Objection Categories', duration: '50 min' },
                    { id: '3', title: 'The LARA Framework - Your Objection Handling System', duration: '55 min' },
                    { id: '4', title: 'Handling Price Objections Without Discounting', duration: '50 min' },
                    { id: '5', title: 'Handling Timing Objections: The Urgency Matrix', duration: '50 min' },
                    { id: '6', title: 'Handling Authority & Need Objections', duration: '50 min' },
                    { id: '7', title: 'Handling Trust & Competition Objections', duration: '50 min' },
                    { id: '8', title: 'DISC-Adapted Objection Responses', duration: '45 min' },
                    { id: '9', title: 'AI Roleplay: Objection Drilling', duration: '60 min' },
                    { id: '10', title: 'Building Your Objection Database', duration: '55 min' }
                ]
            },
            {
                id: 'proposals-pricing',
                title: 'Course 18: Proposals, Pricing & Negotiation',
                number: 18,
                description: 'Close deals with favorable terms and structured proposals.',
                duration: '8-10 hours',
                lessons: []
            },
            {
                id: 'closing-closing',
                title: 'Course 19: Closing & Next Steps',
                number: 19,
                description: 'Finalize agreements and transition to implementation.',
                duration: '6-8 hours',
                lessons: []
            },
            {
                id: 'pipeline-management',
                title: 'Course 20: Sales Pipeline Management',
                number: 20,
                description: 'Maintain hygiene and momentum in your sales cycle.',
                duration: '6-8 hours',
                lessons: []
            }
        ]
    },
    {
        id: 'customer-success',
        title: 'TRACK 4: CUSTOMER SUCCESS',
        description: 'Ensure your customers achieve their desired outcomes and become advocates.',
        magnetComponent: 'T',
        courses: [
            { id: 'onboarding', title: 'Course 21: Customer Onboarding', number: 21, description: 'First 90 days success plan.', duration: '5-6 hours', lessons: [] },
            { id: 'retention', title: 'Course 22: Retention & Churn Prevention', number: 22, description: 'Keep customers for life.', duration: '5-6 hours', lessons: [] },
            { id: 'expansion', title: 'Course 23: Expansion & Upsell', number: 23, description: 'Grow account value over time.', duration: '4-5 hours', lessons: [] },
            { id: 'advocacy', title: 'Course 24: Customer Advocacy', number: 24, description: 'Turn users into fans.', duration: '4-5 hours', lessons: [] }
        ]
    },
    {
        id: 'operations-systems',
        title: 'TRACK 5: OPERATIONS & SYSTEMS',
        description: 'Optimize your sales and marketing stack for scale and efficiency.',
        magnetComponent: 'T',
        courses: [
            { id: 'crm-setup', title: 'Course 25: Advanced CRM Setup', number: 25, description: 'Automate your sales ops.', duration: '6-8 hours', lessons: [] },
            { id: 'analytics', title: 'Course 26: Sales Analytics & BI', number: 26, description: 'Data-driven sales management.', duration: '6-8 hours', lessons: [] },
            { id: 'automation', title: 'Course 27: Sales Automation', number: 27, description: 'Scale without adding headcount.', duration: '6-8 hours', lessons: [] },
            { id: 'outsourcing', title: 'Course 28: Outsourcing & VAs', number: 28, description: 'When and how to offload tasks.', duration: '5-6 hours', lessons: [] },
            { id: 'playbook', title: 'Course 29: The Sales Playbook', number: 29, description: 'Documenting your growth engine.', duration: '8-10 hours', lessons: [] },
            { id: 'scale', title: 'Course 30: Scaling to First Sales Hire', number: 30, description: 'Replacing yourself in the process.', duration: '8-10 hours', lessons: [] },
            { id: 'legal', title: 'Course 31: Sales Legal & Contracts', number: 31, description: 'MSAs, SOWs, and redlines.', duration: '4-5 hours', lessons: [] },
            { id: 'finance', title: 'Course 32: Sales Finance & Tax', number: 32, description: 'Managing the money side of sales.', duration: '4-5 hours', lessons: [] },
            { id: 'capstone', title: 'Course 33: Multi-Million Dollar Capstone', number: 33, description: 'Final project and certification.', duration: '15-20 hours', lessons: [] }
        ]
    }
];

module.exports = curriculumData;
