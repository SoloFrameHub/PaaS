import { Track } from '@/types/course';

export const CURRICULUM: Track[] = [
    // ─── Track 1: Anxiety & Fear Management ─────────────────────────────
    {
        id: 'anxiety-and-fear',
        title: '1. Anxiety & Fear Management',
        description: 'Comprehensive courses covering generalized anxiety, panic, social anxiety, OCD, and a practical DBT-based toolkit for crisis skills, exposure therapy, and long-term resilience.',
        magnetComponent: 'A',
        courses: [
            {
                id: 'anxiety-management',
                title: 'Understanding & Managing Anxiety',
                number: 1,
                presentationFile: 'anxiety-management.pdf',
                description: 'Master evidence-based techniques to understand your anxiety, break worry cycles, and build lasting resilience using CBT, mindfulness, and healthy lifestyle habits.',
                duration: '4-5 hours',
                evidenceBadge: 'NICE 2024',
                clinicalFramework: 'CBT',
                outcomes: [
                    'Understand the fight-or-flight response and normalize anxiety symptoms',
                    'Identify your worry patterns and break the anxiety cycle',
                    'Apply cognitive restructuring to calm racing thoughts',
                    'Use breathing, grounding, and relaxation techniques for quick relief',
                    'Create exposure hierarchies to face avoidance patterns',
                    'Implement daily habits (exercise, sleep, nutrition) that reduce anxiety',
                    'Practice mindfulness techniques proven as effective as medication',
                    'Know when to seek professional help and access crisis resources'
                ],
                lessons: [
                    { id: '1', title: 'What Anxiety Is: Fight-or-Flight and Normalizing Symptoms', duration: '20 min' },
                    { id: '2', title: 'Worry Patterns and the Anxiety Cycle', duration: '25 min' },
                    { id: '3', title: 'Calming Racing Thoughts: Cognitive Restructuring', duration: '30 min' },
                    { id: '4', title: 'Quick Relief Tools: Breathing, Grounding, Relaxation', duration: '25 min' },
                    { id: '5', title: 'Facing Avoidance: Gradual Exposure Basics', duration: '30 min' },
                    { id: '6', title: 'Daily Habits That Reduce Anxiety', duration: '25 min' },
                    { id: '7', title: 'Mindfulness for Anxiety', duration: '20 min' },
                    { id: '8', title: 'Long-Term Management and When to Seek Help', duration: '25 min' }
                ]
            },
            {
                id: 'panic-disorder',
                title: 'Managing Panic Attacks & Panic Disorder',
                number: 2,
                presentationFile: 'panic-disorder.pdf',
                description: 'Understand the physiology of panic, break the fear-of-fear cycle, and learn interoceptive exposure, cognitive restructuring, and lifestyle strategies backed by CBT research.',
                duration: '4-5 hours',
                evidenceBadge: 'CBT gold-standard',
                clinicalFramework: 'CBT',
                outcomes: [
                    'Understand the physiology of panic attacks and the fight-or-flight response',
                    'Recognize the panic cycle and how catastrophic misinterpretation maintains it',
                    'Challenge catastrophic thoughts using cognitive restructuring techniques',
                    'Practice interoceptive exposure to reduce fear of physical sensations',
                    'Use breathing and grounding techniques as tools during panic',
                    'Identify and gradually reduce safety behaviors and avoidance',
                    'Manage lifestyle triggers including caffeine, sleep, and alcohol',
                    'Build a long-term maintenance plan and know when to seek professional help'
                ],
                lessons: [
                    { id: '1', title: 'What Happens During a Panic Attack', duration: '20 min' },
                    { id: '2', title: 'The Panic Cycle: Fear of Fear', duration: '25 min' },
                    { id: '3', title: 'Challenging Catastrophic Thoughts', duration: '30 min' },
                    { id: '4', title: 'Interoceptive Exposure Basics', duration: '30 min' },
                    { id: '5', title: 'Breathing and Grounding During Panic', duration: '25 min' },
                    { id: '6', title: 'Reducing Avoidance and Safety Behaviors', duration: '30 min' },
                    { id: '7', title: 'Lifestyle Factors and Panic Triggers', duration: '25 min' },
                    { id: '8', title: 'Long-Term Management and Treatment Options', duration: '20 min' }
                ]
            },
            {
                id: 'social-anxiety',
                title: 'Social Anxiety: Building Confidence in Social Situations',
                number: 3,
                presentationFile: 'social-anxiety.pdf',
                description: 'Overcome the fear of judgment using CBT techniques: cognitive restructuring, graduated exposure, attention training, and social skills practice. Evidence shows large, lasting improvements.',
                duration: '4-5 hours',
                evidenceBadge: 'NICE 2024',
                clinicalFramework: 'CBT',
                outcomes: [
                    'Distinguish social anxiety disorder from introversion and shyness',
                    'Understand the three-phase social anxiety cycle that maintains fear',
                    'Recognize cognitive patterns like the spotlight effect and mind-reading',
                    'Challenge fears of judgment using cognitive restructuring',
                    'Build and work through a graduated exposure hierarchy',
                    'Shift attention outward to reduce self-focused monitoring',
                    'Practice social skills including conversation, assertiveness, and active listening',
                    'Create a long-term maintenance plan and know when to seek professional help'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Social Anxiety vs. Introversion and Shyness', duration: '20 min' },
                    { id: '2', title: 'The Social Anxiety Cycle', duration: '25 min' },
                    { id: '3', title: 'Cognitive Patterns in Social Anxiety', duration: '30 min' },
                    { id: '4', title: 'Challenging Fears of Judgment', duration: '30 min' },
                    { id: '5', title: 'Gradual Exposure to Social Situations', duration: '30 min' },
                    { id: '6', title: 'Shifting Attention Outward', duration: '25 min' },
                    { id: '7', title: 'Building Social Confidence Through Practice', duration: '30 min' },
                    { id: '8', title: 'Long-Term Management and When to Seek Help', duration: '20 min' }
                ]
            },
            {
                id: 'ocd-toolkit',
                title: 'Obsessive-Compulsive Disorder (OCD) Toolkit',
                number: 4,
                presentationFile: 'ocd-toolkit.pdf',
                description: 'Understand OCD, learn how the obsession-compulsion cycle works, discover why compulsions backfire, and prepare for evidence-based treatment (ERP). Psychoeducation that reduces shame and builds treatment readiness.',
                duration: '4-5 hours',
                evidenceBadge: 'ERP first-line',
                clinicalFramework: 'ERP / CBT',
                outcomes: [
                    'Understand what OCD is and how it differs from normal worry or habits',
                    'Recognize common OCD themes including contamination, harm, symmetry, and taboo thoughts',
                    'Map the OCD cycle: trigger, obsession, distress, compulsion, and temporary relief',
                    'Understand why compulsions maintain and strengthen OCD over time',
                    'Learn the principles of Exposure and Response Prevention (ERP) as the gold-standard treatment',
                    'Normalize intrusive thoughts and understand thought-action fusion',
                    'Build supportive lifestyle habits that complement professional OCD treatment',
                    'Know how to find an OCD specialist and what to expect in ERP therapy'
                ],
                lessons: [
                    { id: '1', title: 'Understanding OCD', duration: '20 min' },
                    { id: '2', title: 'Common OCD Themes', duration: '25 min' },
                    { id: '3', title: 'The OCD Cycle', duration: '25 min' },
                    { id: '4', title: 'Why Compulsions Make OCD Worse', duration: '30 min' },
                    { id: '5', title: 'Introduction to ERP Concepts', duration: '30 min' },
                    { id: '6', title: 'Managing Intrusive Thoughts', duration: '25 min' },
                    { id: '7', title: 'Building an OCD-Fighting Lifestyle', duration: '25 min' },
                    { id: '8', title: 'Professional Treatment and Finding an OCD Specialist', duration: '20 min' }
                ]
            },
            {
                id: 'anxiety-toolkit-foundations',
                title: 'Anxiety Toolkit - Foundations',
                number: 5,
                presentationFile: 'anxiety-toolkit-foundations.pdf',
                description: 'Begin your anxiety recovery journey by understanding how anxiety works in your brain and body, then learn the core CBT skills — identifying thinking traps, balancing thoughts, and using thought records — that form the foundation of lasting change.',
                duration: '4-5 hours',
                evidenceBadge: 'CBT-based',
                clinicalFramework: 'CBT',
                outcomes: [
                    'Understand your personal anxiety journey and how anxiety manifests uniquely for you',
                    'Learn how the nervous system drives anxiety responses',
                    'Develop observer awareness to step back from anxious thoughts',
                    'Understand the thought-feeling-action cycle at the core of CBT',
                    'Identify common thinking traps that fuel anxiety',
                    'Practice finding balance in your thoughts using evidence-based techniques',
                    'Use thought records to systematically challenge anxious thinking',
                    'Integrate all CBT tools into a cohesive daily practice'
                ],
                lessons: [
                    { id: '1', title: 'Your Interactive Anxiety Journey', duration: '20 min' },
                    { id: '2', title: "Your Nervous System's Role in Anxiety", duration: '25 min' },
                    { id: '3', title: 'Becoming the Observer', duration: '25 min' },
                    { id: '4', title: 'The Thought-Feeling-Action Cycle', duration: '30 min' },
                    { id: '5', title: 'Spotting Thinking Traps', duration: '30 min' },
                    { id: '6', title: 'Finding Balance in Your Thoughts', duration: '25 min' },
                    { id: '7', title: 'Your Thought Record', duration: '30 min' },
                    { id: '8', title: 'Putting CBT Tools Together', duration: '25 min' }
                ]
            },
            {
                id: 'anxiety-toolkit-skills',
                title: 'Anxiety Toolkit - Crisis Skills & Exposure',
                number: 6,
                presentationFile: 'anxiety-toolkit-skills.pdf',
                description: 'Build practical crisis management skills using DBT and grounding techniques, then learn how to break the avoidance cycle through graduated exposure therapy — the most powerful evidence-based approach for overcoming anxiety.',
                duration: '4-5 hours',
                evidenceBadge: 'DBT / CBT-based',
                clinicalFramework: 'DBT / CBT',
                outcomes: [
                    'Recognize when anxiety becomes a crisis and know how to respond',
                    'Master grounding techniques for immediate anxiety relief',
                    'Learn to ride anxiety waves without fighting or avoiding them',
                    'Practice DBT distress tolerance skills for intense moments',
                    'Understand how avoidance maintains and strengthens anxiety',
                    'Build a personalized fear ladder for graduated exposure',
                    'Practice climbing your fear ladder with structured exposure exercises',
                    'Build confidence through facing fears and celebrating progress'
                ],
                lessons: [
                    { id: '1', title: 'When Anxiety Becomes Crisis', duration: '25 min' },
                    { id: '2', title: 'Grounding Techniques', duration: '30 min' },
                    { id: '3', title: 'Riding the Anxiety Wave', duration: '25 min' },
                    { id: '4', title: 'DBT Skills Challenge', duration: '30 min' },
                    { id: '5', title: 'The Avoidance Trap', duration: '25 min' },
                    { id: '6', title: 'Building Your Fear Ladder', duration: '30 min' },
                    { id: '7', title: 'Climbing the Ladder', duration: '30 min' },
                    { id: '8', title: 'You Are Brave', duration: '20 min' }
                ]
            },
            {
                id: 'anxiety-toolkit-resilience',
                title: 'Anxiety Toolkit - Social Skills & Resilience',
                number: 7,
                presentationFile: 'anxiety-toolkit-resilience.pdf',
                description: 'Develop social confidence through assertive communication and healthy boundaries, then build a sustainable physical and mental resilience routine with relapse prevention strategies for long-term anxiety management.',
                duration: '4-5 hours',
                evidenceBadge: 'CBT / DBT-based',
                clinicalFramework: 'CBT / DBT',
                outcomes: [
                    'Understand social anxiety patterns and build a social skills toolkit',
                    'Practice assertive communication techniques for real-world situations',
                    'Create and maintain healthy boundaries in relationships',
                    'Develop your personal boundary starter pack',
                    'Build a physical foundation that supports mental resilience',
                    'Design a sustainable daily resilience routine',
                    'Identify relapse warning signs and create a prevention plan',
                    'Consolidate all tools into your lifelong anxiety management toolkit'
                ],
                lessons: [
                    { id: '1', title: 'Social Anxiety Toolkit', duration: '25 min' },
                    { id: '2', title: 'Assertive Communication', duration: '30 min' },
                    { id: '3', title: 'Creating Healthy Boundaries', duration: '25 min' },
                    { id: '4', title: 'Your Boundary Starter Pack', duration: '25 min' },
                    { id: '5', title: 'Building Your Physical Foundation', duration: '30 min' },
                    { id: '6', title: 'Your Resilience Routine', duration: '25 min' },
                    { id: '7', title: 'Relapse Prevention and Warning Signs', duration: '30 min' },
                    { id: '8', title: 'Your Anxiety Toolkit for Life', duration: '20 min' }
                ]
            },
            {
                id: 'anxiety-toolkit',
                title: 'Anxiety Toolkit — Crisis Skills, Exposure & Resilience',
                number: 8,
                presentationFile: 'anxiety-toolkit.pdf',
                description: 'A comprehensive, combined anxiety toolkit covering DBT crisis skills (TIPP, grounding, wave-riding), graduated exposure therapy with fear ladders, assertive communication, healthy boundaries, and long-term resilience routines — all in one 12-lesson course.',
                duration: '5-6 hours',
                evidenceBadge: 'DBT / CBT-based',
                clinicalFramework: 'DBT / CBT',
                outcomes: [
                    'Use the TIPP Skill to rapidly calm your body during a crisis moment',
                    'Apply 5-4-3-2-1 Grounding to break anxious thought spirals',
                    'Practice Riding the Wave to observe strong emotions without reacting',
                    'Understand the avoidance trap and how it strengthens anxiety over time',
                    'Build a personalized Fear Ladder with SUDS-rated exposure steps',
                    'Climb your Fear Ladder using the before-during-after toolkit process',
                    'Communicate assertively using the I-feel-when-I-would-appreciate formula',
                    'Set and maintain healthy boundaries to protect your emotional energy',
                    'Design a sustainable physical and mental resilience routine',
                    'Create a relapse prevention plan with early warning signs and action steps'
                ],
                lessons: [
                    { id: '1', title: 'Calming the Storm: Crisis Mode and the TIPP Skill', duration: '25 min' },
                    { id: '2', title: '5-4-3-2-1 Grounding: Anchoring in the Present', duration: '25 min' },
                    { id: '3', title: 'Riding the Wave of Emotion', duration: '25 min' },
                    { id: '4', title: 'DBT Skills Challenge: Choosing the Right Tool', duration: '25 min' },
                    { id: '5', title: 'The Avoidance Trap', duration: '25 min' },
                    { id: '6', title: 'Building Your Fear Ladder', duration: '25 min' },
                    { id: '7', title: 'Climbing the Ladder With Your Toolkit', duration: '25 min' },
                    { id: '8', title: 'Assertive Communication', duration: '25 min' },
                    { id: '9', title: 'Healthy Boundaries', duration: '30 min' },
                    { id: '10', title: 'Building Your Physical Foundation', duration: '25 min' },
                    { id: '11', title: 'Resilience Routine & Relapse Prevention', duration: '30 min' },
                    { id: '12', title: 'Your Anxiety Toolkit for Life', duration: '25 min' }
                ]
            }
        ]
    },

    // ─── Track 2: Mood & Emotional Health ───────────────────────────────
    {
        id: 'mood-emotional-health',
        title: '2. Mood & Emotional Health',
        description: 'Courses addressing depression, bipolar disorder, emotional dysregulation, anger, grief, self-esteem, and perfectionism using CBT, DBT, and compassion-focused approaches.',
        magnetComponent: 'M',
        courses: [
            {
                id: 'depression-action',
                title: 'Depression: From Understanding to Action',
                number: 1,
                presentationFile: 'depression-action.pdf',
                description: 'Break free from the depression cycle using behavioral activation, lifestyle changes, and cognitive skills. Evidence-based strategies that rival medication effectiveness for mild-to-moderate depression.',
                duration: '4-5 hours',
                evidenceBadge: 'NICE 2024',
                clinicalFramework: 'Behavioural Activation',
                outcomes: [
                    'Distinguish between normal sadness and clinical depression',
                    'Understand the depression trap and how withdrawal maintains low mood',
                    'Apply behavioral activation to break the inactivity cycle',
                    'Reconnect with personal values and meaningful activities',
                    'Challenge negative thought patterns using cognitive techniques',
                    'Use exercise as an evidence-based mood treatment',
                    'Implement lifestyle changes (sleep, nutrition) that support recovery',
                    'Know when and how to seek professional help'
                ],
                lessons: [
                    { id: '1', title: 'Recognizing Depression vs. Normal Sadness', duration: '20 min' },
                    { id: '2', title: 'The Depression Trap: Understanding the Withdrawal Cycle', duration: '25 min' },
                    { id: '3', title: 'Getting Moving Again: Behavioral Activation Basics', duration: '30 min' },
                    { id: '4', title: 'Reconnecting with Values and Activities', duration: '25 min' },
                    { id: '5', title: 'Challenging Negative Thought Patterns', duration: '30 min' },
                    { id: '6', title: 'Exercise and Movement for Mood', duration: '25 min' },
                    { id: '7', title: 'Food, Sleep, and Lifestyle Factors', duration: '25 min' },
                    { id: '8', title: 'When to Seek Professional Help', duration: '20 min' }
                ]
            },
            {
                id: 'bipolar-disorder',
                title: 'Bipolar Disorder: Mood Stability Strategies',
                number: 2,
                presentationFile: 'bipolar-disorder.pdf',
                description: 'Understand bipolar I, II, and cyclothymia, learn mood tracking and early warning signs, build daily rhythm stability with IPSRT, and develop a relapse prevention plan. Evidence-based psychoeducation grounded in CBT, IPSRT, and structured self-monitoring.',
                duration: '4-5 hours',
                evidenceBadge: 'CANMAT 2023',
                clinicalFramework: 'IPSRT + CBT',
                clinicalCaveat: 'medication-required',
                outcomes: [
                    'Understand bipolar I, bipolar II, cyclothymia, and mixed features',
                    'Track mood, sleep, energy, and irritability to identify early warning signs',
                    'Apply CBT skills to challenge extreme beliefs during mood episodes',
                    'Stabilize daily routines using interpersonal and social rhythm therapy (IPSRT) principles',
                    'Manage depressive episodes with behavioral activation and self-compassion',
                    'Recognize early signs of mania or hypomania and use harm reduction strategies',
                    'Understand medication adherence as a cornerstone of stability',
                    'Build a personalized relapse prevention and crisis plan'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Bipolar Disorder', duration: '20 min' },
                    { id: '2', title: 'Mood Tracking and Early Warning Signs', duration: '25 min' },
                    { id: '3', title: 'CBT Skills for Bipolar Disorder', duration: '30 min' },
                    { id: '4', title: 'Sleep and Social Rhythm Stability', duration: '30 min' },
                    { id: '5', title: 'Managing Depressive Episodes', duration: '25 min' },
                    { id: '6', title: 'Managing Mania and Hypomania', duration: '30 min' },
                    { id: '7', title: 'Medication Adherence and Your Treatment Team', duration: '25 min' },
                    { id: '8', title: 'Relapse Prevention and Long-Term Stability', duration: '20 min' }
                ]
            },
            {
                id: 'emotional-dysregulation',
                title: 'Emotional Dysregulation & DBT Skills',
                number: 3,
                presentationFile: 'emotional-dysregulation.pdf',
                description: 'Understand why emotions feel overwhelming, learn the four core DBT skills modules — mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness — and build a personal practice for lasting emotional balance. Grounded in Marsha Linehan\'s biosocial model.',
                duration: '4-5 hours',
                evidenceBadge: 'DBT evidence-based',
                clinicalFramework: 'DBT',
                outcomes: [
                    'Understand emotional dysregulation and the biosocial model behind it',
                    'Practice mindfulness skills including Wise Mind, observing, and describing',
                    'Use TIPP and other distress tolerance skills to survive emotional crises without making them worse',
                    'Apply radical acceptance and willingness to situations you cannot change',
                    'Label emotions accurately and understand their functions',
                    'Use opposite action, checking the facts, and ABC PLEASE to regulate emotions',
                    'Build interpersonal effectiveness using DEAR MAN, GIVE, and FAST skills',
                    'Create a personalized DBT skills practice plan for long-term use'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Emotional Dysregulation', duration: '20 min' },
                    { id: '2', title: 'Mindfulness: The Foundation of DBT', duration: '25 min' },
                    { id: '3', title: 'Distress Tolerance: Surviving Crisis', duration: '30 min' },
                    { id: '4', title: 'Radical Acceptance and Willingness', duration: '30 min' },
                    { id: '5', title: 'Understanding and Labeling Your Emotions', duration: '25 min' },
                    { id: '6', title: 'Changing Emotional Responses', duration: '30 min' },
                    { id: '7', title: 'Interpersonal Effectiveness', duration: '30 min' },
                    { id: '8', title: 'Building a DBT Skills Practice for Life', duration: '20 min' }
                ]
            },
            {
                id: 'anger-management',
                title: 'Managing Anger & Irritability',
                number: 4,
                presentationFile: 'anger-management.pdf',
                description: 'Understand your anger patterns, learn evidence-based cool-down techniques, challenge the thoughts that fuel rage, and build assertive communication skills. CBT-based strategies that reduce anger intensity and protect your relationships.',
                duration: '4-5 hours',
                evidenceBadge: 'CBT-based',
                clinicalFramework: 'CBT / DBT',
                outcomes: [
                    'Distinguish between healthy anger and problem anger based on intensity, frequency, and impact',
                    'Identify your personal anger triggers, body warning signs, and escalation patterns',
                    'Use arousal-reducing techniques (breathing, relaxation, time-outs) to cool down physiologically',
                    'Challenge anger-fuelling thought patterns including shoulds, mind-reading, and catastrophizing',
                    'Understand the difference between suppression, aggression, and healthy expression',
                    'Practice assertive communication using I-statements and active listening',
                    'Recognize emotions underneath anger including hurt, fear, shame, and depression',
                    'Build a long-term anger management plan and learn to repair relationships after conflict'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Anger: Normal vs. Problem Anger', duration: '20 min' },
                    { id: '2', title: 'Your Anger Patterns: Triggers, Warning Signs, and Escalation', duration: '25 min' },
                    { id: '3', title: 'The Anger-Body Connection: Cooling Down', duration: '25 min' },
                    { id: '4', title: 'Thoughts That Fuel Anger', duration: '30 min' },
                    { id: '5', title: 'Healthy Expression vs. Suppression vs. Aggression', duration: '30 min' },
                    { id: '6', title: 'Communication Skills: Assertiveness and I-Statements', duration: '25 min' },
                    { id: '7', title: 'What Is Underneath: Hurt, Fear, and Other Emotions', duration: '25 min' },
                    { id: '8', title: 'Long-Term Anger Management and Repairing Relationships', duration: '20 min' }
                ]
            },
            {
                id: 'grief-loss',
                title: 'Grief & Loss: Navigating Bereavement',
                number: 5,
                presentationFile: 'grief-loss.pdf',
                description: 'Understand grief as a natural response with no fixed timeline, learn about grief waves and triggers, practice self-care during loss, and explore continuing bonds and meaning-making. Compassionate psychoeducation grounded in the Dual Process Model.',
                duration: '4-5 hours',
                evidenceBadge: 'Dual Process Model',
                clinicalFramework: 'Integrative',
                outcomes: [
                    'Understand grief as a natural, whole-person response to many kinds of loss',
                    'Recognize common grief experiences across physical, emotional, cognitive, and behavioral domains',
                    'Challenge harmful grief myths including fixed stages and timelines',
                    'Cope with grief waves and plan for known triggers like anniversaries and holidays',
                    'Practice compassionate self-care that supports your nervous system during loss',
                    'Explore continuing bonds as a healthy way to maintain connection with who or what was lost',
                    'Build and use a support system including personal, professional, and community resources',
                    'Find meaning and move forward without pressure to "move on" or forget'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Grief: There Is No Right Way', duration: '20 min' },
                    { id: '2', title: 'Common Grief Experiences: Body, Mind, and Behavior', duration: '25 min' },
                    { id: '3', title: 'Grief Myths vs. Reality', duration: '25 min' },
                    { id: '4', title: 'Coping with Grief Waves and Triggers', duration: '30 min' },
                    { id: '5', title: 'Self-Care During Loss', duration: '25 min' },
                    { id: '6', title: 'Continuing Bonds: Maintaining Connection', duration: '25 min' },
                    { id: '7', title: 'Support Systems and Asking for Help', duration: '25 min' },
                    { id: '8', title: 'Finding Meaning and Moving Forward', duration: '20 min' }
                ]
            },
            {
                id: 'low-self-esteem',
                title: 'Low Self-Esteem & Self-Worth',
                number: 6,
                presentationFile: 'low-self-esteem.pdf',
                description: 'Understand how low self-esteem develops through negative core beliefs, learn to recognize and challenge self-critical thinking patterns, and build lasting self-worth using CBT thought records, compassion-focused therapy, behavioral experiments, and strengths-based reflection.',
                duration: '4-5 hours',
                evidenceBadge: 'CBT / CFT-based',
                clinicalFramework: 'CBT / CFT',
                outcomes: [
                    'Understand the CBT model of low self-esteem: core beliefs, conditional assumptions, and safety behaviors',
                    'Recognize self-critical thinking patterns and the inner critic',
                    'Challenge self-critical thoughts using structured thought records',
                    'Understand how core beliefs form through early experiences and schema therapy concepts',
                    'Practice self-compassion as an alternative to self-criticism using CFT techniques',
                    'Design and carry out behavioral experiments to test negative self-beliefs',
                    'Identify personal strengths, values, and evidence of competence',
                    'Build a long-term plan for maintaining healthy self-worth and preventing relapse'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Low Self-Esteem', duration: '20 min' },
                    { id: '2', title: 'The Inner Critic: Recognizing Self-Critical Patterns', duration: '25 min' },
                    { id: '3', title: 'Challenging Self-Critical Thoughts', duration: '30 min' },
                    { id: '4', title: 'Core Beliefs: Where Self-Esteem Comes From', duration: '30 min' },
                    { id: '5', title: 'Self-Compassion: A Different Way to Relate to Yourself', duration: '25 min' },
                    { id: '6', title: 'Behavioral Experiments: Testing Your Beliefs', duration: '30 min' },
                    { id: '7', title: 'Building on Strengths and Values', duration: '25 min' },
                    { id: '8', title: 'Maintaining Healthy Self-Worth Long-Term', duration: '20 min' }
                ]
            },
            {
                id: 'managing-perfectionism',
                title: 'Managing Perfectionism',
                number: 7,
                presentationFile: 'managing-perfectionism.pdf',
                description: 'Understand perfectionism as a transdiagnostic pattern that fuels anxiety, depression, OCD, and burnout. Learn to distinguish adaptive from maladaptive perfectionism, challenge rigid rules using CBT and schema-based techniques, and build lasting flexibility through behavioral experiments and self-compassion.',
                duration: '4-5 hours',
                evidenceBadge: 'CBT-based',
                clinicalFramework: 'CBT',
                outcomes: [
                    'Understand perfectionism as a transdiagnostic factor linking anxiety, depression, OCD, and burnout',
                    'Distinguish adaptive high standards from maladaptive perfectionistic concerns',
                    'Identify your personal perfectionism patterns including rigid rules, self-criticism, and procrastination',
                    'Challenge perfectionistic thinking using cognitive restructuring techniques',
                    'Design and carry out behavioral experiments to test perfectionistic beliefs',
                    'Practice exposure to "good enough" performance and reduce checking behaviors',
                    'Explore deeper schemas and develop self-compassionate alternatives',
                    'Build a long-term flexibility plan and prevent perfectionism relapse'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Perfectionism: Helpful vs. Harmful', duration: '20 min' },
                    { id: '2', title: 'How Perfectionism Fuels Anxiety, Depression, and Burnout', duration: '25 min' },
                    { id: '3', title: 'Perfectionistic Thinking: Rigid Rules and Self-Criticism', duration: '30 min' },
                    { id: '4', title: 'Cognitive Restructuring: Challenging Perfectionistic Rules', duration: '30 min' },
                    { id: '5', title: 'Behavioral Experiments: Testing "Good Enough"', duration: '30 min' },
                    { id: '6', title: 'Exposure to Imperfection and Letting Go of Control', duration: '25 min' },
                    { id: '7', title: 'Self-Compassion as an Antidote to Perfectionism', duration: '25 min' },
                    { id: '8', title: 'Long-Term Flexibility and Preventing Relapse', duration: '20 min' }
                ]
            }
        ]
    },

    // ─── Track 3: Nutrition & Brain Health ───────────────────────────────
    {
        id: 'nutrition-brain-health',
        title: '3. Nutrition & Brain Health',
        description: 'Explore how nutrition affects mental health through the gut-brain axis, dietary patterns, precision supplementation, and food-mood science — grounded in 2023-2026 nutritional psychiatry research.',
        magnetComponent: 'N',
        courses: [
            {
                id: 'food-mood-connection',
                title: 'The Food-Mood Connection',
                number: 1,
                presentationFile: 'food-mood-connection.pdf',
                description: 'Discover how nutrition affects your mental health through the gut-brain axis. Learn about the microbiome, inflammation, blood sugar, and practical dietary strategies that support emotional well-being.',
                duration: '7-8 hours',
                evidenceBadge: 'CANMAT 2024',
                clinicalFramework: 'Nutritional Psychiatry',
                outcomes: [
                    'Understand the gut-brain axis and how your gut functions as a "second brain"',
                    'Learn how the microbiome shapes mood through neurotransmitter production',
                    'Recognize the connection between chronic inflammation and mental health',
                    'Identify common nutritional roadblocks that worsen mood and energy',
                    'Understand how meal timing affects mental energy and emotional stability',
                    'Build a practical support system for sustainable dietary changes',
                    'Learn how blood sugar fluctuations impact anxiety, mood, and focus',
                    'Choose the right carbohydrates, proteins, and fats for brain health'
                ],
                lessons: [
                    { id: '1', title: 'Your Gut as Your Second Brain', duration: '45 min' },
                    { id: '2', title: 'The Gut Garden', duration: '45 min' },
                    { id: '3', title: 'The Inflammation Connection', duration: '45 min' },
                    { id: '4', title: 'Common Roadblocks and How to Overcome Them', duration: '45 min' },
                    { id: '5', title: 'Meal Timing Template for Mental Energy', duration: '45 min' },
                    { id: '6', title: 'Building Your Support System', duration: '45 min' },
                    { id: '7', title: 'The Blood Sugar Rollercoaster', duration: '50 min' },
                    { id: '8', title: 'The Right Carbs', duration: '45 min' },
                    { id: '9', title: 'Powering Up with Protein and Healthy Fats', duration: '45 min' }
                ]
            },
            {
                id: 'gut-brain-foundations',
                title: 'Gut-Brain Foundations',
                number: 2,
                presentationFile: 'gut-brain-foundations.pdf',
                description: 'Explore the science of the gut-brain axis and how your digestive system communicates with your brain. Learn about the microbiome, short-chain fatty acids, neurotransmitter nutrition, inflammation, blood sugar, and key nutrients that influence mental health — all grounded in 2023-2026 research.',
                duration: '9-10 hours',
                evidenceBadge: 'RCT-Supported',
                clinicalFramework: 'Nutritional Psychiatry',
                outcomes: [
                    'Understand the bidirectional gut-brain axis and vagus nerve communication',
                    'Learn how short-chain fatty acids (SCFAs) influence brain function and mood',
                    'Recognize the role of intestinal permeability (leaky gut) in mental health',
                    'Identify microbiome patterns associated with depression and anxiety',
                    'Understand psychobiotic strains and their therapeutic potential',
                    'Learn how tryptophan metabolism and the kynurenine pathway affect serotonin',
                    'Explore the connection between dietary inflammation, blood sugar, and mood',
                    'Identify key nutrients (omega-3s, vitamin D, magnesium, B vitamins) for brain health'
                ],
                lessons: [
                    { id: '1', title: 'The Gut-Brain Axis: Your Body\'s Hidden Communication Network', duration: '45 min' },
                    { id: '2', title: 'Short-Chain Fatty Acids: Microbial Messengers to Your Brain', duration: '45 min' },
                    { id: '3', title: 'Intestinal Permeability: When Your Gut Barrier Breaks Down', duration: '45 min' },
                    { id: '4', title: 'Your Microbiome and Depression: The Bacterial Connection', duration: '45 min' },
                    { id: '5', title: 'Psychobiotics: Therapeutic Bacteria for Your Mood', duration: '45 min' },
                    { id: '6', title: 'Tryptophan, Serotonin, and the Kynurenine Pathway', duration: '45 min' },
                    { id: '7', title: 'Leaky Gut and Inflammation: The LPS Connection', duration: '45 min' },
                    { id: '8', title: 'Neurotransmitter Nutrition: Feeding Your Brain Chemistry', duration: '45 min' },
                    { id: '9', title: 'B Vitamins, Methylation, and Mood', duration: '45 min' },
                    { id: '10', title: 'GABA Production by Gut Bacteria', duration: '45 min' },
                    { id: '11', title: 'Dietary Inflammation and the DII Score', duration: '45 min' },
                    { id: '12', title: 'Blood Sugar, Insulin Resistance, and Your Mental Health', duration: '45 min' }
                ]
            },
            {
                id: 'dietary-patterns',
                title: 'Dietary Patterns for Mental Health',
                number: 3,
                presentationFile: 'dietary-patterns.pdf',
                description: 'Discover how different dietary patterns affect your mental health. Compare ultra-processed, Mediterranean, plant-based, and traditional diets through the lens of clinical research. Learn about fermented foods, psychobiotics, and how to build an evidence-based eating pattern that supports your mood.',
                duration: '9-10 hours',
                evidenceBadge: 'Mediterranean evidence',
                clinicalFramework: 'Nutritional Psychiatry',
                outcomes: [
                    'Understand how ultra-processed foods increase depression and anxiety risk by up to 53%',
                    'Learn the evidence behind the Mediterranean diet for depression prevention',
                    'Calculate your Dietary Inflammatory Index and understand its mental health impact',
                    'Evaluate plant-based diets for mental health benefits and nutrient considerations',
                    'Distinguish between fermented food evidence and psychobiotic supplement research',
                    'Compare dietary patterns globally and understand dietary acculturation',
                    'Assess your own dietary pattern using validated tools',
                    'Build a personalized, culturally respectful, evidence-based eating pattern'
                ],
                lessons: [
                    { id: '1', title: 'Ultra-Processed Foods and Mental Health Risk', duration: '45 min' },
                    { id: '2', title: 'How Processed Foods Harm Your Brain', duration: '45 min' },
                    { id: '3', title: 'The Mediterranean Diet: A Mental Health Prescription', duration: '45 min' },
                    { id: '4', title: 'Anti-Inflammatory Eating and the DII', duration: '45 min' },
                    { id: '5', title: 'Plant-Based Diets: Mental Health Benefits and Risks', duration: '45 min' },
                    { id: '6', title: 'Fiber, Prebiotics, and Microbiome Diversity', duration: '45 min' },
                    { id: '7', title: 'Fermented Foods: What the Research Really Shows', duration: '45 min' },
                    { id: '8', title: 'Psychobiotic Supplements: Strains That Work', duration: '45 min' },
                    { id: '9', title: 'Western vs Traditional Diets: A Global Comparison', duration: '45 min' },
                    { id: '10', title: 'Dietary Acculturation and Mental Health', duration: '45 min' },
                    { id: '11', title: 'Practical Assessment: Your Dietary Pattern Profile', duration: '45 min' },
                    { id: '12', title: 'Building Your Evidence-Based Dietary Pattern', duration: '45 min' }
                ]
            },
            {
                id: 'precision-nutrition',
                title: 'Precision Nutrition Protocols',
                number: 4,
                presentationFile: 'precision-nutrition.pdf',
                description: 'Learn condition-specific nutritional strategies for depression, anxiety, ADHD, and bipolar disorder. Explore evidence-based supplement protocols, gut restoration, medication-nutrient interactions, and biomarker testing — all with proper safety guidance for clinical integration.',
                duration: '10-11 hours',
                evidenceBadge: 'Evidence-Based Protocols',
                clinicalFramework: 'Nutritional Psychiatry',
                clinicalCaveat: 'consult-provider',
                outcomes: [
                    'Understand condition-specific nutritional approaches for MDD, anxiety, ADHD, and bipolar disorder',
                    'Learn the 4R gut restoration protocol and gut barrier healing nutrients',
                    'Evaluate probiotic strain evidence and create targeted supplementation plans',
                    'Apply EPA vs DHA dosing protocols for depression based on meta-analytic evidence',
                    'Understand vitamin D and magnesium testing, forms, and supplementation protocols',
                    'Assess food quality factors including pesticides and heavy metals',
                    'Identify critical medication-nutrient interactions for SSRIs, MAOIs, lithium, and antipsychotics',
                    'Interpret biomarker testing results for personalized nutrition decisions'
                ],
                lessons: [
                    { id: '1', title: 'Nutrition for Major Depressive Disorder', duration: '50 min' },
                    { id: '2', title: 'Nutrition for Anxiety Disorders', duration: '50 min' },
                    { id: '3', title: 'Nutrition for ADHD and Bipolar Disorder', duration: '50 min' },
                    { id: '4', title: 'The 4R Gut Restoration Protocol', duration: '50 min' },
                    { id: '5', title: 'SIBO, Gut Barrier Healing, and Mental Health', duration: '50 min' },
                    { id: '6', title: 'Probiotic Protocols: Evidence-Based Strain Selection', duration: '50 min' },
                    { id: '7', title: 'Omega-3 Dosing: EPA vs DHA for Mental Health', duration: '50 min' },
                    { id: '8', title: 'Vitamin D: Testing, Supplementation, and Mental Health', duration: '50 min' },
                    { id: '9', title: 'Magnesium Forms: Choosing the Right One for Your Brain', duration: '50 min' },
                    { id: '10', title: 'Food Quality: Pesticides, Heavy Metals, and Your Mental Health', duration: '50 min' },
                    { id: '11', title: 'Medication-Nutrient Interactions: What You Must Know', duration: '50 min' },
                    { id: '12', title: 'Biomarker Testing: Your Personalized Nutrition Roadmap', duration: '50 min' }
                ]
            },
            {
                id: 'food-mood-mastery',
                title: 'Food-Mood Mastery',
                number: 5,
                presentationFile: 'food-mood-mastery.pdf',
                description: 'The capstone course of the Nutrition Track. Integrate clinical guidelines, genetics, mindful eating, and special population needs (perinatal, pediatric, older adults). Explore emerging research on ketogenic diets, intermittent fasting, and planetary health. Build your personalized food-mood mastery plan.',
                duration: '9-10 hours',
                evidenceBadge: 'ISNPR 2024',
                clinicalFramework: 'Nutritional Psychiatry',
                outcomes: [
                    'Understand ISNPR 2024 clinical guidelines for nutritional psychiatry',
                    'Learn how MTHFR, COMT, and other genetic variants affect nutrition and mood',
                    'Practice mindful and intuitive eating as evidence-based mental health strategies',
                    'Understand nutritional needs for perinatal, pediatric, and older adult populations',
                    'Recognize eating disorder risks in nutritional psychiatry and apply trauma-informed approaches',
                    'Evaluate emerging evidence on ketogenic diets and intermittent fasting for mental health',
                    'Connect food choices to planetary health and global mental wellness',
                    'Create a personalized, sustainable food-mood mastery plan for long-term wellbeing'
                ],
                lessons: [
                    { id: '1', title: 'Clinical Practice Integration: Nutritional Psychiatry Guidelines', duration: '45 min' },
                    { id: '2', title: 'Genetic Considerations: MTHFR, COMT, and Personalized Nutrition', duration: '45 min' },
                    { id: '3', title: 'Mindful Eating for Mental Health', duration: '45 min' },
                    { id: '4', title: 'Emotional Eating, Food Relationships, and Behavior Change', duration: '45 min' },
                    { id: '5', title: 'Perinatal Nutrition and Postpartum Depression', duration: '45 min' },
                    { id: '6', title: 'Pediatric Nutrition and Youth Mental Health', duration: '45 min' },
                    { id: '7', title: 'Older Adults: MIND Diet, Polypharmacy, and Brain Health', duration: '45 min' },
                    { id: '8', title: 'Eating Disorders: Safety in Nutritional Psychiatry', duration: '45 min' },
                    { id: '9', title: 'Ketogenic Diet and Metabolic Psychiatry', duration: '45 min' },
                    { id: '10', title: 'Intermittent Fasting and Circadian Mental Health', duration: '45 min' },
                    { id: '11', title: 'Sustainability, Planetary Health, and Global Mental Wellness', duration: '45 min' },
                    { id: '12', title: 'Your Personalized Food-Mood Mastery Plan', duration: '45 min' }
                ]
            }
        ]
    },

    // ─── Track 4: Sleep & Recovery ───────────────────────────────────────
    {
        id: 'sleep-recovery',
        title: '4. Sleep & Recovery',
        description: 'Evidence-based sleep optimization using CBT-I techniques, sleep neuroscience, environment design, and personalized sleep blueprints for lasting improvement.',
        magnetComponent: 'G',
        courses: [
            {
                id: 'sleep-insomnia',
                title: 'Sleep Problems & Insomnia Solutions',
                number: 1,
                presentationFile: 'sleep-insomnia.pdf',
                description: 'Overcome insomnia using CBT-I techniques: the gold-standard, first-line treatment preferred over sleep medications. Learn sleep restriction, stimulus control, and lifestyle changes that produce lasting results.',
                duration: '4-5 hours',
                evidenceBadge: 'CBT-I first-line',
                clinicalFramework: 'CBT-I',
                outcomes: [
                    'Understand different types of insomnia and identify your sleep pattern',
                    'Track sleep accurately using a sleep diary and calculate sleep efficiency',
                    'Apply stimulus control to reassociate your bed with sleep',
                    'Implement sleep restriction therapy safely to consolidate sleep',
                    'Optimize your bedroom environment for better sleep',
                    'Understand how caffeine, alcohol, and food timing affect sleep',
                    'Use cognitive techniques and relaxation to quiet racing thoughts',
                    'Leverage exercise and light exposure for long-term sleep health'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Sleep Problems', duration: '20 min' },
                    { id: '2', title: 'Sleep Tracking and Finding Patterns', duration: '25 min' },
                    { id: '3', title: 'Stimulus Control: Bed = Sleep Only', duration: '30 min' },
                    { id: '4', title: 'Sleep Restriction Basics', duration: '30 min' },
                    { id: '5', title: 'Bedroom Environment Optimization', duration: '20 min' },
                    { id: '6', title: 'Substances and Sleep', duration: '25 min' },
                    { id: '7', title: 'Quieting the Racing Mind', duration: '30 min' },
                    { id: '8', title: 'Exercise, Light, and Long-Term Sleep Health', duration: '25 min' }
                ]
            },
            {
                id: 'sleep-mastery',
                title: 'Sleep Mastery',
                number: 2,
                presentationFile: 'sleep-mastery.pdf',
                description: 'A comprehensive approach to sleep optimization covering the neuroscience of sleep, evidence-based assessment tools, relaxation techniques, environment design, nutrition, and building a personalized sleep blueprint for lasting improvement.',
                duration: '5-6 hours',
                evidenceBadge: 'CBT-I based',
                clinicalFramework: 'CBT-I',
                outcomes: [
                    'Understand the neuroscience of sleep and its impact on mental health',
                    'Assess your sleep quality using the Pittsburgh Sleep Quality Index (PSQI)',
                    'Learn evidence-based techniques for quieting the racing mind',
                    'Design an optimal sleep environment (your sleep sanctuary)',
                    'Understand how sleep affects mood, focus, and daily productivity',
                    'Track sleep-wake patterns using a reflection log',
                    'Build physical resilience through exercise and recovery practices',
                    'Create a personalized sleep blueprint for long-term improvement'
                ],
                lessons: [
                    { id: '1', title: 'The Neuroscience of Sleep and Mental Health', duration: '25 min' },
                    { id: '2', title: 'Assessing Your Sleep Quality (PSQI)', duration: '20 min' },
                    { id: '3', title: 'Quieting the Racing Mind', duration: '30 min' },
                    { id: '4', title: 'Building Your Sleep Sanctuary', duration: '25 min' },
                    { id: '5', title: "Sleep's Impact on Mood, Focus, and Productivity", duration: '25 min' },
                    { id: '6', title: 'The Night and Day Reflection Log', duration: '20 min' },
                    { id: '7', title: 'Building Physical Resilience', duration: '30 min' },
                    { id: '8', title: 'Creating a Resilient Sleep System', duration: '25 min' },
                    { id: '9', title: 'Nutrition for Better Sleep', duration: '25 min' },
                    { id: '10', title: 'Your 24-Hour Sleep System', duration: '30 min' },
                    { id: '11', title: 'Your Personal Sleep Blueprint', duration: '25 min' },
                    { id: '12', title: 'Your Journey Forward as a Resilient Sleeper', duration: '20 min' }
                ]
            }
        ]
    },

    // ─── Track 5: Stress & Resilience ────────────────────────────────────
    {
        id: 'stress-resilience',
        title: '5. Stress & Resilience',
        description: 'Build lasting resilience through evidence-based stress management, burnout recovery, and trauma-informed stabilization practices.',
        magnetComponent: 'E',
        courses: [
            {
                id: 'stress-burnout',
                title: 'Chronic Stress & Burnout Management',
                number: 1,
                presentationFile: 'stress-burnout.pdf',
                description: 'Understand the difference between normal stress and burnout, learn how chronic stress affects your body and brain, set effective boundaries, and build sustainable recovery practices backed by research.',
                duration: '4-5 hours',
                evidenceBadge: 'Research-Backed',
                clinicalFramework: 'CBT / Mindfulness',
                outcomes: [
                    'Distinguish between normal stress, chronic stress, and burnout',
                    'Understand how chronic stress affects the brain, body, and immune system',
                    'Identify your personal stress triggers and early warning signs',
                    'Set effective boundaries at work and in personal life',
                    'Practice evidence-based stress relief techniques including breathing, mindfulness, and movement',
                    'Apply the four recovery experiences to restore energy and prevent depletion',
                    'Implement sustainable lifestyle changes for sleep, movement, nutrition, and social connection',
                    'Know how to rebuild after burnout and prevent relapse'
                ],
                lessons: [
                    { id: '1', title: 'Stress vs. Burnout: Recognizing the Signs', duration: '20 min' },
                    { id: '2', title: 'How Chronic Stress Affects Body and Mind', duration: '25 min' },
                    { id: '3', title: 'Identifying Your Stress Triggers and Patterns', duration: '25 min' },
                    { id: '4', title: 'Boundaries and Saying No', duration: '30 min' },
                    { id: '5', title: 'Stress Relief Techniques That Actually Work', duration: '30 min' },
                    { id: '6', title: 'Recovery Practices: Rest, Play, and Disconnection', duration: '25 min' },
                    { id: '7', title: 'Sustainable Lifestyle Changes', duration: '25 min' },
                    { id: '8', title: 'Rebuilding After Burnout and Preventing Relapse', duration: '20 min' }
                ]
            },
            {
                id: 'trauma-recovery',
                title: 'Trauma Recovery: Understanding PTSD',
                number: 2,
                presentationFile: 'trauma-recovery.pdf',
                description: 'Understand how trauma affects the brain and body, learn grounding techniques for flashbacks, identify triggers, and build stabilization skills. Psychoeducation that prepares you for professional healing.',
                duration: '4-5 hours',
                evidenceBadge: 'NICE 2018',
                clinicalFramework: 'Trauma-focused CBT',
                clinicalCaveat: 'consult-provider',
                outcomes: [
                    'Understand what trauma is and how PTSD develops',
                    'Learn how trauma changes the brain — amygdala, hippocampus, and prefrontal cortex',
                    'Recognize common trauma responses as protective mechanisms, not character flaws',
                    'Practice grounding techniques for flashbacks, dissociation, and overwhelm',
                    'Identify personal triggers and build a coping plan',
                    'Implement self-care and stabilization practices for daily life',
                    'Build a safety plan and support system',
                    'Understand evidence-based professional treatment options and when to seek help'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Trauma and PTSD', duration: '20 min' },
                    { id: '2', title: 'How Trauma Affects the Brain and Body', duration: '25 min' },
                    { id: '3', title: 'Common Trauma Responses', duration: '25 min' },
                    { id: '4', title: 'Grounding Techniques for Flashbacks and Overwhelm', duration: '30 min' },
                    { id: '5', title: 'Understanding Triggers and Building Coping Plans', duration: '30 min' },
                    { id: '6', title: 'Self-Care and Stabilization Practices', duration: '25 min' },
                    { id: '7', title: 'Building Safety and Support Systems', duration: '25 min' },
                    { id: '8', title: 'Professional Treatment Options and Finding Help', duration: '20 min' }
                ]
            }
        ]
    },

];

