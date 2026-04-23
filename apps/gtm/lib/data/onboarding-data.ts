export const ASSESSMENT_QUESTIONS = [
    {
        id: 'q1',
        question: "When you think about reaching out to potential customers, your first instinct is:",
        options: [
            { text: "I should make the product better first", category_weights: { reluctant_seller: 3, technical_purist: 2 } },
            { text: "I've tried sales approaches before and they felt wrong", category_weights: { burned_bootstrapper: 3 } },
            { text: "I know I need to, but I barely have time", category_weights: { time_starved_parent: 3 } },
            { text: "I'm ready—just need the right framework", category_weights: { scaling_struggler: 2, returning_founder: 2 } }
        ]
    },
    {
        id: 'q2',
        question: "How would you describe your technical background?",
        options: [
            { text: "I'm a developer/engineer by trade", category_weights: { technical_purist: 3, reluctant_seller: 1 } },
            { text: "Business/marketing background, I outsource technical work", category_weights: { non_technical: 3 } },
            { text: "I run an agency or consultancy", category_weights: { agency_escapee: 3 } },
            { text: "I've built and exited companies before", category_weights: { returning_founder: 3 } }
        ]
    },
    {
        id: 'q3',
        question: "Your biggest constraint right now is:",
        options: [
            { text: "Time — I have maybe 10-15 hours per week", category_weights: { time_starved_parent: 3 } },
            { text: "Fear — I don't want to repeat past mistakes", category_weights: { burned_bootstrapper: 3 } },
            { text: "Knowledge — I'm technical, but sales is foreign", category_weights: { technical_purist: 2, reluctant_seller: 2 } },
            { text: "Scale — I have customers but can't break through", category_weights: { scaling_struggler: 3 } }
        ]
    },
    {
        id: 'q4',
        question: "When you hear 'sales tactics', you think:",
        options: [
            { text: "Manipulation — I want to build, not pitch", category_weights: { reluctant_seller: 3, technical_purist: 2 } },
            { text: "Expensive — I wasted money on that before", category_weights: { burned_bootstrapper: 3 } },
            { text: "Necessary — I need systems to break my plateau", category_weights: { scaling_struggler: 3, returning_founder: 1 } },
            { text: "Exciting — more customers means product revenue", category_weights: { agency_escapee: 2 } }
        ]
    },
    {
        id: 'q5',
        question: "Where are you building from?",
        options: [
            { text: "US or UK, selling locally", category_weights: {} },
            { text: "Outside US/UK, targeting US market", category_weights: { international_founder: 3 } }
        ]
    }
];

export const DISC_SCENARIOS = [
    {
        id: 'disc1',
        scenario: "A prospect starts drilling into technical details you don't know perfectly. Do you:",
        options: [
            { text: "Confidently redirect to business outcomes you can speak to", disc: 'D' },
            { text: "Engage enthusiastically and promise to get them answers", disc: 'I' },
            { text: "Honestly admit the gap and offer to follow up with specifics", disc: 'S' },
            { text: "Ask clarifying questions to understand exactly what they need", disc: 'C' }
        ]
    },
    {
        id: 'disc2',
        scenario: "When preparing for an important sales meeting, you prefer to:",
        options: [
            { text: "Dive in quickly — I'll figure it out as we go", disc: 'D' },
            { text: "Think about how to build rapport and connect first", disc: 'I' },
            { text: "Prepare thoroughly so nothing goes wrong", disc: 'S' },
            { text: "Research their company and prepare specific questions", disc: 'C' }
        ]
    },
    {
        id: 'disc3',
        scenario: "After a great product demo, you:",
        options: [
            { text: "Push for a concrete next step or timeline", disc: 'D' },
            { text: "Share a success story to keep the excitement going", disc: 'I' },
            { text: "Respect their space and wait for them to reach out", disc: 'S' },
            { text: "Offer additional documentation they can review", disc: 'C' }
        ]
    },
    {
        id: 'disc4',
        scenario: "When handling a prospect's objection, you:",
        options: [
            { text: "Address it directly and move to close", disc: 'D' },
            { text: "Find common ground and keep the relationship warm", disc: 'I' },
            { text: "Acknowledge their concern and offer reassurance", disc: 'S' },
            { text: "Provide data and logical explanations", disc: 'C' }
        ]
    }
];
