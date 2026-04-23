export interface Course {
  id: string;
  number: string;
  title: string;
  description: string;
  lessonCount?: number;
  status: "ready" | "coming-soon";
  badge?: string;
}

export interface Track {
  id: number;
  title: string;
  description: string;
  color: "indigo" | "sky" | "emerald" | "cyan" | "amber" | "rose" | "purple";
  totalCourses: number;
  readyCourses?: number;
  courses: Course[];
  isNew?: boolean;
  isLargest?: boolean;
}

export const ACADEMY_TRACKS: Track[] = [
  {
    id: 1,
    title: "Foundations",
    description:
      "Sales psychology, ICP, positioning, acquisition path, list building.",
    color: "indigo",
    totalCourses: 5,
    readyCourses: 5,
    courses: [
      {
        id: "00",
        number: "00",
        title: "Solo Founder Sales Psychology",
        description:
          "Master the mindset before the tactics. Overcome sales resistance and impostor syndrome.",
        lessonCount: 8,
        status: "ready",
      },
      {
        id: "01",
        number: "01",
        title: "ICP Builder Workshop",
        description:
          "Define your Ideal Customer Profile with precision. Stop targeting everyone.",
        lessonCount: 13,
        status: "ready",
      },
      {
        id: "02",
        number: "02",
        title: "Positioning & Value Proposition",
        description:
          "Differentiate your offer and articulate value that resonates with your ICP.",
        lessonCount: 10,
        status: "ready",
      },
      {
        id: "03",
        number: "03",
        title: "Choose Your Acquisition Path",
        description:
          "Identify if you're built for Inbound, Outbound, or Community-led growth.",
        lessonCount: 6,
        status: "ready",
      },
      {
        id: "04",
        number: "04",
        title: "List Building & Prospecting",
        description:
          "Build technical systems to find and verify your ideal prospects.",
        lessonCount: 11,
        status: "ready",
      },
    ],
  },
  {
    id: 2,
    title: "Marketing Engine",
    description:
      "Content, SEO/AEO, LinkedIn, cold email, community, nurture, social proof, automation.",
    color: "sky",
    totalCourses: 8,
    readyCourses: 8,
    isLargest: true,
    courses: [
      {
        id: "05",
        number: "05",
        title: "Technical Content Engine",
        description:
          "Create content that earns trust of technical buyers and decision-makers.",
        lessonCount: 13,
        status: "ready",
      },
      {
        id: "06",
        number: "06",
        title: "SEO & Answer Engine Optimization",
        description:
          "Rank where your customers search, including AI-driven answer engines.",
        lessonCount: 12,
        status: "ready",
      },
      {
        id: "07",
        number: "07",
        title: "LinkedIn Growth Engine",
        description:
          "Turn LinkedIn into a professional networking and lead generation powerhouse.",
        lessonCount: 10,
        status: "ready",
      },
      {
        id: "08",
        number: "08",
        title: "Cold Email Mastery",
        description:
          "Write emails that get replies by focusing on problems, not features.",
        lessonCount: 12,
        status: "ready",
      },
      {
        id: "09",
        number: "09",
        title: "Community-Based Lead Generation",
        description:
          "Leverage Reddit, Hacker News, Product Hunt through value-first participation",
        status: "ready",
      },
      {
        id: "10",
        number: "10",
        title: "Email Nurture & Newsletter",
        description:
          "Convert subscribers to customers through systematic nurture sequences",
        status: "ready",
      },
      {
        id: "11",
        number: "11",
        title: "Social Proof & Referral Systems",
        description:
          "Systematize collection and deployment of testimonials and referrals",
        status: "ready",
      },
      {
        id: "12",
        number: "12",
        title: "Marketing Automation & Analytics",
        description: "Connect your tools and measure what actually works",
        status: "ready",
      },
    ],
  },
  {
    id: 3,
    title: "Sales Methodology",
    description:
      "DISC selling, discovery, demos, objections, proposals, negotiation, closing, pipeline.",
    color: "emerald",
    totalCourses: 8,
    readyCourses: 8,
    courses: [
      {
        id: "13",
        number: "13",
        title: "Understanding DISC Buyer Personas",
        description:
          "Adapt your communication style to match your buyer's personality.",
        lessonCount: 11,
        status: "ready",
        badge: "AI Roleplay: 4 DISC Types",
      },
      {
        id: "14",
        number: "14",
        title: "Discovery Framework - BANT/MEDDIC",
        description:
          "Structured frameworks to uncover pain and qualify opportunities.",
        lessonCount: 12,
        status: "ready",
      },
      {
        id: "15",
        number: "15",
        title: "Discovery Call Simulations",
        description:
          "Intensive AI-based practice sessions for discovery calls.",
        lessonCount: 10,
        status: "ready",
        badge: "AI Discovery Roleplay",
      },
      {
        id: "16",
        number: "16",
        title: "Demo Architecture",
        description:
          "Conduct value-first demos that map features to customer pain.",
        lessonCount: 9,
        status: "ready",
      },
      {
        id: "17",
        number: "17",
        title: "Objection Handling Database",
        description:
          "Prepare for and neutralize the most common sales objections",
        status: "ready",
      },
      {
        id: "18",
        number: "18",
        title: "Proposals, Pricing & Negotiation",
        description:
          "Close deals with favorable terms and structured proposals",
        status: "ready",
      },
      {
        id: "19",
        number: "19",
        title: "Closing & Next Steps",
        description: "Finalize agreements and transition to implementation",
        status: "ready",
      },
      {
        id: "20",
        number: "20",
        title: "Sales Pipeline Management",
        description: "Maintain hygiene and momentum in your sales cycle",
        status: "ready",
      },
    ],
  },
  {
    id: 4,
    title: "AI-Powered Acquisition",
    description:
      "AI strategy, deliverability, lead research, outreach, LinkedIn AI, AI SDRs, custom agents.",
    color: "cyan",
    totalCourses: 7,
    readyCourses: 7,
    isNew: true,
    courses: [
      {
        id: "21",
        number: "21",
        title: "AI Sales Strategy & Landscape",
        description:
          "Build vs buy decisions, platform evaluation, realistic ROI expectations.",
        lessonCount: 11,
        status: "ready",
      },
      {
        id: "22",
        number: "22",
        title: "Email Deliverability & Compliance",
        description: "SPF/DKIM/DMARC, domain warming, Gmail/Yahoo 2024 rules.",
        lessonCount: 12,
        status: "ready",
      },
      {
        id: "23",
        number: "23",
        title: "AI-Powered Lead Research",
        description:
          "Apollo, Clay, n8n workflows, LLM-powered research at scale.",
        lessonCount: 10,
        status: "ready",
      },
      {
        id: "24",
        number: "24",
        title: "AI-Assisted Outreach",
        description:
          "Human-in-loop personalization, prompt engineering for sales copy.",
        lessonCount: 11,
        status: "ready",
      },
      {
        id: "25",
        number: "25",
        title: "LinkedIn AI Strategy",
        description:
          "Safe automation, ban avoidance, hybrid manual+AI workflows",
        status: "ready",
      },
      {
        id: "26",
        number: "26",
        title: "Autonomous AI SDR Systems",
        description:
          "Agent Frank, AiSDR, Jason AI configuration and monitoring",
        status: "ready",
      },
      {
        id: "27",
        number: "27",
        title: "Building Custom AI Sales Agents",
        description: "n8n, CrewAI, DIY agents for technical founders",
        status: "ready",
      },
    ],
  },
  {
    id: 5,
    title: "Creator Economy",
    description:
      "Creator mindset, audience conversion, webinars, DM selling, metrics, scaling.",
    color: "amber",
    totalCourses: 8,
    readyCourses: 8,
    courses: [
      {
        id: "28",
        number: "28",
        title: "The Creator Sales Mindset",
        description:
          "Overcome imposter syndrome and sell authentically as a creator",
        lessonCount: 8,
        status: "ready",
      },
      {
        id: "29",
        number: "29",
        title: "Audience to Buyer Conversion",
        description:
          "Turn followers into paying customers through strategic funnels",
        lessonCount: 10,
        status: "ready",
      },
      {
        id: "30",
        number: "30",
        title: "Webinar & Challenge Funnels",
        description:
          "Design and execute high-converting webinars and challenge launches",
        lessonCount: 10,
        status: "ready",
      },
      {
        id: "31",
        number: "31",
        title: "Creator Sales Conversations",
        description:
          "Master enrollment calls, transformation selling, and creator objections",
        lessonCount: 10,
        status: "ready",
      },
      {
        id: "32",
        number: "32",
        title: "DM Selling & Social Commerce",
        description: "Convert social engagement into sales conversations",
        lessonCount: 8,
        status: "ready",
      },
      {
        id: "33",
        number: "33",
        title: "Creator Metrics That Matter",
        description: "Track the right KPIs for launches and evergreen funnels",
        lessonCount: 8,
        status: "ready",
      },
      {
        id: "34",
        number: "34",
        title: "Scaling Creator Sales",
        description: "Build a sales team and transition from 1:1 to group",
        lessonCount: 10,
        status: "ready",
      },
      {
        id: "35",
        number: "35",
        title: "Community-Led Sales",
        description: "Monetize communities and use them as retention engines",
        lessonCount: 8,
        status: "ready",
      },
    ],
  },
  {
    id: 6,
    title: "Customer Success",
    description:
      "Onboarding, retention, churn prevention, expansion, advocacy.",
    color: "rose",
    totalCourses: 4,
    readyCourses: 4,
    courses: [
      {
        id: "36",
        number: "36",
        title: "Customer Onboarding",
        description: "First 90 days success plan for rapid value realization",
        status: "ready",
      },
      {
        id: "37",
        number: "37",
        title: "Retention & Churn Prevention",
        description:
          "Build long-term retention engines to keep customers for life",
        status: "ready",
      },
      {
        id: "38",
        number: "38",
        title: "Expansion & Upsell",
        description: "Grow account value over time, maximize lifetime value",
        status: "ready",
      },
      {
        id: "39",
        number: "39",
        title: "Customer Advocacy",
        description: "Turn users into fans and generate viral growth",
        status: "ready",
      },
    ],
  },
  {
    id: 7,
    title: "Operations & Systems",
    description:
      "CRM, analytics, automation, playbooks, first hire, legal, finance, capstone.",
    color: "purple",
    totalCourses: 9,
    readyCourses: 9,
    courses: [
      {
        id: "40",
        number: "40",
        title: "Advanced CRM Setup",
        description: "Automate your sales ops and build a nerve center",
        status: "ready",
      },
      {
        id: "41",
        number: "41",
        title: "Sales Analytics & BI",
        description: "Data-driven sales management and decisions",
        status: "ready",
      },
      {
        id: "42",
        number: "42",
        title: "Sales Automation (Non-AI)",
        description: "Scale without adding headcount, eliminate grunt work",
        status: "ready",
      },
      {
        id: "43",
        number: "43",
        title: "Outsourcing & VAs",
        description: "When and how to offload tasks, buy back time",
        status: "ready",
      },
      {
        id: "44",
        number: "44",
        title: "The Sales Playbook",
        description: "Document your growth engine, create repeatable recipe",
        status: "ready",
      },
      {
        id: "45",
        number: "45",
        title: "Scaling to First Sales Hire",
        description: "Successfully delegate sales work, replace yourself",
        status: "ready",
      },
      {
        id: "46",
        number: "46",
        title: "Sales Legal & Contracts",
        description: "MSAs, SOWs, redlines - protect your downside",
        status: "ready",
      },
      {
        id: "47",
        number: "47",
        title: "Sales Finance & Tax",
        description: "Manage sales cashflow and taxes effectively",
        status: "ready",
      },
      {
        id: "48",
        number: "48",
        title: "Multi-Million Dollar Capstone",
        description: "Final project and certification for full sales mastery",
        status: "ready",
      },
    ],
  },
];

