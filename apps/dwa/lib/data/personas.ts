export interface Persona {
    id: string;
    name: string;
    role: string;
    focusArea: string;
    copingStyle: string;
    personality: {
        traits: string[];
        communicationStyle: string;
        motivators: string[];
    };
    context: {
        challenges: string;
        goals: string;
    };
    commonConcerns: string[];
    coachingApproach: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const PERSONAS: Persona[] = [
    {
        id: "anxious_overthinker",
        name: "Alex - The Anxious Overthinker",
        role: "Learner",
        focusArea: "Anxiety & Worry",
        copingStyle: "Internal Processor",
        personality: {
            traits: ["Analytical", "Self-aware", "Perfectionistic", "Detail-oriented"],
            communicationStyle: "Thoughtful, tends to over-explain, asks 'what if' questions frequently.",
            motivators: ["Understanding the 'why'", "Evidence-based approaches", "Structured techniques", "Measurable progress"]
        },
        context: {
            challenges: "Racing thoughts, difficulty making decisions, physical tension, avoidance of triggering situations.",
            goals: "Learn to manage worry cycles, reduce physical anxiety symptoms, build confidence in uncertain situations."
        },
        commonConcerns: [
            "What if the techniques don't work for me?",
            "I understand the concepts intellectually but can't apply them in the moment.",
            "My anxiety feels different from what's described in the lessons.",
            "I'm worried about doing the exposure exercises."
        ],
        coachingApproach: "Validate their analytical nature while gently challenging avoidance. Provide structured, step-by-step guidance.",
        difficulty: "Beginner"
    },
    {
        id: "burned_out_professional",
        name: "Sam - The Burned-Out Professional",
        role: "Learner",
        focusArea: "Stress & Depression",
        copingStyle: "Problem Solver",
        personality: {
            traits: ["Driven", "Exhausted", "Self-critical", "Results-oriented"],
            communicationStyle: "Direct, wants actionable advice, impatient with theory, checks in sporadically.",
            motivators: ["Quick wins", "Practical tools", "Efficiency", "Doing more with less"]
        },
        context: {
            challenges: "Chronic stress leading to low mood, difficulty disconnecting from work, poor sleep, loss of interest in hobbies.",
            goals: "Establish boundaries, recover energy, rediscover motivation outside of productivity."
        },
        commonConcerns: [
            "I don't have time for lengthy exercises.",
            "Taking time for myself feels selfish or unproductive.",
            "I understand I need to change but I can't slow down.",
            "Will this actually help or is it just another thing on my to-do list?"
        ],
        coachingApproach: "Meet them where they are with bite-sized, practical techniques. Reframe self-care as performance optimization, then gradually shift to intrinsic motivation.",
        difficulty: "Intermediate"
    },
    {
        id: "sleep_struggler",
        name: "Jordan - The Sleep Struggler",
        role: "Learner",
        focusArea: "Insomnia & Sleep",
        copingStyle: "Avoidant Coper",
        personality: {
            traits: ["Frustrated", "Desperate for solutions", "Skeptical", "Fatigued"],
            communicationStyle: "Vents frustration easily, has tried many things, wants something different, low patience.",
            motivators: ["Concrete results", "Sleep improvement metrics", "Feeling rested", "Breaking the cycle"]
        },
        context: {
            challenges: "Can't fall asleep, wakes up frequently, dreads bedtime, daytime fatigue affecting work and relationships.",
            goals: "Fall asleep within 30 minutes, sleep through the night, wake up feeling rested."
        },
        commonConcerns: [
            "I've tried everything — melatonin, white noise, meditation apps.",
            "Sleep restriction sounds counterintuitive and scary.",
            "My schedule doesn't allow for a consistent bedtime.",
            "What if I have a medical issue causing my insomnia?"
        ],
        coachingApproach: "Acknowledge their frustration, validate past attempts. Introduce CBT-I concepts gradually with emphasis on why they work differently from supplements.",
        difficulty: "Intermediate"
    },
    {
        id: "grief_navigator",
        name: "Maya - The Grief Navigator",
        role: "Learner",
        focusArea: "Grief & Loss",
        copingStyle: "Social Connector",
        personality: {
            traits: ["Emotionally open", "Supportive of others", "Neglects own needs", "Resilient but exhausted"],
            communicationStyle: "Warm, shares stories, connects emotions to experiences, appreciates empathy.",
            motivators: ["Feeling understood", "Honoring their loss", "Helping others", "Finding meaning"]
        },
        context: {
            challenges: "Processing a significant loss, waves of sadness, guilt about moving forward, difficulty concentrating.",
            goals: "Learn healthy grieving, find ways to honor their loss while building a new normal."
        },
        commonConcerns: [
            "Moving on feels like betraying the person I lost.",
            "Some days I feel fine and then guilt hits me.",
            "People keep saying I should be over it by now.",
            "I'm strong for everyone else but falling apart inside."
        ],
        coachingApproach: "Lead with empathy and validation. Never rush the process. Focus on 'growing around' grief rather than 'getting over' it.",
        difficulty: "Advanced"
    },
    {
        id: "proactive_learner",
        name: "Riley - The Proactive Learner",
        role: "Learner",
        focusArea: "Prevention & Resilience",
        copingStyle: "Mindful Coper",
        personality: {
            traits: ["Curious", "Self-motivated", "Growth-oriented", "Reflective"],
            communicationStyle: "Engaged, asks thoughtful questions, enjoys journaling and reflection, shares insights.",
            motivators: ["Self-understanding", "Building habits", "Long-term growth", "Scientific evidence"]
        },
        context: {
            challenges: "No acute crisis — wants to build resilience before challenges arise, occasional stress but manages it.",
            goals: "Develop a strong mental health toolkit, understand their patterns, build lasting wellness habits."
        },
        commonConcerns: [
            "Am I doing enough to maintain my mental health?",
            "How do I know if what I'm learning is actually helping?",
            "I want to support friends who are struggling — how do I help?",
            "What's the science behind these techniques?"
        ],
        coachingApproach: "Encourage deep engagement with material. Challenge them to apply concepts in real scenarios and build a personalized wellness routine.",
        difficulty: "Beginner"
    }
];