export function getAllCourses() {
    return CURRICULUM.flatMap(track => track.courses);
}

export function getCourse(id: string) {
    return getAllCourses().find(c => c.id === id);
}

export function getCourseByNumber(num: number) {
    return getAllCourses().find(c => c.number === num);
}

export function getLesson(courseId: string, lessonId: string) {
    const course = getCourse(courseId);
    return course?.lessons.find(l => l.id === lessonId);
}

export function getTrackIdForCourse(courseId: string) {
    return CURRICULUM.find(track => track.courses.some(c => c.id === courseId))?.id;
}

// ── Wellness Dimension Maps ─────────────────────────────────────────────────

import type { WellnessDimensionKey } from '@/types/wellness-scores';

/**
 * Maps each wellness dimension to the courses in its track.
 */
export const DIMENSION_COURSE_MAP: Record<WellnessDimensionKey, string[]> = {
    anxietyManagement: [
        'anxiety-management', 'panic-disorder', 'social-anxiety', 'ocd-toolkit',
        'anxiety-toolkit-foundations', 'anxiety-toolkit-skills', 'anxiety-toolkit-resilience', 'anxiety-toolkit',
    ],
    moodStability: [
        'depression-action', 'bipolar-disorder', 'emotional-dysregulation',
        'anger-management', 'grief-loss', 'low-self-esteem', 'managing-perfectionism',
    ],
    sleepQuality: [
        'sleep-insomnia', 'sleep-mastery',
    ],
    stressResilience: [
        'stress-burnout', 'trauma-recovery',
    ],
    nutritionAwareness: [
        'food-mood-connection', 'gut-brain-foundations', 'dietary-patterns',
        'precision-nutrition', 'food-mood-mastery',
    ],
};

