import { Track } from "@/types/course";

export const CURRICULUM: Track[] = [
  {
    id: "foundations",
    title: "1. Foundations",
    description:
      "Build the strategic foundation for your sales efforts by mastering psychology, positioning, and target market selection.",
    magnetComponent: "M",
    courses: [
      {
        id: "sales-psychology",
        title: "Course 0: Solo Founder Sales Psychology",
        number: 0,
        description:
          "Master the mindset before the tactics. Overcome sales resistance, impostor syndrome, and fear of rejection.",
        duration: "6-7 hours",
        outcomes: [
          "Identify your specific avoidance patterns (Procrastibuilding vs. Content Treadmill)",
          'Reframe sales from "extraction" to "diagnosis" to align with your values',
          "Neutralize the negativity bias that makes rejection feel like physical danger",
          "Stop underpricing your work out of fear",
          'Distinguish between genuine "no fit" and fear-driven "no"',
          "Establish a sustainable sales rhythm that fits your personality",
        ],
        lessons: [
          {
            id: "1",
            title: "Why Your Brain Sabotages Sales",
            duration: "8 min",
          },
          {
            id: "2",
            title: "The Math Your Brain Gets Wrong About Rejection",
            duration: "10 min",
          },
          {
            id: "3",
            title: "Your Specific Avoidance Pattern",
            duration: "10 min",
          },
          { id: "4", title: "The Price of Underpricing", duration: "8 min" },
          {
            id: "5",
            title: "The Reframe That Actually Works",
            duration: "12 min",
          },
          {
            id: "6",
            title: "Specialized Reframes (Scientist vs. Invitation)",
            duration: "10 min",
          },
          {
            id: "7",
            title: "Direct Questions and Early Disqualification",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Building Your Sustainable Sales Rhythm",
            duration: "8 min",
          },
        ],
      },
      {
        id: "icp-builder",
        title: "Course 1: ICP Builder Workshop",
        number: 1,
        description:
          "Define your Ideal Customer Profile with precision to stop wasting time on the wrong prospects.",
        duration: "10-12 hours",
        outcomes: [
          "Define your Ideal Customer Profile with 12+ specific attributes",
          "Distinguish between firmographic, behavioral, and psychographic criteria",
          'Identify your "Golden Segment" beachhead market',
          "Create ICP v1 and refine it through feedback",
        ],
        lessons: [
          {
            id: "1",
            title: "Why Most Founders Target Wrong",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Defining Your Perfect Customer",
            duration: "10 min",
          },
          { id: "3", title: "Finding Your Golden Segment", duration: "15 min" },
          {
            id: "4",
            title: "Buyer Personas & The Creator Follower",
            duration: "10 min",
          },
          { id: "5", title: "Psychographic Targeting", duration: "12 min" },
          {
            id: "6",
            title: "Behavioral Signals & Triggers",
            duration: "10 min",
          },
          { id: "7", title: "The ICP Document Creation", duration: "15 min" },
          { id: "8", title: "Validating Your ICP", duration: "12 min" },
          {
            id: "9",
            title: "Negative ICP: Who NOT to Sell To",
            duration: "8 min",
          },
          {
            id: "10",
            title: "ICP for Different Sales Motions",
            duration: "10 min",
          },
          { id: "11", title: "ICP Evolution: v1 to v3", duration: "10 min" },
          { id: "12", title: "Your Complete ICP System", duration: "15 min" },
          {
            id: "13",
            title: "The Creator Audience Persona: From Follower to Buyer",
            duration: "12 min",
          },
        ],
      },
      {
        id: "positioning-value",
        title: "Course 2: Positioning & Value Proposition",
        number: 2,
        description:
          "Differentiate your offer and articulate value that resonates with your ICP.",
        duration: "8-10 hours",
        outcomes: [
          "Apply April Dunford's positioning framework",
          "Translate features into business outcomes",
          "Create a compelling narrative for your product",
          "Use StoryBrand framework for customer-centric messaging",
          "Quantify value in terms of time, money, and risk",
        ],
        lessons: [
          {
            id: "1",
            title:
              "What Positioning Actually Means (And Why Features Don't Sell)",
            duration: "8 min",
          },
          {
            id: "2",
            title: "April Dunford's Positioning Framework",
            duration: "12 min",
          },
          {
            id: "3",
            title: "StoryBrand Messaging Framework",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Feature → Benefit → Outcome Translation",
            duration: "10 min",
          },
          { id: "5", title: "Value Quantification", duration: "12 min" },
          {
            id: "6",
            title: "Competitive Positioning (Without Competitor Bashing)",
            duration: "10 min",
          },
          { id: "7", title: "Minimum Viable Brand", duration: "10 min" },
          { id: "8", title: "Brand Voice and Tone", duration: "8 min" },
          { id: "9", title: "Your Positioning Statement", duration: "12 min" },
          { id: "10", title: "Elevator Pitch Workshop", duration: "10 min" },
        ],
      },
      {
        id: "choose-path",
        title: "Course 3: Choose Your Acquisition Path",
        number: 3,
        description:
          "Identify if you are built for Inbound, Outbound, or Community-led growth.",
        duration: "6-8 hours",
        outcomes: [
          "Evaluate acquisition channels against your strengths",
          "Select your primary and secondary growth engines",
          "Build your initial acquisition roadmap",
        ],
        lessons: [
          { id: "1", title: "The Four Founder Contexts", duration: "8 min" },
          { id: "2", title: "B2B SaaS Acquisition Path", duration: "10 min" },
          {
            id: "3",
            title: "Creator/Coach Acquisition Path",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Service Business Acquisition Path",
            duration: "10 min",
          },
          { id: "5", title: "The Zero-to-Ten Sprint", duration: "12 min" },
          {
            id: "6",
            title: "Your Personal Academy Roadmap",
            duration: "10 min",
          },
        ],
      },
      {
        id: "list-building",
        title: "Course 4: List Building & Prospecting Infrastructure",
        number: 4,
        description:
          "Build the technical systems to find and verify your ideal prospects.",
        duration: "9-10 hours",
        outcomes: [
          "Identify top-tier prospecting tools (Apollo, SalesNav, etc.)",
          "Build automated verification workflows",
          "Create high-quality target lists",
        ],
        lessons: [
          { id: "1", title: "List Building Philosophy", duration: "8 min" },
          {
            id: "2",
            title: "LinkedIn Sales Navigator Mastery",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Apollo and Data Enrichment Tools",
            duration: "10 min",
          },
          { id: "4", title: "Free Research Methods", duration: "10 min" },
          { id: "5", title: "Email Infrastructure Setup", duration: "12 min" },
          { id: "6", title: "Domain Warming Strategy", duration: "10 min" },
          { id: "7", title: "CRM Selection and Setup", duration: "12 min" },
          {
            id: "8",
            title: "List Hygiene and Maintenance",
            duration: "8 min",
          },
          {
            id: "9",
            title: "Compliance: CAN-SPAM and GDPR",
            duration: "10 min",
          },
          { id: "10", title: "Your Prospecting System", duration: "12 min" },
          {
            id: "11",
            title: "Building the Creator Email List",
            duration: "10 min",
          },
        ],
      },
    ],
  },
  {
    id: "marketing-engine",
    title: "2. Marketing Engine",
    description:
      "Build systematic marketing systems that generate a steady stream of qualified leads.",
    magnetComponent: "S",
    courses: [
      {
        id: "technical-content",
        title: "Course 5: Technical Content Engine",
        number: 5,
        description:
          "Create content that earns the trust of technical buyers and decision-makers.",
        duration: "10-12 hours",
        outcomes: ["Build trust through technical authority"],
        lessons: [
          {
            id: "1",
            title: "Content Strategy vs. Content Creation",
            duration: "8 min",
          },
          { id: "2", title: "Content Pillar Architecture", duration: "12 min" },
          { id: "3", title: "The 80/20 Content Mix", duration: "10 min" },
          { id: "4", title: "Documentation-as-Content", duration: "10 min" },
          { id: "5", title: "One-to-Many Repurposing", duration: "12 min" },
          { id: "6", title: "Building in Public", duration: "12 min" },
          { id: "7", title: "Content Calendar System", duration: "10 min" },
          { id: "8", title: "Sales Linter for Content", duration: "12 min" },
          {
            id: "9",
            title: "Content Distribution Checklist",
            duration: "10 min",
          },
          {
            id: "10",
            title: "Lead Magnets and Gated Content",
            duration: "10 min",
          },
          {
            id: "11",
            title: "Content Performance Metrics",
            duration: "10 min",
          },
          { id: "12", title: "Your Content Playbook", duration: "12 min" },
          { id: "13", title: "The Creator Funnel", duration: "12 min" },
        ],
      },
      {
        id: "seo-aeo",
        title: "Course 6: SEO & Answer Engine Optimization",
        number: 6,
        description:
          "Rank where your customers search, including AI-driven answer engines.",
        duration: "8-10 hours",
        outcomes: [
          "Understand the 2025 search landscape including zero-click searches and AI Overviews",
          "Implement SEO fundamentals including keyword research and on-page optimization",
          "Structure content for AI citation using inverted pyramid format",
          "Implement schema markup (JSON-LD) for better AI understanding",
          "Establish E-E-A-T signals to build entity authority",
          "Optimize for Google AI Overviews and answer engines like Perplexity/ChatGPT",
        ],
        lessons: [
          { id: "1", title: "The Zero-Click Reality", duration: "8 min" },
          {
            id: "2",
            title: "SEO Fundamentals for Founders",
            duration: "12 min",
          },
          {
            id: "3",
            title: "The Inverted Pyramid Structure",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Schema Markup Implementation",
            duration: "12 min",
          },
          {
            id: "5",
            title: "Entity Authority and E-E-A-T",
            duration: "12 min",
          },
          { id: "6", title: "Optimizing for AI Overviews", duration: "10 min" },
          {
            id: "7",
            title: "Getting Cited by ChatGPT/Perplexity",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Local SEO for Service Businesses",
            duration: "10 min",
          },
          { id: "9", title: "Technical SEO Checklist", duration: "12 min" },
          {
            id: "10",
            title: "Link Building for Solo Founders",
            duration: "10 min",
          },
          { id: "11", title: "Tracking AI Citations", duration: "10 min" },
          { id: "12", title: "Your SEO/AEO Playbook", duration: "12 min" },
        ],
      },
      {
        id: "linkedin-engine",
        title: "Course 7: LinkedIn Growth Engine",
        number: 7,
        description:
          "Turn LinkedIn into a professional networking and lead generation powerhouse.",
        duration: "8-10 hours",
        outcomes: [
          "Position LinkedIn as your primary acquisition channel using the Trust Pincer strategy",
          "Optimize your profile for lead generation and conversion",
          "Master the PAIPS content formula for consistent authority building",
          "Implement a sustainable 4-hour weekly LinkedIn system",
          "Use Sales Navigator Core for precise prospect targeting",
          "Execute warmup workflows to convert connections into conversations",
        ],
        lessons: [
          {
            id: "1",
            title: "LinkedIn as Lead Generation Channel",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Personal Brand vs. Company Page",
            duration: "10 min",
          },
          { id: "3", title: "Profile Optimization", duration: "10 min" },
          { id: "4", title: "The PAIPS Content Formula", duration: "12 min" },
          { id: "5", title: "Content Formats That Work", duration: "12 min" },
          { id: "6", title: "The 4-Hour Weekly System", duration: "10 min" },
          { id: "7", title: "Engagement Strategy", duration: "10 min" },
          {
            id: "8",
            title: "LinkedIn Sales Navigator for Prospecting",
            duration: "12 min",
          },
          { id: "9", title: "Analytics and Optimization", duration: "10 min" },
          {
            id: "10",
            title: "From Connection to Conversation",
            duration: "12 min",
          },
        ],
      },
      {
        id: "cold-email-mastery",
        title: "Course 8: Cold Email Mastery",
        number: 8,
        description:
          "Write emails that get replies by focusing on problems, not features.",
        duration: "10-12 hours",
        outcomes: [
          "Master multi-touch sequence architecture",
          "Implement personalization at scale",
          "Ensure 99% email deliverability",
        ],
        lessons: [
          { id: "1", title: "Why 99% of Cold Emails Fail", duration: "8 min" },
          { id: "2", title: "The PAS Framework", duration: "12 min" },
          { id: "3", title: "The AIDA Framework", duration: "10 min" },
          {
            id: "4",
            title: "Subject Lines That Get Opened",
            duration: "10 min",
          },
          { id: "5", title: "The First Line Hook", duration: "12 min" },
          {
            id: "6",
            title: "The Body - Value Without Pitching",
            duration: "12 min",
          },
          { id: "7", title: "The CTA - Getting Responses", duration: "10 min" },
          { id: "8", title: "Multi-Touch Sequences", duration: "12 min" },
          { id: "9", title: "Personalization at Scale", duration: "10 min" },
          { id: "10", title: "Sales Linter for Email", duration: "12 min" },
          { id: "11", title: "Deliverability Management", duration: "10 min" },
          { id: "12", title: "Your Cold Email Playbook", duration: "12 min" },
        ],
      },
      {
        id: "community-lead-gen",
        title: "Course 9: Community-Based Lead Generation",
        number: 9,
        description:
          "Leverage Reddit, Hacker News, Product Hunt, and niche forums to find prospects through value-first participation.",
        duration: "8-9 hours",
        outcomes: [
          "Apply the 80/20 community rule (80% contribution, 20% promotion)",
          "Map communities where your ICP gathers using research tools like GummySearch and F5Bot",
          "Execute Reddit strategy without getting banned using the Trojan Horse reply",
          'Plan and execute a "Show HN" post and a Product Hunt launch (with 400+ audience)',
          "Participate in Slack and Discord communities strategically",
          "Convert community engagement into pipeline systematically",
        ],
        lessons: [
          { id: "1", title: "Why Communities Beat Ads", duration: "8 min" },
          { id: "2", title: "The 80/20 Community Rule", duration: "10 min" },
          { id: "3", title: "Community Mapping", duration: "12 min" },
          { id: "4", title: "Reddit Strategy for B2B", duration: "12 min" },
          { id: "5", title: "Hacker News Playbook", duration: "10 min" },
          { id: "6", title: "Product Hunt Launch", duration: "12 min" },
          {
            id: "7",
            title: "Slack and Discord Communities",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Twitter/X Building in Public",
            duration: "12 min",
          },
          { id: "9", title: "Forum Monitoring", duration: "10 min" },
          {
            id: "10",
            title: "Community-to-Pipeline Conversion",
            duration: "10 min",
          },
          {
            id: "11",
            title: "Monetizing Owning the Community",
            duration: "12 min",
          },
        ],
      },
      {
        id: "email-nurture",
        title: "Course 10: Email Nurture & Newsletter",
        number: 10,
        description:
          "Build email systems that convert subscribers to customers through systematic nurture sequences and newsletters.",
        duration: "8-9 hours",
        outcomes: [
          "Design effective lead magnets and email capture strategies",
          "Build welcome sequences that indoctrinate new subscribers",
          "Architect nurture sequences that progress from education to conversion",
          "Develop sustainable newsletter strategy with consistent cadence",
          "Implement behavior-based segmentation for targeted messaging",
          "Create launch sequences that generate urgency and action",
        ],
        lessons: [
          { id: "1", title: "Email as Owned Audience", duration: "8 min" },
          { id: "2", title: "Email Capture Strategy", duration: "10 min" },
          { id: "3", title: "Welcome Sequence Design", duration: "12 min" },
          {
            id: "4",
            title: "Nurture Sequence Architecture",
            duration: "12 min",
          },
          { id: "5", title: "Newsletter Strategy", duration: "10 min" },
          { id: "6", title: "Email Segmentation", duration: "10 min" },
          {
            id: "7",
            title: "Launch and Promotion Sequences",
            duration: "12 min",
          },
          { id: "8", title: "Email Automation Tools", duration: "10 min" },
          { id: "9", title: "Email Analytics That Matter", duration: "10 min" },
          { id: "10", title: "Your Email Playbook", duration: "10 min" },
        ],
      },
      {
        id: "course-11-social-proof-referral",
        title: "Course 11: Social Proof & Referral Systems",
        number: 11,
        description:
          "Systematize the collection and deployment of testimonials and referrals.",
        duration: "7-8 hours",
        outcomes: [
          "Explain the psychology behind why social proof drives purchasing decisions",
          "Build a systematic testimonial collection process that generates proof consistently",
          "Create compelling case studies using the Challenge-Solution-Results framework",
          "Develop borrowed credibility strategies for early-stage companies",
          "Design and implement a referral program with double-sided incentives",
          "Build strategic partnerships that multiply distribution without ad spend",
          "Organize and maintain a Social Proof Library for ongoing use",
        ],
        lessons: [
          {
            id: "1",
            title: "Why Social Proof Drives Decisions",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Testimonial Collection System",
            duration: "12 min",
          },
          { id: "3", title: "Case Study Framework", duration: "12 min" },
          { id: "4", title: "Video Testimonials", duration: "10 min" },
          { id: "5", title: "Borrowed Credibility", duration: "10 min" },
          {
            id: "6",
            title: "Deploying Proof Strategically",
            duration: "10 min",
          },
          { id: "7", title: "Referral Program Design", duration: "12 min" },
          {
            id: "8",
            title: "When and How to Ask for Referrals",
            duration: "10 min",
          },
          { id: "9", title: "Partnership Development", duration: "12 min" },
          { id: "10", title: "Your Social Proof Library", duration: "10 min" },
        ],
      },
      {
        id: "course-12-marketing-automation-analytics",
        title: "Course 12: Marketing Automation & Analytics",
        number: 12,
        description: "Connect your tools and measure what actually works.",
        duration: "8-9 hours",
        outcomes: [
          "Map the complete marketing-to-sales pipeline and identify handoff points",
          "Design lead capture systems that convert visitors to contacts",
          "Build lead scoring models using demographic, behavioral, and engagement signals",
          "Create marketing automation workflows with triggers and conditional logic",
          "Assemble a minimum viable marketing stack on a bootstrap budget ($0-$150/month)",
          "Define Marketing Qualified Lead (MQL) criteria for their specific business",
          "Establish a marketing-to-sales handoff process that preserves context",
          "Build a marketing metrics dashboard tracking outcomes, not vanity metrics",
          "Implement a sustainable marketing operations rhythm",
        ],
        lessons: [
          {
            id: "1",
            title: "The Marketing-to-Sales Pipeline",
            duration: "8 min",
          },
          { id: "2", title: "Lead Capture Systems", duration: "10 min" },
          { id: "3", title: "Lead Scoring Model", duration: "12 min" },
          { id: "4", title: "Marketing Automation Basics", duration: "10 min" },
          {
            id: "5",
            title: "Minimum Viable Marketing Stack",
            duration: "12 min",
          },
          { id: "6", title: "Landing Page Fundamentals", duration: "10 min" },
          {
            id: "7",
            title: "Marketing Qualified Lead (MQL) Definition",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Marketing-to-Sales Handoff Process",
            duration: "10 min",
          },
          { id: "9", title: "Marketing Metrics Dashboard", duration: "10 min" },
          {
            id: "10",
            title: "Marketing Operations Rhythm",
            duration: "10 min",
          },
        ],
      },
    ],
  },
  {
    id: "sales-methodology",
    title: "3. Sales Methodology",
    description: "Master the art and science of the B2B sales conversation.",
    magnetComponent: "S",
    courses: [
      {
        id: "disc-personas",
        title: "Course 13: Understanding DISC Buyer Personas",
        number: 13,
        description:
          "Adapt your communication style to match your buyer's personality.",
        duration: "9-10 hours",
        outcomes: [
          "Identify DISC types (D, I, S, C) rapidly",
          "Adapt pitch and pace to personality",
          "Handle type-specific objections",
        ],
        lessons: [
          {
            id: "1",
            title: "DISC Foundations: The 4 Selling Styles",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Selling to the High D: The Alpha",
            duration: "10 min",
          },
          {
            id: "3",
            title: "Selling to the High I: The Visionary",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Selling to the High S: The Steady",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Selling to the High C: The Skeptic",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Rapid DISC Identification: The 120-Second Diagnostic",
            duration: "12 min",
          },
          { id: "7", title: "DISC in Sales Conversations", duration: "15 min" },
          {
            id: "8",
            title: "Common Mistakes by DISC Type",
            duration: "8 min",
          },
          { id: "9", title: "Multi-Stakeholder DISC", duration: "10 min" },
          {
            id: "10",
            title: "Practice: DISC Roleplay Sessions",
            duration: "15 min",
          },
          {
            id: "11",
            title: "Implementation: The Solo Founder DISC Training Protocol",
            duration: "12 min",
          },
          {
            id: "12",
            title:
              "Course 13 Capstone: The Grand Unified Theory of Your Sales Process",
            duration: "15 min",
          },
        ],
      },
      {
        id: "discovery-framework",
        title: "Course 14: Discovery Framework - BANT/MEDDIC",
        number: 14,
        description:
          "Structured frameworks to uncover pain and qualify opportunities.",
        duration: "12-13 hours",
        outcomes: [
          "Execute high-level qualification calls",
          "Uncover root-cause business pain",
          "Systematize the BANT and MEDDIC frameworks",
        ],
        lessons: [
          {
            id: "1",
            title: "Why Discovery Is Where Deals Are Won",
            duration: "8 min",
          },
          { id: "2", title: "The BANT Framework", duration: "10 min" },
          { id: "3", title: "The MEDDIC Framework", duration: "12 min" },
          {
            id: "4",
            title: "Budget: Qualifying Financial Fit",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Authority: Mapping Decision-Makers",
            duration: "12 min",
          },
          { id: "6", title: "Need: Uncovering Real Pain", duration: "12 min" },
          {
            id: "7",
            title: "Timeline: Understanding Urgency",
            duration: "10 min",
          },
          { id: "8", title: "Metrics: Business Impact", duration: "10 min" },
          { id: "9", title: "Decision Criteria & Process", duration: "12 min" },
          { id: "10", title: "Identify Pain vs. Champion", duration: "12 min" },
          {
            id: "11",
            title: "Discovery Call Structure & Scaling",
            duration: "12 min",
          },
          {
            id: "12",
            title: "AI Roleplay: Discovery Practice",
            duration: "15 min",
          },
        ],
      },
      {
        id: "course-15-discovery-simulations",
        title: "Course 15: Discovery Call Simulations",
        number: 15,
        description:
          "Intensive AI-based practice sessions for discovery calls.",
        duration: "9-10 hours",
        outcomes: [
          "Configure AI roleplay sessions with specific DISC personalities and resistance levels",
          "Execute BANT-style discovery with cooperative prospects under time pressure",
          "Execute comprehensive qualification conversations with guarded prospects",
          "Adapt discovery techniques for different stakeholder types (technical vs. business)",
          "Maintain composure and methodology during resistant/hostile scenarios",
          "Analyze session recordings to identify improvement patterns",
          "Demonstrate discovery competency through certification assessment",
        ],
        lessons: [
          {
            id: "1",
            title: "Setting Up for Effective Practice",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Qualification with Cooperative Prospects (BANT-Style)",
            duration: "15 min",
          },
          {
            id: "3",
            title: "Comprehensive Discovery with Cooperative Prospects",
            duration: "15 min",
          },
          { id: "4", title: "Handling Guarded Prospects", duration: "15 min" },
          {
            id: "5",
            title: "Handling Resistant Prospects",
            duration: "15 min",
          },
          {
            id: "6",
            title: "Industry-Specific Discovery Practice",
            duration: "15 min",
          },
          {
            id: "7",
            title: "Multi-Stakeholder Discovery Scenarios",
            duration: "12 min",
          },
          { id: "8", title: "Speed Discovery Practice", duration: "10 min" },
          {
            id: "9",
            title: "Session Review and Pattern Analysis",
            duration: "12 min",
          },
          {
            id: "10",
            title: "Discovery Certification Challenge",
            duration: "15 min",
          },
        ],
      },
      {
        id: "demo-architecture",
        title: "Course 16: Demo Architecture",
        number: 16,
        description:
          "Conduct value-first demos that map features to customer pain.",
        duration: "8-10 hours",
        outcomes: ["Execute technical demos that close"],
        lessons: [
          {
            id: "1",
            title: "The Validation Map: Feature Dumping vs. Value Mapping",
            duration: "10 min",
          },
          {
            id: "2",
            title: "The Tell-Show-Tell Framework",
            duration: "12 min",
          },
          { id: "3", title: "Reverse Engineering the WOW", duration: "10 min" },
          {
            id: "4",
            title: "The Altitude Strategy: Tailoring to Roles",
            duration: "12 min",
          },
          { id: "5", title: "Handling In-Demo Objections", duration: "10 min" },
          {
            id: "6",
            title: "Trial Closes: Checking for Pulse",
            duration: "10 min",
          },
          {
            id: "7",
            title:
              "Demo Production Value: The Technical Hygiene of a Solo Founder",
            duration: "12 min",
          },
          {
            id: "8",
            title: "The Demo Dojo: Using AI Roleplay for High-Stakes Mastery",
            duration: "15 min",
          },
          { id: "9", title: "Scripting & Standardization", duration: "12 min" },
        ],
      },
      {
        id: "objection-handling",
        title: "Course 17: Objection Handling Database",
        number: 17,
        description:
          "Prepare for and neutralize the most common sales objections.",
        duration: "8-10 hours",
        outcomes: [
          "Reframe objections as opportunities rather than rejections",
          "Categorize any objection into one of six universal types",
          "Apply the LARA framework (Listen, Acknowledge, Respond, Ask) consistently",
          "Handle price objections without unnecessary discounting",
          "Address timing, authority, need, trust, and competition objections effectively",
          "Adapt objection responses to DISC personality types",
          "Build and maintain a searchable Objection Handling Database",
          "Practice objection responses until they become reflexive",
        ],
        lessons: [
          {
            id: "1",
            title: "Why Objections Are Opportunities, Not Rejections",
            duration: "8 min",
          },
          {
            id: "2",
            title: "The 6 Universal Objection Categories",
            duration: "10 min",
          },
          {
            id: "3",
            title: "The LARA Framework - Your Objection Handling System",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Handling Price Objections Without Discounting",
            duration: "12 min",
          },
          {
            id: "5",
            title: "Handling Timing Objections: The Urgency Matrix",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Handling Authority & Need Objections",
            duration: "12 min",
          },
          {
            id: "7",
            title: "Handling Trust & Competition Objections",
            duration: "12 min",
          },
          {
            id: "8",
            title: "DISC-Adapted Objection Responses",
            duration: "12 min",
          },
          {
            id: "9",
            title: "AI Roleplay: Objection Drilling",
            duration: "12 min",
          },
          {
            id: "10",
            title: "Building Your Objection Database",
            duration: "10 min",
          },
        ],
      },
      {
        id: "proposals-pricing",
        title: "Course 18: Proposals, Pricing & Negotiation",
        number: 18,
        description:
          "Close deals with favorable terms and structured proposals.",
        duration: "8-10 hours",
        outcomes: [
          "Structure winning proposals and terms",
          "Apply pricing psychology to presentation",
          "Calculate and present value-based pricing",
          "Prepare for negotiations using BATNA",
          "Handle discount requests",
        ],
        lessons: [
          { id: "1", title: "The Purpose of a Proposal", duration: "8 min" },
          {
            id: "2",
            title: "Proposal Structure That Sells",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Pricing Psychology Fundamentals",
            duration: "10 min",
          },
          { id: "4", title: "Value-Based Pricing", duration: "12 min" },
          {
            id: "5",
            title: "Price Presentation Techniques",
            duration: "10 min",
          },
          { id: "6", title: "Negotiation Fundamentals", duration: "12 min" },
          { id: "7", title: "Handling Discount Requests", duration: "10 min" },
          { id: "8", title: "Contracts and Terms Basics", duration: "10 min" },
          { id: "9", title: "Proposal Tools and Delivery", duration: "10 min" },
          { id: "10", title: "Your Proposal Playbook", duration: "10 min" },
        ],
      },
      {
        id: "closing-closing",
        title: "Course 19: Closing & Next Steps",
        number: 19,
        description: "Finalize agreements and transition to implementation.",
        duration: "6-8 hours",
        outcomes: [
          "Master the psychology of momentum and decision fatigue",
          'Implement the "Verbal Yes" protocol for immediate next steps',
          'Navigate the Legal and Security "Shadow Committee"',
          'Minimize the time between "Yes" and "Signed"',
          "Cure buyer's remorse through proactive post-close communication",
        ],
        lessons: [
          {
            id: "1",
            title: "The Psychology of the Close: Momentum vs. Friction",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Closing Frameworks: Direct, Assumptive, and Alternative",
            duration: "10 min",
          },
          {
            id: "3",
            title: 'The "Verbal Yes" Protocol: Nailing the Next Steps',
            duration: "12 min",
          },
          {
            id: "4",
            title: 'Managing the "Shadow Committee": Legal & Security',
            duration: "12 min",
          },
          {
            id: "5",
            title: "The Digital Handshake: Signature Workflow Automation",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Curing Buyer’s Remorse: The 24-Hour Reconfirmation",
            duration: "10 min",
          },
          {
            id: "7",
            title: 'Handling "Last Second" Hurdles: The Final Objection',
            duration: "12 min",
          },
          {
            id: "8",
            title: "The Post-Close Handoff: Implementation Success",
            duration: "10 min",
          },
          {
            id: "9",
            title: "Closing Analytics: Measuring Win Rate and Drag",
            duration: "10 min",
          },
          {
            id: "10",
            title: "Your Closing Playbook: The System for the Signature",
            duration: "12 min",
          },
        ],
      },
      {
        id: "pipeline-management",
        title: "Course 20: Sales Pipeline Management",
        number: 20,
        description: "Maintain hygiene and momentum in your sales cycle.",
        duration: "6-8 hours",
        outcomes: [
          "Implement the physics of sales velocity to predict revenue",
          'Master pipeline hygiene and identify "ghost" deals',
          "Execute the Stalled Deal Diagnostic (CPR for deals)",
          "Apply weighted forecasting to neutralize founder optimism",
          "Establish a weekly pipeline pulse for consistent momentum",
        ],
        lessons: [
          {
            id: "1",
            title: "Pipeline Physics: The Math of Sales Velocity",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Pipeline Hygiene: Identifying Ghost Deals",
            duration: "10 min",
          },
          {
            id: "3",
            title: "The Stalled Deal Diagnostic: CPR for Your Pipeline",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Weighted Forecasting: Managing Founder Optimism",
            duration: "12 min",
          },
          {
            id: "5",
            title: "Multi-Threaded Management: Tracking Complex Orgs",
            duration: "10 min",
          },
          {
            id: "6",
            title: "The Weekly Pipeline Pulse: Review Rituals",
            duration: "10 min",
          },
          {
            id: "7",
            title: "AI-Driven Pipeline Insights: Predicting the Win",
            duration: "12 min",
          },
          {
            id: "8",
            title: "Scaling the Pipeline: From 1 to 100 Deals",
            duration: "10 min",
          },
          {
            id: "9",
            title: "Pipeline Visualizations: Beyond the Kanban",
            duration: "10 min",
          },
          {
            id: "10",
            title: "The Pipeline Mastery Checklist",
            duration: "12 min",
          },
        ],
      },
    ],
  },
  {
    id: "ai-acquisition",
    title: "4. AI-Powered Acquisition",
    description:
      "Leverage AI tools and automation to build scalable acquisition systems while keeping the human touch where it matters.",
    magnetComponent: "S",
    courses: [
      {
        id: "ai-acquisition-strategy",
        title: "Course 21: AI Acquisition Strategy",
        number: 21,
        description:
          "Design an AI-powered acquisition system that automates the predictable and keeps the human touch on relationships.",
        duration: "8-10 hours",
        outcomes: [
          "Map the AI acquisition stack: discovery → enrichment → scoring → personalization → send",
          "Build a solo-founder lead scoring model (1-10) using fit + signal + friction",
          "Define your automate vs human boundary using the Automation Failure Matrix",
          "Design a 5-7 hour/week AI-assisted acquisition rhythm",
          "Compare junior SDR cost (~$4-6K/month) vs AI stack cost (~$100-200/month)",
        ],
        lessons: [
          {
            id: "1",
            title: "The 2026 AI Acquisition Landscape",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Prospecting & List Building with AI + Data Tools",
            duration: "12 min",
          },
          {
            id: "3",
            title: "AI Personalization at Scale (Draft + Human Gate)",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Lead Scoring & Intent Signal Detection",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Conversational AI & Website Concierges",
            duration: "10 min",
          },
          {
            id: "6",
            title:
              "The Automation Failure Matrix: What to Automate vs Keep Human",
            duration: "12 min",
          },
          {
            id: "7",
            title: "Time Allocation: The 60/40 Human/Automation Split",
            duration: "8 min",
          },
          { id: "8", title: "B2B vs Creator AI Workflows", duration: "10 min" },
          {
            id: "9",
            title: "Economics: AI Stack vs Hiring an SDR",
            duration: "10 min",
          },
          {
            id: "10",
            title: "Your AI Acquisition System Blueprint",
            duration: "12 min",
          },
        ],
      },
      {
        id: "email-deliverability",
        title: "Course 22: Email Deliverability & Infrastructure",
        number: 22,
        description:
          "Set up bulletproof cold email infrastructure that lands in the inbox, not spam.",
        duration: "8-10 hours",
        outcomes: [
          "Configure SPF, DKIM, and DMARC correctly across 3-5 sending domains",
          "Execute a 4-week warmup protocol from 5/day to 30-50/day per inbox",
          "Stay under Google/Yahoo/Microsoft bulk sender thresholds (<0.1% complaints)",
          "Diagnose and recover from spam placement incidents",
          "Build a gold-standard infra template for 200-400 sends/day",
        ],
        lessons: [
          {
            id: "1",
            title: "What Changed: 2025-2026 Bulk Sender Rules",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Gmail & Yahoo Requirements (SPF/DKIM/DMARC)",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Microsoft Outlook: Why It's Harsher",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Domain Strategy: Main + 3-5 Sending Domains",
            duration: "12 min",
          },
          {
            id: "5",
            title: "DNS Setup Checklist (Step by Step)",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Warmup Timelines & Safe Volume Ramps",
            duration: "10 min",
          },
          {
            id: "7",
            title: "Inbox Rotation & Sending Limits (<500/day)",
            duration: "12 min",
          },
          {
            id: "8",
            title: "Content Patterns That Trigger Filters in 2026",
            duration: "10 min",
          },
          {
            id: "9",
            title: "Monitoring & Troubleshooting (GlockApps, MailReach)",
            duration: "10 min",
          },
          {
            id: "10",
            title: "Incident Playbook: When a Domain Hits Spam",
            duration: "10 min",
          },
          {
            id: "11",
            title: "B2B vs Creator Infra Templates",
            duration: "10 min",
          },
          {
            id: "12",
            title: "Your Deliverability Checklist",
            duration: "8 min",
          },
        ],
      },
      {
        id: "ai-lead-research",
        title: "Course 23: AI Lead Research & Enrichment",
        number: 23,
        description:
          "Turn raw names into rich, scored prospect profiles using AI-powered enrichment workflows.",
        duration: "8-10 hours",
        outcomes: [
          "Build a Discover → Enrich → Score → Personalize → Send pipeline",
          "Use waterfall enrichment (Clay/Apollo) to maximize email coverage at minimal cost",
          "Deploy AI agents for prospect research, ICP scoring, and segment tagging",
          "Apply the same workflow to both B2B and creator ICPs with different enrichment fields",
          "Choose between buy (Clay/Apollo) vs build (n8n + APIs) based on your stage",
        ],
        lessons: [
          {
            id: "1",
            title:
              "The Enrichment Stack Landscape (Clay, Apollo, Hunter, Snov)",
            duration: "12 min",
          },
          {
            id: "2",
            title: "LinkedIn-Native vs Off-Platform Enrichment (ToS-Safe)",
            duration: "10 min",
          },
          {
            id: "3",
            title: "Waterfall Enrichment: 30% → 80% Coverage",
            duration: "12 min",
          },
          {
            id: "4",
            title:
              "The 5-Step Pipeline: Discover → Enrich → Score → Personalize → Send",
            duration: "12 min",
          },
          {
            id: "5",
            title: "Building the Prospect Research Agent",
            duration: "12 min",
          },
          {
            id: "6",
            title: "ICP-Fit Scoring Agent (1-10 Model)",
            duration: "10 min",
          },
          { id: "7", title: "Segment Tagging Agent", duration: "8 min" },
          {
            id: "8",
            title: "B2B Enrichment Fields vs Creator Enrichment Fields",
            duration: "10 min",
          },
          {
            id: "9",
            title: "Build vs Buy: DIY Stack (n8n + APIs) vs Clay/Apollo",
            duration: "12 min",
          },
          { id: "10", title: "Your Enrichment Playbook", duration: "10 min" },
        ],
      },
      {
        id: "ai-outreach-automation",
        title: "Course 24: AI Outreach Automation",
        number: 24,
        description:
          "Design an AI-powered multi-channel outreach stack for under $200/month.",
        duration: "10-12 hours",
        outcomes: [
          "Compare and select from Instantly, Smartlead, Lemlist, La Growth Machine, and HeyReach",
          "Build multi-channel sequences (email + LinkedIn + voice note)",
          "Run AI vs hand-written A/B tests with statistical rigor",
          "Wire reply detection → CRM updates → tasks via Zapier/Make/n8n",
          "Assemble a complete outreach stack under $200/month",
        ],
        lessons: [
          {
            id: "1",
            title: "The 2026 Outreach Platform Landscape",
            duration: "10 min",
          },
          {
            id: "2",
            title: "Instantly & Smartlead Deep Dive",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Lemlist & Multi-Channel Tools (LGM, HeyReach)",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Multi-Channel Sequence Design (B2B Framing)",
            duration: "12 min",
          },
          {
            id: "5",
            title: "Multi-Channel Sequence Design (Creator Framing)",
            duration: "10 min",
          },
          {
            id: "6",
            title: "AI Personalization: In-Tool vs External LLMs",
            duration: "10 min",
          },
          {
            id: "7",
            title: "A/B Testing AI Copy vs Hand-Written Baselines",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Reply Routing & Workflow Automation",
            duration: "10 min",
          },
          { id: "9", title: 'The "Never Automate" Rules', duration: "8 min" },
          {
            id: "10",
            title: "Reference Stack 1: Lean Email-First (~$120/month)",
            duration: "10 min",
          },
          {
            id: "11",
            title: "Reference Stack 2: Multi-Channel (~$170/month)",
            duration: "10 min",
          },
          {
            id: "12",
            title: "Your Outreach Stack Blueprint",
            duration: "10 min",
          },
        ],
      },
      {
        id: "linkedin-ai",
        title: "Course 25: LinkedIn AI Applications",
        number: 25,
        description:
          "Use AI to amplify your LinkedIn presence and generate leads without getting banned.",
        duration: "8-10 hours",
        outcomes: [
          "Understand LinkedIn's 2026 automation policies and enforcement patterns",
          "Use AI for content drafting while preserving authentic voice",
          "Distinguish safe AI engagement from ban-worthy automation",
          "Execute the Bootstrapped Sales Navigator + AI Workflow",
          "Deploy voice notes and Loom videos as high-converting outreach touches",
        ],
        lessons: [
          {
            id: "1",
            title:
              "LinkedIn's 2026 Automation Policy (What's Banned vs Tolerated)",
            duration: "8 min",
          },
          {
            id: "2",
            title: "AI Content Creation: Drafting Posts & Carousels",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Repurposing Long-Form Content to LinkedIn with AI",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Safe AI Engagement (Comment Helpers, Summarizers)",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Tool Safety Table: Safe vs Caution vs Risky",
            duration: "8 min",
          },
          {
            id: "6",
            title: "Sales Navigator + AI: The Bootstrapped Workflow",
            duration: "12 min",
          },
          {
            id: "7",
            title: "AI-Generated 1-Page Prospect Briefs",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Voice Notes & Loom Videos as Outreach Touches",
            duration: "10 min",
          },
          {
            id: "9",
            title: "B2B vs Creator LinkedIn Strategies",
            duration: "10 min",
          },
          { id: "10", title: "Your LinkedIn AI Playbook", duration: "10 min" },
        ],
      },
      {
        id: "autonomous-sdr",
        title: "Course 26: Autonomous SDR Systems",
        number: 26,
        description:
          "Evaluate AI SDR platforms and learn when autonomous systems help vs hurt a solo founder.",
        duration: "8-10 hours",
        outcomes: [
          "Understand how AI SDR platforms work (ingestion → research → sequence → reply → book)",
          "Compare autopilot vs copilot modes and when each is appropriate",
          "Evaluate pricing economics ($400-5K/month AI SDR vs $100-160/month DIY stack)",
          "Implement human-in-the-loop supervision patterns for AI SDRs",
          "Know when to use an AI SDR platform vs a simpler Instantly/Smartlead stack",
        ],
        lessons: [
          {
            id: "1",
            title: "How AI SDR Platforms Actually Work",
            duration: "10 min",
          },
          { id: "2", title: "Autopilot vs Copilot Modes", duration: "8 min" },
          {
            id: "3",
            title: "Platform Deep Dive: 11x, Artisan, AiSDR, Salesforge",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Pricing & Economics for Solo Founders",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Results: What Solo Founders Actually See",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Failure Modes: Off-Brand, Hallucinations, Spam",
            duration: "12 min",
          },
          {
            id: "7",
            title: "Supervision Patterns: Daily Queue + Kill Switches",
            duration: "10 min",
          },
          {
            id: "8",
            title: "The Automation Failure Matrix for AI SDRs",
            duration: "10 min",
          },
          {
            id: "9",
            title: "Fit Analysis: When to Use AI SDR vs DIY Stack",
            duration: "12 min",
          },
          {
            id: "10",
            title: 'Building a "Solo AI SDR Lite" System',
            duration: "12 min",
          },
        ],
      },
      {
        id: "custom-ai-agents",
        title: "Course 27: Building Custom AI Sales Agents",
        number: 27,
        description:
          "Build custom AI agents for prospecting, drafting, enrichment, and call prep using modern frameworks.",
        duration: "10-12 hours",
        outcomes: [
          "Choose between LangChain, CrewAI, AutoGen, and Claude Agent SDK for your use case",
          "Build 5 core sales agents (research, email draft, CRM enrichment, meeting prep, post-call)",
          "Design data flows from LinkedIn/CSV to enrichment to AI to outreach",
          "Compare self-hosted (VPS ~$50/month) vs SaaS ($200-400/month) architectures",
          "Handle PII, API keys, and compliance as a one-person operation",
        ],
        lessons: [
          {
            id: "1",
            title:
              "Agent Frameworks: LangChain vs CrewAI vs AutoGen vs Claude SDK",
            duration: "12 min",
          },
          {
            id: "2",
            title: "Orchestrators: n8n, Trigger.dev, Zapier, Make",
            duration: "10 min",
          },
          {
            id: "3",
            title: "Agent 1: Prospect Research Agent",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Agent 2: Email First-Draft Agent",
            duration: "12 min",
          },
          {
            id: "5",
            title: "Agent 3: CRM Enrichment Agent",
            duration: "10 min",
          },
          { id: "6", title: "Agent 4: Meeting Prep Agent", duration: "10 min" },
          {
            id: "7",
            title: "Agent 5: Post-Call Summary Agent",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Reference Architecture: Self-Hosted vs SaaS",
            duration: "12 min",
          },
          {
            id: "9",
            title: "Token Economics & Running Costs",
            duration: "8 min",
          },
          {
            id: "10",
            title: "Security, PII, and Compliance for Solo Ops",
            duration: "8 min",
          },
          {
            id: "11",
            title: "Dual-Context: B2B Discovery Prep vs Creator Nurture Agent",
            duration: "10 min",
          },
          {
            id: "12",
            title: "Your Custom Agent Stack Blueprint",
            duration: "12 min",
          },
        ],
      },
    ],
  },
  {
    id: "creator-track",
    title: "5. Creator Economy",
    description:
      "Master sales strategies tailored for creators, coaches, and course builders.",
    magnetComponent: "S",
    courses: [
      {
        id: "creator-sales-mindset",
        title: "Course 28: The Creator Sales Mindset",
        number: 28,
        description:
          "Overcome imposter syndrome and sell authentically as a creator.",
        duration: "6-8 hours",
        outcomes: [
          "Overcome imposter syndrome on sales calls",
          'Adopt "serve first, sell second" philosophy',
          "Understand investment mindset vs expense mindset",
          'Sell authentically without feeling "salesy"',
        ],
        lessons: [
          {
            id: "1",
            title: "The Creator's Sales Identity Crisis",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Imposter Syndrome on Sales Calls",
            duration: "10 min",
          },
          {
            id: "3",
            title: "Serve First, Sell Second Philosophy",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Investment Mindset vs Expense Mindset",
            duration: "8 min",
          },
          {
            id: "5",
            title: "Authentic Selling: Your Voice, Your Way",
            duration: "10 min",
          },
          {
            id: "6",
            title: "The Creator Confidence Framework",
            duration: "12 min",
          },
          {
            id: "7",
            title: "Handling Rejection as a Creator",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Your Creator Sales Manifesto",
            duration: "8 min",
          },
        ],
      },
      {
        id: "audience-to-buyer",
        title: "Course 29: Audience to Buyer Conversion",
        number: 29,
        description:
          "Turn followers into paying customers through strategic funnels.",
        duration: "8-10 hours",
        outcomes: [
          "Build owned vs rented media strategy",
          "Create content-to-conversion pipelines",
          "Design platform-specific funnels (YouTube, IG, Substack, Podcast)",
        ],
        lessons: [
          { id: "1", title: "The Audience-Revenue Gap", duration: "8 min" },
          {
            id: "2",
            title: "Owned vs Rented Media Strategy",
            duration: "10 min",
          },
          {
            id: "3",
            title: "The Content-to-Conversion Pipeline",
            duration: "12 min",
          },
          {
            id: "4",
            title: "YouTube Monetization Funnels",
            duration: "12 min",
          },
          {
            id: "5",
            title: "Instagram & Short-Form Funnels",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Podcast-to-Pipeline Strategy",
            duration: "10 min",
          },
          {
            id: "7",
            title: "Substack & Newsletter Monetization",
            duration: "12 min",
          },
          {
            id: "8",
            title: "Lead Magnet Design for Creators",
            duration: "10 min",
          },
          { id: "9", title: "The Warm Audience Advantage", duration: "10 min" },
          { id: "10", title: "Your Conversion Playbook", duration: "12 min" },
        ],
      },
      {
        id: "webinar-challenge-funnels",
        title: "Course 30: Webinar & Challenge Funnels",
        number: 30,
        description:
          "Design and execute high-converting webinars and challenge launches.",
        duration: "10-12 hours",
        outcomes: [
          "Choose between live vs evergreen webinar models",
          "Build a 5-day challenge launch framework",
          "Design application funnels that qualify buyers",
          "Know when to go evergreen (after 10+ live sales)",
        ],
        lessons: [
          {
            id: "1",
            title: "Webinar vs Challenge: Choosing Your Launch Vehicle",
            duration: "8 min",
          },
          {
            id: "2",
            title: "The Perfect Webinar Framework",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Webinar Registration & Show-Up Optimization",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Live Webinar Delivery & Pitch Structure",
            duration: "15 min",
          },
          {
            id: "5",
            title: "The 5-Day Challenge Framework",
            duration: "12 min",
          },
          {
            id: "6",
            title: "Challenge Content Architecture",
            duration: "10 min",
          },
          {
            id: "7",
            title: "Application Funnels & Qualification",
            duration: "12 min",
          },
          { id: "8", title: "Evergreen Webinar Systems", duration: "10 min" },
          {
            id: "9",
            title: "Post-Event Follow-Up Sequences",
            duration: "10 min",
          },
          { id: "10", title: "Your Launch Playbook", duration: "12 min" },
        ],
      },
      {
        id: "creator-sales-conversations",
        title: "Course 31: Creator Sales Conversations",
        number: 31,
        description:
          "Master enrollment calls, transformation selling, and creator objections.",
        duration: "10-12 hours",
        outcomes: [
          "Structure enrollment calls (not discovery calls)",
          "Apply Hormozi's C.L.O.S.E.R. framework",
          "Sell transformation instead of features",
          "Handle the 4 core creator objections",
        ],
        lessons: [
          {
            id: "1",
            title: "Enrollment Calls vs Discovery Calls",
            duration: "8 min",
          },
          { id: "2", title: "The C.L.O.S.E.R. Framework", duration: "12 min" },
          { id: "3", title: "Transformation Selling", duration: "12 min" },
          {
            id: "4",
            title: "The 4 Core Creator Objections",
            duration: "10 min",
          },
          { id: "5", title: "Pricing High-Ticket Offers", duration: "12 min" },
          { id: "6", title: "The Enrollment Call Script", duration: "15 min" },
          {
            id: "7",
            title: 'Handling "I Need to Think About It"',
            duration: "10 min",
          },
          { id: "8", title: "Group Enrollment Events", duration: "12 min" },
          {
            id: "9",
            title: "Application-to-Call Pipeline",
            duration: "10 min",
          },
          { id: "10", title: "Your Enrollment Playbook", duration: "12 min" },
        ],
      },
      {
        id: "dm-selling-social-commerce",
        title: "Course 32: DM Selling & Social Commerce",
        number: 32,
        description: "Convert social engagement into sales conversations.",
        duration: "6-8 hours",
        outcomes: [
          "Implement comment-to-DM automation",
          "Master messenger selling scripts",
          "Convert short-form content to offers",
        ],
        lessons: [
          { id: "1", title: "The DM Revenue Channel", duration: "8 min" },
          { id: "2", title: "Comment-to-DM Automation", duration: "10 min" },
          { id: "3", title: "Messenger Selling Scripts", duration: "12 min" },
          { id: "4", title: "Instagram DM Workflows", duration: "10 min" },
          { id: "5", title: "LinkedIn Message Selling", duration: "10 min" },
          {
            id: "6",
            title: "Short-Form Content to Offers",
            duration: "12 min",
          },
          { id: "7", title: "Social Proof in DMs", duration: "8 min" },
          { id: "8", title: "Your DM Selling System", duration: "10 min" },
        ],
      },
      {
        id: "creator-metrics",
        title: "Course 33: Creator Metrics That Matter",
        number: 33,
        description: "Track the right KPIs for launches and evergreen funnels.",
        duration: "6-8 hours",
        outcomes: [
          "Optimize show-up rates",
          "Benchmark call-to-close ratios",
          "Analyze application funnel performance",
          "Compare launch metrics vs evergreen metrics",
        ],
        lessons: [
          {
            id: "1",
            title: "The Creator Revenue Dashboard",
            duration: "8 min",
          },
          { id: "2", title: "Show-Up Rate Optimization", duration: "10 min" },
          { id: "3", title: "Call-to-Close Ratios", duration: "10 min" },
          {
            id: "4",
            title: "Application Funnel Analytics",
            duration: "12 min",
          },
          { id: "5", title: "Launch vs Evergreen Metrics", duration: "10 min" },
          { id: "6", title: "Audience-to-Revenue Ratio", duration: "10 min" },
          {
            id: "7",
            title: "Lifetime Value for Creator Businesses",
            duration: "12 min",
          },
          { id: "8", title: "Your Metrics Playbook", duration: "10 min" },
        ],
      },
      {
        id: "scaling-creator-sales",
        title: "Course 34: Scaling Creator Sales",
        number: 34,
        description: "Build a sales team and transition from 1:1 to group.",
        duration: "8-10 hours",
        outcomes: [
          "Implement the setter/closer model",
          "Hire and train sales help",
          "Transition from 1:1 to group programs",
          "Systematize without losing authenticity",
        ],
        lessons: [
          { id: "1", title: "The Solo Creator Ceiling", duration: "8 min" },
          { id: "2", title: "The Setter/Closer Model", duration: "12 min" },
          { id: "3", title: "Hiring Your First Closer", duration: "12 min" },
          {
            id: "4",
            title: "Training Sales Help on Your Voice",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Transitioning from 1:1 to Group",
            duration: "12 min",
          },
          { id: "6", title: "Group Program Design", duration: "10 min" },
          {
            id: "7",
            title: "Scaling Without Losing Authenticity",
            duration: "12 min",
          },
          {
            id: "8",
            title: "Sales Team Compensation Models",
            duration: "10 min",
          },
          {
            id: "9",
            title: "Systems and SOPs for Sales Teams",
            duration: "10 min",
          },
          { id: "10", title: "Your Scaling Playbook", duration: "12 min" },
        ],
      },
      {
        id: "community-led-sales",
        title: "Course 35: Community-Led Sales",
        number: 35,
        description: "Monetize communities and use them as retention engines.",
        duration: "6-8 hours",
        outcomes: [
          "Design Skool/Circle monetization models",
          "Build free-to-paid community funnels",
          "Use community as a retention engine",
          "Create hybrid course + community offers",
        ],
        lessons: [
          {
            id: "1",
            title: "Community as a Business Model",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Skool & Circle Monetization Models",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Free-to-Paid Community Funnels",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Community Engagement That Converts",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Community as a Retention Engine",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Hybrid Course + Community Offers",
            duration: "12 min",
          },
          { id: "7", title: "Community Pricing & Tiers", duration: "10 min" },
          {
            id: "8",
            title: "Your Community Sales Playbook",
            duration: "10 min",
          },
        ],
      },
    ],
  },
  {
    id: "customer-success",
    title: "6. Customer Success",
    description:
      "Ensure your customers achieve their desired outcomes and become advocates.",
    magnetComponent: "T",
    courses: [
      {
        id: "onboarding",
        title: "Course 36: Customer Onboarding",
        number: 36,
        description:
          "Design a first-90-days onboarding system that reduces time-to-value and early churn without a CS team.",
        duration: "6-8 hours",
        outcomes: [
          "Build milestone-based onboarding paths for SaaS and service businesses",
          "Design welcome sequences that cut first-month churn (from ~38% to ~10%)",
          "Structure onboarding calls for tiny customer counts",
          "Create in-app checklists and email sequences tied to activation milestones",
          "Integrate CS into a 5-7 hour/week rhythm without burnout",
        ],
        lessons: [
          {
            id: "1",
            title: "Why Onboarding Is Where Churn Happens",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Product-Led SaaS: 90-Day Milestone Map",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Services/Coaching: 90-Day Delivery Rhythm",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Welcome Sequences & In-App Checklists",
            duration: "10 min",
          },
          {
            id: "5",
            title: 'The "First Win" Email at Day 7',
            duration: "8 min",
          },
          {
            id: "6",
            title: "Onboarding Calls for Small Customer Counts",
            duration: "10 min",
          },
          {
            id: "7",
            title: "Day 45-60 Check-In & Survey Design",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Automating Onboarding with Zapier/Make/n8n",
            duration: "10 min",
          },
          {
            id: "9",
            title: "Time Management: CS in 5-7 Hours/Week",
            duration: "8 min",
          },
          { id: "10", title: "Your Onboarding Playbook", duration: "10 min" },
        ],
      },
      {
        id: "retention",
        title: "Course 37: Retention & Churn Prevention",
        number: 37,
        description:
          "Build health scoring, churn prediction, and retention automation systems a solo founder can maintain.",
        duration: "6-8 hours",
        outcomes: [
          "Build a simple health score model (Usage 40% + Engagement 30% + Business 30%)",
          "Track churn prediction signals: logins, feature adoption, email engagement, payment behavior",
          "Benchmark against SMB SaaS norms (<3% monthly logo churn, NRR ≥100%)",
          "Wire reactivation sequences, feature nudges, and save plays via automation",
          "Maintain a weekly CS review block (2-3 hours) focused on red and high-potential accounts",
        ],
        lessons: [
          {
            id: "1",
            title:
              "The Economics of Retention (5-25x Cheaper Than Acquisition)",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Simple Health Score: Usage + Engagement + Business",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Churn Prediction Signals You Can Actually Track",
            duration: "10 min",
          },
          {
            id: "4",
            title: "SMB Churn Benchmarks & NRR Targets",
            duration: "8 min",
          },
          {
            id: "5",
            title: "Reactivation Sequences (No Login in 10 Days)",
            duration: "10 min",
          },
          { id: "6", title: "Feature Adoption Nudges", duration: "8 min" },
          {
            id: "7",
            title: '"Save" Plays: Downgrades, Pauses, and Recovery Calls',
            duration: "10 min",
          },
          { id: "8", title: "The Weekly CS Review Block", duration: "8 min" },
          {
            id: "9",
            title: "Automation Recipes for Retention",
            duration: "10 min",
          },
          { id: "10", title: "Your Retention Playbook", duration: "10 min" },
        ],
      },
      {
        id: "expansion",
        title: "Course 38: Expansion & Upsell",
        number: 38,
        description:
          "Identify expansion triggers and grow account value through seats, upgrades, and consulting.",
        duration: "5-6 hours",
        outcomes: [
          "Identify usage-based and role-based expansion triggers",
          "Time upsell conversations around outcome milestones",
          "Structure seat expansion, done-for-you, and upgraded retainer pitches",
          "Track Net Revenue Retention and expansion contribution to growth",
        ],
        lessons: [
          {
            id: "1",
            title: "Expansion as a Growth Engine (NRR > 100%)",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Usage-Based Expansion Triggers (SaaS)",
            duration: "10 min",
          },
          {
            id: "3",
            title: "Outcome-Based Expansion Triggers (Services/Coaching)",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Seat & License Expansion Playbook",
            duration: "8 min",
          },
          {
            id: "5",
            title: "Done-for-You & Consulting Upsell Paths",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Upgraded Retainer Conversations",
            duration: "8 min",
          },
          {
            id: "7",
            title: "Pricing Expansion Without Alienating Customers",
            duration: "10 min",
          },
          { id: "8", title: "Your Expansion Playbook", duration: "8 min" },
        ],
      },
      {
        id: "advocacy",
        title: "Course 39: Customer Advocacy",
        number: 39,
        description:
          "Turn happy customers into testimonials, case studies, and referral engines.",
        duration: "5-6 hours",
        outcomes: [
          "Collect testimonials systematically within the first 30-60 days",
          "Write mini case studies with the Challenge-Solution-Results framework",
          "Design a lightweight referral loop that runs on autopilot",
          "Time advocacy asks to coincide with customer success milestones",
        ],
        lessons: [
          {
            id: "1",
            title: "Why Advocacy Beats Advertising for Solo Founders",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Testimonial Collection System (2-3 Question Form)",
            duration: "10 min",
          },
          {
            id: "3",
            title: "Mini Case Studies: Challenge → Solution → Results",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Video Testimonials on a Budget",
            duration: "8 min",
          },
          {
            id: "5",
            title: 'Referral Loop Design ("Know 1-2 People?")',
            duration: "10 min",
          },
          {
            id: "6",
            title: "Timing Advocacy Asks to Success Milestones",
            duration: "8 min",
          },
          {
            id: "7",
            title: "Building a Social Proof Library",
            duration: "8 min",
          },
          { id: "8", title: "Your Advocacy Playbook", duration: "8 min" },
        ],
      },
    ],
  },
  {
    id: "operations-systems",
    title: "7. Operations & Systems",
    description:
      "Optimize your sales and marketing stack for scale and efficiency.",
    magnetComponent: "T",
    courses: [
      {
        id: "crm-setup",
        title: "Course 40: Advanced CRM Setup",
        number: 40,
        description:
          "Choose, configure, and automate a CRM that fits your sales motion and budget.",
        duration: "6-8 hours",
        outcomes: [
          "Compare HubSpot Free, Attio, Folk, Close, and Pipedrive for solo use",
          "Configure universal pipeline stages (Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost)",
          "Set up email logging, deal tracking, and contact enrichment",
          "Choose the right CRM by sales motion (volume B2B vs relationship/creator)",
        ],
        lessons: [
          {
            id: "1",
            title: "CRM Philosophy: System of Action, Not Just a Database",
            duration: "8 min",
          },
          {
            id: "2",
            title: "HubSpot Free & Attio: Comparison for Solo Founders",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Folk & Close: Relationship vs Volume CRMs",
            duration: "12 min",
          },
          {
            id: "4",
            title: "Universal Pipeline Stages Setup",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Email Logging & Contact Enrichment",
            duration: "8 min",
          },
          {
            id: "6",
            title: "Deal Tracking & Custom Fields",
            duration: "10 min",
          },
          {
            id: "7",
            title: "CRM Hygiene: Keeping Data Clean",
            duration: "8 min",
          },
          {
            id: "8",
            title: "Choosing by Sales Motion (B2B vs Creator)",
            duration: "8 min",
          },
          {
            id: "9",
            title: "Migration: Moving Between CRMs Without Losing Data",
            duration: "8 min",
          },
          { id: "10", title: "Your CRM Setup Checklist", duration: "8 min" },
        ],
      },
      {
        id: "analytics",
        title: "Course 41: Sales Analytics & BI",
        number: 41,
        description:
          "Build minimal dashboards that answer: Is acquisition working? Are customers staying? Where should I focus?",
        duration: "6-8 hours",
        outcomes: [
          "Build a funnel dashboard (Leads → Meetings → Proposals → Wins with conversion %)",
          "Track pipeline velocity (days between stages)",
          "Implement binary commit/upside forecasting to neutralize founder optimism",
          "Define CAC payback targets (1-3 months bootstrapped, 6-9 months with runway)",
        ],
        lessons: [
          {
            id: "1",
            title: "The 3 Questions Your Metrics Must Answer",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Funnel Dashboard: Leads → Meetings → Proposals → Wins",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Pipeline Velocity: Average Days Between Stages",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Commit vs Upside Forecasting",
            duration: "10 min",
          },
          {
            id: "5",
            title: "CAC, LTV, and Payback Period for Bootstrapped Founders",
            duration: "12 min",
          },
          {
            id: "6",
            title: "Revenue Tracking: New vs Expansion vs Churned MRR",
            duration: "10 min",
          },
          {
            id: "7",
            title: "Channel Attribution: Which Source Drives Wins?",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Building Dashboards in Sheets, CRM, or Metabase",
            duration: "10 min",
          },
          {
            id: "9",
            title: "Weekly Metrics Review Ritual",
            duration: "8 min",
          },
          { id: "10", title: "Your Analytics Playbook", duration: "8 min" },
        ],
      },
      {
        id: "automation",
        title: "Course 42: Sales Automation",
        number: 42,
        description:
          "Wire the 5 automations that matter most using Zapier, Make, or n8n under $100/month.",
        duration: "6-8 hours",
        outcomes: [
          "Compare Zapier vs Make vs n8n vs Trigger.dev for solo founder use",
          "Build the 5 core automations: Lead Catcher, Meeting Logger, Follow-Up Reminder, Contract Chaser, Notifications",
          "Wire reply detection → CRM updates → tasks",
          "Keep total automation spend under $100/month",
        ],
        lessons: [
          {
            id: "1",
            title: "Automation Tools: Zapier vs Make vs n8n vs Trigger.dev",
            duration: "10 min",
          },
          {
            id: "2",
            title: "Automation 1: Lead Catcher (Form → CRM → Notify)",
            duration: "10 min",
          },
          {
            id: "3",
            title: "Automation 2: Meeting Logger (Call → CRM → Follow-Up)",
            duration: "10 min",
          },
          {
            id: "4",
            title: "Automation 3: Follow-Up Reminder (Day 3/7/14 Chain)",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Automation 4: Contract & Invoice Chaser",
            duration: "8 min",
          },
          {
            id: "6",
            title: "Automation 5: Deal Notifications (Slack/Email Alerts)",
            duration: "8 min",
          },
          {
            id: "7",
            title: "Wiring Reply Detection → CRM → Tasks",
            duration: "10 min",
          },
          {
            id: "8",
            title: "Budget Optimization: Staying Under $100/Month",
            duration: "8 min",
          },
          {
            id: "9",
            title: "Debugging Broken Automations",
            duration: "8 min",
          },
          {
            id: "10",
            title: "Your Automation Stack Blueprint",
            duration: "8 min",
          },
        ],
      },
      {
        id: "outsourcing",
        title: "Course 43: Outsourcing & VAs",
        number: 43,
        description:
          "Know when pipeline load justifies a VA and how to delegate inbox triage, CRM updates, and research.",
        duration: "5-6 hours",
        outcomes: [
          "Identify the threshold for hiring help (>40-50 active opps or >5 hours/week admin)",
          "Write delegation SOPs for inbox triage, CRM updates, and prospect research",
          "Decide between VA support vs part-time SDR based on your stage",
          "Manage a VA effectively without micromanagement",
        ],
        lessons: [
          {
            id: "1",
            title: "When Pipeline Load Justifies a VA",
            duration: "8 min",
          },
          {
            id: "2",
            title: "VA vs Part-Time SDR: Which First?",
            duration: "10 min",
          },
          {
            id: "3",
            title: "SOP 1: Inbox Triage (Lead/Customer/Admin/Noise)",
            duration: "10 min",
          },
          {
            id: "4",
            title: "SOP 2: CRM Updates (Stage, Amount, Next Steps)",
            duration: "8 min",
          },
          {
            id: "5",
            title: "SOP 3: Prospect Research Tasks",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Hiring, Onboarding, and Managing a VA",
            duration: "10 min",
          },
          { id: "7", title: "Tools for VA Collaboration", duration: "8 min" },
          { id: "8", title: "Your Delegation Playbook", duration: "8 min" },
        ],
      },
      {
        id: "playbook",
        title: "Course 44: The Sales Playbook",
        number: 44,
        description:
          "Document your complete acquisition system into a one-page playbook and repeatable process.",
        duration: "8-10 hours",
        outcomes: [
          "Answer the 5 core questions: Who? How? What message? How measured? What commitment?",
          "Build situation-specific playbooks (Starting from Zero, B2B SaaS, Coach/Consultant, Creator, Scaling)",
          'Create a one-page personal acquisition system ("if it doesn\'t fit on one page, you lack clarity")',
          "Design a 90-day commitment contract with specific activity metrics",
        ],
        lessons: [
          {
            id: "1",
            title: "The 5 Core Questions Every Playbook Answers",
            duration: "10 min",
          },
          {
            id: "2",
            title: "Playbook: Starting from Zero (0 Customers)",
            duration: "12 min",
          },
          { id: "3", title: "Playbook: B2B SaaS Founder", duration: "12 min" },
          { id: "4", title: "Playbook: Coach/Consultant", duration: "10 min" },
          {
            id: "5",
            title: "Playbook: Creator with Audience",
            duration: "10 min",
          },
          {
            id: "6",
            title: "Playbook: Scaling from 50 to 500 Customers",
            duration: "12 min",
          },
          {
            id: "7",
            title: "The One-Page Personal Acquisition System",
            duration: "12 min",
          },
          {
            id: "8",
            title: "The 90-Day Commitment Contract",
            duration: "10 min",
          },
          {
            id: "9",
            title: "When to Pivot vs Persist (60-90 Day Rule)",
            duration: "10 min",
          },
          { id: "10", title: "Your Living Sales Playbook", duration: "12 min" },
        ],
      },
      {
        id: "scale",
        title: "Course 45: Scaling to First Sales Hire",
        number: 45,
        description:
          "Replace yourself in the sales process with your first hire or fractional support.",
        duration: "8-10 hours",
        outcomes: [
          "Know when you've earned the right to hire (proven motion, 50+ meetings, documented scripts)",
          "Choose between fractional, part-time SDR, and full-time closer",
          "Train a hire on your voice, ICP, and qualification criteria",
          "Build compensation models that align incentives",
        ],
        lessons: [
          {
            id: "1",
            title: "Prerequisites: What Must Be True Before You Hire",
            duration: "10 min",
          },
          {
            id: "2",
            title: "Fractional vs Part-Time vs Full-Time: Which First?",
            duration: "12 min",
          },
          { id: "3", title: "Writing the Job Description", duration: "8 min" },
          {
            id: "4",
            title: "The Interview Process for Sales Roles",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Onboarding: Training on Your ICP, Voice, and Playbook",
            duration: "12 min",
          },
          {
            id: "6",
            title: "Compensation Models (Base + Variable)",
            duration: "10 min",
          },
          {
            id: "7",
            title: "Managing a Sales Hire as a Solo Founder",
            duration: "10 min",
          },
          { id: "8", title: "When to Fire and Start Over", duration: "8 min" },
          {
            id: "9",
            title: "Transitioning from Founder-Led to Team-Led Sales",
            duration: "12 min",
          },
          { id: "10", title: "Your Hiring Playbook", duration: "10 min" },
        ],
      },
      {
        id: "legal",
        title: "Course 46: Sales Legal & Contracts",
        number: 46,
        description:
          "Use solo-friendly contract templates and know what to customize vs leave to counsel.",
        duration: "4-5 hours",
        outcomes: [
          "Know which contract template to use: MSA, SOW, SaaS Terms, or simple engagement letter",
          "Customize scope, payment terms, IP, and termination clauses",
          "Set up e-signature workflows (DocuSign, SignWell)",
          "Know when to involve legal counsel vs handle it yourself",
        ],
        lessons: [
          {
            id: "1",
            title: "Contract Types: MSA, SOW, SaaS Terms, Engagement Letters",
            duration: "10 min",
          },
          {
            id: "2",
            title: "What to Customize: Scope, Payment, IP, Termination",
            duration: "12 min",
          },
          {
            id: "3",
            title: "Payment Terms: Net 7/14/30 and Late Fees",
            duration: "8 min",
          },
          {
            id: "4",
            title: "E-Signature Workflows and Contract Management",
            duration: "8 min",
          },
          {
            id: "5",
            title: "Redlines: What to Push Back On",
            duration: "10 min",
          },
          {
            id: "6",
            title: "When to Involve Legal Counsel",
            duration: "8 min",
          },
          {
            id: "7",
            title: "Your Contract Templates Library",
            duration: "8 min",
          },
        ],
      },
      {
        id: "finance",
        title: "Course 47: Sales Finance & Tax",
        number: 47,
        description:
          "Manage invoicing, collections, revenue tracking, and CAC payback as a solo founder.",
        duration: "4-5 hours",
        outcomes: [
          "Set up standardized invoicing with automated reminders (7/14/30 days overdue)",
          "Track MRR: new vs expansion vs churned revenue",
          "Calculate and target CAC payback period (1-3 months bootstrapped)",
          "Understand basic sales tax, VAT, and revenue recognition for solo businesses",
        ],
        lessons: [
          {
            id: "1",
            title: "Invoicing Systems: Stripe, Chargebee, PayPal",
            duration: "8 min",
          },
          {
            id: "2",
            title: "Automated Collections & Overdue Reminders",
            duration: "8 min",
          },
          {
            id: "3",
            title: "Revenue Tracking: New, Expansion, and Churned MRR",
            duration: "10 min",
          },
          {
            id: "4",
            title: "CAC Payback: Bootstrapped vs VC Benchmarks",
            duration: "10 min",
          },
          {
            id: "5",
            title: "Cash Flow Management for Lumpy Revenue",
            duration: "8 min",
          },
          {
            id: "6",
            title: "Sales Tax, VAT, and Compliance Basics",
            duration: "8 min",
          },
          { id: "7", title: "Your Finance Dashboard", duration: "8 min" },
        ],
      },
      {
        id: "capstone",
        title: "Course 48: Multi-Million Dollar Capstone",
        number: 48,
        description:
          "Build your complete, documented acquisition system and earn your certification.",
        duration: "15-20 hours",
        outcomes: [
          "Assemble all playbooks, templates, and systems from Tracks 1-7 into one living document",
          "Execute a 30-day acquisition sprint with real targets and accountability",
          "Present your acquisition system for peer and AI review",
          "Earn your Solo GTM OS certification",
        ],
        lessons: [
          {
            id: "1",
            title: "Capstone Overview: What You'll Build",
            duration: "5 min",
          },
          {
            id: "2",
            title: "System Assembly: ICP + Positioning + Channel",
            duration: "15 min",
          },
          {
            id: "3",
            title: "System Assembly: Outreach + Sequences + CRM",
            duration: "15 min",
          },
          {
            id: "4",
            title: "System Assembly: Discovery + Proposals + Closing",
            duration: "15 min",
          },
          {
            id: "5",
            title: "System Assembly: Retention + Expansion + Advocacy",
            duration: "12 min",
          },
          {
            id: "6",
            title: "The 30-Day Sprint: Planning Your Targets",
            duration: "10 min",
          },
          { id: "7", title: "Week 1 Execution & Review", duration: "20 min" },
          { id: "8", title: "Week 2 Execution & Review", duration: "20 min" },
          { id: "9", title: "Week 3 Execution & Review", duration: "20 min" },
          { id: "10", title: "Week 4 Execution & Review", duration: "20 min" },
          { id: "11", title: "Final System Documentation", duration: "15 min" },
          {
            id: "12",
            title: "Certification Presentation & Review",
            duration: "15 min",
          },
        ],
      },
    ],
  },
];

export function getAllCourses() {
  return CURRICULUM.flatMap((track) => track.courses);
}

export function getCourse(id: string) {
  return getAllCourses().find((c) => c.id === id);
}

export function getCourseByNumber(num: number) {
  return getAllCourses().find((c) => c.number === num);
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  return course?.lessons.find((l) => l.id === lessonId);
}

export function getTrackIdForCourse(courseId: string) {
  return CURRICULUM.find((track) =>
    track.courses.some((c) => c.id === courseId),
  )?.id;
}

export function getCourseDuration(course: { lessons: { duration: string }[] }) {
  const totalMin = course.lessons.reduce((sum, l) => {
    const match = l.duration.match(/(\d+)/);
    return sum + (match ? parseInt(match[1], 10) : 0);
  }, 0);
  if (totalMin < 60) return `${totalMin} min`;
  const hours = totalMin / 60;
  return hours % 1 === 0 ? `${hours} hr` : `${hours.toFixed(1)} hr`;
}
