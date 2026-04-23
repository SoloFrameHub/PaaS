
export interface Course {
    id: string;
    number: string;
    title: string;
    description: string;
    lessonCount?: number;
    status: 'ready' | 'coming-soon';
    badge?: string;
}

export interface Track {
    id: number;
    title: string;
    description: string;
    color: 'indigo' | 'sky' | 'emerald' | 'cyan' | 'amber' | 'rose' | 'purple';
    totalCourses: number;
    readyCourses?: number;
    courses: Course[];
    isNew?: boolean;
    isLargest?: boolean;
}

export const ACADEMY_TRACKS: Track[] = [
    {
        id: 1,
        title: "Mental Wellness Education",
        description: "Evidence-based courses on anxiety, depression, sleep, and coping techniques using CBT, mindfulness, and lifestyle interventions.",
        color: "emerald",
        totalCourses: 3,
        readyCourses: 3,
        courses: [
            { id: "anxiety-management", number: "01", title: "Understanding & Managing Anxiety", description: "Master evidence-based techniques to understand anxiety, break worry cycles, and build resilience.", lessonCount: 8, status: "ready" },
            { id: "depression-action", number: "02", title: "Depression: From Understanding to Action", description: "Break free from the depression cycle using behavioral activation and cognitive skills.", lessonCount: 8, status: "ready" },
            { id: "sleep-insomnia", number: "03", title: "Sleep Problems & Insomnia Solutions", description: "Overcome insomnia using CBT-I techniques: the gold-standard treatment for sleep problems.", lessonCount: 8, status: "ready" }
        ]
    },
    {
        id: 2,
        title: "Stress & Resilience",
        description: "Build emotional resilience, manage stress, and develop healthy coping strategies for daily challenges.",
        color: "sky",
        totalCourses: 3,
        courses: [
            { id: "stress-management", number: "04", title: "Stress Management Fundamentals", description: "Understand your stress response and build a personalized stress management toolkit.", status: "coming-soon" },
            { id: "emotional-regulation", number: "05", title: "Emotional Regulation Skills", description: "Learn to identify, understand, and manage difficult emotions effectively.", status: "coming-soon" },
            { id: "building-resilience", number: "06", title: "Building Resilience", description: "Develop psychological resilience to bounce back from setbacks and adversity.", status: "coming-soon" }
        ]
    },
    {
        id: 3,
        title: "Relationships & Connection",
        description: "Improve communication, set healthy boundaries, and build stronger relationships.",
        color: "rose",
        totalCourses: 3,
        courses: [
            { id: "healthy-boundaries", number: "07", title: "Setting Healthy Boundaries", description: "Learn to set and maintain boundaries that protect your wellbeing.", status: "coming-soon" },
            { id: "communication-skills", number: "08", title: "Communication for Connection", description: "Build deeper relationships through effective, empathetic communication.", status: "coming-soon" },
            { id: "social-anxiety", number: "09", title: "Overcoming Social Anxiety", description: "Reduce social anxiety using gradual exposure and cognitive techniques.", status: "coming-soon" }
        ]
    },
    {
        id: 4,
        title: "Mindfulness & Self-Care",
        description: "Develop a sustainable mindfulness practice and self-care routine for lasting wellbeing.",
        color: "amber",
        totalCourses: 3,
        courses: [
            { id: "mindfulness-basics", number: "10", title: "Mindfulness Fundamentals", description: "Build a daily mindfulness practice from scratch with guided techniques.", status: "coming-soon" },
            { id: "self-compassion", number: "11", title: "Self-Compassion Practice", description: "Replace self-criticism with self-compassion using evidence-based exercises.", status: "coming-soon" },
            { id: "wellness-habits", number: "12", title: "Building Wellness Habits", description: "Create sustainable daily habits that support long-term mental health.", status: "coming-soon" }
        ]
    }
];

export const FAQS = [
    {
        question: "Is this a substitute for therapy?",
        answer: "No. Wellness Academy is an educational platform that teaches evidence-based coping techniques and mental health literacy. It is not therapy or a substitute for professional mental health treatment. If you're experiencing a mental health crisis, please call 988 (Suicide & Crisis Lifeline) or contact a licensed professional."
    },
    {
        question: "What evidence are the courses based on?",
        answer: "Our courses are based on well-established therapeutic approaches including Cognitive Behavioral Therapy (CBT), CBT for Insomnia (CBT-I), Behavioral Activation, and Mindfulness-Based Stress Reduction (MBSR). All techniques referenced have peer-reviewed research supporting their effectiveness."
    },
    {
        question: "What's available now?",
        answer: "3 courses covering anxiety management, depression, and sleep/insomnia — with 24 evidence-based lessons total. Additional courses on stress, resilience, relationships, and mindfulness are coming soon."
    },
    {
        question: "How does the AI Wellness Coach work?",
        answer: "Our AI coach provides personalized guidance based on your wellness profile and course progress. It can suggest coping techniques, help you practice skills from the courses, and detect crisis language to connect you with professional resources when needed."
    },
    {
        question: "Is my data private?",
        answer: "Yes. Your wellness data is stored securely and never shared with third parties. We take mental health privacy seriously — your symptom data, mood entries, and conversations with the AI coach are encrypted and only accessible to you."
    },
    {
        question: "How is this different from free mental health content?",
        answer: "Free content teaches concepts. We build skills. The academy includes structured learning paths, an AI wellness coach, progress tracking, and evidence-based exercises you can practice daily. It's the difference between reading about coping techniques and actually building a coping toolkit."
    }
];