/**
 * Maps each wellness dimension to its clinical assessments with scoring metadata.
 * assessmentId matches filenames in server/data/assessments/*.json
 * courseId + lessonId match lesson-map.json entries
 */
export const DIMENSION_ASSESSMENT_MAP: Record<WellnessDimensionKey, {
    assessmentId: string;
    courseId: string;
    lessonId: string;
    maxScore: number;
    higherIsBetter: boolean;
}[]> = {
    anxietyManagement: [
        { assessmentId: 'gad7', courseId: 'anxiety-management', lessonId: '1', maxScore: 21, higherIsBetter: false },
        { assessmentId: 'pdss-sr', courseId: 'panic-disorder', lessonId: '1', maxScore: 28, higherIsBetter: false },
        { assessmentId: 'spin', courseId: 'social-anxiety', lessonId: '1', maxScore: 68, higherIsBetter: false },
    ],
    moodStability: [
        { assessmentId: 'phq9', courseId: 'depression-action', lessonId: '2', maxScore: 27, higherIsBetter: false },
        { assessmentId: 'anger-self-check', courseId: 'anger-management', lessonId: '1', maxScore: 32, higherIsBetter: false },
        { assessmentId: 'grief-experience-check', courseId: 'grief-loss', lessonId: '2', maxScore: 32, higherIsBetter: false },
    ],
    sleepQuality: [
        { assessmentId: 'psqi-sleep-quality', courseId: 'sleep-mastery', lessonId: '2', maxScore: 36, higherIsBetter: false },
    ],
    stressResilience: [
        { assessmentId: 'burnout-self-check', courseId: 'stress-burnout', lessonId: '1', maxScore: 54, higherIsBetter: false },
        { assessmentId: 'trauma-response-check', courseId: 'trauma-recovery', lessonId: '1', maxScore: 32, higherIsBetter: false },
    ],
    nutritionAwareness: [
        { assessmentId: 'gut-brain-awareness', courseId: 'gut-brain-foundations', lessonId: '1', maxScore: 30, higherIsBetter: false },
        { assessmentId: 'dietary-pattern-check', courseId: 'dietary-patterns', lessonId: '1', maxScore: 36, higherIsBetter: true },
    ],
};

/**
 * Returns the wellness dimension key for a given course ID.
 */
export function getCourseDimension(courseId: string): WellnessDimensionKey | null {
    for (const [dimension, courses] of Object.entries(DIMENSION_COURSE_MAP)) {
        if (courses.includes(courseId)) return dimension as WellnessDimensionKey;
    }
    return null;
}

/**
 * Returns the learning tier for a course within its track.
 * Essentials: first course in the track (foundational understanding)
 * Techniques: middle courses (technique learning and practical application)
 * Mastery: last course(s) in the track (advanced/combined practice)
 */
export function getCourseTier(courseId: string): 'Essentials' | 'Techniques' | 'Mastery' {
    for (const track of CURRICULUM) {
        const idx = track.courses.findIndex(c => c.id === courseId);
        if (idx === -1) continue;
        const total = track.courses.length;
        if (idx === 0) return 'Essentials';
        if (idx >= total - 1 && total > 2) return 'Mastery';
        return 'Techniques';
    }
    return 'Essentials';
}