export const FAQS = [
  {
    question: "But I'm an engineer, not a salesperson?",
    answer:
      'Exactly why we built this. You don\'t need charisma; you need a protocol. We teach you how to "debug" buyer pain points using discovery frameworks that work like logic gates.',
  },
  {
    question: "Why 49 courses across 7 tracks?",
    answer:
      "Customer acquisition is a complete system, not a single skill. We cover marketing, sales, AI-powered acquisition, creator economy, and retention—the entire journey. Most founders learn bits and pieces; we give you the complete picture.",
  },
  {
    question: "What's available now?",
    answer:
      "All 49 courses across all 7 tracks are live now — Foundations (5), Marketing Engine (8), Sales Methodology (8), AI-Powered Acquisition (7), Creator Economy (8), Customer Success (4), and Operations & Systems (9). That's the complete journey from ICP definition through closing, retention, and scaling.",
  },
  {
    question: "How does the AI Roleplay work?",
    answer:
      "Our AI simulates 4 distinct DISC personality types. Practice handling real objections, and the AI tracks your talk-time ratio, questions asked, and methodology adherence in real-time.",
  },
  {
    question: "What's the difference from the Playbook?",
    answer:
      "The Customer Acquisition Playbook gives you the strategic frameworks. The Academy gives you hands-on practice with AI roleplay, artifact builders, and real-time coaching. Frameworks in the book, execution in the academy.",
  },
  {
    question: "How is this different from free content?",
    answer:
      "Free content teaches tactics. We build systems. The academy includes AI practice tools, versioned artifacts, and frameworks you can repeat. It's the difference between reading about sales and doing sales.",
  },
];
