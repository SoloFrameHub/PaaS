export const WELLNESS_ASSESSMENT_QUESTIONS = [
    {
        id: 'q1',
        question: "What best describes what brought you here today?",
        options: [
            { text: "I've been feeling anxious or overwhelmed lately", category_weights: { anxiety_focused: 3, stress_response: 1 } },
            { text: "I'm struggling with low mood or motivation", category_weights: { depression_focused: 3 } },
            { text: "I can't sleep well and it's affecting my life", category_weights: { sleep_focused: 3 } },
            { text: "I want to build better mental health habits proactively", category_weights: { proactive_learner: 3, resilience_builder: 1 } }
        ]
    },
    {
        id: 'q2',
        question: "How long have you been experiencing these challenges?",
        options: [
            { text: "Just recently (past few weeks)", category_weights: { acute_onset: 2, stress_response: 1 } },
            { text: "A few months now", category_weights: { developing_pattern: 2 } },
            { text: "On and off for years", category_weights: { chronic_pattern: 3 } },
            { text: "I'm not currently struggling — I want to prevent future issues", category_weights: { proactive_learner: 3 } }
        ]
    },
    {
        id: 'q3',
        question: "What's your biggest barrier to feeling better?",
        options: [
            { text: "I don't know where to start", category_weights: { needs_structure: 3, anxiety_focused: 1 } },
            { text: "I've tried things before but nothing stuck", category_weights: { chronic_pattern: 2, needs_accountability: 2 } },
            { text: "I don't have much time or energy", category_weights: { energy_limited: 3 } },
            { text: "I feel like my situation is too complex for self-help", category_weights: { needs_professional: 2, chronic_pattern: 1 } }
        ]
    },
    {
        id: 'q4',
        question: "How do you prefer to learn and practice new skills?",
        options: [
            { text: "Reading and reflecting on my own", category_weights: { self_directed: 3 } },
            { text: "Guided exercises with step-by-step instructions", category_weights: { needs_structure: 2, guided_learner: 2 } },
            { text: "Interactive activities and journaling", category_weights: { experiential_learner: 3 } },
            { text: "Short, practical tips I can try right away", category_weights: { action_oriented: 3 } }
        ]
    },
    {
        id: 'q5',
        question: "What does success look like for you?",
        options: [
            { text: "Feeling calmer and more in control day-to-day", category_weights: { anxiety_focused: 2, resilience_builder: 1 } },
            { text: "Having more energy and motivation", category_weights: { depression_focused: 2, energy_limited: 1 } },
            { text: "Sleeping better consistently", category_weights: { sleep_focused: 3 } },
            { text: "Understanding myself better and building lasting habits", category_weights: { proactive_learner: 2, resilience_builder: 2 } }
        ]
    }
];

export const COPING_STYLE_SCENARIOS = [
    {
        id: 'cope1',
        scenario: "When you're feeling overwhelmed, your first instinct is:",
        options: [
            { text: "Take charge — make a plan or a list", style: 'problem_solver' },
            { text: "Talk to someone about how I'm feeling", style: 'social_connector' },
            { text: "Withdraw and try to ride it out alone", style: 'internal_processor' },
            { text: "Distract myself with something else", style: 'avoidant_coper' }
        ]
    },
    {
        id: 'cope2',
        scenario: "When you can't fall asleep because your mind is racing, you typically:",
        options: [
            { text: "Get up and do something productive", style: 'problem_solver' },
            { text: "Try breathing exercises or relaxation", style: 'mindful_coper' },
            { text: "Scroll my phone or watch something", style: 'avoidant_coper' },
            { text: "Lie there and worry about not sleeping", style: 'internal_processor' }
        ]
    },
    {
        id: 'cope3',
        scenario: "After a difficult day, you recharge by:",
        options: [
            { text: "Exercising or going for a walk", style: 'active_coper' },
            { text: "Spending time with people I care about", style: 'social_connector' },
            { text: "Quiet time alone — reading, journaling, or resting", style: 'internal_processor' },
            { text: "I usually don't recharge — I just push through", style: 'avoidant_coper' }
        ]
    },
    {
        id: 'cope4',
        scenario: "When someone asks how you're doing, you:",
        options: [
            { text: "Share openly if I trust them", style: 'social_connector' },
            { text: "Give an honest but brief answer", style: 'mindful_coper' },
            { text: "Say 'fine' even when I'm not", style: 'avoidant_coper' },
            { text: "Redirect the conversation to them", style: 'internal_processor' }
        ]
    }
];
